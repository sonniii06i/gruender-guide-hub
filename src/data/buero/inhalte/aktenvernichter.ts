import type { BueroInhalt } from "../types";

const inhalt: BueroInhalt = {
  antwort:
    "Für ein paar Blätter in der Woche passt der Fellowes Powershred LX50: Partikelschnitt, Sicherheitsstufe P-4, 9 Blatt pro Durchgang. Fällt täglich Papier an, läuft der Fellowes Powershred LX85 bis zu 20 Minuten am Stück, und der Rexel Optimum AutoFeed+ 90X zieht einen Stapel von bis zu 90 Blatt selbst ein. Für sensiblere Unterlagen steht der Leitz IQ Office P5 mit Mikroschnitt in der Auswahl, der Leitz IQ Home Office P4 für das Home Office mit größerem Behälter.",
  auswahl:
    "Ausgewählt haben wir nach Sicherheitsstufe und Partikelgröße, Blatt pro Durchgang, Auffangbehälter, Betriebsdauer und danach, was die Hersteller außer Papier als Schnittgut nennen. Die Seite ist ein Vergleich der Hersteller-Datenblätter ohne eigenen Test: Was auf den Produktseiten von Fellowes, Leitz und Rexel nicht steht, behaupten wir nicht. In der Auswahl sind nur Geräte, die am Stand-Tag bei mindestens einem Partnerhändler lieferbar waren.",
  vergleich: ["Sicherheitsstufe", "Partikelgröße", "Blatt pro Durchgang", "Auffangbehälter", "Betriebsdauer"],
  produkte: [
    {
      id: "fellowes-powershred-lx50",
      name: "Fellowes Powershred LX50",
      marke: "Fellowes",
      ean: "0043859771103",
      rolle: "Für gelegentliches Schreddern",
      kurz: "9 Blatt pro Durchgang, Partikelschnitt P-4 und 17 Liter Behälter. Für kurze Einsätze gebaut: Nach bis zu 5 Minuten folgen 30 Minuten Abkühlphase.",
      daten: [
        { label: "Sicherheitsstufe", wert: "P-4" },
        { label: "Partikelgröße", wert: "4 x 37 mm (Partikelschnitt)" },
        { label: "Blatt pro Durchgang", wert: "9 Blatt" },
        { label: "Auffangbehälter", wert: "17 Liter, Schneidkopf abnehmbar" },
        { label: "Betriebsdauer", wert: "bis zu 5 Min." },
        { label: "Abkühlzeit", wert: "30 Min." },
        { label: "Vernichtet außer Papier", wert: "Heftklammern, Büroklammern, Kreditkarten" },
      ],
      plus: [
        "Vernichtet laut Fellowes auch Heftklammern, Büroklammern und Kreditkarten",
        "Sicherheitsstopp-Schalter sperrt das Gerät",
        "Abkühlphase mit 30 Min. halb so lang wie bei den beiden Leitz-Geräten",
      ],
      minus: [
        "Nur bis zu 5 Min. Betriebsdauer am Stück",
        "Kleinster Behälter der Auswahl (17 Liter), zum Leeren wird der Schneidkopf abgenommen",
        "Lautstärke nennt Fellowes auf der Produktseite nicht",
      ],
      datenblatt: {
        titel: "Fellowes: Powershred LX50 Partikelschnitt Aktenvernichter, Produktspezifikationen",
        url: "https://www.fellowes.com/de/de/catalog/business-machines/paper-shredders/details/home-shredders/FT-4406001",
      },
    },
    {
      id: "leitz-iq-home-office-p4",
      name: "Leitz IQ Home Office P4",
      marke: "Leitz",
      ean: "4002432118939",
      rolle: "Home Office mit 23-Liter-Behälter",
      kurz: "10 Blatt pro Durchgang, Partikelschnitt P-4 und ein 23-Liter-Behälter für bis zu 225 A4-Seiten. Leitz ordnet das Gerät dem gelegentlichen Einsatz im Home Office zu, die Betriebsdauer liegt bei 6 Minuten.",
      daten: [
        { label: "Sicherheitsstufe", wert: "P-4" },
        { label: "Partikelgröße", wert: "4 x 28 mm (Partikelschnitt)" },
        { label: "Blatt pro Durchgang", wert: "10 Blatt (80 g/m²)" },
        { label: "Auffangbehälter", wert: "23 Liter, laut Leitz bis zu 225 A4-Seiten" },
        { label: "Betriebsdauer", wert: "6 Min." },
        { label: "Abkühlzeit", wert: "60 Min." },
        { label: "Vernichtet außer Papier", wert: "Büro- und Heftklammern" },
        { label: "Lautstärke", wert: "58 dB(A)" },
      ],
      plus: [
        "23-Liter-Behälter, laut Leitz für bis zu 225 A4-Seiten",
        "Anti-Papierstau-Technik: stoppt bei zu vielen Seiten und führt das Papier zurück",
        "Lautstärke im Datenblatt angegeben: 58 dB(A)",
        "Garantie laut Leitz 2 Jahre, nach Registrierung 3 Jahre",
      ],
      minus: [
        "Nach 6 Min. Betriebsdauer 60 Min. Abkühlzeit",
        "Karten und CDs nennt Leitz nicht als Schnittgut",
      ],
      datenblatt: {
        titel: "Leitz: IQ Aktenvernichter Home Office Sicherheitsstufe P4, Merkmale und Spezifikationen",
        url: "https://www.leitz.com/de-de/products/aktenvernichter/leitz-aktenvernichter-mit-manueller-papierzuf%c3%bchrung/leitz-iq-aktenvernichter-home-office-sicherheitsstufe-p4/",
      },
    },
    {
      id: "fellowes-powershred-lx85",
      name: "Fellowes Powershred LX85",
      marke: "Fellowes",
      ean: "0043859764808",
      rolle: "Wenn täglich Papier anfällt",
      kurz: "12 Blatt pro Durchgang und bis zu 20 Minuten Betriebsdauer bei Sicherheitsstufe P-4. Fellowes sieht das Gerät für die häufige Nutzung im kleinen Büro oder Heimbüro vor.",
      daten: [
        { label: "Sicherheitsstufe", wert: "P-4" },
        { label: "Partikelgröße", wert: "4 x 40 mm (Partikelschnitt)" },
        { label: "Blatt pro Durchgang", wert: "12 Blatt" },
        { label: "Auffangbehälter", wert: "19 Liter, herausziehbar" },
        { label: "Betriebsdauer", wert: "bis zu 20 Min." },
        { label: "Vernichtet außer Papier", wert: "Heftklammern, Büroklammern, Kreditkarten" },
      ],
      plus: [
        "Bis zu 20 Min. Betriebsdauer am Stück",
        "12 Blatt pro Durchgang, höchster Wert der Auswahl beim Einzug von Hand",
        "Herausziehbarer Behälter (19 Liter)",
        "SafeSense stoppt das Gerät bei Berührung des Papiereinzugs",
      ],
      minus: [
        "Größte Partikel der Auswahl (4 x 40 mm), laut Fellowes weiterhin P-4",
        "Abkühlzeit und Lautstärke nennt Fellowes auf der Produktseite nicht",
      ],
      datenblatt: {
        titel: "Fellowes: Powershred LX85 Partikelschnitt Aktenvernichter, Produktspezifikationen",
        url: "https://www.fellowes.com/de/de/catalog/business-machines/paper-shredders/details/home-office-and-deskside-shredders/FT-4400801",
      },
    },
    {
      id: "rexel-optimum-autofeed-90x",
      name: "Rexel Optimum AutoFeed+ 90X",
      marke: "Rexel",
      ean: "5028252616799",
      rolle: "Für ganze Stapel bis 90 Blatt",
      kurz: "Nimmt bis zu 90 Blatt A4 als Stapel in die Papierkammer und arbeitet sie bei geschlossenem Deckel ab. Partikelschnitt P-4, 34 Liter Behälter und 20 Minuten Betriebsdauer.",
      daten: [
        { label: "Sicherheitsstufe", wert: "P-4" },
        { label: "Partikelgröße", wert: "4 x 28 mm (Partikelschnitt)" },
        { label: "Blatt pro Durchgang", wert: "bis zu 90 Blatt im Stapeleinzug (80 g/m²), bis zu 8 Blatt von Hand" },
        { label: "Auffangbehälter", wert: "34 Liter, herausziehbar" },
        { label: "Betriebsdauer", wert: "20 Min." },
        { label: "Vernichtet außer Papier", wert: "Kreditkarten, Heft- und Büroklammern" },
        { label: "Lautstärke", wert: "55 dB(A)" },
      ],
      plus: [
        "Stapeleinzug für bis zu 90 Blatt A4 (80 g/m²) in einem Durchlauf",
        "Heft- und Büroklammern müssen laut Rexel nicht entfernt werden",
        "Größter Behälter der Auswahl (34 Liter), herausziehbar, mit Füllstandanzeige",
        "Lautstärke laut Rexel 55 dB(A)",
      ],
      minus: [
        "Von Hand nur bis zu 8 Blatt pro Durchgang",
        "Mit 15,1 kg das schwerste Gerät der Auswahl",
        "Abkühlzeit nennt Rexel auf der Produktseite nicht",
      ],
      datenblatt: {
        titel: "Rexel: Optimum AutoFeed+ 90X Aktenvernichter Partikelschnitt, Merkmale und Spezifikationen",
        url: "https://www.rexeleurope.com/de-de/products/aktenvernichter/rexel-aktenvernichter-mit-automatischer-papierzuf%c3%bchrung/rexel-optimum-autofeed-90x-automatischer-aktenvernichter-partikelschnitt2/",
      },
    },
    {
      id: "leitz-iq-office-p5",
      name: "Leitz IQ Office P5",
      marke: "Leitz",
      ean: "4002432118953",
      rolle: "Für sensiblere Unterlagen (P-5)",
      kurz: "Mikroschnitt 2 x 15 mm mit Sicherheitsstufe P-5 und 120 Minuten Betriebsdauer. Das einzige Gerät der Auswahl oberhalb von P-4, mit 10 Blatt pro Durchgang und 23 Liter Behälter.",
      daten: [
        { label: "Sicherheitsstufe", wert: "P-5" },
        { label: "Partikelgröße", wert: "2 x 15 mm (Mikroschnitt)" },
        { label: "Blatt pro Durchgang", wert: "10 Blatt (80 g/m²)" },
        { label: "Auffangbehälter", wert: "23 Liter, laut Leitz bis zu 250 A4-Seiten" },
        { label: "Betriebsdauer", wert: "120 Min." },
        { label: "Abkühlzeit", wert: "60 Min." },
        { label: "Vernichtet außer Papier", wert: "Büro- und Heftklammern" },
        { label: "Lautstärke", wert: "55 dB(A)" },
      ],
      plus: [
        "Sicherheitsstufe P-5 mit Mikroschnitt 2 x 15 mm",
        "120 Min. Betriebsdauer, längster Wert der Auswahl",
        "23-Liter-Behälter, laut Leitz für bis zu 250 A4-Seiten",
        "Lautstärke laut Leitz 55 dB(A)",
      ],
      minus: [
        "10 Blatt pro Durchgang, kein Stapeleinzug",
        "Karten und CDs nennt Leitz nicht als Schnittgut",
      ],
      datenblatt: {
        titel: "Leitz: IQ Aktenvernichter Office Sicherheitsstufe P5, Merkmale und Spezifikationen",
        url: "https://www.leitz.com/de-de/products/aktenvernichter/leitz-aktenvernichter-mit-manueller-papierzuf%c3%bchrung/leitz-iq-aktenvernichter-office-sicherheitsstufe-p5/",
      },
    },
  ],
  abschnitte: [
    {
      titel: "Was bedeuten die Sicherheitsstufen P-1 bis P-7?",
      bloecke: [
        {
          art: "text",
          text: "Die Sicherheitsstufe steht bei allen fünf Geräten im Datenblatt und stammt aus der DIN 66399. Die Norm regelt seit Oktober 2012 die Vernichtung von Datenträgern. Das P steht für Papier und andere Datenträger in Originalgröße, die Zahl dahinter für die Stufe: Je höher sie ist, desto kleiner müssen die Schnipsel sein. Die TU Braunschweig fasst die Vorgaben in einem Infotext zum Datenschutz so zusammen:",
        },
        {
          art: "tabelle",
          kopf: ["Stufe", "Vorgabe für Papier", "In dieser Auswahl"],
          zeilen: [
            ["P-1", "Streifen bis 12 mm Breite oder Partikel bis 2.000 mm²", "kein Gerät"],
            ["P-2", "Streifen bis 6 mm Breite oder Partikel bis 800 mm²", "kein Gerät"],
            ["P-3", "Streifen bis 2 mm Breite oder Partikel bis 320 mm²", "kein Gerät"],
            [
              "P-4",
              "Partikel bis 160 mm², Streifenbreite bis 6 mm",
              "Fellowes LX50 und LX85, Leitz IQ Home Office P4, Rexel AutoFeed+ 90X",
            ],
            ["P-5", "Partikel bis 30 mm², Streifenbreite bis 2 mm", "Leitz IQ Office P5"],
            ["P-6", "Partikel bis 10 mm², Streifenbreite bis 1 mm", "kein Gerät"],
            ["P-7", "Partikel bis 5 mm², Streifenbreite bis 1 mm", "kein Gerät"],
          ],
        },
        {
          art: "text",
          text: "Wofür die Stufen gedacht sind, beschreibt Fellowes über drei Schutzklassen der Norm: Klasse 1 für interne Daten, Klasse 2 für vertrauliche Daten, Klasse 3 für streng vertrauliche und geheime Daten. Für die meisten Anwendungen empfiehlt der Hersteller Schutzklasse 2 mit P-4 oder P-5. Das ist die Empfehlung eines Herstellers, der Geräte verkauft. Eine Pflicht folgt daraus nicht.",
        },
        {
          art: "hinweis",
          text: "Welche Stufe für deine Unterlagen nötig ist, sagt diese Seite nicht. Das entscheidest du für deinen Fall selbst oder zusammen mit deinem Datenschutzbeauftragten. Die Tabelle zeigt nur, was die Stufen technisch bedeuten.",
        },
      ],
    },
    {
      titel: "Streifenschnitt oder Partikelschnitt: Was ist der Unterschied?",
      bloecke: [
        {
          art: "text",
          text: "Beim Streifenschnitt wird das Blatt nur längs zerteilt. Fellowes nennt dafür 36 Streifen je A4-Blatt und ordnet die Schnittart den Stufen P-1 und P-2 zu. Beim Partikelschnitt, auch Kreuzschnitt genannt, schneidet das Gerät zusätzlich quer. Ab P-4 verlangt die Übersicht oben Partikel. Mikroschnitt ist ein Partikelschnitt mit besonders kleinen Teilen, Fellowes ordnet ihn P-5 zu.",
        },
        {
          art: "text",
          text: "Alle fünf Geräte dieser Auswahl schneiden Partikel. Der Unterschied liegt in der Größe: Der Fellowes LX50 kommt mit 4 x 37 mm laut Datenblatt auf 419 Partikel pro Seite, der LX85 mit 4 x 40 mm auf 390. Leitz IQ Home Office P4 und Rexel AutoFeed+ 90X schneiden 4 x 28 mm. Der Leitz IQ Office P5 schneidet 2 x 15 mm. Für P-5 nennt Leitz in seinem Einkaufsratgeber rund 2.000 Partikel je A4-Blatt.",
        },
        {
          art: "text",
          text: "Für die Entscheidung heißt das: Schau zuerst auf die Stufe im Datenblatt und erst danach auf die Millimeter. Zwei Geräte mit P-4 können unterschiedlich große Partikel liefern, wie LX85 und Leitz IQ Home Office P4 zeigen.",
        },
      ],
    },
    {
      titel: "Wann lohnt ein automatischer Einzug?",
      bloecke: [
        {
          art: "text",
          text: "Bei den meisten Geräten führst du das Papier von Hand zu, in dieser Auswahl je nach Modell 9 bis 12 Blatt pro Durchgang. Wer einen alten Ordner leert, steht dann eine Weile am Gerät. Ein Aktenvernichter mit Stapeleinzug (Auto-Feed) nimmt dir das ab: Beim Rexel Optimum AutoFeed+ 90X legst du bis zu 90 Blatt A4 (80 g/m²) in die Papierkammer und schließt den Deckel. Heft- und Büroklammern musst du laut Rexel vorher nicht entfernen. Für einzelne Blätter gibt es einen Handeinzug für bis zu 8 Blatt.",
        },
        {
          art: "text",
          text: "Genauso wichtig wie der Einzug ist, wie lange ein Gerät am Stück läuft und wie lange es danach abkühlen muss. Hier liegen die größten Unterschiede der Auswahl:",
        },
        {
          art: "tabelle",
          kopf: ["Gerät", "Betriebsdauer am Stück", "Abkühlzeit"],
          zeilen: [
            ["Fellowes Powershred LX50", "bis zu 5 Min.", "30 Min."],
            ["Leitz IQ Home Office P4", "6 Min.", "60 Min."],
            ["Fellowes Powershred LX85", "bis zu 20 Min.", "auf der Produktseite nicht angegeben"],
            ["Rexel Optimum AutoFeed+ 90X", "20 Min.", "auf der Produktseite nicht angegeben"],
            ["Leitz IQ Office P5", "120 Min.", "60 Min."],
          ],
        },
        {
          art: "text",
          text: "Ein Stapeleinzug lohnt sich, wenn regelmäßig ganze Stapel anfallen, etwa beim Ausmisten alter Ordner oder wenn mehrere Leute ein Gerät nutzen. Für ein paar Blätter in der Woche brauchst du ihn nicht. Dann zählt eher, dass die Betriebsdauer zu deiner üblichen Menge passt.",
        },
      ],
    },
    {
      titel: "Wie groß sollte der Auffangbehälter sein?",
      bloecke: [
        {
          art: "text",
          text: "Die Behälter der Auswahl fassen zwischen 17 Litern (Fellowes LX50) und 34 Litern (Rexel AutoFeed+ 90X). Liter allein sagen wenig, weil kleine Partikel dichter liegen. Das zeigt der Vergleich der beiden Leitz-Geräte: Beide haben 23 Liter. Beim IQ Home Office P4 nennt Leitz bis zu 225 A4-Seiten, beim IQ Office P5 mit kleineren Partikeln bis zu 250.",
        },
        {
          art: "text",
          text: "Rexel rät in seinem Einkaufsratgeber, dass der Behälter zur Blattkapazität des Geräts passen sollte, weil du ihn sonst zu oft leerst. Ein Gerät, das 90 Blatt am Stück nimmt, braucht deshalb mehr Volumen als eines für 9 Blatt.",
        },
        {
          art: "text",
          text: "Achte auch darauf, wie der Behälter geleert wird. Beim Fellowes LX50 nimmst du den Schneidkopf vom Papierkorb ab. LX85 und Rexel AutoFeed+ 90X haben einen herausziehbaren Behälter, der Rexel zeigt den Füllstand über einen Infrarot-Sensor an.",
        },
      ],
    },
    {
      titel: "Was darf außer Papier in den Aktenvernichter?",
      bloecke: [
        {
          art: "text",
          text: "Nur das, was der Hersteller als Schnittgut nennt. Bei den fünf Geräten sieht das so aus:",
        },
        {
          art: "liste",
          punkte: [
            "Fellowes LX50 und LX85: Heftklammern, Büroklammern und Kreditkarten.",
            "Rexel Optimum AutoFeed+ 90X: Kreditkarten, Heft- und Büroklammern.",
            "Leitz IQ Home Office P4 und IQ Office P5: Büro- und Heftklammern. Karten nennt Leitz bei beiden Geräten nicht.",
          ],
        },
        {
          art: "text",
          text: "CDs stehen bei keinem der fünf Geräte auf der Produktseite. Wenn du Datenträger vernichten willst, brauchst du ein Gerät, das der Hersteller dafür ausweist.",
        },
        {
          art: "text",
          text: "Ebenfalls im Datenblatt steht die Lautstärke, allerdings nur bei Leitz und Rexel: 58 dB(A) beim IQ Home Office P4, je 55 dB(A) beim IQ Office P5 und beim AutoFeed+ 90X. Leitz knüpft den leisen Betrieb an die regelmäßige Verwendung der eigenen Ölblätter. Fellowes nennt für LX50 und LX85 auf den Produktseiten keinen dB-Wert.",
        },
      ],
    },
    {
      titel: "Was kann warten?",
      bloecke: [
        {
          art: "text",
          text: "Die Reihenfolge beim Kauf: zuerst klären, welche Unterlagen du überhaupt vernichtest, dann die Stufe wählen, erst danach auf Komfort schauen. Für den Anfang heißt das meistens:",
        },
        {
          art: "liste",
          punkte: [
            "Der Stapeleinzug kann warten, solange du nur einzelne Blätter und Briefe schredderst.",
            "P-5 kann warten, wenn bei dir keine Unterlagen anfallen, für die du oder dein Datenschutzbeauftragter eine höhere Stufe als P-4 festgelegt habt.",
            "Lange Betriebsdauer und ein großer Behälter können warten, bis wirklich täglich Papier anfällt. 6 Minuten Betriebsdauer nennt Leitz beim IQ Home Office P4 selbst passend für den gelegentlichen Gebrauch.",
          ],
        },
        {
          art: "text",
          text: "Zwei Dinge gehören vor den ersten Schnitt. Erstens: Prüf, ob du die Unterlagen noch aufheben musst. Für Belege und Geschäftsbriefe gelten Aufbewahrungsfristen, die dir dein Steuerberater für deinen Fall nennt. Zweitens: Wer Rechnungen von Anfang an digital empfängt und ablegt, hat später weniger Papier im Regal. Wie du das einrichtest, zeigt der Guide [[/guides/buchhaltung-setup|Buchhaltung-Setup]].",
        },
        {
          art: "text",
          text: "Wie ein Bürogerät abgeschrieben wird, rechnest du im [[/tools/abschreibung|Abschreibungs-Rechner]] durch.",
        },
      ],
    },
  ],
  kontext: [
    {
      pfad: "/tools/steuer-abc",
      label: "Steuer-ABC: Steuerbegriffe erklärt",
      text: "Erklärt Steuerbegriffe von Abschreibung bis Zahllast, wenn dir in der Buchhaltung ein Wort begegnet.",
    },
    {
      pfad: "/guides/buchhaltung-setup",
      label: "Guide: Buchhaltung-Setup",
      text: "Buchhaltungstool wählen und einrichten, damit Belege von Anfang an digital abgelegt werden.",
    },
    {
      pfad: "/tools/abschreibung",
      label: "Abschreibungs-Rechner",
      text: "Zeigt, wie du eine Anschaffung fürs Büro abschreibst.",
    },
  ],
  quellen: [
    {
      titel: "TU Braunschweig, Infotexte Datenschutz: Datenträgervernichtung nach DIN 66399 (PDF)",
      url: "https://www.tu-braunschweig.de/fileadmin/Redaktionsgruppen/Stabsstellen/Datenschutz/Infotexte_und_Rundschreiben/datentraegervernichtung_nach_din_66399_121218.pdf",
    },
    {
      titel: "Fellowes: Die Sicherheitsstufen von Aktenvernichtern erklärt",
      url: "https://www.fellowes.com/de/de/catalog/business-machines/resources/pg/shredder-security-levels",
    },
    {
      titel: "Leitz: Einkaufsratgeber für Leitz Aktenvernichter",
      url: "https://www.leitz.com/de-de/produkte/iq-paper-shredders/iq-einkaufsratgeber/",
    },
    {
      titel: "Rexel: Einkaufsratgeber für Aktenvernichter",
      url: "https://www.rexeleurope.com/de-de/einkaufsratgeber/einkaufsratgeber-fuer-papier-aktenvernichter/",
    },
  ],
};

export default inhalt;
