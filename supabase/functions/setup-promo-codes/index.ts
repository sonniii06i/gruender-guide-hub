import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

// Einmal-Setup: legt einen 20%-Coupon (nur erster Monat) und die Promotion-Codes
// SONNI + FOUNDER idempotent an. Geschützt per ?secret=<SERVICE_ROLE_KEY>.
// Aufruf: curl "<fn-url>?secret=<SERVICE_ROLE_KEY>"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CODES = ["SONNI", "FOUNDER"];
const COUPON_METADATA_KEY = "first_month_promo";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Einmal-Token (Wegwerf-Funktion, wird nach dem Setup wieder entfernt).
    const SETUP_TOKEN = "promo-setup-7Qx2v9KmTz";
    const url = new URL(req.url);
    const secret = url.searchParams.get("secret");
    if (secret !== SETUP_TOKEN) {
      return json({ error: "forbidden" }, 403);
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // 1) Coupon idempotent finden/anlegen (20% off, einmalig = erster Monat)
    let coupon;
    const existingCoupons = await stripe.coupons.list({ limit: 100 });
    coupon = existingCoupons.data.find(
      (c) => c.metadata?.[COUPON_METADATA_KEY] === "1" && c.valid &&
        c.percent_off === 20 && c.duration === "once",
    );
    if (!coupon) {
      coupon = await stripe.coupons.create({
        name: "Erster Monat 20%",
        percent_off: 20,
        duration: "once",
        metadata: { [COUPON_METADATA_KEY]: "1" },
      });
    }

    // 2) Promotion-Codes idempotent anlegen
    const results: Record<string, string> = {};
    for (const code of CODES) {
      const existing = await stripe.promotionCodes.list({ code, limit: 1 });
      if (existing.data.length > 0) {
        results[code] = `exists (${existing.data[0].id})`;
        continue;
      }
      const pc = await stripe.promotionCodes.create({ coupon: coupon.id, code });
      results[code] = `created (${pc.id})`;
    }

    return json({ ok: true, coupon: coupon.id, codes: results });
  } catch (e: any) {
    return json({ error: e.message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status,
  });
}
