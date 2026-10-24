// Inhalt der Vorlage „term-sheet-beteiligung“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../geheimhaltung.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du ein Term Sheet für die Beteiligung brauchst",
        text: `Ein Term Sheet ist das Eckpunktepapier einer Finanzierungsrunde. Es kommt ins Spiel, sobald ein Business Angel oder Seed-Investor ernsthaft investieren will und ihr die Bedingungen festlegen müsst, bevor Anwalt und Notar Beteiligungsvertrag, Gesellschaftervereinbarung und Satzungsänderung entwerfen. Ohne Term Sheet verhandelt ihr diese Punkte erst in den Vertragsentwürfen, und das ist langsam und teuer.

Die Vorlage eignet sich für Angel- und Seed-Runden in UG und GmbH mit direkter Beteiligung über eine Kapitalerhöhung. Sie ist auch das richtige Muster, wenn mehrere Angels in einer Runde zu gleichen Bedingungen einsteigen sollen oder wenn du den Entwurf eines Investors verstehen und mit marktüblichen Konditionen vergleichen willst. Für Wandeldarlehen, bei denen die Bewertung auf die nächste Runde verschoben wird, brauchst du eine andere Vorlage. Für Unternehmenskäufe ist der Letter of Intent aus dieser Bibliothek gedacht.`,
      },
      {
        titel: "Was muss in ein Term Sheet? Die Bausteine im Überblick",
        text: `Das Muster bildet die Punkte ab, die in deutschen Seed-Runden üblicherweise verhandelt werden:

- § 1 Stammkapital, bisherige Gesellschafter und Geschäftsführung.
- § 2 Pre-money- und Post-money-Bewertung, Investment, Beteiligungsquote, Kapitalerhöhung mit Zuzahlung in die Kapitalrücklage nach § 272 Abs. 2 Nr. 4 HGB, Cap Table nach Vollzug.
- § 3 Zahlung in einer Summe oder Tranchen nach Meilensteinen, Mittelverwendung nach Budget.
- § 4 Liquidationspräferenz, in der Vorlage einfach und nicht beteiligt (1x non-participating).
- § 5 Verwässerungsschutz nach der Weighted-Average-Methode, broad-based.
- § 6 Vesting der Gründeranteile mit Cliff, Good- und Bad-Leaver-Regeln und Accelerated Vesting beim Exit.
- § 7 Reporting und Zustimmungskatalog des Investors, optional Beirat.
- § 8 Drag-along, Tag-along, Vorerwerbs- und Bezugsrecht.
- § 9 Mitarbeiterbeteiligungspool (VSOP), Garantien mit Haftungsdeckel, Wettbewerbsverbot der Gründer.
- § 10 Exklusivität, Vertraulichkeit, Kosten.
- § 11 Unverbindlichkeit und nächste Schritte bis zur Beurkundung.

Jeder dieser Punkte wird im Beteiligungsvertrag später ausformuliert. Was im Term Sheet steht, wird dort aber kaum noch verändert; verhandle deshalb hier und nicht erst beim Notar.`,
      },
      {
        titel: "Term Sheet Vorlage ausfüllen und die Zahlen nachrechnen",
        text: `Lade das Muster kostenlos als Word herunter und fülle zuerst § 1 mit den Daten aus dem Handelsregister und der aktuellen Gesellschafterliste. In § 2 trägst du die Pre-money-Bewertung und das Investment ein und rechnest die Quote selbst nach: Post-money ist Pre-money plus Investment, die Quote des Investors ist Investment geteilt durch Post-money. Bei 200.000 EUR auf 1,8 Mio. EUR pre-money sind das 10 Prozent. Leite daraus die Zahl der neuen Anteile ab und prüfe, ob der Mitarbeiterpool nach § 9 vor oder nach der Runde eingerechnet wird, denn das verschiebt deine Quote.

In § 3 wählst du zwischen Einmalzahlung und Tranchen; Meilensteine müssen messbar sein. In § 4 bleibt die einfache Präferenz, in § 5 die Weighted-Average-Methode, sofern der Investor nichts anderes fordert. In § 6 trägst du Vesting-Dauer, Cliff und die Leaver-Bedingungen ein; prüfe, ob bereits gehaltene Anteile teilweise als gevestet gelten sollen. In § 7 legst du Berichtsrhythmus und Zustimmungsschwellen fest, in § 8 die Schwelle für den Drag-along. Zum Schluss Exklusivitätsfrist, Zeitplan, Ort, Datum und Unterschriften aller Beteiligten.`,
      },
      {
        titel: "Typische Fehler von Gründern beim Term Sheet",
        text: `Erstens: die Quote falsch berechnen. Wer das Investment durch die Pre-money-Bewertung teilt, gibt zu viele Anteile ab. Rechne mit Post-money und mit allen Anteilen inklusive Pool (fully diluted).

Zweitens: mehrfache oder beteiligte Liquidationspräferenzen akzeptieren. Eine 2x-Präferenz oder eine participating preference kann dazu führen, dass Gründer bei einem mittleren Exit fast leer ausgehen. Marktstandard in Seed-Runden ist 1x non-participating, wie in § 4 der Vorlage.

Drittens: Full Ratchet als Verwässerungsschutz. Dabei wird der Investor so gestellt, als hätte er zum niedrigeren Preis der nächsten Runde investiert, und das geht voll zu Lasten der Gründer. Die Weighted-Average-Methode ist fairer.

Viertens: Vesting ohne Good-Leaver-Regel. Wer bei einer Kündigung durch die Gesellschaft alle Anteile zum Nennwert verliert, trägt ein Risiko, das ein Investor nicht tragen muss. Achte auf die Unterscheidung in § 6 Abs. 2.

Fünftens: einen zu weiten Zustimmungskatalog. Wenn jede Ausgabe über 5.000 EUR die Zustimmung des Investors braucht, ist das operative Geschäft gelähmt. Setze die Schwellen in § 7 Abs. 2 realistisch.`,
      },
      {
        titel: "Rechtliche Grundlagen: Kapitalerhöhung, Notar, Verbindlichkeit",
        text: `Die direkte Beteiligung läuft über eine Kapitalerhöhung gegen Bareinlage. Dafür braucht die GmbH einen Gesellschafterbeschluss zur Satzungsänderung mit Dreiviertelmehrheit, der notariell beurkundet wird (§ 53 GmbHG), und die Anmeldung zum Handelsregister (§§ 55, 57 GmbHG). Erst mit Eintragung ist der Investor Gesellschafter. Der Betrag über dem Nennwert fließt als Zuzahlung in die Kapitalrücklage nach § 272 Abs. 2 Nr. 4 HGB; die Vorlage greift das in § 2 Abs. 4 auf.

Vesting, Leaver-Regeln, Liquidationspräferenz, Drag- und Tag-along stehen nicht im Gesetz, sondern in der Gesellschaftervereinbarung und werden teils in der Satzung abgesichert, etwa über Einziehungs- und Abtretungsklauseln. Die Wirksamkeit von Bad-Leaver-Klauseln zum Nennwert wird von Gerichten anhand der Angemessenheit geprüft; eine zeitliche Staffelung wie in der Vorlage senkt das Risiko.

Das Term Sheet selbst ist nach § 11 unverbindlich, mit Ausnahme von Exklusivität, Vertraulichkeit und Kosten. Da Anteilsübertragungen und Kapitalerhöhungen ohnehin notariell beurkundet werden müssen, kann aus dem Term Sheet keine Pflicht zur Beteiligung entstehen. Verhandlungen abzubrechen bleibt zulässig, solange die verbindlichen Regeln eingehalten werden.`,
      },
      {
        titel: "Wann das Term Sheet Muster nicht reicht",
        text: `Die Vorlage deckt Angel- und Seed-Runden mit Bewertungen und Beträgen ab, wie sie in frühen Phasen üblich sind. Sobald ein institutioneller VC mit eigenem Standard-Term-Sheet einsteigt, eine Series A verhandelt wird oder ausländische Investoren beteiligt sind, verhandelst du Punkte wie Anti-Dilution in mehreren Klassen, Pay-to-play, Redemption Rights oder Vorzugsanteile. Das gehört zu einem spezialisierten Anwalt für Venture Capital.

Auch Wandeldarlehen, stille Beteiligungen, Mitarbeiterbeteiligungen mit steuerlicher Gestaltung nach § 19a EStG und Beteiligungen von Fördergebern wie dem High-Tech Gründerfonds folgen eigenen Mustern. Hinzu kommen steuerliche Fragen, etwa bei Tranchen, Earn-outs oder Anteilen an ausländischen Holdings, die ein Steuerberater vorab klären sollte.

Das Term Sheet ist der Fahrplan; Beteiligungsvertrag, Gesellschaftervereinbarung und Satzung schreibt dann die Kanzlei, beurkundet der Notar. GründerX ist eine Software für Gründer und keine Rechtsberatung. Nutze die Vorlage, um vorbereitet in die Verhandlung zu gehen und die Beratungsstunden auf die wirklich strittigen Punkte zu konzentrieren.`,
      },
    ],
  text: `Term Sheet
Eckpunkte einer Beteiligung an der [Firma der Gesellschaft] [UG (haftungsbeschränkt) / GmbH]

zwischen

[Firma / Vorname Nachname], [Straße, PLZ Ort]
– nachfolgend „Investor“ –

[weitere Investoren]

und

[Vorname Nachname], [Straße, PLZ Ort], und [Vorname Nachname], [Straße, PLZ Ort]
– nachfolgend „Gründer“ –

sowie

[Firma der Gesellschaft], [Rechtsform], eingetragen im Handelsregister des Amtsgerichts [Ort] unter HRB [Nummer], vertreten durch die Geschäftsführung
– nachfolgend „Gesellschaft“ –

– gemeinsam „die Parteien“ –

§ 1 Parteien und Gesellschaft
(1) Das Stammkapital der Gesellschaft beträgt derzeit [Betrag] EUR, eingeteilt in [Anzahl] Geschäftsanteile zu je [1,00] EUR. Gesellschafter sind vor der Finanzierungsrunde: [Gründer 1] mit [Anzahl] Anteilen ([Anteil] %), [Gründer 2] mit [Anzahl] Anteilen ([Anteil] %) [, weitere].
(2) Die Gesellschaft betreibt [kurze Beschreibung des Geschäfts]. Geschäftsführer sind [Vorname Nachname].

§ 2 Investment, Bewertung und Beteiligungsquote
(1) Pre-money-Bewertung der Gesellschaft: [Betrag] EUR (fully diluted, d. h. einschließlich des in § 9 Abs. 1 genannten Mitarbeiterbeteiligungspools).
(2) Investment des Investors: [Betrag] EUR. [Bei mehreren Investoren: Gesamtvolumen der Runde [Betrag] EUR, davon [Investor A] [Betrag] EUR und [Investor B] [Betrag] EUR.]
(3) Post-money-Bewertung: [Betrag] EUR. Beteiligungsquote des Investors nach Vollzug: [Anteil] %.
(4) Die Beteiligung erfolgt durch eine Kapitalerhöhung gegen Bareinlage um [Betrag] EUR auf [Betrag] EUR durch Ausgabe von [Anzahl] neuen Geschäftsanteilen zu je [1,00] EUR an den Investor. Der Investor zahlt den Nennbetrag in das Stammkapital und den Differenzbetrag zum Investment ([Betrag] EUR) als Zuzahlung in die Kapitalrücklage der Gesellschaft (§ 272 Abs. 2 Nr. 4 HGB). Die bisherigen Gesellschafter verzichten auf ihr Bezugsrecht.
(5) Kapitalisierung nach Vollzug (Cap Table): [Gründer 1] [Anteil] %, [Gründer 2] [Anteil] %, Investor [Anteil] %, [Mitarbeiterpool [Anteil] %].

§ 3 Zahlung, Tranchen und Mittelverwendung
(1) Der Nennbetrag ist vor Anmeldung der Kapitalerhöhung zum Handelsregister, die Zuzahlung in die Kapitalrücklage innerhalb von [z. B. 10] Werktagen nach Eintragung der Kapitalerhöhung zu zahlen. [Alternative: Das Investment wird in [2] Tranchen gezahlt: [Betrag] EUR bei Eintragung, [Betrag] EUR bei Erreichen folgender Meilensteine: [Meilensteine, z. B. „monatlich wiederkehrender Umsatz von [Betrag] EUR“ / „Markteinführung von …“].]
(2) Die Mittel werden für [Produktentwicklung, Marketing, Personal, Betriebskapital] gemäß dem den Investoren vorgelegten Budget verwendet. Wesentliche Abweichungen bedürfen der Zustimmung des Investors.

§ 4 Liquidationspräferenz
(1) Im Fall eines Exits (Verkauf von mehr als 50 % der Anteile, Verkauf des wesentlichen Geschäftsbetriebs, Liquidation) erhält der Investor aus dem Erlös vorrangig einen Betrag in Höhe seines Investments ([1,0]-fach, nicht verzinst) (einfache Liquidationspräferenz).
(2) Der verbleibende Erlös wird auf alle Gesellschafter im Verhältnis ihrer Beteiligung verteilt; der vorab erhaltene Betrag wird auf den Anteil des Investors angerechnet (nicht beteiligte Präferenz, „non-participating“). Der Investor erhält insgesamt mindestens den Betrag, der ihm bei rein quotaler Verteilung zustünde.
(3) Bei mehreren Investoren derselben Runde gilt die Präferenz untereinander gleichrangig (pro rata).

§ 5 Verwässerungsschutz
Werden in einer späteren Finanzierungsrunde neue Anteile zu einem niedrigeren Preis je Anteil ausgegeben als in dieser Runde, ist der Investor berechtigt, so viele weitere Anteile zum Nennbetrag zu übernehmen, dass sein durchschnittlicher Preis je Anteil dem gewichteten Durchschnitt aus altem und neuem Preis entspricht (Weighted-Average-Methode, broad-based). Der Schutz gilt nicht für Anteile aus dem Mitarbeiterbeteiligungspool und für Anteile, die mit Zustimmung des Investors ausgegeben werden.

§ 6 Vesting der Gründeranteile
(1) Die Anteile der Gründer unterliegen einem Vesting über [z. B. 48] Monate ab [Vollzug / Gründung] mit einer Cliff-Periode von [z. B. 12] Monaten. Nach dem Cliff gelten [25] % als gevestet, danach monatlich linear weitere [1/48].
(2) Scheidet ein Gründer vor Ablauf des Vestings als Geschäftsführer oder aus seiner operativen Tätigkeit aus, sind die Gesellschaft bzw. die übrigen Gesellschafter berechtigt, die nicht gevesteten Anteile zu übernehmen (Call-Option):
   a) Good Leaver (Kündigung durch die Gesellschaft ohne wichtigen Grund, Tod, dauerhafte Berufsunfähigkeit, einvernehmliche Beendigung): nicht gevestete Anteile zum Verkehrswert, gevestete Anteile bleiben beim Gründer;
   b) Bad Leaver (Eigenkündigung vor Ablauf des Vestings, Kündigung aus wichtigem Grund, Verstoß gegen das Wettbewerbsverbot): nicht gevestete Anteile zum Nennbetrag, gevestete Anteile zum [Verkehrswert / [z. B. 75] % des Verkehrswerts].
(3) Bei einem Exit vor Ablauf des Vestings gelten alle Gründeranteile als gevestet (Accelerated Vesting).

§ 7 Informations- und Zustimmungsrechte
(1) Die Gesellschaft übermittelt dem Investor monatlich bis zum [15.] des Folgemonats ein Reporting (Umsatz, Kosten, Liquidität, Kennzahlen gemäß Anlage), quartalsweise eine BWA und jährlich den Jahresabschluss sowie das Budget des Folgejahres bis zum [30.11.].
(2) Folgende Maßnahmen bedürfen der vorherigen Zustimmung des Investors [bzw. einer Mehrheit von [75] % der Investoren]: Satzungsänderungen und Kapitalmaßnahmen, Aufnahme neuer Gesellschafter, Verkauf oder Belastung wesentlicher Vermögenswerte oder Schutzrechte, Darlehen und Bürgschaften über [Betrag] EUR, Geschäftsführervergütungen über [Betrag] EUR jährlich, Abweichungen vom Budget über [z. B. 20] %, Rechtsgeschäfte mit Gesellschaftern oder nahestehenden Personen.
(3) [Optional:] Der Investor hat das Recht, [einen Beirat mit [3] Mitgliedern einzurichten und davon [1] Mitglied zu benennen / als Beobachter an Gesellschafterversammlungen teilzunehmen].

§ 8 Drag-along, Tag-along, Vorerwerbsrecht
(1) Mitverkaufspflicht (Drag-along): Stimmen Gesellschafter mit mindestens [z. B. 75] % der Anteile, darunter [der Investor / die Mehrheit der Gründer], einem Verkauf aller Anteile an einen Dritten zu, sind alle übrigen Gesellschafter verpflichtet, ihre Anteile zu denselben Bedingungen mitzuverkaufen, sofern der Kaufpreis mindestens [Betrag] EUR bzw. die [z. B. 2]-fache Post-money-Bewertung erreicht.
(2) Mitverkaufsrecht (Tag-along): Will ein Gesellschafter Anteile an einen Dritten verkaufen, können die übrigen Gesellschafter verlangen, dass der Erwerber ihre Anteile anteilig zu denselben Bedingungen mit übernimmt.
(3) Vorerwerbsrecht: Vor jedem Verkauf an Dritte sind die Anteile zunächst den übrigen Gesellschaftern im Verhältnis ihrer Beteiligung zu den Bedingungen des Drittangebots anzubieten. Bezugsrecht: Bei künftigen Kapitalerhöhungen hat der Investor das Recht, anteilig zu seiner Beteiligung teilzunehmen.

§ 9 Mitarbeiterbeteiligung, Garantien, Wettbewerbsverbot
(1) Die Gesellschaft richtet ein virtuelles Mitarbeiterbeteiligungsprogramm (VSOP) im Umfang von [z. B. 10] % der Anteile (fully diluted, nach der Runde) ein. Es verwässert alle Gesellschafter [nur die Gründer] anteilig.
(2) Die Gründer und die Gesellschaft geben im Beteiligungsvertrag übliche Garantien ab, insbesondere zu Anteilen, Jahresabschluss, Schutzrechten (vollständige Übertragung aller Entwicklungsleistungen auf die Gesellschaft), wesentlichen Verträgen und Rechtsstreitigkeiten. Die Haftung der Gründer ist auf [Betrag / [z. B. 50] % des Investments] begrenzt; Ansprüche sind vorrangig gegen die Gesellschaft zu richten.
(3) Die Gründer widmen der Gesellschaft ihre volle Arbeitskraft und unterliegen während ihrer Tätigkeit und für [z. B. 12] Monate danach einem Wettbewerbs- und Abwerbeverbot.

§ 10 Exklusivität, Vertraulichkeit, Kosten
(1) Die Gesellschaft und die Gründer führen bis zum [Datum] keine Verhandlungen mit anderen Investoren über eine Beteiligung, es sei denn, der Investor stimmt zu oder die Beteiligung weiterer Investoren an dieser Runde ist in § 2 vorgesehen.
(2) Die Parteien behandeln dieses Term Sheet und alle ausgetauschten Informationen vertraulich.
(3) Jede Partei trägt ihre eigenen Beraterkosten. Die Notar- und Registerkosten der Kapitalerhöhung trägt die Gesellschaft. [Optional: Die Gesellschaft erstattet dem Investor die Kosten seiner rechtlichen Beratung bis zu [Betrag] EUR nach Vollzug.]

§ 11 Unverbindlichkeit und nächste Schritte
(1) Dieses Term Sheet ist, mit Ausnahme von § 10 und § 11, rechtlich unverbindlich. Es begründet keine Verpflichtung zur Beteiligung oder zur Durchführung der Kapitalerhöhung. Rechte und Pflichten entstehen erst durch den notariell beurkundeten Beteiligungsvertrag, die Gesellschaftervereinbarung und die Satzungsänderung (§§ 53, 54, 55 und 57 GmbHG).
(2) Die Parteien streben folgende Schritte an: Due Diligence des Investors bis [Datum]; Entwurf des Beteiligungsvertrags durch [den Investor / die Gesellschaft] bis [Datum]; Beurkundung bis [Datum]; Eintragung der Kapitalerhöhung und Auszahlung des Investments danach.
(3) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, [Ort]. Änderungen bedürfen der Schriftform. Sollte eine Bestimmung unwirksam sein, bleibt das Term Sheet im Übrigen wirksam.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Investor


______________________________
[Vorname Nachname], Gründer


______________________________
[Vorname Nachname], Gründer


______________________________
[Vorname Nachname], für die Gesellschaft

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
