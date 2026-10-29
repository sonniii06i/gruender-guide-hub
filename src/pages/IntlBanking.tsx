import { useState, type ReactNode } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Callout, ChoiceGroup, EmptyState, KitTable, ToneBadge, ToolSection, type Tone } from "@/components/cockpit/kit";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ExternalLink,
  Check,
  CheckCircle2,
  ChevronDown,
  XCircle,
  Globe,
  Banknote,
  ListChecks,
  Minus,
  ShieldAlert,
  Star,
  AlertTriangle,
  Info,
} from "lucide-react";

// ============================================================
// INTERNATIONAL BANKING · Stand Mai 2026 (Total-Refactor)
// ============================================================
// Verifizierte Quellen Mai 2026:
// - Pricing: Issuer-Webseiten direkt (Mercury, Wise, Relay, Brex, Statrys,
//   Airwallex, Currenxie, HSBC HK)
// - Closure-Risk: Trustpilot + OffshoreCorpTalk + Reddit r/Entrepreneur +
//   TechCrunch (Mercury Ukraine/Nigeria-Sweep Juli 2024) +
//   Hacker News (Wise Freezes 2025-2026) + LinkedIn (Airwallex Frozen Reports)
// - Compliance Updates: FinCEN BOI-Removal März 2025, HKMA Stablecoin-Lizenz
//   April 2026, Capital-One acquires Brex April 2026, Mercury OCC-Charter
//   April 2026
// ============================================================

type Region = "us" | "hk";
type ClosureRisk = "low" | "medium" | "high" | "very_high";
type Persona = "wise-personal";

type Bank = {
  slug: string;
  name: string;
  region: Region | Persona;
  emoji: string;
  monthlyFee: string;
  setupFee: string;
  /** Akzeptiert non-Resident Founder? */
  nonResident: "ja" | "schwierig" | "vor-ort-pflicht";
  /** Bestes Use-Case. */
  bestFor: string;
  pros: string[];
  cons: string[];
  features: {
    multiCurrency: boolean;
    achWire: boolean;
    quickbooksXero: boolean;
    debitCard: boolean;
    apiAccess: boolean;
    crypto: boolean;
  };
  setupRequirements: string[];
  url: string;
  // ===== NEU Mai 2026 =====
  /** Closure/Freeze-Risiko aus aggregierter User-Erfahrung. */
  closureRisk: ClosureRisk;
  /** Was triggert Closures bei diesem Anbieter. */
  closurePattern: string;
  /** Typische Hold-Dauer bei Freeze. */
  freezeDuration?: string;
  /** Trustpilot. */
  trustpilotRating?: number;
  trustpilotCount?: string;
  trustpilotUrl?: string;
  /** G2 (für Business-Banking). */
  g2Rating?: number;
  /** Hidden Fees / Gotchas. */
  hiddenFees: string[];
};

const CLOSURE_RISK_META: Record<ClosureRisk, { label: string; tone: Tone }> = {
  low: { label: "Niedrig", tone: "success" },
  medium: { label: "Mittel", tone: "warning" },
  high: { label: "Hoch", tone: "danger" },
  very_high: { label: "Sehr hoch", tone: "danger" },
};

const BANKS: Bank[] = [
  // ============ WISE PERSONAL (für Solo-Founder ohne Business-Need!) ============
  {
    slug: "wise-personal",
    name: "Wise Personal (DE)",
    region: "wise-personal",
    emoji: "👤",
    monthlyFee: "€0",
    setupFee: "€0 (typisch €20 Min-Einzahlung für KYC-Verifikation)",
    nonResident: "ja",
    bestFor: "Solo-Founder / Freelancer ohne formale GmbH/LLC · USD/GBP/EUR-Multi-Currency · Kein Business-Account-Wunsch",
    pros: [
      "**€0 Setup-Fee, kein Monthly-Fee** — wirklich kostenlos",
      "€20 typische Erst-Einzahlung für KYC ist die einzige Ausgabe",
      "Multi-Currency-Wallets in 40+ Währungen",
      "USD-Routing + Account-Number → von Stripe/Amazon US akzeptiert",
      "Mid-Market-FX-Rate + 0,3-0,5% Fee (deutlich besser als jede DE-Bank)",
      "Schnelles Onboarding (Stunden statt Tagen)",
    ],
    cons: [
      "Kein dedicated Business-Banking (kein Multi-User, kein API)",
      "Wenn DE-Finanzamt 'Geschäftskonto' verlangt: lieber Wise Business oder Qonto",
      "Closure-Risk medium (NBB-Address-Proof-Sweep 2024-2026 traf auch Personal)",
    ],
    features: { multiCurrency: true, achWire: true, quickbooksXero: false, debitCard: true, apiAccess: false, crypto: false },
    setupRequirements: ["Pass / Personalausweis", "DE-Adress-Proof", "Selfie-Verification", "€20 Min-Top-up (sonst kein Card-Access)"],
    url: "https://wise.com/de",
    closureRisk: "medium",
    closurePattern: "NBB-Address-Proof-Welle Q4 2024-Mai 2026; Crypto-Conversions triggern Freezes",
    freezeDuration: "14-60 Werktage",
    trustpilotRating: 4.3,
    trustpilotCount: "~289.000",
    trustpilotUrl: "https://www.trustpilot.com/review/wise.com",
    hiddenFees: [
      "Card-Withdrawal-Limit 250€/Monat free, danach 2,69%",
      "Conversion in 'minor' Currencies bis 1,5%",
      "Bei Multi-Account-Setups (Personal + Business gleicher User) höheres Closure-Risk",
    ],
  },

  // ============ US BANKS ============
  {
    slug: "mercury",
    name: "Mercury",
    region: "us",
    emoji: "🪐",
    monthlyFee: "$0 (Plus $35 / Pro $350)",
    setupFee: "$0",
    nonResident: "ja",
    bestFor: "US-LLC mit Stripe-Operations · Treasury-Yield bis 4,09 % netto (erst ab 20 Mio. $ Einlagen) · DE-Founder mit Wyoming/Delaware-LLC",
    pros: [
      "**$0 Setup + Monthly Standard-Plan** — wirklich kostenlos",
      "Akzeptiert non-Resident Founder von 200+ Ländern (DACH-Solos inkl.)",
      "Sehr saubere App + Web-UI, API + Stripe-Integration",
      "Mercury Treasury: **bis 4,09 % netto** Yield (nur bei 20–50 Mio. $ Einlagen; 250k–2 Mio. $: ca. 3,3–3,6 %), Mindestguthaben 250.000 $ (laut mercury.com/treasury, Stand 27.10.2026; variabel, folgt dem US-Leitzins)",
      "Wires + ACH inkl., FDIC bis $5M via Sweep zu Partner-Banks",
      "Mercury Bank N.A.: vorläufige bedingte OCC-Zusage April 2026; bis zur finalen Zulassung weiter Partnerbanken",
    ],
    cons: [
      "**Closure-Wellen seit 2024**: 37+ Länder gesperrt (Ukraine, Nigeria, Venezuela etc.) — DE selbst safe",
      "**Registered-Agent-Adressen seit 2025 NICHT mehr akzeptiert** → echte US-Adresse Pflicht (Mailbox-Provider mit Lease OK)",
      "3 % FX-Gebühr auf non-USD-Kartenzahlungen (auch in EU einkaufen kostet 3 %); 1 % bei non-USD-Wires",
      "Mercury IO Credit Card nur für VC-funded — Solo gibt's nicht",
    ],
    features: { multiCurrency: false, achWire: true, quickbooksXero: true, debitCard: true, apiAccess: true, crypto: false },
    setupRequirements: [
      "EIN-Letter vom IRS (CP575)",
      "Articles of Organization (Stamped PDF)",
      "Operating Agreement",
      "Pass des wirtschaftlich Berechtigten",
      "★ Echte US-Adresse (kein Registered Agent, kein PO Box, kein UPS Store)",
      "Nachweis der Geschäftstätigkeit (Pitch Deck, Vertrag, Website)",
    ],
    url: "https://mercury.com",
    closureRisk: "high",
    closurePattern: "Compliance-Sweeps gegen 'prohibited countries' (37 Länder), Crypto-Exchange-Transactions, plötzliche Volume-Spikes >$500k inbound. Registered-Agent-Adressen seit 2025 abgelehnt.",
    freezeDuration: "60 Tage Hold typisch, US-Residents 15 Werktage zum Withdraw, Non-US länger",
    trustpilotRating: 4.4,
    trustpilotCount: "~2.500",
    trustpilotUrl: "https://www.trustpilot.com/review/mercury.com",
    g2Rating: 4.5,
    hiddenFees: [
      "Mass-API-Payments + FX brauchen $35/mo Plus-Plan",
      "3 % FX-Gebühr auf non-USD-Kartenzahlungen (1 % bei non-USD-Wires)",
      "Treasury ist KEIN FDIC, nur SIPC ($500k Coverage)",
      "Hidden: bei Account-Closure 60-Tage-Hold ohne Vorwarnung möglich",
    ],
  },
  {
    slug: "wise-business",
    name: "Wise Business",
    region: "us",
    emoji: "💸",
    monthlyFee: "€0",
    setupFee: "**Variiert nach Region**: DE 55 € · US $31 · UK £50 · übriger EWR 60 € · SG SGD 99",
    nonResident: "ja",
    bestFor: "Multi-Currency-Geschäft · DACH-Founder mit USD/GBP/EUR-Mix · FX-Optimierung",
    pros: [
      "**Niedrigste FX-Kosten** der Liste (Mid-Market + ab 0,2 %, je nach Währung)",
      "Multi-Currency: USD, GBP, EUR, AUD + 50 weitere mit Local-Account-Details",
      "ACH-Routing + USD-IBAN — von Stripe/Amazon akzeptiert",
      "Batch-Payments, API, Invoicing-Tools (Business-Features)",
      "Wise Assets bis ~3,5% Yield (USD-Treasury-Fonds)",
    ],
    cons: [
      "**Setup-Fee einmalig (NICHT €20!)** — DE 55 €, US $31, UK £50 je Region",
      "**Closure-Risk medium-high** seit NBB-Mandate Q4 2024 + Wise US $4.2M-Settlement 2025",
      "Kein klassisches US-Bank-Konto (Geld liegt bei Wise, nicht bei US-Bank)",
      "Keine Kreditkarte (nur Debit)",
      "Manche US-Vendors verlangen 'echtes' US-Konto",
    ],
    features: { multiCurrency: true, achWire: true, quickbooksXero: true, debitCard: true, apiAccess: true, crypto: false },
    setupRequirements: ["Pass + Steuer-ID", "Geschäftsadresse mit Address-Proof (LLC-Name muss drauf!)", "EIN (für USD-Konto-Features)", "Geschäftsmodell-Beschreibung", "Selfie + Live-Verification"],
    url: "https://wise.com/business",
    closureRisk: "high",
    closurePattern: "Q4 2024-Mai 2026: NBB-Address-Proof-Sweep EU-weit; Q2 2025: US Wise Inc. SAR-Lookbacks; Crypto-Adjacent + Nominee-Structures + Multi-Entity-Profile = höchstes Risiko",
    freezeDuration: "14-60 Werktage, teils Monate",
    trustpilotRating: 4.3,
    trustpilotCount: "~289.000",
    trustpilotUrl: "https://www.trustpilot.com/review/wise.com",
    g2Rating: 4.4,
    hiddenFees: [
      "Address-Proof muss aktuell sein — nach NBB-Mandate regelmäßig neu verlangt!",
      "Multi-Entity-Setups (mehrere LLCs/GmbHs unter selbem Director) deutlich höheres Closure-Risk",
      "Wise-Card-Withdrawal-Limit 250€/Mo, danach 2,69%",
      "KEIN FDIC-Schutz (Safeguarded ja, kein klassisches Insurance)",
    ],
  },
  {
    slug: "relay",
    name: "Relay (RelayFi)",
    region: "us",
    emoji: "🔗",
    monthlyFee: "$0 (Starter) / $30 (Grow) / $90 (Scale, runter von $120)",
    setupFee: "$0",
    nonResident: "ja",
    bestFor: "Buchhaltungs-Integration · QuickBooks/Xero-User · Profit-First-Methode (20 Sub-Accounts)",
    pros: [
      "**Beste QuickBooks/Xero-Integration** der US-Banks",
      "**20 Sub-Accounts** pro Business (Profit-First-Buchhaltung)",
      "FDIC-versichert bis $3M via Insured Cash Sweep (Thread Bank)",
      "Wires + ACH inkl.",
      "Treasury-Yield bis 3% (Scale-Plan)",
      "Account Protection Team launched April 2026",
    ],
    cons: [
      "**Thread Bank Fraud-Detection-Holds** dauern Wochen (Reddit-Cases bis Monate)",
      "Verlangt 'operating presence in the U.S.' — schwammig, kann Ablehnung sein",
      "International-Wires $10 trotz Premium-Plan",
      "Weniger bekannt als Mercury — Onboarding 7-21 Tage",
    ],
    features: { multiCurrency: false, achWire: true, quickbooksXero: true, debitCard: true, apiAccess: true, crypto: false },
    setupRequirements: ["EIN-Letter", "Articles of Organization", "Operating Agreement", "US-Adresse mit Lease/Operating-Presence-Beweis", "Pass"],
    url: "https://relayfi.com",
    closureRisk: "medium",
    closurePattern: "Thread Bank Fraud-Detection-Flags → Holds Tage bis Wochen. Volume-Spikes >$50k ohne KYB-Update, RFI ignoriert, Crypto/iGaming-Activity",
    freezeDuration: "7-30 Tage typisch, Reddit-Cases bis Monate",
    trustpilotRating: 4.4,
    trustpilotCount: "~3.000+",
    trustpilotUrl: "https://www.trustpilot.com/review/relayfi.com",
    hiddenFees: [
      "International Wire $10 trotz Premium",
      "ACH-Limits niedriger als Mercury (Standard $25k/Tag)",
      "Same-Day ACH nur 10 free im Scale-Plan",
    ],
  },
  {
    slug: "brex",
    name: "Brex",
    region: "us",
    emoji: "🟧",
    monthlyFee: "$0 Essentials / $12/User Premium",
    setupFee: "$0",
    nonResident: "schwierig",
    bestFor: "VC-finanzierte Startups mit $50k+ Cash-Balance · Card-Spend >$10k/mo · NICHT für Solo/Bootstrap!",
    pros: [
      "Kreditkarte (kein Cash-Vorab nötig) — gut für Werbe-Spend",
      "Cashback + Reward-Punkte für Tech-Vendor-Spending (AWS, GCP)",
      "Beste Expense-Management-Tools im US-Banking",
      "Treasury-Yield bis ~4,5%",
    ],
    cons: [
      "**Solo-Founder + Bootstrap typisch ABGELEHNT** seit Juni 2022 (Mass-Closure 'tens of thousands' SMBs)",
      "**$50.000 Cash-Balance Mindest** ODER VC-funded ODER $400k monthly revenue",
      "**Capital-One-Übernahme abgeschlossen 7. April 2026** — neue Risk-Models in Integration, Pricing kann kippen",
      "Trustpilot 2,9/5 — eine der schlechtesten in dieser Liste",
      "Solo-DE-Founder = sehr hohe Ablehnungsquote",
      "USD-only — kein Multi-Currency wie Wise/Airwallex",
    ],
    features: { multiCurrency: false, achWire: true, quickbooksXero: true, debitCard: true, apiAccess: true, crypto: false },
    setupRequirements: ["US-EIN", "US-Incorporation", "US-Operations-Beweis", "US-Physical-Address", "Funding-Round-Docs ODER Revenue-Statements ODER $50k Cash"],
    url: "https://brex.com",
    closureRisk: "very_high",
    closurePattern: "Juni 2022 Mass-Closure SMBs/Solo-Bootstrap. 2023 Post-SVB-Welle. Dormant Accounts 3+ Monate, Card-Spend <$10k/mo, Web3/Token-Adjacent. Sofort-Closure mit 30-Tagen Withdraw-Window (kein Hold wie Mercury).",
    freezeDuration: "Direkt-Closure, kein Hold (30 Tage zum Withdraw)",
    trustpilotRating: 2.9,
    trustpilotCount: "~700",
    trustpilotUrl: "https://www.trustpilot.com/review/brex.com",
    g2Rating: 4.6,
    hiddenFees: [
      "Premium-Plan $12 PRO USER/Monat — 10 MA = $120/mo",
      "Bei <$10k monthly Spend: aggressive Account-Reviews",
      "Capital-One Integration: Pricing/Features könnten 2026/2027 kippen",
    ],
  },

  // ============ HK BANKS ============
  {
    slug: "statrys",
    name: "Statrys",
    region: "hk",
    emoji: "📜",
    monthlyFee: "HKD 0 (HKD 88/Mo wenn <5 Outflows!)",
    setupFee: "HKD 0",
    nonResident: "ja",
    bestFor: "HK-Limited-Setups · 100% remote · Banking + CS-Paket kombiniert · Beste All-Round-Wahl für Foreign Founders",
    pros: [
      "**Speziell für non-Resident HK-Firmen** designed",
      "**100% remote-Onboarding** (kein HK-Besuch nötig)",
      "Multi-Currency: HKD, USD, EUR, GBP, RMB",
      "Company-Secretary + Banking als Paket möglich",
      "**Account in 3 Tagen** (96% laut Statrys in <3 Tagen)",
      "Trustpilot 4,6/5 (höchste in HK-Liste)",
      "FX 0,1% Major Currencies (sehr kompetitiv)",
    ],
    cons: [
      "**HKD 88/Mo Inactivity-Fee** wenn <5 ausgehende Payments/Monat",
      "**HKD 450 Closure-Certificate-Fee** — wenn du wechselst",
      "**US-Personen explizit ausgeschlossen** (alle US-Accounts 2023-2024 terminated)",
      "Crypto/Forex/Adult-Industry abgelehnt",
      "Kein Treasury/Yield",
    ],
    features: { multiCurrency: true, achWire: true, quickbooksXero: true, debitCard: true, apiAccess: false, crypto: false },
    setupRequirements: ["HK/SG/BVI-Incorporation-Docs", "Business Registration Certificate", "Articles of Association", "Pass aller Directors/UBOs", "Address-Proof", "Business-Plan-Summary"],
    url: "https://statrys.com",
    closureRisk: "medium",
    closurePattern: "US-Personen 2023-2024 alle terminated. Crypto/Forex/Adult-Industry konsequent abgelehnt. Inkonsistente KYB, Long-Term Inactivity (>3 Monate ohne Outflows).",
    freezeDuration: "Selten Freezes, eher direkte Closures mit 30-60 Tagen Withdraw",
    trustpilotRating: 4.6,
    trustpilotCount: "~380",
    trustpilotUrl: "https://www.trustpilot.com/review/statrys.com",
    g2Rating: 4.5,
    hiddenFees: [
      "HKD 88/Mo Inactivity wenn <5 Outflows (~10 EUR/mo)",
      "HKD 250-450 Closure-Statements",
      "SWIFT-Intermediary-Fees gehen extra (HKD 60-85 ist nur Statrys-Anteil)",
      "Auto-Renewal Add-Ons ohne separate Bestätigung",
    ],
  },
  {
    slug: "airwallex",
    name: "Airwallex",
    region: "hk",
    emoji: "✈️",
    monthlyFee: "€0 Explore (€10k Saldo) sonst €19+ / €49 Grow / Accelerate individuell",
    setupFee: "€0",
    nonResident: "ja",
    bestFor: "Wachstums-Startups mit Multi-Currency-Treasury · API-Integration · 20+ Local-Currency-IBANs",
    pros: [
      "**Globaler Multi-Currency-Player** — HK, AU, UK, US, EU unter einem Dach",
      "**20+ Local-Currency-IBANs** (lokale SEPA/ACH-Rails kostenlos)",
      "Beste API in Asien-Banking",
      "Sehr niedrige FX-Kosten (0,5% Major)",
      "Stripe-Alternative für Payment-Acceptance",
    ],
    cons: [
      "**Trustpilot fällt 2026** von 3,7 → 3,3 (Closure-Cluster Q1/Q2 2026)",
      "**€10k Saldo nötig** um €19 Monthly zu sparen",
      "Yield-Product hat 0,15-0,63% Annual-Fee → effektiver Yield gering",
      "Card-Spend-User über 5 → €6-12/mo extra",
      "Manche Branchen abgelehnt (regulatorisch konservativ)",
    ],
    features: { multiCurrency: true, achWire: true, quickbooksXero: true, debitCard: true, apiAccess: true, crypto: false },
    setupRequirements: ["DE-Gewerbeschein oder GmbH-Auszug", "Pass aller UBOs", "Business-Description", "Umsatz-Estimate"],
    url: "https://airwallex.com",
    closureRisk: "high",
    closurePattern: "Stark steigende Reports Q1/Q2 2026 — Wallet-Holds 30-60 Tage mit Template-Antworten, dann finale Account-Suspension. iGaming/Forex/Crypto-Adjacent, plötzliche FX-Spikes, Multi-Entity-UBO.",
    freezeDuration: "30-90 Tage, auch endgültige Suspension möglich",
    trustpilotRating: 3.3,
    trustpilotCount: "~2.390",
    trustpilotUrl: "https://www.trustpilot.com/review/airwallex.com",
    g2Rating: 4.4,
    hiddenFees: [
      "€10k Saldo-Bedingung um Monthly zu sparen — sonst läuft Fee",
      "Yield-Product Annual-Fee → effektiver Yield gering",
      "5+ Card-User → €6-12/Mo extra",
      "★ Höchster Closure-Trend in 2026 unter HK-Fintechs",
    ],
  },
  {
    slug: "currenxie",
    name: "Currenxie",
    region: "hk",
    emoji: "💱",
    monthlyFee: "$0 (USD 8/Mo extra Virtual Account)",
    setupFee: "$0 (USD 50 für offshore/risky entities)",
    nonResident: "ja",
    bestFor: "International Trade · FX-fokussiert · Asien-Geschäft · USD/HKD-Heavy",
    pros: [
      "**FX 0,10% USD/HKD** (günstigster der Liste für Major-Currencies)",
      "Multi-Currency Wallets (USD, HKD, CNY, etc.)",
      "**USD 8 SWIFT** (sehr günstig)",
      "Visa Business Card mit 1% Cashback",
      "Schnelles Onboarding für Trade-Companies",
    ],
    cons: [
      "**Visa Card NUR HK-incorporated Companies**",
      "'Compliance reasons'-Closures dokumentiert (vage Begründungen)",
      "Refund-Delays berichtet (Mai 2026 Cases noch unresolved)",
      "Eher Trade-orientiert — weniger Tech-Startup-Features",
      "API begrenzt",
    ],
    features: { multiCurrency: true, achWire: true, quickbooksXero: false, debitCard: true, apiAccess: false, crypto: false },
    setupRequirements: ["HK/SG-Incorporation", "Pass aller UBOs", "Address-Proof", "Source-of-Funds (bei Volume)"],
    url: "https://currenxie.com",
    closureRisk: "medium",
    closurePattern: "'Closed for compliance reasons, not at liberty to disclose' — Standard-Begründung. Verifizierungs-Loops bei plötzlicher Volume-Steigerung.",
    freezeDuration: "14-60 Tage",
    trustpilotRating: 3.7,
    trustpilotCount: "~150-200",
    trustpilotUrl: "https://www.trustpilot.com/review/currenxie.com",
    hiddenFees: [
      "Visa Card NUR HK-incorporated — DE-Person mit BVI scheidet aus",
      "Offshore-Tier USD 50 Setup für BVI etc.",
      "USD 8 SWIFT scheint günstig — Intermediary-Bank-Fees extra",
    ],
  },
  {
    slug: "hsbc-hk",
    name: "HSBC Hong Kong",
    region: "hk",
    emoji: "🏦",
    monthlyFee: "HKD 200/Mo (waived bei HKD 50k Saldo)",
    setupFee: "HKD 10.000 Initial-Deposit",
    nonResident: "vor-ort-pflicht",
    bestFor: "Etablierte Companies mit HKD 50k+ Saldo + Chinageschäft + möglichem persönlichem HK-Besuch",
    pros: [
      "**Echte Großbank** — höchstes Vertrauen bei Vendoren",
      "Globaler HSBC-Verbund (Konten EU + Asien gespiegelt)",
      "Trade-Finance-Lösungen",
      "**Relationship-Manager** (echte Person vs Fintech-Chatbots)",
      "Stabilität — KEIN Mass-Closure-Pattern wie Mercury/Brex",
      "Standard-Sparkonto Yield ~3-4% USD",
    ],
    cons: [
      "**★ Persönliche HK-Vorstellung Pflicht** (Flug + Hotel ~2-3k EUR)",
      "**40-60% Ablehnungs-Quote** für Foreign Founders (laut Hongda Service Reports)",
      "Strenge KYC seit 2018 (Cyprus-Files-Era)",
      "HKD 200-300/Mo Fall-Below-Fee wenn <HKD 50k Saldo",
      "Account-Reviews alle 12-24 Monate — komplette neue KYC-Runde",
      "Bearbeitungs-Zeit 14-56 Tage",
      "HKMA Stablecoin-Lizenz April 2026 verschärft KYC weiter",
    ],
    features: { multiCurrency: true, achWire: true, quickbooksXero: false, debitCard: true, apiAccess: false, crypto: false },
    setupRequirements: [
      "★ Persönliche Vorstellung HK-Filiale aller Directors",
      "HK-LTD Incorporation-Docs",
      "Pass aller Directors/Shareholders",
      "Address-Proof",
      "FATCA/CRS-Forms",
      "Source-of-Wealth (Bank-Statements, Tax-Returns)",
      "Business-Plan + Major-Customer/Supplier-Liste",
    ],
    url: "https://www.hsbc.com.hk",
    closureRisk: "low",
    closurePattern: "Keine breite Welle wie bei Fintechs. Crypto/Stablecoin (außer regulierte HKMA-Partner), Russian/Iranian/Belarus-Ties, Bad Source-of-Funds, plötzliche Volume >HKD 1M.",
    freezeDuration: "30-90 Tage Investigation, aber Vorteil: echter Relationship-Manager",
    trustpilotRating: 2.0,
    trustpilotCount: "Retail-skewed — Business-Kunden meistens nicht aktiv auf Trustpilot",
    trustpilotUrl: "https://www.trustpilot.com/review/hsbc.com.hk",
    hiddenFees: [
      "Fall-Below-Fee HKD 200-300/Mo wenn <HKD 50k Saldo",
      "Persönlicher HK-Besuch zwingend (Flug + Hotel ~2-3k EUR)",
      "Intermediary-Bank-Fees on top of HKD 220 SWIFT",
      "Account-Reviews alle 1-2 Jahre verlangen erneut alle Docs",
      "Stablecoin-Lizenz April 2026 → noch strikteres KYC",
    ],
  },
];

const FEATURE_LABELS: Record<keyof Bank["features"], string> = {
  multiCurrency: "Multi-Currency",
  achWire: "ACH/SWIFT-Wires",
  quickbooksXero: "QuickBooks/Xero",
  debitCard: "Debit-Karte",
  apiAccess: "API-Zugang",
  crypto: "Crypto-OnRamp",
};

const NON_RESIDENT_BADGE: Record<Bank["nonResident"], { label: string; tone: Tone }> = {
  ja: { label: "100 % remote", tone: "success" },
  schwierig: { label: "Schwierig", tone: "warning" },
  "vor-ort-pflicht": { label: "Vor-Ort-Termin", tone: "danger" },
};

const REGION_LABEL: Record<Bank["region"], string> = { us: "USA", hk: "Hong Kong", "wise-personal": "Personal" };

type FilterRegion = "all" | "us" | "hk" | "personal";

const md = (s: string) => s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

const IntlBanking = () => {
  const [region, setRegion] = useState<FilterRegion>("all");

  const filtered = region === "all"
    ? BANKS
    : region === "personal"
    ? BANKS.filter((b) => b.region === "wise-personal")
    : BANKS.filter((b) => b.region === region);

  return (
    <CockpitShell
      eyebrow="International Banking · Stand Mai 2026"
      title="US- und HK-Banking für non-Resident Founder: verifizierter Vergleich"
      subtitle="Neun Anbieter (Mercury, Wise Personal und Business, Relay, Brex, Statrys, Airwallex, Currenxie, HSBC) mit echten Preisen 2026, Closure-Risiken aus Trustpilot, Reddit und OffshoreCorpTalk, versteckten Gebühren und Survival-Tipps."
    >
      <div className="space-y-6">
        {/* === KRITISCHE WARNUNG OBEN === */}
        <Callout tone="warning" title="Multi-Bank-Setup ist 2026 Pflicht">
          Nach den Closure-Wellen 2024 bis 2026 (Mercury Ukraine-Sweep, Wise NBB-Mandate, Brex Mass-Closure, Airwallex Q2
          2026): <strong>Niemals nur eine Fintech-Bank.</strong> Standard-Setup: DE-Geschäftsbank (Qonto/Sparkasse) +
          Mercury (US-LLC) + Wise (FX-Bridge). Maximal 70 % des Cash-Bestands in einer Bank halten.
        </Callout>

        {/* Region-Filter + Quick-Compare */}
        <ToolSection
          title="Schnellvergleich"
          description="Kosten, Remote-Eröffnung, Closure-Risiko und Trustpilot auf einen Blick."
          icon={Banknote}
          bodyClassName="space-y-4"
        >
          <ChoiceGroup<FilterRegion>
            label="Region filtern"
            size="sm"
            value={region}
            onChange={setRegion}
            options={[
              { value: "all", label: `Alle (${BANKS.length})` },
              { value: "personal", label: "Wise Personal (Solo)" },
              { value: "us", label: `USA (${BANKS.filter((b) => b.region === "us").length})` },
              { value: "hk", label: `Hong Kong (${BANKS.filter((b) => b.region === "hk").length})` },
            ]}
          />
          {filtered.length === 0 ? (
            <EmptyState icon={Banknote} title="Keine Anbieter in dieser Region" description="Wähle oben eine andere Region." />
          ) : (
            <KitTable caption="Schnellvergleich der Banken">
              <thead>
                <tr>
                  <th scope="col">Bank</th>
                  <th scope="col">Setup</th>
                  <th scope="col">Laufend</th>
                  <th scope="col">Non-Resident</th>
                  <th scope="col">Closure-Risiko</th>
                  <th scope="col">Trustpilot</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => {
                  const badge = NON_RESIDENT_BADGE[b.nonResident];
                  const closure = CLOSURE_RISK_META[b.closureRisk];
                  return (
                    <tr key={b.slug}>
                      <td className="whitespace-nowrap font-semibold">
                        <a href={`#bank-${b.slug}`} className="hover:text-accent-blue hover:underline">{b.name}</a>
                        <span className="block text-xs font-normal text-muted-foreground">{REGION_LABEL[b.region]}</span>
                      </td>
                      <td className="min-w-[180px] max-w-[240px] text-xs text-muted-foreground" dangerouslySetInnerHTML={{ __html: md(b.setupFee) }} />
                      <td className="min-w-[120px] text-xs">{b.monthlyFee}</td>
                      <td className="whitespace-nowrap">
                        <ToneBadge tone={badge.tone}>{badge.label}</ToneBadge>
                      </td>
                      <td className="whitespace-nowrap">
                        <ToneBadge tone={closure.tone}>{closure.label}</ToneBadge>
                      </td>
                      <td className="min-w-[140px] max-w-[220px] text-xs">
                        {b.trustpilotRating ? (
                          b.trustpilotUrl ? (
                            <a
                              href={b.trustpilotUrl}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex items-center gap-1 font-medium text-accent-blue hover:underline"
                              title="Auf Trustpilot ansehen"
                            >
                              <Star className="h-3 w-3 fill-current" aria-hidden="true" /> {b.trustpilotRating}
                              <span className="font-normal text-muted-foreground">({b.trustpilotCount})</span>
                            </a>
                          ) : (
                            <span className="inline-flex items-center gap-1">
                              <Star className="h-3 w-3 fill-current text-warning" aria-hidden="true" /> {b.trustpilotRating}
                              <span className="text-muted-foreground">({b.trustpilotCount})</span>
                            </span>
                          )
                        ) : (
                          <span className="text-muted-foreground">k. A.</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </KitTable>
          )}
        </ToolSection>

        {/* Detail-Cards */}
        <section aria-labelledby="ib-details" className="space-y-4">
          <h2 id="ib-details" className="text-lg font-semibold tracking-tight">Anbieter im Detail</h2>
          {filtered.map((b) => {
            const badge = NON_RESIDENT_BADGE[b.nonResident];
            const closure = CLOSURE_RISK_META[b.closureRisk];
            return (
              <article
                key={b.slug}
                id={`bank-${b.slug}`}
                className={cn(
                  "scroll-mt-24 rounded-2xl border bg-card shadow-card",
                  b.closureRisk === "very_high" ? "border-danger/35" : "border-border",
                )}
              >
                <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border/70 px-5 py-4 md:px-6">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-sm font-semibold text-accent-blue">
                      {b.name.slice(0, 2)}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold leading-snug tracking-tight">{b.name}</h3>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        <ToneBadge tone="neutral">{REGION_LABEL[b.region]}</ToneBadge>
                        <ToneBadge tone={badge.tone}>{badge.label}</ToneBadge>
                        <ToneBadge tone={closure.tone}>Closure {closure.label}</ToneBadge>
                        <ToneBadge tone="accent">{b.monthlyFee}</ToneBadge>
                      </div>
                    </div>
                  </div>
                  <a href={b.url} target="_blank" rel="noreferrer noopener" className={cn(buttonVariants({ size: "sm" }))}>
                    Eröffnen <ExternalLink aria-hidden="true" />
                  </a>
                </header>

                <div className="space-y-4 p-5 md:p-6">
                  <dl className="grid gap-3 text-sm sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                    <div>
                      <dt className="font-medium">Ideal für</dt>
                      <dd className="mt-0.5 text-muted-foreground">{b.bestFor}</dd>
                    </div>
                    <div>
                      <dt className="font-medium">Setup</dt>
                      <dd className="mt-0.5 text-muted-foreground" dangerouslySetInnerHTML={{ __html: md(b.setupFee) }} />
                    </div>
                  </dl>

                  {(b.trustpilotRating || b.g2Rating) && (
                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
                      {b.trustpilotRating && (
                        b.trustpilotUrl ? (
                          <a
                            href={b.trustpilotUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="group inline-flex items-center gap-1.5"
                            title="Auf Trustpilot ansehen"
                          >
                            <Star className="h-3.5 w-3.5 fill-current text-warning" aria-hidden="true" />
                            <strong className="font-semibold tabular">{b.trustpilotRating}/5</strong>
                            <span className="text-muted-foreground group-hover:text-accent-blue group-hover:underline">
                              Trustpilot ({b.trustpilotCount})
                            </span>
                            <ExternalLink className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5">
                            <Star className="h-3.5 w-3.5 fill-current text-warning" aria-hidden="true" />
                            <strong className="font-semibold tabular">{b.trustpilotRating}/5</strong>
                            <span className="text-muted-foreground">Trustpilot ({b.trustpilotCount})</span>
                          </span>
                        )
                      )}
                      {b.g2Rating && (
                        <span className="inline-flex items-center gap-1.5">
                          <Star className="h-3.5 w-3.5 fill-current text-info" aria-hidden="true" />
                          <strong className="font-semibold tabular">{b.g2Rating}/5</strong>
                          <span className="text-muted-foreground">G2</span>
                        </span>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="rounded-xl border border-success/25 bg-success-soft p-4">
                      <p className="text-sm font-semibold text-success">Vorteile</p>
                      <ul className="mt-2 space-y-1.5 text-sm">
                        {b.pros.map((p, i) => (
                          <li key={i} className="flex gap-2">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
                            <span dangerouslySetInnerHTML={{ __html: md(p) }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-danger/25 bg-danger-soft p-4">
                      <p className="text-sm font-semibold text-danger">Nachteile</p>
                      <ul className="mt-2 space-y-1.5 text-sm">
                        {b.cons.map((c, i) => (
                          <li key={i} className="flex gap-2">
                            <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger" aria-hidden="true" />
                            <span dangerouslySetInnerHTML={{ __html: md(c) }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CLOSURE-RISK-BLOCK */}
                  <Callout tone={closure.tone} icon={ShieldAlert} title={`Closure-Risiko: ${closure.label}`}>
                    {b.closurePattern}
                    {b.freezeDuration && (
                      <span className="mt-1 block">
                        <strong>Typische Freeze-Dauer:</strong> <span className="tabular">{b.freezeDuration}</span>
                      </span>
                    )}
                  </Callout>

                  {/* Features */}
                  <div>
                    <p className="mb-2 text-sm font-medium">Funktionen</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {(Object.keys(b.features) as (keyof Bank["features"])[]).map((f) => (
                        <li
                          key={f}
                          className={cn(
                            "inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-medium",
                            b.features[f] ? "border-success/25 bg-success-soft text-success" : "border-border bg-secondary/50 text-muted-foreground line-through decoration-muted-foreground/40",
                          )}
                        >
                          {b.features[f] ? <CheckCircle2 className="h-3 w-3" aria-hidden="true" /> : <XCircle className="h-3 w-3" aria-hidden="true" />}
                          <span className="sr-only">{b.features[f] ? "vorhanden:" : "nicht vorhanden:"}</span>
                          {FEATURE_LABELS[f]}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="divide-y divide-border/70 rounded-xl border border-border">
                    {/* Hidden Fees */}
                    {b.hiddenFees.length > 0 && (
                      <details className="group px-4 py-3 text-sm">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 font-medium [&::-webkit-details-marker]:hidden">
                          <span className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-warning" aria-hidden="true" />
                            Versteckte Gebühren und Fallstricke
                            <ToneBadge tone="warning">{b.hiddenFees.length}</ToneBadge>
                          </span>
                          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
                        </summary>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
                          {b.hiddenFees.map((h, i) => <li key={i}>{h}</li>)}
                        </ul>
                      </details>
                    )}
                    <details className="group px-4 py-3 text-sm">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 font-medium [&::-webkit-details-marker]:hidden">
                        <span className="flex items-center gap-2">
                          <ListChecks className="h-4 w-4 text-accent-blue" aria-hidden="true" />
                          Unterlagen für die Eröffnung
                        </span>
                        <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
                      </summary>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
                        {b.setupRequirements.map((r, i) => <li key={i}>{r}</li>)}
                      </ul>
                    </details>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* CLOSURE-SURVIVAL-TIPPS */}
        <ToolSection title="12 Closure-Survival-Tipps 2026" icon={ShieldAlert}>
          <ol className="grid gap-x-8 gap-y-3 text-sm md:grid-cols-2">
            {SURVIVAL_TIPPS.map(([titel, text], i) => (
              <li key={titel} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-blue tabular">
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <strong className="font-semibold text-foreground">{titel}</strong>
                  <span className="block text-muted-foreground">{text}</span>
                </span>
              </li>
            ))}
          </ol>
        </ToolSection>

        {/* Compliance-Updates 2025/2026 */}
        <ToolSection title="Wichtige Compliance-Updates 2025/2026" icon={Info}>
          <dl className="divide-y divide-border/70 text-sm">
            {COMPLIANCE_UPDATES.map(([titel, text]) => (
              <div key={titel} className="grid gap-1 py-2.5 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-4">
                <dt className="font-medium">{titel}</dt>
                <dd className="text-muted-foreground">{text}</dd>
              </div>
            ))}
          </dl>
        </ToolSection>

        {/* Empfehlungs-Matrix */}
        <ToolSection title="Banking-Empfehlung nach Profil" description="Stand Mai 2026" icon={Globe}>
          <div className="grid gap-3 md:grid-cols-2">
            <ProfilKarte titel="DE-Solo-Founder ohne US-LLC">
              Wise Personal (kostenlos!) für Multi-Currency-Wallets + DE-Geschäftsbank (Qonto/Sparkasse) für EUR-Ops
            </ProfilKarte>
            <ProfilKarte titel="DE-Founder mit US-LLC">
              Mercury (Operating + Stripe + Treasury, Rendite variabel) + Wise Business (FX-Bridge USD↔EUR) parallel. Niemals nur eine
            </ProfilKarte>
            <ProfilKarte titel="DE-Founder mit HK-LTD">
              Statrys (Trustpilot 4,6/5, 3-Tage-Onboarding) als Primary. HSBC erst bei höheren Volumina und mit persönlichem Termin in HK (Kontogebühr entfällt ab HKD 50k Saldo)
            </ProfilKarte>
            <ProfilKarte titel="Lieber nicht" tone="danger">
              Brex (Solo systematisch abgelehnt) · Airwallex als einzige Bank (Closure-Trend 2026) · HSBC ohne HK-Besuch ·
              Currenxie ohne HK-LTD
            </ProfilKarte>
          </div>
        </ToolSection>

        <p className="text-xs leading-relaxed text-muted-foreground">
          <strong className="font-semibold text-foreground">Hinweis:</strong> Preise und Closure-Risiko Stand Mai 2026.
          Quellen: Issuer-Pricing-Pages, Trustpilot, OffshoreCorpTalk, Reddit r/Entrepreneur, Hacker News, TechCrunch. Der
          Onboarding-Erfolg ist nicht garantiert (Bank-eigenes Risk-Scoring). Bei US-LLC-Setup zwingend diese Reihenfolge:
          erst LLC-Filing, dann EIN, DANN Bank-Account-Antrag (BOI seit März 2025 NICHT mehr Pflicht).{" "}
          <strong className="font-semibold text-foreground">Preis-Variabilität:</strong> Wise Personal kostet €0 Setup
          (typisch €20 Mindest-Einzahlung für KYC), Wise Business hat regionales Pricing (DE 55 € / US $31 / UK £50 / SG SGD
          99 / übriger EWR 60 €). Eigene Erfahrungen können abweichen; Referral-Links und Promotionen reduzieren das auf €0.
        </p>
      </div>
    </CockpitShell>
  );
};

const SURVIVAL_TIPPS: [string, string][] = [
  ["Dokumente konsistent halten", "Address, ID, EIN über alle Banken identisch (selbst ein Tippfehler kann ein Mercury-Review triggern)"],
  ["Niemals Registered-Agent als Principal Office", "Mercury akzeptiert seit 2025 keine Registered-Agent-Adressen mehr. iPostal1/Earth Class Mail mit echtem Lease OK; UPS-Store/PO Box abgelehnt"],
  ["Multi-Bank-Strategie", "Mind. 2 Banken, max. 70 % Cash-Bestand in einer Bank"],
  ["Saubere KYB-Story", "Business-Description, Customer-Liste, Supplier-Liste, Source-of-Funds (bei Statrys/HSBC zwingend)"],
  ["Keine Crypto-Bridge ohne Lizenz", "Plötzliche Coinbase/Binance/Kraken-Conversions sind Top-Closure-Trigger 2024 bis 2026"],
  ["Multi-Entity-Risiko vermeiden", "Mehrere LLCs/GmbHs unter selbem UBO an derselben Bank = höchstes Closure-Risiko. Pro Entity eine Bank"],
  ["RFI binnen 24h beantworten", "Ignorierte RFIs führen zu Auto-Closure binnen 14 bis 30 Tagen"],
  ["Volume-Spikes ankündigen", "Bei $200k+ erwartetem Inbound vorher Compliance kontaktieren (Mercury, Wise, Airwallex bieten proaktiven Outreach)"],
  ["Prohibited-Countries vermeiden", "Auch nur als Empfänger/Sender. Mercurys Liste umfasst 37 Länder"],
  ["Bei Closure-Notice sofort handeln", "Abheben per Wire (nicht ACH, Wire ist schneller). Mercury: 15-Werktage-Fenster für US-Residents"],
  ["Address-Proof aktuell halten", "Nach dem NBB-Mandate Q4 2024 verlangt Wise regelmäßig neue Address-Proofs. Versäumnis = sofortiger Freeze"],
  ["HSBC HK: Account-Review alle 12 bis 24 Monate proaktiv vorbereiten", "Komplette neue KYC-Runde, sonst Account-Closure"],
];

const COMPLIANCE_UPDATES: [string, string][] = [
  ["BOI-Filing US (FinCEN)", "21.3.2025: alle US-Companies und US-Persons von BOI-Reporting BEFREIT. Foreign Reporting Companies bleiben pflichtig"],
  ["Mercury OCC-Charter", "April 2026 conditional Approval, Übergang weg vom Partner-Banking. Aktuelle Partner: Choice Financial Group, Column N.A., Patriot Bank"],
  ["Capital One übernimmt Brex", "Closed 7.4.2026 ($5.15B). Eligibility und Pricing können 2026/2027 kippen"],
  ["HKMA Stablecoin-Lizenz", "10.4.2026: HSBC und Anchorpoint erste Lizenzen. Travel-Rule ab HK$8.000 verschärft KYC für alle HK-Banken"],
  ["Wise US $4.2M Settlement (2025)", "SAR-Lookbacks und strengere AML, Closure-Welle Q4 2025/Q1 2026"],
  ["NBB Wise Remediation Plan (Q4 2024)", "Address-Proof-Sweep EU-weit, tausende Freezes 2025 bis 2026"],
];

const ProfilKarte = ({ titel, tone = "neutral", children }: { titel: string; tone?: "neutral" | "danger"; children: ReactNode }) => (
  <div className={cn("rounded-xl border p-4 text-sm", tone === "danger" ? "border-danger/25 bg-danger-soft" : "border-border bg-secondary/40")}>
    <p className={cn("font-semibold", tone === "danger" && "text-danger")}>{titel}</p>
    <p className="mt-1 text-muted-foreground">{children}</p>
  </div>
);

export default IntlBanking;
