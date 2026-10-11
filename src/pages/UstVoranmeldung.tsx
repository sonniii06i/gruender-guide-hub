import { useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { useTrackToolEvent } from "@/hooks/useTrackToolEvent";
import { ArrowRight, Calculator, CalendarClock, Star, Info } from "lucide-react";
import { Callout, Field, ResultPanel, ToolSection } from "@/components/cockpit/kit";

/**
 * Read-only Walkthrough der Umsatzsteuer-Voranmeldung (USt 1 A) + Antrag auf
 * Dauerfristverlängerung / Sondervorauszahlung (USt 1 H), Stand 2026.
 * Kennzahlen 1:1 gegen das BMF-Vordruckmuster vom 29.12.2025 verifiziert
 * (2026USt1A561/562/563 + 2026USt1H571). Kein Input-Tool — du füllst in ELSTER aus.
 */

interface Kz {
  z: number; // ELSTER-Zeile im Vordruck
  kz: string; // Kennzahl(en)
  label: string;
  hint?: string;
  star?: boolean; // für Solo / E-Commerce besonders häufig
}

interface Block {
  letter: string;
  title: string;
  rows: Kz[];
}

const BLOCKS: Block[] = [
  {
    letter: "A",
    title: "Steuerpflichtige Umsätze (deine Einnahmen mit USt)",
    rows: [
      { z: 13, kz: "81", label: "Umsätze zum Steuersatz 19 %", hint: "Netto-Bemessungsgrundlage — die Steuer rechnet ELSTER selbst.", star: true },
      { z: 14, kz: "86", label: "Umsätze zum Steuersatz 7 %", hint: "z. B. Bücher, Lebensmittel, bestimmte Leistungen.", star: true },
      { z: 15, kz: "87", label: "Umsätze zum Steuersatz 0 %", hint: "Nullsatz (z. B. bestimmte PV-Anlagen)." },
      { z: 16, kz: "35 / 36", label: "Umsätze zu anderen Steuersätzen", hint: "Bemessung Kz 35, Steuer Kz 36 (selbst eintragen)." },
      { z: 18, kz: "76 / 80", label: "§ 24 UStG Land-/Forstwirtschaft (Sägewerk, Getränke …)", hint: "Nur Land-/Forstwirte." },
    ],
  },
  {
    letter: "B",
    title: "Steuerfreie Umsätze",
    rows: [
      { z: 19, kz: "41", label: "Innergemeinschaftliche Lieferungen an Abnehmer mit USt-IdNr", hint: "B2B-Lieferung in EU-Land — steuerfrei, aber meldepflichtig (auch ZM!).", star: true },
      { z: 22, kz: "43", label: "Weitere steuerfreie Umsätze mit Vorsteuerabzug", hint: "z. B. Ausfuhrlieferungen in Drittländer (§ 4 Nr. 2–7)." },
      { z: 23, kz: "48", label: "Steuerfreie Umsätze ohne Vorsteuerabzug", hint: "z. B. § 4 Nr. 8–29 (Heilbehandlung, Vermietung …)." },
    ],
  },
  {
    letter: "C",
    title: "Innergemeinschaftliche Erwerbe (EU-Einkauf B2B)",
    rows: [
      { z: 25, kz: "89", label: "Steuerpflichtige i.g. Erwerbe 19 %", hint: "Einkauf von Ware aus EU-Land mit USt-IdNr → du versteuerst selbst (und ziehst i. d. R. als Vorsteuer Kz 61 wieder ab).", star: true },
      { z: 26, kz: "93", label: "I.g. Erwerbe 7 %" },
      { z: 24, kz: "91", label: "Steuerfreie i.g. Erwerbe (§§ 4b, 25c)" },
    ],
  },
  {
    letter: "D",
    title: "§ 13b UStG — du als Leistungsempfänger schuldest die Steuer (Reverse Charge)",
    rows: [
      { z: 30, kz: "46 / 47", label: "Sonstige Leistungen von EU-Unternehmern (§ 13b Abs. 1)", hint: "Klassiker: Meta/Google/AWS-Rechnungen aus IE/LU. Bemessung Kz 46, Steuer Kz 47 — meist als Vorsteuer Kz 67 wieder abziehbar.", star: true },
      { z: 32, kz: "84 / 85", label: "Andere Leistungen § 13b Abs. 2 (Nr. 1, 2, 4–12)", hint: "z. B. Bauleistungen, Schrott, Gebäudereinigung." },
      { z: 31, kz: "73 / 74", label: "Umsätze unter das GrEStG (§ 13b Abs. 2 Nr. 3)" },
    ],
  },
  {
    letter: "F",
    title: "Abziehbare Vorsteuer (deine USt aus Eingangsrechnungen)",
    rows: [
      { z: 38, kz: "66", label: "Vorsteuer aus Rechnungen anderer Unternehmer (§ 15 Abs. 1 Nr. 1)", hint: "Die USt auf deine Einkäufe/Kosten mit korrekter Rechnung.", star: true },
      { z: 40, kz: "62", label: "Entstandene Einfuhrumsatzsteuer (§ 15 Abs. 1 Nr. 2)", hint: "Bei Import aus Drittland (z. B. China-Ware über den Zoll)." },
      { z: 39, kz: "61", label: "Vorsteuer aus innergemeinschaftlichem Erwerb", hint: "Gegenstück zu Kz 89 — hebt die i.g.-Erwerbsteuer i. d. R. auf." },
      { z: 41, kz: "67", label: "Vorsteuer aus Leistungen i. S. d. § 13b UStG", hint: "Gegenstück zu Kz 47 — hebt die Reverse-Charge-Steuer i. d. R. auf." },
      { z: 44, kz: "64", label: "Berichtigung des Vorsteuerabzugs (§ 15a)" },
    ],
  },
  {
    letter: "H",
    title: "Zahllast / Überschuss",
    rows: [
      { z: 49, kz: "39", label: "Abzug der festgesetzten Sondervorauszahlung", hint: "Nur in der letzten Voranmeldung des Zeitraums (Dezember bzw. Q4) — holt deine 1/11-Sondervorauszahlung zurück.", star: true },
      { z: 50, kz: "83", label: "Verbleibende USt-Vorauszahlung / Überschuss", hint: "Das Ergebnis: positiv = du zahlst, negativ (mit Minus!) = Erstattung. ELSTER rechnet es, prüf es.", star: true },
    ],
  },
  {
    letter: "J",
    title: "Sonstige Angaben",
    rows: [
      { z: 12, kz: "70", label: "Wechsel von Kleinunternehmer (§ 19) zur Regelbesteuerung", hint: "Datum eintragen, wenn du in diesem Zeitraum die KU-Regelung verlassen hast." },
      { z: 10, kz: "10", label: "Berichtigte Anmeldung (1 = Ja)", hint: "Ankreuzen, wenn du eine frühere Voranmeldung korrigierst." },
      { z: 55, kz: "500", label: "Ergänzende Angaben zur Steueranmeldung (1–4)", hint: "NEU 2026 (vorher Kz 23): Hinweis an das FA, wenn du bewusst von der Verwaltungsauffassung abweichst o. Ä." },
    ],
  },
];

const UstVoranmeldung = () => {
  const [vorjahr, setVorjahr] = useState(0); // Summe verbleibender USt-Vorauszahlungen Vorjahr
  const sonder = useMemo(() => Math.round((vorjahr / 11) * 100) / 100, [vorjahr]);
  const track = useTrackToolEvent("ust-voranmeldung");

  return (
    <CockpitShell
      eyebrow="USt-Voranmeldung + Dauerfristverlängerung"
      title="Umsatzsteuer-Voranmeldung (USt 1 A) Schritt für Schritt"
      subtitle="Was bedeutet welche Kennzahl? Walkthrough des echten ELSTER-Vordrucks 2026 (USt 1 A) mit den Kennzahlen, die für Solo-Selbstständige und E-Commerce zählen, plus Dauerfristverlängerung und Sondervorauszahlung (USt 1 H). Du füllst in ELSTER aus, diese Seite erklärt parallel."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        {/* Wer / Wann */}
        <ToolSection icon={CalendarClock} title="Wer muss wann abgeben?" description="Stand 2026">
          <ul className="space-y-2.5 text-sm leading-relaxed text-foreground/85">
            <li><strong className="text-foreground">Monatlich</strong>, wenn die USt-Zahllast des Vorjahres über 9.000 € lag.</li>
            <li><strong className="text-foreground">Vierteljährlich</strong> bei Vorjahres-Zahllast 2.000 bis 9.000 €.</li>
            <li><strong className="text-foreground">Keine</strong> Voranmeldung (nur Jahreserklärung) bei höchstens 2.000 € (Werte seit BEG IV, 2025 angehoben).</li>
            <li><strong className="text-foreground">Kleinunternehmer § 19:</strong> gar keine Voranmeldung, solange der KU-Status besteht.</li>
            <li><strong className="text-foreground">Neugründer:</strong> Die frühere Pflicht zur monatlichen Abgabe in den ersten 2 Jahren ist bis 2026 ausgesetzt; es gilt die geschätzte Zahllast.</li>
          </ul>
          <Callout tone="info" icon={CalendarClock} className="mt-4" title="Frist">
            10. Tag nach Ablauf des Zeitraums (z. B. 10.02. für Januar). Mit <strong>Dauerfristverlängerung</strong> ein Monat
            mehr. Übermittlung nur authentifiziert via ELSTER (§ 18 Abs. 1 UStG).
          </Callout>
        </ToolSection>

        {/* Sondervorauszahlungs-Rechner */}
        <ToolSection
          icon={Calculator}
          title="Sondervorauszahlung 1/11 (USt 1 H)"
          description={
            <>
              Wer <strong>monatlich</strong> abgibt und Dauerfristverlängerung will, leistet eine Sondervorauszahlung:
              <strong> 1/11 der Summe der USt-Vorauszahlungen des Vorjahres</strong>. Vierteljährliche Abgeber zahlen keine
              (Antrag trotzdem einmal stellen). Über Kz 39 in der letzten Voranmeldung wird sie wieder angerechnet.
            </>
          }
        >
          <Field label="Summe deiner USt-Vorauszahlungen 2025 (€)" htmlFor="ust-vorjahr">
            <Input
              id="ust-vorjahr"
              type="number"
              inputMode="decimal"
              min={0}
              value={vorjahr || ""}
              onChange={(e) => {
                setVorjahr(Math.max(0, Number(e.target.value) || 0));
                track("sonder_calc");
              }}
              placeholder="z. B. 12000"
            />
          </Field>
          <ResultPanel
            className="mt-5"
            variant="ink"
            title="Sondervorauszahlung 2026 (Kz 38)"
            value={`${sonder.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`}
            valueHint={vorjahr ? "1/11 der Vorjahressumme" : "Trag die Vorjahressumme ein"}
          />
        </ToolSection>
      </div>

      {/* Kennzahlen-Walkthrough */}
      <div className="mt-10 mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Die Kennzahlen im Vordruck</h2>
          <p className="mt-1 text-sm text-muted-foreground">Z = Zeile im Vordruck, Kz = Kennzahl in ELSTER.</p>
        </div>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-warning text-warning" aria-hidden="true" /> häufig bei Solo und E-Commerce
        </p>
      </div>
      <div className="space-y-4">
        {BLOCKS.map((b) => (
          <ToolSection
            key={b.letter}
            title={
              <span className="flex items-baseline gap-2.5">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
                  {b.letter}
                </span>
                {b.title}
              </span>
            }
            bodyClassName="px-5 py-1 md:px-6"
          >
            <ul className="divide-y divide-border/70">
              {b.rows.map((r) => (
                <li key={r.kz} className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 gap-y-1 py-3 sm:grid-cols-[2.75rem_auto_minmax(0,1fr)]">
                  <span className="hidden pt-0.5 text-xs text-muted-foreground tabular sm:block">Z {r.z}</span>
                  <span className="shrink-0 rounded-md bg-secondary px-2 py-0.5 font-mono text-xs font-semibold tabular">Kz {r.kz}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-sm font-medium">
                      {r.label}
                      {r.star && <Star className="h-3.5 w-3.5 shrink-0 fill-warning text-warning" aria-label="häufig für Solo/E-Com" />}
                    </div>
                    {r.hint && <div className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{r.hint}</div>}
                    <div className="mt-0.5 text-xs text-muted-foreground tabular sm:hidden">Zeile {r.z}</div>
                  </div>
                </li>
              ))}
            </ul>
          </ToolSection>
        ))}
      </div>

      {/* Dauerfristverlängerung */}
      <ToolSection
        className="mt-6 border-success/25"
        icon={Info}
        title="Dauerfristverlängerung (USt 1 H): fast immer sinnvoll"
        description="Verlängert Abgabe- und Zahlfrist dauerhaft um einen Monat (z. B. Januar-VA erst am 10.03. statt 10.02.). Einmal beantragen, gilt fort. Monatliche Abgeber leisten dafür die 1/11-Sondervorauszahlung (oben), vierteljährliche nicht. Mehr Cashflow-Puffer, praktisch kein Nachteil."
      >
        <h3 className="mb-3 text-sm font-semibold">So beantragst du sie</h3>
        <ol className="space-y-3 text-sm leading-relaxed text-foreground/85">
          {[
            <><strong className="text-foreground">Frist:</strong> bis <strong>10.02.</strong> (Monatszahler) bzw. <strong>10.04.</strong> (Vierteljahreszahler), jeweils bis zur Fälligkeit der ersten betroffenen Voranmeldung. Kein Bewilligungsbescheid; gilt, solange das FA nicht widerspricht.</>,
            <><strong className="text-foreground">In ELSTER:</strong> Formular <strong>„Dauerfristverlängerung/Sondervorauszahlung (monatlich)"</strong> bzw. <strong>„Dauerfristverlängerung (vierteljährlich)"</strong>, dann Jahr und Finanzamt wählen. Monatszahler tragen die 1/11-Sondervorauszahlung (Kz 38, oben berechnet) ein, Vierteljahreszahler lassen das Feld leer. Authentifiziert absenden; gilt fortlaufend.</>,
            <><strong className="text-foreground">Per Software:</strong> <strong>Lexware Office</strong> unter „Buchhaltung → Steuerliche Meldung", <strong>sevDesk</strong> im Bereich „Umsatzsteuer & Buchhaltung", Antrag direkt mit ELSTER-Übermittlung.</>,
            <><strong className="text-foreground">Sondervorauszahlung zurück:</strong> Die 1/11-Vorauszahlung holst du über <strong>Kz 39</strong> in der letzten Voranmeldung des Jahres (Dezember) wieder.</>,
          ].map((li, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success-soft text-xs font-semibold text-success tabular">{i + 1}</span>
              <span>{li}</span>
            </li>
          ))}
        </ol>
      </ToolSection>

      {/* Zusammenfassende Meldung */}
      <Callout tone="info" className="mt-6" title="Nicht verwechseln: Zusammenfassende Meldung (ZM)">
        Sobald du <strong>innergemeinschaftliche B2B-Umsätze</strong> hast (EU-Lieferungen/-Leistungen an Kunden mit
        USt-IdNr, Kz 41 oben), brauchst du zusätzlich zur USt-VA die <strong>Zusammenfassende Meldung</strong>. Sie meldet
        diese EU-Umsätze gesammelt ans <strong>Bundeszentralamt für Steuern (BZSt)</strong> (nicht ans Finanzamt), ist eine{" "}
        <em>eigene</em> Meldung und <strong>kennt keine Dauerfristverlängerung</strong>: Frist ist immer der
        <strong> 25. des Folgemonats</strong>. Abgabe über ELSTER oder auf Knopfdruck aus Lexware Office / sevDesk (siehe{" "}
        <Link to="/cockpit/buchhaltungssoftware-guide" className="font-medium text-accent-blue underline underline-offset-2">Buchhaltungssoftware-Guide</Link>).
      </Callout>

      {/* Cross-Links */}
      <ToolSection className="mt-6" title="Passt dazu" bodyClassName="grid gap-2 sm:grid-cols-3">
        {[
          { to: "/cockpit/ust-rechner", t: "USt-Rechner", d: "Alle Fälle: §19, §13b, OSS, IGL" },
          { to: "/cockpit/fse-wizard", t: "FsE-Wizard", d: "Hier legst du den USt-Status überhaupt erst fest" },
          { to: "/cockpit/schwellen-check", t: "Schwellen-Check", d: "KU-Grenzen, DAC7" },
        ].map((l) => (
          <Link key={l.to} to={l.to} className="press group rounded-xl border border-border bg-background/60 p-3.5 hover:border-accent-blue/40 hover:bg-card">
            <span className="flex items-center justify-between gap-2 text-sm font-semibold">
              {l.t}
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent-blue" aria-hidden="true" />
            </span>
            <span className="mt-0.5 block text-xs text-muted-foreground">{l.d}</span>
          </Link>
        ))}
      </ToolSection>

      <Stand2026Footer
        sources={[
          { label: "BMF: Vordruckmuster USt-Voranmeldung 2026 (29.12.2025)", url: "https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Steuerarten/Umsatzsteuer/2025-12-29-vordruckmuster-USt-voranmeldung-2026.html" },
          { label: "§ 18 UStG (Voranmeldung)", url: "https://www.gesetze-im-internet.de/ustg_1980/__18.html" },
          { label: "§§ 46–48 UStDV (Dauerfristverlängerung)", url: "https://www.gesetze-im-internet.de/ustdv_1980/__46.html" },
          { label: "ELSTER: Dauerfristverlängerung beantragen", url: "https://www.elster.de/eportal/helfer/inhalt/UmsatzsteuerDauerfristverlaengerung" },
          { label: "§ 18a UStG (Zusammenfassende Meldung)", url: "https://www.gesetze-im-internet.de/ustg_1980/__18a.html" },
        ]}
        note="Kennzahlen 1:1 aus dem amtlichen BMF-Vordruckmuster 2026 (USt 1 A: 2026USt1A561–563, USt 1 H: 2026USt1H571). Abgabe-Schwellen monatlich >9.000 € / vierteljährlich 2.000–9.000 € / keine VA ≤2.000 € Vorjahres-Zahllast (BEG IV, seit 2025). Keine Steuerberatung — im Zweifel StB/Finanzamt."
      />
    </CockpitShell>
  );
};

export default UstVoranmeldung;
