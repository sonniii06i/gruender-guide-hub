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
    seo: {
      title: "Gewerbemietvertrag Vorlage 2026 kostenlos (Word & PDF) | GründerX",
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
    seo: {
      title: "Untermietvertrag Büro Vorlage 2026 kostenlos (Word) | GründerX",
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
    seo: {
      title: "Coworking-Vertrag Vorlage 2026 kostenlos (Word & PDF) | GründerX",
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
    seo: {
      title: "Mietvertrag Lagerfläche Vorlage 2026 kostenlos (Word) | GründerX",
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
    seo: {
      title: "Leihvertrag Vorlage 2026 kostenlos (Word & PDF) | GründerX",
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
    seo: {
      title: "Mietvertrag Geräte Vorlage 2026 kostenlos (Word & PDF) | GründerX",
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
    seo: {
      title: "Pop-up-Store Mietvertrag Vorlage 2026 kostenlos | GründerX",
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
    seo: {
      title: "Arbeitszimmer an eigene GmbH vermieten: Vorlage 2026 | GründerX",
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
