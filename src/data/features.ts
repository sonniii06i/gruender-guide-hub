import {
  Globe2,
  Calculator,
  Building2,
  Rocket,
  Tag,
  BookOpen,
  Trophy,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";

export type FeatureStatus = "live" | "beta" | "soon" | "planned";

export interface Feature {
  slug: string;
  title: string;
  desc: string;
  status: FeatureStatus;
  route?: string;
  /** Wenn true: route ist eine externe URL → öffnet in neuem Tab. */
  external?: boolean;
}

export interface FeatureCategory {
  slug: string;
  title: string;
  emoji: string;
  icon: LucideIcon;
  tagline: string;
  features: Feature[];
}

const _CATEGORIES_RAW: FeatureCategory[] = [
  {
    slug: "international",
    title: "Internationale Setups",
    emoji: "🌍",
    icon: Globe2,
    tagline: "US-LLC, HK-Limited, Banking & Substance",
    features: [
      { slug: "us-llc-wizard", title: "US-LLC Setup-Wizard", desc: "10-Step-Wizard: Bundesstaat → Name → Agent → EIN → BOI-Status → W-8BEN-E → Bank. Inkl. Form 5472 $25k-Falle + Cost-Calculator.", status: "beta", route: "/cockpit/us-llc-wizard" },
      { slug: "hk-limited-wizard", title: "HK-Limited Setup-Wizard", desc: "11-Step-Wizard: Director → Name → CompSec → NNC1+BR → SCR → Profits Tax + FSIE → Bank. Two-Tier 8,25%/16,5%.", status: "beta", route: "/cockpit/hk-limited-wizard" },
      { slug: "us-hk-banking", title: "US + HK Banking + Closure-Risk-Vergleich", desc: "9 Anbieter: Wise Personal/Business, Mercury, Relay, Brex, Statrys, Airwallex, Currenxie, HSBC HK. Closure-Risk-Score + Trustpilot + 12 Survival-Tipps.", status: "beta", route: "/cockpit/intl-banking" },
      { slug: "sales-tax-nexus", title: "Sales-Tax-Nexus-Check", desc: "46 US-Staaten + DC mit Wayfair-Schwellen 2026. FBA-Logik, Foreign-Seller-Block (4 Staaten ohne SSN), Marketplace-Facilitator + SSTRS-Workaround.", status: "beta", route: "/cockpit/sales-tax-nexus" },
      { slug: "substance-checker", title: "Substance-Requirements-Checker", desc: "Mailbox-Risiko-Score (0–100) für §50d EStG + §AStG + §10 AO (ATAD III withdrawn Jun 2025). 12 EU-/CH-Länder. GF-Wohnsitz, lokale MA, Büro, Aktivität, Umsatz, PPT-Grund.", status: "beta", route: "/cockpit/substance-checker" },
      { slug: "dba-cfc", title: "DBA-CFC-Rechner", desc: "§AStG Hinzurechnungsbesteuerung + DBA-Quellensteuer-Reduktion + Mutter-Tochter-RL für 14 Länder. Step-by-Step Berechnung Ausland → DE.", status: "beta", route: "/cockpit/dba-cfc" },
      { slug: "us-kreditkarten", title: "US-Kreditkarten + Miles-Strategien", desc: "22 Karten + 15 Miles-Sweet-Spots + DE→US Amex-MR-Transfer-Hack (~17% FX-Bonus) + Velocity-Strategie (€8-12k SUB/Jahr).", status: "beta", route: "/cockpit/us-kreditkarten" },
      { slug: "ust-rechner", title: "USt-Rechner DE (alle Fälle)", desc: "5 Tabs: Brutto↔Netto, Kleinunternehmer §19 (Reform 2025), Reverse-Charge §13b, OSS B2C-EU, IGL §6a mit USt-IdNr.-Validierung.", status: "beta", route: "/cockpit/ust-rechner" },
      { slug: "abschreibung", title: "Abschreibungs-Rechner + Steuer-Ersparnis", desc: "Asset-Cart-Rechner für 18 Asset-Types (Sofortabschreibung Computer, GWG, Sammelposten, Lineare AfA). Steuer-Ersparnis GmbH vs ESt + Liquiditäts-Effekt.", status: "beta", route: "/cockpit/abschreibung" },
    ],
  },
  {
    slug: "steuer",
    title: "DE-Steuer-Cockpit",
    emoji: "💰",
    icon: Calculator,
    tagline: "Fristen, IAB, Crypto, Pre-Year-End",
    features: [
      { slug: "frist-kalender", title: "Frist-Kalender", desc: "USt-VA, ESt, KSt, GewSt – personalisiert nach Rechtsform.", status: "beta", route: "/cockpit/steuer" },
      { slug: "amazon-buchungen", title: "Amazon-Buchungstexte", desc: "AMA-SG-DE, AMA-BG-IT, AUSZ-DE, MZNFS, FBAFees & 130+ Codes – Live-Lookup mit SKR03/04-Konto und USt-Behandlung.", status: "beta", route: "/cockpit/amazon-buchungen" },
      { slug: "pre-year-end", title: "Pre-Year-End-Check", desc: "7 Hebel ab November mit Live-Steuer-Berechnung: IAB · Investitionen vorziehen · Boni/Tantiemen · Pensionszusage · Verlustverrechnung · OSS-Deadlines · Spendenabzug. Ankreuz-Mode + Ersparnis-Summe.", status: "beta", route: "/cockpit/pre-year-end" },
      { slug: "iab-rechner", title: "IAB-Rechner", desc: "§7g EStG Investitionsabzugsbetrag bis 200.000 € · Voraussetzungs-Check (Gewinn <200k Einzel / Bilanzsumme <235k GmbH) · 3-Jahres-Auflösung-Plan · Live-Steuerersparnis · Hinzurechnungs-Berechnung bei Investition.", status: "beta", route: "/cockpit/iab-rechner" },
      { slug: "kfz-optimizer", title: "Kfz-Versteuerung-Optimizer", desc: "1%-Regel vs. Fahrtenbuch live durchgerechnet · E-Auto/Hybrid-Bonus (0,25 %/0,5 %) · Pendlerpauschale-Anrechnung · Side-by-Side mit Empfehlung.", status: "beta", route: "/cockpit/kfz-optimizer" },
      { slug: "reisekosten", title: "Reisekosten + Bewirtung-Logger", desc: "Reisen mit DE/Ausland-Verpflegungspauschalen 2026 (28 € ganzer / 14 € halber Tag) · 35+ Länder · Kfz 0,30 €/km · Bewirtung 70 % BA mit voller Vorsteuer.", status: "beta", route: "/cockpit/reisekosten-logger" },
      { slug: "salary-vs-dividende", title: "Salary-vs-Dividende-Optimizer", desc: "GF-Gehalt vs. Ausschüttung mit echter Steuer-Berechnung 2026 (KSt 15% + GewSt + SolZ vs. Abgeltung 25% / TEV 60%) · 5 Gehalts-Szenarien · SV-Pflicht-Toggle für beherrschende GF.", status: "beta", route: "/cockpit/salary-dividende" },
      { slug: "crypto-steuer", title: "Crypto-Steuer-Modul", desc: "FIFO-Berechnung Veräußerungsgewinne pro Trade · 1-Jahres-Haltefrist auto-erkannt · Freigrenze 1.000 € (§23 EStG) · CSV-Export für StB.", status: "beta", route: "/cockpit/crypto-steuer" },
      { slug: "pension", title: "Rürup / bAV / Riester-Optimizer", desc: "4-Vehikel-Vergleich (ETF-Privat · Rürup 29.344 € voll absetzbar · bAV 8 % BBG SV-frei · Riester 2.100 € + 175 € Zulage) mit Future-Value-Berechnung + Steuer-Ersparnis-Empfehlung.", status: "beta", route: "/cockpit/pension-optimizer" },
      { slug: "quartal-schaetzung", title: "Quartals-Steuerschätzung", desc: "ESt + KSt + GewSt + SolZ Vorauszahlungen für Q1-Q4 mit echten Termine 10.3 / 10.6 / 10.9 / 10.12 · Soll-Ist-Abgleich gegen bisherige Vorauszahlung · Adjustment-Empfehlung Anpassungs-Antrag · Cashflow-Plan + Rücklage 30 %.", status: "beta", route: "/cockpit/quartals-steuer" },
    ],
  },
  {
    slug: "rechtsform",
    title: "Rechtsform & Struktur",
    emoji: "🏗️",
    icon: Building2,
    tagline: "Holding, IP-Box, Stiftung, Familien-Pool",
    features: [
      { slug: "rechtsform-wizard", title: "Rechtsform-Wizard", desc: "Einzelunternehmer → UG → GmbH → Holding.", status: "beta", route: "/wizard/rechtsform" },
      { slug: "holding-designer", title: "Holding-Konstrukt-Designer", desc: "8 echte Holding-Strukturen (2-Stufen, Familien-Pool, Stiftung, Multi-Brand, VC-Doppel, GmbH&Co.KG, IP-Holding, VV-Holding) mit Steuer-Effekt, Sperrfristen, Real-Beispielen + Empfehlung-Wizard.", status: "beta", route: "/cockpit/holding-designer" },
      { slug: "mehrstufig", title: "Mehrstufige Konstrukte", desc: "Stiftung, Familien-Pool, KG-Strukturen.", status: "soon" },
      { slug: "ip-box", title: "IP-Box-Vergleich", desc: "9 EU-/CH-Patent-Boxes (CY 2,5% bis NL 9%) mit Live-Steuer-Berechnung, BEPS-Nexus, AStG-Risiko, Min-Royalties.", status: "beta", route: "/cockpit/ip-box" },
      { slug: "eu-alternativen", title: "EU-/CH-Alternativen", desc: "13 Länder (EE 0% thesauriert, CH 11,9% Zug, AT FlexCo, IE, LU, CY, PL, CZ, LT, MT, BG) + 5 Multi-Jurisdiktion-Konstrukte.", status: "beta", route: "/cockpit/eu-alternativen" },
      { slug: "entscheidungs-engine", title: "Entscheidungs-Engine", desc: "9-Fragen-Wizard quer über alle Strukturen (Einzel · UG · GmbH · Holding · Multi-Brand · Familien-Pool · Stiftung · VC-Doppel · IP · EU-Alt · US-LLC) → Top-3-Empfehlungen mit Begründung.", status: "beta", route: "/cockpit/entscheidungs-engine" },
      { slug: "auszahlung-optimizer", title: "Gewinn-Auszahlungs-Optimizer", desc: "7 Auszahlungs-Wege im Vergleich (GF-Gehalt · Standard-Dividende · TEV · Holding · Mix · Pension · Tantieme) mit konkreter Steuer-Berechnung pro Variante.", status: "beta", route: "/cockpit/auszahlung-optimizer" },
    ],
  },
  {
    slug: "launch",
    title: "Launch-Phase Compliance",
    emoji: "🚀",
    icon: Rocket,
    tagline: "Brand-Gründung, CPNP, WEEE, LUCID, EXIST",
    features: [
      { slug: "ecom-roadmap", title: "ECom-Brand-Roadmap", desc: "8 Kategorien (Beauty, Supplement, Electronics, Toys, Apparel, Food, Pet, Hardware) mit DE/EU/US-Compliance-Stack 2026 + Stolperfallen.", status: "beta", route: "/cockpit/ecom-roadmap" },
      { slug: "lucid-wizard", title: "Verpackungslizenz-Rechner (LUCID)", desc: "5-Step-Wizard mit Kosten-Rechner: Material-Mengen rein → Lizenz-Kostenrange + Anbieter-Empfehlung aus 9 dualen Systemen. Tarife 2026. Kein Verzeichnis.", status: "beta", route: "/cockpit/lucid-wizard" },
      { slug: "ce-rohs", title: "CE/RoHS-Konformitätserklärung", desc: "PDF-Generator für 8 Produkt-Kategorien (Elektronik, Spielzeug, Maschine, Medizinprodukt, Kosmetik, PSA, Funk, Wearable) mit GPSR + Battery-Reg.", status: "beta", route: "/cockpit/ce-generator" },
      { slug: "labor-vergleich", title: "Labor-Anbieter-Vergleich", desc: "44 etablierte Labore DE/EU (ISO 17025) für 14 Kategorien — Kosmetik, Food, Electronics, Spielzeug, Textil, MDR, PSA. 8 Use-Case-Stacks mit Kosten-Ballparks.", status: "beta", route: "/cockpit/labor-vergleich" },
      { slug: "visa-helper", title: "Visa-Helper international (beide Richtungen)", desc: "🇩🇪 NACH Deutschland: 6 Aufenthaltstitel mit Profil-Score. 🌍 AUS Deutschland raus: 27 Visa weltweit + §6 AStG Wegzugs-Block + AVOID-Liste.", status: "beta", route: "/cockpit/visa-helper" },
      { slug: "foerderung-db", title: "Förderung-Datenbank international", desc: "40+ Programme in 14 Ländern: KfW/EXIST, EIC, BPI, WBSO, YC/Techstars, SEIS/EIS, Innosuisse, Antler. Filter nach Land/Typ/Phase + Watchouts.", status: "beta", route: "/cockpit/foerderung" },
    ],
  },
  {
    slug: "marken",
    title: "Marken & Domain",
    emoji: "🛠️",
    icon: Tag,
    tagline: "DPMA, EUIPO, USPTO, Domain, Social-Handles",
    features: [
      { slug: "brand-check", title: "Marken + Domain + Social + App-Store Live-Check", desc: "DPMA + EUIPO via TMView · 8 TLDs (.de/.com/.net/.io/.shop/.co/.app/.store) · 5 Social-Handles (IG/TikTok/YouTube/X/GitHub) · Apple App Store via iTunes Search API – in einem Klick.", status: "beta", route: "/cockpit/check" },
      { slug: "dpma-wizard", title: "DPMA-Anmeldungs-Wizard", desc: "Schritt-für-Schritt mit Branchen-basierter Nizza-Klassen-Empfehlung + Live-Kostenrechner + Direkt-Link zur offiziellen Anmeldung.", status: "beta", route: "/cockpit/marken-wizard" },
      { slug: "marken-monitor", title: "Markenüberwachung", desc: "Watchlist deiner Marken · manueller Recheck-Button · Diff-Alert bei neuen Anmeldungen seit letzter Prüfung.", status: "beta", route: "/cockpit/marken-monitor" },
    ],
  },
  {
    slug: "buchhaltung",
    title: "Buchhaltung & Reporting",
    emoji: "📊",
    icon: BookOpen,
    tagline: "Amazon, Stripe, Shopify, DATEV-Export",
    features: [
      { slug: "amazon-parser", title: "Amazon-Settlement-Parser", desc: "Amazon-Settlement-CSV → automatisch aufgesplittet pro Fee-Typ + SKR03/04-Mapping über die 130+ Amazon-Buchungs-Codes. CSV-Export für StB.", status: "beta", route: "/cockpit/settlement-parser?mode=amazon" },
      { slug: "datev-mapping", title: "DATEV / Lexoffice Auto-Mapper", desc: "Bank-CSV einfügen → 35+ Auto-Regeln (Amazon, Stripe, PayPal, Klarna, Shopify, AWS, Meta/TikTok/Google Ads, DHL, Steuerberater) mit RC §13b für IE-Sub-Anbieter · Lexoffice-CSV + DATEV-Stapel-Export.", status: "beta", route: "/cockpit/datev-mapper" },
      { slug: "amazon-ust", title: "Amazon-USt EU vs US Lookup", desc: "6 Konstellationen (DE-Verkauf, DE-Provisionen seit Aug 2024 mit 19% VSt, IT/FR/ES/NL §13b RC, EU-FBA-Lager + OSS, US Marketplace-Facilitator, UK Brexit) mit Konten + Steuerschlüsseln + Pflicht-Registrierungen.", status: "beta", route: "/cockpit/amazon-ust" },
      { slug: "stripe-parser", title: "Stripe-Payout-Parser", desc: "Stripe-Payout-CSV → Verkäufe / Fees / Refunds / Chargebacks / Trinkgelder / Auszahlungen aufgesplittet + SKR03/04. CSV-Export.", status: "beta", route: "/cockpit/settlement-parser?mode=stripe" },
      { slug: "marge-tracker", title: "Multi-Channel-Marge-Tracker", desc: "7 Channels (Shopify · Amazon FBA/FBM · eBay · Kaufland · Otto · Etsy) mit kanal-spezifischen Provisions + Payment-Fees + Werbung + Retouren-Quote · Marge & ROAS pro SKU & Kanal.", status: "beta", route: "/cockpit/marge-tracker" },
      { slug: "bwa", title: "BWA-Generator (Bank-tauglich)", desc: "Bank-feste BWA 2026: Net Debt/EBITDA, DSCR, FCF, ROCE — branchen-adjustierte Benchmarks (Basel IV / KfW). Score nur bei plausibler Datenlage, mit YoY + Bilanz + Cashflow.", status: "beta", route: "/cockpit/bwa-generator" },
      { slug: "datev-export", title: "StB-Hand-off Übergabe-Bundle", desc: "30+ Pflicht-Posten in 5 Gruppen (Buchführung, Steuer-Tools, International, Personal, Sonstiges) · Manifest-PDF mit Mandantendaten + Periode + Anhängen · Email-Helper mit fertigem Body.", status: "beta", route: "/cockpit/stb-handoff" },
    ],
  },
  {
    slug: "anbieter",
    title: "Anbieter-Vergleichs-Engine",
    emoji: "🏆",
    icon: Trophy,
    tagline: "Versand, Banking, Buchhaltung, 3PL, LUCID …",
    features: [
      { slug: "vergleich-versand-de", title: "Versand DACH", desc: "DHL, DPD, GLS, Hermes, UPS.", status: "beta", route: "/anbieter?cat=Versand+DACH" },
      { slug: "vergleich-versand-int", title: "Versand International", desc: "Sendcloud, Easyship, ShipBob.", status: "beta", route: "/anbieter?cat=Versand+DACH" },
      { slug: "vergleich-buchhaltung", title: "Buchhaltung", desc: "Lexoffice, sevDesk, DATEV, Candis.", status: "beta", route: "/anbieter?cat=Buchhaltung" },
      { slug: "vergleich-banking-de", title: "Banking DE", desc: "Holvi, Qonto, Penta, Kontist, Finom.", status: "beta", route: "/anbieter?cat=Banking+DE" },
      { slug: "vergleich-banking-us", title: "Banking US", desc: "Mercury, Wise, Relay, Brex.", status: "beta", route: "/anbieter?cat=Banking+US" },
      { slug: "vergleich-3pl", title: "3PL / Fulfillment", desc: "Byrd, ShipBob, FromSpace.", status: "beta", route: "/anbieter?cat=3PL" },
      { slug: "vergleich-lucid", title: "LUCID / Verpackung", desc: "Lizenzero, Reclay, BellandVision.", status: "beta", route: "/anbieter?cat=LUCID" },
      { slug: "vergleich-shop", title: "Shop-Systeme", desc: "Shopify, Shopware, Woo, Headless.", status: "beta", route: "/anbieter?cat=Shop-System" },
      { slug: "vergleich-email", title: "Pixel / Email", desc: "Klaviyo, Brevo, ActiveCampaign.", status: "beta", route: "/anbieter?cat=Email" },
      { slug: "vergleich-tracking", title: "Tracking", desc: "Hyros, Triple Whale, Wicked Reports.", status: "beta", route: "/anbieter?cat=Tracking" },
      { slug: "stb-marketplace", title: "StB-Auswahl-Wizard", desc: "5 Spezialisierungen (E-Com / Crypto / Holding / International / Standard) mit Pflicht-Knowledge + Bonus-Knowledge + Honorar-Range + Erst-Termin-Frage-Katalog + Red-Flags. Kein Marketplace, sondern Operator-Knowledge.", status: "beta", route: "/cockpit/stb-finder" },
    ],
  },
  {
    slug: "premium",
    title: "Premium-Add-ons",
    emoji: "🤝",
    icon: HeartHandshake,
    tagline: "STB-Hand-off, Community, 1:1-Bookings",
    features: [
      { slug: "stb-handoff", title: "Steuerberater-Hand-off (3-Angebote-Modell)", desc: "3-Step-Wizard mit 10 Gründer-Gruppen (Solo, GmbH, E-Com, Holding, International, Crypto, SaaS, Lohn, F&E, Stiftung) — jede mit eigenen Pflichtfeldern + Trick-Fragen. Briefing-PDF + Email an Top-3-Kanzleien (§9 StBerG-konform).", status: "beta", route: "/cockpit/stb-match" },
      { slug: "community", title: "Founder-Discord-Community", desc: "Geprüfte Gründer-Community auf Discord — Austausch, Fragen, Off-Topic, Live-Channels für Steuern, Holding, US-LLC, Marketing.", status: "live", route: "https://discord.gg/vh84QBxAHq", external: true },
      { slug: "webinare", title: "Live-Webinare", desc: "HK-Setup, Holding, Exit – komplexe Themen.", status: "planned" },
      { slug: "experten-bookings", title: "1:1-Berater-Termin buchen", desc: "Buche einen 30-min-Call: Rechtsform, Holding, US-LLC, Steuer-Setup, ECom-Brand-Strategie. Direkt im Kalender Slot wählen.", status: "beta", route: "/booking" },
      { slug: "coop-deals", title: "Exklusive Coop-Deals", desc: "Verhandelte Sonderkonditionen bei allen Anbietern.", status: "soon" },
    ],
  },
];

// Reihenfolge nach Relevanz für die breite Masse der (DE-)Gründer.
const ORDER = ["rechtsform", "steuer", "buchhaltung", "marken", "anbieter", "launch", "international", "premium"];
export const CATEGORIES: FeatureCategory[] = ORDER
  .map((slug) => _CATEGORIES_RAW.find((c) => c.slug === slug)!)
  .filter(Boolean);

export const STATUS_LABEL: Record<FeatureStatus, string> = {
  live: "Live",
  beta: "Beta",
  soon: "Bald",
  planned: "Geplant",
};
