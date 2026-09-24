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
import { CheckCircle2, Clock, Loader2, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="min-h-screen bg-background px-4 py-10">
      <Seo
        title="Zahlung erfolgreich – GründerX"
        description="Bestätigung deiner Zahlung bei GründerX."
        path="/zahlung-erfolgreich"
        noindex
      />
      <div className="mx-auto w-full max-w-lg space-y-6">
        <Card>
          <CardHeader className="text-center">
            {zustand === "pruefen" ? (
              <Loader2 className="mx-auto mb-3 h-12 w-12 animate-spin text-primary" />
            ) : zustand === "bestaetigt" ? (
              <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-green-500" />
            ) : (
              <Clock className="mx-auto mb-3 h-12 w-12 text-amber-500" />
            )}
            <CardTitle className="text-2xl">
              {zustand === "pruefen"
                ? "Zahlung wird bestätigt …"
                : zustand === "bestaetigt"
                  ? "Dein Zugang ist aktiv"
                  : "Zahlung noch nicht bestätigt"}
            </CardTitle>
            <CardDescription>
              {zustand === "pruefen"
                ? "Einen Moment bitte, das dauert nur Sekunden."
                : zustand === "bestaetigt"
                  ? "Vielen Dank! Die Zahlung ist durch, alle Guides und Rechner sind freigeschaltet."
                  : "Deine Zahlung ist bei Stripe angekommen, bei uns aber noch nicht verbucht. Bitte zahle nicht erneut — das erledigt sich meist innerhalb weniger Minuten von selbst."}
            </CardDescription>
          </CardHeader>

          {zustand !== "pruefen" && (
            <CardContent className="space-y-4">
              {zustand === "bestaetigt" && (
                <div className="space-y-2 rounded-lg border bg-muted/40 p-4 text-sm">
                  {plan && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Plan</span>
                      <span className="font-semibold">{plan}</span>
                    </div>
                  )}
                  {bisWann && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nächste Abrechnung</span>
                      <span className="font-semibold">
                        {new Date(bisWann).toLocaleDateString("de-DE", { dateStyle: "long" })}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Abbuchung durch</span>
                    <span className="font-semibold">GründerX</span>
                  </div>
                </div>
              )}

              <p className="text-sm text-muted-foreground">
                Rechnungen und Kündigung findest du jederzeit in deinem{" "}
                <Link to="/profile" className="underline underline-offset-4">
                  Profil
                </Link>
                .
              </p>

              <div className="grid gap-2">
                <Button asChild>
                  <Link to="/dashboard">Weiter zum Cockpit</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/profile">
                    <Receipt className="mr-2 h-4 w-4" /> Rechnung ansehen
                  </Link>
                </Button>
                {zustand === "ungeklaert" && (
                  <Button asChild variant="ghost">
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

              {zustand === "ungeklaert" && sessionId && (
                <p className="text-center text-xs text-muted-foreground">Referenz: {sessionId}</p>
              )}
            </CardContent>
          )}
        </Card>

        {zustand === "bestaetigt" && <AffiliateSuccessBanner />}
      </div>
    </div>
  );
};

export default ZahlungErfolgreich;
