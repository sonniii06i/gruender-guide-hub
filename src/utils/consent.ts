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

import { isPrerender } from "@/lib/prerender";

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
  // Prerender: kein Banner ins HTML. `typeof window` allein reicht nicht, der
  // Prerender läuft in echtem Chromium -- das Banner stand deshalb in jeder
  // vorgerenderten Seite und brach die Hydration (React #418, gemessen 10/2026).
  if (typeof window === "undefined" || isPrerender()) return true;
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

// ---------------------------------------------------------------------------
// Widerruf (Art. 7 Abs. 3 DSGVO): so einfach wie die Zustimmung.
// ---------------------------------------------------------------------------

/** Event, mit dem Footer/Datenschutz das Banner erneut oeffnen. */
export const OPEN_CONSENT_EVENT = "gx:open-consent";

/** Cookie-Einstellungen (Banner) erneut oeffnen. */
export function openConsentSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}

// Cookies, die Meta-Pixel und Google-Tag setzen.
const MARKETING_COOKIE = /^(_fbp|_fbc|_ga(_.*)?|_gid|_gcl_.*|_gac_.*)$/;

/** Marketing-Cookies auf dieser Domain und der Hauptdomain loeschen. */
export function deleteMarketingCookies(): void {
  if (typeof document === "undefined") return;
  const host = window.location.hostname;
  const teile = host.split(".");
  const domains = ["", host, `.${host}`];
  if (teile.length > 2) domains.push(`.${teile.slice(-2).join(".")}`);
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0]?.trim();
    if (!name || !MARKETING_COOKIE.test(name)) continue;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
}

/**
 * Entscheidung aendern. Wird eine erteilte Einwilligung widerrufen, sind die
 * Pixel schon geladen und lassen sich nicht entladen: Cookies loeschen und die
 * Seite neu laden, danach laeuft nichts mehr.
 */
export function changeMarketingConsent(granted: boolean): void {
  const vorher = hasMarketingConsent();
  setMarketingConsent(granted);
  if (vorher && !granted) {
    deleteMarketingCookies();
    window.location.reload();
  }
}
