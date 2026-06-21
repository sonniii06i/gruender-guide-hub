// Öffentliche Guide-Landings (/guides/:slug) abgeleitet aus den Playbooks.
// Die Landing ist crawlbar (Pitch/Upsell), der eigentliche Guide-Inhalt bleibt
// hinter der PaywallGate (/playbook/...). Single-Source-of-Truth: playbooks.ts.

import { PLAYBOOKS, type Playbook } from "./playbooks";

export interface GuideLandingEntry {
  slug: string;
  title: string;
  tagline: string;
  outcome: string;
  duration: string;
  difficulty: Playbook["difficulty"];
  totalCost?: string;
  runningCost?: string;
  steps: number;
}

export const GUIDE_LANDINGS: GuideLandingEntry[] = PLAYBOOKS.map((p) => ({
  slug: p.slug,
  title: p.title,
  tagline: p.tagline,
  outcome: p.outcome,
  duration: p.duration,
  difficulty: p.difficulty,
  totalCost: p.totalCost,
  runningCost: p.runningCost,
  steps: p.steps.length,
}));

export const findGuideLanding = (slug: string): GuideLandingEntry | undefined =>
  GUIDE_LANDINGS.find((g) => g.slug === slug);

// Verwandte Guides für interne Verlinkung — gleiche Difficulty bevorzugt,
// sonst einfach die nächsten in der Liste, self ausgeschlossen.
export const relatedGuides = (slug: string, limit = 4): GuideLandingEntry[] => {
  const self = findGuideLanding(slug);
  if (!self) return [];
  const sameDiff = GUIDE_LANDINGS.filter((g) => g.slug !== slug && g.difficulty === self.difficulty);
  const rest = GUIDE_LANDINGS.filter((g) => g.slug !== slug && g.difficulty !== self.difficulty);
  return [...sameDiff, ...rest].slice(0, limit);
};
