import { Calculator } from "lucide-react";
import { type ToolConfig, type ToolData, s, b, DISCLAIMER } from "./types";

function parseNum(v: string): number {
  if (!v) return 0;
  let t = v.replace(/[€\s]/g, "");
  if (t.includes(",")) t = t.replace(/\./g, "").replace(",", ".");
  const n = parseFloat(t);
  return isFinite(n) ? n : 0;
}
function euro(n: number): string {
  return n.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " €";
}

// Typische Formalitätskosten je Rechtsform (Schätzwerte, Mittelwert).
const FORMALITIES: Record<string, { label: string; cost: number; note: string }> = {
  einzel: { label: "Einzelunternehmen", cost: 40, note: "Gewerbeanmeldung (ca. 20–60 €). Freiberufler nur Finanzamt-Meldung (kostenlos)." },
  gbr: { label: "GbR", cost: 80, note: "Gewerbeanmeldung je Gesellschafter; kein Mindestkapital, kein Notar nötig." },
  ug: { label: "UG (haftungsbeschränkt)", cost: 450, note: "Notar, Handelsregister & Gewerbeanmeldung (ca. 300–600 €). Stammkapital ab 1 €." },
  gmbh: { label: "GmbH", cost: 800, note: "Notar, Handelsregister & Gewerbeanmeldung (ca. 600–1.000 €). Stammkapital 25.000 € (mind. 12.500 € einzuzahlen)." },
};

const STAMMKAPITAL: Record<string, string> = {
  einzel: "Kein Mindestkapital vorgeschrieben.",
  gbr: "Kein Mindestkapital vorgeschrieben.",
  ug: "Stammkapital ab 1 € möglich (empfohlen: mehr, um nicht sofort insolvent zu sein). Pflicht-Rücklage von 25 % des Jahresüberschusses.",
  gmbh: "Stammkapital 25.000 € (davon mindestens 12.500 € vor Eintragung einzuzahlen).",
};

interface Item { label: string; amount: number; }

function generate(data: ToolData): string {
  const form = s(data, "legalForm", "einzel");
  const f = FORMALITIES[form] || FORMALITIES.einzel;

  const variable: Item[] = [
    { label: "Steuer-/Gründungsberatung", amount: parseNum(s(data, "beratung")) },
    { label: "Website / Online-Auftritt", amount: parseNum(s(data, "website")) },
    { label: "Erstausstattung / Equipment", amount: parseNum(s(data, "equipment")) },
    { label: "Waren- / Materiallager", amount: parseNum(s(data, "waren")) },
    { label: "Marketing-Startbudget", amount: parseNum(s(data, "marketing")) },
    { label: "Sonstiges / Puffer", amount: parseNum(s(data, "sonstiges")) },
  ].filter((i) => i.amount > 0);

  const variableSum = variable.reduce((a, i) => a + i.amount, 0);
  const total = f.cost + variableSum;

  const L: string[] = [];
  L.push(`Gründungskosten – Übersicht (${f.label})`);
  L.push("");

  L.push("1. Formalitäten & Gründung (Schätzwert)");
  L.push(`${f.label}: ca. ${euro(f.cost)}`);
  L.push(f.note);
  L.push("");

  L.push("2. Variable Startkosten (deine Angaben)");
  if (variable.length) {
    variable.forEach((i) => L.push(`- ${i.label}: ${euro(i.amount)}`));
    L.push(`Summe variable Kosten: ${euro(variableSum)}`);
  } else {
    L.push("Keine variablen Kosten angegeben.");
  }
  L.push("");

  L.push("3. Geschätztes Gründungsbudget");
  L.push(`Gesamt (Formalitäten + variable Kosten): ca. ${euro(total)}`);
  L.push("");

  L.push("4. Stammkapital");
  L.push(STAMMKAPITAL[form] || STAMMKAPITAL.einzel);
  L.push("");

  L.push("5. Hinweis");
  L.push(
    "Die Formalitätskosten sind Durchschnitts-Schätzwerte und variieren je nach Notar, Region und Aufwand. " +
      "Plane zusätzlich Liquidität für die ersten Monate ein, in denen Umsatz und Kosten noch nicht im " +
      "Gleichgewicht sind."
  );
  L.push("");
  L.push("");
  L.push(DISCLAIMER);

  return L.join("\n");
}

export const gruendungskostenConfig: ToolConfig = {
  slug: "gruendungskosten-rechner",
  shortTitle: "Gründungskosten",
  documentName: "Gründungskosten-Übersicht",
  icon: Calculator,
  accent: "from-emerald-500 to-teal-600",
  badge: "Kosten-Rechner",
  heroTitle: "Kostenloser Gründungskosten-Rechner",
  heroSubtitle:
    "Berechne dein Gründungsbudget in Minuten – Formalitäten je Rechtsform plus deine individuellen Startkosten. Kostenlos, du brauchst nur ein kostenloses Konto.",
  resultFilename: "gruendungskosten",
  steps: [
    {
      title: "Rechtsform",
      subtitle: "Davon hängen Notar-, Register- und Stammkapital-Anforderungen ab.",
      fields: [
        {
          name: "legalForm",
          label: "Geplante Rechtsform",
          type: "select",
          required: true,
          colSpan: 2,
          options: [
            { value: "einzel", label: "Einzelunternehmen / Freiberufler" },
            { value: "gbr", label: "GbR" },
            { value: "ug", label: "UG (haftungsbeschränkt)" },
            { value: "gmbh", label: "GmbH" },
          ],
        },
      ],
    },
    {
      title: "Deine Startkosten",
      subtitle: "Trage ein, was du brauchst – leer lassen, was nicht zutrifft (Beträge in €).",
      fields: [
        { name: "beratung", label: "Steuer-/Gründungsberatung", type: "text", placeholder: "z. B. 500", colSpan: 1 },
        { name: "website", label: "Website / Online-Auftritt", type: "text", placeholder: "z. B. 1500", colSpan: 1 },
        { name: "equipment", label: "Erstausstattung / Equipment", type: "text", placeholder: "z. B. 3000", colSpan: 1 },
        { name: "waren", label: "Waren- / Materiallager", type: "text", placeholder: "z. B. 5000", colSpan: 1 },
        { name: "marketing", label: "Marketing-Startbudget", type: "text", placeholder: "z. B. 2000", colSpan: 1 },
        { name: "sonstiges", label: "Sonstiges / Puffer", type: "text", placeholder: "z. B. 1000", colSpan: 1 },
      ],
    },
  ],
  generate,
  seoSections: [
    {
      heading: "Welche Kosten entstehen bei der Gründung?",
      body: [
        "Die Gründungskosten setzen sich aus zwei Blöcken zusammen: den Formalitäten (Gewerbeanmeldung, bei Kapitalgesellschaften zusätzlich Notar und Handelsregister) und den variablen Startkosten wie Beratung, Website, Erstausstattung, Warenlager und Marketing. Bei einem Einzelunternehmen reichen oft unter 100 € Formalitäten, bei einer GmbH kommen schnell 600–1.000 € plus Stammkapital zusammen.",
        "Dieser Rechner schätzt die Formalitäten je nach Rechtsform und addiert deine individuellen Posten zu einem Gesamtbudget.",
      ],
    },
    {
      heading: "Stammkapital: UG vs. GmbH",
      body: [
        "Die UG (haftungsbeschränkt) lässt sich theoretisch ab 1 € Stammkapital gründen – praktisch solltest du genug Kapital einplanen, um die Anlaufkosten zu decken. Die GmbH verlangt 25.000 € Stammkapital, von denen vor der Eintragung mindestens 12.500 € eingezahlt sein müssen. Einzelunternehmen und GbR haben kein Mindestkapital.",
      ],
    },
    {
      heading: "Liquidität nicht vergessen",
      body: [
        "Die reinen Gründungskosten sind nur der Anfang. Plane zusätzlich einen Liquiditätspuffer für die ersten Monate ein, in denen die laufenden Kosten (Miete, Versicherungen, dein Lebensunterhalt) bereits anfallen, der Umsatz aber noch nicht trägt. Viele Gründungen scheitern nicht an der Idee, sondern an zu knapp kalkulierter Liquidität.",
      ],
    },
  ],
  seo: {
    title: "Gründungskosten-Rechner – kostenlos berechnen | GründerX",
    description:
      "Gründungskosten kostenlos berechnen: Formalitäten je Rechtsform (Einzelunternehmen, UG, GmbH) plus deine Startkosten – inkl. Stammkapital-Hinweis. Nur kostenloses Konto nötig.",
    keywords:
      "gründungskosten rechner, gründungskosten gmbh, gründungskosten ug, was kostet eine gründung, startkapital berechnen, gründungsbudget",
    faqs: [
      {
        q: "Ist der Gründungskosten-Rechner kostenlos?",
        a: "Ja. Die Berechnung und der Download als PDF sind kostenlos – du legst nur ein kostenloses GründerX-Konto an, um das Ergebnis freizuschalten.",
      },
      {
        q: "Was kostet die Gründung einer GmbH?",
        a: "Für die Formalitäten (Notar, Handelsregister, Gewerbeanmeldung) solltest du grob 600–1.000 € einplanen, dazu kommt das Stammkapital von 25.000 € (mind. 12.500 € einzuzahlen). Plus deine variablen Startkosten – der Rechner addiert alles zusammen.",
      },
      {
        q: "Sind die Formalitätskosten exakt?",
        a: "Es sind Durchschnitts-Schätzwerte. Die tatsächlichen Notar- und Registerkosten hängen von Region, Anbieter und Aufwand ab. Für die genaue Kalkulation lohnt eine kurze Rücksprache mit Notar oder Steuerberater.",
      },
      {
        q: "Brauche ich für eine UG viel Kapital?",
        a: "Rechtlich reicht 1 € Stammkapital, praktisch solltest du genug einplanen, um Gründungs- und Anlaufkosten zu decken. Die UG muss zudem 25 % des Jahresüberschusses als Rücklage ansparen, bis 25.000 € erreicht sind.",
      },
    ],
  },
};
