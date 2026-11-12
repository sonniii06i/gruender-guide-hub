import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import vercel from "../../vercel.json";
import { festeRouten } from "../../scripts/generate-sitemap";
import { NOT_FOUND_TITEL, notFoundSeite } from "../../scripts/not-found-seite.mjs";

// Soft-404 (Technik-Audit 12.11.2026, Betreiber „App-Routen listen“): Früher schickte
// vercel.json JEDEN Pfad ohne Datei per Sammel-Rewrite auf app-shell.html (HTTP 200,
// Startseiten-Titel). Jetzt gilt für jede <Route> aus App.tsx genau eins:
//   1. vorgerendert (Sitemap-Liste festeRouten(), Ratgeber aus der Sitemap,
//      PAID_ROUTES/EXTRA_ROUTES in scripts/prerender.mjs) → Vercel liefert die Datei,
//   2. App-Route (Login, Cockpit, Zahlung …) → expliziter Rewrite auf /app-shell.html.
// Alles andere ist 404 (dist/404.html = App-Hülle mit noindex).
//
// Neue Route in App.tsx und dieser Test ist rot? Entweder in die Sitemap/Prerender-
// Liste (öffentliche Seite) oder als Zeile in vercel.json → rewrites:
//   { "source": "/neue-route", "destination": "/app-shell.html" }

const wurzel = resolve(__dirname, "../..");
const lies = (p: string) => readFileSync(resolve(wurzel, p), "utf8");

const app = lies("src/App.tsx");
const APP_ROUTEN = [...app.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]).filter((p) => p !== "*");

const prerenderQuelle = lies("scripts/prerender.mjs");
const prerenderListe = (name: string) => {
  const m = prerenderQuelle.match(new RegExp(`const ${name} = \\[([\\s\\S]*?)\\];`));
  if (!m) throw new Error(`${name} nicht in scripts/prerender.mjs gefunden`);
  return [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
};
const sitemapRatgeber = [...lies("public/sitemap.xml").matchAll(/<loc>https:\/\/gruenderx\.de(\/ratgeber\/[^<]+)<\/loc>/g)].map(
  (m) => m[1],
);
const VORGERENDERT = new Set<string>([
  ...festeRouten().map((e) => e.path),
  ...sitemapRatgeber,
  ...prerenderListe("PAID_ROUTES"),
  ...prerenderListe("EXTRA_ROUTES"),
]);

type Rewrite = { source: string; destination: string };
const REWRITES = (vercel as { rewrites: Rewrite[] }).rewrites;
const SHELL = REWRITES.filter((r) => r.destination === "/app-shell.html");

// Vercel wertet source mit path-to-regexp aus (strict, case-sensitive). Die App-Hüllen-
// Rewrites nutzen bewusst nur feste Segmente und benannte Parameter (:name = ein
// Segment) – dann ist dieser Abgleich exakt. Regex, Gruppen oder Sternchen sind
// verboten (Test unten), damit nie wieder ein Sammel-Rewrite entsteht.
const SOURCE_FORM = /^(\/([a-z0-9-]+|:[A-Za-z]+))+$/;
const alsRegex = (muster: string) => new RegExp("^" + muster.replace(/:[A-Za-z]+/g, "[^/]+") + "$");
const beispiel = (route: string) => route.replace(/:([A-Za-z]+)/g, "beispiel-$1");
const gedeckt = (pfad: string) => SHELL.some((r) => alsRegex(r.source).test(pfad));
const vorgerendert = (route: string) =>
  route.includes(":") ? [...VORGERENDERT].some((p) => alsRegex(route).test(p)) : VORGERENDERT.has(route);

describe("Jede Route aus App.tsx ist vorgerendert oder per Rewrite gedeckt", () => {
  it("App.tsx liefert Routen (Parser greift)", () => {
    expect(APP_ROUTEN.length).toBeGreaterThan(100);
    expect(APP_ROUTEN).toContain("/dashboard");
    expect(APP_ROUTEN).toContain("/ratgeber/:slug");
  });

  it("keine Route ohne Datei und ohne Rewrite (sonst HTTP 404 trotz Seite)", () => {
    const offen = APP_ROUTEN.filter((r) => !vorgerendert(r) && !gedeckt(beispiel(r)));
    expect(offen, "In vercel.json rewrites eintragen oder vorrendern").toEqual([]);
  });

  it("öffentliche Parameter-Routen stammen aus der Sitemap/Prerender-Liste, nicht aus einem Rewrite", () => {
    const oeffentlich = APP_ROUTEN.filter((r) => r.includes(":") && vorgerendert(r));
    expect(oeffentlich.sort()).toEqual(
      ["/guides/:slug", "/ratgeber/:slug", "/tools/:slug", "/tools/:slug/gratis", "/vorlagen/:slug", "/vorlagen/kategorie/:key"].sort(),
    );
    for (const r of oeffentlich) expect(gedeckt(beispiel(r)), r).toBe(false);
  });

  it("kein Rewrite auf die App-Hülle für eine vorgerenderte Seite", () => {
    const doppelt = [...VORGERENDERT].filter((p) => gedeckt(p));
    expect(doppelt).toEqual([]);
  });

  it("jeder App-Hüllen-Rewrite gehört zu einer Route aus App.tsx (nichts Verwaistes)", () => {
    const verwaist = SHELL.filter((r) => !APP_ROUTEN.some((route) => alsRegex(r.source).test(beispiel(route))));
    expect(verwaist.map((r) => r.source)).toEqual([]);
    const quellen = SHELL.map((r) => r.source);
    expect(new Set(quellen).size).toBe(quellen.length);
  });
});

describe("Kein Sammel-Rewrite mehr (Soft-404)", () => {
  it("App-Hüllen-Rewrites nur als feste Pfade mit benannten Parametern", () => {
    const falsch = SHELL.filter((r) => !SOURCE_FORM.test(r.source)).map((r) => r.source);
    expect(falsch).toEqual([]);
  });

  it("kein Rewrite auf app-shell.html oder index.html mit Regex/Sternchen", () => {
    const sammel = REWRITES.filter((r) => /app-shell|index\.html/.test(r.destination) && /[()*?+]/.test(r.source));
    expect(sammel).toEqual([]);
  });

  it.each([
    "/dvsgukxxuj",
    "/blog/x",
    "/x.html",
    "/tools/x/",
    "/index.php",
    "/vorlagen/agb-onlineshop.html",
    "/AGB",
    "/DASHBOARD",
    "/dashboard/x",
    "/cockpit/gibt-es-nicht",
  ])("unbekannter Pfad %s trifft keinen App-Hüllen-Rewrite", (pfad) => {
    expect(gedeckt(pfad)).toBe(false);
    expect(VORGERENDERT.has(pfad)).toBe(false);
  });

  it("die übrigen Rewrites (MCP, GPT, .well-known) bleiben", () => {
    expect(REWRITES.filter((r) => r.destination !== "/app-shell.html").map((r) => r.source)).toEqual([
      "/mcp",
      "/api/gpt/:name",
      "/.well-known/mcp-registry-auth",
      "/.well-known/openai-apps-challenge",
      "/.well-known/mcp/server-card.json",
    ]);
  });

  it("vercel.json schaltet cleanUrls/trailingSlash nicht um (404.html bleibt die Fehlerseite)", () => {
    const v = vercel as Record<string, unknown>;
    expect(v.cleanUrls).toBeUndefined();
    expect(v.trailingSlash).toBeUndefined();
    expect(v.outputDirectory).toBe("dist");
  });
});

describe("404.html = App-Hülle mit noindex", () => {
  const shell = lies("index.html").replace('<script type="module" src="/src/main.tsx"></script>', '<script type="module" crossorigin src="/assets/index-abc.js"></script>');
  const seite = notFoundSeite(shell);

  it("eigener Titel, robots noindex, kein Canonical, kein og:url", () => {
    expect(seite).toContain(`<title>${NOT_FOUND_TITEL}</title>`);
    expect(seite.match(/<title>/g)).toHaveLength(1);
    expect(seite).toMatch(/<meta name="robots" content="noindex">/);
    expect(seite.match(/name=["']robots["']/g)).toHaveLength(1);
    expect(seite).not.toMatch(/rel=["']canonical["']/i);
    expect(seite).not.toMatch(/og:url/);
    expect(seite).not.toContain("<title>GründerX – Gründung");
  });

  it("bleibt die lauffähige App-Hülle (leeres #root, gleiche Skripte)", () => {
    expect(seite).toMatch(/<div id="root">\s*<\/div>/);
    expect(seite).toContain('<script type="module" crossorigin src="/assets/index-abc.js"></script>');
    expect(seite).toContain('name="facebook-domain-verification"');
  });

  it("entfernt fremde Canonicals/robots einer Hülle", () => {
    const mit = shell.replace("</head>", '<link rel="canonical" href="https://gruenderx.de/">\n<meta name="robots" content="index, follow">\n</head>');
    const s = notFoundSeite(mit);
    expect(s).not.toMatch(/canonical/);
    expect(s.match(/name=["']robots["']/g)).toHaveLength(1);
  });

  it("verweigert eine schon vorgerenderte Seite", () => {
    expect(() => notFoundSeite(shell.replace('<div id="root"></div>', '<div id="root"><main>x</main></div>'))).toThrow();
  });

  it("prerender.mjs schreibt dist/404.html aus der App-Hülle", () => {
    expect(prerenderQuelle).toContain('import { notFoundSeite } from "./not-found-seite.mjs"');
    expect(prerenderQuelle).toMatch(/join\(DIST, "404\.html"\), notFoundSeite\(/);
  });

  it("prerender.mjs: fehlgeschlagene Route → zweiter Versuch, sonst App-Hülle als Datei (nie 404 für Sitemap-URLs)", () => {
    expect(prerenderQuelle).toMatch(/for \(const route of warteschlange\)/);
    expect(prerenderQuelle).toMatch(/warteschlange\.push\(route\)/);
    expect(prerenderQuelle).toMatch(/if \(gerendert\.has\(route\) \|\| route === "\/"\) continue;/);
    expect(prerenderQuelle).toMatch(/await writeFile\(datei, shellHtml, "utf8"\)/);
  });

  it("die React-Route * (NotFound) setzt weiter noindex", () => {
    expect(app).toMatch(/<Route path="\*" element=\{<NotFound \/>\} \/>/);
    expect(lies("src/pages/NotFound.tsx")).toMatch(/<Seo[\s\S]*?noindex[\s\S]*?\/>/);
  });
});
