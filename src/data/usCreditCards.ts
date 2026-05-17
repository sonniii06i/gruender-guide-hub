// US-Kreditkarten-Datenbank für DE-Kunden · Stand Mai 2026
// Quellen: Issuer-Webseiten + The Points Guy + Upgraded Points + Doctor of Credit + One Mile at a Time
// Recherche-Date: Mai 2026 — Bonus-Werte ändern sich monatlich, vor Apply auf Issuer-Seite verifizieren!

export type CardUseCase = "de-personal" | "business-ein" | "credit-builder" | "rewards";

export type Card = {
  id: string;
  name: string;
  issuer: string;
  useCase: CardUseCase;
  annualFee: number;
  annualFeeFirstYearWaived: boolean | null;
  signupBonus: string;
  spendingRequirement: string | null;
  minCreditScore: number | null;
  needsSsn: boolean;
  einOnlyBusiness: boolean;
  acceptsForeignAddress: boolean;
  foreignTransactionFee: number | null;
  bestFor: string;
  watchouts: string[];
  url: string;
};

export const US_CARDS: Card[] = [
  // ===== DE-PERSONAL (ohne SSN/ITIN, Workarounds für USD-Routing/Reisen) =====
  {
    id: "wise-usd",
    name: "Wise USD Account",
    issuer: "Wise",
    useCase: "de-personal",
    annualFee: 0,
    annualFeeFirstYearWaived: null,
    signupBonus: "Kein Bonus",
    spendingRequirement: null,
    minCreditScore: null,
    needsSsn: false,
    einOnlyBusiness: false,
    acceptsForeignAddress: true,
    foreignTransactionFee: 0,
    bestFor: "Echtes US-Routing + Account-Number für Amazon-US-Payouts, US-Vendor-ACH, Stripe-US",
    watchouts: [
      "Kein Credit-Card (Debit) — kein Credit-Building",
      "Verifizierung dauert bis 4 Werktage",
      "Routing-Numbers 3150 / 9519 / 9628 sind Amazon-US-getestet",
    ],
    url: "https://wise.com/us/account/usd-account",
  },
  {
    id: "revolut-premium-usd",
    name: "Revolut Premium USD-Wallet",
    issuer: "Revolut Bank UAB",
    useCase: "de-personal",
    annualFee: 96,
    annualFeeFirstYearWaived: false,
    signupBonus: "Variable Referral-Promos",
    spendingRequirement: null,
    minCreditScore: null,
    needsSsn: false,
    einOnlyBusiness: false,
    acceptsForeignAddress: true,
    foreignTransactionFee: 0,
    bestFor: "Multi-Currency-Wallet mit USD-Halten, kostenlose FX bis Limit",
    watchouts: [
      "USD-Wallet hat KEIN US-Routing — Amazon-US-Vendoren akzeptieren das nicht",
      "Bei Umzug US↔DE muss Account geschlossen + neu eröffnet werden",
    ],
    url: "https://www.revolut.com/en-DE/",
  },
  {
    id: "curve-pay",
    name: "Curve Pay",
    issuer: "Curve (UK/EEA)",
    useCase: "de-personal",
    annualFee: 0,
    annualFeeFirstYearWaived: null,
    signupBonus: "Kein Bonus",
    spendingRequirement: null,
    minCreditScore: null,
    needsSsn: false,
    einOnlyBusiness: false,
    acceptsForeignAddress: true,
    foreignTransactionFee: 0,
    bestFor: "Aggregator vor DE-Visa/MC, vermeidet 2,75% Bank-FX-Aufschlag",
    watchouts: [
      "Wochenend-FX-Aufschlag 0,5% USD/EUR/GBP",
      "Amex nicht als Underlying erlaubt (US)",
    ],
    url: "https://www.curve.com/",
  },

  // ===== BUSINESS EIN-ONLY (für DE-Person mit US-LLC) =====
  {
    id: "mercury-io",
    name: "Mercury IO Mastercard",
    issuer: "Mercury (Patriot Bank N.A.)",
    useCase: "business-ein",
    annualFee: 0,
    annualFeeFirstYearWaived: null,
    signupBonus: "Bis $2.000 Cashback-Boost (Promos variabel)",
    spendingRequirement: null,
    minCreditScore: null,
    needsSsn: false,
    einOnlyBusiness: true,
    acceptsForeignAddress: false,
    foreignTransactionFee: 0,
    bestFor: "★ Sweet-Spot für DE-Founder mit Bootstrapped-US-LLC. Echter Business-Credit-Build (Dun & Bradstreet). No Personal Guarantee. 1,5% Cashback.",
    watchouts: [
      "$15-50k Mindest-Balance bei Mercury-Bank-Account",
      "Mercury-Account-Approval kann 1-3 Wochen dauern für DE-Founder",
      "Quellen-Widerspruch bei exakter Min-Balance",
    ],
    url: "https://mercury.com/credit",
  },
  {
    id: "ramp",
    name: "Ramp Card",
    issuer: "Ramp Business Corporation",
    useCase: "business-ein",
    annualFee: 0,
    annualFeeFirstYearWaived: null,
    signupBonus: "Wechselnde Cash-Promos ($150-$500), kein Punktebonus",
    spendingRequirement: null,
    minCreditScore: null,
    needsSsn: false,
    einOnlyBusiness: true,
    acceptsForeignAddress: false,
    foreignTransactionFee: 0,
    bestFor: "EIN-only Charge-Card ohne Personal Guarantee, 1,5% Cashback flat",
    watchouts: [
      "Verlangt $25.000 in US-Business-Bank-Account",
      "Letzte 4 SSN-Digits ODER Passport eines Officers",
      "Charge Card (monatlich voll begleichen)",
    ],
    url: "https://ramp.com/card",
  },
  {
    id: "brex",
    name: "Brex Card",
    issuer: "Brex",
    useCase: "business-ein",
    annualFee: 0,
    annualFeeFirstYearWaived: null,
    signupBonus: "Bis 110.000 Brex-Punkte (variabel)",
    spendingRequirement: "Variabel",
    minCreditScore: null,
    needsSsn: false,
    einOnlyBusiness: true,
    acceptsForeignAddress: false,
    foreignTransactionFee: 0,
    bestFor: "VC-funded Startups, gute Reward-Multipliers (7x Rideshare, 4x Travel)",
    watchouts: [
      "$50.000 Mindest-Balance üblich (wenn funded)",
      "Reduzierte Akzeptanz für Bootstrapped/Solo-LLC seit 2022",
      "Passport statt SSN OK",
    ],
    url: "https://www.brex.com/product/card",
  },
  {
    id: "capone-spark-cash-plus",
    name: "Capital One Spark Cash Plus",
    issuer: "Capital One",
    useCase: "business-ein",
    annualFee: 150,
    annualFeeFirstYearWaived: false,
    signupBonus: "$2.000 Cash + $2.000 pro $500k bis $8.000 max",
    spendingRequirement: "$30.000 in 3 Monaten",
    minCreditScore: 720,
    needsSsn: true,
    einOnlyBusiness: false,
    acceptsForeignAddress: false,
    foreignTransactionFee: 0,
    bestFor: "Hoher Bonus für High-Spend-Businesses, 2% Cashback flat",
    watchouts: [
      "Verlangt Personal Guarantee per SSN/ITIN",
      "Charge Card (Pay-Over-Time seit Mai 2026 als Option)",
      "Hoher Spend-Threshold",
    ],
    url: "https://www.capitalone.com/small-business/credit-cards/spark-cash-plus/",
  },
  {
    id: "amex-business-platinum",
    name: "Amex Business Platinum",
    issuer: "American Express",
    useCase: "business-ein",
    annualFee: 695,
    annualFeeFirstYearWaived: false,
    signupBonus: "as-high-as 250.000-300.000 MR (Mai-2026-Promo)",
    spendingRequirement: "$20.000 in 3 Monaten",
    minCreditScore: 720,
    needsSsn: true,
    einOnlyBusiness: false,
    acceptsForeignAddress: false,
    foreignTransactionFee: 0,
    bestFor: "Best-ever Bonus aktuell, 5x MR auf Flights, $300 ChatGPT-Biz-Credit (2026-Refresh)",
    watchouts: [
      "Personal Guarantee per SSN/ITIN nötig",
      "Once-per-lifetime Bonus",
      "Amex 2/90 Rule",
    ],
    url: "https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/american-express-business-platinum-credit-card-amex/",
  },

  // ===== CREDIT BUILDER (Auswanderer mit ITIN) =====
  {
    id: "discover-it-secured",
    name: "Discover it Secured",
    issuer: "Discover",
    useCase: "credit-builder",
    annualFee: 0,
    annualFeeFirstYearWaived: null,
    signupBonus: "Cashback Match (alles im 1. Jahr verdoppelt)",
    spendingRequirement: null,
    minCreditScore: 0,
    needsSsn: false,
    einOnlyBusiness: false,
    acceptsForeignAddress: false,
    foreignTransactionFee: 0,
    bestFor: "★ Beste Secured Card 2026, 2% Gas/Restaurants, auto-Graduation nach 7-12 Mo, ITIN OK",
    watchouts: [
      "Deposit $200-$2.500",
      "Discover wird wenig in EU/Asia akzeptiert",
    ],
    url: "https://www.discover.com/credit-cards/secured-credit-card/",
  },
  {
    id: "capone-platinum-secured",
    name: "Capital One Platinum Secured",
    issuer: "Capital One",
    useCase: "credit-builder",
    annualFee: 0,
    annualFeeFirstYearWaived: null,
    signupBonus: "Kein Bonus",
    spendingRequirement: null,
    minCreditScore: 0,
    needsSsn: false,
    einOnlyBusiness: false,
    acceptsForeignAddress: false,
    foreignTransactionFee: 0,
    bestFor: "Niedrigster Einstieg ($49 Deposit für $200 Credit Line), ITIN explizit akzeptiert",
    watchouts: ["Keine Rewards", "Credit-Line-Increase erst nach 6 Monaten"],
    url: "https://www.capitalone.com/credit-cards/platinum-secured/",
  },
  {
    id: "chime-credit-builder",
    name: "Chime Credit Builder Secured Visa",
    issuer: "Chime / Stride Bank",
    useCase: "credit-builder",
    annualFee: 0,
    annualFeeFirstYearWaived: null,
    signupBonus: "Kein Bonus",
    spendingRequirement: null,
    minCreditScore: 0,
    needsSsn: false,
    einOnlyBusiness: false,
    acceptsForeignAddress: false,
    foreignTransactionFee: 0,
    bestFor: "Kein Hard-Pull, kein Min-Deposit, ITIN OK, automatische Pay-Off",
    watchouts: [
      "Braucht Chime-Checking-Account (SSN ODER ITIN)",
      "Keine Rewards",
    ],
    url: "https://www.chime.com/credit/credit-builder/",
  },
  {
    id: "petal-2",
    name: "Petal 2 Visa",
    issuer: "WebBank (Petal-issued)",
    useCase: "credit-builder",
    annualFee: 0,
    annualFeeFirstYearWaived: null,
    signupBonus: "Kein Bonus",
    spendingRequirement: null,
    minCreditScore: 0,
    needsSsn: false,
    einOnlyBusiness: false,
    acceptsForeignAddress: false,
    foreignTransactionFee: 0,
    bestFor: "Unsecured Card OHNE Deposit, Cash-Flow-Underwriting via Bank-Account-Linking, ITIN OK",
    watchouts: [
      "Verlangt Bank-Account-Verknüpfung (Plaid)",
      "Cashback 1-1,5% nach 12 on-time Payments",
    ],
    url: "https://www.petalcard.com/petal-2",
  },
  {
    id: "self-loan",
    name: "Self Credit Builder Loan",
    issuer: "Self / Lead Bank / Sunrise Bank",
    useCase: "credit-builder",
    annualFee: 0,
    annualFeeFirstYearWaived: null,
    signupBonus: "Kein Bonus",
    spendingRequirement: null,
    minCreditScore: 0,
    needsSsn: false,
    einOnlyBusiness: false,
    acceptsForeignAddress: false,
    foreignTransactionFee: null,
    bestFor: "Installment-Loan — diversifiziert Credit-Mix (anderer Loan-Typ als Revolver)",
    watchouts: [
      "Kein Cash-Zugriff bis Loan-Ende",
      "APR ~15,9%",
      "Soft-Pull bei Apply",
    ],
    url: "https://www.self.inc/credit-builder-loan",
  },
  {
    id: "boa-travel-secured",
    name: "Bank of America Travel Rewards Secured",
    issuer: "Bank of America",
    useCase: "credit-builder",
    annualFee: 0,
    annualFeeFirstYearWaived: null,
    signupBonus: "25.000 Bonus Points nach $1.000/90 Tage (variabel)",
    spendingRequirement: "$1.000 in 90 Tagen",
    minCreditScore: 0,
    needsSsn: false,
    einOnlyBusiness: false,
    acceptsForeignAddress: false,
    foreignTransactionFee: 0,
    bestFor: "Einziges Secured Card mit Travel-Rewards (1,5x Punkte), ITIN-OK in-Branch",
    watchouts: ["ITIN-Apply NUR in Filiale (kein online)", "Deposit $300-$5.000"],
    url: "https://www.bankofamerica.com/credit-cards/products/travel-rewards-secured-credit-card/",
  },

  // ===== REWARDS / CHURNING (verlangt SSN + US-Adresse) =====
  {
    id: "chase-sapphire-preferred",
    name: "Chase Sapphire Preferred",
    issuer: "Chase",
    useCase: "rewards",
    annualFee: 95,
    annualFeeFirstYearWaived: false,
    signupBonus: "75.000 UR Punkte (~$1.500 in Chase Travel)",
    spendingRequirement: "$5.000 in 3 Monaten",
    minCreditScore: 720,
    needsSsn: true,
    einOnlyBusiness: false,
    acceptsForeignAddress: false,
    foreignTransactionFee: 0,
    bestFor: "Beste Rewards-Einsteigerkarte für Travel, $50 Hotel-Credit",
    watchouts: [
      "5/24 Rule strict",
      "10% Anniversary-Bonus endet 1. Oktober 2026",
      "Sapphire-Family-Bonus pro Karte einmal seit 2026-Update",
    ],
    url: "https://creditcards.chase.com/rewards-credit-cards/sapphire/preferred",
  },
  {
    id: "chase-sapphire-reserve",
    name: "Chase Sapphire Reserve",
    issuer: "Chase",
    useCase: "rewards",
    annualFee: 795,
    annualFeeFirstYearWaived: false,
    signupBonus: "150.000 UR Punkte (~$3.000 in Travel)",
    spendingRequirement: "$6.000 in 3 Monaten",
    minCreditScore: 740,
    needsSsn: true,
    einOnlyBusiness: false,
    acceptsForeignAddress: false,
    foreignTransactionFee: 0,
    bestFor: "Premium-Travel mit $300 Chase-Travel-Credit + $500 Edit-Credit + Priority Pass",
    watchouts: [
      "Fee 2025 von $550 auf $795 erhöht",
      "5/24 Rule",
      "Apple-TV+/Apple-Music nur als Add-on Wert",
    ],
    url: "https://creditcards.chase.com/rewards-credit-cards/sapphire/reserve",
  },
  {
    id: "chase-ink-business-preferred",
    name: "Chase Ink Business Preferred",
    issuer: "Chase",
    useCase: "rewards",
    annualFee: 95,
    annualFeeFirstYearWaived: false,
    signupBonus: "100.000 UR Punkte",
    spendingRequirement: "$8.000 in 3 Monaten",
    minCreditScore: 700,
    needsSsn: true,
    einOnlyBusiness: false,
    acceptsForeignAddress: false,
    foreignTransactionFee: 0,
    bestFor: "Business-Card die NICHT auf Personal-Credit-Report meldet (umgeht 5/24)",
    watchouts: [
      "Personal Guarantee per SSN nötig",
      "Chase überprüft 5/24 trotzdem bei Approval",
    ],
    url: "https://creditcards.chase.com/business-credit-cards/ink/business-preferred",
  },
  {
    id: "amex-platinum",
    name: "American Express Platinum",
    issuer: "American Express",
    useCase: "rewards",
    annualFee: 895,
    annualFeeFirstYearWaived: false,
    signupBonus: "as-high-as 175.000 MR Punkte (targeted)",
    spendingRequirement: "$12.000 in 6 Monaten",
    minCreditScore: 720,
    needsSsn: true,
    einOnlyBusiness: false,
    acceptsForeignAddress: false,
    foreignTransactionFee: 0,
    bestFor: "Lounge-Access (Centurion, Priority Pass) + $3.500 Credits-Stack",
    watchouts: [
      "Fee Sep 2025 von $695 auf $895 erhöht — Renewal 2.1.2026",
      "Once-per-lifetime Bonus",
      "Schwab/Morgan-Stanley-Versionen haben 150k Bonus bis 8.7.2026",
    ],
    url: "https://www.americanexpress.com/us/credit-cards/card/platinum/",
  },
  {
    id: "amex-gold",
    name: "American Express Gold",
    issuer: "American Express",
    useCase: "rewards",
    annualFee: 325,
    annualFeeFirstYearWaived: false,
    signupBonus: "as-high-as 100.000 MR Punkte",
    spendingRequirement: "$8.000 in 6 Monaten (früher $6.000)",
    minCreditScore: 700,
    needsSsn: true,
    einOnlyBusiness: false,
    acceptsForeignAddress: false,
    foreignTransactionFee: 0,
    bestFor: "4x MR auf Restaurants + Supermärkte (US), $120 Uber + $120 Dining Credits",
    watchouts: [
      "Spend-Req kürzlich um 33% angehoben",
      "Once-per-lifetime Bonus",
    ],
    url: "https://www.americanexpress.com/us/credit-cards/card/gold-card/",
  },
  {
    id: "capone-venture-x",
    name: "Capital One Venture X",
    issuer: "Capital One",
    useCase: "rewards",
    annualFee: 395,
    annualFeeFirstYearWaived: false,
    signupBonus: "75.000 Miles",
    spendingRequirement: "$4.000 in 3 Monaten",
    minCreditScore: 740,
    needsSsn: true,
    einOnlyBusiness: false,
    acceptsForeignAddress: false,
    foreignTransactionFee: 0,
    bestFor: "$300 Cap-One-Travel-Credit + 10k Anniversary-Miles = de facto $300 negative Fee",
    watchouts: [
      "100k-Promo (mit $10k Spend) endete 5.1.2026",
      "Cap-One 1/6 Rule, harte 3-Bureau-Inquiry",
    ],
    url: "https://www.capitalone.com/credit-cards/venture-x/",
  },
  {
    id: "capone-venture",
    name: "Capital One Venture",
    issuer: "Capital One",
    useCase: "rewards",
    annualFee: 95,
    annualFeeFirstYearWaived: false,
    signupBonus: "75.000 Miles",
    spendingRequirement: "$4.000 in 3 Monaten",
    minCreditScore: 700,
    needsSsn: true,
    einOnlyBusiness: false,
    acceptsForeignAddress: false,
    foreignTransactionFee: 0,
    bestFor: "Mid-tier-Einstieg vor Venture-X-Upgrade",
    watchouts: ["1/6 Rule"],
    url: "https://www.capitalone.com/credit-cards/venture/",
  },
  {
    id: "citi-strata-premier",
    name: "Citi Strata Premier",
    issuer: "Citi",
    useCase: "rewards",
    annualFee: 95,
    annualFeeFirstYearWaived: false,
    signupBonus: "60.000-70.000 ThankYou Points",
    spendingRequirement: "$4.000 in 3 Monaten",
    minCreditScore: 700,
    needsSsn: true,
    einOnlyBusiness: false,
    acceptsForeignAddress: false,
    foreignTransactionFee: 0,
    bestFor: "Hotels 10x, Flights/Restaurants/Supermärkte/Gas 3x",
    watchouts: [
      "Citi 48-Mo-Family-Bonus-Restriction (alle ThankYou-Karten)",
      "Bonus-Tier schwankt zwischen 60k und 70k",
    ],
    url: "https://www.citi.com/credit-cards/citi-strata-premier-credit-card",
  },
];

// ===== USE-CASE-METADATA =====
export const USE_CASE_META: Record<CardUseCase, { label: string; emoji: string; description: string }> = {
  "de-personal": {
    label: "DE-Privatperson",
    emoji: "🇩🇪",
    description: "Du wohnst in DE, willst USD-Wallet / Amazon-US-Vendor-Onboarding / Reisen. Workarounds ohne SSN.",
  },
  "business-ein": {
    label: "DE + US-LLC",
    emoji: "🏢",
    description: "Du hast eine US-LLC und brauchst eine Business-Karte mit nur EIN (kein SSN/ITIN).",
  },
  "credit-builder": {
    label: "Auswanderer / Credit-Build",
    emoji: "🛬",
    description: "Du ziehst in die USA und baust einen FICO-Score von 0 auf. ITIN-friendly Karten.",
  },
  rewards: {
    label: "Churning / Rewards",
    emoji: "🎯",
    description: "Du hast US-Residence + SSN und jagst Sign-Up-Boni (5/24-Strategie etc).",
  },
};

// ===== AUSWANDERER-TIMELINE =====
export const AUSWANDERER_TIMELINE = [
  { time: "Tag 0", step: "ITIN-Antrag (W-7)", detail: "Beim IRS oder via Certified Acceptance Agent — 4-7 Wochen Bearbeitung" },
  { time: "Tag 0", step: "US-Adresse einrichten", detail: "Earth Class Mail / iPostal1 / virtuelle Adresse (kein PO Box!)" },
  { time: "Tag 7", step: "US-Telefonnummer", detail: "Google Voice (gratis) oder Mint Mobile (kostenpflichtig für Verifications)" },
  { time: "Tag 14", step: "US-Checking-Account", detail: "Chime, SoFi oder Capital One 360 (alle akzeptieren ITIN online/in-Branch)" },
  { time: "Tag 21", step: "Erste Secured Card", detail: "Capital One Platinum Secured ($49 Deposit) ODER Discover it Secured ($200) — beide via ITIN" },
  { time: "Tag 30", step: "Self Credit Builder Loan", detail: "$25/Mo für 24 Mo — diversifiziert Credit-Mix (Installment vs. Revolver)" },
  { time: "Monat 3", step: "Petal 2 Visa als 2. Karte", detail: "Cash-Flow-Underwriting, KEIN FICO-Pull, baut Credit-Utilization-Mix" },
  { time: "Monat 6", step: "FICO-Check via Experian Boost", detail: "Erwartet 620-660 nach 6 Mo brave Payments" },
  { time: "Monat 9", step: "Erstes Mid-Tier-Card", detail: "Capital One Quicksilver (unsecured) oder Discover it Cash Back (auto-graduiert)" },
  { time: "Monat 12", step: "Erste Rewards-Karte", detail: "Chase Freedom Unlimited (5/24 noch leer!) oder Amex Gold (Nova-Credit-fuel)" },
  { time: "Monat 15", step: "Sapphire-Preferred-Apply", detail: "FICO ~700, alle Karten under 24-Months — perfect 5/24-Setup" },
  { time: "Monat 18", step: "FICO 700-740", detail: "Bereit für Premium-Karten (Sapphire Reserve, Venture X, Amex Plat)" },
];

// ===== SECRET-TIPS =====
export const SECRET_TIPS = [
  {
    title: "Mercury IO statt Brex für Bootstrapped-LLC",
    detail:
      "Brex hat sich seit 2022 zunehmend auf VC-funded Startups fokussiert. Mercury IO ist die ehrlichere Option für DE-Founder mit Bootstrapped-US-LLC: EIN reicht, kein Personal Guarantee, $15k Mindest-Balance (vs. Brex' $50k), echter Business-Credit-Build via D&B-Reporting.",
  },
  {
    title: "Ramp als Plan B (zero-friction, kein Punkte-Programm)",
    detail:
      "Ramp ist nach Mercury die zweite EIN-only-Wahl. 1,5% Cashback flat, kein Bonus-Hassle. Vorteil: Letzte 4 SSN-Digits ODER Passport reichen. Nachteil: $25.000 US-Bank-Balance nötig, Charge Card.",
  },
  {
    title: "Amex Global Transfer als Bridge",
    detail:
      "Wenn du in DE seit mind. 3 Monaten eine aktive Amex hast (egal welche), kannst du via Global-Card-Relationship einen US-Amex-Apply ohne US-Credit-Score machen. ABER: US-Adresse + SSN/ITIN nötig. Amex zieht deine Amex-Historie intern (umgeht GDPR).",
  },
  {
    title: "Wise > Revolut für Amazon US",
    detail:
      "Wise hat echtes US-Routing (3150 / 9519 / 9628) — Amazon US, Stripe US, Paddle akzeptieren das als US-Bank-Account. Revolut USD-Wallet wird NICHT akzeptiert.",
  },
  {
    title: "Curve für Multi-Card-Routing in DE",
    detail:
      "Curve lässt dich eine US-Karte hinter einer DE-EUR-Karte als Underlying für EUR-Zahlungen verstecken — Punkte auf US-Karten während du EUR ausgibst. Wochenend-FX 0,5%, sonst 0%.",
  },
  {
    title: "Bilt 2.0 ab Feb 2026 ist neu — und schlechter",
    detail:
      "Die alte Wells-Fargo-Bilt-Mastercard war stark (Punkte auf Miete ohne Hassle). Die neue Cardless-Version ab 7.2.2026 verlangt jetzt 75% der Miet-Summe auch als Card-Spend — nur sinnvoll wenn du 75%+ deines Lifestyle-Spends über Bilt routest.",
  },
  {
    title: "5/24 Workaround mit Chase Ink",
    detail:
      "Chase Ink Business Cards belegen keinen 5/24-Slot (zählen nicht als 'neue Karte'). ABER Chase prüft 5/24 trotzdem beim Apply — wenn du ÜBER 5/24 bist: denied. Wenn under: Ink-Cards belegen keinen Slot für nächste Personal-Apps.",
  },
  {
    title: "Sapphire-Family-Update Jan 2026",
    detail:
      "Seit Januar 2026 kannst du Bonus auf Sapphire Preferred UND Reserve gleichzeitig holen (früher: nur 1 per 48 Mo). Beide gleichzeitig zu halten ist sinnvoll wenn du den $795-Travel-Credit nutzt.",
  },
];

// ===== TAX/COMPLIANCE =====
export const TAX_COMPLIANCE = [
  {
    headline: "BOI-Filing NICHT MEHR PFLICHT für US-LLCs (seit 26.3.2025)",
    detail:
      "FinCEN hat am 26.3.2025 einen Interim Final Rule veröffentlicht: US-LLCs (auch mit ausländischen Beneficial Owners wie DE-Founders) sind komplett vom BOI-Reporting ausgenommen. Nur Foreign-Entities, die in den USA als ausländische Gesellschaft REGISTRIERT sind, müssen noch melden — und auch da nur die nicht-US Beneficial Owners. Wer 2024-2025 ein BOI-Filing gemacht hat: keine Re-Filings nötig.",
  },
  {
    headline: "US-Karten als DE-Steuerinländer = kein Problem",
    detail:
      "Eine US-Kreditkarte ist in DE-Steuerlogik kein meldepflichtiges Auslandskonto (CRS gilt für Bank-Accounts, nicht Card-Linien). Du musst keine Anlage AUS oder Anlage WSO ausfüllen.",
  },
  {
    headline: "Sign-Up-Bonus-Punkte = steuerfrei",
    detail:
      "Nach BFH-Logik (analog zu Cashback) sind Rewards-Punkte als Rabatt-Äquivalent zu werten, nicht als Einkommen. Solange du sie nicht in cashbare Werte >$600/Jahr (US-1099-MISC-Schwelle) wandelst, ist nichts zu melden — und 1099-MISC betrifft nur US-Steuerresidente.",
  },
  {
    headline: "Foreign Transaction Fees als Betriebsausgabe",
    detail:
      "Bei US-LLC-Business-Card sind alle FX-Fees, Annual Fees und Card-Subscriptions als reguläre Operating Expenses absetzbar via Schedule C oder Form 1120-Pendant.",
  },
  {
    headline: "FBAR-Check für US-Banks",
    detail:
      "Wenn du als DE-Resident in US-Banks $10k+ aggregierte Konten hältst (Bank-Account zur US-LLC), brauchst du KEIN FBAR — das ist nur für US-Persons. Prüf trotzdem: bist du ggfs. wegen Substantial-Presence-Test ein US-Person?",
  },
  {
    headline: "Single-Member-US-LLC = Pass-Through-Default",
    detail:
      "Eine Single-Member-US-LLC ist standardmäßig 'disregarded entity' — alle Card-Rewards/Cashback fließen in DEIN persönliches DE-Einkommen (Anlage S oder G). Anders bei C-Corp-Election (Form 8832).",
  },
];

// ============================================================
// MILES & POINTS-STRATEGIEN · Stand Mai 2026
// ============================================================
// Verifizierte Quellen: LoyaltyLobby, Upgraded Points, The Points Guy,
// One Mile at a Time, AwardWallet, meilenoptimieren.com

// ===== DE→US AMEX MR-TRANSFER (der Haupt-Hack) =====
export const MR_TRANSFER_DE_US = {
  works: true,
  mechanism:
    "Nicht offiziell als 'Global Transfer Program' beworben — läuft per Telefon-Konsolidierung zwischen Global-Card-Relationship-verbundenen Accounts. Verifizierter Datapoint (Dec 2025, LoyaltyLobby): 72.477 DE-MR → 85.302 US-MR ≈ 1:1.17 (EUR/USD-Kurs-Bonus, EUR ist die härtere Punktwährung).",
  conversionRatio: "~1:1.17 (Mai 2026 EUR/USD-Tageskurs)",
  fxBonus: "~17% mehr Punkte umsonst durch FX-Effekt",
  requirements: [
    "US-Amex-Karte mit MR-Funktion seit ≥3 Monaten offen + good standing",
    "DE-Amex-Karte (egal welche MR-fähige) seit ≥3 Monaten",
    "Beide Accounts via Global Card Relationship verlinkt (oft automatisch wenn Name/Adresse matchen, sonst telefonisch koppeln)",
    "ITIN oder SSN für die US-Karte",
  ],
  process: [
    "Hotline: 877-621-2639 (US Global Card Transfer Team, 24/7) oder 1-800-525-3355 (Amex US Platinum-Hotline)",
    "Request 'transfer Membership Rewards points from my Germany account to my US account'",
    "Mehrere kleinere Transfers im Jahr berichtet als problemlos — 1× großer Transfer pro Jahr ist Standard",
    "Transfer ist EINSEITIG: US→DE zurück verliert den FX-Vorteil",
  ],
  watchouts: [
    "UNCLEAR exakter jährlicher Cap — Amex behält sich Einzelfall-Entscheidungen vor",
    "Amex DE Forex-Fee teilweise auf Transfer aufgeschlagen — netto bleibt aber positiv solange EUR stärker",
    "Direkter Webseiten-Transfer ('Punkte an anderen Account schicken') existiert NICHT — nur Telefon",
  ],
};

// ===== TRANSFER-PARTNER VERGLEICH DE vs US =====
export type TransferPartner = {
  name: string;
  usRatio: string;
  deRatio: string;
  winner: "us" | "de" | "equal" | "us-only" | "de-only";
  note?: string;
};

export const TRANSFER_PARTNERS: TransferPartner[] = [
  { name: "Air Canada Aeroplan", usRatio: "1:1", deRatio: "n/a", winner: "us-only", note: "Killer-Partner für Lufthansa-Awards" },
  { name: "Virgin Atlantic Flying Club", usRatio: "1:1", deRatio: "n/a", winner: "us-only", note: "Key für ANA-Sweet-Spots" },
  { name: "Delta SkyMiles", usRatio: "1:1", deRatio: "n/a", winner: "us-only" },
  { name: "JetBlue TrueBlue", usRatio: "1:0.8", deRatio: "n/a", winner: "us-only", note: "Bei Chase UR sogar 1:1!" },
  { name: "ANA Mileage Club", usRatio: "1:1", deRatio: "n/a", winner: "us-only" },
  { name: "Avianca LifeMiles", usRatio: "1:1", deRatio: "n/a", winner: "us-only", note: "Beste LH-Biz-Ratios mit niedrigen Surcharges" },
  { name: "Aeromexico Rewards", usRatio: "1:1.6", deRatio: "n/a", winner: "us-only" },
  { name: "Hilton Honors", usRatio: "1:2", deRatio: "1:1.5", winner: "us" },
  { name: "Marriott Bonvoy", usRatio: "1:1", deRatio: "3:2", winner: "us" },
  { name: "British Airways Avios", usRatio: "1:1", deRatio: "5:4", winner: "us", note: "25% besser in US" },
  { name: "Iberia Plus (Avios)", usRatio: "1:1", deRatio: "5:4", winner: "us" },
  { name: "Air France/KLM Flying Blue", usRatio: "1:1", deRatio: "5:4", winner: "us" },
  { name: "Qatar Privilege Club (Avios)", usRatio: "1:1", deRatio: "schlechter seit 1.8.2025", winner: "us" },
  { name: "Cathay Pacific Asia Miles", usRatio: "5:4", deRatio: "seit 1.8.2025 noch schlechter", winner: "us", note: "Beide schwach" },
  { name: "Emirates Skywards", usRatio: "5:4 (44-50% Devaluation 23.02.2026!)", deRatio: "massiv devaluiert 1.8.2025", winner: "us", note: "Vermeiden" },
  { name: "Singapore KrisFlyer", usRatio: "1:1", deRatio: "1:1 (UNCLEAR ob nach Devaluation)", winner: "equal" },
  { name: "Lufthansa Miles & More", usRatio: "n/a", deRatio: "nur via PAYBACK-Umweg (2:1 effektiv)", winner: "de-only", note: "Schlechte Ratio aber DE-only" },
  { name: "SAS EuroBonus", usRatio: "n/a", deRatio: "5:4", winner: "de-only" },
];

// ===== SWEET-SPOTS (Beste Awards 2026) =====
export type SweetSpot = {
  id: string;
  title: string;
  fromProgram: string;
  toProgram: string;
  ratio: string;
  punkte: number;
  realerWertEur: number;
  centProPunkt: number;
  bestFor: string;
  watchouts: string[];
  deadline?: string;
};

export const SWEET_SPOTS: SweetSpot[] = [
  {
    id: "aeroplan-jfk-fra-biz",
    title: "JFK→FRA Lufthansa Business one-way (Aeroplan)",
    fromProgram: "US-Amex MR / Chase UR / Capital One",
    toProgram: "Air Canada Aeroplan",
    ratio: "1:1",
    punkte: 60000,
    realerWertEur: 3500,
    centProPunkt: 5.8,
    bestFor: "Transatlantik Business one-way",
    watchouts: ["Steigt am 1.6.2026 auf 75k", "Lufthansa-First nur 14 Tage vor Abflug für Partner buchbar"],
    deadline: "1.6.2026",
  },
  {
    id: "aeroplan-jfk-fra-first",
    title: "JFK→FRA Lufthansa First one-way (Aeroplan)",
    fromProgram: "US-Amex MR / Chase UR / Capital One",
    toProgram: "Air Canada Aeroplan",
    ratio: "1:1",
    punkte: 100000,
    realerWertEur: 9000,
    centProPunkt: 9.0,
    bestFor: "Lufthansa First Class transatlantik",
    watchouts: ["Steigt 1.6.2026 auf 120k (+20%)", "Saver-Space rar"],
    deadline: "1.6.2026",
  },
  {
    id: "aeroplan-ord-nrt-ana-biz",
    title: "ORD→NRT ANA Business one-way (Aeroplan)",
    fromProgram: "US-Amex MR / Chase UR / Capital One",
    toProgram: "Air Canada Aeroplan",
    ratio: "1:1",
    punkte: 75000,
    realerWertEur: 4500,
    centProPunkt: 6.0,
    bestFor: "US-Asien Business one-way",
    watchouts: ["Steigt 1.6.2026 auf 102.5k (+37%!)", "Roame oder Seats.aero für Suche nutzen"],
    deadline: "1.6.2026",
  },
  {
    id: "aeroplan-miami-gru-avianca",
    title: "Miami→GRU Avianca Business one-way (Aeroplan)",
    fromProgram: "US-Amex MR / Chase UR / Capital One",
    toProgram: "Air Canada Aeroplan",
    ratio: "1:1",
    punkte: 60000,
    realerWertEur: 2800,
    centProPunkt: 4.6,
    bestFor: "US-Südamerika Business",
    watchouts: [],
  },
  {
    id: "virgin-ana-first-rt-west",
    title: "LAX→HND ANA First Class roundtrip (Virgin Atlantic)",
    fromProgram: "US-Amex MR / Chase UR / Bilt / Capital One",
    toProgram: "Virgin Atlantic Flying Club",
    ratio: "1:1",
    punkte: 110000,
    realerWertEur: 12000,
    centProPunkt: 10.9,
    bestFor: "ANA First Class ex West-Küste — bester Sweet Spot überhaupt",
    watchouts: ["ANA-First-Saver-Space rar, 355 Tage out suchen", "Letzte Devaluation Mai 2024"],
  },
  {
    id: "virgin-ana-biz-rt-jfk",
    title: "JFK→HND ANA Business roundtrip (Virgin Atlantic)",
    fromProgram: "US-Amex MR / Chase UR / Bilt / Capital One",
    toProgram: "Virgin Atlantic Flying Club",
    ratio: "1:1",
    punkte: 120000,
    realerWertEur: 7000,
    centProPunkt: 5.8,
    bestFor: "East-Coast → Tokyo Business RT",
    watchouts: [],
  },
  {
    id: "iberia-jfk-mad-biz-offpeak",
    title: "JFK→MAD Iberia Business off-peak (Avios)",
    fromProgram: "US-Amex MR / Chase UR / Bilt / Capital One",
    toProgram: "Iberia Plus / British Airways Club",
    ratio: "1:1 (US) / 5:4 (DE)",
    punkte: 40500,
    realerWertEur: 2500,
    centProPunkt: 6.2,
    bestFor: "Direktflug Transatlantik Spanien off-peak (Jan-März, Okt-Nov)",
    watchouts: ["Von 34k auf 40.5k erhöht (19% Devaluation)", "Iberia hat niedrige Surcharges ex MAD, moderate ex JFK"],
  },
  {
    id: "hyatt-park-tokyo-offpeak",
    title: "Park Hyatt Tokyo off-peak (Hyatt)",
    fromProgram: "Chase UR / Bilt",
    toProgram: "World of Hyatt",
    ratio: "1:1",
    punkte: 35000,
    realerWertEur: 1000,
    centProPunkt: 2.9,
    bestFor: "Luxus-Tokyo unter €1.000/Nacht-Real-Wert",
    watchouts: ["Vor 20.5.2026 buchen! Top-tier dann 75k (+114%)", "Newly remodeled, viel Availability gedropped"],
    deadline: "20.5.2026",
  },
  {
    id: "hyatt-maldives",
    title: "Park Hyatt Maldives Hadahaa (Hyatt)",
    fromProgram: "Chase UR / Bilt",
    toProgram: "World of Hyatt",
    ratio: "1:1",
    punkte: 30000,
    realerWertEur: 1300,
    centProPunkt: 4.4,
    bestFor: "Overwater-Villa zum Bruchteil",
    watchouts: ["20.5.2026 Devaluation auf bis 75k Peak", "Resort-Fees fallen weg, Transfer-Speedboat cash"],
    deadline: "20.5.2026",
  },
  {
    id: "ba-avios-shorthaul",
    title: "LHR→Europa short-haul off-peak (BA Avios)",
    fromProgram: "US/DE-Amex MR / Chase UR / Bilt / Capital One",
    toProgram: "British Airways Club",
    ratio: "1:1 (US) / 5:4 (DE)",
    punkte: 6000,
    realerWertEur: 150,
    centProPunkt: 2.5,
    bestFor: "Quick Europa-Hops 4k-8.5k Punkte",
    watchouts: ["BA Surcharges auf BA-metal-Routen hoch", "Auf Iberia/Vueling/Aer Lingus-Routen niedrig"],
  },
  {
    id: "qatar-via-ba-avios",
    title: "Qatar Qsuites Business via BA-Avios-Umweg (DE-Hack)",
    fromProgram: "DE-Amex MR → BA Avios",
    toProgram: "Qatar Privilege Club (via BA Avios free conversion)",
    ratio: "DE 5:4 → 1:1 BA → 1:1 Qatar",
    punkte: 70000,
    realerWertEur: 3500,
    centProPunkt: 5.0,
    bestFor: "DE-Hack um direkte Qatar-Devaluation auszuweichen",
    watchouts: ["BA → Qatar Avios-Transfer aktuell 1:1 free", "Qatar dynamic pricing"],
  },
  {
    id: "singapore-suites-jfk-fra",
    title: "Singapore Suites JFK→FRA (KrisFlyer)",
    fromProgram: "US-Amex MR / Chase UR / Citi TYP / Capital One",
    toProgram: "Singapore KrisFlyer",
    ratio: "1:1",
    punkte: 86000,
    realerWertEur: 6000,
    centProPunkt: 7.0,
    bestFor: "Singapore Suites Erlebnis (A380 Doppelbett)",
    watchouts: ["Suites-Availability nur für KrisFlyer-Member, nicht via Partner", "Saver-Space 355 Tage out suchen"],
  },
  {
    id: "avianca-lh-biz",
    title: "Lufthansa Business transatlantik via Avianca LifeMiles",
    fromProgram: "US-Amex MR / Citi TYP / Capital One",
    toProgram: "Avianca LifeMiles",
    ratio: "1:1",
    punkte: 63000,
    realerWertEur: 3500,
    centProPunkt: 5.6,
    bestFor: "Lufthansa Biz OHNE Fuel-Surcharges (LifeMiles passt keine BA-ähnlichen Surcharges drauf)",
    watchouts: ["LifeMiles devaluiert häufig still", "Buchungsmaschine instabil - oft Service-Center anrufen"],
  },
  {
    id: "marriott-fna-brilliant",
    title: "Marriott Brilliant FNA 85k + 25k Top-off (Marriott Bonvoy)",
    fromProgram: "US-Amex Marriott Brilliant",
    toProgram: "Marriott Bonvoy Free Night Award",
    ratio: "n/a (Anniversary Cert)",
    punkte: 0,
    realerWertEur: 800,
    centProPunkt: 0,
    bestFor: "St. Regis / Ritz Carlton bis effektiv 110k-Property",
    watchouts: ["Brilliant AF $650/Jahr — nur mit Stay-Plan sinnvoll", "Top-off Maximum 25k seit 12.3.2026 (vorher 15k)"],
  },
  {
    id: "de-mr-payback-mm",
    title: "DE-MR → PAYBACK 2:1 → M&M 1:1 = effektiv 2:1 zu Lufthansa Miles & More",
    fromProgram: "DE-Amex MR",
    toProgram: "Lufthansa Miles & More",
    ratio: "2:1 (effektiv)",
    punkte: 170000,
    realerWertEur: 1500,
    centProPunkt: 0.9,
    bestFor: "Wenn US-Transfer keine Option ist — M&M LH First 85k einseitig",
    watchouts: ["Zweistufiger Transfer", "Nur für M&M-Status-Member empfehlenswert", "M&M dynamic pricing seit Juni 2025"],
  },
];

// ===== KRITISCHE 2026-DEADLINES =====
export const DEADLINES_2026 = [
  {
    date: "23.02.2026",
    event: "Amex globale Devaluation",
    detail: "8 Airlines: Conversion-Ratios um 22-25% erhöht (Emirates 44-50%)",
    status: "passed",
  },
  {
    date: "12.03.2026",
    event: "Marriott Top-off-Erhöhung",
    detail: "FNA Top-off von 15k auf 25k Points erhöht (mehr Wert für Brilliant-Holder)",
    status: "passed",
  },
  {
    date: "20.05.2026",
    event: "Hyatt Award-Chart-Änderung",
    detail: "Top-Tier Properties bis +114% (Park Hyatt Tokyo 35k → 75k, Maldives 30k → bis 75k)",
    status: "upcoming",
  },
  {
    date: "01.06.2026",
    event: "Aeroplan Award-Chart-Devaluation",
    detail: "JFK→FRA Biz 60k→75k, LH First 100k→120k, ORD→NRT 75k→102.5k (+37%)",
    status: "upcoming",
  },
  {
    date: "30.06.2026",
    event: "Etihad Guest endet als Amex-Partner",
    detail: "Weltweit — Punkte VERLOREN ab dann wenn nicht transferiert",
    status: "upcoming",
  },
  {
    date: "01.10.2026",
    event: "Amex Platinum verliert Lufthansa-Lounge-Zugang",
    detail: "Wenn du die Karte deshalb hältst — neu rechnen",
    status: "upcoming",
  },
];

// ===== VELOCITY-STRATEGIE 12 MONATE (DE-Resident mit US-LLC) =====
export const VELOCITY_STRATEGY = [
  { month: "Setup (3-6 Mo vor M0)", action: "US-LLC + ITIN + US-Bank + US-Adresse + US-Telefon", note: "Vorbereitung-Pflicht" },
  { month: "Monat 0", action: "DE Amex Platinum (85k MR Mai-2026-Rekord)", note: "Basis-MR-Konto, später US-koppelbar" },
  { month: "Monat 1", action: "Cap One Quicksilver für Foreigners (mit ITIN)", note: "Credit-File-Aufbau, kein 5/24-Impact" },
  { month: "Monat 4-6", action: "Cap One Venture X (75k Miles + $300 Travel-Credit)", note: "Erster echter US-SUB, easy Approval" },
  { month: "Monat 7", action: "Amex US Gold (90k MR) via Global Card Relationship", note: "Hier zahlt sich DE-History aus — oft ohne FICO" },
  { month: "Monat 9", action: "Chase Sapphire Preferred (100k UR)", note: "Erst jetzt — 5/24 sauberer + Credit-File gebaut" },
  { month: "Monat 11", action: "Amex US Platinum (175k MR)", note: "Maximal-SUB. Achtung: lifetime-per-product Regel" },
  { month: "Monat 13+", action: "Chase Ink Business (90k UR, Business zählt NICHT zu 5/24!)", note: "Skalierung über LLC-EIN" },
];

export const VELOCITY_TOTAL_VALUE = {
  realistic: "€8.000-12.000",
  aggressive: "bis €20.000 (mit mehreren Business-Karten, Shutdown-Risiko ↑)",
};

// ===== MILES-AVOID-LISTE 2026 =====
export const MILES_AVOID = [
  { item: "Manufactured Spending (Gift-Cards, Plastiq, BlueBird)", reason: "Amex-Shutdown-Welle seit März 2026 explizit gegen international spend + resale" },
  { item: "Buying Groups", reason: "Multi-Party-Risiko (Merchant-Shutdowns, Theft, Bank-FR)" },
  { item: "Etihad Guest als Amex-Transferziel", reason: "ENDET 30.6.2026 weltweit — Punkte VERLOREN ab dann" },
  { item: "Lufthansa-Lounge via Amex Platinum als Hauptgrund", reason: "ENDET 1.10.2026 — wenn das dein einziger Reason ist neu rechnen" },
  { item: "Aeroplan-Premium-Buchungen nach 1.6.2026", reason: "Massive Devaluation 7.5k-11k-mile-Band (US-Asien-Biz +37%)" },
  { item: "Hyatt Top-Tier nach 20.5.2026", reason: "+114% auf Park Hyatt Tokyo/Kyoto/Maui/Maldives" },
  { item: "Emirates Skywards via Amex", reason: "44-50% Devaluation seit 23.02.2026 — fast nie noch Sweet Spot" },
  { item: "Chase UR-Punkte halten ohne aktive Karte", reason: "Verfallen sofort bei Schließung der letzten UR-Karte — vorher zu Hyatt/Avios pushen" },
  { item: "DE-MR direkt zu Cathay/Emirates/Etihad/Qatar", reason: "Seit 1.8.2025 12-30% schlechter — über BA-Avios-Umweg (Qatar-Free-Transfer) oder via US-Transfer" },
  { item: "Bilt Card 2.0 als DE-Resident", reason: "Cardless-Transition unstabil bis T&Cs final publiziert" },
];

// ===== STEUER für Miles & Points (DE) =====
export const MILES_TAX_NOTES = [
  {
    headline: "Privat gesammelte SUBs/Punkte = steuerfrei in DE",
    detail:
      "BFH-Rechtsprechung zu Sachprämien + §3 Nr. 38 EStG: Treuepunkte bis €1.080/Jahr Freibetrag. Darüber bei Amex MR durch Amex-eigene Pauschalversteuerung abgedeckt — keine Steuerpflicht beim Empfänger.",
  },
  {
    headline: "Business-Karten (LLC) + private Einlösung = Grauzone",
    detail:
      "Wenn LLC-Ausgaben Punkte generieren und du privat einlöst = geldwerter Vorteil auf US-Seite (1099 nur wenn >$600 Cash-Back, Punkte i.d.R. nicht). Auf DE-Seite Betriebsausgabenkorrektur möglich. ZWINGEND Steuerberater einschalten.",
  },
  {
    headline: "Welcome Bonuses ohne Spending = theoretisch Schenkung",
    detail:
      "Bei Banken-SUBs (z.B. Mercury $500-Promo) steuerlich bisher unbeanstandet. Bei Punkte-SUBs ohne Spending-Requirement: prüfen.",
  },
];

// ===== AVOID-LISTE =====
export const AVOID_LIST = [
  {
    name: "Wells Fargo Bilt (alte Version)",
    reason: "Retired am 6.2.2026, nach diesem Datum Transaktionen abgelehnt. Cardless-Version ist Nachfolger.",
  },
  {
    name: "Standard-US-CCs mit DE-Adresse (Chase, Citi, Discover, BoA)",
    reason: "Lehnen Foreign-Address-Apps systematisch ab. Brauchst echte US-Adresse + SSN/ITIN.",
  },
  {
    name: "Brex für Bootstrapped Solo-LLC ohne Funding",
    reason: "Approval-Rate stark gesunken seit 2022. Mercury IO oder Ramp ist die bessere Wahl.",
  },
  {
    name: "Capital One Spark Cards (Personal-Guarantee-Variante)",
    reason: "Reports auf PERSONAL Credit Report → zählt als 5/24-Apply → torpediert Chase-Strategie.",
  },
  {
    name: "Karten ohne Foreign Transaction Fee Waiver (Citi Double Cash, Chase Freedom Unlimited)",
    reason: "3% FX-Aufschlag bei jeder EUR-Transaktion. Nicht sinnvoll für DE-User die in EUR ausgeben.",
  },
  {
    name: "Manufactured Spending (MS)",
    reason: "Amex und Chase shutten Konten ohne Vorwarnung — Punkte + Balance können einkassiert werden.",
  },
  {
    name: "Sapphire-Family-Repeats vor 48 Monaten",
    reason: "Bonus pro Karte einmal — 2026-Update lockerte das, aber Cooldown bleibt.",
  },
];
