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

/** Nur laufende Abos werden zum Periodenende gekündigt (Trial: Ende der Testphase -> keine Folgezahlung). */
export function kuendbar(status: string): boolean {
  return status === "active" || status === "trialing" || status === "past_due";
}
