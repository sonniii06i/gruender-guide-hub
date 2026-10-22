// Inhalt der Vorlage „rahmenvertrag-dienstleistungen“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../dienstleistung.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen Rahmenvertrag brauchst",
        text: `Ein Rahmenvertrag lohnt sich, sobald du mit demselben Partner öfter als zweimal arbeitest und nicht jedes Mal Haftung, Geheimhaltung und Preise neu verhandeln willst. Typische Fälle: Eine IT-Beratung liefert für einen Kunden laufend Projekte unterschiedlicher Größe. Eine Designagentur produziert wiederkehrend Content für mehrere Marken eines Konzerns. Ein Logistikdienstleister übernimmt saisonal Lager- und Versandaufträge.

Als Auftraggeber nutzt du das Muster, um einen Lieferantenpool mit einheitlichen Bedingungen aufzubauen; als Dienstleister, um deinem Stammkunden Einzelaufträge per E-Mail oder Ticket anbieten zu können. Der Rahmenvertrag selbst verpflichtet zu nichts; erst der Einzelauftrag (Statement of Work) löst Leistung und Zahlung aus. Genau das macht ihn flexibel.`,
      },
      {
        titel: "Was muss in einen Rahmenvertrag für Dienstleistungen?",
        text: `Ein Rahmenvertrag ist ein Regelwerk für künftige Aufträge. Die Vorlage legt in dreizehn Paragrafen fest:

- § 1 Gegenstand und Struktur: was jeder Einzelauftrag mindestens enthalten muss, optional eine Mindestabnahme
- § 2 Rangfolge der Dokumente und Ausschluss fremder AGB und Einkaufsbedingungen
- § 3 Zustandekommen von Einzelaufträgen: Anfrage, Angebot, Annahme in Textform, vereinfachter Abruf bis zu einem Schwellenwert, Änderungsverfahren
- § 4 Leistungserbringung, Schlüsselpersonen, Subunternehmer, Mitwirkung
- § 5 Basis-Service-Level mit Servicezeiten, Reaktionszeiten nach Priorität, optional Gutschriften
- § 6 Preisliste mit Tages- und Stundensätzen, jährliche Preisanpassung
- § 7 Abrechnung, Tätigkeitsnachweis, Zahlungsziel, Zurückbehaltung
- § 8 Abnahme bei Werkleistungen, § 9 Nutzungsrechte
- § 10 Geheimhaltung und Auftragsverarbeitung für alle Einzelaufträge
- § 11 Haftung je Einzelauftrag und je Vertragsjahr, Versicherung
- § 12 Laufzeit, Kündigung und Fortgeltung für laufende Einzelaufträge
- § 13 Schlussbestimmungen plus Muster eines Einzelauftrags als Anlage 2

Die Rangfolge in § 2 ist der Teil, den du am sorgfältigsten lesen solltest: Sie bestimmt, was gilt, wenn Einzelauftrag und Rahmenvertrag sich widersprechen.`,
      },
      {
        titel: "Rahmenvertrag Muster ausfüllen",
        text: `Trage beide Unternehmen ein und beschreibe in § 1 den Leistungsbereich, etwa Softwareentwicklung, Design oder Logistik. Entscheide, ob eine Mindestabnahme pro Jahr vereinbart wird; als Dienstleister ist das deine wichtigste Verhandlungsposition. In § 3 nennst du die Personen, die Einzelaufträge erteilen und annehmen dürfen, setzt die Angebotsfrist und den Schwellenwert für vereinfachte Abrufe.

In § 5 legst du Servicezeiten, Reaktionszeiten je Priorität und den Meldeweg fest. Behalte die Gutschriftenregel nur, wenn du Reaktionszeiten tatsächlich messen kannst. In § 6 verweist du auf die Preisliste in Anlage 1 und trägst Anpassungstermin, Frist und Obergrenze ein. In § 7 setzt du Zahlungsplan für Festpreise, Beanstandungsfrist und Zahlungsziel, in § 8 Prüffrist und Verjährung, in § 9 ausschließliche oder einfache Rechte. In § 11 trägst du die Haftungsgrenzen und die Deckungssumme ein, in § 12 Beginn, Laufzeit und Kündigungsfristen. Fülle das Muster des Einzelauftrags in Anlage 2 einmal beispielhaft aus, damit beide Seiten wissen, wie Abrufe aussehen sollen.`,
      },
      {
        titel: "Typische Fehler bei Rahmenverträgen",
        text: `Der häufigste Fehler: Der Einzelauftrag weicht vom Rahmenvertrag ab, ohne das zu sagen. Dann gilt nach § 2 der Rahmenvertrag, und der im Einzelauftrag vereinbarte Sonderpreis ist angreifbar. Kennzeichne Abweichungen ausdrücklich, wie Anlage 2 es vorsieht.

Zweiter Fehler: Einkaufsbedingungen des Kunden auf jeder Bestellung. Ohne den Ausschluss in § 2 Abs. 2 rutschen sie mit jedem Abruf hinein. Dritter Fehler: Der Rahmenvertrag wird gekündigt und niemand weiß, ob laufende Projekte noch nach seinen Regeln abgerechnet werden; § 12 Abs. 3 klärt das.

Weitere Stolperfallen sind Service-Level ohne Messverfahren, Mindestabnahmen, die der Dienstleister erwartet, aber nie hineingeschrieben hat, Schlüsselpersonen, die ohne Regel ausgetauscht werden, und Einzelaufträge aus einem Satz per Chat, bei denen später Leistung, Termin und Preis fehlen. Nutze das Muster in Anlage 2 für jeden Abruf.`,
      },
      {
        titel: "Rechtliche Grundlagen für Rahmenvertrag und Einzelauftrag",
        text: `Der Rahmenvertrag ist gesetzlich nicht eigens geregelt; er ist ein Vertrag nach den allgemeinen Regeln der §§ 145 ff. BGB über Angebot und Annahme, der die Bedingungen künftiger Verträge festlegt. Jeder Einzelauftrag ist je nach Inhalt ein Dienstvertrag nach § 611 BGB oder ein Werkvertrag nach § 631 BGB mit Abnahme nach § 640 BGB und Mängelrechten nach § 634 BGB.

Weil der Rahmenvertrag für viele Aufträge vorformuliert ist, gelten seine Klauseln regelmäßig als Allgemeine Geschäftsbedingungen nach § 305 BGB; die Inhaltskontrolle der §§ 307 ff. BGB greift auch zwischen Unternehmen, besonders bei Haftung, Vertragsstrafen und Gutschriften. Widersprechende AGB beider Seiten heben sich nach der Rechtsprechung gegenseitig auf, deshalb der ausdrückliche Ausschluss in § 2. Für Zahlungsverzug gilt § 288 BGB, für die freie Kündigung von Werkleistungen § 648 BGB. Für Datenverarbeitung im Auftrag verlangt Art. 28 DSGVO einen Vertrag, den die Vorlage als Anlage 3 für alle Einzelaufträge mitgelten lässt.`,
      },
      {
        titel: "Wann der Rahmenvertrag nicht reicht",
        text: `Bei Rahmenverträgen mit großen Konzernen, öffentlichen Auftraggebern oder im regulierten Umfeld wie Banken und Gesundheitswesen kommen Compliance-Anhänge, Auditrechte und besondere Service-Level dazu; dort solltest du mit Anwalt verhandeln. Dasselbe gilt für Rahmenverträge mit hohen Mindestabnahmen, für Exklusivität oder Wettbewerbsverbote und für Verträge mit Partnern außerhalb Deutschlands.

Soll der Rahmenvertrag Arbeitnehmerüberlassung oder Personalgestellung abdecken, ist er das falsche Instrument; dafür gilt das AÜG mit Erlaubnispflicht. Für reine Betriebs- und Wartungsleistungen mit harten Wiederherstellungszeiten brauchst du einen ausgearbeiteten SLA-Vertrag statt des Basis-Service-Levels in § 5. GründerX stellt das Muster als Software bereit und ersetzt keine Rechtsberatung.`,
      },
    ],
  text: `Rahmenvertrag über Dienstleistungen

zwischen

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Auftraggeber“ –

und

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Auftragnehmer“ –

– gemeinsam „die Parteien“ –

§ 1 Gegenstand und Struktur
(1) Dieser Rahmenvertrag regelt die allgemeinen Bedingungen, zu denen der Auftragnehmer für den Auftraggeber Leistungen im Bereich [z. B. „Softwareentwicklung und IT-Beratung“ / „Grafikdesign und Content-Produktion“ / „Logistik- und Lagerdienstleistungen“] erbringt.
(2) Die konkreten Leistungen werden in Einzelaufträgen („Einzelauftrag“ oder „Statement of Work“) vereinbart. Jeder Einzelauftrag enthält mindestens: Leistungsbeschreibung, Art der Leistung (Dienst- oder Werkleistung), Termine oder Laufzeit, Vergütung oder Abrechnungsmodell, Ansprechpartner und ggf. besondere Anforderungen.
(3) Dieser Rahmenvertrag begründet für sich keine Pflicht des Auftraggebers, Einzelaufträge zu erteilen, und keine Pflicht des Auftragnehmers, Einzelaufträge anzunehmen. [Optional: Der Auftraggeber verpflichtet sich zur Abnahme von mindestens [Anzahl] Personentagen bzw. [Betrag] EUR netto je Vertragsjahr.]
(4) Für jeden Einzelauftrag gelten die Bestimmungen dieses Rahmenvertrags, ohne dass es einer erneuten Bezugnahme bedarf.

§ 2 Rangfolge der Vertragsdokumente
(1) Bei Widersprüchen gilt folgende Rangfolge: 1. der jeweilige Einzelauftrag, soweit er ausdrücklich von diesem Rahmenvertrag abweicht und die Abweichung als solche kennzeichnet; 2. dieser Rahmenvertrag mit seinen Anlagen; 3. der Einzelauftrag im Übrigen; 4. sonstige Unterlagen (Angebote, Leistungsbeschreibungen, Protokolle).
(2) Allgemeine Geschäfts-, Einkaufs- oder Lieferbedingungen einer Partei gelten nicht, auch wenn ihnen nicht ausdrücklich widersprochen wird und auch wenn sie auf Bestellungen, Rechnungen oder Auftragsbestätigungen verwiesen werden.

§ 3 Zustandekommen von Einzelaufträgen
(1) Der Auftraggeber fragt Leistungen in Textform an. Der Auftragnehmer unterbreitet innerhalb von [z. B. 5] Werktagen ein Angebot in Form eines Einzelauftrags nach dem Muster in Anlage 2.
(2) Ein Einzelauftrag kommt zustande, wenn beide Parteien ihn unterzeichnen oder der Auftraggeber das Angebot in Textform annimmt (E-Mail genügt). Zur Erteilung und Annahme von Einzelaufträgen sind berechtigt: für den Auftraggeber [Vorname Nachname, Funktion], für den Auftragnehmer [Vorname Nachname, Funktion]; Änderungen werden in Textform mitgeteilt.
(3) Für Einzelaufträge bis zu einem Nettowert von [Betrag] EUR genügt ein Abruf des Auftraggebers über [z. B. das Ticketsystem / per E-Mail] unter Angabe von Leistung, Termin und Preislistenposition; der Einzelauftrag kommt mit Bestätigung des Auftragnehmers in Textform zustande.
(4) Änderungen eines laufenden Einzelauftrags (Umfang, Termine, Vergütung) bedürfen einer Änderungsvereinbarung in Textform. Der Auftragnehmer teilt die Auswirkungen eines Änderungswunsches auf Aufwand und Termine innerhalb von [z. B. 5] Werktagen mit.

§ 4 Leistungserbringung und Personal
(1) Der Auftragnehmer erbringt die Leistungen nach dem Stand der Technik und den anerkannten Regeln seines Fachs mit qualifiziertem Personal. Er bestimmt die Ausführung in eigener Verantwortung; sein Personal unterliegt keinen Weisungen des Auftraggebers und wird nicht in dessen Betrieb eingegliedert.
(2) Im Einzelauftrag namentlich benannte Schlüsselpersonen tauscht der Auftragnehmer nur aus wichtigem Grund (z. B. Ausscheiden, längere Krankheit) gegen gleichwertig qualifizierte Personen aus und informiert den Auftraggeber vorab. Der Auftraggeber kann aus sachlichem Grund den Austausch einer Person verlangen.
(3) Subunternehmer dürfen nur mit Zustimmung des Auftraggebers in Textform eingesetzt werden; der Auftragnehmer haftet für sie wie für eigenes Handeln und verpflichtet sie entsprechend § 10.
(4) Der Auftraggeber erbringt die im Einzelauftrag beschriebenen Mitwirkungsleistungen (Informationen, Zugänge, Freigaben) rechtzeitig. Verzögerungen aus unterlassener Mitwirkung verschieben Termine und berechtigen zur Abrechnung des Mehraufwands nach Preisliste.

§ 5 Service-Level (Basis)
(1) Soweit ein Einzelauftrag laufende Betriebs-, Support- oder Wartungsleistungen umfasst, gelten, wenn der Einzelauftrag nichts anderes bestimmt, folgende Mindestanforderungen:
   a) Servicezeiten: Montag bis Freitag [z. B. 9–17 Uhr], ausgenommen bundeseinheitliche Feiertage,
   b) Reaktionszeit (Rückmeldung mit Einschätzung) innerhalb der Servicezeit: Priorität 1 (Betriebsstillstand) [z. B. 2] Stunden, Priorität 2 (wesentliche Beeinträchtigung) [z. B. 8] Stunden, Priorität 3 (sonstige) [z. B. 2] Werktage,
   c) Meldeweg: [z. B. Ticketsystem [URL], E-Mail [Adresse], Telefon [Nummer]].
(2) Wiederherstellungs- oder Lösungszeiten werden nur geschuldet, wenn sie im Einzelauftrag ausdrücklich vereinbart sind. Die Einhaltung von Reaktionszeiten wird je Kalendermonat auf Grundlage der Ticketdaten gemessen.
(3) [Optional: Unterschreitet der Auftragnehmer in einem Monat die vereinbarte Quote eingehaltener Reaktionszeiten von [z. B. 95] %, erhält der Auftraggeber eine Gutschrift von [z. B. 5] % der monatlichen Vergütung des betroffenen Einzelauftrags je angefangene [5] Prozentpunkte Unterschreitung, höchstens [z. B. 20] % der Monatsvergütung. Weitergehende Ansprüche richten sich nach § 11; Gutschriften werden angerechnet.]
(4) Nicht als Verletzung des Service-Levels gelten Zeiten, die auf fehlender Mitwirkung des Auftraggebers, Störungen bei Dritten (Hosting, Telekommunikation, Plattformen), angekündigten Wartungsfenstern oder höherer Gewalt beruhen.

§ 6 Preise und Preisliste
(1) Es gelten die Preise der Preisliste in Anlage 1 (Stunden- und Tagessätze nach Rollen, Pauschalen für Standardleistungen, Reisekosten). Abweichende Preise im Einzelauftrag müssen ausdrücklich als Abweichung gekennzeichnet sein.
(2) Alle Preise verstehen sich netto zuzüglich gesetzlicher Umsatzsteuer. Ein Personentag umfasst 8 Stunden; Teilzeiten werden im [Halbtages- / Stunden-]Takt abgerechnet.
(3) Der Auftragnehmer kann die Preisliste jeweils zum [z. B. 1. Januar] eines Jahres mit einer Ankündigungsfrist von [z. B. 3] Monaten um höchstens [z. B. 5] % anpassen, erstmals zum [Datum]. Für bereits erteilte Einzelaufträge mit Festpreis gilt die Anpassung nicht. Widerspricht der Auftraggeber, kann der Auftragnehmer den Rahmenvertrag zum Wirksamwerden der Anpassung kündigen.
(4) Reisekosten werden nur nach Freigabe in Textform und nach den Sätzen der Preisliste erstattet.

§ 7 Abrechnung und Zahlung
(1) Leistungen nach Aufwand werden monatlich mit Tätigkeitsnachweis (Datum, Person, Dauer, Tätigkeit, Einzelauftrag) abgerechnet; Festpreise nach dem Zahlungsplan des Einzelauftrags, mangels Zahlungsplan [z. B. 40] % bei Beauftragung und [z. B. 60] % nach Abnahme. Beanstandet der Auftraggeber einen Tätigkeitsnachweis nicht innerhalb von [z. B. 10] Werktagen in Textform, gilt er als anerkannt; die Rechnung weist darauf hin.
(2) Rechnungen sind innerhalb von [z. B. 30] Tagen nach Zugang ohne Abzug zahlbar. Jede Rechnung nennt die Nummer des Einzelauftrags und eine vom Auftraggeber vorgegebene Bestell- oder Kostenstellennummer, soweit mitgeteilt.
(3) Bei Zahlungsverzug gelten Verzugszinsen von 9 Prozentpunkten über dem Basiszinssatz und die Pauschale nach § 288 Abs. 5 BGB. Bei Verzug mit mehr als [z. B. zwei] Rechnungen darf der Auftragnehmer nach Ankündigung mit [z. B. 10] Tagen Frist die Leistungen aus allen Einzelaufträgen zurückhalten.
(4) Aufrechnung und Zurückbehaltung sind dem Auftraggeber nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen gestattet.

§ 8 Abnahme bei Werkleistungen
(1) Ist eine Leistung im Einzelauftrag als Werkleistung bezeichnet, zeigt der Auftragnehmer die Fertigstellung in Textform an. Der Auftraggeber prüft innerhalb von [z. B. 10] Werktagen und erklärt die Abnahme oder rügt konkrete Mängel in Textform. Unwesentliche Mängel berechtigen nicht zur Verweigerung der Abnahme; sie werden im Protokoll festgehalten und nachgebessert.
(2) Rügt der Auftraggeber innerhalb der Frist keinen Mangel oder nimmt er die Leistung produktiv in Gebrauch, gilt sie als abgenommen; der Auftragnehmer weist in der Fertigstellungsanzeige auf diese Folge hin.
(3) Mängelansprüche verjähren in [z. B. 12] Monaten ab Abnahme, ausgenommen Vorsatz, Arglist und Ansprüche nach § 11 Abs. 1. Für Dienstleistungen gibt es keine Abnahme; die Vergütung ist nach Leistungserbringung fällig.

§ 9 Nutzungsrechte
(1) An allen im Rahmen von Einzelaufträgen erstellten Arbeitsergebnissen räumt der Auftragnehmer dem Auftraggeber mit vollständiger Zahlung das [ausschließliche / einfache], zeitlich, räumlich und inhaltlich unbeschränkte Recht ein, sie für eigene Zwecke zu nutzen, zu vervielfältigen, zu bearbeiten, zu verbreiten und öffentlich zugänglich zu machen. Abweichungen regelt der Einzelauftrag.
(2) Vorbestehende Werkzeuge, Bibliotheken, Methoden und Standardkomponenten des Auftragnehmers bleiben sein Eigentum; der Auftraggeber erhält daran ein einfaches, unbeschränktes Nutzungsrecht, soweit es für die Nutzung der Arbeitsergebnisse erforderlich ist. Für Fremd- und Open-Source-Komponenten gelten deren Lizenzen; der Auftragnehmer legt eine Komponentenliste vor.

§ 10 Geheimhaltung, Datenschutz
(1) Beide Parteien behandeln alle vertraulichen Informationen und Geschäftsgeheimnisse der anderen Partei, die ihnen im Zusammenhang mit diesem Rahmenvertrag oder einem Einzelauftrag bekannt werden, vertraulich und verwenden sie nur zur Vertragsdurchführung. Die Pflicht gilt [z. B. 5] Jahre über das Ende des Rahmenvertrags hinaus, für Geschäftsgeheimnisse im Sinne des GeschGehG unbegrenzt. Übliche Ausnahmen (öffentlich bekannt, rechtmäßig vorbekannt, gesetzliche Offenlegungspflicht) gelten.
(2) Soweit der Auftragnehmer personenbezogene Daten im Auftrag des Auftraggebers verarbeitet, gilt der Auftragsverarbeitungsvertrag in Anlage 3 für alle Einzelaufträge. Der Auftragnehmer verpflichtet sein Personal zur Vertraulichkeit und setzt angemessene technische und organisatorische Maßnahmen um.
(3) Der Auftragnehmer darf den Auftraggeber nur nach Zustimmung in Textform als Referenz nennen.

§ 11 Haftung
(1) Jede Partei haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit, für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, für arglistig verschwiegene Mängel, übernommene Garantien und nach dem Produkthaftungsgesetz.
(2) Bei leichter Fahrlässigkeit haftet der Auftragnehmer nur bei Verletzung wesentlicher Vertragspflichten, begrenzt auf den vertragstypischen, vorhersehbaren Schaden, je Einzelauftrag höchstens auf [z. B. 100] % der Nettovergütung des betroffenen Einzelauftrags, insgesamt je Vertragsjahr höchstens auf [Betrag] EUR.
(3) Für Datenverlust haftet der Auftragnehmer nur bis zum Wiederherstellungsaufwand bei ordnungsgemäßer Datensicherung durch den Auftraggeber, soweit die Datensicherung nicht Teil des Einzelauftrags ist.
(4) Der Auftragnehmer unterhält eine Betriebs- und Vermögensschadenhaftpflichtversicherung mit einer Deckungssumme von mindestens [Betrag] EUR je Schadensfall und weist sie auf Verlangen nach.

§ 12 Laufzeit und Kündigung
(1) Dieser Rahmenvertrag beginnt am [Datum] und läuft [auf unbestimmte Zeit / bis zum [Datum] und verlängert sich jeweils um 12 Monate, wenn er nicht mit einer Frist von [z. B. 3] Monaten zum Laufzeitende gekündigt wird]. Er kann von jeder Partei mit einer Frist von [z. B. 3] Monaten zum Monatsende gekündigt werden.
(2) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt, insbesondere bei nachhaltiger Verletzung wesentlicher Pflichten trotz Abmahnung mit Fristsetzung, bei Zahlungsverzug mit zwei Rechnungen oder bei Insolvenz einer Partei.
(3) Die Kündigung des Rahmenvertrags berührt bereits erteilte Einzelaufträge nicht; sie werden zu den Bedingungen dieses Rahmenvertrags abgewickelt, sofern sie nicht gesondert gekündigt werden. Nach Zugang der Kündigung dürfen keine neuen Einzelaufträge abgerufen werden. Einzelaufträge mit Dienstleistungscharakter können gesondert mit einer Frist von [z. B. 4] Wochen zum Monatsende gekündigt werden; für Werkleistungen gilt § 648 BGB.
(4) Kündigungen bedürfen der Schriftform. Nach Beendigung übergibt der Auftragnehmer alle Arbeitsergebnisse, Unterlagen und Daten des Auftraggebers und löscht verbleibende Kopien, soweit keine Aufbewahrungspflichten bestehen.

§ 13 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Rahmenvertrags bedürfen der Schriftform; Einzelaufträge und deren Änderungen der Textform. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An ihre Stelle tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(3) Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort].
(4) Anlagen: Anlage 1 Preisliste, Anlage 2 Muster Einzelauftrag, Anlage 3 Auftragsverarbeitungsvertrag.
(5) Jede Partei erhält eine unterschriebene Ausfertigung.

Anlage 2 – Muster Einzelauftrag Nr. [Nummer] zum Rahmenvertrag vom [Datum]
1. Leistung: [Beschreibung]
2. Art: [Dienstleistung / Werkleistung]
3. Termine / Laufzeit: [Beginn, Meilensteine, Ende]
4. Vergütung: [Festpreis [Betrag] EUR / nach Aufwand gemäß Preisliste, Budget [Betrag] EUR]
5. Ansprechpartner: [Auftraggeber / Auftragnehmer]
6. Besonderheiten / Abweichungen vom Rahmenvertrag: [keine / Beschreibung]
Annahme in Textform: [Datum, Namen]

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Auftraggeber


______________________________
[Vorname Nachname], für den Auftragnehmer

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
