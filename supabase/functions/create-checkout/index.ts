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
    const { priceId } = await req.json();
    if (!priceId) throw new Error("priceId required");

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
    const { data: profile } = await supabaseService
      .from("profiles")
      .select("first_name, last_name, company_name, street, postal_code, city, country, phone, vat_id")
      .eq("id", user.id)
      .maybeSingle();

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

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
    const existing = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId = existing.data[0]?.id;

    if (customerId) {
      // Update existing with latest profile data
      try {
        await stripe.customers.update(customerId, {
          name: customerName,
          phone: profile?.phone ?? undefined,
          address,
          metadata: { supabase_user_id: user.id },
        });
      } catch (e) {
        console.error("customer update failed", e);
      }
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

    // VAT / tax id
    if (profile?.vat_id) {
      try {
        const taxIds = await stripe.customers.listTaxIds(customerId, { limit: 10 });
        const has = taxIds.data.some((t) => t.value === profile.vat_id);
        if (!has) {
          await stripe.customers.createTaxId(customerId, { type: "eu_vat", value: profile.vat_id });
        }
      } catch (e) {
        console.error("tax id failed", e);
      }
    }

    const origin = req.headers.get("origin") || "";
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      billing_address_collection: "required",
      customer_update: { address: "auto", name: "auto" },
      tax_id_collection: { enabled: true },
      success_url: `${origin}/onboarding?checkout=success`,
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
