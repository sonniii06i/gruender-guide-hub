import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import {
  Callout,
  ChoiceGroup,
  Field,
  ResultPanel,
  ToolLayout,
  ToolSection,
  selectCls,
  type Tone,
} from "@/components/cockpit/kit";
import { cn } from "@/lib/utils";
import {
  Calculator,
  Globe,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  Plane,
  Building2,
  Users,
  MapPin,
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
const DBA_SATZ_PRIVAT = 15; // Art. 10 Abs. 2 b OECD-MA / DE-DBA: Quellensteuer-Höchstsatz für natürliche Personen

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
  /** Effektive Belastung nach Erstattung an die Gesellschafter (Malta 6/7-Refund). §8 Abs. 5 Satz 2 AStG bezieht
   *  solche Erstattungen in die Niedrigsteuer-Prüfung ein. */
  effektivNachRefund?: number;
  effektivNachRefundPassiv?: number;
  /** Abweichender CIT für passive Einkünfte (Irland: 25 % auf nicht-trading income). */
  passiveCit?: number;
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
    isLowTaxCountry: false, // 22% > 15% → §AStG-Schwelle nicht unterschritten
    notes: [
      "0% auf thesaurierte Gewinne — nur bei Ausschüttung 22% DPT (22/78 auf den Nettobetrag; die geplante Erhöhung auf 24% ab 2026 wurde gestrichen)",
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
    cit: 23.87, // Luxemburg-Stadt 2025/2026: CIT 16 % + 7 % Solidaritätszuschlag + Gewerbesteuer 6,75 % (Loi du 20.12.2024)
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
    passiveCit: 25, // Irland: 25 % auf passive (non-trading) Einkünfte — Revenue, TCA 1997 s. 21A
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
    cit: 15, // Cyprus CIT 15% ab 1.1.2026 (Pillar Two); zuvor 12,5% — Quelle KPMG/PwC Cyprus 2026
    dividendWHT: 0,
    dividendWHTwithDBA: 0,
    minStakeForDBA: 0,
    motherDaughter: true,
    isLowTaxCountry: false, // 15% liegt AUF der §AStG-Schwelle (15%) → nicht mehr niedrig besteuert
    notes: [
      "0% national WHT auf Out-Dividenden (non-resident Empfänger)",
      "IP-Box: 2,5% effektiv auf qualifizierte IP-Einkünfte",
      "Notional Interest Deduction (NID) für Eigenkapital-Strukturierung",
      "Substance-Test §50d Abs. 3 EStG kritisch bei DE-Empfänger",
    ],
    citSource: "Cyprus 15% CIT ab 2026 (KPMG/PwC)",
  },
  malta: {
    flag: "🇲🇹",
    name: "Malta",
    cit: 35, // Nominell — Refund-Mechanik: effektivNachRefund
    effektivNachRefund: 5, // 6/7-Refund bei Trading-Income
    effektivNachRefundPassiv: 10, // 5/7-Refund bei passiven Zinsen/Lizenzen
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
      "KEIN umfassendes DBA Deutschland–HK in Kraft (nur beschränktes Schiff-/Luftverkehrs-Abkommen 2011; Comprehensive DTA seit 2014 in Verhandlung) → keine DBA-Quellensteuerreduktion, §AStG-Risiko höher",
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

    if (einkuenfteArt === "passive" && country.passiveCit !== undefined) {
      effCit = country.passiveCit;
      citNote = `Passive Einkünfte: ${country.passiveCit}%`;
    } else if (country.effektivNachRefund !== undefined) {
      const eff = einkuenfteArt === "passive" ? country.effektivNachRefundPassiv ?? country.effektivNachRefund : country.effektivNachRefund;
      effCit = eff;
      citNote = `${country.cit}% nominal, nach Erstattung an die Gesellschafter effektiv ${eff}% (zählt nach §8 Abs. 5 AStG mit)`;
    }

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
    // Schachtel-/Qualified-Sätze der DBA gelten nur für Kapitalgesellschaften als Empfänger (OECD-MA Art. 10 Abs. 2 a).
    const qualifiedApplies =
      hatHoldingDe &&
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
        hatHoldingDe &&
        beteiligung >= country.minStakeForDBA &&
        haltedauer >= MTR_HALTEDAUER_MONATE &&
        country.dividendWHTwithDBA < country.dividendWHT;
      if (dbaApplies) {
        wht = country.dividendWHTwithDBA;
        whtNote = `DBA-Reduktion (≥${country.minStakeForDBA}% + ${MTR_HALTEDAUER_MONATE}M): ${country.dividendWHT}% → ${wht}%`;
      } else if (!hatHoldingDe && country.dividendWHT > DBA_SATZ_PRIVAT) {
        // Natürliche Personen: DBA-Regelsatz (Art. 10 Abs. 2 b OECD-MA, i. d. R. 15 %) nach Erstattung
        wht = DBA_SATZ_PRIVAT;
        whtNote = `DBA-Satz für Privatpersonen: ${country.dividendWHT}% → ${wht}% (Rest per Erstattungsantrag)`;
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
      // DE-Privatperson: 25 % Abgeltungsteuer auf die Bruttodividende, ausländische Quellensteuer wird
      // nach §32d Abs. 5 EStG angerechnet (höchstens der DBA-Satz, max. 25 %); SolZ 5,5 % auf die Rest-Steuer.
      const anrechenbar = Math.min(whtAbsolute, (auslandsNetto * Math.min(wht, 25)) / 100);
      deSteuer = Math.max(0, auslandsNetto * 0.25 - anrechenbar) * (1 + SOLZ_KST / 100);
      deBezeichnung = `DE-Privatperson: 25% Abgeltungssteuer + SolZ auf die Bruttodividende, minus ${formatEur(anrechenbar)} anrechenbare Quellensteuer (§32d Abs. 5 EStG). Keine MTR-Befreiung — Privatperson schließt EU-Mutter-Tochter-RL aus.`;
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

  const hatOptionen =
    country.smallCit !== undefined || country.progressiveLow !== undefined || !!country.distributedProfitsTax || land === "usa";

  return (
    <CockpitShell
      eyebrow="Internationales Steuerrecht · Stand Mai 2026"
      title="DBA-CFC-Rechner: Auslandsgewinn und deutsche Steuer"
      subtitle="Was vom Gewinn deiner Auslandsgesellschaft in Deutschland ankommt: lokale Steuer, Quellensteuer nach DBA oder Mutter-Tochter-Richtlinie, Schachtelprivileg nach § 8b KStG und § 9 GewStG, Hinzurechnung nach AStG (15-%-Schwelle seit 2024) und Estlands Ausschüttungssteuer. 14 Länder, jeder Wert mit Quelle."
    >
      <ToolLayout
        className="mb-8"
        inputs={
          <>
            <ToolSection title="Auslandsgesellschaft" icon={Globe}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Land" htmlFor="dba-land" hint="In Klammern der reguläre Körperschaftsteuersatz">
                  <select
                    id="dba-land"
                    value={land}
                    onChange={(e) => {
                      setLand(e.target.value as keyof typeof COUNTRIES);
                      setUseSmallCit(false);
                      setUseProgressiveLow(false);
                      setEstlandThesauriert(false);
                    }}
                    className={selectCls}
                  >
                    {Object.entries(COUNTRIES).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v.flag} {v.name} ({v.cit}% CIT)
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Gewinn vor Steuern (€)" htmlFor="dba-gewinn" hint="Jahresgewinn der Auslandsgesellschaft">
                  <Input
                    id="dba-gewinn"
                    type="number"
                    value={auslandsgewinn}
                    onChange={(e) => setAuslandsgewinn(Math.max(0, Number(e.target.value) || 0))}
                    className="tabular"
                  />
                </Field>
                <Field label="Art der Einkünfte" htmlFor="dba-art" className="sm:col-span-2" hint="Passive Einkünfte in Niedrigsteuerländern lösen die AStG-Hinzurechnung aus">
                  <select
                    id="dba-art"
                    value={einkuenfteArt}
                    onChange={(e) => setEinkuenfteArt(e.target.value as typeof einkuenfteArt)}
                    className={selectCls}
                  >
                    <option value="aktiv">Aktiv (Handel, Service, Produktion, § 8 Abs. 1 AStG)</option>
                    <option value="passive">Passiv (Lizenz, Zinsen, Mieten, außerhalb Aktivkatalog)</option>
                  </select>
                </Field>
              </div>

              {/* Länder-spezifische Optionen */}
              {hatOptionen && (
                <fieldset className="mt-5 rounded-xl border border-border bg-secondary/30 p-4">
                  <legend className="px-1 text-sm font-semibold">Optionen für {country.name}</legend>
                  <div className="space-y-3">
                    {country.smallCit !== undefined && (
                      <label className="flex cursor-pointer items-start gap-3 text-sm">
                        <input
                          type="checkbox"
                          checked={useSmallCit}
                          onChange={(e) => {
                            setUseSmallCit(e.target.checked);
                            if (e.target.checked) setUseProgressiveLow(false);
                          }}
                          className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]"
                        />
                        <span>
                          <strong className="font-medium tabular">{country.smallCit}% Small-CIT:</strong>{" "}
                          <span className="text-muted-foreground">{country.smallCitLabel}</span>
                        </span>
                      </label>
                    )}
                    {country.progressiveLow !== undefined && (
                      <label className="flex cursor-pointer items-start gap-3 text-sm">
                        <input
                          type="checkbox"
                          checked={useProgressiveLow}
                          onChange={(e) => {
                            setUseProgressiveLow(e.target.checked);
                            if (e.target.checked) setUseSmallCit(false);
                          }}
                          className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]"
                        />
                        <span>
                          <strong className="font-medium tabular">{country.progressiveLow}%:</strong>{" "}
                          <span className="text-muted-foreground">{country.progressiveLowLabel}</span>
                        </span>
                      </label>
                    )}
                    {country.distributedProfitsTax && (
                      <label className="flex cursor-pointer items-start gap-3 text-sm">
                        <input
                          type="checkbox"
                          checked={estlandThesauriert}
                          onChange={(e) => setEstlandThesauriert(e.target.checked)}
                          className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]"
                        />
                        <span>
                          <strong className="font-medium">Gewinn thesaurieren:</strong>{" "}
                          <span className="text-muted-foreground">keine Ausschüttung, daher keine {country.cit}% DPT</span>
                        </span>
                      </label>
                    )}
                    {land === "usa" && (
                      <Field label="Körperschaftsteuer des US-Bundesstaats" htmlFor="dba-state">
                        <select
                          id="dba-state"
                          value={usStateRate}
                          onChange={(e) => setUsStateRate(Number(e.target.value))}
                          className={selectCls}
                        >
                          <option value={0}>0%: WY / NV / SD / TX (Margin Tax) / WA / OH</option>
                          <option value={2}>2,0%: NC (niedrigster mit Income Tax)</option>
                          <option value={8.7}>8,7%: Delaware (+ Gross Receipts Tax)</option>
                          <option value={8.84}>8,84%: California</option>
                          <option value={11.5}>11,5%: New Jersey (höchster)</option>
                        </select>
                      </Field>
                    )}
                  </div>
                </fieldset>
              )}
            </ToolSection>

            <ToolSection title="Beteiligung und Empfänger in Deutschland" icon={Users}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Beteiligung (%)" htmlFor="dba-bet" hint="Ab 10 % KSt-Schachtel, ab 15 % GewSt-Schachtel">
                  <Input
                    id="dba-bet"
                    type="number"
                    min={0}
                    max={100}
                    value={beteiligung}
                    onChange={(e) => setBeteiligung(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                    className="tabular"
                  />
                </Field>
                <Field label="Haltedauer (Monate)" htmlFor="dba-halt" hint="DBA-Reduktion und Mutter-Tochter-RL ab 12 Monaten">
                  <Input
                    id="dba-halt"
                    type="number"
                    min={0}
                    value={haltedauer}
                    onChange={(e) => setHaltedauer(Math.max(0, Number(e.target.value) || 0))}
                    className="tabular"
                  />
                </Field>
                <div className="space-y-1.5 sm:col-span-2">
                  <p className="text-sm font-medium">Wer hält die Beteiligung?</p>
                  <ChoiceGroup<boolean>
                    label="Empfänger in Deutschland"
                    value={hatHoldingDe}
                    onChange={setHatHoldingDe}
                    className="grid grid-cols-1 sm:grid-cols-2"
                    options={[
                      { value: true, label: "DE-Holding-GmbH", hint: "§ 8b KStG, Mutter-Tochter-RL möglich" },
                      { value: false, label: "DE-Privatperson", hint: "Abgeltungsteuer 26,375 %, Quellensteuer anrechenbar" },
                    ]}
                  />
                </div>
              </div>

              {/* §AStG ESt-Satz nur bei Privatperson + passive Einkünfte */}
              {!hatHoldingDe && einkuenfteArt === "passive" && (
                <div className="mt-5 rounded-xl border border-warning/25 bg-warning-soft p-4">
                  <Field
                    label="Persönlicher Einkommensteuersatz (für die AStG-Hinzurechnung)"
                    htmlFor="dba-est"
                    hint="§ 32a EStG: 14 % Eingangssatz bis 47,5 % Spitzensatz (inkl. SolZ und ggf. Reichensteuer)"
                  >
                    <Input
                      id="dba-est"
                      type="number"
                      min={14}
                      max={47.5}
                      value={estSatzPrivat}
                      onChange={(e) => setEstSatzPrivat(Math.max(14, Math.min(47.5, Number(e.target.value) || 42)))}
                      className="tabular"
                    />
                  </Field>
                </div>
              )}
            </ToolSection>
          </>
        }
        result={
          <>
            <ResultPanel
              variant="ink"
              kicker={`${country.name} → Deutschland`}
              title="Netto beim Empfänger"
              value={formatEur(calc.finalNetto)}
              valueHint={`von ${formatEur(auslandsgewinn)} Gewinn vor Steuern`}
            >
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10">
                {[
                  { l: "Steuern gesamt", v: formatEur(calc.totalSteuer) },
                  { l: "Effektiver Satz", v: `${calc.effektivPct.toFixed(1)}%` },
                ].map((k) => (
                  <div key={k.l} className="bg-white/[0.04] p-3">
                    <div className="text-xs text-primary-foreground/65">{k.l}</div>
                    <div className="mt-0.5 font-semibold text-primary-foreground tabular">{k.v}</div>
                  </div>
                ))}
              </div>
            </ResultPanel>

            <ToolSection title="Berechnung Schritt für Schritt" icon={Calculator} bodyClassName="p-0">
              <ol className="divide-y divide-border/70">
                {/* 1. Auslandssteuer */}
                <Schritt nr={1} titel={`Lokale Steuer in ${country.name} (${calc.effCit}%)`} betrag={calc.auslandsSteuer}>
                  <p className="tabular">
                    {auslandsgewinn.toLocaleString("de-DE")} € × {calc.effCit}% = {formatEur(calc.auslandsSteuer)}
                  </p>
                  {calc.citNote && <p className="mt-0.5">{calc.citNote}</p>}
                  <p className="mt-1 text-foreground/80">
                    Verbleibend: <span className="font-medium tabular">{formatEur(calc.auslandsNetto)}</span>
                  </p>
                </Schritt>

                {/* 2. Quellensteuer */}
                <Schritt nr={2} titel={`Quellensteuer bei Ausschüttung (${calc.whtRate}%)`} betrag={calc.whtAbsolute}>
                  {calc.motherDaughterEligible && (
                    <p className="flex items-start gap-1.5 text-success">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      EU-Mutter-Tochter-RL: 0% (Kap-Ges. zu Kap-Ges., ≥10% + 12M)
                    </p>
                  )}
                  {calc.qualifiedApplies && (
                    <p className="flex items-start gap-1.5 text-success">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      Qualified-Rate aktiv: {calc.whtNote}
                    </p>
                  )}
                  {!calc.motherDaughterEligible && !calc.qualifiedApplies && <p>{calc.whtNote}</p>}
                  {!hatHoldingDe && country.motherDaughter && (
                    <p className="mt-1 flex items-start gap-1.5 text-warning">
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      MTR-Befreiung nicht anwendbar, sie gilt nur Kap-Ges. zu Kap-Ges. (§43b EStG)
                    </p>
                  )}
                  <p className="mt-1 text-foreground/80">
                    Kommt beim Empfänger an: <span className="font-medium tabular">{formatEur(calc.inDeAusgeschuettet)}</span>
                  </p>
                </Schritt>

                {/* 3. DE-Steuer */}
                <Schritt nr={3} titel="Steuer beim Empfänger in Deutschland" betrag={calc.deSteuer}>
                  <p>{calc.deBezeichnung}</p>
                  {calc.streubesitz && (
                    <p className="mt-1 flex items-start gap-1.5 text-danger">
                      <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      Streubesitz {beteiligung}% &lt; {STREUBESITZ_KST_SCHWELLE}%: nach §8b Abs. 4 KStG keine 95%-Befreiung
                    </p>
                  )}
                  {calc.gewstFehlend && (
                    <p className="mt-1 flex items-start gap-1.5 text-warning">
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      Beteiligung {beteiligung}% reicht für die KSt-Schachtel (≥{STREUBESITZ_KST_SCHWELLE}%), aber nicht für die GewSt-Schachtel (≥{SCHACHTEL_GEWST_SCHWELLE}%): volle GewSt fällt an
                    </p>
                  )}
                </Schritt>

                {/* 4. §AStG */}
                {calc.astgGreift && (
                  <Schritt nr={4} titel="Hinzurechnung nach AStG greift" betrag={calc.astgZusatz} tone="danger">
                    <p>{calc.astgBezeichnung}</p>
                  </Schritt>
                )}
              </ol>
              <div className="border-t border-border/70 p-4 md:px-6">
                {!calc.astgGreift && einkuenfteArt === "passive" && (
                  <Callout tone="success" title="Keine Hinzurechnung nach AStG">
                    {!calc.istNiedrigsteuer && `Steuersatz ${calc.effCit}% ≥ ${ASTG_NIEDRIGSTEUER_SCHWELLE}% (keine Niedrigsteuer).`}
                    {calc.istNiedrigsteuer && !calc.istBeherrschungSchwelle && `Beteiligung ${beteiligung}% ≤ 50% (keine Beherrschung).`}
                  </Callout>
                )}
                {einkuenfteArt === "aktiv" && (
                  <Callout tone="success" title="Keine Hinzurechnung nach AStG">
                    Aktive Tätigkeit fällt unter den Aktivkatalog (§ 8 Abs. 1 AStG). Bei Handel oder Dienstleistungen mit einem
                    beherrschenden Inländer trotzdem die Funktionsprüfung beachten.
                  </Callout>
                )}
                {calc.astgGreift && (
                  <Callout tone="danger" title="Achtung: AStG-Hinzurechnung">
                    Passive Einkünfte, Niedrigsteuer und Beherrschung treffen zusammen. Die Belastung in Deutschland ist hier
                    mit dem höheren Wert aus Ausschüttungs- und Hinzurechnungsbesteuerung angesetzt.
                  </Callout>
                )}
              </div>
            </ToolSection>
          </>
        }
      />

      {/* ============ COUNTRY-NOTES ============ */}
      <ToolSection
        className="mb-6"
        icon={MapPin}
        title={`Besonderheiten in ${country.name}`}
        description={country.citSource ? `Quelle: ${country.citSource}` : undefined}
      >
        <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          {country.notes.map((n, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" aria-hidden="true" />
              <span>{n}</span>
            </li>
          ))}
        </ul>
        {(country.motherDaughter || country.isLowTaxCountry) && (
          <div className="mt-4 space-y-2 border-t border-border/70 pt-4 text-sm">
            {country.motherDaughter && (
              <p className="flex items-start gap-2 text-success">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>EU-Mutter-Tochter-RL anwendbar (0% WHT bei ≥10% + 12M, nur Kap-Ges. zu Kap-Ges.)</span>
              </p>
            )}
            {country.isLowTaxCountry && (
              <p className="flex items-start gap-2 text-warning">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Niedrigsteuerland (CIT &lt; {ASTG_NIEDRIGSTEUER_SCHWELLE}%): AStG-Risiko bei passiven Einkünften und Beherrschung</span>
              </p>
            )}
          </div>
        )}
      </ToolSection>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* ============ WEGZUGSBESTEUERUNG-HINWEIS ============ */}
        <Callout tone="warning" icon={Plane} title="§ 6 AStG Wegzugsbesteuerung: neu seit JStG 2024">
          Wenn du als DE-Inhaber einer Kap-Ges-Beteiligung (≥1% in den letzten 5 Jahren) ins Ausland ziehst:
          fiktiver Verkauf, Steuer auf stille Reserven (Teileinkünfteverfahren {TEILEINKUENFTE_ANTEIL}%).{" "}
          <strong className="font-medium text-foreground">EU/EWR-Stundung entfällt seit 2022</strong>, es bleiben nur noch 7 Raten gegen
          Sicherheit. Bei {">"}25% Ausschüttungen in 7 Jahren: sofortiger Widerruf der Stundung. Das JStG 2024 erweitert die
          Regel ab 1.1.2025 auf Investmentfonds-Anteile.
        </Callout>

        {/* ============ SUBSTANCE / §50d Abs. 3 EStG ============ */}
        <Callout tone="warning" icon={Building2} title="§ 50d Abs. 3 EStG: Substanz ist Pflicht">
          DBA- und MTR-Vorteile werden versagt, wenn die Auslands-Holding keine wirtschaftliche Substanz hat: eigenes Personal mit
          Entscheidungsbefugnis, eigene Räume, eigene Wertschöpfung, eigenes Bankkonto. BZSt-Praxis-Update März 2025:
          Limited-Look-Through möglich.{" "}
          <strong className="font-medium text-foreground">ATAD III („Unshell“-RL) wurde am 18.06.2025 von der EU zurückgezogen</strong>,
          § 50d und die PPT-Tests in DBAs bleiben aber scharf.
        </Callout>
      </div>

      {/* ============ DISCLAIMER ============ */}
      <ToolSection icon={Info} title="Modell-Annahmen und Vereinfachungen">
        <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          {[
            <>DE-GmbH-Steuer-Mix ~{KST_GEWST_KOMBI}% (KSt {KST_SATZ}% + SolZ {SOLZ_KST}% + GewSt typisch {GEWST_SATZ_TYPISCH}% bei Hebesatz 400%). In München (490%) oder Berlin (410%) weicht das ab.</>,
            <>AStG-Aktivkatalog vereinfacht: Funktionsprüfung für Handel/DL mit beherrschendem Inländer im Detail mit der Steuerberatung klären.</>,
            <>§ 12 AStG: tatsächlich gezahlte Auslandssteuer automatisch anrechenbar (per-country-limitation nach § 34c EStG nicht modelliert).</>,
            <>Drittland-Töchter (CH/USA/HK): DBA im Einzelfall prüfen, inklusive LoB-Tests und Antragsverfahren.</>,
            <><strong className="font-medium text-foreground">Pillar 2 (15% Mindeststeuer)</strong> gilt nur für Konzerne ab 750 Mio. €, für Solo-Founder irrelevant. Die AStG-15%-Schwelle ist synchron.</>,
            <>Maltas 6/7-Refund: nominell 35% Cash-out, Erstattung nach 4 bis 6 Monaten. Das Cashflow-Risiko ist nicht modelliert.</>,
            <><strong className="font-medium text-foreground">Konkrete Berechnung immer mit einer Steuerberatung für internationales Steuerrecht.</strong> Das Tool liefert Orientierung, keine Beratung im Sinne des StBerG.</>,
          ].map((t, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" aria-hidden="true" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </ToolSection>
    </CockpitShell>
  );
};

const Schritt = ({
  nr,
  titel,
  betrag,
  tone = "neutral",
  children,
}: {
  nr: number;
  titel: string;
  betrag: number;
  tone?: Tone;
  children: React.ReactNode;
}) => (
  <li className={cn("px-5 py-4 md:px-6", tone === "danger" && "bg-danger-soft")}>
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-start gap-3">
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular",
            tone === "danger" ? "bg-danger text-primary-foreground" : "bg-secondary text-muted-foreground",
          )}
        >
          {nr}
        </span>
        <span className={cn("pt-0.5 text-sm font-semibold", tone === "danger" && "text-danger")}>{titel}</span>
      </div>
      <span className={cn("shrink-0 pt-0.5 text-sm font-semibold tabular", tone === "danger" ? "text-danger" : "text-foreground")}>
        −{formatEur(betrag)}
      </span>
    </div>
    <div className="mt-1.5 pl-9 text-xs leading-relaxed text-muted-foreground">{children}</div>
  </li>
);

export default DbaCfcRechner;
