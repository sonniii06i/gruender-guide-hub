// Reine Hilfsfunktionen für den BWA-Generator (testbar ohne React).

/**
 * Leitet die Periodenlänge in Monaten aus der Zeitraum-Bezeichnung ab.
 * "Q1 2026" → 3, "H1 2026" / "1. Halbjahr" → 6, "03/2026" / "März 2026" → 1,
 * "2025" / "GJ 2025" / Unbekanntes → 12.
 */
export function periodeMonateAus(zeitraum: string): number {
  const z = (zeitraum || "").trim().toLowerCase();
  if (!z) return 12;
  if (/\bq[1-4]\b|quartal/.test(z)) return 3;
  if (/\bh[12]\b|halbjahr/.test(z)) return 6;
  if (/^(0?[1-9]|1[0-2])\s*[/.-]\s*\d{2,4}$/.test(z)) return 1;
  if (/\b(januar|jan|februar|feb|märz|maerz|mär|april|apr|mai|juni|jun|juli|jul|august|aug|september|sep|sept|oktober|okt|november|nov|dezember|dez)\b/.test(z)) return 1;
  return 12;
}

/** Faktor, mit dem Periodenwerte auf ein Jahr hochgerechnet werden. */
export function annualisierungsFaktor(periodeMonate: number): number {
  const m = Number.isFinite(periodeMonate) && periodeMonate > 0 ? periodeMonate : 12;
  return 12 / m;
}

/**
 * Hex-Farbe → RGB; alpha < 1 mischt die Farbe gegen Weiß (für helle Füllflächen im PDF,
 * jsPDF kennt bei setFillColor keine Transparenz).
 */
export function hexToRgb(hex: string, alpha = 1): [number, number, number] {
  const h = hex.replace("#", "");
  const rgb = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  const a = Math.min(1, Math.max(0, alpha));
  return rgb.map((c) => Math.round(255 - (255 - c) * a)) as [number, number, number];
}
