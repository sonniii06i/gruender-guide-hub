import { FileText } from "lucide-react";
import { type ToolConfig, type ToolData, s, DISCLAIMER } from "./types";

const BRANCHE_LABEL: Record<string, string> = {
  dienstleistung: "Dienstleistung",
  handel: "Handel / E-Commerce",
  handwerk: "Handwerk",
  gastro: "Gastronomie",
  software: "Software / SaaS",
  kreativ: "Kreativ / Agentur",
  gesundheit: "Gesundheit / Beauty",
  sonstiges: "Sonstiges",
};

function para(text: string, fallback: string): string {
  return text || fallback;
}

function generate(data: ToolData): string {
  const founder = s(data, "founder");
  const company = s(data, "company", "[Unternehmensname]");
  const branche = BRANCHE_LABEL[s(data, "branche")] || "[Branche]";
  const idea = s(data, "idea");
  const target = s(data, "target");
  const problem = s(data, "problem");
  const competition = s(data, "competition");
  const offer = s(data, "offer");
  const pricing = s(data, "pricing");
  const marketing = s(data, "marketing");
  const usp = s(data, "usp");
  const startCapital = s(data, "startCapital");
  const revenue = s(data, "revenue");
  const team = s(data, "team");
  const legalForm = s(data, "legalForm");

  const L: string[] = [];
  L.push(`Businessplan – ${company}`);
  L.push("");
  if (branche) L.push(`Branche: ${branche}`);
  if (founder) L.push(`Gründer/in: ${founder}`);
  if (legalForm) L.push(`Geplante Rechtsform: ${legalForm}`);
  L.push("");

  L.push("1. Executive Summary");
  L.push(
    para(
      idea
        ? `${company} ist ein Vorhaben im Bereich ${branche}. Kerngeschäft: ${idea}` +
            (target ? ` Zielgruppe sind ${target}.` : "") +
            (usp ? ` Das Alleinstellungsmerkmal: ${usp}.` : "")
        : "",
      "[Fasse hier in 3–4 Sätzen zusammen, was dein Unternehmen macht, für wen, und warum es erfolgreich sein wird.]"
    )
  );
  L.push("");

  L.push("2. Geschäftsidee");
  L.push(para(idea, "[Beschreibe deine Geschäftsidee konkret: Was bietest du an und wie funktioniert das Geschäft?]"));
  L.push("");

  L.push("3. Gründer und Team");
  L.push(
    para(
      [founder ? `Gegründet von ${founder}.` : "", team ? `Team / geplante Mitarbeiter: ${team}.` : ""]
        .filter(Boolean)
        .join(" "),
      "[Stelle dich und dein Team vor: Qualifikationen, Erfahrung und warum ihr die Richtigen für dieses Vorhaben seid.]"
    )
  );
  L.push("");

  L.push("4. Markt und Zielgruppe");
  L.push(para(target ? `Zielgruppe: ${target}` : "", "[Beschreibe deine Zielgruppe und die Marktgröße.]"));
  if (problem) {
    L.push("");
    L.push(`Problem, das wir lösen: ${problem}`);
  }
  L.push("");

  L.push("5. Wettbewerb und Alleinstellungsmerkmal (USP)");
  L.push(para(competition, "[Wer sind deine Wettbewerber? Wie grenzt du dich ab?]"));
  if (usp) {
    L.push("");
    L.push(`Unser USP: ${usp}`);
  }
  L.push("");

  L.push("6. Angebot und Preismodell");
  L.push(para(offer, "[Welche Produkte oder Leistungen bietest du konkret an?]"));
  if (pricing) {
    L.push("");
    L.push(`Preismodell: ${pricing}`);
  }
  L.push("");

  L.push("7. Marketing und Vertrieb");
  L.push(para(marketing, "[Über welche Kanäle gewinnst du Kunden? Online-Marketing, Social Media, Empfehlungen, Vertrieb?]"));
  L.push("");

  L.push("8. Finanzplanung");
  const fin: string[] = [];
  if (startCapital) fin.push(`Geschätzter Kapitalbedarf zum Start: ${startCapital}`);
  if (revenue) fin.push(`Erwarteter Monatsumsatz nach 12 Monaten: ${revenue}`);
  if (fin.length) {
    fin.forEach((f) => L.push(f));
    L.push("");
    L.push(
      "Ergänze diesen Abschnitt um eine Umsatz- und Kostenplanung für die ersten 3 Jahre sowie eine " +
        "Liquiditätsplanung (Einnahmen/Ausgaben pro Monat)."
    );
  } else {
    L.push(
      "[Plane Kapitalbedarf, Umsatz und Kosten für die ersten 3 Jahre sowie eine monatliche Liquiditätsvorschau.]"
    );
  }
  L.push("");

  L.push("9. Nächste Schritte");
  L.push("- Rechtsform final festlegen und Gewerbe anmelden");
  L.push("- Finanzplan im Detail ausarbeiten (ggf. für Bank/Förderung)");
  L.push("- Marketing- und Vertriebsstart vorbereiten");
  L.push("");
  L.push("");
  L.push(DISCLAIMER);

  return L.join("\n");
}

export const businessplanConfig: ToolConfig = {
  slug: "businessplan-erstellen",
  shortTitle: "Businessplan",
  documentName: "Businessplan",
  icon: FileText,
  accent: "from-indigo-500 to-violet-600",
  badge: "Für Gründer & Förderung",
  heroTitle: "Kostenloser Businessplan-Generator",
  heroSubtitle:
    "Erstelle Schritt für Schritt einen strukturierten Businessplan – mit allen Kapiteln, die Bank, Förderstelle und Investoren erwarten. In Minuten fertig, kostenlos, du brauchst nur ein kostenloses Konto.",
  resultFilename: "businessplan",
  steps: [
    {
      title: "Gründer & Idee",
      subtitle: "Worum geht es bei deinem Vorhaben?",
      fields: [
        { name: "founder", label: "Dein Name", type: "text", colSpan: 1, required: true },
        { name: "company", label: "Geplanter Unternehmensname", type: "text", placeholder: "z. B. MeineFirma", colSpan: 1, required: true },
        {
          name: "branche",
          label: "Branche",
          type: "select",
          colSpan: 2,
          required: true,
          options: [
            { value: "dienstleistung", label: "Dienstleistung" },
            { value: "handel", label: "Handel / E-Commerce" },
            { value: "handwerk", label: "Handwerk" },
            { value: "gastro", label: "Gastronomie" },
            { value: "software", label: "Software / SaaS" },
            { value: "kreativ", label: "Kreativ / Agentur" },
            { value: "gesundheit", label: "Gesundheit / Beauty" },
            { value: "sonstiges", label: "Sonstiges" },
          ],
        },
        { name: "idea", label: "Geschäftsidee in 1–2 Sätzen", type: "textarea", placeholder: "Was bietest du an und wie verdienst du Geld?", colSpan: 2, required: true },
      ],
    },
    {
      title: "Markt & Zielgruppe",
      subtitle: "Für wen und gegen wen?",
      fields: [
        { name: "target", label: "Zielgruppe", type: "textarea", placeholder: "Wer sind deine Kunden? (z. B. Selbstständige in DACH, 25–45 Jahre)", colSpan: 2, required: true },
        { name: "problem", label: "Welches Problem löst du?", type: "textarea", placeholder: "Welchen Schmerz / Bedarf deckst du ab?", colSpan: 2 },
        { name: "competition", label: "Wettbewerb & Abgrenzung", type: "textarea", placeholder: "Wer macht Ähnliches, und wie hebst du dich ab?", colSpan: 2 },
      ],
    },
    {
      title: "Angebot & Marketing",
      subtitle: "Dein Produkt und wie du Kunden gewinnst.",
      fields: [
        { name: "offer", label: "Produkt / Leistung", type: "textarea", placeholder: "Was genau verkaufst du?", colSpan: 2, required: true },
        { name: "usp", label: "Alleinstellungsmerkmal (USP)", type: "text", placeholder: "Warum kaufen Kunden bei dir statt woanders?", colSpan: 2 },
        { name: "pricing", label: "Preismodell", type: "text", placeholder: "z. B. 49 €/Monat, Stundensatz, Festpreis", colSpan: 1 },
        { name: "marketing", label: "Marketing-Kanäle", type: "textarea", placeholder: "Wie erreichst du Kunden? (SEO, Ads, Social, Empfehlungen)", colSpan: 2 },
      ],
    },
    {
      title: "Finanzen & Start",
      subtitle: "Die Eckzahlen deines Vorhabens.",
      fields: [
        { name: "startCapital", label: "Kapitalbedarf zum Start", type: "text", placeholder: "z. B. 15.000 €", colSpan: 1 },
        { name: "revenue", label: "Erwarteter Monatsumsatz nach 12 Monaten", type: "text", placeholder: "z. B. 8.000 €", colSpan: 1 },
        { name: "team", label: "Team / geplante Mitarbeiter", type: "text", placeholder: "z. B. nur ich, später 2", colSpan: 1 },
        { name: "legalForm", label: "Geplante Rechtsform (optional)", type: "text", placeholder: "z. B. Einzelunternehmen, UG, GmbH", colSpan: 1 },
      ],
    },
  ],
  generate,
  seoSections: [
    {
      heading: "Warum brauchst du einen Businessplan?",
      body: [
        "Ein Businessplan zwingt dich, deine Idee zu Ende zu denken: Zielgruppe, Markt, Wettbewerb, Angebot, Marketing und Finanzen an einem Ort. Spätestens wenn du einen Bankkredit, den Gründungszuschuss oder Fördermittel (z. B. KfW) beantragst, ist ein schlüssiger Businessplan Pflicht.",
        "Aber auch ohne Finanzierung lohnt er sich: Wer seine Zahlen und Annahmen einmal sauber durchdacht hat, startet deutlich sicherer und vermeidet teure Fehler.",
      ],
    },
    {
      heading: "Welche Kapitel gehören in einen Businessplan?",
      body: [
        "Ein vollständiger Businessplan enthält: Executive Summary, Geschäftsidee, Gründer/Team, Markt- und Zielgruppenanalyse, Wettbewerb und USP, Angebot und Preismodell, Marketing und Vertrieb sowie eine Finanzplanung (Kapitalbedarf, Umsatz-, Kosten- und Liquiditätsplanung). Genau diese Struktur erzeugt dieser Generator automatisch aus deinen Angaben.",
        "Die Executive Summary steht vorne, schreibst du aber am besten zuletzt – sie ist die Visitenkarte deines Plans und entscheidet oft, ob weitergelesen wird.",
      ],
    },
    {
      heading: "Businessplan für Gründungszuschuss & Bank",
      body: [
        "Für den Gründungszuschuss der Agentur für Arbeit und für Bankgespräche brauchst du neben dem Textteil eine belastbare Finanzplanung. Achte auf realistische Umsatzannahmen, einen Liquiditätsplan über mindestens drei Jahre und einen klaren Kapitalbedarf. Dieser Generator liefert dir das Gerüst – die Detailzahlen ergänzt du im Finanzteil.",
      ],
    },
  ],
  seo: {
    title: "Kostenloser Businessplan-Generator – in Minuten erstellen | GründerX",
    description:
      "Businessplan kostenlos erstellen: Schritt-für-Schritt-Generator mit allen Kapiteln für Bank, Gründungszuschuss & Förderung. In Minuten fertig, nur kostenloses Konto nötig.",
    keywords:
      "businessplan erstellen, businessplan vorlage, businessplan generator, businessplan kostenlos, businessplan gründungszuschuss, businessplan muster",
    faqs: [
      {
        q: "Ist der Businessplan-Generator kostenlos?",
        a: "Ja. Das Erstellen und Herunterladen deines Businessplans als PDF ist kostenlos – du legst nur ein kostenloses GründerX-Konto an, um das Ergebnis freizuschalten.",
      },
      {
        q: "Reicht der Businessplan für den Gründungszuschuss oder die Bank?",
        a: "Der Generator liefert dir die vollständige Struktur und den Textteil. Für Gründungszuschuss und Bank solltest du den Finanzteil (Umsatz-, Kosten- und Liquiditätsplanung) noch mit konkreten Zahlen ausarbeiten – das Gerüst dafür ist enthalten.",
      },
      {
        q: "Wie lange dauert das Erstellen?",
        a: "In der Regel 10–15 Minuten. Du beantwortest Schritt für Schritt Fragen zu Idee, Markt, Angebot und Finanzen, und der Generator baut daraus einen strukturierten Businessplan.",
      },
      {
        q: "Kann ich den Businessplan später anpassen?",
        a: "Ja. Du erhältst den Plan als bearbeitbaren Text und als PDF. Du kannst die Kapitel jederzeit ergänzen und verfeinern – ein Businessplan ist ein lebendes Dokument.",
      },
    ],
  },
};
