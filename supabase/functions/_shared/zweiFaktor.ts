// zweiFaktor.ts — Server-Gegenstück zu src/lib/twoFactorGate.ts.
//
// Vorher setzte nur das Frontend den zweiten Faktor durch. Mit dem Passwort
// allein ließ sich per direktem API-Aufruf alles nutzen (Felix, Guide-Daten,
// Abo-Portal, Kontolöschung). Diese Prüfung bindet die Bestätigung an den
// Anmeldezeitpunkt DIESER Session (JWT-Claim `amr`): Liegt
// app_metadata.two_factor_verified_at vor der Anmeldung, schuldet die Session
// den zweiten Faktor noch.
//
// GRENZE: PostgREST (direkte Tabellenzugriffe) prüft das weiterhin nicht —
// dafür braucht es Supabase-MFA (aal2) mit RLS auf auth.jwt()->>'aal'.

type MetaUser = {
  app_metadata?: Record<string, unknown> | null;
  last_sign_in_at?: string | null;
} | null | undefined;

/** Spätester amr-Zeitstempel (ms) aus einem JWT, oder null. */
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

/** true, wenn der Nutzer 2FA aktiv hat und diese Session sie noch nicht bestätigt hat. */
export function zweiterFaktorOffen(user: MetaUser, accessToken: string | null | undefined): boolean {
  if (!user) return false;
  const meta = user.app_metadata ?? {};
  if (!meta.two_factor_enabled) return false;
  const verifiedRaw = meta.two_factor_verified_at;
  const verified = typeof verifiedRaw === "string" ? Date.parse(verifiedRaw) : NaN;
  if (!Number.isFinite(verified)) return true;
  const login = sessionLoginMs(accessToken) ??
    (user.last_sign_in_at ? Date.parse(user.last_sign_in_at) : NaN);
  if (!Number.isFinite(login)) return true;
  return verified < login;
}

/** Bearer-Token aus dem Request. */
export function bearerToken(req: Request): string {
  const h = req.headers.get("authorization") ?? req.headers.get("Authorization") ?? "";
  return h.replace(/^Bearer\s+/i, "").trim();
}

/** Fertige 403-Antwort für Funktionen, die den zweiten Faktor verlangen. */
export function zweiFaktorAntwort(cors: Record<string, string>): Response {
  return new Response(
    JSON.stringify({ error: "two_factor_required", message: "Bitte zuerst den zweiten Faktor bestätigen." }),
    { status: 403, headers: { ...cors, "Content-Type": "application/json" } },
  );
}
