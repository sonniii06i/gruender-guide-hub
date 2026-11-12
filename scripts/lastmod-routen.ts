// Inhalts-Hash je Sitemap-Route (Grundlage fuer ein ehrliches <lastmod>).
//
// WOZU. lastmod soll nur dann springen, wenn sich die Seite wirklich geaendert
// hat – nie mit jedem Build. Dafuer steht in scripts/lastmod-manifest.json je
// Route { hash, lastmod }. Diese Datei berechnet den Hash; aendert er sich,
// setzt scripts/lastmod-aktualisieren.ts das Datum dieser EINEN Route auf heute.
// src/test/lastmodManifest.test.ts wird rot, wenn Manifest und Stand
// auseinanderlaufen. Befehl: bun run lastmod
//
// WAS IN DEN HASH EINGEHT.
//  - /tools/:slug      Eintrag aus features.ts (LANDING_TOOLS) + Text aus landingCopy.tools.ts
//  - /guides/:slug     Eintrag aus guides.ts (aus playbooks.ts abgeleitet) + Text aus landingCopy.guides.ts
//  - /vorlagen/:slug   Metadaten aus src/data/vorlagen/<kategorie>.ts + Datei inhalte/<slug>.ts
//  - /lexikon/:slug    Katalog-Eintrag aus src/data/lexikon/katalog.ts + Datei inhalte/<slug>.ts
//  - /vorlagen/kategorie/:key  Kategorie-Info + Liste ihrer Vorlagen (Slug, Titel, Kurztext)
//  - Gratis-Tools (/businessplan-erstellen …)  die Konfig-Datei in src/lib/freetools/
//  - eigene Seiten     die Seitenkomponente (SEITEN unten), Hubs zusaetzlich mit ihrer Liste
// Bewusst NICHT im Hash: gemeinsame Vorlagen-Komponenten (ToolLanding.tsx usw.),
// Layout und Styles – sonst bekaemen bei jeder Layout-Aenderung alle Seiten
// dasselbe Datum, und genau das soll lastmod nicht sein.
//
// NEUE SEITE. Datengetriebene Routen (Tool, Guide, Vorlage, Gratis-Tool) laufen
// von selbst mit. Eine neue eigene Seite in generate-sitemap.ts braucht eine Zeile
// in SEITEN; fehlt sie, meldet der Test die Route.

import { createHash } from "crypto";
import { existsSync, readFileSync, readdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { LANDING_TOOLS } from "../src/data/features";
import { GUIDE_LANDINGS } from "../src/data/guides";
import { GUIDE_COPY, TOOL_COPY } from "../src/data/landingCopy";
import { VORLAGEN, VORLAGEN_KATEGORIEN } from "../src/data/vorlagen";
import { ZIELGRUPPEN } from "../src/data/zielgruppen";
import { LEXIKON } from "../src/data/lexikon/katalog";
import { EIGENE_DATUMSLOGIK, festeRouten } from "./generate-sitemap";

export const WURZEL = join(dirname(fileURLToPath(import.meta.url)), "..");
export const MANIFEST_DATEI = "scripts/lastmod-manifest.json";
export const BEFEHL = "bun run lastmod";

export interface RoutenStand {
  /** sha256 (gekuerzt) ueber den Inhalt, der die Route ausmacht. */
  hash: string;
  /** Woher der Inhalt stammt; nur fuer den Git-Startwert (--start-aus-git). */
  quellen: Quelle[];
}

/**
 * Quelle einer Route fuer den Git-Startwert: eine ganze Datei (Pfad relativ zur
 * Repo-Wurzel) oder ein Eintrag in einer Sammeldatei. Beim Eintrag zaehlt nur der
 * letzte Commit, der SEINE Zeilen beruehrt hat (git log -L) – sonst bekaemen alle
 * 90 Tools das Datum der letzten Aenderung an irgendeinem Tool.
 */
export type Quelle =
  | string
  | {
      datei: string;
      /** Zeilenanfang, mit dem der Eintrag beginnt, z. B. `    slug: "werkvertrag",`. */
      anker: string;
      /** Regex (Quelltext) fuer den Beginn des naechsten Eintrags; der Eintrag endet davor. */
      grenze?: string;
      /** Feste Laenge in Zeilen statt `grenze` (z. B. 3 = Slug, Titel, Kurztext). */
      zeilen?: number;
    };

const SLUG_GRENZE = '^    slug: "';
const COPY_GRENZE = '^  "[^"]+": \\{';
const toolZeile = (slug: string): Quelle => ({ datei: "src/data/features.ts", anker: `      { slug: "${slug}",`, zeilen: 1 });
const copyBlock = (datei: string, slug: string): Quelle => ({ datei, anker: `  "${slug}": {`, grenze: COPY_GRENZE });
const playbookBlock = (slug: string): Quelle => ({ datei: "src/data/playbooks.ts", anker: `    slug: "${slug}",`, grenze: SLUG_GRENZE });
const vorlageBlock = (kategorie: string, slug: string, zeilen?: number): Quelle => ({
  datei: `src/data/vorlagen/${kategorie}.ts`,
  anker: `    slug: "${slug}",`,
  ...(zeilen ? { zeilen } : { grenze: SLUG_GRENZE }),
});
const kategorieBlock = (key: string): Quelle => ({ datei: "src/data/vorlagen/types.ts", anker: `    key: "${key}",`, grenze: '^    key: "|^\\];' });

export interface ManifestEintrag {
  hash: string;
  lastmod: string;
}

export interface Manifest {
  hinweis?: string;
  routen: Record<string, ManifestEintrag>;
}

/** Eigene Seitenkomponenten: Route → Dateien, deren Inhalt die Seite ausmacht. */
const SEITEN: Record<string, string[]> = {
  "/": ["src/pages/Index.tsx"],
  "/preise": ["src/pages/Preise.tsx"],
  "/tools": ["src/pages/Tools.tsx"],
  "/guides": ["src/pages/GuidesIndex.tsx"],
  "/gratis-tools": ["src/pages/GratisTools.tsx", "src/lib/freetools/index.ts"],
  "/vorlagen": ["src/pages/Vorlagen.tsx"],
  "/lexikon": ["src/pages/Lexikon.tsx"],
  "/hackathon-starter-kit": ["src/pages/HackathonStarterKit.tsx"],
  "/startup-guthaben": ["src/pages/StartupGuthaben.tsx"],
  "/ki-assistent": ["src/pages/KiAssistent.tsx"],
  "/gruendungsberatung": ["src/pages/GruendungsberatungFinden.tsx"],
  "/e-rechnung-lesen": ["src/pages/ERechnungLesen.tsx"],
  "/faq": ["src/pages/FAQ.tsx"],
  "/kontakt": ["src/pages/Kontakt.tsx"],
  "/partner": ["src/pages/Partner.tsx"],
  "/impressum": ["src/pages/Impressum.tsx"],
  "/datenschutz": ["src/pages/Datenschutz.tsx"],
  "/agb": ["src/pages/AGB.tsx"],
  "/widerruf": ["src/pages/Widerruf.tsx"],
  "/vertrag-widerrufen": ["src/pages/VertragWiderrufen.tsx"],
  "/kuendigen": ["src/pages/VertragKuendigen.tsx"],
  "/gruendungspaket": ["src/pages/Gruendungspaket.tsx"],
  "/vergleich/gruendung-selbst-steuerberater-gruenderx": ["src/pages/funnel/VergleichWege.tsx"],
};

const lies = (datei: string): string => readFileSync(join(WURZEL, datei), "utf8");

/** Funktionen (Icons, Lazy-Loader) fallen bei JSON.stringify weg – gewollt. */
const json = (wert: unknown): string => JSON.stringify(wert) ?? "null";

const sha = (teile: string[]): string => {
  const h = createHash("sha256");
  for (const t of teile) h.update(`${t.length}:`).update(t).update("\n");
  return h.digest("hex").slice(0, 16);
};

/** Gratis-Tool-Konfig zu einem Slug: die Datei in src/lib/freetools mit `slug: "<slug>"`. */
function freetoolDatei(slug: string): string | null {
  const ordner = "src/lib/freetools";
  for (const f of readdirSync(join(WURZEL, ordner)).sort()) {
    if (!f.endsWith(".ts") || f.endsWith(".test.ts")) continue;
    if (lies(`${ordner}/${f}`).includes(`slug: "${slug}"`)) return `${ordner}/${f}`;
  }
  return null;
}

/** Hub-Seiten zeigen eine Liste: Sie aendern sich auch, wenn ein Eintrag dazukommt oder umbenannt wird. */
function hubListe(path: string): { daten: string; quellen: Quelle[] } | null {
  if (path === "/tools") {
    return {
      daten: json(LANDING_TOOLS.map((t) => [t.slug, t.title, t.desc, t.categorySlug])),
      quellen: ["src/data/features.ts"],
    };
  }
  if (path === "/guides") {
    return {
      daten: json(GUIDE_LANDINGS.map((g) => [g.slug, g.title, g.tagline])),
      // Slug, Titel, Emoji, Icon, Tagline stehen in den ersten Zeilen des Playbooks.
      quellen: GUIDE_LANDINGS.map((g) => ({ datei: "src/data/playbooks.ts", anker: `    slug: "${g.slug}",`, zeilen: 5 })),
    };
  }
  if (path === "/vorlagen") {
    return {
      daten: json([
        VORLAGEN_KATEGORIEN.map((k) => [k.key, k.titel, k.kurz]),
        VORLAGEN.map((v) => [v.slug, v.titel, v.kurz, v.kategorie]),
      ]),
      quellen: [...VORLAGEN_KATEGORIEN.map((k) => kategorieBlock(k.key)), ...VORLAGEN.map((v) => vorlageBlock(v.kategorie, v.slug, 3))],
    };
  }
  if (path === "/lexikon") {
    return {
      daten: json(LEXIKON.map((b) => [b.slug, b.begriff, b.kurz, b.thema, b.stand])),
      quellen: ["src/data/lexikon/katalog.ts"],
    };
  }
  return null;
}

function standEinerRoute(path: string): RoutenStand | null {
  let m: RegExpMatchArray | null;

  if ((m = path.match(/^\/tools\/([^/]+)$/))) {
    const tool = LANDING_TOOLS.find((t) => t.slug === m![1]);
    if (!tool) return null;
    return {
      hash: sha(["tool", json(tool), json(TOOL_COPY[tool.slug] ?? null)]),
      quellen: [toolZeile(tool.slug), ...(TOOL_COPY[tool.slug] ? [copyBlock("src/data/landingCopy.tools.ts", tool.slug)] : [])],
    };
  }

  if ((m = path.match(/^\/guides\/([^/]+)$/))) {
    const guide = GUIDE_LANDINGS.find((g) => g.slug === m![1]);
    if (!guide) return null;
    return {
      hash: sha(["guide", json(guide), json(GUIDE_COPY[guide.slug] ?? null)]),
      quellen: [playbookBlock(guide.slug), ...(GUIDE_COPY[guide.slug] ? [copyBlock("src/data/landingCopy.guides.ts", guide.slug)] : [])],
    };
  }

  if ((m = path.match(/^\/vorlagen\/kategorie\/([^/]+)$/))) {
    const info = VORLAGEN_KATEGORIEN.find((k) => k.key === m![1]);
    if (!info) return null;
    const mitglieder = VORLAGEN.filter((v) => v.kategorie === info.key);
    const liste = mitglieder.map((v) => [v.slug, v.titel, v.kurz]);
    return {
      hash: sha(["vorlagen-kategorie", json(info), json(liste)]),
      quellen: [kategorieBlock(info.key), ...mitglieder.map((v) => vorlageBlock(v.kategorie, v.slug, 3))],
    };
  }

  if ((m = path.match(/^\/vorlagen\/([^/]+)$/))) {
    const v = VORLAGEN.find((x) => x.slug === m![1]);
    if (!v) return null;
    const inhalt = `src/data/vorlagen/inhalte/${v.slug}.ts`;
    if (!existsSync(join(WURZEL, inhalt))) return null;
    return {
      hash: sha(["vorlage", json(v), lies(inhalt)]),
      quellen: [vorlageBlock(v.kategorie, v.slug), inhalt],
    };
  }

  if ((m = path.match(/^\/lexikon\/([^/]+)$/))) {
    const b = LEXIKON.find((x) => x.slug === m![1]);
    if (!b) return null;
    const inhalt = `src/data/lexikon/inhalte/${b.slug}.ts`;
    if (!existsSync(join(WURZEL, inhalt))) return null;
    return {
      hash: sha(["lexikon", json(b), lies(inhalt)]),
      quellen: [inhalt, { datei: "src/data/lexikon/katalog.ts", anker: `    slug: "${b.slug}",`, grenze: SLUG_GRENZE }],
    };
  }

  const zielgruppe = ZIELGRUPPEN.find((z) => z.slug === path.slice(1));
  if (zielgruppe) {
    return { hash: sha(["zielgruppe", json(zielgruppe)]), quellen: [{ datei: "src/data/zielgruppen.ts", anker: `    slug: "${zielgruppe.slug}",`, grenze: SLUG_GRENZE }] };
  }

  const dateien = SEITEN[path];
  if (dateien) {
    if (dateien.some((d) => !existsSync(join(WURZEL, d)))) return null;
    const hub = hubListe(path);
    return {
      hash: sha(["seite", ...dateien.map(lies), ...(hub ? [hub.daten] : [])]),
      quellen: [...dateien, ...(hub ? hub.quellen : [])],
    };
  }

  const freetool = freetoolDatei(path.slice(1));
  if (freetool) return { hash: sha(["freetool", lies(freetool)]), quellen: [freetool] };

  return null;
}

/** Routen der Sitemap, die ihr lastmod aus dem Manifest beziehen (ohne Ratgeber und TAGESAKTUELL). */
export function manifestRouten(): string[] {
  return festeRouten()
    .map((e) => e.path)
    .filter((p) => !EIGENE_DATUMSLOGIK.includes(p));
}

/** Aktueller Stand je Route. `ohneQuelle` = Route, fuer die oben keine Regel greift. */
export function routenStand(): { stand: Record<string, RoutenStand>; ohneQuelle: string[] } {
  const stand: Record<string, RoutenStand> = {};
  const ohneQuelle: string[] = [];
  for (const path of manifestRouten()) {
    const s = standEinerRoute(path);
    if (s) stand[path] = s;
    else ohneQuelle.push(path);
  }
  return { stand, ohneQuelle };
}

export function liesManifest(): Manifest {
  const datei = join(WURZEL, MANIFEST_DATEI);
  if (!existsSync(datei)) return { routen: {} };
  const roh = JSON.parse(readFileSync(datei, "utf8")) as Partial<Manifest>;
  return { hinweis: roh.hinweis, routen: roh.routen ?? {} };
}

export interface Abweichung {
  path: string;
  art: "fehlt" | "hash-veraltet" | "route-entfaellt";
}

/** Vergleicht Manifest und Stand, ohne etwas zu schreiben. */
export function abweichungen(manifest: Manifest, stand: Record<string, RoutenStand>): Abweichung[] {
  const out: Abweichung[] = [];
  for (const [path, s] of Object.entries(stand)) {
    const e = manifest.routen[path];
    if (!e) out.push({ path, art: "fehlt" });
    else if (e.hash !== s.hash) out.push({ path, art: "hash-veraltet" });
  }
  for (const path of Object.keys(manifest.routen)) {
    if (!stand[path]) out.push({ path, art: "route-entfaellt" });
  }
  return out;
}
