// aboSync.ts — Entscheidungslogik, wie ein Stripe-Abo-Ereignis die LOKALE
// Zeile in `subscriptions` ändert (stripe-affiliate-webhook → syncAboZeile).
// Rein und ohne I/O, damit sie testbar ist.
//
// Regeln:
//   - Nur Zeilen mit source 'stripe' (oder leer) ohne comp_access; Zeilen, die
//     zu einem ANDEREN Abo gehören, rechnet check-subscription neu.
//   - Abo active/trialing:
//       Zeile aktiv          → Laufzeitende + Abo-ID nachziehen.
//       Zeile past_due/inactive UND genau dieses Abo (stripe_subscription_id)
//                            → wieder aktiv (Zahlung nach Mahnlauf geglückt).
//   - Zugang entziehen nur bei endgültigem Ende: gelöscht, canceled, unpaid,
//     incomplete_expired. past_due/paused entziehen NICHT — das war vorher so
//     (Zeile blieb im Mahnlauf "active"); eine Karenz-/Entzugsregel im
//     Mahnlauf ist eine Geschäftsentscheidung des Betreibers.

export const PRODUCT_TO_PLAN: Record<string, string> = {
  gruenderx: "GründerX",
  bundle: "Founder Bundle",
};
// Gleiche Fallback-Zuordnung wie check-subscription (Alt-Abos ohne product-Metadatum).
export const PRICE_TO_PLAN: Record<string, string> = {
  price_1TTUf764hSN6usxPLDOylK70: "GründerX",
  price_1TTUfV64hSN6usxPe60ADpTF: "Founder Bundle",
};

export type AboLike = {
  id: string;
  status: string;
  customer?: string | { id?: string } | null;
  current_period_end?: number | null;
  items?: { data?: Array<{ current_period_end?: number | null; price?: { id?: string } | null }> };
  metadata?: Record<string, string> | null;
};

export type LokaleAboZeile = {
  user_id: string;
  status?: string | null;
  source?: string | null;
  comp_access?: boolean | null;
  stripe_subscription_id?: string | null;
};

export const ENTZUG_STATUS = ["canceled", "unpaid", "incomplete_expired"];

export function planFuerAbo(sub: AboLike): string {
  const meta = sub.metadata?.product ?? "";
  const price = sub.items?.data?.[0]?.price?.id ?? "";
  return PRODUCT_TO_PLAN[meta] ?? PRICE_TO_PLAN[price] ?? "Unknown";
}

export function laufzeitEndeIso(sub: AboLike): string | null {
  const endeUnix = sub.current_period_end ?? sub.items?.data?.[0]?.current_period_end ?? null;
  return endeUnix ? new Date(endeUnix * 1000).toISOString() : null;
}

export function aboSyncPatch(
  r: LokaleAboZeile,
  sub: AboLike,
  geloescht: boolean,
): Record<string, unknown> | null {
  if (r.comp_access) return null;
  if (r.source && r.source !== "stripe") return null;
  if (r.stripe_subscription_id && r.stripe_subscription_id !== sub.id) return null;

  const ende = laufzeitEndeIso(sub);
  const aktiv = !geloescht && (sub.status === "active" || sub.status === "trialing");
  const entziehen = geloescht || ENTZUG_STATUS.includes(sub.status);

  if (aktiv) {
    if (r.status === "active" || r.status === "trialing") {
      return { current_period_end: ende, stripe_subscription_id: sub.id };
    }
    if ((r.status === "past_due" || r.status === "inactive") && r.stripe_subscription_id === sub.id) {
      return { plan: planFuerAbo(sub), status: "active", current_period_end: ende, stripe_subscription_id: sub.id };
    }
    return null;
  }
  if (entziehen && r.status !== "inactive" && r.status !== "canceled") {
    return {
      plan: "none",
      status: geloescht || sub.status === "canceled" ? "canceled" : "inactive",
      current_period_end: ende,
    };
  }
  return null;
}
