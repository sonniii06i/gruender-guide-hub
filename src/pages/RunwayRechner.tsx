/**
 * RunwayRechner — "Wie lange reicht mein Geld — und werde ich vorher profitabel?"
 *
 * Universal-Tool für jeden Gründer: Cash + Kosten + Umsatz(-Wachstum) →
 * monatliche Simulation → Runway in Monaten, Cash-Tiefpunkt und die
 * Paul-Graham-Frage "Default Alive or Default Dead?" (erreicht der wachsende
 * Umsatz die Kosten, BEVOR das Geld ausgeht?).
 *
 * Anfänger-Fehler, die das Tool fixt:
 *  1. Runway statisch rechnen (Cash ÷ Burn) und Umsatz-Wachstum ignorieren
 *  2. Nicht wissen, ob man auf Profitabilität zuläuft oder auf die Wand
 *  3. Privatentnahme vergessen — der Gründer-Lohn ist auch Burn
 *  4. Zu spät reagieren: Kosten senkt man bei 12 Monaten Runway, nicht bei 3
 */
import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { NumberField } from "@/components/ui/number-field";
import { Callout, Field, KitTable, ResultPanel, ToolLayout, ToolSection } from "@/components/cockpit/kit";
import {
  Flame,
  Calculator,
  TrendingUp,
  Lightbulb,
  HelpCircle,
  PiggyBank,
  ChevronDown,
} from "lucide-react";

const MAX_MONATE = 60;

const RunwayRechner = () => {
  const [cash, setCash] = useState(20000);
  const [fixkostenMonat, setFixkostenMonat] = useState(1500);
  const [privatentnahmeMonat, setPrivatentnahmeMonat] = useState(1000);
  const [umsatzMonat, setUmsatzMonat] = useState(800);
  const [margeProzent, setMargeProzent] = useState(80);
  const [wachstumProzent, setWachstumProzent] = useState(8);

  const calc = useMemo(() => {
    const kosten = fixkostenMonat + privatentnahmeMonat;
    const marge = margeProzent / 100;
    const wachstum = wachstumProzent / 100;

    let bestand = cash;
    let umsatz = umsatzMonat;
    let runwayMonate: number | null = null; // Monat, in dem Cash < 0 fällt
    let profitabelMonat: number | null = null; // Monat, ab dem Deckungsbeitrag >= Kosten
    let tiefpunkt = cash;
    let tiefpunktMonat = 0;
    const verlauf: { monat: number; umsatz: number; saldo: number; bestand: number }[] = [];

    for (let m = 1; m <= MAX_MONATE; m++) {
      const deckungsbeitrag = umsatz * marge;
      const saldo = deckungsbeitrag - kosten;
      bestand += saldo;
      if (profitabelMonat === null && saldo >= 0) profitabelMonat = m;
      if (bestand < tiefpunkt) {
        tiefpunkt = bestand;
        tiefpunktMonat = m;
      }
      if (runwayMonate === null && bestand < 0) runwayMonate = m;
      if (m <= 12 || m % 6 === 0) verlauf.push({ monat: m, umsatz, saldo, bestand });
      if (runwayMonate !== null && m >= runwayMonate + 2) break; // kurz nach dem Aus abbrechen
      umsatz = umsatz * (1 + wachstum);
    }

    const burnHeute = kosten - umsatzMonat * marge;
    // Default Alive: Profitabilität wird erreicht, bevor das Geld ausgeht
    const defaultAlive = profitabelMonat !== null && (runwayMonate === null || profitabelMonat < runwayMonate);

    // Cash-0-Datum (nur wenn das Geld ausgeht)
    let cashEndeDatum: string | null = null;
    if (runwayMonate !== null) {
      const d = new Date();
      d.setMonth(d.getMonth() + runwayMonate);
      cashEndeDatum = d.toLocaleDateString("de-DE", { month: "long", year: "numeric" });
    }

    return { kosten, burnHeute, runwayMonate, profitabelMonat, defaultAlive, tiefpunkt, tiefpunktMonat, verlauf, cashEndeDatum };
  }, [cash, fixkostenMonat, privatentnahmeMonat, umsatzMonat, margeProzent, wachstumProzent]);

  const eur = (n: number) => Math.round(n).toLocaleString("de-DE");

  const kritisch = calc.runwayMonate !== null && calc.runwayMonate <= 6 && !calc.defaultAlive;

  return (
    <CockpitShell
      eyebrow="Buchhaltung & Reporting"
      title="Runway- & Burn-Rate-Rechner"
      subtitle="Die wichtigste Zahl jedes jungen Unternehmens: Wie viele Monate reicht das Geld, und holt der wachsende Umsatz die Kosten ein, bevor es ausgeht? (Paul Graham: „Default Alive or Default Dead?“)"
    >
      <ToolLayout
        className="mb-8"
        inputs={
          <>
            <ToolSection title="Cash und monatliche Kosten" icon={PiggyBank}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Kontostand heute (€)" hint="Geschäftskonto und fest fürs Business reserviertes Geld">
                  <NumberField value={cash} onChange={setCash} min={0} aria-label="Kontostand heute in Euro" />
                </Field>
                <Field label="Fixkosten pro Monat (€)" hint="Software, Server, Miete, Versicherungen, StB, Ads-Grundbudget">
                  <NumberField value={fixkostenMonat} onChange={setFixkostenMonat} min={0} aria-label="Fixkosten pro Monat in Euro" />
                </Field>
                <Field
                  className="sm:col-span-2"
                  label="Privatentnahme oder Gehalt pro Monat (€)"
                  hint="Dein Lebensunterhalt ist auch Burn, ehrlich eintragen (0, wenn nebenberuflich)"
                >
                  <NumberField value={privatentnahmeMonat} onChange={setPrivatentnahmeMonat} min={0} aria-label="Privatentnahme pro Monat in Euro" />
                </Field>
              </div>
            </ToolSection>

            <ToolSection title="Umsatz und Wachstum" icon={TrendingUp}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Umsatz pro Monat aktuell (€ netto)" hint="Ohne USt., 0 wenn noch vor dem Launch">
                  <NumberField value={umsatzMonat} onChange={setUmsatzMonat} min={0} aria-label="Umsatz pro Monat in Euro" />
                </Field>
                <Field label="Deckungsbeitrag / Marge (%)" hint="SaaS, Apps, Dienstleistung 80–95 %; E-Com nach Wareneinsatz und Versand oft 25–45 %">
                  <NumberField value={margeProzent} onChange={setMargeProzent} min={0} max={100} aria-label="Marge in Prozent" />
                </Field>
                <Field className="sm:col-span-2" label="Umsatz-Wachstum pro Monat (%)" hint="Ehrlich schätzen: 5–10 % pro Monat ist für Bootstrapper schon stark">
                  <NumberField step="0.5" value={wachstumProzent} onChange={setWachstumProzent} min={0} max={100} aria-label="Wachstum pro Monat in Prozent" />
                </Field>
              </div>
            </ToolSection>
          </>
        }
        result={
          <>
            <ResultPanel
              variant="ink"
              kicker="Dein Runway"
              title={calc.defaultAlive ? "Default Alive" : "Default Dead"}
              value={`${calc.runwayMonate === null ? "60+" : calc.runwayMonate} Monate`}
              valueHint={
                calc.cashEndeDatum
                  ? `Cash reicht bis etwa ${calc.cashEndeDatum}`
                  : calc.runwayMonate === null
                    ? "Das Geld geht in der Simulation nicht aus."
                    : undefined
              }
            >
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10">
                {[
                  {
                    l: "Netto-Burn heute",
                    v: `${calc.burnHeute > 0 ? `−${eur(calc.burnHeute)}` : `+${eur(-calc.burnHeute)}`} €/Mon`,
                  },
                  {
                    l: "Profitabel ab",
                    v: calc.profitabelMonat === null ? "> 60 Mon" : calc.profitabelMonat === 1 ? "jetzt" : `Monat ${calc.profitabelMonat}`,
                  },
                  { l: "Cash-Tiefpunkt", v: `${eur(calc.tiefpunkt)} €${calc.tiefpunktMonat > 0 ? ` (Mon ${calc.tiefpunktMonat})` : ""}` },
                  { l: "Status", v: calc.defaultAlive ? "Default Alive" : "Default Dead" },
                ].map((k) => (
                  <div key={k.l} className="bg-white/[0.04] p-3">
                    <div className="text-xs text-primary-foreground/65">{k.l}</div>
                    <div className="mt-0.5 font-semibold text-primary-foreground tabular">{k.v}</div>
                  </div>
                ))}
              </div>
            </ResultPanel>

            {kritisch && (
              <Callout tone="danger" title="Unter 6 Monate Runway ohne Kurs auf Profitabilität: Alarmstufe.">
                Jetzt handeln, nicht in Monat 5: Kosten radikal kürzen (jedes Abo und Tool hinterfragen), Privatentnahme
                senken oder Nebeneinkommen aufbauen, Umsatz-Quick-Wins (Preise rauf, Jahresvorauszahlung mit Rabatt,
                Bestandskunden nachfassen). Fundraising oder Kredit dauert 3–6 Monate; mit 2 Monaten Runway verhandelst du
                aus Schwäche.
              </Callout>
            )}
            {calc.defaultAlive && (
              <Callout tone="success" title="Default Alive">
                Mit den aktuellen Annahmen erreichst du Profitabilität
                {calc.profitabelMonat !== null && calc.profitabelMonat > 1 && <> in Monat {calc.profitabelMonat}</>}, bevor das
                Geld ausgeht (Tiefpunkt: {eur(calc.tiefpunkt)} €). Das Wachstum ist deine Lebensader. Schütze es, bevor du
                neue Fixkosten aufbaust.
              </Callout>
            )}
            {!calc.defaultAlive && !kritisch && (
              <Callout tone="warning" title="Default Dead, aber noch Zeit" icon={Lightbulb}>
                Mit aktuellem Wachstum holt der Umsatz die Kosten nicht rechtzeitig ein. Du hast {calc.runwayMonate ?? "60+"} Monate,
                um das zu ändern. Jeder Monat, den du früher handelst, zählt doppelt: Wachstum beschleunigen oder Burn senken.
                Rechne beide Hebel durch (z. B. Fixkosten −23 %, Wachstum +2 Punkte) und schau, was den Status kippt.
              </Callout>
            )}
          </>
        }
      />

      <ToolSection title="Cash-Verlauf (Simulation)" icon={Flame} className="mb-6">
        <KitTable caption="Simulierter Cash-Verlauf je Monat" className="max-h-[420px] overflow-y-auto">
          <thead className="sticky top-0">
            <tr>
              <th>Monat</th>
              <th className="!text-right">Umsatz</th>
              <th className="!text-right">Monats-Saldo</th>
              <th className="!text-right">Kontostand</th>
            </tr>
          </thead>
          <tbody>
            {calc.verlauf.map((v) => (
              <tr key={v.monat}>
                <td>{v.monat}</td>
                <td className="text-right">{eur(v.umsatz)} €</td>
                <td className={`text-right ${v.saldo >= 0 ? "text-success" : "text-danger"}`}>
                  {v.saldo >= 0 ? "+" : ""}{eur(v.saldo)} €
                </td>
                <td className={`text-right ${v.bestand >= 0 ? "" : "font-semibold text-danger"}`}>{eur(v.bestand)} €</td>
              </tr>
            ))}
          </tbody>
        </KitTable>
        <p className="mt-3 text-xs text-muted-foreground">
          Annahme: Umsatz wächst {wachstumProzent} % pro Monat, Kosten bleiben konstant. Steuern auf Gewinne sind nicht
          abgezogen; ab Profitabilität etwa 30 % Rücklage einplanen.
        </p>
      </ToolSection>

      <ToolSection title="Faustregeln für Gründer" icon={Calculator} className="mb-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Callout tone="success" title="12+ Monate Runway">
            Komfortzone: Du kannst in Wachstum investieren und Experimente fahren, die erst in Monaten zahlen.
          </Callout>
          <Callout tone="warning" title="6–12 Monate">
            Fokus-Modus: Nur noch Maßnahmen mit Umsatz-Wirkung in unter 90 Tagen. Neue Fixkosten: Stopp.
          </Callout>
          <Callout tone="danger" title="Unter 6 Monate">
            Überlebens-Modus: Kosten sofort kürzen, Einnahmen vorziehen, ggf. nebenher eine Cashflow-Quelle aufbauen.
          </Callout>
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
            { begriff: "Burn-Rate", erklaerung: "Wie viel Cash du pro Monat netto verlierst: alle Kosten (inkl. deiner Privatentnahme!) minus Deckungsbeitrag aus Umsatz. Bei 2.500 € Kosten und 640 € Deckungsbeitrag: 1.860 € Burn/Monat." },
            { begriff: "Runway", erklaerung: "Wie viele Monate dein Cash bei aktuellem Kurs reicht. Nicht statisch (Cash ÷ Burn), sondern simuliert: wachsender Umsatz verlängert den Runway jeden Monat." },
            { begriff: "Default Alive / Default Dead", erklaerung: "Paul Grahams Frage an jedes Startup: Erreichst du mit aktuellem Wachstum Profitabilität, bevor das Geld ausgeht? Ja = Default Alive (du brauchst niemanden). Nein = Default Dead (du bist auf externes Geld oder eine Kurskorrektur angewiesen; je früher du das weißt, desto mehr Optionen hast du)." },
            { begriff: "Deckungsbeitrag / Marge", erklaerung: "Was vom Umsatz nach direkten Kosten übrig bleibt (Wareneinsatz, Versand, Payment-Fees, Store-Provision). SaaS/Apps: 80–95 %. E-Commerce: oft nur 25–45 %, deshalb fühlt sich E-Com-Umsatz größer an, als er ist." },
            { begriff: "Cash-Tiefpunkt", erklaerung: "Der niedrigste Kontostand der Simulation. Auch wer am Ende profitabel wird, kann vorher durch ein Tal müssen. Der Tiefpunkt zeigt, wie viel Puffer du wirklich brauchst." },
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
          { label: "Paul Graham: Default Alive or Default Dead?", url: "https://paulgraham.com/aord.html" },
        ]}
        note="Modell-Rechnung mit konstanten Kosten und konstanter Wachstumsrate; reale Geschäfte sind saisonal und sprunghaft. Für die banktaugliche Sicht mit echten Zahlen: BWA-Generator im Cockpit."
      />
    </CockpitShell>
  );
};

export default RunwayRechner;
