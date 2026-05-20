import { createClient } from "@supabase/supabase-js";
const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
const { count } = await sb.from("kb_chunks").select("*", { count: "exact", head: true });
console.log("kb_chunks rows in DB:", count);
