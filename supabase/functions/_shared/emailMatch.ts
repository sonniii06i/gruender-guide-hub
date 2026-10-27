// emailMatch.ts — E-Mail-Abgleich ohne Wildcards.
//
// `.ilike("email", x)` war als "Gross/Klein egal" gemeint, behandelt aber
// `%` und `_` in x als Platzhalter. Eine Adresse wie `a_b@x.de` passte so
// auch auf `aXb@x.de`, und `%@firma.de` (im Local-Part zulaessig) auf jede
// Adresse der Domain — also fremde Abos, Codes oder Affiliate-Konten.
// Der Datenbestand ist nicht durchgaengig kleingeschrieben (Webhooks
// speichern, was der Anbieter meldet), deshalb bleibt der Vergleich
// case-insensitiv, aber mit maskierten Platzhaltern = exakter Treffer.

/** Maskiert \, % und _ fuer ILIKE (Standard-Escape-Zeichen ist \).
 *  Abschlusspruefung 27.10.2026: PostgREST macht aus `*` in like/ilike ein `%` -- ein `*` laesst sich
 *  dort nicht maskieren. Adressen mit `*` bekommen deshalb ein Muster, das nie trifft (fail-closed). */
export const NIE_TREFFER = "\u0000kein-treffer\u0000";
export function ilikeExakt(email: string): string {
  const e = String(email ?? "").trim();
  if (e.includes("*")) return NIE_TREFFER;
  return e.replace(/[\\%_]/g, (c) => `\\${c}`);
}
