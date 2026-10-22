// Inhalt der Vorlage „white-label-vereinbarung“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../geheimhaltung.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du eine White-Label-Vereinbarung brauchst",
        text: `White Label heißt: Ein Hersteller liefert Produkt oder Software, ein Partner verkauft es unter seiner eigenen Marke, und der Endkunde sieht nur den Partner. Das Modell ist auf beiden Seiten verbreitet. Als Hersteller gewinnst du Reichweite ohne eigenes Marketing, etwa wenn ein Agenturnetzwerk dein Buchungstool als eigenes Produkt anbietet oder ein Händler deine Nahrungsergänzung unter seiner Eigenmarke führt. Als Partner bekommst du ein fertiges Produkt und baust deine Marke auf, ohne Entwicklung oder Produktion.

Du brauchst die Vereinbarung, sobald regelmäßig geliefert oder bereitgestellt wird: als Rahmenvertrag für Warenbestellungen mit Mindestmengen oder als Dauervertrag für eine SaaS-Anwendung im Branding des Partners. Für den Fall, dass der Partner dein Produkt unter deiner Marke verkauft, ist das kein White Label, sondern ein Reseller- oder Vertriebspartnervertrag aus der Kategorie Online-Handel. Soll der Partner nur deine Marke nutzen, passt der Markenlizenzvertrag.`,
      },
      {
        titel: "Was in einen White-Label-Vertrag gehört",
        text: `Das Muster deckt Waren und Software mit Varianten ab und verteilt die Verantwortung zwischen Hersteller und Partner ausdrücklich:

- § 1 Produkt, White-Label-Umfang (Verpackung und Etiketten bzw. Logo, Domain, Systemmails, Rechtstexte), eigener Name und eigene Rechnung des Partners, Rechte am Produkt beim Hersteller.
- § 2 Variante A Waren: Bestellung, Mindestmenge, Lieferzeit, Lieferart, Gefahrübergang, Druckdaten. Variante B Software: Hosting unter Partnerdomain, Verfügbarkeit, Wartungsfenster, Backups, Ankündigungsfristen.
- § 3 Preise, Mindestabnahme mit Ausgleich, Preisanpassung, Verzug und Lieferstopp mit Schutz bestehender Endkunden.
- § 4 Nutzung der Partnermarke nur zur Vertragserfüllung, keine Referenznennung, gesetzliche Herstellerangaben bleiben zulässig.
- § 5 Produktverantwortung nach § 4 Abs. 1 Satz 2 ProdHaftG, Unterlagen des Herstellers, Kennzeichnung durch den Partner, wechselseitige Freistellung, Versicherung, Rückrufe.
- § 6 Support-Stufen: 1st Level beim Partner, 2nd und 3rd Level beim Hersteller mit Reaktionszeiten, Wissensdatenbank, Schulung.
- § 7 Exklusivität in drei Varianten, gekoppelt an Mindestabnahme.
- § 8 Geheimhaltung der Herkunft, Auftragsverarbeitung nach Art. 28 DSGVO, Herausgabe der Endkundendaten.
- § 9 Gewährleistung für Waren und Software, Haftungsbegrenzung.
- § 10 Laufzeit, Kündigung, Übergangsfrist für Endkunden, Abverkauf.
- § 11 Schriftform, Gerichtsstand, Anlagen.`,
      },
      {
        titel: "White-Label-Vereinbarung ausfüllen: Varianten und Platzhalter",
        text: `Lade die Vorlage kostenlos als Word oder PDF herunter. Entscheide zuerst, ob es um Waren oder um Software geht, und streiche in § 2 und § 9 die andere Variante. Beschreibe in der Präambel und in § 1 das Produkt und den White-Label-Umfang konkret: Bei Waren Verpackung, Etiketten, Beipackzettel; bei Software Domain, Logo, Absenderadressen und Rechtstexte.

In § 2 trägst du Mindestbestellmenge, Lieferzeit und Lieferart ein oder Verfügbarkeit, Wartungsfenster und Backup-Dauer. In § 3 die Preise nach Anlage 3, eine eventuelle Mindestabnahme mit Ausgleichsquote und die Regeln zur Preisanpassung. In § 5 legst du in Anlage 1 fest, wer welche Kennzeichnungen, Prüfungen und Rechtstexte erstellt, und setzt die Deckungssumme der Produkthaftpflicht ein. In § 6 Supportzeiten und Reaktionszeiten, die der Hersteller wirklich halten kann.

In § 7 wählst du eine der drei Exklusivitätsvarianten; Variante B nur mit Mindestabnahme in § 3 Abs. 2. In § 8 bestimmst du, ob ein Auftragsverarbeitungsvertrag als Anlage 5 nötig ist, bei Software fast immer. In § 10 Laufzeit, Verlängerung, Kündigungsfrist, Übergangsfrist und Abverkaufsfrist. Anlagen beifügen, unterschreiben, je eine Ausfertigung.`,
      },
      {
        titel: "Typische Fehler bei White-Label-Partnerschaften",
        text: `Erstens: die Produkthaftung unterschätzen. Wer seinen Namen auf das Produkt setzt, gilt gegenüber Verbrauchern als Hersteller und haftet für Personen- und Sachschäden, auch wenn er nie eine Fabrik betreten hat. Ohne Versicherung und Rückgriff auf den echten Hersteller trägt der Partner dieses Risiko allein.

Zweitens: Kennzeichnung ungeklärt lassen. CE-Zeichen, Lebensmittel- oder Kosmetikangaben, Textilkennzeichnung, Impressum und AGB bei Software: Jemand muss sie erstellen und verantworten. Fehlt die Zuordnung in Anlage 1, fällt sie im Streitfall auf den Anbieter zurück.

Drittens: Exklusivität ohne Gegenleistung. Der Hersteller verzichtet auf alle anderen Vertriebswege in einem Gebiet, und der Partner verkauft kaum. Die Vorlage koppelt Exklusivität an Mindestabnahme und erlaubt die Kündigung der Exklusivität bei Unterschreitung.

Viertens: Endkundendaten vermischen. Bei Software verarbeitet der Hersteller die Daten der Endkunden des Partners; ohne Auftragsverarbeitungsvertrag ist das ein Datenschutzverstoß, und ohne Herausgaberegel sind die Daten nach Vertragsende weg.

Fünftens: kein Übergang nach Kündigung. Endet der Vertrag abrupt, stehen die Endkunden des Partners ohne Produkt da. § 10 Abs. 3 sichert eine Übergangsfrist.`,
      },
      {
        titel: "Rechtliche Grundlagen: Produkthaftung, Kaufrecht, Datenschutz",
        text: `Die zentrale Norm ist § 4 Abs. 1 Satz 2 ProdHaftG: Als Hersteller gilt auch, wer sich durch Anbringen seines Namens, seiner Marke oder eines anderen Kennzeichens als Hersteller ausgibt. Der White-Label-Partner haftet damit verschuldensunabhängig für Schäden durch fehlerhafte Produkte; die Vorlage regelt dafür in § 5 den Rückgriff auf den Hersteller und die Versicherungspflicht beider Seiten.

Für Warenlieferungen gelten die §§ 433 ff. BGB und zwischen Kaufleuten die Rügepflicht des § 377 HGB. Verkauft der Partner an Verbraucher, kann er nach §§ 445a, 445b BGB beim Hersteller Rückgriff nehmen, wenn er wegen eines Mangels nachbessern, zurücknehmen oder mindern musste; dieser Rückgriff bleibt in § 9 Abs. 1 ausdrücklich erhalten. Für gehostete Software ist das Vertragsverhältnis mietrechtlich geprägt, weshalb § 9 Abs. 2 die verschuldensunabhängige Haftung nach § 536a Abs. 1 BGB ausschließt, was unter Unternehmern zulässig ist.

Datenschutzrechtlich ist der Partner Verantwortlicher für seine Endkunden und der Hersteller Auftragsverarbeiter, sobald er auf deren Daten zugreift; Art. 28 DSGVO verlangt dafür einen schriftlichen Vertrag. Die Haftungsklausel in § 9 Abs. 3 folgt der Rechtsprechung zu Kardinalpflichten, weil ein vollständiger Haftungsausschluss auch unter Unternehmern unwirksam wäre.`,
      },
      {
        titel: "Wann das White-Label-Muster nicht reicht",
        text: `Die Vorlage ist für Partnerschaften zwischen deutschen Unternehmen mit Vertrieb in Deutschland und der EU gemacht. Produkte mit Zulassungspflichten, etwa Medizinprodukte, Arzneimittel, Spielzeug mit besonderen Prüfpflichten oder Lebensmittel mit Health Claims, verlangen eine regulatorische Prüfung, die kein Vertragsmuster leisten kann. Dort entscheidet, wer als Inverkehrbringer registriert ist und welche Konformitätsnachweise vorliegen.

Bei Lieferanten außerhalb der EU kommen Import, Zoll, Produktsicherheitsverordnung und die Pflicht zu einem in der EU ansässigen Wirtschaftsakteur hinzu. Bei Software mit Zahlungsabwicklung, Gesundheitsdaten oder KI-Funktionen gelten zusätzliche Regeln, bei großen Partnern mit eigenen Einkaufsbedingungen ohnehin deren Vertragswerk. Franchise-ähnliche Systeme mit Handbuch, Schulungspflichten und Gebietsschutz überschreiten das Muster ebenfalls.

Steuerlich prüfe, ob der Partner bei Direktversand an Endkunden Lagerorte und Lieferschwellen im Ausland auslöst. GründerX ist eine Software für Gründer und keine Rechtsberatung. Die Vorlage bildet den Standardfall ab; bei Produkthaftungsrisiken im Verbrauchermarkt oder hohen Mindestabnahmen lohnt die anwaltliche Durchsicht vor der Unterschrift.`,
      },
    ],
  text: `White-Label-Vereinbarung

zwischen

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Hersteller“ –

und

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Partner“ –

– gemeinsam „die Parteien“ –

Präambel
Der Hersteller entwickelt und produziert bzw. betreibt [Produkt / Software / Dienstleistung, z. B. „Nahrungsergänzungsmittel in Kapselform“ / „eine Software zur Terminbuchung als Web-Anwendung“] (nachfolgend „Produkt“). Der Partner möchte das Produkt unter seiner eigenen Marke „[Partnermarke]“ und in seinem eigenen Namen an seine Kunden (nachfolgend „Endkunden“) vertreiben, ohne dass der Hersteller gegenüber den Endkunden in Erscheinung tritt (White Label). Die Parteien vereinbaren dazu Folgendes:

§ 1 Vertragsgegenstand
(1) Der Hersteller stellt dem Partner das Produkt in der in Anlage 1 beschriebenen Ausführung in White-Label-Form zur Verfügung, d. h. ohne Hinweise auf den Hersteller und versehen mit der Marke, dem Namen und der Gestaltung des Partners gemäß den Vorgaben in Anlage 2 (Branding-Vorgaben).
(2) Der White-Label-Umfang umfasst: [bei Waren: Verpackung, Etiketten, Beipackzettel und Produktaufdruck in der Gestaltung des Partners] [bei Software: Anpassung von Logo, Farben, Domain ([app.partnermarke.de]), Absenderadressen für Systemmails, Impressum und Rechtstexte des Partners sowie Entfernung aller Hinweise auf den Hersteller in Oberfläche, Dokumentation und Quelltext-Kommentaren, soweit technisch mit vertretbarem Aufwand möglich].
(3) Der Partner vertreibt das Produkt im eigenen Namen und auf eigene Rechnung. Verträge mit Endkunden kommen ausschließlich zwischen dem Partner und den Endkunden zustande. Der Hersteller ist weder Vertreter noch Erfüllungsgehilfe des Partners gegenüber Endkunden, soweit dieser Vertrag nichts anderes bestimmt.
(4) Weiterentwicklungen des Produkts, die der Hersteller allgemein bereitstellt, sind vom Vertrag umfasst. Individuelle Anpassungen für den Partner werden gesondert nach Anlage 3 (Preisliste) vereinbart. Alle Rechte am Produkt, einschließlich der Weiterentwicklungen und der für den Partner vorgenommenen Anpassungen, verbleiben beim Hersteller.

§ 2 Bereitstellung und Lieferung
[Variante A – Waren:]
(1) Der Partner bestellt per [E-Mail / Bestellportal] mit einer Mindestbestellmenge von [Anzahl] Einheiten je Bestellung. Der Hersteller bestätigt Bestellungen innerhalb von [2] Werktagen; mit der Bestätigung kommt der Einzelliefervertrag zustande. Lieferzeit: [z. B. 15] Werktage ab Bestätigung bzw. ab Freigabe der Druckdaten bei Erstbestellung.
(2) Lieferung erfolgt [ab Werk / frei Lager des Partners / direkt an Endkunden (Dropshipping) in neutraler Verpackung mit Absender des Partners]. Gefahrübergang mit Übergabe an den Frachtführer bzw. bei Lieferung frei Haus mit Übergabe an den Empfänger.
(3) Der Partner liefert die Druckdaten für Verpackung und Etiketten gemäß den technischen Vorgaben des Herstellers. Der Hersteller prüft die Druckdaten nur auf technische Umsetzbarkeit, nicht auf rechtliche Zulässigkeit.
[Variante B – Software/Dienst:]
(1) Der Hersteller stellt das Produkt als gehostete Anwendung unter der Domain des Partners bereit, richtet das Branding nach Anlage 2 innerhalb von [z. B. 20] Werktagen nach Bereitstellung der Vorlagen ein und stellt dem Partner eine Administrationsoberfläche zur Verwaltung der Endkunden zur Verfügung.
(2) Verfügbarkeit: [99,5] % im Monatsmittel am Übergabepunkt (Internet-Ausgang des Rechenzentrums), ausgenommen angekündigte Wartungsfenster ([werktags zwischen 22 und 6 Uhr], höchstens [8] Stunden je Monat) und Störungen außerhalb des Einflussbereichs des Herstellers. Der Hersteller sichert die Daten täglich und bewahrt Sicherungen [30] Tage auf.
(3) Der Hersteller informiert den Partner mindestens [4] Wochen vor wesentlichen Funktionsänderungen, die Endkunden sichtbar betreffen, und mindestens [6] Monate vor der Einstellung von Funktionen.

§ 3 Preise, Bestellung und Zahlung
(1) Der Partner zahlt die Preise gemäß Anlage 3 [je Einheit / je Endkunde und Monat / als monatliche Grundgebühr von [Betrag] EUR zuzüglich [Betrag] EUR je aktivem Endkunden]. Alle Preise verstehen sich netto zuzüglich gesetzlicher Umsatzsteuer. Die Preise gegenüber Endkunden legt der Partner frei fest.
(2) [Optional:] Der Partner verpflichtet sich zu einer Mindestabnahme von [Anzahl] Einheiten bzw. einem Mindestumsatz von [Betrag] EUR je Vertragsjahr. Wird die Mindestabnahme unterschritten, zahlt der Partner die Differenz [zu [50] %] als Ausgleich; eine Unterschreitung in zwei aufeinanderfolgenden Jahren berechtigt den Hersteller zur Kündigung der Exklusivität nach § 7.
(3) Rechnungen sind innerhalb von [14] Tagen ohne Abzug fällig. Der Hersteller darf die Preise mit einer Ankündigungsfrist von [3] Monaten zum Beginn eines Vertragsjahres anpassen, erstmals nach [12] Monaten; bei einer Erhöhung über [5] % kann der Partner zum Wirksamwerden kündigen.
(4) Bei Zahlungsverzug von mehr als [30] Tagen darf der Hersteller nach Ankündigung weitere Lieferungen zurückhalten bzw. den Zugang zur Anwendung für neue Endkunden sperren; bestehende Endkunden bleiben für weitere [30] Tage versorgt.

§ 4 Marken- und Namensnutzung
(1) Der Partner räumt dem Hersteller das einfache, nicht übertragbare Recht ein, die Partnermarke und die Branding-Vorgaben ausschließlich zur Erfüllung dieses Vertrags (Produktion, Verpackung, Einrichtung der Anwendung) zu nutzen. Der Partner stellt sicher, dass er über die erforderlichen Rechte verfügt, und stellt den Hersteller von Ansprüchen Dritter wegen der Partnermarke frei.
(2) Der Hersteller tritt gegenüber Endkunden nicht in Erscheinung. Er verwendet die Partnermarke nicht in eigener Werbung und nennt den Partner nicht als Referenz, es sei denn, der Partner stimmt in Textform zu. [Alternative: Der Hersteller darf den Partner nach Freigabe als Referenzkunden nennen.]
(3) Der Partner verwendet keine Marken, Namen oder Kennzeichen des Herstellers. Gesetzlich vorgeschriebene Herstellerangaben (z. B. Name und Anschrift des Herstellers oder Verantwortlichen auf Verpackungen, Konformitätserklärungen, Open-Source-Hinweise in der Software) bleiben zulässig und werden zwischen den Parteien abgestimmt.

§ 5 Produktverantwortung, Kennzeichnung und Haftung gegenüber Endkunden
(1) Die Parteien sind sich bewusst, dass der Partner durch das Anbringen seiner Marke gegenüber Endkunden als Hersteller im Sinne des § 4 Abs. 1 Satz 2 ProdHaftG gilt und zivilrechtlich als Vertragspartner der Endkunden haftet.
(2) Der Hersteller gewährleistet, dass das Produkt bei Lieferung den in Anlage 1 vereinbarten Spezifikationen und den in Deutschland [und der EU] geltenden gesetzlichen Anforderungen an Sicherheit und Beschaffenheit entspricht, und stellt dem Partner die dafür erforderlichen Unterlagen (Konformitätserklärungen, Prüfberichte, Sicherheitsdatenblätter, technische Dokumentation) zur Verfügung. Der Partner ist für Kennzeichnung, Werbeaussagen, Rechtstexte (AGB, Widerrufsbelehrung, Datenschutzerklärung, Impressum) und Verbraucherinformationen gegenüber Endkunden verantwortlich, soweit sie nicht in Anlage 1 dem Hersteller zugewiesen sind.
(3) Der Hersteller stellt den Partner von Ansprüchen Endkunden und Dritter frei, soweit diese auf einem Produktfehler beruhen, der bei Lieferung vorlag und in der Sphäre des Herstellers entstanden ist (Konstruktion, Fabrikation, Hosting, Softwarefehler). Der Partner stellt den Hersteller von Ansprüchen frei, die auf seiner Kennzeichnung, seinen Werbeaussagen, seinen Rechtstexten oder seiner Lagerung und Handhabung beruhen.
(4) Beide Parteien unterhalten eine Betriebs- und Produkthaftpflichtversicherung mit einer Deckungssumme von mindestens [Betrag] EUR je Schadensfall und weisen sie auf Verlangen nach. Jede Partei informiert die andere unverzüglich über Schadensfälle, Rückrufe, behördliche Maßnahmen und Sicherheitslücken, die das Produkt betreffen; Rückrufe werden gemeinsam abgestimmt und vom Verursacher bezahlt.

§ 6 Support-Stufen
(1) 1st-Level-Support (Annahme von Endkundenanfragen, Bedienfragen, Erstdiagnose, Retourenabwicklung) erbringt der Partner in eigenem Namen und auf eigene Kosten.
(2) 2nd-Level-Support (Analyse technischer Störungen und Produktmängel, die der Partner nicht lösen kann) erbringt der Hersteller gegenüber dem Partner, nicht gegenüber Endkunden, per [Ticketsystem / E-Mail] an Werktagen von [9] bis [17] Uhr. Reaktionszeiten: bei Störungen, die das Produkt unbrauchbar machen, [4] Stunden; bei erheblichen Einschränkungen [1] Werktag; sonst [3] Werktage.
(3) 3rd-Level-Support (Fehlerbehebung im Produkt, Softwarekorrekturen, Ersatzlieferung bei Serienfehlern) erbringt der Hersteller im Rahmen seiner Gewährleistung; darüber hinausgehende Leistungen (z. B. Störungen durch Fehlbedienung oder Änderungen des Partners) werden nach Anlage 3 vergütet.
(4) Der Hersteller stellt dem Partner eine Wissensdatenbank bzw. Dokumentation in White-Label-Form bereit, die der Partner seinen Endkunden unter eigener Marke zugänglich machen darf. Der Hersteller schult die Support-Mitarbeiter des Partners einmal zu Vertragsbeginn [kostenlos / gegen Vergütung nach Anlage 3].

§ 7 Exklusivität und Wettbewerb
[Variante A:] Es besteht keine Exklusivität. Beide Parteien bleiben frei, mit Dritten zusammenzuarbeiten; der Hersteller darf das Produkt unter eigener Marke und über andere Partner vertreiben.
[Variante B:] Der Hersteller gewährt dem Partner für die Dauer dieses Vertrags Exklusivität für [das Gebiet [Gebiet] / die Branche [Branche] / den Vertriebskanal [Kanal]]: Er wird das Produkt dort weder selbst unter fremder Marke noch über andere White-Label-Partner anbieten. Die Exklusivität steht unter der Bedingung, dass der Partner die Mindestabnahme nach § 3 Abs. 2 erreicht. Der Partner verpflichtet sich im Gegenzug, während der Laufzeit keine vergleichbaren Produkte anderer Hersteller unter der Partnermarke zu vertreiben.
[Variante C:] Der Hersteller wird identische Produkte nicht an die in Anlage 4 benannten direkten Wettbewerber des Partners liefern. Im Übrigen besteht keine Exklusivität.

§ 8 Geheimhaltung der Partnerschaft, Datenschutz
(1) Die Parteien behandeln den Inhalt dieses Vertrags, die Preise, die Tatsache, dass das Produkt vom Hersteller stammt, sowie alle Geschäftsgeheimnisse der anderen Partei vertraulich und verpflichten ihre Mitarbeiter und Dienstleister entsprechend. Diese Pflicht gilt für [3] Jahre nach Vertragsende fort. Gesetzliche Offenlegungspflichten und die in § 4 Abs. 3 genannten Pflichtangaben bleiben unberührt.
(2) Endkundendaten gehören zur Sphäre des Partners. Verarbeitet der Hersteller personenbezogene Daten von Endkunden (insbesondere bei Variante B des § 2 und bei Direktversand), schließen die Parteien einen Auftragsverarbeitungsvertrag nach Art. 28 DSGVO (Anlage 5). Der Hersteller nutzt Endkundendaten nicht für eigene Zwecke und kontaktiert Endkunden nicht, außer auf Weisung des Partners.
(3) Nach Vertragsende gibt der Hersteller die Endkundendaten [in einem gängigen Format] an den Partner heraus und löscht sie anschließend, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen.

§ 9 Gewährleistung und Haftung zwischen den Parteien
(1) [Bei Waren:] Der Partner untersucht gelieferte Ware unverzüglich und rügt offensichtliche Mängel innerhalb von [5] Werktagen, verdeckte Mängel unverzüglich nach Entdeckung (§ 377 HGB). Der Hersteller leistet bei Mängeln nach seiner Wahl Nachbesserung oder Ersatzlieferung; schlägt dies fehl, kann der Partner mindern oder vom Einzelliefervertrag zurücktreten. Mängelansprüche verjähren in [12] Monaten ab Lieferung; der Rückgriff des Partners bei Verbrauchsgüterkauf (§§ 445a, 445b BGB) bleibt unberührt.
(2) [Bei Software:] Der Hersteller beseitigt gemeldete Fehler, die die vereinbarte Funktion beeinträchtigen, innerhalb angemessener Frist; bis zur Behebung stellt er, soweit möglich, eine Umgehungslösung bereit. Die verschuldensunabhängige Haftung für anfängliche Mängel (§ 536a Abs. 1 BGB) ist ausgeschlossen.
(3) Jede Partei haftet unbeschränkt bei Vorsatz, grober Fahrlässigkeit, Schäden an Leben, Körper und Gesundheit, nach dem Produkthaftungsgesetz und im Umfang übernommener Garantien. Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt, höchstens auf [Betrag / die in den letzten 12 Monaten gezahlte Vergütung]; im Übrigen ist die Haftung bei leichter Fahrlässigkeit ausgeschlossen. Die Freistellungen nach § 5 Abs. 3 bleiben unberührt.

§ 10 Laufzeit, Kündigung und Übergang
(1) Der Vertrag beginnt am [Datum] und läuft [24] Monate. Er verlängert sich um jeweils [12] Monate, wenn er nicht mit einer Frist von [6] Monaten zum Ende der Laufzeit schriftlich gekündigt wird.
(2) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt, insbesondere bei Zahlungsverzug von mehr als [60] Tagen, Verstoß gegen §§ 4, 7 oder 8 trotz Abmahnung, Insolvenzantrag oder wiederholter Unterschreitung der Verfügbarkeit bzw. Lieferfristen.
(3) Nach Kündigung versorgt der Hersteller die bestehenden Endkunden des Partners für eine Übergangsfrist von [6] Monaten zu den bisherigen Bedingungen weiter, damit der Partner seine Endkundenverträge ordnungsgemäß beenden oder auf ein anderes Produkt umstellen kann; bei Kündigung wegen Zahlungsverzugs nur gegen Vorkasse. Der Partner darf vorhandene Lagerware innerhalb von [6] Monaten abverkaufen.
(4) Mit Vertragsende enden die wechselseitigen Nutzungsrechte an Marken und Branding-Vorgaben. Der Hersteller entfernt das Branding des Partners und gibt Druckdaten und Vorlagen zurück bzw. löscht sie. Die §§ 5 Abs. 3, 8 und 9 Abs. 3 gelten fort.

§ 11 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; das gilt auch für die Aufhebung dieser Klausel. Allgemeine Geschäftsbedingungen einer Partei gelten nur, soweit sie in diesem Vertrag ausdrücklich einbezogen sind.
(2) Rechte aus diesem Vertrag dürfen nur mit schriftlicher Zustimmung der anderen Partei übertragen werden; die Übertragung auf verbundene Unternehmen und Rechtsnachfolger im Rahmen einer Unternehmensveräußerung ist nach vorheriger Information zulässig.
(3) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(4) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Ausschließlicher Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort].
(5) Anlagen: Anlage 1 Produktbeschreibung und Verantwortlichkeiten, Anlage 2 Branding-Vorgaben, Anlage 3 Preisliste, Anlage 4 Wettbewerberliste (bei Variante C), Anlage 5 Auftragsverarbeitungsvertrag.

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Hersteller


______________________________
[Vorname Nachname], für den Partner

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
