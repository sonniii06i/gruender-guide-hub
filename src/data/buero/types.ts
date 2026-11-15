// ===================================================================
// Büro-Ausstattung (/buero): Kaufberatung für Gründer und Selbstständige,
// je Gerätegruppe eine Seite /buero/<slug>. Betreiber 15.11.2026: „Produkt-
// Bewertungsseiten für Büro-Sachen, mit Affiliate-Link, unten GründerX“.
//
// GRUNDSATZ (Kodex § 7, werbung-belegbar): Wir haben die Geräte NICHT getestet.
// Die Seiten vergleichen Datenblätter der Hersteller und sagen das offen.
// Keine Sterne, kein „Testsieger“, keine erfundenen Erfahrungen, keine
// Bewertungs-Auszeichnung im JSON-LD.
//
// AUFBAU (wie das Lexikon):
//  - katalog.ts          ein Eintrag je Seite: Slug, Titel, SEO, Stand
//  - inhalte/<slug>.ts   Auswahl, Produktdaten, Kaufberatung (wird nachgeladen)
//  - preise.json         Preis, Händlerlink und Bild je EAN aus den Händler-Feeds
//                        (Stand-Datum in der Datei; nie von Hand tippen)
//
// Diese Dateien importieren KEINE React-Module und keinen "@/"-Alias: Sie
// werden auch von scripts/generate-sitemap.ts und scripts/lastmod-routen.ts gelesen.
// ===================================================================

import type { LexikonAbschnitt, LexikonKontextLink, LexikonQuelle } from "../lexikon/types";

export const BUERO_SLUG_RE = /^[a-z0-9-]+$/;

export interface BueroDatum {
  /** z. B. „Drucktechnik“, „Duplex“, „Anschlüsse“ */
  label: string;
  /** Wert aus dem Datenblatt des Herstellers, mit Einheit */
  wert: string;
}

export interface BueroProdukt {
  /** kebab-case, eindeutig auf der Seite (Anker #<id>) */
  id: string;
  /** Hersteller + Modell wie im Datenblatt, ohne Werbezusätze */
  name: string;
  marke: string;
  /** EAN aus der Kandidatenliste; darüber kommen Preis, Händlerlink und Bild aus preise.json */
  ean: string;
  /** Für wen das Gerät gedacht ist, höchstens 40 Zeichen, z. B. „Für die meisten Büros“. Kein „Testsieger“, kein „Bester“. */
  rolle: string;
  /** 1–2 Sätze: für wen und warum, belegt durch die Daten darunter */
  kurz: string;
  /** 5–8 Kerndaten aus dem Datenblatt; die Labels aus `vergleich` müssen bei jedem Produkt vorkommen */
  daten: BueroDatum[];
  /** 2–4 Stärken, jede aus dem Datenblatt ableitbar */
  plus: string[];
  /** 1–3 Grenzen, jede aus dem Datenblatt ableitbar */
  minus: string[];
  /** Offizielle Produktseite oder Datenblatt des Herstellers, am Stand-Tag abgerufen */
  datenblatt: { titel: string; url: string };
}

export interface BueroInhalt {
  /** Antwort zuerst: 2–3 Sätze, welches Gerät für wen passt (Klartext, Links als [[/pfad|Anker]] erlaubt) */
  antwort: string;
  /** 2–4 Sätze: nach welchen Kriterien ausgewählt wurde und dass es ein Datenblatt-Vergleich ist */
  auswahl: string;
  /** 3–5 Labels aus `daten`, die die Vergleichstabelle zeigt */
  vergleich: string[];
  /** 4–6 Geräte, Reihenfolge = Reihenfolge auf der Seite */
  produkte: BueroProdukt[];
  /** Kaufberatung: 4–6 Abschnitte, H2 möglichst als Frage (gleiche Bausteine wie im Lexikon) */
  abschnitte: LexikonAbschnitt[];
  /** 2–4 passende GründerX-Seiten (Tool, Guide, Ratgeber, Lexikon) */
  kontext: LexikonKontextLink[];
  /** Weitere Quellen außer den Datenblättern (Normen, Herstellerangaben), am Stand-Tag abgerufen */
  quellen: LexikonQuelle[];
}

export interface BueroSeite {
  slug: string;
  /** H1 */
  titel: string;
  /** Name in Listen und im Brotkrumen, z. B. „Drucker“ */
  name: string;
  /** Ein Satz für den Hub (60–170 Zeichen) */
  kurz: string;
  /** Title ≤ 60 Zeichen, Description 120–160 Zeichen */
  seo: { title: string; description: string };
  veroeffentlicht: string;
  /** Letzte inhaltliche Prüfung der Datenblätter, JJJJ-MM-TT (sichtbar als „Stand“) */
  stand: string;
  inhalt: () => Promise<{ default: BueroInhalt }>;
}

export interface BueroAngebot {
  haendler: string;
  /** Produktseite beim Händler (ohne Partner-Parameter; der Partnerlink entsteht in config/partnerLinks.ts) */
  url: string;
  /** Preis in Euro inkl. USt laut Händler-Feed */
  preis: number;
}

export interface BueroPreise {
  /** Tag des Feed-Abrufs, JJJJ-MM-TT */
  stand: string;
  produkte: Record<string, { bild?: string; angebote: BueroAngebot[] }>;
}
