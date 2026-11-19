import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { GUIDE_LANDINGS, GUIDE_THEMEN, relatedGuides } from "@/data/guides";
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

// SEO 19.11.2026: 25 Guide- und 10 Tool-Landings zeigten live umschriebene Umlaute
// („erklaert“, „Geschaeft“, „GruenderX“), weil ein Generatorlauf ASCII geliefert hatte.
// Häufige Wörter reichen als Wächter: taucht eines auf, ist der ganze Eintrag betroffen.
const UMSCHRIFT_RE = /\b(?:fuer|ueber|koennen|aendern|GruenderX|Gruender|spaeter|laesst|muessen|moechte|waehlen|pruefen|haeufig|naechste[nrs]?|erklaert|Vertraege|Geschaeft)\b/;

describe("Landing-Texte ohne umschriebene Umlaute", () => {
  it("Guide- und Tool-Texte schreiben ä, ö, ü und ß aus", () => {
    for (const g of GUIDE_LANDINGS) {
      const copy = getGuideCopy(g.slug, { slug: g.slug, title: g.title, tagline: g.tagline, outcome: g.outcome, duration: g.duration, difficulty: g.difficulty, steps: g.steps });
      expect(JSON.stringify(copy).match(UMSCHRIFT_RE)?.[0], `Guide ${g.slug}`).toBeUndefined();
    }
    for (const t of LANDING_TOOLS) {
      const copy = getToolCopy(t.slug, { slug: t.slug, title: t.title, desc: t.desc, categoryTitle: t.categoryTitle, categoryTagline: t.categoryTagline });
      expect(JSON.stringify(copy).match(UMSCHRIFT_RE)?.[0], `Tool ${t.slug}`).toBeUndefined();
    }
  });
});

// SEO 19.11.2026: Der Block „Passende Guides“ zeigte auf 15 von 80 Guides,
// 24 Guides hatten dadurch nur einen Inhalts-Link (Guides-Übersicht).
describe("Passende Guides verteilen Links über alle Guides", () => {
  it("jeder Guide steht in genau einer Themengruppe", () => {
    const alle = GUIDE_THEMEN.flat();
    expect(new Set(alle).size).toBe(alle.length);
    expect([...alle].sort()).toEqual(GUIDE_LANDINGS.map((g) => g.slug).sort());
  });

  it("jeder Guide wird von mindestens drei anderen Guides verlinkt", () => {
    const inlinks = new Map<string, number>();
    for (const g of GUIDE_LANDINGS) {
      for (const r of relatedGuides(g.slug)) inlinks.set(r.slug, (inlinks.get(r.slug) ?? 0) + 1);
    }
    for (const g of GUIDE_LANDINGS) expect(inlinks.get(g.slug) ?? 0, g.slug).toBeGreaterThanOrEqual(3);
  });
});
