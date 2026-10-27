// ===================================================================
// mail-verifizieren — Besitz der Konto-Adresse nachweisen (27.10.2026)
//
// POST { token }            -> Link aus der Mail (Seite /mail-bestaetigen,
//                              erst der Knopf schickt das ab): setzt
//                              app_metadata.mail_verifiziert = true, wenn
//                              Signatur, Ablauf und Adresse des Kontos passen.
// POST { aktion: "senden" } -> mit Login: Mail erneut schicken (atomar begrenzt:
//                              alle 10 Minuten, 5 pro Tag; nur solange unbestaetigt).
// Hintergrund: siehe _shared/mailBesitz.ts.
// ===================================================================
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { mailVerifiziert, pruefeVerifyToken } from "../_shared/mailBesitz.ts";
import { verifizierungSenden } from "../_shared/mailVerifySend.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { ...cors, "Content-Type": "application/json" } });

const URL_ = Deno.env.get("SUPABASE_URL") ?? "";
const KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const admin = createClient(URL_, KEY, { auth: { autoRefreshToken: false, persistSession: false } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST") return json({ error: "method" }, 405);
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return json({ error: "json" }, 400); }

  if (body?.aktion === "senden") {
    const jwt = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
    const { data } = jwt ? await admin.auth.getUser(jwt) : { data: null };
    const user = data?.user;
    if (!user) return json({ error: "login" }, 401);
    if (mailVerifiziert(user)) return json({ ok: true, schon: true });
    const e = await verifizierungSenden(admin, user);   // Limit atomar im RPC (10 Min, 5/Tag)
    if (e === "gedrosselt") return json({ error: "zu_frueh" }, 429);
    return json({ ok: e === "gesendet" }, e === "gesendet" ? 200 : 500);
  }

  const p = await pruefeVerifyToken(KEY, String(body?.token ?? ""));
  if (!p.ok) return json({ error: p.grund }, 400);
  const { data, error } = await admin.auth.admin.getUserById(p.userId);
  const user = data?.user;
  if (error || !user) return json({ error: "unbekannt" }, 400);
  if (String(user.email ?? "").trim().toLowerCase() !== p.email) return json({ error: "adresse_geaendert" }, 400);
  if (!(user.app_metadata?.mail_verifiziert === true && user.app_metadata?.mail_verifiziert_email === p.email)) {
    const { error: e2 } = await admin.auth.admin.updateUserById(user.id, {
      app_metadata: { ...(user.app_metadata ?? {}), mail_verifiziert: true, mail_verifiziert_email: p.email, mail_verifiziert_quelle: "link", mail_verifiziert_at: new Date().toISOString() },
    });
    if (e2) return json({ error: "speichern" }, 500);
  }
  return json({ ok: true });
});
