// Kern von delete-account, ohne Netz- und Env-Zugriff — damit testbar.
// index.ts verdrahtet nur Supabase, Stripe und serve().
//
// Ablauf:
//   1. Auth prüfen, danach 2FA-Sperre (_shared/zweiFaktor.ts): Hat der Nutzer
//      den zweiten Faktor aktiv und diese Session ihn nicht bestätigt → 403,
//      keine Abo-Prüfung, nichts gelöscht.
//   2. Laufendes Stripe-Abo? (active | trialing | past_due) → 409, nichts wird
//      gelöscht. Betreiber-Entscheidung 13.10.2026: Ein Konto mit laufendem Abo
//      wird nicht gelöscht, sonst bucht Stripe weiter ab, während der Kunde
//      keinen Zugang und kein Konto mehr hat, über das er kündigen könnte.
//      Kann Stripe nicht befragt werden → 503, ebenfalls nichts gelöscht.
//   3. Nutzerdaten löschen (user_id-Tabellen, E-Mail-Tabellen, Affiliate-Daten).
//   4. Nur wenn KEIN Schritt fehlschlug: Auth-Nutzer löschen. Sonst 500 mit
//      Liste; ein erneuter Aufruf setzt dort wieder an (Löschen ist idempotent).

import { ilikeExakt } from "../_shared/emailMatch.ts";
import {
  type BlockingSubscription,
  findBlockingSubscriptions,
  findStripeCustomerIds,
  type StripeLike,
} from "../_shared/stripeCustomer.ts";
import { zweiFaktorAntwort, zweiterFaktorOffen } from "../_shared/zweiFaktor.ts";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

/** Tabellen mit Nutzerdaten, referenziert über die Auth-ID. Alle existieren laut Migrationen. */
export const USER_TABLES: { table: string; col: string }[] = [
  { table: "playbook_step_progress", col: "user_id" },
  { table: "playbook_runs", col: "user_id" },
  { table: "notifications", col: "user_id" },
  { table: "chat_messages", col: "user_id" },
  { table: "chat_conversations", col: "user_id" },
  { table: "chat_memories", col: "user_id" },
  // chat_logs/analytics_events: FK auf auth.users mit ON DELETE SET NULL —
  // ohne expliziten Löschschritt blieben die Inhalte anonymisiert, aber erhalten.
  { table: "chat_logs", col: "user_id" },
  { table: "analytics_events", col: "user_id" },
  { table: "contact_tickets", col: "user_id" },
  { table: "bookings", col: "user_id" },
  { table: "tool_events", col: "user_id" },
  { table: "page_views", col: "user_id" },
  { table: "subscriptions", col: "user_id" },
  { table: "user_roles", col: "user_id" },
  { table: "profiles", col: "id" },
];

/**
 * Tabellen, die Menschen über die E-Mail führen (Käufe vor Kontoanlage, Leads,
 * Mailprotokoll). Abgleich exakt, ohne Groß/Klein (ilikeExakt maskiert % und _).
 *
 * Bewusst NICHT hier: `mail_optouts` — die Abmeldung muss erhalten bleiben,
 * sonst bekäme die Adresse nach der Löschung wieder Werbemails.
 */
export const EMAIL_TABLES: { table: string; col: string }[] = [
  { table: "external_entitlements", col: "email" },
  { table: "cart_abandons", col: "email" },
  { table: "mail_events", col: "recipient" },
  { table: "tool_leads", col: "email" },
];

// Minimale Schnittstelle des Supabase-Clients, die hier gebraucht wird.
// deno-lint-ignore no-explicit-any
type Db = { from(table: string): any; auth?: any };

export interface DeleteAccountDeps {
  /** Service-Role-Client des GründerX-Projekts. */
  supabase: Db & {
    auth: {
      getUser(token: string): Promise<{ data: { user: AuthUser | null }; error: unknown }>;
      admin: { deleteUser(id: string): Promise<{ error: { message: string } | null }> };
    };
  };
  /** Client der Affiliate-Datenbank (HUB_*, sonst dasselbe Projekt). */
  hub: Db;
  /** null = STRIPE_SECRET_KEY fehlt → Abo-Prüfung unmöglich → Abbruch. */
  stripe: StripeLike | null;
}

export interface AuthUser {
  id: string;
  email?: string | null;
  email_confirmed_at?: string | null;
  app_metadata?: Record<string, unknown> | null;
  last_sign_in_at?: string | null;
}

type Failed = { table: string; error: string };

export function activeSubscriptionMessage(subs: BlockingSubscription[]): string {
  const s = subs[0];
  const bis = s?.current_period_end
    ? new Date(s.current_period_end).toLocaleDateString("de-DE", { timeZone: "Europe/Berlin" })
    : null;
  if (s && s.cancel_at_period_end && bis) {
    return `Dein Abo ist gekündigt, läuft aber noch bis ${bis}. Danach kannst du dein Konto löschen.`;
  }
  if (s?.status === "past_due") {
    return "Für dein Abo ist noch eine Zahlung offen. Bitte kündige das Abo im Kundenportal und begleiche die offene Rechnung, bevor du dein Konto löschst.";
  }
  return "Du hast noch ein laufendes Abo. Bitte kündige es zuerst im Kundenportal. Sobald es ausgelaufen ist, kannst du dein Konto löschen.";
}

async function deleteAffiliateData(
  hub: Db,
  user: AuthUser,
  emailOk: boolean,
  cleared: string[],
  failed: Failed[],
  kept: { table: string; reason: string }[],
) {
  const step = "affiliates";
  try {
    const candidates = new Map<string, { id: string; user_id: string | null }>();
    const byId = await hub.from("affiliates").select("id, user_id").eq("user_id", user.id);
    if (byId.error) throw new Error(byId.error.message);
    for (const a of byId.data ?? []) candidates.set(a.id, a);
    if (emailOk && user.email) {
      const byMail = await hub.from("affiliates").select("id, user_id").ilike("email", ilikeExakt(user.email));
      if (byMail.error) throw new Error(byMail.error.message);
      for (const a of byMail.data ?? []) {
        // Mit einem ANDEREN Konto verknüpft (z. B. AnwaltX, gleiche Ledger-DB):
        // gehört nicht zu diesem Konto, bleibt stehen.
        if (a.user_id && a.user_id !== user.id) {
          kept.push({ table: step, reason: "mit anderem Konto verknüpft" });
          continue;
        }
        candidates.set(a.id, a);
      }
    }

    for (const a of candidates.values()) {
      // Partnerkonto mit AnwaltX-Provisionen: Die Ledger-DB ist mit AnwaltX
      // geteilt, das Konto dort läuft weiter. Nur die Verknüpfung lösen.
      const fremd = await hub.from("affiliate_referrals").select("id").eq("affiliate_id", a.id)
        .eq("product", "anwaltx").limit(1);
      if (fremd.error) throw new Error(fremd.error.message);
      if ((fremd.data ?? []).length > 0) {
        const un = await hub.from("affiliates").update({ user_id: null }).eq("id", a.id);
        if (un.error) throw new Error(un.error.message);
        kept.push({ table: step, reason: "auch AnwaltX-Partnerkonto, nur Verknüpfung gelöst" });
        continue;
      }
      // ON DELETE CASCADE räumt affiliate_referrals, _commissions, _payouts mit ab.
      const del = await hub.from("affiliates").delete().eq("id", a.id);
      if (del.error) throw new Error(del.error.message);
    }
    cleared.push(step);
  } catch (e) {
    failed.push({ table: step, error: e instanceof Error ? e.message : String(e) });
  }

  // Als GEWORBENER Kunde steht die Adresse im Ledger eines anderen Partners.
  // Die Zeile bleibt (dessen Provisionsnachweis), die Adresse wird entfernt.
  if (emailOk && user.email) {
    const r = await hub.from("affiliate_referrals").update({ referred_email: null })
      .ilike("referred_email", ilikeExakt(user.email));
    if (r.error) failed.push({ table: "affiliate_referrals.referred_email", error: r.error.message });
    else cleared.push("affiliate_referrals.referred_email");
  }
}

export async function handleDeleteAccount(req: Request, deps: DeleteAccountDeps): Promise<Response> {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const { supabase, hub, stripe } = deps;

  try {
    const token = (req.headers.get("Authorization") || "").replace("Bearer ", "").trim();
    if (!token) return json({ error: "unauthorized" }, 401);
    const { data: userData, error: authErr } = await supabase.auth.getUser(token);
    if (authErr || !userData.user) return json({ error: "unauthorized" }, 401);
    const user = userData.user;
    // Kontolöschung nur mit bestätigtem zweitem Faktor (_shared/zweiFaktor.ts) —
    // vor Abo-Prüfung und vor jeder Löschung.
    if (zweiterFaktorOffen(user, token)) return zweiFaktorAntwort(corsHeaders);
    const userId = user.id;

    // ---- 2. Abo-Sperre (vor jeder Löschung) --------------------------------
    if (!stripe) {
      return json({
        error: "subscription_check_failed",
        message: "Die Abo-Prüfung ist gerade nicht möglich. Bitte versuche es später erneut oder schreib dem Support.",
      }, 503);
    }
    let blocking: BlockingSubscription[];
    try {
      const { data: subRow, error: subErr } = await supabase.from("subscriptions")
        .select("stripe_customer_id").eq("user_id", userId).maybeSingle();
      if (subErr) throw new Error(`subscriptions: ${subErr.message}`);
      // strict: auch ein gescheiterter customers.search bricht ab (→ 503),
      // statt ein Abo still zu übersehen.
      const customerIds = await findStripeCustomerIds(
        stripe,
        user.email ?? "",
        subRow?.stripe_customer_id ?? null,
        { strict: true },
      );
      blocking = await findBlockingSubscriptions(stripe, customerIds);
    } catch (e) {
      console.error("delete-account: Abo-Prüfung fehlgeschlagen", e);
      return json({
        error: "subscription_check_failed",
        message: "Die Abo-Prüfung ist gerade nicht möglich. Bitte versuche es später erneut oder schreib dem Support.",
      }, 503);
    }
    if (blocking.length > 0) {
      return json({
        error: "active_subscription",
        message: activeSubscriptionMessage(blocking),
        subscriptions: blocking.map(({ status, cancel_at_period_end, current_period_end }) => ({
          status,
          cancel_at_period_end,
          current_period_end,
        })),
      }, 409);
    }

    // ---- 3. Daten löschen ---------------------------------------------------
    const cleared: string[] = [];
    const failed: Failed[] = [];
    const kept: { table: string; reason: string }[] = [];

    for (const { table, col } of USER_TABLES) {
      const { error } = await supabase.from(table).delete().eq(col, userId);
      if (error) failed.push({ table, error: error.message });
      else cleared.push(table);
    }

    // E-Mail-geführte Daten nur bei bestätigter Adresse: Sonst könnte jemand
    // mit einer fremden, unbestätigten Adresse deren Daten löschen lassen.
    const emailOk = !!(user.email && user.email_confirmed_at);
    if (emailOk) {
      for (const { table, col } of EMAIL_TABLES) {
        const { error } = await supabase.from(table).delete().ilike(col, ilikeExakt(user.email!));
        if (error) failed.push({ table, error: error.message });
        else cleared.push(table);
      }
    } else {
      for (const { table } of EMAIL_TABLES) kept.push({ table, reason: "E-Mail nicht bestätigt" });
    }

    await deleteAffiliateData(hub, user, emailOk, cleared, failed, kept);

    // ---- 4. Auth-Nutzer nur bei vollständiger Löschung -----------------------
    if (failed.length > 0) {
      console.error("delete-account: Löschung unvollständig", userId, failed);
      return json({
        error: "partial_delete",
        message: "Nicht alle Daten konnten gelöscht werden. Dein Konto bleibt bestehen; bitte versuche es erneut oder schreib dem Support.",
        cleared,
        failed,
        kept,
      }, 500);
    }

    const { error: delErr } = await supabase.auth.admin.deleteUser(userId);
    if (delErr) return json({ error: `auth delete failed: ${delErr.message}`, cleared, failed, kept }, 500);

    return json({ ok: true, cleared, failed, kept });
  } catch (e) {
    return json({ error: String(e instanceof Error ? e.message : e) }, 500);
  }
}
