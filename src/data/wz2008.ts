/**
 * WZ 2008 Klassifikation der Wirtschaftszweige (Top für Solo-Selbstständige)
 *
 * Auswahl der häufigsten Branchenschlüssel beim GewA1-Antrag.
 * Quelle: Statistisches Bundesamt, Klassifikation der Wirtschaftszweige
 * Ausgabe 2008.
 *
 * NICHT vollständig — die amtliche WZ 2008 hat 615 Klassen und 839 Unterklassen (5-stellig).
 * Hier: kuratierte Auswahl für Solo-D2C/Service. Codes und Bezeichnungen am 22.11.2026 gegen das
 * Destatis-Verzeichnis (klassifikation-wz-2008-3100100089004) abgeglichen.
 */

export type WzEntry = {
  code: string;          // z.B. "47.91.1"
  label: string;         // Klartext
  beispiele: string[];   // konkrete Beispiele
  gruppe: WzGruppe;
};

export type WzGruppe =
  | "Handel & Onlinehandel"
  | "IT & Software"
  | "Beratung & Marketing"
  | "Kreativ & Medien"
  | "Bildung & Coaching"
  | "Gesundheit & Beauty"
  | "Handwerk & Bau"
  | "Gastro & Tourismus"
  | "Sonstige Dienstleistungen";

export const WZ_2008: WzEntry[] = [
  // === Handel ===
  { code: "47.91.1", label: "Versand- und Internet-Einzelhandel mit Textilien, Bekleidung, Schuhen und Lederwaren", beispiele: ["Online-Shop für Sportbekleidung", "Versandhandel Schuhe", "Online-Shop Lederwaren/Taschen"], gruppe: "Handel & Onlinehandel" },
  { code: "47.91.9", label: "Sonstiger Versand- und Internet-Einzelhandel", beispiele: ["Online-Shop Elektronik / IT-Hardware", "Naturkosmetik- / NEM-Shop", "Buch-/Antiquariat-Versand", "Multi-Kategorie-Online-Shop", "Amazon-Marketplace / Etsy"], gruppe: "Handel & Onlinehandel" },
  { code: "47.99.1", label: "Einzelhandel vom Lager mit Brennstoffen", beispiele: ["Heizöl-Handel", "Brennholz / Pellets", "Kohle / Koks", "Flüssiggas-Lieferung vom Lager"], gruppe: "Handel & Onlinehandel" },
  { code: "47.99.9", label: "Sonstiger Einzelhandel a. n. g. (nicht in Verkaufsräumen, an Ständen oder auf Märkten)", beispiele: ["Direktverkauf / Haustürverkauf", "Verkaufsautomaten", "Fahrverkauf", "Vertriebspartner-Direktvertrieb"], gruppe: "Handel & Onlinehandel" },
  { code: "46.19.0", label: "Handelsvermittlung von Waren ohne ausgeprägten Schwerpunkt", beispiele: ["B2B-Handelsvertretung für mehrere Branchen", "Großhandels-Vermittlung"], gruppe: "Handel & Onlinehandel" },
  { code: "46.18.9", label: "Handelsvermittlung von sonstigen Waren a. n. g.", beispiele: ["Handelsvertretung mit Branchenschwerpunkt, der in 46.18.1–46.18.7 nicht genannt ist"], gruppe: "Handel & Onlinehandel" },

  // === IT ===
  { code: "62.01.1", label: "Entwicklung und Programmierung von Internetpräsentationen", beispiele: ["Webseiten-Programmierung", "Online-Shop-Umsetzung"], gruppe: "IT & Software" },
  { code: "62.01.9", label: "Sonstige Softwareentwicklung", beispiele: ["Custom Software-Entwicklung", "Web-App-Programmierung", "Mobile-App-Entwicklung"], gruppe: "IT & Software" },
  { code: "62.02.0", label: "Erbringung von Beratungsleistungen auf dem Gebiet der Informationstechnologie", beispiele: ["IT-Beratung", "Cloud-Architektur-Beratung", "DevOps-Consulting"], gruppe: "IT & Software" },
  { code: "62.03.0", label: "Betrieb von Datenverarbeitungseinrichtungen für Dritte", beispiele: ["Managed Hosting", "Server-Administration"], gruppe: "IT & Software" },
  { code: "62.09.0", label: "Erbringung von sonstigen Dienstleistungen der Informationstechnologie", beispiele: ["IT-Schulungen", "Tech-Support", "System-Integration"], gruppe: "IT & Software" },
  { code: "63.11.0", label: "Datenverarbeitung, Hosting", beispiele: ["SaaS-Hosting", "Cloud-Services", "Datenbank-Betrieb"], gruppe: "IT & Software" },
  { code: "63.12.0", label: "Webportale", beispiele: ["Online-Portal-Betrieb", "Vergleichsportal", "Community-Plattform"], gruppe: "IT & Software" },

  // === Beratung & Marketing ===
  { code: "70.22.0", label: "Unternehmensberatung", beispiele: ["Strategie-Beratung", "Business-Coaching B2B", "Restrukturierungs-Beratung"], gruppe: "Beratung & Marketing" },
  { code: "73.11.0", label: "Werbeagenturen", beispiele: ["Online-Marketing-Agentur", "SEO/SEA-Dienstleistung", "Social-Media-Agentur"], gruppe: "Beratung & Marketing" },
  { code: "73.12.0", label: "Vermarktung und Vermittlung von Werbezeiten und Werbeflächen", beispiele: ["Influencer-Vermittlung", "Ad-Network"], gruppe: "Beratung & Marketing" },
  { code: "73.20.0", label: "Markt- und Meinungsforschung", beispiele: ["Customer-Research", "Marktanalysen", "Umfrage-Dienstleistung"], gruppe: "Beratung & Marketing" },
  { code: "74.90.0", label: "Sonstige freiberufliche, wissenschaftliche und technische Tätigkeiten", beispiele: ["Business-Mentoring (nicht §18)", "Gewerbliche Coaching-Tätigkeit"], gruppe: "Beratung & Marketing" },

  // === Kreativ & Medien ===
  { code: "74.10.2", label: "Grafik- und Kommunikationsdesign", beispiele: ["Grafik-Design (gewerblich, ohne §18)", "Logo-Design", "Web-Design gewerblich"], gruppe: "Kreativ & Medien" },
  { code: "74.20.1", label: "Fotografie", beispiele: ["Hochzeitsfotografie", "Produktfotografie", "Event-Fotografie"], gruppe: "Kreativ & Medien" },
  { code: "74.30.1", label: "Übersetzen", beispiele: ["Gewerbliche Übersetzungen (sonst § 18 freiberuflich)", "Übersetzungs-Agentur"], gruppe: "Kreativ & Medien" },
  { code: "74.30.2", label: "Dolmetschen", beispiele: ["Dolmetsch-Agentur", "Gewerbliches Dolmetschen (sonst § 18 freiberuflich)"], gruppe: "Kreativ & Medien" },
  { code: "59.11.0", label: "Herstellung von Filmen, Videofilmen und Fernsehprogrammen", beispiele: ["Video-Produktion", "YouTube-Channel mit Werbe-Einnahmen", "Content-Production"], gruppe: "Kreativ & Medien" },
  { code: "59.20.1", label: "Tonstudios und Herstellung von Hörfunkbeiträgen", beispiele: ["Podcast-Produktion gewerblich", "Audio-Produktion"], gruppe: "Kreativ & Medien" },
  { code: "59.20.3", label: "Verlegen von Musikalien", beispiele: ["Musik-Verlag"], gruppe: "Kreativ & Medien" },

  // === Bildung & Coaching ===
  { code: "85.59.2", label: "Berufliche Erwachsenenbildung", beispiele: ["Business-Kurse (gewerblich)", "Online-Kurse Verkauf", "Skill-Training"], gruppe: "Bildung & Coaching" },
  { code: "85.59.9", label: "Unterricht a. n. g.", beispiele: ["Sprachkurse-Vermittlung", "Sport-Kurse", "Yoga-Studios"], gruppe: "Bildung & Coaching" },
  { code: "85.60.0", label: "Erbringung von Dienstleistungen für den Unterricht", beispiele: ["E-Learning-Plattformen", "Bildungs-Tools-Vermittlung"], gruppe: "Bildung & Coaching" },

  // === Gesundheit & Beauty ===
  { code: "86.90.9", label: "Sonstige selbstständige Tätigkeiten im Gesundheitswesen", beispiele: ["Wellness-Berater", "Ernährungs-Coaching ohne ÖGD", "Mental-Coaching"], gruppe: "Gesundheit & Beauty" },
  { code: "96.02.1", label: "Frisörsalons", beispiele: ["Friseur-Geschäft", "Mobile Hair-Stylisten"], gruppe: "Gesundheit & Beauty" },
  { code: "96.02.2", label: "Kosmetiksalons", beispiele: ["Kosmetikinstitut", "Mobile Kosmetikerin", "Nail-Studio"], gruppe: "Gesundheit & Beauty" },
  { code: "96.04.0", label: "Saunas, Solarien, Bäder u. Ä.", beispiele: ["Wellness-Studio", "Day-Spa", "Massage-Praxis (gewerblich)"], gruppe: "Gesundheit & Beauty" },

  // === Handwerk & Bau ===
  { code: "41.20.1", label: "Bau von Gebäuden (ohne Fertigteilbau)", beispiele: ["Bauunternehmer Wohnungsbau", "Bauunternehmer Gewerbebau"], gruppe: "Handwerk & Bau" },
  { code: "43.21.0", label: "Elektroinstallation", beispiele: ["Elektriker-Betrieb"], gruppe: "Handwerk & Bau" },
  { code: "43.22.0", label: "Gas-, Wasser-, Heizungs- sowie Lüftungs- und Klimainstallation", beispiele: ["Sanitär-Heizung-Betrieb", "Klima-Service"], gruppe: "Handwerk & Bau" },
  { code: "81.21.0", label: "Allgemeine Gebäudereinigung", beispiele: ["Reinigungs-Firma", "Büro-Reinigung"], gruppe: "Handwerk & Bau" },

  // === Gastro & Tourismus ===
  { code: "55.10.1", label: "Hotels (ohne Hotels garnis)", beispiele: ["Hotel-Betrieb mit Restaurant"], gruppe: "Gastro & Tourismus" },
  { code: "55.10.4", label: "Pensionen", beispiele: ["Pension"], gruppe: "Gastro & Tourismus" },
  { code: "55.20.3", label: "Ferienhäuser und Ferienwohnungen", beispiele: ["Airbnb-Vermietung gewerblich (>50 % oder Service)", "Ferienwohnungs-Vermietung"], gruppe: "Gastro & Tourismus" },
  { code: "56.10.1", label: "Restaurants mit herkömmlicher Bedienung", beispiele: ["Restaurant", "Bistro"], gruppe: "Gastro & Tourismus" },
  { code: "56.10.2", label: "Restaurants mit Selbstbedienung", beispiele: ["Selbstbedienungs-Restaurant", "Self-Service-Bistro"], gruppe: "Gastro & Tourismus" },
  { code: "56.10.3", label: "Imbissstuben u. Ä.", beispiele: ["Imbiss", "Food-Truck"], gruppe: "Gastro & Tourismus" },
  { code: "56.10.4", label: "Cafés", beispiele: ["Café"], gruppe: "Gastro & Tourismus" },
  { code: "56.30.3", label: "Bars", beispiele: ["Bar", "Cocktailbar"], gruppe: "Gastro & Tourismus" },
  { code: "79.11.0", label: "Reisebüros", beispiele: ["Online-Reisevermittlung", "Reisebüro"], gruppe: "Gastro & Tourismus" },

  // === Sonstige ===
  { code: "68.20.1", label: "Vermietung, Verpachtung von eigenen oder geleasten Wohngrundstücken, Wohngebäuden und Wohnungen", beispiele: ["Vermietung mehrerer Immobilien (gewerblicher Grundstückshandel)"], gruppe: "Sonstige Dienstleistungen" },
  { code: "77.39.0", label: "Vermietung von sonstigen Maschinen, Geräten und beweglichen Sachen", beispiele: ["Equipment-Verleih", "Werkzeug-Verleih"], gruppe: "Sonstige Dienstleistungen" },
  { code: "78.10.0", label: "Vermittlung von Arbeitskräften", beispiele: ["Personalvermittlung", "Recruiting-Agentur"], gruppe: "Sonstige Dienstleistungen" },
  { code: "82.11.0", label: "Allgemeine Sekretariats- und Schreibdienste", beispiele: ["Virtual-Assistant gewerblich", "Schreib-Service"], gruppe: "Sonstige Dienstleistungen" },
  { code: "82.99.9", label: "Erbringung von anderen wirtschaftlichen Dienstleistungen für Unternehmen und Privatpersonen a. n. g.", beispiele: ["Allgemeine Dienstleistungen B2B", "Bookkeeping-Services (nicht §18)"], gruppe: "Sonstige Dienstleistungen" },
  { code: "93.13.0", label: "Fitnesszentren", beispiele: ["Fitness-Studio", "Personal-Trainer-Studio (gewerblich)"], gruppe: "Sonstige Dienstleistungen" },
  { code: "93.29.0", label: "Erbringung von Dienstleistungen der Unterhaltung und der Erholung a. n. g.", beispiele: ["Event-Planung", "DJ-Service (gewerblich)"], gruppe: "Sonstige Dienstleistungen" },
  { code: "96.09.0", label: "Erbringung von sonstigen Dienstleistungen (anderweitig nicht genannt)", beispiele: ["Mobile Dienstleistungen", "Sonstige persönliche Services"], gruppe: "Sonstige Dienstleistungen" },
];

export const WZ_GRUPPEN: WzGruppe[] = [
  "Handel & Onlinehandel",
  "IT & Software",
  "Beratung & Marketing",
  "Kreativ & Medien",
  "Bildung & Coaching",
  "Gesundheit & Beauty",
  "Handwerk & Bau",
  "Gastro & Tourismus",
  "Sonstige Dienstleistungen",
];
