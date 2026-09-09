/**
 * Der "Warenkorb" zwischen Produktblock und Kasse.
 *
 * Hintergrund: Wer auf der Startseite eine Ausführung wählt und noch kein Konto
 * hat, wird nach /auth geschickt — und /auth wirft den `price`-Parameter weg
 * und leitet nach /onboarding weiter. Auf /checkout stand die Auswahl dann
 * wieder auf Anfang: Man hatte das Set schon in der Hand und musste sich nach
 * der Registrierung ein zweites Mal entscheiden.
 *
 * Gemerkt wird die VARIANTE, nicht die Stripe-Price-ID: seit es Monats- und
 * Jahreszugänge gibt, teilen sich beide dieselbe Price-ID als Anker, und die
 * Laufzeit ginge sonst verloren.
 *
 * sessionStorage statt localStorage: Die Auswahl soll den Kauf überleben, aber
 * nicht die nächste Sitzung — sonst legt ein Besuch von vor drei Wochen
 * ungefragt fest, was heute im Warenkorb liegt.
 */
const KEY = "gx_cart_variant";

export const CART_VARIANTS = ["gruenderx", "gruenderx-year", "bundle", "bundle-year"] as const;
export type CartVariant = (typeof CART_VARIANTS)[number];

const isKnown = (v: string): v is CartVariant => (CART_VARIANTS as readonly string[]).includes(v);

export const rememberCartVariant = (variantId: string) => {
  if (!isKnown(variantId)) return;
  try {
    sessionStorage.setItem(KEY, variantId);
  } catch {
    /* Private Mode o. Ä. — dann bleibt es beim Standard auf /checkout. */
  }
};

export const readCartVariant = (): CartVariant | null => {
  try {
    const v = sessionStorage.getItem(KEY);
    return v && isKnown(v) ? v : null;
  } catch {
    return null;
  }
};

export const clearCartVariant = () => {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* egal */
  }
};
