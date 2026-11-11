/**
 * Einbettung auf fremden Websites (11.11.2026, Top-1-Programm): Seiten unter /einbetten/ laufen im iframe
 * anderer Seiten. Dort keine Banner, kein Tracking, keine Werbe-Pixel. Die Pruefung gilt fuer den
 * Seitenaufruf (App rendert seine globalen Elemente einmal), Navigation im iframe aendert das nicht.
 */
export const EINBETTEN_PREFIX = "/einbetten/";

export function istEinbettung(pfad?: string): boolean {
  const p = pfad ?? (typeof window !== "undefined" ? window.location.pathname : "");
  return p.startsWith(EINBETTEN_PREFIX);
}

/** Einzige Seiten, die im fremden iframe laufen dürfen (vercel.json gibt nur diese Pfade zum Einbetten frei). */
export const EINBETT_PFADE = ["/einbetten/verpackungslizenz-rechner"] as const;

export function istErlaubterEinbettPfad(pfad: string): boolean {
  return (EINBETT_PFADE as readonly string[]).includes(pfad.replace(/\/+$/, ""));
}
