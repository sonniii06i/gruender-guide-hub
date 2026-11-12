import type { LexikonInhalt } from "../types";

const inhalt: LexikonInhalt = {
  definition:
    "Die Churn Rate (Kündigungs- oder Abwanderungsquote) ist der Anteil der Kunden oder des wiederkehrenden Umsatzes, den ein Unternehmen in einem Zeitraum verliert. Du teilst die Kündigungen eines Monats durch den Kundenbestand zum Monatsanfang.",
  abschnitte: [
    {
      titel: "Was ist die Churn Rate?",
      bloecke: [
        {
          art: "text",
          text: "Jedes Abo-Geschäft füllt einen Eimer mit einem Loch. Oben kommen Neukunden hinein, unten gehen Kunden verloren. Die Churn Rate misst die Größe des Lochs. Sie entscheidet darüber, wie viel ein Kunde über die Zeit wert ist und wie viel Neugeschäft du brauchst, um überhaupt den Stand zu halten.",
        },
        {
          art: "text",
          text: "Gemessen wird in zwei Varianten. Der Kunden-Churn zählt Köpfe: Wie viele Kunden sind gegangen? Der Umsatz-Churn zählt Geld: Wie viel wiederkehrender Umsatz ([[/lexikon/mrr-arr|MRR]]) ist weggefallen? Kündigen vor allem kleine Tarife, ist der Umsatz-Churn niedriger als der Kunden-Churn. Geht ein Großkunde, ist es umgekehrt.",
        },
      ],
    },
    {
      titel: "Wie berechnet man die Churn Rate?",
      bloecke: [
        { art: "formel", text: "Kunden-Churn je Monat = gekündigte Kunden im Monat ÷ Kunden am Monatsanfang" },
        { art: "formel", text: "Umsatz-Churn brutto = verlorener MRR durch Kündigung und Tarifwechsel nach unten ÷ MRR am Monatsanfang" },
        { art: "formel", text: "Umsatz-Churn netto = (verlorener MRR − zusätzlicher MRR von Bestandskunden) ÷ MRR am Monatsanfang" },
        {
          art: "text",
          text: "Neukunden des laufenden Monats gehören weder in den Zähler noch in den Nenner. Sonst sieht die Quote besser aus, je mehr du gerade wächst.",
        },
      ],
    },
    {
      titel: "Beispiel: Aus 5 % im Monat werden 46 % im Jahr",
      bloecke: [
        {
          art: "text",
          text: "Beispiel (frei gewählt): Eine Mitgliedschaft für Online-Kurse startet den Monat mit 400 Mitgliedern und 12.000 € MRR. 20 Mitglieder kündigen, dadurch fallen 480 € MRR weg. Gleichzeitig wechseln Bestandskunden in den größeren Tarif und bringen 600 € zusätzlich.",
        },
        {
          art: "tabelle",
          kopf: ["Kennzahl", "Rechnung", "Ergebnis"],
          zeilen: [
            ["Kunden-Churn", "20 ÷ 400", "5 %"],
            ["Umsatz-Churn brutto", "480 € ÷ 12.000 €", "4 %"],
            ["Umsatz-Churn netto", "(480 € − 600 €) ÷ 12.000 €", "− 1 %"],
            ["Durchschnittliche Verweildauer", "1 ÷ 5 %", "20 Monate"],
            ["Kunden-Churn aufs Jahr", "1 − 0,95 hoch 12", "46 %"],
          ],
        },
        {
          art: "text",
          text: "5 % im Monat klingen nach wenig. Über zwölf Monate bleiben von 100 Kunden vom Jahresanfang nur 54 übrig. Die Monatsquote einfach mit zwölf zu multiplizieren wäre falsch, weil jeden Monat von einem kleineren Rest gerechnet wird. Der negative Netto-Churn von 1 % heißt: Die Bestandskunden zahlen am Monatsende zusammen mehr als am Anfang, obwohl 20 gegangen sind. Dieser Zustand macht Abo-Geschäfte planbar.",
        },
      ],
    },
    {
      titel: "Welche Churn Rate ist gut?",
      bloecke: [
        {
          art: "text",
          text: "Das hängt von Kundengruppe und Laufzeit ab. Verbraucher mit Monatsabo kündigen häufiger als Unternehmen mit Jahresvertrag. Ein Vergleich mit fremden Branchenwerten führt deshalb leicht in die Irre. Aussagekräftiger ist die eigene Entwicklung nach Kohorten: Wie viele der Kunden, die im Januar gestartet sind, waren nach einem, drei und sechs Monaten noch da, und ist das bei der März-Gruppe besser? David Skok zeigt in seiner Analyse von Software-Unternehmen an einem Beispiel, wie stark der Hebel ist: Dort verbesserte ein Rückgang des monatlichen Umsatz-Churns von 3,5 % auf 1,5 % das Verhältnis von Kundenwert zu Gewinnungskosten deutlich.",
        },
      ],
    },
    {
      titel: "Typische Fehler",
      bloecke: [
        {
          art: "liste",
          punkte: [
            "Monatswert mal zwölf rechnen.",
            "Neukunden in den Nenner nehmen.",
            "Freiwillige und unfreiwillige Kündigung vermischen. Abgelaufene Karten und geplatzte Lastschriften sind ein Zahlungsproblem, das du mit Erinnerungen und einem zweiten Einzugsversuch löst.",
            "Nur den Kunden-Churn ansehen. Ein gegangener Großkunde verschwindet in der Kopfzahl.",
            "Jahreskunden vergessen. Sie können erst zum Laufzeitende kündigen und tauchen im Monatswert elf Monate lang nicht auf.",
            "Pausierte Abos als aktiv zählen.",
          ],
        },
      ],
    },
    {
      titel: "Was heißt das für Abo-Anbieter in Deutschland?",
      bloecke: [
        {
          art: "text",
          text: "Die Kündigung schwer zu machen, um den Churn zu senken, ist keine Option. Das deutsche Recht gibt für Verträge mit Verbrauchern den Rahmen vor:",
        },
        {
          art: "liste",
          punkte: [
            "Kündigungsschaltfläche: Können Verbraucher über eine Webseite einen entgeltlichen Dauervertrag abschließen, muss dort auch eine Schaltfläche zur Kündigung stehen, ständig verfügbar sowie unmittelbar und leicht zugänglich (§ 312k BGB). Fehlt sie, kann der Verbraucher jederzeit und ohne Kündigungsfrist kündigen (§ 312k Abs. 6 BGB).",
            "Laufzeit in AGB: Unwirksam ist eine Laufzeit, die den Kunden länger als zwei Jahre bindet. Eine stillschweigende Verlängerung ist nur wirksam, wenn sie auf unbestimmte Zeit läuft und der Kunde dann jederzeit mit höchstens einem Monat Frist kündigen kann. Die Kündigungsfrist zum Ende der ersten Laufzeit darf höchstens einen Monat betragen (§ 309 Nr. 9 BGB).",
          ],
        },
        {
          art: "text",
          text: "Die wirksamen Hebel liegen ohnehin früher: Kunden, die das Produkt in den ersten Wochen wirklich nutzen, bleiben. Eine passende [[/lexikon/north-star-metric|North Star Metric]] zeigt dir das, bevor die Kündigung kommt. Dazu kommen Jahrestarife mit Preisvorteil, eine Pause als Alternative zur Kündigung und eine kurze Frage nach dem Grund im Kündigungsablauf.",
        },
        {
          art: "hinweis",
          text: "Diese Seite erklärt die Kennzahl und nennt den gesetzlichen Rahmen. Sie ersetzt keine Rechtsberatung zu deinen AGB oder deinem Kündigungsablauf.",
        },
      ],
    },
  ],
  verwandt: ["mrr-arr", "customer-acquisition-cost-cac", "north-star-metric", "unit-economics"],
  kontext: [
    {
      pfad: "/guides/coach-membership",
      label: "Guide: Membership und Community aufbauen",
      text: "Mitgliedschaften so anlegen, dass Mitglieder nach dem ersten Monat bleiben.",
    },
    {
      pfad: "/guides/klaviyo-setup",
      label: "Guide: Klaviyo bis zum Welcome-Flow",
      text: "E-Mail-Strecken, die Kunden nach dem Kauf zur Nutzung bringen.",
    },
    {
      pfad: "/guides/b2b-saas-spezifika",
      label: "Guide: B2B-SaaS aufbauen",
      text: "Customer Success als Aufgabe: was in den ersten 30 Tagen passieren muss.",
    },
  ],
  quellen: [
    { titel: "§ 312k BGB: Kündigung von Verbraucherverträgen im elektronischen Geschäftsverkehr", url: "https://www.gesetze-im-internet.de/bgb/__312k.html" },
    { titel: "§ 309 BGB: Klauselverbote ohne Wertungsmöglichkeit (Nr. 9 Laufzeit)", url: "https://www.gesetze-im-internet.de/bgb/__309.html" },
    { titel: "David Skok: SaaS Metrics 2.0 (Wirkung des Churn)", url: "https://www.forentrepreneurs.com/saas-metrics-2/" },
  ],
};

export default inhalt;
