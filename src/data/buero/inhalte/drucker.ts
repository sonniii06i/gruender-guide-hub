import type { BueroInhalt } from "../types";

const inhalt: BueroInhalt = {
  antwort:
    "Druckst du fast nur Text wie Rechnungen, Verträge und Lieferscheine, reicht der Schwarzweiß-Laser Brother MFC-L2800DW. Für farbige Angebote und Scans vom Stapel passt der HP OfficeJet Pro 9132e, bei vielen Seiten im Monat der Epson EcoTank ET-3950, dessen mitgelieferte Flaschen laut Epson für 15.100 Seiten in Schwarz reichen. Für den Anfang mit wenig Druck genügt der Brother DCP-J1360DW, und der Brother DCP-L3560CDW mit Farbtoner ist die Wahl, wenn regelmäßig farbige Unterlagen in Stückzahl an Kunden gehen.",
  auswahl:
    "Ausgewählt sind fünf Multifunktionsgeräte mit WLAN, die sich in Drucktechnik, Tempo, Vorlageneinzug, Reichweite der Kartuschen und empfohlenem Monatsvolumen deutlich unterscheiden. Alle Angaben stammen von den Produktseiten der Hersteller Brother, HP und Epson, abgerufen am Stand-Tag. Wir haben kein Gerät selbst ausprobiert oder gemessen: Die Seite ist ein Vergleich der Datenblätter ohne eigenen Test. Aufgenommen sind nur Geräte, die am Stand-Tag bei mindestens einem Partnerhändler lieferbar waren.",
  vergleich: [
    "Drucktechnik",
    "Druckgeschwindigkeit",
    "Papierzufuhr",
    "Reichweite laut Hersteller",
    "Empfohlenes Monatsvolumen",
  ],
  produkte: [
    {
      id: "brother-mfc-l2800dw",
      name: "Brother MFC-L2800DW",
      marke: "Brother",
      ean: "4977766831413",
      rolle: "Wenn fast nur Text gedruckt wird",
      kurz: "Schwarzweiß-Laser mit Scanner, Kopierer und Fax für Büros, die Rechnungen, Verträge und Lieferscheine drucken und Farbe nie brauchen. Brother nennt 32 Seiten pro Minute und empfiehlt das Gerät für bis zu 2.500 Seiten im Monat.",
      daten: [
        { label: "Drucktechnik", wert: "Laser, schwarzweiß" },
        { label: "Funktionen", wert: "Drucken, Scannen, Kopieren, Faxen" },
        { label: "Druckgeschwindigkeit", wert: "32 Seiten/Min. (s/w)" },
        { label: "Duplex", wert: "Druck beidseitig, 16 Seiten/Min." },
        { label: "Papierzufuhr", wert: "Kassette 250 Blatt, Vorlageneinzug (ADF) 50 Blatt" },
        { label: "Anschlüsse", wert: "USB, LAN, WLAN (2,4 und 5 GHz)" },
        {
          label: "Reichweite laut Hersteller",
          wert: "Toner im Karton 700 Seiten, Nachkauf 1.200 oder 3.000 Seiten",
        },
        { label: "Empfohlenes Monatsvolumen", wert: "bis 2.500 Seiten" },
      ],
      plus: [
        "32 Seiten/Min. laut Brother, der höchste Datenblatt-Wert dieser Auswahl",
        "Vorlageneinzug für 50 Blatt und Faxfunktion",
        "Toner TN-2510XL mit 3.000 Seiten Reichweite erhältlich",
        "LAN-Anschluss und WLAN mit 5 GHz",
      ],
      minus: [
        "Druckt nur Schwarzweiß",
        "Der Toner im Karton reicht laut Brother für 700 Seiten",
        "Die Produktseite nennt kein beidseitiges Scannen über den Einzug",
      ],
      datenblatt: {
        titel: "Brother: MFC-L2800DW, Produktseite mit Spezifikationen",
        url: "https://store.brother.de/geraete/laser/mfc/mfcl2800dw",
      },
    },
    {
      id: "hp-officejet-pro-9132e",
      name: "HP OfficeJet Pro 9132e",
      marke: "HP",
      ean: "0196337284982",
      rolle: "Für Farbe und Scan-Stapel im Büro",
      kurz: "Tintengerät mit vier Patronen, Fax und einem Einzug, der laut HP beidseitig scannt und kopiert. HP empfiehlt bis zu 2.000 Seiten im Monat und nennt Gruppen mit bis zu 5 Nutzern.",
      daten: [
        { label: "Drucktechnik", wert: "Tinte mit vier Patronen, Farbe" },
        { label: "Funktionen", wert: "Drucken, Scannen, Kopieren, Faxen" },
        { label: "Druckgeschwindigkeit", wert: "25 Seiten/Min. s/w, 20 Seiten/Min. Farbe (ISO)" },
        { label: "Duplex", wert: "Druck und Scan beidseitig" },
        { label: "Papierzufuhr", wert: "2 Fächer je 250 Blatt, Vorlageneinzug (ADF) 35 Blatt" },
        { label: "Anschlüsse", wert: "USB, LAN, WLAN" },
        {
          label: "Reichweite laut Hersteller",
          wert: "Im Karton ca. 800 Seiten Schwarz und ca. 420 Seiten Farbe, Nachkauf bis ca. 2.500 Seiten Schwarz",
        },
        { label: "Empfohlenes Monatsvolumen", wert: "bis 2.000 Seiten" },
      ],
      plus: [
        "Beidseitiges Scannen und Kopieren über den Einzug",
        "Zwei Papierfächer mit zusammen 500 Blatt",
        "Farbdruck mit 20 Seiten/Min. nach ISO",
        "Touchscreen mit 4,3 Zoll (10,92 cm)",
      ],
      minus: [
        "Wer bei der Einrichtung HP+ wählt, nutzt laut HP über die gesamte Nutzungsdauer ausschließlich Original-HP-Tinte",
        "Blockiert laut HP Patronen mit einem Chip, der nicht von HP stammt",
        "Die Patronen im Karton reichen für ca. 800 Seiten Schwarz",
      ],
      datenblatt: {
        titel: "HP: OfficeJet Pro 9132e All-in-One-Drucker (404M5B), technische Daten",
        url: "https://www.hp.com/de-de/shop/products/printers/hp-officejet-pro-9132e-all-in-one-drucker-404m5b-629",
      },
    },
    {
      id: "brother-dcp-l3560cdw",
      name: "Brother DCP-L3560CDW",
      marke: "Brother",
      ean: "4977766823951",
      rolle: "Für farbige Unterlagen in Stückzahl",
      kurz: "Farbgerät mit Toner für Büros, die regelmäßig Angebote, Präsentationen oder Exposés in Farbe drucken. Brother nennt 26 Seiten pro Minute in Schwarzweiß und in Farbe und empfiehlt bis zu 3.000 Seiten im Monat.",
      daten: [
        { label: "Drucktechnik", wert: "LED mit Toner, Farbe" },
        { label: "Funktionen", wert: "Drucken, Scannen, Kopieren" },
        { label: "Druckgeschwindigkeit", wert: "26 Seiten/Min. s/w und Farbe" },
        { label: "Duplex", wert: "Druck beidseitig, 10 Seiten/Min." },
        { label: "Papierzufuhr", wert: "Kassette 250 Blatt, Vorlageneinzug (ADF) 50 Blatt" },
        { label: "Anschlüsse", wert: "USB, Gigabit-LAN, WLAN (2,4 und 5 GHz)" },
        {
          label: "Reichweite laut Hersteller",
          wert: "Im Karton ca. 1.000 Seiten Schwarz und je Farbe, Nachkauf bis 3.000 Seiten Schwarz und 2.300 Seiten je Farbe",
        },
        { label: "Empfohlenes Monatsvolumen", wert: "bis 3.000 Seiten" },
      ],
      plus: [
        "Farbe und Schwarzweiß mit je 26 Seiten/Min.",
        "Von Brother für bis zu 3.000 Seiten im Monat empfohlen",
        "Gigabit-LAN und Touchscreen mit 8,8 cm",
        "Vorlageneinzug für 50 Blatt",
      ],
      minus: [
        "20 kg schwer und 410 x 444 x 401 mm groß",
        "Vier Toner, dazu Trommel, Transfereinheit und Resttonerbehälter als Verschleißteile",
        "Kein Fax, beidseitiger Druck mit 10 Seiten/Min.",
      ],
      datenblatt: {
        titel: "Brother: DCP-L3560CDW, Produktseite mit Spezifikationen",
        url: "https://store.brother.de/geraete/laser/dcp/dcpl3560cdw",
      },
    },
    {
      id: "epson-ecotank-et-3950",
      name: "Epson EcoTank ET-3950",
      marke: "Epson",
      ean: "8715946732558",
      rolle: "Wenn die Folgekosten zählen",
      kurz: "Tintentank-Gerät, das aus Flaschen nachgefüllt wird. Die Flaschen im Karton reichen laut Epson für 15.100 Seiten in Schwarz und 5.500 Seiten in Farbe, dafür ist das Tempo niedriger als bei den Tonergeräten.",
      daten: [
        { label: "Drucktechnik", wert: "Tintentank mit Nachfüllflaschen, Farbe" },
        { label: "Funktionen", wert: "Drucken, Scannen, Kopieren" },
        {
          label: "Druckgeschwindigkeit",
          wert: "18 Seiten/Min. s/w, 9 Seiten/Min. Farbe (ISO/IEC 24734)",
        },
        { label: "Duplex", wert: "Druck und Scan beidseitig" },
        { label: "Papierzufuhr", wert: "Kassette 250 Blatt, Vorlageneinzug (ADF) 30 Seiten" },
        { label: "Anschlüsse", wert: "USB, LAN, WLAN" },
        {
          label: "Reichweite laut Hersteller",
          wert: "Flaschen im Karton 15.100 Seiten Schwarz und 5.500 Seiten Farbe",
        },
        { label: "Empfohlenes Monatsvolumen", wert: "Keine Angabe, Epson nennt 1 bis 4 Nutzer" },
      ],
      plus: [
        "Flaschen im Karton reichen laut Epson für 15.100 Seiten Schwarz und 5.500 Seiten Farbe",
        "Beidseitiger Druck und beidseitiger Scan über den Einzug",
        "USB, LAN und WLAN",
      ],
      minus: [
        "9 Seiten/Min. in Farbe, im beidseitigen Druck 5",
        "Scan über den Einzug mit 5 Bildern/Min.",
        "Ausgabefach fasst 30 Blatt, kein Fax",
      ],
      datenblatt: {
        titel: "Epson: EcoTank ET-3950 (C11CL43402), technische Daten",
        url: "https://www.epson.de/de_DE/produkte/drucker/inkjet/consumer/ecotank-et-3950-a4-multifunktions-wi-fi-tintentankdrucker%2C-mit-einem-im-lieferumfang-enthaltenen-vorrat-an-tinte-f%C3%BCr-bis-zu-3%C2%A0jahre/p/44868",
      },
    },
    {
      id: "brother-dcp-j1360dw",
      name: "Brother DCP-J1360DW",
      marke: "Brother",
      ean: "4977766841894",
      rolle: "Kleines Gerät für den Anfang",
      kurz: "Kompaktes Tintengerät für alle, die im Monat wenige Seiten drucken und trotzdem beidseitig drucken, scannen und kopieren wollen. Brother empfiehlt bis zu 1.000 Seiten im Monat.",
      daten: [
        { label: "Drucktechnik", wert: "Tinte mit vier Patronen, Farbe" },
        { label: "Funktionen", wert: "Drucken, Scannen, Kopieren" },
        {
          label: "Druckgeschwindigkeit",
          wert: "16 Seiten/Min. s/w, 9 Seiten/Min. Farbe (ISO/IEC 24734)",
        },
        { label: "Duplex", wert: "Druck beidseitig, 7 Seiten/Min. s/w" },
        { label: "Papierzufuhr", wert: "Kassette 150 Blatt, Vorlageneinzug (ADF) 20 Blatt" },
        { label: "Anschlüsse", wert: "USB, WLAN (2,4 und 5 GHz)" },
        { label: "Reichweite laut Hersteller", wert: "Patronen LC521 je 500 Seiten" },
        { label: "Empfohlenes Monatsvolumen", wert: "bis 1.000 Seiten" },
      ],
      plus: [
        "Beidseitiger Druck und Vorlageneinzug für 20 Blatt",
        "390 x 343 x 182,5 mm groß und 7,6 kg schwer",
        "WLAN mit 2,4 und 5 GHz",
      ],
      minus: [
        "Kein LAN-Anschluss",
        "Eine Patrone reicht laut Brother für 500 Seiten",
        "Papierkassette fasst 150 Blatt",
      ],
      datenblatt: {
        titel: "Brother: DCP-J1360DW, Produktseite mit Spezifikationen",
        url: "https://store.brother.de/geraete/tintenstrahl/dcpj/dcpj1360dw",
      },
    },
  ],
  abschnitte: [
    {
      titel: "Laser oder Tinte: Was passt fürs Büro?",
      bloecke: [
        {
          art: "text",
          text: "Die Entscheidung hängt an zwei Punkten: ob du Farbe brauchst und wie viele Seiten im Monat zusammenkommen. Ein Schwarzweiß-Laser druckt nur Schwarz, dafür schnell. Der Brother MFC-L2800DW schafft laut Datenblatt 32 Seiten pro Minute. Die Tintengeräte dieser Auswahl drucken Farbe und sind nach den Datenblättern langsamer: Der HP OfficeJet Pro 9132e kommt nach ISO auf 25 Seiten pro Minute in Schwarz und 20 in Farbe, der Epson EcoTank ET-3950 auf 18 und 9.",
        },
        {
          art: "tabelle",
          kopf: ["Technik", "Passt, wenn", "Gerät in dieser Auswahl"],
          zeilen: [
            [
              "Laser, schwarzweiß",
              "du fast nur Text druckst und Farbe nie brauchst",
              "Brother MFC-L2800DW",
            ],
            [
              "Tinte mit Patronen",
              "du Farbe brauchst und im Monat bis etwa 1.000 oder 2.000 Seiten druckst",
              "Brother DCP-J1360DW, HP OfficeJet Pro 9132e",
            ],
            [
              "Tintentank",
              "du viel druckst und selten Nachschub kaufen willst",
              "Epson EcoTank ET-3950",
            ],
            [
              "Farbe mit Toner",
              "regelmäßig farbige Unterlagen in Stückzahl rausgehen",
              "Brother DCP-L3560CDW",
            ],
          ],
        },
        {
          art: "text",
          text: "Brother bezeichnet die Technik des DCP-L3560CDW als LED. Gedruckt wird mit Toner wie beim Laser, und Brother führt das Gerät in seiner Farblaser-Übersicht. Mit 20 kg ist es das schwerste Gerät der Auswahl und braucht einen festen Platz.",
        },
      ],
    },
    {
      titel: "Brauchst du ein Multifunktionsgerät mit Vorlageneinzug?",
      bloecke: [
        {
          art: "text",
          text: "Scannen und Kopieren können alle fünf Geräte. Der Unterschied liegt im Vorlageneinzug (ADF): Er zieht einen Stapel Seiten nacheinander ein, sodass du Verträge oder Belege nicht Blatt für Blatt aufs Glas legen musst.",
        },
        {
          art: "liste",
          punkte: [
            "Brother MFC-L2800DW und DCP-L3560CDW: Einzug für 50 Blatt.",
            "HP OfficeJet Pro 9132e: Einzug für 35 Blatt, laut HP mit beidseitigem Scannen und Kopieren.",
            "Epson EcoTank ET-3950: Einzug für 30 Seiten, laut Epson mit beidseitigem Scan.",
            "Brother DCP-J1360DW: Einzug für 20 Blatt.",
          ],
        },
        {
          art: "text",
          text: "Bei den drei Brother-Geräten nennt die Produktseite kein beidseitiges Scannen über den Einzug. Wer oft doppelseitige Verträge einliest, schaut deshalb zu HP oder Epson und sollte das Tempo kennen: Epson gibt für den Einzug 5 Bilder pro Minute an, beidseitig 3,5. Brother nennt für den MFC-L2800DW 22,5 Bilder pro Minute in Schwarzweiß. Faxen können nur der MFC-L2800DW und der OfficeJet Pro 9132e. Wohin gescannte Belege danach gehören, zeigt der [[/guides/buchhaltung-setup|Guide zum Buchhaltungs-Setup]].",
        },
      ],
    },
    {
      titel: "Worauf solltest du bei den Folgekosten achten?",
      bloecke: [
        {
          art: "text",
          text: "Bei den Folgekosten zählt, wie viele Seiten eine Kartusche, Patrone oder Flasche laut Hersteller schafft und wie viel schon im Karton liegt. Die Tabelle zeigt nur Herstellerangaben. Eigene Kosten pro Seite rechnen wir nicht aus, weil sich die Preise für Verbrauchsmaterial laufend ändern.",
        },
        {
          art: "tabelle",
          kopf: ["Gerät", "Im Karton", "Nachkauf laut Hersteller"],
          zeilen: [
            [
              "Brother MFC-L2800DW",
              "Toner für 700 Seiten",
              "TN-2510: 1.200 Seiten, TN-2510XL: 3.000 Seiten",
            ],
            [
              "HP OfficeJet Pro 9132e",
              "ca. 800 Seiten Schwarz, ca. 420 Seiten Farbe",
              "HP 937: ca. 1.250 Seiten Schwarz, ca. 800 je Farbe. HP 937e: ca. 2.500 Seiten Schwarz, ca. 1.650 je Farbe",
            ],
            [
              "Brother DCP-L3560CDW",
              "ca. 1.000 Seiten Schwarz und je Farbe",
              "TN-248: 1.000 Seiten. TN-248XL: 3.000 Seiten Schwarz, 2.300 je Farbe",
            ],
            [
              "Epson EcoTank ET-3950",
              "15.100 Seiten Schwarz, 5.500 Seiten Farbe",
              "Flaschen der Serie 102: 7.500 Seiten Schwarz, 6.000 Seiten Farbe",
            ],
            [
              "Brother DCP-J1360DW",
              "keine Angabe auf der Produktseite",
              "LC521: 500 Seiten je Patrone",
            ],
          ],
        },
        {
          art: "liste",
          punkte: [
            "HP+: Wer es bei der Einrichtung des OfficeJet Pro 9132e wählt, braucht laut HP ein HP Konto und eine stabile Internetverbindung und nutzt über die gesamte Nutzungsdauer ausschließlich Original-HP-Tinte.",
            "Patronen-Sperre: HP weist darauf hin, dass der Drucker Patronen mit einem Chip blockiert, der nicht von HP stammt, und dass Firmware-Updates auch Patronen sperren können, die vorher funktioniert haben.",
            "Abos: HP Instant Ink und Brother EcoPro liefern Tinte oder Toner gegen eine Monatsgebühr. Beide Hersteller nennen sie kündbar. Schließ so etwas erst ab, wenn du deine echte Seitenzahl kennst.",
            "Verschleißteile bei Toner: Beim MFC-L2800DW ist die Trommel ein eigenes Teil für bis zu 15.000 Seiten. Beim DCP-L3560CDW sind es bis zu 30.000 Seiten, dazu kommen Transfereinheit und Resttonerbehälter für je bis zu 50.000 Seiten.",
          ],
        },
        {
          art: "hinweis",
          text: "Reichweiten sind Normwerte der Hersteller, bei Brother nach ISO/IEC 19752, 19798 und 24711. HP schreibt dazu selbst, dass die tatsächliche Reichweite je nach Inhalt der Seiten erheblich abweichen kann.",
        },
      ],
    },
    {
      titel: "Wie viel Tempo, Papier und Druckvolumen brauchst du?",
      bloecke: [
        {
          art: "text",
          text: "Die Hersteller nennen ein empfohlenes Monatsvolumen. HP erklärt den Wert so: Für eine optimale Geräteleistung soll die Zahl der gedruckten Seiten im Monat nicht darüber liegen. Damit ist er ein brauchbarer Hinweis, ob ein Gerät zu deinem Büro passt.",
        },
        {
          art: "liste",
          punkte: [
            "Brother DCP-J1360DW: bis 1.000 Seiten im Monat, Kassette für 150 Blatt.",
            "HP OfficeJet Pro 9132e: bis 2.000 Seiten, laut HP für bis zu 5 Nutzer, zwei Fächer mit je 250 Blatt.",
            "Brother MFC-L2800DW: bis 2.500 Seiten, Kassette für 250 Blatt.",
            "Brother DCP-L3560CDW: bis 3.000 Seiten, Kassette für 250 Blatt.",
            "Epson EcoTank ET-3950: kein Monatsvolumen auf der Produktseite, Epson nennt 1 bis 4 Nutzer und eine Kassette für 250 Blatt.",
          ],
        },
        {
          art: "text",
          text: "Beidseitig drucken können alle fünf, ohne dass du das Papier von Hand wendest. Das kostet Tempo: Epson nennt im beidseitigen Druck 7 Seiten pro Minute in Schwarz statt 18, Brother für den MFC-L2800DW 16 statt 32. Bei zehn Seiten am Tag merkst du davon wenig. Wer jeden Monat mehrere Hundert Seiten für Kunden druckt, schaut zuerst auf die Werte der Tonergeräte.",
        },
        {
          art: "hinweis",
          text: "HP und Epson geben das Drucktempo nach ISO an, Brother beim DCP-J1360DW nach ISO/IEC 24734. Bei den beiden Brother-Tonergeräten steht auf der Produktseite keine Norm an der Angabe.",
        },
      ],
    },
    {
      titel: "WLAN, LAN oder USB: Welche Anschlüsse reichen?",
      bloecke: [
        {
          art: "text",
          text: "Alle fünf Geräte haben WLAN und USB. Einen LAN-Anschluss für das Kabel zum Router haben vier davon, nur der Brother DCP-J1360DW kommt ohne. Arbeitest du allein mit einem Laptop, reicht WLAN. Teilen sich mehrere Rechner den Drucker und steht er ohnehin neben dem Router, kannst du ihn per Kabel fest ins Netz hängen. Für den Druck vom Handy nennen alle fünf Produktseiten Apple AirPrint und Mopria.",
        },
      ],
    },
    {
      titel: "Was kann am Anfang warten?",
      bloecke: [
        {
          art: "text",
          text: "Reihenfolge heißt hier: zuerst das Gerät für das, was du heute druckst. Aufrüsten kannst du, wenn die Seitenzahl es verlangt.",
        },
        {
          art: "liste",
          punkte: [
            "Fax: nur nötig, wenn Kunden oder Behörden es von dir verlangen. Drei der fünf Geräte kommen ohne aus.",
            "Farbe mit Toner: Der DCP-L3560CDW passt, wenn du regelmäßig farbige Unterlagen in Stückzahl druckst. Für ein Angebot pro Woche reicht ein Tintengerät.",
            "Zweites Papierfach und großer Einzug: praktisch ab mehreren Nutzern, im Ein-Personen-Büro selten der Engpass.",
            "Abo für Tinte oder Toner: erst nach zwei, drei Monaten entscheiden, wenn du weißt, wie viel du wirklich druckst.",
          ],
        },
        {
          art: "text",
          text: "Wie der Drucker als Anschaffung in deine Zahlen eingeht, rechnest du im [[/tools/abschreibung|Abschreibungs-Rechner]] durch. Was in den ersten 90 Tagen sonst zuerst dran ist, steht in der [[/tools/erste-schritte-roadmap|Erste-Schritte-Roadmap]].",
        },
      ],
    },
  ],
  kontext: [
    {
      pfad: "/tools/abschreibung",
      label: "Abschreibungs-Rechner",
      text: "Zeigt, welche Abschreibungs-Variante für eine Anschaffung wie den Drucker in Frage kommt.",
    },
    {
      pfad: "/guides/buchhaltung-setup",
      label: "Guide: Buchhaltungs-Setup",
      text: "Vom Buchhaltungstool bis zur Belegablage, damit gescannte Belege an der richtigen Stelle landen.",
    },
    {
      pfad: "/tools/erste-schritte-roadmap",
      label: "Erste-Schritte-Roadmap (90 Tage)",
      text: "Die Aufgaben der ersten 90 Tage in der richtigen Reihenfolge, damit du weißt, was vor der Büro-Ausstattung dran ist.",
    },
  ],
  quellen: [],
};

export default inhalt;
