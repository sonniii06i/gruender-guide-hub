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
