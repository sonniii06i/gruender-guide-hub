// ===================================================================
// mailBesitz.ts — Ist die Konto-Adresse nachweislich die des Nutzers?
//
// HINTERGRUND (27.10.2026): Die Registrierung laeuft ueber
// (AnwaltX) bzw. claim-account (GründerX, Konto aus der Kauf-Mail) setzt email_confirmed_at SOFORT — ohne
// Bestaetigungsklick, damit niemand nach der Anmeldung im Postfach haengen
// bleibt. Damit beweist email_confirmed_at aber nicht mehr, dass die Adresse
// dem Nutzer gehoert: Wer eine fremde, noch nicht registrierte Adresse
// eintippt, ist sofort "bestaetigt".
//
// Ueberall, wo die Konto-Adresse mit FREMDEN, schon vorhandenen Daten zu
// dieser Adresse verknuepft wird (Partnerkonto mit IBAN, Stripe-Kunde mit
// Rechnungen und Zahlarten, Reseller-Kauf), zaehlt deshalb nur noch
// app_metadata.mail_verifiziert === true. app_metadata kann der Nutzer selbst
// nicht schreiben — nur der Server (Service-Role).
//
// Gesetzt wird das Flag
//   * per Klick auf den Link in der Verifizierungsmail (mail-verifizieren),
//   * bei Konten aus claim-account (Adresse aus bezahlter Stripe-Session),
//   * per Migration fuer den Altbestand (echte Bestaetigung oder Zahlung).
// Fehlt das Flag ganz, gilt nur ein OAuth-Login (Google bestaetigt die
// Adresse selbst) als Nachweis — sonst nein (fail-closed).
// ===================================================================

// deno-lint-ignore no-explicit-any
type Any = any;

export function mailVerifiziert(user: Any): boolean {
  if (!user?.email || !user?.email_confirmed_at) return false;
  const am = user.app_metadata ?? {};
  // Review 27.10.: das Flag gilt nur fuer die Adresse, fuer die es gesetzt wurde.
  // Aendert sich user.email, ist es wertlos, bis die neue Adresse bestaetigt ist.
  const aktuell = String(user.email).trim().toLowerCase();
  if (am.mail_verifiziert === true) return String(am.mail_verifiziert_email ?? "") === aktuell;
  if (am.mail_verifiziert === false) return false;
  // Ohne Flag: nur wenn eine verknuepfte OAuth-Identitaet (Google o. ae.) GENAU
  // diese Adresse bestaetigt hat (Review 27.10.: nicht provider allein — nach
  // einer Adressaenderung waere sonst die neue, fremde Adresse "verifiziert").
  const ids: Any[] = Array.isArray(user.identities) ? user.identities : [];
  return ids.some((i) => String(i?.provider ?? "email") !== "email" &&
    String(i?.identity_data?.email ?? "").trim().toLowerCase() === aktuell &&
    i?.identity_data?.email_verified !== false);
}

/**
 * Stripe-Kunde des Nutzers. Mit verifizierter Adresse wie bisher ueber die
 * E-Mail; ohne nur ueber metadata.userId (vom eigenen Checkout gesetzt) —
 * nie ueber eine bloss eingetippte Adresse, sonst oeffnete ein Fremdkonto
 * Rechnungen, Zahlarten oder das Kundenportal eines echten Kunden.
 */
export async function stripeKundeFuer(stripe: Any, user: Any): Promise<string | null> {
  if (mailVerifiziert(user)) {
    const l = await stripe.customers.list({ email: user.email, limit: 1 });
    if (l.data.length > 0) return l.data[0].id;
  }
  const id = String(user?.id ?? "");
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  // AnwaltX setzt metadata.userId, GruenderX metadata.supabase_user_id.
  const s = await stripe.customers.search({
    query: `metadata['userId']:'${id}' OR metadata['supabase_user_id']:'${id}'`, limit: 1,
  });
  return s.data.length > 0 ? s.data[0].id : null;
}

// -------------------------------------------------------------------
// Verifizierungs-Token: base64url("userId|email|ablauf").hmac
// Schluessel: aus dem Service-Role-Key abgeleitet (nur der Server kennt ihn).
// Gebunden an Nutzer UND Adresse — aendert sich die Adresse, ist der Link tot.
// -------------------------------------------------------------------
export const VERIFY_GUELTIG_S = 7 * 24 * 3600;

const b64u = (b: Uint8Array) =>
  btoa(String.fromCharCode(...b)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const vonB64u = (s: string) => {
  const t = s.replace(/-/g, "+").replace(/_/g, "/");
  return atob(t + "===".slice((t.length + 3) % 4));
};

async function hmac(geheim: string, daten: string): Promise<string> {
  const k = await crypto.subtle.importKey("raw", new TextEncoder().encode("mail-verifizieren|" + geheim),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64u(new Uint8Array(await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(daten))));
}

function gleich(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

export async function verifyToken(geheim: string, userId: string, email: string, jetztS = Math.floor(Date.now() / 1000)): Promise<string> {
  const nutz = `${userId}|${email.trim().toLowerCase()}|${jetztS + VERIFY_GUELTIG_S}`;
  return `${b64u(new TextEncoder().encode(nutz))}.${await hmac(geheim, nutz)}`;
}

export async function pruefeVerifyToken(geheim: string, token: string, jetztS = Math.floor(Date.now() / 1000)):
  Promise<{ ok: true; userId: string; email: string } | { ok: false; grund: string }> {
  const [teil, sig] = String(token ?? "").split(".");
  if (!teil || !sig || teil.length > 400) return { ok: false, grund: "format" };
  let nutz: string;
  try { nutz = vonB64u(teil); } catch { return { ok: false, grund: "format" }; }
  if (!gleich(await hmac(geheim, nutz), sig)) return { ok: false, grund: "signatur" };
  const [userId, email, ablauf] = nutz.split("|");
  if (!userId || !email || !ablauf) return { ok: false, grund: "format" };
  if (Number(ablauf) < jetztS) return { ok: false, grund: "abgelaufen" };
  return { ok: true, userId, email };
}
