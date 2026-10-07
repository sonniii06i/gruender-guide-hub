// BAFA-Beratungsförderung und Einstiegsgeld – Rechner nach Primärquellen (Stand 07.10.2026).

// ============ BAFA „Förderung von Unternehmensberatungen für KMU“ ============
// Richtlinie vom 14.12.2022, geändert 12.12.2024 (BAnz AT 23.12.2024 B1).
// Eine Bemessungsgrundlage für alle KMU; die alte Staffel (Jungunternehmen /
// Bestandsunternehmen / 90 % in Schwierigkeiten) gilt NICHT mehr.

export const BAFA = {
  bemessungMax: 3500, // € förderfähige Beratungskosten (RL Nr. 5.2)
  satzOst: 0.8, // neue Länder ohne Berlin/Region Leipzig, plus Regionen Lüneburg und Trier
  satzWest: 0.5, // alte Länder inkl. Berlin und Region Leipzig, ohne Lüneburg/Trier
  antragBis: "2026-12-31", // RL Nr. 8
  proJahr: 2,
  gesamt: 5,
  maxTage: 5, // Beratungstage je Beratung (RL Nr. 2.1)
  nachweisMonate: 6, // Verwendungsnachweis nach Informationsschreiben (RL Nr. 7.2.3)
  deMinimis: 300000, // € in 3 Jahren, VO (EU) 2023/2831
} as const;

export const BAFA_OST = new Set(["BB", "MV", "SN", "ST", "TH"]);

export type BafaRegion = { land: string; sonderregion: "keine" | "leipzig" | "lueneburg" | "trier" };

export function bafaSatz(r: BafaRegion): number {
  if (r.sonderregion === "lueneburg" || r.sonderregion === "trier") return BAFA.satzOst;
  if (r.sonderregion === "leipzig") return BAFA.satzWest;
  return BAFA_OST.has(r.land) ? BAFA.satzOst : BAFA.satzWest;
}

export type BafaRechnung = { bemessung: number; satz: number; zuschuss: number; eigenanteil: number; gezahlt: number };

/**
 * Seit 15.11.2025 rechnet das BAFA bei nicht vorsteuerabzugsberechtigten
 * Antragstellern mit dem Bruttobetrag (BAFA-Seite). Wir deckeln auch dann bei
 * 3.500 € – ob der Deckel brutto gilt, ist amtlich nicht ausdrücklich geregelt.
 */
export function rechneBafa(nettoHonorar: number, region: BafaRegion, vorsteuerabzug: boolean, ustSatz = 0.19): BafaRechnung {
  const netto = Math.max(0, nettoHonorar || 0);
  const brutto = netto * (1 + ustSatz);
  const basis = vorsteuerabzug ? netto : brutto;
  const bemessung = Math.min(basis, BAFA.bemessungMax);
  const satz = bafaSatz(region);
  const zuschuss = Math.round(bemessung * satz * 100) / 100;
  // Gezahlt wird die volle Rechnung inkl. USt; die Vorsteuer kommt bei Abzugsberechtigten vom Finanzamt zurück.
  const kostenEffektiv = vorsteuerabzug ? netto : brutto;
  return { bemessung, satz, zuschuss, eigenanteil: Math.max(0, kostenEffektiv - zuschuss), gezahlt: brutto };
}

export type BafaAntworten = {
  kmu: boolean | null;
  sitzDe: boolean | null;
  ausgeschlosseneBranche: boolean | null; // Berater, StB, RA, Notar, WP, gemeinnützig, Verein, Stiftung …
  insolvenz: boolean | null;
  beratungBegonnen: boolean | null; // schon Beratungsvertrag unterschrieben?
  ueberwiegendRechtSteuer: boolean | null; // Beratung überwiegend Rechts-/Steuer-/Versicherungs-/Fördermittelfragen?
  gruendungsDatum: string | null; // ISO
};

export type BafaBefund = { stufe: "ok" | "warnung" | "ausschluss"; text: string; quelle: string };

export function pruefeBafa(a: BafaAntworten, heute: string): { ampel: "gruen" | "gelb" | "rot" | "offen"; befunde: BafaBefund[] } {
  const b: BafaBefund[] = [];
  if (heute > BAFA.antragBis)
    b.push({ stufe: "ausschluss", text: "Die Richtlinie gilt nur für Anträge bis 31.12.2026. Eine Nachfolgeregelung ist noch nicht veröffentlicht.", quelle: "RL Nr. 8" });
  else {
    const tage = Math.ceil((Date.parse(BAFA.antragBis) - Date.parse(heute)) / 864e5);
    b.push({
      stufe: tage <= 60 ? "warnung" : "ok",
      text: `Anträge nur noch bis 31.12.2026 – noch ${tage} Tage. Eine Nachfolgeregelung ist bisher nicht veröffentlicht.`,
      quelle: "RL Nr. 8",
    });
  }
  if (a.kmu === false) b.push({ stufe: "ausschluss", text: "Gefördert werden nur KMU: unter 250 Beschäftigte und höchstens 50 Mio. € Umsatz oder 43 Mio. € Bilanzsumme.", quelle: "RL Nr. 3.1" });
  if (a.sitzDe === false) b.push({ stufe: "ausschluss", text: "Sitz und Geschäftsbetrieb müssen in Deutschland liegen.", quelle: "RL Nr. 3.1" });
  if (a.ausgeschlosseneBranche)
    b.push({
      stufe: "ausschluss",
      text: "Ausgeschlossen sind u. a. Unternehmens- und Steuerberater, Rechtsanwälte, Notare, Wirtschaftsprüfer, Insolvenzverwalter, gemeinnützige Unternehmen, Vereine und Stiftungen sowie Landwirtschaft und Fischerei.",
      quelle: "RL Nr. 3.2",
    });
  if (a.insolvenz) b.push({ stufe: "ausschluss", text: "Unternehmen im Insolvenzverfahren oder mit Pflicht zur Vermögensauskunft sind ausgeschlossen.", quelle: "RL Nr. 3.2" });
  if (a.beratungBegonnen)
    b.push({
      stufe: "ausschluss",
      text: "Die Beratung darf erst nach dem Informationsschreiben der Leitstelle beginnen – schon ein unterschriebener Beratungsvertrag zählt als Beginn.",
      quelle: "RL Nr. 7.2.2",
    });
  else if (a.beratungBegonnen === false) b.push({ stufe: "ok", text: "Beratung noch nicht begonnen – Antrag rechtzeitig möglich.", quelle: "RL Nr. 7.2.2" });
  if (a.ueberwiegendRechtSteuer)
    b.push({
      stufe: "ausschluss",
      text: "Nicht gefördert werden Beratungen, die überwiegend Rechts-, Steuer-, Versicherungs- oder Fördermittelfragen betreffen.",
      quelle: "RL Nr. 2.2",
    });
  if (a.gruendungsDatum) {
    const jung = Date.parse(heute) - Date.parse(a.gruendungsDatum) < 365 * 864e5;
    b.push(
      jung
        ? {
            stufe: "warnung",
            text: "Im ersten Jahr nach der Gründung ist ein kostenloses Informationsgespräch bei einem Regionalpartner Pflicht – frühestens 3 Monate vor dem Antrag.",
            quelle: "RL Nr. 7.1",
          }
        : { stufe: "ok", text: "Älter als ein Jahr – kein Pflicht-Informationsgespräch.", quelle: "RL Nr. 7.1" },
    );
  }
  const offen = [a.kmu, a.sitzDe, a.ausgeschlosseneBranche, a.insolvenz, a.beratungBegonnen, a.ueberwiegendRechtSteuer].some((x) => x === null);
  const ampel = b.some((x) => x.stufe === "ausschluss") ? "rot" : offen ? "offen" : b.some((x) => x.stufe === "warnung") ? "gelb" : "gruen";
  return { ampel, befunde: b };
}

// ============ Einstiegsgeld § 16b SGB II / ESGV ============
// Regelbedarfe 2026 (RBSFV 2026, Nullrunde): Stufe 1–6.

export const REGELBEDARF_2026 = { 1: 563, 2: 506, 3: 451, 4: 471, 5: 390, 6: 357 } as const;
export const EINSTIEGSGELD = { maxMonate: 24, sachgueterZuschussMax: 5000 } as const;

export type EinstiegsgeldEingabe = {
  /** Regelbedarfsstufe des Antragstellers (1 alleinstehend, 2 Paar). */
  stufe: 1 | 2 | 3 | 4 | 5 | 6;
  /** Weitere leistungsberechtigte Personen in der Bedarfsgemeinschaft. */
  weiterePersonen: number;
  /** Monate arbeitslos vor der Gründung. */
  monateArbeitslos: number;
  /** In der Person liegende Vermittlungshemmnisse (dann Zuschlag schon ab 6 Monaten). */
  vermittlungshemmnisse: boolean;
  /** Geplante Förderdauer in Monaten (max. 24). */
  monate: number;
};

export type EinstiegsgeldRechnung = {
  grund: number;
  zuschlagLangzeit: number;
  zuschlagPersonen: number;
  monatlich: number;
  gedeckelt: boolean;
  pauschalMax: number;
  monate: number;
  gesamt: number;
};

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Höchstbeträge nach § 1 ESGV. Die tatsächliche Höhe legt das Jobcenter nach Ermessen fest. */
export function rechneEinstiegsgeld(e: EinstiegsgeldEingabe): EinstiegsgeldRechnung {
  const rbs1 = REGELBEDARF_2026[1];
  const grund = r2(REGELBEDARF_2026[e.stufe] * 0.5); // § 1 Abs. 2: 50 % des maßgebenden Regelbedarfs
  const langzeit = e.monateArbeitslos >= 24 || (e.vermittlungshemmnisse && e.monateArbeitslos >= 6);
  const zuschlagLangzeit = langzeit ? r2(rbs1 * 0.2) : 0; // § 1 Abs. 3
  const zuschlagPersonen = r2(Math.max(0, Math.floor(e.weiterePersonen || 0)) * rbs1 * 0.1); // § 1 Abs. 4
  const roh = grund + zuschlagLangzeit + zuschlagPersonen;
  const monatlich = r2(Math.min(roh, rbs1)); // § 1 Abs. 5: höchstens 100 % RBS 1
  const monate = Math.min(EINSTIEGSGELD.maxMonate, Math.max(0, Math.floor(e.monate || 0)));
  return {
    grund,
    zuschlagLangzeit,
    zuschlagPersonen,
    monatlich,
    gedeckelt: roh > rbs1,
    pauschalMax: r2(rbs1 * 0.75), // § 2 Abs. 2
    monate,
    gesamt: r2(monatlich * monate),
  };
}
