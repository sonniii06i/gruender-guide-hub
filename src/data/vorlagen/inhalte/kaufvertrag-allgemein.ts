// Inhalt der Vorlage „kaufvertrag-allgemein“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../kauf.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen Kaufvertrag zwischen Unternehmern brauchst",
        text: "Ein Kaufvertrag kommt rechtlich schon zustande, wenn du per E-Mail eine Bestellung bestätigst. Trotzdem lohnt sich ein schriftlicher Vertrag, sobald ein nennenswerter Betrag fließt, die Ware erst später geliefert wird oder du als Verkäufer dein Eigentum bis zur Zahlung sichern willst. Typische Fälle für Gründer und Händler: Du kaufst zwanzig gebrauchte Notebooks von einem Unternehmen, das seine Flotte erneuert. Du verkaufst eine Palette Restware an einen anderen Händler. Du beziehst einmalig Maschinenteile oder Verpackungsmaterial, ohne dass es einen Rahmenvertrag gibt.\n\nDieses Kaufvertrag-Muster ist für genau diese einmaligen Geschäfte zwischen Unternehmern gedacht. Es ersetzt keinen Rahmenliefervertrag für wiederkehrende Lieferungen und passt nicht für den Verkauf an Verbraucher, weil dort Rügepflicht, verkürzte Gewährleistung und Gefahrübergang beim Versand unzulässig wären.",
      },
      {
        titel: "Was muss in einen B2B-Kaufvertrag? Die Pflichtinhalte",
        text: "Damit der Vertrag im Streitfall hält, müssen die folgenden Punkte eindeutig geregelt sein. Die Vorlage ordnet sie in neun Paragraphen:\n\n- Parteien mit Firma, Rechtsform, Vertreter, Handelsregister und USt-IdNr. (Rubrum)\n- Kaufgegenstand mit Menge, Modell, Artikelnummer, EAN und Zustand (§ 1), bei vielen Positionen als Anlage 1\n- Kaufpreis netto und brutto, Fälligkeit, Zahlungsweg, optional Skonto (§ 2)\n- Lieferart, Liefertermin, Transportkosten und Gefahrübergang (§ 3)\n- Eigentumsvorbehalt bis zur vollständigen Zahlung, optional verlängert mit Vorausabtretung (§ 4)\n- Untersuchungs- und Rügepflicht mit konkreter Frist in Werktagen (§ 5)\n- Gewährleistungsfrist und Nacherfüllung (§ 6), Haftungsbegrenzung (§ 7)\n- Annahmeverzug, Rücktritt, Unsicherheitseinrede (§ 8)\n- Schriftform, Ausschluss fremder AGB, Rechtswahl, Gerichtsstand, Anlagen (§ 9)\n\nBesonders wichtig ist die Beschaffenheitsvereinbarung in § 1 Abs. 2: Nur was dort steht, ist geschuldet. Prospektangaben und Herstellerwerbung werden ausdrücklich ausgeschlossen, damit kein Streit über Nebensätze aus einem Datenblatt entsteht.",
      },
      {
        titel: "Kaufvertrag-Muster Schritt für Schritt ausfüllen",
        text: "Lade die Vorlage als Word-Datei herunter und arbeite die Platzhalter in eckigen Klammern von oben nach unten ab. Beginne mit dem Rubrum: Firma, Rechtsform, Anschrift, vertretungsberechtigte Person, Handelsregisternummer und USt-IdNr. beider Seiten. Trage in § 1 Menge, Bezeichnung, Hersteller, Modell, Artikelnummer, EAN und Zustand ein; bei mehr als drei Positionen lege eine Artikelliste als Anlage 1 an und verweise darauf.\n\nIn § 2 setzt du Netto- und Bruttobetrag ein, wählst die Fälligkeit (nach Rechnung, bei Übergabe oder im Voraus) und trägst IBAN und Bank ein. Streiche die Skonto-Zeile, wenn du keins gewährst. In § 3 entscheidest du zwischen Abholung, Versand und frei Haus, nennst den Liefertermin und wer die Transportkosten trägt; die beiden Varianten zum Gefahrübergang in Absatz 3 schließen sich aus, eine bleibt stehen. Setze die Rügefrist in § 5 (üblich sind drei bis fünf Werktage), die Gewährleistungsfrist in § 6 Abs. 3 und die Haftungsobergrenze in § 7 Abs. 2. Zum Schluss Gerichtsstand, Erfüllungsort, Ort und Datum, dann unterschreiben beide Seiten in zweifacher Ausfertigung.",
      },
      {
        titel: "Typische Fehler im B2B-Kaufvertrag und wie du sie vermeidest",
        text: "Der häufigste Fehler ist ein ungenauer Kaufgegenstand. „10 Bürostühle“ sagt nichts über Modell, Zustand oder Zubehör; später behauptet der Käufer, er habe die höherwertige Variante gemeint. Schreibe Seriennummern, Artikelnummern und Zustand auf und hänge Fotos als Anlage an.\n\nZweiter Fehler: Der Eigentumsvorbehalt steht nur auf der Rechnung. Er muss vor der Übergabe vereinbart sein, sonst ist er wertlos. Drittens vergessen Verkäufer, dass die Rügefrist aus § 5 auch organisiert werden muss: Wer als Käufer die Ware erst nach vier Wochen auspackt, hat offensichtliche Mängel nach § 377 HGB bereits genehmigt. Viertens werden Haftungsklauseln überzogen formuliert; ein Ausschluss, der auch Vorsatz, grobe Fahrlässigkeit oder Personenschäden erfasst, ist in Formularverträgen insgesamt unwirksam. Die Vorlage nimmt diese Fälle deshalb ausdrücklich aus. Und schließlich: Ein mündlich zugesagter Liefertermin ist nichts wert, wenn § 3 „unverbindlich“ sagt. Entscheide dich bewusst.",
      },
      {
        titel: "Rechtliche Grundlagen: BGB, HGB, Gefahrübergang und Gewährleistung",
        text: "Der Kaufvertrag ist in §§ 433 ff. BGB geregelt. Der Verkäufer schuldet Übergabe und Eigentumsverschaffung einer mangelfreien Sache, der Käufer Zahlung und Abnahme. Zwischen Unternehmern gilt zusätzlich das HGB, vor allem § 377 HGB mit der Untersuchungs- und Rügepflicht. Die Gewährleistung beträgt nach § 438 BGB zwei Jahre ab Ablieferung; zwischen Unternehmern kann sie für neue Ware auf ein Jahr verkürzt werden, nicht aber bei Arglist oder für den Regress beim Weiterverkauf an Verbraucher (§§ 445a, 445b, 478 BGB).\n\nDie Gefahr des zufälligen Untergangs geht nach § 446 BGB mit Übergabe über, beim Versendungskauf zwischen Unternehmern bereits mit Übergabe an den Transporteur (§ 447 BGB). Der Eigentumsvorbehalt nach § 449 BGB sichert den Verkäufer bis zur vollständigen Zahlung. Bei Zahlungsverzug schuldet der Käufer Zinsen von neun Prozentpunkten über dem Basiszinssatz und die Pauschale von 40 Euro (§ 288 BGB). Eine Form ist für den Kauf beweglicher Sachen nicht vorgeschrieben; die Schriftform dient dem Beweis. Notarpflicht besteht nur bei Grundstücken und GmbH-Anteilen.",
      },
      {
        titel: "Wann die kostenlose Vorlage nicht reicht",
        text: "Für Standardgeschäfte zwischen zwei deutschen Unternehmen ist das Muster ausreichend. Hol dir Rat, wenn der Käufer im Ausland sitzt: Dann stellen sich Fragen zu UN-Kaufrecht (die Vorlage schließt es aus), Incoterms, Zoll und zur umsatzsteuerfreien innergemeinschaftlichen Lieferung mit Gelangensbestätigung. Bei Verkäufen an Verbraucher brauchst du andere Regeln, bei Online-Verkauf eine Widerrufsbelehrung und AGB.\n\nGeht es um Maschinen mit Probelauf, Fahrzeuge mit Zulassungspapieren, ganze Warenlager oder ein Unternehmen mit Mitarbeitern, nutze die spezialisierten Kaufvertrag-Vorlagen in dieser Bibliothek. Wird der Kaufvertrag mehrfach verwendet, gilt er als AGB und unterliegt der strengen Klauselkontrolle; dann sollte ein Anwalt die Haftungs- und Gewährleistungsklauseln prüfen. GründerX ist Software und bietet keine Rechtsberatung; die Vorlage ist ein Ausgangspunkt, den du an dein Geschäft anpasst.",
      },
    ],
  text: `Kaufvertrag über bewegliche Sachen

zwischen

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], Handelsregister [Amtsgericht, HRB-Nummer], USt-IdNr. [DE…]
– nachfolgend „Verkäufer“ –

und

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], Handelsregister [Amtsgericht, HRB-Nummer], USt-IdNr. [DE…]
– nachfolgend „Käufer“ –

Vorbemerkung
Beide Parteien handeln bei Abschluss dieses Vertrags in Ausübung ihrer gewerblichen oder selbständigen beruflichen Tätigkeit (§ 14 BGB). Verbraucherschutzvorschriften finden keine Anwendung.

§ 1 Kaufgegenstand
(1) Der Verkäufer verkauft dem Käufer folgende Waren (nachfolgend „Kaufgegenstand“):
   [Menge] Stück [genaue Bezeichnung, Hersteller, Modell, Artikelnummer, EAN], Zustand: [neu / neuwertig / gebraucht]
   [ggf. weitere Positionen oder Verweis auf Anlage 1 (Artikelliste)]
(2) Beschaffenheit des Kaufgegenstands ist ausschließlich die in Absatz 1 und in Anlage 1 beschriebene. Öffentliche Äußerungen des Herstellers, Prospektangaben und Werbung werden nur Vertragsinhalt, wenn sie in diesem Vertrag ausdrücklich in Bezug genommen werden.
(3) Mitverkauft sind: [Zubehör, Originalverpackung, Bedienungsanleitungen, Garantiekarten, Lizenzschlüssel].

§ 2 Kaufpreis und Zahlung
(1) Der Kaufpreis beträgt [Betrag] EUR netto zuzüglich der gesetzlichen Umsatzsteuer von derzeit 19 %, also [Betrag] EUR brutto. [Alternativ bei innergemeinschaftlicher Lieferung: Die Lieferung ist als innergemeinschaftliche Lieferung umsatzsteuerfrei; der Käufer stellt seine gültige USt-IdNr. und die Gelangensbestätigung bei.]
(2) Der Kaufpreis ist [innerhalb von [z. B. 14] Tagen nach Rechnungsstellung und Lieferung / bei Übergabe / im Voraus bis zum [Datum]] ohne Abzug zur Zahlung fällig. Zahlung erfolgt per Überweisung auf das Konto des Verkäufers: [IBAN], [Bank].
(3) [Optional: Bei Zahlung innerhalb von [z. B. 7] Tagen nach Rechnungsdatum gewährt der Verkäufer [z. B. 2] % Skonto.]
(4) Eine Aufrechnung ist dem Käufer nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen gestattet. Ein Zurückbehaltungsrecht kann der Käufer nur wegen Gegenansprüchen aus demselben Vertragsverhältnis geltend machen.
(5) Gerät der Käufer in Zahlungsverzug, schuldet er Verzugszinsen in Höhe von 9 Prozentpunkten über dem jeweiligen Basiszinssatz (§ 288 Abs. 2 BGB) sowie die Verzugspauschale von 40 EUR (§ 288 Abs. 5 BGB). Die Geltendmachung eines weitergehenden Schadens bleibt vorbehalten.

§ 3 Lieferung, Gefahrübergang und Verzug
(1) Die Lieferung erfolgt [ab Lager des Verkäufers (Abholung durch den Käufer) / durch Versand an die Adresse des Käufers [Lieferadresse] / frei Haus] bis spätestens [Datum / Kalenderwoche].
(2) Die Kosten des Transports und der Transportversicherung trägt [der Käufer / der Verkäufer]. Verpackung erfolgt handelsüblich.
(3) Die Gefahr des zufälligen Untergangs und der zufälligen Verschlechterung geht [mit Übergabe an den Käufer / beim Versendungskauf mit Übergabe an den Spediteur, Frachtführer oder die sonst zur Ausführung der Versendung bestimmte Person (§ 447 BGB)] auf den Käufer über. Gleiches gilt, wenn der Käufer in Annahmeverzug gerät.
(4) Teillieferungen sind zulässig, soweit sie dem Käufer zumutbar sind; sie werden gesondert abgerechnet.
(5) Liefertermine sind [verbindlich / unverbindlich]. Bei Überschreitung eines verbindlichen Liefertermins hat der Käufer dem Verkäufer schriftlich eine angemessene Nachfrist von mindestens [z. B. 14] Tagen zu setzen. Nach fruchtlosem Ablauf kann der Käufer vom Vertrag zurücktreten.
(6) Ereignisse höherer Gewalt (insbesondere Naturkatastrophen, Krieg, behördliche Anordnungen, Epidemien, Streik, nicht vom Verkäufer zu vertretende Ausfälle von Vorlieferanten) verlängern die Lieferfrist um die Dauer der Störung. Dauert die Störung länger als [z. B. 3] Monate, kann jede Partei vom Vertrag zurücktreten.

§ 4 Eigentumsvorbehalt
(1) Der Kaufgegenstand bleibt bis zur vollständigen Zahlung des Kaufpreises Eigentum des Verkäufers (einfacher Eigentumsvorbehalt, § 449 BGB).
(2) Der Käufer ist verpflichtet, die Vorbehaltsware pfleglich zu behandeln und auf eigene Kosten gegen Feuer, Wasser und Diebstahl zum Neuwert zu versichern. Zugriffe Dritter (insbesondere Pfändungen) hat er dem Verkäufer unverzüglich anzuzeigen.
(3) [Optional, verlängerter Eigentumsvorbehalt: Der Käufer darf die Vorbehaltsware im ordnungsgemäßen Geschäftsgang weiterveräußern. Er tritt bereits jetzt alle Forderungen aus der Weiterveräußerung in Höhe des Rechnungsbetrags an den Verkäufer ab; der Verkäufer nimmt die Abtretung an. Der Käufer bleibt zur Einziehung ermächtigt, solange er seinen Zahlungspflichten nachkommt.]
(4) Bei vertragswidrigem Verhalten des Käufers, insbesondere bei Zahlungsverzug, ist der Verkäufer nach Rücktritt vom Vertrag berechtigt, die Vorbehaltsware herauszuverlangen.

§ 5 Untersuchungs- und Rügepflicht
(1) Der Käufer hat den Kaufgegenstand unverzüglich nach Ablieferung zu untersuchen und erkennbare Mängel, Falschlieferungen und Mengenabweichungen dem Verkäufer unverzüglich, spätestens innerhalb von [z. B. 5] Werktagen nach Ablieferung, schriftlich oder in Textform anzuzeigen (§ 377 HGB).
(2) Verdeckte Mängel sind unverzüglich nach ihrer Entdeckung anzuzeigen.
(3) Unterlässt der Käufer die rechtzeitige Anzeige, gilt die Ware als genehmigt, es sei denn, der Verkäufer hat den Mangel arglistig verschwiegen.
(4) Transportschäden sind zusätzlich dem Transporteur bei Ablieferung anzuzeigen und auf dem Lieferschein zu vermerken.

§ 6 Gewährleistung
(1) Der Verkäufer leistet Gewähr dafür, dass der Kaufgegenstand bei Gefahrübergang die vereinbarte Beschaffenheit gemäß § 1 hat und frei von Rechten Dritter ist (§§ 434, 435 BGB).
(2) Bei Mängeln ist der Verkäufer zunächst nach seiner Wahl zur Nacherfüllung durch Beseitigung des Mangels oder Lieferung einer mangelfreien Sache berechtigt. Schlägt die Nacherfüllung zweimal fehl, ist sie unmöglich oder unzumutbar oder verweigert der Verkäufer sie, kann der Käufer den Kaufpreis mindern oder vom Vertrag zurücktreten.
(3) Die Gewährleistungsfrist beträgt [12 Monate / 24 Monate] ab Ablieferung. [Bei gebrauchten Sachen: Die Gewährleistung für gebrauchte Sachen wird auf [12 Monate] ab Ablieferung begrenzt.] Diese Verkürzung gilt nicht für Schadensersatzansprüche wegen Verletzung von Leben, Körper oder Gesundheit, bei Vorsatz oder grober Fahrlässigkeit, bei arglistig verschwiegenen Mängeln sowie im Fall des Lieferantenregresses nach §§ 445a, 445b, 478 BGB.
(4) Natürlicher Verschleiß, unsachgemäße Behandlung, Nichtbeachtung der Bedienungsanleitung und Eingriffe Dritter begründen keine Gewährleistungsansprüche.
(5) Eine Garantie im Rechtssinne übernimmt der Verkäufer nur, wenn dies ausdrücklich schriftlich als „Garantie“ bezeichnet ist. Herstellergarantien bleiben unberührt.

§ 7 Haftung
(1) Der Verkäufer haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit, für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, nach dem Produkthaftungsgesetz sowie im Umfang einer übernommenen Garantie.
(2) Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten (Pflichten, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Käufer regelmäßig vertrauen darf) ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt, höchstens jedoch auf [den Kaufpreis / [Betrag] EUR].
(3) Im Übrigen ist die Haftung für leichte Fahrlässigkeit ausgeschlossen. Dies gilt insbesondere für entgangenen Gewinn, Produktionsausfall und mittelbare Schäden.
(4) Die vorstehenden Haftungsbeschränkungen gelten auch zugunsten der Mitarbeiter, Vertreter und Erfüllungsgehilfen des Verkäufers.

§ 8 Rücktritt und Annahmeverzug
(1) Nimmt der Käufer den Kaufgegenstand am vereinbarten Liefertermin nicht ab, kann der Verkäufer nach Setzung einer Nachfrist von [z. B. 10] Tagen vom Vertrag zurücktreten und Schadensersatz verlangen. Lagerkosten während des Annahmeverzugs trägt der Käufer mit pauschal [z. B. 0,5] % des Netto-Kaufpreises je angefangene Woche; der Nachweis eines geringeren oder höheren Schadens bleibt beiden Seiten vorbehalten.
(2) Wird nach Vertragsschluss erkennbar, dass der Anspruch auf den Kaufpreis durch mangelnde Leistungsfähigkeit des Käufers gefährdet ist, kann der Verkäufer die Lieferung bis zur Zahlung oder Sicherheitsleistung verweigern (§ 321 BGB).

§ 9 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; dies gilt auch für die Aufhebung dieses Schriftformerfordernisses. E-Mail genügt der Schriftform nicht; Textform genügt für die Anzeigen nach § 5.
(2) Allgemeine Geschäftsbedingungen des Käufers werden nicht Vertragsbestandteil, auch wenn der Verkäufer ihnen nicht ausdrücklich widerspricht.
(3) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Anstelle der unwirksamen Bestimmung gilt die gesetzliche Regelung.
(4) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG).
(5) Ausschließlicher Gerichtsstand für alle Streitigkeiten aus diesem Vertrag ist [Ort], sofern beide Parteien Kaufleute, juristische Personen des öffentlichen Rechts oder öffentlich-rechtliche Sondervermögen sind. Erfüllungsort ist [Ort].
(6) Anlagen: Anlage 1 – Artikelliste; [Anlage 2 – Lieferschein-Muster]. Die Anlagen sind Bestandteil dieses Vertrags.

[Ort], den [Datum]


______________________________
[Firma Verkäufer], vertreten durch [Vorname Nachname]


______________________________
[Firma Käufer], vertreten durch [Vorname Nachname]

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
