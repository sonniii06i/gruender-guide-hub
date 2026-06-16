import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const PRICE_TO_PLAN: Record<string, string> = {
  price_1TTUf764hSN6usxPLDOylK70: "GründerX",
  price_1TTUfV64hSN6usxPe60ADpTF: "Founder Bundle",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabaseService = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } },
  );

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No auth header");
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error } = await supabaseService.auth.getUser(token);
    if (error) throw error;
    const user = userData.user;
    if (!user?.email) throw new Error("Not authenticated");

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Comp-/Test-Freischaltung: Accounts mit comp_access=true werden vom Stripe-Sync
    // komplett in Ruhe gelassen (kein Downgrade, keine Stripe-Calls). Der Marker
    // wird hier nur gelesen, nie überschrieben → bleibt dauerhaft bestehen.
    const { data: existingSub } = await supabaseService
      .from("subscriptions")
      .select("comp_access")
      .eq("user_id", user.id)
      .maybeSingle();
    if (existingSub?.comp_access) {
      return new Response(JSON.stringify({ subscribed: true, comp: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    if (customers.data.length === 0) {
      await supabaseService.from("subscriptions").upsert({
        user_id: user.id,
        plan: "none",
        status: "inactive",
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
      return new Response(JSON.stringify({ subscribed: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const customerId = customers.data[0].id;
    const subs = await stripe.subscriptions.list({ customer: customerId, status: "active", limit: 1 });
    const active = subs.data[0];

    if (!active) {
      await supabaseService.from("subscriptions").upsert({
        user_id: user.id,
        plan: "none",
        status: "inactive",
        stripe_customer_id: customerId,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
      return new Response(JSON.stringify({ subscribed: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const priceId = active.items.data[0].price.id;
    const plan = PRICE_TO_PLAN[priceId] ?? "Unknown";
    const periodEnd = new Date(active.current_period_end * 1000).toISOString();

    await supabaseService.from("subscriptions").upsert({
      user_id: user.id,
      plan,
      status: "active",
      stripe_customer_id: customerId,
      stripe_subscription_id: active.id,
      current_period_end: periodEnd,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });

    return new Response(JSON.stringify({ subscribed: true, plan, current_period_end: periodEnd }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
