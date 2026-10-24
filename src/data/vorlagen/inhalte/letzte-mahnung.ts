// Inhalt der Vorlage „letzte-mahnung“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../finanzen.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du die letzte Mahnung schickst",
        text: `Die letzte Mahnung ist das Schreiben, mit dem du den außergerichtlichen Teil beendest. Sie kommt, wenn die Zahlungserinnerung und gegebenenfalls eine zweite Mahnung ohne Reaktion geblieben sind, wenn du Verzugszinsen und die Verzugspauschale erstmals konkret beziffern willst, bevor du ein Inkassounternehmen beauftragst oder den Online-Mahnantrag stellst, und wenn die Verjährung zum Jahresende droht. Mehr als zwei bis drei Mahnschreiben bringen nichts; jedes weitere kostet Zeit und Zinsen.

Die Vorlage enthält eine Aufstellung von Hauptforderung, Zinsen, Pauschale und Mahnkosten, die Zinsformel mit Basiszinssatz, eine letzte Frist mit Datum und die Ankündigung von Mahnbescheid, Kostenfolge und Vollstreckung. Sie bleibt sachlich, weil Drohungen ohne Rechtsgrundlage nach hinten losgehen.`,
      },
      {
        titel: "Was muss in eine letzte Mahnung? Verzugszinsen, Pauschale, Frist",
        text: `Eine letzte Mahnung, die vor dem Mahngericht Bestand hat, enthält:

- Absender, Empfänger, Versandweg und Betreff mit Rechnungsnummer
- Den Verweis auf Rechnung und vorangegangene Erinnerung mit Daten sowie den Tag des Verzugsbeginns
- Die Aufstellung: Hauptforderung, Verzugszinsen mit Zeitraum, Tagen und Zinssatz, bei Unternehmern die 40-EUR-Pauschale, Mahnkosten, Gesamtbetrag
- Den Hinweis, dass die Zinsen täglich weiterlaufen, mit dem Tagesbetrag
- Die Rechtsgrundlage für den Zinssatz: § 288 Abs. 2 BGB (neun Prozentpunkte) oder Abs. 1 (fünf Prozentpunkte)
- Eine letzte Frist mit Kalenderdatum und dem Zusatz, dass der Eingang auf dem Konto zählt
- Bankverbindung mit Verwendungszweck
- Die Ankündigung von Mahnbescheid oder Inkasso, Kostenerstattung und Zwangsvollstreckung
- Ein Angebot, die Forderung innerhalb der Frist zu bestreiten oder Ratenzahlung zu vereinbaren
- Anlagen: Rechnungskopie und Kopie der Zahlungserinnerung

Die Aufstellung muss stimmen, denn die Beträge übernimmst du später in den Mahnantrag.`,
      },
      {
        titel: "Mahnung Muster ausfüllen: Zinsen richtig berechnen",
        text: `Trage zuerst den Verzugsbeginn ein: der Tag nach einem vertraglich vereinbarten Zahlungstermin oder der Tag nach Zugang der Zahlungserinnerung. Ermittle dann den aktuellen Basiszinssatz; die Bundesbank veröffentlicht ihn zum 1. Januar und 1. Juli. Rechne die Verzugszinsen nach der Formel: offener Betrag mal Zinssatz mal Verzugstage geteilt durch 365. Bei einer B2B-Forderung ist der Zinssatz Basiszins plus neun Prozentpunkte, gegenüber Verbrauchern plus fünf. Ändert sich der Basiszins im Verzugszeitraum, rechnest du zwei Abschnitte. Trage den Tagesbetrag ein, damit der Schuldner sieht, dass Warten teurer wird.

Die 40-EUR-Pauschale setzt du nur ein, wenn der Schuldner kein Verbraucher ist; streiche sonst die Zeile. Bei Mahnkosten gegenüber Verbrauchern trägst du nur Porto und Material ein. Setze die letzte Frist auf sieben bis zehn Tage nach dem Schreiben. Wähle in der Ankündigung zwischen Mahnbescheid und Inkasso und versende so, dass du den Zugang belegen kannst, etwa per Einwurf-Einschreiben plus E-Mail.`,
      },
      {
        titel: "Typische Fehler bei der letzten Mahnung",
        text: `Der erste Fehler ist der falsche Zinssatz: neun Prozentpunkte gegenüber einem Verbraucher oder ein Basiszins aus einer alten Vorlage. Beides fällt beim Mahngericht oder spätestens im Prozess auf. Der zweite Fehler ist die Pauschale von 40 EUR gegenüber Privatkunden; sie steht nur gegenüber Unternehmern zu. Der dritte Fehler sind erfundene Mahngebühren von 10 oder 15 EUR pro Schreiben; erstattungsfähig sind nur tatsächliche Kosten.

Der vierte Fehler ist eine Schufa-Drohung ohne die Voraussetzungen des § 31 Abs. 2 BDSG; die Drohung selbst kann dann rechtswidrig sein. Der fünfte Fehler ist die Vorstellung, die Mahnung hemme die Verjährung. Das tut sie nicht; nur Mahnbescheid, Klage oder ein Anerkenntnis helfen. Der sechste Fehler ist, bei einer bestrittenen Forderung weiter zu mahnen, statt die Einwände zu prüfen; ein Mahnbescheid landet dann nach Widerspruch ohnehin vor Gericht.`,
      },
      {
        titel: "Rechtsgrundlagen: § 286 BGB, § 288 BGB, Mahnbescheid und Verjährung",
        text: `Verzug tritt nach § 286 BGB durch Mahnung, mit Ablauf eines Kalendertermins oder 30 Tage nach Fälligkeit und Rechnungszugang ein. Die Verzugszinsen regelt § 288 BGB: fünf Prozentpunkte über dem Basiszinssatz (Abs. 1), neun Prozentpunkte bei Entgeltforderungen, an denen kein Verbraucher beteiligt ist (Abs. 2), und die Pauschale von 40 EUR für Unternehmer als Schuldner (Abs. 5), die auf spätere Rechtsverfolgungskosten angerechnet wird. Der Basiszinssatz ergibt sich aus § 247 BGB.

Weitere Verzugsschäden wie Anwalts- und Inkassokosten sind nach §§ 280, 286 BGB zu ersetzen, Inkassokosten aber nur bis zur Höhe der Anwaltsgebühren nach dem RVG (§ 13e RDG). Das gerichtliche Mahnverfahren regeln §§ 688 ff. ZPO; der Mahnbescheid hemmt die Verjährung (§ 204 Abs. 1 Nr. 3 BGB). Forderungen verjähren regelmäßig in drei Jahren ab Ende des Jahres, in dem sie entstanden sind (§§ 195, 199 BGB).`,
      },
      {
        titel: "Wann die Mahnung nicht reicht: Mahnbescheid, Inkasso, Anwalt",
        text: `Zahlt der Schuldner auch nach der letzten Frist nicht, beantragst du online den Mahnbescheid; das geht ohne Anwalt, die Gerichtskosten trägt am Ende der Schuldner. Widerspricht er, geht es ins streitige Verfahren, und bei Streitwerten über 10.000 EUR (Grenze seit 1. Januar 2026) vor dem Landgericht brauchst du einen Anwalt.

Bei Schuldnern im Ausland, bei bestrittenen Forderungen, bei drohender Insolvenz des Schuldners oder bei Beträgen, die dein eigenes Unternehmen gefährden, solltest du schon vor der letzten Mahnung anwaltlichen Rat einholen. Ein Inkassounternehmen lohnt sich meist nur bei vielen kleinen Forderungen. GründerX stellt die Vorlage als Werkzeug bereit; sie ersetzt keine Rechtsberatung.`,
      },
    ],
  text: `Letzte Mahnung

[Firma / Vorname Nachname]
[Straße, PLZ Ort]
[Telefon, E-Mail]

[Firma / Vorname Nachname des Schuldners]
[Straße, PLZ Ort]

Per [Post / Einwurf-Einschreiben / E-Mail]

[Ort], den [Datum]

Betreff: Letzte Mahnung – Rechnung Nr. [Rechnungsnummer] vom [Rechnungsdatum]
Kundennummer: [Kundennummer]

Sehr geehrte Damen und Herren,

trotz unserer Zahlungserinnerung vom [Datum der 1. Erinnerung] [und unserer Mahnung vom [Datum]] ist die Rechnung Nr. [Rechnungsnummer] vom [Rechnungsdatum] über [Leistung / Lieferung] bis heute nicht beglichen. Sie befinden sich seit dem [Datum des Verzugsbeginns] in Zahlungsverzug (§ 286 BGB).

Wir fordern Sie hiermit letztmalig auf, den nachstehend aufgeführten Gesamtbetrag zu zahlen:

Hauptforderung (Rechnung Nr. [Rechnungsnummer]): [Betrag] EUR
Verzugszinsen vom [Verzugsbeginn] bis [Datum dieses Schreibens] ([Tage] Tage, [z. B. 9] Prozentpunkte über dem Basiszinssatz von [aktueller Basiszinssatz] %, zusammen [Zinssatz] % p. a.): [Betrag] EUR
[Nur wenn der Schuldner kein Verbraucher ist: Verzugspauschale nach § 288 Abs. 5 BGB: 40,00 EUR]
Mahnkosten ([Anzahl] Mahnschreiben, Porto und Material): [Betrag] EUR
Gesamtbetrag: [Gesamtbetrag] EUR

Die Verzugszinsen laufen bis zum Zahlungseingang weiter; ab dem [Datum dieses Schreibens] kommen täglich [Betrag] EUR hinzu. Grundlage ist § 288 BGB: [Absatz 2, 9 Prozentpunkte über dem Basiszinssatz, da an dem Geschäft kein Verbraucher beteiligt ist / Absatz 1, 5 Prozentpunkte über dem Basiszinssatz].

Bitte überweisen Sie den Gesamtbetrag von [Gesamtbetrag] EUR bis spätestens

[Datum der letzten Frist, z. B. 7 bis 10 Tage nach Datum dieses Schreibens] (Eingang auf unserem Konto)

auf folgendes Konto:

Kontoinhaber: [Firma / Name]
IBAN: [IBAN]
BIC: [BIC]
Verwendungszweck: [Rechnungsnummer]

Geht die Zahlung nicht fristgerecht ein, werden wir ohne weitere Ankündigung
1. beim zuständigen Mahngericht den Erlass eines gerichtlichen Mahnbescheids beantragen (§§ 688 ff. ZPO) [oder: ein Inkassounternehmen / einen Rechtsanwalt mit der Beitreibung beauftragen],
2. die dadurch entstehenden Gerichts-, Anwalts- und Inkassokosten als Verzugsschaden zusätzlich von Ihnen verlangen (§§ 280, 286 BGB),
3. nach Erlass eines Vollstreckungsbescheids die Zwangsvollstreckung in Ihr Vermögen einleiten.

Sollten Sie die Forderung ganz oder teilweise bestreiten, teilen Sie uns die Gründe bitte innerhalb der genannten Frist schriftlich mit. Wenn Sie den Betrag nicht auf einmal zahlen können, sprechen Sie uns vor Fristablauf an; eine Ratenzahlung ist nach Vereinbarung möglich. Nach Fristablauf werden wir Gespräche über eine Stundung nur noch gegen Anerkenntnis der Gesamtforderung führen.

Sollten Sie zwischenzeitlich gezahlt haben, bitten wir um einen Zahlungsnachweis per E-Mail an [E-Mail].

Mit freundlichen Grüßen


______________________________
[Vorname Nachname]
[Funktion, Firma]

Anlagen: Kopie der Rechnung Nr. [Rechnungsnummer], Kopie der Zahlungserinnerung vom [Datum]

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
