// Inhalt der Vorlage „zahlungserinnerung“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../finanzen.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du eine Zahlungserinnerung schreibst",
        text: `Die Zahlungserinnerung ist das erste Schreiben, wenn eine Rechnung über das Zahlungsziel hinaus offen bleibt. Sie ist freundlich formuliert, weil der häufigste Grund für eine unbezahlte Rechnung nicht böser Wille ist, sondern eine verlegte E-Mail, ein Urlaub oder ein interner Freigabestau. Trotzdem ist sie rechtlich eine Mahnung und setzt den Kunden in Verzug, falls er es noch nicht war.

Du brauchst sie etwa fünf bis zehn Tage nach Fälligkeit, als erste Stufe eines Mahnlaufs, bevor die letzte Mahnung mit Zinsen und Pauschale folgt, und als Textbaustein für Buchhaltungssoftware oder E-Mail. Die Vorlage enthält Rechnungsdaten, neue Frist, Bankverbindung, einen Verzugshinweis und ein Gesprächsangebot, falls der Kunde ein Problem mit der Leistung hat.`,
      },
      {
        titel: "Was muss in eine Zahlungserinnerung?",
        text: `Eine Zahlungserinnerung braucht keine Paragraphen, aber alle Daten, die der Kunde zum Zahlen braucht. Die Vorlage enthält:

- Absender mit Telefon, E-Mail und Steuernummer sowie Empfänger mit Ansprechpartner
- Betreff mit Rechnungsnummer und Rechnungsdatum, dazu die Kundennummer
- Eine Übersicht mit Rechnungsnummer, Datum, Betrag, Fälligkeit, bereits gezahltem Betrag und offenem Rest
- Eine neue, konkrete Frist mit Kalenderdatum statt „innerhalb von 10 Tagen“
- Bankverbindung mit IBAN, BIC und Verwendungszweck
- Den Satz, dass sich das Schreiben erledigt hat, falls inzwischen gezahlt wurde
- Ein Gesprächsangebot bei Problemen mit der Leistung
- Den Hinweis auf den Verzug nach § 286 BGB und dass du für dieses Schreiben auf Verzugszinsen verzichtest
- Die Rechnungskopie als Anlage

Die konkrete Frist ist wichtig: Verstreicht sie, ist der Kunde spätestens jetzt in Verzug, und du kannst in der nächsten Stufe Zinsen berechnen.`,
      },
      {
        titel: "Zahlungserinnerung Vorlage ausfüllen und versenden",
        text: `Übernimm Rechnungsnummer, Datum und Betrag exakt aus der Rechnung; ein Zahlendreher gibt dem Kunden einen Grund, nicht zu zahlen. Trage unter „Bereits gezahlt“ Teilzahlungen ein oder 0,00 EUR. Setze die neue Frist als Datum, sieben bis zehn Tage nach dem Schreiben, bei Versand per Post zwei Tage mehr. Prüfe den Absatz zum Verzug: War ein festes Zahlungsdatum vertraglich vereinbart, bleibt der erste Satz stehen; war keins vereinbart (ein Datum nur in der Rechnung reicht nicht), nimmst du die Alternative, die das Schreiben ausdrücklich zur Mahnung erklärt.

Nenne einen Ansprechpartner mit Durchwahl, damit Rückfragen nicht im Postfach landen. Versende per E-Mail mit Lesebestätigung und bei größeren Beträgen zusätzlich per Post, leg die Rechnungskopie bei und notiere Versanddatum und Weg in deiner Buchhaltung. So kannst du den Zugang später belegen, wenn es zum Mahnbescheid kommt.`,
      },
      {
        titel: "Typische Fehler beim ersten Mahnschreiben",
        text: `Der erste Fehler ist Warten. Je länger eine Rechnung offen ist, desto geringer wird die Zahlungsmoral; nach zwei Monaten ist die Forderung beim Kunden in der Prioritätenliste längst nach unten gerutscht. Der zweite Fehler sind Mahngebühren im ersten Schreiben. Die Erinnerung, die den Verzug erst auslöst, darf nichts kosten, und gegenüber Verbrauchern sind ohnehin nur die tatsächlichen Kosten wie Porto erstattungsfähig. Der dritte Fehler ist ein drohender Ton. Wer im ersten Schreiben mit Inkasso und Schufa droht, verliert den Kunden und gewinnt nichts, denn rechtlich zählt die Fristsetzung, nicht die Drohung.

Der vierte Fehler ist das Vertrauen auf die 30-Tage-Regel bei Verbrauchern: Die greift nur, wenn die Rechnung ausdrücklich darauf hingewiesen hat. Fehlt der Hinweis, löst erst die Mahnung den Verzug aus. Der fünfte Fehler ist der fehlende Zugangsnachweis; ohne ihn kannst du im Streit nicht beweisen, dass du gemahnt hast.`,
      },
      {
        titel: "Rechtsgrundlagen: Verzug nach § 286 BGB und Verzugszinsen",
        text: `Verzug ist in § 286 BGB geregelt. Nach Absatz 1 kommt der Schuldner durch Mahnung nach Fälligkeit in Verzug; die Zahlungserinnerung ist eine solche Mahnung, auch wenn sie freundlich klingt. Nach Absatz 2 Nr. 1 ist keine Mahnung nötig, wenn ein Kalendertag als Zahlungstermin vereinbart war; dann beginnt der Verzug am Tag danach. Nach Absatz 3 tritt Verzug spätestens 30 Tage nach Fälligkeit und Zugang der Rechnung ein, gegenüber Verbrauchern nur mit entsprechendem Hinweis in der Rechnung.

Ab Verzug schuldet der Kunde Verzugszinsen: fünf Prozentpunkte über dem Basiszinssatz, bei Entgeltforderungen ohne Verbraucherbeteiligung neun Prozentpunkte (§ 288 Abs. 1 und 2 BGB). Zwischen Unternehmern kommt die Pauschale von 40 EUR hinzu (§ 288 Abs. 5 BGB). Weitere Verzugsschäden wie Anwalts- oder Inkassokosten sind nach §§ 280, 286 BGB ersatzfähig. Forderungen aus Rechnungen verjähren in drei Jahren zum Jahresende (§§ 195, 199 BGB); die Mahnung hemmt diese Frist nicht.`,
      },
      {
        titel: "Wann die Zahlungserinnerung nicht mehr reicht",
        text: `Bleibt die Zahlungserinnerung ohne Reaktion, folgt die letzte Mahnung mit bezifferten Verzugszinsen, letzter Frist und Ankündigung des Mahnbescheids; dafür gibt es eine eigene Vorlage. Bestreitet der Kunde die Forderung oder rügt Mängel, hilft kein Mahnschreiben mehr, sondern ein Gespräch, eine Vergleichsvereinbarung oder die Klage.

Droht die Verjährung zum Jahresende, beantragst du den gerichtlichen Mahnbescheid, denn nur der hemmt die Verjährung. Bei hohen Beträgen, Auslandskunden oder einem Schuldner in der Krise lohnt sich frühzeitig anwaltlicher Rat. GründerX liefert die Vorlage als Werkzeug und ersetzt keine Rechtsberatung.`,
      },
    ],
  text: `Zahlungserinnerung

[Firma / Vorname Nachname]
[Straße, PLZ Ort]
[Telefon, E-Mail]
[Steuernummer / USt-IdNr.]

[Firma / Vorname Nachname des Kunden]
[Ansprechpartner]
[Straße, PLZ Ort]

[Ort], den [Datum]

Betreff: Zahlungserinnerung zur Rechnung Nr. [Rechnungsnummer] vom [Rechnungsdatum]
Kundennummer: [Kundennummer]

Sehr geehrte[r] [Frau/Herr Nachname] / Sehr geehrte Damen und Herren,

sicher ist es Ihrer Aufmerksamkeit entgangen: Für unsere Rechnung Nr. [Rechnungsnummer] vom [Rechnungsdatum] über [Leistung / Lieferung, z. B. „Erstellung der Website gemäß Angebot vom [Datum]“] konnten wir bis heute keinen Zahlungseingang feststellen.

Rechnungsnummer: [Rechnungsnummer]
Rechnungsdatum: [Rechnungsdatum]
Rechnungsbetrag: [Betrag] EUR
Fällig seit: [Fälligkeitsdatum]
Bereits gezahlt: [Betrag oder 0,00] EUR
Offener Betrag: [Betrag] EUR

Wir bitten Sie, den offenen Betrag von [Betrag] EUR bis spätestens

[Datum der neuen Frist, z. B. 10 Tage nach Datum dieses Schreibens]

auf das folgende Konto zu überweisen:

Kontoinhaber: [Firma / Name]
IBAN: [IBAN]
BIC: [BIC]
Bank: [Bank]
Verwendungszweck: [Rechnungsnummer]

Sollten Sie die Zahlung in den letzten Tagen bereits veranlasst haben, betrachten Sie dieses Schreiben bitte als gegenstandslos. Falls Sie Fragen zur Rechnung haben oder ein Problem mit der Leistung vorliegt, melden Sie sich bitte kurz bei [Ansprechpartner, Telefon, E-Mail]; wir finden dann gemeinsam eine Lösung.

Zu Ihrer Information: Mit Ablauf des vereinbarten Zahlungstermins befinden Sie sich nach § 286 BGB in Verzug. [Alternative, wenn kein Zahlungsdatum vertraglich vereinbart war: Dieses Schreiben ist eine Mahnung im Sinne des § 286 Abs. 1 BGB.] Ab diesem Zeitpunkt sind wir berechtigt, Verzugszinsen in gesetzlicher Höhe sowie die durch den Verzug entstehenden weiteren Kosten zu berechnen. Für dieses erste Schreiben verzichten wir darauf.

Wir bedanken uns für Ihr Verständnis und freuen uns auf die weitere Zusammenarbeit.

Mit freundlichen Grüßen


______________________________
[Vorname Nachname]
[Funktion, Firma]

Anlage: Kopie der Rechnung Nr. [Rechnungsnummer]

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
