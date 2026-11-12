/**
 * Postbuild (nach prerender.mjs): hebt <lastmod>, wenn sich die gerenderte
 * Seite nachweislich geändert hat (Betreiber 11.11.2026: „lastmod … fix go“).
 *
 * WER MACHT WAS (zwei Stufen, kein Konkurrenzmechanismus):
 *  1. prebuild – scripts/generate-sitemap.ts setzt den AUSGANGSWERT je Route:
 *     Ratgeber updated_at, /ratgeber neuester Ratgeber, /gruender-events und
 *     /gruender-chancen Build-Datum (TAGESAKTUELL), alle festen Routen aus dem
 *     eingecheckten scripts/lastmod-manifest.json (Quelltext-Hash + Git-Datum,
 *     Pflege `bun run lastmod`, Hash-Regeln scripts/lastmod-routen.ts).
 *     Das Manifest sieht bewusst nur die eigene Quelle einer Route, nicht
 *     gemeinsame Komponenten oder Daten aus Supabase.
 *  2. postbuild – DIESES Skript vergleicht den Hash der prerenderten Seite mit
 *     dem Stand der Live-Seite (https://gruenderx.de/lastmod.json) und HEBT das
 *     Datum nur, wenn sich der gerenderte Hauptinhalt geändert hat und das
 *     vorhandene Datum älter ist (z. B. geänderte gemeinsame Vorlage, neue
 *     Links aus Daten). Es senkt nie ein Datum und setzt nie pauschal heute.
 *
 * Hash: <title>, Meta-Description, Canonical, Robots-Meta und sichtbarer Text
 * des Hauptinhalts <main> (ohne script/style/noscript/svg/Kommentare,
 * Leerzeichen normalisiert). Kopfzeile, Navigation und Fußzeile zählen nicht –
 * eine Menü- oder Footer-Änderung ist laut Google keine wesentliche Änderung
 * und würde sonst alle 331 URLs auf dasselbe Datum setzen. Ohne <main> (derzeit
 * /gratis-tools, /gruender-events): Body ohne erste <header> und letzte <footer>.
 * Asset-/Bundle-Namen stehen nur in Attributen und ändern den Hash nicht.
 *
 * Vorheriger Stand ({"<pfad>": {"h": "<hash>", "d": "JJJJ-MM-TT"}}):
 *  - OK: Hash gleich → bisheriges Datum; Hash geändert → heute (Europe/Berlin);
 *    Route neu im Stand → vorhandenes Datum, sonst heute.
 *  - 404 oder HTML (404.html bzw. früherer SPA-Fallback) = Erstlauf: vorhandene Daten
 *    bleiben, nur Routen ohne Datum bekommen heute.
 *  - Netzfehler/sonstiger Status: kein Datum erfinden, vorhandene bleiben.
 *  Ergebnis immer das spätere von vorhandenem Datum und Hash-Datum.
 * Ausgabe: dist/sitemap.xml (nur <lastmod> geändert/ergänzt), dist/lastmod.json
 * (nicht in der Sitemap, nirgends verlinkt, X-Robots-Tag noindex in vercel.json).
 *
 * Darf den Build nie scheitern lassen: jeder Fehler → Warnung, Sitemap bleibt
 * unverändert, Exit 0.
 *
 * Flüchtige Inhalte (Messung 11.11.2026, 345 prerenderte Seiten, 331 in der Sitemap):
 *  - Drei Builds ohne Code-Änderung: 36 HTML-Dateien unterscheiden sich roh,
 *    nur durch Radix-Zufalls-IDs (aria-controls="radix-:rN:") und die
 *    Reihenfolge der <link rel="modulepreload"> im Head. Beides steht in
 *    Attributen bzw. Links und fließt nicht in den Hash: 331/331 Hashes gleich.
 *  - Prerender mit vorgestellter Uhr (+3 und +40 Tage): nur /gruender-events
 *    und /gruender-chancen ändern sich (abgelaufene Termine fallen raus, Zähler
 *    in Titel/Description) – das ist eine echte Änderung, neues Datum korrekt.
 *  Deshalb ist FLUECHTIG derzeit leer. Neue Regel nur nach gleicher Messung.
 *
 * Tests: src/test/lastmod.test.ts (reine Logik, ohne Netz/Dateisystem).
 */
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const BASE_URL = "https://gruenderx.de";
export const STAND_URL = `${BASE_URL}/lastmod.json`;
const STAND_TIMEOUT_MS = 10_000;

const DATUM_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Flüchtige Textteile, die nichts über eine echte Inhaltsänderung sagen.
 * Jede Regel mit Grund; neue nur nach Messung (zwei Builds, Text-Diff).
 * @type {Array<{ re: RegExp, grund: string }>}
 */
export const FLUECHTIG = [];

/** Heutiges Datum in Europe/Berlin als JJJJ-MM-TT. */
export function heuteBerlin(jetzt = new Date()) {
  const teile = new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(jetzt);
  const t = (typ) => teile.find((x) => x.type === typ)?.value;
  return `${t("year")}-${t("month")}-${t("day")}`;
}

/** <loc>-URL → Pfad wie prerender.mjs (ohne Host, ohne Slash am Ende, "/" bleibt). */
export function pfadAusLoc(loc) {
  const m = /^https?:\/\/[^/]+(\/.*)?$/.exec(loc.trim());
  if (!m) return null;
  const p = (m[1] || "/").split("#")[0].split("?")[0];
  return p.replace(/\/$/, "") || "/";
}

/** Pfad → prerenderte Datei in dist/ (so schreibt prerender.mjs sie). */
export function dateiFuerPfad(dist, pfad) {
  if (pfad === "/") return join(dist, "index.html");
  let p = pfad;
  try {
    p = decodeURIComponent(pfad);
  } catch {
    /* Pfad bleibt roh */
  }
  return join(dist, ...p.split("/").filter(Boolean), "index.html");
}

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function entitiesAufloesen(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === "#") {
      const n = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : m;
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

const ws = (s) => s.replace(/\s+/g, " ").trim();

function attr(tag, name) {
  const m = new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i").exec(tag);
  if (!m) return "";
  return entitiesAufloesen(m[2] ?? m[3] ?? m[4] ?? "");
}

function metaInhalt(head, name) {
  for (const m of head.matchAll(/<meta\b[^>]*>/gi)) {
    if (attr(m[0], "name").toLowerCase() === name) return ws(attr(m[0], "content"));
  }
  return "";
}

/**
 * Hauptinhalt des Body: <main>…</main>; ohne <main> der Body ohne die erste
 * <header> (Kopfzeile/Navigation) und die letzte <footer> (Fußzeile).
 */
export function hauptinhalt(body) {
  const start = body.search(/<main\b/i);
  const ende = body.toLowerCase().lastIndexOf("</main>");
  if (start >= 0 && ende > start) return body.slice(start, ende + "</main>".length);
  let rest = body.replace(/<header\b[\s\S]*?<\/header\s*>/i, " ");
  const fuss = rest.toLowerCase().lastIndexOf("<footer");
  if (fuss >= 0) {
    const fussEnde = rest.toLowerCase().indexOf("</footer>", fuss);
    if (fussEnde > fuss) rest = rest.slice(0, fuss) + " " + rest.slice(fussEnde + "</footer>".length);
  }
  return rest;
}

/**
 * Hash-relevanter Inhalt einer prerenderten Seite, oder null, wenn die Datei
 * keine prerenderte Seite ist (leere App-Hülle: #root ohne Inhalt).
 */
export function seitenInhalt(html, fluechtig = FLUECHTIG) {
  if (typeof html !== "string" || !html) return null;
  if (/<div id="root">\s*<\/div>/.test(html)) return null;
  const headEnde = html.search(/<body\b/i);
  const head = headEnde >= 0 ? html.slice(0, headEnde) : html;
  const titel = ws(entitiesAufloesen((/<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(head)?.[1] ?? "")));
  const beschreibung = metaInhalt(head, "description");
  const robots = metaInhalt(head, "robots");
  let canonical = "";
  for (const m of head.matchAll(/<link\b[^>]*>/gi)) {
    if (attr(m[0], "rel").toLowerCase() === "canonical") {
      canonical = attr(m[0], "href").trim();
      break;
    }
  }
  let body = /<body\b[^>]*>([\s\S]*)<\/body>/i.exec(html)?.[1] ?? (headEnde >= 0 ? html.slice(headEnde) : "");
  body = body
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|noscript|svg|template)\b[\s\S]*?<\/\1\s*>/gi, " ");
  body = hauptinhalt(body).replace(/<[^>]+>/g, " ");
  let text = ws(entitiesAufloesen(body));
  for (const { re } of fluechtig) text = text.replace(re, "·");
  text = ws(text);
  if (!text && !titel) return null;
  return [`title:${titel}`, `description:${beschreibung}`, `canonical:${canonical}`, `robots:${robots}`, `text:${text}`].join("\n");
}

/** Inhalts-Hash (sha256, 16 Hex-Zeichen) oder null ohne prerenderte Seite. */
export function inhaltsHash(html, fluechtig = FLUECHTIG) {
  const inhalt = seitenInhalt(html, fluechtig);
  if (inhalt === null) return null;
  return createHash("sha256").update(inhalt).digest("hex").slice(0, 16);
}

/**
 * Antwort auf den Abruf von /lastmod.json deuten.
 * @returns {{ art: "ok", stand: Record<string, {h: string, d: string}> } | { art: "erstlauf" } | { art: "fehler", grund: string }}
 */
export function standDeuten(status, contentType, body) {
  if (status === 404) return { art: "erstlauf" };
  if (status !== 200) return { art: "fehler", grund: `HTTP ${status}` };
  const text = typeof body === "string" ? body.trim() : "";
  // HTML statt JSON (früher Catch-all → app-shell.html mit 200) = Erstlauf.
  if (/text\/html/i.test(contentType || "") || text.startsWith("<")) return { art: "erstlauf" };
  let roh;
  try {
    roh = JSON.parse(text);
  } catch {
    return { art: "fehler", grund: "kein JSON" };
  }
  if (!roh || typeof roh !== "object" || Array.isArray(roh)) return { art: "fehler", grund: "JSON ohne Objekt" };
  const stand = {};
  for (const [pfad, e] of Object.entries(roh)) {
    if (!e || typeof e !== "object") continue;
    if (typeof e.h !== "string" || !e.h) continue;
    if (typeof e.d !== "string" || !DATUM_RE.test(e.d)) continue;
    stand[pfad] = { h: e.h, d: e.d };
  }
  return { art: "ok", stand };
}

const spaeter = (a, b) => (!a ? b : !b ? a : a >= b ? a : b);

/**
 * Datum für eine URL bestimmen.
 * @param {object} p
 * @param {string|null} p.hash        Inhalts-Hash dieses Builds (null = keine prerenderte Seite)
 * @param {string|undefined} p.vorhanden  lastmod aus generate-sitemap.ts (z. B. Ratgeber updated_at)
 * @param {{h: string, d: string}|undefined} p.vorher  Eintrag aus dem vorherigen lastmod.json
 * @param {"ok"|"erstlauf"|"fehler"} p.art
 * @param {string} p.heute            JJJJ-MM-TT (Europe/Berlin)
 * @returns {{ lastmod: string|undefined, eintrag: {h: string, d: string}|undefined, grund: string }}
 */
export function lastmodBestimmen({ hash, vorhanden, vorher, art, heute }) {
  const vh = vorhanden && DATUM_RE.test(vorhanden) ? vorhanden : undefined;
  if (art === "ok") {
    if (!hash) {
      // Keine prerenderte Seite in diesem Build: nichts über Änderungen bekannt,
      // bisherigen Stand unverändert weitertragen.
      const d = spaeter(vh, vorher?.d);
      return { lastmod: d, eintrag: vorher ? { h: vorher.h, d: spaeter(vorher.d, vh) } : undefined, grund: "ohne Hash" };
    }
    if (!vorher) {
      // Route neu im Stand: keine Messung gegen live – wie Erstlauf für diese Route.
      const d = vh ?? heute;
      return { lastmod: d, eintrag: { h: hash, d }, grund: vh ? "neu, vorhanden" : "neu" };
    }
    const gleich = vorher.h === hash;
    const d = spaeter(vh, gleich ? vorher.d : heute);
    return { lastmod: d, eintrag: { h: hash, d }, grund: gleich ? "gleich" : "geändert" };
  }
  if (art === "erstlauf") {
    if (!hash) return { lastmod: vh, eintrag: undefined, grund: "ohne Hash" };
    const d = vh ?? heute;
    return { lastmod: d, eintrag: { h: hash, d }, grund: vh ? "erstlauf, vorhanden" : "erstlauf" };
  }
  // fehler: kein Datum erfinden.
  return { lastmod: vh, eintrag: hash && vh ? { h: hash, d: vh } : undefined, grund: "stand fehlt" };
}

/**
 * lastmod in die Sitemap schreiben. Nur <lastmod> wird gesetzt/ersetzt, alles
 * andere bleibt Byte für Byte. Ein vorhandenes lastmod ohne neues Datum bleibt.
 * @param {string} xml
 * @param {(pfad: string, vorhanden: string|undefined) => string|undefined} datumFuer
 */
export function sitemapMitLastmod(xml, datumFuer) {
  return xml.replace(/<url>([\s\S]*?)<\/url>/g, (block, inner) => {
    const loc = /<loc>([^<]+)<\/loc>/.exec(inner)?.[1];
    const pfad = loc ? pfadAusLoc(loc) : null;
    if (!pfad) return block;
    const vorhanden = /<lastmod>([^<]+)<\/lastmod>/.exec(inner)?.[1]?.trim();
    const d = datumFuer(pfad, vorhanden);
    if (!d || d === vorhanden) return block;
    if (vorhanden !== undefined) return block.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${d}</lastmod>`);
    return block.replace(/(\n?([ \t]*)<loc>[^<]*<\/loc>)/, (m, ganz, einzug) => `${ganz}\n${einzug}<lastmod>${d}</lastmod>`);
  });
}

/** Vorhandene lastmod je Pfad aus der Sitemap. */
export function vorhandeneLastmods(xml) {
  const out = new Map();
  for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = /<loc>([^<]+)<\/loc>/.exec(m[1])?.[1];
    const pfad = loc ? pfadAusLoc(loc) : null;
    if (!pfad) continue;
    out.set(pfad, /<lastmod>([^<]+)<\/lastmod>/.exec(m[1])?.[1]?.trim());
  }
  return out;
}

async function standHolenEinmal(url) {
  try {
    const r = await fetch(url, {
      signal: AbortSignal.timeout(STAND_TIMEOUT_MS),
      headers: { accept: "application/json", "cache-control": "no-cache" },
      redirect: "follow",
    });
    const body = await r.text();
    return { ...standDeuten(r.status, r.headers.get("content-type") || "", body), status: r.status };
  } catch (e) {
    return { art: "fehler", grund: `Netz: ${e?.name || ""} ${e?.message || e}`.trim() };
  }
}

/** Ein zweiter Versuch nach Netzfehler oder 5xx; 404/HTML/JSON gelten sofort. */
async function standHolen(url) {
  const erst = await standHolenEinmal(url);
  if (erst.art !== "fehler" || (erst.status && erst.status < 500)) return erst;
  await new Promise((r) => setTimeout(r, 2_000));
  return standHolenEinmal(url);
}

export async function main({ dist, standUrl = STAND_URL, jetzt = new Date(), log = console } = {}) {
  const sitemapPfad = join(dist, "sitemap.xml");
  if (!existsSync(sitemapPfad)) {
    log.warn("[lastmod] ⚠ dist/sitemap.xml fehlt – übersprungen.");
    return null;
  }
  const xml = await readFile(sitemapPfad, "utf8");
  const vorhanden = vorhandeneLastmods(xml);
  if (vorhanden.size === 0) {
    log.warn("[lastmod] ⚠ keine <loc> in dist/sitemap.xml – übersprungen.");
    return null;
  }
  const heute = heuteBerlin(jetzt);
  const stand = await standHolen(standUrl);
  const vorher = stand.art === "ok" ? stand.stand : {};

  const zaehler = {};
  const zaehle = (k) => (zaehler[k] = (zaehler[k] || 0) + 1);
  const ergebnis = new Map();
  const neuStand = {};
  for (const [pfad, vh] of vorhanden) {
    let hash = null;
    const datei = dateiFuerPfad(dist, pfad);
    if (existsSync(datei)) {
      try {
        hash = inhaltsHash(await readFile(datei, "utf8"));
      } catch (e) {
        log.warn(`[lastmod] ⚠ ${pfad}: Datei nicht lesbar (${e.message})`);
      }
    }
    const r = lastmodBestimmen({ hash, vorhanden: vh, vorher: vorher[pfad], art: stand.art, heute });
    zaehle(r.grund);
    if (!r.lastmod) zaehle("ohne lastmod");
    if (!hash) log.warn(`[lastmod] ⚠ ${pfad}: keine prerenderte Seite – ${r.lastmod ? `Datum ${r.lastmod} weitergetragen` : "ohne lastmod"}`);
    ergebnis.set(pfad, r.lastmod);
    if (r.eintrag) neuStand[pfad] = r.eintrag;
  }

  const neuXml = sitemapMitLastmod(xml, (pfad, vh) => ergebnis.get(pfad) ?? vh);
  const mitLastmod = [...vorhandeneLastmods(neuXml).values()].filter(Boolean).length;
  await writeFile(join(dist, "lastmod.json"), JSON.stringify(neuStand) + "\n", "utf8");
  await writeFile(sitemapPfad, neuXml, "utf8");
  const standText = stand.art === "fehler" ? `fehler (${stand.grund})` : stand.art;
  log.log(
    `[lastmod] Stand ${standText}, heute ${heute}: ${vorhanden.size} URLs, ${mitLastmod} mit lastmod – ` +
      Object.entries(zaehler)
        .map(([k, v]) => `${k} ${v}`)
        .join(", "),
  );
  return { stand: stand.art, zaehler, mitLastmod, urls: vorhanden.size };
}

const istDirekt = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (istDirekt) {
  const dist = process.env.LASTMOD_DIST || join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
  // LASTMOD_STAND_URL nur für lokale Prüfungen (z. B. Doppel-Build gegen einen lokalen Stand).
  main({ dist, standUrl: process.env.LASTMOD_STAND_URL || STAND_URL })
    .catch((e) => {
      // Nie den Build scheitern lassen. writeFile der Sitemap kommt zuletzt –
      // bei einem Fehler davor bleibt sie unverändert.
      console.warn(`[lastmod] ⚠ übersprungen, Sitemap unverändert: ${e?.stack || e}`);
    })
    .finally(() => process.exit(0));
}
