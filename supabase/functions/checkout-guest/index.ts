// ===================================================================
// Gast-Checkout — Zahlung VOR dem Konto. Baugleich zu AnwaltX.
//
// Der Weg aus den Anzeigen: /us-llc-30-tage bzw. /gruendung-komplett →
// hierher → Stripe → /willkommen. Kein Konto, kein Onboarding, kein Login
// davor.
//
// UNTERSCHIED ZU create-checkout. Die bestehende Funktion verlangt ein
// abgeschlossenes Onboarding (`onboarding_completed`), weil sie Name, Adresse
// und USt-ID aus dem Profil an Stripe reicht. Das kann es hier nicht geben —
// es gibt noch kein Profil. Die Rechnungsdaten erhebt darum Stripe selbst
// (`billing_address_collection: "required"`, `tax_id_collection`), und sie
// landen nach der Zahlung über den Kunden im Profil.
//
// Die E-Mail aus dem Checkout ist bindend: `check-subscription` sucht den
// Stripe-Kunden über `customers.list({ email })`. Deshalb liest `claim-account`
// sie aus der Session und nimmt sie nicht vom Client entgegen.
// ===================================================================

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PRICES: Record<string, string> = {
  gruenderx: "price_1TTUf764hSN6usxPLDOylK70",
  bundle: "price_1TTUfV64hSN6usxPe60ADpTF",
};

/** Zielbeträge in Cent — identisch zu create-checkout. */
const TARGET_AMOUNTS: Record<string, number> = {
  gruenderx: 6499,
  bundle: 9999,
};

const ALLOWED_ORIGINS = ["https://gruenderx.de", "https://www.gruenderx.de", "http://localhost:8080"];

const priceIdCache = new Map<string, string>();

async function resolveMonthlyPriceId(stripe: Stripe, product: string, anchorPriceId: string): Promise<string> {
  const expected = TARGET_AMOUNTS[product];
  if (!expected) return anchorPriceId;

  const cached = priceIdCache.get(product);
  if (cached) return cached;

  const anchor = await stripe.prices.retrieve(anchorPriceId);
  if (anchor.active && anchor.unit_amount === expected && anchor.recurring?.interval === "month") {
    priceIdCache.set(product, anchor.id);
    return anchor.id;
  }
  const productId = typeof anchor.product === "string" ? anchor.product : anchor.product.id;

  const list = await stripe.prices.list({ product: productId, active: true, limit: 100 });
  const match = list.data.find(
    (p) => p.recurring?.interval === "month" && p.unit_amount === expected && p.currency === "eur",
  );
  if (match) {
    priceIdCache.set(product, match.id);
    return match.id;
  }

  const created = await stripe.prices.create({
    product: productId,
    unit_amount: expected,
    currency: "eur",
    recurring: { interval: "month" },
  });
  priceIdCache.set(product, created.id);
  return created.id;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const product = body.product === "bundle" ? "bundle" : "gruenderx";
    const affRef = str(body.affiliateRef, 32);

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const resolvedPriceId = await resolveMonthlyPriceId(stripe, product, PRICES[product]);

    const rawOrigin = req.headers.get("origin") || "";
    const origin = ALLOWED_ORIGINS.includes(rawOrigin) ? rawOrigin : "https://gruenderx.de";

    // Attribution mitschreiben — der Stripe-Webhook sieht später weder Cookies
    // noch UTM-Parameter.
    const attribution: Record<string, string> = {};
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbc", "fbp", "gclid"]) {
      const value = str(body[key], 200);
      if (value) attribution[key] = value;
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      // Ohne `locale` raet Stripe die Sprache aus dem Browser -- ausgerechnet
      // auf der letzten Seite vor dem Kauf.
      locale: "de",
      custom_text: {
        submit: {
          message: "GruenderX Zugang — monatlich kuendbar, Kuendigung mit einem Klick im Konto.",
        },
      },
      line_items: [{ price: resolvedPriceId, quantity: 1 }],
      // Kein `customer`: Stripe legt ihn an und erhebt dabei die E-Mail.
      billing_address_collection: "required",
      tax_id_collection: { enabled: true },
      allow_promotion_codes: true,
      // Karte nur abfragen, wenn tatsaechlich etwas abgebucht wird.
      //
      // Im Normalfall aendert das nichts: Bei 64,99 € faellig verlangt Stripe
      // weiterhin eine Zahlungsmethode. Es greift nur, wenn ein Gutschein den
      // Betrag dauerhaft auf 0 setzt.
      payment_method_collection: "if_required",
      metadata: {
        flow: "pay_first",
        product,
        ...(affRef ? { affiliate_ref: affRef } : {}),
        ...attribution,
      },
      subscription_data: {
        metadata: { flow: "pay_first", product, ...(affRef ? { affiliate_ref: affRef } : {}) },
      },
      success_url: `${origin}/willkommen?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/us-llc-30-tage?abgebrochen=1`,
    });

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (e: any) {
    console.error("❌ checkout-guest:", e.message);
    return new Response(JSON.stringify({ error: e.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
