import { useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { useTrackToolEvent } from "@/hooks/useTrackToolEvent";
import { Calculator, TrendingUp, Receipt, CalendarClock } from "lucide-react";

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
      title="Umsatzsteuer-Voranmeldung (USt 1 A) — Schritt für Schritt"
      subtitle="Was bedeutet welche Kennzahl? Walkthrough des echten ELSTER-Vordrucks 2026 (USt 1 A) mit den Kennzahlen, die für Solo-Selbstständige & E-Commerce zählen — plus Dauerfristverlängerung und Sondervorauszahlung (USt 1 H). Du füllst in ELSTER aus, diese Seite erklärt parallel."
    >
      {/* Wer / Wann */}
      <div className="rounded-2xl border-2 border-accent-blue/30 bg-gradient-to-br from-accent-blue/10 via-card to-card p-5 mb-4">
        <div className="flex items-start gap-3">
          <CalendarClock className="h-6 w-6 text-accent-blue shrink-0 mt-0.5" />
          <div className="text-sm">
            <h3 className="font-bold mb-1">Wer muss wann abgeben? (Stand 2026)</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li><strong>Monatlich</strong>, wenn die USt-Zahllast des Vorjahres &gt; 9.000 € war.</li>
              <li><strong>Vierteljährlich</strong> bei Vorjahres-Zahllast 2.000–9.000 €.</li>
              <li><strong>Keine</strong> Voranmeldung (nur Jahreserklärung) bei ≤ 2.000 € (Werte seit BEG IV, 2025 angehoben).</li>
              <li><strong>Kleinunternehmer § 19:</strong> gar keine Voranmeldung, solange KU-Status besteht.</li>
              <li><strong>Neugründer:</strong> Die frühere Pflicht zur monatlichen Abgabe in den ersten 2 Jahren ist bis 2026 ausgesetzt — es gilt die geschätzte Zahllast.</li>
            </ul>
            <p className="mt-2 text-muted-foreground">
              <strong>Frist:</strong> 10. Tag nach Ablauf des Zeitraums (z. B. 10.02. für Januar). Mit <strong>Dauerfristverlängerung</strong> +1 Monat. Übermittlung nur authentifiziert via ELSTER (§ 18 Abs. 1 UStG).
            </p>
          </div>
        </div>
      </div>

      {/* Sondervorauszahlungs-Rechner */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-4">
        <h3 className="font-bold text-sm mb-1 flex items-center gap-2">
          <Calculator className="h-4 w-4 text-accent-blue" /> Sondervorauszahlung 1/11 (USt 1 H)
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          Wer <strong>monatlich</strong> abgibt und Dauerfristverlängerung will, muss eine Sondervorauszahlung leisten:
          <strong> 1/11 der Summe der USt-Vorauszahlungen des Vorjahres</strong>. Vierteljährliche Abgeber zahlen
          KEINE Sondervorauszahlung (Antrag trotzdem einmal stellen). Du bekommst sie über Kz 39 in der letzten
          Voranmeldung wieder angerechnet.
        </p>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Summe deiner USt-Vorauszahlungen 2025 (€)
        </label>
        <Input
          type="number"
          min={0}
          value={vorjahr || ""}
          onChange={(e) => {
            setVorjahr(Math.max(0, Number(e.target.value) || 0));
            track("sonder_calc");
          }}
          placeholder="z. B. 12000"
          className="mt-1 max-w-xs"
        />
        <div className="mt-3 rounded-lg bg-accent-blue/8 border border-accent-blue/30 p-3 text-sm">
          Sondervorauszahlung 2026 (Kz 38):{" "}
          <strong className="tabular-nums">
            {sonder.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
          </strong>
        </div>
      </div>

      {/* Kennzahlen-Walkthrough */}
      <div className="space-y-4">
        {BLOCKS.map((b) => (
          <div key={b.letter} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-xs font-bold text-accent-blue shrink-0">{b.letter}</span>
              <h2 className="text-base font-bold">{b.title}</h2>
            </div>
            <div className="space-y-0">
              {b.rows.map((r) => (
                <div key={r.kz} className="border-t border-border/60 py-2 flex items-start gap-3">
                  <span className="text-[10px] font-mono text-muted-foreground shrink-0 w-8 mt-0.5">Z {r.z}</span>
                  <span className="shrink-0 rounded bg-muted px-2 py-0.5 text-xs font-mono font-semibold">Kz {r.kz}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium flex items-center gap-1.5">
                      {r.label}
                      {r.star && <Star className="h-3 w-3 text-amber-500 shrink-0" aria-label="häufig für Solo/E-Com" />}
                    </div>
                    {r.hint && <div className="text-xs text-muted-foreground mt-0.5">{r.hint}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Dauerfristverlängerung */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 mt-4 text-sm">
        <h3 className="font-bold mb-1 flex items-center gap-2"><Info className="h-4 w-4 text-emerald-700" /> Dauerfristverlängerung (USt 1 H) — fast immer sinnvoll</h3>
        <p className="text-muted-foreground">
          Verlängert die Abgabe- UND Zahlfrist dauerhaft um einen Monat (z. B. Januar-VA erst am 10.03. statt 10.02.).
          Einmal beantragen, gilt fort — nicht jährlich wiederholen. Monatliche Abgeber leisten dafür die 1/11-Sondervorauszahlung
          (oben), vierteljährliche nicht. Mehr Cashflow-Puffer, praktisch kein Nachteil.
        </p>
        <h4 className="font-bold mt-3 mb-1">So beantragst du sie</h4>
        <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
          <li><strong>Frist:</strong> bis <strong>10.02.</strong> (Monatszahler) bzw. <strong>10.04.</strong> (Vierteljahreszahler) — jeweils bis zur Fälligkeit der ersten betroffenen Voranmeldung. Kein Bewilligungsbescheid; gilt, solange das FA nicht widerspricht.</li>
          <li><strong>In ELSTER:</strong> Formular <strong>„Dauerfristverlängerung/Sondervorauszahlung (monatlich)"</strong> bzw. <strong>„Dauerfristverlängerung (vierteljährlich)"</strong> → Jahr + Finanzamt → Monatszahler tragen die 1/11-Sondervorauszahlung (Kz 38, oben berechnet) ein, Vierteljahreszahler lassen das Feld leer → authentifiziert absenden. Gilt fortlaufend.</li>
          <li><strong>Per Software:</strong> <strong>Lexware Office</strong> unter „Buchhaltung → Steuerliche Meldung", <strong>sevDesk</strong> im Bereich „Umsatzsteuer & Buchhaltung" — Antrag direkt mit ELSTER-Übermittlung.</li>
          <li><strong>Sondervorauszahlung zurück:</strong> die 1/11-Vorauszahlung holst du über <strong>Kz 39</strong> in der letzten Voranmeldung des Jahres (Dezember) wieder an.</li>
        </ol>
      </div>

      {/* Zusammenfassende Meldung */}
      <div className="rounded-2xl border border-border bg-card p-5 mt-4 text-sm">
        <h3 className="font-bold mb-1 flex items-center gap-2"><Info className="h-4 w-4 text-accent-blue" /> Nicht verwechseln: Zusammenfassende Meldung (ZM)</h3>
        <p className="text-muted-foreground">
          Sobald du <strong>innergemeinschaftliche B2B-Umsätze</strong> hast (EU-Lieferungen/-Leistungen an Kunden mit
          USt-IdNr — Kz 41 oben), brauchst du zusätzlich zur USt-VA die <strong>Zusammenfassende Meldung</strong>. Sie
          meldet diese EU-Umsätze gesammelt ans <strong>Bundeszentralamt für Steuern (BZSt)</strong> (nicht ans Finanzamt),
          ist eine <em>eigene</em> Meldung und <strong>kennt keine Dauerfristverlängerung</strong> — Frist immer der
          <strong> 25. des Folgemonats</strong>. Abgabe über ELSTER oder auf Knopfdruck aus Lexware Office / sevDesk (siehe{" "}
          <Link to="/cockpit/buchhaltungssoftware-guide" className="text-accent-blue underline">Buchhaltungssoftware-Guide</Link>).
        </p>
      </div>

      {/* Cross-Links */}
      <div className="rounded-2xl border border-border bg-card p-5 mt-4 text-sm">
        <h3 className="font-bold mb-2">Passt dazu</h3>
        <ul className="space-y-1">
          <li><Link to="/cockpit/ust-rechner" className="text-accent-blue underline">USt-Rechner (alle Fälle: §19, §13b, OSS, IGL)</Link></li>
          <li><Link to="/cockpit/fse-wizard" className="text-accent-blue underline">FsE-Wizard — hier legst du den USt-Status überhaupt erst fest</Link></li>
          <li><Link to="/cockpit/schwellen-check" className="text-accent-blue underline">Schwellen-Check (KU-Grenzen, DAC7)</Link></li>
        </ul>
      </div>

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
