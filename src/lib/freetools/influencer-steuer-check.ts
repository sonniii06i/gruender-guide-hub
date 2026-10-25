import { Sparkles } from "lucide-react";
import { type ToolConfig, type ToolData, s, b, DISCLAIMER, zahl } from "./types";

// Influencer-Steuer-Check (25.10.2026): Pflichten-Fahrplan für Creator.
// Alle Regeln aus dem Leitfaden des Finanzamts Hessen (Stand Juni 2026),
// § 19 UStG, § 11 Abs. 1 Nr. 1 GewStG und § 32a EStG (Grundfreibetrag 2026).
const HESSEN =
  "https://finanzamt.hessen.de/sites/finanzamt.hessen.de/files/2026-07/leitfaden_zur_besteuerung_von_influencerinnen_und_influencern.pdf";
const GRUNDFREIBETRAG = 12348;
const KU_VORJAHR = 25000;
const KU_LAUFEND = 100000;
const GEWST_FREIBETRAG = 24500;

const euro = (n: number) => n.toLocaleString("de-DE", { maximumFractionDigits: 0 }) + " €";

const QUELLEN: Record<string, string> = {
  werbung: "Werbeeinnahmen (bezahlte Posts, Stories, Platzierungen)",
  affiliate: "Affiliate-Provisionen (auch TikTok-Shop-Showcase und LIVE)",
  plattform: "Plattform-Geld (Creator Rewards, Abos, Subs)",
  samples: "Gratis-Produkte, die du nach der Werbung behalten darfst",
  dienste: "Gratis-Dienstleistungen gegen Werbung (z. B. Hotelnächte)",
  ugc: "UGC-Videos für Marken",
};

function generate(d: ToolData): string {
  const quellen = Object.keys(QUELLEN).filter((k) => b(d, `q_${k}`));
  const umsatzJahr = zahl(s(d, "umsatz"));
  const vorjahr = zahl(s(d, "vorjahr"));
  const gewinn = zahl(s(d, "gewinn"));
  const angemeldet = s(d, "angemeldet", "nein");
  const startjahr = s(d, "startjahr", "ja") === "ja";
  const minderjaehrig = s(d, "alter") === "u18";
  const andereEinkuenfte = s(d, "job") === "ja";

  const L: string[] = [];
  L.push("Dein Influencer-Steuer-Fahrplan");
  L.push("");

  L.push("1. Ist das schon eine steuerlich relevante Tätigkeit?");
  if (quellen.length === 0) {
    L.push("Du hast keine Einnahmequelle angekreuzt. Sobald eine der folgenden dazukommt, gilt der Fahrplan unten.");
    Object.values(QUELLEN).forEach((q) => L.push(`  - ${q}`));
  } else {
    L.push("Laut Finanzverwaltung zählen diese deiner Einnahmen als Betriebseinnahmen:");
    quellen.forEach((k) => L.push(`  - ${QUELLEN[k]}`));
    L.push(
      "Wer regelmäßig damit Geld verdient, erzielt in der Regel Einkünfte aus Gewerbebetrieb. Für die Umsatzsteuer reicht schon, " +
        "dass du nachhaltig Einnahmen erzielst – ob du Gewinn machen willst, spielt dort keine Rolle.",
    );
  }
  if (b(d, "q_samples")) {
    L.push(
      "PR-Samples: Den Wert setzt du mit dem üblichen Endpreis abzüglich üblicher Rabatte an. Nutzt du das Produkt danach privat weiter, " +
        "ist das eine Entnahme. Musst du es zurückschicken, ist es keine Einnahme. Tipp: Werte mit dem kostenlosen PR-Paket-Rechner erfassen (/pr-paket-rechner).",
    );
  }
  L.push("");

  L.push("2. Deine nächsten Schritte");
  let n = 1;
  if (minderjaehrig) {
    L.push(
      `${n++}. Du bist unter 18: Für ein eigenes Gewerbe brauchst du die Zustimmung deiner Eltern und eine Genehmigung des Familiengerichts (§ 112 BGB). ` +
        "TikTok Shop selbst setzt ein Mindestalter von 18 Jahren voraus.",
    );
  }
  if (angemeldet !== "ja") {
    L.push(`${n++}. Gewerbe beim örtlichen Gewerbeamt anmelden – zeitnah, bevor oder sobald du startest.`);
    L.push(
      `${n++}. Fragebogen zur steuerlichen Erfassung über ELSTER abgeben – innerhalb eines Monats nach Beginn deiner Tätigkeit. ` +
        "Danach bekommst du deine Steuernummer.",
    );
  } else {
    L.push(`${n++}. Gewerbe und Steuernummer hast du schon – prüfe, ob deine Tätigkeitsbeschreibung alle Einnahmearten abdeckt (z. B. Affiliate, Verkauf).`);
  }
  L.push(`${n++}. Ab dem ersten Euro alle Einnahmen und Ausgaben einzeln aufzeichnen und Belege aufbewahren (auch Gutschriften von Agenturen und Plattformen).`);
  L.push("");

  L.push("3. Umsatzsteuer: Kleinunternehmer oder nicht?");
  const grenzeJetzt = startjahr ? KU_VORJAHR : KU_LAUFEND;
  const vorjahrOk = startjahr || vorjahr <= KU_VORJAHR;
  if (vorjahrOk && umsatzJahr <= grenzeJetzt) {
    L.push(
      `Mit ${umsatzJahr ? `rund ${euro(umsatzJahr)} Umsatz` : "deinen Angaben"} kannst du die Kleinunternehmerregelung (§ 19 UStG) nutzen: ` +
        "keine Umsatzsteuer auf Rechnungen, keine Voranmeldungen – aber auch kein Vorsteuerabzug.",
    );
  } else {
    L.push(
      "Du liegst über der Kleinunternehmergrenze. Dann gilt die Regelbesteuerung: meist 19 % Umsatzsteuer auf deine Leistungen, " +
        "Umsatzsteuer-Voranmeldungen über ELSTER, dafür Vorsteuerabzug aus deinen Einkäufen.",
    );
  }
  L.push(
    startjahr
      ? `Im ersten Jahr gilt: höchstens ${euro(KU_VORJAHR)} Umsatz.`
      : `Grenze: Vorjahr höchstens ${euro(KU_VORJAHR)} und laufendes Jahr höchstens ${euro(KU_LAUFEND)} Umsatz.`,
  );
  L.push("Auf die Regelung kannst du auch freiwillig verzichten – das kann sich lohnen, wenn du viel Technik kaufst oder fast nur an Unternehmen leistest.");
  L.push("");

  L.push("4. Einkommensteuer");
  L.push(
    `Steuer zahlst du nur auf den Gewinn (Einnahmen minus Betriebsausgaben). Der Grundfreibetrag 2026 liegt bei ${euro(GRUNDFREIBETRAG)} – ` +
      "er gilt für dein gesamtes zu versteuerndes Einkommen, nicht nur für das Creator-Geld.",
  );
  if (andereEinkuenfte) {
    L.push("Du hast zusätzlich einen Job: Dein Lohn verbraucht den Grundfreibetrag meist schon – dann wird dein Creator-Gewinn vom ersten Euro an besteuert.");
  }
  if (gewinn > 0 && !andereEinkuenfte && gewinn <= GRUNDFREIBETRAG) {
    L.push(`Mit rund ${euro(gewinn)} Gewinn und ohne weitere Einkünfte bleibst du voraussichtlich unter dem Grundfreibetrag.`);
  }
  L.push("Die Steuererklärung gibst du elektronisch ab: Einkommensteuererklärung mit Anlage G und Anlage EÜR.");
  L.push("");

  L.push("5. Gewerbesteuer");
  if (gewinn > GEWST_FREIBETRAG) {
    L.push(
      `Mit rund ${euro(gewinn)} Gewinn liegst du über dem Freibetrag von ${euro(GEWST_FREIBETRAG)}. Dann fällt Gewerbesteuer an und du gibst eine Gewerbesteuererklärung ab. ` +
        "Sie wird teilweise auf deine Einkommensteuer angerechnet.",
    );
  } else {
    L.push(`Gewerbesteuer zahlst du erst, wenn dein Gewerbeertrag über ${euro(GEWST_FREIBETRAG)} liegt.`);
  }
  L.push("");

  L.push("6. Was du absetzen kannst (Beispiele aus dem Leitfaden)");
  L.push("  - Technik: Kamera, Mikrofon, Laptop, Smartphone, Ringlicht");
  L.push("  - Software und Lizenzen: Schnittprogramm, Cloud, Musiklizenzen");
  L.push("  - Reisen zu Drehs, Events, Kooperationen");
  L.push("  - Studio, Requisiten, Hintergründe");
  L.push("  - Steuerberater, Buchhaltungs-Tools, Cutter, Designer");
  L.push("Teure Anschaffungen (über 800 € netto) verteilst du über die Nutzungsdauer; private Mitnutzung teilst du anteilig auf.");
  L.push("");

  L.push("7. Warum jetzt");
  L.push(
    "Die Finanzverwaltung schreibt selbst, dass soziale Medien zunehmend in ihren Fokus geraten – per Internetrecherche und Auskunftsersuchen an deine Geschäftspartner. " +
      "Wer Pflichten verpasst, riskiert Nachzahlung und Zinsen.",
  );
  L.push("");
  L.push(`Quelle: Finanzamt Hessen, Leitfaden zur Besteuerung von Influencerinnen und Influencern (Juni 2026): ${HESSEN}`);
  L.push("");
  L.push(DISCLAIMER);
  return L.join("\n");
}

export const influencerSteuerCheckConfig: ToolConfig = {
  slug: "influencer-steuer-check",
  shortTitle: "Influencer-Steuer-Check",
  documentName: "Influencer-Steuer-Fahrplan",
  icon: Sparkles,
  accent: "from-pink-500 to-rose-600",
  badge: "Für Creator & Influencer",
  heroTitle: "Influencer-Steuer-Check: Brauche ich ein Gewerbe?",
  heroSubtitle:
    "Kreuze an, womit du Geld verdienst – du bekommst deinen persönlichen Fahrplan: Gewerbe, Fragebogen, Kleinunternehmer, Einkommen- und Gewerbesteuer. Nach den Regeln der Finanzverwaltung (Stand 2026). 1 kostenloser Check, nur E-Mail nötig.",
  resultFilename: "influencer-steuer-fahrplan",
  steps: [
    {
      title: "Womit verdienst du Geld?",
      subtitle: "Alles ankreuzen, was zutrifft – auch kleine Beträge.",
      fields: [
        { name: "q_werbung", label: QUELLEN.werbung, type: "checkbox" },
        { name: "q_affiliate", label: QUELLEN.affiliate, type: "checkbox" },
        { name: "q_plattform", label: QUELLEN.plattform, type: "checkbox" },
        { name: "q_samples", label: QUELLEN.samples, type: "checkbox" },
        { name: "q_dienste", label: QUELLEN.dienste, type: "checkbox" },
        { name: "q_ugc", label: QUELLEN.ugc, type: "checkbox" },
      ],
    },
    {
      title: "Dein Stand",
      fields: [
        {
          name: "angemeldet",
          label: "Hast du schon ein Gewerbe und eine Steuernummer?",
          type: "radio",
          required: true,
          options: [
            { value: "nein", label: "Nein" },
            { value: "ja", label: "Ja" },
            { value: "unsicher", label: "Weiß ich nicht" },
          ],
        },
        {
          name: "alter",
          label: "Wie alt bist du?",
          type: "radio",
          required: true,
          options: [
            { value: "u18", label: "Unter 18" },
            { value: "18", label: "18 oder älter" },
          ],
        },
        {
          name: "job",
          label: "Hast du zusätzlich einen Job oder andere Einkünfte?",
          type: "radio",
          options: [
            { value: "ja", label: "Ja" },
            { value: "nein", label: "Nein" },
          ],
        },
        {
          name: "startjahr",
          label: "Ist das dein erstes Jahr mit Einnahmen?",
          type: "radio",
          options: [
            { value: "ja", label: "Ja" },
            { value: "nein", label: "Nein" },
          ],
        },
      ],
    },
    {
      title: "Deine Zahlen (Schätzung reicht)",
      subtitle: "Leer lassen, wenn du es nicht weißt – der Fahrplan erklärt dann die Grenzen.",
      fields: [
        { name: "umsatz", label: "Erwartete Einnahmen dieses Jahr (€)", type: "text", placeholder: "z. B. 6000", colSpan: 1 },
        { name: "gewinn", label: "Davon Gewinn nach Ausgaben (€)", type: "text", placeholder: "z. B. 4000", colSpan: 1 },
        {
          name: "vorjahr",
          label: "Einnahmen im Vorjahr (€)",
          type: "text",
          placeholder: "z. B. 12000",
          colSpan: 1,
          condition: (d) => d.startjahr === "nein",
        },
      ],
    },
  ],
  generate,
  seoSections: [
    {
      heading: "Muss ich als Influencer ein Gewerbe anmelden?",
      body: [
        "Laut Finanzverwaltung erzielen Influencer, die regelmäßig mit Werbung, Affiliate-Links oder Plattform-Programmen Geld verdienen, in der Regel Einkünfte aus Gewerbebetrieb. Dann meldest du beim Gewerbeamt ein Gewerbe an und gibst innerhalb eines Monats den Fragebogen zur steuerlichen Erfassung über ELSTER ab.",
        "Eine Mindestgrenze für die Anmeldung gibt es nicht. Ob du am Ende Steuern zahlst, ist eine zweite Frage – sie hängt vom Gewinn, vom Grundfreibetrag und von deinen anderen Einkünften ab.",
      ],
    },
    {
      heading: "Zählen PR-Pakete und Gratis-Reisen als Einnahme?",
      body: [
        "Ja, wenn du ein Produkt nach der Werbung behalten darfst. Angesetzt wird der übliche Endpreis abzüglich üblicher Preisnachlässe. Auch Gratis-Dienstleistungen gegen Werbung, etwa Hotelübernachtungen, zählen mit ihrem regulären Wert. Musst du ein Produkt zurückschicken, ist es keine Einnahme.",
      ],
    },
    {
      heading: "Kleinunternehmer, Einkommensteuer, Gewerbesteuer – was gilt 2026?",
      body: [
        "Kleinunternehmer bist du, wenn dein Umsatz im Vorjahr höchstens 25.000 € betrug und im laufenden Jahr 100.000 € nicht übersteigt; im ersten Jahr zählt die Grenze von 25.000 €. Einkommensteuer zahlst du auf den Gewinn, der Grundfreibetrag liegt 2026 bei 12.348 €. Gewerbesteuer fällt erst an, wenn der Gewerbeertrag 24.500 € übersteigt.",
      ],
    },
  ],
  seo: {
    title: "Influencer Steuer-Check 2026 – Gewerbe nötig? | GründerX",
    description:
      "Brauche ich als Influencer ein Gewerbe? Gratis-Check: Gewerbe, Fragebogen, Kleinunternehmer, Einkommen- & Gewerbesteuer – nach Regeln der Finanzverwaltung.",
    keywords:
      "influencer steuern, influencer gewerbe anmelden, tiktok geld versteuern, creator steuern, pr pakete versteuern, influencer kleinunternehmer",
    faqs: [
      {
        q: "Ab wann muss ich als Influencer Steuern zahlen?",
        a: "Einkommensteuer fällt auf den Gewinn an, wenn dein gesamtes zu versteuerndes Einkommen über dem Grundfreibetrag liegt (2026: 12.348 €). Hast du zusätzlich einen Job, ist der Freibetrag meist schon verbraucht. Anmelden musst du die Tätigkeit unabhängig davon.",
      },
      {
        q: "Brauche ich für TikTok-Geld ein Gewerbe?",
        a: "Wer regelmäßig über Creator-Programme, Kooperationen oder Affiliate-Provisionen verdient, erzielt laut Finanzverwaltung in der Regel gewerbliche Einkünfte. Dann meldest du ein Gewerbe an und gibst den Fragebogen zur steuerlichen Erfassung ab.",
      },
      {
        q: "Muss ich PR-Pakete versteuern?",
        a: "Ja, wenn du sie nach der Werbung behalten darfst – mit dem üblichen Endpreis abzüglich üblicher Rabatte. Zurückgeschickte Produkte sind keine Einnahme.",
      },
      {
        q: "Ist der Check kostenlos?",
        a: "Ein Check ist kostenlos: E-Mail angeben, Fahrplan samt PDF erhalten – ohne Konto und ohne Zahlung. Weitere Checks und alle Tools gibt es im GründerX-Abo.",
      },
    ],
  },
};
