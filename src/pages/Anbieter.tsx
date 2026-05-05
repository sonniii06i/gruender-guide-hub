import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Star, Tag, ExternalLink, MessageSquare, Clock, AlertCircle } from "lucide-react";

interface Provider {
  slug: string;
  name: string;
  category: string;
  region: string;
  starting: string;
  /** Monatliche Mindestgebühr (für DHL etc.) */
  monthlyMin?: string;
  rating: number;
  /** Kurz-Tagline für die Card */
  tagline: string;
  pros: string[];
  cons: string[];
  /** Forum-Erfahrungen aus Reddit / E-Com-Foren / D2C-Communities */
  forumNotes?: string;
  /** Geschätzte Signup-/Approval-Dauer (auch für "auf Anfrage"-Anbieter) */
  signupTime?: string;
  /** Echter aktiver Coop-Deal mit GründerX (nur die wirklich verhandelten) */
  coop?: { text: string; code?: string; expires?: string };
  url: string;
}

const PROVIDERS: Provider[] = [
  // ============ BANKING DE ============
  {
    slug: "qonto",
    name: "Qonto",
    category: "Banking DE",
    region: "DE/EU",
    starting: "9 €/Mon",
    rating: 4.5,
    tagline: "Beste App, Multi-User, DATEV-Export",
    pros: ["Schnelles Onboarding (1–3 Tage)", "Top Lexoffice/DATEV-Anbindung", "Klar führend bei DE-GmbH-Gründungen", "DE-IBAN, GmbH i.G. akzeptiert"],
    cons: ["Limit auf SEPA-Buchungen (30/Mon Basic, danach 0,30 €)", "Kein Bargeld-Service"],
    forumNotes: "r/Selbststaendig + r/Finanzen: meistgenannte Empfehlung für GmbH-Solo-Gründer. Onboarding wird durchweg gelobt.",
    signupTime: "1–3 Tage komplett digital",
    coop: { text: "30 Tage gratis + 50 € Bonus", code: "GRUENDERX50" },
    url: "https://qonto.com/de",
  },
  {
    slug: "holvi",
    name: "Holvi",
    category: "Banking DE",
    region: "DE",
    starting: "9 €/Mon",
    rating: 4.2,
    tagline: "Buchhaltung integriert, Solo-Selbstständige",
    pros: ["Eingebaute Rechnungs-/Buchhaltungs-Tools", "Solo-/Klein-GmbH-Fokus", "DE-IBAN"],
    cons: ["Reviews wegen Account-Sperren gemischt", "Weniger Buchungs-Inklusivvolumen als Qonto"],
    forumNotes: "Gründerszene-Foren: gut für Freelancer mit Rechnungs-Bedarf, aber auf r/Finanzen Berichte über willkürliche Account-Schließungen.",
    signupTime: "1–5 Tage",
    url: "https://www.holvi.com/de/",
  },
  {
    slug: "finom",
    name: "Finom",
    category: "Banking DE",
    region: "DE/EU",
    starting: "0 €/Mon",
    rating: 4.3,
    tagline: "Kostenloser Tarif, Rechnungstool",
    pros: ["Free-Tier wirklich nutzbar", "Cashback auf Karten-Umsätze", "Schnelles Onboarding", "DE-IBAN"],
    cons: ["Junges Brand in DE", "Support gelegentlich langsam"],
    forumNotes: "Trustpilot ~4,4. r/Selbststaendig: 'preissensible Alternative zu Qonto, hat sich 2024–25 stark verbessert.'",
    signupTime: "1–2 Tage",
    coop: { text: "3 Monate Premium gratis", code: "GRUENDERX" },
    url: "https://finom.co/de-de/",
  },
  {
    slug: "kontist",
    name: "Kontist",
    category: "Banking DE",
    region: "DE",
    starting: "9 €/Mon",
    rating: 4.0,
    tagline: "Steuer-Tool für Freelancer",
    pros: ["Steuer-Schätzung in Echtzeit", "Mit DATEV-Anbindung (Premium)"],
    cons: ["Klar Solo-/Freelancer-Fokus, GmbH eingeschränkt", "Nicht mehr aktiv weiterentwickelt seit Solaris-Schwierigkeiten"],
    forumNotes: "r/Finanzen 2024+: 'Vorsicht – Solaris-Backend instabil, viele User sind zu Qonto migriert.'",
    signupTime: "2–4 Tage",
    url: "https://kontist.com",
  },
  {
    slug: "deutsche-bank-business",
    name: "Deutsche Bank Business",
    category: "Banking DE",
    region: "DE",
    starting: "ab 12,90 €/Mon",
    rating: 4.0,
    tagline: "Hausbank für GmbHs mit Kreditbedarf",
    pros: ["100 % online eröffenbar", "Größtes Filialnetz DE", "Solides Kredit-Geschäft, KfW-Partner", "Internationale Reichweite"],
    cons: ["Reine Buchungspakete günstiger bei Neos (Qonto, Revolut)"],
    forumNotes: "Mittelstand-Communities: klare Empfehlung wenn später Kreditlinien für Inventory/Ad-Spend nötig.",
    signupTime: "Online-Eröffnung in wenigen Tagen",
    url: "https://www.deutsche-bank.de/gk.html",
  },
  {
    slug: "commerzbank-business",
    name: "Commerzbank Business",
    category: "Banking DE",
    region: "DE",
    starting: "ab 12,90 €/Mon",
    rating: 3.5,
    tagline: "Mittelstands-DNA, KfW-Partner",
    pros: ["Filialnetz DE-weit", "Solide Beratung für Wachstumskredite"],
    cons: ["Hohe Buchungsgebühr ab 11. (0,15 €)", "App eher altbacken"],
    forumNotes: "Mittelstands-Foren: solide Wahl für KMU mit Kreditlinien-Bedarf, App-UX wird oft kritisiert.",
    signupTime: "1–2 Wochen",
    url: "https://www.commerzbank.de/firmenkunden/",
  },
  {
    slug: "sparkasse",
    name: "Sparkasse (regional)",
    category: "Banking DE",
    region: "DE (regional)",
    starting: "5–15 €/Mon",
    rating: 3.5,
    tagline: "Lokale Kreditkultur, Bargeld am Schalter",
    pros: ["Lokale Verankerung & Kreditkultur", "Cash-Einzahlung am Schalter", "Top-Hausbank für KMU"],
    cons: ["Konditionen variieren stark je Sparkasse", "Online-Banking je nach Region veraltet"],
    forumNotes: "r/Selbststaendig: 'Hängt extrem von der lokalen Sparkasse ab — Berliner und Hamburger Sparkasse top, andere Regionen schlechter.'",
    signupTime: "1–3 Wochen (Filialtermin)",
    url: "https://www.sparkasse.de/firmenkunden",
  },
  {
    slug: "volksbank",
    name: "Volksbank / Raiffeisenbank",
    category: "Banking DE",
    region: "DE (regional)",
    starting: "8–14 €/Mon",
    rating: 3.5,
    tagline: "Genossenschaftlich, persönlich",
    pros: ["Starkes Mittelstandsgeschäft", "Förderkredite oft fair", "Lokal verankert"],
    cons: ["Digitalisierung uneinheitlich", "Konditionen je Bank stark unterschiedlich"],
    signupTime: "1–3 Wochen",
    url: "https://www.vr.de/firmenkunden",
  },
  {
    slug: "postbank-business",
    name: "Postbank Business",
    category: "Banking DE",
    region: "DE",
    starting: "ab 11,90 €/Mon",
    rating: 3.0,
    tagline: "Cash via Postfilialen",
    pros: ["Cash-Einzahlung in Postfilialen DE-weit", "Deutsche-Bank-Tochter (stabile Hausbank)"],
    cons: ["Wenig digital", "Service-Erfahrung gemischt"],
    signupTime: "1–2 Wochen",
    url: "https://www.postbank.de/firmenkunden/",
  },
  {
    slug: "hvb-business",
    name: "HypoVereinsbank (UniCredit)",
    category: "Banking DE",
    region: "DE / EU",
    starting: "ab 9,90 €/Mon",
    rating: 3.5,
    tagline: "Italienisch-deutscher Konzern",
    pros: ["EU-stark, ideal bei Italien/Südeuropa-Bezug", "Solide für mittelständische GmbHs"],
    cons: ["Weniger Filialen außerhalb Bayern/NRW"],
    signupTime: "2–3 Wochen",
    url: "https://www.hypovereinsbank.de/hvb/firmenkunden",
  },
  {
    slug: "dkb-business",
    name: "DKB Business",
    category: "Banking DE",
    region: "DE",
    starting: "0–9,75 €/Mon",
    rating: 4.0,
    tagline: "Günstige Direktbank, beleglos kostenlos",
    pros: ["Sehr günstig", "Sauberes Online-Banking", "Beleglose Buchungen kostenlos im Tarif"],
    cons: ["Keine Filiale", "Onboarding manchmal hakelig (Postident)"],
    forumNotes: "r/Finanzen: 'Geheimtipp für digitale GmbHs ohne Cash-Geschäft. Antrag-Prozess kann nerven.'",
    signupTime: "1–2 Wochen",
    url: "https://www.dkb.de/business/",
  },
  {
    slug: "fyrst",
    name: "Fyrst",
    category: "Banking DE",
    region: "DE",
    starting: "0 € (Base) / 10 € (Complete)",
    rating: 4.0,
    tagline: "Postbank-Tochter mit DE-IBAN, Free-Tier",
    pros: ["Free-Tier okay für Solo-GmbH", "Postbank/Deutsche-Bank-Tochter", "Cash via Postbank-Filialen"],
    cons: ["App weniger feature-reich als Neos", "Limit auf Buchungen"],
    signupTime: "1–2 Wochen",
    url: "https://www.fyrst.de/",
  },
  {
    slug: "n26-business",
    name: "N26 Business",
    category: "Banking DE",
    region: "DE/EU",
    starting: "0 € (Standard) / 4,90 € (Smart)",
    rating: 3.5,
    tagline: "App-First, sehr günstig",
    pros: ["Sehr günstig & schnell", "App-UX top", "SEPA-Out unbegrenzt frei"],
    cons: ["GmbH-Konto-Eröffnung historisch oft eingeschränkt", "Account-Sperren-Stories in Reviews"],
    forumNotes: "r/Finanzen: 'Für Freelancer top, für GmbH lieber Qonto/Finom — N26 schließt manchmal grundlos.'",
    signupTime: "1–3 Tage",
    url: "https://n26.com/de-de/business",
  },
  {
    slug: "revolut-business",
    name: "Revolut Business",
    category: "Banking DE",
    region: "EU",
    starting: "0 € (Basic) / ab 19 €/Mon",
    rating: 4.0,
    tagline: "Multi-Currency für USD/GBP-Spend",
    pros: ["DE-IBAN seit 2024", "Multi-Currency (USD/GBP) für Ads & Imports", "Schnelle Karten-Issuance"],
    cons: ["Stammkapital-Einzahlung GmbH je nach Konstellation noch zickig", "Tarifstruktur teils komplex"],
    forumNotes: "r/dropship + Meta-Ads-Foren: meistempfohlen für USD-Karten-Spend (Meta/TikTok-Ads), günstiger als FX bei Hausbank.",
    signupTime: "1–2 Tage",
    url: "https://www.revolut.com/de-DE/business/",
  },
  {
    slug: "vivid-business",
    name: "Vivid Business",
    category: "Banking DE",
    region: "DE/EU",
    starting: "ab 9,90 €/Mon",
    rating: 4.0,
    tagline: "Schickes UI, Sub-Accounts",
    pros: ["100 SEPA-Buchungen inkl.", "Sub-Accounts für Budgetierung", "Investment-Features"],
    cons: ["Etwas jünger im Markt", "Tarifstruktur komplex"],
    signupTime: "1–3 Tage",
    url: "https://vivid.money/de-de/business/",
  },
  {
    slug: "bunq-business",
    name: "Bunq Business",
    category: "Banking DE",
    region: "EU",
    starting: "ab 9,99 €/Mon",
    rating: 4.0,
    tagline: "Multi-IBAN, EU-fokussiert",
    pros: ["Multi-Banking & Mehr-IBAN", "EU-weit gut nutzbar"],
    cons: ["Support manchmal träge", "DE-Markt kleiner als bei Qonto"],
    signupTime: "1–3 Tage",
    url: "https://www.bunq.com/de/business",
  },

  // ============ BANKING US ============
  {
    slug: "mercury",
    name: "Mercury",
    category: "Banking US",
    region: "US",
    starting: "0 $",
    rating: 4.7,
    tagline: "Top für US-LLC Founder, free",
    pros: ["Beste US-Banking-App für Tech-Startups", "Kostenfrei, Treasury-Yield optional", "API + Stripe-Integration top"],
    cons: ["Approval kann tricky sein für Non-US-Founder", "ITIN/SSN-Hürden ohne US-Adresse", "Manche Branchen werden gerejectet (HighRisk, Crypto)"],
    forumNotes: "r/Entrepreneur + Indie Hackers: 'Mercury-Approval ist nicht trivial — saubere Website + LLC-Docs Pflicht. Bei Reject lieber Relay versuchen.'",
    signupTime: "3–14 Tage (Approval-abhängig, viele Initial-Rejects)",
    coop: { text: "250 $ Bonus ab 10k Deposit" },
    url: "https://mercury.com",
  },
  {
    slug: "wise-business",
    name: "Wise Business",
    category: "Banking US",
    region: "global",
    starting: "0 €",
    rating: 4.5,
    tagline: "Multi-Currency, beste FX-Raten",
    pros: ["Multi-Currency (40+) ohne FX-Spread", "Sehr schnelles Onboarding", "Globale IBANs (US, UK, EU)"],
    cons: ["Kein Sperrkonto für DE-GmbH-Stammkapital", "Limit auf monatliches Volumen ohne Verifikation"],
    forumNotes: "r/digitalnomad + r/expats: 'Setup in 30 Minuten, kein Vergleich zu Mercury-Approval-Pain. Best als Zweitkonto für FX.'",
    signupTime: "30 min – 1 Tag (komplett digital)",
    url: "https://wise.com/de/business/",
  },
  {
    slug: "relay",
    name: "Relay",
    category: "Banking US",
    region: "US",
    starting: "0 $",
    rating: 4.3,
    tagline: "20 Konten, Rollen & Rechte",
    pros: ["Bis zu 20 Sub-Konten für Profit-First/EBO", "Rollen-Management", "Free-Tier solide"],
    cons: ["Nur USD, kein FX", "Card-Funktionen schwächer als Mercury"],
    forumNotes: "Profit-First-Communities: 'Mercury-Alternative wenn Multi-Konten-Setup wichtig — Mercury hat das nur in Pro-Tier.'",
    signupTime: "3–7 Tage",
    url: "https://relayfi.com",
  },
  {
    slug: "brex",
    name: "Brex",
    category: "Banking US",
    region: "US",
    starting: "0 $",
    rating: 4.2,
    tagline: "Kreditkarte für VC-funded Startups",
    pros: ["Hohe Limits ohne PG (für funded Startups)", "Top Expense-Management", "Rewards"],
    cons: ["Eher für VC-funded (>$100k Bank-Balance)", "Bootstrap-Founder oft abgelehnt"],
    forumNotes: "Indie Hackers: 'Brex hat Bootstrap-Sparte 2022 gekillt — nur noch für funded Startups sinnvoll.'",
    signupTime: "2–5 Tage",
    url: "https://brex.com",
  },

  // ============ VERSAND DACH ============
  {
    slug: "sendcloud",
    name: "Sendcloud",
    category: "Versand DACH",
    region: "DACH/EU",
    starting: "ab 23 €/Mon",
    rating: 4.6,
    tagline: "Multi-Carrier, Retouren-Portal",
    pros: ["Multi-Carrier (DHL, DPD, GLS, UPS, Hermes) in einer Plattform", "Top Retouren-Portal", "Shopify/Shopware/WooCommerce-Plugins"],
    cons: ["Aufpreis ggü. direkten Carrier-Tarifen bei hohem Volumen", "Bindung an Sendcloud-Labels"],
    forumNotes: "r/ecommerce_de + Shopify-DE-Foren: 'Standard für 50–500 Pakete/Monat. Ab 500+ direkter Carrier-Vertrag günstiger.'",
    signupTime: "1 Tag (sofort startklar)",
    coop: { text: "1. Monat gratis" },
    url: "https://sendcloud.de",
  },
  {
    slug: "dhl-geschaeftskunden",
    name: "DHL Geschäftskunden",
    category: "Versand DACH",
    region: "DE",
    starting: "auf Anfrage",
    monthlyMin: "Mindestumsatz ~250 €/Mon (regional unterschiedlich)",
    rating: 4.0,
    tagline: "Standard für DE-Versand",
    pros: ["Größtes DE-Netz", "Express-Optionen + Auslandsversand", "API + Integration solide"],
    cons: ["Mindestumsatz pro Monat (regional)", "Paketpreis-Verhandlung erst ab ~500 Stück/Mon spürbar günstiger"],
    forumNotes: "r/ecommerce_de: 'Estimate aus Foren: 1–3 kg Paket DACH ~3,50–4,50 € netto bei mittlerem Volumen. Verhandlungsspielraum ab 1000 Stück/Mon.'",
    signupTime: "2–4 Wochen (Vertragsverhandlung)",
    url: "https://www.dhl.de/de/geschaeftskunden.html",
  },
  {
    slug: "dpd",
    name: "DPD",
    category: "Versand DACH",
    region: "DACH",
    starting: "auf Anfrage",
    rating: 3.8,
    tagline: "Günstig ab 100 Pakete/Monat",
    pros: ["Oft günstiger als DHL bei mittlerem Volumen", "Gute API"],
    cons: ["Zustellqualität regional schwankend", "Kundenservice gemischt"],
    forumNotes: "Shopify-DE-Slack: 'DPD-Schäden/Verluste ~2–3x häufiger als DHL — bei zerbrechlicher Ware Vorsicht.'",
    signupTime: "1–2 Wochen",
    url: "https://www.dpd.com/de/de/",
  },
  {
    slug: "gls",
    name: "GLS",
    category: "Versand DACH",
    region: "DACH/EU",
    starting: "auf Anfrage",
    rating: 3.9,
    tagline: "EU-stark, B2B-Fokus",
    pros: ["EU-Versand stark", "Pünktlich bei B2B"],
    cons: ["B2C-Zustellung bei Privathaushalten oft mehrere Versuche"],
    forumNotes: "Estimate: ~3,80–4,80 € pro 1–5 kg DACH-Paket im Vertrag.",
    signupTime: "1–2 Wochen",
    url: "https://gls-group.com/DE/de/home",
  },
  {
    slug: "hermes",
    name: "Hermes (Evri)",
    category: "Versand DACH",
    region: "DE",
    starting: "auf Anfrage",
    rating: 3.0,
    tagline: "Günstig, aber polarisierend",
    pros: ["Günstigster DE-Carrier bei niedrigem Volumen", "B2C-Zustellung an Paketshops"],
    cons: ["Verluste/Verzögerungen häufiger als bei DHL", "Reklamations-Prozess langsam"],
    forumNotes: "r/ecommerce_de: 'Nur für non-fragile + low-value-Ware. Trustpilot-Drift seit 2023 negativ.'",
    signupTime: "1 Woche",
    url: "https://www.hermesworld.com/de/",
  },
  {
    slug: "ups-deutschland",
    name: "UPS",
    category: "Versand DACH",
    region: "DE/EU/global",
    starting: "auf Anfrage",
    rating: 4.1,
    tagline: "Premium für Express + International",
    pros: ["Schnellste Express-Option", "Internationaler Versand top", "Stabile Tracking-Updates"],
    cons: ["Teurer als DHL/DPD bei Standard-Sendungen"],
    signupTime: "1–2 Wochen",
    url: "https://www.ups.com/de/de/business/",
  },

  // ============ BUCHHALTUNG ============
  {
    slug: "lexoffice",
    name: "Lexoffice",
    category: "Buchhaltung",
    region: "DE",
    starting: "11 €/Mon",
    rating: 4.4,
    tagline: "Marktführer, DATEV-Export",
    pros: ["Marktführer in DE für Solo+Klein-GmbH", "DATEV-Export (StB-freundlich)", "Beste Bank-Schnittstellen"],
    cons: ["Komplexere Buchungen erfordern Premium", "Mobile-App schwächer als sevDesk"],
    forumNotes: "r/Selbststaendig: 'Wenn dein StB lexoffice mag, nimm lexoffice. Sonst sevDesk meist günstiger.'",
    signupTime: "Sofort",
    coop: { text: "6 Monate -50 %" },
    url: "https://lexoffice.de",
  },
  {
    slug: "sevdesk",
    name: "sevDesk",
    category: "Buchhaltung",
    region: "DE",
    starting: "9 €/Mon",
    rating: 4.3,
    tagline: "Günstig, gute Mobile-App",
    pros: ["Günstigster ernsthafter DE-Anbieter", "Top Mobile-App", "Belege-Scan via OCR"],
    cons: ["DATEV-Export schwächer als lexoffice", "Größere Teams werden teurer"],
    signupTime: "Sofort",
    url: "https://sevdesk.de",
  },
  {
    slug: "candis",
    name: "Candis",
    category: "Buchhaltung",
    region: "DE",
    starting: "ab 99 €/Mon",
    rating: 4.5,
    tagline: "Rechnungs-Workflow für Teams",
    pros: ["Bester Rechnungs-Approval-Workflow", "Team-Rollen + Freigabe-Ketten", "Top KI-OCR"],
    cons: ["Erst ab Mid-Size sinnvoll (Team ≥ 5)", "Teurer Einstieg"],
    forumNotes: "Mittelstand-Communities: 'Wenn jemand AP-Workflow macht — Candis. Solo-Founder: overkill.'",
    signupTime: "1 Woche",
    url: "https://candis.io",
  },
  {
    slug: "buchhaltungsbutler",
    name: "BuchhaltungsButler",
    category: "Buchhaltung",
    region: "DE",
    starting: "ab 19 €/Mon",
    rating: 4.2,
    tagline: "Automatik-Buchungen",
    pros: ["Hohe Automatisierungs-Quote", "DATEV-konform"],
    cons: ["UX altbacken im Vergleich zu lexoffice"],
    signupTime: "Sofort",
    url: "https://buchhaltungsbutler.de",
  },
  {
    slug: "accountable",
    name: "Accountable",
    category: "Buchhaltung",
    region: "DE",
    starting: "ab 9,50 €/Mon",
    rating: 4.4,
    tagline: "Solo-Selbstständige + Steuerberatung",
    pros: ["Eingebauter Steuerberater-Service (kostenpflichtig)", "Mobile-First", "Übersichtliche UI für Solo"],
    cons: ["Für GmbH eingeschränkt geeignet", "Tax-Service nur als Add-on"],
    forumNotes: "Freelancer-Foren: 'Accountable für Solos top — Steuer-Hilfe ist die killer-Feature. GmbH lieber lexoffice.'",
    signupTime: "Sofort",
    url: "https://www.accountable.de",
  },
  {
    slug: "smartsteuer",
    name: "smartsteuer",
    category: "Buchhaltung",
    region: "DE",
    starting: "ab 39,99 €/Steuerjahr",
    rating: 4.3,
    tagline: "Steuererklärung-Tool (NICHT Buchhaltung) – Add-on",
    pros: ["Geführte Steuererklärung für Selbstständige", "Auch GmbH KSt-Erklärung möglich", "Direkt-ELSTER-Übermittlung"],
    cons: ["Ersetzt KEINE Buchhaltungs-Software – nur Steuererklärung", "Pro Jahr neu kaufen", "Bei komplexen GmbHs StB nötig"],
    forumNotes: "Wichtig: smartsteuer ist Steuer-Tool, nicht Buchhaltung. Stack: lexoffice/sevDesk (laufende Buchhaltung) + smartsteuer (Jahres-Erklärung) + ggf. StB.",
    signupTime: "Sofort",
    url: "https://www.smartsteuer.de",
  },

  // ============ 3PL / FULFILLMENT ============
  {
    slug: "byrd",
    name: "Byrd",
    category: "3PL",
    region: "EU",
    starting: "auf Anfrage",
    rating: 4.4,
    tagline: "EU-weite Lager, Shopify-Integration",
    pros: ["EU-Lager-Netzwerk (DE, AT, NL, FR, ES, IT)", "Shopify/Shopware/WooCommerce-Integration", "Self-Service-Dashboard"],
    cons: ["Storage-Kosten höher als kleine 3PLs", "Ab ~200 Bestellungen/Monat sinnvoll"],
    forumNotes: "r/ecommerce_de + DTC-Slack: 'Estimate ~1,80–2,50 €/Pick + Storage/m³. Onboarding 2–4 Wochen für SKU-Setup.'",
    signupTime: "2–4 Wochen Setup nach Vertrag",
    coop: { text: "0 € Onboarding" },
    url: "https://getbyrd.com",
  },
  {
    slug: "shipbob",
    name: "ShipBob",
    category: "3PL",
    region: "global",
    starting: "auf Anfrage",
    rating: 4.3,
    tagline: "US + EU + UK Lager",
    pros: ["Globales Lager-Netzwerk", "Top für US-Markt-Eintritt von DE aus"],
    cons: ["Min-Volume relativ hoch", "Pricing erst nach Demo"],
    forumNotes: "Estimate r/dropship: '~3,00–4,50 $/Order Pick&Pack US, +Storage. Lohnt ab 500+ Orders/Monat US.'",
    signupTime: "3–6 Wochen Setup",
    url: "https://shipbob.com",
  },
  {
    slug: "fromspace",
    name: "FromSpace",
    category: "3PL",
    region: "DE",
    starting: "auf Anfrage",
    rating: 4.2,
    tagline: "DE-3PL für Mid-Volume D2C",
    pros: ["DE-fokussiert", "Persönlicher Account-Manager"],
    cons: ["Kein globales Netzwerk"],
    signupTime: "2–4 Wochen",
    url: "https://fromspace.io",
  },

  // ============ LUCID / VERPACKUNG ============
  {
    slug: "lizenzero",
    name: "Lizenzero",
    category: "LUCID",
    region: "DE",
    starting: "ab 39 €/Jahr",
    rating: 4.5,
    tagline: "Für kleine Mengen ideal",
    pros: ["Niedrigster Einstiegspreis", "Einfache Anmeldung", "Auch für Marktplatz-Verkäufer"],
    cons: ["Bei hohen Mengen teurer als Reclay"],
    signupTime: "1 Tag",
    url: "https://lizenzero.de",
  },
  {
    slug: "reclay",
    name: "Reclay",
    category: "LUCID",
    region: "DE",
    starting: "auf Anfrage",
    rating: 4.0,
    tagline: "Für hohe Mengen",
    pros: ["Skalierbar bei großem Volumen", "Persönliche Betreuung"],
    cons: ["Min-Volume", "Erst ab größerem Versand-Volumen lohnend"],
    signupTime: "1–2 Wochen",
    url: "https://www.reclay.de",
  },

  // ============ EMAIL / MARKETING ============
  {
    slug: "klaviyo",
    name: "Klaviyo",
    category: "Email",
    region: "global",
    starting: "ab 20 $/Mon",
    rating: 4.7,
    tagline: "Beste E-Com Email-Plattform",
    pros: ["Standard für DTC-Email", "Flow-Builder unschlagbar", "Beste Shopify-Integration"],
    cons: ["Wird teuer ab 20k Subscribers", "Nicht DSGVO-out-of-the-box (Server US)"],
    forumNotes: "DTC-Twitter consensus: 'Klaviyo ist nicht-verhandelbar für E-Com. Alle anderen Tools sind Workarounds.'",
    signupTime: "Sofort",
    url: "https://klaviyo.com",
  },
  {
    slug: "brevo",
    name: "Brevo (ex Sendinblue)",
    category: "Email",
    region: "EU",
    starting: "0 €/Mon",
    rating: 4.2,
    tagline: "Günstig, DSGVO-konform",
    pros: ["EU-Server (DSGVO)", "Free-Tier 300 Mails/Tag", "Pricing transparent"],
    cons: ["Flow-Builder schwächer als Klaviyo", "Templates altbacken"],
    signupTime: "Sofort",
    url: "https://www.brevo.com",
  },

  // ============ TRACKING ============
  {
    slug: "triple-whale",
    name: "Triple Whale",
    category: "Tracking",
    region: "global",
    starting: "ab 129 $/Mon",
    rating: 4.6,
    tagline: "Top Shopify Attribution",
    pros: ["Beste Shopify-First-Party-Attribution", "Klare Dashboards für Founder"],
    cons: ["Teuer für kleine Brands", "Lock-in (Datenexport begrenzt)"],
    forumNotes: "DTC-Slack: 'Ab 50k MRR Pflicht. Drunter zu teuer.'",
    signupTime: "Sofort",
    url: "https://triplewhale.com",
  },
  {
    slug: "hyros",
    name: "Hyros",
    category: "Tracking",
    region: "global",
    starting: "ab 99 $/Mon",
    rating: 4.5,
    tagline: "Server-Side Tracking, Coaching/Info-Ads",
    pros: ["Server-Side-Tracking robust", "Stark bei High-Ticket / Coaching / Info-Products"],
    cons: ["UI komplex", "E-Com weniger Fokus als Triple Whale"],
    signupTime: "Sofort",
    url: "https://hyros.com",
  },

  // ============ SHOP-SYSTEM ============
  {
    slug: "shopify",
    name: "Shopify",
    category: "Shop-System",
    region: "global",
    starting: "39 $/Mon",
    rating: 4.7,
    tagline: "Standard für DTC-Brands",
    pros: ["Größtes App-Ökosystem", "Schnellster Setup", "Skaliert von 0 → Mio Umsatz"],
    cons: ["Transaktionsgebühren ohne Shopify Payments", "Lock-in"],
    signupTime: "Sofort",
    url: "https://shopify.com",
  },
  {
    slug: "shopware",
    name: "Shopware",
    category: "Shop-System",
    region: "DE",
    starting: "0 € (Open Source)",
    rating: 4.3,
    tagline: "DE-Standard, B2B-stark",
    pros: ["DE-Hosting möglich (DSGVO)", "Stark für B2B", "Open Source verfügbar"],
    cons: ["Hosting + Wartung selbst nötig (CE)", "Kleineres App-Ökosystem"],
    signupTime: "Sofort (CE) / 2–4 Wochen (Cloud-Setup)",
    url: "https://www.shopware.com",
  },
];

const CATS = ["Alle", ...Array.from(new Set(PROVIDERS.map((p) => p.category)))];

const Anbieter = () => {
  const [cat, setCat] = useState("Alle");
  const [q, setQ] = useState("");

  const list = useMemo(() => PROVIDERS.filter((p) =>
    (cat === "Alle" || p.category === cat) &&
    (q === "" || (p.name + " " + p.tagline + " " + p.pros.join(" ") + " " + p.cons.join(" ")).toLowerCase().includes(q.toLowerCase()))
  ), [cat, q]);

  return (
    <CockpitShell
      eyebrow="🏆 Anbieter-Vergleichs-Engine"
      title="Die besten Tools – mit verhandelten Coop-Deals"
      subtitle="Top-Anbieter pro Kategorie – mit echten Stärken/Schwächen aus Reddit & E-Com-Foren. Coop-Deals sind echt verhandelt."
    >
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <Input placeholder="Anbieter, Stärke oder Schwäche suchen..." value={q} onChange={(e) => setQ(e.target.value)} className="md:max-w-xs" />
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold border ${
                cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-accent-blue/40"
              }`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((p) => <ProviderCard key={p.slug} p={p} />)}
      </div>

      {list.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">Keine Anbieter gefunden.</div>
      )}
    </CockpitShell>
  );
};

const ProviderCard = ({ p }: { p: Provider }) => (
  <div className="rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-soft transition-all flex flex-col">
    <div className="flex items-start justify-between mb-2 gap-3">
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-wider text-accent-blue">{p.category}</div>
        <h3 className="font-bold text-lg leading-tight">{p.name}</h3>
      </div>
      <div className="flex items-center gap-1 text-xs font-semibold shrink-0">
        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
        {p.rating.toFixed(1)}
      </div>
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{p.tagline}</p>

    {/* Pros / Cons */}
    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
      <div>
        <div className="font-semibold text-success mb-1">+ Stärken</div>
        <ul className="space-y-0.5 text-muted-foreground">
          {p.pros.slice(0, 4).map((s, i) => <li key={i} className="leading-snug">· {s}</li>)}
        </ul>
      </div>
      <div>
        <div className="font-semibold text-destructive mb-1">– Schwächen</div>
        <ul className="space-y-0.5 text-muted-foreground">
          {p.cons.slice(0, 3).map((s, i) => <li key={i} className="leading-snug">· {s}</li>)}
        </ul>
      </div>
    </div>

    {p.forumNotes && (
      <div className="rounded-lg bg-secondary/40 border border-border p-2.5 text-[11px] text-muted-foreground leading-snug mb-3 flex gap-1.5">
        <MessageSquare className="h-3 w-3 mt-0.5 shrink-0 text-accent-blue" />
        <span><em>{p.forumNotes}</em></span>
      </div>
    )}

    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2 gap-2">
      <span>{p.region}</span>
      <span className="font-semibold text-foreground text-right">{p.starting}</span>
    </div>

    {(p.signupTime || p.monthlyMin) && (
      <div className="flex flex-wrap gap-1.5 text-[10px] text-muted-foreground mb-3">
        {p.signupTime && (
          <span className="rounded-full bg-secondary px-2 py-0.5 inline-flex items-center gap-1">
            <Clock className="h-2.5 w-2.5" />{p.signupTime}
          </span>
        )}
        {p.monthlyMin && (
          <span className="rounded-full bg-warning/10 text-warning-foreground border border-warning/30 px-2 py-0.5 inline-flex items-center gap-1">
            <AlertCircle className="h-2.5 w-2.5" />{p.monthlyMin}
          </span>
        )}
      </div>
    )}

    {p.coop && (
      <div className="rounded-xl bg-accent text-accent-foreground p-2.5 text-xs font-semibold mb-3">
        <div className="flex items-start gap-1.5">
          <Tag className="h-3.5 w-3.5 mt-0.5 shrink-0" />
          <div>
            Coop-Deal: {p.coop.text}
            {p.coop.code && <div className="text-[10px] mt-0.5 font-mono opacity-80">Code: {p.coop.code}</div>}
            {p.coop.expires && <div className="text-[10px] mt-0.5 opacity-80">gültig bis {p.coop.expires}</div>}
          </div>
        </div>
      </div>
    )}

    <a href={p.url} target="_blank" rel="noreferrer"
      className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-accent-blue hover:underline">
      Zum Anbieter <ExternalLink className="h-3 w-3" />
    </a>
  </div>
);

export default Anbieter;
