// Tests der KI-Anbieter-Kette (Claude → Gemini → OpenAI).
//
// Ausfuehren (im Ordner supabase/functions):
//   deno test --no-lock --node-modules-dir=none --allow-env --allow-read --allow-net=registry.npmjs.org _shared/llm.test.ts
//
// Kein echter Netzaufruf: Claude ueber einen eingeschleusten SDK-Ersatz,
// Gemini/OpenAI ueber ein eingeschleustes fetch.
import { assert, assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import Anthropic from "npm:@anthropic-ai/sdk@0.131.0";
import { anbieterAus, type ClaudeClient, llmChat, versucheAus, zuClaudeParams } from "./llm.ts";

type Ev = Anthropic.Beta.Messages.BetaRawMessageStreamEvent;

function setzeKeys(k: { a?: boolean; g?: boolean; o?: boolean }) {
  for (const [n, an] of [["ANTHROPIC_API_KEY", k.a], ["GEMINI_API_KEY", k.g], ["OPENAI_API_KEY", k.o]] as const) {
    if (an) Deno.env.set(n, "test-key");
    else Deno.env.delete(n);
  }
}

/** SDK-Ersatz: liefert Events oder wirft den gegebenen Fehler. */
function claudeMock(
  verhalten: { events?: Ev[]; fehler?: unknown; message?: Anthropic.Beta.Messages.BetaMessage },
  log: unknown[] = [],
): ClaudeClient {
  return {
    beta: {
      messages: {
        stream(params) {
          log.push(params);
          const listener: ((e: unknown) => void)[] = [];
          return {
            on(_ev: "error", fn: (e: unknown) => void) {
              listener.push(fn);
              return this;
            },
            finalMessage() {
              if (verhalten.fehler) {
                listener.forEach((f) => f(verhalten.fehler));
                return Promise.reject(verhalten.fehler);
              }
              return Promise.resolve(verhalten.message!);
            },
            [Symbol.asyncIterator]() {
              let i = 0;
              return {
                next() {
                  if (verhalten.fehler) {
                    listener.forEach((f) => f(verhalten.fehler));
                    return Promise.reject(verhalten.fehler);
                  }
                  const evs = verhalten.events ?? [];
                  if (i < evs.length) return Promise.resolve({ value: evs[i++], done: false });
                  return Promise.resolve({ value: undefined as unknown as Ev, done: true });
                },
              };
            },
          };
        },
      },
    },
  };
}

function guthabenFehler() {
  return Anthropic.APIError.generate(
    400,
    { type: "error", error: { type: "invalid_request_error", message: "Your credit balance is too low to access the Anthropic API." } },
    undefined,
    new Headers(),
  );
}

function fetchMock(antworten: Record<string, () => Response>, aufrufe: string[] = []): typeof fetch {
  return ((url: string | URL | Request) => {
    const u = String(url);
    const key = u.includes("generativelanguage") ? "gemini" : u.includes("openai.com") ? "openai" : "?";
    aufrufe.push(key);
    const f = antworten[key];
    if (!f) return Promise.reject(new Error("unerwarteter Aufruf " + u));
    return Promise.resolve(f());
  }) as typeof fetch;
}

const okJson = (text: string) => () =>
  new Response(JSON.stringify({ choices: [{ index: 0, message: { role: "assistant", content: text } }] }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

const textMessage = (text: string): Anthropic.Beta.Messages.BetaMessage =>
  ({
    id: "msg_1",
    type: "message",
    role: "assistant",
    model: "claude-opus-5-5",
    content: [
      { type: "thinking", thinking: "", signature: "x" },
      { type: "text", text, citations: null },
    ],
    stop_reason: "end_turn",
    stop_sequence: null,
    usage: { input_tokens: 10, output_tokens: 5 },
  }) as unknown as Anthropic.Beta.Messages.BetaMessage;

const BODY = { messages: [{ role: "system", content: "Sys" }, { role: "user", content: "Hallo" }] };

Deno.test("Reihenfolge: Claude antwortet zuerst, Gemini/OpenAI werden nicht gefragt", async () => {
  setzeKeys({ a: true, g: true, o: true });
  const aufrufe: string[] = [];
  const res = await llmChat(BODY, {
    claudeClient: claudeMock({ message: textMessage("Hi von Claude") }),
    fetchFn: fetchMock({ gemini: okJson("g"), openai: okJson("o") }, aufrufe),
  });
  assertEquals(res.status, 200);
  assertEquals(anbieterAus(res), { anbieter: "claude", modell: "claude-opus-5-5" });
  const j = await res.json();
  assertEquals(j.choices[0].message.content, "Hi von Claude"); // thinking-Block ignoriert
  assertEquals(aufrufe, []);
});

Deno.test("Claude-Guthaben leer (HTTP 400) → Gemini antwortet", async () => {
  setzeKeys({ a: true, g: true, o: true });
  const aufrufe: string[] = [];
  const res = await llmChat(BODY, {
    claudeClient: claudeMock({ fehler: guthabenFehler() }),
    fetchFn: fetchMock({ gemini: okJson("Hi von Gemini"), openai: okJson("o") }, aufrufe),
  });
  assertEquals(res.status, 200);
  assertEquals(anbieterAus(res).anbieter, "gemini");
  assertEquals((await res.json()).choices[0].message.content, "Hi von Gemini");
  assertEquals(aufrufe, ["gemini"]);
  assertEquals(versucheAus(res), [{ name: "claude:claude-opus-5-5", status: 400, code: "credit_balance_too_low" }]);
});

Deno.test("Claude-Guthaben leer im Stream → faellt noch vor der Antwort weiter", async () => {
  setzeKeys({ a: true, g: true, o: false });
  const res = await llmChat({ ...BODY, stream: true }, {
    claudeClient: claudeMock({ fehler: guthabenFehler() }),
    fetchFn: fetchMock({
      gemini: () => new Response('data: {"choices":[{"delta":{"content":"G"}}]}\n\ndata: [DONE]\n\n', { status: 200 }),
    }),
  });
  assertEquals(res.status, 200);
  assertEquals(anbieterAus(res).anbieter, "gemini");
});

Deno.test("ohne ANTHROPIC_API_KEY wird Claude uebersprungen", async () => {
  setzeKeys({ a: false, g: true, o: true });
  const aufrufe: string[] = [];
  const res = await llmChat(BODY, { fetchFn: fetchMock({ gemini: okJson("g"), openai: okJson("o") }, aufrufe) });
  assertEquals(anbieterAus(res).anbieter, "gemini");
  assertEquals(aufrufe, ["gemini"]);
  assertEquals(res.headers.get("x-llm-versuche"), null);
});

Deno.test("Gemini 429 → OpenAI", async () => {
  setzeKeys({ a: false, g: true, o: true });
  const res = await llmChat(BODY, {
    fetchFn: fetchMock({
      gemini: () => new Response(JSON.stringify([{ error: { code: 429, status: "RESOURCE_EXHAUSTED", message: "spend cap" } }]), { status: 429 }),
      openai: okJson("Hi von OpenAI"),
    }),
  });
  assertEquals(anbieterAus(res), { anbieter: "openai", modell: "gpt-4o" });
  assertEquals(versucheAus(res)[0].code, "RESOURCE_EXHAUSTED");
});

Deno.test("Stream-Uebersetzung: nur text_delta, Ende mit [DONE]", async () => {
  setzeKeys({ a: true, g: false, o: false });
  const events = [
    { type: "message_start", message: {} },
    { type: "content_block_start", index: 0, content_block: { type: "thinking", thinking: "" } },
    { type: "content_block_delta", index: 0, delta: { type: "thinking_delta", thinking: "geheim" } },
    { type: "content_block_stop", index: 0 },
    { type: "content_block_start", index: 1, content_block: { type: "text", text: "" } },
    { type: "content_block_delta", index: 1, delta: { type: "text_delta", text: "Hal" } },
    { type: "content_block_delta", index: 1, delta: { type: "text_delta", text: "lo" } },
    { type: "content_block_stop", index: 1 },
    { type: "message_delta", delta: { stop_reason: "end_turn" }, usage: { output_tokens: 3 } },
    { type: "message_stop" },
  ] as unknown as Ev[];
  const res = await llmChat({ ...BODY, stream: true }, { claudeClient: claudeMock({ events }) });
  assertEquals(res.headers.get("content-type"), "text/event-stream");
  const txt = await res.text();
  assertEquals(
    txt,
    'data: {"choices":[{"index":0,"delta":{"content":"Hal"}}]}\n\n' +
      'data: {"choices":[{"index":0,"delta":{"content":"lo"}}]}\n\n' +
      "data: [DONE]\n\n",
  );
  assert(!txt.includes("geheim"));
});

Deno.test("Refusal vor der Ausgabe im Stream → naechster Anbieter", async () => {
  setzeKeys({ a: true, g: false, o: true });
  const events = [
    { type: "message_start", message: {} },
    { type: "message_delta", delta: { stop_reason: "refusal" }, usage: { output_tokens: 0 } },
    { type: "message_stop" },
  ] as unknown as Ev[];
  const res = await llmChat({ ...BODY, stream: true }, {
    claudeClient: claudeMock({ events }),
    fetchFn: fetchMock({ openai: () => new Response("data: [DONE]\n\n", { status: 200 }) }),
  });
  assertEquals(anbieterAus(res).anbieter, "openai");
  assertEquals(versucheAus(res)[0].code, "refusal");
});

Deno.test("alle drei scheitern → saubere Fehler-Response mit Versuchen", async () => {
  setzeKeys({ a: true, g: true, o: true });
  const res = await llmChat(BODY, {
    claudeClient: claudeMock({ fehler: guthabenFehler() }),
    fetchFn: fetchMock({
      gemini: () => new Response(JSON.stringify([{ error: { status: "RESOURCE_EXHAUSTED" } }]), { status: 429 }),
      openai: () => new Response(JSON.stringify({ error: { code: "insufficient_quota" } }), { status: 429 }),
    }),
  });
  assertEquals(res.status, 503); // nicht alle 429 → 503
  assertEquals((await res.json()).error.message, "KI_ALLE_ANBIETER_GESCHEITERT");
  assertEquals(versucheAus(res).map((v) => [v.name.split(":")[0], v.status, v.code]), [
    ["claude", 400, "credit_balance_too_low"],
    ["gemini", 429, "RESOURCE_EXHAUSTED"],
    ["openai", 429, "insufficient_quota"],
  ]);
});

Deno.test("kein Schluessel → AI_KEY_MISSING", async () => {
  setzeKeys({});
  const res = await llmChat(BODY);
  assertEquals(res.status, 500);
  assertEquals((await res.json()).error.message, "AI_KEY_MISSING");
});

Deno.test("Claude-Parameter: system, Rollen zusammengefuehrt, keine Sampling-Parameter, Tool ohne Zwang", () => {
  const p = zuClaudeParams(
    {
      temperature: 0.3,
      top_p: 0.9,
      max_tokens: 600,
      response_format: { type: "json_object" },
      messages: [
        { role: "assistant", content: "Willkommen!" },
        { role: "system", content: "A" },
        { role: "user", content: "eins" },
        { role: "user", content: [{ type: "text", text: "zwei" }] },
        { role: "assistant", content: "" },
      ],
      tools: [{ type: "function", function: { name: "publish", parameters: { type: "object", properties: {}, additionalProperties: false } } }],
      tool_choice: { type: "function", function: { name: "publish" } },
    },
    "claude-opus-5-5",
    "medium",
  ) as unknown as Record<string, unknown>;
  assertEquals(p.messages, [{ role: "user", content: "eins\n\nzwei" }]);
  assert(String(p.system).startsWith("A\n\n"));
  assert(String(p.system).includes("JSON"));
  assert(String(p.system).includes("`publish`"));
  assertEquals(p.tool_choice, { type: "auto" });
  assertEquals((p.tools as { strict?: boolean }[])[0].strict, true);
  assertEquals(p.max_tokens, 600);
  assertEquals(p.output_config, { effort: "medium" });
  assertEquals(p.fallbacks, "default");
  assertEquals(p.betas, ["server-side-fallback-2026-07-01"]);
  for (const k of ["temperature", "top_p", "thinking"]) assert(!(k in p), k);
});

Deno.test("Haiku: kein Server-Fallback; Refusal → naechster Anbieter", async () => {
  const p = zuClaudeParams(BODY, "claude-haiku-5-5", "low") as unknown as Record<string, unknown>;
  assert(!("fallbacks" in p) && !("betas" in p));
  setzeKeys({ a: true, g: true, o: false });
  const msg = { ...textMessage(""), stop_reason: "refusal" } as Anthropic.Beta.Messages.BetaMessage;
  const res = await llmChat(BODY, {
    claude: { modell: "claude-haiku-5-5" },
    claudeClient: claudeMock({ message: msg }),
    fetchFn: fetchMock({ gemini: okJson("g") }),
  });
  assertEquals(anbieterAus(res).anbieter, "gemini");
  assertEquals(versucheAus(res)[0], { name: "claude:claude-haiku-5-5", status: 0, code: "refusal" });
});

Deno.test("erzwungenes Tool: Claude-Antwort wird zu tool_calls", async () => {
  setzeKeys({ a: true, g: false, o: false });
  const msg = {
    ...textMessage(""),
    content: [{ type: "tool_use", id: "tu_1", name: "publish", input: { title: "T" } }],
    stop_reason: "tool_use",
  } as unknown as Anthropic.Beta.Messages.BetaMessage;
  const res = await llmChat(
    { ...BODY, tools: [{ type: "function", function: { name: "publish", parameters: { type: "object" } } }], tool_choice: { type: "function", function: { name: "publish" } } },
    { claudeClient: claudeMock({ message: msg }) },
  );
  const j = await res.json();
  assertEquals(j.choices[0].finish_reason, "tool_calls");
  assertEquals(JSON.parse(j.choices[0].message.tool_calls[0].function.arguments), { title: "T" });
});
