import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Lock,
  LogOut,
  Sparkles,
  MessageSquare,
  Building2,
  Calculator,
  ShoppingBag,
  FileCheck,
  Crown,
  Loader2,
} from "lucide-react";

interface Profile {
  first_name: string | null;
  company_name: string | null;
  business_model: string | null;
  legal_form: string | null;
}

interface Subscription {
  plan: string;
  status: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [sub, setSub] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase.from("profiles").select("first_name, company_name, business_model, legal_form, onboarding_completed").eq("id", user.id).maybeSingle(),
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

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-accent-blue" />
      </div>
    );
  }

  const isActive = sub?.status === "active" || sub?.status === "trialing";

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Topbar */}
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
        {/* Welcome */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-blue mb-2">Dashboard</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Hi {profile?.first_name ?? "Gründer"} 👋
          </h1>
          <p className="mt-2 text-muted-foreground">
            {profile?.company_name ? `Willkommen zurück, ${profile.company_name}.` : "Willkommen in deinem Cockpit."}
          </p>
        </div>

        {/* Paywall banner */}
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

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <FeatureCard
            icon={MessageSquare}
            title="Felix – KI-Chat"
            desc="Stell Felix deine Frage zu Gründung, Steuern, Marketplaces oder Brand-Compliance."
            locked={!isActive}
          />
          <FeatureCard
            icon={Building2}
            title="Rechtsform-Wizard"
            desc="Einzelunternehmen, UG, GmbH, US-LLC oder HK-Limited – Felix vergleicht für dich."
            locked={!isActive}
          />
          <FeatureCard
            icon={Calculator}
            title="Steuer-Cockpit"
            desc="USt-VA, OSS, Fristen-Kalender, IAB-Rechner und Pre-Year-End-Check."
            locked={!isActive}
          />
          <FeatureCard
            icon={ShoppingBag}
            title="Marketplace-Setup"
            desc="Schritt-für-Schritt: Amazon Seller, Kaufland, Shopify, Stripe, PayPal Business."
            locked={!isActive}
          />
          <FeatureCard
            icon={FileCheck}
            title="Compliance-Wizards"
            desc="WEEE/EAR, LUCID, BattG, GPSR, CPNP – alles richtig anmelden."
            locked={!isActive}
          />
          <FeatureCard
            icon={Sparkles}
            title="Brand-Launch-Check"
            desc="Marke (DPMA/EUIPO/USPTO), Domain & Social-Handles in einem Check."
            locked={!isActive}
          />
        </div>
      </main>
    </div>
  );
};

const FeatureCard = ({
  icon: Icon,
  title,
  desc,
  locked,
}: {
  icon: typeof MessageSquare;
  title: string;
  desc: string;
  locked: boolean;
}) => (
  <div className={`relative rounded-2xl border border-border bg-card p-6 shadow-card transition-all ${locked ? "opacity-75" : "hover:shadow-soft hover:-translate-y-1 cursor-pointer"}`}>
    {locked && (
      <div className="absolute top-4 right-4 h-7 w-7 rounded-full bg-secondary flex items-center justify-center">
        <Lock className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
    )}
    <div className="h-11 w-11 rounded-xl bg-accent flex items-center justify-center mb-4">
      <Icon className="h-5 w-5 text-accent-blue" />
    </div>
    <h3 className="font-bold text-lg mb-1">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
  </div>
);

export default Dashboard;
