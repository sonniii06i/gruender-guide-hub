import { describe, expect, it } from "vitest";
import { ergebnisNormalisieren } from "@/pages/BrandCheck";

describe("BrandCheck: Antwort der Edge Function absichern", () => {
  it("fehlende domains und trademarks führen nicht zum Absturz", () => {
    const r = ergebnisNormalisieren({ query: "Nordlicht" } as never, "Nordlicht");
    expect(r.domains).toEqual([]);
    expect(r.trademarks.hits).toEqual([]);
    expect(r.trademarks.searchLinks).toEqual([]);
    expect(r.trademarks.totalHits).toBeNull();
  });

  it("vollständige Antwort bleibt unverändert", () => {
    const data = {
      query: "x", sanitized: "x", timestamp: "t",
      domains: [{ tld: ".de" }],
      trademarks: { query: "x", totalHits: 0, hits: [], searchLinks: [{ label: "DPMA", url: "u" }] },
    };
    const r = ergebnisNormalisieren(data as never, "x");
    expect(r.domains).toHaveLength(1);
    expect(r.trademarks.searchLinks).toHaveLength(1);
  });
});
