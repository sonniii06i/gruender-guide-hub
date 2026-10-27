// Widerspruchshinweis bei der Erhebung der Mail-Adresse (§ 7 Abs. 3 Nr. 3/4 UWG), Betreiber 27.10.2026:
// Kunden bekommen Infos zu ähnlichen Produkten von GründerX, solange sie nicht widersprechen. Der Hinweis steht
// im Stripe-Checkout (letzter Satz vor dem Bezahlen), in der Kaufbestätigung und in der Datenschutzerklärung.
export const WERBE_HINWEIS =
  "Deine E-Mail-Adresse nutzen wir auch für Infos zu ähnlichen Produkten von GründerX. Du kannst dem jederzeit " +
  "widersprechen, z. B. über den Abmeldelink in jeder Mail, ohne dass andere als die Übermittlungskosten nach den " +
  "Basistarifen entstehen.";

/** Hängt den Hinweis an einen Checkout-Text an (Stripe custom_text, max. 1200 Zeichen). */
export const mitWerbeHinweis = (text: string): string => `${text} ${WERBE_HINWEIS}`.slice(0, 1200);
