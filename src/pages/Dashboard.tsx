import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES, STATUS_LABEL, type Feature, type FeatureCategory } from "@/data/features";
import {
  ArrowRight,
  ArrowUpRight,
  Crown,
  Lock,
  MessageSquare,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Profile {
  first_name: string | null;
  company_name: string | null;
}
interface Subscription {
  plan: string;
  status: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [sub, setSub] = useState<Subscription | null>(null);
  const [params, setParams] = useSearchParams();
  const activeCatSlug = params.get("cat");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase.from("profiles").select("first_name, company_name").eq("id", user.id).maybeSingle(),
      supabase.from("subscriptions").select("plan, status").eq("user_id", user.id).maybeSingle(),
    ]).then(([p, s]) => {
      setProfile(p.data);
      setSub(s.data);
    });
  }, [user]);

  const isActive = sub?.status === "active" || sub?.status === "trialing";

  // Stats
  const stats = useMemo(() => {
    const all = CATEGORIES.flatMap((c) => c.features);
    return {
      total: all.length,
      live: all.filter((f) => f.status === "live" || f.status === "beta").length,
      categories: CATEGORIES.length,
    };
  }, []);

  // Highlights – hand-picked live/beta features that should always show in hero
  const highlights = useMemo(() => {
    const all = CATEGORIES.flatMap((c) => c.features.map((f) => ({ ...f, cat: c })));
    return all.filter((f) => f.route && (f.status === "beta" || f.status === "live")).slice(0, 4);
  }, []);

  const visible = activeCatSlug
    ? CATEGORIES.filter((c) => c.slug === activeCatSlug)
    : CATEGORIES;

  // Search filter (across all categories when query is set)
  const searched = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return CATEGORIES.map((cat) => ({
      ...cat,
      features: cat.features.filter(
        (f) =>
          f.title.toLowerCase().includes(q) ||
          f.desc.toLowerCase().includes(q) ||
          cat.title.toLowerCase().includes(q)
      ),
    })).filter((c) => c.features.length > 0);
  }, [query]);

  const list = searched ?? visible;

  return (
    <div className="container max-w-7xl py-6 md:py-10 px-4 md:px-6">
      {/* Hero */}
      <header className="mb-8 md:mb-10">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-blue mb-2">
              Cockpit · Übersicht
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Hi {profile?.first_name ?? "Gründer"}.
            </h1>
            <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-xl">
              {profile?.company_name
                ? `Willkommen zurück, ${profile.company_name}. `
                : "Willkommen zurück. "}
              Alles für Gründung, Steuern, Compliance & Skalierung an einem Ort.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/felix">
              <Button size="sm" variant="outline" className="rounded-full gap-1.5">
                <MessageSquare className="h-3.5 w-3.5" /> Felix fragen
              </Button>
            </Link>
            {isActive ? (
              <Link to="/profile?tab=abrechnung">
                <Button size="sm" className="rounded-full gap-1.5">
                  <Crown className="h-3.5 w-3.5" /> Abo verwalten
                </Button>
              </Link>
            ) : (
              <Link to="/checkout">
                <Button size="sm" className="rounded-full gap-1.5">
                  <Zap className="h-3.5 w-3.5" /> Plan wählen
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-px rounded-2xl border border-border bg-border overflow-hidden mt-6">
          <Stat label="Features gesamt" value={stats.total} />
          <Stat label="Live & Beta" value={stats.live} accent />
          <Stat label="Kategorien" value={stats.categories} />
        </div>
      </header>

      {/* Quick start highlights */}
      {!activeCatSlug && !query && highlights.length > 0 && (
        <section className="mb-10">
          <SectionHeader
            kicker="Schnellstart"
            title="Direkt loslegen"
            sub="Live-Tools, die du sofort nutzen kannst."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {highlights.map((h) => (
              <Link
                key={h.slug}
                to={h.route!}
                className="group rounded-2xl border border-border bg-card p-4 hover:border-accent-blue/50 hover:shadow-soft transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg">{h.cat.emoji}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent-blue transition-colors" />
                </div>
                <h3 className="font-semibold text-sm leading-tight mb-1">{h.title}</h3>
                <p className="text-[11px] text-muted-foreground line-clamp-2">{h.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Search + Category filter */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Features durchsuchen..."
            className="pl-9 h-10 rounded-full bg-card"
          />
        </div>
        {activeCatSlug && (
          <button
            onClick={() => setParams({})}
            className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-border hover:bg-accent transition-colors"
          >
            ← Alle Kategorien
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-12">
        {list.map((cat) => (
          <CategorySection key={cat.slug} cat={cat} locked={!isActive} />
        ))}
        {list.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Search className="h-8 w-8 mx-auto mb-3 opacity-40" />
            <p className="text-sm">Keine Treffer für "{query}".</p>
          </div>
        )}
      </div>

      {/* Felix CTA */}
      <div className="mt-16 rounded-3xl bg-gradient-primary p-6 md:p-8 text-primary-foreground relative overflow-hidden shadow-glow">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent-blue/30 blur-3xl pointer-events-none" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold leading-tight">
                Steckst du fest? Frag Felix.
              </h2>
              <p className="mt-1.5 text-primary-foreground/85 text-sm max-w-lg">
                Dein KI-Co-Founder kennt sich mit Rechtsformen, Steuern, Holdings, US-LLC und
                Marketplaces aus.
              </p>
            </div>
          </div>
          <Link to="/felix">
            <Button
              size="lg"
              className="rounded-full bg-card text-primary hover:bg-card/90 h-11 px-6 font-semibold gap-1.5"
            >
              Chat öffnen <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value, accent }: { label: string; value: number; accent?: boolean }) => (
  <div className={cn("bg-card px-4 py-4 md:px-6 md:py-5", accent && "bg-accent/40")}>
    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
      {label}
    </p>
    <p className={cn("text-2xl md:text-3xl font-bold tracking-tight", accent && "text-accent-blue")}>
      {value}
    </p>
  </div>
);

const SectionHeader = ({
  kicker,
  title,
  sub,
}: {
  kicker?: string;
  title: string;
  sub?: string;
}) => (
  <div className="mb-4">
    {kicker && (
      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-blue mb-1">
        {kicker}
      </p>
    )}
    <h2 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h2>
    {sub && <p className="text-sm text-muted-foreground mt-1">{sub}</p>}
  </div>
);

const CategorySection = ({ cat, locked }: { cat: FeatureCategory; locked: boolean }) => {
  const liveCount = cat.features.filter((f) => f.status === "live" || f.status === "beta").length;
  return (
    <section>
      <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-border">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-11 w-11 rounded-xl bg-accent flex items-center justify-center text-xl shrink-0">
            {cat.emoji}
          </div>
          <div className="min-w-0">
            <h2 className="text-lg md:text-xl font-bold leading-tight truncate">{cat.title}</h2>
            <p className="text-xs text-muted-foreground truncate">{cat.tagline}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground shrink-0">
          {liveCount > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10 text-success font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> {liveCount} aktiv
            </span>
          )}
          <span className="hidden md:inline">{cat.features.length} Features</span>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {cat.features.map((f) => (
          <FeatureCard key={f.slug} f={f} locked={locked} />
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

const FeatureCard = ({ f, locked }: { f: Feature; locked: boolean }) => {
  const isClickable = !!f.route && !locked;
  const inner = (
    <div
      className={cn(
        "relative h-full rounded-2xl border border-border bg-card p-4 transition-all flex flex-col",
        isClickable
          ? "hover:shadow-soft hover:-translate-y-0.5 hover:border-accent-blue/40 cursor-pointer"
          : locked
          ? "opacity-75"
          : "opacity-90"
      )}
    >
      <div className="flex items-start justify-between mb-2.5">
        <span
          className={cn(
            "inline-flex rounded-full text-[9px] font-bold uppercase tracking-wider px-2 py-0.5",
            STATUS_STYLES[f.status]
          )}
        >
          {STATUS_LABEL[f.status]}
        </span>
        {locked && (
          <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center">
            <Lock className="h-3 w-3 text-muted-foreground" />
          </div>
        )}
      </div>
      <h3 className="font-semibold text-sm mb-1 leading-tight">{f.title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed flex-1">{f.desc}</p>
      {isClickable && (
        <div className="mt-3 inline-flex items-center text-[11px] font-semibold text-accent-blue">
          Öffnen <ArrowRight className="h-3 w-3 ml-1" />
        </div>
      )}
    </div>
  );
  return isClickable ? <Link to={f.route!}>{inner}</Link> : inner;
};

export default Dashboard;
