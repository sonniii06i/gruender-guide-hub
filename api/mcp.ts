// Öffentlicher MCP-Endpunkt https://gruenderx.de/mcp (Rewrite in vercel.json). Logik: api/_lib/gxMcp.ts
import { mcpAntwort } from "./_lib/gxMcp";

export const config = { runtime: "edge" };

export default function handler(req: Request): Promise<Response> {
  return mcpAntwort(req);
}
