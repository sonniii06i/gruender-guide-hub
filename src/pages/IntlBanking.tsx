import { useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import {
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Globe,
  Banknote,
  ShieldAlert,
  Star,
  MessageCircle,
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
  /** G2 (für Business-Banking). */
  g2Rating?: number;
  /** Reddit / OffshoreCorpTalk Quote (anonymisiert). */
  redditQuote?: string;
  /** Hidden Fees / Gotchas. */
  hiddenFees: string[];
};

const CLOSURE_RISK_META: Record<ClosureRisk, { label: string; color: string; icon: string }> = {
  low: { label: "Niedrig", color: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30", icon: "🟢" },
  medium: { label: "Mittel", color: "bg-amber-500/10 text-amber-700 border-amber-500/30", icon: "🟡" },
  high: { label: "Hoch", color: "bg-orange-500/10 text-orange-700 border-orange-500/30", icon: "🟠" },
  very_high: { label: "Sehr hoch", color: "bg-red-500/10 text-red-700 border-red-500/30", icon: "🔴" },
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
    redditQuote: "'Wise Personal seit 5 Jahren — keine Probleme, nur €20 Initial-Top-up gezahlt'",
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
    bestFor: "US-LLC mit Stripe-Operations · Treasury-Yield bis 4,97% net · DE-Founder mit Wyoming/Delaware-LLC",
    pros: [
      "**$0 Setup + Monthly Standard-Plan** — wirklich kostenlos",
      "Akzeptiert non-Resident Founder von 200+ Ländern (DACH-Solos inkl.)",
      "Sehr saubere App + Web-UI, API + Stripe-Integration",
      "Mercury Treasury: **bis 4,97% net** Yield (Stand 8.5.2026, bei $500k+)",
      "Wires + ACH inkl., FDIC bis $5M via Sweep zu Partner-Banks",
      "Mercury Bank N.A. eigene OCC-Charter approved April 2026 (weg von Partner-Banking)",
    ],
    cons: [
      "**Closure-Wellen seit 2024**: 37+ Länder gesperrt (Ukraine, Nigeria, Venezuela etc.) — DE selbst safe",
      "**Registered-Agent-Adressen seit 2025 NICHT mehr akzeptiert** → echte US-Adresse Pflicht (Mailbox-Provider mit Lease OK)",
      "1% FX-Markup auf non-USD Card-Transactions (auch in EU einkaufen kostet 1%)",
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
    g2Rating: 4.5,
    redditQuote: "'Account closed 30 days after single $80k inbound wire from Indonesian client. No appeal worked.' (r/Entrepreneur)",
    hiddenFees: [
      "Mass-API-Payments + FX brauchen $35/mo Plus-Plan",
      "1% Conversion-Fee bei non-USD Card-Transactions",
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
    setupFee: "**Variiert nach Region**: DE €45 · US $31 · UK £45 · EEA €50 · SG SGD 99",
    nonResident: "ja",
    bestFor: "Multi-Currency-Geschäft · DACH-Founder mit USD/GBP/EUR-Mix · FX-Optimierung",
    pros: [
      "**Niedrigste FX-Kosten** der Liste (Mid-Market + 0,33-0,65%)",
      "Multi-Currency: USD, GBP, EUR, AUD + 50 weitere mit Local-Account-Details",
      "ACH-Routing + USD-IBAN — von Stripe/Amazon akzeptiert",
      "Batch-Payments, API, Invoicing-Tools (Business-Features)",
      "Wise Assets bis ~3,5% Yield (USD-Treasury-Fonds)",
    ],
    cons: [
      "**Setup-Fee einmalig (NICHT €20!)** — DE €45, US $31, UK £45 je Region",
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
    g2Rating: 4.4,
    redditQuote: "'Wise schloss mein Business-Account nach 3 Jahren — kein Grund, 6.000€ für 47 Tage gesperrt' (OffshoreCorpTalk)",
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
    redditQuote: "'Thread Bank put a 21-day hold on incoming $40k wire — RFI took 4 weeks to resolve'",
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
    g2Rating: 4.6,
    redditQuote: "'Brex closed our account after 18 months. No reason given. Had to migrate $200k in 14 days' (Hacker News)",
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
    g2Rating: 4.5,
    redditQuote: "'Account in 3 Tagen, Support Slack-mäßig schnell. HKD 88 Inactivity-Fee ist die einzige negative Überraschung'",
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
    monthlyFee: "€0 Explore (€10k Saldo) sonst €19+ / €49 Grow / €999+ Accelerate",
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
    g2Rating: 4.4,
    redditQuote: "'Airwallex froze €120k for 67 days — only resolved via LinkedIn-Post öffentlich' (Nov 2025 viral)",
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
    redditQuote: "'FX bei USD/HKD ist unschlagbar, aber Refund nach Closure dauerte 5 Wochen'",
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
    redditQuote: "'HSBC Business Banking mit Relationship Manager ist Gold wert — aber 4 Wochen Bearbeitung + persönlicher HK-Termin'",
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

const NON_RESIDENT_BADGE: Record<Bank["nonResident"], { label: string; color: string }> = {
  ja: { label: "✓ 100% remote", color: "bg-emerald-500/10 text-emerald-700" },
  schwierig: { label: "⚠ Schwierig", color: "bg-amber-500/10 text-amber-700" },
  "vor-ort-pflicht": { label: "✗ Vor-Ort-Termin", color: "bg-red-500/10 text-red-700" },
};

type FilterRegion = "all" | "us" | "hk" | "personal";

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
      title="US + HK Banking für non-Resident Founder — verifizierter Vergleich"
      subtitle="9 Anbieter (Mercury, Wise Personal + Business, Relay, Brex · Statrys, Airwallex, Currenxie, HSBC) mit echten 2026er Pricings + Closure-Risiken aus Trustpilot/Reddit/OffshoreCorpTalk + Hidden-Fees + Survival-Tipps. Brex hat 'very_high' Closure-Risk für Solo, Wise verlangt Address-Proof-Updates."
    >
      {/* === KRITISCHE WARNUNG OBEN === */}
      <div className="rounded-2xl border-2 border-amber-500/40 bg-amber-500/5 p-4 mb-4">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <div className="font-bold text-amber-700 mb-1">★ Multi-Bank-Setup ist Pflicht 2026</div>
            <div className="text-muted-foreground">
              Nach den Closure-Wellen 2024-2026 (Mercury Ukraine-Sweep, Wise NBB-Mandate, Brex Mass-Closure,
              Airwallex Q2 2026): <strong>Niemals nur eine Fintech-Bank.</strong> Standard-Setup:
              DE-Geschäftsbank (Qonto/Sparkasse) + Mercury (US-LLC) + Wise (FX-Bridge).
              Max 70% Cash in einer Bank halten.
            </div>
          </div>
        </div>
      </div>

      {/* Region Toggle */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setRegion("all")}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
            region === "all" ? "bg-accent-blue text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          Alle ({BANKS.length})
        </button>
        <button
          onClick={() => setRegion("personal")}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
            region === "personal" ? "bg-accent-blue text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          👤 Wise Personal (Solo)
        </button>
        <button
          onClick={() => setRegion("us")}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
            region === "us" ? "bg-accent-blue text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          🇺🇸 USA ({BANKS.filter((b) => b.region === "us").length})
        </button>
        <button
          onClick={() => setRegion("hk")}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
            region === "hk" ? "bg-accent-blue text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          🇭🇰 Hong Kong ({BANKS.filter((b) => b.region === "hk").length})
        </button>
      </div>

      {/* Quick-Compare Tabelle mit Closure-Risk */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6 overflow-x-auto">
        <h3 className="font-bold text-sm mb-3">Quick-Compare (mit Closure-Risk + Trustpilot)</h3>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 pr-2">Bank</th>
              <th className="text-left py-2 px-2">Setup</th>
              <th className="text-left py-2 px-2">Lfd.</th>
              <th className="text-left py-2 px-2">Non-Res</th>
              <th className="text-left py-2 px-2">Closure-Risk</th>
              <th className="text-left py-2 pl-2">Trustpilot</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => {
              const badge = NON_RESIDENT_BADGE[b.nonResident];
              const closure = CLOSURE_RISK_META[b.closureRisk];
              return (
                <tr key={b.slug} className="border-b border-border last:border-0">
                  <td className="py-2 pr-2">
                    <span className="mr-1.5">{b.emoji}</span>
                    <span className="font-semibold">{b.name}</span>
                  </td>
                  <td className="py-2 px-2 font-mono text-[10px] max-w-[200px]">{b.setupFee}</td>
                  <td className="py-2 px-2 font-mono text-[10px]">{b.monthlyFee}</td>
                  <td className="py-2 px-2">
                    <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${badge.color}`}>
                      {badge.label}
                    </span>
                  </td>
                  <td className="py-2 px-2">
                    <span className={`rounded-full border px-1.5 py-0.5 text-[9px] font-semibold ${closure.color}`}>
                      {closure.icon} {closure.label}
                    </span>
                  </td>
                  <td className="py-2 pl-2 text-[10px]">
                    {b.trustpilotRating ? (
                      <span className="font-mono">
                        ★ {b.trustpilotRating} ({b.trustpilotCount})
                      </span>
                    ) : (
                      <span className="text-muted-foreground">n/a</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Detail-Cards */}
      <div className="space-y-3 mb-6">
        {filtered.map((b) => {
          const badge = NON_RESIDENT_BADGE[b.nonResident];
          const closure = CLOSURE_RISK_META[b.closureRisk];
          return (
            <div
              key={b.slug}
              className={`rounded-2xl border bg-card p-5 ${
                b.closureRisk === "very_high" ? "border-red-500/40" : "border-border"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{b.emoji}</div>
                  <div>
                    <h3 className="font-bold text-base">{b.name}</h3>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      <span className="rounded-full bg-secondary text-muted-foreground px-2 py-0.5 text-[10px]">
                        {b.region === "us" ? "🇺🇸 USA" : b.region === "hk" ? "🇭🇰 HK" : "👤 Personal"}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${badge.color}`}>
                        {badge.label}
                      </span>
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${closure.color}`}>
                        {closure.icon} Closure {closure.label}
                      </span>
                      <span className="rounded-full bg-emerald-500/10 text-emerald-700 px-2 py-0.5 text-[10px] font-semibold">
                        {b.monthlyFee}
                      </span>
                    </div>
                  </div>
                </div>
                <a
                  href={b.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-3 py-1.5 text-xs font-semibold hover:opacity-90"
                >
                  <ExternalLink className="h-3 w-3" /> Eröffnen
                </a>
              </div>

              <p className="text-sm mb-2">
                <strong>Best for:</strong> <span className="text-muted-foreground">{b.bestFor}</span>
              </p>

              <div className="rounded-lg bg-card border border-border p-2 mb-3 text-xs flex gap-3 flex-wrap">
                <div><strong>Setup:</strong> <span className="text-muted-foreground">{b.setupFee}</span></div>
                {b.trustpilotRating && (
                  <div className="inline-flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    <strong>{b.trustpilotRating}/5</strong>{" "}
                    <span className="text-muted-foreground">Trustpilot ({b.trustpilotCount})</span>
                  </div>
                )}
                {b.g2Rating && (
                  <div className="inline-flex items-center gap-1">
                    <Star className="h-3 w-3 fill-blue-500 text-blue-500" />
                    <strong>{b.g2Rating}/5</strong> <span className="text-muted-foreground">G2</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold mb-1">Vorteile</div>
                  <ul className="space-y-1 text-xs">
                    {b.pros.map((p, i) => (
                      <li
                        key={i}
                        dangerouslySetInnerHTML={{ __html: "+ " + p.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") }}
                      />
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-red-700 font-semibold mb-1">Nachteile</div>
                  <ul className="space-y-1 text-xs">
                    {b.cons.map((c, i) => (
                      <li
                        key={i}
                        dangerouslySetInnerHTML={{ __html: "− " + c.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") }}
                      />
                    ))}
                  </ul>
                </div>
              </div>

              {/* CLOSURE-RISK-BLOCK */}
              <div className={`rounded-lg border p-3 mb-3 ${closure.color}`}>
                <div className="flex items-start gap-2">
                  <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                  <div className="text-xs flex-1">
                    <div className="font-bold mb-1">Closure-Risk: {closure.label} {closure.icon}</div>
                    <div className="opacity-90">{b.closurePattern}</div>
                    {b.freezeDuration && (
                      <div className="mt-1 opacity-80">
                        <strong>Typische Freeze-Dauer:</strong> {b.freezeDuration}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* User-Quote */}
              {b.redditQuote && (
                <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3 mb-3">
                  <div className="flex items-start gap-2">
                    <MessageCircle className="h-3.5 w-3.5 text-blue-700 shrink-0 mt-0.5" />
                    <div className="text-xs italic text-muted-foreground">{b.redditQuote}</div>
                  </div>
                </div>
              )}

              {/* Hidden Fees */}
              {b.hiddenFees.length > 0 && (
                <details className="text-xs mb-2">
                  <summary className="cursor-pointer font-semibold text-amber-700">
                    Hidden Fees / Gotchas ▾ ({b.hiddenFees.length})
                  </summary>
                  <ul className="mt-2 space-y-1 list-disc pl-4 text-muted-foreground">
                    {b.hiddenFees.map((h, i) => <li key={i}>{h}</li>)}
                  </ul>
                </details>
              )}

              {/* Features */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5 text-[10px] mb-3">
                {(Object.keys(b.features) as (keyof Bank["features"])[]).map((f) => (
                  <div
                    key={f}
                    className={`rounded-md border px-2 py-1 text-center ${
                      b.features[f]
                        ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-700"
                        : "border-border bg-secondary/30 text-muted-foreground"
                    }`}
                  >
                    {b.features[f] ? (
                      <CheckCircle2 className="h-2.5 w-2.5 inline mr-0.5" />
                    ) : (
                      <XCircle className="h-2.5 w-2.5 inline mr-0.5" />
                    )}
                    {FEATURE_LABELS[f]}
                  </div>
                ))}
              </div>

              <details className="text-xs">
                <summary className="cursor-pointer font-semibold text-foreground">
                  Setup-Requirements ▾
                </summary>
                <ul className="mt-2 space-y-1 list-disc pl-4 text-muted-foreground">
                  {b.setupRequirements.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </details>
            </div>
          );
        })}
      </div>

      {/* CLOSURE-SURVIVAL-TIPPS (NEU) */}
      <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-4 mb-3">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-red-700" />
          12 Closure-Survival-Tipps 2026
        </h3>
        <ul className="text-xs space-y-1.5 list-decimal pl-5 text-muted-foreground">
          <li>
            <strong className="text-foreground">Dokumente konsistent halten</strong> — Address, ID, EIN über alle
            Banken identisch (selbst Tippfehler kann Mercury-Review triggern)
          </li>
          <li>
            <strong className="text-foreground">Niemals Registered-Agent als Principal Office</strong> — Mercury
            akzeptiert seit 2025 keine Registered-Agent-Adressen mehr. iPostal1/Earth Class Mail mit echtem
            Lease OK; UPS-Store/PO Box abgelehnt
          </li>
          <li>
            <strong className="text-foreground">Multi-Bank-Strategie</strong> — mind. 2 Banken, max. 70%
            Cash-Bestand in einer Bank
          </li>
          <li>
            <strong className="text-foreground">Saubere KYB-Story</strong> — Business-Description, Customer-Liste,
            Supplier-Liste, Source-of-Funds (bei Statrys/HSBC zwingend)
          </li>
          <li>
            <strong className="text-foreground">Keine Crypto-Bridge ohne Lizenz</strong> — plötzliche
            Coinbase/Binance/Kraken-Conversions = Top-Closure-Trigger 2024-2026
          </li>
          <li>
            <strong className="text-foreground">Multi-Entity-Risk vermeiden</strong> — mehrere LLCs/GmbHs unter
            selbem UBO an derselben Bank = höchstes Closure-Risk. Pro Entity eine Bank
          </li>
          <li>
            <strong className="text-foreground">RFI binnen 24h beantworten</strong> — ignorierte RFIs führen zu
            Auto-Closure binnen 14-30 Tagen
          </li>
          <li>
            <strong className="text-foreground">Volume-Spikes ankündigen</strong> — bei $200k+ inbound erwartet:
            vorher Compliance kontaktieren (Mercury, Wise, Airwallex bieten proactive Outreach)
          </li>
          <li>
            <strong className="text-foreground">Prohibited-Countries vermeiden</strong> — auch nur als
            Empfänger/Sender. Mercury's Liste = 37 Länder
          </li>
          <li>
            <strong className="text-foreground">Bei Closure-Notice sofort agieren</strong> — Withdraw via Wire
            (nicht ACH — schneller). Mercury: 15-Werktage-Window für US-Residents
          </li>
          <li>
            <strong className="text-foreground">Address-Proof aktuell halten</strong> — nach NBB-Mandate Q4 2024
            verlangt Wise regelmäßig neue Address-Proofs. Versäumnis = sofortiger Freeze
          </li>
          <li>
            <strong className="text-foreground">HSBC HK: Account-Review alle 12-24 Monate proaktiv vorbereiten</strong>
            {" "}— komplette neue KYC-Runde, sonst Account-Closure
          </li>
        </ul>
      </div>

      {/* Compliance-Updates 2025/2026 */}
      <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-4 mb-3">
        <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
          <Info className="h-4 w-4 text-blue-700" />
          Wichtige Compliance-Updates 2025/2026
        </h3>
        <ul className="text-xs space-y-1.5 list-disc pl-5 text-muted-foreground">
          <li>
            <strong className="text-foreground">BOI-Filing US (FinCEN):</strong> 21.3.2025 — alle US-Companies
            + US-Persons von BOI-Reporting BEFREIT. Foreign Reporting Companies bleiben pflichtig
          </li>
          <li>
            <strong className="text-foreground">Mercury OCC-Charter:</strong> April 2026 conditional Approval
            — Übergang von Partner-Banking weg. Aktuelle Partner: Choice Financial Group, Column N.A., Patriot Bank
          </li>
          <li>
            <strong className="text-foreground">Capital One acquires Brex:</strong> Closed 7.4.2026 ($5.15B).
            Eligibility und Pricing können 2026/2027 kippen
          </li>
          <li>
            <strong className="text-foreground">HKMA Stablecoin-Lizenz:</strong> 10.4.2026 HSBC + Anchorpoint
            erste Lizenzen. Travel-Rule ab HK$8.000 — verschärft KYC für alle HK-Banken
          </li>
          <li>
            <strong className="text-foreground">Wise US $4.2M Settlement (2025):</strong> SAR-Lookbacks +
            strengere AML → Closure-Welle Q4 2025/Q1 2026
          </li>
          <li>
            <strong className="text-foreground">NBB Wise Remediation Plan (Q4 2024):</strong> Address-Proof-Sweep
            EU-weit → tausende Freezes 2025-2026
          </li>
        </ul>
      </div>

      {/* Empfehlungs-Matrix */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4 mb-3 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <Banknote className="h-4 w-4 text-accent-blue shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-2">Banking-Empfehlung nach Profil (Mai 2026):</div>
            <ul className="list-disc pl-4 space-y-1.5 text-muted-foreground">
              <li>
                <strong className="text-foreground">DE-Solo-Founder ohne US-LLC:</strong> Wise Personal
                (kostenlos!) für Multi-Currency-Wallets + DE-Geschäftsbank (Qonto/Sparkasse) für EUR-Ops
              </li>
              <li>
                <strong className="text-foreground">DE-Founder mit US-LLC:</strong> Mercury (Operating + Stripe +
                Treasury 4,97%) + Wise Business (FX-Bridge USD↔EUR) parallel. Niemals nur eine
              </li>
              <li>
                <strong className="text-foreground">DE-Founder mit HK-LTD:</strong> Statrys (Trustpilot 4,6/5,
                3-Tage-Onboarding) als Primary. HSBC nur bei HKD 500k+/Mo + persönlichem Besuch
              </li>
              <li>
                <strong className="text-foreground">"Don't bother":</strong> Brex (Solo systematisch
                abgelehnt) · Airwallex single-Bank (Closure-Trend 2026) · HSBC ohne HK-Besuch · Currenxie
                ohne HK-LTD
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 text-[11px] text-muted-foreground leading-relaxed">
        <strong>Disclaimer:</strong> Pricing + Closure-Risk Stand Mai 2026 — Quellen: Issuer-Pricing-Pages,
        Trustpilot, OffshoreCorpTalk, Reddit r/Entrepreneur, Hacker News, TechCrunch. Onboarding-Erfolg
        ist nicht garantiert (Bank-eigenes Risk-Scoring). Bei US-LLC-Setup zwingend Reihenfolge: erst
        LLC-Filing → EIN → DANN Bank-Account-Antrag (BOI seit März 2025 NICHT mehr Pflicht).
        <strong> Pricing-Variabilität:</strong> Wise Personal kostet €0 Setup (typisch €20
        Min-Einzahlung für KYC), Wise Business hat regionales Pricing (DE €45 / US $31 / UK £45 / SG SGD 99 / EEA €50).
        Eigene Erfahrungen können abweichen — Referral-Links + Promotionen reduzieren das auf €0.
      </div>
    </CockpitShell>
  );
};

export default IntlBanking;
