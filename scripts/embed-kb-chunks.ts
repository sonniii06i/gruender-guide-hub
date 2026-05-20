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

const BATCH_EMBED = 1; // hotspot/MTU extreme-mode → minimaler request body
const MODEL = "text-embedding-3-small";
const MAX_RETRIES = 7;

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
  let lastErr: unknown;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch("https://api.openai.com/v1/embeddings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_KEY}`,
          Connection: "close", // keine keep-alive → reduziert EPIPE bei großen Bodies
        },
        body: JSON.stringify({ model: MODEL, input: texts }),
      });
      if (!res.ok) {
        const txt = await res.text();
        if (res.status === 429 || res.status >= 500) throw new Error(`OpenAI ${res.status}: ${txt.slice(0, 300)} (retry)`);
        throw new Error(`OpenAI ${res.status}: ${txt.slice(0, 500)}`);
      }
      const j: any = await res.json();
      return j.data.map((d: any) => d.embedding);
    } catch (e: any) {
      lastErr = e;
      const isRetryable = e?.cause?.code === "EPIPE" || e?.cause?.code === "ECONNRESET" || e?.cause?.code === "ETIMEDOUT" || /fetch failed|retry/.test(e?.message ?? "");
      if (!isRetryable || attempt === MAX_RETRIES) throw e;
      const wait = Math.min(30000, 1000 * Math.pow(2, attempt - 1)); // 1s, 2s, 4s, 8s, 16s, 30s
      console.warn(`\n  ⚠️ embed attempt ${attempt} failed (${e?.cause?.code ?? e?.message?.slice(0, 60)}) — retry in ${wait}ms`);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
  throw lastErr;
}

console.log(`\nEmbed + Upsert pro Batch (${BATCH_EMBED} pro Embed-Call). Resumable: bei Abbruch einfach neu starten.`);
let processedOk = 0;
let processedFail = 0;
const embStart = Date.now();
for (let i = 0; i < toEmbed.length; i += BATCH_EMBED) {
  const slice = toEmbed.slice(i, i + BATCH_EMBED);
  let embeddings: number[][];
  try {
    embeddings = await embedBatch(slice.map((c) => `${c.title}\n\n${c.content}`));
  } catch (e: any) {
    console.error(`\n  ✗ embed batch ${i}-${i + slice.length} failed after retries: ${e?.cause?.code ?? e?.message?.slice(0, 80)} — skipping, lauf später nochmal für resume`);
    processedFail += slice.length;
    continue;
  }
  // Direct upsert this batch — falls Skript abbricht, sind bisherige in DB
  const rows = slice.map((c, j) => ({
    source: c.source,
    source_id: c.source_id,
    title: c.title,
    content: c.content,
    metadata: c.metadata,
    content_hash: c.content_hash,
    embedding: embeddings[j] as any,
  }));
  let upsertErr: string | null = null;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const { error } = await sb.from("kb_chunks").upsert(rows, { onConflict: "source,source_id" });
      if (error) {
        upsertErr = error.message;
        break; // postgres-Fehler → kein retry (selten transient)
      }
      upsertErr = null;
      break;
    } catch (e: any) {
      const code = e?.cause?.code;
      const isRetryable = code === "EPIPE" || code === "ECONNRESET" || code === "ETIMEDOUT" || code === "UND_ERR_SOCKET" || /fetch failed/.test(e?.message ?? "");
      if (!isRetryable || attempt === MAX_RETRIES) {
        upsertErr = e?.message ?? String(e);
        break;
      }
      const wait = Math.min(30000, 1000 * Math.pow(2, attempt - 1));
      console.warn(`\n  ⚠️ upsert attempt ${attempt} failed (${code ?? e?.message?.slice(0, 60)}) — retry in ${wait}ms`);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
  if (upsertErr) {
    console.error(`\n  ✗ upsert batch ${i}-${i + slice.length} failed after retries: ${upsertErr.slice(0, 120)}`);
    processedFail += slice.length;
  } else {
    processedOk += slice.length;
  }
  const total = processedOk + processedFail;
  const pct = Math.min(100, Math.round((total / toEmbed.length) * 100));
  const elapsed = ((Date.now() - embStart) / 1000).toFixed(0);
  process.stdout.write(`\r  ${pct}% (${total}/${toEmbed.length}) · ok ${processedOk} fail ${processedFail} · ${elapsed}s`);
}
console.log("");

// ---- summary ----
const totalChars = toEmbed.reduce((s, c) => s + c.content.length, 0);
console.log(`\n=== Embedding + Upload Summary ===`);
console.log(`Embedded+Upserted : ${processedOk} chunks`);
console.log(`Failed            : ${processedFail} chunks (lauf nochmal → wird nur diese versuchen)`);
console.log(`Skipped (hash)    : ${skipped} unchanged`);
console.log(`Char-Total        : ${totalChars.toLocaleString()} (~${Math.round(totalChars / 3.5).toLocaleString()} Tokens)`);
console.log(`Cost est          : $${((totalChars / 3.5) / 1_000_000 * 0.02).toFixed(4)} (text-embedding-3-small @ $0.02/1M)`);
