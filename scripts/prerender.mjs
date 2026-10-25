/**
 * Postbuild-Prerender für SEO.
 *
 * Lovables/Cloudflare-Hosting liefert für ALLE Routen denselben statischen
 * index.html mit leerem <div id="root"></div> aus. Googlebot rendert JS zwar,
 * aber AI-Crawler (Google-AI-Overview, GPTBot, PerplexityBot) tun das NICHT –
 * sie sehen eine leere Seite ("Website scheint nicht erreichbar").
 *
 * Dieses Script rendert nach `vite build` die öffentlichen Routen aus der
 * sitemap.xml in echtem Chromium und schreibt das gerenderte HTML (inkl. der
 * von react-helmet gesetzten <head>-Tags: title/description/canonical/OG) als
 * statische index.html pro Route nach dist/. main.tsx hydriert das beim Laden.
 *
 * Robust: jede Route in try/catch, Fehler überspringen → der Build kann an
 * keiner einzelnen Seite scheitern. Best-effort, kein All-or-nothing.
 */
import { createServer } from "node:http";
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import Beasties from "beasties";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const PORT = 4757;
const PER_ROUTE_TIMEOUT = 25_000;
// Muss zu PRERENDER_DATA_ID in src/lib/prerender.ts passen.
const PRERENDER_DATA_ID = "__prerender_data";

// Kritisches CSS (25.10.2026): Je Seite nur die Regeln, deren Selektoren im
// gerenderten HTML vorkommen, inline in den <head>; das ganze Stylesheet lädt
// danach ohne Render-Blockade (media="print" → onload "all", <noscript>-Fallback).
// PSI: 175 KB CSS (~28 KB gz) blockierten den ersten Text, ~89 % davon ungenutzt.
// Klassen, die erst nach dem Hydrieren auftauchen (Menüs, Dialoge, Toasts), kommen
// aus dem nachgeladenen Stylesheet – die sind beim ersten Aufbau nicht sichtbar.
const beasties = new Beasties({
  path: DIST,
  publicPath: "/",
  preload: "media",
  noscriptFallback: true,
  inlineFonts: false,
  pruneSource: false,
  // Tailwind-Varianten wie `[&_svg]:size-4` (shadcn-Button) erkennt der Selektor-Abgleich
  // nicht – ohne sie wären Icons bis zum Nachladen 24 statt 16 px (Layoutsprung).
  // Gleiches gilt für `:is(…)` der Typografie-Modifier (prose-h2:mb-4 …) in Ratgebern.
  allowRules: [/\\&/, /:is\(/],
  logLevel: "warn",
});

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

// Bezahlte Anzeigen-Landingpages.
//
// Sie stehen bewusst NICHT in der sitemap.xml (noindex, damit sie den
// SEO-Seiten keine Begriffe wegnehmen) — und wurden deshalb nie prerendert.
// Folge: Fuer diese Pfade liefert der Server den SPA-Fallback aus, also die
// STARTSEITE. Die erste Sekunde nach dem Anzeigenklick zeigte die falsche
// Seite, und Metas Crawler sieht bei einer Richtlinienpruefung ebenfalls die
// Startseite statt des beworbenen Angebots.
//
// Der noindex-Status haengt am robots-Meta, nicht an der Sitemap — er bleibt.
const PAID_ROUTES = ["/us-llc-30-tage", "/gruendung-komplett",
  // Affiliate-Verkaufsseite fuer den Digistore24-Marktplatz (noindex, nur DS24-Checkout)
  "/angebot"];

// Seiten mit Canonical auf eine andere Domain (Themenbesitz anwaltx.de) —
// nicht in der Sitemap, aber weiter nutzbar. Ohne Prerender truege ihr HTML
// Titel und Canonical der Startseite (SPA-Fallback).
const EXTRA_ROUTES = [
  "/amazon-marken-freischaltung-widerspruch-generator",
  "/amazon-transparency-seriennummer-widerspruch-generator",
  // Ratgeber mit Canonical auf anwaltx.de (src/data/ratgeberKanonisch.ts).
  "/ratgeber/gpsr-verordnung-haendler",
  // Gratis-Proben (ToolTrialPage, noindex, Canonical auf /tools/<slug>).
  // Startseite, /gratis-tools und die Tool-Seiten verlinken sie; ohne Prerender
  // lieferten sie Titel und Canonical der Startseite (SEO-Wächter 17.10.2026).
  // Neue Probe in trialTools.ts => hier eintragen (Test prerenderRoutes.test.ts).
  "/tools/weee-check/gratis",
  "/tools/brand-check/gratis",
  "/tools/lucid-wizard/gratis",
  // Ziel des Double-Opt-in der Tipps-Strecke (noindex, nicht in der Sitemap).
  "/tipps-bestaetigt",
];

function routesFromSitemap(xml) {
  const routes = [];
  const re = /<loc>https?:\/\/[^/]+(\/[^<]*)?<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    let p = m[1] || "/";
    p = p.replace(/\/$/, "") || "/"; // trailing slash weg, "/" bleibt
    if (!routes.includes(p)) routes.push(p);
  }
  return routes;
}

async function startServer() {
  const indexHtml = await readFile(join(DIST, "index.html"));
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      const filePath = join(DIST, urlPath);
      // Existierende Datei mit Extension direkt ausliefern
      if (extname(urlPath) && existsSync(filePath)) {
        const body = await readFile(filePath);
        res.writeHead(200, { "Content-Type": MIME[extname(urlPath)] || "application/octet-stream" });
        res.end(body);
        return;
      }
      // SPA-Fallback: Route → index.html (Client-Router übernimmt)
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(indexHtml);
    } catch {
      res.writeHead(500);
      res.end("err");
    }
  });
  await new Promise((r) => server.listen(PORT, r));
  return server;
}

async function loadPuppeteer() {
  const pptr = await import("puppeteer");
  return pptr.default || pptr;
}

/**
 * Findet ein installiertes Chrome-Binary im puppeteer-Cache – egal welche
 * Version. Entkoppelt vom exakten Version-Pin (puppeteer-Runtime und der
 * `browsers install`-CLI ziehen teils verschiedene Builds). Funktioniert für
 * macOS (.app-Bundle) und Linux (`chrome`-Binary, z.B. im Lovable-Build).
 */
async function findChrome(puppeteer) {
  const candidates = [];
  const home = process.env.HOME || process.env.USERPROFILE || "";
  const caches = [
    process.env.PUPPETEER_CACHE_DIR && join(process.env.PUPPETEER_CACHE_DIR, "chrome"),
    join(home, ".cache", "puppeteer", "chrome"),
    join(__dirname, "..", "node_modules", ".cache", "puppeteer", "chrome"),
  ].filter(Boolean);

  for (const cache of caches) {
    if (!existsSync(cache)) continue;
    let entries = [];
    try {
      entries = await readdir(cache);
    } catch {
      continue;
    }
    for (const e of entries) {
      const base = join(cache, e);
      // macOS .app
      const mac = join(base, "chrome-mac-arm64", "Google Chrome for Testing.app", "Contents", "MacOS", "Google Chrome for Testing");
      const macX = join(base, "chrome-mac-x64", "Google Chrome for Testing.app", "Contents", "MacOS", "Google Chrome for Testing");
      // Linux
      const lin = join(base, "chrome-linux64", "chrome");
      const lin2 = join(base, "chrome-linux", "chrome");
      for (const c of [mac, macX, lin, lin2]) if (existsSync(c)) candidates.push(c);
    }
  }
  // Höchste Version zuletzt sortiert → nimm die neueste
  candidates.sort();
  if (candidates.length) return candidates[candidates.length - 1];

  // Fallback: puppeteers eigener Auflösungsweg (falls Channel/Default greift)
  try {
    const p = puppeteer.executablePath();
    return typeof p === "string" && existsSync(p) ? p : null;
  } catch {
    return null;
  }
}

/**
 * Startet den Browser für den Prerender.
 * - Lokal (macOS/Dev): das von puppeteer gecachte Chrome (findChrome).
 * - Serverless-Build (Vercel/Lambda): @sparticuz/chromium liefert ein im
 *   Build-Env lauffähiges headless-Chromium – das normale puppeteer-Chromium
 *   startet dort NICHT (fehlende Shared-Libs) und der Prerender würde skippen.
 */
async function launchBrowser(puppeteer) {
  const baseArgs = ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"];
  const isServerless =
    process.env.VERCEL || process.env.AWS_REGION || process.env.NOW_REGION || process.env.AWS_LAMBDA_FUNCTION_NAME;

  if (!isServerless) {
    const executablePath = await findChrome(puppeteer);
    if (executablePath) console.log(`[prerender] lokales Chrome: ${executablePath}`);
    return puppeteer.launch({
      headless: true,
      ...(executablePath ? { executablePath } : {}),
      args: baseArgs,
    });
  }

  // Vercel-Build: @sparticuz/chromium
  const chromium = (await import("@sparticuz/chromium")).default;
  const executablePath = await chromium.executablePath();
  console.log(`[prerender] @sparticuz/chromium: ${executablePath}`);
  return puppeteer.launch({
    headless: chromium.headless ?? true,
    executablePath,
    args: [...chromium.args, ...baseArgs],
  });
}

/**
 * Macht den Client-Render-Abgriff hydrierbar (läuft im Browser per page.evaluate).
 *
 * main.tsx hydriert das prerenderte HTML mit hydrateRoot. React 18 erwartet
 * dabei exakt das Format von renderToString — der Prerender greift aber das
 * DOM eines normalen Client-Renders ab (outerHTML). Zwei Unterschiede ließen
 * die Hydration auf JEDER Seite scheitern (live: Minified React error #418 ×5
 * und #423, React verwirft das HTML und baut die Seite neu; gemessen 10/2026):
 *
 * 1. Suspense-Grenzen: renderToString umschließt deren Inhalt mit <!--$--> …
 *    <!--/$-->. Ohne diese Marker trifft die Suspense in App.tsx (um <Routes>)
 *    beim Hydrieren auf ein <div> statt auf den Kommentar -> „Hydration failed".
 *    Die Grenzen stehen im Fiber-Baum; wir setzen die Marker um deren DOM-Knoten.
 * 2. Benachbarte Textknoten: JSX wie `<Icon/> {TEXT}` oder `Hallo {name}` ergibt
 *    zwei Textknoten, outerHTML verschmilzt sie zu einem. renderToString trennt
 *    sie mit <!-- -->; ohne Trenner meldet React „Text content did not match".
 *
 * 3. Radix-Select: das versteckte native <select aria-hidden tabindex=-1>
 *    bekommt seine <option>s erst nach dem Mount (beim ersten Render ist es
 *    leer) -> „Did not expect server HTML to contain a <option>". Wir leeren es
 *    auf den Stand des ersten Renders; Radix füllt es danach selbst wieder.
 *
 * Andere Kommentare überspringt React beim Hydrieren, die Marker sind sonst
 * wirkungslos. Rückgabe: Zähler fürs Log.
 */
function hydrationMarkers() {
  const root = document.getElementById("root");
  const stats = { suspense: 0, suspenseOhneDom: 0, textTrenner: 0, selectOptionen: 0 };
  if (!root) return stats;

  const SUSPENSE = 13, HOST_COMPONENT = 5, HOST_TEXT = 6, HOST_PORTAL = 4; // React-18-Fiber-Tags
  const containerKey = Object.keys(root).find((k) => k.startsWith("__reactContainer$"));
  const current = containerKey && root[containerKey]?.stateNode?.current;

  const hostNodes = (fiber, out) => {
    for (let f = fiber.child; f; f = f.sibling) {
      if (f.tag === HOST_PORTAL) continue; // Portale hängen woanders im DOM
      if (f.tag === HOST_COMPONENT || f.tag === HOST_TEXT) out.push(f.stateNode);
      else hostNodes(f, out);
    }
    return out;
  };
  const boundaries = [];
  const walk = (fiber) => {
    for (let f = fiber.child; f; f = f.sibling) {
      if (f.tag === SUSPENSE) boundaries.push(f);
      if (f.tag !== HOST_PORTAL) walk(f);
    }
  };
  if (current) walk(current);

  for (const b of boundaries) {
    const nodes = hostNodes(b, []).filter((n) => n && n.parentNode);
    if (!nodes.length) {
      stats.suspenseOhneDom++;
      continue;
    }
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    first.parentNode.insertBefore(document.createComment("$"), first);
    last.parentNode.insertBefore(document.createComment("/$"), last.nextSibling);
    stats.suspense++;
  }

  for (const sel of root.querySelectorAll('select[aria-hidden="true"][tabindex="-1"]')) {
    for (const opt of [...sel.querySelectorAll("option")]) {
      // <option value=""> rendert Radix schon im ersten Durchlauf (value undefined).
      if (opt.getAttribute("value") === "") continue;
      opt.remove();
      stats.selectOptionen++;
    }
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const texts = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) texts.push(n);
  for (const t of texts) {
    if (t.nextSibling && t.nextSibling.nodeType === Node.TEXT_NODE) {
      t.parentNode.insertBefore(document.createComment(" "), t.nextSibling);
      stats.textTrenner++;
    }
  }
  return stats;
}

async function run() {
  if (!existsSync(join(DIST, "index.html"))) {
    console.error("[prerender] dist/index.html fehlt – erst `vite build` laufen lassen.");
    process.exit(0); // Build nicht hart abbrechen
  }

  // App-Hülle sichern, BEVOR "/" prerendert wird: Der Prerender der Startseite
  // überschreibt dist/index.html. Vorher war das zugleich der SPA-Fallback, also
  // bekam jede nicht prerenderte Route (/dashboard, /auth, unbekannte URLs) das
  // Startseiten-HTML samt Canonical – Duplikat bei Google und Hydration gegen
  // die falsche Route. vercel.json leitet den Catch-all deshalb auf diese Datei
  // (leeres #root → main.tsx nimmt createRoot statt hydrateRoot).
  const shellPfad = join(DIST, "app-shell.html");
  if (!existsSync(shellPfad)) {
    const roh = await readFile(join(DIST, "index.html"), "utf8");
    if (/<div id="root">\s*<\/div>/.test(roh)) {
      await writeFile(shellPfad, roh, "utf8");
    } else {
      console.warn("[prerender] ⚠ dist/index.html ist schon prerendert – app-shell.html nicht angelegt");
    }
  }

  const sitemapPath = existsSync(join(DIST, "sitemap.xml"))
    ? join(DIST, "sitemap.xml")
    : join(__dirname, "..", "public", "sitemap.xml");
  const sitemapRoutes = routesFromSitemap(await readFile(sitemapPath, "utf8"));
  const routes = [...sitemapRoutes, ...[...PAID_ROUTES, ...EXTRA_ROUTES].filter((p) => !sitemapRoutes.includes(p))];
  if (routes.length === 0) {
    console.warn("[prerender] keine Routen in sitemap.xml gefunden – übersprungen.");
    return;
  }

  const server = await startServer();
  let browser;
  let ok = 0;
  let failed = 0;
  try {
    const puppeteer = await loadPuppeteer();
    browser = await launchBrowser(puppeteer);

    for (const route of routes) {
      const page = await browser.newPage();
      try {
        // Signal an die App (src/lib/prerender.ts): Zustand aus dem Browser
        // (Cookie-Banner, localStorage …) gehört nicht ins vorgerenderte HTML,
        // sonst weicht der erste Client-Render davon ab und die Hydration bricht.
        await page.evaluateOnNewDocument(() => {
          window.__PRERENDER__ = true;
        });
        // domcontentloaded statt networkidle0: die SPA hält über Supabase-Realtime/
        // Polling dauerhaft Verbindungen offen -> networkidle0 feuert nie und jede
        // Route lief in den Timeout (Minuten/Route, CI-Build-Timeout). Der
        // waitForSelector("#root > *") unten stellt sicher, dass React + react-helmet
        // gerendert haben, bevor wir das HTML abgreifen.
        await page.goto(`http://localhost:${PORT}${route}`, {
          waitUntil: "domcontentloaded",
          timeout: PER_ROUTE_TIMEOUT,
        });
        // Warten bis React in #root tatsächlich gerendert hat
        await page.waitForSelector("#root > *", { timeout: 8_000 });
        // Zusätzlich warten, bis react-helmet den <link rel="canonical"> gesetzt
        // hat. Bei LAZY-geladenen Routen (React.lazy/Suspense) matcht "#root > *"
        // sonst nur den Suspense-Fallback -> Seo-Tags (canonical/title/JSON-LD)
        // fehlen im prerenderten HTML (z.B. /faq). Fallback: nicht hart scheitern,
        // falls eine Seite bewusst keinen Canonical setzt.
        // Auf react-helmet warten. Der Canonical allein ist dafür ein schlechter
        // Indikator: Er trifft nur zu, wenn die Seite ihn setzt, und bei
        // lazy-geladenen Routen (React.lazy/Suspense) matcht "#root > *" schon
        // den Suspense-Fallback. Bei /faq lief der Wait deshalb in den Timeout
        // und es wurde der nicht-hydrierte Head abgegriffen — die Seite trug
        // live den generischen Startseiten-Titel und gar keinen Canonical
        // (gemessen 19.07.2026), obwohl die Komponente alles korrekt setzt.
        //
        // meta[data-rh] ist der verlässlichere Marker: Die Seo-Komponente setzt
        // IMMER eine description, Helmet markiert jedes eigene Tag mit data-rh.
        try {
          await page.waitForSelector("meta[data-rh]", { timeout: 12_000 });
          // Canonical zusätzlich abwarten, aber ohne harte Anforderung.
          await page
            .waitForSelector('link[rel="canonical"]', { timeout: 5_000 })
            .catch(() => {});
        } catch {
          // Ein zweiter Versuch: Am 26.09.2026 blieben /ratgeber/oss-anmeldung und /ratgeber/hk-limited-gruenden
          // im Build im Ladezustand hängen (Supabase-Antwort kam nicht rechtzeitig) — live standen dann der
          // Startseiten-Titel, kein Canonical und ~110 Wörter Hülle. Live laden beide in < 1 s.
          console.warn(`[prerender] ⚠ ${route} – keine react-helmet-Tags, zweiter Versuch`);
          try {
            await page.reload({ waitUntil: "domcontentloaded", timeout: PER_ROUTE_TIMEOUT });
            await page.waitForSelector("meta[data-rh]", { timeout: 20_000 });
            await page.waitForSelector('link[rel="canonical"]', { timeout: 5_000 }).catch(() => {});
          } catch {
            console.warn(`[prerender] ⚠ ${route} – keine react-helmet-Tags gefunden, Head evtl. generisch`);
          }
        }
        // Datengetriebene Listen (z.B. /ratgeber lädt blog_posts aus Supabase) melden
        // sich per data-prerender-pending an, solange sie laden. Ohne diesen Wait
        // schnappt der Prerender den Ladezustand ein ("Lade Artikel …") und der
        // Crawler sieht keinen einzigen Artikel-Link. Nur warten, wenn der Marker
        // wirklich da ist — sonst kostet es jede andere Route unnötig Zeit.
        //
        // Auf das VERSCHWINDEN des Markers warten, nicht auf „unsichtbar":
        // waitForSelector({hidden}) gilt schon bei einem leeren oder versteckten
        // Element als erfüllt (z. B. RelatedArticles), dann käme der Ladezustand ins HTML.
        if (await page.$("[data-prerender-pending]")) {
          const ok = await page
            .waitForFunction(() => !document.querySelector("[data-prerender-pending]"), { timeout: 15_000 })
            .then(() => true)
            .catch(() => false);
          if (!ok) console.warn(`[prerender] ⚠ ${route} – Daten wurden nicht rechtzeitig geladen, Liste bleibt leer`);
        }
        // react-helmet ERSETZT nur den <title>; Meta-Tags hängt es zusätzlich an.
        // Die statischen Defaults aus index.html bleiben also stehen, und im
        // prerenderten HTML landen zwei <meta name="description"> — der
        // generische Site-Default ZUERST, die seitenspezifische Fassung danach.
        // Crawler werten in der Regel die erste aus, wodurch faktisch alle
        // ~180 Seiten dieselbe Description hatten (gemessen 19.07.2026).
        //
        // Helmet markiert seine Tags mit data-rh="true". Wir entfernen deshalb
        // genau die statischen Duplikate, zu denen es ein Helmet-Pendant gibt.
        // Der Default in index.html bleibt unangetastet und trägt weiterhin den
        // SPA-Fallback für Routen ohne Prerender.
        const marker = await page.evaluate(hydrationMarkers);
        if (!marker.suspense) {
          console.warn(`[prerender] ⚠ ${route} – keine Suspense-Grenze gefunden, Hydration wird scheitern`);
        }
        // Nachgeladene Daten (src/lib/prerender.ts: prerenderDatenMerken) als
        // JSON ins HTML: Die Komponenten starten damit im ersten Render auf genau
        // dem Stand dieses HTML, sonst zeigten sie einen Ladezustand und die
        // Hydration scheiterte (/ratgeber, Ratgeber-Artikel, RelatedArticles).
        // `<` wird escaped: kein </script>- oder <!---Ausbruch aus Datenbank-Text.
        await page.evaluate((id) => {
          document.getElementById(id)?.remove();
          const daten = window.__PRERENDER_DATA__;
          if (!daten || !Object.keys(daten).length) return;
          const el = document.createElement("script");
          el.type = "application/json";
          el.id = id;
          el.textContent = JSON.stringify(daten)
            .replace(/</g, "\\u003c")
            .replace(/\u2028/g, "\\u2028")
            .replace(/\u2029/g, "\\u2029");
          document.head.appendChild(el);
        }, PRERENDER_DATA_ID);
        const html = await page.evaluate(() => {
          const key = (el) =>
            el.getAttribute("name") || el.getAttribute("property") || null;

          const managed = new Set();
          for (const el of document.head.querySelectorAll("meta[data-rh]")) {
            const k = key(el);
            if (k) managed.add(k);
          }

          for (const el of [...document.head.querySelectorAll("meta")]) {
            if (el.hasAttribute("data-rh")) continue; // von Helmet gesetzt → behalten
            const k = key(el);
            if (k && managed.has(k)) el.remove(); // statisches Duplikat → weg
          }

          // Gleiches Muster beim Canonical: doppelte <link rel="canonical"> sind
          // ein widersprüchliches Signal.
          const canon = document.head.querySelectorAll('link[rel="canonical"]');
          if (canon.length > 1) {
            const helmetCanon = [...canon].filter((el) => el.hasAttribute("data-rh"));
            if (helmetCanon.length) {
              [...canon].forEach((el) => {
                if (!el.hasAttribute("data-rh")) el.remove();
              });
            }
          }

          // Vite hängt beim Render für jeden dynamischen Import ein modulepreload an.
          // Den Supabase-Client (src/integrations/supabase/lazy.ts) lädt die Seite bewusst
          // erst nach dem ersten Aufbau – als Vorab-Hinweis im HTML konkurriert er mobil
          // mit CSS, Schrift und Seiten-Chunk um die Leitung (PSI-LCP, 25.10.2026).
          for (const el of document.head.querySelectorAll('link[rel="modulepreload"]')) {
            if (/\/assets\/client-[\w-]+\.js$/.test(el.getAttribute("href") || "")) el.remove();
          }

          return "<!doctype html>\n" + document.documentElement.outerHTML;
        });

        const outDir = route === "/" ? DIST : join(DIST, route);
        await mkdir(outDir, { recursive: true });
        let ausgabe = html;
        try {
          ausgabe = await beasties.process(html);
        } catch (e) {
          // Ohne kritisches CSS bleibt die Seite korrekt, nur das Stylesheet blockiert wie bisher.
          console.warn(`[prerender] kritisches CSS ${route} übersprungen: ${e.message.split("\n")[0]}`);
        }
        await writeFile(join(outDir, "index.html"), ausgabe, "utf8");
        ok++;
        console.log(`[prerender] ✓ ${route}`);
      } catch (err) {
        failed++;
        console.warn(`[prerender] ✗ ${route} – übersprungen (${err.message.split("\n")[0]})`);
      } finally {
        await page.close().catch(() => {});
      }
    }
  } catch (err) {
    // Browser ließ sich gar nicht starten (z.B. Chromium fehlt im Build-Env).
    // NICHT den Build abbrechen – SPA bleibt funktionsfähig, nur ohne Prerender.
    console.warn(`[prerender] Chromium nicht verfügbar – Prerender übersprungen: ${err.message.split("\n")[0]}`);
  } finally {
    if (browser) await browser.close().catch(() => {});
    server.close();
  }
  console.log(`[prerender] fertig: ${ok} gerendert, ${failed} übersprungen.`);
}

run();
