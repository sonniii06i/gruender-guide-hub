import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Shield,
  Sparkles,
  Info,
  FileText,
} from "lucide-react";

// ============================================================
// US-LLC-WIZARD · Stand Mai 2026 (Total-Refactor)
// ============================================================
// Verifizierte Updates Mai 2026:
// - BOI-Reporting (CTA) seit 26.3.2025 für US-LLCs NICHT MEHR PFLICHT
//   (FinCEN Interim Final Rule) — nur noch Foreign-Entities registriert in USA
// - Form 5472 + Pro-Forma 1120 weiterhin JÄHRLICHE Pflicht für Foreign-Owned
//   Single-Member-LLCs ($25.000 Strafe bei Versäumnis!)
// - W-8BEN-E für Vendor-Beziehungen
// - Sales-Tax-Nexus-Check (Cross-Link zum eigenen Tool)
// ============================================================

type State = "wyoming" | "delaware" | "new-mexico" | "florida" | "nevada";

const STATES: Record<State, {
  flag: string;
  name: string;
  fullName: string;
  filingFee: number;
  annualFee: number;
  annualFeeLabel: string;
  privacyScore: number;
  taxScore: number;
  vcScore: number;
  bestFor: string;
  pros: string[];
  cons: string[];
  registeredAgentMin: number;
  notes: string[];
  filingUrl: string;
}> = {
  wyoming: {
    flag: "🤠",
    name: "Wyoming",
    fullName: "Wyoming LLC",
    filingFee: 100,
    annualFee: 60,
    annualFeeLabel: "Annual Report ($60 min)",
    privacyScore: 95,
    taxScore: 95,
    vcScore: 70,
    bestFor: "Solo-LLC mit höchster Privacy + niedrigsten Lifetime-Kosten",
    pros: [
      "**Beste Privacy** — keine Member-Disclosure im Public Record",
      "$100 Filing + $60/Jahr = günstigste Lifetime-Kosten der Top-Staaten",
      "Strongest Charging Order Protection",
      "Keine State Income/Franchise/Capital Gains Tax",
      "Von US-Banken akzeptiert (Mercury, Wise, Relay)",
    ],
    cons: [
      "VC/Investor weniger vertraut (DE/CA bekannter)",
      "Keine Stadt mit Gründer-Hub — alles remote",
    ],
    registeredAgentMin: 89,
    notes: [
      "Wyoming SOS: 122 W 25th St, Suite 100, Cheyenne, WY 82002-0020",
      "Annual Report fällig zum Anniversary-Date",
    ],
    filingUrl: "https://wyobiz.wyo.gov/Business/RegistrationInstr.aspx",
  },
  delaware: {
    flag: "💼",
    name: "Delaware",
    fullName: "Delaware LLC",
    filingFee: 90,
    annualFee: 300,
    annualFeeLabel: "$300 Franchise Tax (auch bei 0€ Umsatz)",
    privacyScore: 80,
    taxScore: 70,
    vcScore: 100,
    bestFor: "VC-finanzierte Startups (Investoren erwarten Delaware)",
    pros: [
      "**VC-Standard** — fast alle US-Startups + 60% Fortune 500",
      "Stärkster Court of Chancery (separates Wirtschafts-Gericht)",
      "Investoren akzeptieren Delaware ohne Diskussion",
      "Tax Haven für Out-of-State-Income (DE besteuert nur DE-Income)",
    ],
    cons: [
      "**$300/Jahr Franchise Tax** auch ohne Umsatz",
      "Privacy etwas geringer als Wyoming",
      "Bei Solo-LLC ohne VC-Pläne: Wyoming meist günstiger",
    ],
    registeredAgentMin: 89,
    notes: [
      "Division of Corporations: 401 Federal Street, Suite 4, Dover, DE 19901",
      "Franchise Tax fällig 1. Juni",
      "Für C-Corp (Y Combinator, US-VC): zwingend Delaware",
    ],
    filingUrl: "https://corp.delaware.gov/aboutagency/",
  },
  "new-mexico": {
    flag: "🌵",
    name: "New Mexico",
    fullName: "New Mexico LLC",
    filingFee: 50,
    annualFee: 0,
    annualFeeLabel: "KEIN Annual Report — keine laufenden State-Fees",
    privacyScore: 90,
    taxScore: 100,
    vcScore: 30,
    bestFor: "Maximaler Cost-Saver — günstigste Lifetime-Cost",
    pros: [
      "**$50 Filing + $0/Jahr** — günstigste Setup + 0 lfd. Kosten",
      "**KEIN Annual Report**",
      "Hohe Privacy (Member-Daten nicht public)",
    ],
    cons: [
      "**Selten bei US-Banken** — manche akzeptieren NM-LLCs nicht",
      "Kein VC-Standing — Investoren verlangen Re-Domestic",
    ],
    registeredAgentMin: 89,
    notes: ["SOS: 325 Don Gaspar, Santa Fe, NM 87501", "Beste Wahl wenn Lifetime-Cost wichtigste Metrik"],
    filingUrl: "https://portal.sos.state.nm.us/BFS/online",
  },
  florida: {
    flag: "🏖️",
    name: "Florida",
    fullName: "Florida LLC",
    filingFee: 125,
    annualFee: 138.75,
    annualFeeLabel: "$138.75 Annual Report",
    privacyScore: 60,
    taxScore: 90,
    vcScore: 60,
    bestFor: "Wenn du tatsächlich in FL lebst oder physisches Geschäft dort",
    pros: ["Keine Income Tax in Florida", "Großer Markt", "Bei FL-Umzug: kein Steuer-Hit"],
    cons: ["Privacy schwächer (Member-Liste public)", "Höhere Annual Fee", "Bei reinem Online: WY/NM besser"],
    registeredAgentMin: 89,
    notes: ["Florida DoS, P.O. Box 6327, Tallahassee, FL 32314"],
    filingUrl: "https://efile.sunbiz.org",
  },
  nevada: {
    flag: "🎰",
    name: "Nevada",
    fullName: "Nevada LLC",
    filingFee: 425,
    annualFee: 350,
    annualFeeLabel: "$350 Initial List + Business License Fees",
    privacyScore: 85,
    taxScore: 85,
    vcScore: 60,
    bestFor: "Hohe Privacy + Geschäfts-Substanz in NV",
    pros: ["Sehr hohe Privacy", "Keine State Income Tax", "Business-friendly Court System"],
    cons: ["**Hohe Setup + Annual Fees** ($425 + $350)", "Nur sinnvoll bei tatsächlicher NV-Substanz"],
    registeredAgentMin: 99,
    notes: ["SOS Nevada, 202 N. Carson St, Carson City, NV 89701"],
    filingUrl: "https://www.nvsos.gov",
  },
};

const STEP_LABELS = [
  "Use-Case & Strategie",
  "Bundesstaat wählen",
  "LLC-Name + Verfügbarkeit",
  "Registered Agent",
  "Articles of Organization",
  "Operating Agreement",
  "EIN beim IRS",
  "BOI-Status (Mai 2026)",
  "W-8BEN-E für Vendoren",
  "US-Bankkonto + Compliance",
];

const UsLlcWizard = () => {
  const [step, setStep] = useState(1);
  const [useCase, setUseCase] = useState<"solo" | "holding" | "ecom" | "vc" | "asset-protection">("solo");
  const [selectedState, setSelectedState] = useState<State>("wyoming");
  const [llcName, setLlcName] = useState("");
  const [registeredAgent, setRegisteredAgent] = useState<"northwest" | "harbor" | "cloud-peak" | "diy">("northwest");
  const [filingMethod, setFilingMethod] = useState<"diy" | "agent" | "lawyer">("agent");
  const [operatingAgreementMode, setOperatingAgreementMode] = useState<"template" | "lawyer" | "skip">("template");
  const [hasSSN, setHasSSN] = useState(false);
  const [needsItin, setNeedsItin] = useState(false);
  const [bankPreference, setBankPreference] = useState<"mercury" | "wise" | "relay">("mercury");

  const stateInfo = STATES[selectedState];

  const totalCost1 = useMemo(() => {
    const filing = stateInfo.filingFee;
    const agentFees = { northwest: 125, harbor: 89, "cloud-peak": 350, diy: 0 };
    const agent = agentFees[registeredAgent];
    const cpaFor5472 = 500;
    return { filing, agent, cpaFor5472, total: filing + agent + cpaFor5472 };
  }, [stateInfo, registeredAgent]);

  const totalSteps = STEP_LABELS.length;

  return (
    <CockpitShell
      eyebrow="US-LLC-Wizard · Stand Mai 2026"
      title="US-LLC für non-US Founder gründen — Schritt für Schritt"
      subtitle={`10 Steps von Strategie bis Compliance. Mit aktuellen Behörden-Adressen, Cost-Calculator, BOI-Status 2026 (nicht mehr Pflicht!) und Form-5472-Pflicht ($25k-Falle für Foreign-Owner).`}
    >
      {/* === Progress === */}
      <div className="mb-6">
        <div className="flex items-center gap-1 mb-2 overflow-x-auto">
          {STEP_LABELS.map((_, i) => {
            const s = i + 1;
            return (
              <div key={s} className="flex items-center gap-1 flex-1 min-w-0">
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    s < step
                      ? "bg-emerald-500 text-white"
                      : s === step
                      ? "bg-accent-blue text-primary-foreground ring-2 ring-accent-blue/30"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {s < step ? <CheckCircle2 className="h-3 w-3" /> : s}
                </div>
                {s < totalSteps && (
                  <div className={`h-0.5 flex-1 ${s < step ? "bg-emerald-500" : "bg-border"}`} />
                )}
              </div>
            );
          })}
        </div>
        <div className="text-xs text-muted-foreground">
          Step {step}/{totalSteps}: <strong className="text-foreground">{STEP_LABELS[step - 1]}</strong>
        </div>
      </div>

      {/* === Step Content === */}
      <div className="rounded-2xl border border-border bg-card p-6 mb-6">
        {/* STEP 1: Use-Case */}
        {step === 1 && (
          <>
            <h2 className="text-base font-bold mb-1">1. Use-Case definieren</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Damit wir Bundesstaat + Setup-Pfad optimal empfehlen.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                { v: "solo", l: "Solo-Founder / Freelance", d: "1 Person, Single-Member-LLC, Privacy + Cost optimieren", rec: "→ Wyoming oder New Mexico" },
                { v: "ecom", l: "E-Commerce / FBA", d: "Amazon/Shopify-Brand, US-Markt-Zugang, Sales-Tax-Nexus", rec: "→ Wyoming + Sales-Tax-Setup separat" },
                { v: "holding", l: "Holding / IP / Asset", d: "Vermögensverwaltung, IP-Holder, keine operative Tätigkeit", rec: "→ Wyoming oder Delaware Series-LLC" },
                { v: "vc", l: "VC-fundable Startup", d: "Geplante Series-A/Y-Combinator, Investoren erwarten Delaware", rec: "→ Delaware (oder C-Corp statt LLC!)" },
                { v: "asset-protection", l: "Asset Protection", d: "Schutz vor Privat-Gläubigern, Charging Order Schutz", rec: "→ Wyoming oder Nevada" },
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => setUseCase(o.v as typeof useCase)}
                  className={`text-left rounded-xl border p-3 text-sm transition-colors ${
                    useCase === o.v
                      ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                      : "border-border hover:border-accent-blue/40"
                  }`}
                >
                  <div className="font-bold mb-0.5">{o.l}</div>
                  <div className="text-xs text-muted-foreground">{o.d}</div>
                  <div className="text-[11px] text-accent-blue mt-1">{o.rec}</div>
                </button>
              ))}
            </div>
            {useCase === "vc" && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 mt-3 text-xs">
                <strong className="text-amber-700">⚠ VC-Hinweis:</strong> Echte VCs (Sequoia, a16z, YC)
                wollen meist eine C-Corp, KEINE LLC. LLC bedeutet Pass-Through-Tax — VCs hassen das.
                Wenn du VC-Funding planst → C-Corp in Delaware via{" "}
                <a href="https://www.stripe.com/atlas" target="_blank" rel="noopener noreferrer" className="text-accent-blue underline">
                  Stripe Atlas
                </a>{" "}
                oder{" "}
                <a href="https://www.firstbase.io" target="_blank" rel="noopener noreferrer" className="text-accent-blue underline">
                  Firstbase
                </a>
                .
              </div>
            )}
          </>
        )}

        {/* STEP 2: Bundesstaat */}
        {step === 2 && (
          <>
            <h2 className="text-base font-bold mb-1">2. Bundesstaat wählen</h2>
            <p className="text-xs text-muted-foreground mb-4">
              5 wichtigste Staaten für non-US Founder. Klick für Detail.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {(Object.keys(STATES) as State[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedState(s)}
                  className={`text-left rounded-xl border p-4 transition-colors ${
                    selectedState === s
                      ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                      : "border-border hover:border-accent-blue/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{STATES[s].flag}</span>
                      <span className="font-bold">{STATES[s].name}</span>
                    </div>
                    <div className="text-right text-xs">
                      <div className="font-mono">${STATES[s].filingFee}</div>
                      <div className="text-muted-foreground">+${STATES[s].annualFee}/yr</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">{STATES[s].bestFor}</div>
                  <div className="grid grid-cols-3 gap-1 text-[10px]">
                    <div className="rounded bg-emerald-500/10 px-1 py-0.5 text-center">
                      Privacy <strong>{STATES[s].privacyScore}</strong>
                    </div>
                    <div className="rounded bg-accent-blue/10 px-1 py-0.5 text-center">
                      Tax <strong>{STATES[s].taxScore}</strong>
                    </div>
                    <div className="rounded bg-purple-500/10 px-1 py-0.5 text-center">
                      VC <strong>{STATES[s].vcScore}</strong>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="rounded-2xl border border-border bg-secondary/30 p-4">
              <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
                {stateInfo.flag} {stateInfo.fullName} — Detail
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-3">
                <div className="rounded-lg bg-emerald-500/10 p-2">
                  <div className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold mb-1">Vorteile</div>
                  <ul className="space-y-1">
                    {stateInfo.pros.map((p, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: "+ " + p.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") }} />
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-red-500/10 p-2">
                  <div className="text-[10px] uppercase tracking-wider text-red-700 font-semibold mb-1">Nachteile</div>
                  <ul className="space-y-1">
                    {stateInfo.cons.map((c, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: "− " + c.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") }} />
                    ))}
                  </ul>
                </div>
              </div>
              <div className="text-[11px] text-muted-foreground">
                {stateInfo.notes.map((n, i) => (
                  <div key={i}>· {n}</div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* STEP 3: LLC-Name */}
        {step === 3 && (
          <>
            <h2 className="text-base font-bold mb-1">3. LLC-Name + Verfügbarkeitsprüfung</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Pflicht: Name muss "LLC" oder "L.L.C." enthalten. 3-Schritt-Check.
            </p>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">LLC-Name (mit "LLC")</Label>
            <Input
              value={llcName}
              onChange={(e) => setLlcName(e.target.value)}
              placeholder="z.B. Acme Ventures LLC"
              className="mt-1 mb-3"
              autoFocus
            />
            <div className="space-y-2 text-xs">
              <div className="rounded-xl border border-border bg-secondary/30 p-3">
                <div className="font-bold mb-1">Check 1: {stateInfo.name} SOS Verfügbarkeit</div>
                <p className="text-muted-foreground mb-2">
                  Name muss im Bundesstaat unique sein — kein anderer LLC hat ihn schon.
                </p>
                <a
                  href={stateInfo.filingUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-accent-blue hover:underline"
                >
                  → {stateInfo.name} SOS Lookup öffnen <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="rounded-xl border border-border bg-secondary/30 p-3">
                <div className="font-bold mb-1">Check 2: USPTO-Trademark</div>
                <p className="text-muted-foreground mb-2">
                  Auch wenn LLC-Name verfügbar — wenn ein Trademark drauf ist kannst du verklagt werden.
                </p>
                <a
                  href="https://tmsearch.uspto.gov"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-accent-blue hover:underline"
                >
                  → USPTO TMSearch <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="rounded-xl border border-border bg-secondary/30 p-3">
                <div className="font-bold mb-1">Check 3: DPMA + EUIPO + Domain</div>
                <p className="text-muted-foreground mb-2">
                  Falls auch DE/EU-Markt: parallel checken.
                </p>
                <Link to="/cockpit/check" className="inline-flex items-center gap-1 text-accent-blue hover:underline">
                  → Brand-Check (DPMA + EUIPO)
                </Link>
              </div>
            </div>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 mt-3 text-xs">
              <strong>Tipp:</strong> Reservierung möglich in WY/DE/NM für $10-25 für 120 Tage,
              falls du nicht sofort filest.
            </div>
          </>
        )}

        {/* STEP 4: Registered Agent */}
        {step === 4 && (
          <>
            <h2 className="text-base font-bold mb-1">4. Registered Agent buchen</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Pflicht: physische Adresse im Bundesstaat für Behörden-/Gerichts-Post. Als DE-Resident
              KEIN DIY möglich.
            </p>
            <div className="space-y-2 mb-3">
              {[
                { v: "northwest" as const, name: "Northwest Registered Agent", price: "$125/yr", note: "Branchen-Standard, Mail-Forwarding inklusive, kein Spam an dich", url: "https://www.northwestregisteredagent.com" },
                { v: "harbor" as const, name: "Harbor Compliance", price: "$89/yr", note: "Günstigste seriöse Option", url: "https://www.harborcompliance.com" },
                { v: "cloud-peak" as const, name: "Cloud Peak Law (Wyoming)", price: "$350+/yr", note: "Mit Anonymous-Trust-Setup für maximale Privacy, BOI-Filing inklusive (falls wieder Pflicht)", url: "https://www.cloudpeaklaw.com" },
                { v: "diy" as const, name: "Selbst (nur wenn US-Adresse)", price: "$0", note: "Du brauchst physische US-Adresse — bei DE-Wohnsitz NICHT möglich", url: "" },
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => setRegisteredAgent(o.v)}
                  className={`w-full text-left rounded-xl border p-3 transition-colors ${
                    registeredAgent === o.v
                      ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                      : "border-border hover:border-accent-blue/40"
                  }`}
                  disabled={o.v === "diy"}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <div className="font-bold">{o.name}</div>
                      <div className="text-xs text-muted-foreground">{o.note}</div>
                    </div>
                    <div className="font-mono text-sm shrink-0">{o.price}</div>
                  </div>
                  {o.url && (
                    <a
                      href={o.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] text-accent-blue hover:underline inline-flex items-center gap-0.5 mt-1"
                    >
                      Website <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </button>
              ))}
            </div>
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-3 text-xs">
              <Info className="h-3 w-3 inline mr-1 text-blue-700" />
              <strong>Tipp:</strong> Registered Agent ALS ERSTES booken — Adresse + Receipt brauchst
              du für Articles of Organization (nächster Schritt).
            </div>

            {/* Mailing-Adresse / Virtual Mailbox */}
            <div className="rounded-xl border border-border bg-secondary/30 p-4 mt-4 text-xs">
              <div className="font-bold text-sm mb-1">📬 US-Mailing-Adresse (NICHT = Registered Agent!)</div>
              <p className="text-muted-foreground mb-3">
                Die Registered-Agent-Adresse ist NUR für Behörden-/Gerichtspost — sie leitet dir
                weder Bank-Post, Debit-Karten, Stripe-Briefe noch Pakete zuverlässig weiter. Für eine
                echte US-Geschäftsadresse (Stripe-Onboarding, Bank-Statements, Karten-Versand,
                Lieferanten) brauchst du eine <strong>Virtual Mailbox (CMRA)</strong> mit echter
                Street-Address.
              </p>
              <div className="space-y-1.5">
                {[
                  { name: "Stable (usestable.com)", note: "Für Startups gebaut, echte Street-Address (kein PO-Box), Check-Deposit, Online-Notar für Form 1583. ~$25-50/Mo.", url: "https://www.usestable.com" },
                  { name: "US Global Mail", note: "Etabliert, Houston-TX-Adresse, Paket-Forwarding nach DE. ~$15-20/Mo.", url: "https://www.usglobalmail.com" },
                  { name: "Anytime Mailbox", note: "Günstigste Option, viele Städte ab ~$10/Mo, App-basiert.", url: "https://www.anytimemailbox.com" },
                  { name: "iPostal1", note: "3.000+ Adressen US-weit, gute App, Paket-Annahme.", url: "https://ipostal1.com" },
                ].map((o) => (
                  <div key={o.name} className="rounded-lg bg-card border border-border p-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold">{o.name}</span>
                      <a href={o.url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-accent-blue hover:underline inline-flex items-center gap-0.5 shrink-0">
                        Website <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <div className="text-muted-foreground mt-0.5">{o.note}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-2 mt-2">
                <AlertTriangle className="h-3 w-3 inline mr-1 text-amber-700" />
                <strong>Pflicht:</strong> Alle CMRAs verlangen <strong>USPS Form 1583</strong> + 2
                Ausweise (Online-Notar aus DE OK). Nimm IMMER eine echte Street-Address —{" "}
                <strong>PO-Box wird von Mercury & Stripe abgelehnt</strong>.
              </div>
            </div>
          </>
        )}

        {/* STEP 5: Articles of Organization */}
        {step === 5 && (
          <>
            <h2 className="text-base font-bold mb-1">5. Articles of Organization filen</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Der eigentliche Gründungs-Akt. Wird beim {stateInfo.name} SOS eingereicht — kostet ${stateInfo.filingFee}.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
              {[
                { v: "diy" as const, l: "DIY (Online-Filing)", d: `Selbst beim ${stateInfo.name} SOS einreichen. Bearbeitung 5-15 Werktage.`, price: `$${stateInfo.filingFee}` },
                { v: "agent" as const, l: "Via Registered Agent", d: "Northwest/Harbor übernehmen Filing — meist 1-3 Werktage Express-Service möglich.", price: `$${stateInfo.filingFee} + $50-100 Service` },
                { v: "lawyer" as const, l: "Via US-Anwalt", d: "Für Multi-Member / komplexe Setups. Inkl. Operating Agreement.", price: `$500-1.500` },
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => setFilingMethod(o.v)}
                  className={`text-left rounded-xl border p-3 text-xs transition-colors ${
                    filingMethod === o.v
                      ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                      : "border-border hover:border-accent-blue/40"
                  }`}
                >
                  <div className="font-bold mb-0.5">{o.l}</div>
                  <div className="text-muted-foreground mb-1">{o.d}</div>
                  <div className="font-mono text-accent-blue">{o.price}</div>
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-secondary/30 p-4">
              <div className="font-bold text-sm mb-2">Was in Articles of Organization steht:</div>
              <ul className="text-xs space-y-1 text-muted-foreground list-disc pl-4">
                <li>LLC-Name (mit "LLC"-Suffix)</li>
                <li>Registered Agent + Adresse (aus Step 4)</li>
                <li>Principal Office Address (kann = Registered Agent-Adresse sein)</li>
                <li>Member-/Manager-Struktur (Member-Managed vs Manager-Managed)</li>
                <li>Effective Date (sofort oder Future-Date)</li>
                <li>Duration (in der Regel "perpetual")</li>
                <li>Organizer (= du oder Registered Agent)</li>
              </ul>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 mt-3 text-xs">
              <CheckCircle2 className="h-3 w-3 inline mr-1 text-emerald-700" />
              <strong>Output:</strong> "Stamped Articles" (PDF) vom SOS — wird für EIN-Antrag + Bank-Opening
              gebraucht.
            </div>

            <a
              href={stateInfo.filingUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 mt-3 rounded-lg bg-accent-blue text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90"
            >
              <ExternalLink className="h-4 w-4" /> {stateInfo.name} SOS Filing-Portal
            </a>
          </>
        )}

        {/* STEP 6: Operating Agreement */}
        {step === 6 && (
          <>
            <h2 className="text-base font-bold mb-1">6. Operating Agreement erstellen</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Pflicht in DE/CA/NY/MO — dringend empfohlen in allen anderen Staaten. Regelt
              Member-Rechte, Profit-Splits, Auflösung.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
              {[
                { v: "template" as const, l: "Template nutzen", d: "LegalZoom, Rocket Lawyer, IncFile — Vorlage anpassen. Für Single-Member i.O.", price: "$0-50" },
                { v: "lawyer" as const, l: "Anwalt", d: "Für Multi-Member, komplexe Profit-Splits, VC-Vorbereitung", price: "$500-2.000" },
                { v: "skip" as const, l: "Skip (riskant)", d: "Wenn dein Staat es nicht Pflicht macht. Aber: Bank verlangt OA für Konto!", price: "$0" },
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => setOperatingAgreementMode(o.v)}
                  className={`text-left rounded-xl border p-3 text-xs transition-colors ${
                    operatingAgreementMode === o.v
                      ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                      : "border-border hover:border-accent-blue/40"
                  }`}
                >
                  <div className="font-bold mb-0.5">{o.l}</div>
                  <div className="text-muted-foreground mb-1">{o.d}</div>
                  <div className="font-mono text-accent-blue">{o.price}</div>
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-secondary/30 p-4">
              <div className="font-bold text-sm mb-2">Was im Operating Agreement steht (Single-Member):</div>
              <ul className="text-xs space-y-1 text-muted-foreground list-disc pl-4">
                <li>Member-Name + Ownership-Anteil (100%)</li>
                <li>Capital Contributions (Initial-Investment)</li>
                <li>Distribution-Rules (wie Profit/Loss aufgeteilt)</li>
                <li>Management-Struktur (Member-Managed)</li>
                <li>Dissolution-Bedingungen</li>
                <li>Steuerlicher Status (Disregarded Entity bei Single-Member-LLC)</li>
              </ul>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 mt-3 text-xs">
              <AlertTriangle className="h-3 w-3 inline mr-1 text-amber-700" />
              <strong>Wichtig:</strong> Mercury/Wise/Relay verlangen das Operating Agreement bei Konto-Eröffnung.
              Auch bei Single-Member-LLC nicht skippen!
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              <a href="https://www.legalzoom.com/business/business-operations/llc-operating-agreement" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs rounded-lg border border-border px-3 py-1.5 hover:bg-secondary">
                LegalZoom Template <ExternalLink className="h-3 w-3" />
              </a>
              <a href="https://www.rocketlawyer.com/business-and-contracts/business-operations/operating-agreement" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs rounded-lg border border-border px-3 py-1.5 hover:bg-secondary">
                Rocket Lawyer <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </>
        )}

        {/* STEP 7: EIN */}
        {step === 7 && (
          <>
            <h2 className="text-base font-bold mb-1">7. EIN beim IRS beantragen</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Pflicht: Tax-ID via Form SS-4. Pflicht für Banking, Steuer-Filings, Vendor-Beziehungen.
            </p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { v: true, l: "Ich habe eine SSN/ITIN" },
                { v: false, l: "Keine SSN — als Foreign Founder" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => setHasSSN(o.v)}
                  className={`text-left rounded-xl border p-3 text-sm transition-colors ${
                    hasSSN === o.v
                      ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                      : "border-border hover:border-accent-blue/40"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
            {hasSSN ? (
              <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-3 text-xs">
                ✓ <strong>Online via IRS-Portal</strong> ({"<"} 15 Min):{" "}
                <a href="https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">
                  EIN Online
                </a>
                . Du bekommst CP575-Brief sofort als PDF.
              </div>
            ) : (
              <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-3 text-xs space-y-2">
                <div><strong>Foreign-Founder-Pfad: 3 Optionen</strong></div>
                <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                  <li>
                    <strong>📞 Telefonisch (1-2 Werktage):</strong> IRS International Line{" "}
                    <a href="tel:+12679411099" className="text-accent-blue hover:underline">+1-267-941-1099</a>
                    {" "}— Mo-Fr 6:00-23:00 ET. Vorab SS-4 ausfüllen, anrufen, EIN sofort am Telefon.
                  </li>
                  <li>
                    <strong>📠 Fax (4-6 Wochen):</strong> +1-855-641-6935 (international)
                  </li>
                  <li>
                    <strong>📬 Brief (8+ Wochen):</strong> Internal Revenue Service, Attn: EIN International Operation, Cincinnati, OH 45999, USA
                  </li>
                  <li>
                    <strong>Form SS-4:</strong>{" "}
                    <a href="https://www.irs.gov/pub/irs-pdf/fss4.pdf" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline inline-flex items-center gap-0.5">
                      PDF herunterladen <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                  <li>
                    <strong>Zeile 7b:</strong> KOMPLETT LEER lassen wenn keine SSN/ITIN — nicht "N/A"!
                  </li>
                  <li>
                    <strong>Zeile 9a:</strong> "LLC" ankreuzen · <strong>Zeile 10:</strong> "Banking purposes"
                  </li>
                  <li>
                    <strong>Schneller via CPA + Form 8821:</strong> EIN in 1-2 Werktagen (Service ~$150-300)
                  </li>
                </ul>
              </div>
            )}
            <div className="mt-3">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Brauche ich ein ITIN?
              </Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {[
                  { v: false, l: "Nein (Single-Member-LLC, Disregarded Entity)" },
                  { v: true, l: "Ja (Multi-Member oder spezielle Sit.)" },
                ].map((o) => (
                  <button
                    key={String(o.v)}
                    onClick={() => setNeedsItin(o.v)}
                    className={`rounded-md border p-2 text-xs transition-colors ${
                      needsItin === o.v
                        ? "border-accent-blue bg-accent-blue/10 text-accent-blue font-semibold"
                        : "border-border hover:bg-secondary"
                    }`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
              {needsItin && (
                <div className="text-[11px] text-muted-foreground mt-2">
                  ITIN-Antrag via Form W-7 + beglaubigte Pass-Kopie (Acceptance Agent in DE oder US-Botschaft).
                  Adresse: <strong>IRS, ITIN Operation, P.O. Box 149342, Austin, TX 78714-9342</strong>.
                  Bearbeitung 3-4 Monate.
                </div>
              )}
            </div>

            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-3 mt-3 text-xs">
              <Info className="h-3 w-3 inline mr-1 text-blue-700" />
              <strong>Begriffs-Klärung „TIN":</strong>
              <ul className="list-disc pl-4 mt-1 space-y-0.5 text-muted-foreground">
                <li><strong>TIN</strong> (Taxpayer Identification Number) ist der Oberbegriff. Wenn Stripe/Bank nach der „US Tax ID / TIN" deiner Firma fragt, meinen sie die <strong>EIN</strong>.</li>
                <li>Deine LLC-TIN = <strong>EIN</strong> (Employer Identification Number, oben beantragt).</li>
                <li>Deine persönliche US-TIN = <strong>SSN</strong> (falls vorhanden) oder <strong>ITIN</strong> für Nicht-Residenten.</li>
                <li>Single-Member-LLC (Disregarded Entity): fürs Banking reicht i.d.R. die EIN — die ITIN brauchst du nur, wenn du selbst eine US-Steuererklärung abgeben musst.</li>
              </ul>
            </div>
          </>
        )}

        {/* STEP 8: BOI-Status 2026 */}
        {step === 8 && (
          <>
            <h2 className="text-base font-bold mb-1">8. BOI-Status (Stand Mai 2026)</h2>
            <div className="rounded-xl border-2 border-emerald-500/40 bg-emerald-500/5 p-4 mb-3">
              <div className="flex items-start gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-base text-emerald-700">
                    Update 26.3.2025: BOI-Reporting NICHT MEHR PFLICHT für US-LLCs!
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    FinCEN hat am 26.3.2025 einen <strong>Interim Final Rule</strong> veröffentlicht,
                    der ALLE US-LLCs (auch mit ausländischen Beneficial Owners wie DE-Founders) komplett
                    vom Beneficial-Ownership-Information-Reporting (CTA) AUSGENOMMEN hat.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-3 mb-3 text-xs">
              <div className="font-bold mb-2">Was bedeutet das konkret für dich?</div>
              <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                <li>
                  <strong>Neue US-LLC gründen:</strong> ✓ KEIN BOI-Filing nötig
                </li>
                <li>
                  <strong>Bestehende US-LLC (vor 2025):</strong> ✓ Alte BOI-Filings sind weiter gültig,
                  aber keine Updates/Re-Filings nötig
                </li>
                <li>
                  <strong>Foreign-Entity in USA registriert:</strong> ⚠ BLEIBT meldepflichtig — aber
                  nur die nicht-US Beneficial Owners
                </li>
                <li>
                  <strong>Bußgeld-Drohung "$591/Tag":</strong> für US-LLCs NICHT mehr aktiv
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-xs">
              <AlertTriangle className="h-3 w-3 inline mr-1 text-amber-700" />
              <strong>Watchout:</strong> Status kann sich politisch wieder ändern. Rechtslage Mai 2026 ist
              stabil aber: prüfe vor Setup nochmal auf{" "}
              <a href="https://www.fincen.gov/boi" target="_blank" rel="noopener noreferrer" className="text-accent-blue underline">
                fincen.gov/boi
              </a>
              .
            </div>
          </>
        )}

        {/* STEP 9: W-8BEN-E */}
        {step === 9 && (
          <>
            <h2 className="text-base font-bold mb-1">9. W-8BEN-E für Vendor-Beziehungen</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Kein Filing beim IRS — sondern Formular das US-Vendoren von dir verlangen werden
              (Stripe, Amazon Affiliate, Upwork, SaaS-Tools). Bestätigt deinen Foreign-Owner-Status.
            </p>
            <div className="rounded-xl border border-border bg-secondary/30 p-4 mb-3">
              <div className="font-bold text-sm mb-2">Wann brauchst du es?</div>
              <ul className="text-xs space-y-1 text-muted-foreground list-disc pl-4">
                <li>Stripe US fragt danach bei Account-Aktivierung</li>
                <li>Amazon Associates / Affiliate-Programme</li>
                <li>Upwork / Fiverr für US-Vendor-Verträge</li>
                <li>SaaS-Tools (Webflow, Notion etc.) für DBA-Anwendung</li>
                <li>Jede ACH-Payment-Beziehung mit US-Empfänger</li>
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-secondary/30 p-4 mb-3">
              <div className="font-bold text-sm mb-2">Was rein muss:</div>
              <ul className="text-xs space-y-1 text-muted-foreground list-disc pl-4">
                <li>Part I, Zeile 1: LLC-Name</li>
                <li>Part I, Zeile 2: Country of Incorporation = United States (deine LLC ist US!)</li>
                <li>Part I, Zeile 4: Chapter 3 Status = "Disregarded entity" (Single-Member)</li>
                <li>Part I, Zeile 5: Chapter 4 (FATCA) Status = "Active NFFE" üblich für Solo</li>
                <li>Part I, Zeile 6: Permanent Address (DE-Wohnsitz!)</li>
                <li>Part I, Zeile 8: EIN (aus Step 7)</li>
                <li>Part III: DBA-Vorteile-Beanspruchung (DE-USA-DBA, Article-Hinweis)</li>
                <li>Part XXIX: Signature</li>
              </ul>
            </div>

            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-3 text-xs">
              <Info className="h-3 w-3 inline mr-1 text-blue-700" />
              <strong>Tipp:</strong> W-8BEN-E gilt 3 Jahre. Speicher das ausgefüllte PDF
              zentral — du wirst es immer wieder hochladen müssen.
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              <a href="https://www.irs.gov/pub/irs-pdf/fw8bene.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90">
                <ExternalLink className="h-4 w-4" /> W-8BEN-E PDF
              </a>
              <a href="https://www.irs.gov/pub/irs-pdf/iw8bene.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary">
                Instructions PDF
              </a>
            </div>
          </>
        )}

        {/* STEP 10: Bank + Compliance */}
        {step === 10 && (
          <>
            <h2 className="text-base font-bold mb-1">10. US-Bankkonto + jährliche Compliance</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Mercury / Wise Business / Relay sind 100% remote möglich. Plus: setup für jährliche Pflichten.
            </p>

            <div className="font-bold text-sm mb-2">Bank-Auswahl:</div>
            <div className="space-y-2 mb-4">
              {[
                { v: "mercury" as const, name: "Mercury", fee: "$0/Mon", note: "Speziell für Tech-/Online-Brands. Akzeptiert non-US Founder. ★ Beste All-Round-Wahl.", url: "https://mercury.com" },
                { v: "wise" as const, name: "Wise Business", fee: "$31 einmalig (US)", note: "Multi-Currency-Konto. Kein klassisches US-Bank-Konto, aber USD-IBAN + ACH-Routing.", url: "https://wise.com/business" },
                { v: "relay" as const, name: "Relay", fee: "$0/Mon", note: "Beste Buchhaltungs-Integration (QuickBooks, Xero).", url: "https://relayfi.com" },
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => setBankPreference(o.v)}
                  className={`w-full text-left rounded-xl border p-3 transition-colors ${
                    bankPreference === o.v
                      ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                      : "border-border hover:border-accent-blue/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <div className="font-bold">{o.name}</div>
                      <div className="text-xs text-muted-foreground">{o.note}</div>
                    </div>
                    <div className="font-mono text-sm shrink-0">{o.fee}</div>
                  </div>
                  <a
                    href={o.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[11px] text-accent-blue hover:underline inline-flex items-center gap-0.5 mt-1"
                  >
                    Website <ExternalLink className="h-3 w-3" />
                  </a>
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-secondary/30 p-4 mb-3 text-xs">
              <div className="font-bold text-sm mb-2">💳 Debit-/Kredit-Karten zur LLC</div>
              <ul className="space-y-1.5 text-muted-foreground">
                <li><strong className="text-foreground">Mercury:</strong> sofort unbegrenzt virtuelle Debit-Mastercards + physische Karte (Versand weltweit). <strong>Mercury IO Credit Card</strong> (1,5% Cashback) sobald Guthaben da ist — ohne Personal Guarantee, durch Saldo gedeckt.</li>
                <li><strong className="text-foreground">Wise Business:</strong> physische + virtuelle Wise-Debit-Mastercard, Ausgaben in 40+ Währungen mit Echtkurs. Ideal für globale Ad-Spends/Lieferanten.</li>
                <li><strong className="text-foreground">Relay:</strong> bis zu 50 virtuelle + physische Visa-Debitkarten — gut zum Trennen von Ad-Konten/Team-Ausgaben.</li>
                <li><strong>Klassische US-Kreditkarten</strong> (Amex/Chase) brauchen SSN + US-Credit-History → früh unrealistisch. Mercury IO oder Brex sind die nächste Stufe (Brex lehnt kleine non-VC-LLCs oft ab).</li>
              </ul>
              <div className="text-[11px] text-muted-foreground mt-2">
                Karten gehen an deine Virtual-Mailbox-Adresse (Step 4), nicht an den Registered Agent.
              </div>
            </div>

            <div className="text-[11px] text-muted-foreground mb-3">
              <strong>Was du bereithältst:</strong> EIN-Brief (CP575), Articles of Organization
              (Stamped), Operating Agreement, Pass, Adress-Nachweis (DE-Anmeldung OK),
              Geschäftsmodell-Beschreibung.
            </div>

            <Link to="/cockpit/intl-banking" className="inline-flex items-center gap-1 text-xs text-accent-blue hover:underline mb-4">
              → Detaillierter Banking-Vergleich mit Closure-Risk
            </Link>

            {/* ★ Jährliche Pflichten — wichtig! */}
            <div className="rounded-2xl border-2 border-red-500/40 bg-red-500/5 p-4 mt-4">
              <h3 className="font-bold text-sm mb-2 flex items-center gap-2 text-red-700">
                <AlertTriangle className="h-4 w-4" /> Jährliche Pflichten ($25.000-Falle!)
              </h3>
              <ul className="text-xs space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Form 5472 + Pro-Forma Form 1120</strong> bis 15.04.
                  (mit Form 7004 verlängerbar bis 15.10.): JÄHRLICHE Pflicht für Single-Member-LLC mit
                  ausländischem Owner. <strong className="text-red-700">$25.000 Strafe</strong> bei
                  Versäumnis! Adresse:{" "}
                  <em>Internal Revenue Service, 1973 Rulon White Blvd., M/S 6112, Attn: PIN Unit, Ogden, UT 84201</em>
                  <br />
                  → CPA-Service ~$300-500/Jahr.
                </li>
                <li>
                  <strong className="text-foreground">Annual Report</strong> beim {stateInfo.name} SOS
                  (Anniversary-Datum) — Fee ${stateInfo.annualFee}
                </li>
                <li>
                  <strong className="text-foreground">Registered Agent Renewal</strong> jährlich
                </li>
                <li>
                  <strong className="text-foreground">Sales-Tax-Nexus-Check:</strong>{" "}
                  <Link to="/cockpit/sales-tax-nexus" className="text-accent-blue underline">
                    Tool öffnen
                  </Link>
                  {" "}— wenn FBA-Inventar in US-Staat → sofortiger Nexus ab $0!
                </li>
                <li>
                  <strong className="text-foreground">DE-Steuer:</strong> LLC-Gewinne bei DE-Wohnsitz gemäß
                  DBA als Einkünfte aus Gewerbebetrieb in DE versteuern (LLC = transparent bei Single-Member).
                  <br />
                  → siehe <Link to="/cockpit/dba-cfc" className="text-accent-blue underline">DBA-CFC-Rechner</Link>
                </li>
                <li>
                  <strong className="text-foreground">State Tax Registration:</strong> nur wenn aktive
                  Tätigkeit im State (Income Sourcing). Bei Wyoming/NM/SD: keine State Income Tax.
                </li>
              </ul>
            </div>

            {/* Summary */}
            <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/5 p-5 mt-4">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-700" /> Setup-Zusammenfassung
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase">Bundesstaat</div>
                  <div className="font-bold">{stateInfo.flag} {stateInfo.name}</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase">LLC-Name</div>
                  <div className="font-bold">{llcName || "—"}</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase">Setup-Kosten Jahr 1</div>
                  <div className="font-bold text-emerald-700">${totalCost1.total.toLocaleString("en-US")}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">
                    Filing ${totalCost1.filing} + Agent ${totalCost1.agent} + CPA Form 5472 ${totalCost1.cpaFor5472}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase">Lfd. Kosten ab Jahr 2</div>
                  <div className="font-bold">
                    ${(stateInfo.annualFee + totalCost1.agent + totalCost1.cpaFor5472).toLocaleString("en-US")}/yr
                  </div>
                </div>
              </div>
            </div>

            <Link to="/playbook/preview/us-llc" className="inline-flex items-center gap-1 rounded-lg border border-accent-blue/30 bg-accent-blue/5 px-4 py-2 text-sm hover:bg-accent-blue/10 mt-4">
              <Sparkles className="h-4 w-4 text-accent-blue" /> Kompletten Playbook öffnen
              <ArrowRight className="h-3 w-3" />
            </Link>
          </>
        )}

        {/* === NAVIGATION === */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Zurück
          </button>
          {step < totalSteps && (
            <button
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90"
            >
              Weiter <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* === Stand-Mai-2026-Notiz === */}
      <div className="rounded-2xl border border-border bg-card p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <FileText className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          <div className="text-muted-foreground">
            <strong className="text-foreground">Wichtige Updates Mai 2026:</strong>
            <ul className="list-disc pl-4 space-y-0.5 mt-1">
              <li>BOI (CTA) für US-LLCs NICHT MEHR PFLICHT seit FinCEN Interim Final Rule 26.3.2025</li>
              <li>Form 5472 + 1120 BLEIBT jährliche Pflicht (Foreign-Owned Single-Member-LLC, $25k Strafe)</li>
              <li>BMF-Sofortabschreibung Computer/Software für deutsche Steuer relevant</li>
              <li>Bei Sales-Tax-Nexus durch FBA-Inventar: $0-Schwelle in CA seit 2025-Ruling</li>
            </ul>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

export default UsLlcWizard;
