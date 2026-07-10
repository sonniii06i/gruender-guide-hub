// manage-affiliate (GruenderX): Self-Service. actions: me | save_payout | request_payout.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

function genCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const b = new Uint8Array(7);
  crypto.getRandomValues(b);
  return Array.from(b, (x) => alphabet[x % alphabet.length]).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "unauthorized" }, 401);
    const { data: { user }, error: authErr } = await admin.auth.getUser(authHeader.replace("Bearer ", ""));
    if (authErr || !user) return json({ error: "unauthorized" }, 401);

    const { action, payout_name, payout_iban } = await req.json().catch(() => ({ action: "me" }));

    let { data: aff } = await admin.from("affiliates")
      .select("*")
      .or(`user_id.eq.${user.id},email.ilike.${user.email}`)
      .maybeSingle();

    if (!aff) {
      let code = genCode();
      for (let i = 0; i < 5; i++) {
        const { data: taken } = await admin.from("affiliates").select("id").eq("code", code).maybeSingle();
        if (!taken) break;
        code = genCode();
      }
      const { data: created, error: cErr } = await admin.from("affiliates")
        .insert({ email: user.email, user_id: user.id, code }).select("*").single();
      if (cErr) throw cErr;
      aff = created;
    } else if (!aff.user_id) {
      await admin.from("affiliates").update({ user_id: user.id }).eq("id", aff.id);
      aff.user_id = user.id;
    }

    if (action === "save_payout") {
      await admin.from("affiliates").update({
        payout_name: payout_name ?? aff.payout_name,
        payout_iban: payout_iban ?? aff.payout_iban,
      }).eq("id", aff.id);
      aff.payout_name = payout_name ?? aff.payout_name;
      aff.payout_iban = payout_iban ?? aff.payout_iban;
    }

    const [{ data: comms }, { data: refs }, { data: payouts }] = await Promise.all([
      admin.from("affiliate_commissions").select("commission_cents,status,product,created_at").eq("affiliate_id", aff.id).order("created_at", { ascending: false }),
      admin.from("affiliate_referrals").select("product,status,created_at").eq("affiliate_id", aff.id),
      admin.from("affiliate_payouts").select("amount_cents,status,requested_at,paid_at").eq("affiliate_id", aff.id).order("requested_at", { ascending: false }),
    ]);
    const sum = (rows: any[], pred: (r: any) => boolean) => (rows || []).filter(pred).reduce((a, r) => a + (r.commission_cents || 0), 0);
    const available = sum(comms || [], (r) => r.status === "pending" || r.status === "approved");
    const paidOut = ((payouts || []).filter((p) => p.status === "paid").reduce((a, p) => a + (p.amount_cents || 0), 0));
    const requested = ((payouts || []).filter((p) => p.status === "requested" || p.status === "approved").reduce((a, p) => a + (p.amount_cents || 0), 0));
    const requestable = Math.max(0, available - requested);

    if (action === "request_payout") {
      if (!aff.payout_iban) return json({ error: "Bitte zuerst IBAN hinterlegen." }, 400);
      if (requestable < 2000) return json({ error: "Mindestauszahlung 20 €." }, 400);
      await admin.from("affiliate_payouts").insert({ affiliate_id: aff.id, amount_cents: requestable });
      return json({ ok: true, requested_cents: requestable });
    }

    const origin = req.headers.get("origin") || "https://gruenderx.de";
    return json({
      code: aff.code,
      ref_link: `${origin}/?ref=${aff.code}`,
      payout_name: aff.payout_name,
      payout_iban: aff.payout_iban,
      stats: {
        available_cents: available,
        requestable_cents: requestable,
        paid_out_cents: paidOut,
        active_referrals: (refs || []).filter((r) => r.status === "active").length,
        total_referrals: (refs || []).length,
      },
      commissions: comms || [],
      payouts: payouts || [],
    });
  } catch (err) {
    console.error("manage-affiliate error:", err);
    return json({ error: (err as Error).message }, 500);
  }
});
