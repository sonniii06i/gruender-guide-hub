// authGuard.ts — gemeinsame Zugangspruefungen fuer Edge Functions.
//
// Viele Functions laufen mit verify_jwt = false (Cron, Webhooks, Gastkauf).
// Dann prueft das Gateway GAR NICHTS, und jede Function muss selbst sagen,
// wer sie aufrufen darf. Diese Helfer machen das an einer Stelle.

import { createClient, type User } from "https://esm.sh/@supabase/supabase-js@2.45.0";

/** Vergleich in konstanter Zeit — kein Timing-Orakel auf Secrets. */
export function gleich(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const ea = new TextEncoder().encode(a);
  const eb = new TextEncoder().encode(b);
  let diff = ea.length ^ eb.length;
  const n = Math.max(ea.length, eb.length);
  for (let i = 0; i < n; i++) diff |= (ea[i] ?? 0) ^ (eb[i] ?? 0);
  return diff === 0;
}

function bearer(req: Request): string {
  const h = req.headers.get("authorization") ?? req.headers.get("Authorization") ?? "";
  return h.replace(/^Bearer\s+/i, "").trim();
}

/**
 * true, wenn der Aufruf mit dem Service-Role-Key kommt (Function-zu-
 * Function, pg_cron mit Vault-Key). Vergleicht exakt mit dem Key, den die
 * Laufzeit der Function selbst hat — ein Nutzer-JWT mit role=authenticated
 * oder der anon-Key fallen hier durch.
 */
export function istServiceRole(req: Request): boolean {
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const t = bearer(req);
  return !!key && !!t && gleich(t, key);
}

/** true, wenn der Header x-cron-secret zum Secret `envName` passt. */
export function hatCronSecret(req: Request, envName = "CART_CRON_SECRET"): boolean {
  const secret = Deno.env.get(envName) ?? "";
  const sent = req.headers.get("x-cron-secret") ?? "";
  return !!secret && !!sent && gleich(sent, secret);
}

/**
 * Loest das Nutzer-JWT auf (echter Login, nicht der anon-Key). null, wenn
 * kein gueltiger Nutzer dahintersteht.
 */
export async function nutzerAusJwt(req: Request): Promise<User | null> {
  const t = bearer(req);
  if (!t) return null;
  const url = Deno.env.get("SUPABASE_URL");
  const anon = Deno.env.get("SUPABASE_ANON_KEY");
  if (!url || !anon) return null;
  try {
    const sb = createClient(url, anon, {
      auth: { persistSession: false },
      global: { headers: { Authorization: `Bearer ${t}` } },
    });
    const { data, error } = await sb.auth.getUser(t);
    if (error || !data?.user) return null;
    return data.user;
  } catch {
    return null;
  }
}

/** true, wenn der Nutzer die Rolle admin hat (user_roles via has_role). */
export async function istAdmin(userId: string): Promise<boolean> {
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return false;
  const sb = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await sb.rpc("has_role", { _user_id: userId, _role: "admin" });
  return !error && data === true;
}

/** Entfernt Zeilenumbrueche/Steuerzeichen (Header-Injection in Mails). */
export function einzeilig(v: unknown, max = 200): string {
  return String(v ?? "").replace(/[\r\n\t\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max);
}
