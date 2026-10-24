// Inhalt der Vorlage „gewerbemietvertrag“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../miete.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
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
        text: `Der teuerste Fehler ist die verletzte Form: Ein Vertrag über mehr als ein Jahr, bei dem eine Anlage fehlt, ein Nachtrag nur mündlich vereinbart wurde oder nicht erkennbar ist, wer für wen erklärt hat, gilt als unbefristet und kann nach einem Jahr ordentlich gekündigt werden. Zweiter Klassiker sind Nebenkosten ohne Grenze: Eine Formulierung wie „alle Betriebskosten“ ohne Verweis auf die Betriebskostenverordnung lässt Streit über Verwaltungskosten und Wartung zu; die Vorlage zählt die Posten auf. Dritter Fehler sind starre Fristen bei Schönheitsreparaturen, die in Formularverträgen unwirksam sind; die Vorlage arbeitet mit „in der Regel“ und dem Abnutzungsgrad. Vierter Punkt ist die Umsatzsteuer-Option bei Mietern mit steuerfreien Umsätzen, etwa Ärzten oder Kleinunternehmern; dann ist die Option unzulässig und der Vermieter verliert Vorsteuer. Und schließlich die Übergabe ohne Protokoll: Ohne Fotos und Zählerstände streitet ihr am Ende über jeden Kratzer.`,
      },
      {
        titel: "Rechtliche Grundlagen: Gewerbemiete ohne Wohnraum-Mieterschutz",
        text: `Für Geschäftsräume gelten die allgemeinen Mietvorschriften der §§ 535 ff. BGB. Über § 578 BGB werden einzelne Regeln des Wohnraummietrechts auf Gewerberäume übertragen, vor allem die Formvorschrift des § 550 BGB für Verträge mit einer Laufzeit über ein Jahr; für Gewerberäume genügt seit dem 1. Januar 2025 die Textform (§ 578 Abs. 1 Satz 2 BGB). Nicht übertragen werden Kündigungsschutz, Mietpreisbremse, Kappungsgrenze und die Begrenzung der Kaution auf drei Monatsmieten. Die Kündigungsfrist für unbefristete Gewerbemietverhältnisse steht in § 580a Abs. 2 BGB, die fristlose Kündigung aus wichtigem Grund in § 543 BGB, die stillschweigende Verlängerung in § 545 BGB, die Untervermietung in § 540 BGB und die Nutzungsentschädigung bei verspäteter Rückgabe in § 546a BGB. Die Umsatzsteuer-Option richtet sich nach § 9 UStG, die Steuerfreiheit der Vermietung nach § 4 Nr. 12 UStG. Weil fast alles verhandelbar ist, entscheidet der Vertragstext. GründerX stellt dir dafür den Mustervertrag bereit, ersetzt aber keine Rechtsberatung im Einzelfall.`,
      },
      {
        titel: "Wann die Gewerbemietvertrag-Vorlage nicht reicht",
        text: `Bei Laufzeiten von zehn Jahren und mehr, bei sehr hohen Mieten oder wenn der Vermieter umfangreiche Umbauten für dich ausführt (Mieterausbau, Baukostenzuschuss), solltest du den Vertrag anwaltlich prüfen lassen; dort geht es um Beträge, bei denen eine einzige Klausel mehr kostet als die Beratung. Dasselbe gilt für Indexmieten, weil das Preisklauselgesetz Vorgaben macht, für Verträge in Einkaufszentren mit Betriebspflicht und Umsatzmiete, für Mischobjekte mit Wohnanteil und für Fälle, in denen der Mieter eine Bankbürgschaft statt einer Barkaution stellt und die Bank eigene Texte verlangt. Auch wenn du als Vermieter viele Flächen mit demselben Formular vermietest, lohnt die Prüfung, weil dann die AGB-Kontrolle greift und eine unwirksame Klausel in allen Verträgen gleichzeitig fehlt.`,
      },
    ],
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
(1) Die Parteien kennen die Formvorschrift des § 550 i. V. m. § 578 BGB (Textform). Änderungen und Ergänzungen bedürfen der Schriftform, sind als Nachtrag zu bezeichnen und mit diesem Vertrag fest zu verbinden; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Anlagen: Anlage 1 Grundriss, Anlage 2 Übergabeprotokoll, [Anlage 3 Hausordnung].
(3) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam; die unwirksame Bestimmung ist durch eine wirksame zu ersetzen, die dem wirtschaftlichen Zweck am nächsten kommt.
(4) Erfüllungsort ist der Ort der Mietsache. Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort]. Es gilt deutsches Recht. Jede Partei erhält eine unterzeichnete Ausfertigung.

[Ort], den [Datum]


______________________________
[Name], Vermieter


______________________________
[Name, Funktion], für den Mieter

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
