import type { LexikonInhalt } from "../types";

const inhalt: LexikonInhalt = {
  definition:
    "Die Customer Acquisition Cost (CAC, auf Deutsch Kundengewinnungskosten) sind die Kosten, die im Schnitt anfallen, um einen neuen zahlenden Kunden zu gewinnen. Du teilst die Marketing- und Vertriebskosten eines Zeitraums durch die Zahl der Neukunden aus demselben Zeitraum.",
  abschnitte: [
    {
      titel: "Was ist die Customer Acquisition Cost?",
      bloecke: [
        {
          art: "text",
          text: "Jeder Kunde kostet etwas, bevor er das erste Mal zahlt: Anzeigen, Provisionen, Rabattcodes, die Zeit des Vertriebs. Die CAC fasst das in einer Zahl je Neukunde zusammen. Für sich allein sagt sie wenig. Ihre Aussage bekommt sie im Vergleich mit dem, was ein Kunde einbringt. 40 € sind viel für eine Bestellung mit 15 € Deckungsbeitrag und wenig für ein Abo, das im Jahr 300 € Deckungsbeitrag bringt.",
        },
      ],
    },
    {
      titel: "Wie berechnet man die CAC?",
      bloecke: [
        { art: "formel", text: "CAC = Marketing- und Vertriebskosten eines Zeitraums ÷ Zahl der Neukunden im selben Zeitraum" },
        {
          art: "liste",
          punkte: [
            "In die Kosten gehören: Werbebudget, Agentur und Freelancer, Werkzeuge für Werbung und Vertrieb, Provisionen für Affiliates und Creator, Neukundenrabatte und Gratisproben, Gehälter für Marketing und Vertrieb.",
            "Gezählt werden nur Neukunden, also Menschen, die zum ersten Mal kaufen. Bestellungen von Stammkunden gehören nicht in den Nenner.",
            "Zwischen Werbung und Kauf vergeht Zeit. Bei Kaufentscheidungen, die Wochen dauern, vergleichst du die Kosten eines Monats besser mit den Neukunden des Folgemonats.",
          ],
        },
      ],
    },
    {
      titel: "Beispiel: Blended CAC und Paid CAC",
      bloecke: [
        {
          art: "text",
          text: "Beispiel (frei gewählt): Ein Shop gewinnt im Mai 400 Neukunden. 250 kommen über Anzeigen, 150 über Suchmaschine, Empfehlung und Newsletter.",
        },
        {
          art: "tabelle",
          kopf: ["Kosten im Mai", "Betrag"],
          zeilen: [
            ["Anzeigen bei Meta und Google", "6.000 €"],
            ["Agentur", "1.200 €"],
            ["Werkzeuge", "300 €"],
            ["Neukundengutscheine", "500 €"],
            ["Summe", "8.000 €"],
          ],
        },
        {
          art: "liste",
          punkte: [
            "Blended CAC, also über alle Kanäle: 8.000 € ÷ 400 = 20,00 € je Neukunde.",
            "Paid CAC, nur bezahlte Kanäle: (6.000 € + 1.200 €) ÷ 250 = 28,80 € je Neukunde.",
          ],
        },
        {
          art: "text",
          text: "Beide Zahlen stimmen, sie beantworten verschiedene Fragen. Die Blended CAC zeigt, was ein Neukunde das Unternehmen insgesamt kostet. Die Paid CAC zeigt, was der nächste zusätzliche Kunde kostet, wenn du das Anzeigenbudget erhöhst. Für die Entscheidung über mehr Budget zählt die zweite, und sie steigt meist weiter, je mehr du ausgibst.",
        },
      ],
    },
    {
      titel: "Wann ist eine CAC zu hoch?",
      bloecke: [
        {
          art: "text",
          text: "Zwei Vergleiche helfen. Der erste ist die Amortisationszeit (CAC Payback): Wie viele Monate braucht ein Kunde, um seine Gewinnungskosten über den Deckungsbeitrag zurückzuzahlen?",
        },
        { art: "formel", text: "Amortisationszeit in Monaten = CAC ÷ Deckungsbeitrag je Kunde und Monat" },
        {
          art: "text",
          text: "Kostet ein Abo-Kunde 240 € und bringt 24 € Deckungsbeitrag im Monat, sind es zehn Monate. Kündigt er nach sechs, hast du 96 € verloren. Der zweite Vergleich ist das Verhältnis von Kundenwert zu CAC. Der Investor David Skok nennt für Software im Abo als Richtwerte ein Verhältnis über 3 und eine Amortisation in weniger als zwölf Monaten. Er weist selbst darauf hin, dass viele gesunde Unternehmen diese Werte am Anfang nicht erreichen. Wie die ganze Rechnung aussieht, steht beim Begriff [[/lexikon/unit-economics|Unit Economics]].",
        },
        {
          art: "text",
          text: "Für die Liquidität ist die Amortisationszeit die wichtigere Zahl. Jeder Neukunde ist zunächst ein Vorschuss aus deiner Kasse. Wächst du schnell bei langer Amortisation, steigt die [[/lexikon/burn-rate|Burn Rate]], obwohl jeder einzelne Kunde sich irgendwann lohnt.",
        },
      ],
    },
    {
      titel: "Typische Fehler",
      bloecke: [
        {
          art: "liste",
          punkte: [
            "Nur das Anzeigenbudget zählen und Agentur, Gutscheine, Provisionen und Gehälter weglassen.",
            "Durch alle Bestellungen teilen statt durch Neukunden. Das ergibt die Kosten je Bestellung, eine andere und kleinere Zahl.",
            "Die Zahl aus dem Werbekonto übernehmen. Jede Plattform rechnet sich die Käufe zu, an denen sie beteiligt war, in der Summe sind das oft mehr Käufe, als der Shop hatte.",
            "CAC mit Umsatz vergleichen. Maßstab ist der Deckungsbeitrag.",
            "Einen guten Monat hochrechnen. Mit steigendem Budget erreichst du Menschen, die schwerer zu überzeugen sind.",
          ],
        },
      ],
    },
    {
      titel: "Was heißt das für Gründer in Deutschland?",
      bloecke: [
        {
          art: "text",
          text: "Die Messung über Werbe-Pixel hat hierzulande eine eingebaute Lücke: Das Speichern von Informationen auf dem Gerät des Besuchers ist nur mit Einwilligung zulässig, soweit es nicht unbedingt erforderlich ist (§ 25 TDDDG). Wer im Einwilligungsdialog ablehnt, taucht in der Auswertung der Werbeplattform nicht als Käufer auf, kauft aber vielleicht trotzdem. Verlass dich deshalb für die CAC auf zwei Zahlen, die du selbst hast: die Kosten aus der Buchhaltung und die Neukunden aus dem Shopsystem. Die Kanalzahlen der Plattformen nutzt du für den Vergleich untereinander. Rechne die CAC jeden Monat neu und notiere dazu, was du geändert hast. Erst die Reihe über mehrere Monate zeigt, ob ein Kanal teurer wird oder ob ein einzelner Monat aus der Reihe fällt.",
        },
        {
          art: "text",
          text: "Vor dem ersten größeren Budget lohnt ein kleiner Test. Ein [[/lexikon/smoke-test|Smoke Test]] mit wenigen hundert Euro liefert eine erste Schätzung, was ein Interessent kostet, bevor Ware und Lager bezahlt sind.",
        },
      ],
    },
  ],
  verwandt: ["unit-economics", "warenkorbwert-aov", "churn-rate", "smoke-test"],
  kontext: [
    {
      pfad: "/guides/performance-marketing-stack",
      label: "Guide: Performance-Marketing mit Meta, TikTok und Google",
      text: "Kanäle, Tracking und Budgetverteilung in der richtigen Reihenfolge aufsetzen.",
    },
    {
      pfad: "/guides/meta-ads-setup",
      label: "Guide: Meta Ads Manager einrichten",
      text: "Vom Werbekonto bis zur ersten Kampagne, mit sauberer Messung.",
    },
    {
      pfad: "/tools/shop-profit-rechner",
      label: "Shop-Profit-Rechner",
      text: "Trag deine CAC ein und sieh, ab welchem Warenkorb eine Bestellung trägt.",
    },
  ],
  quellen: [
    { titel: "David Skok: SaaS Metrics 2.0 (LTV zu CAC, Months to Recover CAC)", url: "https://www.forentrepreneurs.com/saas-metrics-2/" },
    { titel: "§ 25 TDDDG: Schutz der Privatsphäre bei Endeinrichtungen", url: "https://www.gesetze-im-internet.de/ttdsg/__25.html" },
  ],
};

export default inhalt;
