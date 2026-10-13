// access.ts — EINE Regel für "hat aktiven Zugang" in allen Server-Gates.
//
// Vorher prüften chat-felix, guide-detail, discord-abo-pruefen und send-weekly
// nur `status`/`comp_access`. Abgelaufene Aktivierungscodes und Reseller-Zugänge
// mit `current_period_end` blieben dadurch offen.
//
// Regel (setzt die bestehende Regel nur durch, ändert keine Laufzeit):
//   - comp_access     → immer Zugang
//   - status active/trialing, sonst kein Zugang
//   - Code-/Reseller-Zeilen (source ≠ stripe): zusätzlich Laufzeitende in der
//     Zukunft (oder kein Ende). Ihre Kulanz steckt bereits im gespeicherten Ende.
//   - Stripe-Zeilen (source 'stripe' oder leer): NUR der Status zählt, das
//     gespeicherte Laufzeitende NICHT.
//
// Warum Stripe ohne Laufzeitende: Für Stripe-Zeilen schrieb bis zum
// Webhook-Sync (stripe-affiliate-webhook → syncAboZeile) nur check-subscription
// das Ende — und nur, wenn der Kunde die App öffnet. Jeder Monatskunde, der
// verlängert hat, ohne die App zu öffnen, trägt ein veraltetes Ende. Eine
// Prüfung darauf sperrte zahlende Kunden aus (Discord-Rolle, Wochenmail,
// Mitgründer-Börse). Kündigung/Löschung/Zahlungsausfall setzt der Webhook jetzt
// direkt im Status (canceled/inactive); das ist die verlässliche Quelle.
// Altbestände, die vor dem Webhook-Sync gekündigt wurden, bleiben bis zum
// nächsten check-subscription "active" (Zustand wie vor dieser Regel).

export type AboZeile = {
  status?: string | null;
  comp_access?: boolean | null;
  current_period_end?: string | null;
  source?: string | null;
} | null | undefined;

export function istStripeZeile(sub: AboZeile): boolean {
  return !sub?.source || sub.source === "stripe";
}

export function hatAktivenZugang(sub: AboZeile, jetzt: Date = new Date()): boolean {
  if (!sub) return false;
  if (sub.comp_access === true) return true;
  if (sub.status !== "active" && sub.status !== "trialing") return false;
  if (istStripeZeile(sub)) return true; // Status ist per Webhook/Sync gepflegt, Ende evtl. veraltet
  if (!sub.current_period_end) return true;
  const ende = Date.parse(sub.current_period_end);
  if (Number.isNaN(ende)) return true; // unlesbar ≠ abgelaufen — nicht aussperren
  return ende > jetzt.getTime();
}

/** Spaltenliste, die hatAktivenZugang braucht — für .select(). */
export const ZUGANG_SPALTEN = "status, comp_access, current_period_end, source";
