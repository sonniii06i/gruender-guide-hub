import type { LexikonInhalt } from "../types";

const inhalt: LexikonInhalt = {
  definition:
    "Beim Fake-Door-Test zeigst du Nutzern einen Knopf, Menüpunkt oder Tarif für etwas, das es noch nicht gibt, und zählst, wie viele darauf klicken. Wer klickt, erfährt sofort, dass die Funktion in Planung ist. So misst du Interesse, bevor eine Zeile Code oder ein Lagerartikel bezahlt ist.",
  abschnitte: [
    {
      titel: "Was ist ein Fake-Door-Test?",
      bloecke: [
        {
          art: "text",
          text: "Die „falsche Tür“ ist ein Eingang, hinter dem noch kein Raum liegt. In einer App ist das zum Beispiel ein Menüpunkt „Export als DATEV-Datei“, in einem Shop eine neue Produktvariante oder die Zahlart „Kauf auf Rechnung“, auf einer Preisseite ein dritter Tarif. Der Klick führt auf einen kurzen Hinweis: Das gibt es noch nicht, wir prüfen gerade, ob wir es bauen.",
        },
        {
          art: "text",
          text: "Der Unterschied zum [[/lexikon/smoke-test|Smoke Test]]: Der Smoke Test prüft ein ganzes Angebot bei Menschen, die dich noch nicht kennen, meist mit bezahlten Besuchern. Der Fake-Door-Test läuft in einem Produkt oder Shop, der schon Besucher hat, und beantwortet eine engere Frage: Lohnt sich genau diese Erweiterung? Er kostet deshalb kein Werbebudget, setzt aber vorhandenen Traffic voraus.",
        },
      ],
    },
    {
      titel: "Wie funktioniert ein Fake-Door-Test?",
      bloecke: [
        {
          art: "liste",
          punkte: [
            "Entscheidung benennen, die der Test vorbereiten soll: „Wir bauen den Export, wenn mindestens 8 % der aktiven Nutzer ihn in zwei Wochen anklicken.“",
            "Tür dort einbauen, wo die Funktion später wirklich läge. Ein Banner auf der Startseite misst Aufmerksamkeit, kein Bedürfnis.",
            "Klicks je Nutzer zählen, Aufrufe sind die falsche Basis. Zehn Klicks derselben Person sind ein Interessent.",
            "Nach dem Klick erklären, was geplant ist, und eine Folgefrage stellen: „Wofür brauchst du das?“ oder ein Feld für die E-Mail-Adresse, um zum Start Bescheid zu geben.",
            "Laufzeit begrenzen (ein bis zwei Wochen) und die Tür danach wieder entfernen, egal wie das Ergebnis ausfällt.",
          ],
        },
        {
          art: "formel",
          text: "Klickrate = Nutzer, die auf die Tür geklickt haben ÷ Nutzer, die die Tür gesehen haben",
        },
        {
          art: "text",
          text: "Entscheidend ist der Nenner. „Gesehen“ heißt: Der Nutzer war auf der Seite oder in dem Menü, in dem die Tür liegt. Teilst du durch alle Nutzer des Produkts, wirkt jedes Ergebnis schlechter, als es ist.",
        },
      ],
    },
    {
      titel: "Beispiel: Lohnt sich „Kauf auf Rechnung“ im Shop?",
      bloecke: [
        {
          art: "text",
          text: "Beispiel (frei gewählt): Ein Shop für Bürobedarf überlegt, Rechnungskauf anzubieten. Der Zahlungsanbieter verlangt dafür eine höhere Gebühr je Bestellung, die Einrichtung kostet einige Tage. Der Händler zeigt die Option zwei Wochen lang im Bezahlschritt an. Wer sie wählt, sieht: „Rechnungskauf richten wir gerade ein. Bitte wähle heute eine andere Zahlart.“",
        },
        {
          art: "tabelle",
          kopf: ["Messwert", "Anzahl", "Anteil"],
          zeilen: [
            ["Besucher im Bezahlschritt", "1.200", "100 %"],
            ["Wählen „Kauf auf Rechnung“", "168", "14 %"],
            ["Davon kaufen danach mit anderer Zahlart", "121", "72 % der 168"],
            ["Davon brechen ab", "47", "28 % der 168"],
          ],
        },
        {
          art: "text",
          text: "Die Schwelle lag bei 8 %, erreicht wurden 14 %. Wichtiger ist die letzte Zeile: 47 Besucher sind gegangen, nachdem die gewünschte Zahlart fehlte. Bei einem [[/lexikon/warenkorbwert-aov|Warenkorbwert]] von 85 € sind das rund 4.000 € Umsatz in zwei Wochen, die mit Rechnungskauf zumindest teilweise zustande gekommen wären. Ein Teil dieser 47 wäre auch ohne den Test abgesprungen, der Wert ist also eine Obergrenze. Trotzdem hat der Händler jetzt eine Zahl, die er gegen die höhere Gebühr rechnen kann.",
        },
        {
          art: "text",
          text: "Das Beispiel zeigt auch den Preis des Tests: Im Bezahlschritt kostet eine falsche Tür echte Bestellungen. Dort gehört sie nur hin, wenn die Entscheidung groß genug ist, und nur für kurze Zeit.",
        },
      ],
    },
    {
      titel: "Wann ist ein Fake-Door-Test das falsche Werkzeug?",
      bloecke: [
        {
          art: "liste",
          punkte: [
            "Bei wenig Traffic. Mit 50 Nutzern in zwei Wochen entscheidet der Zufall. Dann helfen fünf Kundengespräche mehr.",
            "Wenn die Funktion ohnehin gebaut werden muss, etwa wegen einer gesetzlichen Pflicht.",
            "Wenn der Klick nichts über die Zahlungsbereitschaft sagt. „Mehr Auswertungen“ klickt fast jeder an, zahlen will dafür kaum jemand. Dann die Tür mit einem Preis versehen.",
            "Bei sensiblen Momenten: Kündigung, Reklamation, Zahlungsstörung. Wer dort eine Sackgasse findet, ist zu Recht verärgert.",
          ],
        },
      ],
    },
    {
      titel: "Typische Fehler",
      bloecke: [
        {
          art: "liste",
          punkte: [
            "Die Auflösung fehlt oder kommt als Fehlermeldung. Nutzer halten das Produkt dann für kaputt.",
            "Die Tür bleibt monatelang stehen. Aus dem Test wird ein gebrochenes Versprechen.",
            "Schwelle erst nach dem Test festgelegt.",
            "Klicks neuer und langjähriger Nutzer werden vermischt. Neue klicken aus Neugier fast alles an.",
            "Aus der Klickrate wird direkt Umsatz gerechnet. Zwischen „interessiert mich“ und „nutze ich regelmäßig“ liegt meist ein großer Abstand.",
          ],
        },
      ],
    },
    {
      titel: "Was heißt das für Online-Händler und Gründer in Deutschland?",
      bloecke: [
        {
          art: "text",
          text: "Rechtlich heikel wird eine falsche Tür dort, wo sie eine Kaufentscheidung beeinflusst. Wer mit einer Leistung wirbt, die es nicht gibt, kann irreführend im Sinne von § 5 UWG handeln, denn zu den wesentlichen Merkmalen einer Ware oder Dienstleistung zählt das Gesetz auch ihre Verfügbarkeit. Für die Praxis heißt das: Die Tür gehört in das Produkt oder den Bestellablauf und bleibt aus der Werbung heraus. Eine Anzeige „Jetzt auch auf Rechnung kaufen“ für eine Zahlart, die es nicht gibt, ist eine falsche Aussage.",
        },
        {
          art: "text",
          text: "Sammelst du nach dem Klick E-Mail-Adressen, um später über den Start zu informieren, brauchst du dafür eine ausdrückliche Einwilligung (§ 7 Abs. 2 Nr. 2 UWG). Und die Messung selbst: Zählst du Klicks mit einem Analysewerkzeug, das Cookies oder ähnliche Kennungen auf dem Gerät speichert, greift § 25 TDDDG. Eine serverseitige Zählung ohne Nutzerkennung kommt ohne solche Speicherung aus.",
        },
        {
          art: "hinweis",
          text: "Diese Seite erklärt die Methode und ersetzt keine Rechtsberatung.",
        },
      ],
    },
  ],
  verwandt: ["smoke-test", "north-star-metric", "warenkorbwert-aov", "churn-rate"],
  kontext: [
    {
      pfad: "/guides/eigene-app-launchen",
      label: "Guide: Eigene App entwickeln & launchen",
      text: "Vom ersten Entwurf bis zum Store-Eintrag, mit Platz für Tests vor dem Bauen.",
    },
    {
      pfad: "/guides/erste-webseite-seo",
      label: "Guide: Erste Webseite & organisch sichtbar werden",
      text: "So kommt der Traffic zustande, den ein Fake-Door-Test braucht.",
    },
    {
      pfad: "/tools/shop-profit-rechner",
      label: "Shop-Profit-Rechner",
      text: "Rechne nach, ob eine neue Zahlart oder Variante nach Gebühren noch Gewinn bringt.",
    },
  ],
  quellen: [
    { titel: "§ 5 UWG: Irreführende geschäftliche Handlungen", url: "https://www.gesetze-im-internet.de/uwg_2004/__5.html" },
    { titel: "§ 7 UWG: Unzumutbare Belästigungen (E-Mail-Werbung)", url: "https://www.gesetze-im-internet.de/uwg_2004/__7.html" },
    { titel: "§ 25 TDDDG: Schutz der Privatsphäre bei Endeinrichtungen", url: "https://www.gesetze-im-internet.de/ttdsg/__25.html" },
    { titel: "Pretotyping.org: Ideen prüfen, bevor man sie baut (Alberto Savoia)", url: "https://www.pretotyping.org/" },
  ],
};

export default inhalt;
