import { ScanLine } from "lucide-react";
import { type ToolConfig, type ToolData, s, DISCLAIMER } from "./types";

// Widerspruch gegen abgelehnte Seriennummern- bzw. Transparency-Code-Uploads im
// Amazon-Transparency-Programm. Fakten Stand 2026:
//  - Zum Listen einer Transparency-ASIN genügt 1 gültiger Code ODER 1 Seriennummer.
//  - Zulässige Formate: Transparency-Code (alphanumerisch, beginnt mit AZ/ZA, 29 Zeichen,
//    2D-Code mit „T“-Logo), SGTIN (38 Zeichen) oder Seriennummer (7–20 Zeichen, oft „SN“).
//  - Code/Seriennummer nicht-sequenziell, auf derselben Verpackungsseite wie der GTIN.

const REASON_LABEL: Record<string, string> = {
  fehlend_trotz: "Code/Seriennummer fehle – obwohl vorhanden und übermittelt",
  lesbarkeit: "Code/Seriennummer sei nicht lesbar",
  nichtgescannt: "Code/Seriennummer konnte angeblich nicht erfasst/gescannt werden",
  falscherCode: "Code/Seriennummer sei ungültig oder gehöre nicht zum Produkt",
  format_code: "Format des Codes / der Seriennummer wird nicht akzeptiert",
  platzierung: "Platzierung auf Produkt/Verpackung wurde beanstandet",
  bildqualitaet: "Bildqualität / Belichtung / Auflösung wurde beanstandet",
  format: "Datei-/Bildformat (Datei) wurde beanstandet",
  keine_codes: "Noch keine gültigen Codes/Seriennummern – Bezug erforderlich",
  sonstiges: "Sonstiger / unklarer Ablehnungsgrund",
};

// Pluralform der Kennzeichnung – nimmt einheitlich "die … sind", löst das
// Genus-Problem (der Code / die Seriennummer) sauber auf.
const NACHWEIS_PL: Record<string, string> = {
  codes: "Transparency-Codes",
  seriennummern: "Seriennummern",
  beides: "Transparency-Codes bzw. Seriennummern",
};

// Zulässige Formate laut Amazon – einmal zentral, mehrfach genutzt.
const FORMAT_SPEC =
  "Transparency-Code (alphanumerisch, beginnt mit AZ oder ZA, 29 Zeichen, 2D-Code mit „T“-Logo), " +
  "SGTIN (38 Zeichen) oder Seriennummer (7–20 Zeichen, häufig mit Präfix „SN“)";

function bullets(text: string): string[] {
  return text
    .split(/\n+/)
    .map((l) => l.trim().replace(/^[-•*]\s*/, ""))
    .filter(Boolean)
    .map((l) => `   • ${l}`);
}

function reasonArgument(data: ToolData): string[] {
  const reason = s(data, "reason", "fehlend_trotz");
  const code = s(data, "code");
  const pl = NACHWEIS_PL[s(data, "nachweis", "codes")] || NACHWEIS_PL.codes;

  const L: string[] = [];

  if (reason === "fehlend_trotz") {
    L.push(
      `Wir widersprechen der Einschätzung, dass die erforderlichen ${pl} fehlen. Die ${pl} sind physisch auf den ` +
        "Produkteinheiten aufgebracht und wurden im Rahmen der Anmeldung bereits übermittelt."
    );
    L.push(
      `Es liegt daher kein fehlender Wert vor, sondern offenbar ein Erfassungs- bzw. Verarbeitungsfehler im ` +
        `automatischen Prüfprozess. Die ${pl} sind gültig und einwandfrei lesbar. Zum Listen dieser ASIN genügt ` +
        "nach den Programmvorgaben bereits 1 gültiger Code bzw. 1 gültige Seriennummer."
    );
    L.push(
      `Zur Bestätigung stellen wir die betroffenen ${pl}, ein Foto der aufgebrachten Kennzeichnung sowie den ` +
        "Bezugsnachweis (Rechnung des autorisierten Lieferanten) bereit. Wir bitten ausdrücklich um eine manuelle " +
        `Prüfung und um Eskalation an das zuständige Transparency-Team, da die ${pl} nachweislich vorhanden und ` +
        "eingereicht sind."
    );
  } else if (reason === "lesbarkeit") {
    L.push(
      `Die aufgebrachten ${pl} sind vollständig und scharf abgebildet. Der jeweilige Bereich liegt innerhalb des ` +
        "Bildausschnitts, ist gleichmäßig ausgeleuchtet und frei von Spiegelungen, Unschärfe, Schatten oder Verdeckungen."
    );
    L.push(
      `Für die erneute Einreichung haben wir die Aufnahmen in höherer Auflösung und mit erhöhtem Kontrast erstellt. ` +
        `Die ${pl} sind klar lesbar; Transparency-Codes sind zudem mit der Amazon-Transparency-App reproduzierbar scanbar.`
    );
    L.push(
      "Gern liefern wir ergänzend Nahaufnahmen (Makro) sowie ein Übersichtsfoto im Produktkontext und bitten um eine " +
        "manuelle Prüfung des Uploads."
    );
  } else if (reason === "nichtgescannt") {
    L.push(
      `Die ${pl} sind technisch einwandfrei und in unseren Tests reproduzierbar erfassbar (Transparency-Codes mit der ` +
        "Amazon-Transparency-App scanbar). Ein fehlgeschlagener automatischer Scan ist daher auf die Bildverarbeitung " +
        "im Prüfprozess zurückzuführen, nicht auf die Kennzeichnung selbst."
    );
    L.push(
      "Zur Bestätigung liefern wir gern zusätzliche Aufnahmen aus verschiedenen Winkeln und in höherer Auflösung."
    );
    L.push(
      "Wir bitten ausdrücklich um eine manuelle Prüfung des hochgeladenen Bildes und um Freigabe auf dieser Grundlage."
    );
  } else if (reason === "falscherCode") {
    L.push(
      `Die eingereichten ${pl}` + (code ? ` (z. B. ${code})` : "") + " stammen aus dem offiziell von Amazon " +
        "Transparency für dieses Produkt bereitgestellten bzw. autorisierten Kontingent und gehören eindeutig zur " +
        "betreffenden ASIN/Einheit."
    );
    L.push(
      `Sie entsprechen einem zulässigen Format (${FORMAT_SPEC}). Zum Listen genügt 1 gültiger Wert. Wir bitten um ` +
        "Abgleich mit dem für unser Konto hinterlegten Transparency-Bestand; gern nennen wir die zugehörige Charge " +
        "bzw. Quelle sowie die GTIN des Produkts zur eindeutigen Zuordnung."
    );
    L.push(
      "Sollte die automatische Zuordnung fehlschlagen, bitten wir um Nennung des erwarteten Formats bzw. der korrekten " +
        "Quelle – möglicherweise wurde ein Wert aus einer anderen Charge erfasst. Das korrigieren wir umgehend."
    );
  } else if (reason === "format_code") {
    L.push(
      `Die von uns eingereichten ${pl} entsprechen den zulässigen Transparency-Formaten: ${FORMAT_SPEC}.`
    );
    L.push(
      "Die Werte sind nicht-sequenziell und auf derselben Verpackungsseite wie der GTIN angebracht. Damit erfüllen sie " +
        "die Programmvorgaben für gültige Kennzeichnungen."
    );
    L.push(
      "Sollte für diese ASIN ein bestimmtes der zulässigen Formate erwartet werden, bitten wir um einen konkreten " +
        "Hinweis. Wir übermitteln den Wert umgehend in exakt der geforderten Schreibweise."
    );
  } else if (reason === "platzierung") {
    L.push(
      `Die ${pl} sind gut sichtbar und dauerhaft auf der Produktverpackung bzw. dem Etikett angebracht – auf derselben ` +
        "Seite wie der GTIN, an einer ebenen, nicht gewölbten Stelle und ohne Überlappung mit anderen Codes (z. B. " +
        "Barcode/EAN) oder Designelementen."
    );
    L.push(
      "Gern liefern wir zusätzlich ein Foto, das die Kennzeichnung im Gesamtkontext der Verpackung zeigt, sowie eine " +
        "Nahaufnahme, damit Platzierung und Lesbarkeit eindeutig nachvollziehbar sind."
    );
    L.push(
      "Falls eine bestimmte Platzierung gefordert ist, bitten wir um einen konkreten Hinweis (Position/Fläche). Wir " +
        "passen die Anbringung umgehend an und reichen ein neues Foto ein."
    );
  } else if (reason === "bildqualitaet") {
    L.push(
      `Wir reichen neue Fotos in hoher Auflösung ein: scharf, gleichmäßig ausgeleuchtet, ohne Blitzreflexe und ohne ` +
        `Bewegungsunschärfe, mit den vollständigen ${pl} mittig im Bild und in ausreichendem Abstand aufgenommen.`
    );
    L.push(
      `Die Aufnahmen erfolgen vor neutralem Hintergrund bei Tageslicht, um Reflexionen und Farbstiche zu vermeiden. ` +
        `Die ${pl} sind damit eindeutig erfassbar.`
    );
    L.push(
      "Bitte bestätigen Sie die geforderten Mindestanforderungen (z. B. Auflösung/Format), damit der erneute Upload " +
        "sofort akzeptiert werden kann."
    );
  } else if (reason === "format") {
    L.push(
      "Wir laden die Dateien gern im geforderten Format erneut hoch: gängiges Bildformat (z. B. JPG/PNG), ausreichende " +
        "Auflösung, ohne Komprimierungsartefakte, vollständiger Bildausschnitt und nur eine Kennzeichnung pro Bild."
    );
    L.push(
      "Sollte eine bestimmte Dateigröße, ein Seitenverhältnis oder ein Dateityp vorgeschrieben sein, passen wir die " +
        "Aufnahmen exakt daran an."
    );
    L.push("Bitte bestätigen Sie das bevorzugte Datei- und Bildformat für einen sofort akzeptierten Upload.");
  } else if (reason === "keine_codes") {
    L.push(
      `Wir beziehen die Ware aus autorisierter Quelle und beschaffen aktuell gültige ${pl} über die Marke bzw. den ` +
        "Hersteller oder unseren autorisierten Lieferanten."
    );
    L.push(
      "Zum Listen dieser ASIN genügt nach den Programmvorgaben die Übermittlung 1 gültigen Codes bzw. 1 gültigen " +
        `Seriennummer. Bitte bestätigen Sie, ob ein einzelner gültiger Wert für die Freigabe ausreicht und in welchem ` +
        `der zulässigen Formate (${FORMAT_SPEC}) dieser einzureichen ist.`
    );
    L.push(
      `Sobald uns die ${pl} vorliegen, reichen wir sie umgehend nach. Für Rückfragen stehen wir jederzeit zur Verfügung.`
    );
  } else {
    L.push(
      "Wir bitten höflich um eine konkrete Begründung, welche Anforderung als nicht erfüllt bewertet wurde, sowie um " +
        "Nennung der genauen Vorgaben (Quelle, Platzierung, Bild- bzw. Dateiformat)."
    );
    L.push(
      `Proaktiv liefern wir bereits mehrere Aufnahmen der ${pl} aus unterschiedlichen Winkeln und in hoher Auflösung.`
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
  const reason = s(data, "reason", "fehlend_trotz");
  const count = s(data, "count");
  const extra = s(data, "extra");
  const pl = NACHWEIS_PL[s(data, "nachweis", "codes")] || NACHWEIS_PL.codes;

  const L: string[] = [];
  L.push("Widerspruch: Abgelehnte(r) Seriennummern-/Code-Upload (Amazon Transparency)");
  L.push("");
  if (store) L.push(`Verkäufer / Shop: ${store}`);
  if (product) L.push(`Produkt: ${product}`);
  if (asin) L.push(`ASIN: ${asin}`);
  L.push(`Art des Nachweises: ${pl}`);
  if (code) L.push(`Betroffene(r) Code / Seriennummer(n): ${code}`);
  L.push(`Ablehnungsgrund laut Amazon: ${REASON_LABEL[reason] || REASON_LABEL.sonstiges}`);
  if (count) L.push(`Anzahl bisheriger Ablehnungen: ${count}`);
  L.push("");

  L.push("Sehr geehrtes Transparency-Team,");
  L.push("");
  L.push(
    `wir beziehen uns auf die Ablehnung unseres Nachweises (${pl}) im Rahmen des Transparency-Programms für die ` +
      "Listung der oben genannten ASIN. Nach erneuter Prüfung sind wir überzeugt, dass die Einreichung die " +
      "Anforderungen erfüllt, und bitten um eine erneute – idealerweise manuelle – Bewertung."
  );
  L.push("");

  L.push("1. Stellungnahme zum Ablehnungsgrund");
  reasonArgument(data).forEach((p) => {
    L.push(p);
    L.push("");
  });

  L.push("2. Erfüllte Anforderungen");
  L.push("Die eingereichten Nachweise erfüllen die Transparency-Programmvorgaben:");
  L.push(`   • Gültiges Format: ${FORMAT_SPEC}`);
  L.push("   • Zum Listen genügt 1 gültiger Code bzw. 1 gültige Seriennummer");
  L.push(`   • Vollständige ${pl} im Bildausschnitt, mittig, scharf und gleichmäßig ausgeleuchtet`);
  L.push("   • Dauerhaft auf Produkt/Verpackung angebracht – auf derselben Seite wie der GTIN, nicht-sequenziell");
  L.push("   • Hohe Auflösung, gängiges Bildformat, kein Beschnitt, keine Spiegelungen");
  if (extra) {
    bullets(extra).forEach((b) => L.push(b));
  }
  L.push("");

  L.push("3. Bitte");
  L.push(
    "Wir bitten um eine manuelle Überprüfung des Uploads und um Freigabe der Listung. Sollte eine konkrete " +
      "Anforderung nicht erfüllt sein, bitten wir um einen präzisen Hinweis (z. B. Platzierung, Format, Quelle), damit " +
      "wir umgehend nachbessern können. Gern liefern wir zusätzliche Fotos aus mehreren Winkeln und in höherer " +
      "Auflösung zur Verifizierung."
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
  heroTitle: "Amazon Transparency: Seriennummer/Code-Upload abgelehnt? Widerspruch-Generator",
  heroSubtitle:
    "Dein Upload von Seriennummern oder Transparency-Codes wird abgelehnt – obwohl die Kennzeichnung auf dem Produkt ist und bereits übermittelt wurde? Erstelle in Minuten einen sachlichen, faktenbasierten Widerspruch nach den Transparency-Vorgaben (gültige Formate, manuelle Prüfung). Kostenlos, nur ein kostenloses Konto nötig.",
  resultFilename: "amazon-transparency-widerspruch",
  steps: [
    {
      title: "Konto, Produkt & Ablehnungsgrund",
      subtitle: "Worum geht es – und was steht in der Ablehnung?",
      fields: [
        { name: "store", label: "Shop- / Verkäufername", type: "text", placeholder: "z. B. MeinShop", colSpan: 1 },
        { name: "asin", label: "ASIN (optional)", type: "text", placeholder: "z. B. B07W4MY7HL", colSpan: 1 },
        { name: "product", label: "Produktname (optional)", type: "text", placeholder: "z. B. Produkt XY", colSpan: 2 },
        {
          name: "nachweis",
          label: "Was verlangt Amazon bzw. hast du hochgeladen?",
          type: "select",
          required: true,
          colSpan: 2,
          options: [
            { value: "codes", label: "Transparency-Codes" },
            { value: "seriennummern", label: "Seriennummern" },
            { value: "beides", label: "Beides (Codes & Seriennummern)" },
          ],
        },
        {
          name: "reason",
          label: "Ablehnungsgrund laut Amazon",
          type: "select",
          required: true,
          colSpan: 2,
          options: [
            { value: "fehlend_trotz", label: "Fehle angeblich – obwohl vorhanden & übermittelt" },
            { value: "lesbarkeit", label: "Nicht lesbar" },
            { value: "nichtgescannt", label: "Konnte nicht gescannt/erfasst werden" },
            { value: "falscherCode", label: "Ungültig / gehört nicht zum Produkt" },
            { value: "format_code", label: "Format des Codes/der Seriennummer abgelehnt" },
            { value: "platzierung", label: "Platzierung beanstandet" },
            { value: "bildqualitaet", label: "Bildqualität / Belichtung / Auflösung" },
            { value: "format", label: "Datei-/Bildformat (Upload-Datei)" },
            { value: "keine_codes", label: "Noch keine gültigen Codes (Bezug nötig)" },
            { value: "sonstiges", label: "Sonstiges / unklar" },
          ],
        },
      ],
    },
    {
      title: "Code-/Seriennummer- & Upload-Details",
      subtitle: "Macht den Widerspruch konkret.",
      fields: [
        {
          name: "code",
          label: "Betroffene(r) Code / Seriennummer(n) (optional)",
          type: "text",
          placeholder: "z. B. AZ1234... oder SN0099887766",
          colSpan: 2,
          help: "Zulässig: Transparency-Code (AZ/ZA, 29 Zeichen, „T“-Logo), SGTIN (38 Zeichen) oder Seriennummer (7–20 Zeichen, oft „SN“). 1 gültiger Wert genügt zum Listen.",
        },
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
            "z. B.\nRechnung des autorisierten Lieferanten liegt vor\nFotos aus drei Winkeln vorhanden",
          help: "Leer lassen ist okay.",
        },
      ],
    },
  ],
  generate,
  seoSections: [
    {
      heading: "Transparency-Freischaltung: Seriennummern oder Codes hochladen",
      body: [
        "Für die Freischaltung einer Transparency-geschützten ASIN verlangt Amazon den Nachweis gültiger Kennzeichnungen. Als Wiederverkäufer genügt die Übermittlung von 1 gültigen Transparency-Code oder 1 gültigen Seriennummer. Dieser Nachweis wird teils automatisiert geprüft – und dabei abgelehnt, obwohl die Kennzeichnung real vorhanden, lesbar und bereits übermittelt ist.",
        "In vielen Fällen ist nicht der Code oder die Seriennummer das Problem, sondern die automatische Erfassung im Prüfprozess. Ein sachlicher Widerspruch mit Bitte um manuelle Prüfung – und bei Bedarf um Eskalation – führt dann häufig zur Freigabe.",
      ],
    },
    {
      heading: "Welche Formate akzeptiert Amazon Transparency?",
      body: [
        "Zulässig sind drei Formate: der Transparency-Code (alphanumerisch, beginnt mit AZ oder ZA, insgesamt 29 Zeichen, als 2D-Barcode mit „T“-Logo), die SGTIN (38 Zeichen) oder eine Seriennummer (7–20 Zeichen, häufig mit Präfix „SN“, als 1D- oder 2D-Code).",
        "Die Kennzeichnung muss auf derselben Verpackungsseite wie der GTIN angebracht und nicht-sequenziell sein. Liegt der Wert in einem dieser Formate vor und stammt aus autorisierter Quelle, ist er gültig – eine Ablehnung „ungültig/falsches Format“ lässt sich daher gezielt entkräften.",
      ],
    },
    {
      heading: "„Codes fehlen“ – obwohl sie drauf sind und übermittelt wurden",
      body: [
        "Der häufigste Frust-Fall: Amazon meldet, es fehlten gültige Transparency-Codes bzw. Seriennummern, obwohl diese auf dem Produkt aufgebracht und im Antrag bereits hochgeladen wurden. Hier ist die richtige Reaktion, der Aussage klar zu widersprechen, die Kennzeichnung als vorhanden und eingereicht festzustellen und ausdrücklich eine manuelle Prüfung plus Eskalation an das Transparency-Team zu verlangen.",
        "Hilfreich sind: die konkreten Codes/Seriennummern, ein Foto der aufgebrachten Kennzeichnung und der Bezugsnachweis (Rechnung des autorisierten Lieferanten). Ein bloßer erneuter Upload landet meist im selben Automatik-Loop.",
      ],
    },
  ],
  seo: {
    title: "Amazon Transparency: Seriennummer/Code-Upload abgelehnt – Widerspruch | GründerX",
    description:
      "Transparency-Code oder Seriennummer wird abgelehnt, obwohl vorhanden und übermittelt? Erstelle kostenlos einen faktenbasierten Widerspruch mit Bitte um manuelle Prüfung. Inkl. gültiger Formate. Vorlage in Minuten.",
    keywords:
      "amazon transparency code abgelehnt, transparency seriennummer upload abgelehnt, amazon transparency codes fehlen obwohl vorhanden, transparency freischaltung seriennummer, amazon transparency widerspruch, transparency code format AZ ZA SGTIN, transparency code nicht lesbar",
    faqs: [
      {
        q: "Amazon sagt, Transparency-Codes/Seriennummern fehlen – obwohl sie drauf sind und übermittelt wurden.",
        a: "Widersprich der Aussage klar: Die Kennzeichnung ist vorhanden und wurde eingereicht – das deutet auf einen Erfassungsfehler im Automatik-Prozess hin. Zum Listen genügt 1 gültiger Wert. Bitte ausdrücklich um manuelle Prüfung und Eskalation und lege Codes/Seriennummern, ein Foto der Kennzeichnung und die Lieferantenrechnung bei. Der Generator hat dafür einen eigenen Auswahl-Grund.",
      },
      {
        q: "Welche Code-Formate akzeptiert Amazon Transparency?",
        a: "Transparency-Code (beginnt mit AZ oder ZA, 29 Zeichen, 2D mit „T“-Logo), SGTIN (38 Zeichen) oder Seriennummer (7–20 Zeichen, oft mit „SN“). Zum Listen genügt 1 gültiger Code oder 1 gültige Seriennummer, angebracht auf derselben Seite wie der GTIN.",
      },
      {
        q: "Muss ich Seriennummern oder Transparency-Codes hochladen?",
        a: "Für die Freischaltung verlangt Amazon je nach Produkt entweder gültige Seriennummern oder Transparency-Codes – ein gültiger Wert reicht. Im Generator wählst du aus, worum es geht; der Widerspruch wird entsprechend formuliert.",
      },
      {
        q: "Ist der Generator kostenlos?",
        a: "Ja. Erstellung und Download sind kostenlos – du legst nur ein kostenloses GründerX-Konto an, um die fertige Vorlage freizuschalten.",
      },
    ],
  },
};
