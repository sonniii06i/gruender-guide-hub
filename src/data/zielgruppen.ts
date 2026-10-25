// Zielgruppen-Landingpages (/influencer, /tiktok-shop) – Betreiber 25.10.2026:
// GründerX viel stärker auf Influencer und TikTok-Shop-Leute ausrichten.
// Jede Zahl ist belegt (Quellen in `quellen`); Preise nur über /preise.

export interface ZielgruppeFreeTool {
  to: string;
  title: string;
  desc: string;
}

export interface Zielgruppe {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  heading: string;
  lead: string;
  urgency: string;
  outcomes: string[];
  wegHeading: string;
  weg: { title: string; description?: string; meta?: string }[];
  freeTools: ZielgruppeFreeTool[];
  tools: { slug: string; title: string; desc: string }[];
  ratgeber: { to: string; title: string; desc: string }[];
  guides: { to: string; title: string; desc: string }[];
  faq: { q: string; a: string }[];
  quellen: { label: string; url: string }[];
  ctaTitle: string;
  ctaText: string;
}

const HESSEN = {
  label: "Finanzamt Hessen: Leitfaden zur Besteuerung von Influencerinnen und Influencern (Juni 2026)",
  url: "https://finanzamt.hessen.de/sites/finanzamt.hessen.de/files/2026-07/leitfaden_zur_besteuerung_von_influencerinnen_und_influencern.pdf",
};
const TT_NEWS = { label: "TikTok Newsroom: Ein Jahr TikTok Shop in Deutschland (24.03.2026)", url: "https://newsroom.tiktok.com/tiktokshop-1-jahr?lang=de-DE" };
const TT_SU = { label: "TikTok Seller University: Registrierung als Einzelunternehmer", url: "https://seller-de.tiktok.com/university/essay?knowledge_id=6339509542340373&lang=de-DE" };
const PSTTG = { label: "Plattformen-Steuertransparenzgesetz § 4", url: "https://www.gesetze-im-internet.de/psttg/__4.html" };

const FT_INFLUENCER: ZielgruppeFreeTool = {
  to: "/influencer-steuer-check",
  title: "Influencer-Steuer-Check",
  desc: "Brauche ich ein Gewerbe? Dein persönlicher Fahrplan in 2 Minuten.",
};
const FT_PR: ZielgruppeFreeTool = {
  to: "/pr-paket-rechner",
  title: "PR-Paket-Rechner",
  desc: "Welchen Wert du für PR-Pakete und Gratis-Hotelnächte ansetzt.",
};
const FT_TTS: ZielgruppeFreeTool = {
  to: "/tiktok-shop-checkliste",
  title: "TikTok-Shop-Checkliste",
  desc: "Alle Pflichten vor dem ersten Verkauf – in der richtigen Reihenfolge.",
};

export const ZIELGRUPPEN: Zielgruppe[] = [
  {
    slug: "influencer",
    seoTitle: "Influencer & Creator: Gewerbe & Steuern 2026 | GründerX",
    seoDescription:
      "Influencer, Creator & UGC: Gewerbe anmelden, Fragebogen, PR-Pakete, Affiliate, Kleinunternehmer – Schritt für Schritt mit Felix. Gratis-Check ohne Konto.",
    eyebrow: "Für Influencer · Creator · UGC-Creator",
    heading: "Du machst Content. Felix macht das Finanzamt.",
    lead:
      "Erste Kooperation, erstes PR-Paket, erste Auszahlung aus dem Creator-Programm? GründerX führt dich Schritt für Schritt durch Gewerbe, Fragebogen zur steuerlichen Erfassung, Kleinunternehmerregelung und Rechnungen – damit du dich wieder um deine Videos kümmern kannst.",
    urgency:
      "Die Finanzverwaltung sagt es selbst: Soziale Medien geraten zunehmend in ihren Fokus – per Internetrecherche und Auskunftsersuchen an deine Geschäftspartner. Werbeeinnahmen, Affiliate-Provisionen, Creator-Geld und sogar PR-Pakete, die du behalten darfst, zählen als Betriebseinnahmen. Für den Fragebogen hast du nach dem Start nur einen Monat. Wer das verschleppt, riskiert Nachzahlung und Zinsen. Mach es einmal richtig – mit Felix in der richtigen Reihenfolge.",
    outcomes: [
      "Klare Antwort, ob und wann du ein Gewerbe brauchst",
      "Fragebogen zur steuerlichen Erfassung Schritt für Schritt ausgefüllt – inklusive Kleinunternehmer-Entscheidung",
      "PR-Pakete, Gratis-Leistungen und Affiliate-Provisionen sauber erfasst",
      "Rechnungen an Marken und Agenturen, die angenommen werden",
      "Steuerkalender mit deinen Fristen, damit nichts liegen bleibt",
    ],
    wegHeading: "Dein Weg vom ersten Deal zum sauberen Creator-Business",
    weg: [
      { title: "Einnahmen einordnen", description: "Werbung, Affiliate, Creator-Programme, PR-Pakete, Gratis-Hotelnächte: Was zählt, und mit welchem Wert?", meta: "Gratis: Influencer-Steuer-Check" },
      { title: "Gewerbe anmelden", description: "Influencer-Tätigkeit ist laut Finanzverwaltung grundsätzlich gewerblich. Felix sagt dir, welche Tätigkeitsbeschreibung passt.", meta: "Gewerbeanmeldung-Wizard" },
      { title: "Fragebogen zur steuerlichen Erfassung", description: "Innerhalb eines Monats nach Start über ELSTER – inklusive Kleinunternehmer ja oder nein.", meta: "Fragebogen-Wizard" },
      { title: "Rechnungen & Gutschriften" },
      { title: "PR-Pakete und Ausgaben erfassen" },
      { title: "Fristen & Steuererklärung (Anlage G, EÜR)" },
    ],
    freeTools: [FT_INFLUENCER, FT_PR, FT_TTS],
    tools: [
      { slug: "gewerbeanmeldung-wizard", title: "Gewerbeanmeldung-Wizard", desc: "Tätigkeit richtig beschreiben, Formular vorbereiten." },
      { slug: "fse-wizard", title: "Fragebogen-Wizard", desc: "Fragebogen zur steuerlichen Erfassung ohne ELSTER-Fehler." },
      { slug: "kleinunternehmer-waechter", title: "Kleinunternehmer-Wächter", desc: "Behält die 25.000-€-Grenze im Blick." },
      { slug: "rechnungs-generator", title: "Rechnungs-Generator", desc: "Rechnungen an Marken mit allen Pflichtangaben." },
      { slug: "abschreibung", title: "Abschreibungs-Rechner", desc: "Kamera, Laptop, Ringlicht richtig absetzen." },
      { slug: "steuerkalender", title: "Steuerkalender", desc: "Alle Fristen auf einen Blick." },
    ],
    ratgeber: [
      { to: "/ratgeber/influencer-steuern-2026", title: "Influencer Steuern 2026", desc: "Gewerbe, Umsatzsteuer, Gewerbesteuer – der komplette Überblick." },
      { to: "/ratgeber/pr-pakete-versteuern", title: "PR-Pakete versteuern", desc: "Wertansatz, Rücksendung, private Nutzung." },
      { to: "/ratgeber/ugc-creator-gewerbe-rechnung", title: "UGC-Creator: Gewerbe & Rechnung", desc: "So schreibst du deine erste Rechnung an eine Marke." },
      { to: "/ratgeber/tiktok-shop-affiliate-steuern", title: "TikTok-Shop-Affiliate & Steuern", desc: "Provisionen und Samples richtig erfassen." },
    ],
    guides: [
      { to: "/guides/creator-setup", title: "Creator / Influencer Setup", desc: "Vom Gewerbe bis zu Brand-Deal-Verträgen." },
      { to: "/vorlagen/influencer-kooperationsvertrag", title: "Vorlage: Influencer-Kooperationsvertrag", desc: "Leistung, Vergütung, Nutzungsrechte, Kennzeichnung." },
    ],
    faq: [
      {
        q: "Muss ich als Influencer ein Gewerbe anmelden?",
        a: "Wer regelmäßig mit Werbung, Affiliate-Links oder Creator-Programmen Geld verdient, erzielt laut Finanzverwaltung in der Regel Einkünfte aus Gewerbebetrieb. Dann meldest du ein Gewerbe an und gibst innerhalb eines Monats den Fragebogen zur steuerlichen Erfassung über ELSTER ab.",
      },
      {
        q: "Zählen PR-Pakete als Einnahme?",
        a: "Ja, wenn du das Produkt nach der Werbung behalten darfst – mit dem üblichen Endpreis abzüglich üblicher Rabatte. Gratis-Dienstleistungen wie Hotelnächte zählen mit ihrem regulären Wert.",
      },
      {
        q: "Bis wann bin ich Kleinunternehmer?",
        a: "Wenn dein Umsatz im Vorjahr höchstens 25.000 € betrug und im laufenden Jahr 100.000 € nicht übersteigt. Im ersten Jahr gilt die Grenze von 25.000 €.",
      },
      {
        q: "Ab wann zahle ich Gewerbesteuer?",
        a: "Erst wenn dein Gewerbeertrag über 24.500 € liegt. Gezahlte Gewerbesteuer wird teilweise auf die Einkommensteuer angerechnet.",
      },
      {
        q: "Ersetzt GründerX meinen Steuerberater?",
        a: "Nein. Felix führt dich durch die amtlichen Formulare, Regeln und Fristen und bereitet alles vor. Für Gestaltungsfragen im Einzelfall bleibt der Steuerberater zuständig.",
      },
    ],
    quellen: [HESSEN, TT_NEWS],
    ctaTitle: "Dein Creator-Business sauber aufsetzen – mit Felix",
    ctaText: "Gewerbe, Fragebogen, Rechnungen, Fristen und alle weiteren Tools und Guides im Abo – monatlich kündbar.",
  },
  {
    slug: "tiktok-shop",
    seoTitle: "TikTok Shop Deutschland: Verkäufer werden | GründerX",
    seoDescription:
      "TikTok Shop starten: Gewerbe, Steuernummer, Registrierung, LUCID, WEEE und Plattform-Meldung in der richtigen Reihenfolge – mit Felix. Gratis-Checkliste.",
    eyebrow: "Für TikTok-Shop-Verkäufer · Affiliates · Live-Seller",
    heading: "TikTok Shop starten – ohne hängende Registrierung.",
    lead:
      "Du willst im TikTok Shop verkaufen oder als Creator Provisionen verdienen? Felix bringt dich durch Gewerbe, Fragebogen, den passenden Registrierungsweg, Verpackungsregister und Elektro-Registrierung – bevor dein Konto oder dein erstes Listing hängen bleibt.",
    urgency:
      "TikTok Shop läuft in Deutschland seit März 2025. Laut TikTok sind über 25.000 Verkäufer:innen aktiv, und im Schnitt kommen 60 % ihres Umsatzes über shoppable Videos und Live-Shopping. Ohne Steuernummer kommst du nicht durch die Registrierung – und wer im Handelsregister steht oder als GbR verkauft, braucht zusätzlich eine USt-IdNr. Und ab 30 Verkäufen oder 2.000 € im Jahr meldet die Plattform deine Umsätze ans Bundeszentralamt für Steuern. Wenn dein Video viral geht, muss dein Setup schon stehen.",
    outcomes: [
      "Alle Anmeldungen in der richtigen Reihenfolge: Gewerbe → Fragebogen → Steuernummer → Registrierung → Geschäftskonto",
      "Produktpflichten erledigt: LUCID, bei Elektro WEEE, Produktsicherheit",
      "Kleinunternehmer-Entscheidung, die zu deinen Plänen passt",
      "Verkäufe, TikTok-Gebühren und Affiliate-Provisionen sauber in der Buchhaltung",
      "Margen pro Produkt im Blick – bevor du skalierst",
    ],
    wegHeading: "Dein Weg zum ersten Verkauf im TikTok Shop",
    weg: [
      { title: "Startklar-Check", description: "Rolle, Alter (ab 18), Produkte: Welche Pflichten gelten für dich?", meta: "Gratis: TikTok-Shop-Checkliste" },
      { title: "Gewerbe & Fragebogen", description: "Gewerbe anmelden, Fragebogen innerhalb eines Monats über ELSTER. Mit der Steuernummer registrierst du dich ohne Handelsregister als gewerbliche:r Verkäufer:in.", meta: "Gewerbe- und Fragebogen-Wizard" },
      { title: "Verpackung & Elektro", description: "LUCID-Registrierung vor dem ersten Versand, bei Elektrogeräten WEEE bei der stiftung ear.", meta: "LUCID-Wizard · WEEE-Check" },
      { title: "Seller Center & Produktdaten" },
      { title: "Creator-Affiliates & Provisionen" },
      { title: "Umsatzsteuer, Schwellen & Marge" },
    ],
    freeTools: [FT_TTS, FT_INFLUENCER, FT_PR],
    tools: [
      { slug: "gewerbeanmeldung-wizard", title: "Gewerbeanmeldung-Wizard", desc: "Tätigkeit „Online-Handel“ richtig angeben." },
      { slug: "fse-wizard", title: "Fragebogen-Wizard", desc: "Zur Steuernummer ohne ELSTER-Fehler." },
      { slug: "lucid-wizard", title: "LUCID-Wizard", desc: "Verpackungsregister ohne Fehler." },
      { slug: "weee-check", title: "WEEE-Check", desc: "Brauchen deine Produkte eine WEEE-Nummer?" },
      { slug: "schwellen-check", title: "Schwellen-Check", desc: "Kleinunternehmer- und EU-Lieferschwelle im Blick." },
      { slug: "shop-profit-rechner", title: "Shop-Profit-Rechner", desc: "Was nach Gebühren und Provision übrig bleibt." },
    ],
    ratgeber: [
      { to: "/ratgeber/tiktok-shop-verkaeufer-werden", title: "TikTok Shop: Verkäufer werden", desc: "Voraussetzungen und Reihenfolge der Anmeldungen." },
      { to: "/ratgeber/tiktok-shop-affiliate-steuern", title: "TikTok-Shop-Affiliate & Steuern", desc: "Provisionen und Samples richtig erfassen." },
      { to: "/ratgeber/lucid-verpackungsregister-anmelden", title: "LUCID anmelden", desc: "Verpackungsregister Schritt für Schritt." },
      { to: "/ratgeber/oss-anmeldung", title: "OSS-Anmeldung", desc: "Verkauf an Privatkunden im EU-Ausland." },
    ],
    guides: [
      { to: "/guides/tiktok-shop-starten", title: "Guide: TikTok Shop starten", desc: "Alle Schritte bis zum ersten Verkauf." },
      { to: "/guides/creator-setup", title: "Creator / Influencer Setup", desc: "Für Affiliates und Live-Seller." },
    ],
    faq: [
      {
        q: "Was brauche ich, um im TikTok Shop zu verkaufen?",
        a: "Du musst mindestens 18 sein. Ohne Handelsregister registrierst du dich als gewerbliche:r Verkäufer:in mit Steuernummer, Geschäftsadresse und Ausweis; e.K. und GbR brauchen laut TikTok zusätzlich eine USt-IdNr. Davor stehen Gewerbeanmeldung und Fragebogen zur steuerlichen Erfassung. Für die Produkte gelten die üblichen Pflichten: Verpackungsregister LUCID, bei Elektrogeräten WEEE-Registrierung und Produktsicherheitsangaben.",
      },
      {
        q: "Meldet TikTok meine Umsätze dem Finanzamt?",
        a: "Ja, ab einer Schwelle: Plattformen melden Verkäufer ans Bundeszentralamt für Steuern. Ausgenommen ist nur, wer im Jahr weniger als 30 Verkäufe und zusammen weniger als 2.000 € erzielt.",
      },
      {
        q: "Kann ich als Kleinunternehmer im TikTok Shop verkaufen?",
        a: "Grundsätzlich ja, solange dein Umsatz im ersten Jahr 25.000 € nicht übersteigt. Felix rechnet mit dir durch, ob sich der Verzicht lohnt – etwa wenn du viel Ware mit Vorsteuer einkaufst.",
      },
      {
        q: "Brauche ich als TikTok-Shop-Affiliate ein Gewerbe?",
        a: "Affiliate-Provisionen sind laut Finanzverwaltung Betriebseinnahmen; wer regelmäßig darüber verdient, ist in der Regel gewerblich tätig und umsatzsteuerlich Unternehmer.",
      },
      {
        q: "Ersetzt GründerX meinen Steuerberater?",
        a: "Nein. Felix führt dich durch Formulare, Registrierungen und Fristen. Für Gestaltungsfragen im Einzelfall bleibt der Steuerberater zuständig.",
      },
    ],
    quellen: [TT_NEWS, TT_SU, PSTTG, HESSEN],
    ctaTitle: "Dein TikTok-Shop-Setup – Schritt für Schritt mit Felix",
    ctaText: "Gewerbe, Fragebogen, Registrierung, LUCID, WEEE und Marge – plus alle weiteren Tools und Guides im Abo, monatlich kündbar.",
  },
];

export const findZielgruppe = (slug: string) => ZIELGRUPPEN.find((z) => z.slug === slug);
