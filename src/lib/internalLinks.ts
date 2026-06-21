// Interne Verlinkung: matched Tools ↔ Guides ↔ Ratgeber über Token-Overlap +
// leichten Kategorie-Boost. Reine Heuristik auf den vorhandenen statischen Daten
// (features.ts / guides.ts) — kein DB-Zugriff. Stärkt die thematische
// Verlinkungsdichte (On-Page-SEO) ohne Pflegeaufwand.

import { LANDING_TOOLS } from "@/data/features";
import { GUIDE_LANDINGS } from "@/data/guides";

export interface LinkItem {
  slug: string;
  title: string;
  desc: string;
}

// Stopwords + generische Domänen-Wörter, die nicht zur Themen-Unterscheidung taugen.
const STOP = new Set([
  "und","oder","der","die","das","den","dem","des","ein","eine","einer","einen","einem","für","mit","im","in","auf","aus",
  "von","vom","zur","zum","zu","ab","bei","pro","per","als","wie","was","wer","wann","wo","ist","sind","wird","werden","sein",
  "du","dir","dich","dein","deine","deinen","deiner","sich","man","alle","alles","jeder","jede","jedes","kein","keine","nicht",
  "mehr","schon","noch","sofort","jetzt","direkt","ohne","statt","plus","inkl","etc","bis","über","unter","gegen","nach","vor",
  // generische GründerX-/Tool-Wörter (überall vorhanden → wertlos zum Matchen)
  "gründer","gruender","gründerx","gruenderx","tool","tools","guide","guides","ratgeber","cockpit","check","checks","rechner",
  "wizard","generator","vergleich","übersicht","schritt","schritte","anleitung","2024","2025","2026","deutschland","deutsche",
  "deutscher","ecommerce","commerce","brand","brands","creator","solo","selbstständige","online","einfach","erklärt","komplett",
]);

const norm = (s: string) => s.toLowerCase().replace(/[äöü]/g, (m) => ({ ä: "ae", ö: "oe", ü: "ue" }[m] || m)).replace(/ß/g, "ss");

const tokens = (text: string): Set<string> => {
  const out = new Set<string>();
  for (const raw of norm(text).split(/[^a-z0-9§]+/)) {
    const t = raw.trim();
    if (t.length < 3) continue;
    if (STOP.has(t) || STOP.has(raw)) continue;
    out.add(t);
  }
  return out;
};

// Themen-Brücke: grobe Buckets, um über unterschiedliche Vokabulare hinweg zu matchen.
const TOPIC_KEYWORDS: Record<string, string[]> = {
  gruendung: ["gewerbe","gewa1","anmeldung","rechtsform","gmbh","ug","einzelunternehmen","gbr","freiberufler","gruendung","notar","handelsregister","stammkapital","fragebogen","elster","fse"],
  steuern: ["steuer","steuern","ust","umsatzsteuer","vorsteuer","euer","abschreibung","afa","iab","gewerbesteuer","koerperschaftsteuer","einkommensteuer","kleinunternehmer","voranmeldung","crypto","quartal"],
  buchhaltung: ["buchhaltung","buchung","datev","lexoffice","settlement","amazon","stripe","bwa","beleg","skr03","skr04","reporting","marge"],
  marken: ["marke","marken","dpma","euipo","domain","brand","nizza","markenschutz","handle"],
  ecommerce: ["shopify","amazon","fba","verpackung","lucid","ce","rohs","weee","ear","labor","compliance","produkt","versand","fulfillment"],
  international: ["llc","holding","ip","box","substanz","dba","cfc","nexus","visa","banking","mercury","wise","hongkong","usa","ausland","wegzug"],
  banking: ["banking","konto","kreditkarte","karte","mercury","wise","qonto","spend","geschaeftskonto"],
  foerderung: ["foerderung","kfw","exist","zuschuss","programm","grant"],
  versicherung: ["versicherung","bu","krankenversicherung","gkv","pkv","haftpflicht","absicherung"],
};

const topicTokens = (topic: string): Set<string> => new Set((TOPIC_KEYWORDS[topic] ?? []).map(norm));

// Blog-Kategorie → Themen-Bucket (für Ratgeber-Kontext).
export const BLOG_CATEGORY_TOPIC: Record<string, string> = {
  gruendung: "gruendung",
  steuern: "steuern",
  buchhaltung: "buchhaltung",
  recht: "marken",
  ecommerce: "ecommerce",
  international: "international",
  banking: "banking",
  foerderung: "foerderung",
  versicherung: "versicherung",
};

// Tool-Kategorie-Slug → Themen-Bucket.
const TOOL_CAT_TOPIC: Record<string, string> = {
  starter: "gruendung",
  rechtsform: "gruendung",
  steuer: "steuern",
  buchhaltung: "buchhaltung",
  marken: "marken",
  launch: "ecommerce",
  international: "international",
  anbieter: "banking",
};

interface Indexed {
  slug: string;
  title: string;
  desc: string;
  tokens: Set<string>;
  topic?: string;
}

const TOOL_INDEX: Indexed[] = LANDING_TOOLS.map((t) => ({
  slug: t.slug,
  title: t.title,
  desc: t.desc,
  tokens: tokens(`${t.title} ${t.desc}`),
  topic: TOOL_CAT_TOPIC[t.categorySlug],
}));

const GUIDE_INDEX: Indexed[] = GUIDE_LANDINGS.map((g) => ({
  slug: g.slug,
  title: g.title,
  desc: g.tagline,
  tokens: tokens(`${g.title} ${g.tagline} ${g.outcome}`),
  // Guide-Topic heuristisch aus Slug/Title.
  topic: inferGuideTopic(`${g.slug} ${g.title} ${g.tagline}`),
}));

function inferGuideTopic(text: string): string | undefined {
  const tk = tokens(text);
  let best: string | undefined;
  let bestScore = 0;
  for (const topic of Object.keys(TOPIC_KEYWORDS)) {
    let score = 0;
    for (const kw of topicTokens(topic)) if (tk.has(kw)) score++;
    if (score > bestScore) { bestScore = score; best = topic; }
  }
  return best;
}

export interface MatchContext {
  /** Freitext (Titel + Beschreibung + Tags/Keywords). */
  text: string;
  /** Optionaler Themen-Bucket für den Kategorie-Boost. */
  topic?: string;
  /** Slug, der aus den Ergebnissen ausgeschlossen wird (self). */
  excludeSlug?: string;
  /** Zusätzliche Slugs zum Ausschließen. */
  exclude?: string[];
}

function rank(index: Indexed[], ctx: MatchContext, limit: number): LinkItem[] {
  const ctxTokens = tokens(ctx.text);
  if (ctx.topic) for (const t of topicTokens(ctx.topic)) ctxTokens.add(t);
  const excl = new Set([ctx.excludeSlug, ...(ctx.exclude ?? [])].filter(Boolean) as string[]);

  const scored = index
    .filter((it) => !excl.has(it.slug))
    .map((it) => {
      let score = 0;
      for (const t of it.tokens) if (ctxTokens.has(t)) score++;
      if (ctx.topic && it.topic === ctx.topic) score += 2; // Kategorie-Boost
      return { it, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(({ it }) => ({ slug: it.slug, title: it.title, desc: it.desc }));
}

export const relatedToolsFor = (ctx: MatchContext, limit = 4): LinkItem[] => rank(TOOL_INDEX, ctx, limit);
export const relatedGuidesFor = (ctx: MatchContext, limit = 4): LinkItem[] => rank(GUIDE_INDEX, ctx, limit);

/** Generischer Ranker für beliebige Items (z.B. Ratgeber-Artikel aus der DB). */
export function rankItems<T>(items: T[], getText: (t: T) => string, ctx: MatchContext, limit = 3): T[] {
  const ctxTokens = tokens(ctx.text);
  if (ctx.topic) for (const t of topicTokens(ctx.topic)) ctxTokens.add(t);
  return items
    .map((it) => {
      const tk = tokens(getText(it));
      let score = 0;
      for (const t of tk) if (ctxTokens.has(t)) score++;
      return { it, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.it);
}
