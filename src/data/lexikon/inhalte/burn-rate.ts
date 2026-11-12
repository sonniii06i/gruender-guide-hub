import type { LexikonInhalt } from "../types";

const inhalt: LexikonInhalt = {
  definition:
    "Die Burn Rate ist der Betrag, um den der Kontostand eines Unternehmens pro Monat sinkt. Die Gross Burn Rate zählt alle Auszahlungen eines Monats, die Net Burn Rate zieht davon die Einzahlungen ab und zeigt, wie viel Geld tatsächlich verbraucht wird.",
  abschnitte: [
    {
      titel: "Was ist die Burn Rate?",
      bloecke: [
        {
          art: "text",
          text: "Solange ein junges Unternehmen mehr ausgibt, als es einnimmt, lebt es von seinem Startkapital: eigenem Geld, einem Darlehen oder dem Geld von Investoren. Die Burn Rate sagt dir, wie schnell dieses Polster schmilzt. Sie ist eine Zahl aus dem Bankkonto. In der Gewinn- und Verlustrechnung findest du sie nicht, denn dort stehen Abschreibungen, die kein Geld kosten, und es fehlen Tilgungen, Vorauszahlungen und Anschaffungen, die sehr wohl Geld kosten.",
        },
        {
          art: "text",
          text: "Gebraucht wird die Zahl für die nächste Frage: Wie lange reicht das Geld noch? Das ist die [[/lexikon/runway|Runway]]. Ohne saubere Burn Rate ist jede Runway geraten.",
        },
      ],
    },
    {
      titel: "Wie berechnet man Gross Burn und Net Burn?",
      bloecke: [
        { art: "formel", text: "Gross Burn = alle Auszahlungen eines Monats" },
        { art: "formel", text: "Net Burn = Auszahlungen eines Monats − Einzahlungen eines Monats" },
        {
          art: "text",
          text: "Am schnellsten geht es über den Kontostand: Net Burn = Kontostand am Monatsanfang minus Kontostand am Monatsende, bereinigt um Geld, das von außen kam (Einlage, Darlehen, Finanzierungsrunde). Rechne mit dem Durchschnitt der letzten drei Monate. Ein einzelner Monat täuscht, weil Versicherungen, Jahreslizenzen oder die Umsatzsteuer-Zahlung nicht jeden Monat anfallen.",
        },
        {
          art: "liste",
          punkte: [
            "Zu den Auszahlungen zählen: Gehälter samt Lohnsteuer und Sozialabgaben, Miete, Software, Werbung, Wareneinkauf, Steuerberater, Zinsen und Tilgung, Umsatzsteuer-Zahlungen ans Finanzamt, Anschaffungen.",
            "Zu den Einzahlungen zählen: bezahlte Kundenrechnungen und Auszahlungen von Marktplätzen und Zahlungsanbietern. Offene Rechnungen zählen erst, wenn das Geld da ist.",
            "Nicht zu den Einzahlungen zählt Geld von Gesellschaftern, Banken oder Investoren. Das füllt das Polster auf, senkt aber nicht den Verbrauch.",
          ],
        },
      ],
    },
    {
      titel: "Beispiel: Burn Rate einer UG mit zwei Angestellten",
      bloecke: [
        {
          art: "text",
          text: "Beispiel (frei gewählt): Eine UG (haftungsbeschränkt) aus Köln entwickelt eine App für Handwerksbetriebe. Der Durchschnitt der letzten drei Monate sieht so aus:",
        },
        {
          art: "tabelle",
          kopf: ["Posten", "Betrag je Monat"],
          zeilen: [
            ["Gehälter inkl. Arbeitgeberanteile", "9.800 €"],
            ["Büro und Nebenkosten", "1.200 €"],
            ["Software und Server", "900 €"],
            ["Werbung", "4.500 €"],
            ["Steuerberater, Versicherung, Sonstiges", "2.100 €"],
            ["Gross Burn", "18.500 €"],
            ["Einzahlungen von Kunden", "6.500 €"],
            ["Net Burn", "12.000 €"],
          ],
        },
        {
          art: "text",
          text: "Die UG verbraucht also 12.000 € im Monat. Liegen 96.000 € auf dem Konto, reicht das rechnerisch acht Monate (96.000 € ÷ 12.000 €). Die Gross Burn zeigt die zweite wichtige Zahl: Fallen die Kundeneinnahmen weg, etwa weil ein großer Kunde kündigt, sind es 18.500 € im Monat und nur noch gut fünf Monate.",
        },
      ],
    },
    {
      titel: "Welche Burn Rate ist normal?",
      bloecke: [
        {
          art: "text",
          text: "Einen allgemeinen Richtwert gibt es nicht. Ein Shop, der Ware vorfinanziert, hat ein anderes Muster als ein Softwareunternehmen mit Gehältern als größtem Posten. Vergleichbar wird die Burn Rate erst im Verhältnis zu etwas: zum Kontostand (Runway), zum Wachstum (wie viel neuer wiederkehrender Umsatz entsteht je verbranntem Euro, siehe [[/lexikon/mrr-arr|MRR und ARR]]) oder zum eigenen Plan. Die nützlichste Frage lautet: Welche Ausgaben könnte ich in vier Wochen stoppen, und welche laufen wegen Kündigungsfristen und Verträgen weiter? Der zweite Teil ist dein fester Sockel.",
        },
      ],
    },
    {
      titel: "Typische Fehler bei der Burn Rate",
      bloecke: [
        {
          art: "liste",
          punkte: [
            "Mit dem Verlust aus der BWA rechnen. Der Verlust enthält Abschreibungen und lässt Tilgung, Anschaffungen und Steuerzahlungen aus.",
            "Umsatzsteuer vergessen. Du nimmst Bruttobeträge ein und zahlst die Zahllast später ans Finanzamt. Wer das Geld vorher verplant, dem fehlt es zum nächsten Voranmeldungstermin.",
            "Jahreszahlungen übersehen: Versicherungen, Lizenzen, Kammerbeiträge, Jahresabschluss.",
            "Offene Rechnungen als Einzahlung zählen. Zahlt ein Kunde 60 Tage später, fehlt das Geld zwei Monate lang.",
            "Geplante Einstellungen nicht einrechnen. Die Burn Rate von heute gilt nur, solange sich nichts ändert.",
          ],
        },
      ],
    },
    {
      titel: "Was heißt das für Geschäftsführer einer UG oder GmbH?",
      bloecke: [
        {
          art: "text",
          text: "Wer eine UG oder GmbH führt, muss die Kasse im Blick haben. Zwei Pflichten aus dem GmbH-Gesetz hängen direkt an der Burn Rate:",
        },
        {
          art: "liste",
          punkte: [
            "GmbH: Ergibt sich aus der Jahresbilanz oder einer Zwischenbilanz, dass die Hälfte des Stammkapitals verloren ist, muss die Geschäftsführung unverzüglich die Gesellschafterversammlung einberufen (§ 49 Abs. 3 GmbHG).",
            "UG (haftungsbeschränkt): Hier knüpft die Pflicht an die drohende Zahlungsunfähigkeit an. Dann muss die Gesellschafterversammlung unverzüglich einberufen werden (§ 5a Abs. 4 GmbHG).",
          ],
        },
        {
          art: "text",
          text: "Drohende Zahlungsunfähigkeit heißt nach § 18 Abs. 2 InsO: Die Gesellschaft wird ihre bestehenden Zahlungspflichten voraussichtlich nicht bei Fälligkeit erfüllen können, in aller Regel mit Blick auf die nächsten 24 Monate. Eine monatlich gepflegte Burn Rate mit Liquiditätsplan ist das Werkzeug, mit dem du das früh siehst und belegen kannst. Was bei Zahlungsunfähigkeit und Überschuldung gilt, steht beim Begriff [[/lexikon/runway|Runway]].",
        },
        {
          art: "hinweis",
          text: "Diese Seite erklärt den Begriff und ersetzt keine Rechts- oder Steuerberatung. Wird das Geld knapp, sprich früh mit Steuerberater oder Anwalt.",
        },
      ],
    },
  ],
  verwandt: ["runway", "mrr-arr", "unit-economics", "customer-acquisition-cost-cac"],
  kontext: [
    {
      pfad: "/tools/runway-rechner",
      label: "Runway- & Burn-Rate-Rechner",
      text: "Trag Kontostand, Ausgaben und Einnahmen ein und sieh, wie viele Monate bleiben.",
    },
    {
      pfad: "/guides/cashflow-forecasting",
      label: "Guide: Cashflow-Forecasting mit 13-Wochen-Plan",
      text: "Schritt für Schritt zum Liquiditätsplan, der Jahreszahlungen und Steuertermine enthält.",
    },
    {
      pfad: "/tools/bwa",
      label: "BWA-Generator",
      text: "Die Auswertung, die Banken sehen wollen, und der Unterschied zwischen Verlust und Geldabfluss.",
    },
  ],
  quellen: [
    { titel: "§ 49 GmbHG: Einberufung der Versammlung", url: "https://www.gesetze-im-internet.de/gmbhg/__49.html" },
    { titel: "§ 5a GmbHG: Unternehmergesellschaft", url: "https://www.gesetze-im-internet.de/gmbhg/__5a.html" },
    { titel: "§ 18 InsO: Drohende Zahlungsunfähigkeit", url: "https://www.gesetze-im-internet.de/inso/__18.html" },
  ],
};

export default inhalt;
