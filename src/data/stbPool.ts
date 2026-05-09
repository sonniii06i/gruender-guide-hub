// Kuratierte StB-Specialist-Liste — öffentlich bekannte Brands ohne Affiliate.
// Stand 2025/2026. KEIN Vermittlungs-Modell — User schickt Anfrage selbst.
// Liste ist redaktionell, keine Garantie für Eignung oder aktuelle Aufnahme-Kapazität.

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
};

export const STB_POOL: StbProfile[] = [
  {
    id: "winheller",
    name: "Winheller",
    city: "Frankfurt",
    specs: ["crypto", "international", "ip-box"],
    tagline: "Crypto-Steuer-Branchenstandard. Partner von CoinTracking, Blockpit, Koinly. Auch DAC8 + DeFi-Pools.",
    url: "https://www.winheller.com",
    honorarHinweis: "Crypto-StE ab 595 € · Stundensätze 125-500 € · Auslandsmandate frei verhandelbar",
    besonders: ["§23 EStG FIFO + Verlängerung bei Staking", "DAC8-Reporting ab 2026", "DeFi-Pools, NFTs, DAOs", "MiCAR-Compliance"],
    toolStack: ["egal"],
    sprachen: ["de", "en"],
    groesse: "mid",
  },
  {
    id: "pandotax",
    name: "Pandotax",
    city: "Hamburg",
    specs: ["ecom", "international", "lohn"],
    tagline: "E-Commerce-Steuer-Spezialisten. OSS, FBA-Pan-EU, Marketplace-Facilitator-Tax-Logik.",
    url: "https://pandotax.de",
    honorarHinweis: "GmbH bis 1M Umsatz: 7-14k €/Jahr · ab 200k Umsatz Pauschale-pro-Beleg-Modell üblich",
    besonders: ["Amazon FBA EU-7-Länder-Setup", "Shopify-Settlement-Buchführung", "OSS-Quartals-Meldung", "Reverse-Charge §13b für IT/FR/ES/NL"],
    toolStack: ["datev", "lexoffice"],
    sprachen: ["de", "en"],
    groesse: "boutique",
  },
  {
    id: "specht-partner",
    name: "Specht & Partner",
    city: "Lübeck",
    specs: ["ecom", "kleinunternehmer", "standard"],
    tagline: "Bekannter E-Com-StB-Hub für Online-Handel-Gründer. PayJoe-/Taxdoo-Workflow.",
    url: "https://www.specht-partner.de",
    honorarHinweis: "EÜR ab 1.500 € · GmbH ab 6.000 € · Pauschale + Beleg-Aufschlag bei E-Com",
    besonders: ["Amazon-Buchungstexte (130+ Codes)", "Shopify-Stripe-Klarna-Auflösung", "Kleinunternehmer-zu-Regelbesteuerer-Übergang"],
    toolStack: ["datev", "lexoffice"],
    sprachen: ["de"],
    groesse: "boutique",
  },
  {
    id: "llc-steuerberater",
    name: "LLC-Steuerberater (Becker International)",
    city: "Berlin / Remote",
    specs: ["us-llc", "international", "holding"],
    tagline: "Spezialisiert auf US-LLCs aus DE-Sicht. 5472, 1120, BOI-Filing, Substance-Strategie.",
    url: "https://llc-steuerberater.de",
    honorarHinweis: "150 €/h StB + 100 €/h Fachpersonal · Mandats-Pauschalen verhandelbar · Auslandsmandate frei",
    besonders: ["§AStG Hinzurechnungsbesteuerung-Berechnung", "DBA-Anrechnung US-Quellensteuer", "EIN + BOI + 5472-Filing-Begleitung", "ATAD III-Substance-Aufbau"],
    toolStack: ["egal"],
    sprachen: ["de", "en"],
    groesse: "boutique",
  },
  {
    id: "wts",
    name: "WTS Group",
    city: "München / Düsseldorf / Frankfurt / Berlin",
    specs: ["international", "holding", "us-llc", "hk-ltd", "ip-box"],
    tagline: "Multi-disciplinary Tax-Boutique. International + Verrechnungspreise + Cross-Border M&A.",
    url: "https://www.wts.com/de",
    honorarHinweis: "Enterprise-Niveau · Stundensatz 250-500 €/h · Mandats-Mindestgröße ab ~5M Umsatz typisch",
    besonders: ["Holding-Konstrukte multi-jurisdiction", "Verrechnungspreis-Dokumentation", "DAC6/DAC8/Pillar-2", "Hong Kong + Singapore + Switzerland aus DE"],
    toolStack: ["datev"],
    sprachen: ["de", "en"],
    groesse: "enterprise",
  },
  {
    id: "ebner-stolz",
    name: "Ebner Stolz",
    city: "Stuttgart / 14 weitere DE-Standorte",
    specs: ["holding", "international", "stiftung", "ip-box"],
    tagline: "Top-15-WP/StB-Gesellschaft DE. Holding + JA + Konzernrechnung. Mid-Market-Standard.",
    url: "https://www.ebnerstolz.de",
    honorarHinweis: "Mandats-Mindestgröße ~1-2M Umsatz · Stundensätze 200-400 €",
    besonders: ["§8b KStG Holding-Konstrukte", "Konzern-Reporting + IFRS", "Familien-Pool / Stiftungs-Konstrukte", "M&A-Begleitung"],
    toolStack: ["datev"],
    sprachen: ["de", "en"],
    groesse: "enterprise",
  },
  {
    id: "rsm",
    name: "RSM Ebner Stolz Mönning Bachem",
    city: "Düsseldorf / Köln / Hamburg",
    specs: ["international", "holding", "ecom", "lohn"],
    tagline: "Mid-Market-Network mit International + ECom-Track. Eigene IT-Steuer-Beratung.",
    url: "https://www.rsm.global/germany",
    honorarHinweis: "Mid-Market · Mandate ab 500k-1M Umsatz · Pauschalen verbreitet",
    besonders: ["Cross-Border-Buchhaltung", "Lohn-Outsourcing", "DSGVO + IT-Steuer", "Audit + StB integriert"],
    toolStack: ["datev"],
    sprachen: ["de", "en"],
    groesse: "enterprise",
  },
  {
    id: "datev-smartexperts",
    name: "DATEV SmartExperts (Verzeichnis)",
    city: "DE-weit",
    specs: ["standard", "lohn", "ecom", "international"],
    tagline: "Genossenschaftliches Verzeichnis aller DATEV-Kanzleien. Filter nach PLZ + Spezialisierung.",
    url: "https://www.smartexperts.de",
    honorarHinweis: "Bandbreite je Kanzlei · StBVV-typisch · Pauschalen verbreitet",
    besonders: ["Größtes DATEV-Mitglieder-Pool (40k+)", "PLZ-Suche + Spezial-Filter", "Tech-Stack DATEV-Cloud-Standard"],
    toolStack: ["datev"],
    sprachen: ["de"],
    groesse: "mid",
  },
  {
    id: "stbk-suche",
    name: "Steuerberaterkammer-Suche",
    city: "DE-weit (16 Kammern)",
    specs: ["standard", "kleinunternehmer", "lohn"],
    tagline: "Offizieller Verzeichnis-Service der Steuerberaterkammern. Kostenlos. Kein Marketing-Layer.",
    url: "https://steuerberaterkammer-berlin.de/steuerberatersuche",
    honorarHinweis: "StBVV-Standard · Honorar je Kanzlei",
    besonders: ["Volle Liste regionaler StBs", "Kein Affiliate, kein Marketing-Layer", "Suche nach PLZ + Tätigkeitsschwerpunkt"],
    toolStack: ["egal"],
    sprachen: ["de"],
    groesse: "boutique",
  },
  {
    id: "kkp",
    name: "KKP Steuerberatung",
    city: "Berlin",
    specs: ["standard", "ecom", "lohn", "kleinunternehmer"],
    tagline: "Berlin-Boutique mit Tech-Affinität. Lexoffice-Workflow. Gründer-Mandate-Schwerpunkt.",
    url: "https://www.kkp-steuerberatung.de",
    honorarHinweis: "EÜR 1.500-3.000 € · Pauschalen ab Tag 1 · Lexoffice-bevorzugt",
    besonders: ["100% Lexoffice/sevDesk-Workflow", "Gründer-Spezial-Beratung", "Schnelle Reaktionszeit (Slack üblich)"],
    toolStack: ["lexoffice", "sevdesk"],
    sprachen: ["de"],
    groesse: "boutique",
  },
  {
    id: "kanzlei-mehmedovic",
    name: "Mehmedović & Partner",
    city: "München",
    specs: ["holding", "international", "ecom", "ip-box"],
    tagline: "München-Boutique. Holding-Konstrukte + EU-Alternativen + IP-Box-Setups.",
    url: "https://www.mehmedovic-partner.de",
    honorarHinweis: "Mid-Tier · Holdings ab 12k €/Jahr · Stundensatz ~200 €",
    besonders: ["§22 UmwStG Sperrfristen", "Estonian OÜ aus DE-Sicht", "IP-Verlagerung NL/IE/HU", "FlexCo Österreich"],
    toolStack: ["datev"],
    sprachen: ["de", "en"],
    groesse: "boutique",
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

/**
 * Match-Algorithm: 3-StB-Empfehlung basierend auf Briefing-Tags + Größe.
 * Score 0-100. Spezialisierungs-Match ist wichtigster Faktor.
 */
export const matchStbs = (briefing: Briefing): { stb: StbProfile; score: number; reason: string }[] => {
  const scored = STB_POOL.map((stb) => {
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

    // Standard-Bonus für sehr generische Anfragen ohne Spezial-Tags
    if (briefing.spezialTags.length === 0 && stb.specs.includes("standard")) {
      score += 30;
      reasons.push("Standard-Gründer-Mandat-Track");
    }

    return { stb, score, reason: reasons.join(" · ") || "Allgemeine Eignung" };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, 6); // Top 6, User wählt 3
};
