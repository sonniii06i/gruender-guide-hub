// Auto-generates one SEO blog post per invocation.
// Triggered by pg_cron (Di + Fr 06:00 UTC) or manually from /admin/blog.
//
// Flow:
//   1. Pick the next due topic from blog_topic_queue.
//   2. Ask Lovable AI (gemini-2.5-pro) for a 1.200-1.800 word German article
//      in structured-JSON via tool calling.
//   3. Generate a hero image via Lovable AI image model.
//   4. Quality-gate (min words, internal links, schema completeness).
//   5. Insert blog_posts row with status published or draft (on gate fail).
//   6. Mark topic as consumed.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const AI_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const TEXT_MODEL = "google/gemini-2.5-pro";
const IMAGE_MODEL = "google/gemini-2.5-flash-image";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function countWords(s: string): number {
  return s.trim().split(/\s+/).length;
}

async function callLLM(messages: unknown[], tools?: unknown[], toolChoice?: unknown) {
  const body: Record<string, unknown> = { model: TEXT_MODEL, messages };
  if (tools) body.tools = tools;
  if (toolChoice) body.tool_choice = toolChoice;
  const r = await fetch(AI_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`AI gateway ${r.status}: ${t.slice(0, 400)}`);
  }
  return await r.json();
}

async function generateHeroImage(topic: string): Promise<string | null> {
  try {
    const prompt = `Hochwertiges, modernes Editorial-Header-Bild für einen deutschen Business-/Finanzartikel zum Thema: "${topic}". Stil: clean, professionell, sanftes Blau/Indigo, abstrakte geometrische Formen, viel Weißraum, keine Texte, keine Logos, keine Personen-Gesichter. 16:9.`;
    const r = await fetch(AI_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: IMAGE_MODEL,
        messages: [{ role: "user", content: prompt }],
        modalities: ["image", "text"],
      }),
    });
    if (!r.ok) {
      console.warn("image gen failed", r.status, await r.text());
      return null;
    }
    const j = await r.json();
    const url = j.choices?.[0]?.message?.images?.[0]?.image_url?.url
      || j.choices?.[0]?.message?.images?.[0]?.url
      || null;
    return url;
  } catch (e) {
    console.warn("image gen exception", e);
    return null;
  }
}

const ARTICLE_TOOL = {
  type: "function",
  function: {
    name: "publish_article",
    description: "Veröffentliche einen vollständigen SEO-Artikel im strukturierten Format.",
    parameters: {
      type: "object",
      properties: {
        title: { type: "string", description: "Hauptüberschrift, max. 70 Zeichen, Keyword am Anfang." },
        slug: { type: "string", description: "URL-Slug, klein, mit Bindestrichen, ohne Umlaute." },
        excerpt: { type: "string", description: "1-2 Sätze, max. 200 Zeichen, ohne Marketing-Sprech." },
        meta_title: { type: "string", description: "SEO-Titel, max. 60 Zeichen." },
        meta_description: { type: "string", description: "Meta-Description, max. 155 Zeichen." },
        keywords: { type: "array", items: { type: "string" }, description: "5-8 relevante Keywords." },
        tags: { type: "array", items: { type: "string" }, description: "3-5 Themen-Tags." },
        body_md: {
          type: "string",
          description:
            "Vollständiger Artikel in Markdown, 1.200-1.800 Wörter. Pflicht-Struktur: Einleitung (2-3 Absätze), '## Worum es geht', '## [Hauptthema]' mit 4-6 H3-Unterpunkten, '## Was du jetzt tun solltest' (3-5 nummerierte Schritte), '## FAQ' (3-5 Q&A), '## Quellen und weiterführende Links'. Pflicht: 3+ interne Links auf /playbook/preview/[slug] und 2+ auf /anbieter/[slug]. Aktuell Stand 2026 (DE).",
        },
        reading_minutes: { type: "integer", description: "Geschätzte Lesezeit in Minuten." },
        related_playbooks: { type: "array", items: { type: "string" }, description: "Playbook-Slugs (ohne /playbook/preview/-Prefix), 2-4." },
        related_providers: { type: "array", items: { type: "string" }, description: "Anbieter-Slugs (ohne /anbieter/-Prefix), 2-4." },
      },
      required: ["title", "slug", "excerpt", "meta_title", "meta_description", "keywords", "tags", "body_md", "reading_minutes", "related_playbooks", "related_providers"],
      additionalProperties: false,
    },
  },
};

async function generateArticle(topic: {
  topic: string;
  keyword_primary: string;
  keyword_secondary: string[];
  category: string;
  briefing: string | null;
}) {
  const system = `Du bist Felix, der KI-Redakteur von GründerX (gruenderx.de) — einer Plattform für Unternehmensgründung, Steuern und Buchhaltung in Deutschland.

Du schreibst SEO-Artikel für deutsche Gründer, E-Commerce-Operator und Founder.

REGELN:
- Tonalität: klar, konkret, gründer-zentriert, kein Marketing-Bullshit, du-Form.
- Stand: 2026 (Deutschland). Wenn Zahlen unsicher sind, sag "Stand 2026, prüfe vor Anwendung".
- Pflicht-Disclaimer am Ende: "Dieser Artikel ersetzt keine individuelle Steuer- oder Rechtsberatung."
- Keine erfundenen Quellen. Wenn du Quellen nennst, dann offizielle (BMF, BZSt, DPMA, IHK, BMWK, KfW, Gesetze direkt).
- Pflicht-interne-Links im body_md: mindestens 3 Links auf /playbook/preview/[SLUG] und 2 auf /anbieter/[SLUG] aus dieser Liste:
  Playbook-Slugs: gmbh-gruendung, ug-gruendung, einzelunternehmen-gruendung, holding, us-llc, hk-limited, marke-anmelden, amazon-fba-launch, shopify-launch, kleinunternehmer, oss-anmeldung, lucid-anmeldung, gpsr-compliance, ipbox, foerderung-finden, crypto-steuer, rechnung-richtig-stellen, e-rechnung-b2b
  Anbieter-Slugs (Beispiele): qonto, holvi, finom, n26, lexware-office, sevdesk, datev, stripe, mercury, wise, ionos, all-inkl
- Jeder Pflicht-Link als echtes Markdown: [Text](/playbook/preview/slug)
- Keyword primär: "${topic.keyword_primary}" — natürlich 4-6x verteilen, einmal in H1, einmal in den ersten 100 Wörtern, einmal in einer H2.
- Keine Halluzinationen zu Preisen, Fristen oder Paragraphen, die du nicht sicher kennst — dann allgemein bleiben.`;

  const user = `Schreibe einen vollständigen SEO-Artikel.

THEMA: ${topic.topic}
KEYWORD PRIMÄR: ${topic.keyword_primary}
KEYWORDS SEKUNDÄR: ${topic.keyword_secondary.join(", ")}
KATEGORIE: ${topic.category}
BRIEFING: ${topic.briefing || "Keine zusätzlichen Hinweise."}

Liefere das Ergebnis ausschließlich über den publish_article-Tool-Call.`;

  const j = await callLLM(
    [{ role: "system", content: system }, { role: "user", content: user }],
    [ARTICLE_TOOL],
    { type: "function", function: { name: "publish_article" } },
  );

  const call = j.choices?.[0]?.message?.tool_calls?.[0];
  if (!call) throw new Error("No tool call in response: " + JSON.stringify(j).slice(0, 400));
  const args = JSON.parse(call.function.arguments);
  return args as {
    title: string;
    slug: string;
    excerpt: string;
    meta_title: string;
    meta_description: string;
    keywords: string[];
    tags: string[];
    body_md: string;
    reading_minutes: number;
    related_playbooks: string[];
    related_providers: string[];
  };
}

function qualityGate(article: { body_md: string; meta_title: string; meta_description: string }) {
  const wc = countWords(article.body_md);
  const playbookLinks = (article.body_md.match(/\/playbook\/preview\/[a-z0-9-]+/g) || []).length;
  const providerLinks = (article.body_md.match(/\/anbieter\/[a-z0-9-]+/g) || []).length;
  const issues: string[] = [];
  if (wc < 900) issues.push(`Word count low: ${wc}`);
  if (wc > 2400) issues.push(`Word count high: ${wc}`);
  if (playbookLinks < 2) issues.push(`Playbook links: ${playbookLinks}`);
  if (providerLinks < 1) issues.push(`Provider links: ${providerLinks}`);
  if (article.meta_title.length > 65) issues.push(`meta_title too long: ${article.meta_title.length}`);
  if (article.meta_description.length > 165) issues.push(`meta_description too long: ${article.meta_description.length}`);
  return issues;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  try {
    // Optional: specific topic_id from request body (manual trigger from admin)
    let topicId: string | null = null;
    if (req.method === "POST") {
      try {
        const body = await req.json();
        topicId = body?.topic_id || null;
      } catch { /* ignore */ }
    }

    let topicRow;
    if (topicId) {
      const { data, error } = await supabase
        .from("blog_topic_queue")
        .select("*")
        .eq("id", topicId)
        .is("consumed_at", null)
        .maybeSingle();
      if (error) throw error;
      topicRow = data;
    } else {
      const { data, error } = await supabase
        .from("blog_topic_queue")
        .select("*")
        .is("consumed_at", null)
        .lte("scheduled_for", new Date().toISOString())
        .order("scheduled_for", { ascending: true })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      topicRow = data;
    }

    if (!topicRow) {
      return new Response(JSON.stringify({ ok: true, skipped: "no_due_topic" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Generating for topic:", topicRow.topic);

    const article = await generateArticle({
      topic: topicRow.topic,
      keyword_primary: topicRow.keyword_primary,
      keyword_secondary: topicRow.keyword_secondary || [],
      category: topicRow.category,
      briefing: topicRow.briefing,
    });

    // Ensure unique slug
    let finalSlug = slugify(article.slug || article.title);
    const { data: existing } = await supabase.from("blog_posts").select("id").eq("slug", finalSlug).maybeSingle();
    if (existing) finalSlug = `${finalSlug}-${Date.now().toString(36).slice(-4)}`;

    const issues = qualityGate(article);
    const status = issues.length === 0 ? "published" : "draft";

    const heroUrl = await generateHeroImage(topicRow.topic);

    const { data: post, error: insertErr } = await supabase
      .from("blog_posts")
      .insert({
        slug: finalSlug,
        title: article.title,
        excerpt: article.excerpt,
        body_md: article.body_md,
        hero_image_url: heroUrl,
        category: topicRow.category,
        tags: article.tags,
        meta_title: article.meta_title,
        meta_description: article.meta_description,
        keywords: article.keywords,
        related_playbooks: article.related_playbooks,
        related_providers: article.related_providers,
        reading_minutes: article.reading_minutes,
        status,
        published_at: status === "published" ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (insertErr) throw insertErr;

    await supabase
      .from("blog_topic_queue")
      .update({ consumed_at: new Date().toISOString(), post_id: post.id, last_error: issues.length ? issues.join("; ") : null })
      .eq("id", topicRow.id);

    return new Response(
      JSON.stringify({ ok: true, post_id: post.id, slug: finalSlug, status, issues }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("generate-blog-post error", e);
    return new Response(
      JSON.stringify({ ok: false, error: e instanceof Error ? e.message : String(e) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
