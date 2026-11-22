import { VAT_RATE } from "@/config/pricing";

// Rechenbasis der Vergleichsseite /vergleich/gruendung-selbst-steuerberater-gruenderx (growth-lp 14.11.2026).
// Eigene Datei, damit Seite und Test dieselben Zahlen nehmen.

export const VERGLEICH_STAND = { text: "14.11.2026", iso: "2026-11-14" };

/**
 * StBVV, Stand 14.11.2026:
 * § 25 Abs. 1: Einnahmenüberschussrechnung 5/10 bis 30/10 einer vollen Gebühr nach Tabelle B, Gegenstandswert mindestens 17.500 €.
 * Anlage 2 (Tabelle B): volle Gebühr bei einem Gegenstandswert bis 17.500 € = 166 €.
 * § 13: Zeitgebühr 16,50 bis 41 € je angefangene Viertelstunde.
 */
export const STBVV = {
  mindestGegenstandswert: 17_500,
  volleGebuehrTabelleBCents: 166_00,
  zehntelVon: 5,
  zehntelBis: 30,
  zeitVonCents: 16_50,
  zeitBisCents: 41_00,
} as const;

const brutto = (cents: number) => Math.round(cents * (1 + VAT_RATE));
export const EUER_HONORAR = {
  nettoVon: (STBVV.volleGebuehrTabelleBCents * STBVV.zehntelVon) / 10,
  nettoBis: (STBVV.volleGebuehrTabelleBCents * STBVV.zehntelBis) / 10,
  get bruttoVon() { return brutto(this.nettoVon); },
  get bruttoBis() { return brutto(this.nettoBis); },
};
