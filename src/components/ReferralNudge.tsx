import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Percent, X } from "lucide-react";
import { valueEventCount, referralNudgeDismissed, dismissReferralNudge } from "@/utils/valueEvent";
import { trackReferral, trackActivation } from "@/utils/analytics";

interface Props {
  /** Ab wie vielen echten Outputs gefragt wird. Default 1 = direkt nach dem ersten. */
  minEvents?: number;
  /** Erste Zeile — sollte an den gerade erlebten Nutzen andocken. */
  headline?: string;
  className?: string;
}

/**
 * Referral-Prompt NACH dem Aha-Moment (nicht davor): erst hat der Nutzer etwas
 * bekommen, dann bitten wir ihn, GründerX weiterzuerzählen. 20 % lebenslang.
 * Erscheint einmal, ist wegklickbar und kommt danach nicht wieder.
 */
export function ReferralNudge({ minEvents = 1, headline, className = "" }: Props) {
  const { toast } = useToast();
  const [show, setShow] = useState(false);
  const [link, setLink] = useState<string | null>(null);

  useEffect(() => {
    if (referralNudgeDismissed() || valueEventCount() < minEvents) return;
    setShow(true);
    (async () => {
      const { data } = await supabase.functions.invoke("manage-affiliate", { body: { action: "me" } });
      const ref = (data as { ref_link?: string } | null)?.ref_link;
      if (ref) setLink(ref);
    })();
  }, [minEvents]);

  if (!show) return null;

  const copy = async () => {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    trackReferral.sent("copy_link");
    trackActivation.inviteSentAfterActivation();
    toast({ title: "Kopiert!", description: "Dein Reflink ist in der Zwischenablage." });
  };

  const close = () => {
    dismissReferralNudge();
    setShow(false);
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/12 via-primary/5 to-transparent p-5 ${className}`}>
      <button
        onClick={close}
        aria-label="Hinweis schließen"
        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="h-4 w-4" />
      </button>

      <h3 className="font-bold pr-8">{headline || "Hat dir das gerade geholfen?"}</h3>
      <p className="text-sm text-muted-foreground mt-1 mb-3">
        Dann erzähl deinen Freunden von GründerX. Für <strong>jede Zahlung</strong> von jemandem,
        den du geworben hast, bekommst du dauerhaft{" "}
        <span className="inline-flex items-center gap-1 font-semibold text-foreground">
          <Percent className="h-3.5 w-3.5 text-primary" />20 % — lebenslang
        </span>
        , in echtem Geld.
      </p>

      {link ? (
        <div className="flex flex-col sm:flex-row gap-2">
          <Input readOnly value={link} className="font-mono text-sm" onFocus={(e) => e.currentTarget.select()} />
          <Button onClick={copy} className="shrink-0">
            <Copy className="h-4 w-4 mr-1.5" /> Link kopieren
          </Button>
          <Button asChild variant="outline" className="shrink-0">
            <Link to="/affiliate">Details</Link>
          </Button>
        </div>
      ) : (
        <Button asChild>
          <Link to="/affiliate">Zum Partnerprogramm</Link>
        </Button>
      )}
    </div>
  );
}
