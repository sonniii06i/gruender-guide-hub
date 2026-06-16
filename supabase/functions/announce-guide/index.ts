import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Admin kündigt einen (neuen) Guide an → fan-out einer prominenten Notification
// an ALLE User. RLS erlaubt Usern nur eigene Inserts, daher läuft das hier über
// den Service-Role-Client. Idempotent: wer den gleichen Titel schon hat, wird
// übersprungen (kein Doppel-Ping bei erneutem Klick).
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "No auth" }, 401);

    const supa = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    const { data: { user } } = await supa.auth.getUser(authHeader.replace("Bearer ", ""));
    if (!user) return json({ error: "Unauthorized" }, 401);
    const { data: roleData } = await supa
      .from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
    if (!roleData) return json({ error: "forbidden" }, 403);

    const { slug, title, body, link } = await req.json();
    if (!slug || !title) return json({ error: "slug und title erforderlich" }, 400);

    const notifTitle = `✨ Neuer Guide: ${title}`;
    const notifBody = body || "Frisch dazugekommen – jetzt ansehen und Schritt für Schritt durchgehen.";
    const notifLink = link || `/playbook/preview/${slug}`;

    // Alle User holen.
    const { data: users, error: usersErr } = await supa.from("profiles").select("id");
    if (usersErr) return json({ error: usersErr.message }, 500);
    const allIds = (users ?? []).map((u: { id: string }) => u.id);

    // Schon-Empfänger (gleicher Titel) zum Deduplizieren ausschließen.
    const { data: existing } = await supa
      .from("notifications").select("user_id").eq("title", notifTitle);
    const already = new Set((existing ?? []).map((n: { user_id: string }) => n.user_id));

    const rows = allIds
      .filter((id) => !already.has(id))
      .map((id) => ({
        user_id: id,
        kind: "feature",
        title: notifTitle,
        body: notifBody,
        link: notifLink,
      }));

    if (rows.length === 0) return json({ ok: true, inserted: 0, totalUsers: allIds.length, note: "Alle haben die Ankündigung bereits." });

    // In Chunks einfügen (Supabase-Insert verträgt große Arrays, aber wir bleiben safe).
    let inserted = 0;
    for (let i = 0; i < rows.length; i += 500) {
      const chunk = rows.slice(i, i + 500);
      const { error } = await supa.from("notifications").insert(chunk);
      if (error) return json({ error: error.message, insertedBeforeError: inserted }, 500);
      inserted += chunk.length;
    }

    return json({ ok: true, inserted, totalUsers: allIds.length });
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Unknown" }, 500);
  }
});
