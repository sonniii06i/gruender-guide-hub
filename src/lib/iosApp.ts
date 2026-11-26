/**
 * Erkennt die native GründerX iOS-App (Capacitor-Hülle mit appendUserAgent "GruenderXApp-iOS/…").
 * Analog zu Arbitragex gilt in der iOS-App die Apple-Regel 3.1.1:
 * Login & volle Nutzung der App-Inhalte, keine In-App-Kaufwege auf externe Checkouts.
 */
export function isGruenderXIosApp(): boolean {
  if (typeof navigator === "undefined") return false;
  return /GruenderXApp-iOS/i.test(navigator.userAgent || "");
}

interface CapacitorStatusBarPlugin {
  setStyle?: (opts: { style: "LIGHT" | "DARK" | "DEFAULT" }) => Promise<void>;
  setOverlaysWebView?: (opts: { overlay: boolean }) => Promise<void>;
}

/**
 * Initialisiert das native iOS-Verhalten einmalig beim Start:
 * - setzt die HTML-Klasse `is-ios-app` für saubere Safe-Area- & Touch-Regeln
 * - stellt die iOS-Statusleiste explizit auf dunkle Schrift (`LIGHT`) auf hellem Kopf
 */
export function initIosApp(): void {
  if (typeof document === "undefined" || !isGruenderXIosApp()) return;
  document.documentElement.classList.add("is-ios-app");
  try {
    const cap = (window as unknown as { Capacitor?: { Plugins?: { StatusBar?: CapacitorStatusBarPlugin } } }).Capacitor;
    void cap?.Plugins?.StatusBar?.setOverlaysWebView?.({ overlay: true });
    void cap?.Plugins?.StatusBar?.setStyle?.({ style: "LIGHT" });
  } catch {
    /* im Browser nicht vorhanden */
  }
}
