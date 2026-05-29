/**
 * WZ 2008 Klassifikation der Wirtschaftszweige (Top für Solo-Selbstständige)
 *
 * Auswahl der häufigsten Branchenschlüssel beim GewA1-Antrag.
 * Quelle: Statistisches Bundesamt, Klassifikation der Wirtschaftszweige
 * Ausgabe 2008.
 *
 * NICHT vollständig — vollständige Liste hat 615 5-stellige Klassen.
 * Hier: kuratierte Auswahl der ~50 wichtigsten für Solo-D2C/Service.
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
  { code: "46.18.0", label: "Handelsvermittlung von Waren", beispiele: ["B2B-Handelsvertretung", "Großhandels-Vermittlung"], gruppe: "Handel & Onlinehandel" },

  // === IT ===
  { code: "62.01.0", label: "Programmierungstätigkeiten", beispiele: ["Custom Software-Entwicklung", "Web-App-Programmierung", "Mobile-App-Entwicklung"], gruppe: "IT & Software" },
  { code: "62.02.0", label: "Beratungstätigkeiten im Bereich der IT", beispiele: ["IT-Beratung", "Cloud-Architektur-Beratung", "DevOps-Consulting"], gruppe: "IT & Software" },
  { code: "62.03.0", label: "Betrieb von Datenverarbeitungseinrichtungen für Dritte", beispiele: ["Managed Hosting", "Server-Administration"], gruppe: "IT & Software" },
  { code: "62.09.0", label: "Sonstige Tätigkeiten der Informationstechnologie", beispiele: ["IT-Schulungen", "Tech-Support", "System-Integration"], gruppe: "IT & Software" },
  { code: "63.11.0", label: "Datenverarbeitung, Hosting", beispiele: ["SaaS-Hosting", "Cloud-Services", "Datenbank-Betrieb"], gruppe: "IT & Software" },
  { code: "63.12.0", label: "Webportale", beispiele: ["Online-Portal-Betrieb", "Vergleichsportal", "Community-Plattform"], gruppe: "IT & Software" },

  // === Beratung & Marketing ===
  { code: "70.22.0", label: "Unternehmensberatung", beispiele: ["Strategie-Beratung", "Business-Coaching B2B", "Restrukturierungs-Beratung"], gruppe: "Beratung & Marketing" },
  { code: "73.11.0", label: "Werbeagenturen", beispiele: ["Online-Marketing-Agentur", "SEO/SEA-Dienstleistung", "Social-Media-Agentur"], gruppe: "Beratung & Marketing" },
  { code: "73.12.0", label: "Vermarktung und Vermittlung von Werbezeiten und Werbeflächen", beispiele: ["Influencer-Vermittlung", "Ad-Network"], gruppe: "Beratung & Marketing" },
  { code: "73.20.0", label: "Markt- und Meinungsforschung", beispiele: ["Customer-Research", "Marktanalysen", "Umfrage-Dienstleistung"], gruppe: "Beratung & Marketing" },
  { code: "74.90.0", label: "Sonstige freiberufliche, wissenschaftliche und technische Tätigkeiten", beispiele: ["Business-Mentoring (nicht §18)", "Gewerbliche Coaching-Tätigkeit"], gruppe: "Beratung & Marketing" },

  // === Kreativ & Medien ===
  { code: "74.10.0", label: "Ateliers für Textil-, Schmuck-, Grafik- und ähnliches Design", beispiele: ["Grafik-Design (gewerblich, ohne §18)", "Logo-Design", "Web-Design gewerblich"], gruppe: "Kreativ & Medien" },
  { code: "74.20.1", label: "Fotografie", beispiele: ["Hochzeitsfotografie", "Produktfotografie", "Event-Fotografie"], gruppe: "Kreativ & Medien" },
  { code: "74.30.0", label: "Übersetzen und Dolmetschen (gewerblich, sonst §18 freiberuflich)", beispiele: ["Gewerbliche Übersetzungen", "Übersetzungs-Agentur"], gruppe: "Kreativ & Medien" },
  { code: "59.11.0", label: "Herstellung von Filmen, Videofilmen und Fernsehprogrammen", beispiele: ["Video-Produktion", "YouTube-Channel mit Werbe-Einnahmen", "Content-Production"], gruppe: "Kreativ & Medien" },
  { code: "59.20.0", label: "Tonstudios; Herstellung von Hörfunkbeiträgen, Verlegen von Musik", beispiele: ["Podcast-Produktion gewerblich", "Audio-Produktion", "Musik-Verlegen"], gruppe: "Kreativ & Medien" },

  // === Bildung & Coaching ===
  { code: "85.59.1", label: "Berufliche Erwachsenenbildung außerhalb Hochschulen", beispiele: ["Business-Kurse (gewerblich)", "Online-Kurse Verkauf", "Skill-Training"], gruppe: "Bildung & Coaching" },
  { code: "85.59.9", label: "Sonstiger Unterricht (anderweitig nicht genannt)", beispiele: ["Sprachkurse-Vermittlung", "Sport-Kurse", "Yoga-Studios"], gruppe: "Bildung & Coaching" },
  { code: "85.60.0", label: "Erbringung von Dienstleistungen für den Unterricht", beispiele: ["E-Learning-Plattformen", "Bildungs-Tools-Vermittlung"], gruppe: "Bildung & Coaching" },

  // === Gesundheit & Beauty ===
  { code: "86.90.9", label: "Sonstige Tätigkeiten im Gesundheitswesen (ohne Heilkundeerlaubnis)", beispiele: ["Wellness-Berater", "Ernährungs-Coaching ohne ÖGD", "Mental-Coaching"], gruppe: "Gesundheit & Beauty" },
  { code: "96.02.1", label: "Friseursalons", beispiele: ["Friseur-Geschäft", "Mobile Hair-Stylisten"], gruppe: "Gesundheit & Beauty" },
  { code: "96.02.2", label: "Kosmetiksalons", beispiele: ["Kosmetikinstitut", "Mobile Kosmetikerin", "Nail-Studio"], gruppe: "Gesundheit & Beauty" },
  { code: "96.04.0", label: "Bäder, Saunas, Solarien", beispiele: ["Wellness-Studio", "Day-Spa", "Massage-Praxis (gewerblich)"], gruppe: "Gesundheit & Beauty" },

  // === Handwerk & Bau ===
  { code: "41.20.1", label: "Bau von Wohngebäuden", beispiele: ["Bauunternehmer Wohnungsbau"], gruppe: "Handwerk & Bau" },
  { code: "43.21.0", label: "Elektroinstallation", beispiele: ["Elektriker-Betrieb"], gruppe: "Handwerk & Bau" },
  { code: "43.22.0", label: "Gas-, Wasser-, Heizungs- sowie Lüftungs- und Klimainstallation", beispiele: ["Sanitär-Heizung-Betrieb", "Klima-Service"], gruppe: "Handwerk & Bau" },
  { code: "81.21.0", label: "Allgemeine Gebäudereinigung", beispiele: ["Reinigungs-Firma", "Büro-Reinigung"], gruppe: "Handwerk & Bau" },

  // === Gastro & Tourismus ===
  { code: "55.10.0", label: "Hotels, Gasthöfe und Pensionen", beispiele: ["Hotel-Betrieb", "Pension"], gruppe: "Gastro & Tourismus" },
  { code: "55.20.1", label: "Ferienunterkünfte", beispiele: ["Airbnb-Vermietung gewerblich (>50 % oder Service)", "Ferienwohnungs-Vermietung"], gruppe: "Gastro & Tourismus" },
  { code: "56.10.1", label: "Restaurants mit herkömmlicher Bedienung", beispiele: ["Restaurant", "Bistro"], gruppe: "Gastro & Tourismus" },
  { code: "56.10.2", label: "Restaurants mit Selbstbedienung", beispiele: ["Imbiss", "Food-Truck"], gruppe: "Gastro & Tourismus" },
  { code: "56.30.0", label: "Ausschank von Getränken", beispiele: ["Bar", "Café"], gruppe: "Gastro & Tourismus" },
  { code: "79.11.0", label: "Reisebüros", beispiele: ["Online-Reisevermittlung", "Reisebüro"], gruppe: "Gastro & Tourismus" },

  // === Sonstige ===
  { code: "68.20.1", label: "Vermietung und Verpachtung von eigenen Wohngrundstücken (gewerblich)", beispiele: ["Vermietung mehrerer Immobilien (gewerblicher Grundstückshandel)"], gruppe: "Sonstige Dienstleistungen" },
  { code: "77.39.0", label: "Vermietung von sonstigen Maschinen, Geräten und beweglichen Sachen", beispiele: ["Equipment-Verleih", "Werkzeug-Verleih"], gruppe: "Sonstige Dienstleistungen" },
  { code: "78.10.0", label: "Vermittlung von Arbeitskräften", beispiele: ["Personalvermittlung", "Recruiting-Agentur"], gruppe: "Sonstige Dienstleistungen" },
  { code: "82.11.0", label: "Sekretariats- und Schreibdienste", beispiele: ["Virtual-Assistant gewerblich", "Schreib-Service"], gruppe: "Sonstige Dienstleistungen" },
  { code: "82.99.9", label: "Erbringung sonstiger Dienstleistungen für Unternehmen (anderweitig nicht genannt)", beispiele: ["Allgemeine Dienstleistungen B2B", "Bookkeeping-Services (nicht §18)"], gruppe: "Sonstige Dienstleistungen" },
  { code: "93.13.0", label: "Fitnesszentren", beispiele: ["Fitness-Studio", "Personal-Trainer-Studio (gewerblich)"], gruppe: "Sonstige Dienstleistungen" },
  { code: "93.29.9", label: "Erbringung von sonstigen Dienstleistungen der Unterhaltung", beispiele: ["Event-Planung", "DJ-Service (gewerblich)"], gruppe: "Sonstige Dienstleistungen" },
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
