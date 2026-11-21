import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { RATGEBER_KANONISCH_ANDERSWO } from "./ratgeberKanonisch";

const prerender = readFileSync(resolve(__dirname, "../../scripts/prerender.mjs"), "utf8");

describe("Ratgeber mit Canonical auf anderer Domain", () => {
  // anwaltx.de ist seit 19.11.2026 eingestellt (503): kein Canonical darf dorthin zeigen.
  it("kein Eintrag zeigt auf die eingestellte Domain anwaltx.de", () => {
    for (const ziel of Object.values(RATGEBER_KANONISCH_ANDERSWO)) expect(ziel.url).not.toContain("anwaltx.de");
  });
  it("der GPSR-Ratgeber bleibt im Prerender", () => {
    expect(prerender).toContain('"/ratgeber/gpsr-verordnung-haendler"');
  });
  for (const [slug, ziel] of Object.entries(RATGEBER_KANONISCH_ANDERSWO)) {
    it(`/ratgeber/${slug} wird trotz fehlendem Sitemap-Eintrag prerendert`, () => {
      expect(prerender).toContain(`"/ratgeber/${slug}"`);
    });
    it(`/ratgeber/${slug} zeigt auf eine absolute URL`, () => {
      expect(ziel.url).toMatch(/^https:\/\/(?!gruenderx\.de)/);
    });
  }
});
