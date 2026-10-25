// Echte App-Screenshots (aufgenommen 25.10.2026 lokal mit Testzugang, persönliche
// Angaben ausgeblendet; Beispieldaten in Rechner und Rechnung). Rohbilder liegen
// gitignored in .screens-raw/, erzeugt mit magick (Rahmen 2850×1550 → 1600/720 px,
// Ausschnitte → 1000/520 px). Test screenshots.test.ts prüft, dass jede Datei existiert.

export interface Screenshot {
  gross: string;
  klein: string;
  breite: number;
  hoehe: number;
  alt: string;
  /** Pfad in der App, erscheint in der Adresszeile des Rahmens. */
  pfad: string;
  /** Hochformat-Ausschnitt fürs Handy (lesbar statt verkleinerter Desktop-Ansicht). */
  mobil?: { src: string; breite: number; hoehe: number };
}

const S = "/screens/2026-10b";

const MOBIL: Record<string, [number, number]> = {
  dashboard: [780, 750], "guide-tiktok": [780, 737], felix: [780, 671], rechnung: [780, 975],
  "fse-wizard": [780, 780], steuerkalender: [780, 754], lucid: [780, 728],
};

const rahmen = (name: string, pfad: string, alt: string): Screenshot => ({
  ...(MOBIL[name] ? { mobil: { src: `${S}/${name}-mobil.webp`, breite: MOBIL[name][0], hoehe: MOBIL[name][1] } } : {}),
  gross: `${S}/${name}.webp`,
  klein: `${S}/${name}-720.webp`,
  breite: 1600,
  hoehe: 870,
  alt,
  pfad,
});

const ausschnitt = (name: string, breite: number, hoehe: number, pfad: string, alt: string): Screenshot => ({
  gross: `${S}/${name}-ausschnitt.webp`,
  klein: `${S}/${name}-ausschnitt-520.webp`,
  breite,
  hoehe,
  alt,
  pfad,
});

export const SCREENS = {
  dashboard: rahmen("dashboard", "/dashboard", "GründerX-Cockpit: laufende Guides, Termine der nächsten 14 Tage und Werkzeuge in der Seitenleiste"),
  fse: rahmen("fse-wizard", "/cockpit/fse-wizard", "Begleiter zum Fragebogen zur steuerlichen Erfassung mit allen ELSTER-Teilseiten in Reihenfolge"),
  steuerkalender: rahmen("steuerkalender", "/cockpit/steuerkalender", "Persönlicher Steuerkalender mit allen Abgabe- und Zahlungsterminen der nächsten 12 Monate"),
  guideTiktok: rahmen("guide-tiktok", "/playbook/preview/tiktok-shop-starten", "Guide „TikTok Shop starten“: Aufwand, Schritte und Kosten auf einen Blick"),
  gewerbe: rahmen("gewerbeanmeldung", "/cockpit/gewerbeanmeldung-wizard", "Gewerbeanmeldung-Wizard, der Schritt für Schritt zum ausgefüllten GewA1 führt"),
  felix: rahmen("felix", "/felix", "Felix, der KI-Co-Pilot von GründerX, mit Beispielfragen"),
  lucid: rahmen("lucid", "/cockpit/lucid-wizard", "Verpackungslizenz-Rechner mit Anbieter-Empfehlung für LUCID"),
  schwellen: rahmen("schwellen", "/cockpit/schwellen-check", "Schwellen-Check: alle Freibeträge und Meldegrenzen für Nebeneinkünfte"),
  shopProfit: rahmen("shop-profit", "/cockpit/shop-profit-rechner", "Shop-Profit-Rechner für die Marge im eigenen Onlineshop"),
  rechnung: rahmen("rechnung", "/cockpit/rechnungs-generator", "Rechnungs-Generator mit Live-Check der Pflichtangaben"),

  ausKalender: ausschnitt("steuerkalender", 1000, 1108, "/cockpit/steuerkalender", "Ausschnitt Steuerkalender: nächste Termine mit Hinweisen zur eigenen Situation"),
  ausRechnung: ausschnitt("rechnung", 1000, 387, "/cockpit/rechnungs-generator", "Ausschnitt Rechnungs-Generator: Umsatzsteuer-Modus und Rechnungssumme (Beispieldaten)"),
  ausTiktok: ausschnitt("tiktok-check", 1000, 1007, "/tiktok-shop-checkliste", "Ergebnis der TikTok-Shop-Checkliste mit den Anmeldungen in Reihenfolge"),
  ausPr: ausschnitt("pr-rechner", 1000, 714, "/pr-paket-rechner", "Ergebnis des PR-Paket-Rechners mit Beispielwerten"),
  ausInfluencer: ausschnitt("influencer-check", 1000, 779, "/influencer-steuer-check", "Ergebnis des Influencer-Steuer-Checks: persönlicher Fahrplan"),
  ausLucid: ausschnitt("lucid", 1000, 660, "/cockpit/lucid-wizard", "Ausschnitt LUCID-Wizard: Prüfung der Verpackungspflicht Schritt für Schritt"),
  ausFse: ausschnitt("fse-wizard", 1000, 437, "/cockpit/fse-wizard", "Ausschnitt Fragebogen-Begleiter: Ablauf und die vier verbindlichen Entscheidungen"),
  ausGewerbe: ausschnitt("gewerbeanmeldung", 1000, 764, "/cockpit/gewerbeanmeldung-wizard", "Ausschnitt Gewerbeanmeldung-Wizard: Schritte und Fortschritt"),
} satisfies Record<string, Screenshot>;

export type ScreenKey = keyof typeof SCREENS;

/** Screenshot je Tool-Landing (/tools/:slug); ohne Eintrag greift die Kategorie. */
export const TOOL_SCREEN: Record<string, ScreenKey> = {
  "fse-wizard": "fse",
  "fse-kapitalgesellschaft": "fse",
  "fse-personengesellschaft": "fse",
  steuerkalender: "steuerkalender",
  "frist-kalender": "steuerkalender",
  "gewerbeanmeldung-wizard": "gewerbe",
  "gewerbe-check": "gewerbe",
  "rechnungs-generator": "rechnung",
  "lucid-wizard": "lucid",
  "vergleich-lucid": "lucid",
  "schwellen-check": "schwellen",
  "kleinunternehmer-waechter": "schwellen",
  "shop-profit-rechner": "shopProfit",
  "marge-tracker": "shopProfit",
};

export const KATEGORIE_SCREEN: Record<string, ScreenKey> = {
  starter: "gewerbe",
  rechtsform: "dashboard",
  steuer: "steuerkalender",
  buchhaltung: "rechnung",
  launch: "lucid",
  marken: "dashboard",
  international: "dashboard",
  anbieter: "dashboard",
};

export const screenFuerTool = (slug: string, kategorie?: string): Screenshot =>
  SCREENS[TOOL_SCREEN[slug] ?? (kategorie ? KATEGORIE_SCREEN[kategorie] : undefined) ?? "dashboard"];
