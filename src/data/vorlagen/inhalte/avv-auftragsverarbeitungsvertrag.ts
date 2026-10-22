// Inhalt der Vorlage „avv-auftragsverarbeitungsvertrag“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../ecommerce.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen Auftragsverarbeitungsvertrag brauchst",
        text: `Ein AVV ist Pflicht, sobald ein Dienstleister personenbezogene Daten in deinem Auftrag und nach deinen Weisungen verarbeitet. Im Online-Handel ist das fast immer der Fall: Das Fulfillment-Lager kennt die Adressen deiner Kunden, das Newsletter-Tool die E-Mail-Adressen, der Hoster speichert die Datenbank des Shops, die Agentur greift auf das Kundenkonto zu. Ohne AVV ist jede dieser Weitergaben ein Datenschutzverstoß, der dich als Verantwortlichen trifft.

Die Vorlage funktioniert in beide Richtungen. Als Shop-Betreiber legst du sie Dienstleistern vor, die keinen eigenen Vertrag stellen. Als Dienstleister, Freelancer oder Agentur nutzt du sie, um Kunden einen fertigen AVV anzubieten. Keinen AVV brauchst du bei Stellen, die eigenverantwortlich handeln, etwa Steuerberater, Anwälte, Paketdienste oder Zahlungsdienstleister; dort erfolgt die Übermittlung auf eigener Rechtsgrundlage.`,
      },
      {
        titel: "Was in einen AVV nach Art. 28 DSGVO gehört",
        text: `Art. 28 Abs. 3 DSGVO schreibt den Mindestinhalt vor. Die Vorlage bildet ihn in elf Paragrafen und drei Anlagen ab:

- Gegenstand, Dauer und Ort der Verarbeitung (§ 1)
- Art, Zweck, Datenkategorien und betroffene Personen mit Verweis auf Anlage 1 (§ 2)
- Verarbeitung nur auf dokumentierte Weisung und Benennung der weisungsberechtigten Personen (§ 3)
- Vertraulichkeitspflicht der Mitarbeiter, Datenschutzbeauftragter, Verarbeitungsverzeichnis (§ 4)
- technische und organisatorische Maßnahmen nach Art. 32 DSGVO in Anlage 2 (§ 5)
- Genehmigung von Unterauftragnehmern mit Informations- und Widerspruchsrecht (§ 6)
- Drittlandtransfer nur mit Angemessenheitsbeschluss, Standardvertragsklauseln oder BCR (§ 7)
- Unterstützung bei Betroffenenrechten und Meldung von Datenpannen mit Frist (§ 8)
- Kontroll- und Nachweisrechte, auch über Zertifizierungen (§ 9)
- Löschung oder Rückgabe der Daten nach Vertragsende (§ 10)
- Haftung nach Art. 82 DSGVO und Schlussbestimmungen (§ 11)

Die Anlagen sind der eigentliche Kern: Ein AVV mit leerer TOM-Anlage und ohne konkrete Datenkategorien erfüllt die gesetzlichen Vorgaben nicht.`,
      },
      {
        titel: "AVV Muster ausfüllen: Vertrag und Anlagen Schritt für Schritt",
        text: `Trage zuerst beide Parteien mit Firma, Anschrift und Vertreter ein und nenne in der Präambel den Hauptvertrag mit Datum und Leistung, etwa „Lagerung und Versand von Kundenbestellungen“. In § 1 Abs. 3 legst du fest, ob die Verarbeitung nur in Deutschland oder im EU/EWR-Raum stattfindet. In § 3 Abs. 2 benennst du auf beiden Seiten die Personen, die Weisungen erteilen und empfangen dürfen.

In § 4 Abs. 2 wählst du, ob der Auftragsverarbeiter einen Datenschutzbeauftragten hat. In § 6 setzt du die Ankündigungs- und Widerspruchsfristen für neue Unterauftragnehmer, in § 8 die Meldefrist bei Datenpannen, üblich sind 24 bis 48 Stunden. § 9 braucht die Ankündigungsfrist für Inspektionen, § 10 die Löschfrist nach Vertragsende.

Dann die Anlagen: In Anlage 1 beschreibst du konkret, was mit welchen Daten passiert, welche Personengruppen betroffen sind, wo die Daten liegen und wann sie gelöscht werden. In Anlage 2 ersetzt du die Beispiele durch die tatsächlichen Maßnahmen des Dienstleisters; frage sie dort an, statt sie zu erfinden. Anlage 3 listet jeden Unterauftragnehmer mit Leistung, Land und Rechtsgrundlage bei Drittlandtransfer.`,
      },
      {
        titel: "Typische Fehler bei Auftragsverarbeitungsverträgen",
        text: `Der häufigste Fehler ist der AVV als Formalie: unterschrieben, abgeheftet, Anlagen leer. Aufsichtsbehörden prüfen genau die Anlagen, und ein Vertrag mit Platzhaltern wie „geeignete Maßnahmen“ ist wertlos. Ebenfalls häufig: Der AVV wird erst Monate nach Beginn der Zusammenarbeit geschlossen. Er muss vor der ersten Verarbeitung stehen.

Bei US-Anbietern reicht der AVV allein nicht. Zusätzlich brauchst du eine Zertifizierung unter dem EU-US Data Privacy Framework oder abgeschlossene Standardvertragsklauseln samt Transfer Impact Assessment. Wer Unterauftragnehmer pauschal genehmigt, aber keine Liste führt und Änderungen nicht mitteilt, verletzt Art. 28 Abs. 2 DSGVO. Und wer einen AVV mit dem Steuerberater oder dem Paketdienst schließt, hat das Verhältnis falsch eingeordnet; das sind eigenständig Verantwortliche. Prüfe bei jedem Dienstleister, ob er wirklich weisungsgebunden arbeitet oder eigene Zwecke verfolgt, bevor du die Vorlage einsetzt.`,
      },
      {
        titel: "Rechtliche Grundlagen der Auftragsverarbeitung",
        text: `Die Auftragsverarbeitung ist in Art. 28 DSGVO geregelt. Absatz 1 verlangt, dass du nur Dienstleister mit hinreichenden Garantien einsetzt, Absatz 2 regelt die Genehmigung von Unterauftragnehmern, Absatz 3 den Pflichtinhalt des Vertrags und Absatz 9 die Form, bei der ein elektronisches Format genügt. Art. 29 DSGVO verbietet dem Auftragsverarbeiter jede Verarbeitung ohne Weisung, Art. 30 Abs. 2 DSGVO verpflichtet ihn zu einem eigenen Verarbeitungsverzeichnis.

Die Sicherheitsmaßnahmen folgen aus Art. 32 DSGVO, die Meldepflicht bei Datenpannen aus Art. 33 DSGVO, die Haftung aus Art. 82 DSGVO. Drittlandtransfers richten sich nach den Art. 44 ff. DSGVO. Als Alternative zur eigenen Vorlage hat die EU-Kommission mit Durchführungsbeschluss (EU) 2021/915 Standardvertragsklauseln für das Verhältnis zwischen Verantwortlichem und Auftragsverarbeiter veröffentlicht; beide Wege erfüllen Art. 28 Abs. 3, wenn die Anlagen sauber ausgefüllt sind. In Deutschland ergänzt das BDSG die DSGVO, etwa bei der Pflicht zur Bestellung eines Datenschutzbeauftragten nach § 38 BDSG.`,
      },
      {
        titel: "Wann die AVV Vorlage nicht reicht",
        text: `Die Vorlage ist für den Standardfall gedacht: ein Verantwortlicher, ein Auftragsverarbeiter, Verarbeitung in der EU. Sie reicht nicht bei gemeinsamer Verantwortlichkeit nach Art. 26 DSGVO, etwa wenn zwei Unternehmen eine Kundendatenbank gemeinsam nutzen, bei Verarbeitung besonderer Kategorien wie Gesundheitsdaten in großem Umfang, bei Konzernstrukturen mit vielen Unterauftragnehmern oder bei Dienstleistern außerhalb der EU ohne Angemessenheitsbeschluss.

Große Anbieter wie Cloud-Plattformen und Newsletter-Dienste stellen eigene AVV, die du in der Regel nicht verhandeln kannst; dort prüfst du nur, ob die Anlagen deine Verarbeitung abdecken. Bei Zweifeln, ob ein Partner Auftragsverarbeiter oder selbst Verantwortlicher ist, und bei jeder Datenschutz-Folgenabschätzung solltest du einen Datenschutzbeauftragten oder Anwalt einbeziehen. GründerX ist Software und keine Rechtsberatung; die Vorlage gibt dir einen vollständigen Rahmen, die Einordnung deiner konkreten Dienstleister bleibt deine Aufgabe.`,
      },
    ],
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
};

export default inhalt;
