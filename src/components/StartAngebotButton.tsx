import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { PLANS, formatEurCents } from "@/config/pricing";
import { START_ANGEBOT, startAngebotCheckout } from "@/utils/startAngebot";

/** Knopf + Pflichtzeile fürs Startangebot (7 Tage für 1 €). */
export const StartAngebotButton = ({ className = "", variant = "default" as "default" | "outline" }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const folge = formatEurCents(PLANS.gruenderx.grossCents);
  const los = async () => {
    setBusy(true);
    try {
      const r = await startAngebotCheckout(!!user);
      if (r === "kein_neukunde") {
        toast.info("Das Startangebot gilt nur für Neukunden – hier geht's zum regulären Zugang.");
        navigate("/checkout");
      } else if (r === "onboarding") navigate("/onboarding");
      if (r !== "weiter") setBusy(false);
    } catch (e) {
      toast.error((e as Error).message || "Checkout fehlgeschlagen");
      setBusy(false);
    }
  };
  return (
    <div className={className}>
      <Button type="button" size="lg" variant={variant} disabled={busy} onClick={los}
        className="press h-11 w-full gap-2 rounded-xl font-semibold" data-track="start-angebot">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : START_ANGEBOT.label}
      </Button>
      <p className="mt-1.5 text-center text-[11px] leading-snug text-muted-foreground">{START_ANGEBOT.kurz(folge)}</p>
    </div>
  );
};
