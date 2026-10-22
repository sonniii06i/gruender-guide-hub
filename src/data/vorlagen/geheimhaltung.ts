import { type Vorlage } from "./types";

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
      title: "NDA Vorlage einseitig kostenlos (Word & PDF) | GründerX",
      description:
        "Einseitige Geheimhaltungsvereinbarung nach GeschGehG als kostenlose Vorlage: vertrauliche Informationen, Ausnahmen, Laufzeit, Rückgabe, Vertragsstrafe.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/nda-einseitig"),
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
      title: "NDA Vorlage gegenseitig kostenlos (Word & PDF) | GründerX",
      description:
        "Gegenseitige NDA für Kooperation und Investment als kostenlose Vorlage nach GeschGehG: Pflichten beider Seiten, Residual-Klausel, Laufzeit, Vertragsstrafe.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/nda-gegenseitig"),
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
      title: "Letter of Intent Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "Absichtserklärung (LOI) für Unternehmenskauf und Beteiligung als kostenlose Vorlage: Eckpunkte, Exklusivität, Due Diligence, Zeitplan, klare Unverbindlichkeit.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/letter-of-intent"),
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
      title: "Term Sheet Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "Term Sheet für Business-Angel- und Seed-Beteiligung als kostenlose Vorlage: Bewertung, Anteile, Liquidationspräferenz, Verwässerungsschutz, Vesting, Drag-along.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/term-sheet-beteiligung"),
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
      title: "Software-Lizenzvertrag Vorlage kostenlos (Word) | GründerX",
      description:
        "Software-Lizenzvertrag (B2B, nicht-exklusiv) als kostenlose Vorlage: Lizenzumfang, Nutzer, Laufzeit, Vergütung, Updates, Support, Gewährleistung, Audit.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/lizenzvertrag-software"),
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
      title: "Nutzungsrechte Vertrag Vorlage kostenlos (Word) | GründerX",
      description:
        "Vertrag über Nutzungsrechte nach § 31 UrhG als kostenlose Vorlage: Logo, Design, Foto, Text; ausschließlich, unbefristet, Bearbeitung, Vergütung, Namensnennung.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/nutzungsrechte-uebertragung"),
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
      title: "Markenlizenzvertrag Vorlage kostenlos (Word) | GründerX",
      description:
        "Markenlizenzvertrag nach § 30 MarkenG als kostenlose Vorlage: Marke, Waren, Gebiet, Qualitätsvorgaben, Umsatzlizenz, Kontrolle, Rechtsverletzungen, Laufzeit.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/markenlizenzvertrag"),
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
      title: "Content-Lizenzvertrag Vorlage kostenlos (Word) | GründerX",
      description:
        "Content-Lizenz für Foto, Video, Musik und Text als kostenlose Vorlage: Social Media, Werbung, Website, Dauer, Credits, keine Weiterlizenzierung, Vergütung.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/lizenzvertrag-content"),
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
      title: "White-Label-Vertrag Vorlage kostenlos (Word) | GründerX",
      description:
        "White-Label-Vereinbarung als kostenlose Vorlage: Produkt oder Software unter Partnermarke, Lieferung, Preise, Produkthaftung, Support-Stufen, Exklusivität.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/white-label-vereinbarung"),
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
      title: "Software-Entwicklungsvertrag Vorlage kostenlos | GründerX",
      description:
        "Software-Entwicklungsvertrag als kostenlose Vorlage: Pflichtenheft, Meilensteine, Abnahme, Festpreis oder Aufwand, Rechte am Quellcode, Gewährleistung.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/auftragsentwicklung-software"),
  },
];
