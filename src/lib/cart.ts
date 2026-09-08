import { STRIPE_PRICES } from "@/lib/stripe";

/**
 * Der "Warenkorb" zwischen Produktblock und Kasse.
 *
 * Hintergrund: Wer auf der Startseite das Founder-Set wählt und noch kein Konto
 * hat, wird nach /auth geschickt — und /auth wirft den `price`-Parameter weg
 * und leitet nach /onboarding weiter. Auf /checkout stand die Auswahl dann
 * wieder auf Anfang: Man hatte das Set schon in der Hand und musste sich nach
 * der Registrierung ein zweites Mal entscheiden.
 *
 * sessionStorage statt localStorage: Die Auswahl soll den Kauf überleben, aber
 * nicht die nächste Sitzung — sonst legt ein Besuch von vor drei Wochen
 * ungefragt fest, was heute im Warenkorb liegt.
 */
const KEY = "gx_cart_price";

const KNOWN: string[] = [STRIPE_PRICES.gruenderx, STRIPE_PRICES.bundle];

export const rememberCartPrice = (priceId: string) => {
  if (!KNOWN.includes(priceId)) return;
  try {
    sessionStorage.setItem(KEY, priceId);
  } catch {
    /* Private Mode o. Ä. — dann bleibt es beim Standard auf /checkout. */
  }
};

export const readCartPrice = (): string | null => {
  try {
    const v = sessionStorage.getItem(KEY);
    return v && KNOWN.includes(v) ? v : null;
  } catch {
    return null;
  }
};

export const clearCartPrice = () => {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* egal */
  }
};
