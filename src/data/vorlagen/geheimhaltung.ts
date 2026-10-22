import { VORLAGEN_HINWEIS, type Vorlage } from "./types";

// Geheimhaltung & Rechte: NDA, LOI, Term Sheet, Lizenzen, Nutzungsrechte,
// White Label, Auftragsentwicklung. Rechtsstand: GeschGehG, UrhG, MarkenG,
// BGB (Oktober 2026). Stand 2026-10.

export const VORLAGEN_GEHEIMHALTUNG: Vorlage[] = [
  {
    slug: "nda-einseitig",
    titel: "Geheimhaltungsvereinbarung (NDA, einseitig)",
    kurz: "Einseitige Vertraulichkeitsvereinbarung nach dem Geschäftsgeheimnisgesetz, wenn nur du Informationen offenlegst.",
    kategorie: "geheimhaltung",
    dateiname: "Geheimhaltungsvereinbarung-einseitig",
    wofuer: [
      "Du zeigst einem Dienstleister, Hersteller oder Freelancer deine Produktidee, Kalkulation oder deinen Quellcode",
      "Gespräche mit potenziellen Mitarbeitern, Agenturen oder Lieferanten vor Vertragsschluss",
      "Ein Investor oder Berater soll Zahlen sehen, gibt aber selbst nichts Vertrauliches preis",
      "Als Nachweis angemessener Geheimhaltungsmaßnahmen, damit deine Informationen überhaupt als Geschäftsgeheimnis geschützt sind",
    ],
    enthaelt: [
      "Präambel mit Zweck der Offenlegung",
      "§ 1 Vertrauliche Informationen und Ausnahmen",
      "§ 2 Pflichten der empfangenden Partei (Nutzung, Schutz, Weitergabe, Reverse-Engineering-Verbot)",
      "§ 3 Gesetzliche Offenlegungspflichten",
      "§ 4 Keine Rechteeinräumung, kein Vertragsschlusszwang",
      "§ 5 Rückgabe und Löschung",
      "§ 6 Laufzeit und Nachwirkung (z. B. 3 Jahre)",
      "§ 7 Vertragsstrafe (optional) und Schadensersatz",
      "§ 8 Schlussbestimmungen",
    ],
    hinweise: [
      "Nach § 2 Nr. 1 GeschGehG ist eine Information nur dann ein Geschäftsgeheimnis, wenn du sie durch angemessene Maßnahmen schützt. Ohne NDA und ohne Zugriffsbeschränkung kannst du den gesetzlichen Schutz komplett verlieren.",
      "Eine Vertragsstrafe muss der Höhe nach angemessen sein. In vorformulierten Verträgen (AGB) sind starre, überhöhte Pauschalen angreifbar; die Vorlage bietet deshalb auch die Variante mit Festsetzung nach billigem Ermessen.",
      "Die Ausnahmen (bereits bekannt, öffentlich, eigenständig entwickelt) muss die empfangende Partei beweisen. Halte deshalb selbst fest, was du wann übergeben hast (Übergabeprotokoll, Datum, Dateinamen).",
      "Mündliche Informationen sind schwer zu beweisen. Wenn du sie schützen willst, bestätige sie innerhalb weniger Tage schriftlich oder wähle die strengere Variante ohne Bestätigungspflicht.",
      "Ein NDA verhindert keine Konkurrenz. Wer dir keine Wettbewerbsverbote unterschreibt, darf nach dem Gespräch weiter im selben Markt arbeiten, nur nicht mit deinen Informationen.",
    ],
    faqs: [
      {
        q: "Wann reicht eine einseitige NDA, wann brauche ich eine gegenseitige?",
        a: "Einseitig passt, wenn nur du Informationen preisgibst, etwa gegenüber einem Dienstleister oder Bewerber. Sobald die andere Seite eigene Zahlen, Technik oder Kundenlisten offenlegt, wollt ihr beide geschützt sein. Dann nimm die gegenseitige Variante, sonst muss die Gegenseite nachverhandeln.",
      },
      {
        q: "Wie lange gilt die Geheimhaltungspflicht?",
        a: "Üblich sind zwei bis fünf Jahre nach Ende der Zusammenarbeit; die Vorlage sieht drei Jahre vor. Für echte Geschäftsgeheimnisse wie Rezepturen oder Quellcode gilt die Pflicht nach der Vorlage so lange, wie die Information geheim bleibt. Unbegrenzte Fristen für alles sind riskant, weil Gerichte sie als unangemessen kippen können.",
      },
      {
        q: "Brauche ich eine Vertragsstrafe?",
        a: "Nicht zwingend, aber ohne sie musst du im Streitfall deinen konkreten Schaden beweisen, was bei Geheimnisverrat fast nie gelingt. Eine Vertragsstrafe von 5.000 bis 25.000 EUR je Verstoß ist bei Gründern üblich. Sie muss im Verhältnis zum Wert der Information stehen, sonst wird sie herabgesetzt.",
      },
      {
        q: "Gilt die NDA auch für Mitarbeiter und Berater der anderen Seite?",
        a: "Nur, wenn die Vereinbarung das regelt. Die Vorlage erlaubt die Weitergabe an Mitarbeiter und Berufsgeheimnisträger, verlangt aber eine entsprechende Verpflichtung und lässt die empfangende Partei für deren Verstöße wie für eigene haften.",
      },
    ],
    seo: {
      title: "NDA Vorlage einseitig 2026 kostenlos (Word & PDF) | GründerX",
      description:
        "Einseitige Geheimhaltungsvereinbarung nach GeschGehG als kostenlose Vorlage: vertrauliche Informationen, Ausnahmen, Laufzeit, Rückgabe, Vertragsstrafe.",
    },
    stand: "2026-10",
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
  },
  {
    slug: "nda-gegenseitig",
    titel: "Geheimhaltungsvereinbarung (NDA, gegenseitig)",
    kurz: "Beidseitige Vertraulichkeitsvereinbarung für Kooperations-, Investment- und Partnerschaftsgespräche nach GeschGehG.",
    kategorie: "geheimhaltung",
    dateiname: "Geheimhaltungsvereinbarung-gegenseitig",
    wofuer: [
      "Zwei Unternehmen prüfen eine Kooperation, ein Joint Venture oder eine gemeinsame Produktentwicklung",
      "Gespräche mit Investoren oder Käufern, in denen beide Seiten Zahlen und Pläne offenlegen",
      "Vor einem Pitch, einer Due Diligence oder einem gemeinsamen Pilotprojekt",
      "Als faire Grundlage, wenn die Gegenseite keine einseitige NDA unterschreiben will",
    ],
    enthaelt: [
      "Präambel mit Zweck des Austauschs",
      "§ 1 Vertrauliche Informationen und Ausnahmen",
      "§ 2 Beidseitige Pflichten (Nutzung, Schutz, Weitergabe, Vervielfältigung)",
      "§ 3 Gesetzliche Offenlegungspflichten",
      "§ 4 Residual-Wissen (optional)",
      "§ 5 Keine Rechteeinräumung, keine Exklusivität, keine Abwerbung",
      "§ 6 Rückgabe und Löschung",
      "§ 7 Laufzeit und Nachwirkung",
      "§ 8 Vertragsstrafe (optional), Schadensersatz",
      "§ 9 Schlussbestimmungen",
    ],
    hinweise: [
      "Gegenseitig heißt nicht symmetrisch in der Praxis: Wer deutlich mehr offenlegt (meist das Start-up), sollte Schutzniveau, Laufzeit und Vertragsstrafe nicht großzügiger fassen, als er sie selbst erfüllen kann.",
      "Die Residual-Klausel erlaubt der Gegenseite, Wissen aus dem Gedächtnis weiterzuverwenden. Große Unternehmen bestehen oft darauf; für dich ist sie riskant, wenn dein Kern-Know-how leicht zu merken ist. Streiche sie im Zweifel.",
      "Nach § 2 Nr. 1 GeschGehG schützt das Gesetz nur Informationen, die du durch angemessene Maßnahmen sicherst. Die NDA ist eine solche Maßnahme, ersetzt aber keine Zugriffsbeschränkung im Unternehmen.",
      "Investoren unterschreiben vor einem Erstgespräch selten eine NDA. Verlange sie spätestens vor dem Datenraum und lege vorher nur, was du auch öffentlich sagen würdest.",
    ],
    faqs: [
      {
        q: "Was ist eine Residual-Klausel und soll ich sie akzeptieren?",
        a: "Sie erlaubt, Informationen zu nutzen, die im Gedächtnis der beteiligten Personen bleiben, ohne dass sie bewusst notiert oder kopiert wurden. Das schützt Konzerne vor dem Vorwurf, Ideen geklaut zu haben. Als kleinere Partei solltest du sie nur akzeptieren, wenn dein Vorsprung nicht in einer leicht merkbaren Idee liegt, und sie zumindest auf Schutzrechte und ausdrücklich gekennzeichnete Geheimnisse nicht anwenden.",
      },
      {
        q: "Reicht ein Austausch per E-Mail mit dem Vermerk vertraulich?",
        a: "Nein. Ein Vermerk begründet keine Pflicht, wenn die Gegenseite ihr nie zugestimmt hat. Erst die unterschriebene Vereinbarung schafft Unterlassungs- und Schadensersatzansprüche und gilt als angemessene Geheimhaltungsmaßnahme im Sinne des Geschäftsgeheimnisgesetzes.",
      },
      {
        q: "Muss die NDA notariell beurkundet oder im Original unterschrieben werden?",
        a: "Nein, sie ist formfrei. Die Vorlage sieht Schriftform vor, weil Unterschriften den Beweis erleichtern. Eine qualifizierte elektronische Signatur ersetzt die Unterschrift; ein einfaches Klick-Signaturtool ist nicht ohne Weiteres gleichwertig, aber in der Praxis meist ausreichend, wenn ihr das ausdrücklich vereinbart.",
      },
      {
        q: "Was passiert, wenn aus den Gesprächen nichts wird?",
        a: "Dann greift die Rückgabe- und Löschpflicht, und die Geheimhaltungspflichten laufen für die vereinbarte Nachfrist weiter, in der Vorlage drei Jahre. Verwende Gelerntes nur, wenn es unter die Ausnahmen fällt oder die Residual-Klausel vereinbart wurde.",
      },
    ],
    seo: {
      title: "NDA Vorlage gegenseitig 2026 kostenlos (Word & PDF) | GründerX",
      description:
        "Gegenseitige NDA für Kooperation und Investment als kostenlose Vorlage nach GeschGehG: Pflichten beider Seiten, Residual-Klausel, Laufzeit, Vertragsstrafe.",
    },
    stand: "2026-10",
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
  },
  {
    slug: "letter-of-intent",
    titel: "Absichtserklärung (Letter of Intent)",
    kurz: "LOI für Unternehmenskauf oder Beteiligung mit Eckpunkten, Exklusivität, Due Diligence und klarer Trennung von verbindlich und unverbindlich.",
    kategorie: "geheimhaltung",
    dateiname: "Absichtserklaerung-Letter-of-Intent",
    wofuer: [
      "Du willst ein Unternehmen, einen Geschäftsbetrieb oder Geschäftsanteile kaufen und die Eckpunkte vor der Due Diligence festhalten",
      "Ein Investor will sich an deinem Start-up beteiligen und ihr wollt den Rahmen vor der Vertragsverhandlung fixieren",
      "Du verkaufst dein Unternehmen und willst Exklusivität nur gegen einen ernsthaften Fahrplan gewähren",
      "Als Grundlage für Bank, Steuerberater oder Notar, bevor der eigentliche Kauf- oder Beteiligungsvertrag entsteht",
    ],
    enthaelt: [
      "Präambel und Beschreibung der Zielgesellschaft",
      "§ 1 Gegenstand der beabsichtigten Transaktion (Share Deal, Asset Deal, Kapitalerhöhung)",
      "§ 2 Wirtschaftliche Eckpunkte (indikativer Kaufpreis, Anpassung, Earn-out, Garantien)",
      "§ 3 Due Diligence (Umfang, Datenraum, Fristen)",
      "§ 4 Exklusivität",
      "§ 5 Vertraulichkeit und Kommunikation",
      "§ 6 Kosten",
      "§ 7 Zeitplan",
      "§ 8 Unverbindlichkeit und verbindliche Regelungen",
      "§ 9 Schlussbestimmungen",
    ],
    hinweise: [
      "Ein LOI ist nur so unverbindlich, wie er formuliert ist. Wer Kaufpreis, Zahlungsmodalitäten und Vollzug bereits abschließend regelt, riskiert, dass ein Gericht einen Vorvertrag annimmt. Die Vorlage trennt deshalb ausdrücklich verbindliche von unverbindlichen Teilen.",
      "Der Verkauf von GmbH-Anteilen muss notariell beurkundet werden (§ 15 Abs. 4 GmbHG). Ein LOI mit Übertragungspflicht wäre ohne Notar nichtig; deshalb enthält er nur eine Absicht, keine Verpflichtung zum Abschluss.",
      "Exklusivität ist für den Verkäufer das größte Zugeständnis: Während der Frist darf er mit niemand anderem verhandeln. Gewähre sie nur befristet und mit Fahrplan, fordere sie als Käufer nur, wenn du die Due Diligence wirklich finanzieren und durchführen kannst.",
      "Wer Verhandlungen ohne triftigen Grund abbricht, nachdem er den Abschluss als sicher dargestellt hat, kann nach § 311 Abs. 2 BGB auf Ersatz der nutzlosen Aufwendungen haften. Die Vorlage stellt klar, dass jede Seite jederzeit aussteigen darf.",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen LOI, Term Sheet und Vorvertrag?",
        a: "Ein LOI hält die Verhandlungsabsicht und Eckpunkte fest und ist im Kern unverbindlich. Ein Term Sheet ist dasselbe in Tabellenform, meist bei Finanzierungsrunden. Ein Vorvertrag verpflichtet dagegen schon zum Abschluss des Hauptvertrags und braucht bei GmbH-Anteilen den Notar. Die Vorlage ist bewusst kein Vorvertrag.",
      },
      {
        q: "Welche Teile des LOI sind rechtlich bindend?",
        a: "In der Vorlage nur Exklusivität, Vertraulichkeit, Kostentragung, die Regelung zur Unverbindlichkeit selbst und die Schlussbestimmungen. Alles andere, insbesondere Kaufpreis und Struktur, ist eine Absichtserklärung, die beide Seiten in der Due Diligence und im Kaufvertrag noch verändern dürfen.",
      },
      {
        q: "Wie lange sollte die Exklusivität laufen?",
        a: "Bei kleinen Transaktionen sind sechs bis zehn Wochen üblich, bei komplexeren drei bis vier Monate. Koppele die Frist an den Zeitplan: Endet die Due Diligence ohne Vertragsentwurf des Käufers, sollte auch die Exklusivität enden. Eine Verlängerung sollte nur schriftlich und freiwillig möglich sein.",
      },
      {
        q: "Brauche ich für den LOI zusätzlich eine NDA?",
        a: "Nicht zwingend, die Vorlage enthält eine Vertraulichkeitsregelung. Wenn ihr vorher bereits eine NDA geschlossen habt, verweist der LOI darauf. Liegt der Datenraum schon offen, bevor der LOI unterschrieben ist, solltest du eine eigenständige NDA vorschalten.",
      },
    ],
    seo: {
      title: "Letter of Intent Vorlage 2026 kostenlos (Word & PDF) | GründerX",
      description:
        "Absichtserklärung (LOI) für Unternehmenskauf und Beteiligung als kostenlose Vorlage: Eckpunkte, Exklusivität, Due Diligence, Zeitplan, klare Unverbindlichkeit.",
    },
    stand: "2026-10",
    text: `Absichtserklärung (Letter of Intent)

über den beabsichtigten Erwerb von [Geschäftsanteilen an der / einer Beteiligung an der / des Geschäftsbetriebs der] [Firma der Zielgesellschaft]

zwischen

[Firma / Vorname Nachname], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Interessent“ –

und

[Firma / Vorname Nachname], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Inhaber“ –

[und [Firma der Zielgesellschaft], [Rechtsform], eingetragen im Handelsregister des Amtsgerichts [Ort] unter HRB [Nummer], vertreten durch [Vorname Nachname] – nachfolgend „Gesellschaft“ –]

– gemeinsam „die Parteien“ –

Präambel
Der Inhaber hält [100 / Anteil in %] % der Geschäftsanteile an der Gesellschaft. Die Gesellschaft betreibt [Beschreibung des Geschäfts, z. B. „einen Online-Shop für …“ / „eine Software-Plattform für …“] mit Sitz in [Ort]. Der Interessent beabsichtigt, [sämtliche / einen Teil der] Geschäftsanteile zu erwerben [Alternative: sich im Wege einer Kapitalerhöhung an der Gesellschaft zu beteiligen / die wesentlichen Vermögensgegenstände des Geschäftsbetriebs zu erwerben]. Diese Absichtserklärung hält den Stand der Gespräche und die Rahmenbedingungen für die weiteren Verhandlungen fest.

§ 1 Gegenstand der beabsichtigten Transaktion
(1) Beabsichtigt ist [Variante A: der Erwerb von Geschäftsanteilen im Nennbetrag von insgesamt [Betrag] EUR, entsprechend [Anteil] % des Stammkapitals, durch den Interessenten (Share Deal)] [Variante B: der Erwerb der in einer Anlage zu bestimmenden Vermögensgegenstände, Verträge und Rechte des Geschäftsbetriebs (Asset Deal)] [Variante C: die Übernahme neuer Geschäftsanteile im Rahmen einer Kapitalerhöhung gegen eine Einlage von [Betrag] EUR, sodass der Interessent nach Vollzug mit [Anteil] % beteiligt ist].
(2) Der wirtschaftliche Stichtag soll der [Datum] sein. Der Vollzug (Closing) ist für den [Datum] vorgesehen.
(3) [Optional:] Der Inhaber bleibt für eine Übergangszeit von [z. B. 12] Monaten als Geschäftsführer bzw. Berater für die Gesellschaft tätig; die Bedingungen werden in einem gesonderten Vertrag geregelt.

§ 2 Wirtschaftliche Eckpunkte (indikativ)
(1) Auf Basis der bislang vorgelegten Unterlagen (insbesondere [Jahresabschlüsse [Jahre], BWA per [Datum], Planung [Jahr]]) geht der Interessent von einem Kaufpreis von [Betrag] EUR für [100 / Anteil] % der Geschäftsanteile aus. Der Kaufpreis versteht sich auf Basis „cash and debt free“ und eines normalisierten Working Capital von [Betrag] EUR; Abweichungen zum Stichtag werden [per Locked-Box-Mechanismus / über eine Kaufpreisanpassung nach Stichtagsabschluss] berücksichtigt.
(2) Zahlung: [Betrag] EUR bei Vollzug, [Betrag] EUR als Earn-out, der sich nach [Kennzahl, z. B. EBITDA / Umsatz] der Geschäftsjahre [Jahre] bemisst, [Betrag] EUR als Einbehalt für Garantieansprüche über [z. B. 18] Monate.
(3) Der Inhaber wird im Kaufvertrag marktübliche Garantien abgeben, insbesondere zu Bestand und Lastenfreiheit der Anteile, Richtigkeit der Jahresabschlüsse, Steuern, wesentlichen Verträgen, Arbeitsverhältnissen, Schutzrechten und Rechtsstreitigkeiten. Die Haftung wird betragsmäßig und zeitlich begrenzt.
(4) Der Inhaber wird sich einem Wettbewerbs- und Abwerbeverbot von [z. B. 2] Jahren ab Vollzug im Geschäftsbereich der Gesellschaft unterwerfen.
(5) Die Transaktion steht unter dem Vorbehalt der Finanzierung durch den Interessenten, einer für ihn zufriedenstellenden Due Diligence und ggf. erforderlicher Zustimmungen Dritter (insbesondere [Bank / Vermieter / Schlüsselkunden]).

§ 3 Due Diligence
(1) Der Inhaber gewährt dem Interessenten und seinen Beratern ab dem [Datum] für [z. B. 6] Wochen Zugang zu einem Datenraum mit den für eine rechtliche, steuerliche, finanzielle und [technische / kommerzielle] Prüfung erforderlichen Unterlagen. Die Prüfung erfolgt auf Grundlage einer Anforderungsliste des Interessenten.
(2) Fragen werden über [Ansprechpartner] gestellt und innerhalb von [z. B. 5] Werktagen beantwortet. Gespräche mit Mitarbeitern, Kunden und Lieferanten der Gesellschaft führt der Interessent nur nach vorheriger Abstimmung mit dem Inhaber.
(3) Der Inhaber sichert zu, die Unterlagen nach bestem Wissen vollständig und richtig zur Verfügung zu stellen. Eine Haftung für die Richtigkeit wird erst im Kaufvertrag begründet.

§ 4 Exklusivität
(1) Der Inhaber verpflichtet sich, ab Unterzeichnung bis zum [Datum] (Exklusivitätsfrist) weder selbst noch über Dritte mit anderen Interessenten über einen Verkauf oder eine Beteiligung an der Gesellschaft oder ihrem Geschäftsbetrieb zu verhandeln, dazu Informationen offenzulegen oder Angebote einzuholen oder anzunehmen. Laufende Gespräche mit Dritten werden unverzüglich beendet.
(2) Die Exklusivitätsfrist verlängert sich nur durch schriftliche Vereinbarung. Sie endet vorzeitig, wenn der Interessent schriftlich erklärt, die Verhandlungen nicht fortzusetzen.
(3) [Optional:] Verstößt der Inhaber gegen die Exklusivität, erstattet er dem Interessenten die nachgewiesenen externen Kosten der Due Diligence bis zu [Betrag] EUR.

§ 5 Vertraulichkeit und Kommunikation
(1) Die Parteien behandeln den Inhalt dieser Absichtserklärung, die Tatsache der Verhandlungen und alle im Zuge der Transaktion erhaltenen Informationen vertraulich. [Die zwischen den Parteien am [Datum] geschlossene Geheimhaltungsvereinbarung gilt ergänzend.] Die Weitergabe an Berater, Finanzierungspartner und Organe ist zulässig, soweit diese zur Vertraulichkeit verpflichtet sind.
(2) Öffentliche Mitteilungen und Mitteilungen an Mitarbeiter, Kunden und Lieferanten erfolgen nur nach gemeinsamer Abstimmung. Ist eine Partei gesetzlich zur Offenlegung verpflichtet, informiert sie die andere Partei vorab.
(3) Scheitern die Verhandlungen, gibt jede Partei die erhaltenen Unterlagen zurück oder löscht sie und bestätigt dies auf Verlangen.

§ 6 Kosten
Jede Partei trägt ihre eigenen Kosten und die Kosten ihrer Berater im Zusammenhang mit dieser Absichtserklärung, der Due Diligence und der Verhandlung der Transaktion selbst. Die Kosten der notariellen Beurkundung des Kaufvertrags trägt [der Interessent / die Parteien je zur Hälfte]. [Optional: Kommt der Kaufvertrag aus Gründen, die eine Partei allein zu vertreten hat, nicht zustande, erstattet diese Partei der anderen die externen Beraterkosten bis zu [Betrag] EUR.]

§ 7 Zeitplan
Die Parteien streben folgenden Ablauf an:
   a) Beginn der Due Diligence: [Datum]
   b) Abschluss der Due Diligence: [Datum]
   c) Vorlage des ersten Entwurfs des Kauf- bzw. Beteiligungsvertrags durch [den Interessenten / den Inhaber]: [Datum]
   d) Notarielle Beurkundung (Signing): [Datum]
   e) Vollzug (Closing): [Datum]
Verzögerungen begründen keine Ansprüche; die Parteien passen den Zeitplan einvernehmlich an.

§ 8 Unverbindlichkeit und verbindliche Regelungen
(1) Diese Absichtserklärung dokumentiert den Stand der Verhandlungen. Sie begründet keine Verpflichtung zum Abschluss des Kauf- oder Beteiligungsvertrags und keine Verpflichtung zur Übertragung von Geschäftsanteilen oder Vermögensgegenständen. Die Parteien sind sich bewusst, dass ein Vertrag über GmbH-Geschäftsanteile der notariellen Beurkundung bedarf (§ 15 Abs. 4 GmbHG).
(2) Rechtlich verbindlich sind ausschließlich die §§ 4 (Exklusivität), 5 (Vertraulichkeit), 6 (Kosten), 8 (Unverbindlichkeit) und 9 (Schlussbestimmungen). Alle übrigen Regelungen, insbesondere die §§ 1, 2, 3 und 7, sind unverbindliche Absichtserklärungen, die im endgültigen Vertrag abweichend geregelt werden können.
(3) Jede Partei kann die Verhandlungen jederzeit ohne Angabe von Gründen beenden. Ansprüche wegen des Abbruchs der Verhandlungen, gleich aus welchem Rechtsgrund, sind ausgeschlossen; unberührt bleiben Ansprüche aus Verstößen gegen die verbindlichen Regelungen dieser Absichtserklärung sowie aus vorsätzlichem Handeln.
(4) Ansprüche und Rechte entstehen ausschließlich aus dem endgültigen, notariell beurkundeten Vertrag.

§ 9 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieser Absichtserklärung bedürfen der Schriftform; das gilt auch für die Aufhebung dieser Klausel.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt die Absichtserklärung im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt.
(3) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, [Ort].
(4) Diese Absichtserklärung gilt bis zum [Datum]; sie verliert ihre Wirkung mit Abschluss des endgültigen Vertrags oder mit schriftlicher Beendigung der Verhandlungen durch eine Partei. Die §§ 5 und 6 gelten darüber hinaus fort.

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Interessenten


______________________________
[Vorname Nachname], Inhaber


[______________________________
[Vorname Nachname], für die Gesellschaft]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "term-sheet-beteiligung",
    titel: "Term Sheet für Business-Angel- und Seed-Beteiligung",
    kurz: "Eckpunktepapier für eine Finanzierungsrunde: Bewertung, Anteile, Liquidationspräferenz, Verwässerungsschutz, Vesting und Mitverkaufsrechte.",
    kategorie: "geheimhaltung",
    dateiname: "Term-Sheet-Beteiligung",
    wofuer: [
      "Ein Business Angel oder Seed-Investor will sich an deiner UG oder GmbH beteiligen und ihr wollt die Eckpunkte vor dem Notar festhalten",
      "Du willst wissen, welche Bedingungen in einer Finanzierungsrunde üblich sind, bevor du den Entwurf des Investors unterschreibst",
      "Mehrere Angels investieren in einer Runde und sollen zu gleichen Bedingungen einsteigen",
      "Als Checkliste für Anwalt und Notar, damit Beteiligungsvertrag und Gesellschaftervereinbarung schneller entstehen",
    ],
    enthaelt: [
      "§ 1 Parteien und Gesellschaft",
      "§ 2 Investment, Bewertung und Beteiligungsquote (pre-money, post-money, Kapitalerhöhung)",
      "§ 3 Zahlung, Tranchen und Verwendung der Mittel",
      "§ 4 Liquidationspräferenz",
      "§ 5 Verwässerungsschutz",
      "§ 6 Vesting der Gründeranteile (Good/Bad Leaver)",
      "§ 7 Informations- und Zustimmungsrechte",
      "§ 8 Drag-along, Tag-along, Vorerwerbsrecht",
      "§ 9 Mitarbeiterbeteiligung, Garantien, Wettbewerbsverbot",
      "§ 10 Exklusivität, Vertraulichkeit, Kosten",
      "§ 11 Unverbindlichkeit und nächste Schritte",
    ],
    hinweise: [
      "Die Beteiligungsquote ergibt sich aus Investment geteilt durch Post-money-Bewertung, nicht durch Pre-money. 200.000 EUR auf 1,8 Mio. EUR pre-money sind 10 %, nicht 11,1 %. Rechne die Kapitalerhöhung vor dem Notartermin nach.",
      "Eine einfache, nicht beteiligte Liquidationspräferenz (1x non-participating) ist marktüblich. Mehrfache oder beteiligte Präferenzen (2x, participating) können dazu führen, dass Gründer bei einem mittleren Exit fast nichts bekommen.",
      "Vesting trifft dich als Gründer: Wer vor Ablauf der Frist geht, verliert einen Teil seiner Anteile zum Nennwert. Achte auf eine faire Good-Leaver-Regel und darauf, dass bereits gehaltene Anteile nicht zu 100 % neu vesten.",
      "Das Term Sheet ersetzt nicht Beteiligungsvertrag, Gesellschaftervereinbarung und Satzungsänderung; die Kapitalerhöhung muss notariell beurkundet und ins Handelsregister eingetragen werden (§§ 53, 55 GmbHG).",
    ],
    faqs: [
      {
        q: "Was bedeuten pre-money und post-money?",
        a: "Pre-money ist der Wert des Unternehmens vor dem Investment, post-money der Wert danach, also pre-money plus Investitionssumme. Die Anteilsquote des Investors ist Investment durch Post-money. Investoren nennen oft die Pre-money-Bewertung; achte darauf, ob ein Mitarbeiterpool schon vor oder erst nach der Runde eingerechnet wird, denn das verändert deine Quote.",
      },
      {
        q: "Ist das Term Sheet rechtlich bindend?",
        a: "Im Kern nicht. Die Vorlage erklärt nur Exklusivität, Vertraulichkeit, Kosten und die Unverbindlichkeitsregel für verbindlich. Die eigentliche Beteiligung entsteht erst durch den notariell beurkundeten Beteiligungsvertrag und die Kapitalerhöhung. Trotzdem gilt: Was im Term Sheet steht, wird später kaum noch nachverhandelt.",
      },
      {
        q: "Was ist ein Verwässerungsschutz und welche Variante ist fair?",
        a: "Er schützt den Investor, wenn eine spätere Runde zu einer niedrigeren Bewertung stattfindet (Down Round). Bei der Full-Ratchet-Variante bekommt er so viele Anteile, als hätte er zum niedrigeren Preis investiert; das ist gründerfeindlich. Üblich und fairer ist die Weighted-Average-Methode, die das Volumen der neuen Runde berücksichtigt. Die Vorlage sieht diese vor.",
      },
      {
        q: "Wandeldarlehen oder direkte Beteiligung?",
        a: "Ein Wandeldarlehen ist schneller und billiger, weil zunächst kein Notar und keine Bewertung nötig sind; die Bewertung wird auf die nächste Runde verschoben. Die direkte Beteiligung über eine Kapitalerhöhung schafft sofort klare Verhältnisse und passt, wenn Bewertung und Investor feststehen. Das Term Sheet ist für die direkte Beteiligung gedacht.",
      },
    ],
    seo: {
      title: "Term Sheet Vorlage Beteiligung 2026 kostenlos | GründerX",
      description:
        "Term Sheet für Business-Angel- und Seed-Beteiligung als kostenlose Vorlage: Bewertung, Anteile, Liquidationspräferenz, Verwässerungsschutz, Vesting, Drag-along.",
    },
    stand: "2026-10",
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
(1) Dieses Term Sheet ist, mit Ausnahme von § 10 und § 11, rechtlich unverbindlich. Es begründet keine Verpflichtung zur Beteiligung oder zur Durchführung der Kapitalerhöhung. Rechte und Pflichten entstehen erst durch den notariell beurkundeten Beteiligungsvertrag, die Gesellschaftervereinbarung und die Satzungsänderung (§§ 53, 55 GmbHG).
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
  },
  {
    slug: "lizenzvertrag-software",
    titel: "Software-Lizenzvertrag (B2B, nicht-exklusiv)",
    kurz: "Lizenzvertrag für die Überlassung deiner Software an Geschäftskunden: Nutzungsumfang, Nutzerzahl, Laufzeit, Vergütung, Support, Gewährleistung und Audit.",
    kategorie: "geheimhaltung",
    dateiname: "Software-Lizenzvertrag-B2B",
    wofuer: [
      "Du verkaufst oder vermietest deine Software (Desktop, Server, On-Premise, Plugin) an Unternehmen",
      "Ein Kunde will eine Lizenz für eine feste Zahl von Nutzern oder Installationen statt einer Cloud-Lösung",
      "Du brauchst eine saubere Trennung von Lizenz, Updates und Support mit eigener Vergütung",
      "Als Grundlage für Einzelverträge, die zusammen mit deinen AGB oder einem Angebot abgeschlossen werden",
    ],
    enthaelt: [
      "§ 1 Vertragsgegenstand und Lieferung",
      "§ 2 Lizenzumfang (nicht-exklusiv, Nutzer, Installationen, Standorte)",
      "§ 3 Beschränkungen und gesetzliche Mindestrechte (§§ 69d, 69e UrhG)",
      "§ 4 Laufzeit und Kündigung (Dauerlizenz oder Laufzeitlizenz)",
      "§ 5 Vergütung und Zahlung",
      "§ 6 Updates, Upgrades und Support",
      "§ 7 Gewährleistung",
      "§ 8 Haftung",
      "§ 9 Audit und Lizenznachweis",
      "§ 10 Geheimhaltung, Datenschutz, Schutzrechte Dritter",
      "§ 11 Schlussbestimmungen",
    ],
    hinweise: [
      "Dauerlizenz gegen Einmalzahlung wird rechtlich wie ein Kauf behandelt (§§ 433 ff. BGB): Der Kunde darf die Lizenz weiterverkaufen (Erschöpfung, § 69c Nr. 3 UrhG), und Mängelansprüche verjähren in zwei Jahren. Ein Weiterverkaufsverbot ist in diesem Fall unwirksam.",
      "Laufzeitlizenz gegen laufende Gebühr ist Miete (§§ 535 ff. BGB). Dort haftet der Vermieter ohne Verschulden für Mängel, die bei Übergabe schon vorlagen (§ 536a Abs. 1 BGB); die Vorlage schließt diese Haftung aus, was im B2B-Verhältnis zulässig ist.",
      "Die gesetzlichen Mindestrechte des Nutzers (Sicherungskopie und Beobachten des Programmablaufs nach § 69d Abs. 2 und 3 UrhG, Dekompilierung zur Interoperabilität nach § 69e UrhG) kannst du nicht vertraglich ausschließen (§ 69g Abs. 2 UrhG). Die Fehlerberichtigung nach § 69d Abs. 1 UrhG darfst du nur einschränken, nicht im Kern ausschließen.",
      "Audit-Klauseln sind üblich, müssen aber verhältnismäßig bleiben: Ankündigungsfrist, Geschäftszeiten, Vertraulichkeit, höchstens einmal im Jahr. Sonst kippt die Klausel in AGB.",
      "Wenn deine Software personenbezogene Daten des Kunden verarbeitet und du Zugriff darauf hast (Support, Hosting), brauchst du zusätzlich einen Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen exklusiver und nicht-exklusiver Lizenz?",
        a: "Bei der nicht-exklusiven (einfachen) Lizenz darfst du dieselbe Software beliebig vielen Kunden lizenzieren; das ist der Normalfall für Standardsoftware. Eine exklusive Lizenz schließt dich selbst und alle anderen von der Nutzung aus und ist eher bei Auftragsentwicklung oder Vertriebsrechten für ein Gebiet sinnvoll.",
      },
      {
        q: "Soll ich eine Dauerlizenz oder eine Laufzeitlizenz anbieten?",
        a: "Die Laufzeitlizenz bringt planbare Einnahmen und bindet Updates und Support an die laufende Gebühr; der Kunde darf sie nicht weiterverkaufen. Die Dauerlizenz bringt einmalig mehr Geld, aber der Kunde kann sie weiterveräußern und du musst Wartung separat verkaufen. Die Vorlage enthält beide Varianten.",
      },
      {
        q: "Wie werden Nutzer und Installationen gezählt?",
        a: "Üblich sind benannte Nutzer (Named User), gleichzeitige Nutzer (Concurrent User), Installationen pro Gerät oder Server bzw. CPU-Kerne. Die Vorlage arbeitet mit benannten Nutzern und Installationen; lege fest, ob ein Wechsel eines benannten Nutzers erlaubt ist (z. B. höchstens einmal im Quartal).",
      },
      {
        q: "Muss ich dem Kunden den Quellcode geben?",
        a: "Nein. Der Lizenzvertrag räumt nur Rechte am Objektcode ein; der Quellcode bleibt dein Geschäftsgeheimnis. Verlangt ein großer Kunde Sicherheit für den Fall deiner Insolvenz, ist ein Escrow-Vertrag mit Hinterlegung bei einem Treuhänder der übliche Weg, nicht die Herausgabe.",
      },
    ],
    seo: {
      title: "Software-Lizenzvertrag Vorlage B2B 2026 kostenlos | GründerX",
      description:
        "Software-Lizenzvertrag (B2B, nicht-exklusiv) als kostenlose Vorlage: Lizenzumfang, Nutzer, Laufzeit, Vergütung, Updates, Support, Gewährleistung, Audit.",
    },
    stand: "2026-10",
    text: `Software-Lizenzvertrag

zwischen

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Lizenzgeber“ –

und

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Lizenznehmer“ –

– gemeinsam „die Parteien“ –

§ 1 Vertragsgegenstand und Lieferung
(1) Gegenstand dieses Vertrags ist die Überlassung der Software „[Produktname]“ in der Version [Version] (nachfolgend „Software“) einschließlich der Benutzerdokumentation zur Nutzung durch den Lizenznehmer. Die Funktionen der Software ergeben sich abschließend aus der Leistungsbeschreibung in Anlage 1.
(2) Die Software wird im Objektcode [als Download über [URL] / auf Datenträger / durch Installation auf Systemen des Lizenznehmers] bereitgestellt. Der Quellcode ist nicht Vertragsgegenstand.
(3) Die Lieferung erfolgt bis zum [Datum]. Installation, Konfiguration, Schulung und Anpassungen sind nicht geschuldet, soweit sie nicht in Anlage 1 vereinbart sind; sie werden nach Aufwand zu [Betrag] EUR je Stunde zuzüglich Umsatzsteuer vergütet.
(4) Systemvoraussetzungen (Betriebssystem, Hardware, Datenbank, Drittsoftware) sind in Anlage 1 beschrieben. Der Lizenznehmer stellt diese Umgebung auf eigene Kosten bereit.

§ 2 Lizenzumfang
(1) Der Lizenzgeber räumt dem Lizenznehmer das nicht ausschließliche, nicht übertragbare, nicht unterlizenzierbare Recht ein, die Software im vereinbarten Umfang für eigene geschäftliche Zwecke zu nutzen.
(2) Der Nutzungsumfang beträgt: [Anzahl] benannte Nutzer (Named User) und [Anzahl] Installationen auf [Arbeitsplätzen / Servern] an den Standorten [Orte]. Ein benannter Nutzer darf höchstens [einmal je Quartal] durch einen anderen ersetzt werden. Eine Erweiterung ist jederzeit gegen die in Anlage 2 genannten Gebühren möglich.
(3) Die Nutzung ist räumlich auf [Deutschland / die EU / weltweit] beschränkt. Die Nutzung durch verbundene Unternehmen im Sinne des § 15 AktG ist [nicht gestattet / gestattet, soweit sie in Anlage 2 aufgeführt sind].
(4) Die Lizenz umfasst das Recht, die Software zu installieren, in den Arbeitsspeicher zu laden, ablaufen zu lassen und anzuzeigen, soweit dies zur bestimmungsgemäßen Nutzung erforderlich ist, sowie eine Sicherungskopie anzufertigen, die als solche zu kennzeichnen ist.
(5) Eine Nutzung der Software zur Erbringung von Dienstleistungen für Dritte (Rechenzentrumsbetrieb, Service-Büro, Software as a Service) ist nur mit gesonderter schriftlicher Vereinbarung zulässig.

§ 3 Beschränkungen und gesetzliche Mindestrechte
(1) Der Lizenznehmer darf die Software nicht vermieten, verleihen, unterlizenzieren, öffentlich zugänglich machen oder Dritten in sonstiger Weise überlassen. [Nur bei Laufzeitlizenz nach § 4 Variante B: Eine Weiterveräußerung ist ausgeschlossen.] [Nur bei Dauerlizenz nach § 4 Variante A: Eine Weiterveräußerung der Software ist zulässig, wenn der Lizenznehmer die Nutzung vollständig einstellt, alle Kopien löscht, der Erwerber diesen Vertragsbedingungen zustimmt und der Lizenzgeber über den Erwerber informiert wird.]
(2) Der Lizenznehmer darf die Software nicht bearbeiten, übersetzen, dekompilieren oder zurückentwickeln und keine Urheberrechtsvermerke, Seriennummern oder Lizenzschlüssel entfernen oder verändern.
(3) Die gesetzlichen Mindestrechte des Lizenznehmers aus §§ 69d und 69e UrhG (insbesondere Fehlerberichtigung im Rahmen der bestimmungsgemäßen Nutzung, Sicherungskopie, Beobachtung des Programmablaufs und Dekompilierung zur Herstellung der Interoperabilität) bleiben unberührt. Vor einer Dekompilierung wird der Lizenznehmer die erforderlichen Schnittstelleninformationen beim Lizenzgeber anfordern, der sie innerhalb von [z. B. 4] Wochen zur Verfügung stellt.

§ 4 Laufzeit und Kündigung
[Variante A – Dauerlizenz:]
(1) Das Nutzungsrecht wird zeitlich unbefristet eingeräumt. Es wird mit vollständiger Zahlung der Lizenzgebühr nach § 5 wirksam.
(2) Der Lizenzgeber kann das Nutzungsrecht aus wichtigem Grund außerordentlich kündigen, insbesondere wenn der Lizenznehmer den Lizenzumfang trotz Abmahnung überschreitet oder gegen § 3 verstößt.
[Variante B – Laufzeitlizenz:]
(1) Der Vertrag beginnt am [Datum] und läuft [z. B. 12] Monate. Er verlängert sich jeweils um [z. B. 12] Monate, wenn er nicht mit einer Frist von [z. B. 3] Monaten zum Ende der jeweiligen Laufzeit schriftlich gekündigt wird.
(2) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Ein wichtiger Grund liegt für den Lizenzgeber insbesondere vor, wenn der Lizenznehmer mit zwei Monatsgebühren in Verzug ist oder gegen §§ 2, 3 verstößt.
(3) Nach Ende des Nutzungsrechts stellt der Lizenznehmer die Nutzung ein, deinstalliert die Software, löscht alle Kopien einschließlich Sicherungskopien und bestätigt dies auf Verlangen schriftlich. Der Lizenzgeber stellt auf Wunsch für [z. B. 30] Tage einen Export der Daten des Lizenznehmers in einem gängigen Format bereit.

§ 5 Vergütung und Zahlung
(1) [Variante A:] Die einmalige Lizenzgebühr beträgt [Betrag] EUR zuzüglich gesetzlicher Umsatzsteuer, fällig innerhalb von 14 Tagen nach Lieferung und Rechnungsstellung. [Variante B:] Die Lizenzgebühr beträgt [Betrag] EUR je Monat zuzüglich gesetzlicher Umsatzsteuer, zahlbar [monatlich / jährlich] im Voraus bis zum [3. Werktag] des Zeitraums.
(2) Updates und Support nach § 6 werden [mit [Betrag] EUR je Jahr (Wartungsgebühr) / in der Laufzeitgebühr] vergütet. Zusätzliche Nutzer und Installationen werden nach Anlage 2 abgerechnet.
(3) Der Lizenzgeber darf die laufenden Gebühren erstmals nach [12] Monaten mit einer Ankündigungsfrist von [3] Monaten um höchstens [z. B. 5] % jährlich anpassen. Der Lizenznehmer kann in diesem Fall zum Wirksamwerden der Erhöhung kündigen.
(4) Bei Zahlungsverzug gelten die gesetzlichen Verzugszinsen (§ 288 Abs. 2 BGB). Der Lizenzgeber ist bei Verzug mit mehr als [30] Tagen berechtigt, die Nutzung nach vorheriger Ankündigung bis zur Zahlung zu sperren.

§ 6 Updates, Upgrades und Support
(1) Während der Laufzeit der Wartung stellt der Lizenzgeber Updates (Fehlerbehebungen, Sicherheitskorrekturen, kleinere Verbesserungen) ohne gesonderte Vergütung bereit. Upgrades mit wesentlich erweitertem Funktionsumfang (neue Hauptversion) sind [enthalten / gegen Aufpreis erhältlich].
(2) Der Support umfasst die Annahme und Bearbeitung von Störungsmeldungen per [E-Mail / Ticketsystem / Telefon] an Werktagen von [9] bis [17] Uhr. Reaktionszeiten: bei Störungen, die die Nutzung verhindern, [4] Stunden; bei erheblichen Beeinträchtigungen [1] Werktag; bei sonstigen Störungen [3] Werktage. Eine Behebungszeit wird nicht garantiert; der Lizenzgeber bemüht sich um eine Lösung oder Umgehung.
(3) Der Lizenznehmer spielt Updates innerhalb von [z. B. 3] Monaten nach Bereitstellung ein. Für ältere Versionen wird Support nur für [die jeweils letzte Vorversion / 12 Monate nach Erscheinen der Folgeversion] geleistet.
(4) Nicht vom Support umfasst sind Störungen durch unsachgemäße Nutzung, Eingriffe des Lizenznehmers, Drittsoftware oder nicht freigegebene Systemumgebungen; deren Bearbeitung wird nach Aufwand vergütet.

§ 7 Gewährleistung
(1) Der Lizenzgeber gewährleistet, dass die Software bei vertragsgemäßer Nutzung die in Anlage 1 beschriebenen Funktionen im Wesentlichen erfüllt. Der Lizenznehmer erkennt an, dass Software nach dem Stand der Technik nicht völlig fehlerfrei erstellt werden kann; unerhebliche Abweichungen begründen keine Mängelansprüche.
(2) Der Lizenznehmer untersucht die Software unverzüglich nach Lieferung und zeigt offensichtliche Mängel innerhalb von [z. B. 10] Werktagen, verdeckte Mängel unverzüglich nach Entdeckung in Textform unter nachvollziehbarer Beschreibung an (§ 377 HGB).
(3) Der Lizenzgeber leistet bei Mängeln zunächst Nacherfüllung nach seiner Wahl durch Beseitigung des Mangels, Bereitstellung einer Umgehungslösung oder Lieferung einer mangelfreien Version. Schlägt die Nacherfüllung nach zwei Versuchen innerhalb angemessener Frist fehl, kann der Lizenznehmer die Vergütung mindern oder vom Vertrag zurücktreten bzw. ihn kündigen.
(4) [Variante A:] Mängelansprüche verjähren in [12] Monaten ab Lieferung; dies gilt nicht bei Arglist, Vorsatz, grober Fahrlässigkeit und bei Schäden an Leben, Körper und Gesundheit. [Variante B:] Die verschuldensunabhängige Haftung des Lizenzgebers für bei Vertragsschluss vorhandene Mängel (§ 536a Abs. 1 BGB) ist ausgeschlossen.
(5) Keine Gewährleistung besteht für Mängel, die auf Änderungen durch den Lizenznehmer, nicht freigegebene Systemumgebungen oder Nichtinstallation bereitgestellter Updates zurückgehen.

§ 8 Haftung
(1) Der Lizenzgeber haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit, bei Schäden aus der Verletzung von Leben, Körper oder Gesundheit, nach dem Produkthaftungsgesetz und im Umfang einer übernommenen Garantie.
(2) Bei leicht fahrlässiger Verletzung einer wesentlichen Vertragspflicht (Pflicht, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags erst ermöglicht und auf deren Einhaltung der Lizenznehmer regelmäßig vertrauen darf) ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt, höchstens jedoch auf [Betrag / die in den letzten 12 Monaten gezahlte Vergütung]. Im Übrigen ist die Haftung bei leichter Fahrlässigkeit ausgeschlossen.
(3) Für den Verlust von Daten haftet der Lizenzgeber nur in dem Umfang, der auch bei ordnungsgemäßer, regelmäßiger Datensicherung durch den Lizenznehmer eingetreten wäre.
(4) Die Haftungsbeschränkungen gelten auch zugunsten der Mitarbeiter und Erfüllungsgehilfen des Lizenzgebers.

§ 9 Audit und Lizenznachweis
(1) Der Lizenznehmer führt Aufzeichnungen über die Zahl der Nutzer und Installationen und übermittelt dem Lizenzgeber auf Anfrage, höchstens einmal jährlich, eine schriftliche Bestätigung.
(2) Bei begründetem Verdacht einer Überschreitung kann der Lizenzgeber nach Ankündigung von mindestens [z. B. 10] Werktagen während der Geschäftszeiten durch einen zur Verschwiegenheit verpflichteten Dritten eine Überprüfung durchführen lassen. Die Überprüfung beschränkt sich auf die Lizenznutzung und beeinträchtigt den Geschäftsbetrieb so wenig wie möglich.
(3) Ergibt die Überprüfung eine Überschreitung um mehr als [5] %, zahlt der Lizenznehmer die Gebühren für den Mehrumfang rückwirkend [zum Listenpreis zuzüglich [z. B. 20] %] und trägt die Kosten der Überprüfung.

§ 10 Geheimhaltung, Datenschutz, Schutzrechte Dritter
(1) Die Parteien behandeln alle im Zusammenhang mit diesem Vertrag erlangten Geschäftsgeheimnisse, insbesondere die Software, Lizenzschlüssel, Preise und technische Informationen, vertraulich; dies gilt für [3] Jahre nach Vertragsende fort.
(2) Verarbeitet der Lizenzgeber im Rahmen von Support oder Hosting personenbezogene Daten im Auftrag des Lizenznehmers, schließen die Parteien einen Auftragsverarbeitungsvertrag nach Art. 28 DSGVO (Anlage 3).
(3) Der Lizenzgeber stellt den Lizenznehmer von Ansprüchen Dritter frei, die darauf gestützt werden, dass die vertragsgemäße Nutzung der Software Urheber- oder sonstige Schutzrechte in Deutschland verletzt, sofern der Lizenznehmer den Lizenzgeber unverzüglich informiert, ihm die Verteidigung überlässt und ihn unterstützt. Der Lizenzgeber kann in diesem Fall die Software ändern oder austauschen oder ein Nutzungsrecht beschaffen; ist dies nicht mit angemessenem Aufwand möglich, kann er den Vertrag kündigen und die Vergütung anteilig erstatten.
(4) Die Software enthält die in Anlage 4 aufgeführten Open-Source-Komponenten, für die die jeweils genannten Lizenzbedingungen gelten.

§ 11 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; das gilt auch für die Aufhebung dieser Klausel. Allgemeine Geschäftsbedingungen des Lizenznehmers finden keine Anwendung.
(2) Der Lizenznehmer darf Rechte aus diesem Vertrag nur mit schriftlicher Zustimmung des Lizenzgebers übertragen. Aufrechnen darf er nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen.
(3) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(4) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Ausschließlicher Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort].
(5) Anlagen: Anlage 1 Leistungsbeschreibung und Systemvoraussetzungen, Anlage 2 Preise für Erweiterungen, Anlage 3 Auftragsverarbeitungsvertrag (falls einschlägig), Anlage 4 Open-Source-Komponenten.

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Lizenzgeber


______________________________
[Vorname Nachname], für den Lizenznehmer

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "nutzungsrechte-uebertragung",
    titel: "Vertrag über die Einräumung von Nutzungsrechten (Design, Foto, Text, Logo)",
    kurz: "Rechteeinräumung nach § 31 UrhG an Logo, Website-Design, Fotos oder Texten, damit du das Werk wirklich uneingeschränkt nutzen darfst.",
    kategorie: "geheimhaltung",
    dateiname: "Nutzungsrechte-Einraeumung-Urheberrecht",
    wofuer: [
      "Ein Designer hat dein Logo, Corporate Design oder Verpackungsdesign erstellt und du willst alle Rechte daran sichern",
      "Ein Fotograf, Texter oder Illustrator liefert Werke für Website, Shop, Social Media oder Print",
      "Du willst ein Logo oder Design später als Marke anmelden und brauchst dafür das ausschließliche Nutzungsrecht",
      "Als Ergänzung zu einem Freelancer- oder Agenturvertrag, der die Rechte bisher nur vage regelt",
    ],
    enthaelt: [
      "§ 1 Werk und Übergabe (inklusive offener Dateien)",
      "§ 2 Einräumung der Nutzungsrechte (ausschließlich oder einfach; räumlich, zeitlich, inhaltlich)",
      "§ 3 Bearbeitung, Weiterübertragung, unbekannte Nutzungsarten",
      "§ 4 Urheberpersönlichkeitsrechte und Namensnennung",
      "§ 5 Vergütung",
      "§ 6 Rechte Dritter und Freistellung",
      "§ 7 Eigenwerbung des Urhebers",
      "§ 8 Rückruf und Beendigung",
      "§ 9 Schlussbestimmungen",
    ],
    hinweise: [
      "Das Urheberrecht selbst ist nicht übertragbar (§ 29 Abs. 1 UrhG). Du erwirbst nie das Urheberrecht am Logo, sondern Nutzungsrechte. Entscheidend ist, dass diese ausschließlich, zeitlich und räumlich unbeschränkt und für alle Nutzungsarten eingeräumt werden.",
      "Ohne ausdrückliche Regelung gilt die Zweckübertragungsregel (§ 31 Abs. 5 UrhG): Du bekommst nur die Rechte, die der Vertragszweck zwingend erfordert. Wer ein Logo für die Website bestellt, hat damit nicht automatisch das Recht, es auf Verpackungen zu drucken oder als Marke anzumelden.",
      "Der Urheber hat Anspruch auf angemessene Vergütung (§ 32 UrhG) und bei auffälligem Missverhältnis später auf weitere Beteiligung (§ 32a UrhG). Eine sehr niedrige Pauschale für ein Logo, das zur Weltmarke wird, kann nachträglich angepasst werden.",
      "Bei pauschaler Vergütung und ausschließlicher Rechteeinräumung darf der Urheber das Werk nach zehn Jahren grundsätzlich anderweitig verwerten (§ 40a UrhG). Für Werke, die als Marke oder Design bestimmt sind, gilt das nicht; die Vorlage hält diese Zweckbestimmung deshalb ausdrücklich fest.",
      "Stockfotos, Schriften und KI-generierte Bestandteile im Werk kann dir der Designer nur so weit lizenzieren, wie er selbst Rechte hat. Lass dir Fonts und Fremdmaterial auflisten.",
    ],
    faqs: [
      {
        q: "Kann ich das Urheberrecht am Logo kaufen?",
        a: "Nein. Nach deutschem Recht bleibt der Urheber immer Urheber; übertragbar sind nur Nutzungsrechte. Mit einem ausschließlichen, unbefristeten, räumlich und inhaltlich unbeschränkten Nutzungsrecht inklusive Bearbeitungs- und Weiterübertragungsrecht stehst du wirtschaftlich aber so, als gehöre dir das Werk. Genau das räumt die Vorlage ein.",
      },
      {
        q: "Was ist der Unterschied zwischen einfachem und ausschließlichem Nutzungsrecht?",
        a: "Beim einfachen Nutzungsrecht darf der Urheber dasselbe Werk auch anderen lizenzieren und selbst nutzen. Beim ausschließlichen Nutzungsrecht bist du allein berechtigt, und sogar der Urheber darf das Werk nicht mehr verwerten. Für Logos, Marken und Corporate Design brauchst du zwingend das ausschließliche Recht.",
      },
      {
        q: "Muss ich den Designer oder Fotografen nennen?",
        a: "Der Urheber hat ein Recht auf Namensnennung (§ 13 UrhG), auf das er vertraglich verzichten oder dessen Ausübung er beschränken kann. Bei Logos und Corporate Design ist ein Verzicht üblich, bei redaktionellen Fotos und Texten dagegen eine Nennung. Die Vorlage bietet beide Varianten.",
      },
      {
        q: "Gehören mir auch die offenen Dateien (Illustrator, Photoshop, RAW)?",
        a: "Nur, wenn es vereinbart ist. Viele Designer liefern standardmäßig nur Export-Dateien. Die Vorlage verpflichtet zur Übergabe der offenen Quelldateien samt verwendeter Schriften, soweit deren Lizenz das erlaubt, damit du das Werk später ohne den Urheber bearbeiten lassen kannst.",
      },
    ],
    seo: {
      title: "Nutzungsrechte Vertrag Vorlage 2026 (Design, Logo) | GründerX",
      description:
        "Vertrag über Nutzungsrechte nach § 31 UrhG als kostenlose Vorlage: Logo, Design, Foto, Text; ausschließlich, unbefristet, Bearbeitung, Vergütung, Namensnennung.",
    },
    stand: "2026-10",
    text: `Vertrag über die Einräumung von Nutzungsrechten

zwischen

[Vorname Nachname / Firma], [Straße, PLZ Ort]
– nachfolgend „Urheber“ –

und

[Firma / Vorname Nachname], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Auftraggeber“ –

– gemeinsam „die Parteien“ –

Präambel
Der Urheber hat für den Auftraggeber [auf Grundlage des Auftrags vom [Datum]] das in § 1 beschriebene Werk geschaffen bzw. wird es schaffen. Die Parteien regeln mit diesem Vertrag abschließend, welche Rechte der Auftraggeber an dem Werk erhält. Das Urheberrecht als solches verbleibt beim Urheber (§ 29 Abs. 1 UrhG).

§ 1 Werk und Übergabe
(1) Gegenstand dieses Vertrags ist folgendes Werk bzw. folgende Werke (nachfolgend „Werk“): [genaue Beschreibung, z. B. „Wort-Bild-Marke (Logo) ‚[Name]‘ in den Varianten Farbe, Schwarz-Weiß und Negativ“ / „Corporate Design bestehend aus Logo, Farbwelt, Typografie und Geschäftsausstattung gemäß Anlage 1“ / „[Anzahl] Produktfotografien gemäß Dateiliste in Anlage 1“ / „Website-Texte für die Seiten … gemäß Anlage 1“].
(2) Der Urheber übergibt das Werk bis zum [Datum] in folgenden Formaten: [z. B. SVG, PDF, PNG in 300 dpi sowie offene Quelldateien (Adobe Illustrator .ai / .indd / RAW-Dateien)]. Mit übergeben werden die verwendeten Schriften, soweit deren Lizenz die Weitergabe erlaubt, andernfalls eine Liste der Schriften mit Bezugsquelle.
(3) Der Urheber versichert, dass das Werk von ihm persönlich geschaffen wurde [bzw. dass die in Anlage 2 bezeichneten Bestandteile (Stockmaterial, Schriften, KI-generierte Elemente) mit den dort genannten Lizenzen rechtmäßig einbezogen wurden].

§ 2 Einräumung der Nutzungsrechte
(1) Der Urheber räumt dem Auftraggeber mit vollständiger Zahlung der Vergütung nach § 5 das [ausschließliche / einfache] Nutzungsrecht an dem Werk ein. Das Nutzungsrecht ist
   a) räumlich [unbeschränkt (weltweit) / beschränkt auf [Gebiet]],
   b) zeitlich [unbeschränkt / befristet bis zum [Datum]] und
   c) inhaltlich [unbeschränkt für alle bekannten Nutzungsarten / beschränkt auf [Nutzungsarten, z. B. „Online-Nutzung auf der Website und in Social-Media-Kanälen des Auftraggebers“]].
(2) Das Nutzungsrecht umfasst insbesondere das Recht, das Werk zu vervielfältigen, zu verbreiten, auszustellen, öffentlich zugänglich zu machen, zu senden und in körperlicher und unkörperlicher Form zu nutzen, in allen Medien (Print, Online, Social Media, Werbung, Verpackung, Messen, Film und Video, Apps) und in beliebiger Auflage, sowie das Werk mit anderen Werken, Texten und Marken zu verbinden.
(3) [Nur bei Logo/Design:] Die Parteien sind sich darüber einig, dass das Werk dazu bestimmt ist, als Marke, Unternehmenskennzeichen und Design des Auftraggebers verwendet zu werden. Der Auftraggeber ist berechtigt, das Werk oder Teile davon im eigenen Namen als Marke, Design oder sonstiges Kennzeichen bei nationalen und internationalen Ämtern anzumelden und eintragen zu lassen. Der Urheber wird keine entgegenstehenden Anmeldungen vornehmen.
(4) [Bei ausschließlichem Recht:] Der Urheber darf das Werk selbst nicht mehr nutzen oder Dritten Nutzungsrechte daran einräumen; § 7 bleibt unberührt. [Bei einfachem Recht:] Der Urheber bleibt berechtigt, das Werk selbst zu nutzen und Dritten Nutzungsrechte einzuräumen.
(5) Die Zweckübertragungsregel des § 31 Abs. 5 UrhG wird durch die vorstehende ausdrückliche Regelung konkretisiert; im Zweifel gilt die Rechteeinräumung so weit, wie es dieser Vertrag ausdrücklich vorsieht.

§ 3 Bearbeitung, Weiterübertragung, unbekannte Nutzungsarten
(1) Der Auftraggeber darf das Werk bearbeiten, umgestalten, kürzen, übersetzen, in andere Formate und Farbräume übertragen, mit anderen Werken kombinieren und Weiterentwicklungen davon herstellen und in gleicher Weise nutzen (§§ 23, 39 UrhG). Entstellungen oder Beeinträchtigungen, die geeignet sind, berechtigte geistige oder persönliche Interessen des Urhebers zu gefährden (§ 14 UrhG), bleiben unzulässig.
(2) Der Auftraggeber darf die Nutzungsrechte ganz oder teilweise auf Dritte übertragen und Dritten einfache oder ausschließliche Nutzungsrechte einräumen (§§ 34, 35 UrhG), insbesondere an verbundene Unternehmen, Rechtsnachfolger, Agenturen, Druckereien, Lizenznehmer und Erwerber des Unternehmens. Der Urheber erteilt hierzu bereits jetzt seine Zustimmung.
(3) Die Rechteeinräumung erstreckt sich auch auf zum Zeitpunkt des Vertragsschlusses unbekannte Nutzungsarten (§ 31a UrhG). Der Urheber kann diese Einräumung widerrufen, solange der Auftraggeber nicht mit der Nutzung in der neuen Nutzungsart begonnen hat; der Anspruch auf gesonderte angemessene Vergütung (§ 32c UrhG) bleibt unberührt.

§ 4 Urheberpersönlichkeitsrechte und Namensnennung
(1) [Variante A – Verzicht:] Der Urheber verzichtet auf die Ausübung seines Rechts auf Namensnennung (§ 13 UrhG) bei allen Nutzungen des Werks. Der Auftraggeber ist nicht verpflichtet, den Urheber zu nennen, darf ihn aber nennen.
[Variante B – Nennung:] Der Auftraggeber nennt den Urheber bei Nutzungen des Werks in folgender Form: „[Foto / Design / Text]: [Name]“, soweit dies nach Art des Mediums üblich und technisch möglich ist (nicht bei Logos, Icons, Verpackungen und Anzeigen mit begrenztem Platz).
(2) Der Urheber ist mit der Veröffentlichung des Werks ohne Angabe seines Namens auch in bearbeiteter Form einverstanden, soweit die Bearbeitung nach § 3 Abs. 1 zulässig ist.

§ 5 Vergütung
(1) Für die Schaffung des Werks und die Einräumung der Nutzungsrechte zahlt der Auftraggeber eine Pauschalvergütung von [Betrag] EUR [zuzüglich gesetzlicher Umsatzsteuer / Umsatzsteuer wird nicht berechnet, da der Urheber Kleinunternehmer im Sinne des § 19 UStG ist]. [Alternative: zusätzlich eine Beteiligung von [z. B. 3] % am Nettoumsatz mit Produkten, auf denen das Werk abgebildet ist, abgerechnet jährlich bis zum [31.03.] für das Vorjahr.]
(2) Die Vergütung ist fällig innerhalb von 14 Tagen nach Übergabe des Werks und Rechnungsstellung. [Optional: Bei Auftragserteilung ist eine Anzahlung von [Betrag] EUR fällig.]
(3) Die Parteien sind sich einig, dass die Vergütung unter Berücksichtigung des Umfangs der eingeräumten Rechte angemessen im Sinne des § 32 UrhG ist. Der gesetzliche Anspruch des Urhebers auf weitere Beteiligung bei einem auffälligen Missverhältnis (§ 32a UrhG) bleibt unberührt.
(4) Für die Nutzung von Werken gilt in Deutschland die Künstlersozialabgabe; der Auftraggeber prüft seine Abgabepflicht gegenüber der Künstlersozialkasse selbst.

§ 6 Rechte Dritter und Freistellung
(1) Der Urheber versichert, dass er über die eingeräumten Rechte verfügen kann, das Werk keine Rechte Dritter verletzt und er keine entgegenstehenden Rechte an Dritte eingeräumt hat. Eine Recherche nach älteren Marken oder Designs Dritter ist nicht Gegenstand dieses Vertrags; sie obliegt dem Auftraggeber.
(2) Der Urheber stellt den Auftraggeber von Ansprüchen Dritter frei, die auf einer schuldhaften Verletzung der Zusicherungen in Absatz 1 oder in § 1 Abs. 3 beruhen, einschließlich der angemessenen Kosten der Rechtsverteidigung. Die Haftung des Urhebers ist bei leichter Fahrlässigkeit auf die Höhe der Vergütung nach § 5 beschränkt; dies gilt nicht für Schäden an Leben, Körper und Gesundheit.
(3) Sind abgebildete Personen, Gebäude, Kunstwerke oder Marken im Werk enthalten, teilt der Urheber dem Auftraggeber mit, ob und welche Einwilligungen (insbesondere der abgebildeten Personen nach § 22 KUG) vorliegen.

§ 7 Eigenwerbung des Urhebers
Der Urheber darf das Werk nach seiner erstmaligen Veröffentlichung durch den Auftraggeber als Referenz in seinem Portfolio, auf seiner Website und in Social-Media-Profilen zeigen und dabei den Auftraggeber als Kunden nennen. [Alternative: Eine Verwendung als Referenz bedarf der vorherigen Zustimmung des Auftraggebers in Textform.] Eine darüber hinausgehende Nutzung ist bei ausschließlicher Rechteeinräumung ausgeschlossen.

§ 8 Rückruf und Beendigung
(1) Dieser Vertrag kann nicht ordentlich gekündigt werden. Die eingeräumten Nutzungsrechte sind nicht an den Fortbestand eines Dienst-, Werk- oder Agenturvertrags zwischen den Parteien gebunden.
(2) Das gesetzliche Rückrufsrecht wegen Nichtausübung (§ 41 UrhG) kann der Urheber frühestens [zwei] Jahre nach Einräumung des Rechts ausüben; der Auftraggeber kann den Rückruf durch Aufnahme der Nutzung innerhalb einer Nachfrist von [sechs] Monaten abwenden.
(3) Zahlt der Auftraggeber die Vergütung nach § 5 trotz Mahnung und Nachfrist von [14] Tagen nicht, kann der Urheber vom Vertrag zurücktreten; die Nutzungsrechte fallen dann an ihn zurück.

§ 9 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; das gilt auch für die Aufhebung dieser Klausel. Für die Einräumung von Rechten an unbekannten Nutzungsarten gilt die Schriftform des § 31a Abs. 1 UrhG.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(3) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, [Ort].
(4) Anlagen: Anlage 1 Werkbeschreibung und Dateiliste, Anlage 2 Fremdbestandteile und Lizenzen.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Urheber


______________________________
[Vorname Nachname], für den Auftraggeber

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "markenlizenzvertrag",
    titel: "Markenlizenzvertrag",
    kurz: "Lizenz an deiner eingetragenen Marke nach § 30 MarkenG mit Gebiet, Warenverzeichnis, Qualitätsvorgaben, Umsatzlizenz und Kontrolle.",
    kategorie: "geheimhaltung",
    dateiname: "Markenlizenzvertrag",
    wofuer: [
      "Du lässt Produkte unter deiner Marke von einem Partner herstellen oder vertreiben (Merchandise, Franchise-light, Vertriebspartner)",
      "Ein Partner will deinen Markennamen für ein Gebiet oder eine Produktgruppe nutzen und dafür eine Umsatzbeteiligung zahlen",
      "Du nutzt selbst eine fremde Marke und willst die Bedingungen schriftlich absichern",
      "Zwei Gesellschaften derselben Gründer: Die Markeninhaber-Gesellschaft lizenziert an die operative Gesellschaft",
    ],
    enthaelt: [
      "§ 1 Marke und Lizenzgegenstand (Registernummer, Waren und Dienstleistungen)",
      "§ 2 Art und Umfang der Lizenz (Gebiet, Ausschließlichkeit, Unterlizenzen)",
      "§ 3 Qualitätsanforderungen und Markenrichtlinien",
      "§ 4 Kontrolle und Muster",
      "§ 5 Lizenzgebühr (Umsatzlizenz, Mindestlizenz), Abrechnung und Buchprüfung",
      "§ 6 Benutzung, Aufrechterhaltung und Verteidigung der Marke",
      "§ 7 Rechtsverletzungen Dritter",
      "§ 8 Haftung und Freistellung",
      "§ 9 Laufzeit, Kündigung und Abverkauf",
      "§ 10 Schlussbestimmungen",
    ],
    hinweise: [
      "Nach § 30 Abs. 2 MarkenG kann der Markeninhaber gegen den Lizenznehmer aus der Marke vorgehen, wenn dieser Dauer, Form, Waren, Gebiet oder Qualitätsvorgaben des Vertrags verletzt. Diese fünf Punkte müssen deshalb präzise im Vertrag stehen.",
      "Die Marke verfällt, wenn sie fünf Jahre lang nicht ernsthaft benutzt wird (§ 49 MarkenG). Die Benutzung durch den Lizenznehmer mit deiner Zustimmung zählt als deine Benutzung (§ 26 Abs. 2 MarkenG); halte deshalb Belege der Lizenznutzung vor.",
      "Ohne Qualitätskontrolle verwässert die Marke und du haftest unter Umständen für schlechte Produkte, die deinen Namen tragen. Die Vorlage sieht Freigabe von Mustern, Markenrichtlinien und ein Prüfrecht vor.",
      "Der Lizenznehmer darf gegen Verletzer nur mit deiner Zustimmung klagen (§ 30 Abs. 3 MarkenG). Regle, wer verfolgt, wer zahlt und wer den Erlös bekommt, sonst bleibt die Verletzung liegen.",
      "Exklusivlizenzen mit Gebiets- und Kundenbeschränkungen können kartellrechtliche Grenzen berühren. Bei Lizenzen an große Partner oder mit Preisbindung lass den Vertrag prüfen.",
    ],
    faqs: [
      {
        q: "Wie hoch ist eine übliche Lizenzgebühr für eine Marke?",
        a: "Je nach Branche und Bekanntheit zwischen 3 und 15 % des Nettoumsatzes mit den lizenzierten Produkten; bei Merchandise und Konsumgütern oft 8 bis 12 %. Üblich ist zusätzlich eine jährliche Mindestlizenz, damit der Lizenznehmer die Marke nicht nur blockiert. Die Vorlage kombiniert beides.",
      },
      {
        q: "Muss die Lizenz ins Markenregister eingetragen werden?",
        a: "Nein, der Vertrag wirkt auch ohne Eintragung. Beim DPMA und beim EUIPO kann die Lizenz auf Antrag eingetragen werden; das erleichtert dem Lizenznehmer den Nachweis gegenüber Dritten, Zoll und Plattformen. Die Vorlage sieht die Eintragung als Option vor.",
      },
      {
        q: "Was passiert mit der Lizenz, wenn ich die Marke verkaufe?",
        a: "Die Lizenz bleibt bestehen; ein Rechtsübergang der Marke berührt bestehende Lizenzen nicht (§ 30 Abs. 5 MarkenG). Der Erwerber tritt also in den Vertrag ein. Willst du beim Verkauf frei sein, vereinbare ein Sonderkündigungsrecht für diesen Fall.",
      },
      {
        q: "Darf der Lizenznehmer die Marke verändern oder mit seinem Namen kombinieren?",
        a: "Nur, soweit der Vertrag es erlaubt. Jede Abweichung von der eingetragenen Form kann die rechtserhaltende Benutzung gefährden und ist nach § 30 Abs. 2 MarkenG ein Vertragsverstoß. Die Vorlage erlaubt die Nutzung nur in der eingetragenen Form gemäß Markenrichtlinien.",
      },
    ],
    seo: {
      title: "Markenlizenzvertrag Vorlage 2026 kostenlos (Word, PDF) | GründerX",
      description:
        "Markenlizenzvertrag nach § 30 MarkenG als kostenlose Vorlage: Marke, Waren, Gebiet, Qualitätsvorgaben, Umsatzlizenz, Kontrolle, Rechtsverletzungen, Laufzeit.",
    },
    stand: "2026-10",
    text: `Markenlizenzvertrag

zwischen

[Firma / Vorname Nachname], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Lizenzgeber“ –

und

[Firma / Vorname Nachname], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Lizenznehmer“ –

– gemeinsam „die Parteien“ –

§ 1 Marke und Lizenzgegenstand
(1) Der Lizenzgeber ist Inhaber der [Wortmarke / Wort-Bild-Marke / Bildmarke] „[Marke]“, eingetragen beim [Deutschen Patent- und Markenamt unter der Registernummer [Nummer] / Amt der Europäischen Union für geistiges Eigentum (EUIPO) unter der Nummer [Nummer]], angemeldet am [Datum], für Waren und Dienstleistungen der Klassen [Klassen] (nachfolgend „Marke“). Eine Abbildung der Marke und das vollständige Waren- und Dienstleistungsverzeichnis sind in Anlage 1 enthalten.
(2) Die Lizenz wird erteilt für folgende Waren und Dienstleistungen (nachfolgend „Lizenzprodukte“): [genaue Beschreibung, z. B. „Textilien, nämlich T-Shirts, Hoodies und Caps“ / „Nahrungsergänzungsmittel“ / „Dienstleistungen eines Fitnessstudios“]. Für andere Waren und Dienstleistungen darf der Lizenznehmer die Marke nicht benutzen.
(3) Mitlizenziert sind [die in Anlage 2 dargestellten Gestaltungselemente (Logo-Varianten, Farbwelt, Schriftarten) / keine weiteren Kennzeichen oder Designs].

§ 2 Art und Umfang der Lizenz
(1) Der Lizenzgeber räumt dem Lizenznehmer eine [ausschließliche / nicht ausschließliche] Lizenz ein, die Marke für die Lizenzprodukte im Lizenzgebiet zu benutzen (§ 30 Abs. 1 MarkenG), insbesondere sie auf den Lizenzprodukten, ihrer Verpackung, in Werbung, auf Websites, in Social-Media-Kanälen und auf Geschäftspapieren anzubringen und die so gekennzeichneten Produkte anzubieten, in den Verkehr zu bringen und zu bewerben.
(2) Lizenzgebiet ist [Deutschland / Deutschland, Österreich und die Schweiz / die Europäische Union]. Vertriebskanäle: [stationärer Handel, eigener Online-Shop, Marktplätze (Amazon, eBay, Etsy)]. [Optional: Der Vertrieb über [Discounter / bestimmte Marktplätze] ist ausgeschlossen.]
(3) [Bei ausschließlicher Lizenz:] Der Lizenzgeber wird im Lizenzgebiet für die Lizenzprodukte keine weiteren Lizenzen erteilen und die Marke dafür nicht selbst benutzen. [Bei nicht ausschließlicher Lizenz:] Der Lizenzgeber bleibt berechtigt, die Marke selbst zu benutzen und weitere Lizenzen zu erteilen.
(4) Der Lizenznehmer darf Unterlizenzen nur mit vorheriger schriftlicher Zustimmung des Lizenzgebers erteilen. Beauftragte Hersteller und Logistikdienstleister dürfen die Marke ausschließlich zur Erfüllung von Aufträgen des Lizenznehmers verwenden; der Lizenznehmer verpflichtet sie entsprechend.
(5) Die Marke darf nur in der eingetragenen Form und gemäß den Markenrichtlinien (Anlage 2) benutzt werden. Veränderungen, Kombinationen mit anderen Kennzeichen oder die Aufnahme der Marke in die Firma, Domains oder Social-Media-Namen des Lizenznehmers bedürfen der schriftlichen Zustimmung des Lizenzgebers.
(6) [Optional:] Der Lizenznehmer ist berechtigt, die Lizenz auf seine Kosten in das Markenregister eintragen zu lassen; der Lizenzgeber wirkt an den Erklärungen mit.

§ 3 Qualitätsanforderungen und Markenrichtlinien
(1) Der Lizenznehmer stellt sicher, dass die Lizenzprodukte den in Anlage 3 vereinbarten Qualitätsanforderungen, allen gesetzlichen Vorschriften (insbesondere Produktsicherheit, Kennzeichnung, Verbraucherschutz) und dem Qualitätsniveau entsprechen, das der Verkehr mit der Marke verbindet.
(2) Werbung und Produktgestaltung erfolgen gemäß den Markenrichtlinien (Anlage 2). Der Lizenznehmer unterlässt jede Verwendung, die den Ruf der Marke beeinträchtigen kann, insbesondere in Verbindung mit irreführender Werbung, herabsetzenden Inhalten oder Produkten außerhalb der Lizenzprodukte.
(3) Der Lizenznehmer bringt auf den Lizenzprodukten und in der Werbung den Hinweis „[Marke] ist eine eingetragene Marke der [Lizenzgeber]“ bzw. das Zeichen ® an, soweit nach Art des Mediums möglich.

§ 4 Kontrolle und Muster
(1) Vor der erstmaligen Verwendung der Marke auf einem neuen Lizenzprodukt, einer neuen Verpackung oder einer Werbekampagne legt der Lizenznehmer dem Lizenzgeber Muster bzw. Entwürfe zur Freigabe vor. Der Lizenzgeber gibt innerhalb von [z. B. 10] Werktagen frei oder benennt konkrete Beanstandungen; äußert er sich nicht, gilt die Freigabe als erteilt.
(2) Der Lizenzgeber ist berechtigt, jederzeit kostenlos Muster der Lizenzprodukte in handelsüblicher Menge anzufordern und nach Ankündigung von [z. B. 5] Werktagen die Produktions- und Lagerstätten des Lizenznehmers während der Geschäftszeiten zu besichtigen, höchstens [zweimal] jährlich.
(3) Entsprechen Lizenzprodukte nicht den Anforderungen nach § 3, kann der Lizenzgeber verlangen, dass der Lizenznehmer den Vertrieb dieser Produkte einstellt, die Mängel behebt und nicht verkehrsfähige Ware auf eigene Kosten vernichtet oder entmarkt.

§ 5 Lizenzgebühr, Abrechnung und Buchprüfung
(1) Der Lizenznehmer zahlt eine laufende Lizenzgebühr von [z. B. 8] % des Nettoumsatzes mit Lizenzprodukten (Rechnungsbetrag ohne Umsatzsteuer, abzüglich tatsächlich gewährter Rabatte, Gutschriften für Retouren und Fracht). Nicht abzugsfähig sind Marketingkosten, Marktplatzgebühren und Forderungsausfälle.
(2) Unabhängig vom Umsatz zahlt der Lizenznehmer eine Mindestlizenzgebühr von [Betrag] EUR je Vertragsjahr, fällig in [vier gleichen Quartalsraten im Voraus]. Die laufende Lizenzgebühr wird auf die Mindestlizenzgebühr desselben Vertragsjahres angerechnet. [Optional: Bei Vertragsschluss ist zusätzlich eine einmalige Einstandsgebühr von [Betrag] EUR fällig.]
(3) Der Lizenznehmer rechnet die Lizenzgebühr quartalsweise bis zum [15.] des auf das Quartal folgenden Monats ab. Die Abrechnung enthält je Lizenzprodukt Stückzahlen, Nettoumsatz, Retouren und Lizenzgebühr, getrennt nach Ländern des Lizenzgebiets. Der Rechnungsbetrag ist 14 Tage nach Abrechnung fällig; alle Beträge verstehen sich zuzüglich gesetzlicher Umsatzsteuer.
(4) Der Lizenznehmer führt über die Umsätze mit Lizenzprodukten gesonderte, prüffähige Aufzeichnungen und bewahrt sie [5] Jahre auf. Der Lizenzgeber kann die Aufzeichnungen einmal jährlich nach Ankündigung von [10] Werktagen durch einen zur Verschwiegenheit verpflichteten Wirtschaftsprüfer oder Steuerberater prüfen lassen. Ergibt die Prüfung eine Nachzahlung von mehr als [5] % des geprüften Zeitraums, trägt der Lizenznehmer die Kosten der Prüfung; Nachzahlungen sind mit [9] Prozentpunkten über dem Basiszinssatz zu verzinsen.

§ 6 Benutzung, Aufrechterhaltung und Verteidigung der Marke
(1) Der Lizenznehmer benutzt die Marke während der Vertragslaufzeit ernsthaft für die Lizenzprodukte im Lizenzgebiet und übermittelt dem Lizenzgeber auf Anfrage Benutzungsnachweise (Fotos, Rechnungen, Werbung mit Datum), um die rechtserhaltende Benutzung nach § 26 MarkenG belegen zu können.
(2) Der Lizenzgeber hält die Marke auf eigene Kosten aufrecht, insbesondere durch rechtzeitige Verlängerung, und unterrichtet den Lizenznehmer über Angriffe auf die Marke (Löschungs- und Verfallsanträge, Widersprüche).
(3) Der Lizenznehmer erkennt die Marke und die Rechte des Lizenzgebers an. Er wird die Marke oder die Gültigkeit ihrer Eintragung weder selbst angreifen noch Dritte dabei unterstützen und keine mit der Marke identischen oder verwechselbaren Zeichen anmelden. Alle Rechte und der durch die Benutzung erworbene Goodwill stehen dem Lizenzgeber zu.

§ 7 Rechtsverletzungen Dritter
(1) Die Parteien unterrichten sich unverzüglich über Verletzungen der Marke durch Dritte im Lizenzgebiet und über Behauptungen Dritter, die Benutzung der Marke verletze deren Rechte.
(2) Der Lizenzgeber entscheidet, ob und wie gegen Verletzer vorgegangen wird. Der Lizenznehmer darf Verletzungsklagen nur mit Zustimmung des Lizenzgebers erheben (§ 30 Abs. 3 MarkenG); er kann einer Klage des Lizenzgebers beitreten, um seinen eigenen Schaden geltend zu machen (§ 30 Abs. 4 MarkenG).
(3) Geht der Lizenzgeber nicht innerhalb von [z. B. 8] Wochen nach Kenntnis gegen eine erhebliche Verletzung im Lizenzgebiet vor, kann der [ausschließliche] Lizenznehmer verlangen, dass ihm die Rechtsverfolgung auf eigene Kosten und Risiko gestattet wird. Erlöse aus der Rechtsverfolgung stehen nach Abzug der Kosten [der Partei zu, die die Verfolgung betrieben hat / den Parteien im Verhältnis [50/50] zu].

§ 8 Haftung und Freistellung
(1) Der Lizenznehmer ist für Herstellung, Verkehrsfähigkeit, Sicherheit und Vertrieb der Lizenzprodukte allein verantwortlich. Er stellt den Lizenzgeber von allen Ansprüchen Dritter frei, die aus der Herstellung, dem Vertrieb oder der Bewerbung der Lizenzprodukte resultieren, einschließlich Produkthaftungs- und Wettbewerbsansprüchen und der angemessenen Kosten der Rechtsverteidigung, und unterhält eine Produkthaftpflichtversicherung mit einer Deckungssumme von mindestens [Betrag] EUR.
(2) Der Lizenzgeber versichert, dass die Marke eingetragen ist und ihm keine entgegenstehenden Rechte Dritter im Lizenzgebiet bekannt sind. Eine weitergehende Gewähr für die Rechtsbeständigkeit der Marke wird nicht übernommen. Wird die Marke für die Lizenzprodukte im Lizenzgebiet rechtskräftig gelöscht oder für verfallen erklärt, endet die Pflicht zur Zahlung der Lizenzgebühr für die betroffenen Produkte; bereits gezahlte Gebühren werden nicht erstattet.
(3) Im Übrigen haften die Parteien einander nur bei Vorsatz und grober Fahrlässigkeit, bei Verletzung wesentlicher Vertragspflichten begrenzt auf den vertragstypischen, vorhersehbaren Schaden, sowie unbeschränkt bei Schäden an Leben, Körper und Gesundheit.

§ 9 Laufzeit, Kündigung und Abverkauf
(1) Der Vertrag beginnt am [Datum] und läuft bis zum [Datum] ([z. B. 3] Jahre). Er verlängert sich um jeweils [1] Jahr, wenn er nicht mit einer Frist von [6] Monaten zum Ende der Laufzeit schriftlich gekündigt wird.
(2) Jede Partei kann den Vertrag aus wichtigem Grund fristlos kündigen. Ein wichtiger Grund liegt für den Lizenzgeber insbesondere vor, wenn der Lizenznehmer trotz Abmahnung mit Fristsetzung von [14] Tagen gegen §§ 2 Abs. 5, 3 oder 6 Abs. 3 verstößt, mit einer Lizenzgebühr länger als [30] Tage in Verzug ist, zahlungsunfähig wird oder über sein Vermögen das Insolvenzverfahren beantragt wird. [Optional: Der Lizenzgeber kann außerdem mit einer Frist von [6] Monaten kündigen, wenn er die Marke an einen Dritten veräußert.]
(3) Mit Vertragsende erlischt das Recht zur Benutzung der Marke. Der Lizenznehmer darf bei Vertragsende vorhandene, vertragsgemäß gekennzeichnete Lizenzprodukte innerhalb von [z. B. 6] Monaten zu üblichen Bedingungen abverkaufen (Abverkaufsfrist), sofern die Kündigung nicht auf einem Verstoß des Lizenznehmers beruht; die Lizenzgebühr ist auch auf diese Umsätze zu zahlen. Danach entfernt er die Marke von allen Produkten, Verpackungen, Werbemitteln, Websites und Profilen und bestätigt dies schriftlich.
(4) Die Regelungen zu Abrechnung, Buchprüfung, Freistellung und Geheimhaltung gelten über das Vertragsende hinaus.

§ 10 Schlussbestimmungen
(1) Die Parteien behandeln den Inhalt dieses Vertrags, insbesondere die Lizenzgebühren und Umsätze, vertraulich.
(2) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; das gilt auch für die Aufhebung dieser Klausel. Der Lizenznehmer darf Rechte aus diesem Vertrag nur mit schriftlicher Zustimmung des Lizenzgebers übertragen.
(3) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(4) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Ausschließlicher Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort].
(5) Anlagen: Anlage 1 Markenurkunde und Waren-/Dienstleistungsverzeichnis, Anlage 2 Markenrichtlinien, Anlage 3 Qualitätsanforderungen.

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Lizenzgeber


______________________________
[Vorname Nachname], für den Lizenznehmer

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "lizenzvertrag-content",
    titel: "Content-Lizenzvertrag (Foto, Video, Musik, Text)",
    kurz: "Einfache Lizenz für Fotos, Videos, Musik oder Texte zur Nutzung in Social Media, Werbung und auf der Website, mit Dauer, Credits und Vergütung.",
    kategorie: "geheimhaltung",
    dateiname: "Content-Lizenzvertrag",
    wofuer: [
      "Du kaufst von einem Creator, Fotografen oder Videografen Content für Instagram, TikTok, YouTube oder Ads",
      "Du bist selbst Creator und lizenzierst deine Inhalte an Unternehmen, ohne alle Rechte abzugeben",
      "User-Generated Content (UGC) soll in bezahlter Werbung laufen und braucht eine klare Nutzungsdauer",
      "Ein Musiker oder Komponist stellt einen Track für Werbevideos oder Podcasts bereit",
    ],
    enthaelt: [
      "§ 1 Content und Lieferung",
      "§ 2 Lizenzumfang (Medien, Kanäle, Gebiet, Dauer)",
      "§ 3 Bearbeitung und Beschränkungen (keine Weiterlizenzierung)",
      "§ 4 Namensnennung (Credits)",
      "§ 5 Vergütung",
      "§ 6 Rechte Dritter: abgebildete Personen, Musik, Marken",
      "§ 7 Gewährleistung und Freistellung",
      "§ 8 Laufzeit und Folgen des Ablaufs",
      "§ 9 Schlussbestimmungen",
    ],
    hinweise: [
      "Das Foto darfst du nur nutzen, wenn auch die abgebildete Person eingewilligt hat (§ 22 KUG, bei Werbung zusätzlich DSGVO). Die Lizenz des Fotografen ersetzt kein Model Release. Lass dir die Einwilligung ausdrücklich zusichern.",
      "Paid Ads (Meta, TikTok, Google) sind eine eigene Nutzungsart und kosten in der Praxis mehr als organische Posts. Fehlt sie im Vertrag, hast du dafür kein Recht (§ 31 Abs. 5 UrhG).",
      "Musik ist doppelt geschützt: Komposition und Aufnahme. Bei GEMA-Mitgliedern kann der Komponist die Nutzungsrechte nicht selbst einräumen; frage ausdrücklich nach der GEMA-Mitgliedschaft.",
      "Creator müssen Werbung kennzeichnen; wenn du Content auf dem Kanal des Creators bezahlst, ist das Werbung im Sinne des UWG und der Medienstaatsverträge. Diese Vorlage regelt nur die Lizenz, nicht die Kennzeichnungspflicht.",
      "Nach Ablauf der Lizenz müssen Anzeigen enden; bereits veröffentlichte organische Posts dürfen nach der Vorlage online bleiben, wenn ihr das ankreuzt. Ohne diese Regelung müsstest du löschen.",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen Content-Lizenz und Buy-out?",
        a: "Die Content-Lizenz ist ein einfaches, oft befristetes Nutzungsrecht für bestimmte Kanäle; der Creator behält alle übrigen Rechte und darf den Content auch anderen anbieten. Beim Buy-out erwirbst du ausschließliche, unbefristete Rechte für alle Nutzungsarten, was deutlich teurer ist. Für Social-Media-Content reicht meist die Lizenz, für Logos und Kampagnen-Key-Visuals brauchst du den Buy-out.",
      },
      {
        q: "Wie lange sollte die Lizenz laufen?",
        a: "Üblich sind 6 bis 24 Monate für Paid-Ads-Nutzung und unbefristet für organische Posts auf den eigenen Kanälen. Je länger die Dauer und je mehr Kanäle, desto höher die Vergütung. Die Vorlage sieht eine Laufzeit und die Option vor, bereits veröffentlichte Posts dauerhaft stehen zu lassen.",
      },
      {
        q: "Darf ich den Content an meine Agentur oder Händler weitergeben?",
        a: "Nur zur Umsetzung für dich, nicht zur eigenen Nutzung durch diese Dritten. Die Vorlage erlaubt die Weitergabe an Dienstleister für die vertragsgemäße Nutzung, verbietet aber Unterlizenzen. Sollen Händler oder Partner den Content selbst posten dürfen, musst du das ausdrücklich aufnehmen und meist mehr zahlen.",
      },
      {
        q: "Muss ich den Creator in jedem Post nennen?",
        a: "Das Recht auf Namensnennung steht dem Urheber zu, er kann aber auf die Ausübung verzichten. Bei Social-Media-Content ist eine Nennung im Caption-Text oder Tag üblich und für den Creator wertvoll. In Paid Ads und auf Verpackungen ist sie meist nicht praktikabel; die Vorlage regelt beides getrennt.",
      },
    ],
    seo: {
      title: "Content-Lizenzvertrag Vorlage 2026 kostenlos (Social) | GründerX",
      description:
        "Content-Lizenz für Foto, Video, Musik und Text als kostenlose Vorlage: Social Media, Werbung, Website, Dauer, Credits, keine Weiterlizenzierung, Vergütung.",
    },
    stand: "2026-10",
    text: `Content-Lizenzvertrag

zwischen

[Vorname Nachname / Firma], [Straße, PLZ Ort]
– nachfolgend „Lizenzgeber“ –

und

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Lizenznehmer“ –

– gemeinsam „die Parteien“ –

§ 1 Content und Lieferung
(1) Gegenstand dieses Vertrags sind die folgenden Inhalte (nachfolgend „Content“): [z. B. „[Anzahl] Fotos des Produkts [Name] gemäß Dateiliste in Anlage 1“ / „[Anzahl] Kurzvideos (9:16, je 15 bis 30 Sekunden) mit dem Produkt [Name]“ / „der Musiktitel ‚[Titel]‘, Länge [Minuten], als Master-Aufnahme inklusive Komposition“ / „[Anzahl] Blogtexte zu den Themen gemäß Anlage 1“].
(2) Der Lizenzgeber liefert den Content bis zum [Datum] [per Download-Link / per Cloud-Ordner] in folgenden Formaten: [z. B. JPG in voller Auflösung / MP4 in 1080p und 4K, ohne Wasserzeichen / WAV und MP3 / DOCX]. [Optional: Der Lizenznehmer erhält vorab Entwürfe und darf je Inhalt [eine] Korrekturrunde verlangen.]
(3) Der Lizenzgeber versichert, dass er den Content selbst geschaffen hat bzw. über alle erforderlichen Rechte daran verfügt und dass im Content enthaltenes Fremdmaterial (Musik, Schriften, Stockmaterial) in Anlage 2 mit Lizenznachweis aufgeführt ist.

§ 2 Lizenzumfang
(1) Der Lizenzgeber räumt dem Lizenznehmer das einfache (nicht ausschließliche) Recht ein, den Content im nachfolgend bestimmten Umfang zu nutzen, insbesondere zu vervielfältigen, öffentlich zugänglich zu machen, zu senden und zu verbreiten.
(2) Zulässige Nutzungsarten und Kanäle (Zutreffendes ankreuzen bzw. streichen):
   [ ] Social-Media-Kanäle des Lizenznehmers (Instagram, TikTok, YouTube, Facebook, LinkedIn, Pinterest), organisch (Posts, Reels, Stories, Shorts)
   [ ] bezahlte Werbung auf Social-Media-Plattformen und in Werbenetzwerken (Paid Ads, inklusive Spark Ads / Whitelisting über den Kanal des Lizenzgebers)
   [ ] Website, Online-Shop und Landingpages des Lizenznehmers, inklusive Produktseiten auf Marktplätzen (Amazon, Otto, Zalando)
   [ ] E-Mail-Newsletter und Messenger-Kanäle
   [ ] Print (Flyer, Kataloge, Anzeigen, Verpackungen) in einer Auflage bis [Anzahl] Stück
   [ ] Messen, Präsentationen, Pressearbeit
   [ ] sonstige: [Beschreibung]
(3) Das Nutzungsrecht gilt räumlich für [weltweit / die Länder [Länder]] (bei Online-Nutzung ist eine Abrufbarkeit aus anderen Ländern unschädlich) und zeitlich für [z. B. 12] Monate ab [Lieferung / erster Veröffentlichung] (Lizenzdauer).
(4) Der Lizenzgeber bleibt berechtigt, den Content selbst zu nutzen und Dritten Nutzungsrechte einzuräumen. [Optional: Während der Lizenzdauer räumt der Lizenzgeber keine Nutzungsrechte an Wettbewerber des Lizenznehmers im Bereich [Produktkategorie] ein.] [Optional: Der Lizenzgeber veröffentlicht den Content auf seinen eigenen Kanälen frühestens [am Tag der Veröffentlichung durch den Lizenznehmer / nach Freigabe].]

§ 3 Bearbeitung und Beschränkungen
(1) Der Lizenznehmer darf den Content technisch anpassen, zuschneiden, in Länge und Format kürzen, farblich korrigieren, mit Untertiteln, Texten, Logos, Musik und Call-to-Action-Elementen versehen und in Collagen oder Kampagnenmotive einbinden. Inhaltliche Änderungen, die Aussage oder Charakter des Contents entstellen oder den Lizenzgeber bzw. abgebildete Personen in ein negatives Licht rücken, sind unzulässig (§ 14 UrhG).
(2) Der Lizenznehmer darf den Content nicht an Dritte verkaufen, vermieten, unterlizenzieren oder zur eigenen Nutzung durch Dritte (Händler, Partner, Franchisenehmer) weitergeben. Die Weitergabe an Agenturen, Druckereien und Plattformen ist zulässig, soweit sie ausschließlich der vertragsgemäßen Nutzung für den Lizenznehmer dient.
(3) Der Content darf nicht als Logo, Marke oder Design angemeldet, nicht als Vorlage für KI-Trainingsdaten verwendet und nicht in Zusammenhängen genutzt werden, die pornografisch, diskriminierend, politisch oder rechtswidrig sind. Eine Nutzung für andere Produkte oder Marken als [Produkt / Marke] ist ausgeschlossen.

§ 4 Namensnennung
(1) Bei organischen Veröffentlichungen in Social-Media-Kanälen nennt der Lizenznehmer den Lizenzgeber [durch Verlinkung des Profils „@[Handle]“ in der Bildunterschrift oder als Tag / in der Form „[Foto/Video]: [Name]“]. Bei Paid Ads, auf der Website, in Print und bei Produktseiten ist eine Nennung nicht erforderlich. [Alternative: Der Lizenzgeber verzichtet auf die Ausübung seines Rechts auf Namensnennung (§ 13 UrhG) für alle Nutzungen.]
(2) Der Lizenzgeber darf den Content nach der ersten Veröffentlichung durch den Lizenznehmer als Referenz im eigenen Portfolio und in eigenen Social-Media-Kanälen zeigen und den Lizenznehmer als Kunden nennen.

§ 5 Vergütung
(1) Der Lizenznehmer zahlt für Erstellung und Lizenz eine Pauschale von [Betrag] EUR [zuzüglich gesetzlicher Umsatzsteuer / ohne Umsatzsteuer, da der Lizenzgeber Kleinunternehmer im Sinne des § 19 UStG ist]. [Aufschlüsselung: Erstellung [Betrag] EUR, Nutzung organisch [Betrag] EUR, Paid Ads [Betrag] EUR je [12] Monate.]
(2) Die Vergütung ist fällig innerhalb von 14 Tagen nach Lieferung und Rechnungsstellung. [Optional: Bei Auftragserteilung ist eine Anzahlung von [Betrag] EUR fällig.]
(3) Eine Verlängerung der Lizenzdauer um jeweils [12] Monate kann der Lizenznehmer bis spätestens [4] Wochen vor Ablauf in Textform zu einer Vergütung von [Betrag] EUR je Verlängerung verlangen. Eine Erweiterung auf zusätzliche Nutzungsarten bedarf einer gesonderten Vereinbarung.
(4) Der Lizenznehmer prüft eigenverantwortlich seine Abgabepflicht gegenüber der Künstlersozialkasse.

§ 6 Rechte Dritter: abgebildete Personen, Musik, Marken
(1) Sind im Content Personen erkennbar, versichert der Lizenzgeber, dass diese (bei Minderjährigen: deren gesetzliche Vertreter) in die Nutzung im Umfang dieses Vertrags einschließlich der Werbenutzung eingewilligt haben (§ 22 KUG, Art. 6 Abs. 1 Buchst. a DSGVO). Die Einwilligungen werden in Anlage 3 beigefügt. Tritt der Lizenzgeber selbst im Content auf, erteilt er diese Einwilligung mit diesem Vertrag; ein Widerruf lässt die Rechtmäßigkeit bis dahin erfolgter Nutzungen unberührt.
(2) Enthält der Content Musik, versichert der Lizenzgeber, dass er die Rechte an Komposition und Aufnahme für die vereinbarte Nutzung einräumen kann und [nicht Mitglied der GEMA oder einer anderen Verwertungsgesellschaft ist / die GEMA-Lizenzierung durch den Lizenznehmer erforderlich ist]. Für von Plattformen bereitgestellte Musik gilt die jeweilige Plattformlizenz; sie berechtigt regelmäßig nicht zur Nutzung in Paid Ads.
(3) Der Lizenzgeber stellt sicher, dass im Content keine fremden Marken, Kunstwerke oder geschützten Gebäude hervorgehoben werden, soweit nicht in Anlage 2 ausgewiesen und mit dem Lizenznehmer abgestimmt.

§ 7 Gewährleistung und Freistellung
(1) Der Lizenzgeber gewährleistet, dass der Content den in § 1 vereinbarten Vorgaben entspricht und frei von Rechten Dritter ist, die der vertragsgemäßen Nutzung entgegenstehen. Entspricht der Content den Vorgaben nicht, kann der Lizenznehmer innerhalb von [z. B. 7] Tagen nach Lieferung Nachbesserung verlangen; schlägt diese fehl, kann er die Vergütung angemessen mindern oder vom Vertrag zurücktreten.
(2) Der Lizenzgeber stellt den Lizenznehmer von Ansprüchen Dritter frei, die auf einer schuldhaften Verletzung der Zusicherungen in §§ 1 Abs. 3 und 6 beruhen, einschließlich angemessener Kosten der Rechtsverteidigung. Die Haftung des Lizenzgebers ist bei leichter Fahrlässigkeit auf die Höhe der Vergütung nach § 5 beschränkt; dies gilt nicht für Schäden an Leben, Körper und Gesundheit.
(3) Der Lizenznehmer ist für die Einhaltung von Werbekennzeichnungs-, Wettbewerbs- und Plattformregeln bei der Nutzung des Contents allein verantwortlich.

§ 8 Laufzeit und Folgen des Ablaufs
(1) Dieser Vertrag tritt mit Unterzeichnung in Kraft. Die Nutzungsrechte enden mit Ablauf der Lizenzdauer nach § 2 Abs. 3, sofern sie nicht nach § 5 Abs. 3 verlängert wurden.
(2) Nach Ablauf der Lizenzdauer beendet der Lizenznehmer alle bezahlten Schaltungen und entfernt den Content von Website, Shop und Marktplätzen innerhalb von [14] Tagen. [Zutreffendes ankreuzen:] [ ] Organische Beiträge, die während der Lizenzdauer veröffentlicht wurden, dürfen dauerhaft online bleiben, werden aber nicht erneut gepostet oder beworben. [ ] Auch organische Beiträge sind zu löschen oder zu archivieren.
(3) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Ein wichtiger Grund liegt insbesondere vor, wenn der Lizenznehmer den Content trotz Abmahnung außerhalb des vereinbarten Umfangs nutzt oder der Lizenzgeber die Zusicherungen nach § 6 nicht einhält.

§ 9 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Textform (E-Mail genügt); das gilt auch für die Aufhebung dieser Klausel.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(3) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, [Ort].
(4) Anlagen: Anlage 1 Content-Liste bzw. Briefing, Anlage 2 Fremdmaterial und Lizenzen, Anlage 3 Einwilligungen abgebildeter Personen.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Lizenzgeber


______________________________
[Vorname Nachname], für den Lizenznehmer

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "white-label-vereinbarung",
    titel: "White-Label-Vereinbarung",
    kurz: "Vertrag, mit dem ein Partner dein Produkt oder deine Software unter seiner eigenen Marke vertreibt: Lieferung, Preise, Markennutzung, Produktverantwortung, Support.",
    kategorie: "geheimhaltung",
    dateiname: "White-Label-Vereinbarung",
    wofuer: [
      "Du stellst ein Produkt oder eine Software her und ein Partner will es unter seinem Namen verkaufen",
      "Du willst ein fremdes Produkt oder Tool unter deiner Marke anbieten, ohne es selbst zu entwickeln",
      "Agenturen, Reseller oder Franchise-ähnliche Modelle, bei denen der Endkunde nur die Marke des Partners sieht",
      "Als Rahmenvertrag für laufende Bestellungen oder eine laufende SaaS-Bereitstellung in Partner-Branding",
    ],
    enthaelt: [
      "§ 1 Vertragsgegenstand (Produkt oder Dienst, White-Label-Umfang)",
      "§ 2 Bereitstellung und Lieferung",
      "§ 3 Preise, Bestellung und Zahlung",
      "§ 4 Marken- und Namensnutzung beider Seiten",
      "§ 5 Produktverantwortung, Kennzeichnung und Haftung gegenüber Endkunden",
      "§ 6 Support-Stufen (1st, 2nd, 3rd Level)",
      "§ 7 Exklusivität und Wettbewerb",
      "§ 8 Geheimhaltung der Partnerschaft, Datenschutz",
      "§ 9 Gewährleistung und Haftung zwischen den Parteien",
      "§ 10 Laufzeit, Kündigung und Übergang",
      "§ 11 Schlussbestimmungen",
    ],
    hinweise: [
      "Wer seinen Namen oder seine Marke auf ein Produkt setzt, gilt nach § 4 Abs. 1 Satz 2 ProdHaftG als Hersteller und haftet gegenüber Verbrauchern wie der echte Hersteller. Der Partner braucht deshalb eine Produkthaftpflichtversicherung und einen Rückgriff auf den Hersteller; die Vorlage regelt beides.",
      "Kennzeichnungspflichten (CE, Produktsicherheit, Lebensmittel-, Kosmetik- oder Textilkennzeichnung, Impressum und AGB bei Software) treffen den, der als Anbieter auftritt. Kläre, wer welche Dokumente erstellt und wer Prüfungen beauftragt.",
      "Exklusivität schneidet dir als Hersteller Vertriebswege ab. Gewähre sie nur gegen Mindestabnahme oder Mindestumsatz und befristet; die Vorlage koppelt Exklusivität an Mindestmengen.",
      "Bei White-Label-Software verarbeitet der Hersteller oft Daten der Endkunden des Partners. Dann ist ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO zwischen Partner und Hersteller Pflicht.",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen White Label und Reseller?",
        a: "Ein Reseller verkauft dein Produkt unter deiner Marke weiter; der Endkunde weiß, von wem es stammt. Beim White Label tritt der Partner selbst als Anbieter auf, der Endkunde sieht nur dessen Marke. Das bringt dem Partner Markenaufbau, dir Reichweite ohne Marketing, aber der Partner übernimmt auch die Verantwortung gegenüber den Endkunden.",
      },
      {
        q: "Wer haftet gegenüber dem Endkunden, wenn das Produkt mangelhaft ist?",
        a: "Vertraglich der Partner, denn er ist Vertragspartner des Endkunden. Bei Personen- oder Sachschäden haftet er außerdem als Quasi-Hersteller nach dem Produkthaftungsgesetz. Im Innenverhältnis nimmt er den Hersteller in Regress; die Vorlage sieht dafür Gewährleistung, Freistellung und Versicherung vor.",
      },
      {
        q: "Darf der Hersteller das Produkt auch unter eigenem Namen verkaufen?",
        a: "Ja, wenn keine Exklusivität vereinbart ist. Die Vorlage bietet drei Varianten: keine Exklusivität, Exklusivität für ein Gebiet oder eine Branche gegen Mindestabnahme, oder ein Verbot für den Hersteller, identische Produkte an direkte Wettbewerber des Partners zu liefern.",
      },
      {
        q: "Muss die Partnerschaft geheim bleiben?",
        a: "Meistens wollen das beide Seiten, weil der Markenwert des Partners sonst leidet. Die Vorlage verpflichtet beide zur Vertraulichkeit über die Herkunft des Produkts, lässt aber gesetzlich erforderliche Herstellerangaben (etwa auf Verpackungen oder im Impressum) ausdrücklich zu.",
      },
    ],
    seo: {
      title: "White-Label-Vertrag Vorlage 2026 kostenlos (Word, PDF) | GründerX",
      description:
        "White-Label-Vereinbarung als kostenlose Vorlage: Produkt oder Software unter Partnermarke, Lieferung, Preise, Produkthaftung, Support-Stufen, Exklusivität.",
    },
    stand: "2026-10",
    text: `White-Label-Vereinbarung

zwischen

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Hersteller“ –

und

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Partner“ –

– gemeinsam „die Parteien“ –

Präambel
Der Hersteller entwickelt und produziert bzw. betreibt [Produkt / Software / Dienstleistung, z. B. „Nahrungsergänzungsmittel in Kapselform“ / „eine Software zur Terminbuchung als Web-Anwendung“] (nachfolgend „Produkt“). Der Partner möchte das Produkt unter seiner eigenen Marke „[Partnermarke]“ und in seinem eigenen Namen an seine Kunden (nachfolgend „Endkunden“) vertreiben, ohne dass der Hersteller gegenüber den Endkunden in Erscheinung tritt (White Label). Die Parteien vereinbaren dazu Folgendes:

§ 1 Vertragsgegenstand
(1) Der Hersteller stellt dem Partner das Produkt in der in Anlage 1 beschriebenen Ausführung in White-Label-Form zur Verfügung, d. h. ohne Hinweise auf den Hersteller und versehen mit der Marke, dem Namen und der Gestaltung des Partners gemäß den Vorgaben in Anlage 2 (Branding-Vorgaben).
(2) Der White-Label-Umfang umfasst: [bei Waren: Verpackung, Etiketten, Beipackzettel und Produktaufdruck in der Gestaltung des Partners] [bei Software: Anpassung von Logo, Farben, Domain ([app.partnermarke.de]), Absenderadressen für Systemmails, Impressum und Rechtstexte des Partners sowie Entfernung aller Hinweise auf den Hersteller in Oberfläche, Dokumentation und Quelltext-Kommentaren, soweit technisch mit vertretbarem Aufwand möglich].
(3) Der Partner vertreibt das Produkt im eigenen Namen und auf eigene Rechnung. Verträge mit Endkunden kommen ausschließlich zwischen dem Partner und den Endkunden zustande. Der Hersteller ist weder Vertreter noch Erfüllungsgehilfe des Partners gegenüber Endkunden, soweit dieser Vertrag nichts anderes bestimmt.
(4) Weiterentwicklungen des Produkts, die der Hersteller allgemein bereitstellt, sind vom Vertrag umfasst. Individuelle Anpassungen für den Partner werden gesondert nach Anlage 3 (Preisliste) vereinbart. Alle Rechte am Produkt, einschließlich der Weiterentwicklungen und der für den Partner vorgenommenen Anpassungen, verbleiben beim Hersteller.

§ 2 Bereitstellung und Lieferung
[Variante A – Waren:]
(1) Der Partner bestellt per [E-Mail / Bestellportal] mit einer Mindestbestellmenge von [Anzahl] Einheiten je Bestellung. Der Hersteller bestätigt Bestellungen innerhalb von [2] Werktagen; mit der Bestätigung kommt der Einzelliefervertrag zustande. Lieferzeit: [z. B. 15] Werktage ab Bestätigung bzw. ab Freigabe der Druckdaten bei Erstbestellung.
(2) Lieferung erfolgt [ab Werk / frei Lager des Partners / direkt an Endkunden (Dropshipping) in neutraler Verpackung mit Absender des Partners]. Gefahrübergang mit Übergabe an den Frachtführer bzw. bei Lieferung frei Haus mit Übergabe an den Empfänger.
(3) Der Partner liefert die Druckdaten für Verpackung und Etiketten gemäß den technischen Vorgaben des Herstellers. Der Hersteller prüft die Druckdaten nur auf technische Umsetzbarkeit, nicht auf rechtliche Zulässigkeit.
[Variante B – Software/Dienst:]
(1) Der Hersteller stellt das Produkt als gehostete Anwendung unter der Domain des Partners bereit, richtet das Branding nach Anlage 2 innerhalb von [z. B. 20] Werktagen nach Bereitstellung der Vorlagen ein und stellt dem Partner eine Administrationsoberfläche zur Verwaltung der Endkunden zur Verfügung.
(2) Verfügbarkeit: [99,5] % im Monatsmittel am Übergabepunkt (Internet-Ausgang des Rechenzentrums), ausgenommen angekündigte Wartungsfenster ([werktags zwischen 22 und 6 Uhr], höchstens [8] Stunden je Monat) und Störungen außerhalb des Einflussbereichs des Herstellers. Der Hersteller sichert die Daten täglich und bewahrt Sicherungen [30] Tage auf.
(3) Der Hersteller informiert den Partner mindestens [4] Wochen vor wesentlichen Funktionsänderungen, die Endkunden sichtbar betreffen, und mindestens [6] Monate vor der Einstellung von Funktionen.

§ 3 Preise, Bestellung und Zahlung
(1) Der Partner zahlt die Preise gemäß Anlage 3 [je Einheit / je Endkunde und Monat / als monatliche Grundgebühr von [Betrag] EUR zuzüglich [Betrag] EUR je aktivem Endkunden]. Alle Preise verstehen sich netto zuzüglich gesetzlicher Umsatzsteuer. Die Preise gegenüber Endkunden legt der Partner frei fest.
(2) [Optional:] Der Partner verpflichtet sich zu einer Mindestabnahme von [Anzahl] Einheiten bzw. einem Mindestumsatz von [Betrag] EUR je Vertragsjahr. Wird die Mindestabnahme unterschritten, zahlt der Partner die Differenz [zu [50] %] als Ausgleich; eine Unterschreitung in zwei aufeinanderfolgenden Jahren berechtigt den Hersteller zur Kündigung der Exklusivität nach § 7.
(3) Rechnungen sind innerhalb von [14] Tagen ohne Abzug fällig. Der Hersteller darf die Preise mit einer Ankündigungsfrist von [3] Monaten zum Beginn eines Vertragsjahres anpassen, erstmals nach [12] Monaten; bei einer Erhöhung über [5] % kann der Partner zum Wirksamwerden kündigen.
(4) Bei Zahlungsverzug von mehr als [30] Tagen darf der Hersteller nach Ankündigung weitere Lieferungen zurückhalten bzw. den Zugang zur Anwendung für neue Endkunden sperren; bestehende Endkunden bleiben für weitere [30] Tage versorgt.

§ 4 Marken- und Namensnutzung
(1) Der Partner räumt dem Hersteller das einfache, nicht übertragbare Recht ein, die Partnermarke und die Branding-Vorgaben ausschließlich zur Erfüllung dieses Vertrags (Produktion, Verpackung, Einrichtung der Anwendung) zu nutzen. Der Partner stellt sicher, dass er über die erforderlichen Rechte verfügt, und stellt den Hersteller von Ansprüchen Dritter wegen der Partnermarke frei.
(2) Der Hersteller tritt gegenüber Endkunden nicht in Erscheinung. Er verwendet die Partnermarke nicht in eigener Werbung und nennt den Partner nicht als Referenz, es sei denn, der Partner stimmt in Textform zu. [Alternative: Der Hersteller darf den Partner nach Freigabe als Referenzkunden nennen.]
(3) Der Partner verwendet keine Marken, Namen oder Kennzeichen des Herstellers. Gesetzlich vorgeschriebene Herstellerangaben (z. B. Name und Anschrift des Herstellers oder Verantwortlichen auf Verpackungen, Konformitätserklärungen, Open-Source-Hinweise in der Software) bleiben zulässig und werden zwischen den Parteien abgestimmt.

§ 5 Produktverantwortung, Kennzeichnung und Haftung gegenüber Endkunden
(1) Die Parteien sind sich bewusst, dass der Partner durch das Anbringen seiner Marke gegenüber Endkunden als Hersteller im Sinne des § 4 Abs. 1 Satz 2 ProdHaftG gilt und zivilrechtlich als Vertragspartner der Endkunden haftet.
(2) Der Hersteller gewährleistet, dass das Produkt bei Lieferung den in Anlage 1 vereinbarten Spezifikationen und den in Deutschland [und der EU] geltenden gesetzlichen Anforderungen an Sicherheit und Beschaffenheit entspricht, und stellt dem Partner die dafür erforderlichen Unterlagen (Konformitätserklärungen, Prüfberichte, Sicherheitsdatenblätter, technische Dokumentation) zur Verfügung. Der Partner ist für Kennzeichnung, Werbeaussagen, Rechtstexte (AGB, Widerrufsbelehrung, Datenschutzerklärung, Impressum) und Verbraucherinformationen gegenüber Endkunden verantwortlich, soweit sie nicht in Anlage 1 dem Hersteller zugewiesen sind.
(3) Der Hersteller stellt den Partner von Ansprüchen Endkunden und Dritter frei, soweit diese auf einem Produktfehler beruhen, der bei Lieferung vorlag und in der Sphäre des Herstellers entstanden ist (Konstruktion, Fabrikation, Hosting, Softwarefehler). Der Partner stellt den Hersteller von Ansprüchen frei, die auf seiner Kennzeichnung, seinen Werbeaussagen, seinen Rechtstexten oder seiner Lagerung und Handhabung beruhen.
(4) Beide Parteien unterhalten eine Betriebs- und Produkthaftpflichtversicherung mit einer Deckungssumme von mindestens [Betrag] EUR je Schadensfall und weisen sie auf Verlangen nach. Jede Partei informiert die andere unverzüglich über Schadensfälle, Rückrufe, behördliche Maßnahmen und Sicherheitslücken, die das Produkt betreffen; Rückrufe werden gemeinsam abgestimmt und vom Verursacher bezahlt.

§ 6 Support-Stufen
(1) 1st-Level-Support (Annahme von Endkundenanfragen, Bedienfragen, Erstdiagnose, Retourenabwicklung) erbringt der Partner in eigenem Namen und auf eigene Kosten.
(2) 2nd-Level-Support (Analyse technischer Störungen und Produktmängel, die der Partner nicht lösen kann) erbringt der Hersteller gegenüber dem Partner, nicht gegenüber Endkunden, per [Ticketsystem / E-Mail] an Werktagen von [9] bis [17] Uhr. Reaktionszeiten: bei Störungen, die das Produkt unbrauchbar machen, [4] Stunden; bei erheblichen Einschränkungen [1] Werktag; sonst [3] Werktage.
(3) 3rd-Level-Support (Fehlerbehebung im Produkt, Softwarekorrekturen, Ersatzlieferung bei Serienfehlern) erbringt der Hersteller im Rahmen seiner Gewährleistung; darüber hinausgehende Leistungen (z. B. Störungen durch Fehlbedienung oder Änderungen des Partners) werden nach Anlage 3 vergütet.
(4) Der Hersteller stellt dem Partner eine Wissensdatenbank bzw. Dokumentation in White-Label-Form bereit, die der Partner seinen Endkunden unter eigener Marke zugänglich machen darf. Der Hersteller schult die Support-Mitarbeiter des Partners einmal zu Vertragsbeginn [kostenlos / gegen Vergütung nach Anlage 3].

§ 7 Exklusivität und Wettbewerb
[Variante A:] Es besteht keine Exklusivität. Beide Parteien bleiben frei, mit Dritten zusammenzuarbeiten; der Hersteller darf das Produkt unter eigener Marke und über andere Partner vertreiben.
[Variante B:] Der Hersteller gewährt dem Partner für die Dauer dieses Vertrags Exklusivität für [das Gebiet [Gebiet] / die Branche [Branche] / den Vertriebskanal [Kanal]]: Er wird das Produkt dort weder selbst unter fremder Marke noch über andere White-Label-Partner anbieten. Die Exklusivität steht unter der Bedingung, dass der Partner die Mindestabnahme nach § 3 Abs. 2 erreicht. Der Partner verpflichtet sich im Gegenzug, während der Laufzeit keine vergleichbaren Produkte anderer Hersteller unter der Partnermarke zu vertreiben.
[Variante C:] Der Hersteller wird identische Produkte nicht an die in Anlage 4 benannten direkten Wettbewerber des Partners liefern. Im Übrigen besteht keine Exklusivität.

§ 8 Geheimhaltung der Partnerschaft, Datenschutz
(1) Die Parteien behandeln den Inhalt dieses Vertrags, die Preise, die Tatsache, dass das Produkt vom Hersteller stammt, sowie alle Geschäftsgeheimnisse der anderen Partei vertraulich und verpflichten ihre Mitarbeiter und Dienstleister entsprechend. Diese Pflicht gilt für [3] Jahre nach Vertragsende fort. Gesetzliche Offenlegungspflichten und die in § 4 Abs. 3 genannten Pflichtangaben bleiben unberührt.
(2) Endkundendaten gehören zur Sphäre des Partners. Verarbeitet der Hersteller personenbezogene Daten von Endkunden (insbesondere bei Variante B des § 2 und bei Direktversand), schließen die Parteien einen Auftragsverarbeitungsvertrag nach Art. 28 DSGVO (Anlage 5). Der Hersteller nutzt Endkundendaten nicht für eigene Zwecke und kontaktiert Endkunden nicht, außer auf Weisung des Partners.
(3) Nach Vertragsende gibt der Hersteller die Endkundendaten [in einem gängigen Format] an den Partner heraus und löscht sie anschließend, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen.

§ 9 Gewährleistung und Haftung zwischen den Parteien
(1) [Bei Waren:] Der Partner untersucht gelieferte Ware unverzüglich und rügt offensichtliche Mängel innerhalb von [5] Werktagen, verdeckte Mängel unverzüglich nach Entdeckung (§ 377 HGB). Der Hersteller leistet bei Mängeln nach seiner Wahl Nachbesserung oder Ersatzlieferung; schlägt dies fehl, kann der Partner mindern oder vom Einzelliefervertrag zurücktreten. Mängelansprüche verjähren in [12] Monaten ab Lieferung; der Rückgriff des Partners bei Verbrauchsgüterkauf (§§ 445a, 445b BGB) bleibt unberührt.
(2) [Bei Software:] Der Hersteller beseitigt gemeldete Fehler, die die vereinbarte Funktion beeinträchtigen, innerhalb angemessener Frist; bis zur Behebung stellt er, soweit möglich, eine Umgehungslösung bereit. Die verschuldensunabhängige Haftung für anfängliche Mängel (§ 536a Abs. 1 BGB) ist ausgeschlossen.
(3) Jede Partei haftet unbeschränkt bei Vorsatz, grober Fahrlässigkeit, Schäden an Leben, Körper und Gesundheit, nach dem Produkthaftungsgesetz und im Umfang übernommener Garantien. Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt, höchstens auf [Betrag / die in den letzten 12 Monaten gezahlte Vergütung]; im Übrigen ist die Haftung bei leichter Fahrlässigkeit ausgeschlossen. Die Freistellungen nach § 5 Abs. 3 bleiben unberührt.

§ 10 Laufzeit, Kündigung und Übergang
(1) Der Vertrag beginnt am [Datum] und läuft [24] Monate. Er verlängert sich um jeweils [12] Monate, wenn er nicht mit einer Frist von [6] Monaten zum Ende der Laufzeit schriftlich gekündigt wird.
(2) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt, insbesondere bei Zahlungsverzug von mehr als [60] Tagen, Verstoß gegen §§ 4, 7 oder 8 trotz Abmahnung, Insolvenzantrag oder wiederholter Unterschreitung der Verfügbarkeit bzw. Lieferfristen.
(3) Nach Kündigung versorgt der Hersteller die bestehenden Endkunden des Partners für eine Übergangsfrist von [6] Monaten zu den bisherigen Bedingungen weiter, damit der Partner seine Endkundenverträge ordnungsgemäß beenden oder auf ein anderes Produkt umstellen kann; bei Kündigung wegen Zahlungsverzugs nur gegen Vorkasse. Der Partner darf vorhandene Lagerware innerhalb von [6] Monaten abverkaufen.
(4) Mit Vertragsende enden die wechselseitigen Nutzungsrechte an Marken und Branding-Vorgaben. Der Hersteller entfernt das Branding des Partners und gibt Druckdaten und Vorlagen zurück bzw. löscht sie. Die §§ 5 Abs. 3, 8 und 9 Abs. 3 gelten fort.

§ 11 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; das gilt auch für die Aufhebung dieser Klausel. Allgemeine Geschäftsbedingungen einer Partei gelten nur, soweit sie in diesem Vertrag ausdrücklich einbezogen sind.
(2) Rechte aus diesem Vertrag dürfen nur mit schriftlicher Zustimmung der anderen Partei übertragen werden; die Übertragung auf verbundene Unternehmen und Rechtsnachfolger im Rahmen einer Unternehmensveräußerung ist nach vorheriger Information zulässig.
(3) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(4) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Ausschließlicher Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort].
(5) Anlagen: Anlage 1 Produktbeschreibung und Verantwortlichkeiten, Anlage 2 Branding-Vorgaben, Anlage 3 Preisliste, Anlage 4 Wettbewerberliste (bei Variante C), Anlage 5 Auftragsverarbeitungsvertrag.

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Hersteller


______________________________
[Vorname Nachname], für den Partner

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "auftragsentwicklung-software",
    titel: "Software-Entwicklungsvertrag (Auftragsentwicklung)",
    kurz: "Werkvertrag für die Entwicklung individueller Software mit Pflichtenheft, Meilensteinen, Abnahme, Vergütung und vollständiger Rechteübertragung am Quellcode.",
    kategorie: "geheimhaltung",
    dateiname: "Software-Entwicklungsvertrag",
    wofuer: [
      "Du lässt eine App, Plattform, Website-Anwendung oder Schnittstelle von einer Agentur oder einem Freelancer entwickeln",
      "Du bist Entwickler und willst Leistungsumfang, Abnahme und Rechte sauber regeln, bevor du anfängst",
      "Ein Investor oder Käufer verlangt den Nachweis, dass alle Rechte am Quellcode bei deiner Gesellschaft liegen",
      "Als Grundlage für ein Projekt mit Meilensteinen, Festpreis oder Abrechnung nach Aufwand mit Budgetdeckel",
    ],
    enthaelt: [
      "§ 1 Vertragsgegenstand, Lastenheft und Pflichtenheft",
      "§ 2 Projektablauf, Meilensteine und Änderungen (Change Requests)",
      "§ 3 Mitwirkung des Auftraggebers",
      "§ 4 Lieferung, Abnahme und Dokumentation",
      "§ 5 Vergütung (Festpreis oder Aufwand mit Budgetdeckel)",
      "§ 6 Rechte am Quellcode und an der Software",
      "§ 7 Open-Source-Komponenten und Fremdsoftware",
      "§ 8 Gewährleistung",
      "§ 9 Haftung",
      "§ 10 Wartung und Pflege (optional)",
      "§ 11 Geheimhaltung, Datenschutz, Kündigung",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Ohne ausdrückliche Rechteklausel bekommst du nach der Zweckübertragungsregel (§ 31 Abs. 5 UrhG) nur ein Nutzungsrecht für den vereinbarten Zweck, oft ohne Quellcode und ohne Bearbeitungsrecht. Investoren prüfen genau das in der Due Diligence.",
      "Die Abnahme ist der Dreh- und Angelpunkt des Werkvertrags: Mit ihr wird die Vergütung fällig, die Gewährleistungsfrist beginnt und die Beweislast dreht sich. Prüfe wirklich innerhalb der Frist, denn nach § 640 Abs. 2 BGB gilt die Abnahme als erteilt, wenn du keine Mängel benennst.",
      "Copyleft-Lizenzen wie GPL oder AGPL können dich zwingen, deinen eigenen Quellcode offenzulegen, wenn die Komponenten fest eingebunden werden. Die Vorlage verlangt eine Liste aller Open-Source-Komponenten und verbietet Copyleft ohne deine Freigabe.",
      "Beim Festpreis trägt der Entwickler das Risiko des Mehraufwands, deshalb muss das Pflichtenheft vollständig sein. Bei Abrechnung nach Aufwand trägst du es; vereinbare mindestens einen Budgetdeckel und Berichtspflichten.",
      "Als Auftraggeber darfst du den Werkvertrag jederzeit kündigen (§ 648 BGB), schuldest dann aber die vereinbarte Vergütung abzüglich ersparter Aufwendungen. Der Entwickler kann pauschal 5 % der nicht erbrachten Leistung verlangen, wenn er nichts anderes nachweist.",
    ],
    faqs: [
      {
        q: "Lastenheft oder Pflichtenheft, was ist der Unterschied?",
        a: "Das Lastenheft schreibst du als Auftraggeber: Es beschreibt, was die Software aus deiner Sicht können soll. Das Pflichtenheft schreibt der Entwickler: Es beschreibt, wie er die Anforderungen technisch umsetzt. Erst das von beiden freigegebene Pflichtenheft ist der verbindliche Maßstab für Abnahme und Mängel.",
      },
      {
        q: "Gehört mir der Quellcode nach dem Projekt?",
        a: "Nur, wenn es im Vertrag steht. Die Vorlage räumt dir das ausschließliche, unbefristete, übertragbare Nutzungsrecht inklusive Quellcode, Bearbeitung und Weiterentwicklung ein und verpflichtet zur Herausgabe des Codes mit Dokumentation. An vorbestehenden Standardbausteinen des Entwicklers bekommst du ein einfaches Nutzungsrecht, damit er sie weiter in anderen Projekten nutzen kann.",
      },
      {
        q: "Was passiert, wenn der Entwickler den Meilenstein nicht schafft?",
        a: "Die Vorlage sieht für Meilensteine verbindliche Termine vor. Bei Verzug kannst du nach Fristsetzung vom betroffenen Teil zurücktreten oder Schadensersatz verlangen; optional ist eine Vertragsstrafe je Woche Verzug vorgesehen. Verzögerungen, die auf fehlende Mitwirkung deinerseits zurückgehen, verschieben die Termine entsprechend.",
      },
      {
        q: "Wie lange haftet der Entwickler für Fehler?",
        a: "Nach der Abnahme beginnt die Gewährleistung; die Vorlage sieht zwölf Monate vor, gesetzlich wären es bei Werkleistungen in der Regel zwei Jahre. Der Entwickler muss Fehler zunächst nachbessern; erst wenn das fehlschlägt, kannst du mindern oder zurücktreten. Für laufende Anpassungen und Updates brauchst du zusätzlich einen Wartungsvertrag.",
      },
    ],
    seo: {
      title: "Software-Entwicklungsvertrag Vorlage 2026 kostenlos | GründerX",
      description:
        "Software-Entwicklungsvertrag als kostenlose Vorlage: Pflichtenheft, Meilensteine, Abnahme, Festpreis oder Aufwand, Rechte am Quellcode, Gewährleistung.",
    },
    stand: "2026-10",
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
  },
];
