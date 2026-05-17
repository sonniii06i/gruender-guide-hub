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
