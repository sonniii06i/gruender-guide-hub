// Automatisierte Aufrufe, die der Trichter nicht zählen darf (gemeinsam für
// page_views und analytics_events, Schwester von AnwaltX src/utils/botFilter.ts).
//
// „moto g power (2022)“ ist der feste Lighthouse-Handy-UA von PageSpeed Insights.
// Unser eigener SEO-Wächter ruft damit täglich URLs ab; das waren rund ein Drittel
// der gezählten Besucher im Oktober (Funnel-Prüfung 30.10.2026). page_views speichert
// keinen User-Agent, der HQ-Sammler kann das nachträglich nicht herausrechnen.
//
// navigator.webdriver und localhost fangen den Prerender im Build: Der lief bisher
// durch useTrackPageview nicht, wohl aber durch track() (rund 135.000 session_start
// in 30 Tagen, fast alle „direct“).

const BOT_UA = /HeadlessChrome|bot|crawl|spider|Lighthouse|moto g power|Shap-User/i;

export function istBotUserAgent(ua: string): boolean {
  return BOT_UA.test(ua);
}

export function istAutomatisierterAufruf(): boolean {
  if (typeof navigator === "undefined" || typeof window === "undefined") return true;
  return (
    navigator.webdriver === true ||
    istBotUserAgent(navigator.userAgent || "") ||
    ["localhost", "127.0.0.1"].includes(window.location.hostname)
  );
}
