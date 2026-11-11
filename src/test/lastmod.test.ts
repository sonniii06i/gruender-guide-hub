import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  FLUECHTIG,
  dateiFuerPfad,
  hauptinhalt,
  heuteBerlin,
  inhaltsHash,
  lastmodBestimmen,
  pfadAusLoc,
  seitenInhalt,
  sitemapMitLastmod,
  standDeuten,
  vorhandeneLastmods,
} from "../../scripts/lastmod.mjs";

// Ehrliches lastmod je Sitemap-URL (Betreiber 11.11.2026). Das Build-Datum auf
// allen URLs (bis 17.10.2026) darf nicht wiederkommen: Gleicher Inhalt muss
// über Builds hinweg dasselbe Datum behalten.

const HEUTE = "2026-11-11";

const seite = (
  opts: { titel?: string; text?: string; asset?: string; robots?: string; extra?: string; nav?: string; fuss?: string } = {},
) => `<!doctype html>
<html lang="de"><head>
<meta charset="UTF-8">
<title>${opts.titel ?? "Amazon FBA starten | GründerX"}</title>
<meta name="description" content="Schritt für Schritt zum eigenen FBA-Geschäft." data-rh="true">
${opts.robots ? `<meta name="robots" content="${opts.robots}" data-rh="true">` : ""}
<link rel="canonical" href="https://gruenderx.de/ratgeber/amazon-fba-starten-deutschland" data-rh="true">
<link rel="stylesheet" href="/assets/index-${opts.asset ?? "AAAA1111"}.css">
<script type="module" crossorigin src="/assets/index-${opts.asset ?? "AAAA1111"}.js"></script>
<script type="application/ld+json">{"@type":"Article","build":"${opts.asset ?? "AAAA1111"}"}</script>
</head>
<body><div id="root"><!--$--><a href="#inhalt">Zum Inhalt springen</a>
<header><nav><a href="/tools">Tools</a> <a href="/ratgeber">${opts.nav ?? "Ratgeber"}</a></nav></header>
<main id="inhalt"><header><h1>Amazon FBA starten</h1></header>
<img src="/assets/hero-${opts.asset ?? "AAAA1111"}.webp" alt="Lager">
<svg viewBox="0 0 24 24"><path d="M1 1"/><title>Icon</title></svg>
<p>${opts.text ?? "Gewerbe anmelden, <!-- -->Konto eröffnen &amp; loslegen."}</p>
<style>.x{color:red}</style><noscript>Bitte JavaScript aktivieren</noscript>
${opts.extra ?? ""}</main>
<footer><a href="/impressum">Impressum</a> ${opts.fuss ?? "© 2026 GründerX"}</footer><!--/$--></div>
<script>window.__x = "${opts.asset ?? "AAAA1111"}";</script>
</body></html>`;

describe("lastmod: Inhalts-Hash", () => {
  it("Asset-/Bundle-Namen, JSON-LD und Skripte ändern den Hash nicht", () => {
    expect(inhaltsHash(seite({ asset: "AAAA1111" }))).toBe(inhaltsHash(seite({ asset: "ZZZZ9999" })));
  });

  it("sichtbarer Text, Titel und Robots-Meta ändern den Hash", () => {
    const basis = inhaltsHash(seite());
    expect(inhaltsHash(seite({ text: "Neuer Absatz zur Steuer." }))).not.toBe(basis);
    expect(inhaltsHash(seite({ titel: "Anderer Titel" }))).not.toBe(basis);
    expect(inhaltsHash(seite({ robots: "noindex" }))).not.toBe(basis);
  });

  it("Leerzeichen und Hydration-Kommentare zählen nicht; script/style/noscript/svg fehlen im Text", () => {
    const a = inhaltsHash(seite({ text: "Gewerbe anmelden, Konto eröffnen &amp; loslegen." }));
    const b = inhaltsHash(seite({ text: "Gewerbe   anmelden,\n  <!-- -->Konto eröffnen &amp; loslegen." }));
    expect(a).toBe(b);
    const inhalt = seitenInhalt(seite())!;
    expect(inhalt).toContain("title:Amazon FBA starten | GründerX");
    expect(inhalt).toContain("description:Schritt für Schritt zum eigenen FBA-Geschäft.");
    expect(inhalt).toContain("canonical:https://gruenderx.de/ratgeber/amazon-fba-starten-deutschland");
    expect(inhalt).toContain("Konto eröffnen & loslegen.");
    for (const fremd of ["color:red", "JavaScript aktivieren", "Icon", "window.__x", "@type"]) expect(inhalt).not.toContain(fremd);
  });

  it("Kopfzeile, Navigation und Fußzeile zählen nicht (sonst bekämen alle URLs dasselbe Datum)", () => {
    const basis = inhaltsHash(seite());
    expect(inhaltsHash(seite({ nav: "Ratgeber & News" }))).toBe(basis);
    expect(inhaltsHash(seite({ fuss: "© 2027 GründerX · Neuer Link" }))).toBe(basis);
    expect(seitenInhalt(seite())).toContain("Amazon FBA starten"); // <header> im <main> bleibt
    expect(seitenInhalt(seite())).not.toContain("Impressum");
  });

  it("ohne <main>: Body ohne erste <header> und letzte <footer>", () => {
    expect(hauptinhalt(`<header><nav>Menü</nav></header><section><header><h1>Titel</h1></header>Text</section><footer>Fuß</footer>`)).toBe(
      ` <section><header><h1>Titel</h1></header>Text</section> `,
    );
  });

  it("leere App-Hülle (kein Prerender) hat keinen Hash", () => {
    const shell = `<!doctype html><html><head><title>GründerX</title></head><body><div id="root"></div><script type="module" src="/assets/index-A.js"></script></body></html>`;
    expect(inhaltsHash(shell)).toBeNull();
    expect(inhaltsHash("")).toBeNull();
  });

  it("jede Flüchtig-Regel hat einen Grund", () => {
    for (const r of FLUECHTIG) {
      expect(r.re).toBeInstanceOf(RegExp);
      expect(r.grund.length).toBeGreaterThan(10);
    }
  });
});

describe("lastmod: vorheriger Stand (/lastmod.json)", () => {
  it("gültiges JSON → ok, ungültige Einträge fallen weg", () => {
    const r = standDeuten(
      200,
      "application/json; charset=utf-8",
      JSON.stringify({ "/a": { h: "abc", d: "2026-10-01" }, "/b": { h: "x", d: "gestern" }, "/c": "kaputt" }),
    );
    expect(r).toEqual({ art: "ok", stand: { "/a": { h: "abc", d: "2026-10-01" } } });
  });

  it("404 und SPA-Fallback (200 + HTML) gelten als Erstlauf", () => {
    expect(standDeuten(404, "text/plain", "Not Found")).toEqual({ art: "erstlauf" });
    expect(standDeuten(200, "text/html; charset=utf-8", "<!doctype html><html>…")).toEqual({ art: "erstlauf" });
    expect(standDeuten(200, "", "  <!doctype html>")).toEqual({ art: "erstlauf" });
  });

  it("anderer Status oder kaputtes JSON → Fehler, kein Erstlauf", () => {
    expect(standDeuten(500, "text/html", "<html>")).toMatchObject({ art: "fehler" });
    expect(standDeuten(403, "application/json", "{}")).toMatchObject({ art: "fehler" });
    expect(standDeuten(200, "application/json", "{kaputt")).toMatchObject({ art: "fehler" });
    expect(standDeuten(200, "application/json", "[]")).toMatchObject({ art: "fehler" });
  });
});

describe("lastmod: Datum je URL", () => {
  const vorher = { h: "h1", d: "2026-10-20" };

  it("Hash gleich → altes Datum (kein Build-Datum)", () => {
    expect(lastmodBestimmen({ hash: "h1", vorhanden: undefined, vorher, art: "ok", heute: HEUTE })).toEqual({
      lastmod: "2026-10-20",
      eintrag: { h: "h1", d: "2026-10-20" },
      grund: "gleich",
    });
  });

  it("Hash geändert → heute", () => {
    const r = lastmodBestimmen({ hash: "h2", vorhanden: undefined, vorher, art: "ok", heute: HEUTE });
    expect(r.lastmod).toBe(HEUTE);
    expect(r.eintrag).toEqual({ h: "h2", d: HEUTE });
    expect(r.grund).toBe("geändert");
  });

  it("neue URL → heute; mit vorhandenem Datum (Manifest/Ratgeber) bleibt dieses", () => {
    const r = lastmodBestimmen({ hash: "h9", vorhanden: undefined, vorher: undefined, art: "ok", heute: HEUTE });
    expect(r).toMatchObject({ lastmod: HEUTE, grund: "neu" });
    const m = lastmodBestimmen({ hash: "h9", vorhanden: "2026-08-14", vorher: undefined, art: "ok", heute: HEUTE });
    expect(m).toEqual({ lastmod: "2026-08-14", eintrag: { h: "h9", d: "2026-08-14" }, grund: "neu, vorhanden" });
  });

  it("Erstlauf (404/HTML): heute für alle ohne vorhandenes lastmod, vorhandenes bleibt", () => {
    expect(lastmodBestimmen({ hash: "h1", vorhanden: undefined, vorher: undefined, art: "erstlauf", heute: HEUTE })).toMatchObject({
      lastmod: HEUTE,
      eintrag: { h: "h1", d: HEUTE },
    });
    expect(lastmodBestimmen({ hash: "h1", vorhanden: "2026-09-03", vorher: undefined, art: "erstlauf", heute: HEUTE })).toMatchObject({
      lastmod: "2026-09-03",
      eintrag: { h: "h1", d: "2026-09-03" },
    });
  });

  it("Netzfehler: kein erfundenes Datum, vorhandenes bleibt", () => {
    expect(lastmodBestimmen({ hash: "h1", vorhanden: undefined, vorher: undefined, art: "fehler", heute: HEUTE })).toEqual({
      lastmod: undefined,
      eintrag: undefined,
      grund: "stand fehlt",
    });
    expect(lastmodBestimmen({ hash: "h1", vorhanden: "2026-09-03", vorher: undefined, art: "fehler", heute: HEUTE }).lastmod).toBe(
      "2026-09-03",
    );
  });

  it("vorhandenes Datum (Ratgeber updated_at, lastmod-Manifest) hat Vorrang, außer der Hash zeigt eine neuere Änderung", () => {
    // Hash gleich, Ratgeber neuer bearbeitet → Ratgeber-Datum
    expect(lastmodBestimmen({ hash: "h1", vorhanden: "2026-11-02", vorher, art: "ok", heute: HEUTE }).lastmod).toBe("2026-11-02");
    // Hash gleich, Ratgeber-Datum älter als die gemessene Änderung → gemessene Änderung
    expect(lastmodBestimmen({ hash: "h1", vorhanden: "2026-09-01", vorher, art: "ok", heute: HEUTE }).lastmod).toBe("2026-10-20");
    // Hash geändert → heute, auch wenn updated_at älter ist
    expect(lastmodBestimmen({ hash: "h2", vorhanden: "2026-09-01", vorher, art: "ok", heute: HEUTE }).lastmod).toBe(HEUTE);
  });

  it("ohne prerenderte Seite: bisherigen Stand weitertragen, nichts neu datieren", () => {
    expect(lastmodBestimmen({ hash: null, vorhanden: undefined, vorher, art: "ok", heute: HEUTE })).toEqual({
      lastmod: "2026-10-20",
      eintrag: vorher,
      grund: "ohne Hash",
    });
    expect(lastmodBestimmen({ hash: null, vorhanden: undefined, vorher: undefined, art: "erstlauf", heute: HEUTE }).lastmod).toBeUndefined();
  });

  it("Zwei Läufe ohne Inhaltsänderung an verschiedenen Tagen → gleiches Datum", () => {
    const h = inhaltsHash(seite({ asset: "B1" }))!;
    const lauf1 = lastmodBestimmen({ hash: h, vorhanden: undefined, vorher: undefined, art: "erstlauf", heute: "2026-11-11" });
    const h2 = inhaltsHash(seite({ asset: "B2" }))!;
    const lauf2 = lastmodBestimmen({ hash: h2, vorhanden: undefined, vorher: lauf1.eintrag, art: "ok", heute: "2026-11-14" });
    expect(lauf2.lastmod).toBe("2026-11-11");
  });
});

describe("lastmod: Sitemap und Pfade", () => {
  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    `  <url>\n    <loc>https://gruenderx.de/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>`,
    `  <url>\n    <loc>https://gruenderx.de/ratgeber/a</loc>\n    <lastmod>2026-09-03</lastmod>\n    <changefreq>weekly</changefreq>\n  </url>`,
    `  <url>\n    <loc>https://gruenderx.de/tools/x</loc>\n    <priority>0.7</priority>\n  </url>`,
    `</urlset>`,
  ].join("\n");

  it("setzt lastmod nach <loc>, ersetzt vorhandenes nur bei neuerem Datum, Rest unverändert", () => {
    const daten: Record<string, string | undefined> = { "/": "2026-11-11", "/ratgeber/a": "2026-10-01", "/tools/x": undefined };
    const neu = sitemapMitLastmod(xml, (p, vh) => daten[p] ?? vh);
    expect(neu).toContain(`<loc>https://gruenderx.de/</loc>\n    <lastmod>2026-11-11</lastmod>\n    <changefreq>weekly</changefreq>`);
    expect(neu).toContain(`<loc>https://gruenderx.de/ratgeber/a</loc>\n    <lastmod>2026-10-01</lastmod>`);
    expect(neu).toContain(`<loc>https://gruenderx.de/tools/x</loc>\n    <priority>0.7</priority>`);
    expect(neu.replace(/\n\s*<lastmod>[^<]*<\/lastmod>/g, "")).toBe(xml.replace(/\n\s*<lastmod>[^<]*<\/lastmod>/g, ""));
    expect([...vorhandeneLastmods(neu).entries()]).toEqual([
      ["/", "2026-11-11"],
      ["/ratgeber/a", "2026-10-01"],
      ["/tools/x", undefined],
    ]);
  });

  it("Pfade und Dateien wie prerender.mjs", () => {
    expect(pfadAusLoc("https://gruenderx.de/")).toBe("/");
    expect(pfadAusLoc("https://gruenderx.de")).toBe("/");
    expect(pfadAusLoc("https://gruenderx.de/ratgeber/a/")).toBe("/ratgeber/a");
    expect(dateiFuerPfad("/d", "/")).toBe(join("/d", "index.html"));
    expect(dateiFuerPfad("/d", "/vorlagen/kategorie/steuer")).toBe(join("/d", "vorlagen", "kategorie", "steuer", "index.html"));
  });

  it("heute in Europe/Berlin, nicht UTC", () => {
    expect(heuteBerlin(new Date("2026-11-11T23:30:00Z"))).toBe("2026-11-12");
    expect(heuteBerlin(new Date("2026-06-30T22:30:00Z"))).toBe("2026-07-01");
    expect(heuteBerlin(new Date("2026-11-11T12:00:00Z"))).toBe("2026-11-11");
  });

  it("postbuild hängt lastmod.mjs nach prerender.mjs an", () => {
    const pkg = JSON.parse(readFileSync(join(__dirname, "../../package.json"), "utf8"));
    const pb: string = pkg.scripts.postbuild;
    expect(pb).toContain("scripts/lastmod.mjs");
    expect(pb.indexOf("scripts/prerender.mjs")).toBeLessThan(pb.indexOf("scripts/lastmod.mjs"));
  });
});
