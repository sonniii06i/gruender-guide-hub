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

export const CART_VARIANTS = ["gruenderx", "gruenderx-year"] as const;
export type CartVariant = (typeof CART_VARIANTS)[number];

export const isCartVariant = (v: string | null | undefined): v is CartVariant =>
  !!v && (CART_VARIANTS as readonly string[]).includes(v);

/**
 * Founder-Set (bundle/bundle-year) seit 20.11.2026 eingestellt. Alte Links
 * (?variant=bundle, Warenkorb-Abbruch-Mails) und gemerkte Warenkörbe landen
 * still beim GründerX-Zugang mit derselben Laufzeit, statt ins Leere zu laufen.
 */
const ALT_VARIANTEN: Record<string, CartVariant> = { bundle: "gruenderx", "bundle-year": "gruenderx-year" };

export const normalizeCartVariant = (v: string | null | undefined): CartVariant | null => {
  if (isCartVariant(v)) return v;
  return (v && ALT_VARIANTEN[v]) || null;
};

export const rememberCartVariant = (variantId: string) => {
  const v = normalizeCartVariant(variantId);
  if (!v) return;
  try {
    sessionStorage.setItem(KEY, v);
  } catch {
    /* Private Mode o. Ä. — dann bleibt es beim Standard auf /checkout. */
  }
};

export const readCartVariant = (): CartVariant | null => {
  try {
    return normalizeCartVariant(sessionStorage.getItem(KEY));
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
