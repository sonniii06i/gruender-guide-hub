// ===================================================================
// system-waechter — prüft, ob die Automatiken von GründerX wirklich laufen.
//
// Anlass (08.10.2026): Felix und der Blog-Generator standen wochenlang still,
// weil OpenAI kein Guthaben mehr hatte und Gemini sein Monatslimit erreicht
// hatte. Niemand hat es gemerkt. Dieser Wächter hätte es am ersten Tag gemeldet.
//
// Aufruf: GitHub Action `.github/workflows/system-waechter.yml` alle 6 h,
// Header x-waechter-secret (Secret WAECHTER_SECRET, nur hier und in GitHub).
// Antwort: { ok, probleme[], details } – die Action postet probleme nach
// Discord #system und prüft die Zustellung am HTTP-Status.
//
// Prüfungen:
//   1. KI-Anbieter: je eine Mini-Anfrage (1 Token) an Gemini, OpenAI,
//      Anthropic (falls Schlüssel gesetzt). Felix ist tot, wenn alle scheitern.
//   2. Blog: jüngster veröffentlichter Artikel älter als 7 Tage.
//   3. Events: gruender-events.json älter als 36 h oder Monitor-Quelle mit Fehler.
//   4. Felix-Fehler: Fehlerzeilen in chat_logs der letzten 24 h.
// ===================================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const BLOG_MAX_TAGE = 7;
const EVENTS_MAX_STUNDEN = 36;

type Pruefung = { name: string; ok: boolean; detail: string };

const kurz = (status: number, text: string) => {
  const typ = text.match(/"(?:type|code|status)"\s*:\s*"([^"]+)"/)?.[1] ?? "";
  const msg = text.match(/"message"\s*:\s*"([^"]{0,120})/)?.[1] ?? "";
  return `${status}${typ ? ` ${typ}` : ""}${msg ? `: ${msg}` : ""}`.replace(/(sk-|AIza)[\w-]+/g, "[key]");
};

async function probe(name: string, f: () => Promise<Response>): Promise<Pruefung> {
  try {
    const r = await f();
    const t = await r.text();
    return { name, ok: r.ok, detail: r.ok ? "antwortet" : kurz(r.status, t) };
  } catch (e) {
    return { name, ok: false, detail: `nicht erreichbar: ${(e as Error).message}` };
  }
}

Deno.serve(async (req) => {
  const secret = Deno.env.get("WAECHTER_SECRET");
  if (!secret || req.headers.get("x-waechter-secret") !== secret) {
    return new Response("unauthorized", { status: 401 });
  }
  const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");
  const pruefungen: Pruefung[] = [];

  // ---- 1. KI-Anbieter ----
  const GEMINI = Deno.env.get("GEMINI_API_KEY");
  const OPENAI = Deno.env.get("OPENAI_API_KEY");
  const ANTHROPIC = Deno.env.get("ANTHROPIC_API_KEY");
  const ki: Pruefung[] = [];
  if (GEMINI)
    ki.push(await probe("Gemini", () =>
      fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: "ok" }] }], generationConfig: { maxOutputTokens: 1 } }),
      })));
  if (OPENAI)
    ki.push(await probe("OpenAI", () =>
      fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${OPENAI}` },
        body: JSON.stringify({ model: "gpt-4o-mini", max_tokens: 1, messages: [{ role: "user", content: "ok" }] }),
      })));
  if (ANTHROPIC)
    ki.push(await probe("Anthropic", () =>
      fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "content-type": "application/json", "x-api-key": ANTHROPIC, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 1, messages: [{ role: "user", content: "ok" }] }),
      })));
  pruefungen.push(...ki.map((p) => ({ ...p, name: `KI ${p.name}` })));
  pruefungen.push({
    name: "Felix (mind. ein KI-Anbieter)",
    ok: ki.some((p) => p.ok),
    detail: ki.some((p) => p.ok) ? "mindestens ein Anbieter antwortet" : "ALLE Anbieter scheitern – Felix und Blog-Generator stehen",
  });

  // ---- 2. Blog ----
  const { data: blog, error: blogErr } = await db
    .from("blog_posts").select("published_at, title").eq("status", "published")
    .order("published_at", { ascending: false }).limit(1).maybeSingle();
  if (blogErr) pruefungen.push({ name: "Blog", ok: false, detail: `Abfrage fehlgeschlagen: ${blogErr.message}` });
  else {
    const tage = blog?.published_at ? Math.floor((Date.now() - Date.parse(blog.published_at)) / 864e5) : 9999;
    pruefungen.push({
      name: "Blog-Generator",
      ok: tage <= BLOG_MAX_TAGE,
      detail: blog ? `letzter Artikel vor ${tage} Tagen („${String(blog.title).slice(0, 50)}“)` : "noch nie ein Artikel",
    });
  }

  // ---- 3. Events ----
  try {
    const r = await fetch("https://gruenderx.de/gruender-events.json");
    if (!r.ok || !(r.headers.get("content-type") ?? "").includes("json")) throw new Error(`HTTP ${r.status} ${r.headers.get("content-type")}`);
    const d = await r.json();
    const std = Math.floor((Date.now() - Date.parse(d.stand)) / 3600_000);
    pruefungen.push({ name: "Event-Daten", ok: std <= EVENTS_MAX_STUNDEN, detail: `${d.events?.length ?? 0} Events, Stand vor ${std} h` });
  } catch (e) {
    pruefungen.push({ name: "Event-Daten", ok: false, detail: `gruender-events.json: ${(e as Error).message}` });
  }

  // ---- 4. Felix-Fehler 24 h ----
  const seit = new Date(Date.now() - 864e5).toISOString();
  const { data: fehler } = await db.from("chat_logs").select("error").not("error", "is", null).gte("created_at", seit).limit(50);
  const { count: gesamt } = await db.from("chat_logs").select("id", { count: "exact", head: true }).gte("created_at", seit);
  const nF = fehler?.length ?? 0;
  pruefungen.push({
    name: "Felix-Anfragen 24 h",
    ok: nF === 0 || nF < (gesamt ?? 0) / 2,
    detail: `${gesamt ?? 0} Anfragen, ${nF} mit Fehler${nF ? ` (zuletzt: ${String(fehler![0].error).slice(0, 120)})` : ""}`,
  });

  const probleme = pruefungen.filter((p) => !p.ok).map((p) => `${p.name}: ${p.detail}`);
  const ergebnis = { ok: probleme.length === 0, zeit: new Date().toISOString(), probleme, details: pruefungen };
  console.log("[waechter]", JSON.stringify(ergebnis));
  return new Response(JSON.stringify(ergebnis), { headers: { "content-type": "application/json" } });
});
