import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No auth");
    const supa = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } }
    );
    const { data: { user } } = await supa.auth.getUser(authHeader.replace("Bearer ", ""));
    if (!user) throw new Error("Unauthorized");
    const { data: roleData } = await supa.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
    if (!roleData) return new Response(JSON.stringify({ error: "forbidden" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      return new Response(JSON.stringify({ error: "STRIPE_SECRET_KEY missing", activeCount: 0, trialingCount: 0, mrrCents: 0, arrCents: 0, byPlan: [] }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const stripe = new Stripe(stripeKey, { httpClient: Stripe.createFetchHttpClient() });

    let activeCount = 0, trialingCount = 0, mrrCents = 0;
    const byPlan: Record<string, { count: number; mrrCents: number }> = {};

    for (const status of ["active", "trialing"] as const) {
      let starting_after: string | undefined;
      while (true) {
        const page: any = await stripe.subscriptions.list({ status, limit: 100, starting_after, expand: ["data.items.data.price.product"] });
        for (const sub of page.data) {
          if (status === "active") activeCount++; else trialingCount++;
          for (const item of sub.items.data) {
            const price = item.price;
            const qty = item.quantity ?? 1;
            const amount = (price.unit_amount ?? 0) * qty;
            const interval = price.recurring?.interval;
            const intervalCount = price.recurring?.interval_count ?? 1;
            // normalize to monthly
            let monthly = 0;
            if (interval === "month") monthly = amount / intervalCount;
            else if (interval === "year") monthly = amount / (12 * intervalCount);
            else if (interval === "week") monthly = (amount * 4.345) / intervalCount;
            else if (interval === "day") monthly = (amount * 30) / intervalCount;
            if (status === "active") mrrCents += monthly;
            const prodName = (price.product as any)?.name ?? price.nickname ?? "Plan";
            byPlan[prodName] ??= { count: 0, mrrCents: 0 };
            byPlan[prodName].count++;
            if (status === "active") byPlan[prodName].mrrCents += monthly;
          }
        }
        if (!page.has_more) break;
        starting_after = page.data[page.data.length - 1].id;
      }
    }

    return new Response(JSON.stringify({
      activeCount, trialingCount, mrrCents: Math.round(mrrCents),
      arrCents: Math.round(mrrCents * 12),
      byPlan: Object.entries(byPlan).map(([name, v]) => ({ name, ...v, mrrCents: Math.round(v.mrrCents) })),
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e: any) {
    console.error("admin-stripe-stats error:", e?.message, e?.stack);
    return new Response(JSON.stringify({ error: e?.message ?? "unknown", activeCount: 0, trialingCount: 0, mrrCents: 0, arrCents: 0, byPlan: [] }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
