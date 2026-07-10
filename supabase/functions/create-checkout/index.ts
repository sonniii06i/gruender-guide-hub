import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { priceId, affiliateRef } = await req.json();
    if (!priceId) throw new Error("priceId required");
    const affRef = typeof affiliateRef === "string" ? affiliateRef.trim().slice(0, 32) : "";
    // Produkt aus priceId ableiten (Bundle = GruenderX + AnwaltX)
    const product = priceId === "price_1TTUfV64hSN6usxPe60ADpTF" ? "bundle" : "gruenderx";

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    );
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No auth header");
    const token = authHeader.replace("Bearer ", "");
    const { data: userData } = await supabase.auth.getUser(token);
    const user = userData.user;
    if (!user?.email) throw new Error("Not authenticated");

    // Service client to read profile (bypasses RLS but only reads our own users' data)
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } },
    );
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Best-effort-Tasks nach der Response weiterlaufen lassen, ohne den Redirect zu blockieren.
    const runBg = (p: Promise<unknown>) => {
      // @ts-ignore - Supabase Edge Runtime
      if (typeof EdgeRuntime !== "undefined" && EdgeRuntime?.waitUntil) EdgeRuntime.waitUntil(p);
    };

    // Profil + bestehenden Stripe-Customer PARALLEL laden (spart einen Roundtrip vor dem Redirect).
    const [{ data: profile }, existing] = await Promise.all([
      supabaseService
        .from("profiles")
        .select("first_name, last_name, company_name, street, postal_code, city, country, phone, vat_id, onboarding_completed")
        .eq("id", user.id)
        .maybeSingle(),
      stripe.customers.list({ email: user.email, limit: 1 }),
    ]);

    if (!profile?.onboarding_completed) {
      return new Response(
        JSON.stringify({ error: "Bitte zuerst Onboarding abschließen." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 },
      );
    }

    const fullName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ").trim();
    const customerName = profile?.company_name || fullName || undefined;
    const address = (profile?.street || profile?.postal_code || profile?.city)
      ? {
          line1: profile?.street ?? undefined,
          postal_code: profile?.postal_code ?? undefined,
          city: profile?.city ?? undefined,
          country: profile?.country ?? "DE",
        }
      : undefined;

    // Find or create customer with billing details
    let customerId = existing.data[0]?.id;

    if (customerId) {
      // Stammdaten-Update ist best-effort und NICHT auf dem kritischen Pfad:
      // Adresse/Name werden im Checkout via customer_update:auto ohnehin synchronisiert.
      runBg(
        stripe.customers.update(customerId, {
          name: customerName,
          phone: profile?.phone ?? undefined,
          address,
          metadata: { supabase_user_id: user.id },
        }).catch((e) => console.error("customer update failed", e)),
      );
    } else {
      const created = await stripe.customers.create({
        email: user.email,
        name: customerName,
        phone: profile?.phone ?? undefined,
        address,
        metadata: { supabase_user_id: user.id },
      });
      customerId = created.id;
    }

    // VAT / tax id — ebenfalls best-effort; tax_id_collection erfasst die USt-ID sonst im Checkout.
    if (profile?.vat_id) {
      const vatId = profile.vat_id;
      const cId = customerId;
      runBg((async () => {
        try {
          const taxIds = await stripe.customers.listTaxIds(cId, { limit: 10 });
          const has = taxIds.data.some((t) => t.value === vatId);
          if (!has) {
            await stripe.customers.createTaxId(cId, { type: "eu_vat", value: vatId });
          }
        } catch (e) {
          console.error("tax id failed", e);
        }
      })());
    }

    const origin = req.headers.get("origin") || "";
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      billing_address_collection: "required",
      customer_update: { address: "auto", name: "auto" },
      tax_id_collection: { enabled: true },
      // Erlaubt Eingabe von Gutschein-Codes (SONNI / FOUNDER) im Stripe-Checkout.
      // Stripe akzeptiert nur einen Promo-Code pro Session -> Codes sind nicht kombinierbar.
      allow_promotion_codes: true,
      // Affiliate-Attribution: Ref + Produkt an Session UND Abo haengen
      // (Webhook liest es bei checkout.session.completed + wiederkehrenden Rechnungen).
      metadata: { supabase_user_id: user.id, product, ...(affRef ? { affiliate_ref: affRef } : {}) },
      subscription_data: { metadata: { product, ...(affRef ? { affiliate_ref: affRef } : {}) } },
      success_url: `${origin}/dashboard?checkout=success`,
      cancel_url: `${origin}/checkout?canceled=1`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
