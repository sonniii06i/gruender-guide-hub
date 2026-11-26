/**
 * Sichere Haptik-Bridge für die native GründerX iOS-App (@capacitor/haptics).
 * Im regulären Browser ein lautloser No-Op, auf iOS echtes Taptic-Feedback
 * (in den App-Einstellungen jederzeit umschaltbar).
 */

const HAPTICS_PREF_KEY = "gx-ios-haptics";

interface CapacitorHapticsPlugin {
  impact?: (options: { style: "LIGHT" | "MEDIUM" | "HEAVY" }) => Promise<void>;
  notification?: (options: { type: "SUCCESS" | "WARNING" | "ERROR" }) => Promise<void>;
  selectionChanged?: () => Promise<void>;
}

function getHaptics(): CapacitorHapticsPlugin | null {
  if (typeof window === "undefined") return null;
  const cap = (window as unknown as { Capacitor?: { Plugins?: { Haptics?: CapacitorHapticsPlugin } } }).Capacitor;
  return cap?.Plugins?.Haptics ?? null;
}

export function isHapticsEnabled(): boolean {
  try {
    return typeof localStorage === "undefined" || localStorage.getItem(HAPTICS_PREF_KEY) !== "off";
  } catch {
    return true;
  }
}

export function setHapticsEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(HAPTICS_PREF_KEY, enabled ? "on" : "off");
  } catch {
    /* ignore */
  }
  if (enabled) {
    try {
      void getHaptics()?.selectionChanged?.();
    } catch {
      /* ignore */
    }
  }
}

/** Dezentes Tick-Feedback beim Tab- oder Seitenwechsel. */
export function hapticSelection(): void {
  if (!isHapticsEnabled()) return;
  try {
    void getHaptics()?.selectionChanged?.();
  } catch {
    /* ignore */
  }
}

/** Leichtes taktiles Feedback beim Abhaken von Aufgaben oder Schritten. */
export function hapticLight(): void {
  if (!isHapticsEnabled()) return;
  try {
    void getHaptics()?.impact?.({ style: "LIGHT" });
  } catch {
    /* ignore */
  }
}

/** Klares Erfolgs-Feedback bei abgeschlossener Lektion oder richtigem Kurz-Check. */
export function hapticSuccess(): void {
  if (!isHapticsEnabled()) return;
  try {
    void getHaptics()?.notification?.({ type: "SUCCESS" });
  } catch {
    /* ignore */
  }
}
