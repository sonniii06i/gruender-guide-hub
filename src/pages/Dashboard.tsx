import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useAccess } from "@/hooks/useAccess";
import { readProfileCache, writeProfileCache, PROFILE_UPDATE_EVENT, type CachedProfile } from "@/lib/profileCache";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES, STATUS_LABEL, categoryToolCount, type Feature, type FeatureCategory } from "@/data/features";
import { PLAYBOOKS } from "@/data/playbooks";
import { empfohleneGuides } from "@/lib/guideEmpfehlung";
import { GuideCard } from "@/components/dashboard/GuideCard";
import { ContinueLearning } from "@/components/dashboard/ContinueLearning";
import { EventRadarKachel } from "@/components/dashboard/EventRadarKachel";
import { DeineWoche } from "@/components/dashboard/DeineWoche";
import { WelcomeChoiceModal } from "@/components/dashboard/WelcomeChoiceModal";
import { AffiliateSuccessBanner } from "@/components/AffiliateSuccessBanner";
import { ReferralNudge } from "@/components/ReferralNudge";
import {
  ArrowRight,
  ArrowUpRight,
  Lock,
  MessageSquare,
  Search,
  Sparkles,
  Sprout,
} from "lucide-react";
import { EmptyState, ToneBadge, stripEmoji, type Tone } from "@/components/cockpit/kit";
import { cn } from "@/lib/utils";

interface Profile { first_name: string | null; onboarding_completed: boolean | null; business_model?: string | null }

const VIEWS = ["start", "tools", "meine", "themen"] as const;
type View = typeof VIEWS[number];

const STARTER_COUNT = categoryToolCount("starter");

const Dashboard = () => {
  const { user } = useAuth();
  // Lazy-Init aus localStorage-Cache → keine Flacker-Flicker beim Render.
  // Aktualisierung nur via Event von /profile beim expliziten Speichern.
  const [profile, setProfile] = useState<Profile | null>(() => readProfileCache(user?.id) as Profile | null);
  // Zugang aus dem gemeinsamen useAccess-Zustand: kennt auch comp_access und
  // Admins (wie PaywallGate). Vorher galten beide hier als "gesperrt".
  const { hasActiveSub, isAdmin } = useAccess();
  const [params, setParams] = useSearchParams();
  const view = (params.get("view") as View) || "start";
  const activeCatSlug = params.get("cat");
  const [query, setQuery] = useState("");

  // Frueher meldete hier ?checkout=success einen Kauf. success_url zeigt
  // seit dem Umbau auf /zahlung-erfolgreich; der Zweig war tot und zaehlte nur
  // noch nackte URL-Aufrufe als Kauf. Die Messung lebt in ZahlungErfolgreich.

  useEffect(() => {
    if (!user) return;

    // Profil nur fetchen, wenn Cache leer ist (erstes Mal nach Login).
    //    Spätere Änderungen kommen über das PROFILE_UPDATE_EVENT von /profile.
    const cached = readProfileCache(user.id);
    if (cached) {
      setProfile(cached as Profile);
      // Onboarding schreibt den Cache nicht neu → bei "nicht abgeschlossen" im Hintergrund frisch laden,
      // sonst bleibt der Hinweis "Profil vervollständigen" bis zum Logout stehen.
      // Ältere Caches kennen business_model nicht → einmal frisch laden (Guide-Empfehlung).
      if (cached.onboarding_completed !== false && "business_model" in cached) return;
    }
    supabase.from("profiles").select("first_name, onboarding_completed, business_model").eq("id", user.id).maybeSingle()
      .then(({ data }) => {
        if (data) {
          setProfile(data as Profile);
          writeProfileCache(user.id, data as CachedProfile);
        }
      });
  }, [user]);

  // Event-Listener: Profile-Änderungen (Same-Tab via CustomEvent, Cross-Tab via storage).
  useEffect(() => {
    if (!user) return;
    const onProfileUpdate = (e: Event) => {
      const detail = (e as CustomEvent<CachedProfile>).detail;
      if (detail) setProfile(detail as Profile);
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === `gx-profile-${user.id}` && e.newValue) {
        try { setProfile(JSON.parse(e.newValue) as Profile); } catch { /* ignore */ }
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

  const featuredGuides = useMemo(() => empfohleneGuides(profile?.business_model), [profile?.business_model]);

  const filteredCats = useMemo(() => {
    const q = query.trim().toLowerCase();
    let cats = activeCatSlug ? CATEGORIES.filter((c) => c.slug === activeCatSlug) : CATEGORIES;
    if (!q) return cats;
    return cats
      .map((cat) => ({
        ...cat,
        features: cat.features.filter(
          (f) => f.title.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q)
        ),
      }))
      .filter((c) => c.features.length > 0);
  }, [query, activeCatSlug]);

  const TABS: { id: View; label: string }[] = [
    { id: "start", label: "Start" },
    { id: "meine", label: "Meine Guides" },
    { id: "tools", label: "Tools & Rechner" },
    { id: "themen", label: "Themen" },
  ];

  return (
    <div className="container max-w-6xl px-4 pb-16 pt-6 md:px-6 md:pt-8">
      {params.get("checkout") === "success" ? (
        <AffiliateSuccessBanner />
      ) : (
        /* Kein Kauf-Kontext: Reflink trotzdem zeigen — aber erst nachdem der
           Nutzer echten Nutzen hatte (Felix-Antwort, Tool-Ergebnis). */
        <ReferralNudge className="mb-6" />
      )}
      <WelcomeChoiceModal firstName={profile?.first_name} eligible={isActive} />
      {/* Hero */}
      <header className="mb-5">
        <p className="text-[13px] font-medium text-muted-foreground">Dein Cockpit</p>
        <h1 className="mt-1 text-2xl font-semibold leading-tight tracking-[-0.02em] md:text-[1.75rem]">
          Hi {profile?.first_name ?? "Gründer"}. Wo willst du heute weitermachen?
        </h1>
        <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-muted-foreground md:text-[15px]">
          Schritt-für-Schritt-Guides, Rechner und Anbieter-Vergleiche für Gründung, Steuern, Compliance und Skalierung.
        </p>

        {/* Banner Onboarding */}
        {profile && !profile.onboarding_completed && (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <Sparkles className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-sm font-semibold">Profil vervollständigen</p>
                <p className="text-sm text-muted-foreground">Damit wir dir die passenden Guides empfehlen können.</p>
              </div>
            </div>
            <Button asChild size="sm" variant="outline">
              <Link to="/onboarding">Jetzt einrichten</Link>
            </Button>
          </div>
        )}
      </header>

      {/* View tabs */}
      <div role="tablist" aria-label="Bereiche" className="-mx-4 mb-6 flex items-center gap-5 overflow-x-auto border-b border-border px-4 md:mx-0 md:px-0">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={view === t.id}
            onClick={() => { params.delete("cat"); params.set("view", t.id); setParams(params); }}
            className={cn(
              "relative min-h-11 whitespace-nowrap px-0.5 py-2.5 text-sm font-medium transition-colors",
              view === t.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
            {view === t.id && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-primary" aria-hidden="true" />
            )}
          </button>
        ))}
      </div>

      {/* START view */}
      {view === "start" && (
        <div className="space-y-8">
          <ContinueLearning />

          <EventRadarKachel />

          <DeineWoche />

          <StarterHighlight isActive={isActive} />

          <section>
            <SectionHead
              title="Direkt loslegen"
              lead="Praxis-Guides, die dich von 0 bis fertig führen."
              action={
                <Link to="/playbooks" className="inline-flex items-center gap-1 text-sm font-medium text-accent-blue hover:underline">
                  Alle Guides <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              }
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredGuides.map((p) => <GuideCard key={p.slug} pb={p} />)}
            </div>
          </section>

          <section>
            <SectionHead title="Was beschäftigt dich?" lead="Alle Tools nach Themen sortiert." />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((cat) => {
                const isStarter = cat.slug === "starter";
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => { params.set("view", "themen"); params.set("cat", cat.slug); setParams(params); }}
                    className={cn(
                      "press group flex items-start gap-3 rounded-lg border border-border bg-card p-3.5 text-left hover:border-foreground/30"
                    )}
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="text-sm font-semibold leading-tight">{stripEmoji(cat.title)}</span>
                        {isStarter && <ToneBadge tone="accent">Empfohlen</ToneBadge>}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground line-clamp-2">{cat.tagline}</span>
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground tabular">{cat.features.length}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <FelixCTA />
        </div>
      )}

      {/* MEINE view */}
      {view === "meine" && (
        <div className="space-y-10">
          <ContinueLearning />
          <section>
            <SectionHead title="Starte einen neuen Guide" lead="Alle Guides, mit Fortschritt und Abhak-Listen." />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PLAYBOOKS.map((p) => <GuideCard key={p.slug} pb={p} />)}
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
          <div className="-mx-4 mb-6 flex gap-1.5 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0" role="group" aria-label="Themen filtern">
            <button
              onClick={() => { params.delete("cat"); setParams(params); }}
              aria-pressed={!activeCatSlug}
              className={cn(
                "shrink-0 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                !activeCatSlug
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground/75 hover:border-foreground/25 hover:text-foreground"
              )}
            >
              Alle
            </button>
            {CATEGORIES.map((cat) => {
              const isActive = activeCatSlug === cat.slug;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.slug}
                  onClick={() => { params.set("cat", cat.slug); setParams(params); }}
                  aria-pressed={isActive}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground/75 hover:border-foreground/25 hover:text-foreground"
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
      <h2 className="text-base font-semibold md:text-lg">{title}</h2>
      {lead && <p className="mt-0.5 text-sm text-muted-foreground">{lead}</p>}
    </div>
    {action}
  </div>
);

const SearchBar = ({ query, setQuery }: { query: string; setQuery: (s: string) => void }) => (
  <div className="relative max-w-md">
    <label htmlFor="dashboard-tool-suche" className="sr-only">Tools durchsuchen</label>
    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
    <Input
      id="dashboard-tool-suche"
      type="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Tools durchsuchen…"
      className="h-10 pl-9"
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

const FelixCTA = () => (
  <div className="rounded-lg border border-border bg-card p-5">
    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div className="flex items-start gap-3">
        <MessageSquare className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <div>
          <h2 className="text-base font-semibold leading-tight md:text-lg">Steckst du fest? Frag Felix.</h2>
          <p className="mt-1 max-w-lg text-sm text-muted-foreground">
            Dein KI-Co-Founder kennt sich mit Rechtsformen, Steuern, Holdings, US-LLC und Marketplaces aus.
          </p>
        </div>
      </div>
      <Button asChild variant="outline" className="shrink-0">
        <Link to="/felix">
          Chat öffnen <ArrowRight aria-hidden="true" />
        </Link>
      </Button>
    </div>
  </div>
);

const CategorySection = ({ cat, locked }: { cat: FeatureCategory; locked: boolean }) => {
  const liveCount = cat.features.filter((f) => f.status === "live" || f.status === "beta").length;
  const isStarter = cat.slug === "starter";
  const Icon = cat.icon;
  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-border pb-3">
        <div className="flex min-w-0 items-center gap-3">
          <Icon className="h-[18px] w-[18px] shrink-0 text-muted-foreground" aria-hidden="true" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-semibold leading-tight">{stripEmoji(cat.title)}</h2>
              {isStarter && <ToneBadge tone="accent">Für Anfänger:innen</ToneBadge>}
            </div>
            <p className="truncate text-sm text-muted-foreground">{cat.tagline}</p>
          </div>
        </div>
        {liveCount > 0 && (
          <span className="shrink-0 text-sm text-muted-foreground tabular">{liveCount} aktiv</span>
        )}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cat.features.map((f) => <FeatureCard key={f.slug} f={f} locked={locked} />)}
      </div>
    </section>
  );
};

/**
 * Prominente Hervorhebung der Starter-Kategorie auf dem Start-View.
 * Zeigt die ersten 4 Anfänger-Tools direkt klickbar an, mit klarer
 * "Empfohlen für Anfänger"-Botschaft.
 */
const StarterHighlight = ({ isActive }: { isActive: boolean }) => {
  const starterCat = CATEGORIES.find((c) => c.slug === "starter");
  if (!starterCat) return null;
  // Erste 4 Tools als Quick-Start-Cards
  const quickStart = starterCat.features.slice(0, 4);
  return (
    <section className="rounded-lg border border-border bg-card p-5">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <Sprout className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-muted-foreground">Für Einsteiger:innen, {STARTER_COUNT} Tools</p>
            <h2 className="mt-0.5 text-base font-semibold md:text-lg">Du startest gerade? Hier entlang.</h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Von „Brauche ich überhaupt ein Gewerbe?“ bis zur ersten §14-konformen Rechnung: {STARTER_COUNT} Tools, die durch die ersten 90 Tage führen. Mit personalisierten Empfehlungen und PDF-Vorbereitung für Bürgeramt und Finanzamt.
            </p>
          </div>
        </div>
        <Button asChild variant="outline" className="shrink-0">
          <Link to="/dashboard?view=themen&cat=starter">
            Alle {STARTER_COUNT} Tools <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </div>
      <ol className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {quickStart.map((f, i) => (
          <li key={f.slug}>
            <Link
              to={f.route ? f.route : isActive ? "/dashboard?view=themen&cat=starter" : "/preise"}
              className="press group flex h-full flex-col rounded-md border border-border bg-background p-3.5 hover:border-foreground/30 hover:bg-card"
            >
              <span className="mb-1.5 text-xs font-semibold text-muted-foreground tabular">Schritt {i + 1}</span>
              <span className="mb-1 text-sm font-semibold leading-tight">{f.title}</span>
              <span className="text-xs leading-relaxed text-muted-foreground line-clamp-2">{f.desc}</span>
            </Link>
          </li>
        ))}
      </ol>
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
    <div className={cn(
      "relative flex h-full flex-col rounded-lg border border-border bg-card p-4 transition-colors duration-150",
      isClickable && "cursor-pointer hover:border-foreground/30 active:translate-y-px",
      !isClickable && "opacity-90"
    )}>
      <div className="mb-2.5 flex items-start justify-between">
        <ToneBadge tone={STATUS_TONE[f.status]}>{STATUS_LABEL[f.status]}</ToneBadge>
        {showLock && (
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary" aria-label="Im Abo enthalten">
            <Lock className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
          </span>
        )}
      </div>
      <h3 className="mb-1 text-sm font-semibold leading-tight">{f.title}</h3>
      <p className="flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-3">{f.desc}</p>
      {isClickable && (
        <div className="mt-3 inline-flex items-center text-xs font-semibold text-accent-blue">
          Öffnen <ArrowUpRight className="ml-1 h-3 w-3" aria-hidden="true" />
        </div>
      )}
    </div>
  );
  if (!isClickable) return inner;
  if (f.external) {
    return <a href={f.route!} target="_blank" rel="noopener noreferrer">{inner}</a>;
  }
  return <Link to={f.route!}>{inner}</Link>;
};

export default Dashboard;
