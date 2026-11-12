import { LEXIKON } from "./katalog";
import { LEXIKON_THEMEN, type LexikonBegriff, type LexikonThema } from "./types";

export const LEXIKON_BY_SLUG: Record<string, LexikonBegriff> = Object.fromEntries(LEXIKON.map((b) => [b.slug, b]));

/** Begriffe A–Z (deutsche Sortierung). */
export const LEXIKON_AZ: LexikonBegriff[] = [...LEXIKON].sort((a, b) => a.begriff.localeCompare(b.begriff, "de"));

export const LEXIKON_JE_THEMA: Record<LexikonThema, LexikonBegriff[]> = Object.fromEntries(
  LEXIKON_THEMEN.map((t) => [t.key, LEXIKON_AZ.filter((b) => b.thema === t.key)]),
) as Record<LexikonThema, LexikonBegriff[]>;

export const lexikonPfad = (slug: string): string => `/lexikon/${slug}`;

/** Begriffe, die eine Bestandsseite (z. B. /tools/lucid-wizard) verlinken soll. */
export function lexikonFuerSeite(pfad: string): LexikonBegriff[] {
  return LEXIKON_AZ.filter((b) => b.verlinktVon.includes(pfad));
}

export { LEXIKON } from "./katalog";
export { LEXIKON_THEMEN, LEXIKON_SLUG_RE } from "./types";
export type { LexikonBegriff, LexikonInhalt, LexikonThema } from "./types";
