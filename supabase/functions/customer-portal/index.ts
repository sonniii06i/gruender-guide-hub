import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { findStripeCustomerIds } from "../_shared/stripeCustomer.ts";
import { zweiterFaktorOffen, zweiFaktorAntwort } from "../_shared/zweiFaktor.ts";

// return_url nur auf eigene Domains — wie in create-checkout. Ein fremder oder
// fehlender Origin führte sonst zu einer fremden Rückleitung bzw. zu "/profile"
// ohne Host, was Stripe mit 500 ablehnt.
const ALLOWED_ORIGINS = ["https://gruenderx.de", "https://www.gruenderx.de", "http://localhost:8080"];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    );
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No auth header");
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabase.auth.getUser(token);
    const user = data.user;
    if (!user?.email) throw new Error("Not authenticated");
    if (zweiterFaktorOffen(user, token)) return zweiFaktorAntwort(corsHeaders);

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });
    // Gespeicherte Kunden-ID zuerst, danach case-insensitiv über die E-Mail
    // (customers.list filtert case-sensitiv — siehe _shared/stripeCustomer.ts).
    const service = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } },
    );
    const { data: sub } = await service
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .maybeSingle();
    const customerIds = await findStripeCustomerIds(stripe, user.email, sub?.stripe_customer_id ?? null);
    if (customerIds.length === 0) throw new Error("No Stripe customer");
    const rawOrigin = req.headers.get("origin") || "";
    const origin = ALLOWED_ORIGINS.includes(rawOrigin) ? rawOrigin : "https://gruenderx.de";
    const portal = await stripe.billingPortal.sessions.create({
      customer: customerIds[0],
      return_url: `${origin}/profile`,
    });
    return new Response(JSON.stringify({ url: portal.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
