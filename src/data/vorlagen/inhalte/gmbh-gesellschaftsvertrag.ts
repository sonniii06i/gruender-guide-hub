// Inhalt der Vorlage „gmbh-gesellschaftsvertrag“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../gesellschaft.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann brauchst du diese GmbH-Satzung als Vorlage?",
        text: `Eine GmbH-Gründung läuft immer über den Notar, und der arbeitet gern mit seinem Standardtext. Der passt für eine Einpersonen-GmbH, aber nicht für ein Team, das Anteile schützen, Investoren vorbereiten oder eine Trennung geordnet regeln will. Diese Vorlage ist für genau diese Fälle gedacht: zwei oder mehr Gesellschafter, individuelle Beteiligungsquoten, Vinkulierung, Vorkaufsrecht, Einziehung und Abfindung.

Auch bei der Umwandlung einer UG in eine GmbH brauchst du eine neue Satzung, weil Firma, Stammkapital und die Rücklagenregel wegfallen. Und wenn ein Gründer sein Einzelunternehmen einbringen will, braucht die Satzung die Sacheinlage-Variante, die das Muster in § 3 vorsieht. Nimm die Vorlage als Entwurf mit zum Notar: Er beurkundet, du sparst die Besprechungszeit, in der sonst jede Klausel von Grund auf diskutiert wird.`,
      },
      {
        titel: "Was muss in einen GmbH-Gesellschaftsvertrag?",
        text: `Das Gesetz verlangt in § 3 GmbHG nur fünf Angaben: Firma, Sitz, Unternehmensgegenstand, Stammkapital sowie Zahl und Nennbeträge der Geschäftsanteile jedes Gesellschafters. Jede gute Satzung geht deutlich darüber hinaus. Die Vorlage enthält:

- Firma, Sitz, Dauer und Geschäftsjahr (§ 1) sowie den Unternehmensgegenstand (§ 2)
- Stammkapital von 25.000 EUR, Stückelung in 25.000 Anteile, Einzahlungsregel und optional die Sacheinlage (§ 3)
- Geschäftsführung, Vertretung, Befreiung von § 181 BGB (§ 4) und den Katalog zustimmungspflichtiger Geschäfte (§ 5)
- Gesellschafterversammlung mit Einberufung in Textform, Quorum, Vertretung und Vorsitz (§ 6)
- Beschlüsse, Stimmrecht je Euro, Dreiviertelmehrheiten und Umlaufverfahren (§ 7)
- Jahresabschluss, Gewinnverwendung und Vorabausschüttungen (§ 8)
- Vinkulierung, Vorkaufsrecht und Pflicht zur aktuellen Gesellschafterliste (§ 9)
- Einziehung und Zwangsabtretung mit den sechs Einziehungsgründen (§ 10)
- Abfindung zum Verkehrswert mit Abschlag, Ratenzahlung und Schiedsgutachter (§ 11)
- Wettbewerbsverbot, Bekanntmachungen, Gründungskosten, Gerichtsstand (§ 12)

Die §§ 9 bis 11 sind das Herzstück für Gründerteams: Sie entscheiden, wer Mitgesellschafter werden kann und was eine Trennung kostet.`,
      },
      {
        titel: "GmbH-Satzung Muster ausfüllen: so gehst du vor",
        text: `Die Platzhalter in eckigen Klammern führen dich durch den Text:

- Gesellschafter mit vollständigen Daten; bei einer Gesellschaft als Gesellschafterin Firma und Handelsregisternummer.
- § 1: Firma mit dem Zusatz GmbH, Sitz und das Ende des ersten Rumpfgeschäftsjahres.
- § 2: Gegenstand so konkret, dass das Registergericht ihn akzeptiert, und so weit, dass ihr nicht bei jedem neuen Produkt zum Notar müsst.
- § 3: Anteilsnummern und Gesamtnennbetrag je Gesellschafter; die Summe muss 25.000 EUR ergeben. Wähle, ob die Hälfte oder der volle Nennbetrag vor der Anmeldung eingezahlt wird. Die Sacheinlage-Variante nur verwenden, wenn wirklich etwas eingebracht wird, sonst löschen.
- § 5: Schwellenwerte für Investitionen, Kredite, Vertragslaufzeiten und Gehälter.
- § 6: Frist für die ordentliche Versammlung und das Quorum.
- § 9 Abs. 2: Ausübungsfrist für das Vorkaufsrecht.
- § 11: Abschlag bei Einziehung aus wichtigem Grund und Anzahl der Halbjahresraten.
- § 12: bestehende erlaubte Tätigkeiten und den Gründungsaufwand, den die Gesellschaft trägt.

Lade das Muster als Word-Datei, fülle es aus und schicke es dem Notar vorab. Unterschrieben wird im Beurkundungstermin, die Vorlage selbst trägt deshalb bewusst den Hinweis auf § 2 GmbHG.`,
      },
      {
        titel: "Typische Fehler bei der GmbH-Gründung und wie du sie vermeidest",
        text: `Der teuerste Fehler ist eine Abfindungsklausel, die später kippt: Ein starrer Buchwert oder ein Ausschluss der Abfindung ist nach ständiger Rechtsprechung unwirksam, wenn er grob vom Verkehrswert abweicht. Die Vorlage knüpft deshalb an den Ertragswert an und erlaubt nur einen Abschlag.

Zweiter Fehler: die zweite Hälfte des Stammkapitals vergessen. Wer nur 12.500 EUR einzahlt, schuldet den Rest weiter, und der Insolvenzverwalter fordert ihn Jahre später ein. Dritter Fehler: Gründungskosten über den in der Satzung bezifferten Betrag hinaus von der Gesellschaft zahlen lassen; das ist eine verbotene Rückzahlung von Stammkapital.

Weitere Klassiker: Der Gesellschafter-Geschäftsführer wird nicht von § 181 BGB befreit und kann seinen eigenen Anstellungsvertrag nicht unterschreiben. Die Gesellschafterliste wird nach einem Anteilsverkauf nicht aktualisiert, sodass der neue Gesellschafter seine Rechte nicht ausüben kann (§ 16 GmbHG). Und die Transparenzregister-Meldung bleibt liegen, obwohl sie seit 2021 für jede GmbH Pflicht ist. Lege nach der Eintragung eine Checkliste an: Gesellschafterliste, Transparenzregister, Gewerbeanmeldung, steuerlicher Erfassungsbogen, Geschäftsführervertrag per Gesellschafterbeschluss.`,
      },
      {
        titel: "Rechtliche Grundlagen: GmbHG, Notar und Handelsregister",
        text: `Die GmbH entsteht in drei Schritten: Beurkundung des Gesellschaftsvertrags beim Notar (§ 2 GmbHG), Einzahlung der Einlagen auf ein Konto der Vorgesellschaft und Eintragung ins Handelsregister (§ 11 GmbHG). Erst mit der Eintragung ist die Haftung auf das Gesellschaftsvermögen beschränkt; wer vorher handelt, haftet persönlich.

Das Mindeststammkapital beträgt 25.000 EUR, vor der Anmeldung müssen auf jeden Anteil ein Viertel und insgesamt mindestens 12.500 EUR eingezahlt sein (§ 7 Abs. 2 GmbHG). Sacheinlagen brauchen einen Sachgründungsbericht und müssen vor der Anmeldung vollständig geleistet sein. Satzungsänderungen erfordern eine Dreiviertelmehrheit und notarielle Beurkundung (§ 53 GmbHG), Anteilsübertragungen ebenfalls den Notar (§ 15 GmbHG).

Die Vinkulierung stützt sich auf § 15 Abs. 5 GmbHG, die Einziehung auf § 34 GmbHG, und die Abfindung darf nie aus dem zur Erhaltung des Stammkapitals nötigen Vermögen gezahlt werden (§ 30 GmbHG). Seit 2022 ist die Online-Gründung per Videokonferenz mit dem Notar möglich, für Bargründungen und seit 2023 auch für bestimmte Sachgründungen. Nach der Eintragung folgen die Meldung an das Transparenzregister, die Gewerbeanmeldung und der Fragebogen zur steuerlichen Erfassung.`,
      },
      {
        titel: "Wann die GmbH-Vorlage allein nicht reicht",
        text: `Notar und Handelsregister sind bei der GmbH ohnehin gesetzt. Zusätzliche Beratung solltest du einplanen, wenn

- ein Einzelunternehmen oder eine GbR eingebracht werden soll; das ist steuerlich eine Einbringung nach dem Umwandlungssteuergesetz und braucht Steuerberater und Einbringungsbilanz,
- Investoren beteiligt werden und Liquidationspräferenzen, Mitverkaufsrechte oder Verwässerungsschutz vereinbart werden sollen; das gehört in eine Gesellschaftervereinbarung, nicht in die öffentliche Satzung,
- Mitarbeiter über ein Beteiligungsprogramm Anteile oder virtuelle Anteile erhalten sollen,
- Ehepartner oder Erben eine Rolle spielen und die Nachfolge gesichert werden muss,
- eine Holding-Struktur mit mehreren Gesellschaften geplant ist.

Diese Vorlage bildet eine solide Standardsatzung ab und ist vom Notar prüfbar. GründerX ist Software und bietet keine Rechtsberatung; die Satzung entfaltet ihre Wirkung erst mit der Beurkundung, und die Feinabstimmung mit Gesellschaftervereinbarung und Geschäftsführervertrag gehört in die Hände eines Anwalts für Gesellschaftsrecht.`,
      },
    ],
  text: `Gesellschaftsvertrag der [Name] GmbH

Gesellschafter:

1. [Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
2. [Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
[3. ggf. weitere Gesellschafter oder Gesellschaften mit Handelsregisternummer]

§ 1 Firma, Sitz, Dauer, Geschäftsjahr
(1) Die Firma der Gesellschaft lautet: [Name] GmbH.
(2) Die Gesellschaft hat ihren Sitz in [Ort].
(3) Die Gesellschaft ist auf unbestimmte Zeit errichtet.
(4) Geschäftsjahr ist das Kalenderjahr. Das erste Geschäftsjahr beginnt mit der Eintragung in das Handelsregister und endet am 31.12.[Jahr].

§ 2 Gegenstand des Unternehmens
(1) Gegenstand des Unternehmens ist [genaue Beschreibung, z. B. „der Handel mit Haushaltswaren über das Internet sowie die Erbringung von Logistik- und Marketingdienstleistungen für Dritte“].
(2) Die Gesellschaft ist zu allen Geschäften und Maßnahmen berechtigt, die dem Gegenstand des Unternehmens dienen. Sie kann Zweigniederlassungen errichten, andere Unternehmen gründen, erwerben oder sich an ihnen beteiligen.

§ 3 Stammkapital und Geschäftsanteile
(1) Das Stammkapital der Gesellschaft beträgt 25.000,00 EUR.
(2) Es ist eingeteilt in 25.000 Geschäftsanteile mit einem Nennbetrag von je 1,00 EUR. Hiervon übernehmen:
   a) [Vorname Nachname] [Anzahl] Geschäftsanteile (Nr. 1 bis [Nr.]) im Gesamtnennbetrag von [Betrag] EUR,
   b) [Vorname Nachname] [Anzahl] Geschäftsanteile (Nr. [Nr.] bis 25.000) im Gesamtnennbetrag von [Betrag] EUR.
(3) Die Einlagen sind in Geld zu leisten. Auf jeden Geschäftsanteil ist vor der Anmeldung [die Hälfte / der volle Nennbetrag] einzuzahlen, insgesamt mindestens 12.500,00 EUR. Der Rest ist auf Anforderung der Geschäftsführung nach Gesellschafterbeschluss einzuzahlen.
[Alternative bei Sacheinlage: (3) Der Gesellschafter [Name] leistet seine Einlage auf die Geschäftsanteile Nr. [Nr.] bis [Nr.] durch Einbringung von [Gegenstand, z. B. „dem Einzelunternehmen [Name] mit allen Aktiva und Passiva laut Einbringungsbilanz zum [Datum]“]. Ein etwaiger Mehrwert wird der Kapitalrücklage gutgeschrieben.]

§ 4 Geschäftsführung und Vertretung
(1) Die Gesellschaft hat einen oder mehrere Geschäftsführer, die von der Gesellschafterversammlung bestellt und abberufen werden.
(2) Ist nur ein Geschäftsführer bestellt, vertritt er die Gesellschaft allein. Sind mehrere Geschäftsführer bestellt, vertreten je zwei gemeinsam oder einer gemeinsam mit einem Prokuristen.
(3) Die Gesellschafterversammlung kann allen oder einzelnen Geschäftsführern Einzelvertretungsbefugnis erteilen und sie von den Beschränkungen des § 181 BGB befreien. Gleiches gilt für Liquidatoren.
(4) Die Geschäftsführer sind an die Weisungen der Gesellschafterversammlung und an eine von dieser erlassene Geschäftsordnung gebunden.

§ 5 Zustimmungspflichtige Geschäfte
Die Geschäftsführer bedürfen für folgende Geschäfte der vorherigen Zustimmung der Gesellschafterversammlung:
   a) Erwerb, Veräußerung und Belastung von Grundstücken und grundstücksgleichen Rechten,
   b) Erwerb, Veräußerung und Aufgabe von Beteiligungen und Betrieben,
   c) Investitionen über [Betrag] EUR im Einzelfall oder über [Betrag] EUR im Geschäftsjahr,
   d) Aufnahme von Krediten und Übernahme von Bürgschaften, Garantien und Sicherheiten über [Betrag] EUR,
   e) Gewährung von Darlehen außerhalb des gewöhnlichen Geschäftsbetriebs,
   f) Abschluss, Änderung und Beendigung von Verträgen mit einer Laufzeit über [z. B. 2] Jahre oder einer Jahresbelastung über [Betrag] EUR,
   g) Abschluss von Anstellungsverträgen mit einem Jahresgehalt über [Betrag] EUR, Erteilung von Prokura und Generalvollmacht,
   h) Geschäfte zwischen der Gesellschaft und Gesellschaftern, Geschäftsführern oder deren Angehörigen,
   i) Aufnahme neuer Geschäftszweige und Einstellung bestehender.

§ 6 Gesellschafterversammlung
(1) Die ordentliche Gesellschafterversammlung findet jährlich innerhalb von [z. B. 8] Monaten nach Ende des Geschäftsjahres am Sitz der Gesellschaft statt. Außerordentliche Versammlungen sind einzuberufen, wenn das Interesse der Gesellschaft es erfordert oder Gesellschafter mit mindestens 10 % des Stammkapitals dies unter Angabe des Zwecks verlangen (§ 50 GmbHG).
(2) Die Einberufung erfolgt durch die Geschäftsführung in Textform (Brief oder E-Mail an die zuletzt mitgeteilte Adresse) mit einer Frist von mindestens zwei Wochen unter Mitteilung von Ort, Zeit und Tagesordnung. Für die Fristberechnung werden der Tag der Absendung und der Tag der Versammlung nicht mitgezählt.
(3) Versammlungen können mit Einverständnis aller Gesellschafter per Video- oder Telefonkonferenz abgehalten werden. Ohne Einhaltung von Form und Frist können Beschlüsse gefasst werden, wenn alle Gesellschafter anwesend oder vertreten sind und kein Gesellschafter widerspricht.
(4) Die Versammlung ist beschlussfähig, wenn mindestens [z. B. 75] % des Stammkapitals anwesend oder vertreten sind. Andernfalls ist innerhalb von zwei Wochen eine zweite Versammlung mit gleicher Tagesordnung einzuberufen, die unabhängig vom vertretenen Kapital beschlussfähig ist; darauf ist in der Einladung hinzuweisen.
(5) Jeder Gesellschafter kann sich durch einen anderen Gesellschafter, einen Rechtsanwalt, Steuerberater oder Wirtschaftsprüfer mit schriftlicher Vollmacht vertreten lassen.
(6) Den Vorsitz führt der Gesellschafter mit der höchsten Beteiligung, bei Gleichstand der an Jahren älteste, sofern die Versammlung nichts anderes beschließt. Über die Versammlung ist eine Niederschrift anzufertigen, die der Vorsitzende unterzeichnet und die allen Gesellschaftern innerhalb von zwei Wochen zu übersenden ist.

§ 7 Gesellschafterbeschlüsse
(1) Je 1,00 EUR eines Geschäftsanteils gewährt eine Stimme.
(2) Beschlüsse werden mit einfacher Mehrheit der abgegebenen Stimmen gefasst, soweit Gesetz oder Satzung nicht eine größere Mehrheit vorschreiben. Stimmenthaltungen gelten als nicht abgegeben.
(3) Einer Mehrheit von drei Vierteln der abgegebenen Stimmen bedürfen: Änderungen der Satzung, Kapitalerhöhung und -herabsetzung, Auflösung, Umwandlung, Zustimmung zur Abtretung von Geschäftsanteilen, Einziehung, Abschluss von Unternehmensverträgen und Befreiung vom Wettbewerbsverbot.
(4) Beschlüsse können auch außerhalb einer Versammlung schriftlich, per E-Mail oder in anderer Textform gefasst werden, wenn alle Gesellschafter sich mit dieser Form einverstanden erklären oder sich an der Abstimmung beteiligen (§ 48 Abs. 2 GmbHG).
(5) Beschlüsse können nur innerhalb eines Monats nach Zugang der Niederschrift durch Klage gegen die Gesellschaft angefochten werden.

§ 8 Jahresabschluss und Gewinnverwendung
(1) Die Geschäftsführer stellen den Jahresabschluss und, soweit gesetzlich erforderlich, den Lagebericht innerhalb der gesetzlichen Fristen auf und legen ihn der Gesellschafterversammlung mit einem Vorschlag zur Ergebnisverwendung vor.
(2) Die Gesellschafter beschließen innerhalb der Frist des § 42a GmbHG über die Feststellung des Jahresabschlusses und die Verwendung des Ergebnisses. Sie können den Gewinn ganz oder teilweise in Gewinnrücklagen einstellen oder auf neue Rechnung vortragen.
(3) Der auszuschüttende Gewinn wird im Verhältnis der Geschäftsanteile verteilt. Vorabausschüttungen auf den erwarteten Gewinn sind durch Beschluss zulässig, wenn ein Zwischenabschluss einen entsprechenden Gewinn ausweist.

§ 9 Verfügung über Geschäftsanteile, Vorkaufsrecht
(1) Die Abtretung und Verpfändung von Geschäftsanteilen oder Teilen davon sowie die Bestellung eines Nießbrauchs bedürfen zu ihrer Wirksamkeit der Zustimmung der Gesellschafterversammlung mit drei Vierteln der abgegebenen Stimmen; der veräußernde Gesellschafter ist stimmberechtigt. Übertragungen auf Mitgesellschafter sind zustimmungsfrei.
(2) Den übrigen Gesellschaftern steht im Verhältnis ihrer Beteiligung ein Vorkaufsrecht zu. Der Veräußerer hat ihnen den mit dem Dritten geschlossenen Vertrag unverzüglich in Kopie zu übermitteln. Das Vorkaufsrecht kann innerhalb von [z. B. 6] Wochen nach Zugang durch schriftliche Erklärung ausgeübt werden. Üben nicht alle Berechtigten aus, wächst das Recht den Ausübenden anteilig zu.
(3) Wird das Vorkaufsrecht nicht ausgeübt, gilt die Zustimmung nach Absatz 1 als erteilt, wenn der Dritte diesem Gesellschaftsvertrag und bestehenden Gesellschaftervereinbarungen schriftlich beitritt.
(4) Die Geschäftsführer reichen nach jeder Veränderung unverzüglich eine aktualisierte Gesellschafterliste zum Handelsregister ein (§ 40 GmbHG).

§ 10 Einziehung und Zwangsabtretung
(1) Die Einziehung von Geschäftsanteilen ist mit Zustimmung des betroffenen Gesellschafters jederzeit zulässig.
(2) Ohne Zustimmung kann die Gesellschafterversammlung die Einziehung beschließen, wenn
   a) über das Vermögen des Gesellschafters das Insolvenzverfahren eröffnet oder mangels Masse abgelehnt wird,
   b) in den Geschäftsanteil die Zwangsvollstreckung betrieben wird und die Maßnahme nicht innerhalb von drei Monaten aufgehoben wird,
   c) in der Person des Gesellschafters ein wichtiger Grund vorliegt, insbesondere eine grobe Verletzung der Gesellschafterpflichten oder ein Verstoß gegen das Wettbewerbsverbot,
   d) der Gesellschafter seine Beteiligung kündigt,
   e) der Gesellschafter verstirbt und der Anteil auf Personen übergeht, die nicht Mitgesellschafter oder Abkömmlinge sind,
   f) eine Vesting- oder Gesellschaftervereinbarung dies vorsieht.
(3) Der Beschluss bedarf einer Mehrheit von drei Vierteln der abgegebenen Stimmen; der Betroffene hat kein Stimmrecht. Statt der Einziehung kann die Gesellschafterversammlung verlangen, dass der Anteil an die Gesellschaft, einen Mitgesellschafter oder einen von ihr benannten Dritten abgetreten wird.
(4) Die Einziehung wird mit Zugang des Beschlusses beim Betroffenen wirksam, unabhängig von der Zahlung der Abfindung. Die übrigen Gesellschafter haften anteilig für die Abfindung, wenn die Gesellschaft sie aus freiem Vermögen nicht zahlen kann.

§ 11 Abfindung
(1) Der ausscheidende Gesellschafter erhält eine Abfindung in Höhe des Verkehrswerts seines Geschäftsanteils zum Stichtag des Ausscheidens, ermittelt nach dem vereinfachten Ertragswertverfahren (§§ 199 ff. BewG), sofern sich die Beteiligten nicht innerhalb von zwei Monaten auf einen Wert einigen.
(2) In den Fällen des § 10 Abs. 2 lit. a bis c beträgt die Abfindung [z. B. 70] % des Werts nach Absatz 1.
(3) Die Abfindung ist in [z. B. 4] gleichen Halbjahresraten zu zahlen; die erste Rate wird sechs Monate nach dem Stichtag fällig. Der offene Betrag wird mit 2 Prozentpunkten über dem Basiszinssatz verzinst. Die Gesellschaft darf jederzeit vorzeitig zahlen.
(4) Bei Streit über die Höhe entscheidet ein von der Industrie- und Handelskammer [Ort] benannter Wirtschaftsprüfer als Schiedsgutachter verbindlich. Die Kosten tragen Gesellschaft und Ausscheidender je zur Hälfte.

§ 12 Wettbewerbsverbot, Bekanntmachungen, Schlussbestimmungen
(1) Die Gesellschafter dürfen während ihrer Zugehörigkeit im Geschäftsbereich der Gesellschaft weder für eigene noch für fremde Rechnung tätig sein noch sich an Wettbewerbern beteiligen. Die Gesellschafterversammlung kann durch Beschluss Befreiung erteilen; Bestehendes: [z. B. „keine“].
(2) Bekanntmachungen der Gesellschaft erfolgen ausschließlich im Bundesanzeiger.
(3) Die Gesellschaft trägt die Gründungskosten (Notar, Gericht, Veröffentlichung, Beratung) bis zu einem Betrag von [Betrag, z. B. 2.500] EUR.
(4) Sollte eine Bestimmung dieser Satzung unwirksam sein oder werden, bleibt die Satzung im Übrigen wirksam. Die Gesellschafter sind verpflichtet, die unwirksame Bestimmung durch eine wirksame zu ersetzen, die dem gewollten Zweck am nächsten kommt.
(5) Gerichtsstand ist, soweit zulässig, der Sitz der Gesellschaft. Es gilt das Recht der Bundesrepublik Deutschland.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Gesellschafter


______________________________
[Vorname Nachname], Gesellschafter

(Notarielle Beurkundung erforderlich, § 2 GmbHG)

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
