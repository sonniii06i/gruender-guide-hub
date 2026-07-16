import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAccess } from "@/hooks/useAccess";
import { supabase } from "@/integrations/supabase/client";
import { getStoredAffiliateRef } from "@/utils/affiliate";
import { Button } from "@/components/ui/button";
import { Crown, Loader2, Check, LogOut, Lock, RefreshCw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { STRIPE_PRICES } from "@/lib/stripe";
import Logo from "@/components/Logo";
import { UseCasesShowcase } from "@/components/landing/UseCasesShowcase";

const Checkout = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { loading: accLoading, hasActiveSub, isAdmin, onboardingCompleted, refresh } = useAccess();
  const [busy, setBusy] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  const handleStatusCheck = async () => {
    setChecking(true);
    try {
      await refresh();
      const { data } = await supabase
        .from("subscriptions")
        .select("status")
        .eq("user_id", user!.id)
        .maybeSingle();
      const active = data?.status === "active" || data?.status === "trialing";
      if (active || isAdmin) {
        toast.success("Abo aktiv – du wirst weitergeleitet …");
      } else {
        toast.info("Noch kein aktives Abo gefunden. Nach einer Zahlung kann es einen Moment dauern – sonst oben einen Plan wählen.");
      }
    } catch {
      toast.error("Status konnte nicht geprüft werden.");
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (accLoading) return;
    if (hasActiveSub || isAdmin) {
      navigate("/dashboard", { replace: true });
      return;
    }
    if (!onboardingCompleted) {
      navigate("/onboarding", { replace: true });
    }
  }, [accLoading, hasActiveSub, isAdmin, onboardingCompleted, navigate]);

  const checkout = async (priceId: string) => {
    setBusy(priceId);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", { body: { priceId, affiliateRef: getStoredAffiliateRef() } });
      if (error) {
        // Den echten Backend-Fehler aus der Response ziehen (sonst nur "non-2xx status code").
        let msg = error.message;
        try {
          const body = await (error as any)?.context?.json?.();
          if (body?.error) msg = body.error;
        } catch { /* ignore */ }
        if (msg?.includes("Onboarding")) { navigate("/onboarding"); return; }
        throw new Error(msg);
      }
      if (data?.url) { window.location.href = data.url; return; }
      throw new Error("Keine Checkout-URL erhalten – bitte erneut versuchen.");
    } catch (e: any) { toast.error(e.message ?? "Checkout fehlgeschlagen"); setBusy(null); }
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
            <Button variant="ghost" size="sm" onClick={handleStatusCheck} disabled={checking}>
              {checking && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
              {checking ? "Prüfe …" : "Status prüfen"}
            </Button>
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
            Deine Rechnungsdaten sind eingerichtet. Schließe jetzt dein Abo ab, um den vollen Zugriff aufs Dashboard freizuschalten.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <PlanCard
            title="GründerX"
            price="49,99 €"
            features={["Felix KI-Co-Founder", "Alle Wizards & Cockpits", "Anbieter-Vergleich", "Coop-Deals"]}
            busy={busy === STRIPE_PRICES.gruenderx}
            onClick={() => checkout(STRIPE_PRICES.gruenderx)}
          />
          <PlanCard
            title="Founder Bundle"
            price="79,99 €"
            badge="−20 %"
            highlight
            features={["Alles aus GründerX", "AnwaltX Vertrags-Templates", "Compliance-Audit", "Priorisierter Support"]}
            busy={busy === STRIPE_PRICES.bundle}
            onClick={() => checkout(STRIPE_PRICES.bundle)}
          />
        </div>

        {/* Trust-Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-accent-blue" /> SSL-verschlüsselt via Stripe</span>
          <span className="flex items-center gap-1.5"><RefreshCw className="h-3.5 w-3.5 text-accent-blue" /> Monatlich kündbar</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-accent-blue" /> DSGVO-konform, Server in der EU</span>
        </div>

        {/* Bottom-of-Funnel: was im Abo steckt */}
        <div className="mt-12">
          <UseCasesShowcase compact />
        </div>
      </div>
    </div>
  );
};

const PlanCard = ({ title, price, features, busy, onClick, highlight, badge }: {
  title: string; price: string; features: string[]; busy: boolean; onClick: () => void; highlight?: boolean; badge?: string;
}) => (
  <div className={`relative rounded-3xl p-7 shadow-card border ${highlight ? "border-accent-blue bg-gradient-primary text-primary-foreground shadow-glow" : "border-border bg-card"}`}>
    {badge && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-card text-accent-blue border border-accent-blue px-3 py-0.5 text-[11px] font-bold shadow-sm">
        {badge}
      </span>
    )}
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
