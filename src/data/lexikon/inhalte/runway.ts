import type { LexikonInhalt } from "../types";

const inhalt: LexikonInhalt = {
  definition:
    "Die Runway ist die Zahl der Monate, die das vorhandene Geld eines Unternehmens noch reicht, wenn Einnahmen und Ausgaben so bleiben wie zuletzt. Berechnet wird sie als Kontostand geteilt durch die monatliche Net Burn Rate.",
  abschnitte: [
    {
      titel: "Was ist die Runway?",
      bloecke: [
        {
          art: "text",
          text: "Runway ist das englische Wort für Startbahn. Gemeint ist die Strecke, die ein Unternehmen noch hat, um abzuheben, also profitabel zu werden oder neues Kapital zu bekommen. Am Ende der Bahn ist das Konto leer. Die Kennzahl übersetzt einen Kontostand in Zeit, und Zeit ist für Gründer die greifbarere Größe: Acht Monate sagen mehr als 96.000 €.",
        },
      ],
    },
    {
      titel: "Wie berechnet man die Runway?",
      bloecke: [
        { art: "formel", text: "Runway in Monaten = verfügbare liquide Mittel ÷ Net Burn je Monat" },
        {
          art: "text",
          text: "Verfügbar heißt: Geld, über das du heute verfügen kannst. Die Mietkaution, ein verpfändetes Konto oder das Guthaben, das ein Marktplatz als Reserve einbehält, gehören nicht dazu. Bereits fällige Schulden ziehst du vorher ab: offene Lieferantenrechnungen, die Umsatzsteuer des letzten Monats, das nächste Gehalt. Die [[/lexikon/burn-rate|Net Burn Rate]] nimmst du als Durchschnitt der letzten drei Monate.",
        },
      ],
    },
    {
      titel: "Beispiel: Drei Szenarien für dieselbe Firma",
      bloecke: [
        {
          art: "text",
          text: "Beispiel (frei gewählt): Eine GmbH hat 150.000 € verfügbar und verbraucht im Schnitt 15.000 € im Monat. Die einfache Formel ergibt zehn Monate. Wie stark das Ergebnis von zwei Annahmen abhängt, zeigt der Vergleich:",
        },
        {
          art: "tabelle",
          kopf: ["Szenario", "Annahme", "Runway"],
          zeilen: [
            ["A: alles bleibt gleich", "Net Burn 15.000 € je Monat", "10 Monate"],
            ["B: neue Stelle ab Monat 3", "Net Burn steigt ab dann auf 20.000 €", "8 Monate"],
            ["C: Umsatz wächst", "Net Burn sinkt jeden Monat um 1.500 €", "Geld reicht bis zur schwarzen Null"],
          ],
        },
        {
          art: "text",
          text: "Rechnung zu B: In den ersten zwei Monaten fließen 30.000 € ab, es bleiben 120.000 €. Bei 20.000 € im Monat reichen sie sechs weitere Monate, zusammen acht. Rechnung zu C: Der Verbrauch fällt von 15.000 € über 13.500 € und 12.000 € bis auf 1.500 € im zehnten Monat. Zusammen sind das 82.500 €. Im elften Monat ist der Verbrauch bei null, auf dem Konto liegen noch 67.500 €. Eine Stelle mehr kostet in diesem Beispiel zwei Monate. Ein Umsatz, der verlässlich wächst, macht aus zehn Monaten Restzeit ein Unternehmen, das aus eigener Kraft überlebt.",
        },
      ],
    },
    {
      titel: "Wie viel Runway braucht ein Startup?",
      bloecke: [
        {
          art: "text",
          text: "Eine feste Regel dafür gibt es nicht, auch wenn häufig 12 oder 18 Monate genannt werden. Sinnvoller ist die Rechnung vom Ziel her: Wie lange brauchst du bis zum nächsten Punkt, an dem sich etwas ändert, etwa bis zur schwarzen Null oder bis zu den Zahlen, mit denen du Investoren oder eine Bank überzeugen kannst? Dazu kommt die Zeit, die Gespräche, Prüfung und Auszahlung dauern. Aus beidem ergibt sich, wann du handeln musst: Kosten senken, Preise erhöhen oder Kapital suchen. Wer erst reagiert, wenn nur noch drei Monate bleiben, verhandelt mit dem Rücken zur Wand.",
        },
      ],
    },
    {
      titel: "Typische Fehler bei der Runway",
      bloecke: [
        {
          art: "liste",
          punkte: [
            "Mit dem Kontostand rechnen, ohne fällige Schulden abzuziehen.",
            "Zugesagtes, aber noch nicht ausgezahltes Geld mitzählen: die Fördermittel im Bescheid, die Rate des Investors, die große Kundenrechnung.",
            "Nur Szenario A rechnen. Die Burn Rate bleibt selten gleich, meist steigt sie.",
            "Einmal im Quartal rechnen. Die Runway gehört in jede Monatsauswertung.",
            "Saison übersehen. Ein Shop mit starkem Weihnachtsgeschäft hat im Januar eine andere Runway als im Oktober, bei gleichem Kontostand.",
          ],
        },
      ],
    },
    {
      titel: "Was heißt das für Geschäftsführer in Deutschland?",
      bloecke: [
        {
          art: "text",
          text: "Die Runway zeigt auch, wie nah eine Kapitalgesellschaft an den Pflichten des Insolvenzrechts ist. Die Reihenfolge der Begriffe, wie sie im Gesetz stehen:",
        },
        {
          art: "liste",
          punkte: [
            "Zahlungsunfähigkeit (§ 17 InsO): Die Gesellschaft kann ihre fälligen Zahlungspflichten nicht erfüllen.",
            "Überschuldung (§ 19 InsO): Das Vermögen deckt die Verbindlichkeiten nicht mehr, es sei denn, die Fortführung des Unternehmens in den nächsten zwölf Monaten ist überwiegend wahrscheinlich. Eine Runway unter zwölf Monaten ohne belastbaren Plan für die Zeit danach ist deshalb ein Thema für den Steuerberater.",
            "Antragspflicht (§ 15a InsO): Wird eine juristische Person zahlungsunfähig oder überschuldet, muss die Geschäftsführung ohne schuldhaftes Zögern Insolvenzantrag stellen, spätestens drei Wochen nach Eintritt der Zahlungsunfähigkeit und sechs Wochen nach Eintritt der Überschuldung. Wer den Antrag nicht oder zu spät stellt, macht sich strafbar (§ 15a Abs. 4 InsO).",
          ],
        },
        {
          art: "text",
          text: "Für Einzelunternehmer und GbR-Gesellschafter mit persönlicher Haftung gilt diese Antragspflicht nicht. Die Rechnung lohnt sich trotzdem, denn dort haftest du mit deinem Privatvermögen.",
        },
        {
          art: "hinweis",
          text: "Diese Seite erklärt den Begriff und ersetzt keine Rechts- oder Steuerberatung. Ob Zahlungsunfähigkeit oder Überschuldung vorliegt, klärt im Einzelfall ein Anwalt oder Steuerberater.",
        },
      ],
    },
  ],
  verwandt: ["burn-rate", "mrr-arr", "unit-economics", "churn-rate"],
  kontext: [
    {
      pfad: "/tools/runway-rechner",
      label: "Runway- & Burn-Rate-Rechner",
      text: "Rechne die drei Szenarien mit deinen eigenen Zahlen durch.",
    },
    {
      pfad: "/guides/cashflow-forecasting",
      label: "Guide: Cashflow-Forecasting mit 13-Wochen-Plan",
      text: "Der Wochenplan, aus dem sich Runway und Handlungszeitpunkt ablesen lassen.",
    },
    {
      pfad: "/guides/vc-pitch-deck",
      label: "Guide: VC-Runde vorbereiten",
      text: "Was Investoren zu Burn Rate und Runway sehen wollen und wann du starten solltest.",
    },
  ],
  quellen: [
    { titel: "§ 15a InsO: Antragspflicht bei juristischen Personen", url: "https://www.gesetze-im-internet.de/inso/__15a.html" },
    { titel: "§ 17 InsO: Zahlungsunfähigkeit", url: "https://www.gesetze-im-internet.de/inso/__17.html" },
    { titel: "§ 19 InsO: Überschuldung", url: "https://www.gesetze-im-internet.de/inso/__19.html" },
  ],
};

export default inhalt;
