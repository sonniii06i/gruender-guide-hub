import { Gift } from "lucide-react";
import { type ToolConfig, type ToolData, type FieldDef, s, DISCLAIMER, zahl } from "./types";

// PR-Paket-Rechner (25.10.2026): erfasst Gratis-Produkte und -Leistungen gegen Werbung
// als Betriebseinnahmen. Regeln: Leitfaden Finanzamt Hessen (Juni 2026) – behaltene
// Produkte mit üblichem Endpreis abzgl. üblicher Preisnachlässe, Rücksendung keine
// Einnahme, private Weiternutzung = Entnahme, Gratis-Dienstleistungen zum regulären Wert.
const HESSEN =
  "https://finanzamt.hessen.de/sites/finanzamt.hessen.de/files/2026-07/leitfaden_zur_besteuerung_von_influencerinnen_und_influencern.pdf";
const ZEILEN = 6;

const euro = (n: number) => n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

const VERBLEIB = [
  { value: "behalten", label: "Behalten, betrieblich genutzt" },
  { value: "privat", label: "Behalten, danach privat genutzt" },
  { value: "zurueck", label: "Zurückgeschickt" },
  { value: "leistung", label: "Dienstleistung (Hotel, Event, Reise)" },
];

function zeilenFelder(i: number): FieldDef[] {
  const sichtbar = (d: ToolData) => i === 1 || !!s(d, `p${i - 1}_name`);
  return [
    { name: `p${i}_name`, label: `Produkt / Leistung ${i}`, type: "text", placeholder: i === 1 ? "z. B. Kopfhörer von Marke X" : "", colSpan: 2, condition: sichtbar },
    { name: `p${i}_preis`, label: "Üblicher Endpreis (€)", type: "text", placeholder: "z. B. 249", colSpan: 1, condition: (d) => sichtbar(d) && !!s(d, `p${i}_name`) },
    { name: `p${i}_rabatt`, label: "Üblicher Rabatt (%)", type: "text", placeholder: "z. B. 10", colSpan: 1, condition: (d) => sichtbar(d) && !!s(d, `p${i}_name`) },
    { name: `p${i}_verbleib`, label: "Was ist damit passiert?", type: "select", options: VERBLEIB, colSpan: 2, condition: (d) => sichtbar(d) && !!s(d, `p${i}_name`) },
  ];
}

function generate(d: ToolData): string {
  const zeilen = Array.from({ length: ZEILEN }, (_, k) => k + 1)
    .map((i) => {
      const name = s(d, `p${i}_name`);
      if (!name) return null;
      const preis = zahl(s(d, `p${i}_preis`));
      const rabatt = Math.min(zahl(s(d, `p${i}_rabatt`)), 100);
      const verbleib = s(d, `p${i}_verbleib`, "behalten");
      const wert = verbleib === "zurueck" ? 0 : preis * (1 - rabatt / 100);
      return { name, preis, rabatt, verbleib, wert };
    })
    .filter(Boolean) as { name: string; preis: number; rabatt: number; verbleib: string; wert: number }[];

  const summe = zeilen.reduce((a, z) => a + z.wert, 0);
  const kleinunternehmer = s(d, "ust") === "ku";

  const L: string[] = [];
  L.push("PR-Pakete & Gratis-Leistungen – deine Übersicht");
  L.push("");
  if (zeilen.length === 0) {
    L.push("Du hast noch nichts eingetragen. Erfasse jedes PR-Paket und jede Gratis-Leistung, sobald sie ankommt.");
  } else {
    L.push("1. Erfasste Posten");
    zeilen.forEach((z) => {
      const art = VERBLEIB.find((v) => v.value === z.verbleib)?.label ?? z.verbleib;
      const rechnung = z.verbleib === "zurueck" ? "keine Einnahme" : `${euro(z.preis)} − ${z.rabatt.toLocaleString("de-DE")} % = ${euro(z.wert)}`;
      L.push(`- ${z.name} (${art}): ${rechnung}`);
    });
    L.push("");
    L.push(`Summe als Betriebseinnahme anzusetzen: ${euro(summe)}`);
  }
  L.push("");

  L.push("2. So ist gerechnet");
  L.push("- Behaltene Produkte: üblicher Endpreis abzüglich üblicher Preisnachlässe.");
  L.push("- Zurückgeschickte Produkte: keine Einnahme – Rücksendebeleg aufheben.");
  L.push("- Gratis-Dienstleistungen gegen Werbung (z. B. Hotelnacht): regulärer Wert.");
  if (zeilen.some((z) => z.verbleib === "privat")) {
    L.push(
      "- Privat weiter genutzt: Den Wertverlust während der betrieblichen Nutzung kannst du als Betriebsausgabe ansetzen. " +
        "Wechselt das Produkt danach ins Private, erfasst du den Teilwert des gebrauchten Stücks als Entnahme (erhöht den Gewinn).",
    );
  }
  L.push("");

  L.push("3. Umsatzsteuer");
  L.push(
    kleinunternehmer
      ? "Als Kleinunternehmer (§ 19 UStG) weist du keine Umsatzsteuer aus. Die Werte zählen aber zu deinem Umsatz – behalte die 25.000-€-Grenze im Blick."
      : "Bei Regelbesteuerung lösen solche Sachzuwendungen grundsätzlich Umsatzsteuer aus. Ausnahmen kann es bei Rücksendung oder sehr geringem Wert geben – " +
          "die genaue Bemessung klärst du am besten mit deinem Steuerberater.",
  );
  L.push("");

  L.push("4. Was du aufbewahren solltest");
  L.push("- Kooperations-Mail oder Vertrag (wer, was, Gegenleistung)");
  L.push("- Screenshot des üblichen Preises zum Zeitpunkt des Erhalts");
  L.push("- Link zum Werbe-Post / Video");
  L.push("- Bei Rücksendung: Versandbeleg");
  L.push("");
  L.push(`Quelle: Finanzamt Hessen, Leitfaden zur Besteuerung von Influencerinnen und Influencern (Juni 2026): ${HESSEN}`);
  L.push("");
  L.push(DISCLAIMER);
  return L.join("\n");
}

export const prPaketRechnerConfig: ToolConfig = {
  slug: "pr-paket-rechner",
  shortTitle: "PR-Paket-Rechner",
  documentName: "PR-Paket-Übersicht",
  icon: Gift,
  accent: "from-fuchsia-500 to-purple-600",
  badge: "Für Creator & Influencer",
  heroTitle: "PR-Paket-Rechner: Was musst du versteuern?",
  heroSubtitle:
    "Trag deine PR-Pakete und Gratis-Leistungen ein – du bekommst den Wert, den du als Einnahme ansetzt, plus Checkliste für die Belege. Nach den Regeln der Finanzverwaltung. 1 kostenlose Berechnung, nur E-Mail nötig.",
  resultFilename: "pr-pakete-uebersicht",
  steps: [
    {
      title: "Deine PR-Pakete",
      subtitle: "Bis zu sechs Posten – die nächste Zeile erscheint, sobald du einen Namen einträgst.",
      fields: Array.from({ length: ZEILEN }, (_, k) => zeilenFelder(k + 1)).flat(),
    },
    {
      title: "Umsatzsteuer",
      fields: [
        {
          name: "ust",
          label: "Wie bist du umsatzsteuerlich aufgestellt?",
          type: "radio",
          required: true,
          options: [
            { value: "ku", label: "Kleinunternehmer (§ 19 UStG)" },
            { value: "regel", label: "Regelbesteuerung (mit USt)" },
            { value: "unsicher", label: "Weiß ich nicht" },
          ],
        },
      ],
    },
  ],
  generate,
  seoSections: [
    {
      heading: "Muss ich PR-Pakete versteuern?",
      body: [
        "Ja – wenn du ein Produkt erhältst, dafür wirbst und es danach behalten darfst. Die Finanzverwaltung setzt dann den üblichen Endpreis abzüglich üblicher Preisnachlässe als Betriebseinnahme an. Musst du das Produkt zurückschicken, entsteht keine Einnahme.",
        "Gratis-Dienstleistungen gegen Werbung oder namentliche Nennung, etwa Hotelübernachtungen, zählen ebenfalls mit ihrem regulären Wert.",
      ],
    },
    {
      heading: "Was passiert, wenn ich das Produkt privat weiter nutze?",
      body: [
        "Der Wertverlust während der betrieblichen Nutzung ist eine Betriebsausgabe. Nutzt du das Produkt anschließend privat, wird der Teilwert des gebrauchten Stücks als Entnahme erfasst und erhöht deinen Gewinn.",
      ],
    },
  ],
  seo: {
    title: "PR-Pakete versteuern – kostenloser Rechner | GründerX",
    description:
      "PR-Pakete & Gratis-Hotelnächte richtig versteuern: Wert berechnen, Rücksendung, private Nutzung, Umsatzsteuer – nach Regeln der Finanzverwaltung. Gratis.",
    keywords: "pr pakete versteuern, pr samples steuer, influencer geschenke steuer, gratis produkte influencer finanzamt, pr paket wert berechnen",
    faqs: [
      {
        q: "Mit welchem Wert setze ich ein PR-Paket an?",
        a: "Mit dem üblichen Endpreis am Abgabeort abzüglich üblicher Preisnachlässe – nicht mit dem Einkaufspreis der Marke.",
      },
      {
        q: "Muss ich zurückgeschickte Produkte versteuern?",
        a: "Nein. Wenn du das Produkt nach der Werbung zurückgeben musst, ist es keine Einnahme. Heb den Rücksendebeleg auf.",
      },
      {
        q: "Zählt eine Gratis-Hotelnacht?",
        a: "Ja. Gratis-Dienstleistungen gegen Werbung oder Nennung erfasst du mit ihrem regulären Wert als Einnahme.",
      },
      {
        q: "Ist der Rechner kostenlos?",
        a: "Eine Berechnung ist kostenlos – E-Mail angeben, Übersicht samt PDF erhalten. Unbegrenzt im GründerX-Abo.",
      },
    ],
  },
};
