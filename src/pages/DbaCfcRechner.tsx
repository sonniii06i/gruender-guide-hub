import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calculator,
  Globe,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  Plane,
  Building2,
} from "lucide-react";

// ============================================================
// DBA-CFC-RECHNER · Stand Mai 2026
// ============================================================
// Verifizierte Quellen (Code-Kommentare zeigen wo Wert herkommt):
// - §AStG-15%-Schwelle: MinBestRL-UmsG, BGBl. I 2023, 397 (Wirksam ab 2024)
// - §7 AStG: Beherrschung >50% mit nahestehenden Personen
// - §8b KStG 95% steuerfrei; §8b Abs. 4: <10% Streubesitz → 100% stpfl.
// - §9 Nr. 2a GewStG: Schachtelprivileg ab 15% Beteiligung
// - EU-MTR 2011/96/EU: 10% + 12 Mon, NUR Kap-Ges. zu Kap-Ges.
// - §6 AStG (JStG 2024): 7-Raten-Stundung EU/EWR, +25%-Ausschüttungs-Widerruf
// - ATAD III: WITHDRAWN 18.06.2025 (ECOFIN), aber §50d Abs. 3 EStG bleibt scharf
// - Pillar 2: nur Konzerne ≥€750M — für Solo-Founder irrelevant
// ============================================================

// ===== KONSTANTEN — bei Reform aktualisieren =====
const ASTG_NIEDRIGSTEUER_SCHWELLE = 15; // §8 Abs. 5 AStG seit 2024
const STREUBESITZ_KST_SCHWELLE = 10; // §8b Abs. 4 KStG
const SCHACHTEL_GEWST_SCHWELLE = 15; // §9 Nr. 2a GewStG
const MTR_BETEILIGUNG_MIN = 10; // RL 2011/96/EU
const MTR_HALTEDAUER_MONATE = 12;
const KST_SATZ = 15; // §23 KStG
const SOLZ_KST = 5.5; // SolZ-Aufschlag auf KSt
const GEWST_SATZ_TYPISCH = 14; // Hebesatz 400% × Messzahl 3,5%
const KST_GEWST_KOMBI = 30; // KSt+SolZ+GewSt ≈ 30%
const TEILEINKUENFTE_ANTEIL = 60; // §3 Nr. 40 EStG: 60% stpfl., 40% frei
const ABGELT_ST_INKL_SOLZ = 26.375; // 25% KapErtrSt + SolZ

// ===== LÄNDER-DATEN — Stand Mai 2026 =====
type CountryData = {
  flag: string;
  name: string;
  /** Lokaler Standard-CIT in % (für Default-Berechnung). */
  cit: number;
  /** Optional: kleinerer Satz für Small-Companies (z.B. Polen 9%, Litauen 7%). */
  smallCit?: number;
  smallCitLabel?: string;
  /** Optional: niedrigste Stufe bei progressiven Tarifen (UK 19%, NL 19%). */
  progressiveLow?: number;
  progressiveLowLabel?: string;
  /** Optional: Estland-Style DPT — nur bei Ausschüttung. */
  distributedProfitsTax?: boolean;
  /** Quellensteuer national auf Out-Dividenden. */
  dividendWHT: number;
  /** Reduzierter Satz via DBA-DE (bei minStakeForDBA + 12 Mon Haltedauer). */
  dividendWHTwithDBA: number;
  /** Mindest-Beteiligung für DBA-Reduktion. */
  minStakeForDBA: number;
  /** Optional: Sondertarif "0%" bei sehr hoher Beteiligung (USA: ≥80% + LoB). */
  dividendWHTQualified?: number;
  qualifiedThreshold?: number;
  qualifiedNote?: string;
  /** Mutter-Tochter-RL anwendbar (= EU-Mitglied)? */
  motherDaughter: boolean;
  /** Ist das Land per BMF auf Niedrigsteuer-Liste (cit < 15%)? */
  isLowTaxCountry: boolean;
  notes: string[];
  /** Source-Tag (kurz) für UI-Vertrauen. */
  citSource?: string;
};

const COUNTRIES: Record<string, CountryData> = {
  estland: {
    flag: "🇪🇪",
    name: "Estland",
    cit: 22, // Estland DPT 2026 = 22% (22/78); geplante Erhöhung auf 24% Ende 2025 gestrichen — Riigikogu
    distributedProfitsTax: true,
    dividendWHT: 0,
    dividendWHTwithDBA: 0,
    minStakeForDBA: MTR_BETEILIGUNG_MIN,
    motherDaughter: true,
    isLowTaxCountry: false, // 24% > 15% → §AStG-Schwelle nicht unterschritten
    notes: [
      "0% auf thesaurierte Gewinne — nur bei Ausschüttung 24% DPT (Distributed Profits Tax, ab 1.1.2026)",
      "Ermäßigter 14%-Satz für regelmäßige Ausschüttungen seit 2025 abgeschafft",
      "Pillar 2 nicht umgesetzt (6-Jahres-Aufschub gewählt)",
    ],
    citSource: "Estonian Tax Reform Act 2025, EY Tax Alert",
  },
  niederlande: {
    flag: "🇳🇱",
    name: "Niederlande",
    cit: 25.8,
    progressiveLow: 19,
    progressiveLowLabel: "19% bis €200k Gewinn",
    dividendWHT: 15,
    dividendWHTwithDBA: 5,
    minStakeForDBA: 10,
    motherDaughter: true,
    isLowTaxCountry: false,
    notes: [
      "Zweistufig: 19% bis €200k Gewinn, 25,8% darüber",
      "Innovation Box: 9% auf qualifiziertes IP",
      "Participation Exemption (≥5%): 100% steuerfrei auf Dividenden + Veräußerungsgewinne",
    ],
    citSource: "Belastingdienst 2025",
  },
  luxembourg: {
    flag: "🇱🇺",
    name: "Luxemburg",
    cit: 24.94,
    dividendWHT: 15,
    dividendWHTwithDBA: 5,
    minStakeForDBA: 10,
    motherDaughter: true,
    isLowTaxCountry: false,
    notes: [
      "Participation Exemption (≥10% oder €1,2M Erwerbswert): 100% steuerfrei",
      "SPF (Société de Patrimoine Familial): 0% CIT für Familien-Verwaltung",
      "Pillar 2 (IIR + QDMTT) seit 2024 umgesetzt",
    ],
    citSource: "Administration des Contributions Directes 2025",
  },
  irland: {
    flag: "🇮🇪",
    name: "Irland",
    cit: 12.5,
    dividendWHT: 0, // National 0% (kein WHT auf ausgehende Dividenden)
    dividendWHTwithDBA: 0,
    minStakeForDBA: 0,
    motherDaughter: true,
    isLowTaxCountry: true, // 12,5% < 15%
    notes: [
      "12,5% Trading-Income (aktive Tätigkeit, Substance erforderlich)",
      "25% Passive-Income (Lizenzen, Mieten, Zinsen ohne aktive Substanz)",
      "Knowledge Development Box: 6,25% auf qualifiziertes IP",
      "Pillar 2 (IIR seit 1.1.2024, UTPR seit 1.1.2025, QDTT) — Top-up auf 15% bei ≥€750M Konzernen",
      "National 0% WHT auf Out-Dividenden — DBA-Reduktion irrelevant",
    ],
    citSource: "Revenue Commissioners 2025, PwC Tax Summaries",
  },
  zypern: {
    flag: "🇨🇾",
    name: "Zypern",
    cit: 12.5,
    dividendWHT: 0,
    dividendWHTwithDBA: 0,
    minStakeForDBA: 0,
    motherDaughter: true,
    isLowTaxCountry: true,
    notes: [
      "0% national WHT auf Out-Dividenden (non-resident Empfänger)",
      "IP-Box: 2,5% effektiv auf qualifizierte IP-Einkünfte",
      "Notional Interest Deduction (NID) für Eigenkapital-Strukturierung",
      "Substance-Test §50d Abs. 3 EStG kritisch bei DE-Empfänger",
    ],
    citSource: "Cyprus Tax Department 2025",
  },
  malta: {
    flag: "🇲🇹",
    name: "Malta",
    cit: 35, // Nominell — Refund-Mechanik separat!
    dividendWHT: 0,
    dividendWHTwithDBA: 0,
    minStakeForDBA: 0,
    motherDaughter: true,
    isLowTaxCountry: true, // Effektiv 5% nach Refund
    notes: [
      "35% nominell zahlen, dann 6/7-Refund an Non-Resident-Aktionär → effektiv 5%",
      "Refund-Auszahlung: 14 Tage nach Monatsende — CASHFLOW: 35% upfront!",
      "Refund nur für Trading-Income; Passive: 5/7 oder 2/3 → effektiv 10-15%",
      "Participation Exemption (≥5%): 0% auf Dividenden + Veräußerungsgewinne",
      "Pillar 2: 6-Jahres-Aufschub gewählt (keine IIR/UTPR bis 2029)",
    ],
    citSource: "Malta Tax & Customs Administration 2025",
  },
  schweiz: {
    flag: "🇨🇭",
    name: "Schweiz",
    cit: 11.66, // Niedrigster Kanton 2026: Luzern (löst Zug 11,71% ab)
    dividendWHT: 35, // Verrechnungssteuer
    dividendWHTwithDBA: 0, // DBA-CH Art. 10 Abs. 3 bei ≥10% Kap-Ges. (Antragsverfahren Form 823B/C)
    minStakeForDBA: 10,
    motherDaughter: false, // Nicht-EU — MTR n/a
    isLowTaxCountry: true, // Bei niedrigem Kanton
    notes: [
      "Effektive CIT-Spanne: Luzern 11,66% (niedrigster), Zug 11,71%, Schwyz 12,9%, Genf 14%, Zürich ~19,7%",
      "Verrechnungssteuer 35% — DBA-Rückforderung möglich (Antragsverfahren BZSt)",
      "Bei Privatperson als Empfänger: nur 20% rückforderbar (15% bleiben Quellensteuer)",
      "Pillar 2 (QDMTT) seit 1.1.2024 umgesetzt — Top-up bei großen Konzernen",
    ],
    citSource: "EFD Steuerbelastung Kantone 2026 (Blick)",
  },
  oesterreich: {
    flag: "🇦🇹",
    name: "Österreich",
    cit: 23, // Seit 2024 (war 24% 2023, 25% bis 2022)
    dividendWHT: 27.5,
    dividendWHTwithDBA: 5,
    minStakeForDBA: 10,
    motherDaughter: true,
    isLowTaxCountry: false,
    notes: [
      "23% CIT seit 2024 (war 25% bis 2022)",
      "FlexCo (FlexKapG) seit 2024 — Vesting/Mitarbeiter-Beteiligungs-friendly",
      "Beteiligungsertragsbefreiung §10 KStG für Auslandsbeteiligungen",
    ],
    citSource: "BMF Österreich 2025",
  },
  polen: {
    flag: "🇵🇱",
    name: "Polen",
    cit: 19,
    smallCit: 9,
    smallCitLabel: "9% Small-CIT (Brutto-Umsatz <€2M)",
    dividendWHT: 19,
    dividendWHTwithDBA: 5,
    minStakeForDBA: 10,
    motherDaughter: true,
    isLowTaxCountry: false, // Standard 19% > 15%, Small 9% < 15%
    notes: [
      "Standard CIT 19%",
      "Small-CIT 9%: Brutto-Umsatz Vorjahr <€2M UND laufendes Jahr <€2M",
      "Bei Small-CIT 9%: §AStG-Niedrigsteuer-Risiko relevant!",
    ],
    citSource: "Polish Ministry of Finance 2025",
  },
  litauen: {
    flag: "🇱🇹",
    name: "Litauen",
    cit: 17, // Standard seit 1.1.2026 (war 16% 2025, 15% bis 2024)
    smallCit: 7, // Seit 1.1.2026 (war 5% 2025, 6% in einigen Quellen)
    smallCitLabel: "7% Small-CIT (Umsatz <€300k); 0% erste 2 Jahre bei Neugründung",
    dividendWHT: 15,
    dividendWHTwithDBA: 5,
    minStakeForDBA: 10,
    motherDaughter: true,
    isLowTaxCountry: true, // Small 7% < 15%
    notes: [
      "Reform 2026: Standard 16%→17%, Small 5%→7%",
      "Neugründungs-Bonus seit 2026: 0% CIT erste 2 Steuerperioden (Umsatz <€300k)",
      "10-MA-Limit für Small-CIT entfällt 2026",
      "Pillar 2: 6-Jahres-Aufschub gewählt",
    ],
    citSource: "Lithuanian Tax Authority Amendment 2025, KPMG TaxNewsFlash",
  },
  bulgarien: {
    flag: "🇧🇬",
    name: "Bulgarien",
    cit: 10,
    dividendWHT: 5,
    dividendWHTwithDBA: 5,
    minStakeForDBA: 10,
    motherDaughter: true,
    isLowTaxCountry: true,
    notes: [
      "10% — niedrigster regulärer EU-CIT",
      "5% WHT-DBA-Reduktion bei Kap-Ges. ≥10%",
      "MTR: 0% bei ≥10% + 12 Mon (Kap-Ges. zu Kap-Ges.)",
    ],
    citSource: "Bulgarian National Revenue Agency 2025",
  },
  usa: {
    flag: "🇺🇸",
    name: "USA",
    cit: 21, // Federal — State separat
    dividendWHT: 30,
    dividendWHTwithDBA: 5,
    minStakeForDBA: 10,
    dividendWHTQualified: 0, // ≥80% + LoB-Test (DBA Art. 10 Abs. 3)
    qualifiedThreshold: 80,
    qualifiedNote: "0% nur bei ≥80% seit ≥12 Mon + Limitation-on-Benefits-Test",
    motherDaughter: false, // Nicht-EU
    isLowTaxCountry: false, // Federal 21% > 15%
    notes: [
      "Federal CIT 21% (TCJA permanent durch OBBBA 2025)",
      "State CIT: 0% in WY/NV/SD/TX/WA/OH; CA 8,84%; DE 8,7%; NJ 11,5%",
      "Delaware-Mythos: nur Inkorporations-State, Steuern fallen am Sitz der Tätigkeit an (Nexus)",
      "LLC: Pass-Through Default (transparent) — kein CIT, dafür ESt beim Owner",
      "C-Corp: 21% CIT + State + 30% WHT auf Dividenden (DBA-Reduktion auf 5%/0%)",
    ],
    citSource: "IRS Pub 542 2025, Tax Foundation State Tracker 2026",
  },
  hongkong: {
    flag: "🇭🇰",
    name: "Hong Kong",
    cit: 16.5,
    progressiveLow: 8.25,
    progressiveLowLabel: "8,25% bis HKD 2M (~€235k) Profit",
    dividendWHT: 0,
    dividendWHTwithDBA: 0,
    minStakeForDBA: 0,
    motherDaughter: false,
    isLowTaxCountry: true, // 8,25% < 15%
    notes: [
      "Two-Tiered: 8,25% bis HKD 2M Profit, 16,5% darüber",
      "Nur 1 Gesellschaft pro 'connected group' kann ermäßigten Satz nutzen",
      "Territoriales Prinzip: Auslands-Profite steuerfrei (FSIE-Regime seit 2023 verschärft Passive-Income)",
      "Offshore-Status: 0% bei rein extraterritorialen Aktivitäten",
      "0% WHT auf Out-Dividenden national",
    ],
    citSource: "Hong Kong IRD Two-Tiered Profits Tax 2025",
  },
  uk: {
    flag: "🇬🇧",
    name: "UK",
    cit: 25,
    progressiveLow: 19,
    progressiveLowLabel: "19% bis £50k, Marginal Relief £50k-£250k (effektiv 26,5% marginal)",
    dividendWHT: 0,
    dividendWHTwithDBA: 0,
    minStakeForDBA: 0,
    motherDaughter: false, // Brexit — MTR seit 1.1.2021 weg
    isLowTaxCountry: false,
    notes: [
      "19% bis £50k Profit, 25% ab £250k",
      "Marginal Relief £50k-£250k: gleitend, effektive marginale Rate 26,5%!",
      "Associated Companies: Schwellen werden auf alle verbundenen Ltds aufgeteilt",
      "0% WHT auf Out-Dividenden national — DBA irrelevant",
      "Brexit: EU-MTR ab 1.1.2021 NICHT mehr anwendbar",
    ],
    citSource: "HMRC Corporation Tax Rates 2025",
  },
};

// ===== HILFS-FUNKTIONEN =====
const formatEur = (n: number) =>
  Math.round(n).toLocaleString("de-DE") + " €";

const DbaCfcRechner = () => {
  // ===== INPUTS =====
  const [land, setLand] = useState<keyof typeof COUNTRIES>("luxembourg");
  const [beteiligung, setBeteiligung] = useState(100);
  const [haltedauer, setHaltedauer] = useState(12);
  const [auslandsgewinn, setAuslandsgewinn] = useState(200000);
  const [einkuenfteArt, setEinkuenfteArt] = useState<"aktiv" | "passive">("aktiv");
  const [hatHoldingDe, setHatHoldingDe] = useState(true);
  const [useSmallCit, setUseSmallCit] = useState(false);
  const [useProgressiveLow, setUseProgressiveLow] = useState(false);
  const [estlandThesauriert, setEstlandThesauriert] = useState(false);
  const [estSatzPrivat, setEstSatzPrivat] = useState(42); // §32a EStG Spitzensatz
  const [usStateRate, setUsStateRate] = useState(0); // USA-State (default 0% = WY/NV/TX/SD/WA/OH)

  const country = COUNTRIES[land];

  // ===== CALC =====
  const calc = useMemo(() => {
    // 1) Effektiver lokaler CIT-Satz mit ggf. Small-/Progressive-Option
    let effCit = country.cit;
    let citNote = "";

    if (country.distributedProfitsTax && estlandThesauriert) {
      effCit = 0;
      citNote = "Thesauriert — keine Estland-DPT bis zur Ausschüttung";
    } else if (useSmallCit && country.smallCit !== undefined) {
      effCit = country.smallCit;
      citNote = country.smallCitLabel ?? "Small-CIT";
    } else if (useProgressiveLow && country.progressiveLow !== undefined) {
      effCit = country.progressiveLow;
      citNote = country.progressiveLowLabel ?? "Progressive-Low";
    }

    // USA: Federal + State (State Tax ist auf Federal-Ebene als BA abzugsfähig)
    // Combined effective = federal + state × (1 - federal)
    if (land === "usa") {
      const fed = country.cit / 100;
      const state = usStateRate / 100;
      effCit = (fed + state * (1 - fed)) * 100;
      citNote = `Federal ${country.cit}% + State ${usStateRate}% (State auf Fed-Ebene BA-abzugsfähig)`;
    }

    const auslandsSteuer = (auslandsgewinn * effCit) / 100;
    const auslandsNetto = auslandsgewinn - auslandsSteuer;

    // 2) Quellensteuer-Berechnung
    let wht = country.dividendWHT;
    let whtNote = `Regulär ${country.dividendWHT}%`;

    // Qualified-Rate (z.B. USA ≥80% mit LoB)
    const qualifiedApplies =
      country.dividendWHTQualified !== undefined &&
      country.qualifiedThreshold !== undefined &&
      beteiligung >= country.qualifiedThreshold &&
      haltedauer >= MTR_HALTEDAUER_MONATE;

    if (qualifiedApplies) {
      wht = country.dividendWHTQualified!;
      whtNote = `Qualified-Rate (≥${country.qualifiedThreshold}% + LoB): ${wht}%`;
    } else {
      // Standard DBA-Reduktion
      const dbaApplies =
        beteiligung >= country.minStakeForDBA &&
        haltedauer >= MTR_HALTEDAUER_MONATE &&
        country.dividendWHTwithDBA < country.dividendWHT;
      if (dbaApplies) {
        wht = country.dividendWHTwithDBA;
        whtNote = `DBA-Reduktion (≥${country.minStakeForDBA}% + ${MTR_HALTEDAUER_MONATE}M): ${country.dividendWHT}% → ${wht}%`;
      }
    }

    // MTR (EU 2011/96/EU): NUR bei DE-Holding (Kap-Ges. zu Kap-Ges.), 10% + 12 Mon
    const motherDaughterEligible =
      country.motherDaughter &&
      beteiligung >= MTR_BETEILIGUNG_MIN &&
      haltedauer >= MTR_HALTEDAUER_MONATE &&
      hatHoldingDe; // ← Privatperson ist raus!

    if (motherDaughterEligible) {
      wht = 0;
      whtNote = "EU-Mutter-Tochter-RL: 0% WHT (Kap-Ges. zu Kap-Ges., ≥10% + 12M)";
    }

    // Estland thesauriert: keine Ausschüttung → keine WHT-Berechnung
    if (country.distributedProfitsTax && estlandThesauriert) {
      wht = 0;
      whtNote = "Thesauriert — keine Ausschüttung, keine WHT/DPT";
    }

    const whtAbsolute = (auslandsNetto * wht) / 100;
    const inDeAusgeschuettet = auslandsNetto - whtAbsolute;

    // 3) DE-Behandlung
    let deSteuer = 0;
    let deBezeichnung = "";
    let streubesitz = false;
    let gewstFehlend = false;

    if (hatHoldingDe) {
      // §8b KStG: 95% steuerfrei → 5% × KSt+GewSt
      if (beteiligung < STREUBESITZ_KST_SCHWELLE) {
        // §8b Abs. 4 KStG Streubesitz: 100% stpfl. in KSt, ABER §8b Abs. 2 für VeräußGewinne bleibt
        streubesitz = true;
        deSteuer = (inDeAusgeschuettet * KST_GEWST_KOMBI) / 100;
        deBezeichnung = `Streubesitz <${STREUBESITZ_KST_SCHWELLE}% (§8b Abs. 4 KStG): 100% steuerpflichtig → ${KST_GEWST_KOMBI}% KSt+SolZ+GewSt`;
      } else if (beteiligung < SCHACHTEL_GEWST_SCHWELLE) {
        // KSt-Schachtel greift (95% frei), aber GewSt-Schachtel (§9 Nr. 2a GewStG) NICHT
        gewstFehlend = true;
        const kstAnteil = (inDeAusgeschuettet * 0.05 * (KST_SATZ + (KST_SATZ * SOLZ_KST) / 100)) / 100; // ~5% × 15,83%
        const gewstAnteil = (inDeAusgeschuettet * GEWST_SATZ_TYPISCH) / 100; // Volle GewSt!
        deSteuer = kstAnteil + gewstAnteil;
        deBezeichnung = `KSt-Schachtel §8b KStG (95% frei) ABER GewSt-Schachtel §9 Nr. 2a GewStG erst ≥${SCHACHTEL_GEWST_SCHWELLE}% → voller GewSt-Hit ~${GEWST_SATZ_TYPISCH}%`;
      } else {
        // Voll-Schachtel: KSt + GewSt jeweils 95% frei
        deSteuer = (inDeAusgeschuettet * 0.05 * KST_GEWST_KOMBI) / 100;
        deBezeichnung = `Voll-Schachtel ≥${SCHACHTEL_GEWST_SCHWELLE}% (§8b KStG + §9 Nr. 2a GewStG): 95% frei → 1,5% effektiv`;
      }
    } else {
      // DE-Privatperson: 26,375% AbgSt (Abgeltungssteuer + SolZ)
      deSteuer = (inDeAusgeschuettet * ABGELT_ST_INKL_SOLZ) / 100;
      deBezeichnung = `DE-Privatperson: ${ABGELT_ST_INKL_SOLZ}% Abgeltungssteuer (25% KapErtrSt + SolZ). Keine MTR-Befreiung — Privatperson schließt EU-Mutter-Tochter-RL aus.`;
    }

    // 4) §AStG-Hinzurechnung-Check
    const istNiedrigsteuer = effCit < ASTG_NIEDRIGSTEUER_SCHWELLE;
    const istBeherrschungSchwelle = beteiligung > 50;
    const astgGreift =
      einkuenfteArt === "passive" && istNiedrigsteuer && istBeherrschungSchwelle;

    let astgZusatz = 0;
    let astgBezeichnung = "";
    if (astgGreift) {
      // §10 AStG: Hinzurechnungsbetrag wird wie eigenes Einkommen besteuert
      // Bei GmbH: KSt+GewSt ~30%; bei Privatperson: persönlicher ESt-Satz
      const sollDeSatz = hatHoldingDe ? KST_GEWST_KOMBI : estSatzPrivat;
      const sollDe = (auslandsgewinn * sollDeSatz) / 100;
      const anrechnung = auslandsSteuer; // §12 AStG automatische Anrechnung
      astgZusatz = Math.max(0, sollDe - anrechnung);
      astgBezeichnung = `§AStG-Hinzurechnung greift: passive Einkünfte + Niedrigsteuer (${effCit}% < ${ASTG_NIEDRIGSTEUER_SCHWELLE}%) + Beherrschung >50%. DE-Soll: ${sollDeSatz}% (${hatHoldingDe ? "GmbH" : "Privat ESt"}) minus ${formatEur(auslandsSteuer)} Anrechnung.`;
    }

    // §AStG-Hinzurechnung ist Alternativ-Besteuerung (vorgelagerte HZB) — wenn sie greift,
    // wird die spätere Ausschüttung gem. §3 Nr. 41 EStG idR steuerfrei. Wir nehmen den Max-Wert.
    const deBelastung = astgGreift ? Math.max(deSteuer, astgZusatz) : deSteuer;
    const totalSteuer = auslandsSteuer + whtAbsolute + deBelastung;
    const finalNetto = auslandsgewinn - totalSteuer;
    const effektivPct = auslandsgewinn > 0 ? (totalSteuer / auslandsgewinn) * 100 : 0;

    return {
      effCit,
      citNote,
      auslandsSteuer,
      auslandsNetto,
      whtAbsolute,
      whtRate: wht,
      whtNote,
      motherDaughterEligible,
      qualifiedApplies,
      inDeAusgeschuettet,
      deSteuer,
      deBezeichnung,
      streubesitz,
      gewstFehlend,
      astgGreift,
      astgZusatz,
      astgBezeichnung,
      istNiedrigsteuer,
      istBeherrschungSchwelle,
      totalSteuer,
      finalNetto,
      effektivPct,
    };
  }, [country, land, beteiligung, haltedauer, auslandsgewinn, einkuenfteArt, hatHoldingDe, useSmallCit, useProgressiveLow, estlandThesauriert, estSatzPrivat, usStateRate]);

  return (
    <CockpitShell
      eyebrow="DBA-CFC-Rechner · Stand Mai 2026"
      title="Auslands-Gewinn → DE-Steuer-Rechnung"
      subtitle="§AStG (15%-Schwelle seit 2024) + DBA-Anrechnung + Mutter-Tochter-RL + §8b/§9 GewSt-Schachtel + Estland-DPT für 14 Länder. Alle Werte mit Quellen-Tag."
    >
      {/* ============ INPUTS ============ */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="h-4 w-4 text-accent-blue" />
          <h3 className="font-bold text-sm">Auslandsgesellschaft</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Land</Label>
            <select
              value={land}
              onChange={(e) => {
                setLand(e.target.value as keyof typeof COUNTRIES);
                setUseSmallCit(false);
                setUseProgressiveLow(false);
                setEstlandThesauriert(false);
              }}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {Object.entries(COUNTRIES).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.flag} {v.name} ({v.cit}% CIT)
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Auslandsgewinn (€)</Label>
            <Input
              type="number"
              value={auslandsgewinn}
              onChange={(e) => setAuslandsgewinn(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Beteiligung %</Label>
            <Input
              type="number"
              min={0}
              max={100}
              value={beteiligung}
              onChange={(e) => setBeteiligung(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Haltedauer (Monate)</Label>
            <Input
              type="number"
              min={0}
              value={haltedauer}
              onChange={(e) => setHaltedauer(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Einkünfte-Art</Label>
            <select
              value={einkuenfteArt}
              onChange={(e) => setEinkuenfteArt(e.target.value as typeof einkuenfteArt)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="aktiv">Aktiv (Handel, Service, Produktion — §8 Abs. 1 AStG)</option>
              <option value="passive">Passiv (Lizenz, Zinsen, Mieten — außerhalb Aktivkatalog)</option>
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">DE-Empfänger</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {[
                { v: true, l: "DE-Holding-GmbH" },
                { v: false, l: "DE-Privatperson" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => setHatHoldingDe(o.v)}
                  className={`rounded-md border h-10 text-sm transition-colors ${
                    hatHoldingDe === o.v
                      ? "border-accent-blue bg-accent-blue/10 text-accent-blue font-semibold"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Länder-spezifische Optionen */}
        {(country.smallCit !== undefined || country.progressiveLow !== undefined || country.distributedProfitsTax || land === "usa") && (
          <div className="mt-4 rounded-xl bg-card border border-border p-3 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {country.flag} {country.name}-spezifische Optionen
            </div>
            {country.smallCit !== undefined && (
              <label className="flex items-start gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={useSmallCit}
                  onChange={(e) => {
                    setUseSmallCit(e.target.checked);
                    if (e.target.checked) setUseProgressiveLow(false);
                  }}
                  className="mt-0.5"
                />
                <span>
                  <strong>{country.smallCit}% Small-CIT</strong> — {country.smallCitLabel}
                </span>
              </label>
            )}
            {country.progressiveLow !== undefined && (
              <label className="flex items-start gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={useProgressiveLow}
                  onChange={(e) => {
                    setUseProgressiveLow(e.target.checked);
                    if (e.target.checked) setUseSmallCit(false);
                  }}
                  className="mt-0.5"
                />
                <span>
                  <strong>{country.progressiveLow}%</strong> — {country.progressiveLowLabel}
                </span>
              </label>
            )}
            {country.distributedProfitsTax && (
              <label className="flex items-start gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={estlandThesauriert}
                  onChange={(e) => setEstlandThesauriert(e.target.checked)}
                  className="mt-0.5"
                />
                <span>
                  <strong>Thesauriert</strong> — keine Ausschüttung, daher keine {country.cit}% DPT
                </span>
              </label>
            )}
            {land === "usa" && (
              <div className="flex flex-col gap-1">
                <Label className="text-xs">US-State CIT %</Label>
                <select
                  value={usStateRate}
                  onChange={(e) => setUsStateRate(Number(e.target.value))}
                  className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                >
                  <option value={0}>0% — WY / NV / SD / TX (Margin Tax) / WA / OH</option>
                  <option value={2}>2,0% — NC (niedrigster mit Income Tax)</option>
                  <option value={8.7}>8,7% — Delaware (+ Gross Receipts Tax)</option>
                  <option value={8.84}>8,84% — California</option>
                  <option value={11.5}>11,5% — New Jersey (höchster)</option>
                </select>
              </div>
            )}
          </div>
        )}

        {/* §AStG ESt-Satz nur bei Privatperson + passive Einkünfte */}
        {!hatHoldingDe && einkuenfteArt === "passive" && (
          <div className="mt-3 rounded-xl bg-amber-500/5 border border-amber-500/20 p-3">
            <Label className="text-xs uppercase tracking-wider text-amber-700 font-semibold">
              Persönlicher ESt-Spitzensatz (für §AStG-Hinzurechnung)
            </Label>
            <Input
              type="number"
              min={14}
              max={47.5}
              value={estSatzPrivat}
              onChange={(e) => setEstSatzPrivat(Math.max(14, Math.min(47.5, Number(e.target.value) || 42)))}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-1">
              §32a EStG: 14% Grenz-Eingang bis 47,5% Spitzensatz (inkl. SolZ + ggf. Reichensteuer)
            </div>
          </div>
        )}
      </div>

      {/* ============ BERECHNUNG SCHRITT-FÜR-SCHRITT ============ */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
          <Calculator className="h-4 w-4" /> Berechnung Schritt-für-Schritt
        </h3>

        <div className="space-y-3 text-sm">
          {/* 1. Auslandssteuer */}
          <div className="rounded-xl bg-secondary/40 p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">
                1) Lokale {country.name}-Steuer ({calc.effCit}%)
              </span>
              <span className="font-mono">-{formatEur(calc.auslandsSteuer)}</span>
            </div>
            <div className="text-[11px] text-muted-foreground">
              {auslandsgewinn.toLocaleString("de-DE")} € × {calc.effCit}% = {formatEur(calc.auslandsSteuer)}
              {calc.citNote && <div className="mt-0.5 italic">{calc.citNote}</div>}
            </div>
            <div className="text-[11px] mt-1">
              Verbleibend: <span className="font-mono">{formatEur(calc.auslandsNetto)}</span>
            </div>
          </div>

          {/* 2. Quellensteuer */}
          <div className="rounded-xl bg-secondary/40 p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">2) Quellensteuer beim Ausschütten ({calc.whtRate}%)</span>
              <span className="font-mono">-{formatEur(calc.whtAbsolute)}</span>
            </div>
            <div className="text-[11px] text-muted-foreground">
              {calc.motherDaughterEligible && (
                <div className="text-emerald-700">✓ EU-Mutter-Tochter-RL: 0% (Kap-Ges. zu Kap-Ges., ≥10% + 12M)</div>
              )}
              {calc.qualifiedApplies && (
                <div className="text-emerald-700">✓ Qualified-Rate aktiv: {calc.whtNote}</div>
              )}
              {!calc.motherDaughterEligible && !calc.qualifiedApplies && (
                <div>{calc.whtNote}</div>
              )}
              {!hatHoldingDe && country.motherDaughter && (
                <div className="text-amber-700 mt-1">
                  ⚠ MTR-Befreiung nicht anwendbar — gilt nur Kap-Ges. zu Kap-Ges. (§43b EStG)
                </div>
              )}
            </div>
            <div className="text-[11px] mt-1">
              Beim Empfänger ankommend:{" "}
              <span className="font-mono">{formatEur(calc.inDeAusgeschuettet)}</span>
            </div>
          </div>

          {/* 3. DE-Steuer */}
          <div className="rounded-xl bg-secondary/40 p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">3) DE-Empfänger-Steuer</span>
              <span className="font-mono">-{formatEur(calc.deSteuer)}</span>
            </div>
            <div className="text-[11px] text-muted-foreground">{calc.deBezeichnung}</div>
            {calc.streubesitz && (
              <div className="text-[11px] text-red-700 mt-1">
                ⚠ Streubesitz {beteiligung}% &lt; {STREUBESITZ_KST_SCHWELLE}% → §8b Abs. 4 KStG: keine 95%-Befreiung
              </div>
            )}
            {calc.gewstFehlend && (
              <div className="text-[11px] text-amber-700 mt-1">
                ⚠ Beteiligung {beteiligung}% reicht für KSt-Schachtel (≥{STREUBESITZ_KST_SCHWELLE}%) ABER nicht für GewSt (≥{SCHACHTEL_GEWST_SCHWELLE}%) → volle GewSt fällt an
              </div>
            )}
          </div>

          {/* 4. §AStG */}
          {calc.astgGreift && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-red-700">⚠ 4) §AStG-Hinzurechnung greift</span>
                <span className="font-mono text-red-700">-{formatEur(calc.astgZusatz)}</span>
              </div>
              <div className="text-[11px] text-muted-foreground">{calc.astgBezeichnung}</div>
            </div>
          )}
          {!calc.astgGreift && einkuenfteArt === "passive" && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 text-xs text-emerald-700">
              ✓ §AStG greift NICHT —{" "}
              {!calc.istNiedrigsteuer && `Steuersatz ${calc.effCit}% ≥ ${ASTG_NIEDRIGSTEUER_SCHWELLE}% (keine Niedrigsteuer)`}
              {calc.istNiedrigsteuer && !calc.istBeherrschungSchwelle && `Beteiligung ${beteiligung}% ≤ 50% (keine Beherrschung)`}
            </div>
          )}
          {einkuenfteArt === "aktiv" && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 text-xs text-emerald-700">
              ✓ §AStG greift NICHT bei aktiver Tätigkeit (§8 Abs. 1 Aktivkatalog) — aber Funktionsprüfung
              für Handel/DL mit beherrschendem Inländer beachten!
            </div>
          )}
        </div>
      </div>

      {/* ============ TOTAL ============ */}
      <div className="rounded-2xl border-2 border-accent-blue/40 bg-gradient-to-br from-card via-card to-accent-blue/5 p-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Total Steuer</div>
            <div className="text-xl font-bold text-red-700">{formatEur(calc.totalSteuer)}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Effektiv-Satz</div>
            <div className="text-xl font-bold text-accent-blue">{calc.effektivPct.toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Netto beim Empfänger</div>
            <div className="text-xl font-bold text-emerald-700">{formatEur(calc.finalNetto)}</div>
          </div>
        </div>
      </div>

      {/* ============ COUNTRY-NOTES ============ */}
      <div className="rounded-2xl border border-border bg-card p-4 mb-6 text-xs leading-relaxed">
        <div className="font-semibold mb-2 flex items-center gap-2">
          {country.flag} {country.name} — Spezifika
          {country.citSource && (
            <span className="text-[10px] text-muted-foreground font-normal italic">
              · Quelle: {country.citSource}
            </span>
          )}
        </div>
        <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
          {country.notes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
          {country.motherDaughter && (
            <li className="text-emerald-700">
              ✓ EU-Mutter-Tochter-RL anwendbar (0% WHT bei ≥10% + 12M, nur Kap-Ges. zu Kap-Ges.)
            </li>
          )}
          {country.isLowTaxCountry && (
            <li className="text-amber-700">
              ⚠ Niedrigsteuer-Land (CIT &lt; {ASTG_NIEDRIGSTEUER_SCHWELLE}%) — §AStG-Risiko bei passiven Einkünften + Beherrschung
            </li>
          )}
        </ul>
      </div>

      {/* ============ WEGZUGSBESTEUERUNG-HINWEIS ============ */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 mb-4">
        <div className="flex items-start gap-2">
          <Plane className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <div className="font-semibold mb-1 text-amber-700">§6 AStG Wegzugsbesteuerung — neu seit JStG 2024</div>
            <div className="text-muted-foreground">
              Wenn du als DE-Inhaber einer Kap-Ges-Beteiligung (≥1% in den letzten 5 Jahren) ins Ausland ziehst:
              fiktiver Verkauf, Steuer auf stille Reserven (Teileinkünfteverfahren {TEILEINKUENFTE_ANTEIL}%).{" "}
              <strong className="text-foreground">EU/EWR-Stundung ENTFALLEN seit 2022</strong> — nur noch 7-Raten gegen
              Sicherheit. Bei {">"}25% Ausschüttungen in 7 Jahren: sofortiger Stundungs-Widerruf.
              JStG 2024 erweitert auf Investmentfonds-Anteile ab 1.1.2025.
            </div>
          </div>
        </div>
      </div>

      {/* ============ SUBSTANCE / §50d Abs. 3 EStG ============ */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 mb-4">
        <div className="flex items-start gap-2">
          <Building2 className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <div className="font-semibold mb-1 text-amber-700">
              §50d Abs. 3 EStG Anti-Treaty-Shopping — Substance erforderlich
            </div>
            <div className="text-muted-foreground">
              DBA-/MTR-Vorteile werden versagt wenn die Auslands-Holding keine wirtschaftliche Substanz hat:
              eigenes Personal mit Entscheidungsbefugnis, eigene Räumlichkeiten, eigene Wertschöpfung, eigenes
              Bankkonto. BZSt-Praxis-Update März 2025: Limited-Look-Through möglich.{" "}
              <strong className="text-foreground">
                ATAD III ("Unshell"-RL) wurde am 18.06.2025 von der EU zurückgezogen
              </strong>{" "}
              — aber §50d und PPT-Tests in DBAs bleiben scharf.
            </div>
          </div>
        </div>
      </div>

      {/* ============ DISCLAIMER ============ */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Modell-Annahmen + verbleibende Vereinfachungen:</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                DE-GmbH-Steuer-Mix ~{KST_GEWST_KOMBI}% (KSt {KST_SATZ}% + SolZ {SOLZ_KST}% + GewSt typisch {GEWST_SATZ_TYPISCH}%
                bei Hebesatz 400%). Bei München (490%) oder Berlin (410%) variiert das.
              </li>
              <li>
                §AStG-Aktivkatalog vereinfacht — Funktionsprüfung für Handel/DL mit beherrschendem Inländer im
                Detail mit StB klären
              </li>
              <li>
                §12 AStG: tatsächlich gezahlte Auslandssteuer automatisch anrechenbar (per-country-limitation
                §34c EStG nicht modelliert)
              </li>
              <li>
                Bei Drittland-Töchtern (CH/USA/HK): Einzelfall-DBA-Prüfung — LoB-Tests + Antragsverfahren
              </li>
              <li>
                <strong>Pillar 2 (15% Mindeststeuer)</strong> nur für Konzerne ≥€750M — für Solo-Founder
                irrelevant, AStG-15%-Schwelle synchron
              </li>
              <li>
                Maltas 6/7-Refund: nominell 35% Cash-out, Refund nach 4-6 Monaten — Cashflow-Risiko nicht
                modelliert
              </li>
              <li>
                <strong>Konkrete Berechnung immer mit StB für internationales Steuerrecht</strong> — Tool
                liefert Orientierung, keine Beratung im Sinne StBerG
              </li>
            </ul>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

export default DbaCfcRechner;
