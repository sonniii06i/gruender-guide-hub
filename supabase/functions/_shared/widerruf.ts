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
//  - Zweiter Review 26.10.: Der WIDERRUF selbst scheitert nie an einem Limit
//    (§ 356a BGB) – er wird immer gespeichert und an support@ geschickt.
//    Gedrosselt wird nur die Bestätigungsmail an die eingegebene Adresse.
//    Erst eintragen, dann zählen (eigene Zeile inklusive) -> kein TOCTOU.
//  - Dritter Review: fail-closed nur für die Kundenmail; global zählen nur Sende-Slots;
//    IP nur aus gemessen vertrauenswürdigem Header (WIDERRUF_IP_HEADER), sonst „unbekannt“.
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

/**
 * Stufe 1 (Adresse + IP, insert-then-count, eigene Zeile inklusive). Fail-closed:
 * Sind die Zähler nicht lesbar/schreibbar (null), wird die Kundenmail gedrosselt –
 * der Widerruf selbst ist zu diesem Zeitpunkt schon gespeichert und an support@ (Review 3).
 */
export function bestaetigungErlaubt(nAdresse: number | null, nIp: number | null): boolean {
  if (nAdresse === null || nIp === null) return false;
  return nAdresse <= LIMIT_ADRESSE_TAG && nIp <= LIMIT_IP_STUNDE;
}

/**
 * Stufe 2 (global), erst NACH Adresse/IP: gezählt werden nur reservierte Sende-Slots
 * (eigener inklusive). Gedrosselte Anfragen reservieren keinen Slot, und ein Slot wird
 * wieder gelöscht, wenn die Mail nicht rausging – der Deckel füllt sich nur mit echten Sendungen.
 */
export function globalErlaubt(nSlots: number | null): boolean {
  return nSlots !== null && nSlots <= LIMIT_GLOBAL_STUNDE;
}

export const IP_HEADER_KANDIDATEN = ["cf-connecting-ip", "x-real-ip", "x-forwarded-for"] as const;

/**
 * Client-IP fürs Limit. Gelesen wird NUR der Header, dessen Name in
 * WIDERRUF_IP_HEADER steht – und erst, nachdem gemessen ist, dass das
 * Supabase-Gateway ihn selbst setzt bzw. überschreibt (Probe mit gefälschten
 * Werten im Redeploy-Skript, Log „[widerruf] ip-probe“). Ohne diese Einstellung
 * teilen sich alle Anfragen den Bucket „unbekannt“ (Review 3: lieber zu streng
 * als ein vom Client gewählter Wert). Bei x-forwarded-for zählt der rechteste Eintrag.
 */
export function clientIp(h: { get(name: string): string | null }, vertrauterHeader?: string): { ip: string; quelle: string } {
  const name = (vertrauterHeader ?? "").trim().toLowerCase();
  if (!(IP_HEADER_KANDIDATEN as readonly string[]).includes(name)) return { ip: "unbekannt", quelle: "unbekannt" };
  const roh = h.get(name) ?? "";
  const wert = name === "x-forwarded-for" ? roh.split(",").map((x) => x.trim()).filter(Boolean).pop() ?? "" : roh.trim();
  return wert ? { ip: wert, quelle: name } : { ip: "unbekannt", quelle: "unbekannt" };
}

/** Für die Messprobe: Kam der gefälschte Wert unverändert an? Loggt keine IPs. */
export function ipProbe(h: { get(name: string): string | null }, marker: string): string {
  return IP_HEADER_KANDIDATEN.map((n) => {
    const v = h.get(n);
    return `${n}=${v === null ? "fehlt" : v.split(",").map((x) => x.trim()).includes(marker) ? (v.trim() === marker ? "gefaelscht" : "gefaelscht+angehaengt") : "anders"}`;
  }).join(" ");
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
