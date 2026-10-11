/**
 * Eine Quelle für alle Zahlen, mit denen GründerX wirbt.
 *
 * Tool- und Guide-Zahl werden direkt aus den Datenquellen gezählt. Die
 * Anbieter-Zahlen stehen hier als Konstanten, damit die Startseite nicht die
 * komplette Anbieter-Datenbank (data/anbieter.ts) ins Haupt-Bundle zieht;
 * src/test/kennzahlen.test.ts prüft bei jedem Testlauf, dass sie mit
 * PROVIDERS übereinstimmen. Wer Anbieter ergänzt, muss die Zahl hier
 * nachziehen, sonst schlägt der Test fehl.
 */
export { TOOL_COUNT } from "@/data/features";
export { GUIDE_COUNT } from "@/data/guides";

/** Anzahl der Einträge in PROVIDERS (Anbieter-Vergleich). */
export const ANBIETER_ANZAHL = 213;
/** Anzahl der Kategorien im Anbieter-Vergleich. */
export const ANBIETER_KATEGORIEN = 38;
