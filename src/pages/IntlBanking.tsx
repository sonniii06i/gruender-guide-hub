import { useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { ExternalLink, CheckCircle2, XCircle, AlertCircle, Globe, Banknote } from "lucide-react";

type Region = "us" | "hk";

type Bank = {
  slug: string;
  name: string;
  region: Region;
  emoji: string;
  monthlyFee: string;
  setupFee: string;
  /** Akzeptiert non-Resident Founder? */
  nonResident: "ja" | "schwierig" | "vor-ort-pflicht";
  /** Bestes Use-Case. */
  bestFor: string;
  pros: string[];
  cons: string[];
  features: {
    multiCurrency: boolean;
    achWire: boolean;
    quickbooksXero: boolean;
    debitCard: boolean;
    apiAccess: boolean;
    crypto: boolean;
  };
  setupRequirements: string[];
  url: string;
};

const BANKS: Bank[] = [
  // ============ US BANKS ============
  {
    slug: "mercury",
    name: "Mercury",
    region: "us",
    emoji: "🪐",
    monthlyFee: "$0",
    setupFee: "$0",
    nonResident: "ja",
    bestFor: "Tech-/Online-Brands · 200+ akzeptierte Länder · keine versteckten Fees",
    pros: [
      "**100 % remote** — kein US-Besuch nötig",
      "Akzeptiert non-Resident Founder von 200+ Ländern (auch DACH-Solos)",
      "Sehr saubere App + Web-UI",
      "API-Zugang inklusive (Webhooks, Treasury)",
      "Mercury Treasury: Yield ~5 % auf idle Cash (FDIC-versichert via Partner)",
      "Wires + ACH inklusive, keine Fees für Standard",
    ],
    cons: [
      "Lehnt manche Branchen ab: Crypto, Adult, Cannabis, Money-Transmission",
      "Bei Verdachts-Activity: harte Account-Reviews (manche User berichteten von Sperren)",
      "Kein klassisches Banking (Mercury ist Plattform mit Partnerbank — Choice Financial Group / Evolve)",
    ],
    features: {
      multiCurrency: false,
      achWire: true,
      quickbooksXero: true,
      debitCard: true,
      apiAccess: true,
      crypto: false,
    },
    setupRequirements: [
      "EIN-Letter vom IRS (CP575)",
      "Articles of Organization (Stamped PDF)",
      "Operating Agreement",
      "Pass des wirtschaftlich Berechtigten",
      "US-Geschäftsadresse (Registered Agent reicht)",
      "Nachweis der Geschäftstätigkeit (Pitch Deck, Vertrag, Website)",
    ],
    url: "https://mercury.com",
  },
  {
    slug: "wise-business",
    name: "Wise Business",
    region: "us",
    emoji: "💸",
    monthlyFee: "$0",
    setupFee: "$31 einmalig",
    nonResident: "ja",
    bestFor: "Multi-Currency-Geschäft · DACH-Founder mit USD/GBP/EUR-Mix",
    pros: [
      "**Multi-Currency** — Konten in USD, GBP, EUR, AUD und 50+ Währungen",
      "Niedrigste FX-Kosten (Mid-Market-Rate + 0,3–0,5 % Fee)",
      "ACH-Routing + USD-IBAN",
      "Empfangs-Limits sehr hoch",
      "Akzeptiert DACH-Founder direkt",
    ],
    cons: [
      "Kein klassisches US-Bank-Konto (Geld liegt bei Wise, nicht bei US-Bank)",
      "Manche US-Vendors verlangen 'echtes' US-Konto — Wise reicht oft, nicht immer",
      "Keine Kreditkarte (nur Debit)",
      "Yield auf Cash: 0 % (Mercury hat ~5 %)",
    ],
    features: {
      multiCurrency: true,
      achWire: true,
      quickbooksXero: true,
      debitCard: true,
      apiAccess: true,
      crypto: false,
    },
    setupRequirements: [
      "Personalausweis + Steuer-ID",
      "Geschäftsadresse",
      "EIN (für USD-Konto-Features)",
      "Geschäftsmodell-Beschreibung",
    ],
    url: "https://wise.com/business",
  },
  {
    slug: "relay",
    name: "Relay (RelayFi)",
    region: "us",
    emoji: "🔗",
    monthlyFee: "$0 (Standard) · $30 (Pro)",
    setupFee: "$0",
    nonResident: "ja",
    bestFor: "Buchhaltungs-Integration · QuickBooks/Xero-User · Multi-Account-Setup",
    pros: [
      "**Beste QuickBooks/Xero-Integration** der US-Banks",
      "Bis 20 Sub-Accounts pro Business (Profit-First-Buchhaltung)",
      "FDIC-versichert via Partnerbank (Thread Bank)",
      "Wires + ACH inklusive",
      "API + Zapier-Integrationen",
    ],
    cons: [
      "Kein Treasury/Yield-Programm",
      "Weniger bekannt als Mercury — länger Onboarding-Zeit",
      "International-Wires aufwändiger",
    ],
    features: {
      multiCurrency: false,
      achWire: true,
      quickbooksXero: true,
      debitCard: true,
      apiAccess: true,
      crypto: false,
    },
    setupRequirements: [
      "EIN-Letter",
      "Articles of Organization",
      "Operating Agreement",
      "Pass + US-Adresse (Registered Agent)",
    ],
    url: "https://relayfi.com",
  },
  {
    slug: "brex",
    name: "Brex",
    region: "us",
    emoji: "🟧",
    monthlyFee: "$0",
    setupFee: "$0",
    nonResident: "schwierig",
    bestFor: "VC-finanzierte Startups · gute Boni für Tech-Spending",
    pros: [
      "Kreditkarte (kein Cash-Vorab nötig) — gut für Werbe-Spend etc.",
      "Cashback + Reward-Punkte für Tech-Vendor-Spending (AWS, GCP)",
      "Beste Expense-Management-Tools im US-Banking",
      "Funding-Friendly (akzeptiert VC-Term-Sheets als Sicherheit)",
    ],
    cons: [
      "**Hat Solo-Founder + Bootstrap typisch abgelehnt** seit 2022",
      "Fokus auf Series-A+ Companies + > $50k Konto-Balance",
      "Non-Resident-Founder oft schwierig",
      "International-Wires kompliziert",
    ],
    features: {
      multiCurrency: false,
      achWire: true,
      quickbooksXero: true,
      debitCard: true,
      apiAccess: true,
      crypto: false,
    },
    setupRequirements: [
      "Wie Mercury + zusätzlich oft VC-Funding-Beweis",
      "Min. Konto-Balance ~$50k empfohlen",
    ],
    url: "https://brex.com",
  },

  // ============ HK BANKS ============
  {
    slug: "statrys",
    name: "Statrys",
    region: "hk",
    emoji: "📜",
    monthlyFee: "$9 USD",
    setupFee: "$0",
    nonResident: "ja",
    bestFor: "HK-Limited-Setups · 100 % remote · oft mit Company-Secretary-Paket",
    pros: [
      "**Speziell für non-Resident HK-Firmen** designed",
      "100 % remote-Onboarding (kein HK-Besuch)",
      "Multi-Currency: HKD, USD, EUR, GBP, RMB",
      "Company-Secretary + Banking als Paket möglich",
      "Sehr schneller Approval (oft 5–10 Werktage)",
    ],
    cons: [
      "Bedingt günstig — $9/Mon Konto-Fee (anders als Wise/Mercury)",
      "Kleinerer Provider — bei großen Volumen oft an Limits stoßen",
    ],
    features: {
      multiCurrency: true,
      achWire: true,
      quickbooksXero: true,
      debitCard: true,
      apiAccess: false,
      crypto: false,
    },
    setupRequirements: [
      "Certificate of Incorporation HK",
      "Business Registration Certificate",
      "Articles of Association",
      "Pass des Directors",
      "Geschäftsmodell-Beschreibung",
    ],
    url: "https://statrys.com",
  },
  {
    slug: "airwallex",
    name: "Airwallex",
    region: "hk",
    emoji: "✈️",
    monthlyFee: "$0",
    setupFee: "$0",
    nonResident: "ja",
    bestFor: "Wachstums-Startups · API-Integration · Multi-Currency-Treasury",
    pros: [
      "**Globaler Multi-Currency-Player** — HK, AU, UK, US-Konten unter einem Dach",
      "Beste API in Asien-Banking",
      "Sehr niedrige FX-Kosten",
      "Cards + Expense-Management",
      "Wachsendes Funding-Paket für Startups",
    ],
    cons: [
      "Manche Branchen abgelehnt (regulatorisch konservativ)",
      "Mindestens HKD 50.000 Umsatz für volle Features empfohlen",
    ],
    features: {
      multiCurrency: true,
      achWire: true,
      quickbooksXero: true,
      debitCard: true,
      apiAccess: true,
      crypto: false,
    },
    setupRequirements: ["HK-Limited-Dokumente", "Pass + Adresse Director", "Geschäftsmodell + Umsatz-Estimate"],
    url: "https://airwallex.com",
  },
  {
    slug: "currenxie",
    name: "Currenxie",
    region: "hk",
    emoji: "💱",
    monthlyFee: "$0",
    setupFee: "$0",
    nonResident: "ja",
    bestFor: "International Trade · FX-fokussiert · Asien-Geschäft",
    pros: [
      "FX-Spreads sehr niedrig",
      "Multi-Currency Wallets (USD, HKD, CNY, etc.)",
      "Schnelles Onboarding für Trade-Companies",
      "Prepaid-Karten in vielen Währungen",
    ],
    cons: [
      "Eher Trade-orientiert — weniger Tech-Startup-Features",
      "API begrenzt",
      "Kleinerer Player als Airwallex / Wise",
    ],
    features: {
      multiCurrency: true,
      achWire: true,
      quickbooksXero: false,
      debitCard: true,
      apiAccess: false,
      crypto: false,
    },
    setupRequirements: ["HK-Firmendokumente", "Pass Director", "Geschäftsmodell-Beschreibung"],
    url: "https://currenxie.com",
  },
  {
    slug: "hsbc-hk",
    name: "HSBC Hong Kong",
    region: "hk",
    emoji: "🏦",
    monthlyFee: "ab 200 HKD",
    setupFee: "0 HKD",
    nonResident: "vor-ort-pflicht",
    bestFor: "Etablierte Companies mit großem Volumen + Chinageschäft",
    pros: [
      "**Echte Großbank** — höchstes Vertrauen bei Vendoren",
      "Globaler HSBC-Verbund (Konten EU + Asien gespiegelt)",
      "Trade-Finance-Lösungen",
    ],
    cons: [
      "**Persönliche Vorstellung in HK Pflicht** — nicht 100 % remote möglich",
      "Strenge KYC-Prozesse seit 2018 (Cyprus-Files-Era)",
      "Mindest-Volumen-Erwartung",
      "Höhere Konto-Fees",
    ],
    features: {
      multiCurrency: true,
      achWire: true,
      quickbooksXero: false,
      debitCard: true,
      apiAccess: false,
      crypto: false,
    },
    setupRequirements: [
      "Persönliche Vorstellung HK-Filiale",
      "Komplette Firmen-Dokumente",
      "Geschäftsmodell + Geschäftsplan",
      "Mind. 1 Jahr Geschäftsaktivität typisch erwartet",
    ],
    url: "https://www.hsbc.com.hk",
  },
];

const FEATURE_LABELS: Record<keyof Bank["features"], string> = {
  multiCurrency: "Multi-Currency",
  achWire: "ACH/SWIFT-Wires",
  quickbooksXero: "QuickBooks/Xero",
  debitCard: "Debit-Karte",
  apiAccess: "API-Zugang",
  crypto: "Crypto-OnRamp",
};

const NON_RESIDENT_BADGE: Record<Bank["nonResident"], { label: string; color: string }> = {
  ja: { label: "✓ 100 % remote", color: "bg-emerald-500/10 text-emerald-700" },
  schwierig: { label: "⚠ Schwierig", color: "bg-amber-500/10 text-amber-700" },
  "vor-ort-pflicht": { label: "✗ Vor-Ort-Termin", color: "bg-red-500/10 text-red-700" },
};

const IntlBanking = () => {
  const [region, setRegion] = useState<Region | "all">("all");

  const filtered = region === "all" ? BANKS : BANKS.filter((b) => b.region === region);

  return (
    <CockpitShell
      eyebrow="International Banking"
      title="US + HK Bankkonto-Vergleich für non-Resident Founder"
      subtitle="8 Anbieter (Mercury, Wise, Relay, Brex · Statrys, Airwallex, Currenxie, HSBC) im Detail. Mit Setup-Anforderungen, Pros/Cons, Best-For-Empfehlung."
    >
      {/* Region Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setRegion("all")}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
            region === "all"
              ? "bg-accent-blue text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          Alle ({BANKS.length})
        </button>
        <button
          onClick={() => setRegion("us")}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors inline-flex items-center gap-1 ${
            region === "us"
              ? "bg-accent-blue text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          🇺🇸 USA ({BANKS.filter((b) => b.region === "us").length})
        </button>
        <button
          onClick={() => setRegion("hk")}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors inline-flex items-center gap-1 ${
            region === "hk"
              ? "bg-accent-blue text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          🇭🇰 Hong Kong ({BANKS.filter((b) => b.region === "hk").length})
        </button>
      </div>

      {/* Compare-Table */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6 overflow-x-auto">
        <h3 className="font-bold text-sm mb-3">Quick-Compare</h3>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 pr-2">Bank</th>
              <th className="text-left py-2 px-2">Region</th>
              <th className="text-left py-2 px-2">Lfd. Kosten</th>
              <th className="text-left py-2 px-2">Setup</th>
              <th className="text-left py-2 px-2">Non-Resident</th>
              <th className="text-left py-2 pl-2">Best für</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => {
              const badge = NON_RESIDENT_BADGE[b.nonResident];
              return (
                <tr key={b.slug} className="border-b border-border last:border-0">
                  <td className="py-2 pr-2">
                    <span className="mr-1.5">{b.emoji}</span>
                    <span className="font-semibold">{b.name}</span>
                  </td>
                  <td className="py-2 px-2 text-muted-foreground">
                    {b.region === "us" ? "🇺🇸 USA" : "🇭🇰 HK"}
                  </td>
                  <td className="py-2 px-2 font-mono text-[10px]">{b.monthlyFee}</td>
                  <td className="py-2 px-2 font-mono text-[10px]">{b.setupFee}</td>
                  <td className="py-2 px-2">
                    <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${badge.color}`}>
                      {badge.label}
                    </span>
                  </td>
                  <td className="py-2 pl-2 text-muted-foreground text-[10px]">{b.bestFor.split("·")[0]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Detail-Cards */}
      <div className="space-y-3 mb-6">
        {filtered.map((b) => {
          const badge = NON_RESIDENT_BADGE[b.nonResident];
          return (
            <div key={b.slug} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{b.emoji}</div>
                  <div>
                    <h3 className="font-bold text-base">{b.name}</h3>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      <span className="rounded-full bg-secondary text-muted-foreground px-2 py-0.5 text-[10px]">
                        {b.region === "us" ? "🇺🇸 USA" : "🇭🇰 Hong Kong"}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${badge.color}`}>
                        {badge.label}
                      </span>
                      <span className="rounded-full bg-emerald-500/10 text-emerald-700 px-2 py-0.5 text-[10px] font-semibold">
                        {b.monthlyFee} laufend
                      </span>
                    </div>
                  </div>
                </div>
                <a
                  href={b.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-3 py-1.5 text-xs font-semibold hover:opacity-90"
                >
                  <ExternalLink className="h-3 w-3" /> Eröffnen
                </a>
              </div>
              <p className="text-sm mb-3">
                <strong>Best for:</strong> <span className="text-muted-foreground">{b.bestFor}</span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold mb-1">Vorteile</div>
                  <ul className="space-y-1 text-xs">
                    {b.pros.map((p, i) => (
                      <li
                        key={i}
                        dangerouslySetInnerHTML={{ __html: "+ " + p.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") }}
                      />
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-red-700 font-semibold mb-1">Nachteile</div>
                  <ul className="space-y-1 text-xs">
                    {b.cons.map((c, i) => (
                      <li
                        key={i}
                        dangerouslySetInnerHTML={{ __html: "− " + c.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") }}
                      />
                    ))}
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5 text-[10px] mb-3">
                {(Object.keys(b.features) as (keyof Bank["features"])[]).map((f) => (
                  <div
                    key={f}
                    className={`rounded-md border px-2 py-1 text-center ${
                      b.features[f]
                        ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-700"
                        : "border-border bg-secondary/30 text-muted-foreground"
                    }`}
                  >
                    {b.features[f] ? <CheckCircle2 className="h-2.5 w-2.5 inline mr-0.5" /> : <XCircle className="h-2.5 w-2.5 inline mr-0.5" />}
                    {FEATURE_LABELS[f]}
                  </div>
                ))}
              </div>
              <details className="text-xs">
                <summary className="cursor-pointer font-semibold text-foreground">
                  Was du für die Eröffnung brauchst ▾
                </summary>
                <ul className="mt-2 space-y-1 list-disc pl-4 text-muted-foreground">
                  {b.setupRequirements.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </details>
            </div>
          );
        })}
      </div>

      {/* Tipps */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4 text-xs leading-relaxed mb-3">
        <div className="flex items-start gap-2">
          <Banknote className="h-4 w-4 text-accent-blue shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Banking-Strategie für non-Resident Founder:</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                <strong>Mercury / Wise / Relay sind Plattformen, keine Banken</strong> — sie kooperieren mit
                FDIC-versicherten Partner-Banks (Choice Financial, Evolve, Thread). Funktionell dasselbe wie
                klassische Bank, aber besseres UX.
              </li>
              <li>
                <strong>Multi-Bank-Setup empfohlen</strong>: Mercury für Operations + Wise für Multi-Currency. So
                bist du redundant geschützt bei Account-Reviews.
              </li>
              <li>
                <strong>Brex hat sich 2022 auf VC-Companies fokussiert</strong> — Solo-Founder lehnt sie häufig
                ab. Mercury ist die offene Alternative.
              </li>
              <li>
                <strong>Bei HK</strong>: Statrys + Airwallex sind die Standard-Wahl für non-Resident-HK-Limiteds.
                HSBC nur wenn du in HK bist.
              </li>
              <li>
                <strong>Account-Sperre-Risiko</strong>: bei jeder Plattform real. Erste 6 Monate keine
                Verdachts-Activity (Crypto, Adult, Cannabis, Money-Transmission), keine ungewöhnlich großen Wires
                ohne Vorankündigung. Multi-Bank-Setup ist Versicherung.
              </li>
              <li>
                <strong>Compliance</strong>: bei jeder Bank musst du wirtschaftlich Berechtigte (≥ 25 % Anteil)
                offenlegen. KYC-Prozess kann 1–4 Wochen dauern.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 text-[11px] text-muted-foreground leading-relaxed">
        <strong>Disclaimer:</strong> Konditionen Stand Mai 2026 — können sich ändern, immer aktuelle Info auf der
        Bank-Website prüfen. Onboarding-Erfolg ist nicht garantiert (Bank-eigenes Risk-Scoring). Bei
        US-LLC-Setup zwingend Reihenfolge beachten: erst LLC-Filing → EIN → BOI → DANN Bank-Account-Antrag.
      </div>
    </CockpitShell>
  );
};

export default IntlBanking;
