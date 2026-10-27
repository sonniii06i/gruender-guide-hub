// ===================================================================
// aktionCode.ts — Eingabeprüfung der Function aktion-code (27.10.2026).
//
// Die Angebots-Engine im HQ (aktionen.py) legt für GründerX-Aktionen
// Rabatt-Codes an. Der eingeschränkte Live-Schlüssel des HQ darf das
// bewusst nicht; diese Function nutzt STRIPE_SECRET_KEY, erlaubt aber nur
// genau drei Dinge – und die Grenzen gelten hier serverseitig, egal was
// das HQ schickt:
//   anlegen       Coupon NUR auf die Abo-Produkte von GründerX, ≤ 50 %,
//                 1–3 Monate, Ablauf ≤ 60 Tage, + Promotion-Code
//   deaktivieren  nur Codes, die diese Function angelegt hat (Metadaten)
//   auswerten     Einlösungen + bezahlte Rechnungen mit dem Code
// ===================================================================

export const GX_PRODUKTE = ["prod_USPUozqTnVyRXl", "prod_USPUb11hirlkRP"] as const;   // GründerX, Founder Bundle
export const RABATT_MAX = 50;
export const ABLAUF_MAX_TAGE = 60;
export const QUELLE = "hq-aktionen";

const CODE_RE = /^[A-Z0-9][A-Z0-9-]{3,19}$/;
const ANLASS_RE = /^[a-z0-9-]{3,60}$/;
const PROMO_RE = /^promo_[A-Za-z0-9]{6,60}$/;

export interface Anlegen {
  aktion_id: string;
  anlass: string;
  titel: string;
  code: string;
  prozent: number;
  monate: number;
  bis: number;            // Unix-Sekunden: redeem_by des Coupons und expires_at des Codes
  neukunden: boolean;
}

export function pruefeAnlegen(b: Record<string, unknown>, jetztSek: number): { ok: true; d: Anlegen } | { ok: false; feld: string } {
  const aktion_id = String(b.aktion_id ?? "");
  const anlass = String(b.anlass ?? "");
  const titel = String(b.titel ?? "").trim().slice(0, 30);
  const code = String(b.code ?? "");
  const prozent = Number(b.prozent);
  const monate = Number(b.monate ?? 1);
  const bis = Number(b.bis);
  if (!/^\d{1,9}$/.test(aktion_id)) return { ok: false, feld: "aktion_id" };
  if (!ANLASS_RE.test(anlass)) return { ok: false, feld: "anlass" };
  if (!titel) return { ok: false, feld: "titel" };
  if (!CODE_RE.test(code)) return { ok: false, feld: "code" };
  if (!Number.isInteger(prozent) || prozent < 1 || prozent > RABATT_MAX) return { ok: false, feld: "prozent" };
  if (!Number.isInteger(monate) || monate < 1 || monate > 3) return { ok: false, feld: "monate" };
  if (!Number.isInteger(bis) || bis <= jetztSek || bis > jetztSek + ABLAUF_MAX_TAGE * 86400) return { ok: false, feld: "bis" };
  return { ok: true, d: { aktion_id, anlass, titel, code, prozent, monate, bis, neukunden: b.neukunden !== false } };
}

export function pruefePromo(v: unknown): string | null {
  const s = String(v ?? "");
  return PROMO_RE.test(s) ? s : null;
}

/** Bearer-Token gegen AKTION_CODE_SECRET, konstante Laufzeit; ohne (ausreichend langes) Secret ist alles zu. */
export function autorisiert(header: string | null, secret: string | undefined): boolean {
  const soll = secret ?? "";
  if (soll.length < 32) return false;
  const ist = (header ?? "").replace(/^Bearer\s+/i, "");
  if (ist.length !== soll.length) return false;
  let diff = 0;
  for (let i = 0; i < soll.length; i++) diff |= ist.charCodeAt(i) ^ soll.charCodeAt(i);
  return diff === 0;
}
