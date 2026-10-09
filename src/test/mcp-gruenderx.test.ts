// Öffentlicher MCP-Server (api/_lib/gxMcp.ts, 09.10.2026): Protokoll, Filter, Eingabefehler, GPT-Schema.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { KURZ, LIMIT, TOOLS, TOOL_NAMEN, _drosselLeeren, gptAntwort, mcpAntwort } from "../../api/_lib/gxMcp";

const heute = new Date().toISOString().slice(0, 10);
const morgen = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);
const EVENTS = {
  stand: "test",
  events: [
    { name: "Gründerabend Köln", veranstalter: "IHK", art: "gruenderabend", format: "vor-ort", ort: "Köln", region: "NRW", datum: morgen, datumBis: null, rhythmus: null, kostenlos: true, url: "https://x" },
    { name: "Alt", veranstalter: "X", art: "netzwerk", format: "vor-ort", ort: "Berlin", region: "BE", datum: "2020-01-01", datumBis: null, rhythmus: null, kostenlos: null, url: "https://y" },
  ],
  fristen: [
    { slug: "a", name: "Wettbewerb A", veranstalter: "V", art: "wettbewerb", region: "bund", frist: morgen, url: "https://a", kurz: "k" },
    { slug: "b", name: "Abgelaufen", veranstalter: "V", art: "preis", region: "BY", frist: "2020-01-01", url: "https://b", kurz: "k" },
  ],
};
const PERKS = {
  stand: "test",
  kategorien: { cloud: { name: "Cloud" } },
  perks: [
    { slug: "p1", name: "Ohne VC", anbieter: "A", kategorie: "cloud", wert: "1 $", leistungen: [], voraussetzungen: ["x"], vcNoetig: false, gruendungMaxJahre: 5, url: "https://p1" },
    { slug: "p2", name: "Nur VC", anbieter: "B", kategorie: "cloud", wert: "2 $", leistungen: [], voraussetzungen: ["y"], vcNoetig: true, gruendungMaxJahre: null, url: "https://p2" },
  ],
};

beforeEach(() => {
  _drosselLeeren();
  vi.stubGlobal("fetch", vi.fn(async (url: string) => {
    if (String(url).endsWith("/gruender-events.json")) return new Response(JSON.stringify(EVENTS));
    if (String(url).endsWith("/startup-guthaben.json")) return new Response(JSON.stringify(PERKS));
    return new Response("", { status: 201 }); // Zähler
  }));
});
afterEach(() => vi.unstubAllGlobals());

const rpc = async (method: string, params?: unknown) => {
  const r = await mcpAntwort(new Request("https://test.local/mcp", { method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }) }));
  return { status: r.status, body: r.status === 200 ? await r.json() : null };
};
const call = async (name: string, args: unknown) => (await rpc("tools/call", { name, arguments: args })).body.result;

describe("GründerX-MCP", () => {
  it("initialize, tools/list und Seite stimmen überein", async () => {
    const i = await rpc("initialize", { protocolVersion: "2025-06-18" });
    expect(i.body.result.protocolVersion).toBe("2025-06-18");
    const namen = (await rpc("tools/list")).body.result.tools.map((t: { name: string }) => t.name);
    expect(namen).toEqual(TOOL_NAMEN);
    expect(Object.keys(KURZ).sort()).toEqual([...TOOLS.map((t) => t.name)].sort());
  });

  it("Notification ergibt 202, GET 405", async () => {
    const n = await mcpAntwort(new Request("https://test.local/mcp", { method: "POST", body: JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) }));
    expect(n.status).toBe(202);
    expect((await mcpAntwort(new Request("https://test.local/mcp"))).status).toBe(405);
  });

  it("Events: Regions-Alias NRW→NW, Vergangenes raus", async () => {
    const r = await call("search_founder_events", { region: "NW" });
    expect(r.isError).toBe(false);
    expect(r.structuredContent.events.map((e: { name: string }) => e.name)).toEqual(["Gründerabend Köln"]);
    expect(r.content[0].text).toContain("utm_source=mcp");
  });

  it("Fristen: abgelaufene raus, bundesweite bei Landesfilter dabei", async () => {
    const r = await call("list_founder_deadlines", { region: "BY" });
    expect(r.structuredContent.deadlines.map((f: { name: string }) => f.name)).toEqual(["Wettbewerb A"]);
  });

  it("Guthaben: ohne Investor nur passende Programme", async () => {
    const r = await call("search_startup_credits", { has_investor: false, company_age_years: 2 });
    expect(r.structuredContent.programs.map((p: { name: string }) => p.name)).toEqual(["Ohne VC"]);
  });

  it("Eingabefehler sind isError, kein Absturz", async () => {
    expect((await call("search_founder_events", { from_date: "morgen" })).isError).toBe(true);
    expect((await call("read_founder_guide", { slug: "../x" })).isError).toBe(true);
    expect((await rpc("tools/call", { name: "gibts_nicht" })).body.error.code).toBe(-32602);
    expect((await rpc("foo/bar")).body.error.code).toBe(-32601);
  });

  it("Drossel greift nach LIMIT Anfragen", async () => {
    let s = 0;
    for (let k = 0; k <= LIMIT; k++) s = (await rpc("ping")).status;
    expect(s).toBe(429);
  });

  it("GPT: OpenAPI-Schema und Aufruf", async () => {
    const spec = await (await gptAntwort(new Request("https://test.local/api/gpt/openapi.json"))).json();
    expect(spec.openapi).toBe("3.1.0");
    expect(Object.keys(spec.paths)).toHaveLength(TOOLS.length);
    const r = await gptAntwort(new Request("https://test.local/api/gpt/list_founder_deadlines", { method: "POST", body: "{}" }));
    expect(r.status).toBe(200);
    expect((await gptAntwort(new Request("https://test.local/api/gpt/x", { method: "POST", body: "{}" }))).status).toBe(404);
  });
});
