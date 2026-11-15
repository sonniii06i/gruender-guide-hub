import type { BueroInhalt } from "../types";

const inhalt: BueroInhalt = {
  antwort:
    "Für die meisten Schreibtische reicht ein 27-Zoll-Monitor mit QHD wie der Lenovo ThinkVision T27Q-40. Bei wenig Platz passen 24 Zoll mit Full HD: der Lenovo ThinkVision T24-40 am Desktop-PC oder der Dell P2426HE, der dem Laptop über ein USB-C-Kabel das Bild abnimmt, bis zu 100 W Strom liefert und einen LAN-Anschluss mitbringt. Wer täglich lange Texte oder Layouts bearbeitet, nimmt 4K im LG 27UP850K-W, und der Samsung ViewFinity S6 S65UC ersetzt mit 34 Zoll zwei Monitore.",
  auswahl:
    "Ausgewählt haben wir nach vier Kriterien aus den Datenblättern: Diagonale und Auflösung, Verstellbarkeit des Standfußes, Anschlüsse und die Frage, ob ein USB-C-Kabel den Laptop mitversorgt. Das ist ein Vergleich der Herstellerangaben ohne eigenen Test, wir hatten keines der Geräte auf dem Schreibtisch. Gaming-Monitore und Referenzdisplays für Farbprofis haben wir ausgelassen. In der Liste stehen nur Geräte, die am Stand-Tag bei mindestens einem Partnerhändler lieferbar waren.",
  vergleich: ["Diagonale", "Auflösung", "Panel", "Ergonomie", "USB-C zum Laptop"],
  produkte: [
    {
      id: "lenovo-thinkvision-t27q-40",
      name: "Lenovo ThinkVision T27Q-40",
      marke: "Lenovo",
      ean: "0198155827976",
      rolle: "Standard für die meisten Schreibtische",
      kurz: "27 Zoll mit QHD, voll verstellbarem Standfuß und USB-Hub. Passt, wenn der Rechner per HDMI oder DisplayPort angeschlossen wird und sein eigenes Netzteil behält.",
      daten: [
        { label: "Diagonale", wert: "27 Zoll" },
        { label: "Auflösung", wert: "2.560 × 1.440 (QHD)" },
        { label: "Panel", wert: "IPS, 48 bis 120 Hz" },
        { label: "Helligkeit", wert: "350 cd/m²" },
        { label: "Ergonomie", wert: "Höhe bis 155 mm, Neigung -5° bis +23,5°, Schwenken 45° je Seite, Pivot 90°" },
        { label: "USB-C zum Laptop", wert: "nein (USB-C-Buchse nur als Hub-Ausgang: 15 W, nur Daten)" },
        { label: "Anschlüsse", wert: "1× HDMI 2.1 (TMDS), 1× DisplayPort 1.4, USB-Hub mit 3× USB-A und 1× USB-C (per USB-B zum Rechner)" },
        { label: "Lautsprecher", wert: "nein" },
      ],
      plus: [
        "QHD auf 27 Zoll, laut Datenblatt 109 dpi",
        "Standfuß mit 155 mm Höhenverstellung, Schwenken und Pivot",
        "USB-Hub mit vier Anschlüssen am Monitor",
        "99 % sRGB laut Datenblatt",
      ],
      minus: [
        "Kein Bildsignal und keine Laptop-Ladung über USB-C",
        "Keine Lautsprecher",
        "Kein LAN-Anschluss im Datenblatt",
      ],
      datenblatt: {
        titel: "Lenovo PSREF: ThinkVision T27Q-40, Product Specifications Reference (PDF)",
        url: "https://psref.lenovo.com/syspool/Sys/PDF/ThinkVision/ThinkVision_T27Q_40/ThinkVision_T27Q_40_Spec.pdf",
      },
    },
    {
      id: "lenovo-thinkvision-t24-40",
      name: "Lenovo ThinkVision T24-40",
      marke: "Lenovo",
      ean: "0198155418754",
      rolle: "Einstieg mit voller Höhenverstellung",
      kurz: "23,8 Zoll mit Full HD, dem gleichen verstellbaren Standfuß wie beim 27-Zoll-Modell und USB-Hub. Gedacht für Desktop-PCs und kleine Schreibtische.",
      daten: [
        { label: "Diagonale", wert: "23,8 Zoll" },
        { label: "Auflösung", wert: "1.920 × 1.080 (Full HD)" },
        { label: "Panel", wert: "IPS, 48 bis 120 Hz" },
        { label: "Helligkeit", wert: "250 cd/m²" },
        { label: "Ergonomie", wert: "Höhe bis 155 mm, Neigung -5° bis +23,5°, Schwenken 45° je Seite, Pivot 90° in beide Richtungen" },
        { label: "USB-C zum Laptop", wert: "nein (USB-C-Buchse nur als Hub-Ausgang: 15 W, nur Daten)" },
        { label: "Anschlüsse", wert: "1× HDMI 1.4, 1× DisplayPort 1.2, 1× VGA, USB-Hub mit 3× USB-A und 1× USB-C (per USB-B zum Rechner)" },
        { label: "Lautsprecher", wert: "nein" },
      ],
      plus: [
        "155 mm Höhenverstellung und Pivot in beide Richtungen",
        "USB-Hub mit vier Anschlüssen am Monitor",
        "VGA-Eingang für ältere Rechner",
      ],
      minus: [
        "Kein Bildsignal und keine Laptop-Ladung über USB-C",
        "250 cd/m², der niedrigste Helligkeitswert dieser Auswahl",
        "Keine Lautsprecher",
      ],
      datenblatt: {
        titel: "Lenovo PSREF: ThinkVision T24-40, Product Specifications Reference (PDF)",
        url: "https://psref.lenovo.com/syspool/Sys/PDF/ThinkVision/ThinkVision_T24_40/ThinkVision_T24_40_Spec.pdf",
      },
    },
    {
      id: "dell-pro-p-24-p2426he",
      name: "Dell Pro P 24 USB-C-Hub-Monitor P2426HE",
      marke: "Dell",
      ean: "5397321029441",
      rolle: "Laptop mit einem Kabel, inklusive LAN",
      kurz: "23,8 Zoll mit Full HD und USB-C-Eingang, der laut Dell das Bild überträgt und bis zu 100 W liefert. Dazu LAN-Buchse und DisplayPort-Ausgang am Monitor.",
      daten: [
        { label: "Diagonale", wert: "23,8 Zoll" },
        { label: "Auflösung", wert: "1.920 × 1.080 (Full HD)" },
        { label: "Panel", wert: "IPS, 120 Hz" },
        { label: "Helligkeit", wert: "300 cd/m²" },
        { label: "Ergonomie", wert: "Höhe bis 150 mm, Neigung -5° bis 21°, Schwenken 45° je Seite, Pivot 90° in beide Richtungen" },
        { label: "USB-C zum Laptop", wert: "ja: Bild (DisplayPort 1.4 Alt Mode), Daten und bis 100 W" },
        { label: "Anschlüsse", wert: "1× HDMI, 1× DisplayPort 1.4, 1× DisplayPort-Ausgang, 2× USB-A, 2× USB-C (je bis 15 W), LAN (RJ45, 1 Gbit/s)" },
        { label: "Lautsprecher", wert: "nein" },
      ],
      plus: [
        "USB-C-Eingang mit bis zu 100 W, die höchste Ladeleistung dieser Auswahl",
        "LAN-Anschluss mit 1 Gbit/s am Monitor",
        "DisplayPort-Ausgang für einen zweiten Monitor in Reihe (Daisy-Chain)",
        "USB-C-Kabel (1,8 m, 100 W) laut Dell im Lieferumfang",
      ],
      minus: [
        "Nur Full HD",
        "Keine Lautsprecher und keine Webcam",
      ],
      datenblatt: {
        titel: "Dell: Pro P 24 USB-C-Hub-Monitor P2426HE, Produktseite mit technischen Daten",
        url: "https://www.dell.com/de-de/shop/dell-pro-p-24-usb-c-hub-monitor-p2426he/apd/210-bvkn/monitore-und-monitorzubeh%C3%B6r",
      },
    },
    {
      id: "lg-27up850k-w",
      name: "LG 27UP850K-W",
      marke: "LG",
      ean: "8806087974850",
      rolle: "Für viel Text und Gestaltung in 4K",
      kurz: "27 Zoll mit 4K-Auflösung, 400 cd/m² und USB-C-Eingang mit bis zu 90 W. Für alle, die viel lesen, schreiben oder gestalten und den Laptop mit einem Kabel anschließen wollen.",
      daten: [
        { label: "Diagonale", wert: "27 Zoll" },
        { label: "Auflösung", wert: "3.840 × 2.160 (4K UHD)" },
        { label: "Panel", wert: "IPS, 60 Hz" },
        { label: "Helligkeit", wert: "400 cd/m²" },
        { label: "Ergonomie", wert: "Höhe, Neigung und Pivot verstellbar (Verstellweg nicht angegeben)" },
        { label: "USB-C zum Laptop", wert: "ja: Bild (DisplayPort Alt Mode), Daten und bis 90 W" },
        { label: "Anschlüsse", wert: "2× HDMI 2.0, 1× DisplayPort 1.4, 1× USB-C, 2× USB 3.0 (Downstream), Kopfhörerausgang" },
        { label: "Lautsprecher", wert: "ja, 2× 5 W" },
      ],
      plus: [
        "4K auf 27 Zoll, die höchste Auflösung dieser Auswahl",
        "USB-C-Eingang für Bild, Daten und bis zu 90 W Ladeleistung",
        "DCI-P3 95 % (typ.) und VESA DisplayHDR 400 laut LG",
        "Zwei HDMI-Eingänge und ein DisplayPort",
      ],
      minus: [
        "Höchstens 60 Hz",
        "LG nennt keinen Verstellweg für die Höhe und kein seitliches Schwenken",
        "Kein LAN-Anschluss in den technischen Daten",
      ],
      datenblatt: {
        titel: "LG: 27UP850K-W, Produktseite mit technischen Daten",
        url: "https://www.lg.com/de/monitore/uhd-4k-5k/27up850k-w/",
      },
    },
    {
      id: "samsung-viewfinity-s6-s65uc-34",
      name: "Samsung ViewFinity S6 S65UC 34 Zoll (LS34C652UAUXEN)",
      marke: "Samsung",
      ean: "8806094974751",
      rolle: "Ein breiter Schirm statt zwei Monitoren",
      kurz: "34 Zoll im Format 21:9 mit 3.440 × 1.440 Bildpunkten, gebogenem Panel, USB-C mit 90 W, LAN und KVM-Umschalter. Gedacht als Ersatz für zwei nebeneinander stehende Monitore.",
      daten: [
        { label: "Diagonale", wert: "34 Zoll" },
        { label: "Auflösung", wert: "3.440 × 1.440 (UWQHD, 21:9)" },
        { label: "Panel", wert: "VA, gebogen (1000R), bis 100 Hz" },
        { label: "Helligkeit", wert: "350 cd/m²" },
        { label: "Ergonomie", wert: "Höhe 120 mm, Neigung -2° bis 20°, Schwenken 30° je Seite, kein Pivot angegeben" },
        { label: "USB-C zum Laptop", wert: "ja: Bild, Daten und bis 90 W" },
        { label: "Anschlüsse", wert: "1× HDMI, 1× DisplayPort 1.2, 1× USB-C, USB-Hub mit 3× USB-A 3.0, LAN, Kopfhörerausgang" },
        { label: "Lautsprecher", wert: "ja, 5 W" },
      ],
      plus: [
        "3.440 × 1.440 Bildpunkte auf einer Fläche ohne Rahmen in der Mitte",
        "USB-C mit 90 W Ladeleistung, dazu LAN-Anschluss und USB-Hub",
        "KVM-Umschalter sowie Bild-in-Bild und Bild-neben-Bild für zwei Rechner",
        "Lautsprecher eingebaut",
      ],
      minus: [
        "Kein Pivot in den technischen Daten",
        "120 mm Höhenverstellung, weniger als bei Lenovo und Dell",
        "Energieeffizienzklasse G laut Produktseite",
      ],
      datenblatt: {
        titel: "Samsung: ViewFinity S6 S65UC 34 Zoll (LS34C652UAUXEN), Produktseite mit technischen Daten",
        url: "https://www.samsung.com/de/monitors/high-resolution/viewfinity-s6-s65uc-34-inch-ultra-wqhd-ls34c652uauxen/",
      },
    },
  ],
  abschnitte: [
    {
      titel: "Welche Größe und Auflösung braucht ein Monitor fürs Büro?",
      bloecke: [
        {
          art: "text",
          text: "Größe und Auflösung gehören zusammen. Die Diagonale bestimmt, wie viel Platz der Monitor auf dem Tisch braucht. Die Auflösung bestimmt, wie viele Bildpunkte auf dieser Fläche liegen, und damit, wie scharf Schrift wirkt und wie viele Fenster nebeneinander lesbar bleiben. Lenovo gibt für den T24-40 mit Full HD 95 dpi an, für den T27Q-40 mit QHD 109 dpi.",
        },
        {
          art: "tabelle",
          kopf: ["Kombination", "Bildpunkte", "Passt, wenn", "Gerät aus der Auswahl"],
          zeilen: [
            ["24 Zoll, Full HD (1.920 × 1.080)", "rund 2,1 Mio.", "der Tisch klein ist und meist ein Fenster im Vordergrund steht", "Lenovo T24-40, Dell P2426HE"],
            ["27 Zoll, QHD (2.560 × 1.440)", "rund 3,7 Mio.", "du zwei Fenster nebeneinander brauchst: Rechnung links, Tabelle rechts", "Lenovo T27Q-40"],
            ["27 Zoll, 4K (3.840 × 2.160)", "rund 8,3 Mio.", "du lange Texte liest oder Layouts und Bilder bearbeitest", "LG 27UP850K-W"],
            ["34 Zoll, UWQHD (3.440 × 1.440)", "rund 5,0 Mio.", "du drei Fenster nebeneinander oder lange Zeitachsen brauchst", "Samsung S65UC"],
          ],
        },
        {
          art: "text",
          text: "Full HD auf 27 Zoll haben wir bewusst ausgelassen: Dieselben 2,1 Millionen Bildpunkte verteilen sich dort auf eine größere Fläche, die Schrift wird also gröber. Bei 4K auf 27 Zoll vergrößern Windows und macOS die Darstellung in der Regel, damit Schrift lesbar bleibt. Du gewinnst dann vor allem Schärfe und etwas weniger zusätzliche Arbeitsfläche, als die Zahl vermuten lässt.",
        },
        {
          art: "text",
          text: "Vier der fünf Geräte haben ein IPS-Panel, der gebogene Samsung ein VA-Panel. Die Bildwiederholrate liegt je nach Gerät zwischen 60 und 120 Hz. Für Mails, Tabellen und Videocalls muss sie kein Auswahlkriterium sein.",
        },
      ],
    },
    {
      titel: "Wozu braucht ein Monitor USB-C mit Power Delivery?",
      bloecke: [
        {
          art: "text",
          text: "Ein Monitor mit USB-C-Eingang und Power Delivery bekommt über ein Kabel das Bild vom Laptop und lädt ihn gleichzeitig. Was am Monitor steckt, etwa Tastatur, Maus oder ein Netzwerkkabel, hängt am selben Kabel. Morgens steckst du einen Stecker ein, abends ziehst du einen ab. Das Netzteil des Laptops kann in der Tasche bleiben.",
        },
        {
          art: "liste",
          punkte: [
            "Dell P2426HE: USB-C mit DisplayPort Alt Mode und bis zu 100 W, dazu ein LAN-Anschluss mit 1 Gbit/s.",
            "LG 27UP850K-W: USB-C mit DisplayPort Alt Mode und bis zu 90 W, dazu zwei USB-3.0-Anschlüsse. Einen LAN-Anschluss nennt LG nicht.",
            "Samsung S65UC: USB-C mit 90 W Ladeleistung, LAN-Anschluss und KVM-Umschalter, mit dem zwei Rechner dieselbe Tastatur und Maus nutzen.",
            "Lenovo T24-40 und T27Q-40: Eine USB-C-Buchse ist vorhanden, sie ist laut Datenblatt aber ein Hub-Ausgang mit 15 W und nur für Daten. Das Bild kommt über HDMI oder DisplayPort, der Laptop braucht sein eigenes Netzteil.",
          ],
        },
        {
          art: "text",
          text: "Zwei Dinge prüfst du vor dem Kauf am Laptop. Erstens muss seine USB-C-Buchse ein Bildsignal ausgeben, im Datenblatt steht dann DisplayPort Alt Mode oder Thunderbolt. Zweitens sollte die Wattzahl des Monitors zum Netzteil passen, das dem Laptop beilag. Liefert der Monitor weniger, kann der Akku unter Last langsamer laden.",
        },
        {
          art: "hinweis",
          text: "Das Wort „USB-C“ in der Produktbezeichnung sagt noch wenig. Erst die Zeile zu den Anschlüssen im Datenblatt zeigt, ob die Buchse Bild und Strom überträgt oder nur ein weiterer USB-Port ist.",
        },
      ],
    },
    {
      titel: "Warum ist die Höhenverstellung wichtiger, als viele denken?",
      bloecke: [
        {
          art: "text",
          text: "Ein Monitor ohne Höhenverstellung steht auf der Höhe, die der Hersteller festgelegt hat. Passt sie nicht zu dir, deinem Stuhl und deinem Tisch, landet er auf einem Stapel Bücher. Mit verstellbarem Fuß stellst du die Höhe passend ein und änderst sie wieder, wenn du den Stuhl wechselst, zeitweise im Stehen arbeitest oder jemand anderes am Platz sitzt. Bei günstigeren Monitoren ist der Fuß häufig nur neigbar. Schau deshalb früh auf diese Zeile im Datenblatt.",
        },
        {
          art: "liste",
          punkte: [
            "Höhe: Lenovo nennt für beide ThinkVision-Modelle bis zu 155 mm, Dell 150 mm, Samsung 120 mm. LG nennt den Monitor höhenverstellbar, gibt den Verstellweg aber nicht an.",
            "Pivot, also das Drehen ins Hochformat: bei Lenovo, Dell und LG vorhanden, bei Samsung nicht angegeben. Nützlich für Verträge, lange Dokumente und Code.",
            "VESA-Aufnahme: Alle fünf Hersteller nennen 100 × 100 mm. Damit lässt sich später ein Monitorarm nachrüsten.",
          ],
        },
      ],
    },
    {
      titel: "Ein großer Monitor oder zwei kleine?",
      bloecke: [
        {
          art: "text",
          text: "Zwei 24-Zoll-Monitore mit Full HD zeigen zusammen 3.840 × 1.080 Bildpunkte. Der 34-Zoll-Monitor von Samsung zeigt 3.440 × 1.440: etwas schmaler, dafür ein Drittel mehr Zeilen und kein Rahmen in der Mitte. Dazu kommen ein Stromkabel und ein Bildkabel statt jeweils zwei. Über den KVM-Umschalter und die Bild-neben-Bild-Funktion kann der Samsung laut Hersteller zwei Rechner gleichzeitig zeigen, etwa den eigenen Laptop und den Rechner eines Kunden. Das Panel ist mit 1000R deutlich gebogen. Ob dir das liegt, siehst du am besten vor dem Kauf im Laden.",
        },
        {
          art: "text",
          text: "Zwei Monitore haben andere Vorteile: Du kannst einen hochkant drehen und du kannst nacheinander kaufen. Der Dell P2426HE hat dafür einen DisplayPort-Ausgang, den Dell als Daisy-Chain-Anschluss führt. Ein zweiter Monitor hängt dann am ersten, zum Laptop führt weiter ein Kabel. Ob dein Laptop das unterstützt, steht in seinem Datenblatt.",
        },
      ],
    },
    {
      titel: "Was kann beim Monitor warten?",
      bloecke: [
        {
          art: "text",
          text: "Die Reihenfolge beim Kauf: zuerst Größe und Auflösung passend zum Tisch, dann die Höhenverstellung, dann der Anschluss zu deinem Rechner. Alles Weitere kann warten, bis du merkst, dass es fehlt.",
        },
        {
          art: "liste",
          punkte: [
            "4K: Wer vor allem Mails, Rechnungen und Tabellen bearbeitet, kommt mit QHD aus. Der Umstieg lohnt, sobald Layout oder Bildbearbeitung zum Tagesgeschäft gehören.",
            "Der zweite Monitor: Arbeite erst ein paar Wochen mit einem. Danach weißt du, ob dir Breite fehlt oder ein Hochformat.",
            "Lautsprecher im Monitor: In dieser Auswahl haben sie nur LG und Samsung. Für Videocalls brauchst du ohnehin Mikrofon und Kamera, und beides lässt sich getrennt nachkaufen.",
            "Monitorarm: Dank VESA-Aufnahme bei allen fünf Geräten jederzeit nachrüstbar.",
          ],
        },
        {
          art: "text",
          text: "Wie du den Monitor in der Buchhaltung ansetzt, rechnest du mit dem [[/tools/abschreibung|Abschreibungs-Rechner]] durch. Die Rechnung des Händlers gehört von Anfang an in eine geordnete Ablage, der Guide zum [[/guides/buchhaltung-setup|Buchhaltungs-Setup]] zeigt den Aufbau. Und falls du gerade erst gründest: Welche Anmeldungen vor der Büroausstattung dran sind, steht in der [[/tools/erste-schritte-roadmap|Erste-Schritte-Roadmap]].",
        },
      ],
    },
  ],
  kontext: [
    {
      pfad: "/tools/abschreibung",
      label: "Abschreibungs-Rechner",
      text: "Rechnet durch, wie du eine Anschaffung wie den Monitor steuerlich ansetzt.",
    },
    {
      pfad: "/guides/buchhaltung-setup",
      label: "Guide: Buchhaltungs-Setup",
      text: "Zeigt, wie du Belege wie die Monitor-Rechnung von Anfang an geordnet ablegst.",
    },
    {
      pfad: "/tools/erste-schritte-roadmap",
      label: "Erste-Schritte-Roadmap",
      text: "Sortiert die Aufgaben der ersten 90 Tage, damit die Ausstattung nicht vor den Pflichtterminen kommt.",
    },
  ],
  quellen: [
    {
      titel: "LG UK: 27UP850K-W, Angaben zu Wandhalterung (100 × 100 mm) und Lautsprechern (5 W × 2)",
      url: "https://www.lg.com/uk/monitors/uhd-4k-5k/27up850k-w/",
    },
    {
      titel: "Samsung Schweiz: ViewFinity S6 S65UC (LS34C652UAUXEN), Angaben zu USB-C-Ladeleistung (90 W) und USB-Hub",
      url: "https://www.samsung.com/ch/monitors/high-resolution/viewfinity-s6-s65uc-34-inch-ultra-wqhd-ls34c652uauxen",
    },
    {
      titel: "Samsung Business: ViewFinity S6 S65UC (LS34C652UAUXEN), USB-C für Strom, Daten und Bildsignal",
      url: "https://www.samsung.com/za/business/monitors/high-resolution/viewfinity-s6-s65uc-34-inch-ls34c652uauxen",
    },
  ],
};

export default inhalt;
