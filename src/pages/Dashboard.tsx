import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { readProfileCache, writeProfileCache, PROFILE_UPDATE_EVENT, type CachedProfile } from "@/lib/profileCache";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES, STATUS_LABEL, categoryToolCount, type Feature, type FeatureCategory } from "@/data/features";
import { PLAYBOOKS } from "@/data/playbooks";
import { GuideCard } from "@/components/dashboard/GuideCard";
import { ContinueLearning } from "@/components/dashboard/ContinueLearning";
import { WelcomeChoiceModal } from "@/components/dashboard/WelcomeChoiceModal";
import { AffiliateSuccessBanner } from "@/components/AffiliateSuccessBanner";
import {
  ArrowRight,
  ArrowUpRight,
  Lock,
  MessageSquare,
  Search,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Profile { first_name: string | null; onboarding_completed: boolean | null }
interface Subscription { status: string }

const VIEWS = ["start", "tools", "meine", "themen"] as const;
type View = typeof VIEWS[number];

const STARTER_COUNT = categoryToolCount("starter");

const Dashboard = () => {
  const { user } = useAuth();
  // Lazy-Init aus localStorage-Cache → keine Flacker-Flicker beim Render.
  // Aktualisierung nur via Event von /profile beim expliziten Speichern.
  const [profile, setProfile] = useState<Profile | null>(() => readProfileCache(user?.id) as Profile | null);
  const [sub, setSub] = useState<Subscription | null>(null);
  const [params, setParams] = useSearchParams();
  const view = (params.get("view") as View) || "start";
  const activeCatSlug = params.get("cat");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!user) return;

    // 1) Subscription-Status immer frisch laden (kann sich serverseitig ändern: Stripe-Webhook).
    supabase.from("subscriptions").select("status").eq("user_id", user.id).maybeSingle()
      .then(({ data }) => setSub(data as Subscription | null));

    // 2) Profil nur fetchen, wenn Cache leer ist (erstes Mal nach Login).
    //    Spätere Änderungen kommen über das PROFILE_UPDATE_EVENT von /profile.
    const cached = readProfileCache(user.id);
    if (cached) {
      setProfile(cached as Profile);
      return;
    }
    supabase.from("profiles").select("first_name, onboarding_completed").eq("id", user.id).maybeSingle()
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

  const isActive = sub?.status === "active" || sub?.status === "trialing";

  const featuredGuides = useMemo(() => PLAYBOOKS.slice(0, 6), []);

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

  return (
    <div className="container max-w-6xl py-8 px-4 md:px-6">
      {params.get("checkout") === "success" && <AffiliateSuccessBanner />}
      <WelcomeChoiceModal firstName={profile?.first_name} eligible={isActive} />
      {/* Hero */}
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent-blue mb-1">
          Lernplattform · Cockpit
        </p>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Hi {profile?.first_name ?? "Gründer"}. Wo willst du heute weitermachen?
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl text-sm">
          Schritt-für-Schritt-Guides, Rechner und Anbieter-Vergleiche für Gründung, Steuern, Compliance & Skalierung – immer aktuell.
        </p>

        {/* Banner Onboarding */}
        {profile && !profile.onboarding_completed && (
          <div className="mt-5 rounded-2xl border border-accent-blue/30 bg-accent/40 px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-8 w-8 rounded-lg bg-accent-blue/15 flex items-center justify-center text-accent-blue shrink-0">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm">Profil vervollständigen</p>
                <p className="text-xs text-muted-foreground">Damit wir dir die passenden Guides empfehlen können.</p>
              </div>
            </div>
            <Link to="/onboarding">
              <Button size="sm" variant="outline" className="rounded-full">Jetzt einrichten</Button>
            </Link>
          </div>
        )}
      </header>

      {/* View tabs */}
      <div className="flex items-center gap-1.5 mb-8 border-b border-border overflow-x-auto">
        {[
          { id: "start", label: "Start" },
          { id: "meine", label: "Meine Guides" },
          { id: "tools", label: "Tools & Rechner" },
          { id: "themen", label: "Themen" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => { params.delete("cat"); params.set("view", t.id); setParams(params); }}
            className={cn(
              "relative px-3 py-2.5 text-sm font-medium transition-colors whitespace-nowrap",
              view === t.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
            {view === t.id && (
              <span className="absolute inset-x-2 -bottom-px h-0.5 bg-accent-blue rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* START view */}
      {view === "start" && (
        <>
          <ContinueLearning />

          <StarterHighlight isActive={isActive} />

          <section className="mb-12">
            <div className="flex items-end justify-between mb-4 gap-4 flex-wrap">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-blue mb-1">Beliebte Guides</p>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight">Direkt loslegen</h2>
                <p className="text-sm text-muted-foreground mt-1">Praxis-Guides, die dich von 0 bis fertig führen.</p>
              </div>
              <Link to="/playbooks" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                Alle Guides <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredGuides.map((p) => <GuideCard key={p.slug} pb={p} />)}
            </div>
          </section>

          <section className="mb-12">
            <div className="mb-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-blue mb-1">Themen</p>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">Was beschäftigt dich?</h2>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {CATEGORIES.map((cat) => {
                const isStarter = cat.slug === "starter";
                return (
                  <button
                    key={cat.slug}
                    onClick={() => { params.set("view", "themen"); params.set("cat", cat.slug); setParams(params); }}
                    className={cn(
                      "group shrink-0 rounded-2xl border px-4 py-3 transition-all text-left min-w-[180px] relative",
                      isStarter
                        ? "border-accent-blue/40 bg-gradient-to-br from-accent-blue/10 via-card to-card hover:shadow-soft hover:border-accent-blue/60"
                        : "border-border bg-card hover:border-accent-blue/40 hover:shadow-soft"
                    )}
                  >
                    {isStarter && (
                      <span className="absolute -top-2 -right-2 text-[9px] font-bold uppercase tracking-wider bg-accent-blue text-white px-1.5 py-0.5 rounded-full">Empfohlen</span>
                    )}
                    <div className="text-xl mb-1.5">{cat.emoji}</div>
                    <div className="font-semibold text-sm leading-tight">{cat.title}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{cat.tagline}</div>
                  </button>
                );
              })}
            </div>
          </section>

          <FelixCTA />
        </>
      )}

      {/* MEINE view */}
      {view === "meine" && (
        <>
          <ContinueLearning />
          <section className="mt-2">
            <div className="mb-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-blue mb-1">Empfohlen</p>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">Starte einen neuen Guide</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PLAYBOOKS.map((p) => <GuideCard key={p.slug} pb={p} />)}
            </div>
          </section>
        </>
      )}

      {/* TOOLS view */}
      {view === "tools" && (
        <>
          <SearchBar query={query} setQuery={setQuery} />
          <div className="space-y-12 mt-6">
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
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <button
              onClick={() => { params.delete("cat"); setParams(params); }}
              className={cn(
                "text-xs px-3 py-1.5 rounded-full border transition-colors",
                !activeCatSlug
                  ? "border-accent-blue bg-accent-blue/10 text-accent-blue font-semibold"
                  : "border-border hover:bg-accent text-muted-foreground"
              )}
            >
              Alle
            </button>
            {CATEGORIES.map((cat) => {
              const isStarter = cat.slug === "starter";
              const isActive = activeCatSlug === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => { params.set("cat", cat.slug); setParams(params); }}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-full border transition-colors inline-flex items-center gap-1.5 relative",
                    isActive
                      ? (isStarter ? "border-accent-blue bg-accent-blue/10 text-accent-blue font-semibold" : "border-accent-blue bg-accent-blue/10 text-accent-blue font-semibold")
                      : (isStarter ? "border-accent-blue/30 hover:bg-accent-blue/5" : "border-border hover:bg-accent")
                  )}
                >
                  <span>{cat.emoji}</span> {cat.title}
                  {isStarter && !isActive && (
                    <span className="text-[8px] font-bold uppercase tracking-wider bg-accent-blue text-white px-1 py-0 rounded-full ml-1">NEU</span>
                  )}
                </button>
              );
            })}
          </div>
          <SearchBar query={query} setQuery={setQuery} />
          <div className="space-y-12 mt-6">
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

const SearchBar = ({ query, setQuery }: { query: string; setQuery: (s: string) => void }) => (
  <div className="relative max-w-md">
    <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
    <Input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Tools durchsuchen…"
      className="pl-9 h-10 rounded-full bg-card"
    />
  </div>
);

const NoResults = ({ q }: { q: string }) => (
  <div className="text-center py-16 text-muted-foreground">
    <Search className="h-8 w-8 mx-auto mb-3 opacity-40" />
    <p className="text-sm">Keine Treffer{q ? ` für „${q}"` : ""}.</p>
  </div>
);

const FelixCTA = () => (
  <div className="rounded-3xl bg-gradient-primary p-6 md:p-8 text-primary-foreground relative overflow-hidden shadow-glow">
    <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent-blue/30 blur-3xl pointer-events-none" />
    <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold leading-tight">Steckst du fest? Frag Felix.</h2>
          <p className="mt-1.5 text-primary-foreground/85 text-sm max-w-lg">
            Dein KI-Co-Founder kennt sich mit Rechtsformen, Steuern, Holdings, US-LLC und Marketplaces aus.
          </p>
        </div>
      </div>
      <Link to="/felix">
        <Button size="lg" className="rounded-full bg-card text-primary hover:bg-card/90 h-11 px-6 font-semibold gap-1.5">
          Chat öffnen <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  </div>
);

const CategorySection = ({ cat, locked }: { cat: FeatureCategory; locked: boolean }) => {
  const liveCount = cat.features.filter((f) => f.status === "live" || f.status === "beta").length;
  const isStarter = cat.slug === "starter";
  return (
    <section className={cn(isStarter && "rounded-3xl border-2 border-accent-blue/30 bg-gradient-to-br from-accent-blue/5 via-card to-card p-4 md:p-6")}>
      <div className={cn(
        "flex items-center justify-between gap-3 mb-5 pb-3",
        !isStarter && "border-b border-border"
      )}>
        <div className="flex items-center gap-3 min-w-0">
          <div className={cn(
            "h-11 w-11 rounded-xl flex items-center justify-center text-xl shrink-0",
            isStarter ? "bg-accent-blue/15" : "bg-accent"
          )}>{cat.emoji}</div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg md:text-xl font-bold leading-tight">{cat.title}</h2>
              {isStarter && (
                <span className="text-[9px] font-bold uppercase tracking-wider bg-accent-blue text-white px-1.5 py-0.5 rounded-full">Für Anfänger:innen</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground truncate">{cat.tagline}</p>
          </div>
        </div>
        {liveCount > 0 && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10 text-success font-semibold text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> {liveCount} aktiv
          </span>
        )}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {cat.features.map((f) => <FeatureCard key={f.slug} f={f} locked={locked} isStarter={isStarter} />)}
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
    <section className="mb-12 rounded-3xl border-2 border-accent-blue/30 bg-gradient-to-br from-accent-blue/10 via-card to-card p-5 md:p-7">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
        <div className="flex items-start gap-3 min-w-0">
          <div className="h-12 w-12 rounded-2xl bg-accent-blue/15 flex items-center justify-center text-2xl shrink-0">
            🌱
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-blue">Für Einsteiger:innen</p>
              <span className="text-[9px] font-bold uppercase tracking-wider bg-accent-blue text-white px-1.5 py-0.5 rounded-full">{STARTER_COUNT} neue Tools</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">Du startest gerade? Hier entlang.</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              Von „Brauche ich überhaupt ein Gewerbe?" bis zur ersten §14-konformen Rechnung — {STARTER_COUNT} Tools, die durch die ersten 90 Tage führen. Mit personalisierten Empfehlungen und PDF-Vorbereitung für Bürgeramt/Finanzamt.
            </p>
          </div>
        </div>
        <Link
          to="/dashboard?view=themen&cat=starter"
          className="inline-flex items-center gap-1.5 rounded-full bg-accent-blue hover:bg-accent-blue/90 text-white px-4 py-2 text-sm font-semibold transition shrink-0"
        >
          Alle {STARTER_COUNT} Tools <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {quickStart.map((f, i) => (
          <Link
            key={f.slug}
            to={isActive && f.route ? f.route : "#"}
            className="rounded-xl border border-accent-blue/20 bg-card/80 hover:bg-card hover:border-accent-blue/50 hover:shadow-soft transition p-3 group"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-accent-blue mb-1">Schritt {i + 1}</div>
            <div className="font-semibold text-xs leading-tight mb-1 group-hover:text-accent-blue transition">{f.title}</div>
            <div className="text-[10px] text-muted-foreground line-clamp-2">{f.desc.slice(0, 90)}…</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const STATUS_STYLES: Record<Feature["status"], string> = {
  live: "bg-success/15 text-success",
  beta: "bg-accent-blue/15 text-accent-blue",
  soon: "bg-secondary text-muted-foreground",
  planned: "bg-secondary text-muted-foreground",
};

const FeatureCard = ({ f, locked, isStarter }: { f: Feature; locked: boolean; isStarter?: boolean }) => {
  const isClickable = !!f.route;
  const showLock = locked && isClickable;
  const inner = (
    <div className={cn(
      "relative h-full rounded-2xl border bg-card p-4 transition-all flex flex-col",
      isStarter ? "border-accent-blue/25" : "border-border",
      isClickable && (isStarter
        ? "hover:shadow-soft hover:-translate-y-0.5 hover:border-accent-blue/60 cursor-pointer"
        : "hover:shadow-soft hover:-translate-y-0.5 hover:border-accent-blue/40 cursor-pointer"),
      !isClickable && "opacity-90"
    )}>
      <div className="flex items-start justify-between mb-2.5">
        <span className={cn("inline-flex rounded-full text-[9px] font-bold uppercase tracking-wider px-2 py-0.5", STATUS_STYLES[f.status])}>
          {STATUS_LABEL[f.status]}
        </span>
        {showLock && (
          <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center">
            <Lock className="h-3 w-3 text-muted-foreground" />
          </div>
        )}
      </div>
      <h3 className="font-semibold text-sm mb-1 leading-tight">{f.title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-3">{f.desc}</p>
      {isClickable && (
        <div className="mt-3 inline-flex items-center text-[11px] font-semibold text-accent-blue">
          Öffnen <ArrowUpRight className="h-3 w-3 ml-1" />
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
