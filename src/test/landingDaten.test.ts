import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { GUIDE_LANDINGS, relatedGuides } from "@/data/guides";
import { LANDING_TOOLS } from "@/data/features";
import { getGuideCopy, getToolCopy } from "@/data/landingCopy";
import { GUIDE_INDEX_DATEN } from "@/data/guideIndex";
import { GUIDE_MERGED_INTO } from "@/data/guideMerges";

// Die Dateien in src/data/landing/ erzeugt scripts/generate-landing-data.mjs (prebuild).
// Wer playbooks.ts, features.ts oder landingCopy*.ts ändert und das Skript vergisst,
// fällt hier auf – statt dass Landings veraltete Texte zeigen.
const lies = (p: string) => JSON.parse(readFileSync(`src/data/landing/${p}`, "utf8"));

describe("Landing-Daten je Slug", () => {
  it("jeder Guide hat eine Datei mit aktuellem Umriss, Text und verwandten Guides", () => {
    expect(readdirSync("src/data/landing/guides")).toHaveLength(GUIDE_LANDINGS.length);
    for (const g of GUIDE_LANDINGS) {
      const d = lies(`guides/${g.slug}.json`);
      expect(d.guide).toEqual(JSON.parse(JSON.stringify(g)));
      expect(d.copy).toEqual(
        getGuideCopy(g.slug, { slug: g.slug, title: g.title, tagline: g.tagline, outcome: g.outcome, duration: g.duration, difficulty: g.difficulty, steps: g.steps }),
      );
      expect(d.related.map((r: { slug: string }) => r.slug)).toEqual(relatedGuides(g.slug).map((r) => r.slug));
    }
  });

  it("jedes Tool hat eine Datei mit aktuellem Text", () => {
    expect(readdirSync("src/data/landing/tools")).toHaveLength(LANDING_TOOLS.length);
    for (const t of LANDING_TOOLS) {
      expect(lies(`tools/${t.slug}.json`).copy).toEqual(
        getToolCopy(t.slug, { slug: t.slug, title: t.title, desc: t.desc, categoryTitle: t.categoryTitle, categoryTagline: t.categoryTagline }),
      );
    }
  });

  it("Guide-Index deckt alle Guides ab, zusammengelegte mit Schritt-Titeln", () => {
    expect(GUIDE_INDEX_DATEN.map((g) => g.slug)).toEqual(GUIDE_LANDINGS.map((g) => g.slug));
    for (const g of GUIDE_LANDINGS) {
      const i = GUIDE_INDEX_DATEN.find((x) => x.slug === g.slug)!;
      expect([i.title, i.tagline, i.outcome]).toEqual([g.title, g.tagline, g.outcome]);
      if (g.slug in GUIDE_MERGED_INTO) expect(i.schritte).toEqual(g.outline.map((s) => s.title));
    }
  });
});
