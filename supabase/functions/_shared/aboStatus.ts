// aboStatus.ts — Abo-Status aus Stripe-Events sofort in `subscriptions`
// schreiben (27.10.2026). Vorher zog nur check-subscription beim Login den
// Status nach; Kündigungen wirkten in der DB erst Tage später (Drift).
// Der tägliche Abgleich /root/hq/kunden_echt.py bleibt als Netz.
//
// Nur bestehende Zeilen werden aktualisiert (Anlage: claim-account /
// check-subscription). Zuordnung über stripe_subscription_id, sonst
// stripe_customer_id.

/** Stripe-Status -> App-Status. past_due behaelt Zugang (Stripe versucht noch zu kassieren). */
export function appStatus(stripeStatus: string): "active" | "trialing" | "inactive" {
  if (stripeStatus === "trialing") return "trialing";
  if (stripeStatus === "active" || stripeStatus === "past_due") return "active";
  return "inactive";
}

// deno-lint-ignore no-explicit-any
export async function aboStatusSchreiben(db: any, sub: any, jetzt = new Date()): Promise<string> {
  const status = appStatus(String(sub?.status ?? ""));
  const endeUnix = sub?.current_period_end ?? sub?.items?.data?.[0]?.current_period_end ?? null;
  const felder: Record<string, unknown> = {
    status,
    stripe_status: sub?.status ?? null,
    abgleich_at: jetzt.toISOString(),
    updated_at: jetzt.toISOString(),
    ...(endeUnix ? { current_period_end: new Date(endeUnix * 1000).toISOString() } : {}),
  };
  const kunde = typeof sub?.customer === "string" ? sub.customer : sub?.customer?.id;
  const r1 = await db.from("subscriptions").update(felder).eq("stripe_subscription_id", sub.id).select("user_id");
  if (r1.error) throw new Error(`subscriptions update: ${r1.error.message}`);
  if ((r1.data ?? []).length) return `${sub.id}: ${status} (${r1.data.length} Zeile/n)`;
  if (!kunde) return `${sub.id}: keine Zeile`;
  const r2 = await db.from("subscriptions")
    .update({ ...felder, stripe_subscription_id: sub.id })
    .eq("stripe_customer_id", kunde)
    .or(`stripe_subscription_id.is.null,stripe_subscription_id.eq.${sub.id}`)
    .select("user_id");
  if (r2.error) throw new Error(`subscriptions update (Kunde): ${r2.error.message}`);
  return `${sub.id}: ${status} (${(r2.data ?? []).length} Zeile/n über Kunde)`;
}
