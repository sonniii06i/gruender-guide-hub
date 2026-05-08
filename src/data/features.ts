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
      { slug: "us-llc-wizard", title: "US-LLC Setup-Wizard", desc: "Bundesstaat-Vergleich, Registered Agent, EIN, ITIN, BOI/FinCEN, Form 5472+1120.", status: "soon" },
      { slug: "hk-limited-wizard", title: "HK-Limited Setup-Wizard", desc: "Company Secretary, Adresse, Profits Tax, Offshore-Status, Audited Accounts.", status: "soon" },
      { slug: "us-banking", title: "US-Bankkonto-Anbieter", desc: "Mercury, Wise, Relay, Brex – Vergleich & Konditionen.", status: "soon" },
      { slug: "hk-banking", title: "HK-Bankkonto", desc: "Statrys, Airwallex, Currenxie für asiatische Setups.", status: "soon" },
      { slug: "sales-tax-nexus", title: "Sales-Tax-Nexus-Check", desc: "Pro US-Staat: ab welchem Umsatz musst du registrieren?", status: "planned" },
      { slug: "substance-checker", title: "Substance-Requirements-Checker", desc: "Mailbox-Company-Risiko & echte Substanz im Ausland.", status: "planned" },
      { slug: "dba-cfc", title: "DE-Anrechnung US/HK-Gewinne", desc: "DBA + CFC-Regelungen (Hinzurechnungsbesteuerung).", status: "planned" },
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
      { slug: "pre-year-end", title: "Pre-Year-End-Check", desc: "Ab November: 7 Hebel, die du noch ziehen kannst.", status: "soon" },
      { slug: "iab-rechner", title: "IAB-Rechner", desc: "Investitionsabzugsbetrag bis 200.000 €.", status: "beta", route: "/cockpit/steuer" },
      { slug: "kfz-optimizer", title: "Kfz-Versteuerung-Optimizer", desc: "1%-Regel vs Fahrtenbuch – was lohnt sich?", status: "soon" },
      { slug: "reisekosten", title: "Reisekosten/Bewirtung-Logger", desc: "OCR-Belege, automatische Kategorisierung.", status: "planned" },
      { slug: "salary-vs-dividende", title: "Salary-vs-Dividende-Optimizer", desc: "Geschäftsführer-Gehalt oder Gewinnausschüttung?", status: "soon" },
      { slug: "crypto-steuer", title: "Crypto-Steuer-Modul", desc: "FIFO, Wallet-Tracking, Steuer-Report.", status: "planned" },
      { slug: "pension", title: "Rürup / bAV-Optimierung", desc: "Maximale steuerliche Wirkung der Altersvorsorge.", status: "planned" },
      { slug: "quartal-schaetzung", title: "Quartals-Steuerschätzung", desc: "Was musst du dieses Quartal zurücklegen?", status: "beta", route: "/cockpit/steuer" },
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
      { slug: "ip-box", title: "IP-Box-Vergleich", desc: "NL, IE, HU, CH Patent-Box im Vergleich.", status: "planned" },
      { slug: "eu-alternativen", title: "EU-/CH-Alternativen", desc: "13 Länder: EE (0% thesauriert) · NL (BV+Innovation Box) · CH (11,9% Zug) · AT (FlexCo 23%) · IE (12,5%) · LU SPF (0% Wealth) · LU Soparfi (Participation Exemption) · CY · PL (9% small) · CZ · LT (5% small) · MT (5% effektiv) · BG (10%). Plus 5 Real-World Multi-Jurisdiktion-Konstrukte.", status: "beta", route: "/cockpit/eu-alternativen" },
      { slug: "entscheidungs-engine", title: "Entscheidungs-Engine", desc: "7-Fragen-Wizard quer über alle Strukturen (Einzel · UG · GmbH · Holding · Multi-Brand · Familien-Pool · Stiftung · VC-Doppel · IP · EU-Alt · US-LLC) → Top-4-Empfehlungen mit Begründung.", status: "beta", route: "/cockpit/entscheidungs-engine" },
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
      { slug: "ecom-roadmap", title: "Ecom-Brand-Roadmap", desc: "Beauty, Supplement, Electronics, Toys, Apparel, Food.", status: "soon" },
      { slug: "category-compliance", title: "Pflicht-Compliance pro Kategorie", desc: "CPNP/MoCRA, WEEE/EAR, EN71, NEM-Anzeige …", status: "soon" },
      { slug: "lucid-wizard", title: "LUCID-Verpackungsregister", desc: "Wizard für die Verpackungsregistrierung.", status: "soon" },
      { slug: "ce-rohs", title: "Konformitätserklärung", desc: "CE / RoHS-Generator als PDF.", status: "soon" },
      { slug: "labor-vergleich", title: "Labor-Anbieter-Vergleich", desc: "Pro Test-Anforderung passendes Labor.", status: "planned" },
      { slug: "visa-helper", title: "Visa / Residency-Helper", desc: "Für non-EU-Gründer in DE.", status: "planned" },
      { slug: "foerderung-db", title: "Gründungs-Förderung-Datenbank", desc: "KfW, EXIST, ERP, Bundesländer-Programme.", status: "soon" },
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
      { slug: "amazon-parser", title: "Amazon-Settlement-Parser", desc: "FBA-Fees, Werbung, Storage, Returns aufteilen.", status: "soon" },
      { slug: "datev-mapping", title: "DATEV / Lexoffice Auto-Mapping", desc: "Pro Fee-Typ automatisch verbuchen.", status: "soon" },
      { slug: "amazon-ust", title: "USt Amazon EU vs US", desc: "Reverse-Charge-Logik korrekt anwenden.", status: "planned" },
      { slug: "stripe-parser", title: "Stripe-Payout-Parser", desc: "Trinkgeld, Fees, Chargebacks aufteilen.", status: "soon" },
      { slug: "marge-tracker", title: "Multi-Channel-Marge-Tracker", desc: "Shopify + Amazon + eBay + Otto vereint.", status: "soon" },
      { slug: "bwa", title: "BWA-Auto-Generator", desc: "Betriebswirtschaftliche Auswertung auf Knopfdruck.", status: "planned" },
      { slug: "datev-export", title: "DATEV-Export für Steuerberater", desc: "Sauberes Übergabe-Bundle.", status: "planned" },
    ],
  },
  {
    slug: "anbieter",
    title: "Anbieter-Vergleichs-Engine",
    emoji: "🏆",
    icon: Trophy,
    tagline: "Versand, Banking, Buchhaltung, 3PL, LUCID …",
    features: [
      { slug: "vergleich-versand-de", title: "Versand DACH", desc: "DHL, DPD, GLS, Hermes, UPS.", status: "beta", route: "/anbieter" },
      { slug: "vergleich-versand-int", title: "Versand International", desc: "Sendcloud, Easyship, ShipBob.", status: "beta", route: "/anbieter" },
      { slug: "vergleich-buchhaltung", title: "Buchhaltung", desc: "Lexoffice, sevDesk, DATEV, Candis.", status: "beta", route: "/anbieter" },
      { slug: "vergleich-banking-de", title: "Banking DE", desc: "Holvi, Qonto, Penta, Kontist, Finom.", status: "beta", route: "/anbieter" },
      { slug: "vergleich-banking-us", title: "Banking US", desc: "Mercury, Wise, Relay, Brex.", status: "beta", route: "/anbieter" },
      { slug: "vergleich-3pl", title: "3PL / Fulfillment", desc: "Byrd, ShipBob, FromSpace.", status: "beta", route: "/anbieter" },
      { slug: "vergleich-lucid", title: "LUCID / Verpackung", desc: "Lizenzero, Reclay, BellandVision.", status: "beta", route: "/anbieter" },
      { slug: "vergleich-shop", title: "Shop-Systeme", desc: "Shopify, Shopware, Woo, Headless.", status: "beta", route: "/anbieter" },
      { slug: "vergleich-email", title: "Pixel / Email", desc: "Klaviyo, Brevo, ActiveCampaign.", status: "beta", route: "/anbieter" },
      { slug: "vergleich-tracking", title: "Tracking", desc: "Hyros, Triple Whale, Wicked Reports.", status: "beta", route: "/anbieter" },
      { slug: "stb-marketplace", title: "Steuerberater-Marketplace", desc: "Verifizierte Partner mit Revenue-Share.", status: "soon" },
    ],
  },
  {
    slug: "premium",
    title: "Premium-Add-ons",
    emoji: "🤝",
    icon: HeartHandshake,
    tagline: "STB-Hand-off, Community, 1:1-Bookings",
    features: [
      { slug: "stb-handoff", title: "Steuerberater-Hand-off", desc: "PDF-Bundle aus deinem Cockpit, 3-Angebote-Modell.", status: "soon" },
      { slug: "community", title: "Founder-Slack/Discord", desc: "Geprüfte Gründer-Community.", status: "soon" },
      { slug: "webinare", title: "Live-Webinare", desc: "HK-Setup, Holding, Exit – komplexe Themen.", status: "planned" },
      { slug: "experten-bookings", title: "1:1-Berater-Bookings", desc: "Verifizierte Berater, reine Vermittlung.", status: "planned" },
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
