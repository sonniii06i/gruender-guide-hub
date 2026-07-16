import { Button } from "@/components/ui/button";
import { Check, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { getStoredAffiliateRef } from "@/utils/affiliate";
import { STRIPE_PRICES } from "@/lib/stripe";
import { toast } from "sonner";

type Tier = {
  name: string;
  priceId: string;
  price: string;
  anchor?: string;
  save?: string;
  desc: string;
  features: string[];
  cta: string;
  highlight: boolean;
};

const tiers: Tier[] = [
  {
    name: "GründerX",
    priceId: STRIPE_PRICES.gruenderx,
    price: "49,99",
    desc: "Dein KI-Co-Pilot Felix für Gründung, Steuern, Marketplaces und Brand-Launch.",
    features: [
      "Felix – KI-Gründungs-Co-Pilot",
      "DE-Gründung: Rechtsform, Finanzamt-Fragebogen, Steuer-Setup",
      "US-LLC & HK-Limited Wizards (EIN, ITIN, BOI, Banking)",
      "Steuer-Cockpit: USt, OSS, IAB, Fristen-Kalender",
      "Marketplace-Setup: Amazon, Kaufland, Shopify, Stripe, PayPal",
      "Brand-Compliance: WEEE/EAR, LUCID, BattG, GPSR, CPNP",
      "Anbieter-Vergleich: Banking, Buchhaltung, 3PL, Tracking",
      "E-Mail Support",
    ],
    cta: "GründerX wählen",
    highlight: false,
  },
  {
    name: "Founder Bundle",
    priceId: STRIPE_PRICES.bundle,
    price: "79,99",
    anchor: "99,98",
    save: "−20 %",
    desc: "GründerX + AnwaltX in einem. Gründung, Steuern und Recht aus einer Hand – beide KIs zusammen, 20 % günstiger als einzeln.",
    features: [
      "Alles aus GründerX",
      "Juri – KI-Rechts-Assistentin (AnwaltX)",
      "Vertragsprüfung & Vertragsgenerator",
      "Abmahn- & Streitfall-Hilfe",
      "Rechtssichere Mails versenden",
      "Felix + Juri zusammen im Chat",
      "Priorisierter Support",
    ],
    cta: "Bundle sichern",
    highlight: true,
  },
];

export const Bundles = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    if (!user) {
      navigate(`/auth?mode=signup&price=${priceId}`);
      return;
    }
    setLoading(priceId);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { priceId, affiliateRef: getStoredAffiliateRef() },
      });
      if (error) {
        let msg = error.message;
        try {
          const body = await (error as any)?.context?.json?.();
          if (body?.error) msg = body.error;
        } catch { /* ignore */ }
        if (msg?.includes("Onboarding")) { navigate("/onboarding"); return; }
        throw new Error(msg);
      }
      // Full-Page-Redirect statt window.open: kein Popup-Blocker (open nach await wird sonst geblockt)
      if (data?.url) { window.location.href = data.url; return; }
      throw new Error("Keine Checkout-URL erhalten – bitte erneut versuchen.");
    } catch (e: any) {
      toast.error(e.message ?? "Checkout fehlgeschlagen");
    } finally {
      setLoading(null);
    }
  };

  return (
  <section id="bundles" className="py-24 bg-secondary/40">
    <div className="container max-w-6xl">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent-blue mb-3">
          Bundles
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-balance max-w-3xl mx-auto">
          GründerX + AnwaltX –{" "}
          <span className="text-gradient-primary inline-block">
            stärker zusammen.
          </span>
        </h2>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
          Gründung und Recht greifen ineinander. Hol dir beide KIs im Bundle und
          spare gegenüber den Einzelpreisen.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 items-stretch max-w-4xl mx-auto">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`rounded-3xl p-8 flex flex-col ${
              t.highlight
                ? "bg-gradient-primary text-primary-foreground shadow-glow md:scale-105 border border-accent-blue/40"
                : "bg-card border border-border shadow-card"
            }`}
          >
            {t.highlight && (
              <div className="inline-flex self-start items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-semibold mb-4">
                <Sparkles className="h-3.5 w-3.5" /> Beliebteste Wahl
              </div>
            )}
            <h3 className="text-xl font-bold mb-2">{t.name}</h3>
            <p
              className={`text-sm mb-6 ${
                t.highlight ? "text-primary-foreground/80" : "text-muted-foreground"
              }`}
            >
              {t.desc}
            </p>
            <div className="mb-6">
              <div>
                <span className="text-5xl font-extrabold">{t.price}€</span>
                <span
                  className={
                    t.highlight ? "text-primary-foreground/70" : "text-muted-foreground"
                  }
                >
                  {" "}
                  /Monat
                </span>
              </div>
              {t.anchor && (
                <div className="mt-1.5 flex items-center gap-2">
                  <span
                    className={`text-sm line-through ${
                      t.highlight ? "text-primary-foreground/60" : "text-muted-foreground"
                    }`}
                  >
                    {t.anchor}€/Monat
                  </span>
                  {t.save && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                        t.highlight ? "bg-white/20 text-primary-foreground" : "bg-success/15 text-success"
                      }`}
                    >
                      {t.save}
                    </span>
                  )}
                </div>
              )}
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check
                    className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                      t.highlight ? "text-primary-foreground" : "text-success"
                    }`}
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              onClick={() => handleCheckout(t.priceId)}
              disabled={loading === t.priceId}
              className={`w-full rounded-full h-12 font-semibold ${
                t.highlight
                  ? "bg-card text-primary hover:bg-card/90"
                  : "bg-gradient-primary text-primary-foreground hover:opacity-95 shadow-glow"
              }`}
            >
              {loading === t.priceId ? <Loader2 className="h-4 w-4 animate-spin" /> : t.cta}
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

