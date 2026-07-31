// Marketing-Einwilligung — der Schalter, an dem beide Werbe-Pixel hängen.
//
// Schwester von src/utils/consent.ts in AnwaltX, absichtlich identisch: derselbe
// Schlüssel, dieselbe API. Wer eine der beiden Dateien ändert, ändert die andere mit.
//
// Regel: Meta-Pixel und Google-Tag werden erst NACH einer aktiven Zustimmung
// nachgeladen (§ 25 TDDDG, Art. 6 Abs. 1 lit. a DSGVO) — nicht im <head> der
// index.html, wo sie bedingungslos anlaufen würden. Die Zustimmung kommt aus
// genau dieser Datei.
//
// Die reine Produktanalytik (`analytics_events`) ist davon nicht betroffen: sie
// sendet nichts an Dritte und läuft ohne Einwilligung weiter.

const KEY = "marketing_consent";
const DECIDED_KEY = "marketing_consent_decided";

type Listener = (granted: boolean) => void;
const listeners = new Set<Listener>();

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null; // Safari Privatmodus / geblockte Storage
  }
}

function write(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* ohne Storage gilt die Entscheidung nur für diese Sitzung */
  }
}

/** Hat der Nutzer Marketing-Cookies aktiv erlaubt? */
export function hasMarketingConsent(): boolean {
  if (typeof window === "undefined") return false; // Prerender: niemals senden
  return read(KEY) === "true";
}

/**
 * Hat der Nutzer überhaupt schon entschieden? Steuert, ob das Banner erscheint.
 * Bewusst ein eigener Schlüssel: „abgelehnt" und „noch nicht gefragt" müssen
 * unterscheidbar sein, sonst fragt das Banner bei jedem Besuch erneut.
 */
export function hasDecidedConsent(): boolean {
  if (typeof window === "undefined") return true; // Prerender: kein Banner ins HTML
  return read(DECIDED_KEY) === "true";
}

/** Entscheidung speichern und alle Abonnenten benachrichtigen. */
export function setMarketingConsent(granted: boolean): void {
  write(KEY, granted ? "true" : "false");
  write(DECIDED_KEY, "true");
  listeners.forEach((fn) => {
    try {
      fn(granted);
    } catch {
      /* ein defekter Abonnent darf die anderen nicht blockieren */
    }
  });
}

/**
 * Auf Zustimmung reagieren. Gibt die Abmeldefunktion zurück.
 * Wird die Zustimmung bereits gehalten, feuert der Listener sofort — sonst
 * verpassen Abonnenten, die nach der Entscheidung mounten, das Signal.
 */
export function onMarketingConsent(fn: Listener): () => void {
  listeners.add(fn);
  if (hasMarketingConsent()) {
    try {
      fn(true);
    } catch {
      /* egal */
    }
  }
  return () => listeners.delete(fn);
}
