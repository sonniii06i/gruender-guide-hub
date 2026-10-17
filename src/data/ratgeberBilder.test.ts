import { describe, expect, it } from "vitest";
import { existsSync, statSync } from "fs";
import { resolve } from "path";
import { LOKALE_TITELBILDER, titelbildAbsolut, titelbildUrl } from "./ratgeberBilder";

describe("Ratgeber-Titelbilder", () => {
  for (const slug of LOKALE_TITELBILDER) {
    it(`/ratgeber-bilder/${slug}.webp existiert und ist klein`, () => {
      const datei = resolve(__dirname, `../../public/ratgeber-bilder/${slug}.webp`);
      expect(existsSync(datei)).toBe(true);
      expect(statSync(datei).size).toBeLessThan(150_000);
    });
  }

  it("liefert nie eine data:-URI aus", () => {
    expect(titelbildUrl("unbekannt", "data:image/png;base64,AAAA")).toBeUndefined();
    expect(titelbildUrl("ug-oder-gmbh", "data:image/png;base64,AAAA")).toBe("/ratgeber-bilder/ug-oder-gmbh.webp");
  });

  it("bevorzugt echte URLs aus der Datenbank", () => {
    expect(titelbildUrl("ug-oder-gmbh", "https://cdn.example/x.webp")).toBe("https://cdn.example/x.webp");
  });

  it("macht lokale Pfade fuer og:image absolut", () => {
    expect(titelbildAbsolut("ug-oder-gmbh", null)).toBe("https://gruenderx.de/ratgeber-bilder/ug-oder-gmbh.webp");
    expect(titelbildAbsolut("unbekannt", null)).toBeUndefined();
  });
});
