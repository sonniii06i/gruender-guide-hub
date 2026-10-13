// CSV-Export ohne Formel-Injektion (OWASP "CSV Injection").
//
// Excel/LibreOffice werten Zellen, die mit = + - @ Tab oder CR beginnen, als
// Formel aus. Nutzer- oder Fremdtexte (Profilfelder, Verwendungszwecke aus
// Kontoauszuegen, Asset-Namen aus Boersen-CSVs) koennten so z. B.
// =HYPERLINK(...) oder DDE-Aufrufe einschleusen. Solche Werte bekommen ein
// fuehrendes Apostroph. Reine Zahlen ("-12,50", "+3.5") bleiben unveraendert.

const FORMEL_START = /^[=+\-@\t\r]/;
const ZAHL = /^[+-]?\d[\d.,]*$/;

export function neutralizeCsvFormula(value: unknown): string {
  const s = String(value ?? "");
  if (FORMEL_START.test(s) && !ZAHL.test(s)) return `'${s}`;
  return s;
}

/** Zelle neutralisieren und in Anfuehrungszeichen setzen. */
export function csvCell(value: unknown): string {
  return `"${neutralizeCsvFormula(value).replace(/"/g, '""')}"`;
}
