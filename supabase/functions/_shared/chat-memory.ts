// Felix-Chat Memory-Layer — persistente User-Facts zwischen Sessions.
// Inspiration: NirDiamant/agents-towards-production · agent-memory-with-mem0
//
// Strategie:
// 1) loadMemories(userId, supa) → lädt Top-N Fakten via simple Sortierung
//    (confidence DESC, last_used_at DESC NULLS LAST). Kein Embedding (für später).
// 2) injectMemories(systemPrompt, memories) → fügt einen Memory-Block oben
//    in den System-Prompt ein.
// 3) extractAndSaveMemories(userId, userMsg, assistantMsg, llmCaller, supa)
//    → ruft ein kleines Sub-LLM auf und extrahiert relevante Facts als JSON,
//    persistiert in chat_memories. Cost-Guard: skip wenn Conversation zu kurz.

import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

export interface ChatMemory {
  id: string;
  fact: string;
  category: string | null;
  confidence: number;
  last_used_at: string | null;
}

const MAX_MEMORIES_INJECT = 8;
const MIN_CONVO_CHARS_FOR_EXTRACT = 120;

/** Lädt Top-N Memories für einen User. */
export const loadMemories = async (
  userId: string,
  supa: SupabaseClient,
): Promise<ChatMemory[]> => {
  const { data, error } = await supa
    .from("chat_memories")
    .select("id, fact, category, confidence, last_used_at")
    .eq("user_id", userId)
    .order("confidence", { ascending: false })
    .order("last_used_at", { ascending: false, nullsFirst: false })
    .limit(MAX_MEMORIES_INJECT);
  if (error) {
    console.error("loadMemories error", error);
    return [];
  }
  return (data ?? []) as ChatMemory[];
};

/** Aktualisiert last_used_at für die Memories die im Prompt gelandet sind. */
export const markMemoriesUsed = async (
  ids: string[],
  supa: SupabaseClient,
): Promise<void> => {
  if (ids.length === 0) return;
  try {
    await supa.from("chat_memories").update({ last_used_at: new Date().toISOString() }).in("id", ids);
  } catch (e) {
    console.error("markMemoriesUsed error", e);
  }
};

/** Inject-Block für System-Prompt. Wenn keine Memories: leerer String. */
export const buildMemoryBlock = (memories: ChatMemory[]): string => {
  if (memories.length === 0) return "";
  const byCategory: Record<string, string[]> = {};
  memories.forEach((m) => {
    const cat = m.category || "allgemein";
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(m.fact);
  });
  const lines: string[] = [
    "",
    "============================================================",
    "BEKANNTE FAKTEN ÜBER DIESEN USER (aus früheren Konversationen)",
    "============================================================",
    "Berücksichtige diese Fakten in deinen Antworten — wiederhole sie aber nicht explizit, außer der User fragt direkt danach.",
    "",
  ];
  for (const [cat, facts] of Object.entries(byCategory)) {
    lines.push(`**${cat}:**`);
    facts.forEach((f) => lines.push(`- ${f}`));
    lines.push("");
  }
  return lines.join("\n");
};

/** LLM-Caller-Interface: simpler Wrapper damit Memory-Extraction provider-agnostisch ist. */
export type SubLlmCaller = (prompt: string) => Promise<string>;

const EXTRACT_PROMPT_PREFIX = `Du extrahierst dauerhaft relevante User-Fakten aus einem einzelnen Chat-Austausch zwischen einem deutschen Gründer und einem AI-Co-Founder ("Felix").

REGELN:
- Extrahiere NUR Fakten die für ZUKÜNFTIGE Beratung nützlich sind (Business-Setup, Steuer-Status, Branding, Goals, Pain-Points, Plattformen, Märkte, Rechtsform, Budget).
- KEINE Conversational Stuff ("User hat gefragt..."), keine Felix-Antworten, keine Hypothesen.
- KEINE PII (Klarname, Adresse, IBAN, Telefon).
- KEINE doppelten Memories (wenn schon im Existing-Memory-Block enthalten, weglassen).
- Maximal 5 neue Facts pro Chat. Lieber weniger gute als viele schlechte.
- Output: JSON-Array, jedes Object mit { "fact": "kurzer Satz", "category": "business|tax|brand|goal|preference|tooling", "confidence": 0.0-1.0 }.
- Wenn nichts Neues: leeres Array [].

EXISTING MEMORY (zur Deduplizierung):`;

/**
 * Extract-Sub-Call. Async, blockt den Stream nicht (per Promise scheduled).
 * Schreibt direkt in chat_memories.
 */
export const extractAndSaveMemories = async (
  userId: string,
  userMsg: string,
  assistantMsg: string,
  existingMemories: ChatMemory[],
  llmCaller: SubLlmCaller,
  supa: SupabaseClient,
): Promise<void> => {
  // Cost-Guard: nur extrahieren wenn Conversation substantiell ist
  if ((userMsg.length + assistantMsg.length) < MIN_CONVO_CHARS_FOR_EXTRACT) {
    return;
  }

  const existingBlock = existingMemories.length === 0
    ? "(keine vorhandenen Fakten)"
    : existingMemories.map((m) => `- [${m.category ?? "—"}] ${m.fact}`).join("\n");

  const prompt = `${EXTRACT_PROMPT_PREFIX}
${existingBlock}

NEUER CHAT:
User: ${userMsg.slice(0, 2000)}
Felix: ${assistantMsg.slice(0, 2000)}

JSON-Array:`;

  try {
    const raw = await llmCaller(prompt);
    // Robust JSON-Extract: erstes [...] aus dem Text
    const match = raw.match(/\[[\s\S]*?\]/);
    if (!match) return;
    let parsed: { fact: string; category?: string; confidence?: number }[] = [];
    try {
      parsed = JSON.parse(match[0]);
    } catch {
      return;
    }
    if (!Array.isArray(parsed) || parsed.length === 0) return;

    // Dedup gegen bereits gespeicherte Facts (LLM-Hinweis allein ist unzuverlässig).
    const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();
    const existingFactsNorm = new Set(existingMemories.map((m) => normalize(m.fact)));

    const toInsert = parsed
      .filter((p) => typeof p?.fact === "string" && p.fact.trim().length > 5 && !existingFactsNorm.has(normalize(p.fact)))
      .slice(0, 5)
      .map((p) => ({
        user_id: userId,
        fact: p.fact.trim().slice(0, 500),
        category: typeof p.category === "string" ? p.category.slice(0, 32) : null,
        confidence: typeof p.confidence === "number" ? Math.max(0, Math.min(1, p.confidence)) : 0.7,
      }));

    if (toInsert.length === 0) return;

    const { error } = await supa.from("chat_memories").insert(toInsert);
    if (error) console.error("chat_memories insert", error);
  } catch (e) {
    console.error("extractAndSaveMemories error", e);
  }
};
