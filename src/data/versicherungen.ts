/**
 * Versicherungs-Datenbank für Solo-Selbstständige (Tool 12).
 *
 * 11 Versicherungs-Typen mit Empfehlungs-Logik pro Berufsbild.
 * Beitrags-Ranges sind 2025/2026-Markt-Durchschnitte für Solo
 * (nicht-haftpflicht-intensive Tätigkeiten).
 */

export type Berufsbild =
  | "it-software"            // Programmierer, IT-Berater, SaaS, Webdesign
  | "beratung-coaching"      // Unternehmensberatung, Coaching, Mentoring
  | "marketing-agentur"      // Werbeagentur, SEO, Social-Media
  | "handel-onlineshop"      // E-Commerce, Versandhandel, Amazon-Seller
  | "kreativ-medien"         // Fotografie, Video, Design, Journalismus
  | "bildung"                // Trainer, Dozent, Online-Kurse
  | "heilberuf"              // Arzt, Heilpraktiker, Therapeut, Hebamme
  | "rechtsberatung"         // Anwalt, Notar, StB, WP
  | "handwerk"               // Elektriker, Sanitär, Maler, Tischler
  | "gastro-hotel"           // Restaurant, Café, Hotel, Catering
  | "sonstige";

export type Rechtsform = "einzel-freiberuf" | "einzel-gewerbe" | "gbr" | "ug-gmbh";

export type Prioritaet = "pflicht" | "dringend" | "sinnvoll" | "optional" | "nicht-noetig";

export type VersicherungsSetup = {
  berufsbild: Berufsbild;
  rechtsform: Rechtsform;
  mitarbeiter: boolean;
  eigenesBuero: boolean;       // mit Inventar/Geräten zu schützen
  onlineDatenverarbeitung: boolean;  // verarbeitet Kundendaten online
  eigeneProdukte: boolean;     // verkauft selbst hergestellte/markierte Produkte
  jahresUmsatz: number;        // für BHV-Deckungssumme-Empfehlung
};

export type Versicherung = {
  id: string;
  name: string;
  kuerzel: string;
  beschreibung: string;
  schadenbeispiel: string;
  deckungssumme: string;
  beitragRange: { min: number; mittel: number; max: number };  // €/Jahr
  worauf_achten: string[];
  anbieter_hinweise: string[];
  prioritaet: (setup: VersicherungsSetup) => Prioritaet;
  pflicht_begruendung?: (setup: VersicherungsSetup) => string | null;
};

const PFLICHT_BHV_BERUFE: Berufsbild[] = ["heilberuf", "rechtsberatung"];

export const VERSICHERUNGEN: Versicherung[] = [
  // === 1. Berufshaftpflicht (BHV) ===
  {
    id: "bhv",
    name: "Berufshaftpflicht-Versicherung (BHV)",
    kuerzel: "BHV",
    beschreibung: "Deckt Schäden ab, die durch berufliche Tätigkeit beim Kunden oder Dritten entstehen. WICHTIGSTE Versicherung für die meisten Selbstständigen.",
    schadenbeispiel: "IT-Berater übersieht Sicherheitslücke beim Setup, Kunde bekommt Datenleck mit 50.000 € Schadenersatz-Forderung von dessen Endkunden.",
    deckungssumme: "Mindestens 1 Mio € pauschal (Personen + Sach + Vermögen). Bei B2B-Beratung höhere Summe (3-5 Mio).",
    beitragRange: { min: 180, mittel: 350, max: 800 },
    worauf_achten: [
      "Pauschal-Deckung statt aufgeteilte Summen (sonst Lücken)",
      "Auslandsschutz inkl. USA/Kanada bei US-Geschäft (deutlich teurer)",
      "Rückwirkende Deckung für Schäden VOR Vertragsabschluss (Optionalmodul)",
      "Selbstbehalt: 250-500 € üblich, höher = günstiger",
      "Tätigkeitsbeschreibung im Vertrag muss zur realen Arbeit passen",
    ],
    anbieter_hinweise: [
      "HISCOX (online, IT/Beratung-Spezialist)",
      "Exali (Online-Marktplatz)",
      "Allianz / R+V / VHV",
      "VPV (für Beratung)",
    ],
    prioritaet: (s) => {
      if (PFLICHT_BHV_BERUFE.includes(s.berufsbild)) return "pflicht";
      if (["it-software", "beratung-coaching", "marketing-agentur", "kreativ-medien", "bildung"].includes(s.berufsbild)) return "dringend";
      return "sinnvoll";
    },
    pflicht_begruendung: (s) => {
      if (s.berufsbild === "heilberuf") return "Pflicht in Berufsordnung (z.B. Ärzte-Approbation, HeilprG). Ohne BHV = berufsrechtliche Konsequenzen.";
      if (s.berufsbild === "rechtsberatung") return "Anwälte: §51 BRAO (250k Mindest). StB: §67 StBerG (250k). WP: §54 WPO (1 Mio).";
      return null;
    },
  },

  // === 2. Berufsunfähigkeit (BU) ===
  {
    id: "bu",
    name: "Berufsunfähigkeitsversicherung (BU)",
    kuerzel: "BU",
    beschreibung: "Zahlt monatliche Rente wenn du deinen Beruf wegen Krankheit/Unfall zu mind. 50 % nicht mehr ausüben kannst. Bei Solo gibt es KEINEN AG-Anteil und KEINE ALG-Anwartschaft.",
    schadenbeispiel: "Designerin bekommt nach 3 Jahren Burnout-Diagnose mit Erwerbsminderung. BU zahlt 2.000 €/Mon bis Rentenalter — sonst Hartz IV-Niveau.",
    deckungssumme: "BU-Rente 60-80 % vom Netto, mindestens 2.000 €/Mon. Endalter mind. 67. Optionsrecht zur Nachversicherung wichtig.",
    beitragRange: { min: 60, mittel: 120, max: 250 },
    worauf_achten: [
      "Gesundheitsfragen WAHRHEITSGEMÄSS — sonst Anfechtung im Schadensfall",
      "Abstrakte Verweisung ausgeschlossen (sonst muss man umlernen)",
      "Nachversicherungs-Garantie bei Heirat/Geburt/Selbst-Karriere",
      "Endalter 67 (nicht 60 oder 65)",
      "Karenzzeit so kurz wie möglich (3-6 Monate)",
      "Konkrete Verweisung nur auf gleichwertige Tätigkeit (nicht Hilfsjob)",
    ],
    anbieter_hinweise: [
      "Alte Leipziger (Top-Bedingungen)",
      "Allianz / AXA / Continentale (Premium)",
      "Hannoversche / HUK (günstiger, eingeschränkter)",
      "Maklerempfehlung sinnvoll wegen Komplexität",
    ],
    prioritaet: () => "dringend",
  },

  // === 3. Privathaftpflicht (PHV) ===
  {
    id: "phv",
    name: "Privathaftpflichtversicherung (PHV)",
    kuerzel: "PHV",
    beschreibung: "Deckt private Personenschäden/Sachschäden ab. Standard für jeden — auch Selbstständige privat. Nicht zu verwechseln mit Berufshaftpflicht!",
    schadenbeispiel: "Du läufst einem Radfahrer in die Quere, dieser stürzt, bricht sich die Hüfte, lebenslange Folgekosten 500.000 €.",
    deckungssumme: "Mindestens 10 Mio € pauschal, besser 50 Mio.",
    beitragRange: { min: 50, mittel: 90, max: 150 },
    worauf_achten: [
      "Forderungsausfalldeckung (= Versicherung springt ein wenn Schädiger zahlungsunfähig)",
      "Familientarif inkl. Kinder/Partner",
      "Mietsachschäden bis 500k inkludiert",
      "Schlüsselverlust (auch beruflich genutzte Schlüssel)",
      "Gefälligkeitsschäden",
    ],
    anbieter_hinweise: [
      "Check24 / verivox für Vergleich",
      "HUK24 / Allianz Direct",
      "DEVK (oft günstig + solide)",
    ],
    prioritaet: () => "dringend",
  },

  // === 4. Cyber-Versicherung ===
  {
    id: "cyber",
    name: "Cyber-Versicherung",
    kuerzel: "Cyber",
    beschreibung: "Deckt Schäden durch Cyber-Angriffe, Datenverlust, DSGVO-Bußgelder ab. Wichtig bei jeder Online-Tätigkeit oder Kundendaten-Verarbeitung.",
    schadenbeispiel: "Online-Shop wird gehackt, 5.000 Kunden-Daten geleakt, DSGVO-Bußgeld 50.000 € + Forensik 30.000 € + Anwalts-Kosten.",
    deckungssumme: "1-3 Mio € je nach Datenvolumen. Inkl. Bußgeld-Modul wenn rechtlich erlaubt.",
    beitragRange: { min: 200, mittel: 400, max: 900 },
    worauf_achten: [
      "Bußgeld-Modul (DSGVO-Verstöße sind grundsätzlich VERSICHERBAR, anders als in den USA)",
      "Erpressungs-Modul (Lösegeld bei Ransomware)",
      "Krisen-Hotline 24/7",
      "Forensik-Kosten ab Tag 1 gedeckt",
      "PR-Krisenmanagement-Modul",
    ],
    anbieter_hinweise: [
      "Hiscox Cyber (Marktführer)",
      "Allianz / AIG",
      "Cogitanda (Cyber-Spezialist)",
      "Mailo (Solo-fokussiert)",
    ],
    prioritaet: (s) => {
      if (s.onlineDatenverarbeitung || s.berufsbild === "it-software" || s.berufsbild === "handel-onlineshop") return "dringend";
      if (s.berufsbild === "marketing-agentur" || s.berufsbild === "beratung-coaching") return "sinnvoll";
      return "optional";
    },
  },

  // === 5. Inhalt / Inventar ===
  {
    id: "inhalt",
    name: "Geschäftsinhalts-Versicherung",
    kuerzel: "Inhalt",
    beschreibung: "Schützt Büroausstattung (Laptop, Möbel, Geräte) gegen Feuer, Einbruch, Wasser. Nur bei eigenem Büro/Lager nötig — Home-Office meist über Privathaftpflicht + Hausrat.",
    schadenbeispiel: "Büro brennt aus (Defekt Nachbarsstockwerk), 30.000 € Equipment-Schaden + 5.000 € Daten-Wiederherstellung.",
    deckungssumme: "Equipment-Neuwert (nicht Zeitwert). Realistisch bei Solo: 20-50k €.",
    beitragRange: { min: 120, mittel: 300, max: 800 },
    worauf_achten: [
      "Neuwert-Entschädigung (statt Zeitwert!)",
      "Betriebsunterbrechungs-Modul (Ersatz Einnahmeausfall)",
      "Mobile-Modul: Laptops/Smartphones auch außerhalb",
      "Einbruchsicherung am Standort (Klausel-Pflichten)",
    ],
    anbieter_hinweise: [
      "Allianz / R+V / VHV",
      "Mailo (Solo-fokussiert)",
      "Hiscox Office",
    ],
    prioritaet: (s) => {
      if (s.eigenesBuero) return "sinnvoll";
      return "nicht-noetig";
    },
  },

  // === 6. Rechtsschutz ===
  {
    id: "rechtsschutz",
    name: "Rechtsschutz-Versicherung (Berufs- + Privat)",
    kuerzel: "RSV",
    beschreibung: "Übernimmt Anwalts-/Gerichtskosten bei Streit. Berufs-Modul für Solo, Privat-Modul für Alltags-Streit (Mietrecht, Verkehrsrecht).",
    schadenbeispiel: "Kunde zahlt 8.000 €-Rechnung nicht. Klage führen kostet 4.000 € Anwalts-/Gerichtskosten — RSV übernimmt.",
    deckungssumme: "Pauschal bis 300k pro Fall ist Standard. Selbstbehalt 150-500 €.",
    beitragRange: { min: 200, mittel: 350, max: 600 },
    worauf_achten: [
      "Berufs-Modul (Vertragsrecht, Forderungs-Inkasso)",
      "Wartezeit 3 Monate für die meisten Bereiche (nicht akut buchbar)",
      "Forderungs-Inkasso bis 10k oft inklusive",
      "Steuerrecht meist NICHT versicherbar",
      "Telefon-Rechtsberatung-Modul (kostenlose Erstauskunft)",
    ],
    anbieter_hinweise: [
      "ARAG (RSV-Spezialist)",
      "DAS / Allianz / R+V",
      "HUK24 (günstig, Standard)",
    ],
    prioritaet: (s) => {
      if (s.berufsbild === "rechtsberatung") return "optional"; // brauchen es selten
      if (s.jahresUmsatz > 100000) return "sinnvoll";
      return "optional";
    },
  },

  // === 7. Krankentagegeld ===
  {
    id: "krankentagegeld",
    name: "Krankentagegeld-Versicherung",
    kuerzel: "KTG",
    beschreibung: "Zahlt Tagegeld bei Arbeitsunfähigkeit (typisch ab Tag 22 oder 43). PFLICHT bei freiwilliger GKV ohne Krankengeld-Wahltarif!",
    schadenbeispiel: "Du hast 6 Wochen Bandscheibenvorfall. Ohne KTG: 0 € Einkommen (kein AG-Anteil-Lohnfortzahlung). Mit KTG: 100 €/Tag = 6.000 €.",
    deckungssumme: "60-100 % vom Netto, max. Höhe = GKV-Bemessungsgrenze.",
    beitragRange: { min: 200, mittel: 600, max: 1500 },
    worauf_achten: [
      "Karenzzeit (Beginn ab Tag X): 22 Tage = Standard, 43 Tage = günstiger, 8 Tage = teuer",
      "Bei GKV-freiwillig: Krankengeld-Wahltarif (Tarif WAH) oft Alternative — ab 43. Tag GKV-Krankengeld",
      "Bei PKV: meist über Vollversicherung, separat möglich",
      "Verzicht auf ordentliche Kündigung durch Versicherer",
    ],
    anbieter_hinweise: [
      "Eigene GKV (Krankengeld-Wahltarif!)",
      "DKV / Allianz Private",
      "Continentale / SDK",
    ],
    prioritaet: () => "dringend",
  },

  // === 8. Vermögensschaden-Haftpflicht (VSH) ===
  {
    id: "vsh",
    name: "Vermögensschadens-Haftpflicht (VSH)",
    kuerzel: "VSH",
    beschreibung: "Spezialform der BHV für REINE Vermögensschäden (kein Personen-/Sachschaden). Wichtig bei Beratung wo nur Geld-Konsequenzen entstehen.",
    schadenbeispiel: "Unternehmensberater empfiehlt fehlerhafte Strategie, Mandant verliert 200k € Umsatz — reiner Vermögensschaden, klassische BHV deckt das nicht.",
    deckungssumme: "Mindestens 500k €, bei Unternehmensberatung 1-3 Mio €.",
    beitragRange: { min: 300, mittel: 600, max: 1500 },
    worauf_achten: [
      "Meist als Modul der BHV buchbar (günstiger)",
      "Bei BHV ohne VSH: reine Geld-Schäden nicht gedeckt!",
      "Wichtig für Beratung, StB, Anwalt, Architekt, IT-Beratung",
    ],
    anbieter_hinweise: [
      "Als Modul bei BHV mitbuchen (HISCOX, VPV)",
      "Separat: AGCS, AIG (für große Risiken)",
    ],
    prioritaet: (s) => {
      if (["beratung-coaching", "rechtsberatung", "it-software"].includes(s.berufsbild)) return "dringend";
      return "optional";
    },
  },

  // === 9. Produkthaftpflicht ===
  {
    id: "producthaft",
    name: "Produkthaftpflicht",
    kuerzel: "PH",
    beschreibung: "Deckt Schäden durch eigene Produkte (Konsumenten- oder B2B-Waren). Bei Online-Shops mit Eigenmarken essentiell.",
    schadenbeispiel: "Kosmetik-Shop verkauft Creme die allergische Reaktion auslöst, Kunde verklagt mit 50k Schadenersatz.",
    deckungssumme: "1-3 Mio € je nach Produkt-Risiko. Bei Lebensmitteln/Kosmetik/Health höher.",
    beitragRange: { min: 250, mittel: 600, max: 1500 },
    worauf_achten: [
      "Rückruf-Modul (recall-coverage) bei Massenprodukten",
      "USA/Kanada-Klausel (deutlich teurer, oft separat)",
      "Erweiterte Produkthaftpflicht (EPH) für Folgeschäden",
      "Reine Eigenmarken vs. Distribution-Ware (unterschiedliche Tarife)",
    ],
    anbieter_hinweise: [
      "Allianz / AIG / HDI",
      "Hiscox Product Liability",
      "Markel (Spezialist bei kleinen Marken)",
    ],
    prioritaet: (s) => {
      if (s.eigeneProdukte) return "dringend";
      if (s.berufsbild === "handel-onlineshop") return "sinnvoll";
      return "nicht-noetig";
    },
  },

  // === 10. D&O ===
  {
    id: "do",
    name: "D&O (Directors & Officers)",
    kuerzel: "D&O",
    beschreibung: "Schützt Geschäftsführer/Vorstände vor persönlicher Haftung bei Pflichtverletzungen (§43 GmbHG, §93 AktG).",
    schadenbeispiel: "GF einer UG übersieht Insolvenzantragspflicht, wird persönlich für Insolvenzverschleppungs-Schaden 200k haftbar.",
    deckungssumme: "Bei UG/kleiner GmbH 1-3 Mio €. Selbstbehalt 1-5 % der Schadensumme.",
    beitragRange: { min: 800, mittel: 1500, max: 3500 },
    worauf_achten: [
      "Insolvenzschutz-Klausel",
      "Inside-Outside-Coverage (Schäden zwischen GF und Gesellschaft)",
      "Run-Off-Deckung bei Beendigung des GF-Amts",
      "Versicherungssumme angemessen zur Bilanzsumme",
    ],
    anbieter_hinweise: [
      "AIG / Chubb (Marktführer)",
      "HDI / Allianz",
      "Markel (KMU-Fokus)",
    ],
    prioritaet: (s) => {
      if (s.rechtsform === "ug-gmbh") return "sinnvoll";
      return "nicht-noetig";
    },
  },

  // === 11. Krankenversicherung (Cross-Ref) ===
  {
    id: "kv",
    name: "Krankenversicherung (GKV / PKV / KSK)",
    kuerzel: "KV",
    beschreibung: "Größter laufender Kostenpunkt (200-1.000 €/Monat). Bei Solo entweder freiwillige GKV, PKV oder Künstlersozialkasse (KSK).",
    schadenbeispiel: "Selbstständiger ohne KV bekommt Krebsdiagnose → Behandlungskosten 200k+ aus eigener Tasche, plus rückwirkende KV-Beiträge bei FA-Beitritt.",
    deckungssumme: "GKV: Sachleistungsprinzip, alle Kassenleistungen. PKV: tarifabhängig, oft besser bei Privatleistungen.",
    beitragRange: { min: 2400, mittel: 6000, max: 12000 },
    worauf_achten: [
      "Tool KV-Optimizer hat Detail-Vergleich aller Optionen",
      "Bei KSK: Bund zahlt 50 % vom Beitrag",
      "Mindest-Bemessung GKV freiwillig: 1.318 €/Mon",
      "BBG GKV/PV 2026: 5.512,50 €/Mon",
    ],
    anbieter_hinweise: [
      "Tool 'KV-Optimizer' für Detail-Vergleich",
      "TK / DAK / Barmer / AOK (GKV)",
      "DKV / Allianz / SDK (PKV)",
    ],
    prioritaet: () => "pflicht",
    pflicht_begruendung: () => "Krankenversicherungspflicht §193 VVG. Wer wo: Tool KV-Optimizer.",
  },
];

export const BERUFSBILD_LABELS: Record<Berufsbild, string> = {
  "it-software": "IT / Software / Webentwicklung",
  "beratung-coaching": "Beratung / Coaching / Mentoring",
  "marketing-agentur": "Marketing / Agentur / Social Media",
  "handel-onlineshop": "Handel / Online-Shop / E-Commerce",
  "kreativ-medien": "Kreativ / Medien / Fotografie",
  "bildung": "Bildung / Training / Online-Kurse",
  "heilberuf": "Heilberuf (Arzt, Therapeut, Heilpraktiker)",
  "rechtsberatung": "Rechts-/Steuerberatung (Anwalt, StB, WP)",
  "handwerk": "Handwerk",
  "gastro-hotel": "Gastronomie / Hotel",
  "sonstige": "Sonstige Tätigkeit",
};

export const PRIORITAET_FARBE: Record<Prioritaet, { bg: string; text: string; border: string; label: string }> = {
  pflicht: { bg: "bg-red-500/10", text: "text-red-700", border: "border-red-500/40", label: "PFLICHT" },
  dringend: { bg: "bg-amber-500/10", text: "text-amber-700", border: "border-amber-500/40", label: "DRINGEND" },
  sinnvoll: { bg: "bg-blue-500/10", text: "text-blue-700", border: "border-blue-500/40", label: "SINNVOLL" },
  optional: { bg: "bg-secondary/40", text: "text-foreground", border: "border-border", label: "OPTIONAL" },
  "nicht-noetig": { bg: "bg-secondary/20", text: "text-muted-foreground", border: "border-border", label: "NICHT NÖTIG" },
};
