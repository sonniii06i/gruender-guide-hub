// Inhalt der Vorlage „ug-gesellschaftsvertrag“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../gesellschaft.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann brauchst du einen eigenen UG-Gesellschaftsvertrag?",
        text: `Für die Gründung einer UG (haftungsbeschränkt) gibt es zwei Wege: das gesetzliche Musterprotokoll oder eine individuelle Satzung. Das Musterprotokoll ist günstig, taugt aber nur für maximal drei Gesellschafter und einen Geschäftsführer und enthält keine Regeln zu Vinkulierung, Einziehung, Abfindung oder Wettbewerbsverbot.

Ein eigener UG-Gesellschaftsvertrag ist der richtige Weg, wenn du mit Mitgründern startest, die nicht nur Kapital, sondern Arbeit einbringen, wenn ihr in ein bis zwei Jahren Investoren aufnehmen wollt oder wenn mehrere Geschäftsführer geplant sind. Auch wer heute allein gründet und später Partner aufnehmen will, spart sich mit einer vollständigen Satzung die zweite Beurkundung. Diese Vorlage ist dafür der Entwurf, den du zum Notartermin mitbringst: Die Beurkundung bleibt Pflicht, aber der Notar muss nur noch prüfen statt entwerfen.`,
      },
      {
        titel: "Was gehört in die UG-Satzung? Pflichtangaben und sinnvolle Klauseln",
        text: `Zwingend sind nach § 3 GmbHG nur Firma, Sitz, Unternehmensgegenstand, Stammkapital sowie Zahl und Nennbeträge der Geschäftsanteile jedes Gesellschafters. Alles Weitere ist freiwillig, entscheidet aber im Ernstfall. Die Vorlage regelt in zwölf Paragraphen:

- Firma mit dem Pflichtzusatz UG (haftungsbeschränkt), Sitz, Gegenstand und Geschäftsjahr (§ 1)
- Stammkapital, Stückelung in 1-Euro-Anteile und Volleinzahlung vor Anmeldung (§ 2)
- die gesetzliche Rücklage von 25 Prozent des Jahresüberschusses nach § 5a GmbHG (§ 3)
- Geschäftsführung, Vertretung, Befreiung von § 181 BGB und zustimmungspflichtige Geschäfte (§ 4)
- Gesellschafterversammlung, Einberufung in Textform, Videokonferenz, Mehrheiten (§ 5)
- Jahresabschluss und Ergebnisverwendung nach Dotierung der Rücklage (§ 6)
- Vinkulierung und Vorerwerbsrecht der Mitgesellschafter (§ 7)
- Einziehung von Anteilen bei Insolvenz, Pfändung, wichtigem Grund, Tod und Vesting (§ 8)
- Abfindung nach dem vereinfachten Ertragswertverfahren mit Abschlag und Raten (§ 9)
- Wettbewerbsverbot mit Vertragsstrafe (§ 10), Kündigung und Bekanntmachungen (§ 11)
- Gründungsaufwand, salvatorische Klausel, Gerichtsstand (§ 12)

Gerade die §§ 7 bis 9 fehlen im Musterprotokoll komplett. Ohne sie kann ein Mitgründer seinen Anteil an jeden verkaufen und eine Trennung endet vor Gericht.`,
      },
      {
        titel: "UG-Gesellschaftsvertrag Muster ausfüllen: die Platzhalter",
        text: `Arbeite die eckigen Klammern von oben nach unten ab:

- Gesellschafter mit Name, Geburtsdatum und Anschrift; den dritten Block löschen oder ergänzen.
- § 1: Firma ohne Sonderzeichen, Sitz (die politische Gemeinde, nicht die Straße), einen Gegenstand, der die geplante Tätigkeit konkret beschreibt, und das Ende des ersten Rumpfgeschäftsjahres.
- § 2: Stammkapital in Euro und die Anzahl der Anteile; dann je Gesellschafter die Anteilsnummern von bis und den Gesamtnennbetrag. Die Summe muss exakt dem Stammkapital entsprechen.
- § 4 Abs. 4: Schwellenwerte für Darlehen, Investitionen, Dauerschuldverträge und Gehälter, die zur Größe des Unternehmens passen.
- § 5: Frist für die ordentliche Versammlung und das Quorum für die Beschlussfähigkeit.
- § 7 Abs. 2: Annahmefrist für das Vorerwerbsrecht, meist vier Wochen.
- § 9: Prozentsatz für die reduzierte Abfindung bei Einziehung aus wichtigem Grund und die Zahl der Jahresraten.
- § 10 Abs. 2 und 3: bestehende Tätigkeiten, die erlaubt bleiben, und die Höhe der Vertragsstrafe.
- § 11: Kündigungsfrist und erster möglicher Kündigungstermin.
- § 12: Gründungsaufwand in Euro, den die Gesellschaft tragen darf.

Der ausgefüllte Entwurf geht als Word-Datei an den Notar. Unterschrieben wird erst im Termin, nicht vorher.`,
      },
      {
        titel: "Häufige Fehler bei der UG-Gründung mit eigener Satzung",
        text: `Fehler Nummer eins: ein Gründungsaufwand, der das Stammkapital übersteigt. Wer mit 500 EUR gründet und 800 EUR Notar- und Registerkosten in die Satzung schreibt, ist am ersten Tag bilanziell überschuldet. Setze das Stammkapital so, dass es die Gründungskosten und die ersten Rechnungen deckt.

Fehler zwei: Sacheinlagen. Bei der UG sind sie verboten; Laptop, Software oder Domain können nur nach der Gründung verkauft oder überlassen werden. Fehler drei: der Firmenzusatz. UG (haftungsbeschränkt) muss auf jeder Rechnung, E-Mail-Signatur und Website stehen. Wer nur UG schreibt, riskiert die persönliche Haftung.

Fehler vier: die Thesaurierung vergessen. Die UG darf nicht den vollen Gewinn ausschütten, ein Viertel muss in die Rücklage. Ein Ausschüttungsbeschluss ohne diesen Posten ist nichtig. Fehler fünf: ein zu weiter oder zu enger Unternehmensgegenstand. Zu eng heißt Satzungsänderung beim Notar, sobald ihr ein neues Produkt anbietet; zu weit und unbestimmt lehnt das Registergericht ab. Und schließlich: Nach der Gründung Transparenzregister und Gesellschafterliste nicht pflegen. Beides muss nach jedem Anteilswechsel aktualisiert werden, sonst drohen Bußgelder.`,
      },
      {
        titel: "Rechtliche Grundlagen der UG (haftungsbeschränkt)",
        text: `Die UG ist keine eigene Rechtsform, sondern eine GmbH mit kleinem Stammkapital nach § 5a GmbHG. Es gelten deshalb alle Vorschriften des GmbH-Gesetzes mit wenigen Besonderheiten:

- Stammkapital ab 1 EUR, Volleinzahlung vor der Anmeldung, keine Sacheinlagen (§ 5a Abs. 1 und 2 GmbHG)
- jährliche Rücklage von 25 Prozent des um einen Verlustvortrag geminderten Jahresüberschusses, bis das Stammkapital auf 25.000 EUR erhöht ist (§ 5a Abs. 3 und 5 GmbHG)
- Pflicht zur sofortigen Einberufung der Gesellschafterversammlung bei drohender Zahlungsunfähigkeit (§ 5a Abs. 4 GmbHG)

Der Gesellschaftsvertrag muss notariell beurkundet werden (§ 2 GmbHG), seit 2022 auch online per Videokonferenz mit dem Notar bei Bargründungen. Die Gesellschaft entsteht erst mit Eintragung ins Handelsregister; wer vorher im Namen der UG handelt, haftet persönlich (§ 11 GmbHG). Satzungsänderungen brauchen eine Dreiviertelmehrheit und erneut den Notar (§ 53 GmbHG). Anteilsübertragungen sind ebenfalls beurkundungspflichtig (§ 15 GmbHG). Nach der Eintragung folgen Gewerbeanmeldung, steuerliche Erfassung, Transparenzregister und, bei Mitarbeitern, die Betriebsnummer.`,
      },
      {
        titel: "Wann du statt der UG-Vorlage Notar, Anwalt oder Steuerberater brauchst",
        text: `Den Notar brauchst du in jedem Fall, denn ohne Beurkundung gibt es keine UG. Die Vorlage spart dir dort Zeit und Besprechungsaufwand, nicht den Termin. Zusätzlich solltest du vor dem Termin Rat holen, wenn

- eine GmbH, ein Verein oder eine ausländische Person Gesellschafter wird,
- ihr direkt bei Gründung eine Vesting-Vereinbarung, einen Beteiligungspool oder Investorenrechte verankern wollt,
- ein Gründer ein bestehendes Einzelunternehmen einbringen will; das geht bei der UG nur über einen Verkauf nach der Gründung und hat steuerliche Folgen,
- die Gesellschafter in verschiedenen Ländern wohnen oder Ehepartner beteiligt sind,
- das Geschäft eine Erlaubnis braucht, etwa Finanzdienstleistungen, Gesundheit oder Handwerk mit Meisterpflicht.

Ein Steuerberater lohnt sich schon bei der Frage, ob die UG überhaupt die richtige Rechtsform ist: Bei geringen Gewinnen und hohem Privatentnahmebedarf kann ein Einzelunternehmen günstiger sein als Körperschaftsteuer plus Kapitalertragsteuer. GründerX liefert mit dieser Vorlage das Muster als Software-Dokument und keine individuelle Rechtsberatung.`,
      },
    ],
  text: `Gesellschaftsvertrag der [Name] UG (haftungsbeschränkt)

Gesellschafter:

1. [Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
2. [Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
[3. ggf. weitere Gesellschafter]

§ 1 Firma, Sitz, Gegenstand
(1) Die Firma der Gesellschaft lautet: [Name] UG (haftungsbeschränkt).
(2) Sitz der Gesellschaft ist [Ort].
(3) Gegenstand des Unternehmens ist [genaue Beschreibung, z. B. „die Entwicklung und der Vertrieb von Software für kleine Unternehmen sowie damit zusammenhängende Dienstleistungen“].
(4) Die Gesellschaft darf alle Geschäfte vornehmen, die geeignet sind, den Gesellschaftszweck unmittelbar oder mittelbar zu fördern. Sie darf Zweigniederlassungen errichten und sich an anderen Unternehmen beteiligen.
(5) Die Gesellschaft ist auf unbestimmte Zeit errichtet. Geschäftsjahr ist das Kalenderjahr; das erste Geschäftsjahr ist ein Rumpfgeschäftsjahr und endet am 31.12.[Jahr].

§ 2 Stammkapital und Geschäftsanteile
(1) Das Stammkapital der Gesellschaft beträgt [Betrag, z. B. 1.000] EUR.
(2) Es ist eingeteilt in [Anzahl, z. B. 1.000] Geschäftsanteile mit einem Nennbetrag von je 1,00 EUR. Hiervon übernehmen:
   a) [Vorname Nachname] [Anzahl] Geschäftsanteile (Nr. 1 bis [Nr.]) im Gesamtnennbetrag von [Betrag] EUR,
   b) [Vorname Nachname] [Anzahl] Geschäftsanteile (Nr. [Nr.] bis [Nr.]) im Gesamtnennbetrag von [Betrag] EUR.
(3) Die Einlagen sind in Geld zu leisten und vor der Anmeldung der Gesellschaft zum Handelsregister in voller Höhe einzuzahlen (§ 5a Abs. 2 GmbHG). Sacheinlagen sind ausgeschlossen.

§ 3 Gesetzliche Rücklage
(1) Die Gesellschaft bildet eine gesetzliche Rücklage, in die jährlich ein Viertel des um einen Verlustvortrag aus dem Vorjahr geminderten Jahresüberschusses einzustellen ist (§ 5a Abs. 3 GmbHG).
(2) Die Rücklage darf nur verwendet werden für eine Kapitalerhöhung aus Gesellschaftsmitteln, zum Ausgleich eines Jahresfehlbetrags, der nicht durch einen Gewinnvortrag gedeckt ist, oder zum Ausgleich eines Verlustvortrags, der nicht durch einen Jahresüberschuss gedeckt ist.
(3) Die Pflicht nach Absatz 1 endet, sobald das Stammkapital durch Beschluss der Gesellschafter auf mindestens 25.000 EUR erhöht wurde. Die Gesellschafter streben die Erhöhung an, sobald die Rücklage dies zulässt.

§ 4 Geschäftsführung und Vertretung
(1) Die Gesellschaft hat einen oder mehrere Geschäftsführer. Ist nur ein Geschäftsführer bestellt, vertritt er die Gesellschaft allein. Sind mehrere bestellt, wird die Gesellschaft durch zwei Geschäftsführer gemeinsam oder durch einen Geschäftsführer zusammen mit einem Prokuristen vertreten.
(2) Die Gesellschafterversammlung kann einzelnen Geschäftsführern Einzelvertretungsbefugnis erteilen und sie von den Beschränkungen des § 181 BGB befreien.
(3) Die Geschäftsführer führen die Geschäfte mit der Sorgfalt eines ordentlichen Geschäftsmannes nach Gesetz, diesem Vertrag, einer etwaigen Geschäftsordnung und den Weisungen der Gesellschafterversammlung.
(4) Folgende Geschäfte bedürfen der vorherigen Zustimmung der Gesellschafterversammlung:
   a) Erwerb, Veräußerung und Belastung von Grundstücken und Beteiligungen,
   b) Aufnahme von Darlehen und Übernahme von Bürgschaften über [Betrag] EUR im Einzelfall,
   c) Investitionen und Verpflichtungen über [Betrag] EUR im Einzelfall oder [Betrag] EUR im Geschäftsjahr,
   d) Abschluss und Kündigung von Miet-, Leasing- und Dauerschuldverträgen mit einer Laufzeit über [z. B. 12] Monate,
   e) Einstellung von Mitarbeitern mit einem Jahresgehalt über [Betrag] EUR,
   f) Erteilung von Prokura und Generalvollmacht,
   g) Aufnahme neuer und Aufgabe bestehender Geschäftszweige.
(5) Der erste Geschäftsführer wird in der Gründungsurkunde bestellt.

§ 5 Gesellschafterversammlung und Beschlüsse
(1) Die ordentliche Gesellschafterversammlung findet innerhalb von [z. B. 6] Monaten nach Ende des Geschäftsjahres statt. Außerordentliche Versammlungen sind einzuberufen, wenn das Interesse der Gesellschaft es erfordert oder Gesellschafter mit mindestens 10 % des Stammkapitals dies verlangen.
(2) Die Einberufung erfolgt durch die Geschäftsführung mit einer Frist von mindestens zwei Wochen in Textform (auch per E-Mail an die zuletzt mitgeteilte Adresse) unter Angabe der Tagesordnung. Der Tag der Absendung und der Tag der Versammlung werden nicht mitgerechnet.
(3) Versammlungen können auch per Video- oder Telefonkonferenz abgehalten werden. Beschlüsse können außerhalb einer Versammlung in Textform gefasst werden, wenn alle Gesellschafter mit dieser Form einverstanden sind oder sich an der Abstimmung beteiligen.
(4) Die Versammlung ist beschlussfähig, wenn mindestens [z. B. 75] % des Stammkapitals vertreten sind. Ist sie nicht beschlussfähig, ist mit gleicher Tagesordnung eine neue Versammlung einzuberufen, die ohne Rücksicht auf das vertretene Kapital beschlussfähig ist; hierauf ist in der Einladung hinzuweisen.
(5) Je 1,00 EUR eines Geschäftsanteils gewährt eine Stimme. Beschlüsse werden mit einfacher Mehrheit der abgegebenen Stimmen gefasst, soweit Gesetz oder dieser Vertrag nicht eine größere Mehrheit vorsehen. Änderungen dieses Vertrags, Kapitalmaßnahmen, Auflösung und Umwandlung bedürfen einer Mehrheit von drei Vierteln der abgegebenen Stimmen.
(6) Über jede Versammlung und jeden Beschluss ist eine Niederschrift zu fertigen, die vom Versammlungsleiter zu unterzeichnen und allen Gesellschaftern zu übermitteln ist. Beschlüsse können nur innerhalb eines Monats nach Zugang der Niederschrift durch Klage angefochten werden.

§ 6 Jahresabschluss und Ergebnisverwendung
(1) Die Geschäftsführer stellen den Jahresabschluss innerhalb der gesetzlichen Fristen auf und legen ihn den Gesellschaftern unverzüglich vor.
(2) Die Gesellschafter beschließen über die Feststellung des Jahresabschlusses und die Verwendung des Ergebnisses. Vor jeder Ausschüttung ist die Rücklage nach § 3 zu bilden.
(3) Der nach Dotierung der Rücklage verbleibende Gewinn wird im Verhältnis der Geschäftsanteile verteilt, soweit die Gesellschafter nicht mit drei Vierteln der Stimmen eine Thesaurierung beschließen.

§ 7 Verfügung über Geschäftsanteile
(1) Die Abtretung, Verpfändung oder sonstige Belastung von Geschäftsanteilen oder Teilen davon bedarf der Zustimmung der Gesellschafterversammlung mit einer Mehrheit von drei Vierteln der abgegebenen Stimmen (§ 15 Abs. 5 GmbHG). Der betroffene Gesellschafter hat kein Stimmrecht.
(2) Will ein Gesellschafter seinen Geschäftsanteil an einen Dritten veräußern, hat er ihn zunächst den übrigen Gesellschaftern im Verhältnis ihrer Beteiligung zu den mit dem Dritten ausgehandelten Bedingungen schriftlich anzubieten. Das Angebot kann innerhalb von [z. B. 4] Wochen angenommen werden. Nicht ausgeübte Rechte wachsen den übrigen Gesellschaftern anteilig zu.
(3) Eine Veräußerung an den Dritten ist nur zulässig, wenn kein Gesellschafter das Angebot angenommen hat, zu Bedingungen, die nicht günstiger sind als die angebotenen, und innerhalb von drei Monaten nach Ablauf der Annahmefrist.

§ 8 Einziehung von Geschäftsanteilen
(1) Die Einziehung von Geschäftsanteilen ist mit Zustimmung des betroffenen Gesellschafters jederzeit zulässig.
(2) Ohne Zustimmung des Betroffenen kann die Einziehung beschlossen werden, wenn
   a) über sein Vermögen das Insolvenzverfahren eröffnet oder die Eröffnung mangels Masse abgelehnt wird,
   b) der Geschäftsanteil gepfändet wird und die Pfändung nicht innerhalb von drei Monaten aufgehoben wird,
   c) der Gesellschafter gegen § 7 oder § 10 verstößt oder einen sonstigen wichtigen Grund in seiner Person setzt, der den übrigen Gesellschaftern die Fortsetzung mit ihm unzumutbar macht,
   d) der Gesellschafter stirbt und die Erben nicht Gesellschafter oder Ehegatten eines Gesellschafters sind,
   e) eine gesonderte Vereinbarung (z. B. Vesting) dies vorsieht.
(3) Der Beschluss bedarf einer Mehrheit von drei Vierteln der abgegebenen Stimmen; der Betroffene hat kein Stimmrecht. Statt der Einziehung kann die Gesellschafterversammlung beschließen, dass der Anteil an die Gesellschaft, einen Gesellschafter oder einen Dritten abzutreten ist.
(4) Die Einziehung darf nur erfolgen, wenn die Abfindung aus freiem, nicht zur Erhaltung des Stammkapitals erforderlichem Vermögen gezahlt werden kann (§§ 30, 34 GmbHG).

§ 9 Abfindung
(1) Der ausscheidende Gesellschafter erhält eine Abfindung in Höhe des Verkehrswerts seines Geschäftsanteils. Der Verkehrswert wird nach dem vereinfachten Ertragswertverfahren (§§ 199 ff. BewG) zum Stichtag des Ausscheidens ermittelt, sofern die Beteiligten sich nicht innerhalb von zwei Monaten auf einen Wert einigen.
(2) In den Fällen des § 8 Abs. 2 lit. a bis c beträgt die Abfindung [z. B. 60] % des Werts nach Absatz 1, höchstens jedoch den Buchwert.
(3) Die Abfindung ist in [z. B. 3] gleichen Jahresraten zu zahlen, die erste Rate sechs Monate nach dem Stichtag. Der offene Betrag wird mit 2 Prozentpunkten über dem Basiszinssatz verzinst. Sicherheiten können nicht verlangt werden.
(4) Streit über die Höhe entscheidet ein von der Industrie- und Handelskammer [Ort] benannter Wirtschaftsprüfer als Schiedsgutachter. Die Kosten tragen Gesellschaft und Ausscheidender je zur Hälfte.

§ 10 Wettbewerbsverbot
(1) Kein Gesellschafter darf während seiner Zugehörigkeit zur Gesellschaft im Geschäftsbereich der Gesellschaft für eigene oder fremde Rechnung tätig werden oder sich an einem Wettbewerber beteiligen. Beteiligungen unter 5 % an börsennotierten Gesellschaften sind erlaubt.
(2) Die Gesellschafterversammlung kann durch Beschluss Befreiung erteilen. Bestehende Tätigkeiten: [z. B. „keine“ oder Aufzählung].
(3) Bei Verstoß kann die Gesellschaft eine Vertragsstrafe von [Betrag] EUR je Fall und darüber hinausgehenden Schadensersatz verlangen.

§ 11 Dauer, Kündigung, Bekanntmachungen
(1) Jeder Gesellschafter kann seine Beteiligung mit einer Frist von [z. B. 6] Monaten zum Ende eines Geschäftsjahres kündigen, erstmals zum [Datum]. Die Kündigung ist durch eingeschriebenen Brief an die Gesellschaft zu erklären.
(2) Die Kündigung führt nicht zur Auflösung. Der Geschäftsanteil des Kündigenden wird nach § 8 Abs. 3 eingezogen oder abgetreten; die Abfindung bestimmt sich nach § 9 Abs. 1.
(3) Bekanntmachungen der Gesellschaft erfolgen im Bundesanzeiger.

§ 12 Gründungsaufwand und Schlussbestimmungen
(1) Die Gesellschaft trägt die mit der Gründung verbundenen Kosten (Notar, Handelsregister, Veröffentlichung, Beratung) bis zu einem Betrag von [Betrag, z. B. 300] EUR. Darüber hinausgehende Kosten tragen die Gesellschafter im Verhältnis ihrer Beteiligung.
(2) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung oder, soweit dispositiv, eine wirksame Regelung, die dem Zweck am nächsten kommt.
(3) Nebenabreden zwischen den Gesellschaftern bedürfen der Schriftform, soweit nicht das Gesetz die notarielle Form verlangt.
(4) Gerichtsstand für Streitigkeiten aus diesem Vertrag ist, soweit zulässig, der Sitz der Gesellschaft. Es gilt deutsches Recht.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Gesellschafter


______________________________
[Vorname Nachname], Gesellschafter

(Notarielle Beurkundung erforderlich, § 2 GmbHG)

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
