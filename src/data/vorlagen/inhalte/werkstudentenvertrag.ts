// Inhalt der Vorlage „werkstudentenvertrag“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../arbeit.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen Werkstudentenvertrag brauchst",
        text: `Eine Studentin soll dein Frontend weiterbauen, ein Student übernimmt Social Media und Support, und beide wollen mehr verdienen, als ein Minijob erlaubt. Dann ist der Werkstudentenvertrag das richtige Muster: Der Student ist regulärer Teilzeitarbeitnehmer, aber du zahlst nur den Arbeitgeberanteil zur Rentenversicherung und sparst Kranken-, Pflege- und Arbeitslosenversicherung.

Die Vorlage ist für Beschäftigungen zwischen der Minijob-Grenze und 20 Wochenstunden in der Vorlesungszeit gebaut und regelt die Aufstockung in den Semesterferien gleich mit. Sie passt nicht für Pflichtpraktika, die in der Studienordnung stehen, und nicht für Studierende, die hauptsächlich arbeiten und nebenbei eingeschrieben sind; dann greift das Werkstudentenprivileg nicht, und du brauchst einen normalen Teilzeitarbeitsvertrag.`,
      },
      {
        titel: "Was muss in einen Werkstudentenvertrag?",
        text: `Weil der Werkstudent arbeitsrechtlich ein normaler Arbeitnehmer ist, gelten alle Pflichtangaben des Nachweisgesetzes. Dazu kommen die Punkte, die den sozialversicherungsrechtlichen Status absichern:

- Immatrikulation, Hochschule, Studiengang und Matrikelnummer im Vertragskopf
- Die Verpflichtung, jedes Semester die Immatrikulationsbescheinigung vorzulegen und Exmatrikulation, Urlaubssemester oder Studienabschluss sofort zu melden (§ 2)
- Die 20-Stunden-Grenze in der Vorlesungszeit, die Aufstockung in der vorlesungsfreien Zeit und die 26-Wochen-Regel (§ 3)
- Stundenlohn mindestens in Höhe des Mindestlohns, monatliche Abrechnung und der Hinweis auf die Rentenversicherungspflicht (§ 4)
- Urlaub nach Arbeitstagen pro Woche und Freistellung für Prüfungen (§ 5)
- Verschwiegenheit und die Rechte an Arbeitsergebnissen, bei Software nach § 69b UrhG (§ 7)
- Probezeit, Kündigung, Klagefrist und was bei Studienende passiert (§ 8)

Der Abschnitt zu Arbeitsergebnissen ist für Tech-Start-ups entscheidend: Ohne ihn kann ein Student später behaupten, der Code gehöre ihm, und § 7 Abs. 3 verhindert, dass Firmendaten ungefragt in einer Bachelorarbeit landen.`,
      },
      {
        titel: "Werkstudentenvertrag Muster ausfüllen",
        text: `Trage im Kopf die Hochschule, den Studiengang und die Matrikelnummer ein und lass dir vor der Unterschrift die aktuelle Immatrikulationsbescheinigung geben. In § 1 wählst du zwischen unbefristet und kalendermäßig befristet; die Zweckbefristung „bis zum Studienende“ ist bewusst nicht vorgesehen, weil sie rechtlich unsicher ist.

In § 3 Abs. 1 setzt du die Wochenstunden in der Vorlesungszeit, höchstens 20, und in Abs. 2 die Obergrenze für die Semesterferien. In § 2 Abs. 2 legst du die Termine fest, bis zu denen die neue Bescheinigung vorliegen muss; der 15. April und der 15. Oktober passen zu den meisten Semestern. § 4 braucht den Stundenlohn oder ein Monatsgehalt für die feste Stundenzahl plus einen Satz für Zusatzstunden. In § 5 rechnest du den Urlaub nach Arbeitstagen pro Woche aus und entscheidest, ob du bezahlte Prüfungstage gewährst. In § 8 setzt du Probezeit und Kündigungsfrist. Melde den Werkstudenten mit dem Personengruppenschlüssel für Werkstudenten bei der Krankenkasse an, in der er versichert ist.`,
      },
      {
        titel: "Typische Fehler beim Werkstudentenvertrag",
        text: `Der teuerste Fehler ist die überschrittene 20-Stunden-Grenze in der Vorlesungszeit. Lässt du den Studenten in Projektphasen regelmäßig 25 Stunden arbeiten, fällt das Privileg weg und die Krankenkasse fordert für den gesamten Zeitraum die vollen Beiträge nach, oft erst Jahre später bei der Betriebsprüfung. Die Vorlage erlaubt Mehrarbeit nur abends, nachts und am Wochenende und begrenzt sie mit der 26-Wochen-Regel.

Zweiter Fehler: Die Immatrikulationsbescheinigung wird einmal eingesammelt und nie wieder. Ohne lückenlosen Nachweis in den Lohnunterlagen gilt der Status als nicht belegt. Dritter Fehler ist das Urlaubssemester: Der Student bleibt eingeschrieben, ist aber kein ordentlich Studierender mehr; in dieser Zeit entfällt das Privileg.

Vermeide außerdem den Stundenlohn unter Mindestlohn mit dem Argument „ist ja noch Student“, fehlende Regelungen zu Arbeitsergebnissen bei Entwicklern und Designern sowie die Annahme, ein Werkstudent könne jederzeit formlos gehen. Kündigung, Fristen und Schriftform gelten wie bei jedem anderen Arbeitnehmer.`,
      },
      {
        titel: "Rechtliche Grundlagen: Werkstudentenprivileg, 20-Stunden-Regel, Mindestlohn",
        text: `Das Werkstudentenprivileg folgt aus § 6 Abs. 1 Nr. 3 SGB V und § 27 Abs. 4 SGB III: Ordentlich Studierende, deren Beschäftigung dem Studium nach Zeit und Umfang untergeordnet ist, sind in Kranken-, Pflege- und Arbeitslosenversicherung versicherungsfrei. Die Sozialversicherungsträger konkretisieren das mit der 20-Stunden-Grenze in der Vorlesungszeit und der 26-Wochen-Regel für Zeiten mit mehr Stunden. In der Rentenversicherung besteht Versicherungspflicht mit dem normalen Beitragssatz für beide Seiten.

Arbeitsrechtlich gelten das Nachweisgesetz, das Mindestlohngesetz, das Bundesurlaubsgesetz, das Entgeltfortzahlungsgesetz und die Kündigungsfristen des § 622 BGB ohne Abstriche. Eine Befristung braucht nach § 14 Abs. 4 TzBfG die Schriftform vor Arbeitsbeginn; eine spätere sachgrundlose Befristung desselben Studenten als Vollzeitkraft ist wegen des Vorbeschäftigungsverbots in der Regel ausgeschlossen. Die Rechte an Software, die ein Arbeitnehmer in Erfüllung seiner Aufgaben schreibt, stehen nach § 69b UrhG dem Arbeitgeber zu; für andere Werke braucht es die ausdrückliche Rechteeinräumung in § 7.`,
      },
      {
        titel: "Wann die Werkstudentenvertrag-Vorlage nicht reicht",
        text: `Promotionsstudierende, Studierende an Berufsakademien in dualen Modellen, Teilnehmer an Fernstudiengängen mit geringem Umfang und Studierende ohne Immatrikulation an einer staatlich anerkannten Hochschule fallen nicht unter das Privileg; hier brauchst du einen Teilzeitarbeitsvertrag mit voller Sozialversicherung. Ausländische Studierende aus Drittstaaten dürfen nur eine begrenzte Zahl von Tagen im Jahr arbeiten; prüfe den Aufenthaltstitel vor der Einstellung.

Soll der Student nach dem Abschluss bleiben, schließt du einen neuen Arbeitsvertrag; denk dabei an das Vorbeschäftigungsverbot für Befristungen. Für Tätigkeiten mit Zugang zu Quellcode und Kundendaten ergänzt die Verschwiegenheitserklärung für Mitarbeiter den Vertrag. Bei Tarifbindung oder Betriebsrat gelten zusätzliche Vorgaben. GründerX ist Software, keine Rechts- oder Sozialversicherungsberatung; bei Unsicherheit über den Status hilft eine Anfrage bei der Krankenkasse des Studenten.`,
      },
    ],
  text: `Arbeitsvertrag für Werkstudenten

zwischen

[Firma, Rechtsform], vertreten durch [Vorname Nachname, Funktion], [Straße, PLZ Ort]
– nachfolgend „Arbeitgeber“ –

und

[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort], immatrikuliert an der [Hochschule] im Studiengang [Studiengang], Matrikelnummer [Nummer]
– nachfolgend „Werkstudent“ –

§ 1 Beginn, Tätigkeit und Arbeitsort
(1) Der Werkstudent wird ab dem [Datum] [auf unbestimmte Zeit / befristet bis zum [Datum] nach § 14 Abs. 2 TzBfG; die Befristung ist vor Arbeitsbeginn schriftlich vereinbart] als Werkstudent im Bereich [z. B. „Softwareentwicklung“] eingestellt.
(2) Zu den Aufgaben gehören insbesondere: [z. B. „Entwicklung und Test von Web-Anwendungen, Pflege der Dokumentation, Unterstützung des Teams bei Projekten“]. Der Arbeitgeber kann im Rahmen des billigen Ermessens (§ 106 GewO) gleichwertige Aufgaben zuweisen, die dem Ausbildungsstand des Werkstudenten entsprechen.
(3) Arbeitsort ist [Straße, PLZ Ort]. [Optional: Mobiles Arbeiten ist nach Absprache im Umfang von bis zu [z. B. 50] % der Arbeitszeit möglich; Einzelheiten regelt eine gesonderte Vereinbarung.]
(4) Tarifverträge und Betriebsvereinbarungen finden auf das Arbeitsverhältnis keine Anwendung.

§ 2 Werkstudentenstatus und Nachweispflichten
(1) Der Werkstudent ist als ordentlich Studierender an einer staatlichen oder staatlich anerkannten Hochschule eingeschrieben. Das Studium steht im Vordergrund; die Beschäftigung ist ihm nach Zeit und Umfang untergeordnet (Werkstudentenprivileg, § 6 Abs. 1 Nr. 3 SGB V, § 27 Abs. 4 SGB III).
(2) Der Werkstudent legt bei Vertragsschluss und danach unaufgefordert zu Beginn jedes Semesters, spätestens bis zum [z. B. 15.04. bzw. 15.10.], eine aktuelle Immatrikulationsbescheinigung vor.
(3) Der Werkstudent teilt dem Arbeitgeber unverzüglich mit, wenn er exmatrikuliert wird, ein Urlaubssemester nimmt, das Studium abschließt oder abbricht, in ein Promotionsstudium wechselt, das 25. Fachsemester überschreitet oder weitere Beschäftigungen aufnimmt. Diese Umstände beeinflussen die sozialversicherungsrechtliche Beurteilung.
(4) Fällt das Werkstudentenprivileg weg, wird die Beschäftigung als reguläre Teilzeitbeschäftigung sozialversicherungspflichtig fortgeführt, bis die Parteien eine Änderung vereinbaren oder das Arbeitsverhältnis beendet wird.

§ 3 Arbeitszeit in Vorlesungszeit und Semesterferien
(1) Während der Vorlesungszeit beträgt die regelmäßige Arbeitszeit [z. B. 16, höchstens 20] Stunden pro Woche. Die Lage der Arbeitszeit stimmen die Parteien unter Berücksichtigung des Stundenplans jeweils [z. B. monatlich] ab; der Stundenplan hat Vorrang vor betrieblichen Wünschen.
(2) In der vorlesungsfreien Zeit kann die Arbeitszeit nach Absprache auf bis zu [z. B. 40] Stunden pro Woche erhöht werden. Die Parteien achten darauf, dass der Werkstudent im Kalenderjahr nicht in mehr als 26 Wochen mehr als 20 Stunden pro Woche arbeitet. Die Erhöhung ist vorher in Textform zu vereinbaren und endet spätestens mit Beginn der Vorlesungszeit.
(3) Die Höchstgrenze von 20 Stunden pro Woche in der Vorlesungszeit darf nur überschritten werden, wenn die Mehrarbeit am Abend (nach [z. B. 18:00] Uhr), in der Nacht oder am Wochenende geleistet wird und die Grenze nach Absatz 2 Satz 2 eingehalten bleibt. Die Anordnung von Überstunden ist im Übrigen ausgeschlossen.
(4) Der Werkstudent erfasst Beginn, Ende und Dauer seiner täglichen Arbeitszeit [im System / auf dem Stundenzettel]. Die gesetzlichen Ruhepausen und Ruhezeiten nach dem Arbeitszeitgesetz sind einzuhalten.

§ 4 Vergütung und Fälligkeit
(1) Der Werkstudent erhält einen Bruttostundenlohn von [Betrag, mindestens 13,90] EUR [alternativ: ein monatliches Bruttogehalt von [Betrag] EUR für die in § 3 Abs. 1 vereinbarte Arbeitszeit; zusätzliche Stunden in der vorlesungsfreien Zeit werden mit [Betrag] EUR je Stunde vergütet]. Der Stundenlohn unterschreitet den jeweils gültigen gesetzlichen Mindestlohn nicht.
(2) Die Vergütung wird monatlich nachträglich auf Basis der erfassten Stunden abgerechnet und ist am [z. B. letzten Bankarbeitstag des Monats / 10. des Folgemonats] fällig; die Zahlung erfolgt bargeldlos auf das vom Werkstudenten benannte Konto.
(3) Die Beschäftigung ist rentenversicherungspflichtig; Beiträge zur Kranken-, Pflege- und Arbeitslosenversicherung fallen nicht an, solange das Werkstudentenprivileg besteht. Der Werkstudent ist selbst für seine Krankenversicherung (studentische oder Familienversicherung) verantwortlich und weist sie auf Verlangen nach.
(4) [Optional: Sonderzahlungen: [Bezeichnung, Betrag, Fälligkeit].] Zuschläge für Sonn-, Feiertags- und Nachtarbeit werden [nicht / wie folgt: [Prozentsatz]] gezahlt.

§ 5 Urlaub und Prüfungszeiten
(1) Der Werkstudent hat Anspruch auf bezahlten Erholungsurlaub von [z. B. 12] Arbeitstagen im Kalenderjahr bei einer [z. B. Drei]-Tage-Woche. Der Anspruch wird nach dem Verhältnis der Arbeitstage pro Woche zu einer Fünf-Tage-Woche mit [z. B. 20] Tagen berechnet. Ändert sich die Zahl der wöchentlichen Arbeitstage, wird der Urlaub für die Folgezeit angepasst.
(2) Der Urlaub wird unter Berücksichtigung der Wünsche des Werkstudenten und der betrieblichen Belange festgelegt; im Eintritts- und Austrittsjahr wird er zeitanteilig gewährt, soweit § 5 BUrlG nichts anderes bestimmt. Bei Beendigung wird nicht genommener Urlaub abgegolten.
(3) Für Prüfungen, Pflichtveranstaltungen und Exkursionen stellt der Arbeitgeber den Werkstudenten auf rechtzeitigen Antrag (mindestens [z. B. 2] Wochen vorher) unbezahlt frei. [Optional: Je Semester werden bis zu [z. B. 3] bezahlte Freistellungstage für Prüfungstage gewährt.]

§ 6 Krankheit und Entgeltfortzahlung
(1) Der Werkstudent teilt eine Arbeitsverhinderung unverzüglich vor Beginn der Arbeitszeit mit und lässt eine Arbeitsunfähigkeit, die länger als drei Kalendertage dauert, spätestens am darauffolgenden Arbeitstag ärztlich feststellen.
(2) Die Entgeltfortzahlung im Krankheitsfall richtet sich nach dem Entgeltfortzahlungsgesetz. Bei Stundenlohn wird der Durchschnitt der letzten [z. B. 3] Monate zugrunde gelegt.

§ 7 Verschwiegenheit, Arbeitsergebnisse, Datenschutz
(1) Der Werkstudent bewahrt über Geschäfts- und Betriebsgeheimnisse, Quellcode, Kundendaten und vertrauliche Angelegenheiten des Arbeitgebers Stillschweigen, auch nach Beendigung des Arbeitsverhältnisses, solange ein berechtigtes Geheimhaltungsinteresse besteht. Die Rechte aus dem Geschäftsgeheimnisgesetz und dem Hinweisgeberschutzgesetz bleiben unberührt.
(2) Alle Arbeitsergebnisse, die der Werkstudent in Erfüllung seiner Aufgaben schafft (insbesondere Software, Texte, Grafiken, Konzepte), stehen dem Arbeitgeber zu. Der Werkstudent räumt dem Arbeitgeber daran das ausschließliche, zeitlich, räumlich und inhaltlich unbeschränkte Nutzungsrecht ein; für Software gilt § 69b UrhG. Die Vergütung nach § 4 gilt diese Rechteeinräumung ab, soweit gesetzlich zulässig. Erfindungen unterliegen dem Arbeitnehmererfindungsgesetz.
(3) Die Verwendung von Arbeitsergebnissen oder Unternehmensdaten für Abschluss- oder Seminararbeiten bedarf der vorherigen Zustimmung des Arbeitgebers in Textform.
(4) Personenbezogene Daten verarbeitet der Werkstudent nur im Rahmen seiner Aufgaben und nach Weisung des Arbeitgebers. Bei Beendigung gibt er alle Arbeitsmittel, Zugangsdaten und Unterlagen zurück und löscht lokale Kopien.

§ 8 Probezeit, Kündigung, Ende des Studiums
(1) Die ersten [z. B. 3, höchstens 6] Monate gelten als Probezeit mit einer beiderseitigen Kündigungsfrist von zwei Wochen.
(2) Danach kann das Arbeitsverhältnis von beiden Seiten mit einer Frist von [z. B. 4 Wochen zum 15. oder zum Ende eines Kalendermonats] gekündigt werden; verlängerte gesetzliche Fristen nach § 622 Abs. 2 BGB gelten für beide Seiten. [Bei Befristung: Das befristete Arbeitsverhältnis kann vor Ablauf der Befristung ordentlich gekündigt werden (§ 15 Abs. 4 TzBfG).]
(3) Jede Kündigung bedarf der Schriftform (§ 623 BGB). Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
(4) Hinweis auf das Kündigungsverfahren: Will der Werkstudent geltend machen, dass eine Kündigung unwirksam ist, muss er innerhalb von drei Wochen nach Zugang Klage beim Arbeitsgericht erheben (§ 4 KSchG). Nach Zugang einer Kündigung ist er verpflichtet, sich unverzüglich bei der Agentur für Arbeit arbeitsuchend zu melden (§ 38 SGB III).
(5) Endet das Studium durch Abschluss, Abbruch oder Exmatrikulation, teilen die Parteien einander unverzüglich mit, ob sie das Arbeitsverhältnis als reguläres Arbeitsverhältnis fortsetzen wollen. Kommt keine Einigung zustande, kann jede Seite ordentlich nach Absatz 2 kündigen.

§ 9 Ausschlussfristen und Schlussbestimmungen
(1) Ansprüche aus dem Arbeitsverhältnis verfallen, wenn sie nicht innerhalb von drei Monaten nach Fälligkeit in Textform gegenüber der anderen Partei geltend gemacht und, bei Ablehnung oder Schweigen über einen Monat, innerhalb von drei weiteren Monaten eingeklagt werden. Ausgenommen sind Ansprüche auf den gesetzlichen Mindestlohn, Ansprüche aus Haftung wegen Vorsatz oder wegen Verletzung von Leben, Körper oder Gesundheit sowie unverzichtbare Ansprüche.
(2) Fortbildung und betriebliche Altersversorgung: Betrieblich erforderliche Fortbildungen bietet der Arbeitgeber auf seine Kosten an. Der Anspruch auf Entgeltumwandlung nach § 1a BetrAVG bleibt unberührt; Versorgungsträger ist [Name und Anschrift / derzeit nicht eingerichtet].
(3) Änderungen dieses Vertrags bedürfen der Textform; das gilt auch für diese Klausel. Sollte eine Bestimmung unwirksam sein, bleibt der Vertrag im Übrigen wirksam.
(4) Der Werkstudent bestätigt, eine unterschriebene Ausfertigung dieses Vertrags erhalten zu haben.

[Ort], den [Datum]


______________________________
[Firma], vertreten durch [Vorname Nachname]
Arbeitgeber


______________________________
[Vorname Nachname]
Werkstudent

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
