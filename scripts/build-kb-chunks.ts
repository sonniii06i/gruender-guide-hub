/**
 * Phase 2 — GründerX RAG Chunk-Builder
 *
 * Lädt alle Wissens-Quellen aus src/data/*.ts (+ pages/AbschreibungRechner.tsx
 * für AFA_ASSETS) und transformiert sie zu standardisierten KB-Chunks für
 * pgvector-Embedding.
 *
 * Output: data/kb-chunks.json — Array von { source, source_id, title, content,
 * metadata, content_hash } Records.
 *
 * Phase 3 (embed-kb-chunks.ts) liest dieses JSON, embedded via OpenAI
 * text-embedding-3-small und upsertet in Supabase kb_chunks.
 *
 * Ausführung: npx tsx scripts/build-kb-chunks.ts
 */

import { createHash } from "node:crypto";
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Data sources (alle re-exportiert von src/data/*.ts dank Phase-1-Refactor)
import { PLAYBOOKS } from "../src/data/playbooks";
import { CATEGORIES as TOOL_CATEGORIES } from "../src/data/features";
import { STB_POOL } from "../src/data/stbPool";
import { LABORE } from "../src/data/laborAnbieter";
import { FOERDERPROGRAMME } from "../src/data/foerderprogramme";
import { VISA_PROGRAMS } from "../src/data/visaPrograms";
import { HOLDING_STRUCTURES } from "../src/data/holdingStructures";
import { IP_BOX_REGIMES } from "../src/data/ipBoxRegimes";
import { US_CARDS } from "../src/data/usCreditCards";
import { VERSICHERUNGEN } from "../src/data/versicherungen";
import { CATEGORIES_ROADMAP } from "../src/data/ecomCategories";
import { EU_ALTERNATIVES } from "../src/data/euAlternatives";
import { WZ_2008 } from "../src/data/wz2008";
import { REAL_STRUCTURES } from "../src/data/realStructureExamples";
import { GRUPPEN as STB_GRUPPEN } from "../src/data/stbGruppen";
import { ROADMAP_TASKS } from "../src/data/roadmapTasks";
import { GLOSSAR as STEUER_GLOSSAR } from "../src/data/steuerAbcGlossar";
import { PROVIDERS, FULL_DESCRIPTIONS } from "../src/data/anbieter";
import { BWA_STRUCTURE, BRANCHEN_BENCHMARKS } from "../src/data/bwaStruktur";
import { AFA_ASSETS } from "../src/pages/AbschreibungRechner";

// ============================================================================
// Types & Helpers
// ============================================================================

type Chunk = {
  source: string;
  source_id: string;
  title: string;
  content: string;
  metadata: Record<string, unknown>;
  content_hash: string;
};

const MAX_CONTENT_CHARS = 6000; // ~1500 tokens, safe for text-embedding-3-small (8191 limit)

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[äöüß]/g, (c) => ({ ä: "ae", ö: "oe", ü: "ue", ß: "ss" })[c] ?? c)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function sha256(s: string): string {
  return createHash("sha256").update(s).digest("hex");
}

function clean(s: string | undefined | null): string {
  return (s ?? "").toString().trim();
}

/** Split content at last newline before limit; if no newline, hard-cut. */
function splitContent(content: string, limit = MAX_CONTENT_CHARS): string[] {
  if (content.length <= limit) return [content];
  const parts: string[] = [];
  let rest = content;
  while (rest.length > limit) {
    let cut = rest.lastIndexOf("\n", limit);
    if (cut < limit / 2) cut = limit; // No nice newline → hard-cut
    parts.push(rest.slice(0, cut).trim());
    rest = rest.slice(cut).trim();
  }
  if (rest) parts.push(rest);
  return parts;
}

/** Create one or more chunks from a single logical item, auto-splitting if needed. */
function mkChunks(args: {
  source: string;
  source_id: string;
  title: string;
  content: string;
  metadata: Record<string, unknown>;
}): Chunk[] {
  const parts = splitContent(args.content);
  return parts.map((part, i) => {
    const sid = parts.length > 1 ? `${args.source_id}__p${i + 1}` : args.source_id;
    return {
      source: args.source,
      source_id: sid,
      title: parts.length > 1 ? `${args.title} (Teil ${i + 1}/${parts.length})` : args.title,
      content: part,
      metadata: parts.length > 1
        ? { ...args.metadata, _part: i + 1, _total_parts: parts.length, _orig_id: args.source_id }
        : args.metadata,
      content_hash: sha256(part),
    };
  });
}

const list = (arr: string[] | undefined, prefix = "- ") =>
  (arr ?? []).filter(Boolean).map((s) => `${prefix}${s}`).join("\n");

// ============================================================================
// Extractors (1 per source)
// ============================================================================

function extractPlaybooks(): Chunk[] {
  return PLAYBOOKS.flatMap((p: any) => {
    const stepsMd = (p.steps ?? [])
      .map((s: any, i: number) => {
        const lines = [`### ${i + 1}. ${s.title}`, s.description];
        if (s.estMinutes) lines.push(`*Zeit:* ~${s.estMinutes} Min${s.estCost ? ` · *Kosten:* ${s.estCost}` : ""}`);
        if (s.checklist?.length) lines.push("**Checkliste:**\n" + list(s.checklist));
        if (s.externalLinks?.length) lines.push("**Links:** " + s.externalLinks.map((l: any) => `[${l.label}](${l.url})`).join(" · "));
        if (s.warning) lines.push(`⚠️ **Achtung:** ${s.warning}`);
        if (s.extendedNotes?.length) lines.push(list(s.extendedNotes));
        return lines.filter(Boolean).join("\n");
      })
      .join("\n\n");

    const content = [
      `# ${p.title}`,
      `**Tagline:** ${p.tagline}`,
      `**Outcome:** ${p.outcome}`,
      `**Dauer:** ${p.duration} · **Schwierigkeit:** ${p.difficulty}`,
      p.totalCost && `**Setup-Kosten:** ${p.totalCost}`,
      p.runningCost && `**Laufende Kosten:** ${p.runningCost}`,
      "",
      `## Steps`,
      stepsMd,
    ].filter(Boolean).join("\n");

    return mkChunks({
      source: "playbook",
      source_id: p.slug,
      title: p.title,
      content,
      metadata: {
        route: `/playbook/${p.slug}`,
        difficulty: p.difficulty,
        duration: p.duration,
        step_count: p.steps?.length ?? 0,
      },
    });
  });
}

function extractTools(): Chunk[] {
  const chunks: Chunk[] = [];
  for (const cat of TOOL_CATEGORIES as any[]) {
    for (const f of cat.features ?? []) {
      const content = [
        `# ${f.title}`,
        `**Kategorie:** ${cat.title}`,
        `**Status:** ${f.status}`,
        f.route && `**Route:** ${f.route}`,
        "",
        f.desc,
      ].filter(Boolean).join("\n");
      chunks.push(...mkChunks({
        source: "tool",
        source_id: f.slug,
        title: f.title,
        content,
        metadata: { route: f.route, status: f.status, category_slug: cat.slug, category_title: cat.title },
      }));
    }
  }
  return chunks;
}

function extractStb(): Chunk[] {
  return STB_POOL.flatMap((s: any) => {
    const content = [
      `# ${s.name}`,
      `**Stadt:** ${s.city}`,
      s.tagline && `**Profil:** ${s.tagline}`,
      s.honorarHinweis && `**Honorar:** ${s.honorarHinweis}`,
      s.specs?.length && `**Spezialisierung:** ${s.specs.join(", ")}`,
      s.besonders?.length && `**Besonders gut für:**\n${list(s.besonders)}`,
      s.toolStack?.length && `**Tool-Stack:** ${s.toolStack.join(", ")}`,
      s.sprachen?.length && `**Sprachen:** ${s.sprachen.join(", ")}`,
      s.groesse && `**Größe:** ${s.groesse}`,
      s.online_first != null && `**Online-First:** ${s.online_first ? "ja" : "nein"}`,
      s.rating != null && `**Rating:** ${s.rating}/5`,
      s.url && `**URL:** ${s.url}`,
    ].filter(Boolean).join("\n");
    return mkChunks({
      source: "stb",
      source_id: s.id,
      title: s.name,
      content,
      metadata: { url: s.url, specs: s.specs, rating: s.rating, city: s.city, online_first: s.online_first },
    });
  });
}

function extractLabor(): Chunk[] {
  return LABORE.flatMap((l: any) => {
    const content = [
      `# ${l.name}`,
      `**Land/Stadt:** ${l.country}${l.city ? ` · ${l.city}` : ""}`,
      l.tier && `**Tier:** ${l.tier}`,
      l.establishedSince && `**Seit:** ${l.establishedSince}`,
      l.testCategories?.length && `**Test-Kategorien:** ${l.testCategories.join(", ")}`,
      l.accreditation?.length && `**Akkreditierung:** ${l.accreditation.join(", ")}`,
      l.specialties?.length && `**Spezialitäten:**\n${list(l.specialties)}`,
      l.preise && `**Preise:** ${l.preise}`,
      l.url && `**URL:** ${l.url}`,
    ].filter(Boolean).join("\n");
    return mkChunks({
      source: "labor",
      source_id: l.id,
      title: l.name,
      content,
      metadata: { url: l.url, tier: l.tier, country: l.country, testCategories: l.testCategories },
    });
  });
}

function extractFoerder(): Chunk[] {
  return FOERDERPROGRAMME.flatMap((p: any) => {
    const content = [
      `# ${p.name}`,
      `**Typ:** ${p.type} · **Scope:** ${p.scope}${p.maxFunding ? ` · **Max-Förderung:** ${p.maxFunding}` : ""}`,
      p.zielgruppe?.length && `**Zielgruppe:** ${p.zielgruppe.join(", ")}`,
      p.phase?.length && `**Phase:** ${p.phase.join(", ")}`,
      p.branche?.length && `**Branche:** ${p.branche.join(", ")}`,
      "",
      p.description,
      "",
      p.conditions?.length && `**Bedingungen:**\n${list(p.conditions)}`,
      p.antragUrl && `**Antrag:** ${p.antragUrl}`,
    ].filter(Boolean).join("\n");
    return mkChunks({
      source: "foerderprogramm",
      source_id: p.slug,
      title: p.name,
      content,
      metadata: { url: p.antragUrl, type: p.type, scope: p.scope, maxFunding: p.maxFunding, branche: p.branche, phase: p.phase },
    });
  });
}

function extractVisa(): Chunk[] {
  return VISA_PROGRAMS.flatMap((v: any) => {
    const title = `${v.country} — ${v.name}`;
    const content = [
      `# ${title}`,
      v.category && `**Kategorie:** ${v.category}`,
      v.durationYears && `**Dauer:** ${v.durationYears}`,
      v.processingTime && `**Bearbeitungszeit:** ${v.processingTime}`,
      v.costEur && `**Kosten:** ${v.costEur} €`,
      v.requirements?.length && `**Voraussetzungen:**\n${list(v.requirements)}`,
      v.officialUrl && `**Offizielle URL:** ${v.officialUrl}`,
    ].filter(Boolean).join("\n");
    return mkChunks({
      source: "visa",
      source_id: v.id,
      title,
      content,
      metadata: { officialUrl: v.officialUrl, country: v.country, category: v.category, costEur: v.costEur },
    });
  });
}

function extractHolding(): Chunk[] {
  return HOLDING_STRUCTURES.flatMap((h: any) => {
    const content = [
      `# ${h.name}`,
      h.tagline && `**Tagline:** ${h.tagline}`,
      h.diagram && `**Diagram:**\n\`\`\`\n${h.diagram}\n\`\`\``,
      h.bestFor?.length && `**Best für:**\n${list(h.bestFor)}`,
      h.realWorldExamples?.length && `**Reale Beispiele:**\n${list(h.realWorldExamples)}`,
      h.steuerVorteile?.length && `**Steuer-Vorteile:**\n${list(h.steuerVorteile)}`,
      h.nachteile?.length && `**Nachteile:**\n${list(h.nachteile)}`,
      h.setupKosten && `**Setup-Kosten:** ${h.setupKosten}`,
      h.laufendeKosten && `**Laufende Kosten:** ${h.laufendeKosten}`,
    ].filter(Boolean).join("\n");
    return mkChunks({
      source: "holding",
      source_id: h.slug,
      title: h.name,
      content,
      metadata: { route: "/cockpit/holding-designer" },
    });
  });
}

function extractIpBox(): Chunk[] {
  return IP_BOX_REGIMES.flatMap((r: any) => {
    const title = `${r.country} — ${r.regimeName}`;
    const content = [
      `# ${title}`,
      `**Standard-KSt:** ${r.standardKSt}% · **Effektiv:** ${r.effectiveRate}%`,
      r.mechanism && `**Mechanik:** ${r.mechanism}`,
      r.qualifyingIncome?.length && `**Qualifizierte Einkünfte:**\n${list(r.qualifyingIncome)}`,
      r.nexusRequirement && `**Nexus:** ${r.nexusRequirement}`,
      r.substanceRequirement?.length && `**Substanz-Anforderung:**\n${list(r.substanceRequirement)}`,
    ].filter(Boolean).join("\n");
    return mkChunks({
      source: "ip_box",
      source_id: r.slug,
      title,
      content,
      metadata: { country: r.country, effectiveRate: r.effectiveRate, standardKSt: r.standardKSt },
    });
  });
}

function extractUsCards(): Chunk[] {
  return US_CARDS.flatMap((c: any) => {
    const content = [
      `# ${c.name}`,
      `**Issuer:** ${c.issuer} · **Use-Case:** ${c.useCase}`,
      `**Jahresgebühr:** ${c.annualFee} $${c.annualFeeFirstYearWaived ? " (1. Jahr frei)" : ""}`,
      c.signupBonus && `**Signup-Bonus:** ${c.signupBonus}`,
      c.spendingRequirement && `**Spending-Req:** ${c.spendingRequirement}`,
      c.minCreditScore != null && `**Min. Credit-Score:** ${c.minCreditScore}`,
      `**SSN benötigt:** ${c.needsSsn ? "ja" : "nein"} · **EIN-only:** ${c.einOnlyBusiness ? "ja" : "nein"} · **Foreign-Address:** ${c.acceptsForeignAddress ? "ja" : "nein"}`,
      `**FX-Fee:** ${c.foreignTransactionFee}%`,
      c.bestFor && `**Best für:** ${c.bestFor}`,
      c.watchouts?.length && `**Achtung:**\n${list(c.watchouts)}`,
      c.url && `**URL:** ${c.url}`,
    ].filter(Boolean).join("\n");
    return mkChunks({
      source: "us_credit_card",
      source_id: c.id,
      title: c.name,
      content,
      metadata: { url: c.url, useCase: c.useCase, issuer: c.issuer },
    });
  });
}

function extractVersicherungen(): Chunk[] {
  return VERSICHERUNGEN.flatMap((v: any) => {
    const content = [
      `# ${v.name}${v.kuerzel ? ` (${v.kuerzel})` : ""}`,
      v.beschreibung,
      v.schadenbeispiel && `**Schaden-Beispiel:** ${v.schadenbeispiel}`,
      v.deckungssumme && `**Empf. Deckungssumme:** ${v.deckungssumme}`,
      v.beitragRange && `**Beitrag (Jahr):** ${v.beitragRange.min}€ (min) · ${v.beitragRange.mittel}€ (typisch) · ${v.beitragRange.max}€ (max)`,
      v.worauf_achten?.length && `**Worauf achten:**\n${list(v.worauf_achten)}`,
    ].filter(Boolean).join("\n");
    return mkChunks({
      source: "versicherung",
      source_id: v.id,
      title: v.name,
      content,
      metadata: { kuerzel: v.kuerzel },
    });
  });
}

function extractEcomCategories(): Chunk[] {
  return CATEGORIES_ROADMAP.flatMap((c: any) => {
    const compMd = (c.deCompliance ?? [])
      .map((x: any) => `- **${x.pflicht}** (${x.behoerde ?? "?"}): ${x.details}${x.link ? ` · ${x.link}` : ""}`)
      .join("\n");
    const content = [
      `# ${c.name}`,
      c.blurb,
      c.marktEinstieg && `**Markt-Einstieg:** ${c.marktEinstieg}`,
      c.wettbewerb && `**Wettbewerb:** ${c.wettbewerb}`,
      c.plattformen && `**Plattformen:** ${c.plattformen}`,
      compMd && `**DE-Compliance:**\n${compMd}`,
    ].filter(Boolean).join("\n");
    return mkChunks({
      source: "ecom_category",
      source_id: c.slug,
      title: c.name,
      content,
      metadata: { wettbewerb: c.wettbewerb, marktEinstieg: c.marktEinstieg },
    });
  });
}

function extractEuAlternatives(): Chunk[] {
  return EU_ALTERNATIVES.flatMap((e: any) => {
    const title = `${e.country} — ${e.legalForm}`;
    const content = [
      `# ${title}`,
      e.shortName && `**Kurzname:** ${e.shortName}`,
      `**Mindestkapital:** ${e.minCapital} €${e.capitalPaidUp ? ` · ${e.capitalPaidUp}` : ""}`,
      `**KSt:** ${e.corporateTax}${e.localTax ? ` · Lokal: ${e.localTax}` : ""}`,
      e.effectiveTotal && `**Effektiv-Total:** ${e.effectiveTotal}`,
      e.withholdingDividends != null && `**Quellensteuer-Div.:** ${e.withholdingDividends}`,
      `**Mutter-Tochter-RL anwendbar:** ${e.motherDaughterApplies ? "ja" : "nein"}`,
      e.substance && `**Substanz:** ${e.substance}`,
      e.setupTime && `**Setup-Zeit:** ${e.setupTime}`,
      e.setupCost && `**Setup-Kosten:** ${e.setupCost}`,
      e.runningCost && `**Laufende Kosten:** ${e.runningCost}`,
    ].filter(Boolean).join("\n");
    return mkChunks({
      source: "eu_alternative",
      source_id: e.slug,
      title,
      content,
      metadata: { country: e.country, effectiveTotal: e.effectiveTotal },
    });
  });
}

function extractWz2008(): Chunk[] {
  return WZ_2008.flatMap((w: any) => {
    const title = `${w.code} — ${w.label}`;
    const content = [
      `# ${title}`,
      `**Gruppe:** ${w.gruppe}`,
      w.beispiele?.length && `**Beispiele:**\n${list(w.beispiele)}`,
    ].filter(Boolean).join("\n");
    return mkChunks({
      source: "wz2008",
      source_id: w.code,
      title,
      content,
      metadata: { code: w.code, gruppe: w.gruppe },
    });
  });
}

function extractRealStructures(): Chunk[] {
  return REAL_STRUCTURES.flatMap((r: any) => {
    const content = [
      `# ${r.name}`,
      r.family && `**Family:** ${r.family}`,
      r.description,
      r.diagram && `**Diagram:**\n\`\`\`\n${r.diagram}\n\`\`\``,
    ].filter(Boolean).join("\n");
    return mkChunks({
      source: "real_structure_example",
      source_id: r.slug,
      title: r.name,
      content,
      metadata: { family: r.family },
    });
  });
}

function extractStbGruppen(): Chunk[] {
  return STB_GRUPPEN.flatMap((g: any) => {
    const fieldsMd = (g.pflichtfelder ?? [])
      .map((f: any) => `- **${f.label}**${f.hint ? ` — ${f.hint}` : ""}`)
      .join("\n");
    const content = [
      `# ${g.name}`,
      g.beschreibung,
      g.matchTags?.length && `**Match-Tags:** ${g.matchTags.join(", ")}`,
      fieldsMd && `**Pflichtfelder:**\n${fieldsMd}`,
    ].filter(Boolean).join("\n");
    return mkChunks({
      source: "stb_gruppe",
      source_id: g.id,
      title: g.name,
      content,
      metadata: { matchTags: g.matchTags },
    });
  });
}

function extractRoadmapTasks(): Chunk[] {
  return ROADMAP_TASKS.flatMap((t: any) => {
    const title = `${t.phase}: ${t.titel}`;
    const content = [
      `# ${title}`,
      `**Pflicht:** ${t.pflicht}${t.zeitaufwand ? ` · **Zeitaufwand:** ${t.zeitaufwand}` : ""}`,
      t.kostenHint && `**Kosten:** ${t.kostenHint}`,
      t.beschreibung,
      t.schritte?.length && `**Schritte:**\n${list(t.schritte)}`,
      t.toolLink && `**Tool:** [${t.toolLink.label}](${t.toolLink.route})`,
    ].filter(Boolean).join("\n");
    return mkChunks({
      source: "roadmap_task",
      source_id: t.id,
      title,
      content,
      metadata: { phase: t.phase, pflicht: t.pflicht, toolLink: t.toolLink },
    });
  });
}

function extractSteuerGlossar(): Chunk[] {
  return STEUER_GLOSSAR.flatMap((g: any) => {
    const slug = slugify(g.begriff);
    const content = [
      `# ${g.begriff}`,
      g.aliases?.length && `**Aliase:** ${g.aliases.join(", ")}`,
      `**Kategorie:** ${g.kategorie}`,
      g.paragraph && `**§-Verweis:** ${g.paragraph}`,
      "",
      `**Kurzdefinition:** ${g.kurzDefinition}`,
      "",
      g.ausfuehrlich,
      g.beispiel && `**Beispiel:** ${g.beispiel}`,
      g.warnung && `⚠️ **Stolperfalle:** ${g.warnung}`,
      g.toolLinks?.length && `**Tools:** ${g.toolLinks.map((t: any) => `[${t.label}](${t.route})`).join(" · ")}`,
    ].filter(Boolean).join("\n");
    return mkChunks({
      source: "steuer_begriff",
      source_id: slug,
      title: g.begriff,
      content,
      metadata: { paragraph: g.paragraph, kategorie: g.kategorie, aliases: g.aliases, toolLinks: g.toolLinks },
    });
  });
}

function extractAnbieter(): Chunk[] {
  return PROVIDERS.flatMap((p: any) => {
    const fullDesc = FULL_DESCRIPTIONS[p.slug];
    const content = [
      `# ${p.name}`,
      `**Kategorie:** ${p.category} · **Region:** ${p.region}`,
      p.tagline && `**Tagline:** ${p.tagline}`,
      `**Pricing:** ${p.starting}${p.monthlyMin ? ` · Min. ${p.monthlyMin}` : ""}`,
      `**Rating:** ${p.rating}/5`,
      p.signupTime && `**Signup-Zeit:** ${p.signupTime}`,
      "",
      fullDesc && `**Beschreibung:** ${fullDesc}`,
      p.pros?.length && `**Stärken:**\n${list(p.pros)}`,
      p.cons?.length && `**Schwächen:**\n${list(p.cons)}`,
      p.forumNotes && `**Forum-Erfahrung:** ${p.forumNotes}`,
      p.coop?.text && `**Aktiver Deal:** ${p.coop.text}${p.coop.code ? ` · Code: ${p.coop.code}` : ""}`,
      p.url && `**URL:** ${p.url}`,
    ].filter(Boolean).join("\n");
    return mkChunks({
      source: "anbieter",
      source_id: p.slug,
      title: p.name,
      content,
      metadata: { url: p.url, category: p.category, region: p.region, rating: p.rating },
    });
  });
}

function extractAfaAssets(): Chunk[] {
  return (AFA_ASSETS as any[]).flatMap((a: any) => {
    const content = [
      `# ${a.name}`,
      `**Kategorie:** ${a.category}`,
      `**Nutzungsdauer:** ${a.nutzungsdauer} Jahr${a.nutzungsdauer === 1 ? "" : "e"}`,
      `**BMF-Sofortabschreibung:** ${a.bmfSofort ? "ja" : "nein"}`,
      a.hinweis && `**Hinweis:** ${a.hinweis}`,
      `**SKR03:** ${a.skr03} · **SKR04:** ${a.skr04}`,
    ].filter(Boolean).join("\n");
    return mkChunks({
      source: "afa_asset",
      source_id: a.id,
      title: a.name,
      content,
      metadata: { category: a.category, nutzungsdauer: a.nutzungsdauer, bmfSofort: a.bmfSofort, skr03: a.skr03, skr04: a.skr04 },
    });
  });
}

function extractBwa(): Chunk[] {
  const chunks: Chunk[] = [];
  // BWA_STRUCTURE: 1 chunk per category (mit allen Positions inline)
  for (const cat of BWA_STRUCTURE as any[]) {
    const posMd = (cat.positions ?? [])
      .map((p: any) => `- **${p.name}** (Key: \`${p.key}\`${p.skr03 ? ` · SKR03: ${p.skr03}` : ""})`)
      .join("\n");
    const content = [
      `# BWA-Kategorie: ${cat.category} ${cat.emoji}`,
      `**Typ:** ${cat.type}${cat.istMaterial ? " · Material" : ""}${cat.istPersonal ? " · Personal" : ""}`,
      "",
      `**Positionen (SKR03):**\n${posMd}`,
    ].join("\n");
    chunks.push(...mkChunks({
      source: "bwa_konto",
      source_id: slugify(cat.category),
      title: `BWA: ${cat.category}`,
      content,
      metadata: { type: cat.type, istMaterial: cat.istMaterial, istPersonal: cat.istPersonal },
    }));
  }
  // BRANCHEN_BENCHMARKS: 1 chunk per Branche
  for (const [key, b] of Object.entries(BRANCHEN_BENCHMARKS as Record<string, any>)) {
    const content = [
      `# Branchen-Benchmark: ${b.label}`,
      `**EBITDA-Marge:** ≥${b.ebitda_stark}% (stark) · ${b.ebitda_ok}% (ok)`,
      `**Eigenkapital-Quote:** ≥${b.ek_stark}% (stark) · ${b.ek_ok}% (ok)`,
      `**Personalkosten-Anteil:** ≤${b.personal_max_stark}% (stark) · ${b.personal_max_ok}% (ok)`,
      `**Rohertragsquote:** ≥${b.rohertrag_stark}% (stark) · ${b.rohertrag_ok}% (ok)`,
      "",
      `*Quelle:* Banker-Praxis 2026 (Sparkassen-Rating, Basel-IV, KfW-Anforderungen).`,
    ].join("\n");
    chunks.push(...mkChunks({
      source: "bwa_konto",
      source_id: `benchmark-${key}`,
      title: `Benchmark ${b.label}`,
      content,
      metadata: { branchen_typ: key, kind: "benchmark" },
    }));
  }
  return chunks;
}

// ============================================================================
// Run
// ============================================================================

const allExtractors = [
  ["playbook", extractPlaybooks],
  ["tool", extractTools],
  ["stb", extractStb],
  ["labor", extractLabor],
  ["foerderprogramm", extractFoerder],
  ["visa", extractVisa],
  ["holding", extractHolding],
  ["ip_box", extractIpBox],
  ["us_credit_card", extractUsCards],
  ["versicherung", extractVersicherungen],
  ["ecom_category", extractEcomCategories],
  ["eu_alternative", extractEuAlternatives],
  ["wz2008", extractWz2008],
  ["real_structure_example", extractRealStructures],
  ["stb_gruppe", extractStbGruppen],
  ["roadmap_task", extractRoadmapTasks],
  ["steuer_begriff", extractSteuerGlossar],
  ["anbieter", extractAnbieter],
  ["afa_asset", extractAfaAssets],
  ["bwa_konto", extractBwa],
] as const;

const all: Chunk[] = [];
const stats: Record<string, { items: number; chars: number; max: number; split: number }> = {};

for (const [name, fn] of allExtractors) {
  const chunks = fn();
  let chars = 0, max = 0, split = 0;
  for (const c of chunks) {
    chars += c.content.length;
    if (c.content.length > max) max = c.content.length;
    if (c.metadata._total_parts) split++;
  }
  stats[name] = { items: chunks.length, chars, max, split };
  all.push(...chunks);
}

// ============================================================================
// Output
// ============================================================================

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "..", "data");
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
const outPath = resolve(outDir, "kb-chunks.json");
writeFileSync(outPath, JSON.stringify(all, null, 2));

// Summary
console.log("\n=== KB Chunks Build Summary ===");
console.table(stats);
const totalChars = all.reduce((s, c) => s + c.content.length, 0);
const avgChars = Math.round(totalChars / all.length);
const estTokens = Math.round(totalChars / 3.5); // grobe DE-Schätzung
console.log(`\nTotal chunks: ${all.length}`);
console.log(`Total chars : ${totalChars.toLocaleString()} (avg ${avgChars} · est ~${estTokens.toLocaleString()} Tokens)`);
console.log(`Embedding cost estimate (text-embedding-3-small @ $0.02/1M): $${(estTokens / 1_000_000 * 0.02).toFixed(4)}`);
console.log(`\nOutput: ${outPath}`);
