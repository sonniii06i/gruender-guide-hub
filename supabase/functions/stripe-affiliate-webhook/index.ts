// ===================================================================
// stripe-affiliate-webhook (GruenderX): 20 % Affiliate-Provision je Zahlung.
// Events: checkout.session.completed, invoice.payment_succeeded,
//         customer.subscription.deleted, charge.refunded.
// verify_jwt = false; Signaturpruefung mit STRIPE_WEBHOOK_SECRET.
// Produkt aus session.metadata.product ('gruenderx' | 'bundle', Fallback gruenderx).
// ===================================================================
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2025-08-27.basil" });
const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;
// Zentraler Affiliate-Ledger = AnwaltX-Hub (Cross-Product). Fallback: lokal.
const supabase = createClient(
  Deno.env.get("HUB_SUPABASE_URL") || Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("HUB_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);
const RATE = 0.20;

// Robuste Feld-Extraktion (API-Basil hat Felder verschoben)
function subIdOf(inv: any): string | null {
  return inv.subscription || inv.parent?.subscription_details?.subscription || null;
}
function netCentsOf(inv: any): number {
  if (typeof inv.total_excluding_tax === "number") return Math.max(0, inv.total_excluding_tax);
  const tax = typeof inv.tax === "number"
    ? inv.tax
    : Array.isArray(inv.total_taxes) ? inv.total_taxes.reduce((a: number, t: any) => a + (t.amount || 0), 0) : 0;
  return Math.max(0, (inv.amount_paid ?? 0) - tax);
}

Deno.serve(async (req) => {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("missing signature", { status: 400 });

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(raw, sig, webhookSecret);
  } catch (err) {
    return new Response(`bad signature: ${(err as Error).message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object as any;
        const code = (s.metadata?.affiliate_ref || "").trim();
        if (!code || !s.subscription) break;
        const aff = await affiliateByCode(code);
        if (!aff) break;
        const buyerEmail = (s.customer_details?.email || s.customer_email || "").toLowerCase();
        if (buyerEmail && buyerEmail === (aff.email || "").toLowerCase()) break; // Selbst-Referral
        await supabase.from("affiliate_referrals").upsert({
          affiliate_id: aff.id,
          product: s.metadata?.product || "gruenderx",
          referred_email: buyerEmail || null,
          stripe_customer_id: typeof s.customer === "string" ? s.customer : null,
          stripe_subscription_id: String(s.subscription),
          status: "active",
        }, { onConflict: "stripe_subscription_id" });
        break;
      }

      case "invoice.payment_succeeded": {
        const inv = event.data.object as any;
        const subId = subIdOf(inv);
        if (!subId) break;
        const { data: ref } = await supabase
          .from("affiliate_referrals")
          .select("id, affiliate_id, product, status")
          .eq("stripe_subscription_id", String(subId))
          .maybeSingle();
        if (!ref || ref.status !== "active") break;
        const base = netCentsOf(inv);
        if (base <= 0) break;
        const commission = Math.round(base * RATE);
        const { error } = await supabase.from("affiliate_commissions").insert({
          affiliate_id: ref.affiliate_id,
          referral_id: ref.id,
          product: ref.product,
          stripe_invoice_id: inv.id,
          base_cents: base,
          currency: inv.currency ?? "eur",
          rate: RATE,
          commission_cents: commission,
          status: "pending",
          period_start: inv.period_start ? new Date(inv.period_start * 1000).toISOString() : null,
          period_end: inv.period_end ? new Date(inv.period_end * 1000).toISOString() : null,
        });
        if (error && !String(error.message).includes("duplicate")) throw error;
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as any;
        await supabase.from("affiliate_referrals").update({ status: "canceled" }).eq("stripe_subscription_id", sub.id);
        break;
      }

      case "charge.refunded": {
        const ch = event.data.object as any;
        if (ch.invoice) {
          await supabase.from("affiliate_commissions").update({ status: "reversed" })
            .eq("stripe_invoice_id", String(ch.invoice)).neq("status", "paid");
        }
        break;
      }
    }
    return new Response(JSON.stringify({ received: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return new Response(`handler error: ${(err as Error).message}`, { status: 500 });
  }
});

async function affiliateByCode(code: string) {
  const { data } = await supabase.from("affiliates").select("id, email, status").eq("code", code).maybeSingle();
  if (!data || data.status !== "active") return null;
  return data;
}
