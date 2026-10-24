import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { hasDecidedConsent } from "@/utils/consent";
import { isPrerender, prerenderDaten, prerenderDatenMerken, PRERENDER_DATA_ID } from "@/lib/prerender";

// Hydration-Mismatch auf jeder prerenderten Seite (React #418/#423, 10/2026):
// Was nach dem Mount aus Browserzustand entsteht, darf nicht ins HTML geraten,
// und der Abgriff braucht die Marker, die renderToString setzen würde.
const w = window as { __PRERENDER__?: boolean; __PRERENDER_DATA__?: Record<string, unknown> };

describe("Prerender bleibt hydrierbar", () => {
  afterEach(() => {
    delete w.__PRERENDER__;
    delete w.__PRERENDER_DATA__;
    document.getElementById(PRERENDER_DATA_ID)?.remove();
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

  it("Daten-Snapshot: im Prerender gemerkt, im Client aus dem JSON-Script gelesen", () => {
    prerenderDatenMerken("x", [1]);
    expect(w.__PRERENDER_DATA__).toBeUndefined(); // echter Besucher: nichts merken

    w.__PRERENDER__ = true;
    prerenderDatenMerken("ratgeber:liste", [{ slug: "a" }]);
    expect(prerenderDaten("ratgeber:liste")).toEqual([{ slug: "a" }]);

    // Client: frisches Fenster mit dem Script aus scripts/prerender.mjs
    delete w.__PRERENDER__;
    delete w.__PRERENDER_DATA__;
    const el = document.createElement("script");
    el.type = "application/json";
    el.id = PRERENDER_DATA_ID;
    el.textContent = JSON.stringify({ k: "</script><b>" }).replace(/</g, "\\u003c");
    document.head.appendChild(el);
    expect(el.textContent).not.toContain("</script>");
    expect(prerenderDaten("k")).toBe("</script><b>");
    expect(prerenderDaten("fehlt")).toBeUndefined();
  });

  it("prerender.mjs escaped die Daten und wartet auf das Verschwinden des Lade-Markers", () => {
    const src = readFileSync(join(__dirname, "../../scripts/prerender.mjs"), "utf8");
    expect(src).toContain('const PRERENDER_DATA_ID = "__prerender_data"');
    expect(PRERENDER_DATA_ID).toBe("__prerender_data");
    expect(src).toContain('.replace(/</g, "\\\\u003c")');
    expect(src).toContain('!document.querySelector("[data-prerender-pending]")');
  });
});
