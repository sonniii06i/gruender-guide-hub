// Öffentliche Guide-Landings (/guides/:slug) abgeleitet aus den Playbooks.
// Die Landing ist crawlbar (Pitch/Upsell), der eigentliche Guide-Inhalt bleibt
// hinter der PaywallGate (/playbook/...). Single-Source-of-Truth: playbooks.ts.

import { PLAYBOOKS, type Playbook } from "./playbooks";

/**
 * Öffentlich zeigbarer Schritt-Umriss. ENTHÄLT BEWUSST NUR Titel + kurze
 * Beschreibung + Zeit/Kosten — also den Ablauf-Überblick. Das eigentlich
 * Umsetzbare (checklist, fields, externalLinks, warning, extendedNotes) wird
 * hier NICHT übernommen und bleibt damit hinter der Paywall (/playbook/...).
 */
export interface GuideOutlineStep {
  title: string;
  /** Nur erste 3 Schritte je Guide (öffentliches SEO-Sample); sonst undefined. */
  description?: string;
  estMinutes: number;
  estCost?: string;
}

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
  outline: GuideOutlineStep[];
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
  // Nur die nicht-umsetzungskritischen Felder herausgreifen.
  outline: p.steps.map((s) => ({
    title: s.title,
    description: s.description,
    estMinutes: s.estMinutes,
    estCost: s.estCost,
  })),
}));

/** Anzahl der Guides (/guides). Einzige Quelle für Guide-Zahlen in Texten. */
export const GUIDE_COUNT = GUIDE_LANDINGS.length;

export const findGuideLanding = (slug: string): GuideLandingEntry | undefined =>
  GUIDE_LANDINGS.find((g) => g.slug === slug);

/**
 * Themengruppen für den Block „Passende Guides“. Jeder Guide steht in genau
 * einer Gruppe (Test: landingDaten.test.ts). Ohne Gruppen zeigten 80 Guides
 * nur auf 15 verschiedene Ziele, der Rest hatte einen einzigen Inhalts-Link.
 */
export const GUIDE_THEMEN: readonly (readonly string[])[] = [
  // Rechtsform und Anmeldung
  [
    "gmbh-gruendung", "ug-gruendung", "einzelunternehmen-gruendung", "kleinunternehmer",
    "freiberufler-anmelden", "gbr-gruenden", "elster-fse-fillout", "holding", "immobilien-gmbh",
    "ag-gruenden", "verein-gug", "handwerk-gruenden", "restaurant-eroeffnen", "unternehmenskauf",
  ],
  // Marktplätze
  [
    "amazon-fba-launch", "amazon-verkaeuferkonto-setup", "amazon-produkt-anlegen", "amazon-brand-registry",
    "amazon-transparency", "pan-eu-fba", "reseller-marketplace-setup", "reseller-freischaltung", "dac7",
    "kaufland-launch", "kaufland-produkt-anlegen", "otto-produkt-anlegen", "logistik-3pl",
  ],
  // Eigener Shop, Marke und Pflichten
  [
    "shopify-launch", "brand-owner-d2c-setup", "dsgvo-shop", "gpsr-compliance", "weee-registrierung",
    "oss-anmeldung", "marke-anmelden", "patente-schutzrechte", "eigene-app-launchen",
  ],
  // Marketing
  [
    "performance-marketing-stack", "meta-ads-setup", "google-ads-merchant-console-setup", "tiktok-ads-setup",
    "email-marketing-stack", "klaviyo-setup", "seo-ecommerce", "seo-step-by-step", "erste-webseite-seo",
  ],
  // Creator und TikTok Shop
  [
    "creator-setup", "creator-influencer-setup", "creator-tiktok-instagram", "creator-youtube-longform",
    "creator-twitter-reddit", "creator-pinterest", "tiktok-shop-starten", "tiktok-shop-launch",
  ],
  // Coaching und Dienstleistung
  [
    "coach-experte-setup", "coach-1-on-1", "coach-group-mastermind", "coach-online-course",
    "coach-membership", "agency-services-setup",
  ],
  // Ausland
  ["us-llc", "us-accounts-deutscher", "hk-limited", "wegzugsbesteuerung"],
  // Finanzierung und Beteiligung
  [
    "foerderung-stipendium", "vc-pitch-deck", "crowdfunding-equity", "crowdfunding-reward", "crowdfunding-token",
    "crowdfunding-token-launch", "mitarbeiter-beteiligung", "co-founder-agreement", "ma-sell-side", "b2b-saas-spezifika",
  ],
  // Team, Zahlen und Absicherung
  [
    "hiring-erste-10", "hiring-festanstellung", "hiring-freelancer", "hiring-minijob-werkstudent",
    "buchhaltung-setup", "cashflow-forecasting", "insurance-stack",
  ],
];

// Verwandte Guides für interne Verlinkung: zuerst die nächsten Guides derselben
// Themengruppe (reihum ab der eigenen Position, damit jeder Guide der Gruppe
// gleich oft verlinkt wird), danach gleiche Difficulty, dann der Rest.
export const relatedGuides = (slug: string, limit = 4): GuideLandingEntry[] => {
  const self = findGuideLanding(slug);
  if (!self) return [];
  const gruppe = GUIDE_THEMEN.find((g) => g.includes(slug)) ?? [];
  const pos = gruppe.indexOf(slug);
  const thema = gruppe
    .map((_, i) => gruppe[(pos + 1 + i) % gruppe.length])
    .filter((s) => s !== slug)
    .map((s) => findGuideLanding(s))
    .filter((g): g is GuideLandingEntry => Boolean(g));
  const gesehen = new Set([slug, ...thema.map((g) => g.slug)]);
  const uebrig = GUIDE_LANDINGS.filter((g) => !gesehen.has(g.slug));
  const sameDiff = uebrig.filter((g) => g.difficulty === self.difficulty);
  const rest = uebrig.filter((g) => g.difficulty !== self.difficulty);
  return [...thema, ...sameDiff, ...rest].slice(0, limit);
};
