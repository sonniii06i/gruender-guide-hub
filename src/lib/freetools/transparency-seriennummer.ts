import { ScanLine } from "lucide-react";
import { type ToolConfig, type ToolData, s, DISCLAIMER } from "./types";

// Widerspruch gegen abgelehnte Seriennummern-/Code-Bilduploads im Amazon-Transparency-Programm.
// Häufiges Problem: Codes/Bilder werden wiederholt abgelehnt, obwohl sie die Anforderungen erfüllen.

const REASON_LABEL: Record<string, string> = {
  lesbarkeit: "Code/Seriennummer sei nicht lesbar",
  falscherCode: "Code sei ungültig oder gehöre nicht zum Produkt",
  platzierung: "Platzierung des Codes auf Produkt/Verpackung wurde beanstandet",
  bildqualitaet: "Bildqualität / Belichtung / Auflösung wurde beanstandet",
  nichtgescannt: "Code konnte angeblich nicht gescannt werden",
  format: "Datei-/Formatanforderungen wurden beanstandet",
  sonstiges: "Sonstiger / unklarer Ablehnungsgrund",
};

function bullets(text: string): string[] {
  return text
    .split(/\n+/)
    .map((l) => l.trim().replace(/^[-•*]\s*/, ""))
    .filter(Boolean)
    .map((l) => `   • ${l}`);
}

function reasonArgument(data: ToolData): string[] {
  const reason = s(data, "reason", "lesbarkeit");
  const code = s(data, "code");

  const L: string[] = [];

  if (reason === "lesbarkeit") {
    L.push(
      "Der aufgebrachte Transparency-Code ist vollständig und scharf abgebildet. Der gesamte Code-Bereich liegt " +
        "innerhalb des Bildausschnitts, ist gleichmäßig ausgeleuchtet und frei von Spiegelungen, Unschärfe, Schatten " +
        "oder Verdeckungen."
    );
    L.push(
      "Für die erneute Einreichung haben wir die Aufnahme in höherer Auflösung und mit erhöhtem Kontrast erstellt. " +
        "Der Code lässt sich mit der Amazon-Transparency-App reproduzierbar und einwandfrei scannen."
    );
    L.push(
      "Gern liefern wir ergänzend eine Nahaufnahme (Makro) sowie ein Übersichtsfoto im Produktkontext und bitten um " +
        "eine manuelle Prüfung des Uploads."
    );
  } else if (reason === "falscherCode") {
    L.push(
      "Der abgebildete Code" + (code ? ` (${code})` : "") + " stammt aus dem offiziell von Amazon Transparency für " +
        "dieses Produkt bereitgestellten bzw. autorisierten Code-Kontingent und gehört eindeutig zur betreffenden " +
        "ASIN/Einheit."
    );
    L.push(
      "Wir bitten um Abgleich des Codes mit dem für unser Konto hinterlegten Transparency-Bestand. Gern nennen wir " +
        "die zugehörige Charge bzw. Code-Quelle sowie die GTIN des Produkts zur eindeutigen Zuordnung."
    );
    L.push(
      "Sollte die automatische Zuordnung fehlschlagen, bitten wir um Nennung des erwarteten Code-Formats bzw. der " +
        "korrekten Code-Quelle – möglicherweise wurde ein Code aus einer anderen Charge erfasst. Das korrigieren wir umgehend."
    );
  } else if (reason === "platzierung") {
    L.push(
      "Der Code ist gut sichtbar und dauerhaft auf der Produktverpackung bzw. dem Etikett angebracht – an einer " +
        "ebenen, nicht gewölbten Stelle und ohne Überlappung mit anderen Codes (z. B. Barcode/EAN) oder Designelementen."
    );
    L.push(
      "Gern liefern wir zusätzlich ein Foto, das den Code im Gesamtkontext der Verpackung zeigt, sowie eine " +
        "Nahaufnahme, damit Platzierung und Lesbarkeit eindeutig nachvollziehbar sind."
    );
    L.push(
      "Falls eine bestimmte Platzierung gefordert ist, bitten wir um einen konkreten Hinweis (Position/Fläche). Wir " +
        "passen die Anbringung umgehend an und reichen ein neues Foto ein."
    );
  } else if (reason === "bildqualitaet") {
    L.push(
      "Wir reichen ein neues Foto in hoher Auflösung ein: scharf, gleichmäßig ausgeleuchtet, ohne Blitzreflexe und " +
        "ohne Bewegungsunschärfe, mit dem vollständigen Code mittig im Bild und in ausreichendem Abstand aufgenommen."
    );
    L.push(
      "Die Aufnahme erfolgt vor neutralem Hintergrund bei Tageslicht, um Reflexionen und Farbstiche zu vermeiden. Der " +
        "Code ist damit sowohl visuell als auch per App eindeutig erfassbar."
    );
    L.push(
      "Bitte bestätigen Sie die geforderten Mindestanforderungen (z. B. Auflösung/Format), damit der erneute Upload " +
        "sofort akzeptiert werden kann."
    );
  } else if (reason === "nichtgescannt") {
    L.push(
      "Der Code ist technisch einwandfrei und in unseren Tests mit der Amazon-Transparency-App reproduzierbar scanbar. " +
        "Ein fehlgeschlagener automatischer Scan ist daher auf die Bildverarbeitung im Prüfprozess zurückzuführen, " +
        "nicht auf den Code selbst."
    );
    L.push(
      "Zur Bestätigung liefern wir gern zusätzliche Aufnahmen aus verschiedenen Winkeln sowie ein kurzes Video, das " +
        "den erfolgreichen Scan mit der Transparency-App dokumentiert."
    );
    L.push(
      "Wir bitten ausdrücklich um eine manuelle Prüfung des hochgeladenen Bildes und um Freigabe auf dieser Grundlage."
    );
  } else if (reason === "format") {
    L.push(
      "Wir laden die Datei gern im geforderten Format erneut hoch: gängiges Bildformat (z. B. JPG/PNG), ausreichende " +
        "Auflösung, ohne Komprimierungsartefakte, vollständiger Bildausschnitt und nur ein Code pro Bild."
    );
    L.push(
      "Sollte eine bestimmte Dateigröße, ein Seitenverhältnis oder ein Dateityp vorgeschrieben sein, passen wir die " +
        "Aufnahme exakt daran an."
    );
    L.push("Bitte bestätigen Sie das bevorzugte Datei- und Bildformat für einen sofort akzeptierten Upload.");
  } else {
    L.push(
      "Wir bitten höflich um eine konkrete Begründung, welche Anforderung als nicht erfüllt bewertet wurde, sowie um " +
        "Nennung der genauen Vorgaben (Code-Quelle, Platzierung, Bild- bzw. Dateiformat)."
    );
    L.push(
      "Proaktiv liefern wir bereits mehrere Aufnahmen des Codes aus unterschiedlichen Winkeln sowie ein kurzes " +
        "Scan-Video zur Verifizierung."
    );
    L.push(
      "Wir bitten um eine manuelle Prüfung und um einen konkreten Hinweis, welcher einzelne Punkt noch anzupassen ist, " +
        "damit wir umgehend eine korrigierte Aufnahme bereitstellen können."
    );
  }

  return L;
}

function generate(data: ToolData): string {
  const store = s(data, "store");
  const product = s(data, "product");
  const asin = s(data, "asin");
  const code = s(data, "code");
  const reason = s(data, "reason", "lesbarkeit");
  const count = s(data, "count");
  const extra = s(data, "extra");

  const L: string[] = [];
  L.push("Widerspruch: Abgelehnter Seriennummern-/Code-Upload (Amazon Transparency)");
  L.push("");
  if (store) L.push(`Verkäufer / Shop: ${store}`);
  if (product) L.push(`Produkt: ${product}`);
  if (asin) L.push(`ASIN: ${asin}`);
  if (code) L.push(`Betroffener Transparency-Code: ${code}`);
  L.push(`Ablehnungsgrund laut Amazon: ${REASON_LABEL[reason] || REASON_LABEL.sonstiges}`);
  if (count) L.push(`Anzahl bisheriger Ablehnungen: ${count}`);
  L.push("");

  L.push("Sehr geehrtes Transparency-Team,");
  L.push("");
  L.push(
    "wir beziehen uns auf die wiederholte Ablehnung unseres hochgeladenen Seriennummern-/Code-Bildes im " +
      "Rahmen des Transparency-Programms. Nach erneuter Prüfung sind wir überzeugt, dass die Aufnahme die " +
      "Anforderungen erfüllt, und bitten um eine erneute – idealerweise manuelle – Bewertung."
  );
  L.push("");

  L.push("1. Stellungnahme zum Ablehnungsgrund");
  reasonArgument(data).forEach((p) => {
    L.push(p);
    L.push("");
  });

  L.push("2. Erfüllte Anforderungen");
  L.push("Das eingereichte Bild erfüllt nach unserer Prüfung die üblichen Transparency-Vorgaben:");
  L.push("   • Vollständiger Code im Bildausschnitt, mittig und scharf");
  L.push("   • Gleichmäßige Ausleuchtung, keine Spiegelungen/Blitzreflexe");
  L.push("   • Code dauerhaft und eindeutig auf Produkt/Verpackung angebracht");
  L.push("   • Hohe Auflösung, gängiges Bildformat, kein Beschnitt");
  if (extra) {
    bullets(extra).forEach((b) => L.push(b));
  }
  L.push("");

  L.push("3. Bitte");
  L.push(
    "Wir bitten um eine manuelle Überprüfung des Uploads und um Freigabe. Sollte eine konkrete Anforderung " +
      "nicht erfüllt sein, bitten wir um einen präzisen Hinweis (z. B. Platzierung, Format, Code-Quelle), damit " +
      "wir umgehend eine korrigierte Aufnahme bereitstellen können. Gern liefern wir zusätzliche Fotos aus " +
      "mehreren Winkeln oder ein kurzes Scan-Video zur Verifizierung."
  );
  L.push("");
  L.push("Mit freundlichen Grüßen");
  L.push(store || "[Dein Name / Shop]");
  L.push("");
  L.push("");
  L.push(DISCLAIMER);

  return L.join("\n");
}

export const transparencySeriennummerConfig: ToolConfig = {
  slug: "amazon-transparency-seriennummer-widerspruch-generator",
  shortTitle: "Transparency-Code",
  documentName: "Widerspruch Transparency-Upload",
  icon: ScanLine,
  accent: "from-sky-500 to-indigo-600",
  badge: "Amazon-Transparency",
  heroTitle: "Amazon Transparency: Seriennummer-Upload abgelehnt? Widerspruch-Generator",
  heroSubtitle:
    "Dein Code- bzw. Seriennummern-Foto wird im Transparency-Programm wiederholt abgelehnt, obwohl es die Anforderungen erfüllt? Erstelle in Minuten einen sachlichen Widerspruch mit Bitte um manuelle Prüfung. Kostenlos, nur ein kostenloses Konto nötig.",
  resultFilename: "amazon-transparency-widerspruch",
  steps: [
    {
      title: "Konto, Produkt & Ablehnungsgrund",
      subtitle: "Worum geht es – und was steht in der Ablehnung?",
      fields: [
        { name: "store", label: "Shop- / Verkäufername", type: "text", placeholder: "z. B. MeinShop", colSpan: 1 },
        { name: "asin", label: "ASIN (optional)", type: "text", placeholder: "z. B. B0XXXX", colSpan: 1 },
        { name: "product", label: "Produktname (optional)", type: "text", placeholder: "z. B. Produkt XY", colSpan: 2 },
        {
          name: "reason",
          label: "Ablehnungsgrund laut Amazon",
          type: "select",
          required: true,
          colSpan: 2,
          options: [
            { value: "lesbarkeit", label: "Code/Seriennummer nicht lesbar" },
            { value: "falscherCode", label: "Code ungültig / gehört nicht zum Produkt" },
            { value: "platzierung", label: "Platzierung des Codes beanstandet" },
            { value: "bildqualitaet", label: "Bildqualität / Belichtung / Auflösung" },
            { value: "nichtgescannt", label: "Code konnte nicht gescannt werden" },
            { value: "format", label: "Datei-/Formatanforderungen" },
            { value: "sonstiges", label: "Sonstiges / unklar" },
          ],
        },
      ],
    },
    {
      title: "Code- & Upload-Details",
      subtitle: "Macht den Widerspruch konkret.",
      fields: [
        { name: "code", label: "Betroffener Transparency-Code (optional)", type: "text", placeholder: "z. B. AZ:1234...", colSpan: 2 },
        { name: "count", label: "Wie oft bereits abgelehnt? (optional)", type: "text", placeholder: "z. B. 3", colSpan: 1 },
      ],
    },
    {
      title: "Ergänzende Argumente (optional)",
      subtitle: "Eigene Punkte – pro Zeile einer.",
      fields: [
        {
          name: "extra",
          label: "Zusätzliche Nachweise / Argumente",
          type: "textarea",
          colSpan: 2,
          placeholder:
            "z. B.\nScan mit der Transparency-App im Video dokumentiert\nFotos aus drei Winkeln liegen vor",
          help: "Leer lassen ist okay.",
        },
      ],
    },
  ],
  generate,
  seoSections: [
    {
      heading: "Transparency-Code-Upload wird ständig abgelehnt – woran liegt das?",
      body: [
        "Im Amazon-Transparency-Programm musst du häufig Fotos der aufgebrachten Codes bzw. Seriennummern hochladen. Diese werden teils automatisiert geprüft – und dabei abgelehnt, obwohl der Code real einwandfrei lesbar und scanbar ist. Typische angebliche Gründe: „nicht lesbar“, „konnte nicht gescannt werden“, „falscher Code“ oder Beanstandungen zu Bildqualität und Platzierung.",
        "In vielen Fällen ist nicht der Code das Problem, sondern die automatische Bildverarbeitung. Ein sachlicher Widerspruch mit der Bitte um manuelle Prüfung und dem Angebot zusätzlicher Aufnahmen führt oft zur Freigabe.",
      ],
    },
    {
      heading: "So erstellst du ein Foto, das durchgeht",
      body: [
        "Vollständiger Code mittig im Bild, scharf und in hoher Auflösung. Gleichmäßiges Licht ohne Blitz und ohne Spiegelungen. Aufnahme an einer ebenen Stelle (nicht gewölbt), mit etwas Abstand statt extremer Nahaufnahme, und ohne Überlappung mit Barcode/EAN.",
        "Lade ein gängiges Bildformat in voller Größe hoch (kein starker Beschnitt, keine starke Komprimierung). Wenn der automatische Scan scheitert, hilft ein zweites Foto aus leicht anderem Winkel – und im Widerspruch der Hinweis, dass der Code mit der Transparency-App reproduzierbar scanbar ist.",
      ],
    },
    {
      heading: "Was in den Widerspruch gehört",
      body: [
        "Stelle klar, dass die Aufnahme die Anforderungen erfüllt, gehe gezielt auf den genannten Grund ein und bitte ausdrücklich um eine manuelle Prüfung. Biete zusätzliche Fotos aus mehreren Winkeln oder ein kurzes Scan-Video an – das signalisiert Kooperationsbereitschaft und beschleunigt die Freigabe.",
        "Bleibt die Ablehnung unklar, bitte um die konkrete, nicht erfüllte Anforderung (Code-Quelle, Platzierung, Format), statt blind ein weiteres Mal hochzuladen.",
      ],
    },
  ],
  seo: {
    title: "Amazon Transparency Seriennummer-Upload abgelehnt – Widerspruch | GründerX",
    description:
      "Transparency-Code/Seriennummer-Foto wird ständig abgelehnt, obwohl es passt? Erstelle kostenlos einen sachlichen Widerspruch mit Bitte um manuelle Prüfung. Vorlage in Minuten.",
    keywords:
      "amazon transparency code abgelehnt, transparency seriennummer upload abgelehnt, amazon transparency bild abgelehnt, transparency code nicht lesbar, amazon transparency widerspruch, transparency code scan fehlgeschlagen",
    faqs: [
      {
        q: "Mein Transparency-Code wird abgelehnt, obwohl er lesbar ist – was tun?",
        a: "Lege Widerspruch ein und bitte ausdrücklich um eine manuelle Prüfung. Häufig scheitert nur der automatische Scan, nicht der Code selbst. Biete zusätzliche Fotos aus mehreren Winkeln oder ein kurzes Scan-Video an – der Generator baut das ein.",
      },
      {
        q: "Wie sollte das Foto aussehen?",
        a: "Vollständiger Code mittig, scharf, hohe Auflösung, gleichmäßiges Licht ohne Blitzreflexe, ebene Fläche, gängiges Bildformat ohne starken Beschnitt. So entsprichst du den üblichen Transparency-Anforderungen.",
      },
      {
        q: "Ist der Generator kostenlos?",
        a: "Ja. Erstellung und Download sind kostenlos – du legst nur ein kostenloses GründerX-Konto an, um die fertige Vorlage freizuschalten.",
      },
      {
        q: "Garantiert der Widerspruch die Freigabe?",
        a: "Nein, die Entscheidung trifft Amazon. Ein sachlicher Widerspruch mit Bitte um manuelle Prüfung erhöht die Chance aber deutlich.",
      },
    ],
  },
};
