#!/usr/bin/env node
/**
 * Felix-Batch-Test (OpenAI-Variante):
 * Stellt 200 Fragen sequentiell gegen OpenAI gpt-4o mit dem ECHTEN
 * Felix-System-Prompt (aus supabase/functions/chat-felix/index.ts).
 *
 * Vorteil: keine Lovable-Credits nötig, identischer System-Prompt
 * → 1:1-Qualitätsvergleich zu Production-Felix.
 *
 * Aufruf:
 *   OPENAI_API_KEY=sk-... node scripts/felix-test/run-batch.mjs
 *   --limit N          → nur N Fragen
 *   --category N       → nur Kategorie N (1-10)
 *   --start N          → ab Frage N
 *   --model gpt-4o     → Modell (default: gpt-4o)
 *
 * Output: scripts/felix-test/results.md
 */
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const arg = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : def;
};
const limit = Number(arg("limit", Infinity));
const onlyCat = arg("category") ? Number(arg("category")) : null;
const startFrom = Number(arg("start", 0));
const model = arg("model", "gpt-4o");

const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) {
  console.error("FEHLT: OPENAI_API_KEY env-var. Aufruf: OPENAI_API_KEY=sk-... node ...");
  process.exit(1);
}

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const QUESTIONS_FILE = path.join(SCRIPT_DIR, "questions.json");
const PROMPT_FILE = path.join(SCRIPT_DIR, "system-prompt.txt");
const OUT_FILE = path.join(SCRIPT_DIR, "results.md");
const PROGRESS_FILE = path.join(SCRIPT_DIR, "progress.json");

const { categories } = JSON.parse(fs.readFileSync(QUESTIONS_FILE, "utf8"));
const SYSTEM_PROMPT = fs.readFileSync(PROMPT_FILE, "utf8");

// Flatten
const allQuestions = [];
categories.forEach((cat, ci) => {
  cat.questions.forEach((q, qi) => {
    allQuestions.push({ cat: cat.name, catIdx: ci + 1, qIdx: qi + 1, globalIdx: allQuestions.length + 1, question: q });
  });
});

let toProcess = allQuestions;
if (onlyCat !== null) toProcess = toProcess.filter((q) => q.catIdx === onlyCat);
toProcess = toProcess.slice(startFrom);
if (limit !== Infinity) toProcess = toProcess.slice(0, limit);

console.log(`Felix-Batch-Test (OpenAI ${model}). ${toProcess.length} Fragen.`);
console.log(`System-Prompt-Länge: ${SYSTEM_PROMPT.length} chars`);

const isFreshRun = startFrom === 0 && onlyCat === null;
if (isFreshRun) {
  fs.writeFileSync(OUT_FILE,
    `# Felix-Batch-Test — Antworten\n\n` +
    `**Ausführungs-Datum:** ${new Date().toISOString()}\n` +
    `**Modell:** OpenAI ${model} mit Felix-System-Prompt (${SYSTEM_PROMPT.length} chars)\n` +
    `**Total:** ${toProcess.length} Fragen\n\n` +
    `> ⚠️ Diese Antworten kommen NICHT vom produktiven Felix-Endpoint (Lovable-Credits leer), sondern direkt von OpenAI ${model} mit dem identischen Felix-System-Prompt. Logik & Wissen sind 1:1, aber NO Memory + NO chat_logs.\n\n` +
    `---\n\n`
  );
}

async function askOpenAI(question) {
  const start = Date.now();
  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: question },
      ],
      temperature: 0.3,
      max_tokens: 1500,
    }),
  });

  if (!resp.ok) {
    const errBody = await resp.text();
    return { ok: false, status: resp.status, error: errBody.slice(0, 500), durationMs: Date.now() - start };
  }
  const j = await resp.json();
  return {
    ok: true,
    content: j.choices?.[0]?.message?.content ?? "",
    durationMs: Date.now() - start,
    usage: j.usage,
  };
}

let lastCat = null;
let successCount = 0;
let errorCount = 0;
let totalInputTokens = 0;
let totalOutputTokens = 0;
const startTime = Date.now();

for (let i = 0; i < toProcess.length; i++) {
  const item = toProcess[i];
  const tag = `[${i + 1}/${toProcess.length}]`;
  process.stdout.write(`${tag} Cat ${item.catIdx}-${item.qIdx}: ${item.question.slice(0, 75)}... `);

  if (item.cat !== lastCat) {
    fs.appendFileSync(OUT_FILE, `\n\n## ${item.cat}\n\n`);
    lastCat = item.cat;
  }

  try {
    const result = await askOpenAI(item.question);
    let block;
    if (result.ok) {
      successCount++;
      totalInputTokens += result.usage?.prompt_tokens || 0;
      totalOutputTokens += result.usage?.completion_tokens || 0;
      process.stdout.write(`✅ ${(result.durationMs / 1000).toFixed(1)}s · ${result.content.length}c\n`);
      block = `### Frage ${item.globalIdx}: ${item.question}\n\n` +
              `*${(result.durationMs / 1000).toFixed(1)}s · ${result.content.length} Zeichen · ${result.usage?.completion_tokens || "?"} Output-Tokens*\n\n` +
              `${result.content || "(LEERE ANTWORT)"}\n\n` +
              `---\n\n`;
    } else {
      errorCount++;
      process.stdout.write(`❌ Status ${result.status}\n`);
      block = `### Frage ${item.globalIdx}: ${item.question}\n\n` +
              `**❌ FEHLER** Status ${result.status} · ${(result.durationMs / 1000).toFixed(1)}s\n\n` +
              `\`\`\`\n${result.error}\n\`\`\`\n\n---\n\n`;
    }
    fs.appendFileSync(OUT_FILE, block);
  } catch (e) {
    errorCount++;
    process.stdout.write(`❌ EXCEPTION: ${e.message}\n`);
    fs.appendFileSync(OUT_FILE,
      `### Frage ${item.globalIdx}: ${item.question}\n\n**❌ EXCEPTION:** ${e.message}\n\n---\n\n`
    );
  }

  fs.writeFileSync(PROGRESS_FILE, JSON.stringify({
    completed: i + 1, total: toProcess.length,
    success: successCount, errors: errorCount,
    inputTokens: totalInputTokens, outputTokens: totalOutputTokens,
    estCostUsd: ((totalInputTokens * 2.5 + totalOutputTokens * 10) / 1_000_000).toFixed(3),
    elapsedSec: Math.round((Date.now() - startTime) / 1000),
  }, null, 2));

  if (i < toProcess.length - 1) await new Promise((r) => setTimeout(r, 300));
}

const totalSec = Math.round((Date.now() - startTime) / 1000);
const estCost = ((totalInputTokens * 2.5 + totalOutputTokens * 10) / 1_000_000).toFixed(3);
console.log(`\n=== Fertig ===`);
console.log(`Erfolgreich: ${successCount} | Fehler: ${errorCount} | Zeit: ${totalSec}s (~${(totalSec/60).toFixed(1)} Min)`);
console.log(`Tokens: ${totalInputTokens} Input + ${totalOutputTokens} Output | Est. Kosten: $${estCost}`);
console.log(`Output: ${OUT_FILE}`);
