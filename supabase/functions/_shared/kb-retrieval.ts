/**
 * KB-Retrieval-Helper für chat-felix
 *
 * 1. Embedded die User-Query via OpenAI text-embedding-3-small
 * 2. Ruft match_kb_chunks RPC auf → top-K Chunks mit Cosine-Similarity
 * 3. buildKbBlock() filtert auf Threshold und formatiert als System-Prompt-Append
 *
 * Hybrid-Modus: retrieve immer (billig), aber nur injecten wenn similarity ≥ INJECT_THRESHOLD.
 *
 * Rückfallweg (retrieveKbText): Wenn das Embedding der Frage scheitert (z. B. OpenAI
 * 429 insufficient_quota) oder nichts Relevantes liefert, sucht Felix per Postgres-
 * Volltext (to_tsvector('german', content), über PostgREST .textSearch, keine eigenen
 * DB-Objekte) und rankt die Kandidaten clientseitig nach Wort-Treffern.
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
  /** "embedding" (Cosine) oder "text" (Volltext-Rückfall) */
  match?: "embedding" | "text";
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

// Füllwörter, die in Gründerfragen ständig vorkommen und nichts unterscheiden.
const STOPWORDS = new Set(
  ("aber alle also auch auf aus bei bin bis bitte brauche brauchen dann das dass dem den der des die dies diese dieser doch dort durch ein eine einem einen einer eines etwa für gibt habe haben hat hier ich ihr ist jetzt kann kannst man mehr mein meine mich mir mit muss musst müssen nach nicht noch nur oder ohne sehr sich sie sind so soll sollte über um und uns unter viel vom von vor war was welche welcher welches wenn wer wie wieso wir wird wo zu zum zur " +
    "als beim bzw damit davon dazu gehts geht hilft helfen machen mache erstellen funktioniert funktionieren kostet kosten gilt gelten erklär erkläre erklären unterschied beste besten gut gute guten neue neuen mal schon immer wann warum weshalb welchem welchen lohnt sich " +
    "gerne kurz eigentlich ungefähr genau einfach richtig frage felix hallo danke").split(/\s+/),
);

/** Die wichtigsten Wörter der Frage (max. 10), für tsquery bereinigt. */
export function kbSuchwoerter(query: string): string[] {
  const woerter = query
    .toLowerCase()
    .normalize("NFC")
    .split(/[^a-z0-9äöüß§]+/)
    .map((w) => w.replace(/§/g, ""))
    .filter((w) => w.length >= 3 && !STOPWORDS.has(w));
  // Kürzel (UG, KSK …) haben nur 2 Zeichen → separat aufnehmen
  const kuerzel = (query.match(/\b[A-ZÄÖÜ]{2}\b/g) ?? []).map((w) => w.toLowerCase());
  // Kürzel zuerst (UG, KSK sind fachlich), dann längere Wörter (meist die fachlichen)
  const lang = [...new Set(woerter)].filter((w) => !kuerzel.includes(w)).sort((a, b) => b.length - a.length);
  return [...new Set([...kuerzel, ...lang])].slice(0, 10);
}

/**
 * Volltext-Rückfall ohne Embedding. Gestaffelte UND-Suchen (parallel): erst alle
 * Suchwörter, dann jeweils das kürzeste weggelassen, bis nur das wichtigste übrig ist
 * (Präfix-Treffer, deutsche Stammformen). Treffer der strengsten Stufe zuerst, innerhalb
 * einer Stufe Titel-Treffer und Häufigkeit. Wirft bei DB-Fehlern.
 */
export async function retrieveKbText(
  query: string,
  opts: { supabaseUrl: string; supabaseServiceKey: string; topK?: number },
): Promise<KbHit[]> {
  const { supabaseUrl, supabaseServiceKey, topK = 6 } = opts;
  const woerter = kbSuchwoerter(query).slice(0, 6);
  if (woerter.length === 0) return [];
  const sb = createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } });
  // Präfix auf gekürztem Wort: Prefix-Terme werden nicht voll gestemmt ("kostet:*" fände
  // "Kosten" nicht), "kost:*" schon.
  const stamm = (w: string) => (w.length >= 6 ? w.slice(0, Math.max(5, w.length - 2)) : w);
  // Lange Komposita (Verpackungspflichten, Kleinunternehmerregelung) zusätzlich über
  // ihren Wortanfang suchen, sonst trifft nur die exakte Zusammensetzung.
  const tsTerm = (w: string) => {
    const alt = [...new Set([`${w}:*`, `${stamm(w)}:*`, ...(w.length >= 14 ? [`${w.slice(0, 10)}:*`] : [])])];
    return alt.length === 1 ? alt[0] : `(${alt.join(" | ")})`;
  };
  // Stufe n = die n wichtigsten (= meist fachlichsten) Wörter, alle müssen vorkommen
  const stufen = woerter.map((_, i) => woerter.slice(0, woerter.length - i));
  const ergebnisse = await Promise.all(
    stufen.map((ws) =>
      sb
        .from("kb_chunks")
        .select("id, source, source_id, title, content, metadata")
        .textSearch("content", ws.map(tsTerm).join(" & "), { config: "german" })
        .limit(30),
    ),
  );
  const gesehen = new Set<string>();
  const out: KbHit[] = [];
  for (let i = 0; i < stufen.length && out.length < topK; i++) {
    const { data, error } = ergebnisse[i];
    if (error) throw new Error(`KB-text: ${error.message}`);
    const ws = stufen[i];
    const neu = ((data ?? []) as Omit<KbHit, "similarity">[])
      .filter((r) => !gesehen.has(r.id))
      .map((r) => {
        const t = r.title.toLowerCase();
        const c = r.content.toLowerCase();
        let score = 0;
        for (const w of ws) {
          const st = stamm(w);
          if (t.includes(st)) score += 3;
          score += Math.min(5, c.split(st).length - 1) * 0.2;
        }
        return { r, score };
      })
      .sort((x, y) => y.score - x.score);
    for (const { r } of neu) {
      if (out.length >= topK) break;
      gesehen.add(r.id);
      // Pseudo-Ähnlichkeit für buildKbBlock: Anteil der Suchwörter, die alle vorkommen
      out.push({ ...r, similarity: ws.length / woerter.length, match: "text" });
    }
  }
  return out;
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
    relevant[0]?.match === "text"
      ? "Folgende Einträge wurden per Stichwortsuche aus der GründerX-KB gefunden (nicht alle müssen passen)."
      : "Folgende Einträge wurden via Embedding-Suche aus der GründerX-KB gefunden.",
    "Nutze sie als FAKTENBASIS für deine Antwort. Wenn ein Eintrag eine Tool-Route enthält,",
    "verlinke darauf in deiner Antwort (Markdown-Link).",
    "",
  ];
  for (const h of relevant) {
    lines.push(`### [${h.source}] ${h.title} *(${h.match === "text" ? "Text" : "sim"} ${h.similarity.toFixed(2)})*`);
    lines.push(h.content);
    const meta = h.metadata ?? {};
    const route = (meta as any).route;
    if (route) lines.push(`\n*→ Tool-Link: ${route}*`);
    lines.push("");
  }
  lines.push("---", "");
  return lines.join("\n");
}
