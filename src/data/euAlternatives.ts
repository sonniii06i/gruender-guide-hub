// EU- und Schweiz-Rechtsform-Alternativen für deutsche Gründer.
// Stand: Mai 2026. Steuersätze + Mindestkapital können sich ändern, immer mit StB final klären.

export type EUAlternative = {
  slug: string;
  country: string;
  flag: string;
  legalForm: string;
  shortName: string;
  /** Mindeststammkapital in EUR (umgerechnet, Stand 2026). */
  minCapital: number;
  /** Davon bei Gründung sofort einzuzahlen in % oder EUR. */
  capitalPaidUp: string;
  /** KSt-Satz (oder Pendant). */
  corporateTax: string;
  /** Gewerbesteuer / lokale Zusatzsteuern. */
  localTax: string;
  /** Effektive Gesamt-Steuer auf Unternehmensgewinn. */
  effectiveTotal: string;
  /** Quellensteuer auf Dividenden ans Ausland. */
  withholdingDividends: string;
  /** Mit Deutschland: greift Mutter-Tochter-Richtlinie? */
  motherDaughterApplies: boolean;
  /** Substanz-Anforderungen. */
  substance: string;
  /** Setup-Zeit von Gründung bis aktiv. */
  setupTime: string;
  /** Setup-Kosten einmalig. */
  setupCost: string;
  /** Laufende Kosten/Jahr. */
  runningCost: string;
  /** Eignung für DE-Gründer. */
  fitForGermans: string;
  /** Wann diese Form sinnvoll. */
  bestFor: string[];
  /** Vorteile. */
  pros: string[];
  /** Nachteile / Fallstricke. */
  cons: string[];
  /** Reale Beispiele wer diese Form nutzt. */
  realExamples: string[];
  /** Setup-Schritte. */
  setupSteps: string[];
  /** Wichtige rechtliche Aspekte für DE-Steuer. */
  deTaxImpact: string;
  /** Behörden + offizielle Links. */
  officialLinks: { label: string; url: string }[];
};

export const EU_ALTERNATIVES: EUAlternative[] = [
  // ============================================================
  // ESTLAND OÜ
  // ============================================================
  {
    slug: "estland-ou",
    country: "Estland",
    flag: "🇪🇪",
    legalForm: "Osaühing (OÜ)",
    shortName: "Estland OÜ",
    minCapital: 0.01,
    capitalPaidUp: "0,01 € seit 02/2023 (vorher 2.500 €)",
    corporateTax: "0 % auf thesaurierte Gewinne · 22 % bei Ausschüttung (ab 2025)",
    localTax: "0 % (keine GewSt-Pendant)",
    effectiveTotal: "0 % wenn reinvestiert, 22 % bei Ausschüttung",
    withholdingDividends: "0 % (EU-Mutter-Tochter)",
    motherDaughterApplies: true,
    substance: "Mind. 1 lokaler Geschäftsführer ODER Service-Anbieter (Xolo, Companio etc.). Echte Substanz nicht erforderlich für legitime Geschäfte.",
    setupTime: "2–5 Werktage online via e-Residency",
    setupCost: "100 € e-Residency-Karte + 265 € Notar + 200 € Service-Provider Setup",
    runningCost: "1.500–2.500 €/Jahr (Buchhaltung + Adresse + Service)",
    fitForGermans: "Sehr gut",
    bestFor: [
      "Solo-Founder mit reinem Online-Business (Software, Consulting, Affiliate)",
      "Wer Gewinne reinvestieren will (0 % Steuer auf Thesaurierung)",
      "Digitale Nomaden / Remote-Worker",
      "Geringe Setup-Kosten + minimaler Bürokratie-Aufwand",
    ],
    pros: [
      "**0 % Steuer auf nicht-ausgeschüttete Gewinne** (Estland-Spezialität — einzigartig in EU)",
      "Komplett digital via e-Residency möglich (kein Estland-Besuch nötig)",
      "Nur 22 % Steuer bei Ausschüttung — niedriger als DE-Holding-Setup",
      "EU-Mitglied → Mutter-Tochter-Richtlinie, EU-Verträge, EU-Recht",
      "Service-Provider wie Xolo (~80 €/Mon) oder Companio nehmen alles ab",
    ],
    cons: [
      "**§AStG Hinzurechnungsbesteuerung** kann bei passiven Einkünften greifen wenn DE-ansässig + > 50 % beherrscht",
      "**Substance-Frage**: BMF kann Sitz nach DE umqualifizieren wenn Geschäftsleitung de facto in DE",
      "Bei DE-Wohnsitz: Ausschüttungen unterliegen trotzdem AbgSt 26,375 % zusätzlich",
      "Buchhaltungs-Pflicht in EE + DE doppelt",
      "Bei Banking: viele Banks lehnen non-resident OÜs ab (Wise / LHV / Revolut Business funktionieren)",
    ],
    realExamples: [
      "Tech-Founder die digital arbeiten (1000+ DE-Founder mit OÜ via Xolo)",
      "Remote-First-Agenturen",
      "Solo-Konsultanten / Freelance-Devs",
      "TransferWise (heute Wise) — startete als estnische Firma",
    ],
    setupSteps: [
      "1. e-Residency beantragen (https://www.e-resident.gov.ee, 100 €, 6–12 Wochen Bearbeitung)",
      "2. e-Residency-Karte abholen in DE (Berliner Botschaft o.ä.)",
      "3. Service-Provider wählen (Xolo Go für Solos, Companio für mehr Customization)",
      "4. OÜ online via e-Business-Register gründen (~265 € Notargebühr, 1 Tag)",
      "5. Bankkonto eröffnen (LHV / Wise Business / Revolut Business)",
      "6. Buchhaltung + Steuern via Service-Provider laufen lassen",
    ],
    deTaxImpact: "Bei DE-Wohnsitz: §7-14 AStG Hinzurechnung bei passiven Einkünften (Lizenz, Zinsen, Dividenden) prüfen. Aktive Geschäftstätigkeit (echte Software-Entwicklung, Consulting) typisch unkritisch. Bei Ausschüttung an DE-Resident: zusätzlich AbgSt 26,375 % minus EE-Vorbelastung.",
    officialLinks: [
      { label: "e-Residency Portal", url: "https://www.e-resident.gov.ee" },
      { label: "e-Business-Register", url: "https://ariregister.rik.ee/eng" },
      { label: "Xolo (Service-Provider)", url: "https://www.xolo.io" },
      { label: "Companio (Service-Provider)", url: "https://www.companio.co" },
    ],
  },

  // ============================================================
  // NIEDERLANDE BV
  // ============================================================
  {
    slug: "niederlande-bv",
    country: "Niederlande",
    flag: "🇳🇱",
    legalForm: "Besloten Vennootschap (BV)",
    shortName: "Niederlande BV",
    minCapital: 0.01,
    capitalPaidUp: "0,01 € seit Flex-BV-Reform 2012",
    corporateTax: "19 % bis 200k Gewinn · 25,8 % darüber",
    localTax: "0 % (keine Gewerbesteuer)",
    effectiveTotal: "19 % bis 200k · 25,8 % darüber",
    withholdingDividends: "0 % (EU-Mutter-Tochter) bzw. 15 % regulär",
    motherDaughterApplies: true,
    substance: "1 Geschäftsführer + niederländische Adresse (eigenes Büro / Coworking / Service-Provider). Mailbox-only wird seit 2024 strenger geprüft.",
    setupTime: "1–2 Wochen",
    setupCost: "1.500–3.000 € (Notar + Eintrag + erste Buchhaltung)",
    runningCost: "3.000–6.000 €/Jahr",
    fitForGermans: "Sehr gut",
    bestFor: [
      "DE-Founder mit grenzüberschreitendem Geschäft DE/NL/BE",
      "IP-Holding wenn Lizenzschranke §4j EStG umgangen werden soll",
      "Software / SaaS mit europäischer Kundenbasis",
      "Holding für internationale Beteiligungen (Mutter-Tochter)",
    ],
    pros: [
      "**Innovation Box**: 9 % Steuer auf Patent-/IP-Einkünfte (statt 25,8 %) — sehr lukrativ für Software",
      "**Participation Exemption (deelnemingsvrijstelling)**: 100 % Steuer-Befreiung auf Beteiligungs-Erträge (besser als DE 95 %)",
      "Englischsprachige Behörden + Notare (kein Sprach-Issue)",
      "Sehr stabile Rechtsprechung + business-freundlich",
      "Doppelbesteuerungsabkommen DE-NL ausgezeichnet",
    ],
    cons: [
      "**Innovation Box**: hohe Substanz-Anforderungen (BEPS) — pure IP-Holding ohne F&E reicht nicht mehr",
      "**Substance-Test seit 2024 verschärft** (ATAD III): Mailbox-BV ohne lokale Mitarbeiter wird durchschaut",
      "Doppel-Buchhaltung DE + NL nötig wenn DE-Wohnsitz",
      "GF muss tatsächlich Geschäftsleitung in NL ausführen (nicht nur Briefkasten)",
    ],
    realExamples: [
      "Adyen NV (Listing in NL, später BV-Strukturen)",
      "Booking.com (NL-Hauptsitz)",
      "viele DE-Tech-Startups mit NL-Holding für Investor-Friendly-Setup",
      "Kering (Luxus-Konzern hat NL-IP-Holdings)",
    ],
    setupSteps: [
      "1. Niederländischen Notar finden (English-speaking, Amsterdam/Rotterdam typisch)",
      "2. Articles of Association vorbereiten lassen",
      "3. Bank-Account vor Notar-Termin vorbereiten (ABN AMRO, ING, bunq für Solos)",
      "4. Notar-Termin (kann remote via Video, ~1.000 € Notar-Fee)",
      "5. Eintragung im KVK (Kamer van Koophandel, ~50 €)",
      "6. BTW-Nummer (NL-USt-ID) bei Belastingdienst beantragen",
      "7. Substance-Setup: Adresse, ggf. lokaler Director / Co-Director",
    ],
    deTaxImpact: "Wenn DE-Wohnsitz: §AStG Hinzurechnung wenn Beherrschung > 50 % + niedrigere Besteuerung (< 25 %) bei passiven Einkünften. Aktive NL-BV mit Substanz: Mutter-Tochter-Richtlinie greift, 0 % Quellensteuer auf Dividenden zu DE-Holding.",
    officialLinks: [
      { label: "KVK (Handelsregister)", url: "https://www.kvk.nl/english/" },
      { label: "Belastingdienst (Finanzamt)", url: "https://www.belastingdienst.nl/wps/wcm/connect/en/" },
      { label: "Innovation Box Erklärung", url: "https://business.gov.nl/regulation/innovation-box/" },
    ],
  },

  // ============================================================
  // SCHWEIZ AG / GmbH
  // ============================================================
  {
    slug: "schweiz-gmbh",
    country: "Schweiz",
    flag: "🇨🇭",
    legalForm: "GmbH",
    shortName: "Schweiz GmbH",
    minCapital: 20000,
    capitalPaidUp: "20.000 CHF (~21.000 €) zu 100 % bei Gründung",
    corporateTax: "8,5 % Bundessteuer + 11–18 % Kantonal = 11,9–21 % gesamt (kantonal abhängig)",
    localTax: "Kantonal abhängig — Zug 11,9 %, Zürich 19,7 %, Genf 14 %",
    effectiveTotal: "11,9–21 % je Kanton (Zug = günstigster)",
    withholdingDividends: "35 % regulär · 0 % bei DE-Holding-DBA wenn ≥ 25 % Beteiligung gehalten 1 Jahr",
    motherDaughterApplies: false,
    substance: "Mind. 1 in CH ansässiger Geschäftsführer ODER beauftragter Mitarbeiter. Office Space (Coworking ok). Mailbox-only wird abgelehnt.",
    setupTime: "1–3 Wochen",
    setupCost: "3.000–5.000 € (Notar + Handelsregister + Stammkapital)",
    runningCost: "5.000–10.000 €/Jahr (Treuhänder + Adresse + Buchhaltung)",
    fitForGermans: "Mittel (Substanz-Hürde)",
    bestFor: [
      "Premium-Brands mit CH-Image-Vorteil (Uhren, Pharma, Finanzen)",
      "Beratungs-Geschäft mit CH-Nachfrage",
      "Holding mit niedrigem Steuer-Korridor (Kanton Zug)",
      "Wer wirklich nach CH umziehen will (echte Substanz)",
    ],
    pros: [
      "**Niedrigste KSt in Westeuropa** (Zug 11,9 %, Schwyz 14 %)",
      "Brand-Image 'Swiss made' = Premium + Vertrauen",
      "Privatsphäre: kein UBO-Register so detailliert wie EU",
      "Politisch + wirtschaftlich extrem stabil",
      "Erbschafts-/Schenkungssteuer kantonal: oft 0 % zwischen Familienmitgliedern",
    ],
    cons: [
      "**Hohes Mindeststammkapital 20k CHF** (DE-GmbH 25k EUR vergleichbar)",
      "**Substanz-Pflicht streng**: lokaler GF, eigene Räume, echte Geschäftstätigkeit — sonst Sitz-Verlegung nach DE durch BMF",
      "DE-AStG Hinzurechnung bei niedriger Besteuerung (<25 %) und passiven Einkünften",
      "Quellensteuer 35 % auf Dividenden (auch wenn DBA-Reduktion)",
      "Bürokratie höher als EU (CH-Recht eigenständig, andere Buchhaltungs-Standards)",
      "Wechselkurs-Risiko EUR/CHF",
    ],
    realExamples: [
      "Glencore, Nestlé, Roche — globale Konzerne mit CH-Sitz",
      "Aktivistische DACH-Founder mit CH-Holding (z.B. ehemals Tilman Fertitta-Affen-Brothers)",
      "Swiss Tax-Advisory-Klassiker für DACH-Familien",
      "DE-Trader mit CH-AG für Krypto-/Aktien-Trading",
    ],
    setupSteps: [
      "1. Treuhänder / Anwalt in CH wählen (Zug, Zürich) — empfohlen statt DIY",
      "2. Statuten + Gesellschaftsvertrag vorbereiten lassen (CHF, Stammkapital, GF, Sitz)",
      "3. Stammkapital auf Kapitaleinzahlungskonto einzahlen (20k CHF)",
      "4. Notar-Termin (in CH, persönlich oder via Vollmacht)",
      "5. Handelsregister-Eintrag (~600 CHF Gebühr)",
      "6. UID-Nummer (CH-USt-Pendant) beantragen",
      "7. Substance-Setup: lokaler GF, Adresse, ggf. Mitarbeiter",
    ],
    deTaxImpact: "DBA Deutschland-Schweiz: bei ≥ 25 % Beteiligung + 1 Jahr Haltedauer → 0 % Quellensteuer. AStG-Hinzurechnung wenn GF in DE wohnt + CH-Steuersatz <25 % + passive Einkünfte. Aktive CH-Substanz mit echtem Geschäft: typisch unkritisch.",
    officialLinks: [
      { label: "ZEFIX (CH-Handelsregister)", url: "https://www.zefix.ch/de/search/entity/welcome" },
      { label: "Steuerdaten Kantone (KPMG)", url: "https://kpmg.com/ch/en/insights/tax/swiss-tax-report.html" },
      { label: "Wirtschaftsförderung Zug", url: "https://www.zug.ch/economy" },
    ],
  },

  // ============================================================
  // ÖSTERREICH FlexCo (NEU 2024)
  // ============================================================
  {
    slug: "oesterreich-flexco",
    country: "Österreich",
    flag: "🇦🇹",
    legalForm: "Flexible Kapitalgesellschaft (FlexCo)",
    shortName: "Österreich FlexCo",
    minCapital: 10000,
    capitalPaidUp: "5.000 € sofort (50 %)",
    corporateTax: "23 % (seit 01/2024)",
    localTax: "0 % (keine GewSt)",
    effectiveTotal: "23 % (deutlich unter DE 30 %)",
    withholdingDividends: "27,5 % (KESt) regulär · 0 % via DBA Deutschland",
    motherDaughterApplies: true,
    substance: "GF mit Wohnsitz in EU/EWR. AT-Adresse. Substanz-Anforderungen moderat.",
    setupTime: "1–2 Wochen",
    setupCost: "1.500–2.500 € (Notar + HR + StB)",
    runningCost: "2.000–4.000 €/Jahr",
    fitForGermans: "Sehr gut",
    bestFor: [
      "DE-Founder mit DACH-Geschäft (D + A + CH)",
      "Startup-Setups mit Vesting / Mitarbeiter-Beteiligung (FlexCo erlaubt das einfach)",
      "Family-Office-Holdings (oft AT statt DE)",
      "VC-Investoren-friendly (FlexCo ist Startup-optimiert)",
    ],
    pros: [
      "**FlexCo seit 01/2024**: bessere Mitarbeiter-Beteiligung als DE-GmbH (Vesting, Stock Options, Reverse Vesting eingebaut)",
      "**23 % KSt** vs. DE ~30 % — 7 Prozentpunkte Vorteil bei thesaurierten Gewinnen",
      "Mutter-Tochter-Richtlinie: 0 % Quellensteuer zu DE-Holding",
      "**Deutsche Sprache** + ähnliches Recht → minimaler Lern-Aufwand für DE-Founder",
      "Stammkapital halbiert vs. DE-GmbH (10k vs 25k)",
      "Beteiligungsertragsbefreiung ähnlich §8b KStG (95 % steuerfrei)",
    ],
    cons: [
      "**§AStG**: bei reiner Briefkasten-FlexCo ohne Substanz wird Sitz nach DE versetzt",
      "Bei DE-Wohnsitz GF: AT-Steuer + DE-Steuer → DBA muss greifen",
      "FlexCo ist neu (2024) — wenig Rechtsprechung, einige Unsicherheiten",
      "Bei größerer Größe: Aufsichtsrat-Pflicht (ab 50 MA / 5 Mio €)",
    ],
    realExamples: [
      "Bitpanda (AT-Setup, Crypto-Exchange)",
      "Runtastic (vor Adidas-Übernahme AT-Holding)",
      "Storyblok (AT-Tech-Startup)",
      "viele DACH-Startups mit AT-FlexCo seit 2024 als Cap-Table-Friendly Setup",
    ],
    setupSteps: [
      "1. AT-Notar finden (Wien, Salzburg, Linz typisch)",
      "2. Gesellschaftsvertrag mit Vesting-/Mitarbeiter-Beteiligungs-Klauseln (FlexCo-Spezial)",
      "3. Stammkapital einzahlen (5k sofort)",
      "4. Notar-Termin + Beurkundung",
      "5. HR-Eintrag (Firmenbuch)",
      "6. UID (AT-USt-ID) + Steuernummer",
      "7. Bei Mitarbeiter-Beteiligung: Beteiligungsplan ausarbeiten (FlexCo unterstützt 'Unternehmenswertanteile')",
    ],
    deTaxImpact: "DBA DE-AT: bei ≥ 10 % Beteiligung 0 % Quellensteuer. Mutter-Tochter-RL greift. Bei DE-GF: Wohnsitz-Frage entscheidet — wenn GF in AT wohnt, fast unkritisch. Wenn DE-Wohnsitz aber AT-Geschäftsleitung → DBA Art. 4 Tie-Breaker Rule.",
    officialLinks: [
      { label: "Firmenbuch (AT-Handelsregister)", url: "https://www.justiz.gv.at/firmenbuch.de.html" },
      { label: "FlexCo-Übersicht (BMF Österreich)", url: "https://www.bmf.gv.at/" },
      { label: "WKO Gründerservice", url: "https://www.wko.at/service/wirtschaftsrecht-gewerberecht/gruenderservice.html" },
    ],
  },

  // ============================================================
  // IRLAND LIMITED
  // ============================================================
  {
    slug: "irland-ltd",
    country: "Irland",
    flag: "🇮🇪",
    legalForm: "Private Limited Company (Ltd)",
    shortName: "Irland Ltd",
    minCapital: 1,
    capitalPaidUp: "1 € genügt formal",
    corporateTax: "12,5 % auf Trading Income · 25 % auf Passive Income",
    localTax: "0 %",
    effectiveTotal: "12,5 % bei aktivem Geschäft",
    withholdingDividends: "0 % via EU-Richtlinie / 25 % regulär",
    motherDaughterApplies: true,
    substance: "Mind. 1 EWR-resident Director ODER Bond (~25k €). Adresse in IE.",
    setupTime: "1–2 Wochen",
    setupCost: "1.500–3.000 € (Anwalt + CRO-Eintrag + Bond falls non-EWR-Director)",
    runningCost: "3.000–6.000 €/Jahr",
    fitForGermans: "Gut",
    bestFor: [
      "Software / SaaS mit globaler Kundenbasis",
      "Tech-Startups mit USA-Investoren (US-Investoren akzeptieren IE besser als DE)",
      "Aggregatoren / E-Commerce mit EU-Vertrieb",
      "Pharma-IP-Holdings",
    ],
    pros: [
      "**12,5 % KSt** — niedrigster Standard-Satz in EU bei aktivem Geschäft",
      "Knowledge Development Box: 6,25 % auf qualifizierten IP-Einkünften",
      "Englischsprachiges Common-Law-System (familiär für US-Investoren)",
      "EU-Mitglied + Doppelbesteuerungsabkommen mit USA",
      "Sehr business-friendly Rechtsprechung",
    ],
    cons: [
      "**Substanz-Anforderungen**: IE-resident Director ODER 25k Bond (compliance officer)",
      "**Pillar 2 OECD ab 2024**: 15 % Mindeststeuer für große Konzerne (>750 Mio Umsatz) — 12,5 % Vorteil weg",
      "**Trading vs. Passive Income**: Finanzamt prüft genau — falsche Klassifikation = 25 %",
      "Bei DE-Wohnsitz: AStG-Hinzurechnung möglich",
    ],
    realExamples: [
      "Google EMEA HQ (Dublin)",
      "Apple Operations Ireland",
      "Stripe (Limited registriert in IE)",
      "Workday EMEA, viele US-Tech-Companies mit IE-Subsidiary",
    ],
    setupSteps: [
      "1. IE-Anwalt / Service-Provider wählen (z.B. WilliamFry, Mason Hayes)",
      "2. Director: entweder selbst nach IE bewegen ODER lokalen Director engagieren ODER Bond (~25k) hinterlegen",
      "3. Memorandum + Articles of Association vorbereiten",
      "4. CRO (Companies Registration Office) Antrag",
      "5. Bei aktiv: Tax Registration TR1/TR2 beim Revenue (IE-Finanzamt)",
      "6. Bank-Account (AIB, Bank of Ireland, Wise Business)",
    ],
    deTaxImpact: "AStG bei DE-Wohnsitz: passive Einkünfte hinzugerechnet wenn Beherrschung > 50 %. Aktive Software/Trading: typisch unkritisch. Mutter-Tochter-RL für Dividenden zu DE-Holding.",
    officialLinks: [
      { label: "CRO (Companies Registration Office)", url: "https://www.cro.ie" },
      { label: "Revenue (IE-Finanzamt)", url: "https://www.revenue.ie" },
      { label: "Knowledge Development Box", url: "https://www.revenue.ie/en/companies-and-charities/reliefs-and-exemptions/knowledge-development-box/index.aspx" },
    ],
  },

  // ============================================================
  // ZYPERN LIMITED
  // ============================================================
  {
    slug: "zypern-limited",
    country: "Zypern",
    flag: "🇨🇾",
    legalForm: "Private Limited Company",
    shortName: "Zypern Ltd",
    minCapital: 1,
    capitalPaidUp: "1.000 € typisch (kein gesetzliches Minimum)",
    corporateTax: "15 % (KSt-Reform ab 01.01.2026, vorher 12,5 %)",
    localTax: "0 %",
    effectiveTotal: "15 % · 0 % auf Dividenden-Erträge mit Schachtelprivileg",
    withholdingDividends: "0 % auf Dividenden ans Ausland (auch Drittstaaten)",
    motherDaughterApplies: true,
    substance: "Mind. 1 lokaler Director + Adresse. Substance Test ATAD III ab 2024 strenger.",
    setupTime: "1–2 Wochen",
    setupCost: "1.500–3.500 € (Anwalt + Notar + Service)",
    runningCost: "2.500–5.000 €/Jahr",
    fitForGermans: "Mittel (ATAD-Risiko)",
    bestFor: [
      "Holding für internationale Beteiligungen (kein WHT auf Out-Dividenden)",
      "Trading-Companies (Crypto, Forex)",
      "IP-Holdings (50-80 % Notional Interest Deduction möglich)",
      "Wer DBA mit Russland / GUS / Mittlerem Osten braucht",
    ],
    pros: [
      "**15 % KSt** (ab 2026, vorher 12,5 %) + 0 % auf Out-Dividenden (kein WHT)",
      "**Notional Interest Deduction**: bis zu 80 % Deduction auf neues Equity",
      "EU-Mitglied + Mutter-Tochter-Richtlinie",
      "DBA-Netzwerk mit > 60 Ländern (auch Russland, Indien, China)",
      "Englisch zweite Amtssprache, Common-Law-Reste",
    ],
    cons: [
      "**Reputations-Risiko**: 'Briefkasten-Zypern' hat schlechten Ruf seit Cyprus-Files etc.",
      "**ATAD III seit 2024**: Mailbox-Companies werden durchschaut, Substance-Test verschärft",
      "**§AStG explizit**: bei DE-Wohnsitz greift Hinzurechnung schneller (CY auf BMF-Watch-List)",
      "Banking schwierig (CY-Banken nehmen seit 2018 nicht mehr easy non-resident KMUs)",
      "Viele DE-StBs raten ab wegen Compliance-Aufwand",
    ],
    realExamples: [
      "viele russische / GUS-Founder mit CY-Holding (vor Sanctions)",
      "Crypto-Exchanges (z.B. Bitfinex hat CY-Strukturen)",
      "DACH-Trading-Firmen für Aktien/Forex",
      "Vorsicht: viele 'Tax Optimierungs-Setups' der 2010er sind heute riskant",
    ],
    setupSteps: [
      "1. CY-Anwalt finden (typisch in Larnaca/Limassol)",
      "2. Director-Setup (eigener oder lokaler Nominee)",
      "3. Memorandum + Articles vorbereiten",
      "4. Eintragung im Registrar of Companies",
      "5. Tax-Identification-Number beim CY-Tax-Department",
      "6. Bank-Account (sehr schwierig für Non-Residents — Hellenic Bank, Bank of Cyprus selektiv)",
      "7. ATAD-konforme Substance einrichten (echte Office-Räume, lokale Mitarbeiter)",
    ],
    deTaxImpact: "AStG-Hinzurechnung wahrscheinlich bei DE-Wohnsitz wegen niedrigem CY-Steuersatz + oft passive Einkünfte. Substance-Test verschärft seit 2024 — pure Holding ohne aktive Tätigkeit + lokale GF wird durchschaut.",
    officialLinks: [
      { label: "CY Registrar of Companies", url: "https://www.companies.gov.cy/en/" },
      { label: "CY Tax Department", url: "https://www.mof.gov.cy/mof/tax/taxdep.nsf" },
    ],
  },

  // ============================================================
  // POLEN Sp. z o.o.
  // ============================================================
  {
    slug: "polen-sp-z-oo",
    country: "Polen",
    flag: "🇵🇱",
    legalForm: "Spółka z ograniczoną odpowiedzialnością (Sp. z o.o.)",
    shortName: "Polen Sp. z o.o.",
    minCapital: 5000,
    capitalPaidUp: "5.000 PLN (~1.150 €) zu 100 %",
    corporateTax: "9 % bei Umsatz < 2 Mio €/Jahr · 19 % darüber",
    localTax: "0 %",
    effectiveTotal: "9 % (Small) bzw. 19 %",
    withholdingDividends: "19 % regulär · 0 % via EU-Mutter-Tochter",
    motherDaughterApplies: true,
    substance: "1 Geschäftsführer (kann EU-Resident sein) + PL-Adresse",
    setupTime: "1–3 Wochen (S24-Online-Verfahren: 24h möglich)",
    setupCost: "500–1.500 € (S24-Online: ~250 €, klassisch Notar: 800–1.500 €)",
    runningCost: "1.500–3.000 €/Jahr",
    fitForGermans: "Sehr gut (DE-Grenznähe + günstig)",
    bestFor: [
      "DE-Brands mit PL-Geschäft (Versand, Lager)",
      "Nearshoring Tech-Teams in Polen",
      "Klein-Companies mit < 2 Mio Umsatz (9 % KSt!)",
      "Holdings für osteuropäische Beteiligungen",
    ],
    pros: [
      "**9 % KSt für 'Small Taxpayer'** (Umsatz < 2 Mio EUR) — niedrigster Satz in EU",
      "**S24 Online-Gründung in 24h** ohne Notar",
      "Sehr niedriges Stammkapital (1.150 EUR)",
      "EU + Mutter-Tochter-Richtlinie + ähnliche Rechts-Grundsätze wie DE",
      "Günstiges Banking + Buchhaltung",
    ],
    cons: [
      "Polnisch als Amtssprache (Übersetzungen für DE-StB nötig)",
      "Bei > 2 Mio Umsatz: 19 % KSt wie DE",
      "DE-Wohnsitz GF: AStG-Hinzurechnung möglich",
      "Buchhaltungs-Standards anders (PL-GAAP) — bei DE-Konsolidierung Mehraufwand",
    ],
    realExamples: [
      "Allegro (PL-E-Commerce-Riese, börsennotiert)",
      "Reversia, Brainly (Edu-Tech) — PL-gegründet",
      "viele DE-Mittelständler mit PL-Tochter für Produktion / Service",
      "DACH-D2C-Brands mit PL-Fulfillment-Setups",
    ],
    setupSteps: [
      "1. Online-Gründung über S24-Portal (https://ekrs.ms.gov.pl) — Standard-Mustervertrag",
      "2. Stammkapital einzahlen (5.000 PLN auf Treuhand)",
      "3. Eintragung im Krajowy Rejestr Sądowy (KRS)",
      "4. NIP-Nummer (PL-Steuernummer)",
      "5. Bank-Account (mBank, ING Bank Śląski, Santander)",
      "6. ZUS-Anmeldung (Sozialversicherung) wenn Mitarbeiter",
    ],
    deTaxImpact: "DBA DE-PL gut: 0 % Quellensteuer auf Dividenden bei ≥ 25 % + 2 Jahre Haltedauer. AStG bei DE-GF + passiven Einkünften möglich. Aktive Geschäftstätigkeit (echte PL-Mitarbeiter) typisch unkritisch.",
    officialLinks: [
      { label: "S24 Online-Gründung", url: "https://ekrs.ms.gov.pl" },
      { label: "KRS (Handelsregister)", url: "https://ekrs.ms.gov.pl/web/wyszukiwarka-krs/" },
    ],
  },

  // ============================================================
  // TSCHECHIEN s.r.o.
  // ============================================================
  {
    slug: "tschechien-sro",
    country: "Tschechien",
    flag: "🇨🇿",
    legalForm: "společnost s ručením omezeným (s.r.o.)",
    shortName: "Tschechien s.r.o.",
    minCapital: 1,
    capitalPaidUp: "1 CZK seit Reform 2014",
    corporateTax: "21 %",
    localTax: "0 %",
    effectiveTotal: "21 %",
    withholdingDividends: "15 % regulär · 0 % via EU-Mutter-Tochter",
    motherDaughterApplies: true,
    substance: "1 Geschäftsführer + CZ-Adresse",
    setupTime: "1–2 Wochen",
    setupCost: "1.000–2.000 €",
    runningCost: "2.000–3.500 €/Jahr",
    fitForGermans: "Gut",
    bestFor: [
      "DE-Mittelstand mit CZ-Produktion / Service",
      "Logistik / Versand-Setup für CEE",
      "Kleinere Holding-Strukturen für osteuropäische Beteiligungen",
    ],
    pros: [
      "**1 CZK Stammkapital** — niedrigste Hürde in EU",
      "21 % KSt — leicht unter DE",
      "EU + Mutter-Tochter",
      "Niedrige laufende Kosten",
      "Stabile Wirtschaft + EU-Recht",
    ],
    cons: [
      "Tschechisch als Amtssprache",
      "Buchhaltungs-Standards anders",
      "Kleiner Markt → wenig isoliert sinnvoll, eher als Tochter mit DE-Mutter",
    ],
    realExamples: [
      "viele DE-Mittelständler mit CZ-Töchtern (Skoda als VW-Tochter, viele Maschinenbau-Firmen)",
      "DACH-Tech-Startups mit CZ-Dev-Teams",
    ],
    setupSteps: [
      "1. CZ-Notar oder Service-Provider in Prag/Brünn finden",
      "2. Gründungsvertrag + Statuten (kann englisch + tschechisch parallel)",
      "3. Notar-Beurkundung + Eintragung Justizregister",
      "4. CZ-Steuernummer + DIČ (USt-ID)",
      "5. Bank-Account (Komerční Banka, Česká spořitelna)",
    ],
    deTaxImpact: "DBA DE-CZ: 0 % Quellensteuer bei Beteiligung ≥ 25 % + 1 Jahr. AStG-Hinzurechnung möglich bei DE-Wohnsitz + passiven Einkünften.",
    officialLinks: [
      { label: "Justice CZ (Handelsregister)", url: "https://or.justice.cz/ias/ui/rejstrik" },
    ],
  },

  // ============================================================
  // LUXEMBURG SPF (Familien-Vermögens-Verwaltungs-Gesellschaft)
  // ============================================================
  {
    slug: "luxemburg-spf",
    country: "Luxemburg",
    flag: "🇱🇺",
    legalForm: "SPF (Société de gestion de Patrimoine Familial)",
    shortName: "Luxemburg SPF",
    minCapital: 12000,
    capitalPaidUp: "12.000 € (S.à r.l.) bzw. 30.000 € (S.A.) zu 100 %",
    corporateTax: "0 % auf Einkommen + Gewinn (KSt-befreit!)",
    localTax: "0,25 % Subscription-Tax p.a. auf NAV (Cap: 125.000 €/Jahr)",
    effectiveTotal: "Nur 0,25 % Abonnementsteuer · keine KSt · keine GewSt",
    withholdingDividends: "0 % auf Dividenden zwischen SPFs · 15 % regulär (DBA-Reduktion möglich)",
    motherDaughterApplies: false,
    substance: "Domiciliation-Provider in LU + 1 lokaler Director ausreichend. KEINE kommerzielle Tätigkeit erlaubt — nur Halten von Wertpapieren, Beteiligungen, Cash, Edelmetallen.",
    setupTime: "2–4 Wochen",
    setupCost: "5.000–10.000 € (Notar + Anwalt + erste Domiciliation)",
    runningCost: "8.000–15.000 €/Jahr (Domiciliation + Buchhaltung + Compliance)",
    fitForGermans: "Mittel",
    bestFor: [
      "Family-Offices mit privatem Vermögen > 2 Mio €",
      "Wer Aktien-/Anleihen-Portfolio steuer-optimal halten will",
      "Generationen-Vermögensplanung mit EU-Compliance",
      "Wer 0 % Steuer auf Kapitalerträge + 0 % Veräußerungsgewinne will",
      "Höchste Privacy-Anforderungen (LU ist diskret aber EU-compliant)",
    ],
    pros: [
      "**0 % Körperschaftssteuer** auf Dividenden, Zinsen, Veräußerungsgewinne (komplett befreit)",
      "**Nur 0,25 % Subscription-Tax** auf Nettovermögen, gedeckelt auf 125.000 € pro Jahr",
      "Geeignet für ALLE Asset-Klassen: Aktien, Anleihen, ETFs, Edelmetalle, Crypto, Immobilien-Beteiligungen",
      "EU-Mitglied, alle Verträge + Doppelbesteuerungsabkommen",
      "Stabile, business-freundliche Rechtsprechung seit Jahrhunderten",
      "Höchste Privacy-Standards (LU-Bankgeheimnis-Kultur, aber EU-konform)",
    ],
    cons: [
      "**KEINE kommerzielle Tätigkeit erlaubt** — SPF darf nicht aktiv handeln, nur halten. Bei Verstoß: Status-Verlust + rückwirkende Steuer.",
      "**Nur natürliche Personen + Family-Trusts als Eigentümer** (keine Op-GmbHs!)",
      "Kein Mutter-Tochter-Privileg → Dividenden in/aus SPF unterliegen Quellensteuer",
      "**§AStG** greift bei DE-Wohnsitz + passiven Einkünften (was SPF per Definition immer hat)",
      "Hohe laufende Kosten (8–15 k € / Jahr für Domiciliation)",
      "Mindestvermögen für Wirtschaftlichkeit: > 2 Mio € (sonst frisst Domiciliation Steuer-Vorteil auf)",
    ],
    realExamples: [
      "Tausende belgische, niederländische, französische, deutsche Family Offices",
      "Komplexe Multi-Strukturen wie z.B. **DeBa Group SPF** (Vincent Mayer Holding-Konstrukt) mit Sàrl + SA-Töchtern für operatives Geschäft",
      "Private Wealth-Strukturen prominenter UHNW-Familien",
      "Typisch Teil eines größeren Konstrukts: SPF (Vermögen) + Soparfi (Beteiligungen) + Sàrl (operativ)",
    ],
    setupSteps: [
      "1. Domiciliation-Provider in LU wählen (typisch: Loyens & Loeff, Allen Overy, Arendt, kleinere wie Atoz)",
      "2. Rechtsform wählen: S.à r.l. (12k Kapital, max 100 Gesellschafter) oder S.A. (30k, beliebig)",
      "3. Statuten aufsetzen lassen (typisch englisch + französisch)",
      "4. Notar-Termin in LU (kann ggf. via Vollmacht delegiert werden)",
      "5. Eintragung im RCS (Registre de Commerce et des Sociétés)",
      "6. SPF-Status beim Steueramt formell anmelden + jährliche Compliance",
      "7. Bank-Konto bei LU-Bank (BGL BNP Paribas, Banque de Luxembourg, BIL — alle nehmen SPF an)",
    ],
    deTaxImpact: "**§AStG-Hinzurechnung wahrscheinlich**: SPF ist per Definition passive Einkünfte (keine aktive Tätigkeit). Bei DE-Wohnsitz + Beherrschung > 50 %: BMF rechnet SPF-Erträge mit ~30 % in DE-Steuererklärung hinzu. Steuer-Vorteil dadurch oft nivelliert. Sinnvoll meist nur bei: (a) Wegzug aus DE in Nicht-Hochsteuerland, (b) Familienstrukturen mit mehreren Erben in LU/Belgien/NL, (c) reine Erb-/Schenkungssteuer-Planung mit Voll-Verschonung in LU.",
    officialLinks: [
      { label: "RCS Luxembourg (Handelsregister)", url: "https://www.rcsl.lu" },
      { label: "Loi du 11 mai 2007 (SPF-Gesetz)", url: "https://legilux.public.lu/eli/etat/leg/loi/2007/05/11/n9/jo" },
      { label: "Registration Duties LU", url: "https://impotsdirects.public.lu" },
    ],
  },

  // ============================================================
  // LUXEMBURG SOPARFI (Standard-Holding für Beteiligungen)
  // ============================================================
  {
    slug: "luxemburg-soparfi",
    country: "Luxemburg",
    flag: "🇱🇺",
    legalForm: "Soparfi (Société de Participations Financières)",
    shortName: "Luxemburg Soparfi",
    minCapital: 12000,
    capitalPaidUp: "12.000 € (S.à r.l.) bzw. 30.000 € (S.A.) zu 100 %",
    corporateTax: "23,87 % (KSt 16 % + Soli 7 % auf KSt + Gewerbe 6,75 % Stadt Luxemburg; seit Steuerjahr 2025) · 14 % red. KSt bei Gewinn < 175k €",
    localTax: "Gewerbesteuer kommunal (LU-City: 6,75 %)",
    effectiveTotal: "0 % auf qualifizierte Beteiligungs-Erträge (100 % Befreiung) · 23,87 % auf Op-Gewinn",
    withholdingDividends: "0 % via EU-Mutter-Tochter-RL · 15 % regulär (DBA reduzierbar)",
    motherDaughterApplies: true,
    substance: "1 Geschäftsführer (kann ausländisch) + LU-Adresse + lokaler Compliance-Provider. ATAD-konforme Substanz seit 2024 strenger.",
    setupTime: "2–3 Wochen",
    setupCost: "5.000–10.000 €",
    runningCost: "10.000–25.000 €/Jahr (Standard-Holding) bis 50.000 €+ (komplex)",
    fitForGermans: "Gut",
    bestFor: [
      "Internationale Holding für globale Beteiligungen (besser als DE)",
      "Family-Offices mit aktivem Beteiligungs-Management",
      "VC-/Private-Equity-Fonds (Soparfi = Standard für PE-Vehikel)",
      "Wer in mehrere Länder investieren will (LU hat 80+ DBAs)",
      "Pre-IPO-Holdings für deutsche Tech-Startups",
    ],
    pros: [
      "**100 % Beteiligungs-Befreiung (Participation Exemption)**: Dividenden + Capital Gains aus qualifizierten Beteiligungen komplett steuerfrei (Schachtelprivileg deutlich besser als DE 95 %)",
      "Voraussetzung: ≥ 10 % Beteiligung ODER 1,2 Mio € Anschaffungskosten + 12 Monate Haltedauer",
      "**80+ Doppelbesteuerungsabkommen** (mehr als DE)",
      "EU-Mutter-Tochter-Richtlinie greift: 0 % Quellensteuer auf Dividenden zu/von EU-Töchtern",
      "Hochangesehen — keine 'Briefkasten-Steueroase'-Reputation wie CY oder BG",
      "Stabilität + Rechtsschutz extrem hoch (LU ist EU-Banken-/Fonds-Hauptstadt)",
    ],
    cons: [
      "Hohe laufende Kosten — Standard-Soparfi ab 10 k €/Jahr Compliance, komplexe ab 25 k €+",
      "**Gewerbesteuer 6,75 % auf operatives Geschäft** (anders als reine Holding)",
      "**ATAD III ab 2024**: Substance-Test verschärft, Mailbox-Soparfis durchschaut",
      "**§AStG-Hinzurechnung** bei DE-Wohnsitz + passiven Einkünften möglich",
      "Bei DE-Töchtern: Mutter-Tochter-RL macht 0 % Quellensteuer ohnehin verfügbar — LU-Vorteil eher bei Multi-Country-Setups",
    ],
    realExamples: [
      "Amazon EU S.à r.l. (LU-Holding für gesamten EU-Vertrieb)",
      "Apple Operations International (LU-Holding für Apple's globales Cash)",
      "Skype Communications S.à r.l. (vor Microsoft-Übernahme)",
      "Ferrero International S.A. (Familien-Konzern-Holding)",
      "ArcelorMittal S.A. (Stahl-Konzern Headquarter)",
      "tausende deutsche Mittelständler mit LU-Holding für internationale Expansion",
    ],
    setupSteps: [
      "1. LU-Anwalt oder Big-4 (PwC, KPMG, EY, Deloitte LU) kontaktieren",
      "2. Rechtsform (S.à r.l. oder S.A.) + Stammkapital festlegen",
      "3. Statuten + Articles of Association vorbereiten",
      "4. Notar-Beurkundung in LU (~1.500–3.000 € Notar-Fee)",
      "5. Eintragung RCS + Veröffentlichung im Mémorial",
      "6. Substance: Director, Adresse, ggf. lokaler Co-Director, Mitarbeiter (je nach Aktivität)",
      "7. Bank-Account (BGL BNP Paribas, Banque de Luxembourg, BIL für Standard-Strukturen)",
      "8. Steuer-Anmeldung beim Administration des Contributions Directes",
    ],
    deTaxImpact: "Mutter-Tochter-RL: 0 % Quellensteuer auf Dividenden zwischen LU-Soparfi + DE-GmbH (≥ 10 % Beteiligung). Bei DE-Wohnsitz: §AStG-Hinzurechnung bei niedriger Besteuerung (<25 %) UND passiven Einkünften — Soparfi mit aktivem Beteiligungs-Management typisch unkritisch. Beratung essentiell wegen ATAD III.",
    officialLinks: [
      { label: "RCS Luxembourg", url: "https://www.rcsl.lu" },
      { label: "Big-4 LU Tax (PwC)", url: "https://www.pwc.lu/en.html" },
      { label: "Loyens & Loeff LU", url: "https://www.loyensloeff.com/en/en/locations/luxembourg/" },
    ],
  },

  // ============================================================
  // LITAUEN UAB
  // ============================================================
  {
    slug: "litauen-uab",
    country: "Litauen",
    flag: "🇱🇹",
    legalForm: "Uždaroji akcinė bendrovė (UAB)",
    shortName: "Litauen UAB",
    minCapital: 1000,
    capitalPaidUp: "1.000 € seit 2023-Reform · 0,01 € bei Online-Gründung",
    corporateTax: "17 % regulär (ab 2026, war 16 % in 2025) · 7 % bei Small Companies (Umsatz < 300k €/Jahr + < 10 MA, ab 2026; war 6 % in 2025) · 0 % in den ersten 2 Geschäftsjahren",
    localTax: "0 %",
    effectiveTotal: "7 % (Small, ab 2026; erste 2 Jahre 0 %) bzw. 17 % regulär",
    withholdingDividends: "15 % regulär · 0 % via EU-Mutter-Tochter",
    motherDaughterApplies: true,
    substance: "1 Geschäftsführer (kann EU-Resident sein) + LT-Adresse",
    setupTime: "1–2 Wochen (online: 24–48h)",
    setupCost: "500–1.500 €",
    runningCost: "1.500–3.000 €/Jahr",
    fitForGermans: "Sehr gut",
    bestFor: [
      "Fintech-/Tech-Startups (LT ist Fintech-Hub mit Bank-Lizenzen)",
      "Klein-Companies < 300k Umsatz (7 % KSt ab 2026, erste 2 Jahre 0 %)",
      "DACH-Brands mit Baltikum-/Skandinavien-Geschäft",
      "Gaming / Crypto / E-Money-Lizenzen (LT ist beliebt)",
      "Nearshoring Tech-Teams in Vilnius/Kaunas",
    ],
    pros: [
      "**7 % KSt für Small** (Umsatz < 300 k + < 10 MA) ab 2026, **0 % in den ersten 2 Jahren** — sehr attraktiv für Bootstrap-Startups",
      "**Online-Gründung in 24–48h** möglich",
      "EU-Mitglied + Mutter-Tochter-RL",
      "Sehr business-freundlich + englisch-sprachige Behörden",
      "**Fintech-Hub**: LT vergibt schnellster EU E-Money-Lizenzen + EMI-Lizenzen",
      "Niedriges Stammkapital + günstige laufende Kosten",
    ],
    cons: [
      "Bei > 300 k Umsatz: Sprung von 6 % auf 17 %",
      "Litauisch als Amtssprache (Englisch in Geschäftswelt aber überall)",
      "DE-Wohnsitz GF: §AStG bei passiven Einkünften möglich",
      "Banking für Non-Residents schwieriger (Wise/Revolut/Paysera funktionieren)",
    ],
    realExamples: [
      "Vinted (LT-gegründet, heute weltweit größter Second-Hand-Marketplace)",
      "Paysera (LT-Fintech, EMI-Lizenz)",
      "NordVPN / Nord Security (Tochter-Strukturen in LT)",
      "viele Fintech-Startups mit LT-Bank-/EMI-Lizenz für EU-Marktzutritt",
      "DACH-D2C-Brands mit LT-Tech-Teams",
    ],
    setupSteps: [
      "1. Online-Gründung via JADIS (LT-Online-Portal) oder via Anwalt",
      "2. Stammkapital auf Treuhand-Konto einzahlen",
      "3. Eintragung im Registrų centras",
      "4. LT-Steuernummer + UAB-Code",
      "5. Bank-Account (Swedbank LT, SEB, Šiaulių bankas, Paysera für Solos)",
      "6. Bei E-Money-Lizenz: separates Lizenz-Verfahren bei Bank of Lithuania",
    ],
    deTaxImpact: "Mutter-Tochter-RL: 0 % Quellensteuer bei ≥ 10 % Beteiligung. AStG bei DE-Wohnsitz + passiven Einkünften möglich. Aktive Tech-/Fintech-Tätigkeit mit echter Substanz: typisch unkritisch.",
    officialLinks: [
      { label: "Registrų centras (Handelsregister)", url: "https://www.registrucentras.lt/p/82" },
      { label: "Bank of Lithuania (Fintech-Lizenzen)", url: "https://www.lb.lt/en/" },
      { label: "Invest Lithuania", url: "https://investlithuania.com" },
    ],
  },

  // ============================================================
  // MALTA LIMITED
  // ============================================================
  {
    slug: "malta-limited",
    country: "Malta",
    flag: "🇲🇹",
    legalForm: "Private Limited Company",
    shortName: "Malta Ltd",
    minCapital: 1165,
    capitalPaidUp: "20 % (~233 €) sofort einzuzahlen",
    corporateTax: "35 % nominell · 5 % effektiv via 6/7-Refund-System für non-Resident-Shareholder",
    localTax: "0 %",
    effectiveTotal: "5 % effektiv mit Refund-System (nominell 35 %)",
    withholdingDividends: "0 % auf Dividenden ans Ausland (auch zu non-EU)",
    motherDaughterApplies: true,
    substance: "1 lokaler Director ODER beauftragter Compliance-Officer + MT-Adresse. Substance-Test seit 2018 (EC-Pressure) verschärft.",
    setupTime: "2–4 Wochen",
    setupCost: "2.000–4.000 €",
    runningCost: "4.000–8.000 €/Jahr",
    fitForGermans: "Mittel",
    bestFor: [
      "iGaming / Online-Casinos (MT ist EU-Lizenz-Hauptstadt für Gaming)",
      "Investment-Holdings (kein Quellensteuer auf Out-Dividenden)",
      "Crypto-/Blockchain-Companies (MT war 'Blockchain Island' 2018+)",
      "Reichweite mit englisch-sprachigem Team",
      "IP-/Patent-Holdings (Patent Box ähnlich NL)",
    ],
    pros: [
      "**5 % effektive KSt** durch Refund-System (35 % gezahlt → 6/7 zurückerstattet)",
      "**0 % Quellensteuer** auf Out-Dividenden — auch zu non-EU-Empfängern",
      "EU-Mitglied + Mutter-Tochter + 80+ DBAs",
      "Englisch ist Amtssprache (kein Sprach-Issue)",
      "iGaming-Lizenz von MGA (Malta Gaming Authority) ist EU-weit anerkannt",
      "Patent Box: 0 % auf qualifizierten IP-Einkünften",
    ],
    cons: [
      "**Refund dauert 6+ Monate** — du zahlst erst 35 %, bekommst 30 % später zurück (Cashflow-Problem)",
      "**Reputations-Risiko**: Malta hatte EU-Sanktion-Drohungen + Caruana Galizia-Skandal",
      "**Substance-Test seit 2024 verschärft** (ATAD III)",
      "**§AStG** bei DE-Wohnsitz wahrscheinlich (CIT < 25 % nominell? Nein 35%, aber effektiv 5% — Frage strittig)",
      "Hohe Compliance-Kosten relativ zur Größe",
      "Banking für Non-Residents schwierig (Bank of Valletta vorsichtig)",
    ],
    realExamples: [
      "**iGaming-Welt**: Bet365 (vor UK-Move), PokerStars, viele MGA-lizenzierte Casinos",
      "Crypto-Companies wie OKEx (vor Move), Binance hatte 2018-2020 MT-Strukturen",
      "viele DACH-Affiliates / Marketing-Companies",
      "Investment-Holdings kleinerer UHNW-Familien",
    ],
    setupSteps: [
      "1. MT-Anwalt (Camilleri Preziosi, GVZH, Mamo TCV) kontaktieren",
      "2. Memorandum + Articles vorbereiten",
      "3. Director: lokaler oder via Compliance-Provider",
      "4. Eintragung im Malta Business Registry",
      "5. Tax-ID-Nummer + ggf. iGaming-Lizenz separat",
      "6. Bank-Account (Bank of Valletta, HSBC Malta — schwierig für Non-Resident-Solos)",
      "7. Refund-Mechanismus mit Steuerberater einrichten",
    ],
    deTaxImpact: "AStG-Risiko bei DE-Wohnsitz: effektive 5 % CIT < 25 % Schwelle. Aktive Geschäftstätigkeit + echte Substanz nötig. Mutter-Tochter-RL für Dividenden 0 % Quellensteuer zu DE.",
    officialLinks: [
      { label: "Malta Business Registry", url: "https://mbr.mt" },
      { label: "Malta Gaming Authority", url: "https://www.mga.org.mt" },
      { label: "Malta Financial Services", url: "https://www.mfsa.mt" },
    ],
  },

  // ============================================================
  // BULGARIEN EOOD
  // ============================================================
  {
    slug: "bulgarien-eood",
    country: "Bulgarien",
    flag: "🇧🇬",
    legalForm: "Едноличен търговец с ограничена отговорност (EOOD)",
    shortName: "Bulgarien EOOD",
    minCapital: 1,
    capitalPaidUp: "2 BGN (~1 €) seit Reform 2010",
    corporateTax: "10 %",
    localTax: "0 %",
    effectiveTotal: "10 % (niedrigster Standard-Satz EU)",
    withholdingDividends: "5 % regulär · 0 % via EU-Mutter-Tochter",
    motherDaughterApplies: true,
    substance: "1 Geschäftsführer (kann ausländisch sein) + BG-Adresse",
    setupTime: "1–2 Wochen",
    setupCost: "800–1.500 €",
    runningCost: "1.500–2.500 €/Jahr",
    fitForGermans: "Mittel (Substanz + Reputation)",
    bestFor: [
      "Solo-Founder mit Online-Business + niedrigen Kosten",
      "Trading / Crypto / Forex (10 % auf Trading-Gewinne)",
      "IT-Outsourcing / Dev-Teams in BG",
      "Holding für osteuropäische Beteiligungen mit niedrigster KSt",
    ],
    pros: [
      "**10 % KSt** — niedrigster regulärer Satz in EU",
      "5 % Quellensteuer auf Dividenden (vs. DE 26,375 %)",
      "Sehr niedriges Stammkapital + günstige laufende Kosten",
      "EU-Mitglied → Mutter-Tochter-RL greift",
      "Gut für Crypto-/Trading-Setups (klare Steuer-Behandlung)",
    ],
    cons: [
      "**Substanz-Anforderungen schärfer**: BG steht auf BMF-Hochrisiko-Liste",
      "**§AStG** greift fast garantiert bei DE-Wohnsitz + passiven Einkünften",
      "Banking schwierig (BG-Banken vorsichtig bei Non-Residents)",
      "Reputations-Risiko (Briefkasten-BG-Setups in 2010er-Skandalen)",
      "Kyrillisch + Bulgarisch — hoher Übersetzungs-Aufwand",
    ],
    realExamples: [
      "viele DACH-Trading-Firmen (Crypto, Stocks)",
      "DACH-Software-Startups mit BG-Dev-Teams",
      "Affiliate-Marketers mit BG-Setup",
    ],
    setupSteps: [
      "1. BG-Anwalt / Service finden (Sofia)",
      "2. Stammkapital auf Treuhand einzahlen",
      "3. Eintragung im Trade Register (https://portal.registryagency.bg)",
      "4. BG-Steuernummer + UIC-Code",
      "5. Bank-Account (UniCredit Bulbank, DSK, schwierig für Non-Residents)",
    ],
    deTaxImpact: "Hohes AStG-Risiko bei DE-Wohnsitz. Aktive Substanz nötig (lokale MA, echtes Geschäft). Bei reiner Briefkasten-EOOD: BMF rechnet Gewinne in DE hinzu mit ~30 % Steuer.",
    officialLinks: [
      { label: "BG Trade Register", url: "https://portal.registryagency.bg" },
    ],
  },
];
