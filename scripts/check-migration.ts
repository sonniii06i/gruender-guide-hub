import { createClient } from "@supabase/supabase-js";
const url = process.env.SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const sb = createClient(url, key, { auth: { persistSession: false } });

const { count, error: e1 } = await sb.from("kb_chunks").select("*", { count: "exact", head: true });
if (e1) { console.log("TABLE-CHECK FAIL:", e1.message); process.exit(1); }
console.log("✓ Tabelle kb_chunks existiert, Rows:", count);

const dummyEmb = new Array(1536).fill(0);
const { error: e2 } = await sb.rpc("match_kb_chunks", { query_embedding: dummyEmb, match_count: 1 });
if (e2) { console.log("RPC-CHECK FAIL:", e2.message); process.exit(1); }
console.log("✓ RPC match_kb_chunks existiert");
console.log("\nMigration READY");
