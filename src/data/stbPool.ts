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

  // ============ HAMBURG-LOKAL (Boutique + Mid) ============
  {
    id: "nbs-partners",
    name: "nbs partners",
    city: "Hamburg HafenCity (Am Sandtorkai 41)",
    specs: ["ecom", "standard", "holding", "international"],
    tagline: "Hamburger Startup-/Digital-Kanzlei. 15 Jahre Track. 3-Stufen-Wachstums-Honorar.",
    url: "https://www.nbs-partners.de/taetigkeitsbereiche/steuerberater-fuer-startups",
    honorarHinweis: "3-Stufen-Modell nach Unternehmensphase (Gründung → Series A → Umsatzhürde) · sonst StBVV",
    besonders: [
      "Handelsblatt 'Beste Steuerberater 2026'",
      "Eigene Shopify-Beratungsseite",
      "WP + RA im Haus (Series-A-fähig)",
      "Candis + DATEV-Stack mit OCR/ML-FiBu",
    ],
    toolStack: ["datev", "lexoffice"],
    sprachen: ["de", "en"],
    groesse: "mid",
    online_first: false,
    rating: 4.7,
    rating_count: 29,
    rating_source: "Google",
  },
  {
    id: "mertens-schabow",
    name: "Mertens Schabow Steuerberatung",
    city: "Hamburg Uhlenhorst (Hans-Henny-Jahnn-Weg)",
    specs: ["ecom", "standard"],
    tagline: "Junge Boutique mit klarem Amazon-FBA/OSS-Fokus. Transparente Honorar-Seite.",
    url: "https://mertens-schabow.de/amazon-fba",
    honorarHinweis: "Pauschalen-Modell · Honorar-Seite öffentlich · 'transparent ohne Überraschungen'",
    besonders: [
      "Amazon FBA + OSS + grenzüberschreitende USt",
      "Shopify / Xentral / Weclapp / Pathway / Billbee Integrationen",
      "Aktiver YouTube-Kanal (@mertensschabowsteuerberatung)",
      "Auch Agentur-/Creator-Mandate",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "boutique",
    online_first: false,
    rating: 5.0,
    rating_count: 17,
    rating_source: "ReviewHero (Google-aggregiert)",
  },
  {
    id: "egido",
    name: "EGIDO Steuerberatung",
    city: "Hamburg St. Georg (Holzdamm 47)",
    specs: ["ecom", "standard", "lohn", "international"],
    tagline: "Mid-Tier-Kanzlei (50+ MA, 350+ Mandanten). Dedizierte Ecom-Branche für Multi-Channel.",
    url: "https://www.egido.de/branchen/e-commerce",
    honorarHinweis: "Mid-Tier · individuell nach Beleg-/Channel-Volumen",
    besonders: [
      "Volle Ecom-Plattform-Abdeckung: Shopify/JTL/Magento/OXID/Shopware/Etsy/Amazon/eBay",
      "Eigene Lohnbuchhaltungs-Tochter",
      "7 Berufsträger · WP integriert",
      "Eigenes Mandantenportal DATEV-integriert",
    ],
    toolStack: ["datev"],
    sprachen: ["de", "en"],
    groesse: "mid",
    online_first: false,
    rating_count: 44,
    rating_source: "ReviewHero (Google-aggregiert)",
  },
  {
    id: "ruge-fehsenfeld",
    name: "RUGE FEHSENFELD Partnerschaft",
    city: "Hamburg Schnelsen (Essener Bogen 23)",
    specs: ["crypto", "holding", "international", "standard"],
    tagline: "Beste verifizierte Krypto-Spezialisierung in HH. CoinTracking-Partner + WIRE-Krypto-StB.",
    url: "https://www.rugefehsenfeld.de/krypto-steuer",
    honorarHinweis: "Boutique · Krypto-StE + Selbstanzeige-Pakete · auf Anfrage",
    besonders: [
      "Johannes Ebner: WIRE-zertifizierter Kryptowerte-StB (2023)",
      "Trading + Mining + Staking + Lending + Futures + Margin",
      "RA-Hut auch: Selbstanzeige + Betriebsprüfung kombinierbar",
      "CoinTracking Full-Service-Partner für Tx-Imports",
    ],
    toolStack: ["datev"],
    sprachen: ["de", "en"],
    groesse: "boutique",
    online_first: false,
    rating: 5.0,
    rating_count: 15,
    rating_source: "golocal",
  },
  {
    id: "steuerlogik",
    name: "Steuerlogik Steuerberatungsgesellschaft",
    city: "Hamburg Neustadt / St. Pauli (Atlantic-Haus, Zirkusweg 1)",
    specs: ["crypto", "holding", "international", "standard"],
    tagline: "20-MA-Kanzlei mit Krypto + ungewöhnlich breitem Sprach-Setup (DE/EN/FA/AR/TR/SQ).",
    url: "https://www.steuerlogik.de",
    honorarHinweis: "Mid-Tier · auf Anfrage",
    besonders: [
      "Krypto: Trading/Mining/Staking/Lending — privat + corporate",
      "Internationales Steuerrecht + Holding-Strukturierung",
      "6 Sprachen aktiv (Farsi/Arabisch/Türkisch — selten in HH)",
      "Betriebs- + Zollprüfungs-Begleitung",
    ],
    toolStack: ["datev"],
    sprachen: ["de", "en"],
    groesse: "mid",
    online_first: false,
    rating_count: 19,
    rating_source: "Trustlocal (Multi-Source)",
  },
  {
    id: "starck-hamburg",
    name: "STARCK Steuerberatung",
    city: "Hamburg Uhlenhorst (Marschnerstraße 23)",
    specs: ["standard", "kleinunternehmer", "holding"],
    tagline: "Solide Allround-Boutique für Gründer, Freiberufler und kleine GmbHs. Inhaber-StB-Kontakt.",
    url: "https://steuerberatung-starck.de",
    honorarHinweis: "Boutique · StBVV-Standard",
    besonders: [
      "Breite Branchenabdeckung (IT/Consulting, Ärzte, Hebammen, Designer, Handwerk)",
      "Gründerbetreuung Solo bis GmbH-Holding",
      "Persönlicher Inhaber-Kontakt (kein Mitarbeiter-Routing)",
      "DATEV-zertifiziert",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "boutique",
    online_first: false,
    rating_count: 9,
    rating_source: "Nicelocal",
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

  // ============ REGION 0: SACHSEN / THÜRINGEN / SA-SÜD ============
  {
    id: "kalkuel-dresden",
    name: "kalkül Steuerberatung",
    city: "Dresden (Bautzner Landstraße 136)",
    specs: ["ecom", "standard", "international"],
    tagline: "Innovativste Steuerkanzlei Dresdens. Eigenes Dev-Team für Marketplace/Payment.",
    url: "https://kalkuel.de",
    honorarHinweis: "Mid-Tier · auf Anfrage",
    besonders: [
      "~30 MA · 600+ Unternehmen",
      "Eigene Dev-Crew für Marketplace/Payment-Schnittstellen",
      "Digitale Steuerkanzlei 2026 (ADDISON)",
      "Branchen: Ecom + Real Estate + Automotive + Healthcare",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "mid",
    online_first: false,
  },
  {
    id: "drude-dresden",
    name: "Steuerbüro Andrea Drude",
    city: "Dresden (2 Büros: Str. d. 17. Juni / Weißer Hirsch)",
    specs: ["ecom"],
    tagline: "DATEV-Kanzlei mit explizitem Onlineshop/FBA-Track. Dekodi-Nexus-Connector.",
    url: "https://www.steuerberater-drude-dresden.de",
    honorarHinweis: "Boutique · Skype-Beratung mit PayPal-Bezahlung möglich",
    besonders: [
      "Amazon Payment + PayPal-Workflow",
      "Plentymarkets/JTL/Afterbuy via Dekodi Nexus",
      "Fachberaterin Unternehmensnachfolge (DStV)",
      "Skype-Beratung mit PayPal",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "boutique",
    online_first: false,
  },
  {
    id: "schneider-partner",
    name: "Schneider + Partner",
    city: "Dresden HQ + Chemnitz + München",
    specs: ["holding", "international", "stiftung", "standard"],
    tagline: "Inhabergeführte Mittelstands-Kanzlei. 181 MA, ~40 Berufsträger, 2.750 Mandate.",
    url: "https://www.schneider-wp.de",
    honorarHinweis: "Mid-Market · ab 500k Umsatz typisch",
    besonders: [
      "181 MA · 40 Berufsträger · 2.750 Mandate",
      "DATEV Digitale Kanzlei 2024",
      "Healthcare/Life Science + Automotive + KMU",
      "Affiliierte Rechtsfirmen (Graf Treuhand, Mulansky, Purakon)",
    ],
    toolStack: ["datev"],
    sprachen: ["de", "en"],
    groesse: "mid",
    online_first: false,
  },
  {
    id: "ats-leipzig",
    name: "ATS Steuerberatung",
    city: "Leipzig (Kohlgartenstr. 15)",
    specs: ["standard", "kleinunternehmer"],
    tagline: "Leipziger Boutique mit explizitem Startup-Funnel. KMU + Freiberufler + Künstler.",
    url: "https://www.ats-steuerberatung.com/start-up-beratung-und-existenzgruendung",
    honorarHinweis: "Boutique · StBVV-Standard",
    besonders: [
      "KMU + Freiberufler + Künstler + Startups",
      "Lokal Leipzig-Ost",
      "Klassische Gründungsberatung (Rechtsform, Lohn)",
      "Traditionelle Boutique",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "boutique",
    online_first: false,
  },
  {
    id: "enke-jena",
    name: "ENKE Steuerberatungsgesellschaft",
    city: "Jena (Markt 22) + Remptendorf",
    specs: ["standard", "holding"],
    tagline: "Jenaer Boutique. Startups bis Mittelstand. Bundesweit per Video.",
    url: "https://www.stb-enke.de",
    honorarHinweis: "Boutique · auf Anfrage",
    besonders: [
      "Lokal Jena (PLZ 07743)",
      "Gründer- und Scaleup-Phasen",
      "Digitale Schnittstellen + Videoberatung",
      "Holdings + Mittelstand zusätzlich",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "boutique",
    online_first: false,
  },

  // ============ REGION 3: NDS / NRW-OST / HESSEN-NORD ============
  {
    id: "steuerteam-hannover",
    name: "Steuerteam Hannover",
    city: "Hannover (Vahrenwalder Str. 4)",
    specs: ["ecom", "holding"],
    tagline: "Lokales Hannover-Ecom-Team. >10 Jahre Onlinehandel. YouTube/TikTok-Content.",
    url: "https://steuerteam-hannover.de",
    honorarHinweis: "Boutique · auf Anfrage",
    besonders: [
      "Ecom + Real Estate + Nachfolge",
      "DATEV SmartExperts",
      "Active Content (YouTube/TikTok/LinkedIn)",
      "Kostenlose monatliche Webinare",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "boutique",
    online_first: false,
  },
  {
    id: "gehrke-econ",
    name: "Gehrke Econ Group",
    city: "Großraum Hannover (Isernhagen)",
    specs: ["ecom", "holding", "international"],
    tagline: "Hannover-Mid für FBA/PAN-EU/OSS. Account One + Taxdoo. 1k-40k Rechnungen/Monat.",
    url: "https://gehrke-econ.de/e-commerce",
    honorarHinweis: "Mid-Market · skaliert mit Beleg-Volumen",
    besonders: [
      "1.000 bis 40.000 Rechnungen/Monat",
      "Taxdoo + Account One + Plentymarkets/JTL/Shopware",
      "Multidisziplinär: Tax + Audit + Legal",
      "Bilingual",
    ],
    toolStack: ["datev"],
    sprachen: ["de", "en"],
    groesse: "mid",
    online_first: false,
  },
  {
    id: "boeke-partner",
    name: "Böke & Partner",
    city: "Braunschweig (Hannoversche Str. 60d)",
    specs: ["standard", "international", "holding"],
    tagline: "Braunschweig-Mid mit 'Brave Start'-Modul für Startups. DATEV Digital.",
    url: "https://boekeundpartner.de",
    honorarHinweis: "Mid-Tier · 'Brave Start'-Module mit Kosten-Transparenz",
    besonders: [
      "'Brave Start'-Startup-Programm mit Modul-Pricing",
      "DATEV Digitale Kanzlei",
      "Internationales Steuerrecht",
      "Aktiv recruiting (Wachstum)",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "mid",
    online_first: false,
  },
  {
    id: "weltz-partner-kassel",
    name: "Weltz & Partner",
    city: "Kassel (Harleshäuser Straße 76)",
    specs: ["standard", "stiftung"],
    tagline: "Handelsblatt 'Beste Steuerberater 2026' + DATEV Digital Kanzlei in Kassel.",
    url: "https://www.kassel-steuer.de",
    honorarHinweis: "Boutique · StBVV-Standard",
    besonders: [
      "Handelsblatt-Award 2026",
      "DATEV Digitale Kanzlei",
      "Digital-Scan-Buchhaltung",
      "Video-Beratung",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "boutique",
    online_first: false,
  },

  // ============ REGION 7: BAWÜ-NORD / STUTTGART ============
  {
    id: "rat-stuttgart",
    name: "RAT Rieker Audit Tax",
    city: "Stuttgart (Ulmer Str. 191) + Weissach im Tal",
    specs: ["standard", "holding"],
    tagline: "WP + StB Stuttgart-Süd. 11-50 MA. Digitale DATEV-Kanzlei 2025.",
    url: "https://rat-stuttgart.de",
    honorarHinweis: "Mid-Tier · auf Anfrage",
    besonders: [
      "Interdisziplinär Audit + Tax + Beratung",
      "DATEV Digitale Kanzlei 2x in Folge",
      "DATEV SmartExperts",
      "In b'steuern-Liste 2026 empfohlen",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "mid",
    online_first: false,
  },
  {
    id: "buerkle-partner",
    name: "Bürkle & Partner",
    city: "Esslingen am Neckar (Ottilienhof 1)",
    specs: ["standard", "stiftung"],
    tagline: "Handelsblatt 'Beste 2024' + DATEV Digitale Kanzlei seit 2019.",
    url: "https://www.steuerberater-buerkle.com",
    honorarHinweis: "Mid-Tier · auf Anfrage",
    besonders: [
      "DATEV Digitale Kanzlei 2019-2026",
      "Unternehmensnachfolge + Erbrecht",
      "Handelsblatt-ausgezeichnet 2024",
      "Stuttgart-Region (Esslingen)",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "mid",
    online_first: false,
  },
  {
    id: "hws-crypto",
    name: "HWS Crypto / HWS Gruppe",
    city: "Stuttgart (Kupferstraße 5 HQ) + Reutlingen",
    specs: ["crypto", "international", "holding", "ecom"],
    tagline: "Stuttgart-Mid mit dezidierter Crypto/Blockchain-Sparte. Praxity-Netzwerk.",
    url: "https://www.hws-crypto.de/en",
    honorarHinweis: "Mid-Market · Crypto-Pakete + Stundensätze",
    besonders: [
      "600+ MA HWS-Gruppe gesamt",
      "Eigene HWS Crypto GmbH für Blockchain/NFT/DeFi",
      "Praxity-Netzwerk (>100 Länder)",
      "Certified Crypto Finance Expert (Eichhorn)",
    ],
    toolStack: ["datev"],
    sprachen: ["de", "en"],
    groesse: "mid",
    online_first: false,
  },
  {
    id: "amz-karlsruhe",
    name: "AMZ Steuerberatung",
    city: "Karlsruhe (Karlstraße 54) + Rastatt + Leimen + Pleidelsheim",
    specs: ["holding", "us-llc", "international", "standard"],
    tagline: "Tech/KI/Digital-Startup-Spezialist. 100+ Startups-Track. Eigene Chat-App.",
    url: "https://www.startup-steuerberater-karlsruhe.de",
    honorarHinweis: "StBVV · Erstgespräch kostenfrei",
    besonders: [
      "IT/KI/digitale Geschäftsmodelle",
      "Wandeldarlehen + Förderung + Investor-Reporting",
      "Holdings + Exit-Planung",
      "Eigene AMZ-Chat-App, papierlos",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "mid",
    online_first: false,
  },
  {
    id: "kanzlei-stoll",
    name: "Kanzlei Michael Stoll",
    city: "Pforzheim + Karlsruhe",
    specs: ["standard", "kleinunternehmer"],
    tagline: "Handelsblatt-Top 7x in Folge. KMU bis 20M€/100 MA. Kostenlose Freitags-Sprechstunde.",
    url: "https://kanzlei-stoll.de",
    honorarHinweis: "Einkommensabhängige faire Preise · Erstgespräch frei",
    besonders: [
      "Handelsblatt-Award 7 Jahre in Folge",
      "Kostenlose Freitags-Sprechstunde mit Inhaber",
      "Krisenberatung + Turnaround als USP",
      "Skype/WhatsApp deutschlandweit",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "boutique",
    online_first: false,
  },

  // ============ REGION 9: FRANKEN / OBERPFALZ / BAWÜ-SÜD / THÜR-WEST ============
  {
    id: "wiba-tax",
    name: "wiba.tax",
    city: "Regensburg (Wittelsbacherstraße 12) + Röthenbach",
    specs: ["ecom", "international", "holding"],
    tagline: "DATEV Digitale Kanzlei 2025 mit explizitem SaaS/Ecom-Track.",
    url: "https://wiba.tax/digitalesteuerkanzlei",
    honorarHinweis: "Boutique · Tool-flexibel (DATEV/Lexoffice/sevDesk)",
    besonders: [
      "DATEV Digitale Kanzlei 2025 (Top <4% aller Kanzleien)",
      "Tool-flexibel: sevDesk + lexoffice + GetMyInvoices",
      "Ecom/SaaS/Online-Services/Startups/internationale Gründer",
      "2 Büros Region 9",
    ],
    toolStack: ["datev", "lexoffice", "sevdesk"],
    sprachen: ["de"],
    groesse: "boutique",
    online_first: false,
  },
  {
    id: "wirsching",
    name: "Wirsching Steuerkanzlei",
    city: "Höchberg bei Würzburg (Liebigstraße 2)",
    specs: ["ecom", "international"],
    tagline: "DATEV-Pilotkanzlei für eCommerce. >200k Buchungen/Monat. amaZervice-Netz.",
    url: "https://steuerkanzlei-wirsching.de",
    honorarHinweis: "Mid-Tier · auf Anfrage",
    besonders: [
      "DATEV-Pilotkanzlei für eCommerce",
      "Amazon FBA + PAN-EU + OSS",
      "easybill/Billbee/JTL/Plenty/Xentral",
      "amaZervice + DITAX-Netzwerke",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "mid",
    online_first: false,
  },
  {
    id: "msm-tax",
    name: "MSM TAX",
    city: "Fürth (Gustavstraße 16-18, Metropolregion Nürnberg)",
    specs: ["standard", "kleinunternehmer", "holding"],
    tagline: "Female-Founders + Sustainable Impact Startup-Boutique. Papierlos DE-weit.",
    url: "https://msm.tax",
    honorarHinweis: "Boutique · auf Anfrage",
    besonders: [
      "Female Founders + Social/Sustainable Impact",
      "Papierlose Zusammenarbeit deutschlandweit",
      "Englischsprachige Testimonials",
      "Lokal Fürth (PLZ 90762)",
    ],
    toolStack: ["datev", "lexoffice", "sevdesk"],
    sprachen: ["de", "en"],
    groesse: "boutique",
    online_first: true,
  },
  {
    id: "drpa-regensburg",
    name: "DRPA Steuerberater + Rechtsanwälte",
    city: "Regensburg (Prüfeninger Schloßstraße 2a)",
    specs: ["standard", "holding", "stiftung", "international"],
    tagline: "Regensburg-Mid mit 100+ MA. DATEV Digitale Kanzlei 2026. StB+RA unter einem Dach.",
    url: "https://www.drpa.de",
    honorarHinweis: "Mid-Market · auf Anfrage",
    besonders: [
      "100+ MA: 9 StB + 9 RA + 2 WP",
      "DATEV Digitale Kanzlei 2026",
      "Multidisziplinär StB + Anwälte",
      "Mittelstand + Startup-Beratung",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "mid",
    online_first: false,
  },
  {
    id: "zahlenwerk-bayreuth",
    name: "Zahlenwerk Steuerberatung",
    city: "Bayreuth (Nürnberger Straße 104)",
    specs: ["standard"],
    tagline: "Bayreuth-Boutique mit Startup-Schwerpunkt. Mandanten bundesweit.",
    url: "https://zahlenwerk-stb.de",
    honorarHinweis: "Boutique · auf Anfrage",
    besonders: [
      "Eigene Mandantencloud 'Wolke' + DATEV Unternehmen Online",
      "Modern/digital/zukunftsorientiert positioniert",
      "Mandanten bundesweit (Kulmbach, Bamberg, Berlin, München)",
      "Lokal Bayreuth (PLZ 95448)",
    ],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "boutique",
    online_first: false,
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
  {
    name: "Ecovis (Hamburg + andere Standorte)",
    reason:
      "Netzwerk-/Lizenz-Modell ähnlich ETL-Franchise. 90+ Länder mit lizenzierten Standorten → Qualität pro Standort stark schwankend. Bei Gründer-Mandaten zu inkonsistent.",
    source: "Recherche Hamburg-Pool (Mai 2026)",
  },
  {
    name: "Dr. Lüders & Partner (Hamburg)",
    reason:
      "Dokumentierte Trustlocal-Reviews zu schlechter Erreichbarkeit (Mandant: '30+ Anrufe nötig' bis StE-Lieferung). Für Solos/Gründer wo Reaktionsgeschwindigkeit kritisch ist nicht empfehlenswert.",
    source: "Trustlocal-Reviews Mai 2026",
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
 * DE-PLZ → Region-Bucket (erste 1-2 Ziffern).
 * Quelle: Deutsche-Post-PLZ-Leitzone.
 */
type Region =
  | "ost-sachsen"
  | "berlin-brandenburg"
  | "hamburg-nord"
  | "niedersachsen-west"
  | "nrw-mitte"
  | "nrw-sued"
  | "hessen-frankfurt"
  | "bawue-stuttgart"
  | "bayern-muenchen"
  | "bayern-bawue-sued";

const REGION_LABELS: Record<Region, string> = {
  "ost-sachsen": "Ost (Sachsen / Thüringen)",
  "berlin-brandenburg": "Berlin / Brandenburg",
  "hamburg-nord": "Hamburg / Schleswig-Holstein / Niedersachsen-Nord",
  "niedersachsen-west": "Niedersachsen / Hessen-Nord",
  "nrw-mitte": "NRW Mitte (Köln / Düsseldorf / Dortmund)",
  "nrw-sued": "NRW Süd (Bonn / Aachen)",
  "hessen-frankfurt": "Hessen / Frankfurt",
  "bawue-stuttgart": "Baden-Württemberg Nord (Stuttgart)",
  "bayern-muenchen": "Bayern Süd (München)",
  "bayern-bawue-sued": "Bayern Nord / BaWü Süd",
};

const PLZ_TO_REGION: Region[] = [
  "ost-sachsen", // 0xxxx
  "berlin-brandenburg", // 1xxxx
  "hamburg-nord", // 2xxxx
  "niedersachsen-west", // 3xxxx
  "nrw-mitte", // 4xxxx
  "nrw-sued", // 5xxxx
  "hessen-frankfurt", // 6xxxx
  "bawue-stuttgart", // 7xxxx
  "bayern-muenchen", // 8xxxx
  "bayern-bawue-sued", // 9xxxx
];

/** Benachbarte Regionen für Soft-Match (+10 statt +20). */
const NEIGHBOR_REGIONS: Record<Region, Region[]> = {
  "ost-sachsen": ["berlin-brandenburg", "bayern-bawue-sued"],
  "berlin-brandenburg": ["ost-sachsen", "hamburg-nord", "niedersachsen-west"],
  "hamburg-nord": ["berlin-brandenburg", "niedersachsen-west"],
  "niedersachsen-west": ["hamburg-nord", "berlin-brandenburg", "nrw-mitte", "hessen-frankfurt"],
  "nrw-mitte": ["nrw-sued", "niedersachsen-west", "hessen-frankfurt"],
  "nrw-sued": ["nrw-mitte", "hessen-frankfurt"],
  "hessen-frankfurt": ["niedersachsen-west", "nrw-sued", "bawue-stuttgart", "bayern-bawue-sued"],
  "bawue-stuttgart": ["hessen-frankfurt", "bayern-muenchen", "bayern-bawue-sued"],
  "bayern-muenchen": ["bawue-stuttgart", "bayern-bawue-sued"],
  "bayern-bawue-sued": ["bayern-muenchen", "bawue-stuttgart", "ost-sachsen"],
};

export const plzToRegion = (plz: string): Region | null => {
  const digit = plz.trim().match(/^\d/)?.[0];
  if (!digit) return null;
  return PLZ_TO_REGION[parseInt(digit, 10)] ?? null;
};

export const regionLabel = (r: Region): string => REGION_LABELS[r];

/**
 * Mapping: StB.city-String → Liste von Regionen die abgedeckt sind.
 * Multi-Office-Kanzleien decken mehrere Regionen ab.
 * Heuristisch via Substring-Match auf bekannte Städte.
 */
// Mapping nach echter PLZ-Realität (erste Ziffer der PLZ).
// Jede Kanzlei-City kann mehreren Regionen zugeordnet sein (Multi-Office).
const CITY_TO_REGION: { match: RegExp; region: Region }[] = [
  // 0xxxx — Sachsen / Thüringen / Sachsen-Anhalt-Süd
  { match: /Dresden|Leipzig|Chemnitz|Halle|Magdeburg-Süd|Dessau|Zwickau|Plauen/i, region: "ost-sachsen" },

  // 1xxxx — Berlin / Brandenburg / Meck-Pomm
  { match: /Berlin|Potsdam|Brandenburg|Rostock|Schwerin|Neubrandenburg/i, region: "berlin-brandenburg" },

  // 2xxxx — Hamburg / SH / Nds-Nord / Bremen
  { match: /Hamburg|Lübeck|Luebeck|Kiel|Bremen|Oldenburg|Lüneburg|Lueneburg|Itzehoe|Flensburg|Cuxhaven|Stade/i, region: "hamburg-nord" },

  // 3xxxx — Nds-Mitte/Süd / NRW-Ost / Hessen-Nord / Sachsen-Anhalt-Nord
  { match: /Hannover|Bielefeld|Paderborn|Kassel|Göttingen|Goettingen|Wolfsburg|Braunschweig|Magdeburg|Fulda|Marburg|Hildesheim/i, region: "niedersachsen-west" },

  // 4xxxx — NRW-Mitte (Rhein-Ruhr) + Münster + Osnabrück
  { match: /Düsseldorf|Duesseldorf|Köln|Koeln|Dortmund|Essen|Wuppertal|Oberhausen|Mülheim an der Ruhr|Muelheim an der Ruhr|Mönchengladbach|Moenchengladbach|Recklinghausen|Münster|Muenster|Osnabrück|Osnabrueck|Duisburg|Bochum|Hagen|Solingen|Krefeld|Bocholt/i, region: "nrw-mitte" },

  // 5xxxx — NRW-Süd / Rheinland-Pfalz / Saarland
  { match: /Bonn|Aachen|Siegen|Koblenz|Trier|Mülheim-Kärlich|Muelheim-Kaerlich|Mainz|Saarbrücken|Saarbruecken|Kaiserslautern/i, region: "nrw-sued" },

  // 6xxxx — Hessen-Süd / RP-Nord / BaWü-Nord
  { match: /Frankfurt|Wiesbaden|Darmstadt|Offenbach|Hanau|Mannheim|Heidelberg|Worms|Ludwigshafen|Heilbronn/i, region: "hessen-frankfurt" },

  // 7xxxx — BaWü-Nord / Stuttgart-Region
  { match: /Stuttgart|Karlsruhe|Pforzheim|Aalen|Tübingen|Tuebingen|Reutlingen|Esslingen|Böblingen|Boeblingen|Ravensburg/i, region: "bawue-stuttgart" },

  // 8xxxx — Bayern-Süd / München / Schwaben
  { match: /München|Muenchen|Augsburg|Ingolstadt|Rosenheim|Passau|Landshut|Memmingen|Kempten/i, region: "bayern-muenchen" },

  // 9xxxx — Bayern-Nord / Franken / Oberpfalz / BaWü-Süd / Thüringen-West
  // Word-Boundaries für Kurzform-Städte (Ulm/Hof/Jena) damit Ulmer-Str/Ottilienhof/Jenaer-Allee nicht falsch matchen
  { match: /Nürnberg|Nuernberg|Regensburg|Würzburg|Wuerzburg|Bayreuth|Erlangen|Erfurt|\bJena\b|\bUlm\b|Freiburg|Konstanz|Bamberg|\bHof\b/i, region: "bayern-bawue-sued" },

  // Spezial: "Remote DE-weit" / "DE-weit" → KEINE Region zugeordnet (online_first-Flag deckt das ab)
];

const stbRegions = (cityField: string): Region[] => {
  const found = new Set<Region>();
  CITY_TO_REGION.forEach(({ match, region }) => {
    if (match.test(cityField)) found.add(region);
  });
  return Array.from(found);
};

/** Coverage-Statistik pro Region: wie viele Kanzleien deckt jede Region ab + Online-Anteil. */
export const regionCoverage = (
  region: Region,
): { local: number; neighbor: number; online: number; total: number } => {
  let local = 0;
  let neighbor = 0;
  let online = 0;
  STB_POOL.forEach((stb) => {
    const regs = stbRegions(stb.city);
    if (regs.includes(region)) local++;
    else if (regs.some((r) => NEIGHBOR_REGIONS[region]?.includes(r))) neighbor++;
    if (stb.online_first) online++;
  });
  return { local, neighbor, online, total: STB_POOL.length };
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

  const userRegion = briefing.plz ? plzToRegion(briefing.plz) : null;

  const scored = pool.map((stb) => {
    let score = 0;
    const reasons: string[] = [];

    // Spezialisierungs-Match: 50 Punkte max
    const tagOverlap = briefing.spezialTags.filter((t) => stb.specs.includes(t)).length;
    if (tagOverlap > 0) {
      score += Math.min(50, tagOverlap * 25);
      reasons.push(`${tagOverlap} Spezial-Tag${tagOverlap > 1 ? "s" : ""}-Treffer`);
    }

    // Region-Match basierend auf PLZ: 25 Punkte direkt, 12 für Nachbar-Region
    if (userRegion) {
      const stbRegs = stbRegions(stb.city);
      if (stbRegs.includes(userRegion)) {
        score += 25;
        reasons.push(`Standort in deiner Region (${regionLabel(userRegion)})`);
      } else if (stbRegs.some((r) => NEIGHBOR_REGIONS[userRegion]?.includes(r))) {
        score += 12;
        reasons.push("Nachbar-Region erreichbar");
      } else if (stb.online_first) {
        // Online-Kanzlei: Distance egal — kein Region-Bonus, aber auch kein Malus
      } else {
        // Lokale Kanzlei in fremder Region → Malus, sonst wuppertal-1st bei HH-User
        score -= 8;
      }
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
