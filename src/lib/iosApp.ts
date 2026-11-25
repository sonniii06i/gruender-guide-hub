/**
 * Erkennt die native GründerX iOS-App (Capacitor-Hülle mit appendUserAgent "GruenderXApp-iOS/…").
 * Analog zu Arbitragex gilt in der iOS-App die Apple-Regel 3.1.1:
 * Login & volle Nutzung der App-Inhalte, keine In-App-Kaufwege auf externe Checkouts.
 */
export function isGruenderXIosApp(): boolean {
  if (typeof navigator === "undefined") return false;
  return /GruenderXApp-iOS/i.test(navigator.userAgent || "");
}
