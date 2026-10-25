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
// Tool- und Guide-Zahl als Konstanten (25.10.2026): Der Re-Export aus features.ts/guides.ts
// zog die kompletten Guide-Daten (playbooks.ts, ~250 KB) ins Einstiegs-Paket jeder Seite,
// nur um zwei Zahlen anzuzeigen. src/test/kennzahlen.test.ts prüft, dass sie stimmen.
/** Anzahl der Tools mit eigener Landing (LANDING_TOOLS in features.ts). */
export const TOOL_COUNT = 90;
/** Anzahl der Guides (GUIDE_LANDINGS in guides.ts). */
export const GUIDE_COUNT = 80;

/** Anzahl der Einträge in PROVIDERS (Anbieter-Vergleich). */
export const ANBIETER_ANZAHL = 210;
/** Anzahl der Kategorien im Anbieter-Vergleich. */
export const ANBIETER_KATEGORIEN = 38;
