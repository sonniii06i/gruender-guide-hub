// Einstieg in den Checkout OHNE Konto — der Weg, den die Anzeigen nehmen.
//
// Vorher lag zwischen Anzeige und Zahlung eine Registrierung UND ein
// Onboarding. Jedes Pflichtfeld vor dem Preis kostet Conversion, und ein
// Konto, das nie zahlt, ist für eine Kaufkampagne wertlos. Jetzt gilt:
// Anzeige → Stripe → Konto. Die E-Mail und die Rechnungsdaten erhebt Stripe.
//
// WICHTIG: Weiterleitung im SELBEN Tab. `window.open` wird auf Mobilgeräten
// regelmäßig vom Popup-Blocker geschluckt — der Nutzer sieht dann nichts und
// hält die Seite für kaputt.

import { supabase } from "@/integrations/supabase/client";
import { getStoredAffiliateRef } from "@/utils/affiliate";
import { AD_CONVERSION_VALUES } from "@/config/tracking";
import { hasMarketingConsent } from "@/utils/consent";

function cookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  for (const part of document.cookie.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return rest.join("=");
  }
  return undefined;
}

/** Liest einen Wert aus der aktuellen URL oder dem gespeicherten First Touch. */
function attributionValue(key: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  const fromUrl = new URLSearchParams(window.location.search).get(key);
  if (fromUrl) return fromUrl;
  try {
    const raw = localStorage.getItem("gx_first_touch");
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as Record<string, string>;
    return parsed?.[key] || undefined;
  } catch {
    return undefined;
  }
}

export type GuestProduct = "gruenderx" | "bundle";

/**
 * Startet den Gast-Checkout und leitet zu Stripe weiter.
 * Wirft bei Fehlern, damit die Aufrufstelle einen Hinweis anzeigen kann.
 */
export async function startGuestCheckout(
  product: GuestProduct = "gruenderx",
  interval: "month" | "year" = "month",
): Promise<void> {
  // InitiateCheckout VOR dem Netzwerkaufruf: Wer hier abbricht, hat die
  // Kaufabsicht trotzdem gezeigt. Nach der Weiterleitung liefe kein Code mehr.
  if (hasMarketingConsent()) {
    try {
      window.fbq?.("track", "InitiateCheckout", {
        content_name: product,
        value: AD_CONVERSION_VALUES.purchase,
        currency: "EUR",
      });
    } catch {
      /* Tracking darf den Kauf nie blockieren */
    }
  }

  const { data, error } = await supabase.functions.invoke<{ url?: string }>("checkout-guest", {
    body: {
      product,
      interval,
      affiliateRef: getStoredAffiliateRef(),
      utm_source: attributionValue("utm_source"),
      utm_medium: attributionValue("utm_medium"),
      utm_campaign: attributionValue("utm_campaign"),
      utm_content: attributionValue("utm_content"),
      utm_term: attributionValue("utm_term"),
      gclid: attributionValue("gclid"),
      fbc: cookie("_fbc"),
      fbp: cookie("_fbp"),
    },
  });

  if (error || !data?.url) {
    throw new Error(error?.message || "Checkout konnte nicht gestartet werden.");
  }

  window.location.href = data.url;
}
