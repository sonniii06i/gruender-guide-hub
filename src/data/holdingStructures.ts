import type { LucideIcon } from "lucide-react";
import { Building2, Users, Heart, Layers, TrendingUp, Lightbulb, PiggyBank } from "lucide-react";

export type HoldingStructure = {
  slug: string;
  name: string;
  shortName: string;
  emoji: string;
  icon: LucideIcon;
  tagline: string;
  /** Diagramm in ASCII oder Mermaid-flowchart-syntax. */
  diagram: string;
  /** Wann diese Struktur sinnvoll ist. */
  bestFor: string[];
  /** Konkrete echte Beispiele aus DE-Wirtschaft. */
  realWorldExamples: string[];
  /** Vorteile (steuerlich + strategisch). */
  pros: string[];
  /** Nachteile + Sperrfristen + Fallstricke. */
  cons: string[];
  /** Setup-Kosten einmalig (€). */
  setupCost: string;
  /** Laufende Kosten/Jahr (€). */
  runningCost: string;
  /** Min. Gewinn ab dem es sich lohnt. */
  worthwhileFrom: string;
  /** Steuer-Effekt: was es real bringt. */
  taxImpact: string;
  /** Rechtlicher Rahmen (Paragraphen). */
  legalBasis: string[];
  /** Kritische Fristen / Sperrfristen. */
  lockUpPeriods?: string[];
  /** Empfohlene Schritte zum Aufbau. */
  setupSteps: string[];
  /** Verlinkung zu Playbook falls vorhanden. */
  playbookSlug?: string;
  /** Konkrete Steuer-Szenarien (100k / 500k / 2M Op-Gewinn). */
  taxScenarios?: TaxScenario[];
  /** Typische Fehler die User mit dieser Struktur machen. */
  pitfalls?: string[];
  /** Migrations-Pfad: wann von dieser Struktur in eine andere wechseln. */
  migrationPath?: string;
  /** Internationale Erweiterungs-Aspekte. */
  intlConsiderations?: string;
};

export type TaxScenario = {
  /** Szenario-Label (z.B. "100k Op-Gewinn, alles thesauriert"). */
  label: string;
  opGewinn: number;
  /** Berechnete Endsumme an Steuern. */
  totalSteuer: number;
  /** Was Privatperson am Ende netto hat. */
  privatNetto: number;
  /** Effektive Gesamt-Steuer in %. */
  effektivPct: number;
  /** Erklärung der Berechnung. */
  breakdown: string[];
  /** Vergleich gegen "ohne Holding" (Einzelunternehmen). */
  vsEinzel?: string;
};

export const HOLDING_STRUCTURES: HoldingStructure[] = [
  // ============================================================
  // 1) Standard 2-Stufen-Holding
  // ============================================================
  {
    slug: "standard-2-stufen",
    name: "Standard 2-Stufen-Holding",
    shortName: "2-Stufen",
    emoji: "🏛️",
    icon: Building2,
    tagline: "Der Klassiker — 95 % Steuerbefreiung auf Ausschüttungen + Exit-Vorteil",
    diagram: `
   👤 Privatperson
      │ 100 %
      ▼
   🏛️ Holding GmbH  (Vermögensverwaltung)
      │ 100 %
      ▼
   🏭 Operative GmbH  (Geschäft, Umsatz, Mitarbeiter)
    `.trim(),
    bestFor: [
      "Solo-Gründer ohne Investoren mit ≥ 100 k €/Jahr Gewinn",
      "Klassischer E-Commerce / SaaS / Agentur",
      "Geplanter Exit in 3–7 Jahren",
      "Wer Gewinne lieber thesauriert als ausschüttet",
    ],
    realWorldExamples: [
      "Liqui Moly (Würth-Familie) — Holding-Konstrukt mit operativen Gesellschaften",
      "Maritim Hotels — Familien-Pool über Holding",
      "viele Internet-Brands wie Bavarian Industry Capital, Razor Group (Mid-Market-D2C)",
      "Standard-Setup bei vermögensverwaltenden Family Offices",
    ],
    pros: [
      "**Schachtelprivileg §8b KStG**: 95 % Steuerbefreiung auf Dividenden von Tochter-GmbHs (5 % gelten als nicht-abzugsfähige BA) → effektive Steuer ~1,5 %",
      "**Exit-Vorteil**: Beim Verkauf der operativen GmbH durch die Holding sind 95 % steuerfrei (nur 5 % als BA-Hinzurechnung)",
      "Trennung von operativem Risiko (Op-GmbH haftet) und Vermögen (Holding sicher)",
      "Investitionen aus Holding (ETF-Depot, Immobilien, weitere Beteiligungen)",
      "Bei späterer Investoren-Aufnahme: nur Op-GmbH-Anteile abgeben, Holding bleibt 100 % deine",
    ],
    cons: [
      "**7-Jahres-Sperrfrist nach §22 UmwStG** wenn bestehende GmbH eingebracht wird — vor Ablauf Verkauf = rückwirkende Versteuerung der stillen Reserven",
      "Doppel-Buchhaltung (2 separate Jahresabschlüsse)",
      "Notar-Kosten + StB-Kosten sind ~doppelt",
      "Bei kleinen Gewinnen (< 50 k €/Jahr) zahlt sich Setup-Kosten nicht aus",
      "Holding kann nicht im Musterprotokoll gegründet werden (Individualsatzung Pflicht für komplexe Strukturen)",
    ],
    setupCost: "1.500–2.500 € Notar + 25.000 € Holding-Stammkapital (selbst nutzbar)",
    runningCost: "1.500–3.000 €/Jahr StB für Konzern-Buchhaltung + 250 € HR-Gebühr",
    worthwhileFrom: "100.000 € Jahresgewinn (operative GmbH) — drunter sind Setup-Kosten höher als Steuer-Ersparnis",
    taxImpact: "Auf Ausschüttungen: ~1,5 % statt ~30 % (KSt+GewSt+SoliZ). Bei Exit: 5 % statt ~25 % AbgSt. Bei 1 Mio Verkaufserlös: 50 k € Steuer statt 250 k €.",
    legalBasis: [
      "§8b KStG (Schachtelprivileg)",
      "§22 UmwStG (Sperrfrist bei Anteilseinbringung)",
      "§17 EStG (Beteiligung > 1 % — Veräußerungsgewinn)",
    ],
    lockUpPeriods: [
      "**7 Jahre Sperrfrist** ab Einbringung bestehender GmbH-Anteile (§22 UmwStG): vorzeitiger Verkauf führt zu rückwirkender Versteuerung",
      "Mindestbeteiligung 10 % im Vorjahr für Schachtelprivileg (§8b Abs 4 KStG)",
    ],
    setupSteps: [
      "1. Holding GmbH neu gründen (oder bestehende GmbH umbenennen + Anteile an neue Holding einbringen)",
      "2. Op-GmbH gründen (oder bestehende einbringen)",
      "3. Bei Anteilseinbringung: §21 UmwStG steuerneutral — aber 7-Jahres-Sperrfrist beachten",
      "4. Erste Ausschüttung von Op-GmbH an Holding (Schachtelprivileg greift)",
      "5. Investitions-Strategie für Holding-Vermögen (ETFs, Immobilien, weitere Beteiligungen)",
    ],
    playbookSlug: "holding",
    taxScenarios: [
      {
        label: "100 k Gewinn · alles thesauriert in Holding",
        opGewinn: 100000,
        totalSteuer: 31125,
        privatNetto: 68875,
        effektivPct: 31.1,
        breakdown: [
          "Op-GmbH: 100.000 € × 30 % KSt+GewSt = 30.000 € Steuer · 70.000 € verbleibender Gewinn",
          "Ausschüttung an Holding: 70.000 € · 5 % steuerpflichtig = 3.500 € · davon ~30 % = 1.125 € Steuer",
          "Holding-Netto: 68.875 € (für Re-Invest, ETF, Immobilien)",
          "Bei späterer Privat-Entnahme weitere ~26,375 % AbgSt fällig",
        ],
        vsEinzel: "Einzelunternehmen 100 k Gewinn: ~32 k € ESt+SoliZ+GewSt = 68 k Netto. Praktisch identisch — Holding bringt hier nur Vorteile bei Reinvest oder Exit.",
      },
      {
        label: "500 k Gewinn · halbiertes Verhältnis (250 k privat, 250 k Reinvest)",
        opGewinn: 500000,
        totalSteuer: 215938,
        privatNetto: 284062,
        effektivPct: 43.2,
        breakdown: [
          "Op-GmbH: 500.000 € × 30 % = 150.000 € KSt+GewSt · 350.000 € verbleibend",
          "Ausschüttung an Holding: 350.000 € · 5 % steuerpflichtig = 17.500 € × 30 % = 5.250 € Steuer",
          "Holding-Netto: 344.750 € — davon 250 k privat entnehmen via AbgSt",
          "AbgSt auf 250.000 €: ~26,375 % SoliZ inkl = 65.938 € Steuer · 184.062 € privat netto",
          "Holding behält 94.750 € für Reinvest (z.B. ETF, Immobilien — fortan 1,5 % effektiv besteuert)",
          "Total: 150 k + 5,25 k + 65,94 k = 221,2 k Steuer · privat netto 184 k + Holding 94,75 k = 278,8 k",
        ],
        vsEinzel: "Einzelunternehmen 500 k Gewinn: ~210 k € ESt-Spitze (42 % auf > 277 k). Nicht thesaurierbar — alles wird privat besteuert. Holding ermöglicht Reinvest mit 1,5 % statt 26 %.",
      },
      {
        label: "2 Mio Exit-Erlös aus Op-GmbH-Verkauf",
        opGewinn: 2000000,
        totalSteuer: 30000,
        privatNetto: 1970000,
        effektivPct: 1.5,
        breakdown: [
          "Holding verkauft Op-GmbH für 2.000.000 €",
          "§8b KStG: 95 % steuerfrei · 5 % nicht-abzugsfähige BA = 100.000 € steuerpflichtig",
          "100.000 € × 30 % KSt+GewSt = 30.000 € Steuer",
          "Holding-Netto: 1.970.000 € (kann komplett reinvestiert werden)",
        ],
        vsEinzel: "Privat-Verkauf einer GmbH > 1 % Beteiligung: §17 EStG mit Teileinkünfteverfahren · 60 % steuerpflichtig × ~42 % ESt = 504.000 € Steuer. Mit Holding nur 30 k = 474 k € Ersparnis pro 2 Mio Exit.",
      },
    ],
    pitfalls: [
      "**§22 UmwStG-Sperrfrist nicht beachtet:** Op-GmbH wird in Holding eingebracht, dann 4 Jahre später verkauft → rückwirkende Versteuerung der stillen Reserven mit ~30 %. Klassischer 7-stelliger Fehler.",
      "**Schachtelprivileg-Voraussetzung verfehlt:** Bei Beteiligung < 10 % im Vorjahr greift §8b KStG NICHT — Mindestbeteiligung in laufendem Jahr reicht nicht.",
      "**vGA (verdeckte Gewinnausschüttung) durch Auto/Privatkosten:** GF nutzt Op-GmbH-Auto privat ohne 1 %-Regel zu versteuern → Finanzamt qualifiziert als vGA → Doppel-Besteuerung.",
      "**Holding ohne Substanz:** reine Mailbox-Holding ohne Geschäftsleitung → BMF kann durchschauen und versagen Schachtelprivileg.",
      "**StB-Wahl falsch:** Standard-StB ohne Konzern-Erfahrung macht Fehler in Konsolidierung. Ab 250 k Op-Gewinn: Konzern-erfahrenen StB wählen.",
    ],
    migrationPath: "Aus diesem Setup wechselt man typisch in: (a) **3-Stufen-Holding** wenn weitere Brands dazu kommen, (b) **Familienstiftung** wenn Vermögen > 5 Mio + Generations-Planung, (c) **Familien-Pool** wenn Kinder beteiligt werden sollen vor Erbgang.",
    intlConsiderations: "Bei US-/HK-Töchtern: DBA-Anrechnung, ggf. CFC/Hinzurechnungsbesteuerung §7-14 AStG bei passiven Einkünften. Bei EU-Töchtern (NL/IE): Mutter-Tochter-Richtlinie greift, Quellensteuer 0 %. ATAD-Richtlinie EU-weit umgesetzt seit 2019 — keine reine Steuer-Vermeidungs-Strukturen mehr.",
  },

  // ============================================================
  // 2) Familien-Pool-Holding
  // ============================================================
  {
    slug: "familien-pool",
    name: "Familien-Pool-Holding",
    shortName: "Familien-Pool",
    emoji: "👨‍👩‍👧",
    icon: Users,
    tagline: "Erbschaftssteuer-Optimierung durch Pool aller Familienmitglieder",
    diagram: `
   👨‍👩‍👧 Familie (Eltern + Kinder, mehrere Anteile)
        │
        ▼
   🏛️ Familien-Holding GmbH
        │ 100 %
        ▼
   🏭 Operative GmbH
    `.trim(),
    bestFor: [
      "Familien-Unternehmen mit mehreren Generationen",
      "Geplante Erbschaftsregelung in 5–10 Jahren",
      "Vermögen > 1 Mio €",
      "Eltern wollen Anteile schrittweise auf Kinder übertragen ohne sofortige Schenkungsteuer",
    ],
    realWorldExamples: [
      "Maritim Hotels (Familie Eckert)",
      "Würth-Gruppe (Reinhold Würth + Familie über Holding)",
      "Henkel (Familien-Aktionärspool seit 1985)",
      "viele Mittelstands-Familien-Unternehmen",
    ],
    pros: [
      "**§13a ErbStG** Verschonungsabschlag: bis zu 100 % Steuerfreiheit bei Übertragung von Betriebsvermögen (Vollverschonung) bei 7-jähriger Behaltensfrist",
      "Schenkung in 10-Jahres-Tranchen: 400 k € pro Kind alle 10 Jahre steuerfrei (§16 ErbStG)",
      "Familien-Pool koordiniert Stimmrechte → keine Zersplitterung",
      "Pool-Vertrag bindet Anteile (Veräußerungsverbot, Andienungspflicht)",
    ],
    cons: [
      "**Behaltensfrist 5 oder 7 Jahre** bei §13a ErbStG-Vollverschonung — Verstoß = Nachversteuerung anteilig",
      "**Lohnsummen-Klausel**: 400 % der Ausgangslohnsumme über 5 Jahre erhalten (sonst Verschonung weg)",
      "Pool-Vertrag muss notariell sein (~1.500–3.000 €)",
      "Komplex bei Familien-Konflikten (Scheidung, Pflichtteilansprüche)",
      "Bei Pflichtteilsstreit: gepoolte Anteile können in den Nachlass fallen",
    ],
    setupCost: "3.000–6.000 € (Holding-Notar + Pool-Vertrag + Anwaltsberatung)",
    runningCost: "1.500–3.000 €/Jahr StB + ggf. Pool-Verwaltungskosten",
    worthwhileFrom: "Vermögen > 1 Mio € ODER mehrere Erben",
    taxImpact: "Schenkungssteuer-Reduktion bis 100 % bei Vollverschonung. Beispiel: 5 Mio Betriebsvermögen → 0 € Steuer statt ~1 Mio (sonst).",
    legalBasis: [
      "§13a ErbStG (Verschonungsabschlag Betriebsvermögen)",
      "§13b ErbStG (begünstigtes Vermögen)",
      "§16 ErbStG (persönlicher Freibetrag)",
      "§§ 705 ff BGB (Pool-Vertrag als GbR)",
    ],
    lockUpPeriods: [
      "**Behaltensfrist 5 Jahre** (Regel-Verschonung 85 %) oder **7 Jahre** (Voll-Verschonung 100 %)",
      "Lohnsummen-Erhalt 400 % bzw. 700 %",
    ],
    setupSteps: [
      "1. Holding-GmbH gründen (siehe Standard-2-Stufen)",
      "2. Pool-Vertrag aller Familienmitglieder notariell beurkunden lassen",
      "3. Schenkungs-Plan erstellen (10-Jahres-Tranchen)",
      "4. Bewertung des Betriebsvermögens (Substanzwert / Ertragswert) beim Steuerberater",
      "5. Erste Schenkung mit ggf. §13a-Antrag beim Finanzamt",
    ],
    taxScenarios: [
      {
        label: "5 Mio Betriebsvermögen · Schenkung an 2 Kinder · Voll-Verschonung",
        opGewinn: 5000000,
        totalSteuer: 0,
        privatNetto: 5000000,
        effektivPct: 0,
        breakdown: [
          "Übertragung von 5 Mio Betriebsvermögen via §13a Abs 10 ErbStG (Vollverschonung)",
          "Voraussetzung: 7 Jahre Behaltensfrist + 700 % Lohnsumme über 7 Jahre erhalten",
          "Persönlicher Freibetrag pro Kind: 400.000 € (§16 ErbStG)",
          "Bei eingehaltenen Bedingungen: 0 € Schenkungssteuer",
        ],
        vsEinzel: "Ohne Verschonung: 5 Mio - 800 k Freibeträge = 4,2 Mio steuerpflichtig × Steuersatz Klasse I (~23 %) = ~966 k Schenkungssteuer.",
      },
    ],
    pitfalls: [
      "**Lohnsummen-Klausel verfehlt:** in 7 Jahren weniger als 700 % der Ausgangslohnsumme erreicht (z.B. wegen Mitarbeiter-Abbau in Krise) → anteilige Nachversteuerung der Verschonung.",
      "**Behaltensfrist gebrochen:** Anteile innerhalb 7 Jahren verkauft, übertragen oder Kapitalerhöhung gemacht → Nachversteuerung pro rata.",
      "**Bewertung zu niedrig:** Finanzamt bewertet Betriebsvermögen höher (Ertragswert vs. Substanzwert) → unerwartete Steuer-Nachforderung.",
      "**Pool-Vertrag formfehlerhaft:** unwirksam ohne notarielle Beurkundung → Anteile fallen in Nachlass + Pflichtteil greift.",
      "**Familienverwerfungen:** Bei Streit kann Pool-Vertrag schwer aufzulösen sein. Ausstiegsklauseln wichtig.",
    ],
    migrationPath: "Aus Familien-Pool wechselt man oft in **Familienstiftung**, wenn Vermögen > 10 Mio und Pflichtteilsschutz wichtiger wird, oder bei Generations-Wechsel (Kinder erwachsen).",
    intlConsiderations: "Bei Auswanderung eines Pool-Mitglieds in Nicht-EU-Staat: §6 AStG Wegzugsbesteuerung möglich (Anteile gelten als verkauft). Bei EU-Wegzug 2025+: nur noch Stundung möglich (kein Verzicht mehr seit ATAD).",
  },

  // ============================================================
  // 3) Familienstiftung-Konstrukt
  // ============================================================
  {
    slug: "familienstiftung",
    name: "Familienstiftung + Holding",
    shortName: "Stiftung",
    emoji: "🏛️",
    icon: Heart,
    tagline: "Generationen-Vermögenssicherung — Stiftung als Eigentümerin",
    diagram: `
   📜 Familienstiftung (rechtsfähig)
        │ 100 %
        ▼
   🏛️ Holding GmbH
        │ 100 %
        ▼
   🏭 Operative GmbH
    `.trim(),
    bestFor: [
      "Vermögen > 5 Mio €",
      "Generation überdauerndes Vermögen (Stiftung 'lebt' ewig)",
      "Schutz vor Pflichtteilansprüchen + Scheidungs-Aufteilung",
      "Streit-Vermeidung bei mehreren Erbberechtigten",
    ],
    realWorldExamples: [
      "Aldi Süd / Nord (Karl-Albrecht-Stiftung + Theo-Albrecht-Stiftung)",
      "Robert Bosch Stiftung",
      "Würth-Stiftung",
      "Lidl/Schwarz-Gruppe (Dieter Schwarz-Stiftung)",
      "Trigema (Wolfgang Grupp — Stiftung in Vorbereitung)",
    ],
    pros: [
      "**Vermögen ist 'eingefroren' in der Stiftung** — keine Privat-Pfändung, kein Pflichtteil, kein Scheidungs-Zugewinn",
      "Stiftung lebt ewig (auch nach Tod der Gründer)",
      "Stiftungszweck dauerhaft gewahrt (z.B. 'Wahrung des Familienunternehmens')",
      "Steuerlich gleich wie Holding (Schachtelprivileg) auf Beteiligungserträge",
      "Mit Wirtschaftspatent / Familien-Verfassung kombinierbar",
    ],
    cons: [
      "**Erbersatzsteuer alle 30 Jahre** (§§ 1 Abs 1 Nr 4 ErbStG) — fingierter Erbfall, ~30 % auf Stiftungsvermögen",
      "Stiftungsvermögen ist NICHT mehr 'meins' — Vorstand entscheidet",
      "Setup sehr aufwändig: Stiftungssatzung, Gründungs-Vermögen mind. 50–100 k €, ggf. Notar + Steueranwalt",
      "Genehmigungspflicht durch Stiftungsbehörde des Bundeslands",
      "Auflösung extrem schwer (nur durch Stiftungsbehörde)",
    ],
    setupCost: "10.000–30.000 € (Notar + Stiftungsanwalt + Stiftungsbehörde-Verfahren)",
    runningCost: "5.000–15.000 €/Jahr (Stiftungs-Verwaltung + StB + ggf. Vorstands-Vergütung)",
    worthwhileFrom: "Vermögen > 5 Mio € + Generationen-Planung",
    taxImpact: "Schachtelprivileg gleich wie Holding. ABER: Erbersatzsteuer alle 30 Jahre = einmaliger Vermögens-Hit. Pflichtteilsschutz wertvoll: keine Pflichtteilsstreite mehr in der Familie.",
    legalBasis: [
      "§§ 80 ff BGB (rechtsfähige Stiftung)",
      "§1 Abs 1 Nr 4 ErbStG (Erbersatzsteuer)",
      "§8b KStG (Schachtelprivileg auch für Stiftungen)",
      "Landesstiftungsgesetze (Genehmigung)",
    ],
    lockUpPeriods: [
      "**Vermögen unwiderruflich** — kann nur via Stiftungsbehörde rückübertragen werden",
      "Erbersatzsteuer alle 30 Jahre",
    ],
    setupSteps: [
      "1. Steueranwalt + Stiftungsexperte konsultieren (Steuer-Notar)",
      "2. Stiftungssatzung erarbeiten (Zweck, Vorstand, Begünstigte, Auflösungsregeln)",
      "3. Gründungs-Vermögen festlegen + bereitstellen (mind. 50 k €, realistisch 100 k €+)",
      "4. Antrag auf Anerkennung bei Stiftungsbehörde (Landes-Innenministerium)",
      "5. Nach Anerkennung: Übertragung der GmbH-Anteile auf Stiftung",
    ],
  },

  // ============================================================
  // 4) 3-Stufen-Holding (Multi-Brand)
  // ============================================================
  {
    slug: "3-stufen-multi-brand",
    name: "3-Stufen-Holding (Multi-Brand)",
    shortName: "3-Stufen",
    emoji: "🏢",
    icon: Layers,
    tagline: "Mehrere Brands / Geschäftsfelder unter einem Dach",
    diagram: `
   👤 Privatperson
        │
        ▼
   🏛️ Top-Holding GmbH
        ├──► Sub-Holding A ──► Op-GmbH 1 (Marke A)
        ├──► Sub-Holding B ──► Op-GmbH 2 (Marke B)
        └──► Sub-Holding C ──► Op-GmbH 3 (Marke C)
    `.trim(),
    bestFor: [
      "Multi-Brand-Aufbau (mehrere D2C-Brands parallel)",
      "Verschiedene Geschäftsfelder mit unterschiedlichem Risiko",
      "Geplante separate Exits pro Geschäftsfeld",
      "Investoren-Aufnahme nur in Sub-Bereich (z.B. nur 1 Brand verkaufen)",
    ],
    realWorldExamples: [
      "ProSiebenSat.1 Media (Holding → diverse Tochtergesellschaften)",
      "Bertelsmann (RTL Group, Penguin Random House etc. unter Bertelsmann-Holding)",
      "Burda (Hubert Burda Media → diverse Verlags-Töchter)",
      "Kaufland/Lidl-Gruppe (Schwarz-Gruppe → mehrere Vertriebslinien)",
      "Razor Group / Stryze (D2C-Aggregatoren, mehrere Brands)",
    ],
    pros: [
      "Risiko-Trennung pro Geschäftsfeld (Op-GmbH A insolvent → andere unbetroffen)",
      "Selektiver Exit möglich (nur Brand A verkaufen, B+C behalten)",
      "Investoren können in Sub-Bereich einsteigen ohne Top-Holding zu öffnen",
      "Cross-Verrechnung von Verlusten innerhalb Sub-Holding (über Organschaft möglich)",
      "Steuer-Optimierung wie 2-Stufen, plus zusätzliche Strukturierungs-Möglichkeiten",
    ],
    cons: [
      "Sehr aufwändig: 4–7 separate GmbHs zu führen + Buchhaltungen",
      "StB-Kosten skalieren linear mit Anzahl Gesellschaften (5 GmbHs = ~10 k €/Jahr StB)",
      "Komplexität in Konzernabschluss (HGB §290 ff bei Konzern-Pflicht)",
      "Ab Konzernpflicht (40 Mio € Bilanzsumme / 80 Mio € Umsatz / 250 Mitarbeiter): jährlicher Konzernabschluss + Wirtschaftsprüfer",
    ],
    setupCost: "5.000–15.000 € pro zusätzlicher Sub-Holding (Notar + Eintrag)",
    runningCost: "10.000–25.000 €/Jahr StB + ggf. Wirtschaftsprüfung bei Konzernpflicht",
    worthwhileFrom: "≥ 2 echt eigenständige Geschäftsfelder + 500 k €/Jahr Gewinn pro Sub-Bereich",
    taxImpact: "Schachtelprivileg auf jeder Stufe. Plus: Organschaft (§14 KStG) zwischen Sub-Holding + Op-GmbH ermöglicht Verlustverrechnung im selben Geschäftsfeld.",
    legalBasis: [
      "§8b KStG (Schachtelprivileg auf jeder Stufe)",
      "§14 KStG (Organschaft für Verlust-Verrechnung)",
      "§§ 290 ff HGB (Konzernabschluss)",
    ],
    setupSteps: [
      "1. Top-Holding gründen",
      "2. Pro Geschäftsfeld eine Sub-Holding gründen + Top-Holding als 100 % Gesellschafter eintragen",
      "3. Pro Sub-Holding eine Op-GmbH gründen",
      "4. Optional: Organschafts-Vertrag zwischen Sub-Holding + Op-GmbH (5 Jahre Mindestlaufzeit)",
      "5. Konzern-Buchhaltung mit Konsolidierung einrichten",
    ],
  },

  // ============================================================
  // 5) Doppel-Holding mit Investor (Vesting)
  // ============================================================
  {
    slug: "doppel-holding-investor",
    name: "Doppel-Holding mit Investor",
    shortName: "Founder-Holding + Investor",
    emoji: "📈",
    icon: TrendingUp,
    tagline: "Founder + Investor jeweils mit eigener Holding für Op-Gesellschaft",
    diagram: `
   👤 Founder           👥 Investor
       │ 100 %               │ 100 %
       ▼                     ▼
   🏛️ Founder-Holding   🏛️ Investor-Holding
       │  60 %               │  40 %
       └──────►  🏭 Op-GmbH ◄──────┘
    `.trim(),
    bestFor: [
      "VC-finanzierte Startups",
      "Investoren-Aufnahme mit Founder-Schutz",
      "Geplanter Exit in 3–5 Jahren mit Steuer-Optimierung beider Seiten",
      "Co-Founder mit unterschiedlichen Anteilen wollen Gleichbehandlung beim Steuerprofil",
    ],
    realWorldExamples: [
      "Standard bei deutschen VC-Deals (HV Capital, Project A, Earlybird)",
      "Razor Group (D2C-Aggregator) — Founder-Holdings + Investor-Holdings",
      "Forto, sennder, Personio — alle haben Founder-Holdings für Steuer-Effizienz",
    ],
    pros: [
      "Founder + Investor profitieren jeweils vom Schachtelprivileg bei Exit",
      "Bei 1 Mio Founder-Exit-Erlös: ~50 k € Steuer (in Holding) statt ~250 k € (privat) — pro Founder",
      "Cap Table sauber: Op-GmbH hat nur 2 Gesellschafter (Founder-Holding + Investor-Holding)",
      "Founder kann Holding privat 'parken' und investieren ohne neue Privat-Steuer-Hits",
      "Vesting / Reverse Vesting auf Founder-Holding-Ebene möglich (nicht auf Op-GmbH-Ebene)",
    ],
    cons: [
      "Setup vor Investor-Term-Sheet wichtig (sonst hohe Steuer-Kosten bei Anteilseinbringung)",
      "**§22 UmwStG 7-Jahres-Sperrfrist** wenn Op-GmbH nach Setup eingebracht wird",
      "Notar-Kosten für 3 GmbHs (Founder-Holding + Investor-Holding + Op-GmbH) ~3.000–5.000 €",
      "Bei mehreren Foundern: jeder eigene Holding (sehr individuell)",
      "Komplex bei Investoren-Drag-Along (alle Holdings müssen mitziehen)",
    ],
    setupCost: "3.000–6.000 € (3 Notare + 3× Stammkapital, davon nur 25 k Founder-Holding 'gebunden')",
    runningCost: "3.000–6.000 €/Jahr StB für 3 Gesellschaften",
    worthwhileFrom: "VC-Runde > 500 k € geplant, oder Bewertung > 5 Mio €",
    taxImpact: "Bei Exit von 10 Mio (Op-GmbH-Verkauf): Founder-Anteil 6 Mio über Holding = 90 k € Steuer statt ~1,5 Mio privat. Pro Founder ~1,4 Mio gespart.",
    legalBasis: [
      "§8b KStG",
      "§22 UmwStG (Sperrfrist)",
      "§17 EStG (Beteiligung > 1 % wesentliche Beteiligung)",
    ],
    lockUpPeriods: [
      "7 Jahre Sperrfrist nach Anteilseinbringung",
      "Vesting-Klauseln im Beteiligungsvertrag (üblich 4 Jahre + 1 Jahr Cliff)",
    ],
    setupSteps: [
      "1. **VOR** Investoren-Term-Sheet: Founder-Holding gründen",
      "2. Op-GmbH-Anteile in Founder-Holding einbringen (steuerneutral §21 UmwStG)",
      "3. 7-Jahres-Sperrfrist startet ab Einbringung — bei vorherigem Exit Steuer-Hit",
      "4. Investor gründet eigene Investor-Holding und investiert von dort in Op-GmbH",
      "5. Beteiligungsvertrag inkl. Vesting / Drag-Along zwischen den Holdings",
    ],
  },

  // ============================================================
  // 6) GmbH & Co. KG mit Holding
  // ============================================================
  {
    slug: "gmbh-co-kg",
    name: "GmbH & Co. KG (Mittelstand-Klassiker)",
    shortName: "GmbH & Co. KG",
    emoji: "🏗️",
    icon: Building2,
    tagline: "Personengesellschaft + beschränkte Haftung — steuerlich transparent",
    diagram: `
   👤 Privatperson(en) als Kommanditisten
        │  Hafteinlage (begrenzt)
        ▼
   🤝 GmbH & Co. KG  (operatives Geschäft)
        │
        ▲
        │  Komplementär (unbeschränkt haftend, ohne Einlage)
   🏛️ Verwaltungs-GmbH (haftet 100 %, nimmt Geschäftsführung wahr)
    `.trim(),
    bestFor: [
      "Mittelstand mit Tradition (Familienunternehmen)",
      "Wenn keine 30 % KSt gewünscht (Personengesellschaft = transparent → individueller ESt-Satz)",
      "Geplante §6b EStG-Reinvestitionsrücklagen für Immobilien-/Anlage-Verkäufe",
      "Wenn Investoren-Eintritt noch nicht geplant ist",
    ],
    realWorldExamples: [
      "Bosch (Robert Bosch GmbH selbst — historisch GmbH & Co. KG)",
      "Stihl Holding GmbH & Co. KG",
      "Aldi Einkauf GmbH & Co. oHG (variant)",
      "viele Mittelständler in Maschinenbau, Lebensmittel, Handel",
    ],
    pros: [
      "Steuerlich transparent: Gewinn fließt direkt zu Kommanditisten → individueller ESt-Satz (kann günstiger sein als KSt+GewSt)",
      "**§6b EStG**: Reinvestitions-Rücklagen für Anlagevermögen-Verkäufe (Immobilien, Beteiligungen)",
      "Kommanditisten haften nur mit Einlage",
      "Komplementär-GmbH übernimmt unbeschränkte Haftung als juristische Person → faktisch beschränkt",
      "Buchführung-Pflichten teils einfacher als KapGes",
    ],
    cons: [
      "**KEIN Schachtelprivileg auf Beteiligungen** (nur in echter Holding-GmbH)",
      "**Gewerbesteuer voll** auf KG-Gewinn (Kommanditisten bekommen pauschal 4× Hebesatz angerechnet via §35 EStG, aber nur teilweise)",
      "Komplexere Bilanz-Strukturen (Sonderbilanzen, Ergänzungsbilanzen)",
      "Bei Investorenaufnahme oft Umwandlung in echte GmbH/AG nötig",
      "Geringere internationale Akzeptanz (US-/HK-Investoren verstehen GmbH besser)",
    ],
    setupCost: "1.500–3.000 € (Komplementär-GmbH + KG-Eintrag im HR Abt B)",
    runningCost: "1.500–3.000 €/Jahr StB für GmbH + KG getrennt",
    worthwhileFrom: "Eher etabliertes Geschäft mit stabilen Gewinnen, weniger für Tech-Startups",
    taxImpact: "Steuer-Höhe stark abhängig vom individuellen ESt-Satz: bei 42 % ESt + ~14 % GewSt-effektiv = ~56 %, bei 25 % ESt nur ~39 %. KapGes hätte ~30 %. Lohnt sich also bei niedriger persönlicher Progression.",
    legalBasis: [
      "§§ 161 ff HGB (Kommanditgesellschaft)",
      "§35 EStG (GewSt-Anrechnung)",
      "§6b EStG (Reinvestitionsrücklage)",
    ],
    setupSteps: [
      "1. Komplementär-GmbH gründen (sehr klein, oft 1 € Stammkapital UG)",
      "2. KG-Vertrag aufsetzen (Komplementär = Komplementär-GmbH, Kommanditisten = Privatpersonen)",
      "3. Eintragung im Handelsregister Abteilung A (KG)",
      "4. Hafteinlagen der Kommanditisten festlegen",
      "5. Geschäftsführungs-Vergütung der Komplementär-GmbH (für Haftungsübernahme)",
    ],
  },

  // ============================================================
  // 7) IP-/Patent-Holding
  // ============================================================
  {
    slug: "ip-holding",
    name: "IP-/Patent-Holding",
    shortName: "IP-Holding",
    emoji: "💡",
    icon: Lightbulb,
    tagline: "Marken / Patente / Software in separater Holding — Lizenzgebühren steuern",
    diagram: `
   👤 Privatperson
        │ 100 %
        ▼
   🏛️ IP-Holding GmbH (besitzt Marken, Patente, Software)
        │  Lizenz-Vertrag (z.B. 5–8 % Umsatz)
        ▼
   🏭 Op-GmbH (zahlt Lizenzgebühren als Aufwand)
    `.trim(),
    bestFor: [
      "Software-Startups mit großem Code-Schatz",
      "D2C-Brands mit eingetragenen Marken + viel Brand-Equity",
      "Patente / Erfindungen separat halten",
      "Geplante Internationalisierung (IP via Holding lizenziert an alle Töchter)",
    ],
    realWorldExamples: [
      "SAP (SAP Holding besitzt Software-IP, lizenziert an SAP SE)",
      "Adidas (Marken-Lizenzierung über Spezialgesellschaften)",
      "BMW (BMW IP GmbH — Marken + Patente separat)",
      "viele Software-Startups mit Mutter-Tochter-Struktur",
    ],
    pros: [
      "Lizenzgebühren reduzieren Op-GmbH-Gewinn (Steuer-Aufwand) und fließen in IP-Holding (kann thesaurieren oder ausschütten)",
      "Schutz von IP gegen Op-GmbH-Insolvenz (IP bleibt in Holding)",
      "Bei späterer Verkauf: IP getrennt verkaufbar (oft höher bewertet als reines Op-Geschäft)",
      "Funktioniert international: IP-Holding kann z.B. in Niederlande / Irland (Innovation Box) sitzen",
      "Schachtelprivileg bei Ausschüttungen wie Standard-Holding",
    ],
    cons: [
      "**Verrechnungspreise §1 AStG**: Lizenzgebühren müssen 'fremdüblich' sein (5–10 % Umsatz typisch). Zu hoch = BMF rechnet Differenz hinzu",
      "Seit 2008 **Lizenzschranke §4j EStG**: Lizenzzahlungen ins Ausland mit 'schädlichem Steuerregime' (< 25 %) nicht abziehbar",
      "In DE keine echte Patent-/Innovation-Box (anders als NL/IE/HU/UK)",
      "Aufwändige Dokumentation (Verrechnungspreis-Studien)",
      "Bei Steuer-Outside Schaden: Doppel-Besteuerung möglich",
    ],
    setupCost: "1.500–3.000 € + 3.000–8.000 € Verrechnungspreis-Studie (StB / Spezial-Anwalt)",
    runningCost: "2.000–5.000 €/Jahr StB + jährliche Aktualisierung der Verrechnungspreis-Doku",
    worthwhileFrom: "Lizenz-Volumen > 100 k €/Jahr (Software, Marken-Lizenzen)",
    taxImpact: "Verschiebung von Op-GmbH-Gewinn in IP-Holding. Bei 30 % KSt+GewSt: identisch. Aber Holding kann thesaurieren bei 1,5 % effektiver Ausschüttungs-Steuer für Eigentümer. Plus IP-Wertschutz bei Op-GmbH-Insolvenz.",
    legalBasis: [
      "§1 AStG (Verrechnungspreise)",
      "§4j EStG (Lizenzschranke)",
      "§8b KStG (Schachtelprivileg)",
      "OECD Transfer Pricing Guidelines",
    ],
    setupSteps: [
      "1. IP-Holding GmbH gründen",
      "2. IP-Inventur: alle Marken / Patente / Software / Domains / Know-how erfassen",
      "3. IP-Übertragung an Holding (steuerlich neutral via §21 UmwStG bei Einbringung)",
      "4. Lizenz-Vertrag mit Op-GmbH aufsetzen (Verrechnungspreis-Studie!)",
      "5. Quartalsweise / jährliche Lizenz-Abrechnung + Buchung",
    ],
  },

  // ============================================================
  // 8) Vermögensverwaltungs-Holding (Pure Holding)
  // ============================================================
  {
    slug: "vermoegensverwaltung",
    name: "Vermögensverwaltungs-Holding (Pure Holding)",
    shortName: "VV-Holding",
    emoji: "💰",
    icon: PiggyBank,
    tagline: "Reine Holding ohne operatives Geschäft — Aktien, Immobilien, ETFs",
    diagram: `
   👤 Privatperson
        │ 100 %
        ▼
   🏛️ VV-Holding GmbH
        ├──► ETF-Depot (Aktien, Anleihen, Rohstoffe)
        ├──► Immobilien (Objekte direkt oder via Tochter)
        └──► Beteiligungen (andere GmbHs ≥ 10 %)
    `.trim(),
    bestFor: [
      "Wer aus Op-GmbH ausgeschüttet hat und Vermögen langfristig anlegen will",
      "Privatvermögen > 500 k € das angelegt werden soll",
      "Immobilien-Investoren (Lex § 6b EStG)",
      "Wer von 30 % KSt+GewSt auf Beteiligungs-Erträge profitieren möchte",
    ],
    realWorldExamples: [
      "viele erfolgreiche Founder nach Exit (van Bibra, Mertin, Maschmeyer)",
      "Family Offices à la Quandt-Holding, Burda Vermögen",
      "Hedge-Fund-Manager-Holdings",
      "Standard-Setup nach D2C-Exit (Razor, Berlin Brands Group etc.)",
    ],
    pros: [
      "**Schachtelprivileg auch hier** auf Beteiligungs-Erträge (Tochter-GmbHs, Aktien-Pakete > 10 %)",
      "Immobilien-Erträge: nicht wie Op-GmbH gewerbesteuerlich gefangen (erweiterte Kürzung §9 Nr 1 GewStG bei reiner Vermögensverwaltung)",
      "ETFs / Aktien direkt halten: Dividenden + Kursgewinne gehen in Holding (1,5 % Effektiv-Steuer wenn ausgeschüttet)",
      "**Keine Holding-spezifische Sperrfristen** (nur §22 UmwStG bei Anteilseinbringung)",
      "Erbschaftssteuer-Optimierung wenn als Familienvermögen geplant",
    ],
    cons: [
      "Nicht GewSt-frei für aktiv gemanagte Aktien-Portfolios (BFH-Rechtsprechung — VV vs. gewerbliche Tätigkeit)",
      "Bei Immobilien-Vermietung: Grenze zwischen privat (§21 EStG) vs. gewerblich beachten",
      "Bei vielen Trades/Jahr ggf. gewerblicher Wertpapierhandel = volle GewSt",
      "Setup-Kosten 1.500–2.500 € + 25 k € Stammkapital binden",
      "Bei kleinem Vermögen (< 500 k €) zahlt sich Mehraufwand nicht aus",
    ],
    setupCost: "1.500–2.500 € Notar + 25.000 € Stammkapital (selbst nutzbar als Investment-Kapital)",
    runningCost: "1.500–2.500 €/Jahr StB",
    worthwhileFrom: "Vermögen > 500 k € + langfristige Anlage-Strategie",
    taxImpact: "Aktien-Dividenden in Holding: 5 % effektiv besteuert (95 % via §8b KStG befreit) statt 26,375 % AbgSt privat. Bei 100 k € Dividenden/Jahr: 1,5 k € statt 26,4 k € Steuer = 25 k € gespart/Jahr.",
    legalBasis: [
      "§8b KStG (Schachtelprivileg auf Tochter-GmbH-Beteiligungen)",
      "§9 Nr 1 GewStG (erweiterte Kürzung bei reiner Vermögensverwaltung)",
      "§17 EStG (wesentliche Beteiligung Privat — irrelevant in Holding)",
    ],
    setupSteps: [
      "1. VV-Holding GmbH gründen (Standard-2-Stufen-Setup)",
      "2. Ausschüttung von Op-GmbH in Holding leiten (1,5 % Effektiv-Steuer)",
      "3. Investitionsstrategie definieren (z.B. 60 % ETF, 30 % Immobilien, 10 % Beteiligungen)",
      "4. Bei Immobilien: Tochter-GmbH gründen oder direkt in Holding (steuerlich abwägen)",
      "5. Bei Aktien-Portfolio: Trading-Frequenz-Grenze beachten (Vermögensverwaltung vs. gewerblich)",
    ],
    playbookSlug: "holding",
  },
];

// Decision-Wizard Helper: empfohlene Strukturen basierend auf User-Antworten
export type WizardAnswers = {
  /** Gewinn pro Jahr in € (operative Gesellschaft). */
  jahresGewinn?: number;
  /** Bestehende GmbH oder neu? */
  hasExistingGmbH?: boolean;
  /** Hauptziel. */
  primaryGoal?: "steuer" | "exit" | "familie" | "vermoegen" | "multi-brand";
  /** Geplante VC-Runde? */
  vcPlanned?: boolean;
  /** Familien-Pool / Erbe-Planung? */
  familyContext?: boolean;
  /** Vermögen für Stiftung > 5M? */
  hasLargeWealth?: boolean;
  /** Multiple Brands? */
  multiBrand?: boolean;
  /** IP-Wert (Marken / Patente / Software) > 100k Lizenzpotenzial? */
  hasIp?: boolean;
};

export function recommendStructures(a: WizardAnswers): { structure: HoldingStructure; score: number; why: string }[] {
  const scores = HOLDING_STRUCTURES.map((s) => {
    let score = 0;
    const reasons: string[] = [];

    // Standard 2-Stufen: Default für viele
    if (s.slug === "standard-2-stufen") {
      if ((a.jahresGewinn ?? 0) >= 100000) {
        score += 50;
        reasons.push("Gewinn ≥ 100 k → Setup-Kosten amortisieren sich");
      }
      if (a.primaryGoal === "steuer" || a.primaryGoal === "exit") {
        score += 30;
        reasons.push(`Hauptziel ${a.primaryGoal === "exit" ? "Exit (Schachtelprivileg)" : "Steuer-Optimierung"}`);
      }
      if (!a.vcPlanned && !a.familyContext && !a.multiBrand) {
        score += 10;
        reasons.push("Keine VC/Familie/Multi-Brand-Komplexität");
      }
    }

    if (s.slug === "familien-pool" && a.familyContext) {
      score += 60;
      reasons.push("Familien-Kontext explizit gewählt");
      if ((a.jahresGewinn ?? 0) >= 200000) score += 20;
    }

    if (s.slug === "familienstiftung" && a.hasLargeWealth) {
      score += 70;
      reasons.push("Vermögen > 5 Mio: Stiftung sinnvoll");
      if (a.familyContext) {
        score += 10;
        reasons.push("Familien-Kontext");
      }
    }

    if (s.slug === "3-stufen-multi-brand" && a.multiBrand) {
      score += 70;
      reasons.push("Multi-Brand explizit gewählt");
    }

    if (s.slug === "doppel-holding-investor" && a.vcPlanned) {
      score += 70;
      reasons.push("VC-Runde geplant");
    }

    if (s.slug === "ip-holding" && a.hasIp) {
      score += 65;
      reasons.push("Hoher IP-Wert (Marken/Patente/Software)");
    }

    if (s.slug === "vermoegensverwaltung" && a.primaryGoal === "vermoegen") {
      score += 60;
      reasons.push("Hauptziel Vermögensverwaltung");
    }

    if (s.slug === "gmbh-co-kg" && (a.jahresGewinn ?? 0) > 0 && (a.jahresGewinn ?? 0) < 100000) {
      score += 30;
      reasons.push("Kleinere Gewinne — Personengesellschaft kann steuerlich günstiger sein");
    }

    return { structure: s, score, why: reasons.join(" · ") || "Keine spezifische Empfehlung" };
  });

  return scores.filter((x) => x.score > 0).sort((a, b) => b.score - a.score);
}
