// ===================================================================
// paketToken.ts — signierter, ablaufender Download-Link fürs
// Gründungspaket.
//
// Token = HMAC-SHA256 über "paket|<session_id>|<ablauf>" (ablauf in
// Unix-Sekunden). Eigenes Präfix, damit ein Abmelde- oder Vorlagen-Link
// nie als Download-Link durchgeht, auch wenn notfalls dasselbe Secret
// genutzt wird. paket-download prüft danach zusätzlich live bei Stripe,
// dass die Session bezahlt und nicht erstattet ist — die Signatur allein
// liefert nichts aus.
//
// Ohne Deno.serve(): Wer von hier importiert, startet keinen Server.
// ===================================================================

import { sameSig } from "./unsubscribe.ts";

export const SESSION_RE = /^cs_(test|live)_[A-Za-z0-9]{10,200}$/;

export function paketSecret(): string | undefined {
  return Deno.env.get("PAKET_SECRET") || Deno.env.get("UNSUBSCRIBE_SECRET") || undefined;
}

export async function signierePaket(sessionId: string, ablauf: number, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`paket|${sessionId}|${ablauf}`));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** true nur bei gültiger Session-Form, nicht abgelaufen und passender Signatur. */
export async function paketLinkGueltig(
  sessionId: string, ablauf: number, sig: string, secret: string, jetzt = Date.now(),
): Promise<boolean> {
  if (!SESSION_RE.test(sessionId)) return false;
  if (!Number.isFinite(ablauf) || ablauf * 1000 < jetzt) return false;
  if (!/^[0-9a-f]{64}$/.test(sig)) return false;
  return sameSig(sig, await signierePaket(sessionId, ablauf, secret));
}

export function downloadLink(functionsUrl: string, sessionId: string, ablauf: number, sig: string): string {
  return `${functionsUrl.replace(/\/+$/, "")}/paket-download?s=${encodeURIComponent(sessionId)}&x=${ablauf}&sig=${sig}`;
}
