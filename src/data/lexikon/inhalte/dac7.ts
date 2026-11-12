import type { LexikonInhalt } from "../types";

const inhalt: LexikonInhalt = {
  definition:
    "DAC7 ist die EU-Regel, nach der Betreiber digitaler Plattformen einmal im Jahr melden, was ihre Anbieter dort verdient haben. In Deutschland setzt das Plattformen-Steuertransparenzgesetz (PStTG) sie um: Marktplätze, Vermittlungsportale und ähnliche Plattformen melden die Daten an das Bundeszentralamt für Steuern (BZSt).",
  abschnitte: [
    {
      titel: "Was ist DAC7 und was regelt das PStTG?",
      bloecke: [
        {
          art: "text",
          text: "DAC steht für Directive on Administrative Cooperation, die EU-Amtshilferichtlinie. Ihre siebte Änderung verpflichtet Plattformbetreiber, den Steuerbehörden Informationen über ihre Anbieter zu liefern. Das deutsche Gesetz dazu ist das PStTG. Es ist nach Angabe des BZSt am 1. Januar 2023 in Kraft getreten, die erste Meldung für das Jahr 2023 war im Januar 2024 fällig.",
        },
        {
          art: "text",
          text: "Wichtig für die Einordnung: Das Gesetz schafft keine neue Steuer und keine neue Steuerpflicht. Es sorgt dafür, dass das Finanzamt von Einnahmen erfährt, die schon vorher anzugeben waren. Meldepflichtig ist die Plattform. Als Verkäufer musst du selbst nichts an das BZSt schicken.",
        },
      ],
    },
    {
      titel: "Welche Tätigkeiten und welche Plattformen sind betroffen?",
      bloecke: [
        {
          art: "text",
          text: "Gemeldet werden vier Arten von Tätigkeiten, wenn sie gegen Vergütung über eine Plattform laufen (§ 5 Abs. 1 PStTG):",
        },
        {
          art: "liste",
          punkte: [
            "der Verkauf von Waren",
            "persönliche Dienstleistungen",
            "die zeitlich begrenzte Überlassung von Immobilien, etwa die Vermietung einer Ferienwohnung",
            "die zeitlich begrenzte Überlassung von Verkehrsmitteln",
          ],
        },
        {
          art: "text",
          text: "Eine Plattform ist nach § 3 PStTG jedes auf digitalen Technologien beruhende System, über das Nutzer per Software miteinander in Kontakt treten und Rechtsgeschäfte abschließen können. Darunter fallen Marktplätze für Neu- und Gebrauchtware ebenso wie Portale für Unterkünfte oder Dienstleistungen.",
        },
      ],
    },
    {
      titel: "Ab wann wirst du als Verkäufer gemeldet? Die Grenze mit Beispielen",
      bloecke: [
        {
          art: "text",
          text: "Für den Verkauf von Waren gibt es eine Freistellung. Nicht gemeldet wird, wer im Meldezeitraum auf derselben Plattform in weniger als 30 Fällen Waren verkauft und dadurch insgesamt weniger als 2.000 € Vergütung erhalten hat (§ 4 Abs. 5 Satz 1 Nr. 4 PStTG). Beide Bedingungen müssen zusammen erfüllt sein. Anders herum gesagt: Wer 30 Verkäufe oder 2.000 € erreicht, landet in der Meldung.",
        },
        {
          art: "tabelle",
          kopf: ["Fall im Kalenderjahr", "Verkäufe", "Vergütung", "Meldung"],
          zeilen: [
            ["A", "25", "1.400 €", "nein, beide Werte liegen darunter"],
            ["B", "42", "1.650 €", "ja, wegen der Zahl der Verkäufe"],
            ["C", "12", "2.600 €", "ja, wegen des Betrags"],
          ],
        },
        {
          art: "text",
          text: "Die Fälle sind frei gewählte Beispiele. Drei Details dazu: Die Grenze gilt je Plattform, nicht über alle Plattformen zusammen. Vergütung ist das Entgelt abzüglich der Gebühren, Provisionen und Steuern, die der Plattformbetreiber einbehält (§ 5 Abs. 2 PStTG). Und die Freistellung gilt nur für Waren. Für Dienstleistungen und Vermietung nennt das Gesetz keine entsprechende Bagatellgrenze.",
        },
      ],
    },
    {
      titel: "Welche Daten gehen ans BZSt und bis wann?",
      bloecke: [
        {
          art: "text",
          text: "Die Plattform meldet spätestens zum 31. Januar des Folgejahres (§ 13 Abs. 1 PStTG). Bis zum selben Tag teilt sie dir mit, was sie über dich gemeldet hat (§ 22 Abs. 2 PStTG). Nach der Übersicht des BZSt gehören dazu unter anderem:",
        },
        {
          art: "liste",
          punkte: [
            "Name oder Firma, Anschrift und bei natürlichen Personen das Geburtsdatum",
            "Steueridentifikationsnummer oder Steuernummer, Umsatzsteuer-Identifikationsnummer und, falls vorhanden, die Handelsregisternummer",
            "die gezahlte oder gutgeschriebene Vergütung je Quartal und die Zahl der Tätigkeiten",
            "Gebühren, Provisionen und Steuern, die die Plattform einbehalten hat",
          ],
        },
        {
          art: "text",
          text: "Das BZSt leitet die Daten an das zuständige Finanzamt weiter, bei Anbietern aus anderen EU-Staaten an die dortigen Behörden. Laut BZSt führt die Meldung nicht automatisch zu einer höheren Steuer. Die Finanzämter nutzen sie als Kontrollmitteilung bei der Veranlagung.",
        },
      ],
    },
    {
      titel: "Was musst du als Anbieter tun?",
      bloecke: [
        {
          art: "liste",
          punkte: [
            "Der Plattform die abgefragten Angaben geben. Kommt ein Anbieter der Aufforderung nicht nach, erinnert die Plattform zweimal. Danach muss sie frühestens nach 60 und spätestens nach 180 Tagen das Konto sperren oder die Auszahlung einbehalten, bis die Angaben vorliegen (§ 23 PStTG).",
            "Die Übersicht im Januar prüfen und mit den eigenen Aufzeichnungen abgleichen. Fehler korrigiert nur die Plattform, melde sie deshalb dort.",
            "Die Einnahmen in der eigenen Steuererklärung angeben, soweit sie steuerpflichtig sind. Die Übersicht der Plattform hilft beim Abgleich.",
          ],
        },
        {
          art: "text",
          text: "Die Meldung allein macht niemanden zum Gewerbetreibenden. Das BZSt schreibt dazu, dass eine Vergütung über eine Plattform nicht automatisch eine gewerbliche oder selbständige Tätigkeit bedeutet, man dies aber prüfen sollte. Wer regelmäßig Ware einkauft, um sie mit Gewinn zu verkaufen, sollte die Frage geklärt haben, bevor die erste Meldung beim Finanzamt liegt. In welcher Reihenfolge Gewerbeanmeldung, Fragebogen und Steuernummer kommen, zeigt der Guide [[/guides/dac7|DAC7: Plattform-Meldepflicht meistern]].",
        },
      ],
    },
    {
      titel: "Typische Missverständnisse",
      bloecke: [
        {
          art: "liste",
          punkte: [
            "„Unter 2.000 € bin ich sicher draußen.“ Stimmt nur, wenn du auch unter 30 Verkäufen bleibst.",
            "„Die Grenze ist ein Freibetrag.“ Sie regelt nur, ob gemeldet wird. Ob Steuer anfällt, bestimmen Einkommensteuer- und Umsatzsteuerrecht.",
            "„Privatverkäufe werden nicht gemeldet.“ Das Gesetz unterscheidet bei der Meldung nicht zwischen privat und gewerblich. Die Bewertung nimmt das Finanzamt vor.",
            "„Gemeldet wird mein Umsatz.“ Gemeldet wird die Vergütung nach Abzug der einbehaltenen Gebühren, die Gebühren zusätzlich als eigener Wert.",
            "„Ich muss selbst etwas beim BZSt einreichen.“ Die Pflicht trifft den Plattformbetreiber.",
          ],
        },
      ],
    },
    {
      titel: "Was heißt das für Online-Händler?",
      bloecke: [
        {
          art: "text",
          text: "Für angemeldete Händler mit Buchhaltung ändert sich wenig: Das Finanzamt bekommt Zahlen, die es aus deiner Erklärung schon kennt. Achte darauf, dass beides zusammenpasst. Die Plattform meldet Vergütungen nach dem Zeitpunkt der Zahlung oder Gutschrift, deine Buchhaltung arbeitet je nach Gewinnermittlung mit Rechnungs- oder Zahlungsdatum. Eine kurze Überleitung in den Unterlagen erspart Rückfragen. Bußgelder nach dem PStTG richten sich an Plattformbetreiber, die ihre Pflichten verletzen, je nach Verstoß bis 5.000 €, 30.000 € oder 50.000 € (§ 25 PStTG).",
        },
        {
          art: "hinweis",
          text: "Stand der Angaben: 12. November 2026. Diese Seite erklärt den Begriff und ersetzt keine Steuer- oder Rechtsberatung. Ob deine Verkäufe steuerpflichtig sind, klärt im Einzelfall das Finanzamt oder ein Steuerberater.",
        },
      ],
    },
  ],
  verwandt: ["lucid-verpackungsregister", "ce-kennzeichnung", "unit-economics"],
  kontext: [
    {
      pfad: "/guides/dac7",
      label: "Guide: DAC7, Plattform-Meldepflicht meistern",
      text: "Was du vor und nach der ersten Meldung in welcher Reihenfolge erledigst.",
    },
    {
      pfad: "/guides/reseller-marketplace-setup",
      label: "Guide: Reseller und Marketplace-Arbitrage aufsetzen",
      text: "Gewerbe, Steuernummer und Konten für den Handel über Marktplätze.",
    },
    {
      pfad: "/tools/gewerbe-check",
      label: "Brauche ich ein Gewerbe?",
      text: "Erste Einordnung, ob deine Verkäufe noch privat sind.",
    },
    {
      pfad: "/tools/kleinunternehmer-waechter",
      label: "Kleinunternehmer-Wächter",
      text: "Behalte die Umsatzgrenzen im Blick, wenn die Verkäufe wachsen.",
    },
  ],
  quellen: [
    { titel: "§ 3 PStTG: Plattform; Plattformbetreiber", url: "https://www.gesetze-im-internet.de/psttg/__3.html" },
    { titel: "§ 4 PStTG: Nutzer; Anbieter (freigestellter Anbieter)", url: "https://www.gesetze-im-internet.de/psttg/__4.html" },
    { titel: "§ 5 PStTG: Relevante Tätigkeit; Vergütung", url: "https://www.gesetze-im-internet.de/psttg/__5.html" },
    { titel: "§ 13 PStTG: Meldepflicht", url: "https://www.gesetze-im-internet.de/psttg/__13.html" },
    { titel: "§ 22 PStTG: Information der Anbieter", url: "https://www.gesetze-im-internet.de/psttg/__22.html" },
    { titel: "§ 23 PStTG: Durchsetzung von Mitwirkungspflichten", url: "https://www.gesetze-im-internet.de/psttg/__23.html" },
    { titel: "§ 25 PStTG: Bußgeldvorschriften", url: "https://www.gesetze-im-internet.de/psttg/__25.html" },
    { titel: "BZSt: Meldepflichten digitaler Plattformbetreiber (DPI/DAC7)", url: "https://www.bzst.de/DE/Unternehmen/Intern_Informationsaustausch/DAC7/dac7_node.html" },
    { titel: "BZSt: Fragen und Antworten für Anbieter", url: "https://www.bzst.de/DE/Unternehmen/Intern_Informationsaustausch/DAC7/FAQ/faq_node.html" },
  ],
};

export default inhalt;
