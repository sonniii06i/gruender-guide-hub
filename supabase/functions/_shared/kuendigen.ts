// ===================================================================
// kuendigen.ts — Eingabeprüfung der Kündigungsschaltfläche (§ 312k BGB),
// rein und testbar. Gleiche Spam-Relay-Regeln wie widerruf.ts: kein
// Freitext in Mails an die eingegebene Adresse (Vertrag/Art sind
// Auswahlen, Name und Grund gehen nur an support@).
// ===================================================================

export const KUENDIGUNG_VERTRAEGE = {
  abo: "GründerX-Abo (auch 7-Tage-Startangebot)",
  sonstiges: "anderer Vertrag mit GründerX",
} as const;
export type KuendigungVertrag = keyof typeof KUENDIGUNG_VERTRAEGE;

export const KUENDIGUNG_ARTEN = {
  ordentlich: "ordentliche Kündigung",
  ausserordentlich: "außerordentliche Kündigung",
} as const;
export type KuendigungArt = keyof typeof KUENDIGUNG_ARTEN;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
const NAME_RE = /^[\p{L}][\p{L}' .-]{1,79}$/u;
const DATUM_RE = /^\d{4}-\d{2}-\d{2}$/;

export interface KuendigungDaten {
  name: string;
  email: string;
  vertrag: KuendigungVertrag;
  art: KuendigungArt;
  /** "naechstmoeglich" oder ISO-Datum JJJJ-MM-TT */
  zeitpunkt: string;
  /** nur bei außerordentlicher Kündigung (§ 312k Abs. 3 Nr. 1 BGB) */
  grund?: string;
}

const hat = (o: object, k: string) => Object.prototype.hasOwnProperty.call(o, k);

export function pruefeKuendigung(b: Record<string, unknown>): { ok: true; daten: KuendigungDaten } | { ok: false; feld: string } {
  const name = String(b.name ?? "").trim().replace(/\s+/g, " ");
  const email = String(b.email ?? "").trim().toLowerCase();
  const vertrag = String(b.vertrag ?? "");
  const art = String(b.art ?? "ordentlich");
  const zeitpunkt = String(b.zeitpunkt ?? "naechstmoeglich").trim();
  const grund = String(b.grund ?? "").trim().replace(/\s+/g, " ").slice(0, 600);
  if (!NAME_RE.test(name)) return { ok: false, feld: "name" };
  if (!EMAIL_RE.test(email) || email.length > 254) return { ok: false, feld: "email" };
  if (!hat(KUENDIGUNG_VERTRAEGE, vertrag)) return { ok: false, feld: "vertrag" };
  if (!hat(KUENDIGUNG_ARTEN, art)) return { ok: false, feld: "art" };
  if (zeitpunkt !== "naechstmoeglich" && (!DATUM_RE.test(zeitpunkt) || Number.isNaN(Date.parse(zeitpunkt)))) {
    return { ok: false, feld: "zeitpunkt" };
  }
  if (art === "ausserordentlich" && grund.length < 3) return { ok: false, feld: "grund" };
  return {
    ok: true,
    daten: {
      name, email, vertrag: vertrag as KuendigungVertrag, art: art as KuendigungArt, zeitpunkt,
      ...(art === "ausserordentlich" ? { grund } : {}),
    },
  };
}

/** Normalisierte Adresse für den Abgleich mit Stripe-Kunden (klein, ohne Plus-Anhang). */
export function mailNorm(email: string): string {
  const [lokal, domain] = email.trim().toLowerCase().split("@");
  return `${(lokal ?? "").split("+")[0]}@${domain ?? ""}`;
}

/** Exakter Vergleichswert für die Autorisierung (nur klein + getrimmt, KEINE Plus-/Punkt-Normalisierung). */
export function mailExakt(email: string): string {
  return String(email ?? "").trim().toLowerCase();
}

/** Nur laufende Abos werden zum Periodenende gekündigt (Trial: Ende der Testphase -> keine Folgezahlung). */
export function kuendbar(status: string): boolean {
  return status === "active" || status === "trialing" || status === "past_due";
}

// --- Bestätigungslink (Security-Review 27.10.2026) --------------------------
// Ohne Identitätsprüfung könnte jeder mit einer fremden Adresse ein fremdes Abo
// beenden. Darum: Erklärung sofort annehmen + bestätigen, die Stripe-Vormerkung
// aber erst nach Klick auf einen signierten, einmaligen, ablaufenden Link in der
// Mail an genau diese Adresse (oder sofort bei passender eingeloggter Sitzung).
export const LINK_GUELTIG_S = 7 * 86400;

async function hmacHex(secret: string, text: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(text));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function neueNonce(): string {
  const b = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(b).map((x) => x.toString(16).padStart(2, "0")).join("");
}

export async function signiereKuendigung(nonce: string, ablauf: number, email: string, secret: string): Promise<string> {
  return `${nonce}.${ablauf}.${await hmacHex(secret, `kuendigung|${nonce}|${ablauf}|${mailExakt(email)}`)}`;
}

/** Zerlegt ein Token ohne Prüfung der Signatur (dafür braucht es die gespeicherte Adresse). */
export function zerlegeToken(token: string): { nonce: string; ablauf: number; sig: string } | null {
  const m = /^([0-9a-f]{32})\.(\d{9,11})\.([0-9a-f]{64})$/.exec(String(token ?? ""));
  return m ? { nonce: m[1], ablauf: Number(m[2]), sig: m[3] } : null;
}

export async function tokenGueltig(token: string, email: string, secret: string, jetzt = Date.now()): Promise<boolean> {
  const t = zerlegeToken(token);
  if (!t || !secret || t.ablauf * 1000 < jetzt) return false;
  const soll = (await signiereKuendigung(t.nonce, t.ablauf, email, secret)).split(".")[2];
  if (soll.length !== t.sig.length) return false;
  let diff = 0;
  for (let i = 0; i < soll.length; i++) diff |= soll.charCodeAt(i) ^ t.sig.charCodeAt(i);
  return diff === 0;
}
