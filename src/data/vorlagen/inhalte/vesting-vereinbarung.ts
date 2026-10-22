// Inhalt der Vorlage „vesting-vereinbarung“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../gesellschaft.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann brauchst du eine Vesting-Vereinbarung?",
        text: `Vesting beantwortet eine Frage, die jedes Gründerteam irgendwann trifft: Was passiert mit den Anteilen, wenn ein Gründer nach acht Monaten geht? Ohne Vereinbarung behält er seine 33 Prozent für immer, während die anderen jahrelang weiterarbeiten. Mit Vesting verdient sich jeder Gründer seine Anteile über die Zeit.

Du brauchst die Vereinbarung spätestens bei der Gründung der UG oder GmbH, am besten im selben Notartermin. Sie ist Pflicht, wenn ihr eine Finanzierungsrunde plant, weil Business Angels und VCs Vesting regelmäßig voraussetzen und sonst ein Re-Vesting zu ihren Bedingungen verlangen. Sinnvoll ist sie auch, wenn ein Mitgründer in Teilzeit einsteigt, später dazukommt oder wenn ein Gründer deutlich mehr Anteile hält, als sein laufender Beitrag rechtfertigt. Diese Vorlage ergänzt die Satzung mit Einziehungs- und Abtretungsklausel und regelt das Innenverhältnis der Gesellschafter.`,
      },
      {
        titel: "Was muss in eine Vesting-Vereinbarung für Gründer?",
        text: `Eine Vesting-Klausel ist nur so gut wie ihre Definitionen. Die Vorlage regelt in zehn Paragraphen alle Bausteine, die in der Praxis streitentscheidend sind:

- welche Anteile dem Vesting unterliegen, alle oder nur ein Teil (§ 1)
- Vesting-Zeitraum von 48 Monaten, Cliff von 12 Monaten, monatliche Tranchen danach und Unterbrechungsregeln für Krankheit und Elternzeit (§ 2)
- Leaver-Ereignisse: Kündigung, Abberufung, Tod, Insolvenz, schwere Pflichtverletzung (§ 3)
- Unterscheidung Good Leaver und Bad Leaver (§ 4)
- Call-Option mit Ausübungsfrist, notarieller Ausübung und Einziehung als Alternative (§ 5)
- Abfindung je Fall: Verkehrswert für gevestete Anteile des Good Leavers, Nennwert für ungevestete, reduzierter Wert beim Bad Leaver, Ratenzahlung (§ 6)
- Beschleunigung beim Exit als Single oder Double Trigger (§ 7)
- Verfügungsbeschränkungen und Beitritt von Erwerbern (§ 8)
- Durchführungsvollmacht, Gesellschafterliste, Stimmbindung (§ 9)
- Vorrang vor der Satzung im Innenverhältnis, Laufzeit, Kosten der Beurkundung (§ 10)

Fehlt einer dieser Punkte, etwa die Definition des Verkehrswerts oder die Frist für die Call-Option, bleibt die Klausel im Ernstfall wirkungslos.`,
      },
      {
        titel: "Vesting-Vereinbarung Muster ausfüllen",
        text: `So füllst du die Platzhalter aus:

- Kopf: Name und Anschrift der Gründer, Firma, Sitz, Handelsregisternummer und Vertreter der Gesellschaft.
- § 1: Stammkapital, Anzahl und Nummern der Anteile je Gründer. Entscheidet, ob alle Anteile vesten oder nur ein Prozentsatz, und löscht die nicht gewählte Variante.
- § 2: Vesting-Beginn. Üblich ist der Start der Zusammenarbeit, nicht der Notartermin, damit bereits geleistete Monate zählen. Fristen für Krankheit und Elternzeit eintragen.
- § 3: Monate, ab denen dauerhafte Arbeitsunfähigkeit ein Leaver-Ereignis ist.
- § 5: Ausübungsfrist der Call-Option, meist sechs Monate, und die Paragraphennummer der Einziehungsklausel eurer Satzung.
- § 6: Prozentsatz der Bad-Leaver-Abfindung, Zahl der Jahresraten, Bagatellgrenze für sofortige Zahlung, IHK-Bezirk für den Schiedsgutachter.
- § 7: Single Trigger mit vollständiger oder hälftiger Beschleunigung oder Double Trigger; eine Variante wählen.

Prüfe am Ende, dass alle Zahlen zur Satzung passen: Die Einziehungsgründe in der Satzung müssen auf diese Vereinbarung verweisen, sonst läuft § 5 Abs. 3 ins Leere. Die Word-Fassung eignet sich zur Abstimmung mit dem Notar, die PDF-Fassung zur Unterschrift im Termin.`,
      },
      {
        titel: "Typische Fehler beim Vesting und wie du sie vermeidest",
        text: `Fehler eins: Vesting nur per Handschlag oder in einer E-Mail. Die Abtretungspflicht an GmbH-Anteilen ist ohne notarielle Beurkundung unwirksam, und dann hilft nur noch die Einziehung über die Satzung, falls sie überhaupt vorgesehen ist.

Fehler zwei: zu harte Bad-Leaver-Regeln. Wer einem Gründer nach drei Jahren Arbeit alle Anteile zum Nennwert nehmen will, riskiert, dass ein Gericht die Klausel als sittenwidrig verwirft. Die Vorlage begrenzt den Abschlag deshalb und sieht für gevestete Anteile mindestens einen Teil des Verkehrswerts vor.

Fehler drei: kein Cliff oder ein zu langer. Zwölf Monate sind Standard; ohne Cliff vestet ein Gründer schon nach einem Monat erste Anteile, mit 24 Monaten fühlt sich niemand als Mitgesellschafter.

Fehler vier: Exit nicht bedacht. Ohne Beschleunigungsklausel kann ein Käufer die Gründer nach dem Verkauf entlassen und ungevestete Anteile billig einziehen. Fehler fünf: steuerliche Folgen ignorieren. Erhält ein Gründer Anteile deutlich unter Wert, kann das als geldwerter Vorteil gelten; § 19a EStG bietet seit 2021 einen Aufschub, aber nur bei richtiger Gestaltung. Vor der Unterschrift mit dem Steuerberater sprechen.`,
      },
      {
        titel: "Rechtliche Grundlagen: Vesting im deutschen GmbH-Recht",
        text: `Vesting ist im Gesetz nicht geregelt, sondern eine Kombination aus bekannten Instrumenten des GmbH-Rechts. Die Pflicht, Geschäftsanteile abzutreten, ist nach § 15 Abs. 4 GmbHG beurkundungspflichtig; deshalb gehört die Vereinbarung zum Notar. Die Abtretung selbst braucht ebenfalls die notarielle Form (§ 15 Abs. 3 GmbHG), was die Vorlage über die Vollmacht in § 9 und die notarielle Ausübung in § 5 absichert.

Die Alternative zur Abtretung ist die Einziehung nach § 34 GmbHG, die nur zulässig ist, wenn die Satzung sie vorsieht und die Abfindung aus freiem Vermögen gezahlt werden kann (§ 30 GmbHG). Die Vorlage verweist deshalb auf die Einziehungsklausel der Satzung und verpflichtet im Zweifel die Erwerber zur Zahlung. Die Abfindungshöhe unterliegt den Grenzen, die die Rechtsprechung für Abfindungsklauseln entwickelt hat: Ein grobes Missverhältnis zum Verkehrswert macht die Klausel unwirksam.

Nach jeder Abtretung oder Einziehung muss die Geschäftsführung eine neue Gesellschafterliste zum Handelsregister einreichen (§ 40 GmbHG); erst dann gilt der Erwerber gegenüber der Gesellschaft als Gesellschafter (§ 16 GmbHG). Auch das Transparenzregister ist zu aktualisieren.`,
      },
      {
        titel: "Wann die Vesting-Vorlage nicht ausreicht",
        text: `Die Vorlage bildet das marktübliche Gründer-Vesting ab. Sie reicht nicht, wenn

- die Gesellschaft schon einen Investor hat; dann gehört Vesting in die Gesellschaftervereinbarung der Finanzierungsrunde mit abgestimmten Leaver-Definitionen,
- Anteile an Mitarbeiter ausgegeben werden sollen; dafür sind virtuelle Beteiligungen (VSOP) oder ein Beteiligungsprogramm mit eigenen steuerlichen Regeln das passende Instrument,
- ein Gründer seine Anteile über eine Holding-GmbH hält, weil dann die Leaver-Ereignisse auf die natürliche Person durchgreifen müssen,
- die Gesellschaft bereits einen erheblichen Wert hat und die Zuteilung oder der Rückerwerb steuerlich relevant wird,
- Gründer im Ausland sitzen und Steuer- oder Sozialversicherungsrecht anderer Länder betroffen ist.

In diesen Fällen ist ein Anwalt für Venture-Capital-Recht die richtige Adresse, der Steuerberater sollte parallel die Bewertung prüfen. Der Notar muss die Vereinbarung ohnehin beurkunden und weist auf Formfehler hin, berät aber nicht wirtschaftlich. GründerX stellt dieses Muster als Software bereit und ersetzt keine Rechtsberatung.`,
      },
    ],
  text: `Vesting-Vereinbarung

zwischen

1. [Vorname Nachname], wohnhaft [Straße, PLZ Ort] – „Gründer 1“ –
2. [Vorname Nachname], wohnhaft [Straße, PLZ Ort] – „Gründer 2“ –
[3. ggf. weitere Gründer]

– gemeinsam „die Gründer“ oder „die Gesellschafter“ –

und

[Name] [UG (haftungsbeschränkt) / GmbH], [Straße, PLZ Ort], eingetragen im Handelsregister des Amtsgerichts [Ort] unter HRB [Nummer], vertreten durch [Geschäftsführer] – „die Gesellschaft“ –

§ 1 Gegenstand und Vesting-Anteile
(1) Die Gründer sind am Stammkapital der Gesellschaft von [Betrag] EUR wie folgt beteiligt: Gründer 1 mit [Anzahl] Geschäftsanteilen (Nr. [von] bis [bis]), Gründer 2 mit [Anzahl] Geschäftsanteilen (Nr. [von] bis [bis]).
(2) Sämtliche Geschäftsanteile der Gründer unterliegen dem Vesting nach dieser Vereinbarung („Vesting-Anteile“). [Alternative: Dem Vesting unterliegen [z. B. 80] % der Geschäftsanteile jedes Gründers; die übrigen gelten als sofort gevestet.]
(3) Zweck des Vesting ist, die Beteiligung der Gründer an ihre fortdauernde Tätigkeit für die Gesellschaft zu binden.

§ 2 Vesting-Zeitraum, Cliff und Vesting-Plan
(1) Der Vesting-Zeitraum beträgt 48 Monate und beginnt am [Datum] („Vesting-Beginn“).
(2) Innerhalb der ersten 12 Monate nach Vesting-Beginn gilt kein Vesting-Anteil als gevestet („Cliff“). Mit Ablauf des Cliff gelten 25 % der Vesting-Anteile als gevestet.
(3) Danach gilt mit Ablauf jedes weiteren Monats ein weiteres 1/48 der Vesting-Anteile als gevestet, sodass nach 48 Monaten alle Vesting-Anteile gevestet sind. Angefangene Monate werden nicht berücksichtigt; Bruchteile von Geschäftsanteilen werden kaufmännisch auf ganze Anteile gerundet.
(4) Maßgeblich für den Stand des Vesting ist der Tag des Leaver-Ereignisses nach § 3.
(5) Der Vesting-Lauf wird nicht unterbrochen durch Urlaub, Krankheit bis zu [z. B. 3] Monaten, Elternzeit bis zu [z. B. 6] Monaten oder eine mit Zustimmung der Gesellschafterversammlung vereinbarte Reduzierung der Tätigkeit.

§ 3 Leaver-Ereignis
Ein Leaver-Ereignis liegt vor, wenn die Tätigkeit des Gründers als Geschäftsführer oder in einem sonstigen Dienst- oder Arbeitsverhältnis für die Gesellschaft endet, insbesondere durch
   a) Kündigung oder Aufhebung des Anstellungsvertrags durch den Gründer oder die Gesellschaft,
   b) Abberufung als Geschäftsführer,
   c) Tod oder dauerhafte Arbeitsunfähigkeit über [z. B. 6] Monate,
   d) Eröffnung des Insolvenzverfahrens über das Vermögen des Gründers oder Pfändung seines Geschäftsanteils,
   e) schwerwiegender Verstoß gegen Wettbewerbsverbot, Geheimhaltungspflichten oder diese Vereinbarung, auch ohne Beendigung der Tätigkeit.

§ 4 Good Leaver und Bad Leaver
(1) Ein Gründer ist „Good Leaver“, wenn das Leaver-Ereignis eintritt durch
   a) Kündigung oder Abberufung durch die Gesellschaft ohne wichtigen Grund im Sinne des § 626 BGB,
   b) Kündigung durch den Gründer aus einem von der Gesellschaft zu vertretenden wichtigen Grund,
   c) Tod oder dauerhafte Arbeitsunfähigkeit,
   d) einvernehmliche Aufhebung, bei der die Gesellschafterversammlung den Good-Leaver-Status beschließt.
(2) Ein Gründer ist „Bad Leaver“ in allen anderen Fällen, insbesondere bei
   a) Eigenkündigung ohne von der Gesellschaft zu vertretenden wichtigen Grund,
   b) Kündigung oder Abberufung durch die Gesellschaft aus wichtigem Grund,
   c) den Fällen des § 3 lit. d und e.

§ 5 Call-Option und Abtretungsverpflichtung
(1) Mit Eintritt eines Leaver-Ereignisses bietet der betroffene Gründer hiermit unwiderruflich an, folgende Geschäftsanteile an die Gesellschaft oder an einen oder mehrere von der Gesellschafterversammlung benannte Erwerber (Mitgesellschafter, Gesellschaft oder Dritte) abzutreten („Call-Option“):
   a) als Good Leaver: alle noch nicht gevesteten Vesting-Anteile,
   b) als Bad Leaver: alle Vesting-Anteile, gevestet und nicht gevestet.
(2) Die Call-Option kann innerhalb von [z. B. 6] Monaten nach Kenntnis der Gesellschaft vom Leaver-Ereignis durch Beschluss der Gesellschafterversammlung ausgeübt werden; der betroffene Gründer hat kein Stimmrecht. Die Ausübung erfolgt durch Erklärung gegenüber dem Gründer in notariell beurkundeter Form.
(3) Die Gesellschafterversammlung kann statt der Abtretung die Einziehung der betroffenen Anteile nach § [Nummer] des Gesellschaftsvertrags beschließen. Der Gründer stimmt der Einziehung bereits jetzt zu.
(4) Gevestete Anteile eines Good Leavers verbleiben bei diesem. Die Gesellschafterversammlung kann jedoch innerhalb der Frist nach Absatz 2 verlangen, dass auch diese Anteile gegen Zahlung des Verkehrswerts nach § 6 Abs. 1 abgetreten werden, wenn der Good Leaver nicht mehr für die Gesellschaft tätig ist.

§ 6 Abfindung je Leaver-Fall
(1) Für gevestete Anteile, die nach § 5 Abs. 4 abgetreten werden, erhält der Good Leaver den Verkehrswert zum Tag des Leaver-Ereignisses. Der Verkehrswert entspricht der Bewertung der letzten Finanzierungsrunde, sofern diese nicht länger als 12 Monate zurückliegt, andernfalls dem Wert nach dem vereinfachten Ertragswertverfahren (§§ 199 ff. BewG), mindestens jedoch dem Nennbetrag.
(2) Für nicht gevestete Anteile erhält jeder Leaver den Nennbetrag, höchstens jedoch den Verkehrswert.
(3) Der Bad Leaver erhält für gevestete Anteile [z. B. 50] % des Verkehrswerts nach Absatz 1, mindestens den Nennbetrag, und für nicht gevestete Anteile den Nennbetrag.
(4) Die Abfindung ist in [z. B. 3] gleichen Jahresraten zu zahlen, erstmals [6] Monate nach Abtretung; sie wird mit 2 Prozentpunkten über dem Basiszinssatz verzinst. Beträge bis [Betrag, z. B. 5.000] EUR sind sofort fällig. Zahlungen aus dem gebundenen Vermögen der Gesellschaft (§ 30 GmbHG) sind ausgeschlossen; in diesem Fall zahlen die Erwerber.
(5) Bei Streit über den Verkehrswert entscheidet ein von der Industrie- und Handelskammer [Ort] benannter Wirtschaftsprüfer als Schiedsgutachter; die Kosten tragen die Parteien je zur Hälfte.

§ 7 Beschleunigung bei Exit
(1) Kommt es zu einem Exit, gelten [alle / 50 % der] noch nicht gevesteten Vesting-Anteile mit Wirksamwerden des Exits als gevestet („Single Trigger“).
[Alternative („Double Trigger“): (1) Kommt es zu einem Exit und wird die Tätigkeit des Gründers innerhalb von 12 Monaten danach durch die Gesellschaft oder den Erwerber ohne wichtigen Grund beendet, gelten alle noch nicht gevesteten Vesting-Anteile als gevestet.]
(2) Exit ist die Veräußerung von mehr als 50 % der Geschäftsanteile oder des wesentlichen Vermögens der Gesellschaft an einen Dritten, der nicht Gesellschafter oder mit einem Gesellschafter verbunden ist, sowie ein Börsengang.
(3) Eine Finanzierungsrunde ist kein Exit.

§ 8 Verfügungsbeschränkungen
(1) Die Gründer dürfen über Vesting-Anteile während des Vesting-Zeitraums nicht ohne Zustimmung der Gesellschafterversammlung verfügen; der Gesellschaftsvertrag bleibt unberührt.
(2) Ein Erwerber von Vesting-Anteilen tritt in diese Vereinbarung ein. Die Gründer verpflichten sich, Erwerbern diese Vereinbarung vor Abtretung vorzulegen.

§ 9 Durchführung und Vollmacht
(1) Jeder Gründer bevollmächtigt die Gesellschaft, vertreten durch einen nicht betroffenen Geschäftsführer, unwiderruflich und unter Befreiung von § 181 BGB, die Abtretung nach § 5 in seinem Namen zu erklären und entgegenzunehmen, falls er nicht innerhalb von zwei Wochen nach Aufforderung selbst mitwirkt. Die Vollmacht wird gesondert notariell beglaubigt.
(2) Die Geschäftsführung reicht nach jeder Abtretung oder Einziehung unverzüglich eine aktualisierte Gesellschafterliste zum Handelsregister ein.
(3) Die Gesellschafter verpflichten sich, bei allen Beschlüssen so zu stimmen, wie es zur Durchführung dieser Vereinbarung erforderlich ist.

§ 10 Schlussbestimmungen
(1) Diese Vereinbarung geht als Gesellschaftervereinbarung bei Widersprüchen im Innenverhältnis dem Gesellschaftsvertrag vor. Sie endet mit vollständigem Vesting aller Vesting-Anteile oder mit einem Exit, der alle Anteile erfasst.
(2) Änderungen bedürfen der Schriftform, soweit nicht notarielle Form erforderlich ist; das gilt auch für diese Klausel.
(3) Sollte eine Bestimmung unwirksam sein, bleibt die Vereinbarung im Übrigen wirksam. Die Parteien ersetzen die unwirksame Bestimmung durch eine wirksame, die dem wirtschaftlichen Zweck am nächsten kommt.
(4) Gerichtsstand ist, soweit zulässig, der Sitz der Gesellschaft. Es gilt deutsches Recht.
(5) Die Kosten der notariellen Beurkundung trägt die Gesellschaft.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Gründer 1


______________________________
[Vorname Nachname], Gründer 2


______________________________
[Name] [UG (haftungsbeschränkt) / GmbH], vertreten durch [Geschäftsführer]

(Notarielle Beurkundung erforderlich, § 15 Abs. 4 GmbHG)

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
