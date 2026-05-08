// Echte Multi-Jurisdiktions-Holding-Konstrukte als Beispiele.
// Quellen: öffentlich einsehbar (Handelsregister, Pressemeldungen, akademische Case Studies).

export type RealStructure = {
  slug: string;
  name: string;
  emoji: string;
  family: string;
  description: string;
  /** ASCII-Diagramm. */
  diagram: string;
  whyThisWorks: string[];
  taxLogic: string;
  /** Was DACH-Founder davon lernen können. */
  takeaway: string;
};

export const REAL_STRUCTURES: RealStructure[] = [
  {
    slug: "luxembourg-spf-cluster",
    name: "Luxembourg SPF + Sàrl-Cluster (Family-Office-Klassiker)",
    emoji: "🇱🇺",
    family: "Family-Office / UHNW-Privatperson",
    description:
      "Typisches Multi-Vehikel-Konstrukt für vermögende Familien: ein SPF hält das passive Vermögen (Aktien, Anleihen, ETFs, Edelmetalle), während mehrere Sàrl + S.A. operative Tochter-Geschäfte führen. Wie z.B. die DeBa Group SPF (Vincent Mayer-Konstrukt mit MV Consulting Services, Riosantos Luxembourg, Cynthia Infrastructures, Strategic Fintech Investments S.A.).",
    diagram: `
   👤👤 Familienmitglieder (mehrere Generationen)
         │
         ▼
   📜 SPF (Vermögensverwaltungs-Hülle, 0 % KSt + 0,25 % Sub-Tax)
         │
         ├──► 🏛️ Soparfi 1 (Beteiligungs-Holding)
         │        │
         │        ├──► 🏭 Op-Sàrl A (Consulting/Services)
         │        ├──► 🏭 Op-S.A. B (Investments/Real Estate)
         │        └──► 🏭 Op-Sàrl C (Tech/Fintech)
         │
         ├──► 🏛️ Soparfi 2 (separate Risikoklasse)
         │        └──► 🏭 Op-Gesellschaft D
         │
         └──► 💰 Direkt-Investments (ETFs, Anleihen, Edelmetalle)
    `.trim(),
    whyThisWorks: [
      "**SPF**: 0 % Steuer auf Aktien-/Anleihen-Erträge → langfristiger Vermögensaufbau",
      "**Soparfi**: 100 % Beteiligungs-Befreiung + EU-Mutter-Tochter → operative Töchter steueroptimal",
      "**Mehrere Op-Gesellschaften**: Risiko-Trennung pro Branche (Insolvenz einer trifft andere nicht)",
      "**LU-Domiciliation**: stabile Rechtsprechung, EU-konform, hohe Diskretion",
    ],
    taxLogic:
      "SPF kassiert steuerfrei Dividenden aus Soparfi (kein Mutter-Tochter zwingend, weil 0 % CIT in SPF). Soparfi kassiert 100 % befreit Dividenden aus Op-Töchtern (Participation Exemption ≥ 10 %). Op-Töchter zahlen 24,94 % CIT auf ihren Op-Gewinn. Bei Reinvestition in der Soparfi: optimal. Bei privater Entnahme aus SPF: Quellensteuer-Frage je Empfänger-Land.",
    takeaway:
      "DACH-Founder lernen: Bei privatem Vermögen > 5 Mio + aktiven Beteiligungen + Generationen-Planung → LU-Cluster oft besser als reine DE-Holding. ABER: §AStG-Risiko bei DE-Wohnsitz ist real — Konstrukt funktioniert sauber nur bei Wegzug aus DE oder bei Familie mit echter LU/BE/NL-Substanz.",
  },

  {
    slug: "shopify-aggregator-multi",
    name: "D2C-Aggregator-Multi-Jurisdiktion (Razor-Group-Style)",
    emoji: "🛍️",
    family: "VC-finanzierter Brand-Aggregator",
    description:
      "Klassische Razor Group / Stryze / Berlin Brands Group-Architektur: Top-Holding in DE oder NL für VC-Money, Sub-Holdings in NL/IE für IP-Verwaltung, operative GmbHs in DE für DACH-Markt, weitere Töchter in UK/US/AT für regionale Verkäufe.",
    diagram: `
   👥 Founder + VC-Investoren
         │
         ▼
   🏛️ Top-Holding (DE oder NL — investor-ready)
         │
         ├──► 🇳🇱 NL BV (IP-Holding, Innovation Box 9 %)
         │       └──► hält Marken, Software, Patente
         │
         ├──► 🇩🇪 Op-GmbH DE (DACH-Vertrieb)
         ├──► 🇦🇹 Op-GmbH AT (AT-Markt)
         ├──► 🇬🇧 Op-Ltd UK (UK-Markt + Brexit-Compliance)
         ├──► 🇺🇸 Op-LLC US (US-Markt + Wyoming/Delaware)
         └──► 🇪🇪 Estland OÜ (digitale Marketing-Services, 0 % thesauriert)
    `.trim(),
    whyThisWorks: [
      "**IP-Trennung in NL**: Lizenzgebühren reduzieren operative Gewinne, Innovation Box 9 % auf qualifizierten IP",
      "**Pro Markt eigene Op-Gesellschaft**: Compliance-Trennung, Brexit-fähig, US-Sales-Tax-konform",
      "**Top-Holding investor-friendly**: VCs verstehen DE-/NL-Strukturen, Cap-Table sauber",
      "**Estland für Marketing**: Digital-Nomad-Team kann via OÜ rechnen, 0 % auf reinvestierte Gewinne",
    ],
    taxLogic:
      "IP-Lizenzen (z.B. 5 % Umsatz) fließen aus Op-Gesellschaften in NL-IP-Holding → reduzieren Op-Steuer-Last, Lizenzgebühren in NL mit Innovation Box 9 % statt 25,8 %. Mutter-Tochter-RL: 0 % Quellensteuer zwischen EU-Töchtern. Bei Exit: Top-Holding verkauft Op-Gesellschaften mit §8b (DE) bzw. Participation Exemption (NL) → 95–100 % steuerfrei.",
    takeaway:
      "DACH-Founder mit Multi-Country-Vertrieb lernen: Es geht nicht um 'eine Lieblings-Steueroase', sondern um SAUBERE TRENNUNG nach Funktion (IP / Vertrieb / Marketing) und Markt. Substance pro Land + Verrechnungspreis-Studien sind Pflicht. Setup-Kosten 30–80 k €, lohnt ab ~5 Mio Umsatz.",
  },

  {
    slug: "vc-startup-double",
    name: "VC-Startup Doppel-Holding (Personio / Forto / Razor-Style)",
    emoji: "🚀",
    family: "VC-Startup pre-IPO",
    description:
      "Standard bei deutschen VC-Deals (HV, Project A, Earlybird). Founder bauen VOR dem ersten Term-Sheet ihre Founder-Holdings auf, um beim späteren Exit das Schachtelprivileg zu nutzen.",
    diagram: `
   👤 Founder 1     👤 Founder 2     👥 VC-Investor
       │ 100 %           │ 100 %           │ 100 %
       ▼                 ▼                 ▼
   🏛️ F1-Holding    🏛️ F2-Holding    🏛️ VC-Holding (Cayman/LU/NL)
       │ 30 %            │ 30 %            │ 40 %
       └──────►   🏭 Op-GmbH (Startup)   ◄──────┘
                       │
                       └──► 🇺🇸 US-Inc (Tochter für US-Markt)
    `.trim(),
    whyThisWorks: [
      "**Founder-Holdings VOR Term-Sheet**: bei späterem Exit profitieren beide Founder gleich vom Schachtelprivileg (95 % steuerfrei)",
      "**VC-Holding separat**: oft Cayman-/Delaware-Vehikel für Fonds-Strukturierung, ändert nichts am DE-Setup",
      "**US-Inc als Tochter**: für USD-Geschäft, US-Banking, Investor-Vertrauen",
    ],
    taxLogic:
      "Bei 100 Mio € Exit: Founder-Anteil 30 Mio über Holding besteuert: nur 5 % steuerpflichtig × 30 % = 450 k € Steuer. Privat-Verkauf wäre §17 EStG mit Teileinkünfteverfahren: 60 % × 42 % = 7,56 Mio € Steuer. Differenz pro Founder: ~7 Mio € Ersparnis.",
    takeaway:
      "DACH-VC-Startups MÜSSEN Founder-Holdings VOR dem ersten Term-Sheet aufsetzen — sonst läuft die 7-Jahres-Sperrfrist UmwStG erst ab späterem Setup. Standard-Anwalt für VC-Deals (z.B. CMS, Hengeler, Gleiss Lutz) macht das routinemäßig.",
  },

  {
    slug: "estonian-digital-nomad",
    name: "Estland-Solo-Setup (Digital Nomad / Solo-Consultant)",
    emoji: "🇪🇪",
    family: "Solo-Founder / Remote-Worker",
    description:
      "Schlankstes Setup für Solo-Consultants, Software-Entwickler, Remote-Worker. Estland OÜ via e-Residency + Service-Provider wie Xolo. 0 % Steuer auf reinvestierte Gewinne, 22 % nur bei Privat-Entnahme.",
    diagram: `
   👤 Solo-Founder (digitaler Nomade)
         │ 100 %
         ▼
   🇪🇪 Estland OÜ
         │
         ├──► Software / Consulting / Affiliate-Geschäft
         ├──► Reinvest in: Aktien, ETF, Crypto (0 % Steuer)
         └──► Auszahlung an Founder (22 % bei Ausschüttung)
    `.trim(),
    whyThisWorks: [
      "**0 % Steuer auf Thesaurierung** = exponentielles Compounding ohne Steuer-Belastung",
      "**Setup in 5 Tagen**: e-Residency + Online-Gründung",
      "**Service-Provider macht alles**: Xolo Go für 79 €/Mon nimmt Buchhaltung + Compliance ab",
      "**Bank**: Wise Business + LHV / Revolut funktioniert remote",
    ],
    taxLogic:
      "Während du in DE wohnst: Vorsicht §AStG (passive Einkünfte werden hinzugerechnet). Bei Wegzug aus DE in Niedrig-/Pauschal-Steuer-Land (z.B. Dubai mit 0 %, Portugal NHR ~20 %, Spanien Beckham-Law 24 %, Zypern 60-Tage-Regel) wird OÜ steuerlich zur 'Black Box': 0 % auf Reinvest, 22 % nur bei Auszahlung.",
    takeaway:
      "Solo-Founder mit < 200 k Gewinn + Reinvest-Fokus: Estland OÜ ist mit Abstand schlankste Lösung. ABER: bei DE-Wohnsitz funktioniert das nur als zusätzliches Konstrukt, nicht als 'Steuer-Vermeidung' — § AStG schlägt zu. Funktioniert sauber nach Wegzug.",
  },

  {
    slug: "swiss-zug-holding",
    name: "Schweizer Zug-Holding (Crypto-/Trading-Setup)",
    emoji: "🇨🇭",
    family: "Crypto-Founder / Trader / Vermögende DACH-Familie",
    description:
      "Klassisches CH-Setup mit Sitz in Kanton Zug (11,9 % effektive Steuer). Wird genutzt von Crypto-Founders, Trading-Firmen, vermögenden DACH-Familien die nach CH umziehen. Echte Substanz Pflicht.",
    diagram: `
   👤 Founder (Wohnsitz CH, z.B. Zug oder Schwyz)
         │ 100 %
         ▼
   🇨🇭 Holding GmbH oder AG (Zug, 11,9 % Steuer)
         │
         ├──► 🇨🇭 Op-AG (Trading/Crypto/Beratung)
         ├──► 🇨🇭 IP-Holding (Patente, Marken)
         └──► 💰 Investment-Portfolio (Aktien, Crypto, Immo)
    `.trim(),
    whyThisWorks: [
      "**11,9 % Effektivsteuer** — niedrigster Satz in Westeuropa",
      "**0 % Erbschaftssteuer** zwischen Familienmitgliedern in vielen Kantonen",
      "**Privacy + Stabilität**: politisch + wirtschaftlich extrem stabil",
      "**Pauschalbesteuerung möglich**: für Non-CH-Bürger ohne Erwerbstätigkeit in CH (~150 k CHF/Jahr Pauschale, kein Welt-Einkommen-Tax)",
    ],
    taxLogic:
      "Bei echtem Wohnsitz-Wechsel nach CH: keine deutsche Steuerpflicht mehr (außer bei §6 AStG Wegzugsbesteuerung). CH-Holding mit lokalem GF + Substanz: 11,9 % auf Op-Gewinn + Schachtelprivileg-ähnlich auf Beteiligungen. Bei Verkauf: privater Verkauf einer CH-AG > 1 % Beteiligung ist KSt-frei (anders als DE §17 EStG)!",
    takeaway:
      "Echtes CH-Setup ist ein WEGZUGS-Setup. Wer DE-Wohnsitz behält + nur Mailbox-CH-AG: BMF schlägt zu. Aber bei echtem Wegzug (mind. 6 Monate/Jahr in CH, lokale Tätigkeit, etc.) ist CH steuerlich extrem attraktiv — vor allem bei Crypto/Aktien-Veräußerungen (privat 0 % statt 26 % AbgSt).",
  },
];
