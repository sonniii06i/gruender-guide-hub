// Gründer-Gruppen für StB-Hand-off — Stand Mai 2026
// Jede Gruppe hat eigene Pflichtfelder (was der StB im Erstgespräch wissen muss)
// + Beispiel-Pain-Points (Trick-Fragen die den Spezialisten vom Generalisten trennen)
// + Match-Tags (welche StB-Spezialisierung passt)

import type { StbSpecTag } from "./stbPool";

export type GruppenId =
  | "solo-freiberufler"
  | "ug-gmbh-regular"
  | "ecom-d2c"
  | "holding"
  | "international"
  | "crypto"
  | "saas-digital"
  | "lohn-mitarbeiter"
  | "fae-forschung"
  | "stiftung-pool";

export type FeldType =
  | { type: "text"; placeholder?: string }
  | { type: "number"; placeholder?: string; min?: number }
  | { type: "select"; options: string[] }
  | { type: "multiselect"; options: string[] }
  | { type: "yesno" }
  | { type: "textarea"; placeholder?: string };

export type Pflichtfeld = {
  key: string;
  label: string;
  hint?: string;
  field: FeldType;
};

export type Gruppe = {
  id: GruppenId;
  name: string;
  emoji: string;
  /** Wer in diese Gruppe gehört. */
  beschreibung: string;
  /** Auto-Match auf StB-Spezialisierungs-Tags. */
  matchTags: StbSpecTag[];
  /** Felder die der StB beim Erstgespräch BRAUCHT (Briefing-Pflicht). */
  pflichtfelder: Pflichtfeld[];
  /** Beispiel-Pain-Points: Trick-Fragen die den Spezialisten outen. */
  beispielPainPoints: string[];
  /** Was diese Gruppe regulatorisch besonders macht. */
  regulatorischeBesonderheiten: string[];
};

export const GRUPPEN: Gruppe[] = [
  {
    id: "solo-freiberufler",
    name: "Solo / Freiberufler / Einzelunternehmer",
    emoji: "👤",
    beschreibung: "Selbstständig ohne GmbH/UG. EÜR, evtl. Kleinunternehmer §19 UStG.",
    matchTags: ["standard", "kleinunternehmer"],
    pflichtfelder: [
      {
        key: "taetigkeitsart",
        label: "Tätigkeitsart",
        hint: "Freiberufler = kein Gewerbeschein, kein GewSt; Gewerbe = mit Gewerbeschein + GewSt",
        field: { type: "select", options: ["Freiberufler (Katalogberuf §18 EStG)", "Gewerbe (mit Gewerbeschein)", "Mischtätigkeit", "Unklar"] },
      },
      {
        key: "kleinunternehmer",
        label: "Kleinunternehmer §19 UStG?",
        hint: "Reform 2025: 25k Vorjahr / 100k laufendes Jahr (vorher 22k/50k)",
        field: { type: "select", options: ["Ja, aktuell §19", "Nein, regelbesteuert", "Will wechseln", "Unklar"] },
      },
      {
        key: "ist-soll",
        label: "IST- oder SOLL-Versteuerung?",
        hint: "IST = USt erst bei Zahlungseingang fällig (Liquiditäts-Vorteil; Schwelle ≤800k Vorjahresumsatz)",
        field: { type: "select", options: ["IST-Versteuerung §20 UStG", "SOLL-Versteuerung", "Will wechseln", "Unklar"] },
      },
      {
        key: "berufskammer",
        label: "Berufskammer (falls Freiberufler)",
        hint: "z.B. Anwaltskammer, Ärztekammer, Steuerberaterkammer — manche StB haben Kammer-Erfahrung",
        field: { type: "text", placeholder: "z.B. RAK, BAK, keine" },
      },
      {
        key: "private-krankenversicherung",
        label: "Krankenversicherung (für ESt-Erklärung)",
        field: { type: "select", options: ["GKV (Pflicht)", "PKV (privat)", "Familienversichert", "Sonderfall"] },
      },
    ],
    beispielPainPoints: [
      "Wie buchst du Bewirtungsbelege mit unterschiedlichen Anlässen (Mandant vs. Mitarbeiter vs. eigene Verpflegung)?",
      "Kleinunternehmer-Reform 2025: bei 30k Umsatz 2026 — wann werde ich pflichtig zur Regelbesteuerung?",
      "Wie gehst du mit § 6 GwG (Geldwäsche) um — bei Freiberuflern wie mir relevant?",
    ],
    regulatorischeBesonderheiten: [
      "§4 Abs. 3 EStG EÜR ohne Bilanzierungspflicht",
      "Kleinunternehmer-Schwellen 2025 erhöht (25k/100k)",
      "Freiberufler: kein GewSt + kein Gewerbeschein (§18 EStG Katalogberufe)",
      "IHK-Mitgliedschaft nur bei Gewerbe (Freiberufler haben Kammer)",
    ],
  },

  {
    id: "ug-gmbh-regular",
    name: "UG / GmbH (regulär, ohne Spezial-Themen)",
    emoji: "🏢",
    beschreibung: "Klassische Kapitalgesellschaft mit Bilanzierungspflicht, KSt, GewSt.",
    matchTags: ["standard"],
    pflichtfelder: [
      {
        key: "stammkapital",
        label: "Stammkapital vollständig eingezahlt?",
        hint: "UG: ab 1€ (25% Rücklage-Pflicht); GmbH: mind. 12.500€ bei Gründung",
        field: { type: "yesno" },
      },
      {
        key: "gf-gehalt-jahr",
        label: "GF-Gehalt p.a. (€)",
        hint: "Nullgehalt = mglw. verdeckte Gewinnausschüttung; Markt-Vergleich = sicher",
        field: { type: "number", placeholder: "z.B. 60000" },
      },
      {
        key: "tantieme-bonus",
        label: "Tantieme/Bonus geplant?",
        hint: "GF-Tantieme = Sonderfall, max 25% Gewinn-Anteil bei §8 Abs. 3 S. 2 KStG",
        field: { type: "yesno" },
      },
      {
        key: "bilanzpolitik",
        label: "Bilanzpolitik-Wunsch",
        hint: "Niedriger Gewinn = weniger Steuer; Hoher Gewinn = besser für Bank/Investor-Story",
        field: { type: "select", options: ["Möglichst niedriger Gewinn (Steuer-optimiert)", "Möglichst hoher Gewinn (Bank/Investor)", "Ausgewogen", "Egal — StB entscheidet"] },
      },
      {
        key: "ust-monatlich",
        label: "USt-VA monatlich oder quartalsweise?",
        hint: "Erste 2 Jahre Neu-Gründung = monatlich Pflicht; danach >7.500€/Q = monatlich",
        field: { type: "select", options: ["Monatlich (Pflicht)", "Quartalsweise", "Jährlich (<1.000€)", "Unklar"] },
      },
    ],
    beispielPainPoints: [
      "GF-Gehalt 80k aktuell — wie hoch maximal ohne vGA-Risiko bei Mid-Market-Vergleich?",
      "Eröffnungsbilanz: Stammkapital 25.000€ — wie buchst du in DATEV (Konten 1200/2900)?",
      "BWA monatlich oder quartalsweise — welches Format liefert ihr, mit welcher Standard-Auswertung?",
    ],
    regulatorischeBesonderheiten: [
      "Bilanzierungspflicht §242 HGB",
      "KSt 15% + Soli 5,5% auf KSt + GewSt (Hebesatz ortsabhängig)",
      "§8 Abs. 3 KStG verdeckte Gewinnausschüttung bei nicht-fremdüblichen GF-Bezügen",
      "Mindestbesteuerungs-Regel §10d EStG bei Verlustvortrag (60% über 1Mio)",
    ],
  },

  {
    id: "ecom-d2c",
    name: "E-Commerce / D2C / Amazon FBA",
    emoji: "🛒",
    beschreibung: "Online-Verkauf B2C — Shopify, Amazon FBA, eBay, Marktplätze.",
    matchTags: ["ecom"],
    pflichtfelder: [
      {
        key: "marktplaetze",
        label: "Marktplätze / Shop-Systeme",
        field: {
          type: "multiselect",
          options: [
            "Amazon DE (FBA)",
            "Amazon FBM",
            "Amazon EU PAN-EU (FBA in mehreren Ländern)",
            "Amazon US",
            "Shopify",
            "Shopware",
            "WooCommerce",
            "eBay",
            "Etsy",
            "Kaufland",
            "Otto",
          ],
        },
      },
      {
        key: "fba-laender",
        label: "FBA-Lager in welchen EU-Ländern?",
        hint: "Jedes Land = eigene USt-ID-Pflicht + Compliance-Aufwand",
        field: { type: "multiselect", options: ["DE", "FR", "IT", "ES", "PL", "CZ", "NL", "SE", "BE", "AT"] },
      },
      {
        key: "oss-status",
        label: "OSS-Verfahren angemeldet?",
        hint: "OSS = One-Stop-Shop für B2C-EU-Verkäufe; vereinfacht alle EU-USt-Meldungen",
        field: { type: "select", options: ["Ja, OSS aktiv", "Nein, einzeln gemeldet", "Geplant", "Unklar"] },
      },
      {
        key: "settlement-tool",
        label: "Settlement-Parser-Tool",
        hint: "PayJoe/Taxdoo automatisieren Amazon-Settlement → DATEV/Lexoffice-Mapping",
        field: { type: "select", options: ["PayJoe", "Taxdoo", "GoB-Konformer", "Eigene Lösung", "Nichts (manuell)", "Will neu aufsetzen"] },
      },
      {
        key: "umsatz-amazon-anteil",
        label: "Amazon-Umsatz-Anteil",
        field: { type: "select", options: ["0-25%", "25-50%", "50-75%", "75-100%", "Kein Amazon"] },
      },
    ],
    beispielPainPoints: [
      "Wie buchst du eine 'AMA-SG-DE-MZNFS'-Buchung in DATEV — welcher BU? (Antwort: 3100 Fremdleistung BU 9 oder Marketplace-Konstrukt seit 1.8.2024)",
      "Wenn ich FBA in 6 EU-Ländern habe — alle 6 USt-IDs nötig auch mit OSS?",
      "Wie behandelt ihr Amazon-Refunds (RFNDCMMS)? Aufwandsminderung 3100 oder Erlöskorrektur?",
    ],
    regulatorischeBesonderheiten: [
      "OSS-Quartals-Meldung §18i UStG (Schwelle 10.000€/Jahr)",
      "Marketplace-Facilitator-Tax: Amazon hält USt ein (seit 1.7.2021 EU-weit)",
      "Reverse-Charge §13b für IT/FR/ES/NL Marketplace-Provisionen",
      "Amazon EU SARL Niederlassung DE seit 1.8.2024 (19% statt Reverse-Charge)",
      "FBA-Lager-Standort = USt-Steuersitz im Land (Pflicht-Registrierung)",
    ],
  },

  {
    id: "holding",
    name: "Holding-Struktur (Mutter-GmbH + Töchter)",
    emoji: "🏛️",
    beschreibung: "Beteiligungs-Strukturen mit §8b KStG Schachtelprivileg.",
    matchTags: ["holding"],
    pflichtfelder: [
      {
        key: "anzahl-toechter",
        label: "Anzahl operative Töchter",
        field: { type: "number", placeholder: "z.B. 2" },
      },
      {
        key: "branchen-toechter",
        label: "Branchen der Töchter (kurz)",
        field: { type: "text", placeholder: "z.B. D2C-Beauty + SaaS + Immobilien" },
      },
      {
        key: "einbringung-jahr",
        label: "Einbringung in Holding-Jahr",
        hint: "§22 UmwStG-Sperrfrist 7 Jahre nach Einbringung",
        field: { type: "text", placeholder: "z.B. 2024" },
      },
      {
        key: "familien-pool",
        label: "Familien-Pool oder Stiftungs-Setup geplant?",
        field: { type: "yesno" },
      },
      {
        key: "vc-aufnahme",
        label: "VC-Runde / Exit absehbar?",
        hint: "Verkauf vor §22-Sperrfrist = nachträgliche Steuerbelastung",
        field: { type: "select", options: ["Nein, nie", "Möglich in 2-5 Jahren", "Konkret geplant", "Bereits passiert"] },
      },
    ],
    beispielPainPoints: [
      "Tochter 1 wurde 2024 in Holding eingebracht — wann läuft §22 UmwStG-Sperrfrist ab und was passiert wenn ich vorher verkaufe?",
      "Holding-Struktur mit 3 Töchtern aus verschiedenen Branchen — Vor- und Nachteile gegenüber 3 Schwester-GmbHs?",
      "Wie behandelt ihr Mutter-Tochter-Ausschüttungen — bekomme ich wirklich 95% steuerfrei nach §8b KStG?",
    ],
    regulatorischeBesonderheiten: [
      "§8b KStG: 95% steuerfrei Ausschüttungen + Veräußerungsgewinne (5% gelten als Betriebsausgabe)",
      "§22 UmwStG-Sperrfrist 7 Jahre nach Einbringung — Verkauf vorher = rückwirkende Steuerbelastung",
      "10%-Beteiligungsschwelle Streubesitz-Limitation (KStG §8b Abs. 4)",
      "Mutter-Tochter-Richtlinie (EU) 95% steuerfrei bei EU-Ausschüttungen",
      "Familien-Pool §15a EStG (Verlustverrechnungs-Limitation bei KG)",
    ],
  },

  {
    id: "international",
    name: "International (US-LLC, HK-Ltd, EU-Konstrukte)",
    emoji: "🌍",
    beschreibung: "Auslandsgesellschaften aus DE-Sicht — §AStG, DBA, Substance.",
    matchTags: ["international", "us-llc", "hk-ltd"],
    pflichtfelder: [
      {
        key: "auslands-land",
        label: "Welches Auslands-Konstrukt?",
        field: {
          type: "multiselect",
          options: [
            "US-LLC (Wyoming/Delaware/Florida)",
            "US-C-Corp",
            "HK-Limited",
            "UK-Ltd",
            "Estonia-OÜ",
            "NL-BV",
            "CH-AG/GmbH",
            "Cyprus-Ltd",
            "Dubai-FZE",
            "Singapur-PTE",
            "Andere",
          ],
        },
      },
      {
        key: "gf-wohnsitz",
        label: "Wo wohnt der GF tatsächlich?",
        hint: "Geschäftsleitung = Steuersitz (§10 AO). DE-Wohnsitz → ggf. DE-Steuerpflicht",
        field: { type: "select", options: ["Deutschland", "Ausland (gleicher Land wie Gesellschaft)", "Drittland", "Wechselnd"] },
      },
      {
        key: "form-5472",
        label: "Form 5472 (US-LLC) schon eingereicht?",
        hint: "Pflicht für ausländische Single-Member-LLC — $25k Strafe bei Verspätung",
        field: { type: "select", options: ["Ja, jährlich", "Nein", "Wusste nicht — gilt für mich?", "Nicht relevant (keine US-LLC)"] },
      },
      {
        key: "boi-status",
        label: "BOI-Filing-Status",
        hint: "FinCEN 26.3.2025 Interim Final Rule: BOI für US-Domestic nicht mehr Pflicht; für DE-Founder mit US-LLC auch nicht (foreign reporting company exempt)",
        field: { type: "select", options: ["Eingereicht (war Pflicht)", "Nicht eingereicht — nicht mehr Pflicht", "Unsicher", "Nicht relevant"] },
      },
      {
        key: "substance-nachweis",
        label: "Lokale Substanz im Auslands-Land",
        hint: "ATAD III withdrawn 18.6.2025 — aber §50d EStG Substance-Anforderungen bleiben",
        field: { type: "select", options: ["Voller lokaler Betrieb (Büro+MA)", "Office-Sharing/Coworking", "Nur Registered Agent", "Nichts"] },
      },
    ],
    beispielPainPoints: [
      "Ich habe eine WY-LLC seit 2024 — wie weise ich Substanz nach um §AStG-Hinzurechnung zu vermeiden?",
      "Form 5472: Wer reicht das ein — ihr in DE oder muss ein US-CPA dran?",
      "HK-Limited mit Offshore-Status: Wie dokumentiere ich, dass alle Gewinne offshore entstanden sind?",
    ],
    regulatorischeBesonderheiten: [
      "§AStG Hinzurechnungsbesteuerung: 15%-Niedrigsteuer-Schwelle (seit MinBestRL-UmsG 2024, vorher 25%)",
      "Form 5472 + Pro-Forma 1120 für foreign-owned US-LLC ($25k Strafe)",
      "BOI Filing: FinCEN 26.3.2025 Interim Final Rule → foreign reporting companies exempt",
      "ATAD III withdrawn 18.6.2025 — aber §50d EStG + DBA-PPT bleiben",
      "HK Two-Tier Profits Tax (8,25%/16,5%) + FSIE-Regime 2023",
      "DBA-Anrechnung Quellensteuer auf KSt + ESt",
    ],
  },

  {
    id: "crypto",
    name: "Crypto / DeFi / NFTs",
    emoji: "🪙",
    beschreibung: "Trading, Staking, DeFi-Liquidity-Pools, NFTs — §23 EStG.",
    matchTags: ["crypto"],
    pflichtfelder: [
      {
        key: "tool",
        label: "Welches Crypto-Steuer-Tool?",
        field: { type: "select", options: ["CoinTracking", "Blockpit", "Koinly", "Accointing", "Manuell/Excel", "Noch keins"] },
      },
      {
        key: "trade-volumen",
        label: "Trade-Volumen / Jahr",
        field: { type: "select", options: ["<100", "100-1.000", "1.000-10.000", "10.000-50.000", "50.000+"] },
      },
      {
        key: "staking-lending",
        label: "Staking / Lending aktiv?",
        hint: "Verlängert Haltefrist auf 10 Jahre (BMF 10.5.2022, BFH 14.2.2023 IX R 3/22)",
        field: { type: "yesno" },
      },
      {
        key: "defi-lp",
        label: "DeFi Liquidity-Pools (Uniswap, Aave etc.)?",
        hint: "BMF-Schreiben Mai 2022 + Mai 2024 — Pool-Eintritt KEIN Tausch",
        field: { type: "yesno" },
      },
      {
        key: "nft-trading",
        label: "NFTs gehandelt?",
        field: { type: "yesno" },
      },
      {
        key: "gewerbe-frage",
        label: "Privat-Spekulation oder gewerblich?",
        hint: "BMF 10.5.2022: bei <10 Trades/Tag in der Regel privat; Daytrading mit Strategie kann gewerblich werden",
        field: { type: "select", options: ["Privat (sicher)", "Privat (unsicher)", "Wahrscheinlich gewerblich", "Unklar — soll geprüft werden"] },
      },
    ],
    beispielPainPoints: [
      "Staking-Erträge bei Eth2 — werden die zum Marktpreis bei Zufluss versteuert auch wenn ich nicht 'cash-out'?",
      "DeFi-LP-Eintritt in Uniswap V3 — Tausch (steuerpflichtig) oder kein Tausch (steuerfrei)?",
      "10-Jahres-Frist bei Staking: Ich hab seit 2022 gestakt — wann sind die Coins steuerfrei? (BMF-Schreiben + BFH 2023 IX R 3/22)",
    ],
    regulatorischeBesonderheiten: [
      "§23 EStG Private Veräußerungsgeschäfte (1-Jahres-Haltefrist)",
      "Freigrenze 1.000€/Jahr (seit 2024 erhöht; vorher 600€)",
      "BFH 14.2.2023 (IX R 3/22): Crypto-zu-Crypto ist Veräußerungsgeschäft",
      "BMF 10.5.2022 + 6.3.2025 (Update): Staking/Lending verlängert NICHT mehr auf 10 Jahre (BMF-Klarstellung)",
      "FIFO-Methode (Pflicht ab BMF 10.5.2022)",
      "Wallet-zu-Wallet = KEIN Veräußerungsgeschäft",
    ],
  },

  {
    id: "saas-digital",
    name: "SaaS / Digital-Produkte",
    emoji: "💻",
    beschreibung: "Software-as-a-Service, Online-Kurse, Apps, Lizenz-Verkäufe.",
    matchTags: ["standard", "international"],
    pflichtfelder: [
      {
        key: "b2b-b2c-anteil",
        label: "B2B / B2C-Anteil",
        field: { type: "select", options: ["100% B2B", "Überwiegend B2B (>70%)", "Mix", "Überwiegend B2C (>70%)", "100% B2C"] },
      },
      {
        key: "kunden-laender",
        label: "Hauptkunden-Länder",
        field: { type: "multiselect", options: ["DE", "EU (außer DE)", "USA", "UK", "Schweiz", "Kanada/Australien", "Asien", "Global"] },
      },
      {
        key: "oss-status",
        label: "OSS-Verfahren angemeldet?",
        hint: "Pflicht bei B2C-EU-Verkäufen >10k€/Jahr",
        field: { type: "select", options: ["Ja, OSS aktiv", "Nein, einzeln gemeldet", "Unter 10k-Schwelle", "Unklar"] },
      },
      {
        key: "pricing-modell",
        label: "Pricing-Modell",
        field: { type: "multiselect", options: ["Subscription monatlich", "Subscription jährlich", "Einmal-Kauf", "Lifetime-Lizenz", "Usage-based", "Freemium + Premium"] },
      },
      {
        key: "hosting-server",
        label: "Hosting / Server-Standort",
        field: { type: "select", options: ["DE", "EU", "USA (AWS/GCP/Azure)", "UK", "Mehrere", "Egal"] },
      },
    ],
    beispielPainPoints: [
      "B2B-Kunde aus den USA kauft Subscription für $200/Monat — wie buche ich das? Reverse-Charge gilt nicht für USA, aber USt? (Antwort: Drittland, B2B → keine deutsche USt, §3a Abs. 2 UStG Empfänger-Ortsprinzip)",
      "OSS-Quartalsmeldung bei B2C-EU-Subscriptions: Wie meldest du wenn der Kunde während des Abos das Land wechselt?",
      "Lizenz-Verkauf (Lifetime) vs. SaaS-Subscription — USt-rechtlich unterschiedlich? (Antwort: Lizenz = Lieferung digitaler Inhalte; SaaS = sonstige Leistung — beide §3a Abs. 5)",
    ],
    regulatorischeBesonderheiten: [
      "B2B Reverse-Charge §13b UStG (EU + Drittland)",
      "B2C-EU: OSS-Verfahren §18i UStG (Schwelle 10k€/Jahr)",
      "§3a Abs. 5 UStG Empfänger-Ortsprinzip bei digitalen Leistungen",
      "Lizenz-Verkauf an Privatpersonen = Lieferung digitaler Inhalte (USt nach Wohnsitz Käufer)",
      "DAC-7 Meldepflicht für Plattformen (App-Stores, Marketplaces)",
    ],
  },

  {
    id: "lohn-mitarbeiter",
    name: "Lohnabrechnung (>5 Mitarbeiter)",
    emoji: "👥",
    beschreibung: "Höhere Personal-Anzahl mit Lohn + Sozialversicherung.",
    matchTags: ["lohn"],
    pflichtfelder: [
      {
        key: "ma-anzahl-typ",
        label: "Mitarbeiter-Mix",
        field: { type: "textarea", placeholder: "z.B. 3 Vollzeit + 2 Teilzeit + 4 Minijobs + 1 Werkstudent" },
      },
      {
        key: "bonus-provision",
        label: "Bonus/Provisionsmodelle?",
        field: { type: "select", options: ["Ja, Bonus jährlich", "Ja, Provisionen monatlich", "Mix Bonus + Provision", "Nein, nur Festgehalt"] },
      },
      {
        key: "bav-bonusprogramme",
        label: "bAV / Sondervergütungen",
        hint: "betriebliche Altersvorsorge, JobRad, Sachbezüge etc. — komplexe Lohnabrechnung",
        field: { type: "multiselect", options: ["bAV / Pensionskasse", "JobRad / Leasing", "Sachbezug 50€/Mon §8 Abs. 2 EStG", "Erholungsbeihilfe", "Mitarbeiter-Beteiligung (ESOP/VSOP)", "Nichts davon"] },
      },
      {
        key: "lohn-tool",
        label: "Aktuelles Lohn-Tool",
        field: { type: "select", options: ["DATEV Lohn", "Lexoffice Lohn", "Personio", "HR-Works", "Eigene Excel", "Noch nichts", "Andere"] },
      },
      {
        key: "ausland-ma",
        label: "MA mit Wohnsitz im Ausland?",
        hint: "Grenzpendler EU = vereinfacht; Drittland = komplex (Doppelbesteuerung)",
        field: { type: "yesno" },
      },
    ],
    beispielPainPoints: [
      "Mitarbeiter-Beteiligung (VSOP-Modell): Wie versteuert man Vesting bei Exit — Sachbezug oder Lohn?",
      "JobRad für 8 MA: Welche Buchungs-Logik in DATEV — und wer trägt 1%-Regelung-Risiko?",
      "Minijob 556€ vs. Midi-Job: Wann lohnt sich Übergangsbereich-Optimierung für meine Mitarbeiter?",
    ],
    regulatorischeBesonderheiten: [
      "Minijob-Schwelle 556€/Monat (2026 erhöht)",
      "Midi-Job-Übergangsbereich 538-2.000€/Monat (gleitende Beitragsbelastung)",
      "ELStAM-Datenbank-Pflicht für alle Lohn-MA",
      "DEÜV-Meldungen monatlich (DEÜV-Verordnung)",
      "GwG-Pflichten bei Geldzahlungen >10k€",
      "DSGVO-konforme Personalakte (10J. Aufbewahrung)",
    ],
  },

  {
    id: "fae-forschung",
    name: "F&E / Forschungszulage",
    emoji: "🔬",
    beschreibung: "Forschung & Entwicklung mit FZulG-Antrag-Option.",
    matchTags: ["fa-research"],
    pflichtfelder: [
      {
        key: "fae-quote",
        label: "F&E-Anteil am Gesamt-Aufwand",
        field: { type: "select", options: ["<10%", "10-30%", "30-50%", "50%+"] },
      },
      {
        key: "fzulg-status",
        label: "FZulG-Antrag-Status",
        hint: "Forschungszulagengesetz: 25% Personal-Kosten als Steuergutschrift, max. 1Mio/Jahr",
        field: { type: "select", options: ["Nie beantragt", "Antrag gestellt — pending", "Bewilligt", "Abgelehnt", "Will jetzt beantragen"] },
      },
      {
        key: "personalstunden-tracking",
        label: "F&E-Personalstunden-Tracking",
        hint: "Pflicht für FZulG: Stundenerfassung pro Projekt + MA",
        field: { type: "select", options: ["Ja, sauber dokumentiert", "Teilweise", "Nein", "Mit Tool (Jira/Toggl etc.)"] },
      },
      {
        key: "bsfz-bescheinigung",
        label: "BSFZ-Bescheinigung vorhanden?",
        hint: "Bescheinigungsstelle Forschungszulage — Vorbedingung für FZulG",
        field: { type: "select", options: ["Ja", "Nein, will beantragen", "Nein, nicht relevant", "Unsicher"] },
      },
      {
        key: "auftragsforschung",
        label: "Auftragsforschung an externe Partner?",
        hint: "60% der Auftragskosten zählen für FZulG (statt 100% bei eigenen MA)",
        field: { type: "yesno" },
      },
    ],
    beispielPainPoints: [
      "FZulG-Antrag: Wie strukturiere ich Projekt-Stundenerfassung bei 3 Devs die parallel an mehreren Features arbeiten?",
      "Auftragsforschung-Anteil 40k — wieviel Steuergutschrift kriege ich konkret? (Antwort: 40k × 60% × 25% = 6.000€)",
      "BSFZ-Bescheinigung: Habt ihr Erfahrung mit der Antragsstellung und wie lang dauert das?",
    ],
    regulatorischeBesonderheiten: [
      "FZulG seit 1.1.2020 — 25% Steuergutschrift auf F&E-Personalkosten",
      "Wachstumschancengesetz 2024: Max 10Mio/Jahr (vorher 4Mio)",
      "Auftragsforschung 60% Anrechnung (Wachstumschancen 2024 von 60% auf 70%)",
      "BSFZ-Bescheinigung Voraussetzung (rückwirkend bis 4 Jahre möglich)",
      "Kumulation mit anderen Förderungen (z.B. ZIM) eingeschränkt",
    ],
  },

  {
    id: "stiftung-pool",
    name: "Stiftung / Familien-Pool / Nachfolge",
    emoji: "🏦",
    beschreibung: "Familien-Stiftung, Schenkungssteuer-Optimierung, Nachfolge-Planung.",
    matchTags: ["stiftung", "holding"],
    pflichtfelder: [
      {
        key: "stiftung-status",
        label: "Stiftung bereits errichtet?",
        field: { type: "select", options: ["Ja, klassische Familien-Stiftung", "Ja, Familien-Stiftungs-GmbH", "Plane Errichtung 2026", "Nur Interesse — Recherche-Phase"] },
      },
      {
        key: "vermoegen-typ",
        label: "Vermögens-Typ (Hauptbestand)",
        field: { type: "multiselect", options: ["Operative Unternehmens-Beteiligungen", "Immobilien", "Wertpapiere/Cash", "Geistiges Eigentum (IP, Marken)", "Andere"] },
      },
      {
        key: "anzahl-familienmitglieder",
        label: "Anzahl Familien-Begünstigte",
        field: { type: "number", placeholder: "z.B. 4 (Ehepartner + 2 Kinder + ich)" },
      },
      {
        key: "schenkungs-historie",
        label: "Schenkungen in letzten 10 Jahren",
        hint: "10-Jahres-Frist §14 ErbStG: Freibeträge können alle 10J. neu genutzt werden (400k/Kind)",
        field: { type: "select", options: ["Keine", "Kleine (<100k)", "Mittel (100-500k)", "Groß (>500k)", "Mehrere Tranchen"] },
      },
      {
        key: "erbersatzsteuer",
        label: "Stiftungs-Erbersatzsteuer-Plan",
        hint: "30-Jahres-Frist §1 Abs. 1 Nr. 4 ErbStG bei Familien-Stiftung",
        field: { type: "select", options: ["Bekannt, geplant", "Bekannt, nicht relevant", "Nicht bekannt — bitte erklären", "Nicht relevant (keine Stiftung)"] },
      },
    ],
    beispielPainPoints: [
      "Familien-Stiftungs-GmbH errichten 2026: Welche steuerlichen Konsequenzen bei Einbringung GmbH-Anteilen + Schenkungssteuer-Wahl §13a ErbStG?",
      "10-Jahres-Frist Schenkung: Letzte Schenkung 2018, neue 2026 — kann ich Freibetrag voll nutzen? (Antwort: ja, vollständig wiederaufgefüllt seit 2028)",
      "Erbersatzsteuer Familien-Stiftung alle 30 Jahre: Wie hoch konkret bei 3Mio Stiftungs-Vermögen? Welche Erleichterungen §13a/13b ErbStG?",
    ],
    regulatorischeBesonderheiten: [
      "§14 ErbStG 10-Jahres-Frist (Freibeträge alle 10J. nutzbar)",
      "§13a/13b ErbStG Verschonungsabschlag 85%/100% für Betriebsvermögen",
      "Familien-Stiftung Erbersatzsteuer alle 30 Jahre (§1 Abs. 1 Nr. 4 ErbStG)",
      "Schenkungssteuer-Freibeträge: Ehepartner 500k · Kinder 400k · Enkel 200k",
      "Stiftungs-Errichtung: 7% Schenkungssteuer auf eingebrachtes Vermögen (außer Verschonung)",
      "Familien-Pool §15a EStG (KG-Konstrukt) — Verlustverrechnungs-Limitation",
    ],
  },
];

export const getGruppeById = (id: GruppenId): Gruppe | undefined =>
  GRUPPEN.find((g) => g.id === id);
