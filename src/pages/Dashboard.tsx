import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { CATEGORIES, STATUS_LABEL, type Feature, type FeatureCategory } from "@/data/features";
import { Lock, LogOut, Crown, Loader2, ArrowRight, Sparkles } from "lucide-react";

interface Profile {
  first_name: string | null;
  company_name: string | null;
  onboarding_completed?: boolean;
}
interface Subscription { plan: string; status: string }

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [sub, setSub] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState<string>(CATEGORIES[0].slug);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase.from("profiles").select("first_name, company_name, onboarding_completed").eq("id", user.id).maybeSingle(),
      supabase.from("subscriptions").select("plan, status").eq("user_id", user.id).maybeSingle(),
    ]).then(([p, s]) => {
      if (p.data && !p.data.onboarding_completed) {
        navigate("/onboarding", { replace: true });
        return;
      }
      setProfile(p.data);
      setSub(s.data);
      setLoading(false);
    });
  }, [user, navigate]);

  const handleSignOut = async () => { await signOut(); navigate("/"); };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-accent-blue" />
      </div>
    );
  }

  const isActive = sub?.status === "active" || sub?.status === "trialing";
  const current = CATEGORIES.find((c) => c.slug === activeCat) ?? CATEGORIES[0];

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-30">
        <div className="container max-w-7xl flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">G</div>
            <span className="font-bold tracking-tight">GründerX</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-muted-foreground">
              {profile?.first_name ?? user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="rounded-full">
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-7xl py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-blue mb-2">Cockpit</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Hi {profile?.first_name ?? "Gründer"} 👋
          </h1>
          <p className="mt-2 text-muted-foreground">
            {profile?.company_name ? `Willkommen zurück, ${profile.company_name}.` : "Willkommen in deinem Cockpit."}
          </p>
        </div>

        {!isActive && (
          <div className="rounded-3xl bg-gradient-primary p-6 md:p-8 text-primary-foreground mb-10 relative overflow-hidden shadow-glow">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-accent-blue/30 blur-3xl" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-semibold mb-3">
                  <Crown className="h-3.5 w-3.5" /> Upgrade nötig
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Schalte Felix & alle Features frei</h2>
                <p className="mt-2 text-primary-foreground/85 max-w-xl">
                  GründerX 99,99 €/Monat oder Founder Bundle (GründerX + AnwaltX) für 179,99 €/Monat. Stripe-Checkout kommt in Kürze.
                </p>
              </div>
              <Button size="lg" disabled className="rounded-full bg-card text-primary hover:bg-card/90 h-12 px-7 font-semibold opacity-90 cursor-not-allowed">
                Bald verfügbar
              </Button>
            </div>
          </div>
        )}

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-4 px-4 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const active = cat.slug === activeCat;
            return (
              <button
                key={cat.slug}
                onClick={() => setActiveCat(cat.slug)}
                className={`shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all border ${
                  active
                    ? "bg-primary text-primary-foreground border-primary shadow-soft"
                    : "bg-card text-foreground border-border hover:border-accent-blue/50"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.title}</span>
                <span className={`rounded-full text-[10px] px-1.5 py-0.5 ${active ? "bg-white/20" : "bg-secondary text-muted-foreground"}`}>
                  {cat.features.length}
                </span>
              </button>
            );
          })}
        </div>

        <CategorySection cat={current} locked={!isActive} />

        <div className="mt-12 rounded-2xl border border-dashed border-border bg-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-accent-blue mt-0.5" />
            <div>
              <h3 className="font-bold">Du vermisst etwas?</h3>
              <p className="text-sm text-muted-foreground">Sag uns, welches Tool dir am meisten Zeit sparen würde – wir priorisieren nach Voting.</p>
            </div>
          </div>
          <Link to="/roadmap">
            <Button variant="outline" className="rounded-full">Roadmap ansehen <ArrowRight className="h-4 w-4 ml-1" /></Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

const CategorySection = ({ cat, locked }: { cat: FeatureCategory; locked: boolean }) => (
  <section>
    <div className="flex items-center gap-3 mb-5">
      <div className="h-11 w-11 rounded-xl bg-accent flex items-center justify-center text-2xl">{cat.emoji}</div>
      <div>
        <h2 className="text-xl font-bold">{cat.title}</h2>
        <p className="text-sm text-muted-foreground">{cat.tagline}</p>
      </div>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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
        {locked && (
          <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center">
            <Lock className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        )}
      </div>
      <h3 className="font-bold mb-1 leading-tight">{f.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
      {isClickable && (
        <div className="mt-3 inline-flex items-center text-xs font-semibold text-accent-blue">
          Öffnen <ArrowRight className="h-3 w-3 ml-1" />
        </div>
      )}
    </div>
  );
  return isClickable ? <Link to={f.route!}>{inner}</Link> : inner;
};

export default Dashboard;
