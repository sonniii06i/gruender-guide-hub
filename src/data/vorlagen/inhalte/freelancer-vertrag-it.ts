// Inhalt der Vorlage „freelancer-vertrag-it“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../dienstleistung.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen Freelancer-Vertrag für IT brauchst",
        text: `Diesen Freelancer-Vertrag brauchst du, sobald ein externer Entwickler, DevOps-Spezialist, Data Engineer oder UX-Designer für dein Startup arbeitet, ohne angestellt zu sein. Typische Fälle: Du holst dir für sechs Monate einen Backend-Entwickler in die Sprint-Reihe, du lässt eine Schnittstelle zur Warenwirtschaft bauen, oder du brauchst für den Launch zusätzliche Kapazität im Frontend.

Umgekehrt nutzen IT-Freelancer das Muster als eigenen Standardvertrag, wenn der Kunde keinen hat oder nur unausgewogene Einkaufsbedingungen anbietet. Der Vertrag ist als Dienstvertrag angelegt, weil die meisten Freelancer-Einsätze nach Tagen abgerechnet werden und kein abnahmefähiges Werk zum Festpreis geschuldet ist. Für einzelne Festpreis-Arbeitspakete lässt sich die Werkvertragsregel in § 1 Abs. 3 zuschalten.`,
      },
      {
        titel: "Was muss in einen Freelancer-Vertrag?",
        text: `Ein Freelancer-Vertrag für IT muss drei Dinge besonders gut können: die Selbstständigkeit absichern, die Rechte am Code übertragen und die Zusammenarbeit remote organisieren. Die Vorlage regelt in neun Paragrafen:

- § 1 Projekt und Leistungsgegenstand mit Projektbeschreibung in Anlage 1 und Einordnung als Dienstvertrag
- § 2 Status des Freelancers: keine Weisungen zu Zeit, Ort und Art, keine Anwesenheitspflicht, Recht auf weitere Auftraggeber, eigenes unternehmerisches Risiko, optional die gemeinsame Statusfeststellung
- § 3 Remote-Arbeit, eigene Hardware, Zugänge zu Repository und Ticketsystem, Sprint-Termine nur soweit nötig
- § 4 Tagessatz mit Definition des Personentags, Budget mit Warnschwelle, monatlicher Tätigkeitsnachweis, Reisekosten
- § 5 Rechte am Code: ausschließliche, übertragbare Nutzungsrechte, Vorbestehendes Material, Open-Source-Regeln, Freistellung
- § 6 Geheimhaltung, Auftragsverarbeitung nach Art. 28 DSGVO, IT-Sicherheit, optionale Vertragsstrafe
- § 7 Haftung und IT-Haftpflichtversicherung
- § 8 Laufzeit, Kündigung und Übergabe mit Mitwirkung zum Tagessatz
- § 9 Schlussbestimmungen

Fehlt § 5, bleibt der Code beim Freelancer. Fehlt § 2, hast du bei einer Prüfung durch die Rentenversicherung kein Argument.`,
      },
      {
        titel: "Freelancer-Vertrag Muster ausfüllen",
        text: `Trage im Kopf den Auftraggeber mit Rechtsform und den Freelancer mit Anschrift und Umsatzsteuer-Identifikationsnummer oder Steuernummer ein. In § 1 beschreibst du das Projekt konkret, etwa Sprache, Framework und Ziel der Entwicklung, und legst die Projektbeschreibung als Anlage 1 bei. Wenn einzelne Arbeitspakete zum Festpreis geliefert werden, behalte die Alternative zur Werkleistung, sonst streiche sie.

In § 2 Abs. 6 entscheidest du, ob ihr die Statusfeststellung beantragen wollt. In § 3 trägst du den Ort und die Anzahl der Präsenztage ein, den geplanten Umfang in Personentagen und den Vorlauf für die Verfügbarkeit; wenn der Auftraggeber aus Sicherheitsgründen ein verwaltetes Notebook stellt, behalte die optionale Klammer. In § 4 setzt du Tagessatz, Abrechnungstakt, Gesamtbudget, Warnschwelle, Beanstandungsfrist, Zahlungsziel und die Reisekostensätze.

In § 6 legst du die Dauer der Geheimhaltung und die Vertragsstrafe fest oder streichst sie. In § 7 trägst du Haftungsobergrenze und Deckungssumme der Versicherung ein, in § 8 Beginn, Ende, Verlängerung und Kündigungsfrist. Danach Gerichtsstand, Anlagen, Datum und Unterschriften. Als Word-Datei ist das in einer halben Stunde erledigt.`,
      },
      {
        titel: "Scheinselbstständigkeit und andere typische Fehler",
        text: `Der teuerste Fehler ist die gelebte Scheinselbstständigkeit. Der Vertrag sagt Weisungsfreiheit, die Praxis zeigt Firmenlaptop, Firmen-E-Mail, feste Kernzeiten, Teilnahme an jedem internen Meeting und einen einzigen Auftraggeber über Jahre. Bei einer Prüfung zählt die Gesamtschau, und die Nachzahlung der Sozialversicherungsbeiträge trifft vor allem den Auftraggeber. Halte Vertrag und Alltag deckungsgleich: eigene Geräte, eigene Zeiteinteilung, Ergebnisabstimmung statt Tagesanweisung.

Zweiter Fehler: Rechte am Code nur mündlich oder gar nicht geregelt. Der Freelancer ist Urheber, § 69b UrhG gilt nur für Arbeitnehmer. Ohne § 5 kannst du den Code zwar nutzen, aber nicht sicher weiterverkaufen oder lizenzieren.

Dritter Fehler: Copyleft-Lizenzen ohne Freigabe. Eine GPL-Bibliothek im Kern deines Produkts kann dich zur Offenlegung zwingen; die Komponentenliste aus § 5 Abs. 4 verhindert das. Weitere Stolperfallen sind fehlende Budgetwarnung, Tätigkeitsnachweise ohne Beanstandungsfrist und Produktivdaten in der Entwicklungsumgebung ohne Auftragsverarbeitungsvertrag.`,
      },
      {
        titel: "Rechtliche Grundlagen: Dienstvertrag, SGB IV und Urheberrecht",
        text: `Der Freelancer-Vertrag ist ein Dienstvertrag nach den §§ 611 ff. BGB; geschuldet ist die fachgerechte Entwicklungsleistung, nicht ein abnahmefähiges Werk. Für Festpreis-Pakete gelten ergänzend die §§ 631 ff. BGB mit Abnahme und Mängelhaftung.

Ob eine Beschäftigung im sozialversicherungsrechtlichen Sinn vorliegt, bestimmt § 7 Abs. 1 SGB IV nach Weisungsgebundenheit und Eingliederung in die Arbeitsorganisation. Das Statusfeststellungsverfahren nach § 7a SGB IV bei der Deutschen Rentenversicherung Bund liefert eine verbindliche Entscheidung, seit 2022 auch als Prognose vor Beginn. Freelancer ohne eigene Angestellte, die im Wesentlichen für einen Auftraggeber arbeiten, können nach § 2 Satz 1 Nr. 9 SGB VI selbst rentenversicherungspflichtig sein.

Software ist nach § 69a UrhG urheberrechtlich geschützt. Nutzungsrechte werden nach § 31 UrhG eingeräumt und reichen nur so weit, wie der Vertrag es ausdrücklich sagt. Für personenbezogene Daten gilt Art. 28 DSGVO, für Geschäftsgeheimnisse das Geschäftsgeheimnisgesetz, das angemessene Schutzmaßnahmen wie eine Geheimhaltungsklausel voraussetzt.`,
      },
      {
        titel: "Wann die Vorlage nicht reicht: Statusfeststellung und Anwalt",
        text: `Dauert der Einsatz länger als ein paar Monate, läuft er in Vollzeit oder ist der Freelancer die einzige Person für eine Kernfunktion deines Produkts, solltest du die Statusfeststellung nach § 7a SGB IV beantragen, statt dich auf den Vertragstext zu verlassen. Bei Festpreisprojekten mit großem Volumen, bei Entwicklung für regulierte Branchen wie Medizin oder Finanzen und bei Freelancern aus dem Ausland gehört der Vertrag zum Anwalt, weil Haftung, Steuer und Datenschutz dann anders liegen.

Vermittelt eine Agentur den Freelancer, prüfe deren Vertragskette; manche Konstruktionen sind verdeckte Arbeitnehmerüberlassung, die ohne Erlaubnis nach dem AÜG unzulässig ist. Nutzt du den Vertrag für viele Freelancer, lass ihn als AGB prüfen. GründerX ist Software und keine Rechtsberatung; die Vorlage spart dir den ersten Entwurf, nicht die Prüfung im Einzelfall.`,
      },
    ],
  text: `Vertrag über freie Mitarbeit (IT / Softwareentwicklung)

zwischen

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Auftraggeber“ –

und

[Vorname Nachname / Firma], [Straße, PLZ Ort], [USt-IdNr. / Steuernummer]
– nachfolgend „Freelancer“ –

– gemeinsam „die Parteien“ –

§ 1 Projekt und Leistungsgegenstand
(1) Der Auftraggeber beauftragt den Freelancer mit folgenden Leistungen im Projekt „[Projektname]“: [genaue Beschreibung, z. B. „Entwicklung einer REST-API in [Sprache/Framework] für die Anbindung des Shopsystems an die Warenwirtschaft, einschließlich automatisierter Tests und technischer Dokumentation“].
(2) Die Leistungen werden in Anlage 1 (Projektbeschreibung) näher beschrieben. Konkrete Arbeitspakete werden zwischen den Parteien in Textform abgestimmt; der Freelancer entscheidet eigenverantwortlich, wie er sie technisch umsetzt.
(3) Dieser Vertrag ist ein Dienstvertrag (§§ 611 ff. BGB). Der Freelancer schuldet die fachgerechte Erbringung der Entwicklungsleistung nach dem Stand der Technik, nicht einen bestimmten Erfolg. [Alternative für Festpreisprojekte: Für in Anlage 1 als „Werkleistung“ gekennzeichnete Arbeitspakete gelten ergänzend die Regeln zu Abnahme und Mängelhaftung nach §§ 631 ff. BGB.]

§ 2 Status des Freelancers, Weisungsfreiheit
(1) Der Freelancer ist selbstständiger Unternehmer. Er ist nicht Arbeitnehmer des Auftraggebers und nicht in dessen Betriebsorganisation eingegliedert. Ein Arbeitsverhältnis wird nicht begründet.
(2) Der Freelancer ist bei der Durchführung der Leistungen hinsichtlich Zeit, Ort und Art der Ausführung frei und unterliegt keinen Weisungen des Auftraggebers. Fachliche Vorgaben zum Leistungsinhalt (Anforderungen, Schnittstellen, Coding-Richtlinien, Zielarchitektur) sind keine Weisungen in diesem Sinne.
(3) Der Freelancer ist nicht verpflichtet, an internen Veranstaltungen des Auftraggebers teilzunehmen, Anwesenheitszeiten einzuhalten oder Urlaub abzustimmen. Er stimmt lediglich Zeiten ab, in denen er für Abstimmungen nicht erreichbar ist, soweit dies für das Projekt erforderlich ist.
(4) Der Freelancer ist berechtigt, für andere Auftraggeber tätig zu sein, auch für Wettbewerber des Auftraggebers, soweit § 6 (Geheimhaltung) eingehalten wird. Er ist berechtigt, Aufträge abzulehnen.
(5) Der Freelancer darf Leistungen durch eigene Mitarbeiter oder Subunternehmer erbringen lassen, die fachlich gleich qualifiziert sind, und benennt diese dem Auftraggeber vorab; er bleibt für die Leistung verantwortlich.
(6) Der Freelancer trägt sein unternehmerisches Risiko selbst. Er sorgt selbst für die Versteuerung seiner Einkünfte und für seine Kranken-, Pflege- und Altersvorsorge. [Optional: Die Parteien beantragen vor Aufnahme der Tätigkeit gemeinsam die Feststellung des Erwerbsstatus nach § 7a SGB IV bei der Deutschen Rentenversicherung Bund.]

§ 3 Durchführung, Remote-Arbeit, Arbeitsmittel
(1) Der Freelancer erbringt die Leistungen grundsätzlich remote von einem Ort seiner Wahl. Präsenztermine beim Auftraggeber in [Ort] finden nur nach gemeinsamer Abstimmung statt, voraussichtlich etwa [Anzahl] Tage pro Monat; Reisekosten werden nach § 4 Abs. 4 erstattet.
(2) Der Freelancer setzt eigene Hardware und Software ein. Der Auftraggeber stellt lediglich Zugänge zu den projektbezogenen Systemen (Repository, Ticketsystem, Test- und Staging-Umgebungen, Kommunikationskanäle) bereit, soweit dies technisch oder aus Sicherheitsgründen erforderlich ist. [Optional: Aus Gründen der IT-Sicherheit stellt der Auftraggeber ein verwaltetes Notebook, das ausschließlich für den Zugriff auf seine Systeme zu nutzen ist.]
(3) Der Freelancer nimmt an projektbezogenen Abstimmungen (z. B. Sprint-Planung, Reviews) teil, soweit sie für die Leistungserbringung erforderlich sind. Der voraussichtliche Umfang beträgt etwa [Tage] Personentage pro [Woche / Monat]; der Freelancer teilt dem Auftraggeber seine geplante Verfügbarkeit jeweils [z. B. zwei Wochen] im Voraus mit.
(4) Der Freelancer hält die vom Auftraggeber benannten technischen Richtlinien (Coding-Standards, Branching-Modell, Review-Prozess, Sicherheitsvorgaben) ein und dokumentiert seine Arbeit im Repository in einer Weise, die eine Übernahme durch Dritte ermöglicht.

§ 4 Vergütung, Abrechnung
(1) Der Freelancer erhält einen Tagessatz von [Betrag] EUR zuzüglich gesetzlicher Umsatzsteuer. Ein Personentag umfasst 8 Stunden. Teilleistungen werden anteilig im [Halbtages- / Stunden-]Takt abgerechnet; über 8 Stunden hinausgehende Zeiten an einem Tag werden nur abgerechnet, wenn sie vorab in Textform freigegeben wurden.
(2) Das Gesamtbudget für das Projekt beträgt [Betrag] EUR netto [bzw. [Anzahl] Personentage]. Erkennt der Freelancer, dass das Budget zu [z. B. 80] % ausgeschöpft ist, zeigt er dies dem Auftraggeber in Textform an; darüber hinausgehende Leistungen bedürfen einer Freigabe in Textform.
(3) Der Freelancer rechnet monatlich ab und fügt einen Tätigkeitsnachweis bei (Datum, Dauer, Arbeitspaket oder Ticket). Beanstandet der Auftraggeber den Nachweis nicht innerhalb von [z. B. 10] Werktagen in Textform, gilt er als anerkannt; der Freelancer weist in der Rechnung darauf hin. Rechnungen sind innerhalb von [z. B. 14] Tagen ohne Abzug zahlbar.
(4) Vorab in Textform freigegebene Reisekosten werden gegen Beleg erstattet (Bahn 2. Klasse / Economy, Hotel bis [Betrag] EUR je Nacht, Pkw mit [Betrag] EUR je Kilometer). Reisezeiten werden mit [z. B. 50] % des Tagessatzes anteilig vergütet.
(5) Bei Zahlungsverzug gelten Verzugszinsen in Höhe von 9 Prozentpunkten über dem Basiszinssatz und die Pauschale nach § 288 Abs. 5 BGB.

§ 5 Rechte am Code und an Arbeitsergebnissen
(1) Der Freelancer räumt dem Auftraggeber an allen im Rahmen dieses Vertrags geschaffenen Arbeitsergebnissen (Quellcode, Objektcode, Dokumentation, Konzepte, Datenmodelle, Konfigurationen, Designs) das ausschließliche, zeitlich, räumlich und inhaltlich unbeschränkte, übertragbare und unterlizenzierbare Recht ein, sie in jeder bekannten Nutzungsart zu nutzen, insbesondere zu vervielfältigen, zu bearbeiten, zu verbreiten, öffentlich zugänglich zu machen und in andere Werke zu integrieren. Die Rechtseinräumung umfasst auch die Nutzung für künftige Produkte und Geschäftsbereiche des Auftraggebers.
(2) Die Rechtseinräumung wird mit Entstehung des jeweiligen Arbeitsergebnisses wirksam; sie steht unter der auflösenden Bedingung, dass die hierauf entfallende Vergütung nicht gezahlt wird. Der Freelancer übergibt die Arbeitsergebnisse laufend durch Einchecken in das Repository des Auftraggebers.
(3) Vorbestehende Werkzeuge, Bibliotheken, Frameworks und Know-how des Freelancers („Vorbestehendes Material“) bleiben sein Eigentum. Soweit er solches Material in die Arbeitsergebnisse einbringt, räumt er dem Auftraggeber daran ein einfaches, unbeschränktes, unentgeltliches Nutzungsrecht ein, das die Nutzung der Arbeitsergebnisse ermöglicht. Der Freelancer kennzeichnet Vorbestehendes Material in der Dokumentation.
(4) Open-Source-Software darf nur eingesetzt werden, wenn deren Lizenz mit der vorgesehenen Nutzung durch den Auftraggeber vereinbar ist. Komponenten unter Lizenzen mit Copyleft-Wirkung (z. B. GPL, AGPL) dürfen nur nach Freigabe des Auftraggebers in Textform eingesetzt werden. Der Freelancer führt eine Liste aller eingesetzten Komponenten mit Lizenzangabe.
(5) Der Freelancer versichert, dass die Arbeitsergebnisse von ihm oder seinen nach § 2 Abs. 5 benannten Personen geschaffen werden und frei von Rechten Dritter sind, die der Nutzung entgegenstehen. Er stellt den Auftraggeber von Ansprüchen Dritter frei, soweit diese auf einer schuldhaften Verletzung dieser Zusicherung beruhen.
(6) Der Freelancer verzichtet gegenüber dem Auftraggeber auf das Recht auf Urheberbenennung, soweit gesetzlich zulässig. Erfindungen, die im Rahmen dieses Vertrags entstehen, werden dem Auftraggeber angezeigt; die Parteien einigen sich dann über die Übertragung gegen angemessene Vergütung.
(7) Die Vergütung nach § 4 gilt alle Rechtseinräumungen nach diesem Paragrafen ab.

§ 6 Geheimhaltung, Datenschutz, IT-Sicherheit
(1) Der Freelancer behandelt alle Informationen über den Auftraggeber, dessen Kunden, Produkte, Systeme, Quellcodes, Geschäftszahlen und Pläne, die er im Zusammenhang mit diesem Vertrag erhält, streng vertraulich und nutzt sie nur zur Vertragsdurchführung. Diese Pflicht gilt [z. B. 5] Jahre über das Vertragsende hinaus, für Geschäftsgeheimnisse im Sinne des GeschGehG unbegrenzt.
(2) Ausgenommen sind Informationen, die ohne Verschulden des Freelancers öffentlich bekannt sind oder werden, ihm nachweislich schon vorher bekannt waren oder die er aufgrund gesetzlicher Pflicht offenlegen muss. Allgemeines Erfahrungswissen und Fähigkeiten, die der Freelancer bei der Tätigkeit erwirbt, darf er weiter nutzen, soweit keine Geschäftsgeheimnisse des Auftraggebers betroffen sind.
(3) Erhält der Freelancer Zugriff auf personenbezogene Daten, für die der Auftraggeber verantwortlich ist, schließen die Parteien einen Auftragsverarbeitungsvertrag nach Art. 28 DSGVO (Anlage 2). Der Freelancer verwendet Produktivdaten nur, soweit es der Auftraggeber ausdrücklich erlaubt; für Entwicklung und Test sind anonymisierte oder synthetische Daten zu verwenden.
(4) Der Freelancer sichert seine Geräte nach dem Stand der Technik (Festplattenverschlüsselung, aktuelle Updates, Zwei-Faktor-Authentifizierung für alle Zugänge des Auftraggebers), verwendet die Zugangsdaten nur persönlich und meldet Sicherheitsvorfälle oder den Verlust von Geräten oder Zugangsdaten unverzüglich. Nach Vertragsende löscht er alle Daten des Auftraggebers und bestätigt dies in Textform.
(5) Für jeden schuldhaften Verstoß gegen Absatz 1 zahlt der Freelancer eine Vertragsstrafe von [Betrag] EUR; weitergehende Schadensersatzansprüche bleiben unberührt, die Vertragsstrafe wird angerechnet. [Optional streichen.]

§ 7 Haftung, Versicherung
(1) Der Freelancer haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
(2) Bei leichter Fahrlässigkeit haftet der Freelancer nur bei Verletzung wesentlicher Vertragspflichten, begrenzt auf den vertragstypischen, vorhersehbaren Schaden, höchstens auf [Betrag, z. B. die in den letzten 6 Monaten gezahlte Nettovergütung] EUR je Vertragsjahr.
(3) Für Datenverlust haftet der Freelancer nur bis zum Wiederherstellungsaufwand bei ordnungsgemäßer Datensicherung durch den Auftraggeber. Der Auftraggeber ist für Code-Reviews, Tests vor Produktivsetzung und Backups seiner Systeme selbst verantwortlich, soweit diese Aufgaben nicht ausdrücklich dem Freelancer übertragen sind.
(4) Der Freelancer unterhält eine IT-Haftpflichtversicherung (Vermögensschäden) mit einer Deckungssumme von mindestens [Betrag] EUR und weist sie auf Verlangen nach.

§ 8 Laufzeit, Kündigung, Übergabe
(1) Der Vertrag beginnt am [Datum] und endet [mit Abschluss des Projekts, voraussichtlich am [Datum] / am [Datum]]. [Optional: Er verlängert sich um jeweils [z. B. 3] Monate, wenn er nicht mit einer Frist von [z. B. 4] Wochen zum Laufzeitende gekündigt wird.]
(2) Beide Parteien können den Vertrag mit einer Frist von [z. B. 4] Wochen zum Monatsende kündigen. Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Kündigungen bedürfen der Schriftform.
(3) Nach einer Kündigung übergibt der Freelancer den aktuellen Stand aller Arbeitsergebnisse einschließlich Dokumentation und wirkt auf Wunsch des Auftraggebers bis zu [z. B. 3] Tagen zum vereinbarten Tagessatz an der Übergabe mit. Die bis zum Vertragsende erbrachten Leistungen werden nach § 4 vergütet.

§ 9 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Textform; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An ihre Stelle tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(3) Es gilt deutsches Recht. Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort].
(4) Anlagen: Anlage 1 Projektbeschreibung, Anlage 2 Auftragsverarbeitungsvertrag, [Anlage 3 Technische Richtlinien].
(5) Jede Partei erhält eine unterschriebene Ausfertigung.

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Auftraggeber


______________________________
[Vorname Nachname], Freelancer

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
