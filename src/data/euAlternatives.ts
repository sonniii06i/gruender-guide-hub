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
  fitForGermans: "Sehr gut" | "Gut" | "Mittel" | "Schwierig";
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
    corporateTax: "12,5 %",
    localTax: "0 %",
    effectiveTotal: "12,5 % · 0 % auf Dividenden-Erträge mit Schachtelprivileg",
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
      "**12,5 % KSt** + 0 % auf Out-Dividenden (kein WHT)",
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
