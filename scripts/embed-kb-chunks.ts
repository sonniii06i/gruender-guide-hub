/**
 * Phase 3 — GründerX RAG Embedding + Supabase-Upload
 *
 * Liest data/kb-chunks.json (von Phase 2), prüft pro Chunk gegen die DB ob
 * der content_hash bereits da ist (→ skip), embedet die geänderten/neuen
 * Chunks via OpenAI text-embedding-3-small und upsertet in Supabase kb_chunks.
 *
 * Ausführung:
 *   tsx --env-file=.env.local scripts/embed-kb-chunks.ts
 *
 * .env.local braucht:
 *   SUPABASE_URL=https://<project>.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=<service-role-key vom Supabase-Dashboard>
 *   OPENAI_API_KEY=sk-...
 */

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

type Chunk = {
  source: string;
  source_id: string;
  title: string;
  content: string;
  metadata: Record<string, unknown>;
  content_hash: string;
};

const BATCH_EMBED = 64; // OpenAI erlaubt bis 2048, aber 64 ist robust
const BATCH_UPSERT = 100;
const MODEL = "text-embedding-3-small";

// ---- env ----
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OPENAI_KEY = process.env.OPENAI_API_KEY;
const DRY_RUN = process.env.DRY_RUN === "1" || process.argv.includes("--dry");
const FORCE = process.argv.includes("--force"); // re-embed alles, ignoriere content_hash

if (!SUPABASE_URL || !SERVICE_KEY || !OPENAI_KEY) {
  console.error("Missing env: SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY / OPENAI_API_KEY");
  console.error("Lege .env.local an und führe aus mit: tsx --env-file=.env.local scripts/embed-kb-chunks.ts");
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

// ---- load chunks ----
const __dirname = dirname(fileURLToPath(import.meta.url));
const inputPath = resolve(__dirname, "..", "data", "kb-chunks.json");
const chunks = JSON.parse(readFileSync(inputPath, "utf-8")) as Chunk[];
console.log(`Loaded ${chunks.length} chunks from ${inputPath}`);

// ---- diff against DB: which need embed? ----
console.log("Reading existing hashes from kb_chunks ...");
const existing = new Map<string, string>(); // key = source|source_id, val = content_hash
{
  let from = 0;
  const PAGE = 1000;
  while (true) {
    const { data, error } = await sb
      .from("kb_chunks")
      .select("source, source_id, content_hash")
      .range(from, from + PAGE - 1);
    if (error) {
      console.error("Read kb_chunks failed:", error.message);
      process.exit(1);
    }
    if (!data || data.length === 0) break;
    for (const r of data) existing.set(`${r.source}|${r.source_id}`, r.content_hash);
    if (data.length < PAGE) break;
    from += PAGE;
  }
}
console.log(`DB has ${existing.size} existing chunks.`);

const toEmbed: Chunk[] = [];
let skipped = 0;
for (const c of chunks) {
  const prev = existing.get(`${c.source}|${c.source_id}`);
  if (!FORCE && prev === c.content_hash) {
    skipped++;
    continue;
  }
  toEmbed.push(c);
}
console.log(`To embed: ${toEmbed.length} (skipped ${skipped} unchanged)`);

if (toEmbed.length === 0) {
  console.log("Nothing to do.");
  process.exit(0);
}

if (DRY_RUN) {
  console.log("--- DRY RUN — Skipping OpenAI + Upsert ---");
  console.log("Sources to update:", new Map(toEmbed.map((c) => [c.source, (existing.has(`${c.source}|${c.source_id}`) ? "update" : "insert")])));
  process.exit(0);
}

// ---- embed in batches ----
async function embedBatch(texts: string[]): Promise<number[][]> {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({ model: MODEL, input: texts }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenAI ${res.status}: ${txt.slice(0, 500)}`);
  }
  const j: any = await res.json();
  return j.data.map((d: any) => d.embedding);
}

console.log(`\nEmbedding ${toEmbed.length} chunks in batches of ${BATCH_EMBED} ...`);
const withEmbedding: (Chunk & { embedding: number[] })[] = [];
let embStart = Date.now();
for (let i = 0; i < toEmbed.length; i += BATCH_EMBED) {
  const slice = toEmbed.slice(i, i + BATCH_EMBED);
  const embeddings = await embedBatch(slice.map((c) => `${c.title}\n\n${c.content}`));
  for (let j = 0; j < slice.length; j++) {
    withEmbedding.push({ ...slice[j], embedding: embeddings[j] });
  }
  const pct = Math.min(100, Math.round(((i + slice.length) / toEmbed.length) * 100));
  process.stdout.write(`\r  ${pct}% (${i + slice.length}/${toEmbed.length})`);
}
const embDur = ((Date.now() - embStart) / 1000).toFixed(1);
console.log(`\n  done in ${embDur}s`);

// ---- upsert in batches ----
console.log(`\nUpserting ${withEmbedding.length} chunks to kb_chunks ...`);
let failed = 0;
for (let i = 0; i < withEmbedding.length; i += BATCH_UPSERT) {
  const batch = withEmbedding.slice(i, i + BATCH_UPSERT).map((c) => ({
    source: c.source,
    source_id: c.source_id,
    title: c.title,
    content: c.content,
    metadata: c.metadata,
    content_hash: c.content_hash,
    // pgvector akzeptiert array; supabase-js serialisiert es als JSON-Array
    // und pgvector parsed das als vector
    embedding: c.embedding as any,
  }));
  const { error } = await sb.from("kb_chunks").upsert(batch, {
    onConflict: "source,source_id",
  });
  if (error) {
    console.error(`\nUpsert batch ${i}-${i + batch.length} failed:`, error.message);
    failed += batch.length;
  } else {
    const pct = Math.min(100, Math.round(((i + batch.length) / withEmbedding.length) * 100));
    process.stdout.write(`\r  ${pct}% (${i + batch.length}/${withEmbedding.length})`);
  }
}
console.log("");

// ---- summary ----
const totalChars = toEmbed.reduce((s, c) => s + c.content.length, 0);
console.log(`\n=== Embedding + Upload Summary ===`);
console.log(`Embedded   : ${withEmbedding.length} chunks`);
console.log(`Upserted   : ${withEmbedding.length - failed} ok, ${failed} failed`);
console.log(`Skipped    : ${skipped} unchanged`);
console.log(`Char-Total : ${totalChars.toLocaleString()} (~${Math.round(totalChars / 3.5).toLocaleString()} Tokens)`);
console.log(`Cost est   : $${((totalChars / 3.5) / 1_000_000 * 0.02).toFixed(4)} (text-embedding-3-small @ $0.02/1M)`);
