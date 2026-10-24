import { startTransition, useLayoutEffect, useState } from "react";

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
  return typeof window !== "undefined" && (window as PrerenderWindow).__PRERENDER__ === true;
}

/** Id des JSON-Scripts, das scripts/prerender.mjs in den <head> schreibt. */
export const PRERENDER_DATA_ID = "__prerender_data";

type Daten = Record<string, unknown>;
interface PrerenderWindow {
  __PRERENDER__?: boolean;
  __PRERENDER_DATA__?: Daten;
}

function datenSpeicher(): Daten | null {
  if (typeof window === "undefined") return null;
  const w = window as PrerenderWindow;
  if (w.__PRERENDER_DATA__) return w.__PRERENDER_DATA__;
  const el = typeof document !== "undefined" ? document.getElementById(PRERENDER_DATA_ID) : null;
  if (!el?.textContent) return null;
  try {
    w.__PRERENDER_DATA__ = JSON.parse(el.textContent) as Daten;
  } catch {
    return null;
  }
  return w.__PRERENDER_DATA__;
}

/**
 * Nachgeladene Daten (Supabase), mit denen die Seite prerendert wurde.
 *
 * Komponenten, die ihre Daten im useEffect holen, zeigen im ersten Render
 * sonst einen Lade- oder Leerzustand -- das prerenderte HTML enthält aber die
 * fertige Liste, und die Hydration scheitert. Mit diesem Stand startet der
 * erste Render identisch zum HTML; frisch geladen wird danach wie gewohnt.
 * Ohne prerendertes HTML (normale Client-Navigation) gibt es nichts zurück.
 */
export function prerenderDaten<T>(key: string): T | undefined {
  return datenSpeicher()?.[key] as T | undefined;
}

/** Im Prerender den geladenen Stand für das HTML vormerken (sonst wirkungslos). */
export function prerenderDatenMerken(key: string, wert: unknown): void {
  if (!isPrerender()) return;
  const w = window as PrerenderWindow;
  (w.__PRERENDER_DATA__ ??= {})[key] = wert;
}

/**
 * Wert aus dem Browser (localStorage o. ä.), der im prerenderten HTML nicht
 * stehen kann: Der erste Render nimmt `vorher` (wie der Prerender), der echte
 * Wert folgt direkt nach dem Mount -- ohne Hydration-Abweichung.
 *
 * Als Transition: Trifft das Update eine Suspense-Grenze, die noch hydriert
 * (z. B. ein Lazy-Tool unter einem Context-Provider), wartet React damit, statt
 * die Grenze zu verwerfen und neu zu rendern (Minified React error #421).
 */
export function useBrowserWert<T>(lesen: () => T, vorher: T): [T, (wert: T) => void] {
  const [wert, setWert] = useState<T>(vorher);
  useLayoutEffect(() => {
    const echt = lesen();
    if (!Object.is(echt, vorher)) startTransition(() => setWert(echt));
    // nur beim Mount lesen, wie ein useState-Initialisierer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [wert, setWert];
}
