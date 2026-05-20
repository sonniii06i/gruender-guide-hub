import { createClient } from "@supabase/supabase-js";
const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
const { data } = await sb.from("kb_chunks").select("source").limit(1000);
const cnt: Record<string, number> = {};
(data ?? []).forEach((r: any) => { cnt[r.source] = (cnt[r.source] ?? 0) + 1; });
console.log("=== current DB rows by source ===");
console.table(cnt);
