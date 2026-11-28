/**
 * Textteil je Tool-Landing (/tools/:slug), Top-1-Programm Punkt 3 „Tools zu Textseiten ausbauen“:
 * Antwort zuerst mit Stand und Autor, Tabelle, Beispiel, ehrliche Einwände, Quellen, eigene Fragen.
 * Nur für Tools mit Eintrag hier; alle anderen Tool-Seiten bleiben unverändert.
 *
 * Jede Zahl und jede Rechtsaussage hat eine Quelle in `quellen` und wurde am Stand-Datum an der Quelle gelesen.
 */
import type { LandingFaq } from "@/components/landing/LandingPage";
import { PRO_MONTH_GROSS_CENTS, formatEurCents } from "@/config/pricing";
import { START_ANGEBOT } from "@/utils/startAngebot";

export interface ToolTiefeZeile {
  feld: string;
  gefragt: string;
  achten: string;
  wizard: string;
}

export interface ToolTiefe {
  /** H1 der Seite; ohne Angabe gilt der Tool-Name */
  h1?: string;
  stand: { iso: string; text: string };
  antwort: { frage: string; text: string };
  tabelle: { titel: string; lead: string; kopf: [string, string, string, string]; zeilen: ToolTiefeZeile[]; fuss: string };
  danach: { titel: string; lead: string; punkte: { titel: string; text: string }[] };
  kosten: { titel: string; text: string[] };
  vordruck?: { titel: string; text: string; href: string; label: string };
  einwaende: { titel: string; punkte: LandingFaq[] };
  faq: LandingFaq[];
  quellen: { label: string; href: string }[];
}

const GII = "https://www.gesetze-im-internet.de";
const MONAT = formatEurCents(PRO_MONTH_GROSS_CENTS);

export const TOOL_TIEFE: Record<string, ToolTiefe> = {
  "gewerbeanmeldung-wizard": {
    h1: "Gewerbeanmeldung ausfüllen: der Wizard für den GewA 1",
    stand: { iso: "2026-11-28", text: "28. November 2026" },
    antwort: {
      frage: "Wie füllst du die Gewerbeanmeldung (GewA 1) richtig aus?",
      text:
        "Die Gewerbeanmeldung ist ein amtlicher Vordruck mit 33 Feldern (Anlage 1 der Gewerbeanzeigeverordnung). Du reichst ihn beim Gewerbeamt der Gemeinde ein, in der dein Betrieb sitzt, und zwar gleichzeitig mit dem Beginn der Tätigkeit (§ 14 Abs. 1 GewO). Die meisten Felder sind Personendaten und Anschrift. Nachdenken musst du bei vier Stellen: der Tätigkeit (Feld 18), dem Nebenerwerb (Feld 19), der Art des Betriebs (Feld 21) und den Erlaubnissen (Felder 28 bis 31).",
    },
    tabelle: {
      titel: "Die Felder, bei denen du nachdenken musst",
      lead: "Feldnummern und Wortlaut wie im amtlichen Vordruck. Rechts steht, wie der Wizard dir bei dem Feld hilft.",
      kopf: ["Feld", "Was gefragt ist", "Worauf du achtest", "Im Wizard"],
      zeilen: [
        {
          feld: "18 · Angemeldete Tätigkeit",
          gefragt: "Die Tätigkeit, „möglichst genau“ beschrieben; bei mehreren Tätigkeiten den Schwerpunkt unterstreichen.",
          achten:
            "Was du verkaufst, auf welchem Weg und an wen. „Onlinehandel“ allein sagt fast nichts. Besser: „Onlinehandel mit Haushaltswaren und Küchenzubehör über eigenen Shop und Amazon“.",
          wizard: "Prüft Länge und Inhalt deiner Beschreibung während du tippst, mit Beispielen für zu ungenau und passend.",
        },
        {
          feld: "19 · Nebenerwerb",
          gefragt: "„Wird die Tätigkeit (vorerst) im Nebenerwerb betrieben?“ ja oder nein.",
          achten: "Ja, wenn das Gewerbe neben Job, Studium oder Ausbildung läuft. Für ein Nebengewerbe gibt es keinen eigenen Vordruck, es ist derselbe GewA 1.",
          wizard: "Eigene Frage im Schritt „Beginn“, die Antwort steht danach im PDF.",
        },
        {
          feld: "20 · Beginn",
          gefragt: "Datum des Beginns der angemeldeten Tätigkeit.",
          achten: "Die Anzeige ist gleichzeitig mit dem Beginn fällig. Wer sie nicht oder zu spät erstattet, handelt ordnungswidrig; die Geldbuße kann bis 1.000 € betragen (§ 146 Abs. 2 Nr. 2 und Abs. 3 GewO).",
          wizard: "Datum eintragen, der Wizard zeigt die Frist dazu.",
        },
        {
          feld: "21 · Art des Betriebes",
          gefragt: "Industrie, Handwerk, Handel oder Sonstiges.",
          achten: "Wer Waren einkauft und weiterverkauft, betreibt Handel. Handwerk passt, wenn deine Tätigkeit in der Handwerksordnung steht (Anlage A oder B); im Zweifel fragst du die Handwerkskammer. Dienstleistungen ohne Handwerk landen meist bei „Sonstiges“.",
          wizard: "Vier Kästchen mit kurzer Erklärung, Pflichtangabe vor dem PDF.",
        },
        {
          feld: "22 · Tätige Personen",
          gefragt: "Zahl der Personen bei Geschäftsaufnahme, ohne Inhaber.",
          achten: "Aushilfen und ein mithelfender Ehe- oder Lebenspartner zählen mit, du selbst nicht.",
          wizard: "Zahlenfeld mit diesem Hinweis.",
        },
        {
          feld: "28–31 · Erlaubnis, Handwerkskarte, Aufenthalt",
          gefragt: "Liegt eine Erlaubnis, eine Handwerkskarte oder ein Aufenthaltstitel vor?",
          achten: "Braucht deine Tätigkeit eine Erlaubnis oder einen Eintrag in die Handwerksrolle, berechtigt die Anzeige allein nicht zum Start. Das steht als Hinweis im Vordruck.",
          wizard: "Felder 28 bis 31 als eigener Schritt; bei deutscher Staatsangehörigkeit setzt er Feld 30 und 31 auf „nein“.",
        },
      ],
      fuss:
        "Ein Feld für einen Branchenschlüssel (WZ 2008) hat der Vordruck nicht. Entscheidend ist die Beschreibung in Feld 18. Der Wizard zeigt dir einen passenden WZ-Schlüssel nur als Hilfe für spätere Formulare.",
    },
    danach: {
      titel: "Was nach der Anmeldung passiert",
      lead: "Die Anmeldung ist der erste Schritt. Diese Stellen melden sich danach bei dir oder erwarten etwas von dir.",
      punkte: [
        {
          titel: "Empfangsbescheinigung innerhalb von drei Tagen",
          text: "Die Behörde bestätigt den Eingang deiner Anzeige innerhalb dreier Tage (§ 15 Abs. 1 GewO). Umgangssprachlich heißt sie „Gewerbeschein“.",
        },
        {
          titel: "Finanzamt: Fragebogen binnen eines Monats",
          text: "Die Gemeinde unterrichtet das Finanzamt (§ 138 Abs. 1 AO). Den Fragebogen zur steuerlichen Erfassung reichst du innerhalb eines Monats nach Beginn elektronisch über ELSTER ein (§ 138 Abs. 1b und 4 AO). Dort entscheidest du auch über die Kleinunternehmerregelung.",
        },
        {
          titel: "IHK oder Handwerkskammer, Berufsgenossenschaft und weitere Stellen",
          text: "Das Gewerbeamt übermittelt Daten aus der Anzeige regelmäßig an IHK, Handwerkskammer, Bundesagentur für Arbeit, die Deutsche Gesetzliche Unfallversicherung zur Weiterleitung an die Berufsgenossenschaft, den Zoll und weitere Behörden (§ 14 Abs. 8 GewO).",
        },
        {
          titel: "IHK-Beitrag: bis 5.200 € Gewerbeertrag frei",
          text: "Bist du nicht im Handelsregister eingetragen und liegt dein Gewerbeertrag bzw. Gewinn aus Gewerbebetrieb bei höchstens 5.200 € im Jahr, zahlst du keinen IHK-Beitrag (§ 3 Abs. 3 IHKG).",
        },
        {
          titel: "Berufsgenossenschaft: Meldung binnen einer Woche",
          text: "Unternehmer müssen den Unfallversicherungsträger binnen einer Woche nach Beginn informieren. Diese Pflicht gilt als erfüllt, wenn du die Gewerbeanzeige innerhalb dieser Woche erstattet hast (§ 192 Abs. 1 SGB VII).",
        },
      ],
    },
    kosten: {
      titel: "Was die Anmeldung beim Amt kostet",
      text: [
        "Die Gebühr ist von Gemeinde zu Gemeinde verschieden. Ein Beispiel: In Berlin kostet die Anmeldung 26,00 € je Einzelgewerbe und 15,00 €, wenn du sie elektronisch erstattest. Für eine juristische Person, etwa eine UG oder GmbH, sind es 31,00 € (service.berlin.de, gelesen am 28.11.2026).",
        "Diese Gebühr zahlst du an die Gemeinde. Sie ist nicht im GründerX-Zugang enthalten.",
      ],
    },
    vordruck: {
      titel: "Den leeren Vordruck brauchst du nur?",
      text: "Hier liegt der amtliche Vordruck GewA 1 (Anlage 1 GewAnzV, Fassung BGBl. 2024 I Nr. 411) als PDF, von uns mit Eingabefeldern versehen. Kostenlos, ohne Konto. Die Anzeige darf auch elektronisch erstattet werden (§ 2 GewAnzV); in Berlin geht das zum Beispiel online, mit oder ohne BundID-Konto.",
      href: "/forms/gewa1.pdf",
      label: "GewA 1 als ausfüllbares PDF",
    },
    einwaende: {
      titel: "Brauche ich dafür ein Tool?",
      punkte: [
        {
          q: "Geht das nicht auch ohne GründerX?",
          a: "Ja. Den Vordruck bekommst du bei deiner Gemeinde oder oben als PDF, manche Gemeinden wie Berlin nehmen die Anmeldung online an. Der Wizard lohnt sich, wenn du nicht weißt, was du bei Tätigkeit, Nebenerwerb und Art des Betriebs ankreuzen sollst: Er fragt in acht Schritten ab, prüft deine Tätigkeitsbeschreibung und füllt den amtlichen Vordruck als PDF aus.",
        },
        {
          q: "Was kostet der Wizard?",
          a: `Er ist Teil des GründerX-Zugangs für ${MONAT} im Monat inklusive Umsatzsteuer, jederzeit zum Ende der laufenden Abrechnungsperiode kündbar. Neukunden starten mit ${START_ANGEBOT.tage} Tagen für ${START_ANGEBOT.preisText}; ohne Kündigung läuft danach der Monatszugang weiter. Amtsgebühren der Gemeinde sind nicht enthalten.`,
        },
        {
          q: "Prüft GründerX meine Anmeldung rechtlich?",
          a: "Nein. Der Wizard hilft beim Ausfüllen. Ob deine Tätigkeit eine Erlaubnis braucht oder zulassungspflichtiges Handwerk ist, beantwortet im Zweifel dein Gewerbeamt, die IHK oder die Handwerkskammer.",
        },
      ],
    },
    faq: [
      {
        q: "Was trage ich bei Onlinehandel als Tätigkeit ein?",
        a: "Ware, Verkaufsweg und Kunden, zum Beispiel „Onlinehandel mit Haushaltswaren und Küchenzubehör über eigenen Shop und Amazon“. Der Vordruck verlangt, die Tätigkeit möglichst genau zu beschreiben; bei mehreren Tätigkeiten unterstreichst du den Schwerpunkt.",
      },
      {
        q: "Muss ich ein Nebengewerbe anders anmelden?",
        a: "Nein. Auch ein Nebengewerbe meldest du mit dem Vordruck GewA 1 an. In Feld 19 kreuzt du „ja“ an, wenn die Tätigkeit (vorerst) im Nebenerwerb läuft.",
      },
      {
        q: "Wie schnell bekomme ich den Gewerbeschein?",
        a: "Die Behörde bestätigt den Eingang der Anzeige innerhalb dreier Tage (§ 15 Abs. 1 GewO). Diese Empfangsbescheinigung ist das, was umgangssprachlich Gewerbeschein heißt.",
      },
      {
        q: "Brauche ich für die Gewerbeanmeldung einen WZ-Schlüssel?",
        a: "Nein. Der Vordruck GewA 1 hat kein Feld für einen Branchenschlüssel. Wichtig ist die Beschreibung der Tätigkeit in Feld 18.",
      },
      {
        q: "Was kostet die Gewerbeanmeldung?",
        a: "Das legt jede Gemeinde selbst fest. In Berlin sind es zum Beispiel 26,00 € je Einzelgewerbe, elektronisch 15,00 € (Stand 28.11.2026).",
      },
    ],
    quellen: [
      { label: "Anlage 1 GewAnzV: Vordruck Gewerbe-Anmeldung (BGBl. 2024 I Nr. 411)", href: `${GII}/gewanzv_2014/anlage_1.html` },
      { label: "§ 2 GewAnzV: Elektronische Erstattung der Gewerbeanzeige", href: `${GII}/gewanzv_2014/__2.html` },
      { label: "§ 14 GewO: Anzeigepflicht und Datenübermittlung", href: `${GII}/gewo/__14.html` },
      { label: "§ 15 GewO: Empfangsbescheinigung", href: `${GII}/gewo/__15.html` },
      { label: "§ 146 GewO: Ordnungswidrigkeiten", href: `${GII}/gewo/__146.html` },
      { label: "§ 138 AO: Anzeigen über die Erwerbstätigkeit", href: `${GII}/ao_1977/__138.html` },
      { label: "§ 3 IHKG: Beiträge", href: `${GII}/ihkg/__3.html` },
      { label: "§ 192 SGB VII: Mitteilungspflichten der Unternehmer", href: `${GII}/sgb_7/__192.html` },
      { label: "Service Berlin: Gewerbe anmelden (Gebühren)", href: "https://service.berlin.de/dienstleistung/121921/" },
    ],
  },
};
