// Inhalt der Vorlage „praktikumsvertrag“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../arbeit.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen Praktikumsvertrag brauchst",
        text: `Eine Studentin fragt nach einem Pflichtpraktikum für ihren Bachelor, ein Schüler will in den Sommerferien in dein Start-up hineinschnuppern, oder du willst einen Bewerber drei Monate lang kennenlernen, bevor du ihn einstellst. In allen Fällen brauchst du einen Praktikumsvertrag, der den Lernzweck festhält, die Dauer begrenzt und die Vergütung regelt.

Die Vorlage deckt vier Praktikumsarten ab: das Pflichtpraktikum nach Studien- oder Schulordnung, das freiwillige Orientierungspraktikum bis drei Monate, das studienbegleitende freiwillige Praktikum bis drei Monate und das längere freiwillige Praktikum mit Mindestlohn. Welche Art zutrifft, entscheidet über Mindestlohn, Sozialversicherung und Kündigungsrecht, deshalb steht die Auswahl ganz oben in § 1. Für Studierende, die regelmäßig neben dem Studium arbeiten sollen, ist der Werkstudentenvertrag das bessere Muster.`,
      },
      {
        titel: "Was muss in einen Praktikumsvertrag? Pflichtangaben für Praktikanten",
        text: `Für Praktikanten nennt das Nachweisgesetz eigene Pflichtangaben, die im Muster so verteilt sind:

- Art und Zweck des Praktikums mit Ankreuzfeld für die Praktikumsart (§ 1)
- Beginn, Dauer, Probezeit und tägliche Praktikumszeit (§ 2)
- Lern- und Ausbildungsziele sowie die Gliederung in Abschnitte (§ 3)
- Vergütung, Fälligkeit und die Einordnung beim Mindestlohn (§ 4)
- Betreuer, Feedbackgespräche, Arbeitsmittel, Unfallversicherung und Freistellung für die Hochschule (§ 5)
- Pflichten des Praktikanten einschließlich Berichtsheft (§ 6)
- Urlaub, Krankheit und Nachholen von Fehlzeiten (§ 7)
- Verschwiegenheit und Nutzungsrechte an Arbeitsergebnissen (§ 8)
- Beendigung und Kündigung nach den Regeln des Berufsbildungsgesetzes (§ 9)
- Zeugnis, Praktikumsbescheinigung und Tarifhinweis (§ 10)

Die Lernziele in § 3 sind der Kern. Sie belegen, dass das Praktikum der Ausbildung dient und kein verdecktes Arbeitsverhältnis ist. Formuliere sie konkret, mit Projekten und Abschnitten, nicht als Aufgabenliste einer Stellenanzeige.`,
      },
      {
        titel: "Praktikumsvertrag Muster richtig ausfüllen",
        text: `Beginne mit § 1 Abs. 2 und kreuze genau eine Praktikumsart an. Bei einem Pflichtpraktikum trägst du die Ordnung der Hochschule mit Paragraf und die vorgeschriebene Wochenzahl ein und lässt dir die Bescheinigung der Hochschule geben, die in § 4 Abs. 4 erwähnt ist. In § 2 setzt du Start- und Enddatum, eine kurze Probezeit und die Wochenstunden; bei Minderjährigen gelten die Grenzen des Jugendarbeitsschutzgesetzes, die der Vertrag nennt.

In § 3 formulierst du drei bis vier Lernziele und einen Ablaufplan nach Wochen. In § 4 wählst du den passenden Absatz: Mindestlohn je Stunde beim längeren freiwilligen Praktikum, freiwillige Vergütung oder keine Vergütung bei Pflicht- und Kurzpraktika. Streiche den jeweils anderen Absatz. In § 5 trägst du den Betreuer und seine Vertretung ein, in § 7 die Urlaubstage je vollen Monat. Bei Minderjährigen unterschreiben die Eltern mit; die Unterschriftszeile dafür steht am Ende. Beide Seiten unterschreiben vor dem ersten Tag, der Praktikant erhält eine Ausfertigung.`,
      },
      {
        titel: "Typische Fehler bei Praktika und ihre Folgen",
        text: `Der häufigste und teuerste Fehler ist die Verlängerung eines freiwilligen Praktikums über drei Monate hinaus. Schon eine Woche mehr löst den Mindestlohn für die gesamte Dauer rückwirkend aus, nicht nur für die Zeit nach dem dritten Monat. Entscheide am Ende der drei Monate lieber, ob ein Werkstudenten- oder Arbeitsvertrag folgt.

Zweiter Fehler: Der Praktikant füllt eine reguläre Stelle aus, hat feste Verantwortung und keinen Betreuer. Dann ist er Arbeitnehmer mit vollem Mindestlohn, ebenfalls rückwirkend, und bei einer Prüfung durch den Zoll oder die Rentenversicherung werden Lohn und Sozialabgaben nachgefordert. Die Lernziele und die Betreuung in § 3 und § 5 sind deshalb keine Formalie.

Vermeide außerdem Praktikumsverträge nur per Handschlag, fehlende Unfallversicherung, Nachtarbeit oder Wochenendarbeit bei Minderjährigen und die Annahme, Praktikanten hätten keinen Urlaub. Für freiwillige Praktika gilt das Berufsbildungsgesetz mit Urlaubs-, Entgeltfortzahlungs- und Zeugnisanspruch.`,
      },
      {
        titel: "Rechtliche Grundlagen: Mindestlohn, Berufsbildungsgesetz, Nachweisgesetz",
        text: `§ 22 Abs. 1 MiLoG nimmt Pflichtpraktika nach Schul-, Ausbildungs- oder Studienordnung, freiwillige Orientierungspraktika bis drei Monate und freiwillige studienbegleitende Praktika bis drei Monate vom Mindestlohn aus; ebenso Praktikanten unter 18 Jahren ohne Berufsabschluss. Alle anderen Praktikanten haben Anspruch auf den vollen Mindestlohn, der seit Januar 2026 bei 13,90 EUR je Stunde liegt. Prüfe bei Vertragsschluss die aktuelle Höhe.

Freiwillige Praktikanten sind nach § 26 BBiG „andere Vertragsverhältnisse“, auf die wesentliche Vorschriften des Berufsbildungsgesetzes anzuwenden sind, allerdings ohne Pflicht zur Vertragsniederschrift und mit abkürzbarer Probezeit: Probezeit, eingeschränkte Kündigung nach § 22 BBiG, Urlaub, Zeugnis nach § 16 BBiG. Pflichtpraktikanten sind während des vorgeschriebenen Praktikums in der Sozialversicherung besonders behandelt und bei Vergütung meist beitragsfrei; freiwillige vergütete Praktika sind sozialversicherungspflichtig wie ein Arbeitsverhältnis, unterhalb der Geringfügigkeitsgrenze als Minijob. Das Nachweisgesetz verlangt in § 2 Abs. 1a für Praktikanten die Lernziele, Beginn, Dauer, tägliche Praktikumszeit, Vergütung und Urlaub schriftlich, und zwar vor Aufnahme des Praktikums.`,
      },
      {
        titel: "Wann die kostenlose Praktikumsvertrag-Vorlage nicht reicht",
        text: `Für Praktika von Schülern unter 15 Jahren, Schülerbetriebspraktika, die von der Schule organisiert werden, und Praktika von Geflüchteten mit aufenthaltsrechtlichen Auflagen gelten Sonderregeln, die das Muster nicht abbildet. Dasselbe gilt für Praktika im Ausland, für Trainee-Programme nach Studienabschluss, die in Wahrheit befristete Arbeitsverhältnisse sind, und für Praktika mit Bezug von Arbeitslosengeld oder Bürgergeld, bei denen die Agentur für Arbeit vorher zustimmen muss.

Bei Tarifbindung können Praktikantenvergütungen tariflich festgelegt sein; mit Betriebsrat ist die Einstellung mitbestimmungspflichtig. Für Pflichtpraktika liefern viele Hochschulen eigene Vertragsformulare, die du dann verwenden solltest. GründerX ist Software und keine Rechtsberatung: Wenn unklar ist, ob ein Praktikum noch Praktikum oder schon Arbeitsverhältnis ist, lass die Konstellation vor dem Start von einem Anwalt oder Steuerberater prüfen.`,
      },
    ],
  text: `Praktikumsvertrag

zwischen

[Firma, Rechtsform], vertreten durch [Vorname Nachname, Funktion], [Straße, PLZ Ort]
– nachfolgend „Unternehmen“ –

und

[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
[bei Minderjährigen: gesetzlich vertreten durch [Vorname Nachname der Eltern]]
– nachfolgend „Praktikant“ –

§ 1 Art und Zweck des Praktikums
(1) Das Unternehmen nimmt den Praktikanten zu einem Praktikum im Bereich [z. B. „Online-Marketing“] auf.
(2) Art des Praktikums (Zutreffendes ankreuzen oder streichen):
   [ ] Pflichtpraktikum nach der [Studien- / Prüfungs- / Ausbildungs-]Ordnung der [Hochschule / Schule], [Bezeichnung und Paragraf der Ordnung], vorgeschriebene Dauer [Wochen] Wochen.
   [ ] Freiwilliges Praktikum zur Orientierung für eine Berufsausbildung oder ein Studium, Dauer höchstens drei Monate.
   [ ] Freiwilliges Praktikum begleitend zu einem Studium oder einer Ausbildung, Dauer höchstens drei Monate.
   [ ] Freiwilliges Praktikum mit einer Dauer von mehr als drei Monaten (Mindestlohn gilt ab dem ersten Tag).
(3) Das Praktikum dient dem Erwerb praktischer Kenntnisse und Erfahrungen zur Vorbereitung auf eine berufliche Tätigkeit. Der Lernzweck steht im Vordergrund; der Praktikant wird nicht als Ersatz für eine reguläre Arbeitskraft eingesetzt. Es wird kein Arbeitsverhältnis begründet; auf freiwillige Praktika finden die §§ 10 bis 16, § 17 Abs. 1, 6 und 7, §§ 18 bis 23 und 25 BBiG entsprechende Anwendung (§ 26 BBiG).

§ 2 Dauer, Probezeit und Arbeitszeit
(1) Das Praktikum beginnt am [Datum] und endet am [Datum], ohne dass es einer Kündigung bedarf. Die Dauer beträgt [Wochen] Wochen.
(2) Die ersten [z. B. 2, höchstens: bei Praktika bis 3 Monate angemessen kurz] Wochen gelten als Probezeit (§ 20 BBiG), in der beide Seiten jederzeit ohne Einhaltung einer Frist kündigen können.
(3) Die regelmäßige Praktikumszeit beträgt [z. B. 38] Stunden pro Woche, verteilt auf Montag bis Freitag von [z. B. 09:00] bis [z. B. 17:00] Uhr mit [z. B. 30] Minuten Pause. Die Vorschriften des Arbeitszeitgesetzes und, bei Minderjährigen, des Jugendarbeitsschutzgesetzes (höchstens 8 Stunden täglich und 40 Stunden wöchentlich, keine Arbeit vor 6:00 und nach 20:00 Uhr) sind einzuhalten. Überstunden werden nicht angeordnet.
(4) Der Praktikant erfasst seine Anwesenheitszeiten [im System / in einem Praktikumsnachweis], der wöchentlich vom Betreuer gegengezeichnet wird.

§ 3 Lern- und Ausbildungsziele
(1) Der Praktikant soll während des Praktikums insbesondere folgende Kenntnisse und Fähigkeiten erwerben:
   a) [z. B. „Aufbau und Auswertung von Social-Media-Kampagnen“],
   b) [z. B. „Grundlagen der Suchmaschinenoptimierung und des Content-Managements“],
   c) [z. B. „Einblick in Kundenkommunikation, Angebotserstellung und Projektabläufe“],
   d) [z. B. „Mitarbeit an einem eigenen Projekt: [Bezeichnung]“].
(2) Das Praktikum gliedert sich in folgende Abschnitte: [z. B. Woche 1 bis 2 Einarbeitung und Begleitung, Woche 3 bis 8 Mitarbeit in Projekten, Woche 9 bis 12 eigenes Projekt mit Abschlusspräsentation].
(3) Soweit eine Studien- oder Prüfungsordnung Inhalte vorschreibt, werden diese berücksichtigt; der Praktikant legt die Ordnung und etwaige Vorgaben der Hochschule bei Vertragsschluss vor.

§ 4 Vergütung
(1) [Bei Mindestlohnpflicht: Der Praktikant erhält eine Vergütung von [Betrag, mindestens 13,90] EUR brutto je Stunde, das sind bei der vereinbarten Praktikumszeit monatlich etwa [Betrag] EUR brutto. Der jeweils gültige gesetzliche Mindestlohn wird nicht unterschritten.]
[Bei Pflichtpraktikum oder freiwilligem Praktikum bis drei Monate: Der Praktikant erhält eine freiwillige monatliche Vergütung von [Betrag] EUR brutto. Ein gesetzlicher Mindestlohnanspruch besteht nach § 22 Abs. 1 MiLoG nicht. / Das Praktikum wird nicht vergütet.]
(2) Die Vergütung ist jeweils am [z. B. letzten Bankarbeitstag des Monats] fällig und wird bargeldlos auf das vom Praktikanten benannte Konto gezahlt.
(3) Das Unternehmen erstattet dem Praktikanten nachgewiesene Auslagen, die im Auftrag des Unternehmens entstehen. [Optional: Der Praktikant erhält ein Jobticket / eine Fahrtkostenpauschale von [Betrag] EUR monatlich.]
(4) Die sozialversicherungs- und steuerrechtliche Behandlung richtet sich nach der Art des Praktikums; das Unternehmen nimmt die erforderlichen Meldungen vor. Der Praktikant weist [bei Pflichtpraktikum: durch Bescheinigung der Hochschule] nach, dass das Praktikum vorgeschrieben ist.

§ 5 Pflichten des Unternehmens und Betreuung
(1) Das Unternehmen vermittelt dem Praktikanten die Kenntnisse und Fähigkeiten nach § 3 und überträgt ihm nur Aufgaben, die dem Zweck des Praktikums dienen.
(2) Betreuer des Praktikanten ist [Vorname Nachname, Funktion]. Der Betreuer weist den Praktikanten ein, steht für Fragen zur Verfügung, führt regelmäßig, mindestens [z. B. alle zwei Wochen], ein Feedbackgespräch und bewertet den Lernfortschritt. Bei Abwesenheit vertritt ihn [Vorname Nachname].
(3) Das Unternehmen stellt die erforderlichen Arbeitsmittel kostenlos zur Verfügung, unterweist den Praktikanten in Arbeitssicherheit und Datenschutz und meldet ihn bei der zuständigen Unfallversicherung an.
(4) Das Unternehmen stellt den Praktikanten für Prüfungen, Pflichtveranstaltungen der Hochschule und Berufsschulunterricht frei.

§ 6 Pflichten des Praktikanten
(1) Der Praktikant bemüht sich, die Lernziele zu erreichen, führt die ihm übertragenen Aufgaben sorgfältig aus, befolgt die Weisungen des Betreuers und hält die betrieblichen Ordnungen, Sicherheits- und Datenschutzvorschriften ein.
(2) Der Praktikant führt [einen Praktikumsbericht / ein Berichtsheft] nach den Vorgaben der [Hochschule / Schule] und legt ihn dem Betreuer regelmäßig vor. Das Unternehmen unterstützt die Erstellung und zeichnet den Bericht gegen.
(3) Arbeitsmittel, Unterlagen und Zugangsdaten behandelt der Praktikant sorgfältig und gibt sie bei Ende des Praktikums vollständig zurück.

§ 7 Urlaub, Krankheit, Fehlzeiten
(1) Der Praktikant hat Anspruch auf bezahlten Erholungsurlaub von [z. B. 2] Arbeitstagen je vollen Praktikumsmonat (anteilig aus [z. B. 20] Tagen bei einer Fünf-Tage-Woche, bei Minderjährigen nach § 19 JArbSchG). Der Urlaub wird in Abstimmung mit dem Betreuer genommen.
(2) Bei Krankheit informiert der Praktikant das Unternehmen unverzüglich vor Beginn der Praktikumszeit und legt bei einer Dauer von mehr als drei Kalendertagen eine ärztliche Bescheinigung vor. Bei vergüteten Praktika richtet sich die Fortzahlung der Vergütung nach dem Entgeltfortzahlungsgesetz.
(3) Fehlzeiten von mehr als [z. B. 10] Arbeitstagen werden auf Wunsch des Praktikanten nachgeholt, soweit die Praktikumsordnung dies verlangt und das Unternehmen dies ermöglichen kann; das Praktikum verlängert sich dann entsprechend. Bei freiwilligen Praktika bis drei Monate darf die Verlängerung die Drei-Monats-Grenze nicht überschreiten.

§ 8 Verschwiegenheit und Arbeitsergebnisse
(1) Der Praktikant bewahrt über Geschäfts- und Betriebsgeheimnisse, Kundendaten und vertrauliche Angelegenheiten des Unternehmens Stillschweigen, auch nach Ende des Praktikums, solange ein berechtigtes Geheimhaltungsinteresse besteht. Die Verwendung von Unternehmensinformationen im Praktikumsbericht oder in einer Abschlussarbeit bedarf der vorherigen Zustimmung des Unternehmens in Textform; das Unternehmen stimmt zu, soweit keine Geheimnisse offengelegt werden.
(2) An Arbeitsergebnissen, die der Praktikant im Rahmen des Praktikums schafft, räumt er dem Unternehmen das ausschließliche, zeitlich und räumlich unbeschränkte Nutzungsrecht ein. Der Praktikant darf seine Arbeitsergebnisse in anonymisierter Form in Bewerbungsunterlagen zeigen, soweit das Unternehmen nicht widerspricht.
(3) Der Praktikant verarbeitet personenbezogene Daten nur nach Weisung und wurde über die Datenschutzpflichten unterrichtet.

§ 9 Beendigung
(1) Das Praktikum endet mit Ablauf der in § 2 vereinbarten Zeit.
(2) Während der Probezeit kann das Praktikum von beiden Seiten jederzeit ohne Frist gekündigt werden. Nach der Probezeit kann es gekündigt werden
   a) von beiden Seiten aus wichtigem Grund ohne Einhaltung einer Frist,
   b) vom Praktikanten mit einer Frist von vier Wochen, wenn er die Ausbildung oder das Praktikum aufgeben oder sich für eine andere Berufstätigkeit ausbilden lassen will (§ 22 Abs. 2 BBiG).
(3) Jede Kündigung bedarf der Schriftform und muss im Fall des Absatzes 2 unter Angabe der Kündigungsgründe erfolgen.
(4) Bei vorzeitiger Beendigung erhält der Praktikant eine Bescheinigung über die bis dahin abgeleistete Zeit.

§ 10 Zeugnis und Schlussbestimmungen
(1) Bei Beendigung des Praktikums erteilt das Unternehmen dem Praktikanten ein schriftliches Zeugnis über Art, Dauer und Ziel des Praktikums sowie die erworbenen Fähigkeiten und Kenntnisse (§ 16 BBiG). Auf Verlangen des Praktikanten werden auch Leistung und Verhalten beurteilt. Für Pflichtpraktika stellt das Unternehmen zusätzlich die von der [Hochschule / Schule] verlangte Praktikumsbescheinigung aus.
(2) Tarifverträge und Betriebsvereinbarungen finden auf das Praktikum keine Anwendung. [Alternativ: Es gilt der Tarifvertrag [Bezeichnung].]
(3) Änderungen dieses Vertrags bedürfen der Schriftform. Sollte eine Bestimmung unwirksam sein, bleibt der Vertrag im Übrigen wirksam.
(4) Der Praktikant [und seine gesetzlichen Vertreter] bestätigt, eine unterschriebene Ausfertigung dieses Vertrags erhalten zu haben.

[Ort], den [Datum]


______________________________
[Firma], vertreten durch [Vorname Nachname]
Unternehmen


______________________________
[Vorname Nachname]
Praktikant


[______________________________
[Vorname Nachname], gesetzlicher Vertreter (bei Minderjährigen)]

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
