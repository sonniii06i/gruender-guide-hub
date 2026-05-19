/**
 * Deutsche Steuer-Rechen-Bibliothek (zentral, Stand 2026).
 *
 * Wird von Cockpit-Tools genutzt: AuszahlungOptimizer, SalaryDividendOptimizer,
 * PreYearEndCheck, IabRechner, QuartalsSteuer, KfzOptimizer.
 *
 * Single source of truth — keine Duplikation von Steuer-Konstanten/Formeln.
 */

// === Konstanten 2026 ============================================

/** Solidaritätszuschlag-Satz auf KSt / ESt (über Freigrenze). */
export const SOLZ_RATE = 0.055;

/** Solidaritätszuschlag-Freigrenze 2026 für Single (ab dieser ESt → 5,5 %). */
export const SOLZ_FREIGRENZE_SINGLE = 19950;

/** Körperschaftsteuer-Satz seit 2008. */
export const KST_RATE = 0.15;

/** Gewerbesteuer-Messzahl §11 GewStG. */
export const GEWST_MESSZAHL = 0.035;

/** Standard-GewSt-Hebesatz für Berechnungen ohne expliziten Hebesatz. */
export const GEWST_HEBESATZ_DEFAULT = 400;

/** GewSt-Freibetrag für natürliche Personen / Personengesellschaften §11 (1) GewStG. */
export const GEWST_FREIBETRAG_NATUERLICH = 24500;

/** Abgeltungssteuer KapErtragsteuer + SolZ (25 % × 1,055). */
export const ABG_ST = 0.26375;

/** Teileinkünfteverfahren-Quote — 60 % der Dividende steuerpflichtig (§3 Nr. 40 EStG). */
export const TEV_QUOTE = 0.6;

/** §8b KStG Schein-Dividende — 5 % der Holding-Dividende werden besteuert. */
export const HOLDING_SCHEIN_DIVIDENDE = 0.05;

/** GewSt-Anrechnung auf ESt-Faktor §35 EStG. Seit 2020 (2. CoronaSteuerhilfeG) 4,0 — bei Hebesatz ≤400% effektiv neutral. */
export const GEWST_ANRECHNUNG_FAKTOR = 4.0;

/** §7g EStG Investitionsabzugsbetrag — 50 % der geplanten Investitionen abziehbar. */
export const IAB_QUOTE = 0.5;

/** §7g EStG IAB-Höchstbetrag pro Betrieb (kumuliert). */
export const IAB_MAX = 200000;

/** §7g EStG Voraussetzung Einzel/Freiberuf: max Gewinn vor IAB. */
export const IAB_GEWINN_GRENZE_EINZEL = 200000;

/** §7g EStG Voraussetzung GmbH/UG: max Bilanzsumme. */
export const IAB_BILANZ_GRENZE_GMBH = 235000;

/** §7g EStG Frist — Investition muss innerhalb von 3 Wirtschaftsjahren erfolgen. */
export const IAB_FRIST_JAHRE = 3;

/** §6 (2) EStG Geringwertige Wirtschaftsgüter — Sofortabschreibung-Schwelle. */
export const GWG_SCHWELLE = 800;

/** §23 EStG Privates Veräußerungsgeschäft — Freigrenze seit 2024. */
export const VERAUSSERUNG_FREIGRENZE = 1000;

/** §23 EStG — Haltefrist für Steuerfreiheit (1 Jahr für Crypto, 10 für Immobilie). */
export const VERAUSSERUNG_HALTEFRIST_TAGE = 365;

/** Beitragsbemessungsgrenze RV 2026 (jährlich). Seit 2025 BUNDESEINHEITLICH — keine West/Ost-Trennung mehr.
 *  Quelle: Bundesregierung. Vorjahr 2025: 96.600 € (West). */
export const BBG_RV_WEST_JAHR = 101400; // 8.450 €/Monat × 12

/** Beitragsbemessungsgrenze KV/PV 2026 (jährlich). Quelle: TK Firmenkunden. */
export const BBG_KV_JAHR = 66150;

/** Sozialversicherung KV+PV gesamt-Quote (kinderlos, Stand 2026). */
export const SV_QUOTE_KV_PV = 0.205;

/** Sozialversicherung RV+AV gesamt-Quote (Stand 2026). */
export const SV_QUOTE_RV_AV = 0.212;

/** §3 Nr. 63 EStG bAV — 8 % BBG-RV steuerfrei (Cap), 4 % davon zusätzlich SV-frei.
 *  2026: 8 % × 101.400 = 8.112 € steuerfrei, 4 % × 101.400 = 4.056 € SV-frei. */
export const BAV_STEUERFREI_QUOTE = 0.08;
export const BAV_SV_FREI_QUOTE = 0.04;

/** bAV Krankenversicherungs-Freibetrag (§226 (2) SGB V): 1/20 Bezugsgröße 2026 = 197,75 €/Monat.
 *  Vorher: 2025 = 187,25 €. KV-Beiträge erst auf den Teil ÜBER dem Freibetrag.
 *  Quelle: TK Firmenkunden, AOK. Pro Jahr: 2.373 €. */
export const BAV_KV_FREIBETRAG_MONAT_2026 = 197.75;
export const BAV_KV_FREIBETRAG_JAHR_2026 = 2373;

/** §10 (3) EStG Rürup-Höchstbetrag 2026 (Single). 2025 war 29.344 €. */
export const RUERUP_MAX_SINGLE = 30826;
export const RUERUP_MAX_VERHEIRATET = 61652;

/** Riester-Höchstbetrag §10a EStG. */
export const RIESTER_MAX = 2100;

/** Riester-Grundzulage §83 EStG. */
export const RIESTER_GRUNDZULAGE = 175;

/** Riester-Kinderzulage §85 EStG.
 *  Geborene ab 01.01.2008: 300 € · Geborene vor 2008: 185 €. */
export const RIESTER_KIND_ZULAGE_AB_2008 = 300;
export const RIESTER_KIND_ZULAGE_VOR_2008 = 185;

/** Riester-Sockelbetrag §86 (1) EStG: Mindestbeitrag 60 €/Jahr, sonst Zulage anteilig gekürzt. */
export const RIESTER_SOCKELBETRAG = 60;
/** Mindesteigenbeitrag-Quote vom Vorjahres-Brutto (Sozialversicherungspflichtigen Einkommen) abzgl. Zulagen. */
export const RIESTER_MINDEST_EIGENBEITRAG_QUOTE = 0.04;

// === Funktionen ==================================================

/**
 * §32a EStG 2026 Einkommensteuer-Tarif (Grundtarif).
 * @param zvE zu versteuerndes Einkommen
 * @returns Einkommensteuer in € (gerundet)
 */
export function progressionESt(zvE: number): number {
  if (zvE <= 12096) return 0;
  if (zvE <= 17443) {
    const y = (zvE - 12096) / 10000;
    return Math.round((932.3 * y + 1400) * y);
  }
  if (zvE <= 68480) {
    const z = (zvE - 17443) / 10000;
    return Math.round((176.64 * z + 2397) * z + 1015.13);
  }
  if (zvE <= 277825) return Math.round(0.42 * zvE - 10911.92);
  return Math.round(0.45 * zvE - 19246.67);
}

/**
 * Grenzsteuersatz-Schätzung an einer ZvE-Position (numerische Ableitung).
 * @param zvE zu versteuerndes Einkommen
 * @returns Grenzsteuersatz (z.B. 0.42 = 42 %)
 */
export function grenzSteuerSatz(zvE: number): number {
  const delta = 1000;
  return (progressionESt(zvE + delta) - progressionESt(zvE)) / delta;
}

/**
 * Solidaritätszuschlag auf eine ESt-/KSt-Last (vereinfacht mit Milderungszone).
 * @param steuer Berechnete ESt oder KSt
 * @returns SolZ in €
 */
export function solZ(steuer: number): number {
  if (steuer <= SOLZ_FREIGRENZE_SINGLE) return 0;
  if (steuer < 32000) {
    // Milderungszone vereinfacht linear interpoliert
    const ratio = (steuer - SOLZ_FREIGRENZE_SINGLE) / (32000 - SOLZ_FREIGRENZE_SINGLE);
    return steuer * SOLZ_RATE * ratio;
  }
  return steuer * SOLZ_RATE;
}

/**
 * Effektive KSt + GewSt + SolZ Rate für GmbH/UG basierend auf Hebesatz.
 * @param hebesatz GewSt-Hebesatz in Prozent (z.B. 400)
 * @returns Effektive Rate (z.B. 0.30 = 30 %)
 */
export function kstGewstRate(hebesatz: number = GEWST_HEBESATZ_DEFAULT): number {
  const kstSolz = KST_RATE * (1 + SOLZ_RATE); // KSt 15 % × 1,055 = 15,825 %
  const gewst = GEWST_MESSZAHL * (hebesatz / 100); // 3,5 % × Hebesatz
  return kstSolz + gewst;
}

/**
 * Effektive Steuer auf Holding-Dividende — §8b KStG Schachtelprivileg.
 * Nur 5 %-Schein-Dividende wird mit KSt+GewSt+SolZ besteuert.
 * @param hebesatz GewSt-Hebesatz
 * @returns Effektive Holding-Rate (typisch ~1,5 % bei Hebesatz 400)
 */
export function holdingRate(hebesatz: number = GEWST_HEBESATZ_DEFAULT): number {
  return HOLDING_SCHEIN_DIVIDENDE * kstGewstRate(hebesatz);
}

/**
 * GewSt für natürliche Person/Personengesellschaft (mit Freibetrag 24.500 €).
 * @param gewinn Gewerbe-Gewinn
 * @param hebesatz GewSt-Hebesatz
 * @returns Brutto-GewSt (vor §35 EStG-Anrechnung)
 */
export function gewStNatuerlich(gewinn: number, hebesatz: number = GEWST_HEBESATZ_DEFAULT): number {
  const gewstBasis = Math.max(0, gewinn - GEWST_FREIBETRAG_NATUERLICH);
  return gewstBasis * GEWST_MESSZAHL * (hebesatz / 100);
}

/**
 * GewSt-Messbetrag (vor Hebesatz-Anwendung) für §35 EStG-Anrechnung.
 * @param gewinn Gewerbe-Gewinn
 * @returns Messbetrag
 */
export function gewStMessbetrag(gewinn: number): number {
  const basis = Math.max(0, gewinn - GEWST_FREIBETRAG_NATUERLICH);
  return basis * GEWST_MESSZAHL;
}

/**
 * §35 EStG Anrechnung GewSt auf ESt — 3,8 × Messbetrag.
 * @param gewinn Gewerbe-Gewinn
 * @param eSt Berechnete ESt
 * @returns Anrechnungs-Betrag (max ESt)
 */
export function gewStAnrechnung(gewinn: number, eSt: number): number {
  return Math.min(gewStMessbetrag(gewinn) * GEWST_ANRECHNUNG_FAKTOR, eSt);
}

/**
 * Sozialversicherungs-Beiträge GF (Single-Werte AN+AG kombiniert).
 * @param jahresBrutto Jahres-Brutto-Gehalt
 * @param svPflichtig true wenn beherrschender GF (>50 %): false (sv-frei)
 * @returns SV-Gesamtbeitrag (AN + AG)
 */
export function calcSv(jahresBrutto: number, svPflichtig: boolean): number {
  if (!svPflichtig) return 0;
  const kvBasis = Math.min(jahresBrutto, BBG_KV_JAHR);
  const rvBasis = Math.min(jahresBrutto, BBG_RV_WEST_JAHR);
  return kvBasis * SV_QUOTE_KV_PV + rvBasis * SV_QUOTE_RV_AV;
}

/**
 * Komplette GmbH-Steuer-Berechnung (KSt + SolZ + GewSt) für gegebenen Gewinn + Hebesatz.
 */
export function calcGmbhSteuer(
  gewinn: number,
  hebesatz: number = GEWST_HEBESATZ_DEFAULT,
): { kst: number; solz: number; gewst: number; total: number } {
  if (gewinn <= 0) return { kst: 0, solz: 0, gewst: 0, total: 0 };
  const kst = gewinn * KST_RATE;
  const solzVal = kst * SOLZ_RATE;
  const gewst = gewinn * GEWST_MESSZAHL * (hebesatz / 100);
  return { kst, solz: solzVal, gewst, total: kst + solzVal + gewst };
}

/**
 * Privat-Ausschüttungs-Steuer (Abgeltungssteuer 25 % + SolZ + ggf. KiSt).
 */
export function calcAbgeltungSteuer(
  brutto: number,
  kistSatzProz: number = 0,
): { kapErtrag: number; solz: number; kist: number; total: number } {
  const kapErtrag = brutto * 0.25;
  const solzVal = kapErtrag * SOLZ_RATE;
  const kist = kapErtrag * (kistSatzProz / 100);
  return { kapErtrag, solz: solzVal, kist, total: kapErtrag + solzVal + kist };
}

/**
 * Teileinkünfteverfahren §3 Nr. 40 EStG — 60 % der Dividende mit ESt-Grenzsteuersatz.
 */
export function calcTevSteuer(
  brutto: number,
  grenzsatzProz: number,
  kistSatzProz: number = 0,
): { tevBemessung: number; est: number; solz: number; kist: number; total: number } {
  const tevBemessung = brutto * TEV_QUOTE;
  const est = tevBemessung * (grenzsatzProz / 100);
  const solzVal = est * SOLZ_RATE;
  const kist = est * (kistSatzProz / 100);
  return { tevBemessung, est, solz: solzVal, kist, total: est + solzVal + kist };
}

/**
 * Future Value einer Annuität (für Renten-/Spar-Berechnungen).
 * @param annualPayment Jahresbeitrag
 * @param rate Zinssatz pro Jahr (z.B. 0.06 = 6 %)
 * @param years Laufzeit in Jahren
 */
export function annuityFV(annualPayment: number, rate: number, years: number): number {
  if (rate === 0) return annualPayment * years;
  return (annualPayment * (Math.pow(1 + rate, years) - 1)) / rate;
}
