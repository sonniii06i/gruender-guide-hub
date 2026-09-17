// AUTO-GENERIERT aus src/data/playbooks.ts — nicht von Hand aendern.
// Neu erzeugen mit: node scripts/generate-playbook-steps.mjs
//
// Nur Titel, keine Inhalte: die bezahlten Step-Details liegen weiterhin
// ausschliesslich in guide-detail/secure-data.ts.

export interface PlaybookTitel { titel: string; schritte: string[] }

export const PLAYBOOK_TITEL: Record<string, PlaybookTitel> = {
  "gmbh-gruendung": {
    "titel": "GmbH in Deutschland gründen",
    "schritte": [
      "Firmenname, Marken- & Domain-Check",
      "Notartermin vorbereiten – alle Daten sammeln",
      "Notartermin – Mitbringliste",
      "Notartermin – Beurkundung",
      "Geschäftskonto eröffnen (GmbH i.G.)",
      "Stammkapital einzahlen & Bestätigung holen",
      "Handelsregister-Eintrag abwarten",
      "Gewerbeanmeldung",
      "Steuernummer beim Finanzamt (ELSTER-Fragebogen)",
      "Transparenzregister-Eintrag",
      "IHK-Mitgliedschaft & Beitrag",
      "Berufsgenossenschaft + Sozialversicherung"
    ]
  },
  "ug-gruendung": {
    "titel": "UG (haftungsbeschränkt) gründen",
    "schritte": [
      "Firmenname, Marken- & Domain-Check",
      "Stammkapital festlegen",
      "Musterprotokoll oder Individuelle Satzung",
      "Notartermin – Mitbringliste",
      "Notartermin – Beurkundung",
      "Geschäftskonto & 100 % Stammkapital einzahlen",
      "Handelsregister-Eintrag abwarten",
      "Gewerbeanmeldung",
      "Steuerliche Erfassung (ELSTER)",
      "Transparenzregister-Eintrag",
      "25%-Pflichtrücklage einplanen"
    ]
  },
  "einzelunternehmen-gruendung": {
    "titel": "Einzelunternehmen gründen (mit GewA1-PDF + U18-Spezial)",
    "schritte": [
      "Geschäftsidee + Tätigkeit definieren",
      "Freiberufler oder Gewerbe?",
      "Bist du minderjährig (U18)?",
      "Familiengericht-Antrag (NUR wenn U18)",
      "GewA1-Daten erfassen + Vorbereitungs-PDF",
      "Gewerbeamt-Termin / Online-Anmeldung",
      "Steuerliche Erfassung (ELSTER FsE)",
      "Kleinunternehmer-Regel (§19 UStG)?",
      "Geschäftskonto (empfohlen)",
      "Buchhaltung-Setup",
      "IHK-Mitgliedschaft (automatisch)"
    ]
  },
  "holding": {
    "titel": "Holding-Struktur aufbauen",
    "schritte": [
      "Ausgangslage prüfen",
      "Holding-Namen festlegen",
      "Holding GmbH gründen",
      "Anteile operative GmbH einbringen",
      "Ausschüttungspolitik festlegen",
      "Vermögensaufbau in Holding",
      "Exit-Vorbereitung"
    ]
  },
  "kleinunternehmer": {
    "titel": "Kleinunternehmer-Regelung clever nutzen",
    "schritte": [
      "Wichtiger Disclaimer vorweg",
      "Bin ich überhaupt geeignet?",
      "In ELSTER-Fragebogen aktivieren",
      "Rechnungen korrekt ausstellen",
      "Vorsteuer-Falle prüfen",
      "Wechsel zur Regelbesteuerung vorbereiten"
    ]
  },
  "marke-anmelden": {
    "titel": "Marke anmelden + Domain-Check (DPMA / EUIPO / WIPO)",
    "schritte": [
      "Live-Check: Marke + Domain in einem Schritt",
      "Schutzbereich wählen: DE / EU / International",
      "Marken-Typ wählen (Wortmarke / Bildmarke / Wort-Bild / 3D)",
      "Nizza-Klassen wählen + Waren/Dienstleistungs-Liste",
      "Logo-Datei vorbereiten (Bild- / Wort-Bild-Marke)",
      "DPMAdirekt-Anmeldung — Schritt-für-Schritt",
      "Beanstandung / Zwischenbescheid handhaben",
      "Widerspruchsfrist + Strategie bei Konflikt",
      "Internationalisierung via Madrid-System (WIPO)",
      "Eintragung & laufende Pflichten"
    ]
  },
  "shopify-launch": {
    "titel": "Shopify-Brand launchen (DACH-konform + Cost-optimiert)",
    "schritte": [
      "Rechtsform-Entscheidung & Konto",
      "Domain & Brand sichern",
      "Shopify-Account erstellen (Free-Trial nutzen!)",
      "Plan wählen (ERST wenn Shop launch-ready ist)",
      "Pflicht-Settings (DACH-konform) — inkl. Basic Tax",
      "Theme Phase 1: Theme wählen (30 min)",
      "Theme Phase 2: Theme installieren + Logo (30 min)",
      "Theme Phase 3: Hero-Section + Featured-Products (60 min)",
      "Theme Phase 4: Footer + Mobile-Preview (60 min)",
      "Produkte anlegen (manuell oder Import)",
      "Custom-Domain anschließen",
      "Zahlungsanbieter (Shopify Payments + Klarna + PayPal)",
      "Rechtstexte einbinden (Pflicht!)",
      "LUCID Verpackungsregister (Pflicht!)",
      "Versand-Setup: Self-Ship → 3PL → Fulfillment-Network",
      "Tracking & Pixel (DSGVO-konform)",
      "Apps-Stack: Reviews, CRO, Support, Loyalty, Trusted Shops",
      "CRO + International + Buchhaltungs-Sync (Power-Tooling)",
      "Test-Bestellung vor Launch (PFLICHT)",
      "Soft-Launch + erste Ads"
    ]
  },
  "amazon-fba-launch": {
    "titel": "Amazon FBA Brand launchen (DE/EU)",
    "schritte": [
      "Produkt-Recherche (vor allem anderen!)",
      "Brand & Markenanmeldung",
      "Rechtsform & Konto",
      "Lieferanten-Sourcing (Alibaba / 1688 / Made-in-China)",
      "MOQ + Erstbestellung kalkulieren",
      "Pre-Shipment Inspection (QC)",
      "Amazon Seller Central registrieren",
      "Seller-Verifikation abschließen",
      "Amazon Brand Registry beantragen + freischalten",
      "Compliance Pflicht-Basics: EORI + EAN + LUCID + GPSR (für ALLE Produkte)",
      "Compliance Kategorie-Spezifisch: WEEE / BattG / CPNP / Spielzeug / Lebensmittel",
      "Listing + A+ Content + Bilder (CR-Optimierung)",
      "FBA-Versand erstellen",
      "PPC-Launch-Strategie (Phase 0/30/60/90)",
      "Launch-Strategie: Honeymoon + Promotions + Subscribe & Save",
      "Erste Reviews via Vine + Email-Flow",
      "Power-Tooling: Reimbursement, Inventory, Tax, Brand Analytics, DSP",
      "Multi-Channel + External-Traffic + Returns-Reduction",
      "Account Health + Suspension-Recovery-Plan"
    ]
  },
  "kaufland-launch": {
    "titel": "Kaufland Global Marketplace launchen (DE/AT/CZ/SK/PL)",
    "schritte": [
      "Voraussetzungen prüfen",
      "Konditionen + Provisions-Tabelle 2026",
      "Verkäuferkonto registrieren",
      "Produktdaten + Listing-Felder (Mirakl-CSV)",
      "Mirakl-Connector / Plentymarkets / Shopware-Anbindung",
      "Buy-Box-Logik + Repricing-Strategie",
      "Compliance-Anmeldungen",
      "Versand-Setup",
      "Rechnungsstellung & Buchhaltung",
      "Kaufland Sponsored Products + SEO",
      "Tool-Stack: Reviews + Customer-Service + Multi-Marketplace-Sync",
      "Kaufland Global Marketplace: AT/CZ/SK/PL Expansion",
      "Performance-Score + Account-Suspension verhindern"
    ]
  },
  "creator-setup": {
    "titel": "Creator / Influencer Setup (Monetization + Compliance)",
    "schritte": [
      "Freiberufler oder Gewerbe?",
      "Gewerbe-/Steuer-Anmeldung",
      "Kleinunternehmer-Regel prüfen",
      "Separates Geschäftskonto",
      "Plattform-Monetization aktivieren (TikTok / YT / Meta)",
      "TikTok Shop einrichten (Affiliate + Brand)",
      "Affiliate-Programme aktivieren (Amazon / Awin / TradeTracker / impact)",
      "Influencer-Plattformen anmelden (Brand-Deal-Marketplace)",
      "Mediakit + Pricing-Tabelle (nach Follower-Range)",
      "Brand-Deal-Vertragsvorlage",
      "Werbekennzeichnung lernen",
      "KSK prüfen (optional, sehr lukrativ!)",
      "Steuer-Rücklage einrichten"
    ]
  },
  "us-llc": {
    "titel": "US-LLC gründen (Wyoming / Delaware / New Mexico)",
    "schritte": [
      "Bundesstaat wählen",
      "LLC-Name prüfen & reservieren",
      "Registered Agent + US-Mailing-Adresse buchen (Pflicht!)",
      "Articles of Organization einreichen (Secretary of State Initial Filing)",
      "EIN beim IRS beantragen",
      "Operating Agreement aufsetzen",
      "BOI-Report bei FinCEN (Pflicht!)",
      "US-Bankkonto eröffnen",
      "Bookkeeping-Setup (QuickBooks / Xero / Wave)",
      "Sales-Tax Nexus prüfen (US-Verkäufe)",
      "Estimated Tax (1040-ES) bei US-Source-Einkommen",
      "ITIN beantragen (optional)",
      "Form 5472 + Pro-Forma 1120 (Pflicht!)",
      "Annual Report (jährlich)",
      "DE-steuerliche Behandlung klären",
      "LLC auflösen (Dissolution)"
    ]
  },
  "us-accounts-deutscher": {
    "titel": "US-Accounts als Deutscher: Amazon, Amex, TikTok Shop & Target",
    "schritte": [
      "Fundament-Check: Welche US-Bausteine brauchst du wirklich?",
      "US-Entity wählen: Single-Member-LLC vs. C-Corporation",
      "EIN ohne SSN beantragen (Form SS-4 per Fax)",
      "US-Adresse & US-Telefonnummer einrichten",
      "US-Business-Banking eröffnen (Payoneer / Wise / Mercury)",
      "ITIN beantragen (Form W-7 via Certifying Acceptance Agent)",
      "Steuer-Setup: W-8BEN-E, Form 5472 & die DE-Betriebsstätten-Falle",
      "Amazon.com Seller-Account + Identity-Video-Call bestehen",
      "US-American-Express via Global Card Relationship",
      "TikTok Shop US (C-Corp + echter US-Representative)",
      "Target.com (Käufer) & Target Plus Marketplace (Seller)"
    ]
  },
  "hk-limited": {
    "titel": "Hong Kong Limited gründen (mit Substanz + Tax-Optimierung)",
    "schritte": [
      "Firmennamen prüfen",
      "Company Secretary engagieren (Pflicht!)",
      "Registered Address",
      "Incorporation einreichen (Form NNC1)",
      "Significant Controllers Register (SCR) anlegen",
      "Business Registration Certificate (Inland Revenue)",
      "HK-Bankkonto eröffnen",
      "Two-Tiered Profits Tax + Offshore-Status",
      "Audited Accounts vorbereiten",
      "Annual Return (NAR1) einreichen",
      "Director Salary + BIR60 / IR56B (Salaries Tax)",
      "MPF (Mandatory Provident Fund) bei HK-Mitarbeitern",
      "DE-Besteuerung klären (CFC + Substanz)",
      "HK-Limited auflösen (Striking Off / Deregistration)"
    ]
  },
  "dsgvo-shop": {
    "titel": "DSGVO + AGB + Impressum + Widerruf für Online-Shop",
    "schritte": [
      "Pflicht-Check: Was du brauchst",
      "Impressum erstellen",
      "Datenschutzerklärung + Cookie-Banner",
      "AGB (Allgemeine Geschäftsbedingungen)",
      "Widerrufsbelehrung + Muster-Widerrufsformular",
      "Auftragsverarbeitungs-Verträge (AVV) Art. 28 DSGVO",
      "Abmahn-Vermeidung + Abmahn-Schutz"
    ]
  },
  "gpsr-compliance": {
    "titel": "GPSR-Compliance (EU 2023/988) — Pflicht seit 13.12.2024",
    "schritte": [
      "Scope-Check: Welche Produkte fallen drunter",
      "EU Responsible Person bestimmen (Art. 16)",
      "Technische Dokumentation (Art. 9 + Anhang I)",
      "Risk Assessment durchführen",
      "Recall + Krisen-Management aufsetzen",
      "Marketplace-Implikationen (Amazon / Kaufland / eBay / Etsy)"
    ]
  },
  "oss-anmeldung": {
    "titel": "OSS-Anmeldung (One-Stop-Shop) für EU-grenzüberschreitende Verkäufe",
    "schritte": [
      "Schwelle prüfen + Anwendbarkeit",
      "OSS-Antrag beim BZSt einreichen",
      "EU-USt-Sätze + korrekte Berechnung pro Land",
      "Marketplace-Facilitator-Rule (kritisch!)",
      "Quartals-OSS-Meldung einreichen",
      "Retouren + Korrekturen via OSS",
      "Häufige Probleme + Lösungen"
    ]
  },
  "pan-eu-fba": {
    "titel": "Pan-EU FBA Setup (Amazon DE → 7-Länder-Skalierung)",
    "schritte": [
      "Pan-EU vs. EFN vs. CEE — Welcher Modus?",
      "USt-Registrierungen in EU-Ländern (Pan-EU-Pflicht)",
      "Lager-Aktivierung + Inventory-Verteilung",
      "Listing-Übersetzungen für 6 Sprachen",
      "Compliance + Listing-Pflichten pro Land",
      "USt-Filings konsolidieren (vermeide Country-by-Country)"
    ]
  },
  "tiktok-shop-launch": {
    "titel": "TikTok Shop Brand-Launch (DACH/EU)",
    "schritte": [
      "Voraussetzungen Brand-Seller",
      "Seller Center Registrierung",
      "Produkt-Listings + Kategorisierung",
      "Shop-Tab + Profil-Optimierung",
      "Live-Shopping einrichten + Strategie",
      "Affiliate-Programm aktivieren",
      "TikTok Ads + Spark Ads Skalierung",
      "Tool-Stack: Live-Shopping + Compliance + Customer-Service + Analytics"
    ]
  },
  "email-marketing-stack": {
    "titel": "Email-Marketing-Stack aufbauen (Klaviyo / MailerLite / Brevo)",
    "schritte": [
      "Tool-Auswahl: Klaviyo vs. MailerLite vs. Brevo vs. AC",
      "Shop-Integration + Daten-Sync",
      "Welcome-Flow Phase 1: Trigger + Discount-Code-Setup (60 min)",
      "Welcome-Flow Phase 2: Email 1 — Welcome + Discount (60 min)",
      "Welcome-Flow Phase 3: Email 2-4 — Nurturing (90 min)",
      "Welcome-Flow Phase 4: Email 5-7 — Edu + Lifestyle + Newsletter-Übergang (90 min)",
      "Welcome-Flow Phase 5: Test + Go-Live (30 min)",
      "Cart-Abandonment-Flow",
      "Post-Purchase-Flow + Review-Anfrage",
      "Win-Back-Flow + Inaktive-Reaktivierung",
      "Deliverability + DSGVO-Compliance",
      "SMS-Marketing + List-Building + Segmentation + A/B-Testing"
    ]
  },
  "buchhaltung-setup": {
    "titel": "Buchhaltungs-Setup: Lexoffice vs. sevDesk vs. DATEV",
    "schritte": [
      "Tool-Auswahl: Lexoffice vs. sevDesk vs. DATEV",
      "Bank-Konto-Sync einrichten",
      "Rechnungs-Workflow + e-Rechnungs-Pflicht ab 2025",
      "Marketplace-Integration (Amazon / Shopify / eBay)",
      "StB-Schnittstelle + Hand-off",
      "GoBD-Compliance + Verfahrensdokumentation"
    ]
  },
  "wegzugsbesteuerung": {
    "titel": "Wegzugsbesteuerung §6 AStG vermeiden — Strategien für DE-Auswanderer",
    "schritte": [
      "§6 AStG Scope-Check: Bin ich betroffen?",
      "Steuer-Berechnung: was kommt auf mich zu?",
      "Wegzugsteuer in 7 Jahresraten zahlen (§6 Abs. 4 AStG)",
      "Stundung Drittland (CH / UK / US): 7-Jahres-Raten",
      "Holding-Restrukturierung VOR Wegzug",
      "Substanz im Zielland aufbauen",
      "Beliebte Wegzug-Routen + ihre Eigenheiten"
    ]
  },
  "mitarbeiter-beteiligung": {
    "titel": "Mitarbeiter-Beteiligung: Virtual Stock vs. ESOP vs. echte Anteile",
    "schritte": [
      "Vehikel-Wahl: Virtual Stock vs. ESOP vs. echte Anteile",
      "ESOP/VSOP-Pool definieren",
      "Vesting-Schedule + Cliff",
      "Anteils-Bewertung (Strike Price / Hurdle)",
      "Steuerliche Optimierung §19a EStG (Zukunftsfinanzierungsgesetz)",
      "Dokumentation + Templates",
      "Exit-Handling + Auszahlung"
    ]
  },
  "co-founder-agreement": {
    "titel": "Co-Founder-Agreement: Equity-Split + Vesting + Conflict-Resolution",
    "schritte": [
      "Equity-Split: wer bekommt wieviel %?",
      "Founder-Vesting + Cliff (Standard 4y/1y)",
      "Rollen + Entscheidungs-Mechanismus",
      "Exit-Szenarien + Drag/Tag-Along",
      "Konflikt-Resolution + Mediation",
      "IP-Übertragung + Confidentiality",
      "Anwalts-Hand-off + Notar"
    ]
  },
  "foerderung-stipendium": {
    "titel": "Förderungs-Stack: KfW + EXIST + INVEST + Bundesländer",
    "schritte": [
      "Förder-Landschaft DE 2026 — Übersicht",
      "EXIST-Gründerstipendium (Pre-Seed-Killer)",
      "KfW-StartGeld (Wachstums-Kredit bis 125k €)",
      "INVEST (BAFA): Business-Angel-Zuschuss 20-25 %",
      "Regional: Bundesländer-Stipendien (Berlin / NRW / BY / HH / BW)",
      "HTGF + EIC Accelerator (Premium-Funding)",
      "Antrags-Strategie + häufige Fehler"
    ]
  },
  "vc-pitch-deck": {
    "titel": "VC-Runde vorbereiten: Pitch-Deck + Term-Sheet + Cap-Table + Datenraum",
    "schritte": [
      "Runden-Strategie: Pre-Seed / Seed / Series A?",
      "Pitch-Deck (12 Standard-Slides)",
      "Cap-Table sauber führen (Carta / Ledgy)",
      "Datenraum vorbereiten",
      "Investoren-Liste + Outreach-Plan",
      "Term-Sheet: was zu verhandeln, was zu akzeptieren",
      "Closing + Investor-Onboarding"
    ]
  },
  "performance-marketing-stack": {
    "titel": "Performance-Marketing-Stack: Meta + TikTok + Google + Tracking",
    "schritte": [
      "Ad-Accounts richtig aufsetzen (Business Manager)",
      "Meta-Pixel Phase 1: Pixel erstellen + Domain verifizieren (45 min)",
      "Meta-Pixel Phase 2: Pixel-Code installieren (30-60 min)",
      "Meta-Pixel Phase 3: Standard + Custom Events (60 min)",
      "Meta-Pixel Phase 4: Conversions API (CAPI) — Server-Side (90 min)",
      "Meta-Pixel Phase 5: Event Match Quality optimieren (45 min)",
      "Meta-Pixel Phase 6: Test + Go-Live (30 min)",
      "TikTok Pixel + Events API",
      "GA4 Phase 1: Property + Data Stream anlegen (30 min)",
      "GA4 Phase 2: Google Tag Manager Setup (45 min)",
      "GA4 Phase 3: Enhanced Ecommerce-Events (60 min)",
      "GA4 Phase 4: Server-Side-GTM (sGTM) — optional (120 min)",
      "GA4 Phase 5: Audiences + Conversions definieren (45 min)",
      "GA4 Phase 6: Consent Mode v2 + Test (60 min)",
      "Attribution-Tool (Triple Whale / Northbeam / Polar)",
      "Reporting-Cadence + KPI-Dashboard",
      "Creative-Stack + Production-Pipeline",
      "Google Ads: Search-Kampagnen + Shopping-Foundation",
      "Performance Max Grundgerüst: Setup + Asset Groups + Signals",
      "Performance Max Optimierung: Brand-Exclusions + Search Themes + Bidding",
      "Alternative Channels: Pinterest + Reddit + LinkedIn + Native + CTV"
    ]
  },
  "hiring-erste-10": {
    "titel": "Hiring der ersten 10 Mitarbeiter — Recruiting + Verträge + Onboarding",
    "schritte": [
      "Rolle definieren + Job-Spec schreiben",
      "Recruiting-Channels: wo finden ich Bewerber",
      "ATS einrichten (Personio / Recruitee / Workable)",
      "Interview-Prozess + strukturierte Bewertung",
      "Arbeitsvertrag rechtssicher aufsetzen",
      "Probezeit + Kündigungsschutz-Recht",
      "Strukturiertes Onboarding (90 Tage Plan)"
    ]
  },
  "cashflow-forecasting": {
    "titel": "Cashflow-Forecasting: 13-Wochen-Plan + Burn-Rate + Runway",
    "schritte": [
      "13-Wochen-Cashflow-Plan (Pflicht-Tool)",
      "Burn-Rate + Net Burn berechnen",
      "Runway berechnen + Trigger-Werte",
      "Szenarien-Modellierung (Best/Base/Worst)",
      "Cost-Levers + Notfall-Plan",
      "Investoren-Reporting + Transparenz"
    ]
  },
  "insurance-stack": {
    "titel": "Insurance-Stack für Startups: D&O + Cyber + Produkthaft + BU",
    "schritte": [
      "Risiko-Analyse: was muss versichert werden?",
      "Produkthaftpflicht (Pflicht für physische Produkte)",
      "Cyber-Versicherung (Datenleck + Ransomware)",
      "D&O (Directors & Officers) — Manager-Haftung",
      "Berufsunfähigkeits-Versicherung (BU) — Privat-Pflicht",
      "Berufshaftpflicht (für Beratungs-Tätigkeiten)",
      "Inhaltsversicherung + Geschäftsraum",
      "Versicherungs-Broker vs. DIY"
    ]
  },
  "logistik-3pl": {
    "titel": "Logistik-Skalierung: Self-Ship → 3PL → Multi-Warehouse",
    "schritte": [
      "Phase 1: Self-Ship (0–500 Bestellungen/Mon)",
      "Phase 2: 3PL-Partner wählen (500-5.000 Bestellungen/Mon)",
      "Internationaler Versand: EU + UK + USA",
      "Retoure-Management aufsetzen",
      "WMS / ERP-Integration für Skalierung",
      "Logistik-KPIs + Monitoring"
    ]
  },
  "seo-ecommerce": {
    "titel": "SEO für E-Commerce: Technical + Content + Schema + Backlinks",
    "schritte": [
      "Technical SEO: Foundation",
      "Keyword-Research + Content-Strategie",
      "Schema-Markup für Rich Results",
      "Content-Creation: Pillar + Cluster-Strategie",
      "Backlink-Aufbau (Off-Page SEO)",
      "Local SEO + International SEO",
      "AI-SEO + GEO + E-E-A-T + Programmatic SEO (2026 Modern Stack)"
    ]
  },
  "b2b-saas-spezifika": {
    "titel": "B2B-SaaS: Pricing + Customer-Success + Enterprise-Sales",
    "schritte": [
      "Pricing-Strategie + Tier-Design",
      "Stripe Grundgerüst: Account + Products + Subscriptions + Webhooks",
      "Stripe Rechnungserstellung: Tax + Invoicing + Dunning",
      "MRR-Metrics + SaaS-KPIs",
      "Customer-Success-Process aufsetzen",
      "Enterprise-Sales: MEDDIC + Procurement + Verträge",
      "Expansion-Revenue: Upsell + Cross-Sell + Pricing-Increases",
      "Retention + Churn-Prevention"
    ]
  },
  "patente-schutzrechte": {
    "titel": "Patente + Gebrauchsmuster + Designs (gewerbliche Schutzrechte)",
    "schritte": [
      "Welches Schutzrecht für was?",
      "Patent-Recherche (Stand der Technik)",
      "Patent-Anmeldung: DE / EP / WIPO",
      "Gebrauchsmuster: Schnell-Schutz für Tech",
      "Design (Geschmacksmuster) anmelden",
      "Patent-Anwalt vs. DIY",
      "Verteidigung + Durchsetzung gegen Plagiate"
    ]
  },
  "ma-sell-side": {
    "titel": "M&A Sell-Side: Exit vorbereiten + Käufer finden + Verhandeln + Closing",
    "schritte": [
      "Exit-Readiness-Audit",
      "Unternehmens-Bewertung + Pricing-Range",
      "M&A-Berater + Team aufbauen",
      "Käufer-Liste + Outreach-Strategie",
      "Due Diligence (DD) durchstehen",
      "Letter of Intent (LOI) / Term Sheet",
      "SPA-Verhandlung + Closing",
      "Post-Closing: Earn-Out + Integration + Founder-Transition"
    ]
  },
  "crowdfunding-token": {
    "titel": "Alternative Financing: Crowdfunding + Token-Launch (DACH/EU)",
    "schritte": [
      "Modell-Wahl: Equity-CF vs. Reward-CF vs. Token",
      "Equity-Crowdfunding (Companisto / Seedmatch)",
      "Reward-Crowdfunding: Kickstarter / Indiegogo",
      "Token-Launch unter MiCAR (EU-Lizenz Pflicht)",
      "Compliance: VermAnlG + WpHG + MiCAR",
      "Post-Funding-Management: Investor-Reporting + Community"
    ]
  },
  "elster-fse-fillout": {
    "titel": "ELSTER FsE-Walkthrough: Fragebogen zur steuerlichen Erfassung DIY",
    "schritte": [
      "ELSTER-Konto erstellen",
      "Sektion 1: Stamm-Daten + Anschrift",
      "Sektion 2: Bezeichnung der Tätigkeit ⚠️ KRITISCH",
      "Sektion 3: Gewinnermittlung + Voraussichtlicher Gewinn ⚠️ Vorauszahlungs-Hebel",
      "Sektion 4: Umsatzsteuer ⚠️ Strategische Wahl",
      "Sektion 5: Bankverbindung + SEPA-Mandat",
      "Sektion 6: Lohnsteuer + Beratung",
      "Sektion 7: Beteiligungen + Zusatz-Anlagen",
      "Sektion 8: Versicherung + Submit",
      "Nach Einreichung: Steuernummer + USt-ID + erste Pflichten",
      "Top-Stolperfallen + Wie vermeiden"
    ]
  },
  "brand-owner-d2c-setup": {
    "titel": "Brand-Owner / D2C: Komplett-Setup für eigene Brand",
    "schritte": [
      "Brand-Owner-Fit prüfen: passt das Modell zu dir?",
      "Rechtsform + ggf. Holding-Struktur",
      "IP-Schutz: Marke + Design + ggf. Patent",
      "Produkt-Compliance je Kategorie",
      "Shop-Stack: Shopify oder WooCommerce",
      "Amazon als zusätzlicher Channel: PL-Research + Brand-Registry",
      "Buchhaltung + Steuer-Setup",
      "Marketing-Stack: Performance + Email + SEO",
      "Logistik: Self-Ship → 3PL → Multi-Warehouse",
      "Skalierung: International + Hiring + Insurance",
      "Customer-Stack: CRM + Customer-Service + Loyalty + Subscriptions",
      "Top-Pitfalls Brand-Owner"
    ]
  },
  "reseller-marketplace-setup": {
    "titel": "Reseller / Marketplace-Arbitrage: Komplett-Setup",
    "schritte": [
      "Reseller vs. Brand-Owner: passt Reseller zu dir?",
      "Rechtsform-Wahl Reseller",
      "Kleinunternehmer-Trap bei Reseller",
      "Marketplace-Setup: Amazon, eBay, Kaufland, idealo",
      "OSS-Anmeldung + EU-USt-Strategie",
      "Warenwirtschaft wählen (Tool-Entscheidung)",
      "Billbee Phase 1: Account + Firmendaten (30 min)",
      "Billbee Phase 2: Amazon verbinden (60-90 min)",
      "Billbee Phase 3: eBay + Kaufland + eigener Shop (je 30-60 min)",
      "Billbee Phase 4: Produkt-Stammdaten konsolidieren (1-2h)",
      "Billbee Phase 5: Versand-Setup (60-90 min)",
      "Billbee Phase 6: Buchhaltung-Integration (30-60 min)",
      "Billbee Phase 7: Automatisierung + Customer-Service (60 min)",
      "Billbee Phase 8: End-to-End-Test + Go-Live (60 min)",
      "Billbee Routine: wöchentlich + monatlich",
      "Repricer für Amazon aufsetzen",
      "Versand-Stack einrichten",
      "Prep-Center + Returns-Workflow",
      "Source-Diversifikation: Großhandel, Liquidation, Importe",
      "Amazon-Arbitrage-Tooling: Sourcing-Decisions in Sekunden",
      "Cashflow + Inventar-Management",
      "Customer-Stack: Multi-Marketplace-Support + Reviews + Returns",
      "Top-Pitfalls Reseller"
    ]
  },
  "agency-services-setup": {
    "titel": "Agency / Service-Business: Founder-Setup",
    "schritte": [
      "Solo-Freelance vs. Agency vs. Productized-Service",
      "Rechtsform-Wahl Agency",
      "Service-Verträge + AGB",
      "Pricing-Modelle: Hour, Project, Retainer, Performance",
      "PM + Time-Tracking + Communication-Stack",
      "Subunternehmer + Freelancer (Scheinselbstständigkeit-Falle)",
      "Customer-Acquisition: Outbound + Referrals + Inbound",
      "Skalierung: Productize → Hiring → Sub-Brands",
      "CRM + Sales-Stack: Pipeline + Outbound + Proposal + Invoice",
      "Top-Pitfalls Agency"
    ]
  },
  "creator-influencer-setup": {
    "titel": "Creator / Influencer / Affiliate: Founder-Setup",
    "schritte": [
      "Hobby vs. Gewerbe vs. Freiberuf-Klassifikation",
      "Rechtsform: NICHT voreilig anmelden",
      "Werbekennzeichnung Pflicht (MStV + UWG)",
      "Kleinunternehmer-Trap bei Equipment-Investments",
      "Sponsoring-Verträge mit Brands",
      "Plattform-Stack: TikTok, Instagram, YouTube, X, LinkedIn",
      "Affiliate-Setup: Awin, Amazon, Direct-Brands",
      "Steuer-Pitfalls Creator (Geschenke + Sample-Tax)",
      "Skalierung: Eigenes Produkt + Media-Buying",
      "Creator-Stack: Brand-CRM + Content-Production + Email-Liste + Analytics + Community",
      "Top-Pitfalls Creator"
    ]
  },
  "coach-experte-setup": {
    "titel": "Coach / Experte / Online-Kurse: Founder-Setup",
    "schritte": [
      "Coach vs. Consultant vs. Online-Kurs vs. Mastermind",
      "Rechtsform + Freiberufler-Check",
      "FernUSG-Falle: Online-Kurse mit Lehrziel = ZFU-Pflicht",
      "Kurs-Plattform-Wahl: Elopage, Kajabi, ablefy, Coachy",
      "AGB + Widerruf (B2C vs B2B)",
      "Pricing-Modelle: 1:1, Group, Course, Membership",
      "Launch-Funnel: Webinar / Email-Sequenz / Live-Launch",
      "Customer-Success + Refund-Strategie",
      "Skalierung: Group-Programs + Affiliate + Lizenzen",
      "Coach-Stack: CRM + Webinar + Community + Booking + Onboarding",
      "Top-Pitfalls Coach/Experte"
    ]
  },
  "freiberufler-anmelden": {
    "titel": "Freiberufler / Freelancer anmelden",
    "schritte": [
      "Bist du wirklich Freiberufler? (§ 18 EStG)",
      "ELSTER-Konto + Fragebogen zur steuerlichen Erfassung",
      "Kleinunternehmer-Regelung: ja oder nein?",
      "Künstlersozialkasse (KSK) prüfen",
      "Berufshaftpflicht abschließen",
      "Erste Rechnung – Pflichtangaben",
      "EÜR-Buchhaltung aufsetzen"
    ]
  },
  "gbr-gruenden": {
    "titel": "GbR mit Mitgründer gründen",
    "schritte": [
      "Verstehen: Haftung mit Privatvermögen",
      "GbR-Vertrag aufsetzen (schriftlich!)",
      "Gewerbeanmeldung pro Gesellschafter",
      "Finanzamt: Steuernummer + gesonderte Feststellung",
      "Gemeinsames Geschäftskonto",
      "Roadmap zur UG/GmbH-Umwandlung"
    ]
  },
  "restaurant-eroeffnen": {
    "titel": "Restaurant / Gastronomie eröffnen",
    "schritte": [
      "Konzept, Standort & Businessplan",
      "Rechtsform wählen (UG/GmbH dringend empfohlen)",
      "Gaststättenkonzession beantragen (§ 2 GastG)",
      "Hygiene-Schulung IfSG § 43 (Gesundheitsamt)",
      "TSE-Kasse einrichten (Pflicht!)",
      "GEMA & Künstlersozialabgabe anmelden",
      "Personal anmelden + Allergen-Kennzeichnung"
    ]
  },
  "handwerk-gruenden": {
    "titel": "Handwerksbetrieb gründen (HWK)",
    "schritte": [
      "Anlage A oder B? (Meisterpflicht prüfen)",
      "Falls kein Meister: Alternativen prüfen",
      "Eintragung in die Handwerksrolle (HWK)",
      "Gewerbeanmeldung (NACH HWK-Eintragung!)",
      "Berufsgenossenschaft anmelden (BG BAU / BGHM)",
      "Betriebshaftpflicht + Werkzeug-Versicherung",
      "Einkaufs-Konditionen aufbauen"
    ]
  },
  "immobilien-gmbh": {
    "titel": "Immobilien-GmbH (vv-GmbH) gründen",
    "schritte": [
      "Strategie: Bestandshalter vs. Trader",
      "Satzung mit reinem Vermögensverwaltungs-Zweck",
      "GmbH-Gründung (Standard-Prozess)",
      "Banken für Immo-Finanzierung gewinnen",
      "Ankaufs-Prozess + Notar",
      "Buchhaltung mit AfA + Erhaltungsaufwand",
      "Erweiterte Kürzung jährlich prüfen & dokumentieren"
    ]
  },
  "ag-gruenden": {
    "titel": "AG (Aktiengesellschaft) gründen",
    "schritte": [
      "Ist die AG wirklich sinnvoll? GmbH vs. AG",
      "Gründungsdokumente vorbereiten",
      "Grundkapital aufbringen (mind. 50.000 €)",
      "Notarielle Beurkundung",
      "Externe Gründungsprüfung (bei Sachgründung / Sondervorteilen)",
      "Handelsregister-Eintragung",
      "Aktienregister + erste Hauptversammlung"
    ]
  },
  "verein-gug": {
    "titel": "Verein (e.V.) oder gemeinnützige UG (gUG) gründen",
    "schritte": [
      "e.V. vs. gUG entscheiden",
      "Satzung mit gemeinnützigen Zwecken (§ 52 AO)",
      "Gründungsversammlung (e.V.) oder Notar (gUG)",
      "Eintragung Vereinsregister / Handelsregister",
      "Anerkennung der Gemeinnützigkeit beim Finanzamt",
      "Spendenquittungen ausstellen"
    ]
  },
  "unternehmenskauf": {
    "titel": "Bestehendes Unternehmen kaufen (Nachfolge)",
    "schritte": [
      "Zielunternehmen finden",
      "LOI / Absichtserklärung + NDA",
      "Due Diligence (commercial / financial / legal / tax)",
      "Asset Deal vs. Share Deal entscheiden",
      "Kaufpreis-Finanzierung strukturieren",
      "Kaufvertrag (SPA / APA) + Notar",
      "Closing + 100-Tage-Plan"
    ]
  },
  "meta-ads-setup": {
    "titel": "Meta Ads Manager: Setup bis zur ersten Kampagne",
    "schritte": [
      "Phase 1: Business Manager anlegen (20 min)",
      "Phase 2: Facebook-Page + Instagram-Account verknüpfen (15 min)",
      "Phase 3: Pixel + Conversions API (45-90 min)",
      "Phase 4: Domain-Verifizierung + Aggregated Event Measurement (30 min)",
      "Phase 5: Werbekonto + Zahlungsmethode (15 min)",
      "Phase 6: Custom Audiences + Lookalikes (60 min)",
      "Phase 7: Erste Conversion-Kampagne erstellen (45 min)",
      "Phase 8: Publish + Review-Check (15 min)"
    ]
  },
  "klaviyo-setup": {
    "titel": "Klaviyo: Setup bis Welcome-Flow Live",
    "schritte": [
      "Phase 1: Klaviyo-Account anlegen (15 min)",
      "Phase 2: Shop-Integration (30 min)",
      "Phase 3: Sender-Domain + DKIM/SPF/DMARC (45 min)",
      "Phase 4: Liste + DSGVO-Opt-In + Pop-Up (45 min)",
      "Phase 5: Welcome-Flow erstellen (90-120 min)",
      "Phase 6: Test + Go-Live (30 min)"
    ]
  },
  "google-ads-merchant-console-setup": {
    "titel": "Google Ads + Merchant Center + Search Console: Komplett-Setup",
    "schritte": [
      "Phase 1: Google Ads-Konto erstellen (20 min)",
      "Phase 2: Conversion-Tracking + Google-Tag (45 min)",
      "Phase 3: Google Merchant Center (60 min)",
      "Phase 4: Google Search Console + Sitemap (30 min)",
      "Phase 5: Google Ads ↔ Merchant Center verknüpfen (10 min)",
      "Phase 6: Erste Search-Kampagne (Brand-Defense, 30 min)",
      "Phase 7: Performance Max + Publishen (45 min)"
    ]
  },
  "seo-step-by-step": {
    "titel": "SEO Step-by-Step: Von Setup bis Top-3-Rankings",
    "schritte": [
      "Phase 1: Foundation (1-2h)",
      "Phase 2: Technical SEO (3-5h)",
      "Phase 3: Keyword-Research (4-6h)",
      "Phase 4: Content-Plan + Pillar/Cluster (8-12h)",
      "Phase 5: On-Page-Optimization (2-3h pro Artikel)",
      "Phase 6: Schema-Markup (2-3h)",
      "Phase 7: Backlink-Outreach (laufend, 4h/Woche)",
      "Phase 8: Monitoring + Optimization (wöchentlich, 2-3h)"
    ]
  },
  "tiktok-ads-setup": {
    "titel": "TikTok Ads: Setup bis zur ersten Kampagne",
    "schritte": [
      "Phase 1: TikTok Business Center anlegen (15 min)",
      "Phase 2: TikTok Pixel + Events API (60 min)",
      "Phase 3: Werbekonto + Zahlung (15 min)",
      "Phase 4: Custom Audiences + Lookalikes (45 min)",
      "Phase 5: Creative für Spark Ads vorbereiten (60 min)",
      "Phase 6: Erste Conversion-Kampagne (30 min)",
      "Phase 7: Publish + Review-Check (15 min)"
    ]
  },
  "creator-tiktok-instagram": {
    "titel": "Creator-Track: TikTok + Instagram (Short-Form)",
    "schritte": [
      "Niche + Format wählen (Pre-Posting)",
      "Account-Setup (Brand-Konsistenz)",
      "Content-Routine: 4-Tage-Posting-Rhythmus",
      "Algo-Mechanik 2026 (was wirklich pusht)",
      "Monetarisierung: 5 Pfade (in dieser Reihenfolge)",
      "Skalierung: eigene Brand vs Multi-Channel"
    ]
  },
  "creator-youtube-longform": {
    "titel": "Creator-Track: YouTube + Long-Form-Content",
    "schritte": [
      "Niche + Series-Strategie",
      "Equipment + Production-Quality",
      "YouTube-SEO + Thumbnails (CTR-Hebel)",
      "AdSense-Monetarisierung + Mid-Roll-Strategy",
      "Sponsoring auf YouTube (höchste Pro-Sub-Revenue)",
      "YouTube Shorts als Funnel zu Long-Form"
    ]
  },
  "creator-twitter-reddit": {
    "titel": "Creator-Track: Twitter (X) + Reddit (Text/Community)",
    "schritte": [
      "X (Twitter) Strategy: Threads + Insights + Community",
      "Reddit Strategy: Subreddit-Authority statt Self-Promo",
      "Newsletter als Monetarisierungs-Backbone",
      "X-Monetarisierung 2026: Subscriptions + Creator-Revenue-Share",
      "Build-in-Public-Strategie (X-spezifisch)"
    ]
  },
  "creator-pinterest": {
    "titel": "Creator-Track: Pinterest (Search + Inspiration)",
    "schritte": [
      "Pinterest-Fit: Welche Brands/Topics passen?",
      "Pinterest Business-Account + Rich Pins",
      "Pin-Strategy: Standard + Idea + Video",
      "Pinterest-SEO: Keywords + Boards-Hierarchy",
      "Pinterest-Monetarisierung: Affiliate + Eigener Shop + Sponsoring"
    ]
  },
  "coach-1-on-1": {
    "titel": "Coach-Track: 1:1-Coaching (Hour-based, Premium)",
    "schritte": [
      "Pricing + Klienten-Profil definieren",
      "Booking-System + Coaching-Vertrag",
      "FernUSG-Falle: bei 1:1 meistens NICHT relevant",
      "Rechtsform: Freiberufler-Status möglich",
      "Skalierung: 1:1 → Group oder Course"
    ]
  },
  "coach-group-mastermind": {
    "titel": "Coach-Track: Group-Coaching / Mastermind",
    "schritte": [
      "Programm-Format + Pricing",
      "FernUSG: bei Group-Programmen KRITISCH",
      "Community-Platform: Skool / Circle / Mighty Networks",
      "Launch + Sales-Pipeline",
      "Delivery-Cadence + Klienten-Erfolg"
    ]
  },
  "coach-online-course": {
    "titel": "Coach-Track: Online-Course-Creator (Self-Paced)",
    "schritte": [
      "FernUSG: bei Online-Kursen FAST IMMER Pflicht",
      "Kurs-Plattform: DACH vs International",
      "Kurs-Aufbau + Module-Struktur",
      "AGB + Widerruf + Datenschutz",
      "Launch-Funnel: Webinar / Live-Launch / Evergreen"
    ]
  },
  "coach-membership": {
    "titel": "Coach-Track: Membership / Community (Recurring)",
    "schritte": [
      "Membership-Modell: Content vs Community vs Hybrid",
      "Plattform: Skool / Circle / Mighty Networks",
      "FernUSG: bei Membership weniger streng (meist)",
      "Content-Cadence + Member-Engagement",
      "Churn + Retention-Optimierung"
    ]
  },
  "crowdfunding-equity": {
    "titel": "Crowdfunding-Track: Equity (Companisto / Seedmatch)",
    "schritte": [
      "Plattform: Companisto vs Seedmatch",
      "VIB/WIB-Pflicht-Dokumente",
      "Kampagnen-Marketing + Pre-Launch-Audience",
      "Pooling-Vehicle für VC-Compatibility (Pflicht-Schritt)",
      "Post-Funding: Investor-Reporting + Cashflow"
    ]
  },
  "crowdfunding-reward": {
    "titel": "Crowdfunding-Track: Reward (Kickstarter / Indiegogo)",
    "schritte": [
      "Plattform: Kickstarter vs Indiegogo vs Startnext",
      "Pre-Launch-Audience: 5-50k Email-Subs aufbauen",
      "Reward-Tier-Strategie + Stretch-Goals",
      "Post-Campaign: Backerkit + Fulfillment-Strategie",
      "Post-Launch: Brand-Shop launchen"
    ]
  },
  "crowdfunding-token-launch": {
    "titel": "Crowdfunding-Track: Token-Launch (MiCA-konform EU)",
    "schritte": [
      "MiCAR-Applicability: Welche Token-Klasse?",
      "White-Paper + BaFin-Notification",
      "KYC/AML + Custody-Provider",
      "Marketing in EU: streng reguliert",
      "Alternative: Non-EU-Launch (Schweiz, Singapur)"
    ]
  },
  "hiring-festanstellung": {
    "titel": "Hiring-Track: Festanstellung (Vollzeit-Mitarbeiter)",
    "schritte": [
      "Recruiting + Stellenausschreibung",
      "Arbeitsvertrag (KSchG-konform)",
      "Sozialversicherungs-Anmeldung",
      "Probezeit + KSchG-Schutz",
      "Onboarding-Process (30/60/90)",
      "Trennung / Kündigung sauber"
    ]
  },
  "hiring-freelancer": {
    "titel": "Hiring-Track: Freelancer (Werkvertrag / Dienstvertrag)",
    "schritte": [
      "Werkvertrag (§631 BGB) — rechtssicher",
      "Scheinselbstständigkeit-Falle vermeiden",
      "Rechnungsstellung + USt-Behandlung",
      "Pool-Aufbau: 3-5 pro Skill-Set"
    ]
  },
  "hiring-minijob-werkstudent": {
    "titel": "Hiring-Track: Minijob + Werkstudent (Flexible Beschäftigung)",
    "schritte": [
      "Minijob: 603€/Mon (Stand 2026)",
      "Werkstudent-Status (max 20h/Woche)",
      "Midijob-Zone (603,01-2.000 €/Mon)",
      "Wann Minijob/Werkstudent vs Festanstellung?"
    ]
  },
  "amazon-brand-registry": {
    "titel": "Amazon Marke freischalten (Brand Registry)",
    "schritte": [
      "Voraussetzungen prüfen",
      "Marke & Produktbilder vorbereiten",
      "Marke einreichen & Verifizierung",
      "Nach Freischaltung: Marken-Tools nutzen"
    ]
  },
  "amazon-transparency": {
    "titel": "Amazon Transparency einrichten",
    "schritte": [
      "Voraussetzungen",
      "Produkte im Transparency anmelden",
      "Codes bestellen & anbringen"
    ]
  },
  "weee-registrierung": {
    "titel": "WEEE-Registrierung (ElektroG / stiftung ear)",
    "schritte": [
      "Ist dein Produkt ein Elektrogerät?",
      "Bei der stiftung ear registrieren",
      "WEEE-Nr. hinterlegen & laufende Pflichten"
    ]
  },
  "amazon-produkt-anlegen": {
    "titel": "Eigenes Produkt anlegen (Amazon)",
    "schritte": [
      "GTIN/EAN besorgen",
      "Andocken oder neu anlegen?",
      "Keyword-Recherche (bevor du schreibst)",
      "Listing-Inhalte erstellen",
      "Angebot setzen & Compliance",
      "Launch & Conversion-Boost"
    ]
  },
  "reseller-freischaltung": {
    "titel": "Marke/Kategorie zum Reselling freischalten (Ungating)",
    "schritte": [
      "Prüfen, was überhaupt gesperrt ist",
      "Distributor-Rechnung beschaffen (das A und O)",
      "Echtheit: Transparency-Codes / Seriennummern / Fotos",
      "Antrag pro Marktplatz stellen & nachfassen"
    ]
  },
  "dac7": {
    "titel": "DAC7 – Plattform-Meldepflicht meistern",
    "schritte": [
      "Was DAC7 ist und wen es betrifft",
      "Schwellen & Ausnahmen kennen",
      "Daten bereitstellen, wenn die Plattform fragt"
    ]
  },
  "amazon-verkaeuferkonto-setup": {
    "titel": "Amazon-Verkäuferkonto komplett einrichten",
    "schritte": [
      "Konto anlegen & verifizieren",
      "Steuer- & USt-Einstellungen",
      "Automatische Rechnungserstellung",
      "Bankdaten & Konto absichern",
      "Versandeinstellungen (FBM)",
      "Retouren, Remission & Entsorgung",
      "Impressum & Rechtstexte hinterlegen",
      "Länder steuern & Urlaubsmodus",
      "Erstes Produkt anlegen & Fälle erstellen"
    ]
  },
  "kaufland-produkt-anlegen": {
    "titel": "Produkt anlegen auf Kaufland Marketplace",
    "schritte": [
      "Seller-Portal-Antrag & Freischaltung",
      "Produkt anlegen (EAN-Match oder neu)",
      "Angebot, Bestand & Versand",
      "Compliance (LUCID, WEEE, USt)"
    ]
  },
  "otto-produkt-anlegen": {
    "titel": "Produkt anlegen auf OTTO Market",
    "schritte": [
      "Voraussetzungen & Bewerbung",
      "Partner Connect & technische Anbindung",
      "Produkt anlegen (datenstark)",
      "Service-Level & Compliance"
    ]
  },
  "erste-webseite-seo": {
    "titel": "Erste Webseite & organisch sichtbar werden",
    "schritte": [
      "Webseite/Shop bauen + Tools wählen",
      "Technische SEO-Basis",
      "On-Page-SEO (Inhalte, die ranken)",
      "Google Search Console & Sitemap",
      "Indexierung prüfen & überwachen",
      "Local, Analytics & Tool-Stack"
    ]
  },
  "eigene-app-launchen": {
    "titel": "Eigene App entwickeln & in App Store + Play Store launchen",
    "schritte": [
      "App-Idee validieren & Store-Recherche",
      "Tech-Stack entscheiden: Nativ, Cross-Platform oder No-Code",
      "MVP definieren & App-Design",
      "App entwickeln: selbst, mit KI oder Agentur",
      "Backend, Accounts & DSGVO-Grundlagen",
      "Apple Developer Account anlegen (99 $/Jahr)",
      "Google Play Console Account (25 $ einmalig)",
      "Monetarisierung: Abo, In-App-Kauf, Ads oder Paid",
      "Rechtstexte: Datenschutzerklärung, Impressum, AGB/EULA",
      "App Store Connect: Listing, Screenshots & Privacy-Labels",
      "Play Console: Store-Eintrag, Data Safety & Content-Rating",
      "Beta-Test: TestFlight + Play-Testing (Pflicht bei Google!)",
      "Apple App Review bestehen (häufigste Ablehnungsgründe)",
      "Google Play Review + gestaffelter Rollout",
      "Launch & ASO: organisch gefunden werden",
      "Post-Launch: Analytics, Crash-Monitoring & Update-Rhythmus",
      "Steuern & Buchhaltung: Apple/Google-Auszahlungen richtig buchen"
    ]
  }
};

/**
 * Titel des Schritts, an dem der Lauf gerade steht.
 *
 * `current_step` ist ein NULLBASIERTER Index auf den OFFENEN Schritt —
 * PlaybookRun.tsx setzt damit direkt den aktiven Index (`setActiveIndex`).
 *
 * Verlass dich NICHT darauf, dass der Index am Ende ueber die Liste
 * hinauslaeuft: beim Abschluss des letzten Schritts wird er auf
 * `min(index + 1, steps.length - 1)` geklemmt und bleibt damit auf dem
 * letzten Schritt stehen. Ob ein Lauf fertig ist, sagt allein `status`
 * (`completed` / `done`) — niemals die Zahl.
 */
export function naechsterSchritt(slug: string, currentStep: number): string | null {
  const p = PLAYBOOK_TITEL[slug];
  if (!p) return null;
  return p.schritte[currentStep] ?? null;
}
