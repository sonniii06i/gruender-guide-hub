import { VORLAGEN_HINWEIS, type Vorlage } from "./types";

// Online-Handel & Vertrieb: AGB, Widerruf, Impressum, AVV, Lieferanten,
// Affiliate, Dropshipping, Reseller, Angebot, Auftragsbestätigung.
// Rechtsstand: BGB/EGBGB (Fernabsatz), DDG (seit 14.05.2024, löst das TMG ab),
// DSGVO, GPSR (Verordnung (EU) 2023/988, seit 13.12.2024), OS-Plattform
// eingestellt am 20.07.2025 (kein OS-Link mehr). Stand 2026-10.

export const VORLAGEN_ECOMMERCE: Vorlage[] = [
  {
    slug: "agb-onlineshop",
    titel: "AGB für Online-Shop (B2C)",
    kurz: "Allgemeine Geschäftsbedingungen für den Warenverkauf an Verbraucher über einen eigenen Online-Shop.",
    kategorie: "ecommerce",
    dateiname: "AGB-Onlineshop",
    wofuer: [
      "Eigener Shop (Shopify, WooCommerce, Shopware) mit Verkauf an Verbraucher in Deutschland",
      "Physische Waren, die per Paket oder Spedition versendet werden",
      "Als Grundlage, die du um Besonderheiten (Vorbestellungen, personalisierte Ware, Abo) ergänzt",
      "Wenn du bisher ohne AGB verkaufst und die Pflichtinformationen sauber bündeln willst",
    ],
    enthaelt: [
      "§ 1 Geltungsbereich und Vertragspartner",
      "§ 2 Vertragsschluss und Bestellablauf",
      "§ 3 Preise und Versandkosten",
      "§ 4 Zahlung",
      "§ 5 Lieferung und Lieferzeit",
      "§ 6 Eigentumsvorbehalt",
      "§ 7 Widerrufsrecht",
      "§ 8 Gewährleistung",
      "§ 9 Haftung",
      "§ 10 Streitbeilegung",
      "§ 11 Vertragssprache, Speicherung des Vertragstextes",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Der Bestellbutton muss nach § 312j Abs. 3 BGB eindeutig beschriftet sein („zahlungspflichtig bestellen“ oder gleichwertig). Fehlt das, kommt kein Vertrag zustande – die AGB retten das nicht.",
      "Die OS-Plattform der EU wurde am 20.07.2025 eingestellt. Ein Link auf ec.europa.eu/consumers/odr gehört nicht mehr in AGB oder Impressum; nur der VSBG-Hinweis bleibt Pflicht.",
      "AGB gelten nur, wenn der Kunde sie vor dem Bestellabschluss zur Kenntnis nehmen kann (§ 305 Abs. 2 BGB): Link im Checkout und auf jeder Seite, dazu Speicher- und Druckmöglichkeit.",
      "Bei Preisermäßigungen musst du nach § 11 PAngV den niedrigsten Preis der letzten 30 Tage angeben. Das steht nicht in den AGB, wird aber bei jedem Rabatt geprüft.",
      "Widerrufsbelehrung und Muster-Widerrufsformular sind eigene Dokumente (siehe die Vorlagen dazu). Sie müssen in Textform (E-Mail, PDF) spätestens mit der Ware beim Kunden ankommen.",
    ],
    faqs: [
      {
        q: "Brauche ich für einen Online-Shop überhaupt AGB?",
        a: "Eine gesetzliche Pflicht zu AGB gibt es nicht. Ohne AGB gilt aber das gesetzliche Kaufrecht komplett zu Lasten des Händlers, etwa bei Eigentumsvorbehalt, Zahlungsarten und Lieferzeiten. Außerdem musst du viele Informationen nach Art. 246a EGBGB ohnehin geben, und AGB sind der übliche Ort dafür.",
      },
      {
        q: "Kann ich den Vertragsschluss so gestalten, dass die Bestellung nicht sofort bindend ist?",
        a: "Ja, die Vorlage macht die Bestellung des Kunden zum Angebot, das du erst durch Auftragsbestätigung oder Versand annimmst. Die automatische Eingangsbestätigung nach § 312i BGB ist noch keine Annahme. So kannst du bei Preisfehlern oder fehlendem Bestand ablehnen, musst das aber innerhalb der genannten Frist tun.",
      },
      {
        q: "Darf ich die Gewährleistung gegenüber Verbrauchern verkürzen?",
        a: "Bei Neuware nein, die zwei Jahre nach § 438 BGB sind zwingend. Bei gebrauchten Sachen kann die Frist auf ein Jahr verkürzt werden, aber seit 2022 nur durch eine ausdrückliche, gesonderte Vereinbarung, nicht einfach in den AGB. Die Vorlage sieht deshalb keine Verkürzung vor.",
      },
      {
        q: "Was ist mit dem OS-Link, der früher Pflicht war?",
        a: "Die Verordnung (EU) Nr. 524/2013 wurde aufgehoben und die Plattform zur Online-Streitbeilegung am 20.07.2025 abgeschaltet. Der Link ist damit nicht nur überflüssig, sondern irreführend. Entferne ihn aus AGB, Impressum und Fußzeile. Der Hinweis nach § 36 VSBG, ob du an einem Schlichtungsverfahren teilnimmst, bleibt Pflicht.",
      },
    ],
    seo: {
      title: "AGB Online-Shop Vorlage 2026 kostenlos (B2C) | GründerX",
      description:
        "AGB für deinen Online-Shop als kostenlose Vorlage: Vertragsschluss, Bestellbutton, Versand, Zahlung, Widerruf, Gewährleistung, Haftung. Stand 2026 ohne OS-Link.",
    },
    stand: "2026-10",
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
  },
  {
    slug: "widerrufsbelehrung-muster",
    titel: "Widerrufsbelehrung für Warenlieferung",
    kurz: "Widerrufsbelehrung nach dem gesetzlichen Muster (Anlage 1 zu Art. 246a EGBGB) für Online-Shops, mit den Gestaltungshinweisen bereits ausgefüllt.",
    kategorie: "ecommerce",
    dateiname: "Widerrufsbelehrung-Warenlieferung",
    wofuer: [
      "Online-Shop mit Warenverkauf an Verbraucher (Fernabsatz)",
      "Verkauf über Marktplätze, wenn dort eine eigene Belehrung hinterlegt werden muss",
      "Shops mit Teillieferungen, Speditionsware oder regelmäßiger Lieferung (Abo-Box)",
      "Wenn du prüfen willst, ob deine bestehende Belehrung noch dem aktuellen Muster entspricht",
    ],
    enthaelt: [
      "Widerrufsrecht mit Fristbeginn (Gestaltungshinweis 1 ausgefüllt)",
      "Varianten für mehrere Waren, Teilsendungen und regelmäßige Lieferungen",
      "Kontaktangaben für die Widerrufserklärung (Name, Anschrift, Telefon, E-Mail)",
      "Folgen des Widerrufs: Rückzahlung, Zahlungsmittel, Zurückbehaltungsrecht",
      "Rücksendefrist und Rücksendekosten, auch für nicht paketfähige Ware",
      "Wertersatz bei übermäßiger Nutzung",
      "Ausschluss und vorzeitiges Erlöschen (§ 312g Abs. 2 BGB)",
      "Hinweis zur Einbindung mit dem Muster-Widerrufsformular",
    ],
    hinweise: [
      "Die Belehrung muss dem Kunden in Textform (E-Mail, PDF) spätestens mit der Ware zugehen (Art. 246a § 4 EGBGB). Fehlt sie oder ist sie falsch, läuft die Widerrufsfrist erst nach 12 Monaten und 14 Tagen ab (§ 356 Abs. 3 BGB).",
      "Nur eine Fristvariante verwenden: Entscheide dich je nach Shop für „die Waren“, „die letzte Ware“, „die letzte Teilsendung“ oder „die erste Ware“ und streiche die anderen. Mehrere Varianten in einer Belehrung machen sie unklar und damit unwirksam.",
      "Wer die Rücksendekosten übernehmen will, ersetzt den Satz „Sie tragen die unmittelbaren Kosten der Rücksendung“ durch „Wir tragen die Kosten der Rücksendung der Waren“. Ein Rücksendeetikett ersetzt die Belehrung nicht.",
      "Die Ausschlüsse nach § 312g Abs. 2 BGB gelten nur, wenn sie tatsächlich zutreffen. Hygieneartikel sind nur ausgeschlossen, wenn sie versiegelt geliefert und die Versiegelung entfernt wurde; „aus hygienischen Gründen keine Rücknahme“ pauschal ist unwirksam.",
    ],
    faqs: [
      {
        q: "Muss ich das gesetzliche Muster wörtlich übernehmen?",
        a: "Nein, aber es lohnt sich. Wer das Muster richtig ausfüllt, erfüllt die Informationspflicht nach Art. 246a § 1 Abs. 2 Satz 2 EGBGB mit gesetzlicher Vermutung. Eigene Formulierungen tragen das volle Abmahnrisiko. Die Vorlage hält sich deshalb exakt an den Wortlaut und füllt nur die Gestaltungshinweise aus.",
      },
      {
        q: "Wann beginnt die 14-Tage-Frist bei einer Bestellung mit mehreren Paketen?",
        a: "Mit Erhalt der letzten Ware, wenn der Kunde mehrere Waren in einer Bestellung bestellt hat, die getrennt geliefert werden. Wird eine Ware in mehreren Teilsendungen geliefert, zählt die letzte Teilsendung. Die Vorlage enthält beide Varianten; du nimmst die, die zu deinem Versand passt.",
      },
      {
        q: "Muss ich auch die Hinsendekosten erstatten?",
        a: "Ja, die Kosten der Standardlieferung musst du bei Widerruf zurückzahlen. Nur die Mehrkosten einer vom Kunden gewählten teureren Versandart (Express) darfst du behalten. Die Rücksendekosten trägt der Kunde, wenn du ihn darüber belehrt hast; sonst trägst du sie.",
      },
      {
        q: "Was ist mit Ware, die der Kunde benutzt hat?",
        a: "Prüfen wie im Laden darf der Kunde, also auspacken, ansehen, anprobieren. Für darüber hinausgehende Nutzung kannst du Wertersatz verlangen, aber nur, wenn du über diese Folge belehrt hast. Den Widerruf selbst darfst du deshalb nicht verweigern.",
      },
    ],
    seo: {
      title: "Widerrufsbelehrung Muster 2026 für Online-Shops | GründerX",
      description:
        "Widerrufsbelehrung nach dem gesetzlichen Muster (Anlage 1 EGBGB) für Warenlieferungen: Varianten ausgefüllt, Rücksendekosten, Ausschlüsse. Gratis als Word, PDF.",
    },
    stand: "2026-10",
    text: `Widerrufsbelehrung

Widerrufsrecht

Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.

Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag,
[Variante A – eine Ware oder einheitliche Lieferung:] an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
[Variante B – mehrere Waren einer Bestellung, getrennt geliefert:] an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die letzte Ware in Besitz genommen haben bzw. hat.
[Variante C – eine Ware in mehreren Teilsendungen:] an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die letzte Teilsendung oder das letzte Stück in Besitz genommen haben bzw. hat.
[Variante D – regelmäßige Lieferung über einen festgelegten Zeitraum (Abo):] an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die erste Ware in Besitz genommen haben bzw. hat.
[Nur die zutreffende Variante stehen lassen, Kennzeichnung „Variante …“ entfernen.]

Um Ihr Widerrufsrecht auszuüben, müssen Sie uns ([Firma / Vorname Nachname], [Straße Hausnummer], [PLZ Ort], Telefon: [Telefonnummer], E-Mail: [E-Mail-Adresse]) mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. [Optional: Sie können das Muster-Widerrufsformular oder eine andere eindeutige Erklärung auch auf unserer Webseite [www.domain.de/widerruf] elektronisch ausfüllen und übermitteln. Machen Sie von dieser Möglichkeit Gebrauch, so werden wir Ihnen unverzüglich (z. B. per E-Mail) eine Bestätigung über den Eingang eines solchen Widerrufs übermitteln.]

Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.

Folgen des Widerrufs

Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.

Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt ist.

Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns [oder an: [Name und Anschrift der Rücksendestelle / des Fulfillment-Dienstleisters]] zurückzusenden oder zu übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von vierzehn Tagen absenden.

[Variante 1 – Kunde trägt die Rücksendekosten:] Sie tragen die unmittelbaren Kosten der Rücksendung der Waren.
[Variante 2 – Händler trägt die Rücksendekosten:] Wir tragen die Kosten der Rücksendung der Waren.
[Variante 3 – Ware kann nicht per Paket zurückgesandt werden (Speditionsware):] Sie tragen die unmittelbaren Kosten der Rücksendung der Waren. Die Kosten werden auf höchstens etwa [Betrag] EUR geschätzt.
[Variante 4 – Abholung durch den Händler bei Speditionsware:] Wir holen die Waren auf unsere Kosten ab.
[Nur die zutreffende Variante stehen lassen.]

Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang mit ihnen zurückzuführen ist.

Ausschluss bzw. vorzeitiges Erlöschen des Widerrufsrechts

Das Widerrufsrecht besteht nicht bei Verträgen
– zur Lieferung von Waren, die nicht vorgefertigt sind und für deren Herstellung eine individuelle Auswahl oder Bestimmung durch den Verbraucher maßgeblich ist oder die eindeutig auf die persönlichen Bedürfnisse des Verbrauchers zugeschnitten sind (§ 312g Abs. 2 Nr. 1 BGB),
– zur Lieferung von Waren, die schnell verderben können oder deren Verfallsdatum schnell überschritten würde (§ 312g Abs. 2 Nr. 2 BGB),
– zur Lieferung von Zeitungen, Zeitschriften oder Illustrierten mit Ausnahme von Abonnement-Verträgen (§ 312g Abs. 2 Nr. 7 BGB).

Das Widerrufsrecht erlischt vorzeitig bei Verträgen
– zur Lieferung versiegelter Waren, die aus Gründen des Gesundheitsschutzes oder der Hygiene nicht zur Rückgabe geeignet sind, wenn ihre Versiegelung nach der Lieferung entfernt wurde (§ 312g Abs. 2 Nr. 3 BGB),
– zur Lieferung von Waren, wenn diese nach der Lieferung auf Grund ihrer Beschaffenheit untrennbar mit anderen Gütern vermischt wurden (§ 312g Abs. 2 Nr. 4 BGB),
– zur Lieferung von Ton- oder Videoaufnahmen oder Computersoftware in einer versiegelten Packung, wenn die Versiegelung nach der Lieferung entfernt wurde (§ 312g Abs. 2 Nr. 6 BGB).
[Nur die Ausschlüsse stehen lassen, die im Sortiment tatsächlich vorkommen.]

Ende der Widerrufsbelehrung


Hinweis zur Einbindung (nicht Teil der Belehrung):
1. Die Belehrung im Bestellablauf vor dem Bestellbutton verlinken und zusätzlich in der Bestellbestätigung per E-Mail oder als PDF mitsenden (Textform, Art. 246a § 4 EGBGB).
2. Das Muster-Widerrufsformular (Anlage 2 zu Art. 246a EGBGB) als eigenes Dokument beifügen; eine Vorlage dafür ist in der GründerX-Bibliothek enthalten.
3. Fristvariante, Rücksendekosten und Ausschlüsse auf das eigene Sortiment abstimmen; keine Varianten nebeneinander stehen lassen.

Stand: [Datum]
[Firma], [Ort]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "muster-widerrufsformular",
    titel: "Muster-Widerrufsformular",
    kurz: "Das gesetzliche Muster-Widerrufsformular (Anlage 2 zu Art. 246a EGBGB) als eigenes Dokument, mit Anleitung zur Einbindung in Shop und Bestellbestätigung.",
    kategorie: "ecommerce",
    dateiname: "Muster-Widerrufsformular",
    wofuer: [
      "Jeder Online-Shop, der an Verbraucher verkauft und eine Widerrufsbelehrung nutzt",
      "Dienstleister und Anbieter digitaler Inhalte im Fernabsatz",
      "Als PDF-Anhang in der Bestellbestätigung oder als Download auf der Widerrufsseite",
    ],
    enthaelt: [
      "Vollständiger Wortlaut der Anlage 2 zu Art. 246a § 1 Abs. 2 Satz 1 Nr. 1 EGBGB",
      "Adressblock des Händlers mit Anschrift und E-Mail",
      "Felder für Ware/Dienstleistung, Bestell- und Erhaltdatum",
      "Felder für Name, Anschrift, Unterschrift und Datum des Verbrauchers",
      "Hinweis zur Einbindung in Bestellablauf, Bestellbestätigung und Widerrufsseite",
      "Hinweis, wie ein Widerruf intern zu bestätigen und zu bearbeiten ist",
    ],
    hinweise: [
      "Das Formular ist Pflicht (Art. 246a § 1 Abs. 2 Satz 1 Nr. 1 EGBGB), aber der Kunde muss es nicht benutzen. Jede eindeutige Erklärung reicht, auch eine formlose E-Mail oder ein Anruf, wenn du Telefon als Weg angibst.",
      "Das Formular gehört in Textform zum Kunden: Verlinkung im Shop allein genügt nicht. Hänge es als PDF an die Bestellbestätigung oder lege es der Ware bei.",
      "Wer einen Widerruf online über ein Webformular ermöglicht, muss den Eingang unverzüglich bestätigen (z. B. per E-Mail); das ist in der Widerrufsbelehrung entsprechend zu ergänzen.",
      "Das Formular nicht umformulieren und nicht um Pflichtfelder wie Bestellnummer oder Rückgabegrund erweitern. Zusätzliche Angaben dürfen nur freiwillig und klar als freiwillig gekennzeichnet sein.",
    ],
    faqs: [
      {
        q: "Reicht es, wenn das Formular auf meiner Website verlinkt ist?",
        a: "Nein. Das Muster-Widerrufsformular muss dem Verbraucher wie die Widerrufsbelehrung auf einem dauerhaften Datenträger zur Verfügung gestellt werden, also per E-Mail, als PDF oder auf Papier. Der Link ist eine sinnvolle Ergänzung, ersetzt aber die Übermittlung nicht.",
      },
      {
        q: "Darf ich das Formular an mein Shop-Design anpassen?",
        a: "Gestaltung ja, Inhalt nein. Logo, Schriftart und Layout sind frei. Der Text sollte dem gesetzlichen Muster entsprechen, damit die Vermutung der ordnungsgemäßen Information greift. Zusätzliche Felder nur als klar freiwillige Angaben, nie als Voraussetzung für den Widerruf.",
      },
      {
        q: "Was mache ich, wenn ein Widerruf ohne Formular kommt?",
        a: "Er ist genauso wirksam. Entscheidend ist, dass der Kunde innerhalb der Frist eindeutig erklärt, den Vertrag zu widerrufen. Bestätige den Eingang, nenne die Rücksendeadresse und erstatte innerhalb von 14 Tagen nach Eingang des Widerrufs, sobald die Ware zurück ist oder der Versandnachweis vorliegt.",
      },
    ],
    seo: {
      title: "Muster-Widerrufsformular 2026 kostenlos (EGBGB) | GründerX",
      description:
        "Das gesetzliche Muster-Widerrufsformular für Online-Shops als eigenes Dokument, mit Anleitung zur Einbindung in Bestellbestätigung und Widerrufsseite. Gratis.",
    },
    stand: "2026-10",
    text: `Muster-Widerrufsformular

(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)

An
[Firma / Vorname Nachname]
[Straße Hausnummer]
[PLZ Ort]
E-Mail: [E-Mail-Adresse]
[Optional: Telefax: [Faxnummer]]

Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*) / die Erbringung der folgenden Dienstleistung (*):

______________________________________________________________

______________________________________________________________

Bestellt am (*) / erhalten am (*):

______________________________________________________________

Name des/der Verbraucher(s):

______________________________________________________________

Anschrift des/der Verbraucher(s):

______________________________________________________________

______________________________________________________________

Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):

______________________________________________________________

Datum:

______________________________________________________________

(*) Unzutreffendes streichen.

Ende des Muster-Widerrufsformulars


Hinweise zur Einbindung (nicht Teil des Formulars, vor Veröffentlichung entfernen):

1. Pflicht und Form
Das Muster-Widerrufsformular entspricht Anlage 2 zu Art. 246a § 1 Abs. 2 Satz 1 Nr. 1 EGBGB. Der Händler muss es dem Verbraucher vor Vertragsschluss zur Verfügung stellen und spätestens mit der Ware bzw. der Bestellbestätigung in Textform übermitteln (Art. 246a § 4 EGBGB). Üblich ist ein PDF-Anhang in der Bestellbestätigungs-E-Mail und ein Download unter [www.domain.de/widerruf].

2. Verhältnis zur Widerrufsbelehrung
Das Formular ergänzt die Widerrufsbelehrung, ersetzt sie aber nicht. In der Belehrung heißt es: „Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.“ Deshalb muss das Formular tatsächlich beigefügt sein.

3. Online-Widerruf
Bietet der Shop ein Webformular zum Widerruf an, muss der Eingang unverzüglich bestätigt werden, z. B. per automatischer E-Mail. Die Widerrufsbelehrung ist dann um den entsprechenden Satz aus dem gesetzlichen Muster zu ergänzen.

4. Bearbeitung im Betrieb
Eingang des Widerrufs mit Datum dokumentieren. Rückzahlung spätestens 14 Tage nach Eingang des Widerrufs, wobei die Rückzahlung bis zum Rückerhalt der Ware oder bis zum Nachweis der Rücksendung verweigert werden darf. Dasselbe Zahlungsmittel verwenden, das der Kunde eingesetzt hat.

5. Keine Zusatzpflichten
Zusätzliche Felder (Bestellnummer, Grund der Rückgabe, Kundennummer) sind erlaubt, wenn sie eindeutig als freiwillig gekennzeichnet sind. Der Widerruf darf nicht davon abhängig gemacht werden, dass der Kunde das Formular benutzt, einen Grund nennt oder die Originalverpackung verwendet.

Stand: [Datum]
[Firma], [Ort]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "impressum-muster",
    titel: "Impressum nach § 5 DDG",
    kurz: "Impressum-Vorlage nach dem Digitale-Dienste-Gesetz für Einzelunternehmen, GbR, UG und GmbH mit allen Varianten-Blöcken (Handelsregister, USt-IdNr., Aufsicht, MStV).",
    kategorie: "ecommerce",
    dateiname: "Impressum-Muster-DDG",
    wofuer: [
      "Jede geschäftliche Website, jeder Online-Shop und jedes geschäftlich genutzte Social-Media-Profil",
      "Einzelunternehmer, Freiberufler, GbR, UG (haftungsbeschränkt) und GmbH",
      "Wenn dein altes Impressum noch auf das TMG verweist und aktualisiert werden muss",
      "Blogs, Newsletter und Kanäle mit redaktionellen Inhalten (Verantwortlicher nach MStV)",
    ],
    enthaelt: [
      "Block A: Anbieter – Einzelunternehmen / Freiberufler",
      "Block B: Anbieter – GbR mit allen Gesellschaftern",
      "Block C: Anbieter – UG (haftungsbeschränkt) / GmbH mit Geschäftsführer",
      "Kontakt: E-Mail und zweiter schneller Kontaktweg",
      "Handelsregister, Registergericht, Registernummer",
      "USt-IdNr. oder Wirtschafts-Identifikationsnummer",
      "Aufsichtsbehörde bei zulassungspflichtiger Tätigkeit",
      "Berufsrechtliche Angaben für reglementierte Berufe",
      "Berufshaftpflichtversicherung (DL-InfoV)",
      "Verantwortlicher für journalistisch-redaktionelle Inhalte (§ 18 Abs. 2 MStV)",
      "Verbraucherstreitbeilegung (§ 36 VSBG) ohne OS-Link",
    ],
    hinweise: [
      "Seit dem 14.05.2024 steht die Impressumspflicht in § 5 DDG, nicht mehr in § 5 TMG. Ein Verweis auf das TMG ist nicht automatisch abmahnbar, zeigt aber ein ungepflegtes Impressum; die Vorlage verwendet durchgehend das DDG.",
      "Eine ladungsfähige Anschrift ist Pflicht. Postfach, Packstation oder reine Briefkastenadressen reichen nicht. Wer von zu Hause arbeitet, muss die Privatadresse nennen oder eine echte Geschäftsadresse mit Postempfang nutzen.",
      "Die USt-IdNr. ist nur anzugeben, wenn du eine hast. Die Steuernummer gehört nicht ins Impressum. Fehlt die USt-IdNr., kann die Wirtschafts-Identifikationsnummer (W-IdNr.) genannt werden.",
      "Eine UG muss immer als „UG (haftungsbeschränkt)“ oder „Unternehmergesellschaft (haftungsbeschränkt)“ auftreten; der Zusatz darf nicht abgekürzt werden. Fehlt er, droht persönliche Haftung.",
      "Das Impressum muss von jeder Seite mit höchstens zwei Klicks erreichbar und als „Impressum“ erkennbar sein. Das gilt auch für Instagram-, TikTok- und LinkedIn-Profile, die geschäftlich genutzt werden.",
    ],
    faqs: [
      {
        q: "Was hat sich mit dem Wechsel vom TMG zum DDG geändert?",
        a: "Inhaltlich fast nichts: Die Pflichtangaben des § 5 TMG wurden nahezu wortgleich in § 5 DDG übernommen. Neu ist die Rechtsgrundlage, weil das TMG mit dem Digitale-Dienste-Gesetz vom 14.05.2024 aufgehoben wurde. Wer in seinem Impressum „§ 5 TMG“ schreibt, sollte das auf „§ 5 DDG“ ändern.",
      },
      {
        q: "Brauche ich als Kleinunternehmer ein Impressum?",
        a: "Ja, sobald du geschäftsmäßig einen digitalen Dienst anbietest, also eine Website, einen Shop oder ein geschäftliches Social-Media-Profil betreibst. Die Kleinunternehmerregelung betrifft nur die Umsatzsteuer. Ohne USt-IdNr. lässt du das Feld einfach weg.",
      },
      {
        q: "Wann brauche ich einen Verantwortlichen nach § 18 Abs. 2 MStV?",
        a: "Sobald du journalistisch-redaktionelle Inhalte veröffentlichst, etwa einen Blog, Ratgeberartikel oder einen regelmäßigen Newsletter mit Meinungsbeiträgen. Dann nennst du eine natürliche Person mit Name und Anschrift. Bei reinen Produktseiten ist der Block entbehrlich, schadet aber nicht.",
      },
      {
        q: "Muss der Link zur OS-Plattform noch ins Impressum?",
        a: "Nein. Die EU hat die Plattform zur Online-Streitbeilegung am 20.07.2025 abgeschaltet und die zugrunde liegende Verordnung aufgehoben. Der Link führt ins Leere und sollte entfernt werden. Der Hinweis nach § 36 VSBG, ob du an Schlichtungsverfahren teilnimmst, bleibt für Unternehmen mit mehr als zehn Mitarbeitern Pflicht und ist für alle anderen empfehlenswert.",
      },
    ],
    seo: {
      title: "Impressum Vorlage 2026 nach § 5 DDG (nicht TMG) | GründerX",
      description:
        "Impressum-Muster nach § 5 DDG für Einzelunternehmen, GbR, UG und GmbH: alle Pflichtangaben, Handelsregister, USt-IdNr., MStV, VSBG. Kostenlos als Word und PDF.",
    },
    stand: "2026-10",
    text: `Impressum

Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)

[Block A – Einzelunternehmen / Freiberufler; nur einen der Blöcke A, B oder C verwenden:]
[Vorname Nachname]
[Optional: Geschäftsbezeichnung, z. B. „[Name] Onlinehandel“ oder eingetragene Firma „[Name] e. K.“]
[Straße Hausnummer]
[PLZ Ort]
Deutschland

[Block B – Gesellschaft bürgerlichen Rechts:]
[Name] GbR [bei Registereintragung: „eGbR“]
[Straße Hausnummer]
[PLZ Ort]
Deutschland
Vertretungsberechtigte Gesellschafter: [Vorname Nachname], [Vorname Nachname]
[Bei eGbR: Eingetragen im Gesellschaftsregister des Amtsgerichts [Ort] unter GsR [Nummer]]

[Block C – UG (haftungsbeschränkt) / GmbH:]
[Firma] [UG (haftungsbeschränkt) / GmbH]
[Straße Hausnummer]
[PLZ Ort]
Deutschland
Vertreten durch: Geschäftsführer [Vorname Nachname] [, Vorname Nachname]
Handelsregister: Amtsgericht [Ort], HRB [Nummer]
[Optional: Stammkapital: [Betrag] EUR]
[Nur bei Gesellschaft in Liquidation: „i. L.“ im Firmennamen und Angabe der Liquidatoren]

Kontakt
Telefon: [Telefonnummer]
[Optional: Telefax: [Faxnummer]]
E-Mail: [E-Mail-Adresse]
[Optional: Kontaktformular: [www.domain.de/kontakt]]

Umsatzsteuer
Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: DE[Nummer]
[Alternative, wenn keine USt-IdNr. vorhanden: Wirtschafts-Identifikationsnummer gemäß § 139c Abgabenordnung: DE[Nummer]]
[Hinweis: Die Steuernummer des Finanzamts gehört nicht ins Impressum. Kleinunternehmer ohne USt-IdNr. lassen den Block weg.]

[Block – nur bei zulassungspflichtiger Tätigkeit, z. B. Versicherungsvermittlung, Finanzanlagenvermittlung, Makler nach § 34c GewO, Bewachung, Gaststätte:]
Zuständige Aufsichtsbehörde
[Name der Behörde, z. B. „Industrie- und Handelskammer [Ort]“ oder „Gewerbeamt der Stadt [Ort]“]
[Straße Hausnummer, PLZ Ort]
[www.behoerde.de]
[Bei Erlaubnis: Erlaubnis nach § [Paragraf] GewO erteilt durch [Behörde] am [Datum]; Registernummer [Nummer] im Vermittlerregister (www.vermittlerregister.info)]

[Block – nur bei reglementierten Berufen, z. B. Rechtsanwalt, Steuerberater, Architekt, Heilpraktiker, Ingenieur:]
Berufsrechtliche Angaben
Gesetzliche Berufsbezeichnung: [Berufsbezeichnung], verliehen in [Staat, z. B. „Bundesrepublik Deutschland“]
Zuständige Kammer: [Name der Kammer], [Anschrift], [www.kammer.de]
Berufsrechtliche Regelungen: [z. B. „Bundesrechtsanwaltsordnung (BRAO), Berufsordnung für Rechtsanwälte (BORA), Rechtsanwaltsvergütungsgesetz (RVG)“], abrufbar unter [www.link-zu-den-regelungen.de]

[Block – nur bei Dienstleistern mit Berufshaftpflichtversicherung, § 2 Abs. 1 Nr. 11 DL-InfoV:]
Berufshaftpflichtversicherung
[Name des Versicherers], [Anschrift]
Räumlicher Geltungsbereich: [z. B. „Deutschland“ / „EU“ / „weltweit“]

[Block – nur bei journalistisch-redaktionellen Inhalten, z. B. Blog, Ratgeber, Newsletter:]
Verantwortlich für den Inhalt nach § 18 Abs. 2 Medienstaatsvertrag (MStV)
[Vorname Nachname]
[Straße Hausnummer]
[PLZ Ort]

Verbraucherstreitbeilegung
[Variante 1:] Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG).
[Variante 2:] Wir sind bereit, an Streitbeilegungsverfahren vor der folgenden Verbraucherschlichtungsstelle teilzunehmen: Allgemeine Verbraucherschlichtungsstelle des Zentrums für Schlichtung e. V., Straßburger Straße 8, 77694 Kehl, www.verbraucher-schlichter.de.
[Nur eine Variante stehen lassen. Kein Link zur OS-Plattform der EU: Diese wurde am 20.07.2025 eingestellt.]

[Optional – Bildnachweise:]
Bildnachweise
[Fotograf / Agentur, Lizenz, Bild-ID] für die Bilder auf [Seite].

[Optional – Haftungshinweis für Links:]
Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.


Checkliste vor Veröffentlichung (entfernen):
1. Nur einen Anbieter-Block (A, B oder C) stehen lassen; alle nicht zutreffenden Blöcke und Klammerhinweise löschen.
2. Die Anschrift muss ladungsfähig sein: Straße und Hausnummer, kein Postfach, keine Packstation.
3. Rechtsformzusatz vollständig: „UG (haftungsbeschränkt)“ darf nicht gekürzt werden; „GmbH“, „e. K.“, „GbR“ / „eGbR“ wie im Register.
4. Das Impressum von jeder Seite aus mit maximal zwei Klicks erreichbar machen und als „Impressum“ bezeichnen; auch in Social-Media-Profilen verlinken.
5. Wer an Verbraucher verkauft, ergänzt die Angaben um AGB, Widerrufsbelehrung, Muster-Widerrufsformular und Datenschutzerklärung (jeweils eigene Dokumente).
6. Änderungen (Umzug, Geschäftsführerwechsel, neue USt-IdNr.) sofort nachziehen; das Impressum muss jederzeit aktuell sein.

Stand: [Datum]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "avv-auftragsverarbeitungsvertrag",
    titel: "Auftragsverarbeitungsvertrag (AVV) nach Art. 28 DSGVO",
    kurz: "Vertrag zur Auftragsverarbeitung zwischen Verantwortlichem und Dienstleister nach Art. 28 DSGVO mit Anlagen für Datenkategorien, TOM und Unterauftragnehmer.",
    kategorie: "ecommerce",
    dateiname: "Auftragsverarbeitungsvertrag-AVV",
    wofuer: [
      "Du beauftragst einen Dienstleister, der personenbezogene Daten für dich verarbeitet (Fulfillment, Newsletter-Tool, Hosting, Kundenservice, Agentur mit Zugriff auf Kundendaten)",
      "Du bist selbst Dienstleister und brauchst einen AVV für deine Kunden",
      "Freelancer, die mit Kundendaten des Auftraggebers arbeiten (Support, Buchhaltung, Lead-Pflege)",
      "Wenn der Anbieter keinen eigenen AVV stellt und du einen vorlegen musst",
    ],
    enthaelt: [
      "§ 1 Gegenstand und Dauer der Verarbeitung",
      "§ 2 Art, Zweck, Datenkategorien und betroffene Personen",
      "§ 3 Weisungsrecht des Verantwortlichen",
      "§ 4 Pflichten des Auftragsverarbeiters",
      "§ 5 Technische und organisatorische Maßnahmen (TOM)",
      "§ 6 Unterauftragsverhältnisse",
      "§ 7 Verarbeitung in Drittländern",
      "§ 8 Unterstützung bei Betroffenenrechten und Datenpannen",
      "§ 9 Kontrollrechte und Nachweise",
      "§ 10 Löschung und Rückgabe nach Vertragsende",
      "§ 11 Haftung und Schlussbestimmungen",
      "Anlage 1 Verarbeitungsbeschreibung, Anlage 2 TOM, Anlage 3 Unterauftragnehmer",
    ],
    hinweise: [
      "Ohne AVV ist die Weitergabe der Daten an den Dienstleister ein Datenschutzverstoß des Verantwortlichen, nicht nur des Dienstleisters. Der Vertrag muss vor Beginn der Verarbeitung geschlossen sein (Art. 28 Abs. 3 DSGVO), Schriftform oder elektronische Form reicht (Art. 28 Abs. 9 DSGVO).",
      "Die Anlagen sind der eigentliche Inhalt. Ein AVV mit leerer TOM-Anlage und ohne konkrete Datenkategorien erfüllt Art. 28 Abs. 3 nicht. Beschreibe, was tatsächlich passiert, nicht was theoretisch möglich wäre.",
      "Bei US-Anbietern prüfen, ob eine Zertifizierung nach dem EU-US Data Privacy Framework vorliegt oder Standardvertragsklauseln (Durchführungsbeschluss (EU) 2021/914) geschlossen sind. Ein AVV allein deckt die Übermittlung ins Drittland nicht.",
      "Für Unterauftragnehmer gilt: allgemeine Genehmigung mit Informationspflicht und Widerspruchsrecht ist zulässig, aber die aktuelle Liste muss tatsächlich geführt und bei Änderungen mitgeteilt werden (Art. 28 Abs. 2 DSGVO).",
      "Keine Auftragsverarbeitung, sondern eigene Verantwortlichkeit liegt bei Steuerberatern, Rechtsanwälten, Paketdiensten und Zahlungsdienstleistern vor. Dort ist kein AVV nötig, sondern eine Übermittlung auf eigener Rechtsgrundlage.",
    ],
    faqs: [
      {
        q: "Wann brauche ich einen AVV und wann nicht?",
        a: "Einen AVV brauchst du, wenn ein Dienstleister personenbezogene Daten weisungsgebunden für dich verarbeitet, ohne eigene Entscheidung über Zwecke und Mittel: Hosting, E-Mail-Marketing-Tools, Fulfillment-Lager, externer Support, Agenturen mit Datenbankzugriff. Nicht nötig ist er bei eigenverantwortlich tätigen Dritten wie Steuerberater, Anwalt, Paketdienst oder Bank.",
      },
      {
        q: "Muss der AVV unterschrieben werden?",
        a: "Art. 28 Abs. 9 DSGVO verlangt Schriftform, lässt aber ausdrücklich ein elektronisches Format zu. Ein per E-Mail bestätigter PDF-Vertrag, eine Online-Zustimmung im Kundenkonto des Anbieters oder eine qualifizierte elektronische Signatur reichen. Wichtig ist, dass beide Seiten den Inhalt nachweisbar akzeptiert haben.",
      },
      {
        q: "Kann ich stattdessen die Standardvertragsklauseln der EU-Kommission für Auftragsverarbeiter nutzen?",
        a: "Ja, die Kommission hat mit Durchführungsbeschluss (EU) 2021/915 Standardvertragsklauseln für das Verhältnis Verantwortlicher zu Auftragsverarbeiter veröffentlicht. Sie sind umfangreicher und modular. Diese Vorlage ist der kompaktere, in Deutschland übliche Aufbau; beide erfüllen Art. 28 Abs. 3 DSGVO, wenn die Anlagen sauber ausgefüllt sind.",
      },
      {
        q: "Wer haftet, wenn beim Dienstleister Daten abfließen?",
        a: "Nach außen gegenüber Betroffenen haften Verantwortlicher und Auftragsverarbeiter nach Art. 82 DSGVO gemeinsam; der Auftragsverarbeiter aber nur, wenn er seine spezifischen Pflichten verletzt oder gegen Weisungen verstoßen hat. Im Innenverhältnis regelt § 11 der Vorlage den Ausgleich nach Verursachungsanteilen.",
      },
    ],
    seo: {
      title: "AVV Vorlage 2026: Auftragsverarbeitungsvertrag DSGVO | GründerX",
      description:
        "Auftragsverarbeitungsvertrag nach Art. 28 DSGVO als kostenlose Vorlage mit Anlagen für Datenkategorien, TOM, Unterauftragnehmer und Drittlandtransfer. Gratis.",
    },
    stand: "2026-10",
    text: `Vertrag über die Auftragsverarbeitung nach Art. 28 DSGVO

zwischen

[Firma / Vorname Nachname], [Straße Hausnummer], [PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Verantwortlicher“ –

und

[Firma des Dienstleisters], [Straße Hausnummer], [PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Auftragsverarbeiter“ –

– gemeinsam „die Parteien“ –

Präambel
Der Auftragsverarbeiter erbringt für den Verantwortlichen Leistungen aus dem Vertrag vom [Datum] über [Bezeichnung der Hauptleistung, z. B. „Lagerung und Versand von Kundenbestellungen“, „Betrieb des Newsletter-Systems“, „Hosting des Online-Shops“] (nachfolgend „Hauptvertrag“). Dabei verarbeitet er personenbezogene Daten im Auftrag des Verantwortlichen. Dieser Vertrag konkretisiert die datenschutzrechtlichen Pflichten der Parteien nach Art. 28 der Datenschutz-Grundverordnung (DSGVO).

§ 1 Gegenstand und Dauer der Verarbeitung
(1) Gegenstand der Verarbeitung ist die in Anlage 1 beschriebene Leistung.
(2) Die Dauer der Verarbeitung entspricht der Laufzeit des Hauptvertrags. Dieser Vertrag endet mit dem Hauptvertrag, frühestens jedoch, wenn der Auftragsverarbeiter alle personenbezogenen Daten nach § 10 gelöscht oder zurückgegeben hat.
(3) Die Verarbeitung findet in [Deutschland / Mitgliedstaaten der EU bzw. des EWR] statt. Eine Verarbeitung in Drittländern ist nur unter den Voraussetzungen des § 7 zulässig.

§ 2 Art, Zweck, Datenkategorien und betroffene Personen
(1) Art und Zweck der Verarbeitung, die Kategorien personenbezogener Daten und die Kategorien betroffener Personen sind in Anlage 1 festgelegt.
(2) Besondere Kategorien personenbezogener Daten nach Art. 9 DSGVO (z. B. Gesundheitsdaten) werden [nicht verarbeitet / nur im in Anlage 1 beschriebenen Umfang verarbeitet].

§ 3 Weisungsrecht des Verantwortlichen
(1) Der Auftragsverarbeiter verarbeitet personenbezogene Daten ausschließlich im Rahmen der getroffenen Vereinbarungen und auf dokumentierte Weisung des Verantwortlichen, es sei denn, er ist nach dem Recht der Union oder eines Mitgliedstaats zur Verarbeitung verpflichtet. In diesem Fall teilt er dem Verantwortlichen die rechtlichen Anforderungen vor der Verarbeitung mit, sofern das betreffende Recht eine solche Mitteilung nicht wegen eines wichtigen öffentlichen Interesses verbietet.
(2) Weisungen werden grundsätzlich in Textform erteilt (E-Mail genügt). Mündliche Weisungen sind unverzüglich in Textform zu bestätigen. Weisungsberechtigt auf Seiten des Verantwortlichen sind: [Vorname Nachname, Funktion]. Weisungsempfänger beim Auftragsverarbeiter: [Vorname Nachname, Funktion].
(3) Ist der Auftragsverarbeiter der Ansicht, dass eine Weisung gegen die DSGVO oder andere Datenschutzvorschriften verstößt, informiert er den Verantwortlichen unverzüglich. Er darf die Durchführung der Weisung bis zur Bestätigung oder Änderung durch den Verantwortlichen aussetzen.

§ 4 Pflichten des Auftragsverarbeiters
(1) Der Auftragsverarbeiter gewährleistet, dass die zur Verarbeitung befugten Personen zur Vertraulichkeit verpflichtet sind oder einer angemessenen gesetzlichen Verschwiegenheitspflicht unterliegen. Die Verpflichtung besteht auch nach Beendigung der Tätigkeit fort.
(2) Der Auftragsverarbeiter hat [einen Datenschutzbeauftragten bestellt: [Vorname Nachname], erreichbar unter [E-Mail-Adresse] / keinen Datenschutzbeauftragten bestellt, weil die gesetzlichen Voraussetzungen nach Art. 37 DSGVO und § 38 BDSG nicht vorliegen]. Änderungen teilt er dem Verantwortlichen unverzüglich mit.
(3) Der Auftragsverarbeiter führt ein Verzeichnis der Verarbeitungstätigkeiten nach Art. 30 Abs. 2 DSGVO.
(4) Der Auftragsverarbeiter unterstützt den Verantwortlichen bei der Einhaltung der in den Art. 32 bis 36 DSGVO genannten Pflichten (Sicherheit der Verarbeitung, Meldung von Verletzungen, Datenschutz-Folgenabschätzung, vorherige Konsultation) unter Berücksichtigung der Art der Verarbeitung und der ihm zur Verfügung stehenden Informationen.
(5) Der Auftragsverarbeiter darf die Daten nicht für eigene Zwecke verwenden, keine Kopien oder Duplikate ohne Wissen des Verantwortlichen anfertigen (ausgenommen Sicherungskopien im Rahmen ordnungsgemäßer Datensicherung) und die Daten nicht an Dritte weitergeben, soweit dieser Vertrag nichts anderes bestimmt.

§ 5 Technische und organisatorische Maßnahmen
(1) Der Auftragsverarbeiter trifft die in Anlage 2 beschriebenen technischen und organisatorischen Maßnahmen nach Art. 32 DSGVO, um ein dem Risiko angemessenes Schutzniveau zu gewährleisten. Dabei berücksichtigt er den Stand der Technik, die Implementierungskosten, Art, Umfang, Umstände und Zwecke der Verarbeitung sowie die Eintrittswahrscheinlichkeit und Schwere des Risikos für die Rechte und Freiheiten der betroffenen Personen.
(2) Die Maßnahmen unterliegen dem technischen Fortschritt. Der Auftragsverarbeiter darf sie weiterentwickeln, soweit das vereinbarte Schutzniveau nicht unterschritten wird. Wesentliche Änderungen sind zu dokumentieren und dem Verantwortlichen auf Anfrage mitzuteilen.

§ 6 Unterauftragsverhältnisse
(1) Der Verantwortliche erteilt dem Auftragsverarbeiter die allgemeine Genehmigung, die in Anlage 3 aufgeführten weiteren Auftragsverarbeiter (Unterauftragnehmer) einzusetzen.
(2) Der Auftragsverarbeiter informiert den Verantwortlichen in Textform über jede beabsichtigte Hinzuziehung oder Ersetzung eines Unterauftragnehmers mindestens [z. B. 4] Wochen im Voraus. Der Verantwortliche kann innerhalb von [z. B. 2] Wochen nach Zugang der Information aus wichtigem datenschutzrechtlichem Grund widersprechen. Können sich die Parteien nicht einigen, kann der Verantwortliche den Hauptvertrag und diesen Vertrag außerordentlich kündigen.
(3) Der Auftragsverarbeiter legt dem Unterauftragnehmer vertraglich dieselben Datenschutzpflichten auf, die in diesem Vertrag festgelegt sind, insbesondere hinreichende Garantien für geeignete technische und organisatorische Maßnahmen (Art. 28 Abs. 4 DSGVO). Kommt der Unterauftragnehmer seinen Pflichten nicht nach, haftet der Auftragsverarbeiter gegenüber dem Verantwortlichen für die Einhaltung der Pflichten des Unterauftragnehmers.
(4) Nebenleistungen, die der Auftragsverarbeiter bei Dritten in Anspruch nimmt (z. B. Telekommunikation, Post, Reinigung, Wartung ohne Datenzugriff), sind keine Unterauftragsverhältnisse im Sinne dieses Vertrags. Der Auftragsverarbeiter sorgt auch hier durch geeignete Vereinbarungen und Kontrollen für den Schutz der Daten.

§ 7 Verarbeitung in Drittländern
(1) Eine Verarbeitung außerhalb der EU bzw. des EWR, auch durch Unterauftragnehmer, erfolgt nur, wenn die Voraussetzungen der Art. 44 ff. DSGVO erfüllt sind, insbesondere durch
   a) einen Angemessenheitsbeschluss der Europäischen Kommission (Art. 45 DSGVO), z. B. das EU-US Data Privacy Framework für zertifizierte US-Unternehmen, oder
   b) Standardvertragsklauseln der Europäischen Kommission (Durchführungsbeschluss (EU) 2021/914) einschließlich eines dokumentierten Transfer Impact Assessments und erforderlicher zusätzlicher Maßnahmen, oder
   c) verbindliche interne Datenschutzvorschriften (Art. 47 DSGVO).
(2) Der Auftragsverarbeiter weist die Grundlage je Drittlandtransfer in Anlage 3 aus.

§ 8 Unterstützung bei Betroffenenrechten und Datenpannen
(1) Der Auftragsverarbeiter unterstützt den Verantwortlichen mit geeigneten technischen und organisatorischen Maßnahmen dabei, Anfragen betroffener Personen nach Art. 12 bis 22 DSGVO (Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch) zu beantworten. Wendet sich eine betroffene Person unmittelbar an den Auftragsverarbeiter, leitet er das Anliegen unverzüglich an den Verantwortlichen weiter und beantwortet es nicht selbst, soweit er nicht dazu angewiesen wurde.
(2) Der Auftragsverarbeiter meldet dem Verantwortlichen jede Verletzung des Schutzes personenbezogener Daten unverzüglich, spätestens innerhalb von [z. B. 24] Stunden nach Bekanntwerden (Art. 33 Abs. 2 DSGVO). Die Meldung enthält mindestens die Art der Verletzung, die betroffenen Datenkategorien und die ungefähre Zahl der Betroffenen, die wahrscheinlichen Folgen und die ergriffenen oder vorgeschlagenen Maßnahmen. Der Auftragsverarbeiter unterstützt den Verantwortlichen bei der Meldung an die Aufsichtsbehörde und der Benachrichtigung der Betroffenen.
(3) Der Auftragsverarbeiter informiert den Verantwortlichen unverzüglich über Kontrollhandlungen und Maßnahmen der Aufsichtsbehörde, soweit sie die Verarbeitung nach diesem Vertrag betreffen.

§ 9 Kontrollrechte und Nachweise
(1) Der Auftragsverarbeiter stellt dem Verantwortlichen alle erforderlichen Informationen zum Nachweis der Einhaltung der Pflichten nach Art. 28 DSGVO zur Verfügung.
(2) Der Verantwortliche ist berechtigt, die Einhaltung dieses Vertrags zu überprüfen, auch durch Inspektionen in den Geschäftsräumen des Auftragsverarbeiters während der üblichen Geschäftszeiten. Inspektionen werden mit angemessener Frist von mindestens [z. B. 14] Tagen angekündigt, bei Verdacht auf eine Datenschutzverletzung auch kurzfristiger.
(3) Der Nachweis kann auch durch aktuelle Zertifizierungen, Prüfberichte unabhängiger Prüfer (z. B. ISO/IEC 27001, SOC 2) oder eine geeignete Selbstauskunft erbracht werden, soweit sie die Verarbeitung nach diesem Vertrag abdecken.
(4) Der Auftragsverarbeiter darf für Inspektionen, die über [z. B. eine] Inspektion pro Kalenderjahr hinausgehen und nicht durch einen konkreten Anlass veranlasst sind, eine angemessene Vergütung verlangen.

§ 10 Löschung und Rückgabe nach Vertragsende
(1) Nach Abschluss der Leistungen löscht der Auftragsverarbeiter alle personenbezogenen Daten oder gibt sie nach Wahl des Verantwortlichen in einem gängigen Format zurück und löscht vorhandene Kopien, sofern nicht nach dem Recht der Union oder eines Mitgliedstaats eine Pflicht zur Speicherung besteht.
(2) Die Löschung bzw. Rückgabe erfolgt innerhalb von [z. B. 30] Tagen nach Beendigung des Hauptvertrags. Der Auftragsverarbeiter bestätigt die Löschung in Textform. Dokumentationen, die dem Nachweis der ordnungsgemäßen Verarbeitung dienen, darf der Auftragsverarbeiter nach den gesetzlichen Aufbewahrungsfristen weiter aufbewahren.

§ 11 Haftung und Schlussbestimmungen
(1) Die Haftung der Parteien richtet sich nach Art. 82 DSGVO. Im Innenverhältnis haften die Parteien entsprechend ihrem Anteil an der Verantwortung für den Schaden. Der Auftragsverarbeiter stellt den Verantwortlichen von Ansprüchen frei, die darauf beruhen, dass der Auftragsverarbeiter seine Pflichten aus diesem Vertrag oder aus der DSGVO verletzt oder gegen Weisungen verstoßen hat.
(2) Bei Widersprüchen zwischen diesem Vertrag und dem Hauptvertrag gehen die Regelungen dieses Vertrags vor, soweit sie den Datenschutz betreffen.
(3) Änderungen und Ergänzungen bedürfen der Schriftform; ein elektronisches Format (Art. 28 Abs. 9 DSGVO) genügt. Sollte eine Bestimmung unwirksam sein, bleibt der Vertrag im Übrigen wirksam.
(4) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit zulässig, [Ort].

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Verantwortlichen


______________________________
[Vorname Nachname], für den Auftragsverarbeiter


Anlage 1 – Beschreibung der Verarbeitung
1. Gegenstand und Zweck: [z. B. „Lagerung, Kommissionierung und Versand von Bestellungen des Online-Shops [Shopname] einschließlich Retourenbearbeitung“]
2. Art der Verarbeitung: [z. B. „Erheben, Speichern, Übermitteln an Versanddienstleister, Löschen“]
3. Kategorien personenbezogener Daten: [z. B. „Name, Lieferadresse, Rechnungsadresse, E-Mail-Adresse, Telefonnummer, Bestellnummer, Bestellinhalt“]
4. Kategorien betroffener Personen: [z. B. „Kunden des Verantwortlichen, Empfänger von Geschenksendungen“]
5. Ort der Verarbeitung: [z. B. „Lager in [Ort], Deutschland; Rechenzentrum in [Ort], Deutschland“]
6. Dauer / Löschfristen: [z. B. „Bestelldaten werden 90 Tage nach Abschluss der Lieferung im System des Auftragsverarbeiters gelöscht, soweit keine Retoure offen ist“]

Anlage 2 – Technische und organisatorische Maßnahmen (Art. 32 DSGVO)
1. Vertraulichkeit
   a) Zutrittskontrolle: [z. B. „Schließsystem mit personalisierten Transpondern, Besucherprotokoll, Alarmanlage“]
   b) Zugangskontrolle: [z. B. „Personalisierte Benutzerkonten, Passwortrichtlinie, Zwei-Faktor-Authentifizierung, automatische Bildschirmsperre“]
   c) Zugriffskontrolle: [z. B. „Rollen- und Rechtekonzept, Protokollierung von Zugriffen, Freigabe durch Vorgesetzte“]
   d) Trennungskontrolle: [z. B. „Mandantentrennung, getrennte Test- und Produktivsysteme“]
   e) Pseudonymisierung / Verschlüsselung: [z. B. „Verschlüsselung der Datenträger, TLS-Transportverschlüsselung, verschlüsselte Backups“]
2. Integrität
   a) Weitergabekontrolle: [z. B. „Verschlüsselte Übertragung, VPN, Protokollierung von Exporten“]
   b) Eingabekontrolle: [z. B. „Protokollierung von Eingabe, Änderung und Löschung mit Benutzerkennung“]
3. Verfügbarkeit und Belastbarkeit
   [z. B. „Tägliche Backups mit räumlich getrennter Aufbewahrung, USV, Brandschutz, Notfallplan, regelmäßige Wiederherstellungstests“]
4. Verfahren zur regelmäßigen Überprüfung, Bewertung und Evaluierung
   [z. B. „Datenschutz-Management, jährliche Schulung der Mitarbeiter, Incident-Response-Prozess, Auftragskontrolle gegenüber Unterauftragnehmern“]

Anlage 3 – Genehmigte Unterauftragnehmer
1. [Firma, Anschrift] – Leistung: [z. B. „Hosting“] – Ort der Verarbeitung: [Land] – Grundlage bei Drittland: [z. B. „EU-US Data Privacy Framework, zertifiziert seit [Datum]“ / „Standardvertragsklauseln vom [Datum]“ / „entfällt (EU)“]
2. [Firma, Anschrift] – Leistung: [z. B. „Versand“] – Ort der Verarbeitung: [Land] – Grundlage bei Drittland: [entfällt / …]
3. [ggf. weitere]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "dropshipping-vertrag",
    titel: "Dropshipping-Vertrag",
    kurz: "Vertrag zwischen Shop-Betreiber und Dropshipping-Lieferanten: Bestellübermittlung, Versand im Namen des Händlers, Retouren, Produktsicherheit (GPSR, CE) und Daten.",
    kategorie: "ecommerce",
    dateiname: "Dropshipping-Vertrag",
    wofuer: [
      "Du betreibst einen Shop und lässt einen Hersteller oder Großhändler direkt an deine Kunden liefern",
      "Du bist Lieferant und willst Händlern ein klares Dropshipping-Angebot machen",
      "Wenn bisher nur die AGB des Lieferanten gelten und Retouren, Lieferzeiten und Haftung ungeregelt sind",
      "Als Grundlage für Lieferanten aus der EU; bei Drittlandlieferanten sind Zoll und Importeurspflichten zu ergänzen",
    ],
    enthaelt: [
      "§ 1 Gegenstand und Rollen der Parteien",
      "§ 2 Produkte, Sortiment und Produktdaten",
      "§ 3 Einkaufspreise, Versandkosten, Zahlung",
      "§ 4 Bestellübermittlung und Bestandsdaten",
      "§ 5 Versand im Namen des Händlers (neutraler Versand)",
      "§ 6 Lieferzeiten und Lieferverzug",
      "§ 7 Retouren, Widerruf des Endkunden, Gewährleistung",
      "§ 8 Produktsicherheit, Konformität und Produkthaftung (GPSR, CE)",
      "§ 9 Datenschutz und Kundendaten",
      "§ 10 Marken, Geheimhaltung, Wettbewerb",
      "§ 11 Laufzeit und Kündigung",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Gegenüber dem Endkunden bist immer du der Verkäufer, nicht der Lieferant. Widerruf, Gewährleistung und Lieferverzug treffen dich; der Vertrag regelt nur, was du beim Lieferanten zurückholen kannst.",
      "Seit der GPSR (Verordnung (EU) 2023/988, ab 13.12.2024) musst du im Online-Angebot Hersteller mit Anschrift und E-Mail, ggf. die verantwortliche Person in der EU und Sicherheitshinweise nennen. Kann der Lieferant diese Daten nicht liefern, darfst du das Produkt nicht anbieten.",
      "Liefert der Lieferant aus einem Drittland (z. B. China) direkt an deine Kunden, wirst du in der Regel selbst Importeur mit allen Pflichten (Produkthaftung nach § 4 Abs. 2 ProdHaftG, Konformität, Verpackungsregistrierung bei LUCID, ElektroG). Die Vorlage setzt einen EU-Lieferanten voraus.",
      "Umsatzsteuerlich ist Dropshipping ein Reihengeschäft. Wer bei Lieferungen ins EU-Ausland die bewegte Lieferung hat und wo du dich registrieren musst (OSS), klärst du mit dem Steuerberater, bevor du den ersten Auslandsauftrag annimmst.",
      "Jede Lieferzeit, die du im Shop versprichst, muss der Lieferant vertraglich einhalten. Vereinbare Bestandsdaten in Echtzeit oder tägliche Abgleiche, sonst verkaufst du Ware, die es nicht gibt.",
    ],
    faqs: [
      {
        q: "Wer haftet, wenn ein per Dropshipping geliefertes Produkt mangelhaft ist?",
        a: "Gegenüber dem Kunden du als Verkäufer, mit allen gesetzlichen Gewährleistungsrechten. Du kannst beim Lieferanten Rückgriff nehmen; die Vorlage regelt das in § 7 inklusive Fristen und Kostenerstattung. Für Produktschäden nach dem Produkthaftungsgesetz haftet der Hersteller oder Importeur, bei Drittlandware also oft du.",
      },
      {
        q: "Darf der Lieferant Rechnung und Lieferschein mit seinem Namen beilegen?",
        a: "Das solltest du vertraglich ausschließen. § 5 der Vorlage regelt den neutralen Versand: Lieferschein und Rechnung in deinem Namen, keine Werbung des Lieferanten, dein Absender auf dem Paket. Sonst wenden sich Kunden an den Lieferanten oder bestellen beim nächsten Mal direkt dort.",
      },
      {
        q: "Was muss ich wegen der GPSR im Shop angeben?",
        a: "Für jedes Produkt den Namen, die Postanschrift und eine E-Mail-Adresse des Herstellers, bei Herstellern außerhalb der EU zusätzlich die verantwortliche Person in der EU, eine Produktkennung sowie Warn- und Sicherheitshinweise in deutscher Sprache. Der Vertrag verpflichtet den Lieferanten, diese Daten vollständig und aktuell bereitzustellen.",
      },
      {
        q: "Brauche ich mit dem Dropshipping-Lieferanten einen Auftragsverarbeitungsvertrag?",
        a: "Der Lieferant erhält Name und Adresse deiner Kunden. Ob er Auftragsverarbeiter oder eigenständig Verantwortlicher ist, hängt davon ab, wie weisungsgebunden er handelt. Die Vorlage sieht vorsorglich einen AVV als Anlage vor und verpflichtet den Lieferanten, die Daten nur für die Lieferung zu nutzen. In der Datenschutzerklärung deines Shops musst du die Weitergabe nennen.",
      },
    ],
    seo: {
      title: "Dropshipping-Vertrag Vorlage 2026 kostenlos | GründerX",
      description:
        "Dropshipping-Vertrag zwischen Shop und Lieferant als kostenlose Vorlage: Bestellübermittlung, neutraler Versand, Lieferzeiten, Retouren, GPSR, Haftung, Daten.",
    },
    stand: "2026-10",
    text: `Dropshipping-Vertrag

zwischen

[Firma des Händlers], [Straße Hausnummer], [PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Händler“ –

und

[Firma des Lieferanten], [Straße Hausnummer], [PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Lieferant“ –

– gemeinsam „die Parteien“ –

§ 1 Gegenstand und Rollen der Parteien
(1) Der Händler betreibt den Online-Shop [Shopname] unter [www.domain.de] [sowie Verkaufskanäle auf [Marktplätze]] und verkauft dort im eigenen Namen und auf eigene Rechnung Waren an Endkunden.
(2) Der Lieferant hält die in § 2 bezeichneten Produkte vorrätig und versendet sie auf Bestellung des Händlers unmittelbar an die vom Händler benannten Endkunden (Streckengeschäft / Dropshipping).
(3) Zwischen Lieferant und Endkunde entsteht kein Vertragsverhältnis. Der Händler bleibt gegenüber dem Endkunden alleiniger Verkäufer und Ansprechpartner. Der Lieferant tritt gegenüber dem Endkunden nicht in Erscheinung, soweit dieser Vertrag nichts anderes bestimmt.
(4) Der Händler kauft die Produkte mit jeder Bestellung vom Lieferanten; es gilt Kaufrecht. Der Händler ist nicht verpflichtet, Mindestmengen abzunehmen [Alternative: Der Händler verpflichtet sich zu einem Mindestumsatz von [Betrag] EUR netto pro [Quartal / Jahr]].

§ 2 Produkte, Sortiment und Produktdaten
(1) Gegenstand sind die in Anlage 1 aufgeführten Produkte (nachfolgend „Produkte“). Der Lieferant kann die Liste mit einer Ankündigungsfrist von [z. B. 4] Wochen ändern; auslaufende Produkte sind mindestens [z. B. 8] Wochen vorher anzukündigen.
(2) Der Lieferant stellt dem Händler für jedes Produkt folgende Daten zur Verfügung und hält sie aktuell: Artikelnummer, EAN/GTIN, Bezeichnung, Beschreibung, technische Daten, Maße und Gewicht, Produktbilder in ausreichender Auflösung, Hersteller mit Anschrift und E-Mail-Adresse, ggf. verantwortliche Person in der EU, Warn- und Sicherheitshinweise in deutscher Sprache sowie alle Kennzeichnungen, die für das Inverkehrbringen in Deutschland erforderlich sind.
(3) Der Lieferant räumt dem Händler das nicht ausschließliche, auf die Vertragslaufzeit beschränkte Recht ein, die überlassenen Produktbilder, Texte und Marken zur Bewerbung und zum Verkauf der Produkte in den in § 1 genannten Kanälen zu nutzen. Der Lieferant versichert, hierzu berechtigt zu sein, und stellt den Händler von Ansprüchen Dritter wegen der Nutzung des überlassenen Materials frei.
(4) Produktdaten werden [per CSV-Feed unter [URL] / über die Schnittstelle [Bezeichnung] / per E-Mail] bereitgestellt und mindestens [täglich / wöchentlich] aktualisiert.

§ 3 Einkaufspreise, Versandkosten, Zahlung
(1) Die Einkaufspreise des Händlers ergeben sich aus der Preisliste in Anlage 1 (Nettopreise zuzüglich Umsatzsteuer). Preisänderungen kündigt der Lieferant mindestens [z. B. 30] Tage im Voraus in Textform an; für bereits übermittelte Bestellungen gilt der alte Preis.
(2) Für den Versand an den Endkunden berechnet der Lieferant pauschal [Betrag] EUR netto je Sendung innerhalb Deutschlands [und [Betrag] EUR netto je Sendung in die Länder [Länderliste]]. Verpackung und Handling sind damit abgegolten.
(3) Der Lieferant stellt dem Händler [je Bestellung / wöchentlich gesammelt / monatlich gesammelt] eine Rechnung mit allen Pflichtangaben nach § 14 UStG. Die Rechnung ist innerhalb von [z. B. 14] Tagen ohne Abzug fällig. [Alternative: Zahlung per Vorkasse vor Versand / Lastschrift mit SEPA-Mandat.]
(4) Der Händler legt seine Verkaufspreise gegenüber den Endkunden frei fest. Unverbindliche Preisempfehlungen des Lieferanten sind nicht bindend.

§ 4 Bestellübermittlung und Bestandsdaten
(1) Der Händler übermittelt Bestellungen [automatisch über die Schnittstelle [Bezeichnung] / per E-Mail an [E-Mail-Adresse] / über das Händlerportal unter [URL]] mit folgenden Angaben: Bestellnummer des Händlers, Artikelnummer, Menge, Name und Lieferadresse des Endkunden, ggf. Telefonnummer oder E-Mail-Adresse für die Sendungsbenachrichtigung.
(2) Der Lieferant bestätigt den Eingang jeder Bestellung innerhalb von [z. B. 4] Stunden an Werktagen und meldet unverzüglich, wenn ein Produkt nicht lieferbar ist.
(3) Der Lieferant stellt dem Händler aktuelle Bestandsdaten [in Echtzeit über die Schnittstelle / mindestens [zweimal] täglich] zur Verfügung. Zeigt der Bestand eine Verfügbarkeit an, darf der Händler die Lieferzeit nach § 6 gegenüber dem Endkunden zusagen.
(4) Bestellungen, die bis [Uhrzeit] Uhr an einem Werktag eingehen, werden am selben Werktag versendet; später eingehende am folgenden Werktag.

§ 5 Versand im Namen des Händlers (neutraler Versand)
(1) Der Lieferant versendet die Produkte als Absender „[Firma des Händlers], [Anschrift des Händlers]“ ausschließlich in neutraler Verpackung ohne eigene Firmenangaben, Werbung, Beilagen oder Preisangaben des Lieferanten.
(2) Der Sendung wird ein Lieferschein im Layout des Händlers beigelegt, den der Lieferant [aus der Schnittstelle erzeugt / vom Händler als PDF erhält]. Rechnungen an den Endkunden stellt ausschließlich der Händler.
(3) Der Lieferant übermittelt dem Händler für jede Sendung spätestens am Versandtag die Sendungsnummer und den Versanddienstleister. Der Händler informiert den Endkunden.
(4) Als Retourenadresse gegenüber dem Endkunden wird [die Anschrift des Lieferanten / die Anschrift des Händlers] verwendet.
(5) Der Lieferant setzt die Versanddienstleister [DHL / DPD / GLS / Hermes / UPS] ein und verpackt die Produkte transportsicher. Der Lieferant trägt die Gefahr bis zur Übergabe an den Versanddienstleister; im Verhältnis zum Endkunden gilt § 475 Abs. 2 BGB, sodass der Händler Transportschäden gegenüber dem Endkunden trägt und beim Lieferanten Rückgriff nimmt, soweit die Verpackung oder die Übergabe an den Versanddienstleister mangelhaft war.

§ 6 Lieferzeiten und Lieferverzug
(1) Die Lieferzeit bis zur Zustellung beim Endkunden beträgt bei lieferbaren Produkten innerhalb Deutschlands [z. B. 2 bis 4] Werktage ab Übermittlung der Bestellung. Der Händler darf diese Lieferzeit gegenüber Endkunden ausweisen.
(2) Kann der Lieferant die Lieferzeit nicht einhalten, informiert er den Händler unverzüglich unter Angabe des neuen Liefertermins. Der Händler kann die Bestellung dann stornieren, ohne dass Kosten anfallen.
(3) Überschreitet der Lieferant die Lieferzeit bei mehr als [z. B. 5] % der Bestellungen eines Kalendermonats, kann der Händler nach erfolgloser Abmahnung diesen Vertrag außerordentlich kündigen. Weitergehende Ansprüche, insbesondere Ersatz von Erstattungen, die der Händler Endkunden wegen Lieferverzugs leisten muss, bleiben unberührt.

§ 7 Retouren, Widerruf des Endkunden, Gewährleistung
(1) Widerruft ein Endkunde innerhalb der gesetzlichen Frist, nimmt der Lieferant die Ware an der in § 5 Abs. 4 genannten Adresse zurück. Der Händler erhält für unbeschädigte, vollständige Ware eine Gutschrift in Höhe des Einkaufspreises [abzüglich einer Bearbeitungspauschale von [Betrag] EUR netto]. Die Versandkosten der Hinsendung werden [nicht / zur Hälfte / vollständig] erstattet.
(2) Bei mangelhafter Ware (§§ 434 ff. BGB) steht dem Händler das gesetzliche Gewährleistungsrecht zu. Der Lieferant liefert auf Wunsch des Händlers innerhalb von [z. B. 3] Werktagen kostenfrei Ersatz an den Endkunden oder erstattet den Einkaufspreis. Die Kosten der Rücksendung und der Ersatzlieferung trägt der Lieferant. Der Händler kann zudem die Kosten ersetzt verlangen, die ihm gegenüber dem Endkunden aus der Nacherfüllung entstehen (§ 445a BGB).
(3) Die Rügepflicht nach § 377 HGB gilt mit der Maßgabe, dass der Händler die Ware nicht selbst in Augenschein nimmt. Eine Mängelrüge ist rechtzeitig, wenn der Händler den Mangel innerhalb von [z. B. 5] Werktagen nach Mitteilung des Endkunden an den Lieferanten weiterleitet.
(4) Die Verjährungsfrist für Gewährleistungsansprüche des Händlers gegen den Lieferanten beträgt zwei Jahre ab Ablieferung beim Endkunden; der Ablauf ist gehemmt, solange der Händler gegenüber dem Endkunden in Anspruch genommen wird (§ 445b BGB).
(5) Der Lieferant bearbeitet Retouren innerhalb von [z. B. 5] Werktagen nach Eingang und meldet dem Händler Eingang, Zustand und Gutschrift in Textform.

§ 8 Produktsicherheit, Konformität und Produkthaftung
(1) Der Lieferant gewährleistet, dass alle Produkte den in Deutschland und der EU geltenden Vorschriften entsprechen, insbesondere der Verordnung (EU) 2023/988 über die allgemeine Produktsicherheit (GPSR), dem Produktsicherheitsgesetz, den anwendbaren CE-Richtlinien und -Verordnungen (z. B. Niederspannungs-, EMV-, Spielzeug-, Funkanlagen-Richtlinie), der REACH-Verordnung, dem Elektro- und Elektronikgerätegesetz, dem Batteriegesetz, der Lebensmittel- bzw. Kosmetikverordnung sowie den Kennzeichnungs- und Textilkennzeichnungsvorschriften, soweit einschlägig.
(2) Der Lieferant stellt dem Händler auf Anforderung innerhalb von [z. B. 5] Werktagen Konformitätserklärungen, Prüfberichte, Sicherheitsdatenblätter und die Angaben zum Hersteller bzw. zur verantwortlichen Person nach Art. 16 GPSR zur Verfügung. Fehlen diese Unterlagen, darf der Händler das Produkt aus dem Sortiment nehmen und bereits übermittelte Bestellungen stornieren.
(3) Der Lieferant ist für die Registrierung nach dem Verpackungsgesetz (LUCID) und die Systembeteiligung für Versand- und Produktverpackungen verantwortlich, die er in Verkehr bringt; er weist die Registrierungsnummer in Anlage 1 aus. [Alternative: Der Händler ist registriert und übernimmt die Systembeteiligung für Versandverpackungen; der Lieferant meldet ihm monatlich die Verpackungsmengen.]
(4) Der Lieferant informiert den Händler unverzüglich über Rückrufe, Sicherheitswarnungen, behördliche Maßnahmen und ihm bekannt werdende Unfälle mit den Produkten. Rückrufe wickelt der Lieferant auf eigene Kosten ab; der Händler unterstützt bei der Information der Endkunden.
(5) Der Lieferant stellt den Händler von allen Ansprüchen Dritter frei, die auf einem Verstoß der Produkte gegen Absatz 1, auf Produktfehlern im Sinne des Produkthaftungsgesetzes oder auf Verletzung von Schutzrechten Dritter beruhen, einschließlich angemessener Rechtsverfolgungskosten. Der Lieferant unterhält eine Produkthaftpflichtversicherung mit einer Deckungssumme von mindestens [Betrag] EUR je Schadensfall und weist diese auf Anforderung nach.

§ 9 Datenschutz und Kundendaten
(1) Der Lieferant verarbeitet die vom Händler übermittelten Daten der Endkunden ausschließlich zur Ausführung der Lieferung und zur Retourenabwicklung. Jede andere Nutzung, insbesondere zu Werbezwecken, zum Aufbau eigener Kundenbeziehungen oder zur Weitergabe an Dritte außerhalb der Versandabwicklung, ist untersagt.
(2) Die Parteien schließen den als Anlage 2 beigefügten Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO. Der Lieferant löscht Endkundendaten spätestens [z. B. 90] Tage nach Abschluss der Lieferung bzw. der Retoure, soweit keine gesetzlichen Aufbewahrungspflichten bestehen.
(3) Die Kundenbeziehung und alle Kundendaten stehen allein dem Händler zu. Der Lieferant wird Endkunden, die sich an ihn wenden, an den Händler verweisen.

§ 10 Marken, Geheimhaltung, Wettbewerb
(1) Der Lieferant darf die Marken und das Logo des Händlers nur zur Erstellung der Lieferscheine und Versandverpackungen nach § 5 verwenden. Der Händler darf die Marken des Lieferanten und der Hersteller nur zur Bewerbung der Produkte im Rahmen dieses Vertrags verwenden.
(2) Die Parteien behandeln alle Informationen über Konditionen, Umsätze, Kundendaten und Geschäftsabläufe der anderen Partei vertraulich, auch nach Vertragsende, mindestens für [z. B. 3] Jahre.
(3) Der Lieferant verpflichtet sich, Endkunden des Händlers nicht gezielt direkt anzusprechen. Ein darüber hinausgehendes Wettbewerbsverbot besteht nicht; der Lieferant darf weitere Händler beliefern [Alternative bei Exklusivität: Der Lieferant beliefert im Gebiet [Deutschland] für die Dauer dieses Vertrags keine weiteren Online-Händler mit den Produkten der Anlage 1, sofern der Händler den Mindestumsatz nach § 1 Abs. 4 erreicht].

§ 11 Laufzeit und Kündigung
(1) Der Vertrag beginnt am [Datum] und läuft auf unbestimmte Zeit. Er kann von jeder Partei mit einer Frist von [z. B. 3] Monaten zum Monatsende in Textform gekündigt werden, erstmals zum [Datum].
(2) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Ein wichtiger Grund liegt für den Händler insbesondere vor, wenn der Lieferant wiederholt gegen § 5, § 8 oder § 9 verstößt; für den Lieferanten insbesondere, wenn der Händler mit mehr als [z. B. zwei] Rechnungen in Verzug ist.
(3) Nach Vertragsende werden bereits übermittelte Bestellungen noch ausgeführt, offene Retouren nach § 7 abgewickelt und die Nutzungsrechte nach § 2 Abs. 3 enden; der Händler entfernt die Produkte innerhalb von [z. B. 14] Tagen aus seinen Kanälen.

§ 12 Schlussbestimmungen
(1) Allgemeine Geschäftsbedingungen des Lieferanten gelten nur, soweit sie diesem Vertrag nicht widersprechen; bei Widersprüchen geht dieser Vertrag vor.
(2) Änderungen und Ergänzungen bedürfen der Textform. Mündliche Nebenabreden bestehen nicht.
(3) Sollte eine Bestimmung unwirksam sein, bleibt der Vertrag im Übrigen wirksam; die Parteien ersetzen die unwirksame Bestimmung durch eine wirksame, die dem wirtschaftlichen Zweck am nächsten kommt.
(4) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist [Ort], sofern beide Parteien Kaufleute sind.
(5) Anlagen: Anlage 1 (Produkt- und Preisliste, Verpackungsregistrierung), Anlage 2 (Auftragsverarbeitungsvertrag).

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Händler


______________________________
[Vorname Nachname], für den Lieferanten

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "lieferantenanfrage-grosshandel",
    titel: "Lieferantenanfrage an Hersteller / Großhändler",
    kurz: "Anschreiben für ein Händlerkonto bei Hersteller oder Großhändler: Firmenvorstellung, Gewerbenachweis, Mengen und die richtigen Fragen zu Preisliste, MOQ, Lieferzeiten und Rückgabe.",
    kategorie: "ecommerce",
    dateiname: "Lieferantenanfrage-Grosshandel",
    wofuer: [
      "Du willst als Online-Händler erstmals direkt beim Hersteller oder Großhändler einkaufen",
      "Eröffnung eines Händlerkontos (B2B-Zugang, Preisliste) bei einer Marke",
      "Anfrage für Konditionen, Staffelpreise, Dropshipping oder Gebietsschutz",
      "Als Nachfassvorlage, wenn eine erste Anfrage unbeantwortet blieb",
    ],
    enthaelt: [
      "Betreff und Ansprache mit Bezug zur Marke",
      "Kurze Vorstellung des eigenen Unternehmens und der Verkaufskanäle",
      "Nachweise: Gewerbeanmeldung, USt-IdNr., Handelsregister, Shop-Link",
      "Geplante Mengen und Sortiment",
      "Fragenkatalog: Preisliste, Staffelpreise, MOQ, Lieferzeiten, Zahlungsbedingungen",
      "Fragen zu Exklusivität, Gebietsschutz, Rückgabe, Produktdaten, Konformität",
      "Bitte um Händlerkonto, Ansprechpartner und nächste Schritte",
      "Anlagenverzeichnis",
    ],
    hinweise: [
      "Hersteller prüfen zuerst, ob du ein echtes Unternehmen bist. Ohne Gewerbeanmeldung, USt-IdNr. und einen besuchbaren Shop oder ein Konzept bekommst du in der Regel keine Antwort. Lege die Nachweise direkt bei.",
      "Nenne realistische Mengen. Wer 10.000 Stück ankündigt und dann 20 bestellt, verbrennt den Kontakt. Besser eine ehrliche Startmenge und ein Ausblick auf das erste Jahr.",
      "Frage nach Konformitätsunterlagen (CE, GPSR-Herstellerangaben, Sicherheitsdatenblätter) und Produktdaten (EAN, Bilder, Feeds). Ohne diese Daten kannst du die Ware rechtlich nicht anbieten.",
      "Marken mit selektivem Vertrieb dürfen Online-Händler ablehnen oder Anforderungen an die Präsentation stellen. Ein Nein ist dann rechtlich zulässig; frage nach den Kriterien und erfülle sie.",
    ],
    faqs: [
      {
        q: "Welche Unterlagen verlangen Großhändler für ein Händlerkonto?",
        a: "Üblich sind Gewerbeanmeldung oder Handelsregisterauszug, USt-IdNr., Impressum oder Link zum Shop, bei reglementierten Waren (Elektro, Kosmetik, Lebensmittel) teils weitere Nachweise. Manche verlangen eine Erstbestellung per Vorkasse. Je vollständiger die Anfrage, desto schneller die Freischaltung.",
      },
      {
        q: "Was ist eine MOQ und wie verhandle ich sie?",
        a: "MOQ ist die Mindestbestellmenge (Minimum Order Quantity) je Artikel oder je Bestellung. Frage nach der MOQ pro Artikel und pro Auftrag sowie nach Mischpaletten. Oft lässt sich eine geringere Startmenge gegen Vorkasse oder einen höheren Preis vereinbaren.",
      },
      {
        q: "Soll ich im ersten Anschreiben schon nach Exklusivität fragen?",
        a: "Kurz und ohne Druck, ja. Die Frage zeigt, dass du strategisch denkst. Erwarte aber kein Ja ohne Umsatzgeschichte. Realistischer sind Gebietsschutz für einzelne Kanäle oder zeitlich befristete Exklusivität bei Neuheiten gegen eine Abnahmeverpflichtung.",
      },
      {
        q: "Wie fasse ich nach, wenn keine Antwort kommt?",
        a: "Nach 7 bis 10 Werktagen einmal freundlich per E-Mail mit Bezug auf die Erstanfrage, danach ein Anruf beim Vertrieb. Frage nach dem richtigen Ansprechpartner für Neukunden im Online-Handel. Bleibt auch das ohne Reaktion, sind Distributoren oder Großhändler der Marke der nächste Weg.",
      },
    ],
    seo: {
      title: "Lieferantenanfrage Vorlage für Händlerkonto 2026 | GründerX",
      description:
        "Anschreiben an Hersteller und Großhändler für Händlerkonto und Konditionen: Firmenvorstellung, Nachweise, Fragen zu Preisliste, MOQ, Lieferzeit, Exklusivität.",
    },
    stand: "2026-10",
    text: `Anfrage Händlerkonto und Konditionen

[Firma des Händlers]
[Vorname Nachname]
[Straße Hausnummer]
[PLZ Ort]
Telefon: [Telefonnummer]
E-Mail: [E-Mail-Adresse]
Web: [www.domain.de]

[Firma des Herstellers / Großhändlers]
[Abteilung, z. B. „Vertrieb Handel / B2B“]
[ggf. Vorname Nachname]
[Straße Hausnummer]
[PLZ Ort]

[Ort], [Datum]

Anfrage: Eröffnung eines Händlerkontos für [Marke / Produktgruppe] und Konditionen für den Online-Handel

Sehr geehrte Damen und Herren, [bei bekanntem Ansprechpartner: Sehr geehrte Frau [Nachname], / Sehr geehrter Herr [Nachname],]

wir betreiben seit [Monat Jahr] den Online-Shop [Shopname] ([www.domain.de]) mit dem Schwerpunkt [Sortiment, z. B. „Outdoor-Ausrüstung und Campingzubehör“]. Unsere Kunden sind überwiegend [Zielgruppe, z. B. „Privatkunden in Deutschland und Österreich, 25 bis 45 Jahre“]. Wir verkaufen über [eigener Shop / Amazon / eBay / Kaufland / Otto] und erreichen derzeit [z. B. rund 1.500] Bestellungen pro Monat [Alternative bei Neustart: Der Shop startet am [Datum]; das Sortiment steht, die Lieferantenbasis bauen wir gerade auf].

Ihre Produkte [Produktlinie / Marke] passen aus unserer Sicht sehr gut zu unserem Sortiment, weil [Begründung, z. B. „unsere Kunden regelmäßig nach [Produkt] fragen und wir diese Nachfrage bisher nicht bedienen können“]. Wir möchten Ihre Produkte daher dauerhaft in unser Sortiment aufnehmen und bitten um die Eröffnung eines Händlerkontos.

Unser Unternehmen

Firma: [Firma, Rechtsform]
Inhaber / Geschäftsführung: [Vorname Nachname]
Anschrift: [Straße Hausnummer, PLZ Ort]
Gewerbeanmeldung: [Stadt], vom [Datum] (Kopie anbei)
[Handelsregister: Amtsgericht [Ort], HRB [Nummer]]
USt-IdNr.: DE[Nummer]
Verkaufskanäle: [www.domain.de], [Marktplatz-Shopname]
[Optional: Ladengeschäft in [Ort], [Fläche] m²]

Geplante Abnahme

Für den Start planen wir eine Erstbestellung von etwa [Menge] Stück aus den Artikeln [Artikelbezeichnungen / Artikelnummern] im Wert von rund [Betrag] EUR netto. Bei entsprechender Nachfrage rechnen wir im ersten Jahr mit einem Einkaufsvolumen von etwa [Betrag] EUR netto. Wir lagern selbst in [Ort] [Alternative: Wir arbeiten mit dem Fulfillment-Dienstleister [Name]].

Unsere Fragen

1. Händlerkonto: Welche Unterlagen benötigen Sie für die Freischaltung, und gibt es ein B2B-Portal mit Bestandsanzeige und Online-Bestellung?
2. Preisliste und Rabatte: Können Sie uns Ihre aktuelle Händlerpreisliste zusenden? Welche Staffelpreise oder Jahresboni gibt es ab welchen Mengen?
3. Mindestbestellmenge (MOQ): Welche Mindestmengen gelten je Artikel und je Auftrag? Sind Mischpaletten oder Mischkartons möglich?
4. Lieferzeiten: Wie lang ist die Lieferzeit ab Bestellung bei Lagerware, und wie werden Nachlieferungen bei Fehlbeständen gehandhabt?
5. Versand und Frachtkosten: Ab welchem Bestellwert liefern Sie frachtfrei? Welche Frachtkosten fallen darunter an?
6. Zahlungsbedingungen: Welche Zahlungsziele bieten Sie an (Vorkasse, Rechnung mit Ziel, Lastschrift, Skonto)? Gibt es eine Kreditlinie nach einer Anlaufphase?
7. Rückgabe und Gewährleistung: Nehmen Sie unverkaufte oder beschädigte Ware zurück? Wie läuft die Abwicklung bei Gewährleistungsfällen unserer Endkunden?
8. Produktdaten: Stellen Sie Produktdaten (EAN/GTIN, Bilder, Beschreibungen, technische Daten) als Datenfeed oder über eine Schnittstelle bereit?
9. Konformität: Können Sie uns je Artikel die Herstellerangaben nach der Produktsicherheitsverordnung (GPSR), Konformitätserklärungen (CE) und ggf. Sicherheitsdatenblätter zur Verfügung stellen?
10. Vertrieb und Gebietsschutz: Gibt es einen selektiven Vertrieb oder Vorgaben für den Online-Verkauf (Marktplätze, Preisdarstellung, Markenauftritt)? Ist eine Exklusivität oder ein Gebietsschutz für [Gebiet / Kanal] grundsätzlich möglich?
11. Dropshipping: Bieten Sie Streckengeschäft direkt an unsere Endkunden an, und zu welchen Bedingungen?
12. Marketing: Stellen Sie Werbemittel, Produktbilder und Markenrichtlinien zur Verfügung? Gibt es Werbekostenzuschüsse oder Aktionsrabatte?

Wir freuen uns über eine Rückmeldung mit Ihrer Preisliste und den Konditionen sowie über die Nennung eines Ansprechpartners für den Online-Handel. Gern stellen wir unser Konzept auch in einem kurzen Telefonat vor; erreichbar sind wir unter [Telefonnummer] oder [E-Mail-Adresse].

Mit freundlichen Grüßen


______________________________
[Vorname Nachname]
[Funktion, z. B. „Inhaber“ / „Geschäftsführer“]
[Firma]

Anlagen:
– Gewerbeanmeldung vom [Datum]
– [Handelsregisterauszug]
– Bestätigung der USt-IdNr.
– [Kurzprofil / Mediadaten des Shops]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "affiliate-vereinbarung",
    titel: "Affiliate-/Partnerprogramm-Vereinbarung",
    kurz: "Vertrag zwischen Shop-Betreiber und Affiliate: Tracking, Provision, Cookie-Laufzeit, Stornos, Auszahlung, erlaubte Werbemittel, Markenbidding-Verbot und Kennzeichnung.",
    kategorie: "ecommerce",
    dateiname: "Affiliate-Vereinbarung",
    wofuer: [
      "Du startest ein eigenes Partnerprogramm für deinen Shop oder dein digitales Produkt",
      "Zusammenarbeit mit Bloggern, YouTubern, Influencern oder Vergleichsseiten auf Provisionsbasis",
      "Als Programmbedingungen für ein Affiliate-Tool (Tapfiliate, Post Affiliate Pro, eigene Lösung)",
      "Wenn du bisher nur mündlich oder per E-Mail Provisionen zugesagt hast",
    ],
    enthaelt: [
      "§ 1 Gegenstand und Teilnahme am Partnerprogramm",
      "§ 2 Partnerlinks, Tracking und Cookie-Laufzeit",
      "§ 3 Provision und provisionspflichtige Transaktionen",
      "§ 4 Stornierungen und Rückbelastungen",
      "§ 5 Abrechnung und Auszahlung",
      "§ 6 Zulässige Werbemittel und Werbeformen",
      "§ 7 Unzulässige Werbung, Markenbidding-Verbot",
      "§ 8 Kennzeichnung und Datenschutz auf der Partnerseite",
      "§ 9 Pflichten des Betreibers",
      "§ 10 Laufzeit, Kündigung, Sperrung",
      "§ 11 Haftung und Schlussbestimmungen",
    ],
    hinweise: [
      "Der Affiliate muss seine Werbung als solche kennzeichnen (§ 5a Abs. 4 UWG). Verschleierte Empfehlungen können auch dich als Auftraggeber treffen. Die Vorlage verpflichtet den Partner ausdrücklich dazu.",
      "Affiliate-Tracking-Cookies auf der Partnerseite brauchen nach § 25 TDDDG eine Einwilligung des Besuchers. Ohne Consent-Banner beim Partner läuft das Tracking rechtswidrig und die Provision ins Leere.",
      "Markenbidding (Google-Ads auf deinen Markennamen) ist für dich teuer und kann deine eigene Kampagne verdrängen. Das Verbot in § 7 nur aufnehmen, wenn du es auch kontrollierst.",
      "Provisionen sind Umsatz des Affiliates. Bei Gutschriftverfahren (§ 14 Abs. 2 UStG) brauchst du die USt-IdNr. oder den Kleinunternehmerstatus des Partners; bei EU-Partnern gilt Reverse Charge.",
      "Provisionen nur auf tatsächlich bezahlte und nicht widerrufene Bestellungen zahlen. Eine Stornofrist von mindestens 30 Tagen deckt den Widerruf und die üblichen Retouren ab.",
    ],
    faqs: [
      {
        q: "Ist der Affiliate ein Handelsvertreter?",
        a: "In der Regel nein. Der Affiliate vermittelt nicht ständig und nicht als Beauftragter im Sinne des § 84 HGB, sondern stellt Werbeflächen und Links bereit. Die Vorlage stellt das klar und schließt Ausgleichsansprüche nach § 89b HGB aus. Bei intensiver, exklusiver Vermittlungstätigkeit kann die Einordnung anders ausfallen.",
      },
      {
        q: "Welche Cookie-Laufzeit ist üblich?",
        a: "Zwischen 7 und 90 Tagen, bei vielen Shops 30 Tage. Die Laufzeit bestimmt, wie lange nach dem Klick ein Kauf dem Partner zugerechnet wird. Kürzere Laufzeiten senken deine Kosten, längere motivieren Partner. Entscheidend ist das Last-Click- oder First-Click-Modell, das die Vorlage ebenfalls festlegt.",
      },
      {
        q: "Darf ich Provisionen bei Widerruf oder Retoure zurückfordern?",
        a: "Ja, wenn der Vertrag das vorsieht. Die Vorlage definiert die provisionspflichtige Transaktion als vollständig bezahlte und nicht rückabgewickelte Bestellung und verrechnet Stornos mit der nächsten Abrechnung. Ohne diese Regelung könnte ein Partner die Provision auch für widerrufene Käufe verlangen.",
      },
      {
        q: "Was muss der Partner auf seiner Website beachten?",
        a: "Werbekennzeichnung, Impressum, Datenschutzerklärung mit Nennung des Affiliate-Trackings und eine Einwilligung für Tracking-Cookies. Außerdem darf er keine unerlaubten Werbemails versenden (§ 7 UWG) und keine irreführenden Aussagen über dein Produkt machen. Verstöße berechtigen dich zur Sperrung.",
      },
    ],
    seo: {
      title: "Affiliate-Vertrag Vorlage 2026 kostenlos | GründerX",
      description:
        "Affiliate-Vereinbarung für dein Partnerprogramm als kostenlose Vorlage: Tracking, Cookie-Laufzeit, Provision, Stornos, Auszahlung, Markenbidding-Verbot.",
    },
    stand: "2026-10",
    text: `Affiliate-Vereinbarung (Partnerprogramm)

zwischen

[Firma des Betreibers], [Straße Hausnummer], [PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Betreiber“ –

und

[Firma / Vorname Nachname des Partners], [Straße Hausnummer], [PLZ Ort], [USt-IdNr. / Kleinunternehmer nach § 19 UStG]
– nachfolgend „Partner“ –

§ 1 Gegenstand und Teilnahme
(1) Der Betreiber betreibt den Online-Shop [Shopname] unter [www.domain.de] [bzw. bietet das Produkt [Bezeichnung] an]. Er unterhält ein Partnerprogramm, über das Dritte gegen Provision Kunden vermitteln.
(2) Der Partner bewirbt die Angebote des Betreibers auf seinen in Anlage 1 benannten Websites, Social-Media-Kanälen, Newslettern oder Apps (nachfolgend „Partnerkanäle“). Neue Partnerkanäle sind dem Betreiber vor Nutzung in Textform anzuzeigen; der Betreiber kann innerhalb von [z. B. 5] Werktagen widersprechen.
(3) Der Partner handelt als selbständiger Unternehmer. Er ist nicht Handelsvertreter, nicht bevollmächtigt, Erklärungen für den Betreiber abzugeben, und erwirbt keinen Ausgleichsanspruch nach § 89b HGB. Ein Arbeits- oder Gesellschaftsverhältnis wird nicht begründet.
(4) Die Teilnahme setzt voraus, dass der Partner volljährig und unternehmerisch tätig ist und seine Partnerkanäle den gesetzlichen Anforderungen (Impressum, Datenschutzerklärung) entsprechen.

§ 2 Partnerlinks, Tracking und Cookie-Laufzeit
(1) Der Betreiber stellt dem Partner über [das Partnerportal unter [URL] / das Affiliate-Tool [Bezeichnung]] individuelle Partnerlinks mit Kennung ([z. B. „?ref=[Partner-ID]“]) sowie Werbemittel zur Verfügung.
(2) Klickt ein Nutzer auf einen Partnerlink, wird auf dem Endgerät des Nutzers ein Cookie oder eine vergleichbare Kennung mit einer Laufzeit von [z. B. 30] Tagen gesetzt. Bestellungen innerhalb dieser Laufzeit werden dem Partner zugerechnet, wenn das Cookie beim Abschluss der Bestellung noch vorhanden ist.
(3) Es gilt das [Last-Click-Prinzip: Bei mehreren Partnern wird die Provision dem Partner zugerechnet, dessen Link zuletzt vor der Bestellung angeklickt wurde / First-Click-Prinzip: … zuerst angeklickt wurde]. Eigene Werbekanäle des Betreibers (Newsletter, bezahlte Suchanzeigen, Retargeting) haben Vorrang, wenn der Nutzer zuletzt über diese kam.
(4) Der Partner akzeptiert, dass das Tracking technisch von der Einwilligung des Nutzers abhängt. Bestellungen, die wegen fehlender Einwilligung, Cookie-Löschung, Ad-Blockern oder technischen Störungen nicht zugeordnet werden können, begründen keinen Provisionsanspruch. Die Aufzeichnungen des Betreibers bzw. des Affiliate-Tools sind für die Zuordnung maßgeblich; der Partner kann innerhalb von [z. B. 14] Tagen nach Abrechnung substantiiert widersprechen.

§ 3 Provision und provisionspflichtige Transaktionen
(1) Der Partner erhält für jede provisionspflichtige Transaktion eine Provision in Höhe von [z. B. 10] % des Netto-Warenwerts (Warenwert ohne Umsatzsteuer, Versandkosten, Gutscheine und Rabatte) [Alternative: eine Festprovision von [Betrag] EUR je Neukunde / je Abschluss].
(2) Provisionspflichtig ist eine Bestellung, die
   a) nach § 2 dem Partner zugeordnet ist,
   b) vom Kunden vollständig bezahlt wurde und
   c) nicht innerhalb der Stornofrist nach § 4 widerrufen, zurückgegeben, rückabgewickelt oder vom Betreiber wegen Betrugsverdachts, Zahlungsausfalls oder Verstoßes gegen die AGB abgelehnt wurde.
(3) Eigenbestellungen des Partners, Bestellungen von Mitarbeitern oder Angehörigen des Partners über seine eigenen Links sowie Bestellungen, die durch unzulässige Werbung nach § 7 veranlasst wurden, sind nicht provisionspflichtig.
(4) [Optional: Staffel: Ab [Anzahl] provisionspflichtigen Transaktionen pro Kalendermonat beträgt die Provision [z. B. 12] %, ab [Anzahl] [z. B. 15] %.]
(5) Der Betreiber kann die Provisionssätze mit einer Ankündigungsfrist von [z. B. 30] Tagen in Textform ändern. Für bis dahin zugeordnete Transaktionen gilt der alte Satz. Widerspricht der Partner, endet die Vereinbarung mit Wirksamwerden der Änderung.

§ 4 Stornierungen und Rückbelastungen
(1) Die Stornofrist beträgt [z. B. 30] Tage ab Bestellung. Innerhalb dieser Frist widerrufene, zurückgesandte, nicht bezahlte oder rückabgewickelte Bestellungen entfallen als provisionspflichtige Transaktion.
(2) Wurde eine Provision bereits ausgezahlt und fällt die Transaktion danach weg (z. B. Rückbuchung, späterer Widerruf, Betrug), wird die Provision mit der nächsten Abrechnung verrechnet. Reicht die nächste Abrechnung nicht aus, ist der Partner zur Rückzahlung innerhalb von [z. B. 14] Tagen verpflichtet.
(3) Der Betreiber weist Stornierungen in der Abrechnung je Transaktion mit Grund aus.

§ 5 Abrechnung und Auszahlung
(1) Der Betreiber erstellt monatlich bis zum [z. B. 10.] des Folgemonats eine Abrechnung über alle provisionspflichtigen Transaktionen, deren Stornofrist abgelaufen ist.
(2) Die Auszahlung erfolgt im Gutschriftverfahren (§ 14 Abs. 2 Satz 2 UStG). Der Partner stimmt der Abrechnung per Gutschrift zu und teilt dem Betreiber seine USt-IdNr. oder seinen Status als Kleinunternehmer mit. Bei Partnern aus dem EU-Ausland geht die Steuerschuld auf den Leistungsempfänger über (Reverse-Charge-Verfahren); der Partner weist seine USt-IdNr. nach.
(3) Die Auszahlung erfolgt per [Überweisung / PayPal] auf das vom Partner benannte Konto, sobald das Guthaben mindestens [z. B. 50] EUR beträgt. Guthaben unterhalb des Mindestbetrags werden vorgetragen. Nicht abgerufene Guthaben verfallen [nicht / nach Ablauf von drei Jahren ab Abrechnung].
(4) Einwendungen gegen eine Abrechnung sind innerhalb von [z. B. 30] Tagen nach Zugang in Textform zu erheben; danach gilt die Abrechnung als anerkannt, worauf der Betreiber in der Abrechnung hinweist.

§ 6 Zulässige Werbemittel und Werbeformen
(1) Der Partner darf die vom Betreiber bereitgestellten Banner, Textlinks, Produktbilder, Logos und Produktdaten unverändert in den Partnerkanälen einsetzen. Eigene Texte und Bilder sind zulässig, sofern sie wahr, nicht irreführend und nicht herabsetzend sind.
(2) Zulässig sind insbesondere redaktionelle Beiträge, Produkttests, Vergleiche, Newsletter an Empfänger mit Einwilligung, Social-Media-Beiträge und Videos.
(3) Der Partner erhält das nicht ausschließliche, widerrufliche, auf die Laufzeit beschränkte Recht, die Marken und Werbemittel des Betreibers allein zur Erfüllung dieser Vereinbarung zu nutzen. Eine Registrierung von Domains, Nutzernamen oder Marken, die Marken des Betreibers enthalten, ist untersagt.
(4) [Optional: Der Partner darf Gutscheincodes nur verwenden, die ihm der Betreiber ausdrücklich für seine Kanäle zugeteilt hat. Die Veröffentlichung auf Gutschein-Portalen ist untersagt.]

§ 7 Unzulässige Werbung, Markenbidding-Verbot
(1) Untersagt sind:
   a) unverlangte Werbung per E-Mail, Messenger, SMS oder Telefon (§ 7 UWG), Kommentar-Spam und Massenpostings;
   b) Suchmaschinenwerbung (z. B. Google Ads, Bing Ads) auf Marken, Firmennamen oder Produktbezeichnungen des Betreibers oder deren Schreibvarianten sowie die Verwendung solcher Begriffe in Anzeigentexten oder Anzeigen-URLs (Markenbidding); [Optional: ausgenommen sind generische Keywords wie [Beispiele];]
   c) Cookie-Dropping, erzwungene Klicks, Pop-ups, Pop-unders, Layer, Adware, Toolbars, iFrames und jede Technik, die ein Tracking ohne bewussten Klick des Nutzers auslöst;
   d) irreführende Angaben über Preise, Rabatte, Verfügbarkeit, Testergebnisse oder Eigenschaften der Produkte;
   e) Werbung auf Seiten mit rechtswidrigen, pornografischen, gewaltverherrlichenden oder diskriminierenden Inhalten;
   f) das Nachbauen oder Vortäuschen der Website des Betreibers, insbesondere Bestellseiten, Logos oder Checkout-Elemente;
   g) Cashback- oder Prämienangebote, die Provisionen an Endkunden weitergeben, ohne ausdrückliche Zustimmung des Betreibers.
(2) Bei Verstößen kann der Betreiber die betroffenen Transaktionen stornieren, offene Provisionen einbehalten und den Partner sperren. Schadensersatzansprüche bleiben unberührt. Für jeden schuldhaften Verstoß gegen Absatz 1 Buchstabe b) oder c) zahlt der Partner eine Vertragsstrafe von [Betrag] EUR; der Betreiber kann weitergehenden Schaden nachweisen, die Vertragsstrafe wird angerechnet.

§ 8 Kennzeichnung und Datenschutz auf der Partnerseite
(1) Der Partner kennzeichnet Partnerlinks und bezahlte Empfehlungen als Werbung, sodass der kommerzielle Zweck für den Nutzer erkennbar ist (§ 5a Abs. 4 UWG, § 6 DDG bzw. § 22 MStV), z. B. durch „Werbung“, „Anzeige“ oder einen deutlichen Hinweis auf Affiliate-Links.
(2) Der Partner betreibt seine Kanäle datenschutzkonform. Er nennt das Affiliate-Tracking in seiner Datenschutzerklärung und holt für das Setzen nicht notwendiger Cookies und Kennungen die Einwilligung der Nutzer ein (§ 25 TDDDG, Art. 6 Abs. 1 lit. a DSGVO).
(3) Der Partner erhält keine personenbezogenen Daten der vermittelten Kunden. Die Abrechnung enthält nur Transaktionsnummer, Datum, Warenwert und Status.

§ 9 Pflichten des Betreibers
(1) Der Betreiber stellt ein funktionsfähiges Tracking bereit, hält die Werbemittel aktuell und informiert den Partner über wesentliche Änderungen des Angebots, der Preise und der Programmbedingungen.
(2) Der Betreiber gewährt dem Partner Zugang zu einer Statistik mit Klicks, Transaktionen, Stornos und Provisionen, mindestens monatlich aktualisiert.
(3) Der Betreiber ist für die Rechtmäßigkeit seines Angebots, seiner Preise und seiner Werbeaussagen verantwortlich und stellt den Partner von Ansprüchen Dritter frei, die auf vom Betreiber bereitgestellten Werbemitteln beruhen.

§ 10 Laufzeit, Kündigung, Sperrung
(1) Die Vereinbarung beginnt mit Freischaltung des Partners und läuft auf unbestimmte Zeit. Jede Partei kann sie mit einer Frist von [z. B. 14] Tagen in Textform kündigen.
(2) Das Recht zur außerordentlichen Kündigung bleibt unberührt. Der Betreiber kann den Partner bei begründetem Verdacht eines Verstoßes gegen § 7 vorläufig sperren und Auszahlungen bis zur Klärung zurückhalten, längstens für [z. B. 60] Tage.
(3) Nach Beendigung entfernt der Partner alle Partnerlinks und Werbemittel innerhalb von [z. B. 7] Tagen. Bis dahin zugeordnete provisionspflichtige Transaktionen werden nach Ablauf der Stornofrist noch abgerechnet; danach erlöschen alle Ansprüche. Bei Kündigung durch den Betreiber wegen eines Verstoßes gegen § 7 verfallen noch nicht ausgezahlte Provisionen.

§ 11 Haftung und Schlussbestimmungen
(1) Der Betreiber haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden aus der Verletzung von Leben, Körper oder Gesundheit. Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den vorhersehbaren, vertragstypischen Schaden begrenzt; im Übrigen ist sie ausgeschlossen. Ein Anspruch auf eine bestimmte Verfügbarkeit des Trackings oder auf bestimmte Umsätze besteht nicht.
(2) Der Partner stellt den Betreiber von Ansprüchen Dritter frei, die aus der Gestaltung der Partnerkanäle, eigenen Werbeaussagen oder Verstößen gegen § 7 oder § 8 entstehen.
(3) Änderungen bedürfen der Textform. Sollte eine Bestimmung unwirksam sein, bleibt die Vereinbarung im Übrigen wirksam.
(4) Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist [Ort], sofern der Partner Kaufmann, juristische Person des öffentlichen Rechts oder ohne allgemeinen Gerichtsstand in Deutschland ist.
(5) Anlage 1: Partnerkanäle des Partners (URLs, Kanalnamen).

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Betreiber


______________________________
[Vorname Nachname], Partner

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "vertriebspartnervertrag",
    titel: "Vertriebspartnervertrag (Reseller)",
    kurz: "Vertrag zwischen Hersteller und Wiederverkäufer: Produkte, Gebiet, Einkaufskonditionen, Mindestabnahme, Markennutzung, unverbindliche Preisempfehlung ohne Preisbindung, Laufzeit.",
    kategorie: "ecommerce",
    dateiname: "Vertriebspartnervertrag-Reseller",
    wofuer: [
      "Du stellst Produkte her oder importierst sie und willst sie über Händler verkaufen lassen",
      "Du bist Händler und willst eine Marke als autorisierter Reseller führen",
      "Aufbau eines Händlernetzes mit Gebiets- oder Kanalaufteilung",
      "Wenn bisher nur Bestellungen ohne Rahmenvertrag laufen und Rabatte, Gebiete und Marken ungeregelt sind",
    ],
    enthaelt: [
      "§ 1 Gegenstand, Stellung des Vertriebspartners",
      "§ 2 Vertragsprodukte und Vertragsgebiet",
      "§ 3 Einkaufspreise, Rabatte, Zahlungsbedingungen",
      "§ 4 Bestellung, Lieferung, Gefahrübergang, Eigentumsvorbehalt",
      "§ 5 Mindestabnahme und Berichtspflichten",
      "§ 6 Wiederverkaufspreise (unverbindliche Preisempfehlung)",
      "§ 7 Marken, Werbung, Produktpräsentation",
      "§ 8 Gewährleistung, Rügepflicht, Produkthaftung, Rückruf",
      "§ 9 Geheimhaltung und Kundendaten",
      "§ 10 Laufzeit, Kündigung, Vertragsende",
      "§ 11 Schlussbestimmungen",
    ],
    hinweise: [
      "Preisbindung ist verboten: Du darfst dem Händler keine Mindest- oder Festpreise für den Weiterverkauf vorgeben (§ 1 GWB, Art. 101 AEUV, Art. 4 lit. a Vertikal-GVO 2022/720). Nur unverbindliche Preisempfehlungen und Höchstpreise sind zulässig; Druck oder Anreize zur Einhaltung der UVP sind ebenfalls verboten.",
      "Ein Verbot des Online-Verkaufs oder des Verkaufs über Marktplätze ist nur in engen Grenzen zulässig (qualitative Kriterien im selektiven Vertrieb). Ein pauschales Verbot macht die Klausel nichtig und kann ein Bußgeld auslösen.",
      "Passive Verkäufe (Kunden aus anderen Gebieten, die von sich aus bestellen) dürfen dem Händler nicht verboten werden. Nur aktive Verkäufe in ein exklusiv anderen Partnern zugewiesenes Gebiet dürfen eingeschränkt werden.",
      "Ein Vertragshändler kann nach Vertragsende einen Ausgleichsanspruch analog § 89b HGB haben, wenn er wie ein Handelsvertreter in die Absatzorganisation eingebunden ist und seinen Kundenstamm überlassen muss. Die Vorlage vermeidet die Pflicht zur Überlassung der Kundendaten.",
      "Unter Kaufleuten gilt die Rügepflicht des § 377 HGB: Der Händler muss die Ware sofort prüfen und Mängel unverzüglich anzeigen, sonst gilt sie als genehmigt. Die Vorlage legt die Frist fest.",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen Vertriebspartner (Reseller) und Handelsvertreter?",
        a: "Der Reseller kauft die Ware auf eigene Rechnung und verkauft sie im eigenen Namen weiter; sein Gewinn ist die Handelsspanne. Der Handelsvertreter vermittelt nur Geschäfte für den Hersteller und bekommt Provision, die Ware bleibt beim Hersteller. Diese Vorlage ist ein Reseller-Vertrag; für Handelsvertreter gelten die zwingenden §§ 84 ff. HGB.",
      },
      {
        q: "Darf ich dem Händler die UVP vorschreiben?",
        a: "Nein. Du darfst eine unverbindliche Preisempfehlung aussprechen und Höchstpreise setzen, aber der Händler muss frei entscheiden können, welchen Preis er verlangt. Sanktionen, Rabattkürzungen oder Lieferstopps wegen Unterschreitung der UVP sind verbotene Preisbindung und werden vom Bundeskartellamt mit Bußgeldern verfolgt.",
      },
      {
        q: "Kann ich dem Händler ein exklusives Gebiet geben?",
        a: "Ja, Alleinvertrieb ist zulässig. Du darfst anderen Händlern dann aktive Verkäufe (gezielte Werbung, Außendienst) in dieses Gebiet untersagen. Passive Verkäufe an Kunden, die von sich aus aus dem Gebiet bestellen, bleiben immer erlaubt, auch über den Online-Shop.",
      },
      {
        q: "Was passiert mit dem Restbestand beim Händler nach Kündigung?",
        a: "Ohne Regelung darf der Händler ihn abverkaufen, auch unter der Marke. Die Vorlage sieht ein Rückkaufrecht des Herstellers zum Einkaufspreis abzüglich eines Abschlags und eine Abverkaufsfrist vor. So verhinderst du, dass die Ware nach Vertragsende verramscht wird.",
      },
    ],
    seo: {
      title: "Vertriebspartnervertrag Vorlage 2026 (Reseller) | GründerX",
      description:
        "Vertriebspartner- und Reseller-Vertrag als kostenlose Vorlage: Produkte, Gebiet, Rabatte, Mindestabnahme, Marken, UVP ohne Preisbindung, Laufzeit, Kündigung.",
    },
    stand: "2026-10",
    text: `Vertriebspartnervertrag (Wiederverkäufer)

zwischen

[Firma des Herstellers / Lieferanten], [Straße Hausnummer], [PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Hersteller“ –

und

[Firma des Vertriebspartners], [Straße Hausnummer], [PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Vertriebspartner“ –

– gemeinsam „die Parteien“ –

§ 1 Gegenstand, Stellung des Vertriebspartners
(1) Der Hersteller stellt die in Anlage 1 bezeichneten Produkte her bzw. vertreibt sie (nachfolgend „Vertragsprodukte“). Der Vertriebspartner kauft die Vertragsprodukte vom Hersteller und verkauft sie im eigenen Namen und auf eigene Rechnung an seine Kunden weiter.
(2) Der Vertriebspartner ist selbständiger Kaufmann. Er ist nicht Handelsvertreter, nicht bevollmächtigt, den Hersteller zu vertreten, und trägt das Absatz- und Lagerrisiko selbst. Ein Ausgleichsanspruch entsprechend § 89b HGB ist ausgeschlossen, soweit dies gesetzlich zulässig ist.
(3) Der Hersteller ernennt den Vertriebspartner zum [autorisierten Händler / „Authorized Reseller“] für die Vertragsprodukte im Vertragsgebiet. Der Vertriebspartner darf diese Bezeichnung während der Vertragslaufzeit führen.

§ 2 Vertragsprodukte und Vertragsgebiet
(1) Vertragsprodukte sind die in Anlage 1 aufgeführten Produkte einschließlich Nachfolgemodellen. Der Hersteller kann das Sortiment mit einer Frist von [z. B. 3] Monaten ändern; Auslaufmodelle werden mindestens [z. B. 6] Monate vorher angekündigt.
(2) Vertragsgebiet ist [Deutschland / Deutschland, Österreich und die Schweiz / die Region [Bezeichnung]].
[Variante A – nicht exklusiv:] (3) Der Hersteller darf im Vertragsgebiet weitere Vertriebspartner ernennen und selbst verkaufen.
[Variante B – Alleinvertrieb:] (3) Der Hersteller ernennt im Vertragsgebiet keine weiteren Vertriebspartner und verkauft dort nicht selbst an Kunden, solange der Vertriebspartner die Mindestabnahme nach § 5 erreicht. Der Vertriebspartner unterlässt aktive Verkaufsbemühungen (gezielte Werbung, Außendienst, Direktansprache) in Gebieten, die der Hersteller anderen Vertriebspartnern exklusiv zugewiesen hat; Lieferungen an Kunden, die sich von sich aus an ihn wenden (passive Verkäufe, einschließlich Bestellungen über den Online-Shop), bleiben zulässig.
[Nur eine Variante stehen lassen.]
(4) Der Vertriebspartner darf die Vertragsprodukte über alle Vertriebskanäle verkaufen, einschließlich stationärem Handel, eigenem Online-Shop und Online-Marktplätzen. [Optional, nur bei selektivem Vertrieb mit sachlichen Qualitätskriterien: Der Verkauf über Online-Marktplätze setzt voraus, dass die in Anlage 3 festgelegten Qualitätsanforderungen an Präsentation, Beratung und Kundenservice erfüllt werden; diese gelten für alle Vertriebspartner gleichermaßen.]

§ 3 Einkaufspreise, Rabatte, Zahlungsbedingungen
(1) Der Vertriebspartner kauft die Vertragsprodukte zu den in der Händlerpreisliste (Anlage 2) genannten Nettopreisen. Der Vertriebspartner erhält auf die Listenpreise einen Händlerrabatt von [z. B. 35] %. [Optional: Bei einem Jahresumsatz netto über [Betrag] EUR erhöht sich der Rabatt rückwirkend für das Kalenderjahr um [z. B. 3] Prozentpunkte (Jahresbonus), gutgeschrieben bis zum 31.01. des Folgejahres.]
(2) Preisänderungen kündigt der Hersteller mindestens [z. B. 60] Tage im Voraus in Textform an. Für vor der Ankündigung bestätigte Bestellungen gilt der alte Preis.
(3) Die Preise verstehen sich [ab Werk [Ort] / frei Haus innerhalb Deutschlands ab einem Bestellwert von [Betrag] EUR netto] zuzüglich Umsatzsteuer.
(4) Rechnungen sind innerhalb von [z. B. 30] Tagen nach Rechnungsdatum ohne Abzug zu zahlen; bei Zahlung innerhalb von [z. B. 10] Tagen gewährt der Hersteller [z. B. 2] % Skonto. [In den ersten [z. B. 3] Monaten erfolgt die Lieferung gegen Vorkasse.] Der Hersteller kann ein Kreditlimit von [Betrag] EUR festlegen und bei Überschreitung Lieferungen von Vorkasse abhängig machen.
(5) Bei Zahlungsverzug schuldet der Vertriebspartner Verzugszinsen in Höhe von 9 Prozentpunkten über dem Basiszinssatz (§ 288 Abs. 2 BGB) sowie die Pauschale von 40 EUR (§ 288 Abs. 5 BGB).

§ 4 Bestellung, Lieferung, Gefahrübergang, Eigentumsvorbehalt
(1) Bestellungen erfolgen in Textform oder über das Händlerportal unter [URL]. Der Hersteller bestätigt Bestellungen innerhalb von [z. B. 3] Werktagen und nennt den voraussichtlichen Liefertermin. Die Mindestbestellmenge beträgt [Menge / Betrag] je Auftrag.
(2) Die Lieferzeit beträgt bei Lagerware [z. B. 5] Werktage ab Auftragsbestätigung. Teillieferungen sind zulässig, soweit sie dem Vertriebspartner zumutbar sind.
(3) Die Gefahr geht mit Übergabe an den Frachtführer auf den Vertriebspartner über, bei Lieferung frei Haus mit Zustellung.
(4) Die Vertragsprodukte bleiben bis zur vollständigen Bezahlung aller Forderungen aus der Geschäftsverbindung Eigentum des Herstellers. Der Vertriebspartner darf die Vorbehaltsware im ordentlichen Geschäftsgang weiterverkaufen; er tritt die daraus entstehenden Forderungen bereits jetzt in Höhe des Rechnungswerts der Vorbehaltsware an den Hersteller ab, der die Abtretung annimmt. Der Vertriebspartner bleibt zur Einziehung ermächtigt, solange er nicht in Zahlungsverzug ist.

§ 5 Mindestabnahme und Berichtspflichten
(1) Der Vertriebspartner verpflichtet sich, im ersten Vertragsjahr Vertragsprodukte im Wert von mindestens [Betrag] EUR netto und in jedem folgenden Vertragsjahr im Wert von mindestens [Betrag] EUR netto abzunehmen. [Optional: Die Parteien legen die Mindestabnahme für jedes Folgejahr bis zum 30.11. des Vorjahres einvernehmlich fest; kommt keine Einigung zustande, gilt der Wert des Vorjahres zuzüglich [z. B. 10] %.]
(2) Erreicht der Vertriebspartner die Mindestabnahme in einem Vertragsjahr nicht, kann der Hersteller nach seiner Wahl [die Exklusivität nach § 2 Abs. 3 Variante B aufheben / den Händlerrabatt für das Folgejahr um [z. B. 5] Prozentpunkte senken / den Vertrag mit einer Frist von drei Monaten kündigen]. Weitergehende Ansprüche bestehen nicht, wenn das Verfehlen auf Lieferengpässe des Herstellers zurückgeht.
(3) Der Vertriebspartner berichtet dem Hersteller [quartalsweise] in Textform über Abverkäufe je Produkt, Lagerbestand und wesentliche Marktentwicklungen. Kundendaten sind davon nicht umfasst.
(4) Der Vertriebspartner hält einen angemessenen Lagerbestand und [Vorführmuster / Ausstellungsstücke] bereit, um die Lieferfähigkeit gegenüber seinen Kunden sicherzustellen.

§ 6 Wiederverkaufspreise (unverbindliche Preisempfehlung)
(1) Der Vertriebspartner legt seine Verkaufspreise gegenüber seinen Kunden allein und frei fest.
(2) Der Hersteller kann unverbindliche Preisempfehlungen (UVP) aussprechen. Diese sind für den Vertriebspartner nicht bindend. Der Hersteller wird die Einhaltung der UVP weder überwachen noch durch Vorteile belohnen oder durch Nachteile (Rabattkürzung, Lieferverweigerung, Kündigung) erzwingen.
(3) Der Hersteller darf keinen Mindestpreis festlegen. [Optional: Der Hersteller darf einen Höchstverkaufspreis festlegen, der als Obergrenze gilt und vom Vertriebspartner unterschritten werden darf.]
(4) Bei der Bewerbung der Vertragsprodukte beachtet der Vertriebspartner die Preisangabenverordnung, insbesondere die Angabe des niedrigsten Preises der letzten 30 Tage bei Preisermäßigungen (§ 11 PAngV).

§ 7 Marken, Werbung, Produktpräsentation
(1) Der Hersteller räumt dem Vertriebspartner das nicht ausschließliche, nicht übertragbare, auf die Vertragslaufzeit und das Vertragsgebiet beschränkte Recht ein, die in Anlage 1 genannten Marken, Logos, Produktbilder und Texte des Herstellers zur Bewerbung und zum Verkauf der Vertragsprodukte zu nutzen. Jede andere Nutzung, insbesondere die Anmeldung ähnlicher Marken, Domains oder Nutzernamen, ist untersagt.
(2) Der Vertriebspartner präsentiert die Vertragsprodukte in angemessener Qualität und nach den Markenrichtlinien des Herstellers (Anlage 3) und verwendet nur vom Hersteller freigegebene oder wahrheitsgemäße eigene Werbeaussagen. Er darf die Vertragsprodukte nicht verändern, umverpacken oder mit eigenen Kennzeichen versehen.
(3) Der Hersteller stellt Produktdaten (EAN/GTIN, Bilder, Beschreibungen, technische Daten, Sicherheitshinweise, Herstellerangaben nach der Verordnung (EU) 2023/988) in elektronischer Form zur Verfügung und hält sie aktuell.
(4) [Optional: Der Hersteller beteiligt sich an Werbemaßnahmen des Vertriebspartners mit einem Werbekostenzuschuss von [z. B. 2] % des Nettoeinkaufsvolumens des Vorjahres gegen Nachweis.]

§ 8 Gewährleistung, Rügepflicht, Produkthaftung, Rückruf
(1) Der Vertriebspartner untersucht die gelieferten Vertragsprodukte unverzüglich nach Eingang und zeigt offensichtliche Mängel, Falschlieferungen und Mengenabweichungen innerhalb von [z. B. 5] Werktagen, versteckte Mängel unverzüglich nach Entdeckung in Textform an (§ 377 HGB). Unterbleibt die Anzeige, gilt die Ware als genehmigt.
(2) Bei Mängeln leistet der Hersteller nach seiner Wahl Nacherfüllung durch Nachbesserung oder Ersatzlieferung. Schlägt die Nacherfüllung zweimal fehl, kann der Vertriebspartner mindern oder zurücktreten. Die Verjährungsfrist für Mängelansprüche beträgt [12 Monate / 24 Monate] ab Ablieferung; für Rückgriffsansprüche des Vertriebspartners wegen Verbraucherverkäufen gelten §§ 445a, 445b, 478 BGB.
(3) Der Hersteller gewährleistet, dass die Vertragsprodukte den in der EU geltenden Produktsicherheits-, Kennzeichnungs- und Konformitätsvorschriften entsprechen, und stellt Konformitätserklärungen und Prüfnachweise auf Anforderung zur Verfügung. Er stellt den Vertriebspartner von Ansprüchen Dritter aus Produkthaftung und aus der Verletzung von Schutzrechten Dritter durch die Vertragsprodukte frei, soweit der Vertriebspartner die Produkte unverändert vertrieben hat.
(4) Bei einem Rückruf oder einer Sicherheitswarnung informieren sich die Parteien unverzüglich gegenseitig. Der Hersteller trägt die Kosten des Rückrufs; der Vertriebspartner unterstützt bei der Information seiner Kunden und stellt dazu die erforderlichen Verkaufsdaten bereit.
(5) Der Hersteller unterhält eine Produkthaftpflichtversicherung mit einer Deckungssumme von mindestens [Betrag] EUR je Schadensfall und weist diese auf Anforderung nach.

§ 9 Geheimhaltung und Kundendaten
(1) Die Parteien behandeln Preise, Konditionen, Umsätze, Produktplanungen und sonstige nicht öffentliche Informationen der anderen Partei vertraulich und verwenden sie nur zur Durchführung dieses Vertrags. Die Pflicht gilt für [z. B. 3] Jahre nach Vertragsende fort.
(2) Die Kundendaten des Vertriebspartners verbleiben bei ihm. Eine Pflicht zur Überlassung des Kundenstamms an den Hersteller besteht nicht, auch nicht bei Vertragsende. Rückruf- und Gewährleistungsfälle werden in anonymisierter oder auf das Erforderliche beschränkter Form abgestimmt.

§ 10 Laufzeit, Kündigung, Vertragsende
(1) Der Vertrag beginnt am [Datum] und läuft zunächst bis zum [Datum] (Mindestlaufzeit). Er verlängert sich jeweils um ein Jahr, wenn er nicht mit einer Frist von [z. B. 3] Monaten zum Ende der Laufzeit in Textform gekündigt wird.
(2) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt, insbesondere bei schwerwiegenden Verstößen gegen § 7, bei Zahlungsverzug mit mehr als [z. B. zwei] Rechnungen trotz Mahnung, bei Insolvenzantrag oder bei einem Kontrollwechsel beim Vertriebspartner.
(3) Nach Vertragsende darf der Vertriebspartner den vorhandenen Lagerbestand innerhalb von [z. B. 6] Monaten abverkaufen und die Marken hierfür weiter nutzen. Der Hersteller kann innerhalb von [z. B. 4] Wochen nach Vertragsende verlangen, den unbeschädigten, originalverpackten Lagerbestand zum Einkaufspreis abzüglich [z. B. 10] % zurückzukaufen; der Vertriebspartner ist dann zur Rückgabe verpflichtet.
(4) Mit Vertragsende erlöschen alle Nutzungsrechte nach § 7; der Vertriebspartner entfernt die Bezeichnung nach § 1 Abs. 3 und alle Markenhinweise, soweit sie über den Abverkauf nach Absatz 3 hinausgehen.

§ 11 Schlussbestimmungen
(1) Allgemeine Geschäftsbedingungen einer Partei gelten nur, soweit sie diesem Vertrag nicht widersprechen. Änderungen und Ergänzungen bedürfen der Textform.
(2) Der Vertriebspartner darf Rechte und Pflichten aus diesem Vertrag nur mit Zustimmung des Herstellers übertragen.
(3) Sollte eine Bestimmung unwirksam sein, bleibt der Vertrag im Übrigen wirksam. Unwirksame Bestimmungen, insbesondere solche, die gegen Kartellrecht verstoßen, sind durch eine zulässige Regelung zu ersetzen, die dem wirtschaftlichen Zweck am nächsten kommt.
(4) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist [Ort].
(5) Anlagen: Anlage 1 (Vertragsprodukte, Marken), Anlage 2 (Händlerpreisliste), Anlage 3 (Markenrichtlinien, ggf. Qualitätskriterien).

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Hersteller


______________________________
[Vorname Nachname], für den Vertriebspartner

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "angebot-vorlage",
    titel: "Verbindliches Angebot (B2B)",
    kurz: "Angebotsschreiben an Geschäftskunden mit Positionen, Netto- und Bruttopreisen, Lieferzeit, Zahlungsbedingungen, Bindefrist und klarer Annahmeregel.",
    kategorie: "ecommerce",
    dateiname: "Angebot-B2B",
    wofuer: [
      "Du verkaufst Waren oder Dienstleistungen an Unternehmen und willst ein sauberes Angebot schicken",
      "Projektangebote von Agenturen, Handwerkern, Händlern und Freelancern",
      "Wenn du bisher Preise per E-Mail nennst und Streit über Umfang, Frist oder Gültigkeit entsteht",
      "Als Vorstufe zur Auftragsbestätigung und Rechnung mit denselben Positionen",
    ],
    enthaelt: [
      "Briefkopf mit Pflichtangaben und Angebotsnummer",
      "Leistungsbeschreibung und Positionsliste mit Einzel- und Gesamtpreisen",
      "Netto, Umsatzsteuer, Brutto",
      "Lieferzeit bzw. Leistungszeitraum",
      "Zahlungsbedingungen und Skonto",
      "Bindefrist und Gültigkeit des Angebots",
      "Annahme, AGB-Einbeziehung, Eigentumsvorbehalt",
      "Unterschrift und Annahmevermerk für den Kunden",
    ],
    hinweise: [
      "Ein verbindliches Angebot bindet dich bis zum Ablauf der Bindefrist (§ 145 BGB). Nimmt der Kunde innerhalb der Frist an, ist der Vertrag geschlossen, auch wenn sich deine Einkaufspreise inzwischen geändert haben. Setze die Frist deshalb kurz.",
      "Wer sich nicht binden will, schreibt „freibleibend“ oder „unverbindlich“. Dann ist dein Schreiben nur eine Einladung, und erst deine Auftragsbestätigung schließt den Vertrag. Die Vorlage ist bewusst verbindlich; die Alternative steht als Variante drin.",
      "Nimmt der Kunde mit Änderungen an (andere Menge, anderer Preis, andere Frist), ist das eine Ablehnung mit neuem Angebot (§ 150 Abs. 2 BGB). Dann musst du erneut bestätigen, sonst gibt es keinen Vertrag.",
      "Deine AGB gelten nur, wenn du im Angebot auf sie hinweist und der Kunde sie einsehen kann. Unter Unternehmern reicht der Hinweis mit Link oder Anlage; bei kollidierenden AGB des Kunden gelten nur die übereinstimmenden Teile.",
    ],
    faqs: [
      {
        q: "Wie lange sollte die Bindefrist sein?",
        a: "So kurz, wie es das Geschäft erlaubt: bei Handelsware 7 bis 14 Tage, bei Projekten 30 Tage. Ohne Angabe gilt bei schriftlichen Angeboten die Frist, in der du eine Antwort unter regelmäßigen Umständen erwarten darfst (§ 147 Abs. 2 BGB), was im Streit unklar ist. Die Vorlage nennt ein festes Datum.",
      },
      {
        q: "Was ist der Unterschied zwischen Angebot und Kostenvoranschlag?",
        a: "Ein Kostenvoranschlag ist eine unverbindliche Schätzung, die ohne Vereinbarung nicht vergütet wird (§ 632 Abs. 3 BGB) und bei wesentlicher Überschreitung eine Anzeigepflicht auslöst (§ 650 BGB). Ein Angebot nennt feste Preise und wird mit der Annahme zum Vertrag. Für Händler und Dienstleister mit kalkulierbaren Leistungen ist das Angebot die bessere Wahl.",
      },
      {
        q: "Muss der Kunde das Angebot unterschreiben?",
        a: "Nein, die Annahme ist formfrei und kann per E-Mail, Bestellung oder schlüssiges Verhalten erfolgen. Die Vorlage enthält trotzdem einen Annahmevermerk mit Unterschrift, weil das Beweisprobleme vermeidet. Für Verbraucher gelten zusätzliche Informationspflichten; diese Vorlage ist für Geschäftskunden gedacht.",
      },
      {
        q: "Muss ich im Angebot Brutto- oder Nettopreise angeben?",
        a: "Gegenüber Unternehmern sind Nettopreise mit gesondert ausgewiesener Umsatzsteuer üblich und zulässig. Gegenüber Verbrauchern musst du nach der Preisangabenverordnung Gesamtpreise inklusive Umsatzsteuer nennen. Die Vorlage weist beides aus, damit die Summe eindeutig ist.",
      },
    ],
    seo: {
      title: "Angebot Vorlage B2B 2026 kostenlos (Word & PDF) | GründerX",
      description:
        "Angebotsvorlage für Geschäftskunden: Positionen, Netto- und Bruttopreise, Lieferzeit, Zahlungsbedingungen, Bindefrist, Annahme und AGB-Hinweis. Kostenlos.",
    },
    stand: "2026-10",
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
  },
  {
    slug: "auftragsbestaetigung",
    titel: "Auftragsbestätigung",
    kurz: "Auftragsbestätigung an Geschäftskunden mit Positionen, Terminen, AGB-Einbeziehung und Hinweis auf die Wirkung als kaufmännisches Bestätigungsschreiben.",
    kategorie: "ecommerce",
    dateiname: "Auftragsbestaetigung",
    wofuer: [
      "Du bestätigst eine Bestellung oder einen mündlich bzw. telefonisch erteilten Auftrag eines Geschäftskunden",
      "Annahme einer Bestellung, die vom Angebot abweicht",
      "Wenn dein Angebot freibleibend war und der Vertrag erst durch deine Bestätigung zustande kommt",
      "Als Nachweis für Umfang, Preis und Termin vor Lieferung oder Leistungsbeginn",
    ],
    enthaelt: [
      "Briefkopf mit Pflichtangaben und Bezug auf Angebot und Bestellung",
      "Bestätigte Positionen mit Mengen und Preisen",
      "Liefertermin bzw. Leistungszeitraum und Lieferadresse",
      "Zahlungsbedingungen",
      "Hinweis auf Abweichungen zur Bestellung",
      "AGB-Einbeziehung und Abwehrklausel",
      "Hinweis auf die Wirkung als kaufmännisches Bestätigungsschreiben",
      "Unterschrift und Ansprechpartner",
    ],
    hinweise: [
      "Unter Kaufleuten gilt: Wer einer Auftragsbestätigung nicht unverzüglich widerspricht, akzeptiert ihren Inhalt, auch wenn sie vom mündlich Vereinbarten abweicht (Grundsätze des kaufmännischen Bestätigungsschreibens). Das gilt in beide Richtungen: Prüfe auch Bestätigungen deiner Lieferanten sofort.",
      "Abweichungen von der Bestellung musst du deutlich hervorheben. Versteckte Änderungen in einer Bestätigung binden den Kunden nicht, und bei bewussten Abweichungen, die der Kunde erkennbar nicht akzeptieren würde, greift die Wirkung des Bestätigungsschreibens nicht.",
      "Deine AGB nachträglich über die Auftragsbestätigung einzuführen, funktioniert nur unter Unternehmern und nur, wenn der Kunde nicht widerspricht. Sicherer ist der Hinweis bereits im Angebot.",
      "Die Auftragsbestätigung ist keine Rechnung. Sie löst keine Umsatzsteuer aus und darf keine Rechnungsmerkmale vortäuschen; schreibe nicht „Rechnung“ oder „zahlbar sofort“.",
    ],
    faqs: [
      {
        q: "Was ist ein kaufmännisches Bestätigungsschreiben?",
        a: "Ein Schreiben, mit dem ein Kaufmann einem anderen den Inhalt einer vorher mündlich oder telefonisch getroffenen Vereinbarung bestätigt. Schweigt der Empfänger, gilt der Inhalt als vereinbart, selbst wenn er vom Gespräch abweicht. Die Vorlage nutzt diese Wirkung mit einem ausdrücklichen Hinweis, damit der Kunde Abweichungen sofort prüft.",
      },
      {
        q: "Wann kommt der Vertrag zustande: mit der Bestellung oder mit der Bestätigung?",
        a: "Das hängt davon ab, ob dein Angebot verbindlich war. War es verbindlich, kommt der Vertrag mit der Bestellung des Kunden zustande und die Bestätigung ist nur eine Dokumentation. War das Angebot freibleibend oder gab es keins, ist die Bestellung das Angebot und deine Auftragsbestätigung die Annahme.",
      },
      {
        q: "Was mache ich, wenn der Kunde andere Konditionen bestellt hat als angeboten?",
        a: "Dann ist seine Bestellung ein neues Angebot (§ 150 Abs. 2 BGB). Du kannst es annehmen, indem du genau diese Konditionen bestätigst, oder du bestätigst mit deinen Konditionen und hebst die Abweichung deutlich hervor. Im zweiten Fall ist deine Bestätigung wieder ein neues Angebot, das der Kunde annehmen muss, etwa durch Schweigen unter Kaufleuten oder durch Abnahme der Lieferung.",
      },
      {
        q: "Muss die Auftragsbestätigung unterschrieben sein?",
        a: "Nein, Textform per E-Mail reicht. Wichtig ist, dass sie dem Kunden zugeht und du den Zugang nachweisen kannst. Bei größeren Aufträgen lohnt sich die Bitte um Gegenzeichnung, die die Vorlage als Option vorsieht.",
      },
    ],
    seo: {
      title: "Auftragsbestätigung Vorlage 2026 kostenlos | GründerX",
      description:
        "Auftragsbestätigung für Geschäftskunden als kostenlose Vorlage: Positionen, Termine, Zahlungsbedingungen, AGB-Einbeziehung und Bestätigungsschreiben.",
    },
    stand: "2026-10",
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
  },
  {
    slug: "agb-dienstleistungen-b2b",
    titel: "AGB für Dienstleistungen und Agenturen (B2B)",
    kurz: "Allgemeine Geschäftsbedingungen für Agenturen, Berater, Entwickler und andere Dienstleister gegenüber Unternehmern: Leistungen, Mitwirkung, Vergütung, Nutzungsrechte, Abnahme, Haftung.",
    kategorie: "ecommerce",
    dateiname: "AGB-Dienstleistungen-B2B",
    wofuer: [
      "Agenturen (Marketing, Design, Web, Social Media) mit Geschäftskunden",
      "Freelancer und Berater, die regelmäßig für Unternehmen arbeiten",
      "Software- und App-Entwicklung, Content-Produktion, Fotografie im B2B-Bereich",
      "Wenn Angebote und Verträge auf einen festen Bedingungsrahmen verweisen sollen",
    ],
    enthaelt: [
      "§ 1 Geltungsbereich",
      "§ 2 Vertragsschluss, Angebote, Leistungsänderungen",
      "§ 3 Leistungen und Leistungszeit",
      "§ 4 Mitwirkung des Auftraggebers",
      "§ 5 Vergütung, Fälligkeit, Verzug",
      "§ 6 Abnahme bei Werkleistungen",
      "§ 7 Nutzungsrechte",
      "§ 8 Gewährleistung",
      "§ 9 Haftung",
      "§ 10 Geheimhaltung und Datenschutz",
      "§ 11 Laufzeit und Kündigung",
      "§ 12 Schlussbestimmungen, Gerichtsstand",
    ],
    hinweise: [
      "Diese AGB gelten nur gegenüber Unternehmern (§ 14 BGB). Gegenüber Verbrauchern sind viele Klauseln (Haftungsbegrenzung, Gerichtsstand, Abnahmefiktion, Verjährung) unwirksam. Prüfe bei jedem Auftrag, wer dein Kunde ist.",
      "AGB gelten nur, wenn sie wirksam einbezogen sind: Hinweis im Angebot oder in der Auftragsbestätigung und Zugänglichkeit. Schickt der Kunde eigene Einkaufsbedingungen, gelten bei Widerspruch nur die übereinstimmenden Teile; die Abwehrklausel allein löst das nicht.",
      "Die Haftungsbegrenzung ist nur in der Form der Vorlage wirksam: Vorsatz, grobe Fahrlässigkeit, Personenschäden und Kardinalpflichten dürfen nicht ausgeschlossen werden (§ 307 BGB, § 309 Nr. 7 BGB gilt über § 310 Abs. 1 BGB als Wertungsmaßstab auch im B2B-Bereich).",
      "Nutzungsrechte entstehen nicht automatisch mit der Zahlung. Ohne Klausel bekommt der Kunde nach § 31 Abs. 5 UrhG nur die Rechte, die der Vertragszweck erfordert. Die Vorlage regelt Umfang, Zeitpunkt und Vorbehalt bis zur Zahlung ausdrücklich.",
      "Bei Dauerverträgen mit Agenturen ist die Laufzeit frei verhandelbar, aber überlange Bindung ohne Kündigungsmöglichkeit kann auch im B2B-Bereich unangemessen sein. Die Vorlage sieht eine Mindestlaufzeit mit anschließender monatlicher Kündigung vor.",
    ],
    faqs: [
      {
        q: "Brauche ich als Freelancer wirklich AGB?",
        a: "Pflicht sind sie nicht, aber ohne AGB gilt das Gesetz, das unter anderem keine Haftungsbegrenzung, keine Abnahmefiktion und keine klare Regelung zu Nutzungsrechten enthält. Mit AGB regelst du das einmal und verweist in jedem Angebot darauf, statt es jedes Mal neu zu verhandeln.",
      },
      {
        q: "Was ist der Unterschied zwischen Dienst- und Werkvertrag und warum ist das wichtig?",
        a: "Beim Werkvertrag schuldest du einen Erfolg (fertige Website, Logo, Software) und der Kunde zahlt nach Abnahme; Mängel berechtigen zur Nachbesserung, Minderung oder Rücktritt. Beim Dienstvertrag schuldest du Tätigkeit (Beratung, Betreuung, Stunden) ohne Erfolgsgarantie. Die Vorlage deckt beides ab und ordnet die Abnahme nur Werkleistungen zu.",
      },
      {
        q: "Kann ich die Haftung komplett ausschließen?",
        a: "Nein. Haftung für Vorsatz und grobe Fahrlässigkeit, für Schäden an Leben, Körper und Gesundheit sowie für die Verletzung wesentlicher Vertragspflichten darf auch gegenüber Unternehmern nicht ausgeschlossen werden. Zulässig ist, die Haftung für leichte Fahrlässigkeit bei Kardinalpflichten auf den vorhersehbaren Schaden zu begrenzen und im Übrigen auszuschließen. Genau so ist § 9 der Vorlage gebaut.",
      },
      {
        q: "Wann darf ich die Nutzungsrechte zurückhalten?",
        a: "Bis zur vollständigen Bezahlung, wenn das vereinbart ist. Die Vorlage überträgt die Nutzungsrechte aufschiebend bedingt durch die Zahlung der Vergütung. Nutzt der Kunde das Werk vorher, verletzt er dein Urheberrecht, was dir neben der Vergütung auch Unterlassungs- und Schadensersatzansprüche gibt.",
      },
    ],
    seo: {
      title: "AGB Dienstleistungen B2B Vorlage 2026 für Agenturen | GründerX",
      description:
        "AGB für Agenturen, Berater und Freelancer gegenüber Unternehmern als kostenlose Vorlage: Leistungen, Mitwirkung, Vergütung, Nutzungsrechte, Abnahme, Haftung.",
    },
    stand: "2026-10",
    text: `Allgemeine Geschäftsbedingungen für Dienstleistungen (B2B)

[Firma des Dienstleisters], [Straße Hausnummer], [PLZ Ort] – nachfolgend „Auftragnehmer“ –

§ 1 Geltungsbereich
(1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen dem Auftragnehmer und seinen Kunden (nachfolgend „Auftraggeber“) über [Beschreibung der Leistungen, z. B. „Beratungs-, Konzeptions-, Gestaltungs-, Entwicklungs- und Marketingleistungen“].
(2) Diese AGB gelten ausschließlich gegenüber Unternehmern im Sinne von § 14 BGB, juristischen Personen des öffentlichen Rechts und öffentlich-rechtlichen Sondervermögen.
(3) Entgegenstehende oder von diesen AGB abweichende Bedingungen des Auftraggebers werden nicht Vertragsbestandteil, es sei denn, der Auftragnehmer stimmt ihrer Geltung ausdrücklich in Textform zu. Dies gilt auch, wenn der Auftragnehmer in Kenntnis entgegenstehender Bedingungen die Leistung vorbehaltlos erbringt.
(4) Diese AGB gelten in ihrer jeweils aktuellen Fassung auch für künftige Verträge mit demselben Auftraggeber, ohne dass der Auftragnehmer erneut auf sie hinweisen muss.

§ 2 Vertragsschluss, Angebote, Leistungsänderungen
(1) Angebote des Auftragnehmers sind freibleibend, sofern sie nicht ausdrücklich als verbindlich bezeichnet sind. Der Vertrag kommt durch Auftragsbestätigung des Auftragnehmers in Textform oder durch Beginn der Leistungserbringung zustande.
(2) Der Umfang der Leistungen ergibt sich aus dem Angebot bzw. der Auftragsbestätigung und, soweit vorhanden, aus der Leistungsbeschreibung (Briefing, Konzept, Pflichtenheft). Mündliche Nebenabreden bestehen nicht.
(3) Wünscht der Auftraggeber nach Vertragsschluss Änderungen oder Erweiterungen der Leistung (Change Request), prüft der Auftragnehmer die Auswirkungen auf Vergütung und Termine und unterbreitet ein Angebot. Änderungen werden erst nach Zustimmung des Auftraggebers in Textform umgesetzt. Bis dahin arbeitet der Auftragnehmer auf Basis des ursprünglichen Auftrags weiter.
(4) Kostenvoranschläge sind unverbindlich. Ist eine Überschreitung um mehr als [z. B. 15] % absehbar, zeigt der Auftragnehmer dies unverzüglich an.

§ 3 Leistungen und Leistungszeit
(1) Der Auftragnehmer erbringt die Leistungen nach dem Stand der Technik und mit der Sorgfalt eines ordentlichen Fachunternehmens. Soweit nicht ausdrücklich ein bestimmter Erfolg vereinbart ist (Werkleistung), schuldet der Auftragnehmer die Tätigkeit, nicht einen wirtschaftlichen Erfolg (Dienstleistung); insbesondere werden bestimmte Reichweiten, Platzierungen, Conversion-Raten oder Umsätze nicht geschuldet.
(2) Der Auftragnehmer ist frei in der Wahl des Orts und der Zeit der Leistungserbringung, soweit keine Vor-Ort-Termine vereinbart sind, und darf sich zur Erfüllung sachkundiger Dritter (Subunternehmer, freie Mitarbeiter) bedienen. Er bleibt für die Leistung verantwortlich.
(3) Termine und Fristen sind nur verbindlich, wenn sie ausdrücklich in Textform als verbindlich vereinbart wurden. Sie verlängern sich angemessen, wenn der Auftraggeber seine Mitwirkungspflichten nicht rechtzeitig erfüllt, Änderungswünsche äußert oder höhere Gewalt eintritt.
(4) Der Auftragnehmer darf den Auftraggeber nach Abschluss des Projekts in Textform, auf seiner Website und in Präsentationen als Referenz nennen und die erbrachten Leistungen in angemessenem Umfang zeigen, sofern der Auftraggeber dem nicht in Textform widerspricht.

§ 4 Mitwirkung des Auftraggebers
(1) Der Auftraggeber stellt alle für die Leistung erforderlichen Informationen, Inhalte, Daten, Zugänge, Freigaben und Entscheidungen rechtzeitig, vollständig und in einem gängigen Format zur Verfügung und benennt einen entscheidungsbefugten Ansprechpartner.
(2) Der Auftraggeber prüft Entwürfe, Konzepte und Zwischenergebnisse innerhalb von [z. B. 5] Werktagen und teilt Freigaben oder Änderungswünsche in Textform mit. Äußert er sich nicht, darf der Auftragnehmer die Arbeiten auf Grundlage des vorgelegten Stands fortsetzen; verbindliche Termine verschieben sich entsprechend.
(3) Der Auftraggeber versichert, dass er an allen von ihm überlassenen Inhalten (Texte, Bilder, Logos, Daten, Software) die erforderlichen Rechte besitzt und dass die Inhalte keine Rechte Dritter und keine gesetzlichen Vorschriften verletzen. Er stellt den Auftragnehmer von Ansprüchen Dritter frei, die aus der Verwendung dieser Inhalte entstehen, einschließlich angemessener Rechtsverfolgungskosten.
(4) Die rechtliche Prüfung der erbrachten Leistungen (z. B. Wettbewerbs-, Marken-, Datenschutz- oder Kennzeichnungsrecht) ist nicht Gegenstand des Auftrags, soweit nicht ausdrücklich vereinbart. Der Auftragnehmer weist auf erkennbare rechtliche Risiken hin; die abschließende Prüfung obliegt dem Auftraggeber.
(5) Erbringt der Auftraggeber Mitwirkungsleistungen nicht oder verspätet, kann der Auftragnehmer den dadurch entstehenden Mehraufwand zu den vereinbarten Stundensätzen berechnen und, nach Setzung einer angemessenen Nachfrist, den Vertrag kündigen.

§ 5 Vergütung, Fälligkeit, Verzug
(1) Die Vergütung richtet sich nach dem Angebot (Pauschalpreis, Stundensatz oder monatliche Pauschale). Soweit nichts anderes vereinbart ist, gilt ein Stundensatz von [Betrag] EUR. Alle Preise verstehen sich netto zuzüglich der gesetzlichen Umsatzsteuer.
(2) Bei Abrechnung nach Aufwand erstellt der Auftragnehmer einen Tätigkeitsnachweis; abgerechnet wird in Einheiten von [z. B. 15] Minuten. Reisekosten, Fremdkosten (Lizenzen, Stockmaterial, Hosting, Werbebudgets) und sonstige Auslagen werden nach Nachweis gesondert berechnet, sofern sie nicht im Angebot enthalten sind.
(3) Bei Projekten mit einer Vergütung über [Betrag] EUR netto ist der Auftragnehmer berechtigt, [z. B. 50] % bei Auftragserteilung und den Rest nach Abnahme bzw. Fertigstellung zu berechnen. Laufende Leistungen werden monatlich im Voraus berechnet.
(4) Rechnungen sind innerhalb von [z. B. 14] Tagen nach Zugang ohne Abzug fällig. Bei Zahlungsverzug schuldet der Auftraggeber Verzugszinsen in Höhe von 9 Prozentpunkten über dem Basiszinssatz (§ 288 Abs. 2 BGB) sowie die Pauschale von 40 EUR (§ 288 Abs. 5 BGB); die Geltendmachung eines weiteren Schadens bleibt vorbehalten.
(5) Bei Zahlungsverzug kann der Auftragnehmer nach Mahnung die weitere Leistung bis zum Zahlungseingang zurückhalten und die Einräumung von Nutzungsrechten nach § 7 verweigern.
(6) Der Auftraggeber kann nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen aufrechnen oder ein Zurückbehaltungsrecht ausüben.

§ 6 Abnahme bei Werkleistungen
(1) Soweit der Auftragnehmer eine Werkleistung schuldet (z. B. Website, Software, Gestaltungsleistung mit vereinbartem Ergebnis), erklärt der Auftraggeber nach Fertigstellung die Abnahme. Der Auftragnehmer kann Teilabnahmen für in sich abgeschlossene Teilleistungen verlangen.
(2) Der Auftraggeber prüft die Leistung innerhalb von [z. B. 10] Werktagen nach Mitteilung der Fertigstellung und erklärt die Abnahme oder teilt wesentliche Mängel in Textform mit. Unwesentliche Mängel berechtigen nicht zur Verweigerung der Abnahme; sie werden im Rahmen der Gewährleistung behoben.
(3) Die Leistung gilt als abgenommen, wenn der Auftraggeber innerhalb der Frist nach Absatz 2 keinen wesentlichen Mangel in Textform rügt und der Auftragnehmer ihn bei Mitteilung der Fertigstellung auf diese Folge hingewiesen hat (§ 640 Abs. 2 BGB). Die Abnahme gilt ferner als erklärt, wenn der Auftraggeber die Leistung produktiv nutzt, insbesondere eine Website oder Software öffentlich freischaltet oder Gestaltungen veröffentlicht.

§ 7 Nutzungsrechte
(1) Der Auftragnehmer räumt dem Auftraggeber an den vertragsgemäß erstellten Arbeitsergebnissen (Konzepte, Texte, Gestaltungen, Quellcode, Fotos, Videos) das [einfache / ausschließliche] Recht ein, sie für den vertraglich vereinbarten Zweck [in folgenden Medien und Gebieten: [z. B. „online weltweit, Print im deutschsprachigen Raum“]] zeitlich unbefristet zu nutzen, zu vervielfältigen, zu verbreiten und öffentlich zugänglich zu machen. Darüber hinausgehende Nutzungen (andere Medien, Weiterverkauf, Lizenzierung an Dritte) bedürfen einer gesonderten Vereinbarung gegen zusätzliche Vergütung.
(2) Die Einräumung der Nutzungsrechte wird erst mit vollständiger Zahlung der vereinbarten Vergütung wirksam. Bis dahin ist jede Nutzung nur widerruflich gestattet.
(3) Bearbeitungen und Änderungen der Arbeitsergebnisse durch den Auftraggeber sind zulässig, soweit sie den Vertragszweck nicht verfälschen; das Urheberpersönlichkeitsrecht bleibt unberührt. [Bei Software: Der Auftraggeber erhält den Quellcode und darf ihn für eigene Zwecke bearbeiten und weiterentwickeln.]
(4) Entwürfe, Konzepte und Präsentationen, die nicht beauftragt werden (z. B. abgelehnte Alternativen), bleiben Eigentum des Auftragnehmers und dürfen vom Auftraggeber nicht verwendet werden.
(5) Für eingesetzte Fremdsoftware, Open-Source-Komponenten, Schriften, Stockmaterial und Plattformen gelten die Lizenzbedingungen der jeweiligen Anbieter, auf die der Auftragnehmer hinweist. Der Auftragnehmer darf Werkzeuge, Bibliotheken und allgemeines Know-how, die nicht speziell für den Auftraggeber entwickelt wurden, weiterhin frei verwenden.
(6) Der Auftragnehmer darf auf den Arbeitsergebnissen in branchenüblicher Form als Urheber genannt werden, soweit der Auftraggeber dem nicht aus berechtigtem Interesse widerspricht.

§ 8 Gewährleistung
(1) Bei Werkleistungen leistet der Auftragnehmer für Mängel zunächst Nacherfüllung nach seiner Wahl durch Nachbesserung oder Neuherstellung. Schlägt die Nacherfüllung zweimal fehl, kann der Auftraggeber mindern oder, bei erheblichen Mängeln, vom Vertrag zurücktreten.
(2) Der Auftraggeber rügt Mängel unverzüglich nach Entdeckung in Textform mit nachvollziehbarer Beschreibung. Die Verjährungsfrist für Mängelansprüche beträgt zwölf Monate ab Abnahme; dies gilt nicht bei Vorsatz, Arglist, Personenschäden und Ansprüchen nach § 9 Abs. 1.
(3) Keine Mängel sind Abweichungen, die auf vom Auftraggeber gelieferten Inhalten, seinen Änderungen an den Arbeitsergebnissen, auf Änderungen von Drittsystemen (Browser, Plattformen, Schnittstellen, Algorithmen) nach Abnahme oder auf nicht vereinbarten Einsatzbedingungen beruhen.
(4) Bei Dienstleistungen besteht keine Gewährleistung für einen bestimmten Erfolg. Der Auftragnehmer bessert erkennbar sorgfaltswidrig erbrachte Tätigkeiten unentgeltlich nach.

§ 9 Haftung
(1) Der Auftragnehmer haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit, für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, bei arglistigem Verschweigen eines Mangels, bei Übernahme einer Garantie und nach dem Produkthaftungsgesetz.
(2) Bei leicht fahrlässiger Verletzung einer wesentlichen Vertragspflicht (Pflicht, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Auftraggeber regelmäßig vertrauen darf) ist die Haftung auf den vertragstypischen, bei Vertragsschluss vorhersehbaren Schaden begrenzt, höchstens jedoch auf [z. B. die Auftragssumme des betroffenen Auftrags / [Betrag] EUR je Schadensfall].
(3) Im Übrigen ist die Haftung für leichte Fahrlässigkeit ausgeschlossen. Dies gilt insbesondere für entgangenen Gewinn, ausgebliebene Einsparungen, mittelbare Schäden und Folgeschäden.
(4) Für den Verlust von Daten haftet der Auftragnehmer nur in dem Umfang, der auch bei ordnungsgemäßer, regelmäßiger Datensicherung durch den Auftraggeber entstanden wäre.
(5) Die Haftungsbeschränkungen gelten auch zugunsten der Mitarbeiter, Vertreter und Erfüllungsgehilfen des Auftragnehmers.

§ 10 Geheimhaltung und Datenschutz
(1) Die Parteien behandeln alle im Rahmen der Zusammenarbeit erlangten vertraulichen Informationen der anderen Partei (Geschäftsgeheimnisse, Kundendaten, Konditionen, Strategien, nicht veröffentlichte Arbeitsergebnisse) vertraulich, verwenden sie nur für den Vertragszweck und geben sie nur an Mitarbeiter und Subunternehmer weiter, die sie für die Durchführung benötigen und entsprechend verpflichtet sind. Die Pflicht gilt für [z. B. 3] Jahre nach Vertragsende fort.
(2) Ausgenommen sind Informationen, die öffentlich bekannt sind oder ohne Verschulden der empfangenden Partei werden, die sie rechtmäßig von Dritten erhalten hat oder die aufgrund gesetzlicher oder behördlicher Anordnung offenzulegen sind.
(3) Verarbeitet der Auftragnehmer im Auftrag personenbezogene Daten des Auftraggebers (z. B. Kundendaten, Newsletter-Empfänger, Nutzerdaten), schließen die Parteien vor Beginn der Verarbeitung einen Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO. Beide Parteien halten die datenschutzrechtlichen Vorschriften ein.

§ 11 Laufzeit und Kündigung
(1) Verträge über einmalige Projekte enden mit Erbringung der Leistung und Zahlung der Vergütung. Die Kündigung eines Werkvertrags durch den Auftraggeber nach § 648 BGB bleibt möglich; der Auftragnehmer kann dann die vereinbarte Vergütung abzüglich ersparter Aufwendungen verlangen, pauschal [z. B. 40] % der auf den noch nicht erbrachten Teil entfallenden Vergütung, sofern der Auftraggeber nicht höhere ersparte Aufwendungen nachweist.
(2) Verträge über laufende Leistungen (Betreuung, Wartung, Retainer) haben eine Mindestlaufzeit von [z. B. 6] Monaten und verlängern sich danach jeweils um [z. B. einen Monat], wenn sie nicht mit einer Frist von [z. B. 4] Wochen zum Ende der jeweiligen Laufzeit in Textform gekündigt werden.
(3) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Ein wichtiger Grund liegt für den Auftragnehmer insbesondere vor, wenn der Auftraggeber mit zwei Rechnungen trotz Mahnung in Verzug ist, Mitwirkungspflichten nach Nachfristsetzung nicht erfüllt oder Inhalte liefert, deren Verwendung gegen Gesetze verstößt.
(4) Bei Beendigung stellt der Auftragnehmer dem Auftraggeber die bis dahin bezahlten Arbeitsergebnisse in einem gängigen Format zur Verfügung und übergibt Zugangsdaten, die im Namen des Auftraggebers angelegt wurden.

§ 12 Schlussbestimmungen, Gerichtsstand
(1) Änderungen und Ergänzungen des Vertrags bedürfen der Textform. Dies gilt auch für die Änderung dieser Klausel.
(2) Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.
(3) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
(4) Ausschließlicher Gerichtsstand für alle Streitigkeiten aus und im Zusammenhang mit dem Vertrag ist [Ort], sofern der Auftraggeber Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist oder keinen allgemeinen Gerichtsstand in Deutschland hat. Der Auftragnehmer darf den Auftraggeber auch an dessen allgemeinem Gerichtsstand verklagen.

Stand: [Datum]
[Firma des Dienstleisters], [Ort]

${VORLAGEN_HINWEIS}`,
  },
];
