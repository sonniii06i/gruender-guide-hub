// Abo-Abfrage für den AnwaltX/GründerX-Discord: Die AnwaltX-Functions
// discord-verify-email und discord-check-subs fragen hier, ob eine E-Mail ein
// aktives GründerX-Abo (active/trialing/comp_access) hat oder Admin ist.
// Nur mit gemeinsamem Secret (x-abo-secret = DISCORD_ABO_SECRET), liefert nur
// true/false je Adresse – keine weiteren Daten. verify_jwt = false (config.toml).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

function gleich(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "POST" }, 405);
  const erwartet = Deno.env.get("DISCORD_ABO_SECRET") ?? "";
  const secret = req.headers.get("x-abo-secret") ?? "";
  if (!erwartet || !secret || !gleich(secret, erwartet)) return json({ error: "Unauthorized" }, 401);

  let emails: string[] = [];
  try {
    const roh = await req.json();
    emails = (Array.isArray(roh?.emails) ? roh.emails : [])
      .filter((e: unknown): e is string => typeof e === "string")
      .map((e: string) => e.trim().toLowerCase())
      .filter((e: string) => /^[^\s@]{1,64}@[^\s@]{1,253}$/.test(e));
  } catch {
    return json({ error: "JSON erwartet" }, 400);
  }
  if (!emails.length || emails.length > 500) return json({ error: "1–500 emails" }, 400);

  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  // Auth-Nutzer seitenweise (E-Mails dort normalisiert) → user_id je Adresse.
  const gesucht = new Set(emails);
  const idZuMail = new Map<string, string>();
  for (let seite = 1; seite <= 50; seite++) {
    const { data, error } = await db.auth.admin.listUsers({ page: seite, perPage: 1000 });
    if (error) return json({ error: `listUsers: ${error.message}` }, 500);
    for (const u of data.users) if (u.email && gesucht.has(u.email.toLowerCase())) idZuMail.set(u.id, u.email.toLowerCase());
    if (data.users.length < 1000) break;
  }

  const aktiv: Record<string, boolean> = Object.fromEntries(emails.map((e) => [e, false]));
  const ids = [...idZuMail.keys()];
  if (ids.length) {
    const [subs, admins] = await Promise.all([
      db.from("subscriptions").select("user_id, status, comp_access").in("user_id", ids),
      db.from("user_roles").select("user_id").eq("role", "admin").in("user_id", ids),
    ]);
    if (subs.error || admins.error) return json({ error: subs.error?.message ?? admins.error?.message }, 500);
    for (const s of subs.data ?? []) if (s.status === "active" || s.status === "trialing" || s.comp_access) aktiv[idZuMail.get(s.user_id)!] = true;
    for (const a of admins.data ?? []) aktiv[idZuMail.get(a.user_id)!] = true;
  }
  return json({ aktiv });
});
