// ===================================================================
// affiliateSicherung.ts — Geldsicherung des Partnerprogramms (Abschlussprüfung 27.10.2026).
// Identisch in AnwaltX und GründerX (beide schreiben in den AnwaltX-Hub-Ledger).
//
//  - partnerSelbstkauf: Kauf über den eigenen Partnerlink? Normalisierte Mail (Plus-Anhang,
//    Gmail-Punkte), gleicher Stripe-Kunde oder gleiche Karte wie ein Stripe-Kunde mit der
//    Partner-Mail. Stripe-Fehler werden geworfen (Webhook -> 500 -> Stripe wiederholt).
//  - provisionZurueck: Erstattung/Chargeback. Noch nicht ausgezahlt -> 'reversed'; schon
//    ausgezahlt -> negative Gegenbuchung, die mit der nächsten Auszahlung verrechnet wird.
//  - rechnungZurZahlung: Rechnung zu einer Charge (API "basil" hat charge.invoice entfernt).
// ===================================================================

/** Mail normalisieren: klein, ohne Plus-Anhang, Gmail ohne Punkte. */
export function normMail(m: string | null | undefined): string {
  const roh = String(m ?? "").trim().toLowerCase();
  const at = roh.lastIndexOf("@");
  if (at < 1) return "";
  let lokal = roh.slice(0, at).split("+")[0];
  let dom = roh.slice(at + 1);
  if (dom === "googlemail.com") dom = "gmail.com";
  if (dom === "gmail.com") lokal = lokal.replace(/\./g, "");
  return `${lokal}@${dom}`;
}

/** Alle Karten-Fingerabdrücke eines Stripe-Kunden (gespeicherte Karten + Karten aus Zahlungen). */
// deno-lint-ignore no-explicit-any
export async function kartenVon(stripe: any, kunde: string): Promise<Set<string>> {
  const fp = new Set<string>();
  for await (const pm of stripe.paymentMethods.list({ customer: kunde, type: "card", limit: 100 })) {
    if (pm.card?.fingerprint) fp.add(pm.card.fingerprint);
  }
  for await (const ch of stripe.charges.list({ customer: kunde, limit: 100 })) {
    const f = ch.payment_method_details?.card?.fingerprint;
    if (f) fp.add(f);
  }
  return fp;
}

/**
 * Selbstkauf über den eigenen Partnerlink? Rückgabe Grund oder null.
 * Wirft bei Stripe-Fehlern (fail-closed über Webhook-Wiederholung).
 */
export async function partnerSelbstkauf(
  // deno-lint-ignore no-explicit-any
  stripe: any,
  partnerMail: string | null | undefined,
  kaeuferMail: string | null | undefined,
  kaeuferKunde: string | null | undefined,
): Promise<string | null> {
  const p = normMail(partnerMail);
  if (!p) return null;
  if (p === normMail(kaeuferMail)) return "selbe E-Mail";
  if (!kaeuferKunde) return null;
  const partnerKunden: string[] = [];
  for await (const k of stripe.customers.list({ email: String(partnerMail).trim().toLowerCase(), limit: 100 })) {
    partnerKunden.push(k.id);
  }
  if (partnerKunden.includes(kaeuferKunde)) return "selber Stripe-Kunde";
  const kk = await kartenVon(stripe, kaeuferKunde);
  if (!kk.size) return null;
  for (const id of partnerKunden) {
    for (const f of await kartenVon(stripe, id)) if (kk.has(f)) return "selbe Karte";
  }
  return null;
}

/** Rechnung zu einer Charge: charge.invoice (alte API) oder über invoice_payments (basil). */
// deno-lint-ignore no-explicit-any
export async function rechnungZurZahlung(stripe: any, ch: any): Promise<string | null> {
  if (ch?.invoice) return typeof ch.invoice === "string" ? ch.invoice : ch.invoice.id;
  const pi = typeof ch?.payment_intent === "string" ? ch.payment_intent : ch?.payment_intent?.id;
  if (!pi || !stripe.invoicePayments) return null;
  const r = await stripe.invoicePayments.list({ payment: { type: "payment_intent", payment_intent: pi }, limit: 1 });
  const inv = r.data?.[0]?.invoice;
  return inv ? (typeof inv === "string" ? inv : inv.id) : null;
}

/**
 * Provision zu einer Rechnung zurücknehmen (Erstattung/Chargeback). Idempotent:
 * die Gegenbuchung hat stripe_invoice_id "<inv>#rueck" (UNIQUE).
 */
export type StornoArt = "refund" | "dispute";

export async function provisionZurueck(
  sb: { from: (t: string) => any },
  rechnung: string,
  art: StornoArt,
): Promise<string> {
  const grund = art === "refund" ? "Erstattung" : "Chargeback";
  const { data: rows, error } = await sb.from("affiliate_commissions")
    .select("id, affiliate_id, referral_id, product, base_cents, currency, rate, commission_cents, status")
    .eq("stripe_invoice_id", rechnung);
  if (error) throw error;
  let ergebnis = "keine Provision";
  for (const c of rows ?? []) {
    if (c.status === "reversed") { ergebnis = "schon zurückgenommen"; continue; }
    if (c.status !== "paid") {
      const { error: e } = await sb.from("affiliate_commissions").update({ status: "reversed", reversed_reason: art }).eq("id", c.id).neq("status", "paid");
      if (e) throw e;
      ergebnis = "reversed";
      continue;
    }
    const { error: e2 } = await sb.from("affiliate_commissions").insert({
      affiliate_id: c.affiliate_id,
      referral_id: c.referral_id,
      product: c.product,
      stripe_invoice_id: `${rechnung}#rueck`,
      base_cents: -(c.base_cents ?? 0),
      currency: c.currency ?? "eur",
      rate: c.rate,
      commission_cents: -(c.commission_cents ?? 0),
      status: "pending",
      reversed_reason: art,
    });
    if (e2 && !String(e2.message).includes("duplicate")) throw e2;
    ergebnis = `verrechnet mit nächster Auszahlung (${grund})`;
  }
  return ergebnis;
}

/**
 * Chargeback gewonnen: NUR die wegen des Chargebacks zurückgenommene Provision wieder aufheben (nicht
 * Erstattungs-Stornos) und nur, wenn die Zahlung nicht (auch nicht teilweise) erstattet ist.
 * Bereits verrechnete Gegenbuchungen bleiben (Security-Review 27.10.2026).
 */
export async function provisionWiederherstellen(
  sb: { from: (t: string) => any },
  rechnung: string,
  erstattetCents: number,
): Promise<boolean> {
  if (erstattetCents > 0) return false;
  const { error } = await sb.from("affiliate_commissions").update({ status: "pending", reversed_reason: null })
    .eq("stripe_invoice_id", rechnung).eq("status", "reversed").eq("reversed_reason", "dispute");
  if (error) throw error;
  const { error: e2 } = await sb.from("affiliate_commissions").delete()
    .eq("stripe_invoice_id", `${rechnung}#rueck`).eq("status", "pending").eq("reversed_reason", "dispute");
  if (e2) throw e2;
  return true;
}
