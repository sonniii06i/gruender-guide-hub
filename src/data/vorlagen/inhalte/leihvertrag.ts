// Inhalt der Vorlage „leihvertrag“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../miete.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen Leihvertrag brauchst",
        text: `Ein Leihvertrag regelt die kostenlose Überlassung einer Sache: Du stellst deiner frisch gegründeten UG oder GmbH als Gesellschafter deinen Laptop, dein Auto oder dein Werkzeug zur Verfügung, ohne dass die Gesellschaft dafür Miete zahlt. Oder ein befreundetes Unternehmen leiht dir für ein Projekt eine Maschine, einen Anhänger oder das Messe-Equipment. In beiden Fällen bleibt der Gegenstand Eigentum des Verleihers, der Entleiher nutzt ihn für einen bestimmten Zweck und gibt ihn unverändert zurück. Die Vorlage hält genau das fest: Gegenstand mit Seriennummer, Zustand bei Übergabe, Dauer, Pflichten des Entleihers, Haftung und Rückgabe. Fließt irgendeine Gegenleistung, ist es keine Leihe mehr, sondern Miete; dann passt der Mietvertrag für Geräte und Equipment besser.`,
      },
      {
        titel: "Was muss in einen Leihvertrag?",
        text: `Leihverträge werden oft per Handschlag geschlossen, und genau da entstehen die Streitfälle. Diese Punkte gehören in das Muster und finden sich in der Vorlage:

- Leihgegenstand mit genauer Bezeichnung, Seriennummer oder Fahrgestellnummer, Zubehör, Eigentumsverhältnisse und Zustand bei Übergabe mit Fotoprotokoll (§ 1)
- Ausdrückliche Unentgeltlichkeit, Zweck der Leihe und bei Gesellschaftern die Klarstellung, dass keine Einlage vorliegt (§ 2)
- Dauer als festes Ende, Zweckerreichung oder unbestimmte Zeit mit Kündigungsfrist, Rückforderungsrechte des Verleihers (§ 3)
- Sorgfaltspflichten, Fahrerliste bei Fahrzeugen, Verbot von Veränderungen, gewöhnliche Erhaltungskosten bis zu einer Betragsgrenze, Abstimmung größerer Reparaturen, Meldepflichten (§ 4)
- Verbot der Überlassung an Dritte mit Ausnahme eigener Mitarbeiter (§ 5)
- Haftung des Verleihers nur für Vorsatz und grobe Fahrlässigkeit, Haftung des Entleihers mit vereinbartem Zeitwert, Versicherung und Selbstbeteiligung, Verjährung (§ 6)
- Rückgabe mit Zubehör, Datenlöschung, Entschädigung bei verspäteter Rückgabe (§ 7)
- Textform, salvatorische Klausel, Gerichtsstand und Anlagen (§ 8)`,
      },
      {
        titel: "Leihvertrag Muster ausfüllen: Schritt für Schritt",
        text: `Trage in § 1 den Gegenstand so genau ein, dass eine Verwechslung ausgeschlossen ist: bei Geräten Modell und Seriennummer, bei Fahrzeugen Kennzeichen, Fahrgestellnummer und Kilometerstand. Notiere bekannte Mängel und fotografiere den Zustand für das Übergabeprotokoll. In § 2 nennst du den Zweck, etwa die Nutzung im Geschäftsbetrieb oder ein bestimmtes Projekt; bei der Leihe an die eigene Gesellschaft lässt du den Absatz zum Gesellschafter stehen, sonst streichst du ihn. In § 3 wählst du eine der drei Varianten für die Dauer und setzt die Rückgabefrist bei vorzeitiger Rückforderung. In § 4 legst du die Betragsgrenze fest, bis zu der der Entleiher Reparaturen selbst trägt. In § 6 vereinbarst du den Zeitwert für den Fall des Totalverlusts und trägst die bestehende Versicherung mit Selbstbeteiligung ein. In § 7 nennst du den Rückgabeort und die Tagespauschale bei Verspätung. Die Vorlage gibt es kostenlos als Word, PDF und Text.`,
      },
      {
        titel: "Typische Fehler beim Leihvertrag",
        text: `Erster Fehler: eine versteckte Gegenleistung. Eine Kostenpauschale über die reinen Erhaltungskosten hinaus, eine Dienstleistung im Gegenzug oder ein kleines Entgelt machen aus der Leihe eine Miete mit Gewährleistung und Umsatzsteuer. Zweiter Fehler: kein Übergabeprotokoll. Ohne Fotos und Mängelliste streitet ihr bei der Rückgabe über jede Delle. Dritter Fehler bei Fahrzeugen: Der Verleiher bleibt Halter und zahlt Steuer, Versicherung und Bußgelder; wer nicht vorher mit der Kfz-Versicherung klärt, ob fremde Fahrer mitversichert sind, riskiert den Regress. Vierter Fehler bei Gesellschaftern: Die GmbH kann für geliehene Gegenstände weder Miete noch Abschreibung absetzen; wer Kosten in der Gesellschaft geltend machen will, braucht einen fremdüblichen Mietvertrag. Fünfter Fehler: keine Rückgabefrist bei vorzeitiger Rückforderung, sodass aus einem Gefallen plötzlich ein Stillstand im Projekt wird.`,
      },
      {
        titel: "Rechtliche Grundlagen: Leihe nach §§ 598 ff. BGB",
        text: `Die Leihe ist in den §§ 598 bis 606 BGB geregelt. Nach § 598 BGB verpflichtet sich der Verleiher, dem Entleiher den Gebrauch der Sache unentgeltlich zu gestatten. Der Verleiher haftet nach § 599 BGB nur für Vorsatz und grobe Fahrlässigkeit, muss nach § 600 BGB aber Schäden aus arglistig verschwiegenen Mängeln ersetzen. Die gewöhnlichen Erhaltungskosten trägt nach § 601 Abs. 1 BGB der Entleiher; außergewöhnliche Aufwendungen ersetzt der Verleiher nach § 601 Abs. 2 BGB. Nach § 603 BGB darf der Entleiher die Sache nur vertragsgemäß gebrauchen und ohne Erlaubnis keinem Dritten überlassen. Die Rückgabepflicht steht in § 604 BGB, das Kündigungsrecht des Verleihers bei Eigenbedarf, vertragswidrigem Gebrauch oder Tod des Entleihers in § 605 BGB, die kurze Verjährung von sechs Monaten für Ersatzansprüche in § 606 BGB. Steuerlich ist die unentgeltliche Nutzungsüberlassung an die eigene GmbH keine Einlage. GründerX ist Software und keine Rechts- oder Steuerberatung.`,
      },
      {
        titel: "Wann die Leihvertrag-Vorlage nicht reicht",
        text: `Die Vorlage deckt die unentgeltliche Überlassung beweglicher Sachen zwischen Unternehmen oder zwischen Gesellschafter und Gesellschaft ab. Für Grundstücke und Räume, etwa die kostenlose Überlassung eines Büros, gelten andere Regeln, und bei Gesellschaftern kommt schnell die Frage nach einer Betriebsaufspaltung auf; dafür gibt es den Mietvertrag für das Arbeitszimmer an die eigene GmbH. Willst du Kosten des Gegenstands in der Gesellschaft absetzen, brauchst du statt der Leihe einen entgeltlichen Mietvertrag zu fremdüblichen Konditionen. Bei wertvollen Maschinen, Fahrzeugen mit Leasingvertrag oder sicherungsübereigneten Sachen musst du vorher prüfen, ob die Überlassung überhaupt erlaubt ist. Und bei Leihen an Verbraucher oder grenzüberschreitend gehört der Vertrag in anwaltliche Hände.`,
      },
    ],
  text: `Leihvertrag (unentgeltliche Gebrauchsüberlassung nach §§ 598 ff. BGB)

zwischen

[Firma / Vorname Nachname], [Straße, PLZ Ort], [vertreten durch [Name]]
– nachfolgend „Verleiher“ –

und

[Firma, Rechtsform / Vorname Nachname], [Straße, PLZ Ort], [vertreten durch [Name]]
– nachfolgend „Entleiher“ –

§ 1 Leihgegenstand und Zustand
(1) Der Verleiher überlässt dem Entleiher folgenden Gegenstand zum Gebrauch (nachfolgend „Leihgegenstand“): [genaue Bezeichnung, z. B. „Notebook [Modell], Seriennummer [Nummer]“ / „Pkw [Marke, Modell], Kennzeichen [Kennzeichen], FIN [Nummer], Kilometerstand [Zahl] km“]. Zubehör: [z. B. „Netzteil, Tasche, zwei Schlüssel“].
(2) Der Leihgegenstand steht im Eigentum des Verleihers [und ist frei von Rechten Dritter / und ist an [Bank] sicherungsübereignet; der Verleiher versichert, dass die Überlassung erlaubt ist].
(3) Der Leihgegenstand wird am [Datum] in folgendem Zustand übergeben: [z. B. „gebraucht, funktionsfähig, Gebrauchsspuren am Gehäuse“]. Bekannte Mängel: [keine / Beschreibung]. Der Zustand wird im Übergabeprotokoll mit Fotos (Anlage 1) festgehalten.

§ 2 Unentgeltlichkeit und Zweck
(1) Die Überlassung erfolgt unentgeltlich. Der Entleiher schuldet weder ein Nutzungsentgelt noch eine sonstige Gegenleistung; die Übernahme der gewöhnlichen Erhaltungskosten nach § 4 Abs. 3 ist keine Gegenleistung.
(2) Der Leihgegenstand wird überlassen zum Zweck [z. B. „der Nutzung im Geschäftsbetrieb des Entleihers“ / „des Projekts [Bezeichnung]“ / „geschäftlicher Fahrten des Entleihers“]. Ein anderer Gebrauch bedarf der Zustimmung des Verleihers.
(3) [Bei Gesellschafter und Gesellschaft: Der Verleiher ist Gesellschafter des Entleihers. Die unentgeltliche Überlassung ist keine Einlage in das Gesellschaftsvermögen; der Leihgegenstand geht nicht in das Eigentum des Entleihers über.]

§ 3 Dauer der Leihe und Rückforderung
(1) Die Leihe beginnt am [Datum] und [endet am [Datum] / endet mit Erreichen des Zwecks nach § 2 Abs. 2, spätestens am [Datum] / wird auf unbestimmte Zeit geschlossen und kann von jeder Partei mit einer Frist von [z. B. 4] Wochen zum Monatsende in Textform beendet werden].
(2) Der Verleiher kann den Leihgegenstand vorzeitig zurückfordern, wenn er ihn infolge eines nicht vorhergesehenen Umstands selbst benötigt, der Entleiher ihn vertragswidrig gebraucht, vernachlässigt oder unbefugt einem Dritten überlässt, oder der Entleiher stirbt bzw. aufgelöst wird (§ 605 BGB). Die Rückforderung erfolgt in Textform mit einer Rückgabefrist von mindestens [z. B. 7] Tagen, soweit nicht Gefahr im Verzug ist.
(3) Der Entleiher kann den Leihgegenstand jederzeit vorzeitig zurückgeben.

§ 4 Pflichten des Entleihers
(1) Der Entleiher behandelt den Leihgegenstand sorgfältig und gebraucht ihn nur bestimmungsgemäß, nach Herstellerhinweisen und zum vereinbarten Zweck. [Bei Fahrzeugen: Es fahren nur die vorab benannten Personen mit gültiger Fahrerlaubnis: [Namen]. Auslandsfahrten bedürfen der Zustimmung des Verleihers.]
(2) Veränderungen am Leihgegenstand, Ausbau von Teilen und Löschen vom Verleiher aufgespielter Software sind nicht gestattet.
(3) Die gewöhnlichen Erhaltungskosten trägt der Entleiher (§ 601 Abs. 1 BGB): Reinigung, Verbrauchsmaterial, [Kraftstoff, Betriebsflüssigkeiten, saisonaler Reifenwechsel], laufende Wartung nach Herstellervorgabe sowie Reparaturen bis [Betrag] EUR im Einzelfall.
(4) Reparaturen über [Betrag] EUR und Ersatz wesentlicher Teile sind vorher mit dem Verleiher abzustimmen. Veranlasst der Entleiher mit Zustimmung des Verleihers notwendige außergewöhnliche Reparaturen, ersetzt der Verleiher die Kosten (§ 601 Abs. 2 BGB). Ein Zurückbehaltungsrecht des Entleihers wegen solcher Aufwendungen besteht nicht.
(5) Der Entleiher informiert den Verleiher unverzüglich über Schäden, Funktionsstörungen, Diebstahl, Unfälle, Beschlagnahme oder Pfändung und über Ansprüche Dritter. [Bei Fahrzeugen: Unfälle sind der Polizei zu melden; der Entleiher gibt kein Schuldanerkenntnis ab.] Er stellt den Verleiher von Kosten, Bußgeldern und Ansprüchen Dritter frei, die durch den Gebrauch während der Leihzeit entstehen.

§ 5 Überlassung an Dritte
Der Entleiher darf den Leihgegenstand nicht ohne Zustimmung des Verleihers Dritten überlassen (§ 603 Satz 2 BGB). Die Nutzung durch Mitarbeiter des Entleihers im Rahmen des Zwecks ist keine Überlassung an Dritte; der Entleiher haftet für sie wie für sich selbst.

§ 6 Haftung und Versicherung
(1) Der Verleiher haftet für Mängel des Leihgegenstands und daraus entstehende Schäden nur bei Vorsatz und grober Fahrlässigkeit (§ 599 BGB). Verschweigt er einen Mangel arglistig, haftet er für den daraus entstehenden Schaden (§ 600 BGB).
(2) Der Entleiher haftet für Verlust, Untergang und jede Verschlechterung, die über die Abnutzung durch vertragsgemäßen Gebrauch hinausgeht und die er oder ein Dritter, dem er den Gebrauch überlassen hat, zu vertreten hat. Bei Totalverlust ersetzt er den Zeitwert, der mit [Betrag] EUR vereinbart wird, soweit er keinen niedrigeren Wert nachweist.
(3) Der Verleiher unterhält [keine Versicherung / folgende Versicherung: [z. B. Kfz-Haftpflicht und Vollkasko bei [Versicherer], Selbstbeteiligung [Betrag] EUR]]. Der Entleiher trägt in einem von ihm zu vertretenden Schadensfall die Selbstbeteiligung und einen Rückstufungsschaden. [Alternative: Der Entleiher schließt für die Leihdauer auf eigene Kosten eine [Elektronik- / Vollkasko-]Versicherung ab und weist sie vor Übergabe nach.]
(4) Ersatzansprüche des Verleihers wegen Veränderungen oder Verschlechterungen verjähren in sechs Monaten ab Rückgabe (§ 606 BGB).

§ 7 Rückgabe
(1) Nach Ende der Leihe gibt der Entleiher den Leihgegenstand mit allem Zubehör gereinigt und im Übergabezustand abzüglich vertragsgemäßer Abnutzung [bei Fahrzeugen: vollgetankt bzw. mit dem Ladestand bei Übergabe] am Sitz des Verleihers [Adresse] zurück. Ein Rückgabeprotokoll wird erstellt.
(2) Vom Entleiher aufgespielte Daten und Software hat er vor Rückgabe zu sichern und zu entfernen; der Verleiher darf nach Rückgabe alle Daten löschen.
(3) Gibt der Entleiher den Leihgegenstand nach Ende der Leihe oder berechtigter Rückforderung nicht zurück, schuldet er für jeden angefangenen Tag eine Entschädigung von [Betrag] EUR; ein weitergehender Schaden bleibt vorbehalten.

§ 8 Schlussbestimmungen
(1) Änderungen und Ergänzungen bedürfen der Textform. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam; an ihre Stelle tritt die gesetzliche Regelung der §§ 598 ff. BGB.
(3) Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort]. Es gilt deutsches Recht.
(4) Anlagen: Anlage 1 Übergabeprotokoll mit Fotos, [Anlage 2 Fahrerliste, Anlage 3 Versicherungsnachweis].

[Ort], den [Datum]


______________________________
[Name], Verleiher


______________________________
[Name, Funktion], für den Entleiher

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
