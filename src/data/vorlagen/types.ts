// ===================================================================
// Vorlagen-Bibliothek (/vorlagen): Verträge, Schreiben und Formulare für
// Gründer – kostenlos gegen eine BESTÄTIGTE E-Mail-Adresse (Double-Opt-in,
// siehe src/lib/vorlagen/freigabe.ts und die Edge Functions
// vorlage-anfordern / vorlage-bestaetigen).
//
// Jede Vorlage ist reiner Text mit Platzhaltern in eckigen Klammern
// ("[Name der Gesellschaft]"). Kein Wizard, kein LLM: Der Nutzer lädt die
// Vorlage als PDF, Word (.docx) oder Text und füllt sie selbst aus.
//
// Diese Dateien importieren KEINE React- oder lucide-Module: Der Katalog
// (slug → Titel) wird per scripts/generate-vorlagen-katalog.mjs in
// supabase/functions/_shared/vorlagenKatalog.ts kopiert, damit die
// Bestätigungsmail den Titel kennt, ohne das Frontend zu laden.
// ===================================================================

export type VorlagenKategorie =
  | "gesellschaft"
  | "kauf"
  | "arbeit"
  | "dienstleistung"
  | "geheimhaltung"
  | "miete"
  | "finanzen"
  | "ecommerce"
  | "verwaltung";

export interface VorlagenKategorieInfo {
  key: VorlagenKategorie;
  titel: string;
  kurz: string;
  /** Name eines lucide-Icons; die Zuordnung passiert im Frontend. */
  icon: string;
}

export const VORLAGEN_KATEGORIEN: VorlagenKategorieInfo[] = [
  { key: "gesellschaft", titel: "Gesellschaft & Gründung", kurz: "GbR, UG, GmbH, Gesellschafter, Vesting", icon: "Users" },
  { key: "kauf", titel: "Kaufverträge", kurz: "Waren, Fahrzeuge, Inventar, Unternehmen, Domains", icon: "ShoppingCart" },
  { key: "arbeit", titel: "Arbeit & Personal", kurz: "Arbeitsverträge, Minijob, Praktikum, Kündigung, Zeugnis", icon: "Briefcase" },
  { key: "dienstleistung", titel: "Dienstleistung & Projekte", kurz: "Freelancer, Beratung, Agentur, Werkvertrag", icon: "Handshake" },
  { key: "geheimhaltung", titel: "Geheimhaltung & Rechte", kurz: "NDA, Lizenzen, Nutzungsrechte, Absichtserklärung", icon: "Lock" },
  { key: "miete", titel: "Miete & Nutzung", kurz: "Büro, Lager, Untermiete, Coworking, Leihe", icon: "Building2" },
  { key: "finanzen", titel: "Geld & Forderungen", kurz: "Darlehen, Ratenzahlung, Abtretung, Quittung", icon: "Coins" },
  { key: "ecommerce", titel: "Online-Handel & Vertrieb", kurz: "AGB, Widerruf, Lieferanten, Affiliate, Dropshipping", icon: "Store" },
  { key: "verwaltung", titel: "Vollmachten & Behörden", kurz: "Vollmachten, Finanzamt, Kündigungen, Einwilligungen", icon: "FileText" },
];

export interface VorlagenFaq {
  q: string;
  a: string;
}

export interface Vorlage {
  /** URL-Teil unter /vorlagen/, nur a-z, 0-9 und Bindestrich. */
  slug: string;
  /** Anzeigename, z. B. „GbR-Gesellschaftsvertrag“. */
  titel: string;
  /** Ein Satz für die Karte in der Übersicht. */
  kurz: string;
  kategorie: VorlagenKategorie;
  /** Dateiname ohne Endung, z. B. „GbR-Gesellschaftsvertrag“. */
  dateiname: string;
  /** Wann die Vorlage passt: 3 bis 5 Stichpunkte. */
  wofuer: string[];
  /** Was drinsteht: die Abschnitte in Reihenfolge, 5 bis 12 Punkte. */
  enthaelt: string[];
  /** Fallen und Pflichten, die man kennen muss: 2 bis 5 Punkte. */
  hinweise: string[];
  /** 3 bis 4 Fragen samt Antwort (SEO + Nutzen). */
  faqs: VorlagenFaq[];
  seo: {
    /** ≤ 65 Zeichen, endet mit „| GründerX“. */
    title: string;
    /** 120 bis 160 Zeichen. */
    description: string;
  };
  /** Stand der Vorlage, z. B. „2026-10“. */
  stand: string;
  /**
   * Die Vorlage selbst. Erste Zeile = Titel. Abschnitte als „§ 1 Name“ oder
   * nummeriert („1. …“); Platzhalter in eckigen Klammern. Mindestens 1.500
   * Zeichen; endet mit Unterschriftsblock und dem HINWEIS-Absatz.
   */
  text: string;
}

export const VORLAGEN_HINWEIS =
  "HINWEIS: Diese Vorlage von GründerX (gruenderx.de) ist ein unverbindliches Muster und ersetzt keine " +
  "Rechts- oder Steuerberatung. Vor der Verwendung an den Einzelfall anpassen und im Zweifel prüfen lassen.";

/** Slug-Form, gleich mit dem Check-Constraint in vorlagen_leads. */
export const VORLAGEN_SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
