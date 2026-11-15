import type { BueroInhalt } from "../types";

const inhalt: BueroInhalt = {
  antwort:
    "Für ein paar Videocalls pro Woche am festen Schreibtisch reicht das kabelgebundene Logitech H390. Wer täglich mehrere Stunden telefoniert und dabei aufsteht, nimmt das Logitech Zone 300 (Bluetooth, bis zu 16 Stunden Sprechzeit) oder das einohrige Jabra Evolve2 65 Mono mit USB-Adapter und Teams-Zertifizierung. Für laute Umgebungen ist das Poly Voyager Focus 2 mit ANC gedacht, für Tischtelefon plus Softphone das Jabra Engage 75 SE mit DECT-Basis.",
  auswahl:
    "Ausgewählt haben wir nach Verbindung, Sprechzeit laut Hersteller, Mikrofon, ANC, Gewicht und Zertifizierung, und zwar so, dass jedes Gerät einen anderen Arbeitsalltag abdeckt. Das ist ein Vergleich der Hersteller-Datenblätter: Wir haben keines der Headsets in der Hand gehabt, alle Angaben stammen von den Produktseiten und Datenblättern von Logitech, Jabra und HP (Poly). Aufgenommen sind nur Geräte, die am Stand-Tag dieser Seite bei mindestens einem Partnerhändler lieferbar waren.",
  vergleich: ["Verbindung", "Sprechzeit", "ANC", "Gewicht", "Zertifizierung"],
  produkte: [
    {
      id: "logitech-h390",
      name: "Logitech H390 USB-Computer-Headset (USB-A)",
      marke: "Logitech",
      ean: "5099206030015",
      rolle: "Für gelegentliche Calls am Schreibtisch",
      kurz: "Kabel-Headset ohne Akku und ohne Pairing: USB-A-Stecker rein, Lautstärke und Stummschaltung sitzen am Kabel. Gedacht für alle, die im Call am Platz bleiben.",
      daten: [
        { label: "Verbindung", wert: "USB-A, kabelgebunden" },
        { label: "Reichweite", wert: "1,9 m Kabel" },
        { label: "Sprechzeit", wert: "kein Akku (Kabel)" },
        { label: "Mikrofon", wert: "1 Mikrofon mit Geräuschunterdrückung, langer Mikrofonbügel" },
        { label: "ANC", wert: "im Datenblatt nicht genannt" },
        { label: "Gewicht", wert: "197 g" },
        { label: "Tragestil", wert: "Kopfbügel, beidohrig" },
        { label: "Zertifizierung", wert: "keine Plattform-Zertifizierung genannt" },
      ],
      plus: [
        "Kein Akku und kein Pairing, läuft über das 1,9 m lange USB-Kabel",
        "Lautstärke und Stummschaltung über die Bedienelemente am Kabel",
        "Mikrofonbügel lässt sich wegdrehen",
        "Laut Logitech kompatibel mit gängigen Telefonie- und Videokonferenz-Anwendungen",
      ],
      minus: [
        "USB-A-Stecker: Laptops, die nur USB-C haben, brauchen einen Adapter oder die USB-C-Version des H390",
        "Keine Teams- oder Zoom-Zertifizierung angegeben",
        "Mit 197 g das schwerste Headset dieser Auswahl",
      ],
      datenblatt: {
        titel: "Logitech: H390 USB-Computer-Headset, Technische Daten",
        url: "https://www.logitech.com/de-de/shop/p/h390-usb-headset.981-000406",
      },
    },
    {
      id: "logitech-zone-300",
      name: "Logitech Zone 300",
      marke: "Logitech",
      ean: "5099206120051",
      rolle: "Kabellos für den ganzen Tag",
      kurz: "Bluetooth-Headset mit bis zu 16 Stunden Gesprächszeit und 122 g Gewicht. Es verbindet sich direkt mit dem Bluetooth von Laptop und Handy, ein USB-Empfänger liegt dieser Version nicht bei.",
      daten: [
        { label: "Verbindung", wert: "Bluetooth 5.3, ohne USB-Empfänger" },
        { label: "Reichweite", wert: "bis zu 30 m (freie Sichtlinie)" },
        { label: "Sprechzeit", wert: "bis zu 16 Std." },
        { label: "Mikrofon", wert: "2 Mikrofone mit Geräuschunterdrückung, langer Mikrofonbügel" },
        { label: "ANC", wert: "im Datenblatt nicht genannt" },
        { label: "Gewicht", wert: "122 g" },
        { label: "Tragestil", wert: "Kopfbügel, beidohrig" },
        { label: "Zertifizierung", wert: "Works With Chromebook" },
      ],
      plus: [
        "Bis zu 16 Std. Gesprächszeit, 5 Minuten Laden ergeben laut Logitech bis zu 1 Std.",
        "Zwei Geräte gleichzeitig verbunden (Multipoint), bis zu 6 gekoppelt",
        "Zwei Mikrofone mit Geräuschunterdrückung am Mikrofonbügel",
        "Geladen wird über USB-C, volle Ladung in 2 Std.",
      ],
      minus: [
        "Kein USB-Empfänger im Lieferumfang dieser Version, die Verbindung hängt am Bluetooth des Rechners",
        "Keine Teams- oder Zoom-Zertifizierung angegeben",
        "ANC im Datenblatt nicht genannt",
      ],
      datenblatt: {
        titel: "Logitech: Zone 300, Technische Daten",
        url: "https://www.logitech.com/de-de/shop/p/zone-300-wireless-headset.981-001407",
      },
    },
    {
      id: "jabra-evolve2-65-mono",
      name: "Jabra Evolve2 65 USB-A MS Teams Mono",
      marke: "Jabra",
      ean: "5706991022964",
      rolle: "Ein Ohr frei, mit Teams-Zertifizierung",
      kurz: "Einohriges Bluetooth-Headset mit USB-A-Adapter Link 380 und der längsten Gesprächsdauer dieser Auswahl. Für alle, die viel in Microsoft Teams telefonieren und den Raum um sich herum weiter hören wollen.",
      daten: [
        { label: "Verbindung", wert: "Bluetooth 5.0, USB-A-Adapter Jabra Link 380" },
        { label: "Reichweite", wert: "bis zu 30 m" },
        { label: "Sprechzeit", wert: "bis zu 35 Std. (Busylight aus), bis zu 24 Std. (Busylight an)" },
        { label: "Mikrofon", wert: "3 digitale MEMS-Mikrofone" },
        { label: "ANC", wert: "nein (Jabra: N/A)" },
        { label: "Gewicht", wert: "99,2 g (Mono)" },
        { label: "Tragestil", wert: "Überkopfbügel, ohraufliegend, ein Ohr (Mono)" },
        { label: "Zertifizierung", wert: "Microsoft Teams, erfüllt laut Jabra Teams Open Office" },
      ],
      plus: [
        "Bis zu 35 Std. Gesprächsdauer bei ausgeschaltetem Busylight",
        "USB-A-Bluetooth-Adapter Jabra Link 380 im Lieferumfang",
        "Zwei Bluetooth-Verbindungen gleichzeitig, bis zu 8 Geräte in der Pairing-Liste",
        "Busylight: rote LED zeigt anderen im Raum, dass du im Gespräch bist",
      ],
      minus: [
        "Kein ANC (Jabra gibt N/A an)",
        "Mono: Gesprächspartner und Musik nur auf einem Ohr",
        "Adapter mit USB-A-Stecker: für reine USB-C-Laptops gibt es bei Jabra eine eigene USB-C-Variante",
      ],
      datenblatt: {
        titel: "Jabra: Evolve2 65, Technische Daten",
        url: "https://www.jabra.com/de-de/business/office-headsets/jabra-evolve/jabra-evolve2-65",
      },
    },
    {
      id: "poly-voyager-focus-2",
      name: "Poly Voyager Focus 2 USB-C (Microsoft Teams)",
      marke: "Poly",
      ean: "0198122157228",
      rolle: "Für laute Umgebungen, mit ANC",
      kurz: "Das einzige Gerät dieser Auswahl, dessen Datenblatt aktive Geräuschunterdrückung am Ohr nennt, dazu ein Mikrofonarm mit Geräuschunterdrückung. Für Großraum, Coworking oder das Homeoffice neben der Baustelle.",
      daten: [
        { label: "Verbindung", wert: "Bluetooth 5.1, BT700-Adapter (USB-C, mit USB-A-Adapterstück)" },
        { label: "Reichweite", wert: "bis zu 50 m" },
        { label: "Sprechzeit", wert: "bis zu 16 Std. (ANC und Online-Anzeige an), bis zu 25 Std. (beides aus)" },
        { label: "Mikrofon", wert: "Mikrofonarm mit Geräuschunterdrückung (Acoustic Fence)" },
        { label: "ANC", wert: "ja, Hybrid-ANC in 3 Stufen (hoch, niedrig, aus)" },
        { label: "Gewicht", wert: "175 g" },
        { label: "Tragestil", wert: "Kopfbügel, On-Ear, beidohrig (Stereo)" },
        { label: "Zertifizierung", wert: "Microsoft Teams (diese Variante); HP nennt außerdem Zoom und Google Meet" },
      ],
      plus: [
        "Hybrid-ANC in drei Stufen",
        "Stummschaltung durch Drehen des Mikrofonarms",
        "BT700-Adapter für USB-C und Adapterstück auf USB-A im Lieferumfang",
        "Lässt sich laut HP per USB-Kabel auch kabelgebunden nutzen",
      ],
      minus: [
        "Mit ANC und Online-Anzeige in der Standardeinstellung bis zu 16 Std. Sprechzeit statt bis zu 25 Std.",
        "175 g, das schwerste kabellose Headset dieser Auswahl",
      ],
      datenblatt: {
        titel: "HP: Produktblatt Poly Voyager Focus 2 USB-C, für Microsoft Teams zertifiziert (9T9J4AA)",
        url: "https://pcb.inc.hp.com/dc/api/productsheet/de-de/2102170974/pdf/9T9J4AA.pdf",
      },
    },
    {
      id: "jabra-engage-75-se",
      name: "Jabra Engage 75 SE Stereo",
      marke: "Jabra",
      ean: "5706991031317",
      rolle: "Für Tischtelefon und Softphone (DECT)",
      kurz: "DECT-Headset mit Basisstation, an der Tischtelefon, Softphone am Rechner und zwei Bluetooth-Geräte gleichzeitig hängen. Für Büros, in denen Kunden noch über eine Festnetznummer anrufen.",
      daten: [
        { label: "Verbindung", wert: "DECT zur Basisstation; Basis mit 2 x USB-C, Tischtelefon-Anschluss, Bluetooth 5.0" },
        { label: "Reichweite", wert: "bis zu 150 m" },
        { label: "Sprechzeit", wert: "bis zu 13 Std." },
        { label: "Mikrofon", wert: "Mikrofon mit Geräuschunterdrückung" },
        { label: "ANC", wert: "im Datenblatt nicht genannt" },
        { label: "Gewicht", wert: "82 g (Stereo)" },
        { label: "Tragestil", wert: "Überkopfbügel, beidohrig (Stereo)" },
        { label: "Zertifizierung", wert: "keine Plattform-Zertifizierung genannt" },
      ],
      plus: [
        "Bis zu fünf Geräte gleichzeitig: Tischtelefon, Softphone, analoges Festnetztelefon, zwei Bluetooth-Geräte",
        "Bis zu 150 m Reichweite laut Jabra",
        "82 g, das leichteste Headset dieser Auswahl",
        "40 % Akku nach 30 Minuten, voll nach 90 Minuten",
      ],
      minus: [
        "Braucht die Basisstation mit Netzteil und damit einen festen Arbeitsplatz",
        "Bis zu 13 Std. Gesprächszeit, die kürzeste Angabe der kabellosen Geräte dieser Auswahl",
      ],
      datenblatt: {
        titel: "Jabra: Engage 75 SE, Technische Daten",
        url: "https://www.jabra.com/de-de/business/office-headsets/jabra-engage/jabra-engage-75-se",
      },
    },
  ],
  abschnitte: [
    {
      titel: "Kabel oder kabellos: Welches Headset passt zu deinem Arbeitstag?",
      bloecke: [
        {
          art: "text",
          text: "Ein Kabel-Headset braucht keinen Akku und kein Pairing. Das Logitech H390 hängt per USB-A am Rechner, das Kabel ist 1,9 m lang, Lautstärke und Stummschaltung sitzen am Kabel. Das reicht, solange du im Call am Platz bleibst. Schau vorher auf die Buchsen deines Laptops: Hat er nur USB-C, brauchst du einen Adapter oder die USB-C-Version, die Logitech ebenfalls führt.",
        },
        {
          art: "text",
          text: "Kabellos lohnt sich, sobald du jeden Tag mehrere Stunden telefonierst und dabei aufstehst, etwas holst oder im Raum gehst. Dann zählen drei Angaben aus dem Datenblatt: wie das Headset an den Rechner kommt, wie lange der Akku im Gespräch hält und wie weit du dich entfernen kannst.",
        },
        {
          art: "tabelle",
          kopf: ["Gerät", "Verbindung zum Rechner", "Sprechzeit laut Hersteller", "Reichweite laut Hersteller"],
          zeilen: [
            ["Logitech Zone 300", "Bluetooth 5.3 direkt", "bis zu 16 Std.", "bis zu 30 m"],
            ["Jabra Evolve2 65 Mono", "USB-A-Adapter oder Bluetooth 5.0", "bis zu 35 Std. (Busylight aus)", "bis zu 30 m"],
            ["Poly Voyager Focus 2", "BT700-Adapter oder Bluetooth 5.1", "bis zu 16 Std. mit ANC, bis zu 25 Std. ohne", "bis zu 50 m"],
            ["Jabra Engage 75 SE", "DECT-Basisstation", "bis zu 13 Std.", "bis zu 150 m"],
          ],
        },
        {
          art: "hinweis",
          text: "Reichweiten sind Herstellerangaben. Logitech nennt die 30 m ausdrücklich für freie direkte Sichtlinie und schreibt dazu, dass die Reichweite von der Umgebung und den Einstellungen des Computers abhängt.",
        },
      ],
    },
    {
      titel: "Bluetooth direkt, USB-Adapter oder DECT: Was ist der Unterschied?",
      bloecke: [
        {
          art: "text",
          text: "Das Zone 300 koppelst du direkt mit dem Bluetooth deines Laptops, ein USB-Empfänger liegt dieser Version nicht bei. Jabra Evolve2 65 und Poly Voyager Focus 2 bringen einen USB-Bluetooth-Adapter mit, der im Rechner steckt und die Funkstrecke zum Headset übernimmt. Microsoft schreibt in seiner Geräte-Dokumentation zu Teams, dass die Leistung bei direkter Kopplung vom Bluetooth des jeweiligen PCs abhängt und dass die meisten zertifizierten Bluetooth-Headsets für den Betrieb mit USB-Adapter gebaut sind. Lebst du von Gesprächen, etwa in Beratung, Vertrieb oder Support, spricht das für ein Modell mit Adapter.",
        },
        {
          art: "text",
          text: "Zone 300 und Evolve2 65 halten laut Datenblatt zwei Bluetooth-Verbindungen gleichzeitig, zum Beispiel Laptop und Handy. Beim Voyager Focus 2 nennt HP den PC über den Adapter und das Mobiltelefon über Bluetooth.",
        },
        {
          art: "text",
          text: "DECT ist der Funkstandard der schnurlosen Festnetztelefone. Das Jabra Engage 75 SE funkt damit zu einer Basisstation auf dem Schreibtisch. An dieser Basis hängen laut Jabra bis zu fünf Geräte gleichzeitig: Tischtelefon, Softphone am Rechner, analoges Festnetztelefon und zwei Bluetooth-Geräte. Das lohnt sich, wenn bei dir ein Tischtelefon steht, über das Kunden anrufen. Die Basis braucht ihr Netzteil und einen festen Platz.",
        },
      ],
    },
    {
      titel: "Braucht ein Headset eine Teams- oder Zoom-Zertifizierung?",
      bloecke: [
        {
          art: "text",
          text: "Zum Telefonieren brauchst du sie nicht. Logitech gibt für H390 und Zone 300 keine Teams- oder Zoom-Zertifizierung an und nennt beide trotzdem kompatibel mit gängigen Telefonie-Anwendungen. Die Zertifizierung betrifft Bedienung und geprüfte Tonqualität: Laut Microsoft funktionieren zertifizierte Geräte ohne zusätzliche Einrichtung und steuern Anrufe in Teams am Headset, also annehmen, auflegen, stummschalten und Lautstärke. Neuere zertifizierte Geräte haben dazu eine eigene Teams-Taste mit LED.",
        },
        {
          art: "liste",
          punkte: [
            "Jabra Evolve2 65: hier in der Teams-Variante, die Teams-Benachrichtigungen per LED anzeigt. Daneben gibt es eine UC-Variante, die Jabra als für Zoom zertifiziert angibt.",
            "Poly Voyager Focus 2: Die gewählte Variante ist für Microsoft Teams zertifiziert. HP nennt für das Modell außerdem Zoom und Google Meet.",
            "Logitech Zone 300: laut Logitech „Works With Chromebook“.",
            "Logitech H390 und Jabra Engage 75 SE: keine Plattform-Zertifizierung im Datenblatt.",
          ],
        },
        {
          art: "text",
          text: "Kauf die Variante für das Programm, in dem du die meisten Calls führst. Wechselst du je nach Kunde zwischen Teams, Zoom und Google Meet, ist die Zertifizierung kein Kaufgrund. Dann entscheiden Mikrofon, Gewicht und Sprechzeit.",
        },
      ],
    },
    {
      titel: "Geräuschunterdrückung am Mikrofon oder ANC: Was hilft gegen Lärm?",
      bloecke: [
        {
          art: "text",
          text: "Hinter dem Wort stecken zwei verschiedene Funktionen. Die Geräuschunterdrückung am Mikrofon filtert, was dein Gegenüber hört. ANC, die aktive Geräuschunterdrückung am Ohr, dämpft, was du selbst hörst. Stört der Lärm deine Kunden, achte auf das Mikrofon. Stört er dich, brauchst du ANC.",
        },
        {
          art: "text",
          text: "Ein Mikrofon mit Geräuschunterdrückung nennen Logitech beim H390 (ein Mikrofon) und beim Zone 300 (zwei), HP beim Voyager Focus 2 (Acoustic Fence am Mikrofonarm) und Jabra beim Engage 75 SE. Beim Evolve2 65 gibt Jabra drei Mikrofone an und schreibt, dass das Headset mit heruntergeklapptem Mikrofonarm Microsofts Anforderung „Premium Microphone for Open Office“ erfüllt. Microsoft beschreibt diese Stufe so: Das Headset nimmt die Stimme des Trägers auf und überträgt den Ton der Sitznachbarn nicht mit.",
        },
        {
          art: "text",
          text: "ANC steht in dieser Auswahl nur beim Poly Voyager Focus 2 im Datenblatt, in drei Stufen: hoch, niedrig, aus. Jabra gibt beim Evolve2 65 ausdrücklich kein ANC an und verweist auf die abschirmenden Ohrpolster. ANC kostet Akku: HP nennt bis zu 16 Stunden Sprechzeit mit ANC und Online-Anzeige in der Standardeinstellung und bis zu 25 Stunden, wenn beides aus ist.",
        },
      ],
    },
    {
      titel: "Mono oder Stereo: Was ist besser fürs Telefonieren?",
      bloecke: [
        {
          art: "text",
          text: "Ein Mono-Headset sitzt auf einem Ohr, das andere bleibt frei für Kollegen, Türklingel oder Paketboten. Dazu ist es leichter: Das Jabra Evolve2 65 wiegt als Mono 99,2 g, die Stereo-Version laut Jabra 176,4 g. Stereo passt, wenn du zwischen den Calls Musik hörst oder beide Ohren abschirmen willst.",
        },
        {
          art: "text",
          text: "Trägst du das Headset einen ganzen Arbeitstag, lohnt der Blick aufs Gewicht. Die Stereo-Geräte der Auswahl liegen laut Hersteller bei 82 g (Jabra Engage 75 SE), 122 g (Logitech Zone 300), 175 g (Poly Voyager Focus 2) und 197 g (Logitech H390). Beide Jabra-Headsets haben außerdem ein Busylight, eine rote LED, die im Gespräch leuchtet und anderen im Raum zeigt, dass du gerade nicht ansprechbar bist.",
        },
      ],
    },
    {
      titel: "Was kann beim Headset-Kauf warten?",
      bloecke: [
        {
          art: "text",
          text: "Die Reihenfolge: Zähl zuerst, wie viele Stunden pro Woche du wirklich in Calls sitzt und in welchem Programm. Bei zwei, drei Terminen pro Woche reicht das H390, und das Geld bleibt für Posten, die am Anfang mehr drängen. Die Ausstattung trägst du im [[/gruendungskosten-rechner|Gründungskosten-Rechner]] als eigenen Posten ein. Was in den ersten 90 Tagen zuerst dran ist, zeigt die [[/tools/erste-schritte-roadmap|Erste-Schritte-Roadmap]].",
        },
        {
          art: "liste",
          punkte: [
            "ANC, solange du allein in einem ruhigen Raum arbeitest.",
            "DECT mit Basisstation, solange bei dir kein Tischtelefon steht und du nur über Rechner und Handy telefonierst.",
            "Eine Ladestation. Jabra bietet das Evolve2 65 auch mit Ladestation an, geladen wird sonst über das USB-Kabel.",
            "Die Zertifizierung für ein Programm, das du nur gelegentlich nutzt.",
          ],
        },
        {
          art: "text",
          text: "Aufrüsten kannst du, wenn die Calls mehr werden: erst kabellos, dann ANC, falls du in ein lautes Büro ziehst. Wie sich die Anschaffung in der Buchhaltung auswirkt, rechnet der [[/tools/abschreibung|Abschreibungs-Rechner]] durch.",
        },
      ],
    },
  ],
  kontext: [
    {
      pfad: "/tools/abschreibung",
      label: "Abschreibungs-Rechner",
      text: "Rechnet durch, wie sich die Anschaffung von Bürogeräten auf Steuer und Liquidität auswirkt.",
    },
    {
      pfad: "/gruendungskosten-rechner",
      label: "Gründungskosten-Rechner",
      text: "Stellt die Kosten der Gründung zusammen, die Erstausstattung trägst du als eigenen Posten ein.",
    },
    {
      pfad: "/tools/erste-schritte-roadmap",
      label: "Erste-Schritte-Roadmap (90 Tage)",
      text: "Zeigt die Aufgaben der ersten 30, 60 und 90 Tage in der Reihenfolge, in der sie anstehen.",
    },
    {
      pfad: "/vorlagen/homeoffice-vereinbarung",
      label: "Vorlage: Homeoffice-Vereinbarung",
      text: "Regelt mit dem ersten Mitarbeiter, welche Arbeitsmittel wie Laptop und Headset du leihweise stellst.",
    },
  ],
  quellen: [
    {
      titel: "Microsoft Learn: Telefone und Geräte für Microsoft Teams (Zertifizierungsprogramm für Peripheriegeräte)",
      url: "https://learn.microsoft.com/de-de/microsoftteams/devices/usb-devices",
    },
    {
      titel: "HP: Poly Voyager Focus 2, Produktseite (Reichweite, Bluetooth-Version, Zertifizierungen)",
      url: "https://www.hp.com/de-de/poly/headsets/bluetooth-headsets-and-earbuds/voyager-focus-2.html",
    },
    {
      titel: "HP: Poly Voyager Focus 2, Datenblatt der Modellreihe (Tragestil On-Ear, Bluetooth 5.1)",
      url: "https://h20195.www2.hp.com/v2/GetDocument.aspx?docname=c08398922",
    },
    {
      titel: "Jabra: Evolve2 65, Varianten und Artikelnummern",
      url: "https://www.jabra.com/de-de/business/office-headsets/jabra-evolve/jabra-evolve2-65/buy",
    },
    {
      titel: "Jabra: Engage 75 SE, Varianten und Artikelnummern",
      url: "https://www.jabra.com/de-de/business/office-headsets/jabra-engage/jabra-engage-75-se/buy",
    },
  ],
};

export default inhalt;
