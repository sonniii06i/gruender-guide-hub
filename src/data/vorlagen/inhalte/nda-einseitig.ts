// Inhalt der Vorlage „nda-einseitig“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../geheimhaltung.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du eine einseitige Geheimhaltungsvereinbarung brauchst",
        text: `Eine einseitige NDA (Non-Disclosure Agreement, auf Deutsch Geheimhaltungs- oder Vertraulichkeitsvereinbarung) passt immer dann, wenn der Informationsfluss nur in eine Richtung läuft: Du zeigst etwas, die andere Seite schaut. Typische Fälle sind das Gespräch mit einem Freelancer oder einer Agentur, die deine App bauen soll, das Angebot eines Herstellers, der dafür deine Zeichnungen oder Rezepturen braucht, ein Bewerbungsgespräch für eine Schlüsselposition oder ein Berater, der deine Kalkulation sehen will.

Auch gegenüber Investoren ist die einseitige Variante der Normalfall, denn der Investor legt selbst keine Geheimnisse offen. Viele Business Angels und Fonds unterschreiben allerdings vor einem ersten Pitch keine NDA. Dann gilt: Erzähle im Erstgespräch nur, was du auch auf einer Konferenz sagen würdest, und verlange die Unterschrift, bevor der Datenraum aufgeht.`,
      },
      {
        titel: "Was muss in eine NDA? Die Pflichtbausteine der Vorlage",
        text: `Ein NDA Muster ist nur so gut wie seine Definitionen. Die Vorlage deckt die Punkte ab, an denen Geheimhaltungsvereinbarungen in der Praxis scheitern:

- § 1 Vertrauliche Informationen: eine weite Definition mit Beispielen (Geschäftspläne, Quellcode, Kalkulationen, Prototypen) plus der Regel, dass auch nicht gekennzeichnete Informationen geschützt sind, wenn sich die Vertraulichkeit aus den Umständen ergibt.
- § 1 Abs. 3 Ausnahmen: öffentlich bekannt, vorher bekannt, von Dritten rechtmäßig erhalten, selbst entwickelt. Die Beweislast liegt bei der empfangenden Partei.
- § 2 Pflichten: Nutzung nur für den Zweck, angemessene Schutzmaßnahmen, Weitergabe nur an verpflichtete Mitarbeiter und Berater, Verbot von Reverse Engineering, Meldepflicht bei Vorfällen.
- § 3 gesetzliche Offenlegungspflichten mit Vorab-Information.
- § 4 keine Rechteeinräumung und kein Zwang zum Vertragsschluss.
- § 5 Rückgabe und Löschung mit Frist und Bestätigung in Textform.
- § 6 Laufzeit und Nachwirkung, in der Vorlage drei Jahre, für echte Geschäftsgeheimnisse unbegrenzt.
- § 7 Vertragsstrafe in zwei Varianten und Schadensersatz nach GeschGehG.
- § 8 Schriftform, Rechtswahl, Gerichtsstand.`,
      },
      {
        titel: "NDA Vorlage ausfüllen: Schritt für Schritt entlang der Platzhalter",
        text: `Alle Platzhalter stehen in eckigen Klammern. Lade die Vorlage kostenlos als Word, PDF oder Text herunter und arbeite sie von oben nach unten durch.

Zuerst die Parteien: Firma, Rechtsform, Anschrift und die vertretungsberechtigte Person. Danach der Zweck in der Präambel: Formuliere ihn konkret, etwa „Prüfung einer Zusammenarbeit bei der Entwicklung der App X“.

In § 1 Abs. 2 entscheidest du, ob mündliche Informationen nur mit schriftlicher Bestätigung binnen 14 Tagen geschützt sind. Die strengere Variante ohne Bestätigungspflicht ist für dich als offenlegende Partei besser. In § 5 trägst du die Rückgabefrist ein, in § 6 die Laufzeit (zum Beispiel zwei Jahre), die Kündigungsfrist und die Nachwirkung (drei Jahre). In § 7 wählst du Variante A mit festem Betrag oder Variante B nach billigem Ermessen und streichst die andere. Zum Schluss Ort, Datum und Gerichtsstand, dann unterschreiben beide Seiten jeweils eine Ausfertigung.`,
      },
      {
        titel: "Typische Fehler bei Vertraulichkeitsvereinbarungen",
        text: `Der häufigste Fehler ist die nachträgliche NDA: Die Unterlagen sind schon per E-Mail raus, die Unterschrift kommt Wochen später. Die Vorlage bietet dafür in § 6 Abs. 1 eine Rückwirkungsklausel, besser ist aber, die Vereinbarung vor dem ersten Dokument zu schließen.

Zweiter Fehler: kein Nachweis, was übergeben wurde. Wenn die Gegenseite behauptet, die Information sei ihr schon vorher bekannt gewesen, musst du zeigen können, was du wann geschickt hast. Führe ein einfaches Übergabeprotokoll mit Datum und Dateinamen.

Dritter Fehler: überzogene Vertragsstrafen. Ein pauschaler Betrag, der in keinem Verhältnis zum Wert der Information steht, wird vom Gericht herabgesetzt oder in vorformulierten Verträgen ganz gestrichen. Wähle einen Betrag, den du begründen kannst, oder nutze Variante B.

Vierter Fehler: die Erwartung, eine NDA sei ein Wettbewerbsverbot. Sie verbietet nur die Nutzung und Weitergabe deiner Informationen, nicht die Tätigkeit im selben Markt.`,
      },
      {
        titel: "Rechtliche Grundlagen: Geschäftsgeheimnisgesetz und Vertragsstrafe",
        text: `Seit April 2019 regelt das Geschäftsgeheimnisgesetz (GeschGehG) den Schutz vertraulicher Unternehmensinformationen. Nach § 2 Nr. 1 GeschGehG ist eine Information nur dann ein Geschäftsgeheimnis, wenn sie nicht allgemein bekannt ist, deshalb wirtschaftlichen Wert hat und Gegenstand angemessener Geheimhaltungsmaßnahmen ist. Dieser dritte Punkt ist neu gegenüber dem alten Recht: Wer keine Maßnahmen nachweisen kann, hat kein geschütztes Geheimnis. Die unterschriebene NDA ist die einfachste und wichtigste dieser Maßnahmen, ergänzt durch Zugriffsbeschränkungen und Kennzeichnung.

§ 3 GeschGehG erlaubt grundsätzlich das Reverse Engineering öffentlich verfügbarer Produkte, lässt aber vertragliche Verbote zu. Genau das nutzt § 2 Abs. 4 der Vorlage. Die §§ 6 ff. GeschGehG geben dir bei Verletzungen Ansprüche auf Unterlassung, Auskunft, Vernichtung und Schadensersatz.

Die Vertragsstrafe ist in den §§ 339 ff. BGB geregelt. Variante B stützt sich auf § 315 BGB: Du setzt die Höhe nach billigem Ermessen fest, das Gericht kann sie überprüfen. Diese Form hält auch in AGB-ähnlichen Situationen besser als starre Pauschalen.`,
      },
      {
        titel: "Wann das NDA Muster nicht reicht und ein Anwalt helfen sollte",
        text: `Die Vorlage ist für deutsche Vertragspartner und deutsches Recht geschrieben. Sitzt die Gegenseite im Ausland, prüfe Rechtswahl und Gerichtsstand genau; ein deutsches Urteil gegen einen Partner in den USA oder China ist schwer zu vollstrecken, und dort gelten andere Regeln für Vertragsstrafen. Bei größeren Auslandsdeals gehört die NDA in anwaltliche Hände.

Auch wenn es um patentfähige Erfindungen geht, ist Vorsicht geboten: Eine NDA verhindert die neuheitsschädliche Offenbarung, ersetzt aber keine Patentanmeldung. Sprich vor der Offenlegung mit einem Patentanwalt, wenn eine Anmeldung in Frage kommt.

GründerX stellt dir diese Vorlage als Software-Werkzeug zur Verfügung und ersetzt keine Rechtsberatung. Bei hohem Streitwert, mehreren Parteien oder einer Vertragsstrafe im sechsstelligen Bereich lohnt sich die Prüfung durch eine Kanzlei, bevor du unterschreibst.`,
      },
    ],
  text: `Geheimhaltungsvereinbarung (einseitig)

zwischen

[Firma / Vorname Nachname], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „offenlegende Partei“ –

und

[Firma / Vorname Nachname], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „empfangende Partei“ –

– gemeinsam „die Parteien“ –

Präambel
Die offenlegende Partei beabsichtigt, der empfangenden Partei im Zusammenhang mit [Zweck, z. B. „der Prüfung einer Zusammenarbeit bei der Entwicklung der App X“ / „einem Angebot für die Fertigung des Produkts Y“] (nachfolgend „Zweck“) vertrauliche Informationen zugänglich zu machen. Die empfangende Partei legt ihrerseits keine vertraulichen Informationen offen. Zum Schutz der Informationen der offenlegenden Partei vereinbaren die Parteien Folgendes:

§ 1 Vertrauliche Informationen
(1) Vertrauliche Informationen sind alle Informationen, Unterlagen und Daten, die die offenlegende Partei der empfangenden Partei im Zusammenhang mit dem Zweck zugänglich macht, gleich ob mündlich, schriftlich, elektronisch oder durch Besichtigung, insbesondere Geschäftsgeheimnisse im Sinne des § 2 Nr. 1 GeschGehG, Geschäftspläne, Kunden- und Lieferantenlisten, Preise und Kalkulationen, Finanzdaten, Produktideen, Prototypen, Rezepturen, Quellcode, Algorithmen, technische Zeichnungen und Marketingkonzepte sowie die Tatsache, dass die Parteien Gespräche über den Zweck führen.
(2) Informationen gelten auch dann als vertraulich, wenn sie nicht ausdrücklich als „vertraulich“ gekennzeichnet sind, sofern sich ihre Vertraulichkeit aus der Art der Information oder den Umständen der Offenlegung ergibt. [Alternative: Mündlich mitgeteilte Informationen sind nur geschützt, wenn die offenlegende Partei sie innerhalb von 14 Tagen in Textform als vertraulich bestätigt.]
(3) Nicht als vertraulich gelten Informationen, für die die empfangende Partei nachweist, dass sie
   a) zum Zeitpunkt der Offenlegung bereits öffentlich bekannt waren oder später ohne Verstoß gegen diese Vereinbarung öffentlich bekannt geworden sind,
   b) ihr vor der Offenlegung bereits rechtmäßig und ohne Geheimhaltungspflicht bekannt waren,
   c) sie von einem Dritten rechtmäßig und ohne Geheimhaltungspflicht erhalten hat oder
   d) sie unabhängig und ohne Nutzung der vertraulichen Informationen selbst entwickelt hat.

§ 2 Pflichten der empfangenden Partei
(1) Die empfangende Partei behandelt die vertraulichen Informationen streng vertraulich, verwendet sie ausschließlich für den Zweck und gibt sie ohne vorherige schriftliche Zustimmung der offenlegenden Partei nicht an Dritte weiter.
(2) Sie schützt die vertraulichen Informationen mindestens mit der Sorgfalt, die sie für eigene Geschäftsgeheimnisse anwendet, und stets mit angemessenen Geheimhaltungsmaßnahmen im Sinne des § 2 Nr. 1 Buchst. b GeschGehG (insbesondere Zugriffsbeschränkung auf benannte Personen, Passwortschutz, verschlossene Aufbewahrung).
(3) Die Weitergabe an Mitarbeiter, Organe, verbundene Unternehmen und Berater (Rechtsanwälte, Steuerberater, Wirtschaftsprüfer) ist nur zulässig, soweit diese die Informationen für den Zweck benötigen und ihrerseits zur Vertraulichkeit verpflichtet sind: Berater kraft Berufsrechts, alle anderen durch eine schriftliche Verpflichtung, die dieser Vereinbarung mindestens entspricht. Die empfangende Partei haftet für Verstöße dieser Personen wie für eigene Verstöße.
(4) Die empfangende Partei kopiert oder vervielfältigt vertrauliche Informationen nur, soweit dies für den Zweck erforderlich ist. Das Beobachten, Untersuchen, Rückbauen und Testen überlassener Gegenstände, Prototypen und Software (Reverse Engineering) ist untersagt; die Parteien vereinbaren damit eine vertragliche Beschränkung im Sinne des § 3 Abs. 1 Nr. 2 GeschGehG.
(5) Die empfangende Partei informiert die offenlegende Partei unverzüglich in Textform, wenn sie von einem unbefugten Zugriff auf vertrauliche Informationen oder einem Verstoß gegen diese Vereinbarung Kenntnis erlangt.

§ 3 Gesetzliche Offenlegungspflichten
Ist die empfangende Partei aufgrund Gesetzes, gerichtlicher Entscheidung oder behördlicher Anordnung zur Offenlegung vertraulicher Informationen verpflichtet, informiert sie die offenlegende Partei, soweit rechtlich zulässig, unverzüglich vorab, beschränkt die Offenlegung auf das erforderliche Maß und unterstützt die offenlegende Partei bei der Erwirkung von Schutzmaßnahmen. Die gesetzlichen Ausnahmen nach § 5 GeschGehG (insbesondere zum Schutz von Hinweisgebern und der Meinungs- und Pressefreiheit) bleiben unberührt.

§ 4 Keine Rechteeinräumung, kein Vertragsschlusszwang
(1) Durch diese Vereinbarung und die Offenlegung werden keine Lizenzen, Nutzungs-, Patent-, Marken-, Urheber- oder sonstigen Schutzrechte an den vertraulichen Informationen eingeräumt. Alle Rechte verbleiben bei der offenlegenden Partei.
(2) Die offenlegende Partei übernimmt keine Gewähr für Richtigkeit, Vollständigkeit oder Verwertbarkeit der vertraulichen Informationen, soweit nicht ausdrücklich etwas anderes vereinbart ist.
(3) Keine Partei ist verpflichtet, Informationen offenzulegen, Verhandlungen fortzuführen oder einen weiteren Vertrag abzuschließen. Diese Vereinbarung begründet keine Exklusivität und kein Gesellschaftsverhältnis.

§ 5 Rückgabe und Löschung
(1) Auf Verlangen der offenlegenden Partei, spätestens aber nach Erreichen oder endgültigem Scheitern des Zwecks, gibt die empfangende Partei alle vertraulichen Informationen einschließlich aller Kopien, Notizen und Auswertungen innerhalb von [z. B. 14] Tagen nach Wahl der offenlegenden Partei zurück oder löscht bzw. vernichtet sie unwiderruflich und bestätigt dies auf Verlangen in Textform.
(2) Ausgenommen sind Kopien, die die empfangende Partei aufgrund gesetzlicher Aufbewahrungspflichten vorhalten muss, sowie automatisch erzeugte Sicherungskopien, auf die nicht gezielt zugegriffen wird. Für diese gelten die Geheimhaltungspflichten bis zur Löschung fort.

§ 6 Laufzeit
(1) Diese Vereinbarung tritt mit Unterzeichnung in Kraft [Alternative: gilt rückwirkend für alle seit dem [Datum] offengelegten Informationen] und gilt für die Dauer der Gespräche bzw. der Zusammenarbeit über den Zweck, längstens jedoch für [z. B. 2] Jahre. Sie kann von jeder Partei mit einer Frist von [z. B. 1] Monat schriftlich gekündigt werden.
(2) Die Pflichten nach §§ 2, 3 und 5 bestehen nach Beendigung dieser Vereinbarung für weitere [z. B. 3] Jahre fort. Für Informationen, die ein Geschäftsgeheimnis im Sinne des GeschGehG darstellen, gelten sie darüber hinaus fort, solange die Information ein Geschäftsgeheimnis bleibt.

§ 7 Vertragsstrafe und Schadensersatz
[Variante A – feste Vertragsstrafe:]
(1) Für jeden schuldhaften Verstoß gegen die Pflichten aus §§ 2, 3 oder 5 zahlt die empfangende Partei an die offenlegende Partei eine Vertragsstrafe in Höhe von [Betrag, z. B. 10.000] EUR. Bei fortdauernden Verstößen gilt jeder angefangene Monat als eigener Verstoß. Die Einrede des Fortsetzungszusammenhangs ist ausgeschlossen.
[Variante B – Vertragsstrafe nach Ermessen:]
(1) Für jeden schuldhaften Verstoß gegen die Pflichten aus §§ 2, 3 oder 5 zahlt die empfangende Partei eine angemessene Vertragsstrafe, deren Höhe die offenlegende Partei nach billigem Ermessen festsetzt und die im Streitfall vom zuständigen Gericht überprüft werden kann (§ 315 BGB).
(2) Weitergehende Ansprüche, insbesondere auf Unterlassung, Auskunft und Schadensersatz nach §§ 6 ff. GeschGehG und nach dem BGB, bleiben unberührt. Eine gezahlte Vertragsstrafe wird auf einen Schadensersatz wegen desselben Verstoßes angerechnet.
(3) Die offenlegende Partei kann bei Verstößen oder drohenden Verstößen einstweiligen Rechtsschutz in Anspruch nehmen.

§ 8 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieser Vereinbarung bedürfen der Schriftform; das gilt auch für die Aufhebung dieser Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Rechte und Pflichten aus dieser Vereinbarung dürfen nur mit schriftlicher Zustimmung der anderen Partei auf Dritte übertragen werden.
(3) Sollte eine Bestimmung dieser Vereinbarung unwirksam sein oder werden, bleibt die Vereinbarung im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(4) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Ausschließlicher Gerichtsstand ist, soweit beide Parteien Kaufleute, juristische Personen des öffentlichen Rechts oder öffentlich-rechtliche Sondervermögen sind, [Ort].
(5) Jede Partei erhält eine unterschriebene Ausfertigung dieser Vereinbarung.

[Ort], den [Datum]


______________________________
[Vorname Nachname], für die offenlegende Partei


______________________________
[Vorname Nachname], für die empfangende Partei

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
