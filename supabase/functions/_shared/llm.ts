// Gemeinsame KI-Anbieter-Kette fuer alle Text-Aufrufe von GründerX
// (Felix-Chat, Memory-Extract, enhance-text, Blog-Artikel).
//
// Reihenfolge (Betreiber 19.10.2026, 200 $/Monat Claude-Freiguthaben):
//   Claude → Gemini → OpenAI
// Jeder Fehler eines Anbieters (Guthaben leer, Kontingent, 4xx/5xx, Netzwerk,
// Refusal, leere Antwort) fuehrt zum naechsten. Ohne ANTHROPIC_API_KEY wird
// Claude uebersprungen, ohne GEMINI_API_KEY Gemini usw.
//
// llmChat() ist ein Drop-in fuer einen OpenAI-Chat-Completions-Body und
// liefert eine Response im OpenAI-Format:
//   - stream:false → JSON { choices:[{ message:{ content, tool_calls? } }], usage }
//   - stream:true  → SSE  data: {"choices":[{"index":0,"delta":{"content":"…"}}]} … data: [DONE]
// Kopfzeilen:
//   x-llm-anbieter  "claude:<modell>" | "gemini:<modell>" | "openai:<modell>"
//   x-llm-versuche  JSON der gescheiterten Versuche (auch bei Erfolg, wenn
//                   vorher jemand ausgefallen ist – fuers Log)
// Scheitern alle: saubere JSON-Fehlerantwort (429 nur wenn alle 429, sonst 503),
// Body { error: { message: "KI_ALLE_ANBIETER_GESCHEITERT" | "AI_KEY_MISSING" } }.
//
// Claude laeuft ueber das offizielle SDK (kein OpenAI-Shim). Opus/Haiku 5.5:
// keine Sampling-Parameter (400), kein thinking-Feld (immer an), Tiefe nur ueber
// output_config.effort. Beim Stream wird bis zum ersten Text gewartet, bevor die
// Response rausgeht – so faellt auch ein Guthaben-Fehler ("Your credit balance
// is too low" = HTTP 400) oder eine Refusal noch zum naechsten Anbieter.
//
// Embeddings und Bilder laufen NICHT hierueber (anderes Format).

import Anthropic from "npm:@anthropic-ai/sdk@0.131.0";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";

export const CLAUDE_MODELL = "claude-opus-5-5";
export const CLAUDE_MODELL_KLEIN = "claude-haiku-5-5";
export const GEMINI_MODELL = "gemini-2.5-flash";
export const OPENAI_MODELL = "gpt-4o";

export type LlmAnbieter = "claude" | "gemini" | "openai";
export type Effort = "low" | "medium" | "high";

// Felder, die Googles OpenAI-Kompatibilitaetsschicht nicht kennt.
const GEMINI_DROP = ["presence_penalty", "frequency_penalty", "logit_bias", "user", "store", "parallel_tool_calls", "logprobs", "top_logprobs", "service_tier", "metadata"];

/** Schmale Sicht auf den SDK-Client (Test-Injektion moeglich). */
export interface ClaudeStream extends AsyncIterable<Anthropic.Beta.Messages.BetaRawMessageStreamEvent> {
  on(event: "error", listener: (err: unknown) => void): unknown;
  finalMessage(): Promise<Anthropic.Beta.Messages.BetaMessage>;
}
export interface ClaudeClient {
  beta: {
    messages: {
      stream(
        params: Anthropic.Beta.Messages.MessageCreateParams,
        options?: { signal?: AbortSignal },
      ): ClaudeStream;
    };
  };
}

export interface LlmOptionen {
  /** Name fuer Logzeilen, z. B. Function-Name */
  tag?: string;
  /** false = Anbieter auslassen */
  claude?: { modell?: string; effort?: Effort; maxTokens?: number; timeoutMs?: number } | false;
  gemini?: { modell?: string } | false;
  openai?: { modell?: string } | false;
  signal?: AbortSignal;
  /** nur Tests: SDK-Client ersetzen */
  claudeClient?: ClaudeClient;
  /** nur Tests: fetch ersetzen */
  fetchFn?: typeof fetch;
}

export interface LlmVersuch {
  name: string;
  status: number;
  code: string;
}

// deno-lint-ignore no-explicit-any
type Body = Record<string, any>;

// ---------------------------------------------------------------------------
// Fehler-Kurzform (nie Schluessel, nie ganze Bodies)
// ---------------------------------------------------------------------------

const KONTINGENT_RE = /insufficient_quota|billing|spend|credit|quota|resource_exhausted|exceeded your current/i;

export function fehlerCode(txt: string): string {
  try {
    let j = JSON.parse(txt);
    if (Array.isArray(j)) j = j[0];
    const e = j?.error ?? j;
    if (typeof e?.message === "string" && /credit balance/i.test(e.message)) return "credit_balance_too_low";
    const teile = [e?.code, e?.status, e?.type].filter((x) => typeof x === "string" && x);
    if (teile.length) return String(teile[0]).slice(0, 60);
    if (typeof e?.message === "string" && KONTINGENT_RE.test(e.message)) return "quota";
  } catch { /* kein JSON */ }
  return KONTINGENT_RE.test(txt) ? "quota" : "";
}

/** Kurztext der Versuche fuers Log, z. B. "claude 400 credit_balance_too_low | gemini 429 RESOURCE_EXHAUSTED". */
export function versucheText(v: LlmVersuch[]): string {
  return v.map((x) => `${x.name.split(":")[0]} ${x.status || "-"}${x.code ? ` ${x.code}` : ""}`).join(" | ");
}

export function versucheAus(res: Response): LlmVersuch[] {
  try {
    const v = JSON.parse(res.headers.get("x-llm-versuche") || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

/** Anbieter + Modell aus dem Kopf x-llm-anbieter. */
export function anbieterAus(res: Response): { anbieter: LlmAnbieter | null; modell: string | null } {
  const h = res.headers.get("x-llm-anbieter") || "";
  const i = h.indexOf(":");
  if (i < 0) return { anbieter: null, modell: null };
  const a = h.slice(0, i);
  return {
    anbieter: a === "claude" || a === "gemini" || a === "openai" ? a : null,
    modell: h.slice(i + 1) || null,
  };
}

// ---------------------------------------------------------------------------
// OpenAI-Body → Claude-Parameter
// ---------------------------------------------------------------------------

// deno-lint-ignore no-explicit-any
function textAus(content: any): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((p) => (typeof p === "string" ? p : p?.type === "text" ? String(p.text ?? "") : ""))
      .join("");
  }
  return content == null ? "" : String(content);
}

// deno-lint-ignore no-explicit-any
function erzwungenesTool(toolChoice: any): string | null {
  if (!toolChoice) return null;
  if (toolChoice === "required") return "*";
  if (typeof toolChoice === "object" && toolChoice.function?.name) return String(toolChoice.function.name);
  return null;
}

export function zuClaudeParams(
  body: Body,
  modell: string,
  effort: Effort,
  maxTokens?: number,
): Anthropic.Beta.Messages.MessageCreateParams {
  const systemTeile: string[] = [];
  const msgs: { role: "user" | "assistant"; content: string }[] = [];
  for (const m of (body.messages ?? []) as Body[]) {
    const text = textAus(m.content);
    if (m.role === "system" || m.role === "developer") {
      if (text.trim()) systemTeile.push(text);
      continue;
    }
    // tool-Ergebnisse gibt es in unseren Aufrufern nicht; notfalls als Nutzertext.
    const role: "user" | "assistant" = m.role === "assistant" ? "assistant" : "user";
    if (!text.trim()) continue; // leere Bloecke lehnt die API ab
    const last = msgs[msgs.length - 1];
    if (last && last.role === role) last.content += `\n\n${text}`; // gleiche Rollen zusammenfuehren
    else msgs.push({ role, content: text });
  }
  // Erste Nachricht muss vom Nutzer kommen (z. B. Begruessung des Assistenten
  // vorne weg), letzte ebenfalls – Opus 5.5 kennt kein Prefill (400).
  while (msgs.length && msgs[0].role === "assistant") msgs.shift();
  while (msgs.length && msgs[msgs.length - 1].role === "assistant") msgs.pop();

  // JSON-Antwortformat → Anweisung im system
  const rf = body.response_format;
  if (rf?.type === "json_object") {
    systemTeile.push("Antworte ausschließlich mit einem gültigen JSON-Objekt, ohne Markdown-Codeblock und ohne Text davor oder danach.");
  } else if (rf?.type === "json_schema") {
    systemTeile.push(
      `Antworte ausschließlich mit gültigem JSON nach diesem Schema, ohne Markdown-Codeblock und ohne Text davor oder danach:\n${JSON.stringify(rf.json_schema?.schema ?? rf.json_schema ?? {})}`,
    );
  }

  // Tools: OpenAI-function → Claude-Tool. Erzwungene tool_choice lehnt
  // Opus 5.5 ab (400) → auto + Anweisung im system.
  // deno-lint-ignore no-explicit-any
  let tools: any[] | undefined;
  // deno-lint-ignore no-explicit-any
  let toolChoice: any;
  if (Array.isArray(body.tools) && body.tools.length) {
    tools = (body.tools as Body[])
      .filter((t) => t.type === "function" && t.function?.name)
      .map((t) => {
        const params = t.function.parameters ?? { type: "object", properties: {} };
        return {
          name: t.function.name,
          description: t.function.description ?? "",
          input_schema: params,
          ...(params.additionalProperties === false ? { strict: true } : {}),
        };
      });
    const zwang = erzwungenesTool(body.tool_choice);
    if (body.tool_choice === "none") toolChoice = { type: "none" };
    else toolChoice = { type: "auto" };
    if (zwang) {
      systemTeile.push(
        zwang === "*"
          ? "Liefere dein Ergebnis ausschließlich über einen Tool-Aufruf."
          : `Liefere dein Ergebnis ausschließlich über einen Aufruf des Tools \`${zwang}\`.`,
      );
    }
  }

  const mt = maxTokens ?? body.max_tokens ?? body.max_completion_tokens ?? 16000;
  // deno-lint-ignore no-explicit-any
  const p: any = {
    model: modell,
    max_tokens: mt,
    messages: msgs,
    output_config: { effort },
  };
  if (systemTeile.length) p.system = systemTeile.join("\n\n");
  if (tools?.length) {
    p.tools = tools;
    p.tool_choice = toolChoice;
  }
  // Server-seitiger Refusal-Rueckfall nur bei Opus (Haiku 5.5 hat keinen).
  if (modell.startsWith("claude-opus")) {
    p.betas = ["server-side-fallback-2026-07-01"];
    p.fallbacks = "default";
  }
  return p;
}

// ---------------------------------------------------------------------------
// Claude-Antwort → OpenAI-Format
// ---------------------------------------------------------------------------

const FINISH: Record<string, string> = {
  end_turn: "stop",
  stop_sequence: "stop",
  max_tokens: "length",
  tool_use: "tool_calls",
  pause_turn: "stop",
};

class LeereAntwort extends Error {
  constructor(public code: string) {
    super(code);
  }
}

function claudeZuOpenAiJson(msg: Anthropic.Beta.Messages.BetaMessage, mitTools: boolean, zwang: boolean): Body {
  if (msg.stop_reason === "refusal") throw new LeereAntwort("refusal");
  // Nur text-Bloecke (thinking-Bloecke ignorieren)
  const text = msg.content.filter((b) => b.type === "text").map((b) => (b as { text: string }).text).join("");
  const toolCalls = mitTools
    ? msg.content
      .filter((b) => b.type === "tool_use")
      .map((b) => {
        const t = b as { id: string; name: string; input: unknown };
        return { id: t.id, type: "function", function: { name: t.name, arguments: JSON.stringify(t.input ?? {}) } };
      })
    : [];
  if (zwang && !toolCalls.length) throw new LeereAntwort("kein_tool_aufruf");
  if (!text.trim() && !toolCalls.length) throw new LeereAntwort("leer");
  const message: Body = { role: "assistant", content: text || null };
  if (toolCalls.length) message.tool_calls = toolCalls;
  return {
    id: msg.id,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model: msg.model,
    choices: [{ index: 0, message, finish_reason: FINISH[msg.stop_reason ?? ""] ?? "stop" }],
    usage: {
      prompt_tokens: msg.usage?.input_tokens ?? 0,
      completion_tokens: msg.usage?.output_tokens ?? 0,
      total_tokens: (msg.usage?.input_tokens ?? 0) + (msg.usage?.output_tokens ?? 0),
    },
  };
}

const enc = new TextEncoder();
const sse = (obj: unknown) => enc.encode(`data: ${typeof obj === "string" ? obj : JSON.stringify(obj)}\n\n`);
const deltaChunk = (text: string) => ({ choices: [{ index: 0, delta: { content: text } }] });

async function claudeAufruf(
  client: ClaudeClient,
  body: Body,
  modell: string,
  effort: Effort,
  maxTokens: number | undefined,
  tag: string,
  signal?: AbortSignal,
): Promise<Response> {
  const params = zuClaudeParams(body, modell, effort, maxTokens);
  if (!params.messages.length) throw new LeereAntwort("keine_nachricht");
  const mitTools = !!params.tools?.length;
  const zwang = mitTools && !!erzwungenesTool(body.tool_choice);
  const stream = client.beta.messages.stream(params, signal ? { signal } : undefined);
  // Fehler-Listener: verhindert unbehandelte Rejections im SDK und haelt
  // Fehler fest, die zwischen zwei Lese-Schritten auftreten.
  let streamFehler: unknown = null;
  stream.on("error", (e) => {
    streamFehler = e;
  });

  if (!body.stream) {
    const msg = await stream.finalMessage();
    const json = claudeZuOpenAiJson(msg, mitTools, zwang);
    return new Response(JSON.stringify(json), { status: 200, headers: { "Content-Type": "application/json" } });
  }

  // Stream: bis zum ersten Text warten. Alles davor (HTTP-Fehler, Guthaben,
  // Refusal vor der Ausgabe, leerer Stream) faellt zum naechsten Anbieter.
  const it = stream[Symbol.asyncIterator]();
  let ersterText: string | null = null;
  let stopGrund: string | null = null;
  while (ersterText === null) {
    const { value: ev, done } = await it.next();
    if (done) break;
    if (ev.type === "content_block_delta" && ev.delta.type === "text_delta" && ev.delta.text) {
      ersterText = ev.delta.text;
    } else if (ev.type === "message_delta") {
      stopGrund = ev.delta.stop_reason ?? stopGrund;
    }
  }
  if (ersterText === null) {
    if (streamFehler) throw streamFehler;
    throw new LeereAntwort(stopGrund === "refusal" ? "refusal" : "leer");
  }

  const ausgabe = new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(sse(deltaChunk(ersterText!)));
      try {
        while (true) {
          const { value: ev, done } = await it.next();
          if (done) break;
          // Nur text_delta weiterreichen (thinking-/signature-Deltas ignorieren)
          if (ev.type === "content_block_delta" && ev.delta.type === "text_delta" && ev.delta.text) {
            controller.enqueue(sse(deltaChunk(ev.delta.text)));
          }
        }
        if (streamFehler) console.error(`${tag}: Claude-Stream abgebrochen`, String(streamFehler).slice(0, 300));
      } catch (e) {
        console.error(`${tag}: Claude-Stream abgebrochen`, String(e).slice(0, 300));
      }
      controller.enqueue(sse("[DONE]"));
      controller.close();
    },
  });
  return new Response(ausgabe, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

function claudeFehler(e: unknown): { status: number; code: string } {
  // Typisierte SDK-Fehler, spezifisch → allgemein
  if (e instanceof LeereAntwort) return { status: 0, code: e.code };
  if (e instanceof Anthropic.APIConnectionTimeoutError) return { status: 0, code: "timeout" };
  if (e instanceof Anthropic.APIConnectionError) return { status: 0, code: "netzwerk" };
  if (e instanceof Anthropic.BadRequestError) {
    // "Your credit balance is too low …" kommt als 400 invalid_request_error
    return { status: 400, code: /credit balance/i.test(e.message) ? "credit_balance_too_low" : (e.type ?? "invalid_request_error") };
  }
  if (e instanceof Anthropic.AuthenticationError) return { status: 401, code: e.type ?? "authentication_error" };
  if (e instanceof Anthropic.PermissionDeniedError) return { status: 403, code: e.type ?? "permission_error" };
  if (e instanceof Anthropic.NotFoundError) return { status: 404, code: e.type ?? "not_found_error" };
  if (e instanceof Anthropic.RateLimitError) return { status: 429, code: e.type ?? "rate_limit_error" };
  if (e instanceof Anthropic.InternalServerError) return { status: e.status ?? 500, code: e.type ?? "api_error" };
  if (e instanceof Anthropic.APIError) return { status: e.status ?? 0, code: e.type ?? "api_error" };
  return { status: 0, code: "fehler" };
}

// ---------------------------------------------------------------------------
// Kette
// ---------------------------------------------------------------------------

function geminiBody(body: Body, modell: string): Body {
  const b: Body = { ...body, model: modell };
  for (const k of GEMINI_DROP) delete b[k];
  if (b.max_completion_tokens && !b.max_tokens) b.max_tokens = b.max_completion_tokens;
  delete b.max_completion_tokens;
  return b;
}

function mitKopf(r: Response, extra: Record<string, string>): Response {
  const h = new Headers(r.headers);
  for (const [k, v] of Object.entries(extra)) h.set(k, v);
  return new Response(r.body, { status: r.status, statusText: r.statusText, headers: h });
}

export function llmVerfuegbar(): boolean {
  return !!(Deno.env.get("ANTHROPIC_API_KEY") || Deno.env.get("GEMINI_API_KEY") || Deno.env.get("OPENAI_API_KEY"));
}

export async function llmChat(body: Body, opts: LlmOptionen = {}): Promise<Response> {
  const tag = opts.tag || "llm";
  const f = opts.fetchFn ?? fetch;
  const aKey = Deno.env.get("ANTHROPIC_API_KEY");
  const gKey = Deno.env.get("GEMINI_API_KEY");
  const oKey = Deno.env.get("OPENAI_API_KEY");

  type Versuch = { name: string; lauf: () => Promise<Response> };
  const kette: Versuch[] = [];

  if (opts.claude !== false && (aKey || opts.claudeClient)) {
    const c = opts.claude || {};
    const modell = c.modell || CLAUDE_MODELL;
    const client: ClaudeClient = opts.claudeClient ??
      (new Anthropic({ apiKey: aKey, maxRetries: 0, timeout: c.timeoutMs ?? 120_000 }) as unknown as ClaudeClient);
    kette.push({
      name: `claude:${modell}`,
      lauf: () => claudeAufruf(client, body, modell, c.effort ?? "low", c.maxTokens, tag, opts.signal),
    });
  }
  if (opts.gemini !== false && gKey) {
    const modell = (opts.gemini || {}).modell || GEMINI_MODELL;
    kette.push({
      name: `gemini:${modell}`,
      lauf: () =>
        f(GEMINI_URL, {
          method: "POST",
          headers: { Authorization: `Bearer ${gKey}`, "Content-Type": "application/json" },
          body: JSON.stringify(geminiBody(body, modell)),
          signal: opts.signal,
        }),
    });
  }
  if (opts.openai !== false && oKey) {
    const modell = (opts.openai || {}).modell || (typeof body.model === "string" && body.model.startsWith("gpt") ? body.model : OPENAI_MODELL);
    kette.push({
      name: `openai:${modell}`,
      lauf: () =>
        f(OPENAI_URL, {
          method: "POST",
          headers: { Authorization: `Bearer ${oKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({ ...body, model: modell }),
          signal: opts.signal,
        }),
    });
  }

  if (!kette.length) {
    console.error(`${tag}: kein KI-Schluessel gesetzt (ANTHROPIC_API_KEY / GEMINI_API_KEY / OPENAI_API_KEY)`);
    return new Response(JSON.stringify({ error: { message: "AI_KEY_MISSING" } }), {
      status: 500,
      headers: { "Content-Type": "application/json", "x-llm-versuche": "[]" },
    });
  }

  const versuche: LlmVersuch[] = [];
  for (const v of kette) {
    try {
      const r = await v.lauf();
      if (r.ok) {
        if (versuche.length) console.warn(`${tag}: Rueckfall aktiv, Antwort von ${v.name} (${versucheText(versuche)})`);
        const kopf: Record<string, string> = { "x-llm-anbieter": v.name };
        if (versuche.length) kopf["x-llm-versuche"] = JSON.stringify(versuche);
        return mitKopf(r, kopf);
      }
      const txt = await r.text().catch(() => "");
      console.error(`${tag}: ${v.name} HTTP ${r.status} ${txt.slice(0, 300)}`);
      versuche.push({ name: v.name, status: r.status, code: fehlerCode(txt) });
    } catch (e) {
      if (opts.signal?.aborted) throw e;
      const { status, code } = v.name.startsWith("claude:")
        ? claudeFehler(e)
        : { status: 0, code: "netzwerk" };
      console.error(`${tag}: ${v.name} ${status || "-"} ${code} ${e instanceof Error ? e.message.slice(0, 200) : String(e)}`);
      versuche.push({ name: v.name, status, code });
    }
  }

  const alle429 = versuche.every((v) => v.status === 429);
  return new Response(JSON.stringify({ error: { message: "KI_ALLE_ANBIETER_GESCHEITERT" } }), {
    status: alle429 ? 429 : 503,
    headers: { "Content-Type": "application/json", "x-llm-versuche": JSON.stringify(versuche) },
  });
}
