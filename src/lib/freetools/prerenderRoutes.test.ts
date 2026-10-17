import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { TRIAL_TOOLS } from "./trialTools";

// Nicht prerenderte Routen liefern den SPA-Fallback (Titel + Canonical der
// Startseite). Gratis-Proben stehen nicht in der Sitemap, also muessen sie in
// EXTRA_ROUTES von scripts/prerender.mjs stehen.
describe("Gratis-Proben werden prerendert", () => {
  const prerender = readFileSync(resolve(__dirname, "../../../scripts/prerender.mjs"), "utf8");
  for (const tool of TRIAL_TOOLS.filter((t) => t.trialPath.endsWith("/gratis"))) {
    it(`${tool.trialPath} steht in prerender.mjs`, () => {
      expect(prerender).toContain(`"${tool.trialPath}"`);
    });
  }
});
