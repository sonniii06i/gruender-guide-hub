import type { LexikonInhalt } from "../types";

const inhalt: LexikonInhalt = {
  definition:
    "Die North Star Metric ist die eine Kennzahl, an der ein Unternehmen abliest, ob Kunden den Kernnutzen seines Produkts bekommen. Sie verbindet, was Kunden wollen, mit dem, was später Umsatz bringt, und gibt allen Teams dieselbe Richtung.",
  abschnitte: [
    {
      titel: "Was ist eine North Star Metric?",
      bloecke: [
        {
          art: "text",
          text: "Der Polarstern steht fest am Himmel, deshalb taugt er zum Navigieren. Genauso soll die North Star Metric (kurz NSM, auf Deutsch Leitkennzahl) über Monate dieselbe bleiben, während sich Kampagnen, Funktionen und Quartalsziele ändern. Sie misst einen Moment, in dem ein Kunde bekommt, wofür er gekommen ist: eine Rechnung ist verschickt, ein Paket angekommen, eine Unterrichtsstunde abgeschlossen.",
        },
        {
          art: "text",
          text: "Umsatz ist dafür meist die falsche Wahl. Er ist das Ergebnis und kommt spät. Wer nur auf den Umsatz schaut, sieht erst nach Wochen, dass Kunden das Produkt seltener nutzen. Die North Star Metric soll diesen Rückgang zeigen, bevor er in der Kasse ankommt.",
        },
      ],
    },
    {
      titel: "Woran erkennt man eine gute North Star Metric?",
      bloecke: [
        {
          art: "liste",
          punkte: [
            "Sie misst Nutzen für den Kunden, keinen Aufwand im Unternehmen. „Verschickte Newsletter“ ist Aufwand, „Bestellungen von Stammkunden“ ist Nutzen.",
            "Sie läuft dem Umsatz voraus. Steigt sie, folgt der Umsatz erfahrungsgemäß einige Wochen später.",
            "Das Team kann sie beeinflussen. Auf den Aktienkurs oder das Wetter hat niemand im Unternehmen Einfluss.",
            "Jeder versteht sie ohne Erklärung, und sie lässt sich wöchentlich zählen.",
            "Sie lässt sich nicht billig aufblasen. „Registrierungen“ steigen mit jedem Gewinnspiel, „Nutzer, die in der zweiten Woche wiederkommen“ nicht.",
          ],
        },
      ],
    },
    {
      titel: "Welche Beispiele passen zu welchem Geschäftsmodell?",
      bloecke: [
        {
          art: "tabelle",
          kopf: ["Geschäftsmodell", "Mögliche North Star Metric", "Warum"],
          zeilen: [
            ["Online-Shop mit Verbrauchsware", "Kunden mit zweiter Bestellung binnen 90 Tagen", "Der Wiederkauf zeigt, dass Produkt und Lieferung überzeugt haben"],
            ["Rechnungssoftware im Abo", "Konten, die pro Woche mindestens eine Rechnung versenden", "Wer Rechnungen schreibt, bleibt Kunde"],
            ["Lern-App", "Abgeschlossene Lektionen je Woche", "Lernfortschritt ist der Grund für das Abo"],
            ["Marktplatz", "Erfolgreich abgeschlossene Käufe je Woche", "Zählt beide Seiten: Angebot und Nachfrage"],
            ["Händler auf Amazon mit eigener Marke", "Bestellungen ohne Retoure und ohne Reklamation", "Verbindet Absatz mit Produktqualität"],
          ],
        },
        {
          art: "text",
          text: "Die Beispiele sind Vorschläge zur Orientierung. Welche Kennzahl bei dir dem Umsatz vorausläuft, zeigt nur der Blick in die eigenen Daten: Was haben Kunden, die lange geblieben sind, in den ersten Wochen anders gemacht als die, die gegangen sind?",
        },
      ],
    },
    {
      titel: "Wie zerlegt man die North Star Metric in Einflussgrößen?",
      bloecke: [
        {
          art: "text",
          text: "Eine Leitkennzahl allein sagt niemandem, was er am Montag tun soll. Dafür zerlegst du sie in drei bis fünf Größen, die sie rechnerisch ergeben. Im North Star Framework heißen sie Inputs.",
        },
        {
          art: "text",
          text: "Beispiel (frei gewählt): Die Rechnungssoftware zählt „neue Konten, die in ihrer ersten Woche eine Rechnung versenden“. Im Monat melden sich 400 Selbstständige an, 35 % davon versenden in der ersten Woche eine Rechnung. Das sind 140 aktivierte Konten. Zwei Ideen liegen auf dem Tisch:",
        },
        {
          art: "tabelle",
          kopf: ["Maßnahme", "Rechnung", "Aktivierte Konten"],
          zeilen: [
            ["Ausgangslage", "400 × 35 %", "140"],
            ["20 % mehr Anmeldungen durch Werbung", "480 × 35 %", "168"],
            ["Einrichtung vereinfachen, Quote steigt auf 45 %", "400 × 45 %", "180"],
          ],
        },
        {
          art: "text",
          text: "Die bessere Einrichtung bringt 40 zusätzliche Konten, die Werbung 28, und die Werbung kostet jeden Monat neu. Diese Art Vergleich ist der praktische Nutzen der Zerlegung: Du siehst, an welcher Stelle ein Prozentpunkt am meisten bewegt.",
        },
      ],
    },
    {
      titel: "Typische Fehler",
      bloecke: [
        {
          art: "liste",
          punkte: [
            "Umsatz oder [[/lexikon/mrr-arr|MRR]] zur North Star Metric erklären. Beides bleibt wichtig, aber als Ergebnis.",
            "Eine Eitelkeitszahl wählen: Downloads, Follower, Seitenaufrufe.",
            "Drei Leitkennzahlen gleichzeitig führen. Dann hat jedes Team seine eigene, und die Richtung fehlt wieder.",
            "Die Kennzahl jedes Quartal wechseln. Vergleichen kannst du nur, was du über längere Zeit gleich misst.",
            "Keine Gegenkennzahl beobachten. Wer „Bestellungen“ maximiert, kann das mit Rabatten tun, die den Gewinn auffressen. Die [[/lexikon/unit-economics|Unit Economics]] gehören daneben.",
          ],
        },
      ],
    },
    {
      titel: "Was heißt das für Gründer und kleine Teams?",
      bloecke: [
        {
          art: "text",
          text: "Auch ein Zwei-Personen-Unternehmen profitiert von einer Leitkennzahl, weil sie Diskussionen abkürzt: Zahlt die Idee auf die Kennzahl ein oder nicht? Fang klein an. Wähle einen Kandidaten, zähle ihn acht Wochen lang jeden Montag und prüfe, ob er sich bewegt, bevor der Umsatz es tut. Tut er das nicht, nimm den nächsten Kandidaten.",
        },
        {
          art: "text",
          text: "Für die Messung gilt in Deutschland: Zahlen aus dem eigenen System, etwa Bestellungen, versandte Rechnungen oder Logins, kannst du ohne zusätzliche Kennung auf dem Gerät des Nutzers auswerten. Analysewerkzeuge, die Cookies oder ähnliche Kennungen im Browser speichern, brauchen eine Einwilligung, soweit die Speicherung nicht unbedingt erforderlich ist (§ 25 TDDDG). Eine North Star Metric aus den eigenen Produktdaten ist deshalb auch die verlässlichere, weil sie nicht davon abhängt, wie viele Besucher dem Tracking zustimmen.",
        },
      ],
    },
  ],
  verwandt: ["mrr-arr", "churn-rate", "unit-economics", "fake-door-test"],
  kontext: [
    {
      pfad: "/guides/b2b-saas-spezifika",
      label: "Guide: B2B-SaaS aufbauen",
      text: "Von der Aktivierung bis zur Kundenbindung: wo die Einflussgrößen im Alltag entstehen.",
    },
    {
      pfad: "/guides/eigene-app-launchen",
      label: "Guide: Eigene App entwickeln & launchen",
      text: "Lege vor dem Start fest, welche Nutzung du misst.",
    },
    {
      pfad: "/tools/pitch-deck",
      label: "Pitch-Deck-Generator",
      text: "Investoren fragen nach der einen Zahl, die euer Wachstum erklärt.",
    },
  ],
  quellen: [
    { titel: "Amplitude: The North Star Playbook (About the North Star Framework)", url: "https://amplitude.com/books/north-star/about-the-north-star-framework" },
    { titel: "§ 25 TDDDG: Schutz der Privatsphäre bei Endeinrichtungen", url: "https://www.gesetze-im-internet.de/ttdsg/__25.html" },
  ],
};

export default inhalt;
