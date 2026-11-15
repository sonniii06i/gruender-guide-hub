import type { BueroInhalt } from "../types";

const inhalt: BueroInhalt = {
  antwort:
    "Für Videocalls reicht eine Full-HD-Webcam: Zoom, Google Meet und Microsoft Teams nennen in ihren Hilfeseiten 1080p als höchste Sendestufe. Als Einstieg passt die Logitech Brio 100, mit Autofokus und höherer Bildrate die OBSBOT Meet SE, mit Auto-Framing die Logitech Brio 500. 4K lohnt sich für Aufnahmen: Dafür steht die Logitech MX Brio in der Auswahl, die Jabra PanaCast 20 für ein weites Bild und die Logitech MeetUp als Sonderfall für den kleinen Besprechungsraum.",
  auswahl:
    "Ausgewählt haben wir nach Auflösung und Bildrate, Sichtfeld, Fokus, Mikrofon, Abdeckung und Anschluss, sodass jede Kamera für einen anderen Fall steht. Wir haben kein Gerät selbst ausprobiert. Die Seite vergleicht die Angaben der Hersteller auf ihren Produktseiten, und was dort nicht steht, behaupten wir nicht. In der Auswahl sind nur Kameras, die am Stand-Tag bei mindestens einem Partnerhändler lieferbar waren.",
  vergleich: ["Max. Auflösung", "Sichtfeld (diagonal)", "Mikrofon", "Abdeckung", "Anschluss"],
  produkte: [
    {
      id: "logitech-brio-100",
      name: "Logitech Brio 100",
      marke: "Logitech",
      ean: "5099206113275",
      rolle: "Einstieg für Videocalls in Full HD",
      kurz: "Full HD mit 30 Bildern pro Sekunde, integrierte Abdeckblende und USB-A. Fester Fokus und das engste Sichtfeld dieser Auswahl.",
      daten: [
        { label: "Max. Auflösung", wert: "1080p bei 30 Bildern/s" },
        { label: "Sichtfeld (diagonal)", wert: "58°" },
        { label: "Fokus", wert: "Fixfokus" },
        { label: "Mikrofon", wert: "Integriert, omnidirektional, Reichweite bis 1 m" },
        { label: "Abdeckung", wert: "Integrierte Abdeckblende zum Vorschieben" },
        { label: "Anschluss", wert: "USB-A, Kabel 1,5 m" },
        { label: "Software", wert: "Logi Options+" },
      ],
      plus: [
        "Abdeckblende ist eingebaut und verschließt das Objektiv",
        "USB-A-Stecker passt ohne Adapter an USB-A-Buchsen von Rechner oder Dock",
        "Lichtkorrektur RightLight 2 laut Hersteller",
        "Laut Logitech kompatibel mit Windows, macOS und ChromeOS sowie Teams, Meet und Zoom",
      ],
      minus: [
        "Engstes Sichtfeld der Auswahl (58°), nicht verstellbar",
        "Fixfokus, kein Autofokus",
        "Kein Stativgewinde und keine Zertifizierung im Datenblatt genannt",
      ],
      datenblatt: {
        titel: "Logitech: Brio 100 Full HD Webcam, technische Daten",
        url: "https://www.logitech.com/de-de/shop/p/brio-100-webcam.960-001617",
      },
    },
    {
      id: "obsbot-meet-se",
      name: "OBSBOT Meet SE",
      marke: "OBSBOT",
      ean: "6971889230649",
      rolle: "Full HD mit bis zu 100 Bildern/s",
      kurz: "Full HD mit bis zu 100 Bildern pro Sekunde, Autofokus und AI Auto Framing in einem Gehäuse von 33,2 g. Für alle, die neben Calls auch Bewegung flüssig aufnehmen wollen.",
      daten: [
        { label: "Max. Auflösung", wert: "1080p bei bis zu 100 Bildern/s, 720p bei bis zu 150 Bildern/s" },
        { label: "Sichtfeld (diagonal)", wert: "78°" },
        { label: "Fokus", wert: "Autofokus und manueller Fokus, ab 10 cm" },
        { label: "Mikrofon", wert: "1 integriert, mit Rauschunterdrückung" },
        { label: "Abdeckung", wert: "Magnetische Abdeckkappe zum Aufstecken, liegt bei" },
        { label: "Anschluss", wert: "USB-C (USB 2.0), Adapter auf USB-A liegt bei" },
        { label: "Befestigung", wert: "Magnetische Halterung, 1/4-Zoll-Gewinde" },
        { label: "Bildausschnitt", wert: "AI Auto Framing (Nahaufnahme, Oberkörper, Gruppenmodus)" },
      ],
      plus: [
        "Höchste Bildrate der Auswahl in Full HD (bis zu 100 Bilder/s)",
        "Autofokus und AI Auto Framing laut Hersteller",
        "1/4-Zoll-Gewinde für Stativ oder Halterung",
        "USB-C mit beiliegendem Adapter auf USB-A",
      ],
      minus: [
        "Abdeckung ist ein loses Teil, keine eingebaute Blende",
        "Nur ein Mikrofon, keine Zertifizierung für Teams, Zoom oder Meet auf der Herstellerseite genannt",
        "Für 1080p mit 60 oder 100 Bildern/s empfiehlt OBSBOT mindestens einen Core i5 der 7. Generation und 8 GB RAM",
      ],
      datenblatt: {
        titel: "OBSBOT: Meet SE-Serie, technische Daten",
        url: "https://www.obsbot.com/de/obsbot-meet-se-full-hd-webcam/specs",
      },
    },
    {
      id: "logitech-brio-500",
      name: "Logitech Brio 500",
      marke: "Logitech",
      ean: "5099206104914",
      rolle: "Für Calls, in denen du dich bewegst",
      kurz: "Full HD mit Autofokus, drei wählbaren Sichtfeldern und RightSight Auto-Framing, das die Kamera auf dich zentriert. Laut Logitech für Microsoft Teams, Zoom und Google Meet zertifiziert.",
      daten: [
        { label: "Max. Auflösung", wert: "1080p bei 30 Bildern/s, 720p bei 60 Bildern/s" },
        { label: "Sichtfeld (diagonal)", wert: "90°, 78° oder 65°" },
        { label: "Fokus", wert: "Autofokus" },
        { label: "Mikrofon", wert: "Stereo-Mikrofon, Reichweite bis 1,22 m" },
        { label: "Abdeckung", wert: "Integrierte Abdeckblende zum Drehen" },
        { label: "Anschluss", wert: "USB-C, Kabel 1,5 m angeschlossen" },
        { label: "Bildausschnitt", wert: "RightSight Auto-Framing über Logi Tune" },
        { label: "Zertifiziert für", wert: "Microsoft Teams, Zoom, Google Meet, Works with Chromebook" },
      ],
      plus: [
        "Sichtfeld in drei Stufen wählbar (90°, 78°, 65°)",
        "Auto-Framing hält dich im Bild, wenn du aufstehst oder dich bewegst (laut Logitech)",
        "Show Mode: Kamera nach unten kippen und den Schreibtisch zeigen",
        "Zertifiziert für Teams, Zoom und Google Meet",
      ],
      minus: [
        "Auto-Framing braucht die Software Logi Tune, die es laut Logitech nicht für ChromeOS gibt",
        "60 Bilder/s nur in 720p",
        "Nur USB-C, im Lieferumfang ist kein Adapter auf USB-A genannt",
      ],
      datenblatt: {
        titel: "Logitech: Brio 500 Webcam, technische Daten",
        url: "https://www.logitech.com/de-de/shop/p/brio-500-webcam.960-001422",
      },
    },
    {
      id: "logitech-mx-brio",
      name: "Logitech MX Brio",
      marke: "Logitech",
      ean: "5099206109315",
      rolle: "4K für Aufnahmen und Kurse",
      kurz: "4K mit 30 Bildern pro Sekunde oder Full HD mit 60, dazu Stativgewinde, abnehmbares USB-C-Kabel und eingebaute Abdeckblende. Für alle, die Videos aufnehmen und die Kamera auch im Call nutzen.",
      daten: [
        { label: "Max. Auflösung", wert: "4K bei 30 Bildern/s, 1080p bei 60 Bildern/s" },
        { label: "Sichtfeld (diagonal)", wert: "90°, 78° oder 65°" },
        { label: "Fokus", wert: "Autofokus" },
        { label: "Mikrofon", wert: "2 Beamforming-Mikrofone, Reichweite bis 1,2 m" },
        { label: "Abdeckung", wert: "Integrierte Abdeckblende zum Drehen" },
        { label: "Anschluss", wert: "USB-C (USB 3.0), Kabel 1,5 m abnehmbar" },
        { label: "Befestigung", wert: "Abnehmbare Klemme, 1/4-Zoll-Stativgewinde" },
        { label: "Zertifiziert für", wert: "Microsoft Teams, Zoom, Google Meet, Works with Chromebook, Streamlabs" },
      ],
      plus: [
        "4K bei 30 Bildern/s und Full HD bei 60 Bildern/s",
        "1/4-Zoll-Stativgewinde und abnehmbares Kabel",
        "Sensor mit 8,5 Megapixeln (Sony STARVIS) laut Datenblatt",
        "Show Mode und eingebaute Abdeckblende",
      ],
      minus: [
        "Verlangt laut Logitech einen USB-C-Anschluss mit USB 3.0",
        "Kein Auto-Framing im Datenblatt genannt",
        "Logitech-Software nur für Windows und macOS, unter ChromeOS und Linux nur Grundfunktion",
      ],
      datenblatt: {
        titel: "Logitech: MX Brio UHD 4K Webcam, technische Daten",
        url: "https://www.logitech.com/de-de/shop/p/mx-brio-4k-webcam.960-001559",
      },
    },
    {
      id: "jabra-panacast-20",
      name: "Jabra PanaCast 20",
      marke: "Jabra",
      ean: "5706991024630",
      rolle: "Weitwinkel in 4K mit drei Mikrofonen",
      kurz: "4K mit 30 Bildern pro Sekunde, 117° diagonales Sichtfeld, drei Mikrofone und Intelligent Zoom, der dir im Bild folgt. Wird mit Reiseetui geliefert.",
      daten: [
        { label: "Max. Auflösung", wert: "4K bei 30 Bildern/s, 1080p bei 30 Bildern/s" },
        { label: "Sichtfeld (diagonal)", wert: "117° (horizontal 90°, vertikal 75°)" },
        { label: "Mikrofon", wert: "3 MEMS-Mikrofone" },
        { label: "Abdeckung", wert: "Integrierte Abdeckblende zum Schieben" },
        { label: "Anschluss", wert: "USB-C am Gerät, Kabel USB-C auf USB-A 1,5 m (USB 3.0) liegt bei" },
        { label: "Bildausschnitt", wert: "Intelligent Zoom" },
        { label: "Zertifiziert für", wert: "Microsoft Teams, Zoom" },
      ],
      plus: [
        "Weitestes Sichtfeld der Einzelplatz-Kameras dieser Auswahl (117° diagonal)",
        "Drei Mikrofone und eingebaute Abdeckblende",
        "Bild-im-Bild-Modus für Präsentationen laut Hersteller",
        "Reiseetui im Lieferumfang",
      ],
      minus: [
        "Full HD nur mit 30 Bildern/s",
        "Fokus-Art und Stativgewinde im Datenblatt nicht genannt",
        "Verlustfreier Digitalzoom laut Jabra nur bis 3-fach bei 720p",
      ],
      datenblatt: {
        titel: "Jabra: PanaCast 20, technische Daten",
        url: "https://www.jabra.com/de-de/business/video-conferencing/jabra-panacast-20",
      },
    },
    {
      id: "logitech-meetup",
      name: "Logitech MeetUp",
      marke: "Logitech",
      ean: "5099206072060",
      rolle: "Sonderfall: kleiner Besprechungsraum",
      kurz: "Konferenzkamera mit 120° Sichtfeld, motorisiertem Schwenken, Mikrofon mit 4 m Reichweite und Lautsprecher. Logitech empfiehlt sie für 6 Teilnehmer, für den Einzelplatz ist sie zu groß.",
      daten: [
        { label: "Max. Auflösung", wert: "4K bei 30 Bildern/s mit eigenem USB-3.0-Kabel, sonst 1080p bei 30 Bildern/s" },
        { label: "Sichtfeld (diagonal)", wert: "120° (horizontal 113°, vertikal 80,7°)" },
        { label: "Mikrofon", wert: "Integriert, 3 Beamforming-Elemente, Reichweite 4 m" },
        { label: "Abdeckung", wert: "Im Datenblatt nicht genannt" },
        { label: "Anschluss", wert: "USB 2.0 (für 4K USB 3.0), USB-Kabel 16 Fuß und Netzteil liegen bei" },
        { label: "Bildausschnitt", wert: "RightSight (Windows 10 64 Bit oder macOS 10.14 und neuer)" },
        { label: "Schwenken und Zoom", wert: "Motorisiert ±25° schwenken, ±15° neigen, 5-fach-Zoom" },
        { label: "Teilnehmer laut Hersteller", wert: "6, mit Zusatzmikrofon 8" },
      ],
      plus: [
        "Kamera, Mikrofon und Lautsprecher in einem Gerät",
        "RightSight richtet Kamera und Zoom laut Logitech auf die Personen im Raum aus",
        "Fernbedienung, Wandhalterung und Netzteil im Lieferumfang",
      ],
      minus: [
        "4K nur mit einem USB-3.0-Kabel, das nicht beiliegt",
        "Braucht ein Netzteil, ist 40 cm breit und wiegt 1,04 kg",
        "Keine Objektivabdeckung im Datenblatt genannt",
      ],
      datenblatt: {
        titel: "Logitech: MeetUp ConferenceCam, technische Daten",
        url: "https://www.logitech.com/de-de/business/shop/p/meetup-conferencecam.960-001102",
      },
    },
  ],
  abschnitte: [
    {
      titel: "Reicht Full HD für Videocalls?",
      bloecke: [
        {
          art: "text",
          text: "Für Calls reicht 1080p. Die drei großen Dienste nennen in ihrer eigenen Hilfe Full HD als höchste Sendestufe, und auch die gibt es nur unter Bedingungen:",
        },
        {
          art: "tabelle",
          kopf: ["Dienst", "Höchste genannte Sendeauflösung", "Bedingungen laut Hilfeseite"],
          zeilen: [
            [
              "Zoom",
              "1080p",
              "HD-Video heißt bei Zoom zunächst 720p (ab Pro-Konto, Vollbild, Sprecheransicht). Für 1080p nennt Zoom ein Business-, Education- oder Enterprise-Konto oder Pro mit Zusatzlizenz, die Freischaltung durch den Zoom-Support und eine i7-CPU mit vier Kernen oder besser.",
            ],
            [
              "Google Meet",
              "1080p",
              "Stufen 360p, 720p und 1080p. 1080p senden nur Computer mit 1080p-Kamera und genug Rechenleistung, nur in bestimmten Workspace-Editionen und nicht in Firefox oder Safari.",
            ],
            [
              "Microsoft Teams",
              "1080p bei 30 Bildern/s",
              "Nur wenn die Bandbreite nicht begrenzt ist. Bei knapper Leitung bekommt der Ton Vorrang vor dem Bild.",
            ],
          ],
        },
        {
          art: "text",
          text: "Mehr als 1080p kommt bei deinem Gegenüber laut diesen Seiten nicht an, bei Zoom ohne Freischaltung 720p. Für Calls zählen deshalb Sichtfeld, Fokus, Mikrofon und Abdeckung mehr als die Auflösung. Bildraten über 30 pro Sekunde, wie sie die OBSBOT Meet SE mit bis zu 100 in Full HD liefert, zahlen sich bei Aufnahmen und Streams aus. Teams optimiert laut Microsoft auf bis zu 30 Bilder pro Sekunde.",
        },
      ],
    },
    {
      titel: "Wann lohnt sich eine 4K-Webcam?",
      bloecke: [
        {
          art: "text",
          text: "4K lohnt sich, wenn du aufnimmst: Kursvideos, Produktvorführungen, YouTube. Ein 4K-Bild hat viermal so viele Bildpunkte wie Full HD. Du kannst im Schnitt also einen Ausschnitt wählen und bleibst trotzdem bei 1080p.",
        },
        {
          art: "text",
          text: "Die Logitech MX Brio nimmt in 4K mit 30 Bildern pro Sekunde auf oder in 1080p mit 60, hat ein 1/4-Zoll-Stativgewinde und ein abnehmbares USB-C-Kabel. Die Jabra PanaCast 20 liefert ebenfalls 4K mit 30 Bildern pro Sekunde, in 1080p bleibt sie bei 30. Prüf vor dem Kauf deinen Rechner: Die MX Brio verlangt laut Logitech einen USB-C-Anschluss mit USB 3.0, und OBSBOT empfiehlt für 1080p mit 60 oder 100 Bildern pro Sekunde mindestens einen Core i5 der 7. Generation mit 8 GB RAM.",
        },
        {
          art: "text",
          text: "Was vor dem ersten Video sonst noch dran ist, steht im [[/guides/creator-youtube-longform|Guide zum YouTube-Kanal]] und für aufgezeichnete Kurse im [[/guides/coach-online-course|Guide zum Online-Kurs]].",
        },
      ],
    },
    {
      titel: "Was bedeutet das Sichtfeld bei einer Webcam?",
      bloecke: [
        {
          art: "text",
          text: "Das Sichtfeld gibt in Grad an, wie breit die Kamera schaut. Alle sechs Datenblätter dieser Auswahl nennen den diagonalen Wert. Ein enges Sichtfeld zeigt vor allem dich, ein weites auch den Raum neben und hinter dir.",
        },
        {
          art: "liste",
          punkte: [
            "58° (Logitech Brio 100): enger Ausschnitt für eine Person am Schreibtisch.",
            "78° (OBSBOT Meet SE): der mittlere Wert dieser Auswahl.",
            "65°, 78° oder 90° wählbar (Logitech Brio 500 und MX Brio): Du stellst um, je nachdem, ob nur du im Bild sein sollst oder auch etwas neben dir.",
            "117° (Jabra PanaCast 20): Weitwinkel, der deutlich mehr Raum links und rechts zeigt.",
            "120° (Logitech MeetUp): für den Besprechungstisch.",
          ],
        },
        {
          art: "text",
          text: "Auto-Framing heißt, dass die Kamera den Ausschnitt selbst nachführt. Logitech nennt das RightSight und bietet es bei der Brio 500 über die Software Logi Tune an, die es laut Logitech nicht für ChromeOS gibt. OBSBOT nennt es AI Auto Framing, Jabra Intelligent Zoom. Bedenke beim Winkel: Ein weites Sichtfeld zeigt auch das Regal hinter dir.",
        },
      ],
    },
    {
      titel: "Externe Webcam oder die Kamera im Laptop?",
      bloecke: [
        {
          art: "text",
          text: "Schau zuerst ins Datenblatt deines Laptops, dort steht die Auflösung der eingebauten Kamera. Liegt sie bei 720p, bringt schon die Logitech Brio 100 mit 1080p mehr Bildpunkte. Unabhängig von der Auflösung löst eine externe Webcam drei Dinge:",
        },
        {
          art: "liste",
          punkte: [
            "Position: Sie sitzt auf dem externen Monitor, auch wenn der Laptop zugeklappt am Dock hängt.",
            "Abdeckung: Brio 100, Brio 500, MX Brio und PanaCast 20 haben eine eingebaute Blende, die das Objektiv verschließt. Der OBSBOT Meet SE liegt eine magnetische Kappe zum Aufstecken bei.",
            "Stativ: MX Brio und Meet SE haben ein 1/4-Zoll-Gewinde. Damit steht die Kamera auch neben dem Monitor.",
          ],
        },
        {
          art: "text",
          text: "Achte auf den Stecker. Die Brio 100 kommt mit USB-A, Brio 500 und MX Brio mit USB-C. Der Meet SE liegt ein Adapter auf USB-A bei, der PanaCast 20 ein Kabel von USB-C auf USB-A. Die eingebauten Mikrofone reichen laut Datenblatt bis 1 m (Brio 100) oder 1,22 m (Brio 500). Sitzt du weiter weg, plane ein Headset ein. Wenn Videogespräche mit Kunden dein Produkt sind, zeigt der [[/guides/coach-1-on-1|Guide zum 1:1-Coaching]], was außer der Technik dazugehört.",
        },
        {
          art: "hinweis",
          text: "Zertifiziert für Microsoft Teams, Zoom und Google Meet sind laut Hersteller die Brio 500 und die MX Brio, die PanaCast 20 laut Datentabelle für Teams und Zoom. Bei Brio 100 und Meet SE nennen die Hersteller Kompatibilität mit den gängigen Diensten, aber keine Zertifizierung.",
        },
      ],
    },
    {
      titel: "Wann brauchst du eine Konferenzkamera statt einer Webcam?",
      bloecke: [
        {
          art: "text",
          text: "Sobald ihr regelmäßig zu mehreren an einem Tisch in denselben Call geht. Die Mikrofone der Einzelplatz-Kameras reichen dort, wo das Datenblatt eine Reichweite nennt, zwischen 1 m und 1,22 m weit. Für einen Besprechungstisch ist das zu wenig.",
        },
        {
          art: "text",
          text: "Die Logitech MeetUp ist für diesen Fall gebaut: 120° Sichtfeld, motorisiertes Schwenken und Neigen, 5-fach-Zoom, ein Mikrofon mit 4 m Reichweite und ein eingebauter Lautsprecher. Logitech empfiehlt sie für 6 Teilnehmer. Sie braucht ein Netzteil (liegt bei), ist 40 cm breit und wiegt 1,04 kg. 4K gibt sie nur über ein USB-3.0-Kabel aus, das du selbst stellen musst. Für den Platz am Monitor ist sie zu groß. Sie steht in dieser Auswahl, weil manche Gründer zu zweit oder zu dritt in einem Raum sitzen und Kundentermine gemeinsam führen.",
        },
      ],
    },
    {
      titel: "Was kann beim Webcam-Kauf warten?",
      bloecke: [
        {
          art: "text",
          text: "Die Reihenfolge für den Start: zuerst eine Full-HD-Webcam mit Abdeckung und dem passenden Stecker, alles andere dann, wenn der Anlass da ist.",
        },
        {
          art: "liste",
          punkte: [
            "4K kann warten, bis du wirklich aufnimmst. In Calls nennen Zoom, Google und Microsoft höchstens 1080p.",
            "Auto-Framing kann warten, solange du im Call sitzen bleibst.",
            "Bildraten über 30 pro Sekunde können warten, bis du streamst oder Bewegung aufnimmst.",
            "Die Konferenzkamera kann warten, bis ihr regelmäßig zu mehreren an einem Tisch im Call sitzt.",
          ],
        },
        {
          art: "text",
          text: "Wie du die Kamera in der Buchhaltung ansetzt, rechnest du im [[/tools/abschreibung|Abschreibungs-Rechner]] durch.",
        },
      ],
    },
  ],
  kontext: [
    {
      pfad: "/tools/abschreibung",
      label: "Abschreibungs-Rechner",
      text: "Zeigt für eine Anschaffung wie die Webcam die passende Abschreibungsmethode.",
    },
    {
      pfad: "/guides/coach-1-on-1",
      label: "Guide: 1:1-Coaching starten",
      text: "Preise, Verträge und Buchungsablauf, wenn Videogespräche mit Kunden dein Produkt sind.",
    },
    {
      pfad: "/guides/creator-youtube-longform",
      label: "Guide: YouTube-Kanal mit Long-Form aufbauen",
      text: "Vom ersten Video bis zur Monetarisierung, wenn du die Kamera für Aufnahmen kaufst.",
    },
    {
      pfad: "/guides/coach-online-course",
      label: "Guide: Online-Kurs erstellen",
      text: "Plattform, Zulassung und Launch für aufgezeichnete Kurse.",
    },
  ],
  quellen: [
    {
      titel: "Zoom Support: Enabling HD video for Zoom Meetings (Voraussetzungen für 720p und 1080p)",
      url: "https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0066166",
    },
    {
      titel: "Google Meet-Hilfe: Video- und Audioqualität optimieren (Auflösung für Senden)",
      url: "https://support.google.com/meet/answer/9302964?hl=de",
    },
    {
      titel: "Microsoft Learn: Vorbereiten des Netzwerks Ihres Unternehmens für Teams (Bandbreitenanforderungen)",
      url: "https://learn.microsoft.com/de-de/microsoftteams/prepare-network",
    },
  ],
};

export default inhalt;
