import { VORLAGEN_HINWEIS, type Vorlage } from "./types";

// Kaufverträge: Waren, Fahrzeuge, Inventar, Maschinen, Warenlager, Domains,
// Websites, Unternehmen (Asset Deal), FBA-Geschäfte, Rahmenlieferung, Kommission.
// Rechtsstand: BGB (Kaufrecht §§ 433 ff., Gewährleistung §§ 434 ff.), HGB
// (§ 25, § 377, §§ 383 ff.), § 613a BGB. Stand 2026-10.

export const VORLAGEN_KAUF: Vorlage[] = [
  {
    slug: "kaufvertrag-allgemein",
    titel: "Kaufvertrag über bewegliche Sachen (B2B)",
    kurz: "Allgemeiner Kaufvertrag zwischen Unternehmern mit Lieferung, Gefahrübergang, Eigentumsvorbehalt und Rügepflicht nach HGB.",
    kategorie: "kauf",
    dateiname: "Kaufvertrag-B2B",
    wofuer: [
      "Du kaufst oder verkaufst Waren, Geräte oder Material an ein anderes Unternehmen",
      "Einmaliger Kauf ohne Rahmenvertrag, aber mit klaren Regeln zu Lieferung und Mängeln",
      "Wenn du als Verkäufer dein Eigentum bis zur vollständigen Zahlung sichern willst",
      "Wenn du als Käufer wissen willst, bis wann du Mängel rügen musst",
    ],
    enthaelt: [
      "§ 1 Kaufgegenstand",
      "§ 2 Kaufpreis und Zahlung",
      "§ 3 Lieferung, Gefahrübergang und Verzug",
      "§ 4 Eigentumsvorbehalt",
      "§ 5 Untersuchungs- und Rügepflicht",
      "§ 6 Gewährleistung",
      "§ 7 Haftung",
      "§ 8 Rücktritt und Verzug",
      "§ 9 Schlussbestimmungen",
    ],
    hinweise: [
      "Zwischen Kaufleuten gilt § 377 HGB: Wer die Ware nicht unverzüglich untersucht und erkennbare Mängel nicht sofort rügt, verliert seine Gewährleistungsrechte. Das steht in der Vorlage, musst du aber im Betrieb auch tatsächlich organisieren.",
      "Der Haftungsausschluss darf nie Vorsatz, grobe Fahrlässigkeit, Verletzung von Leben, Körper und Gesundheit oder wesentliche Vertragspflichten erfassen – sonst ist die ganze Klausel unwirksam (§§ 307, 309 BGB bei Formularverträgen).",
      "Der Eigentumsvorbehalt schützt nur, wenn er vor der Übergabe vereinbart wurde. Ein Aufdruck auf der Rechnung reicht nicht.",
      "Prüfe die Umsatzsteuer: Verkauf an ein Unternehmen im EU-Ausland mit gültiger USt-IdNr ist steuerfrei als innergemeinschaftliche Lieferung – nur mit Belegen (Gelangensbestätigung).",
    ],
    faqs: [
      {
        q: "Wann geht die Gefahr auf den Käufer über?",
        a: "Nach § 446 BGB mit der Übergabe. Beim Versendungskauf zwischen Unternehmern schon mit Übergabe an den Transporteur (§ 447 BGB). Ab dann trägt der Käufer das Risiko, dass die Ware unterwegs beschädigt wird oder verloren geht. Die Vorlage lässt dich zwischen beiden Varianten wählen.",
      },
      {
        q: "Wie lange habe ich als Käufer Gewährleistungsrechte?",
        a: "Gesetzlich zwei Jahre ab Ablieferung (§ 438 BGB). Zwischen Unternehmern lässt sich die Frist für neue Ware auf ein Jahr verkürzen; die Vorlage sieht das als Option vor. Vorsicht: Bei arglistig verschwiegenen Mängeln gilt die Verkürzung nicht.",
      },
      {
        q: "Was passiert, wenn der Käufer nicht zahlt?",
        a: "Nach Fälligkeit und Ablauf der Zahlungsfrist gerät der Käufer in Verzug, bei Unternehmern spätestens 30 Tage nach Rechnung. Es fallen Verzugszinsen von 9 Prozentpunkten über dem Basiszinssatz an (§ 288 Abs. 2 BGB) und eine Pauschale von 40 EUR. Dank Eigentumsvorbehalt kannst du die Ware außerdem zurückverlangen.",
      },
      {
        q: "Gilt die Vorlage auch für Verkäufe an Verbraucher?",
        a: "Nein. Gegenüber Verbrauchern sind viele Klauseln unzulässig (Rügepflicht, verkürzte Gewährleistung, Gefahrübergang beim Versand). Für Verbraucher brauchst du die Regeln des Verbrauchsgüterkaufs (§§ 474 ff. BGB) und bei Online-Verkauf die Widerrufsbelehrung.",
      },
    ],
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
    seo: {
      title: "Kaufvertrag B2B Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "Kaufvertrag zwischen Unternehmern als kostenlose Vorlage: Kaufgegenstand, Zahlung, Lieferung, Eigentumsvorbehalt, Rügepflicht § 377 HGB, Gewährleistung.",
    },
    stand: "2026-10",
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
  },
  {
    slug: "kaufvertrag-privat-gebraucht",
    titel: "Kaufvertrag gebrauchte Sache (privat)",
    kurz: "Kaufvertrag zwischen Privatpersonen über eine gebrauchte Sache mit wirksamem Gewährleistungsausschluss und Zustandsbeschreibung.",
    kategorie: "kauf",
    dateiname: "Kaufvertrag-Privat-Gebraucht",
    wofuer: [
      "Du verkaufst oder kaufst privat ein gebrauchtes Gerät, Möbel, Fahrrad, Instrument oder Ähnliches",
      "Übergaben über Kleinanzeigen, eBay Kleinanzeigen-Nachfolger oder im Bekanntenkreis mit Barzahlung",
      "Wenn du als Verkäufer die zweijährige Gewährleistung wirksam ausschließen willst",
      "Wenn beide Seiten den Zustand schriftlich festhalten wollen, um späteren Streit zu vermeiden",
    ],
    enthaelt: [
      "§ 1 Kaufgegenstand und Zustand",
      "§ 2 Kaufpreis und Zahlung",
      "§ 3 Übergabe und Gefahrübergang",
      "§ 4 Ausschluss der Gewährleistung",
      "§ 5 Zusicherungen des Verkäufers",
      "§ 6 Eigentum und Rechte Dritter",
      "§ 7 Schlussbestimmungen",
      "Übergabebestätigung",
    ],
    hinweise: [
      "Der Gewährleistungsausschluss wirkt nur zwischen Privatpersonen. Sobald eine Seite gewerblich handelt (auch Vielverkäufer auf Marktplätzen), ist der Ausschluss gegenüber einem Verbraucher unwirksam (§ 476 BGB).",
      "Arglistig verschwiegene Mängel und ausdrückliche Zusicherungen bleiben trotz Ausschluss haftungsrelevant (§ 444 BGB). Schreibe alle bekannten Mängel ehrlich in § 1.",
      "Sei vorsichtig mit Formulierungen wie „funktioniert einwandfrei“: Das kann als Beschaffenheitsgarantie gelten und hebelt den Ausschluss aus.",
      "Bei Barzahlung über 10.000 EUR gelten Pflichten nach dem Geldwäschegesetz für gewerbliche Händler; unter Privaten empfiehlt sich trotzdem Überweisung mit Verwendungszweck als Nachweis.",
    ],
    faqs: [
      {
        q: "Darf ich als Privatperson die Gewährleistung wirklich komplett ausschließen?",
        a: "Ja. Beim Verkauf unter Privatpersonen lässt sich die Sachmängelhaftung vertraglich ausschließen. Der Ausschluss gilt aber nicht für Mängel, die du kanntest und verschwiegen hast, und nicht für Eigenschaften, die du ausdrücklich zugesichert hast. Deshalb beschreibt die Vorlage den Zustand und die bekannten Mängel ausdrücklich.",
      },
      {
        q: "Was ist, wenn die Sache nach der Übergabe kaputtgeht?",
        a: "Mit Übergabe geht die Gefahr auf den Käufer über (§ 446 BGB). Wird die Sache danach beschädigt oder fällt sie aus, trägt der Käufer das Risiko, es sei denn, der Mangel war schon bei Übergabe angelegt und wurde arglistig verschwiegen. Ohne Gewährleistungsausschluss würde für sechs Monate vermutet, dass der Mangel schon bei Übergabe vorlag.",
      },
      {
        q: "Brauche ich zusätzlich eine Quittung?",
        a: "Die Vorlage enthält eine Übergabebestätigung, die beide unterschreiben. Sie dokumentiert Zahlung und Übergabe in einem Dokument. Bei Überweisung ist der Kontoauszug zusätzlich ein Beleg. Eine separate Quittung ist dann nicht nötig.",
      },
      {
        q: "Gilt der Vertrag auch für ein gebrauchtes Auto?",
        a: "Für Fahrzeuge solltest du den speziellen Kfz-Kaufvertrag verwenden, weil dort Fahrzeugidentnummer, Kilometerstand, HU, Unfallfreiheit und Ummeldung geregelt werden müssen. Für Fahrräder, E-Bikes, Elektronik, Möbel und Werkzeug passt diese Vorlage.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen privaten Kaufvertrag für Gebrauchtes brauchst",
        text: "Sobald du privat etwas verkaufst, das mehr als ein paar Euro wert ist, lohnt sich ein schriftlicher Kaufvertrag: das E-Bike über Kleinanzeigen, die Kamera an einen Bekannten, das gebrauchte MacBook aus dem Gründerbüro, das du als Privatperson angeschafft hast, Möbel beim Umzug oder ein Musikinstrument. Auch als Käufer profitierst du, weil der Vertrag Zustand, Zubehör und die Zusicherung festhält, dass die Sache nicht gestohlen oder finanziert ist.\n\nDieses Muster ist ausdrücklich für Geschäfte zwischen zwei Privatpersonen gedacht. Verkaufst du aus deinem Betriebsvermögen oder regelmäßig in größerem Umfang, giltst du als Unternehmer und darfst die Gewährleistung gegenüber Verbrauchern nicht ausschließen. Für Fahrzeuge nutze den Kfz-Kaufvertrag, weil dort Fahrzeugidentnummer, HU und Ummeldung geregelt werden müssen.",
      },
      {
        titel: "Was muss in einen Kaufvertrag für Gebrauchtes?",
        text: "Der Vertrag ist nur so gut wie seine Beschreibung des Kaufgegenstands. Die Vorlage verlangt deshalb in § 1 Bezeichnung, Seriennummer, Rahmennummer oder IMEI, Farbe, Baujahr und das mitverkaufte Zubehör. Darüber hinaus gehören hinein:\n\n- eine ehrliche Liste aller bekannten Mängel und Gebrauchsspuren (§ 1 Abs. 2)\n- die Bestätigung, dass der Käufer besichtigt und getestet hat (§ 1 Abs. 3)\n- Kaufpreis in Zahlen und Worten, Zahlungsweg und die Regel, dass erst nach Zahlungseingang übergeben wird (§ 2)\n- Übergabeort, Zeitpunkt und Gefahrübergang (§ 3)\n- der Gewährleistungsausschluss mit den gesetzlichen Ausnahmen (§ 4)\n- Zusicherungen des Verkäufers zu Eigentum und Lastenfreiheit (§ 5)\n- Eigentumsübergang, Garantieabtretung, Datenlöschung bei Geräten (§ 6)\n- Unterschriften beider Seiten und die Übergabebestätigung am Ende\n\nDie Übergabebestätigung ersetzt die Quittung: Sie dokumentiert Zahlung und Übernahme in einem Dokument.",
      },
      {
        titel: "Privatkaufvertrag Muster richtig ausfüllen",
        text: "Trage zuerst beide Parteien mit Name, Geburtsdatum, Anschrift und Ausweisnummer ein; lass dir den Ausweis bei der Übergabe zeigen. In § 1 beschreibst du die Sache so, dass ein Dritter sie eindeutig erkennt: Marke, Modell, Seriennummer, Farbe, Baujahr. Zähle dann alle Mängel auf, die du kennst, auch kleine, etwa Kratzer, Akkuzustand, Pixelfehler. Das Datum der Besichtigung und die Art des Tests (Probefahrt, Inbetriebnahme) kommen in Absatz 3.\n\nIn § 2 steht der Kaufpreis in Ziffern und in Worten. Wähle den Zahlungsweg: bar bei Übergabe, Überweisung mit Datum oder Sofortzahlung über einen Zahlungsdienst. Die Anzahlungsklausel streichst du, wenn es keine gibt. In § 3 trägst du Datum, Uhrzeit und Adresse der Übergabe ein; bei Versand die Versandkosten und ob versichert verschickt wird. In § 5 Buchstabe c ergänzt du nur Zusicherungen, die du wirklich belegen kannst, sonst schreibst du „keine weiteren Zusicherungen“. Die optionalen Absätze in § 6 zu Herstellergarantie und Nutzerkonten behältst du nur, wenn sie passen. Zum Schluss füllen beide die Übergabebestätigung aus und unterschreiben zwei Exemplare.",
      },
      {
        titel: "Typische Fehler beim Privatverkauf und wie du sie vermeidest",
        text: "Der teuerste Fehler ist ein verschwiegener Mangel. Der Gewährleistungsausschluss schützt dich nicht, wenn du von einem Defekt wusstest und ihn nicht genannt hast; dann haftest du wegen Arglist trotz Ausschluss. Schreibe lieber einen Mangel zu viel auf als einen zu wenig.\n\nZweiter Fehler: Formulierungen wie „voll funktionsfähig“ oder „wie neu“ in der Anzeige oder im Vertrag. Gerichte werten solche Aussagen schnell als Beschaffenheitsgarantie, die den Ausschluss aushebelt. Die Vorlage stellt in § 5 klar, dass Anzeigentexte Beschreibungen und keine Garantien sind. Dritter Fehler: Übergabe vor Zahlungseingang. Ein Überweisungsbeleg ist kein Geld; warte auf die Gutschrift. Vierter Fehler: Geräte mit aktivem Nutzerkonto übergeben. Ein iPhone mit Aktivierungssperre oder ein Notebook mit fremdem Microsoft-Konto ist für den Käufer unbrauchbar und führt zu Rückabwicklung. Nutze den optionalen Absatz in § 6 und setze das Gerät vorher zurück.",
      },
      {
        titel: "Rechtliche Grundlagen: Gewährleistungsausschluss, § 444 BGB und Gefahrübergang",
        text: "Auch ein Privatverkauf ist ein Kaufvertrag nach § 433 BGB. Ohne Vereinbarung haftet der Verkäufer zwei Jahre für Mängel, die bei Übergabe bereits vorlagen; in den ersten Monaten wird sogar vermutet, dass ein auftretender Mangel schon vorhanden war. Zwischen Privatpersonen darf diese Sachmängelhaftung vertraglich ausgeschlossen werden. Grenzen setzt § 444 BGB: Der Ausschluss gilt nicht für arglistig verschwiegene Mängel und nicht für Eigenschaften, die der Verkäufer garantiert hat. Außerdem bleiben Schadensersatzansprüche wegen Vorsatz, grober Fahrlässigkeit und Personenschäden bestehen; die Vorlage nimmt sie in § 4 Abs. 2 aus.\n\nMit der Übergabe geht nach § 446 BGB die Gefahr auf den Käufer über. Beim Versand zwischen Privatpersonen liegt kein Verbrauchsgüterkauf vor, deshalb trägt der Käufer ab Übergabe an den Paketdienst das Transportrisiko (§ 447 BGB). Das Eigentum geht nach § 929 BGB durch Einigung und Übergabe über; die Vorlage knüpft es zusätzlich an die vollständige Zahlung. Eine besondere Form ist nicht vorgeschrieben, der schriftliche Vertrag dient dem Beweis.",
      },
      {
        titel: "Wann du statt der Vorlage einen anderen Vertrag oder Rat brauchst",
        text: "Die Vorlage passt nicht, wenn eine Seite gewerblich handelt. Wer als Gründer Gegenstände aus dem Betriebsvermögen verkauft, auch das alte Firmennotebook, handelt als Unternehmer; gegenüber einem privaten Käufer gilt dann die gesetzliche Gewährleistung, bei Gebrauchtem verkürzbar auf ein Jahr, und die Umsatzsteuer muss geprüft werden. Dafür gibt es den B2B-Kaufvertrag und die Händler-Vorlagen in dieser Bibliothek.\n\nBei Fahrzeugen, Anhängern und Motorrädern nutze den Kfz-Kaufvertrag. Bei hochwertigen Sachen wie Uhren, Kunst oder Sammlerstücken solltest du Echtheitsnachweise und Herkunft dokumentieren und bei Beträgen im fünfstelligen Bereich den Zahlungsweg absichern, etwa per Überweisung vor Übergabe oder Treuhand. Wird ein Streit um einen verschwiegenen Mangel konkret, hilft nur ein Anwalt; GründerX ist eine Software mit Mustern und keine Rechtsberatung.",
      },
    ],
    seo: {
      title: "Kaufvertrag privat gebraucht Vorlage (Word & PDF) | GründerX",
      description:
        "Kaufvertrag zwischen Privatpersonen für gebrauchte Sachen: Zustandsbeschreibung, Gewährleistungsausschluss, Übergabe, Zahlung. Kostenlos als Word, PDF, Text.",
    },
    stand: "2026-10",
    text: `Kaufvertrag über eine gebrauchte Sache zwischen Privatpersonen

zwischen

[Vorname Nachname], geboren am [Datum], [Straße, PLZ Ort], Ausweisnummer [Nummer]
– nachfolgend „Verkäufer“ –

und

[Vorname Nachname], geboren am [Datum], [Straße, PLZ Ort], Ausweisnummer [Nummer]
– nachfolgend „Käufer“ –

Vorbemerkung
Beide Parteien schließen diesen Vertrag als Privatpersonen. Keine Partei handelt in Ausübung einer gewerblichen oder selbständigen beruflichen Tätigkeit.

§ 1 Kaufgegenstand und Zustand
(1) Der Verkäufer verkauft dem Käufer folgende gebrauchte Sache (nachfolgend „Kaufgegenstand“):
   Bezeichnung: [z. B. E-Bike, Marke, Modell]
   Seriennummer / Rahmennummer / IMEI: [Nummer]
   Farbe / Ausführung: [Angabe]
   Baujahr / Kaufdatum: [Angabe]
   Mitverkauftes Zubehör: [z. B. Ladegerät, Originalverpackung, Schlüssel, Rechnung]
(2) Der Kaufgegenstand ist gebraucht. Er weist folgende dem Verkäufer bekannte Mängel und Gebrauchsspuren auf:
   [z. B. Kratzer am Rahmen links, Akku hält noch ca. 70 % der ursprünglichen Kapazität, Display hat einen Pixelfehler oben rechts]
(3) Der Käufer hat den Kaufgegenstand am [Datum] besichtigt und [in Betrieb genommen / Probe gefahren / getestet]. Er kauft ihn in dem besichtigten Zustand.
(4) Der Verkäufer erklärt, dass ihm über die in Absatz 2 genannten Punkte hinaus keine weiteren Mängel bekannt sind.

§ 2 Kaufpreis und Zahlung
(1) Der Kaufpreis beträgt [Betrag] EUR (in Worten: [Betrag in Worten] Euro). Als Privatverkauf wird keine Umsatzsteuer ausgewiesen.
(2) Der Kaufpreis wird [bar bei Übergabe / per Überweisung auf das Konto [IBAN] bis spätestens [Datum] / per Sofortzahlung über [Zahlungsdienst] bei Übergabe] gezahlt.
(3) Die Übergabe des Kaufgegenstands erfolgt erst nach vollständigem Zahlungseingang. Bei Überweisung gilt der Eingang auf dem Konto des Verkäufers, nicht die Vorlage eines Überweisungsbelegs.
(4) [Optional: Der Käufer hat am [Datum] eine Anzahlung von [Betrag] EUR geleistet, die auf den Kaufpreis angerechnet wird. Kommt der Kauf aus Gründen, die der Käufer zu vertreten hat, nicht zustande, verbleibt die Anzahlung beim Verkäufer.]

§ 3 Übergabe und Gefahrübergang
(1) Die Übergabe erfolgt am [Datum] um [Uhrzeit] in [Ort, Adresse] [durch Abholung durch den Käufer / durch Versand an die Adresse des Käufers].
(2) Mit der Übergabe geht die Gefahr des zufälligen Untergangs und der zufälligen Verschlechterung auf den Käufer über.
(3) Bei Versand trägt der Käufer die Versandkosten in Höhe von [Betrag] EUR. Der Verkäufer verpackt die Sache sorgfältig und versendet [versichert / unversichert]. Beim Versand an einen Verbraucher durch einen privaten Verkäufer geht die Gefahr mit Übergabe an den Transporteur auf den Käufer über (§ 447 BGB), da kein Verbrauchsgüterkauf vorliegt.
(4) Der Verkäufer übergibt mit der Sache alle in § 1 Abs. 1 genannten Zubehörteile und Unterlagen.

§ 4 Ausschluss der Gewährleistung
(1) Der Kaufgegenstand wird unter Ausschluss jeglicher Sachmängelhaftung verkauft. Der Verkäufer haftet nicht für Sachmängel, die nach Übergabe auftreten oder bei Übergabe bereits vorhanden, aber nicht bekannt waren.
(2) Der Ausschluss gilt nicht für Ansprüche auf Schadensersatz aus der Verletzung des Lebens, des Körpers oder der Gesundheit, für Schäden aus Vorsatz oder grober Fahrlässigkeit des Verkäufers sowie für Mängel, die der Verkäufer arglistig verschwiegen hat oder deren Abwesenheit er in § 5 zugesichert hat (§ 444 BGB).
(3) Ein Umtausch oder eine Rückgabe gegen Erstattung des Kaufpreises ist ausgeschlossen, sofern nicht die Voraussetzungen des Absatzes 2 vorliegen.

§ 5 Zusicherungen des Verkäufers
Der Verkäufer sichert ausdrücklich zu, dass
   a) er Eigentümer des Kaufgegenstands ist und der Kaufgegenstand nicht gestohlen, unterschlagen oder sonst abhandengekommen ist,
   b) der Kaufgegenstand frei von Rechten Dritter ist, insbesondere nicht unter Eigentumsvorbehalt steht, nicht finanziert, verpfändet oder sicherungsübereignet ist,
   c) [ggf. weitere Zusicherungen, z. B. „die Originalrechnung vom [Datum] vorliegt“ oder „keine weiteren Zusicherungen“].
Weitere Beschaffenheitsgarantien übernimmt der Verkäufer nicht. Angaben in der Anzeige sind Beschreibungen, keine Garantien.

§ 6 Eigentum und Rechte Dritter
(1) Das Eigentum am Kaufgegenstand geht mit vollständiger Zahlung des Kaufpreises und Übergabe auf den Käufer über.
(2) [Optional für Sachen mit Herstellergarantie: Der Verkäufer tritt etwaige noch bestehende Garantieansprüche gegen den Hersteller oder den ursprünglichen Händler an den Käufer ab und übergibt die Originalrechnung. Eine Haftung für den Bestand der Garantie übernimmt der Verkäufer nicht.]
(3) [Optional für Geräte mit Nutzerkonten: Der Verkäufer versichert, dass alle persönlichen Daten gelöscht sind und das Gerät von allen Konten (z. B. Aktivierungssperre, Herstellerkonto, Mobilfunkvertrag) getrennt ist.]

§ 7 Schlussbestimmungen
(1) Mündliche Nebenabreden bestehen nicht. Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform.
(2) Sollte eine Bestimmung dieses Vertrags unwirksam sein, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.
(3) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist der gesetzliche.
(4) Jede Partei erhält eine unterschriebene Ausfertigung dieses Vertrags.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Verkäufer


______________________________
[Vorname Nachname], Käufer


Übergabebestätigung
Der Verkäufer bestätigt, den Kaufpreis von [Betrag] EUR [bar / per Überweisung] vollständig erhalten zu haben.
Der Käufer bestätigt, den Kaufgegenstand samt dem in § 1 genannten Zubehör am [Datum] um [Uhrzeit] übernommen zu haben.

[Ort], den [Datum]


______________________________                ______________________________
[Vorname Nachname], Verkäufer                 [Vorname Nachname], Käufer

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "kaufvertrag-firmenwagen",
    titel: "Kfz-Kaufvertrag Firmenwagen (gewerblich)",
    kurz: "Kaufvertrag über ein Fahrzeug zwischen Unternehmern mit Fahrzeugdaten, Unfallfreiheit, Papierübergabe, Ummeldung und Umsatzsteuer.",
    kategorie: "kauf",
    dateiname: "Kaufvertrag-Firmenwagen",
    wofuer: [
      "Du kaufst oder verkaufst einen Firmenwagen, Transporter oder Lieferwagen von bzw. an ein anderes Unternehmen",
      "Ausgemusterte Flottenfahrzeuge, Leasingrückläufer nach Ablösung oder Fahrzeuge aus der Betriebsaufgabe",
      "Wenn die Umsatzsteuer sauber ausgewiesen werden muss (Regelbesteuerung oder Differenzbesteuerung)",
      "Wenn die Übergabe von Zulassungsbescheinigung Teil I und II, Schlüsseln und HU-Bericht dokumentiert werden soll",
    ],
    enthaelt: [
      "§ 1 Fahrzeug",
      "§ 2 Zubehör und Unterlagen",
      "§ 3 Kaufpreis, Umsatzsteuer und Zahlung",
      "§ 4 Erklärungen des Verkäufers (Unfallfreiheit, Laufleistung, Mängel)",
      "§ 5 Übergabe, Gefahrübergang und Eigentumsvorbehalt",
      "§ 6 Ummeldung, Versicherung und Haftung ab Übergabe",
      "§ 7 Gewährleistung und Haftung",
      "§ 8 Schlussbestimmungen",
      "Übergabeprotokoll",
    ],
    hinweise: [
      "Bis zur Ummeldung haftet der Verkäufer gegenüber der Zulassungsstelle und Versicherung weiter. Melde den Verkauf sofort bei Zulassungsstelle und Versicherung (Veräußerungsanzeige), auch wenn der Käufer die Ummeldung zusagt.",
      "Die Zulassungsbescheinigung Teil II (früher Fahrzeugbrief) erst nach vollständiger Zahlung aushändigen. Wer sie hat, kann das Fahrzeug zulassen und weiterverkaufen.",
      "Umsatzsteuer: Beim Verkauf aus dem Betriebsvermögen fällt Umsatzsteuer an, sofern der Verkäufer nicht Kleinunternehmer ist. Ist das Fahrzeug ohne Vorsteuerabzug erworben worden, kann die Differenzbesteuerung (§ 25a UStG) greifen – dann kein USt-Ausweis auf der Rechnung.",
      "Angaben zu Unfallfreiheit und Kilometerstand sind Beschaffenheitsvereinbarungen. Stimmen sie nicht, haftet der Verkäufer auch bei verkürzter Gewährleistung. Nur schreiben, was du belegen kannst.",
    ],
    faqs: [
      {
        q: "Darf ich die Gewährleistung beim gewerblichen Fahrzeugverkauf ausschließen?",
        a: "Zwischen Unternehmern lässt sich die Gewährleistung für gebrauchte Fahrzeuge auf ein Jahr verkürzen und in Individualverträgen weitgehend ausschließen. Nicht ausschließbar sind arglistig verschwiegene Mängel, Beschaffenheitsgarantien sowie Schäden an Leben, Körper, Gesundheit und grobes Verschulden. Gegenüber Verbrauchern gilt das alles nicht.",
      },
      {
        q: "Was gehört ins Übergabeprotokoll?",
        a: "Kilometerstand bei Übergabe, Tankfüllung, Anzahl Schlüssel, Zulassungsbescheinigung Teil I und II, HU-Bericht, Serviceheft, Zubehör (Winterreifen, Dachträger) und sichtbare Schäden mit Fotos. Beide unterschreiben es – es ist später der Beweis für den Zustand bei Übergabe.",
      },
      {
        q: "Wer zahlt, wenn das Fahrzeug vor der Ummeldung geblitzt wird oder einen Unfall hat?",
        a: "Ab Übergabe trägt der Käufer Gefahr und Haftung; die Vorlage verpflichtet ihn zur unverzüglichen Ummeldung und stellt den Verkäufer von Bußgeldern und Kosten frei. Nach außen bleibt der Verkäufer aber Halter, bis die Zulassungsstelle die Veräußerung kennt – deshalb die Veräußerungsanzeige sofort absenden.",
      },
      {
        q: "Muss der Kaufpreis Umsatzsteuer enthalten?",
        a: "Verkauft ein regelbesteuerter Unternehmer aus dem Betriebsvermögen, ja: Netto plus 19 % USt, der Käufer kann die Vorsteuer ziehen. Kleinunternehmer weisen keine USt aus. Bei Fahrzeugen, die ohne Vorsteuerabzug angeschafft wurden (z. B. von privat), kann die Differenzbesteuerung angewendet werden; dann darf die USt nicht offen ausgewiesen werden.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen gewerblichen Kfz-Kaufvertrag brauchst",
        text: "Diese Vorlage ist für den Fahrzeugkauf zwischen zwei Unternehmen gedacht: Du übernimmst den Transporter eines Handwerksbetriebs, der seine Flotte erneuert, kaufst einen abgelösten Leasingrückläufer aus dem Betriebsvermögen eines anderen Unternehmers oder verkaufst deinen Firmenwagen bei Umstellung auf Elektro oder bei Geschäftsaufgabe. Auch der Verkauf eines Lieferwagens an einen anderen Gründer, der als Einzelunternehmer startet, fällt darunter.\n\nAnders als die üblichen Kfz-Kaufverträge der Automobilclubs ist das Muster auf den Verkauf aus dem Betriebsvermögen zugeschnitten: Es regelt Umsatzsteuer mit Regel- und Differenzbesteuerung, hält Beschaffenheitsvereinbarungen zu Unfallfreiheit und Laufleistung fest und enthält ein Übergabeprotokoll. Für den Verkauf an eine Privatperson oder von privat an dich passt es nicht, weil dann Verbraucherrecht beziehungsweise Privatverkaufsregeln gelten.",
      },
      {
        titel: "Was muss in einen Kfz-Kaufvertrag für Firmenwagen?",
        text: "Ein Fahrzeug ist eindeutig nur über seine Papiere identifizierbar. Die Vorlage verlangt daher in § 1 Fahrzeug-Identifizierungsnummer, Kennzeichen, Erstzulassung, Kilometerstand mit Datum, HU-Frist, Antrieb und Leistung, Vorbesitzer und bei Elektrofahrzeugen den Akkuzustand. Zusätzlich gehören hinein:\n\n- Zubehör und die zu übergebenden Unterlagen: Zulassungsbescheinigung Teil I und II, Schlüssel, HU-Bericht, Serviceheft, COC-Papier (§ 2)\n- Kaufpreis mit Umsatzsteuer-Variante: Regelbesteuerung, Differenzbesteuerung oder Kleinunternehmer (§ 3)\n- Erklärungen zu Unfallfreiheit, Schäden, Vornutzung als Taxi oder Mietwagen und Kilometerstand (§ 4)\n- Übergabe, Gefahrübergang, Eigentumsvorbehalt und Herausgabe der Zulassungsbescheinigung Teil II erst nach Zahlung (§ 5)\n- Ummeldungspflicht des Käufers, Veräußerungsanzeige des Verkäufers, Freistellung von Bußgeldern (§ 6)\n- Gewährleistungsausschluss oder Verkürzung mit den gesetzlichen Ausnahmen (§ 7)\n- Übergabeprotokoll mit Kilometerstand, Tankfüllung, Papieren und Schäden\n\nDas Übergabeprotokoll ist kein Anhang zum Abheften, sondern der spätere Beweis für den Zustand bei Übergabe.",
      },
      {
        titel: "Kfz-Kaufvertrag Muster ausfüllen: so gehst du vor",
        text: "Übernimm die Fahrzeugdaten in § 1 direkt aus der Zulassungsbescheinigung Teil I, nicht aus dem Gedächtnis; die FIN hat 17 Zeichen und steht auch im Türholm. Den Kilometerstand liest du am Tag des Vertragsschlusses ab und trägst das Datum dazu ein. In § 2 listest du Winterreifen, Anhängerkupplung, Ladekabel oder Regalsysteme auf und notierst, was vor Übergabe entfernt wird, etwa Firmenbeschriftung oder Telematikbox.\n\nIn § 3 wählst du die Steuer-Variante: Hast du das Fahrzeug mit Vorsteuerabzug gekauft, weist du 19 Prozent Umsatzsteuer aus. Kam es ohne Vorsteuerabzug, zum Beispiel von privat, prüfst du mit dem Steuerberater die Differenzbesteuerung (Alternative A); Kleinunternehmer nehmen Alternative B. Die Restdarlehens-Klausel in Absatz 4 bleibt nur bei finanzierten Fahrzeugen. In § 4 entscheidest du bei jeder Erklärung zwischen den eckigen Varianten und beschreibst Unfallschäden mit Datum, Werkstatt und Kosten. Trage in § 6 die Ummeldefrist in Werktagen ein, in § 7 ob die Gewährleistung ausgeschlossen oder auf zwölf Monate verkürzt wird. Bei der Übergabe füllt ihr gemeinsam das Protokoll aus, macht Fotos und unterschreibt beide.",
      },
      {
        titel: "Typische Fehler beim Firmenwagen-Verkauf und wie du sie vermeidest",
        text: "Der gefährlichste Fehler ist die Herausgabe der Zulassungsbescheinigung Teil II vor Zahlung. Wer den Brief hat, kann das Fahrzeug zulassen und weiterverkaufen; die Vorlage koppelt die Herausgabe deshalb an den Zahlungseingang. Zweitens vergessen viele Verkäufer die Veräußerungsanzeige bei Zulassungsstelle und Versicherung. Bis dahin bist du nach außen Halter: Bußgelder, Mautgebühren und Versicherungsbeiträge landen bei dir, und die Freistellung in § 6 hilft nur, wenn der Käufer zahlungsfähig ist. Sende die Anzeige noch am Tag der Übergabe.\n\nDritter Fehler: „unfallfrei“ ankreuzen, obwohl ein Parkrempler repariert wurde. Die Angaben in § 4 sind Beschaffenheitsvereinbarungen; stimmen sie nicht, haftet der Verkäufer trotz Gewährleistungsausschluss. Schreibe lieber jeden Schaden auf. Vierter Fehler: Umsatzsteuer falsch ausweisen. Wer bei Differenzbesteuerung trotzdem 19 Prozent auf die Rechnung schreibt, schuldet die Steuer, und der Käufer darf sie nicht als Vorsteuer ziehen. Und: Ohne Fotos im Übergabeprotokoll ist jeder spätere Kratzer Streitstoff.",
      },
      {
        titel: "Rechtliche Grundlagen: Beschaffenheit, Gewährleistung, Umsatzsteuer, Halterhaftung",
        text: "Für den Fahrzeugkauf gilt das allgemeine Kaufrecht der §§ 433 ff. BGB. Angaben zu Unfallfreiheit, Laufleistung und Vornutzung sind Beschaffenheitsvereinbarungen nach § 434 BGB; weicht das Fahrzeug davon ab, ist es mangelhaft, unabhängig von einem Gewährleistungsausschluss. Zwischen Unternehmern kann die Gewährleistung für Gebrauchtfahrzeuge verkürzt oder in individuell ausgehandelten Verträgen ausgeschlossen werden, nicht aber für arglistig verschwiegene Mängel, Vorsatz, grobe Fahrlässigkeit und Personenschäden (§§ 444, 309 BGB).\n\nMit der Übergabe geht die Gefahr über (§ 446 BGB), das Eigentum erst mit vollständiger Zahlung, weil die Vorlage einen Eigentumsvorbehalt nach § 449 BGB vorsieht. Die Kfz-Haftpflichtversicherung geht nach § 95 VVG vorläufig auf den Käufer über; die Mitteilungspflicht an die Zulassungsstelle folgt aus der Fahrzeug-Zulassungsverordnung. Umsatzsteuerlich ist der Verkauf aus dem Betriebsvermögen eines regelbesteuerten Unternehmers steuerpflichtig; die Differenzbesteuerung nach § 25a UStG kommt nur bei Fahrzeugen ohne Vorsteuerabzug in Betracht und verbietet den offenen Steuerausweis. Ein Notar ist für den Fahrzeugkauf nie erforderlich.",
      },
      {
        titel: "Wann der Kfz-Kaufvertrag aus der Vorlage nicht reicht",
        text: "Verkaufst du an eine Privatperson, gilt Verbraucherrecht: keine Rügepflicht, Gewährleistung mindestens ein Jahr bei Gebrauchtwagen, Beweislastumkehr im ersten Jahr. Dann brauchst du einen Händler-Kaufvertrag für Verbraucher, nicht dieses Muster. Beim Verkauf ins EU-Ausland kommen innergemeinschaftliche Lieferung, Gelangensbestätigung und bei Neufahrzeugen Sonderregeln hinzu; sprich vorher mit dem Steuerberater.\n\nAuch bei Leasingfahrzeugen reicht die Vorlage nicht, solange der Leasingvertrag läuft: Eigentümer ist der Leasinggeber, du kannst nur mit dessen Zustimmung nach Ablösung verkaufen. Die optionale Restdarlehens-Klausel deckt nur die Ablösung einer Finanzierung ab. Bei Fahrzeugen mit erheblichen Vorschäden, Tachomanipulation im Vorbesitz oder Importfahrzeugen ohne deutsche Papiere lohnt ein Gutachten vor dem Kauf. GründerX stellt Software und Muster bereit, keine Rechtsberatung; bei Streit über Unfallfreiheit oder Laufleistung hilft nur eine anwaltliche Prüfung.",
      },
    ],
    seo: {
      title: "Kfz-Kaufvertrag gewerblich Vorlage (Word & PDF) | GründerX",
      description:
        "Kfz-Kaufvertrag für Firmenwagen zwischen Unternehmern: FIN, Kilometerstand, HU, Unfallfreiheit, Papiere, Ummeldung, Umsatzsteuer, Haftung, Übergabeprotokoll.",
    },
    stand: "2026-10",
    text: `Kaufvertrag über ein Kraftfahrzeug (gewerblich)

zwischen

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], USt-IdNr. [DE…]
– nachfolgend „Verkäufer“ –

und

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], USt-IdNr. [DE…]
– nachfolgend „Käufer“ –

Vorbemerkung
Beide Parteien handeln als Unternehmer im Sinne des § 14 BGB. Das Fahrzeug gehört zum Betriebsvermögen des Verkäufers.

§ 1 Fahrzeug
Der Verkäufer verkauft dem Käufer das folgende Fahrzeug (nachfolgend „Fahrzeug“):
   Hersteller / Typ / Modell: [z. B. VW Transporter T6.1 Kasten 2.0 TDI]
   Fahrzeug-Identifizierungsnummer (FIN): [17 Zeichen]
   Amtliches Kennzeichen: [Kennzeichen]
   Erstzulassung: [Datum]
   Kilometerstand laut Tacho: [km] km (Stand [Datum])
   Hauptuntersuchung (HU) gültig bis: [Monat/Jahr]
   Kraftstoff / Antrieb: [Diesel / Benzin / Elektro / Hybrid], Leistung [kW]
   Farbe: [Farbe]
   Anzahl Vorbesitzer laut Zulassungsbescheinigung Teil II: [Anzahl]
   Getriebe: [manuell / automatisch]
   [Elektrofahrzeuge: Akkukapazität [kWh], Ladezustand/State of Health laut Herstellerdiagnose [%] vom [Datum]]

§ 2 Zubehör und Unterlagen
(1) Mitverkauft werden: [z. B. 2. Satz Reifen (Winter) auf Stahlfelgen, Anhängerkupplung, Dachträger, Ladekabel Typ 2, Trennwand, Regalsystem].
(2) Der Verkäufer übergibt bei der Übergabe: Zulassungsbescheinigung Teil I und Teil II, [Anzahl] Schlüssel, HU-Prüfbericht vom [Datum], Serviceheft / Nachweise der Wartungen, Bedienungsanleitung, [COC-Papier, Reparaturrechnungen der letzten [Anzahl] Jahre, Nachweis über Rückruf-Erledigungen].
(3) Nicht mitverkauft sind: [z. B. Firmenbeschriftung wird vor Übergabe entfernt, Telematikbox wird ausgebaut, Tankkarte verbleibt beim Verkäufer].

§ 3 Kaufpreis, Umsatzsteuer und Zahlung
(1) Der Kaufpreis beträgt [Betrag] EUR netto zuzüglich 19 % Umsatzsteuer ([Betrag] EUR), gesamt [Betrag] EUR brutto. Der Verkäufer stellt eine Rechnung mit gesondert ausgewiesener Umsatzsteuer aus.
[Alternative A – Differenzbesteuerung: Der Kaufpreis beträgt [Betrag] EUR. Das Fahrzeug unterliegt der Differenzbesteuerung nach § 25a UStG; Umsatzsteuer wird nicht gesondert ausgewiesen und ein Vorsteuerabzug des Käufers ist nicht möglich.]
[Alternative B – Kleinunternehmer: Der Kaufpreis beträgt [Betrag] EUR. Der Verkäufer ist Kleinunternehmer im Sinne des § 19 UStG; Umsatzsteuer wird nicht ausgewiesen.]
(2) Der Kaufpreis ist [bei Übergabe in bar / per Überweisung auf das Konto [IBAN] bis spätestens [Datum] / bei Übergabe per Echtzeitüberweisung] zu zahlen.
(3) Die Zulassungsbescheinigung Teil II und das Fahrzeug werden erst nach vollständigem Zahlungseingang herausgegeben. Bis dahin bleibt das Fahrzeug Eigentum des Verkäufers (Eigentumsvorbehalt).
(4) [Optional: Das Fahrzeug ist mit einem Restdarlehen bei [Bank/Leasinggeber] in Höhe von [Betrag] EUR belastet. Der Käufer zahlt diesen Betrag mit befreiender Wirkung direkt an [Bank] und den Restkaufpreis von [Betrag] EUR an den Verkäufer. Der Verkäufer stellt sicher, dass die Zulassungsbescheinigung Teil II nach Ablösung an den Käufer herausgegeben wird.]

§ 4 Erklärungen des Verkäufers
(1) Der Verkäufer erklärt, dass das Fahrzeug während seiner Besitzzeit
   a) [unfallfrei war / folgende Unfallschäden hatte: [Beschreibung, Datum, Reparaturkosten, Werkstatt]],
   b) [keine sonstigen Beschädigungen hatte / folgende Schäden hatte: [z. B. Hagelschaden, repariert am [Datum]]],
   c) nicht als Taxi, Mietwagen, Fahrschulwagen oder im Kurierdienst mit Mehrfahrerbetrieb genutzt wurde [bzw. genutzt wurde als: [Angabe]],
   d) der angegebene Kilometerstand nach seiner Kenntnis der tatsächlichen Gesamtfahrleistung entspricht [Ausnahme: Tachowechsel am [Datum] bei [km]].
(2) Über Unfälle und Schäden vor seiner Besitzzeit hat der Verkäufer [keine Kenntnis / folgende Kenntnis: [Angabe aus Vorbesitz, Gutachten, Historie]].
(3) Folgende Mängel sind dem Verkäufer bekannt und werden vom Käufer akzeptiert: [z. B. Steinschlag Windschutzscheibe außerhalb Sichtfeld, Kratzer Stoßstange hinten, Klimaanlage kühlt schwach, Fehlerspeicher-Eintrag [Code]].
(4) Die Angaben in Absatz 1 sind Beschaffenheitsvereinbarungen im Sinne des § 434 Abs. 2 BGB. Weitergehende Garantien übernimmt der Verkäufer nicht.

§ 5 Übergabe, Gefahrübergang und Eigentumsvorbehalt
(1) Die Übergabe erfolgt am [Datum] um [Uhrzeit] in [Ort, Adresse]. Der Kilometerstand bei Übergabe wird im Übergabeprotokoll festgehalten.
(2) Mit der Übergabe geht die Gefahr des zufälligen Untergangs und der Verschlechterung auf den Käufer über.
(3) Das Eigentum am Fahrzeug geht mit vollständiger Zahlung des Kaufpreises auf den Käufer über.
(4) Das Fahrzeug wird [mit amtlichem Kennzeichen zugelassen / abgemeldet mit Kurzzeitkennzeichen des Käufers] übergeben. Bei Übergabe mit Kennzeichen darf der Käufer das Fahrzeug nur zur unverzüglichen Ummeldung oder Abmeldung im Straßenverkehr nutzen.

§ 6 Ummeldung, Versicherung und Haftung ab Übergabe
(1) Der Käufer verpflichtet sich, das Fahrzeug unverzüglich, spätestens innerhalb von [z. B. 3] Werktagen nach Übergabe, auf sich umzumelden oder abzumelden und dem Verkäufer eine Kopie der neuen Zulassungsbescheinigung Teil I bzw. der Abmeldebestätigung zu übersenden.
(2) Der Verkäufer zeigt den Verkauf unverzüglich der Zulassungsstelle und seiner Kfz-Versicherung an (Veräußerungsanzeige) und übermittelt dafür Name, Anschrift und Datum der Übergabe des Käufers.
(3) Ab dem Zeitpunkt der Übergabe trägt der Käufer alle Kosten, Gebühren, Bußgelder, Steuern und Versicherungsbeiträge, die das Fahrzeug betreffen. Er stellt den Verkäufer von allen Ansprüchen Dritter frei, die aus der Nutzung des Fahrzeugs nach Übergabe entstehen, einschließlich Verwarnungs- und Bußgeldern, Maut- und Parkgebühren.
(4) Die bestehende Kfz-Haftpflichtversicherung des Verkäufers geht nach den gesetzlichen Regeln vorläufig auf den Käufer über (§ 95 VVG); Prämien ab Übergabe trägt der Käufer im Innenverhältnis.

§ 7 Gewährleistung und Haftung
(1) Das Fahrzeug wird als Gebrauchtfahrzeug verkauft. Die Gewährleistung für Sachmängel wird [ausgeschlossen / auf 12 Monate ab Übergabe verkürzt].
(2) Der Ausschluss bzw. die Verkürzung gilt nicht für die Beschaffenheitsvereinbarungen in § 4 Abs. 1, für arglistig verschwiegene Mängel, für Ansprüche aus der Verletzung von Leben, Körper oder Gesundheit sowie bei Vorsatz oder grober Fahrlässigkeit des Verkäufers.
(3) Verschleißteile (insbesondere Bremsen, Reifen, Kupplung, Batterie, Beleuchtungsmittel) sowie Mängel, die auf unsachgemäße Nutzung nach Übergabe zurückzuführen sind, begründen keine Ansprüche.
(4) Eine etwaige noch laufende Herstellergarantie oder Anschlussgarantie geht auf den Käufer über, soweit die Garantiebedingungen dies zulassen; der Verkäufer übergibt die Garantieunterlagen.

§ 8 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; dies gilt auch für die Aufhebung dieser Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.
(3) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
(4) Gerichtsstand für Streitigkeiten aus diesem Vertrag ist [Ort], soweit beide Parteien Kaufleute sind.
(5) Das Übergabeprotokoll ist Bestandteil dieses Vertrags.

[Ort], den [Datum]


______________________________
[Firma Verkäufer], vertreten durch [Vorname Nachname]


______________________________
[Firma Käufer], vertreten durch [Vorname Nachname]


Übergabeprotokoll
Fahrzeug: [Hersteller/Modell], FIN [Nummer]
Übergabe am [Datum] um [Uhrzeit] in [Ort]
Kilometerstand bei Übergabe: [km] km
Tankfüllung / Ladezustand: [z. B. 1/2 / 80 %]
Übergeben: [ ] Zulassungsbescheinigung Teil I  [ ] Zulassungsbescheinigung Teil II  [ ] [Anzahl] Schlüssel  [ ] HU-Bericht  [ ] Serviceheft  [ ] Zubehör gemäß § 2
Sichtbare Schäden bei Übergabe (Fotos als Anlage): [Beschreibung]
Kaufpreis erhalten am [Datum]: [ ] ja, vollständig  [ ] Restbetrag [Betrag] EUR offen bis [Datum]


______________________________                ______________________________
Verkäufer                                      Käufer

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "kaufvertrag-geschaeftsausstattung",
    titel: "Kaufvertrag Geschäftsausstattung / Inventar",
    kurz: "Kauf von Büroausstattung, Ladeneinrichtung oder Inventar als Paket gegen Pauschalpreis, gekauft wie besichtigt, mit Abholung und Eigentumsvorbehalt.",
    kategorie: "kauf",
    dateiname: "Kaufvertrag-Geschaeftsausstattung",
    wofuer: [
      "Du übernimmst Möbel, IT, Küchen- oder Ladeneinrichtung von einem Unternehmen, das schließt oder umzieht",
      "Du verkaufst dein altes Büro-Inventar komplett an einen Nachfolger oder Nachmieter",
      "Wenn viele Einzelteile als Paket zu einem Pauschalpreis den Eigentümer wechseln sollen",
      "Wenn klar sein muss, wer wann abbaut, abholt und die Räume besenrein hinterlässt",
    ],
    enthaelt: [
      "§ 1 Kaufgegenstand (Inventarliste als Anlage)",
      "§ 2 Pauschalpreis und Zahlung",
      "§ 3 Zustand – gekauft wie besichtigt",
      "§ 4 Übergabe, Demontage und Abholung",
      "§ 5 Eigentumsvorbehalt und Gefahrübergang",
      "§ 6 Rechte Dritter, Software und Daten",
      "§ 7 Gewährleistung und Haftung",
      "§ 8 Schlussbestimmungen",
      "Anlage 1 Inventarliste (Muster)",
    ],
    hinweise: [
      "Die Inventarliste ist der wichtigste Teil. Jede Position mit Stückzahl, Bezeichnung, Seriennummer bei IT und Zustand erfassen und beidseitig abzeichnen – sonst gibt es Streit, was zum Pauschalpreis gehörte.",
      "Geleaste oder finanzierte Geräte (Drucker, Kaffeemaschine, Telefonanlage) gehören dem Leasinggeber, nicht dem Verkäufer. Vorher die Verträge prüfen; die Vorlage lässt den Verkäufer das zusichern.",
      "Software-Lizenzen auf den Rechnern sind oft nicht übertragbar (Volumenlizenzen, Abo). Geräte vor Übergabe zurücksetzen, Daten löschen und Lizenzen gesondert regeln.",
      "Beim Verkauf aus dem Betriebsvermögen fällt Umsatzsteuer an; Pauschalpreis also netto oder brutto klar angeben. Bei einem kompletten Betrieb kann eine nicht steuerbare Geschäftsveräußerung im Ganzen (§ 1 Abs. 1a UStG) vorliegen – dann Steuerberater fragen.",
    ],
    faqs: [
      {
        q: "Was bedeutet „gekauft wie besichtigt“ rechtlich?",
        a: "Der Käufer akzeptiert den Zustand, den er bei der Besichtigung sehen konnte, und der Verkäufer haftet nicht für sichtbare oder bei der Besichtigung erkennbare Mängel. Zwischen Unternehmern lässt sich die Gewährleistung für gebrauchtes Inventar darüber hinaus weitgehend ausschließen, nicht aber für arglistig verschwiegene Mängel und zugesicherte Eigenschaften.",
      },
      {
        q: "Wer baut die Einrichtung ab und wer haftet für Schäden an den Räumen?",
        a: "Die Vorlage sieht vor, dass der Käufer auf eigene Kosten demontiert und abholt und dabei entstehende Schäden an den Räumen ersetzt. Alternativ kann der Verkäufer die Demontage übernehmen; dann sollte ein Übergabetermin an der Rampe vereinbart werden. Wichtig ist der Termin, weil Mietverträge oft eine besenreine Rückgabe zu einem festen Datum verlangen.",
      },
      {
        q: "Wie regeln wir Positionen, die bei Abholung fehlen oder kaputt sind?",
        a: "Für den Pauschalpreis wird die Anlage 1 bei Übergabe abgehakt. Fehlt etwas, das in der Liste steht, mindert sich der Preis um den dort angegebenen Einzelwert. Deshalb sollte die Liste je Position einen Wert enthalten, auch wenn insgesamt pauschal gezahlt wird.",
      },
      {
        q: "Kann ich Inventar vom Vormieter ohne Vertrag einfach übernehmen?",
        a: "Besser nicht. Ohne Vertrag ist unklar, ob der Vormieter überhaupt Eigentümer war, was zum Preis gehört und wer für die Entsorgung nicht gewollter Teile zahlt. Der Vermieter kann außerdem verlangen, dass Einbauten entfernt werden; das sollte zwischen Käufer, Verkäufer und Vermieter abgestimmt sein.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Kaufvertrag für Inventar und Büroausstattung brauchst",
        text: "Ein Büro schließt, ein Café gibt auf, eine Agentur zieht in kleinere Räume: In solchen Momenten wechseln Schreibtische, Monitore, Küchengeräte und Ladeneinrichtung als Paket den Eigentümer. Für Gründer ist das eine günstige Erstausstattung, für den Verkäufer eine schnelle Lösung, weil die Räume oft zu einem festen Datum besenrein zurückgegeben werden müssen.\n\nDiese Vorlage regelt genau diesen Paketkauf: viele Einzelteile, ein Pauschalpreis, gekauft wie besichtigt, Abholung durch den Käufer. Typische Fälle sind die Übernahme der Einrichtung vom Vormieter, der Kauf der kompletten IT eines aufgelösten Teams oder der Verkauf deines eigenen Inventars an einen Nachfolger. Für einzelne hochwertige Geräte mit Gewährleistung passt der B2B-Kaufvertrag besser, für Maschinen mit Probelauf der Maschinenkaufvertrag und für einen ganzen Betrieb mit Mitarbeitern der Unternehmenskaufvertrag.",
      },
      {
        titel: "Was muss in einen Inventar-Kaufvertrag? Pflichtinhalte und Inventarliste",
        text: "Herzstück ist die Inventarliste in Anlage 1. Ohne sie weiß später niemand, ob der Bürostuhl Nummer sieben zum Pauschalpreis gehörte. Die Vorlage verlangt je Position Stückzahl, Bezeichnung, Hersteller und Modell, Seriennummer bei IT, Standort, Zustand und Einzelwert. Darüber hinaus müssen geregelt sein:\n\n- was ausgenommen ist, insbesondere Leasing- und Mietgeräte sowie fest verbundene Einbauten (§ 1)\n- Pauschalpreis netto und brutto, Anzahlung und Restzahlung, Rechnung nach § 14 UStG (§ 2)\n- Besichtigung und Kauf wie besichtigt mit Offenlegung versteckter Mängel (§ 3)\n- Übergabetermin, Demontage, Abholung, Schäden an den Räumen, Frist wegen Mietvertragsende (§ 4)\n- Eigentumsvorbehalt und Gefahrübergang ab Übergabe oder Demontagebeginn (§ 5)\n- Zusicherung des Eigentums, Software-Lizenzen, Datenlöschung, Entfernen von Logos (§ 6)\n- Gewährleistungsausschluss mit Ausnahmen und Haftungsobergrenze (§ 7)\n\nDie Einzelwerte in der Liste sind keine Einzelkaufpreise, aber sie bestimmen die Minderung, wenn bei der Abholung etwas fehlt, und sie helfen beim Buchen der Anlagegüter.",
      },
      {
        titel: "Inventar-Kaufvertrag Muster ausfüllen: Schritt für Schritt",
        text: "Beginne nicht mit dem Vertrag, sondern mit der Liste. Geh gemeinsam durch die Räume, fotografiere jede Position und trage sie in Anlage 1 ein: Raum, Stückzahl, Bezeichnung, Seriennummer, Zustand, Einzelwert. Markiere Leasinggeräte als „ausgenommen“. Erst dann füllst du den Vertrag aus. In der Vorbemerkung trägst du Adresse und Auszugsdatum ein, in § 1 Abs. 3 entscheidest du, ob Einbauten wie Theke oder Trennwände mitverkauft werden; dazu brauchst du die Zustimmung des Vermieters.\n\nIn § 2 setzt du den Pauschalpreis netto und brutto ein, die Anzahlung und die Fälligkeit des Rests. In § 3 kommen Besichtigungsdatum und die bekannten versteckten Mängel, etwa ein lauter Kühlschrankkompressor oder eine defekte Gasfeder. In § 4 legst du Übergabetermin, Abholfrist und die Verantwortung für Bohrlöcher fest; die Alternative, dass der Verkäufer demontiert, wählst du nur, wenn das wirklich so vereinbart ist. In § 6 Abs. 2 notierst du in der Liste, welche Software-Lizenzen übertragbar sind, und in Abs. 4, wer Logos entfernt. Bei der Übergabe hakt ihr die Liste gemeinsam ab und unterschreibt sie.",
      },
      {
        titel: "Typische Fehler bei Inventarübernahme und wie du sie vermeidest",
        text: "Erster Fehler: Der Verkäufer verkauft, was ihm nicht gehört. Multifunktionsdrucker, Kaffeevollautomaten und Telefonanlagen sind oft geleast; der Leasinggeber holt sie ab, und der Käufer hat dafür bezahlt. Lass dir in § 6 das Eigentum zusichern und frag nach den Leasingverträgen. Zweiter Fehler: Software gilt als mitgekauft. Microsoft-365-Abos, Volumenlizenzen und Adobe-Konten sind personengebunden; nur Lizenzen mit übertragbarem Schlüssel wechseln. Dritter Fehler: Datenträger mit Firmendaten übergeben. Der Verkäufer muss vor Übergabe löschen und Geräte aus Verwaltungssystemen (MDM) und Konten entfernen, sonst sind Notebooks gesperrt und der Datenschutz ist verletzt.\n\nVierter Fehler: keine Frist für die Abholung. Endet der Mietvertrag des Verkäufers, steht das Inventar plötzlich auf dem Gehweg oder wird kostenpflichtig eingelagert; § 4 Abs. 4 regelt das, nur ausfüllen musst du es. Und schließlich: Einzelwerte weglassen. Dann lässt sich bei fehlenden Positionen nichts mindern, und der Steuerberater kann die Anlagegüter nicht einzeln aktivieren.",
      },
      {
        titel: "Rechtliche Grundlagen: Gewährleistung, Gefahrübergang, Umsatzsteuer beim Inventarkauf",
        text: "Der Inventarkauf ist ein Kauf beweglicher Sachen nach §§ 433 ff. BGB zwischen Unternehmern. Die Klausel „gekauft wie besichtigt“ ist eine Beschaffenheitsvereinbarung: Der Käufer akzeptiert den bei der Besichtigung erkennbaren Zustand. Darüber hinaus darf die Gewährleistung für gebrauchtes Inventar unter Unternehmern weitgehend ausgeschlossen werden; nicht ausschließbar bleiben nach § 444 BGB arglistig verschwiegene Mängel und zugesicherte Eigenschaften sowie Vorsatz, grobe Fahrlässigkeit und Personenschäden.\n\nDie Gefahr geht nach § 446 BGB mit Übergabe über; die Vorlage zieht sie auf den Beginn der Demontage vor, weil der Käufer ab dann die Kontrolle hat. Der Eigentumsvorbehalt nach § 449 BGB sichert den Verkäufer bis zur Restzahlung. Fest mit dem Gebäude verbundene Einbauten können nach §§ 93 ff. BGB wesentliche Bestandteile des Gebäudes sein und dem Vermieter gehören; deshalb braucht ihr dessen Zustimmung. Umsatzsteuerlich ist der Verkauf aus dem Betriebsvermögen steuerpflichtig. Wird ein kompletter Betrieb mit allen wesentlichen Grundlagen übertragen, kann eine nicht steuerbare Geschäftsveräußerung im Ganzen nach § 1 Abs. 1a UStG vorliegen; das klärt der Steuerberater vorher.",
      },
      {
        titel: "Wann die Vorlage nicht reicht: Betrieb, Vermieter, Insolvenz",
        text: "Übernimmst du mit dem Inventar auch Kunden, Verträge oder Mitarbeiter, ist das kein Inventarkauf mehr, sondern ein Betriebsübergang. Dann greifen § 613a BGB für die Arbeitsverhältnisse und § 25 HGB für Altverbindlichkeiten bei Firmenfortführung; dafür gibt es den Unternehmenskaufvertrag als Asset Deal. Sollen die Räume gleich mit übernommen werden, brauchst du zusätzlich einen neuen Mietvertrag oder den Eintritt in den bestehenden mit Zustimmung des Vermieters; Einbauten regelt ihr am besten zu dritt.\n\nKaufst du aus einer Insolvenz, verkauft der Insolvenzverwalter unter vollständigem Gewährleistungsausschluss und oft ohne Zusicherung des Eigentums; prüfe dann selbst, ob Leasing- oder Vorbehaltsware dabei ist. Bei Inventar mit Prüfpflichten, etwa Gastronomieküchen, Aufzügen oder elektrischen Betriebsmitteln, musst du als neuer Betreiber eigene Prüfungen organisieren; die Vorlage schließt die Haftung des Verkäufers dafür aus. GründerX liefert Software und Muster, keine Rechts- oder Steuerberatung.",
      },
    ],
    seo: {
      title: "Kaufvertrag Inventar Vorlage kostenlos (Word) | GründerX",
      description:
        "Kaufvertrag für Geschäftsausstattung: Inventarliste, Pauschalpreis, gekauft wie besichtigt, Abholung, Eigentumsvorbehalt. Kostenlos als Word & PDF.",
    },
    stand: "2026-10",
    text: `Kaufvertrag über Geschäftsausstattung und Inventar

zwischen

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], USt-IdNr. [DE…]
– nachfolgend „Verkäufer“ –

und

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], USt-IdNr. [DE…]
– nachfolgend „Käufer“ –

Vorbemerkung
Der Verkäufer gibt seine Geschäftsräume in [Adresse] zum [Datum] auf / verlegt seinen Betrieb und veräußert die dort befindliche Geschäftsausstattung. Beide Parteien handeln als Unternehmer.

§ 1 Kaufgegenstand
(1) Der Verkäufer verkauft dem Käufer die in Anlage 1 (Inventarliste) aufgeführten Gegenstände (nachfolgend „Inventar“). Die Inventarliste enthält je Position Stückzahl, Bezeichnung, Hersteller/Modell, Seriennummer (bei IT und Geräten), Standort, Zustand und Einzelwert.
(2) Nicht mitverkauft sind die in Anlage 1 als „ausgenommen“ gekennzeichneten Gegenstände sowie alle Gegenstände, die nicht im Eigentum des Verkäufers stehen (insbesondere Leasing- und Mietgeräte).
(3) Fest mit dem Gebäude verbundene Einbauten (z. B. [Theke, Einbauküche, Trennwände, Beleuchtungsanlage]) werden [mitverkauft, soweit sie in Anlage 1 aufgeführt sind und der Vermieter dem Verbleib bzw. Ausbau zugestimmt hat / nicht mitverkauft].

§ 2 Pauschalpreis und Zahlung
(1) Der Kaufpreis für das gesamte Inventar beträgt pauschal [Betrag] EUR netto zuzüglich 19 % Umsatzsteuer, gesamt [Betrag] EUR brutto. Die in Anlage 1 angegebenen Einzelwerte dienen der Aufteilung bei Fehlmengen (§ 4 Abs. 5) und der buchhalterischen Zuordnung; sie sind keine Einzelkaufpreise.
(2) Der Kaufpreis ist wie folgt fällig: [Betrag] EUR bei Vertragsschluss als Anzahlung, der Restbetrag von [Betrag] EUR spätestens [bei Übergabe / bis zum [Datum]] per Überweisung auf [IBAN].
(3) Der Verkäufer stellt eine ordnungsgemäße Rechnung im Sinne des § 14 UStG aus.
(4) Bei Zahlungsverzug gelten die gesetzlichen Verzugszinsen von 9 Prozentpunkten über dem Basiszinssatz (§ 288 Abs. 2 BGB).

§ 3 Zustand – gekauft wie besichtigt
(1) Das Inventar ist gebraucht. Der Käufer hat es am [Datum] in den Räumen [Adresse] vollständig besichtigt und, soweit möglich, in Betrieb genommen.
(2) Das Inventar wird „gekauft wie besichtigt“ verkauft. Der Käufer übernimmt es in dem bei der Besichtigung vorgefundenen Zustand mit allen sichtbaren und bei der Besichtigung erkennbaren Gebrauchsspuren und Mängeln.
(3) Der Verkäufer hat folgende ihm bekannte, nicht ohne Weiteres erkennbare Mängel offengelegt: [z. B. Server-Festplatte 2 meldet SMART-Fehler, Kühlschrank Kompressor laut, Bürostuhl Nr. 7 Gasfeder defekt].
(4) Der Käufer kauft das Inventar insgesamt; die Übernahme einzelner Positionen unter Ablehnung anderer ist ausgeschlossen.

§ 4 Übergabe, Demontage und Abholung
(1) Die Übergabe erfolgt am [Datum] ab [Uhrzeit] in [Adresse]. Der Verkäufer stellt den Zugang zu den Räumen und zur Laderampe/zum Lastenaufzug sicher.
(2) Die Demontage, Verpackung, Verladung und der Transport sind Sache des Käufers und erfolgen auf seine Kosten und Gefahr. [Alternative: Der Verkäufer demontiert die Einbauten und stellt das Inventar transportfertig im Erdgeschoss bereit.]
(3) Der Käufer hat die Räume des Verkäufers bei Demontage und Abholung sorgfältig zu behandeln. Schäden an Wänden, Böden, Türen und Installationen, die durch die Abholung entstehen, ersetzt der Käufer. Bohrlöcher und Dübel sind [vom Käufer fachgerecht zu verschließen / Sache des Verkäufers].
(4) Die Abholung muss bis spätestens [Datum] abgeschlossen sein, weil der Mietvertrag des Verkäufers zu diesem Datum endet. Nicht abgeholtes Inventar darf der Verkäufer nach vorheriger Ankündigung per E-Mail mit einer Frist von [z. B. 5] Werktagen auf Kosten des Käufers einlagern oder entsorgen.
(5) Bei Übergabe prüfen beide Parteien die Vollständigkeit anhand der Anlage 1 und zeichnen die Liste ab. Fehlt eine Position oder ist sie seit der Besichtigung beschädigt worden, mindert sich der Pauschalpreis um den in Anlage 1 angegebenen Einzelwert. Weitergehende Ansprüche bestehen insoweit nicht.

§ 5 Eigentumsvorbehalt und Gefahrübergang
(1) Das Inventar bleibt bis zur vollständigen Zahlung des Kaufpreises Eigentum des Verkäufers.
(2) Die Gefahr des zufälligen Untergangs und der zufälligen Verschlechterung geht mit der Übergabe, spätestens mit Beginn der Demontage durch den Käufer, auf den Käufer über.
(3) Der Käufer darf das Inventar vor vollständiger Zahlung nicht weiterveräußern oder verpfänden.

§ 6 Rechte Dritter, Software und Daten
(1) Der Verkäufer sichert zu, dass er Eigentümer aller in Anlage 1 aufgeführten Gegenstände ist und diese frei von Rechten Dritter sind, insbesondere nicht geleast, gemietet, sicherungsübereignet oder unter Eigentumsvorbehalt gekauft sind. Für Positionen, bei denen dies nicht gilt, ist dies in Anlage 1 vermerkt.
(2) Auf IT-Geräten installierte Software ist nur mitverkauft, soweit die Lizenz übertragbar ist und in Anlage 1 mit Lizenzschlüssel bzw. Lizenznachweis aufgeführt ist. Nicht übertragbare Lizenzen (insbesondere Abonnements und Volumenlizenzen) werden vom Verkäufer vor Übergabe entfernt.
(3) Der Verkäufer löscht vor Übergabe sämtliche auf Datenträgern gespeicherten Daten nach dem Stand der Technik (z. B. Werksreset, Überschreiben) und trennt die Geräte von Konten, Mobilfunkverträgen und Verwaltungssystemen (MDM). Der Käufer ist nicht berechtigt, dennoch verbliebene Daten zu nutzen, und löscht sie unverzüglich.
(4) Firmenschilder, Logos und Beschriftungen des Verkäufers entfernt [der Verkäufer vor Übergabe / der Käufer vor Nutzung]. Ein Recht zur Nutzung der Marken und Kennzeichen des Verkäufers wird nicht eingeräumt.

§ 7 Gewährleistung und Haftung
(1) Die Gewährleistung für Sachmängel des gebrauchten Inventars ist ausgeschlossen, soweit in diesem Vertrag nichts anderes bestimmt ist.
(2) Der Ausschluss gilt nicht für die Zusicherungen in § 6 Abs. 1, für arglistig verschwiegene Mängel, für Ansprüche aus der Verletzung von Leben, Körper oder Gesundheit sowie bei Vorsatz oder grober Fahrlässigkeit.
(3) Der Verkäufer haftet nicht für die Eignung des Inventars für die Zwecke des Käufers, für Energieverbrauch, Sicherheitszertifizierungen oder die Vereinbarkeit mit den Räumen des Käufers.
(4) Im Übrigen ist die Haftung beider Parteien für leichte Fahrlässigkeit auf den vertragstypischen, vorhersehbaren Schaden, höchstens auf den Netto-Kaufpreis, begrenzt.

§ 8 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; dies gilt auch für die Aufhebung dieser Klausel.
(2) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.
(3) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist [Ort], soweit beide Parteien Kaufleute sind.
(4) Anlage 1 (Inventarliste) ist Bestandteil dieses Vertrags.

[Ort], den [Datum]


______________________________
[Firma Verkäufer], vertreten durch [Vorname Nachname]


______________________________
[Firma Käufer], vertreten durch [Vorname Nachname]


Anlage 1 – Inventarliste (Muster)
Nr. | Stück | Bezeichnung / Hersteller / Modell | Seriennummer | Standort | Zustand | Einzelwert EUR | Bemerkung
1 | [Anzahl] | [z. B. Schreibtisch 160x80, weiß] | – | [Raum 1] | [gut] | [Betrag] | –
2 | [Anzahl] | [z. B. Notebook, Hersteller, Modell] | [Seriennummer] | [Raum 2] | [gebraucht, Akku 80 %] | [Betrag] | [Lizenz übertragbar: ja/nein]
3 | [Anzahl] | [z. B. Multifunktionsdrucker] | [Seriennummer] | [Flur] | – | – | ausgenommen (Leasing)
[weitere Positionen]
Summe Einzelwerte: [Betrag] EUR (Pauschalpreis gemäß § 2: [Betrag] EUR)

Bei Übergabe geprüft am [Datum]:        ______________________________        ______________________________
                                         Verkäufer                              Käufer

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "kaufvertrag-maschine",
    titel: "Kaufvertrag gebrauchte Maschine / Anlage",
    kurz: "Kaufvertrag über eine gebrauchte Maschine oder Anlage mit Spezifikation, Probelauf, Abnahme, Demontage, Transport, Dokumentation und begrenzter Gewährleistung.",
    kategorie: "kauf",
    dateiname: "Kaufvertrag-Maschine",
    wofuer: [
      "Du kaufst eine gebrauchte Produktionsmaschine, CNC-Anlage, Verpackungslinie, Druckmaschine oder Werkstattausrüstung",
      "Du verkaufst eine Maschine aus deinem Betrieb an einen anderen Unternehmer",
      "Wenn Probelauf und Abnahme vor der Zahlung des Restkaufpreises vereinbart werden sollen",
      "Wenn klar sein muss, wer Demontage, Verladung, Transport und Wiederaufbau trägt",
    ],
    enthaelt: [
      "§ 1 Kaufgegenstand und technische Spezifikation",
      "§ 2 Kaufpreis und Zahlungsplan",
      "§ 3 Probelauf und Abnahme",
      "§ 4 Demontage, Verladung und Transport",
      "§ 5 Dokumentation, CE-Kennzeichnung und Betriebsanleitung",
      "§ 6 Gefahrübergang und Eigentumsvorbehalt",
      "§ 7 Gewährleistung (begrenzt)",
      "§ 8 Haftung",
      "§ 9 Schlussbestimmungen",
      "Abnahmeprotokoll",
    ],
    hinweise: [
      "Eine gebrauchte Maschine, die vor 1995 in Verkehr gebracht wurde, hat oft keine CE-Kennzeichnung. Beim Weiterverkauf innerhalb der EU gilt sie nicht als neues Inverkehrbringen; der Betreiber muss sie aber nach Betriebssicherheitsverordnung sicher betreiben. Die Vorlage regelt, wer das verantwortet.",
      "Wer eine Maschine wesentlich verändert oder umbaut, kann als Hersteller gelten und muss eine neue Konformitätsbewertung durchführen. Umbauten vor dem Kauf im Vertrag festhalten.",
      "Der Probelauf muss unter realen Bedingungen stattfinden (eigenes Material, Nennleistung). Ein Lauf im Leerlauf beweist wenig. Lege messbare Abnahmekriterien fest.",
      "Transport und Demontage von Maschinen sind Haftungsfallen: Schäden beim Ausbau, Kranarbeiten und Transportschäden. Klare Zuweisung und Transportversicherung in der Vorlage ausfüllen.",
    ],
    faqs: [
      {
        q: "Wann sollte der Restkaufpreis fällig werden?",
        a: "Erst nach erfolgreicher Abnahme beim Verkäufer, spätestens aber vor Beginn der Demontage. So sieht es die Vorlage vor. Der Käufer sieht die Maschine laufen, bevor er den Großteil zahlt; der Verkäufer gibt sie nicht aus der Hand, bevor das Geld da ist. Eine Abnahme nach Wiederaufbau beim Käufer ist riskant, weil Transport und Montage Fehlerquellen sind, die der Verkäufer nicht kontrolliert.",
      },
      {
        q: "Was passiert, wenn der Probelauf fehlschlägt?",
        a: "Die Vorlage gibt dem Verkäufer das Recht, innerhalb einer Frist nachzubessern und den Probelauf zu wiederholen. Scheitert auch der zweite Lauf, kann der Käufer vom Vertrag zurücktreten und erhält die Anzahlung zurück. Welche Messwerte als Erfolg gelten, legt Anlage 1 fest – ohne messbare Kriterien ist jeder Streit vorprogrammiert.",
      },
      {
        q: "Welche Unterlagen muss der Verkäufer mitliefern?",
        a: "Betriebsanleitung in deutscher Sprache, Konformitätserklärung und CE-Kennzeichnung (soweit vorhanden), Schaltpläne, Wartungs- und Prüfnachweise, Ersatzteillisten und Software mit Lizenznachweis. Fehlt die Betriebsanleitung, muss der Käufer sie als Betreiber selbst beschaffen oder erstellen lassen, was teuer wird.",
      },
      {
        q: "Kann die Gewährleistung für eine gebrauchte Maschine ganz ausgeschlossen werden?",
        a: "Unter Unternehmern in einem individuell verhandelten Vertrag weitgehend ja. Die Vorlage wählt einen Mittelweg: Die Leistungswerte aus dem Probelauf sind zugesichert, weitere Gewährleistung wird auf wenige Monate begrenzt oder ausgeschlossen. Nicht ausschließbar bleiben Arglist, Vorsatz, grobe Fahrlässigkeit und Personenschäden.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Kaufvertrag für eine gebrauchte Maschine brauchst",
        text: "Gebrauchte Maschinen sind für Gründer im Handwerk und in der Produktion oft der einzige bezahlbare Einstieg: die CNC-Fräse aus einer Betriebsauflösung, die Verpackungslinie eines Herstellers, der umstellt, der Laserschneider aus der Nachbarwerkstatt. Der Preis ist niedrig, das Risiko hoch, weil du die Maschine ausbauen, transportieren und wieder in Betrieb nehmen musst und dabei an vielen Stellen etwas schiefgehen kann.\n\nDiese Vorlage ist auf diesen Ablauf zugeschnitten: Probelauf und Abnahme beim Verkäufer vor Zahlung des Restkaufpreises, klare Zuordnung von Demontage, Verladung und Transport, vollständige Dokumentation und eine begrenzte Gewährleistung. Sie passt für Produktionsmaschinen, Anlagen, Werkstattausrüstung und Druckmaschinen zwischen Unternehmern. Für kleinere Geräte ohne Probelauf reicht der B2B-Kaufvertrag, für ein ganzes Inventarpaket der Inventar-Kaufvertrag.",
      },
      {
        titel: "Was muss in einen Maschinenkaufvertrag? Spezifikation, Probelauf, Abnahme",
        text: "Eine Maschine wird über ihre technischen Daten und ihre Leistung definiert, nicht über den Typ allein. Die Vorlage verlangt deshalb in § 1 Hersteller, Seriennummer, Baujahr, Betriebsstunden, Anschlusswerte, Abmessungen, Steuerung und Software sowie Umbauten und bekannte Mängel. Darüber hinaus gehören hinein:\n\n- Kaufpreis mit Lieferbedingung (ab Standort, inklusive Verladung oder Demontage) und Zahlungsplan mit Anzahlung und Rest nach Abnahme (§ 2)\n- Probelauf unter Betriebsbedingungen mit eigenem Material des Käufers und messbaren Abnahmekriterien in Anlage 1 (§ 3)\n- Nachbesserungsrecht, zweiter Probelauf, Rücktritt und Rückzahlung der Anzahlung (§ 3 Abs. 4)\n- Demontage, Verladung, Transportversicherung, Trennung von Medien, Entsorgung der Betriebsstoffe (§ 4)\n- Betriebsanleitung, Konformitätserklärung, Pläne, Wartungsnachweise, Software-Lizenzen (§ 5)\n- Gefahrübergang mit Demontagebeginn, Eigentumsvorbehalt bis zur Zahlung (§ 6)\n- Gewährleistung auf die Abnahmekriterien und Angaben in § 1, im Übrigen begrenzt oder ausgeschlossen (§ 7)\n- Haftungsbegrenzung und Betreiberverantwortung nach Übergabe (§ 8)\n- Abnahmeprotokoll mit Soll- und Istwerten",
      },
      {
        titel: "Maschinenkaufvertrag Muster ausfüllen: so legst du Abnahmekriterien fest",
        text: "Fülle zuerst § 1 mit den Daten vom Typenschild und aus der Maschinendokumentation: Seriennummer, Baujahr, Betriebsstunden mit Ablesedatum, Anschlusswerte, Gewicht. Frage ausdrücklich nach Umbauten und trage sie mit Datum und Ausführendem ein. Dann die Anlage 1: Lege dort messbare Abnahmekriterien fest, etwa Taktzeit in Sekunden, Toleranz am Prüfteil in Millimetern, Dauerlauf in Stunden ohne Störung. Ohne Zahlen ist der Probelauf nicht überprüfbar.\n\nIn § 2 wählst du die Lieferbedingung und die Aufteilung der Zahlung, üblich sind 30 Prozent Anzahlung und 70 Prozent nach Abnahme. In § 3 trägst du Datum des Probelaufs und die Frist ein, bis zu der du Material und Programme bereitstellst. In § 4 entscheidest du je Satz, wer demontiert, verlädt, Medien trennt und Betriebsstoffe entsorgt; die Klausel zur Transportversicherung über den Kaufpreis bleibt stehen. In § 5 kreuzt du an, ob eine Konformitätserklärung vorhanden ist und ob die Maschine CE-gekennzeichnet ist. In § 7 Abs. 2 wählst du zwischen Ausschluss und einer Gewährleistung von wenigen Monaten. Beim Probelauf füllt ihr gemeinsam das Abnahmeprotokoll mit Soll- und Istwerten aus.",
      },
      {
        titel: "Typische Fehler beim Maschinenkauf und wie du sie vermeidest",
        text: "Der häufigste Fehler ist der Probelauf im Leerlauf. Eine Maschine, die ohne Material läuft, beweist nichts über Toleranzen und Taktzeit; bring eigene Werkstücke und Programme mit, so wie § 3 Abs. 1 es vorsieht. Zweiter Fehler: Restkaufpreis erst nach Wiederaufbau beim Käufer. Dann streitet ihr, ob der Fehler aus dem Transport, der Montage oder der Maschine stammt; die Vorlage legt die Abnahme deshalb an den Standort des Verkäufers.\n\nDritter Fehler: Demontage ohne Fachfirma. Kranarbeiten, Fundamentlösen und Hydraulik sind Haftungsfallen, und Schäden an der Halle des Verkäufers trägt, wer die Arbeit ausführt (§ 4 Abs. 3). Vierter Fehler: keine Betriebsanleitung in deutscher Sprache. Als Betreiber brauchst du sie für Gefährdungsbeurteilung und Unterweisung; fehlt sie, musst du sie teuer erstellen lassen. Fünfter Fehler: Steuerungssoftware übersehen. Viele Hersteller binden Lizenzen an den Erstkäufer; frage vor Vertragsschluss beim Hersteller nach den Umschreibungsgebühren, die nach § 5 Abs. 3 der Käufer trägt.",
      },
      {
        titel: "Rechtliche Grundlagen: Gewährleistung, Gefahrübergang, CE und Betriebssicherheit",
        text: "Der Maschinenkauf ist ein Kauf beweglicher Sachen nach §§ 433 ff. BGB zwischen Unternehmern; die Rügepflicht des § 377 HGB gilt, die Vorlage verweist in § 7 Abs. 5 darauf. Die Abnahmekriterien und die Angaben in § 1 sind Beschaffenheitsvereinbarungen nach § 434 BGB. Für alles andere darf die Gewährleistung unter Unternehmern bei individueller Vereinbarung begrenzt oder ausgeschlossen werden, mit den Grenzen des § 444 BGB für Arglist und Garantien sowie den Grenzen für Vorsatz, grobe Fahrlässigkeit und Personenschäden.\n\nDie Gefahr geht gesetzlich mit Übergabe über (§ 446 BGB); die Vorlage legt sie auf den Beginn der Demontage, weil ab dann der Käufer die Kontrolle hat. Der Eigentumsvorbehalt nach § 449 BGB sichert den Verkäufer. Produktsicherheitsrechtlich gilt: Der Weiterverkauf einer gebrauchten Maschine innerhalb der EU ist kein neues Inverkehrbringen, deshalb ist keine neue CE-Kennzeichnung nötig. Der Käufer muss die Maschine aber als Betreiber nach der Betriebssicherheitsverordnung sicher betreiben, also Gefährdungsbeurteilung, Prüfungen und Schutzeinrichtungen verantworten. Wer eine Maschine wesentlich verändert, kann selbst zum Hersteller werden und eine Konformitätsbewertung schulden; deshalb fragt § 1 Abs. 3 nach Umbauten.",
      },
      {
        titel: "Wann der Maschinenkaufvertrag aus der Vorlage nicht reicht",
        text: "Kaufst du die Maschine im Ausland, kommen UN-Kaufrecht, Incoterms, Zoll und bei Drittstaaten die Pflichten des Importeurs hinzu; dann sollte ein Anwalt den Vertrag anpassen. Beim Kauf aus einer Insolvenz verkauft der Verwalter meist ohne Gewährleistung und ohne Probelauf; dann ersetzt ein eigenes Sachverständigengutachten den § 3. Bei Maschinen mit Finanzierung oder Leasing beim Verkäufer braucht ihr die Ablösebestätigung der Bank, bevor Eigentum übergehen kann.\n\nSoll der Verkäufer die Maschine auch beim Käufer aufstellen und in Betrieb nehmen, ist das ein zusätzlicher Werkvertrag mit eigener Abnahme; die Vorlage sieht nur optionale Unterstützungstage vor. Für Anlagen mit Druckbehältern, Lasern oder Kranen gelten zusätzliche Prüfpflichten vor der ersten Nutzung. Steuerlich klärt der Steuerberater, ob der Kauf als Teil einer Geschäftsveräußerung im Ganzen umsatzsteuerfrei ist. GründerX ist Software und bietet Muster, keine Rechtsberatung; bei hohen Kaufpreisen lohnt die anwaltliche Prüfung vor Unterschrift.",
      },
    ],
    seo: {
      title: "Kaufvertrag gebrauchte Maschine Vorlage kostenlos | GründerX",
      description:
        "Kaufvertrag für gebrauchte Maschinen und Anlagen: Spezifikation, Probelauf und Abnahme, Demontage, Transport, CE, Betriebsanleitung, begrenzte Gewährleistung.",
    },
    stand: "2026-10",
    text: `Kaufvertrag über eine gebrauchte Maschine / Anlage

zwischen

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], USt-IdNr. [DE…]
– nachfolgend „Verkäufer“ –

und

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], USt-IdNr. [DE…]
– nachfolgend „Käufer“ –

Vorbemerkung
Beide Parteien handeln als Unternehmer. Der Verkäufer betreibt die nachfolgend bezeichnete Maschine in seinem Betrieb in [Adresse] und veräußert sie an den Käufer, der sie in seinem Betrieb in [Adresse] weiterbetreiben will.

§ 1 Kaufgegenstand und technische Spezifikation
(1) Der Verkäufer verkauft dem Käufer die folgende gebrauchte Maschine (nachfolgend „Maschine“):
   Hersteller / Typ: [Hersteller, Typenbezeichnung]
   Maschinen- / Seriennummer: [Nummer]
   Baujahr: [Jahr]
   Betriebsstunden laut Zähler: [Stunden] (Stand [Datum])
   Standort: [Adresse, Halle, Fundament]
   Anschlusswerte: [z. B. 400 V / 32 A, Druckluft 6 bar, Wasseranschluss]
   Abmessungen / Gewicht: [L x B x H in m, kg]
   Steuerung / Software: [Steuerung, Softwareversion, Lizenz]
(2) Mitverkauft sind folgendes Zubehör, Werkzeuge und Ersatzteile: [z. B. Werkzeugsatz, Spannmittel, Absauganlage, Ersatzteile laut Anlage 2].
(3) Die vereinbarte Beschaffenheit ergibt sich abschließend aus Absatz 1, Anlage 1 (technische Spezifikation und Abnahmekriterien) und dem Ergebnis des Probelaufs nach § 3. Umbauten und wesentliche Veränderungen gegenüber dem Auslieferungszustand des Herstellers: [keine / folgende: [Beschreibung, Datum, Ausführender]].
(4) Dem Verkäufer bekannte Mängel und Einschränkungen: [z. B. Spindellager ab 8.000 U/min hörbar, Achse Y Umkehrspiel 0,03 mm, Schutzhaube links Riss].

§ 2 Kaufpreis und Zahlungsplan
(1) Der Kaufpreis beträgt [Betrag] EUR netto zuzüglich 19 % Umsatzsteuer, gesamt [Betrag] EUR brutto, [ab Standort des Verkäufers (ex works, unverladen) / einschließlich Verladung / einschließlich Demontage und Verladung].
(2) Zahlung:
   a) [z. B. 30] % ([Betrag] EUR) als Anzahlung innerhalb von [z. B. 5] Werktagen nach Vertragsschluss,
   b) [z. B. 70] % ([Betrag] EUR) innerhalb von [z. B. 5] Werktagen nach erfolgreicher Abnahme gemäß § 3, in jedem Fall vor Beginn der Demontage.
(3) Zahlungen erfolgen per Überweisung auf das Konto [IBAN], [Bank]. Bei Verzug gelten Zinsen in Höhe von 9 Prozentpunkten über dem Basiszinssatz (§ 288 Abs. 2 BGB).

§ 3 Probelauf und Abnahme
(1) Der Verkäufer führt die Maschine am [Datum] am Standort des Verkäufers im Beisein des Käufers unter Betriebsbedingungen vor (Probelauf). Der Käufer darf eigenes Material und eigene Programme/Werkstücke einsetzen; er stellt diese bis zum [Datum] bereit.
(2) Die Abnahme gilt als erfolgreich, wenn die in Anlage 1 festgelegten Abnahmekriterien erreicht werden, insbesondere: [z. B. Taktzeit max. [Sekunden], Toleranz [mm] bei Prüfteil, Dauerlauf [Stunden] ohne Störung, Dokumentation vollständig].
(3) Über den Probelauf wird ein Abnahmeprotokoll gefertigt und von beiden Parteien unterzeichnet. Geringfügige Mängel, die die Nutzung nicht wesentlich beeinträchtigen, hindern die Abnahme nicht; sie werden im Protokoll festgehalten und vom Verkäufer bis zum [Datum / vor Demontage] beseitigt.
(4) Werden die Abnahmekriterien nicht erreicht, kann der Verkäufer innerhalb von [z. B. 14] Tagen nachbessern und einen zweiten Probelauf anbieten. Scheitert auch dieser, kann der Käufer vom Vertrag zurücktreten; die Anzahlung wird innerhalb von [z. B. 10] Tagen zurückgezahlt. Weitergehende Ansprüche bestehen nur nach Maßgabe des § 8.
(5) Nimmt der Käufer am vereinbarten Termin ohne wichtigen Grund nicht teil und holt den Termin nicht innerhalb von [z. B. 14] Tagen nach, gilt die Maschine als abgenommen.

§ 4 Demontage, Verladung und Transport
(1) Die Demontage erfolgt durch [den Käufer bzw. ein von ihm beauftragtes Fachunternehmen / den Verkäufer] zwischen dem [Datum] und dem [Datum]. Der Verkäufer gewährt Zugang zu den Räumen, Strom, Druckluft und, soweit vorhanden, Hallenkran und Stapler [gegen / ohne] Kostenerstattung.
(2) Die Verladung erfolgt durch [den Käufer / den Verkäufer]. Der Transport ab Laderampe des Verkäufers ist Sache des Käufers. Der Käufer schließt eine Transportversicherung über den Kaufpreis ab.
(3) Schäden an Gebäude, Fundament, Versorgungsleitungen oder anderen Anlagen des Verkäufers, die bei Demontage und Verladung entstehen, ersetzt diejenige Partei, die die jeweilige Arbeit ausführt oder beauftragt hat.
(4) Der Verkäufer trennt die Maschine vor Demontage von Strom, Druckluft, Wasser und Netzwerk und entleert Betriebsstoffe (Öl, Kühlschmierstoff) [auf seine Kosten / auf Kosten des Käufers]. Die Entsorgung der Betriebsstoffe übernimmt [der Verkäufer / der Käufer].
(5) Der Wiederaufbau und die Inbetriebnahme beim Käufer sind nicht Gegenstand dieses Vertrags. [Optional: Der Verkäufer stellt für [Anzahl] Tage einen Mitarbeiter zur Unterstützung der Inbetriebnahme gegen [Betrag] EUR je Tag zuzüglich Reisekosten zur Verfügung.]

§ 5 Dokumentation, CE-Kennzeichnung und Betriebsanleitung
(1) Der Verkäufer übergibt bei Abnahme folgende Unterlagen: Betriebsanleitung in deutscher Sprache, EG-/EU-Konformitätserklärung [vorhanden / nicht vorhanden, Baujahr vor Geltung der Maschinenrichtlinie], Schalt- und Hydraulikpläne, Wartungs- und Prüfnachweise der letzten [Anzahl] Jahre, Ersatzteilliste, Softwaredatenträger und Lizenznachweise, Programme und Parametersätze [auf Datenträger].
(2) Die Maschine trägt [eine CE-Kennzeichnung des Herstellers vom [Jahr] / keine CE-Kennzeichnung]. Der Verkäufer erklärt, dass er an der Maschine [keine / die in § 1 Abs. 3 genannten] wesentlichen Veränderungen vorgenommen hat. Für die Einhaltung der Anforderungen der Betriebssicherheitsverordnung beim Betrieb nach Übergabe (Gefährdungsbeurteilung, Prüfungen, Schutzeinrichtungen) ist ausschließlich der Käufer als Betreiber verantwortlich.
(3) Software und Steuerungsprogramme werden übertragen, soweit die Lizenzbedingungen des Herstellers dies zulassen. Der Verkäufer unterstützt den Käufer bei der Umschreibung von Lizenzen; Gebühren des Herstellers trägt der Käufer.

§ 6 Gefahrübergang und Eigentumsvorbehalt
(1) Die Gefahr des zufälligen Untergangs und der zufälligen Verschlechterung geht mit Beginn der Demontage, spätestens mit Verladung, auf den Käufer über. Führt der Verkäufer die Demontage durch, geht die Gefahr mit Verladung auf das Transportmittel des Käufers über.
(2) Die Maschine bleibt bis zur vollständigen Zahlung des Kaufpreises Eigentum des Verkäufers. Vor vollständiger Zahlung beginnt keine Demontage.

§ 7 Gewährleistung (begrenzt)
(1) Die Maschine wird als gebrauchte Maschine verkauft. Der Verkäufer gewährleistet, dass die Maschine bei Abnahme die in Anlage 1 festgelegten Abnahmekriterien erfüllt und die Angaben in § 1 Abs. 1 zutreffen.
(2) Darüber hinaus wird die Gewährleistung für Sachmängel [ausgeschlossen / auf [z. B. 6] Monate ab Abnahme beschränkt und auf Nachbesserung begrenzt; schlägt die Nachbesserung zweimal fehl, kann der Käufer mindern oder zurücktreten].
(3) Verschleißteile, Betriebsstoffe, Mängel infolge unsachgemäßer Demontage, Transport, Wiederaufbau, Inbetriebnahme oder Bedienung durch den Käufer sowie Abweichungen, die auf andere Aufstell- und Umgebungsbedingungen beim Käufer zurückzuführen sind, sind von der Gewährleistung ausgenommen.
(4) Der Ausschluss bzw. die Begrenzung gilt nicht bei arglistig verschwiegenen Mängeln, bei Vorsatz oder grober Fahrlässigkeit sowie für Schäden aus der Verletzung von Leben, Körper oder Gesundheit.
(5) Der Käufer hat Mängel unverzüglich nach Entdeckung in Textform anzuzeigen (§ 377 HGB).

§ 8 Haftung
(1) Der Verkäufer haftet unbeschränkt für Vorsatz, grobe Fahrlässigkeit, Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie nach dem Produkthaftungsgesetz.
(2) Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten haftet der Verkäufer nur für den vertragstypischen, vorhersehbaren Schaden, höchstens bis zur Höhe des Netto-Kaufpreises. Im Übrigen ist die Haftung für leichte Fahrlässigkeit ausgeschlossen, insbesondere für Produktionsausfall, entgangenen Gewinn und Folgeschäden.
(3) Für Schäden, die beim Betrieb der Maschine nach Übergabe entstehen, haftet der Verkäufer nicht; der Käufer stellt den Verkäufer von Ansprüchen Dritter insoweit frei.

§ 9 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; dies gilt auch für die Aufhebung dieser Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.
(3) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist [Ort], soweit beide Parteien Kaufleute sind.
(4) Anlagen: Anlage 1 – Technische Spezifikation und Abnahmekriterien; Anlage 2 – Zubehör- und Ersatzteilliste; Anlage 3 – Übersicht der übergebenen Dokumentation. Die Anlagen sind Bestandteil dieses Vertrags.

[Ort], den [Datum]


______________________________
[Firma Verkäufer], vertreten durch [Vorname Nachname]


______________________________
[Firma Käufer], vertreten durch [Vorname Nachname]


Abnahmeprotokoll
Maschine: [Hersteller/Typ], Seriennummer [Nummer]
Probelauf am [Datum] von [Uhrzeit] bis [Uhrzeit] in [Ort]
Eingesetztes Material / Prüfteil: [Angabe]
Abnahmekriterium 1: [Kriterium] – Sollwert [Wert] – Istwert [Wert] – [ ] erfüllt [ ] nicht erfüllt
Abnahmekriterium 2: [Kriterium] – Sollwert [Wert] – Istwert [Wert] – [ ] erfüllt [ ] nicht erfüllt
Dokumentation gemäß § 5 übergeben: [ ] vollständig  [ ] es fehlt: [Angabe]
Festgestellte geringfügige Mängel (Beseitigung bis [Datum]): [Angabe]
Ergebnis: [ ] Abnahme erklärt  [ ] Abnahme verweigert, zweiter Probelauf am [Datum]


______________________________                ______________________________
Verkäufer                                      Käufer

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "kaufvertrag-warenlager",
    titel: "Kaufvertrag Warenbestand / Restposten",
    kurz: "Kaufvertrag über einen kompletten Warenbestand oder Restposten mit Inventurliste, Stück- oder Pauschalpreis, Zustand, MHD, Markenrechten und Rücknahmeausschluss.",
    kategorie: "kauf",
    dateiname: "Kaufvertrag-Warenlager",
    wofuer: [
      "Du kaufst einen Lagerbestand, eine Insolvenzware oder Restposten von einem Händler oder Hersteller",
      "Du verkaufst dein Restlager bei Sortimentswechsel, Shop-Schließung oder Umzug an einen Aufkäufer",
      "Wenn der Preis je Stück oder pauschal für den Gesamtbestand vereinbart werden soll",
      "Wenn geklärt werden muss, ob die Ware mit Markenrechten frei weiterverkauft werden darf",
    ],
    enthaelt: [
      "§ 1 Kaufgegenstand und Inventurliste",
      "§ 2 Kaufpreis (Stückpreise oder Pauschale)",
      "§ 3 Zustand, Mindesthaltbarkeit und Kennzeichnung",
      "§ 4 Markenrechte und Weiterverkauf",
      "§ 5 Lieferung, Übergabe und Mengenabweichungen",
      "§ 6 Eigentumsvorbehalt und Gefahrübergang",
      "§ 7 Gewährleistung, Rügepflicht und Rücknahmeausschluss",
      "§ 8 Haftung",
      "§ 9 Schlussbestimmungen",
    ],
    hinweise: [
      "Markenware darf nur weiterverkauft werden, wenn sie mit Zustimmung des Markeninhabers in der EU bzw. im EWR in Verkehr gebracht wurde (Erschöpfung, § 24 MarkenG). Graue Importe oder Ware mit Vertriebsbindung können Abmahnungen auslösen – die Vorlage lässt den Verkäufer die Herkunft zusichern.",
      "Lebensmittel, Kosmetik und Nahrungsergänzung: Mindesthaltbarkeit, Chargen und Rückverfolgbarkeit sind Pflicht. Ware mit abgelaufenem MHD darf als Lebensmittel nur mit Einschränkungen verkauft werden; bei Verbrauchsdatum gar nicht.",
      "Beim Kauf aus einer Insolvenz verkauft der Insolvenzverwalter regelmäßig unter vollständigem Gewährleistungsausschluss. Dann unbedingt selbst besichtigen und Stichproben ziehen.",
      "Prüfe die Produktsicherheit: Elektronik ohne CE, Spielzeug ohne Konformität oder Produkte mit laufendem Rückruf darfst du als Händler nicht in Verkehr bringen, egal wie günstig der Einkauf war.",
    ],
    faqs: [
      {
        q: "Stückpreis oder Pauschalpreis – was ist besser?",
        a: "Stückpreise sind fair, wenn die Mengen noch nicht sicher sind: Gezahlt wird, was bei der Übergabe gezählt wird. Ein Pauschalpreis ist einfacher und günstiger für den Käufer, wenn er den Bestand kennt, trägt aber das Risiko von Fehlmengen. Die Vorlage bietet beide Varianten und regelt Abweichungen bei der Übergabezählung.",
      },
      {
        q: "Darf ich die gekaufte Markenware auf Amazon oder eBay weiterverkaufen?",
        a: "Grundsätzlich ja, wenn die Ware vom Markeninhaber oder mit seiner Zustimmung im EWR in Verkehr gebracht wurde. Vertriebsbindungen des Herstellers wirken nur zwischen Hersteller und seinem Vertragshändler, nicht gegen dich. Problematisch sind Ware von außerhalb des EWR, Fälschungen und Produkte mit entfernten Seriennummern. Lass dir die Herkunft und Lieferkette belegen.",
      },
      {
        q: "Was gilt, wenn bei der Lieferung weniger Ware da ist als auf der Liste?",
        a: "Bei Stückpreisen zahlst du nur die tatsächlich gelieferte Menge. Beim Pauschalpreis mindert sich der Preis anteilig, wenn die Abweichung über der in der Vorlage festgelegten Toleranz liegt. Entscheidend ist die gemeinsame Zählung bei der Übergabe und die Rüge nach § 377 HGB innerhalb der vereinbarten Frist.",
      },
      {
        q: "Kann ich unverkäufliche Ware an den Verkäufer zurückgeben?",
        a: "Nein, die Vorlage schließt die Rücknahme aus. Der Käufer trägt das Absatzrisiko; dafür kauft er günstig. Rückgaberechte bestehen nur bei Mängeln, die rechtzeitig gerügt wurden, oder wenn der Verkäufer Zusicherungen zur Herkunft oder Verkehrsfähigkeit verletzt hat.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Kaufvertrag für Warenbestand oder Restposten brauchst",
        text: "Restposten sind für Händler und Online-Seller ein klassischer Einstieg: Ein Shop schließt und verkauft sein Lager, ein Hersteller räumt die Vorsaison, ein Insolvenzverwalter versilbert Bestände, ein Großhändler hat Überbestand. Du kaufst palettenweise zu einem Bruchteil des Einkaufspreises und verkaufst über Marktplätze, deinen Shop oder Outlet-Kanäle weiter. Umgekehrt stehst du als Verkäufer da, wenn du dein Sortiment wechselst oder dein Geschäft aufgibst.\n\nDie Vorlage regelt den Verkauf eines kompletten Bestands anhand einer Inventurliste, mit Stück- oder Pauschalpreis, gemeinsamer Zählung bei Übergabe und Rücknahmeausschluss. Entscheidend sind die Zusicherungen zu Herkunft, Markenrechten und Kennzeichnung, denn beim Weiterverkauf haftest du als Händler. Für laufende Lieferungen vom selben Lieferanten nimmst du den Rahmenliefervertrag, für Ware, die beim Händler Eigentum des Herstellers bleibt, den Kommissionsvertrag.",
      },
      {
        titel: "Was muss in einen Restposten-Kaufvertrag? Inventurliste, Preis, Zusicherungen",
        text: "Ohne genaue Liste weiß niemand, was verkauft wurde. Die Vorlage verlangt in Anlage 1 je Artikel Artikelnummer, EAN, Bezeichnung, Marke, Variante, Menge, Zustand, bei Lebensmitteln und Kosmetik Mindesthaltbarkeitsdatum und Charge, Verpackungseinheit und Stückpreis oder Einzelwert. Darüber hinaus gehören in den Vertrag:\n\n- Stichtag der Inventur und Entnahmeverbot bis zur Übergabe (§ 1 Abs. 2)\n- was nicht mitverkauft ist: Kommissionsware, Vorbehaltsware von Lieferanten, Displays (§ 1 Abs. 3)\n- Kaufpreis als Variante A Stückpreise oder Variante B Pauschale mit Toleranz, Umsatzsteuersatz, Anzahlung (§ 2)\n- Zustand, MHD-Restlaufzeit, Lagerbedingungen, keine Rückrufe, Kennzeichnung für den deutschen Markt (§ 3)\n- Originalware, EWR-Erschöpfung, bekannte Vertriebsbeschränkungen, keine entfernten Seriennummern (§ 4)\n- Übergabe, gemeinsame Zählung, Protokoll, Mengenabweichungen (§ 5)\n- verlängerter Eigentumsvorbehalt und Gefahrübergang (§ 6)\n- Gewährleistung, Rügepflicht, Rücknahmeausschluss, Folgen verletzter Herkunftszusicherung (§ 7)\n- Verantwortung für Kennzeichnung und Produktsicherheit ab Übergabe (§ 8)",
      },
      {
        titel: "Kaufvertrag Warenbestand ausfüllen: Stückpreis oder Pauschale wählen",
        text: "Beginne mit der Inventurliste, am besten als Export aus der Warenwirtschaft des Verkäufers, ergänzt um Zustand und MHD. Trage in der Vorbemerkung den Lagerort und den Grund des Verkaufs ein, in § 1 Abs. 2 das Datum der Liste und ob der Verkäufer bis zur Übergabe noch Bestellungen bedienen darf. Dann entscheidest du dich in § 2 für eine Variante und löschst die andere: Stückpreise, wenn die Mengen unsicher sind, Pauschale mit Toleranz in Prozent, wenn du den Bestand kennst. Prüfe den Umsatzsteuersatz: Bücher, viele Lebensmittel und einige Hygieneprodukte haben sieben Prozent, das kennzeichnest du in der Liste.\n\nIn § 3 Abs. 1 wählst du den Zustand (neu, ohne Originalverpackung, Retourenware, B-Ware) und trägst die MHD-Mindestlaufzeit ein. In § 4 Abs. 2 schreibt der Verkäufer auf, welche Vertriebsbeschränkungen der Hersteller ihm bekannt sind; die optionale Überlassung von Produktfotos behältst du nur, wenn er die Rechte daran hat. In § 5 legst du Abholung oder Lieferung, Palettenzahl und die Frist für eine Nachzählung fest, in § 7 Abs. 1 ob die Gewährleistung ausgeschlossen oder verkürzt ist. Bei der Übergabe zählt ihr gemeinsam und unterschreibt das Protokoll.",
      },
      {
        titel: "Typische Fehler beim Restpostenkauf und wie du sie vermeidest",
        text: "Erster Fehler: Markenware ohne Herkunftsnachweis kaufen. Wurde die Ware nicht vom Markeninhaber oder mit seiner Zustimmung im EWR in Verkehr gebracht, darfst du sie nicht verkaufen, egal wie günstig sie war; Abmahnung und Vernichtung drohen. Lass dir Einkaufsrechnungen zeigen, § 4 Abs. 1 gibt dir das Recht dazu. Zweiter Fehler: Produkte ohne deutsche Kennzeichnung. Elektronik ohne CE, Textilien ohne Materialangabe, Kosmetik ohne deutsche Inhaltsstoffliste musst du nachkennzeichnen oder darfst sie nicht in Verkehr bringen; die Vorlage lässt dich das in § 3 Abs. 4 regeln.\n\nDritter Fehler: Pauschalpreis ohne Toleranzklausel. Fehlen bei der Übergabe zehn Prozent, hast du ohne § 2 Variante B Satz 2 keinen Minderungsanspruch. Vierter Fehler: Rüge vergessen. Nach § 377 HGB musst du Fehlmengen und erkennbare Mängel innerhalb der vereinbarten Werktage anzeigen, sonst gilt die Ware als genehmigt. Fünfter Fehler: Retourenware als „neu“ einkaufen. Ungeprüfte Retouren enthalten Defekte und Fehlteile; der Preis muss das abbilden, und du darfst sie nicht als Neuware verkaufen.",
      },
      {
        titel: "Rechtliche Grundlagen: Erschöpfung, § 377 HGB, Produktsicherheit, Eigentumsvorbehalt",
        text: "Der Kauf eines Warenbestands ist ein Kauf beweglicher Sachen nach §§ 433 ff. BGB zwischen Unternehmern mit der Untersuchungs- und Rügepflicht des § 377 HGB. Unter Unternehmern lässt sich die Gewährleistung für Restposten weitgehend ausschließen, nicht aber für arglistig verschwiegene Mängel, zugesicherte Eigenschaften (§ 444 BGB), Vorsatz, grobe Fahrlässigkeit und Personenschäden. Die Zusicherungen zu Herkunft und Kennzeichnung sind deshalb als Beschaffenheitsvereinbarungen ausgestaltet, für die der Verkäufer trotz Ausschluss einsteht.\n\nMarkenrechtlich gilt die Erschöpfung nach § 24 MarkenG: Ware, die mit Zustimmung des Markeninhabers im Europäischen Wirtschaftsraum in Verkehr gebracht wurde, darf frei weiterverkauft werden; Importe aus Drittstaaten nicht. Vertriebsbindungen des Herstellers wirken nur gegenüber seinen Vertragshändlern. Beim Weiterverkauf bist du Händler im Sinne des Produktsicherheitsrechts und musst Kennzeichnung, Rückverfolgbarkeit und Verpackungs-, Elektro- und Batteriegesetz einhalten. Der verlängerte Eigentumsvorbehalt in § 6 erlaubt dir den Weiterverkauf vor vollständiger Zahlung, tritt aber die Erlösforderung an den Verkäufer ab. Bei Lebensmitteln gelten zusätzlich die Vorschriften zu Mindesthaltbarkeits- und Verbrauchsdatum.",
      },
      {
        titel: "Wann die Vorlage für Restposten nicht reicht",
        text: "Beim Kauf aus einer Insolvenz bestimmt der Verwalter den Vertrag; er verkauft ohne Gewährleistung und ohne Zusicherungen. Dann ersetzt deine eigene Besichtigung mit Stichproben und Fotodokumentation den § 3 und § 4, und du kalkulierst das Risiko in den Preis ein. Beim Import aus Drittstaaten kommen Zoll, Einfuhrumsatzsteuer und die Pflichten des Importeurs nach Produktsicherheitsrecht hinzu; dafür braucht der Vertrag Incoterms und Regeln zur Einfuhrabwicklung.\n\nBei Lebensmitteln, Kosmetik, Nahrungsergänzung, Spielzeug und Elektronik solltest du vor dem Kauf prüfen, ob du die Zulassungs- und Registrierungspflichten (LUCID, stiftung ear, Kosmetikportal CPNP, Rückverfolgbarkeit) selbst erfüllen kannst. Bei Markenware mit selektivem Vertriebssystem und bei größeren Beträgen lohnt die anwaltliche Prüfung der Lieferkette, weil die Freistellung in § 7 Abs. 5 nur so viel wert ist wie der Verkäufer zahlungsfähig. GründerX stellt Software und Muster bereit und ersetzt keine Rechtsberatung.",
      },
    ],
    seo: {
      title: "Kaufvertrag Warenbestand Vorlage kostenlos | GründerX",
      description:
        "Kaufvertrag für Warenbestand und Restposten: Inventurliste, Stückpreise oder Pauschale, Zustand und MHD, Markenrechte, Lieferung, Rücknahme ausgeschlossen.",
    },
    stand: "2026-10",
    text: `Kaufvertrag über einen Warenbestand (Restposten)

zwischen

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], USt-IdNr. [DE…]
– nachfolgend „Verkäufer“ –

und

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], USt-IdNr. [DE…]
– nachfolgend „Käufer“ –

Vorbemerkung
Beide Parteien handeln als Unternehmer. Der Verkäufer veräußert den in seinem Lager [Adresse] befindlichen Warenbestand [wegen Sortimentswechsel / Geschäftsaufgabe / Überbestand] an den Käufer, der die Ware im eigenen Namen weiterverkauft.

§ 1 Kaufgegenstand und Inventurliste
(1) Der Verkäufer verkauft dem Käufer den in Anlage 1 (Inventurliste) aufgeführten Warenbestand (nachfolgend „Ware“). Die Inventurliste enthält je Artikel: Artikelnummer, EAN/GTIN, Bezeichnung, Marke, Variante (Größe/Farbe), Menge, Zustand, [Mindesthaltbarkeitsdatum, Charge], Verpackungseinheit und [Stückpreis / Einzelwert].
(2) Stand der Inventurliste ist der [Datum]. Zwischen diesem Datum und der Übergabe darf der Verkäufer aus dem Bestand [nichts mehr entnehmen / nur noch bereits eingegangene Kundenbestellungen bedienen; Entnahmen werden in einer aktualisierten Liste bei Übergabe ausgewiesen].
(3) Nicht mitverkauft sind: [z. B. Kommissionsware Dritter, Ware unter Eigentumsvorbehalt von Lieferanten, Displays und Ladenausstattung, Ware mit Verbrauchsdatum].
(4) Der Käufer hat den Bestand am [Datum] besichtigt und Stichproben entnommen.

§ 2 Kaufpreis
[Variante A – Stückpreise]
(1) Der Kaufpreis bemisst sich nach den in Anlage 1 je Artikel vereinbarten Stückpreisen multipliziert mit der bei Übergabe tatsächlich gezählten Menge. Auf Basis der Inventurliste vom [Datum] beträgt der vorläufige Kaufpreis [Betrag] EUR netto.
[Variante B – Pauschalpreis]
(1) Der Kaufpreis für den gesamten Warenbestand gemäß Anlage 1 beträgt pauschal [Betrag] EUR netto. Weicht die bei Übergabe gezählte Gesamtmenge um mehr als [z. B. 3] % nach unten von der Inventurliste ab, mindert sich der Pauschalpreis im Verhältnis der Einzelwerte der fehlenden Artikel.
(2) Zum Kaufpreis kommt die gesetzliche Umsatzsteuer von derzeit 19 % [bzw. 7 % für die in Anlage 1 entsprechend gekennzeichneten Artikel]. Der Verkäufer stellt eine ordnungsgemäße Rechnung aus.
(3) Zahlung: [Betrag] EUR ([z. B. 30] %) als Anzahlung bei Vertragsschluss, der Restbetrag innerhalb von [z. B. 3] Werktagen nach gemeinsamer Zählung bei Übergabe, in jedem Fall vor Abtransport, per Überweisung auf [IBAN].
(4) Bei Zahlungsverzug gelten Verzugszinsen von 9 Prozentpunkten über dem Basiszinssatz (§ 288 Abs. 2 BGB).

§ 3 Zustand, Mindesthaltbarkeit und Kennzeichnung
(1) Die Ware ist [neu und originalverpackt / neu, teils ohne Originalverpackung / Retourenware, ungeprüft / B-Ware mit folgenden Einschränkungen: [Angabe]]. Der Zustand je Artikel ergibt sich aus Anlage 1.
(2) Bei Ware mit Mindesthaltbarkeitsdatum sichert der Verkäufer zu, dass das MHD bei Übergabe noch mindestens [z. B. 6] Monate läuft, soweit in Anlage 1 nichts Abweichendes angegeben ist. Ware mit kürzerem MHD ist in Anlage 1 gesondert ausgewiesen und mit abgesenktem Preis bewertet.
(3) Der Verkäufer sichert zu, dass die Ware ordnungsgemäß gelagert wurde ([trocken, lichtgeschützt, Temperatur [Bereich]]) und dass ihm keine Rückrufe, Sicherheitswarnungen oder behördlichen Verkaufsverbote für die Ware bekannt sind.
(4) Die Ware ist mit den für den Verkauf in Deutschland erforderlichen Kennzeichnungen versehen ([CE-Kennzeichnung, deutschsprachige Etiketten und Anleitungen, Lebensmittelkennzeichnung, Textilkennzeichnung, Herstellerangaben nach Produktsicherheitsverordnung]) [bzw.: Folgende Artikel sind nicht für den deutschen Markt gekennzeichnet: [Angabe]; der Käufer übernimmt die Nachkennzeichnung].

§ 4 Markenrechte und Weiterverkauf
(1) Der Verkäufer sichert zu, dass die Ware Originalware ist, vom jeweiligen Markeninhaber oder mit dessen Zustimmung im Europäischen Wirtschaftsraum in Verkehr gebracht wurde und keine Fälschungen, Plagiate oder Parallelimporte aus Drittstaaten enthält. Auf Verlangen legt der Verkäufer Einkaufsrechnungen oder Lieferantennachweise vor [in geschwärzter Form hinsichtlich der Preise].
(2) Dem Verkäufer sind [keine / folgende] vertraglichen Vertriebsbeschränkungen der Hersteller bekannt: [z. B. selektives Vertriebssystem der Marke [Marke], Verkaufsverbot auf Marktplätzen laut Händlervertrag]. Der Käufer ist nicht Partei solcher Vereinbarungen; er trägt jedoch das Risiko, dass Hersteller den Weiterverkauf beanstanden, soweit keine Zusicherung nach Absatz 1 verletzt ist.
(3) Seriennummern, Chargen und Herstellerkennzeichnungen sind unverändert. Der Käufer verpflichtet sich, diese nicht zu entfernen.
(4) Ein Recht zur Nutzung von Marken, Logos, Produktbildern und Texten des Verkäufers oder der Hersteller über das für den Weiterverkauf gesetzlich Zulässige hinaus wird nicht eingeräumt. [Optional: Der Verkäufer überlässt dem Käufer seine Produktfotos und Beschreibungstexte für die in Anlage 1 genannten Artikel zur Nutzung im Weiterverkauf; er versichert, dass er hieran die erforderlichen Rechte hat.]

§ 5 Lieferung, Übergabe und Mengenabweichungen
(1) Die Übergabe erfolgt [ab Lager des Verkäufers, Abholung durch den Käufer am [Datum] / durch Lieferung an [Adresse] bis zum [Datum] auf Kosten des [Käufers / Verkäufers]]. Die Ware wird auf [Anzahl] Paletten gestapelt und [folienumwickelt] bereitgestellt.
(2) Bei Übergabe zählen beide Parteien die Ware gemeinsam anhand der Anlage 1 und halten das Ergebnis in einem Übergabeprotokoll fest. Das Protokoll ist Grundlage der Endabrechnung nach § 2.
(3) Ist eine gemeinsame Zählung nicht möglich, zählt der Käufer innerhalb von [z. B. 5] Werktagen nach Erhalt und teilt Abweichungen in Textform mit. Unterbleibt die Mitteilung, gilt die Menge laut Anlage 1 als geliefert.
(4) Teillieferungen sind [zulässig / nicht zulässig].

§ 6 Eigentumsvorbehalt und Gefahrübergang
(1) Die Ware bleibt bis zur vollständigen Zahlung des Kaufpreises Eigentum des Verkäufers. Der Käufer darf die Vorbehaltsware im ordnungsgemäßen Geschäftsgang weiterverkaufen; er tritt die daraus entstehenden Forderungen in Höhe des offenen Kaufpreises bereits jetzt an den Verkäufer ab, der die Abtretung annimmt.
(2) Die Gefahr geht mit Übergabe an den Käufer bzw. an den von ihm beauftragten Transporteur über, bei Lieferung durch den Verkäufer mit Ablieferung.

§ 7 Gewährleistung, Rügepflicht und Rücknahmeausschluss
(1) Der Verkäufer gewährleistet die in §§ 3 und 4 abgegebenen Zusicherungen. Im Übrigen wird die Ware [als Restposten unter Ausschluss der Gewährleistung für Sachmängel verkauft / mit einer auf [z. B. 6] Monate ab Übergabe verkürzten Gewährleistung verkauft].
(2) Der Käufer hat die Ware unverzüglich nach Übergabe zu untersuchen und erkennbare Mängel und Fehlmengen innerhalb von [z. B. 5] Werktagen, verdeckte Mängel unverzüglich nach Entdeckung in Textform zu rügen (§ 377 HGB). Andernfalls gilt die Ware als genehmigt.
(3) Eine Rücknahme nicht verkaufter, nicht benötigter oder nicht absetzbarer Ware ist ausgeschlossen. Das Absatzrisiko trägt der Käufer.
(4) Der Ausschluss bzw. die Verkürzung gilt nicht für arglistig verschwiegene Mängel, bei Vorsatz oder grober Fahrlässigkeit sowie für Schäden aus der Verletzung von Leben, Körper oder Gesundheit.
(5) Verletzt der Verkäufer die Zusicherung nach § 4 Abs. 1 (Originalware, Erschöpfung), kann der Käufer die betroffenen Artikel gegen Erstattung des anteiligen Kaufpreises zurückgeben und Ersatz der ihm nachweislich entstandenen Kosten aus Abmahnungen oder Rückrufen verlangen, soweit er den Verkäufer unverzüglich informiert und ihm die Abwehr überlassen hat.

§ 8 Haftung
(1) Beide Parteien haften unbeschränkt für Vorsatz, grobe Fahrlässigkeit, Schäden aus der Verletzung von Leben, Körper oder Gesundheit sowie nach dem Produkthaftungsgesetz.
(2) Im Übrigen ist die Haftung für leichte Fahrlässigkeit auf den vertragstypischen, vorhersehbaren Schaden begrenzt, höchstens auf den Netto-Kaufpreis. Die Haftung für entgangenen Gewinn ist insoweit ausgeschlossen.
(3) Für die Einhaltung der Vorschriften beim Weiterverkauf (Kennzeichnung, Produktsicherheit, Verpackungsgesetz, Elektrogesetz, Batteriegesetz, Preisangaben, Verbraucherrechte) ist ab Übergabe der Käufer verantwortlich; er stellt den Verkäufer von Ansprüchen Dritter aus seinem Weiterverkauf frei, soweit keine Zusicherung des Verkäufers verletzt ist.

§ 9 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; dies gilt auch für die Aufhebung dieser Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.
(3) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist [Ort], soweit beide Parteien Kaufleute sind.
(4) Anlage 1 (Inventurliste) und das Übergabeprotokoll sind Bestandteil dieses Vertrags.

[Ort], den [Datum]


______________________________
[Firma Verkäufer], vertreten durch [Vorname Nachname]


______________________________
[Firma Käufer], vertreten durch [Vorname Nachname]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "kaufvertrag-domain",
    titel: "Domain-Kaufvertrag",
    kurz: "Kaufvertrag über eine Internet-Domain mit Übertragung per AuthCode, Zahlung über Treuhand, Garantien gegen Rechte Dritter und Übertragung von Marke und Logo.",
    kategorie: "kauf",
    dateiname: "Kaufvertrag-Domain",
    wofuer: [
      "Du kaufst eine .de-, .com- oder andere Domain von einem privaten oder gewerblichen Inhaber",
      "Du verkaufst eine Domain, die du nicht mehr brauchst, und willst Zug um Zug gegen Zahlung übertragen",
      "Wenn zur Domain eine Marke, ein Logo oder Social-Media-Handles mitübertragen werden sollen",
      "Wenn die Zahlung über einen Treuhandservice abgesichert werden soll",
    ],
    enthaelt: [
      "§ 1 Kaufgegenstand",
      "§ 2 Kaufpreis und Zahlung (Treuhand)",
      "§ 3 Übertragung der Domain",
      "§ 4 Mitwirkung und Fristen",
      "§ 5 Garantien des Verkäufers",
      "§ 6 Marke, Logo und Kennzeichen",
      "§ 7 Haftung und Freistellung",
      "§ 8 Vertraulichkeit",
      "§ 9 Schlussbestimmungen",
    ],
    hinweise: [
      "Eine Domain ist kein Eigentum, sondern ein Vertragsverhältnis mit der Registrierungsstelle (DENIC, ICANN-Registrare). Übertragen wird der Inhaberwechsel; die Vorlage regelt deshalb AuthCode, Providerwechsel und die Änderung der Inhaberdaten.",
      "Prüfe vor dem Kauf im DPMA- und EUIPO-Register, ob die Domain fremde Marken verletzt. Eine Domain zu kaufen, die einer bekannten Marke gleicht, kann trotz Kaufvertrag eine Abmahnung auslösen – die Garantie des Verkäufers hilft dir dann nur, wenn er zahlungsfähig ist.",
      "Zahle nie den vollen Kaufpreis vorab an unbekannte Verkäufer. Treuhanddienste (Escrow) oder die Zug-um-Zug-Übertragung über den Registrar sind der sichere Weg.",
      "Bei .de-Domains gibt es keine Haltefrist nach dem Inhaberwechsel; bei vielen generischen Endungen (.com, .net) sperrt der Registrar den Transfer nach einem Inhaberwechsel für 60 Tage. Das beeinflusst, wann du den Provider wechseln kannst.",
    ],
    faqs: [
      {
        q: "Wie läuft die Übertragung einer Domain technisch ab?",
        a: "Der Verkäufer beantragt bei seinem Registrar den AuthCode (bei .de: AuthInfo) und übermittelt ihn dem Käufer. Der Käufer stellt bei seinem Provider den Transferantrag mit diesem Code; dabei werden die Inhaberdaten auf den Käufer geändert. Alternativ ändern beide beim selben Registrar nur den Inhaber (Push). Die Vorlage sieht beide Wege vor.",
      },
      {
        q: "Was ist, wenn die Domain bereits für eine Marke eines Dritten steht?",
        a: "Dann riskierst du als neuer Inhaber Unterlassungs- und Schadensersatzansprüche, auch wenn du die Domain gutgläubig gekauft hast. Die Vorlage lässt den Verkäufer garantieren, dass ihm keine Rechte Dritter bekannt sind und keine Abmahnungen oder Dispute-Einträge vorliegen; bei Verletzung muss er dich freistellen. Eigene Recherche in den Markenregistern bleibt trotzdem Pflicht.",
      },
      {
        q: "Was ist ein DENIC-Dispute und warum steht er in der Vorlage?",
        a: "Ein Dispute-Eintrag bei der DENIC ist eine Sperre, die ein Dritter beantragen kann, der eigene Rechte an einer .de-Domain geltend macht. Sie verhindert die Übertragung an jemand anderen als den Antragsteller. Besteht ein Dispute, kann der Verkäufer die Domain gar nicht übertragen – deshalb garantiert er in der Vorlage, dass keiner vorliegt.",
      },
      {
        q: "Fällt beim Domainverkauf Umsatzsteuer an?",
        a: "Verkauft ein Unternehmer, ist der Verkauf eine sonstige Leistung und grundsätzlich umsatzsteuerpflichtig; bei einem Käufer im EU-Ausland mit USt-IdNr greift das Reverse-Charge-Verfahren. Verkauft eine Privatperson einmalig, fällt keine Umsatzsteuer an. Einkommensteuerlich kann ein privater Verkauf innerhalb eines Jahres nach Anschaffung als privates Veräußerungsgeschäft steuerpflichtig sein.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Domain-Kaufvertrag brauchst",
        text: "Die passende .de- oder .com-Domain ist oft schon vergeben, aber der Inhaber nutzt sie nicht. Dann kaufst du sie ihm ab, über eine Domainbörse, nach einer direkten Anfrage oder im Bekanntenkreis. Umgekehrt verkaufst du Domains aus einem aufgegebenen Projekt oder einer Umbenennung deiner Marke. In beiden Fällen geht es um Geld gegen einen Inhaberwechsel, der technisch über AuthCode oder Push läuft und rechtlich sauber abgesichert sein muss.\n\nDieses Muster regelt den reinen Domainkauf, optional mit Zusatzdomains, Postfächern, Social-Media-Handles, einer eingetragenen Marke und einem Logo. Es sichert die Zahlung über Treuhand oder Zug um Zug ab und lässt den Verkäufer garantieren, dass keine Rechte Dritter, Dispute-Einträge oder Abmahnungen bestehen. Wechselt mit der Domain ein ganzer Shop mit Inhalten, Kunden und Lieferanten, passt der Kaufvertrag Website und Online-Shop besser.",
      },
      {
        titel: "Was muss in einen Domain-Kaufvertrag? Übertragung, Treuhand, Garantien",
        text: "Eine Domain ist kein Eigentum, sondern ein Vertragsverhältnis mit der Registrierungsstelle. Der Vertrag muss deshalb den Inhaberwechsel organisieren, nicht nur den Preis nennen. Die Vorlage regelt:\n\n- Domain, Registrierungsstelle und Registrar sowie mitverkaufte Zusatzdomains, Postfächer und Handles (§ 1)\n- Kaufpreis mit Umsatzsteuer-Variante und Zahlung über Treuhand (Variante A) oder Zug um Zug mit Anzahlung (Variante B) (§ 2)\n- Freiheit von Sperren und Zahlungsrückständen, Übertragung per AuthCode oder Push, Abschluss der Übertragung, Stillhaltepflicht (§ 3)\n- Mitwirkungsfristen, Enddatum, Rücktritt, pauschalierter Schadensersatz, Umgang mit eingehenden E-Mails (§ 4)\n- Garantien: Alleininhaber, keine Pfändung, kein Dispute, keine Abmahnungen, kein Domain-Grabbing, keine Sperrlisten (§ 5)\n- Marke, Logo und Nutzungsverbot ähnlicher Zeichen für den Verkäufer (§ 6)\n- Freistellung und Kaufpreiserstattung bei Garantieverletzung, Haftungsbegrenzung (§ 7)\n- Vertraulichkeit, Schriftform mit E-Mail-Ausnahme für AuthCodes, Gerichtsstand (§§ 8, 9)\n\nDie Definition des Abschlusses in § 3 Abs. 4 ist wichtig: Erst wenn du als Inhaber eingetragen bist und die DNS-Einstellungen kontrollierst, ist der Verkäufer fertig.",
      },
      {
        titel: "Domain-Kaufvertrag Muster ausfüllen: AuthCode, Push oder Treuhand",
        text: "Trage in § 1 den Domainnamen exakt ein und prüfe im Whois oder bei der DENIC, wer Inhaber ist und über welchen Registrar die Domain läuft; der Verkäufer muss diese Person sein. Liste in Absatz 3 auf, was mitgeht: weitere Domains, Postfächer mit Weiterleitungsdauer, Social-Media-Handles. In § 2 Abs. 1 wählst du die Steuer-Variante: Umsatzsteuer bei gewerblichem Verkäufer, keine bei Privatverkauf, Reverse Charge bei einem Käufer im EU-Ausland. Dann entscheidest du zwischen Treuhand (Variante A, Dienst und Gebührenteilung eintragen) und Zug um Zug mit Anzahlung (Variante B).\n\nIn § 3 Abs. 2 bleibt nur ein Übertragungsweg stehen: AuthCode-Transfer zu deinem Provider oder Inhaberwechsel beim selben Registrar. Setze Fristen in Werktagen und die Mindestrestlaufzeit der Registrierung ein. In § 4 trägst du das Enddatum und die Höhe des pauschalierten Schadensersatzes ein. In § 5 Buchstabe f ergänzt der Verkäufer, seit wann er die Domain hält und wofür sie genutzt wurde. In § 6 behältst du nur die passende Variante: ohne Marke, mit Markenübertragung samt Registernummer und Klassen, oder mit Logo und Namen des Designers. Zum Schluss Ort, Datum und Unterschriften.",
      },
      {
        titel: "Typische Fehler beim Domainkauf und wie du sie vermeidest",
        text: "Erster Fehler: Vollzahlung vorab an einen unbekannten Verkäufer. Ist der AuthCode dann falsch oder die Domain gesperrt, läufst du dem Geld hinterher. Nutze Treuhand oder zahle die Hälfte erst nach Eintragung. Zweiter Fehler: keine Markenrecherche. Eine Domain, die einer eingetragenen Marke gleicht, bringt dir als neuem Inhaber die Abmahnung, nicht dem Verkäufer; die Garantie in § 5 hilft nur, wenn er zahlen kann. Prüfe DPMA- und EUIPO-Register vor Vertragsschluss.\n\nDritter Fehler: Transfer-Lock und 60-Tage-Sperre übersehen. Bei vielen generischen Endungen sperrt der Registrar nach einem Inhaberwechsel den Providerwechsel für 60 Tage; plane den Weg (erst Push, dann Transfer oder umgekehrt) vorher. Vierter Fehler: E-Mails des Verkäufers laufen weiter. Nach der Übertragung landen Geschäftsmails unter der Domain bei dir und umgekehrt; § 4 Abs. 3 regelt Löschung und optionale Weiterleitung. Fünfter Fehler: Inhalte mitkaufen, ohne Rechte zu prüfen. Texte, Fotos und Logos haben Urheber; nur wer die Rechtekette belegt, darf sie weiternutzen.",
      },
      {
        titel: "Rechtliche Grundlagen: Rechtskauf, Erschöpfung der Registrierung, Marke, Umsatzsteuer",
        text: "Rechtlich ist der Domainkauf ein Rechtskauf nach § 453 BGB: Verkauft wird die vertragliche Position gegenüber der Registrierungsstelle, nicht eine Sache. Die Kaufrechtsvorschriften gelten entsprechend. Weil eine Domain kein Eigentum im Sinne des Sachenrechts ist, gibt es keinen Eigentumsvorbehalt; die Absicherung läuft über Treuhand und die Reihenfolge von Zahlung und Übertragung. Eine Form ist nicht vorgeschrieben, der Vertrag kann sogar per E-Mail geschlossen werden; die Schriftform dient dem Beweis.\n\nDie Garantien in § 5 sind selbständige Garantieversprechen: Der Verkäufer haftet verschuldensunabhängig, wenn sie falsch sind. Das ist nötig, weil die Domain selbst keinen Mangel haben kann, wohl aber mit Rechten Dritter belastet sein. Wird eine eingetragene Marke mitverkauft, geht sie nach § 27 MarkenG durch Vertrag über; die Umschreibung im Register ist nur deklaratorisch, aber nötig, um das Recht gegenüber Dritten nachzuweisen. Ein Logo ist urheberrechtlich geschützt und kann nur per Nutzungsrechtseinräumung nach § 31 UrhG übertragen werden. Umsatzsteuerlich ist der Verkauf durch einen Unternehmer eine sonstige Leistung; bei Käufern im EU-Ausland mit USt-IdNr greift Reverse Charge.",
      },
      {
        titel: "Wann der Domain-Kaufvertrag aus der Vorlage nicht reicht",
        text: "Bei hohen Kaufpreisen, etwa für kurze .com-Domains oder Gattungsbegriffe, lohnt sich ein Treuhanddienst mit Vertragsprüfung und eine anwaltliche Recherche zu Marken-, Namens- und Firmenrechten in allen Zielländern. Kauft oder verkauft eine Partei im Ausland, musst du Rechtswahl, Gerichtsstand und Umsatzsteuer anpassen; die Vorlage geht von deutschem Recht aus.\n\nBesteht bereits ein Dispute-Eintrag, ein UDRP-Verfahren oder eine Abmahnung, kann die Domain nicht übertragen werden; dann hilft kein Kaufvertrag, sondern nur die Klärung des Streits. Wird mit der Domain ein laufendes Geschäft übergeben, also Shop, Kunden, Newsletter, Lieferanten und Konten, nutze den Kaufvertrag Website und Online-Shop, der Datenschutz und Wettbewerbsverbot regelt. Ist der Verkäufer eine Privatperson, prüft er mit seinem Steuerberater, ob ein privates Veräußerungsgeschäft vorliegt. GründerX ist Software und liefert Muster, keine Rechts- oder Steuerberatung.",
      },
    ],
    seo: {
      title: "Domain-Kaufvertrag Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "Domain-Kaufvertrag als kostenlose Vorlage: Übertragung per AuthCode, Treuhand-Zahlung, Garantien gegen Rechte Dritter, Marke und Logo. Word, PDF, Text.",
    },
    stand: "2026-10",
    text: `Kaufvertrag über eine Internet-Domain

zwischen

[Firma / Vorname Nachname], [Straße, PLZ Ort], [vertreten durch [Vorname Nachname]], [USt-IdNr. / „handelnd als Privatperson“]
– nachfolgend „Verkäufer“ –

und

[Firma / Vorname Nachname], [Straße, PLZ Ort], [vertreten durch [Vorname Nachname]], [USt-IdNr. / „handelnd als Privatperson“]
– nachfolgend „Käufer“ –

§ 1 Kaufgegenstand
(1) Der Verkäufer ist Inhaber (Domain-Holder) der Domain
   [domainname.de]
   registriert bei der Registrierungsstelle [DENIC eG / Registry der Endung] über den Registrar/Provider [Name] (nachfolgend „Domain“).
(2) Der Verkäufer verkauft dem Käufer sämtliche Rechte und Ansprüche aus dem Registrierungsvertrag an der Domain und verpflichtet sich, die Domain auf den Käufer zu übertragen. Übertragen wird der Inhaberstatus; Eigentum im Sinne des Sachenrechts besteht an einer Domain nicht.
(3) Mitverkauft sind: [keine weiteren Gegenstände / folgende Zusatzdomains: [Liste] / die E-Mail-Postfächer und deren Weiterleitung für [z. B. 3] Monate / die unter der Domain erreichbaren Inhalte gemäß Anlage 1 / Social-Media-Handles [Liste]].
(4) Nicht mitverkauft sind Inhalte, Datenbanken, Nutzerdaten und Software, die unter der Domain betrieben werden, soweit sie nicht in Absatz 3 genannt sind. Der Verkäufer entfernt sie vor der Übertragung.

§ 2 Kaufpreis und Zahlung
(1) Der Kaufpreis beträgt [Betrag] EUR [zuzüglich der gesetzlichen Umsatzsteuer von 19 % / umsatzsteuerfrei, da der Verkäufer als Privatperson handelt / Steuerschuldnerschaft des Leistungsempfängers (Reverse Charge), da der Käufer im EU-Ausland ansässig ist].
[Variante A – Treuhand]
(2) Die Zahlung wird über den Treuhanddienst [Name des Escrow-Dienstes, z. B. Sedo Transfer Service, Escrow.com, Treuhandkonto Notar/Rechtsanwalt] abgewickelt. Der Käufer zahlt den Kaufpreis innerhalb von [z. B. 5] Werktagen nach Vertragsschluss an den Treuhänder. Der Treuhänder gibt den Kaufpreis an den Verkäufer frei, sobald der Käufer als Inhaber der Domain eingetragen ist oder der Käufer die Freigabe erklärt. Die Treuhandgebühren tragen [die Parteien je zur Hälfte / der Käufer / der Verkäufer].
[Variante B – Zug um Zug ohne Treuhand]
(2) Der Käufer zahlt [z. B. 50] % des Kaufpreises bei Vertragsschluss und den Restbetrag innerhalb von [z. B. 3] Werktagen nach Eintragung als Inhaber auf das Konto [IBAN].
(3) Bei Zahlungsverzug gelten die gesetzlichen Verzugszinsen.

§ 3 Übertragung der Domain
(1) Der Verkäufer stellt sicher, dass die Domain zum Zeitpunkt der Übertragung nicht gesperrt (Transfer-Lock, Registrar-Lock, Dispute) ist, keine Zahlungsrückstände beim Registrar bestehen und die Registrierung noch mindestens [z. B. 60] Tage läuft.
(2) Die Übertragung erfolgt [Variante Providerwechsel: durch Übermittlung des AuthCodes (bei .de: AuthInfo) an den Käufer innerhalb von [z. B. 3] Werktagen nach [Vertragsschluss / Eingang des Kaufpreises beim Treuhänder]. Der Käufer stellt unverzüglich den Transferantrag bei seinem Provider [Name] und trägt sich als Inhaber ein.] [Variante Inhaberwechsel beim selben Registrar: durch Änderung der Inhaberdaten (Push) beim Registrar [Name] auf das Kundenkonto des Käufers [Kundennummer].]
(3) Der Verkäufer bestätigt die Übertragung gegenüber dem Registrar bzw. der Registrierungsstelle unverzüglich, sofern eine Bestätigung des bisherigen Inhabers erforderlich ist, und stimmt dem Inhaberwechsel ausdrücklich zu.
(4) Die Übertragung ist abgeschlossen, wenn der Käufer in der Whois-/Inhaberdatenbank der Registrierungsstelle als Inhaber der Domain geführt wird und der Käufer die vollständige Kontrolle über die DNS-Einstellungen hat.
(5) Bis zur Übertragung hält der Verkäufer die Domain in unverändertem Zustand und nimmt keine Änderungen an Inhaberdaten, DNS-Einträgen oder Registrar vor, die dem Käufer nachteilig sind. Er verlängert die Registrierung, soweit sie vor Abschluss der Übertragung ausläuft.

§ 4 Mitwirkung und Fristen
(1) Beide Parteien wirken an der Übertragung unverzüglich mit und beantworten Anfragen des Registrars, der Registrierungsstelle und des Treuhänders innerhalb von [z. B. 2] Werktagen.
(2) Die Übertragung soll bis spätestens [Datum] abgeschlossen sein. Ist sie bis dahin aus Gründen, die der Verkäufer zu vertreten hat, nicht abgeschlossen, kann der Käufer nach Setzung einer Nachfrist von [z. B. 7] Tagen vom Vertrag zurücktreten; bereits gezahlte Beträge sind zurückzuerstatten. Ist sie aus Gründen, die der Käufer zu vertreten hat, nicht abgeschlossen, kann der Verkäufer nach gleicher Nachfrist zurücktreten; die Anzahlung verbleibt in Höhe von [z. B. 10] % des Kaufpreises als pauschalierter Schadensersatz beim Verkäufer, der Nachweis eines geringeren Schadens bleibt dem Käufer möglich.
(3) Der Verkäufer verpflichtet sich, für [z. B. 3] Monate nach Übertragung E-Mails, die an Adressen unter der Domain eingehen, nicht mehr abzurufen und etwaige noch bei ihm eingehende Nachrichten unverzüglich und ungelesen zu löschen. [Optional: Der Käufer richtet für diesen Zeitraum eine Weiterleitung für die Adressen [Liste] an [E-Mail des Verkäufers] ein.]

§ 5 Garantien des Verkäufers
Der Verkäufer garantiert im Wege eines selbständigen Garantieversprechens, dass zum Zeitpunkt des Vertragsschlusses und der Übertragung
   a) er alleiniger Inhaber der Domain ist und frei über sie verfügen kann,
   b) die Domain nicht gepfändet, verpfändet, sicherungsabgetreten oder sonst mit Rechten Dritter belastet ist und kein Dispute-Eintrag, kein UDRP-/ADR-Verfahren und kein sonstiges Streitverfahren über die Domain anhängig oder angedroht ist,
   c) ihm keine Ansprüche Dritter aus Marken-, Namens-, Firmen- oder Wettbewerbsrecht bezüglich der Domain bekannt sind und er in den letzten [z. B. 3] Jahren keine Abmahnung, Unterlassungsaufforderung oder Klage wegen der Domain erhalten hat,
   d) die Domain nicht durch unlautere Mittel (insbesondere Domain-Grabbing, Erschleichen durch Täuschung des Vorinhabers) erworben wurde,
   e) die Domain nicht auf Sperrlisten (Spam, Malware) geführt wird und keine Suchmaschinen-Strafen bekannt sind, [soweit ihm bekannt],
   f) [der Verkäufer die Domain seit dem [Datum] hält und sie zuletzt für [Beschreibung der Nutzung] genutzt wurde].

§ 6 Marke, Logo und Kennzeichen
(1) [Variante ohne Marke: Mit der Domain werden keine Marken-, Namens- oder Firmenrechte übertragen. Der Verkäufer hat kein Markenrecht an der Bezeichnung [Name] angemeldet.]
(2) [Variante mit Marke: Der Verkäufer ist Inhaber der [deutschen Marke Nr. [Nummer] beim DPMA / Unionsmarke Nr. [Nummer] beim EUIPO] „[Marke]“ für die Klassen [Nizza-Klassen]. Diese Marke wird mit allen Rechten für [Betrag] EUR (im Kaufpreis enthalten) an den Käufer übertragen. Der Verkäufer unterzeichnet alle zur Umschreibung im Register erforderlichen Erklärungen; die Umschreibungsgebühren trägt der Käufer.]
(3) [Variante Logo: Der Verkäufer räumt dem Käufer an dem in Anlage 2 abgebildeten Logo und den dort genannten Gestaltungselementen das ausschließliche, zeitlich, räumlich und inhaltlich unbeschränkte, übertragbare Nutzungsrecht für alle bekannten Nutzungsarten ein, einschließlich des Rechts zur Bearbeitung. Der Verkäufer versichert, dass er diese Rechte vom Urheber [Name des Designers] erworben hat und zur Weiterübertragung berechtigt ist.]
(4) Der Verkäufer verpflichtet sich, die Bezeichnung [Name] und verwechselbare Zeichen nach Übertragung nicht mehr als Domain, Marke, Firma, Social-Media-Handle oder Produktname zu nutzen und keine ähnlichen Domains anzumelden.

§ 7 Haftung und Freistellung
(1) Verletzt der Verkäufer eine Garantie nach § 5, stellt er den Käufer von allen daraus resultierenden Ansprüchen Dritter einschließlich angemessener Rechtsverfolgungskosten frei und ersetzt dem Käufer den entstandenen Schaden. Kann die Domain wegen Rechten Dritter nicht übertragen werden oder verliert der Käufer sie innerhalb von [z. B. 24] Monaten nach Übertragung an einen Dritten, dessen Rechte bereits bei Vertragsschluss bestanden, erstattet der Verkäufer den Kaufpreis.
(2) Im Übrigen haften die Parteien nur für Vorsatz und grobe Fahrlässigkeit sowie bei Verletzung wesentlicher Vertragspflichten begrenzt auf den vorhersehbaren, vertragstypischen Schaden, höchstens auf den Kaufpreis. Schäden aus der Verletzung von Leben, Körper oder Gesundheit bleiben unberührt.
(3) Für den wirtschaftlichen Wert der Domain, Besucherzahlen, Suchmaschinenpositionen und die Eignung für die Zwecke des Käufers übernimmt der Verkäufer keine Gewähr, soweit in § 5 nichts anderes garantiert ist.

§ 8 Vertraulichkeit
Die Parteien behandeln den Kaufpreis und die weiteren Konditionen dieses Vertrags vertraulich. Ausgenommen sind Mitteilungen an Steuerberater, Rechtsanwälte, Treuhänder, Registrare und Behörden, soweit erforderlich.

§ 9 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; dies gilt auch für die Aufhebung dieser Klausel. Die Übermittlung von AuthCodes und Bestätigungen per E-Mail ist ausreichend.
(2) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.
(3) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist [Ort], soweit beide Parteien Kaufleute sind oder eine Partei keinen allgemeinen Gerichtsstand in Deutschland hat.
(4) Anlagen: [Anlage 1 – Liste der mitverkauften Inhalte und Zugänge; Anlage 2 – Logo und Gestaltungselemente]. Die Anlagen sind Bestandteil dieses Vertrags.

[Ort], den [Datum]


______________________________
[Verkäufer, ggf. Firma und Vertreter]


______________________________
[Käufer, ggf. Firma und Vertreter]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "kaufvertrag-website-onlineshop",
    titel: "Kaufvertrag Website / Online-Shop (Asset-Kauf)",
    kurz: "Kaufvertrag über eine Website oder einen Online-Shop als Asset-Kauf: Domain, Inhalte, Kundendaten nach DSGVO, Social-Accounts, Lieferanten, Zugänge, Einarbeitung und Wettbewerbsverbot.",
    kategorie: "kauf",
    dateiname: "Kaufvertrag-Website-Onlineshop",
    wofuer: [
      "Du kaufst eine laufende Website, einen Blog, ein Affiliate-Projekt oder einen Online-Shop von einem Einzelunternehmer",
      "Du verkaufst dein Webprojekt und willst Domain, Inhalte, Konten und Lieferanten sauber übergeben",
      "Wenn Kundendaten mit übertragen werden und du wissen musst, was die DSGVO erlaubt",
      "Wenn der Verkäufer nach dem Verkauf nicht mit einem ähnlichen Projekt konkurrieren soll",
    ],
    enthaelt: [
      "§ 1 Kaufgegenstand (Asset-Liste)",
      "§ 2 Kaufpreis und Zahlung",
      "§ 3 Stichtag und Übergang",
      "§ 4 Übertragung von Domain, Hosting, Inhalten und Konten",
      "§ 5 Kundendaten und Datenschutz",
      "§ 6 Lieferanten, Verträge und laufende Bestellungen",
      "§ 7 Einarbeitung und Unterstützung",
      "§ 8 Garantien des Verkäufers",
      "§ 9 Wettbewerbsverbot",
      "§ 10 Haftung",
      "§ 11 Schlussbestimmungen",
      "Anlage 1 Asset-Liste und Zugänge (Muster)",
    ],
    hinweise: [
      "Kundendaten dürfen nicht einfach „mitverkauft“ werden. Beim Asset-Kauf ist der Käufer ein neuer Verantwortlicher; die Übermittlung braucht eine Rechtsgrundlage. Praxislösung: Vertragsdaten laufender Kunden gehen über (Art. 6 Abs. 1 lit. b DSGVO), Newsletter-Abonnenten nur mit erneuter Einwilligung oder nach Widerspruchslösung mit Information – die Vorlage trennt das.",
      "Plattform-Konten (Amazon, eBay, Etsy, Meta, Google, Shopify) sind laut AGB oft nicht übertragbar. Prüfe die Bedingungen und plane eine Neuanmeldung oder die Übertragung über den Plattform-Support ein.",
      "Inhalte sind nur verkäuflich, wenn der Verkäufer die Nutzungsrechte hat. Stockfotos, Texte von Freelancern und Themes haben eigene Lizenzen, die nicht automatisch übergehen. Die Vorlage lässt den Verkäufer die Rechtekette garantieren.",
      "Übernimmst du den gesamten Geschäftsbetrieb mit Mitarbeitern, gilt § 613a BGB (Übergang der Arbeitsverhältnisse) – dann brauchst du den Unternehmenskaufvertrag (Asset Deal), nicht diese Vorlage.",
    ],
    faqs: [
      {
        q: "Wie wird der Kaufpreis einer Website üblicherweise berechnet?",
        a: "Meist als Vielfaches des monatlichen Gewinns der letzten zwölf Monate, bei Content-Seiten etwa das 20- bis 40-fache, bei Shops mit Lager und Werbekosten eher weniger. Entscheidend ist, dass du die Zahlen vor dem Kauf prüfst: Analytics-Zugang, Zahlungsanbieter-Auszüge, Steuerbescheide. Die Vorlage lässt den Verkäufer Umsatz und Gewinn garantieren.",
      },
      {
        q: "Was passiert mit Bestellungen, die am Stichtag noch offen sind?",
        a: "Die Vorlage ordnet sie dem Verkäufer zu: Er liefert bestellte Ware, erstattet und bearbeitet Retouren aus Verkäufen vor dem Stichtag. Alternativ kann der Käufer die Abwicklung übernehmen und bekommt dafür die Erlöse bzw. eine Pauschale. Wichtig ist eine klare Grenze, sonst streiten beide über jede Rücksendung.",
      },
      {
        q: "Wie lange darf das Wettbewerbsverbot für den Verkäufer gelten?",
        a: "Rechtsprechung akzeptiert beim Unternehmensverkauf in der Regel bis zu zwei Jahre, räumlich und sachlich beschränkt auf das verkaufte Geschäft. Länger oder weiter gefasst ist das Verbot angreifbar. Die Vorlage sieht 24 Monate und eine Vertragsstrafe vor, die bei Verstoß die Beweisnot des Käufers löst.",
      },
      {
        q: "Brauche ich für den Website-Kauf einen Notar?",
        a: "Nein. Ein Asset-Kauf von Domain, Inhalten, Konten und Warenbestand ist formfrei; die Schriftform dient dem Beweis. Ein Notar wird erst nötig, wenn GmbH-Anteile oder Grundstücke übertragen werden. Markenumschreibungen laufen über das DPMA oder EUIPO ohne Notar.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Kaufvertrag für eine Website oder einen Online-Shop brauchst",
        text: "Statt bei null zu starten, kaufen viele Gründer ein laufendes Webprojekt: einen Nischenblog mit Affiliate-Einnahmen, einen kleinen Shopify-Shop, ein Vergleichsportal oder einen Instagram-Account mit angeschlossenem Shop. Umgekehrt verkaufst du dein Projekt, wenn du dich auf etwas anderes konzentrieren willst. In beiden Fällen wechseln Domain, Inhalte, Konten, Kundendaten und Lieferantenbeziehungen den Inhaber, und jeder dieser Bausteine hat eigene rechtliche Regeln.\n\nDiese Vorlage ist ein Asset-Kaufvertrag für Projekte, die ein Einzelunternehmer ohne Mitarbeiter betreibt. Sie regelt Stichtag, Übertragung aller Zugänge, Kundendaten nach DSGVO, Lieferanten, Einarbeitung, Garantien zu den Zahlen und ein Wettbewerbsverbot. Für eine reine Domain reicht der Domain-Kaufvertrag, für ein FBA-Geschäft bei Amazon gibt es eine eigene Vorlage, und sobald Mitarbeiter übergehen, brauchst du den Unternehmenskaufvertrag.",
      },
      {
        titel: "Was muss in einen Website-Kaufvertrag? Assets, Stichtag, Daten, Garantien",
        text: "Ein Webprojekt besteht aus vielen Einzelteilen, die alle benannt werden müssen. Die Vorlage listet sie in § 1 und in der Asset-Liste der Anlage 1: Domains, Inhalte und Nutzungsrechte, Social-Media-Konten, Newsletter-Liste, Konten bei Hosting, Shop-System, Zahlungsanbietern und Marktplätzen, Warenbestand, Marke, Lieferanten und dokumentiertes Know-how. Außerdem gehören hinein:\n\n- Kaufpreis mit Aufteilung auf die Assets, Umsatzsteuer oder Geschäftsveräußerung im Ganzen, Raten und optionaler Earn-out (§ 2)\n- wirtschaftlicher Stichtag, Abgrenzung von Jahresgebühren, Zuordnung offener Bestellungen und Retouren (§ 3)\n- Übergabe von Domains, Backup, Zugängen und Passwörtern, Umgang mit nicht übertragbaren Konten, Rechteeinräumung an Inhalten (§ 4)\n- Kundendaten: laufende Verträge, Newsletter mit Widerspruchsfrist oder neuem Double-Opt-in, Löschung von Altdaten (§ 5)\n- Lieferanten und Verträge mit Zustimmung der Vertragspartner, bestellte Ware (§ 6)\n- Einarbeitungsstunden, Rückfragezeitraum, Prozessdokumentation (§ 7)\n- Garantien zu Rechten, Abmahnungen, Umsatzzahlen, keine gekauften Bewertungen, keine Sperren, Steuern (§ 8)\n- Wettbewerbsverbot mit Dauer, Gebiet und Vertragsstrafe (§ 9)",
      },
      {
        titel: "Website-Kaufvertrag Muster ausfüllen: Asset-Liste, Stichtag, Übergabe",
        text: "Starte mit Anlage 1 und Anlage 4: Lass dir vom Verkäufer Lesezugang zu Analytics, Shop-System und Zahlungsanbieter geben und prüfe Umsatz, Kosten und Besucher der letzten zwölf Monate selbst, bevor du einen Preis festlegst. Trage dann in § 1 jede Domain, jedes Konto und jede Plattform ein und markiere in der Asset-Liste, was laut AGB übertragbar ist. In § 2 teilst du den Kaufpreis auf Domain, Inhalte, Konten, Warenbestand, Marke und Kundenstamm auf; das braucht dein Steuerberater für Abschreibung und Umsatzsteuer. Earn-out nur eintragen, wenn ihr ihn wirklich wollt, und dann mit Prüfrecht.\n\nIn § 3 setzt du den Stichtag und wählst, wer offene Bestellungen abwickelt. In § 4 trägst du Fristen für Domain-Transfer und Parallelbetrieb ein und beziffere die Minderung für ein nicht übertragbares Konto. In § 5 entscheidest du für die Newsletter-Liste zwischen Widerspruchslösung und neuem Double-Opt-in. In § 7 Stunden und Rückfragezeitraum, in § 9 Dauer, Gebiet, Themenbereich und Vertragsstrafe des Wettbewerbsverbots. Nach Unterschrift arbeitet ihr die Asset-Liste Position für Position ab und hakt den Status ab.",
      },
      {
        titel: "Typische Fehler beim Kauf einer Website und wie du sie vermeidest",
        text: "Erster Fehler: Zahlen aus Screenshots glauben. Umsatz und Traffic lassen sich fälschen; verlange Lesezugang zu den Originalsystemen und Steuerbescheide. Die Garantie in § 8 Buchstabe c hilft erst im Nachhinein. Zweiter Fehler: Newsletter-Liste einfach exportieren. Ohne Information der Abonnenten und Widerspruchsfrist oder neues Double-Opt-in verstößt die Übergabe gegen die DSGVO und das Wettbewerbsrecht; die Liste ist dann unbrauchbar und ein Abmahnrisiko.\n\nDritter Fehler: Plattform-Konten als übertragbar einplanen. Amazon, PayPal, Stripe, Meta-Werbekonten und viele Marktplätze erlauben keinen Inhaberwechsel; plane Neuanmeldung ein und vereinbare in § 4 Abs. 3 eine Minderung, falls Bewertungen und Historie verloren gehen. Vierter Fehler: Inhalte ohne Rechtekette kaufen. Stockfotos, Freelancer-Texte und Premium-Themes haben Lizenzen, die nicht automatisch übergehen; nicht übertragbare Lizenzen gehören in Anlage 1 gekennzeichnet. Fünfter Fehler: Impressum und Datenschutzerklärung erst Wochen später ändern. Ab dem Stichtag bist du Verantwortlicher; ein falsches Impressum ist abmahnbar.",
      },
      {
        titel: "Rechtliche Grundlagen: Asset-Kauf, DSGVO, Nutzungsrechte, Wettbewerbsverbot",
        text: "Der Kauf einer Website ist rechtlich ein Bündel aus Rechtskauf (Domain, Konten, Forderungen nach § 453 BGB), Sachkauf (Warenbestand nach § 433 BGB) und Nutzungsrechtseinräumung an Inhalten nach § 31 UrhG. Das Urheberrecht selbst bleibt beim Ersteller; übertragen wird das ausschließliche Nutzungsrecht, und das nur, wenn der Verkäufer es selbst hat. Verträge mit Lieferanten und Dienstleistern gehen nur mit Zustimmung des Vertragspartners über (§ 415 BGB), deshalb die Innenverhältnis-Lösung in § 6.\n\nFür Kundendaten gilt die DSGVO: Der Käufer wird neuer Verantwortlicher, und jede Übermittlung braucht eine Rechtsgrundlage. Für laufende Vertragsbeziehungen ist das Art. 6 Abs. 1 lit. b DSGVO; für Newsletter-Einwilligungen ist die Übertragung umstritten, weshalb die Vorlage Information mit Widerspruchsfrist oder neue Einwilligung vorsieht. Nachvertragliche Wettbewerbsverbote beim Unternehmensverkauf sind zulässig, wenn sie zeitlich, räumlich und sachlich auf den Schutz des verkauften Geschäfts beschränkt sind; die Rechtsprechung akzeptiert in der Regel bis zu zwei Jahre. Ein Notar ist nicht nötig, solange keine GmbH-Anteile oder Grundstücke übertragen werden. Umsatzsteuerlich kann eine Geschäftsveräußerung im Ganzen nach § 1 Abs. 1a UStG vorliegen.",
      },
      {
        titel: "Wann die Vorlage für den Website-Kauf nicht reicht",
        text: "Beschäftigt der Verkäufer Mitarbeiter, auch nur einen Minijobber, gehen die Arbeitsverhältnisse nach § 613a BGB über; dann brauchst du den Unternehmenskaufvertrag als Asset Deal mit Unterrichtungsschreiben und Haftungsregeln. Wird statt der Assets eine GmbH oder UG übernommen, ist das ein Share Deal, der beim Notar beurkundet wird. Bei Projekten mit sensiblen Daten, etwa Gesundheits- oder Finanzthemen, Mitgliederbereichen oder Abonnements, sollte ein Datenschutzjurist die Übergabe der Nutzerdaten prüfen.\n\nAuch bei Earn-out-Modellen über längere Zeiträume, bei Kaufpreisen im sechsstelligen Bereich oder wenn der Verkäufer im Ausland sitzt, lohnt die anwaltliche Vertragsprüfung und ein Treuhandkonto. Für Amazon-FBA-Marken mit Brand Registry und Lagerbestand bei Amazon nutze die spezialisierte FBA-Vorlage. Die Aufteilung des Kaufpreises und die Frage der Geschäftsveräußerung im Ganzen klärt dein Steuerberater vor Unterschrift. GründerX stellt Software und Muster bereit und ersetzt keine Rechtsberatung.",
      },
    ],
    seo: {
      title: "Kaufvertrag Website & Online-Shop Vorlage | GründerX",
      description:
        "Kaufvertrag für Website oder Online-Shop: Domain, Inhalte, Kundendaten nach DSGVO, Social-Accounts, Lieferanten, Zugänge, Einarbeitung, Wettbewerbsverbot.",
    },
    stand: "2026-10",
    text: `Kaufvertrag über eine Website / einen Online-Shop (Asset-Kauf)

zwischen

[Firma / Vorname Nachname], [Straße, PLZ Ort], [vertreten durch [Vorname Nachname]], USt-IdNr. [DE…]
– nachfolgend „Verkäufer“ –

und

[Firma / Vorname Nachname], [Straße, PLZ Ort], [vertreten durch [Vorname Nachname]], USt-IdNr. [DE…]
– nachfolgend „Käufer“ –

Vorbemerkung
Der Verkäufer betreibt unter der Domain [domain.de] [eine Website / einen Online-Shop] mit dem Thema [Beschreibung] (nachfolgend „Projekt“). Das Projekt wird vom Verkäufer [als Einzelunternehmer / nebenberuflich] ohne Arbeitnehmer betrieben. Der Verkäufer verkauft die zum Projekt gehörenden Vermögensgegenstände und Rechte an den Käufer, der das Projekt fortführt.

§ 1 Kaufgegenstand
(1) Der Verkäufer verkauft dem Käufer folgende Vermögensgegenstände und Rechte (nachfolgend „Assets“), die in Anlage 1 im Einzelnen aufgeführt sind:
   a) die Domain [domain.de] sowie die weiteren Domains [Liste] einschließlich aller Rechte aus den Registrierungsverträgen,
   b) die Website mit allen Inhalten: Texte, Bilder, Grafiken, Videos, Produktbeschreibungen, Blogartikel, Datenbanken, Theme-Anpassungen und selbst erstellter Code, einschließlich der daran bestehenden Nutzungsrechte,
   c) die Social-Media-Konten [Plattform, Handle, Followerzahl zum Stichtag] und die Newsletter-Liste gemäß § 5,
   d) die Konten bei [Hosting-Anbieter, Shop-System, Zahlungsanbietern, Analytics, Werbekonten, Marktplätzen], soweit nach den jeweiligen Bedingungen übertragbar,
   e) [den Warenbestand gemäß Inventurliste in Anlage 2 zum Stichtag],
   f) [die Marke „[Name]“, Nr. [Nummer], beim [DPMA / EUIPO]],
   g) die Lieferantenbeziehungen und Verträge gemäß § 6,
   h) das Know-how zum Betrieb des Projekts (Prozesse, Werbekampagnen, Keyword-Listen, Content-Pläne) in dokumentierter Form.
(2) Nicht verkauft werden: [z. B. das Gewerbe des Verkäufers als solches, Bankkonten, Forderungen und Verbindlichkeiten aus der Zeit vor dem Stichtag, Steuererstattungsansprüche, Privatkonten des Verkäufers].
(3) Verbindlichkeiten des Verkäufers werden nicht übernommen, soweit in § 6 nichts anderes vereinbart ist.

§ 2 Kaufpreis und Zahlung
(1) Der Kaufpreis für sämtliche Assets beträgt [Betrag] EUR [zuzüglich der gesetzlichen Umsatzsteuer / Die Parteien gehen von einer nicht steuerbaren Geschäftsveräußerung im Ganzen nach § 1 Abs. 1a UStG aus; sollte das Finanzamt dies anders beurteilen, schuldet der Käufer die Umsatzsteuer zusätzlich gegen Rechnung].
(2) Der Kaufpreis verteilt sich wie folgt: Domain(s) [Betrag] EUR, Inhalte und Nutzungsrechte [Betrag] EUR, Konten und Social-Media [Betrag] EUR, Warenbestand [Betrag] EUR, [Marke [Betrag] EUR], Know-how und Kundenstamm [Betrag] EUR.
(3) Zahlung: [Betrag] EUR ([z. B. 50] %) bei Vertragsschluss auf [das Treuhandkonto [Name] / das Konto [IBAN]], der Restbetrag von [Betrag] EUR innerhalb von [z. B. 5] Werktagen nach Abschluss der Übertragung aller in § 4 genannten Zugänge, spätestens am [Datum].
(4) [Optional Earn-out: Zusätzlich zahlt der Käufer für die [12] Monate nach dem Stichtag [z. B. 15] % des mit dem Projekt erzielten Netto-Umsatzes, zahlbar quartalsweise mit Abrechnung; der Verkäufer darf die Abrechnung durch Einsicht in das Shop-System und die Zahlungsanbieter prüfen.]

§ 3 Stichtag und Übergang
(1) Wirtschaftlicher Stichtag ist der [Datum, 00:00 Uhr]. Ab diesem Zeitpunkt stehen Einnahmen aus dem Projekt dem Käufer zu und Ausgaben gehen zu seinen Lasten.
(2) Einnahmen und Ausgaben, die den Zeitraum vor und nach dem Stichtag betreffen (z. B. Jahresgebühren für Hosting, Domains, Software-Abos), werden zeitanteilig abgegrenzt und innerhalb von [z. B. 30] Tagen nach dem Stichtag abgerechnet.
(3) Bestellungen, die vor dem Stichtag eingegangen sind, wickelt [der Verkäufer auf eigene Rechnung ab, einschließlich Lieferung, Widerruf, Retouren und Gewährleistung / der Käufer ab; die Erlöse hieraus stehen dem Käufer zu, der Verkäufer stellt ihm die zugehörige Ware zur Verfügung].
(4) Für Gewährleistungs- und Widerrufsfälle aus Verkäufen vor dem Stichtag bleibt der Verkäufer gegenüber den Kunden verantwortlich. Erledigt der Käufer solche Fälle aus Kulanz, erstattet der Verkäufer ihm die Kosten gegen Nachweis.

§ 4 Übertragung von Domain, Hosting, Inhalten und Konten
(1) Der Verkäufer überträgt die Domains per AuthCode oder Inhaberwechsel innerhalb von [z. B. 3] Werktagen nach Eingang der ersten Kaufpreisrate. Er überträgt das Hosting-Konto bzw. unterstützt den Umzug auf das Hosting des Käufers durch Bereitstellung eines vollständigen Backups (Dateien und Datenbank) und [z. B. 14] Tage Parallelbetrieb.
(2) Alle Zugänge gemäß Anlage 1 (Benutzernamen, Passwörter, Zwei-Faktor-Geräte, Wiederherstellungs-E-Mails und -Telefonnummern) werden über einen sicheren Kanal [Passwort-Manager-Freigabe / verschlüsselte Datei] übergeben. Der Käufer ändert alle Passwörter unverzüglich nach Übergabe; der Verkäufer löscht seine Kopien.
(3) Bei Konten, die nach den Bedingungen des Anbieters nicht übertragbar sind (insbesondere Marktplatz- und Werbekonten), unterstützt der Verkäufer den Käufer bei der Neuanmeldung und der Übernahme von Bewertungen, Listings und Kampagnen, soweit der Anbieter dies zulässt. Ein Anspruch auf erfolgreiche Übertragung solcher Konten besteht nicht; für den Fall, dass das Konto [Name] nicht übertragen werden kann, mindert sich der Kaufpreis um [Betrag] EUR.
(4) Der Verkäufer räumt dem Käufer an allen von ihm selbst erstellten Inhalten das ausschließliche, zeitlich, räumlich und inhaltlich unbeschränkte, übertragbare Nutzungsrecht für alle Nutzungsarten einschließlich Bearbeitung ein. Für Inhalte Dritter (Freelancer-Texte, Stockfotos, Themes, Plugins) überträgt er die bestehenden Lizenzen, soweit übertragbar, und übergibt die Lizenznachweise; nicht übertragbare Lizenzen sind in Anlage 1 gekennzeichnet.
(5) Der Verkäufer ändert nach Übergabe die Impressums- und Datenschutzangaben nicht mehr; der Käufer aktualisiert Impressum, Datenschutzerklärung, AGB und Widerrufsbelehrung unverzüglich auf seine Daten.

§ 5 Kundendaten und Datenschutz
(1) Der Käufer tritt als neuer Verantwortlicher im Sinne der DSGVO an die Stelle des Verkäufers. Die Parteien übermitteln personenbezogene Daten nur im folgenden Umfang:
   a) Daten aus laufenden Kundenbeziehungen (offene Bestellungen, Gewährleistungsfälle, Kundenkonten mit Bestellhistorie) werden zur Fortführung dieser Vertragsverhältnisse übermittelt (Art. 6 Abs. 1 lit. b DSGVO); die Kunden werden vom Verkäufer vor dem Stichtag über den Inhaberwechsel und ihr Widerspruchsrecht informiert.
   b) Newsletter-Abonnenten: Der Verkäufer informiert die Abonnenten vor der Übermittlung per E-Mail über den Inhaberwechsel und gibt ihnen eine Frist von [z. B. 14] Tagen zum Widerspruch; nur die Daten der nicht widersprechenden Abonnenten werden übermittelt. [Alternativ: Der Käufer holt über eine Double-Opt-in-Kampagne des Verkäufers neue Einwilligungen ein; nur bestätigte Abonnenten werden übergeben.]
   c) Daten ehemaliger Kunden ohne laufende Vertragsbeziehung und ohne Einwilligung werden nicht übermittelt; der Verkäufer löscht sie nach Ablauf der steuerlichen Aufbewahrungsfristen.
(2) Der Verkäufer übergibt die Nachweise über erteilte Einwilligungen (Double-Opt-in-Protokolle, Zeitstempel, IP-Adressen) für die übermittelten Abonnenten.
(3) Beide Parteien stellen die technische und organisatorische Sicherheit der Übermittlung sicher (verschlüsselter Export, Löschung beim Verkäufer nach Übergabe, Protokoll über die Übergabe).
(4) Der Käufer übernimmt ab dem Stichtag die Pflichten als Verantwortlicher, einschließlich der Verzeichnisse, Auftragsverarbeitungsverträge mit Dienstleistern und der Beantwortung von Betroffenenanfragen; Anfragen zu Zeiträumen vor dem Stichtag beantwortet der Verkäufer mit Unterstützung des Käufers.

§ 6 Lieferanten, Verträge und laufende Bestellungen
(1) Die in Anlage 1 aufgeführten Lieferanten- und Dienstleisterverträge ([z. B. Lieferant [Name], Fulfillment [Name], Zahlungsanbieter, Software-Abos]) werden mit Wirkung zum Stichtag auf den Käufer übertragen, soweit der jeweilige Vertragspartner zustimmt. Der Verkäufer holt die Zustimmungen bis zum Stichtag ein. Verweigert ein Vertragspartner die Zustimmung, kündigt der Verkäufer den Vertrag zum nächstmöglichen Termin und der Käufer schließt einen eigenen Vertrag; die Parteien stellen sich im Innenverhältnis so, als wäre der Vertrag zum Stichtag übergegangen.
(2) Der Verkäufer stellt dem Käufer die Kontaktdaten, Konditionen, Mindestabnahmemengen und Lieferzeiten der Lieferanten gemäß Anlage 1 zur Verfügung und stellt den Käufer den Lieferanten innerhalb von [z. B. 7] Tagen nach dem Stichtag persönlich vor.
(3) Verbindlichkeiten gegenüber Lieferanten aus der Zeit vor dem Stichtag trägt der Verkäufer. Bereits bestellte, aber noch nicht gelieferte Ware übernimmt der Käufer gegen Erstattung des Einkaufspreises, soweit sie in Anlage 2 aufgeführt ist.

§ 7 Einarbeitung und Unterstützung
(1) Der Verkäufer arbeitet den Käufer in den Betrieb des Projekts ein: [z. B. 20] Stunden innerhalb der ersten [4] Wochen nach dem Stichtag, per Videokonferenz oder vor Ort, zu abgestimmten Terminen. Gegenstand sind insbesondere Shop-Administration, Bestellabwicklung, Werbekampagnen, Content-Prozesse und Lieferantenkontakte.
(2) Darüber hinaus steht der Verkäufer für [z. B. 3] Monate nach dem Stichtag für Rückfragen per E-Mail mit einer Antwortzeit von [z. B. 2] Werktagen zur Verfügung. Diese Leistungen sind mit dem Kaufpreis abgegolten. Weitergehende Unterstützung wird mit [Betrag] EUR je Stunde vergütet.
(3) Der Verkäufer übergibt eine Dokumentation der wesentlichen Prozesse (Anlage 3).

§ 8 Garantien des Verkäufers
Der Verkäufer garantiert im Wege eines selbständigen Garantieversprechens, dass zum Stichtag
   a) er Inhaber der Assets ist und frei darüber verfügen kann; die Assets sind frei von Rechten Dritter,
   b) die Inhalte des Projekts keine Rechte Dritter (Urheber-, Marken-, Persönlichkeits-, Wettbewerbsrecht) verletzen und ihm keine Abmahnungen, Unterlassungsaufforderungen oder Klagen bezüglich des Projekts in den letzten [z. B. 3] Jahren zugegangen sind, außer: [Angabe],
   c) die in Anlage 4 dargestellten Umsätze, Kosten und Gewinne der letzten [12] Monate sowie die Besucher- und Bestellzahlen zutreffend und vollständig sind und aus den Systemen des Projekts stammen,
   d) keine künstlichen Besucher, gekauften Bewertungen oder gegen Plattformregeln verstoßenden Maßnahmen eingesetzt wurden,
   e) keine behördlichen Verfahren, Plattform-Sperren oder Zahlungsanbieter-Rückstellungen bestehen oder angedroht sind,
   f) alle Steuern und Abgaben für das Projekt bis zum Stichtag erklärt und bezahlt wurden oder vom Verkäufer bezahlt werden.
Verletzt der Verkäufer eine Garantie, stellt er den Käufer von Ansprüchen Dritter frei und ersetzt den Schaden; der Käufer hat ihm die Verletzung innerhalb von [z. B. 12] Monaten nach dem Stichtag in Textform anzuzeigen.

§ 9 Wettbewerbsverbot
(1) Der Verkäufer verpflichtet sich, für die Dauer von [24] Monaten ab dem Stichtag im Gebiet [Deutschland / deutschsprachiger Raum / weltweit für Online-Angebote in deutscher Sprache] kein Projekt zu betreiben, zu beraten oder sich daran zu beteiligen, das mit dem Projekt in Wettbewerb steht, insbesondere im Themenbereich [Beschreibung]. Ausgenommen sind: [Angabe].
(2) Der Verkäufer wird in diesem Zeitraum keine Kunden, Abonnenten, Lieferanten oder Kooperationspartner des Projekts gezielt abwerben und keine ähnlichen Domains, Marken oder Social-Media-Handles anmelden.
(3) Für jeden Fall der Zuwiderhandlung zahlt der Verkäufer eine Vertragsstrafe von [Betrag] EUR; bei einem Dauerverstoß gilt jeder angefangene Monat als eigener Verstoß. Weitergehende Schadensersatz- und Unterlassungsansprüche bleiben unberührt; die Vertragsstrafe wird auf den Schadensersatz angerechnet.

§ 10 Haftung
(1) Soweit in § 8 nichts anderes bestimmt ist, werden die Assets in dem Zustand verkauft, in dem sie sich am Stichtag befinden. Eine Gewähr für den künftigen wirtschaftlichen Erfolg, Suchmaschinenrankings, Besucherzahlen, die Fortdauer von Plattformkonten oder Lieferantenkonditionen übernimmt der Verkäufer nicht.
(2) Die Parteien haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden aus der Verletzung von Leben, Körper oder Gesundheit. Im Übrigen ist die Haftung auf den vorhersehbaren, vertragstypischen Schaden und auf die Höhe des Kaufpreises begrenzt.

§ 11 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; dies gilt auch für die Aufhebung dieser Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Die Parteien behandeln den Inhalt dieses Vertrags vertraulich.
(3) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt.
(4) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist [Ort], soweit beide Parteien Kaufleute sind.
(5) Anlagen: Anlage 1 – Asset-Liste und Zugänge; Anlage 2 – Inventurliste Warenbestand; Anlage 3 – Prozessdokumentation; Anlage 4 – Umsatz- und Gewinnaufstellung der letzten 12 Monate. Die Anlagen sind Bestandteil dieses Vertrags.

[Ort], den [Datum]


______________________________
[Verkäufer, ggf. Firma und Vertreter]


______________________________
[Käufer, ggf. Firma und Vertreter]


Anlage 1 – Asset-Liste und Zugänge (Muster)
Nr. | Asset | Anbieter / Konto | Übertragbar | Übergabeweg | Status
1 | Domain [domain.de] | [Registrar] | ja | AuthCode | [ ] übertragen
2 | Hosting | [Anbieter], Kunden-Nr. [Nummer] | [ja/nein] | Kontoübertragung / Backup | [ ] übertragen
3 | Shop-System | [System], Konto [Nummer] | [ja/nein] | Inhaberwechsel | [ ] übertragen
4 | Zahlungsanbieter | [Anbieter] | nein | Neuanmeldung Käufer | [ ] erledigt
5 | Social-Media | [Plattform, Handle] | ja | Passwort + 2FA | [ ] übertragen
6 | Newsletter-Tool | [Anbieter], [Anzahl] Abonnenten | ja | Export nach § 5 | [ ] übertragen
7 | Lieferant | [Name], Ansprechpartner [Name] | mit Zustimmung | Vorstellung | [ ] erledigt
[weitere Positionen]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "unternehmenskaufvertrag-asset-deal",
    titel: "Unternehmenskaufvertrag (Asset Deal)",
    kurz: "Kaufvertrag über ein Kleinunternehmen als Asset Deal: Vermögensgegenstände, Verträge, Arbeitsverhältnisse nach § 613a BGB, Kaufpreisaufteilung, Garantien, § 25 HGB, Stichtag, Wettbewerbsverbot.",
    kategorie: "kauf",
    dateiname: "Unternehmenskaufvertrag-Asset-Deal",
    wofuer: [
      "Du übernimmst ein Einzelunternehmen, einen Laden, eine Werkstatt, eine Agentur oder ein Handwerksgeschäft mit Inventar, Kunden und Mitarbeitern",
      "Du verkaufst dein Unternehmen, ohne eine GmbH-Beteiligung zu übertragen (kein Share Deal)",
      "Wenn Mitarbeiter übergehen und der Übergang nach § 613a BGB sauber abgewickelt werden muss",
      "Wenn die Haftung für Altverbindlichkeiten nach § 25 HGB ausgeschlossen werden soll",
    ],
    enthaelt: [
      "§ 1 Verkauf und Übertragung der Vermögensgegenstände",
      "§ 2 Übernahme von Verträgen",
      "§ 3 Übergang der Arbeitsverhältnisse (§ 613a BGB)",
      "§ 4 Nicht übernommene Gegenstände und Verbindlichkeiten",
      "§ 5 Kaufpreis und Aufteilung",
      "§ 6 Stichtag, Übergabe und Abgrenzung",
      "§ 7 Garantien des Verkäufers",
      "§ 8 Rechtsfolgen bei Garantieverletzung",
      "§ 9 Haftung nach § 25 HGB und Firmenfortführung",
      "§ 10 Wettbewerbsverbot",
      "§ 11 Mitwirkung nach dem Stichtag",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Wer ein Handelsgeschäft unter der bisherigen Firma fortführt, haftet für alle Altverbindlichkeiten (§ 25 Abs. 1 HGB). Der Ausschluss wirkt gegenüber Dritten nur, wenn er ins Handelsregister eingetragen und bekanntgemacht oder dem Dritten mitgeteilt wird (§ 25 Abs. 2 HGB). Die Vorlage sieht beides vor – ohne Eintragung ist die Klausel nach außen wertlos.",
      "Arbeitsverhältnisse gehen beim Betriebsübergang automatisch über (§ 613a BGB). Kündigungen wegen des Übergangs sind unwirksam. Jeder Mitarbeiter muss vorher schriftlich informiert werden und hat einen Monat Widerspruchsrecht; eine fehlerhafte Information lässt die Frist nicht laufen.",
      "Die Kaufpreisaufteilung auf Anlagegüter, Warenbestand und Firmenwert bestimmt die Abschreibung beim Käufer und die Besteuerung beim Verkäufer. Vorher mit dem Steuerberater abstimmen; das Finanzamt prüft unrealistische Aufteilungen.",
      "Steuerschulden des Betriebs können den Erwerber treffen (§ 75 AO, Haftung für Betriebssteuern des letzten Jahres vor Übereignung). Unbedenklichkeitsbescheinigung des Finanzamts und Freistellung im Vertrag sind Pflicht.",
      "Grundstücke und GmbH-Anteile brauchen den Notar. Diese Vorlage ist für Betriebe ohne eigenen Grundbesitz; Mietverträge werden mit Zustimmung des Vermieters übernommen.",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen Asset Deal und Share Deal?",
        a: "Beim Asset Deal kaufst du einzelne Vermögensgegenstände, Verträge und Rechte des Unternehmens; jeder Gegenstand muss einzeln übertragen werden, Verträge brauchen die Zustimmung des Vertragspartners. Beim Share Deal kaufst du die Anteile an der Gesellschaft (GmbH, UG); das Unternehmen bleibt mit allen Verträgen und Risiken unverändert. Für Einzelunternehmen und GbR gibt es nur den Asset Deal.",
      },
      {
        q: "Gehen die Mitarbeiter automatisch mit?",
        a: "Ja. Übernimmst du den Betrieb oder einen abgrenzbaren Betriebsteil, trittst du nach § 613a BGB in alle bestehenden Arbeitsverhältnisse ein, mit Betriebszugehörigkeit, Gehalt, Urlaubsansprüchen und Kündigungsschutz. Der Verkäufer oder du musst jeden Mitarbeiter vorher schriftlich über Zeitpunkt, Grund, Folgen und geplante Maßnahmen informieren. Mitarbeiter können innerhalb eines Monats widersprechen und bleiben dann beim Verkäufer.",
      },
      {
        q: "Wie schütze ich mich als Käufer vor versteckten Schulden?",
        a: "Durch drei Dinge: eine Prüfung vor dem Kauf (Due Diligence: Bilanzen, Verträge, Steuerbescheide, offene Rechtsstreitigkeiten), den Haftungsausschluss nach § 25 Abs. 2 HGB mit Eintragung ins Handelsregister und Garantien des Verkäufers mit Freistellung und einem Kaufpreiseinbehalt oder Treuhandbetrag, aus dem du Ansprüche befriedigen kannst. Die Vorlage enthält alle drei Bausteine.",
      },
      {
        q: "Brauche ich für den Asset Deal einen Notar?",
        a: "Nur wenn ein Grundstück oder GmbH-Anteile mitverkauft werden. Ein Unternehmen ohne Grundbesitz lässt sich privatschriftlich übertragen. Die Handelsregisteranmeldung des Haftungsausschlusses und einer Firmenfortführung muss aber notariell beglaubigt werden. Wegen der Komplexität solltest du den fertigen Vertrag vor Unterschrift anwaltlich prüfen lassen.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Unternehmenskaufvertrag als Asset Deal brauchst",
        text: "Viele Gründungen sind in Wahrheit Übernahmen: Der Inhaber eines Fahrradladens geht in Rente, eine Werkstatt sucht einen Nachfolger, eine kleine Agentur wird abgegeben. Du übernimmst Inventar, Warenlager, Kunden, Lieferanten, Mietvertrag und Mitarbeiter und führst den Betrieb weiter. Weil ein Einzelunternehmen oder eine GbR keine Anteile hat, die man kaufen könnte, läuft die Übernahme immer als Asset Deal: Jeder Vermögensgegenstand und jeder Vertrag wird einzeln übertragen.\n\nDiese Vorlage deckt genau diesen Fall für kleine Betriebe ohne eigenen Grundbesitz ab. Sie regelt Vermögensgegenstände, Vertragsübernahme, den Übergang der Arbeitsverhältnisse nach § 613a BGB, Kaufpreisaufteilung, Stichtag, Garantien, den Haftungsausschluss nach § 25 HGB und ein Wettbewerbsverbot. Für den Kauf einer GmbH oder UG (Share Deal) ist sie nicht geeignet, weil dort der Notar beurkundet. Für Webprojekte ohne Mitarbeiter reicht der Website-Kaufvertrag.",
      },
      {
        titel: "Was muss in einen Unternehmenskaufvertrag? Assets, Verträge, Mitarbeiter, Garantien",
        text: "Der Vertrag muss das Unternehmen in seine Teile zerlegen und jeden Teil regeln. Die Vorlage arbeitet mit sieben Anlagen: Sachanlagen, Warenbestand, immaterielle Werte, Forderungen, Verträge, Arbeitnehmer und Due-Diligence-Unterlagen. Im Vertrag selbst stehen:\n\n- Verkauf und Übereignung der Kaufgegenstände, Firma, Forderungen, Geschäftsunterlagen (§ 1)\n- Vertragsübernahme mit Zustimmungsvorbehalt und Innenverhältnis-Lösung bei Verweigerung (§ 2)\n- Übergang der Arbeitsverhältnisse, Unterrichtung, Widerspruch, Urlaubsausgleich, Kündigungsverbot (§ 3)\n- nicht übernommene Gegenstände und Verbindlichkeiten, gegenseitige Freistellung (§ 4)\n- Kaufpreis mit Aufteilung, Inventur zum Stichtag, Umsatzsteuer, Einbehalt oder Treuhand, Earn-out (§ 5)\n- Stichtag, Übergabeprotokoll, Abgrenzung, Gewerbeummeldung (§ 6)\n- Garantien zu Eigentum, Abschlüssen, Verträgen, Arbeitnehmern, Steuern, Verfahren, Genehmigungen (§ 7)\n- Rechtsfolgen mit Freigrenze, Haftungshöchstbetrag und Verjährung, Ausschluss der Sachmängelhaftung (§ 8)\n- Haftungsausschluss nach § 25 Abs. 2 HGB mit Registereintragung, Freistellung nach § 75 AO (§ 9)\n- Wettbewerbsverbot und Mitwirkung nach dem Stichtag (§§ 10, 11)",
      },
      {
        titel: "Unternehmenskaufvertrag Muster ausfüllen: Anlagen zuerst, dann Vertrag",
        text: "Beginne mit der Due Diligence: Lass dir die Abschlüsse der letzten drei Jahre, die BWA, alle Verträge, die Personalliste und die Steuerbescheide geben und lege sie als Anlage 7 ab. Erstelle dann die Anlagen 1 bis 6 gemeinsam mit dem Verkäufer. Erst danach füllst du den Vertrag aus. In der Vorbemerkung beschreibst du das Unternehmen und die Zahl der Mitarbeiter. In § 1 Abs. 1 entscheidest du bei Buchstabe d, ob die Firma fortgeführt wird, und bei Buchstabe e, ob Forderungen übergehen.\n\nIn § 3 Abs. 3 wählst du, ob der Kaufpreis sinkt, wenn Schlüsselmitarbeiter widersprechen. In § 5 trägst du die Aufteilung des Kaufpreises ein, abgestimmt mit dem Steuerberater, dazu Inventurmethode, Zahlungsrate am Stichtag und Einbehalt mit Dauer; den Earn-out behältst du nur, wenn er gewollt ist. In § 7 ergänzt der Verkäufer bei jedem „außer: [Angabe]“ die bekannten Ausnahmen; leere Felder sind spätere Garantieverletzungen. In § 8 setzt du Freigrenze, Haftungsobergrenze und Verjährung ein. In § 9 bleibt nur die Variante mit oder ohne Firmenfortführung, in § 10 Dauer und Umkreis des Wettbewerbsverbots. Die Unterrichtung der Mitarbeiter nach Anlage 6a geht vor dem Stichtag raus.",
      },
      {
        titel: "Typische Fehler bei der Unternehmensübernahme und wie du sie vermeidest",
        text: "Erster Fehler: Der Haftungsausschluss nach § 25 Abs. 2 HGB steht nur im Vertrag. Gegenüber Gläubigern wirkt er erst mit Eintragung im Handelsregister oder Mitteilung an den Gläubiger; wer das vergisst, haftet für alle Altschulden. Melde die Eintragung direkt nach dem Stichtag an. Zweiter Fehler: Mitarbeiter zu spät oder unvollständig unterrichten. Fehlt im Schreiben ein Pflichtpunkt, läuft die Widerspruchsfrist nicht, und Mitarbeiter können Monate später zum Verkäufer zurückwechseln. Nutze Anlage 6a und lass das Schreiben prüfen.\n\nDritter Fehler: Steuerschulden übersehen. Nach § 75 AO haftet der Erwerber für Betriebssteuern des letzten Jahres vor der Übereignung; verlange die Bescheinigung des Finanzamts aus § 9 Abs. 3. Vierter Fehler: Kaufpreis ohne Aufteilung. Dann streitet das Finanzamt über Abschreibung und Firmenwert, und beim Verkäufer wird falsch besteuert. Fünfter Fehler: Mietvertrag nicht gesichert. Ohne Zustimmung des Vermieters stehst du mit Inventar und Mitarbeitern ohne Räume da. Hol die Zustimmung vor Unterschrift ein.",
      },
      {
        titel: "Rechtliche Grundlagen: § 613a BGB, § 25 HGB, § 75 AO, Garantien, Umsatzsteuer",
        text: "Beim Asset Deal wird jeder Gegenstand nach seinen eigenen Regeln übertragen: bewegliche Sachen durch Einigung und Übergabe (§ 929 BGB), Forderungen durch Abtretung (§ 398 BGB), Verträge nur mit Zustimmung des Vertragspartners, Marken nach § 27 MarkenG, Domains durch Inhaberwechsel. Die Arbeitsverhältnisse gehen beim Betriebsübergang kraft Gesetzes nach § 613a BGB über, mit Unterrichtungspflicht in Textform, einmonatigem Widerspruchsrecht und Kündigungsverbot wegen des Übergangs.\n\nWer ein Handelsgeschäft unter der bisherigen Firma fortführt, haftet nach § 25 Abs. 1 HGB für alle Altverbindlichkeiten; der Ausschluss nach Absatz 2 wirkt nur mit Registereintragung oder Mitteilung. Nach § 75 AO haftet der Erwerber zusätzlich für Betriebssteuern des Vorjahres. Weil die gesetzliche Sachmängelhaftung für ein Unternehmen kaum passt, arbeitet die Vorlage mit selbständigen Garantien nach § 311 Abs. 1 BGB und eigenen Rechtsfolgen. Ein nachvertragliches Wettbewerbsverbot ist zulässig, wenn es zeitlich, räumlich und sachlich begrenzt ist. Umsatzsteuerlich ist die Übertragung eines ganzen Betriebs eine nicht steuerbare Geschäftsveräußerung nach § 1 Abs. 1a UStG. Ein Notar ist nur für Grundstücke und GmbH-Anteile Pflicht; die Handelsregisteranmeldung muss aber notariell beglaubigt werden.",
      },
      {
        titel: "Wann der Unternehmenskaufvertrag aus der Vorlage nicht reicht",
        text: "Diese Vorlage ist für kleine Betriebe gemacht. Sobald ein Grundstück mitverkauft wird, muss der gesamte Vertrag notariell beurkundet werden, weil sonst auch der Rest unwirksam sein kann. Beim Kauf einer GmbH, UG oder von Kommanditanteilen gilt ein Share Deal mit Beurkundung und völlig anderen Garantien. Gehört zum Betrieb eine Betriebsrente, ein Betriebsrat oder ein Tarifvertrag, braucht § 3 arbeitsrechtliche Beratung.\n\nBei Kaufpreisen ab dem mittleren sechsstelligen Bereich, bei Finanzierung über Bank oder Förderdarlehen, bei Earn-out über mehrere Jahre und bei laufenden Rechtsstreitigkeiten oder Betriebsprüfungen solltest du den fertigen Vertrag vor Unterschrift von einem Anwalt prüfen lassen und den Steuerberater zur Kaufpreisaufteilung, Geschäftsveräußerung im Ganzen und zur Besteuerung des Verkäufers hinzuziehen. Genehmigungspflichtige Gewerbe (Handwerksrolle, Gaststätten, Bewachung) verlangen eigene Erlaubnisse des Käufers. GründerX ist Software und bietet Muster, keine Rechts- oder Steuerberatung.",
      },
    ],
    seo: {
      title: "Unternehmenskaufvertrag Vorlage (Asset Deal) | GründerX",
      description:
        "Unternehmenskaufvertrag (Asset Deal) als Vorlage: Vermögensgegenstände, Verträge, § 613a BGB, Kaufpreisaufteilung, Garantien, § 25 HGB, Wettbewerbsverbot.",
    },
    stand: "2026-10",
    text: `Unternehmenskaufvertrag (Asset Deal)

zwischen

[Vorname Nachname / Firma, Rechtsform], [Straße, PLZ Ort], [vertreten durch [Vorname Nachname]], [Handelsregister / Gewerbeanmeldung], USt-IdNr. [DE…]
– nachfolgend „Verkäufer“ –

und

[Vorname Nachname / Firma, Rechtsform], [Straße, PLZ Ort], [vertreten durch [Vorname Nachname]], USt-IdNr. [DE…]
– nachfolgend „Käufer“ –

Vorbemerkung
Der Verkäufer betreibt unter der Bezeichnung „[Firma / Geschäftsbezeichnung]“ in [Adresse] ein Unternehmen mit dem Gegenstand [z. B. Betrieb eines Einzelhandelsgeschäfts für Fahrräder mit Werkstatt] (nachfolgend „Unternehmen“). Der Verkäufer beschäftigt [Anzahl] Arbeitnehmer. Der Käufer beabsichtigt, das Unternehmen fortzuführen. Die Parteien vereinbaren den Verkauf und die Übertragung der zum Unternehmen gehörenden Vermögensgegenstände, Rechte und Verträge im Wege der Einzelrechtsnachfolge (Asset Deal). Der Käufer hat vor Vertragsschluss Einsicht in die in Anlage 7 aufgeführten Unterlagen genommen (Due Diligence).

§ 1 Verkauf und Übertragung der Vermögensgegenstände
(1) Der Verkäufer verkauft und überträgt dem Käufer mit Wirkung zum Stichtag (§ 6) folgende Vermögensgegenstände (nachfolgend „Kaufgegenstände“):
   a) das Sachanlagevermögen gemäß Anlage 1 (Betriebs- und Geschäftsausstattung, Maschinen, Werkzeuge, Fahrzeuge, IT),
   b) den Warenbestand (Roh-, Hilfs- und Betriebsstoffe, Handelswaren, fertige und unfertige Erzeugnisse) gemäß Inventur zum Stichtag (Anlage 2),
   c) die immateriellen Vermögensgegenstände gemäß Anlage 3: [Marken, Domains, Website, Social-Media-Konten, Software und Lizenzen, Telefonnummern], das Know-how, die Kunden- und Lieferantenlisten sowie den Geschäftswert (Goodwill),
   d) [die Firma „[Firma]“ mit dem Recht zur Fortführung nach § 22 HGB, mit dem Zusatz „Inhaber [Name]“ / Die Firma wird nicht übertragen; der Käufer führt das Unternehmen unter eigener Bezeichnung fort.]
   e) [die Forderungen aus Lieferungen und Leistungen gemäß Anlage 4 zum Stichtag / Forderungen werden nicht übertragen],
   f) sämtliche Geschäftsunterlagen, soweit sie für die Fortführung erforderlich sind; der Verkäufer darf Kopien behalten, soweit er sie für seine Buchführung und Steuerpflichten benötigt.
(2) Die Übereignung der beweglichen Sachen erfolgt zum Stichtag durch Übergabe; soweit sich Gegenstände im Besitz Dritter befinden, durch Abtretung des Herausgabeanspruchs. Für Gegenstände, die unter Eigentumsvorbehalt stehen, überträgt der Verkäufer sein Anwartschaftsrecht; die Parteien regeln die Ablösung in Anlage 1.
(3) Rechte, Marken und Domains werden durch gesonderte Erklärungen übertragen; der Verkäufer unterzeichnet alle für die Umschreibung erforderlichen Dokumente. Software wird übertragen, soweit die Lizenzbedingungen dies zulassen.

§ 2 Übernahme von Verträgen
(1) Der Käufer tritt mit Wirkung zum Stichtag in die in Anlage 5 aufgeführten Verträge ein, insbesondere [Mietvertrag über die Geschäftsräume [Adresse], Leasingverträge, Lieferanten- und Rahmenverträge, Wartungs- und Softwareverträge, Versicherungen, Kundenverträge und Aufträge].
(2) Die Übernahme steht unter dem Vorbehalt der Zustimmung des jeweiligen Vertragspartners. Der Verkäufer holt die Zustimmungen bis zum Stichtag ein; der Käufer wirkt mit. Verweigert ein Vertragspartner die Zustimmung, stellen sich die Parteien im Innenverhältnis so, als wäre der Vertrag übergegangen: Der Verkäufer führt den Vertrag für Rechnung des Käufers fort, der Käufer stellt ihn von allen Verpflichtungen daraus frei, bis eine Neuvereinbarung oder Beendigung möglich ist.
(3) Rechte und Pflichten aus den übernommenen Verträgen, die den Zeitraum vor dem Stichtag betreffen, verbleiben beim Verkäufer; die Parteien grenzen zeitanteilig ab (§ 6 Abs. 3).
(4) Aufträge und Bestellungen, die zum Stichtag angenommen, aber noch nicht ausgeführt sind, übernimmt der Käufer (Anlage 5). Anzahlungen hierauf, die der Verkäufer erhalten hat, zahlt er an den Käufer aus bzw. sie werden mit dem Kaufpreis verrechnet.

§ 3 Übergang der Arbeitsverhältnisse (§ 613a BGB)
(1) Mit dem Stichtag gehen die Arbeitsverhältnisse der in Anlage 6 aufgeführten Arbeitnehmer (Name, Eintrittsdatum, Funktion, Vergütung, Urlaubsanspruch, Sonderregelungen) kraft Gesetzes nach § 613a BGB auf den Käufer über. Der Käufer tritt in alle Rechte und Pflichten aus diesen Arbeitsverhältnissen ein.
(2) Der Verkäufer und der Käufer unterrichten die betroffenen Arbeitnehmer vor dem Stichtag gemeinsam in Textform über den Zeitpunkt des Übergangs, den Grund, die rechtlichen, wirtschaftlichen und sozialen Folgen und die in Aussicht genommenen Maßnahmen (§ 613a Abs. 5 BGB). Der Entwurf des Unterrichtungsschreibens ist Anlage 6a. Die Arbeitnehmer können dem Übergang innerhalb eines Monats nach Zugang der Unterrichtung schriftlich widersprechen (§ 613a Abs. 6 BGB).
(3) Widerspricht ein Arbeitnehmer, verbleibt sein Arbeitsverhältnis beim Verkäufer. [Der Kaufpreis mindert sich in diesem Fall um [Betrag] EUR je widersprechendem Arbeitnehmer in Schlüsselfunktion gemäß Anlage 6 / Eine Kaufpreisanpassung erfolgt nicht.]
(4) Der Verkäufer trägt alle Verpflichtungen aus den Arbeitsverhältnissen, die bis zum Stichtag entstanden sind (insbesondere Vergütung, Sozialversicherungsbeiträge, Lohnsteuer, Boni, Überstunden). Für Urlaubsansprüche und Zeitguthaben, die zum Stichtag bestehen und auf den Käufer übergehen, zahlt der Verkäufer dem Käufer einen Ausgleich in Höhe des Bruttowerts zuzüglich Arbeitgeberanteile gemäß Abrechnung in Anlage 6. Rückstellungen für Altersteilzeit, Jubiläen und betriebliche Altersversorgung: [keine / Regelung gemäß Anlage 6].
(5) Der Käufer verpflichtet sich, Kündigungen wegen des Betriebsübergangs zu unterlassen (§ 613a Abs. 4 BGB). Kündigungen aus anderen Gründen bleiben unberührt. Der Verkäufer stellt den Käufer von Ansprüchen frei, die auf einer unvollständigen oder fehlerhaften Unterrichtung beruhen, soweit er die Unterrichtung zu vertreten hat.
(6) Der Verkäufer übergibt zum Stichtag die Personalakten, Lohnkonten, Meldebescheinigungen und Arbeitsverträge. Die Übergabe erfolgt unter Beachtung des Datenschutzes; der Käufer verwendet die Daten nur zur Durchführung der Arbeitsverhältnisse.

§ 4 Nicht übernommene Gegenstände und Verbindlichkeiten
(1) Nicht verkauft werden: Bankguthaben und Kassenbestand zum Stichtag, [Forderungen gemäß § 1 Abs. 1 lit. e, soweit nicht übertragen], Steuererstattungsansprüche, Ansprüche aus Versicherungen für Zeiträume vor dem Stichtag, private Gegenstände des Verkäufers gemäß Anlage 1 (Spalte „ausgenommen“).
(2) Der Käufer übernimmt keine Verbindlichkeiten des Verkäufers, soweit in diesem Vertrag nichts anderes bestimmt ist. Insbesondere nicht übernommen werden Verbindlichkeiten aus Lieferungen und Leistungen vor dem Stichtag, Darlehen, Steuern und Abgaben für Zeiträume bis zum Stichtag, Gewährleistungs- und Produkthaftungsansprüche aus Verkäufen vor dem Stichtag sowie Verbindlichkeiten aus Rechtsstreitigkeiten, die vor dem Stichtag anhängig waren oder deren Ursache vor dem Stichtag liegt.
(3) Der Verkäufer stellt den Käufer von allen nicht übernommenen Verbindlichkeiten frei, insbesondere von einer Haftung nach § 25 HGB, § 75 AO oder § 613a BGB für Zeiträume vor dem Stichtag, soweit die Haftung nicht nach diesem Vertrag vom Käufer zu tragen ist.
(4) Der Käufer stellt den Verkäufer von allen Verbindlichkeiten frei, die aus der Fortführung des Unternehmens nach dem Stichtag entstehen.

§ 5 Kaufpreis und Aufteilung
(1) Der Kaufpreis für die Kaufgegenstände und die Übernahme der Verträge beträgt insgesamt [Betrag] EUR. Er teilt sich wie folgt auf:
   a) Sachanlagevermögen (Anlage 1): [Betrag] EUR
   b) Warenbestand (Anlage 2, vorläufig; Anpassung nach Absatz 2): [Betrag] EUR
   c) Immaterielle Vermögensgegenstände einschließlich Marken, Domains und Kundenstamm: [Betrag] EUR
   d) Geschäftswert (Goodwill): [Betrag] EUR
   [e) Forderungen: [Betrag] EUR]
(2) Der Wert des Warenbestands wird durch eine gemeinsame Inventur am Stichtag zu [Einstandspreisen / Einstandspreisen abzüglich [z. B. 20] % für Ware älter als 12 Monate] ermittelt. Weicht der ermittelte Wert vom vorläufigen Wert nach Absatz 1 lit. b ab, wird der Kaufpreis entsprechend angepasst.
(3) Umsatzsteuer: Die Parteien gehen davon aus, dass die Veräußerung eine nicht steuerbare Geschäftsveräußerung im Ganzen nach § 1 Abs. 1a UStG ist. Sollte die Finanzverwaltung dies rechtskräftig anders beurteilen, schuldet der Käufer dem Verkäufer die Umsatzsteuer zusätzlich gegen Vorlage einer ordnungsgemäßen Rechnung; der Käufer tritt in die Vorsteuerberichtigungszeiträume nach § 15a UStG ein.
(4) Zahlung: [Betrag] EUR ([z. B. 80] %) am Stichtag Zug um Zug gegen Übergabe auf das Konto [IBAN]. [Betrag] EUR ([z. B. 20] %) werden als Sicherheit für Ansprüche des Käufers aus §§ 7 und 8 für [z. B. 12] Monate [auf einem Treuhandkonto bei [Notar/Rechtsanwalt] hinterlegt / vom Käufer einbehalten] und nach Ablauf dieser Frist ausgezahlt, soweit keine Ansprüche geltend gemacht wurden.
(5) [Optional: Zusätzlich zahlt der Käufer einen vom Erfolg abhängigen Kaufpreisanteil (Earn-out) von [z. B. 10] % des Umsatzes, der in den [12] Monaten nach dem Stichtag [Betrag] EUR übersteigt, höchstens [Betrag] EUR, fällig [30] Tage nach Ablauf des Zeitraums gegen Abrechnung.]
(6) Bei Zahlungsverzug gelten Verzugszinsen von 9 Prozentpunkten über dem Basiszinssatz (§ 288 Abs. 2 BGB).

§ 6 Stichtag, Übergabe und Abgrenzung
(1) Stichtag ist der [Datum], 00:00 Uhr. Besitz, Nutzen und Lasten der Kaufgegenstände gehen zu diesem Zeitpunkt auf den Käufer über, die Übereignung erfolgt aufschiebend bedingt durch die Zahlung des am Stichtag fälligen Kaufpreisteils.
(2) Die Übergabe erfolgt am Stichtag in den Geschäftsräumen. Die Parteien erstellen ein Übergabeprotokoll mit Inventurergebnis, Zählerständen, übergebenen Schlüsseln, Zugängen und Unterlagen.
(3) Erträge und Aufwendungen, die sich auf Zeiträume vor und nach dem Stichtag beziehen (Miete, Versicherungen, Gebühren, Abonnements, Energie), werden zeitanteilig abgegrenzt und innerhalb von [z. B. 30] Tagen nach dem Stichtag ausgeglichen.
(4) Zahlungen, die nach dem Stichtag beim Verkäufer eingehen, aber dem Käufer zustehen, leitet der Verkäufer unverzüglich weiter; umgekehrt gilt dasselbe.
(5) Der Verkäufer meldet das Gewerbe zum Stichtag ab bzw. um; der Käufer meldet es an. Der Verkäufer teilt Behörden, Berufsgenossenschaft, IHK/HWK, Krankenkassen und Finanzamt den Übergang mit.

§ 7 Garantien des Verkäufers
Der Verkäufer garantiert im Wege eines selbständigen Garantieversprechens (§ 311 Abs. 1 BGB), dass zum Zeitpunkt des Vertragsschlusses und zum Stichtag
   a) er Eigentümer der Kaufgegenstände ist und frei über sie verfügen kann; die Kaufgegenstände sind frei von Rechten Dritter, soweit nicht in Anlage 1 (Eigentumsvorbehalt, Leasing) ausgewiesen,
   b) die in Anlage 7 enthaltenen Jahresabschlüsse bzw. Einnahmenüberschussrechnungen der letzten [3] Jahre und die betriebswirtschaftliche Auswertung zum [Datum] nach den Grundsätzen ordnungsmäßiger Buchführung erstellt wurden und die Vermögens-, Finanz- und Ertragslage des Unternehmens zutreffend wiedergeben,
   c) seit dem [Datum des letzten Abschlusses] das Unternehmen im gewöhnlichen Geschäftsgang geführt wurde und keine wesentlichen nachteiligen Veränderungen eingetreten sind,
   d) die Anlage 5 alle wesentlichen Verträge vollständig aufführt, diese wirksam sind, ordnungsgemäß erfüllt wurden und kein Vertragspartner gekündigt oder eine Kündigung angekündigt hat,
   e) die Anlage 6 alle Arbeitnehmer mit zutreffenden Angaben aufführt, keine weiteren Beschäftigungsverhältnisse (auch freie Mitarbeiter mit Scheinselbständigkeitsrisiko, Aushilfen, Minijobs) bestehen, keine Zusagen auf betriebliche Altersversorgung bestehen und alle Lohnsteuern und Sozialversicherungsbeiträge abgeführt wurden,
   f) alle Steuern, Abgaben und Sozialversicherungsbeiträge des Unternehmens erklärt und bezahlt wurden oder ausreichend zurückgestellt sind und keine Betriebsprüfung läuft oder angekündigt ist, außer: [Angabe],
   g) keine Rechtsstreitigkeiten, behördlichen Verfahren, Abmahnungen oder Produkthaftungsfälle anhängig oder angedroht sind, außer: [Angabe],
   h) das Unternehmen über alle erforderlichen Erlaubnisse, Genehmigungen und Eintragungen (insbesondere [Handwerksrolle, Gaststättenerlaubnis, Gewerbeerlaubnis nach § 34 GewO]) verfügt, soweit diese übertragbar sind, und keine Verstöße gegen Vorschriften zu Produktsicherheit, Umwelt, Arbeitsschutz oder Datenschutz bekannt sind,
   i) die Betriebs- und Geschäftsausstattung sich in einem dem Alter entsprechenden, betriebsbereiten Zustand befindet und die Ware verkehrsfähig ist,
   j) die Kundenliste zutreffend ist und ihm keine Absicht der [z. B. 10] größten Kunden bekannt ist, die Geschäftsbeziehung zu beenden oder wesentlich einzuschränken.

§ 8 Rechtsfolgen bei Garantieverletzung
(1) Ist eine Garantie nach § 7 unrichtig, hat der Verkäufer den Käufer innerhalb von [z. B. 4] Wochen nach Anzeige so zu stellen, wie er stünde, wenn die Garantie richtig wäre (Naturalrestitution). Gelingt dies nicht, hat der Verkäufer Schadensersatz in Geld zu leisten.
(2) Ansprüche aus Garantieverletzung bestehen nur, wenn der Einzelanspruch [Betrag] EUR übersteigt und die Summe aller Ansprüche [Betrag] EUR übersteigt (Freigrenze); in diesem Fall ist der gesamte Betrag zu ersetzen. Die Haftung des Verkäufers aus Garantien ist insgesamt auf [z. B. 50 % des Kaufpreises / den Kaufpreis] begrenzt. Diese Begrenzungen gelten nicht bei Vorsatz oder arglistigem Verschweigen und nicht für die Garantien nach § 7 lit. a und f.
(3) Ansprüche aus § 7 verjähren [z. B. 24] Monate nach dem Stichtag; Ansprüche aus § 7 lit. f (Steuern) sechs Monate nach Bestandskraft des jeweiligen Bescheids.
(4) Der Käufer kann Ansprüche aus Garantieverletzung mit dem einbehaltenen bzw. hinterlegten Kaufpreisteil nach § 5 Abs. 4 verrechnen.
(5) Die gesetzliche Sachmängelhaftung für die Kaufgegenstände wird, soweit gesetzlich zulässig, ausgeschlossen; an ihre Stelle treten ausschließlich die Garantien nach § 7. Unberührt bleiben Ansprüche wegen Vorsatz, Arglist und Verletzung von Leben, Körper oder Gesundheit.

§ 9 Haftung nach § 25 HGB und Firmenfortführung
(1) [Variante Firmenfortführung: Der Käufer führt die Firma „[Firma]“ fort. Die Haftung des Käufers für die im Betrieb des Unternehmens begründeten Verbindlichkeiten des Verkäufers wird gemäß § 25 Abs. 2 HGB ausgeschlossen. Die Parteien melden den Haftungsausschluss unverzüglich nach dem Stichtag zur Eintragung in das Handelsregister an; der Verkäufer teilt ihn außerdem den in Anlage 5 genannten Vertragspartnern und den wesentlichen Gläubigern schriftlich mit. Entsprechend gehen die im Betrieb begründeten Forderungen nicht nach § 25 Abs. 1 Satz 2 HGB auf den Käufer über, soweit sie nicht nach § 1 Abs. 1 lit. e übertragen sind.]
(2) [Variante ohne Firmenfortführung: Der Käufer führt das Unternehmen nicht unter der bisherigen Firma fort, sondern unter der Bezeichnung „[neue Bezeichnung]“. Der Verkäufer verpflichtet sich, die bisherige Firma zu löschen bzw. nicht weiter zu verwenden. Vorsorglich vereinbaren die Parteien den Ausschluss der Haftung nach § 25 Abs. 2 HGB und melden ihn zum Handelsregister an, soweit der Verkäufer im Handelsregister eingetragen ist.]
(3) Der Verkäufer stellt den Käufer von jeder Inanspruchnahme nach § 25 HGB, § 75 AO und § 613a BGB für Verbindlichkeiten frei, die vor dem Stichtag begründet wurden und nicht nach diesem Vertrag übernommen sind. Der Verkäufer legt dem Käufer bis zum Stichtag eine Bescheinigung des Finanzamts über die steuerliche Unbedenklichkeit bzw. einen Kontoauszug des Steuerkontos vor.

§ 10 Wettbewerbsverbot
(1) Der Verkäufer verpflichtet sich, für die Dauer von [z. B. 2] Jahren ab dem Stichtag im Umkreis von [z. B. 50] km um [Standort] bzw. [für Online-Geschäfte: im Gebiet der Bundesrepublik Deutschland] weder unmittelbar noch mittelbar ein Unternehmen zu betreiben, zu beraten oder sich daran zu beteiligen, das mit dem Unternehmen in Wettbewerb steht. Eine Beteiligung von unter 5 % an börsennotierten Gesellschaften bleibt zulässig.
(2) Der Verkäufer wird in diesem Zeitraum keine Arbeitnehmer, Kunden oder Lieferanten des Unternehmens gezielt abwerben.
(3) Für jeden Fall der Zuwiderhandlung zahlt der Verkäufer eine Vertragsstrafe von [Betrag] EUR; bei Dauerverstößen gilt jeder angefangene Monat als eigener Verstoß. Weitergehende Unterlassungs- und Schadensersatzansprüche bleiben unberührt; die Vertragsstrafe wird angerechnet.
(4) [Ist der Verkäufer eine Gesellschaft: Das Wettbewerbsverbot gilt auch für die Gesellschafter und Geschäftsführer des Verkäufers, die diesen Vertrag mitunterzeichnen.]

§ 11 Mitwirkung nach dem Stichtag
(1) Der Verkäufer unterstützt den Käufer für [z. B. 3] Monate nach dem Stichtag mit bis zu [z. B. 40] Stunden bei der Einarbeitung, der Vorstellung bei Kunden und Lieferanten und der Übergabe des Know-hows. Diese Leistung ist mit dem Kaufpreis abgegolten; darüber hinausgehende Leistungen werden mit [Betrag] EUR je Stunde vergütet.
(2) Der Verkäufer gestattet dem Käufer, für [z. B. 6] Monate in Geschäftspapieren und Werbung auf die Übernahme hinzuweisen („vormals [Name]“).
(3) Beide Parteien bewahren die Geschäftsunterlagen entsprechend den gesetzlichen Fristen auf und gewähren einander Einsicht, soweit dies für Steuer- und Rechtsangelegenheiten erforderlich ist.
(4) Die Parteien verpflichten sich, sich gegenseitig über Anfragen, Mahnungen und Ansprüche Dritter zu informieren, die den jeweils anderen betreffen.

§ 12 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; dies gilt auch für die Aufhebung dieser Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Die Parteien behandeln den Inhalt dieses Vertrags vertraulich, soweit nicht gesetzliche Offenlegungspflichten bestehen.
(3) Jede Partei trägt die Kosten ihrer Berater; die Kosten der Handelsregisteranmeldung und Markenumschreibung trägt der Käufer.
(4) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. Die Parteien ersetzen die unwirksame Bestimmung durch eine wirksame, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(5) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist [Ort], soweit beide Parteien Kaufleute sind.
(6) Anlagen: Anlage 1 – Sachanlagevermögen; Anlage 2 – Warenbestand/Inventur; Anlage 3 – Immaterielle Vermögensgegenstände; Anlage 4 – Forderungen; Anlage 5 – Übernommene Verträge und offene Aufträge; Anlage 6 – Arbeitnehmer, Anlage 6a – Unterrichtungsschreiben nach § 613a Abs. 5 BGB; Anlage 7 – Jahresabschlüsse, BWA und Due-Diligence-Unterlagen. Die Anlagen sind Bestandteil dieses Vertrags.

[Ort], den [Datum]


______________________________
[Verkäufer, ggf. Firma und Vertreter]


______________________________
[Käufer, ggf. Firma und Vertreter]


[______________________________
[Vorname Nachname], Gesellschafter/Geschäftsführer des Verkäufers, für das Wettbewerbsverbot nach § 10 Abs. 4]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "kaufvertrag-amazon-fba-business",
    titel: "Kaufvertrag Amazon-FBA-Geschäft",
    kurz: "Kaufvertrag über ein Amazon-FBA-Geschäft: ASINs und Listings, Marke und Brand Registry, Lagerbestand bei Amazon, Seller-Konto nach Amazon-Regeln, Earn-out, Lieferanten und Garantien zu Umsätzen und Bewertungen.",
    kategorie: "kauf",
    dateiname: "Kaufvertrag-Amazon-FBA-Business",
    wofuer: [
      "Du kaufst eine Private-Label-Marke mit Amazon-Listings, Lagerbestand und Lieferanten von einem anderen Seller",
      "Du verkaufst dein FBA-Geschäft und willst Marke, Listings, Bestand und Lieferanten geordnet übergeben",
      "Wenn offen ist, ob das Seller-Konto übertragen wird oder die ASINs in ein bestehendes Konto des Käufers wandern",
      "Wenn ein Teil des Kaufpreises vom künftigen Umsatz abhängen soll (Earn-out)",
    ],
    enthaelt: [
      "§ 1 Kaufgegenstand (Marke, ASINs, Bestand, Lieferanten)",
      "§ 2 Kaufpreis, Lagerbestand und Earn-out",
      "§ 3 Stichtag und Abgrenzung",
      "§ 4 Übertragung des Seller-Kontos oder der Listings",
      "§ 5 Marke, Brand Registry und Inhalte",
      "§ 6 Lagerbestand bei Amazon und beim Lieferanten",
      "§ 7 Lieferanten und Produktkonformität",
      "§ 8 Garantien des Verkäufers",
      "§ 9 Übergangsphase und Einarbeitung",
      "§ 10 Wettbewerbsverbot",
      "§ 11 Haftung",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Amazon erlaubt die Übertragung eines Seller-Kontos nach seinen Bedingungen grundsätzlich nicht ohne Zustimmung von Amazon; in der Praxis wird bei Unternehmensverkäufen der Inhaberwechsel über den Seller Support beantragt oder die Listings werden auf ein Konto des Käufers übertragen. Die Vorlage sieht beide Wege vor und macht den Kaufpreis teilweise davon abhängig.",
      "Bewertungen hängen an der ASIN, nicht am Konto. Bei Übertragung der Listings in ein anderes Konto bleiben Produktbewertungen erhalten, Verkäuferbewertungen (Seller Feedback) nicht. Die Brand Registry muss auf den Käufer als neuen Markeninhaber umgeschrieben werden – das setzt die Markenumschreibung beim DPMA/EUIPO voraus.",
      "Wenn der Verkäufer Bewertungen gekauft, Rabatt-gegen-Bewertung-Aktionen gefahren oder Mehrfachkonten betrieben hat, droht dem Käufer die Kontosperre. Lass dir das ausdrücklich garantieren und prüfe die Account-Health-Historie vor dem Kauf.",
      "Verantwortlicher für Produktsicherheit, Verpackungslizenzierung (LUCID), Elektro- und Batteriegesetz, GPSR-Angaben und Importzoll wird ab Stichtag der Käufer. Fehlende Registrierungen sind kein Problem des Verkäufers mehr, sondern deins.",
      "Lagerbestand bei Amazon wird meist zum Einstandspreis gesondert bezahlt. Vereinbare, wie Fehlmengen, beschädigte Einheiten und Bestand im Transit (Inbound) gezählt werden.",
    ],
    faqs: [
      {
        q: "Kann ich ein Amazon-Seller-Konto überhaupt kaufen?",
        a: "Die Amazon-Bedingungen untersagen die Übertragung des Kontos ohne Amazons Zustimmung. Bei einem echten Unternehmensverkauf kann der Inhaberwechsel über den Seller Support beantragt werden: Neue rechtliche Daten, Bankverbindung, Steuernummern und Ausweise werden hinterlegt und geprüft. Scheitert das, bleibt die Übertragung der ASINs auf ein Konto des Käufers. Die Vorlage knüpft die zweite Kaufpreisrate an den erfolgreichen Weg.",
      },
      {
        q: "Wie wird der Kaufpreis für ein FBA-Geschäft üblicherweise bestimmt?",
        a: "Als Vielfaches des jährlichen bereinigten Gewinns (SDE), bei kleinen Marken etwa das 2- bis 4-fache, zuzüglich des Lagerbestands zum Einstandspreis. Earn-outs, also Nachzahlungen abhängig vom Umsatz nach dem Verkauf, gleichen Unsicherheiten über Ranking und Saisonalität aus. Die Vorlage sieht eine Grundzahlung, eine Rate nach Übertragung und einen optionalen Earn-out vor.",
      },
      {
        q: "Was passiert mit Rückerstattungen und Retouren aus Verkäufen vor dem Stichtag?",
        a: "Amazon bucht Erstattungen und Rücknahmen auf dem Konto, über das verkauft wurde. Die Vorlage ordnet alle Erlöse und Belastungen aus Bestellungen vor dem Stichtag dem Verkäufer zu und regelt eine Abrechnung nach 60 bis 90 Tagen, wenn die meisten Retourenfristen abgelaufen sind. Bei Kontoübertragung muss der Verkäufer dem Käufer diese Belastungen erstatten.",
      },
      {
        q: "Gehen die Lieferantenverträge automatisch auf mich über?",
        a: "Nein. Lieferanten in China oder der EU sind an keinen Vertrag mit dir gebunden. Die Vorlage verpflichtet den Verkäufer, dich vorzustellen, Konditionen, Formen und Werkzeuge zu übergeben und bestehende Bestellungen zu überleiten. Werkzeuge und Formen beim Lieferanten sollten ausdrücklich als dein Eigentum bestätigt werden.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Kaufvertrag für ein Amazon-FBA-Geschäft brauchst",
        text: "FBA-Marken werden gehandelt wie kleine Unternehmen: Ein Seller hat eine Private-Label-Marke mit drei bis zehn ASINs aufgebaut und will aussteigen, ein anderer kauft sie mit Listings, Bewertungen, Lagerbestand und Lieferanten, um sie weiterzuführen oder in sein Portfolio zu holen. Für Gründer ist das ein Einstieg mit vorhandenem Umsatz; für Verkäufer die Auszahlung jahrelanger Arbeit. Das Problem: Amazon ist Dritter im Spiel, und seine Regeln entscheiden, ob Konto, Listings und Brand Registry überhaupt wechseln können.\n\nDiese Vorlage ist auf diesen Sonderfall zugeschnitten. Sie regelt Marke und Brand Registry, ASINs und Inhalte, Lagerbestand bei Amazon, im Transit und beim Lieferanten, die zwei Wege Kontoübertragung oder Listing-Transfer, Earn-out, Lieferanten und Werkzeuge, Garantien zu Bewertungen und Account Health sowie ein Wettbewerbsverbot. Für Shops außerhalb von Amazon nimm den Website-Kaufvertrag, für Betriebe mit Mitarbeitern den Unternehmenskaufvertrag.",
      },
      {
        titel: "Was muss in einen FBA-Business-Kaufvertrag? Marke, ASINs, Bestand, Konto",
        text: "Ein FBA-Geschäft besteht aus Teilen, die bei verschiedenen Stellen liegen: beim DPMA oder EUIPO, bei Amazon, beim Lieferanten in China oder der EU, beim Prep-Center. Jeder Teil braucht eine eigene Übertragungsregel. Die Vorlage ordnet sie in sieben Anlagen und zwölf Paragraphen:\n\n- Marke mit Registernummer und Brand Registry, ASINs, SKUs, FNSKUs, EANs samt GS1-Lizenz, Listings und A+-Inhalte (§ 1)\n- Grundkaufpreis in zwei Raten, Bewertung des Lagerbestands zum Einstandspreis, Earn-out, Umsatzsteuer (§ 2)\n- Stichtag, Zuordnung von Erstattungen und A-bis-z-Fällen, Abrechnung nach 60 bis 90 Tagen (§ 3)\n- Variante A Kontoübertragung über den Seller Support oder Variante B Listing-Transfer ins Konto des Käufers, Zugänge, Verbot von Mehrfachkonten (§ 4)\n- Markenübertragung nach § 27 MarkenG, Brand-Registry-Umschreibung, Nutzungsrechte an Bildern und Texten (§ 5)\n- Lagerbestand bei Amazon, Inbound-Sendungen, Ware beim Lieferanten, nicht verkaufsfähige Einheiten (§ 6)\n- Lieferanten, Werkzeuge und Formen, laufende Bestellungen, Konformitätsdokumentation (§ 7)\n- Garantien zu Rechten, Zahlen, Bewertungen, Account Health, Produktkonformität, Steuern (§ 8)\n- Übergangsphase, Wettbewerbsverbot, Haftung (§§ 9 bis 11)",
      },
      {
        titel: "FBA-Kaufvertrag Muster ausfüllen: Kontoübertragung oder Listing-Transfer",
        text: "Prüfe vor dem Ausfüllen die Zahlen selbst: Lass dir Lesezugang zu Seller Central geben und ziehe die Transaktions-, Erstattungs- und Werbeberichte der letzten 12 bis 24 Monate; das wird Anlage 6. In § 1 trägst du Marke mit Registernummer und Klassen ein und listest in Anlage 1 jede ASIN mit SKU, FNSKU und EAN. In § 2 legst du Grundkaufpreis und Ratenaufteilung fest und entscheidest, was passiert, wenn die Übertragung innerhalb von 90 Tagen scheitert: Minderung oder Rücktritt. In Anlage 2 steht je SKU der Einstandspreis inklusive Fracht und Zoll.\n\nIn § 4 bleibt nur eine Variante stehen. Variante A, wenn das Konto nur diese Marke führt und der Käufer die Verkäuferbewertungen behalten will; Variante B, wenn der Käufer bereits ein Konto hat oder Amazon den Inhaberwechsel voraussichtlich ablehnt. In § 6 Abs. 4 regelst du nicht verkaufsfähige Einheiten, in § 7 die Frist für die Lieferantenvorstellung. In § 8 ergänzt der Verkäufer bei jedem „außer: [Angabe]“ bekannte IP-Complaints, Verwarnungen und Steuerprüfungen. In § 9 und § 10 trägst du Stunden, Dauer und Produktkategorien des Wettbewerbsverbots ein. Die Umschreibungserklärung für die Marke wird am Stichtag mit unterschrieben.",
      },
      {
        titel: "Typische Fehler beim Kauf eines FBA-Business und wie du sie vermeidest",
        text: "Erster Fehler: Den Kaufpreis vor Amazons Zustimmung voll bezahlen. Verweigert Amazon den Inhaberwechsel und scheitert auch der Listing-Transfer, hast du eine Marke ohne Vertriebskanal; die Vorlage knüpft die zweite Rate deshalb an die erfolgreiche Übertragung. Zweiter Fehler: Account-Health-Historie nicht prüfen. Gekaufte Bewertungen, Rabatt-gegen-Rezension-Aktionen oder verbundene Zweitkonten führen Monate später zur Sperre, und dann trifft es dich. Verlange Einsicht in die Verstöße und lass es in § 8 Buchstabe c und d garantieren.\n\nDritter Fehler: Brand Registry vergessen. Ohne Umschreibung der Marke im Register bleibt der Verkäufer Markeninhaber bei Amazon, und du kannst Listings weder schützen noch A+-Inhalte ändern. Vierter Fehler: Werkzeuge und Formen beim Lieferanten nicht sichern. Ohne schriftliche Bestätigung des Lieferanten produziert er morgen für den Verkäufer oder einen Dritten. Fünfter Fehler: Registrierungen übersehen. LUCID, stiftung ear, Batterieregister und die GPSR-Angaben zum verantwortlichen Wirtschaftsakteur laufen auf den Verkäufer; ab Stichtag musst du sie auf dich umstellen, sonst drohen Listing-Sperren.",
      },
      {
        titel: "Rechtliche Grundlagen: Amazon-Bedingungen, Markenübertragung, Produktsicherheit, Steuern",
        text: "Rechtlich ist der Kauf ein Asset Deal: Die Marke geht nach § 27 MarkenG durch Vertrag über, Nutzungsrechte an Bildern und Texten werden nach § 31 UrhG eingeräumt, der Lagerbestand nach § 929 ff. BGB übereignet, teils durch Anweisung an Amazon oder den Lieferanten als Besitzmittler. Das Verkäuferkonto ist ein Vertragsverhältnis mit Amazon, dessen Bedingungen die Übertragung ohne Zustimmung von Amazon untersagen; deshalb kann keine Partei die Zustimmung garantieren, und die Vorlage arbeitet mit zwei Wegen und einer Rückabwicklungsregel.\n\nWeil ein FBA-Geschäft keine Sache mit Mängeln ist, ersetzt die Vorlage die gesetzliche Gewährleistung durch selbständige Garantien mit Freistellung und Haftungsobergrenze. Produktsicherheitsrechtlich wirst du ab dem Stichtag Inverkehrbringer oder Importeur mit allen Pflichten nach Produktsicherheitsrecht, Verpackungsgesetz, Elektro- und Batteriegesetz und den Angaben zum verantwortlichen Wirtschaftsakteur nach der Produktsicherheitsverordnung. Umsatzsteuerlich kann eine Geschäftsveräußerung im Ganzen nach § 1 Abs. 1a UStG vorliegen; ausländische Umsatzsteuerpflichten aus Pan-EU-Lagerung und OSS bleiben beim Verkäufer für Zeiträume vor dem Stichtag. Ein Notar ist nicht erforderlich.",
      },
      {
        titel: "Wann die FBA-Kaufvertrag-Vorlage nicht reicht",
        text: "Wird statt der Assets die GmbH des Verkäufers übernommen, ist das ein Share Deal mit notarieller Beurkundung, dafür bleibt das Amazon-Konto unverändert bei der Gesellschaft; das ist bei größeren Marken oft der einfachere Weg und braucht anwaltliche Begleitung. Verkauft ein Seller mit Sitz im Ausland oder lagert die Ware in mehreren EU-Ländern (Pan-EU), kommen Umsatzsteuerregistrierungen, OSS und Zollfragen hinzu, die ein auf Online-Handel spezialisierter Steuerberater prüfen sollte.\n\nBei Kaufpreisen im sechsstelligen Bereich sind Treuhandkonto, Vertragsprüfung durch einen Anwalt und eine strukturierte Due Diligence mit Prüfung der Produktkonformität Pflicht; eine einzige Sicherheitslücke in einem Produkt kann die ganze Marke sperren. Laufende IP-Complaints, Patente Dritter oder ein Design-Streit lassen sich mit Garantien nicht heilen, sondern nur vor dem Kauf klären. GründerX stellt Software und Muster bereit, keine Rechts- oder Steuerberatung.",
      },
    ],
    seo: {
      title: "Amazon FBA Kaufvertrag Vorlage kostenlos | GründerX",
      description:
        "Kaufvertrag für ein Amazon-FBA-Geschäft: ASINs, Marke und Brand Registry, Lagerbestand, Seller-Konto nach Amazon-Regeln, Earn-out, Lieferanten, Garantien.",
    },
    stand: "2026-10",
    text: `Kaufvertrag über ein Amazon-FBA-Geschäft (Asset-Kauf)

zwischen

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], USt-IdNr. [DE…]
– nachfolgend „Verkäufer“ –

und

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], USt-IdNr. [DE…]
– nachfolgend „Käufer“ –

Vorbemerkung
Der Verkäufer vertreibt unter der Marke „[Marke]“ Produkte über den Amazon-Marktplatz im Programm „Versand durch Amazon“ (FBA) über das Verkäuferkonto [Anzeigename, Merchant-Token] auf den Marktplätzen [amazon.de, amazon.fr, …] (nachfolgend „FBA-Geschäft“). Der Verkäufer verkauft die zum FBA-Geschäft gehörenden Vermögensgegenstände und Rechte an den Käufer. Die Parteien wissen, dass die Übertragung des Verkäuferkontos den Bedingungen von Amazon unterliegt und Amazons Mitwirkung erfordert.

§ 1 Kaufgegenstand
(1) Der Verkäufer verkauft dem Käufer folgende Vermögensgegenstände und Rechte (nachfolgend „Assets“):
   a) die Marke „[Marke]“, eingetragen als [deutsche Marke Nr. [Nummer] beim DPMA / Unionsmarke Nr. [Nummer] beim EUIPO] für die Klassen [Nizza-Klassen], einschließlich der Eintragung in der Amazon Brand Registry,
   b) die in Anlage 1 aufgeführten Produkte mit ihren ASINs, SKUs, FNSKUs, EANs/GTINs (einschließlich GS1-Lizenz, soweit übertragbar), Listings, Produktbildern, A+-Inhalten, Brand-Store, Videos und Texten samt der daran bestehenden Nutzungsrechte,
   c) den Lagerbestand in den Amazon-Logistikzentren, im Transit (Inbound) und beim Lieferanten/Prep-Center gemäß Anlage 2,
   d) die Werkzeuge, Formen, Designs, Verpackungsentwürfe und Produktspezifikationen gemäß Anlage 3, auch soweit sie sich beim Lieferanten befinden,
   e) die Lieferantenbeziehungen gemäß Anlage 4 einschließlich Konditionen, Mindestmengen und laufender Bestellungen,
   f) die Domains [Liste], die Website [domain.de], die Social-Media-Konten [Liste] und die E-Mail-Liste nach Maßgabe des Datenschutzrechts,
   g) die Werbekampagnen (Amazon Ads), Keyword-Listen, Werbe- und Preishistorie, Verkaufsstatistiken sowie das Know-how zum Betrieb in dokumentierter Form,
   h) [Variante Kontoübertragung: das Verkäuferkonto [Merchant-Token] mit Verkäuferbewertungen, Account-Health-Historie, Lagerbestandsberichten und Steuereinstellungen, vorbehaltlich der Zustimmung von Amazon (§ 4)].
(2) Nicht verkauft werden Bankguthaben, Amazon-Auszahlungsansprüche für Zeiträume vor dem Stichtag, Forderungen und Verbindlichkeiten aus der Zeit vor dem Stichtag, Steueransprüche und sonstige Geschäftsaktivitäten des Verkäufers außerhalb des FBA-Geschäfts. Verbindlichkeiten werden nicht übernommen.

§ 2 Kaufpreis, Lagerbestand und Earn-out
(1) Der Kaufpreis für die Assets ohne Lagerbestand beträgt [Betrag] EUR (Grundkaufpreis). Hinzu kommt der Wert des Lagerbestands nach Absatz 3.
(2) Der Grundkaufpreis ist wie folgt fällig:
   a) [z. B. 60] % ([Betrag] EUR) am Stichtag Zug um Zug gegen Übergabe der Zugänge nach § 4 und Unterzeichnung der Markenübertragung nach § 5 auf [das Treuhandkonto [Escrow-Dienst / Notar] / das Konto [IBAN]],
   b) [z. B. 40] % ([Betrag] EUR) innerhalb von [z. B. 5] Werktagen, nachdem [Amazon den Inhaberwechsel des Verkäuferkontos bestätigt hat / die ASINs im Konto des Käufers aktiv und mit der Brand Registry des Käufers verknüpft sind], spätestens [z. B. 90] Tage nach dem Stichtag. Gelingt die Übertragung bis dahin aus Gründen, die keine Partei zu vertreten hat, nicht, [mindert sich diese Rate auf [Betrag] EUR / kann der Käufer vom Vertrag zurücktreten; bereits übertragene Assets werden zurückübertragen und gezahlte Beträge zurückerstattet].
(3) Der Lagerbestand wird zum Stichtag anhand der Amazon-Bestandsberichte (verfügbar, reserviert, Inbound) und der Bestätigung des Lieferanten/Prep-Centers gezählt und zu den in Anlage 2 je SKU vereinbarten Einstandspreisen (Einkaufspreis zuzüglich Fracht, Zoll und Einfuhrabgaben, ohne Umsatzsteuer) bewertet. Als nicht verkaufsfähig gemeldete, beschädigte oder ältere als [z. B. 12] Monate gelagerte Einheiten werden [nicht / mit [z. B. 50] % des Einstandspreises] bewertet. Der Bestandswert ist innerhalb von [z. B. 10] Tagen nach gemeinsamer Feststellung fällig.
(4) [Optional Earn-out: Übersteigt der mit den Assets erzielte Netto-Umsatz (Verkaufserlöse abzüglich Erstattungen und Umsatzsteuer) in den [12] Monaten nach dem Stichtag den Betrag von [Betrag] EUR, zahlt der Käufer zusätzlich [z. B. 20] % des übersteigenden Betrags, höchstens [Betrag] EUR. Der Käufer rechnet quartalsweise auf Basis der Amazon-Abrechnungsberichte ab und gewährt dem Verkäufer Einsicht in die relevanten Berichte. Der Käufer verpflichtet sich, das FBA-Geschäft im Earn-out-Zeitraum nach kaufmännischen Grundsätzen fortzuführen und die Produkte nicht ohne sachlichen Grund auszulisten.]
(5) Umsatzsteuer: Die Parteien gehen von einer nicht steuerbaren Geschäftsveräußerung im Ganzen (§ 1 Abs. 1a UStG) aus. Sollte die Finanzverwaltung dies anders beurteilen, schuldet der Käufer die Umsatzsteuer zusätzlich gegen Rechnung.

§ 3 Stichtag und Abgrenzung
(1) Stichtag ist der [Datum], 00:00 Uhr. Ab dem Stichtag stehen die Erlöse aus dem FBA-Geschäft dem Käufer zu und die Kosten (Amazon-Gebühren, Lagergebühren, Werbung, Erstattungen) gehen zu seinen Lasten.
(2) Erlöse, Gebühren, Erstattungen, Rücknahmen, A-bis-z-Garantieansprüche und Rückbuchungen, die sich auf Bestellungen vor dem Stichtag beziehen, sind dem Verkäufer zuzuordnen, auch wenn sie nach dem Stichtag gebucht werden. Die Parteien rechnen [60 / 90] Tage nach dem Stichtag auf Basis der Amazon-Transaktionsberichte ab; Salden sind innerhalb von 10 Tagen auszugleichen.
(3) Bei Kontoübertragung erhält der Verkäufer die Auszahlungen bis zum Stichtag; die Bankverbindung wird mit Wirkung zum Stichtag auf den Käufer geändert. Einbehalte und Rücklagen, die Amazon für Zeiträume vor dem Stichtag bildet, stehen nach Freigabe dem Verkäufer zu.
(4) Laufende Werbekampagnen werden zum Stichtag abgegrenzt; Amazon-Ads-Guthaben und offene Rechnungen werden zeitanteilig verrechnet.

§ 4 Übertragung des Seller-Kontos oder der Listings
(1) [Variante A – Kontoübertragung: Der Verkäufer beantragt gemeinsam mit dem Käufer innerhalb von [z. B. 3] Werktagen nach dem Stichtag beim Amazon Seller Support den Inhaberwechsel des Verkäuferkontos auf den Käufer. Der Käufer stellt alle von Amazon verlangten Nachweise (Unternehmensdaten, Ausweise der Vertretungsberechtigten, Bankverbindung, USt-IdNr., Steuerbescheinigungen) bereit. Die Parteien wissen, dass Amazon die Zustimmung verweigern kann; keine Partei garantiert die Zustimmung. Bis zur Bestätigung durch Amazon verwaltet der Käufer das Konto als Nutzer mit allen Rechten (Benutzerberechtigungen), und der Verkäufer unterlässt jede Änderung.]
(2) [Variante B – Übertragung der Listings: Der Verkäufer überträgt die ASINs auf das Verkäuferkonto des Käufers [Merchant-Token]. Dazu übergibt er bis zum Stichtag die vollständigen Listing-Daten (Flat Files), Bilder und A+-Inhalte, bestätigt gegenüber Amazon den Markeninhaberwechsel für die Brand Registry und erstellt für den Lagerbestand [einen Bestandstransfer / eine Rücksendung an das Prep-Center des Käufers mit anschließender Neueinlieferung]. Er beendet seine Angebote zu den ASINs erst, wenn die Angebote des Käufers aktiv sind, und stellt sicher, dass seine Angebote danach dauerhaft gelöscht bleiben.]
(3) Der Verkäufer übergibt am Stichtag alle Zugänge gemäß Anlage 5 (Seller Central, Amazon Ads, Brand Registry, Vendor-/Affiliate-Konten, Software-Tools, Lieferantenportale, E-Mail-Konten, Domains, Social Media) über einen sicheren Kanal. Der Käufer ändert alle Passwörter und Zwei-Faktor-Einstellungen unverzüglich.
(4) Der Verkäufer verpflichtet sich, nach dem Stichtag kein weiteres Verkäuferkonto zu eröffnen, das mit dem übertragenen Konto verknüpft werden könnte (Mehrfachkonten), und keine Maßnahmen zu ergreifen, die die Kontogesundheit beeinträchtigen.

§ 5 Marke, Brand Registry und Inhalte
(1) Der Verkäufer überträgt die Marke nach § 1 Abs. 1 lit. a mit allen Rechten an den Käufer (§ 27 MarkenG). Er unterzeichnet am Stichtag die Umschreibungserklärung für das [DPMA / EUIPO]; die Gebühren trägt der Käufer. Bis zur Eintragung der Umschreibung handelt der Verkäufer auf Weisung des Käufers und erhebt keine Ansprüche aus der Marke.
(2) Der Verkäufer veranlasst die Umschreibung bzw. Übertragung der Brand Registry auf das Konto des Käufers und benennt den Käufer als Markeninhaber und Administrator.
(3) An allen Produktbildern, Texten, A+-Inhalten, Videos, Verpackungsdesigns und Logos räumt der Verkäufer dem Käufer das ausschließliche, zeitlich, räumlich und inhaltlich unbeschränkte, übertragbare Nutzungsrecht ein, einschließlich des Rechts zur Bearbeitung. Er versichert, die Rechte von den jeweiligen Urhebern (Fotografen, Designer, Texter) erworben zu haben, und übergibt die zugehörigen Verträge und Rechnungen.
(4) Der Verkäufer darf die Marke und verwechselbare Zeichen nach dem Stichtag nicht mehr nutzen und meldet keine ähnlichen Marken oder Domains an.

§ 6 Lagerbestand bei Amazon und beim Lieferanten
(1) Der Lagerbestand bei Amazon geht mit Übertragung des Kontos bzw. mit Abschluss des Bestandstransfers in das Eigentum des Käufers über. Bestand im Transit (Inbound-Sendungen) ist in Anlage 2 mit Sendungs-ID und Menge aufgeführt und wird nach Wareneingang bei Amazon abgerechnet.
(2) Beim Lieferanten oder im Prep-Center lagernde Ware gemäß Anlage 2 wird durch Anweisung an den Lieferanten/Prep-Center übereignet; der Verkäufer veranlasst die schriftliche Bestätigung, dass die Ware ab Stichtag für den Käufer gehalten wird.
(3) Gefahrübergang für den Lagerbestand ist der Stichtag. Verluste und Beschädigungen im Amazon-Lager nach dem Stichtag trägt der Käufer; Amazon-Erstattungen hierfür stehen dem Käufer zu.
(4) Von Amazon als „nicht verkaufsfähig“ gemeldete Einheiten werden [vom Verkäufer vor dem Stichtag entsorgt bzw. zurückgeholt / dem Käufer unentgeltlich überlassen].

§ 7 Lieferanten und Produktkonformität
(1) Der Verkäufer stellt den Käufer innerhalb von [z. B. 7] Tagen nach dem Stichtag den in Anlage 4 genannten Lieferanten, Prep-Centern, Spediteuren und Zollagenten vor und übergibt alle Konditionen, Preislisten, Qualitätsvereinbarungen, Prüfberichte und die Kommunikationshistorie der letzten [z. B. 12] Monate.
(2) Werkzeuge, Formen und Designs beim Lieferanten (Anlage 3) sind Eigentum des Verkäufers und werden an den Käufer übereignet; der Verkäufer veranlasst die schriftliche Bestätigung des Lieferanten, dass diese künftig für den Käufer gehalten werden und nicht für Dritte verwendet werden.
(3) Laufende Bestellungen beim Lieferanten (Anlage 4) übernimmt der Käufer gegen Erstattung der vom Verkäufer bereits geleisteten Anzahlungen.
(4) Der Verkäufer übergibt die vollständige Konformitätsdokumentation je Produkt: Prüfberichte, Konformitätserklärungen, Sicherheitsdatenblätter, Kennzeichnungen, Registrierungen (LUCID/Verpackungsregister, WEEE/stiftung ear, Batterieregister, soweit einschlägig), Zolltarifnummern und Einfuhrdokumente. Verantwortlich für die Einhaltung der Produktvorschriften ab dem Stichtag ist der Käufer; er nimmt die erforderlichen Registrierungen auf seinen Namen vor.

§ 8 Garantien des Verkäufers
Der Verkäufer garantiert im Wege eines selbständigen Garantieversprechens, dass zum Stichtag
   a) er Inhaber der Assets ist und frei darüber verfügen kann; die Assets sind frei von Rechten Dritter; keine Marke, kein Design und kein Patent Dritter wird durch die Produkte oder Listings verletzt, und es liegen keine Beschwerden über Rechtsverletzungen (IP-Complaints), Abmahnungen oder Verfahren vor, außer: [Angabe],
   b) die in Anlage 6 dargestellten Umsätze, Erstattungen, Amazon-Gebühren, Werbekosten, Einkaufskosten und Gewinne der letzten [12 / 24] Monate je Marktplatz und ASIN zutreffend und vollständig sind und aus den Amazon-Berichten stammen,
   c) die Produktbewertungen, Rezensionen und Verkäuferbewertungen ausschließlich im Einklang mit den Amazon-Richtlinien gewonnen wurden; insbesondere wurden keine Bewertungen gekauft, keine Vergünstigungen gegen Bewertungen gewährt, keine Rezensionen von Verbundenen abgegeben und keine Wettbewerber-Listings manipuliert,
   d) das Verkäuferkonto keine Verwarnungen, Richtlinienverstöße, Kontosperren oder Auszahlungseinbehalte in den letzten [z. B. 24] Monaten hatte, außer: [Angabe], und kein weiteres mit dem Konto verbundenes Verkäuferkonto besteht,
   e) die Produkte den in der EU geltenden Produktvorschriften entsprechen und die Dokumentation nach § 7 Abs. 4 vollständig und zutreffend ist; es gab keine Rückrufe, Sicherheitsbeschwerden oder behördlichen Maßnahmen,
   f) die Lieferantenbeziehungen bestehen und ihm keine Absicht eines Lieferanten bekannt ist, die Belieferung einzustellen oder Konditionen wesentlich zu verschlechtern,
   g) alle Steuern des FBA-Geschäfts (insbesondere Umsatzsteuer in allen Marktplatzländern, OSS, Einfuhrumsatzsteuer, Zölle) bis zum Stichtag erklärt und gezahlt wurden oder vom Verkäufer gezahlt werden; es laufen keine Steuerprüfungen, außer: [Angabe],
   h) der Lagerbestand verkehrsfähig, originalverpackt und frei von Mängeln ist, soweit in Anlage 2 nichts anderes vermerkt ist.
Bei Verletzung einer Garantie stellt der Verkäufer den Käufer von Ansprüchen Dritter frei und ersetzt den Schaden; der Käufer zeigt die Verletzung innerhalb von [z. B. 18] Monaten nach dem Stichtag in Textform an. Die Haftung aus Garantien ist auf [den Grundkaufpreis] begrenzt, außer bei Vorsatz und Arglist.

§ 9 Übergangsphase und Einarbeitung
(1) Der Verkäufer unterstützt den Käufer für [z. B. 90] Tage nach dem Stichtag mit bis zu [z. B. 30] Stunden bei Kontoübertragung, Brand-Registry-Umschreibung, Lieferantenkommunikation, Werbekampagnen und Bestandsplanung. Diese Leistung ist mit dem Kaufpreis abgegolten; weitere Stunden werden mit [Betrag] EUR je Stunde vergütet.
(2) Der Verkäufer übergibt eine Prozessdokumentation (Anlage 7): Nachbestellrhythmus, Lieferzeiten, Prep-Anforderungen, Werbestruktur, Preisstrategie, Saisonalität und bekannte Risiken.
(3) Während der Übergangsphase verpflichten sich beide Parteien, keine Änderungen vorzunehmen, die die Kontogesundheit, das Ranking oder die Listings beeinträchtigen, ohne die andere Partei zu informieren.

§ 10 Wettbewerbsverbot
(1) Der Verkäufer verpflichtet sich, für [z. B. 24] Monate ab dem Stichtag keine Produkte der in Anlage 1 genannten Produktkategorien [Beschreibung] auf Amazon-Marktplätzen in der EU und im Vereinigten Königreich oder über andere Online-Kanäle in deutscher Sprache anzubieten, keine konkurrierende Marke aufzubauen und keine Kunden, Lieferanten oder Dienstleister des FBA-Geschäfts gezielt abzuwerben. Ausgenommen: [Angabe].
(2) Für jeden Verstoß zahlt der Verkäufer eine Vertragsstrafe von [Betrag] EUR; bei Dauerverstößen gilt jeder angefangene Monat als eigener Verstoß. Weitergehende Ansprüche bleiben unberührt; die Vertragsstrafe wird angerechnet.
(3) Das Wettbewerbsverbot gilt auch für die Gesellschafter und Geschäftsführer des Verkäufers, die diesen Vertrag mitunterzeichnen.

§ 11 Haftung
(1) Soweit in § 8 nichts anderes bestimmt ist, werden die Assets in dem Zustand verkauft, in dem sie sich am Stichtag befinden. Der Verkäufer übernimmt keine Gewähr für den künftigen wirtschaftlichen Erfolg, Rankings, Buy-Box-Anteile, Werbekosten, Amazon-Gebühren, Richtlinienänderungen durch Amazon oder den Fortbestand des Verkäuferkontos nach dem Stichtag, soweit der Grund nach dem Stichtag gesetzt wurde.
(2) Die Parteien haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden aus der Verletzung von Leben, Körper oder Gesundheit. Im Übrigen ist die Haftung auf den vorhersehbaren, vertragstypischen Schaden und auf die Höhe des Grundkaufpreises begrenzt.

§ 12 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; dies gilt auch für die Aufhebung dieser Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Die Parteien behandeln den Inhalt dieses Vertrags und die Zahlen des FBA-Geschäfts vertraulich.
(3) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt.
(4) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist [Ort], soweit beide Parteien Kaufleute sind.
(5) Anlagen: Anlage 1 – Produkte, ASINs und Listings; Anlage 2 – Lagerbestand und Einstandspreise; Anlage 3 – Werkzeuge, Formen, Designs; Anlage 4 – Lieferanten und offene Bestellungen; Anlage 5 – Zugänge; Anlage 6 – Umsatz- und Gewinnaufstellung; Anlage 7 – Prozessdokumentation. Die Anlagen sind Bestandteil dieses Vertrags.

[Ort], den [Datum]


______________________________
[Firma Verkäufer], vertreten durch [Vorname Nachname]


______________________________
[Firma Käufer], vertreten durch [Vorname Nachname]


______________________________
[Vorname Nachname], Gesellschafter/Geschäftsführer des Verkäufers, für das Wettbewerbsverbot nach § 10 Abs. 3

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "rahmenliefervertrag",
    titel: "Rahmenliefervertrag mit Lieferant / Hersteller",
    kurz: "Rahmenvertrag für wiederkehrende Warenlieferungen: Produkte, Preise und Preisanpassung, Einzelabrufe, Lieferfristen, Qualität und Muster, optionale Exklusivität, Laufzeit und Kündigung.",
    kategorie: "kauf",
    dateiname: "Rahmenliefervertrag",
    wofuer: [
      "Du beziehst regelmäßig Ware von einem Hersteller oder Großhändler und willst feste Konditionen statt Einzelverhandlung je Bestellung",
      "Du bist Hersteller oder Importeur und lieferst wiederkehrend an einen Händler oder Online-Shop",
      "Wenn Preise für eine Laufzeit gesichert und Preisanpassungen geregelt werden sollen",
      "Wenn Qualität über freigegebene Muster definiert und Exklusivität für ein Gebiet oder einen Kanal vereinbart werden soll",
    ],
    enthaelt: [
      "§ 1 Vertragsgegenstand und Produkte",
      "§ 2 Einzelabrufe und Bestellabwicklung",
      "§ 3 Preise, Preisanpassung und Zahlung",
      "§ 4 Lieferung, Lieferfristen und Gefahrübergang",
      "§ 5 Qualität, Muster und Produktkonformität",
      "§ 6 Untersuchung, Rüge und Gewährleistung",
      "§ 7 Exklusivität und Mindestabnahme (optional)",
      "§ 8 Eigentumsvorbehalt",
      "§ 9 Haftung und Produkthaftung",
      "§ 10 Geheimhaltung und Schutzrechte",
      "§ 11 Laufzeit und Kündigung",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Ein Rahmenvertrag verpflichtet für sich allein noch zu keiner Lieferung; erst der Einzelabruf ist der Kaufvertrag. Wer Planungssicherheit will, braucht Mindestabnahme- oder Mindestliefermengen mit Folgen bei Unterschreitung – die Vorlage sieht das als Option vor.",
      "Preisgleitklauseln müssen transparent sein: an einen objektiven Index (Rohstoff, Frachtindex, Energie) gekoppelt und beidseitig wirkend. Einseitige Preiserhöhungsrechte in Formularverträgen sind angreifbar.",
      "Exklusivität kann kartellrechtlich relevant sein (Vertikal-GVO): Alleinbezugspflichten über fünf Jahre und Beschränkungen des passiven Verkaufs oder des Online-Vertriebs sind problematisch. Bei Marktanteilen über 30 % Rat einholen.",
      "Als Importeur in die EU wirst du zum Inverkehrbringer mit Herstellerpflichten (Produktsicherheit, CE, GPSR-Angaben, Verpackungs- und Elektrogesetz). Lass dir vom Lieferanten die Konformitätsdokumente vertraglich zusichern.",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen Rahmenvertrag und Kaufvertrag?",
        a: "Der Rahmenvertrag legt die Bedingungen für alle künftigen Geschäfte fest: Produkte, Preise, Lieferfristen, Qualität, Haftung. Der einzelne Kaufvertrag kommt erst mit jedem Abruf zustande. Vorteil: Keine Nachverhandlung bei jeder Bestellung und keine AGB-Schlacht, weil der Rahmen Vorrang hat. Die Vorlage regelt ausdrücklich, dass abweichende AGB nicht gelten.",
      },
      {
        q: "Wie sichere ich mich als Käufer gegen Lieferausfälle ab?",
        a: "Durch verbindliche Lieferfristen mit Vertragsstrafe oder pauschaliertem Schadensersatz bei Verzug, eine Pflicht des Lieferanten zur frühzeitigen Information bei Engpässen, ein Recht zum Deckungskauf auf Kosten des Lieferanten und ein außerordentliches Kündigungsrecht bei wiederholten Verstößen. Die Vorlage enthält diese Bausteine; die Höhe der Pauschale solltest du mit dem Lieferanten verhandeln.",
      },
      {
        q: "Was bedeutet Freigabemuster (Golden Sample)?",
        a: "Ein Muster, das beide Seiten als Referenz für die vereinbarte Beschaffenheit abzeichnen. Jede spätere Lieferung muss diesem Muster entsprechen; Abweichungen sind Mängel. Das ist bei Private-Label-Ware, Verpackungen und Textilien der wirksamste Qualitätsmaßstab, weil Spezifikationen auf Papier selten alles erfassen.",
      },
      {
        q: "Kann ich den Rahmenvertrag jederzeit kündigen?",
        a: "Das hängt von der vereinbarten Laufzeit ab. Die Vorlage sieht eine feste Erstlaufzeit mit automatischer Verlängerung und ordentlicher Kündigungsfrist vor; die außerordentliche Kündigung aus wichtigem Grund bleibt immer möglich. Bereits abgerufene Lieferungen werden auch nach Kündigung noch abgewickelt.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Rahmenliefervertrag brauchst",
        text: "Sobald du regelmäßig beim selben Hersteller oder Großhändler bestellst, wird jede Einzelbestellung zur Verhandlung: Preis, Lieferzeit, Verpackung, Qualität, Haftung, und bei jeder Bestellung schickt der Lieferant seine AGB mit. Ein Rahmenliefervertrag beendet das. Er legt einmal die Bedingungen fest, und jeder Abruf wird ein Kaufvertrag zu diesen Bedingungen. Typische Fälle: Du lässt Private-Label-Ware produzieren, beziehst Verpackungen oder Rohstoffe, bist Importeur und belieferst Händler, oder du führst einen Online-Shop mit festen Lieferanten.\n\nDie Vorlage ist für beide Seiten gedacht, Lieferant und Abnehmer, und regelt Produkte und Preise, Einzelabrufe, Preisanpassung, Lieferfristen mit Verzugspauschale, Qualität über Freigabemuster, Konformität, Rügepflicht, optional Exklusivität und Mindestabnahme, Eigentumsvorbehalt, Produkthaftung, Geheimhaltung und Laufzeit. Für einen einmaligen Kauf reicht der B2B-Kaufvertrag; für Ware, die beim Händler Eigentum des Herstellers bleibt, der Kommissionsvertrag.",
      },
      {
        titel: "Was muss in einen Rahmenliefervertrag? Produkte, Abrufe, Preise, Qualität",
        text: "Ein Rahmenvertrag ohne Produktliste und ohne Abrufmechanik ist nur eine Absichtserklärung. Die Vorlage verlangt deshalb Anlage 1 mit Artikelnummer, Spezifikation, Verpackungseinheit, Mindestbestellmenge, Preis und Lieferzeit je Produkt und regelt:\n\n- Vorrang des Rahmenvertrags vor allen AGB (§ 1 Abs. 4)\n- Einzelabruf in Textform, Bestätigungsfrist, Annahmefiktion, Bedarfsvorschau, Frühwarnpflicht (§ 2)\n- Preisbindung, Anpassungsverlangen ab Kostenänderung oder Preisgleitklausel mit Index, Kündigungsrecht bei Nichteinigung, Mengenbonus, Zahlungsziel (§ 3)\n- verbindliche Liefertermine, Verzugspauschale, Deckungskauf, Gefahrübergang, Lieferschein, Verpackungsvorgaben, höhere Gewalt (§ 4)\n- Freigabemuster, Konformitätsnachweise, Änderungssperre, Qualitätssicherung, Audits, Private Label (§ 5)\n- Rügefristen, Nacherfüllung, Gewährleistungsfrist, Regress, Serienmängel (§ 6)\n- Gebiets- oder Kanalexklusivität, Mindestabnahme, Mindestliefermenge (§ 7)\n- Eigentumsvorbehalt mit Weiterverkaufsermächtigung (§ 8)\n- Haftungsgrenzen, Produkthaftungsfreistellung, Versicherung (§ 9)\n- Geheimhaltung, Schutzrechte, Werkzeuge (§ 10), Laufzeit, Kündigung, Auslaufphase (§ 11)",
      },
      {
        titel: "Rahmenliefervertrag Muster ausfüllen: Schritt für Schritt",
        text: "Erstelle zuerst Anlage 1 mit allen Produkten und Anlage 2 mit Verpackungs- und Kennzeichnungsvorgaben, etwa Kartonmaße, Palettierung und Barcodes. In der Vorbemerkung beschreibst du Produktgruppe und Vertriebsweg. In § 2 setzt du Bestätigungsfrist und Rhythmus der Bedarfsvorschau ein. In § 3 trägst du Lieferbedingung (ab Werk, frei Haus oder Incoterm), Dauer der Preisbindung und die Schwelle für Anpassungsverlangen ein; alternativ wählst du die Preisgleitklausel mit einem Index des Statistischen Bundesamts und einer Obergrenze je Anpassung. Nur eine der beiden Varianten bleibt stehen.\n\nIn § 4 legst du Verzugspauschale und Höchstgrenze fest und wer die Transportversicherung abschließt. In § 5 listest du die einschlägigen Vorschriften auf (CE, REACH, Lebensmittelrecht, Textilkennzeichnung) und streichst, was nicht passt; den Private-Label-Absatz behältst du, wenn unter deiner Marke produziert wird. In § 6 setzt du Rügefristen und Gewährleistungsdauer ein, in § 7 wählst du zwischen Exklusivität, Mindestabnahme und Mindestliefermenge oder streichst den Paragrafen. In § 9 Deckungssummen, in § 11 Erstlaufzeit, Verlängerung und Kündigungsfrist. Das Freigabemuster protokolliert ihr vor der ersten Lieferung in Anlage 3.",
      },
      {
        titel: "Typische Fehler im Rahmenvertrag und wie du sie vermeidest",
        text: "Erster Fehler: Der Rahmenvertrag soll Lieferpflicht erzeugen, enthält aber keine Mindestmengen. Ohne § 7 ist der Lieferant frei, Abrufe abzulehnen, und du bist frei, nichts zu bestellen; wer Planungssicherheit will, muss sie vereinbaren. Zweiter Fehler: Qualität nur über Worte definieren. Spezifikationen auf Papier erfassen selten Haptik, Farbe und Verarbeitung; das Freigabemuster aus § 5 ist der Maßstab, an dem jede Lieferung gemessen wird.\n\nDritter Fehler: Einseitige Preiserhöhungsklauseln. Ein Recht des Lieferanten, Preise nach Belieben anzuheben, ist in Formularverträgen angreifbar; die Vorlage koppelt Anpassungen an nachgewiesene Kostenänderungen oder einen Index und gibt beiden Seiten ein Kündigungsrecht. Vierter Fehler: Konformitätsdokumente erst nach dem Problem anfordern. Als Importeur oder Private-Label-Inhaber giltst du als Hersteller oder Inverkehrbringer; ohne Prüfberichte und Konformitätserklärung vor der ersten Lieferung trägst du das Risiko allein. Fünfter Fehler: Werkzeuge und Formen nicht sichern. Was du bezahlt hast, bleibt dein Eigentum nur, wenn es in § 10 steht und bei Vertragsende herausgegeben wird.",
      },
      {
        titel: "Rechtliche Grundlagen: Kaufrecht, § 377 HGB, Regress, Kartellrecht, Produktsicherheit",
        text: "Der Rahmenvertrag selbst ist ein Vertrag eigener Art; jeder Einzelabruf ist ein Kaufvertrag nach §§ 433 ff. BGB, auf den die Rahmenbedingungen anwendbar sind. Zwischen Kaufleuten gilt die Untersuchungs- und Rügepflicht des § 377 HGB, die die Vorlage wegen des Qualitätssicherungssystems des Lieferanten auf Stichproben beschränkt. Die Gewährleistungsfrist beträgt nach § 438 BGB zwei Jahre; verkaufst du an Verbraucher weiter, sichern §§ 445a, 445b und 478 BGB deinen Rückgriff gegen den Lieferanten, deshalb lässt die Vorlage diesen Regress unberührt.\n\nExklusivitäts- und Mindestabnahmeklauseln sind vertikale Vereinbarungen, die unter das Kartellrecht fallen. Nach der Vertikal-Gruppenfreistellungsverordnung sind Alleinbezugspflichten über fünf Jahre und Verbote des passiven Verkaufs oder des Online-Vertriebs problematisch; deshalb lässt die Vorlage passive Verkäufe zu. Produktsicherheitsrechtlich muss die Ware der Allgemeinen Produktsicherheitsverordnung und den produktspezifischen Vorschriften entsprechen; wer Ware aus Drittstaaten einführt, wird Importeur mit Herstellerpflichten. Der verlängerte Eigentumsvorbehalt nach § 449 BGB mit Vorausabtretung ist im Handel üblich; die Freigabeklausel bei Übersicherung macht ihn wirksam. Eine Form ist nicht vorgeschrieben.",
      },
      {
        titel: "Wann die Rahmenvertrag-Vorlage nicht reicht",
        text: "Sitzt der Lieferant außerhalb Deutschlands, musst du Rechtswahl, Gerichtsstand oder Schiedsklausel, Incoterms, Zahlungsabsicherung (Akkreditiv, Anzahlung gegen Inspektion) und die Importeurspflichten regeln; die Vorlage geht von deutschem Recht und Ausschluss des UN-Kaufrechts aus, was ein ausländischer Lieferant nicht immer akzeptiert. Bei Lieferanten in China sind zusätzlich Qualitätsinspektionen vor Verschiffung und der Schutz deiner Designs im Produktionsland Thema.\n\nBei Marktanteilen über 30 Prozent oder Exklusivität über fünf Jahre sollte ein Kartellrechtler § 7 prüfen. Bei Lebensmitteln, Kosmetik, Medizinprodukten und Spielzeug gelten Zulassungs- und Dokumentationspflichten, die in Anlage 4 konkret benannt werden müssen. Soll der Lieferant nach deinen Entwürfen entwickeln, brauchst du zusätzlich Regeln zu Entwicklungskosten und zum Eigentum an den Ergebnissen. GründerX stellt Software und Muster bereit und ersetzt keine Rechtsberatung; bei hohen Jahresvolumina lohnt die anwaltliche Prüfung vor Unterschrift.",
      },
    ],
    seo: {
      title: "Rahmenliefervertrag Vorlage kostenlos (Word) | GründerX",
      description:
        "Rahmenliefervertrag mit Lieferant oder Hersteller: Produkte, Preisanpassung, Einzelabrufe, Lieferfristen, Muster, Exklusivität, Laufzeit, Kündigung.",
    },
    stand: "2026-10",
    text: `Rahmenliefervertrag

zwischen

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], USt-IdNr. [DE…]
– nachfolgend „Lieferant“ –

und

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], USt-IdNr. [DE…]
– nachfolgend „Abnehmer“ –

Vorbemerkung
Der Lieferant stellt her bzw. vertreibt [Produktgruppe]. Der Abnehmer vertreibt diese Produkte [im Einzelhandel / über seinen Online-Shop / unter eigener Marke]. Die Parteien wollen ihre Geschäftsbeziehung durch diesen Rahmenvertrag regeln, der für alle während seiner Laufzeit geschlossenen Einzelverträge gilt.

§ 1 Vertragsgegenstand und Produkte
(1) Dieser Vertrag regelt die Bedingungen, zu denen der Lieferant dem Abnehmer die in Anlage 1 aufgeführten Produkte (nachfolgend „Produkte“) liefert. Anlage 1 enthält je Produkt: Artikelnummer, Bezeichnung, Spezifikation, Verpackungseinheit, Mindestbestellmenge, Preis und Lieferzeit.
(2) Dieser Rahmenvertrag begründet für sich allein keine Abnahme- oder Lieferpflicht; Kaufverträge kommen erst durch Einzelabrufe nach § 2 zustande. [Mindestmengen regelt § 7.]
(3) Die Parteien können Anlage 1 jederzeit einvernehmlich in Textform ergänzen oder ändern. Neue Produkte werden durch eine von beiden Seiten bestätigte Ergänzung aufgenommen.
(4) Für alle Einzelabrufe gelten ausschließlich die Bestimmungen dieses Rahmenvertrags. Allgemeine Geschäftsbedingungen einer Partei finden keine Anwendung, auch wenn ihnen im Einzelfall nicht widersprochen wird.

§ 2 Einzelabrufe und Bestellabwicklung
(1) Der Abnehmer bestellt durch Einzelabruf in Textform (E-Mail, Bestellportal, EDI) unter Angabe von Artikelnummer, Menge, Lieferadresse und gewünschtem Liefertermin.
(2) Der Lieferant bestätigt den Abruf innerhalb von [z. B. 2] Werktagen in Textform mit verbindlichem Liefertermin. Bestätigt er nicht innerhalb dieser Frist, gilt der Abruf als zu den Bedingungen des Rahmenvertrags und mit der in Anlage 1 genannten Lieferzeit angenommen. Weicht die Bestätigung vom Abruf ab, kommt der Vertrag nur zustande, wenn der Abnehmer der Abweichung in Textform zustimmt.
(3) Der Abnehmer übermittelt dem Lieferanten [monatlich / quartalsweise] eine unverbindliche Bedarfsvorschau für die folgenden [z. B. 3] Monate. Der Lieferant hält für die vorgesehenen Mengen Kapazitäten und Vormaterial bereit.
(4) Der Lieferant informiert den Abnehmer unverzüglich, wenn absehbar ist, dass ein Liefertermin nicht eingehalten werden kann oder Rohstoffe, Vormaterialien oder Produkte knapp werden.

§ 3 Preise, Preisanpassung und Zahlung
(1) Es gelten die in Anlage 1 vereinbarten Preise in EUR netto zuzüglich der gesetzlichen Umsatzsteuer, [ab Werk / frei Haus Lieferadresse des Abnehmers / gemäß Incoterms 2020 [Klausel, Ort]]. Verpackung ist im Preis enthalten.
(2) Die Preise sind für die Dauer von [z. B. 12] Monaten ab Vertragsbeginn fest. Danach kann jede Partei eine Anpassung verlangen, wenn sich [die Kosten für Rohstoffe, Energie, Fracht oder Löhne] nachweislich um mehr als [z. B. 5] % gegenüber dem Stand bei Vertragsschluss verändert haben. [Alternative Preisgleitklausel: Die Preise ändern sich jeweils zum 1. Januar und 1. Juli im Verhältnis der Veränderung des Index [z. B. Erzeugerpreisindex gewerblicher Produkte, Statistisches Bundesamt, Position [Nummer]] gegenüber dem Stand bei Vertragsschluss, jedoch höchstens um [z. B. 8] % je Anpassung.] Die anpassende Partei legt die Kostenentwicklung offen. Die Anpassung gilt für Abrufe, die nach Ablauf von [z. B. 6] Wochen nach Zugang des Anpassungsverlangens erfolgen.
(3) Kommt bei einem Anpassungsverlangen innerhalb von [z. B. 4] Wochen keine Einigung zustande, kann jede Partei den Rahmenvertrag mit einer Frist von [z. B. 3] Monaten kündigen; bis dahin gelten die bisherigen Preise.
(4) [Optional: Der Abnehmer erhält auf die Preise nach Anlage 1 einen Mengenrabatt von [z. B. 3] % ab einem Jahresumsatz von [Betrag] EUR netto und [z. B. 5] % ab [Betrag] EUR, abgerechnet als Bonus zum Jahresende.]
(5) Rechnungen sind innerhalb von [z. B. 30] Tagen nach Rechnungsdatum und Lieferung ohne Abzug zahlbar [bzw. innerhalb von [z. B. 10] Tagen mit [z. B. 2] % Skonto]. Bei Zahlungsverzug gelten Verzugszinsen von 9 Prozentpunkten über dem Basiszinssatz (§ 288 Abs. 2 BGB).
(6) Der Abnehmer darf nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen aufrechnen; Zurückbehaltungsrechte wegen Mängeln bleiben unberührt.

§ 4 Lieferung, Lieferfristen und Gefahrübergang
(1) Die Lieferzeit je Produkt ergibt sich aus Anlage 1 und beginnt mit Zugang der Bestätigung des Abrufs. Bestätigte Liefertermine sind verbindlich.
(2) Bei Überschreitung eines verbindlichen Liefertermins, die der Lieferant zu vertreten hat, schuldet er ab dem [z. B. 3.] Werktag der Verspätung einen pauschalierten Verzugsschaden von [z. B. 0,5] % des Netto-Auftragswerts der verspäteten Lieferung je angefangene Woche, höchstens [z. B. 5] %. Der Nachweis eines geringeren oder höheren Schadens bleibt beiden Parteien vorbehalten. Nach fruchtlosem Ablauf einer Nachfrist von [z. B. 10] Werktagen kann der Abnehmer vom betroffenen Einzelabruf zurücktreten und einen Deckungskauf vornehmen; Mehrkosten trägt der Lieferant.
(3) Die Gefahr geht [mit Übergabe an den ersten Frachtführer / mit Ablieferung an der Lieferadresse] auf den Abnehmer über. Transportversicherung schließt [der Lieferant / der Abnehmer] ab.
(4) Teillieferungen sind nur mit Zustimmung des Abnehmers zulässig. Jeder Lieferung ist ein Lieferschein mit Abrufnummer, Artikelnummern, Mengen, Chargen und [MHD] beizufügen.
(5) Verpackung: Der Lieferant verpackt transportsicher und gemäß den Verpackungsvorgaben in Anlage 2 (Kartonmaße, Palettierung, Etikettierung, Barcodes). Er ist für die in Verkehr gebrachten Verpackungen nach dem Verpackungsgesetz systembeteiligt, soweit er als Erstinverkehrbringer gilt; [bei Import durch den Abnehmer übernimmt der Abnehmer die Systembeteiligung].
(6) Höhere Gewalt befreit die betroffene Partei für die Dauer der Störung von ihren Leistungspflichten; sie hat die andere Partei unverzüglich zu informieren. Dauert die Störung länger als [z. B. 3] Monate, kann jede Partei die betroffenen Abrufe aufheben.

§ 5 Qualität, Muster und Produktkonformität
(1) Die Produkte müssen der Spezifikation in Anlage 1, den von beiden Parteien freigegebenen Mustern (Freigabemuster, Anlage 3) und den in Deutschland und der EU geltenden gesetzlichen Anforderungen entsprechen, insbesondere dem Produktsicherheitsrecht, der Allgemeinen Produktsicherheitsverordnung (GPSR), [der CE-Kennzeichnungspflicht, REACH, RoHS, Lebensmittelrecht, Textilkennzeichnungsverordnung, Spielzeugrichtlinie].
(2) Der Lieferant stellt vor der ersten Lieferung eines Produkts und auf Verlangen bei jeder Änderung Konformitätsnachweise bereit: [Konformitätserklärung, Prüfberichte akkreditierter Labore, Sicherheitsdatenblätter, technische Dokumentation, Herstellerangaben nach GPSR]. Änderungen an Rezeptur, Material, Konstruktion, Produktionsstandort oder Verpackung bedürfen der vorherigen Zustimmung des Abnehmers in Textform.
(3) Der Lieferant unterhält ein Qualitätssicherungssystem [nach ISO 9001 oder vergleichbar] und führt Chargendokumentation, die Rückverfolgbarkeit über [z. B. 5] Jahre ermöglicht. Der Abnehmer darf nach Ankündigung mit [z. B. 10] Werktagen Frist Audits beim Lieferanten und dessen Unterlieferanten durchführen.
(4) [Private Label: Der Lieferant produziert die Produkte unter der Marke des Abnehmers gemäß den Design- und Verpackungsvorgaben in Anlage 2. Er darf diese Produkte in dieser Aufmachung nicht an Dritte liefern und die Marke des Abnehmers nicht anderweitig nutzen.]

§ 6 Untersuchung, Rüge und Gewährleistung
(1) Der Abnehmer untersucht die Lieferung nach Eingang stichprobenartig auf Identität, Menge, Transportschäden und offensichtliche Mängel und rügt erkennbare Mängel innerhalb von [z. B. 10] Werktagen nach Eingang, verdeckte Mängel innerhalb von [z. B. 10] Werktagen nach Entdeckung in Textform (§ 377 HGB). Eine weitergehende Untersuchungspflicht besteht angesichts des Qualitätssicherungssystems des Lieferanten nicht.
(2) Bei Mängeln kann der Abnehmer nach seiner Wahl Nachbesserung oder Ersatzlieferung verlangen. Der Lieferant holt mangelhafte Ware auf eigene Kosten ab. Schlägt die Nacherfüllung fehl oder ist sie wegen Dringlichkeit unzumutbar, kann der Abnehmer mindern, vom betroffenen Abruf zurücktreten, den Mangel selbst beseitigen lassen und Ersatz der erforderlichen Aufwendungen verlangen oder Schadensersatz verlangen.
(3) Die Gewährleistungsfrist beträgt [24] Monate ab Ablieferung. Für Produkte, die der Abnehmer an Verbraucher weiterverkauft, bleiben die Regressansprüche nach §§ 445a, 445b, 478 BGB unberührt.
(4) Bei Serienmängeln (mehr als [z. B. 3] % einer Charge mangelhaft) kann der Abnehmer die gesamte Charge zurückweisen und Ersatzlieferung verlangen. Der Lieferant trägt die Kosten einer notwendigen Sortierung, Rückholung aus dem Handel und, bei Sicherheitsmängeln, eines Rückrufs.

§ 7 Exklusivität und Mindestabnahme (optional)
(1) [Variante Gebiets-/Kanalexklusivität: Der Lieferant verpflichtet sich, die Produkte während der Laufzeit dieses Vertrags im Gebiet [Deutschland, Österreich, Schweiz] [bzw. im Vertriebskanal [Online-Marktplätze / Fachhandel]] ausschließlich an den Abnehmer zu liefern und keine Dritten zu beliefern, die erkennbar in dieses Gebiet bzw. diesen Kanal liefern. Passive Verkäufe des Lieferanten an Kunden, die unaufgefordert an ihn herantreten, bleiben zulässig, soweit kartellrechtlich geboten.]
(2) [Variante Mindestabnahme: Im Gegenzug verpflichtet sich der Abnehmer, je Vertragsjahr Produkte im Wert von mindestens [Betrag] EUR netto abzurufen. Unterschreitet er diese Menge, kann der Lieferant die Exklusivität für das folgende Vertragsjahr aufheben [oder eine Ausgleichszahlung in Höhe von [z. B. 10] % der Differenz verlangen].]
(3) [Variante Mindestliefermenge: Der Lieferant hält je Monat eine Lieferkapazität von mindestens [Menge] Einheiten für den Abnehmer bereit.]
(4) Beide Parteien bestätigen, dass sie die kartellrechtliche Zulässigkeit der Exklusivität geprüft haben; sollte eine Regelung kartellrechtlich unzulässig sein, gilt sie in dem zulässigen Umfang.

§ 8 Eigentumsvorbehalt
(1) Gelieferte Produkte bleiben bis zur vollständigen Zahlung der jeweiligen Rechnung Eigentum des Lieferanten (einfacher Eigentumsvorbehalt).
(2) Der Abnehmer darf die Vorbehaltsware im ordnungsgemäßen Geschäftsgang weiterveräußern und verarbeiten; er tritt die daraus entstehenden Forderungen in Höhe des offenen Rechnungsbetrags an den Lieferanten ab, der die Abtretung annimmt. Der Abnehmer bleibt zur Einziehung berechtigt, solange er nicht in Zahlungsverzug ist. Übersteigt der Wert der Sicherheiten die gesicherten Forderungen um mehr als 10 %, gibt der Lieferant auf Verlangen Sicherheiten nach seiner Wahl frei.

§ 9 Haftung und Produkthaftung
(1) Die Parteien haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit, für Schäden aus der Verletzung von Leben, Körper oder Gesundheit, nach dem Produkthaftungsgesetz und im Umfang übernommener Garantien.
(2) Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt, höchstens auf [Betrag] EUR je Schadensfall und [Betrag] EUR je Vertragsjahr. Im Übrigen ist die Haftung für leichte Fahrlässigkeit ausgeschlossen.
(3) Der Lieferant stellt den Abnehmer von Ansprüchen Dritter aus Produkthaftung frei, soweit der Schaden durch einen Fehler des Produkts verursacht wurde, der im Verantwortungsbereich des Lieferanten liegt, und ersetzt die Kosten eines erforderlichen Rückrufs oder einer Warnaktion, soweit der Abnehmer ihn vorab informiert und abgestimmt hat.
(4) Der Lieferant unterhält eine Betriebs- und Produkthaftpflichtversicherung mit einer Deckungssumme von mindestens [Betrag] EUR je Schadensfall einschließlich [erweiterter Produkthaftpflicht und Rückrufkosten] und weist diese auf Verlangen nach.

§ 10 Geheimhaltung und Schutzrechte
(1) Die Parteien behandeln alle im Rahmen der Zusammenarbeit erlangten Informationen über Preise, Mengen, Kunden, Lieferanten, Rezepturen, Designs und Geschäftsprozesse vertraulich und verwenden sie nur zur Durchführung dieses Vertrags. Die Pflicht gilt [z. B. 3] Jahre über das Vertragsende hinaus.
(2) Vom Abnehmer bereitgestellte Designs, Marken, Spezifikationen, Werkzeuge und Formen bleiben dessen Eigentum bzw. stehen ihm zu; der Lieferant darf sie nur für Lieferungen an den Abnehmer nutzen und gibt sie bei Vertragsende heraus.
(3) Der Lieferant sichert zu, dass die Produkte in der gelieferten Form keine Schutzrechte Dritter in [Deutschland / der EU] verletzen, und stellt den Abnehmer von Ansprüchen Dritter insoweit frei. Dies gilt nicht für Vorgaben, die der Abnehmer gemacht hat.

§ 11 Laufzeit und Kündigung
(1) Der Vertrag beginnt am [Datum] und läuft zunächst bis zum [Datum] (Erstlaufzeit). Er verlängert sich jeweils um [12] Monate, wenn er nicht mit einer Frist von [z. B. 3] Monaten zum Ende der jeweiligen Laufzeit in Schriftform gekündigt wird.
(2) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Ein wichtiger Grund liegt insbesondere vor bei wiederholten Lieferverzögerungen oder Qualitätsmängeln trotz Abmahnung, bei Zahlungsverzug mit mehr als [z. B. 2] Rechnungen trotz Mahnung, bei Verstoß gegen § 7 oder § 10 sowie bei Antrag auf Eröffnung des Insolvenzverfahrens über das Vermögen der anderen Partei.
(3) Zum Zeitpunkt der Beendigung bereits bestätigte Einzelabrufe werden zu den Bedingungen dieses Vertrags abgewickelt. Der Lieferant liefert auf Verlangen des Abnehmers für [z. B. 6] Monate nach Vertragsende Ersatzteile bzw. Nachbestellungen zu den zuletzt gültigen Preisen (Auslaufphase), soweit der Vertrag nicht wegen eines vom Abnehmer zu vertretenden Grundes beendet wurde.
(4) Mit Vertragsende gibt der Lieferant Werkzeuge, Formen, Unterlagen und Marken-Materialien des Abnehmers heraus und stellt die Nutzung der Marke des Abnehmers ein.

§ 12 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; dies gilt auch für die Aufhebung dieser Klausel. Einzelabrufe, Bestätigungen und Änderungen der Anlage 1 können in Textform erfolgen.
(2) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt.
(3) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist [Ort]. Erfüllungsort für Lieferungen ist [Ort].
(4) Anlagen: Anlage 1 – Produkt- und Preisliste; Anlage 2 – Verpackungs- und Kennzeichnungsvorgaben; Anlage 3 – Freigabemuster (Protokoll); Anlage 4 – Konformitätsdokumente. Die Anlagen sind Bestandteil dieses Vertrags.

[Ort], den [Datum]


______________________________
[Firma Lieferant], vertreten durch [Vorname Nachname]


______________________________
[Firma Abnehmer], vertreten durch [Vorname Nachname]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "kommissionsvertrag",
    titel: "Kommissionsvertrag",
    kurz: "Kommissionsvertrag nach §§ 383 ff. HGB: Kommissionsware, Provision, Abrechnung, Eigentum bleibt beim Kommittenten, Rückgabe, Haftung und Laufzeit.",
    kategorie: "kauf",
    dateiname: "Kommissionsvertrag",
    wofuer: [
      "Du gibst Ware in ein Ladengeschäft, einen Concept Store oder an einen Online-Händler, der sie in eigenem Namen für dich verkauft",
      "Du nimmst als Händler Ware von Marken, Designern oder Herstellern in Kommission, ohne sie vorab zu kaufen",
      "Wenn die Ware bis zum Verkauf im Eigentum des Herstellers bleiben soll und nur verkaufte Stücke abgerechnet werden",
      "Wenn Provision, Abrechnungsrhythmus, Rückgabe unverkaufter Ware und Haftung für Verlust klar geregelt sein müssen",
    ],
    enthaelt: [
      "§ 1 Vertragsgegenstand und Kommissionsware",
      "§ 2 Pflichten des Kommissionärs",
      "§ 3 Verkaufspreise und Weisungen",
      "§ 4 Provision",
      "§ 5 Abrechnung und Auszahlung",
      "§ 6 Eigentum und Herausgabe",
      "§ 7 Lieferung, Lagerung, Rückgabe",
      "§ 8 Haftung für Verlust und Beschädigung",
      "§ 9 Gewährleistung gegenüber Kunden",
      "§ 10 Laufzeit und Kündigung",
      "§ 11 Schlussbestimmungen",
    ],
    hinweise: [
      "Beim Kommissionsgeschäft verkauft der Kommissionär im eigenen Namen, aber für fremde Rechnung (§ 383 HGB). Gegenüber dem Endkunden ist er Verkäufer mit allen Gewährleistungspflichten; im Innenverhältnis trägt der Kommittent das Absatzrisiko. Die Vorlage regelt, wer Gewährleistungskosten am Ende trägt.",
      "Die Ware bleibt Eigentum des Kommittenten, bis sie an den Kunden verkauft ist. Das schützt in der Insolvenz des Händlers (Aussonderung) – aber nur, wenn die Ware eindeutig als Kommissionsware gekennzeichnet und in Listen geführt wird.",
      "Umsatzsteuerlich gilt die Lieferung an den Kommissionär erst mit dem Verkauf an den Kunden als ausgeführt (Kommissionsgeschäft, § 3 Abs. 3 UStG). Der Kommissionär rechnet dem Kommittenten per Gutschrift ab; das Verfahren mit dem Steuerberater abstimmen.",
      "Der Kommissionär hat gesetzlich ein Pfandrecht an der Kommissionsware für seine Provision und Aufwendungen (§ 397 HGB). Wer das als Kommittent nicht will, muss es ausdrücklich ausschließen – die Vorlage sieht das vor.",
    ],
    faqs: [
      {
        q: "Was unterscheidet Kommission von Konsignation und vom normalen Kauf?",
        a: "Beim Kauf erwirbt der Händler die Ware und trägt das Absatzrisiko. Bei der Kommission bleibt die Ware Eigentum des Herstellers; der Händler verkauft sie im eigenen Namen und bekommt eine Provision, unverkaufte Ware geht zurück. Das Konsignationslager ist eine Variante, bei der der Abnehmer die Ware erst bei Entnahme kauft; dort wird der Abnehmer selbst Eigentümer, bei der Kommission nie.",
      },
      {
        q: "Wer haftet, wenn Kommissionsware im Laden gestohlen oder beschädigt wird?",
        a: "Gesetzlich haftet der Kommissionär für die Sorgfalt eines ordentlichen Kaufmanns (§ 384 HGB); zufälligen Untergang trägt grundsätzlich der Eigentümer, also der Kommittent. Die Vorlage überträgt die Gefahr für Verlust, Diebstahl und Beschädigung ab Übernahme auf den Kommissionär und verpflichtet ihn zur Versicherung, denn er hat die Ware unter Kontrolle.",
      },
      {
        q: "Wie wird abgerechnet?",
        a: "Der Kommissionär erstellt in festen Abständen, in der Vorlage monatlich, eine Verkaufsliste mit allen verkauften Stücken, Verkaufspreisen und einbehaltener Provision und zahlt den Erlös abzüglich Provision aus. Umsatzsteuerlich erfolgt die Abrechnung per Gutschrift. Der Kommittent darf die Abrechnung durch Einsicht in die Verkaufsaufzeichnungen prüfen.",
      },
      {
        q: "Darf der Kommissionär die Ware billiger verkaufen als vereinbart?",
        a: "Nein, nicht ohne Zustimmung. Unterschreitet er den vorgegebenen Mindestpreis, muss er dem Kommittenten die Differenz ersetzen (§ 386 HGB). Die Vorlage sieht einen vom Kommittenten festgelegten Verkaufspreis bzw. Mindestpreis und eine Regelung für Rabattaktionen vor.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Kommissionsvertrag brauchst",
        text: "Kommission ist der klassische Weg, Ware in den Handel zu bringen, ohne dass der Händler sie vorab bezahlt: Du stellst als Designerin deine Keramik in einen Concept Store, gibst deine Naturkosmetik in eine Boutique oder lässt deine Produkte von einem Online-Händler verkaufen, der nur die verkauften Stücke abrechnet. Umgekehrt nimmst du als Ladeninhaber Ware junger Marken in Kommission, weil du das Absatzrisiko nicht tragen willst. Der Händler verkauft im eigenen Namen, die Ware bleibt bis zum Verkauf Eigentum des Herstellers.\n\nDiese Vorlage regelt die Verkaufskommission nach §§ 383 ff. HGB zwischen Kommittent (Hersteller) und Kommissionär (Händler): Kommissionsware und Kennzeichnung, Pflichten des Händlers, Preise und Weisungen, Provision, monatliche Abrechnung im Gutschriftverfahren, Eigentum und Herausgabe, Rückgabe unverkaufter Ware, Haftung für Verlust, Gewährleistung gegenüber Kunden und Laufzeit. Kauft der Händler die Ware selbst, brauchst du stattdessen den Rahmenliefervertrag oder einen Kaufvertrag.",
      },
      {
        titel: "Was muss in einen Kommissionsvertrag? Ware, Provision, Abrechnung, Eigentum",
        text: "Beim Kommissionsgeschäft treffen zwei Eigentümer-Verhältnisse aufeinander: Der Händler hat die Ware, der Hersteller das Eigentum. Der Vertrag muss das sichtbar und beweisbar machen. Die Vorlage regelt:\n\n- Kommissionswarenliste mit Artikel, Menge, Verkaufspreis und Einlieferungsdatum, Nachlieferung per Lieferschein, Ausschluss oder Zulassung des Selbsteintritts (§ 1)\n- Sorgfalt, Kennzeichnung als Eigentum des Kommittenten, getrennte Führung, Aufzeichnungen, Einsichtsrecht, Informationspflichten, Verbot der Weitergabe (§ 2)\n- Verkaufspreise, Preisänderung, Rabatte nur mit Zustimmung, Differenzersatz bei Unterschreitung (§ 3)\n- Provision in Prozent des Nettoverkaufspreises, Entstehung bei Zahlung, Entfall bei Rückgabe, Abgeltung der Aufwendungen, optionale Platzierungspauschale (§ 4)\n- Abrechnungsrhythmus, Inhalt der Abrechnung, Gutschriftverfahren, Auszahlungsfrist, Treuhand und Sicherungsabtretung der Kundenforderungen (§ 5)\n- Eigentum bis zum Verkauf, Ausschluss des Pfandrechts, Herausgabeanspruch, Aussonderung in der Insolvenz (§ 6)\n- Lieferung, Lagerung, Rückgabe nach Verweildauer, beschädigte Ware, Saisonware (§ 7)\n- Gefahrtragung des Händlers, Versicherung, Haftungsgrenzen (§ 8)\n- Gewährleistung gegenüber Kunden und Kostentragung im Innenverhältnis (§ 9)\n- Laufzeit, Kündigung, Rückgabe und Schlussabrechnung (§ 10)",
      },
      {
        titel: "Kommissionsvertrag Muster ausfüllen: Schritt für Schritt",
        text: "Lege zuerst Anlage 1 an: jeder Artikel mit Artikelnummer, Menge, dem vom Kommittenten festgelegten Bruttoverkaufspreis, dem Einstandswert für Schadensfälle und dem Einlieferungsdatum. In der Vorbemerkung beschreibst du Produkte und Verkaufsstelle, in § 1 Abs. 1 die zugelassenen Kanäle (Laden, Online-Shop, Markt). In Absatz 4 entscheidest du, ob der Händler die Ware selbst kaufen darf (Selbsteintritt). In § 2 Abs. 1 trägst du Mindestpräsentationsfläche oder Kategorieseite ein, in Absatz 3 die Ankündigungsfrist für Bestandsprüfungen.\n\nIn § 3 setzt du die Frist für Preisänderungen und wählst, ob der Händler eigenständig bis zu einem Prozentsatz rabattieren darf. In § 4 trägst du den Provisionssatz ein; üblich im stationären Handel sind 30 bis 50 Prozent, bei Online-Händlern oft weniger, aber die Zahl ist Verhandlungssache. Entscheide, wer Versandkosten trägt, und ob eine Platzierungspauschale gilt. In § 5 legst du Abrechnungsrhythmus, Auszahlungsfrist und IBAN fest, in § 6 Abs. 2 ob das Pfandrecht ausgeschlossen oder beschränkt wird. In § 7 die Verweildauer bis zur Rückgabe und wer die Rücksendekosten trägt, in § 8 die Ersatzgrundlage bei Verlust, in § 10 Kündigungsfrist und frühester Termin.",
      },
      {
        titel: "Typische Fehler bei Kommissionsware und wie du sie vermeidest",
        text: "Erster Fehler: Die Ware ist nicht als Kommissionsware gekennzeichnet. Geht der Händler in die Insolvenz, musst du dein Eigentum beweisen; ohne Kennzeichnung, Lieferscheine und getrennte Listen wird deine Ware zur Masse. Die Vorlage verpflichtet den Händler in § 2 Abs. 2 und 3 dazu, du musst es kontrollieren. Zweiter Fehler: Keine Abrechnungsdisziplin. Monatelang keine Abrechnung bedeutet, dass Erlöse auf dem Konto des Händlers liegen und bei Zahlungsschwierigkeiten weg sind; die Treuhandregel in § 5 Abs. 3 hilft nur, wenn du Abrechnungen einforderst und bei Verzug kündigst.\n\nDritter Fehler: Händler rabattiert eigenmächtig. Das mindert deinen Erlös und kann Preisstrategien bei anderen Händlern zerstören; § 3 verlangt Zustimmung und regelt den Differenzersatz. Vierter Fehler: Beschädigte Rückgaben akzeptieren. Vereinbare in § 7 Abs. 4, dass verschmutzte oder unverpackte Rückware abgerechnet wird. Fünfter Fehler: Umsatzsteuer falsch abwickeln. Beim Kommissionsgeschäft gilt die Lieferung an den Händler erst mit dem Verkauf an den Kunden als ausgeführt; die Abrechnung läuft per Gutschrift, und ein Kleinunternehmer-Status des Kommittenten muss dem Händler bekannt sein.",
      },
      {
        titel: "Rechtliche Grundlagen: §§ 383 ff. HGB, Eigentum, § 3 Abs. 3 UStG, Gewährleistung",
        text: "Der Kommissionär verkauft nach § 383 HGB im eigenen Namen für fremde Rechnung. Gegenüber dem Endkunden ist er Verkäufer mit allen Pflichten aus Kaufrecht und Verbraucherschutz, einschließlich Gewährleistung und Widerruf; im Innenverhältnis trägt der Kommittent das Absatzrisiko und erstattet Kosten für Mängel, die er zu vertreten hat. Der Kommissionär muss das Geschäft mit der Sorgfalt eines ordentlichen Kaufmanns führen und den Weisungen des Kommittenten folgen (§ 384 HGB); verkauft er unter dem vorgegebenen Preis, schuldet er die Differenz (§ 386 HGB). Für seine Provision und Aufwendungen hat er ein gesetzliches Pfandrecht (§ 397 HGB), das die Vorlage ausschließen lässt.\n\nDas Eigentum an der Kommissionsware bleibt beim Kommittenten und geht beim Verkauf direkt auf den Endkunden über; in der Insolvenz des Händlers kann der Kommittent sie aussondern. Forderungen aus dem Kommissionsgeschäft gelten im Verhältnis zu Gläubigern des Kommissionärs nach § 392 HGB als Forderungen des Kommittenten. Umsatzsteuerlich behandelt § 3 Abs. 3 UStG die Kommission als zwei Lieferungen, die erst mit dem Verkauf an den Kunden ausgeführt sind; die Abrechnung per Gutschrift nach § 14 Abs. 2 UStG ist üblich. Ein Handelsvertreterverhältnis mit Ausgleichsanspruch liegt nicht vor, was § 11 Abs. 2 der Vorlage klarstellt. Eine Form ist nicht vorgeschrieben.",
      },
      {
        titel: "Wann die Kommissionsvertrag-Vorlage nicht reicht",
        text: "Soll der Händler die Ware bei Entnahme kaufen und selbst Eigentümer werden, ist das ein Konsignationslager, kein Kommissionsgeschäft; dann brauchst du einen Rahmenliefervertrag mit Lagerregelung. Tritt der Händler nicht im eigenen Namen, sondern in deinem Namen auf und vermittelt nur, handelt es sich um einen Handelsvertretervertrag mit Ausgleichsanspruch nach § 89b HGB. Verkauft der Kommissionär über Marktplätze wie Amazon oder Etsy, prüfe die Plattformregeln zu Eigentum und Rechnungsstellung.\n\nBei grenzüberschreitender Kommission (Händler im EU-Ausland oder Drittstaat) werden Umsatzsteuer, Lieferschwellen und Eigentumsnachweis kompliziert; das klärt ein Steuerberater vorher. Bei größeren Warenwerten lohnt eine Besichtigung der Versicherung des Händlers und eine Vereinbarung über Inventuren. Für Lebensmittel, Kosmetik und Spielzeug müssen Kennzeichnung und Produktsicherheit stimmen, weil der Händler als Verkäufer haftet und du ihn nach § 9 Abs. 3 freistellst. GründerX bietet Software und Muster, keine Rechts- oder Steuerberatung; bei Streit über Abrechnungen hilft nur der Anwalt.",
      },
    ],
    seo: {
      title: "Kommissionsvertrag Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "Kommissionsvertrag nach §§ 383 ff. HGB als Vorlage: Kommissionsware, Provision, Abrechnung, Eigentum beim Kommittenten, Rückgabe, Haftung, Laufzeit.",
    },
    stand: "2026-10",
    text: `Kommissionsvertrag

zwischen

[Firma / Vorname Nachname], [Straße, PLZ Ort], [vertreten durch [Vorname Nachname]], USt-IdNr. [DE…]
– nachfolgend „Kommittent“ –

und

[Firma / Vorname Nachname], [Straße, PLZ Ort], [vertreten durch [Vorname Nachname]], USt-IdNr. [DE…]
– nachfolgend „Kommissionär“ –

Vorbemerkung
Der Kommittent stellt her bzw. vertreibt [Produktbeschreibung, z. B. handgefertigte Keramik der Marke [Marke]]. Der Kommissionär betreibt [ein Ladengeschäft in [Adresse] / den Online-Shop [domain.de] / einen Stand auf [Markt]]. Der Kommissionär soll die Produkte des Kommittenten im eigenen Namen für Rechnung des Kommittenten verkaufen (Verkaufskommission, §§ 383 ff. HGB).

§ 1 Vertragsgegenstand und Kommissionsware
(1) Der Kommittent überlässt dem Kommissionär die in Anlage 1 aufgeführten Waren (nachfolgend „Kommissionsware“) zum Verkauf an Endkunden [im Ladengeschäft [Adresse] / über den Online-Shop [domain.de] / über folgende Kanäle: [Angabe]]. Anlage 1 enthält je Artikel: Bezeichnung, Artikelnummer, Menge, vom Kommittenten festgelegter Verkaufspreis (brutto) und Einlieferungsdatum.
(2) Weitere Ware kann jederzeit durch Lieferschein eingeliefert werden; mit beidseitiger Unterzeichnung des Lieferscheins wird sie Kommissionsware im Sinne dieses Vertrags.
(3) Der Kommissionär verkauft die Kommissionsware im eigenen Namen, aber für Rechnung des Kommittenten. Vertragspartner des Endkunden ist allein der Kommissionär.
(4) [Der Kommissionär ist nicht berechtigt, die Kommissionsware selbst zu erwerben (Selbsteintritt nach § 400 HGB ausgeschlossen). / Der Kommissionär darf die Kommissionsware zum festgelegten Verkaufspreis abzüglich Provision selbst erwerben (Selbsteintritt).]

§ 2 Pflichten des Kommissionärs
(1) Der Kommissionär bewahrt die Kommissionsware mit der Sorgfalt eines ordentlichen Kaufmanns auf, präsentiert sie in angemessener Weise [an einem Platz von mindestens [Fläche] / auf einer eigenen Kategorieseite] und bemüht sich um den Verkauf.
(2) Er kennzeichnet die Kommissionsware in seinen Beständen, in seiner Warenwirtschaft und in seinen Räumen als Eigentum des Kommittenten (z. B. Vermerk „Kommissionsware [Kommittent]“) und führt sie getrennt von eigener Ware.
(3) Er führt fortlaufende Aufzeichnungen über Eingang, Bestand, Verkäufe (Datum, Artikel, Verkaufspreis) und Rückgaben und gewährt dem Kommittenten auf Verlangen Einsicht sowie das Recht, den Bestand nach Ankündigung von [z. B. 2] Werktagen vor Ort zu prüfen.
(4) Er informiert den Kommittenten unverzüglich über Beschädigungen, Verluste, Pfändungen, Beanstandungen von Kunden und Umstände, die die Kommissionsware oder die Erlöse gefährden. Bei Zugriffen Dritter weist er auf das Eigentum des Kommittenten hin.
(5) Der Kommissionär darf die Kommissionsware nicht an Dritte zum Weiterverkauf abgeben, verpfänden, sicherungsübereignen oder außerhalb der vereinbarten Kanäle anbieten.
(6) Werbung, Fotos und Texte zur Kommissionsware verwendet der Kommissionär nur nach den Vorgaben des Kommittenten; Marken und Produktfotos des Kommittenten darf er für die Dauer des Vertrags zur Bewerbung der Kommissionsware nutzen.

§ 3 Verkaufspreise und Weisungen
(1) Der Kommissionär verkauft die Kommissionsware zu den in Anlage 1 festgelegten Verkaufspreisen. Der Kommittent kann die Preise mit einer Frist von [z. B. 14] Tagen in Textform ändern.
(2) Rabatte und Aktionspreise sind nur mit Zustimmung des Kommittenten in Textform zulässig. [Alternativ: Der Kommissionär darf im Rahmen eigener Aktionen bis zu [z. B. 10] % Rabatt gewähren; die Provision bemisst sich dann nach dem tatsächlichen Verkaufspreis.]
(3) Verkauft der Kommissionär ohne Zustimmung unter dem festgelegten Preis, hat er dem Kommittenten die Differenz zu ersetzen (§ 386 HGB).
(4) Der Kommissionär beachtet weitere Weisungen des Kommittenten zu Präsentation, Zielgruppen und Verkaufsbedingungen, soweit sie zumutbar sind.

§ 4 Provision
(1) Der Kommissionär erhält für jeden Verkauf eine Provision von [z. B. 30] % des erzielten Netto-Verkaufspreises (Verkaufspreis abzüglich Umsatzsteuer und gewährter Rabatte). Die Provision versteht sich zuzüglich Umsatzsteuer.
(2) Die Provision entsteht mit vollständiger Zahlung des Endkunden. Bei Rückgabe oder Widerruf durch den Endkunden und Rückerstattung des Kaufpreises entfällt die Provision; bereits abgerechnete Provision wird in der nächsten Abrechnung verrechnet.
(3) Mit der Provision sind alle Aufwendungen des Kommissionärs abgegolten, insbesondere Lagerung, Präsentation, Verkaufspersonal, Zahlungsabwicklung, Verpackung und Werbung. Besondere Aufwendungen (z. B. Versand bei Online-Verkauf) trägt [der Kommissionär / der Kommittent gegen Nachweis / der Endkunde].
(4) [Optional: Zusätzlich erhält der Kommissionär eine Platzierungspauschale von [Betrag] EUR je Monat. / Es werden keine Fixkosten berechnet.]

§ 5 Abrechnung und Auszahlung
(1) Der Kommissionär rechnet [monatlich bis zum 10. des Folgemonats / 14-tägig] in Textform ab. Die Abrechnung enthält je verkauftem Artikel: Verkaufsdatum, Artikelnummer, Verkaufspreis brutto, Umsatzsteuer, Rabatt, Provision und den auszukehrenden Betrag sowie den Restbestand.
(2) Die Abrechnung erfolgt im Gutschriftverfahren (§ 14 Abs. 2 Satz 2 UStG): Der Kommissionär erteilt dem Kommittenten eine Gutschrift über die Lieferung der verkauften Ware; die Provision wird gesondert mit Umsatzsteuer ausgewiesen und verrechnet. Der Kommittent stimmt dem Gutschriftverfahren zu und teilt Änderungen seiner steuerlichen Verhältnisse (Kleinunternehmer, USt-IdNr.) unverzüglich mit.
(3) Der Kommissionär zahlt den auszukehrenden Betrag innerhalb von [z. B. 10] Tagen nach Abrechnung auf das Konto [IBAN] des Kommittenten. Der Kommissionär verwahrt die Verkaufserlöse bis zur Auszahlung treuhänderisch für den Kommittenten und tritt die Forderungen gegen Endkunden aus Verkäufen der Kommissionsware bereits jetzt sicherungshalber an den Kommittenten ab (§ 392 HGB bleibt unberührt).
(4) Bei Zahlungsverzug gelten Verzugszinsen von 9 Prozentpunkten über dem Basiszinssatz (§ 288 Abs. 2 BGB).
(5) Einwendungen gegen eine Abrechnung hat der Kommittent innerhalb von [z. B. 4] Wochen nach Zugang in Textform zu erheben; das Recht auf Einsicht nach § 2 Abs. 3 bleibt unberührt.

§ 6 Eigentum und Herausgabe
(1) Die Kommissionsware bleibt bis zum Verkauf an den Endkunden Eigentum des Kommittenten. Das Eigentum geht unmittelbar vom Kommittenten auf den Endkunden über; der Kommissionär erwirbt zu keinem Zeitpunkt Eigentum.
(2) Das gesetzliche Pfandrecht des Kommissionärs an der Kommissionsware (§ 397 HGB) [wird ausgeschlossen / beschränkt sich auf fällige, unbestrittene Provisionsansprüche].
(3) Der Kommittent kann jederzeit die Herausgabe einzelner oder aller Kommissionswaren verlangen, soweit keine Verkäufe an Endkunden bereits zustande gekommen sind. Der Kommissionär stellt die Ware innerhalb von [z. B. 7] Tagen zur Abholung bereit.
(4) Im Fall der Insolvenz des Kommissionärs ist die Kommissionsware auszusondern; der Kommissionär verpflichtet sich, dem Insolvenzverwalter die Kennzeichnung und die Listen nach § 2 vorzulegen.

§ 7 Lieferung, Lagerung, Rückgabe
(1) Der Kommittent liefert die Kommissionsware [auf eigene Kosten / auf Kosten des Kommissionärs] an [Adresse]. Die Übernahme wird auf dem Lieferschein quittiert; offensichtliche Transportschäden sind sofort zu vermerken.
(2) Der Kommissionär lagert die Kommissionsware [trocken, bei Raumtemperatur, vor Sonnenlicht geschützt / nach den Vorgaben des Kommittenten in Anlage 2].
(3) Unverkaufte Ware kann der Kommissionär nach [z. B. 6] Monaten Verweildauer zurückgeben; der Kommittent kann sie nach [z. B. 6] Monaten zurückverlangen. Die Rückgabe erfolgt in verkaufsfähigem Zustand mit Originalverpackung und Etiketten; Rücksendekosten trägt [der Kommissionär / der Kommittent].
(4) Ware, die beim Kommissionär beschädigt, verschmutzt oder ohne Verpackung zurückgegeben wird, rechnet der Kommissionär zum [Einstandswert laut Anlage 1 / Verkaufspreis abzüglich Provision] ab.
(5) Saisonware: [Nach Ende der Saison [Datum] gibt der Kommissionär unverkaufte Saisonware innerhalb von [z. B. 14] Tagen zurück.]

§ 8 Haftung für Verlust und Beschädigung
(1) Ab Übernahme bis zur Rückgabe oder zum Verkauf trägt der Kommissionär die Gefahr für Verlust, Diebstahl, Beschädigung und Untergang der Kommissionsware, auch bei Zufall. Er ersetzt dem Kommittenten im Schadensfall [den Verkaufspreis abzüglich Provision / den Einstandswert laut Anlage 1].
(2) Der Kommissionär versichert die Kommissionsware auf eigene Kosten gegen Feuer, Leitungswasser, Einbruchdiebstahl und Vandalismus zum Wiederbeschaffungswert und weist die Versicherung auf Verlangen nach.
(3) Im Übrigen haften die Parteien unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden aus der Verletzung von Leben, Körper oder Gesundheit; bei leichter Fahrlässigkeit nur für die Verletzung wesentlicher Vertragspflichten, begrenzt auf den vorhersehbaren, vertragstypischen Schaden.

§ 9 Gewährleistung gegenüber Kunden
(1) Gegenüber Endkunden ist der Kommissionär Verkäufer und trägt die gesetzlichen Gewährleistungs- und Widerrufspflichten. Er wickelt Reklamationen, Rücknahmen und Widerrufe ab und informiert den Kommittenten über jeden Fall.
(2) Beruht die Reklamation auf einem Mangel der Kommissionsware, den der Kommittent zu vertreten hat (Herstellungs- oder Materialfehler, fehlerhafte Kennzeichnung), erstattet der Kommittent dem Kommissionär den Rückerstattungsbetrag abzüglich der nach § 4 Abs. 2 entfallenden Provision sowie nachgewiesene Rücksendekosten und nimmt die Ware zurück. Beruht sie auf Umständen im Bereich des Kommissionärs (Lagerung, Beschädigung, falsche Beratung), trägt der Kommissionär die Kosten.
(3) Der Kommittent sichert zu, dass die Kommissionsware verkehrsfähig ist, den gesetzlichen Kennzeichnungs- und Produktsicherheitsvorschriften entspricht und keine Rechte Dritter verletzt. Er stellt dem Kommissionär die für den Verkauf erforderlichen Angaben (Herstellerangaben, Materialzusammensetzung, Sicherheitshinweise, [Preisangaben je Grundmenge]) bereit. Von Ansprüchen Dritter, die auf einer Verletzung dieser Zusicherung beruhen, stellt der Kommittent den Kommissionär frei.

§ 10 Laufzeit und Kündigung
(1) Der Vertrag beginnt am [Datum] und läuft auf unbestimmte Zeit. Er kann von jeder Partei mit einer Frist von [z. B. 3] Monaten zum Monatsende in Schriftform gekündigt werden, erstmals zum [Datum].
(2) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt, insbesondere bei Zahlungsverzug mit einer Abrechnung von mehr als [z. B. 30] Tagen trotz Mahnung, bei Verstoß gegen § 2 Abs. 5 oder § 3, bei Pfändung der Kommissionsware oder bei Antrag auf Eröffnung des Insolvenzverfahrens.
(3) Mit Beendigung gibt der Kommissionär die gesamte noch vorhandene Kommissionsware innerhalb von [z. B. 14] Tagen zurück, erstellt eine Schlussabrechnung und zahlt den Restbetrag aus. Laufende Kundenbestellungen werden noch abgewickelt. Das Recht zur Nutzung von Marken und Fotos des Kommittenten endet.

§ 11 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; dies gilt auch für die Aufhebung dieser Klausel. Lieferscheine, Preisänderungen, Abrechnungen und Weisungen können in Textform erfolgen.
(2) Der Kommissionär ist kein Handelsvertreter des Kommittenten; Ausgleichsansprüche nach § 89b HGB bestehen nicht. Die Parteien sind selbständige Unternehmer.
(3) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung bzw. eine wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt.
(4) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist [Ort], soweit beide Parteien Kaufleute sind.
(5) Anlagen: Anlage 1 – Kommissionswarenliste mit Verkaufspreisen und Einstandswerten; [Anlage 2 – Lager- und Präsentationsvorgaben]; Lieferscheine. Die Anlagen sind Bestandteil dieses Vertrags.

[Ort], den [Datum]


______________________________
[Kommittent, ggf. Firma und Vertreter]


______________________________
[Kommissionär, ggf. Firma und Vertreter]

${VORLAGEN_HINWEIS}`,
  },
];
