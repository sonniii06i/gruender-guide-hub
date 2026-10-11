import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { useTrackToolEvent } from "@/hooks/useTrackToolEvent";
import { ArrowRight, Star, CalendarClock } from "lucide-react";
import { Callout, Field, ResultPanel, ToolLayout, ToolSection } from "@/components/cockpit/kit";

/**
 * Read-only Walkthrough der Anlage EUER (Einnahmenueberschussrechnung nach
 * Paragraf 4 Abs. 3 EStG), Stand Vordruckmuster 2025 (BMF 29.08.2025).
 * Zeilen + Kennzahlen 1:1 gegen das amtliche Vordruckmuster verifiziert
 * (2025AnlEUER801-804). Kein Input-Tool fuer die Abgabe - du fuellst in ELSTER aus.
 */

interface Row {
  z: number; // Zeile im Vordruck
  kz: string; // Kennzahl(en)
  label: string;
  hint?: string;
  star?: boolean; // fuer Solo / E-Commerce besonders haeufig
}

interface Block {
  nr: string;
  title: string;
  rows: Row[];
}

const BLOCKS: Block[] = [
  {
    nr: "0",
    title: "Allgemeine Angaben zum Betrieb",
    rows: [
      { z: 5, kz: "101", label: "Wirtschafts-Identifikationsnummer (W-IdNr., Format DE…)", hint: "Die neue bundeseinheitliche Betriebs-Nummer. Falls noch nicht zugeteilt, Feld leer lassen." },
      { z: 6, kz: "100", label: "Art des Betriebs", hint: "Kurze Bezeichnung deiner Tätigkeit, z. B. Online-Handel oder Webdesign." },
      { z: 7, kz: "—", label: "Rechtsform des Betriebs" },
      { z: 8, kz: "103", label: "Einkunftsart", hint: "1 = Land-/Forstwirtschaft · 2 = Gewerbebetrieb · 3 = Selbständige Arbeit (Freiberufler).", star: true },
      { z: 10, kz: "111", label: "Wurde der Betrieb im Jahr beendet?", hint: "1 = veräußert/aufgegeben (dann Zeile 89 beachten)." },
      { z: 11, kz: "120", label: "Grundstücke entnommen oder veräußert?", hint: "1 = Ja · 2 = Nein." },
    ],
  },
  {
    nr: "1",
    title: "Betriebseinnahmen (deine Einnahmen)",
    rows: [
      { z: 12, kz: "111", label: "Betriebseinnahmen als Kleinunternehmer (§ 19 Abs. 1 UStG)", hint: "Wenn du Kleinunternehmer bist: hier ALLE Einnahmen als Bruttobetrag rein (du weist ja keine USt aus). Dann Zeilen 15–18 leer lassen.", star: true },
      { z: 14, kz: "104", label: "Betriebseinnahmen als Land-/Forstwirt (§ 24 UStG Durchschnittssatz)" },
      { z: 15, kz: "112", label: "Umsatzsteuerpflichtige Betriebseinnahmen (netto, ohne ermäßigt/0 %)", hint: "Regelbesteuerung: deine Netto-Umsätze zu 19 %. Die USt selbst kommt in Zeile 17.", star: true },
      { z: 16, kz: "103", label: "Umsatzsteuerfreie / nicht steuerbare / § 13b-Einnahmen", hint: "z. B. § 4 UStG steuerfrei, 0 %-Satz nach § 12 Abs. 3, oder Reverse-Charge-Umsätze." },
      { z: 17, kz: "140", label: "Vereinnahmte Umsatzsteuer (+ USt auf unentgeltliche Wertabgaben)", hint: "Die von deinen Kunden kassierte USt ist Betriebseinnahme (Brutto-Methode der EÜR).", star: true },
      { z: 18, kz: "141", label: "Vom Finanzamt erstattete / verrechnete Umsatzsteuer", hint: "USt-Erstattungen des FA zählen als Einnahme." },
      { z: 19, kz: "102", label: "Veräußerung oder Entnahme von Anlagevermögen", hint: "Verkauf/Privatentnahme z. B. von Laptop, Maschine, Firmenwagen." },
      { z: 20, kz: "106", label: "Private Kfz-Nutzung", hint: "1 %-Regelung oder Fahrtenbuch-Privatanteil — Gegenbuchung im Kfz-Optimizer." },
      { z: 21, kz: "108", label: "Sonstige Sach-, Nutzungs- und Leistungsentnahmen", hint: "z. B. private Telefon-/Strom-Nutzung, Waren-Eigenverbrauch." },
      { z: 22, kz: "—", label: "Auflösung von Rücklagen / Ausgleichsposten (Übertrag aus Zeile 105)" },
      { z: 23, kz: "159", label: "= Summe Betriebseinnahmen (Übertrag in Zeile 76)", hint: "ELSTER summiert automatisch. Diese Summe ist die Basis der Gewinnermittlung.", star: true },
    ],
  },
  {
    nr: "2a",
    title: "Betriebsausgaben — Waren & Personal",
    rows: [
      { z: 24, kz: "195", label: "Betriebsausgabenpauschale für bestimmte Berufsgruppen", hint: "Nur für bestimmte freie Berufe (z. B. Schriftsteller 30 %, Journalisten). Pauschale statt Einzelbelege." },
      { z: 27, kz: "100", label: "Waren, Rohstoffe und Hilfsstoffe inkl. Nebenkosten", hint: "Dein Wareneinkauf — für E-Commerce/Handel der größte Posten.", star: true },
      { z: 29, kz: "110", label: "Bezogene Fremdleistungen", hint: "z. B. Subunternehmer, Freelancer, Agentur, Fulfillment-Dienstleister.", star: true },
      { z: 30, kz: "120", label: "Ausgaben für eigenes Personal (Gehälter, Löhne, SV-Beiträge)" },
    ],
  },
  {
    nr: "2b",
    title: "Abschreibung für Abnutzung (AfA)",
    rows: [
      { z: 32, kz: "131", label: "AfA auf immaterielle Wirtschaftsgüter", hint: "z. B. gekaufte Software-Lizenzen, Domains (Übertrag aus Anlage AVEÜR)." },
      { z: 33, kz: "130", label: "AfA auf bewegliche Wirtschaftsgüter", hint: "Laptop, Möbel, Maschinen über die Nutzungsdauer abgeschrieben.", star: true },
      { z: 34, kz: "134", label: "Sonderabschreibungen (§ 7b, § 7g Abs. 5/6 EStG)" },
      { z: 36, kz: "132", label: "Geringwertige Wirtschaftsgüter (GWG, § 6 Abs. 2 EStG)", hint: "Anschaffung bis 800 € netto sofort voll abziehbar.", star: true },
      { z: 37, kz: "137", label: "Auflösung Sammelposten (§ 6 Abs. 2a EStG)", hint: "Pool-Abschreibung 250–1.000 € über 5 Jahre." },
      { z: 38, kz: "135", label: "Restbuchwerte ausgeschiedener Anlagegüter" },
    ],
  },
  {
    nr: "2c",
    title: "Raumkosten & sonstige Grundstücksaufwendungen",
    rows: [
      { z: 39, kz: "150", label: "Miete/Pacht für Geschäftsräume und betrieblich genutzte Grundstücke", star: true },
      { z: 40, kz: "152", label: "Aufwendungen für doppelte Haushaltsführung (z. B. Miete)" },
      { z: 41, kz: "151", label: "Sonstige Aufwendungen für betrieblich genutzte Grundstücke (ohne Schuldzinsen/AfA)" },
    ],
  },
  {
    nr: "2d",
    title: "Sonstige unbeschränkt abziehbare Betriebsausgaben",
    rows: [
      { z: 43, kz: "280", label: "Telekommunikation (Telefon, Internet)", star: true },
      { z: 44, kz: "221", label: "Übernachtungs- und Reisenebenkosten bei Geschäftsreisen" },
      { z: 45, kz: "281", label: "Fortbildungskosten (ohne Reisekosten)" },
      { z: 46, kz: "194", label: "Rechts-, Steuerberatung und Buchführung", hint: "Auch dein Software-Abo (Lexware/sevDesk) und StB-Honorar.", star: true },
      { z: 47, kz: "222", label: "Miete/Leasing für bewegliche Wirtschaftsgüter (ohne Kfz)" },
      { z: 48, kz: "225", label: "Erhaltungsaufwendungen (Instandhaltung, Wartung, Reparatur; ohne Gebäude/Kfz)" },
      { z: 49, kz: "223", label: "Beiträge, Gebühren, Abgaben und Versicherungen (ohne Gebäude/Kfz)", star: true },
      { z: 50, kz: "228", label: "Laufende EDV-Kosten (z. B. Hosting, SaaS, Wartung)", star: true },
      { z: 51, kz: "229", label: "Arbeitsmittel (Bürobedarf, Porto, Fachliteratur)", star: true },
      { z: 53, kz: "227", label: "Kosten für Verpackung und Transport", hint: "Für E-Commerce relevant: Versandmaterial, Paketdienst.", star: true },
      { z: 54, kz: "224", label: "Werbekosten (Inserate, Ads, Plakate)", hint: "Meta-/Google-/TikTok-Ads gehören hierhin.", star: true },
      { z: 56, kz: "234", label: "Übrige Schuldzinsen", hint: "Zinsen für Betriebskredite (nicht Anlagevermögen-Finanzierung, die ist Zeile 55)." },
      { z: 57, kz: "185", label: "Gezahlte und nach § 15 UStG abziehbare Vorsteuerbeträge", hint: "Die Vorsteuer auf deine Einkäufe ist in der EÜR eine Betriebsausgabe (Brutto-Methode).", star: true },
      { z: 58, kz: "186", label: "An das Finanzamt gezahlte (und ggf. verrechnete) Umsatzsteuer", hint: "Deine USt-Vorauszahlungen ans FA sind Betriebsausgabe.", star: true },
      { z: 60, kz: "183", label: "Übrige unbeschränkt abziehbare Betriebsausgaben" },
    ],
  },
  {
    nr: "2e",
    title: "Beschränkt abziehbare Betriebsausgaben (nur teilweise absetzbar)",
    rows: [
      { z: 62, kz: "164 / 174", label: "Geschenke", hint: "Nur bis 50 € pro Empfänger/Jahr abziehbar (Kz 174); darüber nicht (Kz 164)." },
      { z: 63, kz: "165 / 175", label: "Bewirtungsaufwendungen", hint: "Nur 70 % abziehbar (Kz 175), 30 % nicht (Kz 165). Vorsteuer aber voll.", star: true },
      { z: 64, kz: "171", label: "Verpflegungsmehraufwendungen", hint: "Pauschalen bei Geschäftsreisen (28 €/14 € Inland 2026)." },
      { z: 65, kz: "162 / 172", label: "Aufwendungen für ein häusliches Arbeitszimmer" },
      { z: 66, kz: "163", label: "Tagespauschale für Homeoffice", hint: "6 €/Tag, max. 1.260 €/Jahr (Homeoffice-Pauschale)." },
    ],
  },
  {
    nr: "2f",
    title: "Kfz-Kosten und andere Fahrtkosten",
    rows: [
      { z: 68, kz: "144", label: "Leasingkosten (Kfz)" },
      { z: 69, kz: "145", label: "Steuern, Versicherungen und Maut (Kfz)" },
      { z: 70, kz: "146", label: "Sonstige tatsächliche Fahrtkosten (Reparatur, Wartung, Treibstoff, ÖPNV)", star: true },
      { z: 72, kz: "142", label: "− Fahrten Wohnung ↔ erste Betriebsstätte (pauschaliert/tatsächlich)" },
      { z: 73, kz: "176", label: "+ Mindestens abziehbare Entfernungspauschale", hint: "Korrektur, damit mindestens die Pendlerpauschale ankommt." },
      { z: 75, kz: "199", label: "= Summe Betriebsausgaben (Übertrag in Zeile 77)", star: true },
    ],
  },
  {
    nr: "3",
    title: "Ermittlung des Gewinns",
    rows: [
      { z: 76, kz: "—", label: "Summe der Betriebseinnahmen (Übertrag aus Zeile 23)" },
      { z: 77, kz: "—", label: "− abzüglich Summe der Betriebsausgaben (Übertrag aus Zeile 75)", star: true },
      { z: 87, kz: "123", label: "+ Gewinnzuschlag (§ 6c i. V. m. § 6b Abs. 7/10 EStG)" },
      { z: 88, kz: "187", label: "− Investitionsabzugsbeträge (§ 7g Abs. 1 EStG)", hint: "IAB mindert den Gewinn vorab — siehe IAB-Rechner.", star: true },
      { z: 97, kz: "219", label: "= Steuerpflichtiger Gewinn / Verlust", hint: "Das Endergebnis. Wandert in deine ESt-Erklärung (Anlage S/G).", star: true },
    ],
  },
  {
    nr: "5",
    title: "Zusätzliche Angaben bei Einzelunternehmen",
    rows: [
      { z: 106, kz: "122", label: "Entnahmen (inkl. Sach-, Leistungs- und Nutzungsentnahmen)", hint: "Für die Schuldzinsen-Prüfung nach § 4 Abs. 4a EStG (Überentnahmen)." },
      { z: 107, kz: "123", label: "Einlagen (inkl. Sach-, Leistungs- und Nutzungseinlagen)" },
    ],
  },
];

const AnlageEuer = () => {
  const [einnahmen, setEinnahmen] = useState(0);
  const [ausgaben, setAusgaben] = useState(0);
  const gewinn = useMemo(() => einnahmen - ausgaben, [einnahmen, ausgaben]);
  const track = useTrackToolEvent("anlage-euer");

  return (
    <CockpitShell
      eyebrow="Anlage EÜR · Jahres-Gewinnermittlung"
      title="Anlage EÜR (Einnahmenüberschussrechnung) Schritt für Schritt"
      subtitle="Was gehört in welche Zeile? Walkthrough des echten ELSTER-Vordrucks (Anlage EÜR nach § 4 Abs. 3 EStG, Stand Vordruckmuster 2025) mit den Zeilen, die für Solo-Selbstständige & E-Commerce zählen. Du füllst in ELSTER aus, diese Seite erklärt parallel."
    >
      <ToolLayout
        inputs={
          <ToolSection title="Wer muss die EÜR abgeben, und wann?" icon={CalendarClock}>
            <dl className="space-y-3 text-sm leading-relaxed">
              {[
                ["Wer", "Alle, die ihren Gewinn per Einnahmenüberschussrechnung ermitteln: Freiberufler und Gewerbetreibende, die nicht bilanzieren müssen (Umsatz ≤ 800.000 € und Gewinn ≤ 80.000 €, § 141 AO)."],
                ["Wie viele", "Pro Betrieb eine eigene Anlage EÜR. Mehrere Betriebe = mehrere Formulare."],
                ["Wann", "Einmal jährlich mit der Einkommensteuererklärung. Frist regulär 31. Juli des Folgejahres (mit Steuerberater später)."],
                ["Wie", "Nur elektronisch authentifiziert über ELSTER (§ 60 Abs. 4 EStDV). Papier nur in Härtefällen auf Antrag."],
              ].map(([k, v]) => (
                <div key={k} className="grid gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
                  <dt className="font-semibold text-foreground">{k}</dt>
                  <dd className="text-foreground/80">{v}</dd>
                </div>
              ))}
            </dl>
            <Callout tone="info" title="Brutto-Methode" className="mt-5">
              In der EÜR ist die vereinnahmte USt eine Einnahme (Zeile 17) und die gezahlte Vorsteuer/USt eine Ausgabe (Zeilen 57/58).
              Kleinunternehmer rechnen dagegen rein mit Brutto-Beträgen ohne USt-Zeilen.
            </Callout>
          </ToolSection>
        }
        result={
          <ResultPanel
            kicker="Mini-Check"
            title="Dein Überschuss (Zeile 97)"
            value={<span className={gewinn < 0 ? "text-danger" : ""}>{gewinn.toLocaleString("de-DE")} €</span>}
            valueHint="Zeile 23 minus Zeile 75. Ersetzt nicht das ELSTER-Formular, gibt dir aber sofort die Hausnummer."
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Betriebseinnahmen (Zeile 23, €)" htmlFor="euer-einnahmen">
                <Input
                  id="euer-einnahmen"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  value={einnahmen || ""}
                  onChange={(e) => {
                    setEinnahmen(Math.max(0, Number(e.target.value) || 0));
                    track("gewinn_calc");
                  }}
                  placeholder="z. B. 80000"
                />
              </Field>
              <Field label="Betriebsausgaben (Zeile 75, €)" htmlFor="euer-ausgaben">
                <Input
                  id="euer-ausgaben"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  value={ausgaben || ""}
                  onChange={(e) => {
                    setAusgaben(Math.max(0, Number(e.target.value) || 0));
                    track("gewinn_calc");
                  }}
                  placeholder="z. B. 30000"
                />
              </Field>
            </div>
          </ResultPanel>
        }
      />

      {/* Zeilen-Walkthrough */}
      <div className="mt-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight">Zeile für Zeile durch den Vordruck</h2>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 text-warning" fill="currentColor" aria-hidden="true" /> häufig für Solo-Selbstständige und E-Commerce
          </p>
        </div>
        <div className="space-y-4">
          {BLOCKS.map((b) => (
            <ToolSection
              key={b.nr}
              title={
                <span className="flex items-baseline gap-2.5">
                  <span className="text-sm font-semibold text-accent-blue tabular">{b.nr}</span>
                  {b.title.replace(" — ", ": ")}
                </span>
              }
              bodyClassName="p-0"
            >
              <ul className="divide-y divide-border/70">
                {b.rows.map((r) => (
                  <li key={`${b.nr}-${r.z}`} className="flex items-start gap-3 px-5 py-3 md:px-6">
                    <div className="flex w-[5.5rem] shrink-0 flex-col items-start gap-1 sm:w-auto sm:flex-row sm:items-center">
                      <span className="w-10 text-xs text-muted-foreground tabular">Z {r.z}</span>
                      <span className="inline-flex w-[4.25rem] justify-center rounded-md bg-secondary px-1.5 py-0.5 text-xs font-semibold tabular">Kz {r.kz}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start gap-1.5 text-sm font-medium">
                        <span>{r.label}</span>
                        {r.star && <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" fill="currentColor" aria-label="häufig für Solo/E-Com" />}
                      </div>
                      {r.hint && <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{r.hint}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            </ToolSection>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Callout tone="success" title="Anlage AVEÜR nicht vergessen">
          Wenn du Anlagevermögen hast (Laptop, Maschinen, Software über 800 € …), gehört die <strong>Anlage AVEÜR</strong>{" "}
          (Anlageverzeichnis) zwingend dazu, denn die AfA-Zeilen 31 bis 38 ziehen ihre Werte von dort. Außerdem: Schuldzinsen über
          2.050 € erfordern bei Einzelunternehmen die <strong>Anlage SZ</strong> (§ 4 Abs. 4a EStG, Überentnahmen).
        </Callout>
        <ToolSection title="Passt dazu" bodyClassName="p-0">
          <ul className="divide-y divide-border/70 text-sm">
            {[
              ["/cockpit/ust-voranmeldung", "USt-Voranmeldung-Walkthrough", "die unterjährige Meldung"],
              ["/cockpit/abschreibung", "Abschreibungs-Rechner", "AfA, GWG, Sammelposten (Zeilen 33/36/37)"],
              ["/cockpit/iab-rechner", "IAB-Rechner", "§ 7g, Zeile 88"],
              ["/cockpit/kfz-optimizer", "Kfz-Optimizer", "1 %-Regel vs. Fahrtenbuch (Zeilen 20/68 bis 73)"],
              ["/cockpit/buchhaltungssoftware-guide", "Buchhaltungssoftware-Guide", "EÜR auf Knopfdruck per Lexware/sevDesk"],
            ].map(([to, t, d]) => (
              <li key={to}>
                <Link to={to} className="group flex items-center justify-between gap-3 px-5 py-3 hover:bg-secondary/40 md:px-6">
                  <span>
                    <span className="font-medium text-foreground group-hover:text-accent-blue">{t}</span>
                    <span className="block text-xs text-muted-foreground">{d}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </ToolSection>
      </div>

      <Stand2026Footer
        sources={[
          { label: "BMF: Anlage EÜR 2025 — Vordruckmuster (29.08.2025)", url: "https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Steuerarten/Einkommensteuer/2025-08-29-anlage-EUER-2025.html" },
          { label: "§ 4 Abs. 3 EStG (Einnahmenüberschussrechnung)", url: "https://www.gesetze-im-internet.de/estg/__4.html" },
          { label: "§ 60 Abs. 4 EStDV (elektronische Übermittlungspflicht)", url: "https://www.gesetze-im-internet.de/estdv_1955/__60.html" },
          { label: "ELSTER: Anlage EÜR", url: "https://www.elster.de/eportal/formulare-leistungen/alleformulare/euer" },
        ]}
        note="Zeilen + Kennzahlen 1:1 aus dem amtlichen BMF-Vordruckmuster Anlage EÜR 2025 (2025AnlEÜR801–804). Bilanzierungspflicht ab Umsatz > 800.000 € oder Gewinn > 80.000 € (§ 141 AO) — dann statt EÜR eine Bilanz. Keine Steuerberatung — im Zweifel StB/Finanzamt."
      />
    </CockpitShell>
  );
};

export default AnlageEuer;
