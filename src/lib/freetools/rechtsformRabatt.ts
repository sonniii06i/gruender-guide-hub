import type { ErgebnisRabatt } from "./types";
import { FOUNDER_CODE, PLANS, formatEurCents } from "@/config/pricing";

// Rabatt-Hinweis am Ende des Rechtsform-Tests (Betreiber 12.11.2026: Rabatt für
// ALLE, die den Test abschließen – Verkaufsförderung, keine Verlosung, keine
// E-Mail-Pflicht, keine Frist).
//
// Gezeigt wird der vorhandene Code FOUNDER (derselbe wie auf /preise), kein
// eigener Code. Gemessen am 12.11.2026 an der Live-Kasse (Gastweg, GründerX
// monatlich): „FOUNDER – 20 % für einen Monat“, −13,00 €, heute fällig 51,99 €,
// danach 64,99 € pro Monat. In Stripe: Gutschein 20 %, duration „once“, Code
// aktiv, ohne Ablauf, ohne Stückzahl, nicht auf Erstbestellungen beschränkt.
//
// Zum Jahreszugang und zum Founder-Set steht hier bewusst NICHTS: nicht gemessen.
// Wird der Code in Stripe abgeschaltet oder geändert → Schalter auf false.
export const RECHTSFORM_RABATT_AKTIV = true;

const CODE = FOUNDER_CODE.code;
const PROZENT = FOUNDER_CODE.percent;

/** Monatspreis GründerX (brutto, Cent) – einzige Quelle: config/pricing.ts. */
const MONAT_CENTS = PLANS.gruenderx.grossCents;
/** Abzug in Cent, kaufmännisch gerundet (so rechnet auch Stripe: 20 % von 64,99 € = 13,00 €). */
export const rabattAbzugCents = (grossCents: number, prozent: number): number => Math.round((grossCents * prozent) / 100);
/** Betrag der ersten Monatsrechnung mit Code, in Cent. */
export const ERSTER_MONAT_CENTS = MONAT_CENTS - rabattAbzugCents(MONAT_CENTS, PROZENT);

const ERSTER = formatEurCents(ERSTER_MONAT_CENTS);
const NORMAL = formatEurCents(MONAT_CENTS);

export const RECHTSFORM_RABATT: ErgebnisRabatt = {
  code: CODE,
  prozent: PROZENT,
  titel: "Du weißt jetzt, welche Rechtsform passt",
  text: `Mit dem Code ${CODE} zahlst du im Monatszugang von GründerX im ersten Monat ${ERSTER}, danach regulär ${NORMAL} im Monat (${PROZENT} % auf die erste Rechnung). Eine E-Mail-Adresse oder Newsletter-Anmeldung brauchst du dafür nicht.`,
  // Gleiches Ziel und gleiche Parameter wie der bestehende Funnel-Link der Tool-Seite (kein neues Tracking).
  ziel: "/preise?utm_source=tool&utm_medium=generator&utm_campaign=rechtsform-finden",
  zielText: "Zu den Preisen",
  bedingungen: [
    `Gilt im Monatszugang von GründerX für die erste Rechnung: ${ERSTER}. Ab dem zweiten Monat gilt der reguläre Preis von ${NORMAL} im Monat.`,
    "Einlösen: Code an der Stripe-Kasse unter „Promo-Code hinzufügen“ eingeben.",
    "Ein Code pro Bestellung.",
    "Nicht mit dem Startangebot „7 Tage für 1 €“ kombinierbar.",
  ],
};

/** Ein Satz für den Erklärtext der Landing (nur bei aktivem Schalter). */
export const RECHTSFORM_RABATT_HINWEIS =
  `Am Ende des Tests zeigen wir dir außerdem den Code ${CODE}: Damit zahlst du im Monatszugang von GründerX im ersten Monat ${ERSTER}, danach regulär ${NORMAL} – ohne E-Mail-Pflicht.`;

/** FAQ-Eintrag der Landing (nur bei aktivem Schalter). */
export const RECHTSFORM_RABATT_FAQ = {
  q: "Bekomme ich einen Rabatt?",
  a: `Ja. Am Ende des Tests steht der Code ${CODE}: ${PROZENT} % auf die erste Rechnung im Monatszugang von GründerX, also ${ERSTER} im ersten Monat und danach regulär ${NORMAL} im Monat. Du gibst ihn an der Stripe-Kasse unter „Promo-Code hinzufügen“ ein. Er ist nicht an eine E-Mail-Adresse oder Newsletter-Anmeldung gebunden; pro Bestellung gilt ein Code, und mit dem Startangebot „7 Tage für 1 €“ ist er nicht kombinierbar.`,
};
