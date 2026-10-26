// Gründungspaket 2026 – was die Produktseite zeigen darf: Inhaltsverzeichnis
// und Quellen, NICHT die Texte selbst (die liegen in
// scripts/gruendungspaket/inhalt.mjs und nur in der Edge Function).
// gruendungspaket.test.ts prüft, dass diese Liste zur gebauten ZIP passt.

export const PAKET_STAND = "26.10.2026";

/**
 * Kauf-Knopf. Aus, bis ein echter Live-Testkauf möglich war (Betreiber-Freigabe
 * nötig). Einschalten: Vercel-Umgebungsvariable VITE_GRUENDUNGSPAKET_VERKAUF=1.
 */
export const PAKET_VERKAUF_AKTIV = import.meta.env.VITE_GRUENDUNGSPAKET_VERKAUF === "1";

export interface PaketDokument {
  datei: string;
  titel: string;
  formate: string[];
  nutzen: string;
}

export const PAKET_DOKUMENTE: PaketDokument[] = [
  { datei: "00-Uebersicht-und-Quellen", titel: "Übersicht, Reihenfolge und Quellen", formate: ["pdf"], nutzen: "Welcher Schritt wann dran ist – auf einer Seite." },
  { datei: "01-Rechnungsvorlage-Regelbesteuerung", titel: "Rechnung (Regelbesteuerung)", formate: ["docx", "pdf"], nutzen: "Die Pflichtangaben nach § 14 Abs. 4 UStG schon im Layout." },
  { datei: "02-Rechnungsvorlage-Kleinunternehmer", titel: "Rechnung (Kleinunternehmer nach § 19 UStG)", formate: ["docx", "pdf"], nutzen: "Mit dem richtigen Hinweis auf die Steuerbefreiung (§ 34a UStDV)." },
  { datei: "03-Rechnungsvorlage-Kleinbetrag", titel: "Rechnung über einen Kleinbetrag (bis 250 Euro brutto)", formate: ["docx", "pdf"], nutzen: "Die schlanke Variante nach § 33 UStDV." },
  { datei: "04-Leitfaden-E-Rechnung", titel: "Leitfaden E-Rechnung 2025–2028", formate: ["pdf", "docx"], nutzen: "Wann du was darfst – mit allen Übergangsfristen bis 2028." },
  { datei: "05-Checkliste-Gewerbeanmeldung", titel: "Checkliste Gewerbeanmeldung", formate: ["pdf", "docx"], nutzen: "Was du klärst, mitbringst und was danach passiert." },
  { datei: "06-Checkliste-Fragebogen-steuerliche-Erfassung", titel: "Checkliste Fragebogen zur steuerlichen Erfassung", formate: ["pdf", "docx"], nutzen: "Alle Angaben vorher gesammelt – Frist: ein Monat." },
  { datei: "07-Checkliste-ELSTER-Zugang", titel: "Checkliste ELSTER-Zugang", formate: ["pdf", "docx"], nutzen: "Welche Registrierung zu dir passt und wie lange der Brief dauert." },
  { datei: "08-Checkliste-USt-IdNr", titel: "Checkliste Umsatzsteuer-Identifikationsnummer", formate: ["pdf", "docx"], nutzen: "Die drei Wege zum Antrag beim BZSt." },
  { datei: "09-Gruender-Tracker", titel: "Gründer-Tracker: Rechnungen, Kleinunternehmer-Grenzen, Fristen", formate: ["xlsx"], nutzen: "Rechnet USt, Brutto und deine Kleinunternehmer-Grenze mit." },
];

export const PAKET_QUELLEN: Array<{ titel: string; url: string }> = [
  { titel: "§ 14 GewO", url: "https://www.gesetze-im-internet.de/gewo/__14.html" },
  { titel: "§ 138 AO", url: "https://www.gesetze-im-internet.de/ao_1977/__138.html" },
  { titel: "§ 14 UStG", url: "https://www.gesetze-im-internet.de/ustg_1980/__14.html" },
  { titel: "§ 15 UStG", url: "https://www.gesetze-im-internet.de/ustg_1980/__15.html" },
  { titel: "§ 19 UStG", url: "https://www.gesetze-im-internet.de/ustg_1980/__19.html" },
  { titel: "§ 27 Abs. 38 UStG", url: "https://www.gesetze-im-internet.de/ustg_1980/__27.html" },
  { titel: "§ 27a UStG", url: "https://www.gesetze-im-internet.de/ustg_1980/__27a.html" },
  { titel: "§ 33 UStDV", url: "https://www.gesetze-im-internet.de/ustdv_1980/__33.html" },
  { titel: "§ 34a UStDV", url: "https://www.gesetze-im-internet.de/ustdv_1980/__34a.html" },
  { titel: "BMF-Schreiben vom 15.10.2025 (E-Rechnung)", url: "https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Steuerarten/Umsatzsteuer/Umsatzsteuer-Anwendungserlass/2025-10-15-einfuehrung-obligatorische-e-rechnung.html" },
  { titel: "ELSTER-Hilfe Registrierung", url: "https://www.elster.de/eportal/helpGlobal?themaGlobal=help_registrierung" },
  { titel: "BZSt: USt-IdNr. beantragen", url: "https://www.bzst.de/DE/Unternehmen/Identifikationsnummern/Umsatzsteuer-Identifikationsnummer/FAQ/FAQ_Vergabe/FAQTexte/faq_003.html" },
  { titel: "BZSt: Vergabe der USt-IdNr.", url: "https://www.bzst.de/DE/Unternehmen/Identifikationsnummern/Umsatzsteuer-Identifikationsnummer/Vergabe_USt_IdNr/vergabe_ust_idnr_node.html" },
];

export const PAKET_FAQ: Array<{ q: string; a: string }> = [
  {
    q: "Brauche ich als Kleinunternehmer eine E-Rechnung?",
    a: "Ausstellen musst du keine: Rechnungen von Kleinunternehmern dürfen immer auf Papier oder – mit Zustimmung des Empfängers – als PDF gehen (§ 34a UStDV). Empfangen können musst du E-Rechnungen aber seit 2025; ein normales E-Mail-Postfach reicht laut BMF-Schreiben vom 15.10.2025.",
  },
  {
    q: "Bis wann darf ich an Firmen noch PDF-Rechnungen schicken?",
    a: "Für Leistungen bis 31.12.2026 mit Zustimmung des Empfängers; 2027 nur noch, wenn dein Gesamtumsatz im Vorjahr höchstens 800.000 € betrug; ab 2028 gilt bei inländischen B2B-Umsätzen die E-Rechnung (§ 27 Abs. 38 UStG).",
  },
  {
    q: "Wie schnell muss der Fragebogen zur steuerlichen Erfassung beim Finanzamt sein?",
    a: "Innerhalb eines Monats nach Beginn der Tätigkeit, elektronisch (§ 138 Abs. 1b und Abs. 4 AO). Ohne Steuernummer reicht dafür die ELSTER-Registrierung mit E-Mail.",
  },
  {
    q: "Was ist der Unterschied zu den kostenlosen Tools auf GründerX?",
    a: "Die Gratis-Tools und Wizards helfen online beim Ausfüllen. Das Paket gibt dir die Vorlagen und Checklisten als eigene Dateien zum Behalten – Word, PDF und Excel – mit allen Quellen auf einen Blick.",
  },
  {
    q: "Ist das Steuerberatung?",
    a: "Nein. Das Paket ist eine Arbeitshilfe mit der Rechtslage zum Stand 26.10.2026 und den amtlichen Quellen. Für deinen Einzelfall frag eine Steuerberaterin, einen Steuerberater oder dein Finanzamt.",
  },
];
