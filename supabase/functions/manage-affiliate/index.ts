// manage-affiliate (GruenderX): Self-Service. actions: me | save_payout | request_payout.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { auszahlbar, WIDERRUF_TAGE } from "../_shared/affiliateKonditionen.ts";
import { auszahlungsAuswahl, reifCents } from "../_shared/affiliateSicherung.ts";
import { ilikeExakt } from "../_shared/emailMatch.ts";
import { mailVerifiziert } from "../_shared/mailBesitz.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
// Zentraler Affiliate-Ledger = AnwaltX-Hub (Cross-Product). Fallback: lokal.
const hub = createClient(Deno.env.get("HUB_SUPABASE_URL") || Deno.env.get("SUPABASE_URL")!, Deno.env.get("HUB_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

async function handleAdmin(action: string, payoutId: string | undefined, json: (b: unknown, s?: number) => Response) {
  if (action === "admin_list") {
    const { data } = await hub.from("affiliate_payouts")
      .select("id, affiliate_id, amount_cents, status, requested_at, affiliates(email, payout_name, payout_iban)")
      .in("status", ["requested", "approved"]).order("requested_at", { ascending: true });
    return json({ payouts: data || [] });
  }
  if (!payoutId) return json({ error: "payout_id fehlt" }, 400);
  const { data: p } = await hub.from("affiliate_payouts").select("id, affiliate_id, amount_cents, status").eq("id", payoutId).maybeSingle();
  if (!p || p.status === "paid") return json({ error: "Auszahlung nicht gefunden oder bereits bezahlt" }, 400);

  if (action === "admin_reject") {
    await hub.from("affiliate_payouts").delete().eq("id", payoutId);
    return json({ ok: true });
  }
  if (action === "admin_mark_paid") {
    const { data: comms } = await hub.from("affiliate_commissions")
      .select("id, commission_cents").eq("affiliate_id", p.affiliate_id)
      .in("status", ["pending", "approved"])
      // 27.10.2026: nur Provisionen nach Ablauf der Widerrufsfrist; Gegenbuchungen (negativ, Erstattung/
      // Chargeback nach Auszahlung) sofort -- Gegenbuchungen zuerst, dann aelteste (affiliateSicherung.ts)
      .or(`created_at.lte.${new Date(Date.now() - WIDERRUF_TAGE * 86400_000).toISOString()},commission_cents.lt.0`)
      .order("created_at", { ascending: true });
    const ids = auszahlungsAuswahl(comms || [], p.amount_cents);
    if (ids.length) await hub.from("affiliate_commissions").update({ status: "paid" }).in("id", ids);
    await hub.from("affiliate_payouts").update({ status: "paid", paid_at: new Date().toISOString() }).eq("id", payoutId);
    return json({ ok: true });
  }
  return json({ error: "unbekannte Admin-Aktion" }, 400);
}

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

    const { action, payout_name, payout_iban, payout_id } = await req.json().catch(() => ({ action: "me" }));

    // ---- Admin-Aktionen (Auszahlungen verwalten) ----
    if (action?.startsWith("admin_")) {
      const { data: role } = await admin.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
      if (!role) return json({ error: "forbidden" }, 403);
      return await handleAdmin(action, payout_id, json);
    }

    // Erst ueber die user_id, dann ueber die Adresse — ohne Wildcards
    // (frueher `.or(...email.ilike.${user.email})`: `%`/`_` in der Adresse
    // trafen fremde Affiliate-Konten, Sonderzeichen brachen den Filter).
    let { data: aff } = await hub.from("affiliates")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();
    // Abschlusspruefung 27.10.2026: Verknuepfen eines fremden Partnerkontos nur bei BESTAETIGTER Mail,
    // nur Konten ohne user_id und nur exakt gleiche Adresse (kein Pattern-Matching, s. emailMatch.ts).
    if (!aff && user.email && mailVerifiziert(user)) {   // 27.10.2026: Konten aus claim-account beweisen keinen Mail-Besitz (_shared/mailBesitz.ts)
      ({ data: aff } = await hub.from("affiliates")
        .select("*")
        .is("user_id", null)
        .ilike("email", ilikeExakt(user.email))
        .maybeSingle());
    }

    if (!aff) {
      let code = genCode();
      for (let i = 0; i < 5; i++) {
        const { data: taken } = await hub.from("affiliates").select("id").eq("code", code).maybeSingle();
        if (!taken) break;
        code = genCode();
      }
      const { data: created, error: cErr } = await hub.from("affiliates")
        .insert({ email: String(user.email ?? "").trim().toLowerCase(), user_id: user.id, code }).select("*").single();
      if (cErr) throw cErr;
      aff = created;
    } else if (!aff.user_id) {
      await hub.from("affiliates").update({ user_id: user.id }).eq("id", aff.id);
      aff.user_id = user.id;
    }

    if (action === "save_payout") {
      await hub.from("affiliates").update({
        payout_name: payout_name ?? aff.payout_name,
        payout_iban: payout_iban ?? aff.payout_iban,
      }).eq("id", aff.id);
      aff.payout_name = payout_name ?? aff.payout_name;
      aff.payout_iban = payout_iban ?? aff.payout_iban;
    }

    const [{ data: comms }, { data: refs }, { data: payouts }] = await Promise.all([
      hub.from("affiliate_commissions").select("commission_cents,status,product,created_at").eq("affiliate_id", aff.id).order("created_at", { ascending: false }),
      hub.from("affiliate_referrals").select("product,status,created_at").eq("affiliate_id", aff.id),
      hub.from("affiliate_payouts").select("amount_cents,status,requested_at,paid_at").eq("affiliate_id", aff.id).order("requested_at", { ascending: false }),
    ]);
    const sum = (rows: any[], pred: (r: any) => boolean) => (rows || []).filter(pred).reduce((a, r) => a + (r.commission_cents || 0), 0);
    const available = sum(comms || [], (r) => r.status === "pending" || r.status === "approved");
    // 27.10.2026: auszahlbar erst nach 14 Tagen (Widerrufsfrist des geworbenen Kunden)
    const reif = reifCents(comms || [], (t) => auszahlbar(t));
    const paidOut = ((payouts || []).filter((p) => p.status === "paid").reduce((a, p) => a + (p.amount_cents || 0), 0));
    const requested = ((payouts || []).filter((p) => p.status === "requested" || p.status === "approved").reduce((a, p) => a + (p.amount_cents || 0), 0));
    const requestable = Math.max(0, reif - requested);

    if (action === "request_payout") {
      if (!aff.payout_iban) return json({ error: "Bitte zuerst IBAN hinterlegen." }, 400);
      if (requestable < 2000) return json({ error: "Mindestauszahlung 20 €." }, 400);
      await hub.from("affiliate_payouts").insert({ affiliate_id: aff.id, amount_cents: requestable });
      return json({ ok: true, requested_cents: requestable });
    }

    const origin = req.headers.get("origin") || "https://gruenderx.de";
    return json({
      code: aff.code,
      konditionen: aff.konditionen ?? "v2_25_12m",
      ref_link: `${origin}/?ref=${aff.code}`,
      payout_name: aff.payout_name,
      payout_iban: aff.payout_iban,
      stats: {
        in_wartezeit_cents: Math.max(0, available - reif),
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
