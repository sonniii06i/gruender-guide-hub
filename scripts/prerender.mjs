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

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const PORT = 4757;
const PER_ROUTE_TIMEOUT = 25_000;

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

async function run() {
  if (!existsSync(join(DIST, "index.html"))) {
    console.error("[prerender] dist/index.html fehlt – erst `vite build` laufen lassen.");
    process.exit(0); // Build nicht hart abbrechen
  }

  const sitemapPath = existsSync(join(DIST, "sitemap.xml"))
    ? join(DIST, "sitemap.xml")
    : join(__dirname, "..", "public", "sitemap.xml");
  const routes = routesFromSitemap(await readFile(sitemapPath, "utf8"));
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
    const executablePath = await findChrome(puppeteer);
    if (executablePath) console.log(`[prerender] Chrome: ${executablePath}`);
    browser = await puppeteer.launch({
      headless: true,
      ...(executablePath ? { executablePath } : {}),
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });

    for (const route of routes) {
      const page = await browser.newPage();
      try {
        await page.goto(`http://localhost:${PORT}${route}`, {
          waitUntil: "networkidle0",
          timeout: PER_ROUTE_TIMEOUT,
        });
        // Warten bis React in #root tatsächlich gerendert hat
        await page.waitForSelector("#root > *", { timeout: 8_000 });
        const html = await page.evaluate(() => "<!doctype html>\n" + document.documentElement.outerHTML);

        const outDir = route === "/" ? DIST : join(DIST, route);
        await mkdir(outDir, { recursive: true });
        await writeFile(join(outDir, "index.html"), html, "utf8");
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
