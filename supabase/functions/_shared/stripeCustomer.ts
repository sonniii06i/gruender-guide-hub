// stripeCustomer.ts — Stripe-Kunden eines Kontos robust finden.
//
// `stripe.customers.list({ email })` filtert CASE-SENSITIV. Im Pay-first-Weg
// legt Stripe den Kunden mit der Schreibweise an, die im Checkout getippt
// wurde ("Max@Firma.de"), claim-account legt das Konto aber kleingeschrieben
// an. Die reine E-Mail-Suche fand den Kunden dann nicht, check-subscription
// schrieb "inactive" und sperrte einen zahlenden Kunden aus; customer-portal
// meldete "No Stripe customer".
//
// Reihenfolge:
//   1. die gespeicherte subscriptions.stripe_customer_id (verlässlich, kein
//      Schreibweisen-Problem),
//   2. customers.list mit der Adresse wie gespeichert und kleingeschrieben,
//   3. customers.search (case-insensitiv, aber mit bis zu ~1 min Verzug).
// Alle Treffer werden gesammelt — ein Nutzer kann mehrere Kunden haben.

type KundeLike = { id: string; deleted?: boolean; email?: string | null };
type Liste<T> = { data?: T[] };
/** Nur die Stripe-Aufrufe, die hier gebraucht werden (strukturell typisiert). */
export type StripeLike = {
  customers: {
    retrieve(id: string): Promise<KundeLike>;
    list(p: { email: string; limit: number }): Promise<Liste<KundeLike>>;
    search(p: { query: string; limit: number }): Promise<Liste<KundeLike>>;
  };
  subscriptions: {
    list(p: { customer: string; status: "active"; limit: number }): Promise<{ data: unknown[] }>;
  };
};

const fehlerCode = (e: unknown) => (e as { code?: string } | null)?.code;

/** Maskiert \ und ' für die Stripe-Search-Query-Sprache. */
export function stripeSearchEscape(v: string): string {
  return String(v ?? "").replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

export async function findStripeCustomerIds(
  stripe: StripeLike,
  email: string,
  storedCustomerId?: string | null,
): Promise<string[]> {
  const ids: string[] = [];
  const add = (id?: string | null) => {
    if (id && !ids.includes(id)) ids.push(id);
  };
  if (storedCustomerId) {
    // Gespeicherte ID nur übernehmen, wenn der Kunde in Stripe noch existiert.
    try {
      const c = await stripe.customers.retrieve(storedCustomerId);
      if (c && !c.deleted) add(c.id);
    } catch (e) {
      if (fehlerCode(e) !== "resource_missing") throw e;
    }
  }

  const raw = String(email ?? "").trim();
  const lower = raw.toLowerCase();
  const variants = Array.from(new Set([raw, lower].filter(Boolean)));
  for (const v of variants) {
    const res = await stripe.customers.list({ email: v, limit: 10 });
    for (const c of res.data ?? []) if (!c.deleted) add(c.id);
  }
  if (lower) {
    try {
      const res = await stripe.customers.search({
        query: `email:'${stripeSearchEscape(lower)}'`,
        limit: 10,
      });
      for (const c of res.data ?? []) {
        if (!c.deleted && String(c.email ?? "").trim().toLowerCase() === lower) add(c.id);
      }
    } catch (e) {
      // Search ist eine Ergänzung; fällt sie aus, bleiben die list-Treffer.
      console.error("customers.search failed", e);
    }
  }
  return ids;
}

/**
 * Sucht über alle Kunden das aktive Abo. Gibt Kunde + Abo zurück, oder den
 * ersten bekannten Kunden ohne Abo. Stripe-Fehler werden NICHT verschluckt —
 * der Aufrufer darf bei einem Fehler nie auf "inactive" herunterschreiben.
 */
export async function findActiveStripeSubscription<S = unknown>(
  stripe: StripeLike,
  customerIds: string[],
): Promise<{ customerId: string | null; subscription: S | null }> {
  for (const customerId of customerIds) {
    let subs;
    try {
      subs = await stripe.subscriptions.list({ customer: customerId, status: "active", limit: 1 });
    } catch (e) {
      // Eine gespeicherte, inzwischen gelöschte Kunden-ID liefert resource_missing —
      // die übrigen Kunden trotzdem prüfen. Alles andere weiterwerfen.
      if (fehlerCode(e) === "resource_missing") continue;
      throw e;
    }
    if (subs.data[0]) return { customerId, subscription: subs.data[0] as S };
  }
  return { customerId: customerIds[0] ?? null, subscription: null };
}
