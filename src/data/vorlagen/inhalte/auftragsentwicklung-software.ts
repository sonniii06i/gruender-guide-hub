// Inhalt der Vorlage „auftragsentwicklung-software“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../geheimhaltung.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen Software-Entwicklungsvertrag brauchst",
        text: `Sobald jemand außerhalb deines Unternehmens Software für dich baut, brauchst du diesen Vertrag: die Agentur, die deine App entwickelt, der Freelancer, der die Schnittstelle zum Warenwirtschaftssystem schreibt, das Entwicklerstudio, das den Prototyp für die Finanzierungsrunde liefert. Ohne Vertrag gilt das gesetzliche Werkvertragsrecht mit all seinen Lücken: kein Pflichtenheft, keine Abnahmeregel, keine klaren Rechte am Quellcode.

Gerade der letzte Punkt entscheidet über den Wert deines Unternehmens. Investoren und Käufer prüfen in der Due Diligence, ob alle Rechte an der Software bei deiner Gesellschaft liegen. Ein Entwicklungsvertrag mit vollständiger Rechteklausel ist der Nachweis dafür.

Die Vorlage ist auch für Entwickler gedacht, die Leistungsumfang, Mitwirkung des Kunden und Abnahme sauber regeln wollen, bevor sie anfangen. Für Standardsoftware, die du Kunden zur Nutzung überlässt, nimm den Software-Lizenzvertrag; für laufende Betreuung ohne neues Werk einen Wartungsvertrag, den § 10 der Vorlage optional vorsieht.`,
      },
      {
        titel: "Was in einen Entwicklungsvertrag für Software gehört",
        text: `Das Muster ist als Werkvertrag nach §§ 631 ff. BGB angelegt und regelt die Punkte, an denen IT-Projekte scheitern:

- § 1 Vertragsgegenstand, Lastenheft des Auftraggebers, Pflichtenheft des Auftragnehmers als verbindlicher Maßstab, Rangfolge bei Widersprüchen, nicht geschuldete Leistungen.
- § 2 Meilensteine mit Terminen und Teilbeträgen, Projekttermine, Testsystem und Repository-Zugang, Change-Request-Verfahren, optionale Vertragsstrafe bei Verzug.
- § 3 Mitwirkung des Auftraggebers mit Fristen und Folgen bei Verzögerung.
- § 4 Lieferung je Meilenstein, vollständige Übergabe mit Quellcode, Build-Skripten und Dokumentation, Abnahmetest, Abnahmefiktion nach § 640 Abs. 2 BGB, Teilabnahmen.
- § 5 Festpreis nach Meilensteinen oder Aufwand mit Budgetdeckel und Warnschwelle.
- § 6 ausschließliches, unbeschränktes, übertragbares Nutzungsrecht an Quellcode und allen Ergebnissen; einfaches Recht an vorbestehenden Bausteinen des Entwicklers nach Anlage 3; Rechtekette zu Mitarbeitern und Subunternehmern.
- § 7 Open Source: Copyleft nur mit Freigabe, vollständige Komponentenliste, Sicherheitslücken.
- § 8 Gewährleistung mit Nachbesserung, Selbstvornahme und Verjährung.
- § 9 Haftung mit Obergrenze und IT-Haftpflicht.
- § 10 optionale Pflege mit Pauschale und Reaktionszeiten.
- § 11 Geheimhaltung, Auftragsverarbeitung, Kündigung nach §§ 648, 648a BGB, Herausgabe bei Beendigung.
- § 12 Schriftform, Selbstständigkeit des Auftragnehmers, Gerichtsstand, Anlagen.`,
      },
      {
        titel: "Software-Entwicklungsvertrag Vorlage ausfüllen",
        text: `Lade das Muster kostenlos als Word oder PDF herunter. Beginne mit § 1: Beschreibe die Software in einem Satz und lege dein Lastenheft als Anlage 1 bei. Setze die Frist, bis zu der der Entwickler das Pflichtenheft liefert; erst mit deiner Freigabe wird es als Anlage 2 verbindlich. Prüfe die Liste der nicht geschuldeten Leistungen und ergänze, was du zusätzlich brauchst, etwa App-Store-Veröffentlichung oder Datenmigration.

In § 2 trägst du die Meilensteine mit Terminen und Beträgen ein und bestimmst den Rhythmus der Projekttermine sowie die Ansprechpartner. Entscheide, ob die Vertragsstrafe in Abs. 4 gelten soll. In § 3 setzt du realistische Antwortfristen für dich selbst. In § 4 die Prüffrist für die Abnahme und die Frist, nach der produktive Nutzung als Abnahme gilt.

In § 5 wählst du Festpreis oder Aufwand mit Budgetdeckel und streichst die andere Variante. In § 6 lässt du dir die vorbestehenden Bausteine des Entwicklers in Anlage 3 abschließend auflisten; alles, was dort fehlt, gehört dir. In § 7 bis § 9 Fristen, Verjährung, Haftungsgrenze und Deckungssumme. Entscheide, ob § 10 Pflege gelten soll. Dann Anlagen, Ort, Datum, Unterschriften.`,
      },
      {
        titel: "Typische Fehler bei der Auftragsentwicklung",
        text: `Erstens: ohne Pflichtenheft starten. Ohne verbindliche Spezifikation gibt es keinen Maßstab für Mängel und keinen Schutz vor Mehrkosten. Beim Festpreis trägt der Entwickler das Risiko, beim Aufwand du; in beiden Fällen braucht ihr das Dokument.

Zweitens: die Abnahme verschlafen. Wer innerhalb der Prüffrist keine Mängel benennt, hat nach § 640 Abs. 2 BGB abgenommen; die Vergütung wird fällig, die Gewährleistung läuft, die Beweislast dreht sich. Plane die Testzeit ein und protokolliere Mängel in Textform.

Drittens: Rechte nur am Objektcode. Ohne Quellcode, Bearbeitungsrecht und Weiterentwicklungsrecht bist du vom Entwickler abhängig und für Investoren uninteressant. § 6 der Vorlage räumt dir das ausschließliche Recht ein und verlangt die Herausgabe.

Viertens: Copyleft im Produkt. Fest eingebundene GPL- oder AGPL-Komponenten können dich zwingen, deinen Quellcode offenzulegen. Die Vorlage verlangt eine Komponentenliste und deine Freigabe.

Fünftens: Change Requests per Chat. Jede ungeregelte Änderung verschiebt Termine und Kosten. § 2 Abs. 3 legt ein Verfahren mit Angebot und Annahme in Textform fest; halte dich daran, auch wenn es lästig ist.`,
      },
      {
        titel: "Rechtliche Grundlagen: Werkvertrag, Abnahme, Urheberrecht",
        text: `Der Software-Entwicklungsvertrag ist ein Werkvertrag nach §§ 631 ff. BGB; geschuldet ist der Erfolg, also die funktionsfähige Software, nicht nur die Tätigkeit. Die Abnahme nach § 640 BGB ist der Dreh- und Angelpunkt: Mit ihr wird die Vergütung fällig (§ 641 BGB), beginnt die Verjährung der Mängelansprüche und geht die Beweislast auf den Auftraggeber über. § 640 Abs. 2 BGB fingiert die Abnahme, wenn der Auftraggeber nach Fristsetzung keinen Mangel benennt. Die Mängelrechte stehen in §§ 634 ff. BGB, darunter die Selbstvornahme nach § 637 BGB.

Der Auftraggeber darf den Werkvertrag nach § 648 BGB jederzeit kündigen, schuldet dann aber die Vergütung abzüglich ersparter Aufwendungen; der Unternehmer kann pauschal fünf Prozent der nicht erbrachten Leistung verlangen. § 648a BGB regelt die Kündigung aus wichtigem Grund für beide Seiten.

Urheberrechtlich ist Software nach § 69a UrhG geschützt. Die Rechte des Entwicklers nach § 69c UrhG werden mit der Klausel in § 6 als ausschließliches Nutzungsrecht eingeräumt; ohne eine solche Klausel gilt die Zweckübertragungsregel des § 31 Abs. 5 UrhG. Für angestellte Entwickler des Auftragnehmers gilt § 69b UrhG, für Freelancer nicht, weshalb die Vorlage die Rechtekette in § 6 Abs. 3 absichert.`,
      },
      {
        titel: "Wann das Muster nicht reicht",
        text: `Die Vorlage bildet ein klassisches Projekt mit Meilensteinen ab. Bei agiler Entwicklung in Sprints ohne festen Endzustand passt ein Werkvertrag nur eingeschränkt; dort arbeiten viele Teams mit einem Rahmenvertrag und Sprint-Aufträgen, die eher dienstvertraglich ausgestaltet sind. Auch bei Entwicklung mit Offshore-Teams, bei Verträgen in englischer Sprache oder unter ausländischem Recht brauchst du anwaltliche Hilfe, schon wegen der Vollstreckbarkeit und der Rechteübertragung nach dortigem Recht.

Software mit besonderen Anforderungen, etwa Medizinprodukte-Software, Zahlungsverkehr, KI-Systeme unter der KI-Verordnung oder Systeme mit hohem Datenschutzrisiko, verlangt regulatorische Vorgaben im Pflichtenheft, die das Muster nicht kennt. Große Projekte mit Festpreisen im sechsstelligen Bereich, Vertragsstrafen und Escrow-Regelungen gehören in die Hände einer IT-Rechtskanzlei.

Hinzu kommt das Thema Scheinselbstständigkeit: Arbeitet ein einzelner Freelancer monatelang nur für dich in deinen Räumen mit deinen Werkzeugen, hilft auch § 12 Abs. 2 der Vorlage nicht; dann prüfe den Status bei der Deutschen Rentenversicherung. GründerX ist eine Software für Gründer und keine Rechtsberatung. Die Vorlage spart Zeit und Beratungskosten, ersetzt aber bei hohem Einsatz nicht die Prüfung durch eine Kanzlei.`,
      },
    ],
  text: `Software-Entwicklungsvertrag

zwischen

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Auftraggeber“ –

und

[Firma / Vorname Nachname], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Auftragnehmer“ –

– gemeinsam „die Parteien“ –

§ 1 Vertragsgegenstand, Lastenheft und Pflichtenheft
(1) Der Auftragnehmer entwickelt für den Auftraggeber die Software „[Projektname]“ (nachfolgend „Software“), bestehend aus [z. B. „einer Web-Anwendung mit Nutzerverwaltung, Buchungsmodul und Admin-Oberfläche“ / „einer iOS- und Android-App“ / „einer Schnittstelle zwischen [System A] und [System B]“]. Der Vertrag ist ein Werkvertrag im Sinne der §§ 631 ff. BGB; geschuldet ist die funktionsfähige, abnahmefähige Software.
(2) Die Anforderungen des Auftraggebers sind im Lastenheft (Anlage 1) beschrieben. Der Auftragnehmer erstellt auf dieser Grundlage bis zum [Datum] ein Pflichtenheft mit der technischen Umsetzung (Funktionen, Architektur, Technologien, Schnittstellen, Datenmodell, Systemumgebung, Akzeptanzkriterien). Mit Freigabe des Pflichtenhefts durch den Auftraggeber in Textform wird es als Anlage 2 verbindlicher Maßstab für Leistung und Abnahme. Bei Widersprüchen gilt das Pflichtenheft vor dem Lastenheft, dieser Vertrag vor beiden.
(3) Nicht geschuldet sind, soweit nicht im Pflichtenheft aufgeführt: Hosting und Betrieb, Beschaffung von Lizenzen Dritter, Datenmigration, Schulung, Erstellung von Inhalten, App-Store-Veröffentlichung sowie Pflege und Weiterentwicklung nach Abnahme (siehe § 10).

§ 2 Projektablauf, Meilensteine und Änderungen
(1) Die Entwicklung erfolgt in folgenden Meilensteinen:
   a) Meilenstein 1: Pflichtenheft und Klick-Prototyp – bis [Datum] – [Betrag] EUR
   b) Meilenstein 2: [z. B. Backend und Nutzerverwaltung] – bis [Datum] – [Betrag] EUR
   c) Meilenstein 3: [z. B. Kernfunktionen gemäß Pflichtenheft Kapitel …] – bis [Datum] – [Betrag] EUR
   d) Meilenstein 4: Gesamtsystem, Dokumentation, Abnahme – bis [Datum] – [Betrag] EUR
Die Termine sind verbindlich. Sie verschieben sich angemessen, soweit der Auftraggeber Mitwirkungsleistungen nach § 3 verspätet erbringt oder Änderungen nach Absatz 3 vereinbart werden.
(2) Die Parteien halten [wöchentlich / zweiwöchentlich] einen Projekttermin ab. Der Auftragnehmer berichtet dabei über Fortschritt, Risiken und Aufwand und stellt dem Auftraggeber laufend Zugang zu einem Testsystem und zum Quellcode-Repository (lesend) zur Verfügung. Ansprechpartner: für den Auftraggeber [Name], für den Auftragnehmer [Name].
(3) Änderungswünsche des Auftraggebers (Change Requests) teilt dieser in Textform mit. Der Auftragnehmer prüft sie innerhalb von [5] Werktagen und unterbreitet ein Angebot zu Auswirkungen auf Leistung, Termine und Vergütung. Die Änderung wird erst nach Annahme des Angebots in Textform Vertragsbestandteil. Geringfügige Änderungen ohne Auswirkung auf Aufwand und Termin führt der Auftragnehmer ohne Mehrvergütung aus.
(4) [Optional:] Gerät der Auftragnehmer mit einem Meilenstein aus Gründen, die er zu vertreten hat, um mehr als [10] Werktage in Verzug, zahlt er eine Vertragsstrafe von [0,5] % der Gesamtvergütung je angefangene Woche, höchstens [5] % der Gesamtvergütung. Die Vertragsstrafe wird auf Schadensersatz angerechnet.

§ 3 Mitwirkung des Auftraggebers
(1) Der Auftraggeber stellt rechtzeitig alle für die Entwicklung erforderlichen Informationen, Inhalte, Zugänge, Testdaten, Schnittstellenbeschreibungen Dritter und Designvorgaben bereit, benennt einen entscheidungsbefugten Ansprechpartner und beantwortet Rückfragen innerhalb von [3] Werktagen.
(2) Er prüft Zwischenergebnisse und Prototypen zeitnah und teilt Beanstandungen in Textform mit. Unterbleibt eine Rückmeldung innerhalb von [10] Werktagen nach Vorlage, darf der Auftragnehmer auf Basis des vorgelegten Stands weiterarbeiten.
(3) Mehraufwand, der durch verspätete oder fehlerhafte Mitwirkung entsteht, wird nach Aufwand zu [Betrag] EUR je Stunde vergütet, nachdem der Auftragnehmer darauf hingewiesen hat.

§ 4 Lieferung, Abnahme und Dokumentation
(1) Der Auftragnehmer liefert je Meilenstein den lauffähigen Stand auf dem Testsystem sowie den Quellcode im Repository des [Auftraggebers / Auftragnehmers mit Zugriff des Auftraggebers]. Mit dem letzten Meilenstein liefert er zusätzlich: vollständigen Quellcode einschließlich Build-Skripten, Konfigurationen und Abhängigkeitslisten, eine technische Dokumentation (Architektur, Installation, Deployment, Schnittstellen), eine Benutzerdokumentation sowie die Liste der Open-Source-Komponenten nach § 7.
(2) Nach Lieferung eines Meilensteins prüft der Auftraggeber innerhalb von [10] Werktagen anhand der Akzeptanzkriterien des Pflichtenhefts (Abnahmetest). Die Abnahme erfolgt in Textform. Der Auftraggeber darf die Abnahme nur wegen wesentlicher Mängel verweigern; unwesentliche Mängel werden in einem Mängelprotokoll festgehalten und vom Auftragnehmer innerhalb von [10] Werktagen behoben.
(3) Verweigert der Auftraggeber die Abnahme, benennt er die Mängel konkret. Der Auftragnehmer behebt sie innerhalb angemessener Frist und liefert erneut zur Abnahme. Erklärt sich der Auftraggeber innerhalb der Prüffrist nicht und benennt er keinen Mangel, gilt die Leistung als abgenommen (§ 640 Abs. 2 BGB); der Auftragnehmer weist bei Lieferung auf diese Folge hin. Die produktive Nutzung der Software durch den Auftraggeber über [20] Werktage ohne wesentliche Mängelrüge steht der Abnahme gleich.
(4) Teilabnahmen von Meilensteinen sind Teilabnahmen im Rechtssinne; die Gesamtabnahme bezieht sich auf das Zusammenwirken aller Teile.

§ 5 Vergütung
[Variante A – Festpreis:]
(1) Die Vergütung für die Entwicklung der Software gemäß Pflichtenheft beträgt pauschal [Betrag] EUR zuzüglich gesetzlicher Umsatzsteuer. Sie wird nach Meilensteinen gemäß § 2 Abs. 1 fällig, jeweils innerhalb von 14 Tagen nach Abnahme des Meilensteins und Rechnungsstellung. [Optional: Bei Vertragsschluss ist eine Anzahlung von [Betrag] EUR fällig, die auf den letzten Meilenstein angerechnet wird.]
(2) Mit dem Festpreis sind alle Leistungen nach § 1 und § 4 einschließlich Dokumentation und Rechteeinräumung abgegolten. Change Requests werden gesondert nach § 2 Abs. 3 vergütet.
[Variante B – Aufwand mit Budgetdeckel:]
(1) Die Vergütung erfolgt nach Aufwand zu [Betrag] EUR je Stunde zuzüglich gesetzlicher Umsatzsteuer, abgerechnet in Einheiten von [15] Minuten. Der Auftragnehmer schätzt den Gesamtaufwand auf [Stunden] Stunden ([Betrag] EUR). Ohne vorherige Freigabe des Auftraggebers in Textform darf ein Budget von [Betrag] EUR (Budgetdeckel) nicht überschritten werden; der Auftragnehmer warnt bei Erreichen von [80] % des Budgets.
(2) Der Auftragnehmer rechnet monatlich mit Tätigkeitsnachweis (Datum, Person, Tätigkeit, Dauer) ab; Rechnungen sind innerhalb von 14 Tagen fällig. Nicht vergütet werden Zeiten für die Behebung eigener Fehler und für Nacherfüllung.
(3) Reisekosten werden nur nach vorheriger Zustimmung erstattet. Bei Zahlungsverzug gelten die gesetzlichen Verzugszinsen.

§ 6 Rechte am Quellcode und an der Software
(1) Der Auftragnehmer räumt dem Auftraggeber mit vollständiger Zahlung der jeweiligen Vergütung das ausschließliche, zeitlich, räumlich und inhaltlich unbeschränkte, übertragbare und unterlizenzierbare Nutzungsrecht an der Software einschließlich Quellcode, Objektcode, Dokumentation, Entwürfen, Designs und allen Zwischenergebnissen für alle bekannten Nutzungsarten ein (§§ 31, 69c UrhG). Dies umfasst insbesondere das Recht, die Software zu vervielfältigen, zu verbreiten, öffentlich zugänglich zu machen, zu bearbeiten, zu übersetzen, weiterzuentwickeln, mit anderer Software zu verbinden, auf Dritte zu übertragen und Dritten Nutzungsrechte einzuräumen, auch ohne Nennung des Auftragnehmers. Bis zur vollständigen Zahlung besteht ein einfaches, widerrufliches Nutzungsrecht zu Testzwecken.
(2) Ausgenommen sind vorbestehende Werkzeuge, Bibliotheken und Standardbausteine des Auftragnehmers, die in Anlage 3 abschließend aufgeführt sind. Hieran erhält der Auftraggeber das einfache, unbefristete, übertragbare Nutzungsrecht im Umfang des Absatzes 1, soweit es für die Nutzung, Bearbeitung und Weiterentwicklung der Software erforderlich ist; der Auftragnehmer darf diese Bausteine weiterhin in anderen Projekten einsetzen. Nicht in Anlage 3 aufgeführte Bestandteile gelten als Auftragsentwicklung nach Absatz 1.
(3) Der Auftragnehmer stellt sicher, dass alle an der Entwicklung beteiligten Mitarbeiter und Subunternehmer ihm die Rechte eingeräumt haben, die er für die Rechteeinräumung nach Absatz 1 benötigt, und dass keine Rechte Dritter entgegenstehen. Subunternehmer setzt er nur mit vorheriger Zustimmung des Auftraggebers ein.
(4) Der Auftragnehmer darf das Projekt nach Freigabe des Auftraggebers als Referenz nennen; eine Nennung im Quellcode, in der Benutzeroberfläche oder in der Dokumentation erfolgt nicht. Das Urheberrecht als solches verbleibt beim jeweiligen Urheber (§ 29 Abs. 1 UrhG); die Urheber verzichten auf die Ausübung des Namensnennungsrechts.

§ 7 Open-Source-Komponenten und Fremdsoftware
(1) Der Auftragnehmer darf Open-Source-Komponenten einsetzen, soweit deren Lizenzen die Nutzung, Bearbeitung und Weitergabe der Software im Umfang des § 6 erlauben und keine Pflicht zur Offenlegung des Quellcodes der Software insgesamt oder zur lizenzgebührenfreien Weitergabe auslösen. Komponenten unter Copyleft-Lizenzen mit dieser Wirkung (insbesondere GPL, AGPL) dürfen nur nach ausdrücklicher Freigabe des Auftraggebers in Textform eingesetzt werden; Komponenten unter permissiven Lizenzen (z. B. MIT, BSD, Apache 2.0) und unter LGPL bei dynamischer Einbindung sind ohne Freigabe zulässig.
(2) Der Auftragnehmer führt eine vollständige Liste aller eingesetzten Open-Source- und Fremdkomponenten mit Version, Lizenz und Bezugsquelle (Anlage 4), hält sie aktuell und liefert die nach den Lizenzen erforderlichen Hinweise und Lizenztexte mit. Fremdsoftware, die Lizenzgebühren auslöst, setzt er nur nach Zustimmung des Auftraggebers ein; die Lizenzen beschafft [der Auftraggeber / der Auftragnehmer im Namen und auf Rechnung des Auftraggebers].
(3) Der Auftragnehmer wird den Auftraggeber über bekannte Sicherheitslücken in eingesetzten Komponenten bis zur Abnahme informieren und sie durch Aktualisierung beheben.

§ 8 Gewährleistung
(1) Der Auftragnehmer gewährleistet, dass die Software bei Abnahme die im Pflichtenheft vereinbarte Beschaffenheit hat, frei von Rechten Dritter ist und nach dem Stand der Technik nach anerkannten Entwicklungsstandards erstellt wurde (lesbarer, dokumentierter Quellcode, Versionierung, keine Schadfunktionen).
(2) Mängel zeigt der Auftraggeber in Textform mit nachvollziehbarer Beschreibung an. Der Auftragnehmer leistet zunächst Nacherfüllung durch Nachbesserung innerhalb angemessener Frist, bei Mängeln, die die Nutzung verhindern, innerhalb von [3] Werktagen beginnend. Schlägt die Nacherfüllung nach zwei Versuchen fehl oder wird sie verweigert, kann der Auftraggeber die Vergütung mindern, vom Vertrag zurücktreten, den Mangel selbst oder durch Dritte beseitigen lassen und Ersatz der erforderlichen Aufwendungen verlangen (§§ 634, 637 BGB) oder Schadensersatz nach § 9 verlangen.
(3) Mängelansprüche verjähren in [12] Monaten ab Abnahme; bei Rechtsmängeln, Arglist, Vorsatz, grober Fahrlässigkeit und Schäden an Leben, Körper und Gesundheit gelten die gesetzlichen Fristen.
(4) Keine Gewährleistung besteht für Mängel, die auf Änderungen des Auftraggebers oder Dritter, auf nicht vereinbarte Systemumgebungen oder auf vom Auftraggeber beigestellte Inhalte, Daten oder Fremdsoftware zurückgehen, es sei denn, der Auftragnehmer hat den Mangel verursacht oder seine Hinweispflicht verletzt.

§ 9 Haftung
(1) Der Auftragnehmer haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit, bei Schäden aus der Verletzung von Leben, Körper oder Gesundheit, nach dem Produkthaftungsgesetz und im Umfang einer übernommenen Garantie.
(2) Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt, höchstens auf [Betrag / die Gesamtvergütung nach diesem Vertrag]. Im Übrigen ist die Haftung bei leichter Fahrlässigkeit ausgeschlossen. Für Datenverlust haftet der Auftragnehmer nur in dem Umfang, der bei regelmäßiger Datensicherung durch den Auftraggeber eingetreten wäre.
(3) Der Auftragnehmer unterhält eine IT-Haftpflichtversicherung mit einer Deckungssumme von mindestens [Betrag] EUR und weist sie auf Verlangen nach.

§ 10 Wartung und Pflege [optional]
(1) Nach Abnahme übernimmt der Auftragnehmer für [12] Monate die Pflege der Software: Behebung von Fehlern außerhalb der Gewährleistung, Aktualisierung von Abhängigkeiten und Sicherheitsupdates, Anpassung an neue Versionen von Betriebssystem, Browser und Plattformen sowie kleinere Anpassungen bis [Stunden] Stunden je Monat. Reaktionszeit bei Störungen, die die Nutzung verhindern: [4] Stunden an Werktagen von [9] bis [17] Uhr; Behebung oder Umgehung innerhalb von [1] Werktag.
(2) Die Pflegepauschale beträgt [Betrag] EUR je Monat zuzüglich Umsatzsteuer; darüber hinausgehende Leistungen werden nach Aufwand zu [Betrag] EUR je Stunde vergütet. Der Pflegevertrag verlängert sich um jeweils [12] Monate, wenn er nicht mit einer Frist von [3] Monaten gekündigt wird.
(3) Rechte an Leistungen der Pflege werden im Umfang des § 6 eingeräumt. [Alternative: Die Parteien schließen bei Bedarf einen gesonderten Wartungsvertrag; der Auftragnehmer bietet die Wartung zu den in Anlage 5 genannten Bedingungen an.]

§ 11 Geheimhaltung, Datenschutz, Kündigung
(1) Die Parteien behandeln alle Geschäftsgeheimnisse der anderen Partei, insbesondere Quellcode, Geschäftsmodell, Daten und Preise, vertraulich und verpflichten ihre Mitarbeiter entsprechend; dies gilt für [3] Jahre nach Vertragsende fort. [Die Geheimhaltungsvereinbarung vom [Datum] gilt ergänzend.]
(2) Verarbeitet der Auftragnehmer personenbezogene Daten aus der Sphäre des Auftraggebers (Testdaten, Zugriff auf Produktivsysteme), schließen die Parteien einen Auftragsverarbeitungsvertrag nach Art. 28 DSGVO. Der Auftragnehmer verwendet für die Entwicklung nach Möglichkeit anonymisierte oder synthetische Daten und gestaltet die Software datenschutzfreundlich (Art. 25 DSGVO).
(3) Der Auftraggeber kann den Vertrag jederzeit kündigen (§ 648 BGB). Der Auftragnehmer erhält in diesem Fall die Vergütung für die bis dahin erbrachten, abnahmefähigen Leistungen; für die nicht erbrachten Leistungen gilt § 648 Satz 2 und 3 BGB. Das Recht beider Parteien zur Kündigung aus wichtigem Grund (§ 648a BGB) bleibt unberührt, insbesondere bei Zahlungsverzug mit mehr als einem Meilenstein, wiederholter Terminüberschreitung oder Insolvenzantrag.
(4) Bei jeder Beendigung übergibt der Auftragnehmer den aktuellen Stand von Quellcode, Dokumentation und Zugangsdaten; die Rechteeinräumung nach § 6 gilt für die bezahlten Leistungen fort.

§ 12 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; das gilt auch für die Aufhebung dieser Klausel. Für Change Requests und Freigaben nach diesem Vertrag genügt die Textform. Allgemeine Geschäftsbedingungen des Auftragnehmers finden keine Anwendung.
(2) Der Auftragnehmer ist selbstständig tätig, bestimmt Arbeitsort und Arbeitszeit selbst und ist nicht in die Betriebsorganisation des Auftraggebers eingegliedert; die Parteien gestalten die Zusammenarbeit entsprechend.
(3) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(4) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Ausschließlicher Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort].
(5) Anlagen: Anlage 1 Lastenheft, Anlage 2 Pflichtenheft (nach Freigabe), Anlage 3 vorbestehende Bausteine des Auftragnehmers, Anlage 4 Open-Source- und Fremdkomponenten, Anlage 5 Wartungsbedingungen (optional).

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Auftraggeber


______________________________
[Vorname Nachname], für den Auftragnehmer

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
