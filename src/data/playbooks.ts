import { Globe2, Building2, Tag, Rocket, Calculator, type LucideIcon } from "lucide-react";

export type StepKind = "checklist" | "form" | "info" | "decision" | "external";

export interface PlaybookStep {
  slug: string;
  title: string;
  description: string;
  kind: StepKind;
  estMinutes: number;
  checklist?: string[];
  fields?: { name: string; label: string; type?: "text" | "number" | "textarea" | "date" }[];
  externalLinks?: { label: string; url: string }[];
  warning?: string;
}

export interface Playbook {
  slug: string;
  title: string;
  emoji: string;
  icon: LucideIcon;
  tagline: string;
  outcome: string;
  duration: string;
  difficulty: "Einfach" | "Mittel" | "Komplex";
  steps: PlaybookStep[];
}

export const PLAYBOOKS: Playbook[] = [
  {
    slug: "us-llc",
    title: "US-LLC gründen",
    emoji: "🇺🇸",
    icon: Globe2,
    tagline: "Wyoming/Delaware/New Mexico LLC für non-US Founder",
    outcome: "Du hast eine voll funktionsfähige US-LLC mit EIN, Bankkonto und korrekter US/DE-Steuer-Setup.",
    duration: "4–8 Wochen",
    difficulty: "Mittel",
    steps: [
      { slug: "state", title: "Bundesstaat wählen", description: "Wyoming (günstig, anonym), Delaware (Investor-freundlich) oder New Mexico (am günstigsten).", kind: "decision", estMinutes: 20,
        fields: [{ name: "state", label: "Gewählter Bundesstaat" }, { name: "reason", label: "Begründung", type: "textarea" }] },
      { slug: "name", title: "LLC-Namen prüfen & reservieren", description: "Verfügbarkeit im Secretary of State des gewählten Staats prüfen. Endung 'LLC' oder 'L.L.C.' Pflicht.", kind: "form", estMinutes: 15,
        fields: [{ name: "company_name", label: "LLC-Name (mit 'LLC')" }] },
      { slug: "registered-agent", title: "Registered Agent buchen", description: "Pflicht: physische Adresse im Staat. Northwest, Harbor Compliance oder Cloud Peak Law.", kind: "external", estMinutes: 30,
        externalLinks: [
          { label: "Northwest Registered Agent", url: "https://www.northwestregisteredagent.com" },
          { label: "Harbor Compliance", url: "https://www.harborcompliance.com" },
        ],
        fields: [{ name: "agent", label: "Anbieter" }, { name: "agent_cost", label: "Jahreskosten ($)", type: "number" }] },
      { slug: "articles", title: "Articles of Organization einreichen", description: "Gründungsdokument beim Secretary of State einreichen. Bestätigung dauert 1–10 Werktage.", kind: "form", estMinutes: 45,
        fields: [{ name: "filing_date", label: "Einreichungsdatum", type: "date" }, { name: "ein_pending", label: "Bestätigungsnummer" }] },
      { slug: "ein", title: "EIN beim IRS beantragen", description: "Tax-ID via Form SS-4 (Fax oder Brief – non-US Founder ohne SSN). Dauert 4–6 Wochen per Fax, 8+ per Brief.", kind: "form", estMinutes: 60,
        externalLinks: [{ label: "Form SS-4 PDF", url: "https://www.irs.gov/pub/irs-pdf/fss4.pdf" }],
        fields: [{ name: "ein", label: "EIN (XX-XXXXXXX)" }, { name: "ein_date", label: "Erhalten am", type: "date" }],
        warning: "Häufiger Fehler: Zeile 7b leer lassen, wenn keine SSN/ITIN vorhanden – stattdessen 'Foreign' eintragen." },
      { slug: "operating-agreement", title: "Operating Agreement aufsetzen", description: "Nicht überall Pflicht, aber für Banken & Steuerberater erforderlich. Single-Member-LLC-Template reicht.", kind: "checklist", estMinutes: 30,
        checklist: ["Member-Struktur (Single oder Multi)", "Gewinnverteilung", "Management (Member-managed vs Manager-managed)", "Auflösungsregeln"] },
      { slug: "boi", title: "BOI-Report bei FinCEN", description: "Beneficial Ownership Information Report – Pflicht innerhalb 90 Tagen nach Gründung.", kind: "external", estMinutes: 30,
        externalLinks: [{ label: "FinCEN BOI E-Filing", url: "https://boiefiling.fincen.gov" }],
        warning: "Bußgeld bis $500/Tag bei Versäumnis." },
      { slug: "bank", title: "US-Bankkonto eröffnen", description: "Mercury, Wise Business oder Relay – Mercury ist für non-US Founder am einfachsten.", kind: "external", estMinutes: 60,
        externalLinks: [
          { label: "Mercury", url: "https://mercury.com" },
          { label: "Wise Business", url: "https://wise.com/business" },
          { label: "Relay", url: "https://relayfi.com" },
        ],
        fields: [{ name: "bank", label: "Bank" }, { name: "account_no", label: "Letzte 4 Stellen" }] },
      { slug: "itin", title: "ITIN beantragen (optional)", description: "Nur falls du persönlich US-Steuern zahlen musst. Form W-7 mit beglaubigter Pass-Kopie.", kind: "info", estMinutes: 90 },
      { slug: "5472-1120", title: "Form 5472 + 1120 vorbereiten", description: "Pflicht für Single-Member-LLC mit ausländischem Owner – jährlich, auch ohne Umsatz.", kind: "info", estMinutes: 30,
        warning: "Strafe $25.000 bei Versäumnis – unbedingt mit US-CPA klären." },
      { slug: "de-anrechnung", title: "DE-Steuerliche Behandlung klären", description: "DBA USA-DE: LLC ist transparent → Gewinne in DE als Einkünfte aus Gewerbebetrieb.", kind: "checklist", estMinutes: 45,
        checklist: ["Mit deutschem StB sprechen", "DBA-Anrechnung dokumentieren", "Hinzurechnungsbesteuerung (CFC) prüfen"] },
    ],
  },
  {
    slug: "hk-limited",
    title: "Hong Kong Limited gründen",
    emoji: "🇭🇰",
    icon: Globe2,
    tagline: "HK-Ltd mit Offshore-Status für asiatisches Business",
    outcome: "Voll registrierte HK-Limited mit Bankkonto und ggf. Offshore-Profits-Tax-Status.",
    duration: "6–10 Wochen",
    difficulty: "Komplex",
    steps: [
      { slug: "namecheck", title: "Firmennamen prüfen", description: "EN + optional CN-Name. Cyber Search Centre prüfen.", kind: "form", estMinutes: 15,
        fields: [{ name: "name_en", label: "Englischer Name" }, { name: "name_cn", label: "Chinesischer Name (optional)" }] },
      { slug: "secretary", title: "Company Secretary engagieren", description: "Pflicht: lokal registrierter Company Secretary.", kind: "external", estMinutes: 60 },
      { slug: "address", title: "Registered Address", description: "Lokale HK-Adresse erforderlich. Meist im Paket des Company Secretary.", kind: "form", estMinutes: 15 },
      { slug: "incorporate", title: "Incorporation einreichen", description: "Form NNC1 + Articles bei Companies Registry. Dauert ~1 Woche elektronisch.", kind: "form", estMinutes: 45 },
      { slug: "br", title: "Business Registration Certificate", description: "Inland Revenue Department, gilt 1 oder 3 Jahre.", kind: "form", estMinutes: 20 },
      { slug: "bank", title: "HK-Bankkonto", description: "Statrys, Airwallex, Currenxie sind 100 % remote möglich. HSBC verlangt persönliche Vorstellung.", kind: "external", estMinutes: 90,
        externalLinks: [
          { label: "Statrys", url: "https://statrys.com" },
          { label: "Airwallex", url: "https://airwallex.com" },
        ] },
      { slug: "offshore", title: "Offshore-Status beantragen", description: "Wenn alle Einnahmen außerhalb HK erzielt werden → 0 % Profits Tax möglich. Antrag mit Audit.", kind: "info", estMinutes: 60,
        warning: "Hohe Substanz-Anforderungen – Mailbox-Setup wird oft abgelehnt." },
      { slug: "audit", title: "Audited Accounts vorbereiten", description: "Pflicht jährlich, durch HK-zertifizierten Auditor. Budget ~1.500–3.000 HKD.", kind: "info", estMinutes: 60 },
    ],
  },
  {
    slug: "gmbh-gruendung",
    title: "GmbH in Deutschland gründen",
    emoji: "🇩🇪",
    icon: Building2,
    tagline: "Klassische GmbH von Notar bis Handelsregister",
    outcome: "Eingetragene GmbH mit Geschäftskonto, Steuernummer und allen Anmeldungen.",
    duration: "4–6 Wochen",
    difficulty: "Mittel",
    steps: [
      { slug: "name", title: "Firmenname & Verfügbarkeit", description: "IHK-Vorabprüfung + Marken-Check (DPMA/EUIPO).", kind: "form", estMinutes: 30,
        fields: [{ name: "company_name", label: "Firmenname" }] },
      { slug: "satzung", title: "Gesellschaftsvertrag aufsetzen", description: "Musterprotokoll (für 1–3 Personen, 1 GF) ist günstiger. Bei Holding eigene Satzung.", kind: "decision", estMinutes: 60 },
      { slug: "notar", title: "Notartermin", description: "Beurkundung, Anmeldung Handelsregister.", kind: "external", estMinutes: 90,
        fields: [{ name: "notar", label: "Notar" }, { name: "termin", label: "Termin", type: "date" }] },
      { slug: "konto", title: "Geschäftskonto eröffnen", description: "25.000 € Stammkapital einzahlen (mind. 12.500 € bei Gründung).", kind: "external", estMinutes: 60,
        externalLinks: [
          { label: "Qonto", url: "https://qonto.com" }, { label: "Holvi", url: "https://holvi.com" }, { label: "Finom", url: "https://finom.co" },
        ] },
      { slug: "einzahlung", title: "Stammkapital nachweisen", description: "Bestätigung der Bank an Notar senden.", kind: "checklist", estMinutes: 15,
        checklist: ["Mind. 12.500 € überwiesen", "Bestätigung Bank → Notar", "Notar reicht Handelsregister-Anmeldung ein"] },
      { slug: "hr", title: "Handelsregister-Eintragung", description: "Dauert 1–3 Wochen. GmbH ist erst danach voll rechtsfähig.", kind: "info", estMinutes: 10 },
      { slug: "gewerbe", title: "Gewerbeanmeldung", description: "Beim örtlichen Gewerbeamt, 20–60 €.", kind: "form", estMinutes: 30 },
      { slug: "fa", title: "Steuernummer beim Finanzamt", description: "Fragebogen zur steuerlichen Erfassung über ELSTER.", kind: "form", estMinutes: 60,
        externalLinks: [{ label: "ELSTER", url: "https://elster.de" }] },
      { slug: "ihk", title: "IHK-Beitrag berücksichtigen", description: "Automatische Pflichtmitgliedschaft – Beitrag im 1. Jahr meist gering.", kind: "info", estMinutes: 5 },
      { slug: "sv-ag", title: "Berufsgenossenschaft + Sozialversicherung (wenn AN)", description: "Nur wenn du Mitarbeiter einstellst. Gründer-GF meist sozialversicherungsfrei.", kind: "checklist", estMinutes: 20,
        checklist: ["BG-Mitgliedschaft", "Betriebsnummer Bundesagentur", "Krankenversicherung GF"] },
    ],
  },
  {
    slug: "holding",
    title: "Holding-Struktur aufbauen",
    emoji: "🏛️",
    icon: Building2,
    tagline: "Operative GmbH + Holding GmbH steuerneutral aufsetzen",
    outcome: "Vollständige Holding-Struktur mit § 8b KStG-Privileg (95 % steuerfreie Ausschüttungen).",
    duration: "8–12 Wochen",
    difficulty: "Komplex",
    steps: [
      { slug: "ist-pruefen", title: "Ausgangslage prüfen", description: "Existiert schon eine GmbH? → Sachgründung/Anteilseinbringung. Sonst beide neu gründen.", kind: "decision", estMinutes: 30 },
      { slug: "holding-name", title: "Holding-Namen festlegen", description: "Tipp: Nachname + 'Holding GmbH' oder neutraler Name (kein operativer Bezug).", kind: "form", estMinutes: 15,
        fields: [{ name: "holding_name", label: "Name der Holding GmbH" }] },
      { slug: "holding-gruenden", title: "Holding GmbH gründen", description: "Klassische GmbH-Gründung (siehe Playbook). Persönliche Beteiligung der Gründer.", kind: "info", estMinutes: 30 },
      { slug: "anteile-einbringen", title: "Anteile operative GmbH einbringen", description: "Nach §21 UmwStG steuerneutral – aber 7 Jahre Sperrfrist beachten.", kind: "info", estMinutes: 45,
        warning: "Verkauf der eingebrachten Anteile innerhalb 7 Jahre löst rückwirkend Einbringungsgewinn aus." },
      { slug: "ausschuettung", title: "Ausschüttungspolitik festlegen", description: "Operative GmbH schüttet an Holding aus → ~1,5 % effektive Steuer.", kind: "checklist", estMinutes: 30,
        checklist: ["Gewinnverwendungsbeschluss", "KapESt-Anmeldung Finanzamt", "Cash-Pooling klären"] },
      { slug: "vermoegensaufbau", title: "Vermögensaufbau in Holding", description: "Holding investiert in ETFs, Immobilien, andere Beteiligungen.", kind: "info", estMinutes: 30 },
      { slug: "exit-vorbereitung", title: "Exit-Vorbereitung (optional)", description: "Bei Verkauf operative GmbH durch Holding: nur 5 % steuerpflichtig.", kind: "info", estMinutes: 20 },
    ],
  },
  {
    slug: "marke-anmelden",
    title: "Marke anmelden (DPMA/EUIPO)",
    emoji: "™️",
    icon: Tag,
    tagline: "Schutz für deine Brand in 4–8 Wochen",
    outcome: "Eingetragene Marke (DE oder EU-weit) mit 10 Jahren Schutz.",
    duration: "4–8 Wochen",
    difficulty: "Einfach",
    steps: [
      { slug: "scope", title: "Schutzbereich wählen", description: "DE (DPMA), EU (EUIPO), International (WIPO).", kind: "decision", estMinutes: 15 },
      { slug: "recherche", title: "Markenrecherche", description: "Identische und ähnliche Marken prüfen – verhindert teure Widersprüche.", kind: "external", estMinutes: 60,
        externalLinks: [
          { label: "DPMA Register", url: "https://register.dpma.de" },
          { label: "EUIPO eSearch", url: "https://euipo.europa.eu/eSearch" },
        ] },
      { slug: "klassen", title: "Nizza-Klassen wählen", description: "Bis zu 3 Klassen sind im Grundpreis. Tipp: relevante Waren+Dienstleistungen abdecken.", kind: "form", estMinutes: 30,
        fields: [{ name: "classes", label: "Gewählte Klassen", type: "textarea" }] },
      { slug: "anmeldung", title: "Anmeldung einreichen", description: "Online über DPMAdirektWeb oder EUIPO User Area. ~290 € (DE) / ~850 € (EU).", kind: "external", estMinutes: 45,
        externalLinks: [
          { label: "DPMAdirektWeb", url: "https://direkt.dpma.de" },
          { label: "EUIPO", url: "https://euipo.europa.eu" },
        ] },
      { slug: "widerspruch", title: "Widerspruchsfrist abwarten", description: "3 Monate bei DPMA, 3 Monate bei EUIPO.", kind: "info", estMinutes: 5 },
      { slug: "eintragung", title: "Eintragung & Urkunde", description: "Marke wird im Register eingetragen, Urkunde kommt per Post/PDF.", kind: "checklist", estMinutes: 10,
        checklist: ["Urkunde sicher aufbewahren", "Verlängerungstermin (10 Jahre) im Kalender", "Markenüberwachung aktivieren"] },
    ],
  },
  {
    slug: "amazon-fba-launch",
    title: "Amazon FBA Brand launchen",
    emoji: "📦",
    icon: Rocket,
    tagline: "Vom Brand-Setup bis zum ersten Sale",
    outcome: "Live Amazon-FBA-Listing mit eingelagerter Ware und allen Compliance-Anmeldungen.",
    duration: "8–14 Wochen",
    difficulty: "Mittel",
    steps: [
      { slug: "brand", title: "Brand & Markenanmeldung", description: "Markenanmeldung Voraussetzung für Brand Registry.", kind: "info", estMinutes: 30 },
      { slug: "rechtsform", title: "Rechtsform & Konto", description: "UG/GmbH + Geschäftskonto.", kind: "info", estMinutes: 30 },
      { slug: "seller-account", title: "Amazon Seller Central registrieren", description: "Professional Plan ~39 €/Monat. Identitätsnachweis vorbereiten.", kind: "external", estMinutes: 60 },
      { slug: "verifikation", title: "Seller-Verifikation abschließen", description: "Video-Call, Dokumente. Dauert 2–6 Wochen.", kind: "info", estMinutes: 30 },
      { slug: "compliance", title: "Compliance pro Kategorie", description: "WEEE/EAR (Elektronik), LUCID (Verpackung), BattG, CPNP (Kosmetik) etc.", kind: "checklist", estMinutes: 60,
        checklist: ["LUCID Verpackungsregister", "WEEE wenn Elektronik", "BattG wenn Batterien", "EAN/GTIN gekauft"] },
      { slug: "produkt", title: "Produkt & Listing vorbereiten", description: "Bilder, Bullet Points, A+ Content, EAN/GTIN.", kind: "checklist", estMinutes: 90,
        checklist: ["Hauptbild auf weißem Hintergrund", "5 Bullet Points", "Backend Keywords", "A+ Content Module"] },
      { slug: "fba-shipment", title: "FBA-Versand erstellen", description: "Shipping Plan, Labels, Versand zu Amazon-Lager.", kind: "form", estMinutes: 60 },
      { slug: "ppc", title: "PPC-Launch-Kampagnen", description: "Auto + Sponsored Brands + Keywords aus Helium10/Jungle Scout.", kind: "checklist", estMinutes: 45,
        checklist: ["Auto-Kampagne", "Manual Exact", "Sponsored Brands", "Tagesbudget gesetzt"] },
      { slug: "vine-reviews", title: "Erste Reviews via Vine", description: "Bis zu 30 Vine-Reviews freischalten – wichtig für Conversion.", kind: "info", estMinutes: 15 },
    ],
  },
];

export const getPlaybook = (slug: string) => PLAYBOOKS.find((p) => p.slug === slug);

export const PLAYBOOK_CATEGORY: Record<string, { icon: LucideIcon; label: string }> = {
  international: { icon: Globe2, label: "International" },
  rechtsform: { icon: Building2, label: "Rechtsform" },
  marken: { icon: Tag, label: "Marken" },
  launch: { icon: Rocket, label: "Launch" },
  steuer: { icon: Calculator, label: "Steuern" },
};
