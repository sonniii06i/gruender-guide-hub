import type { LexikonInhalt } from "../types";

const inhalt: LexikonInhalt = {
  definition:
    "MRR (Monthly Recurring Revenue) ist der Umsatz, den ein Unternehmen aus laufenden Abos pro Monat verlässlich wieder einnimmt, ohne Einmalzahlungen und ohne Umsatzsteuer. ARR (Annual Recurring Revenue) ist derselbe Wert auf ein Jahr gerechnet, also MRR mal zwölf.",
  abschnitte: [
    {
      titel: "Was sind MRR und ARR?",
      bloecke: [
        {
          art: "text",
          text: "Beide Kennzahlen beantworten dieselbe Frage: Wie viel Umsatz kommt nächsten Monat wieder, wenn du nichts Neues verkaufst? Das macht sie zur wichtigsten Größe für Software im Abo, Mitgliedschaften, Abo-Boxen und Wartungsverträge. MRR nutzt du für die monatliche Steuerung. ARR nennen vor allem Unternehmen mit Jahresverträgen und Investoren, weil sich damit Firmen leichter vergleichen lassen.",
        },
        {
          art: "text",
          text: "Wichtig ist das Wort wiederkehrend. Einrichtungsgebühren, Beratungstage, einmalige Käufe und Nachzahlungen gehören nicht in den MRR, auch wenn sie in derselben Rechnung stehen.",
        },
      ],
    },
    {
      titel: "Wie berechnet man den MRR?",
      bloecke: [
        { art: "formel", text: "MRR = Summe der monatlichen Nettopreise aller aktiven Abos" },
        { art: "formel", text: "ARR = MRR × 12" },
        {
          art: "liste",
          punkte: [
            "Jahresabos teilst du durch zwölf. Ein Jahresvertrag über 290 € netto zählt mit 24,17 € im Monat, auch wenn der Kunde alles im Januar zahlt.",
            "Rabatte ziehst du ab. Zahlt ein Kunde im ersten Jahr 20 % weniger, zählt der rabattierte Preis.",
            "Kostenlose Testphasen zählen mit null, bis die erste Zahlung fällig ist.",
            "Pausierte und gekündigte Abos fallen raus, sobald keine Zahlung mehr folgt.",
            "Gerechnet wird netto. Verkaufst du an Verbraucher für 34,51 € im Monat, sind das bei 19 % Umsatzsteuer 29,00 € MRR. Die Steuer gehört dem Finanzamt.",
          ],
        },
      ],
    },
    {
      titel: "Beispiel: MRR eines Rechnungstools",
      bloecke: [
        {
          art: "text",
          text: "Beispiel (frei gewählt): Ein Rechnungsprogramm für Selbstständige hat zum Monatsanfang 120 Monatskunden zu 29 € netto und 30 Jahreskunden zu 290 € netto.",
        },
        {
          art: "tabelle",
          kopf: ["Bestandteil", "Rechnung", "MRR"],
          zeilen: [
            ["Monatskunden", "120 × 29,00 €", "3.480 €"],
            ["Jahreskunden", "30 × 290 € ÷ 12", "725 €"],
            ["MRR zum Monatsanfang", "", "4.205 €"],
            ["Neukunden", "10 × 29,00 €", "+ 290 €"],
            ["Wechsel in den größeren Tarif", "5 × (49 € − 29 €)", "+ 100 €"],
            ["Kündigungen", "6 × 29,00 €", "− 174 €"],
            ["MRR zum Monatsende", "", "4.421 €"],
          ],
        },
        {
          art: "text",
          text: "Die Veränderung eines Monats heißt Net New MRR: neuer MRR plus Erweiterungen minus Verkleinerungen minus Kündigungen, hier 290 € + 100 € − 174 € = 216 €. Ein Blick auf den Jahrestarif lohnt sich auch: Zwölf Monatszahlungen kosten 348 €, der Jahresvertrag 290 €, also rund 17 % weniger. Das senkt den MRR je Jahreskunde von 29,00 € auf 24,17 €. Dafür kommt das Geld im Voraus, und der Kunde bleibt zwölf Monate.",
        },
        {
          art: "text",
          text: "Der MRR ist um 216 € gewachsen, das sind rund 5 %. Der ARR liegt bei 53.052 € (4.421 € × 12). Die Aufteilung in Neu, Erweiterung und Kündigung ist der eigentliche Wert der Rechnung: Sie zeigt, dass ohne die sechs Kündigungen fast doppelt so viel Wachstum übrig geblieben wäre. Wie du diesen Verlust misst, steht beim Begriff [[/lexikon/churn-rate|Churn Rate]].",
        },
      ],
    },
    {
      titel: "Warum ist der MRR nicht der Umsatz aus der Buchhaltung?",
      bloecke: [
        {
          art: "text",
          text: "MRR ist eine Steuerungskennzahl, kein Begriff aus dem Handelsgesetzbuch. Drei Unterschiede sorgen regelmäßig für Verwirrung:",
        },
        {
          art: "liste",
          punkte: [
            "Geldeingang: Die 30 Jahreskunden überweisen zusammen 8.700 € netto auf einmal. Auf dem Konto ist das viel Geld, im MRR sind es 725 € je Monat.",
            "Bilanz: Wer bilanziert, weist Einnahmen, die Ertrag für eine Zeit nach dem Abschlussstichtag sind, als passiven Rechnungsabgrenzungsposten aus (§ 250 Abs. 2 HGB). Der im Dezember bezahlte Jahresvertrag ist also zum größten Teil Ertrag des Folgejahres. Gewinne dürfen erst berücksichtigt werden, wenn sie am Abschlussstichtag realisiert sind (§ 252 Abs. 1 Nr. 4 HGB).",
            "Einnahmenüberschussrechnung: Hier zählt der Zufluss (§ 11 Abs. 1 EStG). Die Jahreszahlung ist im Jahr des Geldeingangs Betriebseinnahme, der MRR verteilt sie trotzdem auf zwölf Monate.",
          ],
        },
        {
          art: "text",
          text: "Für die Planung heißt das: Die Jahreszahlung hilft der [[/lexikon/runway|Runway]] sofort, der Leistung dafür schuldest du dem Kunden aber noch elf Monate.",
        },
      ],
    },
    {
      titel: "Typische Fehler bei MRR und ARR",
      bloecke: [
        {
          art: "liste",
          punkte: [
            "Einmalumsätze einrechnen, damit die Zahl größer wirkt.",
            "Bruttopreise verwenden.",
            "Jahreszahlungen im Monat des Geldeingangs voll zählen. Der MRR springt dann und fällt im Folgemonat wieder.",
            "ARR ausweisen, obwohl alle Kunden monatlich kündigen können. Rechnerisch stimmt MRR × 12, zugesichert ist davon nichts.",
            "Testnutzer und unbezahlte Rechnungen mitzählen.",
          ],
        },
      ],
    },
    {
      titel: "Was heißt das für Gründer?",
      bloecke: [
        {
          art: "text",
          text: "Leg einmal schriftlich fest, was bei dir in den MRR gehört, und rechne jeden Monat gleich. Führe die vier Bewegungen getrennt: neu, erweitert, verkleinert, gekündigt. Damit siehst du früh, ob du ein Vertriebsproblem oder ein Kündigungsproblem hast. Wer Investoren anspricht, sollte MRR, Wachstum je Monat, [[/lexikon/churn-rate|Churn]] und [[/lexikon/customer-acquisition-cost-cac|CAC]] aus derselben Datenbasis belegen können.",
        },
        {
          art: "hinweis",
          text: "Diese Seite erklärt die Kennzahl. Wie Abo-Erlöse in deinem Abschluss zu buchen sind, klärst du mit deinem Steuerberater.",
        },
      ],
    },
  ],
  verwandt: ["churn-rate", "customer-acquisition-cost-cac", "burn-rate", "runway", "north-star-metric"],
  kontext: [
    {
      pfad: "/guides/b2b-saas-spezifika",
      label: "Guide: B2B-SaaS mit Pricing und Vertrieb",
      text: "Preismodell und Tarife so aufbauen, dass wiederkehrender Umsatz entsteht.",
    },
    {
      pfad: "/tools/app-umsatz-rechner",
      label: "App-Store-Umsatz-Rechner",
      text: "Rechne aus, was nach Store-Provision und Umsatzsteuer von einem Abo übrig bleibt.",
    },
    {
      pfad: "/guides/coach-membership",
      label: "Guide: Membership und Community aufbauen",
      text: "Wiederkehrende Einnahmen für Coaches und Kursanbieter, Schritt für Schritt.",
    },
  ],
  quellen: [
    { titel: "§ 250 HGB: Rechnungsabgrenzungsposten", url: "https://www.gesetze-im-internet.de/hgb/__250.html" },
    { titel: "§ 252 HGB: Allgemeine Bewertungsgrundsätze", url: "https://www.gesetze-im-internet.de/hgb/__252.html" },
    { titel: "§ 11 EStG: Vereinnahmung und Verausgabung", url: "https://www.gesetze-im-internet.de/estg/__11.html" },
    { titel: "§ 12 UStG: Steuersätze", url: "https://www.gesetze-im-internet.de/ustg_1980/__12.html" },
    { titel: "David Skok: SaaS Metrics 2.0", url: "https://www.forentrepreneurs.com/saas-metrics-2/" },
  ],
};

export default inhalt;
