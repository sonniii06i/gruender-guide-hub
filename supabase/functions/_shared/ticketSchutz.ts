// ticketSchutz.ts — Limits fuer die KUNDENMAIL von send-ticket-email (SICHERHEIT 08.11.2026, Muster AnwaltX
// supportSchutz.ts). Die interne Meldung an den Support geht immer raus (kein Ticket geht verloren); an die
// EINGEGEBENE Adresse geht nur eine Bestaetigung mit festem Betreff und ohne Freitext (kein Name, kein Betreff,
// keine Nachricht), und auch die nur innerhalb der Limits. Zaehler nicht lesbar → keine Kundenmail (fail closed).
export const LIMIT_ADRESSE_TAG = 3;
export const LIMIT_IP_STUNDE = 5;
export const LIMIT_GLOBAL_STUNDE = 30;
export const KUNDEN_BETREFF_FEST = "Support-Anfrage";

/** Adresse fuer den Zaehler: klein, Plus-Anhang weg. */
export function adresseNormal(email: string): { lokal: string; domain: string } | null {
  const e = String(email ?? "").trim().toLowerCase();
  const at = e.lastIndexOf("@");
  if (at < 1 || at === e.length - 1) return null;
  return { lokal: e.slice(0, at).split("+")[0], domain: e.slice(at + 1) };
}

/** ILIKE-Muster fuer alle Varianten derselben Adresse (lokal, lokal+…), % und _ escaped. */
export function adressMuster(n: { lokal: string; domain: string }): { exakt: string; plus: string } {
  const esc = (s: string) => s.replace(/[\\%_]/g, (c) => "\\" + c);
  return { exakt: `${esc(n.lokal)}@${esc(n.domain)}`, plus: `${esc(n.lokal)}+%@${esc(n.domain)}` };
}

/** Client-IP nur aus cf-connecting-ip / x-real-ip (x-forwarded-for ist vom Client setzbar). */
export function clientIp(req: Request): string {
  return (req.headers.get("cf-connecting-ip") || req.headers.get("x-real-ip") || "").trim().slice(0, 64);
}

export async function ipHash(ip: string): Promise<string> {
  if (!ip) return "";
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("gx-ticket:" + ip));
  return Array.from(new Uint8Array(d)).slice(0, 12).map((b) => b.toString(16).padStart(2, "0")).join("");
}
