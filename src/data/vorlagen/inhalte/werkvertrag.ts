// Inhalt der Vorlage „werkvertrag“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../dienstleistung.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen Werkvertrag brauchst",
        text: `Ein Werkvertrag ist die richtige Wahl, wenn am Ende etwas Fertiges steht, das dein Kunde prüfen und abnehmen kann: eine Website, ein Software-Modul, ein Logo, ein Video, eine Übersetzung, ein Gutachten oder ein handwerkliches Werk wie die Beschichtung eines Hallenbodens. Du versprichst nicht nur Bemühen, sondern ein Ergebnis mit vereinbarten Eigenschaften.

Typische Situationen: Eine Webagentur baut für ein Startup den Online-Auftritt zum Festpreis. Ein Grafiker liefert ein Corporate Design in drei Meilensteinen. Ein Entwickler erstellt eine Schnittstelle nach Pflichtenheft. Als Auftraggeber brauchst du das Muster, wenn du ein festes Ergebnis einkaufst und sicherstellen willst, dass du bei Mängeln Nachbesserung verlangen und die Nutzungsrechte bekommst. Die Vorlage ist für Werke zwischen Unternehmen gedacht; Bauverträge mit Verbrauchern folgen eigenen Regeln.`,
      },
      {
        titel: "Was muss in einen Werkvertrag?",
        text: `Beim Werkvertrag entscheidet die Qualität der Leistungsbeschreibung darüber, ob ihr später über Mängel streitet oder nicht. Die Vorlage gliedert alles Nötige in zwölf Paragrafen:

- § 1 und § 2 Vertragsgegenstand und Leistungsbeschreibung: das Werk so genau, dass Abweichungen messbar sind, mit Pflichtenheft oder Angebot als Anlage 1 und einer Rangfolge der Dokumente
- § 3 Termine und Meilensteine, optional mit gedeckelter Vertragsstrafe
- § 4 Mitwirkung des Bestellers: Inhalte, Zugänge, Freigabefristen, Rechte an beigestelltem Material
- § 5 Änderungswünsche als Change-Request-Verfahren mit Prüfung, Angebot und Freigabe in Textform
- § 6 Abnahme mit Prüffrist, Protokoll, fiktiver Abnahme nach § 640 Abs. 2 BGB und Teilabnahmen
- § 7 Vergütung als Festpreis oder Aufwand mit Obergrenze, Zahlungsplan nach Meilensteinen, Eigentumsvorbehalt
- § 8 Mängelrechte, Nacherfüllung und Verjährung
- § 9 Nutzungsrechte am Werk, Referenznutzung, Open-Source-Komponenten, Quellcode
- § 10 Haftung, § 11 Kündigung nach § 648 und § 648a BGB, § 12 Schlussbestimmungen

Ohne Abnahmeregelung fehlt dem Vertrag das Herzstück: Erst die Abnahme macht die Vergütung fällig und startet die Gewährleistungsfrist.`,
      },
      {
        titel: "Werkvertrag Muster richtig ausfüllen",
        text: `Beginne mit den Parteien und der Bezeichnung des Werks in § 1; das Muster nennt Beispiele für Website, Logo und Bodenbeschichtung, die du durch dein Projekt ersetzt. Lege das Angebot oder Pflichtenheft als Anlage 1 bei und trage Nummer und Datum ein. In § 3 setzt du Beginn, Meilensteine und den Termin der Bereitstellung zur Abnahme; entscheide, ob die Termine verbindlich sind und ob du die optionale Vertragsstrafe behalten willst.

In § 4 listest du, was der Besteller liefern muss, und legst die Freigabefrist fest. In § 5 trägst du den Stundensatz für Unterbrechungen und die Vergütung für die Prüfung von Änderungswünschen ein. In § 6 bestimmst du die Prüffrist für die Abnahme. In § 7 wählst du Festpreis oder Aufwand, regelst Material und Fremdkosten und verteilst die Raten auf Vertragsschluss, Meilenstein und Abnahme. In § 8 legst du die Verjährungsfrist fest, in § 9 ausschließliches oder einfaches Nutzungsrecht und ob der Besteller den Quellcode erhält. Zum Schluss Haftungsobergrenze in § 10, Gerichtsstand, Anlagen und Unterschriften. Die Word-Version lässt sich dafür direkt bearbeiten.`,
      },
      {
        titel: "Typische Fehler beim Werkvertrag",
        text: `Fehler Nummer eins ist die vergessene Abnahme. Viele Freelancer liefern, der Kunde nutzt das Werk, und niemand erklärt die Abnahme. Dann ist unklar, ab wann die Vergütung fällig ist und wann die Gewährleistung endet. Die Vorlage löst das über die Abnahmeanzeige mit Frist und die fiktive Abnahme, wenn der Kunde schweigt oder das Werk produktiv nutzt.

Fehler Nummer zwei: Änderungen werden auf Zuruf umgesetzt. Ohne Change-Request-Verfahren wächst der Umfang, der Festpreis bleibt. Nutze § 5 konsequent und setze nichts um, was nicht in Textform freigegeben ist.

Fehler Nummer drei: Nutzungsrechte werden nicht geregelt. Nach § 31 UrhG und der Zweckübertragungslehre bleibt alles beim Urheber, was nicht ausdrücklich eingeräumt ist. Weitere Stolperfallen sind Meilensteine ohne Zwischenzahlungen, ein Verbot von Subunternehmern ohne Ausnahme für Standardtools und die Erwartung, dass der Kunde den Vertrag nicht kündigen kann, obwohl § 648 BGB ihm das jederzeit erlaubt.`,
      },
      {
        titel: "Rechtliche Grundlagen: Werkvertrag nach § 631 BGB",
        text: `Der Werkvertrag ist in den §§ 631 ff. BGB geregelt. Der Unternehmer schuldet die Herstellung des versprochenen Werks, der Besteller die Vergütung, die nach § 641 BGB mit der Abnahme fällig wird. § 640 BGB regelt die Abnahme: Wegen unwesentlicher Mängel darf sie nicht verweigert werden, und nach Absatz 2 gilt das Werk als abgenommen, wenn der Besteller trotz Fristsetzung und Hinweis keinen Mangel benennt.

Die Mängelrechte stehen in § 634 BGB: Nacherfüllung, Selbstvornahme, Minderung, Rücktritt und Schadensersatz. Sie verjähren nach § 634a BGB bei Werken an Sachen (Herstellung, Wartung, Veränderung) in zwei Jahren ab Abnahme, bei Bauwerken in fünf Jahren, bei sonstigen Werken in der regelmäßigen Frist von drei Jahren; zwischen Unternehmen ist eine Verkürzung möglich, nicht aber für Arglist und Garantien (§ 639 BGB), für Personenschäden und in AGB nicht bei Bauwerken. § 648 BGB erlaubt dem Besteller die freie Kündigung gegen Zahlung der Vergütung abzüglich ersparter Aufwendungen, § 648a BGB die Kündigung aus wichtigem Grund. Für Bauleistungen gelten zusätzlich die §§ 650a ff. BGB. Nutzungsrechte an urheberrechtlich geschützten Werken richten sich nach § 31 UrhG und gehen nur über, soweit sie ausdrücklich eingeräumt werden.`,
      },
      {
        titel: "Wann die Werkvertrag-Vorlage nicht reicht",
        text: `Die Vorlage ist für überschaubare Projekte zwischen Unternehmen gedacht. Bei Bauleistungen, Verbraucherbauverträgen oder wenn die VOB/B einbezogen werden soll, lass den Vertrag von einem Anwalt anpassen; dort gelten eigene Fristen, Sicherheiten und Abnahmeregeln. Dasselbe gilt für Softwareprojekte mit agiler Entwicklung ohne festes Pflichtenheft, bei denen Werk- und Dienstelemente gemischt sind, und für Projekte, deren Volumen eine unwirksame Haftungsklausel zum Existenzrisiko macht.

Setzt du den Vertrag unverändert bei vielen Kunden ein, wird er zu AGB und sollte auf die Inhaltskontrolle geprüft werden. Bei laufender Betreuung nach dem Projekt ergänze einen Dienstleistungs- oder Wartungsvertrag. GründerX liefert die Vorlage als Software; die rechtliche Prüfung deines konkreten Projekts bleibt bei dir oder deinem Anwalt.`,
      },
    ],
  text: `Werkvertrag

zwischen

[Firma / Name], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Besteller“ –

und

[Firma / Name], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Unternehmer“ –

– gemeinsam „die Parteien“ –

§ 1 Vertragsgegenstand
(1) Der Unternehmer verpflichtet sich, für den Besteller folgendes Werk herzustellen: [genaue Bezeichnung, z. B. „eine responsive Unternehmenswebsite mit [Anzahl] Seiten auf Basis von [System] einschließlich Kontaktformular und Blog“ / „ein Logo mit Wort-Bild-Marke in den Dateiformaten SVG, PNG und PDF“ / „eine Beschichtung der Hallenböden in Halle 2“].
(2) Dieser Vertrag ist ein Werkvertrag im Sinne der §§ 631 ff. BGB. Der Unternehmer schuldet den in § 2 beschriebenen Erfolg.

§ 2 Leistungsbeschreibung und Ausführung
(1) Art, Umfang, Funktionen und Qualität des Werks ergeben sich abschließend aus der Leistungsbeschreibung in Anlage 1 (Pflichtenheft/Angebot Nr. [Nummer] vom [Datum]). Bei Widersprüchen gilt die Rangfolge: dieser Vertrag, Anlage 1, sonstige Unterlagen.
(2) Der Unternehmer führt das Werk nach dem Stand der Technik und den anerkannten Regeln seines Fachs aus. Er darf Subunternehmer einsetzen; er haftet für sie wie für eigenes Handeln. [Optional: Der Einsatz von Subunternehmern bedarf der Zustimmung des Bestellers in Textform.]
(3) Der Unternehmer bestimmt Arbeitszeit, Arbeitsort und Arbeitsmittel selbst, soweit Anlage 1 oder die Natur des Werks nichts anderes verlangt.
(4) Der Unternehmer stellt dem Besteller auf Anfrage Zwischenstände zur Verfügung und informiert ihn unverzüglich, wenn er erkennt, dass Vorgaben des Bestellers, beigestellte Materialien oder Vorarbeiten Dritter zur mangelhaften Herstellung führen würden.

§ 3 Termine und Fristen
(1) Der Unternehmer beginnt mit der Ausführung am [Datum]. Folgende Meilensteine sind vereinbart:
   a) [Meilenstein 1, z. B. „Entwurf/Konzept“] bis zum [Datum],
   b) [Meilenstein 2, z. B. „Testversion“] bis zum [Datum],
   c) Fertigstellung und Bereitstellung zur Abnahme bis zum [Datum].
(2) Die Termine sind [verbindlich / unverbindliche Planungstermine]. Sie verschieben sich angemessen, wenn der Besteller seine Mitwirkungspflichten nicht rechtzeitig erfüllt, Änderungen nach § 5 beauftragt oder Umstände höherer Gewalt eintreten.
(3) [Optional: Überschreitet der Unternehmer den Fertigstellungstermin aus Gründen, die er zu vertreten hat, zahlt er eine Vertragsstrafe von [z. B. 0,2] % der Nettovergütung je Werktag, höchstens [z. B. 5] % der Nettovergütung. Die Vertragsstrafe wird auf einen Schadensersatzanspruch angerechnet.]

§ 4 Mitwirkung des Bestellers
(1) Der Besteller stellt rechtzeitig und unentgeltlich alle erforderlichen Inhalte, Daten, Materialien, Zugänge und Entscheidungen bereit, insbesondere [z. B. „Texte und Bilder in druckfähiger Qualität, Zugang zum Hosting, Logo-Dateien“].
(2) Der Besteller prüft Entwürfe und Zwischenstände und erteilt Freigaben oder nennt Änderungswünsche innerhalb von [z. B. 5] Werktagen. Äußert er sich nicht, darf der Unternehmer nach einer weiteren Erinnerung mit Nachfrist von [z. B. 3] Werktagen den Zwischenstand als freigegeben behandeln.
(3) Der Besteller versichert, dass er an allen beigestellten Inhalten die erforderlichen Rechte hat, und stellt den Unternehmer von Ansprüchen Dritter wegen dieser Inhalte frei.

§ 5 Änderungswünsche (Change Requests)
(1) Der Besteller kann Änderungen oder Erweiterungen des Werks in Textform vorschlagen. Der Unternehmer prüft den Vorschlag innerhalb von [z. B. 5] Werktagen und teilt mit, ob und zu welchen Bedingungen (Mehr- oder Minderaufwand, Vergütung, Terminverschiebung) er die Änderung umsetzen kann.
(2) Die Änderung wird erst verbindlich, wenn der Besteller das Angebot des Unternehmers in Textform annimmt. Bis dahin wird das Werk nach dem bisherigen Stand weitergeführt, es sei denn, der Besteller ordnet in Textform eine Unterbrechung an; die Unterbrechungszeit verschiebt die Termine und wird nach Aufwand mit [Betrag] EUR je Stunde vergütet.
(3) Der Aufwand für die Prüfung von Änderungswünschen ist [bis zu [Stunden] Stunden je Änderungswunsch kostenfrei / mit [Betrag] EUR je Stunde zu vergüten].

§ 6 Abnahme
(1) Nach Fertigstellung stellt der Unternehmer das Werk zur Abnahme bereit und zeigt dies dem Besteller in Textform an. Der Besteller prüft das Werk innerhalb von [z. B. 10] Werktagen und erklärt die Abnahme oder teilt die festgestellten Mängel konkret in Textform mit.
(2) Wegen unwesentlicher Mängel darf die Abnahme nicht verweigert werden; solche Mängel werden im Abnahmeprotokoll festgehalten und vom Unternehmer innerhalb von [z. B. 10] Werktagen beseitigt.
(3) Das Werk gilt als abgenommen, wenn der Besteller innerhalb der Frist nach Absatz 1 die Abnahme nicht unter Angabe mindestens eines Mangels verweigert (§ 640 Abs. 2 BGB). Der Unternehmer weist den Besteller in der Abnahmeanzeige auf diese Folge hin. Das Werk gilt ferner als abgenommen, wenn der Besteller es produktiv nutzt oder veröffentlicht.
(4) Teilabnahmen sind für in sich abgeschlossene Teile des Werks (Meilensteine nach § 3) vereinbart. Mit der Abnahme geht die Gefahr auf den Besteller über und die Verjährung der Mängelansprüche beginnt.

§ 7 Vergütung und Zahlung
(1) Die Vergütung beträgt [Variante A: einen Festpreis von [Betrag] EUR] [Variante B: [Betrag] EUR je Stunde nach tatsächlichem Aufwand, geschätzt mit [Stunden] Stunden; der Unternehmer informiert den Besteller, sobald absehbar ist, dass die Schätzung um mehr als [z. B. 10] % überschritten wird, und benötigt für den Mehraufwand eine Freigabe in Textform], jeweils zuzüglich gesetzlicher Umsatzsteuer. Material und Fremdkosten [sind enthalten / werden gegen Beleg zuzüglich [z. B. 10] % Handling erstattet].
(2) Die Vergütung ist wie folgt fällig: [z. B. 30] % bei Vertragsschluss, [z. B. 30] % bei Erreichen des Meilensteins [Nr.], [z. B. 40] % nach Abnahme. Rechnungen sind innerhalb von [z. B. 14] Tagen nach Zugang zahlbar.
(3) Bei Zahlungsverzug gelten Verzugszinsen von 9 Prozentpunkten über dem Basiszinssatz und die Pauschale nach § 288 Abs. 5 BGB. Der Unternehmer darf bei Verzug mit einer Abschlagszahlung die Arbeiten nach Ankündigung in Textform einstellen; die Termine verschieben sich entsprechend.
(4) Bis zur vollständigen Zahlung behält sich der Unternehmer das Eigentum an gelieferten Gegenständen und Datenträgern vor; Nutzungsrechte nach § 9 gehen erst mit vollständiger Zahlung über.

§ 8 Mängelrechte und Nacherfüllung
(1) Der Unternehmer gewährleistet, dass das Werk bei Abnahme die in Anlage 1 vereinbarte Beschaffenheit hat und frei von Rechten Dritter ist, die der vertraglichen Nutzung entgegenstehen.
(2) Bei Mängeln hat der Besteller zunächst Anspruch auf Nacherfüllung. Der Unternehmer kann nach seiner Wahl den Mangel beseitigen oder das Werk neu herstellen. Der Besteller setzt hierfür eine angemessene Frist von mindestens [z. B. 10] Werktagen.
(3) Schlägt die Nacherfüllung zweimal fehl, wird sie verweigert oder ist sie dem Besteller unzumutbar, kann der Besteller den Mangel selbst beseitigen lassen und Ersatz der erforderlichen Aufwendungen verlangen, die Vergütung mindern oder bei erheblichen Mängeln vom Vertrag zurücktreten. Schadensersatz richtet sich nach § 10.
(4) Keine Mängel sind Abweichungen, die auf fehlerhaften oder unvollständigen Vorgaben des Bestellers, auf von ihm beigestellten Inhalten oder auf Eingriffen Dritter nach Abnahme beruhen.
(5) Mängelansprüche verjähren in [z. B. 12 Monaten / 2 Jahren] ab Abnahme; bei Bauwerken in 5 Jahren. Die Verkürzung gilt nicht für Vorsatz, Arglist und Ansprüche nach § 10 Abs. 1.

§ 9 Nutzungsrechte
(1) Der Unternehmer räumt dem Besteller mit vollständiger Zahlung der Vergütung das [ausschließliche / einfache], zeitlich, räumlich und inhaltlich unbeschränkte Recht ein, das Werk und alle Arbeitsergebnisse für eigene Zwecke zu nutzen, zu vervielfältigen, zu verbreiten, öffentlich zugänglich zu machen, zu bearbeiten und in andere Werke einzufügen. [Optional: Das Nutzungsrecht ist beschränkt auf [z. B. die Nutzung im Internet und in Printmedien im deutschsprachigen Raum].]
(2) Der Unternehmer darf das Werk zur Eigenwerbung in Referenzen zeigen, sofern der Besteller nicht in Textform widerspricht. Das Recht des Unternehmers, als Urheber genannt zu werden, [bleibt bestehen / wird im Umfang des gesetzlich Zulässigen nicht ausgeübt].
(3) Für Open-Source-Komponenten und Fremdsoftware gelten deren Lizenzbedingungen; der Unternehmer legt eine Liste der verwendeten Komponenten vor. Vorbestehende Werkzeuge, Bibliotheken und Know-how des Unternehmers bleiben in seinem Eigentum; der Besteller erhält daran ein einfaches Nutzungsrecht, soweit es für die Nutzung des Werks erforderlich ist.
(4) [Bei Software: Der Besteller erhält den Quellcode und die Dokumentation mit Abnahme.]

§ 10 Haftung
(1) Der Unternehmer haftet unbeschränkt für Vorsatz, grobe Fahrlässigkeit, arglistig verschwiegene Mängel, übernommene Garantien und Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie nach dem Produkthaftungsgesetz.
(2) Bei leichter Fahrlässigkeit haftet der Unternehmer nur für die Verletzung wesentlicher Vertragspflichten, begrenzt auf den vertragstypischen, vorhersehbaren Schaden, höchstens [Betrag, z. B. die Nettovergütung dieses Vertrags] EUR.
(3) Für Datenverlust haftet der Unternehmer nur bis zum Wiederherstellungsaufwand bei ordnungsgemäßer Datensicherung des Bestellers.

§ 11 Kündigung
(1) Der Besteller kann den Vertrag bis zur Vollendung des Werks jederzeit kündigen (§ 648 BGB). Der Unternehmer kann dann die vereinbarte Vergütung verlangen, muss sich jedoch anrechnen lassen, was er infolge der Aufhebung an Aufwendungen erspart oder durch anderweitige Verwendung seiner Arbeitskraft erwirbt oder zu erwerben böswillig unterlässt. Es wird vermutet, dass dem Unternehmer [z. B. 5] % der auf den noch nicht erbrachten Teil entfallenden Vergütung zustehen; der Nachweis eines höheren oder niedrigeren Betrags bleibt beiden Parteien offen.
(2) Beide Parteien können den Vertrag aus wichtigem Grund kündigen (§ 648a BGB). Die Kündigung bedarf der Schriftform.
(3) Nach einer Kündigung ist der bis dahin erbrachte Teil des Werks abzunehmen und zu vergüten; § 6 gilt entsprechend.

§ 12 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Textform; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt eine wirksame, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(3) Es gilt deutsches Recht. Gerichtsstand ist, soweit beide Parteien Kaufleute, juristische Personen des öffentlichen Rechts oder öffentlich-rechtliche Sondervermögen sind, [Ort].
(4) Anlagen: Anlage 1 Leistungsbeschreibung/Angebot, [Anlage 2 Zeitplan], [Anlage 3 Komponentenliste].
(5) Jede Partei erhält eine unterschriebene Ausfertigung.

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Besteller


______________________________
[Vorname Nachname], für den Unternehmer

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
