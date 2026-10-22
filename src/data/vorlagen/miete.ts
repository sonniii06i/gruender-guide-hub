import { VORLAGEN_HINWEIS, type Vorlage } from "./types";

// Miete & Nutzung: Büro, Lager, Untermiete, Coworking, Leihe, Geräte, Pop-up,
// Arbeitszimmer an die eigene GmbH. Rechtsstand: BGB Mietrecht (§§ 535 ff.,
// § 550, § 578, § 580a, §§ 598 ff.), UStG (§ 4 Nr. 12, § 9). Stand 2026-10.

export const VORLAGEN_MIETE: Vorlage[] = [
  {
    slug: "gewerbemietvertrag",
    titel: "Gewerbemietvertrag (Büro / Laden)",
    kurz: "Vollständiger Mietvertrag für Büro-, Praxis- oder Ladenflächen mit fester Laufzeit, Verlängerungsoption, Nebenkosten, Kaution und Umsatzsteuer-Option.",
    kategorie: "miete",
    dateiname: "Gewerbemietvertrag-Buero-Laden",
    wofuer: [
      "Du mietest dein erstes Büro, Studio, Atelier oder Ladenlokal für dein Unternehmen",
      "Du vermietest selbst eine Gewerbefläche und willst Laufzeit, Nebenkosten und Instandhaltung sauber regeln",
      "Laufzeit über ein Jahr, bei der die Schriftform nach § 550 BGB eingehalten werden muss",
      "Beide Seiten sind Unternehmer und die Umsatzsteuer-Option (§ 9 UStG) soll genutzt werden",
    ],
    enthaelt: [
      "§ 1 Mietsache und Übergabe",
      "§ 2 Nutzungszweck und Konkurrenzschutz",
      "§ 3 Mietzeit, Verlängerungsoption und Kündigung",
      "§ 4 Miete, Umsatzsteuer-Option und Mietanpassung (Index oder Staffel)",
      "§ 5 Nebenkosten",
      "§ 6 Kaution",
      "§ 7 Instandhaltung und Schönheitsreparaturen",
      "§ 8 Bauliche Veränderungen, Werbung, Untervermietung",
      "§ 9 Haftung, Versicherung, Zutritt",
      "§ 10 Rückgabe",
      "§ 11 Schriftform und Schlussbestimmungen",
    ],
    hinweise: [
      "Schriftformfalle: Ein Gewerbemietvertrag mit mehr als einem Jahr Laufzeit muss die Schriftform des § 550 BGB wahren (eine Urkunde, alle wesentlichen Punkte, Anlagen fest verbunden oder eindeutig in Bezug genommen). Sonst gilt er als unbefristet und ist nach einem Jahr von beiden Seiten ordentlich kündbar. Jeder Nachtrag muss dieselbe Form wahren; Schriftformheilungsklauseln helfen nach der Rechtsprechung des BGH nicht.",
      "Die Umsatzsteuer-Option nach § 9 UStG ist nur zulässig, wenn der Mieter die Fläche ausschließlich für Umsätze nutzt, die den Vorsteuerabzug nicht ausschließen (§ 9 Abs. 2 UStG). Ärzte, Versicherungsvermittler oder Kleinunternehmer fallen raus – dann bleibt die Miete steuerfrei und der Vermieter verliert seinen Vorsteuerabzug.",
      "Indexmieten mit automatischer Anpassung unterliegen dem Preisklauselgesetz; sie sind in der Regel nur zulässig, wenn der Vermieter mindestens zehn Jahre auf die ordentliche Kündigung verzichtet oder der Mieter die Laufzeit auf mindestens zehn Jahre verlängern kann. Bei kürzeren Verträgen ist die Staffelmiete der sichere Weg.",
      "Schönheitsreparaturen dürfen nur mit flexiblen Fristen („in der Regel“, „bei Bedarf“) auf den Mieter übertragen werden; starre Fristenpläne sind in Formularverträgen unwirksam.",
    ],
    faqs: [
      {
        q: "Gilt der Mieterschutz des Wohnraummietrechts auch für mein Büro?",
        a: "Nein. Für Geschäftsräume gelten die allgemeinen Vorschriften der §§ 535 ff. BGB und über § 578 BGB einzelne Wohnraumregeln (z. B. § 550 Schriftform). Kündigungsschutz, Mietpreisbremse und die Kautionsgrenze von drei Monatsmieten gelten nicht. Fast alles ist frei verhandelbar – darum zählt der Vertragstext umso mehr.",
      },
      {
        q: "Welche Kündigungsfrist gilt, wenn nichts vereinbart ist?",
        a: "Bei unbefristeten Gewerbemietverträgen ist die ordentliche Kündigung nach § 580a Abs. 2 BGB spätestens am dritten Werktag eines Kalendervierteljahres zum Ablauf des nächsten Kalendervierteljahres zulässig, also mit rund sechs Monaten Frist. Bei einem befristeten Vertrag ist eine ordentliche Kündigung während der Laufzeit ausgeschlossen.",
      },
      {
        q: "Soll ich als Mieter die Umsatzsteuer-Option akzeptieren?",
        a: "Wenn du vorsteuerabzugsberechtigt bist, kostet dich die Option nichts: Du zahlst die Umsatzsteuer auf die Miete und holst sie als Vorsteuer zurück. Der Vermieter kann im Gegenzug seine Vorsteuer aus Bau- und Renovierungskosten ziehen. Bist du Kleinunternehmer oder erbringst steuerfreie Umsätze, ist die Option unzulässig und du solltest sie streichen.",
      },
      {
        q: "Was bedeutet Konkurrenzschutz und brauche ich ihn?",
        a: "Konkurrenzschutz verpflichtet den Vermieter, im selben Objekt keine Flächen an direkte Wettbewerber zu vermieten. Nach der Rechtsprechung besteht ein gewisser Schutz auch ohne Vereinbarung, aber sein Umfang ist unklar. Die Vorlage regelt ihn ausdrücklich – als Mieter solltest du den Schutz, als Vermieter den Ausschluss wählen.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Gewerbemietvertrag brauchst",
        text: `Sobald du Räume für dein Unternehmen mietest, die kein Wohnraum sind, brauchst du einen Gewerbemietvertrag: das erste Büro nach der Gründung, ein Atelier oder Studio, eine Praxis, ein Ladenlokal in der Fußgängerzone oder eine Fläche im Gewerbegebiet. Dasselbe gilt umgekehrt, wenn du selbst Eigentümer bist und eine Gewerbefläche an ein anderes Unternehmen vermietest. Dieses Muster ist für beide Seiten gebaut: Es enthält Varianten, bei denen du dich als Mieter oder als Vermieter für die jeweils passende Fassung entscheidest, etwa beim Konkurrenzschutz in § 2 oder bei der Mietanpassung in § 4. Für eine Aktion von wenigen Wochen passt eher der Pop-up-Store-Mietvertrag, für einen einzelnen Schreibtisch in fremden Räumen der Untermietvertrag. Für alles mit fester Laufzeit, Nebenkostenabrechnung und Kaution ist diese Vorlage die richtige Grundlage.`,
      },
      {
        titel: "Was muss in einen Gewerbemietvertrag?",
        text: `Ein Gewerbemietvertrag ist nur so gut, wie seine Lücken klein sind, weil das Gesetz für Geschäftsräume kaum Schutzregeln liefert. Diese Punkte gehören in jeden Mietvertrag für Büro oder Laden, und so findest du sie in der Vorlage:

- Mietsache mit Adresse, Geschoss, Fläche, Grundriss als Anlage und Stellplätzen (§ 1)
- Nutzungszweck und Konkurrenzschutz, wahlweise mit Schutz oder mit Ausschluss (§ 2)
- Feste Laufzeit, Verlängerungsoption und Ausschluss der stillschweigenden Verlängerung (§ 3)
- Nettokaltmiete, Umsatzsteuer-Option, Zahlungstermin und Mietanpassung als Staffel oder Index (§ 4)
- Nebenkosten nach Betriebskostenverordnung, Umlageschlüssel und Abrechnungsfrist (§ 5)
- Kaution mit Höhe, Form und Abrechnungsfrist (§ 6)
- Instandhaltung, Kleinreparaturen und Schönheitsreparaturen mit flexiblen Fristen (§ 7)
- Umbauten, Werbeanlagen und Untervermietung (§ 8)
- Haftung, Versicherungen, Zutrittsrecht und Winterdienst (§ 9)
- Rückgabe, Nutzungsentschädigung und zurückgelassene Gegenstände (§ 10)
- Schriftformklausel, Anlagenverzeichnis und Gerichtsstand (§ 11)

Fehlt einer dieser Punkte, gilt die gesetzliche Regelung, und die ist für Gewerberäume oft überraschend: ohne vereinbarte Laufzeit etwa die Kündigung mit rund sechs Monaten Frist zum Quartalsende.`,
      },
      {
        titel: "Gewerbemietvertrag Muster ausfüllen: Schritt für Schritt",
        text: `Arbeite die Platzhalter in eckigen Klammern von oben nach unten ab. Zuerst die Parteien: Beim Mieter gehören Rechtsform, Vertreter und Handelsregisternummer hinein, damit klar ist, wer haftet. In § 1 beschreibst du die Räume so genau wie im Grundriss, mit Quadratmeterzahl und Stellplatznummern. In § 2 trägst du den konkreten Betrieb ein und streichst die nicht gewählte Konkurrenzschutz-Variante. In § 3 setzt du Beginn, Ende und die Optionsfrist; zwölf Monate vor Ablauf sind üblich, damit beide Seiten planen können. In § 4 trägst du Nettokaltmiete, Vorauszahlung und IBAN ein und entscheidest dich für Staffel oder Index, den Index nur bei mindestens zehn Jahren Laufzeit. In § 5 rechnest du den Umlageschlüssel aus den Flächen aus, in § 6 legst du Höhe und Form der Kaution fest, in § 7 die Grenzen für Kleinreparaturen. Zum Schluss alle Anlagen nummerieren und fest mit dem Vertrag verbinden. Die Vorlage lädst du kostenlos als Word-Datei, PDF oder Text herunter; in Word streichst du nicht gewählte Varianten einfach heraus.`,
      },
      {
        titel: "Typische Fehler im Gewerbemietvertrag und wie du sie vermeidest",
        text: `Der teuerste Fehler ist die verletzte Schriftform: Ein Vertrag über mehr als ein Jahr, bei dem eine Anlage fehlt, ein Nachtrag nur per E-Mail vereinbart wurde oder nicht erkennbar ist, wer für wen unterschrieben hat, gilt als unbefristet und kann nach einem Jahr ordentlich gekündigt werden. Zweiter Klassiker sind Nebenkosten ohne Grenze: Eine Formulierung wie „alle Betriebskosten“ ohne Verweis auf die Betriebskostenverordnung lässt Streit über Verwaltungskosten und Wartung zu; die Vorlage zählt die Posten auf. Dritter Fehler sind starre Fristen bei Schönheitsreparaturen, die in Formularverträgen unwirksam sind; die Vorlage arbeitet mit „in der Regel“ und dem Abnutzungsgrad. Vierter Punkt ist die Umsatzsteuer-Option bei Mietern mit steuerfreien Umsätzen, etwa Ärzten oder Kleinunternehmern; dann ist die Option unzulässig und der Vermieter verliert Vorsteuer. Und schließlich die Übergabe ohne Protokoll: Ohne Fotos und Zählerstände streitet ihr am Ende über jeden Kratzer.`,
      },
      {
        titel: "Rechtliche Grundlagen: Gewerbemiete ohne Wohnraum-Mieterschutz",
        text: `Für Geschäftsräume gelten die allgemeinen Mietvorschriften der §§ 535 ff. BGB. Über § 578 BGB werden einzelne Regeln des Wohnraummietrechts auf Gewerberäume übertragen, vor allem die Schriftform des § 550 BGB für Verträge mit einer Laufzeit über ein Jahr. Nicht übertragen werden Kündigungsschutz, Mietpreisbremse, Kappungsgrenze und die Begrenzung der Kaution auf drei Monatsmieten. Die Kündigungsfrist für unbefristete Gewerbemietverhältnisse steht in § 580a Abs. 2 BGB, die fristlose Kündigung aus wichtigem Grund in § 543 BGB, die stillschweigende Verlängerung in § 545 BGB, die Untervermietung in § 540 BGB und die Nutzungsentschädigung bei verspäteter Rückgabe in § 546a BGB. Die Umsatzsteuer-Option richtet sich nach § 9 UStG, die Steuerfreiheit der Vermietung nach § 4 Nr. 12 UStG. Weil fast alles verhandelbar ist, entscheidet der Vertragstext. GründerX stellt dir dafür den Mustervertrag bereit, ersetzt aber keine Rechtsberatung im Einzelfall.`,
      },
      {
        titel: "Wann die Gewerbemietvertrag-Vorlage nicht reicht",
        text: `Bei Laufzeiten von zehn Jahren und mehr, bei sehr hohen Mieten oder wenn der Vermieter umfangreiche Umbauten für dich ausführt (Mieterausbau, Baukostenzuschuss), solltest du den Vertrag anwaltlich prüfen lassen; dort geht es um Beträge, bei denen eine einzige Klausel mehr kostet als die Beratung. Dasselbe gilt für Indexmieten, weil das Preisklauselgesetz Vorgaben macht, für Verträge in Einkaufszentren mit Betriebspflicht und Umsatzmiete, für Mischobjekte mit Wohnanteil und für Fälle, in denen der Mieter eine Bankbürgschaft statt einer Barkaution stellt und die Bank eigene Texte verlangt. Auch wenn du als Vermieter viele Flächen mit demselben Formular vermietest, lohnt die Prüfung, weil dann die AGB-Kontrolle greift und eine unwirksame Klausel in allen Verträgen gleichzeitig fehlt.`,
      },
    ],
    seo: {
      title: "Gewerbemietvertrag Vorlage kostenlos (Word) | GründerX",
      description:
        "Gewerbemietvertrag für Büro oder Laden als kostenlose Vorlage: Laufzeit, Verlängerungsoption, Nebenkosten, Kaution, USt-Option, Index oder Staffel, § 550 BGB.",
    },
    stand: "2026-10",
    text: `Mietvertrag über Gewerberäume

zwischen

[Firma / Vorname Nachname des Vermieters], [Straße, PLZ Ort], vertreten durch [Name]
– nachfolgend „Vermieter“ –

und

[Firma des Mieters, Rechtsform], [Straße, PLZ Ort], vertreten durch [Name], Amtsgericht [Ort] HRB [Nummer]
– nachfolgend „Mieter“ –

§ 1 Mietsache und Übergabe
(1) Der Vermieter vermietet dem Mieter im Gebäude [Straße, PLZ Ort] die Räume [z. B. „Büroeinheit 2. OG links: drei Büros, Besprechungsraum, Teeküche, WC“] mit ca. [Zahl] m² gemäß Grundriss (Anlage 1) sowie [z. B. „zwei Stellplätze Nr. 4 und 5“] (nachfolgend „Mietsache“).
(2) Die Übergabe erfolgt am [Datum]; der Zustand wird im Übergabeprotokoll (Anlage 2) festgehalten. Der Mieter übernimmt die Mietsache im besichtigten Zustand.

§ 2 Nutzungszweck und Konkurrenzschutz
(1) Die Mietsache wird ausschließlich zum Betrieb von [z. B. „einem Büro für Software-Entwicklung“ / „einem Einzelhandelsgeschäft für Sportbekleidung“] vermietet. Änderungen bedürfen der schriftlichen Zustimmung des Vermieters. Betriebsbezogene Genehmigungen holt der Mieter auf eigene Kosten ein; für die baurechtliche Zulässigkeit der Nutzung als [Büro / Verkaufsfläche] steht der Vermieter ein.
(2) [Variante A:] Der Vermieter vermietet während der Mietzeit im Gebäude keine Räume an Wettbewerber des Mieters im Bereich [Branche]. [Variante B:] Ein Konkurrenzschutz wird nicht gewährt; der Vermieter darf andere Flächen auch an Wettbewerber vermieten.

§ 3 Mietzeit, Verlängerungsoption und Kündigung
(1) Das Mietverhältnis beginnt am [Datum] und wird fest bis zum [Datum] geschlossen. Eine ordentliche Kündigung ist während dieser Zeit ausgeschlossen.
(2) Der Mieter kann das Mietverhältnis [einmal / zweimal] um jeweils [z. B. 5] Jahre zu denselben Bedingungen verlängern (Option), durch schriftliche Erklärung spätestens [z. B. 12] Monate vor Ablauf der jeweiligen Mietzeit.
(3) Wird die Option nicht ausgeübt, endet das Mietverhältnis ohne Kündigung; § 545 BGB ist ausgeschlossen.
(4) Die fristlose Kündigung aus wichtigem Grund (§ 543 BGB) bleibt unberührt, insbesondere bei Verzug des Mieters mit zwei Monatsmieten. Jede Kündigung bedarf der Schriftform.

§ 4 Miete, Umsatzsteuer und Mietanpassung
(1) Die monatliche Nettokaltmiete beträgt [Betrag] EUR, zuzüglich Nebenkostenvorauszahlung von [Betrag] EUR nach § 5 [und Stellplatzmiete von [Betrag] EUR].
(2) Der Vermieter optiert nach § 9 UStG zur Umsatzsteuer; Miete und Nebenkosten sind zuzüglich Umsatzsteuer (derzeit 19 %) zu zahlen. Der Mieter versichert, die Mietsache ausschließlich für Umsätze zu verwenden, die den Vorsteuerabzug nicht ausschließen (§ 9 Abs. 2 UStG), zeigt Änderungen unverzüglich an und ersetzt den Schaden aus einem Wegfall der Option. [Alternative: Die Vermietung ist nach § 4 Nr. 12 UStG umsatzsteuerfrei.]
(3) Die Gesamtmiete ist monatlich im Voraus bis zum dritten Werktag auf das Konto IBAN [IBAN] zu zahlen.
(4) [Variante A – Staffelmiete:] Die Nettokaltmiete erhöht sich ab [Datum] auf [Betrag] EUR und ab [Datum] auf [Betrag] EUR. [Variante B – Indexmiete, nur bei Laufzeit oder Verlängerungsmöglichkeit von mindestens zehn Jahren (Preisklauselgesetz):] Ändert sich der Verbraucherpreisindex für Deutschland gegenüber dem Stand bei Vertragsbeginn oder der letzten Anpassung um mehr als [z. B. 5] Punkte, ändert sich die Nettokaltmiete ab dem Folgemonat im selben Verhältnis.
(5) Aufrechnung und Zurückbehaltung sind nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen zulässig.

§ 5 Nebenkosten
(1) Der Mieter trägt die Betriebskosten nach § 2 Betriebskostenverordnung (u. a. Grundsteuer, Wasser, Heizung, Aufzug, Reinigung, Müll, Versicherungen, Hauswart) sowie zusätzlich [z. B. „Verwaltungskosten von [Betrag] EUR monatlich, Wartung der Klima- und Brandschutzanlagen“]. Strom und Telekommunikation in der Mietsache rechnet der Mieter direkt mit den Versorgern ab.
(2) Umlageschlüssel ist, soweit nicht nach Verbrauch erfasst, das Verhältnis der Mietfläche zur Gesamtfläche ([Zahl] m² von [Zahl] m²). Der Vermieter rechnet jährlich binnen zwölf Monaten nach Ende des Abrechnungszeitraums ab; Nachzahlungen und Guthaben sind binnen vier Wochen auszugleichen. Nach einer Abrechnung darf er die Vorauszahlung angemessen anpassen.

§ 6 Kaution
Der Mieter leistet eine Kaution von [Betrag, z. B. drei Bruttomonatsmieten] EUR [als Barkaution bis zum [Datum] / durch unbefristete selbstschuldnerische Bankbürgschaft]. Eine Barkaution legt der Vermieter getrennt von seinem Vermögen verzinslich an. Nach berechtigter Inanspruchnahme füllt der Mieter sie binnen vier Wochen auf. Die Kaution wird innerhalb von sechs Monaten nach Rückgabe abgerechnet, soweit keine Ansprüche offen sind.

§ 7 Instandhaltung und Schönheitsreparaturen
(1) Der Vermieter hält Dach, Fassade, tragende Teile, Außenfenster, Treppenhaus und die zentralen Versorgungsleitungen bis zum Eintritt in die Mietsache instand.
(2) Der Mieter hält die Mietsache innen (Innentüren, Bodenbeläge, Anstriche, Sanitär, Schalter, Leitungen ab Eintritt) auf eigene Kosten instand und beseitigt Schäden, die er, seine Mitarbeiter, Besucher oder Lieferanten verursachen. Kleinreparaturen an Teilen, die seinem häufigen Zugriff unterliegen, trägt er bis [Betrag, z. B. 150] EUR netto je Fall und [z. B. 8] % der Jahresnettokaltmiete je Jahr.
(3) Der Mieter führt die Schönheitsreparaturen (Streichen von Wänden, Decken, Heizkörpern und Innentüren) durch, wenn der Grad der Abnutzung es erfordert, in der Regel etwa alle [z. B. 5] Jahre; bei Rückgabe nur, soweit sie nach dem Abnutzungsgrad fällig sind.
(4) Mängel und Schäden sind dem Vermieter unverzüglich anzuzeigen.

§ 8 Bauliche Veränderungen, Werbung, Untervermietung
(1) Um- und Einbauten bedürfen der vorherigen schriftlichen Zustimmung des Vermieters; die Kosten trägt der Mieter. Bei Beendigung sind Einbauten auf Verlangen des Vermieters zu entfernen; belässt er sie, zahlt er [keine Entschädigung / den Zeitwert].
(2) Firmenschilder und Werbeanlagen darf der Mieter in handelsüblicher Ausführung nach Abstimmung mit dem Vermieter anbringen; Genehmigungen beschafft der Mieter.
(3) Untervermietung bedarf der vorherigen schriftlichen Zustimmung des Vermieters (§ 540 BGB); sie darf bei gleichem Nutzungszweck nur aus wichtigem Grund verweigert werden. Der Mieter haftet für den Untermieter wie für sich selbst. Rechtsformwechsel und mehrheitlicher Gesellschafterwechsel sind dem Vermieter anzuzeigen.

§ 9 Haftung, Versicherung, Zutritt
(1) Die verschuldensunabhängige Haftung des Vermieters für anfängliche Mängel (§ 536a Abs. 1 BGB) ist ausgeschlossen. Im Übrigen haftet der Vermieter nur bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung wesentlicher Vertragspflichten, dann begrenzt auf den vorhersehbaren, vertragstypischen Schaden; die Haftung für Schäden an Leben, Körper und Gesundheit bleibt unberührt.
(2) Der Mieter versichert seine Einrichtung und Waren (Feuer, Leitungswasser, Sturm, Einbruch) und unterhält eine Betriebshaftpflichtversicherung mit mindestens [Betrag] EUR Deckung.
(3) Der Vermieter darf die Mietsache nach Ankündigung zu Geschäftszeiten betreten, um ihren Zustand zu prüfen, Arbeiten auszuführen oder sie Interessenten zu zeigen; bei Gefahr im Verzug jederzeit. Die Verkehrssicherung des Eingangsbereichs einschließlich Winterdienst übernimmt [der Mieter / der Vermieter].

§ 10 Rückgabe
Bei Beendigung ist die Mietsache geräumt, besenrein und mit allen Schlüsseln zurückzugeben; ein Rückgabeprotokoll wird erstellt. Bei verspäteter Rückgabe schuldet der Mieter die vereinbarte oder ortsübliche Miete als Nutzungsentschädigung (§ 546a BGB). Zurückgelassene Gegenstände darf der Vermieter nach Aufforderung und Ablauf von zwei Wochen auf Kosten des Mieters entfernen.

§ 11 Schriftform und Schlussbestimmungen
(1) Die Parteien kennen die Schriftformvorschrift des § 550 i. V. m. § 578 BGB. Änderungen und Ergänzungen bedürfen der Schriftform, sind als Nachtrag zu bezeichnen und mit diesem Vertrag fest zu verbinden; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Anlagen: Anlage 1 Grundriss, Anlage 2 Übergabeprotokoll, [Anlage 3 Hausordnung].
(3) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam; die unwirksame Bestimmung ist durch eine wirksame zu ersetzen, die dem wirtschaftlichen Zweck am nächsten kommt.
(4) Erfüllungsort ist der Ort der Mietsache. Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort]. Es gilt deutsches Recht. Jede Partei erhält eine unterzeichnete Ausfertigung.

[Ort], den [Datum]


______________________________
[Name], Vermieter


______________________________
[Name, Funktion], für den Mieter

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "untermietvertrag-buero",
    titel: "Untermietvertrag Büro / Arbeitsplatz",
    kurz: "Kurzer Untermietvertrag für ein Büro oder einen einzelnen Arbeitsplatz in fremden Geschäftsräumen – mit Zustimmung des Hauptvermieters und Pauschalmiete.",
    kategorie: "miete",
    dateiname: "Untermietvertrag-Buero-Arbeitsplatz",
    wofuer: [
      "Du hast ein Büro gemietet und vermietest einen Raum oder Schreibtisch an ein anderes Unternehmen oder einen Freelancer",
      "Du ziehst als Gründer in das Büro eines befreundeten Unternehmens und willst eine klare Grundlage",
      "Kurze Kündigungsfristen und eine Pauschale, die Nebenkosten und Mitnutzung abdeckt",
      "Der Hauptvermieter hat der Untervermietung schriftlich zugestimmt oder soll es mit der Anlage tun",
    ],
    enthaelt: [
      "§ 1 Hauptmietverhältnis und Zustimmung des Vermieters",
      "§ 2 Mietgegenstand und Mitnutzung der Gemeinschaftsflächen",
      "§ 3 Nutzungszweck",
      "§ 4 Mietzeit und Kündigung",
      "§ 5 Pauschalmiete, Umsatzsteuer und Kaution",
      "§ 6 Pflichten des Untermieters, Schlüssel, Vertraulichkeit",
      "§ 7 Haftung und Versicherung",
      "§ 8 Rückgabe",
      "§ 9 Schlussbestimmungen",
      "Anlage: Zustimmungserklärung des Hauptvermieters",
    ],
    hinweise: [
      "Ohne Erlaubnis des Hauptvermieters darfst du nicht untervermieten (§ 540 BGB). Prüfe deinen Hauptmietvertrag: Oft ist die Zustimmung bereits geregelt oder an Bedingungen geknüpft. Fehlt sie, droht dir die fristlose Kündigung des Hauptmietvertrags.",
      "Der Untermieter hat keinen Vertrag mit dem Hauptvermieter. Endet dein Hauptmietvertrag, endet faktisch auch die Untermiete: Der Hauptvermieter kann die Räume direkt vom Untermieter herausverlangen (§ 546 Abs. 2 BGB). Die Vorlage koppelt deshalb die Laufzeit an das Hauptmietverhältnis.",
      "Die Pauschalmiete deckt Nebenkosten ab, ohne dass du abrechnen musst. Rechne vorher nach, dass Strom, Internet, Reinigung und Heizung tatsächlich gedeckt sind – nachträgliche Erhöhungen gehen nur mit Zustimmung des Untermieters.",
      "Umsatzsteuer: Hast du im Hauptmietvertrag zur Umsatzsteuer optiert, solltest du auch in der Untermiete optieren, sonst verlierst du den Vorsteuerabzug anteilig. Das geht nur, wenn der Untermieter vorsteuerabzugsberechtigt ist.",
    ],
    faqs: [
      {
        q: "Muss der Hauptvermieter dem Untermietvertrag zustimmen?",
        a: "Ja. Nach § 540 BGB darf der Mieter die Räume ohne Erlaubnis des Vermieters nicht einem Dritten überlassen. Die Zustimmung kann allgemein im Hauptmietvertrag oder einzeln für den konkreten Untermieter erteilt werden. Die Vorlage enthält eine Zustimmungserklärung als Anlage, die du dir vom Vermieter unterschreiben lässt.",
      },
      {
        q: "Welche Kündigungsfrist ist bei einer Untermiete sinnvoll?",
        a: "Bei Büro-Untermieten sind kurze Fristen von einem bis drei Monaten zum Monatsende üblich, weil beide Seiten flexibel bleiben wollen. Vereinbarst du nichts, gilt für Geschäftsräume die gesetzliche Frist des § 580a Abs. 2 BGB von rund sechs Monaten zum Quartalsende – für eine Untermiete meist zu lang.",
      },
      {
        q: "Was passiert mit dem Untermieter, wenn mein Hauptmietvertrag endet?",
        a: "Der Untermieter muss ausziehen, auch wenn sein Untermietvertrag noch läuft, weil du ihm die Räume dann nicht mehr überlassen kannst. Er kann von dir Schadensersatz verlangen, wenn du die Beendigung zu vertreten hast. Die Vorlage regelt, dass die Untermiete automatisch mit dem Hauptmietverhältnis endet und der Untermieter dies kennt.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Untermietvertrag fürs Büro brauchst",
        text: `Du hast mehr Büro gemietet, als du brauchst, ein Raum steht leer, und ein Freelancer oder ein befreundetes Startup will einziehen. Oder umgekehrt: Du bist frisch gegründet und ziehst in das Büro eines anderen Unternehmens, weil ein eigener Gewerbemietvertrag mit fünf Jahren Laufzeit noch zu groß ist. In beiden Fällen bist du nicht Vertragspartner des Eigentümers, sondern Hauptmieter oder Untermieter, und genau dafür ist diese Vorlage gebaut: ein Raum oder ein einzelner Arbeitsplatz, Mitnutzung von Teeküche, WC und Besprechungsraum, eine Pauschalmiete ohne Nebenkostenabrechnung und kurze Kündigungsfristen. Für viele Nutzer mit Zugangskarten und Tarifen passt eher der Coworking-Nutzungsvertrag, für eine ganze Etage mit eigenem Eingang ein vollständiger Gewerbemietvertrag mit Zustimmung des Eigentümers.`,
      },
      {
        titel: "Was muss in einen Untermietvertrag?",
        text: `Ein Untermietvertrag für Büroräume hängt am Hauptmietvertrag, deshalb beginnt die Vorlage genau dort. Diese Punkte gehören hinein:

- Hauptmietverhältnis mit Datum, Hauptvermieter, Laufzeit und dessen schriftliche Zustimmung als Anlage (§ 1)
- Mietgegenstand: Raumnummer oder Arbeitsplatz, Grundriss, mitbenutzte Flächen und Geräte, mitvermietete Möbel, Briefkasten und Geschäftsanschrift (§ 2)
- Nutzungszweck mit Verbot von Lager, Werkstatt, Publikumsverkehr und weiterer Untervermietung (§ 3)
- Mietzeit, Kündigungsfrist und automatisches Ende mit dem Hauptmietverhältnis (§ 4)
- Pauschalmiete, Umsatzsteuer, Fälligkeit und Kaution (§ 5)
- Schlüssel, Zugangszeiten, Hausordnung und Vertraulichkeit im geteilten Büro (§ 6)
- Haftung und Versicherung (§ 7), Rückgabe (§ 8), Schriftform und Anlagen (§ 9)
- Zustimmungserklärung des Hauptvermieters als Anlage 1

Das Herzstück ist die Kopplung an das Hauptmietverhältnis in § 4 Abs. 2: Endet dein Vertrag mit dem Eigentümer, endet auch die Untermiete, und der Untermieter weiß das von Anfang an. Ohne diese Klausel kann er von dir Schadensersatz verlangen, wenn er ausziehen muss.`,
      },
      {
        titel: "Untermietvertrag Muster ausfüllen: so gehst du vor",
        text: `Beginne mit § 1 und hol dir die Daten aus deinem eigenen Mietvertrag: Datum, Name des Hauptvermieters, Laufzeit oder Kündigungsfrist. Lass die Zustimmungserklärung am Ende der Vorlage vom Hauptvermieter unterschreiben, bevor du selbst unterschreibst. In § 2 wählst du Variante A für einen Raum oder Variante B für einen Arbeitsplatz und streichst die andere; trage mitbenutzte Flächen und das Stundenkontingent für den Besprechungsraum ein. Entscheide in § 2 Abs. 4, ob der Untermieter deine Adresse als Geschäftsanschrift nutzen darf; für eine UG oder GmbH ist das wegen des Handelsregisters wichtig. In § 4 setzt du die Kündigungsfrist, meist ein bis drei Monate zum Monatsende. In § 5 rechnest du die Pauschale aus anteiliger Miete plus Strom, Internet, Reinigung und Heizung und legst Umsatzsteuer-Variante und Kaution fest. In § 6 trägst du Schlüsselzahl und Zugangszeiten ein. Das Muster gibt es kostenlos als Word, PDF und Text.`,
      },
      {
        titel: "Typische Fehler bei der Untervermietung von Büroräumen",
        text: `Der schwerste Fehler ist die Untervermietung ohne Erlaubnis: Der Hauptvermieter kann dich abmahnen und im Wiederholungsfall den Hauptmietvertrag fristlos kündigen, und mit ihm fällt auch die Untermiete. Zweiter Fehler ist eine zu knapp gerechnete Pauschale, denn eine Erhöhung geht nach § 5 Abs. 3 nur einvernehmlich; rechne Strom, Internet, Reinigung und Heizung vorher ehrlich durch. Dritter Fehler ist die vergessene Kündigungsfrist: Ohne Regelung gilt für Geschäftsräume die gesetzliche Frist von rund sechs Monaten zum Quartalsende, für eine Untermiete viel zu lang. Vierter Punkt ist die Umsatzsteuer: Hast du im Hauptmietvertrag zur Umsatzsteuer optiert und vermietest ohne Umsatzsteuer unter, verlierst du anteilig den Vorsteuerabzug. Und zuletzt die Übergabe ohne Liste der mitvermieteten Möbel und ohne Fotos, die am Ende jede Diskussion über Schäden entscheiden würde.`,
      },
      {
        titel: "Rechtliche Grundlagen: § 540 BGB und die Stellung des Untermieters",
        text: `Nach § 540 Abs. 1 BGB darf der Mieter den Gebrauch der Mietsache ohne Erlaubnis des Vermieters keinem Dritten überlassen. Nach § 540 Abs. 2 BGB haftet der Hauptmieter für ein Verschulden des Untermieters wie für eigenes; die Vorlage gibt diese Haftung in § 7 an den Untermieter weiter. Der Untermieter hat kein Vertragsverhältnis zum Hauptvermieter; endet das Hauptmietverhältnis, kann der Hauptvermieter die Räume nach § 546 Abs. 2 BGB direkt vom Untermieter herausverlangen. Für Geschäftsräume gelten im Übrigen die §§ 535 ff. BGB und über § 578 BGB einzelne Wohnraumregeln, darunter die Schriftform des § 550 BGB, sobald eine feste Laufzeit über ein Jahr vereinbart wird. Die gesetzliche Kündigungsfrist steht in § 580a Abs. 2 BGB. Umsatzsteuerlich ist die Vermietung nach § 4 Nr. 12 UStG steuerfrei, mit Option nach § 9 UStG, wenn der Untermieter vorsteuerabzugsberechtigt ist. GründerX ist Software und keine Rechtsberatung; im Zweifel lässt du den Vertrag prüfen.`,
      },
      {
        titel: "Wann die Untermietvertrag-Vorlage nicht reicht",
        text: `Die Vorlage ist für einen Raum oder einen Arbeitsplatz mit kurzer Kündigungsfrist gedacht. Vermietest du eine ganze Etage mit eigenem Eingang und fester Laufzeit über ein Jahr unter, brauchst du einen vollständigen Gewerbemietvertrag mit Schriftform und Nebenkostenabrechnung. Ist der Untermieter eine Privatperson, die nicht gewerblich arbeitet, greifen Verbraucherregeln, die hier nicht abgebildet sind. Verbietet dein Hauptmietvertrag die Untervermietung ausdrücklich oder knüpft er sie an Bedingungen, musst du erst dort nachverhandeln. Untervermietest du Räume in deiner Wohnung, gilt Wohnraummietrecht mit eigenen Regeln. Und wenn der Untermieter eigene Einbauten plant oder mehrere Mitarbeiter mitbringt, lohnt sich eine anwaltliche Prüfung, weil dann Arbeitsstättenregeln, Haftung und Rückbau komplizierter werden.`,
      },
    ],
    seo: {
      title: "Untermietvertrag Büro Vorlage kostenlos (Word) | GründerX",
      description:
        "Untermietvertrag für Büro oder Arbeitsplatz als kostenlose Vorlage: Zustimmung des Hauptvermieters, Pauschalmiete inkl. Nebenkosten, kurze Kündigung.",
    },
    stand: "2026-10",
    text: `Untermietvertrag über Büroräume / einen Arbeitsplatz

zwischen

[Firma / Vorname Nachname], [Straße, PLZ Ort], vertreten durch [Name]
– nachfolgend „Hauptmieter“ –

und

[Firma / Vorname Nachname], [Straße, PLZ Ort], vertreten durch [Name]
– nachfolgend „Untermieter“ –

§ 1 Hauptmietverhältnis und Zustimmung des Vermieters
(1) Der Hauptmieter hat die Geschäftsräume [Straße, PLZ Ort, Geschoss] mit Mietvertrag vom [Datum] von [Name des Hauptvermieters] (nachfolgend „Hauptvermieter“) gemietet. Der Hauptmietvertrag läuft [bis zum [Datum] / unbefristet mit einer Kündigungsfrist von [Frist]].
(2) Der Hauptvermieter hat der Untervermietung mit Erklärung vom [Datum] zugestimmt (Anlage 1). Der Untermieter weiß, dass er in keinem Vertragsverhältnis zum Hauptvermieter steht.
(3) Die nutzungsbezogenen Pflichten aus dem Hauptmietvertrag (Nutzungszweck, Hausordnung, Rücksichtnahme) gelten auch für den Untermieter; die maßgeblichen Regelungen sind ihm [als Anlage 2 ausgehändigt / zur Einsicht vorgelegt] worden.

§ 2 Mietgegenstand und Mitnutzung
(1) Der Hauptmieter vermietet dem Untermieter [Variante A: den Raum Nr. [Zahl] mit ca. [Zahl] m² gemäß Grundriss (Anlage 3) / Variante B: den festen Arbeitsplatz Nr. [Zahl] im Raum [Bezeichnung]] zur alleinigen Nutzung.
(2) Der Untermieter darf Eingangsbereich, Flur, Teeküche, WC, [Besprechungsraum bis zu [Zahl] Stunden pro Woche nach Absprache], [Drucker] und [Internetanschluss] mitbenutzen, mit Rücksicht auf den Betrieb des Hauptmieters.
(3) Mitvermietet sind: [z. B. „Schreibtisch, Bürostuhl, Rollcontainer“]; sie bleiben Eigentum des Hauptmieters.
(4) Ein Hinweis am Briefkasten und an der Bürotür ist zulässig, ein Firmenschild an der Fassade nicht. Die Nutzung der Adresse als Geschäftsanschrift (Handelsregister, Impressum) ist [zulässig / nicht zulässig].

§ 3 Nutzungszweck
Die Räume werden ausschließlich als Büro für [Tätigkeit des Untermieters] genutzt. Publikumsverkehr ist [nur nach Absprache] zulässig. Lager-, Werkstatt- und störende Nutzungen sowie eine weitere Untervermietung sind ausgeschlossen.

§ 4 Mietzeit und Kündigung
(1) Das Untermietverhältnis beginnt am [Datum] und läuft auf unbestimmte Zeit. Beide Parteien können mit einer Frist von [z. B. 1 / 3] Monat(en) zum Monatsende schriftlich kündigen[, erstmals zum [Datum]].
(2) Das Untermietverhältnis endet ohne Kündigung spätestens mit dem Hauptmietverhältnis. Der Hauptmieter informiert den Untermieter unverzüglich über eine Kündigung oder Beendigung des Hauptmietvertrags; jede Partei kann dann mit einer Frist von [z. B. 2] Wochen zum Beendigungszeitpunkt des Hauptmietvertrags kündigen.
(3) Die außerordentliche Kündigung aus wichtigem Grund bleibt unberührt, insbesondere bei Zahlungsverzug mit zwei Monatsmieten, erheblicher Störung des Betriebs des Hauptmieters oder Verstoß gegen § 3.

§ 5 Pauschalmiete, Umsatzsteuer und Kaution
(1) Die Miete beträgt pauschal [Betrag] EUR pro Monat [zuzüglich Umsatzsteuer (derzeit 19 %) – nur, wenn der Hauptmieter zur Umsatzsteuer optiert und der Untermieter vorsteuerabzugsberechtigt ist / ohne Umsatzsteuer, § 4 Nr. 12 UStG].
(2) Mit der Pauschale sind alle Nebenkosten abgegolten, insbesondere Heizung, Strom, Wasser, Reinigung der Gemeinschaftsflächen, Internet und die Mitnutzung nach § 2 Abs. 2. Eine Nebenkostenabrechnung findet nicht statt. [Ausgenommen: [z. B. Druckkosten über [Zahl] Seiten pro Monat].]
(3) Die Miete ist monatlich im Voraus bis zum dritten Werktag auf das Konto IBAN [IBAN] zu zahlen; bei Beginn oder Ende innerhalb eines Monats taggenau anteilig. Eine Änderung der Pauschale ist nur einvernehmlich und schriftlich möglich.
(4) Der Untermieter zahlt bis zum [Datum] eine Kaution von [Betrag, z. B. zwei Monatsmieten] EUR. Sie wird nach Beendigung und ordnungsgemäßer Rückgabe innerhalb von [z. B. 4] Wochen zurückgezahlt, soweit keine Ansprüche offen sind.

§ 6 Pflichten des Untermieters, Schlüssel, Vertraulichkeit
(1) Der Untermieter behandelt Räume, Einrichtung und Gemeinschaftsflächen pfleglich, beachtet die Hausordnung [und die Büroordnung des Hauptmieters (Anlage 4)] und meldet Schäden unverzüglich. Bauliche Veränderungen und Einbauten bedürfen der Zustimmung des Hauptmieters.
(2) Der Untermieter erhält [Anzahl] Schlüssel bzw. Zugangskarten und hat Zugang [rund um die Uhr / werktags von [Uhrzeit] bis [Uhrzeit]]. Verlust ist sofort zu melden; die Kosten einer nötigen Änderung der Schließanlage trägt der Untermieter, soweit er den Verlust zu vertreten hat. Beim Verlassen als Letzter sind Fenster und Bürotür zu schließen.
(3) Beide Parteien wahren Stillschweigen über Geschäftsgeheimnisse, Kundendaten und interne Vorgänge, die sie durch die gemeinsame Büronutzung erfahren. Jede Partei sichert ihre eigenen Daten und Geräte selbst und verwahrt vertrauliche Unterlagen verschlossen.

§ 7 Haftung und Versicherung
(1) Der Untermieter haftet für Schäden, die er, seine Mitarbeiter oder Besucher schuldhaft verursachen, und versichert seine eingebrachten Sachen und seinen Betrieb selbst.
(2) Der Hauptmieter haftet nur bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung wesentlicher Vertragspflichten, dann begrenzt auf den vorhersehbaren, vertragstypischen Schaden; die Haftung für Schäden an Leben, Körper und Gesundheit bleibt unberührt. Für eingebrachte Sachen des Untermieters und Ausfälle von Internet, Strom oder Heizung, die er nicht zu vertreten hat, haftet er nicht.

§ 8 Rückgabe
Bei Beendigung gibt der Untermieter den Raum bzw. Arbeitsplatz geräumt, gereinigt und im Übergabezustand unter Berücksichtigung üblicher Abnutzung mit allen Schlüsseln zurück. Bei verspäteter Rückgabe schuldet er für jeden angefangenen Monat die Pauschalmiete als Nutzungsentschädigung.

§ 9 Schlussbestimmungen
(1) Änderungen und Ergänzungen bedürfen der Schriftform; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam; die unwirksame Bestimmung ist durch eine wirksame zu ersetzen, die dem wirtschaftlichen Zweck am nächsten kommt.
(3) Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort]. Es gilt deutsches Recht.
(4) Anlagen: Anlage 1 Zustimmung des Hauptvermieters, [Anlage 2 Auszug Hauptmietvertrag, Anlage 3 Grundriss, Anlage 4 Büroordnung].

[Ort], den [Datum]


______________________________
[Name], Hauptmieter


______________________________
[Name], Untermieter


Anlage 1 – Zustimmungserklärung des Hauptvermieters

Ich/Wir, [Name und Anschrift des Hauptvermieters], Vermieter der Geschäftsräume [Straße, PLZ Ort, Geschoss], stimme/n der Untervermietung [des Raums Nr. [Zahl] / eines Arbeitsplatzes] durch den Mieter [Name des Hauptmieters] an [Name des Untermieters] zum Zweck [Nutzungszweck] zu. Die Zustimmung gilt [bis auf Widerruf aus wichtigem Grund / für die Dauer des Hauptmietvertrags]. Ein Vertragsverhältnis zwischen mir/uns und dem Untermieter wird nicht begründet; der Mieter bleibt für alle Pflichten aus dem Hauptmietvertrag verantwortlich.

[Ort], den [Datum]

______________________________
[Name], Hauptvermieter

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "coworking-nutzungsvertrag",
    titel: "Coworking-Nutzungsvertrag (Flex Desk / Fix Desk)",
    kurz: "Nutzungsvertrag für einen Coworking-Space mit Flex- oder Fix-Desk, Leistungsumfang, Hausordnung, monatlicher Laufzeit, Haftung und Datenschutz.",
    kategorie: "miete",
    dateiname: "Coworking-Nutzungsvertrag",
    wofuer: [
      "Du betreibst einen Coworking-Space oder vermietest freie Schreibtische in deinem Büro an mehrere Nutzer",
      "Du willst Flex Desk (freier Platz nach Verfügbarkeit) und Fix Desk (fester Arbeitsplatz) in einem Vertrag abbilden",
      "Monatlich kündbare Mitgliedschaft mit Zugangskarte, Internet, Druck und Meetingraum-Kontingent",
      "Klare Regeln für Hausordnung, Haftung und den Umgang mit Daten der Nutzer",
    ],
    enthaelt: [
      "§ 1 Vertragsgegenstand und Tarif (Flex Desk / Fix Desk)",
      "§ 2 Leistungen des Betreibers",
      "§ 3 Zugang und Öffnungszeiten",
      "§ 4 Nutzungsentgelt, Zahlung und Kaution",
      "§ 5 Laufzeit und Kündigung",
      "§ 6 Hausordnung und Pflichten des Nutzers",
      "§ 7 Haftung und Versicherung",
      "§ 8 Datenschutz und Vertraulichkeit",
      "§ 9 Beendigung",
      "§ 10 Schlussbestimmungen",
    ],
    hinweise: [
      "Ein Coworking-Vertrag ist ein Mischvertrag: Die Platzüberlassung ist Miete, Internet, Empfang und Druck sind Dienstleistungen. Beim Flex Desk ohne festen Raum ist der mietrechtliche Anteil gering; beim Fix Desk oder einem abgeschlossenen Büro greift das Mietrecht stärker, etwa bei der Kündigungsfrist.",
      "Haftung für Laptops und Unterlagen der Nutzer: Als Betreiber solltest du sie ausschließen, soweit rechtlich möglich. Ein pauschaler Haftungsausschluss für grobe Fahrlässigkeit oder Personenschäden ist in Formularverträgen unwirksam – die Vorlage grenzt deshalb sauber ab.",
      "Nutzer, die Verbraucher sind (z. B. Studierende, die privat arbeiten), haben besondere Rechte (Widerruf bei Online-Abschluss, strengere AGB-Kontrolle). Die Vorlage ist für Unternehmer und Freiberufler gebaut; für Verbraucher brauchst du eine Widerrufsbelehrung.",
      "Datenschutz: Zutrittsprotokolle, WLAN-Logs und Kameras im Space sind personenbezogene Daten. Du brauchst eine Datenschutzinformation nach Art. 13 DSGVO und darfst Kameras nur mit klarer Rechtsgrundlage und Hinweisschild betreiben.",
    ],
    faqs: [
      {
        q: "Ist ein Coworking-Vertrag ein Mietvertrag?",
        a: "Teilweise. Die Überlassung des Arbeitsplatzes ist Miete, die übrigen Leistungen (Internet, Empfang, Reinigung, Kaffee) sind Dienst- oder Werkleistungen. Die Rechtsprechung wendet auf solche Mischverträge das Recht des prägenden Teils an. Beim Flex Desk prägt meist die Dienstleistung, beim festen Büro die Miete.",
      },
      {
        q: "Kann ich als Nutzer den Coworking-Space als Geschäftsadresse nutzen?",
        a: "Nur, wenn der Betreiber es ausdrücklich erlaubt. Viele Spaces bieten das als Zusatzleistung an (Postannahme, Firmenschild). Für die Handelsregisteranmeldung einer UG oder GmbH muss die Adresse eine inländische Geschäftsanschrift sein, unter der Zustellungen möglich sind – das solltest du vertraglich festhalten.",
      },
      {
        q: "Wer haftet, wenn mein Laptop im Coworking gestohlen wird?",
        a: "Grundsätzlich du selbst, sofern der Betreiber nicht grob fahrlässig gehandelt hat, etwa durch unverschlossene Türen trotz Zusage. Die Vorlage schließt die Haftung für eingebrachte Sachen bei einfacher Fahrlässigkeit aus und empfiehlt dem Nutzer eine eigene Inhaltsversicherung.",
      },
      {
        q: "Wie kurz darf die Kündigungsfrist sein?",
        a: "Zwischen Unternehmern ist eine monatliche Kündigung zum Monatsende üblich und zulässig. Bei einem abgeschlossenen Büro mit Mietcharakter gilt ohne Vereinbarung die lange Frist des § 580a Abs. 2 BGB – deshalb sollte die Frist immer ausdrücklich im Vertrag stehen.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Coworking-Vertrag brauchst",
        text: `Du betreibst einen Coworking-Space oder hast in deinem Büro mehrere freie Schreibtische, die du an wechselnde Nutzer vergeben willst: Freelancer, Remote-Mitarbeiter anderer Firmen, Gründer vor dem ersten eigenen Büro. Dann reicht ein einfacher Untermietvertrag nicht, weil du keine bestimmten Räume überlässt, sondern ein Paket aus Arbeitsplatz, Internet, Drucken, Meetingräumen und Empfang. Genau dieses Paket bildet die Vorlage ab, mit zwei Tarifen in § 1: Flex Desk für einen jeweils freien Platz nach Verfügbarkeit und Fix Desk für einen fest zugewiesenen Schreibtisch. Auch als Nutzer kannst du das Muster nehmen, um das Angebot eines Space zu prüfen: Steht drin, was im Preis enthalten ist, wie schnell du kündigen kannst und wer haftet, wenn dein Laptop verschwindet?`,
      },
      {
        titel: "Was gehört in einen Coworking-Nutzungsvertrag?",
        text: `Ein Coworking-Vertrag regelt mehr als Miete. Diese Abschnitte brauchst du, und so sind sie in der Vorlage aufgebaut:

- Vertragsgegenstand und gewählter Tarif, persönliche Nutzung, Gästeregelung, Klarstellung, dass kein Mietverhältnis über bestimmte Räume entsteht (§ 1)
- Leistungen im Entgelt: Arbeitsplatz, WLAN, Küche, Druckkontingent, Meetingraum-Stunden, Reinigung, optional Postannahme und Geschäftsadresse; Zusatzleistungen nach Preisliste; Einschränkungen bei Wartung mit Minderung (§ 2)
- Zugang, Öffnungszeiten, Zugangskarte und Ersatzkosten (§ 3)
- Nutzungsentgelt, Zahlung per Lastschrift oder Überweisung, Preisanpassung mit Sonderkündigungsrecht, Zugangssperre bei Verzug, Kaution (§ 4)
- Laufzeit, optionale Mindestlaufzeit, Kündigung in Textform, fristlose Kündigung, Tarifwechsel (§ 5)
- Hausordnung, erlaubte Nutzung, Geräte, Internetregeln und Freistellung (§ 6)
- Haftung des Betreibers, eingebrachte Sachen, Versicherung des Nutzers (§ 7)
- Datenschutz, Zutrittsprotokolle, optionale Videoüberwachung, Vertraulichkeit, Referenznennung (§ 8)
- Beendigung mit Rückgabe von Karte und Schließfach, Postnachlauf (§ 9) und Schlussbestimmungen (§ 10)`,
      },
      {
        titel: "Coworking-Vertrag Muster ausfüllen: Flex Desk oder Fix Desk",
        text: `Trage in § 1 den Namen des Space ein und kreuze den Tarif an; beim Fix Desk gehört die Platznummer hinein, beim Flex Desk die Nummer des Schließfachs. In § 2 nennst du ehrlich, was enthalten ist: Bandbreite in Mbit/s, Druckseiten und Meetingraum-Stunden pro Monat und das Buchungssystem. Alles andere kommt in die Preisliste als Anlage 2. In § 3 legst du Zugangszeiten und Empfangszeiten fest und bezifferst den Preis für eine Ersatzkarte. In § 4 setzt du Entgelt, Zahlungsweg, Ankündigungsfrist für Preisänderungen, Sperrfrist bei Verzug und Kaution. In § 5 entscheidest du über eine Mindestlaufzeit und die Kündigungsfrist, üblich ist ein Monat zum Monatsende. In § 8 streichst du den Satz zur Videoüberwachung, wenn du keine Kameras hast, und legst die Datenschutzinformation als Anlage 3 bei. Die Vorlage gibt es kostenlos als Word, PDF und Text.`,
      },
      {
        titel: "Typische Fehler in Coworking-Verträgen",
        text: `Erster Fehler: Leistungen versprechen, die du nicht garantieren kannst, etwa eine feste Internetgeschwindigkeit oder Verfügbarkeit; die Vorlage nennt Richtwerte ohne Zusicherung und regelt Ausfälle über die Minderung in § 2 Abs. 3. Zweiter Fehler: ein pauschaler Haftungsausschluss für alles. Ein Ausschluss für grobe Fahrlässigkeit oder Personenschäden ist in Formularverträgen unwirksam und reißt im Streit die ganze Klausel mit; die Vorlage grenzt deshalb in § 7 sauber ab. Dritter Fehler: Preisänderungen ohne Sonderkündigungsrecht des Nutzers. Vierter Fehler: Kameras, Zutrittsprotokolle und WLAN-Logs ohne Datenschutzinformation und Hinweisschilder. Fünfter Fehler: Verbraucher mit demselben Vertrag aufnehmen wie Unternehmer; Studierende oder privat Arbeitende haben bei Online-Abschluss ein Widerrufsrecht und strengere AGB-Kontrolle. Und schließlich die vergessene Kündigungsfrist, die bei einem Fix Desk mit Mietcharakter sonst sehr lang werden kann.`,
      },
      {
        titel: "Rechtliche Grundlagen: Mischvertrag aus Miete und Dienstleistung",
        text: `Ein Coworking-Vertrag ist ein typengemischter Vertrag: Die Überlassung des Arbeitsplatzes folgt dem Mietrecht der §§ 535 ff. BGB, Internet, Empfang, Reinigung und Druck sind Dienstleistungen nach § 611 BGB. Die Rechtsprechung wendet auf solche Verträge das Recht des prägenden Teils an; beim Flex Desk prägt meist die Dienstleistung, beim abgeschlossenen Büro die Miete. Dann kann ohne Vereinbarung die Kündigungsfrist des § 580a Abs. 2 BGB gelten, weshalb § 5 der Vorlage die Frist ausdrücklich festlegt. Weil der Vertrag für viele Nutzer gleich verwendet wird, unterliegt er der AGB-Kontrolle der §§ 305 ff. BGB, auch gegenüber Unternehmern. Verzugszinsen zwischen Unternehmern richten sich nach § 288 Abs. 2 BGB. Für Zutrittsdaten, Buchungen und Zahlungsdaten gilt die DSGVO; die Vorlage stützt sich auf Art. 6 Abs. 1 lit. b und f DSGVO und verlangt eine Datenschutzinformation nach Art. 13 DSGVO. GründerX liefert den Mustervertrag, keine Rechtsberatung.`,
      },
      {
        titel: "Wann die Coworking-Vorlage nicht reicht",
        text: `Die Vorlage ist für Unternehmer und Freiberufler gebaut. Nimmst du Verbraucher auf oder schließt du Verträge online über ein Buchungsportal, brauchst du zusätzlich eine Widerrufsbelehrung und verbraucherfeste AGB. Vermietest du abgeschlossene Teambüros mit fester Laufzeit über ein Jahr, gilt Gewerbemietrecht mit Schriftform, dann ist der Gewerbemietvertrag die richtige Vorlage. Bietest du Geschäftsadressen für Handelsregister und Impressum an, solltest du Postannahme, Haftung für Fristversäumnisse und Kündigungsfolgen gesondert regeln. Bei Videoüberwachung, Zutrittssystemen mit biometrischen Daten oder einem Space in mehreren Städten mit zentraler Datenverarbeitung lohnt sich eine Datenschutzberatung. Und wenn du Franchise- oder Partnermodelle mit anderen Betreibern planst, gehört ein Anwalt an den Tisch.`,
      },
    ],
    seo: {
      title: "Coworking-Vertrag Vorlage kostenlos (Word) | GründerX",
      description:
        "Coworking-Nutzungsvertrag als kostenlose Vorlage: Flex Desk oder Fix Desk, Leistungen, Zugang, Hausordnung, monatliche Kündigung, Haftung und Datenschutz.",
    },
    stand: "2026-10",
    text: `Nutzungsvertrag Coworking-Space

zwischen

[Firma des Betreibers, Rechtsform], [Straße, PLZ Ort], vertreten durch [Name]
– nachfolgend „Betreiber“ –

und

[Firma / Vorname Nachname des Nutzers], [Straße, PLZ Ort], [USt-IdNr.]
– nachfolgend „Nutzer“ –

§ 1 Vertragsgegenstand und Tarif
(1) Der Betreiber betreibt den Coworking-Space „[Name]“ in [Straße, PLZ Ort] (nachfolgend „Space“). Der Nutzer darf den Space nach Maßgabe dieses Vertrags und der Hausordnung (Anlage 1) als Arbeitsplatz nutzen.
(2) Gebuchter Tarif:
   [ ] Flex Desk: Nutzung eines jeweils freien, nicht zugewiesenen Arbeitsplatzes im offenen Bereich nach Verfügbarkeit. Persönliche Gegenstände sind nach Arbeitsende mitzunehmen oder im Schließfach Nr. [Zahl] zu verwahren.
   [ ] Fix Desk: Nutzung des fest zugewiesenen Arbeitsplatzes Nr. [Zahl] im Bereich [Bezeichnung] zur alleinigen Nutzung einschließlich Rollcontainer. Der Betreiber darf den Platz aus betrieblichen Gründen mit [z. B. 2] Wochen Ankündigung gegen einen gleichwertigen tauschen.
(3) Die Nutzung ist persönlich; der Zugang darf nicht an Dritte weitergegeben werden. Gäste dürfen nach Anmeldung am Empfang für Besprechungen mitgebracht werden, aber keinen Arbeitsplatz dauerhaft belegen.
(4) Dieser Vertrag begründet kein Mietverhältnis über bestimmte Räume; mietrechtliche Vorschriften gelten nur, soweit dieser Vertrag nichts anderes bestimmt.

§ 2 Leistungen des Betreibers
(1) Im Nutzungsentgelt enthalten sind: Arbeitsplatz mit Tisch und Bürostuhl; Internetzugang über WLAN [und LAN am Fix Desk] mit üblicherweise [Zahl] Mbit/s ohne Zusicherung einer bestimmten Verfügbarkeit; Teeküche mit Kaffee, Tee und Wasser; Drucken, Kopieren und Scannen bis zu [Zahl] Seiten pro Monat; Besprechungsräume bis zu [Zahl] Stunden pro Monat nach Buchung über [Buchungssystem]; Reinigung, Strom, Heizung und Klimatisierung; [Postannahme und Nutzung der Adresse als Geschäftsadresse].
(2) Zusatzleistungen (weitere Meetingraum-Stunden, Farbdruck, Schließfach, Telefonkabine, Parkplatz) werden nach Preisliste (Anlage 2) abgerechnet.
(3) Der Betreiber darf Leistungen für Wartung, Umbau oder aus Sicherheitsgründen vorübergehend einschränken und kündigt dies mindestens [z. B. 3] Werktage vorher an. Dauert eine erhebliche Einschränkung länger als [z. B. 3] aufeinanderfolgende Werktage, mindert sich das Entgelt anteilig.

§ 3 Zugang und Öffnungszeiten
(1) Der Space ist zugänglich [rund um die Uhr mit persönlicher Zugangskarte / Montag bis Freitag von [Uhrzeit] bis [Uhrzeit]]. Der Empfang ist werktags von [Uhrzeit] bis [Uhrzeit] besetzt.
(2) Der Nutzer erhält eine persönliche, nicht übertragbare Zugangskarte bzw. einen Zugangscode. Verlust ist unverzüglich zu melden; eine Ersatzkarte kostet [Betrag] EUR. Außerhalb der Empfangszeiten schließt der Nutzer beim Verlassen Türen und bedient die Alarmanlage gemäß Hausordnung.

§ 4 Nutzungsentgelt, Zahlung und Kaution
(1) Das monatliche Nutzungsentgelt beträgt [Betrag] EUR zuzüglich Umsatzsteuer (derzeit 19 %). Zusatzleistungen werden monatlich nachträglich abgerechnet.
(2) Das Entgelt ist monatlich im Voraus fällig und wird [per SEPA-Lastschrift zum [Tag] eingezogen / bis zum dritten Werktag auf das Konto IBAN [IBAN] überwiesen]. Bei Beginn oder Ende innerhalb eines Monats wird taggenau abgerechnet.
(3) Der Betreiber kann das Entgelt mit [z. B. 2] Monaten Ankündigung zum Monatsbeginn anpassen; der Nutzer kann dann zum Änderungszeitpunkt außerordentlich kündigen.
(4) Bei Zahlungsverzug darf der Betreiber den Zugang nach Mahnung und Ablauf von [z. B. 7] Tagen bis zum Ausgleich sperren; die Zahlungspflicht bleibt bestehen. Verzugszinsen betragen 9 Prozentpunkte über dem Basiszinssatz (§ 288 Abs. 2 BGB).
(5) Der Nutzer zahlt bei Vertragsbeginn eine Kaution von [Betrag, z. B. ein Monatsentgelt] EUR, die nach Vertragsende und Rückgabe von Zugangskarte und Schlüsseln innerhalb von [z. B. 4] Wochen zurückgezahlt wird, soweit keine Ansprüche offen sind.

§ 5 Laufzeit und Kündigung
(1) Der Vertrag beginnt am [Datum] und läuft auf unbestimmte Zeit. [Optional: Mindestlaufzeit [z. B. 3] Monate.] Beide Parteien können mit einer Frist von [z. B. 1] Monat zum Monatsende in Textform (E-Mail genügt) kündigen.
(2) Der Betreiber kann fristlos kündigen, wenn der Nutzer trotz Abmahnung wiederholt gegen die Hausordnung verstößt, andere Nutzer erheblich stört, den Zugang Dritten überlässt oder mit zwei Monatsentgelten in Verzug ist. Der Nutzer kann fristlos kündigen, wenn der Betreiber die Leistungen trotz Abmahnung über [z. B. 2] Wochen nicht erbringt.
(3) Ein Tarifwechsel ist nach Verfügbarkeit zum Monatsbeginn in Textform möglich.

§ 6 Hausordnung und Pflichten des Nutzers
(1) Der Nutzer beachtet die Hausordnung (Anlage 1), insbesondere Ruhe- und Telefonzonen, Nutzung von Küche und Meetingräumen, Gäste und Sicherheit. Der Betreiber darf sie mit [z. B. 2] Wochen Ankündigung ändern, soweit das zumutbar ist.
(2) Der Space darf nur für berufliche oder gewerbliche Tätigkeiten genutzt werden. Unzulässig sind rechtswidrige Tätigkeiten, erheblicher Publikumsverkehr, Lärm, Gerüche, Gefahrstoffe und unerwünschter Vertrieb an andere Nutzer. Telefonate und Videokonferenzen finden in den dafür vorgesehenen Zonen statt.
(3) Der Nutzer behandelt Einrichtung und Geräte pfleglich und meldet Schäden unverzüglich. Eigene Möbel, Großgeräte und Veränderungen bedürfen der Zustimmung des Betreibers.
(4) Der Nutzer ist für die Sicherheit seiner Geräte und Daten selbst verantwortlich; das WLAN ist ein geteiltes Netz. Rechtswidrige Nutzung des Internetzugangs, Filesharing geschützter Werke und Spam sind untersagt; der Nutzer stellt den Betreiber von Ansprüchen Dritter aus solchen Verstößen frei.

§ 7 Haftung und Versicherung
(1) Der Betreiber haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden an Leben, Körper und Gesundheit. Bei einfacher Fahrlässigkeit haftet er nur für die Verletzung wesentlicher Vertragspflichten, begrenzt auf den vorhersehbaren, vertragstypischen Schaden.
(2) Für eingebrachte Sachen des Nutzers (Laptops, Telefone, Unterlagen, Wertsachen) übernimmt der Betreiber keine Obhut; er haftet für Verlust oder Beschädigung nur nach Absatz 1. Dem Nutzer wird eine Inhalts- bzw. Elektronikversicherung empfohlen. Für Ausfälle von Internet, Strom oder Klimatisierung durch Dritte oder höhere Gewalt haftet der Betreiber nicht; § 2 Abs. 3 bleibt unberührt.
(3) Der Nutzer haftet für Schäden, die er, seine Gäste oder Mitarbeiter schuldhaft verursachen, und unterhält eine Betriebs- bzw. Berufshaftpflichtversicherung.

§ 8 Datenschutz und Vertraulichkeit
(1) Der Betreiber verarbeitet personenbezogene Daten des Nutzers (Kontakt- und Zahlungsdaten, Zutrittsprotokolle, Buchungen) zur Vertragsdurchführung (Art. 6 Abs. 1 lit. b DSGVO) und zur Sicherheit des Spaces (Art. 6 Abs. 1 lit. f DSGVO). Einzelheiten, Speicherdauer und Betroffenenrechte stehen in der Datenschutzinformation (Anlage 3). [Optional: Im Eingangsbereich besteht eine Videoüberwachung zur Zutrittssicherung mit Hinweisschildern; Aufnahmen werden nach [Zahl] Tagen gelöscht.]
(2) Der Nutzer behandelt Informationen über andere Nutzer und deren Geschäfte vertraulich und fotografiert oder filmt im Space keine anderen Nutzer ohne deren Einwilligung. Der Betreiber nennt Name und Logo des Nutzers nur mit dessen Einwilligung in Textform als Referenz.

§ 9 Beendigung
Mit Vertragsende gibt der Nutzer Zugangskarte und Schlüssel zurück und räumt Arbeitsplatz und Schließfach. Nicht abgeholte Gegenstände darf der Betreiber nach Aufforderung und Ablauf von [z. B. 2] Wochen auf Kosten des Nutzers einlagern oder entsorgen. Nach Vertragsende eingehende Post wird [z. B. 4] Wochen zur Abholung bereitgehalten.

§ 10 Schlussbestimmungen
(1) Änderungen bedürfen der Textform. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam; an ihre Stelle tritt die gesetzliche Regelung.
(3) Gerichtsstand ist, soweit der Nutzer Kaufmann ist, [Ort]. Es gilt das Recht der Bundesrepublik Deutschland.
(4) Anlagen: Anlage 1 Hausordnung, Anlage 2 Preisliste, Anlage 3 Datenschutzinformation.

[Ort], den [Datum]


______________________________
[Name], für den Betreiber


______________________________
[Name], Nutzer

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "mietvertrag-lagerflaeche",
    titel: "Mietvertrag Lagerfläche / Lagerraum",
    kurz: "Mietvertrag über eine Lagerfläche oder einen Lagerraum für Warenbestand mit Zugang, Sicherheit, Versicherung durch den Mieter und Ausschluss von Gefahrstoffen.",
    kategorie: "miete",
    dateiname: "Mietvertrag-Lagerflaeche",
    wofuer: [
      "Du betreibst einen Online-Shop oder Handel und brauchst Platz für Warenbestand, Verpackung und Retouren",
      "Du vermietest eine Halle, Garage oder einen Kellerraum als Lager an ein Unternehmen",
      "Reine Lagernutzung ohne Büro, Werkstatt oder Publikumsverkehr",
      "Versicherung der Waren soll beim Mieter liegen, Gefahrstoffe sollen ausgeschlossen sein",
    ],
    enthaelt: [
      "§ 1 Mietsache, Eigenschaften und Übergabe",
      "§ 2 Nutzungszweck und ausgeschlossene Güter",
      "§ 3 Mietzeit und Kündigung",
      "§ 4 Miete, Nebenkosten, Umsatzsteuer und Kaution",
      "§ 5 Zugang, Schlüssel und Sicherheit",
      "§ 6 Versicherung und Haftung",
      "§ 7 Instandhaltung, Regale und Pflichten des Mieters",
      "§ 8 Vermieterpfandrecht und Untervermietung",
      "§ 9 Rückgabe",
      "§ 10 Schlussbestimmungen",
    ],
    hinweise: [
      "Der Vermieter versichert in der Regel nur das Gebäude. Deine Ware ist nicht mitversichert – du brauchst eine eigene Inhalts- bzw. Warenversicherung (Feuer, Leitungswasser, Einbruch). Prüfe, ob der Versicherer die Lagerbedingungen (Zutritt Dritter, keine Alarmanlage) akzeptiert.",
      "Gefahrstoffe, Akkus in großen Mengen, Druckgasflaschen, Lebensmittel oder verderbliche Waren haben eigene Auflagen (Brandschutz, Lagerklassen, Kühlung). Die Vorlage schließt sie aus; brauchst du sie, muss das ausdrücklich mit dem Vermieter und ggf. der Feuerwehr geklärt werden.",
      "Beachte die Traglast: Hochregale und Paletten mit Getränken oder Fliesen überschreiten schnell die zulässige Bodenbelastung. Lass dir die Werte vom Vermieter geben und schreibe sie in den Vertrag.",
      "Auch beim Lager gilt § 550 BGB: Läuft der Vertrag länger als ein Jahr, muss er schriftlich und vollständig in einer Urkunde festgehalten werden, sonst ist er nach einem Jahr ordentlich kündbar.",
    ],
    faqs: [
      {
        q: "Wer haftet, wenn meine Ware im Lager durch einen Wasserschaden zerstört wird?",
        a: "Der Vermieter nur, wenn er den Schaden verschuldet hat, etwa durch ein bekanntes, nicht repariertes Dachleck. Bei Rohrbruch ohne Verschulden, Hochwasser oder Einbruch trägst du als Mieter den Verlust selbst. Deshalb regelt die Vorlage ausdrücklich, dass du die eingelagerten Waren selbst versicherst.",
      },
      {
        q: "Darf ich im Lager auch Pakete packen und Retouren bearbeiten?",
        a: "Nur, wenn der Nutzungszweck das umfasst. Reine Lagerflächen haben oft keine Arbeitsstätten-Ausstattung (Heizung, Tageslicht, Sanitärräume), die bei dauerhaften Arbeitsplätzen nach der Arbeitsstättenverordnung nötig ist. Die Vorlage erlaubt das Kommissionieren und Verpacken als Nebentätigkeit ohne dauerhafte Arbeitsplätze.",
      },
      {
        q: "Was ist das Vermieterpfandrecht und wie trifft es mich?",
        a: "Nach § 562 BGB hat der Vermieter für seine Forderungen ein Pfandrecht an den eingebrachten Sachen des Mieters. Bei Mietrückstand kann er die Ware zurückhalten und verwerten. Kommissionsware oder unter Eigentumsvorbehalt gelieferte Ware gehört nicht dir und unterliegt dem Pfandrecht nicht – die Vorlage verlangt, dass du dem Vermieter solche Ware auf Nachfrage benennst.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Mietvertrag für eine Lagerfläche brauchst",
        text: `Der Keller ist voll, die Garage auch, und die Pakete für den Online-Shop stapeln sich im Flur: Spätestens dann mietest du ein Lager. Die Vorlage passt für einen abgeschlossenen Lagerraum, eine abgegrenzte Teilfläche in einer Halle, eine Garage oder einen Kellerraum, in dem du Warenbestand, Verpackungsmaterial und Retouren unterbringst. Sie passt auch für die andere Seite: Du hast eine Halle oder einen leeren Raum und vermietest ihn an ein Unternehmen als Lager. Nicht gedacht ist das Muster für Büro, Werkstatt oder Verkauf vor Ort; dafür gibt es den Gewerbemietvertrag. Auch die entgeltliche Einlagerung fremder Waren mit Obhutspflicht ist ein anderer Vertrag, nämlich ein Lagervertrag, bei dem der Lagerhalter die Ware verwahrt.`,
      },
      {
        titel: "Was muss in einen Lagermietvertrag?",
        text: `Bei der Lagermiete entscheiden die Eigenschaften der Fläche und die Frage, wer die Ware versichert. Diese Punkte stehen in der Vorlage:

- Lagerraum oder Teilfläche mit Lageplan, Zufahrt, Torbreite, lichte Höhe, zulässige Bodenbelastung, Heizung und Strom (§ 1)
- Nutzungszweck mit Art der Waren, erlaubte Nebentätigkeiten wie Kommissionieren und Verpacken, Liste der ausgeschlossenen Güter von Gefahrstoffen bis Lebensmitteln, Brandschutz- und Hallenordnung (§ 2)
- Mietzeit als unbefristeter Vertrag mit Kündigungsfrist oder als befristeter Vertrag mit automatischer Verlängerung (§ 3)
- Miete netto je Quadratmeter, enthaltene Nebenkosten, Stromabrechnung, Umsatzsteuer-Variante und Kaution (§ 4)
- Zugangszeiten, Anlieferungen, Schlüssel, Alarmanlage und Ausschluss von Bewachung und Obhut (§ 5)
- Versicherung der Waren durch den Mieter mit Regressverzicht, Haftung beider Seiten (§ 6)
- Instandhaltung, standsichere Regale, Traglast und Lagerung außerhalb der Fläche (§ 7)
- Vermieterpfandrecht und Untervermietung (§ 8), Rückgabe (§ 9), Schriftform und Anlagen (§ 10)`,
      },
      {
        titel: "Lagerraum Mietvertrag Muster ausfüllen",
        text: `Starte in § 1 mit den technischen Daten, die du dir vom Vermieter geben lässt: Torbreite in Metern, lichte Höhe, Bodenbelastung in Kilogramm je Quadratmeter, Tragkraft des Lastenaufzugs. Diese Zahlen sind später die Grenze für deine Regale und Paletten. In § 2 beschreibst du die Waren konkret, etwa „Textilien, Verpackungsmaterial und Elektronikzubehör“, und streichst aus der Verbotsliste nichts heraus, ohne es mit dem Vermieter zu klären. In § 3 wählst du Variante A für einen unbefristeten Vertrag mit Kündigungsfrist oder Variante B für eine feste Laufzeit mit Verlängerung. In § 4 trägst du die Miete netto und je Quadratmeter ein, entscheidest, ob Strom über Zähler oder Pauschale läuft, und wählst die Umsatzsteuer-Variante. In § 5 regelst du Zugang rund um die Uhr oder zu festen Zeiten und die Zahl der Schlüssel. In § 6 setzt du die Deckungssumme der Betriebshaftpflicht ein. Die Vorlage lädst du kostenlos als Word, PDF oder Text.`,
      },
      {
        titel: "Typische Fehler bei der Lagermiete",
        text: `Der häufigste Fehler: Die Ware ist nicht versichert. Die Gebäudeversicherung des Vermieters deckt das Gebäude, nicht deinen Bestand; bei Rohrbruch, Einbruch oder Brand ohne Verschulden des Vermieters trägst du den Verlust selbst. Zweiter Fehler ist die Traglast: Paletten mit Getränken, Fliesen oder Papier überschreiten schnell die zulässige Bodenbelastung, und Hochregale brauchen einen standsicheren Aufbau. Dritter Fehler sind Gefahrstoffe und große Mengen Lithium-Akkus, die eigene Lagerregeln und Brandschutzauflagen haben; sie gehören nur mit ausdrücklicher Vereinbarung ins Lager. Vierter Fehler ist die stille Umwandlung in einen Arbeitsplatz: Wer dauerhaft im Lager packt, braucht Heizung, Tageslicht und Sanitärräume nach der Arbeitsstättenverordnung. Fünfter Fehler ist die vergessene Schriftform bei Laufzeiten über ein Jahr. Und sechstens: Kommissionsware und Ware unter Eigentumsvorbehalt nicht benennen, obwohl das Vermieterpfandrecht sie nicht erfasst.`,
      },
      {
        titel: "Rechtliche Grundlagen: Gewerbemiete, § 550 BGB und Vermieterpfandrecht",
        text: `Eine Lagerfläche ist ein Geschäftsraum, also gelten die allgemeinen Mietregeln der §§ 535 ff. BGB und über § 578 BGB einzelne Wohnraumvorschriften, vor allem die Schriftform des § 550 BGB für Verträge mit Laufzeit über ein Jahr. Kündigungsschutz und Mietpreisbremse gibt es nicht. Das gesetzliche Vermieterpfandrecht aus § 562 BGB gibt dem Vermieter für seine Forderungen ein Pfandrecht an den eingebrachten Sachen des Mieters; Ware, die dir nicht gehört, fällt nicht darunter, weshalb § 8 der Vorlage die Benennung solcher Waren verlangt. Die Nutzungsentschädigung bei verspäteter Rückgabe steht in § 546a BGB. Die Garantiehaftung des Vermieters für anfängliche Mängel aus § 536a Abs. 1 BGB schließt die Vorlage aus, was zwischen Unternehmern zulässig ist. Umsatzsteuerlich ist die Vermietung nach § 4 Nr. 12 UStG steuerfrei, mit Option nach § 9 UStG. GründerX stellt das Muster bereit; eine Rechtsberatung ersetzt es nicht.`,
      },
      {
        titel: "Wann die Lagerflächen-Vorlage nicht reicht",
        text: `Sobald das Lager mehr als Lager ist, brauchst du einen anderen Vertrag: Bei Büro, Werkstatt oder Verkauf vor Ort den Gewerbemietvertrag, bei der Verwahrung fremder Ware gegen Entgelt einen Lagervertrag mit Obhutspflicht. Bei Gefahrstoffen, Druckgasflaschen, Lebensmitteln, Kühlware oder großen Mengen Lithium-Batterien müssen Lagerklassen, Brandschutz und Behördenauflagen vorher mit dem Vermieter und gegebenenfalls der Feuerwehr geklärt und als Anlage festgehalten werden. Bei Hallen mit Umbauten, Hochregallagern über mehrere Ebenen, Flächen in Logistikparks mit Rampenbetrieb rund um die Uhr oder Laufzeiten ab fünf Jahren lohnt sich die anwaltliche Prüfung. Dasselbe gilt, wenn der Vermieter Index- oder Staffelmieten verlangt oder du selbst in die Halle investierst und wissen willst, was bei Vertragsende mit Einbauten passiert.`,
      },
    ],
    seo: {
      title: "Mietvertrag Lagerfläche Vorlage kostenlos (Word) | GründerX",
      description:
        "Mietvertrag für Lagerfläche oder Lagerraum als kostenlose Vorlage: Fläche, Zugang, Sicherheit, Versicherung der Ware durch den Mieter, keine Gefahrstoffe.",
    },
    stand: "2026-10",
    text: `Mietvertrag über eine Lagerfläche

zwischen

[Firma / Vorname Nachname des Vermieters], [Straße, PLZ Ort], vertreten durch [Name]
– nachfolgend „Vermieter“ –

und

[Firma des Mieters, Rechtsform], [Straße, PLZ Ort], vertreten durch [Name]
– nachfolgend „Mieter“ –

§ 1 Mietsache, Eigenschaften und Übergabe
(1) Der Vermieter vermietet dem Mieter auf dem Grundstück [Straße, PLZ Ort] [den abgeschlossenen Lagerraum Nr. [Zahl] mit ca. [Zahl] m² / eine abgegrenzte Teilfläche von ca. [Zahl] m² in der Halle [Bezeichnung]] gemäß Lageplan (Anlage 1) (nachfolgend „Lagerfläche“).
(2) Eigenschaften: Zufahrt [ebenerdig / über Rampe / über Lastenaufzug mit [Zahl] kg Tragkraft], Torbreite [Zahl] m, lichte Höhe [Zahl] m, zulässige Bodenbelastung [Zahl] kg/m², [beheizt / unbeheizt], [Stromanschluss vorhanden / nicht vorhanden]. Weitere Eigenschaften werden nicht zugesichert; die Lagerfläche ist nicht klimatisiert und nicht für temperatur- oder feuchtigkeitsempfindliche Güter ausgelegt.
(3) Mitbenutzt werden dürfen Zufahrt, Hof zum Be- und Entladen (ohne Dauerparken), [Rampe, Lastenaufzug, WC im Erdgeschoss].
(4) Die Übergabe erfolgt am [Datum]; der Zustand wird im Übergabeprotokoll mit Fotos (Anlage 2) festgehalten. Der Mieter übernimmt die Lagerfläche im besichtigten Zustand.

§ 2 Nutzungszweck und ausgeschlossene Güter
(1) Die Lagerfläche dient ausschließlich der Lagerung von [Art der Waren, z. B. „Textilien, Verpackungsmaterial und Elektronikzubehör“] des Mieters. Kommissionieren, Verpacken und Bereitstellen von Sendungen sind gestattet; dauerhafte Arbeitsplätze, Büro- oder Werkstattnutzung, Verkauf vor Ort und Publikumsverkehr nicht.
(2) Nicht gelagert werden dürfen: Gefahrstoffe und Gefahrgüter, leicht entzündliche, explosive, ätzende oder giftige Stoffe, Druckgasflaschen, Kraftstoffe und Lösungsmittel über haushaltsübliche Mengen, Lithium-Batterien in größeren Mengen ohne gesonderte Vereinbarung, Lebensmittel und verderbliche Waren, lebende Tiere und Pflanzen, Waffen und Munition, Waren, deren Besitz verboten ist, sowie Güter, die Geruch, Ungeziefer oder Feuchtigkeit verursachen können.
(3) Der Mieter hält die zulässige Bodenbelastung ein, hält Fluchtwege, Feuerlöscher, Hydranten und Elektroverteiler frei und beachtet die Brandschutz- und Hallenordnung (Anlage 3). Auf Verlangen legt er ein Verzeichnis der eingelagerten Waren vor, soweit dies für Versicherung, Brandschutz oder Behörden erforderlich ist.

§ 3 Mietzeit und Kündigung
(1) Das Mietverhältnis beginnt am [Datum] und [Variante A: läuft auf unbestimmte Zeit; es kann von beiden Seiten mit einer Frist von [z. B. 3] Monaten zum Monatsende schriftlich gekündigt werden. / Variante B: wird fest bis zum [Datum] geschlossen; es verlängert sich um jeweils [z. B. 12] Monate, wenn es nicht mit einer Frist von [z. B. 3] Monaten zum Ablauf schriftlich gekündigt wird.]
(2) Die fristlose Kündigung aus wichtigem Grund bleibt unberührt, insbesondere wenn der Mieter trotz Abmahnung Güter nach § 2 Abs. 2 lagert, Brandschutzvorgaben verletzt oder mit zwei Monatsmieten in Verzug ist.

§ 4 Miete, Nebenkosten, Umsatzsteuer und Kaution
(1) Die monatliche Miete beträgt [Betrag] EUR netto ([Betrag] EUR je m²). [Optional: Sie erhöht sich ab [Datum] auf [Betrag] EUR netto.]
(2) In der Miete enthalten sind Grundsteuer, Gebäudeversicherung, Instandhaltung des Gebäudes, Beleuchtung der Gemeinschaftsflächen und Hofpflege [sowie Heizung]. Strom in der Lagerfläche wird [über eigenen Zähler / mit einer Pauschale von [Betrag] EUR monatlich] abgerechnet. Verpackungsabfälle entsorgt der Mieter selbst.
(3) [Variante A: Der Vermieter optiert nach § 9 UStG zur Umsatzsteuer; Miete und Nebenkosten sind zuzüglich Umsatzsteuer (derzeit 19 %) zu zahlen. Der Mieter versichert, die Lagerfläche ausschließlich für Umsätze zu verwenden, die den Vorsteuerabzug nicht ausschließen. / Variante B: Die Vermietung ist umsatzsteuerfrei (§ 4 Nr. 12 UStG).]
(4) Die Miete ist monatlich im Voraus bis zum dritten Werktag auf das Konto IBAN [IBAN] zu zahlen. Aufrechnung und Zurückbehaltung sind nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen zulässig.
(5) Der Mieter leistet bis zum [Datum] eine Kaution von [Betrag, z. B. zwei Monatsmieten] EUR, die getrennt vom Vermögen des Vermieters anzulegen und nach Rückgabe innerhalb von [z. B. 8] Wochen abzurechnen ist.

§ 5 Zugang, Schlüssel und Sicherheit
(1) Der Mieter hat Zugang [rund um die Uhr / werktags von [Uhrzeit] bis [Uhrzeit]]. Anlieferungen durch Spediteure sind [jederzeit / werktags zwischen [Uhrzeit] und [Uhrzeit]] zulässig und vom Mieter zu begleiten oder anzumelden.
(2) Der Mieter erhält [Anzahl] Schlüssel bzw. Transponder; Nachfertigungen nur mit Zustimmung des Vermieters. Verlust ist sofort zu melden; die Kosten einer Umrüstung der Schließanlage trägt der Mieter, soweit er den Verlust zu vertreten hat.
(3) Der Mieter verschließt Lagerfläche und Tore beim Verlassen [und bedient die Alarmanlage gemäß Einweisung; von ihm verursachte Fehlalarme gehen zu seinen Lasten]. Eigene Schlösser, Kameras (nur auf die eigene Fläche gerichtet) und Tresore darf er auf eigene Kosten anbringen.
(4) Der Vermieter übernimmt keine Bewachung, Zugangskontrolle oder Obhut für die Waren. Er darf die Lagerfläche nach Ankündigung betreten, um Zustand und Vertragstreue zu prüfen oder Arbeiten auszuführen; bei Gefahr im Verzug jederzeit.

§ 6 Versicherung und Haftung
(1) Der Mieter versichert die eingelagerten Waren und seine Einrichtung auf eigene Kosten gegen Feuer, Leitungswasser, Sturm, Einbruchdiebstahl und Vandalismus und weist dies auf Verlangen nach. Er verzichtet gegenüber dem Vermieter auf Ersatz für Warenschäden, soweit diese durch eine solche Versicherung gedeckt sind oder bei üblicher Versicherung gedeckt wären, es sei denn, der Vermieter hat vorsätzlich oder grob fahrlässig gehandelt. Er unterhält eine Betriebshaftpflichtversicherung mit mindestens [Betrag] EUR Deckung.
(2) Der Vermieter haftet für anfängliche Mängel nur bei Verschulden (§ 536a Abs. 1 BGB ist insoweit ausgeschlossen), im Übrigen nur bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung wesentlicher Vertragspflichten, dann begrenzt auf den vorhersehbaren, vertragstypischen Schaden; die Haftung für Schäden an Leben, Körper und Gesundheit bleibt unberührt.
(3) Der Mieter haftet für Schäden am Gebäude, an Toren, Rampen, Aufzügen und Hof, die er, seine Mitarbeiter, Lieferanten oder Spediteure verursachen, sowie für Schäden durch unzulässig gelagerte Güter, und stellt den Vermieter von Ansprüchen Dritter und Behörden aus der Lagerung frei.

§ 7 Instandhaltung, Regale und Pflichten des Mieters
(1) Der Vermieter hält Dach, Außenwände, Tore, Rampen, Aufzüge und Versorgungsleitungen bis zur Lagerfläche instand. Der Mieter hält die Lagerfläche innen sauber und frei von Ungeziefer und meldet Mängel, Feuchtigkeit, Schädlinge und Beschädigungen unverzüglich.
(2) Regale und Einbauten stellt der Mieter auf eigene Kosten standsicher auf; Bohrungen in Boden und Wänden bedürfen der Zustimmung des Vermieters. Die Vorschriften für Lagereinrichtungen und die Traglast nach § 1 Abs. 2 sind einzuhalten.
(3) Die Lagerung außerhalb der Mietfläche, insbesondere in Verkehrswegen und vor Toren, ist unzulässig; dort abgestellte Gegenstände darf der Vermieter nach erfolgloser Aufforderung auf Kosten des Mieters entfernen.

§ 8 Vermieterpfandrecht und Untervermietung
(1) Dem Vermieter steht das gesetzliche Pfandrecht an den eingebrachten Sachen des Mieters zu (§ 562 BGB). Der Mieter teilt auf Verlangen mit, welche Waren nicht in seinem Eigentum stehen (Kommissionsware, Eigentumsvorbehalt, Sicherungseigentum).
(2) Untervermietung, Mitbenutzung durch Dritte und entgeltliche Einlagerung fremder Waren bedürfen der vorherigen schriftlichen Zustimmung des Vermieters.

§ 9 Rückgabe
(1) Bei Beendigung gibt der Mieter die Lagerfläche vollständig geräumt, besenrein, frei von Regalen und Einbauten und mit allen Schlüsseln zurück; Bohrlöcher und Beschädigungen beseitigt er fachgerecht. Ein Rückgabeprotokoll wird erstellt.
(2) Bei verspäteter Rückgabe schuldet der Mieter eine Nutzungsentschädigung in Höhe der Miete (§ 546a BGB). Zurückgelassene Waren darf der Vermieter nach Aufforderung und Ablauf von [z. B. 2] Wochen auf Kosten des Mieters einlagern, verwerten oder entsorgen.

§ 10 Schlussbestimmungen
(1) Änderungen und Ergänzungen bedürfen der Schriftform; das gilt auch für diese Klausel. Die Parteien kennen § 550 BGB und werden Nachträge als solche kennzeichnen und mit diesem Vertrag verbinden. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam; die unwirksame Bestimmung ist durch eine wirksame zu ersetzen, die dem wirtschaftlichen Zweck am nächsten kommt.
(3) Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort]. Es gilt deutsches Recht.
(4) Anlagen: Anlage 1 Lageplan, Anlage 2 Übergabeprotokoll, Anlage 3 Brandschutz- und Hallenordnung.

[Ort], den [Datum]


______________________________
[Name], Vermieter


______________________________
[Name, Funktion], für den Mieter

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "leihvertrag",
    titel: "Leihvertrag (unentgeltliche Überlassung)",
    kurz: "Leihvertrag nach § 598 BGB für die kostenlose Überlassung von Geräten, Maschinen oder Fahrzeugen zwischen Unternehmen oder vom Gesellschafter an die eigene Gesellschaft.",
    kategorie: "miete",
    dateiname: "Leihvertrag-unentgeltlich",
    wofuer: [
      "Du stellst deiner UG oder GmbH als Gesellschafter deinen Laptop, dein Auto oder Werkzeug kostenlos zur Verfügung",
      "Ein befreundetes Unternehmen leiht dir eine Maschine, einen Anhänger oder Messe-Equipment ohne Entgelt",
      "Die Nutzung ist zeitlich begrenzt und der Gegenstand soll unverändert zurückgegeben werden",
      "Du willst Haftung, Pflege und Rückgabe klar regeln, damit aus Freundschaft kein Streit wird",
    ],
    enthaelt: [
      "§ 1 Leihgegenstand und Zustand",
      "§ 2 Unentgeltlichkeit und Zweck",
      "§ 3 Dauer der Leihe und Rückforderung",
      "§ 4 Pflichten des Entleihers (Gebrauch, Erhaltung, Kosten)",
      "§ 5 Überlassung an Dritte",
      "§ 6 Haftung und Versicherung",
      "§ 7 Rückgabe",
      "§ 8 Schlussbestimmungen",
    ],
    hinweise: [
      "Leihe ist immer unentgeltlich (§ 598 BGB). Sobald irgendeine Gegenleistung fließt – Geld, Dienstleistung, Kostenpauschale über die reinen Erhaltungskosten hinaus – ist es Miete mit allen Folgen (Gewährleistung, Umsatzsteuer). Die Vorlage hält die Unentgeltlichkeit ausdrücklich fest.",
      "Der Verleiher haftet nur für Vorsatz und grobe Fahrlässigkeit (§ 599 BGB); arglistig verschwiegene Mängel muss er aber ersetzen (§ 600 BGB). Der Entleiher trägt die gewöhnlichen Erhaltungskosten (§ 601 BGB) und haftet für jede schuldhafte Beschädigung.",
      "Gesellschafter leiht an GmbH: Die kostenlose Nutzungsüberlassung ist steuerlich keine verdeckte Einlage (kein einlagefähiger Vorteil), die GmbH kann also keine Abschreibung oder Miete absetzen. Willst du Kosten in der GmbH geltend machen, brauchst du einen entgeltlichen Mietvertrag zu fremdüblichen Konditionen.",
      "Bei Fahrzeugen bleibt der Halter (Versicherung, Steuer, Bußgelder) der Verleiher. Kläre vorher mit der Kfz-Versicherung, ob der Entleiher und seine Mitarbeiter als Fahrer mitversichert sind; sonst droht Regress.",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen Leihe und Miete?",
        a: "Leihe ist die unentgeltliche Gebrauchsüberlassung (§§ 598 ff. BGB), Miete die entgeltliche (§§ 535 ff. BGB). Bei der Leihe haftet der Verleiher nur für Vorsatz und grobe Fahrlässigkeit und kann den Gegenstand unter bestimmten Umständen vorzeitig zurückfordern. Bei der Miete schuldet der Vermieter den mangelfreien Zustand während der gesamten Laufzeit.",
      },
      {
        q: "Kann der Verleiher den Gegenstand jederzeit zurückverlangen?",
        a: "Nicht beliebig. Ist eine Dauer vereinbart, kann der Verleiher nur vorzeitig kündigen, wenn er den Gegenstand wegen eines unvorhergesehenen Umstands selbst braucht, der Entleiher vertragswidrig gebraucht oder ihn unbefugt einem Dritten überlässt, oder der Entleiher stirbt (§ 605 BGB). Ist keine Dauer bestimmt und ergibt sie sich nicht aus dem Zweck, kann der Verleiher jederzeit zurückfordern (§ 604 Abs. 3 BGB).",
      },
      {
        q: "Wer zahlt Reparaturen während der Leihe?",
        a: "Die gewöhnlichen Erhaltungskosten trägt der Entleiher (§ 601 Abs. 1 BGB), also Verbrauchsmaterial, Reinigung, kleine Wartung. Außergewöhnliche Reparaturen, etwa ein Motorschaden ohne Verschulden des Entleihers, muss der Verleiher nach den Regeln der Geschäftsführung ohne Auftrag ersetzen, wenn der Entleiher sie veranlasst (§ 601 Abs. 2 BGB). Die Vorlage regelt die Abgrenzung mit einer Betragsgrenze.",
      },
    ],
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
    seo: {
      title: "Leihvertrag Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "Leihvertrag nach § 598 BGB als kostenlose Vorlage: unentgeltliche Überlassung von Geräten an Unternehmen oder die eigene GmbH, Dauer, Haftung, Rückgabe.",
    },
    stand: "2026-10",
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
  },
  {
    slug: "mietvertrag-geraete",
    titel: "Mietvertrag Geräte & Equipment (B2B)",
    kurz: "Mietvertrag für Kamera, Maschine, Fahrzeug oder sonstiges Equipment zwischen Unternehmen mit Mietzeit, Mietzins, Kaution, Übergabeprotokoll, Haftung und Verzug.",
    kategorie: "miete",
    dateiname: "Mietvertrag-Geraete-Equipment",
    wofuer: [
      "Du vermietest Kamera- und Tontechnik, Werkzeuge, Maschinen oder Veranstaltungstechnik an andere Unternehmen",
      "Du mietest für ein Projekt einen Transporter, eine Maschine oder ein Messe-Set und willst die Haftung sauber verteilen",
      "Tages-, Wochen- oder Monatsmiete mit Kaution, Übergabeprotokoll und klarer Rückgaberegel",
      "Beide Seiten handeln als Unternehmer, Verbraucherrecht spielt keine Rolle",
    ],
    enthaelt: [
      "§ 1 Mietgegenstand und Übergabeprotokoll",
      "§ 2 Mietzeit, Verlängerung und Kündigung",
      "§ 3 Mietzins, Umsatzsteuer, Zahlung und Verzug",
      "§ 4 Kaution",
      "§ 5 Übergabe, Einweisung und Mängel",
      "§ 6 Pflichten des Mieters und Einsatzort",
      "§ 7 Haftung, Versicherung und Diebstahl",
      "§ 8 Rückgabe und Verspätung",
      "§ 9 Eigentum und Zugriff Dritter",
      "§ 10 Schlussbestimmungen",
    ],
    hinweise: [
      "Das Übergabeprotokoll mit Fotos und Seriennummern ist bei Gerätemiete das wichtigste Dokument. Ohne Protokoll kannst du als Vermieter Schäden kaum nachweisen und als Mieter nicht belegen, dass die Kratzer schon da waren.",
      "Die verschuldensunabhängige Haftung des Vermieters für anfängliche Mängel (§ 536a Abs. 1 BGB) ist für Vermieter teuer: Fällt die Maschine wegen eines verborgenen Fehlers aus, haftet er auch ohne Verschulden für den Produktionsausfall. Die Vorlage schließt sie aus, was zwischen Unternehmern zulässig ist.",
      "Verzugszinsen zwischen Unternehmern betragen 9 Prozentpunkte über dem Basiszinssatz plus 40 EUR Pauschale (§ 288 Abs. 2 und 5 BGB). Die Vorlage verweist darauf, statt eigene Sätze zu erfinden.",
      "Vermietung beweglicher Sachen ist umsatzsteuerpflichtig (19 %), anders als die Vermietung von Grundstücken. Als Kleinunternehmer (§ 19 UStG) weist du keine Umsatzsteuer aus; dann die Klausel anpassen.",
    ],
    faqs: [
      {
        q: "Wer haftet, wenn das gemietete Gerät beim Mieter gestohlen wird?",
        a: "Der Mieter muss das Gerät zurückgeben; kann er das nicht, haftet er auf Ersatz, wenn er den Diebstahl zu vertreten hat, etwa weil er das Gerät unverschlossen im Auto gelassen hat. Die Vorlage legt den Wiederbeschaffungswert als Ersatzbetrag fest und verlangt vom Mieter eine angemessene Sicherung. Eine Versicherung kann entweder beim Vermieter mit Selbstbeteiligung oder beim Mieter liegen.",
      },
      {
        q: "Was passiert, wenn der Mieter das Gerät zu spät zurückgibt?",
        a: "Nach § 546a BGB kann der Vermieter für die Dauer der Vorenthaltung mindestens die vereinbarte Miete als Entschädigung verlangen. Die Vorlage sieht zusätzlich vor, dass der Mieter den Schaden ersetzt, wenn der Vermieter wegen der Verspätung einen Folgemieter nicht beliefern kann.",
      },
      {
        q: "Darf ich die Miete mindern, wenn das Gerät nicht richtig funktioniert?",
        a: "Ja, bei einem Mangel, der die Tauglichkeit erheblich mindert, ist die Miete kraft Gesetzes gemindert (§ 536 BGB). Du musst den Mangel aber sofort anzeigen (§ 536c BGB), sonst verlierst du deine Rechte. Die Vorlage gibt dem Vermieter zuerst die Möglichkeit, ein Ersatzgerät zu stellen.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Mietvertrag für Geräte und Equipment brauchst",
        text: `Du vermietest Kamera- und Tontechnik, Werkzeuge, Maschinen, Veranstaltungstechnik oder einen Transporter an andere Unternehmen. Oder du mietest selbst für ein Projekt eine Maschine, ein Messe-Set oder einen Lieferwagen und willst vorher wissen, wer zahlt, wenn das Gerät kaputtgeht, gestohlen wird oder einen Tag zu spät zurückkommt. Für beide Seiten ist dieser Mietvertrag gebaut: feste Mietzeit nach Tagen, Wochen oder Monaten, Mietzins mit Umsatzsteuer, Kaution, Übergabeprotokoll mit Seriennummern, klare Haftungsverteilung und Verzugsregeln. Er gilt zwischen Unternehmern; Verbraucherrecht spielt keine Rolle. Soll ein Gegenstand kostenlos überlassen werden, nimmst du stattdessen den Leihvertrag. Für Räume und Flächen gibt es den Gewerbemietvertrag und den Mietvertrag für Lagerflächen.`,
      },
      {
        titel: "Was muss in einen Geräte-Mietvertrag?",
        text: `Bei beweglichen Sachen geht es vor allem um Zustand, Haftung und Rückgabe. Diese Punkte stehen in der Vorlage:

- Mietgegenstand als Liste mit Hersteller, Modell, Seriennummer und Zubehör, Übergabeprotokoll mit Fotos, Eigentumsvorbehalt des Vermieters (§ 1)
- Mietzeit mit Datum und Uhrzeit, Ort von Abholung und Rückgabe, Verlängerung nur in Textform, Ausschluss der stillschweigenden Verlängerung, Variante für Dauermiete, fristlose Kündigung (§ 2)
- Mietzins netto je Tag, Woche oder Monat, Umsatzsteuer oder Kleinunternehmerregelung, enthaltene und nicht enthaltene Leistungen, Fälligkeit, Verzugszinsen und Stornostaffel (§ 3)
- Kaution mit Form und Rückzahlungsfrist (§ 4)
- Übergabe in geprüftem Zustand, Einweisung, Mängelanzeige, Ersatzgerät oder Reparatur, Minderung und Kündigung bei Ausfall, Ausschluss der Garantiehaftung (§ 5)
- Bestimmungsgemäßer Gebrauch, Fahrerliste, Einsatzort, Verwahrung, Pflege und Freistellung (§ 6)
- Haftung des Mieters mit Wiederbeschaffungswert, Versicherung beim Vermieter oder Mieter, Haftungsgrenze des Vermieters, Polizeianzeige bei Diebstahl (§ 7)
- Rückgabe, Nachrügefrist für verdeckte Schäden, Nutzungsentschädigung und Folgeschaden bei Verspätung, Verjährung (§ 8)
- Eigentum, Pfändung und Insolvenz (§ 9), Schlussbestimmungen mit Ausschluss fremder AGB (§ 10)`,
      },
      {
        titel: "Mietvertrag Equipment ausfüllen: so gehst du vor",
        text: `Fülle § 1 wie eine Packliste aus: jedes Gerät mit Modell und Seriennummer, dazu Akkus, Ladegeräte, Koffer. Was nicht auf der Liste steht, kann am Ende nicht als fehlend berechnet werden. In § 2 trägst du Übergabe und Rückgabe mit Uhrzeit ein und legst fest, ob abgeholt oder geliefert wird. In § 3 setzt du den Mietzins je Tag, Woche oder Monat und die Gesamtsumme, entscheidest zwischen Umsatzsteuer und Kleinunternehmerregelung, listest enthaltene Leistungen wie Verschleiß und Transportkoffer und nicht enthaltene wie Kraftstoff und Bedienpersonal und legst die Stornostaffel fest. In § 4 bestimmst du Kaution und Rückzahlungsfrist. In § 5 setzt du die Frist, innerhalb derer der Vermieter Ersatz stellt. In § 7 vereinbarst du den Wiederbeschaffungswert und wählst Variante A mit Versicherung beim Vermieter und Selbstbeteiligung oder Variante B mit Versicherung durch den Mieter. In § 8 setzt du Nachrügefrist und Mindestbetrag der Nutzungsentschädigung. Kostenlos als Word, PDF und Text.`,
      },
      {
        titel: "Typische Fehler bei der Vermietung von Geräten",
        text: `Der wichtigste Fehler: kein Übergabeprotokoll mit Fotos. Ohne Protokoll kann der Vermieter Schäden nicht beweisen und der Mieter nicht belegen, dass die Kratzer schon da waren. Zweiter Fehler: die Garantiehaftung für anfängliche Mängel nicht ausschließen; dann haftet der Vermieter ohne Verschulden für Produktionsausfälle, wenn das Gerät wegen eines verborgenen Fehlers stehen bleibt. Dritter Fehler: keine Regel für die stillschweigende Verlängerung, sodass aus einer Wochenmiete ein unbefristetes Mietverhältnis wird, wenn der Mieter einfach weiternutzt. Vierter Fehler: der Wiederbeschaffungswert fehlt, und bei Diebstahl streitet ihr über den Zeitwert. Fünfter Fehler: Verzugszinsen und Mahnpauschale selbst erfinden statt auf das Gesetz zu verweisen. Sechster Fehler: als Kleinunternehmer Umsatzsteuer ausweisen oder umgekehrt als Regelunternehmer vergessen, dass die Vermietung beweglicher Sachen immer umsatzsteuerpflichtig ist.`,
      },
      {
        titel: "Rechtliche Grundlagen: Mietrecht für bewegliche Sachen",
        text: `Auch für Geräte gilt das allgemeine Mietrecht der §§ 535 ff. BGB. Der Vermieter schuldet den vertragsgemäßen Zustand während der Mietzeit; bei Mängeln ist die Miete nach § 536 BGB gemindert, und der Mieter muss Mängel nach § 536c BGB unverzüglich anzeigen. Die verschuldensunabhängige Haftung für anfängliche Mängel aus § 536a Abs. 1 BGB ist zwischen Unternehmern abdingbar. Abnutzung durch vertragsgemäßen Gebrauch hat der Mieter nach § 538 BGB nicht zu vertreten. Die stillschweigende Verlängerung regelt § 545 BGB, die Nutzungsentschädigung bei verspäteter Rückgabe § 546a BGB, die sechsmonatige Verjährung von Ersatzansprüchen § 548 BGB. Verzugszinsen und die Pauschale von 40 Euro zwischen Unternehmern stehen in § 288 Abs. 2 und 5 BGB. Die Schriftform des § 550 BGB gilt nur für Räume und Grundstücke, nicht für bewegliche Sachen; deshalb reicht in der Vorlage Textform. Umsatzsteuerlich ist die Vermietung beweglicher Sachen steuerpflichtig, Kleinunternehmer nach § 19 UStG weisen keine Steuer aus. GründerX ist keine Rechtsberatung.`,
      },
      {
        titel: "Wann die Geräte-Mietvertrag-Vorlage nicht reicht",
        text: `Die Vorlage ist für einzelne Mietvorgänge zwischen Unternehmern gedacht. Vermietest du regelmäßig an viele Kunden, brauchst du Mietbedingungen als AGB, die zu deinem Buchungs- und Zahlungsprozess passen und auch gegenüber Verbrauchern halten, inklusive Widerrufsbelehrung bei Online-Abschluss. Bei Fahrzeugen kommen Halterpflichten, Kfz-Versicherung, Schadensabwicklung und Fahrerprüfung hinzu, die ein Autovermietvertrag detaillierter regelt. Bei Baumaschinen, Hebebühnen oder Geräten mit Bedienpersonal spielen Unfallverhütungsvorschriften und die Abgrenzung zum Werkvertrag eine Rolle. Bei hochwertigen Anlagen über lange Laufzeiten mit Kaufoption bist du beim Leasing, das eigene steuerliche und bilanzielle Regeln hat. In all diesen Fällen lohnt sich die anwaltliche Prüfung, bevor das erste Gerät das Lager verlässt.`,
      },
    ],
    seo: {
      title: "Mietvertrag Geräte Vorlage kostenlos (Word) | GründerX",
      description:
        "Mietvertrag für Geräte, Kamera, Maschine oder Fahrzeug (B2B) als kostenlose Vorlage: Mietzeit, Mietzins, Kaution, Übergabeprotokoll, Haftung, Rückgabe.",
    },
    stand: "2026-10",
    text: `Mietvertrag über Geräte / Equipment

zwischen

[Firma des Vermieters, Rechtsform], [Straße, PLZ Ort], vertreten durch [Name]
– nachfolgend „Vermieter“ –

und

[Firma des Mieters, Rechtsform], [Straße, PLZ Ort], vertreten durch [Name], [USt-IdNr.]
– nachfolgend „Mieter“ –

§ 1 Mietgegenstand und Übergabeprotokoll
(1) Der Vermieter vermietet dem Mieter folgende Gegenstände (nachfolgend „Mietgegenstand“):
   a) [Bezeichnung, Hersteller, Modell, Seriennummer, z. B. „Kamera [Modell], S/N [Nummer]“], Zubehör: [Akkus, Ladegerät, Koffer]
   b) [Bezeichnung, z. B. „Objektiv [Modell], S/N [Nummer]“]
   c) [Bezeichnung, z. B. „Transporter [Marke, Modell], Kennzeichen [Kennzeichen], km-Stand [Zahl]“]
(2) Bei Übergabe werden Zustand, Zubehör, Seriennummern, [Kilometerstand / Betriebsstunden] und vorhandene Schäden im Übergabeprotokoll mit Fotos (Anlage 1) festgehalten, das beide Parteien unterzeichnen. Der Mietgegenstand bleibt Eigentum des Vermieters.

§ 2 Mietzeit, Verlängerung und Kündigung
(1) Die Mietzeit beginnt mit der Übergabe am [Datum, Uhrzeit] und endet mit der Rückgabe am [Datum, Uhrzeit] (feste Mietzeit). Abholung und Rückgabe erfolgen [am Sitz des Vermieters, [Adresse] / durch Lieferung an [Adresse] gegen Lieferpauschale nach § 3].
(2) Eine Verlängerung ist nur mit Zustimmung des Vermieters möglich und spätestens [z. B. 2] Werktage vor Ablauf in Textform anzufragen. Ohne Zustimmung gilt die Mietzeit nicht als verlängert, auch wenn der Mieter weiter nutzt; § 545 BGB ist ausgeschlossen.
(3) Eine ordentliche Kündigung während der festen Mietzeit ist ausgeschlossen. [Bei Dauermiete: Das Mietverhältnis läuft auf unbestimmte Zeit und kann mit einer Frist von [z. B. 2] Wochen zum Monatsende in Textform gekündigt werden.]
(4) Die fristlose Kündigung aus wichtigem Grund bleibt unberührt, für den Vermieter insbesondere bei Zahlungsverzug, vertragswidrigem Gebrauch, Überlassung an Dritte, Verbringung ins Ausland ohne Zustimmung oder Insolvenzantrag des Mieters.

§ 3 Mietzins, Umsatzsteuer, Zahlung und Verzug
(1) Der Mietzins beträgt [Betrag] EUR netto je [Tag / Woche / Monat], für die vereinbarte Mietzeit insgesamt [Betrag] EUR netto, zuzüglich Umsatzsteuer (derzeit 19 %). [Bei Kleinunternehmern: Umsatzsteuer wird nach § 19 UStG nicht berechnet.]
(2) Enthalten sind: [z. B. „normaler Verschleiß, zwei Akkus, Transportkoffer“]. Nicht enthalten sind: [z. B. „Verbrauchsmaterial, Kraftstoff, Lieferung und Abholung (Pauschale [Betrag] EUR), Bedienpersonal“].
(3) Der Mietzins ist [bei Übergabe / innerhalb von [z. B. 7] Tagen nach Rechnung / bei Dauermiete monatlich im Voraus] ohne Abzug auf das Konto IBAN [IBAN] zu zahlen.
(4) Bei Zahlungsverzug schuldet der Mieter Verzugszinsen von 9 Prozentpunkten über dem Basiszinssatz und die Pauschale von 40 EUR (§ 288 Abs. 2 und 5 BGB); weiterer Verzugsschaden bleibt vorbehalten. Aufrechnung und Zurückbehaltung sind nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen zulässig.
(5) Sagt der Mieter vor Übergabe ab, schuldet er [bis [Zahl] Tage vor Mietbeginn [Zahl] %, danach [Zahl] %] des Mietzinses, es sei denn, der Vermieter kann anderweitig vermieten; der Nachweis eines geringeren Schadens bleibt dem Mieter vorbehalten.

§ 4 Kaution
Der Mieter leistet vor Übergabe eine Kaution von [Betrag] EUR [in bar / per Überweisung / durch Kreditkartenreservierung] zur Sicherung aller Ansprüche aus diesem Vertrag. Sie wird nach ordnungsgemäßer Rückgabe und Prüfung innerhalb von [z. B. 14] Tagen unverzinst zurückgezahlt, soweit keine Ansprüche bestehen.

§ 5 Übergabe, Einweisung und Mängel
(1) Der Vermieter übergibt den Mietgegenstand funktionsfähig, gereinigt und, soweit vorgeschrieben, geprüft (z. B. DGUV-Prüfung, Hauptuntersuchung). Er weist den Mieter bei Übergabe ein und übergibt die Bedienungsanleitung.
(2) Der Mieter prüft den Mietgegenstand bei Übergabe auf offensichtliche Mängel und Vollständigkeit und hält Beanstandungen im Protokoll fest. Später erkannte Mängel zeigt er unverzüglich in Textform an (§ 536c BGB).
(3) Bei einem vom Mieter nicht zu vertretenden Mangel stellt der Vermieter innerhalb von [z. B. 24] Stunden an Werktagen Ersatz oder repariert. Gelingt dies nicht, mindert sich der Mietzins anteilig; bei vollständigem Ausfall über mehr als [z. B. 2] Werktage kann der Mieter kündigen.
(4) Die verschuldensunabhängige Haftung des Vermieters für anfängliche Mängel (§ 536a Abs. 1 BGB) ist ausgeschlossen.

§ 6 Pflichten des Mieters und Einsatzort
(1) Der Mieter gebraucht den Mietgegenstand nur bestimmungsgemäß, nach Anleitung und Einweisung und durch geeignetes Personal [bei Fahrzeugen: nur durch vorab benannte Fahrer mit gültiger Fahrerlaubnis der Klasse [Klasse]]. Sicherheits- und Unfallverhütungsvorschriften sind einzuhalten.
(2) Einsatzort ist [Adresse]. Verbringung ins Ausland oder an einen anderen Einsatzort bedarf der Zustimmung des Vermieters in Textform.
(3) Der Mieter schützt den Mietgegenstand vor Witterung, Feuchtigkeit, Überlastung und Zugriff Unbefugter, verwahrt ihn außerhalb der Nutzung in verschlossenen Räumen oder Fahrzeugen und lässt ihn nicht unbeaufsichtigt an öffentlichen Orten. Veränderungen, Reparaturen und das Öffnen des Geräts sind nicht gestattet; Störungen meldet er unverzüglich. Die laufende Pflege (Reinigung, [Kraftstoff, Akkuladung]) obliegt dem Mieter.
(4) Der Mieter stellt den Vermieter von Ansprüchen Dritter, Bußgeldern und Gebühren aus dem Gebrauch frei und haftet für Personen, denen er den Gebrauch ermöglicht, wie für sich selbst.

§ 7 Haftung, Versicherung und Diebstahl
(1) Der Mieter haftet für Beschädigung, Verlust und Untergang des Mietgegenstands während der Mietzeit, soweit er sie zu vertreten hat oder durch die geschuldete Sorgfalt hätte abwenden können. Bei Verlust oder Totalschaden ersetzt er den Wiederbeschaffungswert, der mit [Betrag] EUR netto vereinbart wird, soweit er keinen geringeren Wert nachweist; bei Beschädigung die Reparaturkosten zuzüglich Mietausfall während der Reparatur. Verschleiß durch vertragsgemäßen Gebrauch ist ausgenommen (§ 538 BGB).
(2) [Variante A: Der Vermieter unterhält eine [Elektronik- / Maschinenbruch- / Vollkasko-]Versicherung mit Selbstbeteiligung von [Betrag] EUR je Schadensfall. Der Mieter zahlt dafür [Betrag] EUR netto je [Tag / Mietzeit] und trägt im Schadensfall die Selbstbeteiligung sowie nicht gedeckte Schäden (insbesondere Vorsatz, grobe Fahrlässigkeit, fehlende Sicherung). / Variante B: Der Mieter versichert den Mietgegenstand für die Mietzeit auf eigene Kosten zum Wiederbeschaffungswert und weist dies vor Übergabe nach; Entschädigungsansprüche tritt er an den Vermieter ab.]
(3) Der Vermieter haftet für Schäden des Mieters, insbesondere Produktionsausfall und entgangenen Gewinn, nur bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung wesentlicher Vertragspflichten, dann begrenzt auf den vorhersehbaren, vertragstypischen Schaden, höchstens auf [den vereinbarten Mietzins / [Betrag] EUR]. Die Haftung für Schäden an Leben, Körper und Gesundheit und nach dem Produkthaftungsgesetz bleibt unberührt.
(4) Bei Diebstahl, Einbruch, Unfall oder Beschlagnahme schaltet der Mieter unverzüglich die Polizei ein und übermittelt dem Vermieter eine Kopie der Anzeige.

§ 8 Rückgabe und Verspätung
(1) Der Mieter gibt den Mietgegenstand zum vereinbarten Zeitpunkt vollständig, gereinigt, [vollgetankt / mit vollem Akku] und im Zustand des Übergabeprotokolls abzüglich vertragsgemäßer Abnutzung zurück; gespeicherte Daten sichert und löscht er vorher. Ein Rückgabeprotokoll wird erstellt; der Vermieter darf innerhalb von [z. B. 3] Werktagen nicht ohne Weiteres erkennbare Schäden nachträglich rügen. Fehlendes Zubehör wird zum Wiederbeschaffungswert berechnet.
(2) Bei verspäteter Rückgabe schuldet der Mieter für jeden angefangenen Tag den vereinbarten Tagesmietzins, mindestens [Betrag] EUR, als Nutzungsentschädigung (§ 546a BGB) und ersetzt den Schaden, wenn der Vermieter deshalb einen Folgemieter nicht beliefern kann.
(3) Ersatzansprüche des Vermieters wegen Veränderungen oder Verschlechterungen verjähren in sechs Monaten ab Rückgabe (§ 548 BGB).

§ 9 Eigentum und Zugriff Dritter
Der Mieter darf den Mietgegenstand nicht untervermieten, verleihen, verpfänden oder Dritten überlassen und keine Eigentumskennzeichnungen entfernen. Bei Pfändung, Beschlagnahme oder Insolvenz weist er auf das Eigentum des Vermieters hin, informiert ihn unverzüglich und übermittelt die zur Abwehr nötigen Unterlagen.

§ 10 Schlussbestimmungen
(1) Änderungen und Ergänzungen bedürfen der Textform. Mündliche Nebenabreden bestehen nicht; Geschäftsbedingungen des Mieters finden keine Anwendung.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam; an ihre Stelle tritt die gesetzliche Regelung.
(3) Erfüllungsort ist der Sitz des Vermieters. Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort]. Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.
(4) Anlagen: Anlage 1 Übergabeprotokoll mit Fotos, [Anlage 2 Fahrerliste, Anlage 3 Versicherungsbedingungen].

[Ort], den [Datum]


______________________________
[Name, Funktion], für den Vermieter


______________________________
[Name, Funktion], für den Mieter

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "pop-up-store-mietvertrag",
    titel: "Pop-up-Store-Mietvertrag (Kurzzeitmiete Ladenfläche)",
    kurz: "Kurzzeitmietvertrag für eine Ladenfläche als Pop-up-Store mit festem Zeitraum, Pauschalmiete, Einrichtung und Rückbau, Öffnungszeiten, Werbung und Haftung.",
    kategorie: "miete",
    dateiname: "Pop-up-Store-Mietvertrag",
    wofuer: [
      "Du testest dein Produkt oder deine Marke für einige Tage oder Wochen in einem echten Laden",
      "Du vermietest eine leerstehende Ladenfläche zwischen zwei Hauptmietern an Pop-up-Betreiber",
      "Weihnachtsgeschäft, Produktlaunch, Showroom oder Verkaufsaktion in Innenstadtlage oder Einkaufszentrum",
      "Klare Regeln für Einrichtung, Rückbau, Öffnungszeiten und Werbung ohne langen Gewerbemietvertrag",
    ],
    enthaelt: [
      "§ 1 Mietfläche, Ausstattung und Übergabe",
      "§ 2 Mietzeit (fester Zeitraum) und Auf- und Abbautage",
      "§ 3 Nutzungszweck, Sortiment und kein Konkurrenzschutz",
      "§ 4 Pauschalmiete, Umsatzsteuer und Kaution",
      "§ 5 Einrichtung und Rückbau",
      "§ 6 Öffnungszeiten, Betrieb und Hausordnung",
      "§ 7 Werbung und Nutzung des Namens",
      "§ 8 Haftung, Versicherung und Verkehrssicherung",
      "§ 9 Beendigung und vorzeitige Kündigung",
      "§ 10 Schlussbestimmungen",
    ],
    hinweise: [
      "Befristete Verträge enden automatisch mit Ablauf der Zeit (§ 542 Abs. 2 BGB). Schließe die stillschweigende Verlängerung nach § 545 BGB ausdrücklich aus, sonst wird aus der Pop-up-Woche ein unbefristetes Mietverhältnis, wenn der Betreiber einfach weitermacht.",
      "Kein Konkurrenzschutz: Der Vermieter will die Flächen flexibel vermieten, auch an ähnliche Anbieter. Die Vorlage schließt den vertragsimmanenten Konkurrenzschutz aus – als Mieter musst du das wissen, bevor du im Einkaufszentrum neben einem Wettbewerber stehst.",
      "Gewerbeanmeldung und Ladenöffnung: Auch ein Pop-up-Store ist ein Gewerbe am Ort der Fläche. Gewerbeanmeldung (ggf. als Zweigstelle) und die Ladenöffnungszeiten des Bundeslandes gelten. Bei Lebensmitteln kommt die Lebensmittelüberwachung dazu.",
      "Einrichtung und Rückbau sind die häufigste Streitquelle. Lass dir vorher schriftlich bestätigen, was du bohren, kleben und streichen darfst, und halte den Zustand bei Übergabe und Rückgabe mit Fotos fest.",
    ],
    faqs: [
      {
        q: "Brauche ich für einen Pop-up-Store einen Gewerbemietvertrag mit Schriftform nach § 550 BGB?",
        a: "Nein, solange die Mietzeit nicht länger als ein Jahr ist. Die strenge Schriftform greift erst bei Verträgen über ein Jahr. Trotzdem solltest du den Vertrag schriftlich schließen, damit Fläche, Pauschalmiete, Rückbau und Haftung eindeutig geregelt sind.",
      },
      {
        q: "Kann ich den Pop-up-Vertrag vorzeitig kündigen, wenn das Geschäft schlecht läuft?",
        a: "Nicht ordentlich: Ein befristeter Vertrag ist während der Laufzeit nicht kündbar. Die Vorlage bietet eine optionale Ausstiegsklausel gegen eine Abstandszahlung und regelt die außerordentliche Kündigung aus wichtigem Grund. Schlechter Umsatz ist kein wichtiger Grund.",
      },
      {
        q: "Was ist mit Umsatzsteuer bei der Pop-up-Miete?",
        a: "Die Vermietung von Grundstücksflächen ist grundsätzlich umsatzsteuerfrei (§ 4 Nr. 12 UStG); der Vermieter kann zur Steuerpflicht optieren, wenn du vorsteuerabzugsberechtigt bist. Bei Pop-up-Flächen mit umfangreichen Zusatzleistungen (Personal, Technik, Marketing) kann der Vertrag als einheitliche steuerpflichtige Leistung gelten – im Zweifel den Steuerberater fragen.",
      },
      {
        q: "Wer haftet, wenn ein Kunde im Pop-up-Store stürzt?",
        a: "Der Betreiber des Ladens trägt die Verkehrssicherungspflicht für die gemietete Fläche während der Öffnungszeiten, der Vermieter für Gebäude und Gemeinschaftsflächen. Eine Betriebshaftpflichtversicherung ist für den Pop-up-Betreiber Pflicht; die Vorlage verlangt den Nachweis vor Übergabe.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Pop-up-Store-Mietvertrag brauchst",
        text: `Du willst dein Produkt für zwei Wochen in der Innenstadt testen, im Weihnachtsgeschäft eine leere Ladenfläche nutzen, einen Showroom für einen Produktlaunch eröffnen oder eine Verkaufsaktion im Einkaufszentrum fahren. Für solche Zeiträume von wenigen Tagen bis einigen Monaten ist ein normaler Gewerbemietvertrag mit Nebenkostenabrechnung und fünf Jahren Laufzeit zu schwer. Der Pop-up-Store-Mietvertrag ist die passende Kurzzeitmiete: fester Aktionszeitraum, Pauschalmiete mit allen Nebenkosten, Auf- und Abbautage, Regeln für Einrichtung und Rückbau, Öffnungszeiten und Werbung. Er passt auch für Eigentümer und Center-Betreiber, die eine Fläche zwischen zwei Hauptmietern nicht leer stehen lassen wollen und flexibel bleiben müssen, deshalb ausdrücklich ohne Konkurrenzschutz.`,
      },
      {
        titel: "Was muss in einen Pop-up-Mietvertrag?",
        text: `Kurzzeitmiete heißt nicht kurzer Vertrag. Weil alles in wenigen Tagen passiert, müssen Übergabe, Betrieb und Rückbau besonders genau geregelt sein. Das steht in der Vorlage:

- Ladenfläche mit Verkaufs- und Nebenfläche, Lageplan, überlassene Ausstattung, Übergabeprotokoll mit Fotos, keine Zusicherung einer Besucherfrequenz (§ 1)
- Fester Aktionszeitraum ohne Kündigung, Ausschluss der stillschweigenden Verlängerung, Auf- und Abbautage mit oder ohne Miete (§ 2)
- Nutzungszweck und Sortiment, verbotene Nutzungen, Genehmigungen und Ladenöffnungszeiten, ausdrücklicher Ausschluss des Konkurrenzschutzes (§ 3)
- Pauschalmiete inklusive Nebenkosten, Umsatzsteuer-Variante, Zahlung vor Übergabe, Kaution, optionale Umsatzmiete (§ 4)
- Erlaubte und verbotene Einrichtung, Anschlussleistung, vollständiger Rückbau, Ersatzvornahme und Nutzungsentschädigung (§ 5)
- Mindestöffnungszeiten mit Vertragsstrafe, Personal, Reinigung, Anlieferung, Hausordnung, Zutritt des Vermieters (§ 6)
- Werbung im Schaufenster und außen, gegenseitige Namensnennung, Fotos (§ 7)
- Verkehrssicherungspflicht, Betriebshaftpflicht mit Nachweis, eigene Versicherung von Ware und Technik, Haftungsgrenzen des Vermieters (§ 8)
- Beendigung, optionale Rücktrittsklausel gegen Abstand, fristlose Kündigung, Unbenutzbarkeit der Fläche (§ 9), Schlussbestimmungen (§ 10)`,
      },
      {
        titel: "Pop-up-Store Mietvertrag Muster ausfüllen",
        text: `In § 1 trägst du Ladeneinheit, Verkaufsfläche und Nebenfläche ein und listest, was vorhanden ist (Schaufensteranlage, Theke, Regale, Kassenplatz) und was fehlt (Kassensystem, Umkleiden). In § 2 setzt du den Aktionszeitraum und die Auf- und Abbautage mit Uhrzeit und entscheidest, ob diese Tage Miete kosten. In § 3 beschreibst du Sortiment und Marke und trägst das Bundesland für die Ladenöffnungszeiten ein. In § 4 legst du die Pauschalmiete netto fest, wählst die Umsatzsteuer-Variante, setzt Zahlungsstaffel und Kaution und streichst die Umsatzmiete, wenn ihr keine wollt. In § 5 nennst du die zulässige Anschlussleistung in Kilowatt und schreibst auf, was ausnahmsweise gebohrt werden darf. In § 6 trägst du die Mindestöffnungszeiten, die Vertragsstrafe je geschlossenem Tag und die Lieferzone ein. In § 8 setzt du die Deckungssumme der Betriebshaftpflicht. Das Muster gibt es kostenlos als Word, PDF und Text.`,
      },
      {
        titel: "Typische Fehler bei der Kurzzeitmiete einer Ladenfläche",
        text: `Erster Fehler: die stillschweigende Verlängerung nicht ausschließen. Bleibt der Betreiber nach Ablauf einfach drin, kann aus der Pop-up-Woche ein unbefristetes Mietverhältnis werden; § 2 Abs. 1 der Vorlage schließt das aus. Zweiter Fehler: Einrichtung ohne schriftliche Erlaubnis. Gebohrte Wände, geklebte Folien und gestrichene Flächen sind die häufigste Streitquelle bei der Rückgabe. Dritter Fehler: fehlende Gewerbeanmeldung und übersehene Ladenöffnungszeiten, denn auch ein Pop-up-Store ist ein Gewerbe am Ort der Fläche. Vierter Fehler: Konkurrenzschutz voraussetzen und dann neben einem Wettbewerber stehen; die Vorlage schließt ihn ausdrücklich aus, das musst du als Mieter vorher wissen. Fünfter Fehler: keine Betriebshaftpflicht, obwohl der Betreiber während der Öffnungszeiten die Verkehrssicherungspflicht trägt. Und sechstens: Umsatzsteuer nicht klären, wenn der Vermieter Zusatzleistungen wie Personal oder Technik mitliefert.`,
      },
      {
        titel: "Rechtliche Grundlagen: befristete Gewerbemiete ohne § 550 BGB",
        text: `Der Pop-up-Store-Mietvertrag ist ein befristeter Gewerbemietvertrag nach den §§ 535 ff. BGB. Ein auf bestimmte Zeit geschlossenes Mietverhältnis endet nach § 542 Abs. 2 BGB mit Ablauf dieser Zeit, ohne Kündigung; eine ordentliche Kündigung während der Laufzeit gibt es nicht. Setzt der Mieter den Gebrauch fort, verlängert sich das Mietverhältnis nach § 545 BGB auf unbestimmte Zeit, wenn das nicht ausgeschlossen ist. Bei verspäteter Rückgabe schuldet der Mieter nach § 546a BGB mindestens die vereinbarte Miete als Nutzungsentschädigung. Die Schriftform des § 550 BGB greift erst bei Laufzeiten über ein Jahr, deshalb genügt hier Textform für Änderungen. Die Garantiehaftung für anfängliche Mängel aus § 536a Abs. 1 BGB wird ausgeschlossen. Die Gewerbeanmeldung folgt aus § 14 GewO, die Ladenöffnungszeiten aus den Ladenöffnungsgesetzen der Länder. Umsatzsteuerlich ist die Vermietung nach § 4 Nr. 12 UStG steuerfrei, mit Option nach § 9 UStG. GründerX ist Software, keine Rechts- oder Steuerberatung.`,
      },
      {
        titel: "Wann die Pop-up-Vorlage nicht reicht",
        text: `Soll der Store länger als ein Jahr laufen, bist du im Bereich der Schriftform und brauchst den vollständigen Gewerbemietvertrag. Bei Flächen in großen Einkaufszentren liefert der Betreiber oft eigene Verträge mit Betriebspflicht, Werbegemeinschaft und Umsatzmiete; dann prüfst du dessen Text, statt deinen durchzusetzen. Bei Gastronomie, Lebensmittelverkauf oder Alkoholausschank kommen Lebensmittelüberwachung und Gaststättenrecht hinzu, bei Veranstaltungen mit Publikum Versammlungsstätten- und Brandschutzauflagen. Wenn der Vermieter Personal, Kasse, Marketing oder Technik mitliefert, kann aus der Miete eine andere Vertragsart werden, auch umsatzsteuerlich. Und wenn du als Marke mehrere Städte gleichzeitig bespielst oder ein Franchisepartner den Store betreibt, gehört der Vertrag in anwaltliche Hände.`,
      },
    ],
    seo: {
      title: "Pop-up-Store Mietvertrag Vorlage kostenlos | GründerX",
      description:
        "Pop-up-Store-Mietvertrag als kostenlose Vorlage: Zeitraum, Pauschalmiete, Einrichtung und Rückbau, Öffnungszeiten, Werbung, Haftung, kein Konkurrenzschutz.",
    },
    stand: "2026-10",
    text: `Kurzzeitmietvertrag über eine Ladenfläche (Pop-up-Store)

zwischen

[Firma / Vorname Nachname des Vermieters], [Straße, PLZ Ort], vertreten durch [Name]
– nachfolgend „Vermieter“ –

und

[Firma des Mieters, Rechtsform / Vorname Nachname], [Straße, PLZ Ort], vertreten durch [Name]
– nachfolgend „Mieter“ –

§ 1 Mietfläche, Ausstattung und Übergabe
(1) Der Vermieter vermietet dem Mieter die Ladenfläche [Straße, PLZ Ort, Ladeneinheit Nr.] mit ca. [Zahl] m² Verkaufsfläche und ca. [Zahl] m² Nebenfläche (Lager, Personalraum, WC) gemäß Lageplan (Anlage 1) (nachfolgend „Mietfläche“).
(2) Überlassen werden mit: [z. B. „Schaufensteranlage, Deckenbeleuchtung, Theke, [Zahl] Regale, Kassenplatz mit Strom, Internetanschluss“]. Nicht vorhanden: [z. B. „Kassensystem, Warenträger, Umkleiden“].
(3) Die Übergabe erfolgt am [Datum, Uhrzeit]; der Zustand wird im Übergabeprotokoll mit Fotos (Anlage 2) festgehalten. Der Mieter übernimmt die Mietfläche im besichtigten Zustand. Eine bestimmte Besucherfrequenz wird nicht zugesichert. Der Mieter erhält [Anzahl] Schlüssel; Nachfertigungen sind nicht gestattet.

§ 2 Mietzeit und Auf- und Abbautage
(1) Das Mietverhältnis wird fest für den Zeitraum vom [Datum] bis zum [Datum] geschlossen („Aktionszeitraum“). Es endet mit Ablauf dieses Zeitraums ohne Kündigung. Eine stillschweigende Verlängerung nach § 545 BGB ist ausgeschlossen.
(2) Zum Aufbau steht die Mietfläche zusätzlich ab dem [Datum, Uhrzeit], zum Abbau bis zum [Datum, Uhrzeit] zur Verfügung. Für diese Tage wird [keine zusätzliche Miete / eine Miete von [Betrag] EUR je Tag] berechnet.
(3) Eine Verlängerung ist nur schriftlich möglich und spätestens [z. B. 7] Tage vor Ablauf anzufragen; ein Anspruch darauf besteht nicht.

§ 3 Nutzungszweck, Sortiment und Konkurrenzschutz
(1) Die Mietfläche wird ausschließlich zum Betrieb eines temporären Einzelhandelsgeschäfts mit folgendem Sortiment genutzt: [z. B. „Verkauf und Präsentation von Sportbekleidung der Marke [Marke] sowie Produktvorstellungen mit bis zu [Zahl] Personen“]. Änderungen bedürfen der Zustimmung des Vermieters in Textform.
(2) Nicht gestattet sind: Lebensmittelverkauf ohne gesonderte Vereinbarung, Ausschank alkoholischer Getränke, laute Musik oder Veranstaltungen außerhalb der Öffnungszeiten, offene Flammen, Nebelmaschinen und jede Nutzung gegen Hausordnung oder öffentlich-rechtliche Vorschriften.
(3) Der Mieter holt alle erforderlichen Anmeldungen und Genehmigungen (Gewerbeanmeldung, Sondernutzung, ggf. Lebensmittelrecht, GEMA) auf eigene Kosten ein und hält die Ladenöffnungszeiten des Landes [Bundesland] ein.
(4) Ein Konkurrenzschutz wird nicht gewährt. Der Vermieter darf andere Flächen im Gebäude, im Einkaufszentrum oder auf dem Grundstück gleichzeitig an Anbieter gleicher oder ähnlicher Waren vermieten. Der Mieter verzichtet auf Ansprüche aus einem vertragsimmanenten Konkurrenzschutz.

§ 4 Pauschalmiete, Umsatzsteuer und Kaution
(1) Die Miete für den Aktionszeitraum beträgt pauschal [Betrag] EUR netto [(entspricht [Betrag] EUR je Tag)]. Mit ihr sind alle Nebenkosten abgegolten (Heizung, Klimatisierung, Strom, Wasser, Reinigung der Gemeinschaftsflächen, Gebäudeversicherung, Nutzung der Ausstattung). [Ausgenommen: [z. B. „Reinigung der Mietfläche“, „Sicherheitsdienst“, „Werbeflächen nach Preisliste“].]
(2) [Variante A: Der Vermieter optiert nach § 9 UStG; auf die Miete ist Umsatzsteuer (derzeit 19 %) zu zahlen. Der Mieter versichert, die Mietfläche ausschließlich für Umsätze zu verwenden, die den Vorsteuerabzug nicht ausschließen. / Variante B: Die Vermietung ist umsatzsteuerfrei (§ 4 Nr. 12 UStG).]
(3) Die Pauschalmiete ist [zu [Zahl] % binnen [Zahl] Tagen nach Vertragsschluss, im Übrigen bis [Zahl] Tage vor Übergabe / vollständig bis zum [Datum]] auf das Konto IBAN [IBAN] zu zahlen. Die Übergabe erfolgt erst nach vollständigem Eingang von Miete und Kaution.
(4) Der Mieter leistet bis zum [Datum] eine Kaution von [Betrag] EUR zur Sicherung aller Ansprüche, insbesondere wegen Rückbau, Reinigung und Schäden. Sie wird nach Rückgabe und Prüfung innerhalb von [z. B. 4] Wochen zurückgezahlt, soweit keine Ansprüche bestehen.
(5) [Optional – Umsatzmiete: Zusätzlich zahlt der Mieter [Zahl] % des in der Mietfläche erzielten Nettoumsatzes über [Betrag] EUR und legt binnen [z. B. 7] Tagen nach Ende des Aktionszeitraums einen Kassenbericht vor.]

§ 5 Einrichtung und Rückbau
(1) Der Mieter richtet die Mietfläche auf eigene Kosten und eigenes Risiko ein. Zulässig sind frei stehende Möbel, Warenträger, Dekoration, rückstandsfrei entfernbare Folien an Schaufenstern und Wänden sowie der Anschluss eigener Geräte an vorhandene Steckdosen bis zu einer Anschlussleistung von [Zahl] kW.
(2) Ohne vorherige Zustimmung des Vermieters in Textform nicht zulässig sind: Bohren, Nageln und Dübeln, Streichen oder Tapezieren, Eingriffe in Elektro-, Wasser-, Lüftungs- oder Brandmeldeanlagen, Veränderungen an Schaufenster und Eingang, Aufstellen von Gegenständen vor dem Laden sowie Einbauten, die Fluchtwege oder Feuerlöscher verstellen. Erlaubt sind: [z. B. „bis zu [Zahl] Wandregale mit Dübeln an der Rückwand“].
(3) Bis zum Ende der Abbauzeit entfernt der Mieter Einrichtung, Ware, Dekoration und Folien vollständig, stellt den Übergabezustand wieder her (einschließlich Verschließen genehmigter Bohrlöcher und Beseitigung von Kleberesten) und übergibt besenrein.
(4) Kommt der Mieter dem Rückbau nicht fristgerecht nach, darf der Vermieter nach einer Nachfrist von [z. B. 2] Werktagen den Rückbau auf Kosten des Mieters vornehmen lassen und zurückgelassene Gegenstände einlagern oder entsorgen. Für jeden Tag der verspäteten Rückgabe schuldet der Mieter [Betrag] EUR Nutzungsentschädigung (§ 546a BGB).

§ 6 Öffnungszeiten, Betrieb und Hausordnung
(1) Der Mieter betreibt den Store während des Aktionszeitraums mindestens [z. B. „Montag bis Samstag von 10:00 bis 19:00 Uhr“ / „zu den Öffnungszeiten des Einkaufszentrums“]. Abweichungen sind [z. B. 2] Tage vorher mitzuteilen. Bleibt der Store an mehr als [Zahl] vereinbarten Öffnungstagen ohne Zustimmung geschlossen, schuldet der Mieter eine Vertragsstrafe von [Betrag] EUR je Tag; weitere Ansprüche bleiben unberührt.
(2) Der Mieter stellt eigenes Personal, hält Mietfläche und Eingangsbereich sauber, entsorgt Abfälle selbst und lagert Ware nur innerhalb der Mietfläche. Anlieferungen erfolgen über [Lieferzone, Zeiten]. Die Hausordnung (Anlage 3) ist Vertragsbestandteil; Musik und Veranstaltungen dürfen Nachbarn nicht stören. Der Vermieter darf die Mietfläche während der Öffnungszeiten jederzeit und im Übrigen nach Ankündigung betreten.

§ 7 Werbung und Nutzung des Namens
(1) Im Schaufenster und innerhalb der Mietfläche darf der Mieter frei werben. Außenwerbung (Schilder, Aufsteller, Beachflags, Banner) ist nur zulässig: [Beschreibung]. Genehmigungen für Außenwerbung holt der Mieter ein.
(2) Der Vermieter darf den Pop-up-Store in eigener Kommunikation (Website, Social Media, Mieterverzeichnis, Presse) unter Nennung von Name und Logo des Mieters ankündigen; der Mieter darf Adresse und Namen des [Gebäudes / Einkaufszentrums] zur Bewerbung nennen. Fotos und Videos der Mietfläche darf der Mieter zu eigenen Werbezwecken veröffentlichen, soweit keine anderen Personen erkennbar sind oder deren Einwilligung vorliegt.

§ 8 Haftung, Versicherung und Verkehrssicherung
(1) Der Mieter trägt während der gesamten Mietzeit einschließlich Auf- und Abbau die Verkehrssicherungspflicht für die Mietfläche und ihren Eingangsbereich und haftet für alle Schäden, die er, sein Personal, Lieferanten oder Besucher verursachen.
(2) Der Mieter unterhält eine Betriebshaftpflichtversicherung mit mindestens [Betrag] EUR Deckung und weist sie vor Übergabe nach. Ware, Einrichtung, Kasse und Technik versichert er selbst; der Vermieter übernimmt keine Obhut und haftet für Diebstahl, Einbruch und Wasserschäden nur bei Verschulden.
(3) Der Vermieter haftet für anfängliche Mängel nur bei Verschulden (§ 536a Abs. 1 BGB ist insoweit ausgeschlossen), im Übrigen nur bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung wesentlicher Vertragspflichten, dann begrenzt auf den vorhersehbaren, vertragstypischen Schaden, höchstens auf die Pauschalmiete; die Haftung für Schäden an Leben, Körper und Gesundheit bleibt unberührt. Für entgangenen Umsatz, ausbleibende Besucher und Ausfälle von Strom, Internet oder Klimatisierung durch Dritte haftet der Vermieter nicht.

§ 9 Beendigung und vorzeitige Kündigung
(1) Das Mietverhältnis endet mit Ablauf des Aktionszeitraums. Die Rückgabe erfolgt nach vollständigem Rückbau in einem gemeinsamen Termin mit Rückgabeprotokoll und Rückgabe aller Schlüssel.
(2) Eine ordentliche Kündigung ist ausgeschlossen. [Optional: Der Mieter kann bis [Zahl] Tage vor Übergabe gegen Zahlung von [Zahl] % der Pauschalmiete zurücktreten; danach schuldet er die volle Miete, soweit der Vermieter nicht anderweitig vermieten kann.]
(3) Beide Parteien können aus wichtigem Grund fristlos kündigen, der Vermieter insbesondere bei nicht rechtzeitiger Zahlung, bei Verstößen gegen § 3, § 5 oder § 6 trotz Abmahnung oder bei behördlicher Untersagung wegen fehlender Genehmigungen des Mieters.
(4) Wird die Mietfläche ohne Verschulden einer Partei (z. B. Gebäudeschaden, behördliche Schließung) unbenutzbar, entfällt die Miete anteilig; weitergehende Ansprüche sind ausgeschlossen.

§ 10 Schlussbestimmungen
(1) Änderungen und Ergänzungen bedürfen der Textform. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam; die unwirksame Bestimmung ist durch eine wirksame zu ersetzen, die dem wirtschaftlichen Zweck am nächsten kommt.
(3) Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort]. Es gilt deutsches Recht.
(4) Anlagen: Anlage 1 Lageplan, Anlage 2 Übergabeprotokoll mit Fotos, Anlage 3 Hausordnung, [Anlage 4 Versicherungsnachweis].

[Ort], den [Datum]


______________________________
[Name], Vermieter


______________________________
[Name, Funktion], für den Mieter

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "mietvertrag-arbeitszimmer-gmbh",
    titel: "Mietvertrag Arbeitszimmer an die eigene GmbH / UG",
    kurz: "Mietvertrag, mit dem der Gesellschafter-Geschäftsführer ein Arbeitszimmer oder Räume in seiner Wohnung an die eigene GmbH oder UG vermietet – fremdüblich und mit steuerlichen Hinweisen.",
    kategorie: "miete",
    dateiname: "Mietvertrag-Arbeitszimmer-GmbH",
    wofuer: [
      "Du führst deine UG oder GmbH von zu Hause und willst die Raumkosten sauber in der Gesellschaft abbilden",
      "Deine Gesellschaft hat ihren Sitz unter deiner Privatadresse und nutzt dort ein Büro, ein Lager oder einen Showroom",
      "Du willst Miete, Nebenkosten und Flächenanteil so dokumentieren, dass das Finanzamt den Fremdvergleich akzeptiert",
      "Du brauchst eine Grundlage, um das Risiko einer Betriebsaufspaltung mit dem Steuerberater zu prüfen",
    ],
    enthaelt: [
      "Vorbemerkung (Beteiligung, Fremdüblichkeit)",
      "§ 1 Mietsache und Flächenanteil",
      "§ 2 Nutzungszweck, Geschäftsanschrift, Zustimmung des Wohnungsvermieters",
      "§ 3 Mietzeit und Kündigung",
      "§ 4 Ortsübliche Miete, Nebenkosten und Umsatzsteuer",
      "§ 5 Zahlung und Nachweis",
      "§ 6 Instandhaltung und Schönheitsreparaturen",
      "§ 7 Haftung und Versicherung",
      "§ 8 Rückgabe",
      "§ 9 Fremdvergleich und steuerliche Hinweise",
      "§ 10 Schlussbestimmungen",
    ],
    hinweise: [
      "Fremdvergleich: Der Vertrag muss vorher schriftlich geschlossen, zu ortsüblichen Konditionen vereinbart und tatsächlich so durchgeführt werden (monatliche Überweisung vom Geschäftskonto, Nebenkostenabrechnung). Überhöhte Miete ist eine verdeckte Gewinnausschüttung (§ 8 Abs. 3 Satz 2 KStG). Hol dir den Gewerbemietspiegel oder zwei Vergleichsangebote für Büroflächen am Ort.",
      "Betriebsaufspaltung: Überlässt der beherrschende Gesellschafter seiner GmbH Räume, die für sie eine wesentliche Betriebsgrundlage sind, kann eine Betriebsaufspaltung vorliegen. Dann sind deine Mieteinnahmen gewerblich, Räume und GmbH-Anteile werden Betriebsvermögen, und bei Beendigung (Verkauf der Wohnung, Umzug, Anteilsverkauf) werden stille Reserven versteuert. Die Rechtsprechung bejaht das auch bei Büroräumen in der Privatwohnung, wenn die GmbH dort ihren Betrieb führt. Vor Abschluss mit dem Steuerberater klären.",
      "Umsatzsteuer: Die Vermietung ist grundsätzlich steuerfrei (§ 4 Nr. 12 UStG). Du kannst optieren (§ 9 UStG), wenn die GmbH vorsteuerabzugsberechtigt ist; dann wirst du als Vermieter Unternehmer mit Umsatzsteuererklärung. Ohne Option bleibt es einfach, aber die Vorsteuer aus Renovierungen ist weg.",
      "Mieter ist die GmbH, Vermieter bist du privat. Beim Vertragsschluss handelst du auf beiden Seiten – das geht nur, wenn du vom Verbot des Insichgeschäfts (§ 181 BGB) befreit bist (Satzung, Handelsregister). Sonst muss die Gesellschafterversammlung beschließen und ein anderer Vertreter unterschreiben.",
      "Bist du selbst nur Mieter der Wohnung, brauchst du die Erlaubnis deines Vermieters zur gewerblichen (Unter-)Nutzung. Ohne sie riskierst du die Kündigung deiner Wohnung.",
    ],
    faqs: [
      {
        q: "Welche Miete darf ich meiner GmbH für das Arbeitszimmer berechnen?",
        a: "Die ortsübliche Miete für vergleichbare Büro- oder Gewerbeflächen, nicht mehr. Orientiere dich an Angeboten für kleine Büroflächen am Ort, dem Gewerbemietspiegel der IHK oder, hilfsweise, dem Wohnungsmietspiegel. Zahlt die GmbH deutlich mehr, ist der Mehrbetrag eine verdeckte Gewinnausschüttung; zahlt sie deutlich weniger, kann das Finanzamt die Einkünfteerzielungsabsicht anzweifeln.",
      },
      {
        q: "Wie versteuere ich die Miete, die meine GmbH mir zahlt?",
        a: "In der Regel als Einkünfte aus Vermietung und Verpachtung (§ 21 EStG) in deiner Einkommensteuererklärung. Du kannst die anteiligen Kosten der Räume (Miete oder AfA, Nebenkosten, Renovierung) als Werbungskosten abziehen. Liegt eine Betriebsaufspaltung vor, werden daraus gewerbliche Einkünfte mit weitreichenden Folgen – das muss der Steuerberater vorab prüfen.",
      },
      {
        q: "Was ist eine Betriebsaufspaltung und wann droht sie?",
        a: "Eine Betriebsaufspaltung liegt vor, wenn du als beherrschender Gesellschafter (personelle Verflechtung) deiner GmbH eine wesentliche Betriebsgrundlage überlässt (sachliche Verflechtung), zum Beispiel die Räume, von denen aus die GmbH ihr Geschäft betreibt. Folge: Deine Vermietung wird gewerblich, die GmbH-Anteile werden Betriebsvermögen, und bei Wegfall der Voraussetzungen werden die stillen Reserven auf einen Schlag versteuert. Bei einem einzelnen Arbeitszimmer kommt es auf die tatsächliche Bedeutung für den Betrieb an.",
      },
      {
        q: "Kann die GmbH die Miete als Betriebsausgabe absetzen?",
        a: "Ja, bei fremdüblicher Gestaltung und tatsächlicher Durchführung ist die Miete eine Betriebsausgabe der GmbH. Die Abzugsbeschränkung für häusliche Arbeitszimmer trifft nur den Abzug beim Nutzer selbst, nicht die GmbH als Mieterin. Entscheidend sind ein schriftlicher Vertrag vor Nutzungsbeginn, regelmäßige Zahlungen und eine klare Abgrenzung der Räume.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du ein Arbeitszimmer an deine GmbH vermieten solltest",
        text: `Deine UG oder GmbH hat ihren Sitz bei dir zu Hause, du arbeitest im Arbeitszimmer, lagerst Ware im Abstellraum oder empfängst Kunden im Wohnzimmer. Die Raumkosten trägst du privat, obwohl die Gesellschaft die Räume nutzt. Mit einem Mietvertrag zwischen dir als Vermieter und deiner Gesellschaft als Mieterin wird die Miete zur Betriebsausgabe der GmbH, und du versteuerst die Einnahmen privat als Vermietung und Verpachtung. Das funktioniert nur, wenn der Vertrag dem Fremdvergleich standhält: schriftlich vor Nutzungsbeginn, ortsübliche Miete, tatsächliche Zahlung vom Geschäftskonto, jährliche Nebenkostenabrechnung. Genau dafür ist die Vorlage gebaut. Sie enthält außerdem die Hinweise auf die beiden Fallen, die du vorher mit dem Steuerberater klären musst: verdeckte Gewinnausschüttung und Betriebsaufspaltung.`,
      },
      {
        titel: "Was muss in den Mietvertrag zwischen Gesellschafter und GmbH?",
        text: `Der Vertrag muss so aussehen, als hätten ihn fremde Dritte geschlossen. Diese Punkte stehen in der Vorlage:

- Vorbemerkung mit Beteiligung, Geschäftsführung und Eigentum oder Miete der Wohnung
- Vertretung der Gesellschaft mit Befreiung von § 181 BGB oder Gesellschafterbeschluss als Anlage
- Räume mit Grundriss, Gesamtwohnfläche, Flächenanteil in Prozent, Abtrennung von den Privaträumen, Mitbenutzung von Flur und WC (§ 1)
- Nutzungszweck, Geschäftsanschrift für Handelsregister und Impressum, Kundenverkehr, Mitarbeiter, Zustimmung des Wohnungsvermieters (§ 2)
- Mietzeit als unbefristeter oder befristeter Vertrag, außerordentliche Kündigung bei Ausscheiden, Verkauf oder Insolvenz (§ 3)
- Ortsübliche Miete mit Quelle, Nebenkostenvorauszahlung nach Flächenanteil, jährliche Abrechnung, Umsatzsteuer-Variante, regelmäßige Überprüfung (§ 4)
- Zahlung vom Geschäftskonto, Verbot von Barzahlung und Verrechnung, Belege für die Buchführung (§ 5)
- Instandhaltung, Kleinreparaturen, Schönheitsreparaturen, Eigentum an Einbauten (§ 6)
- Haftung, Betriebshaftpflicht, Information der Hausrat- oder Gebäudeversicherung (§ 7)
- Rückgabe und Ummeldung der Geschäftsanschrift (§ 8), Fremdvergleich und steuerliche Hinweise mit Anpassungsklausel (§ 9), Schriftform (§ 10)`,
      },
      {
        titel: "Mietvertrag Arbeitszimmer GmbH ausfüllen: Schritt für Schritt",
        text: `Prüfe zuerst, ob du als Geschäftsführer von § 181 BGB befreit bist; das steht in Satzung und Handelsregister. Wenn nicht, fasst die Gesellschafterversammlung einen Beschluss, und ein anderer Vertreter unterschreibt für die GmbH. In § 1 misst du die Räume aus, trägst Gesamtwohnfläche und Mietfläche ein und rechnest den Flächenanteil aus; er ist der Schlüssel für alle Nebenkosten. In § 2 entscheidest du über Kundenverkehr und Mitarbeiter und holst bei einer Mietwohnung die Zustimmung deines Vermieters als Anlage 4. In § 4 ermittelst du die ortsübliche Miete anhand des Gewerbemietspiegels der IHK oder zweier Vergleichsangebote für kleine Büroflächen und legst die Quelle als Anlage 5 bei; dann setzt du die Nebenkostenvorauszahlung und wählst die Umsatzsteuer-Variante. In § 5 trägst du dein Privatkonto ein, auf das die GmbH monatlich überweist. In § 9 notierst du Name des Steuerberaters und Datum der Besprechung. Die Vorlage gibt es kostenlos als Word, PDF und Text.`,
      },
      {
        titel: "Typische Fehler beim Fremdvergleich",
        text: `Erster Fehler: Der Vertrag wird rückwirkend geschlossen. Das Finanzamt erkennt zwischen beherrschendem Gesellschafter und GmbH nur an, was vorher klar und schriftlich vereinbart war. Zweiter Fehler: zu hohe Miete. Alles über dem ortsüblichen Satz ist eine verdeckte Gewinnausschüttung, die bei der GmbH nicht abziehbar ist und bei dir als Kapitalertrag versteuert wird. Dritter Fehler: Die Miete wird nicht gezahlt, bar gezahlt oder mit Gehalt oder Verrechnungskonto verrechnet; § 5 der Vorlage schließt das aus. Vierter Fehler: keine Nebenkostenabrechnung, obwohl Vorauszahlungen vereinbart sind. Fünfter Fehler: Die Räume sind nicht abgegrenzt, das Arbeitszimmer ist zugleich Gästezimmer. Sechster Fehler: Die Betriebsaufspaltung wird nicht geprüft, obwohl die GmbH ihren gesamten Betrieb aus deinen Räumen führt. Und siebter Fehler: Als Mieter der Wohnung die gewerbliche Nutzung nicht mit dem Vermieter klären und die eigene Wohnung riskieren.`,
      },
      {
        titel: "Rechtliche und steuerliche Grundlagen",
        text: `Zivilrechtlich ist der Vertrag ein Gewerbemietvertrag nach den §§ 535 ff. BGB; bei fester Laufzeit über ein Jahr gilt über § 578 BGB die Schriftform des § 550 BGB. Weil du auf beiden Seiten handelst, brauchst du die Befreiung vom Verbot des Insichgeschäfts nach § 181 BGB. Steuerlich entscheidet der Fremdvergleich: Eine Miete über dem ortsüblichen Niveau ist eine verdeckte Gewinnausschüttung nach § 8 Abs. 3 Satz 2 KStG. Deine Einnahmen sind in der Regel Einkünfte aus Vermietung und Verpachtung nach § 21 EStG, bei einer Betriebsaufspaltung dagegen gewerbliche Einkünfte nach § 15 EStG mit der Folge, dass Räume und GmbH-Anteile Betriebsvermögen werden. Die Abzugsbeschränkung für das häusliche Arbeitszimmer in § 4 Abs. 5 Satz 1 Nr. 6b EStG betrifft den Abzug beim Nutzer selbst, nicht die GmbH als Mieterin. Umsatzsteuerlich ist die Vermietung nach § 4 Nr. 12 UStG steuerfrei, mit Option nach § 9 UStG. GründerX ist Software und ersetzt weder Steuerberater noch Anwalt.`,
      },
      {
        titel: "Wann die Vorlage nicht reicht",
        text: `Diese Vorlage ist der Ausgangspunkt für das Gespräch mit dem Steuerberater, nicht sein Ersatz. Vor der Unterschrift muss er prüfen, ob eine Betriebsaufspaltung droht, denn die Folgen beim Verkauf der Wohnung, beim Umzug oder beim Verkauf der GmbH-Anteile können hoch sein. Bist du Eigentümer und vermietest einen größeren Teil des Hauses oder eine ganze Etage, kommen Fragen zur Aufteilung von Kaufpreis und Abschreibung hinzu. Bei mehreren Gesellschaftern, die alle Räume stellen, bei einer GmbH mit Mitarbeitern in deiner Wohnung oder bei einer Wohnung, die dir und deinem Partner gemeinsam gehört, braucht es individuelle Regelungen. Und sobald die Gesellschaft Umbauten bezahlt oder du selbst zur Umsatzsteuer optierst, lohnt sich eine Beratung, bevor der erste Euro fließt.`,
      },
    ],
    seo: {
      title: "Mietvertrag Arbeitszimmer GmbH Vorlage kostenlos | GründerX",
      description:
        "Mietvertrag Arbeitszimmer an die eigene GmbH als kostenlose Vorlage: ortsübliche Miete, Flächenanteil, Nebenkosten, Fremdvergleich, Betriebsaufspaltung.",
    },
    stand: "2026-10",
    text: `Mietvertrag über Geschäftsräume zwischen Gesellschafter und Gesellschaft

zwischen

[Vorname Nachname], [Straße, PLZ Ort]
– nachfolgend „Vermieter“ –

und

[Name der Gesellschaft] [GmbH / UG (haftungsbeschränkt)], [Straße, PLZ Ort], Amtsgericht [Ort] HRB [Nummer], vertreten durch [den Geschäftsführer [Vorname Nachname], der von den Beschränkungen des § 181 BGB befreit ist / den weiteren Geschäftsführer [Vorname Nachname] aufgrund Gesellschafterbeschlusses vom [Datum] (Anlage 3)]
– nachfolgend „Mieterin“ –

Vorbemerkung
Der Vermieter ist [Alleingesellschafter / mit [Zahl] % beteiligter Gesellschafter] und Geschäftsführer der Mieterin. Die Mieterin benötigt für ihren Geschäftsbetrieb Büroräume. Der Vermieter ist [Eigentümer / Mieter] der Wohnung [Straße, PLZ Ort] und überlässt der Mieterin daraus abgegrenzte Räume zu Bedingungen, wie sie auch unter fremden Dritten vereinbart würden.

§ 1 Mietsache und Flächenanteil
(1) Der Vermieter vermietet der Mieterin in der Wohnung [Straße, PLZ Ort, Geschoss] folgende Räume zur ausschließlichen Nutzung: [z. B. „das Zimmer links vom Eingang (Arbeitszimmer) mit 18,5 m²“ / „Arbeitszimmer (16 m²) und Abstellraum (6 m²) als Lager“] gemäß Grundriss (Anlage 1) (nachfolgend „Mietsache“).
(2) Die Gesamtwohnfläche beträgt [Zahl] m², die Mietsache [Zahl] m²; das entspricht einem Flächenanteil von [Zahl] % („Flächenanteil“), der Grundlage der Nebenkostenumlage nach § 4 ist.
(3) Die Mietsache ist durch eine Tür von den privat genutzten Räumen abgetrennt und wird ausschließlich geschäftlich genutzt; eine private Mitbenutzung findet nicht statt. Flur, Eingang, WC und [Küche] darf die Mieterin mitbenutzen, soweit es für Zugang und Betrieb erforderlich ist; diese Flächen gehen nicht in den Flächenanteil ein.
(4) Die Übergabe erfolgt am [Datum]; die Ausstattung wird im Übergabeprotokoll (Anlage 2) festgehalten. Möbel und Technik beschafft die Mieterin selbst, soweit nicht als mitvermietet bezeichnet.

§ 2 Nutzungszweck, Geschäftsanschrift, Zustimmung des Wohnungsvermieters
(1) Die Mietsache wird der Mieterin zum Betrieb ihres Unternehmens ([Gegenstand laut Satzung]) als Büro [und Lager] überlassen. Die Mieterin darf die Adresse als Geschäftsanschrift im Handelsregister, im Impressum und im Geschäftsverkehr nutzen und ein Firmenschild am Klingelbrett und Briefkasten anbringen.
(2) Kundenverkehr ist [in üblichem Umfang nach Termin / nicht] gestattet; Mitarbeiter dürfen in der Mietsache [bis zu [Zahl] Personen / nicht] beschäftigt werden. Untervermietung ist ausgeschlossen. Die Mieterin hält die für ihren Betrieb geltenden öffentlich-rechtlichen Vorschriften ein.
(3) [Bei Mietwohnung: Der Wohnungsvermieter [Name] hat der gewerblichen Nutzung durch die Mieterin mit Erklärung vom [Datum] zugestimmt (Anlage 4). Endet das Wohnungsmietverhältnis des Vermieters, endet auch dieser Vertrag zum selben Zeitpunkt.]

§ 3 Mietzeit und Kündigung
(1) Das Mietverhältnis beginnt am [Datum] und läuft auf unbestimmte Zeit. Beide Parteien können mit einer Frist von [z. B. 3] Monaten zum Monatsende schriftlich kündigen. [Alternative: Das Mietverhältnis wird fest bis zum [Datum] geschlossen und verlängert sich um jeweils ein Jahr, wenn es nicht mit einer Frist von [z. B. 3] Monaten zum Ablauf gekündigt wird; die Parteien kennen die Schriftformvorschrift des § 550 BGB.]
(2) Die außerordentliche Kündigung aus wichtigem Grund bleibt unberührt, insbesondere wenn der Vermieter aus der Gesellschaft ausscheidet oder seine Geschäftsführung endet, die Mieterin aufgelöst wird oder ein Insolvenzantrag gestellt wird, oder der Vermieter die Wohnung verkauft bzw. sein Wohnungsmietverhältnis endet.

§ 4 Ortsübliche Miete, Nebenkosten und Umsatzsteuer
(1) Die monatliche Miete beträgt [Betrag] EUR ([Betrag] EUR je m²). Sie entspricht der ortsüblichen Miete für vergleichbare Büroflächen in [Ort], ermittelt anhand [des Gewerbemietspiegels der IHK [Ort] / von Vergleichsangeboten (Anlage 5) / des Mietspiegels der Stadt [Ort] mit Zuschlag für gewerbliche Nutzung].
(2) Zusätzlich zahlt die Mieterin eine monatliche Nebenkostenvorauszahlung von [Betrag] EUR. Nach dem Flächenanteil umgelegt werden Heizung und Warmwasser, Strom, Wasser und Abwasser, Müllabfuhr, Hausreinigung und Hausmeister, Grundsteuer, Gebäudeversicherung sowie Internet- und Telefonanschluss, jeweils nach [Hausgeldabrechnung und Versorgerabrechnungen / Nebenkostenabrechnung des Wohnungsvermieters und Versorgerabrechnungen].
(3) Der Vermieter rechnet jährlich bis zum [z. B. 30.06.] des Folgejahres anhand der Belege ab; Nachzahlungen und Guthaben sind binnen vier Wochen auszugleichen. Die Vorauszahlung kann nach einer Abrechnung angemessen angepasst werden.
(4) [Variante A: Die Vermietung ist umsatzsteuerfrei (§ 4 Nr. 12 UStG). / Variante B: Der Vermieter optiert nach § 9 UStG; auf Miete und Nebenkosten ist Umsatzsteuer (derzeit 19 %) zu zahlen. Die Mieterin versichert, die Mietsache ausschließlich für Umsätze zu verwenden, die den Vorsteuerabzug nicht ausschließen. Der Vermieter erteilt monatliche Rechnungen mit Steuerausweis.]
(5) Die Miete wird alle [z. B. 2] Jahre, erstmals zum [Datum], auf Ortsüblichkeit überprüft und schriftlich angepasst. [Optional – Staffel: ab [Datum] [Betrag] EUR, ab [Datum] [Betrag] EUR.]

§ 5 Zahlung und Nachweis
(1) Miete und Vorauszahlung sind monatlich im Voraus bis zum dritten Werktag vom Geschäftskonto der Mieterin auf das Privatkonto des Vermieters IBAN [IBAN] zu überweisen. Barzahlung und Verrechnung mit Gehalt, Darlehen oder Gesellschafterverrechnungskonto sind ausgeschlossen.
(2) Die Mieterin verbucht die Miete als Raumkosten und bewahrt Vertrag, Zahlungsbelege und Nebenkostenabrechnungen bei ihren Buchführungsunterlagen auf. Der Vermieter erklärt die Mieteinnahmen in seiner Einkommensteuererklärung. Eine Aufrechnung der Mieterin ist nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen zulässig.

§ 6 Instandhaltung und Schönheitsreparaturen
(1) Der Vermieter hält die Mietsache einschließlich Fenster, Heizkörper, Elektro- und Wasserinstallation instand. Kleinreparaturen an Teilen, die ihrem häufigen Zugriff unterliegen, trägt die Mieterin bis [Betrag, z. B. 100] EUR je Fall und [Betrag] EUR je Jahr.
(2) Schönheitsreparaturen innerhalb der Mietsache führt die Mieterin durch, wenn der Grad der Abnutzung es erfordert, in der Regel etwa alle [z. B. 5] Jahre. Einbauten und Veränderungen der Installationen bedürfen der Zustimmung des Vermieters; von der Mieterin beschaffte Möbel, Technik und Einbauten bleiben ihr Eigentum. Mängel sind unverzüglich anzuzeigen.

§ 7 Haftung und Versicherung
(1) Die Mieterin haftet für Schäden an Mietsache und Wohnung durch ihren Betrieb, ihre Mitarbeiter oder Besucher, versichert ihre Betriebseinrichtung selbst und unterhält eine Betriebshaftpflichtversicherung.
(2) Der Vermieter haftet nur bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung wesentlicher Vertragspflichten, dann begrenzt auf den vorhersehbaren, vertragstypischen Schaden; die Haftung für Schäden an Leben, Körper und Gesundheit bleibt unberührt. § 536a Abs. 1 BGB ist für anfängliche Mängel ausgeschlossen.
(3) Der Vermieter informiert seine [Hausrat- / Wohngebäude-]Versicherung über die gewerbliche Nutzung; Mehrprämien trägt die Mieterin anteilig.

§ 8 Rückgabe
Bei Beendigung gibt die Mieterin die Mietsache geräumt, besenrein und im Zustand des Übergabeprotokolls unter Berücksichtigung vertragsgemäßer Abnutzung zurück; eigene Einbauten entfernt sie, soweit der Vermieter nicht ihre Belassung verlangt. Sie meldet ihre Geschäftsanschrift unverzüglich beim Handelsregister um.

§ 9 Fremdvergleich und steuerliche Hinweise
(1) Die Parteien gestalten und führen dieses Mietverhältnis so durch, wie es zwischen fremden Dritten üblich ist: schriftlicher Vertrag vor Nutzungsbeginn, ortsübliche Miete, regelmäßige unbare Zahlung, jährliche Nebenkostenabrechnung, klare räumliche Abgrenzung.
(2) Den Parteien ist bekannt, dass eine über die ortsübliche Miete hinausgehende Zahlung steuerlich als verdeckte Gewinnausschüttung behandelt werden kann und dass die Überlassung von Räumen, die für die Mieterin eine wesentliche Betriebsgrundlage darstellen, durch einen beherrschenden Gesellschafter eine Betriebsaufspaltung mit gewerblichen Einkünften des Vermieters begründen kann. Die Parteien haben dies [mit dem Steuerberater [Name] am [Datum] erörtert / werden es vor Vollzug mit einem Steuerberater klären].
(3) Stellt die Finanzverwaltung fest, dass die Miete nicht fremdüblich ist, passen die Parteien sie mit Wirkung für die Zukunft auf den fremdüblichen Betrag an.

§ 10 Schlussbestimmungen
(1) Änderungen und Ergänzungen bedürfen der Schriftform; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam; die unwirksame Bestimmung ist durch eine wirksame zu ersetzen, die dem wirtschaftlichen Zweck am nächsten kommt.
(3) Gerichtsstand ist, soweit gesetzlich zulässig, [Ort]. Es gilt deutsches Recht.
(4) Anlagen: Anlage 1 Grundriss, Anlage 2 Übergabeprotokoll, [Anlage 3 Gesellschafterbeschluss, Anlage 4 Zustimmung des Wohnungsvermieters, Anlage 5 Vergleichsangebote].

[Ort], den [Datum]


______________________________
[Vorname Nachname], Vermieter


______________________________
[Name der Gesellschaft], vertreten durch [Vorname Nachname, Funktion], Mieterin

${VORLAGEN_HINWEIS}`,
  },
];
