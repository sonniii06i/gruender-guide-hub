/**
 * Konto ueber Google (oder einen anderen Anbieter) gerade neu entstanden?
 * Messluecke vom 14.11.2026 (Funnel-Pruefung): `signup_completed` feuerte nur
 * im Passwort-Formular auf /auth. Das erste fremde Konto seit Wochen (10.11.,
 * /gruender-chancen -> /preise -> /auth -> "Mit Google registrieren" ->
 * /onboarding abgeschlossen) kam deshalb nie in der Start-Stufe an.
 * Supabase legt das Konto im OAuth-Rueckweg an; der Client sieht nur die
 * Sitzung. Daher: Anbieter != E-Mail und Konto juenger als 10 Minuten =
 * Registrierung. Gleiche Regel wie AnwaltX (558dbe16).
 */
export function istFrischesOAuthKonto(
  user: { id: string; created_at?: string; app_metadata?: { provider?: string } },
  jetzt = Date.now(),
): boolean {
  const provider = user.app_metadata?.provider || "email";
  if (provider === "email" || !user.created_at) return false;
  const alter = jetzt - new Date(user.created_at).getTime();
  return Number.isFinite(alter) && alter >= 0 && alter < 10 * 60 * 1000;
}
