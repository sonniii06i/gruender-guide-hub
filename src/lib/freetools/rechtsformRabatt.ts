import type { ErgebnisRabatt } from "./types";
import { PLANS, formatEurCents } from "@/config/pricing";

// Rabatt am Ende des Rechtsform-Tests (Betreiber 12.11.2026): 15 % auf die erste
// Abrechnung, für ALLE, die den Test abschließen. Verkaufsförderung, keine
// Verlosung – kein Zufall, keine E-Mail-Pflicht, keine Frist, kein Streichpreis.
//
// SCHALTER: erst auf true stellen, wenn der Code in Stripe wirklich existiert
// (Konto GründerX): Coupon 15 %, duration „once“, applies_to die beiden
// Abo-Produkte (GründerX, Founder Bundle), Promotion-Code RECHTSFORM15 ohne
// Ablauf und ohne Stückzahl. Die Function aktion-code kann das nicht (Ablauf
// dort Pflicht, höchstens 60 Tage). Solange false: kein Block, kein Hinweis,
// kein FAQ-Eintrag – auch nicht im prerenderten HTML.
//
// Vor dem Umschalten BEDINGUNGEN gegen den echten Coupon lesen: Hier steht nur,
// was dann technisch gilt. Der Coupon hängt am Produkt, nicht am Preis – er
// greift deshalb auch im Jahrestarif (erste Jahresrechnung).
export const RECHTSFORM_RABATT_AKTIV = false;

const CODE = "RECHTSFORM15";
const PROZENT = 15;

export const RECHTSFORM_RABATT: ErgebnisRabatt = {
  code: CODE,
  prozent: PROZENT,
  titel: `${PROZENT} % auf deinen ersten Monat – als Dank fürs Durchspielen`,
  text: "Den Code bekommt jeder, der den Test abschließt. Du brauchst dafür weder eine E-Mail-Adresse noch eine Newsletter-Anmeldung.",
  // Gleiches Ziel und gleiche Parameter wie der bestehende Funnel-Link der Tool-Seite (kein neues Tracking).
  ziel: "/preise?utm_source=tool&utm_medium=generator&utm_campaign=rechtsform-finden",
  zielText: "Zu den Preisen",
  bedingungen: [
    "Gilt für GründerX und das Founder-Set.",
    `Der Rabatt wird einmal abgezogen, von der ersten Rechnung. Im Monatstarif ist das der erste Monat; danach gilt der normale Preis (GründerX ${formatEurCents(PLANS.gruenderx.grossCents)} im Monat). Im Jahrestarif ist es die erste Jahresrechnung.`,
    "Einlösen: Code an der Stripe-Kasse unter „Promo-Code hinzufügen“ eingeben.",
    "Ein Code pro Bestellung – nicht mit anderen Gutscheincodes und nicht mit dem Startangebot „7 Tage für 1 €“ kombinierbar.",
  ],
};

/** Ein Satz für den Erklärtext der Landing (nur bei aktivem Schalter). */
export const RECHTSFORM_RABATT_HINWEIS =
  `Am Ende des Tests bekommst du zusätzlich den Code ${CODE}: ${PROZENT} % auf die erste Rechnung deines GründerX-Zugangs – für alle, die den Test abschließen, ohne E-Mail-Pflicht.`;

/** FAQ-Eintrag der Landing (nur bei aktivem Schalter). */
export const RECHTSFORM_RABATT_FAQ = {
  q: "Bekomme ich einen Rabatt?",
  a: `Ja. Wer den Test bis zum Ergebnis durchspielt, sieht dort den Code ${CODE}: ${PROZENT} % auf die erste Rechnung von GründerX oder dem Founder-Set (im Monatstarif der erste Monat). Der Code ist nicht an eine E-Mail-Adresse oder Newsletter-Anmeldung gebunden, er wird an der Stripe-Kasse eingegeben und ist nicht mit anderen Codes oder dem Startangebot kombinierbar.`,
};
