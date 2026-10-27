// ===================================================================
// affiliateKonditionen.ts — Provisionssatz des Partnerprogramms (Hub-Ledger
// in AnwaltX, gemeinsam fuer AnwaltX, GruenderX und Bundle). Datei in
// AnwaltX und GruenderX identisch halten.
//
// Einheitssatz ab 27.10.2026 (Betreiber-Entscheidung „mehr Sales ohne zu
// viel Geld zu verlieren“): 25 % je bezahlter Rechnung, aber nur fuer
// Rechnungen, deren Leistungszeitraum vor Abo-Start + 12 Kalendermonaten
// beginnt. Fensterstart = Start des Abos (sub.start_date), beim ersten Mal in
// affiliate_referrals.fenster_start gespeichert. Fehlt der Start oder ist er
// nicht lesbar: keine Provision (fail-closed, Security-Review 27.10.2026).
// Auszahlbar erst nach Ablauf der 14-taegigen Widerrufsfrist (manage-affiliate).
// Bestandsschutz: Partner von vor dem 27.10.2026 behalten 20 % dauerhaft
// (affiliates.konditionen = 'v1_20_dauerhaft'), ohne Fenster.
// ===================================================================

export type Konditionen = "v1_20_dauerhaft" | "v2_25_12m";
export const WIDERRUF_TAGE = 14;

function zeitpunkt(x: string | number | null | undefined): number {
  if (typeof x === "number") return Number.isFinite(x) && x > 0 ? x : NaN;
  return x ? Date.parse(String(x)) : NaN;
}

/** Ende des Fensters: Start + 12 Kalendermonate (UTC), strikte Grenze. */
export function fensterEnde(startMs: number): number {
  const d = new Date(startMs);
  return Date.UTC(d.getUTCFullYear() + 1, d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
}

/** Satz fuer eine Rechnung (Leistungsbeginn `rechnungAm`, ms) oder 0. */
export function provisionsSatz(k: string | null | undefined, fensterStart: string | number | null | undefined, rechnungAm: number): number {
  if (k === "v1_20_dauerhaft") return 0.20;
  const start = zeitpunkt(fensterStart);
  if (!Number.isFinite(start) || !Number.isFinite(rechnungAm)) return 0;   // fail-closed
  return rechnungAm < fensterEnde(start) ? 0.25 : 0;
}

/** Erst nach der Widerrufsfrist auszahlbar. */
export function auszahlbar(erstelltAm: string, jetzt = Date.now()): boolean {
  const t = Date.parse(erstelltAm);
  return Number.isFinite(t) && jetzt - t >= WIDERRUF_TAGE * 86400_000;
}

/**
 * Leistungsbeginn einer Abo-Rechnung in ms (Viertes/Fuenftes Security-Review 27.10.2026).
 * NICHT inv.period_start: das ist bei Verlaengerungen der VORHERIGE Zeitraum. Massgeblich ist
 * die Abo-Position: API 2023-10-16 `line.type === "subscription"`, ab basil
 * `line.parent.type === "subscription_item_details"`; regulaere Position vor Proration.
 * `zeilen`: ALLE Positionen (bei inv.lines.has_more vorher per listLineItems holen).
 * Nur Proration-Zeilen: spaetester Start, mindestens bezahlt-am (kippt Richtung "ausserhalb").
 * Fallback ohne Abo-Position: bezahlt am, sonst erstellt. Nichts lesbar -> NaN (keine Provision).
 */
// deno-lint-ignore no-explicit-any
export function leistungsBeginn(inv: any, zeilen?: any[]): number {
  // deno-lint-ignore no-explicit-any
  const alle: any[] = zeilen ?? inv?.lines?.data ?? [];
  // deno-lint-ignore no-explicit-any
  const istAbo = (l: any) => l?.type === "subscription" || l?.parent?.type === "subscription_item_details";
  // deno-lint-ignore no-explicit-any
  const istProration = (l: any) => l?.proration === true || l?.parent?.subscription_item_details?.proration === true;
  const sek = (x: unknown) => (typeof x === "number" && x > 0 ? x : NaN);
  const bezahlt = sek(inv?.status_transitions?.paid_at);
  const abo = alle.filter(istAbo);
  const regulaer = abo.find((l) => !istProration(l));
  if (regulaer && Number.isFinite(sek(regulaer?.period?.start))) return regulaer.period.start * 1000;
  if (abo.length) {
    const starts = abo.map((l) => sek(l?.period?.start)).filter(Number.isFinite);
    if (starts.length) return Math.max(...starts, Number.isFinite(bezahlt) ? bezahlt : 0) * 1000;
  }
  const fallback = Number.isFinite(bezahlt) ? bezahlt : sek(inv?.created);
  return Number.isFinite(fallback) ? fallback * 1000 : NaN;
}
