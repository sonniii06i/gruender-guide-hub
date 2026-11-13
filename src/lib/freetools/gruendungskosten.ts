import { Calculator } from "lucide-react";
import { type ToolConfig, type ToolData, s, b, DISCLAIMER, zahl } from "./types";

// Art. 7, Art. 13 Abs. 3 KostBRÄG 2025 (BGBl. 2025 I Nr. 109): neue Tabelle B seit 01.06.2025. Die HRegGebV wurde dort nicht geändert.
// Gründungskosten-Rechner (Ausbau 13.11.2026): Notar- und Registerkosten werden aus dem
// Gesetz gerechnet statt geschätzt. Belege (gesetze-im-internet.de, abgerufen 13.11.2026):
// - § 34 Abs. 2, 4, 5 GNotKG + Anlage 2 (Tabelle B, Fundstelle BGBl. 2025 I Nr. 109): Wertgebühr,
//   Rundung auf Cent, Mindestgebühr 15 €. Testfälle: jede Zeile der Anlage 2 bis 3 Mio. €.
// - KV 21100 (Vertrag, 2,0 – mind. 120 €), KV 21200 (einseitige Erklärung, 1,0 – mind. 60 €).
// - § 107 Abs. 1 GNotKG: Geschäftswert Gesellschaftsvertrag mind. 30.000 €, nicht beim Musterprotokoll (§ 105 Abs. 6).
// - § 105 Abs. 1 Nr. 1, Abs. 3, Abs. 6, § 106 GNotKG: Wert der Registeranmeldung (Stammkapital, mind. 30.000 €,
//   nicht beim Musterprotokoll; e. K. 30.000 €; GbR 45.000 € + 15.000 € je weiterem Gesellschafter; höchstens 1 Mio. €).
// - KV 24102 i. V. m. § 92 Abs. 2 GNotKG: Entwurf der Anmeldung 0,5 – mind. 30 €; Beglaubigung daneben gebührenfrei (Vorbem. 2.4.1 Abs. 2).
// - KV 22110/22111/22113, Vorbem. 2.2.1.1 Abs. 1 Satz 2 Nr. 3: Gesellschafterliste 0,5 bzw. 0,3, höchstens 250 €;
//   § 2 Abs. 1a Satz 4 GmbHG: Musterprotokoll gilt als Gesellschafterliste.
// - KV 22114: XML-Strukturdaten 0,2 – höchstens 125 €.  KV 32005: Auslagenpauschale 20 % der Gebühren, höchstens 20 € je Verfahren.
//   KV 32014: Umsatzsteuer.
// - HRegGebV, Gebührenverzeichnis: Nr. 2100 GmbH/UG 225 €, Nr. 1100 Einzelkaufmann 105 €, Nr. 1101 Gesellschaft bis
//   3 Gesellschafter 150 €, Nr. 1102 je weiterem Gesellschafter 60 €.
// - §§ 2 Abs. 1a, 5 Abs. 1, 5a Abs. 2 und 3, 7 Abs. 2 GmbHG.
// - Gewerbeanzeige: kommunal verschieden, deshalb Eingabefeld. Beispiele (abgerufen 13.11.2026): Berlin 26 € / online 15 € /
//   juristische Person 31 € (service.berlin.de/dienstleistung/121921), Köln 26 € / juristische Person 33 € (stadt-koeln.de).
// - KV 32016: Videokommunikation 25 € (Beurkundung) / 8 € (Beglaubigung) – nur im Text, nicht gerechnet.
// Nicht gerechnet (Eingabefeld „Weitere Notarkosten“): gesonderter Beschluss zur Geschäftsführerbestellung,
// Dokumentenpauschale, Beratung, Sachgründung (HRegGebV Nr. 2101), Transparenzregister, IHK-Beitrag.
export const GK_STAND = "13.11.2026";

function euro(n: number): string {
  const ganz = Math.abs(n - Math.round(n)) < 0.005;
  return n.toLocaleString("de-DE", { minimumFractionDigits: ganz ? 0 : 2, maximumFractionDigits: 2 }) + " €";
}

const cent = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

/** Stufen der Tabelle B nach § 34 Abs. 2 GNotKG: [Wert bis, je angefangene, Erhöhung]. */
const STUFEN_B: [number, number, number][] = [
  [2_000, 500, 4],
  [10_000, 1_000, 6],
  [25_000, 3_000, 8],
  [50_000, 5_000, 10],
  [200_000, 15_000, 27],
  [500_000, 30_000, 50],
  [5_000_000, 50_000, 80],
  [10_000_000, 200_000, 130],
  [20_000_000, 250_000, 150],
  [30_000_000, 500_000, 280],
  [Infinity, 1_000_000, 120],
];

/** 1,0-Gebühr nach Tabelle B (§ 34 Abs. 2 GNotKG) für einen Geschäftswert in Euro. */
export function gebuehrTabelleB(wert: number): number {
  let g = 15;
  let unten = 500;
  for (const [bis, schritt, plus] of STUFEN_B) {
    if (wert <= unten) break;
    const ende = Math.min(wert, bis);
    g += Math.ceil((ende - unten) / schritt) * plus;
    unten = bis;
  }
  return g;
}

/** Gebühr = Satz × Tabelle B, auf Cent gerundet (§ 34 Abs. 4), mindestens 15 € (§ 34 Abs. 5) bzw. `min`, höchstens `max`. */
export function wertGebuehr(wert: number, satz: number, min = 15, max = Infinity): number {
  return cent(Math.min(max, Math.max(min, 15, satz * gebuehrTabelleB(wert))));
}

export type GkForm = "einzel" | "gbr" | "ug" | "gmbh";
export type GkArt = "muster" | "satzung";

export interface GkEingabe {
  form: GkForm;
  /** Zahl der Gesellschafter (GbR, UG, GmbH). */
  gesellschafter?: number;
  /** Stammkapital in Euro (UG, GmbH). */
  stammkapital?: number;
  art?: GkArt;
  /** Freiwillige Eintragung: e. K. im Handelsregister bzw. eGbR im Gesellschaftsregister. */
  register?: boolean;
  /** Gebühr der Gemeinde je Gewerbeanzeige (Eingabe, kommunal verschieden). */
  gewerbeGebuehr?: number;
  /** Weitere Notarkosten brutto, die der Rechner nicht aus dem Gesetz ableitet (Eingabe). */
  weitereNotar?: number;
}

export interface GkPosten {
  label: string;
  norm: string;
  betrag: number;
}

export interface GkErgebnis {
  form: GkForm;
  art: GkArt | null;
  gesellschafter: number;
  stammkapital: number;
  /** Notargebühren netto, einzeln. */
  notar: GkPosten[];
  notarGebuehren: number;
  auslagen: number;
  ust: number;
  notarBrutto: number;
  weitereNotar: number;
  gericht: GkPosten | null;
  gewerbe: number;
  /** Summe aller Formalitäten (Notar brutto + weitere Notarkosten + Gericht + Gewerbeanzeige). */
  summe: number;
  hinweise: string[];
}

const MIN_WERT = 30_000;

/** Formalitätskosten einer Gründung. Reine Funktion; jede Zahl stammt aus GNotKG, HRegGebV oder der Eingabe. */
export function gruendungskosten(e: GkEingabe): GkErgebnis {
  const hinweise: string[] = [];
  const kap = e.form === "ug" || e.form === "gmbh";
  const n = e.form === "einzel" ? 1 : Math.max(e.form === "gbr" ? 2 : 1, Math.floor(e.gesellschafter || 0));
  const notar: GkPosten[] = [];
  let auslagen = 0;
  let gericht: GkPosten | null = null;
  let art: GkArt | null = null;
  let stammkapital = 0;

  /** Registeranmeldung: Entwurf 0,5 + XML 0,2, eigene Auslagenpauschale. */
  const anmeldung = (wert: number, wertNorm: string) => {
    const w = Math.min(wert, 1_000_000);
    const entwurf = wertGebuehr(w, 0.5, 30);
    const xml = wertGebuehr(w, 0.2, 15, 125);
    notar.push({ label: `Registeranmeldung, Entwurf mit Beglaubigung (0,5 aus ${euro(w)})`, norm: `KV 24102 GNotKG, ${wertNorm}`, betrag: entwurf });
    notar.push({ label: `Strukturdaten (XML) für das Registergericht (0,2 aus ${euro(w)})`, norm: "KV 22114 GNotKG", betrag: xml });
    auslagen += cent(Math.min(20, 0.2 * (entwurf + xml)));
  };

  if (kap) {
    stammkapital = Math.floor(e.stammkapital || 0);
    if (e.form === "gmbh" && stammkapital < 25_000) {
      stammkapital = 25_000;
      hinweise.push("Die GmbH braucht mindestens 25.000 € Stammkapital (§ 5 Abs. 1 GmbHG); gerechnet wurde mit 25.000 €.");
    }
    if (e.form === "ug" && stammkapital < 1) {
      stammkapital = 1;
      hinweise.push("Ohne Angabe wurde mit 1 € Stammkapital gerechnet (ein Geschäftsanteil lautet mindestens auf 1 €, § 5 Abs. 2 GmbHG).");
    }
    if (e.form === "ug" && stammkapital >= 25_000) {
      hinweise.push("Ab 25.000 € Stammkapital ist die Gesellschaft eine GmbH, keine UG (§ 5a Abs. 1 GmbHG). Die Gebühren sind dieselben.");
    }
    art = e.art === "satzung" ? "satzung" : "muster";
    if (art === "muster" && n > 3) {
      art = "satzung";
      hinweise.push("Das Musterprotokoll geht nur mit höchstens drei Gesellschaftern und einem Geschäftsführer (§ 2 Abs. 1a GmbHG); gerechnet wurde mit individueller Satzung.");
    }
    const muster = art === "muster";
    const wert = muster ? stammkapital : Math.max(stammkapital, MIN_WERT);
    const wertText = muster ? "Geschäftswert = Stammkapital, kein Mindestwert (§ 107 Abs. 1 Satz 2 GNotKG)" : "Geschäftswert mind. 30.000 € (§ 107 Abs. 1 Satz 1 GNotKG)";

    const beurkundung = n === 1 ? wertGebuehr(wert, 1.0, 60) : wertGebuehr(wert, 2.0, 120);
    notar.push({
      label: `Beurkundung ${muster ? "Musterprotokoll" : "Gesellschaftsvertrag"} (${n === 1 ? "1,0" : "2,0"} aus ${euro(wert)})`,
      norm: `${n === 1 ? "KV 21200" : "KV 21100"} GNotKG; ${wertText}`,
      betrag: beurkundung,
    });
    let liste = 0;
    if (!muster) {
      liste = wertGebuehr(wert, n === 1 ? 0.3 : 0.5, 15, 250);
      notar.push({
        label: `Gesellschafterliste (${n === 1 ? "0,3" : "0,5"} aus ${euro(wert)})`,
        norm: `${n === 1 ? "KV 22111" : "KV 22110"}, 22113 GNotKG`,
        betrag: liste,
      });
    }
    auslagen += cent(Math.min(20, 0.2 * (beurkundung + liste)));
    anmeldung(wert, muster ? "§ 105 Abs. 1 Nr. 1, Abs. 6" : "§ 105 Abs. 1 Nr. 1");
    gericht = { label: "Eintragung im Handelsregister (Bargründung)", norm: "Nr. 2100 HRegGebV", betrag: 225 };
  } else if (e.register) {
    if (e.form === "einzel") {
      anmeldung(30_000, "§ 105 Abs. 3 Nr. 1");
      gericht = { label: "Eintragung als eingetragener Kaufmann (e. K.)", norm: "Nr. 1100 HRegGebV", betrag: 105 };
    } else {
      anmeldung(45_000 + Math.max(0, n - 2) * 15_000, "§ 105 Abs. 3 Nr. 2");
      gericht = {
        label: `Eintragung im Gesellschaftsregister (eGbR, ${n} Gesellschafter)`,
        norm: n > 3 ? "Nr. 1101, 1102 HRegGebV" : "Nr. 1101 HRegGebV",
        betrag: 150 + Math.max(0, n - 3) * 60,
      };
    }
  }

  const notarGebuehren = cent(notar.reduce((a, p) => a + p.betrag, 0));
  auslagen = cent(auslagen);
  const ust = cent((notarGebuehren + auslagen) * 0.19);
  const notarBrutto = cent(notarGebuehren + auslagen + ust);
  const weitereNotar = notar.length ? Math.max(0, e.weitereNotar || 0) : 0;
  const anzeigen = e.form === "gbr" ? n : 1;
  const gewerbe = cent(Math.max(0, e.gewerbeGebuehr || 0) * anzeigen);
  const summe = cent(notarBrutto + weitereNotar + (gericht?.betrag || 0) + gewerbe);

  return { form: e.form, art, gesellschafter: n, stammkapital, notar, notarGebuehren, auslagen, ust, notarBrutto, weitereNotar, gericht, gewerbe, summe, hinweise };
}

const FORM_LABEL: Record<GkForm, string> = {
  einzel: "Einzelunternehmen",
  gbr: "GbR",
  ug: "UG (haftungsbeschränkt)",
  gmbh: "GmbH",
};

const STAMMKAPITAL: Record<GkForm, string> = {
  einzel: "Kein Mindestkapital vorgeschrieben.",
  gbr: "Kein Mindestkapital vorgeschrieben.",
  ug: "Die UG geht ab 1 € Stammkapital. Es muss vor der Anmeldung voll eingezahlt sein, Sacheinlagen sind ausgeschlossen (§ 5a Abs. 2 GmbHG). Ein Viertel des Jahresüberschusses geht in die gesetzliche Rücklage (§ 5a Abs. 3 GmbHG).",
  gmbh: "Mindestens 25.000 € (§ 5 Abs. 1 GmbHG). Vor der Anmeldung muss auf jeden Anteil ein Viertel und insgesamt mindestens die Hälfte des Mindeststammkapitals eingezahlt sein, also 12.500 € (§ 7 Abs. 2 GmbHG).",
};

function eingabe(data: ToolData): GkEingabe {
  const form = (["einzel", "gbr", "ug", "gmbh"].includes(s(data, "legalForm")) ? s(data, "legalForm") : "einzel") as GkForm;
  return {
    form,
    gesellschafter: Number(s(data, "gesellschafter", "1")),
    stammkapital: zahl(s(data, "stammkapital")),
    art: s(data, "art") === "satzung" ? "satzung" : "muster",
    register: b(data, "register"),
    gewerbeGebuehr: zahl(s(data, "gewerbe")),
    weitereNotar: zahl(s(data, "weitereNotar")),
  };
}

interface Item { label: string; amount: number; }

function generate(data: ToolData): string {
  const e = eingabe(data);
  const r = gruendungskosten(e);
  const freiberuf = s(data, "gewerbe") === "" && e.form === "einzel";

  const variable: Item[] = [
    { label: "Steuer-/Gründungsberatung", amount: zahl(s(data, "beratung")) },
    { label: "Website / Online-Auftritt", amount: zahl(s(data, "website")) },
    { label: "Erstausstattung / Equipment", amount: zahl(s(data, "equipment")) },
    { label: "Waren- / Materiallager", amount: zahl(s(data, "waren")) },
    { label: "Marketing-Startbudget", amount: zahl(s(data, "marketing")) },
    { label: "Sonstiges / Puffer", amount: zahl(s(data, "sonstiges")) },
  ].filter((i) => i.amount > 0);
  const variableSum = variable.reduce((a, i) => a + i.amount, 0);

  const L: string[] = [];
  const kopf = [FORM_LABEL[r.form]];
  if (r.art) kopf.push(r.art === "muster" ? "Musterprotokoll" : "individuelle Satzung", `${r.gesellschafter} Gesellschafter`, `Stammkapital ${euro(r.stammkapital)}`);
  else if (r.form === "gbr") kopf.push(`${r.gesellschafter} Gesellschafter`);
  L.push(`Gründungskosten – Übersicht (${kopf.join(", ")})`);
  L.push(`Rechtsstand: ${GK_STAND} (GNotKG mit der seit 01.06.2025 geltenden Tabelle B, Handelsregistergebührenverordnung in aktueller Fassung)`);
  L.push("");

  L.push("1. Notar");
  if (r.notar.length) {
    r.notar.forEach((p) => L.push(`- ${p.label}: ${euro(p.betrag)} [${p.norm}]`));
    L.push(`Gebühren netto: ${euro(r.notarGebuehren)}`);
    L.push(`- Auslagenpauschale Post/Telekommunikation: ${euro(r.auslagen)} [KV 32005 GNotKG, 20 % der Gebühren, höchstens 20 € je Verfahren]`);
    L.push(`- Umsatzsteuer 19 %: ${euro(r.ust)} [KV 32014 GNotKG]`);
    L.push(`Notar brutto: ${euro(r.notarBrutto)}`);
    if (r.weitereNotar > 0) L.push(`- Weitere Notarkosten (deine Angabe): ${euro(r.weitereNotar)}`);
  } else {
    L.push("Kein Notar nötig. Einzelunternehmen und GbR entstehen ohne Beurkundung; ein Notar wird erst für eine freiwillige Registereintragung gebraucht.");
  }
  L.push("");

  L.push("2. Registergericht");
  L.push(r.gericht ? `- ${r.gericht.label}: ${euro(r.gericht.betrag)} [${r.gericht.norm}]` : "Keine Eintragung, keine Gerichtsgebühr.");
  L.push("");

  L.push("3. Gewerbeanzeige");
  if (r.gewerbe > 0) {
    L.push(`- Gebühr deiner Gemeinde (deine Angabe)${r.form === "gbr" ? `, ${r.gesellschafter} Anzeigen` : ""}: ${euro(r.gewerbe)}`);
  } else {
    L.push(
      freiberuf
        ? "Keine Gebühr eingetragen. Freiberufler zeigen kein Gewerbe an; Gewerbetreibende zahlen die Gebühr ihrer Gemeinde (Beispiele: Berlin 26 €, online 15 €; Köln 26 €)."
        : "Keine Gebühr eingetragen. Die Höhe legt deine Gemeinde fest (Beispiele: Berlin 26 €, online 15 €, juristische Person 31 €; Köln 26 € bzw. 33 €)."
    );
  }
  L.push("");

  L.push("4. Summe Formalitäten");
  L.push(`Notar, Register und Gewerbeanzeige zusammen: ${euro(r.summe)}`);
  L.push("");

  L.push("5. Variable Startkosten (deine Angaben)");
  if (variable.length) {
    variable.forEach((i) => L.push(`- ${i.label}: ${euro(i.amount)}`));
    L.push(`Summe variable Kosten: ${euro(variableSum)}`);
  } else {
    L.push("Keine variablen Kosten angegeben.");
  }
  L.push("");

  L.push("6. Gründungsbudget");
  L.push(`Formalitäten + variable Kosten: ${euro(cent(r.summe + variableSum))}`);
  if (r.art) L.push(`Dazu kommt das Stammkapital von ${euro(r.stammkapital)}. Es ist kein Aufwand, sondern bleibt als Guthaben in der Gesellschaft.`);
  L.push("");

  L.push("7. Stammkapital");
  L.push(STAMMKAPITAL[r.form]);
  L.push("");

  L.push("8. Was nicht gerechnet ist");
  L.push(
    "Dokumentenpauschale für Abschriften, ein gesonderter Beschluss zur Geschäftsführerbestellung außerhalb von Satzung oder Musterprotokoll, " +
      "Beratung über die Beurkundung hinaus, Sachgründung, Transparenzregister, IHK-Beitrag und Kontoführung. " +
      "Verbindlich ist die Kostenberechnung deines Notars und die Rechnung des Registergerichts."
  );
  r.hinweise.forEach((h) => L.push(h));
  L.push("");
  L.push("");
  L.push(DISCLAIMER);

  return L.join("\n");
}

/** Feste Beispielfälle für die Kurzantwort – aus derselben Funktion gerechnet wie der Rechner. */
export const GK_BEISPIELE: { label: string; eingabe: GkEingabe }[] = [
  { label: "UG, 1 Gesellschafter, 1.000 €, Musterprotokoll", eingabe: { form: "ug", gesellschafter: 1, stammkapital: 1_000, art: "muster" } },
  { label: "UG, 2 Gesellschafter, 1.000 €, Musterprotokoll", eingabe: { form: "ug", gesellschafter: 2, stammkapital: 1_000, art: "muster" } },
  { label: "GmbH, 1 Gesellschafter, 25.000 €, Musterprotokoll", eingabe: { form: "gmbh", gesellschafter: 1, stammkapital: 25_000, art: "muster" } },
  { label: "GmbH, 1 Gesellschafter, 25.000 €, eigene Satzung", eingabe: { form: "gmbh", gesellschafter: 1, stammkapital: 25_000, art: "satzung" } },
  { label: "GmbH, 2 Gesellschafter, 25.000 €, eigene Satzung", eingabe: { form: "gmbh", gesellschafter: 2, stammkapital: 25_000, art: "satzung" } },
];

const eur2 = (n: number) => n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

export function gkBeispielZeilen(): string[][] {
  return GK_BEISPIELE.map(({ label, eingabe: e }) => {
    const r = gruendungskosten(e);
    return [label, eur2(r.notarGebuehren), eur2(r.notarBrutto), eur2(r.gericht!.betrag), eur2(r.summe)];
  });
}

const kap = (d: ToolData) => d.legalForm === "ug" || d.legalForm === "gmbh";
const mitGesellschaftern = (d: ToolData) => kap(d) || d.legalForm === "gbr";

const B = Object.fromEntries(GK_BEISPIELE.map((x, i) => [["ug1", "ug2", "gmbh1m", "gmbh1s", "gmbh2s"][i], gruendungskosten(x.eingabe)]));

export const gruendungskostenConfig: ToolConfig = {
  slug: "gruendungskosten-rechner",
  shortTitle: "Gründungskosten",
  documentName: "Gründungskosten-Übersicht",
  icon: Calculator,
  accent: "from-emerald-500 to-teal-600",
  badge: "Kosten-Rechner",
  heroTitle: "Gründungskosten-Rechner für GmbH, UG und Einzelunternehmen",
  heroSubtitle:
    "Notar- und Handelsregisterkosten nach dem Gesetz gerechnet, nicht geschätzt: jede Position mit Paragraf, dazu deine eigenen Startkosten. Die Beispielwerte stehen direkt unten; deine eigene Rechnung gibt es einmal kostenlos gegen E-Mail.",
  resultFilename: "gruendungskosten",
  format: "rechner",
  stand: GK_STAND,
  kurzantwort: {
    titel: "Was kostet die Gründung?",
    text: [
      `Eine UG mit einem Gesellschafter, 1.000 € Stammkapital und Musterprotokoll kostet ${eur2(B.ug1.summe)} an Notar und Handelsregister. Eine GmbH mit 25.000 € Stammkapital kostet ${eur2(B.gmbh1m.summe)} mit Musterprotokoll und ${eur2(B.gmbh2s.summe)} mit zwei Gesellschaftern und eigener Satzung. Ein Einzelunternehmen zahlt nur die Gewerbeanzeige, zum Beispiel 26 € in Berlin und Köln.`,
      "Die Beträge folgen aus dem Gerichts- und Notarkostengesetz (GNotKG, Tabelle B in der seit 01.06.2025 geltenden Fassung) und der Handelsregistergebührenverordnung. Die Gebühren sind gesetzlich festgelegt, deshalb fallen sie für dieselbe Gründung bei jedem Notar gleich aus.",
    ],
    tabelle: {
      kopf: ["Fall (Bargründung)", "Notar netto", "Notar brutto*", "Handelsregister", "Summe"],
      zeilen: gkBeispielZeilen(),
    },
    fussnote:
      "* mit Auslagenpauschale (20 % der Gebühren, höchstens 20 € je Verfahren) und 19 % Umsatzsteuer. Ohne Gewerbeanzeige, ohne Dokumentenpauschale und ohne gesonderten Beschluss zur Geschäftsführerbestellung. Das Stammkapital ist kein Aufwand und deshalb nicht enthalten.",
  },
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
        {
          name: "gesellschafter",
          label: "Zahl der Gesellschafter",
          type: "select",
          colSpan: 1,
          condition: mitGesellschaftern,
          help: "Bei UG und GmbH kostet die Beurkundung mit einem Gesellschafter die 1,0-Gebühr, mit mehreren die 2,0-Gebühr.",
          options: [
            { value: "1", label: "1 (nur UG/GmbH)" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
            { value: "4", label: "4" },
            { value: "5", label: "5" },
          ],
        },
        {
          name: "stammkapital",
          label: "Stammkapital in €",
          type: "text",
          placeholder: "z. B. 25000",
          colSpan: 1,
          condition: kap,
          help: "GmbH mindestens 25.000 €, UG 1 € bis 24.999 €.",
        },
        {
          name: "art",
          label: "Gründungsart",
          type: "select",
          colSpan: 2,
          condition: kap,
          help: "Das Musterprotokoll geht nur mit höchstens drei Gesellschaftern und einem Geschäftsführer und lässt keine eigenen Regeln zu.",
          options: [
            { value: "muster", label: "Musterprotokoll (vereinfachtes Verfahren)" },
            { value: "satzung", label: "Individueller Gesellschaftsvertrag (Satzung)" },
          ],
        },
        {
          name: "register",
          label: "Freiwillige Eintragung ins Register (e. K. bzw. eGbR) mitrechnen",
          type: "checkbox",
          colSpan: 2,
          condition: (d) => d.legalForm === "einzel" || d.legalForm === "gbr",
        },
        {
          name: "gewerbe",
          label: "Gebühr der Gewerbeanzeige in deiner Gemeinde (€)",
          type: "text",
          placeholder: "z. B. 26",
          colSpan: 1,
          help: "Legt jede Gemeinde selbst fest. Berlin: 26 €, online 15 €, juristische Person 31 €. Köln: 26 € bzw. 33 €. Freiberufler: leer lassen.",
        },
        {
          name: "weitereNotar",
          label: "Weitere Notarkosten brutto (€, optional)",
          type: "text",
          placeholder: "z. B. 0",
          colSpan: 1,
          condition: (d) => kap(d) || d.register === true,
          help: "Falls dein Notar zusätzliche Positionen angekündigt hat, etwa einen gesonderten Beschluss zur Geschäftsführerbestellung.",
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
      heading: "Wie rechnet der Gründungskosten-Rechner?",
      body: [
        "Notargebühren sind in Deutschland keine Verhandlungssache. Sie ergeben sich aus dem Geschäftswert, einem Gebührensatz und der Tabelle B des GNotKG. Der Rechner bildet genau diese drei Schritte nach und zeigt zu jeder Position die Nummer des Kostenverzeichnisses (KV).",
        "Der Geschäftswert ist bei UG und GmbH das Stammkapital. Bei einem individuellen Gesellschaftsvertrag gilt ein Mindestwert von 30.000 € (§ 107 Abs. 1 GNotKG), beim Musterprotokoll gilt er nicht (§ 105 Abs. 6 GNotKG). Deshalb ist die UG mit Musterprotokoll so günstig: Bei 1.000 € Stammkapital greifen fast nur die Mindestgebühren.",
        "Der Gebührensatz hängt davon ab, wer gründet. Gründet eine Person allein, ist das eine einseitige Erklärung mit der 1,0-Gebühr (KV 21200, mindestens 60 €). Gründen mehrere, ist es ein Vertrag mit der 2,0-Gebühr (KV 21100, mindestens 120 €). Die 1,0-Gebühr beträgt bei 25.000 € Geschäftswert 115 € und bei 30.000 € 125 €.",
        "Dazu kommen die Anmeldung zum Handelsregister (Entwurf mit Beglaubigung, 0,5-Gebühr, KV 24102), die Strukturdaten für das Gericht (0,2-Gebühr, KV 22114) und bei eigener Satzung die Gesellschafterliste (0,5-Gebühr, bei einem Gesellschafter 0,3; KV 22110, 22111). Beim Musterprotokoll entfällt die Liste, weil das Protokoll selbst als Gesellschafterliste gilt (§ 2 Abs. 1a GmbHG).",
      ],
    },
    {
      heading: "Rechenbeispiel: GmbH mit zwei Gesellschaftern und eigener Satzung",
      body: [
        "Stammkapital 25.000 €, Bargründung. Der Geschäftswert wird auf den Mindestwert von 30.000 € angehoben, die 1,0-Gebühr daraus beträgt 125 €.",
      ],
      tabelle: {
        kopf: ["Position", "Grundlage", "Betrag"],
        zeilen: [
          ...B.gmbh2s.notar.map((p) => [p.label, p.norm, eur2(p.betrag)]),
          ["Auslagenpauschale", "KV 32005 GNotKG", eur2(B.gmbh2s.auslagen)],
          ["Umsatzsteuer 19 %", "KV 32014 GNotKG", eur2(B.gmbh2s.ust)],
          ["Notar brutto", "", eur2(B.gmbh2s.notarBrutto)],
          ["Handelsregister", "Nr. 2100 HRegGebV", eur2(B.gmbh2s.gericht!.betrag)],
          ["Summe Notar und Register", "", eur2(B.gmbh2s.summe)],
        ],
      },
    },
    {
      heading: "Was kostet das Handelsregister?",
      body: [
        "Das Registergericht berechnet feste Beträge nach der Handelsregistergebührenverordnung. Die Ersteintragung einer GmbH oder UG kostet 225 € (Nr. 2100), mit Sacheinlage 360 € (Nr. 2101). Der Rechner rechnet die Bargründung. Die UG darf ohnehin nur bar gegründet werden (§ 5a Abs. 2 GmbHG).",
        "Wer sich als Einzelunternehmer freiwillig als eingetragener Kaufmann (e. K.) eintragen lässt, zahlt 105 € (Nr. 1100). Eine GbR, die ins Gesellschaftsregister will (eGbR), zahlt 150 € bei bis zu drei Gesellschaftern und 60 € für jeden weiteren (Nr. 1101, 1102). In beiden Fällen kommt die Anmeldung über den Notar dazu; der Rechner zeigt sie, wenn du das Häkchen setzt.",
      ],
    },
    {
      heading: "Was kostet die Gewerbeanmeldung?",
      body: [
        "Die Gebühr der Gewerbeanzeige legt jede Gemeinde selbst fest, eine bundesweite Zahl gibt es nicht. Deshalb ist sie im Rechner ein Eingabefeld und kein Schätzwert. Zwei amtliche Beispiele: Berlin nimmt 26 € je Einzelgewerbe und je Gesellschafter einer Personengesellschaft, 15 € bei der Online-Anzeige und 31 € für eine juristische Person mit einem gesetzlichen Vertreter. Köln nimmt 26 € je Anmeldung und 33 € für juristische Personen.",
        "Bei einer GbR zeigt jeder Gesellschafter das Gewerbe selbst an, die Gebühr fällt also mehrfach an. Freiberufler zeigen kein Gewerbe an und melden ihre Tätigkeit nur dem Finanzamt, das kostet nichts.",
      ],
    },
    {
      heading: "Was der Rechner nicht rechnet",
      body: [
        "Vier Dinge stehen auf fast jeder Notarrechnung, lassen sich aber nicht vorab aus dem Gesetz bestimmen. Erstens die Dokumentenpauschale für Abschriften, die von der Seitenzahl abhängt. Zweitens ein gesonderter Gesellschafterbeschluss zur Bestellung des Geschäftsführers: Steht die Bestellung nicht in der Satzung selbst, ist der Beschluss ein eigener Beurkundungsgegenstand und kostet zusätzlich. Frag deinen Notar vorher, wie er es handhabt. Drittens Beratung, die über die Beurkundung hinausgeht. Viertens die tatsächlichen Auslagen, wenn der Notar sie statt der Pauschale abrechnet.",
        "Nicht enthalten sind außerdem laufende Kosten nach der Gründung: Transparenzregister, IHK-Beitrag, Kontoführung, Buchhaltung und Jahresabschluss. Für Notarkosten, die du schon kennst, gibt es das Feld „Weitere Notarkosten“.",
      ],
    },
    {
      heading: "Stammkapital: UG und GmbH im Vergleich",
      body: [
        "Das Stammkapital ist kein Teil der Gründungskosten. Es liegt nach der Einzahlung auf dem Geschäftskonto und darf für den Betrieb ausgegeben werden. Die GmbH braucht mindestens 25.000 €, vor der Anmeldung müssen 12.500 € eingezahlt sein (§§ 5, 7 GmbHG). Die UG geht ab 1 €, das Kapital muss aber voll eingezahlt sein, und ein Viertel des Jahresüberschusses fließt in eine gesetzliche Rücklage (§ 5a GmbHG).",
        "Rechne bei der UG trotzdem nicht mit 1 €. Schon die Gründungskosten aus der Tabelle oben übersteigen dann das Kapital, und die Gesellschaft startet überschuldet. Das Musterprotokoll erlaubt der Gesellschaft, Gründungskosten bis 300 € zu tragen, höchstens aber bis zur Höhe des Stammkapitals.",
      ],
    },
    {
      heading: "Typische Fehler bei der Kostenplanung",
      body: [
        "Mit alten Zahlen planen: Die Gebührentabelle des GNotKG wurde zum 01.06.2025 angehoben (BGBl. 2025 I Nr. 109), und die Eintragung einer GmbH oder UG kostet nach der aktuellen Verordnung 225 €. Ältere Ratgeber und Rechner nennen teils andere Werte.",
        `Das Musterprotokoll nur wegen der Kosten wählen: Es spart bei der GmbH mit einem Gesellschafter ${eur2(B.gmbh1s.summe - B.gmbh1m.summe)} gegenüber der eigenen Satzung. Dafür lässt es keine eigenen Regeln zu, etwa zu Vinkulierung, Abfindung oder mehreren Geschäftsführern. Jede spätere Änderung des Gesellschaftsvertrags muss wieder beurkundet und eingetragen werden.`,
        "Die Liquidität vergessen: Die Formalitäten sind der kleinste Block. Miete, Versicherungen und dein Lebensunterhalt laufen ab dem ersten Monat, der Umsatz oft erst später. Trage deshalb im zweiten Schritt auch einen Puffer ein.",
        "Online-Gründung mit „billiger“ verwechseln: Die Beurkundung per Videokommunikation ist erlaubt (§ 2 Abs. 3 GmbHG). Die Gebühren bleiben gleich, dazu kommt eine Pauschale für das Videosystem der Bundesnotarkammer: 25 € für die Beurkundung und 8 € für die Beglaubigung einer Signatur (KV 32016 GNotKG). Der Rechner rechnet die Gründung vor Ort.",
      ],
    },
    {
      heading: "Gründung im EU-Ausland",
      body: [
        "Der Rechner gilt nur für Gründungen nach deutschem Recht. Für eine SARL in Frankreich, eine S.r.l. in Italien oder eine S.L. in Spanien gelten andere Mindestkapitalien, Register und Gebühren, die hier nicht gerechnet werden. Einen Einstieg je Land gibt das Portal „Your Europe“ der EU-Kommission.",
      ],
    },
  ],
  links: [
    { to: "/rechtsform-finden", label: "Rechtsform-Test: Einzelunternehmen, UG oder GmbH?" },
    { to: "/ratgeber/gmbh-gruenden-kosten-2026", label: "Ratgeber: GmbH gründen – Kosten 2026" },
    { to: "/vorlagen/gmbh-gesellschaftsvertrag", label: "Vorlage: GmbH-Gesellschaftsvertrag" },
    { to: "/vorlagen/ug-gesellschaftsvertrag", label: "Vorlage: UG-Gesellschaftsvertrag" },
    { to: "/tools/gewerbeanmeldung-wizard", label: "Gewerbeanmeldung Schritt für Schritt" },
    { to: "/elster-zertifikat-beantragen", label: "ELSTER-Zertifikat beantragen" },
    { to: "/businessplan-erstellen", label: "Businessplan mit Finanzteil erstellen" },
    { to: "/tools/runway-rechner", label: "Runway-Rechner: Wie lange reicht das Geld?" },
  ],
  quellen: [
    { label: "§ 34 GNotKG – Wertgebühren, Tabelle B", url: "https://www.gesetze-im-internet.de/gnotkg/__34.html" },
    { label: "Anlage 2 GNotKG – Gebührentabelle (BGBl. 2025 I Nr. 109)", url: "https://www.gesetze-im-internet.de/gnotkg/anlage_2.html" },
    { label: "Anlage 1 GNotKG – Kostenverzeichnis (KV 21100, 21200, 22110–22114, 24102, 32005, 32014)", url: "https://www.gesetze-im-internet.de/gnotkg/anlage_1.html" },
    { label: "KostBRÄG 2025 (BGBl. 2025 I Nr. 109) – Änderung des GNotKG, in Kraft seit 01.06.2025", url: "https://www.recht.bund.de/bgbl/1/2025/109/VO.html" },
    { label: "Musterprotokoll, Anlage 1 zum GmbHG (Gründungskosten bis 300 €)", url: "https://www.gesetze-im-internet.de/gmbhg/anlage_1.html" },
    { label: "§ 105 GNotKG – Geschäftswert der Registeranmeldung", url: "https://www.gesetze-im-internet.de/gnotkg/__105.html" },
    { label: "§ 107 GNotKG – Geschäftswert des Gesellschaftsvertrags", url: "https://www.gesetze-im-internet.de/gnotkg/__107.html" },
    { label: "Handelsregistergebührenverordnung – Gebührenverzeichnis (Nr. 1100, 1101, 2100, 2101)", url: "https://www.gesetze-im-internet.de/hreggebv/anlage.html" },
    { label: "§ 2 GmbHG – Musterprotokoll und Online-Gründung", url: "https://www.gesetze-im-internet.de/gmbhg/__2.html" },
    { label: "§ 5a GmbHG – Unternehmergesellschaft", url: "https://www.gesetze-im-internet.de/gmbhg/__5a.html" },
    { label: "§ 7 GmbHG – Einzahlung vor der Anmeldung", url: "https://www.gesetze-im-internet.de/gmbhg/__7.html" },
    { label: "Berlin: Gewerbeanzeige, Gebühren", url: "https://service.berlin.de/dienstleistung/121921/" },
    { label: "Köln: Gewerbeanmeldung, Gebühren", url: "https://www.stadt-koeln.de/service/produkte/00268/index.html" },
    { label: "Your Europe (EU-Kommission): Unternehmen gründen", url: "https://europa.eu/youreurope/business/lifecycle/starting/startups/index_de.htm" },
  ],
  seo: {
    title: "Gründungskosten-Rechner 2026: GmbH, UG & Co. | GründerX",
    description:
      "Gründungskosten berechnen: Notar und Handelsregister für GmbH und UG nach GNotKG und HRegGebV, jede Position mit Paragraf. Mit Tabelle und Rechenbeispiel.",
    keywords:
      "gründungskosten rechner, gründungskosten gmbh, gründungskosten ug, ug gründen kosten, notarkosten gmbh gründung, handelsregister kosten",
    faqs: [
      {
        q: "Ist der Gründungskosten-Rechner kostenlos?",
        a: "Die Tabelle mit den Beispielfällen und der Rechenweg stehen frei auf der Seite. Eine eigene Berechnung mit deinen Zahlen ist einmal kostenlos: Du gibst deine E-Mail-Adresse an und bekommst die Übersicht samt PDF, ohne Konto und ohne Zahlung. Weitere Berechnungen gibt es mit dem GründerX-Abo.",
      },
      {
        q: "Was kostet die Gründung einer GmbH?",
        a: `Mit 25.000 € Stammkapital kosten Notar und Handelsregister zusammen ${eur2(B.gmbh1m.summe)} (ein Gesellschafter, Musterprotokoll), ${eur2(B.gmbh1s.summe)} (ein Gesellschafter, eigene Satzung) oder ${eur2(B.gmbh2s.summe)} (zwei Gesellschafter, eigene Satzung). Dazu kommen die Gewerbeanzeige deiner Gemeinde und Positionen, die vom Einzelfall abhängen, etwa die Dokumentenpauschale. Das Stammkapital selbst ist kein Aufwand.`,
      },
      {
        q: "Was kostet die Gründung einer UG?",
        a: `Mit Musterprotokoll und 1.000 € Stammkapital ${eur2(B.ug1.summe)} bei einem Gesellschafter und ${eur2(B.ug2.summe)} bei zwei Gesellschaftern, jeweils Notar brutto plus 225 € Handelsregister. Bei so kleinem Stammkapital greifen die Mindestgebühren des GNotKG.`,
      },
      {
        q: "Sind die berechneten Notarkosten verbindlich?",
        a: "Die Gebühren selbst stehen im Gesetz und sind für jeden Notar gleich. Nicht vorab bestimmbar sind die Dokumentenpauschale, ein gesonderter Beschluss zur Geschäftsführerbestellung und Beratung über die Beurkundung hinaus. Verbindlich ist deshalb erst die Kostenberechnung deines Notars.",
      },
      {
        q: "Warum ist das Musterprotokoll günstiger?",
        a: "Beim Musterprotokoll gilt der Mindestgeschäftswert von 30.000 € nicht, und es ersetzt die Gesellschafterliste. Bei der GmbH mit 25.000 € Stammkapital ist der Unterschied klein, bei der UG mit wenig Stammkapital groß. Das Musterprotokoll geht nur mit höchstens drei Gesellschaftern und einem Geschäftsführer.",
      },
      {
        q: "Brauche ich für eine UG viel Kapital?",
        a: "Rechtlich reicht 1 € Stammkapital, praktisch solltest du genug einplanen, um Gründungs- und Anlaufkosten zu decken. Die UG muss zudem ein Viertel des Jahresüberschusses als Rücklage ansparen, bis das Stammkapital per Kapitalerhöhung 25.000 € erreicht (§ 5a Abs. 3 und 5 GmbHG).",
      },
    ],
  },
};
