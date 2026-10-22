// Inhalt der Vorlage „nda-gegenseitig“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../geheimhaltung.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du eine gegenseitige NDA brauchst",
        text: `Die gegenseitige Geheimhaltungsvereinbarung (Mutual NDA) ist die richtige Wahl, wenn beide Seiten etwas zu verlieren haben. Zwei Unternehmen prüfen eine Kooperation und tauschen Umsatzzahlen, Roadmaps und Kundenlisten aus. Ein Start-up verhandelt mit einem strategischen Investor, der im Gegenzug seine Pläne für den Markt offenlegt. Zwei Gründerteams überlegen, ihre Produkte zu verbinden, und zeigen sich gegenseitig den Quellcode.

Auch taktisch ist die gegenseitige Variante oft klüger: Große Partner lehnen einseitige Vertraulichkeitsvereinbarungen gern mit dem Hinweis ab, sie seien unausgewogen. Ein symmetrisches NDA Muster nimmt dieses Argument weg und beschleunigt die Unterschrift.

Wenn tatsächlich nur du Informationen preisgibst, etwa gegenüber einem Dienstleister oder Bewerber, nimm die einseitige NDA. Sie ist kürzer und verpflichtet dich zu nichts.`,
      },
      {
        titel: "Diese Punkte muss eine Vertraulichkeitsvereinbarung regeln",
        text: `Die Vorlage folgt dem Aufbau, den auch Konzern-Rechtsabteilungen erwarten, und bleibt trotzdem auf drei Seiten lesbar:

- § 1 Vertrauliche Informationen mit Beispielkatalog und Schutz auch ohne Kennzeichnung; Abs. 3 nennt die vier Ausnahmen, die die empfangende Partei beweisen muss.
- § 2 Pflichten beider Parteien: Zweckbindung, Schutzmaßnahmen nach § 2 Nr. 1 Buchst. b GeschGehG, Weitergabe nur an verpflichtete Personen, Verbot von Rückbau und Dekompilierung, Meldepflicht bei Vorfällen.
- § 3 Offenlegung aufgrund Gesetz oder Behörde, mit Vorab-Information.
- § 4 Residual-Wissen als optionale Klausel, die du im Zweifel streichst.
- § 5 keine Rechteeinräumung, keine Exklusivität und ein optionales Abwerbeverbot für Mitarbeiter.
- § 6 Rückgabe und Löschung mit Frist und Ausnahme für Pflichtaufbewahrung.
- § 7 Laufzeit, Kündigung und Nachwirkung von drei Jahren, für echte Geschäftsgeheimnisse unbegrenzt.
- § 8 Vertragsstrafe (fest oder nach billigem Ermessen) und Schadensersatz nach §§ 6 ff. GeschGehG.
- § 9 Schriftform, Rechtswahl, Gerichtsstand, Ausfertigungen.`,
      },
      {
        titel: "Gegenseitige NDA Vorlage ausfüllen: so gehst du vor",
        text: `Lade das Muster kostenlos als Word-Datei herunter und ersetze die Platzhalter in eckigen Klammern. Beginne mit Partei A und Partei B: Firma, Rechtsform, Anschrift, vertretungsberechtigte Person. Beschreibe in der Präambel den Zweck so konkret wie möglich, zum Beispiel „eine Beteiligung der Partei A an der Partei B zu verhandeln“.

Entscheide dann über § 4: Die Residual-Klausel erlaubt der Gegenseite, aus dem Gedächtnis Gelerntes weiterzuverwenden. Große Unternehmen bestehen oft darauf; wenn dein Kern-Know-how leicht zu merken ist, streiche die Klausel oder beschränke sie, wie die Vorlage es tut, auf nicht gekennzeichnete Informationen ohne Schutzrechte.

In § 5 Abs. 3 wählst du, ob ein Abwerbeverbot gelten soll, und trägst die Dauer ein. In § 6 die Rückgabefrist (14 Tage), in § 7 Laufzeit, Kündigungsfrist und Nachwirkung. In § 8 legst du fest, ob überhaupt eine Vertragsstrafe gilt und in welcher Form. Abschließend Ort, Datum, Gerichtsstand und Unterschriften beider Seiten auf je einer Ausfertigung.`,
      },
      {
        titel: "Fehler, die bei gegenseitigen Geheimhaltungsvereinbarungen teuer werden",
        text: `Erstens: unausgewogene Praxis trotz symmetrischem Text. Wer als Start-up zehnmal mehr offenlegt als der Konzern, sollte Laufzeit, Nachwirkung und Vertragsstrafe nicht großzügiger fassen, als er sie selbst tragen kann, denn alle Pflichten gelten spiegelbildlich.

Zweitens: die Residual-Klausel ungelesen akzeptieren. Sie ist für die Seite mit dem besseren Gedächtnis und den größeren Entwicklungsabteilungen ein Freifahrtschein. Streiche oder beschränke sie, wenn du der kleinere Partner bist.

Drittens: Vertraulichkeit nur per E-Mail-Vermerk. Ein Hinweis in der Signatur begründet keine Pflicht, wenn die Gegenseite nie zugestimmt hat. Erst die unterschriebene Vereinbarung ist eine angemessene Geheimhaltungsmaßnahme im Sinne des Gesetzes.

Viertens: fehlende interne Umsetzung. Wenn die vertraulichen Dateien bei dir in einem offenen Team-Laufwerk liegen, verletzt du § 2 Abs. 2 selbst und verlierst womöglich den gesetzlichen Geheimnisschutz. Lege einen Ordner mit beschränktem Zugriff an und benenne die Personen, die hinein dürfen.`,
      },
      {
        titel: "Rechtsgrundlagen: GeschGehG, Vertragsstrafe und Formfragen",
        text: `Das Geschäftsgeheimnisgesetz von 2019 setzt die EU-Richtlinie 2016/943 um. Nach § 2 Nr. 1 GeschGehG ist ein Geschäftsgeheimnis nur geschützt, wenn der Inhaber angemessene Geheimhaltungsmaßnahmen getroffen hat. Für beide Parteien einer gegenseitigen NDA gilt deshalb: Die Vereinbarung schützt nicht nur gegen den Partner, sie ist auch der Nachweis gegenüber Dritten, dass du dein Know-how ernsthaft sicherst.

§ 3 Abs. 1 Nr. 2 GeschGehG erlaubt das Reverse Engineering, soweit es nicht vertraglich ausgeschlossen ist; die Vorlage schließt es in § 2 Abs. 4 aus. § 5 GeschGehG enthält Ausnahmen für Hinweisgeber und Presse, die kein Vertrag aushebeln kann; § 3 der Vorlage lässt sie ausdrücklich unberührt. Die Ansprüche bei Verletzung stehen in den §§ 6 bis 8 GeschGehG: Unterlassung, Vernichtung, Rückruf, Auskunft und Schadensersatz.

Die Vertragsstrafe richtet sich nach §§ 339 ff. BGB; die Ermessensvariante nach § 315 BGB ist gerichtlich überprüfbar und daher weniger angreifbar.`,
      },
      {
        titel: "Wann das Muster nicht reicht",
        text: `Ein Mutual NDA von zwei Seiten ist für Gespräche zwischen deutschen Unternehmen gemacht. Bei Partnern im Ausland solltest du Rechtswahl, Gerichtsstand und Vollstreckbarkeit mit einer Kanzlei klären, denn ausländische Gerichte behandeln Vertragsstrafen und Geheimnisschutz teils völlig anders.

Bei einer echten Due Diligence vor Unternehmenskauf oder Finanzierungsrunde ist die NDA nur der erste Schritt. Dort folgen Letter of Intent oder Term Sheet, die du ebenfalls in dieser Bibliothek findest, und am Ende ein notarieller Vertrag.

Geht es um Erfindungen, die patentiert werden sollen, verhindert die NDA zwar die neuheitsschädliche Offenbarung, ersetzt aber keine Anmeldung. Bei mehr als zwei Parteien, bei Konsortien oder bei Forschungskooperationen mit Hochschulen brauchst du eine mehrseitige Vereinbarung mit Regeln für gemeinsame Ergebnisse. GründerX ist eine Software für Gründer und keine Rechtsberatung; die Vorlage ist ein Muster, das du an deinen Fall anpassen und bei hohem Einsatz prüfen lassen solltest.`,
      },
    ],
  text: `Gegenseitige Geheimhaltungsvereinbarung

zwischen

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Partei A“ –

und

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Partei B“ –

– gemeinsam „die Parteien“, einzeln auch „offenlegende Partei“ bzw. „empfangende Partei“ –

Präambel
Die Parteien beabsichtigen, [Zweck, z. B. „eine Zusammenarbeit im Bereich … zu prüfen“ / „eine Beteiligung der Partei A an der Partei B zu verhandeln“ / „ein gemeinsames Pilotprojekt zu … durchzuführen“] (nachfolgend „Zweck“). Dazu werden beide Parteien einander vertrauliche Informationen zugänglich machen. Zum Schutz dieser Informationen vereinbaren die Parteien Folgendes:

§ 1 Vertrauliche Informationen
(1) Vertrauliche Informationen sind alle Informationen, Unterlagen und Daten, die eine Partei der anderen im Zusammenhang mit dem Zweck zugänglich macht, gleich ob mündlich, schriftlich, elektronisch oder durch Besichtigung, insbesondere Geschäftsgeheimnisse im Sinne des § 2 Nr. 1 GeschGehG, Geschäfts- und Finanzpläne, Umsatz- und Ertragszahlen, Kunden-, Lieferanten- und Preislisten, Produkt- und Technologieinformationen, Quellcode, Prototypen, Marketing- und Vertriebskonzepte, Verträge mit Dritten sowie Inhalt und Stand der Gespräche zwischen den Parteien.
(2) Informationen gelten auch ohne ausdrückliche Kennzeichnung als vertraulich, wenn sich ihre Vertraulichkeit aus der Art der Information oder den Umständen der Offenlegung ergibt.
(3) Nicht als vertraulich gelten Informationen, für die die empfangende Partei nachweist, dass sie
   a) zum Zeitpunkt der Offenlegung bereits öffentlich bekannt waren oder später ohne Verstoß gegen diese Vereinbarung öffentlich bekannt geworden sind,
   b) ihr vor der Offenlegung bereits rechtmäßig und ohne Geheimhaltungspflicht bekannt waren,
   c) sie von einem Dritten rechtmäßig und ohne Geheimhaltungspflicht erhalten hat oder
   d) sie unabhängig und ohne Nutzung der vertraulichen Informationen der anderen Partei selbst entwickelt hat.

§ 2 Pflichten beider Parteien
(1) Jede Partei behandelt die vertraulichen Informationen der anderen Partei streng vertraulich, verwendet sie ausschließlich für den Zweck und gibt sie ohne vorherige schriftliche Zustimmung der offenlegenden Partei nicht an Dritte weiter.
(2) Jede Partei schützt die vertraulichen Informationen der anderen Partei mit derselben Sorgfalt wie eigene Geschäftsgeheimnisse, mindestens aber mit angemessenen Geheimhaltungsmaßnahmen im Sinne des § 2 Nr. 1 Buchst. b GeschGehG (Zugriffsbeschränkung auf benannte Personen, technischer Zugangsschutz, sichere Aufbewahrung).
(3) Die Weitergabe an Mitarbeiter, Organe, Gesellschafter, verbundene Unternehmen und berufsrechtlich zur Verschwiegenheit verpflichtete Berater ist zulässig, soweit diese die Informationen für den Zweck benötigen und ihrerseits mindestens gleichwertig zur Vertraulichkeit verpflichtet sind. Jede Partei haftet für Verstöße dieser Personen wie für eigene.
(4) Vervielfältigungen sind nur zulässig, soweit sie für den Zweck erforderlich sind. Rückbau, Dekompilierung und sonstige Analyse überlassener Gegenstände, Muster und Software zur Erlangung vertraulicher Informationen sind untersagt (vertragliche Beschränkung im Sinne des § 3 Abs. 1 Nr. 2 GeschGehG).
(5) Jede Partei informiert die andere unverzüglich in Textform über unbefugte Zugriffe auf deren vertrauliche Informationen und über Verstöße gegen diese Vereinbarung.

§ 3 Gesetzliche Offenlegungspflichten
Ist eine Partei aufgrund Gesetzes, gerichtlicher Entscheidung oder behördlicher Anordnung zur Offenlegung vertraulicher Informationen der anderen Partei verpflichtet, informiert sie diese, soweit rechtlich zulässig, unverzüglich vorab, beschränkt die Offenlegung auf das erforderliche Maß und wirkt an Schutzmaßnahmen mit. Die gesetzlichen Ausnahmen des § 5 GeschGehG bleiben unberührt.

§ 4 Residual-Wissen [optional – im Zweifel streichen]
Keine Partei ist gehindert, allgemeine Kenntnisse, Erfahrungen, Fähigkeiten und Ideen zu nutzen, die ihre Mitarbeiter im Gedächtnis behalten, ohne sie bewusst zu diesem Zweck aufgezeichnet, kopiert oder eingeprägt zu haben (Residual-Wissen). Diese Regelung gewährt keine Rechte an Patenten, Urheberrechten, Marken, Designs oder an ausdrücklich als Geschäftsgeheimnis gekennzeichneten Informationen und berechtigt nicht zur Offenlegung der vertraulichen Informationen an Dritte.

§ 5 Keine Rechteeinräumung, keine Exklusivität, keine Abwerbung
(1) Durch diese Vereinbarung und die Offenlegung werden keine Lizenzen, Nutzungs- oder sonstigen Schutzrechte eingeräumt. Alle Rechte verbleiben bei der jeweils offenlegenden Partei.
(2) Keine Partei übernimmt Gewähr für Richtigkeit, Vollständigkeit oder Verwertbarkeit ihrer Informationen. Keine Partei ist verpflichtet, Informationen offenzulegen, Verhandlungen fortzuführen oder einen weiteren Vertrag abzuschließen. Es wird keine Exklusivität begründet.
(3) [Optional:] Während der Laufzeit und für [z. B. 12] Monate danach wirbt keine Partei aktiv Mitarbeiter der anderen Partei ab, die sie im Rahmen des Zwecks kennengelernt hat. Reaktionen auf allgemeine Stellenausschreibungen bleiben zulässig.

§ 6 Rückgabe und Löschung
(1) Auf Verlangen der offenlegenden Partei, spätestens nach Erreichen oder endgültigem Scheitern des Zwecks, gibt die empfangende Partei alle vertraulichen Informationen einschließlich Kopien, Notizen und Auswertungen innerhalb von [z. B. 14] Tagen zurück oder löscht bzw. vernichtet sie unwiderruflich und bestätigt dies auf Verlangen in Textform.
(2) Ausgenommen sind Kopien, die aufgrund gesetzlicher Aufbewahrungspflichten vorzuhalten sind, sowie nicht gezielt zugängliche Sicherungskopien. Für sie gelten die Geheimhaltungspflichten bis zur Löschung fort.

§ 7 Laufzeit
(1) Diese Vereinbarung tritt mit Unterzeichnung in Kraft [Alternative: gilt rückwirkend für alle seit dem [Datum] ausgetauschten Informationen] und läuft [z. B. 2] Jahre. Sie kann von jeder Partei mit einer Frist von [z. B. 1] Monat schriftlich gekündigt werden.
(2) Die Pflichten nach §§ 2, 3 und 6 bestehen nach Beendigung für weitere [z. B. 3] Jahre fort, für Geschäftsgeheimnisse im Sinne des GeschGehG darüber hinaus so lange, wie die Information ein Geschäftsgeheimnis bleibt.

§ 8 Vertragsstrafe und Schadensersatz
(1) [Optional:] Für jeden schuldhaften Verstoß gegen §§ 2, 3 oder 6 zahlt die verletzende Partei an die andere Partei eine Vertragsstrafe in Höhe von [Betrag, z. B. 10.000] EUR; bei fortdauernden Verstößen gilt jeder angefangene Monat als eigener Verstoß. [Alternative: eine angemessene Vertragsstrafe, deren Höhe die verletzte Partei nach billigem Ermessen festsetzt und die im Streitfall gerichtlich überprüft werden kann, § 315 BGB.]
(2) Weitergehende Ansprüche, insbesondere auf Unterlassung, Auskunft und Schadensersatz nach §§ 6 ff. GeschGehG, bleiben unberührt. Eine gezahlte Vertragsstrafe wird auf Schadensersatz wegen desselben Verstoßes angerechnet.
(3) Jede Partei kann bei Verstößen oder drohenden Verstößen einstweiligen Rechtsschutz in Anspruch nehmen.

§ 9 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieser Vereinbarung bedürfen der Schriftform; das gilt auch für die Aufhebung dieser Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Rechte und Pflichten aus dieser Vereinbarung dürfen nur mit schriftlicher Zustimmung der anderen Partei übertragen werden.
(3) Sollte eine Bestimmung unwirksam sein oder werden, bleibt die Vereinbarung im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(4) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Ausschließlicher Gerichtsstand ist, soweit beide Parteien Kaufleute, juristische Personen des öffentlichen Rechts oder öffentlich-rechtliche Sondervermögen sind, [Ort].
(5) Jede Partei erhält eine unterschriebene Ausfertigung.

[Ort], den [Datum]


______________________________
[Vorname Nachname], für Partei A


______________________________
[Vorname Nachname], für Partei B

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
