import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Download, FileSpreadsheet, FileText, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PageHeader } from "@/components/landing/PageHeader";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { NewsletterOptin } from "@/components/NewsletterOptin";
import { supabase } from "@/integrations/supabase/client";
import { PAKET_DOKUMENTE, PAKET_FAQ, PAKET_QUELLEN, PAKET_STAND, PAKET_VERKAUF_AKTIV } from "@/data/gruendungspaket";
import {
  KENNTNIS_TEXT, PAKET_NAME, PAKET_PREIS_CENT, ZUSTIMMUNG_TEXT, preisText,
} from "../../supabase/functions/_shared/gruendungspaketTexte";

/**
 * Gründungspaket 2026 (Freigabe #5, 26.10.2026): Einmalkauf, Download nach
 * bezahlter Stripe-Session. Der Kauf-Knopf hängt an PAKET_VERKAUF_AKTIV und
 * ist aus, bis ein Live-Testkauf möglich war; bis dahin zeigt die Seite das
 * Opt-in „Steuerfristen & Neuigkeiten“.
 *
 * Widerruf (§ 356 Abs. 6 Nr. 2 BGB): zwei getrennte, nicht vorausgewählte
 * Häkchen; paket-checkout prüft sie serverseitig noch einmal.
 */
const PREIS = preisText(PAKET_PREIS_CENT);
const TITEL = "Gründungspaket 2026: Vorlagen & Checklisten | GründerX";
const BESCHREIBUNG =
  "Rechnungsvorlagen (Kleinunternehmer, Regel, Kleinbetrag), Leitfaden E-Rechnung 2025–2028 und Checklisten für " +
  "Gewerbeanmeldung, Fragebogen, ELSTER und USt-IdNr. – mit amtlichen Quellen, Stand " + PAKET_STAND + ".";

const symbol = (f: string) => (f === "xlsx" ? FileSpreadsheet : FileText);

const Gruendungspaket = () => {
  const [params] = useSearchParams();
  const [zustimmung, setZustimmung] = useState(false);
  const [kenntnis, setKenntnis] = useState(false);
  const [laeuft, setLaeuft] = useState(false);
  const [fehler, setFehler] = useState("");
  const abgebrochen = params.get("abgebrochen") === "1";

  const kaufen = async () => {
    setFehler("");
    if (!zustimmung || !kenntnis) {
      setFehler("Bitte bestätige beide Punkte – sonst können wir den Download nicht sofort freigeben.");
      return;
    }
    setLaeuft(true);
    const utm: Record<string, string> = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"]) {
      const v = params.get(k);
      if (v) utm[k] = v;
    }
    const { data, error } = await supabase.functions.invoke("paket-checkout", { body: { zustimmung, kenntnis, ...utm } });
    if (error || !data?.url) {
      setLaeuft(false);
      setFehler("Der Checkout konnte gerade nicht starten. Bitte versuch es gleich noch einmal oder schreib an support@gruenderx.de.");
      return;
    }
    window.location.href = data.url as string;
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={TITEL}
        description={BESCHREIBUNG}
        path="/gruendungspaket"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: PAKET_NAME,
            description: BESCHREIBUNG,
            brand: { "@type": "Brand", name: "GründerX" },
            url: "https://gruenderx.de/gruendungspaket",
            ...(PAKET_VERKAUF_AKTIV
              ? { offers: { "@type": "Offer", price: (PAKET_PREIS_CENT / 100).toFixed(2), priceCurrency: "EUR", availability: "https://schema.org/InStock", url: "https://gruenderx.de/gruendungspaket" } }
              : {}),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: PAKET_FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />
      <Navbar />
      <main>
        <PageHeader
          width="max-w-4xl"
          kicker={
            <span className="inline-flex items-center rounded-full border border-accent-blue/20 bg-accent px-3 py-1 text-[13px] font-medium text-accent-blue">
              Stand {PAKET_STAND} · amtliche Quellen
            </span>
          }
          title="Gründungspaket 2026: Rechnungen, Gewerbe, Finanzamt – fertig vorbereitet"
          lead={
            <p className="text-base md:text-lg">
              Du hast das erste Geld verdient oder fängst gerade an? Dann musst du dich nicht durch Gesetze und Formulare
              wühlen: Rechnungsvorlagen, die alle Pflichtangaben schon enthalten, und Checklisten für Gewerbeamt, ELSTER und
              Finanzamt – in der Reihenfolge, in der sie dran sind.
            </p>
          }
        />

        <div className="container max-w-4xl px-4 py-10 md:py-14 space-y-12">
          {abgebrochen && (
            <div className="rounded-xl border border-border bg-secondary/40 p-4 text-sm">
              Der Kauf wurde abgebrochen – es wurde nichts berechnet.
            </div>
          )}

          <section aria-labelledby="inhalt" className="space-y-4">
            <h2 id="inhalt" className="text-2xl font-semibold tracking-tight">Was du bekommst</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {PAKET_DOKUMENTE.map((d) => {
                const Icon = symbol(d.formate[0]);
                return (
                  <li key={d.datei} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent-blue" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-foreground">{d.titel}</p>
                      <p className="text-sm text-muted-foreground">{d.nutzen}</p>
                      <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{d.formate.join(" · ")}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-labelledby="warum" className="space-y-3">
            <h2 id="warum" className="text-2xl font-semibold tracking-tight">Warum gerade jetzt</h2>
            <ul className="space-y-2 text-[15px] leading-relaxed">
              <li className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-success" aria-hidden="true" />Das Gewerbe meldest du gleichzeitig mit dem Start an, den Fragebogen ans Finanzamt gibst du innerhalb eines Monats ab (§ 14 GewO, § 138 AO).</li>
              <li className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-success" aria-hidden="true" />E-Rechnungen empfangen musst du seit 2025 – auch als Kleinunternehmer. Ausstellen an Firmen wird bis 2028 Pflicht (§ 27 Abs. 38 UStG).</li>
              <li className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-success" aria-hidden="true" />Firmenkunden brauchen für den Vorsteuerabzug eine Rechnung nach § 14 UStG (§ 15 Abs. 1 Nr. 1 UStG) – die Vorlagen haben jede Pflichtangabe schon an der richtigen Stelle.</li>
            </ul>
          </section>

          <section aria-labelledby="kaufen" className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-8">
            <h2 id="kaufen" className="text-2xl font-semibold tracking-tight">{PREIS} einmalig – kein Abo</h2>
            <p className="mt-1 text-sm text-muted-foreground">inkl. 19 % USt · Download sofort nach der Zahlung · Rechnung per Mail</p>

            {PAKET_VERKAUF_AKTIV ? (
              <div className="mt-5 space-y-4">
                <label className="flex items-start gap-3 text-sm leading-relaxed">
                  <input type="checkbox" className="mt-1 h-4 w-4" checked={zustimmung} onChange={(e) => setZustimmung(e.target.checked)} />
                  <span>{ZUSTIMMUNG_TEXT}</span>
                </label>
                <label className="flex items-start gap-3 text-sm leading-relaxed">
                  <input type="checkbox" className="mt-1 h-4 w-4" checked={kenntnis} onChange={(e) => setKenntnis(e.target.checked)} />
                  <span>{KENNTNIS_TEXT}</span>
                </label>
                <Button size="lg" onClick={kaufen} disabled={laeuft} className="w-full sm:w-auto">
                  <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                  {laeuft ? "Checkout wird geöffnet …" : `Jetzt für ${PREIS} kaufen`}
                </Button>
                {fehler && <p role="alert" className="text-sm text-danger">{fehler}</p>}
                <p className="text-xs text-muted-foreground">
                  Mit dem Kauf gelten unsere <Link to="/agb" className="underline">AGB</Link>. Informationen zum Widerrufsrecht:{" "}
                  <Link to="/widerruf" className="underline">Widerrufsbelehrung</Link>. Bezahlung über Stripe.
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                <p className="text-[15px]">
                  Der Verkauf startet in Kürze. Trag dich ein – wir sagen dir Bescheid, sobald das Paket da ist, und schicken dir
                  vorher die wichtigsten Steuerfristen.
                </p>
                <NewsletterOptin />
              </div>
            )}
            <p className="mt-5 flex items-start gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              Arbeitshilfe, keine Steuer- oder Rechtsberatung. Jede Aussage im Paket ist mit einer amtlichen Quelle belegt.
            </p>
          </section>

          <section aria-labelledby="gratis" className="space-y-2">
            <h2 id="gratis" className="text-2xl font-semibold tracking-tight">Lieber erst selbst ausprobieren?</h2>
            <p className="text-[15px] leading-relaxed">
              Viele Schritte gehen auch gratis: Lies E-Rechnungen mit dem <Link to="/e-rechnung-lesen" className="underline">E-Rechnung-Leser</Link>,
              stöbere in über 100 <Link to="/vorlagen" className="underline">Vertragsvorlagen</Link> oder in unseren{" "}
              <Link to="/gratis-tools" className="underline">Gratis-Tools</Link>. Das Paket bündelt die Gründungsschritte als Dateien zum Behalten.
            </p>
          </section>

          <section aria-labelledby="faq" className="space-y-3">
            <h2 id="faq" className="text-2xl font-semibold tracking-tight">Häufige Fragen</h2>
            {PAKET_FAQ.map((f) => (
              <details key={f.q} className="rounded-xl border border-border bg-card p-4">
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </section>

          <section aria-labelledby="quellen" className="space-y-2">
            <h2 id="quellen" className="text-xl font-semibold tracking-tight">Quellen (geprüft am {PAKET_STAND})</h2>
            <ul className="grid gap-1 text-sm sm:grid-cols-2">
              {PAKET_QUELLEN.map((q) => (
                <li key={q.url}><a href={q.url} target="_blank" rel="noopener noreferrer" className="text-accent-blue underline">{q.titel}</a></li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Gruendungspaket;
