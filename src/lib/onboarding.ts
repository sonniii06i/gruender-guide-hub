/**
 * Onboarding: Reihenfolge, Auswahl-Optionen und Prüfungen. Reine Logik, damit
 * die Seite (pages/Onboarding.tsx) nur noch anzeigt und speichert.
 *
 * Die Kennungen der Optionen sind dieselben, die lib/startplan liest: aus den
 * Antworten entsteht direkt der Fahrplan im Cockpit.
 */

import { rechtsformVon } from "@/lib/startplan";

export type OnbSchritt = "name" | "modell" | "phase" | "rechtsform" | "details";

/** Erstes Einrichten: vier kurze Fragen, dann freiwillige Stammdaten. */
export const SCHRITTE_NEU: OnbSchritt[] = ["name", "modell", "phase", "rechtsform", "details"];
/** Später ändern (/onboarding?bearbeiten=1): nur was den Fahrplan steuert. */
export const SCHRITTE_AENDERN: OnbSchritt[] = ["modell", "phase", "rechtsform"];

/** Wert für profiles.onboarding_step nach dem Abschluss (wie vor dem Umbau). */
export const SCHRITT_FERTIG = 6;

export interface OnbDaten {
  firstName: string;
  lastName: string;
  ageGroup?: string;
  modelle: string[];
  phase: string;
  rechtsform: string;
}

export const ALTER_OPTIONEN: { id: string; titel: string; text: string }[] = [
  { id: "12-17", titel: "12 bis 17 Jahre", text: "Schule / U18 (wir binden Eltern-Infos & § 112 BGB direkt mit ein)" },
  { id: "18-25", titel: "18 bis 25 Jahre", text: "Studium, Ausbildung oder erster eigener Start" },
  { id: "26-39", titel: "26 bis 39 Jahre", text: "Nebengewerbe, E-Commerce, Creator oder eigene Firma" },
  { id: "40-54", titel: "40 bis 54 Jahre", text: "Neustart, GmbH, Holding oder internationales Setup" },
  { id: "55-70", titel: "55 bis 70+ Jahre", text: "Erfahrung nutzen, Beratung, Freiberuf oder Hinzuverdienst" },
];

export const MODELL_OPTIONEN: { id: string; titel: string; text: string }[] = [
  { id: "amazon_fba", titel: "Amazon FBA / Seller", text: "Verkauf über Amazon, mit oder ohne eigene Marke" },
  { id: "shopify", titel: "Eigener Online-Shop", text: "Shopify oder ein anderes Shop-System" },
  { id: "creator", titel: "Creator / Influencer", text: "Kooperationen, Affiliate, eigene Produkte" },
  { id: "agency", titel: "Agentur / Dienstleistung", text: "Beratung, Freelancing, Projekte für Kunden" },
  { id: "saas", titel: "SaaS / Software", text: "App oder Software als Produkt" },
  { id: "other", titel: "Etwas anderes", text: "Handwerk, Gastro, Handel vor Ort oder noch offen" },
];

export const PHASE_OPTIONEN: { id: string; titel: string; text: string }[] = [
  { id: "idea", titel: "Ich habe eine Idee", text: "Noch nichts angemeldet, ich sortiere mich gerade" },
  { id: "planning", titel: "Ich plane die Gründung", text: "Rechtsform, Finanzen und Förderung stehen an" },
  { id: "ready", titel: "Ich gründe jetzt", text: "Anmeldung, Finanzamt und Geschäftskonto stehen an" },
  { id: "running", titel: "Ich bin schon selbstständig", text: "Steuern, Buchhaltung und der laufende Betrieb" },
];

export const RECHTSFORM_OPTIONEN: { id: string; titel: string; text: string }[] = [
  { id: "unsure", titel: "Noch offen", text: "Der Rechtsform-Wizard hilft beim Vergleich" },
  { id: "einzelunternehmen", titel: "Einzelunternehmen", text: "Allein starten, ohne Stammkapital" },
  { id: "freiberufler", titel: "Freiberufler", text: "Freier Beruf, etwa Beratung, Design oder Text" },
  { id: "gbr", titel: "GbR", text: "Gründung zu zweit oder im Team" },
  { id: "ug", titel: "UG (haftungsbeschränkt)", text: "Ab 1 € Stammkapital" },
  { id: "gmbh", titel: "GmbH", text: "25.000 € Stammkapital" },
  { id: "us_llc", titel: "US LLC", text: "Wyoming, Delaware, New Mexico" },
  { id: "hk_ltd", titel: "HK Limited", text: "Hongkong" },
];

/** Fehlertext für einen Schritt oder null, wenn er vollständig ist. */
export function fehlerIn(schritt: OnbSchritt, d: OnbDaten): string | null {
  switch (schritt) {
    case "name":
      if (!d.firstName.trim()) return "Bitte gib deinen Vornamen ein.";
      if (!d.lastName.trim()) return "Bitte gib deinen Nachnamen ein.";
      return null;
    case "modell":
      return d.modelle.length > 0 ? null : "Bitte wähle mindestens ein Geschäftsmodell.";
    case "phase":
      return PHASE_OPTIONEN.some((p) => p.id === d.phase) ? null : "Bitte wähle, wo du gerade stehst.";
    case "rechtsform":
      return d.rechtsform.trim() ? null : "Bitte wähle eine Rechtsform oder „Noch offen“.";
    case "details":
      return null;
  }
}

/**
 * Wiedereinstieg: der zuletzt gespeicherte Schritt, aber nie hinter eine Frage,
 * die noch unbeantwortet ist (z. B. wenn das Speichern unterwegs fehlschlug).
 */
export function einstieg(d: OnbDaten, gespeichert: number | null | undefined): OnbSchritt {
  const ziel = Math.max(0, Math.min(SCHRITTE_NEU.length - 1, Math.trunc(Number(gespeichert) || 0)));
  for (let i = 0; i < ziel; i++) {
    if (fehlerIn(SCHRITTE_NEU[i], d)) return SCHRITTE_NEU[i];
  }
  return SCHRITTE_NEU[ziel];
}

/**
 * Die Rechtsform aus dem Profil auf eine Auswahl-Kennung bringen. Das Profil
 * erlaubt freien Text ("UG (haftungsbeschränkt)", "Einzelunternehmer"). Was
 * keiner Option entspricht ("AG", "eG"), bleibt als Text erhalten und wird beim
 * Ändern nicht stillschweigend ersetzt.
 */
export function rechtsformOption(wert: string | null | undefined): string {
  const t = (wert ?? "").trim();
  if (!t) return "";
  if (t.toLowerCase() === "unsure") return "unsure";
  return rechtsformVon(t) ?? t;
}
