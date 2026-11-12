import type { LexikonInhalt } from "../types";

const inhalt: LexikonInhalt = {
  definition:
    "Unit Economics sind die Rechnung, ob eine einzelne Einheit deines Geschäfts Geld verdient. Die Einheit ist meist eine Bestellung oder ein Kunde: Du stellst ihrem Umsatz alle Kosten gegenüber, die direkt durch sie entstehen, und siehst, was als Deckungsbeitrag übrig bleibt.",
  abschnitte: [
    {
      titel: "Was sind Unit Economics?",
      bloecke: [
        {
          art: "text",
          text: "Ein Unternehmen kann wachsen und trotzdem mit jeder Bestellung Geld verlieren. Die Unit Economics machen das sichtbar, weil sie eine Ebene tiefer ansetzen als die Monatsauswertung. Sie fragen: Was bleibt von einem Verkauf, wenn Ware, Versand, Gebühren und die Werbung für genau diesen Verkauf bezahlt sind? Ist das Ergebnis positiv, trägt jede weitere Bestellung dazu bei, Miete und Gehälter zu decken. Ist es negativ, macht Wachstum das Loch größer.",
        },
        {
          art: "text",
          text: "Welche Einheit du wählst, hängt vom Geschäftsmodell ab. Händler rechnen je Bestellung und zusätzlich je Kunde, Abo-Anbieter je Kunde über seine Vertragslaufzeit, Lieferdienste je Fahrt, Agenturen je Projekt.",
        },
      ],
    },
    {
      titel: "Wie rechnet man Unit Economics für einen Online-Shop?",
      bloecke: [
        { art: "formel", text: "Deckungsbeitrag je Bestellung = Netto-Warenkorb − Wareneinsatz − Versand und Verpackung − Zahlungs- und Marktplatzgebühren − anteilige Retourenkosten" },
        { art: "formel", text: "Deckungsbeitrag nach Werbung = Deckungsbeitrag je Bestellung − Werbekosten je Bestellung" },
        {
          art: "text",
          text: "Gerechnet wird netto, also ohne Umsatzsteuer, weil du sie ans Finanzamt abführst. Alle Kosten, die mit jeder Bestellung steigen, gehören hinein. Fixkosten wie Miete, Software und dein eigenes Gehalt bleiben draußen. Sie kommen im zweiten Schritt: Wie viele Einheiten brauchst du, um sie zu decken?",
        },
      ],
    },
    {
      titel: "Beispiel: Eine Bestellung, ein Kunde, ein Monat",
      bloecke: [
        {
          art: "text",
          text: "Beispiel (frei gewählt): Ein Shop für Kaffeezubehör mit einem [[/lexikon/warenkorbwert-aov|Warenkorbwert]] von 50,00 € netto.",
        },
        {
          art: "tabelle",
          kopf: ["Posten je Bestellung", "Betrag (netto)"],
          zeilen: [
            ["Warenkorb", "50,00 €"],
            ["Wareneinsatz", "− 20,00 €"],
            ["Versand und Verpackung", "− 5,50 €"],
            ["Zahlungsgebühren", "− 1,50 €"],
            ["Retourenkosten, auf alle Bestellungen umgelegt", "− 2,00 €"],
            ["Deckungsbeitrag je Bestellung", "21,00 €"],
            ["Werbekosten je Neukunde (CAC)", "− 18,00 €"],
            ["Deckungsbeitrag der ersten Bestellung", "3,00 €"],
          ],
        },
        {
          art: "text",
          text: "Die erste Bestellung bringt 3,00 €. Kauft ein Kunde im ersten Jahr im Schnitt 1,8-mal, fällt die Werbung nur einmal an: 1,8 × 21,00 € = 37,80 € Deckungsbeitrag, minus 18,00 € Werbung, bleiben 19,80 € je Kunde und Jahr.",
        },
        {
          art: "text",
          text: "Jetzt die Fixkosten: Bei 9.000 € im Monat bräuchte der Shop 3.000 Erstbestellungen zu je 3,00 €, wenn niemand wiederkäme. Mit dem Jahreswert von 19,80 € je Kunde genügen rund 455 Neukunden im Monat. Der Wiederkauf entscheidet in diesem Beispiel darüber, ob das Geschäft trägt. Das Verhältnis von Kundenwert zu Gewinnungskosten liegt bei 2,1 (37,80 € ÷ 18,00 €).",
        },
      ],
    },
    {
      titel: "Was sagt das Verhältnis LTV zu CAC?",
      bloecke: [
        {
          art: "text",
          text: "LTV (Lifetime Value) ist der Deckungsbeitrag, den ein Kunde über die gesamte Dauer der Beziehung bringt. Geteilt durch die [[/lexikon/customer-acquisition-cost-cac|Customer Acquisition Cost]] ergibt sich die bekannteste Kennzahl der Unit Economics. Der Investor David Skok beschreibt für Software im Abo zwei Richtwerte: Bei den besten Unternehmen liegt das Verhältnis über 3, und die Gewinnungskosten sollten in weniger als zwölf Monaten wieder verdient sein. Diese Werte stammen aus dem Softwaregeschäft mit hohen Margen. Für Händler sind sie eine Orientierung, kein Maßstab.",
        },
        {
          art: "text",
          text: "Zwei Fallen beim LTV: Rechne mit Deckungsbeitrag statt mit Umsatz, sonst wirkt der Kunde um ein Vielfaches wertvoller, als er ist. Und nimm nur Zeiträume, die du beobachtet hast. Ein Shop, der acht Monate alt ist, kennt keinen Fünf-Jahres-Kundenwert.",
        },
      ],
    },
    {
      titel: "Typische Fehler",
      bloecke: [
        {
          art: "liste",
          punkte: [
            "Brutto rechnen. 59,50 € im Warenkorb sind 50,00 € Umsatz.",
            "Retouren und Rabatte weglassen, weil sie nicht bei jeder Bestellung anfallen. Leg sie auf alle Bestellungen um.",
            "Nur bezahlte Werbung zählen und Agentur, Gutscheine und Provisionen vergessen.",
            "Kanäle mischen. Eine Bestellung über einen Marktplatz hat andere Gebühren als eine im eigenen Shop.",
            "Fixkosten in die Einheit rechnen. Das Ergebnis schwankt dann mit der Stückzahl und taugt nicht mehr zum Vergleich.",
            "Den Durchschnitt aller Kunden nehmen, obwohl ein Kanal Gewinn bringt und ein anderer Verlust. Rechne je Kanal.",
          ],
        },
      ],
    },
    {
      titel: "Was heißt das für Gründer und Online-Händler?",
      bloecke: [
        {
          art: "text",
          text: "Die Reihenfolge, in der du vorgehst: Erst den Deckungsbeitrag je Bestellung ohne Werbung ausrechnen. Ist er zu klein, helfen Einkaufspreis, Verkaufspreis oder Warenkorb, keine Anzeige der Welt. Dann die Werbekosten je Neukunde danebenlegen. Erst wenn die Einheit trägt, lohnt mehr Budget. Vorher kaufst du dir mit jedem Euro Werbung zusätzlichen Verlust und verkürzt deine [[/lexikon/runway|Runway]].",
        },
        {
          art: "text",
          text: "Wer Kapital sucht, wird nach genau dieser Rechnung gefragt. Eine saubere Tabelle mit echten Zahlen aus drei Monaten überzeugt mehr als eine Umsatzkurve. Halte sie monatlich aktuell, denn Einkaufspreise, Versandtarife und Gebühren ändern sich: Zwei Euro mehr Porto machen im Beispiel aus 3,00 € Deckungsbeitrag der ersten Bestellung 1,00 €.",
        },
      ],
    },
  ],
  verwandt: ["customer-acquisition-cost-cac", "warenkorbwert-aov", "churn-rate", "burn-rate", "runway"],
  kontext: [
    {
      pfad: "/tools/shop-profit-rechner",
      label: "Shop-Profit-Rechner",
      text: "Die Tabelle aus dem Beispiel mit deinen Zahlen, inklusive Gebühren und Werbung.",
    },
    {
      pfad: "/tools/marge-tracker",
      label: "Multi-Channel-Marge-Tracker",
      text: "Deckungsbeitrag je Kanal: eigener Shop, Amazon, Kaufland und andere nebeneinander.",
    },
    {
      pfad: "/guides/vc-pitch-deck",
      label: "Guide: VC-Runde vorbereiten",
      text: "Wie du Unit Economics im Pitch-Deck und im Datenraum darstellst.",
    },
  ],
  quellen: [
    { titel: "David Skok: SaaS Metrics 2.0 (Richtwerte LTV zu CAC, Monate bis zur Amortisation)", url: "https://www.forentrepreneurs.com/saas-metrics-2/" },
    { titel: "§ 12 UStG: Steuersätze", url: "https://www.gesetze-im-internet.de/ustg_1980/__12.html" },
  ],
};

export default inhalt;
