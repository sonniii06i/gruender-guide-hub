/**
 * BWA-Struktur (SKR03-Kontenplan) + Branchen-Benchmarks — extrahiert aus
 * pages/BwaGenerator.tsx für RAG-Indexing. BWA_STRUCTURE listet 10 Kategorien
 * mit 41 SKR03-Positionen, BRANCHEN_BENCHMARKS hat 8 Branchen-Typen.
 */

export type BwaPos = {
  category: string;
  emoji: string;
  type: "erloes" | "aufwand";
  istMaterial?: boolean;
  istPersonal?: boolean;
  positions: { name: string; key: string; skr03?: string }[];
};

export const BWA_STRUCTURE: BwaPos[] = [
  {
    category: "Erlöse",
    emoji: "💰",
    type: "erloes",
    positions: [
      { name: "Umsatzerlöse 19% USt", key: "erloese_19", skr03: "8400" },
      { name: "Umsatzerlöse 7% USt", key: "erloese_7", skr03: "8300" },
      { name: "Erlöse innergemeinschaftliche Lieferung", key: "erloese_ig", skr03: "8125" },
      { name: "Erlöse Drittland (Export)", key: "erloese_drittland", skr03: "8120" },
      { name: "Sonstige betriebliche Erträge", key: "erloese_sonstige", skr03: "8400" },
    ],
  },
  {
    category: "Wareneinkauf / Material",
    emoji: "📦",
    type: "aufwand",
    istMaterial: true,
    positions: [
      { name: "Wareneinkauf 19% VSt", key: "wareneinkauf_19", skr03: "3400" },
      { name: "Wareneinkauf 7% VSt", key: "wareneinkauf_7", skr03: "3300" },
      { name: "Roh- / Hilfsstoffe", key: "rohhilfsstoffe", skr03: "3000" },
      { name: "Verpackungsmaterial", key: "verpackung", skr03: "4775" },
      { name: "Bestandsveränderung", key: "bestandsveraendernung", skr03: "8990" },
    ],
  },
  {
    category: "Personal",
    emoji: "👥",
    type: "aufwand",
    istPersonal: true,
    positions: [
      { name: "Löhne und Gehälter", key: "loehne", skr03: "4120" },
      { name: "GF-Gehalt", key: "gf_gehalt", skr03: "4124" },
      { name: "Sozialversicherung", key: "sv", skr03: "4138" },
      { name: "Berufsgenossenschaft", key: "bg", skr03: "4138" },
    ],
  },
  {
    category: "Marketing / Vertrieb",
    emoji: "📣",
    type: "aufwand",
    positions: [
      { name: "Werbekosten / Ads (Meta, Google)", key: "ads", skr03: "4600" },
      { name: "Influencer / PR", key: "influencer", skr03: "4600" },
      { name: "Marketing-Tools (CRM, Email, Tracking)", key: "marketing_tools", skr03: "4910" },
      { name: "Provisionen", key: "provisionen", skr03: "4760" },
    ],
  },
  {
    category: "Versand / Fulfillment",
    emoji: "🚚",
    type: "aufwand",
    positions: [
      { name: "Frachtkosten / Versand", key: "fracht", skr03: "4730" },
      { name: "FBA / 3PL-Gebühren", key: "fba", skr03: "3100" },
      { name: "Lagerkosten", key: "lager", skr03: "4210" },
    ],
  },
  {
    category: "Marketplace-Gebühren",
    emoji: "🛍️",
    type: "aufwand",
    positions: [
      { name: "Amazon-Gebühren (FBA, Provision)", key: "amazon_fees", skr03: "3100" },
      { name: "Shopify / Stripe / Paypal Fees", key: "payment_fees", skr03: "3100" },
      { name: "eBay / Kaufland / Otto Provisionen", key: "marketplace_fees", skr03: "3100" },
    ],
  },
  {
    category: "Raumkosten",
    emoji: "🏢",
    type: "aufwand",
    positions: [
      { name: "Miete Büro / Geschäftsräume", key: "miete", skr03: "4210" },
      { name: "Strom / Heizung / Reinigung", key: "nebenkosten", skr03: "4240" },
      { name: "Coworking-Beiträge", key: "coworking", skr03: "4210" },
    ],
  },
  {
    category: "Verwaltung / Sonstige",
    emoji: "📋",
    type: "aufwand",
    positions: [
      { name: "Beratungs- / StB-Kosten", key: "stb", skr03: "4955" },
      { name: "Anwaltskosten", key: "anwalt", skr03: "4955" },
      { name: "Versicherungen (D&O, Haftpflicht)", key: "versicherung", skr03: "4360" },
      { name: "IT / Software-Abos", key: "it_software", skr03: "4910" },
      { name: "Bürobedarf", key: "buero", skr03: "4930" },
      { name: "Telefon / Internet", key: "telefon", skr03: "4920" },
      { name: "Fortbildung / Coaching", key: "fortbildung", skr03: "4945" },
      { name: "Reisekosten / Bewirtung", key: "reisen", skr03: "4670" },
      { name: "Sonstige Aufwendungen", key: "sonstige", skr03: "4900" },
    ],
  },
  {
    category: "Abschreibungen",
    emoji: "📉",
    type: "aufwand",
    positions: [
      { name: "AfA Sachanlagen (Computer, Möbel)", key: "afa_sach", skr03: "4830" },
      { name: "AfA immaterielle Güter (Software)", key: "afa_immat", skr03: "4831" },
      { name: "GWG-Sofortabschreibung (< 800 €)", key: "gwg", skr03: "4855" },
    ],
  },
  {
    category: "Finanzierung / Zinsen",
    emoji: "🏦",
    type: "aufwand",
    positions: [
      { name: "Zinsaufwand Kredite", key: "zinsen_kredit", skr03: "2110" },
      { name: "Bankgebühren", key: "bank_geb", skr03: "4970" },
    ],
  },
];

export type BranchenTyp =
  | "handel_d2c"
  | "handel_grosshandel"
  | "saas_software"
  | "dienstleistung_beratung"
  | "produktion_industrie"
  | "gastro_hotel"
  | "handwerk"
  | "sonstiges";

export type Benchmark = {
  ebitda_stark: number;
  ebitda_ok: number;
  ek_stark: number;
  ek_ok: number;
  personal_max_stark: number;
  personal_max_ok: number;
  rohertrag_stark: number;
  rohertrag_ok: number;
};

export const BRANCHEN_BENCHMARKS: Record<BranchenTyp, Benchmark & { label: string }> = {
  handel_d2c: {
    label: "Handel / D2C / E-Commerce",
    ebitda_stark: 12, ebitda_ok: 6,
    ek_stark: 25, ek_ok: 15,
    personal_max_stark: 20, personal_max_ok: 35,
    rohertrag_stark: 50, rohertrag_ok: 35,
  },
  handel_grosshandel: {
    label: "Großhandel / B2B-Handel",
    ebitda_stark: 6, ebitda_ok: 3,
    ek_stark: 25, ek_ok: 15,
    personal_max_stark: 12, personal_max_ok: 20,
    rohertrag_stark: 25, rohertrag_ok: 15,
  },
  saas_software: {
    label: "SaaS / Software",
    ebitda_stark: 20, ebitda_ok: 10,
    ek_stark: 30, ek_ok: 15,
    personal_max_stark: 45, personal_max_ok: 65,
    rohertrag_stark: 75, rohertrag_ok: 60,
  },
  dienstleistung_beratung: {
    label: "Dienstleistung / Beratung",
    ebitda_stark: 15, ebitda_ok: 8,
    ek_stark: 30, ek_ok: 20,
    personal_max_stark: 50, personal_max_ok: 70,
    rohertrag_stark: 80, rohertrag_ok: 65,
  },
  produktion_industrie: {
    label: "Produktion / Industrie",
    ebitda_stark: 10, ebitda_ok: 6,
    ek_stark: 30, ek_ok: 20,
    personal_max_stark: 25, personal_max_ok: 40,
    rohertrag_stark: 35, rohertrag_ok: 25,
  },
  gastro_hotel: {
    label: "Gastro / Hotellerie",
    ebitda_stark: 15, ebitda_ok: 8,
    ek_stark: 20, ek_ok: 10,
    personal_max_stark: 30, personal_max_ok: 40,
    rohertrag_stark: 65, rohertrag_ok: 55,
  },
  handwerk: {
    label: "Handwerk",
    ebitda_stark: 10, ebitda_ok: 5,
    ek_stark: 25, ek_ok: 15,
    personal_max_stark: 35, personal_max_ok: 50,
    rohertrag_stark: 50, rohertrag_ok: 35,
  },
  sonstiges: {
    label: "Sonstiges / Allgemein",
    ebitda_stark: 12, ebitda_ok: 6,
    ek_stark: 25, ek_ok: 15,
    personal_max_stark: 30, personal_max_ok: 45,
    rohertrag_stark: 40, rohertrag_ok: 25,
  },
};
