// Inhalt der Vorlage „quittung“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../finanzen.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du eine Quittung ausstellen oder verlangen solltest",
        text: `Eine Quittung bestätigt, dass Geld oder eine Sache angekommen ist. Mehr nicht, aber genau das ist im Streitfall entscheidend. Als Gründer brauchst du sie in beide Richtungen: Ein Kunde zahlt am Stand, im Laden oder bei der Lieferung bar und will einen Beleg. Du kaufst gebraucht von einer Privatperson, zahlst bar und brauchst den Nachweis für die Buchhaltung, weil es sonst keinen Beleg gibt. Ein Mitarbeiter legt Geld aus und du erstattest es.

Eine Teilzahlung auf eine größere Rechnung soll festgehalten werden, damit der Restbetrag klar ist. Oder du übergibst Schlüssel, Geräte oder Unterlagen und willst später beweisen können, was in welchem Zustand übergeben wurde. Die Vorlage enthält beide Varianten: Quittung über Zahlungseingang und Übergabequittung.`,
      },
      {
        titel: "Was muss auf eine Quittung? Pflichtangaben nach § 368 BGB und § 33 UStDV",
        text: `Das BGB stellt keine Formanforderungen an eine Quittung; sie muss nur den Empfang bestätigen und vom Empfänger unterschrieben sein. Damit sie zugleich für die Buchhaltung taugt, enthält die Vorlage:

- Fortlaufende Quittungsnummer, damit das Kassenbuch lückenlos bleibt
- Name und Anschrift des Empfängers mit Steuernummer oder USt-IdNr.
- Name und Anschrift des Zahlers
- Betrag in Zahlen und Worten sowie Zahlungsart (bar, Karte, Überweisung)
- Grund der Zahlung mit Rechnungsnummer, Kaufgegenstand oder Auftrag
- Umsatzsteuervermerk: enthaltener Steuerbetrag und Satz, Hinweis auf § 19 UStG oder Privatverkauf
- Bei Teilzahlungen Gesamtforderung, Restbetrag und dessen Fälligkeit
- Ort, Datum und Unterschrift des Empfängers

Mit Steuersatz, Datum, Leistungsbeschreibung und Bruttobetrag erfüllt die Quittung bis 250 EUR brutto zugleich die Anforderungen an eine Kleinbetragsrechnung (§ 33 UStDV), sodass der Zahler daraus die Vorsteuer ziehen kann. Die Übergabequittung (Variante B) ersetzt die Geldangaben durch eine Liste der Gegenstände mit Anzahl, Seriennummer und Zustand.`,
      },
      {
        titel: "Quittung Vorlage ausfüllen: Zahlung oder Übergabe",
        text: `Wähle zuerst die Variante: A für Geld, B für Sachen. Bei Variante A trägst du dich als Empfänger mit Steuernummer ein, dann den Zahler. Schreib den Betrag in Zahlen und in Worten, damit niemand eine Null ergänzen kann. Beim Grund nennst du die Rechnungsnummer oder den Gegenstand. Beim Umsatzsteuervermerk streichst du die zwei nicht passenden Alternativen; als Kleinunternehmer bleibt der Hinweis auf § 19 UStG stehen.

Bei einer Teilzahlung füllst du Gesamtforderung, Restbetrag und Fälligkeit aus, bei Vollzahlung den Satz zur vollständigen Begleichung. Bei Variante B listest du jeden Gegenstand einzeln mit Seriennummer und Zustand und nennst den Grund der Übergabe, etwa Kaufvertrag oder Leihe. Der Empfänger unterschreibt, bei der Übergabe beide. Nummeriere die Quittungen fortlaufend und behalte einen Durchschlag oder Scan.`,
      },
      {
        titel: "Typische Fehler bei Quittungen und Barzahlungen",
        text: `Der erste Fehler ist, die Quittung als Rechnung zu behandeln. Über 250 EUR brutto braucht der Zahler für den Vorsteuerabzug eine vollständige Rechnung nach § 14 UStG mit Rechnungsnummer, Nettobetrag, Steuerbetrag und Anschrift des Empfängers; die Quittung ersetzt sie dann nicht. Der zweite Fehler ist das fehlende Kassenbuch. Wer Bargeld annimmt, muss jede Einnahme täglich und einzeln aufzeichnen; eine lose Sammlung von Quittungen ohne Kassenbuch führt bei der Betriebsprüfung zu Hinzuschätzungen.

Der dritte Fehler ist die Teilzahlung ohne Restbetrag: Steht auf der Quittung nur „500 EUR erhalten“, behauptet der Zahler später, damit sei alles bezahlt. Der vierte Fehler sind Barzahlungen ab 10.000 EUR ohne Identifizierung des Zahlers; Güterhändler müssen hier nach dem Geldwäschegesetz Ausweisdaten erfassen. Und schließlich: Quittungen gehören zu den Buchungsbelegen und müssen acht Jahre aufbewahrt werden, auch als Scan unveränderbar.`,
      },
      {
        titel: "Rechtliche und steuerliche Grundlagen: BGB, UStG, AO, GwG",
        text: `Nach § 368 BGB kann der Schuldner gegen Empfang der Leistung ein schriftliches Empfangsbekenntnis verlangen; die Kosten trägt nach § 369 BGB grundsätzlich der Schuldner. Die Quittung beweist den Empfang, nicht die Höhe der ursprünglichen Schuld. Für die Umsatzsteuer gilt: Eine Rechnung braucht die Angaben des § 14 Abs. 4 UStG, eine Kleinbetragsrechnung bis 250 EUR brutto die reduzierten Angaben des § 33 UStDV.

Kasseneinnahmen und -ausgaben sind täglich festzuhalten (§ 146 Abs. 1 AO); elektronische Kassensysteme brauchen eine zertifizierte technische Sicherheitseinrichtung (§ 146a AO). Belege sind acht Jahre aufzubewahren (§ 147 Abs. 3 AO). Händler, die Bargeld ab 10.000 EUR annehmen, müssen den Zahler nach dem Geldwäschegesetz identifizieren und die Daten aufbewahren.`,
      },
      {
        titel: "Wann die Quittungsvorlage nicht reicht",
        text: `Die Vorlage reicht für den Alltag: Barverkäufe, Auslagen, Teilzahlungen, Übergaben. Sie reicht nicht als Ersatz für eine Rechnung über 250 EUR, nicht als Kassensystem für ein Ladengeschäft mit vielen Barumsätzen und nicht als alleiniger Nachweis bei Bargeld ab 10.000 EUR, weil dort zusätzlich die Identifizierungspflicht greift.

Bei Übergaben von hohem Wert, etwa Fahrzeugen oder Maschinen, ergänzt du die Quittung um ein ausführliches Übergabeprotokoll mit Fotos. Wie du Bareinnahmen in deiner Buchführung erfasst und ob du eine Registrierkasse brauchst, klärst du mit dem Steuerberater. GründerX liefert die Quittungsvorlage als Werkzeug, keine Steuerberatung.`,
      },
    ],
  text: `Quittung

Variante A – Quittung über Zahlungseingang

Quittung Nr. [Nummer]

Empfänger (Aussteller der Quittung):
[Firma / Vorname Nachname]
[Straße, PLZ Ort]
[Steuernummer oder USt-IdNr.]

Zahler:
[Firma / Vorname Nachname]
[Straße, PLZ Ort]

Betrag: [Betrag] EUR
in Worten: [Betrag in Worten] Euro

Zahlungsart: [bar / EC-Karte / Überweisung am [Datum]]

Grund der Zahlung: [z. B. „Rechnung Nr. [Nummer] vom [Datum]“ / „Kauf von [Gegenstand]“ / „Kaution für [Objekt]“ / „Anzahlung auf [Auftrag]“]

Umsatzsteuer: [Im Betrag enthalten sind [z. B. 19] % Umsatzsteuer = [Betrag] EUR. / Kein Steuerausweis; gemäß § 19 UStG wird keine Umsatzsteuer berechnet. / Privatverkauf, keine Umsatzsteuer.]

[Bei Teilzahlung: Es handelt sich um eine Teilzahlung auf die Forderung in Höhe von [Gesamtbetrag] EUR. Nach dieser Zahlung verbleibt ein Restbetrag von [Restbetrag] EUR, fällig am [Datum].]
[Bei Vollzahlung: Mit dieser Zahlung ist die genannte Forderung vollständig beglichen.]

Der Empfang des oben genannten Betrags wird hiermit bestätigt (§ 368 BGB).

[Ort], den [Datum]


______________________________
[Vorname Nachname], Empfänger
(Unterschrift, ggf. Firmenstempel)


Variante B – Übergabequittung

Übergabequittung Nr. [Nummer]

Übergeber:
[Firma / Vorname Nachname]
[Straße, PLZ Ort]

Empfänger:
[Firma / Vorname Nachname]
[Straße, PLZ Ort]

Übergebene Gegenstände:
1. [Bezeichnung, z. B. „Laptop [Marke, Modell], Seriennummer [Nummer]“], Anzahl: [Zahl], Zustand: [neu / gebraucht, ohne erkennbare Mängel / mit folgenden Mängeln: [Beschreibung]]
2. [Bezeichnung, z. B. „3 Schlüssel für Büro [Anschrift], Nr. [Nummer]“], Anzahl: [Zahl]
3. [Bezeichnung, z. B. „Originalunterlagen: [Liste]“]

Grund der Übergabe: [z. B. „Kaufvertrag vom [Datum]“ / „Leihe bis zum [Datum]“ / „Rückgabe nach Ende des Mietvertrags“ / „Rücksendung zur Reparatur“]

Der Empfänger bestätigt, die oben aufgeführten Gegenstände am heutigen Tag vollständig und im beschriebenen Zustand erhalten zu haben. Weitere Gegenstände wurden nicht übergeben.

[Optional: Die Gegenstände bleiben bis zur vollständigen Zahlung des Kaufpreises Eigentum des Übergebers.]

[Ort], den [Datum]


______________________________
[Vorname Nachname], Empfänger


______________________________
[Vorname Nachname], Übergeber


Hinweise zur Verwendung
1. Die Quittung ist ein Empfangsbekenntnis, keine Rechnung. Für den Vorsteuerabzug ist eine Rechnung nach § 14 UStG nötig; bis 250 EUR brutto reicht eine Kleinbetragsrechnung nach § 33 UStDV (Name und Anschrift des Ausstellers, Ausstellungsdatum, Menge und Art der Leistung, Bruttobetrag, Steuersatz oder Hinweis auf Steuerbefreiung).
2. Bareinnahmen und -ausgaben sind täglich und einzeln aufzuzeichnen (§ 146 Abs. 1 AO) und mit Belegnummer im Kassenbuch zu erfassen. Belege sind 8 Jahre aufzubewahren (§ 147 Abs. 3 AO).
3. Bei Barzahlungen ab 10.000 EUR muss ein Güterhändler den Zahler identifizieren (§ 10 Abs. 6a GwG). Quittungsblock mit fortlaufender Nummer verwenden; Durchschlag oder Kopie beim Aussteller verbleibt.

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
