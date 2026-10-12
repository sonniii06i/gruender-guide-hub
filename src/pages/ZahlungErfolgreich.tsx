// Bestaetigungsseite nach der Zahlung.
//
// Vorher leitete Stripe auf /dashboard?checkout=success. Dort lief die
// Conversion-Messung, und es erschien der Empfehlungs-Banner — eine
// Bestaetigung der Zahlung war das nicht: kein Plan, kein Abrechnungsdatum,
// keine Rechnung, und nach einem Reload gar nichts mehr.
//
// Die Messung zieht hierher um (gleiche Aufrufe, gleicher Wert), damit die
// Anzeigen-Conversions nicht abreissen.
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock, Loader2, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KontoRahmen, kontoCta } from "@/components/KontoRahmen";
import { AffiliateSuccessBanner } from "@/components/AffiliateSuccessBanner";
import { Seo } from "@/components/Seo";
import { trackMonetization } from "@/utils/analytics";
import { trackAdConversion } from "@/utils/adConversions";
import { supabase } from "@/integrations/supabase/client";

const SUPPORT = "service@gruenderx.de";

type Zustand = "pruefen" | "bestaetigt" | "ungeklaert";

const ZahlungErfolgreich = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  const [zustand, setZustand] = useState<Zustand>("pruefen");
  const [plan, setPlan] = useState<string | null>(null);
  const [bisWann, setBisWann] = useState<string | null>(null);

  // L5 der Event-Leiter: der einzige Moment im Client, an dem ein Abo sicher
  // zustande gekommen ist. Der Wert ist der Listenpreis; das Bundle (99,99)
  // laesst sich hier nicht unterscheiden, den exakten Betrag liefert der
  // Stripe-Webhook per CAPI nach, dedupliziert ueber dieselbe event_id.
  // Nur EINMAL je Checkout melden: vorher zaehlte jedes Neuladen einen weiteren Kauf.
  // Die event_id stripe_<session_id> ist dieselbe wie im Stripe-Webhook (CAPI) und in
  // Willkommen.tsx, Meta fasst die Meldungen damit zu einem Kauf zusammen.
  useEffect(() => {
    const schluessel = `gx_kauf_gemeldet_${sessionId || "ohne"}`;
    try {
      if (localStorage.getItem(schluessel)) return;
      localStorage.setItem(schluessel, "1");
    } catch { /* ohne Speicher trotzdem melden */ }
    trackMonetization.subscriptionStarted("gruenderx", 6499);
    trackAdConversion("purchase", {
      label: "subscription_monthly", value: 64.99,
      ...(sessionId ? { eventId: `stripe_${sessionId}` } : {}),
    });
  }, [sessionId]);

  useEffect(() => {
    let abgebrochen = false;

    // Stripe schaltet das Abo sofort, der eigene Webhook braucht manchmal ein
    // paar Sekunden. Deshalb mehrfach nachfragen.
    (async () => {
      for (let i = 0; i < 4; i++) {
        try {
          const { data } = await supabase.functions.invoke("check-subscription");
          if (abgebrochen) return;
          if (data?.subscribed) {
            setPlan(data.plan ?? null);
            setBisWann(data.current_period_end ?? null);
            setZustand("bestaetigt");
            return;
          }
        } catch (err) {
          console.error("[zahlung] Status nicht abrufbar:", err);
        }
        if (i < 3) await new Promise((r) => setTimeout(r, 2000));
      }
      if (!abgebrochen) setZustand("ungeklaert");
    })();

    return () => {
      abgebrochen = true;
    };
  }, []);

  return (
    <>
      <Seo
        title="Zahlung erfolgreich – GründerX"
        description="Bestätigung deiner Zahlung bei GründerX."
        path="/zahlung-erfolgreich"
        noindex
      />
      <KontoRahmen
        backLink={false}
        extra={zustand === "bestaetigt" ? <AffiliateSuccessBanner /> : undefined}
        icon={zustand === "pruefen" ? Loader2 : zustand === "bestaetigt" ? CheckCircle2 : Clock}
        iconSpin={zustand === "pruefen"}
        tone={zustand === "pruefen" ? "accent" : zustand === "bestaetigt" ? "success" : "warning"}
        kicker={zustand === "bestaetigt" ? "Zahlung bestätigt" : undefined}
        title={
          zustand === "pruefen"
            ? "Zahlung wird bestätigt …"
            : zustand === "bestaetigt"
              ? "Dein Zugang ist aktiv"
              : "Zahlung noch nicht bestätigt"
        }
        subtitle={
          zustand === "pruefen"
            ? "Einen Moment bitte, das dauert nur Sekunden."
            : zustand === "bestaetigt"
              ? "Vielen Dank! Die Zahlung ist durch, alle Guides und Rechner sind freigeschaltet."
              : "Deine Zahlung ist bei Stripe angekommen, bei uns aber noch nicht verbucht. Bitte zahle nicht erneut, das erledigt sich meist innerhalb weniger Minuten von selbst."
        }
      >
        {zustand === "pruefen" ? (
          <div className="space-y-2.5" aria-hidden="true">
            <div className="h-10 animate-pulse rounded-lg bg-secondary" />
            <div className="h-10 animate-pulse rounded-lg bg-secondary" />
            <div className="h-11 animate-pulse rounded-xl bg-secondary" />
          </div>
        ) : (
          <div className="space-y-5">
            {zustand === "bestaetigt" && (
              <dl className="divide-y divide-border rounded-xl border border-border bg-secondary/40 text-sm">
                {plan && (
                  <div className="flex items-center justify-between gap-4 px-4 py-3">
                    <dt className="text-muted-foreground">Plan</dt>
                    <dd className="text-right font-semibold">{plan}</dd>
                  </div>
                )}
                {bisWann && (
                  <div className="flex items-center justify-between gap-4 px-4 py-3">
                    <dt className="text-muted-foreground">Nächste Abrechnung</dt>
                    <dd className="tabular text-right font-semibold">
                      {new Date(bisWann).toLocaleDateString("de-DE", { dateStyle: "long" })}
                    </dd>
                  </div>
                )}
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <dt className="text-muted-foreground">Abbuchung durch</dt>
                  <dd className="text-right font-semibold">GründerX</dd>
                </div>
              </dl>
            )}

            <div className="grid gap-2">
              <Button asChild size="lg" className={kontoCta}>
                <Link to="/dashboard">
                  Weiter zum Cockpit <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-11 rounded-xl">
                <Link to="/profile">
                  <Receipt className="mr-2 h-4 w-4" aria-hidden="true" /> Rechnung ansehen
                </Link>
              </Button>
              {zustand === "ungeklaert" && (
                <Button asChild variant="ghost" size="lg" className="h-11 rounded-xl">
                  <a
                    href={`mailto:${SUPPORT}?subject=Zahlung%20GruenderX${
                      sessionId ? `%20(${sessionId})` : ""
                    }`}
                  >
                    Support schreiben
                  </a>
                </Button>
              )}
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Rechnungen und Kündigung findest du jederzeit in deinem{" "}
              <Link to="/profile" className="font-medium text-foreground/80 underline underline-offset-4">
                Profil
              </Link>
              .
            </p>

            {zustand === "ungeklaert" && sessionId && (
              <p className="break-all rounded-lg bg-secondary/60 px-3 py-2 text-center font-mono text-xs text-muted-foreground">
                Referenz: {sessionId}
              </p>
            )}
          </div>
        )}
      </KontoRahmen>
    </>
  );
};

export default ZahlungErfolgreich;
