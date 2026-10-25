// Schlanker Guide-Index (Slug, Titel, Tagline, Ergebnis) für Verlinkungen auf
// öffentlichen Seiten. Erzeugt von scripts/generate-landing-data.mjs aus playbooks.ts –
// so müssen Ratgeber, Tool- und Guide-Landings nicht alle 80 Playbooks laden.
import index from "./landing/guideIndex.json";

export interface GuideIndexEintrag {
  slug: string;
  title: string;
  tagline: string;
  outcome: string;
  /** Nur bei in Ratgeber zusammengelegten Guides (guideMerges.ts). */
  duration?: string;
  schritte?: string[];
}

export const GUIDE_INDEX_DATEN: GuideIndexEintrag[] = index;

export const findGuideIndex = (slug: string): GuideIndexEintrag | undefined =>
  GUIDE_INDEX_DATEN.find((g) => g.slug === slug);
