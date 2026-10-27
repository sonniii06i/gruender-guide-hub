// Freigabe #65 (27.10.2026): UTM des Besuchs an JEDE Checkout-Session haengen, damit eine Zahlung ihrer Quelle
// (Querverweis einer Schwester-Marke, Kampagne, Creator) zugeordnet werden kann. Der Stripe-Webhook und das
// HQ (zuordnung.py) sehen spaeter weder Cookies noch die URL. Rein und testbar.

export const UTM_FELDER = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "landing"] as const;

const ERLAUBT = /[^A-Za-z0-9 _\-./:]/g;

/** Nur bekannte Felder, Strings, ohne Steuer-/Sonderzeichen, max. 200 Zeichen; landing nur als Pfad. */
export function utmMeta(body: Record<string, unknown> | null | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  for (const k of UTM_FELDER) {
    const roh = body?.[k];
    if (typeof roh !== "string") continue;
    let v = roh.trim().replace(ERLAUBT, "").slice(0, 200);
    if (k === "landing" && !v.startsWith("/")) continue;
    if (k !== "landing") v = v.toLowerCase();
    if (v) out[k] = v;
  }
  return out;
}
