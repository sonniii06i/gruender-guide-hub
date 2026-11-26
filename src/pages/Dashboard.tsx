import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useAccess } from "@/hooks/useAccess";
import { useStartplan } from "@/hooks/useStartplan";
import { readProfileCache, writeProfileCache, PROFILE_UPDATE_EVENT, type CachedProfile } from "@/lib/profileCache";
import { Input } from "@/components/ui/input";
import { CATEGORIES, STATUS_LABEL, type Feature, type FeatureCategory } from "@/data/features";
import { PLAYBOOKS } from "@/data/playbooks";
import { QUIZZES } from "@/data/quizzes";
import { empfohleneGuides } from "@/lib/guideEmpfehlung";
import { GuideCard } from "@/components/dashboard/GuideCard";
import { ContinueLearning } from "@/components/dashboard/ContinueLearning";
import { EventRadarKachel } from "@/components/dashboard/EventRadarKachel";
import { DeineWoche } from "@/components/dashboard/DeineWoche";
import { JahreswechselKachel } from "@/components/dashboard/JahreswechselKachel";
import { Startplan } from "@/components/dashboard/Startplan";
import {
  FelixFragen,
  ToolEmpfehlungen,
  VergleichTipps,
  ZuletztGeoeffnet,
} from "@/components/dashboard/Empfehlungen";
import { GRUENDUNGS_GUIDE, profilMerkmale, rechtsformVon } from "@/lib/startplan";
import { zuletztGenutzt } from "@/lib/zuletztGenutzt";
import { AffiliateSuccessBanner } from "@/components/AffiliateSuccessBanner";
import { EmptyState, ToneBadge, stripEmoji, type Tone } from "@/components/cockpit/kit";
import { ALL_BADGES, GAMIFICATION_EVENT, getLevelInfo, readGamification } from "@/lib/gamification";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  Calculator,
  CalendarDays,
  CheckCircle2,
  FileText,
  Flame,
  GraduationCap,
  Landmark,
  Lock,
  MessageSquare,
  Route,
  Scale,
  Search,
  Settings2,
  Sparkles,
  Store,
  Trophy,
  Zap,
} from "lucide-react";
import { hapticSelection } from "@/lib/haptics";
import { ANBIETER_ANZAHL, ANBIETER_KATEGORIEN } from "@/data/kennzahlen";
import { cn } from "@/lib/utils";

const MOBILE_QUICK_ACTIONS = [
  { to: "/cockpit/steuer", label: "Steuern", icon: Calculator, bg: "bg-[#EDF4FF]", fg: "text-[#1E40AF]" },
  { to: "/anbieter", label: "Anbieter", icon: Building2, bg: "bg-[#ECF8F3]", fg: "text-brand-green" },
  { to: "/cockpit/chancen-radar", label: "Förderung", icon: Sparkles, bg: "bg-[#FDF6E7]", fg: "text-[#B45309]" },
  { to: "/quiz", label: "Quizze", icon: Trophy, bg: "bg-[#F3EEFF]", fg: "text-[#6D28D9]" },
  { to: "/gruender-events", label: "Events", icon: CalendarDays, bg: "bg-[#FFF1F2]", fg: "text-[#BE123C]" },
  { to: "/cockpit/rechnungs-generator", label: "Rechnung", icon: FileText, bg: "bg-[#ECFDF5]", fg: "text-[#047857]" },
] as const;

const TOP_QUICK_TOOLS = [
  {
    to: "/cockpit/gewerbe-check",
    title: "Gewerbe-Check",
    sub: "Freiberuf oder Gewerbe klären",
    icon: CheckCircle2,
    bg: "bg-[#EDF4FF]",
    fg: "text-[#1E40AF]",
  },
  {
    to: "/wizard/rechtsform",
    title: "Rechtsform-Finder",
    sub: "Einzelunternehmen, UG oder GmbH",
    icon: Scale,
    bg: "bg-[#ECF8F3]",
    fg: "text-brand-green",
  },
  {
    to: "/cockpit/steuer",
    title: "Steuer-Cockpit",
    sub: "Rücklage, USt und Fristen",
    icon: Calculator,
    bg: "bg-[#FDF6E7]",
    fg: "text-[#B45309]",
  },
  {
    to: "/cockpit/brutto-netto-solo",
    title: "Brutto-Netto Solo",
    sub: "Was am Monatsende bleibt",
    icon: Landmark,
    bg: "bg-[#F3EEFF]",
    fg: "text-[#6D28D9]",
  },
  {
    to: "/cockpit/shop-profit-rechner",
    title: "Shop-Profit",
    sub: "Marge und RoAS kalkulieren",
    icon: Store,
    bg: "bg-[#FFF1F2]",
    fg: "text-[#BE123C]",
  },
  {
    to: "/anbieter",
    title: "Anbieter-Vergleich",
    sub: `${ANBIETER_ANZAHL} Anbieter in ${ANBIETER_KATEGORIEN} Kategorien`,
    icon: Building2,
    bg: "bg-[#ECFDF5]",
    fg: "text-[#047857]",
  },
] as const;

interface Profile {
  first_name: string | null;
  onboarding_completed: boolean | null;
  business_model?: string | null;
  founder_stage?: string | null;
  legal_form?: string | null;
}

const VIEWS = ["start", "meine", "tools", "themen"] as const;
type View = (typeof VIEWS)[number];

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(() => readProfileCache(user?.id) as Profile | null);
  const { hasActiveSub, isAdmin } = useAccess();
  const [params, setParams] = useSearchParams();
  const view = (params.get("view") as View) || "start";
  const activeCatSlug = params.get("cat");
  const [query, setQuery] = useState("");
  const [gamTick, setGamTick] = useState(0);

  useEffect(() => {
    const onGam = () => setGamTick((n) => n + 1);
    window.addEventListener(GAMIFICATION_EVENT, onGam);
    return () => window.removeEventListener(GAMIFICATION_EVENT, onGam);
  }, []);

  useEffect(() => {
    if (!user) return;
    const cached = readProfileCache(user.id);
    if (cached) setProfile(cached as Profile);
    supabase
      .from("profiles")
      .select("first_name, onboarding_completed, business_model, founder_stage, legal_form")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setProfile(data as Profile);
          writeProfileCache(user.id, data as CachedProfile);
        }
      });
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const onProfileUpdate = (e: Event) => {
      const detail = (e as CustomEvent<CachedProfile>).detail;
      if (detail) setProfile(detail as Profile);
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === `gx-profile-${user.id}` && e.newValue) {
        try {
          setProfile(JSON.parse(e.newValue) as Profile);
        } catch {
          /* ignore */
        }
      }
    };
    window.addEventListener(PROFILE_UPDATE_EVENT, onProfileUpdate);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(PROFILE_UPDATE_EVENT, onProfileUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, [user]);

  const isActive = hasActiveSub || isAdmin;
  const gam = useMemo(() => readGamification(user?.id), [user?.id, gamTick]);
  const lvl = useMemo(() => getLevelInfo(gam.xp), [gam.xp]);

  const planProfil = useMemo(
    () => ({
      business_model: profile?.business_model,
      founder_stage: profile?.founder_stage,
      legal_form: profile?.legal_form,
    }),
    [profile?.business_model, profile?.founder_stage, profile?.legal_form],
  );
  const startplanState = useStartplan(planProfil);
  const planPct = Math.round((startplanState.erledigt / Math.max(1, startplanState.schritte.length)) * 100);
  const activeRunsCount = Object.keys(startplanState.laufend).length;

  const featuredGuides = useMemo(() => {
    const form = rechtsformVon(planProfil.legal_form);
    return empfohleneGuides(planProfil.business_model, 4, form ? GRUENDUNGS_GUIDE[form] : null);
  }, [planProfil]);
  const merkmale = useMemo(() => profilMerkmale(planProfil), [planProfil]);
  const zuletzt = useMemo(() => zuletztGenutzt(user?.id), [user?.id]);

  const filteredCats = useMemo(() => {
    const q = query.trim().toLowerCase();
    const cats = activeCatSlug ? CATEGORIES.filter((c) => c.slug === activeCatSlug) : CATEGORIES;
    if (!q) return cats;
    return cats
      .map((cat) => ({
        ...cat,
        features: cat.features.filter(
          (f) => f.title.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q),
        ),
      }))
      .filter((c) => c.features.length > 0);
  }, [query, activeCatSlug]);

  const TABS: { id: View; label: string }[] = [
    { id: "start", label: "Übersicht" },
    { id: "meine", label: "Kurse" },
    { id: "tools", label: "Tools" },
    { id: "themen", label: "Themen" },
  ];

  const featuredQuizzes = QUIZZES.slice(0, 3);
  const nextStepTarget = startplanState.naechster
    ? startplanState.naechster.guideSlug && startplanState.laufend[startplanState.naechster.guideSlug]
      ? `/playbook/${startplanState.laufend[startplanState.naechster.guideSlug]}`
      : startplanState.naechster.ziel
    : "/playbooks";

  return (
    <div className="container max-w-6xl px-4 pb-24 pt-5 md:px-6 md:pb-16 md:pt-7">
      {params.get("checkout") === "success" && <AffiliateSuccessBanner />}

      {/* Ruhiger Revolut × Lexoffice Begrüßungskopf direkt auf der hellen Fläche */}
      {view === "start" ? (
        <>
          <header className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h1 className="text-balance text-2xl font-bold leading-tight tracking-[-0.025em] text-primary sm:text-[1.9rem]">
                Hi {profile?.first_name ?? "Gründer"}
              </h1>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs">
                {merkmale.length > 0 ? (
                  merkmale.map((m) => (
                    <span
                      key={m}
                      className="rounded-[6px] border border-border bg-white px-2 py-0.5 font-medium text-foreground/80"
                    >
                      {m}
                    </span>
                  ))
                ) : (
                  <span className="text-muted-foreground">Dein persönliches Gründer-Cockpit</span>
                )}
                <Link
                  to="/onboarding?bearbeiten=1"
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 font-semibold text-accent-blue hover:underline"
                >
                  <Settings2 className="h-3 w-3" aria-hidden="true" />
                  Anpassen
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                to="/playbooks"
                className="press inline-flex h-10 items-center gap-1.5 rounded-[10px] bg-primary px-4 text-xs font-semibold text-white hover:bg-primary/90"
              >
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                Alle {PLAYBOOKS.length} Kurse
              </Link>
              <Link
                to="/felix"
                className="press inline-flex h-10 items-center gap-1.5 rounded-[10px] border border-border bg-white px-3.5 text-xs font-semibold text-foreground hover:border-primary/40 hover:text-primary"
              >
                <MessageSquare className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
                Felix fragen
              </Link>
            </div>
          </header>

          {/* 4 kompakte Revolut Status-Kacheln: in 2 Sekunden Orientierung */}
          <section aria-label="Dein aktueller Stand" className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Link
              to={nextStepTarget}
              className="press group rounded-2xl border border-border bg-white p-4 shadow-card transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-muted-foreground">Fahrplan</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#EDF4FF] text-[#1E40AF]">
                  <Route className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-2 text-lg font-bold tracking-tight text-primary tabular">
                {startplanState.erledigt} / {startplanState.schritte.length}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-brand-green transition-[width] duration-300" style={{ width: `${Math.max(planPct, 5)}%` }} />
              </div>
            </Link>

            <Link
              to="/playbooks"
              className="press group rounded-2xl border border-border bg-white p-4 shadow-card transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-muted-foreground">Kurse</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#ECF8F3] text-brand-green">
                  <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-2 text-lg font-bold tracking-tight text-primary tabular">
                {activeRunsCount > 0 ? `${activeRunsCount} aktiv` : `${PLAYBOOKS.length} Kurse`}
              </p>
              <p className="mt-1 truncate text-[11px] font-medium text-muted-foreground tabular">
                {gam.completedSteps.length > 0
                  ? `${gam.completedSteps.length} Lektionen erledigt`
                  : `${PLAYBOOKS.length} Kurse verfügbar`}
              </p>
            </Link>

            <Link
              to="/quiz"
              className="press group rounded-2xl border border-border bg-white p-4 shadow-card transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-muted-foreground">Level {lvl.level}</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-brand-green-soft text-brand-green">
                  <Zap className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-2 text-lg font-bold tracking-tight text-primary tabular">{gam.xp} XP</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-brand-green transition-[width] duration-300"
                    style={{ width: `${Math.max(lvl.progressPercent, 6)}%` }}
                  />
                </div>
                {gam.streak > 0 && (
                  <span className="inline-flex shrink-0 items-center gap-0.5 text-[10px] font-bold text-amber-700 tabular">
                    <Flame className="h-3 w-3" aria-hidden="true" />
                    {gam.streak}T
                  </span>
                )}
              </div>
            </Link>

            <Link
              to="/quiz"
              className="press group rounded-2xl border border-border bg-white p-4 shadow-card transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-muted-foreground">Abzeichen</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#FDF6E7] text-[#B45309]">
                  <Award className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-2 text-lg font-bold tracking-tight text-primary tabular">
                {gam.badges.length} / {ALL_BADGES.length}
              </p>
              <p className="mt-1 truncate text-[11px] font-semibold text-accent-blue group-hover:underline">
                Quizze (+150 XP) →
              </p>
            </Link>
          </section>

          {/* Revolut Mobile Quick-Action Rail: direkter 1-Tap-Zugang zu den wichtigsten Bereichen */}
          <section aria-label="Schnellzugriff" className="mb-5 grid grid-cols-3 gap-2 sm:grid-cols-6 md:hidden">
            {MOBILE_QUICK_ACTIONS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => hapticSelection()}
                  className="press flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-border bg-white px-2 py-2.5 shadow-card"
                >
                  <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl", item.bg, item.fg)}>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="truncate text-[11px] font-semibold text-foreground">{item.label}</span>
                </Link>
              );
            })}
          </section>
        </>
      ) : (
        <header className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
              {view === "tools" ? "Tools & Rechner" : view === "meine" ? "Deine Kurse" : "Alle Themen"}
            </h1>
            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
              {view === "tools"
                ? "Rechner, Wizards und Vorlagen für Gründung, Steuern und Wachstum."
                : view === "meine"
                  ? "Alle Schritt-für-Schritt-Kurse mit Checklisten und Fortschritt."
                  : "Alle Werkzeuge nach Fachbereich geordnet."}
            </p>
          </div>
        </header>
      )}

      {/* Ruhiger Segmented View Switcher */}
      <div
        role="tablist"
        aria-label="Bereiche"
        className="mb-6 inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-border bg-secondary/75 p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={view === t.id}
            onClick={() => {
              hapticSelection();
              params.delete("cat");
              params.set("view", t.id);
              setParams(params);
            }}
            className={cn(
              "press min-h-9 whitespace-nowrap rounded-[9px] px-3.5 text-xs font-semibold transition-all sm:text-sm",
              view === t.id
                ? "bg-white text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* START view — klar gegliedert, ohne Überladung */}
      {view === "start" && (
        <>
          <ZuletztGeoeffnet pfade={zuletzt} />
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* LINKE HAUPTSPALT: Weiterlernen, Fahrplan, Kurse, Quizze, Tools */}
            <div className="min-w-0 space-y-6">
              <ContinueLearning />

              <Startplan
                profil={planProfil}
                planAendernLink="/onboarding?bearbeiten=1"
                planState={startplanState}
              />

              {/* Kurse für dein Vorhaben */}
              <section>
                <SectionHead
                  title="Kurse für dein Vorhaben"
                  lead="Schritt für Schritt mit Checklisten, Tipps und Arbeitsfenstern."
                  action={
                    <Link
                      to="/playbooks"
                      className="inline-flex items-center gap-1 text-xs font-bold text-accent-blue hover:underline"
                    >
                      Alle {PLAYBOOKS.length} Kurse <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  }
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  {featuredGuides.map((g) => (
                    <GuideCard key={g.slug} pb={g} />
                  ))}
                </div>
              </section>

              {/* Kompakte Quiz-Checks */}
              <section>
                <SectionHead
                  title="Kurz-Quizze & Praxis-Checks"
                  lead="In 60 Sekunden Wissen prüfen und XP sammeln."
                  action={
                    <Link
                      to="/quiz"
                      className="inline-flex items-center gap-1 text-xs font-bold text-accent-blue hover:underline"
                    >
                      Alle {QUIZZES.length} Quizze <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  }
                />
                <div className="grid gap-3 sm:grid-cols-3">
                  {featuredQuizzes.map((qz) => (
                    <Link
                      key={qz.slug}
                      to={`${qz.routePrefix}/${qz.slug}`}
                      className="press group flex flex-col rounded-2xl border border-border bg-white p-4 shadow-card transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-md"
                    >
                      <div className="mb-2 flex items-center justify-between gap-2 text-[11px] font-bold">
                        <span className="rounded-[6px] bg-secondary px-2 py-0.5 text-primary">{qz.kategorie}</span>
                        <span className="inline-flex items-center gap-0.5 text-brand-green tabular">
                          <Trophy className="h-3 w-3" aria-hidden="true" /> +{qz.xp} XP
                        </span>
                      </div>
                      <p className="text-sm font-bold leading-snug text-foreground group-hover:text-primary">{qz.titel}</p>
                      <p className="mt-1 flex-1 text-xs text-muted-foreground line-clamp-2">{qz.lead}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-accent-blue">
                        Starten <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              <ToolEmpfehlungen profil={planProfil} locked={!isActive} />
            </div>

            {/* RECHTE KONTEXT-SPALTE: ruhig, fokussiert, einheitliche weiße Karten */}
            <aside className="min-w-0 space-y-4">
              <DeineWoche />
              <JahreswechselKachel />
              <EventRadarKachel />
              <FelixFragen profil={planProfil} />
              <VergleichTipps profil={planProfil} />
            </aside>
          </div>
        </>
      )}

      {/* MEINE view */}
      {view === "meine" && (
        <div className="space-y-8">
          <ContinueLearning />
          <section>
            <SectionHead
              title={`Alle ${PLAYBOOKS.length} Kurse`}
              lead="Mit Fortschrittsanzeige, Checklisten, Kurz-Checks und Arbeitsfenstern."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PLAYBOOKS.map((p) => (
                <GuideCard key={p.slug} pb={p} />
              ))}
            </div>
          </section>
        </div>
      )}

      {/* TOOLS view */}
      {view === "tools" && (
        <>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <SearchBar query={query} setQuery={setQuery} />
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <button
                type="button"
                onClick={() => {
                  hapticSelection();
                  params.delete("cat");
                  setParams(params);
                }}
                className={cn(
                  "press inline-flex h-9 shrink-0 items-center rounded-xl border px-3 text-xs font-semibold",
                  !activeCatSlug
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-white text-foreground/80 hover:border-primary/40",
                )}
              >
                Alle Bereiche
              </button>
              {CATEGORIES.slice(0, 6).map((cat) => {
                const selected = activeCatSlug === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => {
                      hapticSelection();
                      if (selected) params.delete("cat");
                      else params.set("cat", cat.slug);
                      setParams(params);
                    }}
                    className={cn(
                      "press inline-flex h-9 shrink-0 items-center rounded-xl border px-3 text-xs font-semibold",
                      selected
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-white text-foreground/80 hover:border-primary/40",
                    )}
                  >
                    {stripEmoji(cat.title)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Beliebteste Werkzeuge direkt griffbereit statt langem Scrollen */}
          {!query && !activeCatSlug && (
            <section className="mt-6" aria-label="Meistgenutzte Tools">
              <SectionHead
                title="Meistgenutzte Werkzeuge"
                lead="Direkt öffnen, ohne durch alle Bereiche zu scrollen."
              />
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                {TOP_QUICK_TOOLS.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.to}
                      to={tool.to}
                      onClick={() => hapticSelection()}
                      className="press group flex flex-col gap-2.5 rounded-2xl border border-border bg-white p-3.5 shadow-card transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-md sm:flex-row sm:items-start sm:gap-3 sm:p-4"
                    >
                      <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10", tool.bg, tool.fg)}>
                        <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-bold leading-snug text-primary group-hover:text-accent-blue sm:text-sm">
                          {tool.title}
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground sm:text-xs">{tool.sub}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          <div className="mt-8 space-y-12">
            {filteredCats.map((cat) => (
              <CategorySection key={cat.slug} cat={cat} locked={!isActive} />
            ))}
            {filteredCats.length === 0 && <NoResults q={query} />}
          </div>
        </>
      )}

      {/* THEMEN view */}
      {view === "themen" && (
        <>
          <div
            className="-mx-4 mb-6 flex gap-1.5 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0"
            role="group"
            aria-label="Themen filtern"
          >
            <button
              onClick={() => {
                params.delete("cat");
                setParams(params);
              }}
              aria-pressed={!activeCatSlug}
              className={cn(
                "shrink-0 rounded-[10px] border px-3.5 py-2 text-xs font-semibold transition-colors sm:text-sm",
                !activeCatSlug
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-white text-foreground/75 hover:border-foreground/25 hover:text-foreground",
              )}
            >
              Alle
            </button>
            {CATEGORIES.map((cat) => {
              const isSelected = activeCatSlug === cat.slug;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.slug}
                  onClick={() => {
                    params.set("cat", cat.slug);
                    setParams(params);
                  }}
                  aria-pressed={isSelected}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-[10px] border px-3.5 py-2 text-xs font-semibold transition-colors sm:text-sm",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-white text-foreground/75 hover:border-foreground/25 hover:text-foreground",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" /> {stripEmoji(cat.title)}
                </button>
              );
            })}
          </div>
          <SearchBar query={query} setQuery={setQuery} />
          <div className="mt-8 space-y-12">
            {filteredCats.map((cat) => (
              <CategorySection key={cat.slug} cat={cat} locked={!isActive} />
            ))}
            {filteredCats.length === 0 && <NoResults q={query} />}
          </div>
        </>
      )}
    </div>
  );
};

const SectionHead = ({ title, lead, action }: { title: string; lead?: string; action?: ReactNode }) => (
  <div className="mb-3.5 flex flex-wrap items-end justify-between gap-3">
    <div>
      <h2 className="text-base font-bold tracking-tight text-primary md:text-lg">{title}</h2>
      {lead && <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{lead}</p>}
    </div>
    {action}
  </div>
);

const SearchBar = ({ query, setQuery }: { query: string; setQuery: (s: string) => void }) => (
  <div className="relative max-w-md">
    <label htmlFor="dashboard-tool-suche" className="sr-only">
      Tools durchsuchen
    </label>
    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
    <Input
      id="dashboard-tool-suche"
      type="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Tools durchsuchen…"
      className="h-11 rounded-xl bg-white pl-10 text-base sm:text-sm"
    />
  </div>
);

const NoResults = ({ q }: { q: string }) => (
  <EmptyState
    icon={Search}
    title={`Keine Treffer${q ? ` für „${q}“` : ""}`}
    description="Versuch einen anderen Begriff, zum Beispiel USt, GmbH oder Rechnung."
  />
);

const CategorySection = ({ cat, locked }: { cat: FeatureCategory; locked: boolean }) => {
  const liveCount = cat.features.filter((f) => f.status === "live" || f.status === "beta").length;
  const isStarter = cat.slug === "starter";
  const Icon = cat.icon;
  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-border pb-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-bold leading-tight text-primary">{stripEmoji(cat.title)}</h2>
              {isStarter && <ToneBadge tone="accent">Für Einsteiger</ToneBadge>}
            </div>
            <p className="truncate text-sm text-muted-foreground">{cat.tagline}</p>
          </div>
        </div>
        {liveCount > 0 && (
          <span className="shrink-0 rounded-[8px] bg-secondary px-2.5 py-1 text-xs font-bold text-foreground/80 tabular">
            {liveCount} aktiv
          </span>
        )}
      </div>
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {cat.features.map((f) => (
          <FeatureCard key={f.slug} f={f} locked={locked} />
        ))}
      </div>
    </section>
  );
};

const STATUS_TONE: Record<Feature["status"], Tone> = {
  live: "success",
  beta: "info",
  soon: "neutral",
  planned: "neutral",
};

const FeatureCard = ({ f, locked }: { f: Feature; locked: boolean }) => {
  const isClickable = !!f.route;
  const showLock = locked && isClickable;
  const inner = (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-2xl border border-border bg-white p-4 shadow-card transition-[border-color,box-shadow]",
        isClickable && "cursor-pointer hover:border-primary/40 hover:shadow-md",
        !isClickable && "opacity-90",
      )}
    >
      <div className="mb-2.5 flex items-start justify-between">
        <ToneBadge tone={STATUS_TONE[f.status]}>{STATUS_LABEL[f.status]}</ToneBadge>
        {showLock && (
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary" aria-label="Im Abo enthalten">
            <Lock className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
          </span>
        )}
      </div>
      <h3 className="mb-1 text-sm font-bold leading-tight text-foreground">{f.title}</h3>
      <p className="flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-3">{f.desc}</p>
      {isClickable && (
        <div className="mt-3 inline-flex items-center text-xs font-bold text-accent-blue">
          Öffnen <ArrowUpRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
        </div>
      )}
    </div>
  );
  if (!isClickable) return inner;
  if (f.external) {
    return (
      <a href={f.route!} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return <Link to={f.route!}>{inner}</Link>;
};

export default Dashboard;
