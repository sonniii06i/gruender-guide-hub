// Labor-Anbieter für DE/EU Brand-Founder — Stand Mai 2026
// Recherche-Quellen: Labor-Websites direkt, DAkkS-Akkreditierungs-Register, OEKO-TEX, FEDIAF, BfR

export type TestCategory =
  | "cosmetic"
  | "food"
  | "supplement"
  | "petfood"
  | "rohs"
  | "reach"
  | "ce_emv"
  | "battery"
  | "toys"
  | "textile"
  | "packaging"
  | "pfas";

export type LaborTier = "tier1" | "spezialist" | "boutique";

export type Labor = {
  id: string;
  name: string;
  shortName: string;
  url: string;
  country: string;
  city: string;
  tier: LaborTier;
  testCategories: TestCategory[];
  accreditation: string[];
  specialties: string[];
  preise: string;
  lieferzeit: string;
  minVolume?: string;
  onlinePortal?: string;
  bekanntheit: string;
  bestFor: string[];
  watchouts: string[];
  topPick?: boolean;
};

export const LABORE: Labor[] = [
  // ===== TIER-1 GENERALISTEN =====
  {
    id: "eurofins",
    name: "Eurofins Scientific Deutschland",
    shortName: "Eurofins",
    url: "https://www.eurofins.de",
    country: "DE/Global",
    city: "Hamburg + 150 EU-Standorte",
    tier: "tier1",
    testCategories: ["cosmetic", "food", "supplement", "petfood", "rohs", "reach", "textile", "packaging"],
    accreditation: ["ISO 17025 (DAkkS)", "GMP", "GLP"],
    specialties: [
      "CPSR via Eurofins Cosmetics & Personal Care Division",
      "Mikrobio nach ISO 11930, USP <61>/<62>",
      "Stabilität (3/6/12 Monate, accel. 40°C/75%RH)",
      "Pet-Food FEDIAF voll",
      "Tox-Assessment durch interne Toxikologen",
    ],
    preise: "CPSR ab 349€ · Standard-Tests 150-500€ · Multi-Test-Pakete 800-3.500€",
    lieferzeit: "Standard 10-15 WT · Mikrobio 5-10 WT · Express 2-3 Tage (+50%)",
    onlinePortal: "Eurofins Apps (Web-Portal, Tracking, Ergebnis-Download)",
    bekanntheit: "Marktführer DE/EU — Default-Pick für Multi-Test",
    bestFor: ["Cosmetic CPSR All-in-One", "Multi-Vendor-Konsolidierung", "Skalierende Brands"],
    watchouts: [
      "Lieferzeit länger als Boutique-Labore",
      "Single-Tests teurer als Spezialisten",
      "Account-Management bei kleinen Volumen mau",
      "Multi-Site-Inkonsistenz: Tests laufen je nach Auslastung an verschiedenen Standorten → bei rezeptursensitiven Brands Standort vorgeben",
    ],
    topPick: true,
  },
  {
    id: "sgs_germany",
    name: "SGS Germany GmbH",
    shortName: "SGS",
    url: "https://www.sgs.com/de-de",
    country: "DE (HQ Genf)",
    city: "Hamburg, Taunusstein, München",
    tier: "tier1",
    testCategories: ["cosmetic", "food", "supplement", "petfood", "rohs", "reach", "ce_emv", "battery", "textile", "toys", "packaging"],
    accreditation: ["ISO 17025 (DAkkS, 400+ Methoden HH)", "IECEE CB Scheme", "CB Test Laboratory IEC 62133"],
    specialties: [
      "28 RoHS-Labore weltweit",
      "REACH-SVHC-Screening (240+ Stoffe)",
      "UN 38.3 + IEC 62133 Batterie-Tests via SGS-CQE",
      "SGS proderm (Schenefeld) für Kosmetik-klinik",
      "Hamburg-Lebensmittellabor seit 2003",
    ],
    preise: "RoHS ab 150-300€/Material · REACH SVHC 500-1.500€ · UN 38.3 ca. 3.000-8.000€/Batterie",
    lieferzeit: "Standard 10-15 Tage · Express möglich",
    onlinePortal: "SGS RSTS Cloud (eecloud.sgs.com für RoHS/REACH-Reports)",
    bekanntheit: "Tier-1 weltweit, gleichauf mit Eurofins",
    bestFor: ["Elektronik mit Funk", "Multi-Kategorie-Brand", "Batterie-Versand-Compliance"],
    watchouts: [
      "Service-Qualität schwankt je Standort",
      "Preisverhandlung wichtig bei Volumen",
    ],
    topPick: true,
  },
  {
    id: "intertek_de",
    name: "Intertek Deutschland",
    shortName: "Intertek",
    url: "https://www.intertek.de",
    country: "DE/Global",
    city: "Fürth (Consumer Goods), Leinfelden",
    tier: "tier1",
    testCategories: ["cosmetic", "food", "supplement", "petfood", "rohs", "ce_emv", "toys", "textile", "packaging"],
    accreditation: ["ISO 17025 (DAkkS)", "ACCREDIA (IT)", "NRTL (OSHA, US)", "FCC", "UKAS"],
    specialties: [
      "Standort Fürth ist Consumer-Goods-Hub Europa",
      "FEDIAF + AAFCO Pet-Food Bewertung",
      "CPSR-Erstellung (toxikologisch)",
      "Globaler Marktzugang USA/CA via NRTL",
    ],
    preise: "CPSR 400-1.200€ · RoHS 200-400€/Material · FEDIAF-Bewertung 600-1.500€",
    lieferzeit: "Standard 10-15 Tage",
    onlinePortal: "Intertek Total Quality Assurance Customer Portal",
    bekanntheit: "Top-3 weltweit",
    bestFor: ["FBA-Brands (US+EU parallel)", "Multi-Markt-Pet-Food"],
    watchouts: ["Sehr formell, mehr für Mittelstand+ als Startups"],
  },
  {
    id: "bureau_veritas",
    name: "Bureau Veritas Consumer Products Services Germany",
    shortName: "Bureau Veritas",
    url: "https://www.bureauveritas.de",
    country: "DE/Global",
    city: "Nürnberg (ECL European Compliance Lab)",
    tier: "tier1",
    testCategories: ["cosmetic", "food", "supplement", "petfood", "rohs", "ce_emv", "toys", "textile", "packaging"],
    accreditation: ["DAkkS ISO 17025", "DKD-K", "DIN EN ISO 9001"],
    specialties: [
      "Volle Tier-1-Breite",
      "ECL (European Compliance Lab) Nürnberg für CE-EU-Zugang",
      "Sehr stark in CPSIA (USA) für FBA-USA-Brands",
    ],
    preise: "Vergleichbar zu Eurofins/SGS/Intertek",
    lieferzeit: "Standard 10-15 Tage",
    bekanntheit: "Top-4 weltweit",
    bestFor: ["FBA-Brands mit US+EU-parallel-Launch", "Konsumgüter-Importeure"],
    watchouts: ["Etwas weniger DE-Marktpräsenz als die anderen Tier-1"],
  },

  // ===== CE / ELEKTRONIK SPEZIALISTEN =====
  {
    id: "tuv_sud",
    name: "TÜV SÜD Product Service",
    shortName: "TÜV SÜD",
    url: "https://www.tuvsud.com",
    country: "DE",
    city: "München, Garching, Straubing",
    tier: "spezialist",
    testCategories: ["rohs", "reach", "ce_emv", "battery", "toys"],
    accreditation: ["ISO 17025 (DAkkS)", "Notified Body 0123", "IECEE CB Scheme", "GS-Zeichen"],
    specialties: [
      "Garching-Battery-Lab für UN 38.3 + IEC 62133",
      "Spielzeug nach EN 71-1/2/3/8/14",
      "GS-Zeichen-Erteilung (Spielzeug, Konsumgüter)",
      "Neue EU Toy Regulation 2025/2509 ab 1.1.2026 Implementierung",
    ],
    preise: "EN 71-3 Migration 250-500€/Test · CE-EMV-Paket 3.000-8.000€ · UN 38.3 ca. 5.000-10.000€",
    lieferzeit: "3-6 Wochen für komplette CE/Spielzeug-Pakete",
    onlinePortal: "TÜV SÜD Customer Portal",
    bekanntheit: "DE-Marktführer für GS-Zeichen + Spielzeug",
    bestFor: ["Spielzeug-Brand (EN 71 + GS-Mark)", "Batterie-Compliance", "Premium-Tech mit GS-Anspruch"],
    watchouts: [
      "Preis-Premium gegenüber China-Boutique-Labors (oft 3-5x)",
      "Lieferzeiten saisonal lang vor Weihnachts-Launches",
    ],
    topPick: true,
  },
  {
    id: "tuv_rheinland",
    name: "TÜV Rheinland",
    shortName: "TÜV Rheinland",
    url: "https://www.tuv.com",
    country: "DE",
    city: "Köln HQ, Nürnberg, Berlin",
    tier: "spezialist",
    testCategories: ["rohs", "reach", "ce_emv", "battery", "toys", "textile"],
    accreditation: ["ISO 17025 (DAkkS)", "Notified Body 0197", "CB Scheme", "OEKO-TEX-Partner-Labor"],
    specialties: [
      "EN 71-1/2/8/14 Mechanik+Brennbarkeit",
      "GS-Zeichen Konkurrent zu TÜV SÜD",
      "Wissenschaftliche Zertifizierung Dermatest (langjährig)",
      "Sehr breites Konsumgüter-Portfolio",
    ],
    preise: "Vergleichbar zu TÜV SÜD · EN 71-Vollpaket 1.500-4.000€",
    lieferzeit: "3-6 Wochen Standard",
    bekanntheit: "Tier-1 DE für Konsumgüter",
    bestFor: ["Spielzeug+Textil-Brand", "Asien-Brands für EU-Markteintritt"],
    watchouts: ["Häufig Sub-Vergabe an Eurofins/SGS für Chemie-Tests"],
  },
  {
    id: "dekra_testing",
    name: "DEKRA Testing and Certification GmbH",
    shortName: "DEKRA",
    url: "https://www.dekra.de",
    country: "DE",
    city: "Stuttgart, Saarbrücken, Arnsberg",
    tier: "spezialist",
    testCategories: ["ce_emv", "rohs", "battery"],
    accreditation: ["ISO 17025 (DAkkS)", "Notified Body 0158", "CB Scheme", "ATEX/IECEx"],
    specialties: [
      "EMV-Hochvolt bis 1000V, 150kW, 300A",
      "RoHS-Prüfung umfassend",
      "ENEC + CENELEC + KEMA-KEUR",
      "Stark in Automotive-Komponenten",
    ],
    preise: "EMV-Paket 2.500-7.000€ · RoHS-Single 200-400€",
    lieferzeit: "Standard 3-6 Wochen",
    bekanntheit: "Tier-1 DE für Automotive + Industrie",
    bestFor: ["Pro-Elektronik (E-Mobility, Industrie)", "Automotive-Zulieferer"],
    watchouts: [
      "Kein Cosmetic/Food-Programm",
      "Eher B2B-Hardware-Fokus, nicht Consumer-Boutique",
    ],
  },
  {
    id: "cetecom_advanced",
    name: "cetecom advanced GmbH",
    shortName: "cetecom",
    url: "https://cetecomadvanced.com",
    country: "DE",
    city: "Saarbrücken, Essen, Hamburg",
    tier: "spezialist",
    testCategories: ["ce_emv"],
    accreditation: ["ISO 17025 (DAkkS)", "FCC TCB", "ISED Canada", "MIC Japan", "Notified Body"],
    specialties: [
      "ETSI EN 300 328 (2.4 GHz WiFi/Bluetooth) full",
      "EN 301 893 (5 GHz), EN 300 220 (SRD)",
      "RED 2014/53/EU End-to-End",
      "Globale Funk-Zulassung (USA, KR, JP, IN)",
    ],
    preise: "RED-Vollpaket (EMV+Radio+LVD) 8.000-18.000€ · Single EN 300 328 ca. 3.500-6.000€",
    lieferzeit: "4-8 Wochen für Vollpaket",
    bekanntheit: "DE-Spezialist Nr. 1 für Funk-Zulassung",
    bestFor: ["IoT/Wearables/Audio-Brands mit BLE/WiFi", "Brands mit globalem Launch (US+EU+APAC)"],
    watchouts: [
      "Backlog vor Q4 Launches lang",
      "Nicht für reine RoHS-Chemie-Tests",
    ],
    topPick: true,
  },
  {
    id: "phoenix_testlab",
    name: "Phoenix Testlab GmbH",
    shortName: "Phoenix Testlab",
    url: "https://www.phoenix-testlab.de",
    country: "DE",
    city: "Blomberg (NRW)",
    tier: "spezialist",
    testCategories: ["ce_emv"],
    accreditation: ["DAkkS ISO 17025 (D-PL-17186-01-00)", "EMC Notified Body"],
    specialties: [
      "EMC Notified Body Status",
      "Hyundai/Kia akkreditiert (Automotive)",
      "Sehr breit für LVD 2014/35/EU (IT + Industrie)",
      "EMV inkl. Luftfahrt + Bahn",
    ],
    preise: "Vergleichbar zu cetecom (CE-EMV 3.000-8.000€)",
    lieferzeit: "3-6 Wochen",
    bekanntheit: "Industrie-Standard, weniger D2C",
    bestFor: ["Industrie-Elektronik-Brands", "B2B-Geräte"],
    watchouts: [
      "Weniger Funk-Spezialist als cetecom",
      "Weniger D2C-Brand-Erfahrung",
    ],
  },
  {
    id: "element",
    name: "Element Materials Technology",
    shortName: "Element",
    url: "https://www.element.com",
    country: "DE/Global",
    city: "Hamburg, Mülheim, Stuttgart, Berlin, Straubing",
    tier: "spezialist",
    testCategories: ["ce_emv"],
    accreditation: ["DAkkS ISO 17025", "NADCAP (Aerospace)"],
    specialties: [
      "Straubing für EMV + Wireless",
      "Berlin für Aerospace (Vibration, Spin, Fatigue)",
      "Hamburg/Mülheim für Materials-Testing (Metall, Schweiß)",
      "Stark in Vibration/Drop/Shock für FBA-Versand",
    ],
    preise: "Vibration/Drop-Paket 1.500-4.500€ · EMV ähnlich cetecom",
    lieferzeit: "3-6 Wochen",
    bekanntheit: "Materials-Spezialist + EMV-Nische",
    bestFor: ["FBA-Brands die Verpackungs-Robustheit testen wollen", "Hardware-Startups"],
    watchouts: [
      "Kein Konsumgüter-Boutique-Service",
      "Kein Cosmetic/Food",
    ],
  },

  // ===== KOSMETIK-SPEZIALISTEN =====
  {
    id: "bav_institut",
    name: "BAV Institut Hygiene und Qualitätssicherung GmbH",
    shortName: "BAV Institut",
    url: "https://www.bav-institut.de",
    country: "DE",
    city: "Offenburg",
    tier: "boutique",
    testCategories: ["cosmetic", "food"],
    accreditation: ["ISO 17025 (DAkkS)", "GMP-Inspektion"],
    specialties: [
      "Eines der größten Mikrobio-Auftragslabore DE",
      "Erstellt ~100 CPSRs/Monat",
      "Konservierungsbelastungstest (KBT) nach ISO 11930",
      "Vollständiger Stabilitätstest (3/6/12 Monate, accel. 40/75)",
      "Tox-Bewertung durch internes Team",
    ],
    preise: "KBT/Challenge ISO 11930: 350-600€ · Mikrobio-Standard: 80-150€ · Stabilität 12 Mon.: 1.500-3.500€ · CPSR: 400-900€",
    lieferzeit: "Mikrobio 7-10 Tage · KBT 4-5 Wochen · CPSR 2-4 Wochen",
    bekanntheit: "Boutique-Marktführer DACH für Indie-Skincare",
    bestFor: ["Indie-Skincare-Brands DACH", "Bootstrap-Founder mit Skincare", "Cosmacon-Partner-Labor"],
    watchouts: [
      "Wartezeit bei Stabilität wegen Test-Dauer (nicht Labor-Backlog)",
      "Weniger Marketing-Power als Eurofins",
      "Kein modernes Online-Portal (Email/Excel-basiert)",
    ],
    topPick: true,
  },
  {
    id: "dermatest",
    name: "Dermatest GmbH",
    shortName: "Dermatest",
    url: "https://dermatest.com",
    country: "DE",
    city: "Münster",
    tier: "boutique",
    testCategories: ["cosmetic"],
    accreditation: ["TÜV Rheinland zertifiziert", "ISO 17025 (für ausgewählte Methoden)"],
    specialties: [
      "Original-Dermatest-Siegel (sehr gut / 5-Sterne)",
      "Epikutantest (Patch-Test) 24h-Modell",
      "Safety-in-Use-Studien",
      "Probanden-Pool für In-Vivo-Verträglichkeitstests",
      "Auch für NEMs + Consumer Goods",
    ],
    preise: "Patch-Test (20-30 Probanden): 1.500-3.500€ · Anwendungstest 4 Wochen: 4.000-8.000€ · Siegel-Lizenz inkl.",
    lieferzeit: "4-8 Wochen für In-Vivo",
    bekanntheit: "DAS 'Dermatologisch getestet'-Siegel DACH",
    bestFor: ["Skincare-Brand mit 'dermatologisch getestet'-Claim", "Premium-Positionierung mit Siegel"],
    watchouts: [
      "Siegel-Vergabe kein Test-Surrogat — viele NEMs nutzen es als reines Marketing",
      "Öko-Test bewertet Siegel-Qualität gemischt",
      "Nur In-Vivo, keine Mikrobio/Schwermetall-Chemie",
      "Belegt Verträglichkeit, NICHT Wirksamkeit",
    ],
    topPick: true,
  },
  {
    id: "sgs_proderm",
    name: "SGS proderm",
    shortName: "SGS proderm",
    url: "https://sgs-proderm.de",
    country: "DE",
    city: "Schenefeld bei Hamburg",
    tier: "boutique",
    testCategories: ["cosmetic"],
    accreditation: ["ISO 17025", "GCP", "GLP"],
    specialties: [
      "European Center of Excellence Dermatology (seit 2024 SGS-Branding)",
      "6.500 aktive Probanden, 10.000 Studien/Jahr",
      "28 Jahre Erfahrung",
      "Patch-Test, Anwendungstest, Effektmessungen (Cutometer, TEWL, Corneometer)",
      "50+ Pre-Qualified externe Test-Sites",
    ],
    preise: "Klinik-Studie 5.000-25.000€ je nach Endpoint-Komplexität · Patch-Test 2.500-5.000€",
    lieferzeit: "6-12 Wochen für klinische Studien",
    bekanntheit: "Goldstandard für klinische Skincare-Studien EU",
    bestFor: ["Premium-Skincare mit wissenschaftlichem Claim (Anti-Aging-Messdaten)", "Medical-Skincare für Apotheken"],
    watchouts: [
      "Premium-Preis, nicht für Bootstrap-Brands",
      "Lange Lead-Times",
    ],
  },
  {
    id: "cosmacon",
    name: "Cosmacon GmbH",
    shortName: "Cosmacon",
    url: "https://www.cosmacon.de",
    country: "DE",
    city: "Schenefeld bei Hamburg",
    tier: "boutique",
    testCategories: ["cosmetic"],
    accreditation: ["Auftragslabor (kein eigenes Akkreditierungs-Setup)"],
    specialties: [
      "Eher Auftragsentwickler+Vertragshersteller als pures Labor",
      "Batch-Größen 3kg-10t skalierbar",
      "30 Jahre Erfahrung Rainer Kröpke",
      "Sourct Mikrobio/Stabilität extern, koordiniert aber Founder-friendly",
    ],
    preise: "Rezeptur-Entwicklung 3.000-15.000€ · CPSR-Vermittlung 500-1.500€ · Production 5-15€/Unit ab MOQ",
    lieferzeit: "Entwicklung 8-16 Wochen",
    bekanntheit: "Indie-Brand-Entwickler-Hub DACH",
    bestFor: ["D2C-Founder OHNE Rezeptur, der ein Full-Service-Setup will", "Private-Label-Start mit Naturkosmetik"],
    watchouts: [
      "Kein Labor sondern Entwickler — Tests laufen über Partner (BAV/Eurofins)",
      "Lock-in-Risiko bei Rezeptur-Ownership",
    ],
  },
  {
    id: "imq_labor",
    name: "IMQ Labor",
    shortName: "IMQ Labor",
    url: "https://imq-labor.de",
    country: "DE",
    city: "Düsseldorf",
    tier: "boutique",
    testCategories: ["cosmetic"],
    accreditation: ["Regierungspräsidium Düsseldorf seit 1995 (Pharma-Permission)", "GMP", "ISO 17025"],
    specialties: [
      "Mikrobiologie-Boutique mit Pharma-Hintergrund",
      "ISO 11930 Konservierungsbelastungstest",
      "USP/Ph.Eur. Mikrobio",
      "Auch für Verpackungsmaterial",
    ],
    preise: "Vergleichbar zu BAV · Challenge-Test 350-600€ · Mikrobio 80-150€",
    lieferzeit: "4-5 Wochen für ISO 11930",
    bekanntheit: "Pharma-Apotheken-Standard",
    bestFor: ["Pharma-nahe Skincare (Apothekenmarken)", "Founder mit Pharma-Standard-Anspruch"],
    watchouts: [
      "Keine Stabilitätskammer in der Breite wie BAV",
      "Kleineres Portfolio",
    ],
  },

  // ===== LEBENSMITTEL / SUPPLEMENT / PET-FOOD =====
  {
    id: "agrolab",
    name: "AGROLAB Group",
    shortName: "AGROLAB",
    url: "https://agrolab.com",
    country: "DE/EU",
    city: "Kiel-LUFA, Bruckberg, Sarstedt",
    tier: "spezialist",
    testCategories: ["food", "supplement", "petfood"],
    accreditation: ["ISO 17025 (DAkkS)", "QS-anerkannt", "GMP+", "GLOBALG.A.P."],
    specialties: [
      "Pestizid-Gold-Package: 500+ Wirkstoffe via GC-MSD + LC-MS/MS",
      "Mykotoxine (DON, ZON, OTA, Aflatoxine)",
      "Schwermetalle (Pb, Cd, Hg, As)",
      "Heimtiernahrung-Spezial-Division",
      "Sehr stark in Bulk-Rohstoff-Prüfung",
    ],
    preise: "Pestizid-Gold 250-450€ · Schwermetalle 80-200€ · Mykotoxine 150-300€ · FEDIAF-Nährwert-Komplett 400-900€",
    lieferzeit: "5-10 Werktage Standard",
    bekanntheit: "DE-Marktführer Lebensmittel + Pet-Food-Bulk",
    bestFor: ["Supplement-Brands mit eigener Bulk-Beschaffung", "Pet-Food D2C", "Bio-Lebensmittel"],
    watchouts: [
      "Kein Kosmetik-Programm",
      "Mehr Auftrags-Pricing für Volumen, weniger Boutique",
    ],
    topPick: true,
  },
  {
    id: "tentamus",
    name: "Tentamus Group",
    shortName: "Tentamus",
    url: "https://www.tentamus.com",
    country: "DE/Global",
    city: "Berlin HQ, Münster, München (90+ Labore weltweit)",
    tier: "spezialist",
    testCategories: ["food", "supplement", "cosmetic", "petfood"],
    accreditation: ["ISO 17025 (DAkkS)", "ISO 17020", "GMP, GLP, GCP"],
    specialties: [
      "Hybrid aus Lebensmittel + Supplement + Kosmetik + Pharma",
      "Tentamus Pharma & Med für klinische Studien-Support",
      "BILACON (Tentamus-Tochter) für Hygiene/Mikrobio",
      "Health-Claims-Belege für Supplement-Brands",
    ],
    preise: "Mikrobio 100-200€ · Nährwertanalyse 150-300€ · HPLC-Wirkstoff 200-450€ · Stabilität ähnlich BAV",
    lieferzeit: "10-15 Werktage Standard",
    onlinePortal: "Tentamus Customer Portal",
    bekanntheit: "Multi-Kategorie-Mittelständler",
    bestFor: ["Supplement-Brands mit Health-Claim-Strategie", "Multi-Kategorie-Brand (Supplement + Beauty-from-Within)"],
    watchouts: [
      "Schnelle Akquisitions-getriebene Struktur — Subsidiary-Qualität schwankt",
      "Kein eigener Boutique-Charme wie BAV",
    ],
  },
  {
    id: "romer_labs",
    name: "Romer Labs",
    shortName: "Romer Labs",
    url: "https://www.romerlabs.com",
    country: "AT/Global",
    city: "Tulln (AT) + Singapur, UK, USA",
    tier: "spezialist",
    testCategories: ["food", "supplement", "petfood"],
    accreditation: ["ISO 17025", "ISO 9001"],
    specialties: [
      "Mykotoxin-Globalmarktführer (DSM-Tochter)",
      "LC-MS/MS für 50+ Mykotoxine in einem Run",
      "Referenzmaterialien-Hersteller (eigene Standards)",
      "Allergen-Tests via Schnelltests + Labor",
    ],
    preise: "Mykotoxin-Multi-Screening 250-500€ · Aflatoxin-Einzeltest 80-150€",
    lieferzeit: "Max 5 Werktage",
    minVolume: "1kg unzermahlen / 0,5kg fein gemahlen",
    bekanntheit: "Mykotoxin-Marktführer weltweit",
    bestFor: ["Supplement-Brands mit Pflanzenextrakten (Mariendistel, Kurkuma)", "Bio-Müsli/Granola-Brands", "Tierfutter aus Getreide"],
    watchouts: [
      "Single-Topic-Lab — kein One-Stop-Shop",
      "Lieferung nach AT (kein DE-Speed-Vorteil)",
    ],
  },
  {
    id: "gba_group",
    name: "GBA Group",
    shortName: "GBA Group",
    url: "https://www.gba-group.com",
    country: "DE",
    city: "Pinneberg HQ, Hamburg, Geestland",
    tier: "spezialist",
    testCategories: ["food", "supplement", "pfas", "packaging"],
    accreditation: ["ISO 17025 (DAkkS)", "GMP", "GLP", "BfR-Kontaktlabor"],
    specialties: [
      "Pestizide + Schwermetalle Lebensmittel",
      "Dioxine/Furane + perfluorierte Verbindungen (PFAS)",
      "3.000m² Pinneberg-Standort",
      "Food-Tochter TeLA (Geestland)",
    ],
    preise: "Pestizid-Multi 200-400€ · PFAS-Target 350-700€ · Schwermetalle 80-180€",
    lieferzeit: "5-12 Werktage",
    bekanntheit: "PFAS- + Schwermetall-Spezialist DACH",
    bestFor: ["Brands die PFAS-Belastung in Rohstoffen prüfen wollen (US-Bans!)", "Lebensmittel-Importeure aus Nicht-EU"],
    watchouts: [
      "Eher B2B-Industrie als Founder-friendly",
      "Online-Portal weniger ausgereift als Eurofins",
    ],
  },

  // ===== TEXTIL =====
  {
    id: "hohenstein",
    name: "Hohenstein Group",
    shortName: "Hohenstein",
    url: "https://www.hohenstein.com",
    country: "DE",
    city: "Bönnigheim (BW)",
    tier: "spezialist",
    testCategories: ["textile", "pfas"],
    accreditation: ["ISO 17025 (DAkkS)", "OEKO-TEX-Mitgliedsinstitut + Mitbegründer (1992)"],
    specialties: [
      "OEKO-TEX STANDARD 100 (Originator)",
      "MADE IN GREEN, RESPONSIBLE BUSINESS, ECO PASSPORT",
      "PFAS-Tests via alkalische Hydrolyse (Methodenupdate seit 1.10.2024)",
      "Neue OEKO-TEX-Regulations 1.6.2026 Compliance",
      "Hautsensorik-Studien (Wear-Trials)",
    ],
    preise: "OEKO-TEX 100 Single-Artikelklasse 800-2.500€ + 200€/Jahresgebühr · USA $6.500 Ø · PFAS-Single 350-700€",
    lieferzeit: "3-6 Wochen für Standard 100 · Vorabprüfung 2 Wochen",
    onlinePortal: "Hohenstein Customer Center",
    bekanntheit: "OEKO-TEX-Erfinder, DAS Textil-Label",
    bestFor: ["Apparel-Brand mit Schadstoff-Claim", "Premium-Bettwäsche/Textil-D2C"],
    watchouts: [
      "Jährliche Gebühr für Standard-100-Erhaltung",
      "Test-Update 2026 erfordert Re-Zertifizierung mancher Produkte",
    ],
    topPick: true,
  },
  {
    id: "testex",
    name: "TESTEX AG",
    shortName: "Testex",
    url: "https://www.testex.com",
    country: "CH/Global",
    city: "Zürich (28 Standorte global)",
    tier: "spezialist",
    testCategories: ["textile", "pfas"],
    accreditation: ["ISO 17025", "Offizieller OEKO-TEX-Vertreter"],
    specialties: [
      "OEKO-TEX-Vertreter in 28 Ländern",
      "PFAS-Tested-Label (eigenes Siegel separat von OEKO-TEX)",
      "Komplette OEKO-TEX-Family Zertifizierung",
      "Alkalische Hydrolyse für PFAS-Detection",
    ],
    preise: "OEKO-TEX 100: 800-2.500€ · PFAS-Tested-Label 1.500-3.500€",
    lieferzeit: "3-6 Wochen",
    bekanntheit: "OEKO-TEX-Alternative für DACH",
    bestFor: ["DACH-Brands die nicht über Hohenstein wollen", "PFAS-Claim ohne OEKO-TEX-Volldeck"],
    watchouts: ["Identische OEKO-TEX-Standards wie Hohenstein — Wahl ist Account-getrieben"],
  },
];

// ===== USE-CASE-STACKS =====
export type UseCaseStack = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  stack: { laborId: string; rolle: string }[];
  kostenBallpark: string;
  kostenBreakdown: { test: string; preis: string }[];
};

export const USE_CASE_STACKS: UseCaseStack[] = [
  {
    id: "indie-skincare",
    emoji: "🧴",
    title: "D2C-Skincare-Brand (Indie, 5-15 SKUs)",
    description: "Bootstrap-Founder mit eigener Rezeptur, will Standard-Stack ohne Tier-1-Premium.",
    stack: [
      { laborId: "cosmacon", rolle: "Rezeptur-Entwicklung + Production (optional, falls keine eigene Rezeptur)" },
      { laborId: "bav_institut", rolle: "CPSR + Mikrobio + Stabilität (Boutique-Preis, Tier-1-Qualität)" },
      { laborId: "dermatest", rolle: "'Dermatologisch getestet'-Siegel für Vermarktung" },
      { laborId: "sgs_proderm", rolle: "Optional: klinische Anti-Aging-Messdaten (Premium-Claim)" },
    ],
    kostenBallpark: "3.500-7.500€ für komplettes Setup einer einzelnen Rezeptur",
    kostenBreakdown: [
      { test: "CPSR", preis: "400-900€" },
      { test: "Stabilität 3 Mon. accel. (40°C/75%RH)", preis: "800-1.500€" },
      { test: "Challenge Test ISO 11930", preis: "350-600€" },
      { test: "Mikrobio Basis", preis: "150€" },
      { test: "Patch-Test Dermatest 30 Probanden", preis: "1.500-2.500€" },
      { test: "Schwermetalle", preis: "150-250€" },
    ],
  },
  {
    id: "supplement-nem",
    emoji: "💊",
    title: "Supplement / NEM-Brand",
    description: "Pflanzenextrakte, Adaptogene, Beauty-from-Within. Health-Claim-Belege wichtig.",
    stack: [
      { laborId: "tentamus", rolle: "Mikrobio + Wirkstoffgehalt (HPLC) + Stabilität" },
      { laborId: "agrolab", rolle: "Pestizid-Gold-Package + Schwermetalle" },
      { laborId: "romer_labs", rolle: "Mykotoxine bei Getreide/Curcuma/Mariendistel" },
      { laborId: "intertek_de", rolle: "Health-Claim-Belege (BfR-konforme Bewertung)" },
    ],
    kostenBallpark: "1.200-3.000€ pro Batch",
    kostenBreakdown: [
      { test: "Pestizid-Gold-Package (500+ WS)", preis: "250-450€" },
      { test: "Schwermetalle (4-Elemente)", preis: "80-200€" },
      { test: "Mykotoxine (Multi-Screening)", preis: "250-500€" },
      { test: "Mikrobio", preis: "100-200€" },
      { test: "Wirkstoffgehalt HPLC", preis: "200-450€" },
      { test: "Stabilität (wenn neu)", preis: "800-1.500€" },
    ],
  },
  {
    id: "fba-electronics",
    emoji: "📱",
    title: "FBA-Electronics (Wearables, Audio, BLE/WiFi)",
    description: "Hardware-Startup mit Funk-Gerät + Li-Ion-Batterie. CE-Mark + FBA-Versand-tauglich.",
    stack: [
      { laborId: "cetecom_advanced", rolle: "RED-Vollpaket (EMV + Radio + LVD)" },
      { laborId: "sgs_germany", rolle: "UN 38.3 + IEC 62133 (Batterie-Versand-Compliance)" },
      { laborId: "eurofins", rolle: "RoHS + REACH-SVHC + PFAS-Screening" },
      { laborId: "element", rolle: "Drop/Vibration/Shock (FBA-Versand-Robustheit)" },
    ],
    kostenBallpark: "15.000-30.000€ für Single-SKU CE-Mark + FBA-Ready",
    kostenBreakdown: [
      { test: "CE-EMV+RED-Paket", preis: "8.000-18.000€" },
      { test: "RoHS-Vollscan (10 Elemente + Phthalate)", preis: "800-1.500€" },
      { test: "REACH-SVHC-240", preis: "500-1.500€" },
      { test: "UN 38.3 (Li-Ion)", preis: "3.000-8.000€" },
      { test: "IEC 62133-2", preis: "2.000-5.000€" },
      { test: "Drop/Vibration", preis: "1.500-4.500€" },
    ],
  },
  {
    id: "petfood",
    emoji: "🐕",
    title: "Pet-Food / Hundeleckerlies / Cat-Wet-Food",
    description: "FEDIAF-konforme Rezeptur, EU-Vertrieb optional + US (AAFCO).",
    stack: [
      { laborId: "agrolab", rolle: "FEDIAF-Nährwertanalyse + Mineralien-Bilanz" },
      { laborId: "eurofins", rolle: "Mikrobio (Salmonellen, Enterobakterien)" },
      { laborId: "romer_labs", rolle: "Mykotoxine bei Getreide-Komponenten" },
      { laborId: "intertek_de", rolle: "Optional: AAFCO (USA-Markt parallel)" },
    ],
    kostenBallpark: "1.500-3.500€ pro Rezeptur",
    kostenBreakdown: [
      { test: "FEDIAF-Nährwert-Komplett", preis: "400-900€" },
      { test: "Mikrobio Salmonellen + Enterobakterien", preis: "150-300€" },
      { test: "Mykotoxine", preis: "250-500€" },
      { test: "Schwermetalle", preis: "80-200€" },
      { test: "Stabilität (wenn neu)", preis: "600-1.200€" },
    ],
  },
  {
    id: "toys",
    emoji: "🧸",
    title: "Spielzeug-Brand (EN 71 + GS-Mark)",
    description: "Konsumgüter für Kinder, EU-Markteintritt. Premium-Positionierung über GS-Zeichen.",
    stack: [
      { laborId: "tuv_sud", rolle: "EN 71-Vollpaket + GS-Mark-Erteilung" },
      { laborId: "tuv_rheinland", rolle: "Alternative für EN 71 + GS-Mark" },
      { laborId: "eurofins", rolle: "REACH-Phthalate (DEHP, DBP, BBP, DIBP)" },
      { laborId: "intertek_de", rolle: "CPSIA für US-Markt (parallel)" },
    ],
    kostenBallpark: "2.500-6.000€ pro SKU",
    kostenBreakdown: [
      { test: "EN 71-Vollpaket (1+2+3+8)", preis: "1.500-4.000€" },
      { test: "EN 71-3 Migration-Test (pro Material)", preis: "250-500€" },
      { test: "REACH-Phthalate-Screening", preis: "300-600€" },
      { test: "CPSIA US", preis: "500-1.200€" },
    ],
  },
  {
    id: "apparel",
    emoji: "👕",
    title: "Apparel / Textil-Brand (OEKO-TEX-Claim)",
    description: "D2C-Fashion oder Bettwäsche-Brand mit Schadstoff-frei-Anspruch + PFAS-Compliance (Maine-Ban 2026).",
    stack: [
      { laborId: "hohenstein", rolle: "OEKO-TEX STANDARD 100 (Originator)" },
      { laborId: "testex", rolle: "Alternative für OEKO-TEX + PFAS-Tested-Label" },
      { laborId: "tuv_rheinland", rolle: "Optional: Reibechtheit + Lichtechtheit" },
    ],
    kostenBallpark: "1.000-4.000€ pro Artikelklasse",
    kostenBreakdown: [
      { test: "OEKO-TEX STANDARD 100 (pro Artikelklasse)", preis: "800-2.500€ + 200€/Jahr" },
      { test: "PFAS-Single-Test", preis: "350-700€" },
      { test: "AZO-Farbstoff-Test", preis: "150-300€" },
      { test: "Reibechtheit / Lichtechtheit", preis: "100-250€/Test" },
    ],
  },
];

// ===== PREISLISTE ALLE TEST-TYPEN =====
export type PreisEintrag = {
  testTyp: string;
  range: string;
  notiz: string;
  kategorie: TestCategory;
};

export const PREIS_LISTE: PreisEintrag[] = [
  { testTyp: "CPSR Kosmetik (10-30 Inhaltsstoffe)", range: "349-900€", notiz: "BAV/Eurofins/Intertek · Online-Anbieter ab 180€ aber Qualität UNCLEAR", kategorie: "cosmetic" },
  { testTyp: "Challenge Test ISO 11930", range: "350-600€", notiz: "5 Stämme Standard-Auswahl", kategorie: "cosmetic" },
  { testTyp: "Mikrobio Standard Kosmetik", range: "80-150€", notiz: "TVC + Yeast/Mold + Spezifische Erreger", kategorie: "cosmetic" },
  { testTyp: "Stabilität 3 Mon. accel. (40°C/75%RH)", range: "800-1.500€", notiz: "Inkl. pH/Viskosität/Sensorik", kategorie: "cosmetic" },
  { testTyp: "Stabilität 12 Mon. Real-Time", range: "1.500-3.500€", notiz: "Zusätzlich zu Accel.", kategorie: "cosmetic" },
  { testTyp: "Patch-Test 20-30 Probanden", range: "1.500-3.500€", notiz: "Dermatest = Marktstandard", kategorie: "cosmetic" },
  { testTyp: "Klinische Studie (Anti-Aging-Messdaten)", range: "5.000-25.000€", notiz: "SGS proderm, je nach Endpoint-Komplexität", kategorie: "cosmetic" },
  { testTyp: "OEKO-TEX STANDARD 100 (pro Artikelklasse)", range: "800-2.500€ + 200€/J.", notiz: "Hohenstein/Testex identisch · USA $6.500 Ø", kategorie: "textile" },
  { testTyp: "AZO-Farbstoff-Test", range: "150-300€", notiz: "Verbotene Amine-Screening", kategorie: "textile" },
  { testTyp: "Schwermetalle 4-Elemente (Pb/Cd/Hg/As)", range: "80-250€", notiz: "ICP-MS Standard", kategorie: "food" },
  { testTyp: "Pestizid-Multi-Screening (500 WS)", range: "200-450€", notiz: "AGROLAB Gold-Package", kategorie: "food" },
  { testTyp: "Mykotoxine (DON/ZON/OTA/Aflatoxine)", range: "200-500€", notiz: "Romer Labs Marktführer", kategorie: "food" },
  { testTyp: "FEDIAF Nährwertanalyse komplett", range: "400-900€", notiz: "AGROLAB Pet-Division", kategorie: "petfood" },
  { testTyp: "EU PFAS-Target (PFOA/PFOS-Liste)", range: "350-700€", notiz: "GBA + Hohenstein + Eurofins", kategorie: "pfas" },
  { testTyp: "TOF (Total Organic Fluorine)", range: "400-900€", notiz: "Newer Method · Eurofins APAC-Doku", kategorie: "pfas" },
  { testTyp: "RoHS-Vollscan (10 El. + Phthalate)", range: "600-1.500€/Material", notiz: "+ 150-300€ pro weiterem Material", kategorie: "rohs" },
  { testTyp: "REACH-SVHC-Screening (240+)", range: "500-1.500€", notiz: "SGS oft günstiger", kategorie: "reach" },
  { testTyp: "CE-EMV (EN 55032/55035) Single", range: "2.500-5.000€", notiz: "Paket günstiger", kategorie: "ce_emv" },
  { testTyp: "RED Vollpaket (Funkgerät)", range: "8.000-18.000€", notiz: "cetecom-Range · EMV+Radio+LVD kombi", kategorie: "ce_emv" },
  { testTyp: "UN 38.3 Batterie", range: "3.000-8.000€", notiz: "Pro Batterietyp · für Versand zwingend", kategorie: "battery" },
  { testTyp: "IEC 62133-2 Lithium portable", range: "2.000-5.000€", notiz: "Mit UN 38.3 oft gebündelt", kategorie: "battery" },
  { testTyp: "EN 71-3 Migration", range: "250-500€/Material", notiz: "Spielzeug Schwermetalle", kategorie: "toys" },
  { testTyp: "EN 71 Vollpaket (Teile 1+2+3+8)", range: "1.500-4.000€", notiz: "TÜV SÜD/Rheinland Premium-Preis", kategorie: "toys" },
];

// ===== AVOID / WATCHOUTS =====
export const AVOID_LIST: { name: string; warnung: string }[] = [
  {
    name: "Online-CPSR-Anbieter ab 150-250€ (CertifiedCosmetics, Cosmetic-Testing.com etc.)",
    warnung: "UNCLEAR ob Toxikologe physisch in EU sitzt. EU-Cosmetic-Reg verlangt EU-qualifizierten Safety Assessor. Vor Buchung erfragen: Name + Qualifikation + EU-Adresse.",
  },
  {
    name: "China-Boutique-Labore (JJR, EurolabTR etc.)",
    warnung: "Für DE/EU-Behörden NICHT als Compliance-Nachweis ausreichend, wenn Akkreditierungsstelle nicht ILAC-MRA-anerkannt. Spielzeug-Test für 290$ kann valide sein für FBA, aber NICHT für CE-Mark-Belege bei Marktüberwachung.",
  },
  {
    name: "'Genau Labor' / 'Testaroundtheclock' / AcceleratorLab",
    warnung: "UNCLEAR — keine verifizierbare ISO-17025-Akkreditierungs-Spur gefunden. Wahrscheinlich Marketing-Frontend eines Dritt-Labors. Vor Buchung Akkreditierungs-Beleg + Sub-Vergabe-Kette erfragen.",
  },
  {
    name: "Dermatest-Siegel als Wirksamkeits-Beweis",
    warnung: "Öko-Test bewertet das Siegel-System kritisch. Dermatest belegt Verträglichkeit (Patch-Test), NICHT Wirksamkeit. 'Sehr gut bei Dermatest' sagt nichts über Anti-Aging-Effekt — für Effekt-Claims SGS proderm nötig.",
  },
  {
    name: "TÜV-Marken-Verwechslung (SÜD vs Rheinland vs Nord vs Austria)",
    warnung: "Verschiedene Unternehmen mit unterschiedlichem Portfolio. Logos sehen ähnlich aus — bei Sub-Vergabe genau prüfen, wer der eigentliche Test-Body ist.",
  },
];

// ===== REGULATORIK-NEWS 2026 =====
export const REGULATORIK_2026: { titel: string; datum: string; was: string; auswirkung: string }[] = [
  {
    titel: "Neue EU Toy Regulation 2025/2509",
    datum: "Seit 1.1.2026 anwendbar (Risiko-relevante Teile)",
    was: "TÜV SÜD/Rheinland verlangen für GS-Zeichen-Erneuerung Re-Tests",
    auswirkung: "Spielzeug-Brands: laufende Zertifikate prüfen, ggf. Re-Test einplanen",
  },
  {
    titel: "OEKO-TEX-Update STANDARD 100",
    datum: "Inkrafttreten 1.6.2026 · Transition bis Juni 2027",
    was: "Hohenstein und Testex machen vergünstigte Re-Tests bei Bestandszertifikaten",
    auswirkung: "Apparel-Brands: Übergangsfrist nutzen, vor Juni 2027 re-zertifizieren",
  },
  {
    titel: "EU PPWR PFAS-Ban Food-Contact",
    datum: "Ab 12.8.2026",
    was: "PFAS in Lebensmittel-Kontakt-Materialien verboten",
    auswirkung: "Verpackungs-Brands: JETZT PFAS-Screening bei GBA/Eurofins/Hohenstein machen lassen",
  },
  {
    titel: "Maine PFAS-Ban (USA)",
    datum: "Bereits seit 1.1.2026 in Kraft",
    was: "PFAS-haltige Produkte in Maine verboten — Hersteller-Reporting-Pflicht",
    auswirkung: "FBA-USA-Brands: PFAS-Tested-Label (Testex) oder TOF-Screening notwendig",
  },
];
