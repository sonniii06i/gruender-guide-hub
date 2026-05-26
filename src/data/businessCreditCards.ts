// DE-Geschäftskreditkarten / Business-Spend-Cards für Gründer · Stand Mai 2026
// Quellen: Issuer-/Anbieter-Pricing-Seiten (Amex DE, Qonto, Vivid, Wise, Payhawk, Finom)
//          + Finanzfluss Amex-Vergleich + kreditkarten.com (wo offizielle Seite 403 lieferte).
// WICHTIG: Konditionen ändern sich laufend — vor Antrag auf der Anbieter-Seite verifizieren.
//          Felder mit `dataNote` sind unsicher / nicht öffentlich gelistet.

export type CardSegment = "solo" | "team" | "premium" | "international";

export const SEGMENT_META: Record<
  CardSegment,
  { emoji: string; label: string; description: string }
> = {
  solo: {
    emoji: "🌱",
    label: "Solo / Bootstrap",
    description:
      "Einzelunternehmer & Freiberufler ab Tag 1, minimale Fixkosten, SCHUFA-frei. Debit auf Guthabenbasis — kein Liquiditätspuffer, aber kein Bonitätsrisiko.",
  },
  team: {
    emoji: "👥",
    label: "Team / Spend-Management",
    description:
      "Wachsende Teams mit vielen Mitarbeiterkarten, Budget-Kontrolle und tiefer Buchhaltungs-Integration. Lohnt sich ab mehreren Karten-Nutzern.",
  },
  premium: {
    emoji: "✈️",
    label: "Premium / Liquidität",
    description:
      "Echte Charge-Cards mit Zahlungsziel (finanziert Ad-Spend & Wareneinkauf bis zur Abrechnung), starken Reise-/Mietwagen-Versicherungen und Punkten. Bonitätsprüfung nötig.",
  },
  international: {
    emoji: "🌍",
    label: "International / Multi-Währung",
    description:
      "Niedrigste FX-Gebühren und Multi-Währungs-Konten für Gründer mit Auslands-Umsätzen, US-/EU-Lieferanten oder Remote-Setup.",
  },
};

// Referral-Links (Affiliate) — exakt wie vom Betreiber vorgegeben, ref-Code-Casing nicht ändern.
export const AMEX_REFERRAL = {
  gold: "https://americanexpress.com/de-de/referral/business-gold?ref=sONNIBIJNE&CPID=999999539",
  platinum:
    "https://americanexpress.com/de-de/referral/business-platinum?ref=sONNIB8uIi&CPID=999999539",
};

export type BizCard = {
  id: string;
  name: string;
  issuer: string;
  segment: CardSegment;
  cardType: "Charge" | "Debit" | "Kreditkarte" | "Prepaid";
  network: string;
  /** Effektive Jahreskosten Einstiegs-Tier in EUR; null = nicht öffentlich gelistet. */
  annualEur: number | null;
  priceLabel: string;
  hasFreeTier: boolean;
  paymentTerm: string | null;
  rewards: string;
  signupBonus: string | null;
  datevNative: boolean;
  fxFee: string;
  /** true = Bonitäts-/SCHUFA-Prüfung nötig (echtes Kreditprodukt). */
  schufa: boolean;
  /** true = für Einzelunternehmer/Freelancer ab Tag 1 ohne Historie nutzbar. */
  soloDayOne: boolean;
  who: string;
  extraCards: string;
  insurance: string | null;
  bestFor: string; // "★ " Präfix = Star-Empfehlung
  watchouts: string[];
  url: string;
  dataNote?: string;
};

export const BIZ_CARDS: BizCard[] = [
  // ===== SOLO / BOOTSTRAP =====
  {
    id: "finom",
    name: "Finom (Solo / Start / Premium)",
    issuer: "Finom",
    segment: "solo",
    cardType: "Debit",
    network: "Visa",
    annualEur: 0,
    priceLabel: "0 / 10,99 / 27,99 € pro Monat",
    hasFreeTier: true,
    paymentTerm: null,
    rewards: "bis 3 % Cashback (gedeckelt max. 90 €/Nutzer)",
    signupBonus: null,
    datevNative: true,
    fxFee: "nicht eindeutig öffentlich gelistet",
    schufa: false,
    soloDayOne: true,
    who: "Explizit Solo-Gründer/Freiberufler ab 0 € bis KMU · deutsche IBAN, SEPA",
    extraCards: "mehrere physische + virtuelle Visa pro Nutzer je Plan",
    insurance: null,
    bestFor: "★ Solo ab 0 € mit deutscher IBAN + bis 3 % Cashback",
    watchouts: [
      "Cashback-Cap 90 €/Nutzer",
      "FX-Gebühr nicht klar gelistet — vor Auslandseinsatz prüfen",
      "Physische Karte im Solo-Plan 3 €/Monat (gratis ab höherem Plan)",
    ],
    url: "https://finom.co/de-de/pricing/",
  },
  {
    id: "qonto",
    name: "Qonto (One / Plus / X)",
    issuer: "Qonto",
    segment: "solo",
    cardType: "Debit",
    network: "Mastercard",
    annualEur: 0,
    priceLabel: "0 / 9 / 19 / 39 € pro Monat (je Plan)",
    hasFreeTier: true,
    paymentTerm: null,
    rewards: "bis 1 % Cashback auf ausgewählte Käufe (höhere Kartenstufen)",
    signupBonus: null,
    datevNative: true,
    fxFee: "Kartenzahlung ~0 %; Auslandsüberweisung 0,8 % (min. 5 €)",
    schufa: false,
    soloDayOne: true,
    who: "Einzelunternehmer/Freiberufler ab 0 € (Starter) bis GmbH/UG",
    extraCards: "plan-abhängig, weitere Nutzer/Mitarbeiterkarten zubuchbar",
    insurance: "Plus/X-Karten mit Reise-/Einkaufsschutz; Basis-One-Card minimal",
    bestFor: "★ Stärkste DATEV-Anbindung, SCHUFA-frei ab Tag 1",
    watchouts: [
      "„Kostenlose“ Karten nur im teureren Plan",
      "Transaktions-Caps je Plan",
      "Reines Debit = kein Liquiditätspuffer",
    ],
    url: "https://qonto.com/de/pricing",
  },
  {
    id: "vivid",
    name: "Vivid Business",
    issuer: "Vivid Money",
    segment: "solo",
    cardType: "Debit",
    network: "Visa",
    annualEur: 0,
    priceLabel: "0 / 6,90 / 18,90 € pro Monat",
    hasFreeTier: true,
    paymentTerm: null,
    rewards:
      "0,1–0,5 % Cashback (je Plan) + Marketing-Cashback bis ~10 % auf Meta/Google/Amazon Ads",
    signupBonus: "4 % Zinsen für Neukunden in den ersten 4 Monaten (Guthaben)",
    datevNative: true,
    fxFee: "1 % (Free-Start-Plan 2 %)",
    schufa: false,
    soloDayOne: true,
    who: "Einzelunternehmer/Freiberufler + GmbH/UG · ab Tag 1",
    extraCards: "unbegrenzte Sub-Accounts (Pockets), physisch + virtuell",
    insurance: "gering",
    bestFor: "★ Performance-Marketer: Ad-Cashback auf Meta/Google/Amazon",
    watchouts: [
      "Cashback-Höchstbeträge gedeckelt",
      "Hohe Ad-Cashback-% an Caps & Bedingungen geknüpft — genau prüfen",
    ],
    url: "https://vivid.money/en-de/business/plans/",
  },

  // ===== TEAM / SPEND-MANAGEMENT =====
  {
    id: "pleo",
    name: "Pleo",
    issuer: "Pleo",
    segment: "team",
    cardType: "Debit",
    network: "Mastercard",
    annualEur: 0,
    priceLabel: "0 / 39 / 79 € pro Monat (jährlich)",
    hasFreeTier: true,
    paymentTerm: null,
    rewards: "0,5–1 % Cashback (je Plan)",
    signupBonus: null,
    datevNative: true,
    fxFee: "1,99 %",
    schufa: false,
    soloDayOne: true,
    who: "Primär Teams mit Mitarbeiterkarten/Spend-Management; Solo möglich",
    extraCards: "erste 2 Karten gratis, dann je Plan; Fokus viele Mitarbeiterkarten",
    insurance: null,
    bestFor: "★ Team-Spend mit starker DATEV-Vorkontierung",
    watchouts: [
      "Mehrwert erst bei mehreren Mitarbeitern",
      "Solo-Gründer zahlt für Features, die er nicht nutzt",
    ],
    url: "https://www.pleo.io/de/firmenkarte",
  },
  {
    id: "moss",
    name: "Moss",
    issuer: "Moss (getmoss)",
    segment: "team",
    cardType: "Kreditkarte",
    network: "Visa / Mastercard",
    annualEur: 144,
    priceLabel: "ab ~12 € pro Monat (modulabhängig, individuell)",
    hasFreeTier: false,
    paymentTerm: "echte Kreditlinie bis 2,5 Mio € individuell (Charge-Logik)",
    rewards: "nicht öffentlich gelistet",
    signupBonus: null,
    datevNative: true,
    fxFee: "nicht öffentlich gelistet",
    schufa: true,
    soloDayOne: false,
    who: "Eher GmbH/UG / etablierte Firmen mit Bonität",
    extraCards: "sehr hohe Limits, viele Mitarbeiterkarten",
    insurance: null,
    bestFor: "Echte Kreditlinie bis 2,5 Mio € für Firmen mit Bonität",
    watchouts: [
      "Preise intransparent (Sales-Gespräch nötig)",
      "SCHUFA-Hürde (echtes Kreditprodukt)",
      "Eher für Firmen mit Volumen, nicht für junge Solo-Gründer",
    ],
    url: "https://www.getmoss.com/de/",
    dataNote: "Netzwerk Visa/Mastercard je Produkt; Preise individuell, keine öffentliche Liste",
  },
  {
    id: "payhawk",
    name: "Payhawk",
    issuer: "Payhawk",
    segment: "team",
    cardType: "Debit",
    network: "Visa",
    annualEur: null,
    priceLabel: "auf Anfrage (Sales)",
    hasFreeTier: false,
    paymentTerm: null,
    rewards: "nicht öffentlich gelistet",
    signupBonus: null,
    datevNative: true,
    fxFee: "1,99 %; physische Karte 10 € einmalig",
    schufa: false,
    soloDayOne: false,
    who: "Onboarding mit Handelsregisterauszug → faktisch GmbH/UG/eingetragene Firmen",
    extraCards: "Enterprise-Fokus, viele Karten",
    insurance: null,
    bestFor: "Mid-Market/Enterprise-Spend mit nativer DATEV-Integration",
    watchouts: [
      "Intransparente Preise (sales@payhawk.com)",
      "HR-Auszug-Pflicht — nicht für nicht-eingetragene Einzelunternehmer",
      "Overkill für Solo-Gründer",
    ],
    url: "https://payhawk.com/de",
    dataNote: "5 Editionen, Preise auf Anfrage; in DE nur Debit (Credit nur in anderen Märkten)",
  },
  {
    id: "spendesk",
    name: "Spendesk",
    issuer: "Spendesk",
    segment: "team",
    cardType: "Prepaid",
    network: "Mastercard",
    annualEur: null,
    priceLabel: "auf Anfrage (Sales)",
    hasFreeTier: false,
    paymentTerm: null,
    rewards: "nicht öffentlich gelistet",
    signupBonus: null,
    datevNative: true,
    fxFee: "nicht öffentlich gelistet",
    schufa: false,
    soloDayOne: false,
    who: "Teams/Unternehmen mit Spend-Management-Bedarf",
    extraCards: "virtuelle Karten bis 200.000 €/Transaktion, viele Mitarbeiterkarten",
    insurance: null,
    bestFor: "Spend-Management für Teams, keine persönliche Haftung (Prepaid)",
    watchouts: [
      "Intransparente Preise (Sales-Call)",
      "Lohnt erst ab Teamgröße",
      "Reines Prepaid — kein Liquiditätsvorteil",
    ],
    url: "https://www.spendesk.com/de/",
    dataNote: "3 Pläne (Starter/Essentials/Scale), Preise nicht öffentlich gelistet",
  },

  // ===== PREMIUM / LIQUIDITÄT =====
  {
    id: "amex-business-platinum",
    name: "Amex Business Platinum",
    issuer: "American Express",
    segment: "premium",
    cardType: "Charge",
    network: "Amex",
    annualEur: 850,
    priceLabel: "850 € pro Jahr",
    hasFreeTier: false,
    paymentTerm: "bis 58 Tage zinsfrei",
    rewards: "1 Membership-Rewards-Punkt / 1 € Umsatz",
    signupBonus: "bis 200.000 MR-Punkte bei 15.000 € Umsatz in 6 Mon. (Aktion, variiert)",
    datevNative: false,
    fxFee: "2 %; Bargeld 4 %",
    schufa: true,
    soloDayOne: false,
    who: "Alle Rechtsformen inkl. Einzelunternehmer/Freiberufler · Geschäft ≥ 3 Monate",
    extraCards: "bis 99 inklusive (kostenfrei)",
    insurance:
      "Umfangreichstes Paket: Reiserücktritt, Auslandsreisekranken, Mietwagen-Vollkasko, Flug-/Gepäckverspätung",
    bestFor: "★ Premium-Vielreiser: max. Versicherung + 58 Tage Liquidität",
    watchouts: [
      "850 €/Jahr ist hoch",
      "Lufthansa-Lounge-Kooperation endet 30.09.2026",
      "Amex-Akzeptanz in DE schlechter als Visa/Mastercard",
    ],
    url: AMEX_REFERRAL.platinum,
    dataNote: "Willkommensbonus = Aktionswert (Mai 2026), vor Antrag auf amex.de verifizieren",
  },
  {
    id: "amex-business-gold",
    name: "Amex Business Gold",
    issuer: "American Express",
    segment: "premium",
    cardType: "Charge",
    network: "Amex",
    annualEur: 175,
    priceLabel: "175 € pro Jahr (1. Jahr oft beitragsfrei)",
    hasFreeTier: false,
    paymentTerm: "bis 50 Tage zinsfrei",
    rewards: "1 Membership-Rewards-Punkt / 1 € Umsatz",
    signupBonus: "75.000 MR-Punkte bei 25.000 € in 6 Mon. + 100 € Dell-Guthaben (Aktion)",
    datevNative: false,
    fxFee: "2 %",
    schufa: true,
    soloDayOne: false,
    who: "Alle Rechtsformen inkl. Einzelunternehmer · Geschäft idealerweise ≥ 12 Monate",
    extraCards: "bis 99 inklusive (kostenfrei)",
    insurance:
      "Auslandsreisekranken, Mietwagen Haftpflicht + Vollkasko, Pannenhilfe, Reisekomfort",
    bestFor: "★ Bester Amex-Allrounder: gutes Versicherungspaket zu moderatem Preis",
    watchouts: [
      "Geschäft sollte ~1 Jahr bestehen",
      "Amex-Akzeptanz in DE",
      "Bonus erst ab 25.000 € Umsatz",
    ],
    url: AMEX_REFERRAL.gold,
    dataNote: "Willkommensbonus = Aktionswert (Mai 2026), vor Antrag verifizieren",
  },
  {
    id: "amex-business-basic",
    name: "Amex Business (Basic/Green)",
    issuer: "American Express",
    segment: "premium",
    cardType: "Charge",
    network: "Amex",
    annualEur: 70,
    priceLabel: "70 € pro Jahr",
    hasFreeTier: false,
    paymentTerm: "kurzes Charge-Ziel (~bis 30 Tage)",
    rewards: "Membership-Rewards-Punkte nur gegen Aufpreis +30 €/Jahr",
    signupBonus: null,
    datevNative: false,
    fxFee: "2 %",
    schufa: true,
    soloDayOne: false,
    who: "Alle Rechtsformen inkl. Einzelunternehmer/Freiberufler",
    extraCards: "30 €/Jahr pro Zusatzkarte",
    insurance: "Basis/gering (im Vergleich zu Gold/Platinum)",
    bestFor: "Günstigster Amex-Einstieg ins MR-Ökosystem",
    watchouts: [
      "Rewards kosten extra (+30 €/Jahr)",
      "Schwache Versicherung",
      "Zahlungsziel nicht prominent gelistet",
    ],
    url: "https://www.americanexpress.com/de-de/business/",
    dataNote: "Jahresgebühr 70 € lt. offiziellem Vergleich (eine Sekundärquelle nannte 60 €)",
  },

  // ===== INTERNATIONAL / MULTI-WÄHRUNG =====
  {
    id: "wise-business",
    name: "Wise Business",
    issuer: "Wise",
    segment: "international",
    cardType: "Debit",
    network: "Mastercard",
    annualEur: 0,
    priceLabel: "kein Abo · 50 € Kontoeröffnung einmalig",
    hasFreeTier: true,
    paymentTerm: null,
    rewards: "kein Cashback",
    signupBonus: null,
    datevNative: false,
    fxFee: "ab 0,43 % pro Umtausch, echter Mittelkurs",
    schufa: false,
    soloDayOne: true,
    who: "Freiberufler/Einzelunternehmer + Firmen · ab Tag 1 · Konto auch außerhalb DE/EU eröffnbar",
    extraCards: "Mitarbeiterkarten möglich (weitere Karte 4 € einmalig)",
    insurance: null,
    bestFor: "★ Bestes FX/Multi-Währung (ab 0,43 %) — international",
    watchouts: [
      "Kein Cashback, keine Versicherungen",
      "Schwache native DE-Buchhaltung (nur API/Apps)",
      "Bargeld ab 01.05.2026 frei bis 250 €/Monat, darüber 2,69 %",
    ],
    url: "https://wise.com/de/pricing/business/card-fees",
  },
  {
    id: "revolut-business",
    name: "Revolut Business",
    issuer: "Revolut",
    segment: "international",
    cardType: "Debit",
    network: "Visa / Mastercard",
    annualEur: 120,
    priceLabel: "10 / 35 / 125 € pro Monat",
    hasFreeTier: false,
    paymentTerm: null,
    rewards: "kein Cashback; stattdessen Partner-Rabatte (Business Rewards)",
    signupBonus: null,
    datevNative: false,
    fxFee: "Freikontingent je Plan, danach 0,6 %; Bargeld 2 % weltweit",
    schufa: false,
    soloDayOne: true,
    who: "Freelancer- + Firmenkonten · ab Tag 1",
    extraCards: "unbegrenzt virtuelle Karten (bis 200/Person), Metallkarten ab Grow gratis",
    insurance: "gering (planabhängig)",
    bestFor: "Multi-Währung + viele virtuelle Karten",
    watchouts: [
      "Kein echtes Cashback",
      "FX nur bis Freikontingent gratis",
      "Basic-Tier nicht mehr kostenlos",
    ],
    url: "https://www.revolut.com/de-DE/business/business-account-plans/",
    dataNote:
      "Tarife zum 30.03.2026 geändert; Quellen widersprüchlich (Grow 30 vs 35, Scale 90 vs 125 €) — vor Veröffentlichung auf revolut.com final gegenprüfen",
  },
];

// Entscheidungs-Hilfe: welche Karte für welchen Gründer-Typ
export const DECISION_GUIDE: { profile: string; pick: string; why: string }[] = [
  {
    profile: "Bootstrap-Solo / Einzelunternehmer ab Tag 1, minimale Kosten",
    pick: "Finom Solo (0 €) oder Qonto Starter (0 €)",
    why: "Beide SCHUFA-frei ab Tag 1. Finom: bis 3 % Cashback + deutsche IBAN. Qonto: stärkste DATEV-Anbindung. Viel international → Wise Business (bestes FX).",
  },
  {
    profile: "Ohne SCHUFA / negativer Eintrag / keine Historie",
    pick: "Qonto, Vivid, Wise oder Finom",
    why: "Alle Debit/Guthaben ohne Bonitätsprüfung. Payhawk meiden (HR-Auszug-Pflicht). Moss & alle Amex meiden bei SCHUFA-Negativeintrag (echte Bonitätsprüfung).",
  },
  {
    profile: "Wachsendes Team / viele Mitarbeiterkarten / Spend-Control",
    pick: "Pleo (Team + DATEV) oder Moss (Kreditlinie bei Bonität)",
    why: "Pleo stark bei Vorkontierung & 0,5–1 % Cashback. Moss bietet echte Kreditlinie bis 2,5 Mio €. Payhawk/Spendesk erst ab Größe (intransparente Preise).",
  },
  {
    profile: "Premium-Vielreiser / Liquiditäts-Puffer / Versicherungen",
    pick: "Amex Business Gold (175 €) — Allrounder; Platinum (850 €) — Maximum",
    why: "Zahlungsziel finanziert Ad-Spend/Wareneinkauf bis zur Abrechnung, beste Reise-/Mietwagen-Versicherungen + MR-Punkte. Lounge-Kooperation läuft Sep 2026 aus.",
  },
  {
    profile: "Performance-Marketer mit hohem Ad-Spend (Meta/TikTok/Google)",
    pick: "Vivid (Ad-Cashback) oder Amex Charge (Liquidität)",
    why: "Vivid bewirbt bis ~10 % Cashback auf Ad-Plattformen (Caps prüfen!). Alternativ Amex Charge: Zahlungsziel überbrückt Ad-Spend bis zur Abrechnung — Cashflow-Hebel statt Cashback.",
  },
];
