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
      // Fehlschlag ist keine 0 → 500, das Dashboard zeigt den Fehler statt "0 €".
      return new Response(JSON.stringify({ error: "STRIPE_SECRET_KEY missing" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const stripe = new Stripe(stripeKey, { httpClient: Stripe.createFetchHttpClient() });

    let activeCount = 0, trialingCount = 0, mrrCents = 0;
    const byPlan: Record<string, { count: number; mrrCents: number }> = {};

    // Rabatte (Gutscheincodes) senken den tatsächlichen Umsatz. Vorher zählte
    // das MRR nur unit_amount und lag zu hoch. Berücksichtigt werden Rabatte
    // mit Dauer "forever"/"repeating", deren Ende nicht erreicht ist; "once"
    // betrifft nur die erste Rechnung und ist kein wiederkehrender Umsatz.
    type Coupon = { duration?: string; percent_off?: number | null; amount_off?: number | null };
    type Rabatt = { end?: number | null; coupon?: Coupon | string | null; source?: { coupon?: Coupon | string | null } };
    type Intervall = { interval?: string; interval_count?: number } | null | undefined;
    type AboMitRabatt = { discounts?: Array<Rabatt | string>; items?: { data?: Array<{ price?: { recurring?: Intervall } }> } };
    const couponCache = new Map<string, Coupon>();
    const couponOf = async (d: Rabatt): Promise<Coupon | null> => {
      const c = d?.coupon ?? d?.source?.coupon ?? null;
      if (!c) return null;
      if (typeof c === "object") return c;
      if (!couponCache.has(c)) couponCache.set(c, (await stripe.coupons.retrieve(c)) as Coupon);
      return couponCache.get(c) ?? null;
    };
    const nowSec = Math.floor(Date.now() / 1000);
    const rabattFaktor = async (sub: AboMitRabatt, bruttoMonat: number): Promise<number> => {
      if (bruttoMonat <= 0) return 1;
      let netto = bruttoMonat;
      for (const d of sub.discounts ?? []) {
        if (!d || typeof d === "string") continue;
        if (d.end && d.end <= nowSec) continue;
        const c = await couponOf(d);
        if (!c || c.duration === "once") continue;
        if (typeof c.percent_off === "number") netto *= 1 - c.percent_off / 100;
        else if (typeof c.amount_off === "number") {
          // amount_off gilt je Rechnung; auf den Monat umrechnen wie die Position.
          const iv = sub.items?.data?.[0]?.price?.recurring;
          const n = iv?.interval_count ?? 1;
          const proMonat = iv?.interval === "year" ? c.amount_off / (12 * n)
            : iv?.interval === "week" ? (c.amount_off * 4.345) / n
            : iv?.interval === "day" ? (c.amount_off * 30) / n
            : c.amount_off / n;
          netto -= proMonat;
        }
      }
      return Math.max(0, netto) / bruttoMonat;
    };

    for (const status of ["active", "trialing"] as const) {
      let starting_after: string | undefined;
      while (true) {
        const page: any = await stripe.subscriptions.list({ status, limit: 100, starting_after, expand: ["data.items.data.price.product", "data.discounts"] });
        for (const sub of page.data) {
          if (status === "active") activeCount++; else trialingCount++;
          const positionen: Array<{ prodName: string; monthly: number }> = [];
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
            const prodName = (price.product as any)?.name ?? price.nickname ?? "Plan";
            positionen.push({ prodName, monthly });
          }
          const brutto = positionen.reduce((n, p) => n + p.monthly, 0);
          const faktor = await rabattFaktor(sub, brutto);
          for (const { prodName, monthly } of positionen) {
            const netto = monthly * faktor;
            if (status === "active") mrrCents += netto;
            byPlan[prodName] ??= { count: 0, mrrCents: 0 };
            byPlan[prodName].count++;
            if (status === "active") byPlan[prodName].mrrCents += netto;
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
    // Status 500 statt 200 mit Nullen: Ein Fehlschlag ist keine 0.
    return new Response(JSON.stringify({ error: e?.message ?? "unknown" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
