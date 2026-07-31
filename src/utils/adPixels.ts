// Nachladen der Werbe-Pixel — erst nach Einwilligung, genau einmal.
//
// Bewusst NICHT im <head> der index.html: dort liefen beide Skripte bei jedem
// Besucher an, unabhängig von jeder Einwilligung, und kosteten zusätzlich zwei
// render-blockierende Fremd-Roundtrips auf dem kritischen Pfad — für jeden
// Besucher, der ablehnt, vollständig umsonst.
//
// Solange die IDs in config/tracking.ts leer sind (Werbekonten noch nicht
// angelegt), passiert hier schlicht nichts. Das ist der gewollte Zustand bis
// zum Kampagnenstart, kein Fehler.

import { GOOGLE_ADS_ID, META_PIXEL_ID } from "@/config/tracking";
import { onMarketingConsent } from "@/utils/consent";

// `fbq` wird bewusst NICHT hier deklariert, sondern in adConversions.ts — zwei
// Deklarationen desselben Window-Feldes mit unterschiedlicher Signatur waeren
// ein Typfehler (TS2717). Der Stub unten wird deshalb ueber einen lokalen Cast
// gesetzt statt ueber das globale Interface.
declare global {
  interface Window {
    _fbq?: unknown;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Metas Stub baut sich seine Warteschlange selbst an die Funktion. */
type FbqStub = ((...args: unknown[]) => void) & {
  queue: unknown[];
  push: unknown;
  loaded: boolean;
  version: string;
  callMethod?: (...args: unknown[]) => void;
};

let loaded = false;

function injectScript(src: string): void {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadMetaPixel(): void {
  if (!META_PIXEL_ID || window.fbq) return;

  // Metas offizieller Stub, unverändert bis auf die Formatierung: er legt
  // `fbq` als Warteschlange an, damit Aufrufe zwischen Init und Skript-Ladung
  // nicht verloren gehen.
  const n = function (...args: unknown[]) {
    n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
  } as FbqStub;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  (window as unknown as { fbq: FbqStub }).fbq = n;
  window._fbq = n;

  injectScript("https://connect.facebook.net/en_US/fbevents.js");
  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");
}

function loadGoogleAds(): void {
  if (!GOOGLE_ADS_ID || window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  const gtag = function (...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag = gtag;

  injectScript(`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`);
  gtag("js", new Date());
  // Enhanced Conversions aktiv: Google darf gehashte Nutzerdaten zur Zuordnung
  // verwenden. Ohne dieses Flag verpufft jede spätere `user_data`-Übergabe.
  gtag("config", GOOGLE_ADS_ID, { allow_enhanced_conversions: true });
}

/** Beide Pixel nachladen. Mehrfachaufrufe sind unschädlich. */
export function loadAdPixels(): void {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  loadMetaPixel();
  loadGoogleAds();
}

/**
 * Einmal beim App-Start aufrufen: lädt sofort, falls die Einwilligung aus einem
 * früheren Besuch schon vorliegt, und sonst in dem Moment, in dem sie erteilt wird.
 */
export function initAdPixels(): void {
  onMarketingConsent((granted) => {
    if (granted) loadAdPixels();
  });
}
