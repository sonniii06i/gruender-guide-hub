// ===================================================================
// gruendungspaketTexte.ts — Single Source of Truth für Preis und
// Rechtstexte des Gründungspakets (Freigabe #5, 26.10.2026).
//
// Ohne Imports und ohne Deno-APIs, damit dieselbe Datei in den Edge
// Functions (paket-checkout, paket-download) UND im Frontend
// (src/pages/Gruendungspaket.tsx) gilt: Was der Käufer anklickt, steht
// wortgleich in Stripe-Metadaten, Rechnung und Bestätigungsmail.
//
// Widerruf: Digitale Inhalte ohne Datenträger, § 356 Abs. 6 Nr. 2 BGB —
// das Widerrufsrecht erlischt erst, wenn (a) mit der Erfüllung begonnen
// wurde, (b) der Verbraucher ausdrücklich zugestimmt hat, (c) seine
// Kenntnis vom Erlöschen bestätigt hat und (d) eine Bestätigung nach
// § 312f BGB erhalten hat. (b) und (c) sind die beiden Häkchen auf der
// Seite, (d) ist die Bestätigungsmail aus paket-download.
// ===================================================================

export const PAKET_PRODUKT = "gruendungspaket";
export const PAKET_NAME = "GründerX Gründungspaket 2026";
export const PAKET_VERSION = "2026-10-26";
/** Brutto in Cent, inkl. 19 % USt. */
export const PAKET_PREIS_CENT = 2900;
export const PAKET_UST_SATZ = 19;
/** Stripe-Preis wird über diesen lookup_key gefunden bzw. angelegt. */
export const PAKET_LOOKUP_KEY = "gruendungspaket_2026_2900";
/** So lange darf ein Käufer über seine Session neue Download-Links holen. */
export const PAKET_ABRUF_TAGE = 90;
/** Gültigkeit eines einzelnen signierten Download-Links. */
export const PAKET_LINK_STUNDEN = 72;

export const ZUSTIMMUNG_TEXT =
  "Ich stimme ausdrücklich zu, dass GründerX vor Ablauf der Widerrufsfrist mit der Bereitstellung des " +
  "Gründungspakets (Download) beginnt.";
export const KENNTNIS_TEXT =
  "Mir ist bekannt, dass ich mit Beginn der Bereitstellung mein Widerrufsrecht verliere (§ 356 Abs. 6 Nr. 2 BGB).";

/** Kurzfassung fürs Stripe-Feld custom_text.submit (max. 1.200 Zeichen). */
export const CHECKOUT_HINWEIS =
  "Einmalzahlung, kein Abo. Download direkt nach der Zahlung. Du hast zugestimmt, dass wir sofort liefern, " +
  "und bestätigt, dass dein Widerrufsrecht damit erlischt. Rechnung kommt per Mail.";

export const PAKET_INHALT_KURZ = [
  "3 Rechnungsvorlagen (Word + PDF): Regelbesteuerung, Kleinunternehmer, Kleinbetrag bis 250 €",
  "Leitfaden E-Rechnung 2025–2028 (PDF + Word)",
  "4 Checklisten (PDF + Word): Gewerbeanmeldung, Fragebogen zur steuerlichen Erfassung, ELSTER-Zugang, USt-IdNr.",
  "Gründer-Tracker (Excel): Rechnungsausgang, Kleinunternehmer-Grenzen, Fristen",
  "Übersicht mit allen amtlichen Quellen, Stand 26.10.2026",
];

export const preisText = (cent = PAKET_PREIS_CENT) =>
  (cent / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });
