import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { hasDecidedConsent } from "@/utils/consent";
import { isPrerender } from "@/lib/prerender";

// Hydration-Mismatch auf jeder prerenderten Seite (React #418/#423, 10/2026):
// Was nach dem Mount aus Browserzustand entsteht, darf nicht ins HTML geraten,
// und der Abgriff braucht die Marker, die renderToString setzen würde.
const w = window as { __PRERENDER__?: boolean };

describe("Prerender bleibt hydrierbar", () => {
  afterEach(() => {
    delete w.__PRERENDER__;
    localStorage.clear();
  });

  it("Cookie-Banner steht nicht im prerenderten HTML", () => {
    localStorage.clear();
    expect(hasDecidedConsent()).toBe(false); // echter Besucher: Banner kommt
    w.__PRERENDER__ = true;
    expect(isPrerender()).toBe(true);
    expect(hasDecidedConsent()).toBe(true); // Prerender: kein Banner
  });

  it("prerender.mjs setzt Flag und Hydration-Marker vor dem Abgriff", () => {
    const src = readFileSync(join(__dirname, "../../scripts/prerender.mjs"), "utf8");
    expect(src).toMatch(/evaluateOnNewDocument\([\s\S]*?__PRERENDER__ = true/);
    const markerAt = src.indexOf("page.evaluate(hydrationMarkers)");
    const htmlAt = src.indexOf("document.documentElement.outerHTML");
    expect(markerAt).toBeGreaterThan(-1);
    expect(markerAt).toBeLessThan(htmlAt);
    expect(src).toContain('createComment("$")');
    expect(src).toContain('createComment("/$")');
    expect(src).toContain('createComment(" ")');
  });
});
