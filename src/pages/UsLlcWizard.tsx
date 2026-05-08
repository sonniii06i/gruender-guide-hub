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
  Calculator,
  Shield,
  Sparkles,
} from "lucide-react";

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
    annualFeeLabel: "Annual Report ($60 min, ggf. mehr)",
    privacyScore: 95,
    taxScore: 95,
    vcScore: 70,
    bestFor: "Solo-LLC mit höchster Privacy + niedrigsten Lifetime-Kosten",
    pros: [
      "**Beste Privacy** — keine Member-Disclosure im Public Record",
      "$100 Filing + $60/Jahr = günstigste Lifetime-Kosten der Top-Staaten",
      "Strongest Charging Order Protection (Schutz vor Privat-Gläubigern)",
      "Keine Income Tax, keine Franchise Tax, keine Capital Gains Tax (auf State-Ebene)",
      "Etabliertes Wyoming-LLC-Standing, von US-Banken akzeptiert",
    ],
    cons: [
      "VC/Investor weniger vertraut (DE/CA bekannter)",
      "Keine Stadt mit Gründer-Hub — alles remote",
    ],
    registeredAgentMin: 89,
    notes: [
      "Wyoming SOS Adresse: 122 W 25th St, Suite 100, Cheyenne, WY 82002-0020",
      "Annual Report fällig zum Anniversary-Date der Gründung",
    ],
    filingUrl: "https://wyobiz.wyo.gov/Business/RegistrationInstr.aspx",
  },
  delaware: {
    flag: "💼",
    name: "Delaware",
    fullName: "Delaware LLC",
    filingFee: 90,
    annualFee: 300,
    annualFeeLabel: "$300 Franchise Tax (auch bei 0 € Umsatz)",
    privacyScore: 80,
    taxScore: 70,
    vcScore: 100,
    bestFor: "VC-finanzierte Startups (Investoren erwarten Delaware)",
    pros: [
      "**VC-Standard** — fast alle US-Startups + 60 % der Fortune 500 in Delaware",
      "Stärkste Court of Chancery (separates Wirtschafts-Gericht für Corp-Streit)",
      "Investoren akzeptieren Delaware-LLCs ohne Diskussion",
      "Tax Haven für Out-of-State-Income (Delaware besteuert nur DE-Income)",
      "Sehr Investor-/M&A-friendly Rechtsprechung",
    ],
    cons: [
      "**$300/Jahr Franchise Tax** auch ohne Umsatz",
      "$90 Filing-Fee (höher als Wyoming, niedriger als CA)",
      "Privacy etwas geringer als Wyoming (Member-Daten teilweise public)",
      "Bei Einzel-Solo-LLC ohne VC-Pläne: Wyoming meist günstiger",
    ],
    registeredAgentMin: 89,
    notes: [
      "Adresse Division of Corporations: 401 Federal Street, Suite 4, Dover, DE 19901",
      "Franchise Tax fällig 1. Juni jedes Jahr",
      "Wenn du C-Corp brauchst (Y Combinator, US-VC): zwingend Delaware",
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
    bestFor: "Maximaler Cost-Saver — günstigste Lifetime-Cost der USA",
    pros: [
      "**$50 Filing + $0/Jahr** — günstigste Setup + 0 lfd. Kosten",
      "**KEIN Annual Report** — du musst nie etwas filen außer Steuer",
      "Hohe Privacy (Member-Daten nicht public)",
      "Klein, regulatorisch entspannt",
    ],
    cons: [
      "**Selten bei US-Banken** — manche akzeptieren NM-LLCs nicht (Mercury, Wise schon)",
      "Kein VC-Standing — Investoren werden Re-Domestic verlangen",
      "Weniger entwickelte LLC-Rechtsprechung",
    ],
    registeredAgentMin: 89,
    notes: ["Adresse SOS: 325 Don Gaspar, Santa Fe, NM 87501", "Beste Wahl wenn Lifetime-Cost wichtigste Metrik"],
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
    bestFor: "Wenn du tatsächlich in FL lebst oder physisches Geschäft dort hast",
    pros: [
      "Keine Income Tax in Florida (auch privat)",
      "Etabliert + großer Markt",
      "Wenn du in FL umziehst: kein Steuer-Hit auf Privat-Einkommen",
    ],
    cons: [
      "Privacy schwächer (FL veröffentlicht Member-Liste)",
      "Höhere Annual Fee als Wyoming",
      "Bei reinem Online-Geschäft ohne FL-Bezug: Wyoming/NM besser",
    ],
    registeredAgentMin: 89,
    notes: ["Adresse: Florida Department of State, P.O. Box 6327, Tallahassee, FL 32314"],
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
    bestFor: "Hohe Privacy + große Geschäfts-Substanz in NV (Las Vegas, Reno)",
    pros: [
      "Sehr hohe Privacy (vergleichbar Wyoming)",
      "Keine State Income Tax",
      "Stark business-friendly Court System",
    ],
    cons: [
      "**Hohe Setup + Annual Fees** ($425 + $350) — teuerstes Setup in dieser Liste",
      "Nur sinnvoll bei tatsächlicher NV-Substanz",
    ],
    registeredAgentMin: 99,
    notes: ["Adresse: Secretary of State Nevada, 202 N. Carson St, Carson City, NV 89701"],
    filingUrl: "https://www.nvsos.gov",
  },
};

const UsLlcWizard = () => {
  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState<State>("wyoming");
  const [llcName, setLlcName] = useState("");
  const [registeredAgent, setRegisteredAgent] = useState<"northwest" | "harbor" | "cloud-peak" | "diy">("northwest");
  const [hasSSN, setHasSSN] = useState(false);
  const [needsItin, setNeedsItin] = useState(false);
  const [bankPreference, setBankPreference] = useState<"mercury" | "wise" | "relay">("mercury");

  const stateInfo = STATES[selectedState];

  const totalCost1 = useMemo(() => {
    const filing = stateInfo.filingFee;
    const agentFees = {
      northwest: 125,
      harbor: 89,
      "cloud-peak": 350,
      diy: 0,
    };
    const agent = agentFees[registeredAgent];
    const cpaFor5472 = 500; // Yearly Form 5472+1120
    return { filing, agent, cpaFor5472, total: filing + agent + cpaFor5472 };
  }, [stateInfo, registeredAgent]);

  return (
    <CockpitShell
      eyebrow="US-LLC-Wizard"
      title="US-LLC für non-US Founder gründen"
      subtitle="Step-by-Step: Bundesstaat wählen, Registered Agent buchen, EIN beantragen, BOI filen, Bank eröffnen. Mit echten Postadressen + Cost-Comparison."
    >
      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3, 4, 5, 6].map((s) => (
          <div key={s} className="flex items-center gap-1.5 flex-1">
            <div
              className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                s < step
                  ? "bg-emerald-500 text-white"
                  : s === step
                  ? "bg-accent-blue text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {s < step ? <CheckCircle2 className="h-3 w-3" /> : s}
            </div>
            {s < 6 && <div className={`h-0.5 flex-1 ${s < step ? "bg-emerald-500" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 mb-6">
        {step === 1 && (
          <>
            <h2 className="text-base font-bold mb-1">1. Bundesstaat wählen</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Klicke auf einen Staat für Detail-Vergleich.
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

        {step === 2 && (
          <>
            <h2 className="text-base font-bold mb-1">2. LLC-Name wählen</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Pflicht: Name muss "LLC" oder "L.L.C." enthalten. Verfügbarkeit beim {stateInfo.name} SOS prüfen.
            </p>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">LLC-Name (mit "LLC")</Label>
            <Input
              value={llcName}
              onChange={(e) => setLlcName(e.target.value)}
              placeholder="z.B. Acme Ventures LLC"
              className="mt-1 mb-3"
              autoFocus
            />
            <a
              href={stateInfo.filingUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-xs text-accent-blue hover:underline"
            >
              Verfügbarkeit beim {stateInfo.name} SOS prüfen <ExternalLink className="h-3 w-3" />
            </a>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 mt-3 text-xs">
              <strong>Tipp:</strong> Vor Filing den Markennamen auch über{" "}
              <Link to="/cockpit/check" className="text-accent-blue underline">
                Brand-Check
              </Link>{" "}
              prüfen — DPMA + EUIPO Marken-Konflikt vermeidet späteren Re-Brand.
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-base font-bold mb-1">3. Registered Agent buchen</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Pflicht: physische Adresse im Staat für Behörden-Post.
            </p>
            <div className="space-y-2">
              {[
                {
                  v: "northwest",
                  name: "Northwest Registered Agent",
                  price: "$125/yr",
                  note: "Branchen-Standard, Mail-Forwarding inklusive",
                  url: "https://www.northwestregisteredagent.com",
                },
                {
                  v: "harbor",
                  name: "Harbor Compliance",
                  price: "$89/yr",
                  note: "Günstigste seriöse Option",
                  url: "https://www.harborcompliance.com",
                },
                {
                  v: "cloud-peak",
                  name: "Cloud Peak Law (Wyoming)",
                  price: "$350+/yr",
                  note: "Mit Anonymous-Trust-Setup für maximale Privacy",
                  url: "https://www.cloudpeaklaw.com",
                },
                {
                  v: "diy",
                  name: "Selbst (nur wenn Sitz in USA)",
                  price: "$0",
                  note: "Du brauchst eine physische US-Adresse — bei DE-Wohnsitz NICHT möglich",
                  url: "",
                },
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => setRegisteredAgent(o.v as typeof registeredAgent)}
                  className={`w-full text-left rounded-xl border p-3 transition-colors ${
                    registeredAgent === o.v
                      ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                      : "border-border hover:border-accent-blue/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <div className="font-bold text-sm">{o.name}</div>
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
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-base font-bold mb-1">4. EIN beim IRS beantragen</h2>
            <p className="text-xs text-muted-foreground mb-4">Pflicht: Tax-ID via Form SS-4. Dauert 4–8 Wochen ohne SSN.</p>
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
                <a
                  href="https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-accent-blue hover:underline"
                >
                  EIN Online
                </a>
              </div>
            ) : (
              <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-3 text-xs space-y-2">
                <div>
                  <strong>Foreign Founder Pfad: Form SS-4 per Fax oder Brief</strong>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                  <li>
                    <strong>Fax (4–6 Wochen):</strong> +1-855-641-6935 (international)
                  </li>
                  <li>
                    <strong>Brief (8+ Wochen):</strong> Internal Revenue Service, Attn: EIN International Operation,
                    Cincinnati, OH 45999, USA
                  </li>
                  <li>
                    <strong>Form SS-4:</strong>{" "}
                    <a
                      href="https://www.irs.gov/pub/irs-pdf/fss4.pdf"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-accent-blue hover:underline inline-flex items-center gap-0.5"
                    >
                      PDF herunterladen <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                  <li>
                    <strong>Zeile 7b:</strong> KOMPLETT LEER lassen wenn keine SSN/ITIN — nicht "N/A" eintragen!
                  </li>
                  <li>
                    <strong>Zeile 9a:</strong> "LLC" ankreuzen · <strong>Zeile 10:</strong> "Banking purposes"
                  </li>
                  <li>
                    <strong>Schneller via CPA:</strong> US-Steuerberater + Form 8821 = EIN in 1–2 Werktagen
                    (Service-Cost ~$150–300)
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
                  ITIN-Antrag via Form W-7 + beglaubigte Pass-Kopie (durch Acceptance Agent in DE oder US-Botschaft).
                  Postanschrift: <strong>Internal Revenue Service, ITIN Operation, P.O. Box 149342, Austin, TX 78714-9342</strong>
                </div>
              )}
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h2 className="text-base font-bold mb-1">5. BOI-Report bei FinCEN</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Pflicht für ALLE neu gegründeten LLCs seit 2024. Frist: 30 Tage nach Gründung.
            </p>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 mb-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-semibold mb-1">Kritisch: Bußgeld bis $591/Tag bei Versäumnis</div>
                  <div className="text-muted-foreground">
                    Beneficial Ownership Information Report — wer kontrolliert die LLC. Online via FinCEN-Portal,
                    KOSTENLOS (keine Filing-Fee).
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-xs mb-3">
              <div className="font-semibold">Was du vorbereiten musst:</div>
              <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                <li>Pass-Kopie (PDF/JPG) — alle wirtschaftlich Berechtigten ≥ 25 %</li>
                <li>Pass-Foto-Page (Front)</li>
                <li>Vollständiger Name, Geburtsdatum, Wohnadresse</li>
                <li>Pass-Nummer + Ausstellungs-Land</li>
                <li>LLC-Name, EIN, Filing-Datum, Adresse (Registered Agent ist OK)</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://boiefiling.fincen.gov"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90"
              >
                <ExternalLink className="h-4 w-4" /> FinCEN BOI Portal
              </a>
              <a
                href="https://www.fincen.gov/boi-faqs"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary"
              >
                FAQ
              </a>
            </div>
            <div className="text-[11px] text-muted-foreground mt-3">
              Service-Anbieter (Cloud Peak Law, Northwest) erledigen BOI für $50–150 mit — empfohlen wenn du keine
              Lust auf das Filing selbst hast.
            </div>
          </>
        )}

        {step === 6 && (
          <>
            <h2 className="text-base font-bold mb-1">6. US-Bankkonto eröffnen</h2>
            <p className="text-xs text-muted-foreground mb-4">Mercury / Wise Business / Relay sind 100 % remote möglich.</p>
            <div className="space-y-2 mb-3">
              {[
                {
                  v: "mercury",
                  name: "Mercury",
                  fee: "$0/Mon",
                  note: "Speziell für Tech-/Online-Brands. Akzeptiert non-US Founder von 200+ Ländern.",
                  url: "https://mercury.com",
                },
                {
                  v: "wise",
                  name: "Wise Business",
                  fee: "$31 einmalig",
                  note: "Multi-Currency-Konto. Kein klassisches US-Bank-Konto, aber USD-IBAN + ACH-Routing.",
                  url: "https://wise.com/business",
                },
                {
                  v: "relay",
                  name: "Relay",
                  fee: "$0/Mon",
                  note: "Beste Buchhaltungs-Integration (QuickBooks, Xero). Ideal mit US-CPA.",
                  url: "https://relayfi.com",
                },
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => setBankPreference(o.v as typeof bankPreference)}
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
                    rel="noreferrer noopener"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[11px] text-accent-blue hover:underline inline-flex items-center gap-0.5 mt-1"
                  >
                    Website <ExternalLink className="h-3 w-3" />
                  </a>
                </button>
              ))}
            </div>
            <div className="text-[11px] text-muted-foreground mb-3">
              <strong>Was du bereithältst:</strong> EIN-Brief vom IRS (CP575), Articles of Organization (Stamped PDF),
              Operating Agreement, Pass, Adress-Nachweis, Geschäftsmodell-Beschreibung.
            </div>
            <Link
              to="/cockpit/intl-banking"
              className="inline-flex items-center gap-1 text-xs text-accent-blue hover:underline"
            >
              → Detaillierter Banking-Vergleich (US + HK)
            </Link>

            {/* Summary */}
            <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/5 p-5 mt-6">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-700" />
                Setup-Zusammenfassung
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase">Bundesstaat</div>
                  <div className="font-bold">
                    {stateInfo.flag} {stateInfo.name}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase">LLC-Name</div>
                  <div className="font-bold">{llcName || "—"}</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase">Setup-Kosten Jahr 1</div>
                  <div className="font-bold text-emerald-700">${totalCost1.total.toLocaleString("en-US")}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">
                    Filing ${totalCost1.filing} + Agent ${totalCost1.agent} + CPA ${totalCost1.cpaFor5472}
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

            {/* CTA Playbook */}
            <Link
              to="/playbook/preview/us-llc"
              className="inline-flex items-center gap-1 rounded-lg border border-accent-blue/30 bg-accent-blue/5 px-4 py-2 text-sm hover:bg-accent-blue/10 mt-4"
            >
              <Sparkles className="h-4 w-4 text-accent-blue" /> Kompletten Playbook öffnen
              <ArrowRight className="h-3 w-3" />
            </Link>
          </>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Zurück
          </button>
          {step < 6 && (
            <button
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90"
            >
              Weiter <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Pflicht-Reminder */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <Shield className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Jährliche Pflichten nach Setup:</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                <strong>Form 5472 + Pro-Forma 1120</strong> bis 15.04. (mit Form 7004 verlängerbar): Pflicht für
                Single-Member-LLC mit ausländischem Owner. <strong>$25.000 Strafe</strong> bei Versäumnis. Adresse:
                <em> Internal Revenue Service, 1973 Rulon White Blvd., M/S 6112, Attn: PIN Unit, Ogden, UT 84201</em>
              </li>
              <li>
                <strong>Annual Report</strong> beim {stateInfo.name} SOS (Anniversary-Datum) — siehe State-Detail
              </li>
              <li>
                <strong>Registered Agent Renewal</strong> jährlich
              </li>
              <li>
                <strong>BOI-Update</strong> binnen 30 Tagen bei jeder Änderung (Adresse, Member-Wechsel)
              </li>
              <li>
                <strong>DE-Steuer:</strong> Bei DE-Wohnsitz LLC-Gewinne gemäß DBA als Einkünfte aus Gewerbebetrieb in
                DE versteuern (LLC = transparent bei Single-Member). Bei aktivem Geschäft: §AStG meist
                unkritisch.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

export default UsLlcWizard;
