import { BUERO } from "./katalog";
import preiseRoh from "./preise.json";
import type { BueroAngebot, BueroPreise, BueroSeite } from "./types";

export const BUERO_BY_SLUG: Record<string, BueroSeite> = Object.fromEntries(BUERO.map((s) => [s.slug, s]));

export const bueroPfad = (slug: string): string => `/buero/${slug}`;

export const BUERO_PREISE = preiseRoh as BueroPreise;

/** Angebote zu einer EAN, günstigstes zuerst. Leer, wenn kein Partnerhändler das Gerät am Stand-Tag lieferbar führte. */
export function bueroAngebote(ean: string): BueroAngebot[] {
  return [...(BUERO_PREISE.produkte[ean]?.angebote ?? [])].sort((a, b) => a.preis - b.preis);
}

export const bueroBild = (ean: string): string | undefined => BUERO_PREISE.produkte[ean]?.bild;

export { BUERO } from "./katalog";
export { BUERO_SLUG_RE } from "./types";
export type { BueroAngebot, BueroInhalt, BueroProdukt, BueroSeite } from "./types";
