// Inhalt der Vorlage „auftragsbestaetigung“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../ecommerce.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du eine Auftragsbestätigung Vorlage brauchst",
        text: `Die Auftragsbestätigung ist das Dokument, das den Vertrag festhält, bevor Ware oder Leistung unterwegs sind. Du brauchst sie, wenn ein Geschäftskunde bestellt und du den Auftrag annimmst, wenn ein Auftrag mündlich oder telefonisch erteilt wurde und schriftlich festgehalten werden soll, wenn dein Angebot freibleibend war und der Vertrag erst durch deine Bestätigung zustande kommt oder wenn die Bestellung vom Angebot abweicht und du die Abweichung klären musst.

Ohne Bestätigung liefert ihr beide nach unterschiedlichem Verständnis: der Kunde erwartet den Termin aus dem Telefonat, du planst mit dem aus deinem Kalender. Die Vorlage ist für Geschäftskunden gedacht; im Verbraucher-Shop übernimmt die automatische Bestellbestätigung mit den Pflichtinformationen diese Funktion.`,
      },
      {
        titel: "Das gehört in eine Auftragsbestätigung",
        text: `Die Vorlage spiegelt die Angebotsvorlage, damit Positionen und Nummern durchgängig bleiben, und enthält:

- Briefkopf mit Pflichtangaben, Bestätigungsnummer und Bezug auf Bestellung, Bestellnummer und Angebot
- bestätigte Positionen mit Menge, Einzel- und Gesamtpreis netto sowie Umsatzsteuer und Bruttobetrag (Abschnitt 1)
- Liefertermin, Lieferadresse, Versandart, bei Dienstleistungen Leistungsbeginn und Fertigstellung mit Mitwirkungsvorbehalt (Abschnitt 2)
- Zahlungsbedingungen und Hinweis auf die gesonderte Rechnung (Abschnitt 3)
- Abweichungen von der Bestellung in einer eigenen, hervorgehobenen Liste mit Frist zur Rückmeldung (Abschnitt 4)
- AGB-Einbeziehung mit Abwehrklausel und Eigentumsvorbehalt (Abschnitt 5)
- Hinweis auf die Wirkung als kaufmännisches Bestätigungsschreiben mit Widerspruchsfrist (Abschnitt 6)
- optional Bitte um Gegenzeichnung, Unterschrift, Anlagen

Abschnitt 4 ist der Kern: Nur wenn Abweichungen klar benannt sind, kann der Kunde reagieren, und nur dann wirkt sein Schweigen als Zustimmung.`,
      },
      {
        titel: "Auftragsbestätigung ausfüllen: so gehst du vor",
        text: `Vergib eine Nummer und fülle den Briefkopf aus. Im Bezug trägst du das Datum der Bestellung, die Bestellnummer des Kunden und, falls vorhanden, deine Angebotsnummer ein; bei Telefonaufträgen nennst du Datum und Gesprächspartner. Übernimm die Positionen aus deinem Angebot oder der Bestellung mit identischen Bezeichnungen und Artikelnummern und rechne Netto, Umsatzsteuer und Brutto durch.

In Abschnitt 2 setzt du einen konkreten Liefertermin als Datum, Kalenderwoche oder Werktage nach Zugang, dazu Lieferadresse und Versandart. Bei Dienstleistungen gehört die Frist hinein, bis zu der der Kunde Unterlagen und Freigaben liefern muss. In Abschnitt 3 wählst du die Zahlungsbedingung, die zum Angebot passt.

Abschnitt 4 entscheidet: Entspricht die Bestätigung der Bestellung, bleibt Variante A stehen. Weicht sie ab, nimmst du Variante B, listest jede Abweichung mit Position und Grund und setzt eine Frist für den Widerspruch. In Abschnitt 5 trägst du die AGB-Fassung und den Link ein, in Abschnitt 6 die Widerspruchsfrist. Entscheide, ob du eine Gegenzeichnung willst, und entferne alle eckigen Klammern.`,
      },
      {
        titel: "Typische Fehler bei Auftragsbestätigungen",
        text: `Der größte Fehler ist die versteckte Abweichung: Ein anderer Preis oder ein späterer Termin, der irgendwo in den Positionen steht, ohne dass der Kunde darauf hingewiesen wird. Solche Änderungen binden den Kunden nicht, und bei bewussten Abweichungen, die er erkennbar nicht akzeptieren würde, entfällt die Wirkung des Bestätigungsschreibens ganz. Deshalb hat die Vorlage den eigenen Abschnitt 4.

Zweiter Fehler: Die Bestätigung sieht aus wie eine Rechnung. Wer „zahlbar sofort“ schreibt oder Rechnungsmerkmale nachbildet, verwirrt den Kunden und riskiert umsatzsteuerliche Probleme; die Rechnung kommt gesondert. Dritter Fehler: AGB, die erst in der Bestätigung auftauchen. Das funktioniert nur unter Unternehmern und nur, wenn der Kunde nicht widerspricht; sicherer ist der Hinweis im Angebot. Dazu kommt die eigene Nachlässigkeit beim Lesen: Bestätigungen deiner Lieferanten wirken genauso gegen dich, wenn du nicht unverzüglich widersprichst. Prüfe sie am Tag des Eingangs.`,
      },
      {
        titel: "Rechtliche Grundlagen: Annahme und kaufmännisches Bestätigungsschreiben",
        text: `Ob die Auftragsbestätigung den Vertrag schließt oder nur dokumentiert, hängt vom Vorlauf ab. War dein Angebot verbindlich, kam der Vertrag nach den §§ 145 ff. BGB schon mit der Bestellung zustande. War es freibleibend oder gab es keins, ist die Bestellung der Antrag und deine Bestätigung die Annahme. Bestätigst du mit Abweichungen, ist das nach § 150 Abs. 2 BGB ein neuer Antrag, den der Kunde annehmen muss, etwa durch Abnahme der Lieferung.

Die Grundsätze des kaufmännischen Bestätigungsschreibens sind Gewohnheitsrecht und gelten zwischen Kaufleuten und Personen, die wie Kaufleute am Geschäftsverkehr teilnehmen: Wer auf ein Schreiben, das eine vorherige mündliche Vereinbarung bestätigt, nicht unverzüglich widerspricht, akzeptiert dessen Inhalt. Die Grenze liegt bei Abweichungen, die so weit vom Besprochenen entfernt sind, dass der Absender nicht mit Zustimmung rechnen durfte. Die AGB-Einbeziehung unter Unternehmern folgt aus § 305 BGB in Verbindung mit § 310 Abs. 1 BGB; kollidierende Einkaufsbedingungen gelten nur, soweit sie übereinstimmen.`,
      },
      {
        titel: "Wann die Auftragsbestätigung allein nicht reicht",
        text: `Die Vorlage setzt einen Geschäftskunden und einen überschaubaren Auftrag voraus. Sie reicht nicht gegenüber Verbrauchern, bei denen die Wirkung als Bestätigungsschreiben nicht greift und zusätzliche Informationspflichten gelten, bei Aufträgen mit umfangreicher Leistungsbeschreibung, die als Anlage beiliegen muss, bei Rahmenverträgen mit Abrufen, bei denen jede Abrufbestätigung auf den Rahmenvertrag verweisen sollte, und bei Auslandsgeschäften mit Fragen zu Lieferklauseln, Währung und Rechtswahl.

Wenn Lieferant und Kunde beide AGB schicken und diese sich widersprechen, löst die Abwehrklausel das nicht; dann hilft nur eine ausdrückliche Einigung über die Bedingungen. Bei hohen Auftragswerten, Vertragsstrafen oder Garantien solltest du die Bestätigung anwaltlich prüfen lassen. GründerX ist Software und keine Rechtsberatung; die Vorlage gibt dir ein Dokument, das Bestellung und Angebot sauber zusammenführt, die inhaltliche Prüfung jeder Abweichung bleibt deine Aufgabe.`,
      },
    ],
  text: `Auftragsbestätigung Nr. [Nummer]

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

Auftragsbestätigung Nr. [Nummer]
Ihre Bestellung vom [Datum] [, Ihre Bestell-Nr. [Nummer]] [zu unserem Angebot Nr. [Angebotsnummer] vom [Datum]]
Ansprechpartner: [Vorname Nachname], [Telefonnummer], [E-Mail-Adresse]

Sehr geehrte Frau [Nachname], / Sehr geehrter Herr [Nachname],

vielen Dank für Ihren Auftrag. Wir bestätigen Ihre Bestellung [vom [Datum] / aus unserem Telefonat vom [Datum] mit Herrn/Frau [Nachname]] wie folgt:

1. Bestätigte Positionen

Pos. 1
Bezeichnung: [Artikel / Leistung, Artikelnummer]
Menge: [Anzahl] [Einheit]
Einzelpreis netto: [Betrag] EUR
Gesamtpreis netto: [Betrag] EUR

Pos. 2
Bezeichnung: [Artikel / Leistung]
Menge: [Anzahl] [Einheit]
Einzelpreis netto: [Betrag] EUR
Gesamtpreis netto: [Betrag] EUR

Pos. 3
Bezeichnung: [Versand / Verpackung / Anfahrt]
Menge: [Anzahl] [Einheit]
Einzelpreis netto: [Betrag] EUR
Gesamtpreis netto: [Betrag] EUR

Summe netto: [Betrag] EUR
zuzüglich 19 % Umsatzsteuer: [Betrag] EUR
Gesamtbetrag brutto: [Betrag] EUR

2. Lieferung / Leistung
Liefertermin: [Datum / Kalenderwoche [KW] / innerhalb von [Anzahl] Werktagen nach Zugang dieser Bestätigung]
Lieferadresse: [Firma, Straße Hausnummer, PLZ Ort] [Alternative: wie Rechnungsadresse]
Versandart: [Paketdienst / Spedition / Abholung durch den Kunden]
[Bei Dienstleistungen: Leistungsbeginn am [Datum], Fertigstellung bis zum [Datum]. Voraussetzung ist, dass uns die erforderlichen Unterlagen, Daten und Freigaben bis zum [Datum] vorliegen.]
Teillieferungen behalten wir uns vor, soweit sie Ihnen zumutbar sind.

3. Zahlungsbedingungen
[Zahlung innerhalb von [z. B. 14] Tagen nach Rechnungsdatum ohne Abzug. / Zahlung innerhalb von 10 Tagen mit [z. B. 2] % Skonto, innerhalb von 30 Tagen netto. / Anzahlung von [Betrag] EUR brutto bis zum [Datum], Restzahlung innerhalb von 14 Tagen nach Lieferung.] Die Rechnung erhalten Sie [mit der Lieferung / nach Abnahme] gesondert.

4. Abweichungen von Ihrer Bestellung
[Variante A: Diese Bestätigung entspricht Ihrer Bestellung ohne Abweichungen.]
[Variante B: Bitte beachten Sie folgende Abweichungen von Ihrer Bestellung:
– Pos. [Nummer]: [z. B. „Lieferzeit 3 Wochen statt 2 Wochen, da der Artikel derzeit nicht am Lager ist“]
– Pos. [Nummer]: [z. B. „Preis [Betrag] EUR statt [Betrag] EUR gemäß unserer aktuellen Preisliste vom [Datum]“]
Sollten Sie mit diesen Abweichungen nicht einverstanden sein, bitten wir um Ihre Mitteilung bis zum [Datum].]
[Nur eine Variante stehen lassen.]

5. Vertragsbedingungen
Es gelten ausschließlich unsere Allgemeinen Geschäftsbedingungen in der Fassung vom [Datum], die Ihnen [mit dem Angebot zugegangen sind / dieser Bestätigung beiliegen] und unter [www.domain.de/agb] abrufbar sind. Entgegenstehende oder ergänzende Einkaufsbedingungen des Kunden werden nicht Vertragsbestandteil, auch wenn wir ihnen nicht ausdrücklich widersprechen. Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.

6. Hinweis zur Prüfung dieser Bestätigung
Bitte prüfen Sie diese Auftragsbestätigung sorgfältig. Sie gibt den Inhalt des zwischen uns geschlossenen Vertrags wieder. Soweit wir mündliche oder telefonische Absprachen bestätigen, gilt diese Bestätigung als kaufmännisches Bestätigungsschreiben: Wenn Sie ihrem Inhalt nicht unverzüglich, spätestens bis zum [Datum], widersprechen, gilt der hier bestätigte Inhalt als vereinbart.

[Optional: Wir bitten um Rücksendung einer gegengezeichneten Ausfertigung an [E-Mail-Adresse].]

Wir bedanken uns für Ihr Vertrauen und werden den Auftrag termingerecht ausführen.

Mit freundlichen Grüßen


______________________________
[Vorname Nachname]
[Funktion]
[Firma des Anbieters]

Anlagen:
– [Allgemeine Geschäftsbedingungen, Stand [Datum]]
– [Leistungsbeschreibung / Datenblatt]


[Optional – Gegenzeichnung des Kunden:
Mit dem Inhalt der Auftragsbestätigung Nr. [Nummer] einverstanden.

[Firma des Kunden]

[Ort], den [Datum]


______________________________
[Vorname Nachname], [Funktion]]

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
