// ===================================================================
// Lexikon (/lexikon): Gründer- und Händler-Begriffe, je Begriff eine Seite
// /lexikon/<slug>. Betreiber 12.11.2026: „Nischen-Vokabular-Erklärungen oder
// Tipps, z. B. Smoke Test, was das ist“.
//
// AUFBAU (wie die Vorlagen-Bibliothek):
//  - katalog.ts          ein Eintrag je Begriff: Slug, Titel, SEO, Thema, Stand
//  - inhalte/<slug>.ts   der Text der Seite (wird nachgeladen)
//
// NEUER BEGRIFF: siehe Kopf von katalog.ts.
//
// Diese Dateien importieren KEINE React-Module und keinen "@/"-Alias: Sie
// werden auch von scripts/generate-sitemap.ts und scripts/lastmod-routen.ts
// gelesen (Sitemap, Prerender-Liste, lastmod).
// ===================================================================

export const LEXIKON_SLUG_RE = /^[a-z0-9-]+$/;

export type LexikonThema = "idee-testen" | "finanzen" | "kennzahlen" | "pflichten-handel";

export interface LexikonThemaInfo {
  key: LexikonThema;
  titel: string;
  kurz: string;
}

/** Reihenfolge = Reihenfolge der Gruppen auf /lexikon. */
export const LEXIKON_THEMEN: LexikonThemaInfo[] = [
  {
    key: "idee-testen",
    titel: "Idee testen",
    kurz: "Nachfrage prüfen, bevor Geld in Produkt, Lager oder Entwicklung fließt.",
  },
  {
    key: "finanzen",
    titel: "Finanzen & Liquidität",
    kurz: "Wie lange das Geld reicht und woran du das früh erkennst.",
  },
  {
    key: "kennzahlen",
    titel: "Kennzahlen für Shop, SaaS & Abo",
    kurz: "Die Zahlen, mit denen Gründer und Investoren ein Geschäftsmodell beurteilen.",
  },
  {
    key: "pflichten-handel",
    titel: "Pflichten im Online-Handel",
    kurz: "Register, Meldepflichten und Kennzeichnungen, die Händler in Deutschland betreffen.",
  },
];

/**
 * Baustein eines Abschnitts. Texte sind reiner Text ohne HTML und ohne Markdown.
 * Einzige Auszeichnung: interne Links als [[/pfad|Ankertext]] (nur öffentliche,
 * indexierbare Ziele – der Test prüft jedes Ziel).
 */
export type LexikonBlock =
  | { art: "text"; text: string }
  | { art: "liste"; punkte: string[] }
  | { art: "formel"; text: string }
  | { art: "tabelle"; kopf: string[]; zeilen: string[][] }
  | { art: "hinweis"; text: string };

export interface LexikonAbschnitt {
  /** H2 der Seite, möglichst als Frage. */
  titel: string;
  bloecke: LexikonBlock[];
}

export interface LexikonKontextLink {
  /** Öffentliche GründerX-Seite (Tool, Guide, Ratgeber, Vorlage). */
  pfad: string;
  label: string;
  /** Ein Satz: wozu die Seite beim Begriff hilft. */
  text: string;
}

export interface LexikonQuelle {
  titel: string;
  url: string;
}

export interface LexikonInhalt {
  /** Erster Absatz der Seite: eigenständige Definition in 1–2 Sätzen. */
  definition: string;
  abschnitte: LexikonAbschnitt[];
  /** Slugs anderer Lexikon-Begriffe (2–6). */
  verwandt: string[];
  /** 2–4 passende Tools, Guides, Ratgeber oder Vorlagen. */
  kontext: LexikonKontextLink[];
  /** Primärquellen, am Tag `stand` live abgerufen. */
  quellen: LexikonQuelle[];
}

export interface LexikonBegriff {
  slug: string;
  /** H1 und Name in Listen. */
  begriff: string;
  /** Ein Satz für Hub und „Verwandte Begriffe“ (60–170 Zeichen). */
  kurz: string;
  thema: LexikonThema;
  /** Title ≤ 60 Zeichen, Begriff vorn; Description 120–160 Zeichen. */
  seo: { title: string; description: string };
  /** Erstveröffentlichung, JJJJ-MM-TT. */
  veroeffentlicht: string;
  /** Letzte inhaltliche Prüfung, JJJJ-MM-TT (sichtbar als „Stand“). */
  stand: string;
  /** true = Rechts-/Steuerthema: Seite zeigt den Hinweis „kein Ersatz für Beratung“ zusätzlich oben. */
  rechtsthema?: boolean;
  /**
   * Bestandsseiten (mind. 2), die auf diesen Begriff verlinken: /tools/<slug>,
   * /guides/<slug> oder /ratgeber/<slug>. Diese Seiten zeigen den Kasten
   * „Begriffe im Lexikon“ (components/lexikon/LexikonVerweise.tsx).
   */
  verlinktVon: string[];
  inhalt: () => Promise<{ default: LexikonInhalt }>;
}

/** Interner Link im Fließtext: [[/pfad|Ankertext]]. */
export const LEXIKON_LINK_RE = /\[\[(\/[^|\]\s]*)\|([^\]]+)\]\]/g;

/** Text ohne Link-Auszeichnung (für Wortzahl, Meta, JSON-LD). */
export function lexikonKlartext(text: string): string {
  return text.replace(LEXIKON_LINK_RE, "$2");
}

/** Alle Texte eines Inhalts in Lesereihenfolge (für Wortzahl und Prüfungen). */
export function lexikonTexte(inhalt: LexikonInhalt): string[] {
  const out: string[] = [inhalt.definition];
  for (const a of inhalt.abschnitte) {
    out.push(a.titel);
    for (const b of a.bloecke) {
      if (b.art === "liste") out.push(...b.punkte);
      else if (b.art === "tabelle") out.push(...b.kopf, ...b.zeilen.flat());
      else out.push(b.text);
    }
  }
  return out;
}

export function lexikonWortzahl(inhalt: LexikonInhalt): number {
  return lexikonTexte(inhalt)
    .map(lexikonKlartext)
    .join(" ")
    .trim()
    .split(/\s+/).length;
}

/** Interne Linkziele aus dem Fließtext. */
export function lexikonTextLinks(inhalt: LexikonInhalt): string[] {
  const out: string[] = [];
  for (const t of lexikonTexte(inhalt)) for (const m of t.matchAll(LEXIKON_LINK_RE)) out.push(m[1]);
  return out;
}
