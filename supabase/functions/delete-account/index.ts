// delete-account: DSGVO Art. 17 — löscht ALLE Daten des eingeloggten Nutzers
// und seinen Auth-Account. Server-seitiger Auth-Check; löscht nur die EIGENEN
// Zeilen (user_id === auth.user.id).

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

// Tabellen mit Nutzerdaten + Spalte, über die der Nutzer referenziert wird.
// Best-effort: existiert eine Tabelle nicht, wird sie übersprungen.
const USER_TABLES: { table: string; col: string }[] = [
  { table: "playbook_step_progress", col: "user_id" },
  { table: "playbook_runs", col: "user_id" },
  { table: "notifications", col: "user_id" },
  { table: "chat_messages", col: "user_id" },
  { table: "chat_conversations", col: "user_id" },
  { table: "chat_memories", col: "user_id" },
  { table: "contact_tickets", col: "user_id" },
  { table: "bookings", col: "user_id" },
  { table: "tool_events", col: "user_id" },
  { table: "page_views", col: "user_id" },
  { table: "subscriptions", col: "user_id" },
  { table: "user_roles", col: "user_id" },
  { table: "profiles", col: "id" },
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } },
  );

  try {
    const token = (req.headers.get("Authorization") || "").replace("Bearer ", "").trim();
    if (!token) return json({ error: "unauthorized" }, 401);
    const { data: userData, error: authErr } = await supabase.auth.getUser(token);
    if (authErr || !userData.user) return json({ error: "unauthorized" }, 401);
    const userId = userData.user.id;

    const cleared: string[] = [];
    const failed: { table: string; error: string }[] = [];
    for (const { table, col } of USER_TABLES) {
      const { error } = await supabase.from(table).delete().eq(col, userId);
      if (error) failed.push({ table, error: error.message });
      else cleared.push(table);
    }

    // Auth-Account zuletzt löschen (entfernt Login + auth.users-Eintrag).
    const { error: delErr } = await supabase.auth.admin.deleteUser(userId);
    if (delErr) return json({ error: `auth delete failed: ${delErr.message}`, cleared, failed }, 500);

    return json({ ok: true, cleared, failed });
  } catch (e) {
    return json({ error: String(e instanceof Error ? e.message : e) }, 500);
  }
});
