import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { RATGEBER_KANONISCH_ANDERSWO } from "./ratgeberKanonisch";

const prerender = readFileSync(resolve(__dirname, "../../scripts/prerender.mjs"), "utf8");

describe("Ratgeber mit Canonical auf anderer Domain", () => {
  for (const [slug, ziel] of Object.entries(RATGEBER_KANONISCH_ANDERSWO)) {
    it(`/ratgeber/${slug} wird trotz fehlendem Sitemap-Eintrag prerendert`, () => {
      expect(prerender).toContain(`"/ratgeber/${slug}"`);
    });
    it(`/ratgeber/${slug} zeigt auf eine absolute URL`, () => {
      expect(ziel.url).toMatch(/^https:\/\/(?!gruenderx\.de)/);
    });
  }
});
