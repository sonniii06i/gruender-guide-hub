import { VORLAGEN_GESELLSCHAFT } from "./gesellschaft";
import { VORLAGEN_KAUF } from "./kauf";
import { VORLAGEN_ARBEIT } from "./arbeit";
import { VORLAGEN_DIENSTLEISTUNG } from "./dienstleistung";
import { VORLAGEN_GEHEIMHALTUNG } from "./geheimhaltung";
import { VORLAGEN_MIETE } from "./miete";
import { VORLAGEN_FINANZEN } from "./finanzen";
import { VORLAGEN_ECOMMERCE } from "./ecommerce";
import { VORLAGEN_VERWALTUNG } from "./verwaltung";
import { VORLAGEN_KATEGORIEN, type Vorlage, type VorlagenKategorie } from "./types";

// Reihenfolge = Reihenfolge der Kategorien auf /vorlagen.
export const VORLAGEN: Vorlage[] = [
  ...VORLAGEN_GESELLSCHAFT,
  ...VORLAGEN_KAUF,
  ...VORLAGEN_ARBEIT,
  ...VORLAGEN_DIENSTLEISTUNG,
  ...VORLAGEN_GEHEIMHALTUNG,
  ...VORLAGEN_MIETE,
  ...VORLAGEN_FINANZEN,
  ...VORLAGEN_ECOMMERCE,
  ...VORLAGEN_VERWALTUNG,
];

export const VORLAGE_BY_SLUG: Record<string, Vorlage> = Object.fromEntries(VORLAGEN.map((v) => [v.slug, v]));

export const VORLAGEN_JE_KATEGORIE: Record<VorlagenKategorie, Vorlage[]> = Object.fromEntries(
  VORLAGEN_KATEGORIEN.map((k) => [k.key, VORLAGEN.filter((v) => v.kategorie === k.key)]),
) as Record<VorlagenKategorie, Vorlage[]>;

export const KATEGORIE_BY_KEY: Record<string, (typeof VORLAGEN_KATEGORIEN)[number]> = Object.fromEntries(
  VORLAGEN_KATEGORIEN.map((k) => [k.key, k]),
);

export { VORLAGEN_KATEGORIEN, VORLAGEN_HINWEIS, VORLAGEN_SLUG_RE } from "./types";
export type { Vorlage, VorlagenKategorie, VorlagenKategorieInfo } from "./types";
