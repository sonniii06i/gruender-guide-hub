import { describe, expect, it } from "vitest";
import { mitVorrang, RATGEBER_VORRANG } from "@/lib/internalLinks";
import { LANDING_TOOLS } from "@/data/features";

const p = (slug: string) => ({ slug });

describe("mitVorrang (Ratgeber-Kästen auf Tool-Seiten)", () => {
  it("setzt den Vorrang-Artikel nach vorn und hält das Limit", () => {
    const alle = ["a", "b", "c", "kleingewerbe-anmelden"].map(p);
    const gerankt = ["a", "b", "c"].map(p);
    expect(mitVorrang(alle, gerankt, ["kleingewerbe-anmelden"], 3).map((x) => x.slug)).toEqual(["kleingewerbe-anmelden", "a", "b"]);
  });
  it("keine Dublette, wenn der Artikel schon gerankt ist", () => {
    const alle = ["a", "b", "c"].map(p);
    expect(mitVorrang(alle, alle, ["b"], 3).map((x) => x.slug)).toEqual(["b", "a", "c"]);
  });
  it("unbekannter oder unveröffentlichter Slug ändert nichts", () => {
    const alle = ["a", "b"].map(p);
    expect(mitVorrang(alle, alle, ["gibt-es-nicht"], 3).map((x) => x.slug)).toEqual(["a", "b"]);
    expect(mitVorrang(alle, alle, undefined, 1).map((x) => x.slug)).toEqual(["a"]);
  });
  it("jeder Tool-Slug in RATGEBER_VORRANG existiert", () => {
    const slugs = new Set(LANDING_TOOLS.map((t) => t.slug));
    for (const s of Object.keys(RATGEBER_VORRANG)) expect(slugs.has(s), s).toBe(true);
  });
});
