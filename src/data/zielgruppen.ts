// Zielgruppen-Landingpages (/influencer, /tiktok-shop, /amazon-haendler) – Betreiber 25.10.2026:
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
  /**
   * Optional (21.11.2026, growth-lp): Fall-Tabelle direkt unter der Antwort. Jede Zeile ist ein Fall
   * (z. B. eine Rechtsform), die erste Spalte der Zeilenkopf; `kopf` und jede Zeile haben gleich viele Einträge.
   */
  faelle?: { eyebrow: string; titel: string; lead: string; kopf: string[]; zeilen: string[][]; fuss: string; link?: { to: string; label: string } };
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
const TT_SU = { label: "TikTok Seller University: TikTok Shop Onboarding-Leitfaden (Stand 11.11.2026)", url: "https://seller-de.tiktok.com/university/essay?knowledge_id=6339509542340373&lang=de-DE" };
const PSTTG = { label: "Plattformen-Steuertransparenzgesetz § 4", url: "https://www.gesetze-im-internet.de/psttg/__4.html" };

// /tiktok-shop (21.11.2026) und /amazon-haendler (14.11.2026), growth-lp: gemeinsame Quellen-Konstanten.
const TT_PROVISION = { label: "TikTok Seller University: TikTok Shop EU-Kommissionsrichtlinie (Stand 28.01.2026)", url: "https://seller-de.tiktok.com/university/essay?knowledge_id=1531082143074070&lang=de-DE" };
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
const Q_AMZ_START = { label: "Amazon: Verkäufer werden, was du für die Registrierung brauchst (abgerufen 14.11.2026)", url: "https://sell.amazon.de/" };
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
  desc: "Alle Pflichten vor dem ersten Verkauf, in der richtigen Reihenfolge.",
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
  desc: "Brauchst du sie, welcher Antragsweg passt, und stimmt die Nummer deines Lieferanten?",
};

export const ZIELGRUPPEN: Zielgruppe[] = [
  {
    slug: "influencer",
    seoTitle: "Influencer & Creator: Gewerbe & Steuern 2026 | GründerX",
    seoDescription:
      "Influencer, Creator & UGC: Gewerbe anmelden, Fragebogen, PR-Pakete, Affiliate, Kleinunternehmer, Schritt für Schritt mit Felix. Gratis-Check ohne Konto.",
    eyebrow: "Für Influencer · Creator · UGC-Creator",
    heading: "Du machst Content. Felix macht das Finanzamt.",
    heroTitle: "Du machst Content.",
    heroAccent: "Felix macht das Finanzamt.",
    screen: "fse",
    warumTitel: "Das Finanzamt schaut inzwischen auch auf Social Media.",
    lead:
      "Erste Kooperation, erstes PR-Paket, erste Auszahlung aus dem Creator-Programm? GründerX führt dich Schritt für Schritt durch Gewerbe, Fragebogen zur steuerlichen Erfassung, Kleinunternehmerregelung und Rechnungen, damit du dich wieder um deine Videos kümmern kannst.",
    urgency:
      "Die Finanzverwaltung sagt es selbst: Soziale Medien geraten zunehmend in ihren Fokus, per Internetrecherche und Auskunftsersuchen an deine Geschäftspartner. Werbeeinnahmen, Affiliate-Provisionen, Creator-Geld und sogar PR-Pakete, die du behalten darfst, zählen als Betriebseinnahmen. Für den Fragebogen hast du nach dem Start nur einen Monat. Wer das verschleppt, riskiert Nachzahlung und Zinsen. Mach es einmal richtig, mit Felix in der richtigen Reihenfolge.",
    outcomes: [
      "Klare Antwort, ob und wann du ein Gewerbe brauchst",
      "Fragebogen zur steuerlichen Erfassung Schritt für Schritt ausgefüllt, inklusive Kleinunternehmer-Entscheidung",
      "PR-Pakete, Gratis-Leistungen und Affiliate-Provisionen sauber erfasst",
      "Rechnungen an Marken und Agenturen, die angenommen werden",
      "Steuerkalender mit deinen Fristen, damit nichts liegen bleibt",
    ],
    wegHeading: "Dein Weg vom ersten Deal zum sauberen Creator-Business",
    weg: [
      { title: "Einnahmen einordnen", description: "Werbung, Affiliate, Creator-Programme, PR-Pakete, Gratis-Hotelnächte: Was zählt, und mit welchem Wert?", meta: "Gratis: Influencer-Steuer-Check" },
      { title: "Gewerbe anmelden", description: "Influencer-Tätigkeit ist laut Finanzverwaltung grundsätzlich gewerblich. Felix sagt dir, welche Tätigkeitsbeschreibung passt.", meta: "Gewerbeanmeldung-Wizard" },
      { title: "Fragebogen zur steuerlichen Erfassung", description: "Innerhalb eines Monats nach Start über ELSTER, inklusive Kleinunternehmer ja oder nein.", meta: "Fragebogen-Wizard" },
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
      { to: "/ratgeber/influencer-steuern-2026", title: "Influencer Steuern 2026", desc: "Gewerbe, Umsatzsteuer, Gewerbesteuer, der komplette Überblick." },
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
        a: "Ja, wenn du das Produkt nach der Werbung behalten darfst, mit dem üblichen Endpreis abzüglich üblicher Rabatte. Gratis-Dienstleistungen wie Hotelnächte zählen mit ihrem regulären Wert.",
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
    ctaTitle: "Dein Creator-Business sauber aufsetzen, mit Felix",
    ctaText: "Gewerbe, Fragebogen, Rechnungen, Fristen und alle weiteren Tools und Guides im Abo, monatlich kündbar.",
  },
  // /tiktok-shop, Fassung vom 21.11.2026 (growth-lp): eine Persona (TikTok-Shop-Händler mit eigener oder eingekaufter
  // Ware), eine Aufgabe (Registrierung im Seller Center ohne falschen Kontotyp). Belege, alle am 21.11.2026 gelesen:
  // TikTok Seller University „TikTok Shop Onboarding-Leitfaden“ (Stand 11.11.2026) und „TikTok Shop
  // EU-Kommissionsrichtlinie“ (Stand 28.01.2026), TikTok Newsroom vom 24.03.2026, § 14 GewO, § 138 AO, §§ 19, 27a UStG,
  // §§ 6, 7 VerpackDG, § 6 ElektroG, § 4 Abs. 5 PStTG. Das Rechenbeispiel ist in src/test/tiktok-shop-seite.test.ts
  // nachgerechnet. Affiliates führt die Seite nur noch als Wegweiser zu /influencer.
  {
    slug: "tiktok-shop",
    seoTitle: "TikTok Shop erstellen: als Seller anmelden | GründerX",
    seoDescription:
      "TikTok Shop erstellen: welcher Kontotyp zu deiner Rechtsform passt, wer eine USt-IdNr. braucht und was 9 % Provision kosten. Mit Checkliste, Stand 21.11.2026.",
    eyebrow: "Für TikTok-Shop-Verkäufer · eigene Ware · Handelsware",
    heading: "TikTok Shop erstellen. Kontotyp, Steuernummer und USt-IdNr. in der richtigen Reihenfolge.",
    heroTitle: "TikTok Shop erstellen.",
    heroAccent: "Kontotyp, Steuernummer und USt-IdNr. in der richtigen Reihenfolge.",
    screen: "guideTiktok",
    stand: { text: "21.11.2026", iso: "2026-11-21" },
    warumTitel: "TikTok prüft deine Angaben, bevor der Shop freigeschaltet wird.",
    lead:
      "Du willst eigene oder eingekaufte Produkte im TikTok Shop verkaufen? Hier steht, welcher Kontotyp zu deiner Rechtsform gehört, welche Nummer TikTok dafür verlangt und in welcher Reihenfolge Gewerbeamt, Finanzamt und Verpackungsregister dran sind. Geprüft am Onboarding-Leitfaden von TikTok vom 11.11.2026 und am Gesetzestext.",
    antwort: {
      frage: "Was brauche ich, um mich im TikTok Shop als Verkäufer anzumelden?",
      text:
        "Für die Registrierung in Deutschland verlangt TikTok einen Ausweis, einen Adressnachweis, eine Geschäftsadresse und je nach Kontotyp deine Steuernummer oder die Nummer aus dem Handelsregister; davor stehen die Gewerbeanmeldung und der Fragebogen zur steuerlichen Erfassung. Eine USt-IdNr. verlangt TikTok, wenn dein Einzelunternehmen im Handelsregister steht (e. K.) oder du als GbR verkaufst; mit einem Gewerbe ohne Handelsregistereintrag registrierst du dich als „Gewerbliche*r Verkäufer*in“ ohne USt-IdNr.",
    },
    faelle: {
      eyebrow: "Je Rechtsform",
      titel: "Brauche ich für den TikTok Shop eine USt-IdNr.?",
      lead:
        "Das hängt vom Kontotyp ab, und den gibt deine Rechtsform vor: TikTok verlangt die Rechtsform, die deiner Gewerbeanmeldung entspricht. Für Deutschland beschreibt der Leitfaden vier Fälle.",
      kopf: ["Deine Rechtsform", "Kontotyp bei TikTok", "Nummer, die TikTok verlangt", "Außerdem"],
      zeilen: [
        [
          "Gewerbe ohne Handelsregistereintrag (Kleingewerbe)",
          "„Gewerbliche*r Verkäufer*in“",
          "„Persönliche Steuernummer“. Angaben zur Unternehmensregistrierung und eine USt-IdNr. verlangt TikTok bei diesem Kontotyp nicht.",
          "Geschäftsadresse, laut TikTok kann das deine Wohnadresse sein; Ausweis und Adressnachweis, der jünger als drei Monate ist",
        ],
        [
          "Eingetragener Kaufmann (e. K.)",
          "„Einzelunternehmer*in“",
          "Registrierungsnummer aus dem Handelsregister, Stadt des Registergerichts und USt-IdNr.",
          "Name und Nummer genau wie im Handelsregister; der Eintrag muss dort den Status „aktiv“ haben",
        ],
        [
          "GbR",
          "„Allgemeine Partnerschaft“ (nur Deutschland: GbR)",
          "USt-IdNr., laut TikTok obligatorisch. Die Übersicht im Leitfaden führt für die GbR auch eine Registrierungsnummer auf; was TikTok von einer GbR ohne Registereintrag annimmt, steht dort nicht.",
          "Nachweis der Gewerbeanmeldung; Vertreter*in mit mehr als 25 % der Anteile",
        ],
        [
          "UG oder GmbH",
          "„Unternehmen in Privatbesitz“",
          "Registrierungsnummer aus dem Handelsregister und Stadt des Registergerichts. Zur USt-IdNr. widerspricht sich der Leitfaden: im Text optional, in der Übersicht erforderlich. Halte sie bereit.",
          "Name und Adresse genau wie im Handelsregister; Vertreter*in mit Wohnsitz im Land der Registrierung",
        ],
      ],
      fuss:
        "Quelle: „TikTok Shop Onboarding-Leitfaden“ der TikTok Seller University, Stand 11.11.2026. TikTok nennt e. K., UG und GmbH nicht beim Namen; die Zuordnung in der ersten Spalte ist unsere und folgt den Definitionen im Leitfaden. Im Zweifel fragst du den Verkäufer-Support von TikTok, bevor du den Antrag abschickst. Ob mit „Persönliche Steuernummer“ die Steuernummer vom Finanzamt oder die Steuer-Identifikationsnummer gemeint ist, schreibt TikTok nicht; halte beide bereit. Den Kontotyp kannst du laut TikTok nach der Genehmigung nicht mehr ändern.",
      link: { to: "/ust-id-beantragen", label: "Gratis: USt-ID beantragen, wenn dein Kontotyp sie verlangt" },
    },
    urgency:
      "TikTok Shop läuft in Deutschland seit März 2025; laut TikTok verkaufen dort über 25.000 Händler (Stand 24.03.2026). Für die Registrierung verlangt TikTok, dass Name und Registrierungsnummer genau so dastehen wie im Handelsregister. Die Prüfung eines Antrags dauert laut TikTok in der Regel zwei bis drei Arbeitstage. Den Kontotyp kannst du nach der Genehmigung nicht mehr ändern; dafür ist ein neuer Antrag nötig. Ein Begriff ist leicht zu verwechseln: „Einzelunternehmer*in“ meint bei TikTok ein Unternehmen, das im Handelsregister eingetragen ist. Für ein Kleingewerbe ohne Eintrag ist „Gewerbliche*r Verkäufer*in“ der passende Kontotyp.",
    outcomes: [
      "Der passende Kontotyp für deine Rechtsform, bevor du den Antrag abschickst",
      "Gewerbeanmeldung und Fragebogen bis zur Steuernummer, Teilseite für Teilseite",
      "Kosten der Verpackungslizenz vorab als Spanne, gratis im Rechner",
      "Bei Elektrogeräten vor dem Einkauf nachschlagen, ob die Marke bei der stiftung ear registriert ist",
      "Die Meldegrenze der Plattform im Blick: 30 Verkäufe oder 2.000 € im Jahr",
    ],
    tabelle: {
      titel: "Die Anmeldungen in der Reihenfolge, in der du sie brauchst",
      lead: "Acht Schritte vom Gewerbeschein bis zur laufenden Meldung. Zu jedem Schritt stehen der Zeitpunkt, die zuständige Stelle und die Rechtsgrundlage.",
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
          schritt: "3. Kleinunternehmer: ja oder nein",
          wann: "im Fragebogen",
          wo: "Finanzamt",
          grundlage: "§ 19 UStG",
          hilfe: { to: "/tools/schwellen-check", label: "Schwellen-Check" },
        },
        {
          schritt: "4. USt-IdNr., wenn dein Kontotyp sie verlangt",
          wann: "im Fragebogen mit beantragen oder später online",
          wo: "Bundeszentralamt für Steuern",
          grundlage: "§ 27a UStG",
          hilfe: { to: "/ust-id-beantragen", label: "Gratis: USt-ID beantragen" },
        },
        {
          schritt: "5. Im Seller Center registrieren",
          wann: "sobald Steuernummer, Geschäftsadresse, Ausweis und Adressnachweis bereitliegen; TikTok prüft in der Regel zwei bis drei Arbeitstage",
          wo: "TikTok Seller Center",
          grundlage: "Vorgaben von TikTok, Stand 11.11.2026",
          hilfe: { to: "/tiktok-shop-checkliste", label: "Gratis: TikTok-Shop-Checkliste" },
        },
        {
          schritt: "6. Verpackungsregister LUCID und duales System",
          wann: "vor dem ersten Bereitstellen verpackter Ware",
          wo: "Zentrale Stelle Verpackungsregister; Vertrag mit einem dualen System",
          grundlage: "§§ 6 und 7 VerpackDG",
          hilfe: { to: "/tools/lucid-wizard", label: "Gratis: Verpackungslizenz-Rechner" },
        },
        {
          schritt: "7. WEEE-Registrierung (nur Elektro- und Elektronikgeräte)",
          wann: "bevor ein Gerät in Verkehr gebracht wird",
          wo: "stiftung ear",
          grundlage: "§ 6 ElektroG",
          hilfe: { to: "/tools/weee-check", label: "Gratis: WEEE-Check" },
        },
        {
          schritt: "8. Plattform-Meldung (DAC7)",
          wann: "laufend; du musst nichts beantragen",
          wo: "TikTok meldet Verkäufer und ihre Umsätze an die Steuerbehörden",
          grundlage: "§ 4 Abs. 5 PStTG: keine Meldung nur bei weniger als 30 Verkäufen und weniger als 2.000 € im Jahr",
          hilfe: { to: "/guides/dac7", label: "Guide: DAC7" },
        },
      ],
      fuss:
        "Allgemeine Übersicht, keine Beratung im Einzelfall. Je nach Ware kommen weitere Pflichten dazu, etwa Angaben zur Produktsicherheit oder Regeln für Batterien, Kosmetik und Lebensmittel.",
    },
    beispiel: {
      titel: "Beispiel: Was kostet die Provision bei einer Bestellung über 24,99 €?",
      text:
        "Ein Kunde bestellt ein Produkt für 24,99 € und zahlt 3,99 € Versand. TikTok rechnet die Provision auf Warenwert und Versandkosten des Kunden zusammen. Wir rechnen hier mit 28,98 €, ohne Rabatt der Plattform und ohne Erstattung.",
      punkte: [
        "9 % (Satz in der EU): 28,98 € × 9 % = 2,61 €",
        "7 % (laut TikTok möglich bei Elektronik): 2,03 €",
        "4 % (neue Verkäufer, bis zu 60 Kalendertage): 1,16 €",
        "Bei 100 solchen Bestellungen: rund 261 € mit 9 %, rund 116 € mit 4 %",
        "TikTok knüpft die 4 % an Bedingungen, unter anderem: erster TikTok Shop in der EU, mindestens fünf aktive Produkte hochladen und die Aufgabe innerhalb von 15 Tagen nach der Shop-Aktivierung abschließen.",
      ],
      hinweis:
        "Sätze aus der „TikTok Shop EU-Kommissionsrichtlinie“ (Stand 28.01.2026). Die Provision enthält laut TikTok bereits die Umsatzsteuer. Nicht eingerechnet sind Wareneinsatz, Versand, Verpackungslizenz und Provisionen für Creator. Maßgeblich ist die Abrechnung in deinem Seller Center.",
      link: { to: "/guides/tiktok-shop-starten", label: "Im Guide: Verkäufe, Gebühren und Provisionen buchen" },
    },
    wegHeading: "Dein Weg zum ersten Verkauf im TikTok Shop",
    weg: [
      { title: "Rolle, Alter und Produkte klären", description: "Verkaufst du eigene Ware, Handelsware oder empfiehlst du nur Produkte? Davon hängt ab, welche der nächsten Schritte für dich gelten.", meta: "Gratis: TikTok-Shop-Checkliste" },
      { title: "Gewerbe, Fragebogen, Kleinunternehmer", description: "Gewerbe beim Gewerbeamt anmelden, den Fragebogen innerhalb eines Monats über ELSTER abgeben. Die Entscheidung zur Kleinunternehmerregelung fällt im selben Formular.", meta: "Gewerbeanmeldung-Wizard · Fragebogen-Wizard" },
      { title: "Geschäftskonto und Produktpflichten", description: "Geschäftskonto für die Auszahlungen einrichten, dann LUCID und duales System vor dem ersten Paket. Bei Elektrogeräten kommt die Registrierung bei der stiftung ear dazu.", meta: "Gratis: Verpackungslizenz-Rechner · WEEE-Check" },
      { title: "Im Seller Center registrieren" },
      { title: "Creator-Affiliates und Provisionen" },
      { title: "Plattform-Meldung, EU-Verkäufe und Buchhaltung" },
    ],
    toolsTitel: "Drei Tools gratis. Der Rest im Cockpit.",
    toolsLead:
      "Den Verpackungslizenz-Rechner nutzt du frei und so oft du willst. Auch die TikTok-Shop-Checkliste und der WEEE-Check sind kostenlos, ohne Konto und ohne E-Mail-Adresse. Im Abo kommen die Wizards für Gewerbeanmeldung und Fragebogen dazu.",
    freeTools: [FT_TTS, FT_LUCID, FT_WEEE],
    tools: [
      { slug: "gewerbeanmeldung-wizard", title: "Gewerbeanmeldung-Wizard", desc: "Tätigkeit „Online-Handel“ richtig angeben." },
      { slug: "fse-wizard", title: "Fragebogen-Wizard", desc: "Zur Steuernummer, Teilseite für Teilseite in der Reihenfolge von ELSTER." },
      { slug: "schwellen-check", title: "Schwellen-Check", desc: "Kleinunternehmer- und EU-Lieferschwelle im Blick." },
    ],
    ratgeber: [
      { to: "/ratgeber/tiktok-shop-verkaeufer-werden", title: "TikTok Shop: Verkäufer werden", desc: "Die ausführliche Anleitung mit allen Voraussetzungen." },
      { to: "/ratgeber/lucid-verpackungsregister-anmelden", title: "LUCID anmelden", desc: "Verpackungsregister Schritt für Schritt." },
      { to: "/ratgeber/oss-anmeldung", title: "OSS-Anmeldung", desc: "Verkauf an Privatkunden im EU-Ausland." },
      { to: "/ratgeber/tiktok-shop-affiliate-steuern", title: "TikTok-Shop-Affiliate & Steuern", desc: "Für Creator: Provisionen und Samples richtig erfassen." },
      { to: "/influencer", title: "Für Creator und Affiliates", desc: "Unsere Seite für alle, die mit Provisionen und Kooperationen verdienen." },
    ],
    guides: [
      { to: "/guides/tiktok-shop-starten", title: "Guide: TikTok Shop starten", desc: "Alle Schritte bis zum ersten Verkauf." },
      { to: "/guides/tiktok-shop-launch", title: "TikTok Shop Brand-Launch", desc: "Listings, Live-Shopping und Affiliate-Programm." },
      { to: "/guides/dac7", title: "Guide: DAC7", desc: "Was Plattformen über Verkäufer melden." },
      { to: "/guides/creator-setup", title: "Creator / Influencer Setup", desc: "Für Affiliates und Live-Seller." },
    ],
    faq: [
      {
        q: "Brauche ich ein Gewerbe für den TikTok Shop?",
        a: "Wer auf Dauer und mit Gewinnabsicht Ware verkauft, betreibt in der Regel ein Gewerbe und zeigt es nach § 14 GewO gleichzeitig mit dem Start beim Gewerbeamt an. TikTok verlangt bei der Registrierung die Rechtsform, die deiner Gewerbeanmeldung entspricht; von der GbR fordert der Leitfaden den Nachweis der Gewerbeanmeldung ausdrücklich.",
      },
      {
        q: "Brauche ich für den TikTok Shop eine USt-IdNr.?",
        a: "Das hängt vom Kontotyp ab. Laut Onboarding-Leitfaden von TikTok (Stand 11.11.2026) ist die USt-IdNr. in Deutschland für den Kontotyp „Einzelunternehmer*in“, also das im Handelsregister eingetragene Einzelunternehmen, und für die GbR erforderlich. Der Kontotyp „Gewerbliche*r Verkäufer*in“ für Gewerbe ohne Handelsregistereintrag kommt ohne USt-IdNr. aus. Für Kapitalgesellschaften nennt TikTok sie an einer Stelle optional und in der Übersicht erforderlich; halte sie bereit.",
      },
      {
        q: "Kann ich als Kleinunternehmer im TikTok Shop verkaufen?",
        a: "Der Leitfaden von TikTok erwähnt die Kleinunternehmerregelung nicht; der Kontotyp richtet sich nach Rechtsform und Handelsregister. Steuerlich gilt die Regelung, wenn dein Umsatz im Vorjahr höchstens 25.000 € betrug und im laufenden Jahr 100.000 € nicht übersteigt (§ 19 UStG); im ersten Jahr darf er 25.000 € nicht übersteigen. Wer auf die Regelung verzichtet, ist daran mindestens fünf Kalenderjahre gebunden. Ob sich der Verzicht für dich lohnt, hängt von deinem Einkauf ab und ist eine Frage für den Einzelfall.",
      },
      {
        q: "Welchen Ausweis akzeptiert TikTok?",
        a: "Für Deutschland führt der Leitfaden Reisepass, Personalausweis und den unbefristeten Aufenthaltstitel auf; den Führerschein markiert er als nicht akzeptiert. Du lädst Vorder- und Rückseite hoch und nimmst danach ein Selfie oder ein kurzes Video für die Gesichtsverifizierung auf. Dazu kommt ein Adressnachweis, der jünger als drei Monate ist. Als in allen Ländern akzeptiert nennt TikTok eine Rechnung für Wasser, Strom, Gas, Handy oder Internet oder einen Kontoauszug.",
      },
      {
        q: "Wie hoch ist die Provision im TikTok Shop?",
        a: "Laut EU-Kommissionsrichtlinie von TikTok (Stand 28.01.2026) beträgt die Provision innerhalb der EU 9 % auf abgeschlossene Bestellungen, gerechnet auf Warenwert und Versandkosten des Kunden. Für Elektronik kann laut TikTok ein Satz von 7 % gelten. Neue Verkäufer können für bis zu 60 Kalendertage 4 % bekommen, wenn sie die Bedingungen von TikTok erfüllen. Wird eine Bestellung vollständig erstattet, erstattet TikTok auch die Provision.",
      },
      {
        q: "Meldet TikTok meine Umsätze an das Finanzamt?",
        a: "Plattformen melden Verkäufer und ihre Umsätze nach dem Plattformen-Steuertransparenzgesetz an die Steuerbehörden. Ausgenommen ist nur, wer im Jahr weniger als 30 Verkäufe und zusammen weniger als 2.000 € erzielt (§ 4 Abs. 5 PStTG). Beantragen musst du dafür nichts.",
      },
      {
        q: "Wie lange dauert die Freischaltung im Seller Center?",
        a: "Laut TikTok dauert die Überprüfung eines Antrags in der Regel zwei bis drei Arbeitstage. Die Steuernummer brauchst du schon vorher; sie kommt vom Finanzamt, nachdem du den Fragebogen zur steuerlichen Erfassung abgegeben hast.",
      },
      {
        q: "Ab welchem Alter kann ich im TikTok Shop verkaufen?",
        a: "TikTok Shop ist laut TikTok nur für Personen ab 18 Jahren verfügbar.",
      },
      {
        q: "Ich bin nur Affiliate und verkaufe keine eigene Ware. Was gilt für mich?",
        a: "Kontotyp, Verpackungsregister und WEEE betreffen Verkäufer. Affiliate-Provisionen sind laut Finanzverwaltung Betriebseinnahmen; wer regelmäßig darüber verdient, ist in der Regel gewerblich tätig und umsatzsteuerlich Unternehmer. Die Schritte dafür stehen auf unserer Seite für Creator und im Ratgeber zu TikTok-Shop-Affiliate und Steuern.",
      },
      {
        q: "Ersetzt GründerX meinen Steuerberater?",
        a: "Nein. Felix führt dich durch Formulare, Registrierungen und Fristen. Für Gestaltungsfragen im Einzelfall bleibt der Steuerberater zuständig.",
      },
    ],
    einwaende: [
      {
        q: "Ich verkaufe erst mal nebenbei. Muss ich das alles jetzt schon machen?",
        a: "Die Reihenfolge ist dieselbe, egal wie klein du anfängst: Das Gewerbe zeigst du gleichzeitig mit dem Start an (§ 14 GewO), ins Verpackungsregister trägst du dich vor dem ersten Paket ein (§ 6 VerpackDG). Die Checkliste zeigt dir, welche Schritte für dich gelten und welche wegfallen, zum Beispiel WEEE, wenn du keine Elektrogeräte verkaufst.",
      },
      {
        q: "Die Seller University von TikTok erklärt das doch schon.",
        a: "Sie erklärt die Registrierung bei TikTok, und an ihr haben wir diese Seite geprüft. Verpackungsregister, WEEE, der Fragebogen zur steuerlichen Erfassung und die Kleinunternehmerregelung kommen im Onboarding-Leitfaden (Stand 11.11.2026) nicht vor. Diese Schritte liegen bei Gewerbeamt, Finanzamt und Zentraler Stelle Verpackungsregister. Hier stehen sie in einer Reihenfolge, je mit Rechtsgrundlage.",
      },
      {
        q: "Ich verkaufe schon oder habe den falschen Kontotyp gewählt.",
        a: "Dann fängst du in der Mitte an. Die Checkliste fragt ab, was du schon hast, und listet, was offen ist. Für einen anderen Kontotyp verlangt TikTok einen neuen Antrag. Deine Anmeldungen bei Gewerbeamt, Finanzamt und Verpackungsregister hängen nicht am TikTok-Konto und bleiben bestehen.",
      },
    ],
    quellen: [TT_SU, TT_PROVISION, TT_NEWS, Q_GEWO, Q_AO138, Q_USTG19, Q_USTG27A, Q_VERPACK6, Q_VERPACK7, Q_ELEKTRO6, PSTTG, Q_BZST_USTID, Q_ZSVR, Q_EAR, HESSEN],
    ctaTitle: "Dein TikTok Shop, in der richtigen Reihenfolge angemeldet",
    ctaText: "Gewerbe, Fragebogen, Registrierung im Seller Center, LUCID und WEEE, plus alle weiteren Tools und Guides im Abo, monatlich kündbar.",
  },
  {
    slug: "amazon-haendler",
    seoTitle: "Amazon-Händler werden: Pflichten in Reihenfolge | GründerX",
    seoDescription:
      "Auf Amazon verkaufen: Gewerbe, Steuernummer, USt-IdNr., LUCID, WEEE und OSS in der richtigen Reihenfolge, mit Rechtsgrundlagen und Gratis-Rechner.",
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
    toolsLead: "Den Rechner nutzt du frei und so oft du willst. WEEE-Check und USt-ID-Check sind ebenfalls kostenlos, ohne Konto und ohne E-Mail-Adresse. Im Abo kommen die Wizards für Gewerbeanmeldung und Fragebogen und die Amazon-Werkzeuge für die Buchhaltung dazu.",
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
    ctaText: "Gewerbe, Fragebogen, USt-IdNr., LUCID, WEEE und OSS, plus alle weiteren Tools und Guides im Abo, monatlich kündbar.",
  },

  // ── 4. Unter 18 gründen (12–17 Jahre & Eltern) ─────────────────────────
  {
    slug: "u18-gruenden",
    seoTitle: "Unter 18 gründen (12 bis 17): Regeln & Eltern | GründerX",
    seoDescription: "Ab 12 bis 17 eine Website, App oder ein Gewerbe starten: Was ohne Amt geht, wie Eltern zustimmen und wann das Familiengericht (§ 112 BGB) prüft.",
    eyebrow: "Für 12 bis 17 Jahre · Jugendliche & Eltern",
    heading: "Unter 18 starten. Klar für dich und deine Eltern.",
    heroTitle: "Unter 18 starten.",
    heroAccent: "Klar für dich und deine Eltern.",
    screen: "gewerbe",
    warumTitel: "Erst bauen und lernen, dann sauber mit den Eltern anmelden.",
    lead: "Du bist zwischen 12 und 17 und willst deine erste Website, eine App oder ein kleines Projekt aufbauen? Wir zeigen dir und deinen Eltern in ruhiger Reihenfolge, was sofort geht und wann das Familiengericht nach § 112 BGB dazukommt.",
    urgency: "Viele Jugendliche hängen an unsicheren Forenantworten oder gesperrten Zahlungskonten. Mit klaren Fakten für Jugendliche und Eltern wisst ihr vorher genau, welche Schritte zuerst kommen und was warten kann.",
    stand: { text: "Stand: 25.11.2026", iso: "2026-11-25" },
    antwort: {
      frage: "Darf man unter 18 in Deutschland ein eigenes Projekt oder Gewerbe starten?",
      text: "Lernen, eine Website oder App bauen und testen darfst du sofort ohne Anmeldung. Sobald du dauerhaft mit Gewinnabsicht Geld verdienen willst, müssen deine Eltern zustimmen und für ein selbstständiges Gewerbe prüft das Familiengericht nach § 112 BGB.",
    },
    faelle: {
      eyebrow: "Überblick nach Phase (Stand 25.11.2026)",
      titel: "Was unter 18 sofort geht und wann Amt und Gericht dazukommen",
      lead: "Konkrete Trennung für Jugendliche zwischen 12 und 17 Jahren und ihre Eltern.",
      kopf: ["Vorhaben", "Gewerbe nötig?", "Eltern / Gericht", "Typische Kosten"],
      zeilen: [
        ["Website oder App bauen & testen (ohne Einnahmen)", "Nein", "Eltern informieren", "0 € bis ~12 €/Jahr Domain"],
        ["Regelmäßige eigene Einnahmen (Gewerbe auf deinen Namen)", "Ja (§ 14 GewO)", "Eltern + Familiengericht (§ 112 BGB)", "ca. 20 bis 65 € Gewerbe + Gerichtsgebühr"],
        ["App Store / Stripe / TikTok Shop Account", "Je nach Plattform", "Viele Zahlungsanbieter erst ab 18", "Bedingungen vor Launch prüfen"],
      ],
      fuss: "Stand 25.11.2026. Quellen: § 112 BGB, § 14 GewO. Software zur Orientierung, keine Rechtsberatung.",
      link: { to: "/quiz/u18-check", label: "U18-Check in 45 Sekunden machen" },
    },
    outcomes: [
      "Klare Trennung: Was du heute schon ohne Gewerbe bauen und testen darfst",
      "Komplette Eltern- und Familiengericht-Checkliste (§ 112 BGB) mit ausfüllbarer Vorlage",
      "Realistische Übersicht zu Altersgrenzen bei App Store, Stripe, PayPal und TikTok",
      "Familienversicherung und Kleinunternehmerregelung verständlich erklärt",
    ],
    wegHeading: "Dein Weg unter 18 in der richtigen Reihenfolge",
    weg: [
      { title: "Idee bauen & testen", description: "Website, App oder erstes Produkt aufbauen, bevor der erste Euro fließt.", meta: "Sofort ohne Amt" },
      { title: "Eltern einbinden", description: "Konzept, Zeitaufwand neben der Schule und Kosten gemeinsam klären.", meta: "Vor dem Start" },
      { title: "Antrag beim Familiengericht (§ 112 BGB)", description: "Nur nötig, wenn du ein eigenes Gewerbe auf deinen Namen führen willst.", meta: "Vorlage im Guide" },
      { title: "Gewerbeanmeldung & Finanzamt", description: "GewA1-Formular und Fragebogen zur steuerlichen Erfassung binnen eines Monats.", meta: "Nach Genehmigung" },
    ],
    freeTools: [
      { to: "/gruendungskosten-rechner", title: "Gründungskosten-Rechner", desc: "Echte Gebühren für Start und Anmeldung auf einen Blick." },
      { to: "/rechtsform-finden", title: "Rechtsform-Finder", desc: "Einzelunternehmen und Freiberuf einfach vergleichen." },
      { to: "/tools/brand-check", title: "Brand-Check", desc: "Projektname gegen Marken und Domains vorab prüfen." },
    ],
    tools: [
      { slug: "gewerbe-check", title: "Gewerbe-Check", desc: "Prüfen, ob deine Idee überhaupt ein Gewerbe braucht." },
      { slug: "gewerbeanmeldung-wizard", title: "Gewerbeanmeldung-Wizard", desc: "Ausfüllhilfe für das Formular GewA1." },
      { slug: "steuer-abc", title: "Steuer-ABC", desc: "Grundbegriffe ohne Fachchinesisch erklärt." },
    ],
    ratgeber: [
      { to: "/ratgeber/einzelunternehmen-gruenden-gewerbe-freiberufler", title: "Einzelunternehmen gründen", desc: "Ablauf, Kosten und Steuern einfach erklärt." },
      { to: "/ratgeber/kleinunternehmer-2026", title: "Kleinunternehmerregelung 2026", desc: "Die Grenzen 25.000 € und 100.000 € im Überblick." },
    ],
    guides: [
      { to: "/guides/einzelunternehmen-gruendung", title: "Guide: Einzelunternehmen (mit U18-Spezial)", desc: "Inklusive ausfüllbarer Vorlage für das Familiengericht." },
      { to: "/guides/erste-webseite-seo", title: "Guide: Erste Webseite erstellen", desc: "Schritt für Schritt online gehen." },
      { to: "/guides/eigene-app-launchen", title: "Guide: Eigene App launchen", desc: "Von der ersten Idee bis zum Store-Review." },
    ],
    faq: [
      { q: "Brauche ich zum Website- oder App-Bauen schon ein Gewerbe?", a: "Nein. Solange du nur baust, lernst und noch keine dauerhaften Einnahmen mit Gewinnabsicht erzielst, brauchst du kein Gewerbe." },
      { q: "Warum müssen meine Eltern immer dabei sein?", a: "Bis zum 18. Geburtstag vertreten dich deine Eltern rechtlich. Verträge, Anträge und das Verfahren nach § 112 BGB beim Familiengericht laufen nur mit ihrer Zustimmung." },
      { q: "Kostet das Familiengericht etwas?", a: "Es fallen moderate Gerichtsgebühren an, je nach Gericht häufig im niedrigen zweistelligen bis unteren dreistelligen Bereich. Genaue Kosten nennt das zuständige Amtsgericht." },
    ],
    quellen: [
      { label: "§ 112 BGB: Selbstständiger Betrieb eines Erwerbsgeschäfts", url: `${GII}/bgb/__112.html` },
      Q_GEWO,
      Q_AO138,
      Q_USTG19,
    ],
    ctaTitle: "Gemeinsam mit deinen Eltern sauber starten",
    ctaText: "Alle Guides für Website, App, Creator und U18-Anmeldung Schritt für Schritt an einem Ort.",
  },

  // ── 5. Studierende & Azubis (18–25 Jahre) ──────────────────────────────
  {
    slug: "studenten-azubis",
    seoTitle: "Gründen im Studium & Ausbildung (18 bis 25) | GründerX",
    seoDescription: "Als Student oder Azubi nebenbei gründen: Familienversicherung, Werkstudenten-Grenzen, BAföG, Gewerbeanmeldung und Kleinunternehmerregelung 2026.",
    eyebrow: "Für 18 bis 25 Jahre · Studium & Ausbildung",
    heading: "Neben Studium oder Ausbildung starten. Ohne böse Überraschung.",
    heroTitle: "Neben Studium oder Ausbildung starten.",
    heroAccent: "Ohne böse Überraschung.",
    screen: "schwellen",
    warumTitel: "Als Student oder Azubi zählen Grenzen, die andere nicht haben.",
    lead: "Familienversicherung, BAföG, Ausbildungsbetrieb und Kleinunternehmerregelung: Wir sortieren die Reihenfolge, damit dein erstes Projekt neben Hörsaal oder Ausbildung sauber läuft.",
    urgency: "Ein paar Hundert Euro Gewinn zu viel im falschen Monat können bei der Familienversicherung oder beim BAföG teure Folgen haben. Wer die Grenzen vorher kennt, plant ruhig und sicher.",
    stand: { text: "Stand: 25.11.2026", iso: "2026-11-25" },
    antwort: {
      frage: "Darf ich im Studium oder in der Ausbildung ein Gewerbe anmelden?",
      text: "Ja. Im Studium brauchst du keine Erlaubnis der Hochschule, musst aber Krankenkasse (Familienversicherung / Werkstudentenstatus) und ggf. BAföG-Freibeträge im Blick behalten. In der Ausbildung prüfst du zuerst deinen Ausbildungsvertrag und informierst den Betrieb.",
    },
    outcomes: [
      "Klarer Überblick über Familienversicherung, 20-Stunden-Regel und BAföG-Anrechnung",
      "Schnelle Entscheidung zwischen Freiberuf, Einzelunternehmen und Kleinunternehmerregelung",
      "Fragebogen zur steuerlichen Erfassung Zeile für Zeile ausgefüllt",
      "Erste eigene Website, App oder erster Online-Shop als fertiges Ziel",
    ],
    wegHeading: "Dein Start neben Studium oder Ausbildung",
    weg: [
      { title: "Grenzen prüfen", description: "Familienversicherung, BAföG und ggf. Ausbildungsvertrag vorher checken.", meta: "Zuerst" },
      { title: "Rechtsform & Anmeldung", description: "Freiberuf oder Einzelunternehmen anmelden.", meta: "Ab ca. 20 bis 65 € Amt" },
      { title: "ELSTER-Fragebogen", description: "Binnen eines Monats abgeben und Kleinunternehmerregelung prüfen.", meta: "1 Monat Frist" },
      { title: "Erste Einnahme sauber verbuchen", description: "Getrenntes Konto und einfache EÜR ab dem ersten Beleg.", meta: "Laufend" },
    ],
    freeTools: [
      { to: "/rechtsform-finden", title: "Rechtsform-Finder", desc: "Einzelunternehmen, Freiberuf oder GbR vergleichen." },
      { to: "/gruendungskosten-rechner", title: "Gründungskosten-Rechner", desc: "Startkosten realistisch berechnen." },
      { to: "/elster-zertifikat-beantragen", title: "ELSTER-Zertifikat-Guide", desc: "Zugang zum Finanzamt-Portal ohne Umwege anlegen." },
    ],
    tools: [
      { slug: "schwellen-check", title: "Schwellen-Check", desc: "Alle wichtigen Umsatz- und Meldegrenzen im Blick." },
      { slug: "fse-wizard", title: "Fragebogen-Begleiter", desc: "ELSTER-Fragebogen Zeile für Zeile ausfüllen." },
      { slug: "brutto-netto-solo", title: "Brutto-Netto-Rechner", desc: "Prüfen, was vom Gewinn wirklich übrig bleibt." },
    ],
    ratgeber: [
      { to: "/ratgeber/einzelunternehmen-gruenden-gewerbe-freiberufler", title: "Einzelunternehmen gründen", desc: "Alle Schritte von Gewerbeamt bis Finanzamt." },
      { to: "/ratgeber/kleinunternehmer-2026", title: "Kleinunternehmer 2026", desc: "Wann sich die 25.000-€-Regel lohnt." },
    ],
    guides: [
      { to: "/guides/einzelunternehmen-gruendung", title: "Guide: Einzelunternehmen gründen", desc: "Der Standardweg für den Start allein." },
      { to: "/guides/freiberufler-anmelden", title: "Guide: Freiberufler anmelden", desc: "Ohne Gewerbeamt für Design, IT, Text und Beratung." },
      { to: "/guides/eigene-app-launchen", title: "Guide: Eigene App launchen", desc: "Vom ersten Code bis in die Stores." },
    ],
    faq: [
      { q: "Verliere ich meine Familienversicherung durch ein Gewerbe?", a: "Solange dein regelmäßiges monatliches Gesamteinkommen unter der gesetzlichen Grenze deiner Krankenkasse bleibt und du nicht hauptberuflich selbstständig bist, bleibst du familienversichert. Vor dem Start kurz bei der eigenen Kasse nachfragen." },
      { q: "Muss ich als Student einen Steuerberater bezahlen?", a: "Bei kleinen Umsätzen und Einnahmen-Überschuss-Rechnung (EÜR) kommen viele am Anfang ohne Steuerberater aus. Sobald Auslandsgeschäfte oder hohe Umsätze dazukommen, lohnt sich eine fachliche Prüfung." },
    ],
    quellen: [Q_GEWO, Q_AO138, Q_USTG19, PSTTG],
    ctaTitle: "Dein erstes Projekt neben Studium oder Ausbildung",
    ctaText: "Kurze Schritte, klare Grenzen und alle Guides für Website, App, Shop und Steuern.",
  },

  // ── 6. Nebengewerbe neben dem Hauptjob ─────────────────────────────────
  {
    slug: "nebengewerbe",
    seoTitle: "Nebengewerbe neben dem Job anmelden 2026 | GründerX",
    seoDescription: "Nebengewerbe neben dem Hauptjob starten: Arbeitgeber informieren, Krankenkasse, Gewerbeamt, ELSTER-Fragebogen und 24.500 € Freibetrag richtig verstehen.",
    eyebrow: "Für Angestellte · Nebengewerbe",
    heading: "Tagsüber Job. Abends dein eigenes Projekt.",
    heroTitle: "Tagsüber Job.",
    heroAccent: "Abends dein eigenes Projekt.",
    screen: "fse",
    warumTitel: "70 % aller Gründungen starten nebenberuflich.",
    lead: "Du willst erst neben deinem Hauptjob testen, ob dein Produkt oder deine Dienstleistung trägt? Wir zeigen dir genau, was du dem Arbeitgeber, der Krankenkasse und dem Finanzamt in welcher Reihenfolge meldest.",
    urgency: "Der häufigste Irrtum im Nebengewerbe: Viele denken, bis 24.500 € Gewinn falle gar keine Steuer an, und vergessen die Einkommensteuer auf Gehalt plus Gewinn. Mit klarem Überblick legst du von Anfang an richtig zurück.",
    stand: { text: "Stand: 25.11.2026", iso: "2026-11-25" },
    antwort: {
      frage: "Was brauche ich zuerst für ein Nebengewerbe neben meinem Hauptjob?",
      text: "Zuerst prüfst du deinen Arbeitsvertrag und informierst den Arbeitgeber. Danach meldest du das Gewerbe beim Gewerbeamt an (§ 14 GewO), gibst innerhalb eines Monats den Fragebogen über ELSTER ab (§ 138 AO) und gibst deiner Krankenkasse kurz Bescheid.",
    },
    outcomes: [
      "Arbeitsvertrag, Arbeitgeber-Mitteilung und Krankenkasse sauber geklärt",
      "Unterschied zwischen 24.500 € Gewerbesteuer-Freibetrag und Einkommensteuer verstanden",
      "Fragebogen zur steuerlichen Erfassung ohne Hänger in ELSTER erledigt",
      "Alle Steuer-Fristen und Rücklagen im eigenen Kalender",
    ],
    wegHeading: "Nebengewerbe in 5 klaren Schritten",
    weg: [
      { title: "Arbeitsvertrag & Arbeitgeber", description: "Keine Konkurrenz zum Arbeitgeber, Nebentätigkeit sachlich anzeigen.", meta: "Zuerst" },
      { title: "Krankenkasse informieren", description: "Solange der Hauptjob überwiegt, bleibt es meist bei den regulären Beiträgen.", meta: "Vor Start" },
      { title: "Gewerbe anmelden (GewA1)", description: "Beim lokalen Gewerbeamt oder online im Portal deines Bundeslands.", meta: "ca. 20 bis 65 €" },
      { title: "ELSTER-Fragebogen abgeben", description: "Innerhalb eines Monats nach Start, inklusive Kleinunternehmer-Wahl.", meta: "1 Monat Frist" },
      { title: "Rücklage & Belege ordnen", description: "Separates Konto und monatliche Ablage für die EÜR.", meta: "Ab Tag 1" },
    ],
    freeTools: [
      { to: "/rechtsform-finden", title: "Rechtsform-Finder", desc: "Prüfen, ob Einzelunternehmen oder UG passt." },
      { to: "/gruendungskosten-rechner", title: "Gründungskosten-Rechner", desc: "Alle einmaligen und laufenden Kosten vorab rechnen." },
      { to: "/elster-zertifikat-beantragen", title: "ELSTER-Zertifikat-Guide", desc: "Zugang für den Fragebogen direkt einrichten." },
    ],
    tools: [
      { slug: "gewerbeanmeldung-wizard", title: "Gewerbeanmeldung-Wizard", desc: "GewA1 sauber vorbereiten." },
      { slug: "fse-wizard", title: "Fragebogen-Begleiter", desc: "ELSTER Zeile für Zeile ausfüllen." },
      { slug: "steuerkalender", title: "Steuerkalender", desc: "Keine Abgabefrist neben dem Hauptjob verpassen." },
    ],
    ratgeber: [
      { to: "/ratgeber/einzelunternehmen-gruenden-gewerbe-freiberufler", title: "Einzelunternehmen gründen", desc: "Gewerbe vs. Freiberuf und alle Anmeldungen." },
      { to: "/ratgeber/kleinunternehmer-2026", title: "Kleinunternehmer 2026", desc: "25.000 € / 100.000 € und 5-Jahres-Bindung." },
    ],
    guides: [
      { to: "/guides/einzelunternehmen-gruendung", title: "Guide: Einzelunternehmen gründen", desc: "Vom ersten Schritt bis zum fertigen Setup." },
      { to: "/guides/elster-fse-fillout", title: "Guide: ELSTER-Fragebogen ausfüllen", desc: "Ohne Behörden-Deutsch durch alle Zeilen." },
      { to: "/guides/buchhaltung-setup", title: "Guide: Buchhaltung einrichten", desc: "In einer Stunde für das ganze Jahr aufgestellt." },
    ],
    faq: [
      { q: "Muss ich ab dem ersten Euro Steuern auf mein Nebengewerbe zahlen?", a: "Dein Gewinn aus dem Nebengewerbe wird bei der Einkommensteuer zu deinem Gehalt addiert. Der Freibetrag von 24.500 € (§ 11 GewStG) gilt nur für die Gewerbesteuer." },
      { q: "Darf mein Arbeitgeber das Nebengewerbe verbieten?", a: "Nur bei konkreten Gründen wie direkter Konkurrenz, Verstoß gegen das Arbeitszeitgesetz oder Beeinträchtigung deiner Hauptarbeit. Eine rechtzeitige Anzeige im Vertrag prüfen." },
    ],
    quellen: [Q_GEWO, Q_AO138, Q_USTG19, { label: "§ 11 GewStG: 24.500 € Freibetrag", url: `${GII}/gewstg/__11.html` }, PSTTG],
    ctaTitle: "Dein Nebengewerbe ohne Feierabend-Chaos",
    ctaText: "In kurzen 10-Minuten-Schritten abends erledigen und jeden Fortschritt im Cockpit abhaken.",
  },

  // ── 7. Eigene Website oder App starten ─────────────────────────────────
  {
    slug: "webseite-und-app",
    seoTitle: "Eigene Website oder App starten & launchen (2026) | GründerX",
    seoDescription: "Von der Idee bis zur fertigen Website oder App im App Store und Play Store: Marken-Check, Impressum, SEO, Store-Accounts und Steuern auf Auszahlungen.",
    eyebrow: "Für Builder · Website & App",
    heading: "Deine eigene Website oder App. Von der Idee bis zum Launch.",
    heroTitle: "Deine eigene Website oder App.",
    heroAccent: "Von der Idee bis zum Launch.",
    screen: "dashboard",
    warumTitel: "Technik geht schnell. Die Hürden sitzen bei Stores, Recht und Steuern.",
    lead: "Ob du 15, 30 oder 60 bist: Mit unseren Guides kommst du Schritt für Schritt zu deiner fertigen Website oder eigenen App im Apple App Store und Google Play Store.",
    urgency: "Googles 12-Tester-Pflicht für neue Entwicklerkonten, Markenkonflikte beim App-Namen oder falsch gebuchte Apple-/Google-Auszahlungen kosten schnell Wochen. Hier arbeitest du alles in fester Reihenfolge ab.",
    stand: { text: "Stand: 25.11.2026", iso: "2026-11-25" },
    antwort: {
      frage: "Was brauche ich, bevor meine Website oder App live geht?",
      text: "Prüfe zuerst Name und Domain gegen Markenrechte (DPMA/EUIPO), lege Impressum und Datenschutz nach deutschem Recht an und beantrage für Apps rechtzeitig Apple Developer und Google Play Console (inkl. USt-IdNr. für Store-Auszahlungen).",
    },
    outcomes: [
      "Geprüfter Projektname ohne Konflikt bei Marken, Domains und App-Store-Namen",
      "Sauberes Setup für Impressum, Datenschutz und Sichtbarkeit bei Google & KI-Suche",
      "Kompletter Ablauf für Apple App Review, Google Play 12-Tester-Pflicht und Abo-Preise",
      "Steuerliche Grundlagen für App-Store- und Stripe-Auszahlungen (USt-IdNr. & ZM)",
    ],
    wegHeading: "In 5 Schritten zur fertigen Website oder App",
    weg: [
      { title: "Name & Domain prüfen", description: "Brand-Check gegen DPMA, EUIPO, Domains und App Store.", meta: "Gratis-Check" },
      { title: "Erste Version bauen", description: "Klares Ziel für Nutzer definieren und mobil zuerst umsetzen.", meta: "Fokus" },
      { title: "Recht & Pflichtseiten", description: "Impressum (§ 5 DDG), Datenschutz und Store-Angaben ergänzen.", meta: "Vor Launch" },
      { title: "Sichtbarkeit & Store-Review", description: "Search Console, Sitemap oder Apple/Google Review bestehen.", meta: "Go Live" },
      { title: "Einnahmen sauber anmelden", description: "Gewerbe/Freiberuf, USt-IdNr. und laufende Buchhaltung.", meta: "Vor Auszahlung" },
    ],
    freeTools: [
      { to: "/tools/brand-check", title: "Brand-Check", desc: "Name gegen DPMA, EUIPO, Domains und App Store prüfen." },
      { to: "/ust-id-beantragen", title: "USt-IdNr.-Guide", desc: "Wichtig für Auszahlungen von Apple und Google (Irland)." },
      { to: "/gruendungskosten-rechner", title: "Gründungskosten-Rechner", desc: "Store-Gebühren und Startkosten sauber kalkulieren." },
    ],
    tools: [
      { slug: "app-umsatz-rechner", title: "App-Store-Umsatz-Rechner", desc: "Provision (15 % / 30 %) und Auszahlung genau durchrechnen." },
      { slug: "brand-check", title: "Brand-Check", desc: "Marken-, Domain- und Handle-Prüfung in einem Lauf." },
      { slug: "rechnungs-generator", title: "Rechnungs-Generator", desc: "Saubere Rechnungen als PDF erstellen." },
    ],
    ratgeber: [
      { to: "/ratgeber/marke-anmelden-dpma", title: "Marke anmelden beim DPMA", desc: "Wann sich Markenschutz für App oder Website lohnt." },
      { to: "/ratgeber/einzelunternehmen-gruenden-gewerbe-freiberufler", title: "Gewerbe oder Freiberuf", desc: "Einordnung für Software, Apps und Webprojekte." },
    ],
    guides: [
      { to: "/guides/erste-webseite-seo", title: "Guide: Erste Webseite & SEO", desc: "Live bringen, indexieren und gefunden werden." },
      { to: "/guides/eigene-app-launchen", title: "Guide: Eigene App launchen", desc: "Apple App Store & Google Play komplett durchlaufen." },
      { to: "/guides/b2b-saas-spezifika", title: "Guide: SaaS & Software-Business", desc: "Preise, Abos und wiederkehrende Umsätze." },
    ],
    faq: [
      { q: "Muss ich programmieren können, um heute eine Website oder App zu starten?", a: "Nein. Im Guide zeigen wir sowohl den Weg mit KI- und No-Code-Werkzeugen als auch klassische Entwicklung, immer mit Fokus auf die echten Launch-Pflichten." },
      { q: "Brauche ich für App-Store-Einnahmen eine USt-IdNr.?", a: "Für Auszahlungen von Apple (Irland) oder Google (Irland) greift bei B2B-Leistungen häufig Reverse-Charge, wofür eine USt-IdNr. und eine Zusammenfassende Meldung (ZM) relevant sind." },
    ],
    quellen: [
      { label: "§ 5 DDG: Allgemeine Informationspflichten (Impressum)", url: `${GII}/ddg/__5.html` },
      Q_USTG27A,
      Q_AO138,
    ],
    ctaTitle: "Website oder App wirklich fertigstellen",
    ctaText: "Klick dich durch jeden Schritt im interaktiven Lern-Studio und hake deinen Launch ab.",
  },

  // ── 8. Gründen ab 50 bis 70 ────────────────────────────────────────────
  {
    slug: "gruenden-ab-50",
    seoTitle: "Gründen ab 50 bis 70: Freiberuf & Neustart | GründerX",
    seoDescription: "Mit 50 bis 70 selbstständig starten oder neben der Rente beraten: Freiberuf, Einzelunternehmen, Krankenversicherung und Steuern ruhig und ohne Fachjargon.",
    eyebrow: "Für 50 bis 70 Jahre · Erfahrung & Neustart",
    heading: "Jahrzehnte Erfahrung. Jetzt einfach in dein eigenes Angebot bringen.",
    heroTitle: "Jahrzehnte Erfahrung.",
    heroAccent: "Jetzt einfach in dein eigenes Angebot bringen.",
    screen: "rechnung",
    warumTitel: "Klare Schritte ohne Fachchinesisch und ohne Hektik.",
    lead: "Ob Beratung aus dem bisherigen Beruf, ein kleines Online-Angebot, Handwerk oder eine Tätigkeit neben bzw. vor der Rente: Wir führen dich ruhig, übersichtlich und mit großer Schrift durch jede Anmeldung.",
    urgency: "Wer mit 50 bis 70 startet, hat das Wissen längst im Kopf, scheut aber oft ELSTER, Krankenkassen-Regeln und Formulare. Genau dafür gibt es die feste Reihenfolge ohne Hektik.",
    stand: { text: "Stand: 25.11.2026", iso: "2026-11-25" },
    antwort: {
      frage: "Lohnt sich ein Start als Freiberufler oder Einzelunternehmen zwischen 50 und 70?",
      text: "Ja, denn du brauchst weder hohes Startkapital noch eine komplizierte GmbH. Viele starten schlank als Freiberufler oder Kleinunternehmer mit geringen laufenden Kosten und nutzen ihre Berufserfahrung direkt.",
    },
    outcomes: [
      "Schnell geklärt: Freiberuf ohne Gewerbeamt oder schlankes Einzelunternehmen",
      "Ruhige Schritt-für-Schritt-Hilfe für ELSTER-Fragebogen und erste PDF-Rechnung",
      "Klare Orientierung zu Krankenversicherung, Renten-Hinzuverdienst und Rücklagen",
      "Eigene Website oder Beratungsangebot ohne Technik-Überforderung",
    ],
    wegHeading: "Ruhig starten in 4 übersichtlichen Schritten",
    weg: [
      { title: "Freiberuf oder Gewerbe prüfen", description: "Beratung, Coaching, Lehre oder Gutachten sind oft freiberuflich.", meta: "15 Minuten" },
      { title: "Finanzamt anmelden", description: "Fragebogen in ELSTER mit unserer Zeilenhilfe ausfüllen.", meta: "1 Monat Frist" },
      { title: "Krankenkasse & Rente abstimmen", description: "Bei Teilzeit oder Rentenbezug kurz den eigenen Status bestätigen lassen.", meta: "Klarheit" },
      { title: "Erste Rechnung & Belege", description: "Rechnung als PDF erstellen und monatlich Belege sammeln.", meta: "Startklar" },
    ],
    freeTools: [
      { to: "/rechtsform-finden", title: "Rechtsform-Finder", desc: "Freiberuf und Einzelunternehmen direkt vergleichen." },
      { to: "/businessplan-erstellen", title: "Businessplan-Generator", desc: "Dein Angebot strukturiert in wenigen Minuten festhalten." },
      { to: "/gruendungskosten-rechner", title: "Kosten-Rechner", desc: "Alle einmaligen und laufenden Kosten vorab sehen." },
    ],
    tools: [
      { slug: "rechnungs-generator", title: "Rechnungs-Generator (PDF)", desc: "Pflichtangaben automatisch geprüft, als PDF speicherbar." },
      { slug: "fse-wizard", title: "Fragebogen-Begleiter", desc: "Verständliche Hilfe für jede ELSTER-Zeile." },
      { slug: "kv-optimizer", title: "Krankenversicherung-Check", desc: "GKV- und PKV-Einfluss beim Start überblicken." },
    ],
    ratgeber: [
      { to: "/ratgeber/einzelunternehmen-gruenden-gewerbe-freiberufler", title: "Gewerbe oder Freiberuf?", desc: "Die wichtigsten Unterschiede klar erklärt." },
      { to: "/ratgeber/brutto-netto-selbstaendig", title: "Brutto-Netto als Selbstständige:r", desc: "Was nach Steuern und Beiträgen bleibt." },
    ],
    guides: [
      { to: "/guides/freiberufler-anmelden", title: "Guide: Freiberufler anmelden", desc: "Der schlanke Start für Beratung & Expertise." },
      { to: "/guides/coach-1-on-1", title: "Guide: 1:1-Beratung aufbauen", desc: "Vom Angebot bis zur Abrechnung." },
      { to: "/guides/erste-webseite-seo", title: "Guide: Einfache eigene Webseite", desc: "Ohne Vorkenntnisse professionell gefunden werden." },
    ],
    faq: [
      { q: "Darf ich neben einer Altersrente selbstständig arbeiten?", a: "Bei der regulären Altersrente gelten in Deutschland seit 2023 keine Hinzuverdienstgrenzen mehr; bei Erwerbsminderungsrenten gelten eigene Grenzen. Steuerpflicht und Krankenversicherung prüfst du vorab mit Rententräger bzw. Steuerberater." },
      { q: "Ist GründerX auch ohne Technik-Vorwissen bedienbar?", a: "Ja. Jeder Guide besteht aus kurzen Einzelschritten, die du nacheinander abhakst. Wenn ein Begriff unklar ist, erklärt Felix ihn direkt im Gespräch." },
    ],
    quellen: [Q_AO138, Q_USTG19, { label: "§ 18 EStG: Einkünfte aus selbstständiger Arbeit (Freiberuf)", url: `${GII}/estg/__18.html` }],
    ctaTitle: "Ohne Hektik ins eigene Projekt starten",
    ctaText: "Übersichtliche Guides, verständliche Sprache und klare Checklisten für PC und Handy.",
  },

  // ── 9. US-Setup, US-LLC & Amex US ──────────────────────────────────────
  {
    slug: "us-setup",
    seoTitle: "US-LLC, US-Bank & Amex US aus Deutschland | GründerX",
    seoDescription: "Amex US per Global Transfer, Cloud Residence, Utility-Bill, Tello eSIM, US-Bankkonto (Wise-Risiko vs. Chase/Bank of America) und US-LLC ehrlich erklärt.",
    eyebrow: "International · US-Setup & Amex US",
    heading: "US-Setup & Amex US aus Deutschland. Mit echten Fakten statt Gerüchten.",
    heroTitle: "US-Setup & Amex US aus Deutschland.",
    heroAccent: "Mit echten Fakten statt Gerüchten.",
    screen: "dashboard",
    warumTitel: "Bei US-Banken und Amex US zählt jedes echte Detail.",
    lead: "Wir trennen sauber zwischen sicheren Wegen und Risiko-Abkürzungen: echte US-Wohnadresse (z. B. Cloud Residence), Utility-Bill, Tello eSIM für den Amex-Anruf, Chase/Bank of America vs. Wise und Global Transfer.",
    urgency: "Viele Anleitungen im Netz empfehlen Briefkasten-Adressen, VoIP-Nummern oder verschweigen das Wise-Risiko bei Bankprüfungen. Das führt zu abgelehnten Anträgen. Hier bekommst du die realistische Reihenfolge.",
    stand: { text: "Stand: 25.11.2026", iso: "2026-11-25" },
    antwort: {
      frage: "Wie bekomme ich als Deutscher eine private US-Amex?",
      text: "Mit einer mindestens 3 Monate aktiven deutschen Amex über Amex Global Transfer. Dafür brauchst du in der Praxis eine echte US-Wohnadresse (z. B. Cloud Residence, ca. 300 €/Quartal) inkl. Utility-Bill, eine US-eSIM für den Verifizierungsanruf (z. B. Tello) und ein US-Bankkonto (sicher: Chase/Bank of America per Filialbesuch + Reisepass; Wise nur auf eigenes Risiko).",
    },
    faelle: {
      eyebrow: "Kosten & Risiken im Vergleich (Stand 25.11.2026)",
      titel: "Was dein US-Amex-Setup konkret kostet und wo Risiken liegen",
      lead: "Alle Pflicht-Bausteine in der echten Reihenfolge, bevor du einen Antrag abschickst.",
      kopf: ["Baustein", "Praxis-Anbieter", "Kosten / Aufwand", "Risiko-Einordnung"],
      zeilen: [
        ["US-Wohnadresse + Utility-Bill", "z. B. Cloud Residence", "ca. 300 € / Quartal", "Sicherer als CMRA-Briefkästen"],
        ["US-Telefonnummer (Anrufe/SMS)", "Tello per eSIM (Wi-Fi Calling)", "ab ca. 6 bis 10 $ / Monat", "Pflicht, weil Amex regelmäßig anruft"],
        ["US-Bankkonto (sicher)", "Chase oder Bank of America", "Filialbesuch in den USA + Reisepass", "Sicher bei Amex-Bankprüfungen"],
        ["US-Bankkonto (Risiko-Weg)", "Wise USD Account", "0 € Grundgebühr", "Klappt ohne Prüfung; bei Rückfrage durch"],
      ],
      fuss: "Stand 25.11.2026. Konditionen, Prüfregeln und Gebühren können sich bei Anbietern und American Express jederzeit ändern.",
      link: { to: "/listicles/amex-us-privat-vorteile", label: "Alle 7 Vorteile der privaten US-Amex lesen" },
    },
    outcomes: [
      "Kompletter Amex-US-Guide für privat (Global Transfer) und den Weg zur US-Business-Amex",
      "7 Vorteile der privaten US-Amex: 4x Restaurants in DE, 2x/Jahr DE-zu-US-Transfer, 1:1 zu Hilton/Avios",
      "Ehrlicher Bankkonto-Vergleich: Wise-Risiko vs. Chase / Bank of America Filialbesuch",
      "US-LLC, EIN (Form SS-4) und steuerliche Grenzen bei Wohnsitz in Deutschland",
    ],
    wegHeading: "Dein US-Amex-Setup in der richtigen Reihenfolge",
    weg: [
      { title: "US-Wohnadresse & Utility-Bill", description: "Echte Adresse wie Cloud Residence (~300 €/Quartal) plus Adressnachweis.", meta: "Schritt 1" },
      { title: "Tello eSIM einrichten", description: "Echte US-Nummer aus Deutschland nutzen, weil Amex regelmäßig anruft.", meta: "Schritt 2" },
      { title: "US-Bankkonto klären", description: "Chase/Bank of America vor Ort mit Pass (sicher) oder Wise (Risiko bei Prüfung).", meta: "Schritt 3" },
      { title: "Global Transfer & Punkte nutzen", description: "Einstieg z. B. mit US Amex Gold, 4x Restaurants in DE & 2x/Jahr DE→US Transfer.", meta: "Schritt 4" },
    ],
    freeTools: [
      { to: "/tools/brand-check", title: "Brand-Check", desc: "Marken- und Domain-Verfügbarkeit international prüfen." },
      { to: "/rechtsform-finden", title: "Rechtsform-Finder", desc: "Deutsche Rechtsform vs. Auslandsstruktur einordnen." },
      { to: "/gruendungskosten-rechner", title: "Kosten-Rechner", desc: "Setup- und laufende Kosten realistisch planen." },
    ],
    tools: [
      { slug: "us-kreditkarten", title: "US-Kreditkarten-Übersicht", desc: "Privat- und Business-Karten mit ehrlichen Fallstricken." },
      { slug: "us-llc-wizard", title: "US-LLC-Wizard", desc: "Wyoming, Delaware und New Mexico im Vergleich." },
      { slug: "us-hk-banking", title: "Internationales Banking", desc: "US-Konten und Anforderungen für Non-Residents." },
    ],
    ratgeber: [
      { to: "/ratgeber/us-llc-gruenden-deutschland", title: "US-LLC aus Deutschland gründen", desc: "Kosten, Formulare und deutsche Steuerregeln." },
    ],
    guides: [
      { to: "/guides/amex-us-beantragen", title: "Guide: Amex US beantragen (Privat & Business)", desc: "Global Transfer, Cloud Residence, Tello eSIM & Bankkonto." },
      { to: "/guides/us-accounts-deutscher", title: "Guide: US-Accounts als Deutscher", desc: "Amazon US, TikTok Shop US und Konten." },
    ],
    faq: [
      { q: "Reicht Wise als US-Bankkonto für die US-Amex?", a: "Du kannst es mit Wise versuchen: Kommt keine Bankprüfung von Amex, hast du Glück. Kommt eine Rückfrage, scheitert Wise in der Regel. Wirklich sicher ist nur ein echtes US-Filialkonto (z. B. Chase oder Bank of America) per Filialbesuch in den USA mit Reisepass." },
      { q: "Warum brauche ich eine US-eSIM wie Tello?", a: "Weil American Express neue Antragsteller regelmäßig telefonisch verifiziert. Mit Tello per eSIM und Wi-Fi Calling nimmst du US-Anrufe zuverlässig in Deutschland an." },
    ],
    quellen: [
      { label: "American Express US: Global Card Relationship", url: "https://www.americanexpress.com/us/credit-cards/features-benefits/us-newcomers/" },
      { label: "Tello Mobile", url: "https://tello.com" },
    ],
    ctaTitle: "US-Amex & US-Setup sauber vorbereiten",
    ctaText: "Im Amex-US-Guide hakst du Adresse, eSIM, Bankkonto, Global Transfer und Business-Schritt für Schritt ab.",
  },

  // ── 10. Freelancer & Agenturen ─────────────────────────────────────────
  {
    slug: "freelancer-agentur",
    seoTitle: "Freelancer & Agentur starten: Steuern & Start | GründerX",
    seoDescription: "Als Freelancer oder kleine Agentur starten: Freiberuf vs. Gewerbe, realistischer Stundensatz, erste Rechnung, Scheinselbstständigkeit und Künstlersozialabgabe.",
    eyebrow: "Für Freelancer · Berater · Agenturen",
    heading: "Deine Leistung verkaufen. Mit sauberem Stundensatz und klaren Rechnungen.",
    heroTitle: "Deine Leistung verkaufen.",
    heroAccent: "Mit sauberem Stundensatz und klaren Rechnungen.",
    screen: "rechnung",
    warumTitel: "Wer zu günstig anbietet oder Pflichten übersieht, zahlt doppelt.",
    lead: "Ob Design, Entwicklung, Marketing, Text oder Beratung: Wir klären Freiberuf vs. Gewerbe, deinen realistischen Stundensatz, deine erste korrekte Rechnung und typische Stolpersteine wie Scheinselbstständigkeit.",
    urgency: "Viele Freelancer kalkulieren ohne Rücklage für Steuer, Krankheit und Akquise-Zeit oder übersehen die Künstlersozialabgabe, sobald sie selbst Kreative beauftragen. Einmal sauber durchgerechnet, läuft dein Alltag ruhig.",
    stand: { text: "Stand: 25.11.2026", iso: "2026-11-25" },
    antwort: {
      frage: "Bin ich als Freelancer automatisch Freiberufler?",
      text: "Nein. Nur Tätigkeiten nach § 18 EStG (z. B. bestimmte Beratungs-, Design-, Lehr-, Schreib- oder Ingenieurberufe) zählen als Freiberuf. Klassische Vermittlung, Handel oder gemischte Agentur-Pakete werden oft als Gewerbe eingestuft.",
    },
    outcomes: [
      "Saubere Einordnung zwischen Freiberuf (§ 18 EStG) und Gewerbe",
      "Realistischer Stundensatz inklusive Steuer, Krankenversicherung und Urlaubstagen",
      "Korrekte PDF-Rechnungen und Vorlage für Zahlungserinnerungen",
      "Check auf Scheinselbstständigkeit und Künstlersozialabgabe (KSA)",
    ],
    wegHeading: "Dein Agentur- & Freelancer-Start",
    weg: [
      { title: "Freiberuf vs. Gewerbe klären", description: "Tätigkeit genau beschreiben, bevor das Formular ans Finanzamt geht.", meta: "Schritt 1" },
      { title: "Stundensatz kalkulieren", description: "Netto-Ziel rückwärts auf realistische abrechenbare Tage umrechnen.", meta: "Schritt 2" },
      { title: "Fragebogen & USt-IdNr.", description: "ELSTER-Fragebogen fristgerecht abgeben und USt-IdNr. mitbeantragen.", meta: "1 Monat Frist" },
      { title: "Erste Rechnung & Rücklage", description: "Pflichtangaben prüfen und Steuer-Anteil direkt beiseitelegen.", meta: "Ab Auftrag 1" },
    ],
    freeTools: [
      { to: "/rechtsform-finden", title: "Rechtsform-Finder", desc: "Freiberuf, Einzelunternehmen oder UG abgleichen." },
      { to: "/ust-id-beantragen", title: "USt-IdNr.-Guide", desc: "Wann du sie für EU-Kunden brauchst." },
      { to: "/businessplan-erstellen", title: "Businessplan-Generator", desc: "Leistungen und Kalkulation sauber strukturieren." },
    ],
    tools: [
      { slug: "stundensatz-rechner", title: "Stundensatz-Rechner", desc: "Echten Tagessatz und Stundensatz berechnen." },
      { slug: "rechnungs-generator", title: "Rechnungs-Generator", desc: "Fertige Rechnungen als PDF inklusive E-Rechnungs-Hinweis." },
      { slug: "scheinselbststaendigkeit", title: "Scheinselbstständigkeits-Check", desc: "Risiken bei nur einem Hauptauftraggeber erkennen." },
    ],
    ratgeber: [
      { to: "/ratgeber/e-rechnung-pflicht-b2b-2026", title: "E-Rechnung im B2B (2026 bis 2028)", desc: "Was für deine B2B-Rechnungen gilt." },
      { to: "/ratgeber/brutto-netto-selbstaendig", title: "Brutto-Netto für Selbstständige", desc: "Rücklagen realistisch planen." },
    ],
    guides: [
      { to: "/guides/freiberufler-anmelden", title: "Guide: Freiberufler anmelden", desc: "Direkt ans Finanzamt ohne Gewerbeamt." },
      { to: "/guides/agency-services-setup", title: "Guide: Agentur & Dienstleistung", desc: "Struktur für Kundenprojekte und Team." },
    ],
    faq: [
      { q: "Muss ich als Freelancer schon E-Rechnungen schreiben?", a: "Empfangen musst du E-Rechnungen im B2B-Bereich bereits; für das Ausstellen gelten gesetzliche Übergangsfristen bis Ende 2026 bzw. Ende 2027 (für Vorjahresumsatz bis 800.000 € nach § 27 Abs. 38 UStG)." },
      { q: "Wann wird die Künstlersozialabgabe für meine Agentur relevant?", a: "Wenn du nicht nur gelegentlich selbstständige Designer, Texter, Fotografen oder Webdesigner beauftragst und die Entgelte 1.000 € im Jahr übersteigen (§ 24 KSVG)." },
    ],
    quellen: [
      { label: "§ 18 EStG: Selbstständige Arbeit", url: `${GII}/estg/__18.html` },
      { label: "§ 27 Abs. 38 UStG: E-Rechnung Übergangsfristen", url: `${GII}/ustg_1980/__27.html` },
      { label: "§ 24 KSVG: Künstlersozialabgabe", url: `${GII}/ksvg/__24.html` },
    ],
    ctaTitle: "Sauber starten als Freelancer oder Agentur",
    ctaText: "Rechner, Rechnungs-Generator, Fristen und Guides für dein Dienstleistungs-Business.",
  },
];

export const findZielgruppe = (slug: string) => ZIELGRUPPEN.find((z) => z.slug === slug);
