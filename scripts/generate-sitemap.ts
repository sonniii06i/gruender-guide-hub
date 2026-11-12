// Runs before `vite dev` and `vite build` (predev/prebuild hooks).
// Writes public/sitemap.xml with all public, INDEXABLE routes only:
// static public pages + every öffentliche Tool-Landing (/tools/:slug) + every
// published Blog-Post.
// NICHT enthalten: /playbook/* und /anbieter/* — diese liegen hinter der
// PaywallGate und zeigen Crawlern nur die Upsell-Wand (Thin/Duplicate Content),
// daher in robots.txt blockiert und bewusst aus der Sitemap raus.

import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { LANDING_TOOLS } from "../src/data/features";
import { GUIDE_LANDINGS } from "../src/data/guides";
import { isMergedGuide } from "../src/data/guideMerges";
import { fremdKanonisch } from "../src/data/ratgeberKanonisch";
import { VORLAGEN, VORLAGEN_KATEGORIEN } from "../src/data/vorlagen";
import { LEXIKON } from "../src/data/lexikon/katalog";

const BASE_URL = "https://gruenderx.de";
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://rwrjuzemkfghlziretdj.supabase.co";
const SUPABASE_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3cmp1emVta2ZnaGx6aXJldGRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MTYxMjcsImV4cCI6MjA5MzQ5MjEyN30.2zNrmQwqHyrrhhetpdOjEWbFZ9FZIh8X0KLE4wFYr6U";

export interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const today = new Date().toISOString().slice(0, 10);

// lastmod nur, wo es stimmt (SEO-Runde 17.10.2026, Manifest seit 11.11.2026):
// Google ignoriert lastmod einer Sitemap, deren Werte erkennbar nicht stimmen —
// dann zaehlt auch das echte Datum der Ratgeber (updated_at aus blog_posts)
// nicht mehr. Deshalb nie pauschal das Build-Datum:
//  - Ratgeber: updated_at; /ratgeber: neuestes Ratgeber-Datum
//  - TAGESAKTUELL (/gruender-events, /gruender-chancen): Build-Datum, der
//    taegliche Sync-Commit aendert diese Seiten wirklich
//  - alle anderen Routen: scripts/lastmod-manifest.json. Dort steht je Route
//    der Hash ihres Inhalts und der Tag, an dem er sich zuletzt geaendert hat
//    (Hash-Regeln: scripts/lastmod-routen.ts, Pflege: `bun run lastmod`,
//    Pruefung: src/test/lastmodManifest.test.ts). Route ohne Eintrag = kein lastmod.
// Das Manifest ist eingecheckt, weil Vercel mit flachem Klon baut und die
// Git-Historie dort fehlt. Deshalb hier auch KEIN lastmod an den Eintraegen.

/** Seiten, die ein taeglicher Sync-Commit wirklich aendert: lastmod = Build-Datum. */
export const TAGESAKTUELL: readonly string[] = ["/gruender-events", "/gruender-chancen"];

/** Routen mit eigener Datumslogik (siehe oben); sie stehen nicht im lastmod-Manifest. */
export const EIGENE_DATUMSLOGIK: readonly string[] = ["/ratgeber", ...TAGESAKTUELL];

export const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  // Preisseite: steht hier, damit prerender.mjs sie rendert (Inhalt ohne JS im HTML).
  { path: "/preise", changefreq: "monthly", priority: "0.9" },
  { path: "/tools", changefreq: "weekly", priority: "0.9" },
  { path: "/guides", changefreq: "weekly", priority: "0.9" },
  { path: "/gratis-tools", changefreq: "weekly", priority: "0.9" },
  { path: "/vorlagen", changefreq: "weekly", priority: "0.9" },
  { path: "/businessplan-erstellen", changefreq: "weekly", priority: "0.8" },
  { path: "/gruendungskosten-rechner", changefreq: "weekly", priority: "0.8" },
  { path: "/rechtsform-finden", changefreq: "weekly", priority: "0.8" },
  { path: "/influencer", changefreq: "weekly", priority: "0.9" },
  { path: "/tiktok-shop", changefreq: "weekly", priority: "0.9" },
  { path: "/influencer-steuer-check", changefreq: "weekly", priority: "0.8" },
  { path: "/tiktok-shop-checkliste", changefreq: "weekly", priority: "0.8" },
  { path: "/pr-paket-rechner", changefreq: "weekly", priority: "0.8" },
  { path: "/ust-id-beantragen", changefreq: "weekly", priority: "0.8" },
  { path: "/elster-zertifikat-beantragen", changefreq: "weekly", priority: "0.8" },
  // Die zwei Amazon-Widerspruchsgeneratoren stehen NICHT mehr hier: Canonical
  // zeigt auf anwaltx.de (Themenbesitz). Prerender ueber EXTRA_ROUTES in prerender.mjs.
  { path: "/ratgeber", changefreq: "daily", priority: "0.9" },
  // Lexikon-Hub; die Begriffe folgen als lexikonEntries aus src/data/lexikon/katalog.ts
  { path: "/lexikon", changefreq: "weekly", priority: "0.8" },
  { path: "/gruender-events", changefreq: "daily", priority: "0.8" },
  { path: "/gruender-chancen", changefreq: "daily", priority: "0.9" },
  { path: "/hackathon-starter-kit", changefreq: "monthly", priority: "0.7" },
  { path: "/startup-guthaben", changefreq: "weekly", priority: "0.8" },
  { path: "/ki-assistent", changefreq: "monthly", priority: "0.8" },
  { path: "/gruendungsberatung", changefreq: "daily", priority: "0.8" },
  { path: "/e-rechnung-lesen", changefreq: "monthly", priority: "0.8" },
  { path: "/faq", changefreq: "monthly", priority: "0.6" },
  { path: "/kontakt", changefreq: "yearly", priority: "0.4" },
  { path: "/partner", changefreq: "monthly", priority: "0.6" },
  { path: "/impressum", changefreq: "yearly", priority: "0.2" },
  { path: "/datenschutz", changefreq: "yearly", priority: "0.2" },
  { path: "/agb", changefreq: "yearly", priority: "0.2" },
  // Muss in der Sitemap stehen: prerender.mjs zieht seine Routenliste genau
  // daraus. Fehlt die Seite hier, liefert sie Prüfern der Verkaufsplattformen
  // (CopeCart/Digistore24/elopage) eine leere Seite ohne JavaScript aus.
  { path: "/widerruf", changefreq: "yearly", priority: "0.2" },
  { path: "/vertrag-widerrufen", changefreq: "yearly", priority: "0.2" },
  { path: "/kuendigen", changefreq: "yearly", priority: "0.2" },
  { path: "/gruendungspaket", changefreq: "monthly", priority: "0.8" },
  // Vergleichsseite (Funnel 08.11.2026), indexierbar
  { path: "/vergleich/gruendung-selbst-steuerberater-gruenderx", changefreq: "monthly", priority: "0.7" },
];

// Tool-Landing-Slugs direkt aus der Single-Source-of-Truth (features.ts →
// LANDING_TOOLS wendet exakt dieselben live/beta+interne-Route-Filter an wie
// die /tools/:slug-Seiten), damit Sitemap und Seiten nie auseinanderlaufen.
// Vorlagen-Bibliothek (/vorlagen/:slug): öffentliche Seiten mit Vorschau,
// Download gegen bestätigte E-Mail. Quelle ist src/data/vorlagen/ (ein Eintrag
// je Vorlage), damit Sitemap und Seiten nie auseinanderlaufen.
export const vorlagenEntries: SitemapEntry[] = [
  // Kategorieseiten (/vorlagen/kategorie/<key>): eigene Landingpages je Themenfeld.
  ...VORLAGEN_KATEGORIEN.map((k) => ({
    path: `/vorlagen/kategorie/${k.key}`,
    changefreq: "weekly" as const,
    priority: "0.8",
  })),
  ...VORLAGEN.map((v) => ({
    path: `/vorlagen/${v.slug}`,
    changefreq: "monthly" as const,
    priority: "0.7",
  })),
];

export const toolEntries: SitemapEntry[] = LANDING_TOOLS.map((t) => ({
  path: `/tools/${t.slug}`,
  changefreq: "monthly",
  priority: "0.7",
}));

// Guide-Landings (/guides/:slug) — öffentliche Pitch-Seiten; der Guide-Inhalt
// selbst bleibt hinter der Paywall, daher hier nur die crawlbare Landing.
// Zusammengelegte Guides (301 auf den Ratgeber, siehe guideMerges.ts) fehlen.
export const guideEntries: SitemapEntry[] = GUIDE_LANDINGS.filter((g) => !isMergedGuide(g.slug)).map((g) => ({
  path: `/guides/${g.slug}`,
  changefreq: "monthly",
  priority: "0.7",
}));

// Lexikon (/lexikon/:slug): ein Eintrag je Begriff aus dem Katalog.
export const lexikonEntries: SitemapEntry[] = LEXIKON.map((b) => ({
  path: `/lexikon/${b.slug}`,
  changefreq: "monthly" as const,
  priority: "0.6",
}));

/** Alle Routen der Sitemap ausser den Ratgebern, in Sitemap-Reihenfolge. */
export const festeRouten = (): SitemapEntry[] => [...staticEntries, ...vorlagenEntries, ...toolEntries, ...guideEntries, ...lexikonEntries];

function manifestLastmod(): Record<string, string> {
  const file = resolve("scripts/lastmod-manifest.json");
  if (!existsSync(file)) {
    console.warn("sitemap: scripts/lastmod-manifest.json fehlt – feste Routen ohne lastmod.");
    return {};
  }
  try {
    const roh = JSON.parse(readFileSync(file, "utf8")) as { routen?: Record<string, { lastmod?: string }> };
    const out: Record<string, string> = {};
    for (const [path, e] of Object.entries(roh.routen ?? {})) {
      if (e?.lastmod && /^\d{4}-\d{2}-\d{2}$/.test(e.lastmod)) out[path] = e.lastmod;
    }
    return out;
  } catch (e) {
    console.warn("sitemap: lastmod-manifest.json nicht lesbar – feste Routen ohne lastmod.", e);
    return {};
  }
}

/** Setzt lastmod der festen Routen: Build-Datum nur fuer TAGESAKTUELL, sonst Manifest. */
function mitLastmod(items: SitemapEntry[], manifest: Record<string, string>): SitemapEntry[] {
  return items.map((e) => {
    if (TAGESAKTUELL.includes(e.path)) return { ...e, lastmod: today };
    const lastmod = manifest[e.path];
    return lastmod ? { ...e, lastmod } : { ...e };
  });
}

// Fetch published blog posts via Supabase REST (no schema knowledge needed at build time)
// Gibt null zurueck, wenn der Abruf scheitert -- NICHT [] ("es gibt keine
// Ratgeber"). Vorher entstand bei einem Fehler still eine Sitemap ohne alle
// Ratgeber, prerender.mjs prerenderte dann keinen einzigen, und live lieferten
// alle /ratgeber/* den SPA-Fallback mit dem Head der Startseite.
async function fetchBlogEntries(): Promise<SitemapEntry[] | null> {
  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?select=slug,published_at,updated_at&status=eq.published&order=published_at.desc&limit=1000`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      },
    );
    if (!r.ok) {
      console.warn(`sitemap: blog fetch failed ${r.status}`);
      return null;
    }
    const rows = (await r.json()) as Array<{ slug: string; published_at: string; updated_at: string }>;
    // Ratgeber mit Canonical auf eine andere Domain (ratgeberKanonisch.ts) fehlen;
    // prerendert werden sie ueber EXTRA_ROUTES in prerender.mjs.
    return rows.filter((p) => !fremdKanonisch(p.slug)).map((p) => ({
      path: `/ratgeber/${p.slug}`,
      lastmod: (p.updated_at || p.published_at || today).slice(0, 10),
      changefreq: "weekly" as const,
      priority: "0.7",
    }));
  } catch (e) {
    console.warn("sitemap: blog fetch exception", e);
    return null;
  }
}

/** Ratgeber-Eintraege aus der bisherigen public/sitemap.xml (Rueckfall bei Abruffehler). */
function previousBlogEntries(): SitemapEntry[] {
  const file = resolve("public/sitemap.xml");
  if (!existsSync(file)) return [];
  const xml = readFileSync(file, "utf8");
  const out: SitemapEntry[] = [];
  for (const block of xml.split("<url>").slice(1)) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? "";
    const path = loc.replace(BASE_URL, "");
    if (!path.startsWith("/ratgeber/")) continue;
    out.push({
      path,
      lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
      changefreq: "weekly",
      priority: "0.7",
    });
  }
  return out;
}

function generateSitemap(items: SitemapEntry[]) {
  const urls = items.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

async function main() {
  const fetched = await fetchBlogEntries();
  let blogEntries: SitemapEntry[];
  if (fetched && fetched.length > 0) {
    blogEntries = fetched;
  } else {
    // Abruf gescheitert oder 0 veroeffentlichte Posts (ebenfalls verdaechtig):
    // Ratgeber aus der bisherigen Sitemap uebernehmen statt sie zu verlieren.
    const previous = previousBlogEntries();
    const grund = fetched ? "0 veröffentlichte Ratgeber geliefert" : "Ratgeber-Abruf fehlgeschlagen";
    if (previous.length > 0) {
      console.warn(`sitemap: ${grund} – übernehme ${previous.length} Ratgeber aus der bisherigen sitemap.xml`);
      blogEntries = previous;
    } else if (process.env.CI || process.env.VERCEL) {
      // Im Build lieber abbrechen (Vercel deployt dann nicht) als still alle
      // Ratgeber aus Sitemap und Prerender zu verlieren.
      console.error(`sitemap: ${grund} und keine bisherige Ratgeber-Liste – Build abgebrochen.`);
      process.exit(1);
    } else {
      console.warn(`sitemap: ${grund} – lokal ohne Ratgeber weiter.`);
      blogEntries = [];
    }
  }
  const manifest = manifestLastmod();
  const statisch = mitLastmod(staticEntries, manifest);
  const neuesterRatgeber = blogEntries.map((e) => e.lastmod ?? "").sort().pop();
  const hub = statisch.find((e) => e.path === "/ratgeber");
  if (hub && neuesterRatgeber) hub.lastmod = neuesterRatgeber;
  const entries = [
    ...statisch,
    ...mitLastmod(vorlagenEntries, manifest),
    ...mitLastmod(toolEntries, manifest),
    ...mitLastmod(guideEntries, manifest),
    ...mitLastmod(lexikonEntries, manifest),
    ...blogEntries,
  ];
  writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
  console.log(
    `sitemap.xml lastmod: ${entries.filter((e) => e.lastmod).length} von ${entries.length} (Manifest: ${Object.keys(manifest).length} Routen)`,
  );
  console.log(
    `sitemap.xml written: ${entries.length} entries (${staticEntries.length} static + ${vorlagenEntries.length} vorlagen + ${toolEntries.length} tools + ${guideEntries.length} guides + ${lexikonEntries.length} lexikon + ${blogEntries.length} ratgeber)`,
  );
}

// Im Normalfall (predev/prebuild) immer schreiben. Nur zwei Aufrufer importieren
// diese Datei allein wegen der Routenlisten und duerfen nichts schreiben:
// vitest (src/test/lastmodManifest.test.ts) und scripts/lastmod-aktualisieren.ts.
// Bewusst "schreiben, ausser …": Ein Build ohne frische Sitemap wuerde still die
// alte eingecheckte ausliefern, und der Prerender haengt an ihrer URL-Liste.
const nurRoutenlisten = !!process.env.VITEST || /lastmod-aktualisieren\.ts$/.test(process.argv[1] ?? "");
if (!nurRoutenlisten) {
  void main();
}
