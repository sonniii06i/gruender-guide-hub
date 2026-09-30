// emailMatch.ts — E-Mail-Abgleich ohne Wildcards.
//
// `.ilike("email", x)` war als "Gross/Klein egal" gemeint, behandelt aber
// `%` und `_` in x als Platzhalter. Eine Adresse wie `a_b@x.de` passte so
// auch auf `aXb@x.de`, und `%@firma.de` (im Local-Part zulaessig) auf jede
// Adresse der Domain — also fremde Abos, Codes oder Affiliate-Konten.
// Der Datenbestand ist nicht durchgaengig kleingeschrieben (Webhooks
// speichern, was der Anbieter meldet), deshalb bleibt der Vergleich
// case-insensitiv, aber mit maskierten Platzhaltern = exakter Treffer.

/** Maskiert \, % und _ fuer ILIKE (Standard-Escape-Zeichen ist \). */
export function ilikeExakt(email: string): string {
  return String(email ?? "").trim().replace(/[\\%_]/g, (c) => `\\${c}`);
}
