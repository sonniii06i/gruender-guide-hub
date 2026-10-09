// GPT-Actions: GET /api/gpt/openapi.json (Schema) und POST /api/gpt/<werkzeug>. Logik: api/_lib/gxMcp.ts
import { gptAntwort } from "../_lib/gxMcp";

export const config = { runtime: "edge" };

export default function handler(req: Request): Promise<Response> {
  return gptAntwort(req);
}
