import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAccess } from "@/hooks/useAccess";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Crown, Loader2, Check, LogOut } from "lucide-react";
import { toast } from "sonner";
import { STRIPE_PRICES } from "@/lib/stripe";
import Logo from "@/components/Logo";

const Checkout = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { loading: accLoading, hasActiveSub, isAdmin, onboardingCompleted, refresh } = useAccess();
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (accLoading) return;
    if (hasActiveSub || isAdmin) {
      navigate(onboardingCompleted ? "/dashboard" : "/onboarding", { replace: true });
    }
  }, [accLoading, hasActiveSub, isAdmin, onboardingCompleted, navigate]);

  const checkout = async (priceId: string) => {
    setBusy(priceId);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", { body: { priceId } });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch (e: any) { toast.error(e.message); setBusy(null); }
  };

  if (authLoading || accLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-accent-blue" /></div>;
  }

  return (
    <div className="min-h-screen bg-hero">
      <div className="container max-w-5xl py-8">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="font-bold tracking-tight">GründerX</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={refresh}>Status prüfen</Button>
            <Button variant="ghost" size="sm" onClick={async () => { await signOut(); navigate("/auth"); }}>
              <LogOut className="h-4 w-4 mr-1" /> Abmelden
            </Button>
          </div>
        </div>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-blue/10 border border-accent-blue/20 px-3 py-1 text-xs font-semibold text-accent-blue mb-4">
            <Crown className="h-3.5 w-3.5" /> Plan wählen, um zu starten
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Wähle deinen Plan</h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            GründerX ist ein bezahltes Tool. Schließe ein Abo ab, danach richten wir dein Profil gemeinsam ein.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <PlanCard
            title="GründerX"
            price="99,99 €"
            features={["Felix KI-Co-Founder", "Alle Wizards & Cockpits", "Anbieter-Vergleich", "Coop-Deals"]}
            busy={busy === STRIPE_PRICES.gruenderx}
            onClick={() => checkout(STRIPE_PRICES.gruenderx)}
          />
          <PlanCard
            title="Founder Bundle"
            price="179,99 €"
            highlight
            features={["Alles aus GründerX", "AnwaltX Vertrags-Templates", "Compliance-Audit", "Priorisierter Support"]}
            busy={busy === STRIPE_PRICES.bundle}
            onClick={() => checkout(STRIPE_PRICES.bundle)}
          />
        </div>

        <p className="text-xs text-muted-foreground text-center mt-8">
          Sichere Zahlung via Stripe. Monatlich kündbar.
        </p>
      </div>
    </div>
  );
};

const PlanCard = ({ title, price, features, busy, onClick, highlight }: {
  title: string; price: string; features: string[]; busy: boolean; onClick: () => void; highlight?: boolean;
}) => (
  <div className={`rounded-3xl p-7 shadow-card border ${highlight ? "border-accent-blue bg-gradient-primary text-primary-foreground shadow-glow" : "border-border bg-card"}`}>
    <div className="font-bold text-lg">{title}</div>
    <div className="text-4xl font-bold mt-2">{price}<span className="text-sm font-normal opacity-70">/Monat</span></div>
    <ul className="mt-5 space-y-2 text-sm">
      {features.map((f) => (
        <li key={f} className="flex items-start gap-2">
          <Check className={`h-4 w-4 mt-0.5 ${highlight ? "" : "text-accent-blue"}`} /> {f}
        </li>
      ))}
    </ul>
    <Button
      onClick={onClick}
      disabled={busy}
      size="lg"
      className={`w-full mt-6 rounded-full h-12 font-semibold ${highlight ? "bg-card text-primary hover:bg-card/90" : "bg-gradient-primary text-primary-foreground hover:opacity-95"}`}
    >
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Jetzt abonnieren"}
    </Button>
  </div>
);

export default Checkout;
