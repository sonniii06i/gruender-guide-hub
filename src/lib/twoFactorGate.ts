// Zweiter Faktor: Entscheidet im Client, ob die aktuelle Session den
// zweiten Faktor noch schuldet.
//
// Hintergrund: Nach signInWithPassword (oder Google-OAuth) liegt die volle
// Session schon im localStorage. Frueher hielt nur ein React-State in
// Auth.tsx den Nutzer auf -- ein Reload oder ein direkter Aufruf von
// /dashboard umging den zweiten Faktor. Diese Pruefung haengt deshalb an der
// Session selbst und nicht an einem Seitenzustand.
//
// Massstab ist der Anmeldezeitpunkt DIESER Session (JWT-Claim `amr`, je
// Methode mit Zeitstempel). verify-2fa-login schreibt danach
// app_metadata.two_factor_verified_at. Liegt der Stempel vor der Anmeldung,
// ist der zweite Faktor fuer diese Session offen.
//
// Achtung: Das ist ein UI-Riegel. Die Datenbank und die Edge Functions
// pruefen den zweiten Faktor (noch) nicht -- dafuer braucht es Supabase-MFA
// (aal2) mit RLS auf auth.jwt()->>'aal'.

export interface GateUser {
  app_metadata?: Record<string, unknown> | null;
  last_sign_in_at?: string | null;
}

/** Liest den spaetesten amr-Zeitstempel (Sekunden) aus einem JWT. */
export function sessionLoginMs(accessToken: string | null | undefined): number | null {
  if (!accessToken) return null;
  const parts = accessToken.split(".");
  if (parts.length < 2) return null;
  try {
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
    const claims = JSON.parse(atob(padded)) as { amr?: Array<{ timestamp?: number }> };
    const stamps = (claims.amr ?? [])
      .map((a) => (typeof a?.timestamp === "number" ? a.timestamp : NaN))
      .filter((t) => Number.isFinite(t));
    if (!stamps.length) return null;
    return Math.max(...stamps) * 1000;
  } catch {
    return null;
  }
}

const zeit = (raw: unknown): number => (typeof raw === "string" ? Date.parse(raw) : NaN);

/**
 * true, wenn der Nutzer 2FA aktiv hat und diese Session den zweiten Faktor
 * noch nicht bestaetigt hat.
 *
 * `aktiviertAm` ist user_two_factor.confirmed_at (Serverzeit, aus
 * check-2fa-status). Eine Session, die VOR der Aktivierung begonnen hat,
 * schuldet keinen zweiten Faktor: Sie ist die Session, in der der Nutzer 2FA
 * gerade mit einem gueltigen Code eingeschaltet hat (verify-2fa setzt nur
 * two_factor_enabled, nicht two_factor_verified_at). Ohne diese Regel fragte
 * der Riegel direkt nach dem Einschalten -- beim naechsten Token-Refresh oder
 * Reload -- erneut nach dem Code. Jede Anmeldung NACH der Aktivierung muss
 * weiterhin durch den zweiten Faktor.
 */
export function needsSecondFactor(
  user: GateUser | null | undefined,
  accessToken?: string | null,
  aktiviertAm?: string | null,
): boolean {
  if (!user) return false;
  const meta = user.app_metadata ?? {};
  if (!meta.two_factor_enabled) return false;

  const login =
    sessionLoginMs(accessToken) ??
    (user.last_sign_in_at ? Date.parse(user.last_sign_in_at) : NaN);
  // Ohne bekannten Anmeldezeitpunkt lieber nachfragen als durchwinken.
  if (!Number.isFinite(login)) return true;

  const verified = zeit(meta.two_factor_verified_at);
  if (Number.isFinite(verified) && verified >= login) return false;

  const aktiviert = zeit(aktiviertAm);
  if (Number.isFinite(aktiviert) && aktiviert >= login) return false;

  return true;
}
