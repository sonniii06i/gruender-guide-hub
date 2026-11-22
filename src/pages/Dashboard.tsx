import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useAccess } from "@/hooks/useAccess";
import { readProfileCache, writeProfileCache, PROFILE_UPDATE_EVENT, type CachedProfile } from "@/lib/profileCache";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES, STATUS_LABEL, type Feature, type FeatureCategory } from "@/data/features";
import { PLAYBOOKS } from "@/data/playbooks";
import { empfohleneGuides } from "@/lib/guideEmpfehlung";
import { GuideCard } from "@/components/dashboard/GuideCard";
import { ContinueLearning } from "@/components/dashboard/ContinueLearning";
import { EventRadarKachel } from "@/components/dashboard/EventRadarKachel";
import { DeineWoche } from "@/components/dashboard/DeineWoche";
import { Startplan } from "@/components/dashboard/Startplan";
import { FelixFragen, GuideEmpfehlungen, Karte, MehrEntdecken, ToolEmpfehlungen, VergleichTipps, ZuletztGeoeffnet } from "@/components/dashboard/Empfehlungen";
import { GRUENDUNGS_GUIDE, profilMerkmale, rechtsformVon } from "@/lib/startplan";
import { zuletztGenutzt } from "@/lib/zuletztGenutzt";
import { AffiliateSuccessBanner } from "@/components/AffiliateSuccessBanner";
import { ReferralNudge } from "@/components/ReferralNudge";
import { ArrowUpRight, LayoutGrid, Lock, Search } from "lucide-react";
import { EmptyState, ToneBadge, stripEmoji, type Tone } from "@/components/cockpit/kit";
import { cn } from "@/lib/utils";

interface Profile {
  first_name: string | null;
  onboarding_completed: boolean | null;
  business_model?: string | null;
  founder_stage?: string | null;
  legal_form?: string | null;
}

const VIEWS = ["start", "tools", "meine", "themen"] as const;
type View = typeof VIEWS[number];

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
    // Cache nur für den ersten Anstrich. Danach immer frisch laden: Phase, Rechtsform und
    // Geschäftsmodell steuern den Fahrplan und können auf einem anderen Gerät geändert worden sein.
    if (cached) setProfile(cached as Profile);
    supabase.from("profiles").select("first_name, onboarding_completed, business_model, founder_stage, legal_form").eq("id", user.id).maybeSingle()
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

  const planProfil = useMemo(
    () => ({ business_model: profile?.business_model, founder_stage: profile?.founder_stage, legal_form: profile?.legal_form }),
    [profile?.business_model, profile?.founder_stage, profile?.legal_form],
  );
  const featuredGuides = useMemo(() => {
    const form = rechtsformVon(planProfil.legal_form);
    return empfohleneGuides(planProfil.business_model, 5, form ? GRUENDUNGS_GUIDE[form] : null);
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
      {/* Kopf */}
      <header className="mb-5">
        <p className="text-[13px] font-medium text-muted-foreground">Dein Cockpit</p>
        <h1 className="mt-1 text-2xl font-semibold leading-tight tracking-[-0.02em] text-balance md:text-[1.75rem]">
          Hi {profile?.first_name ?? "Gründer"}. Das steht als Nächstes an.
        </h1>
        {merkmale.length > 0 && (
          <ul className="mt-2.5 flex flex-wrap items-center gap-1.5" aria-label="Dein Profil">
            {merkmale.map((m) => (
              <li key={m} className="rounded border border-border bg-card px-2 py-1 text-xs font-medium text-foreground/80">{m}</li>
            ))}
          </ul>
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
        <>
          <ZuletztGeoeffnet pfade={zuletzt} />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:grid-rows-[auto_1fr]">
            <div className="order-1 min-w-0 lg:col-start-1 lg:row-start-1">
              <Startplan profil={planProfil} planAendernLink="/onboarding?bearbeiten=1" />
            </div>

            {/* Seitenspalte. Auf dem Handy löst sie sich auf: Termine direkt unter dem
                Fahrplan, Felix, Vergleiche und „Mehr“ erst nach Tools und Guides. */}
            <div className="contents lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:block lg:min-w-0 lg:space-y-4">
              <div className="order-2 min-w-0 space-y-4">
                <DeineWoche />
                <EventRadarKachel />
              </div>
              <div className="order-4 min-w-0 space-y-4">
                <FelixFragen profil={planProfil} />
                <VergleichTipps profil={planProfil} />
                <MehrEntdecken />
              </div>
            </div>

            <div className="order-3 min-w-0 space-y-6 lg:col-start-1 lg:row-start-2">
              <ContinueLearning />
              <ToolEmpfehlungen profil={planProfil} locked={!isActive} />
              <GuideEmpfehlungen guides={featuredGuides} />
              <Karte titel="Alle Themen" icon={LayoutGrid}>
                <ul className="grid sm:grid-cols-2">
                  {CATEGORIES.map((cat, i) => {
                    const Icon = cat.icon;
                    return (
                      <li key={cat.slug} className={cn("border-border", i > 0 && "border-t", i === 1 && "sm:border-t-0", i % 2 === 0 && "sm:border-r")}>
                        <button
                          onClick={() => { params.set("view", "themen"); params.set("cat", cat.slug); setParams(params); }}
                          className="group flex h-full w-full items-start gap-3 px-4 py-3 text-left hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40"
                        >
                          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-medium leading-snug">{stripEmoji(cat.title)}</span>
                            <span className="mt-0.5 text-[13px] leading-snug text-muted-foreground line-clamp-1">{cat.tagline}</span>
                          </span>
                          <span className="shrink-0 text-xs text-muted-foreground tabular">{cat.features.length}</span>
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
