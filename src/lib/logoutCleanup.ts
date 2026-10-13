// Beim Abmelden alle Tool-Daten aus dem Browser entfernen.
//
// Viele Tools speichern Eingaben ohne Nutzerbezug im localStorage -- u. a.
// die Absenderdaten des Rechnungs-Generators mit IBAN und Steuernummer
// (ggh-rechnung-company-v2), Finanzplan, Pitch-Deck, GZ-Bericht,
// Kleinunternehmer-Umsaetze, Marken-Watchlist. Auf einem geteilten oder
// Buero-Rechner sah der naechste Nutzer all das. Frueher loeschte signOut
// nur gx-profile-<id>.
//
// Bewusst eine ERLAUBTLISTE statt einer Loeschliste: Ein neues Tool mit
// eigenem Schluessel wird damit automatisch beim Logout entfernt.

/** Schluessel ohne personenbezogene Inhalte, die einen Logout ueberleben. */
const BEHALTEN: RegExp[] = [
  /^marketing_consent(_decided)?$/, // Cookie-Entscheidung (gilt fuer das Geraet)
  /^gx_(first_touch|anon_id|first_seen|session_id|session_ts|session_started|self_reported_source|retention_fired|week_fired)$/, // anonyme Attribution/Analytics
  /^gx_kauf_gemeldet_/, // Kauf-Meldung nur einmal je Checkout
  /^gruenderx:tool-unlocked:/, // Gratis-Tool bereits genutzt (nur Zeitstempel)
  /^gx-sidebar-zu-v1$/,
  /^ggh-tour-done-v1$/,
  /^theme/i,
];

export function behalteBeimLogout(key: string): boolean {
  return BEHALTEN.some((re) => re.test(key));
}

/** Entfernt alle nicht erlaubten Schluessel aus local- und sessionStorage. */
export function clearUserDataOnLogout(): string[] {
  const entfernt: string[] = [];
  for (const store of [safe(() => window.localStorage), safe(() => window.sessionStorage)]) {
    if (!store) continue;
    try {
      const keys: string[] = [];
      for (let i = 0; i < store.length; i++) {
        const k = store.key(i);
        if (k) keys.push(k);
      }
      for (const k of keys) {
        // Supabase-Auth-Schluessel raeumt supabase.auth.signOut() selbst ab.
        if (/^sb-.*-auth-token/.test(k)) continue;
        if (behalteBeimLogout(k)) continue;
        store.removeItem(k);
        entfernt.push(k);
      }
    } catch {
      /* Storage gesperrt: nichts zu loeschen */
    }
  }
  return entfernt;
}

function safe<T>(fn: () => T): T | null {
  try {
    return fn();
  } catch {
    return null;
  }
}
