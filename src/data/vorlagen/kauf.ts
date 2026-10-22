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
    seo: {
      title: "Kaufvertrag B2B Vorlage 2026 kostenlos (Word & PDF) | GründerX",
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
    seo: {
      title: "Privatkaufvertrag gebraucht Vorlage 2026 (Word & PDF) | GründerX",
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
    seo: {
      title: "Kfz-Kaufvertrag gewerblich Vorlage 2026 (Word & PDF) | GründerX",
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
    seo: {
      title: "Kaufvertrag Inventar & Büroausstattung Vorlage 2026 | GründerX",
      description:
        "Kaufvertrag für Geschäftsausstattung und Inventar: Inventarliste, Pauschalpreis, gekauft wie besichtigt, Abholung, Eigentumsvorbehalt. Kostenlos als Word & PDF.",
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
    seo: {
      title: "Kaufvertrag gebrauchte Maschine Vorlage (Word & PDF) | GründerX",
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
    seo: {
      title: "Kaufvertrag Warenbestand & Restposten Vorlage 2026 | GründerX",
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
    seo: {
      title: "Domain-Kaufvertrag Vorlage 2026 kostenlos (Word & PDF) | GründerX",
      description:
        "Domain-Kaufvertrag als kostenlose Vorlage: Übertragung per AuthCode, Treuhand-Zahlung, Garantien gegen Rechte Dritter, Marke und Logo, Fristen. Word, PDF, Text.",
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
    seo: {
      title: "Website & Online-Shop Kaufvertrag Vorlage 2026 | GründerX",
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
    seo: {
      title: "Unternehmenskaufvertrag Asset Deal Vorlage 2026 | GründerX",
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
    seo: {
      title: "Amazon FBA Business Kaufvertrag Vorlage 2026 | GründerX",
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
    seo: {
      title: "Rahmenliefervertrag Vorlage 2026 (Word & PDF) | GründerX",
      description:
        "Rahmenliefervertrag mit Lieferant oder Hersteller: Produkte, Preise und Preisanpassung, Einzelabrufe, Lieferfristen, Muster, Exklusivität, Laufzeit, Kündigung.",
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
    seo: {
      title: "Kommissionsvertrag Vorlage 2026 kostenlos (Word & PDF) | GründerX",
      description:
        "Kommissionsvertrag nach §§ 383 ff. HGB als Vorlage: Kommissionsware, Provision, Abrechnung, Eigentum beim Kommittenten, Rückgabe, Haftung, Laufzeit, Kündigung.",
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
