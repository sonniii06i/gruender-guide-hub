import type { BueroInhalt } from "../types";

// Datenblatt-Vergleich, kein Test. Alle Produktangaben von den Herstellerseiten
// (Satechi, i-tec, Belkin), abgerufen am 15.11.2026. Keine Preise in dieser Datei.

const inhalt: BueroInhalt = {
  antwort:
    "Für unterwegs und als Einstieg reicht der Hub Satechi 7-in-1 USB-C Slim Multiport Adapter mit einem HDMI-Monitor, LAN und Kartenleser. Am festen Schreibtisch mit Windows-Laptop passt die i-tec USB-C Triple Display Docking Station Gen 2 Pro, die den Laptop mit bis zu 100 W lädt. Hängt ein MacBook mit M1 oder M2 an zwei Monitoren, nennt i-tec die DisplayLink-Dock Dual Display Docking Station Gen2 dafür ausdrücklich; die Belkin Thunderbolt 4 Dock Pro ist für Thunderbolt-Laptops mit zwei 4K-Monitoren gedacht.",
  auswahl:
    "Verglichen haben wir die Produktseiten und Handbücher der Hersteller nach fünf Kriterien: Anschluss zum Laptop, Ladeleistung, Zahl und Auflösung der Monitore, USB-Ports und eigenes Netzteil. Das ist ein Datenblatt-Vergleich ohne eigenen Test: Alle Angaben stammen von Satechi, i-tec und Belkin und wurden am Stand-Tag abgerufen. In der Auswahl sind nur Geräte, die an diesem Tag bei mindestens einem Partnerhändler lieferbar waren. Modelle, deren Herstellerseite sich nicht abrufen ließ oder deren Angaben sich widersprachen, haben wir weggelassen.",
  vergleich: [
    "Anschluss zum Laptop",
    "Ladeleistung zum Laptop",
    "Eigenes Netzteil",
    "Monitore laut Hersteller",
    "USB-Ports für Geräte",
  ],
  produkte: [
    {
      id: "satechi-7-in-1-slim-ethernet",
      name: "Satechi 7-in-1 USB-C Slim Multiport Adapter with Ethernet (ST-P7SM)",
      marke: "Satechi",
      ean: "0810086361496",
      rolle: "Für unterwegs und den Einstieg",
      kurz: "Hub mit sieben Anschlüssen für die Laptoptasche: ein HDMI-Monitor mit 4K bei 60 Hz, Gigabit-LAN, zwei USB-A-Ports mit 10 Gbit/s und Kartenleser. Ein eigenes Netzteil hat er nicht, das Ladegerät des Laptops wird durchgeleitet.",
      daten: [
        { label: "Anschluss zum Laptop", wert: "USB-C, Kabel am Hub" },
        { label: "Ladeleistung zum Laptop", wert: "max. 80 W (USB-C PD, 100 W Eingang)" },
        { label: "Eigenes Netzteil", wert: "Nein, das Laptop-Ladegerät wird durchgeleitet" },
        { label: "Monitoranschlüsse", wert: "1× HDMI" },
        { label: "Monitore laut Hersteller", wert: "1 Monitor, 4K bei 60 Hz" },
        { label: "USB-Ports für Geräte", wert: "2× USB-A (10 Gbit/s)" },
        { label: "LAN / Kartenleser", wert: "Gigabit-LAN, SD und microSD (UHS-I)" },
        { label: "Systeme laut Hersteller", wert: "Keine Betriebssysteme genannt; laut Handbuch ohne Treiberinstallation" },
      ],
      plus: [
        "HDMI mit 4K bei 60 Hz",
        "Gigabit-LAN und Kartenleser für SD und microSD",
        "Zwei USB-A-Ports mit 10 Gbit/s",
      ],
      minus: [
        "Nur ein Monitoranschluss",
        "Der USB-C-PD-Port lädt nur, Daten und Bild überträgt er laut Handbuch nicht",
        "Laut Handbuch jeweils nur eine externe Festplatte, Apple USB SuperDrive wird nicht unterstützt",
      ],
      datenblatt: {
        titel: "Satechi: User Manual 7-in-1 USB-C Slim Multiport Adapter with Ethernet (ST-P7SM, ST-P7SS, ST-P7SK)",
        url: "https://support.satechi.com/hc/en-us/articles/53785456534555-User-Manual-7-in-1-USB-C-Slim-Multiport-Adapter-with-Ethernet-ST-P7SM-ST-P7SS-ST-P7SK",
      },
    },
    {
      id: "i-tec-usb-c-triple-display-gen2-pro",
      name: "i-tec USB-C Triple Display Docking Station Gen 2 Pro + Power Delivery 100W (C31TRIPLEDOCKPDPRO2)",
      marke: "i-tec",
      ean: "8595611706592",
      rolle: "Fester Platz mit Windows-Laptop",
      kurz: "USB-C-Dock mit eigenem Netzteil für den Schreibtisch: lädt den Laptop mit bis zu 100 W und verteilt das Bild per MST auf bis zu drei Monitore. Unter macOS zeigen laut i-tec alle angeschlossenen Monitore dasselbe Bild.",
      daten: [
        { label: "Anschluss zum Laptop", wert: "USB-C mit DisplayPort Alt Mode, USB4 oder Thunderbolt 3/4/5 (Kabel 100 cm liegt bei)" },
        { label: "Ladeleistung zum Laptop", wert: "bis 100 W" },
        { label: "Eigenes Netzteil", wert: "Ja, liegt bei (20 V/6,5 A)" },
        { label: "Monitoranschlüsse", wert: "2× DisplayPort, 1× HDMI" },
        { label: "Monitore laut Hersteller", wert: "Bis 3 unter Windows (MST); 2× 4K bei 60 Hz nur mit DisplayPort 1.4 und DSC am Laptop, sonst weniger" },
        { label: "USB-Ports für Geräte", wert: "2× USB-C (10 Gbit/s, nur Daten), 1× USB-A (10 Gbit/s), 3× USB-A (5 Gbit/s)" },
        { label: "LAN / Kartenleser", wert: "Gigabit-LAN, kein Kartenleser genannt" },
        { label: "Systeme laut Hersteller", wert: "Windows 10/11, ChromeOS, Linux; macOS und iPadOS nur gespiegelt, Android nur gespiegelt außer mit DEX oder Easy Projection" },
      ],
      plus: [
        "Lädt den Laptop mit bis zu 100 W, Netzteil liegt bei",
        "Sechs USB-Ports für Geräte, drei davon mit 10 Gbit/s",
        "Drei Monitoranschlüsse (2× DisplayPort, 1× HDMI)",
        "Vorrichtung für Kensington-Schloss, Ein/Aus-Schalter",
      ],
      minus: [
        "macOS unterstützt laut i-tec kein MST: mehrere Monitore zeigen dasselbe Bild",
        "Auflösung hängt vom Laptop ab: mit DisplayPort 1.2 nennt i-tec für zwei Monitore 1080p bei 60 Hz",
        "Kein Kartenleser in den Herstellerdaten",
      ],
      datenblatt: {
        titel: "i-tec: USB-C Triple Display Docking Station Gen 2 Pro + Power Delivery 100W (C31TRIPLEDOCKPDPRO2)",
        url: "https://i-tec.pro/de/produkt/c31tripledockpdpro2-2/",
      },
    },
    {
      id: "belkin-usb-c-dual-display-dock",
      name: "Belkin Universal-USB-C-Dock für zwei Bildschirme (INC002vfBK)",
      marke: "Belkin",
      ean: "0745883813667",
      rolle: "Zwei Full-HD-Monitore per DisplayLink",
      kurz: "DisplayLink-Dock mit 135-W-Netzteil für zwei Full-HD-Monitore an Windows-, Mac- oder Chrome-Geräten. Belkin führt in der Kompatibilitätsliste auch das MacBook Air M1 (2020) und verlangt vor der Nutzung den DisplayLink-Treiber.",
      daten: [
        { label: "Anschluss zum Laptop", wert: "USB-C (Kabel liegt bei), Bild über DisplayLink" },
        { label: "Ladeleistung zum Laptop", wert: "bis 85 W" },
        { label: "Eigenes Netzteil", wert: "Ja, 135 W liegt bei" },
        { label: "Monitoranschlüsse", wert: "2× HDMI 1.4" },
        { label: "Monitore laut Hersteller", wert: "2 Monitore mit 1080p (Full HD)" },
        { label: "USB-Ports für Geräte", wert: "3× USB-A (5 Gbit/s), einer davon mit BC 1.2" },
        { label: "LAN / Kartenleser", wert: "Gigabit-LAN, kein Kartenleser genannt" },
        { label: "Systeme laut Hersteller", wert: "Windows-, Mac- und Chrome-Geräte; DisplayLink-Treiber nötig" },
      ],
      plus: [
        "Zwei Monitore laut Belkin an Windows-, Mac- und Chrome-Geräten, MacBook Air M1 (2020) steht in der Kompatibilitätsliste",
        "135-W-Netzteil liegt bei, bis zu 85 W gehen an den Laptop",
        "Gigabit-LAN und 3,5-mm-Audiobuchse",
      ],
      minus: [
        "Monitorausgänge nur HDMI 1.4 für 1080p, 4K nennt Belkin nicht",
        "DisplayLink-Treiber muss vor der Nutzung geladen werden",
        "Nur drei USB-A-Ports für Geräte, kein Kartenleser genannt",
      ],
      datenblatt: {
        titel: "Belkin: Universal-USB-C-Dock für zwei Bildschirme (INC002vfBK)",
        url: "https://www.belkin.com/de/p/usb-c-dual-display-docking-station/INC002vfBK.html",
      },
    },
    {
      id: "i-tec-dual-display-dock-gen2-displaylink",
      name: "i-tec USB-A / USB-C / Thunderbolt Dual Display Docking Station Gen2 + Power Delivery 100W (CADUA4KDOCKPDL2)",
      marke: "i-tec",
      ean: "8595611705861",
      rolle: "Zwei 4K-Monitore, auch am MacBook M1/M2",
      kurz: "DisplayLink-Dock für zwei Monitore mit 4K bei 60 Hz, was i-tec ausdrücklich auch für die Apple-Plattformen M1 und M2 angibt. Ein Laptop ohne passenden USB-C-Port lässt sich über den beiliegenden USB-A-Adapter anschließen, wird dann aber nicht geladen.",
      daten: [
        { label: "Anschluss zum Laptop", wert: "USB-C, USB4 oder Thunderbolt 3/4/5; USB-A über beiliegenden Adapter (dann ohne Laden)" },
        { label: "Ladeleistung zum Laptop", wert: "bis 100 W" },
        { label: "Eigenes Netzteil", wert: "Ja, liegt bei (20 V/6,5 A)" },
        { label: "Monitoranschlüsse", wert: "2× DisplayPort, 2× HDMI 2.0" },
        { label: "Monitore laut Hersteller", wert: "2 Monitore mit 4K bei 60 Hz, laut i-tec auch auf Apple M1/M2; 1 Monitor mit 5K bei 60 Hz nur unter Windows" },
        { label: "USB-Ports für Geräte", wert: "2× USB-C (10 Gbit/s), 4× USB-A (5 Gbit/s)" },
        { label: "LAN / Kartenleser", wert: "Gigabit-LAN, kein Kartenleser genannt" },
        { label: "Systeme laut Hersteller", wert: "Windows 10/11, macOS, ChromeOS, Linux, Android; unter macOS Treiberinstallation nötig" },
      ],
      plus: [
        "Zwei 4K-Monitore mit 60 Hz, laut i-tec auch an Apple M1/M2",
        "Vier Monitorausgänge zur Wahl (2× DisplayPort, 2× HDMI 2.0)",
        "Lädt den Laptop mit bis zu 100 W, Netzteil liegt bei",
        "Vorrichtung für Kensington-Schloss und VESA-Montage",
      ],
      minus: [
        "DisplayLink-Docks geben laut i-tec höchstens 60 Hz aus",
        "Unter macOS muss der DisplayLink-Treiber installiert und in den Sicherheitseinstellungen freigegeben werden",
        "Am USB-A-Port des Laptops wird nicht geladen",
      ],
      datenblatt: {
        titel: "i-tec: USB-A / USB-C / Thunderbolt Dual Display Docking Station Gen2 + Power Delivery 100W (CADUA4KDOCKPDL2)",
        url: "https://i-tec.pro/de/produkt/cadua4kdockpdl2-2/",
      },
    },
    {
      id: "belkin-thunderbolt-4-dock-pro",
      name: "Belkin Thunderbolt 4 Dock Pro (INC006vfSGY)",
      marke: "Belkin",
      ean: "0745883829293",
      rolle: "Thunderbolt-Laptop, zwei 4K-Monitore",
      kurz: "Thunderbolt-4-Dock mit 120-W-Netzteil, SD-Kartenleser und zwölf Ports. Belkin nennt zwei Monitore mit 4K bei 60 Hz oder einen mit 8K bei 30 Hz; an M1-MacBooks bleibt es laut Hersteller bei einem externen Bildschirm.",
      daten: [
        { label: "Anschluss zum Laptop", wert: "Thunderbolt 4 (bis 40 Gbit/s), Kabel 0,8 m liegt bei" },
        { label: "Ladeleistung zum Laptop", wert: "bis 90 W" },
        { label: "Eigenes Netzteil", wert: "Ja, 120 W liegt bei" },
        { label: "Monitoranschlüsse", wert: "2× HDMI 2.0, dazu Thunderbolt 4" },
        { label: "Monitore laut Hersteller", wert: "1 Monitor bis 8K bei 30 Hz oder 2 Monitore bis 4K bei 60 Hz; M1-MacBooks nur 1 externer Monitor" },
        { label: "USB-Ports für Geräte", wert: "2× USB-A 3.1, 2× USB-A 2.0, 1× USB-C 3.1 Gen 2 mit PD 3.0" },
        { label: "LAN / Kartenleser", wert: "Gigabit-LAN, SD-Kartenleser" },
        { label: "Systeme laut Hersteller", wert: "Windows 10 (RS3) oder neuer, macOS 11 (Big Sur) oder neuer" },
      ],
      plus: [
        "Zwei Monitore mit 4K bei 60 Hz oder einer mit 8K bei 30 Hz",
        "SD-Kartenleser, Gigabit-LAN und Audio-Anschluss",
        "Bis zu 40 Gbit/s über ein Thunderbolt-4-Kabel",
      ],
      minus: [
        "90 W Ladeleistung, weniger als die beiden i-tec-Docks mit 100 W",
        "M1-MacBooks laut Belkin nur ein externer Monitor, Intel-MacBooks brauchen für zwei einen USB-C-Video-Adapter",
        "Zwei der vier USB-A-Ports sind USB 2.0; Belkins Kompatibilitätstabelle hat den Stand November 2021",
      ],
      datenblatt: {
        titel: "Belkin: Thunderbolt 4 Dock Pro (INC006vfSGY)",
        url: "https://www.belkin.com/de/p/thunderbolt-4-dock-pro/INC006vfSGY.html",
      },
    },
  ],
  abschnitte: [
    {
      titel: "Hub oder Dockingstation: Was ist der Unterschied?",
      bloecke: [
        {
          art: "text",
          text: "Eine feste Definition der beiden Begriffe findest du in keinem der Datenblätter. In dieser Auswahl trennt sie das Netzteil. Der Satechi-Hub hat keines: Du steckst das Ladegerät deines Laptops an seinen USB-C-PD-Port, laut Handbuch nimmt er bis zu 100 W auf und gibt höchstens 80 W an den Laptop weiter. Die vier Docks bringen ein eigenes Netzteil mit und versorgen Laptop und Zubehör über ein einziges Kabel. Das Ladegerät des Laptops bleibt in der Tasche.",
        },
        {
          art: "text",
          text: "Ein Hub passt, wenn du an wechselnden Orten arbeitest und einen Monitor, eine Maus und gelegentlich ein Netzwerkkabel anschließt. Eine Dock lohnt sich, sobald derselbe Schreibtisch jeden Tag mit zwei Monitoren, Tastatur, Webcam und LAN auf dich wartet. Dann steckst du morgens ein Kabel ein statt fünf.",
        },
      ],
    },
    {
      titel: "USB-C, Thunderbolt oder DisplayLink: Welche Dockingstation passt zu meinem Laptop?",
      bloecke: [
        {
          art: "text",
          text: "Der Stecker sieht bei allen fünf Geräten gleich aus, die Technik dahinter unterscheidet sich. Welche bei dir funktioniert, entscheidet der Anschluss deines Laptops.",
        },
        {
          art: "tabelle",
          kopf: ["Technik", "Was der Laptop laut Hersteller braucht", "Gerät in dieser Auswahl"],
          zeilen: [
            [
              "USB-C mit Bildausgabe (MST)",
              "USB-C- oder USB4-Port mit DisplayPort Alt Mode oder Thunderbolt 3/4/5; zum Laden Power Delivery",
              "i-tec Triple Display Gen 2 Pro",
            ],
            [
              "Thunderbolt 4",
              "Thunderbolt-Port, Windows 10 (RS3) oder macOS 11 und neuer",
              "Belkin Thunderbolt 4 Dock Pro",
            ],
            [
              "DisplayLink",
              "Freier USB-C-Port plus DisplayLink-Treiber; bei i-tec reicht mit Adapter auch USB-A",
              "Belkin Universal-USB-C-Dock, i-tec Dual Display Gen2",
            ],
          ],
        },
        {
          art: "text",
          text: "Die i-tec Triple Display verteilt das Bild per MST auf mehrere Monitore. macOS unterstützt MST laut i-tec nicht, zwei Monitore zeigen dann dasselbe Bild. DisplayLink-Docks umgehen das mit einem Treiber: Belkin verlangt den Download vor der ersten Nutzung, i-tec nennt die Installation für macOS und Android, ChromeOS bringt ihn laut i-tec seit Version R51 mit. Die Grenze dieser Technik nennt i-tec ebenfalls: DisplayLink-Docks geben höchstens 60 Hz aus.",
        },
        {
          art: "hinweis",
          text: "Für den Satechi-Hub nennt das Handbuch als Gegenstück nur ein USB-C-Gerät. Ob der USB-C-Port deines Laptops ein Bild ausgibt, steht im Datenblatt des Laptops.",
        },
      ],
    },
    {
      titel: "Wie viel Watt Ladeleistung braucht der Laptop?",
      bloecke: [
        {
          art: "text",
          text: "Schau auf das Netzteil, das deinem Laptop beilag. Die Watt-Zahl ist aufgedruckt, und die Dock sollte mindestens so viel liefern. Liefert sie weniger, kann der Akku unter Last langsamer laden.",
        },
        {
          art: "liste",
          punkte: [
            "Satechi 7-in-1: höchstens 80 W, und nur mit angestecktem Laptop-Ladegerät",
            "Belkin Universal-USB-C-Dock: bis 85 W",
            "Belkin Thunderbolt 4 Dock Pro: bis 90 W",
            "i-tec Triple Display Gen 2 Pro und i-tec Dual Display Gen2: bis 100 W",
          ],
        },
        {
          art: "text",
          text: "i-tec weist darauf hin, dass sich nicht jeder Laptop über USB-C laden lässt, vor allem Geräte mit Netzteilen über 100 W. Der Port des Laptops muss außerdem Power Delivery unterstützen. Hängt die i-tec Dual Display über den USB-A-Adapter am Laptop, lädt sie ihn laut Hersteller gar nicht.",
        },
      ],
    },
    {
      titel: "Wie viele Monitore kann ich an eine Dockingstation anschließen?",
      bloecke: [
        {
          art: "text",
          text: "Die Zahl im Produktnamen gilt nur unter idealen Bedingungen. Was bei dir ankommt, hängt an Laptop und Betriebssystem. Die Herstellerangaben im Einzelnen:",
        },
        {
          art: "liste",
          punkte: [
            "Satechi 7-in-1: ein Monitor über HDMI, 4K bei 60 Hz.",
            "i-tec Triple Display Gen 2 Pro: unter Windows bis zu drei Monitore. Zwei Mal 4K bei 60 Hz nennt i-tec nur für Laptops, deren Port DisplayPort 1.4 mit DSC ausgibt. Mit DisplayPort 1.4 ohne DSC sind es zwei Mal 4K bei 30 Hz oder zwei Mal 1440p bei 60 Hz, mit DisplayPort 1.2 zwei Mal 1080p bei 60 Hz.",
            "Belkin Universal-USB-C-Dock: zwei Monitore mit 1080p. Eine Bildwiederholrate nennt die Produktseite nicht.",
            "i-tec Dual Display Gen2: zwei Monitore mit 4K bei 60 Hz, laut i-tec auch an Apple M1 und M2.",
            "Belkin Thunderbolt 4 Dock Pro: zwei Monitore mit 4K bei 60 Hz oder einer mit 8K bei 30 Hz, drei nur mit bestimmten kompatiblen Laptops. M1-MacBooks unterstützen laut Belkin einen externen Bildschirm, Intel-MacBooks brauchen für zwei einen USB-C-Video-Adapter.",
          ],
        },
        {
          art: "text",
          text: "Belkin schreibt selbst dazu, dass die tatsächliche Ausgabe vom Laptop abhängt. Prüfe deshalb vor dem Kauf im Datenblatt deines Laptops, welche DisplayPort-Version der USB-C-Port ausgibt und wie viele externe Bildschirme der Hersteller nennt.",
        },
        {
          art: "hinweis",
          text: "Belkins Kompatibilitätstabelle zur Thunderbolt 4 Dock Pro trägt den Stand November 2021. Für neuere MacBook-Generationen nennt die Produktseite keine eigenen Werte.",
        },
      ],
    },
    {
      titel: "Welche Anschlüsse sollte eine Dockingstation fürs Büro haben?",
      bloecke: [
        {
          art: "text",
          text: "Zähl durch, was am Schreibtisch dauerhaft steckt: Tastatur, Maus, Webcam, Headset, Drucker, externe Festplatte. Die i-tec Triple Display und die i-tec Dual Display haben je sechs USB-Ports für Geräte, die Belkin Thunderbolt 4 Dock Pro fünf, die Belkin Universal-USB-C-Dock drei und der Satechi-Hub zwei. Gigabit-LAN haben alle fünf. Einen Kartenleser nennen nur Satechi (SD und microSD) und Belkin bei der Thunderbolt 4 Dock Pro (SD). Wer Daten oft auf externe Laufwerke schiebt, achtet auf die schnellen Ports mit 10 Gbit/s: Bei Belkins Universal-Dock laufen alle drei USB-A-Ports mit 5 Gbit/s.",
        },
      ],
    },
    {
      titel: "Was kann warten?",
      bloecke: [
        {
          art: "text",
          text: "Die Reihenfolge am Schreibtisch: erst der Laptop, dann ein Monitor, dann die Frage nach der Dock. Solange nur ein Monitor steht, reicht der Hub. Er wandert später in die Laptoptasche. Die Dock kommt mit dem zweiten Monitor oder mit dem Tag, an dem dich das tägliche Umstecken nervt.",
        },
        {
          art: "text",
          text: "Die Belkin Thunderbolt 4 Dock Pro kann warten, bis ein Thunderbolt-Laptop und zwei 4K-Monitore wirklich auf dem Tisch stehen. Belkin empfiehlt sie für Thunderbolt-fähige Laptops.",
        },
        {
          art: "text",
          text: "Wie du Bürogeräte in der Buchhaltung ansetzt, rechnest du im [[/tools/abschreibung|Abschreibungs-Rechner]] durch. Und bevor Geld in den Schreibtisch fließt: In den ersten Wochen zählen Anmeldungen und Fristen mehr als Zubehör. Was davon zuerst dran ist, zeigt die [[/tools/erste-schritte-roadmap|Erste-Schritte-Roadmap]].",
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
      pfad: "/tools/erste-schritte-roadmap",
      label: "Erste-Schritte-Roadmap (90 Tage)",
      text: "Zeigt, welche Anmeldungen und Fristen in den ersten Wochen vor der Büro-Ausstattung dran sind.",
    },
    {
      pfad: "/gruendungskosten-rechner",
      label: "Gründungskosten-Rechner",
      text: "Rechnet Notar-, Register- und Gewerbeamtskosten aus, damit du weißt, was für die Ausstattung übrig bleibt.",
    },
  ],
  quellen: [
    {
      titel: "Satechi: Produktseite 7-in-1 USB-C Slim Multiport Adapter with Ethernet (Produktbeschreibung, Varianten und Barcodes)",
      url: "https://satechi.com/products/7-in-1-usb-c-slim-multiport-adapter-with-ethernet",
    },
  ],
};

export default inhalt;
