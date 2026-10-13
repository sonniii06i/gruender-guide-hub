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
//
// Dazu `findBlockingSubscriptions`: alle Abos, die noch abbuchen (active,
// trialing, past_due) — für die Kontolöschung (delete-account) und die Wahl
// des richtigen Kunden im Kundenportal. Wer prüfen muss, ob ein Abo läuft,
// ruft die Kundensuche mit `{ strict: true }` auf: Dann wird auch ein
// gescheiterter customers.search geworfen statt als "kein Treffer" verbucht.

/** Abo-Status, die noch abbuchen bzw. wieder abbuchen werden. */
export const BLOCKING_SUBSCRIPTION_STATUSES = ["active", "trialing", "past_due"] as const;

type KundeLike = { id: string; deleted?: boolean; email?: string | null };
type Liste<T> = { data?: T[] };

export interface StripeSubscriptionLike {
  id: string;
  status: string;
  customer: string | { id: string };
  cancel_at_period_end?: boolean | null;
  current_period_end?: number | null;
  items?: { data?: { current_period_end?: number | null }[] };
}

/** Nur die Stripe-Aufrufe, die hier gebraucht werden (strukturell typisiert, für Tests austauschbar). */
export type StripeLike = {
  customers: {
    retrieve(id: string): Promise<KundeLike>;
    list(p: { email: string; limit: number }): Promise<Liste<KundeLike>>;
    search(p: { query: string; limit: number }): Promise<Liste<KundeLike>>;
  };
  subscriptions: {
    list(p: { customer: string; status?: string; limit?: number; starting_after?: string }): Promise<{
      data: StripeSubscriptionLike[];
      has_more?: boolean;
    }>;
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
  opts: { strict?: boolean } = {},
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
    const res = await stripe.customers.list({ email: v, limit: 100 });
    for (const c of res.data ?? []) if (!c.deleted) add(c.id);
  }
  if (lower) {
    try {
      const res = await stripe.customers.search({
        query: `email:'${stripeSearchEscape(lower)}'`,
        limit: 100,
      });
      for (const c of res.data ?? []) {
        if (!c.deleted && String(c.email ?? "").trim().toLowerCase() === lower) add(c.id);
      }
    } catch (e) {
      // Search ist eine Ergänzung; fällt sie aus, bleiben die list-Treffer.
      // Im strikten Modus (Abo-Sperre der Kontolöschung) wäre das ein
      // möglicherweise übersehenes Abo — dann weiterwerfen.
      if (opts.strict) throw e;
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
    if (subs.data[0]) return { customerId, subscription: subs.data[0] as unknown as S };
  }
  return { customerId: customerIds[0] ?? null, subscription: null };
}

/** Laufzeitende in Sekunden: ab API 2025-08-27 steht es an der Position, nicht am Abo. */
export function subscriptionPeriodEnd(sub: StripeSubscriptionLike): number | null {
  return sub.current_period_end ?? sub.items?.data?.[0]?.current_period_end ?? null;
}

export interface BlockingSubscription {
  id: string;
  customer: string;
  status: string;
  cancel_at_period_end: boolean;
  current_period_end: string | null;
}

/**
 * Alle Abos dieser Kunden mit Status active, trialing oder past_due.
 * Stripe-Fehler werden NICHT verschluckt (auch kein resource_missing): Wer so
 * prüft, darf ein gescheitertes Nachsehen nie als "kein Abo" verbuchen.
 */
export async function findBlockingSubscriptions(
  stripe: StripeLike,
  customerIds: string[],
): Promise<BlockingSubscription[]> {
  const blocking = new Set<string>(BLOCKING_SUBSCRIPTION_STATUSES);
  const out: BlockingSubscription[] = [];
  const seen = new Set<string>();
  for (const customer of customerIds) {
    // status "all" + eigener Filter: Ein einzelner Statusfilter würde
    // trialing/past_due verlieren.
    let startingAfter: string | undefined;
    for (let page = 0; page < 20; page++) {
      const res = await stripe.subscriptions.list({
        customer,
        status: "all",
        limit: 100,
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });
      const data = res.data ?? [];
      for (const sub of data) {
        if (!blocking.has(sub.status) || seen.has(sub.id)) continue;
        seen.add(sub.id);
        const end = subscriptionPeriodEnd(sub);
        out.push({
          id: sub.id,
          customer: typeof sub.customer === "string" ? sub.customer : sub.customer?.id ?? customer,
          status: sub.status,
          cancel_at_period_end: !!sub.cancel_at_period_end,
          current_period_end: end ? new Date(end * 1000).toISOString() : null,
        });
      }
      if (!res.has_more || data.length === 0) break;
      startingAfter = data[data.length - 1].id;
      if (page === 19) throw new Error(`Stripe: zu viele Abos für Kunde ${customer}, Prüfung unvollständig`);
    }
  }
  return out;
}
