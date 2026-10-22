// Inhalt der Vorlage „einspruch-steuerbescheid“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../verwaltung.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du Einspruch gegen den Steuerbescheid einlegen solltest",
        text: `Der Steuerbescheid kommt, die Nachzahlung ist höher als erwartet, und beim Vergleich mit deiner Erklärung fällt auf: Das Finanzamt hat das Homeoffice gestrichen, die Vorauszahlungen nicht angerechnet oder gleich den ganzen Gewinn geschätzt, weil eine Anlage fehlte. Innerhalb eines Monats nach Bekanntgabe musst du Einspruch einlegen, sonst wird der Bescheid bestandskräftig, und selbst offensichtliche Fehler lassen sich dann nur noch über enge Änderungsvorschriften korrigieren.

Die Vorlage passt für Einkommensteuer-, Umsatzsteuer-, Körperschaftsteuer- und Gewerbesteuermessbescheide, also für Einzelunternehmer und GbR-Gesellschafter ebenso wie für GmbH und UG. Sie ist auch dann richtig, wenn du die Begründung noch nicht fertig hast: Der fristwahrende Einspruch mit angekündigter Nachbegründung ist in der Praxis der Normalfall. Und wenn du die Nachzahlung nicht sofort leisten willst, stellst du mit demselben Schreiben den Antrag auf Aussetzung der Vollziehung.`,
      },
      {
        titel: "Was in einen Einspruch gegen den Steuerbescheid gehört",
        text: `Das Gesetz verlangt wenig, die Praxis mehr. Ein wirksamer Einspruch braucht:

- deine Steuernummer und bei der Einkommensteuer die Identifikationsnummer
- die genaue Bezeichnung des Bescheids: Steuerart, Jahr und Datum des Bescheids
- die Erklärung, dass du Einspruch einlegst; das Wort „Einspruch“ muss nicht fallen, hilft aber
- das Datum, an dem dir der Bescheid zugegangen ist, damit das Finanzamt die Frist nachvollziehen kann
- deinen Absender, damit erkennbar ist, wer den Einspruch einlegt

Die Begründung ist keine Wirksamkeitsvoraussetzung, aber ohne sie kann das Finanzamt nichts ändern. Die Vorlage bietet fünf Beispielgründe an: nicht anerkannte Betriebsausgaben, unerläuterte Abweichung von der Erklärung, überhöhte Schätzung, Rechen- oder Übernahmefehler sowie ein anhängiges Musterverfahren mit Antrag auf Ruhen des Verfahrens. Dazu kommen der konkrete Änderungsantrag mit dem Betrag, den du für richtig hältst, der Antrag auf Aussetzung der Vollziehung für den streitigen Teil, die Anlagenliste und die Bitte um Eingangsbestätigung.`,
      },
      {
        titel: "Einspruch Steuerbescheid Muster ausfüllen: Schritt für Schritt",
        text: `Nimm den Bescheid zur Hand und übertrage Steuerart, Jahr, Bescheiddatum und Steuernummer in Betreff und Kopf der Vorlage. Trage das Zugangsdatum ein; bei Postzustellung gilt seit 2025 der vierte Tag nach der Aufgabe zur Post (vorher der dritte), wenn du den Bescheid nicht nachweislich später erhalten hast.

Wähle dann aus den fünf Begründungsbausteinen die passenden aus und lösche den Rest; bei Grund 1 nennst du Position, Betrag und den betrieblichen Zusammenhang, bei Grund 2 die Zeile mit erklärtem und festgesetztem Wert, bei Grund 4 den konkreten Fehler. Formuliere den Änderungsantrag mit einem Zielbetrag, auch wenn du ihn nur überschlägst, und ergänze bei Bedarf das Datum, bis zu dem du nachbegründest. Beim Aussetzungsantrag setzt du nur den streitigen Betrag ein und sagst zu, den unstreitigen Teil zu zahlen. Liste die Belege auf, unterschreibe und sende das Schreiben per ELSTER, Fax oder Brief. Bewahre den Sendenachweis auf.`,
      },
      {
        titel: "Typische Fehler beim Einspruch und wie du sie vermeidest",
        text: `Fehler Nummer eins ist die versäumte Frist. Viele rechnen vom Datum des Bescheids statt vom Tag der Bekanntgabe, andere warten auf die fertige Begründung und verpassen darüber den Monat. Lege den Einspruch sofort ein, die Begründung kann folgen. Fehler zwei: Es wird nur angerufen oder eine Nachricht im Online-Portal hinterlassen, die kein Einspruch ist. Einspruch geht schriftlich oder elektronisch, am sichersten über die Einspruchsfunktion in Mein ELSTER.

Fehler drei: Der Bescheid wird ungenau bezeichnet, etwa „mein Steuerbescheid“, obwohl mehrere Jahre offen sind. Fehler vier: Die Nachzahlung wird nicht gezahlt, obwohl keine Aussetzung bewilligt wurde; dann laufen Säumniszuschläge von einem Prozent pro angefangenen Monat. Fehler fünf: Du legst Einspruch gegen den ganzen Bescheid ein, obwohl ein einzelner klarer Fehler auch über einen Antrag auf schlichte Änderung zu beheben wäre; der Einspruch öffnet den Bescheid auch zu deinen Ungunsten.`,
      },
      {
        titel: "Rechtsgrundlagen: § 347, § 355 und § 122 AO",
        text: `Der Einspruch ist in den §§ 347 bis 367 der Abgabenordnung geregelt. § 347 AO eröffnet ihn gegen Steuerbescheide und andere Verwaltungsakte des Finanzamts. § 355 Abs. 1 AO setzt die Frist auf einen Monat nach Bekanntgabe. Wann ein Bescheid bekannt gegeben ist, bestimmt § 122 AO: Nach Absatz 2 Nummer 1 gilt ein per Post übermittelter Bescheid am vierten Tag nach der Aufgabe zur Post als bekannt gegeben, außer er ist nicht oder später zugegangen; dieselbe Frist gilt nach Absatz 2a für elektronisch übermittelte Bescheide. Fällt das Fristende auf Samstag, Sonntag oder Feiertag, endet die Frist nach § 108 Abs. 3 AO am nächsten Werktag.

Die Form regelt § 357 AO, die Aussetzung der Vollziehung § 361 AO, die Verböserung mit vorherigem Hinweis § 367 Abs. 2 AO. Säumniszuschläge folgen aus § 240 AO, Aussetzungszinsen aus § 237 AO, die Wiedereinsetzung bei unverschuldeter Fristversäumnis aus § 110 AO. Gegen die Einspruchsentscheidung bleibt die Klage zum Finanzgericht, ebenfalls binnen eines Monats.`,
      },
      {
        titel: "Wann du den Einspruch nicht allein schreiben solltest",
        text: `Bei einem einzelnen Rechenfehler oder einer vergessenen Anlage reicht die Vorlage völlig. Anders sieht es aus, wenn das Finanzamt nach einer Betriebsprüfung Hinzuschätzungen vornimmt, verdeckte Gewinnausschüttungen bei deiner GmbH annimmt, die Kleinunternehmerregelung versagt oder Steuerhinterziehung im Raum steht. Dann geht es um Rechtsfragen und Beweislast, und der Einspruch ist bereits der erste Schritt in ein mögliches Klageverfahren. Hol dir einen Steuerberater oder Fachanwalt für Steuerrecht, bevor du Argumente festlegst, die dich später binden.

Gleiches gilt, wenn die Monatsfrist bereits abgelaufen ist und nur noch Wiedereinsetzung oder eine Änderungsvorschrift helfen kann. Hat dein Steuerberater eine Vollmacht beim Finanzamt hinterlegt, sprich den Einspruch mit ihm ab, damit nicht zwei Schreiben mit widersprüchlichen Begründungen eingehen. GründerX ist Software und keine Steuerberatung; die Vorlage gibt dir den formalen Rahmen, die steuerliche Bewertung bleibt Fachsache.`,
      },
    ],
  text: `[Firma / Vorname Nachname]
[Straße]
[PLZ Ort]
[Telefon], [E-Mail-Adresse]

Finanzamt [Ort]
[Straße]
[PLZ Ort]

[Ort], den [Datum]

Steuernummer: [Steuernummer]
[Identifikationsnummer: [IdNr.]]

Einspruch gegen den [Einkommensteuer- / Umsatzsteuer- / Gewerbesteuermess- / Körperschaftsteuer-]bescheid [Jahr] vom [Datum des Bescheids]
Antrag auf Aussetzung der Vollziehung

Sehr geehrte Damen und Herren,

gegen den oben bezeichneten Bescheid vom [Datum], mir zugegangen am [Datum], lege ich hiermit

Einspruch (§ 347 AO)

ein.

Begründung:

[Grund 1 – nicht anerkannte Betriebsausgaben: In dem Bescheid wurden Betriebsausgaben in Höhe von [Betrag] EUR nicht anerkannt (Position „[Bezeichnung]“). Diese Aufwendungen sind betrieblich veranlasst, weil [kurze Erklärung, z. B. „es sich um die Miete für das Lager in [Ort] handelt, das ausschließlich für den Versandhandel genutzt wird“]. Die Rechnungen und Zahlungsbelege füge ich bei.]

[Grund 2 – Abweichung von der Erklärung ohne Erläuterung: Der Bescheid weicht in [Zeile / Position] von meiner Erklärung ab (erklärt: [Betrag] EUR, festgesetzt: [Betrag] EUR), ohne dass die Abweichung erläutert wurde. Ich bitte um Mitteilung der Gründe und um Berücksichtigung der erklärten Werte.]

[Grund 3 – Schätzung: Die Besteuerungsgrundlagen wurden geschätzt (§ 162 AO). Die Schätzung ist überhöht. Die tatsächlichen Werte ergeben sich aus der beigefügten [Steuererklärung / Gewinnermittlung], die ich hiermit nachreiche.]

[Grund 4 – Rechen- oder Übernahmefehler: Die festgesetzte Steuer beruht auf einem offensichtlichen Fehler: [Beschreibung, z. B. „die geleisteten Vorauszahlungen von [Betrag] EUR wurden nicht angerechnet“].]

[Grund 5 – anhängiges Musterverfahren: Die Frage, ob [Rechtsfrage], ist Gegenstand des beim [Bundesfinanzhof / Finanzgericht [Ort]] anhängigen Verfahrens [Aktenzeichen]. Ich beantrage, das Einspruchsverfahren insoweit ruhen zu lassen (§ 363 Abs. 2 AO).]

Ich beantrage, den Bescheid entsprechend zu ändern und die [Steuerart] [Jahr] auf [Betrag] EUR herabzusetzen. [Eine ausführliche Begründung und weitere Belege reiche ich bis zum [Datum] nach.]

Antrag auf Aussetzung der Vollziehung (§ 361 Abs. 2 AO):
Zugleich beantrage ich, die Vollziehung des angefochtenen Bescheids in Höhe des streitigen Betrags von [Betrag] EUR bis zur Entscheidung über den Einspruch auszusetzen. An der Rechtmäßigkeit des Bescheids bestehen aus den genannten Gründen ernstliche Zweifel. [Hilfsweise: Die Vollziehung hätte für mich eine unbillige, nicht durch überwiegende öffentliche Interessen gebotene Härte zur Folge, weil [Begründung, z. B. „die sofortige Zahlung den laufenden Geschäftsbetrieb gefährden würde“].] Den unstreitigen Teil der Steuer in Höhe von [Betrag] EUR zahle ich fristgerecht.

Anlagen:
– Kopie des angefochtenen Bescheids
– [Rechnungen und Kontoauszüge zu Grund 1]
– [Gewinnermittlung / Steuererklärung [Jahr]]
– [weitere Belege]

Ich bitte um eine kurze Eingangsbestätigung.

Mit freundlichen Grüßen


______________________________
[Vorname Nachname]
[ggf. Funktion, z. B. „Geschäftsführer der [Firma] GmbH“]

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
