// Inhalt der Vorlage „angebot-vorlage“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../ecommerce.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du eine Angebot Vorlage für Geschäftskunden brauchst",
        text: `Ein Angebot ist mehr als eine Preisauskunft: Sobald der Kunde es annimmt, ist der Vertrag geschlossen. Wer Preise per Chat oder kurzer Mail nennt, streitet später über Umfang, Lieferzeit, Gültigkeit und darüber, ob die eigenen AGB gelten. Eine saubere Angebotsvorlage legt all das fest, bevor der Kunde Ja sagt, und ist gleichzeitig die Grundlage für Auftragsbestätigung und Rechnung mit denselben Positionen.

Diese Vorlage ist für Angebote an Unternehmen gedacht: Händler, die Waren an Geschäftskunden liefern, Agenturen und Freelancer mit Projektangeboten, Handwerker und Dienstleister. Sie passt für einmalige Lieferungen genauso wie für Projekte mit Leistungszeitraum. Für Verbraucher gelten zusätzliche Informationspflichten und die Preisangabenverordnung; dafür ist die Vorlage nicht gebaut.`,
      },
      {
        titel: "Das muss in ein Angebot nach § 145 BGB",
        text: `Damit ein Angebot verbindlich und eindeutig ist, enthält die Vorlage:

- Briefkopf mit allen Pflichtangaben, Angebotsnummer, Datum und Ansprechpartner
- Bezug auf die Anfrage des Kunden mit Datum und Zeichen
- Leistungsbeschreibung mit Qualität, Vorgaben und ausdrücklichem Ausschluss dessen, was nicht enthalten ist (Abschnitt 1)
- Positionsliste mit Bezeichnung, Menge, Einheit, Einzel- und Gesamtpreis netto, optional Eventualpositionen (Abschnitt 2)
- Preisblock mit Nettosumme, Rabatt, Umsatzsteuer und Bruttobetrag sowie Lieferkondition (Abschnitt 3)
- Lieferzeit oder Leistungszeitraum mit Vorbehalt der Mitwirkung des Kunden (Abschnitt 4)
- Zahlungsbedingungen, Skonto, Anzahlung und Verzugsfolgen (Abschnitt 5)
- Bindefrist mit festem Datum oder alternativ die freibleibende Variante (Abschnitt 6)
- Annahmeregel, Hinweis auf § 150 Abs. 2 BGB, AGB-Einbeziehung, Abwehrklausel, Eigentumsvorbehalt (Abschnitt 7)
- Unterschrift, Anlagenverzeichnis und Annahmevermerk für den Kunden

Die Leistungsbeschreibung ist der Teil, an dem die meisten Angebote scheitern. Was dort nicht steht, ist später nicht geschuldet, und was nicht ausgeschlossen ist, erwartet der Kunde kostenlos dazu.`,
      },
      {
        titel: "Angebot schreiben: die Vorlage Schritt für Schritt ausfüllen",
        text: `Vergib eine fortlaufende Angebotsnummer und fülle den Briefkopf mit Registerdaten und USt-IdNr. aus. Trage den Kunden mit Ansprechpartner und Abteilung ein und nimm Bezug auf seine Anfrage. Formuliere die Leistungsbeschreibung in zwei bis fünf Sätzen und nenne ausdrücklich, was nicht enthalten ist, etwa Montage, Schulung oder Hosting.

Lege die Positionen an: Artikel oder Leistung, Menge, Einheit, Einzelpreis, Gesamtpreis netto. Versand, Anfahrt oder Einrichtung bekommen eine eigene Position. Eventualpositionen, die nur auf Abruf gelten, kennzeichnest du als solche und lässt sie aus der Summe heraus. Im Preisblock rechnest du Netto, Rabatt, Umsatzsteuer und Brutto durch; Kleinunternehmer nehmen den Hinweis nach § 19 UStG.

Bei der Lieferzeit wählst du Werktage nach Auftragseingang, ein festes Datum oder den Leistungsbeginn mit voraussichtlicher Fertigstellung. Bei der Zahlung entscheidest du dich für Zahlungsziel, Skonto oder Anzahlung. Setze die Bindefrist als Datum, bei Handelsware kurz, bei Projekten länger, oder nimm die freibleibende Variante. Trage die AGB-Fassung und den Link ein, unterschreibe mit Funktion und füge die Anlagen bei.`,
      },
      {
        titel: "Typische Fehler bei Angeboten und ihre Folgen",
        text: `Der häufigste Fehler ist die fehlende Bindefrist. Ohne sie bist du nach § 147 Abs. 2 BGB so lange gebunden, wie du eine Antwort unter regelmäßigen Umständen erwarten darfst; im Streit ist das unklar, und bei steigenden Einkaufspreisen zahlst du drauf. Der zweite Fehler ist die unklare Leistungsbeschreibung: Fehlt der Ausschluss von Nebenleistungen, liefert der Kunde Argumente, warum Korrekturschleifen, Anfahrt oder Support im Preis enthalten seien.

Weitere Fallen: Angebote, die „freibleibend“ und zugleich mit Bindefrist versehen sind und sich damit widersprechen; AGB, auf die nur in der Rechnung hingewiesen wird, obwohl sie schon im Angebot eingebunden sein müssen; Annahmen des Kunden mit Änderungen, die du als Zustimmung verbuchst, obwohl sie nach § 150 Abs. 2 BGB ein neues Angebot sind; und Bruttopreise gegenüber Unternehmern ohne Ausweis der Umsatzsteuer, die später Diskussionen über die Höhe auslösen. Prüfe außerdem, ob die Positionen mit dem Kostenvoranschlag übereinstimmen, falls du vorher einen geschickt hast.`,
      },
      {
        titel: "Rechtliche Grundlagen für Angebot und Vertragsschluss",
        text: `Ein Angebot ist nach § 145 BGB ein Antrag, an den du gebunden bist, bis die Annahmefrist abläuft. Die Frist bestimmst du selbst nach § 148 BGB; fehlt sie, gilt § 147 BGB. Eine verspätete oder abgeänderte Annahme ist nach § 150 BGB Ablehnung und neuer Antrag. Mit „freibleibend“ schließt du die Bindung aus; dann ist dein Schreiben nur eine Einladung, und der Vertrag kommt erst mit deiner Bestätigung zustande.

Deine AGB werden unter Unternehmern einbezogen, wenn du vor Vertragsschluss auf sie hinweist und der Kunde sie einsehen kann; die strengen Anforderungen des § 305 Abs. 2 BGB gelten nach § 310 Abs. 1 BGB zwischen Unternehmern nicht, die Inhaltskontrolle nach § 307 BGB aber schon. Beim Verzug gelten § 286 BGB und der Zinssatz nach § 288 Abs. 2 BGB samt der Pauschale nach § 288 Abs. 5 BGB. Ein Kostenvoranschlag ist nach § 632 Abs. 3 BGB im Zweifel nicht zu vergüten und löst nach § 650 BGB bei wesentlicher Überschreitung eine Anzeigepflicht aus; deshalb nennt die Vorlage feste Preise.`,
      },
      {
        titel: "Wann die Angebotsvorlage nicht reicht",
        text: `Die Vorlage deckt Standardangebote an Unternehmen in Deutschland ab. Sie reicht nicht für Verbraucher, bei denen Gesamtpreise, Widerrufsbelehrung und weitere Pflichtinformationen dazukommen, für öffentliche Auftraggeber mit Vergaberecht und Formblättern, für Auslandsgeschäfte mit Fragen zu Incoterms, Währung und anwendbarem Recht oder für Bauleistungen, bei denen die VOB/B und das Bauvertragsrecht der §§ 650a ff. BGB gelten.

Bei komplexen Projekten gehört zum Angebot ein Pflichtenheft oder eine Leistungsbeschreibung als Anlage, die genauer ist als die zwei bis fünf Sätze der Vorlage. Bei hohen Auftragswerten, Garantiezusagen oder Vertragsstrafen solltest du die Formulierungen anwaltlich prüfen lassen. GründerX ist Software und keine Rechtsberatung; die Vorlage gibt dir die Struktur, die Kalkulation und die Grenze zwischen enthaltener und nicht enthaltener Leistung legst du selbst fest.`,
      },
    ],
  text: `Angebot Nr. [Angebotsnummer]

[Firma des Anbieters]
[Vorname Nachname]
[Straße Hausnummer]
[PLZ Ort]
Telefon: [Telefonnummer] · E-Mail: [E-Mail-Adresse] · Web: [www.domain.de]
[Handelsregister: Amtsgericht [Ort], HRB [Nummer] · Geschäftsführer: [Vorname Nachname]]
USt-IdNr.: DE[Nummer]

[Firma des Kunden]
[Vorname Nachname, Abteilung]
[Straße Hausnummer]
[PLZ Ort]

[Ort], [Datum]

Angebot Nr. [Angebotsnummer] – [Kurzbezeichnung, z. B. „Lieferung von 200 Stück [Produkt]“ / „Relaunch der Website [domain.de]“]
Ihre Anfrage vom [Datum] [, Ihr Zeichen: [Zeichen]]
Ansprechpartner: [Vorname Nachname], [Telefonnummer], [E-Mail-Adresse]

Sehr geehrte Frau [Nachname], / Sehr geehrter Herr [Nachname],

vielen Dank für Ihre Anfrage. Gern unterbreiten wir Ihnen folgendes Angebot:

1. Leistungsbeschreibung
[Beschreibung der Lieferung oder Leistung in zwei bis fünf Sätzen: Was wird geliefert oder erbracht, in welcher Qualität, nach welchen Vorgaben (z. B. Pflichtenheft vom [Datum], Muster Nr. [Nummer], Datenblatt in der Anlage). Was ist ausdrücklich nicht enthalten.]

2. Positionen

Pos. 1
Bezeichnung: [Artikel / Leistung, Artikelnummer]
Menge: [Anzahl] [Einheit, z. B. Stück / Stunden / Pauschale]
Einzelpreis netto: [Betrag] EUR
Gesamtpreis netto: [Betrag] EUR

Pos. 2
Bezeichnung: [Artikel / Leistung]
Menge: [Anzahl] [Einheit]
Einzelpreis netto: [Betrag] EUR
Gesamtpreis netto: [Betrag] EUR

Pos. 3
Bezeichnung: [Versand / Verpackung / Anfahrt / Einrichtung]
Menge: [Anzahl] [Einheit]
Einzelpreis netto: [Betrag] EUR
Gesamtpreis netto: [Betrag] EUR

[Optional – Eventualposition (nur auf Abruf, nicht in der Summe enthalten):
Pos. E1: [Bezeichnung], [Menge], [Betrag] EUR netto]

3. Preise
Summe netto: [Betrag] EUR
[Optional: abzüglich [z. B. 5] % Mengenrabatt: – [Betrag] EUR]
Nettobetrag: [Betrag] EUR
zuzüglich 19 % Umsatzsteuer: [Betrag] EUR
Gesamtbetrag brutto: [Betrag] EUR

Alle Preise verstehen sich in Euro, [ab Lager [Ort] / frei Haus Lieferadresse des Kunden innerhalb Deutschlands], zuzüglich der gesetzlichen Umsatzsteuer. [Bei Kleinunternehmern: Als Kleinunternehmer im Sinne von § 19 UStG wird keine Umsatzsteuer berechnet.]

4. Lieferzeit / Leistungszeitraum
Die Lieferung erfolgt [innerhalb von [z. B. 10] Werktagen nach Auftragseingang / bis zum [Datum] / nach Zahlungseingang der Anzahlung]. [Bei Dienstleistungen: Leistungsbeginn am [Datum], voraussichtliche Fertigstellung bis zum [Datum], vorbehaltlich rechtzeitiger Mitwirkung des Kunden (Freigaben, Daten, Zugänge).] Teillieferungen sind zulässig, soweit sie dem Kunden zumutbar sind.

5. Zahlungsbedingungen
[Zahlung innerhalb von [z. B. 14] Tagen nach Rechnungsdatum ohne Abzug. / Zahlung innerhalb von 10 Tagen mit [z. B. 2] % Skonto, innerhalb von 30 Tagen netto. / 50 % Anzahlung bei Auftragserteilung, Restzahlung innerhalb von 14 Tagen nach Lieferung bzw. Abnahme.] Bei Zahlungsverzug berechnen wir Verzugszinsen in Höhe von 9 Prozentpunkten über dem Basiszinssatz sowie die gesetzliche Pauschale von 40 EUR (§ 288 Abs. 2 und 5 BGB).

6. Bindefrist und Gültigkeit
Dieses Angebot ist verbindlich; wir halten uns bis zum [Datum] daran gebunden (§ 145 BGB). Geht Ihre Annahme bis dahin bei uns ein, ist der Vertrag geschlossen. Nach Ablauf der Frist bitten wir um Rücksprache; Preise und Lieferzeiten können sich dann ändern.
[Alternative – unverbindlich: Dieses Angebot ist freibleibend. Ein Vertrag kommt erst durch unsere Auftragsbestätigung in Textform zustande.]

7. Annahme und Vertragsbedingungen
Die Annahme kann formlos erfolgen, z. B. per E-Mail an [E-Mail-Adresse] unter Angabe der Angebotsnummer, oder durch Rücksendung dieses Angebots mit dem unterschriebenen Annahmevermerk. Abweichungen von diesem Angebot gelten als neues Angebot, das unserer Bestätigung bedarf (§ 150 Abs. 2 BGB).
Es gelten ausschließlich unsere Allgemeinen Geschäftsbedingungen in der Fassung vom [Datum], die diesem Angebot beiliegen und unter [www.domain.de/agb] abrufbar sind. Entgegenstehende Einkaufsbedingungen des Kunden werden nicht Vertragsbestandteil. Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.

Wir freuen uns auf Ihren Auftrag. Bei Fragen zum Angebot erreichen Sie [Vorname Nachname] unter [Telefonnummer].

Mit freundlichen Grüßen


______________________________
[Vorname Nachname]
[Funktion]
[Firma des Anbieters]

Anlagen:
– Allgemeine Geschäftsbedingungen, Stand [Datum]
– [Datenblatt / Leistungsbeschreibung / Muster]


Annahmevermerk des Kunden

Hiermit nehmen wir das Angebot Nr. [Angebotsnummer] vom [Datum] unverändert an.

[Firma des Kunden]
[Bestell-Nr. des Kunden / Kostenstelle]

[Ort], den [Datum]


______________________________
[Vorname Nachname], [Funktion]

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
