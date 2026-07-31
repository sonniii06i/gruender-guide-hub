// Zentrale IDs und Conversion-Labels für die Werbeplattformen.
//
// GründerX war bis 31.07.2026 für Meta und Google Ads vollständig blind: kein
// Pixel, kein Tag, keine Conversion. Bezahlter Traffic wäre damit nicht
// optimierbar und nicht auswertbar gewesen.
//
// Alles, was eine ID aus einem Werbekonto braucht, steht HIER und nirgendwo
// sonst — sonst findet sie bei der ersten Kontoänderung niemand mehr wieder.
//
// ┌─────────────────────────────────────────────────────────────────────────┐
// │ ZU ERLEDIGEN vor dem Kampagnenstart:                                    │
// │  1. Meta Business Manager → Pixel für gruenderx.de anlegen → ID unten   │
// │  2. Google Ads → neues Konto → Conversion-ID (AW-…) unten eintragen     │
// │  3. Conversions „signup", „activation", „purchase" anlegen → Labels     │
// │ Solange die Werte leer sind, wird schlicht nichts gesendet.             │
// └─────────────────────────────────────────────────────────────────────────┘

export const META_PIXEL_ID = "";
export const GOOGLE_ADS_ID = "";

/** Die vier Stufen der Event-Leiter aus dem Kampagnen-Steuerpult. */
export type AdConversion = "tool_result" | "signup" | "activation" | "purchase";

/**
 * Conversion-Labels aus Google Ads.
 *
 * Zu finden unter: Google Ads → Ziele → Conversions → <Aktion> → „Tag
 * einrichten" → „Tag selbst hinzufügen". Dort steht
 * `send_to: 'AW-XXXXXXXXX/AbCdEfGhIjKlMnOp'` — der Teil NACH dem Schrägstrich
 * gehört hier rein.
 */
export const GOOGLE_ADS_LABELS: Record<AdConversion, string> = {
  signup: "",
  activation: "",
  purchase: "",
  tool_result: "",
};

/**
 * Standardwerte je Conversion in Euro.
 *
 * `signup` ist bewusst nicht 0: eine Conversion ohne Wert schließt wertbasiertes
 * Bieten dauerhaft aus. 5 € entspricht 49,99 € × ~10 % erwarteter Kaufquote.
 */
export const AD_CONVERSION_VALUES: Record<AdConversion, number> = {
  tool_result: 2,
  signup: 5,
  activation: 12,
  purchase: 49.99,
};
