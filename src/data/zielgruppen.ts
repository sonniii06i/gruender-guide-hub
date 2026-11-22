// Zielgruppen-Landingpages (/influencer, /tiktok-shop) – Betreiber 25.10.2026:
// GründerX viel stärker auf Influencer und TikTok-Shop-Leute ausrichten.
// Jede Zahl ist belegt (Quellen in `quellen`); Preise nur über /preise.

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

// /tiktok-shop (21.11.2026, growth-lp): Quellen der überarbeiteten Seite. Dieselben Gesetzes-Konstanten führt der
// Zweig lp/amazon-haendler; beim Zusammenführen bleibt jede Konstante nur einmal stehen.
const TT_PROVISION = { label: "TikTok Seller University: TikTok Shop EU-Kommissionsrichtlinie (Stand 28.01.2026)", url: "https://seller-de.tiktok.com/university/essay?knowledge_id=1531082143074070&lang=de-DE" };
const GII = "https://www.gesetze-im-internet.de";
const Q_GEWO = { label: "§ 14 GewO: Anzeige des Gewerbes gleichzeitig mit dem Beginn", url: `${GII}/gewo/__14.html` };
const Q_AO138 = { label: "§ 138 AO: Fragebogen zur steuerlichen Erfassung innerhalb eines Monats", url: `${GII}/ao_1977/__138.html` };
const Q_USTG27A = { label: "§ 27a UStG: USt-IdNr. auf Antrag vom Bundeszentralamt für Steuern", url: `${GII}/ustg_1980/__27a.html` };
const Q_USTG19 = { label: "§ 19 UStG: Kleinunternehmer-Grenzen 25.000 € und 100.000 €, Bindung fünf Kalenderjahre", url: `${GII}/ustg_1980/__19.html` };
const Q_VERPACK6 = { label: "§ 6 VerpackDG: Registrierung vor dem erstmaligen Bereitstellen (in Kraft seit 12.08.2026)", url: `${GII}/verpackdg/__6.html` };
const Q_VERPACK7 = { label: "§ 7 VerpackDG: Beteiligung an einem dualen System", url: `${GII}/verpackdg/__7.html` };
const Q_ELEKTRO6 = { label: "§ 6 ElektroG: Registrierung, Verbote für Vertreiber, Marktplätze und Fulfilment-Dienstleister", url: `${GII}/elektrog_2015/__6.html` };
const Q_BZST_USTID = {
  label: "Bundeszentralamt für Steuern: Vergabe der USt-IdNr.",
  url: "https://www.bzst.de/DE/Unternehmen/Identifikationsnummern/Umsatzsteuer-Identifikationsnummer/Vergabe_USt_IdNr/vergabe_ust_idnr_node.html",
};
const Q_ZSVR = { label: "Zentrale Stelle Verpackungsregister (LUCID)", url: "https://www.verpackungsregister.org/" };
const Q_EAR = { label: "stiftung elektro-altgeräte register (stiftung ear)", url: "https://www.stiftung-ear.de/" };

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
      "Den Verpackungslizenz-Rechner nutzt du frei und so oft du willst. Die TikTok-Shop-Checkliste und den WEEE-Check gibt es je einmal kostenlos, das Ergebnis gegen deine E-Mail-Adresse – alles ohne Konto. Im Abo kommen die Wizards für Gewerbeanmeldung und Fragebogen dazu.",
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
    ctaText: "Gewerbe, Fragebogen, Registrierung im Seller Center, LUCID und WEEE – plus alle weiteren Tools und Guides im Abo, monatlich kündbar.",
  },
];

export const findZielgruppe = (slug: string) => ZIELGRUPPEN.find((z) => z.slug === slug);
