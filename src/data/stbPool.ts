// Kuratierte StB-Specialist-Liste — öffentlich bekannte Brands ohne Affiliate.
// Stand 2025/2026. KEIN Vermittlungs-Modell — User schickt Anfrage selbst.
// Liste ist redaktionell, keine Garantie für Eignung oder aktuelle Aufnahme-Kapazität.
//
// Quellen pro Eintrag wo möglich:
// - rating_source: ProvenExpert / Google / Trustpilot (Stand Recherche)
// - reddit_mention: Soft-Signal aus DACH-Community-Diskussion
// Ausgeschlossen via Research (AVOID): Felix1.de / ETL-Franchise wegen dokumentierter Beschwerden.

export type StbSpecTag =
  | "ecom"
  | "crypto"
  | "holding"
  | "us-llc"
  | "hk-ltd"
  | "international"
  | "ip-box"
  | "stiftung"
  | "lohn"
  | "fa-research"
  | "standard"
  | "kleinunternehmer";

export type StbProfile = {
  id: string;
  name: string;
  city: string;
  /** Vollständige Spezialisierungs-Tags. */
  specs: StbSpecTag[];
  /** Eine Zeile, was sie besonders gut können. */
  tagline: string;
  /** Verifizierbarer Web-Auftritt. */
  url: string;
  /** Geschätztes Honorar-Niveau aus öffentlichen Quellen + Recherche. */
  honorarHinweis: string;
  /** Was im Erstgespräch typischerweise gefragt wird / wo sie stark sind. */
  besonders: string[];
  /** Tool-Stack-Affinität. */
  toolStack: ("datev" | "lexoffice" | "sevdesk" | "buchhaltungsbutler" | "egal")[];
  /** Sprachen. */
  sprachen: ("de" | "en")[];
  /** Größen-Indikator: bestimmt Mandanten-Type-Eignung. */
  groesse: "boutique" | "mid" | "enterprise";
  /** Online-first (primär digital/remote) oder Hybrid (Standort-getrieben). */
  online_first: boolean;
  /** Aggregierte Bewertung (1-5), wenn aus echter Quelle verifizierbar. */
  rating?: number;
  /** Anzahl Bewertungen für rating. */
  rating_count?: number;
  /** Quelle für rating: "ProvenExpert" | "Google" | "Trustpilot" | "Trustlocal" | "kununu". */
  rating_source?: string;
  /** Soft-Signal aus Reddit / Community wo erwähnt. Optional. */
  reddit_mention?: string;
};

export const STB_POOL: StbProfile[] = [
  // ============ ECOM / AMAZON FBA / D2C ============
  {
    id: "pandotax",
    name: "Pandotax Steuerberatung",
    city: "Köln (Remote DE-weit)",
    specs: ["ecom", "international", "crypto"],
    tagline: "Branchen-Standard für Amazon FBA, Shopify & PAN-EU. Eigener Daten-Konverter.",
    url: "https://pandotax.de",
    honorarHinweis: "GmbH bis 1M Umsatz: 7-14k €/Jahr · ab 200k Pauschale-pro-Beleg-Modell üblich",
    besonders: [
      "Amazon FBA EU-7-Länder-Setup",
      "Shopify-Settlement-Buchführung",
      "OSS-Quartals-Meldung",
      "Reverse-Charge §13b für IT/FR/ES/NL",
      "Handelsblatt-Award internationales Steuerrecht",
    ],
    toolStack: ["datev", "lexoffice", "sevdesk", "buchhaltungsbutler"],
    sprachen: ["de", "en"],
    groesse: "mid",
    online_first: true,
    rating: 4.75,
    rating_count: 90,
    rating_source: "Trustlocal",
    reddit_mention: "regelmäßig in Ecom-Communities als Top-3-FBA-StB genannt",
  },
  {
    id: "gtk-kroeger",
    name: "GTK Kröger Steuerberater",
    city: "Hamburg / Bielefeld / Hannover (Remote DE-weit)",
    specs: ["ecom", "international", "holding"],
    tagline: "Führende Ecom-Kanzlei DE — Mandanten u.a. Snocks, Purelei, Junglück, Lampenwelt.",
    url: "https://www.steuerberaterecommerce.de",
    honorarHinweis: "Mid-Market · Mandate ab 250k-1M Umsatz typisch · Pauschalen verbreitet",
    besonders: [
      "D2C-Brand-Mandate (Snocks, Purelei, Junglück)",
      "Handelsblatt 'Beste Steuerberater 2026' Ecom",
      "Multi-Channel (Amazon, Shopify, Marketplace)",
      "Skalierungs-Begleitung bis Exit",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "mid",
    online_first: true,
    rating: 5.0,
    rating_count: 2,
    rating_source: "ProvenExpert",
    reddit_mention: "in D2C-Szene fest etabliert; Handelsblatt-Award 2026",
  },
  {
    id: "hv-steuerberatung",
    name: "HV Steuerberatung (Hansel & Vogt)",
    city: "Münster (Remote DE-weit)",
    specs: ["ecom", "holding"],
    tagline: "D2C/Online-Brand-fokussiert. Partnerschaften mit Founders League & Iron Media.",
    url: "https://hv-steuerberatung.de",
    honorarHinweis: "Flat-Rate-Pricing laut Website · Boutique-Niveau",
    besonders: [
      "Mandanten Strayfe, Lumière, maleUp",
      "Iron-Media-Ökosystem (Szalinski-Adjacent)",
      "Founders-League-Partner",
      "Brand-Building + Steuer integriert",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "boutique",
    online_first: true,
    reddit_mention: "im Iron-Media/Szalinski-Ökosystem präsent",
  },
  {
    id: "3s-tax",
    name: "3S.tax (Spieckermann & Partner)",
    city: "Wuppertal (Remote DE-weit)",
    specs: ["ecom", "international"],
    tagline: "DATEV 'Digitale Kanzlei 2025'. Offizieller JTL & xt:Commerce StB.",
    url: "https://www.3s.tax",
    honorarHinweis: "Mid-Tier · Mandate ab 250k Umsatz · Pauschalen je Belege/Channels",
    besonders: [
      "JTL-Wawi-Integration als offizieller Partner",
      "xt:Commerce-Setup-Experte",
      "Wortfilter-Top-25-Ecom-Liste 2025",
      "OSS + IOSS-Anmeldung",
    ],
    toolStack: ["datev", "lexoffice", "sevdesk"],
    sprachen: ["de", "en"],
    groesse: "mid",
    online_first: true,
    rating: 4.9,
    rating_count: 96,
    rating_source: "ProvenExpert",
    reddit_mention: "Recommendation-Rate 95% auf ProvenExpert",
  },
  {
    id: "stb-digital-gostomzik",
    name: "stb-digital (Stefan Gostomzik)",
    city: "Mülheim-Kärlich (Remote DE-weit)",
    specs: ["ecom"],
    tagline: "1.000+ Onlinehändler-Mandate. Exklusive Taxdoo-Partnerschaft.",
    url: "https://www.stb-digital.de",
    honorarHinweis: "Pauschalen-Modell · transparent auf Anfrage",
    besonders: [
      "Taxdoo-Exclusive-Partnerschaft",
      "1.000+ Online-Händler-Mandate",
      "Focus Money Top Steuerberater 2020",
      "DATEV-Mitglied",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "mid",
    online_first: true,
    rating: 4.9,
    rating_source: "Google",
    reddit_mention: "in Onlinehändler-News Top-Empfehlung",
  },
  {
    id: "dhw-stb",
    name: "DHW Steuerberatung (Christian Deák)",
    city: "Oberhausen (Remote DE-weit)",
    specs: ["ecom", "international"],
    tagline: "863+ Mandanten. Syndikus-StB der comrce/Billbee-Gruppe.",
    url: "https://www.dhw-stb.de",
    honorarHinweis: "Pauschalen je Channels · ab 250k Umsatz typisch",
    besonders: [
      "Billbee-Gruppe Syndikus-StB",
      "Ecom-Konferenz-Speaker (Christian Deák)",
      "comrce-Partnerschaft",
      "863+ Mandanten in Onlinehandel",
    ],
    toolStack: ["datev", "lexoffice"],
    sprachen: ["de"],
    groesse: "mid",
    online_first: true,
    rating: 4.9,
    rating_source: "Google",
  },
  {
    id: "specht-partner",
    name: "Specht & Partner",
    city: "Lübeck",
    specs: ["ecom", "kleinunternehmer", "standard"],
    tagline: "Bekannter E-Com-StB-Hub für Online-Handel-Gründer. PayJoe/Taxdoo-Workflow.",
    url: "https://www.specht-partner.de",
    honorarHinweis: "EÜR ab 1.500 € · GmbH ab 6.000 € · Pauschale + Beleg-Aufschlag bei E-Com",
    besonders: [
      "Amazon-Buchungstexte (130+ Codes)",
      "Shopify-Stripe-Klarna-Auflösung",
      "Kleinunternehmer-zu-Regelbesteuerer-Übergang",
    ],
    toolStack: ["datev", "lexoffice"],
    sprachen: ["de"],
    groesse: "boutique",
    online_first: false,
  },

  // ============ HOLDING / GMBH / STARTUPS ============
  {
    id: "bsteuern",
    name: "b'steuern (Plantener)",
    city: "Berlin (Remote DE-weit)",
    specs: ["holding", "standard"],
    tagline: "'StB, die wie dein CFO denkt'. Co-Founder Christopher Plantener (ex-Qonto/Kontist).",
    url: "https://www.bsteuern.com",
    honorarHinweis: "Abo-Modell · Startup-friendly · Honorar je Stage",
    besonders: [
      "Ex-Qonto/Kontist-Team",
      "Startup-/UG-/GmbH-Spezialist",
      "Berlin-Startup-Szene Top-Anlaufstelle",
      "Holding-Strukturen für Founder",
    ],
    toolStack: ["datev", "lexoffice", "sevdesk", "buchhaltungsbutler"],
    sprachen: ["de"],
    groesse: "boutique",
    online_first: true,
    rating: 4.8,
    rating_source: "Google",
    reddit_mention: "Top-Empfehlung in Berlin-Startup-Szene",
  },
  {
    id: "juhn",
    name: "JUHN Partner",
    city: "Köln / Düsseldorf / Frankfurt / Bonn / Dubai",
    specs: ["holding", "international", "stiftung", "us-llc"],
    tagline: "Holdings, Stiftungen, internationales Steuerrecht. Handelsblatt Top-Kanzlei.",
    url: "https://www.juhn.com",
    honorarHinweis: "Mid-Market · Mandant werden → Honorar individuell · ab 500k Umsatz typisch",
    besonders: [
      "YouTube-Channel 'Steuern mit Köpfchen' (Christoph Juhn)",
      "Holding-Konstrukte 1-5M Gründer",
      "Familienstiftung + Cross-Border",
      "Dubai-Office für Auswanderer",
    ],
    toolStack: ["datev"],
    sprachen: ["de", "en"],
    groesse: "mid",
    online_first: false,
    rating: 4.7,
    rating_count: 415,
    rating_source: "Google",
    reddit_mention: "fester Player für 1-5M+ Gründer via YouTube-Bekanntheit",
  },
  {
    id: "cicek",
    name: "CICEK Steuerberatung",
    city: "Berlin (Remote DE-weit)",
    specs: ["holding", "international", "ecom"],
    tagline: "DATEV Digitale Kanzlei 2026. Handelsblatt 'Beste Steuerberater 2026'. Eigene App.",
    url: "https://cicek-stb.com/de",
    honorarHinweis: "Mid-Tier · transparent auf Anfrage",
    besonders: [
      "Anil Cicek in Candis-Top-21-Liste",
      "immodo Top 10 Berlin",
      "Eigene Kanzlei-App für Mandanten",
      "Handelsblatt Award 2026",
    ],
    toolStack: ["datev", "sevdesk"],
    sprachen: ["de", "en"],
    groesse: "mid",
    online_first: true,
    rating: 5.0,
    rating_count: 60,
    rating_source: "Google",
  },
  {
    id: "taxperten",
    name: "Taxperten (Steuern steuern®)",
    city: "Remote DE-weit",
    specs: ["holding", "stiftung", "international"],
    tagline: "'Deutschlands führende Remote-StB'. Holding/Stiftung-Fokus. DATEV Digitale Kanzlei 2025.",
    url: "https://www.tax-perten.de",
    honorarHinweis: "Boutique-Niveau · Pakete + Beratungsstunden · individuell",
    besonders: [
      "100% Remote-Beratung DE-weit",
      "Schwesterprodukt der 'Steuern steuern®'-Strategieberatung",
      "Holding + Stiftungs-Konstrukte",
      "Aktiv im Founder-LinkedIn",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "boutique",
    online_first: true,
    rating: 5.0,
    rating_source: "Google",
  },
  {
    id: "solving-tax",
    name: "SOLVING TAX (Resolvio)",
    city: "Koblenz (Remote via Tech-Plattform)",
    specs: ["holding"],
    tagline: "Festpreis 319 € für Holding-Jahresabschluss. Vermögensverwaltende Holdings.",
    url: "https://resolvio.com/holding-jahresabschluss-guenstig",
    honorarHinweis: "319 € netto Holding-Abschluss (Festpreis, öffentlich)",
    besonders: [
      "Festpreis-Modell statt StBVV (319 € Abschluss)",
      "Vermögensverwaltende Holding (Spar-Variante)",
      "Tech-Plattform-getrieben",
      "Low-Cost-Alternative zu Abo-StBs",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "boutique",
    online_first: true,
    reddit_mention: "in Founder-Twitter/LinkedIn als Low-Cost-Holding-Option diskutiert",
  },
  {
    id: "kanzlei-mehmedovic",
    name: "Mehmedović & Partner",
    city: "München",
    specs: ["holding", "international", "ecom", "ip-box"],
    tagline: "München-Boutique. Holding-Konstrukte + EU-Alternativen + IP-Box-Setups.",
    url: "https://www.mehmedovic-partner.de",
    honorarHinweis: "Mid-Tier · Holdings ab 12k €/Jahr · Stundensatz ~200 €",
    besonders: [
      "§22 UmwStG Sperrfristen",
      "Estonian OÜ aus DE-Sicht",
      "IP-Verlagerung NL/IE/HU",
      "FlexCo Österreich",
    ],
    toolStack: ["datev"],
    sprachen: ["de", "en"],
    groesse: "boutique",
    online_first: false,
  },
  {
    id: "kkp",
    name: "KKP Steuerberatung",
    city: "Berlin",
    specs: ["standard", "ecom", "lohn", "kleinunternehmer"],
    tagline: "Berlin-Boutique mit Tech-Affinität. Lexoffice-Workflow. Gründer-Fokus.",
    url: "https://www.kkp-steuerberatung.de",
    honorarHinweis: "EÜR 1.500-3.000 € · Pauschalen ab Tag 1 · Lexoffice-bevorzugt",
    besonders: [
      "100% Lexoffice/sevDesk-Workflow",
      "Gründer-Spezial-Beratung",
      "Schnelle Reaktionszeit (Slack üblich)",
    ],
    toolStack: ["lexoffice", "sevdesk"],
    sprachen: ["de"],
    groesse: "boutique",
    online_first: false,
  },

  // ============ CRYPTO / NFT / DAC8 ============
  {
    id: "siroc",
    name: "SIROC Steuerberatung (Roland Elias / Steuern mit Kopf)",
    city: "Regensburg (100% remote, weltweit)",
    specs: ["ecom", "crypto", "holding"],
    tagline: "100% digitale Kanzlei. Crypto/NFT-Spezialist. YouTube 'Steuern mit Kopf' (78k+ Subs).",
    url: "https://www.siroc-steuerberatung.de",
    honorarHinweis: "Fixed-Rate-Pakete · 30-Min-Beratung online · transparent",
    besonders: [
      "YouTube 'Steuern mit Kopf' (Roland Elias)",
      "Crypto/NFT-Spezialisierung",
      "100% remote weltweit",
      "Fixed-Rate-Pakete statt StBVV",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "mid",
    online_first: true,
    rating: 4.5,
    rating_count: 234,
    rating_source: "Trustlocal",
    reddit_mention: "in r/Finanzen/Kryptowährungen via YouTube-Bekanntheit empfohlen",
  },
  {
    id: "winheller",
    name: "WINHELLER Rechtsanwaltsgesellschaft",
    city: "Frankfurt + Berlin / Hamburg / München / Aalen",
    specs: ["crypto", "stiftung", "international", "ip-box"],
    tagline: "Crypto-Steuer-Branchenstandard. Legal 500 'Top 3 Private Clients/Nonprofits'.",
    url: "https://winheller.com",
    honorarHinweis: "Crypto-StE ab 595 € · Stundensätze 125-500 € · Auslandsmandate frei verhandelbar",
    besonders: [
      "§23 EStG FIFO + Verlängerung bei Staking",
      "DAC8-Reporting ab 2026",
      "DeFi-Pools, NFTs, DAOs",
      "MiCAR-Compliance",
      "10.400 Mandanten aus 94 Ländern",
    ],
    toolStack: ["datev"],
    sprachen: ["de", "en"],
    groesse: "enterprise",
    online_first: false,
    reddit_mention: "in r/Bitcoin_DE für komplexe Crypto-Fälle (NFT, DeFi) Go-to-Player",
  },
  {
    id: "rose-partner",
    name: "ROSE & PARTNER",
    city: "Hamburg / Berlin / München / Köln / Frankfurt / Hannover / Mailand",
    specs: ["crypto", "stiftung", "holding", "international"],
    tagline: "Multi-Office-Kanzlei für Crypto + Familienstiftung-Holding. Handelsblatt Best Tax.",
    url: "https://www.rosepartner.de",
    honorarHinweis: "Enterprise · Stundensätze 250-450 € · Mandate ab 1M Umsatz",
    besonders: [
      "Crypto-Recht-Spezialisten (NFT, DeFi)",
      "Familienstiftung + Holding-Konstrukte",
      "FAZ/Spiegel/Handelsblatt-zitiert",
      "7 DE-Standorte + Mailand",
    ],
    toolStack: ["datev"],
    sprachen: ["de", "en"],
    groesse: "enterprise",
    online_first: false,
    reddit_mention: "regelmäßig in Krypto-Recht-Diskussionen genannt",
  },
  {
    id: "klein-stb",
    name: "Steuerberatung Klein (Maximilian Klein)",
    city: "Düsseldorf (Remote DE-weit)",
    specs: ["crypto", "standard"],
    tagline: "Crypto-Spezialist. Eigener Krypto-Steuerrechner. DAC8-Selbstanzeige-Service.",
    url: "https://kleinstb.de",
    honorarHinweis: "Boutique · DAC8-Pakete + Stundensätze",
    besonders: [
      "Eigener Krypto-Steuerrechner",
      "DAC8-Selbstanzeige-Service",
      "Düsseldorf-Boutique",
      "Schnelle Reaktion via Mandanten-Portal",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "boutique",
    online_first: true,
    reddit_mention: "in r/Krypto vereinzelt für DAC8-Vorbereitung empfohlen",
  },
  {
    id: "taxmain",
    name: "Taxmain Steuerberatungsgesellschaft",
    city: "Frankfurt am Main",
    specs: ["crypto", "ecom", "international"],
    tagline: "Crypto + Ecom + Auswanderer-Beratung. 75+ Jahre. DATEV-Mitglied.",
    url: "https://taxmain.de",
    honorarHinweis: "Mid-Tier · Stundensätze 180-300 €",
    besonders: [
      "Crypto-Steuer Frankfurt",
      "Auswanderer-Beratung (DE→Ausland)",
      "75+ Jahre Tradition",
      "RU-Klientel-Sprachkompetenz",
    ],
    toolStack: ["datev"],
    sprachen: ["de", "en"],
    groesse: "mid",
    online_first: false,
  },

  // ============ US-LLC / INTERNATIONAL ============
  {
    id: "llc-steuerberater",
    name: "LLC-Steuerberater (Grassland Mill / Becker)",
    city: "München (Remote DE-weit)",
    specs: ["us-llc", "international", "holding"],
    tagline: "Reiner US-LLC-Spezialist für DE-ansässige Unternehmer. Rechtstypenvergleich-Gutachten.",
    url: "https://llc-steuerberater.de",
    honorarHinweis: "150 €/h StB + 100 €/h Fachpersonal · Erstgutachten binnen 3 Werktagen",
    besonders: [
      "§AStG Hinzurechnungsbesteuerung-Berechnung",
      "DBA-Anrechnung US-Quellensteuer",
      "EIN + BOI + 5472-Filing-Begleitung",
      "ATAD III-Substance-Aufbau",
    ],
    toolStack: ["datev"],
    sprachen: ["de", "en"],
    groesse: "boutique",
    online_first: true,
    reddit_mention: "auf r/Selbststaendig und Nomad-Foren für DE-LLC-Konstellation",
  },
  {
    id: "uskanzlei-mount-bonnell",
    name: "Kanzlei Mount Bonnell (nullsteuer.llc)",
    city: "Austin TX + virtuelles EU-Team",
    specs: ["us-llc", "international"],
    tagline: "US-CPA-Kanzlei aus Austin für deutsche Nomaden. 5472/1120/BOI-Compliance.",
    url: "https://uskanzlei.com",
    honorarHinweis: "Pakete + Honorarvereinbarung · öffentlich nicht spezifiziert",
    besonders: [
      "US-CPA-Kanzlei (Austin)",
      "Form 5472 / 1120 / BOI komplett",
      "Nomad/PT-Setup",
      "EU-Team für DE-Klientel",
    ],
    toolStack: ["egal"],
    sprachen: ["de", "en"],
    groesse: "mid",
    online_first: true,
    reddit_mention: "in Nomad/PT-Communities (r/digitalnomad DE) erste Wahl für US-LLC-Setup",
  },
  {
    id: "wts",
    name: "WTS Group",
    city: "München / Düsseldorf / Frankfurt / Berlin",
    specs: ["international", "holding", "us-llc", "hk-ltd", "ip-box"],
    tagline: "Multi-disciplinary Tax-Boutique. International + Verrechnungspreise + Cross-Border M&A.",
    url: "https://www.wts.com/de",
    honorarHinweis: "Enterprise-Niveau · Stundensatz 250-500 €/h · Mandats-Mindestgröße ab ~5M Umsatz",
    besonders: [
      "Holding-Konstrukte multi-jurisdiction",
      "Verrechnungspreis-Dokumentation",
      "DAC6/DAC8/Pillar-2",
      "Hong Kong + Singapore + Switzerland aus DE",
    ],
    toolStack: ["datev"],
    sprachen: ["de", "en"],
    groesse: "enterprise",
    online_first: false,
  },
  {
    id: "ebner-stolz",
    name: "Ebner Stolz",
    city: "Stuttgart / 14 weitere DE-Standorte",
    specs: ["holding", "international", "stiftung", "ip-box"],
    tagline: "Top-15-WP/StB-Gesellschaft DE. Holding + JA + Konzernrechnung. Mid-Market-Standard.",
    url: "https://www.ebnerstolz.de",
    honorarHinweis: "Mandats-Mindestgröße ~1-2M Umsatz · Stundensätze 200-400 €",
    besonders: [
      "§8b KStG Holding-Konstrukte",
      "Konzern-Reporting + IFRS",
      "Familien-Pool / Stiftungs-Konstrukte",
      "M&A-Begleitung",
    ],
    toolStack: ["datev"],
    sprachen: ["de", "en"],
    groesse: "enterprise",
    online_first: false,
  },
  {
    id: "rsm",
    name: "RSM Ebner Stolz Mönning Bachem",
    city: "Düsseldorf / Köln / Hamburg",
    specs: ["international", "holding", "ecom", "lohn"],
    tagline: "Mid-Market-Network mit International + ECom-Track. Eigene IT-Steuer-Beratung.",
    url: "https://www.rsm.global/germany",
    honorarHinweis: "Mid-Market · Mandate ab 500k-1M Umsatz · Pauschalen verbreitet",
    besonders: [
      "Cross-Border-Buchhaltung",
      "Lohn-Outsourcing",
      "DSGVO + IT-Steuer",
      "Audit + StB integriert",
    ],
    toolStack: ["datev"],
    sprachen: ["de", "en"],
    groesse: "enterprise",
    online_first: false,
  },

  // ============ MASS-MARKET DIGITAL ============
  {
    id: "steueragenten",
    name: "steueragenten.de",
    city: "Hamburg (Remote DE-weit)",
    specs: ["ecom", "holding", "standard", "lohn"],
    tagline: "4.000+ Mandanten, 100+ Mitarbeiter. Mass-Player digitale Steuerberatung.",
    url: "https://steueragenten.de",
    honorarHinweis: "Mix StBVV + Flatrates · Preise nach Auskunft",
    besonders: [
      "4.000+ Mandanten",
      "100+ Mitarbeiter",
      "kununu 4.5 / Google 4.4 / Trustpilot 4.5",
      "Mass-Player für Standard-Use-Cases",
    ],
    toolStack: ["datev", "lexoffice", "sevdesk"],
    sprachen: ["de", "en"],
    groesse: "enterprise",
    online_first: true,
    rating: 4.47,
    rating_count: 410,
    rating_source: "ProvenExpert",
    reddit_mention: "in Ecom-Foren gemischtes Feedback (Mass-Player-Charakter)",
  },
  {
    id: "steuerberaten-de",
    name: "steuerberaten.de",
    city: "Lutherstadt Wittenberg (Remote DE-weit)",
    specs: ["ecom", "standard"],
    tagline: "100-Mann-Online-Kanzlei mit Flatrate-Preisen für Ecom & B2B.",
    url: "https://www.steuerberaten.de",
    honorarHinweis: "Flatrates statt StBVV · Beratung nach Anfrage",
    besonders: [
      "Flatrate-Modell",
      "100+ Mitarbeiter Online",
      "Ecom + B2B-Standard",
      "Cave: dokumentierte Beschwerden zu Reaktionszeit",
    ],
    toolStack: ["datev", "lexoffice"],
    sprachen: ["de"],
    groesse: "enterprise",
    online_first: true,
    rating: 4.0,
    rating_count: 155,
    rating_source: "Trustpilot",
    reddit_mention: "Gemischtes Bild: viele positive Reviews + dokumentierte Beschwerden zu Reaktionszeit",
  },
  {
    id: "steuerwerk-olbrich",
    name: "Steuerwerk (Stephanie Olbrich)",
    city: "Koblenz (Remote DE-weit)",
    specs: ["standard", "holding"],
    tagline: "DATEV 'Digitale Kanzlei 2025'. Fokus Online-Unternehmer & Female Founders.",
    url: "https://www.dein-steuerbuero.de",
    honorarHinweis: "Boutique · Pakete für Solo-/Online-Unternehmer",
    besonders: [
      "Female-Founders-Fokus",
      "Candis Top-21-Liste",
      "DATEV Digitale Kanzlei 2025",
      "Online-Unternehmer-Pakete",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "boutique",
    online_first: true,
  },
  {
    id: "beck-stb",
    name: "Beck Steuerberatung",
    city: "Berlin Kreuzberg",
    specs: ["standard", "holding"],
    tagline: "30+ Jahre Berliner Kanzlei, 2. Generation. Mobile-App. Influencer-Track.",
    url: "https://www.steuerberater-beck.de",
    honorarHinweis: "Nach StBVV · Erstberatung kostenlos",
    besonders: [
      "Berlin Kreuzberg-Standort",
      "Mobile-App für Mandanten",
      "Influencer/Creator-Track",
      "30+ Jahre Tradition",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "boutique",
    online_first: false,
    rating: 5.0,
    rating_count: 37,
    rating_source: "ProvenExpert",
  },

  // ============ VERZEICHNISSE / DIRECTORIES ============
  {
    id: "datev-smartexperts",
    name: "DATEV SmartExperts (Verzeichnis)",
    city: "DE-weit",
    specs: ["standard", "lohn", "ecom", "international"],
    tagline: "Genossenschaftliches Verzeichnis aller DATEV-Kanzleien. Filter nach PLZ + Spezialisierung.",
    url: "https://www.smartexperts.de",
    honorarHinweis: "Bandbreite je Kanzlei · StBVV-typisch · Pauschalen verbreitet",
    besonders: [
      "Größtes DATEV-Mitglieder-Pool (40k+)",
      "PLZ-Suche + Spezial-Filter",
      "Tech-Stack DATEV-Cloud-Standard",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "mid",
    online_first: false,
  },
  {
    id: "stbk-suche",
    name: "Steuerberaterkammer-Suche",
    city: "DE-weit (16 Kammern)",
    specs: ["standard", "kleinunternehmer", "lohn"],
    tagline: "Offizieller Verzeichnis-Service. Kostenlos. Kein Marketing-Layer.",
    url: "https://steuerberaterkammer-berlin.de/steuerberatersuche",
    honorarHinweis: "StBVV-Standard · Honorar je Kanzlei",
    besonders: [
      "Volle Liste regionaler StBs",
      "Kein Affiliate, kein Marketing-Layer",
      "Suche nach PLZ + Tätigkeitsschwerpunkt",
    ],
    toolStack: ["egal"],
    sprachen: ["de"],
    groesse: "boutique",
    online_first: false,
  },
];

// AVOID-Liste — Kanzleien wo Community/Reviews überwiegend warnen.
// Wird im UI als Hinweis-Section angezeigt, NICHT als matchbare Empfehlung.
export const STB_AVOID_LIST: { name: string; reason: string; source: string }[] = [
  {
    name: "Felix1.de (ETL-Tochter)",
    reason:
      "Dokumentierte Beschwerden: Mahnungen ohne vorherige Schlussrechnung, kommunikationsschwache Hotline, falsche Buchungen, Mandatskündigungen mit Drohung.",
    source: "trustpilot.com/review/felix1.de + service-report-it.de Artikel",
  },
  {
    name: "ETL-Franchise-Kanzleien generell",
    reason:
      "Franchise-System → Qualität extrem standortabhängig. Erfahrungsberichte stark schwankend, kein einheitliches Qualitätsniveau.",
    source: "Trustpilot-Aggregat + Reddit-Threads",
  },
];

export type Briefing = {
  rechtsform: string;
  umsatzRange: "0-50k" | "50-250k" | "250k-1M" | "1M-5M" | "5M+";
  belegeMonat: "≤50" | "50-250" | "250-1000" | "1000+";
  mitarbeiter: number;
  lohnabrechnungenMonat: number;
  vertriebskanaele: string[];
  spezialTags: StbSpecTag[];
  toolStack: "datev" | "lexoffice" | "sevdesk" | "buchhaltungsbutler" | "egal";
  serviceBedarf: string[];
  slaWunsch: "24h" | "48h" | "1woche";
  budget: string;
  plz: string;
  remoteOk: boolean;
  /** 3 Pain-Points die der StB explizit beantworten muss. */
  painPoints: string[];
};

export type StbFilterOptions = {
  /** Nur Kanzleien mit online_first === true zeigen. */
  onlineOnly?: boolean;
  /** Min-Rating: Kanzleien unter dieser Schwelle ausblenden (nur mit rating-Wert). */
  minRating?: number;
};

/**
 * Match-Algorithm: 3-StB-Empfehlung basierend auf Briefing-Tags + Größe + Online + Rating.
 * Score 0-150. Spezialisierungs-Match ist wichtigster Faktor.
 */
export const matchStbs = (
  briefing: Briefing,
  filter: StbFilterOptions = {},
): { stb: StbProfile; score: number; reason: string }[] => {
  // 1) Hard-Filter anwenden
  const pool = STB_POOL.filter((stb) => {
    if (filter.onlineOnly && !stb.online_first) return false;
    if (filter.minRating !== undefined && filter.minRating > 0) {
      // Wenn min-Rating gesetzt UND Kanzlei hat eine Bewertung → muss erreicht werden.
      // Wenn keine Bewertung → wird nicht ausgefiltert (sonst würden viele kleine Boutiques verschwinden).
      if (stb.rating !== undefined && stb.rating < filter.minRating) return false;
    }
    return true;
  });

  const scored = pool.map((stb) => {
    let score = 0;
    const reasons: string[] = [];

    // Spezialisierungs-Match: 50 Punkte max
    const tagOverlap = briefing.spezialTags.filter((t) => stb.specs.includes(t)).length;
    if (tagOverlap > 0) {
      score += Math.min(50, tagOverlap * 25);
      reasons.push(`${tagOverlap} Spezial-Tag${tagOverlap > 1 ? "s" : ""}-Treffer`);
    }

    // Größen-Match: 20 Punkte
    const umsatzToGroesse: Record<string, "boutique" | "mid" | "enterprise"> = {
      "0-50k": "boutique",
      "50-250k": "boutique",
      "250k-1M": "mid",
      "1M-5M": "mid",
      "5M+": "enterprise",
    };
    const idealGroesse = umsatzToGroesse[briefing.umsatzRange];
    if (stb.groesse === idealGroesse) {
      score += 20;
      reasons.push("Kanzlei-Größe passt zu Mandant");
    } else if (
      (idealGroesse === "boutique" && stb.groesse === "mid") ||
      (idealGroesse === "mid" && (stb.groesse === "boutique" || stb.groesse === "enterprise"))
    ) {
      score += 10;
    }

    // Tool-Stack-Match: 15 Punkte
    if (briefing.toolStack === "egal" || stb.toolStack.includes(briefing.toolStack) || stb.toolStack.includes("egal")) {
      score += 15;
      if (briefing.toolStack !== "egal" && stb.toolStack.includes(briefing.toolStack)) {
        reasons.push(`Tool-Stack ${briefing.toolStack.toUpperCase()} kompatibel`);
      }
    }

    // Sprache: 5 Punkte für Englisch wenn Auslands-Spezialisten gefragt sind
    const auslandsTag = briefing.spezialTags.some((t) =>
      ["us-llc", "hk-ltd", "international", "ip-box"].includes(t),
    );
    if (auslandsTag && stb.sprachen.includes("en")) {
      score += 5;
      reasons.push("Englischsprachig");
    }

    // Online-Bonus: 10 Punkte wenn Mandant remote will + Kanzlei online-first
    if (briefing.remoteOk && stb.online_first) {
      score += 10;
      reasons.push("Online-Kanzlei (remote-fähig)");
    }

    // Rating-Bonus: bis +20 Punkte für hohe Bewertung
    if (stb.rating !== undefined) {
      if (stb.rating >= 4.9) {
        score += 20;
        reasons.push(`${stb.rating}★ (${stb.rating_source})`);
      } else if (stb.rating >= 4.7) {
        score += 15;
        reasons.push(`${stb.rating}★ (${stb.rating_source})`);
      } else if (stb.rating >= 4.5) {
        score += 10;
      } else if (stb.rating >= 4.0) {
        score += 5;
      }
    }

    // Standard-Bonus für sehr generische Anfragen ohne Spezial-Tags
    if (briefing.spezialTags.length === 0 && stb.specs.includes("standard")) {
      score += 30;
      reasons.push("Standard-Gründer-Mandat-Track");
    }

    return { stb, score, reason: reasons.join(" · ") || "Allgemeine Eignung" };
  });

  return scored.sort((a, b) => b.score - a.score);
};
