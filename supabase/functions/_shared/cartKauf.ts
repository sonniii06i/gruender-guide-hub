// cartKauf.ts — Warenkorbstrecke: Stufenwahl und Kaufprüfung.
//
// 1. waehleStufe: Früher ging die HÖCHSTE fällige, noch nicht gesendete Stufe
//    raus — ohne zu prüfen, ob eine höhere schon gesendet war. Nach einem
//    verspäteten Lauf kamen die Mails rückwärts (3, dann 2, dann 1). Jetzt:
//    nur Stufen NACH der zuletzt gesendeten kommen in Frage; von denen geht
//    die höchste fällige raus, übersprungene niedrigere werden mitgestempelt.
//
// 2. hatBereitsGekauft: Wer schon gekauft hat, bekommt nichts — auch dann
//    nicht, wenn das expired-Event einer älteren, abgebrochenen Session erst
//    nach dem Kauf über eine zweite Session eintrifft.

import { ilikeExakt } from "./emailMatch.ts";
import { hatAktivenZugang, ZUGANG_SPALTEN } from "./access.ts";

export type StufeDef = { nr: number; ab: number; spalte: string };

/**
 * @returns die zu sendende Stufe und alle Spalten, die nach erfolgreichem
 *          Versand gestempelt werden (inkl. übersprungener), oder null.
 */
export function waehleStufe<S extends StufeDef>(
  stufen: readonly S[],
  zeile: Record<string, unknown>,
  alterStunden: number,
): { stufe: S; stempel: string[] } | null {
  let letzte = -1;
  stufen.forEach((s, i) => { if (zeile[s.spalte]) letzte = i; });
  const offen = stufen.slice(letzte + 1);
  let wahl = -1;
  offen.forEach((s, i) => { if (alterStunden >= s.ab) wahl = i; });
  if (wahl < 0) return null;
  return { stufe: offen[wahl], stempel: offen.slice(0, wahl + 1).map((s) => s.spalte) };
}

// Supabase-Client; bewusst locker typisiert, damit beide Client-Versionen passen.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Db = { from(t: string): any };

/**
 * true, wenn zu dieser Adresse ein Kauf vorliegt:
 *   - ein cart_abandons-Vorgang mit gekauft_at (optional erst ab `seitIso`),
 *   - ein aktives Reseller-Entitlement,
 *   - ein Konto mit aktivem Zugang.
 * Fehler werden geworfen — "unbekannt" darf nie als "nicht gekauft" gelten.
 */
export async function hatBereitsGekauft(db: Db, email: string, seitIso?: string | null): Promise<boolean> {
  const adr = ilikeExakt(String(email ?? "").trim());
  if (!adr) return false;

  let q = db.from("cart_abandons").select("id").ilike("email", adr).not("gekauft_at", "is", null);
  if (seitIso) q = q.gte("gekauft_at", seitIso);
  const kauf = await q.limit(1);
  if (kauf.error) throw new Error(`cart_abandons: ${kauf.error.message}`);
  if ((kauf.data ?? []).length) return true;

  const nowIso = new Date().toISOString();
  const ext = await db.from("external_entitlements").select("id")
    .ilike("email", adr).eq("status", "active")
    .or(`period_end.is.null,period_end.gt.${nowIso}`).limit(1);
  if (ext.error) throw new Error(`external_entitlements: ${ext.error.message}`);
  if ((ext.data ?? []).length) return true;

  const prof = await db.from("profiles").select("id").ilike("email", adr).limit(5);
  if (prof.error) throw new Error(`profiles: ${prof.error.message}`);
  const ids = (prof.data ?? []).map((p: { id: string }) => p.id);
  if (ids.length) {
    const subs = await db.from("subscriptions").select(ZUGANG_SPALTEN).in("user_id", ids);
    if (subs.error) throw new Error(`subscriptions: ${subs.error.message}`);
    if ((subs.data ?? []).some((s: Record<string, unknown>) => hatAktivenZugang(s))) return true;
  }
  return false;
}
