// ===================================================================
// stripe-affiliate-webhook (GruenderX): 20 % Affiliate-Provision je Zahlung.
// Events: checkout.session.completed, checkout.session.expired,
//         invoice.payment_succeeded, customer.subscription.deleted,
//         charge.refunded.
// verify_jwt = false; Signaturpruefung mit STRIPE_WEBHOOK_SECRET.
// Produkt aus session.metadata.product ('gruenderx' | 'bundle', Fallback gruenderx).
// ===================================================================
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { sendMetaCapiEvent } from "../_shared/metaCapi.ts";
import { buildAbandoned, type Produkt } from "../_shared/campaigns.ts";
import { sendMail } from "../_shared/sendMail.ts";
import { unsubscribeUrl } from "../_shared/unsubscribe.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2025-08-27.basil" });
const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;
// Zentraler Affiliate-Ledger = AnwaltX-Hub (Cross-Product). Fallback: lokal.
const supabase = createClient(
  Deno.env.get("HUB_SUPABASE_URL") || Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("HUB_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);
// Eigener Client fuer die EIGENE Datenbank. `supabase` oben zeigt bewusst auf
// den AnwaltX-Hub (gemeinsamer Affiliate-Ledger); mail_optouts schreibt aber
// mail-unsubscribe lokal, und eine Abmeldung, die woanders nachgeschlagen
// wird, wirkt nie.
const localDb = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
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

        // Meta-CAPI VOR den Affiliate-Abbruechen. Vorher stand hier zuerst
        // `if (!code) break` — ohne Reflink wurde also gar nichts gemeldet,
        // und das ist der Normalfall. Serverseitig gab es damit ueberhaupt
        // keinen Kauf, obwohl genau der jetzt das Optimierungsereignis der
        // Kampagne ist.
        //
        // event_id `stripe_<session_id>`: dieselbe ID bildet /willkommen im
        // Browser. Nur dann zaehlt Meta beide Meldungen als EIN Ereignis.
        await sendMetaCapiEvent({
          event: "Purchase",
          eventId: `stripe_${s.id}`,
          value: (s.amount_total ?? 0) / 100,
          currency: (s.currency || "eur").toUpperCase(),
          eventSourceUrl: "https://gruenderx.de/willkommen",
          user: {
            email: s.customer_details?.email || s.customer_email || null,
            // fbc/fbp schreibt checkout-guest in die Metadaten — der Webhook
            // sieht keine Cookies, und fbc hebt die Event Match Quality am
            // staerksten.
            fbc: s.metadata?.fbc || null,
            fbp: s.metadata?.fbp || null,
          },
        });

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

      // Warenkorb-Abbruch. Stripe laesst eine unbezahlte Checkout-Session nach
      // rund 24 Stunden ablaufen und meldet das hier. Besserer Ausloeser als
      // jeder eigene Timer: Es steht fest, dass nicht gezahlt wurde, und die
      // Mailadresse liegt in der Session.
      case "checkout.session.expired": {
        const s = event.data.object as any;
        const email = (s.customer_details?.email || s.customer_email || "")
          .trim().toLowerCase();
        if (!email || !email.includes("@")) break;

        // KEIN EINWILLIGUNGS-HAEKCHEN. Bewusste Entscheidung des Betreibers
        // am 10.09.2026, nachdem die Rechtslage benannt war: § 7 Abs. 3 UWG
        // deckt nur eigene Kunden, wer abbricht hat nichts gekauft, und
        // Stripes consent_collection ist fuer deutsche Konten gesperrt. Wer
        // das hier spaeter absichern will, setzt ein Haekchen auf /checkout
        // und prueft an dieser Stelle metadata.abbruch_mail_ok === "1".
        //
        // Was als Daempfer bleibt: jede Mail traegt einen funktionierenden
        // Ein-Klick-Abmeldelink, und die Sperrliste unten wird vorher gelesen.

        // Wer widersprochen hat, bekommt keine Werbung. Fehlt die Tabelle noch,
        // liefert Supabase einen Fehler -- dann NICHT senden (fail closed).
        const { data: out, error: outErr } = await localDb
          .from("mail_optouts").select("email").eq("email", email).maybeSingle();
        if (outErr) {
          console.error("mail_optouts nicht lesbar, kein Versand:", outErr.message);
          break;
        }
        if (out) break;

        const functionsUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1`;
        const abmelden = await unsubscribeUrl(email, functionsUrl);
        // Ohne funktionierenden Abmeldeweg keine Werbemail (§ 7 Abs. 3 UWG).
        if (!abmelden) {
          console.error("UNSUBSCRIBE_SECRET fehlt, kein Versand an", email);
          break;
        }

        const produkt: Produkt = s.metadata?.product === "bundle" ? "bundle" : "gruenderx";
        const mail = buildAbandoned({
          produkt,
          intervall: s.metadata?.interval === "year" ? "year" : "month",
          baseUrl: "https://gruenderx.de",
          unsubscribeUrl: abmelden,
        });
        const res = await sendMail({
          to: email, subject: mail.subject, text: mail.text, html: mail.html,
          unsubscribeUrl: abmelden,
        });
        console.log(res.ok
          ? `[abbruch] -> ${email} (${produkt})`
          : `[abbruch] FEHLER ${email}: ${res.error}`);
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
