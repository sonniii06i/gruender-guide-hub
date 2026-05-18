import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SALT = Deno.env.get("TRACKING_SALT") ?? "gx-default-salt-change-me";

async function sha256(input: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const body = await req.json().catch(() => ({}));
    const tool = String(body.tool ?? "").slice(0, 100);
    const event = String(body.event ?? "").slice(0, 100);
    if (!tool || !event) {
      return new Response(JSON.stringify({ error: "tool + event required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "0.0.0.0";
    const ua = req.headers.get("user-agent") ?? "";
    const day = new Date().toISOString().slice(0, 10);
    const visitor_hash = await sha256(`${ip}|${ua}|${day}|${SALT}`);

    let user_id: string | null = null;
    const auth = req.headers.get("Authorization");
    const supa = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
      auth: { persistSession: false },
    });
    if (auth) {
      const { data } = await supa.auth.getUser(auth.replace("Bearer ", ""));
      user_id = data.user?.id ?? null;
    }

    await supa.from("tool_events").insert({
      visitor_hash,
      user_id,
      tool,
      event,
      metadata: body.metadata ?? {},
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
