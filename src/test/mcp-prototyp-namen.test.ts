import { describe, expect, it } from "vitest";
import { gptAntwort, mcpAntwort } from "../../api/_lib/gxMcp";

// HANDLER ist ein normales Objekt -- Namen aus Object.prototype duerfen nicht
// als Werkzeug durchgehen.
const PROTO = ["toString", "constructor", "hasOwnProperty", "__proto__", "valueOf"];

describe("MCP: Werkzeugnamen aus Object.prototype", () => {
  it.each(PROTO)("tools/call %s -> Unbekanntes Werkzeug", async (name) => {
    const r = await mcpAntwort(new Request("https://test.local/mcp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name, arguments: {} } }),
    }));
    const body = await r.json();
    expect(body.error?.code).toBe(-32602);
  });

  it.each(PROTO)("GPT-Action %s -> 404", async (name) => {
    const r = await gptAntwort(new Request(`https://test.local/api/gpt?name=${name}`, { method: "POST", body: "{}" }));
    expect(r.status).toBe(404);
  });
});
