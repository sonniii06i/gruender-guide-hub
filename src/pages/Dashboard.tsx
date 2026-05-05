import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { CATEGORIES, STATUS_LABEL, type Feature, type FeatureCategory } from "@/data/features";
import { PLAYBOOKS, getPlaybook } from "@/data/playbooks";
import { Lock, Crown, ArrowRight, Sparkles, Play, Trophy, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";

interface Profile { first_name: string | null; company_name: string | null }
interface Subscription { plan: string; status: string }
interface Run {
  id: string; playbook_slug: string; title: string; status: string;
  current_step: number; total_steps: number; last_activity_at: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [sub, setSub] = useState<Subscription | null>(null);
  const [runs, setRuns] = useState<Run[]>([]);
  const [params, setParams] = useSearchParams();
  const activeCatSlug = params.get("cat");

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase.from("profiles").select("first_name, company_name").eq("id", user.id).maybeSingle(),
      supabase.from("subscriptions").select("plan, status").eq("user_id", user.id).maybeSingle(),
      supabase.from("playbook_runs").select("*").eq("user_id", user.id).order("last_activity_at", { ascending: false }).limit(20),
    ]).then(([p, s, r]) => {
      setProfile(p.data); setSub(s.data); setRuns((r.data ?? []) as Run[]);
    });
  }, [user]);

  const isActive = sub?.status === "active" || sub?.status === "trialing";
  const visible = activeCatSlug ? CATEGORIES.filter((c) => c.slug === activeCatSlug) : CATEGORIES;
  const activeRuns = runs.filter((r) => r.status === "in_progress");
  const completedRuns = runs.filter((r) => r.status === "completed");
  const startedSlugs = new Set(runs.map((r) => r.playbook_slug));
  const suggested = PLAYBOOKS.filter((p) => !startedSlugs.has(p.slug)).slice(0, 3);

  return (
    <div className="container max-w-7xl py-8 px-4 md:px-6">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent-blue mb-1">Cockpit</p>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Hi {profile?.first_name ?? "Gründer"} 👋
        </h1>
        {profile?.company_name && (
          <p className="mt-1 text-sm text-muted-foreground">Willkommen zurück, {profile.company_name}.</p>
        )}
      </div>

      {!isActive && !activeCatSlug && (
        <div className="rounded-3xl bg-gradient-primary p-6 md:p-8 text-primary-foreground mb-8 relative overflow-hidden shadow-glow">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-accent-blue/30 blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-semibold mb-3">
                <Crown className="h-3.5 w-3.5" /> Upgrade nötig
              </div>
              <h2 className="text-xl md:text-2xl font-bold">Schalte Felix & alle Features frei</h2>
              <p className="mt-2 text-primary-foreground/85 max-w-xl text-sm">
                GründerX 99,99 €/Monat oder Founder Bundle 179,99 €/Monat.
              </p>
            </div>
            <Link to="/profile?tab=abrechnung">
              <Button size="lg" className="rounded-full bg-card text-primary hover:bg-card/90 h-11 px-6 font-semibold">
                Plan wählen
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Playbooks-Sektionen entfernt */}

        <button onClick={() => setParams({})} className="text-xs text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1">
          ← Alle Kategorien
        </button>
      )}

      <div className="space-y-10">
        {visible.map((cat) => <CategorySection key={cat.slug} cat={cat} locked={!isActive} />)}
      </div>

      <div className="mt-12 rounded-2xl border border-dashed border-border bg-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-accent-blue mt-0.5" />
          <div>
            <h3 className="font-bold">Frag Felix</h3>
            <p className="text-sm text-muted-foreground">Dein KI-Co-Founder hilft bei Steuern, Recht und Strategie.</p>
          </div>
        </div>
        <Link to="/felix">
          <Button variant="outline" className="rounded-full">Chat öffnen <ArrowRight className="h-4 w-4 ml-1" /></Button>
        </Link>
      </div>
    </div>
  );
};

const CategorySection = ({ cat, locked }: { cat: FeatureCategory; locked: boolean }) => (
  <section>
    <div className="flex items-center gap-3 mb-4">
      <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center text-xl">{cat.emoji}</div>
      <div>
        <h2 className="text-lg font-bold leading-tight">{cat.title}</h2>
        <p className="text-xs text-muted-foreground">{cat.tagline}</p>
      </div>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cat.features.map((f) => <FeatureCard key={f.slug} f={f} locked={locked} />)}
    </div>
  </section>
);

const STATUS_STYLES: Record<Feature["status"], string> = {
  live: "bg-success/15 text-success",
  beta: "bg-accent-blue/15 text-accent-blue",
  soon: "bg-secondary text-muted-foreground",
  planned: "bg-secondary text-muted-foreground",
};

const FeatureCard = ({ f, locked }: { f: Feature; locked: boolean }) => {
  const isClickable = !!f.route && !locked;
  const inner = (
    <div className={`relative h-full rounded-2xl border border-border bg-card p-5 shadow-card transition-all ${
      isClickable ? "hover:shadow-soft hover:-translate-y-1 hover:border-accent-blue/40 cursor-pointer" : locked ? "opacity-80" : ""
    }`}>
      <div className="flex items-start justify-between mb-3">
        <span className={`inline-flex rounded-full text-[10px] font-bold uppercase tracking-wider px-2 py-1 ${STATUS_STYLES[f.status]}`}>
          {STATUS_LABEL[f.status]}
        </span>
        {locked && <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center"><Lock className="h-3.5 w-3.5 text-muted-foreground" /></div>}
      </div>
      <h3 className="font-bold mb-1 leading-tight">{f.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
      {isClickable && <div className="mt-3 inline-flex items-center text-xs font-semibold text-accent-blue">Öffnen <ArrowRight className="h-3 w-3 ml-1" /></div>}
    </div>
  );
  return isClickable ? <Link to={f.route!}>{inner}</Link> : inner;
};

export default Dashboard;
