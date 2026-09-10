// ===================================================================
// Signierte Abmeldelinks.
//
// Die Mailadresse steht im Abmeldelink in der URL. Ohne Signatur koennte
// jeder fremde Adressen austragen -- deshalb haengt an jedem Link eine
// HMAC-SHA256 ueber die Adresse.
//
// Warum hier und nicht in mail-unsubscribe/index.ts: Wer von dort
// importiert, fuehrt dessen Deno.serve() mit aus und startet versehentlich
// einen zweiten Server in der eigenen Funktion.
// ===================================================================

/** HMAC-SHA256 ueber die normalisierte Adresse, hex. */
export async function signEmail(email: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC", key, new TextEncoder().encode(email.trim().toLowerCase()),
  );
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Zeitkonstanter Vergleich — verraet ueber die Laufzeit nichts. */
export function sameSig(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/**
 * Fertiger Abmeldelink. Gibt `undefined` zurueck, wenn kein Secret gesetzt
 * ist -- der Aufrufer muss dann entscheiden, ob er ueberhaupt sendet.
 */
export async function unsubscribeUrl(
  email: string,
  functionsUrl: string,
): Promise<string | undefined> {
  const secret = Deno.env.get("UNSUBSCRIBE_SECRET");
  if (!secret) return undefined;
  const sig = await signEmail(email, secret);
  return `${functionsUrl.replace(/\/+$/, "")}/mail-unsubscribe` +
    `?e=${encodeURIComponent(email.trim().toLowerCase())}&s=${sig}`;
}
