/**
 * „Zuletzt geöffnet“ im Cockpit: merkt sich je Konto die letzten Tool-Routen
 * im localStorage. Reine Bequemlichkeit auf diesem Gerät, wird beim Abmelden
 * mit den übrigen Tool-Daten entfernt (lib/logoutCleanup).
 */
const KEY = (uid: string) => `gx-zuletzt-v1-${uid}`;
const MAX = 8;

/** Nur Tool-Seiten zählen, keine Übersichten oder Konto-Seiten. */
export const istToolPfad = (pfad: string) => /^\/(cockpit|wizard)\/[a-z0-9-]+$/.test(pfad);

export function zuletztGenutzt(uid: string | null | undefined): string[] {
  if (!uid || typeof window === "undefined") return [];
  try {
    const roh = JSON.parse(localStorage.getItem(KEY(uid)) ?? "[]");
    return Array.isArray(roh) ? roh.filter((p): p is string => typeof p === "string" && istToolPfad(p)).slice(0, MAX) : [];
  } catch {
    return [];
  }
}

export function merkeBesuch(uid: string | null | undefined, pfad: string): void {
  if (!uid || typeof window === "undefined" || !istToolPfad(pfad)) return;
  try {
    const liste = [pfad, ...zuletztGenutzt(uid).filter((p) => p !== pfad)].slice(0, MAX);
    localStorage.setItem(KEY(uid), JSON.stringify(liste));
  } catch {
    /* Speicher voll oder gesperrt: dann eben ohne */
  }
}
