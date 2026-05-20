/**
 * KB-Retrieval-Helper für chat-felix
 *
 * 1. Embedded die User-Query via OpenAI text-embedding-3-small
 * 2. Ruft match_kb_chunks RPC auf → top-K Chunks mit Cosine-Similarity
 * 3. buildKbBlock() filtert auf Threshold und formatiert als System-Prompt-Append
 *
 * Hybrid-Modus: retrieve immer (billig), aber nur injecten wenn similarity ≥ INJECT_THRESHOLD.
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

export type KbHit = {
  id: string;
  source: string;
  source_id: string;
  title: string;
  content: string;
  metadata: Record<string, any> | null;
  similarity: number;
};

const EMBED_MODEL = "text-embedding-3-small";
const DEFAULT_TOP_K = 5;
export const INJECT_THRESHOLD = 0.35; // cosine — empirisch zu tunen anhand chat_logs

/**
 * Embed query + match_kb_chunks RPC. Wirft bei Fehlern (Caller muss try/catch).
 */
export async function retrieveKb(
  query: string,
  opts: {
    openaiKey: string;
    supabaseUrl: string;
    supabaseServiceKey: string;
    topK?: number;
    sourceFilter?: string | null;
  },
): Promise<KbHit[]> {
  const { openaiKey, supabaseUrl, supabaseServiceKey, topK = DEFAULT_TOP_K, sourceFilter = null } = opts;

  // 1. Embed query
  const embRes = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiKey}`,
    },
    body: JSON.stringify({ model: EMBED_MODEL, input: query.slice(0, 8000) }),
  });
  if (!embRes.ok) {
    const txt = await embRes.text();
    throw new Error(`KB-embed OpenAI ${embRes.status}: ${txt.slice(0, 300)}`);
  }
  const embJ: any = await embRes.json();
  const queryEmbedding = embJ?.data?.[0]?.embedding;
  if (!Array.isArray(queryEmbedding)) throw new Error("KB-embed: no embedding in response");

  // 2. RPC
  const sb = createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } });
  const { data, error } = await sb.rpc("match_kb_chunks", {
    query_embedding: queryEmbedding,
    match_count: topK,
    match_threshold: 0.0, // broader retrieve, client filtert
    source_filter: sourceFilter,
  });
  if (error) throw new Error(`KB-retrieve RPC: ${error.message}`);
  return (data ?? []) as KbHit[];
}

/**
 * Hybrid-Inject: nur Chunks mit similarity ≥ threshold landen im System-Prompt.
 * Returns null wenn keine Hits → kein Inject.
 */
export function buildKbBlock(hits: KbHit[], threshold = INJECT_THRESHOLD): string | null {
  const relevant = hits.filter((h) => h.similarity >= threshold);
  if (relevant.length === 0) return null;

  const lines: string[] = [
    "",
    "---",
    "## 📚 GründerX Wissensbasis (relevant für User-Frage)",
    "",
    "Folgende Einträge wurden via Embedding-Suche aus der GründerX-KB gefunden.",
    "Nutze sie als FAKTENBASIS für deine Antwort. Wenn ein Eintrag eine Tool-Route enthält,",
    "verlinke darauf in deiner Antwort (Markdown-Link).",
    "",
  ];
  for (const h of relevant) {
    lines.push(`### [${h.source}] ${h.title} *(sim ${h.similarity.toFixed(2)})*`);
    lines.push(h.content);
    const meta = h.metadata ?? {};
    const route = (meta as any).route;
    if (route) lines.push(`\n*→ Tool-Link: ${route}*`);
    lines.push("");
  }
  lines.push("---", "");
  return lines.join("\n");
}
