// Startangebot „7 Tage für 1 €“ (Betreiber 27.10.2026) – ein Einstieg für
// beide Wege: eingeloggt über create-checkout (Neukunden-Prüfung VOR dem
// Checkout), ohne Konto über den Gast-Checkout (Prüfung danach im Webhook).
import { supabase } from "@/integrations/supabase/client";
import { getStoredAffiliateRef } from "@/utils/affiliate";
import { checkoutAttribution } from "@/utils/checkoutAttribution";
import { startGuestCheckout } from "@/utils/guestCheckout";
import { PLANS } from "@/config/pricing";

export const START_ANGEBOT = {
  tage: 7,
  preisText: "1 €",
  label: "7 Tage für 1 € testen",
  kurz: (folge: string) => `7 Tage für 1 €, danach ${folge}/Monat · jederzeit kündbar · nur für Neukunden`,
} as const;

export type StartErgebnis = "weiter" | "kein_neukunde" | "onboarding";

/** Leitet zu Stripe weiter. Wirft bei technischen Fehlern. */
export async function startAngebotCheckout(eingeloggt: boolean): Promise<StartErgebnis> {
  if (!eingeloggt) {
    await startGuestCheckout("gruenderx", "month", "start1");
    return "weiter";
  }
  const { data, error } = await supabase.functions.invoke("create-checkout", {
    body: {
      priceId: PLANS.gruenderx.priceId, interval: "month", angebot: "start1",
      affiliateRef: getStoredAffiliateRef(), ...checkoutAttribution(),
    },
  });
  if (error) {
    let body: { error?: string; code?: string } = {};
    try { body = await (error as { context?: { json?: () => Promise<typeof body> } })?.context?.json?.() ?? {}; } catch { /* leer */ }
    if (body.code === "kein_neukunde") return "kein_neukunde";
    if (body.error?.includes("Onboarding")) return "onboarding";
    throw new Error(body.error || error.message);
  }
  if (data?.url) { window.location.href = data.url; return "weiter"; }
  throw new Error("Keine Checkout-URL erhalten – bitte erneut versuchen.");
}
