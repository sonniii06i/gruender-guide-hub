// /.well-known/* für Verzeichnisse und Einreichungen (Rewrites in vercel.json, ?f=...):
//  - mcp-registry-auth     Domain-Nachweis fürs offizielle MCP-Registry (namespace de.gruenderx/*).
//                          Öffentlicher Schlüssel; der private liegt nur beim Betreiber.
//  - openai-apps-challenge Domain-Nachweis für die ChatGPT-App-Einreichung. Token kommt aus der
//                          Vercel-Umgebungsvariable OPENAI_APPS_CHALLENGE (setzen + Redeploy, kein Code-Deploy).
//                          Ohne Token 404.
//  - server-card           Statische MCP-Server-Karte (SEP-1649) für Verzeichnisse, die nicht live scannen.
import { ANWEISUNGEN, BASE, CORS, SERVER_INFO, TOOLS, json } from "./_lib/gxMcp";

export const config = { runtime: "edge" };

export const REGISTRY_AUTH = "v=MCPv1; k=ed25519; p=dpvti1Do+m/a/b1bEKHq0c3tWzXCbrIHco+yKydsx48=";

const text = (body: string, status = 200) =>
  new Response(body, { status, headers: { "Content-Type": "text/plain; charset=utf-8", ...CORS } });

export default function handler(req: Request): Response {
  const f = new URL(req.url).searchParams.get("f");
  if (f === "mcp-registry-auth") return text(REGISTRY_AUTH);
  if (f === "openai-apps-challenge") {
    const token = (typeof process !== "undefined" ? process.env.OPENAI_APPS_CHALLENGE : "")?.trim();
    return token ? text(token) : text("", 404);
  }
  if (f === "server-card") {
    return json({
      serverInfo: SERVER_INFO, description: ANWEISUNGEN, homepage: `${BASE}/ki-assistent`,
      transport: { type: "streamable-http", url: `${BASE}/mcp` },
      capabilities: { tools: { listChanged: false } }, authentication: { required: false }, tools: TOOLS,
    });
  }
  return text("", 404);
}
