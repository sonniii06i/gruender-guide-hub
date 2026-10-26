// ===================================================================
// widerruf.ts — Eingabeprüfung und Limits der Widerrufsfunktion
// (§ 356a BGB), rein und testbar (keine Deno-APIs außer crypto).
//
// Security-Review 26.10.2026: Die Funktion schickt Mails an Adressen, die
// niemand bestätigt hat. Damit sie kein Spam-Relay wird:
//  - KEIN Freitext in Mails an den Verbraucher: Vertrag ist eine Auswahl,
//    die Bestellnummer muss wie eine Stripe-Kennung aussehen, das Datum
//    ist ein Datum. Der Name (§ 356a Abs. 2 BGB verlangt ihn) geht nur in
//    die interne Mail an support@, nie an die eingegebene Adresse.
//  - Limits dauerhaft in mail_events (keine Migration nötig): je Adresse
//    (Plus-Anhang entfernt), je IP (nur SHA-256-Präfix) und global.
// ===================================================================

export const VERTRAGSARTEN = {
  abo: "GründerX-Abo",
  gruendungspaket: "Gründungspaket 2026 (Download)",
  sonstiges: "anderer Vertrag mit GründerX",
} as const;
export type Vertragsart = keyof typeof VERTRAGSARTEN;

export const LIMIT_ADRESSE_TAG = 3;
export const LIMIT_IP_STUNDE = 5;
export const LIMIT_GLOBAL_STUNDE = 20;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
const NAME_RE = /^[\p{L}][\p{L}' .-]{1,79}$/u;
const BESTELL_RE = /^(pi|cs_live|cs_test|sub|in|ch)_[A-Za-z0-9_]{6,80}$/;
const DATUM_RE = /^\d{4}-\d{2}-\d{2}$/;

export interface WiderrufDaten {
  name: string;
  email: string;
  vertrag: Vertragsart;
  bestellnummer?: string;
  kaufdatum?: string;
}

export function pruefeWiderruf(b: Record<string, unknown>): { ok: true; daten: WiderrufDaten } | { ok: false; feld: string } {
  const name = String(b.name ?? "").trim().replace(/\s+/g, " ");
  const email = String(b.email ?? "").trim().toLowerCase();
  const vertrag = String(b.vertrag ?? "");
  const bestellnummer = String(b.bestellnummer ?? "").trim();
  const kaufdatum = String(b.kaufdatum ?? "").trim();
  if (!NAME_RE.test(name)) return { ok: false, feld: "name" };
  if (!EMAIL_RE.test(email) || email.length > 254) return { ok: false, feld: "email" };
  if (!(vertrag in VERTRAGSARTEN)) return { ok: false, feld: "vertrag" };
  if (bestellnummer && !BESTELL_RE.test(bestellnummer)) return { ok: false, feld: "bestellnummer" };
  if (kaufdatum && (!DATUM_RE.test(kaufdatum) || Number.isNaN(Date.parse(kaufdatum)))) return { ok: false, feld: "kaufdatum" };
  return {
    ok: true,
    daten: { name, email, vertrag: vertrag as Vertragsart, ...(bestellnummer ? { bestellnummer } : {}), ...(kaufdatum ? { kaufdatum } : {}) },
  };
}

/** Schlüssel fürs Adress-Limit: klein, ohne Plus-Anhang (a+x@b.de == a@b.de). */
export function limitAdresse(email: string): string {
  const [lokal, domain] = email.trim().toLowerCase().split("@");
  return `${(lokal ?? "").split("+")[0]}@${domain ?? ""}`;
}

/** IP nur als Hash-Präfix speichern. */
export async function ipSchluessel(ip: string): Promise<string> {
  const h = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`widerruf|${ip}`)));
  return "ip:" + Array.from(h.slice(0, 12)).map((x) => x.toString(16).padStart(2, "0")).join("");
}
