import type { LexikonInhalt } from "../types";

const inhalt: LexikonInhalt = {
  definition:
    "Der Warenkorbwert, englisch Average Order Value (AOV), ist der durchschnittliche Umsatz je Bestellung in einem Zeitraum. Du berechnest ihn, indem du den Umsatz durch die Zahl der Bestellungen teilst.",
  abschnitte: [
    {
      titel: "Was ist der Warenkorbwert (AOV)?",
      bloecke: [
        {
          art: "text",
          text: "Der Warenkorbwert zeigt, wie viel ein Kunde bei einem Einkauf im Schnitt ausgibt. Zusammen mit der Besucherzahl und der Kaufquote ergibt er den Umsatz eines Shops: Besucher mal Kaufquote mal Warenkorbwert. Von diesen drei Hebeln ist er oft der günstigste, denn ein höherer Warenkorb braucht keinen zusätzlichen Besucher und damit kein zusätzliches Werbebudget.",
        },
        {
          art: "text",
          text: "Wichtig wird die Zahl, sobald du Werbung schaltest. Die Kosten, um einen Käufer zu gewinnen ([[/lexikon/customer-acquisition-cost-cac|CAC]]), fallen je Bestellung an, egal ob 25 € oder 90 € im Korb liegen. Ob sich ein Kanal trägt, entscheidet deshalb der Warenkorbwert mit.",
        },
      ],
    },
    {
      titel: "Wie berechnet man den Warenkorbwert?",
      bloecke: [
        { art: "formel", text: "Warenkorbwert (AOV) = Umsatz ÷ Anzahl der Bestellungen" },
        {
          art: "text",
          text: "Drei Festlegungen brauchst du, damit die Zahl von Monat zu Monat vergleichbar bleibt:",
        },
        {
          art: "liste",
          punkte: [
            "Brutto oder netto. Shopsysteme und Marktplätze zeigen meist Bruttowerte, weil Verbraucher Bruttopreise zahlen. Für jede Rechnung mit Kosten und Marge brauchst du den Nettowert. Beim Regelsteuersatz von 19 % teilst du durch 1,19 (§ 12 Abs. 1 UStG).",
            "Mit oder ohne Versandkosten. Berechnete Versandkosten sind Umsatz, verfälschen aber den Vergleich, wenn du die Versandpauschale änderst. Üblich ist der Warenwert ohne Versand.",
            "Vor oder nach Rabatten und Retouren. Rechne nach Abzug von Gutscheinen. Stornierte und vollständig widerrufene Bestellungen nimmst du aus Umsatz und Bestellzahl heraus.",
          ],
        },
      ],
    },
    {
      titel: "Beispiel: Warenkorbwert eines Shops für Kaffeezubehör",
      bloecke: [
        {
          art: "text",
          text: "Beispiel (frei gewählt): Ein Shop macht im März 46.410 € Bruttoumsatz mit 780 Bestellungen, alle Artikel mit 19 % Umsatzsteuer.",
        },
        {
          art: "tabelle",
          kopf: ["Schritt", "Rechnung", "Ergebnis"],
          zeilen: [
            ["Warenkorbwert brutto", "46.410 € ÷ 780", "59,50 €"],
            ["Nettoumsatz", "46.410 € ÷ 1,19", "39.000 €"],
            ["Warenkorbwert netto", "39.000 € ÷ 780", "50,00 €"],
          ],
        },
        {
          art: "text",
          text: "Der Händler bietet nun zu jeder Mühle ein Set aus Reinigungsbürste und Ersatzmahlwerk an. Im April steigt der Netto-Warenkorb bei gleicher Bestellzahl auf 56,00 €. Das sind 4.680 € mehr Nettoumsatz (780 × 6 €). Bei einer Rohmarge von 40 % auf das Set bleiben davon 1.872 € Rohertrag, ohne dass ein Besucher mehr in den Shop kommen musste.",
        },
      ],
    },
    {
      titel: "Durchschnitt oder Median: Was sagt mehr?",
      bloecke: [
        {
          art: "text",
          text: "Der Durchschnitt reagiert stark auf einzelne große Bestellungen. Zehn Bestellungen, neun zu 40 € und eine zu 400 €, ergeben einen Durchschnitt von 76 €. Der Median, also der mittlere Wert, liegt bei 40 € und beschreibt den typischen Kunden besser. Sieh dir deshalb zusätzlich die Verteilung an: Wie viele Bestellungen liegen unter 30 €, wie viele knapp unter der Grenze für kostenlosen Versand? Genau dort setzt die wirksamste Maßnahme an.",
        },
      ],
    },
    {
      titel: "Mit welchen Hebeln steigt der Warenkorbwert?",
      bloecke: [
        {
          art: "liste",
          punkte: [
            "Versandkostenfreigrenze knapp über dem heutigen Median. Liegt der typische Korb bei 40 €, lädt eine Grenze bei 49 € zum Auffüllen ein. Eine Grenze bei 100 € erreicht fast niemand.",
            "Sets und Bündel aus Artikeln, die ohnehin zusammen gekauft werden.",
            "Passendes Zubehör im Warenkorb, zum Beispiel Filter zur Kanne.",
            "Mengenstaffeln bei Verbrauchsware: zwei Packungen günstiger als zwei einzelne.",
            "Größere Packungsgrößen als eigene Variante.",
          ],
        },
        {
          art: "text",
          text: "Jeder dieser Hebel kostet Marge oder Versandkosten. Rechne deshalb den Rohertrag je Bestellung vorher und nachher, nicht nur den Umsatz. Das Rechenschema steht beim Begriff [[/lexikon/unit-economics|Unit Economics]].",
        },
      ],
    },
    {
      titel: "Typische Fehler",
      bloecke: [
        {
          art: "liste",
          punkte: [
            "Brutto-Warenkorb mit Netto-Kosten vergleichen. Die Marge wirkt dann um die Umsatzsteuer zu hoch.",
            "Retouren ignorieren. Wo Verbraucher ein Widerrufsrecht haben, beträgt die Frist 14 Tage (§ 355 Abs. 2 BGB). Ein hoher Warenkorb, von dem die Hälfte zurückkommt, ist ein niedriger.",
            "Marktplatz und eigenen Shop zusammenrechnen. Die Kunden kaufen dort verschieden, die Gebühren unterscheiden sich auch.",
            "Den Warenkorbwert steigern und dabei die Kaufquote senken, etwa durch eine zu hohe Freigrenze. Beobachte beide Zahlen gemeinsam.",
          ],
        },
      ],
    },
    {
      titel: "Was heißt das für Online-Händler?",
      bloecke: [
        {
          art: "text",
          text: "Die Reihenfolge für den Start: Erst den Warenkorbwert netto und ohne Versand für die letzten drei Monate ausrechnen, getrennt nach Verkaufskanal. Dann den Median daneben stellen. Danach eine einzige Maßnahme testen und vier Wochen laufen lassen. So siehst du, was die Änderung gebracht hat, statt drei Effekte gleichzeitig zu erraten.",
        },
        {
          art: "text",
          text: "Warum sich die Mühe lohnt, zeigt die Rechnung mit Werbekosten. Beispiel (frei gewählt): Bei 40 % Rohmarge und 18 € Werbekosten je Bestellung bleiben von einem Warenkorb von 50 € netto 2,00 € übrig (20,00 € Rohertrag minus 18,00 €). Bei 56 € sind es 4,40 € (22,40 € minus 18,00 €). Der Warenkorb ist um 12 % gestiegen, der Ertrag nach Werbung hat sich mehr als verdoppelt.",
        },
      ],
    },
  ],
  verwandt: ["unit-economics", "customer-acquisition-cost-cac", "fake-door-test", "churn-rate"],
  kontext: [
    {
      pfad: "/tools/shop-profit-rechner",
      label: "Shop-Profit-Rechner",
      text: "Rechne aus, was von einer Bestellung nach Ware, Versand, Gebühren und Werbung bleibt.",
    },
    {
      pfad: "/tools/marge-tracker",
      label: "Multi-Channel-Marge-Tracker",
      text: "Vergleiche Warenkorb und Marge zwischen eigenem Shop und Marktplätzen.",
    },
    {
      pfad: "/guides/shopify-launch",
      label: "Guide: Shopify-Brand launchen",
      text: "Shop-Aufbau mit Versandregeln und Sets, die den Warenkorb erhöhen.",
    },
  ],
  quellen: [
    { titel: "§ 12 UStG: Steuersätze", url: "https://www.gesetze-im-internet.de/ustg_1980/__12.html" },
    { titel: "§ 355 BGB: Widerrufsrecht bei Verbraucherverträgen", url: "https://www.gesetze-im-internet.de/bgb/__355.html" },
  ],
};

export default inhalt;
