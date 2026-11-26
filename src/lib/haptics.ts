/**
 * Sichere Haptik-Bridge für die native GründerX iOS-App (@capacitor/haptics).
 * Im regulären Browser ein lautloser No-Op, auf iOS echtes Taptic-Feedback.
 */

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

/** Dezentes Tick-Feedback beim Tab- oder Seitenwechsel. */
export function hapticSelection(): void {
  try {
    void getHaptics()?.selectionChanged?.();
  } catch {
    /* ignore */
  }
}

/** Leichtes taktiles Feedback beim Abhaken von Aufgaben oder Schritten. */
export function hapticLight(): void {
  try {
    void getHaptics()?.impact?.({ style: "LIGHT" });
  } catch {
    /* ignore */
  }
}

/** Klares Erfolgs-Feedback bei abgeschlossener Lektion oder richtigem Kurz-Check. */
export function hapticSuccess(): void {
  try {
    void getHaptics()?.notification?.({ type: "SUCCESS" });
  } catch {
    /* ignore */
  }
}
