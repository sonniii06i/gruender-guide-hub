import { type Vorlage } from "./types";

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
      "Laufzeit über ein Jahr, bei der die Form des § 550 BGB (für Gewerberäume seit 2025 Textform, § 578 BGB) eingehalten werden muss",
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
      "Formfalle: Ein Gewerbemietvertrag mit mehr als einem Jahr Laufzeit muss seit dem 1. Januar 2025 mindestens die Textform des § 550 i. V. m. § 578 Abs. 1 Satz 2 BGB wahren (alle wesentlichen Punkte lesbar auf einem dauerhaften Datenträger, Anlagen eindeutig in Bezug genommen; bis Ende 2024 galt Schriftform, für Altverträge bis zum 1. Januar 2026, Art. 229 § 70 EGBGB). Sonst gilt er als unbefristet und ist nach einem Jahr von beiden Seiten ordentlich kündbar. Jeder Nachtrag muss dieselbe Form wahren; Heilungsklauseln helfen nach der Rechtsprechung des BGH nicht.",
      "Die Umsatzsteuer-Option nach § 9 UStG ist nur zulässig, wenn der Mieter die Fläche ausschließlich für Umsätze nutzt, die den Vorsteuerabzug nicht ausschließen (§ 9 Abs. 2 UStG). Ärzte, Versicherungsvermittler oder Kleinunternehmer fallen raus – dann bleibt die Miete steuerfrei und der Vermieter verliert seinen Vorsteuerabzug.",
      "Indexmieten mit automatischer Anpassung unterliegen dem Preisklauselgesetz; sie sind in der Regel nur zulässig, wenn der Vermieter mindestens zehn Jahre auf die ordentliche Kündigung verzichtet oder der Mieter die Laufzeit auf mindestens zehn Jahre verlängern kann. Bei kürzeren Verträgen ist die Staffelmiete der sichere Weg.",
      "Schönheitsreparaturen dürfen nur mit flexiblen Fristen („in der Regel“, „bei Bedarf“) auf den Mieter übertragen werden; starre Fristenpläne sind in Formularverträgen unwirksam.",
    ],
    faqs: [
      {
        q: "Gilt der Mieterschutz des Wohnraummietrechts auch für mein Büro?",
        a: "Nein. Für Geschäftsräume gelten die allgemeinen Vorschriften der §§ 535 ff. BGB und über § 578 BGB einzelne Wohnraumregeln (z. B. die Formvorschrift des § 550, für Gewerberäume seit 2025 in Textform). Kündigungsschutz, Mietpreisbremse und die Kautionsgrenze von drei Monatsmieten gelten nicht. Fast alles ist frei verhandelbar – darum zählt der Vertragstext umso mehr.",
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
      title: "Gewerbemietvertrag Vorlage kostenlos (Word) | GründerX",
      description:
        "Gewerbemietvertrag für Büro oder Laden als kostenlose Vorlage: Laufzeit, Verlängerungsoption, Nebenkosten, Kaution, USt-Option, Index oder Staffel, § 550 BGB.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/gewerbemietvertrag"),
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
      title: "Untermietvertrag Büro Vorlage kostenlos (Word) | GründerX",
      description:
        "Untermietvertrag für Büro oder Arbeitsplatz als kostenlose Vorlage: Zustimmung des Hauptvermieters, Pauschalmiete inkl. Nebenkosten, kurze Kündigung.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/untermietvertrag-buero"),
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
      title: "Coworking-Vertrag Vorlage kostenlos (Word) | GründerX",
      description:
        "Coworking-Nutzungsvertrag als kostenlose Vorlage: Flex Desk oder Fix Desk, Leistungen, Zugang, Hausordnung, monatliche Kündigung, Haftung und Datenschutz.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/coworking-nutzungsvertrag"),
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
      "Auch beim Lager gilt § 550 BGB: Läuft der Vertrag länger als ein Jahr, muss er vollständig und mindestens in Textform (§ 578 Abs. 1 Satz 2 BGB, seit 2025) festgehalten werden, sonst ist er nach einem Jahr ordentlich kündbar.",
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
        a: "Nach § 562 BGB hat der Vermieter für seine Forderungen ein Pfandrecht an den eingebrachten Sachen des Mieters. Bei Mietrückstand kann er die Ware zurückhalten und verwerten. Kommissionsware gehört nicht dir und unterliegt dem Pfandrecht nicht; bei Ware unter Eigentumsvorbehalt erfasst es allenfalls dein Anwartschaftsrecht – die Vorlage verlangt, dass du dem Vermieter solche Ware auf Nachfrage benennst.",
      },
    ],
    seo: {
      title: "Mietvertrag Lagerfläche Vorlage kostenlos (Word) | GründerX",
      description:
        "Mietvertrag für Lagerfläche oder Lagerraum als kostenlose Vorlage: Fläche, Zugang, Sicherheit, Versicherung der Ware durch den Mieter, keine Gefahrstoffe.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/mietvertrag-lagerflaeche"),
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
      title: "Leihvertrag Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "Leihvertrag nach § 598 BGB als kostenlose Vorlage: unentgeltliche Überlassung von Geräten an Unternehmen oder die eigene GmbH, Dauer, Haftung, Rückgabe.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/leihvertrag"),
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
        a: "Ja, bei einem Mangel, der die Tauglichkeit erheblich mindert, ist die Miete kraft Gesetzes gemindert (§ 536 BGB). Du musst den Mangel aber unverzüglich anzeigen (§ 536c BGB), sonst verlierst du deine Rechte, soweit der Vermieter deshalb nicht abhelfen konnte. Die Vorlage gibt dem Vermieter zuerst die Möglichkeit, ein Ersatzgerät zu stellen.",
      },
    ],
    seo: {
      title: "Mietvertrag Geräte Vorlage kostenlos (Word) | GründerX",
      description:
        "Mietvertrag für Geräte, Kamera, Maschine oder Fahrzeug (B2B) als kostenlose Vorlage: Mietzeit, Mietzins, Kaution, Übergabeprotokoll, Haftung, Rückgabe.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/mietvertrag-geraete"),
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
        q: "Brauche ich für einen Pop-up-Store einen Gewerbemietvertrag in der Form des § 550 BGB?",
        a: "Nein, solange die Mietzeit nicht länger als ein Jahr ist. Die Formvorschrift (für Gewerberäume seit 2025 Textform, § 578 Abs. 1 Satz 2 BGB) greift erst bei Verträgen über ein Jahr. Trotzdem solltest du den Vertrag schriftlich schließen, damit Fläche, Pauschalmiete, Rückbau und Haftung eindeutig geregelt sind.",
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
      title: "Pop-up-Store Mietvertrag Vorlage kostenlos | GründerX",
      description:
        "Pop-up-Store-Mietvertrag als kostenlose Vorlage: Zeitraum, Pauschalmiete, Einrichtung und Rückbau, Öffnungszeiten, Werbung, Haftung, kein Konkurrenzschutz.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/pop-up-store-mietvertrag"),
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
      title: "Mietvertrag Arbeitszimmer GmbH Vorlage kostenlos | GründerX",
      description:
        "Mietvertrag Arbeitszimmer an die eigene GmbH als kostenlose Vorlage: ortsübliche Miete, Flächenanteil, Nebenkosten, Fremdvergleich, Betriebsaufspaltung.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/mietvertrag-arbeitszimmer-gmbh"),
  },
];
