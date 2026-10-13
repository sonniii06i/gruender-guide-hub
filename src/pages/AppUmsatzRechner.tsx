/**
 * AppUmsatzRechner — "Was bleibt von meinem App-Preis wirklich übrig?"
 *
 * Companion-Tool zum Guide "Eigene App entwickeln & launchen".
 *
 * Rechnet den kompletten Weg vom Store-Preis zum Gewinn:
 *  Endkundenpreis → USt raus (Stores führen sie als Kommissionär ab)
 *  → Store-Provision (15 % Small Business / 30 % Standard)
 *  → dein Netto-Erlös pro Zahler
 *  → mit Downloads × Conversion × Churn: MRR, LTV, Break-even gegen Dev-Kosten.
 *
 * Anfänger-Fehler, die das Tool fixt:
 *  1. Mit 9,99 € rechnen statt mit den ~7,14 €, die real ankommen
 *  2. Small Business Program (15 % statt 30 %) nicht kennen/beantragen
 *  3. Abo-LTV ohne Churn schätzen ("100 Abonnenten × 12 Monate")
 *  4. Break-even nie durchrechnen → Agentur-Angebote nicht bewerten können
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { NumberField } from "@/components/ui/number-field";
import { Callout, ChoiceGroup, Field, KitTable, ResultPanel, ToolLayout, ToolSection } from "@/components/cockpit/kit";
import {
  Smartphone,
  Calculator,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Landmark,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

const UST_SATZ = 0.19;
const APPLE_JAHR_USD = 99;
const USD_EUR = 0.92; // grobe Umrechnung für die Fixkosten-Schätzung

type Modell = "abo-monat" | "abo-jahr" | "einmalkauf";

const MODELL_LABEL: Record<Modell, string> = {
  "abo-monat": "Abo (monatlich)",
  "abo-jahr": "Abo (jährlich)",
  einmalkauf: "Einmal-Kauf / Lifetime",
};

const AppUmsatzRechner = () => {
  // 1. Monetarisierung
  const [modell, setModell] = useState<Modell>("abo-monat");
  const [preis, setPreis] = useState(9.99);
  const [smallBusiness, setSmallBusiness] = useState(true);
  // 2. Volumen
  const [downloadsMonat, setDownloadsMonat] = useState(1000);
  const [conversion, setConversion] = useState(4); // % der Downloads, die zahlen
  const [churnMonat, setChurnMonat] = useState(8); // % monatlicher Abo-Churn
  // 3. Kosten
  const [devKosten, setDevKosten] = useState(5000);
  const [laufendMonat, setLaufendMonat] = useState(25);

  const istAbo = modell !== "einmalkauf";

  const calc = useMemo(() => {
    const cut = smallBusiness ? 0.15 : 0.3;
    // Preis pro Abrechnungs-Periode → auf Monat normalisieren
    const preisProMonat = modell === "abo-jahr" ? preis / 12 : preis;
    // USt raus (Kommissionärs-Modell: Apple/Google führen die USt auf den Endkundenpreis ab)
    const nettoPreis = preisProMonat / (1 + UST_SATZ);
    const erloesProZahlerMonat = nettoPreis * (1 - cut);

    const neueZahlerMonat = downloadsMonat * (conversion / 100);
    const fixkostenMonat = laufendMonat + (APPLE_JAHR_USD * USD_EUR) / 12;

    // LTV: Abo = Erlös / Churn (geometrische Reihe), Einmalkauf = Erlös einmalig
    const churn = Math.max(churnMonat, 0.1) / 100;
    const ltv = istAbo ? erloesProZahlerMonat / churn : (preis / (1 + UST_SATZ)) * (1 - cut);

    // 36-Monats-Simulation: Abonnenten-Bestand mit Churn bzw. Einmal-Verkäufe
    let abonnenten = 0;
    let kumGewinn = -devKosten;
    let breakEvenMonat: number | null = null;
    const verlauf: { monat: number; umsatz: number; gewinn: number; kum: number }[] = [];
    for (let m = 1; m <= 36; m++) {
      if (istAbo) {
        abonnenten = abonnenten * (1 - churn) + neueZahlerMonat;
      }
      const umsatz = istAbo
        ? abonnenten * erloesProZahlerMonat
        : neueZahlerMonat * ltv;
      const gewinn = umsatz - fixkostenMonat;
      kumGewinn += gewinn;
      if (breakEvenMonat === null && kumGewinn >= 0) breakEvenMonat = m;
      if (m <= 12 || m % 6 === 0) verlauf.push({ monat: m, umsatz, gewinn, kum: kumGewinn });
    }

    const steadyAbonnenten = istAbo ? neueZahlerMonat / churn : 0;
    const mrr12 = verlauf.find((v) => v.monat === 12)?.umsatz ?? 0;

    return {
      cut,
      nettoPreis,
      erloesProZahlerMonat,
      neueZahlerMonat,
      fixkostenMonat,
      ltv,
      steadyAbonnenten,
      mrr12,
      breakEvenMonat,
      verlauf,
      kumGewinn36: kumGewinn,
    };
  }, [modell, preis, smallBusiness, downloadsMonat, conversion, churnMonat, devKosten, laufendMonat, istAbo]);

  const eur = (n: number, digits = 0) =>
    n.toLocaleString("de-DE", { minimumFractionDigits: digits, maximumFractionDigits: digits });

  const rentabel = calc.breakEvenMonat !== null && calc.breakEvenMonat <= 18;
  const nieRentabel = calc.breakEvenMonat === null;


  const statusTon = nieRentabel ? "danger" : rentabel ? "success" : "warning";
  const schritt = (n: number) => (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-blue tabular">{n}</span>
  );

  return (
    <CockpitShell
      eyebrow="Launch · Companion zum App-Guide"
      title="App-Store-Umsatz-Rechner"
      subtitle="Von 9,99 € im Store kommen bei dir etwa 7,14 € an: Die USt führt der Store ab, dann geht die Provision runter. Das Tool rechnet Preis, Netto-Erlös, MRR und LTV bis zum Break-even gegen deine Entwicklungskosten."
    >
      <ToolLayout
        className="mb-8"
        inputs={
          <>
            <ToolSection title="1. Wie verdient deine App Geld?" icon={Smartphone}>
              <div className="space-y-4">
                <Field label="Modell">
                  <ChoiceGroup<Modell>
                    label="Modell"
                    value={modell}
                    onChange={setModell}
                    options={(Object.entries(MODELL_LABEL) as [Modell, string][]).map(([k, v]) => ({ value: k, label: v }))}
                  />
                </Field>
                <Field
                  label={`Store-Preis (€ brutto${modell === "abo-jahr" ? " pro Jahr" : modell === "abo-monat" ? " pro Monat" : ""})`}
                  hint="Der Preis, den Endkunden im Store sehen (inkl. USt)."
                >
                  <NumberField step="0.01" value={preis} onChange={setPreis} min={0} aria-label="Store-Preis brutto in Euro" />
                </Field>
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-3.5 text-sm transition-colors hover:border-foreground/25">
                  <input
                    type="checkbox"
                    checked={smallBusiness}
                    onChange={(e) => setSmallBusiness(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
                  />
                  <span>
                    <span className="font-medium">Small-Business-Tarif (15 % statt 30 %)</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">Gilt unter 1 Mio. $ Umsatz pro Jahr.</span>
                  </span>
                </label>
              </div>
            </ToolSection>

            <ToolSection title="2. Wie viele Nutzer erwartest du?" icon={TrendingUp}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Downloads pro Monat" hint="Ohne Audience sind 300 bis 1.500 pro Monat im 1. Jahr realistisch.">
                  <NumberField value={downloadsMonat} onChange={setDownloadsMonat} min={0} aria-label="Downloads pro Monat" />
                </Field>
                <Field label="Conversion zu zahlend (%)" hint="Benchmark (RevenueCat): etwa 3 bis 7 % der Downloads zahlen.">
                  <NumberField step="0.1" value={conversion} onChange={setConversion} min={0} max={100} aria-label="Conversion in Prozent" />
                </Field>
                {istAbo && (
                  <Field
                    label="Monatlicher Abo-Churn (%)"
                    hint="Monats-Abos 8 bis 15 %, Jahres-Abos 3 bis 6 % (auf den Monat gerechnet)."
                    className="sm:col-span-2"
                  >
                    <NumberField step="0.1" value={churnMonat} onChange={setChurnMonat} min={0.1} max={100} aria-label="Churn pro Monat in Prozent" />
                  </Field>
                )}
              </div>
            </ToolSection>

            <ToolSection title="3. Was kostet dich die App?" icon={Calculator}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Entwicklung einmalig (€)" hint="0 € (selbst mit KI) · 3 bis 10k (Freelancer) · ab 15k (Agentur)">
                  <NumberField value={devKosten} onChange={setDevKosten} min={0} aria-label="Entwicklungskosten in Euro" />
                </Field>
                <Field label="Laufende Kosten pro Monat (€)" hint="Server, Backend, Tools, APIs. Die Apple-Jahresgebühr rechnen wir automatisch drauf.">
                  <NumberField value={laufendMonat} onChange={setLaufendMonat} min={0} aria-label="Laufende Kosten pro Monat in Euro" />
                </Field>
              </div>
              <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2 rounded-xl bg-secondary/60 px-4 py-3 text-sm">
                <span>
                  Fixkosten gesamt pro Monat <span className="text-xs text-muted-foreground">(inkl. 99 $ pro Jahr Apple Developer)</span>
                </span>
                <strong className="font-semibold tabular">{eur(calc.fixkostenMonat, 2)} €</strong>
              </div>
            </ToolSection>
          </>
        }
        result={
          <>
            <ResultPanel
              variant="ink"
              kicker={`Dein Netto-Erlös pro Zahler${istAbo ? " und Monat" : ""}`}
              title={
                calc.breakEvenMonat === null ? "Kein Break-even in 36 Monaten" : `Break-even in Monat ${calc.breakEvenMonat}`
              }
              value={`${eur(istAbo ? calc.erloesProZahlerMonat : calc.ltv, 2)} €`}
              valueHint={`von ${eur(modell === "abo-jahr" ? preis / 12 : preis, 2)} € Store-Preis${modell === "abo-jahr" ? " pro Monat" : ""}`}
            >
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10">
                {[
                  { l: istAbo ? "MRR nach 12 Monaten" : "Umsatz pro Monat", v: `${eur(calc.mrr12)} €` },
                  { l: "LTV pro Zahler", v: `${eur(calc.ltv, 2)} €` },
                  ...(istAbo ? [{ l: "Abonnenten-Plateau", v: eur(calc.steadyAbonnenten) }] : []),
                  { l: "Break-even (Dev-Kosten)", v: calc.breakEvenMonat === null ? "> 36 Mon" : `Monat ${calc.breakEvenMonat}` },
                ].map((k) => (
                  <div key={k.l} className="bg-white/[0.04] p-3">
                    <div className="text-xs text-primary-foreground/65">{k.l}</div>
                    <div className="mt-0.5 font-semibold text-primary-foreground tabular">{k.v}</div>
                  </div>
                ))}
              </div>
            </ResultPanel>

            {nieRentabel && (
              <Callout tone={statusTon} title="In 36 Monaten kein Break-even." icon={AlertTriangle}>
                Mit diesen Annahmen trägt sich die App nicht. Hebel in dieser Reihenfolge: Preis rauf (Store-Nutzer sind weniger
                preissensibel als du denkst), Conversion verbessern (Paywall, Onboarding), Churn senken (Jahres-Abo pushen) oder
                Entwicklungskosten drücken (mit KI selbst statt Agentur).
              </Callout>
            )}
            {rentabel && (
              <Callout tone={statusTon} title={`Break-even in ${calc.breakEvenMonat} Monaten: solide.`}>
                Kumulierter Gewinn nach 36 Monaten: <strong className="tabular">{eur(calc.kumGewinn36)} €</strong>. Ab hier lohnt es, in
                Wachstum (ASO, Content, Ads) zu investieren.
              </Callout>
            )}
            {!rentabel && !nieRentabel && (
              <Callout tone={statusTon} title={`Break-even erst in Monat ${calc.breakEvenMonat}.`} icon={Lightbulb}>
                Machbar, aber lang. Prüfe, ob ein höherer Preis oder ein Jahres-Abo als Standard (weniger Churn) die Kurve steiler
                macht, bevor du in Marketing investierst.
              </Callout>
            )}

            <ToolSection title="So wird gerechnet" icon={Calculator}>
              <ol className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  {schritt(1)}
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold">USt raus: Store-Preis ÷ 1,19</div>
                    <div className="mt-0.5 text-muted-foreground">
                      Apple und Google treten als Kommissionär auf und führen die USt auf den Endkundenpreis selbst ab:{" "}
                      <strong className="text-foreground tabular">{eur(calc.nettoPreis, 2)} € netto{istAbo ? " pro Monat" : ""}</strong>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  {schritt(2)}
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold">Store-Provision: −{Math.round(calc.cut * 100)} %</div>
                    <div className="mt-0.5 text-muted-foreground">
                      {smallBusiness
                        ? "Small Business Program (Apple, aktiv beantragen!) bzw. 15 %-Stufe auf die erste 1 Mio. $ (Google, automatisch)"
                        : istAbo
                          ? "Standard-Provision 30 % (Apple im ersten Abo-Jahr). Achtung: Google nimmt auf Abos immer 15 %, Apple ab dem zweiten Abo-Jahr ebenfalls 15 % — die echte Provision liegt also meist darunter."
                          : "Standard-Provision 30 %. Unter 1 Mio. $ pro Jahr verschenkst du Geld: Small Business Program beantragen!"}
                      :{" "}
                      <strong className="text-foreground tabular">{eur(calc.erloesProZahlerMonat, 2)} € Erlös pro Zahler{istAbo ? " und Monat" : ""}</strong>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  {schritt(3)}
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold tabular">Zahler: {eur(downloadsMonat)} Downloads × {conversion} % Conversion</div>
                    <div className="mt-0.5 text-muted-foreground">
                      = <strong className="text-foreground tabular">{eur(calc.neueZahlerMonat, 1)} neue Zahler pro Monat</strong>
                      {istAbo && (
                        <> · mit {churnMonat} % Churn pendelt sich der Bestand bei etwa {eur(calc.steadyAbonnenten)} Abonnenten ein (Zugänge = Abgänge)</>
                      )}
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  {schritt(4)}
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold">Break-even: kumulierter Gewinn gegen {eur(devKosten)} € Entwicklung</div>
                    <div className="mt-0.5 text-muted-foreground">
                      Monatlicher Gewinn = Umsatz − {eur(calc.fixkostenMonat, 2)} € Fixkosten; Startsaldo −{eur(devKosten)} €:{" "}
                      <strong className="text-foreground">
                        {calc.breakEvenMonat === null ? "kein Break-even in 36 Monaten" : `Break-even in Monat ${calc.breakEvenMonat}`}
                      </strong>
                    </div>
                  </div>
                </li>
              </ol>
            </ToolSection>
          </>
        }
      />

      <ToolSection title="Umsatz-Verlauf (Simulation)" icon={TrendingUp} className="mb-6">
        <KitTable caption="Simulierter Umsatz-Verlauf je Monat" className="max-h-[420px] overflow-y-auto">
          <thead className="sticky top-0">
            <tr>
              <th>Monat</th>
              <th className="!text-right">Umsatz</th>
              <th className="!text-right">Gewinn pro Monat</th>
              <th className="!text-right">Kumuliert (inkl. Dev-Kosten)</th>
            </tr>
          </thead>
          <tbody>
            {calc.verlauf.map((v) => (
              <tr key={v.monat}>
                <td>{v.monat}</td>
                <td className="text-right">{eur(v.umsatz)} €</td>
                <td className={`text-right ${v.gewinn >= 0 ? "text-success" : "text-danger"}`}>{eur(v.gewinn)} €</td>
                <td className={`text-right ${v.kum >= 0 ? "text-success" : "font-semibold text-danger"}`}>{eur(v.kum)} €</td>
              </tr>
            ))}
          </tbody>
        </KitTable>
      </ToolSection>

      <Callout tone="warning" title="Steuer-Falle: Auszahlung ist kein Umsatz mit 19 % USt" icon={Landmark} className="mb-6">
        <p>
          Die monatliche Store-Auszahlung ist eine <strong>B2B-Leistung an Apple/Google Irland</strong>, in DE nicht steuerbar
          (§ 3a Abs. 2 UStG, Reverse Charge in Irland): keine USt in deiner Rechnung. <strong>Regelbesteuerer</strong> melden sie in der
          USt-VA (Kz. 21) und in der Zusammenfassenden Meldung (§ 18a UStG) und brauchen dafür eine USt-IdNr.{" "}
          <strong>Kleinunternehmer</strong> geben keine Voranmeldung ab und sind von der ZM-Pflicht ausgenommen (§ 18a Abs. 4 UStG).
          Wer die Auszahlung als „Umsatz 19 %“ bucht, zahlt USt, die gar nicht anfällt.
        </p>
        <p className="mt-2">
          Der komplette Ablauf von der Idee bis zum Launch (Developer-Accounts, Googles 12-Tester-Pflicht, Review bestehen,
          Rechtstexte, Steuern) steht im{" "}
          <Link to="/guides/eigene-app-launchen" className="font-semibold text-accent-blue underline underline-offset-2">
            Guide „Eigene App entwickeln &amp; launchen“
          </Link>
          .
        </p>
      </Callout>

      <ToolSection title="Benchmarks zum Einordnen (Consumer-Apps 2026)" icon={Lightbulb} className="mb-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            { t: "Conversion Download zu zahlend", b: "Etwa 3 bis 7 % je nach Kategorie. Mit hartem Paywall-Onboarding (Trial vor Nutzung) auch 10 %+, dafür weniger Downloads." },
            { t: "Monatlicher Churn", b: "Monats-Abos 8 bis 15 %, Jahres-Abos effektiv 3 bis 6 %. Deshalb: Jahres-Abo als Standard anbieten." },
            { t: "Trial zu Paid", b: "30 bis 50 % der Trial-Starter konvertieren (RevenueCat-Daten). Trial-Länge 3 bis 7 Tage testen." },
          ].map((k) => (
            <div key={k.t} className="rounded-xl border border-border bg-secondary/40 p-4 text-sm">
              <p className="font-semibold">{k.t}</p>
              <p className="mt-1 leading-relaxed text-muted-foreground">{k.b}</p>
            </div>
          ))}
        </div>
      </ToolSection>

      <details className="group mb-6 rounded-2xl border border-border bg-card shadow-card [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-base font-semibold md:px-6">
          <span className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-blue">
              <HelpCircle className="h-4 w-4" aria-hidden="true" />
            </span>
            Glossar: Begriffe einfach erklärt
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <dl className="divide-y divide-border/70 border-t border-border/70 px-5 md:px-6">
          {[
            { begriff: "Store-Provision (15 % / 30 %)", erklaerung: "Apple und Google behalten 30 % Standard. Real zahlen kleine Entwickler 15 %: Apple über das Small Business Program (unter 1 Mio. $ Umsatz/Jahr, muss AKTIV in App Store Connect beantragt werden), Google automatisch auf die erste 1 Mio. $/Jahr. Apple-Abos kosten ab dem 13. Abonnenten-Monat ebenfalls nur 15 %." },
            { begriff: "Churn", erklaerung: "Anteil der Abonnenten, die pro Monat kündigen. 8 % Churn heißt: Von 100 Abonnenten sind nach einem Monat noch 92 da. Der Abonnenten-Bestand wächst nur, solange neue Zahler > Kündiger — deshalb gibt es ein Plateau bei (neue Zahler ÷ Churn)." },
            { begriff: "LTV (Lifetime Value)", erklaerung: "Was ein Zahler über seine gesamte Abo-Dauer einbringt. Näherung: monatlicher Netto-Erlös ÷ monatliche Churn-Rate. Bei 7,14 € Erlös und 8 % Churn: ~89 € LTV. Die wichtigste Zahl für die Frage, was dich ein Download über Ads kosten darf." },
            { begriff: "MRR (Monthly Recurring Revenue)", erklaerung: "Wiederkehrender Monatsumsatz aus Abos = aktive Abonnenten × Netto-Erlös pro Abonnent. DIE Kennzahl für Abo-Apps." },
            { begriff: "Kommissionärs-Modell", erklaerung: "Bei In-App-Käufen verkauft nicht du an den Endkunden, sondern Apple/Google (irische Gesellschaften) — sie berechnen und führen die USt im Land des Käufers ab. Deine Leistung ist B2B an Irland (Reverse Charge, ZM-Pflicht). Details in Schritt 17 des App-Guides." },
            { begriff: "Break-even", erklaerung: "Der Monat, in dem der kumulierte Gewinn die einmaligen Entwicklungskosten eingeholt hat. Unter 18 Monaten gilt als gesund für Indie-Apps; über 36 Monaten heißt: Annahmen ändern oder Konzept überarbeiten." },
          ].map((g) => (
            <div key={g.begriff} className="py-3.5 text-sm">
              <dt className="font-semibold text-foreground">{g.begriff}</dt>
              <dd className="mt-1 leading-relaxed text-muted-foreground">{g.erklaerung}</dd>
            </div>
          ))}
        </dl>
      </details>


      <Stand2026Footer
        sources={[
          { label: "Apple Small Business Program", url: "https://developer.apple.com/app-store/small-business-program/" },
          { label: "Google Play Service-Fee-Übersicht", url: "https://support.google.com/googleplay/android-developer/answer/112622" },
          { label: "RevenueCat State of Subscription Apps (Benchmarks)", url: "https://www.revenuecat.com/state-of-subscription-apps/" },
        ]}
        note="Vereinfachte Modell-Rechnung mit 19 % DE-USt und konstanten Annahmen. Reale Auszahlungen variieren je Käuferland (lokale USt-Sätze, Wechselkurse) und Apples/Googles Abrechnungszyklen (~30–45 Tage Verzug)."
      />
    </CockpitShell>
  );
};

export default AppUmsatzRechner;
