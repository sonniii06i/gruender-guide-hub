import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Plan-Auflösung primär über die Abo-Metadaten (product), die create-checkout setzt —
// robust gegenüber Preis-ID-Wechseln (dynamische Preise). Preis-ID-Map bleibt als Fallback
// für Alt-Abos ohne product-Metadatum.
const PRODUCT_TO_PLAN: Record<string, string> = {
  gruenderx: "GründerX",
  bundle: "Founder Bundle",
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

    // Kauf über eine Reseller-Plattform (CopeCart/Digistore24/elopage). Diese
    // Kunden haben per Definition KEINEN Stripe-Kunden — liefe der Sync unten
    // weiter, würde er sie mit status "inactive" aussperren, und zwar spätestens
    // 24 h nach dem Kauf (useAccess stößt ihn täglich an). Deshalb hier raus,
    // bevor Stripe überhaupt gefragt wird.
    //
    // `period_end IS NULL` = unbefristeter Einmalkauf; sonst zählt das gemeldete
    // Ende inklusive Kulanz, das der Webhook gesetzt hat.
    const nowIso = new Date().toISOString();
    const { data: ext } = await supabaseService
      .from("external_entitlements")
      .select("plan, provider, period_end")
      .ilike("email", user.email)
      .eq("status", "active")
      .or(`period_end.is.null,period_end.gt.${nowIso}`)
      .order("period_end", { ascending: false, nullsFirst: true })
      .limit(1)
      .maybeSingle();
    if (ext) {
      await supabaseService.from("subscriptions").upsert({
        user_id: user.id,
        plan: ext.plan,
        status: "active",
        source: ext.provider,
        current_period_end: ext.period_end,
        updated_at: nowIso,
      }, { onConflict: "user_id" });
      return new Response(
        JSON.stringify({ subscribed: true, plan: ext.plan, source: ext.provider }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
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
    const productMeta = (active.metadata?.product as string | undefined) ?? "";
    const plan = PRODUCT_TO_PLAN[productMeta] ?? PRICE_TO_PLAN[priceId] ?? "Unknown";
    // Laufzeitende: Ab Stripe-API 2025-08-27 (basil) steht current_period_end
    // NICHT mehr am Abo, sondern an dessen Position. Diese Funktion laeuft auf
    // genau dieser Version — `active.current_period_end` war damit `undefined`,
    // und `new Date(NaN).toISOString()` warf "Invalid time value".
    //
    // Wirkung: check-subscription antwortete mit 500, also konnte die App den
    // Abo-Status ueberhaupt nicht mehr aufloesen. Fuer ein Bezahlprodukt der
    // schlimmste Zustand — der Kunde hat gezahlt und gilt als unbezahlt.
    //
    // Beide Orte lesen, damit ein spaeterer Versionswechsel nichts kippt.
    const periodEndUnix = active.current_period_end
      ?? active.items?.data?.[0]?.current_period_end
      ?? null;
    const periodEnd = periodEndUnix ? new Date(periodEndUnix * 1000).toISOString() : null;

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
