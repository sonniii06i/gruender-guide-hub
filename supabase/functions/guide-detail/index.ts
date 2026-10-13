// guide-detail: liefert die umsetzungskritischen Guide-Step-Details
// (Checklisten, Formularfelder, Ämter-Links, Warnungen, Kosten-Tipps) NUR an
// authentifizierte Nutzer mit aktivem Abo (oder Admins). Server-seitiger
// Entitlement-Check → die bezahlten Inhalte liegen nicht im Client-Bundle.

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { GUIDE_SECURE } from "./secure-data.ts";
import { type AboZeile, hatAktivenZugang, ZUGANG_SPALTEN } from "../_shared/access.ts";
import { zweiterFaktorOffen, zweiFaktorAntwort } from "../_shared/zweiFaktor.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } },
  );

  try {
    // 1) Authentifizierung
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "unauthorized" }, 401);
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: authErr } = await supabase.auth.getUser(token);
    if (authErr || !userData.user) return json({ error: "unauthorized" }, 401);
    const user = userData.user;
    if (zweiterFaktorOffen(user, token)) return zweiFaktorAntwort(corsHeaders);

    // 2) Entitlement: aktives/trialing Abo oder comp_access oder Admin-Rolle
    const [subRes, roleRes] = await Promise.all([
      supabase.from("subscriptions").select(ZUGANG_SPALTEN).eq("user_id", user.id).maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle(),
    ]);
    // Gemeinsame Regel inkl. Laufzeitende (siehe _shared/access.ts).
    const entitled = hatAktivenZugang(subRes.data as AboZeile) || !!roleRes.data;
    if (!entitled) return json({ error: "no_active_subscription" }, 403);

    // 3) Detail für den angefragten Guide zurückgeben
    let slug = "";
    try {
      const body = await req.json();
      slug = typeof body?.slug === "string" ? body.slug : "";
    } catch {
      slug = "";
    }
    if (!slug) return json({ error: "missing_slug" }, 400);

    const steps = GUIDE_SECURE[slug] ?? {};
    return json({ slug, steps });
  } catch (e) {
    return json({ error: String(e instanceof Error ? e.message : e) }, 500);
  }
});
