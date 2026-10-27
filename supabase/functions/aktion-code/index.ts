// ===================================================================
// aktion-code — Rabatt-Codes für Aktionen der HQ-Angebots-Engine (27.10.2026).
//
// POST, Authorization: Bearer <AKTION_CODE_SECRET> (nur das HQ kennt es)
//   { op: "konto", test? }                                   <- { konto, coupons_lesbar }
//   { op: "anlegen", test?, aktion_id, anlass, titel, code, prozent, monate, bis, neukunden? }
//                                                            <- { coupon_id, promo_id }
//   { op: "deaktivieren", test?, promo_id }                  <- { aktiv: false }
//   { op: "auswerten", test?, promo_id, seit }               <- { einloesungen, rechnungen, umsatz_eur }
// test: true nutzt STRIPE_TEST_SECRET_KEY (Sandbox), sonst STRIPE_SECRET_KEY.
// Grenzen und Prüfungen in _shared/aktionCode.ts.
// ===================================================================

import Stripe from "https://esm.sh/stripe@18.5.0";
import { ABLAUF_MAX_TAGE, GX_PRODUKTE, QUELLE, autorisiert, pruefeAnlegen, pruefePromo } from "../_shared/aktionCode.ts";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const PRODUKT_NAMEN = ["GründerX", "Founder Bundle"];   // Testkonto: gleiche Produkte, andere IDs

async function produkte(stripe: Stripe, test: boolean): Promise<string[]> {
  if (!test) return [...GX_PRODUKTE];
  const l = await stripe.products.list({ active: true, limit: 100 });
  return l.data.filter((p: { name: string }) => PRODUKT_NAMEN.includes(p.name)).map((p: { id: string }) => p.id);
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "method" }, 405);
  if (!autorisiert(req.headers.get("authorization"), Deno.env.get("AKTION_CODE_SECRET"))) return json({ error: "auth" }, 401);
  const b = await req.json().catch(() => ({} as Record<string, unknown>));
  const test = b.test === true;
  const key = Deno.env.get(test ? "STRIPE_TEST_SECRET_KEY" : "STRIPE_SECRET_KEY") ?? "";
  if (!key || key.includes("_test_") !== test) return json({ error: "schluessel" }, 503);
  const stripe = new Stripe(key, { apiVersion: "2025-08-27.basil" });

  try {
    if (b.op === "konto") {
      const acc = await stripe.accounts.retrieve();
      await stripe.coupons.list({ limit: 1 });
      return json({ konto: acc.id, coupons_lesbar: true, test });
    }

    if (b.op === "anlegen") {
      const p = pruefeAnlegen(b, Math.floor(Date.now() / 1000));
      if (!p.ok) return json({ error: "feld", feld: p.feld, max_tage: ABLAUF_MAX_TAGE }, 400);
      const d = p.d;
      const prods = await produkte(stripe, test);
      if (!prods.length) return json({ error: "keine_produkte" }, 500);
      const meta = { aktion_id: d.aktion_id, anlass: d.anlass, quelle: QUELLE };
      const coupon = await stripe.coupons.create({
        percent_off: d.prozent, name: `Aktion ${d.titel}`.slice(0, 40), redeem_by: d.bis, metadata: meta,
        applies_to: { products: prods },
        ...(d.monate === 1 ? { duration: "once" as const } : { duration: "repeating" as const, duration_in_months: d.monate }),
      }, { idempotencyKey: `hq-aktion-${d.aktion_id}-coupon-${test ? 1 : 0}` });
      const promo = await stripe.promotionCodes.create({
        coupon: coupon.id, code: d.code, expires_at: d.bis, metadata: meta,
        ...(d.neukunden ? { restrictions: { first_time_transaction: true } } : {}),
      } as Stripe.PromotionCodeCreateParams, { idempotencyKey: `hq-aktion-${d.aktion_id}-promo-${test ? 1 : 0}` });
      return json({ coupon_id: coupon.id, promo_id: promo.id });
    }

    const promoId = pruefePromo(b.promo_id);
    if (!promoId) return json({ error: "feld", feld: "promo_id" }, 400);
    const promo = await stripe.promotionCodes.retrieve(promoId);
    if (promo.metadata?.quelle !== QUELLE) return json({ error: "fremder_code" }, 403);   // nur eigene Codes

    if (b.op === "deaktivieren") {
      const r = await stripe.promotionCodes.update(promoId, { active: false });
      return json({ aktiv: r.active });
    }

    if (b.op === "auswerten") {
      const seit = Number(b.seit);
      if (!Number.isInteger(seit) || seit <= 0) return json({ error: "feld", feld: "seit" }, 400);
      let n = 0, umsatz = 0;
      for await (const inv of stripe.invoices.list({ created: { gte: seit }, limit: 100, expand: ["data.discounts"] })) {
        const treffer = (inv.discounts ?? []).some((x: unknown) => typeof x === "object" && x !== null &&
          (x as { promotion_code?: string | null }).promotion_code === promoId);
        if (treffer) { n++; umsatz += inv.amount_paid ?? 0; }
      }
      return json({ einloesungen: promo.times_redeemed, rechnungen: n, umsatz_eur: Math.round(umsatz) / 100 });
    }

    return json({ error: "op" }, 400);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[aktion-code]", b.op, msg);
    return json({ error: "stripe", nachricht: msg.slice(0, 200) }, 502);
  }
});
