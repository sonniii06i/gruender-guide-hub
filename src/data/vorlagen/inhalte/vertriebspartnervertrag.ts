// Inhalt der Vorlage „vertriebspartnervertrag“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../ecommerce.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen Vertriebspartnervertrag brauchst",
        text: `Sobald ein Händler deine Produkte regelmäßig einkauft und unter deiner Marke weiterverkauft, reicht die einzelne Bestellung als Grundlage nicht mehr. Ohne Rahmenvertrag sind Rabatte, Gebiete, Markennutzung, Mindestabnahme und das Ende der Zusammenarbeit ungeregelt, und beide Seiten verlassen sich auf E-Mails, die niemand mehr findet. Der Vertriebspartnervertrag, auch Händler- oder Reseller-Vertrag genannt, fasst diese Punkte in einem Dokument zusammen.

Du brauchst ihn als Hersteller oder Importeur, der ein Händlernetz aufbaut, und als Händler, der eine Marke als autorisierter Reseller führen will und dafür verlässliche Konditionen braucht. Die Vorlage ist ein Wiederverkäufervertrag: Der Partner kauft auf eigene Rechnung und trägt das Absatzrisiko. Für Partner, die nur Geschäfte vermitteln und Provision erhalten, ist der Handelsvertretervertrag nach den §§ 84 ff. HGB die richtige Vorlage, nicht diese.`,
      },
      {
        titel: "Das muss in einen Reseller Vertrag",
        text: `Die Vorlage regelt in elf Paragrafen und drei Anlagen alles, was zwischen Hersteller und Händler strittig werden kann:

- Stellung des Partners als selbständiger Kaufmann ohne Vertretungsmacht und ohne Ausgleichsanspruch (§ 1)
- Vertragsprodukte, Gebiet und die Wahl zwischen nicht exklusivem Vertrieb und Alleinvertrieb (§ 2)
- Händlerrabatt, Jahresbonus, Preisänderungen, Zahlungsziel, Skonto, Kreditlimit (§ 3)
- Bestellweg, Lieferzeit, Gefahrübergang und verlängerter Eigentumsvorbehalt (§ 4)
- Mindestabnahme mit Folgen bei Unterschreitung und Berichtspflichten ohne Kundendaten (§ 5)
- unverbindliche Preisempfehlung mit ausdrücklichem Verzicht auf Preisbindung (§ 6)
- Markenlizenz, Markenrichtlinien, Produktdaten und optional Werbekostenzuschuss (§ 7)
- Rügepflicht, Nacherfüllung, Verjährung, Produktsicherheit, Freistellung, Rückruf, Versicherung (§ 8)
- Geheimhaltung und Verbleib der Kundendaten beim Händler (§ 9)
- Mindestlaufzeit, Verlängerung, außerordentliche Kündigung, Abverkauf und Rückkaufrecht (§ 10)
- Vorrang des Vertrags vor AGB, Übertragungsverbot, Gerichtsstand (§ 11)

Anlage 1 listet Produkte und Marken, Anlage 2 die Händlerpreisliste, Anlage 3 Markenrichtlinien und gegebenenfalls Qualitätskriterien für den selektiven Vertrieb.`,
      },
      {
        titel: "Vertriebspartnervertrag Muster ausfüllen",
        text: `Trage beide Parteien ein und lege in § 1 Abs. 3 fest, welche Bezeichnung der Partner führen darf. In § 2 wählst du zwischen Variante A ohne Exklusivität und Variante B mit Alleinvertrieb; die andere Variante löschst du. Entscheide, ob du Qualitätskriterien für Marktplätze aufnimmst; das ist nur zulässig, wenn sie sachlich begründet sind und für alle Händler gleich gelten.

In § 3 setzt du Händlerrabatt, optional Jahresbonus, Ankündigungsfrist für Preisänderungen, Lieferkondition ab Werk oder frei Haus, Zahlungsziel, Skonto und Kreditlimit ein. § 4 braucht Bestellweg, Bestätigungsfrist, Mindestbestellmenge und Lieferzeit. In § 5 legst du die Mindestabnahme je Vertragsjahr fest und wählst, was bei Unterschreitung passiert: Wegfall der Exklusivität, Rabattkürzung oder Kündigungsrecht.

§ 6 bleibt wie er ist; dort steht nur die UVP, keine Preisvorgabe. In § 7 und § 8 trägst du Werbekostenzuschuss, Rügefrist, Verjährungsfrist und Deckungssumme der Produkthaftpflicht ein. § 10 braucht Beginn, Mindestlaufzeit, Kündigungsfrist, Abverkaufsfrist und den Abschlag beim Rückkauf. Dann die drei Anlagen befüllen und unterschreiben.`,
      },
      {
        titel: "Typische Fehler in Händlerverträgen: Preisbindung und Verkaufsverbote",
        text: `Der gefährlichste Fehler ist die Preisbindung. Hersteller dürfen Händlern keine Mindest- oder Festpreise vorgeben, auch nicht indirekt über Rabattkürzungen, Lieferstopps oder Drohungen bei Unterschreitung der UVP. Das ist ein Kartellverstoß, der Bußgelder auslöst und die Klausel nichtig macht. Zulässig sind nur unverbindliche Preisempfehlungen und Höchstpreise; genau so ist § 6 der Vorlage gebaut.

Zweiter Fehler: pauschale Verbote des Online-Verkaufs oder des Verkaufs über Marktplätze. Solche Verbote sind nur in engen Grenzen und nur im selektiven Vertrieb mit sachlichen Qualitätskriterien möglich. Dritter Fehler: das Verbot passiver Verkäufe. Kunden, die von sich aus aus einem anderen Gebiet bestellen, darf der Händler immer beliefern; nur aktive Verkaufsbemühungen in fremde Exklusivgebiete dürfen eingeschränkt werden. Weitere Fallen sind die Pflicht zur Überlassung des Kundenstamms, die einen Ausgleichsanspruch analog § 89b HGB begründen kann, fehlende Rügefristen und ein Vertragsende ohne Regelung für den Restbestand, der dann unter deiner Marke verramscht wird.`,
      },
      {
        titel: "Rechtliche Grundlagen für Vertriebspartnerverträge",
        text: `Der Vertriebspartnervertrag ist gesetzlich nicht eigens geregelt; er kombiniert Kaufrecht nach den §§ 433 ff. BGB mit einem Rahmenvertrag und Elementen der Markenlizenz. Unter Kaufleuten gilt die Rügepflicht des § 377 HGB, für den Rückgriff bei Verbraucherverkäufen die §§ 445a, 445b und 478 BGB. Der Verzugszins zwischen Unternehmern beträgt nach § 288 Abs. 2 BGB neun Prozentpunkte über dem Basiszinssatz, dazu die Pauschale nach § 288 Abs. 5 BGB.

Die Grenzen setzt das Kartellrecht: § 1 GWB und Art. 101 AEUV verbieten Preisbindung und Gebietsabschottung; die Vertikal-Gruppenfreistellungsverordnung (EU) 2022/720 regelt, welche Beschränkungen in Alleinvertriebs- und selektiven Systemen zulässig sind. Der Ausgleichsanspruch des § 89b HGB kann auf Vertragshändler entsprechend angewendet werden, wenn sie wie Handelsvertreter eingegliedert sind und ihren Kundenstamm überlassen müssen; die Vorlage vermeidet beides. Die Klauseln unterliegen als vorformulierte Bedingungen der AGB-Kontrolle nach den §§ 305 ff. BGB, auch zwischen Unternehmern.`,
      },
      {
        titel: "Wann der Reseller Vertrag allein nicht reicht",
        text: `Die Vorlage ist für den Vertrieb in Deutschland und angrenzenden Ländern mit einem Partner je Vertrag ausgelegt. Sie reicht nicht für Vertriebssysteme über viele EU-Länder mit unterschiedlichen Exklusivgebieten, für Franchise-Modelle mit Betriebskonzept und laufenden Gebühren, für Partner außerhalb der EU mit anderem Kartell- und Vertriebsrecht oder für Produkte, bei denen der Händler eigene Zulassungen braucht, etwa Medizinprodukte oder Arzneimittel.

Ein selektives Vertriebssystem mit Qualitätskriterien muss kartellrechtlich sauber aufgesetzt sein; dort lohnt sich die anwaltliche Prüfung, bevor der erste Händler unterschreibt. Dasselbe gilt für Mindestabnahmen, die den Partner wirtschaftlich stark binden, und für Rückkaufklauseln bei großen Lagerbeständen. GründerX ist Software und keine Rechtsberatung. Die Vorlage gibt dir eine kartellrechtlich vorsichtige Grundlage; was du daraus streichst oder verschärfst, solltest du gegen die Vertikal-GVO prüfen lassen.`,
      },
    ],
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
};

export default inhalt;
