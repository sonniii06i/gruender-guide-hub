// IP-Box / Patent-Box Regimes 2026 — DE-Sicht
// Datenquellen: nationale Steuergesetze + OECD BEPS Action 5 Nexus Approach + Stand Q2 2026
// Alle Regimes sind OECD-Nexus-konform (R&D-Substanz vor Ort Pflicht)

export type IPBoxRegime = {
  slug: string;
  country: string;
  flag: string;
  regimeName: string;
  // Headline-Steuersatz (KSt-Standard)
  standardKSt: number;
  // Effektive Steuer auf qualifizierte IP-Einkünfte (in %)
  effectiveRate: number;
  // Befreiungs-/Abzugs-Mechanismus
  mechanism: string;
  // Qualifizierende Einkommen
  qualifyingIncome: string[];
  // Nexus-Anforderung (BEPS-konform)
  nexusRequirement: string;
  // Substanz vor Ort minimum
  substanceRequirement: string[];
  // R&D-Beleg-Pflichten
  rdDocumentation: string[];
  // Wesentliche Vorteile
  pros: string[];
  // Wesentliche Nachteile / Stolperfallen
  cons: string[];
  // DBA-Deutschland-Hinweis
  dbaNote: string;
  // CFC / Hinzurechnungsbesteuerungs-Risiko aus DE-Sicht
  cfcRisk: "Niedrig" | "Mittel" | "Hoch";
  // Setup-Aufwand grob
  setupComplexity: "Einfach" | "Mittel" | "Komplex";
  // Mindest-IP-Royalties damit Setup wirtschaftlich
  minRoyaltiesEur: number;
  // Geschätzte Setup + jährliche Compliance
  setupCostEur: string;
  runningCostEur: string;
  // Eignung für DE-Gründer
  fitForGermans: "Sehr gut" | "Gut" | "Mittel" | "Schwierig";
  // Offizieller Link
  officialUrl: string;
};

export const IP_BOX_REGIMES: IPBoxRegime[] = [
  {
    slug: "cyprus",
    country: "Zypern",
    flag: "🇨🇾",
    regimeName: "Cyprus IP-Box (Section 9(1)(l)) — Modified Nexus Approach",
    standardKSt: 12.5,
    effectiveRate: 2.5,
    mechanism: "80 %-Befreiung qualifizierter Netto-Einkünfte → 12,5 % × 20 % = 2,5 % effektiv",
    qualifyingIncome: [
      "Patent-Lizenzgebühren",
      "Patentierte Software / Computerprogramme (registriert)",
      "Utility Models",
      "Pflanzenzucht-Sortenrechte",
      "Orphan Drugs",
      "Forschungs- und Entwicklungsergebnisse mit Patentschutz",
    ],
    nexusRequirement:
      "BEPS-konformer Nexus: nur der Anteil qualifizierender F&E-Ausgaben in Zypern (vs. Gesamt-F&E) profitiert vom Box-Satz. Outsourced-R&D an unverbundene Dritte zählt mit.",
    substanceRequirement: [
      "Mind. 1 wirtschaftlich aktive lokale Mitarbeiter (Director Salary marktüblich)",
      "Lokales Büro (kein Mailbox-Setup) mit Mietvertrag",
      "Bankkonto in Zypern",
      "Bord-Sitzungen physisch in Zypern dokumentiert",
      "Effective Place of Management (EPoM) in Zypern",
    ],
    rdDocumentation: [
      "Tracking aller F&E-Ausgaben pro IP-Asset (qualifying vs. non-qualifying)",
      "Nexus-Ratio jährlich berechnen + dokumentieren",
      "Patent-/IP-Registrierung beim zyprischen Patent-Office",
      "Outsourced R&D-Verträge dokumentieren (related vs. non-related parties)",
      "Audit jährlich Pflicht",
    ],
    pros: [
      "Niedrigster effektiver Steuersatz in EU (2,5 %)",
      "Auch Software einbezogen — nicht nur Patente",
      "Gut etabliertes Big-4-CPA-Ökosystem",
      "DBA-Deutschland mit 0 % Quellensteuer auf Royalties (wenn Beneficial Owner)",
      "EU-Mitglied → Mutter-Tochter-RL für Dividenden",
    ],
    cons: [
      "Substanz-Anforderung wirklich Pflicht — Audits seit 2018 verschärft",
      "Software-Patentierung nötig (reine Code-Copyrights reichen NICHT)",
      "Setup 8.000-15.000 € + jährlich 5.000-12.000 € Compliance",
      "GeSi-Risiko bei Mailbox-Setup hoch (DE-FA prüft genau)",
      "EU-Listenüberwachung (Black-/Grey-List) — Reputationsrisiko",
    ],
    dbaNote:
      "DBA-DE seit 2011, 0 % Quellensteuer auf Royalties bei Beneficial Owner. AStG §7-14 Hinzurechnung greift bei < 25 % Steuer + passiver Einkunft. Aktive Lizenzierung eigener IP = aktiv (Befreiung möglich).",
    cfcRisk: "Mittel",
    setupComplexity: "Mittel",
    minRoyaltiesEur: 200000,
    setupCostEur: "8.000-15.000 € Anwalt + Patentkosten",
    runningCostEur: "5.000-12.000 €/Jahr (CPA + Sub. + Audit)",
    fitForGermans: "Gut",
    officialUrl: "https://www.mof.gov.cy/mof/tax/taxdep.nsf",
  },
  {
    slug: "malta",
    country: "Malta",
    flag: "🇲🇹",
    regimeName: "Malta Patent Box Regime — Modified Nexus",
    standardKSt: 35,
    effectiveRate: 1.75,
    mechanism:
      "95 %-Befreiung der qualifizierten Netto-IP-Einkünfte → effektiv 1,75 %. Alternativ Imputation-System mit 5/7-Refund auf Distributionen (oft niedriger).",
    qualifyingIncome: [
      "Patente + Patentanmeldungen",
      "Pflanzenzucht-Sortenrechte",
      "Software (urheberrechtlich geschützte Computer-Programme — auch ohne Patent)",
      "Utility Models",
      "Orphan Drug Designations",
    ],
    nexusRequirement:
      "Nexus-Approach mit Qualifying Expenditure / Total Expenditure × IP-Income. Outsourced R&D an unverbundene Dritte: zählt. An verbundene: zählt nicht.",
    substanceRequirement: [
      "Lokale Mitarbeiter (mind. Direktor mit Substanz-Aktivität)",
      "Lokales Büro mit Mietvertrag",
      "Maltesisches Bankkonto",
      "Effective Management in Malta",
      "F&E-Aktivität ganz oder teilweise in Malta",
    ],
    rdDocumentation: [
      "F&E-Tracking pro IP-Asset",
      "Nexus-Ratio dokumentieren",
      "IP-Registrierung beim Industrial Property Registrations Directorate (Malta)",
      "Audited Accounts jährlich",
    ],
    pros: [
      "Sehr niedriger effektiver Satz (1,75 %)",
      "Software auch ohne Patent qualifiziert",
      "Imputation-System als Alternative",
      "EU-Mitglied + Englisch-sprachig",
      "Patent-Box seit 2017 BEPS-konform",
    ],
    cons: [
      "EU-Liste-Black-Risiko (Malta historisch öfter kritisch betrachtet)",
      "Hohe nominale KSt 35 % außerhalb des Boxes",
      "Substanz-Anforderung scharf seit 2019",
      "Setup ~10.000 € + jährlich 6.000-15.000 €",
      "Komplexes Imputation-Refund-System (Liquiditäts-Lag)",
    ],
    dbaNote:
      "DBA-DE 1995, 0 % Quellensteuer auf Royalties (mit Eigentümer-Klausel). AStG-Risiko bei Holding-Setup ohne Substanz hoch.",
    cfcRisk: "Mittel",
    setupComplexity: "Komplex",
    minRoyaltiesEur: 250000,
    setupCostEur: "10.000-18.000 €",
    runningCostEur: "6.000-15.000 €/Jahr",
    fitForGermans: "Mittel",
    officialUrl: "https://cfr.gov.mt",
  },
  {
    slug: "niederlande",
    country: "Niederlande",
    flag: "🇳🇱",
    regimeName: "Innovation Box (Innovatiebox) — BEPS-konform",
    standardKSt: 25.8,
    effectiveRate: 9,
    mechanism: "Spezial-Steuersatz 9 % auf qualifizierte Innovations-Einkünfte (Standard-KSt 25,8 % bei > 200k €)",
    qualifyingIncome: [
      "Patente + Patentanmeldungen",
      "Software-Entwicklung (S&O-Erklärung WBSO Pflicht)",
      "Pflanzenzucht-Rechte",
      "Utility Models",
      "Orphan Drug Designations",
    ],
    nexusRequirement:
      "Nexus-Ratio nach BEPS Action 5. WBSO-Erklärung (Speur- en Ontwikkelingswerk) für jeden qualifizierten Asset Pflicht. Track separat pro IP-Asset.",
    substanceRequirement: [
      "Echte F&E-Tätigkeit in NL mit lokalen Mitarbeitern",
      "WBSO-Antrag bei Rijksdienst voor Ondernemend Nederland (RVO)",
      "Mind. 1 R&D-Mitarbeiter mit qualifizierter Tätigkeit",
      "Lokales Büro / R&D-Standort",
      "Buchhaltung trennt Innovation-Income vom Standard-Income",
    ],
    rdDocumentation: [
      "WBSO-Erklärung jährlich beantragen (RVO)",
      "S&O-Stunden-Tracking pro Mitarbeiter",
      "F&E-Tagebuch pro Innovation-Project",
      "Nexus-Berechnung pro Innovations-Asset",
      "Steuer-Ruling mit niederländischem FA empfohlen (für Rechtssicherheit)",
    ],
    pros: [
      "Sehr seriöses und stabiles Regime seit 2007",
      "Software ohne Patent qualifiziert (mit WBSO-Erklärung)",
      "Steuer-Ruling-System gibt Vorab-Sicherheit",
      "DBA-DE 2012 mit 0 % Quellensteuer",
      "Hohe Compliance-Reputation in EU",
    ],
    cons: [
      "Höher als CY/MT/PL/HU (9 % vs. 1,75-5 %)",
      "WBSO-Erklärung aufwendig (jährlich, Hours-Tracking)",
      "Setup 15.000-30.000 € (Anwalt + Steuer-Ruling)",
      "R&D-Substanz wirklich Pflicht — kein 'Mailbox' möglich",
      "Standard-KSt 25,8 % auf nicht-Innovation-Einkünfte hoch",
    ],
    dbaNote:
      "DBA-DE 2012, 0 % Quellensteuer Royalties bei Beneficial Owner. AStG-Risiko mittel: aktive Lizenzierung mit Substanz = aktiv. Nur passive Holding ohne R&D-Substanz = Hinzurechnung möglich.",
    cfcRisk: "Niedrig",
    setupComplexity: "Komplex",
    minRoyaltiesEur: 500000,
    setupCostEur: "15.000-30.000 €",
    runningCostEur: "10.000-25.000 €/Jahr",
    fitForGermans: "Sehr gut",
    officialUrl: "https://www.rvo.nl/subsidies-financiering/wbso",
  },
  {
    slug: "irland",
    country: "Irland",
    flag: "🇮🇪",
    regimeName: "Knowledge Development Box (KDB) — BEPS-konform",
    standardKSt: 12.5,
    effectiveRate: 6.25,
    mechanism:
      "50 % der qualifizierten Netto-Einkünfte werden befreit → effektiv 6,25 %. KDB läuft aktuell bis 31.12.2026, Verlängerung in Diskussion.",
    qualifyingIncome: [
      "Patente + Patentanmeldungen (registriert)",
      "Software-Copyrights",
      "Pflanzenzucht-Rechte",
      "Lizenz-Einkünfte aus diesen Assets",
    ],
    nexusRequirement:
      "Modifizierter Nexus-Approach. Qualifying Expenditure / Total Expenditure × IP-Income. Outsourced R&D nur an unverbundene Dritte zählt.",
    substanceRequirement: [
      "F&E in Irland (mind. signifikanter Anteil der Total-R&D)",
      "Lokale R&D-Mitarbeiter",
      "Substanz-Tests durch Revenue Commissioners",
    ],
    rdDocumentation: [
      "KDB-Election im Steuer-Return jährlich",
      "Detail-Tracking R&D-Spend pro IP-Asset",
      "Patent-/Copyright-Registrierung dokumentieren",
      "Nexus-Berechnung",
    ],
    pros: [
      "Niedriger effektiver Satz (6,25 %) bei sehr seriöser Jurisdiktion",
      "Englisch-sprachig + Big-Tech-Hub (US-Steuerberater verfügbar)",
      "EU-Mitglied + 0 % Royalty-Quellensteuer per DBA-DE",
      "Stabile Politik + KDB seit 2016",
    ],
    cons: [
      "KDB läuft 31.12.2026 aus, Verlängerung unklar",
      "Pillar-2-Mindeststeuer 15 % betrifft KDB-Vorteil bei Konzernen > 750M €",
      "Setup 20.000-40.000 € (premium Jurisdiktion)",
      "Standard-KSt 12,5 % außerhalb KDB",
      "R&D-Substanz Pflicht",
    ],
    dbaNote:
      "DBA-DE 2011, 0 % Quellensteuer auf Royalties. AStG-Risiko niedrig wegen 12,5 % nominal-Satz (über 25 %-Schwelle? Nein → Risiko bleibt). Mit echter R&D-Substanz: aktive Tätigkeit = AStG-Befreiung.",
    cfcRisk: "Niedrig",
    setupComplexity: "Komplex",
    minRoyaltiesEur: 750000,
    setupCostEur: "20.000-40.000 €",
    runningCostEur: "15.000-30.000 €/Jahr",
    fitForGermans: "Gut",
    officialUrl: "https://www.revenue.ie/en/companies-and-charities/reliefs-and-exemptions/knowledge-development-box/index.aspx",
  },
  {
    slug: "ungarn",
    country: "Ungarn",
    flag: "🇭🇺",
    regimeName: "Ungarisches IP-Regime — 50 % Befreiung",
    standardKSt: 9,
    effectiveRate: 4.5,
    mechanism: "50 %-Befreiung der qualifizierten Royalties + Veräußerungsgewinne → 9 % × 50 % = 4,5 % effektiv",
    qualifyingIncome: [
      "Patente + Patentanmeldungen",
      "Utility Models",
      "Topographien Halbleiter",
      "Pflanzenzucht-Rechte",
      "Software-Copyrights (in Ungarn registriert)",
    ],
    nexusRequirement:
      "Nexus-Ratio gemäß BEPS. Qualifying R&D Expenditure / Total Expenditure × IP Income. Eigene + an unverbundene Dritte outsourced R&D zählt.",
    substanceRequirement: [
      "Lokale Mitarbeiter mit R&D-Aktivität",
      "Lokales Büro",
      "Buchhaltung trennt IP-Income vom Standard-Income",
    ],
    rdDocumentation: [
      "Detail-R&D-Tracking pro IP-Asset",
      "IP-Registrierung beim Hungarian Intellectual Property Office (HIPO)",
      "Audited Accounts",
    ],
    pros: [
      "Gesamt-KSt 9 % ist EU-niedrigster — auch ohne IP-Box günstig",
      "IP-Box reduziert weiter auf 4,5 %",
      "Niedrige Setup-Kosten (~5.000-10.000 €)",
      "EU-Mitglied",
      "DBA-DE mit 0 % Royalty-Quellensteuer",
    ],
    cons: [
      "Lokale Sprache (Ungarisch) für Behördengänge",
      "R&D-Tracking scharf geprüft",
      "Politische Volatilität in Ungarn (EU-Konflikte, Sanktions-Risiken)",
      "Geringe deutschsprachige Anwalts-/Steuerberater-Verfügbarkeit",
      "AStG-Risiko mittel — niedriger Satz triggert FA-Aufmerksamkeit",
    ],
    dbaNote:
      "DBA-DE 2011, 0 % Quellensteuer auf Royalties bei Beneficial Owner. AStG-Risiko bei Mailbox-Setup hoch. Aktive R&D-Aktivität nötig für Befreiung.",
    cfcRisk: "Mittel",
    setupComplexity: "Mittel",
    minRoyaltiesEur: 100000,
    setupCostEur: "5.000-10.000 €",
    runningCostEur: "3.000-8.000 €/Jahr",
    fitForGermans: "Mittel",
    officialUrl: "https://nav.gov.hu",
  },
  {
    slug: "polen",
    country: "Polen",
    flag: "🇵🇱",
    regimeName: "IP-Box Polen — 5 % Steuersatz",
    standardKSt: 19,
    effectiveRate: 5,
    mechanism:
      "Spezial-Steuersatz 5 % auf qualifizierte IP-Einkünfte (statt 19 % Standard-KSt bzw. 9 % Small-Company-KSt)",
    qualifyingIncome: [
      "Patente + Patentanmeldungen",
      "Utility Models",
      "Software-Copyrights (registriert beim Patent Office Polen)",
      "Pflanzenzucht-Rechte",
      "Topographien Halbleiter",
      "Orphan Drug Designations",
    ],
    nexusRequirement:
      "Modifizierter Nexus seit 2019. Qualifying-R&D-Expenses / Total × IP-Income. Eigene Aktivität + outsourced an Dritte zählt.",
    substanceRequirement: [
      "F&E-Aktivität in Polen Pflicht",
      "Lokale Mitarbeiter (mindestens 1 R&D-relevant)",
      "Polnische Buchhaltung",
      "IP-Box-Election im Steuer-Return Pflicht",
    ],
    rdDocumentation: [
      "Detail-R&D-Tracking pro IP-Asset (B+R-Records)",
      "Software-Copyright-Registrierung beim Polish Patent Office (UPRP)",
      "Hours-Tracking pro Software-Entwickler",
      "B+R-Tax-Relief parallel nutzen für extra Abzug",
    ],
    pros: [
      "5 % effektiver Satz für Software (auch ohne Patent — registriertes Copyright reicht)",
      "Software-Industry-Hub (DE-Nähe)",
      "Lower Setup-Kosten als CY/MT (~5.000-10.000 €)",
      "B+R-Steuer-Relief PARALLEL nutzbar (zusätzlich Abzug)",
      "EU-Mitglied + DBA-DE mit 5 % Quellensteuer Royalties",
    ],
    cons: [
      "Sprache Polnisch für FA-Kommunikation",
      "DBA-DE: 5 % Quellensteuer Royalties (anders als CY/IE/HU mit 0 %)",
      "Substanz-Test seit 2022 verschärft",
      "Software-Copyright-Registrierung bürokratisch",
      "AStG-Risiko mittel",
    ],
    dbaNote:
      "DBA-DE 2003, 5 % Quellensteuer auf Royalties (höher als andere EU-Boxes). AStG-Risiko bei reinem Mailbox-Setup. Mit echter R&D-Aktivität in Polen: aktiv.",
    cfcRisk: "Mittel",
    setupComplexity: "Mittel",
    minRoyaltiesEur: 100000,
    setupCostEur: "5.000-10.000 €",
    runningCostEur: "3.000-7.000 €/Jahr",
    fitForGermans: "Gut",
    officialUrl: "https://www.podatki.gov.pl",
  },
  {
    slug: "luxemburg",
    country: "Luxemburg",
    flag: "🇱🇺",
    regimeName: "Luxemburg IP-Regime (Art. 50ter LIR)",
    standardKSt: 24.94,
    effectiveRate: 5.2,
    mechanism:
      "80 % der qualifizierten Netto-IP-Einkünfte sind befreit → effektiv ~5,2 % (24,94 % × 20 %). Inkl. kombinierter Gewerbesteuer Luxembourg-City",
    qualifyingIncome: [
      "Patente + Patentanmeldungen",
      "Utility Models",
      "Software (urheberrechtlich geschützt)",
      "Orphan Drug Designations",
      "Pflanzenzucht-Rechte",
    ],
    nexusRequirement:
      "Modifizierter Nexus-Approach seit 2018 (post-BEPS, ersetzte altes Patent-Box-Regime). Qualifying-Spend / Total × IP-Income.",
    substanceRequirement: [
      "Substanz-Test scharf seit 2018",
      "Lokale R&D-Mitarbeiter",
      "Effektive Geschäftsleitung in LU",
      "Audited Accounts",
    ],
    rdDocumentation: [
      "Detail-Tracking pro IP-Asset",
      "Audit-Pflicht jährlich",
      "Spend-Allocation Documentation",
      "Patent-Registrierung dokumentieren",
    ],
    pros: [
      "Sehr seriöse Jurisdiktion (Big-4-CPAs, deutschsprachige Berater)",
      "EU-Mitglied + DBA-DE mit 0 % Quellensteuer",
      "Mutter-Tochter-RL für Holdings",
      "Stabile Politik + Reputations-Vorteil",
      "Software auch ohne Patent qualifiziert",
    ],
    cons: [
      "Höherer effektiver Satz (5,2 %) als CY/MT/HU/PL",
      "Setup-Kosten 25.000-50.000 € (Premium-Jurisdiktion)",
      "Hohe lokale Substanz-Anforderung",
      "Pillar-2-Anwendung bei Großkonzernen",
      "Compliance-Costs jährlich 15.000-30.000 €",
    ],
    dbaNote:
      "DBA-DE 2012, 0 % Quellensteuer auf Royalties. AStG-Risiko niedrig bei aktiver IP-Lizenzierung mit Substanz.",
    cfcRisk: "Niedrig",
    setupComplexity: "Komplex",
    minRoyaltiesEur: 1000000,
    setupCostEur: "25.000-50.000 €",
    runningCostEur: "15.000-30.000 €/Jahr",
    fitForGermans: "Gut",
    officialUrl: "https://impotsdirects.public.lu",
  },
  {
    slug: "schweiz",
    country: "Schweiz",
    flag: "🇨🇭",
    regimeName: "CH Patent Box (kantonal, post-STAF 2020)",
    standardKSt: 14.6,
    effectiveRate: 8.5,
    mechanism:
      "Bis zu 90 % Befreiung der qualifizierten Patent-Einkünfte (kantonsabhängig). Effektive Sätze: ~8,5-12 % je nach Kanton + Gemeinde",
    qualifyingIncome: [
      "Patente + Patentanmeldungen",
      "Vergleichbare Schutzrechte (Software-Patente, Sortenrechte)",
      "Mit Patent verbundene Lizenzeinnahmen + Veräußerungsgewinne",
    ],
    nexusRequirement:
      "BEPS-konformer Nexus. Qualifying-Spend in CH / Total × IP-Income. Anteil F&E in CH muss substantiell sein.",
    substanceRequirement: [
      "F&E-Aktivität in der Schweiz (mind. signifikanter Anteil)",
      "Lokale R&D-Mitarbeiter",
      "Schweizer Buchhaltung (Audit-Pflicht ab gewisser Grösse)",
      "Effective Place of Management in CH",
    ],
    rdDocumentation: [
      "Detail-Tracking R&D-Spend pro Patent",
      "Patent-Registrierung beim IGE (Eidgenössisches Institut für Geistiges Eigentum)",
      "Spend-Allocation für Nexus-Berechnung",
      "Tax-Ruling mit Kanton empfohlen",
    ],
    pros: [
      "Sehr seriöse Jurisdiktion + Reputations-Vorteil",
      "Politische Stabilität + niedrige Risiken",
      "Auch nicht-EU → Pillar-2-Risiko niedriger",
      "Tax-Ruling-System gibt Vorab-Sicherheit",
      "Hohe Lebensqualität + Standort-Attraktivität",
    ],
    cons: [
      "Höchster effektiver Satz unter Top-IP-Boxes (8,5-12 %)",
      "Setup 30.000-60.000 € + sehr hohe Compliance-Kosten",
      "Nicht-EU → keine Mutter-Tochter-RL (Quellensteuer auf Royalties Standard 5-10 % per DBA)",
      "Substanz-Anforderung sehr scharf",
      "Lokale Anwälte teurer als EU",
    ],
    dbaNote:
      "DBA-DE 2010 (Update 2023), 0 % Quellensteuer auf Royalties bei Beneficial Owner + ggf. Limitation-on-Benefits-Klausel. Wegzugsbesteuerung §6 AStG bei Wegzug aus DE — nur Stundung in EU/EWR, CH separate Regelung.",
    cfcRisk: "Niedrig",
    setupComplexity: "Komplex",
    minRoyaltiesEur: 1500000,
    setupCostEur: "30.000-60.000 €",
    runningCostEur: "20.000-40.000 €/Jahr",
    fitForGermans: "Gut",
    officialUrl: "https://www.estv.admin.ch",
  },
  {
    slug: "belgien",
    country: "Belgien",
    flag: "🇧🇪",
    regimeName: "Innovation Income Deduction (IID)",
    standardKSt: 25,
    effectiveRate: 3.75,
    mechanism: "85 %-Abzug der qualifizierten Innovations-Einkünfte → 25 % × 15 % = 3,75 % effektiv",
    qualifyingIncome: [
      "Patente + ergänzende Schutzzertifikate",
      "Software-Copyrights (registriert)",
      "Orphan Drug Designations",
      "Pflanzenzucht-Rechte",
      "Daten- und Marktexklusivitäts-Rechte",
    ],
    nexusRequirement:
      "BEPS-konformer Nexus seit 2017. Qualifying-Spend in Belgien / Total × IP-Income. Outsourced R&D an unverbundene Dritte zählt.",
    substanceRequirement: [
      "F&E in Belgien Pflicht",
      "Lokale R&D-Mitarbeiter",
      "Buchhaltung trennt Innovation-Income",
      "BELSPO-/IRPI-Registrierung empfohlen",
    ],
    rdDocumentation: [
      "Detail-Tracking R&D-Spend pro IP-Asset",
      "Software-Copyright-Registrierung",
      "BELSPO-Forschungsförderungs-Anträge unterstützen Dokumentation",
      "Nexus-Berechnung jährlich",
    ],
    pros: [
      "Niedriger effektiver Satz (3,75 %)",
      "Software ohne Patent qualifiziert",
      "EU-Mitglied + Mutter-Tochter-RL",
      "DBA-DE mit 0 % Royalty-Quellensteuer",
      "Nicht-genutztes IID kann unbegrenzt vorgetragen werden",
    ],
    cons: [
      "Substanz scharf geprüft seit 2018",
      "Setup 15.000-30.000 €",
      "Französische/Niederländische Sprache für lokale Behörden",
      "Bürokratie höher als CY/PL",
      "Compliance-Costs 10.000-20.000 €/Jahr",
    ],
    dbaNote:
      "DBA-DE 2002 (Update 2021), 0 % Quellensteuer auf Royalties. AStG-Risiko niedrig bei aktiver R&D-Substanz.",
    cfcRisk: "Niedrig",
    setupComplexity: "Komplex",
    minRoyaltiesEur: 500000,
    setupCostEur: "15.000-30.000 €",
    runningCostEur: "10.000-20.000 €/Jahr",
    fitForGermans: "Mittel",
    officialUrl: "https://finance.belgium.be",
  },
];
