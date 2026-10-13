import { useState, useMemo, type ElementType, type ReactNode } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Callout, Field, ResultRow, ToneBadge, ToolSection } from "@/components/cockpit/kit";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  Check,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  ExternalLink,
  FileText,
  Fingerprint,
  Landmark,
  Lightbulb,
  Mail,
  Mailbox,
  MapPin,
  Phone,
  Printer,
  ScrollText,
  ShieldCheck,
  Stamp,
  Tag,
  Target,
} from "lucide-react";

// ============================================================
// US-LLC-WIZARD · Stand Mai 2026 (Total-Refactor)
// ============================================================
// Verifizierte Updates Mai 2026:
// - BOI-Reporting (CTA) seit 26.3.2025 für US-LLCs NICHT MEHR PFLICHT
//   (FinCEN Interim Final Rule) — nur noch Foreign-Entities registriert in USA
// - Form 5472 + Pro-Forma 1120 weiterhin JÄHRLICHE Pflicht für Foreign-Owned
//   Single-Member-LLCs ($25.000 Strafe bei Versäumnis!)
// - W-8BEN des Eigentümers (nicht W-8BEN-E: Single-Member-LLC ist disregarded) für Vendor-Beziehungen
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
  "W-8BEN (Eigentümer) für Vendoren",
  "US-Bankkonto + Compliance",
];

const UsLlcWizard = () => {
  const [step, setStep] = useState(1);
  const [useCase, setUseCase] = useState<"solo" | "holding" | "ecom" | "vc" | "asset-protection">("solo");
  const [selectedState, setSelectedState] = useState<State>("wyoming");
  const [llcName, setLlcName] = useState("");
  const [registeredAgent, setRegisteredAgent] = useState<"northwest" | "wyoming-agent" | "harbor" | "cloud-peak" | "diy">("northwest");
  const [filingMethod, setFilingMethod] = useState<"diy" | "agent" | "lawyer">("agent");
  const [operatingAgreementMode, setOperatingAgreementMode] = useState<"template" | "lawyer" | "skip">("template");
  const [hasSSN, setHasSSN] = useState(false);
  const [needsItin, setNeedsItin] = useState(false);
  const [bankPreference, setBankPreference] = useState<"mercury" | "wise" | "relay">("mercury");

  const stateInfo = STATES[selectedState];

  const totalCost1 = useMemo(() => {
    const filing = stateInfo.filingFee;
    const agentFees = { northwest: 125, "wyoming-agent": 50, harbor: 89, "cloud-peak": 350, diy: 0 };
    const agent = agentFees[registeredAgent];
    const cpaFor5472 = 500;
    return { filing, agent, cpaFor5472, total: filing + agent + cpaFor5472 };
  }, [stateInfo, registeredAgent]);

  const totalSteps = STEP_LABELS.length;
  const stepIcon = STEP_ICONS[step - 1];
  const fortschritt = Math.round((step / totalSteps) * 100);
  const md = (s: string) => s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  return (
    <CockpitShell
      eyebrow="US-LLC-Wizard · Stand Mai 2026"
      title="US-LLC für non-US Founder gründen: Schritt für Schritt"
      subtitle="Zehn Schritte von der Strategie bis zur laufenden Compliance. Mit aktuellen Behörden-Adressen, Kostenrechnung, BOI-Status 2026 (nicht mehr Pflicht) und der Form-5472-Pflicht, der 25.000-Dollar-Falle für Foreign Owner."
    >
      <div className="grid items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
        {/* Fortschritt: mobil als Leiste, ab lg als Schrittliste */}
        <aside className="min-w-0 space-y-4 lg:sticky lg:top-20">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-card lg:hidden">
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="font-medium">
                Schritt <span className="tabular">{step}</span> von <span className="tabular">{totalSteps}</span>
              </span>
              <span className="truncate text-muted-foreground">{STEP_LABELS[step - 1]}</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
              <div className="h-full rounded-full bg-accent-blue transition-[width] duration-300" style={{ width: `${fortschritt}%` }} />
            </div>
          </div>

          <nav aria-label="Schritte" className="hidden rounded-2xl border border-border bg-card p-3 shadow-card lg:block">
            <ol className="space-y-0.5">
              {STEP_LABELS.map((label, i) => {
                const s = i + 1;
                const done = s < step;
                const current = s === step;
                return (
                  <li
                    key={label}
                    aria-current={current ? "step" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm",
                      current ? "bg-accent font-medium text-foreground" : done ? "text-foreground/80" : "text-muted-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular",
                        done && "bg-success text-primary-foreground",
                        current && "bg-accent-blue text-primary-foreground",
                        !done && !current && "border border-border bg-card",
                      )}
                    >
                      {done ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : s}
                    </span>
                    <span className="min-w-0 leading-snug">{label}</span>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="hidden rounded-2xl border border-border bg-card p-4 shadow-card lg:block">
            <p className="text-sm font-semibold">Dein Setup bisher</p>
            <div className="mt-1 divide-y divide-border/70">
              <ResultRow label="Bundesstaat" value={stateInfo.name} />
              <ResultRow label="LLC-Name" value={<span className="block max-w-[120px] truncate">{llcName || "offen"}</span>} />
              <ResultRow label="Kosten Jahr 1" value={`$${totalCost1.total.toLocaleString("en-US")}`} strong />
            </div>
          </div>
        </aside>

        <div className="min-w-0 space-y-6">
          <ToolSection
            title={STEP_TITLES[step - 1]}
            icon={stepIcon}
          >
            {/* STEP 1: Use-Case */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Damit wir Bundesstaat und Setup-Pfad passend empfehlen.</p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {[
                    { v: "solo", l: "Solo-Founder / Freelance", d: "1 Person, Single-Member-LLC, Privacy + Cost optimieren", rec: "Wyoming oder New Mexico" },
                    { v: "ecom", l: "E-Commerce / FBA", d: "Amazon/Shopify-Brand, US-Markt-Zugang, Sales-Tax-Nexus", rec: "Wyoming + Sales-Tax-Setup separat" },
                    { v: "holding", l: "Holding / IP / Asset", d: "Vermögensverwaltung, IP-Holder, keine operative Tätigkeit", rec: "Wyoming oder Delaware Series-LLC" },
                    { v: "vc", l: "VC-fundable Startup", d: "Geplante Series-A/Y-Combinator, Investoren erwarten Delaware", rec: "Delaware (oder C-Corp statt LLC!)" },
                    { v: "asset-protection", l: "Asset Protection", d: "Schutz vor Privat-Gläubigern, Charging Order Schutz", rec: "Wyoming oder Nevada" },
                  ].map((o) => (
                    <OptionCard key={o.v} active={useCase === o.v} onClick={() => setUseCase(o.v as typeof useCase)}>
                      <span className="block font-semibold">{o.l}</span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">{o.d}</span>
                      <span className="mt-2 flex items-center gap-1 text-xs font-medium text-accent-blue">
                        <ArrowRight className="h-3 w-3" aria-hidden="true" /> {o.rec}
                      </span>
                    </OptionCard>
                  ))}
                </div>
                {useCase === "vc" && (
                  <Callout tone="warning" title="Hinweis für VC-Pläne">
                    Echte VCs (Sequoia, a16z, YC) wollen meist eine C-Corp, KEINE LLC. LLC bedeutet Pass-Through-Tax — VCs
                    hassen das. Wenn du VC-Funding planst → C-Corp in Delaware via{" "}
                    <ExtLink href="https://www.stripe.com/atlas">Stripe Atlas</ExtLink> oder{" "}
                    <ExtLink href="https://www.firstbase.io">Firstbase</ExtLink>.
                  </Callout>
                )}
              </div>
            )}

            {/* STEP 2: Bundesstaat */}
            {step === 2 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  Die fünf wichtigsten Staaten für non-US Founder. Wähle einen Staat, um die Details zu sehen.
                </p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {(Object.keys(STATES) as State[]).map((s) => (
                    <OptionCard key={s} active={selectedState === s} onClick={() => setSelectedState(s)}>
                      <span className="flex items-start justify-between gap-3">
                        <span className="flex items-center gap-2.5">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-xs font-semibold">
                            {STATE_KUERZEL[s]}
                          </span>
                          <span className="font-semibold">{STATES[s].name}</span>
                        </span>
                        <span className="text-right text-sm tabular">
                          <span className="block font-semibold">${STATES[s].filingFee}</span>
                          <span className="block text-xs text-muted-foreground">+${STATES[s].annualFee}/Jahr</span>
                        </span>
                      </span>
                      <span className="mt-2 block text-sm text-muted-foreground">{STATES[s].bestFor}</span>
                      <span className="mt-3 grid grid-cols-3 gap-2">
                        <ScoreBar label="Privacy" value={STATES[s].privacyScore} />
                        <ScoreBar label="Steuer" value={STATES[s].taxScore} />
                        <ScoreBar label="VC" value={STATES[s].vcScore} />
                      </span>
                    </OptionCard>
                  ))}
                </div>
                <div className="rounded-xl border border-border bg-secondary/40 p-4">
                  <h3 className="text-sm font-semibold">{stateInfo.fullName}: Details</h3>
                  <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="rounded-lg border border-success/25 bg-success-soft p-3">
                      <p className="text-sm font-semibold text-success">Vorteile</p>
                      <ul className="mt-2 space-y-1.5 text-sm">
                        {stateInfo.pros.map((p, i) => (
                          <li key={i} className="flex gap-2">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
                            <span dangerouslySetInnerHTML={{ __html: md(p) }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg border border-danger/25 bg-danger-soft p-3">
                      <p className="text-sm font-semibold text-danger">Nachteile</p>
                      <ul className="mt-2 space-y-1.5 text-sm">
                        {stateInfo.cons.map((c, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-[0.45rem] h-1 w-2 shrink-0 rounded-full bg-danger" aria-hidden="true" />
                            <span dangerouslySetInnerHTML={{ __html: md(c) }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                    {stateInfo.notes.map((n, i) => (
                      <li key={i} className="flex gap-1.5">
                        <MapPin className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" /> {n}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* STEP 3: LLC-Name */}
            {step === 3 && (
              <div className="space-y-5">
                <Field
                  label="LLC-Name"
                  htmlFor="llc-name"
                  hint={'Pflicht: Der Name muss „LLC“ oder „L.L.C.“ enthalten. Danach die drei Prüfungen unten durchgehen.'}
                >
                  <Input
                    id="llc-name"
                    value={llcName}
                    onChange={(e) => setLlcName(e.target.value)}
                    placeholder="z. B. Acme Ventures LLC"
                    autoFocus
                  />
                </Field>
                <ol className="space-y-3">
                  <CheckItem n={1} title={`${stateInfo.name} SOS: Verfügbarkeit`}>
                    Name muss im Bundesstaat unique sein — kein anderer LLC hat ihn schon.
                    <span className="mt-2 block">
                      <ExtLink href={stateInfo.filingUrl}>{stateInfo.name} SOS Lookup öffnen</ExtLink>
                    </span>
                  </CheckItem>
                  <CheckItem n={2} title="USPTO-Trademark">
                    Auch wenn LLC-Name verfügbar — wenn ein Trademark drauf ist kannst du verklagt werden.
                    <span className="mt-2 block">
                      <ExtLink href="https://tmsearch.uspto.gov">USPTO TMSearch</ExtLink>
                    </span>
                  </CheckItem>
                  <CheckItem n={3} title="DPMA, EUIPO und Domain">
                    Falls auch DE/EU-Markt: parallel checken.
                    <span className="mt-2 block">
                      <Link to="/cockpit/check" className="inline-flex items-center gap-1 font-medium text-accent-blue hover:underline">
                        Brand-Check (DPMA + EUIPO) <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </Link>
                    </span>
                  </CheckItem>
                </ol>
                <Callout tone="info" title="Tipp" icon={Lightbulb}>
                  Reservierung möglich in WY/DE/NM für $10-25 für 120 Tage, falls du nicht sofort filest.
                </Callout>
              </div>
            )}

            {/* STEP 4: Registered Agent */}
            {step === 4 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  Pflicht: physische Adresse im Bundesstaat für Behörden- und Gerichtspost. Als DE-Resident ist DIY nicht möglich.
                </p>
                <div className="space-y-2">
                  {[
                    { v: "northwest" as const, name: "Northwest Registered Agent", price: "$125/yr", note: "Branchen-Standard, Mail-Forwarding inklusive, kein Spam an dich", url: "https://www.northwestregisteredagent.com" },
                    { v: "wyoming-agent" as const, name: "Wyoming Registered Agent Inc", price: "~$25-50/yr", note: "WY-nativ + günstigster RA-Preis, gutes Mail-Scanning. Top für reine Wyoming-LLC.", url: "https://www.wyomingagents.com" },
                    { v: "harbor" as const, name: "Harbor Compliance", price: "$89/yr", note: "Günstigste seriöse Option für andere Staaten", url: "https://www.harborcompliance.com" },
                    { v: "cloud-peak" as const, name: "Cloud Peak Law (Wyoming)", price: "$350+/yr", note: "Mit Anonymous-Trust-Setup für maximale Privacy, BOI-Filing inklusive (falls wieder Pflicht)", url: "https://www.cloudpeaklaw.com" },
                    { v: "diy" as const, name: "Selbst (nur wenn US-Adresse)", price: "$0", note: "Du brauchst physische US-Adresse — bei DE-Wohnsitz NICHT möglich", url: "" },
                  ].map((o) => (
                    <OptionCard key={o.v} active={registeredAgent === o.v} onClick={() => setRegisteredAgent(o.v)} disabled={o.v === "diy"}>
                      <span className="flex items-start justify-between gap-3">
                        <span className="min-w-0">
                          <span className="block font-semibold">{o.name}</span>
                          <span className="mt-0.5 block text-sm text-muted-foreground">{o.note}</span>
                        </span>
                        <span className="shrink-0 text-sm font-semibold tabular">{o.price}</span>
                      </span>
                      {o.url && (
                        <a
                          href={o.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          onClick={(e) => e.stopPropagation()}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:underline"
                        >
                          Website <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        </a>
                      )}
                    </OptionCard>
                  ))}
                </div>

                {/* Konkreter Rundown beim Empfehlungs-Anbieter */}
                <div className="rounded-xl border border-success/25 bg-success-soft p-4 md:p-5">
                  <h3 className="flex items-center gap-2 text-sm font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" /> Empfehlung: Northwest Registered Agent, so gehst du vor
                  </h3>
                  <p className="mt-1.5 text-sm text-foreground/80">
                    Branchen-Standard für non-US Founder: privacy-freundlich (eigene Adresse statt deiner),
                    Mail wird gescannt statt weiterverkauft, klarer Festpreis ohne Upsell-Spam. Zwei Wege:
                  </p>
                  <div className="mt-3 rounded-lg border border-border bg-card p-3 text-sm">
                    <p className="flex items-center gap-2 font-semibold">
                      <Lightbulb className="h-4 w-4 text-accent-blue" aria-hidden="true" /> Trick: Formation-Paket statt nur RA
                    </p>
                    <p className="mt-1 text-muted-foreground">
                      Buchst du bei Northwest gleich die <strong className="text-foreground">LLC-Formation ($39 + State-Fee)</strong>, ist
                      das <strong className="text-foreground">Registered-Agent-Jahr 1 GRATIS</strong> (danach $125/yr). Northwest filet
                      dann auch die Articles of Organization (Step 5) für dich — du sparst dir das
                      SOS-Portal komplett.
                    </p>
                  </div>
                  <p className="mt-4 text-sm font-semibold">Schritt für Schritt</p>
                  <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-foreground/80 marker:text-muted-foreground">
                    <li>Auf <ExtLink href="https://www.northwestregisteredagent.com" icon={false}>northwestregisteredagent.com</ExtLink> → „Form an LLC" (Formation) oder „Registered Agent Service" (nur RA).</li>
                    <li>Bundesstaat wählen ({stateInfo.name}) + LLC-Namen eingeben (aus Step 3).</li>
                    <li>Bei Formation: Member-/Manager-Daten + deine DE-Wohnadresse als Owner-Adresse (kein Problem, bleibt non-public bei WY).</li>
                    <li>Northwest setzt sich automatisch als Registered Agent ein — du musst keine US-Adresse haben.</li>
                    <li>Bezahlen per Kreditkarte (DE-Karte funktioniert; ~$39 + State-Fee bzw. $125 RA-only).</li>
                    <li>Im Dashboard bekommst du: RA-Adresse sofort, nach SOS-Approval (1–10 Tage) die <strong className="text-foreground">„stamped" Articles als PDF</strong> + EIN-Antrags-Hilfe.</li>
                    <li>Eingehende Behördenpost erscheint gescannt im Dashboard — kein physisches Forwarding nötig.</li>
                    <li>Renewal: jährlich automatisch $125, Erinnerung per Mail.</li>
                  </ol>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    Bei einer reinen <strong>Wyoming-LLC</strong> ist <strong>Wyoming Registered Agent Inc</strong>{" "}
                    (~$25-50/yr) gleichwertig bis günstiger — WY-nativ, gleicher Ablauf. Northwest punktet
                    v.a. bei mehreren Staaten / Formation-aus-einer-Hand. <strong>Harbor</strong> ($89) wenn du
                    die Articles selbst filest und nur den RA brauchst.
                  </p>
                </div>

                <Callout tone="info" title="Tipp: Registered Agent zuerst buchen">
                  Adresse + Receipt brauchst du für Articles of Organization (nächster Schritt). Mit dem Formation-Paket oben
                  fällt dieser Schritt ohnehin mit Step 5 zusammen.
                </Callout>

                {/* Mailing-Adresse / Virtual Mailbox */}
                <div className="rounded-xl border border-border bg-secondary/40 p-4 md:p-5">
                  <h3 className="flex items-center gap-2 text-sm font-semibold">
                    <Mailbox className="h-4 w-4 text-accent-blue" aria-hidden="true" /> US-Mailing-Adresse (nicht der Registered Agent)
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Die Registered-Agent-Adresse ist NUR für Behörden-/Gerichtspost — sie leitet dir
                    weder Bank-Post, Debit-Karten, Stripe-Briefe noch Pakete zuverlässig weiter. Für eine
                    echte US-Geschäftsadresse (Stripe-Onboarding, Bank-Statements, Karten-Versand,
                    Lieferanten) brauchst du eine <strong className="text-foreground">Virtual Mailbox (CMRA)</strong> mit echter
                    Street-Address.
                  </p>
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {[
                      { name: "Stable (usestable.com)", note: "Für Startups gebaut, echte Street-Address (kein PO-Box), Check-Deposit, Online-Notar für Form 1583. ~$25-50/Mo.", url: "https://www.usestable.com" },
                      { name: "US Global Mail", note: "Etabliert, Houston-TX-Adresse, Paket-Forwarding nach DE. ~$15-20/Mo.", url: "https://www.usglobalmail.com" },
                      { name: "Anytime Mailbox", note: "Günstigste Option, viele Städte ab ~$10/Mo, App-basiert.", url: "https://www.anytimemailbox.com" },
                      { name: "iPostal1", note: "3.000+ Adressen US-weit, gute App, Paket-Annahme.", url: "https://ipostal1.com" },
                    ].map((o) => (
                      <div key={o.name} className="rounded-lg border border-border bg-card p-3 text-sm">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold">{o.name}</span>
                          <ExtLink href={o.url} className="text-xs">Website</ExtLink>
                        </div>
                        <p className="mt-1 text-muted-foreground">{o.note}</p>
                      </div>
                    ))}
                  </div>
                  <Callout tone="warning" title="Pflicht: USPS Form 1583" className="mt-3">
                    Alle CMRAs verlangen <strong>USPS Form 1583</strong> + 2 Ausweise (Online-Notar aus DE OK). Nimm IMMER eine
                    echte Street-Address — <strong>PO-Box wird von Mercury & Stripe abgelehnt</strong>.
                  </Callout>
                </div>
              </div>
            )}

            {/* STEP 5: Articles of Organization */}
            {step === 5 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  Der eigentliche Gründungsakt. Wird beim {stateInfo.name} SOS eingereicht und kostet{" "}
                  <span className="tabular">${stateInfo.filingFee}</span>.
                </p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  {[
                    { v: "diy" as const, l: "DIY (Online-Filing)", d: `Selbst beim ${stateInfo.name} SOS einreichen. Bearbeitung 5-15 Werktage.`, price: `$${stateInfo.filingFee}` },
                    { v: "agent" as const, l: "Via Registered Agent", d: "Northwest/Harbor übernehmen Filing — meist 1-3 Werktage Express-Service möglich.", price: `$${stateInfo.filingFee} + $50-100 Service` },
                    { v: "lawyer" as const, l: "Via US-Anwalt", d: "Für Multi-Member / komplexe Setups. Inkl. Operating Agreement.", price: `$500-1.500` },
                  ].map((o) => (
                    <OptionCard key={o.v} active={filingMethod === o.v} onClick={() => setFilingMethod(o.v)}>
                      <span className="block font-semibold">{o.l}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{o.d}</span>
                      <span className="mt-2 block text-sm font-semibold text-accent-blue tabular">{o.price}</span>
                    </OptionCard>
                  ))}
                </div>

                <InfoList
                  title="Was in den Articles of Organization steht"
                  items={[
                    'LLC-Name (mit "LLC"-Suffix)',
                    "Registered Agent + Adresse (aus Step 4)",
                    "Principal Office Address (kann = Registered Agent-Adresse sein)",
                    "Member-/Manager-Struktur (Member-Managed vs Manager-Managed)",
                    "Effective Date (sofort oder Future-Date)",
                    'Duration (in der Regel "perpetual")',
                    "Organizer (= du oder Registered Agent)",
                  ]}
                />

                <Callout tone="success" title="Ergebnis: Stamped Articles (PDF) vom SOS">
                  Werden für den EIN-Antrag und die Kontoeröffnung gebraucht.
                </Callout>

                <a href={stateInfo.filingUrl} target="_blank" rel="noreferrer noopener" className={buttonVariants()}>
                  <ExternalLink aria-hidden="true" /> {stateInfo.name} SOS Filing-Portal
                </a>
              </div>
            )}

            {/* STEP 6: Operating Agreement */}
            {step === 6 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  Pflicht in DE/CA/NY/MO, dringend empfohlen in allen anderen Staaten. Regelt Member-Rechte, Profit-Splits und
                  Auflösung.
                </p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  {[
                    { v: "template" as const, l: "Template nutzen", d: "LegalZoom, Rocket Lawyer, IncFile — Vorlage anpassen. Für Single-Member i.O.", price: "$0-50" },
                    { v: "lawyer" as const, l: "Anwalt", d: "Für Multi-Member, komplexe Profit-Splits, VC-Vorbereitung", price: "$500-2.000" },
                    { v: "skip" as const, l: "Skip (riskant)", d: "Wenn dein Staat es nicht Pflicht macht. Aber: Bank verlangt OA für Konto!", price: "$0" },
                  ].map((o) => (
                    <OptionCard key={o.v} active={operatingAgreementMode === o.v} onClick={() => setOperatingAgreementMode(o.v)}>
                      <span className="block font-semibold">{o.l}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{o.d}</span>
                      <span className="mt-2 block text-sm font-semibold text-accent-blue tabular">{o.price}</span>
                    </OptionCard>
                  ))}
                </div>

                <InfoList
                  title="Was im Operating Agreement steht (Single-Member)"
                  items={[
                    "Member-Name + Ownership-Anteil (100%)",
                    "Capital Contributions (Initial-Investment)",
                    "Distribution-Rules (wie Profit/Loss aufgeteilt)",
                    "Management-Struktur (Member-Managed)",
                    "Dissolution-Bedingungen",
                    "Steuerlicher Status (Disregarded Entity bei Single-Member-LLC)",
                  ]}
                />

                <Callout tone="warning" title="Wichtig: Banken verlangen das Operating Agreement">
                  Mercury/Wise/Relay verlangen das Operating Agreement bei Konto-Eröffnung. Auch bei Single-Member-LLC nicht
                  skippen!
                </Callout>

                <div className="flex flex-wrap gap-2">
                  <a href="https://www.legalzoom.com/business/business-operations/llc-operating-agreement" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
                    LegalZoom Template <ExternalLink aria-hidden="true" />
                  </a>
                  <a href="https://www.rocketlawyer.com/business-and-contracts/business-operations/operating-agreement" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
                    Rocket Lawyer <ExternalLink aria-hidden="true" />
                  </a>
                </div>
              </div>
            )}

            {/* STEP 7: EIN */}
            {step === 7 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  Pflicht: Tax-ID per Form SS-4. Nötig für Banking, Steuer-Filings und Vendor-Beziehungen.
                </p>
                <div>
                  <p className="mb-2 text-sm font-medium">Deine Ausgangslage</p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {[
                      { v: true, l: "Ich habe eine SSN/ITIN" },
                      { v: false, l: "Keine SSN, als Foreign Founder" },
                    ].map((o) => (
                      <OptionCard key={String(o.v)} active={hasSSN === o.v} onClick={() => setHasSSN(o.v)}>
                        <span className="block font-medium">{o.l}</span>
                      </OptionCard>
                    ))}
                  </div>
                </div>
                {hasSSN ? (
                  <Callout tone="success" title="Online über das IRS-Portal (unter 15 Minuten)">
                    <ExtLink href="https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online">
                      EIN Online
                    </ExtLink>
                    . Du bekommst CP575-Brief sofort als PDF.
                  </Callout>
                ) : (
                  <div className="rounded-xl border border-warning/25 bg-warning-soft p-4">
                    <p className="text-sm font-semibold">Foreign-Founder-Pfad: drei Wege zur EIN</p>
                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                      <WegKachel icon={Phone} title="Telefon" dauer="1-2 Werktage">
                        IRS International Line{" "}
                        <a href="tel:+12679411099" className="font-medium text-accent-blue hover:underline tabular">+1-267-941-1099</a>
                        {" "}— Mo-Fr 6:00-23:00 ET. Vorab SS-4 ausfüllen, anrufen, EIN sofort am Telefon.
                      </WegKachel>
                      <WegKachel icon={Printer} title="Fax" dauer="4-6 Wochen">
                        <span className="tabular">+1-855-641-6935</span> (international)
                      </WegKachel>
                      <WegKachel icon={Mail} title="Brief" dauer="8+ Wochen">
                        Internal Revenue Service, Attn: EIN International Operation, Cincinnati, OH 45999, USA
                      </WegKachel>
                    </div>
                    <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
                      <li>
                        <strong className="text-foreground">Form SS-4:</strong>{" "}
                        <ExtLink href="https://www.irs.gov/pub/irs-pdf/fss4.pdf">PDF herunterladen</ExtLink>
                      </li>
                      <li>
                        <strong className="text-foreground">Zeile 7b:</strong> KOMPLETT LEER lassen wenn keine SSN/ITIN — nicht "N/A"!
                      </li>
                      <li>
                        <strong className="text-foreground">Zeile 9a:</strong> "LLC" ankreuzen · <strong className="text-foreground">Zeile 10:</strong> "Banking purposes"
                      </li>
                      <li>
                        <strong className="text-foreground">Schneller über einen Dienstleister als Third Party Designee</strong> (eigener Abschnitt auf dem SS-4, darf die EIN für dich beantragen und empfangen). Form 8821 berechtigt nur zur Einsicht, nicht zur Beantragung.
                      </li>
                    </ul>
                  </div>
                )}
                <div>
                  <p className="mb-2 text-sm font-medium">Brauche ich eine ITIN?</p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {[
                      { v: false, l: "Nein (Single-Member-LLC, Disregarded Entity)" },
                      { v: true, l: "Ja (Multi-Member oder spezielle Sit.)" },
                    ].map((o) => (
                      <OptionCard key={String(o.v)} active={needsItin === o.v} onClick={() => setNeedsItin(o.v)} compact>
                        <span className="block text-sm font-medium">{o.l}</span>
                      </OptionCard>
                    ))}
                  </div>
                  {needsItin && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      ITIN-Antrag via Form W-7 + beglaubigte Pass-Kopie (Acceptance Agent in DE oder US-Botschaft).
                      Adresse: <strong className="text-foreground">IRS, ITIN Operation, P.O. Box 149342, Austin, TX 78714-9342</strong>.
                      Bearbeitung 3-4 Monate.
                    </p>
                  )}
                </div>

                <Callout tone="info" title={"Begriffsklärung „TIN“"}>
                  <ul className="list-disc space-y-1 pl-4">
                    <li><strong>TIN</strong> (Taxpayer Identification Number) ist der Oberbegriff. Wenn Stripe/Bank nach der „US Tax ID / TIN" deiner Firma fragt, meinen sie die <strong>EIN</strong>.</li>
                    <li>Deine LLC-TIN = <strong>EIN</strong> (Employer Identification Number, oben beantragt).</li>
                    <li>Deine persönliche US-TIN = <strong>SSN</strong> (falls vorhanden) oder <strong>ITIN</strong> für Nicht-Residenten.</li>
                    <li>Single-Member-LLC (Disregarded Entity): fürs Banking reicht i.d.R. die EIN — die ITIN brauchst du nur, wenn du selbst eine US-Steuererklärung abgeben musst.</li>
                  </ul>
                </Callout>
              </div>
            )}

            {/* STEP 8: BOI-Status 2026 */}
            {step === 8 && (
              <div className="space-y-4">
                <div className="rounded-xl border border-success/30 bg-success-soft p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success text-primary-foreground">
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold">Update 26.3.2025: BOI-Reporting für US-LLCs nicht mehr Pflicht</p>
                      <p className="mt-1 text-sm text-foreground/80">
                        FinCEN hat am 26.3.2025 einen <strong>Interim Final Rule</strong> veröffentlicht,
                        der ALLE US-LLCs (auch mit ausländischen Beneficial Owners wie DE-Founders) komplett
                        vom Beneficial-Ownership-Information-Reporting (CTA) AUSGENOMMEN hat.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border p-4">
                  <p className="text-sm font-semibold">Was bedeutet das konkret für dich?</p>
                  <ul className="mt-3 divide-y divide-border/70 text-sm">
                    <BoiZeile tone="success" titel="Neue US-LLC gründen">KEIN BOI-Filing nötig</BoiZeile>
                    <BoiZeile tone="success" titel="Bestehende US-LLC (vor 2025)">
                      Alte BOI-Filings sind weiter gültig, aber keine Updates/Re-Filings nötig
                    </BoiZeile>
                    <BoiZeile tone="warning" titel="Foreign-Entity in USA registriert">
                      BLEIBT meldepflichtig — aber nur die nicht-US Beneficial Owners
                    </BoiZeile>
                    <BoiZeile tone="success" titel={'Bußgeld-Drohung "$591/Tag"'}>für US-LLCs NICHT mehr aktiv</BoiZeile>
                  </ul>
                </div>

                <Callout tone="warning" title="Im Blick behalten">
                  Status kann sich politisch wieder ändern. Rechtslage Mai 2026 ist stabil aber: prüfe vor Setup nochmal auf{" "}
                  <ExtLink href="https://www.fincen.gov/boi" icon={false}>fincen.gov/boi</ExtLink>.
                </Callout>
              </div>
            )}

            {/* STEP 9: W-8BEN (Eigentümer) */}
            {step === 9 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  Kein Filing beim IRS, sondern ein Formular, das US-Vendoren von dir verlangen werden (Stripe, Amazon
                  Affiliate, Upwork, SaaS-Tools). Deine Single-Member-LLC ist steuerlich „disregarded“ und gibt KEIN eigenes
                  W-8BEN-E ab (laut IRS-Instructions zum W-8BEN-E nicht für Disregarded Entities). Du als ausländischer Eigentümer
                  gibst ein <strong className="text-foreground">W-8BEN (Individual)</strong> auf deinen Namen ab. Ein W-8BEN-E mit
                  Gründungsland USA ist widersprüchlich und wird abgelehnt; US-Rechtsträger nutzen sonst das W-9.
                </p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <InfoList
                    title="Wann brauchst du es?"
                    items={[
                      "Stripe US fragt danach bei Account-Aktivierung",
                      "Amazon Associates / Affiliate-Programme",
                      "Upwork / Fiverr für US-Vendor-Verträge",
                      "SaaS-Tools (Webflow, Notion etc.) für DBA-Anwendung",
                      "Jede ACH-Payment-Beziehung mit US-Empfänger",
                    ]}
                  />
                  <InfoList
                    title="Was rein muss"
                    items={[
                      "Zeile 1: dein Name (natürliche Person, nicht die LLC)",
                      "Zeile 2: Staatsangehörigkeit, z. B. Germany",
                      "Zeile 3: Permanent Residence Address (DE-Wohnsitz, keine US- oder c/o-Adresse)",
                      "Zeile 5: US-TIN nur falls vorhanden (SSN/ITIN) — die EIN der LLC gehört nicht hierher",
                      "Zeile 6a: Foreign TIN = deine deutsche Steuer-ID",
                      "Zeile 7: Referenz, z. B. Name und EIN der LLC (Step 7)",
                      "Part II: Ansässigkeit Germany + DBA-Artikel, falls ein ermäßigter Satz beansprucht wird",
                      "Part III: Signature",
                    ]}
                  />
                </div>

                <Callout tone="info" title="Tipp: drei Jahre gültig">
                  Das W-8BEN gilt bis Ende des dritten Kalenderjahres nach Unterschrift. Speicher das ausgefüllte PDF zentral — du wirst es immer wieder hochladen müssen.
                  W-8BEN-E brauchst du nur, wenn eine ausländische Kapitalgesellschaft (z. B. deine GmbH) Eigentümerin der LLC ist.
                </Callout>

                <div className="flex flex-wrap gap-2">
                  <a href="https://www.irs.gov/pub/irs-pdf/fw8ben.pdf" target="_blank" rel="noopener noreferrer" className={buttonVariants()}>
                    <ExternalLink aria-hidden="true" /> W-8BEN PDF
                  </a>
                  <a href="https://www.irs.gov/pub/irs-pdf/iw8ben.pdf" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline" })}>
                    Instructions PDF
                  </a>
                </div>
              </div>
            )}

            {/* STEP 10: Bank + Compliance */}
            {step === 10 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  Mercury, Wise Business und Relay gehen komplett remote. Dazu richtest du hier die jährlichen Pflichten ein.
                </p>

                <div>
                  <p className="mb-2 text-sm font-medium">Bank-Auswahl</p>
                  <div className="space-y-2">
                    {[
                      { v: "mercury" as const, name: "Mercury", fee: "$0/Mon", note: "Speziell für Tech-/Online-Brands. Akzeptiert non-US Founder. Beste All-Round-Wahl.", url: "https://mercury.com" },
                      { v: "wise" as const, name: "Wise Business", fee: "$31 einmalig (US)", note: "Multi-Currency-Konto. Kein klassisches US-Bank-Konto, aber USD-IBAN + ACH-Routing.", url: "https://wise.com/business" },
                      { v: "relay" as const, name: "Relay", fee: "$0/Mon", note: "Beste Buchhaltungs-Integration (QuickBooks, Xero).", url: "https://relayfi.com" },
                    ].map((o) => (
                      <OptionCard key={o.v} active={bankPreference === o.v} onClick={() => setBankPreference(o.v)}>
                        <span className="flex items-start justify-between gap-3">
                          <span className="min-w-0">
                            <span className="flex flex-wrap items-center gap-2 font-semibold">
                              {o.name}
                              {o.v === "mercury" && <ToneBadge tone="success">Empfehlung</ToneBadge>}
                            </span>
                            <span className="mt-0.5 block text-sm text-muted-foreground">{o.note}</span>
                          </span>
                          <span className="shrink-0 text-sm font-semibold tabular">{o.fee}</span>
                        </span>
                        <a
                          href={o.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:underline"
                        >
                          Website <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        </a>
                      </OptionCard>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-secondary/40 p-4">
                  <h3 className="flex items-center gap-2 text-sm font-semibold">
                    <CreditCard className="h-4 w-4 text-accent-blue" aria-hidden="true" /> Debit- und Kreditkarten zur LLC
                  </h3>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <li><strong className="text-foreground">Mercury:</strong> sofort unbegrenzt virtuelle Debit-Mastercards + physische Karte (Versand weltweit). <strong>Mercury IO Credit Card</strong> (1,5% Cashback) sobald Guthaben da ist — ohne Personal Guarantee, durch Saldo gedeckt.</li>
                    <li><strong className="text-foreground">Wise Business:</strong> physische + virtuelle Wise-Debit-Mastercard, Ausgaben in 40+ Währungen mit Echtkurs. Ideal für globale Ad-Spends/Lieferanten.</li>
                    <li><strong className="text-foreground">Relay:</strong> bis zu 50 virtuelle + physische Visa-Debitkarten — gut zum Trennen von Ad-Konten/Team-Ausgaben.</li>
                    <li><strong className="text-foreground">Klassische US-Kreditkarten</strong> (Amex/Chase) brauchen SSN + US-Credit-History → früh unrealistisch. Mercury IO oder Brex sind die nächste Stufe (Brex lehnt kleine non-VC-LLCs oft ab).</li>
                  </ul>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Karten gehen an deine Virtual-Mailbox-Adresse (Step 4), nicht an den Registered Agent.
                  </p>
                </div>

                <div className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Was du bereithältst:</strong> EIN-Brief (CP575), Articles of Organization
                    (Stamped), Operating Agreement, Pass, Adress-Nachweis (DE-Anmeldung OK), Geschäftsmodell-Beschreibung.
                  </p>
                  <Link to="/cockpit/intl-banking" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "shrink-0")}>
                    Banking-Vergleich mit Closure-Risk <ArrowRight aria-hidden="true" />
                  </Link>
                </div>

                {/* Jährliche Pflichten */}
                <div className="rounded-xl border border-danger/30 bg-danger-soft p-4 md:p-5">
                  <h3 className="flex items-center gap-2 text-sm font-semibold">
                    <AlertTriangle className="h-4 w-4 text-danger" aria-hidden="true" /> Jährliche Pflichten: die 25.000-Dollar-Falle
                  </h3>
                  <ul className="mt-3 space-y-3 text-sm text-foreground/80">
                    <li>
                      <strong className="text-foreground">Form 5472 + Pro-Forma Form 1120</strong> bis 15.04.
                      (mit Form 7004 verlängerbar bis 15.10.): JÄHRLICHE Pflicht für Single-Member-LLC mit
                      ausländischem Owner. <strong className="text-danger">$25.000 Strafe</strong> bei
                      Versäumnis! Adresse:{" "}
                      <em>Internal Revenue Service, 1973 Rulon White Blvd., M/S 6112, Attn: PIN Unit, Ogden, UT 84201</em>
                      <span className="mt-1 block text-muted-foreground">CPA-Service ~$300-500/Jahr.</span>
                    </li>
                    <li>
                      <strong className="text-foreground">Annual Report</strong> beim {stateInfo.name} SOS
                      (Anniversary-Datum) — Fee <span className="tabular">${stateInfo.annualFee}</span>
                    </li>
                    <li>
                      <strong className="text-foreground">Registered Agent Renewal</strong> jährlich
                    </li>
                    <li>
                      <strong className="text-foreground">Sales-Tax-Nexus-Check:</strong>{" "}
                      <Link to="/cockpit/sales-tax-nexus" className="font-medium text-accent-blue underline-offset-2 hover:underline">
                        Tool öffnen
                      </Link>
                      {" "}— wenn FBA-Inventar in US-Staat → sofortiger Nexus ab $0!
                    </li>
                    <li>
                      <strong className="text-foreground">DE-Steuer:</strong> Ob die LLC in DE transparent oder als Kapitalgesellschaft
                      behandelt wird, entscheidet der Typenvergleich (BMF-Schreiben vom 19.03.2004), nicht die US-Einstufung „disregarded“.
                      Wird die LLC von DE aus geführt, liegt der Ort der Geschäftsleitung in DE (§10 AO) — bei Einstufung als
                      Kapitalgesellschaft drohen unbeschränkte KSt- und GewSt-Pflicht in DE, sonst Einkünfte aus Gewerbebetrieb. Steuerberatung zwingend.{" "}
                      Siehe <Link to="/cockpit/dba-cfc" className="font-medium text-accent-blue underline-offset-2 hover:underline">DBA-CFC-Rechner</Link>.
                    </li>
                    <li>
                      <strong className="text-foreground">State Tax Registration:</strong> nur wenn aktive
                      Tätigkeit im State (Income Sourcing). Wyoming und South Dakota: keine State Income Tax. New Mexico erhebt
                      Einkommensteuer, aber nur auf Einkünfte aus Quellen in NM.
                    </li>
                  </ul>
                </div>

                {/* Summary */}
                <section aria-live="polite" className="overflow-hidden rounded-2xl bg-ink p-5 text-primary-foreground shadow-soft md:p-6">
                  <p className="text-sm font-medium text-brand-green-glow">Setup-Zusammenfassung</p>
                  <h3 className="mt-1 text-base font-semibold">
                    {llcName || "Deine LLC"} in {stateInfo.name}
                  </h3>
                  <div className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2">
                    <div className="bg-white/[0.04] p-4">
                      <p className="text-xs text-primary-foreground/65">Setup-Kosten Jahr 1</p>
                      <p className="mt-1 text-3xl font-semibold tracking-tight tabular">${totalCost1.total.toLocaleString("en-US")}</p>
                      <p className="mt-1 text-xs text-primary-foreground/65 tabular">
                        Filing ${totalCost1.filing} + Agent ${totalCost1.agent} + CPA Form 5472 ${totalCost1.cpaFor5472}
                      </p>
                    </div>
                    <div className="bg-white/[0.04] p-4">
                      <p className="text-xs text-primary-foreground/65">Laufende Kosten ab Jahr 2</p>
                      <p className="mt-1 text-3xl font-semibold tracking-tight tabular">
                        ${(stateInfo.annualFee + totalCost1.agent + totalCost1.cpaFor5472).toLocaleString("en-US")}
                        <span className="text-base font-normal text-primary-foreground/65">/Jahr</span>
                      </p>
                      <p className="mt-1 text-xs text-primary-foreground/65">State-Fee, Registered Agent und CPA</p>
                    </div>
                  </div>
                  <Link
                    to="/playbook/preview/us-llc"
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-white/15"
                  >
                    <BookOpen className="h-4 w-4" aria-hidden="true" /> Komplettes Playbook öffnen
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </section>
              </div>
            )}

            {/* === NAVIGATION === */}
            <div className="mt-6 flex items-center justify-between gap-3 border-t border-border/70 pt-5">
              <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
                <ArrowLeft aria-hidden="true" /> Zurück
              </Button>
              <span className="text-sm text-muted-foreground tabular">
                {step} / {totalSteps}
              </span>
              {step < totalSteps ? (
                <Button onClick={() => setStep(step + 1)}>
                  Weiter <ArrowRight aria-hidden="true" />
                </Button>
              ) : (
                <span className="w-[104px]" aria-hidden="true" />
              )}
            </div>
          </ToolSection>

          {/* === Stand-Mai-2026-Notiz === */}
          <ToolSection title="Wichtige Updates Mai 2026" icon={FileText}>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                "BOI (CTA) für US-LLCs NICHT MEHR PFLICHT seit FinCEN Interim Final Rule 26.3.2025",
                "Form 5472 + 1120 BLEIBT jährliche Pflicht (Foreign-Owned Single-Member-LLC, $25k Strafe)",
                "BMF-Sofortabschreibung Computer/Software für deutsche Steuer relevant",
                "Sales-Tax: Lagerbestand in einem US-Staat (z. B. FBA-Lager) begründet dort in der Regel physischen Nexus — unabhängig von Umsatzschwellen",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </ToolSection>
        </div>
      </div>
    </CockpitShell>
  );
};

/* ------------------------------------------------------------------ Darstellung */

const STEP_TITLES = [
  "Use-Case definieren",
  "Bundesstaat wählen",
  "LLC-Name und Verfügbarkeit prüfen",
  "Registered Agent buchen",
  "Articles of Organization einreichen",
  "Operating Agreement erstellen",
  "EIN beim IRS beantragen",
  "BOI-Status (Stand Mai 2026)",
  "W-8BEN des Eigentümers für Vendor-Beziehungen",
  "US-Bankkonto und jährliche Compliance",
];

const STEP_ICONS: ElementType[] = [Target, MapPin, Tag, Building2, Stamp, ScrollText, Fingerprint, ShieldCheck, FileText, Landmark];

const STATE_KUERZEL: Record<State, string> = {
  wyoming: "WY",
  delaware: "DE",
  "new-mexico": "NM",
  florida: "FL",
  nevada: "NV",
};

const OptionCard = ({
  active,
  onClick,
  disabled,
  compact = false,
  children,
}: {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  compact?: boolean;
  children: ReactNode;
}) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "relative block w-full rounded-xl border text-left text-foreground transition-[background-color,border-color,box-shadow] duration-200 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-55 disabled:active:translate-y-0",
      compact ? "px-3.5 py-2.5" : "p-4",
      active
        ? "border-accent-blue bg-accent shadow-[0_0_0_1px_hsl(var(--accent-blue)/0.35)]"
        : "border-border bg-card hover:border-foreground/25",
    )}
  >
    {children}
  </button>
);

const ScoreBar = ({ label, value }: { label: string; value: number }) => (
  <span className="block">
    <span className="flex items-baseline justify-between text-xs text-muted-foreground">
      {label} <span className="font-semibold text-foreground tabular">{value}</span>
    </span>
    <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
      <span className="block h-full rounded-full bg-accent-blue" style={{ width: `${value}%` }} />
    </span>
  </span>
);

const ExtLink = ({
  href,
  children,
  icon = true,
  className,
}: {
  href: string;
  children: ReactNode;
  icon?: boolean;
  className?: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn("inline-flex items-center gap-1 font-medium text-accent-blue underline-offset-2 hover:underline", className)}
  >
    {children}
    {icon && <ExternalLink className="h-3 w-3" aria-hidden="true" />}
  </a>
);

const CheckItem = ({ n, title, children }: { n: number; title: string; children: ReactNode }) => (
  <li className="flex gap-3 rounded-xl border border-border p-4">
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-blue tabular">
      {n}
    </span>
    <div className="min-w-0 text-sm">
      <p className="font-semibold">{title}</p>
      <p className="mt-0.5 text-muted-foreground">{children}</p>
    </div>
  </li>
);

const InfoList = ({ title, items }: { title: string; items: string[] }) => (
  <div className="rounded-xl border border-border bg-secondary/40 p-4">
    <p className="text-sm font-semibold">{title}</p>
    <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
      {items.map((t) => (
        <li key={t} className="flex gap-2">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-blue" aria-hidden="true" />
          {t}
        </li>
      ))}
    </ul>
  </div>
);

const WegKachel = ({ icon: Icon, title, dauer, children }: { icon: ElementType; title: string; dauer: string; children: ReactNode }) => (
  <div className="rounded-lg border border-border bg-card p-3 text-sm">
    <p className="flex items-center gap-2 font-semibold">
      <Icon className="h-4 w-4 text-accent-blue" aria-hidden="true" /> {title}
    </p>
    <p className="mt-0.5 text-xs text-muted-foreground">{dauer}</p>
    <p className="mt-2 text-foreground/80">{children}</p>
  </div>
);

const BoiZeile = ({ tone, titel, children }: { tone: "success" | "warning"; titel: string; children: ReactNode }) => (
  <li className="flex gap-3 py-2.5">
    {tone === "success" ? (
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
    ) : (
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
    )}
    <span>
      <strong className="font-semibold">{titel}:</strong> <span className="text-muted-foreground">{children}</span>
    </span>
  </li>
);

export default UsLlcWizard;
