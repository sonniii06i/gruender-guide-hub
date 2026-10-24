/**
 * Läuft die Seite gerade im Build-Prerender (scripts/prerender.mjs)?
 *
 * Das Skript setzt `window.__PRERENDER__ = true`, bevor die App startet. Alles,
 * was erst nach dem Mount aus Browserzustand entsteht (localStorage, Breite …),
 * darf im Prerender NICHT ins HTML geraten: Beim Hydrieren rendert der Client
 * zuerst ohne diesen Zustand, und jede Abweichung lässt React die ganze Seite
 * verwerfen und neu aufbauen (Minified React error #418/#423).
 */
export function isPrerender(): boolean {
  return typeof window !== "undefined" && (window as { __PRERENDER__?: boolean }).__PRERENDER__ === true;
}
