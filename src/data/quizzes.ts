/**
 * Interaktive Quizze & Umfragen für GründerX (/quiz, /quiz/:slug, /umfrage/:slug).
 * - Gamified 1-Frage-pro-Karte Erlebnis (Knowunity/Studyflix-Klarheit)
 * - Formt über gespeicherte Antworten (Supabase quiz_submissions + localStorage) echte Personas (12–70)
 * - Belohnt am Ende mit transparentem Aktions-Angebot (Code FOUNDER / 20 % auf erste Rechnung aus config/pricing.ts)
 */

export interface QuizOption {
  id: string;
  label: string;
  sub?: string;
  /** Bei Wissens-Quizzen: ist diese Antwort korrekt? */
  correct?: boolean;
  /** Persona- / Ergebnis-Tag zum Auswerten */
  tag?: string;
  /** Optionales Altersgruppen-Tag für Persona-Daten */
  ageGroup?: string;
  /** Optionales Ziel-Tag für Persona-Daten */
  goal?: string;
}

export interface QuizQuestion {
  id: string;
  frage: string;
  hinweis?: string;
  optionen: QuizOption[];
  /** Erklärung bei Wissens-Quizzen (sofort nach Klick sichtbar) */
  erklaerung?: string;
}

export interface QuizResultProfile {
  key: string;
  titel: string;
  kurz: string;
  naechsteSchritte: string[];
  guideTo: string;
  guideLabel: string;
  freeToolTo: string;
  freeToolLabel: string;
}

export interface QuizDefinition {
  slug: string;
  kind: "quiz" | "umfrage";
  routePrefix: "/quiz" | "/umfrage";
  kategorie: string;
  dauer: string;
  xp: number;
  seoTitle: string;
  seoDescription: string;
  titel: string;
  lead: string;
  fragen: QuizQuestion[];
  /** Auswertungs-Profile (nach häufigstem Tag oder Wissens-Score) */
  profile: QuizResultProfile[];
  /** Wissens-Quiz (zeigt sofort richtig/falsch + Erklärung) */
  isKnowledgeQuiz?: boolean;
}

export const QUIZZES: QuizDefinition[] = [
  {
    slug: "gruendertyp",
    kind: "quiz",
    routePrefix: "/quiz",
    kategorie: "Persönlicher Startplan",
    dauer: "60 Sek.",
    xp: 150,
    seoTitle: "Gründertyp-Quiz (12 bis 70): Welcher Start passt? | GründerX",
    seoDescription: "Beantworte 5 kurze Fragen zu Alter, Ziel und Zeit. Bekomme deinen persönlichen Gründungs-Fahrplan, den passenden Guide und deinen Rabattcode.",
    titel: "Welcher Gründertyp bist du?",
    lead: "5 schnelle Klicks zu Alter, Ziel und Startlage. Am Ende bekommst du deinen klaren nächsten Schritt und schaltest deinen GründerX-Aktionsrabatt frei.",
    fragen: [
      {
        id: "alter",
        frage: "In welchem Alter befindest du dich?",
        hinweis: "Wir passen deinen Start-Fahrplan an deine Lebenslage an. Alle Guides stehen trotzdem allen offen.",
        optionen: [
          { id: "12-17", label: "12 bis 17 Jahre", sub: "Schule / U18 (mit Eltern-Info)", ageGroup: "12-17", tag: "u18" },
          { id: "18-25", label: "18 bis 25 Jahre", sub: "Studium, Ausbildung oder erster Start", ageGroup: "18-25", tag: "starter" },
          { id: "26-39", label: "26 bis 39 Jahre", sub: "Nebengewerbe, E-Commerce oder Aufbau", ageGroup: "26-39", tag: "ecom" },
          { id: "40-54", label: "40 bis 54 Jahre", sub: "Neustart, GmbH, Beratung oder Skalierung", ageGroup: "40-54", tag: "profi" },
          { id: "55-70", label: "55 bis 70+ Jahre", sub: "Erfahrung nutzen, Freiberuf oder Hinzuverdienst", ageGroup: "55-70", tag: "erfahrung" },
        ],
      },
      {
        id: "ziel",
        frage: "Was willst du am Ende konkret fertig haben?",
        optionen: [
          { id: "website_app", label: "Eigene Website oder App", sub: "Live im Web, App Store oder Play Store", goal: "website_app", tag: "builder" },
          { id: "shop", label: "Online-Shop, Amazon oder TikTok Shop", sub: "Physische Produkte sauber verkaufen", goal: "shop", tag: "ecom" },
          { id: "creator", label: "Creator, Content oder Beratung", sub: "Kooperationen, Coaching oder Dienstleistung", goal: "creator", tag: "starter" },
          { id: "us_amex", label: "US-Setup, US-LLC oder Amex US", sub: "Global Transfer, US-Bank & Punkte-Strategie", goal: "us_amex", tag: "us" },
        ],
      },
      {
        id: "zeit",
        frage: "Wie viel Zeit hast du pro Woche?",
        optionen: [
          { id: "wenig", label: "2 bis 5 Stunden", sub: "Neben Schule, Studium, Job oder Alltag", tag: "starter" },
          { id: "mittel", label: "6 bis 15 Stunden", sub: "Abends und am Wochenende gezielt aufbauen", tag: "builder" },
          { id: "voll", label: "Vollzeit (20+ Stunden)", sub: "Voller Fokus auf den Aufbau", tag: "profi" },
        ],
      },
      {
        id: "huerde",
        frage: "Was bremst dich aktuell am meisten?",
        optionen: [
          { id: "reihenfolge", label: "Ich weiß nicht, wo ich anfangen soll", sub: "Zu viele widersprüchliche Infos im Netz", tag: "starter" },
          { id: "behoerden", label: "Finanzamt, ELSTER und Steuern", sub: "Angst vor teuren Formularfehlern", tag: "ecom" },
          { id: "technik", label: "Umsetzung von Website, App oder Shop", sub: "Technik und Pflichtangaben verbinden", tag: "builder" },
          { id: "ausland", label: "US-Bank, Adresse, eSIM oder Struktur", sub: "Fehlende verlässliche Praxisanleitung", tag: "us" },
        ],
      },
      {
        id: "status",
        frage: "Hast du schon etwas angemeldet?",
        optionen: [
          { id: "nein", label: "Noch nichts angemeldet", sub: "Ich stehe ganz am Anfang", tag: "starter" },
          { id: "einzel", label: "Einzelunternehmen oder Freiberuf", sub: "Läuft schon oder startet gerade", tag: "builder" },
          { id: "gmbh", label: "UG, GmbH oder Auslandsfirma", sub: "Ich will Struktur & Optimierung", tag: "profi" },
        ],
      },
    ],
    profile: [
      {
        key: "u18",
        titel: "Der junge Starter (12 bis 17)",
        kurz: "Du kannst deine Website, App oder Idee sofort bauen. Sobald Geld fließt, holst du deine Eltern und ggf. das Familiengericht (§ 112 BGB) geordnet ins Boot.",
        naechsteSchritte: [
          "Idee zuerst als Website oder App fertigbauen",
          "U18-Übersicht gemeinsam mit deinen Eltern durchgehen",
          "Vorlage für § 112 BGB erst nutzen, wenn dauerhafte Einnahmen anstehen",
        ],
        guideTo: "/u18-gruenden",
        guideLabel: "Zur U18-Startseite",
        freeToolTo: "/listicles/u18-gruenden-regeln",
        freeToolLabel: "6 Regeln für U18 & Eltern",
      },
      {
        key: "us",
        titel: "Der internationale Optimierer (US & Amex US)",
        kurz: "Für dich zählt die exakte Reihenfolge bei US-Adresse, Utility-Bill, Tello eSIM und US-Bankkonto, damit Anträge nicht an vermeidbaren Rückfragen scheitern.",
        naechsteSchritte: [
          "Amex-US-Vorteile & Voraussetzungen gegenchecken",
          "Adresse (z. B. Cloud Residence) und Tello eSIM vor dem Antrag einrichten",
          "US-Bankweg ehrlich entscheiden (Chase/Bank of America vs. Wise-Risiko)",
        ],
        guideTo: "/guides/amex-us-beantragen",
        guideLabel: "Zum Amex-US-Guide",
        freeToolTo: "/listicles/amex-us-privat-vorteile",
        freeToolLabel: "7 Vorteile der US-Amex lesen",
      },
      {
        key: "ecom",
        titel: "Der Marktplatz- & Shop-Starter",
        kurz: "Bei Amazon, Shopify und TikTok Shop entscheidet die Reihenfolge: erst Gewerbe, Fragebogen, USt-IdNr. und LUCID, dann das erste Paket.",
        naechsteSchritte: [
          "Gewerbe und ELSTER-Fragebogen in Woche 1 erledigen",
          "Verpackungslizenz (LUCID) vor dem ersten Versand berechnen",
          "Steuerkalender für USt-VA und OSS einrichten",
        ],
        guideTo: "/amazon-haendler",
        guideLabel: "Zur Händler-Startseite",
        freeToolTo: "/tools/lucid-wizard",
        freeToolLabel: "LUCID-Wizard testen",
      },
      {
        key: "builder",
        titel: "Der Website- & App-Builder",
        kurz: "Dein Ziel ist ein echtes digitales Produkt. Wir halten den Papierkram kurz, damit du von Name und Impressum bis zum Store-Review zügig durchkommst.",
        naechsteSchritte: [
          "Marken- und Domainnamen vorab im Brand-Check prüfen",
          "Erste Version mobil bauen und Pflichtseiten setzen",
          "Website- oder App-Launch-Guide Schritt für Schritt abhaken",
        ],
        guideTo: "/webseite-und-app",
        guideLabel: "Zur Website- & App-Seite",
        freeToolTo: "/tools/brand-check",
        freeToolLabel: "Gratis Brand-Check starten",
      },
      {
        key: "erfahrung",
        titel: "Der erfahrene Neustarter (50 bis 70)",
        kurz: "Du bringst Fachwissen mit und willst eine ruhige, verständliche Führung durch Freiberuf, erste Rechnung und Rücklagen.",
        naechsteSchritte: [
          "Prüfen, ob deine Tätigkeit freiberuflich (§ 18 EStG) ist",
          "ELSTER-Fragebogen mit unserer Zeilenhilfe in Ruhe ausfüllen",
          "Erste Rechnung sauber als PDF erstellen",
        ],
        guideTo: "/gruenden-ab-50",
        guideLabel: "Zur 50+-Übersicht",
        freeToolTo: "/rechtsform-finden",
        freeToolLabel: "Rechtsform-Finder öffnen",
      },
      {
        key: "starter",
        titel: "Der strukturierte Erstgründer",
        kurz: "Du willst nichts vergessen und keine unnötigen Fehler machen. Mit einem 10-Minuten-Schritt pro Tag steht dein Grundgerüst in wenigen Tagen.",
        naechsteSchritte: [
          "Rechtsform klären (meist Einzelunternehmen oder Freiberuf)",
          "Gewerbeanmeldung und ELSTER-Fragebogen der Reihe nach abhaken",
          "Separates Konto für Einnahmen und Belege anlegen",
        ],
        guideTo: "/nebengewerbe",
        guideLabel: "Zur Nebengewerbe-Übersicht",
        freeToolTo: "/gruendungskosten-rechner",
        freeToolLabel: "Gründungskosten berechnen",
      },
      {
        key: "profi",
        titel: "Der Struktur- & Wachstumsgründer",
        kurz: "Du planst direkt größer (UG, GmbH, Holding oder internationales Setup). Hier sparen klare Zahlen und Vorlagen besonders viel Zeit.",
        naechsteSchritte: [
          "UG vs. GmbH und Holding-Struktur sauber gegenrechnen",
          "Notar-Datenblatt vor dem Termin komplett ausfüllen",
          "Steuer-Cockpit und Fristenkalender aktivieren",
        ],
        guideTo: "/guides/gmbh-gruendung",
        guideLabel: "Zum GmbH-Guide",
        freeToolTo: "/rechtsform-finden",
        freeToolLabel: "Rechtsform-Vergleich öffnen",
      },
    ],
  },

  {
    slug: "rechtsform",
    kind: "quiz",
    routePrefix: "/quiz",
    kategorie: "Rechtsform",
    dauer: "45 Sek.",
    xp: 150,
    seoTitle: "Rechtsform-Quiz 2026: Einzelunternehmen, Freiberuf, UG oder GmbH? | GründerX",
    seoDescription: "Spielerischer 4-Fragen-Check zur passenden Rechtsform: Einzelunternehmen, Freiberufler, GbR, UG oder GmbH. Sofort-Ergebnis plus Rabattcode.",
    titel: "Welche Rechtsform passt zu deinem Start?",
    lead: "Vier klare Fragen zu Risiko, Budget und Team. Du siehst sofort, welche Rechtsform für den Anfang am ehesten passt (Orientierung, keine Rechtsberatung).",
    fragen: [
      {
        id: "team",
        frage: "Startest du allein oder mit Partnern?",
        optionen: [
          { id: "allein", label: "Allein", sub: "Einzelstarter", tag: "einzel" },
          { id: "team", label: "Zu zweit oder im Team", sub: "Mitgründer dabei", tag: "ug" },
        ],
      },
      {
        id: "taetigkeit",
        frage: "Was machst du hauptsächlich?",
        optionen: [
          { id: "freiberuf", label: "Beratung, Design, IT, Text oder Lehre", sub: "Dienstleistung mit eigener Expertise", tag: "freiberuf" },
          { id: "handel", label: "Online-Handel, Amazon, Shop oder Creator", sub: "Verkauf von Produkten oder Werbung", tag: "einzel" },
          { id: "risiko", label: "Größere Verträge, Software oder Investoren", sub: "Haftungsbegrenzung ist wichtig", tag: "gmbh" },
        ],
      },
      {
        id: "kapital",
        frage: "Wie viel Stammkapital willst du am Anfang binden?",
        optionen: [
          { id: "null", label: "Möglichst 0 € Stammkapital", sub: "Schnell und günstig starten", tag: "einzel" },
          { id: "klein", label: "Unter 5.000 € (inkl. Notar)", sub: "Haftung begrenzen mit kleinem Budget", tag: "ug" },
          { id: "gmbh_cap", label: "Mindestens 12.500 € bis 25.000 €", sub: "Klassische GmbH-Einlage vorhanden", tag: "gmbh" },
        ],
      },
      {
        id: "haftung",
        frage: "Wie wichtig ist dir die Trennung vom Privatvermögen?",
        optionen: [
          { id: "normal", label: "Geringes Risiko zum Start (Versicherung reicht)", tag: "einzel" },
          { id: "hoch", label: "Sehr wichtig, ich will beschränkte Haftung", tag: "gmbh" },
        ],
      },
    ],
    profile: [
      {
        key: "freiberuf",
        titel: "Tendenz: Freiberufler (§ 18 EStG)",
        kurz: "Kein Gewerbeamt, keine Gewerbesteuer und einfache EÜR. Prüfe beim Finanzamt, ob deine genaue Tätigkeit als Katalogberuf anerkannt wird.",
        naechsteSchritte: [
          "Tätigkeit klar nach § 18 EStG formulieren",
          "Fragebogen direkt über ELSTER ans Finanzamt senden",
          "Optional Kleinunternehmerregelung prüfen",
        ],
        guideTo: "/guides/freiberufler-anmelden",
        guideLabel: "Zum Freiberufler-Guide",
        freeToolTo: "/rechtsform-finden",
        freeToolLabel: "Detail-Rechner öffnen",
      },
      {
        key: "einzel",
        titel: "Tendenz: Einzelunternehmen",
        kurz: "Der schnellste und günstigste Start (ca. 20 bis 65 € beim Gewerbeamt), kein Notar, einfache EÜR. Später kannst du jederzeit in eine UG oder GmbH wechseln.",
        naechsteSchritte: [
          "Gewerbeanmeldung (GewA1) vorbereiten",
          "Innerhalb eines Monats ELSTER-Fragebogen abschicken",
          "Getrenntes Geschäftskonto eröffnen",
        ],
        guideTo: "/ratgeber/einzelunternehmen-gruenden-gewerbe-freiberufler",
        guideLabel: "Zum Einzelunternehmen-Guide",
        freeToolTo: "/gruendungskosten-rechner",
        freeToolLabel: "Startkosten berechnen",
      },
      {
        key: "ug",
        titel: "Tendenz: UG (haftungsbeschränkt)",
        kurz: "Ab 1 € Stammkapital (in der Praxis oft 500 bis 2.000 € empfohlen), Notar nötig, aber direkte Haftungsbegrenzung. 25 % des Gewinns gehen in die gesetzliche Rücklage.",
        naechsteSchritte: [
          "Firmenname bei IHK und Handelsregister vorab prüfen",
          "Notar-Datenblatt ausfüllen (spart teure Nachträge)",
          "Geschäftskonto für die Einzahlung eröffnen",
        ],
        guideTo: "/guides/ug-gruendung",
        guideLabel: "Zum UG-Guide",
        freeToolTo: "/ratgeber/ug-oder-gmbh",
        freeToolLabel: "UG vs. GmbH vergleichen",
      },
      {
        key: "gmbh",
        titel: "Tendenz: GmbH",
        kurz: "Hohe Außenwirkung und beschränkte Haftung bei 25.000 € Stammkapital (mind. 12.500 € bei Gründung einzuzahlen). Laufend Bilanzpflicht und Jahresabschluss.",
        naechsteSchritte: [
          "Notartermin und Gesellschaftsvertrag vorbereiten",
          "Stammkapital auf das neue Geschäftskonto einzahlen",
          "Handelsregister, Gewerbeamt, Finanzamt und Transparenzregister der Reihe nach erledigen",
        ],
        guideTo: "/ratgeber/gmbh-gruenden-kosten-2026",
        guideLabel: "Zum GmbH-Guide",
        freeToolTo: "/gruendungskosten-rechner",
        freeToolLabel: "GmbH-Kosten berechnen",
      },
    ],
  },

  {
    slug: "steuern-wissen",
    kind: "quiz",
    routePrefix: "/quiz",
    kategorie: "Wissens-Quiz",
    dauer: "2 Min.",
    xp: 200,
    isKnowledgeQuiz: true,
    seoTitle: "Gründer-Steuer-Quiz 2026: 6 Fragen, die fast alle falsch tippen | GründerX",
    seoDescription: "Teste dein Gründer-Wissen zu 24.500 € Freibetrag, Kleinunternehmer-Bindung, ELSTER-Frist und DAC7-Meldegrenze. Sofort-Auflösung + Rabatt-Belohnung.",
    titel: "Gründer-Steuer-Quiz: 6 Fragen, die fast alle falsch tippen",
    lead: "Klick deine Antwort an und sieh sofort die echte Regel mit Paragraf. Am Ende gibt es deinen Score und deine Belohnung.",
    fragen: [
      {
        id: "q1_gewst",
        frage: "Wofür gilt der Freibetrag von 24.500 € im Jahr (§ 11 GewStG)?",
        optionen: [
          { id: "a", label: "Bis 24.500 € Gewinn zahlt man gar keine Steuern", correct: false },
          { id: "b", label: "Nur für die Gewerbesteuer (Einkommensteuer gilt trotzdem)", correct: true },
          { id: "c", label: "Nur für GmbHs und UGs", correct: false },
        ],
        erklaerung: "Richtig ist B: Die 24.500 € gelten nur für die Gewerbesteuer von Einzelunternehmen und Personengesellschaften (§ 11 GewStG). Dein Gewinn zählt bei der Einkommensteuer ganz normal mit.",
      },
      {
        id: "q2_ku_grenzen",
        frage: "Welche Umsatzgrenzen gelten seit 2025 für die Kleinunternehmerregelung (§ 19 UStG)?",
        optionen: [
          { id: "a", label: "22.000 € Vorjahr / 50.000 € laufendes Jahr", correct: false },
          { id: "b", label: "25.000 € Vorjahr / 100.000 € laufendes Jahr", correct: true },
          { id: "c", label: "50.000 € Vorjahr / 150.000 € laufendes Jahr", correct: false },
        ],
        erklaerung: "Seit 2025 gelten 25.000 € im Vorjahr und 100.000 € im laufenden Jahr (§ 19 UStG). Überschreitest du 100.000 € im laufenden Jahr, endet die Regelung sofort.",
      },
      {
        id: "q3_bindung",
        frage: "Wie lange bindet dich der freiwillige Verzicht auf die Kleinunternehmerregelung?",
        optionen: [
          { id: "a", label: "1 Kalenderjahr", correct: false },
          { id: "b", label: "2 Kalenderjahre", correct: false },
          { id: "c", label: "5 Kalenderjahre", correct: true },
        ],
        erklaerung: "Ein Verzicht auf die Kleinunternehmerregelung bindet dich mindestens fünf Kalenderjahre (§ 19 Abs. 3 UStG).",
      },
      {
        id: "q4_fse_frist",
        frage: "Wie lange hast du nach Start für den Fragebogen zur steuerlichen Erfassung?",
        optionen: [
          { id: "a", label: "1 Monat ab Beginn der Tätigkeit", correct: true },
          { id: "b", label: "Bis zur ersten Steuererklärung im nächsten Jahr", correct: false },
          { id: "c", label: "Erst wenn der erste Gewinn über 10.000 € liegt", correct: false },
        ],
        erklaerung: "Der Fragebogen muss innerhalb eines Monats nach Beginn der Tätigkeit über ELSTER übermittelt werden (§ 138 Abs. 4 AO).",
      },
      {
        id: "q5_dac7",
        frage: "Ab wann melden Plattformen wie Amazon, eBay oder Vinted Verkäufer ans BZSt (PStTG)?",
        optionen: [
          { id: "a", label: "Erst ab 25.000 € Umsatz", correct: false },
          { id: "b", label: "Ab 30 Verkäufen ODER über 2.000 € Umsatz im Jahr", correct: true },
          { id: "c", label: "Nur bei gewerblichen Händlern mit GmbH", correct: false },
        ],
        erklaerung: "Ausgenommen ist nur, wer im Kalenderjahr weniger als 30 Verkäufe UND zusammen höchstens 2.000 € erzielt (§ 4 Abs. 5 PStTG). Das ist eine Meldepflicht, keine Freigrenze bei der Einkommensteuer.",
      },
      {
        id: "q6_lucid",
        frage: "Wann brauchst du die LUCID-Registrierung als Online-Händler?",
        optionen: [
          { id: "a", label: "Vor dem ersten verpackten Paket an Privatkunden in Deutschland", correct: true },
          { id: "b", label: "Erst ab 1.000 Paketen im Jahr", correct: false },
          { id: "c", label: "Nur bei Elektrogeräten", correct: false },
        ],
        erklaerung: "Die Registrierung bei LUCID und die Beteiligung an einem dualen System stehen vor dem ersten Versand an Privatkunden (§§ 6, 7 VerpackDG).",
      },
    ],
    profile: [
      {
        key: "high",
        titel: "Stark! Du kennst die wichtigsten Pflichten.",
        kurz: "Du sitzt bei Fristen und Grenzen deutlich sicherer als die meisten Erstgründer. Jetzt geht es nur noch um die saubere Umsetzung im Alltag.",
        naechsteSchritte: [
          "Steuerkalender mit deinen persönlichen Fristen anlegen",
          "Passenden Guide für dein nächstes Ziel abhaken",
        ],
        guideTo: "/tools/steuerkalender",
        guideLabel: "Zum Steuerkalender",
        freeToolTo: "/gratis-tools",
        freeToolLabel: "Gratis-Tools testen",
      },
      {
        key: "mid",
        titel: "Gute Basis, ein paar teure Stolpersteine waren noch dabei.",
        kurz: "Genau diese 2 bis 3 Details (Bindungsfrist, Freibetrag, Reihenfolge) kosten in der Praxis am meisten Zeit. Im Cockpit stehen sie immer direkt am richtigen Schritt.",
        naechsteSchritte: [
          "5 Reihenfolge-Fehler im Listicle kurz nachlesen",
          "Fragebogen-Begleiter Schritt für Schritt durchgehen",
        ],
        guideTo: "/listicles/gruendung-fehler-reihenfolge",
        guideLabel: "5 Fehler nachlesen",
        freeToolTo: "/rechtsform-finden",
        freeToolLabel: "Gratis Rechtsform-Finder",
      },
      {
        key: "low",
        titel: "Gut, dass du das Quiz vor dem Start gemacht hast!",
        kurz: "Kein Problem: Fast niemand lernt das in der Schule. Genau dafür führt dich GründerX in kleinen, verständlichen Schritten durch jede Pflicht.",
        naechsteSchritte: [
          "Mit dem Einzelunternehmen- oder Nebengewerbe-Guide beginnen",
          "Jede Frist im Steuerkalender speichern",
        ],
        guideTo: "/nebengewerbe",
        guideLabel: "Zum einfachen Einstieg",
        freeToolTo: "/gratis-tools",
        freeToolLabel: "Gratis-Tools ausprobieren",
      },
    ],
  },

  {
    slug: "us-amex-check",
    kind: "quiz",
    routePrefix: "/quiz",
    kategorie: "US-Setup & Amex US",
    dauer: "60 Sek.",
    xp: 150,
    seoTitle: "US-Amex-Check: Bist du bereit für den Global Transfer? | GründerX",
    seoDescription: "Prüfe in 60 Sekunden, ob deine deutsche Amex, US-Adresse (Cloud Residence), Tello eSIM und US-Bankkonto für die US-Amex bereit sind.",
    titel: "US-Amex-Check: Was fehlt dir noch zum Start?",
    lead: "Beantworte 4 ehrliche Praxis-Fragen und sieh sofort, ob du für den Global Transfer bereit bist oder wo ein Risiko lauert.",
    fragen: [
      {
        id: "de_amex",
        frage: "Hast du aktuell eine deutsche American Express Karte?",
        optionen: [
          { id: "ja_3m", label: "Ja, seit mindestens 3 Monaten aktiv", tag: "ready" },
          { id: "ja_neu", label: "Ja, aber erst ganz neu (unter 3 Monaten)", tag: "prep" },
          { id: "nein", label: "Nein, noch keine deutsche Amex", tag: "start" },
        ],
      },
      {
        id: "adresse",
        frage: "Hast du schon eine echte US-Wohnadresse plus Utility-Bill?",
        hinweis: "z. B. über Cloud Residence (~300 €/Quartal), keine Briefkasten-Adresse.",
        optionen: [
          { id: "ja", label: "Ja, echte US-Wohnadresse + Nachweis stehen", tag: "ready" },
          { id: "nein", label: "Nein, muss ich noch einrichten", tag: "prep" },
        ],
      },
      {
        id: "phone",
        frage: "Bist du unter einer echten US-Mobilfunknummer (z. B. Tello eSIM) erreichbar?",
        hinweis: "Amex ruft regelmäßig zur Verifizierung an.",
        optionen: [
          { id: "ja", label: "Ja, US-eSIM (z. B. Tello) mit Wi-Fi Calling läuft", tag: "ready" },
          { id: "nein", label: "Nein, noch nicht eingerichtet", tag: "prep" },
        ],
      },
      {
        id: "bank",
        frage: "Welches US-Bankkonto nutzt du für die Rückzahlung?",
        optionen: [
          { id: "branch", label: "Echte US-Filialbank (z. B. Chase / Bank of America)", sub: "Sicherer Weg per Filialbesuch + Reisepass", tag: "ready" },
          { id: "wise", label: "Wise USD Account", sub: "Risiko-Option: klappt nur, wenn keine Bankprüfung kommt", tag: "risk" },
          { id: "keins", label: "Noch kein US-Bankkonto", tag: "start" },
        ],
      },
    ],
    profile: [
      {
        key: "ready",
        titel: "Sehr gute Basis für den Amex Global Transfer!",
        kurz: "Deine Pflicht-Bausteine stehen. Gehe jetzt Schritt für Schritt durch den Global-Transfer-Antrag und bereite dich auf den kurzen Amex-Verifizierungsanruf vor.",
        naechsteSchritte: [
          "Mit der US Amex Gold starten (4x Restaurants auch in DE)",
          "Tello eSIM beim Antrag griffbereit halten",
          "Danach 2x/Jahr DE-Punkte in die USA übertragen",
        ],
        guideTo: "/guides/amex-us-beantragen",
        guideLabel: "Zum Amex-US-Guide",
        freeToolTo: "/listicles/amex-us-privat-vorteile",
        freeToolLabel: "7 Vorteile im Detail lesen",
      },
      {
        key: "risk",
        titel: "Achtung beim US-Bankkonto (Wise-Risiko)",
        kurz: "Mit Wise kannst du Glück haben, wenn keine Prüfung kommt. Bei einer Rückfrage von Amex ist der Antrag jedoch meist durch. Plane für den sicheren Weg einen Filialbesuch bei Chase oder Bank of America (mit Reisepass) ein.",
        naechsteSchritte: [
          "Ehrlich abwägen: Risiko-Versuch vs. sicherer Filialbesuch in den USA",
          "Adresse (Cloud Residence) und Tello eSIM sauber fertigstellen",
          "Alle 9 Schritte im Amex-US-Guide abhaken",
        ],
        guideTo: "/guides/amex-us-beantragen",
        guideLabel: "Zum Amex-US-Guide",
        freeToolTo: "/listicles/amex-us-privat-vorteile",
        freeToolLabel: "Amex-US-Listicle lesen",
      },
      {
        key: "prep",
        titel: "Fast bereit: Noch 2 bis 3 Bausteine vorher erledigen",
        kurz: "Stelle erst die US-Wohnadresse (z. B. Cloud Residence), die Utility-Rechnung und deine Tello eSIM auf. Erst danach lohnt sich der Antrag.",
        naechsteSchritte: [
          "Echte US-Wohnadresse + Utility-Bill besorgen",
          "Tello eSIM mit Wi-Fi Calling in Deutschland testen",
          "Bankkonto-Weg (Chase/BoA vs. Wise) im Guide klären",
        ],
        guideTo: "/guides/amex-us-beantragen",
        guideLabel: "Amex-US-Guide öffnen",
        freeToolTo: "/listicles/amex-us-privat-vorteile",
        freeToolLabel: "Warum sich die US-Amex lohnt",
      },
      {
        key: "start",
        titel: "Perfekter Zeitpunkt, es von Tag 1 sauber aufzubauen",
        kurz: "Starte zuerst mit einer deutschen Amex (mindestens 3 Monate Historie), plane währenddessen Adresse, eSIM und US-Bankkonto und gehe dann in den Global Transfer.",
        naechsteSchritte: [
          "Deutsche Amex-Historie (3+ Monate) als Brücke aufbauen",
          "7 Vorteile der privaten US-Amex nachlesen",
          "Reihenfolge im Amex-US-Guide vormerken",
        ],
        guideTo: "/listicles/amex-us-privat-vorteile",
        guideLabel: "7 Vorteile lesen",
        freeToolTo: "/us-setup",
        freeToolLabel: "Zur US-Setup-Übersicht",
      },
    ],
  },

  {
    slug: "u18-check",
    kind: "quiz",
    routePrefix: "/quiz",
    kategorie: "Unter 18 & Eltern",
    dauer: "45 Sek.",
    xp: 150,
    seoTitle: "Unter 18 gründen Check (12 bis 17 Jahre) | GründerX",
    seoDescription: "Für Jugendliche (12 bis 17) und Eltern: Prüfe in 4 Fragen, ob du sofort starten darfst und wann Eltern und Familiengericht (§ 112 BGB) gebraucht werden.",
    titel: "Unter 18 starten: Was geht schon heute?",
    lead: "Für alle zwischen 12 und 17 (am besten direkt gemeinsam mit deinen Eltern). Vier Fragen, klare Antwort.",
    fragen: [
      {
        id: "alter_u18",
        frage: "Wie alt bist du?",
        optionen: [
          { id: "12-14", label: "12 bis 14 Jahre", ageGroup: "12-17", tag: "build" },
          { id: "15-17", label: "15 bis 17 Jahre", ageGroup: "12-17", tag: "approve" },
        ],
      },
      {
        id: "geld",
        frage: "Fließt schon regelmäßig Geld oder baust du erst?",
        optionen: [
          { id: "bauen", label: "Ich baue erst (Website, App, Kanal, Produkt)", tag: "build" },
          { id: "geld", label: "Ich will jetzt regelmäßig Geld verdienen", tag: "approve" },
        ],
      },
      {
        id: "eltern",
        frage: "Wissen deine Eltern schon Bescheid?",
        optionen: [
          { id: "ja", label: "Ja, sie unterstützen die Idee", tag: "approve" },
          { id: "noch_nicht", label: "Noch nicht, ich brauche klare Infos für sie", tag: "eltern" },
        ],
      },
    ],
    profile: [
      {
        key: "build",
        titel: "Leg sofort mit dem Bauen los (noch kein Amt nötig)",
        kurz: "Solange du noch keine dauerhaften Einnahmen erzielst, kannst du deine Website, App oder Idee frei entwickeln und testen. Sobald der erste Euro naht, bindest du deine Eltern ein.",
        naechsteSchritte: [
          "Erste Website oder App Schritt für Schritt fertig bauen",
          "Eltern das Projekt zeigen und die 6 U18-Regeln gemeinsam lesen",
        ],
        guideTo: "/webseite-und-app",
        guideLabel: "Website- & App-Start ansehen",
        freeToolTo: "/listicles/u18-gruenden-regeln",
        freeToolLabel: "6 Regeln für U18 & Eltern",
      },
      {
        key: "approve",
        titel: "Bereit für den offiziellen U18-Weg mit Eltern & Familiengericht",
        kurz: "Für regelmäßige Einnahmen braucht ihr die Zustimmung der Eltern und für ein eigenes Gewerbe den Antrag nach § 112 BGB beim Familiengericht. Die fertige Vorlage liegt im Guide.",
        naechsteSchritte: [
          "Antragsvorlage für das Familiengericht im U18-Guide ausfüllen",
          "Familienversicherung und Plattform-Altersgrenzen vorab prüfen",
        ],
        guideTo: "/u18-gruenden",
        guideLabel: "Zur U18-Anleitung",
        freeToolTo: "/listicles/u18-gruenden-regeln",
        freeToolLabel: "Checkliste für Eltern öffnen",
      },
      {
        key: "eltern",
        titel: "Erst deine Eltern mit klaren Fakten ins Boot holen",
        kurz: "Eltern reagieren viel entspannter, wenn sie sehen, dass Haftung, Schule und Anmeldung sauber geregelt sind. Zeig ihnen unsere kompakte U18-Seite.",
        naechsteSchritte: [
          "Das 3-Minuten-Listicle gemeinsam mit deinen Eltern lesen",
          "Zeitplan neben der Schule und kleine Startkosten abstimmen",
        ],
        guideTo: "/listicles/u18-gruenden-regeln",
        guideLabel: "Eltern-Übersicht öffnen",
        freeToolTo: "/u18-gruenden",
        freeToolLabel: "Zur U18-Startseite",
      },
    ],
  },

  {
    slug: "gruender-barometer",
    kind: "umfrage",
    routePrefix: "/umfrage",
    kategorie: "Gründer-Umfrage",
    dauer: "60 Sek.",
    xp: 200,
    seoTitle: "Gründer-Umfrage 2026: Sag uns, was dir fehlt (inkl. Rabatt) | GründerX",
    seoDescription: "Kurze anonyme Gründer-Umfrage (12 bis 70 Jahre): Welche Tutorials, Tools und Themen fehlen dir? Als Dankeschön schaltest du deinen GründerX-Aktionsrabatt frei.",
    titel: "Gründer-Umfrage: Was sollen wir als Nächstes bauen?",
    lead: "Hilf uns in 60 Sekunden, GründerX noch einfacher zu machen. Deine Antworten bleiben anonym und als Dankeschön schaltest du direkt deinen Aktions-Rabatt frei.",
    fragen: [
      {
        id: "alter",
        frage: "Zu welcher Altersgruppe gehörst du?",
        optionen: [
          { id: "12-17", label: "12 bis 17 Jahre", ageGroup: "12-17", tag: "danke" },
          { id: "18-25", label: "18 bis 25 Jahre", ageGroup: "18-25", tag: "danke" },
          { id: "26-39", label: "26 bis 39 Jahre", ageGroup: "26-39", tag: "danke" },
          { id: "40-54", label: "40 bis 54 Jahre", ageGroup: "40-54", tag: "danke" },
          { id: "55-70", label: "55 bis 70+ Jahre", ageGroup: "55-70", tag: "danke" },
        ],
      },
      {
        id: "wunsch_ziel",
        frage: "Welches Ziel ist dir in den nächsten 3 Monaten am wichtigsten?",
        optionen: [
          { id: "website_app", label: "Eigene Website oder App fertigstellen", goal: "website_app", tag: "danke" },
          { id: "gewerbe", label: "Gewerbe, ELSTER & Steuern sauber erledigen", goal: "gewerbe", tag: "danke" },
          { id: "ecom", label: "Amazon, Shopify oder TikTok Shop starten", goal: "ecom", tag: "danke" },
          { id: "us_amex", label: "US-Amex, US-Bank oder US-LLC aufbauen", goal: "us_amex", tag: "danke" },
          { id: "kunden", label: "Erste Kunden als Freelancer / Creator gewinnen", goal: "kunden", tag: "danke" },
        ],
      },
      {
        id: "lernstil",
        frage: "Wie lernst du am liebsten auf dem Handy?",
        optionen: [
          { id: "schritte", label: "Kurze Klick-Schritte mit Checkliste (wie Studyflix)", tag: "danke" },
          { id: "fenster", label: "Direkte Arbeitsfenster zum Ausfüllen (Formulare/Rechner)", tag: "danke" },
          { id: "quiz", label: "Spielerisch mit Quizzen, XP und Meilensteinen", tag: "danke" },
          { id: "chat", label: "Kurze Fragen direkt an KI-Co-Pilot Felix", tag: "danke" },
        ],
      },
      {
        id: "groesster_wunsch",
        frage: "Welcher neue Guide würde dir am meisten helfen?",
        optionen: [
          { id: "amex_business", label: "Mehr zu US-Business-Amex & US-Banking", tag: "danke" },
          { id: "app_bau", label: "Eigene Handy-App bauen & vermarkten", tag: "danke" },
          { id: "steuer_alltag", label: "Steuer-Alltag (EÜR, USt-VA, Belege in 15 Min.)", tag: "danke" },
          { id: "u18_oder_50plus", label: "Spezial-Guides für U18 oder Neustart ab 50", tag: "danke" },
        ],
      },
    ],
    profile: [
      {
        key: "danke",
        titel: "Danke für dein Feedback!",
        kurz: "Deine Antworten helfen uns direkt dabei, die nächsten Guides und App-Funktionen noch simpler zu bauen. Dein Aktions-Rabatt ist unten freigeschaltet.",
        naechsteSchritte: [
          "Aktions-Code unten mit einem Klick kopieren",
          "Oder direkt eines unserer Gratis-Tools ohne Konto testen",
        ],
        guideTo: "/guides",
        guideLabel: "Alle Guides entdecken",
        freeToolTo: "/gratis-tools",
        freeToolLabel: "Gratis-Tools ausprobieren",
      },
    ],
  },

  {
    slug: "webseite-app-check",
    kind: "quiz",
    routePrefix: "/quiz",
    kategorie: "Webseite & App",
    dauer: "60 Sek.",
    xp: 150,
    seoTitle: "Webseite oder App Quiz: Welcher Start passt zu deiner Idee? | GründerX",
    seoDescription: "Prüfe in 4 Fragen, ob du zuerst eine Website, eine Web-App oder direkt eine App für App Store & Play Store bauen solltest. Mit konkretem Fahrplan & Rabatt.",
    titel: "Webseite oder App: Womit solltest du starten?",
    lead: "Vier kurze Fragen zu Ziel, Budget und Technik. Du bekommst einen klaren Bauplan bis zum Go-Live und schaltest deinen Rabatt frei.",
    fragen: [
      {
        id: "typ",
        frage: "Was sollen Nutzer bei dir als Erstes tun?",
        optionen: [
          { id: "info", label: "Sich informieren, buchen oder etwas kaufen", sub: "Dienstleistung, Portfolio, Produktseite", goal: "website", tag: "website" },
          { id: "tool", label: "Regelmäßig im Browser arbeiten oder rechnen", sub: "SaaS, Rechner, Mitgliederbereich", goal: "webapp", tag: "webapp" },
          { id: "mobile", label: "Täglich am Handy tippen (Push, Offline, Store)", sub: "Eigene App für iOS und Android", goal: "app", tag: "app" },
        ],
      },
      {
        id: "zeit_launch",
        frage: "Wann willst du deine erste Version live sehen?",
        optionen: [
          { id: "woche", label: "In 1 bis 2 Wochen", tag: "website" },
          { id: "monat", label: "In 4 bis 8 Wochen", tag: "webapp" },
          { id: "quartal", label: "In 2 bis 4 Monaten (inkl. Store-Review)", tag: "app" },
        ],
      },
      {
        id: "sichtbarkeit",
        frage: "Woher sollen deine ersten Besucher kommen?",
        optionen: [
          { id: "seo", label: "Google, ChatGPT & Empfehlungen", tag: "website" },
          { id: "social", label: "TikTok, Instagram, YouTube oder Ads", tag: "webapp" },
          { id: "store", label: "App Store & Google Play Suche", tag: "app" },
        ],
      },
      {
        id: "alter_tech",
        frage: "Wie alt bist du?",
        optionen: [
          { id: "12-17", label: "12 bis 17 Jahre", ageGroup: "12-17", tag: "website" },
          { id: "18-39", label: "18 bis 39 Jahre", ageGroup: "26-39", tag: "webapp" },
          { id: "40-70", label: "40 bis 70+ Jahre", ageGroup: "55-70", tag: "website" },
        ],
      },
    ],
    profile: [
      {
        key: "website",
        titel: "Starte mit einer schnellen, klaren Website",
        kurz: "Eine Website ist in Tagen live, braucht kein Store-Review und wird direkt über Google und KI-Suche gefunden. Später machst du daraus bei Bedarf eine App.",
        naechsteSchritte: [
          "Domain & Markenname vorab im Brand-Check prüfen",
          "Impressum, Datenschutz und klare Angebotsseite einrichten",
          "Guide „Erste Webseite & SEO“ Schritt für Schritt durchgehen",
        ],
        guideTo: "/guides/erste-webseite-seo",
        guideLabel: "Zum Website- & SEO-Guide",
        freeToolTo: "/tools/brand-check",
        freeToolLabel: "Gratis Brand-Check starten",
      },
      {
        key: "webapp",
        titel: "Starte als mobile-first Web-App (PWA)",
        kurz: "So sparst du dir am Anfang doppelte Entwicklung für iOS und Android. Deine Nutzer speichern die App direkt am Handy, und du kannst später jederzeit in die Stores gehen.",
        naechsteSchritte: [
          "Erste Version für 390 px Handy-Bildschirm bauen",
          "Login, Bezahlstrecke und Rechtstexte sauber einbinden",
          "Webseite- & App-Übersicht Schritt für Schritt abhaken",
        ],
        guideTo: "/webseite-und-app",
        guideLabel: "Zur Website- & App-Übersicht",
        freeToolTo: "/businessplan-erstellen",
        freeToolLabel: "Kurz-Konzept erstellen",
      },
      {
        key: "app",
        titel: "Gehe gezielt Richtung App Store & Play Store",
        kurz: "Plane frühzeitig Apple Developer Account (99 $/Jahr), Google Play (25 $ einmalig), Datenschutzerklärung, Impressum und Testphase ein.",
        naechsteSchritte: [
          "Mobile-first Basis mit sauberer Navigation bauen",
          "Store-Pflichten (Privacy Policy, Konto-Löschung, Screenshots) vorbereiten",
          "App-Launch-Guide Schritt für Schritt durchgehen",
        ],
        guideTo: "/guides/eigene-app-launchen",
        guideLabel: "Zum App-Launch-Guide",
        freeToolTo: "/webseite-und-app",
        freeToolLabel: "Alle App-Schritte ansehen",
      },
    ],
  },

  {
    slug: "shop-amazon-check",
    kind: "quiz",
    routePrefix: "/quiz",
    kategorie: "E-Commerce & Verkauf",
    dauer: "60 Sek.",
    xp: 150,
    seoTitle: "Shopify, Amazon FBA oder TikTok Shop? Das E-Commerce-Quiz | GründerX",
    seoDescription: "Welcher Verkaufskanal passt zu deinem Budget, Produkt und deiner Zeit? 4 klare Fragen zu Shopify, Amazon FBA und TikTok Shop inkl. Pflichten-Check.",
    titel: "Eigener Shop, Amazon FBA oder TikTok Shop?",
    lead: "Vier Fragen zu Produkt, Budget und Reichweite. Du siehst sofort, welcher Kanal sich zum Start lohnt und welche Pflichten davor stehen.",
    fragen: [
      {
        id: "produkt",
        frage: "Was willst du verkaufen?",
        optionen: [
          { id: "eigen", label: "Eigene Marke oder individuelles Produkt", goal: "shop", tag: "shopify" },
          { id: "suche", label: "Alltagsprodukt, nach dem Leute aktiv suchen", goal: "amazon", tag: "amazon" },
          { id: "impuls", label: "Visuelles Produkt für kurze Videos & Creator", goal: "tiktok", tag: "tiktok" },
        ],
      },
      {
        id: "budget",
        frage: "Wie viel Startbudget hast du für Ware & Setup?",
        optionen: [
          { id: "klein", label: "Unter 1.500 €", tag: "tiktok" },
          { id: "mittel", label: "1.500 € bis 6.000 €", tag: "shopify" },
          { id: "hoch", label: "Über 6.000 €", tag: "amazon" },
        ],
      },
      {
        id: "content",
        frage: "Willst du selbst Videos drehen oder lieber ohne Kamera verkaufen?",
        optionen: [
          { id: "kamera_ja", label: "Gern kurze Videos oder Creator-Kooperationen", tag: "tiktok" },
          { id: "kamera_nein", label: "Lieber ohne eigene Kamera über Suche & Listings", tag: "amazon" },
          { id: "mix", label: "Gemischt: eigene Marke, Shop und Ads", tag: "shopify" },
        ],
      },
      {
        id: "pflichten",
        frage: "Hast du schon Gewerbe & LUCID-Verpackungslizenz?",
        optionen: [
          { id: "ja", label: "Ja, steht schon", tag: "shopify" },
          { id: "nein", label: "Noch nicht, ich starte bei null", tag: "amazon" },
        ],
      },
    ],
    profile: [
      {
        key: "shopify",
        titel: "Dein Startkanal: Eigener Online-Shop (Shopify)",
        kurz: "Volle Kontrolle über Marke, Kundenkontakte und Marge. Vor dem ersten Paket klärst du Gewerbe, Impressum, Widerruf, LUCID und dein Versandkonto.",
        naechsteSchritte: [
          "Verpackungslizenz (LUCID) vor dem ersten Versand berechnen",
          "Pflichttexte, Cookie-Consent und Zahlungsanbieter sauber verbinden",
          "Shopify-Launch-Guide Schritt für Schritt abhaken",
        ],
        guideTo: "/guides/shopify-launch",
        guideLabel: "Zum Shopify-Guide",
        freeToolTo: "/tools/lucid-wizard",
        freeToolLabel: "Gratis LUCID-Rechner starten",
      },
      {
        key: "amazon",
        titel: "Dein Startkanal: Amazon FBA",
        kurz: "Bestehende Kaufnachfrage ohne eigenes Publikum. Entscheidend ist die saubere Reihenfolge: Gewerbe, USt-IdNr., LUCID, Markenprüfung und Verifizierung.",
        naechsteSchritte: [
          "Gewerbe, ELSTER-Fragebogen und USt-IdNr. in Woche 1 anstoßen",
          "LUCID-Nummer und ggf. WEEE/GPSR vor dem ersten Listing klären",
          "Amazon-Händler-Übersicht Schritt für Schritt durchgehen",
        ],
        guideTo: "/amazon-haendler",
        guideLabel: "Zur Amazon-Übersicht",
        freeToolTo: "/tools/lucid-wizard",
        freeToolLabel: "LUCID-Pflicht prüfen",
      },
      {
        key: "tiktok",
        titel: "Dein Startkanal: TikTok Shop",
        kurz: "Schneller Start über kurze Videos und Creator-Affiliate. Achte auf das Mindestalter von 18 Jahren, saubere Gewerbeanmeldung und Produktpflichten.",
        naechsteSchritte: [
          "Kostenlose TikTok-Shop-Checkliste für dein Produkt durchgehen",
          "Gewerbe + Steuernummer sauber vor der Registrierung anlegen",
          "TikTok-Shop-Guide Schritt für Schritt umsetzen",
        ],
        guideTo: "/tiktok-shop",
        guideLabel: "Zur TikTok-Shop-Seite",
        freeToolTo: "/tiktok-shop-checkliste",
        freeToolLabel: "Gratis TikTok-Checkliste",
      },
    ],
  },

  {
    slug: "nebengewerbe-check",
    kind: "quiz",
    routePrefix: "/quiz",
    kategorie: "Wissens-Quiz",
    dauer: "90 Sek.",
    xp: 200,
    isKnowledgeQuiz: true,
    seoTitle: "Nebengewerbe-Quiz 2026: Arbeitgeber, Krankenkasse, 410 € & DAC7 | GründerX",
    seoDescription: "5 praxisnahe Fragen rund ums Nebengewerbe: Wann muss der Arbeitgeber informiert werden, wann greift die Krankenkasse und wie zählt die 410-€-Grenze?",
    titel: "Nebengewerbe-Quiz: 5 Regeln neben Job oder Studium",
    lead: "Klick deine Antwort an und sieh direkt die echte Rechtslage mit Kurz-Erklärung. Danach bekommst du Score, XP und deinen Rabatt.",
    fragen: [
      {
        id: "ag",
        frage: "Darf dein Arbeitgeber dir ein Nebengewerbe pauschal verbieten?",
        optionen: [
          { id: "a", label: "Ja, ohne Begründung jederzeit", correct: false },
          { id: "b", label: "Nein, nur bei berechtigtem Interesse (z. B. Konkurrenz oder Überlastung)", correct: true },
          { id: "c", label: "Er muss gar nichts davon erfahren, selbst wenn es im Vertrag steht", correct: false },
        ],
        erklaerung: "Prüfe deinen Arbeitsvertrag: Meist gilt eine Anzeigepflicht. Ein generelles Verbot ist in der Regel unwirksam, solange du keine Konkurrenz machst und deinen Hauptjob nicht beeinträchtigst.",
      },
      {
        id: "kk",
        frage: "Wann bleibt deine gesetzliche Krankenversicherung im Hauptjob meist unverändert?",
        optionen: [
          { id: "a", label: "Solange die Selbstständigkeit klar nebenberuflich bleibt (Zeit & Einkommen unter dem Hauptjob)", correct: true },
          { id: "b", label: "Immer, egal wie hoch Gewinn und Arbeitszeit sind", correct: false },
        ],
        erklaerung: "Solange dein Angestelltenverhältnis zeitlich und wirtschaftlich klar überwiegt, bleibt es bei den Beiträgen aus dem Hauptjob. Im Zweifel kurz schriftlich bei deiner Krankenkasse abklären.",
      },
      {
        id: "h410",
        frage: "Was bedeutet die 410-€-Härteausgleichsgrenze (§ 46 Abs. 3 EStG) für Angestellte?",
        optionen: [
          { id: "a", label: "Bis 410 € Nebengewinn im Jahr fällt keine zusätzliche Einkommensteuer an", correct: true },
          { id: "b", label: "Bis 410 € pro Monat ist jedes Gewerbe anmeldefrei", correct: false },
        ],
        erklaerung: "Die 410 € gelten pro Kalenderjahr für Nebeneinkünfte neben Arbeitslohn (§ 46 Abs. 3 EStG), nicht pro Monat. Zwischen 410 € und 820 € greift ein gleitender Übergang.",
      },
      {
        id: "steuerklasse",
        frage: "Ändert sich durch ein Nebengewerbe deine Steuerklasse im Hauptjob?",
        optionen: [
          { id: "a", label: "Ja, man rutscht automatisch in Steuerklasse VI", correct: false },
          { id: "b", label: "Nein, die Steuerklasse im Hauptjob bleibt unverändert", correct: true },
        ],
        erklaerung: "Steuerklasse VI gilt nur für einen zweiten sozialversicherungspflichtigen Job. Dein Nebengewerbe wird über die Einkommensteuererklärung (Anlage G oder S) mit deinem Gehalt zusammen veranlagt.",
      },
      {
        id: "belege",
        frage: "Wann lohnt sich ein getrenntes Konto für dein Nebengewerbe?",
        optionen: [
          { id: "a", label: "Von Anfang an, damit private und geschäftliche Buchungen sauber getrennt sind", correct: true },
          { id: "b", label: "Erst ab 100.000 € Umsatz", correct: false },
        ],
        erklaerung: "Ein eigenes Konto (oder Unterkonto) spart bei der jährlichen EÜR Stunden an Sortierarbeit und vermeidet Rückfragen.",
      },
    ],
    profile: [
      {
        key: "high",
        titel: "Bestens vorbereitet fürs Nebengewerbe!",
        kurz: "Du kennst die wichtigsten Spielregeln neben Job oder Studium. Jetzt kannst du Anmeldung, ELSTER und erstes Konto zügig abhaken.",
        naechsteSchritte: [
          "Nebengewerbe-Fahrplan öffnen und Schritt 1 starten",
          "Startkosten und Rücklagen kurz durchrechnen",
        ],
        guideTo: "/nebengewerbe",
        guideLabel: "Zur Nebengewerbe-Seite",
        freeToolTo: "/gruendungskosten-rechner",
        freeToolLabel: "Kosten berechnen",
      },
      {
        key: "mid",
        titel: "Gute Basis, 1 bis 2 wichtige Details waren neu!",
        kurz: "Gerade Krankenkasse, 410-€-Grenze und Steuerklasse sorgen oft für Mythen. Gut, dass du es jetzt sauber weißt.",
        naechsteSchritte: [
          "Nebengewerbe-Übersicht kurz durchgehen",
          "Rechtsform & Schwellen kostenlos prüfen",
        ],
        guideTo: "/nebengewerbe",
        guideLabel: "Nebengewerbe-Übersicht öffnen",
        freeToolTo: "/rechtsform-finden",
        freeToolLabel: "Gratis Rechtsform-Finder",
      },
      {
        key: "low",
        titel: "Perfekt, dass du die Regeln vor dem Start getestet hast!",
        kurz: "Mit der richtigen Reihenfolge ist ein Nebengewerbe an einem Wochenende angestoßen, ohne dass du etwas übersiehst.",
        naechsteSchritte: [
          "Schritt-für-Schritt-Seite fürs Nebengewerbe öffnen",
          "5 typische Reihenfolge-Fehler im Listicle nachlesen",
        ],
        guideTo: "/nebengewerbe",
        guideLabel: "Zum Nebengewerbe-Start",
        freeToolTo: "/listicles/gruendung-fehler-reihenfolge",
        freeToolLabel: "5 Fehler nachlesen",
      },
    ],
  },

  {
    slug: "foerderung-check",
    kind: "quiz",
    routePrefix: "/quiz",
    kategorie: "Förderung & Geld",
    dauer: "60 Sek.",
    xp: 150,
    seoTitle: "Fördermittel- & Gründungszuschuss-Quiz 2026 | GründerX",
    seoDescription: "Prüfe in 4 kurzen Fragen, ob Gründungszuschuss, KfW-Kredit, EXIST oder regionale Zuschüsse für dein Vorhaben infrage kommen.",
    titel: "Welche Förderung passt zu deinem Start?",
    lead: "Vier Fragen zu Ausgangslage, Hochschule und Kapitalbedarf. Du siehst sofort, welche Töpfe sich für dich lohnen und wann der Antrag raus muss.",
    fragen: [
      {
        id: "lage",
        frage: "Aus welcher Situation heraus startest du?",
        optionen: [
          { id: "alg1", label: "Arbeitslosengeld I (ALG I) oder drohende Arbeitslosigkeit", tag: "gz" },
          { id: "uni", label: "Studium, Forschung oder Hochschule", tag: "exist" },
          { id: "job", label: "Angestellt, selbstständig oder Rentenübergang", tag: "kfw" },
        ],
      },
      {
        id: "kapitalbedarf",
        frage: "Wie viel Kapital brauchst du für den Start?",
        optionen: [
          { id: "klein", label: "Unter 10.000 € (Lebenshaltung / kleine Startkosten)", tag: "gz" },
          { id: "mittel", label: "10.000 € bis 125.000 € (Ware, Ausstattung, Aufbau)", tag: "kfw" },
          { id: "tech", label: "Innovatives Tech-/Software-Team mit Entwicklungszeit", tag: "exist" },
        ],
      },
      {
        id: "gestartet",
        frage: "Hast du dein Gewerbe oder große Verträge schon unterschrieben?",
        hinweis: "Bei fast allen Förderungen gilt: Erst beantragen, dann starten.",
        optionen: [
          { id: "noch_nicht", label: "Nein, ich bin noch in der Planung", tag: "gz" },
          { id: "ja", label: "Ja, ich bin schon gestartet", tag: "kfw" },
        ],
      },
      {
        id: "bp",
        frage: "Hast du schon einen fertigen Businessplan mit Finanzplan?",
        optionen: [
          { id: "ja", label: "Ja, liegt schon vor", tag: "kfw" },
          { id: "nein", label: "Noch nicht, den brauche ich noch", tag: "gz" },
        ],
      },
    ],
    profile: [
      {
        key: "gz",
        titel: "Prüfe zuerst den Gründungszuschuss (§ 93 SGB III)",
        kurz: "Wenn du noch mindestens 150 Tage Restanspruch auf ALG I hast, kann der Gründungszuschuss deine ersten Monate absichern. Wichtig: erst mit der Agentur sprechen und tragfähigen Businessplan samt fachkundiger Stellungnahme einreichen.",
        naechsteSchritte: [
          "Kostenlosen Businessplan als Grundlage erstellen",
          "Gründungszuschuss-Check im Cockpit durchgehen",
          "Termin bei der Arbeitsagentur vor der Gewerbeanmeldung vereinbaren",
        ],
        guideTo: "/guides/foerderung-stipendium",
        guideLabel: "Zum Förder-Guide",
        freeToolTo: "/businessplan-erstellen",
        freeToolLabel: "Gratis Businessplan starten",
      },
      {
        key: "exist",
        titel: "Prüfe EXIST-Gründungsstipendium & Hochschul-Programme",
        kurz: "Für Studierende, Absolventen und Forschende gibt es eigenkapitalfreie Stipendien plus Sachmittel. Der Antrag läuft über das Gründungsnetzwerk deiner Hochschule.",
        naechsteSchritte: [
          "Gründungsberatung deiner Hochschule kontaktieren",
          "Konzept und Teamrollen schriftlich schärfen",
          "Förder-Guide und Startup-Guthaben prüfen",
        ],
        guideTo: "/guides/foerderung-stipendium",
        guideLabel: "Zum Förder-Guide",
        freeToolTo: "/startup-guthaben",
        freeToolLabel: "Startup-Guthaben ansehen",
      },
      {
        key: "kfw",
        titel: "Prüfe KfW-StartGeld (067) & Landes-Zuschüsse",
        kurz: "Über deine Hausbank läuft der KfW-ERP-Gründerkredit StartGeld (bis 125.000 € bis 80 % Haftungsfreistellung). Parallel lohnt ein Blick in regionale Digital- oder Beratungszuschüsse deines Bundeslands.",
        naechsteSchritte: [
          "Kapitalbedarf realistisch im Kosten-Rechner prüfen",
          "Businessplan für das Bankgespräch vorbereiten",
          "Förder-Datenbank nach deinem Bundesland filtern",
        ],
        guideTo: "/guides/foerderung-stipendium",
        guideLabel: "Zum Förder-Guide",
        freeToolTo: "/gruendungskosten-rechner",
        freeToolLabel: "Startkosten berechnen",
      },
    ],
  },

  {
    slug: "huerden-check",
    kind: "umfrage",
    routePrefix: "/umfrage",
    kategorie: "Persona-Umfrage",
    dauer: "60 Sek.",
    xp: 200,
    seoTitle: "Gründer-Hürden-Umfrage: Wo klemmt es wirklich? (mit Rabatt) | GründerX",
    seoDescription: "Kurze anonyme Umfrage zu deinen echten Stolpersteinen beim Gründen (12 bis 70). Hilf uns, die Anleitungen zu verbessern und schalte deinen Rabatt frei.",
    titel: "Hürden-Umfrage: Wo klemmt es bei dir gerade wirklich?",
    lead: "Vier ehrliche Fragen, null Fachchinesisch. Deine Antworten fließen direkt in unsere nächsten Schritt-für-Schritt-Guides ein, und am Ende wartet dein Aktionscode.",
    fragen: [
      {
        id: "alter",
        frage: "In welcher Altersgruppe bist du?",
        optionen: [
          { id: "12-17", label: "12 bis 17 Jahre", ageGroup: "12-17", tag: "danke" },
          { id: "18-25", label: "18 bis 25 Jahre", ageGroup: "18-25", tag: "danke" },
          { id: "26-39", label: "26 bis 39 Jahre", ageGroup: "26-39", tag: "danke" },
          { id: "40-54", label: "40 bis 54 Jahre", ageGroup: "40-54", tag: "danke" },
          { id: "55-70", label: "55 bis 70+ Jahre", ageGroup: "55-70", tag: "danke" },
        ],
      },
      {
        id: "hauptbremse",
        frage: "Was hält dich heute konkret davon ab, den nächsten Schritt abzuhaken?",
        optionen: [
          { id: "angst_fehler", label: "Sorge vor teuren Fehlern bei Finanzamt oder Abmahnungen", goal: "sicherheit", tag: "danke" },
          { id: "zeitmangel", label: "Wenig Zeit neben Schule, Studium, Job oder Familie", goal: "zeit", tag: "danke" },
          { id: "infoflut", label: "Zu viele widersprüchliche Tipps auf YouTube & in Foren", goal: "klarheit", tag: "danke" },
          { id: "technik_huerde", label: "Technik-Hürden bei Webseite, App, Shop oder Zahlung", goal: "technik", tag: "danke" },
        ],
      },
      {
        id: "preis_sensitiv",
        frage: "Wofür würdest du am ehesten Geld ausgeben, wenn es dir Stunden spart?",
        optionen: [
          { id: "formulare", label: "Ausfüllhilfen für ELSTER, Gewerbeamt und Rechnungen", tag: "danke" },
          { id: "fertiges_produkt", label: "Klare Bauanleitung bis Webseite, App oder Shop live ist", tag: "danke" },
          { id: "us_spezial", label: "Ehrliche Spezial-Guides (US-Amex, US-LLC, Banking)", tag: "danke" },
          { id: "alles_eins", label: "Alles in einer einfachen App statt fünf Einzel-Abos", tag: "danke" },
        ],
      },
      {
        id: "geraet",
        frage: "Wo erledigst du deine Schritte am häufigsten?",
        optionen: [
          { id: "handy", label: "Fast nur am Handy (App / unterwegs)", tag: "danke" },
          { id: "mix", label: "Lernen am Handy, Formulare am Laptop", tag: "danke" },
          { id: "desktop", label: "Fast nur am Laptop oder Desktop", tag: "danke" },
        ],
      },
    ],
    profile: [
      {
        key: "danke",
        titel: "Danke, das hilft uns enorm weiter!",
        kurz: "Jede Antwort zeigt uns genau, wo Texte noch kürzer und Arbeitsfenster noch direkter sein müssen. Dein Aktions-Rabatt ist unten freigeschaltet.",
        naechsteSchritte: [
          "Aktions-Code unten mit einem Klick kopieren",
          "Passenden Guide oder ein Gratis-Tool direkt ausprobieren",
        ],
        guideTo: "/guides",
        guideLabel: "Alle 81 Guides ansehen",
        freeToolTo: "/gratis-tools",
        freeToolLabel: "Gratis-Tools testen",
      },
    ],
  },

  {
    slug: "app-und-tool-wunsch",
    kind: "umfrage",
    routePrefix: "/umfrage",
    kategorie: "Produkt-Umfrage",
    dauer: "45 Sek.",
    xp: 200,
    seoTitle: "App- & Tool-Wunsch-Umfrage: Bau mit an GründerX (mit Rabatt) | GründerX",
    seoDescription: "Welche App-Funktionen, Rechner und interaktiven Guides wünschst du dir als Nächstes in GründerX? 4 Klicks + Aktions-Rabatt als Dankeschön.",
    titel: "App- & Tool-Umfrage: Welche Funktion fehlt dir noch?",
    lead: "Wir entwickeln die GründerX Web- & Mobile-App laufend weiter. Sag uns in 45 Sekunden, was dir den Alltag am stärksten erleichtert.",
    fragen: [
      {
        id: "alter",
        frage: "Zu welcher Altersgruppe gehörst du?",
        optionen: [
          { id: "12-17", label: "12 bis 17 Jahre", ageGroup: "12-17", tag: "danke" },
          { id: "18-25", label: "18 bis 25 Jahre", ageGroup: "18-25", tag: "danke" },
          { id: "26-39", label: "26 bis 39 Jahre", ageGroup: "26-39", tag: "danke" },
          { id: "40-54", label: "40 bis 54 Jahre", ageGroup: "40-54", tag: "danke" },
          { id: "55-70", label: "55 bis 70+ Jahre", ageGroup: "55-70", tag: "danke" },
        ],
      },
      {
        id: "app_feature",
        frage: "Welche Funktion in der Handy-App wäre dein Favorit?",
        optionen: [
          { id: "push_fristen", label: "Push-Erinnerungen vor Steuer- und Meldefristen", goal: "fristen", tag: "danke" },
          { id: "beleg_scan", label: "Schneller Beleg- & Rechnungs-Check unterwegs", goal: "rechnungen", tag: "danke" },
          { id: "mini_lektionen", label: "5-Minuten-Lektionen mit Serie (Streak) & XP", goal: "lernen", tag: "danke" },
          { id: "offline_guides", label: "Offline-Modus für Guides im Zug oder Flugzeug", goal: "offline", tag: "danke" },
        ],
      },
      {
        id: "neues_tool",
        frage: "Welchen neuen Rechner oder Wizard sollen wir als Nächstes bauen?",
        optionen: [
          { id: "amex_punkte", label: "US-Amex Punkte- & Flug-Wert-Rechner (DE vs. US)", tag: "danke" },
          { id: "app_kosten", label: "Website- & App-Budget-Rechner (Eigenbau vs. Agentur)", tag: "danke" },
          { id: "u18_paket", label: "Komplett-Paket für Jugendliche & Eltern (§ 112 BGB)", tag: "danke" },
          { id: "preis_kalk", label: "Angebots- & Stundensatz-Assistent für erste Kunden", tag: "danke" },
        ],
      },
      {
        id: "nutzung",
        frage: "Wie oft würdest du die GründerX-App pro Woche öffnen?",
        optionen: [
          { id: "taeglich", label: "Fast täglich (5 bis 10 Minuten)", tag: "danke" },
          { id: "woche", label: "2 bis 3 Mal pro Woche am Abend", tag: "danke" },
          { id: "bedarf", label: "Immer dann, wenn ein Formular oder Termin ansteht", tag: "danke" },
        ],
      },
    ],
    profile: [
      {
        key: "danke",
        titel: "Danke für deine Stimme!",
        kurz: "Dein Wunsch landet direkt in unserer Produkt-Liste für die nächsten Updates von Web & App. Unten wartet dein Aktions-Rabatt.",
        naechsteSchritte: [
          "Aktions-Code unten sichern",
          "Unsere kostenlosen Checks oder das Lern-Studio testen",
        ],
        guideTo: "/quiz",
        guideLabel: "Weitere Quizze entdecken",
        freeToolTo: "/gratis-tools",
        freeToolLabel: "Gratis-Tools öffnen",
      },
    ],
  },
];

export const getQuiz = (slug: string) => QUIZZES.find((q) => q.slug === slug);
