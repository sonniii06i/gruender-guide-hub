#!/usr/bin/env node
/**
 * Felix-Batch-Test über den ECHTEN /chat-felix Endpoint mit User-JWT.
 *
 * Flow:
 *  1. Lege einen Test-User per signUp an (anonym, mit Random-Email)
 *  2. Hole sein access_token (JWT)
 *  3. Stelle 200 Fragen mit Authorization: Bearer <JWT>
 *  4. Antworten landen automatisch in chat_messages + chat_conversations
 *     + chat_logs + Memory-Extract läuft im Hintergrund
 *
 * Voraussetzung in Supabase: chat-felix Edge-Function deployed MIT
 *   OPENAI_API_KEY-Secret (oder LOVABLE_API_KEY mit Credits / ANTHROPIC_API_KEY).
 *
 * Aufruf:
 *   node scripts/felix-test/run-real.mjs [--limit N] [--category N]
 */
import fs from "node:fs";
import path from "node:path";

const SUPABASE_URL = "https://rwrjuzemkfghlziretdj.supabase.co";
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3cmp1emVta2ZnaGx6aXJldGRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MTYxMjcsImV4cCI6MjA5MzQ5MjEyN30.2zNrmQwqHyrrhhetpdOjEWbFZ9FZIh8X0KLE4wFYr6U";

const args = process.argv.slice(2);
const arg = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : def;
};
const limit = Number(arg("limit", Infinity));
const onlyCat = arg("category") ? Number(arg("category")) : null;
const startFrom = Number(arg("start", 0));
const reuseEmail = arg("email"); // erlaubt Re-Use eines existierenden Test-Users
const reusePassword = arg("password");

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const questionsName = arg("questions", "questions.json");
const outName = arg("out", "results-real.md");
const QUESTIONS_FILE = path.join(SCRIPT_DIR, questionsName);
const OUT_FILE = path.join(SCRIPT_DIR, outName);
const PROGRESS_FILE = path.join(SCRIPT_DIR, outName.replace(".md", ".progress.json"));
const TEST_USER_FILE = path.join(SCRIPT_DIR, "test-user.json");

const { categories } = JSON.parse(fs.readFileSync(QUESTIONS_FILE, "utf8"));

// === STEP 1: Test-User anlegen oder einloggen ===
async function getTestUser() {
  // PRIORITÄT 1: ENV-Variable FELIX_USER_JWT (höchste Priorität, kein Re-Login nötig)
  if (process.env.FELIX_USER_JWT) {
    console.log("Nutze FELIX_USER_JWT aus env-Variable");
    return { ok: true, access_token: process.env.FELIX_USER_JWT, user_id: "from-env", email: "from-env" };
  }
  // PRIORITÄT 2: ENV-Variable mit Email+Password für signIn
  if (process.env.FELIX_USER_EMAIL && process.env.FELIX_USER_PASSWORD) {
    return await signIn(process.env.FELIX_USER_EMAIL, process.env.FELIX_USER_PASSWORD);
  }
  if (reuseEmail && reusePassword) {
    console.log(`Re-Login als ${reuseEmail}...`);
    return await signIn(reuseEmail, reusePassword);
  }

  // Prüfen ob schon einer existiert
  if (fs.existsSync(TEST_USER_FILE)) {
    const saved = JSON.parse(fs.readFileSync(TEST_USER_FILE, "utf8"));
    console.log(`Re-Login mit gespeichertem Test-User ${saved.email}...`);
    const result = await signIn(saved.email, saved.password);
    if (result.ok) return result;
    console.log("Re-Login fehlgeschlagen, lege neuen User an...");
  }

  // Neuen User anlegen
  const email = `felix-test-${Date.now()}@gruenderx-internal.test`;
  const password = `Test${Date.now()}!ABCabc`;
  console.log(`Lege Test-User ${email} an...`);
  const r = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: ANON_KEY },
    body: JSON.stringify({ email, password }),
  });
  const j = await r.json();
  if (!r.ok) return { ok: false, error: `Signup ${r.status}: ${JSON.stringify(j)}` };
  if (!j.access_token) {
    return { ok: false, error: `Signup ohne access_token (Email-Confirmation aktiv?): ${JSON.stringify(j).slice(0, 200)}` };
  }
  fs.writeFileSync(TEST_USER_FILE, JSON.stringify({ email, password, user_id: j.user?.id }, null, 2));
  console.log(`✅ Test-User angelegt: user_id=${j.user?.id}`);
  return { ok: true, access_token: j.access_token, user_id: j.user?.id, email };
}

async function signIn(email, password) {
  const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: ANON_KEY },
    body: JSON.stringify({ email, password }),
  });
  const j = await r.json();
  if (!r.ok) return { ok: false, error: `SignIn ${r.status}: ${JSON.stringify(j)}` };
  return { ok: true, access_token: j.access_token, user_id: j.user?.id, email };
}

// === STEP 2: Felix-Endpoint mit User-JWT aufrufen ===
async function askFelix(question, jwt) {
  const url = `${SUPABASE_URL}/functions/v1/chat-felix`;
  const start = Date.now();
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ messages: [{ role: "user", content: question }] }),
  });

  if (!resp.ok) {
    const errBody = await resp.text();
    return { ok: false, status: resp.status, error: errBody.slice(0, 500), durationMs: Date.now() - start };
  }

  // SSE-Stream parsen
  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  let full = "";
  let done = false;
  while (!done) {
    const { done: d, value } = await reader.read();
    if (d) break;
    buf += decoder.decode(value, { stream: true });
    let nl;
    while ((nl = buf.indexOf("\n")) !== -1) {
      let line = buf.slice(0, nl);
      buf = buf.slice(nl + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") { done = true; break; }
      try {
        const parsed = JSON.parse(json);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) full += content;
      } catch {
        buf = line + "\n" + buf;
        break;
      }
    }
  }
  return { ok: true, content: full, durationMs: Date.now() - start };
}

// === STEP 3: Main ===
async function main() {
  let auth = await getTestUser();
  if (!auth.ok) {
    console.error("❌ Auth-Setup fehlgeschlagen:", auth.error);
    process.exit(1);
  }
  console.log(`✅ Auth OK. user_id=${auth.user_id}`);

  // Auto-Refresh-Helper: alle 50 Fragen frisches JWT holen (gegen 1h-Expiry)
  const refreshIfNeeded = async (i) => {
    if (i > 0 && i % 50 === 0 && process.env.FELIX_USER_EMAIL && process.env.FELIX_USER_PASSWORD) {
      console.log("🔄 JWT-Refresh (alle 50 Fragen)...");
      const fresh = await signIn(process.env.FELIX_USER_EMAIL, process.env.FELIX_USER_PASSWORD);
      if (fresh.ok) {
        auth = fresh;
        console.log(`   → neues JWT (Länge ${auth.access_token.length})`);
      } else {
        console.log("   ⚠ Refresh fehlgeschlagen, behalte altes JWT");
      }
    }
  };

  // Flatten questions
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

  console.log(`\nFelix-Batch via produktivem Endpoint. ${toProcess.length} Fragen.`);
  console.log(`Output: ${OUT_FILE}\n`);

  const isFreshRun = startFrom === 0 && onlyCat === null;
  if (isFreshRun) {
    fs.writeFileSync(OUT_FILE,
      `# Felix-Batch-Test — Antworten (echter Endpoint)\n\n` +
      `**Ausführungs-Datum:** ${new Date().toISOString()}\n` +
      `**Endpoint:** ${SUPABASE_URL}/functions/v1/chat-felix\n` +
      `**Test-User:** ${auth.email} (user_id=${auth.user_id})\n` +
      `**Total:** ${toProcess.length} Fragen\n\n` +
      `> ✅ Antworten kommen vom PRODUKTIVEN Felix-Endpoint. Memory aktiv, chat_logs aktiv, chat_messages werden NICHT befüllt (das macht das Frontend) — aber chat_logs sieht alles.\n\n` +
      `---\n\n`
    );
  }

  let lastCat = null;
  let successCount = 0, errorCount = 0;
  const startTime = Date.now();

  for (let i = 0; i < toProcess.length; i++) {
    await refreshIfNeeded(i);
    const item = toProcess[i];
    const tag = `[${i + 1}/${toProcess.length}]`;
    process.stdout.write(`${tag} Cat ${item.catIdx}-${item.qIdx}: ${item.question.slice(0, 70)}... `);

    if (item.cat !== lastCat) {
      fs.appendFileSync(OUT_FILE, `\n\n## ${item.cat}\n\n`);
      lastCat = item.cat;
    }

    try {
      const result = await askFelix(item.question, auth.access_token);
      let block;
      if (result.ok) {
        successCount++;
        process.stdout.write(`✅ ${(result.durationMs / 1000).toFixed(1)}s · ${result.content.length}c\n`);
        block = `### Frage ${item.globalIdx}: ${item.question}\n\n` +
                `*${(result.durationMs / 1000).toFixed(1)}s · ${result.content.length} Zeichen*\n\n` +
                `${result.content || "(LEERE ANTWORT)"}\n\n---\n\n`;
      } else {
        errorCount++;
        process.stdout.write(`❌ ${result.status}\n`);
        block = `### Frage ${item.globalIdx}: ${item.question}\n\n` +
                `**❌ FEHLER** Status ${result.status}\n\n\`\`\`\n${result.error}\n\`\`\`\n\n---\n\n`;
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
      elapsedSec: Math.round((Date.now() - startTime) / 1000),
    }, null, 2));

    if (i < toProcess.length - 1) await new Promise((r) => setTimeout(r, 400));
  }

  const totalSec = Math.round((Date.now() - startTime) / 1000);
  console.log(`\n=== Fertig ===`);
  console.log(`OK: ${successCount} | Fehler: ${errorCount} | Zeit: ${totalSec}s (~${(totalSec/60).toFixed(1)} Min)`);
  console.log(`Output: ${OUT_FILE}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
