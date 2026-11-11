import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { BEFEHL, MANIFEST_DATEI, abweichungen, liesManifest, manifestRouten, routenStand } from "../../scripts/lastmod-routen";
import { EIGENE_DATUMSLOGIK, festeRouten } from "../../scripts/generate-sitemap";

// lastmod in der Sitemap kommt je Route aus scripts/lastmod-manifest.json
// (Hash des Inhalts + Tag der letzten Aenderung). Dieser Test wird rot, sobald
// eine Seite dazukommt oder sich aendert, ohne dass das Manifest nachgezogen
// wurde – sonst bliebe das Datum still stehen oder fehlte ganz.
const HINWEIS = `\n\n→ Manifest nachziehen und mit einchecken:  ${BEFEHL}\n   (setzt lastmod NUR der geaenderten/neuen Routen auf heute; Datei ${MANIFEST_DATEI})\n`;

describe("lastmod-Manifest der Sitemap", () => {
  const { stand, ohneQuelle } = routenStand();
  const manifest = liesManifest();

  it("jede feste Sitemap-Route hat eine Hash-Regel", () => {
    expect(
      ohneQuelle,
      `Routen ohne Quelle – in scripts/lastmod-routen.ts (SEITEN) die Seitenkomponente eintragen, dann ${BEFEHL}`,
    ).toEqual([]);
    const erwartet = festeRouten().length - EIGENE_DATUMSLOGIK.length;
    expect(manifestRouten().length).toBe(erwartet);
    expect(Object.keys(stand).length).toBe(erwartet);
  });

  it("Manifest passt zum Stand (keine Route fehlt, kein Hash veraltet, nichts Verwaistes)", () => {
    const diff = abweichungen(manifest, stand).map((a) => `${a.art}: ${a.path}`);
    expect(diff, `lastmod-Manifest passt nicht zum Stand.${HINWEIS}`).toEqual([]);
  });

  it("jedes lastmod ist ein gueltiges Datum und liegt nicht in der Zukunft", () => {
    const morgen = new Date(Date.now() + 36 * 3600 * 1000).toISOString().slice(0, 10);
    const falsch = Object.entries(manifest.routen)
      .filter(([, e]) => !/^\d{4}-\d{2}-\d{2}$/.test(e.lastmod) || Number.isNaN(Date.parse(e.lastmod)) || e.lastmod > morgen)
      .map(([path, e]) => `${path}: ${e.lastmod}`);
    expect(falsch).toEqual([]);
    expect(Object.values(manifest.routen).every((e) => /^[0-9a-f]{16}$/.test(e.hash))).toBe(true);
  });

  it("der Generator liest das Manifest und setzt nie pauschal das Build-Datum", () => {
    const gen = readFileSync(resolve(__dirname, "../../scripts/generate-sitemap.ts"), "utf8");
    expect(gen).toContain("lastmod-manifest.json");
    // Build-Datum nur an einer Stelle (TAGESAKTUELL); kein Eintrag der Routenlisten traegt selbst eins.
    expect(gen.match(/lastmod: today/g)?.length).toBe(1);
    expect(gen).not.toMatch(/path: "[^"]+"[^}\n]*lastmod:/);
  });
});
