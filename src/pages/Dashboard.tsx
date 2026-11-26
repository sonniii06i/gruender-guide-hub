import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useAccess } from "@/hooks/useAccess";
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
  Karte,
  MehrEntdecken,
  ToolEmpfehlungen,
  VergleichTipps,
  ZuletztGeoeffnet,
} from "@/components/dashboard/Empfehlungen";
import { GRUENDUNGS_GUIDE, profilMerkmale, rechtsformVon } from "@/lib/startplan";
import { zuletztGenutzt } from "@/lib/zuletztGenutzt";
import { AffiliateSuccessBanner } from "@/components/AffiliateSuccessBanner";
import { ReferralNudge } from "@/components/ReferralNudge";
import { EmptyState, ToneBadge, stripEmoji, type Tone } from "@/components/cockpit/kit";
import { ALL_BADGES, GAMIFICATION_EVENT, getLevelInfo, readGamification } from "@/lib/gamification";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CreditCard,
  Flame,
  GraduationCap,
  LayoutGrid,
  Lock,
  MessageSquare,
  Search,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Profile {
  first_name: string | null;
  onboarding_completed: boolean | null;
  business_model?: string | null;
  founder_stage?: string | null;
  legal_form?: string | null;
}

const VIEWS = ["start", "tools", "meine", "themen"] as const;
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
  const featuredGuides = useMemo(() => {
    const form = rechtsformVon(planProfil.legal_form);
    return empfohleneGuides(planProfil.business_model, 6, form ? GRUENDUNGS_GUIDE[form] : null);
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
    { id: "start", label: "Start" },
    { id: "meine", label: "Meine Kurse" },
    { id: "tools", label: "Tools & Rechner" },
    { id: "themen", label: "Themen" },
  ];

  const featuredQuizzes = QUIZZES.slice(0, 3);
  const ringRadius = 28;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringDashOffset = ringCircumference * (1 - Math.max(0.06, lvl.progressPercent / 100));

  return (
    <div className="container max-w-6xl px-4 pb-24 pt-5 md:px-6 md:pb-16 md:pt-7">
      {params.get("checkout") === "success" ? (
        <AffiliateSuccessBanner />
      ) : (
        <ReferralNudge className="mb-5" />
      )}

      {/* Masterclass × Duolingo Deep-Navy Studio Hero */}
      <section className="gx-stage relative mb-6 overflow-hidden rounded-3xl p-5 text-white shadow-lift md:p-7">
        <div className="gx-stage-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 text-xs font-bold text-[#6EE7B7]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Dein Lern-Studio
            </span>
            <h1 className="mt-3 text-balance text-2xl font-bold leading-tight tracking-[-0.025em] text-white md:text-[2rem]">
              Hi {profile?.first_name ?? "Gründer"}. Dein nächster Schritt wartet.
            </h1>

            {merkmale.length > 0 && (
              <ul className="mt-3 flex flex-wrap items-center gap-1.5" aria-label="Dein Profil">
                {merkmale.map((m) => (
                  <li
                    key={m}
                    className="rounded-lg border border-white/15 bg-white/[0.08] px-2.5 py-1 text-xs font-semibold text-white/90"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            )}

            {/* Studio-Schnellzugriff */}
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                to="/playbooks"
                className="press inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-[#10B981] px-4 text-xs font-bold text-[#042016] shadow-sm hover:bg-[#34D399]"
              >
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                Alle {PLAYBOOKS.length} Kurse
              </Link>
              <Link
                to="/playbook/preview/amex-us-beantragen"
                className="press inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-white/20 bg-white/[0.08] px-3.5 text-xs font-semibold text-white hover:bg-white/15"
              >
                <CreditCard className="h-3.5 w-3.5 text-[#FDE68A]" aria-hidden="true" />
                Amex US Guide
              </Link>
              <Link
                to="/quiz"
                className="press inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-white/20 bg-white/[0.08] px-3.5 text-xs font-semibold text-white hover:bg-white/15"
              >
                <Trophy className="h-3.5 w-3.5 text-[#6EE7B7]" aria-hidden="true" />
                Quizze (+150 XP)
              </Link>
              <Link
                to="/felix"
                className="press inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-white/20 bg-white/[0.08] px-3.5 text-xs font-semibold text-white hover:bg-white/15"
              >
                <MessageSquare className="h-3.5 w-3.5 text-sky-300" aria-hidden="true" />
                Felix fragen
              </Link>
            </div>
          </div>

          {/* Rechte Karte: Live Level-Ring, XP, Serie & Tages-Mission */}
          <div className="gx-glass rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-4">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64" aria-hidden="true">
                  <circle cx="32" cy="32" r={ringRadius} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="5" />
                  <circle
                    cx="32"
                    cy="32"
                    r={ringRadius}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={ringDashOffset}
                  />
                </svg>
                <span className="absolute text-sm font-bold text-white tabular">L{lvl.level}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#6EE7B7]">Dein Gründer-Level</p>
                <p className="truncate text-base font-bold text-white">
                  Level {lvl.level}: {lvl.titel}
                </p>
                <p className="mt-0.5 text-xs text-white/70 tabular">
                  {gam.xp} XP {lvl.nextXp > gam.xp ? `· noch ${lvl.nextXp - gam.xp} XP bis L${lvl.level + 1}` : "· Maximallevel"}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-black/20 px-2 py-2">
                <p className="inline-flex items-center gap-1 text-xs font-bold text-[#6EE7B7] tabular">
                  <Zap className="h-3 w-3" aria-hidden="true" /> {gam.xp}
                </p>
                <p className="text-[10px] text-white/60">XP gesamt</p>
              </div>
              <div className="rounded-xl bg-black/20 px-2 py-2">
                <p className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 tabular">
                  <Flame className="h-3 w-3" aria-hidden="true" /> {gam.streak} T
                </p>
                <p className="text-[10px] text-white/60">Serie</p>
              </div>
              <div className="rounded-xl bg-black/20 px-2 py-2">
                <p className="inline-flex items-center gap-1 text-xs font-bold text-sky-300 tabular">
                  <Award className="h-3 w-3" aria-hidden="true" /> {gam.badges.length}/{ALL_BADGES.length}
                </p>
                <p className="text-[10px] text-white/60">Abzeichen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Segmented View Switcher */}
      <div
        role="tablist"
        aria-label="Bereiche"
        className="mb-6 inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-2xl border border-border bg-secondary/80 p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={view === t.id}
            onClick={() => {
              params.delete("cat");
              params.set("view", t.id);
              setParams(params);
            }}
            className={cn(
              "press min-h-10 whitespace-nowrap rounded-xl px-4 text-sm font-semibold transition-all",
              view === t.id
                ? "bg-card text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* START view */}
      {view === "start" && (
        <>
          <ZuletztGeoeffnet pfade={zuletzt} />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:grid-rows-[auto_1fr]">
            <div className="order-1 min-w-0 lg:col-start-1 lg:row-start-1">
              <Startplan profil={planProfil} planAendernLink="/onboarding?bearbeiten=1" />
            </div>

            <div className="contents lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:block lg:min-w-0 lg:space-y-4">
              <div className="order-2 min-w-0 space-y-4">
                <DeineWoche />
                <JahreswechselKachel />
                <EventRadarKachel />
              </div>
              <div className="order-4 min-w-0 space-y-4">
                <FelixFragen profil={planProfil} />
                <VergleichTipps profil={planProfil} />
                <MehrEntdecken />
              </div>
            </div>

            <div className="order-3 min-w-0 space-y-7 lg:col-start-1 lg:row-start-2">
              <ContinueLearning />

              {/* Masterclass-Kurs-Empfehlungen mit visuellen Covern */}
              <section>
                <SectionHead
                  title="Kurse für dein Vorhaben"
                  lead="Visuell aufgebaut mit Checklisten, XP und direkten Arbeitsfenstern."
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
                  {featuredGuides.slice(0, 4).map((g) => (
                    <GuideCard key={g.slug} pb={g} />
                  ))}
                </div>
              </section>

              {/* Spielerische Quiz-Missionen direkt im Dashboard */}
              <section>
                <SectionHead
                  title="Schnelle XP-Missionen: Quizze & Checks"
                  lead="In 60 Sekunden Wissen testen, Schwachstellen finden und XP sammeln."
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
                      className="gx-card gx-card-hover press flex flex-col p-4"
                    >
                      <div className="mb-2 flex items-center justify-between gap-2 text-[11px] font-bold">
                        <span className="rounded-md bg-secondary px-2 py-0.5 text-primary">{qz.kategorie}</span>
                        <span className="inline-flex items-center gap-0.5 text-brand-green tabular">
                          <Zap className="h-3 w-3" aria-hidden="true" /> +{qz.xp} XP
                        </span>
                      </div>
                      <p className="text-sm font-bold leading-snug text-foreground">{qz.titel}</p>
                      <p className="mt-1 flex-1 text-xs text-muted-foreground line-clamp-2">{qz.lead}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">
                        Starten <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              <ToolEmpfehlungen profil={planProfil} locked={!isActive} />

              <Karte titel="Alle Themen" icon={LayoutGrid}>
                <ul className="grid sm:grid-cols-2">
                  {CATEGORIES.map((cat, i) => {
                    const Icon = cat.icon;
                    return (
                      <li
                        key={cat.slug}
                        className={cn(
                          "border-border",
                          i > 0 && "border-t",
                          i === 1 && "sm:border-t-0",
                          i % 2 === 0 && "sm:border-r",
                        )}
                      >
                        <button
                          onClick={() => {
                            params.set("view", "themen");
                            params.set("cat", cat.slug);
                            setParams(params);
                          }}
                          className="group flex h-full w-full items-start gap-3 px-4 py-3 text-left hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40"
                        >
                          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold leading-snug">{stripEmoji(cat.title)}</span>
                            <span className="mt-0.5 text-[13px] leading-snug text-muted-foreground line-clamp-1">
                              {cat.tagline}
                            </span>
                          </span>
                          <span className="shrink-0 rounded-md bg-secondary px-1.5 py-0.5 text-xs font-semibold text-muted-foreground tabular">
                            {cat.features.length}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </Karte>
            </div>
          </div>
        </>
      )}

      {/* MEINE view */}
      {view === "meine" && (
        <div className="space-y-8">
          <ContinueLearning />
          <section>
            <SectionHead
              title="Alle 81 Kurse im Lern-Studio"
              lead="Mit visuellem Fortschritt, Checklisten, XP und Arbeitsfenstern."
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
          <SearchBar query={query} setQuery={setQuery} />
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
                "shrink-0 rounded-xl border px-3.5 py-2 text-sm font-semibold transition-colors",
                !activeCatSlug
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground/75 hover:border-foreground/25 hover:text-foreground",
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
                    "inline-flex shrink-0 items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-semibold transition-colors",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground/75 hover:border-foreground/25 hover:text-foreground",
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
  <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
    <div>
      <h2 className="text-lg font-bold tracking-tight text-primary md:text-xl">{title}</h2>
      {lead && <p className="mt-0.5 text-sm text-muted-foreground">{lead}</p>}
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
      className="h-11 rounded-xl pl-10"
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
              {isStarter && <ToneBadge tone="accent">Für Anfänger:innen</ToneBadge>}
            </div>
            <p className="truncate text-sm text-muted-foreground">{cat.tagline}</p>
          </div>
        </div>
        {liveCount > 0 && (
          <span className="shrink-0 rounded-lg bg-secondary px-2.5 py-1 text-xs font-bold text-foreground/80 tabular">
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
        "gx-card relative flex h-full flex-col p-4",
        isClickable && "gx-card-hover cursor-pointer",
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
