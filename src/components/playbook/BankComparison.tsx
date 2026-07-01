import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Building2, Cloud, ExternalLink, Leaf, Sparkles, Star, Zap } from "lucide-react";

type BankType = "hausbank" | "neobank" | "online" | "sustainable";

interface Bank {
  name: string;
  type: BankType;
  url: string;
  /** Kontoführungsgebühr Einsteiger-Tarif (Stand 2026, vor Eröffnung verifizieren) */
  monthlyFee: string;
  /** Pro-Buchungs-Kosten (online/beleglos) – meist günstiger als beleghaft */
  txnCost: string;
  /** Anzahl freier Buchungen pro Monat */
  freeTxns?: string;
  card?: string;
  /** Stammkapital-Einzahlung für GmbH-Gründung */
  stammkapital: "ja" | "limited" | "nein";
  /** Akzeptiert die Bank ein "GmbH i.G."-Konto (zwischen Notar und HR-Eintrag)? */
  gmbhIG: "ja" | "limited" | "nein";
  setupTime?: string;
  /** Indikative Einschätzung 1–5 basierend auf Trustpilot/finanzfluss/Marktreviews */
  rating: number;
  /** Optionaler Direkt-Link auf Trustpilot-Profil */
  trustpilotUrl?: string;
  /** Community-Tipp aus User-Erfahrung */
  communityPick?: boolean;
  pros: string[];
  cons: string[];
  bestFor: string;
  /** Klare Warnung wenn Bank NICHT für GmbH geeignet (DKB Business, N26, Kontist) */
  dealbreaker?: string;
  /** Feature-Flags für Filter & Badges */
  features?: {
    datev?: boolean;
    cashEinzahlung?: boolean;
    kfwPartner?: boolean;
    multiUser?: boolean;
    multiCurrency?: boolean;
    apiAccess?: boolean;
  };
  /** Detail-Konditionen (Stand Recherche 2026) */
  conditions?: {
    additionalCardCost?: string;
    foreignSepa?: string;
    foreignSwift?: string;
    fxFee?: string;
    cashFee?: string;
  };
}

const BANKS: Bank[] = [
  // ============ HAUSBANKEN (Filialnetz, Kreditbeziehung) ============
  {
    name: "Deutsche Bank Business",
    type: "hausbank",
    url: "https://www.deutsche-bank.de/gk.html",
    monthlyFee: "14,90 €/Mon. (BasicKonto) · 24,90 €/Mon. (ClassicKonto) · 39,90 €/Mon. (PremiumKonto)",
    txnCost: "BasicKonto: 0,30 € pro SEPA-Buchung · ClassicKonto: unbegrenzt frei",
    freeTxns: "ClassicKonto: unbegrenzt SEPA inkl.",
    card: "Deutsche Bank Card (Girocard) + optional Visa/Mastercard Business",
    stammkapital: "ja",
    gmbhIG: "ja",
    setupTime: "1–2 Wochen (online via Video-Ident oder Filialtermin)",
    rating: 4,
    communityPick: true,
    pros: [
      "Notar-Akzeptanz: Sperrkonto ohne Diskussionen, Standard für GmbH-Gründung",
      "Direkter KfW-Partner (KfW 067 Gründerkredit, KfW 037 Unternehmerkredit)",
      "Schaltereinzahlung Bargeld kostenlos (Scheine), Münzgeld extra",
      "Internationale Korrespondenzbank-Infrastruktur, SWIFT zuverlässig",
      "Echte Filialberatung bei Finanzierungen > 100k €",
    ],
    cons: [
      "BasicKonto: 0,30 €/Buchung – bei 200 Buchungen/Mon = 60 € obendrauf (ClassicKonto: unbegrenzt frei)",
      "Online-Banking + App spürbar behäbiger als Neobanken",
      "Compliance teilweise starr, Eskalationen dauern",
    ],
    bestFor: "GmbHs mit Kreditbedarf, Cash-Geschäft & Notar-Akzeptanz first",
    features: { datev: true, cashEinzahlung: true, kfwPartner: true, multiUser: true },
    conditions: {
      foreignSwift: "0,15 % (min. 15 €)",
      cashFee: "Schalter kostenlos (Scheine), Münzgeld extra",
    },
  },
  {
    name: "Commerzbank Business",
    type: "hausbank",
    url: "https://www.commerzbank.de/firmenkunden/",
    monthlyFee: "Klassik 15,90 €/Mon. · Premium 34,90 €/Mon. · Premium Plus 54,90 €/Mon.",
    txnCost: "Klassik: 0,20 € ab 11. · Premium: 0,15 € ab 76. · Premium Plus: 0,10 € ab 251.",
    freeTxns: "Klassik: 10 beleglose · Premium: 75 beleglose · Premium Plus: 250 inkl.",
    card: "Girocard + Mastercard/Visa Business Debit, Apple Pay/Google Pay",
    stammkapital: "ja",
    gmbhIG: "ja",
    setupTime: "1–2 Wochen (Filiale oder Video-Ident)",
    rating: 3,
    pros: [
      "Mittelstandsfinanzierung deutlich stärker als Neobanks (Working Capital, Avalkredite)",
      "Premium Plus mit Fremdwährungs-Subkonto integriert",
      "Filialnetz für Bargeld + persönliche Beratung",
      "KfW-Partner bei größeren Volumen",
      "Stabile DATEV-Schnittstelle, von StB bevorzugt",
    ],
    cons: [
      "Premium Plus 54,90 €/Mon. sehr teuer; neues Premium 34,90 € nur mit 75 Inklusiv-Buchungen",
      "Berichte über plötzliche Kontokündigungen ohne Begründung (Trustpilot 2026)",
      "App + Online-Banking spürbar langsamer als Neobanken",
    ],
    bestFor: "KMU mit Kreditbedarf > 100k €, etablierte Beziehung",
    features: { datev: true, cashEinzahlung: true, kfwPartner: true, multiUser: true },
  },
  {
    name: "Sparkasse (regional)",
    type: "hausbank",
    url: "https://www.sparkasse.de/firmenkunden",
    monthlyFee: "Beispiel HASPA: 10 €/Mon. (Standard, kann auf 19,50 € steigen)",
    txnCost: "0,30 € pro Buchung, 0,40 € pro Dauerauftrag (HASPA)",
    freeTxns: "regional, Buchungspaket variiert",
    card: "Girocard + optional Mastercard/Visa Business",
    stammkapital: "ja",
    gmbhIG: "ja",
    setupTime: "1–3 Wochen (i. d. R. Filialtermin)",
    rating: 3,
    pros: [
      "Standard für Notar-Akzeptanz beim Sperrkonto (~350 lokale Sparkassen)",
      "Filial-Schalter-Bargeldeinzahlung kostenlos",
      "Stark bei KfW + Landes-Förderbanken (LfA Bayern, IBB Berlin, NRW.BANK)",
      "Persönliche Beratung bei Krediten, lokal verankert",
      "Genossenschaftlich vergleichbare Mittelstands-DNA",
    ],
    cons: [
      "0,30 € pro Buchung im Standard-Tarif relativ teuer für Bucher-Heavy-Brands",
      "App + Online-Banking deutlich hinter Neobanken (variiert je Sparkasse)",
      "Konditionen variieren stark je Sparkasse – immer lokal verhandeln",
    ],
    bestFor: "GmbHs mit lokalem Schwerpunkt + KfW/Förder-Bedarf",
    features: { datev: true, cashEinzahlung: true, kfwPartner: true, multiUser: true },
    conditions: { cashFee: "Schaltereinzahlung kostenlos" },
  },
  {
    name: "Volksbank / Raiffeisenbank",
    type: "hausbank",
    url: "https://www.vr.de/firmenkunden",
    monthlyFee: "8–14 €/Mon. (regional)",
    txnCost: "0,12–0,18 € online (variiert je VR-Bank)",
    freeTxns: "Pakete regional",
    card: "VR-BankCard, optional Mastercard/Visa Business",
    stammkapital: "ja",
    gmbhIG: "ja",
    setupTime: "1–3 Wochen",
    rating: 3,
    pros: [
      "Genossenschaftliches Modell (Mitglied = Miteigentümer), oft fairere Konditionen",
      "Starkes Mittelstandsgeschäft, KfW + Förderkredite",
      "Lokal verankert, persönliche Beratung",
      "Akzeptanz beim Notar problemlos",
      "VR-Banken-Verbund mit > 700 Banken DE-weit",
    ],
    cons: [
      "Digitalisierung sehr uneinheitlich je VR-Bank",
      "Konditionen Verhandlungssache, nicht transparent ausgewiesen",
      "App + Online-Banking je nach Bank veraltet",
    ],
    bestFor: "Gründer mit lokalem Bezug, regionalem Mittelstand-Fokus",
    features: { datev: true, cashEinzahlung: true, kfwPartner: true, multiUser: true },
  },
  {
    name: "Postbank Business",
    type: "hausbank",
    url: "https://www.postbank.de/firmenkunden/produkte/konten/business-giro.html",
    monthlyFee: "12,90 €/Mon. (Promo bis 31.12.2026: 0 € Grundpreis)",
    txnCost: "0,20–0,28 € pro Buchung",
    freeTxns: "Promo-Aktion läuft",
    card: "Postbank Business Card Plus 24 €/Jahr (1. Jahr frei)",
    stammkapital: "ja",
    gmbhIG: "ja",
    setupTime: "1–2 Wochen (online möglich)",
    rating: 3,
    pros: [
      "Cash Group ATMs (Deutsche Bank, HVB, Commerzbank, Postbank) Bargeld-Abhebung frei",
      "Filialnetz via Post + Postbank-Zentren",
      "Deutsche-Bank-Tochter (stabile Hausbank-Beziehung möglich)",
      "KfW-Partner",
      "Aktionspreis 0 € Grundpreis bis Ende 2026",
    ],
    cons: [
      "Pro-Buchung-Modell (0,20–0,28 €) summiert sich bei Active Bookern",
      "App + Online-Banking 2026 spürbar hinter Neobanken",
      "Trustpilot Service-Erfahrungen gemischt",
    ],
    bestFor: "Geschäfte mit viel Bargeld + Hausbank-Anschluss zur Deutschen Bank",
    features: { datev: true, cashEinzahlung: true, kfwPartner: true, multiUser: true },
  },
  {
    name: "HypoVereinsbank (UniCredit)",
    type: "hausbank",
    url: "https://www.hypovereinsbank.de/hvb/firmenkunden",
    monthlyFee: "Modular: 50/250/750 freie Buchungen pro Modul",
    txnCost: "0,40 € (50er) · 0,30 € (250er) · 0,20 € (750er) ab Limit",
    freeTxns: "modular wählbar",
    card: "UniCredit Card Business 1 €/Mon (frei bis 31.12.2026)",
    stammkapital: "ja",
    gmbhIG: "ja",
    setupTime: "2–3 Wochen",
    rating: 3,
    pros: [
      "Modulares Pricing – nur das zahlen, was man wirklich braucht",
      "UniCredit-Konzern: starke EU-Präsenz (Italien, Österreich, Südosteuropa)",
      "KfW-Partner",
      "Aktionspreis Karte 0 € bis Ende 2026",
    ],
    cons: [
      "Online-Banking-UI 2026 deutlich veraltet",
      "Pricing-Transparenz schwach – muss man explizit anfragen",
      "Filialnetz schwächer außerhalb Bayern/NRW",
    ],
    bestFor: "GmbHs mit IT/SE/AT-Bezug, modulare Pricing-Bedürfnisse",
    features: { datev: true, cashEinzahlung: true, kfwPartner: true, multiUser: true },
  },
  {
    name: "Targobank Business",
    type: "hausbank",
    url: "https://www.targobank.de/de/geschaeftskunden/",
    monthlyFee: "ab 9,95 €/Mon.",
    txnCost: "0,12 € online",
    freeTxns: "begrenzt, je Tarif",
    card: "Visa Business",
    stammkapital: "ja",
    gmbhIG: "ja",
    setupTime: "2–3 Wochen",
    rating: 3,
    pros: [
      "Crédit-Mutuel-Konzern (genossenschaftlich, finanziell stark)",
      "Einfache Tarif-Struktur, transparent",
      "350 Filialen in DE",
      "Persönliche Beratung beim Sparkassen-/Volksbank-Ersatz",
    ],
    cons: [
      "Online-Banking funktional, aber nicht modern",
      "Kleineres Image im Mittelstand vs. Deutsche Bank/Commerzbank",
      "Weniger Mittelstandsfinanzierungs-Tradition",
    ],
    bestFor: "Solider Allrounder, GmbHs ohne komplexe Anforderungen",
    features: { datev: true, cashEinzahlung: true, kfwPartner: true, multiUser: true },
  },

  // ============ DIREKTBANKEN / ONLINE-HYBRID ============
  {
    name: "DKB Business",
    trustpilotUrl: "https://www.trustpilot.com/review/dkb.de",
    type: "online",
    url: "https://www.dkb.de/business/",
    monthlyFee: "15 €/Mon. (Pauschale)",
    txnCost: "alle beleglosen unbegrenzt inkl., beleghaft 2,95 €",
    freeTxns: "unbegrenzt beleglos",
    card: "Visa Business Debit (kostenlos), Apple Pay/Google Pay",
    stammkapital: "nein",
    gmbhIG: "nein",
    setupTime: "1–3 Tage Video-Ident (nur für Berechtigte)",
    rating: 4,
    dealbreaker: "Akzeptiert KEINE GmbH/UG – nur Freiberufler, Gewerbe-Einzelunternehmer, Hausverwalter. Für Gründung nicht nutzbar.",
    pros: [
      "15 € Pauschale unlimited Buchungen – top für Solo-Freiberufler mit hohem Volumen",
      "DATEV-Schnittstelle inklusive (kein Aufpreis)",
      "Cash-im-Shop bei REWE/Penny/dm bundesweit (1,5 % Einzahlung)",
      "KfW-Partner, beste Mobile-App unter DE-Vollbanken 2026",
    ],
    cons: [
      "**Dealbreaker:** keine GmbH/UG-Eröffnung möglich",
      "Onboarding-Compliance-Reviews ziehen sich manchmal Wochen",
      "Trustpilot Privat-Reviews überlagern Business-Bewertung (~2,4/5)",
    ],
    bestFor: "Freiberufler & Solo-Gewerbe (NICHT für GmbH-Gründer)",
    features: { datev: true, cashEinzahlung: true, kfwPartner: true },
  },
  {
    name: "Fyrst",
    type: "online",
    url: "https://www.fyrst.de/",
    monthlyFee: "Base 0 € (natürliche Person) / 6 € (juristische) · Complete 10 €/Mon.",
    txnCost: "Base 0,19 € · Complete 0,08 € ab 76. Buchung · Echtzeit 0,30 €",
    freeTxns: "Base 50 · Complete 75 beleglose",
    card: "Fyrst Card + Card Plus inklusive",
    stammkapital: "ja",
    gmbhIG: "ja",
    setupTime: "1–2 Wochen Video-Ident",
    rating: 4,
    pros: [
      "Echte GmbH/UG-Eröffnung inkl. Sperrkonto (Deutsche-Bank-Backbone)",
      "DATEV-Schnittstelle inklusive (kein Aufpreis)",
      "Bargeldeinzahlung in Postbank-Filialen (2,50 € pro 5.000 €)",
      "Free-Tier mit 50 belegloser Buchungen für Solo-GmbHs ausreichend",
      "Bridge zwischen klassischer Hausbank-Stabilität und Online-Komfort",
    ],
    cons: [
      "Mobile App schwächer als bei reinen Neobanks (Qonto, Finom)",
      "Support langsamer als versprochen, Trustpilot ~2,8/5",
      "Limit auf Buchungen führt bei Active Bookern zu Aufpreis",
    ],
    bestFor: "Solo-GmbHs die Hausbank-Stabilität + Online-UX wollen",
    features: { datev: true, cashEinzahlung: true, multiUser: true },
    conditions: { cashFee: "2,50 € pro 5.000 € Schaltereinzahlung Postbank-Filiale" },
  },

  // ============ NEOBANKS / FINTECH ============
  {
    name: "Qonto",
    trustpilotUrl: "https://www.trustpilot.com/review/qonto.com",
    type: "neobank",
    url: "https://qonto.com/de",
    monthlyFee: "9 €/Mon. (Solo Basic, Jahresabo)",
    txnCost: "0,20 € ab der 31. Buchung",
    freeTxns: "30 SEPA inkl. (Echtzeit inkludiert)",
    card: "1× Mastercard Debit + 2 virtuelle Karten, Apple Pay/Google Pay",
    stammkapital: "ja",
    gmbhIG: "ja",
    setupTime: "Video-Ident, oft <24-48h für GmbH i.G.",
    rating: 5,
    pros: [
      "Schnellstes Onboarding für GmbH-i.G.-Sperrkonto am Markt (oft 36h)",
      "DATEV-Schnittstelle inklusive (kein Aufpreis), plus lexoffice/sevDesk/Pennylane",
      "Multi-User mit granularen Rollen (Admin/Buchhalter/Manager)",
      "Belegerfassung mit OCR pro Buchung, GoBD-konforme Archivierung",
      "Trustpilot 4,8/5 (~53k Reviews) – konsistent gelobter Support",
    ],
    cons: [
      "Nur 30 SEPA im Basic – D2C-Brands wachsen schnell raus, Smart 19 €/Standard 39 €",
      "Kein klassisches Bargeldhandling (keine Filiale, kein Münzgeld)",
      "Compliance-Sperren bei ungewohnten Beträgen tagelang möglich",
    ],
    bestFor: "D2C / Online-GmbH mit schnellem Setup & DATEV-StB",
    features: { datev: true, multiUser: true, apiAccess: true },
    conditions: {
      additionalCardCost: "2 €/Mon (virtuell), 5 €/Mon (physisch)",
      foreignSepa: "0,8 % (min. 5 €)",
      foreignSwift: "bis 500 € frei, danach 5 €",
      fxFee: "1,8 % bei Nicht-Standard-Währung",
    },
  },
  {
    name: "Holvi",
    trustpilotUrl: "https://www.trustpilot.com/review/holvi.com",
    type: "neobank",
    url: "https://www.holvi.com/de/",
    monthlyFee: "Flex 0 €/Mon. (0,25 €/SEPA) · Lite 9 €/Mon. (4,50 € Jahresabo) · Pro 15 €/Mon. (9 € Jahresabo)",
    txnCost: "Flex: 0,25 € pro SEPA · Lite mit Limit · Pro unlimited Buchungen",
    freeTxns: "Flex: unbegrenzt (0,25 €/Stk.) · Lite 100 SEPA · Pro unlimited",
    card: "Lite: 1× Mastercard Debit + 1 virtuell · Pro: 3+1",
    stammkapital: "ja",
    gmbhIG: "ja",
    setupTime: "1–3 Tage Video-Ident",
    rating: 4,
    pros: [
      "USt-Voranmeldung integriert – spart Steuerberater-Stunden",
      "Gründungspaket ab 99 € günstig vs. Anwaltskosten",
      "Mehrere IBANs/Unterkonten elegant gelöst",
      "Saubere Rechnungserstellung mit GoBD-konformer Archivierung",
      "Pro 15 €/Mon unlimited Buchungen – top Preis-Leistung",
    ],
    cons: [
      "DATEV nur gegen 3 €/Mon Aufpreis (bei Wettbewerbern inklusive)",
      "Support nur Mo–Fr 9–15 Uhr – knapp für Unternehmer",
      "Vereinzelte Account-Sperren bei Compliance-Reviews ohne Vorwarnung",
    ],
    bestFor: "Solo-/Klein-GmbH mit Rechnungs-Tool-Bedarf, USt-VA Integration",
    features: { datev: true, multiUser: true },
    conditions: {
      cashFee: "Pro: 2 % Einzahlungsgebühr (über Partner)",
      foreignSwift: "1 €/Stück",
      fxFee: "1 %",
    },
  },
  {
    name: "Finom",
    trustpilotUrl: "https://www.trustpilot.com/review/finom.co",
    type: "neobank",
    url: "https://finom.co/de-de/",
    monthlyFee: "Solo 0 € (NICHT für GmbH) · Basic 8,99 €/Mon. (ehem. Start, für GmbH/UG)",
    txnCost: "Solo: Pay-per-use · Basic: 25.000 € SEPA-Volumen frei, dann 0,03 €/Buchung",
    freeTxns: "Basic: bis 25.000 €/Mon. SEPA-Volumen inkl.",
    card: "virtuelle Visa Debit gratis · physische 5 €/Mon.",
    stammkapital: "ja",
    gmbhIG: "ja",
    setupTime: "Video-Ident, ~1–3 Tage",
    rating: 4,
    pros: [
      "Niedrigster Einstieg unter Neos (Solo 0 € für Selbstständige) mit DE-IBAN",
      "Eingebaute Rechnungserstellung – spart Buchhaltungs-Tool",
      "Schnelle App, übersichtliches Banking + Invoicing",
      "Cashback auf Karten-Umsätze (Premium-Tarife)",
      "Multi-Wallet/Unterkonten-Konzept",
    ],
    cons: [
      "Solaris-Migration 2025 hat IBAN-Wechsel + SEPA-Lastschrift-Brüche verursacht",
      "Solo-Tarif ist NICHT für GmbH – \"günstigster Tarif\"-Marketing irreführend",
      "Basic-Tarif (ehem. Start) wurde umbenannt und leicht günstiger, Volumenmodell statt Flat-Fee",
    ],
    bestFor: "Preissensible Online-GmbHs (Start-Tarif, NICHT Solo!)",
    features: { datev: true, multiUser: true },
    conditions: {
      additionalCardCost: "5 €/Mon. physische Karte",
      foreignSepa: "EU-Raum frei",
      fxFee: "1–2 % Markup",
    },
  },
  {
    name: "Kontist",
    trustpilotUrl: "https://www.trustpilot.com/review/kontist.com",
    type: "neobank",
    url: "https://kontist.com",
    monthlyFee: "Free 0 € · Start 11 €/Mon. · Plus 25 €/Mon.",
    txnCost: "Free 5 SEPA · Start 30 · Plus 100",
    freeTxns: "je Tarif",
    card: "Visa Debit physisch + virtuell",
    stammkapital: "nein",
    gmbhIG: "nein",
    setupTime: "Video-Ident",
    rating: 3,
    dealbreaker: "Kontist akzeptiert NUR Freiberufler/Selbstständige – KEINE GmbH/UG-Eröffnung. Solaris-Backend-Probleme 2024+.",
    pros: [
      "Integriertes Steuer-Tool (Echtzeit-Schätzung, USt-VA, BWA in Plus)",
      "DATEV-Modul für Steuerberater (Plus-Tarif)",
      "Saubere App-UX",
    ],
    cons: [
      "**Dealbreaker:** keine GmbH/UG-Konten",
      "Solaris-Bank-Probleme 2024 → viele User zu Qonto migriert",
      "2026 weniger aktiv weiterentwickelt als zur Hochzeit",
    ],
    bestFor: "Solo-Freelancer mit Steuer-Bedarf (NICHT für GmbH)",
    features: { datev: true },
  },
  {
    name: "N26 Business",
    trustpilotUrl: "https://www.trustpilot.com/review/n26.com",
    type: "neobank",
    url: "https://n26.com/de-de/business",
    monthlyFee: "0 € (Standard) / 4,90 € (Smart) / 9,90 € (Go) / 16,90 € (Metal)",
    txnCost: "SEPA-Out unbegrenzt frei",
    freeTxns: "alle Tarife: unbegrenzt SEPA-Echtzeit",
    card: "virtuelle Mastercard (Standard) → physische ab Smart",
    stammkapital: "nein",
    gmbhIG: "nein",
    setupTime: "Video-Ident in 30 Min",
    rating: 3,
    dealbreaker: "N26 Business akzeptiert NUR Freiberufler/Selbstständige – KEINE GmbH/UG-Eröffnung möglich.",
    pros: [
      "Bestes Mobile-Banking-Erlebnis am Markt 2026",
      "Sub-Konten („Spaces“) elegant integriert",
      "30-Min-Onboarding via Video-Ident",
      "0,1 % Cashback auf alle Karten-Käufe (ab Smart)",
    ],
    cons: [
      "**Dealbreaker:** keine GmbH/UG-Konten",
      "Account-Sperren ohne Vorwarnung sind dokumentiertes Muster",
      "Business-Support laut Trustpilot 2026 oft inakzeptabel",
    ],
    bestFor: "Solo-Selbstständige & Freiberufler (NICHT für GmbH)",
    features: { multiCurrency: true },
  },
  {
    name: "Revolut Business",
    trustpilotUrl: "https://www.trustpilot.com/review/revolut.com",
    type: "neobank",
    url: "https://www.revolut.com/de-DE/business/",
    monthlyFee: "Basic 10 €/Mon. · Grow 35 € · Scale 125 €",
    txnCost: "Basic 5 lokale + 5 internationale; Grow 100 lokal + 5 international",
    freeTxns: "stark planabhängig",
    card: "Visa/Mastercard Debit, Apple Pay/Google Pay",
    stammkapital: "limited",
    gmbhIG: "limited",
    setupTime: "Video-Ident, oft <1 Tag",
    rating: 4,
    pros: [
      "Multi-Currency (30+) zu Interbank-Raten werktags",
      "Beste FX-Konditionen unter Neobanken (Wochenend-Markup ~1 %)",
      "Multi-User mit Rollen out-of-the-box",
      "API + Open-Banking-Integrationen sehr stark",
      "Trustpilot 4,7/5 (>376k Reviews) für Hauptaccount",
    ],
    cons: [
      "DE-IBAN seit 2024, aber DACH-Notare manchmal noch skeptisch beim Sperrkonto",
      "Account-Freezes bei großen/ungewöhnlichen Transfers ohne klare Begründung",
      "Wochenend-FX teurer (~1 % Markup)",
    ],
    bestFor: "Zweitkonto für USD/GBP (Meta/TikTok-Ads, US-Sourcing)",
    features: { multiCurrency: true, multiUser: true, apiAccess: true },
    conditions: {
      foreignSwift: "Basic kostenpflichtig, Grow 5 international frei",
      fxFee: "Interbank werktags, ~1 % Wochenend-Markup",
    },
  },
  {
    name: "Vivid Business",
    trustpilotUrl: "https://www.trustpilot.com/review/vivid.money",
    type: "neobank",
    url: "https://vivid.money/de-de/business/",
    monthlyFee: "Free Start 0 € · Basic 8,90 €/Mon. (6,90 € jährlich) · Pro 24,90 €/Mon. (18,90 € jährlich)",
    txnCost: "0,15 € ab dem 101.",
    freeTxns: "100 SEPA inkl. (Basic+)",
    card: "Visa Business Debit · Apple Pay/Google Pay",
    stammkapital: "ja",
    gmbhIG: "ja",
    setupTime: "1–3 Tage Video-Ident",
    rating: 4,
    pros: [
      "Free-Start-Tarif (0 €) macht Einstieg risikolos",
      "Cashback auf Karten-Umsätze (planabhängig)",
      "Sub-Accounts (\"Pockets\") elegant für Budget-Trennung",
      "Multi-Currency Konten",
      "Trustpilot 4,2/5 (deutsche Reviews)",
    ],
    cons: [
      "Solaris-Migration-Erbe (2024/25 Problemfälle)",
      "Kein KfW-Partner",
      "Tarifstruktur komplex (4 Stufen + Add-ons)",
    ],
    bestFor: "Jüngere D2C-Brands mit Sub-Account-Bedarf, Multi-Currency-Setup",
    features: { datev: true, multiUser: true, multiCurrency: true },
  },
  {
    name: "Bunq Business",
    trustpilotUrl: "https://www.trustpilot.com/review/bunq.com",
    type: "neobank",
    url: "https://www.bunq.com/de/business",
    monthlyFee: "Free 0 € (Solo) · Core 7,99 € · Pro 13,99 € · Elite 23,99 €/Mon.",
    txnCost: "Free 0,13 € pro Buchung · Pakete in höheren Tarifen",
    freeTxns: "Pakete je Tarif, bis 25 Sub-Konten in Pro/Elite",
    card: "Mastercard Business, Apple Pay/Google Pay",
    stammkapital: "ja",
    gmbhIG: "limited",
    setupTime: "1–3 Tage",
    rating: 4,
    pros: [
      "Bis zu 25 Sub-Konten in Pro/Elite (mehr als jeder DE-Anbieter)",
      "Mehrere IBANs wählbar (DE-IBAN für GmbH-Eröffnung wichtig!)",
      "EU-weit nutzbar, niederländische Banklizenz (DNB)",
      "Free-Tarif (0 €) für Solo testbar",
      "Karten-Issuance schnell + Apple/Google Pay",
    ],
    cons: [
      "DE-Markt kleiner als Qonto, Support deutsch eingeschränkt",
      "GmbH-i.G.-Akzeptanz nicht garantiert (Notaren manchmal skeptisch)",
      "Kein KfW-Partner",
    ],
    bestFor: "EU-fokussierte GmbHs mit Multi-IBAN/Sub-Konten-Bedarf",
    features: { multiUser: true, multiCurrency: true, apiAccess: true },
  },
  {
    name: "Wise Business",
    trustpilotUrl: "https://www.trustpilot.com/review/wise.com",
    type: "neobank",
    url: "https://wise.com/de/business/",
    monthlyFee: "0 €",
    txnCost: "Pay-per-use, ~0,30 € + FX-Spread",
    freeTxns: "Pay-per-use",
    card: "Wise Debit",
    stammkapital: "nein",
    gmbhIG: "nein",
    setupTime: "Sofort",
    rating: 5,
    pros: ["Beste FX-Raten weltweit", "Multi-Currency-Konten (40+)", "Ideal als Zweitkonto"],
    cons: ["Kein klassisches Sperrkonto für Stammkapital", "Kein DE-IBAN-Hauptkonto"],
    bestFor: "Zusatzkonto für USD/GBP/Imports – nicht Hauptkonto",
  },

  // ============ NACHHALTIGE BANKEN ============
  {
    name: "GLS Bank",
    type: "sustainable",
    url: "https://www.gls.de/firmenkunden/",
    monthlyFee: "ab 8,80 €/Mon.",
    txnCost: "0,15 € pro Buchung",
    freeTxns: "begrenzt",
    card: "Visa Business",
    stammkapital: "ja",
    gmbhIG: "ja",
    setupTime: "2–3 Wochen",
    rating: 4,
    pros: ["Nachhaltige Geldanlage", "Starkes Werteprofil", "Solide Beratung"],
    cons: ["Mitgliedsanteil nötig", "Nicht jedes Geschäftsmodell akzeptiert"],
    bestFor: "GmbHs mit Nachhaltigkeits-Positionierung",
  },
  {
    name: "Triodos Bank",
    type: "sustainable",
    url: "https://www.triodos.de/business",
    monthlyFee: "ab 9 €/Mon.",
    txnCost: "0,15 € pro Buchung",
    freeTxns: "begrenzt",
    card: "Mastercard Business",
    stammkapital: "ja",
    gmbhIG: "ja",
    setupTime: "2–3 Wochen",
    rating: 4,
    pros: ["Strikte ESG-Filter", "Transparente Mittelverwendung"],
    cons: ["Feature-Set kleiner", "Onboarding gründlich (langsam)"],
    bestFor: "Impact-/Sustainability-Brands",
  },
  {
    name: "Tomorrow Business",
    type: "sustainable",
    url: "https://www.tomorrow.one/de-de/business/",
    monthlyFee: "n/a – kein Geschäftskonto",
    txnCost: "n/a",
    freeTxns: "n/a",
    card: "n/a",
    stammkapital: "nein",
    gmbhIG: "nein",
    setupTime: "n/a",
    rating: 3,
    dealbreaker: "Tomorrow bietet ausschließlich Privatkonten an (Now/Change/Zero) – KEIN Geschäftskonto für GmbH/UG/Gewerbe verfügbar.",
    pros: ["Klimapositiv-Marketing nutzbar als Privatbank-Alternative", "Modernes UI für Privatkunden"],
    cons: ["Kein Geschäftskonto – nur Privatkonten (Now, Change, Zero)", "Kein Stammkapital-Sperrkonto möglich", "Für GmbH-Gründung komplett ungeeignet"],
    bestFor: "Junge nachhaltige D2C-Brands",
  },
];

const TYPE_LABEL: Record<BankType, string> = {
  hausbank: "Hausbank",
  online: "Online",
  neobank: "Neobank",
  sustainable: "Nachhaltig",
};

const TYPE_ICON: Record<BankType, typeof Building2> = {
  hausbank: Building2,
  online: Cloud,
  neobank: Zap,
  sustainable: Leaf,
};

const STAMM_BADGE: Record<Bank["stammkapital"], { label: string; cls: string }> = {
  ja: { label: "Stammkapital ✓", cls: "bg-success/10 text-success" },
  limited: { label: "Stammkapital (eingeschränkt)", cls: "bg-warning/10 text-warning-foreground border border-warning/30" },
  nein: { label: "Kein Stammkapital", cls: "bg-destructive/10 text-destructive" },
};

const IG_BADGE: Record<Bank["gmbhIG"], { label: string; cls: string }> = {
  ja: { label: "GmbH i.G. ✓", cls: "bg-success/10 text-success" },
  limited: { label: "i.G. (Einzelfall)", cls: "bg-warning/10 text-warning-foreground border border-warning/30" },
  nein: { label: "Kein i.G.-Konto", cls: "bg-destructive/10 text-destructive" },
};

const FILTERS: { key: "all" | BankType; label: string }[] = [
  { key: "all", label: "Alle (20)" },
  { key: "hausbank", label: "Hausbanken" },
  { key: "neobank", label: "Neobanks" },
  { key: "online", label: "Online" },
  { key: "sustainable", label: "Nachhaltig" },
];

export function BankComparison() {
  const [filter, setFilter] = useState<"all" | BankType>("all");
  const [onlyGmbH, setOnlyGmbH] = useState(false);
  let filtered = filter === "all" ? BANKS : BANKS.filter((b) => b.type === filter);
  if (onlyGmbH) filtered = filtered.filter((b) => b.gmbhIG !== "nein" && b.stammkapital !== "nein");
  filtered = filtered
    .slice()
    .sort((a, b) => Number(!!b.communityPick) - Number(!!a.communityPick));

  return (
    <div className="space-y-4">
      {/* Disclaimer "GmbH in Gründung" */}
      <div className="rounded-xl border-2 border-warning/40 bg-warning/5 p-4 space-y-2">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-warning-foreground mt-0.5 shrink-0" />
          <div className="text-sm space-y-1.5">
            <div className="font-semibold">Wichtig: GmbH in Gründung (i.G.)</div>
            <div className="text-muted-foreground leading-relaxed">
              Zwischen Notartermin und Handelsregister-Eintrag existiert deine GmbH als <em>"GmbH i.G."</em>
              – das Konto musst du auf <strong>"[Firmenname] GmbH i.G."</strong> eröffnen. Erst danach
              überweist du Stammkapital, der Notar bekommt die Bestätigung der Bank, und das HR
              registriert die GmbH. Nach HR-Eintrag wird der Kontoname auf "GmbH" angepasst.
            </div>
            <div className="text-muted-foreground leading-relaxed">
              Reihenfolge: <strong>Notar → Konto eröffnen (i.G.) → Stammkapital einzahlen → Bank-Bestätigung an Notar → HR-Anmeldung.</strong>
              {" "}Nicht jede Bank akzeptiert i.G.-Konten – siehe Badge auf jeder Karte.
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-secondary/30 p-4 space-y-3">
        <div className="text-sm">
          <strong>Was zählt für eine GmbH:</strong> 1) <em>i.G.-fähig?</em> 2) Stammkapital-Sperrkonto möglich?
          3) Kreditbeziehung später (→ Hausbank!), 4) Buchhaltungs-Anbindung (Lexoffice/DATEV),
          5) Multi-Currency wenn USD-Spend.
        </div>
        <div className="text-xs text-muted-foreground">
          <strong>Kosten in zwei Teilen lesen:</strong> Kontoführungsgebühr (monatlich, fix) + Pro-Buchung-Kosten
          (variabel, mit X Buchungen frei). Bei viel SEPA-Volumen kann ein günstigerer Tarif teurer werden,
          wenn die Buchungs-Inklusiv kleiner ist.
        </div>
        <div className="text-[11px] text-muted-foreground">
          Konditionen Stand 2026 – vor Eröffnung Tarif & GmbH-Annahme aktuell prüfen.
          Sterne sind <em>indikative</em> Einschätzung basierend auf Trustpilot/finanzfluss/Marktreviews.
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        {FILTERS.map((f) => (
          <Button
            key={f.key}
            variant={filter === f.key ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </Button>
        ))}
        <div className="ml-auto">
          <Button
            variant={onlyGmbH ? "default" : "outline"}
            size="sm"
            onClick={() => setOnlyGmbH(!onlyGmbH)}
            className={onlyGmbH ? "bg-success hover:bg-success/90 text-success-foreground" : ""}
          >
            {onlyGmbH ? "✓ " : ""}Nur GmbH-fähig
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {filtered.map((b) => (
          <BankCard key={b.name} b={b} />
        ))}
      </div>
    </div>
  );
}

function BankCard({ b }: { b: Bank }) {
  const Icon = TYPE_ICON[b.type];
  const stamm = STAMM_BADGE[b.stammkapital];
  const ig = IG_BADGE[b.gmbhIG];

  return (
    <div className={`rounded-xl border bg-card p-4 space-y-3 transition-colors ${
      b.dealbreaker ? "border-destructive/40 opacity-80" :
      b.communityPick ? "border-accent-blue ring-1 ring-accent-blue/30" :
      "border-border hover:border-accent-blue/40"
    }`}>
      {b.dealbreaker && (
        <div className="-mx-4 -mt-4 px-4 py-1.5 bg-destructive text-destructive-foreground text-[10px] font-bold uppercase tracking-wider rounded-t-xl flex items-center gap-1.5">
          <AlertTriangle className="h-3 w-3" /> Nicht für GmbH-Gründung
        </div>
      )}
      {b.communityPick && !b.dealbreaker && (
        <div className="-mx-4 -mt-4 px-4 py-1.5 bg-accent-blue text-accent-blue-foreground text-[10px] font-bold uppercase tracking-wider rounded-t-xl flex items-center gap-1.5">
          <Sparkles className="h-3 w-3" /> Community-Tipp (vorerst)
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2 min-w-0">
          <Icon className="h-4 w-4 text-accent-blue mt-0.5 shrink-0" />
          <div className="min-w-0">
            <div className="font-semibold leading-tight">{b.name}</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
              {TYPE_LABEL[b.type]}
            </div>
          </div>
        </div>
        <a
          href={b.trustpilotUrl ?? `https://www.trustpilot.com/search?query=${encodeURIComponent(b.name)}`}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center gap-0.5 shrink-0 hover:opacity-80"
          title="Auf Trustpilot ansehen"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < b.rating ? "fill-warning text-warning" : "text-muted-foreground/30"}`}
            />
          ))}
        </a>
      </div>

      {/* Kosten-Block: Kontoführung + Pro Buchung getrennt */}
      <div className="rounded-lg bg-secondary/50 p-2.5 space-y-1 text-xs">
        <div className="flex justify-between gap-2">
          <span className="text-muted-foreground">Kontoführung</span>
          <span className="font-medium tabular-nums text-right">{b.monthlyFee}</span>
        </div>
        <div className="flex justify-between gap-2 border-t border-border pt-1">
          <span className="text-muted-foreground">Pro Buchung</span>
          <span className="font-medium tabular-nums text-right">{b.txnCost}</span>
        </div>
        {b.freeTxns && (
          <div className="text-[10px] text-muted-foreground italic">{b.freeTxns}</div>
        )}
      </div>

      {b.dealbreaker && (
        <div className="rounded-lg bg-destructive/5 border border-destructive/30 p-2.5 text-xs text-destructive">
          <strong>⚠ Achtung:</strong> {b.dealbreaker}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 text-[10px]">
        <span className={`rounded-full px-2 py-0.5 ${ig.cls}`}>{ig.label}</span>
        <span className={`rounded-full px-2 py-0.5 ${stamm.cls}`}>{stamm.label}</span>
        {b.setupTime && (
          <span className="rounded-full px-2 py-0.5 bg-secondary text-muted-foreground">⏱ {b.setupTime}</span>
        )}
        {b.features?.datev && <span className="rounded-full px-2 py-0.5 bg-accent-blue/10 text-accent-blue">📊 DATEV</span>}
        {b.features?.kfwPartner && <span className="rounded-full px-2 py-0.5 bg-accent-blue/10 text-accent-blue">🏦 KfW</span>}
        {b.features?.cashEinzahlung && <span className="rounded-full px-2 py-0.5 bg-accent-blue/10 text-accent-blue">💵 Cash</span>}
        {b.features?.multiUser && <span className="rounded-full px-2 py-0.5 bg-accent-blue/10 text-accent-blue">👥 Multi-User</span>}
        {b.features?.multiCurrency && <span className="rounded-full px-2 py-0.5 bg-accent-blue/10 text-accent-blue">💱 Multi-FX</span>}
        {b.features?.apiAccess && <span className="rounded-full px-2 py-0.5 bg-accent-blue/10 text-accent-blue">⚡ API</span>}
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <div className="font-semibold text-success mb-1">+ Stärken</div>
          <ul className="space-y-0.5 text-muted-foreground">
            {b.pros.map((p, i) => <li key={i}>· {p}</li>)}
          </ul>
        </div>
        <div>
          <div className="font-semibold text-destructive mb-1">– Schwächen</div>
          <ul className="space-y-0.5 text-muted-foreground">
            {b.cons.map((c, i) => <li key={i}>· {c}</li>)}
          </ul>
        </div>
      </div>

      {b.conditions && (Object.values(b.conditions).filter(Boolean).length > 0) && (
        <details className="rounded-lg bg-secondary/40 border border-border p-2 text-[10px]">
          <summary className="cursor-pointer font-semibold text-muted-foreground">Konditionen im Detail</summary>
          <div className="mt-2 space-y-1 text-muted-foreground">
            {b.conditions.additionalCardCost && <div><strong>Zusatzkarten:</strong> {b.conditions.additionalCardCost}</div>}
            {b.conditions.cashFee && <div><strong>Bargeld:</strong> {b.conditions.cashFee}</div>}
            {b.conditions.foreignSepa && <div><strong>SEPA-Ausland:</strong> {b.conditions.foreignSepa}</div>}
            {b.conditions.foreignSwift && <div><strong>SWIFT:</strong> {b.conditions.foreignSwift}</div>}
            {b.conditions.fxFee && <div><strong>FX-Markup:</strong> {b.conditions.fxFee}</div>}
          </div>
        </details>
      )}

      <div className="text-[11px] text-muted-foreground italic border-t border-border pt-2">
        Best for: {b.bestFor}
      </div>

      <a href={b.url} target="_blank" rel="noreferrer">
        <Button variant={b.communityPick ? "default" : "outline"} size="sm" className="w-full">
          Zur Bank <ExternalLink className="h-3 w-3 ml-1" />
        </Button>
      </a>
    </div>
  );
}
