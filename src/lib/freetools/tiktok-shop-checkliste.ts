import { ShoppingBag } from "lucide-react";
import { type ToolConfig, type ToolData, s, b, DISCLAIMER } from "./types";

// TikTok-Shop-Checkliste (25.10.2026): persönliche Reihenfolge der Pflichten vor dem
// ersten Verkauf bzw. der ersten Provision. Belege: TikTok Newsroom 24.03.2026
// (Start DE März 2025, ab 18), TikTok Seller University (gewerbliche Verkäufer ohne Handelsregister:
// Steuernummer + Geschäftsadresse + Ausweis; e.K./GbR: zusätzlich USt-IdNr),
// PStTG § 4 Abs. 5 (Meldung ab 30 Verkäufen oder 2.000 €), VerpackG § 9, ElektroG § 6,
// BattDG, EU-KosmetikVO Art. 13 (CPNP), VO (EG) 852/2004 Art. 6, § 3c UStG (10.000 €).
const TTSU = "https://seller-de.tiktok.com/university/essay?knowledge_id=6339509542340373&lang=de-DE";

function generate(d: ToolData): string {
  const rolle = s(d, "rolle", "haendler"); // haendler | affiliate | beides
  const verkauft = rolle !== "affiliate";
  const u18 = s(d, "alter") === "u18";
  const gewerbe = s(d, "gewerbe") === "ja";
  const form = s(d, "form", "gewerblich"); // gewerblich | ek | gbr | kapital
  const eu = s(d, "eu") === "ja";

  const L: string[] = [];
  L.push("Deine TikTok-Shop-Checkliste");
  L.push(`Rolle: ${rolle === "haendler" ? "Verkäufer:in" : rolle === "affiliate" ? "Creator / Affiliate" : "Verkäufer:in und Creator"}`);
  L.push("");

  if (u18) {
    L.push("STOPP: TikTok Shop setzt ein Mindestalter von 18 Jahren voraus. Bis dahin kannst du keine eigenen Verkäufe oder Provisionen über TikTok Shop abwickeln.");
    L.push("");
  }

  L.push("A. Anmeldung – in dieser Reihenfolge");
  let n = 1;
  if (!gewerbe) {
    L.push(`[ ] ${n++}. Gewerbe beim Gewerbeamt anmelden (Tätigkeit so beschreiben, dass ${verkauft ? "Online-Handel" : "Werbung/Affiliate"}${rolle === "beides" ? " und Werbung/Affiliate" : ""} abgedeckt ist).`);
    L.push(`[ ] ${n++}. Fragebogen zur steuerlichen Erfassung über ELSTER – innerhalb eines Monats nach Beginn. Danach bekommst du deine Steuernummer.`);
  } else {
    L.push(`[x] Gewerbe und Steuernummer vorhanden – prüfe, ob die Tätigkeitsbeschreibung ${verkauft ? "den Online-Handel" : "Affiliate-Einnahmen"} abdeckt.`);
  }
  if (form === "gewerblich") {
    L.push(
      `[ ] ${n++}. Im Seller Center als „gewerbliche:r Verkäufer:in“ registrieren: ohne Handelsregister, mit persönlicher Steuernummer, Geschäftsadresse und Ausweis (Reisepass, Personalausweis oder unbefristeter Aufenthaltstitel – kein Führerschein).`,
    );
  } else if (form === "ek" || form === "gbr") {
    L.push(
      `[ ] ${n++}. USt-IdNr beim Bundeszentralamt für Steuern beantragen (kostenlos) – für ${form === "ek" ? "eingetragene Einzelunternehmer (e.K.)" : "die GbR"} verlangt TikTok sie in Deutschland.${form === "gbr" ? " Dazu Gewerbeanmeldung und eine vertretende Person mit mehr als 25 % Anteil." : " Dazu Handelsregisternummer mit aktivem Status."}`,
    );
  } else {
    L.push(`[ ] ${n++}. Handelsregisternummer, Geschäftsadresse und Identität der vertretenden Person bereithalten (USt-IdNr für Gesellschaften in Deutschland optional).`);
  }
  L.push(`[ ] ${n++}. Separates Geschäftskonto eröffnen – Auszahlungen und Ausgaben sauber trennen.`);
  L.push(`[ ] ${n++}. Kleinunternehmer ja oder nein entscheiden (§ 19 UStG: im ersten Jahr höchstens 25.000 € Umsatz).`);
  L.push("");

  if (verkauft) {
    L.push("B. Produktpflichten – vor dem ersten Listing");
    L.push("[ ] Verpackungsregister LUCID: Wer mit Ware befüllte Verpackungen an Privatkunden verschickt, registriert sich vorher und beteiligt sich an einem dualen System (VerpackG).");
    if (b(d, "p_elektro")) L.push("[ ] Elektrogeräte: Registrierung bei der stiftung ear (WEEE-Nummer) vor dem ersten Angebot (ElektroG).");
    if (b(d, "p_batterie")) L.push("[ ] Batterien/Akkus (auch eingebaut): Registrierung bei der stiftung ear nach Batterierecht.");
    if (b(d, "p_kosmetik")) L.push("[ ] Kosmetik: Meldung im EU-Kosmetikportal CPNP vor dem Inverkehrbringen, Sicherheitsbewertung und verantwortliche Person (EU-Kosmetikverordnung).");
    if (b(d, "p_lebensmittel")) L.push("[ ] Lebensmittel/Nahrungsergänzung: Registrierung als Lebensmittelunternehmen bei der zuständigen Lebensmittelüberwachung.");
    L.push("[ ] Produktsicherheit (GPSR): Hersteller bzw. verantwortliche Person in der EU, Kontaktdaten und Sicherheitsinformationen am Produkt und im Angebot.");
    L.push("");

    L.push("C. Steuern im laufenden Betrieb");
    L.push("[ ] Plattform-Meldung: TikTok meldet Verkäufer ans Bundeszentralamt für Steuern, sobald du 30 Verkäufe oder 2.000 € im Jahr erreichst (PStTG). Deine Umsätze sind dem Finanzamt dann bekannt.");
    if (eu) {
      L.push("[ ] Verkauf an Privatkunden im EU-Ausland: Ab 10.000 € EU-weit im Jahr gilt die Umsatzsteuer des Ziellands – dann OSS-Verfahren beim BZSt nutzen.");
    }
    L.push("[ ] Provisionen an Creator-Affiliates und TikTok-Gebühren als Betriebsausgaben erfassen.");
    L.push("");
  }

  if (rolle !== "haendler") {
    L.push(`${verkauft ? "D" : "B"}. Als Creator / Affiliate`);
    L.push("[ ] Affiliate-Provisionen sind Betriebseinnahmen – auch kleine Beträge aufzeichnen.");
    L.push("[ ] Gratis-Samples, die du nach der Werbung behältst, zählen mit dem üblichen Endpreis abzüglich üblicher Rabatte (Rechner: /pr-paket-rechner).");
    L.push("[ ] Wer wiederholt über Affiliate-Links wirbt, ist umsatzsteuerlich Unternehmer – ob mit Gewinn oder nicht.");
    L.push("[ ] Werbung kennzeichnen.");
    L.push("");
  }

  L.push("Warum sich das lohnt");
  L.push(
    "TikTok Shop läuft in Deutschland seit März 2025. Laut TikTok sind über 25.000 Verkäufer:innen aktiv, und im Schnitt kommen 60 % ihres Umsatzes über shoppable Videos und Live-Shopping. " +
      "Wer sauber angemeldet ist, kann skalieren, ohne dass Konto oder Auszahlung hängen.",
  );
  L.push("");
  L.push(`Quellen: TikTok Newsroom (24.03.2026), TikTok Seller University (${TTSU}), PStTG § 4, VerpackG, ElektroG, § 3c UStG.`);
  L.push("");
  L.push(DISCLAIMER);
  return L.join("\n");
}

export const tiktokShopChecklisteConfig: ToolConfig = {
  slug: "tiktok-shop-checkliste",
  shortTitle: "TikTok-Shop-Checkliste",
  documentName: "TikTok-Shop-Checkliste",
  icon: ShoppingBag,
  accent: "from-slate-800 to-pink-600",
  badge: "Für TikTok-Shop-Verkäufer & Creator",
  heroTitle: "TikTok-Shop-Checkliste: Bist du startklar?",
  heroSubtitle:
    "Sag uns, ob du verkaufst oder als Creator Provisionen verdienst und was du anbietest – du bekommst deine Pflichten in der richtigen Reihenfolge: Gewerbe, Fragebogen, Registrierungsweg, Verpackung, Elektro, Plattform-Meldung. 1 kostenlose Checkliste, nur E-Mail nötig.",
  resultFilename: "tiktok-shop-checkliste",
  steps: [
    {
      title: "Deine Rolle",
      fields: [
        {
          name: "rolle",
          label: "Was willst du im TikTok Shop machen?",
          type: "radio",
          required: true,
          options: [
            { value: "haendler", label: "Eigene Produkte verkaufen" },
            { value: "affiliate", label: "Als Creator Produkte anderer bewerben (Affiliate)" },
            { value: "beides", label: "Beides" },
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
      ],
    },
    {
      title: "Dein Stand",
      fields: [
        {
          name: "gewerbe",
          label: "Gewerbe und Steuernummer vorhanden?",
          type: "radio",
          required: true,
          options: [
            { value: "ja", label: "Ja" },
            { value: "nein", label: "Nein / noch nicht" },
          ],
        },
        {
          name: "form",
          label: "Wie bist du (bzw. willst du) aufgestellt?",
          type: "radio",
          required: true,
          options: [
            { value: "gewerblich", label: "Gewerbe ohne Handelsregister (normales Kleingewerbe)" },
            { value: "ek", label: "Eingetragene:r Kaufmann/-frau (e.K.)" },
            { value: "gbr", label: "GbR" },
            { value: "kapital", label: "UG oder GmbH" },
          ],
        },
      ],
    },
    {
      title: "Deine Produkte",
      subtitle: "Nur relevant, wenn du selbst verkaufst.",
      fields: [
        { name: "p_elektro", label: "Elektrogeräte (alles mit Stecker oder Akku)", type: "checkbox", condition: (d) => d.rolle !== "affiliate" },
        { name: "p_batterie", label: "Batterien oder Akkus (auch eingebaut)", type: "checkbox", condition: (d) => d.rolle !== "affiliate" },
        { name: "p_kosmetik", label: "Kosmetik / Pflegeprodukte", type: "checkbox", condition: (d) => d.rolle !== "affiliate" },
        { name: "p_lebensmittel", label: "Lebensmittel / Nahrungsergänzung", type: "checkbox", condition: (d) => d.rolle !== "affiliate" },
        {
          name: "eu",
          label: "Verkaufst du auch an Privatkunden im EU-Ausland?",
          type: "radio",
          options: [
            { value: "ja", label: "Ja" },
            { value: "nein", label: "Nein, nur Deutschland" },
          ],
          condition: (d) => d.rolle !== "affiliate",
        },
      ],
    },
  ],
  generate,
  seoSections: [
    {
      heading: "Was brauche ich, um im TikTok Shop zu verkaufen?",
      body: [
        "TikTok Shop gibt es in Deutschland seit März 2025, das Mindestalter liegt bei 18 Jahren. Ohne Handelsregister registrierst du dich als „gewerbliche:r Verkäufer:in“ mit Steuernummer, Geschäftsadresse und Ausweis; eingetragene Einzelunternehmer (e.K.) und GbR brauchen laut TikTok zusätzlich eine USt-IdNr. Davor stehen Gewerbeanmeldung und Fragebogen zur steuerlichen Erfassung.",
        "Für die Produkte gelten dieselben Pflichten wie in jedem Online-Shop: Verpackungsregister LUCID, bei Elektrogeräten die WEEE-Registrierung bei der stiftung ear, bei Kosmetik die CPNP-Meldung und Produktsicherheitsangaben nach GPSR.",
      ],
    },
    {
      heading: "Meldet TikTok meine Umsätze ans Finanzamt?",
      body: [
        "Ja, ab einer Schwelle. Nach dem Plattformen-Steuertransparenzgesetz melden Plattformen ihre Verkäufer an das Bundeszentralamt für Steuern – ausgenommen ist nur, wer im Jahr weniger als 30 Verkäufe und zusammen weniger als 2.000 € erzielt.",
      ],
    },
  ],
  seo: {
    title: "TikTok Shop Checkliste 2026 – Pflichten | GründerX",
    description:
      "TikTok Shop in Deutschland starten: Gewerbe, Steuernummer, Registrierung, LUCID, WEEE, Plattform-Meldung und Affiliate-Steuern in Reihenfolge. Gratis.",
    keywords: "tiktok shop deutschland, tiktok shop verkäufer werden, tiktok shop gewerbe, tiktok shop ust-idnr, tiktok shop affiliate steuern, tiktok shop anmelden",
    faqs: [
      {
        q: "Brauche ich ein Gewerbe für TikTok Shop?",
        a: "Für regelmäßige Verkäufe oder Provisionen ja. Ohne Handelsregister registrierst du dich bei TikTok als „gewerbliche:r Verkäufer:in“ mit deiner Steuernummer. Eine USt-IdNr verlangt TikTok in Deutschland von eingetragenen Einzelunternehmern (e.K.) und GbR.",
      },
      {
        q: "Ab welchem Alter kann ich im TikTok Shop verkaufen?",
        a: "Ab 18 Jahren.",
      },
      {
        q: "Meldet TikTok meine Verkäufe dem Finanzamt?",
        a: "Ab 30 Verkäufen oder 2.000 € im Jahr meldet die Plattform dich an das Bundeszentralamt für Steuern (PStTG).",
      },
      {
        q: "Ist die Checkliste kostenlos?",
        a: "Eine Checkliste ist kostenlos – E-Mail angeben, Ergebnis samt PDF erhalten. Unbegrenzt und mit Felix im GründerX-Abo.",
      },
    ],
  },
};
