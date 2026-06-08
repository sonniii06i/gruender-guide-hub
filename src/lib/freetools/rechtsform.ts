import { Scale } from "lucide-react";
import { type ToolConfig, type ToolData, s, DISCLAIMER } from "./types";

interface FormInfo {
  name: string;
  desc: string;
  pros: string[];
  cons: string[];
}

const FORMS: Record<string, FormInfo> = {
  einzel: {
    name: "Einzelunternehmen",
    desc: "Die einfachste Rechtsform für Einzelgründer – schnell, günstig, ohne Mindestkapital.",
    pros: [
      "Schnelle und günstige Gründung (nur Gewerbeanmeldung)",
      "Kein Mindestkapital, einfache Buchführung (ggf. EÜR)",
      "Volle Entscheidungsfreiheit",
    ],
    cons: [
      "Unbeschränkte Haftung mit dem Privatvermögen",
      "Weniger seriöses Image bei großen B2B-Kunden / Investoren",
    ],
  },
  gbr: {
    name: "GbR (Gesellschaft bürgerlichen Rechts)",
    desc: "Die einfachste Form, wenn mehrere Personen gemeinsam gründen.",
    pros: [
      "Einfache, günstige Gründung ohne Notar und Mindestkapital",
      "Ideal für den gemeinsamen Start mehrerer Gründer",
    ],
    cons: [
      "Alle Gesellschafter haften unbeschränkt und gesamtschuldnerisch mit dem Privatvermögen",
      "Ein klarer GbR-Vertrag ist dringend zu empfehlen",
    ],
  },
  ug: {
    name: "UG (haftungsbeschränkt)",
    desc: "Die „kleine GmbH“ – Haftungsbeschränkung schon ab geringem Stammkapital.",
    pros: [
      "Haftung auf das Gesellschaftsvermögen beschränkt",
      "Gründung ab 1 € Stammkapital möglich",
      "Seriöser als Einzelunternehmen, Vorstufe zur GmbH",
    ],
    cons: [
      "Notar und Handelsregister nötig (Gründungskosten ca. 300–600 €)",
      "Pflicht-Rücklage von 25 % des Jahresüberschusses, doppelte Buchführung",
    ],
  },
  gmbh: {
    name: "GmbH",
    desc: "Der Standard für wachstumsorientierte Unternehmen mit Haftungsbeschränkung und seriösem Image.",
    pros: [
      "Haftung auf das Gesellschaftsvermögen beschränkt",
      "Hohes Ansehen bei Banken, B2B-Kunden und Investoren",
      "Klar geregelte Strukturen, gut skalierbar",
    ],
    cons: [
      "Stammkapital 25.000 € (mind. 12.500 € einzuzahlen)",
      "Höhere Gründungs- und laufende Kosten, doppelte Buchführung",
    ],
  },
};

function recommend(d: ToolData): { primary: string; alt: string[]; reasons: string[] } {
  const solo = s(d, "founders", "solo") === "solo";
  const liability = s(d, "liability") === "wichtig";
  const capital = s(d, "capital", "wenig"); // wenig | mittel | viel
  const image = s(d, "image") === "wichtig";
  const revenue = s(d, "revenue", "klein"); // klein | mittel | gross

  const reasons: string[] = [];
  let primary: string;
  const alt: string[] = [];

  if (!liability) {
    primary = solo ? "einzel" : "gbr";
    reasons.push("Du hast angegeben, dass die Haftungsbeschränkung für dich aktuell nicht im Vordergrund steht.");
    reasons.push(solo ? "Als Einzelgründer ist das Einzelunternehmen die einfachste und günstigste Lösung." : "Beim gemeinsamen Start mehrerer Gründer ist die GbR die unkomplizierteste Form.");
    if (revenue === "klein") reasons.push("Bei zunächst kleinem Umsatz kannst du oft die Kleinunternehmerregelung (§ 19 UStG) nutzen.");
    alt.push("ug");
  } else {
    const capitalViel = capital === "viel";
    if (capitalViel || (image && revenue === "gross")) {
      primary = "gmbh";
      reasons.push("Dir ist die Haftungsbeschränkung wichtig.");
      if (capitalViel) reasons.push("Du hast ausreichend Startkapital für das GmbH-Stammkapital (25.000 €).");
      if (image) reasons.push("Ein seriöses Image gegenüber Kunden, Banken oder Investoren ist dir wichtig – dafür ist die GmbH ideal.");
      alt.push("ug");
    } else {
      primary = "ug";
      reasons.push("Dir ist die Haftungsbeschränkung wichtig, das volle GmbH-Stammkapital von 25.000 € steht aber (noch) nicht bereit.");
      reasons.push("Die UG (haftungsbeschränkt) bietet die Haftungsbeschränkung bereits ab geringem Kapital und lässt sich später in eine GmbH umwandeln.");
      alt.push(image || revenue === "gross" ? "gmbh" : "einzel");
    }
  }

  return { primary, alt: alt.slice(0, 2), reasons };
}

function block(form: FormInfo): string[] {
  const L: string[] = [];
  L.push(form.desc);
  L.push("Vorteile:");
  form.pros.forEach((p) => L.push(`  + ${p}`));
  L.push("Nachteile:");
  form.cons.forEach((c) => L.push(`  - ${c}`));
  return L;
}

function generate(data: ToolData): string {
  const { primary, alt, reasons } = recommend(data);
  const p = FORMS[primary];

  const L: string[] = [];
  L.push("Rechtsform-Empfehlung");
  L.push("");
  L.push(`Unsere Empfehlung für dich: ${p.name}`);
  L.push("");

  L.push("Begründung:");
  reasons.forEach((r) => L.push(`- ${r}`));
  L.push("");

  L.push(`Profil: ${p.name}`);
  block(p).forEach((l) => L.push(l));
  L.push("");

  if (alt.length) {
    L.push("Mögliche Alternativen:");
    alt.forEach((a) => {
      const f = FORMS[a];
      if (f) {
        L.push("");
        L.push(`> ${f.name}`);
        L.push(`  ${f.desc}`);
      }
    });
    L.push("");
  }

  L.push("Nächste Schritte:");
  L.push("- Steuerliche Auswirkungen mit einem Steuerberater abklären (z. B. Gewerbesteuer, Körperschaftsteuer).");
  L.push("- Gründungskosten kalkulieren und Kapitalbedarf prüfen.");
  L.push("- Bei Kapitalgesellschaften: Gesellschaftsvertrag und Notartermin vorbereiten.");
  L.push("");
  L.push("");
  L.push(DISCLAIMER);

  return L.join("\n");
}

export const rechtsformConfig: ToolConfig = {
  slug: "rechtsform-finden",
  shortTitle: "Rechtsform",
  documentName: "Rechtsform-Empfehlung",
  icon: Scale,
  accent: "from-blue-500 to-cyan-600",
  badge: "Rechtsform-Finder",
  heroTitle: "Kostenloser Rechtsform-Finder",
  heroSubtitle:
    "Einzelunternehmen, GbR, UG oder GmbH? Beantworte ein paar Fragen und erhalte eine begründete Rechtsform-Empfehlung mit Vor- und Nachteilen. Kostenlos, nur ein kostenloses Konto nötig.",
  resultFilename: "rechtsform-empfehlung",
  steps: [
    {
      title: "Wie gründest du?",
      subtitle: "Alleine oder mit anderen?",
      fields: [
        {
          name: "founders",
          label: "Anzahl Gründer",
          type: "radio",
          required: true,
          colSpan: 2,
          options: [
            { value: "solo", label: "Ich gründe alleine" },
            { value: "team", label: "Wir gründen zu mehreren" },
          ],
        },
      ],
    },
    {
      title: "Haftung & Kapital",
      subtitle: "Wie wichtig ist dir der Schutz deines Privatvermögens?",
      fields: [
        {
          name: "liability",
          label: "Haftungsbeschränkung",
          type: "radio",
          required: true,
          colSpan: 2,
          options: [
            { value: "wichtig", label: "Wichtig – mein Privatvermögen soll geschützt sein" },
            { value: "egal", label: "Nicht entscheidend – Einfachheit ist mir wichtiger" },
          ],
        },
        {
          name: "capital",
          label: "Verfügbares Startkapital",
          type: "select",
          colSpan: 2,
          options: [
            { value: "wenig", label: "Wenig (unter 5.000 €)" },
            { value: "mittel", label: "Mittel (5.000–25.000 €)" },
            { value: "viel", label: "Viel (ab 25.000 €)" },
          ],
        },
      ],
    },
    {
      title: "Image & Umsatz",
      subtitle: "Wie trittst du am Markt auf?",
      fields: [
        {
          name: "image",
          label: "Seriöses Image (B2B, Banken, Investoren)",
          type: "radio",
          colSpan: 2,
          options: [
            { value: "wichtig", label: "Wichtig" },
            { value: "egal", label: "Eher nebensächlich" },
          ],
        },
        {
          name: "revenue",
          label: "Erwarteter Umsatz im ersten Jahr",
          type: "select",
          colSpan: 2,
          options: [
            { value: "klein", label: "Klein (unter 25.000 €)" },
            { value: "mittel", label: "Mittel (25.000–100.000 €)" },
            { value: "gross", label: "Groß (über 100.000 €)" },
          ],
        },
      ],
    },
  ],
  generate,
  seoSections: [
    {
      heading: "Welche Rechtsform passt zu deiner Gründung?",
      body: [
        "Die Wahl der Rechtsform ist eine der ersten und wichtigsten Entscheidungen jeder Gründung. Sie bestimmt, wie du haftest, wie viel Kapital du brauchst, wie aufwändig die Buchführung ist und wie seriös du am Markt auftrittst. Die häufigsten Formen sind Einzelunternehmen, GbR, UG (haftungsbeschränkt) und GmbH.",
        "Es gibt keine pauschal „beste“ Rechtsform – die richtige Wahl hängt von deiner Situation ab: Gründest du allein oder im Team? Wie wichtig ist Haftungsbeschränkung? Wie viel Kapital hast du? Genau das fragt dieser Finder ab und gibt dir eine begründete Empfehlung.",
      ],
    },
    {
      heading: "Einzelunternehmen, GbR, UG oder GmbH im Vergleich",
      body: [
        "Einzelunternehmen und GbR sind schnell und günstig, aber du haftest mit deinem Privatvermögen. UG und GmbH beschränken die Haftung auf das Gesellschaftsvermögen – dafür brauchst du Notar, Handelsregistereintrag und (bei der GmbH) 25.000 € Stammkapital. Die UG ist die kapitalschonende Einstiegsvariante mit Haftungsbeschränkung.",
        "Wer Wert auf ein seriöses Image gegenüber Banken, B2B-Kunden oder Investoren legt, fährt mit UG oder GmbH meist besser. Wer einfach und schlank starten will, beginnt oft als Einzelunternehmen.",
      ],
    },
    {
      heading: "Rechtsform später wechseln",
      body: [
        "Deine Entscheidung ist nicht für immer: Viele starten als Einzelunternehmen oder UG und wandeln später in eine GmbH um, wenn das Geschäft wächst. Wichtig ist, dass die Rechtsform jetzt zu deiner aktuellen Situation passt – steuerliche Details solltest du zusätzlich mit einem Steuerberater klären.",
      ],
    },
  ],
  seo: {
    title: "Rechtsform-Finder: Einzelunternehmen, UG oder GmbH? | GründerX",
    description:
      "Welche Rechtsform passt zu dir? Kostenloser Rechtsform-Finder mit begründeter Empfehlung (Einzelunternehmen, GbR, UG, GmbH) inkl. Vor- und Nachteilen. Nur kostenloses Konto nötig.",
    keywords:
      "rechtsform finden, welche rechtsform, rechtsform gründung, einzelunternehmen ug gmbh, rechtsform vergleich, rechtsform wählen",
    faqs: [
      {
        q: "Ist der Rechtsform-Finder kostenlos?",
        a: "Ja. Die Empfehlung und der PDF-Download sind kostenlos – du legst nur ein kostenloses GründerX-Konto an, um das Ergebnis freizuschalten.",
      },
      {
        q: "Welche Rechtsform ist die beste?",
        a: "Es gibt keine pauschal beste Rechtsform. Für Einzelgründer ohne Haftungssorge ist das Einzelunternehmen am einfachsten, für Haftungsschutz mit wenig Kapital die UG, für Wachstum und Image die GmbH. Der Finder gibt dir eine auf deine Angaben zugeschnittene Empfehlung.",
      },
      {
        q: "Kann ich die Rechtsform später wechseln?",
        a: "Ja. Ein Wechsel ist möglich – viele starten als Einzelunternehmen oder UG und wandeln später in eine GmbH um. Wichtig ist, dass die Form jetzt zu deiner Situation passt.",
      },
      {
        q: "Ersetzt das eine Steuerberatung?",
        a: "Nein. Der Finder gibt dir eine fundierte Orientierung. Steuerliche Detailfragen (z. B. Gewerbe- und Körperschaftsteuer, Geschäftsführergehalt) solltest du zusätzlich mit einem Steuerberater klären.",
      },
    ],
  },
};
