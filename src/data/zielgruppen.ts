// Zielgruppen-Landingpages (/influencer, /tiktok-shop) – Betreiber 25.10.2026:
// GründerX viel stärker auf Influencer und TikTok-Shop-Leute ausrichten.
// Jede Zahl ist belegt (Quellen in `quellen`); Preise nur über /preise.
//
// /amazon-haendler (14.11.2026, growth-lp): Zielgruppenseite für die Persona „Marketplace-Starter“
// (personas_gruenderx.json, höchste gemessene Nachfrage). Die Startseiten-Kachel „Amazon- & Shop-Händler“
// zeigte bis dahin auf einen Ratgeber. Belege, alle am 14.11.2026 am Gesetzestext bzw. auf der Seite des
// Anbieters gelesen: § 14 GewO, § 138 Abs. 1b und 4 AO, §§ 3c Abs. 4, 18j, 19, 25e, 27a UStG,
// §§ 6, 7, 13 VerpackDG (BGBl. 2026 I Nr. 207, in Kraft seit 12.08.2026), § 6 ElektroG, § 4 Abs. 5 PStTG,
// sell.amazon.de (Registrierung, Verkaufstarife). Das Rechenbeispiel folgt den Tarifspannen in
// src/pages/LucidWizard.tsx (MATERIAL_LABELS, Untergrenze 75 €) und ist im Test nachgerechnet.

import type { ScreenKey } from "./screenshots";

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
  /** Hero: Überschrift vor dem farbigen Teilsatz + Teilsatz (zusammen = heading). */
  heroTitle: string;
  heroAccent: string;
  /** Großer Screenshot unter dem Hero. */
  screen: ScreenKey;
  /** Überschrift des Abschnitts „Warum jetzt“. */
  warumTitel: string;
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
  // ── Optional (14.11.2026, growth-lp): Bausteine für Seiten, die eine Suchfrage direkt beantworten. ──
  /** Sichtbarer Stand + dateModified. Fehlt er, gilt der Sammelstand der älteren Seiten. */
  stand?: { text: string; iso: string };
  /** Antwort zuerst: Frage als H2, Antwort in ein bis zwei Sätzen, direkt unter dem Hero. */
  antwort?: { frage: string; text: string };
  /** Tabelle mit Stand-Datum, z. B. Pflichten in Reihenfolge. `hilfe` verlinkt die eigene Seite zum Schritt. */
  tabelle?: {
    titel: string;
    lead: string;
    kopf: [string, string, string, string];
    zeilen: { schritt: string; wann: string; wo: string; grundlage: string; hilfe: { to: string; label: string } }[];
    fuss: string;
  };
  /** Eigener Beispielfall mit eigener Zahl (Eigenwert der Seite). */
  beispiel?: { titel: string; text: string; punkte: string[]; hinweis: string; link: { to: string; label: string } };
  /** Einwände direkt vor dem Schluss-CTA. Der Preis kommt in der Komponente aus config/pricing.ts. */
  einwaende?: { q: string; a: string }[];
  /** Überschrift und Vorspann des Tool-Abschnitts, wenn „Drei Tools gratis“ nicht passt. */
  toolsTitel?: string;
  toolsLead?: string;
}

const HESSEN = {
  label: "Finanzamt Hessen: Leitfaden zur Besteuerung von Influencerinnen und Influencern (Juni 2026)",
  url: "https://finanzamt.hessen.de/sites/finanzamt.hessen.de/files/2026-07/leitfaden_zur_besteuerung_von_influencerinnen_und_influencern.pdf",
};
const TT_NEWS = { label: "TikTok Newsroom: Ein Jahr TikTok Shop in Deutschland (24.03.2026)", url: "https://newsroom.tiktok.com/tiktokshop-1-jahr?lang=de-DE" };
const TT_SU = { label: "TikTok Seller University: Registrierung als Einzelunternehmer", url: "https://seller-de.tiktok.com/university/essay?knowledge_id=6339509542340373&lang=de-DE" };
const PSTTG = { label: "Plattformen-Steuertransparenzgesetz § 4", url: "https://www.gesetze-im-internet.de/psttg/__4.html" };

const GII = "https://www.gesetze-im-internet.de";
const Q_GEWO = { label: "§ 14 GewO: Anzeige des Gewerbes gleichzeitig mit dem Beginn", url: `${GII}/gewo/__14.html` };
const Q_AO138 = { label: "§ 138 AO: Fragebogen zur steuerlichen Erfassung innerhalb eines Monats", url: `${GII}/ao_1977/__138.html` };
const Q_USTG25E = { label: "§ 25e UStG: Haftung des Marktplatzes, entfällt bei gültiger USt-IdNr.", url: `${GII}/ustg_1980/__25e.html` };
const Q_USTG27A = { label: "§ 27a UStG: USt-IdNr. auf Antrag vom Bundeszentralamt für Steuern", url: `${GII}/ustg_1980/__27a.html` };
const Q_USTG19 = { label: "§ 19 UStG: Kleinunternehmer-Grenzen 25.000 € und 100.000 €, Bindung fünf Kalenderjahre", url: `${GII}/ustg_1980/__19.html` };
const Q_USTG3C = { label: "§ 3c UStG: Fernverkauf, Schwelle 10.000 € im Jahr", url: `${GII}/ustg_1980/__3c.html` };
const Q_USTG18J = { label: "§ 18j UStG: OSS-Verfahren", url: `${GII}/ustg_1980/__18j.html` };
const Q_VERPACK6 = { label: "§ 6 VerpackDG: Registrierung vor dem erstmaligen Bereitstellen (in Kraft seit 12.08.2026)", url: `${GII}/verpackdg/__6.html` };
const Q_VERPACK7 = { label: "§ 7 VerpackDG: Beteiligung an einem dualen System", url: `${GII}/verpackdg/__7.html` };
const Q_VERPACK13 = { label: "§ 13 VerpackDG: Verbote für Hersteller, Vertreiber und Fulfilment-Dienstleister", url: `${GII}/verpackdg/__13.html` };
const Q_ELEKTRO6 = { label: "§ 6 ElektroG: Registrierung, Verbote für Vertreiber, Marktplätze und Fulfilment-Dienstleister", url: `${GII}/elektrog_2015/__6.html` };
const Q_BZST_USTID = {
  label: "Bundeszentralamt für Steuern: Vergabe der USt-IdNr.",
  url: "https://www.bzst.de/DE/Unternehmen/Identifikationsnummern/Umsatzsteuer-Identifikationsnummer/Vergabe_USt_IdNr/vergabe_ust_idnr_node.html",
};
const Q_ZSVR = { label: "Zentrale Stelle Verpackungsregister (LUCID)", url: "https://www.verpackungsregister.org/" };
const Q_EAR = { label: "stiftung elektro-altgeräte register (stiftung ear)", url: "https://www.stiftung-ear.de/" };
const Q_AMZ_START = { label: "Amazon: Verkäufer werden – was du für die Registrierung brauchst (abgerufen 14.11.2026)", url: "https://sell.amazon.de/" };
const Q_AMZ_PREIS = { label: "Amazon: Verkaufstarife und Gebühren (abgerufen 14.11.2026)", url: "https://sell.amazon.de/preisgestaltung" };

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

const FT_LUCID: ZielgruppeFreeTool = {
  to: "/tools/lucid-wizard",
  title: "Verpackungslizenz-Rechner",
  desc: "Verpackungsmengen eingeben, Spanne der Lizenzkosten und passende duale Systeme sehen.",
};
const FT_WEEE: ZielgruppeFreeTool = {
  to: "/tools/weee-check",
  title: "WEEE-Check",
  desc: "Marke im Verzeichnis der stiftung ear nachschlagen: registriert, aktiv oder ausgetreten.",
};
const FT_USTID: ZielgruppeFreeTool = {
  to: "/ust-id-beantragen",
  title: "USt-ID beantragen",
  desc: "Brauchst du sie, welcher Antragsweg passt – und stimmt die Nummer deines Lieferanten?",
};

export const ZIELGRUPPEN: Zielgruppe[] = [
  {
    slug: "influencer",
    seoTitle: "Influencer & Creator: Gewerbe & Steuern 2026 | GründerX",
    seoDescription:
      "Influencer, Creator & UGC: Gewerbe anmelden, Fragebogen, PR-Pakete, Affiliate, Kleinunternehmer – Schritt für Schritt mit Felix. Gratis-Check ohne Konto.",
    eyebrow: "Für Influencer · Creator · UGC-Creator",
    heading: "Du machst Content. Felix macht das Finanzamt.",
    heroTitle: "Du machst Content.",
    heroAccent: "Felix macht das Finanzamt.",
    screen: "fse",
    warumTitel: "Das Finanzamt schaut inzwischen auch auf Social Media.",
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
      { to: "/guides/creator-influencer-setup", title: "Creator-Business komplett", desc: "Content und Affiliate mit Werbekennzeichnung und Steuer-Fallen." },
      { to: "/guides/creator-tiktok-instagram", title: "TikTok & Instagram als Creator", desc: "Short-Form, Algorithmus und Monetarisierung." },
      { to: "/guides/tiktok-shop-starten", title: "TikTok Shop starten", desc: "Wenn du selbst verkaufen willst." },
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
    heroTitle: "Dein TikTok Shop,",
    heroAccent: "von Anfang an sauber angemeldet.",
    screen: "guideTiktok",
    warumTitel: "Ab 30 Verkäufen weiß es das Finanzamt.",
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
      { to: "/guides/tiktok-shop-launch", title: "TikTok Shop Brand-Launch", desc: "Listings, Live-Shopping und Affiliate-Programm." },
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
  {
    slug: "amazon-haendler",
    seoTitle: "Amazon-Händler werden: Pflichten in Reihenfolge | GründerX",
    seoDescription:
      "Auf Amazon verkaufen: Gewerbe, Steuernummer, USt-IdNr., LUCID, WEEE und OSS in der richtigen Reihenfolge – mit Rechtsgrundlagen und Gratis-Rechner.",
    eyebrow: "Für Amazon-Händler · FBA · eigener Versand",
    heading: "Auf Amazon verkaufen. Alle Pflichten in der richtigen Reihenfolge.",
    heroTitle: "Auf Amazon verkaufen.",
    heroAccent: "Alle Pflichten in der richtigen Reihenfolge.",
    screen: "lucid",
    stand: { text: "14.11.2026", iso: "2026-11-14" },
    warumTitel: "Amazon muss deine Nummern prüfen. Deshalb kommen sie vor dem ersten Angebot.",
    lead:
      "Du startest auf Amazon, mit Versand durch Amazon oder aus dem eigenen Lager? GründerX zeigt dir, welche Anmeldung zuerst dran ist und welche warten kann: Gewerbe, Fragebogen und Steuernummer, USt-IdNr., Verpackungsregister LUCID, bei Elektrogeräten die WEEE-Nummer und das OSS-Verfahren für Verkäufe ins EU-Ausland.",
    antwort: {
      frage: "Welche Pflichten hat ein neuer Amazon-Händler in Deutschland?",
      text:
        "Zuerst das Gewerbe anmelden, dann innerhalb eines Monats den Fragebogen zur steuerlichen Erfassung abgeben und die USt-IdNr. gleich mit beantragen; vor dem ersten Angebot folgen die Registrierung im Verpackungsregister LUCID samt Vertrag mit einem dualen System und, bei Elektrogeräten, die Registrierung des Herstellers bei der stiftung ear. Das OSS-Verfahren kommt dazu, sobald du im Jahr für mehr als 10.000 € an Privatkunden in anderen EU-Ländern lieferst.",
    },
    urgency:
      "Ein Marktplatz haftet für nicht abgeführte Umsatzsteuer aus deinen Lieferungen, solange du keine gültige USt-IdNr. hast (§ 25e UStG). Elektrogeräte eines nicht registrierten Herstellers darf er gar nicht erst anbieten lassen (§ 6 Abs. 2 ElektroG), und ein Fulfilment-Dienstleister darf Ware nur lagern und versenden, wenn der Hersteller der Verpackung im Verpackungsregister steht (§ 13 Abs. 4 VerpackDG). Darum fragt Amazon diese Nummern ab. Wer sie in der richtigen Reihenfolge beantragt, wartet nicht mit fertiger Ware auf eine Behörde.",
    outcomes: [
      "Alle Anmeldungen in einer Reihenfolge: Gewerbe → Fragebogen und Steuernummer → USt-IdNr. → Verkäuferkonto → LUCID → WEEE → OSS",
      "Kosten der Verpackungslizenz vorab als Spanne, gratis im Rechner",
      "Klarheit, ob eine Marke bei der stiftung ear registriert ist, bevor du Elektrogeräte einkaufst",
      "Kleinunternehmer ja oder nein: die Entscheidung im Fragebogen, bevor die erste Ware bestellt ist",
      "Amazon-Abrechnungen nach Gebührenarten aufgeteilt, als CSV für die Buchhaltung",
    ],
    tabelle: {
      titel: "Die Pflichten in der Reihenfolge, in der du sie brauchst",
      lead:
        "Acht Schritte vom Gewerbeschein bis zur laufenden Meldung. Zu jedem Schritt stehen der Zeitpunkt, die zuständige Stelle und die Rechtsgrundlage.",
      kopf: ["Schritt", "Wann", "Wo", "Grundlage"],
      zeilen: [
        {
          schritt: "1. Gewerbe anmelden",
          wann: "gleichzeitig mit dem Start",
          wo: "Gewerbeamt deiner Gemeinde",
          grundlage: "§ 14 Abs. 1 GewO",
          hilfe: { to: "/tools/gewerbeanmeldung-wizard", label: "Gewerbeanmeldung-Wizard" },
        },
        {
          schritt: "2. Fragebogen zur steuerlichen Erfassung",
          wann: "innerhalb eines Monats nach Beginn; danach kommt die Steuernummer",
          wo: "Finanzamt, über ELSTER",
          grundlage: "§ 138 Abs. 1b und 4 AO",
          hilfe: { to: "/tools/fse-wizard", label: "Fragebogen-Wizard" },
        },
        {
          schritt: "3. USt-IdNr.",
          wann: "im Fragebogen mit beantragen; Amazon fragt sie bei der Registrierung ab",
          wo: "Bundeszentralamt für Steuern, kostenlos",
          grundlage: "§ 27a und § 25e Abs. 2 UStG",
          hilfe: { to: "/ust-id-beantragen", label: "Gratis: USt-ID beantragen" },
        },
        {
          schritt: "4. Verkäuferkonto bei Amazon",
          wann: "sobald Ausweis, Kreditkarte und Firmenangaben samt USt-IdNr. bereitliegen",
          wo: "Amazon Seller Central",
          grundlage: "Vorgaben von Amazon",
          hilfe: { to: "/guides/amazon-verkaeuferkonto-setup", label: "Guide: Verkäuferkonto einrichten" },
        },
        {
          schritt: "5. Verpackungsregister LUCID und duales System",
          wann: "vor dem ersten Bereitstellen verpackter Ware",
          wo: "Zentrale Stelle Verpackungsregister; Vertrag mit einem dualen System",
          grundlage: "§§ 6, 7 und 13 VerpackDG",
          hilfe: { to: "/tools/lucid-wizard", label: "Gratis: Verpackungslizenz-Rechner" },
        },
        {
          schritt: "6. WEEE-Registrierung (nur Elektro- und Elektronikgeräte)",
          wann: "bevor ein Gerät in Verkehr gebracht wird",
          wo: "stiftung ear",
          grundlage: "§ 6 ElektroG",
          hilfe: { to: "/tools/weee-check", label: "Gratis: WEEE-Check" },
        },
        {
          schritt: "7. OSS-Verfahren",
          wann: "bevor deine Lieferungen an Privatkunden in anderen EU-Ländern 10.000\u00a0€ im Jahr übersteigen",
          wo: "Bundeszentralamt für Steuern",
          grundlage: "§ 3c Abs. 4 und § 18j UStG",
          hilfe: { to: "/ratgeber/oss-anmeldung", label: "Ratgeber: OSS-Anmeldung" },
        },
        {
          schritt: "8. Plattform-Meldung (DAC7)",
          wann: "laufend; du musst nichts beantragen",
          wo: "Amazon meldet deine Verkäufe an die Steuerbehörden",
          grundlage: "§ 4 Abs. 5 PStTG: keine Meldung nur unter 30 Verkäufen und unter 2.000 € im Jahr",
          hilfe: { to: "/guides/dac7", label: "Guide: DAC7" },
        },
      ],
      fuss:
        "Allgemeine Übersicht, keine Beratung im Einzelfall. Je nach Ware kommen weitere Pflichten dazu, etwa die Angaben zur Produktsicherheit im Angebot oder Regeln für Batterien, Kosmetik und Lebensmittel. Für Lager in anderen EU-Ländern (Pan-EU) gelten zusätzliche Regeln; die Schritte stehen im Guide zu Pan-EU FBA.",
    },
    beispiel: {
      titel: "Beispiel: Was kostet die Verpackungslizenz bei 1.000 Paketen im Jahr?",
      text:
        "Du verschickst 1.000 Pakete im Jahr aus dem eigenen Lager, je 200 g Karton und 15 g Folie. Das sind 200 kg Papier und Karton und 15 kg Kunststoff.",
      punkte: [
        "1.000 Pakete: Der Rechner zeigt 75 bis rund 83 € im Jahr.",
        "5.000 Pakete bei gleicher Verpackung (1.000 kg Karton, 75 kg Kunststoff): rund 259 bis 414 € im Jahr.",
        "Die Registrierung im Verpackungsregister kommt zuerst: Beim Vertrag mit dem dualen System gibst du Materialart, Masse und deine Registrierungsnummer an.",
      ],
      hinweis:
        "Schätzung aus dem GründerX-Rechner mit Tarifspannen 2026 und einer Untergrenze von 75 €. Kein Angebot eines dualen Systems; den verbindlichen Preis nennt dir der Anbieter.",
      link: { to: "/tools/lucid-wizard", label: "Mit deinen Mengen rechnen" },
    },
    wegHeading: "Dein Weg zum ersten Verkauf auf Amazon",
    weg: [
      { title: "Gewerbe anmelden", description: "Beim Gewerbeamt deiner Gemeinde, gleichzeitig mit dem Start. Beschreibe die Tätigkeit so, dass der Online-Handel abgedeckt ist.", meta: "Gewerbeanmeldung-Wizard" },
      { title: "Fragebogen, Steuernummer, USt-IdNr.", description: "Den Fragebogen gibst du innerhalb eines Monats über ELSTER ab. Die USt-IdNr. beantragst du darin gleich mit; die Kleinunternehmer-Entscheidung fällt an derselben Stelle.", meta: "Fragebogen-Wizard · Gratis: USt-ID beantragen" },
      { title: "Verpackung und Elektro", description: "LUCID-Registrierung und Vertrag mit einem dualen System vor dem ersten Versand. Bei Elektrogeräten zuerst prüfen, ob der Hersteller bei der stiftung ear registriert ist.", meta: "Gratis: Verpackungslizenz-Rechner · WEEE-Check" },
      { title: "Verkäuferkonto und Verifizierung" },
      { title: "Listing, Marke und Freischaltung" },
      { title: "Umsatzsteuer, OSS und Marge" },
    ],
    toolsTitel: "Drei Tools gratis. Der Rest im Cockpit.",
    toolsLead: "Rechner, WEEE-Check und USt-ID-Check nutzt du ohne Konto. Im Abo kommen die Wizards für Gewerbeanmeldung und Fragebogen und die Amazon-Werkzeuge für die Buchhaltung dazu.",
    freeTools: [FT_LUCID, FT_WEEE, FT_USTID],
    tools: [
      { slug: "fse-wizard", title: "Fragebogen-Wizard", desc: "Zur Steuernummer, Teilseite für Teilseite in der Reihenfolge von ELSTER." },
      { slug: "amazon-parser", title: "Amazon-Settlement-Parser", desc: "Abrechnung von Amazon nach Gebührenarten aufteilen, als CSV exportieren." },
      { slug: "marge-tracker", title: "Marge-Tracker", desc: "Marge je Artikel und Kanal nach Provision, Werbung und Retouren." },
      { slug: "gewerbeanmeldung-wizard", title: "Gewerbeanmeldung-Wizard", desc: "Tätigkeit „Online-Handel“ richtig angeben." },
      { slug: "schwellen-check", title: "Schwellen-Check", desc: "Kleinunternehmer-Grenze und Plattform-Meldung im Blick." },
      { slug: "steuerkalender", title: "Steuerkalender", desc: "Abgabe- und Zahlungstermine der nächsten zwölf Monate." },
    ],
    ratgeber: [
      { to: "/ratgeber/amazon-fba-starten-deutschland", title: "Amazon FBA starten 2026", desc: "Schritte, Steuern und Kosten im Überblick." },
      { to: "/ratgeber/lucid-verpackungsregister-anmelden", title: "LUCID anmelden", desc: "Verpackungsregister und Lizenz Schritt für Schritt." },
      { to: "/ratgeber/oss-anmeldung", title: "OSS-Anmeldung", desc: "Verkauf an Privatkunden im EU-Ausland." },
      { to: "/ratgeber/gpsr-verordnung-haendler", title: "Produktsicherheit (GPSR) für Händler", desc: "Welche Angaben ins Angebot gehören." },
    ],
    guides: [
      { to: "/guides/amazon-verkaeuferkonto-setup", title: "Guide: Amazon-Verkäuferkonto einrichten", desc: "Registrierung und Verifizierung bis zum ersten Listing." },
      { to: "/guides/weee-registrierung", title: "Guide: WEEE-Registrierung", desc: "Elektrogeräte bei der stiftung ear melden." },
      { to: "/guides/pan-eu-fba", title: "Guide: Pan-EU FBA", desc: "Lager in anderen EU-Ländern, Kosten und Umsatzsteuer." },
      { to: "/guides/reseller-freischaltung", title: "Guide: Marke und Kategorie freischalten", desc: "Was Amazon für die Freischaltung sehen will." },
      { to: "/guides/dac7", title: "Guide: DAC7", desc: "Was Plattformen über Verkäufer melden." },
    ],
    faq: [
      {
        q: "Was brauche ich, um auf Amazon zu verkaufen?",
        a: "Amazon nennt für die Registrierung eine geschäftliche Mailadresse oder ein Amazon-Kundenkonto, eine Kreditkarte, einen gültigen Reisepass oder Personalausweis und die Angaben zur Firmenregistrierung einschließlich USt-IdNr. Eine GmbH brauchst du laut Amazon nicht, ein Einzelunternehmen reicht. Davor stehen Gewerbeanmeldung und Fragebogen zur steuerlichen Erfassung.",
      },
      {
        q: "Was kostet ein Amazon-Verkäuferkonto?",
        a: "Laut Amazon kostet der Tarif Professionell 39 € zzgl. MwSt. im Monat (46,41 € mit 19 % Umsatzsteuer), der Tarif Einzelanbieter 0,99 € zzgl. MwSt. je verkauftem Artikel. Dazu kommen Verkaufsgebühren, die laut Amazon meist zwischen 8 % und 15 % liegen. Stand der Abfrage: 14.11.2026.",
      },
      {
        q: "Kann ich als Kleinunternehmer auf Amazon verkaufen?",
        a: "Die Kleinunternehmerregelung gilt, wenn dein Umsatz im Vorjahr höchstens 25.000 € betrug und im laufenden Jahr 100.000 € nicht übersteigt. Eine USt-IdNr. erteilt das Bundeszentralamt für Steuern Unternehmern auf Antrag, also auch Kleinunternehmern. Wer auf die Regelung verzichtet, ist daran mindestens fünf Kalenderjahre gebunden. Ob sich der Verzicht für dich lohnt, hängt von deinem Einkauf ab und ist eine Frage für den Einzelfall.",
      },
      {
        q: "Brauche ich als Amazon-Händler eine LUCID-Nummer?",
        a: "Wer als Hersteller im Sinne des Verpackungsrechts verpackte Ware erstmals in Deutschland bereitstellt, muss sich vorher bei der Zentralen Stelle Verpackungsregister registrieren und sich mit den Verpackungen an einem dualen System beteiligen. Das betrifft auch Versandkartons. Ob du für eine bestimmte Verpackung selbst als Hersteller giltst, hängt von Ware, Herkunft und Versandweg ab; die Zentrale Stelle erklärt die Fälle auf ihrer Website.",
      },
      {
        q: "Wann brauche ich eine WEEE-Nummer?",
        a: "Wenn du Elektro- oder Elektronikgeräte als Hersteller in Verkehr bringst, zum Beispiel unter eigener Marke oder als Importeur. Geräte fremder Marken darfst du nur anbieten, wenn deren Hersteller registriert ist. Das schlägst du im Verzeichnis der stiftung ear nach, gratis mit dem WEEE-Check.",
      },
      {
        q: "Ab wann brauche ich das OSS-Verfahren?",
        a: "Sobald deine Lieferungen an Privatkunden in anderen EU-Ländern zusammen 10.000 € im Jahr übersteigen, gilt die Umsatzsteuer des Ziellands. Über das OSS-Verfahren meldest du diese Umsätze zentral beim Bundeszentralamt für Steuern, statt dich in jedem Land einzeln zu registrieren.",
      },
      {
        q: "Ersetzt GründerX meinen Steuerberater?",
        a: "Nein. Felix führt dich durch Formulare, Registrierungen und Fristen. Für Gestaltungsfragen im Einzelfall bleibt der Steuerberater zuständig.",
      },
    ],
    einwaende: [
      {
        q: "Die Verkäuferforen sind doch kostenlos.",
        a: "Für Einzelfragen sind sie gut. Was dort fehlt, ist die Reihenfolge für deinen Fall und der aktuelle Stand: Seit dem 12.08.2026 gilt zum Beispiel das Verpackungsrecht-Durchführungsgesetz statt des alten Verpackungsgesetzes. Hier steht zu jedem Schritt die Rechtsgrundlage mit Datum.",
      },
      {
        q: "Ich habe schon eine Buchhaltungssoftware oder einen Steuerberater.",
        a: "Bleib dabei. GründerX ersetzt weder Buchhaltung noch Steuerberater. Es deckt die Schritte davor und daneben ab: Anmeldungen, Registrierungen, Fristen. Die Abrechnungen von Amazon teilst du nach Gebührenarten auf und gibst sie als CSV weiter.",
      },
    ],
    quellen: [Q_GEWO, Q_AO138, Q_USTG27A, Q_USTG25E, Q_USTG19, Q_USTG3C, Q_USTG18J, Q_VERPACK6, Q_VERPACK7, Q_VERPACK13, Q_ELEKTRO6, PSTTG, Q_BZST_USTID, Q_ZSVR, Q_EAR, Q_AMZ_START, Q_AMZ_PREIS],
    ctaTitle: "Dein Amazon-Start in der richtigen Reihenfolge",
    ctaText: "Gewerbe, Fragebogen, USt-IdNr., LUCID, WEEE und OSS – plus alle weiteren Tools und Guides im Abo, monatlich kündbar.",
  },
];

export const findZielgruppe = (slug: string) => ZIELGRUPPEN.find((z) => z.slug === slug);
