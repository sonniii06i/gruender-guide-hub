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
import { attributionValue, checkoutAttribution } from "@/utils/checkoutAttribution";

function cookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  for (const part of document.cookie.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return rest.join("=");
  }
  return undefined;
}

export type GuestProduct = "gruenderx" | "bundle";

/**
 * Rückweg für „Zurück“ im Stripe-Checkout: die Seite, von der der Kauf kam
 * (gleiche Domain, nur Pfad). Vorher landete jeder Abbruch fest auf der
 * US-LLC-Seite – egal woher der Käufer kam (Funnel-Prüfung 27.10.).
 */
export function checkoutReturnPath(): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const ref = document.referrer ? new URL(document.referrer) : null;
    const pfad = ref && ref.origin === window.location.origin ? ref.pathname : window.location.pathname;
    if (!pfad || pfad.startsWith("/auth") || !/^\/[A-Za-z0-9/_-]{0,120}$/.test(pfad)) return undefined;
    return pfad;
  } catch {
    return undefined;
  }
}

/**
 * Startet den Gast-Checkout und leitet zu Stripe weiter.
 * Wirft bei Fehlern, damit die Aufrufstelle einen Hinweis anzeigen kann.
 */
export async function startGuestCheckout(
  product: GuestProduct = "gruenderx",
  interval: "month" | "year" = "month",
  /** "start1" = Startangebot 7 Tage für 1 € (nur GründerX monatlich, nur Neukunden). */
  angebot?: "start1",
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
      ...(angebot ? { angebot } : {}),
      affiliateRef: getStoredAffiliateRef(),
      ...checkoutAttribution(),
      gclid: attributionValue("gclid"),
      fbc: cookie("_fbc"),
      fbp: cookie("_fbp"),
      returnPath: checkoutReturnPath(),
    },
  });

  if (error || !data?.url) {
    throw new Error(error?.message || "Checkout konnte nicht gestartet werden.");
  }

  window.location.href = data.url;
}
