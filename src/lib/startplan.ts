/**
 * Startplan: aus den drei Onboarding-Angaben (Geschäftsmodell, Phase, Rechtsform)
 * wird ein kurzer Fahrplan, eine Tool-Auswahl, passende Anbieter-Vergleiche und
 * Fragen an Felix. Dashboard und Onboarding nutzen dieselbe Logik, damit der
 * Plan am Ende des Onboardings derselbe ist, der danach im Cockpit steht.
 *
 * Reine Funktionen ohne Seiteneffekte. src/test/startplan.test.ts prüft, dass
 * jedes Ziel (Tool, Guide, Anbieter-Kategorie) wirklich existiert.
 */

export type Phase = "idea" | "planning" | "ready" | "running";
export type Rechtsform = "einzelunternehmen" | "freiberufler" | "gbr" | "ug" | "gmbh" | "us_llc" | "hk_ltd";
export type Modell = "amazon_fba" | "shopify" | "creator" | "agency" | "saas" | "other";

export interface PlanProfil {
  business_model?: string | null;
  founder_stage?: string | null;
  legal_form?: string | null;
}

export const PHASE_LABEL: Record<Phase, string> = {
  idea: "Idee",
  planning: "In Planung",
  ready: "Bereit zu gründen",
  running: "Schon aktiv",
};

export const MODELL_LABEL: Record<Modell, string> = {
  amazon_fba: "Amazon FBA",
  shopify: "Eigener Shop",
  creator: "Creator",
  agency: "Agentur & Service",
  saas: "SaaS",
  other: "Anderes Modell",
};

export const RECHTSFORM_LABEL: Record<Rechtsform, string> = {
  einzelunternehmen: "Einzelunternehmen",
  freiberufler: "Freiberuf",
  gbr: "GbR",
  ug: "UG",
  gmbh: "GmbH",
  us_llc: "US LLC",
  hk_ltd: "HK Limited",
};

const MODELLE = Object.keys(MODELL_LABEL) as Modell[];

export function modelleVon(businessModel: string | null | undefined): Modell[] {
  return (businessModel ?? "")
    .split(",")
    .map((m) => m.trim())
    .filter((m): m is Modell => (MODELLE as string[]).includes(m));
}

export function phaseVon(stage: string | null | undefined): Phase | null {
  return stage === "idea" || stage === "planning" || stage === "ready" || stage === "running" ? stage : null;
}

/**
 * Rechtsform lesen. Das Onboarding speichert feste Kürzel, das Profil ein freies
 * Textfeld ("UG (haftungsbeschränkt)", "Einzelunternehmer") -> beides erkennen.
 * "unsure" und Unbekanntes ergeben null.
 */
export function rechtsformVon(legalForm: string | null | undefined): Rechtsform | null {
  const t = (legalForm ?? "").trim().toLowerCase();
  if (!t || t === "unsure") return null;
  if (/llc/.test(t)) return "us_llc";
  if (/hk|hong\s?kong|limited|ltd/.test(t)) return "hk_ltd";
  if (/gmbh/.test(t)) return "gmbh";
  if (/\bug\b|unternehmergesellschaft/.test(t)) return "ug";
  if (/gbr/.test(t)) return "gbr";
  if (/freiberuf/.test(t)) return "freiberufler";
  if (/einzel/.test(t)) return "einzelunternehmen";
  return null;
}

/** Gründungs-Guide je Rechtsform (Slugs aus data/playbooks.ts). */
export const GRUENDUNGS_GUIDE: Record<Rechtsform, string> = {
  einzelunternehmen: "einzelunternehmen-gruendung",
  freiberufler: "freiberufler-anmelden",
  gbr: "gbr-gruenden",
  ug: "ug-gruendung",
  gmbh: "gmbh-gruendung",
  us_llc: "us-llc",
  hk_ltd: "hk-limited",
};

export interface PlanSchritt {
  /** Stabile Kennung, unter der „erledigt“ gemerkt wird. */
  id: string;
  titel: string;
  /** Ein Satz: was der Schritt klärt und warum er jetzt dran ist. */
  warum: string;
  /** Route in der App. Bei Guides die Vorschau, der Start läuft über useGuideStart. */
  ziel: string;
  art: "tool" | "guide" | "vergleich";
  /** Nur bei art = "guide". */
  guideSlug?: string;
  /** Feature-Slug aus data/features.ts (Tools und Vergleiche), für die Prüfung. */
  featureSlug?: string;
}

const tool = (id: string, featureSlug: string, ziel: string, titel: string, warum: string): PlanSchritt => ({
  id, titel, warum, ziel, art: "tool", featureSlug,
});

const S = {
  gewerbeCheck: tool("gewerbe-check", "gewerbe-check", "/cockpit/gewerbe-check", "Klären, ob du ein Gewerbe brauchst",
    "Ein paar Fragen, dann weißt du, ob Gewerbe, Freiberuf oder vorerst gar keine Anmeldung nötig ist."),
  rechtsform: tool("rechtsform", "rechtsform-wizard", "/wizard/rechtsform", "Rechtsform festlegen",
    "Haftung, Steuern und Gründungskosten der Rechtsformen für dein Vorhaben im Vergleich."),
  finanzplan: tool("finanzplan", "gruendungsunterlagen", "/cockpit/gruendungsunterlagen", "Finanzplan aufstellen",
    "Kapitalbedarf und Liquidität für die ersten zwölf Monate, auch als Unterlage für Bank und Arbeitsagentur."),
  foerderung: tool("foerderung", "foerderung-db", "/cockpit/foerderung", "Förderung prüfen",
    "Zuschüsse, Kredite und Programme für Gründer, filterbar nach Land, Typ und Phase. Manche müssen vor dem Start beantragt werden."),
  roadmap: tool("roadmap", "erste-schritte-roadmap", "/cockpit/erste-schritte-roadmap", "90-Tage-Roadmap erstellen",
    "Alle Pflichtaufgaben der ersten drei Monate als Zeitplan: Finanzamt, Krankenkasse, Konto, IHK."),
  gewerbeanmeldung: tool("gewerbeanmeldung", "gewerbeanmeldung-wizard", "/cockpit/gewerbeanmeldung-wizard", "Gewerbe anmelden",
    "Füllt das amtliche Formular GewA 1 mit deinen Daten, fertig zum Einreichen beim Gewerbeamt."),
  fseEinzel: tool("fse", "fse-wizard", "/cockpit/fse-wizard", "Fragebogen zur steuerlichen Erfassung ausfüllen",
    "Ohne ihn gibt es keine Steuernummer. Der Begleiter erklärt jedes ELSTER-Feld in der richtigen Reihenfolge."),
  fseKapital: tool("fse", "fse-kapitalgesellschaft", "/cockpit/fse-kapitalgesellschaft", "Fragebogen zur steuerlichen Erfassung ausfüllen",
    "Ohne ihn gibt es keine Steuernummer. Der Begleiter führt durch den ELSTER-Fragebogen für Kapitalgesellschaften."),
  fsePersonen: tool("fse", "fse-personengesellschaft", "/cockpit/fse-personengesellschaft", "Fragebogen zur steuerlichen Erfassung ausfüllen",
    "Ohne ihn gibt es keine Steuernummer. Der Begleiter führt durch den ELSTER-Fragebogen für Personengesellschaften."),
  buchhaltung: tool("buchhaltung", "buchhaltungssoftware-guide", "/cockpit/buchhaltungssoftware-guide", "Buchhaltung einrichten",
    "Welche Software zu deinem Modell passt und was sie kostet, bevor die ersten Belege liegen bleiben."),
  steuerkalender: tool("steuerkalender", "steuerkalender", "/cockpit/steuerkalender", "Steuerkalender einrichten",
    "Alle Abgabe- und Zahlungstermine der nächsten zwölf Monate für deine Situation. Sie erscheinen danach hier im Cockpit."),
  ustVoranmeldung: tool("ust-voranmeldung", "ust-voranmeldung", "/cockpit/ust-voranmeldung", "USt-Voranmeldung sicher abgeben",
    "Der ELSTER-Vordruck Kennzahl für Kennzahl, mit Fristen und Dauerfristverlängerung."),
  stbCheck: tool("stb-check", "stb-cost-benefit", "/cockpit/stb-cost-benefit", "Steuerberater oder selbst machen",
    "Drei Szenarien mit Kosten im Vergleich: Vollmandat, Software in Eigenregie oder gemischt."),
  versicherung: tool("versicherung", "versicherungs-basis-check", "/cockpit/versicherungs-basis-check", "Versicherungen prüfen",
    "Welche Policen Pflicht sind, welche dringend und welche du dir sparen kannst."),
  jahresende: tool("jahresende", "pre-year-end", "/cockpit/pre-year-end", "Jahresende vorbereiten",
    "Sieben Hebel, mit denen sich vor dem 31.12. noch Steuern sparen lassen, jeweils mit Rechnung."),
  usLlcWizard: tool("us-llc-wizard", "us-llc-wizard", "/cockpit/us-llc-wizard", "US-LLC-Setup durchgehen",
    "Bundesstaat, Agent, EIN, BOI-Status und Bank in der Reihenfolge, in der sie anfallen."),
  usTax: tool("us-tax", "us-tax-helper", "/cockpit/us-tax-helper", "US-Steuerpflichten klären",
    "Welche Formulare eine LLC mit deutschem Inhaber abgeben muss und wann."),
  dbaCfc: tool("dba-cfc", "dba-cfc", "/cockpit/dba-cfc", "Hinzurechnungsbesteuerung prüfen",
    "Ob Gewinne der Auslandsgesellschaft in Deutschland versteuert werden müssen."),
  hkWizard: tool("hk-wizard", "hk-limited-wizard", "/cockpit/hk-limited-wizard", "HK-Limited-Setup durchgehen",
    "Director, Company Secretary, Registrierung und Bankkonto Schritt für Schritt."),
  hkTax: tool("hk-tax", "hk-tax-helper", "/cockpit/hk-tax-helper", "Steuerpflichten in Hongkong klären",
    "Profits Tax Return, Audit-Pflicht und die jährlichen Meldungen einer HK Limited."),
};

const konto = (form: Rechtsform | null): PlanSchritt => {
  const us = form === "us_llc";
  return {
    id: "geschaeftskonto",
    titel: "Geschäftskonto auswählen",
    warum: us
      ? "Mercury, Wise, Relay und Brex im Vergleich."
      : "Kontomodelle und Gebühren im Vergleich. Bei UG und GmbH brauchst du das Konto schon für die Einzahlung des Stammkapitals.",
    ziel: us ? "/anbieter?cat=Banking+US" : "/anbieter?cat=Banking+DE",
    art: "vergleich",
    featureSlug: us ? "vergleich-banking-us" : "vergleich-banking-de",
  };
};

const guide = (form: Rechtsform, titel: string): PlanSchritt => ({
  id: `guide-${GRUENDUNGS_GUIDE[form]}`,
  titel,
  warum: "Der Guide führt Schritt für Schritt durch die Gründung, mit Abhak-Listen, Kosten und Vorlagen.",
  ziel: `/playbook/preview/${GRUENDUNGS_GUIDE[form]}`,
  art: "guide",
  guideSlug: GRUENDUNGS_GUIDE[form],
});

const GUIDE_TITEL: Record<Rechtsform, string> = {
  einzelunternehmen: "Einzelunternehmen gründen",
  freiberufler: "Als Freiberufler anmelden",
  gbr: "GbR gründen",
  ug: "UG gründen",
  gmbh: "GmbH gründen",
  us_llc: "US LLC gründen",
  hk_ltd: "HK Limited gründen",
};

const fse = (form: Rechtsform | null): PlanSchritt =>
  form === "ug" || form === "gmbh" ? S.fseKapital : form === "gbr" ? S.fsePersonen : S.fseEinzel;

/** Ein Tool je Geschäftsmodell für alle, die schon aktiv sind. */
const LAUFEND_NACH_MODELL: Record<Modell, PlanSchritt | null> = {
  amazon_fba: tool("amazon-erstattungen", "amazon-erstattungen", "/cockpit/amazon-erstattungen", "Amazon-Erstattungen prüfen",
    "Findet verlorene FBA-Ware und zu niedrige Erstattungen und bereitet die Fälle für Amazon vor."),
  shopify: tool("shop-profit", "shop-profit-rechner", "/cockpit/shop-profit-rechner", "Shop-Marge nachrechnen",
    "Was nach Versand, Zahlungsgebühren und Klickkosten pro Bestellung übrig bleibt."),
  creator: tool("kleinunternehmer-waechter", "kleinunternehmer-waechter", "/cockpit/kleinunternehmer-waechter", "Kleinunternehmer-Grenze im Blick behalten",
    "Monatsumsätze eintragen und sehen, wie nah du an der 25.000-€-Grenze bist."),
  agency: tool("stundensatz", "stundensatz-rechner", "/cockpit/stundensatz-rechner", "Stundensatz nachrechnen",
    "Rückwärts vom gewünschten Netto: welcher Satz Krankenkasse, Rücklagen und Leerlauf wirklich deckt."),
  saas: tool("runway", "runway-rechner", "/cockpit/runway-rechner", "Runway berechnen",
    "Wie viele Monate das Geld bei deinen Kosten und deinem Wachstum reicht."),
  other: null,
};

/**
 * Fahrplan für die Phase. Ohne Angabe der Phase gilt „Idee“: Der Plan beginnt dann
 * vorn und schadet auch Fortgeschrittenen nicht.
 */
export function fahrplan(profil: PlanProfil): PlanSchritt[] {
  const phase = phaseVon(profil.founder_stage) ?? "idea";
  const form = rechtsformVon(profil.legal_form);
  const modelle = modelleVon(profil.business_model);
  const ausland = form === "us_llc" || form === "hk_ltd";
  const gruendungsGuide = form ? guide(form, GUIDE_TITEL[form]) : null;
  const auslandSchritte = form === "us_llc" ? [S.usLlcWizard, S.usTax, S.dbaCfc] : form === "hk_ltd" ? [S.hkWizard, S.hkTax, S.dbaCfc] : [];

  let schritte: (PlanSchritt | null)[];
  if (phase === "idea") {
    schritte = [ausland ? null : S.gewerbeCheck, S.rechtsform, S.finanzplan, ausland ? S.dbaCfc : S.foerderung, ausland ? null : S.roadmap, ausland ? gruendungsGuide : null];
  } else if (phase === "planning") {
    schritte = [S.rechtsform, S.finanzplan, ausland ? S.dbaCfc : S.foerderung, konto(form), gruendungsGuide ?? S.roadmap];
  } else if (phase === "ready") {
    schritte = ausland
      ? [gruendungsGuide, ...auslandSchritte.slice(0, 2), konto(form), S.dbaCfc, S.buchhaltung]
      : [
          form ? null : S.rechtsform,
          gruendungsGuide,
          form === "freiberufler" ? null : S.gewerbeanmeldung,
          fse(form),
          konto(form),
          S.buchhaltung,
          S.steuerkalender,
        ];
  } else {
    const jeModell = modelle.map((m) => LAUFEND_NACH_MODELL[m]).find((s): s is PlanSchritt => !!s) ?? null;
    schritte = ausland
      ? [auslandSchritte[1], S.dbaCfc, jeModell, S.stbCheck, S.buchhaltung]
      : [S.steuerkalender, jeModell, S.ustVoranmeldung, S.stbCheck, S.versicherung, S.jahresende];
  }
  const gesehen = new Set<string>();
  return schritte.filter((s): s is PlanSchritt => {
    if (!s || gesehen.has(s.id)) return false;
    gesehen.add(s.id);
    return true;
  });
}

/** Was sich ohne Zutun des Nutzers als erledigt erkennen lässt. */
export interface PlanSignale {
  /** Im Profil steht eine konkrete Rechtsform. */
  rechtsformGewaehlt: boolean;
  /** Der Steuerkalender ist auf diesem Gerät eingerichtet. */
  steuerkalenderEingerichtet: boolean;
  /** Guide-Slugs mit abgeschlossenem Lauf. */
  guidesFertig: string[];
  /** Von Hand abgehakte Schritt-Kennungen. */
  abgehakt: string[];
}

export function istErledigt(s: PlanSchritt, signale: PlanSignale): boolean {
  if (signale.abgehakt.includes(s.id)) return true;
  if (s.id === "rechtsform") return signale.rechtsformGewaehlt;
  if (s.id === "steuerkalender") return signale.steuerkalenderEingerichtet;
  if (s.guideSlug) return signale.guidesFertig.includes(s.guideSlug);
  return false;
}

/** Schritte, deren Erledigt-Status aus Daten kommt und nicht von Hand geändert wird. */
export function istAutomatisch(s: PlanSchritt, signale: PlanSignale): boolean {
  if (signale.abgehakt.includes(s.id)) return false;
  return istErledigt(s, signale);
}

// ───────────────────────── Tool-Empfehlungen ─────────────────────────

const TOOLS_NACH_MODELL: Record<Modell, string[]> = {
  amazon_fba: ["amazon-erstattungen", "amazon-ust", "amazon-parser", "marge-tracker", "lucid-wizard", "weee-check"],
  shopify: ["shop-profit-rechner", "stripe-parser", "ecom-roadmap", "lucid-wizard", "marge-tracker", "brand-check"],
  creator: ["rechnungs-generator", "kleinunternehmer-waechter", "brutto-netto-solo", "stundensatz-rechner", "schwellen-check", "brand-check"],
  agency: ["stundensatz-rechner", "rechnungs-generator", "mahnung", "scheinselbststaendigkeit", "brutto-netto-solo", "reisekosten"],
  saas: ["runway-rechner", "pitch-deck", "app-umsatz-rechner", "foerderung-db", "ip-box", "sales-tax-nexus"],
  other: [],
};

const TOOLS_NACH_RECHTSFORM: Partial<Record<Rechtsform, string[]>> = {
  ug: ["salary-vs-dividende", "holding-designer"],
  gmbh: ["salary-vs-dividende", "holding-designer"],
  us_llc: ["us-llc-wizard", "us-tax-helper", "us-hk-banking"],
  hk_ltd: ["hk-limited-wizard", "hk-tax-helper", "us-hk-banking"],
  einzelunternehmen: ["kleinunternehmer-waechter", "brutto-netto-solo"],
  freiberufler: ["brutto-netto-solo", "stundensatz-rechner"],
};

const TOOLS_GRUNDLAGE = ["rechnungs-generator", "brutto-netto-solo", "steuerkalender", "versicherungs-basis-check", "gruendungszuschuss", "steuer-abc", "brand-check", "kleinunternehmer-waechter"];

/** Brauchen laufende Umsätze oder Belege: vor dem Start rutschen sie ans Ende der Modell-Liste. */
const ERST_IM_BETRIEB = new Set(["amazon-erstattungen", "amazon-parser", "stripe-parser", "marge-tracker", "mahnung", "reisekosten"]);

/**
 * Feature-Slugs passend zum Profil: reihum je Geschäftsmodell, dann Rechtsform,
 * dann Grundlagen. Was schon im Fahrplan steht, kommt nicht doppelt.
 */
export function empfohleneToolSlugs(profil: PlanProfil, anzahl = 6): string[] {
  const modelle = modelleVon(profil.business_model);
  const form = rechtsformVon(profil.legal_form);
  const imPlan = new Set(fahrplan(profil).map((s) => s.featureSlug).filter(Boolean) as string[]);
  const listen = modelle.map((m) => TOOLS_NACH_MODELL[m]).filter((l) => l.length > 0);
  const phase = phaseVon(profil.founder_stage);
  const roh: string[] = [];
  for (let i = 0; i < 6; i++) for (const l of listen) if (l[i]) roh.push(l[i]);
  const reihum = phase && phase !== "running"
    ? [...roh.filter((s) => !ERST_IM_BETRIEB.has(s)), ...roh.filter((s) => ERST_IM_BETRIEB.has(s))]
    : roh;
  const alle = [...reihum, ...((form && TOOLS_NACH_RECHTSFORM[form]) || []), ...TOOLS_GRUNDLAGE];
  // Die Rechtsform-Tools sollen auch bei vollen Modell-Listen sichtbar bleiben:
  // zwei Plätze sind für sie reserviert, wenn es welche gibt.
  const formTools = ((form && TOOLS_NACH_RECHTSFORM[form]) || []).filter((s) => !imPlan.has(s)).slice(0, 2);
  const kopf = [...new Set(reihum)].filter((s) => !imPlan.has(s) && !formTools.includes(s)).slice(0, Math.max(0, anzahl - formTools.length));
  const rest = [...new Set(alle)].filter((s) => !imPlan.has(s) && !kopf.includes(s) && !formTools.includes(s));
  return [...kopf, ...formTools, ...rest].slice(0, anzahl);
}

// ───────────────────────── Anbieter-Vergleiche ─────────────────────────

export interface VergleichTipp {
  /** Kategorie in data/anbieter.ts. */
  kategorie: string;
  titel: string;
  grund: string;
}

const V = {
  bankDe: { kategorie: "Banking DE", titel: "Geschäftskonto", grund: "Kontomodelle und Gebühren für Gründer" },
  bankUs: { kategorie: "Banking US", titel: "US-Geschäftskonto", grund: "Mercury, Wise, Relay und Brex im Vergleich" },
  buchhaltung: { kategorie: "Buchhaltung", titel: "Buchhaltungssoftware", grund: "Belege, Rechnungen und DATEV-Export" },
  versand: { kategorie: "Versand DACH", titel: "Versanddienstleister", grund: "Paketpreise und Abholung im Vergleich" },
  lucid: { kategorie: "LUCID", titel: "Verpackungslizenz", grund: "Duale Systeme für die LUCID-Pflicht" },
  dreiPl: { kategorie: "3PL", titel: "Fulfillment (3PL)", grund: "Lager und Versand auslagern" },
  shop: { kategorie: "Shop-System", titel: "Shop-System", grund: "Shopify und Alternativen mit Kosten" },
  email: { kategorie: "Email", titel: "E-Mail-Marketing", grund: "Newsletter-Tools für Shops und Creator" },
  payment: { kategorie: "Payment", titel: "Zahlungsanbieter", grund: "Gebühren je Zahlart im Vergleich" },
  haftpflicht: { kategorie: "Haftpflichtversicherung", titel: "Betriebshaftpflicht", grund: "Absicherung für Dienstleister und Berater" },
  karten: { kategorie: "Kreditkarten", titel: "Geschäftskreditkarte", grund: "Karten für Werbebudgets und Tools" },
} satisfies Record<string, VergleichTipp>;

const VERGLEICHE_NACH_MODELL: Record<Modell, VergleichTipp[]> = {
  amazon_fba: [V.lucid, V.versand, V.dreiPl],
  shopify: [V.shop, V.payment, V.versand, V.email],
  creator: [V.email, V.karten],
  agency: [V.haftpflicht, V.karten],
  saas: [V.payment, V.karten],
  other: [],
};

export function empfohleneVergleiche(profil: PlanProfil, anzahl = 4): VergleichTipp[] {
  const form = rechtsformVon(profil.legal_form);
  const modelle = modelleVon(profil.business_model);
  const liste: VergleichTipp[] = [form === "us_llc" ? V.bankUs : V.bankDe, V.buchhaltung];
  const jeModell = modelle.map((m) => VERGLEICHE_NACH_MODELL[m]);
  for (let i = 0; i < 4; i++) for (const l of jeModell) if (l[i]) liste.push(l[i]);
  liste.push(V.haftpflicht, V.karten);
  const gesehen = new Set<string>();
  return liste.filter((v) => (gesehen.has(v.kategorie) ? false : (gesehen.add(v.kategorie), true))).slice(0, anzahl);
}

export const vergleichRoute = (kategorie: string) => `/anbieter?cat=${encodeURIComponent(kategorie).replace(/%20/g, "+")}`;

// ───────────────────────── Fragen an Felix ─────────────────────────

const FRAGE_NACH_MODELL: Record<Modell, string> = {
  amazon_fba: "Welche Registrierungen brauche ich, bevor ich auf Amazon verkaufe (LUCID, WEEE, OSS)?",
  shopify: "Was muss rechtlich stehen, bevor mein Shop online geht (Impressum, AGB, Widerruf, Verpackung)?",
  creator: "Ab wann muss ich als Creator ein Gewerbe anmelden und wie versteuere ich Kooperationen und Gratis-Produkte?",
  agency: "Wie setze ich meine ersten Kundenverträge auf und worauf achte ich bei Scheinselbstständigkeit?",
  saas: "Welche Rechtsform passt für ein SaaS, wenn ich später Investoren aufnehmen will?",
  other: "Welche Anmeldungen und Fristen kommen in den ersten 90 Tagen auf mich zu?",
};

const FRAGE_NACH_PHASE: Record<Phase, string> = {
  idea: "Ich habe bisher nur eine Idee. Was sollte ich klären, bevor ich irgendetwas anmelde?",
  planning: "Welche Kosten kommen bei der Gründung und im ersten Jahr realistisch auf mich zu?",
  ready: "In welcher Reihenfolge erledige ich Gewerbeamt, Finanzamt, Konto und Versicherungen?",
  running: "Welche Steuertermine und Pflichten übersehen Selbstständige im ersten Jahr am häufigsten?",
};

export function felixFragen(profil: PlanProfil): string[] {
  const phase = phaseVon(profil.founder_stage) ?? "idea";
  const form = rechtsformVon(profil.legal_form);
  const modelle = modelleVon(profil.business_model);
  const fragen = [
    FRAGE_NACH_PHASE[phase],
    FRAGE_NACH_MODELL[modelle[0] ?? "other"],
    form
      ? `Was sind die typischen Fehler bei einer ${RECHTSFORM_LABEL[form]} im ersten Jahr?`
      : "Einzelunternehmen, UG oder GmbH: Was passt, wenn ich klein anfange und später wachsen will?",
  ];
  return [...new Set(fragen)];
}

/** Kurzbeschreibung des Profils für die Kopfzeile, z. B. ["Amazon FBA", "In Planung", "UG"]. */
export function profilMerkmale(profil: PlanProfil): string[] {
  const phase = phaseVon(profil.founder_stage);
  const form = rechtsformVon(profil.legal_form);
  return [
    ...modelleVon(profil.business_model).filter((m) => m !== "other").map((m) => MODELL_LABEL[m]),
    ...(phase ? [PHASE_LABEL[phase]] : []),
    ...(form ? [RECHTSFORM_LABEL[form]] : []),
  ];
}
