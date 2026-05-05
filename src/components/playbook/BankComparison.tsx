import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Building2, Cloud, ExternalLink, Leaf, Star, Zap } from "lucide-react";

type BankType = "hausbank" | "neobank" | "online" | "sustainable";

interface Bank {
  name: string;
  type: BankType;
  url: string;
  /** Monatsgebühr Einsteiger-Tarif (Stand 2026, vor Eröffnung verifizieren) */
  fee: string;
  freeTxns?: string;
  card?: string;
  /** Stammkapital-Einzahlung für GmbH-Gründung */
  stammkapital: "ja" | "limited" | "nein";
  setupTime?: string;
  /** Indikative Einschätzung 1–5 basierend auf Trustpilot/finanzfluss/Marktreviews */
  rating: number;
  pros: string[];
  cons: string[];
  bestFor: string;
}

const BANKS: Bank[] = [
  // ============ HAUSBANKEN (Filialnetz, Kreditbeziehung) ============
  {
    name: "Deutsche Bank Business",
    type: "hausbank",
    url: "https://www.deutsche-bank.de/gk.html",
    fee: "ab 12,90 €/Mon.",
    freeTxns: "Pakete je nach Tarif",
    card: "Mastercard Business",
    stammkapital: "ja",
    setupTime: "1–3 Wochen (Filialtermin)",
    rating: 3,
    pros: ["Größtes Filialnetz DE", "Solides Kredit-Geschäft für GmbHs", "Internationale Reichweite"],
    cons: ["Teuer im Einsteiger-Tarif", "Filialtermin nötig", "Schwerfällige Prozesse"],
    bestFor: "GmbHs mit Kreditbedarf & Auslandsthemen",
  },
  {
    name: "Commerzbank Business",
    type: "hausbank",
    url: "https://www.commerzbank.de/firmenkunden/",
    fee: "ab 12,90 €/Mon.",
    freeTxns: "10 Buchungen, danach 0,15 €",
    card: "Visa Business Debit",
    stammkapital: "ja",
    setupTime: "1–2 Wochen",
    rating: 3,
    pros: ["Mittelstands-DNA, KfW-Partner", "Filialnetz", "Solide Beratung für Wachstumskredite"],
    cons: ["Hohe Buchungsgebühren ab 11.", "App eher altbacken"],
    bestFor: "Klassischer Mittelstand mit Lokalbeziehung",
  },
  {
    name: "Sparkasse (regional)",
    type: "hausbank",
    url: "https://www.sparkasse.de/firmenkunden",
    fee: "5–15 €/Mon. (regional)",
    freeTxns: "regional unterschiedlich",
    card: "Sparkassen-Card / Mastercard",
    stammkapital: "ja",
    setupTime: "1–3 Wochen",
    rating: 3,
    pros: ["Lokale Verankerung & Kreditkultur", "Cash-Einzahlung am Schalter", "Top-Hausbank für KMU"],
    cons: ["Konditionen variieren stark je Sparkasse", "Online-Banking je nach Region veraltet"],
    bestFor: "GmbHs mit lokalem Schwerpunkt & Cash-Geschäft",
  },
  {
    name: "Volksbank / Raiffeisenbank",
    type: "hausbank",
    url: "https://www.vr.de/firmenkunden",
    fee: "8–14 €/Mon. (regional)",
    freeTxns: "Pakete regional",
    card: "VR-BankCard",
    stammkapital: "ja",
    setupTime: "1–3 Wochen",
    rating: 3,
    pros: ["Genossenschaftlich, persönlich", "Starkes Mittelstandsgeschäft", "Förderkredite oft fair"],
    cons: ["Digitalisierung uneinheitlich", "Konditionen je Bank stark unterschiedlich"],
    bestFor: "Gründer mit lokalem Bezug & Wachstumsplänen",
  },
  {
    name: "Postbank Business",
    type: "hausbank",
    url: "https://www.postbank.de/firmenkunden/produkte/konten/business-giro.html",
    fee: "ab 11,90 €/Mon.",
    freeTxns: "10/Mon. inkl.",
    card: "Visa Business Debit",
    stammkapital: "ja",
    setupTime: "1–2 Wochen",
    rating: 3,
    pros: ["Cash-Einzahlung in Postfilialen DE-weit", "Deutsche-Bank-Tochter (stabile Hausbank)"],
    cons: ["Wenig digital", "Service-Erfahrung gemischt"],
    bestFor: "Geschäfte mit viel Bargeld-Handling",
  },
  {
    name: "HypoVereinsbank (UniCredit)",
    type: "hausbank",
    url: "https://www.hypovereinsbank.de/hvb/firmenkunden",
    fee: "ab 9,90 €/Mon.",
    freeTxns: "Pakete je Tarif",
    card: "Mastercard Business",
    stammkapital: "ja",
    setupTime: "2–3 Wochen",
    rating: 3,
    pros: ["Italienisch-deutscher Konzern, EU-stark", "Solide für mittelständische GmbHs"],
    cons: ["Weniger Filialen außerhalb Bayern/NRW"],
    bestFor: "GmbHs mit Italien-/Südeuropa-Fokus",
  },
  {
    name: "Targobank Business",
    type: "hausbank",
    url: "https://www.targobank.de/de/geschaeftskunden/",
    fee: "ab 9,95 €/Mon.",
    freeTxns: "begrenzt",
    card: "Visa Business",
    stammkapital: "ja",
    setupTime: "2–3 Wochen",
    rating: 3,
    pros: ["Crédit-Mutuel-Konzern", "Einfache Konditionen", "Filialen in DE"],
    cons: ["Online-Banking funktional, nicht modern"],
    bestFor: "Solider Allrounder",
  },

  // ============ DIREKTBANKEN / ONLINE-HYBRID ============
  {
    name: "DKB Business",
    type: "online",
    url: "https://www.dkb.de/business/",
    fee: "ab 0–9,75 €/Mon.",
    freeTxns: "Beleglose Buchungen kostenlos",
    card: "Visa Business Debit",
    stammkapital: "ja",
    setupTime: "1–2 Wochen",
    rating: 4,
    pros: ["Sehr günstig", "Sauberes Online-Banking", "Kostenlose Karte (in Tarif)"],
    cons: ["Keine Filiale", "Onboarding manchmal hakelig (Postident)"],
    bestFor: "Digitale GmbHs ohne Cash-Geschäft",
  },
  {
    name: "Fyrst",
    type: "online",
    url: "https://www.fyrst.de/",
    fee: "0 € (Base) / 10 € (Complete)",
    freeTxns: "50/Mon. (Complete)",
    card: "Visa Debit",
    stammkapital: "ja",
    setupTime: "1–2 Wochen",
    rating: 4,
    pros: ["Postbank/Deutsche-Bank-Tochter mit DE-IBAN", "Free-Tier okay für Solo-GmbH", "Cash via Postbank-Filialen"],
    cons: ["App weniger feature-reich als Neos", "Limit auf Buchungen"],
    bestFor: "Bridge zwischen Hausbank und Neo",
  },

  // ============ NEOBANKS / FINTECH ============
  {
    name: "Qonto",
    type: "neobank",
    url: "https://qonto.com/de",
    fee: "ab 9 €/Mon. (Solo Basic)",
    freeTxns: "30 SEPA inkl.",
    card: "Mastercard Business",
    stammkapital: "ja",
    setupTime: "1–3 Tage",
    rating: 5,
    pros: ["Schneller Onboarding-Prozess", "Top Lexoffice/DATEV-Anbindung", "Klar führend bei DE-GmbH-Gründungen"],
    cons: ["Limit auf SEPA-Buchungen (Mehrkosten)", "Kein Bargeld-Service"],
    bestFor: "D2C / Online-GmbH mit schnellem Setup",
  },
  {
    name: "Holvi",
    type: "neobank",
    url: "https://www.holvi.com/de/",
    fee: "ab 9 €/Mon.",
    freeTxns: "begrenzt",
    card: "Mastercard Business Debit",
    stammkapital: "ja",
    setupTime: "1–5 Tage",
    rating: 4,
    pros: ["Eingebaute Buchhaltung & Rechnungstool", "Solo-/Klein-GmbH-Fokus"],
    cons: ["Reviews wegen Account-Sperren gemischt", "Weniger Buchungs-Inklusivvolumen"],
    bestFor: "Solo-GmbH mit eingebautem Rechnungs-Tool",
  },
  {
    name: "Finom",
    type: "neobank",
    url: "https://finom.co/de-de/",
    fee: "0 € (Solo) / ab 9 €/Mon.",
    freeTxns: "ab 50 SEPA inkl.",
    card: "Mastercard Business Debit",
    stammkapital: "ja",
    setupTime: "1–2 Tage",
    rating: 4,
    pros: ["Free-Tier verfügbar", "Cashback auf Karten-Umsätze", "Schnelles Onboarding"],
    cons: ["Junges Brand in DE", "Support gelegentlich langsam"],
    bestFor: "Preissensible Online-GmbHs",
  },
  {
    name: "N26 Business",
    type: "neobank",
    url: "https://n26.com/de-de/business",
    fee: "0 € (Standard) / 4,90 € (Smart)",
    freeTxns: "unbegrenzt SEPA",
    card: "Mastercard Business Debit",
    stammkapital: "limited",
    setupTime: "1–3 Tage",
    rating: 3,
    pros: ["Sehr günstig & schnell", "App-First UX top"],
    cons: ["GmbH-Konto-Eröffnung historisch oft eingeschränkt", "Account-Sperren-Stories in Reviews"],
    bestFor: "Solo-Selbstständige (für GmbH zweite Wahl)",
  },
  {
    name: "Revolut Business",
    type: "neobank",
    url: "https://www.revolut.com/de-DE/business/",
    fee: "0 € (Basic) / ab 19 €/Mon.",
    freeTxns: "5 SEPA-Out (Basic)",
    card: "Mastercard / Visa",
    stammkapital: "limited",
    setupTime: "1–2 Tage",
    rating: 4,
    pros: ["Multi-Currency (USD/GBP) für Ads & Imports", "Schnelle Karten-Issuance"],
    cons: ["LT-IBAN, manche DE-Stellen mögen das nicht", "Stammkapital-Einzahlung GmbH manchmal abgelehnt"],
    bestFor: "GmbHs mit USD/GBP-Bedarf (Meta/TikTok-Ads, US-Sourcing)",
  },
  {
    name: "Vivid Business",
    type: "neobank",
    url: "https://vivid.money/de-de/business/",
    fee: "ab 9,90 €/Mon.",
    freeTxns: "100 SEPA inkl.",
    card: "Visa Business Debit",
    stammkapital: "ja",
    setupTime: "1–3 Tage",
    rating: 4,
    pros: ["Schickes UI", "Sub-Accounts für Budgetierung", "Investment-Features"],
    cons: ["Etwas jünger im Markt", "Tarifstruktur komplex"],
    bestFor: "Jüngere D2C-Brands mit Sub-Account-Bedarf",
  },
  {
    name: "Bunq Business",
    type: "neobank",
    url: "https://www.bunq.com/de/business",
    fee: "ab 9,99 €/Mon.",
    freeTxns: "Pakete",
    card: "Mastercard Business",
    stammkapital: "ja",
    setupTime: "1–3 Tage",
    rating: 4,
    pros: ["Multi-Banking & Mehr-IBAN", "EU-weit gut nutzbar"],
    cons: ["Support manchmal träge", "DE-Markt kleiner als bei Qonto"],
    bestFor: "EU-fokussierte GmbHs",
  },
  {
    name: "Wise Business",
    type: "neobank",
    url: "https://wise.com/de/business/",
    fee: "0 € + Transaktionsgebühren",
    freeTxns: "Pay-per-use",
    card: "Wise Debit",
    stammkapital: "nein",
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
    fee: "ab 8,80 €/Mon.",
    freeTxns: "begrenzt",
    card: "Visa Business",
    stammkapital: "ja",
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
    fee: "ab 9 €/Mon.",
    freeTxns: "begrenzt",
    card: "Mastercard Business",
    stammkapital: "ja",
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
    fee: "ab 9 €/Mon.",
    freeTxns: "Pakete",
    card: "Visa Business Debit",
    stammkapital: "ja",
    setupTime: "1–3 Tage",
    rating: 4,
    pros: ["Klimapositiv-Marketing nutzbar", "Modernes UI", "Schnelles Onboarding"],
    cons: ["Junger Anbieter mit Solaris-Backend", "Limitierte Buchungspakete"],
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

const FILTERS: { key: "all" | BankType; label: string }[] = [
  { key: "all", label: "Alle (20)" },
  { key: "hausbank", label: "Hausbanken" },
  { key: "neobank", label: "Neobanks" },
  { key: "online", label: "Online" },
  { key: "sustainable", label: "Nachhaltig" },
];

export function BankComparison() {
  const [filter, setFilter] = useState<"all" | BankType>("all");
  const filtered = filter === "all" ? BANKS : BANKS.filter((b) => b.type === filter);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-secondary/30 p-4 space-y-3">
        <div className="text-sm">
          <strong>Was zählt für eine GmbH:</strong> 1) Akzeptiert die Bank Stammkapital-Einzahlung
          (Sperrkonto vor HR-Eintrag), 2) Kreditbeziehung für später (→ Hausbank!),
          3) Buchhaltungs-Anbindung (Lexoffice/DATEV), 4) Multi-Currency wenn USD-Spend.
        </div>
        <div className="text-xs text-muted-foreground">
          Konditionen Stand 2026 – vor Eröffnung Tarif & GmbH-Annahme aktuell prüfen.
          Sterne sind <em>indikative</em> Einschätzung basierend auf Trustpilot/finanzfluss/Marktreviews.
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
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

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3 hover:border-accent-blue/40 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2 min-w-0">
          <Icon className="h-4 w-4 text-accent-blue mt-0.5 shrink-0" />
          <div className="min-w-0">
            <div className="font-semibold leading-tight">{b.name}</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
              {TYPE_LABEL[b.type]} · {b.fee}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < b.rating ? "fill-warning text-warning" : "text-muted-foreground/30"}`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 text-[10px]">
        <span className={`rounded-full px-2 py-0.5 ${stamm.cls}`}>{stamm.label}</span>
        {b.setupTime && (
          <span className="rounded-full px-2 py-0.5 bg-secondary text-muted-foreground">⏱ {b.setupTime}</span>
        )}
        {b.freeTxns && (
          <span className="rounded-full px-2 py-0.5 bg-secondary text-muted-foreground">{b.freeTxns}</span>
        )}
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

      <div className="text-[11px] text-muted-foreground italic border-t border-border pt-2">
        Best for: {b.bestFor}
      </div>

      <a href={b.url} target="_blank" rel="noreferrer">
        <Button variant="outline" size="sm" className="w-full">
          Zur Bank <ExternalLink className="h-3 w-3 ml-1" />
        </Button>
      </a>
    </div>
  );
}
