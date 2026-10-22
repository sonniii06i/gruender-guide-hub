// Inhalt der Vorlage „agb-onlineshop“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../ecommerce.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du eine AGB Vorlage für deinen Online-Shop brauchst",
        text: `Sobald du Waren über einen eigenen Shop an Verbraucher verkaufst, musst du eine Reihe von Informationen geben: wer Vertragspartner ist, wie der Vertrag zustande kommt, was Lieferung und Zahlung kosten und welche Rechte der Kunde bei Mängeln hat. AGB sind nicht vorgeschrieben, aber sie sind der übliche Ort, an dem Shops diese Pflichtangaben bündeln und gleichzeitig eigene Regeln setzen, etwa den Eigentumsvorbehalt oder die Reihenfolge von Angebot und Annahme.

Diese AGB Vorlage passt für den Start mit Shopify, WooCommerce, Shopware oder einem anderen Shopsystem, wenn du physische Waren an Verbraucher in Deutschland verkaufst. Für Marktplätze wie Amazon oder eBay gelten deren eigene Regeln zum Vertragsschluss; dort nutzt du die Vorlage höchstens als Grundlage für die Pflichtangaben, nicht eins zu eins. Für Geschäftskunden brauchst du andere Klauseln, weil viele Verbraucherschutzregeln dort nicht gelten.`,
      },
      {
        titel: "Was muss in die AGB eines Online-Shops?",
        text: `Die Vorlage folgt dem Ablauf einer Bestellung und deckt die Punkte ab, die bei Abmahnungen am häufigsten geprüft werden:

- Vertragspartner mit ladungsfähiger Anschrift, E-Mail und Registerdaten (§ 1)
- Bestellablauf, Korrekturmöglichkeit und die Beschriftung des Bestellbuttons (§ 2)
- Preise als Endpreise inklusive Umsatzsteuer und Versandkosten (§ 3)
- Zahlungsarten, Fälligkeit und Verzugszinsen (§ 4)
- Lieferzeit, Liefergebiet und Gefahrübergang beim Verbrauchsgüterkauf (§ 5)
- Eigentumsvorbehalt bis zur vollständigen Zahlung (§ 6)
- Verweis auf das Widerrufsrecht und die Ausnahmen (§ 7)
- Gewährleistung ohne Verkürzung bei Neuware (§ 8)
- Haftungsregel, die nur leichte Fahrlässigkeit begrenzt (§ 9)
- Hinweis zur Verbraucherschlichtung nach § 36 VSBG (§ 10)
- Vertragssprache und Speicherung des Vertragstextes (§ 11)

Was nicht in die AGB gehört: die Widerrufsbelehrung selbst, das Muster-Widerrufsformular und die Datenschutzerklärung. Das sind eigene Dokumente, auf die die AGB nur verweisen. Wer alles in einen Text packt, macht ihn unübersichtlich und riskiert, dass einzelne Pflichtangaben übersehen werden.`,
      },
      {
        titel: "AGB Muster ausfüllen: Schritt für Schritt entlang der Platzhalter",
        text: `Beginne mit dem Kopf: Shopname, Domain und der komplette Anbieterblock in § 1 müssen mit deinem Impressum übereinstimmen, inklusive Rechtsformzusatz und Registernummer. In § 2 trägst du die Frist ein, innerhalb der du Bestellungen annimmst; fünf Werktage sind üblich. Streiche bei den Zahlungsarten alles, was du nicht anbietest, und prüfe, ob bei Sofortzahlung der Vertrag schon mit der Zahlung zustande kommt.

In § 3 entscheidest du dich für die Regelbesteuerung oder die Kleinunternehmer-Variante und nennst die Versandkostenseite. Bei § 4 setzt du Fälligkeiten für Vorkasse und Rechnungskauf ein und nennst den Zahlungsdienstleister, falls du Forderungen abtrittst. In § 5 gehören Liefergebiet, Packstation ja oder nein und die realistische Lieferzeit hinein, die mit den Angaben auf deinen Produktseiten übereinstimmen muss.

In § 7 trägst du die URL deiner Widerrufsseite ein, in § 8 die Erreichbarkeit deines Kundendienstes. Bei § 10 wählst du, ob du an Schlichtungsverfahren teilnimmst. Zum Schluss Datum, Firma und Ort eintragen, alle eckigen Klammern entfernen und die AGB als Word oder PDF speichern, bevor sie in den Shop kommen.`,
      },
      {
        titel: "Typische Abmahnfallen bei Shop-AGB und wie du sie vermeidest",
        text: `Der häufigste Fehler liegt nicht in den AGB, sondern im Checkout: Der Bestellbutton muss nach § 312j Abs. 3 BGB mit „zahlungspflichtig bestellen“ oder einer gleich eindeutigen Formulierung beschriftet sein. „Bestellen“, „Weiter“ oder „Kaufen“ reichen nicht, und ohne korrekten Button kommt kein Vertrag zustande. Der zweite Klassiker ist der veraltete OS-Link: Die EU-Plattform zur Online-Streitbeilegung wurde 2025 eingestellt, ein Verweis darauf ist heute irreführend.

Weitere Fallen: eine Gewährleistungsverkürzung für Neuware, pauschale Haftungsausschlüsse, Lieferzeiten wie „in der Regel“ ohne konkrete Angabe, Versandkosten, die erst im letzten Schritt auftauchen, und AGB, die nur über einen Link im Footer erreichbar sind. AGB werden nach § 305 Abs. 2 BGB nur Vertragsbestandteil, wenn der Kunde sie vor der Bestellung zur Kenntnis nehmen und speichern kann. Bei Rabattaktionen prüft die Konkurrenz zudem, ob du den niedrigsten Preis der letzten 30 Tage nennst. Das steht nicht in den AGB, wird aber gleichzeitig abgemahnt.`,
      },
      {
        titel: "Rechtliche Grundlagen: Fernabsatz, AGB-Kontrolle, Informationspflichten",
        text: `Die Regeln für Online-Shops stehen an mehreren Stellen. Die §§ 312c ff. BGB regeln Fernabsatzverträge, darunter die Pflichten im elektronischen Geschäftsverkehr nach § 312i und § 312j BGB. Welche Informationen du vor der Bestellung geben musst, listet Art. 246a EGBGB auf, vom Preis über die Lieferbedingungen bis zum Widerrufsrecht. Das Widerrufsrecht selbst steht in den §§ 355 ff. BGB, die Ausnahmen in § 312g Abs. 2 BGB.

Ob eine einzelne Klausel wirksam ist, entscheidet die AGB-Kontrolle der §§ 305 ff. BGB. Gegenüber Verbrauchern gelten die Klauselverbote der §§ 308 und 309 BGB, deshalb sind Haftungsausschlüsse und Gewährleistungsverkürzungen so eng gefasst. Für Mängelrechte gelten die §§ 434 ff. BGB und für den Verbrauchsgüterkauf die §§ 474 ff. BGB, etwa der Gefahrübergang erst bei Übergabe an den Kunden. Dazu kommen die Preisangabenverordnung und das UWG, über das Mitbewerber und Verbände Verstöße abmahnen können.`,
      },
      {
        titel: "Wann die AGB Vorlage nicht reicht",
        text: `Die Vorlage deckt den Standardfall ab: Warenverkauf an Verbraucher in Deutschland. Sie reicht nicht, wenn du digitale Inhalte oder Dienstleistungen verkaufst, Abos mit automatischer Verlängerung anbietest, ins EU-Ausland lieferst oder Geschäftskunden mit eigenen Konditionen bedienst. Dann brauchst du zusätzliche Klauseln, etwa zum Kündigungsbutton, zum vorzeitigen Erlöschen des Widerrufsrechts bei Downloads oder zu den Verbraucherschutzregeln des Ziellandes.

Auch bei großen Sortimenten, bei regulierten Waren wie Lebensmitteln, Kosmetik oder Elektronik und bei hohem Umsatz lohnt sich eine anwaltliche Prüfung oder ein Abmahnschutz-Dienst, der die Texte bei Gesetzesänderungen nachzieht. GründerX ist Software und keine Rechtsberatung; die Vorlage gibt dir eine geprüfte Struktur, die Verantwortung für den Einsatz im eigenen Shop bleibt bei dir. Lies die Texte deshalb vor jeder Veröffentlichung einmal komplett durch und gleiche sie mit deinem tatsächlichen Bestellablauf ab.`,
      },
    ],
  text: `Allgemeine Geschäftsbedingungen (AGB) für den Online-Shop [Shopname]

§ 1 Geltungsbereich und Vertragspartner
(1) Diese Allgemeinen Geschäftsbedingungen gelten für alle Bestellungen, die Verbraucher über den Online-Shop [Shopname] unter [www.domain.de] aufgeben. Verbraucher ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können (§ 13 BGB).
(2) Vertragspartner des Kunden ist:
[Firma / Vorname Nachname]
[Rechtsform, z. B. „UG (haftungsbeschränkt)“, vertreten durch den Geschäftsführer [Vorname Nachname]]
[Straße Hausnummer]
[PLZ Ort]
Telefon: [Telefonnummer]
E-Mail: [E-Mail-Adresse]
[Handelsregister: Amtsgericht [Ort], HRB [Nummer]]
[USt-IdNr.: DE[Nummer]]
(3) Abweichende Bedingungen des Kunden werden nicht Vertragsbestandteil, es sei denn, der Verkäufer stimmt ihrer Geltung ausdrücklich zu.

§ 2 Vertragsschluss und Bestellablauf
(1) Die Darstellung der Waren im Online-Shop ist kein verbindliches Angebot, sondern eine Aufforderung an den Kunden, ein Angebot abzugeben.
(2) Der Kunde legt die gewünschten Waren in den Warenkorb. Über die Schaltfläche „Warenkorb“ kann er die Auswahl jederzeit einsehen und ändern. Nach Eingabe der Liefer- und Rechnungsadresse und Auswahl der Zahlungsart gelangt der Kunde auf die Bestellübersicht. Dort kann er alle Angaben prüfen und über die Schaltfläche „Zurück“ oder die Browser-Funktionen korrigieren.
(3) Mit Anklicken der Schaltfläche „Zahlungspflichtig bestellen“ gibt der Kunde ein verbindliches Angebot zum Abschluss eines Kaufvertrags über die im Warenkorb befindlichen Waren ab (§ 312j Abs. 3 BGB).
(4) Der Verkäufer bestätigt den Eingang der Bestellung unverzüglich per E-Mail (Eingangsbestätigung, § 312i Abs. 1 Nr. 3 BGB). Diese Eingangsbestätigung ist noch keine Annahme des Angebots, es sei denn, sie enthält ausdrücklich die Annahmeerklärung.
(5) Der Vertrag kommt zustande, wenn der Verkäufer das Angebot innerhalb von [z. B. 5] Werktagen nach Zugang der Bestellung annimmt, und zwar
   a) durch eine ausdrückliche Auftragsbestätigung in Textform (E-Mail) oder
   b) durch Versand der bestellten Ware; maßgeblich ist der Zugang der Versandbestätigung oder der Ware beim Kunden, je nachdem, was zuerst eintritt.
Bei Zahlung per [Vorkasse / PayPal / Kreditkarte / Sofortüberweisung] kommt der Vertrag bereits mit Abschluss des Zahlungsvorgangs zustande, wenn die Zahlung unmittelbar nach dem Absenden der Bestellung ausgelöst wird.
(6) Nimmt der Verkäufer das Angebot nicht innerhalb der Frist an, gilt es als abgelehnt; bereits geleistete Zahlungen werden unverzüglich erstattet.

§ 3 Preise und Versandkosten
(1) Alle angegebenen Preise sind Endpreise in Euro und enthalten die gesetzliche Umsatzsteuer [von derzeit 19 %] sowie sonstige Preisbestandteile. [Alternative für Kleinunternehmer: Alle Preise verstehen sich als Endpreise; Umsatzsteuer wird nach § 19 UStG nicht ausgewiesen.]
(2) Zusätzlich fallen Versandkosten an, die auf der Seite [„Versand und Lieferung“] und vor Abgabe der Bestellung in der Bestellübersicht ausgewiesen werden. [Ab einem Bestellwert von [Betrag] EUR liefert der Verkäufer innerhalb Deutschlands versandkostenfrei.]
(3) Bei Lieferungen in Länder außerhalb der Europäischen Union können zusätzliche Zölle, Steuern und Gebühren anfallen, die der Kunde zu tragen hat und die nicht vom Verkäufer erhoben werden.

§ 4 Zahlung
(1) Der Kunde kann zwischen folgenden Zahlungsarten wählen: [Vorkasse (Überweisung), PayPal, Kreditkarte, Kauf auf Rechnung über [Zahlungsdienstleister], Lastschrift, Apple Pay, Google Pay]. Der Verkäufer behält sich vor, einzelne Zahlungsarten im Einzelfall nicht anzubieten, insbesondere bei Lieferung ins Ausland oder bei Vorliegen eines sachlichen Grundes (z. B. negative Bonitätsauskunft bei Rechnungskauf).
(2) Bei Vorkasse ist der Kaufpreis innerhalb von [z. B. 7] Tagen nach Vertragsschluss fällig. Die Ware wird nach Zahlungseingang versandt. Geht die Zahlung nicht innerhalb von [z. B. 14] Tagen ein, kann der Verkäufer vom Vertrag zurücktreten.
(3) Bei Rechnungskauf ist der Kaufpreis innerhalb von [z. B. 14] Tagen nach Erhalt der Ware und der Rechnung ohne Abzug fällig. [Die Forderung wird an [Zahlungsdienstleister] abgetreten; Zahlung mit schuldbefreiender Wirkung ist nur an diesen möglich.]
(4) Gerät der Kunde in Zahlungsverzug, ist der Verkäufer berechtigt, Verzugszinsen in Höhe von 5 Prozentpunkten über dem Basiszinssatz zu verlangen (§ 288 Abs. 1 BGB). Die Geltendmachung eines weiteren Schadens bleibt vorbehalten.
(5) Der Kunde kann nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen aufrechnen. Ein Zurückbehaltungsrecht kann der Kunde nur ausüben, soweit sein Gegenanspruch auf demselben Vertragsverhältnis beruht.

§ 5 Lieferung und Lieferzeit
(1) Die Lieferung erfolgt an die vom Kunden angegebene Lieferadresse innerhalb von [Deutschland / Deutschland und folgende Länder: [Länderliste]]. Lieferung an Packstationen ist [möglich / nicht möglich].
(2) Die Lieferzeit beträgt, sofern beim Artikel nichts anderes angegeben ist, [z. B. 2 bis 4] Werktage ab Vertragsschluss, bei Vorkasse ab Zahlungseingang. Werktage sind Montag bis Freitag mit Ausnahme gesetzlicher Feiertage am Sitz des Verkäufers.
(3) Ist ein bestellter Artikel nicht lieferbar, weil der Verkäufer ohne eigenes Verschulden von seinem Lieferanten nicht beliefert wird, obwohl er ein deckungsgleiches Geschäft abgeschlossen hat, kann der Verkäufer vom Vertrag zurücktreten. Er informiert den Kunden unverzüglich und erstattet bereits geleistete Zahlungen sofort.
(4) Die Gefahr des zufälligen Untergangs und der zufälligen Verschlechterung der Ware geht erst mit Übergabe der Ware an den Kunden über (§ 475 Abs. 2 BGB), auch wenn der Verkäufer die Versendung übernommen hat.
(5) Erkennbare Transportschäden soll der Kunde beim Zusteller reklamieren und dem Verkäufer mitteilen. Unterlässt er das, hat das keine Auswirkungen auf seine gesetzlichen Gewährleistungsrechte; es hilft dem Verkäufer aber, Ansprüche gegen den Frachtführer geltend zu machen.

§ 6 Eigentumsvorbehalt
Die gelieferte Ware bleibt bis zur vollständigen Bezahlung des Kaufpreises Eigentum des Verkäufers.

§ 7 Widerrufsrecht
(1) Verbrauchern steht ein gesetzliches Widerrufsrecht nach §§ 312g, 355 BGB zu. Die Einzelheiten, insbesondere Frist, Form und Folgen des Widerrufs, ergeben sich aus der Widerrufsbelehrung, die der Kunde im Bestellablauf und in der Bestellbestätigung erhält und die unter [www.domain.de/widerruf] abrufbar ist. Dort ist auch das Muster-Widerrufsformular hinterlegt.
(2) Das Widerrufsrecht besteht nicht bei den in § 312g Abs. 2 BGB genannten Verträgen, insbesondere bei Waren, die nach Kundenspezifikation angefertigt oder eindeutig auf die persönlichen Bedürfnisse zugeschnitten sind, bei schnell verderblichen Waren sowie bei versiegelten Waren, die aus Gründen des Gesundheitsschutzes oder der Hygiene nicht zur Rückgabe geeignet sind, wenn die Versiegelung nach der Lieferung entfernt wurde.

§ 8 Gewährleistung
(1) Es gelten die gesetzlichen Mängelhaftungsrechte (§§ 434 ff. BGB). Die Verjährungsfrist für Mängelansprüche beträgt bei neuen Waren zwei Jahre ab Ablieferung der Ware.
(2) Bei gebrauchten Waren beträgt die Verjährungsfrist ebenfalls zwei Jahre, soweit nicht vor Vertragsschluss eine Verkürzung auf ein Jahr gesondert und ausdrücklich vereinbart wurde (§ 476 Abs. 2 BGB).
(3) Zusätzlich zur gesetzlichen Gewährleistung bestehende Herstellergarantien werden in den jeweiligen Garantiebedingungen beschrieben; sie schränken die gesetzlichen Rechte des Kunden nicht ein.
(4) Kundendienst: Bei Fragen, Reklamationen und Beanstandungen erreicht der Kunde den Verkäufer unter [Telefonnummer] ([Erreichbarkeit, z. B. „Mo–Fr 9–17 Uhr“]) und [E-Mail-Adresse].

§ 9 Haftung
(1) Der Verkäufer haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, für Vorsatz und grobe Fahrlässigkeit, bei arglistigem Verschweigen eines Mangels, bei Übernahme einer Garantie sowie nach dem Produkthaftungsgesetz.
(2) Bei leicht fahrlässiger Verletzung einer wesentlichen Vertragspflicht (Pflicht, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Kunde regelmäßig vertrauen darf) ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt.
(3) Im Übrigen ist die Haftung für leichte Fahrlässigkeit ausgeschlossen.
(4) Soweit die Haftung des Verkäufers ausgeschlossen oder beschränkt ist, gilt dies auch für die persönliche Haftung seiner Mitarbeiter, Vertreter und Erfüllungsgehilfen.

§ 10 Streitbeilegung
(1) Der Verkäufer ist [nicht bereit und nicht verpflichtet / bereit], an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG). [Bei Bereitschaft: Zuständig ist die Allgemeine Verbraucherschlichtungsstelle des Zentrums für Schlichtung e. V., Straßburger Straße 8, 77694 Kehl, www.verbraucher-schlichter.de.]
(2) Die Europäische Plattform zur Online-Streitbeilegung (OS-Plattform) wurde zum 20.07.2025 eingestellt; ein Verweis darauf erfolgt daher nicht mehr.

§ 11 Vertragssprache, Speicherung des Vertragstextes
(1) Die für den Vertragsschluss zur Verfügung stehende Sprache ist Deutsch.
(2) Der Verkäufer speichert den Vertragstext und sendet dem Kunden die Bestelldaten und diese AGB per E-Mail zu. Der Kunde kann die AGB jederzeit unter [www.domain.de/agb] abrufen, speichern und ausdrucken. Die Bestelldaten vergangener Bestellungen sind [im Kundenkonto einsehbar / aus Sicherheitsgründen nicht mehr über das Internet zugänglich].

§ 12 Schlussbestimmungen
(1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Hat der Kunde seinen gewöhnlichen Aufenthalt in einem anderen Staat der EU, bleiben zwingende Verbraucherschutzvorschriften dieses Staates unberührt (Art. 6 Abs. 2 Rom-I-Verordnung).
(2) Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.
(3) Der Verkäufer ist berechtigt, diese AGB für künftige Bestellungen zu ändern. Für bereits abgeschlossene Verträge gilt die zum Zeitpunkt der Bestellung gültige Fassung.

Stand: [Datum]
[Firma], [Ort]

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
