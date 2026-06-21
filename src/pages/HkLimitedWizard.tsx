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
  Sparkles,
  Globe,
  Info,
  Users,
  FileText,
} from "lucide-react";

// ============================================================
// HK-LIMITED-WIZARD · Stand Mai 2026 (Total-Refactor)
// ============================================================
// Wichtige Updates Mai 2026:
// - FSIE-Regime (Foreign-Sourced Income Exemption) seit 1.1.2023 verschärft
//   (Anti-Misuse-Rules für passive Einkünfte — relevant für Holdings)
// - Significant Controllers Register (SCR) seit 1.3.2018 Pflicht
// - Two-Tier Profits Tax: unverändert 8.25% bis HKD 2M, 16.5% darüber
// - HKMA Stablecoin-Lizenz April 2026 → strengere Bank-KYC
// - Banking-Realität: HSBC verlangt persönliche HK-Vorstellung
//   (~40-60% Ablehnungs-Quote bei Foreign-Founders)
// - KEIN umfassendes DBA DE-HK in Kraft (nur beschränktes Schiff-/Luftverkehrs-Abkommen 2011; Comprehensive DTA seit 2014 in Verhandlung, nicht in Kraft) → keine DBA-Quellensteuerreduktion, §AStG-Risiko höher
// ============================================================

const STEP_LABELS = [
  "Use-Case & Strategie",
  "Director + Shareholder",
  "Firmennamen prüfen",
  "Company Secretary",
  "Registered Office",
  "Share Capital + Articles",
  "NNC1 + Business Registration",
  "SCR (Pflicht seit 2018)",
  "Profits Tax + FSIE",
  "Bank-Setup (kritisch!)",
  "Audit + Annual Returns",
];

const HkLimitedWizard = () => {
  const [step, setStep] = useState(1);
  const [useCase, setUseCase] = useState<"trading" | "holding" | "ip" | "ecom" | "consulting">("trading");
  const [directorType, setDirectorType] = useState<"self-de" | "self-hk" | "nominee">("self-de");
  const [companyNameEn, setCompanyNameEn] = useState("");
  const [companyNameCn, setCompanyNameCn] = useState("");
  const [shareCapital, setShareCapital] = useState(10000);
  const [serviceProvider, setServiceProvider] = useState<"statrys" | "sleek" | "osome" | "hawksford" | "diy">("sleek");
  const [annualRevenue, setAnnualRevenue] = useState(500000);
  const [profitMargin, setProfitMargin] = useState(20); // % vom Umsatz
  const [offshoreClaim, setOffshoreClaim] = useState(false);
  const [bankPreference, setBankPreference] = useState<"statrys" | "airwallex" | "currenxie" | "hsbc">("statrys");

  const profitsTax = useMemo(() => {
    const margin = Math.max(0, Math.min(100, profitMargin)) / 100;
    const profitHkd = annualRevenue * margin * 7.85;
    const tier1Limit = 2_000_000;
    if (offshoreClaim) return 0;
    if (profitHkd <= tier1Limit) return profitHkd * 0.0825;
    return tier1Limit * 0.0825 + (profitHkd - tier1Limit) * 0.165;
  }, [annualRevenue, profitMargin, offshoreClaim]);

  const totalSetupCost = useMemo(() => {
    const filing = 1720; // Papier-Satz NNC1 (elektronisch HKD 1.545); Quelle cr.gov.hk
    const br = 2350; // Business Registration HKD 2.200 + HKD 150 Levy, Stand ab 1.4.2026; Quelle ird.gov.hk
    const cs: Record<string, number> = {
      statrys: 1500,
      sleek: 1200,
      osome: 1000,
      hawksford: 3000,
      diy: 0,
    };
    return { filing, br, cs: cs[serviceProvider], total: filing + br + cs[serviceProvider] };
  }, [serviceProvider]);

  const totalSteps = STEP_LABELS.length;

  return (
    <CockpitShell
      eyebrow="HK-Limited-Wizard · Stand Mai 2026"
      title="Hong Kong Limited gründen — Schritt für Schritt"
      subtitle="11 Steps: Strategie → Director/Shareholder → Name → CS → Office → Share Capital → NNC1+BR → SCR → Profits Tax+FSIE → Bank → Audit. Stand Mai 2026 inkl. FSIE-Reform 2023 + SCR-Pflicht + Banking-Realität (40-60% HSBC-Ablehnungsquote für Foreign Founders)."
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

      <div className="rounded-2xl border border-border bg-card p-6 mb-6">
        {/* STEP 1: Use-Case */}
        {step === 1 && (
          <>
            <h2 className="text-base font-bold mb-1">1. Use-Case definieren</h2>
            <p className="text-xs text-muted-foreground mb-4">
              HK-LTD ist nicht für jeden ideal — Use-Case bestimmt Setup, Bank, Steuer-Strategie.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                { v: "trading" as const, l: "Active Trading / Service", d: "Cross-Border-Trade (Asien↔Europa), Consulting, Service-Geschäft", rec: "→ Standard-Setup, Two-Tier-Tax 8,25-16,5%" },
                { v: "holding" as const, l: "Holding (passive)", d: "Beteiligungen halten, IP-Holding, Investment-Vehicle", rec: "→ FSIE 2023 KRITISCH — Substanz nötig!" },
                { v: "ip" as const, l: "IP-Lizenzierung", d: "Royalties, Software-Lizenzen, Trademark-Holding", rec: "→ FSIE-Risk + Substanz-Anforderungen" },
                { v: "ecom" as const, l: "E-Commerce Asien", d: "China/Asien-Marktzugang, Alibaba-Vendoren", rec: "→ Good Fit + ggf. Offshore-Claim" },
                { v: "consulting" as const, l: "DE-Consultant mit Asien-Kunden", d: "Solo-Consultant, Asien-Klienten, will Asien-Banking", rec: "→ FSIE-Risk wenn passive Einkünfte mit DE-Wohnsitz" },
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => setUseCase(o.v)}
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
            {(useCase === "holding" || useCase === "ip" || useCase === "consulting") && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 mt-3 text-xs">
                <strong className="text-amber-700">⚠ FSIE-Warnung 2023+:</strong> Das verschärfte
                Foreign-Sourced-Income-Exemption-Regime (seit 1.1.2023) greift NUR für{" "}
                <strong>MNE-Entities</strong> — Gesellschaften, die Teil eines multinationalen
                Konzern-Verbunds sind. Eine echte Solo-HK-Ltd ohne Gruppen-Verbund fällt nicht
                darunter; für sie gilt weiter das klassische Territorialprinzip (+ ggf. Offshore-Claim,
                Step 9). Bist du aber Teil einer Gruppe (z.B. HK-Ltd hält Beteiligungen oder wird von
                deiner DE-GmbH gehalten), brauchst du für passive Einkünfte (Dividenden, Zinsen,
                Royalties, Veräußerungsgewinne) Substanz in HK (qualifizierte Mitarbeiter + Räume +
                Kosten), sonst reguläre 16,5%. Für DE-Wohnsitz-Owner zusätzlich §AStG-Risiko in DE.
                Siehe <Link to="/cockpit/substance-checker" className="text-accent-blue underline">Substance-Checker</Link>.
              </div>
            )}
          </>
        )}

        {/* STEP 2: Director + Shareholder */}
        {step === 2 && (
          <>
            <h2 className="text-base font-bold mb-1">2. Director + Shareholder Setup</h2>
            <p className="text-xs text-muted-foreground mb-4">
              HK-Gesetz: mind. 1 Director (natürliche Person, jede Nationalität, KEIN HK-Resident-Status nötig)
              + 1 Shareholder. Director kann gleichzeitig Shareholder sein.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
              {[
                { v: "self-de" as const, l: "Ich als DE-Resident-Director", d: "Standard für Solo-Founder. KEIN HK-Visum nötig.", rec: "✓ Empfohlen für Solo" },
                { v: "self-hk" as const, l: "Lokaler HK-Resident-Director", d: "Wenn du selbst nach HK ziehst oder Partner mit HKID hast", rec: "✓ Beste Substanz" },
                { v: "nominee" as const, l: "Nominee-Director", d: "Service-Provider (Sleek/Statrys) übernimmt. Für Privacy.", rec: "⚠ Substance-Issue + DBA-Risk" },
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => setDirectorType(o.v)}
                  className={`text-left rounded-xl border p-3 text-xs transition-colors ${
                    directorType === o.v
                      ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                      : "border-border hover:border-accent-blue/40"
                  }`}
                >
                  <div className="font-bold mb-0.5">{o.l}</div>
                  <div className="text-muted-foreground mb-1">{o.d}</div>
                  <div className="text-accent-blue">{o.rec}</div>
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-secondary/30 p-4 text-xs">
              <div className="font-bold text-sm mb-2">Anforderungen (Companies Ordinance §453):</div>
              <ul className="space-y-1 text-muted-foreground list-disc pl-4">
                <li><strong>Mind. 1 Director</strong>: natürliche Person, mind. 18 Jahre alt, jede Nationalität</li>
                <li><strong>Mind. 1 Shareholder</strong>: natürliche Person ODER Body Corporate, max. 50 für Private Ltd</li>
                <li>Director und Shareholder können IDENTISCH sein (Solo-Setup)</li>
                <li><strong>HK-Resident-Director NICHT Pflicht</strong> (Unterschied zu SG/UK/EU!)</li>
                <li>Pass-Kopie + Address-Proof aller Directors/Shareholders zwingend für SCR (Step 8)</li>
              </ul>
            </div>

            {directorType === "nominee" && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-3 mt-3 text-xs">
                <strong className="text-red-700">⚠ Nominee-Risiken:</strong>
                <ul className="list-disc pl-4 mt-1 space-y-0.5 text-muted-foreground">
                  <li>FSIE-Substance scheitert oft (Nominee = keine echte Mitwirkung)</li>
                  <li>DBA-Anti-Treaty-Shopping (§50d Abs. 3 EStG analog) versagt Vorteile</li>
                  <li>SCR-Eintrag muss trotzdem den ECHTEN Beneficial Owner zeigen</li>
                  <li>HSBC + andere Banken lehnen Nominee-Setups oft ab</li>
                  <li>HK-Companies Registry erkennt Nominee-Trick — keine wahre Privacy</li>
                </ul>
              </div>
            )}
          </>
        )}

        {/* STEP 3: Firmennamen */}
        {step === 3 && (
          <>
            <h2 className="text-base font-bold mb-1">3. Firmennamen prüfen</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Englischer Name + optional Chinesischer Name (Traditional). Beide werden offiziell registriert.
            </p>
            <div className="space-y-3">
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Englischer Name (Pflicht)</Label>
                <Input
                  value={companyNameEn}
                  onChange={(e) => setCompanyNameEn(e.target.value)}
                  placeholder='z.B. "Acme Trading Limited"'
                  className="mt-1"
                  autoFocus
                />
                <div className="text-[10px] text-muted-foreground mt-1">
                  Muss mit "Limited" enden. Kein Apostroph, keine Sonderzeichen außer .,&-()
                </div>
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Chinesischer Name (Optional, Traditional)</Label>
                <Input
                  value={companyNameCn}
                  onChange={(e) => setCompanyNameCn(e.target.value)}
                  placeholder='z.B. "雅康貿易有限公司"'
                  className="mt-1"
                />
                <div className="text-[10px] text-muted-foreground mt-1">
                  Optional aber empfohlen wenn China-/Asien-Geschäft. Hilft bei Bank-Onboarding +
                  China-Marktauftritt. Wenn weggelassen: später nachregistrierbar (kostet HKD 295).
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-secondary/30 p-3 mt-3 text-xs">
              <div className="font-bold mb-2">Verfügbarkeit prüfen — 3-Step-Check:</div>
              <ul className="space-y-1.5 text-muted-foreground">
                <li>
                  <strong>1.</strong>{" "}
                  <a
                    href="https://www.cr.gov.hk/en/services/cyber-search.htm"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-accent-blue underline inline-flex items-center gap-0.5"
                  >
                    Cyber Search Centre (Companies Registry) <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <strong>2.</strong>{" "}
                  <a
                    href="https://esearch.ipd.gov.hk"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-accent-blue underline inline-flex items-center gap-0.5"
                  >
                    HK Trademark Search <ExternalLink className="h-3 w-3" />
                  </a>{" "}
                  — Trademark-Konflikte vermeiden
                </li>
                <li>
                  <strong>3.</strong> <Link to="/cockpit/check" className="text-accent-blue underline">Brand-Check (DPMA + EUIPO)</Link> wenn auch DE/EU-Markt
                </li>
              </ul>
            </div>
          </>
        )}

        {/* STEP 4: Company Secretary */}
        {step === 4 && (
          <>
            <h2 className="text-base font-bold mb-1">4. Company Secretary engagieren</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Pflicht (§474 Companies Ordinance): jede HK-Ltd MUSS einen lokalen Company Secretary
              haben. Entweder eine TCSP-lizenzierte Firma oder eine natürliche Person mit HK-Resident-Status.
            </p>
            <div className="space-y-2 mb-3">
              {[
                { v: "statrys" as const, name: "Statrys", price: "HKD 1.500/yr", note: "★ Banking + CS-Paket kombiniert (Account in 3 Tagen, Trustpilot 4.6/5)", url: "https://statrys.com" },
                { v: "sleek" as const, name: "Sleek HK", price: "HKD 1.200/yr", note: "All-in-1: CS + Address + Compliance + Buchhaltung. Empfohlen für Solo.", url: "https://sleek.com/hk" },
                { v: "osome" as const, name: "Osome HK", price: "HKD 1.000/yr", note: "Günstig + automatisierte Buchhaltung", url: "https://osome.com/hk/" },
                { v: "hawksford" as const, name: "Hawksford HK", price: "HKD 3.000+/yr", note: "Premium für komplexe Strukturen + Family-Offices", url: "https://www.hawksford.com/hong-kong" },
                { v: "diy" as const, name: "Eigener lokaler Director (DIY)", price: "HKD 0", note: "Nur wenn du selbst nach HK ziehst oder Partner mit HKID hast", url: "" },
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => setServiceProvider(o.v)}
                  className={`w-full text-left rounded-xl border p-3 transition-colors ${
                    serviceProvider === o.v
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
            {/* Konkreter Rundown beim Empfehlungs-Anbieter */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-xs mb-3">
              <div className="font-bold text-sm mb-1 flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="h-4 w-4" /> Empfehlung: Sleek HK — so machst du's
              </div>
              <p className="text-muted-foreground mb-2">
                Für Solo-Founder die beste All-in-1-Lösung: Sleek übernimmt Incorporation +
                Company Secretary + Registered Office + SCR + Buchhaltung in EINEM Flow — du fasst
                kein Behörden-Portal selbst an. (Statrys wenn du Banking + CS aus einer Hand willst,
                Osome wenn billigste automatisierte Buchhaltung Priorität ist.)
              </p>
              <div className="font-semibold mb-1">Schritt für Schritt:</div>
              <ol className="list-decimal pl-4 space-y-1 text-muted-foreground">
                <li>Auf <a href="https://sleek.com/hk" target="_blank" rel="noopener noreferrer" className="text-accent-blue underline">sleek.com/hk</a> → „Incorporate a company" (Neugründung) starten.</li>
                <li>Firmennamen (EN, optional CN) eingeben — Sleek prüft live gegen Companies Registry (= Step 3).</li>
                <li>Director/Shareholder erfassen: du als DE-Resident, kein HK-Visum nötig (= Step 2).</li>
                <li>KYC: Pass + Wohnsitznachweis (Utility-Bill/Bankauszug) hochladen — für SCR Pflicht.</li>
                <li>Paket wählen: Incorporation-Bundle inkl. <strong>CS + Registered Office + 1. BR-Jahr</strong>; bezahlen per DE-Kreditkarte.</li>
                <li>Sleek filet <strong>NNC1 + Business Registration</strong> (Step 7) für dich — Approval i.d.R. 1–3 Werktage.</li>
                <li>Im Dashboard bekommst du: <strong>Certificate of Incorporation + BR-Certificate (mit BRN!)</strong> + Articles als PDF.</li>
                <li>Sleek legt das <strong>SCR</strong> an und stellt den Designated Representative (= Step 8) — läuft automatisch mit.</li>
                <li>Danach: Bank-Antrag (Step 10) mit den Sleek-Dokumenten; Renewals (Annual Return, BR, Audit-Koordination) erinnert Sleek jährlich.</li>
              </ol>
              <div className="text-[11px] text-muted-foreground mt-2">
                Die CI + BR-Dokumente aus Schritt 7 sind genau das, was Statrys/Airwallex später fürs Konto verlangen.
              </div>
            </div>

            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-3 text-xs">
              <Info className="h-3 w-3 inline mr-1 text-blue-700" />
              <strong>TCSP-Pflicht seit 2018:</strong> Provider müssen TCSP-Lizenz (Trust or Company Service Provider)
              haben. Alle oben gelistete sind lizenziert. Achte bei eigener Recherche darauf.
            </div>
          </>
        )}

        {/* STEP 5: Registered Office */}
        {step === 5 && (
          <>
            <h2 className="text-base font-bold mb-1">5. Registered Office Address</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Pflicht: physische HK-Adresse für Behörden-Post (Companies Registry, IRD, Gerichte).
              KEIN PO-Box, KEIN reines Mailbox-Center. Adresse wird im öffentlichen Register publiziert.
            </p>

            <div className="rounded-xl border border-border bg-secondary/30 p-4 text-xs space-y-2">
              <div className="font-bold mb-2">3 Optionen:</div>
              <div className="rounded-lg bg-card border border-border p-3">
                <div className="font-semibold mb-1">A) Via Company Secretary (Standard)</div>
                <p className="text-muted-foreground">
                  Sleek/Statrys/Osome inkludieren oft die Address im CS-Paket. Einfachste Lösung.
                  Kostet meist HKD 0-500 extra/Jahr.
                </p>
              </div>
              <div className="rounded-lg bg-card border border-border p-3">
                <div className="font-semibold mb-1">B) Virtual Office (separater Provider)</div>
                <p className="text-muted-foreground">
                  Z.B. <a href="https://www.regus.com.hk" target="_blank" rel="noopener noreferrer" className="text-accent-blue underline">Regus</a>,
                  Servcorp, Centaline. HKD 200-800/Mo. Mail-Forwarding + Phone-Reception oft inkludiert.
                </p>
              </div>
              <div className="rounded-lg bg-card border border-border p-3">
                <div className="font-semibold mb-1">C) Echtes Office (für FSIE-Substance)</div>
                <p className="text-muted-foreground">
                  Wenn du FSIE-Status willst oder Banking-Substance brauchst — eigener Mietvertrag
                  + Mitarbeiter vor Ort. HKD 5.000-30.000/Mo je nach Lage.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 mt-3 text-xs">
              <AlertTriangle className="h-3 w-3 inline mr-1 text-amber-700" />
              <strong>Watchout:</strong> HSBC + Banken in HK haben in 2024-2026 begonnen, reine
              Service-Provider-Adressen abzulehnen. Für Banking-Approval ist Virtual-Office mit
              echtem Lease oder echtes Office stärker.
            </div>

            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-3 mt-3 text-xs">
              <Info className="h-3 w-3 inline mr-1 text-blue-700" />
              <strong>Mail-Handling & Paket-/Karten-Empfang:</strong> Das Registered Office ist die
              offizielle Postadresse für Behörden. Für Mail-Scan/Weiterleitung inkludieren
              Sleek/Statrys/Osome meist Scan-to-App. Für Kuriere/Pakete — z.B. den Versand deiner
              Bank-Karte — nutze die CS-Adresse oder ein Virtual Office mit Reception
              (Regus/Servcorp); reine Registered-Office-Adressen nehmen oft keine Pakete an. Tipp:
              Fintech-Karten (Statrys/Airwallex) liefern an deine DE-Adresse, das umgeht das Problem.
            </div>
          </>
        )}

        {/* STEP 6: Share Capital + Articles */}
        {step === 6 && (
          <>
            <h2 className="text-base font-bold mb-1">6. Share Capital + Articles of Association</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Kein gesetzliches Mindestkapital. Standard 10.000 HKD (1.000 Shares à 10 HKD).
            </p>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Share Capital (HKD)
            </Label>
            <Input
              type="number"
              value={shareCapital}
              onChange={(e) => setShareCapital(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-2">
              10.000 HKD = ~1.250 EUR. Kein Capital-Stamp-Tax in HK.
            </div>

            <div className="rounded-xl border border-border bg-secondary/30 p-3 mt-3 text-xs space-y-2">
              <div>
                <strong>Share-Standard-Setup:</strong> 10.000 ordinary shares à HKD 1 ODER 1.000 shares à HKD 10
              </div>
              <div>
                <strong>Shareholder-Struktur:</strong> Solo = 100% an Founder, oder Multi mit
                klaren %-Anteilen
              </div>
              <div>
                <strong>Articles of Association (AoA):</strong> automatisch Model Articles (Companies Registry
                Standard) oder eigene custom — bei VC später relevant
              </div>
            </div>

            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-3 mt-3 text-xs">
              <Info className="h-3 w-3 inline mr-1 text-blue-700" />
              <strong>Tipp:</strong> Standard 10k HKD reicht für 95% der Fälle. Bei späterer VC-Round
              kannst du Share-Capital problemlos erhöhen.
            </div>
          </>
        )}

        {/* STEP 7: NNC1 + Business Registration */}
        {step === 7 && (
          <>
            <h2 className="text-base font-bold mb-1">7. NNC1-Filing + Business Registration</h2>
            <p className="text-xs text-muted-foreground mb-4">
              ZWEI Behörden gleichzeitig: Companies Registry (NNC1) + Inland Revenue Department (BR).
              Beide werden über das gleiche Portal abgewickelt.
            </p>

            <div className="space-y-3">
              <div className="rounded-xl border border-border bg-card p-3">
                <div className="font-bold text-sm mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-accent-blue" /> A) Companies Registry — NNC1
                </div>
                <ul className="text-xs space-y-1 text-muted-foreground list-disc pl-4">
                  <li>Form NNC1 + Articles of Association einreichen</li>
                  <li>Filing-Fee: <strong className="text-foreground">HKD 1.545</strong> (elektronisch) / HKD 1.720 (Papier), zzgl. HKD 265 Document-Storage-Fee</li>
                  <li>Express "guaranteed-by-date": +HKD 505</li>
                  <li>Approval: 1 Werktag (Online) / 4 Werktage (Papier)</li>
                  <li>Output: Certificate of Incorporation (CI)</li>
                </ul>
                <a
                  href="https://www.eregistry.gov.hk"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 mt-2 text-xs text-accent-blue hover:underline"
                >
                  → e-Registry HK Portal <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="rounded-xl border border-border bg-card p-3">
                <div className="font-bold text-sm mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-accent-blue" /> B) Inland Revenue Department — Business Registration
                </div>
                <ul className="text-xs space-y-1 text-muted-foreground list-disc pl-4">
                  <li>Automatisch parallel mit NNC1 (One-Stop)</li>
                  <li>Fee: <strong className="text-foreground">HKD 2.350/Jahr</strong> (HKD 2.200 + HKD 150 Levy, Stand ab 1.4.2026) oder HKD 6.170 für 3 Jahre</li>
                  <li>Output: Business Registration Certificate (BR)</li>
                  <li>BR muss am Geschäftsort ausgehängt werden (auch Virtual Office)</li>
                  <li>Renewal automatisch — IRD schickt Erinnerung</li>
                </ul>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-xs">
                <strong>Postanschriften:</strong>
                <ul className="mt-1 space-y-0.5 text-muted-foreground">
                  <li>Companies Registry: 14/F, Queensway Government Offices, 66 Queensway, Hong Kong</li>
                  <li>IRD: GPO Box 132, Hong Kong</li>
                </ul>
              </div>
            </div>
          </>
        )}

        {/* STEP 8: SCR */}
        {step === 8 && (
          <>
            <h2 className="text-base font-bold mb-1">8. Significant Controllers Register (SCR)</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Pflicht seit 1.3.2018 (Companies (Amendment) Ordinance 2018). Internes Register —
              KEIN öffentliches Register, aber muss am Registered Office verfügbar sein.
            </p>

            <div className="rounded-xl border border-border bg-secondary/30 p-4 text-xs">
              <div className="font-bold text-sm mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" /> Wer ist Significant Controller?
              </div>
              <ul className="space-y-1 text-muted-foreground list-disc pl-4">
                <li><strong>Conditions A:</strong> Hält direkt oder indirekt {">"} 25% der Issued Shares</li>
                <li><strong>Conditions B:</strong> Hält direkt oder indirekt {">"} 25% der Stimmrechte</li>
                <li><strong>Conditions C:</strong> Hat das Recht, Mehrheit des Boards zu bestellen</li>
                <li><strong>Conditions D:</strong> Hat das Recht, "Significant Influence or Control" auszuüben</li>
                <li><strong>Conditions E:</strong> Significant Influence über einen Trust mit dem Recht über die Company</li>
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-card p-3 mt-3 text-xs">
              <div className="font-bold mb-2">Was muss im SCR stehen:</div>
              <ul className="space-y-1 text-muted-foreground list-disc pl-4">
                <li>Voller Name + Geburtsdatum jeder controlled Person</li>
                <li>Wohnadresse (NICHT public, aber im Register)</li>
                <li>Pass-Nummer + Ausstellungs-Land</li>
                <li>Datum, ab dem Person als Controller gilt</li>
                <li>Nature of Control (A/B/C/D/E)</li>
              </ul>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 mt-3 text-xs">
              <AlertTriangle className="h-3 w-3 inline mr-1 text-amber-700" />
              <strong>Strafen bei Versäumnis:</strong> bis HKD 25.000 Fine + HKD 700/Tag.
              Inspection-Pflicht durch HK-Polizei/Companies Registry binnen 7 Tagen nach Aufforderung.
              <br /><br />
              <strong>Designated Representative</strong> muss benannt werden (Director, Mitglied,
              oder lizenzierter TCSP-Provider) — meist via Company Secretary geregelt.
            </div>

            <div className="text-xs text-muted-foreground mt-3">
              Praxis: Dein Company Secretary (Sleek/Statrys/Osome) erstellt und pflegt das SCR
              automatisch. Bei Solo-Founder: du bist der Significant Controller (Conditions A+B+C+D).
            </div>
          </>
        )}

        {/* STEP 9: Profits Tax + FSIE */}
        {step === 9 && (
          <>
            <h2 className="text-base font-bold mb-1">9. Profits Tax + FSIE-Status</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Two-Tier Profits Tax + Foreign-Sourced-Income-Exemption (FSIE) seit 1.1.2023 verschärft.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Erwarteter Jahres-Umsatz (EUR)
                </Label>
                <Input
                  type="number"
                  value={annualRevenue}
                  onChange={(e) => setAnnualRevenue(Math.max(0, Number(e.target.value) || 0))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Profit-Marge (% vom Umsatz)
                </Label>
                <Input
                  type="number"
                  value={profitMargin}
                  onChange={(e) => setProfitMargin(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                  className="mt-1"
                />
                <div className="text-[10px] text-muted-foreground mt-1">Reine Schätzung. Steuer = Marge × Umsatz × HKD-Kurs × Profits-Tax-Satz.</div>
              </div>
            </div>
            <div className="h-3" />

            <div className="rounded-xl border border-border bg-card p-3 mb-3 text-xs">
              <div className="font-bold mb-2">Two-Tier Profits Tax (unverändert seit 2018):</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>· <strong>8,25%</strong> auf erste <strong>HKD 2 Mio</strong> Profit</li>
                <li>· <strong>16,5%</strong> auf alles darüber</li>
                <li>· <strong>Tax Year:</strong> 1.4. – 31.3. (oder eigenes Geschäftsjahr)</li>
                <li>· <strong>Profits Tax Return:</strong> jährlich, ~1 Monat nach Versand-Aufforderung</li>
                <li>· <strong>Connected-Group-Rule:</strong> nur EINE Gesellschaft pro Group nutzt 8,25%</li>
              </ul>
            </div>

            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-3 mb-3 text-xs">
              <div className="font-bold mb-2 text-red-700">⚠ FSIE-Regime seit 1.1.2023 (nur für Konzern-/MNE-Entities!):</div>
              <p className="text-muted-foreground mb-2">
                <strong>Scope zuerst klären:</strong> FSIE gilt ausschließlich für{" "}
                <strong>MNE-Entities</strong> (Mitglieder einer multinationalen Gruppe). Eine
                eigenständige Solo-HK-Ltd ohne Konzern-Verbund ist NICHT betroffen — dort zählt das
                klassische Territorialprinzip + ggf. Offshore-Claim, nicht FSIE. Bei
                Gruppen-Zugehörigkeit gilt FSIE nicht mehr automatisch für passive Einkünfte
                (Dividenden, Zinsen, Royalties, Veräußerungsgewinne). Voraussetzungen dann:
              </p>
              <ul className="text-muted-foreground list-disc pl-4 space-y-0.5">
                <li><strong>Economic Substance Test:</strong> qualifizierte Mitarbeiter + Räume + Operating Costs IN HK</li>
                <li><strong>Anti-Misuse-Rule:</strong> keine "passive Holding ohne Substanz"</li>
                <li><strong>Nexus-Test für IP:</strong> R&D-Aktivitäten in HK nötig</li>
                <li>OHNE Substanz → reguläre 16,5% auf passive Foreign-Income</li>
              </ul>
              <p className="mt-2 text-muted-foreground">
                Standalone-Solo-Ltd: FSIE i.d.R. nicht anwendbar (dann Source-/Offshore-Frage statt
                FSIE). Konzern-eingebundene Trading/Active-Business-Holding: FSIE-Substanz machbar.
                Konzern-IP-Holding ohne HK-Aktivität: sehr schwierig.
              </p>
            </div>

            <div className="rounded-xl border border-accent-blue/30 bg-accent-blue/5 p-3 mb-3">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Offshore-Status beantragen (für aktive Einkünfte, separat von FSIE)?
              </Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  { v: false, l: "Nein, Onshore-Geschäft (Standard)" },
                  { v: true, l: "Ja, alle Einnahmen außerhalb HK" },
                ].map((o) => (
                  <button
                    key={String(o.v)}
                    onClick={() => setOffshoreClaim(o.v)}
                    className={`text-left rounded-md border p-2 text-xs transition-colors ${
                      offshoreClaim === o.v
                        ? "border-accent-blue bg-accent-blue/10 text-accent-blue font-semibold"
                        : "border-border hover:bg-secondary"
                    }`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
              {offshoreClaim && (
                <div className="text-[11px] text-muted-foreground mt-2">
                  ✓ Offshore-Claim → 0% Profits Tax möglich. ABER hohe Substanz-Anforderungen seit 2018:
                  <ul className="list-disc pl-4 mt-1 space-y-0.5">
                    <li>Keine HK-Kunden, keine HK-Mitarbeiter, keine HK-Lieferanten in Wertschöpfungskette</li>
                    <li>Antrag mit erster Profits Tax Return (innerhalb 18 Monaten nach Gründung)</li>
                    <li>IRD-Audit-Verfahren 6-18 Monate</li>
                    <li>Mailbox-Setup ohne echte Substanz wird ABGELEHNT</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="rounded-xl bg-secondary/40 p-3 text-xs">
              <strong>Geschätzte Profits Tax/Jahr:</strong>{" "}
              <span className="font-mono font-bold">
                {Math.round(profitsTax).toLocaleString("en-US")} HKD
              </span>{" "}
              <span className="text-muted-foreground">
                (~{Math.round(profitsTax / 7.85).toLocaleString("de-DE")} EUR)
              </span>
              <div className="text-[10px] text-muted-foreground mt-1">
                Annahme: 20% Marge auf {annualRevenue.toLocaleString("de-DE")} EUR Umsatz
              </div>
            </div>

            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-3 mt-3 text-xs">
              <Info className="h-3 w-3 inline mr-1 text-blue-700" />
              <strong>HK hat keine separate „TIN":</strong>
              <ul className="list-disc pl-4 mt-1 space-y-0.5 text-muted-foreground">
                <li>Die <strong>Business Registration Number (BRN)</strong> — die 8-stellige Nummer auf dem BR-Certificate — gilt als Firmen-TIN. Genau die tragen Stripe / ausländische Banken / CRS-Formulare als HK-Entity-TIN ein.</li>
                <li>Persönliche TIN = <strong>HKID-Nummer</strong> (Residents) bzw. Pass-Referenz für Nicht-Residenten.</li>
                <li>Die IRD führt intern eine File-Number, aber nach außen ist die BRN der Identifier — du brauchst keinen separaten TIN-Antrag.</li>
              </ul>
            </div>
          </>
        )}

        {/* STEP 10: Bank */}
        {step === 10 && (
          <>
            <h2 className="text-base font-bold mb-1">10. Bank-Setup (kritischer Step!)</h2>
            <p className="text-xs text-muted-foreground mb-4">
              HK-Banking ist 2024-2026 HART. HSBC + Standard-Banken haben 40-60% Ablehnungs-Quote
              für Foreign Founders + verlangen persönliche HK-Vorstellung. Fintechs sind die Realität.
            </p>

            <div className="space-y-2 mb-4">
              {[
                { v: "statrys" as const, name: "Statrys", price: "HKD 0/Mo (HKD 88/Mo wenn <5 outflows)", note: "★ Beste All-Round-Wahl für Foreign Founders. Online in 3 Tagen. Trustpilot 4.6/5.", url: "https://statrys.com" },
                { v: "airwallex" as const, name: "Airwallex", price: "€0 mit €10k Saldo, sonst €19+/Mo", note: "⚠ Trustpilot fällt 2026 (3.3/5), zunehmend Account-Freezes", url: "https://airwallex.com" },
                { v: "currenxie" as const, name: "Currenxie", price: "$0/Mo", note: "FX-fokussiert (0,10% USD/HKD). Für International Trade.", url: "https://currenxie.com" },
                { v: "hsbc" as const, name: "HSBC HK", price: "HKD 200/Mo (waived bei HKD 50k Saldo)", note: "⚠ Persönliche HK-Vorstellung Pflicht. ~40-60% Ablehnung. 14-56 Tage.", url: "https://www.hsbc.com.hk" },
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
                    <div className="font-mono text-xs shrink-0">{o.price}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-secondary/30 p-4 mb-3 text-xs">
              <div className="font-bold text-sm mb-2">💳 Karten zum HK-Konto</div>
              <ul className="space-y-1.5 text-muted-foreground">
                <li><strong className="text-foreground">Statrys:</strong> physische + virtuelle Prepaid-Mastercard, Multi-Currency direkt am Konto.</li>
                <li><strong className="text-foreground">Airwallex:</strong> unbegrenzt virtuelle + physische <strong>Borderless-Visa-Karten</strong>, Employee-Cards, niedrige FX — ideal für Meta/TikTok/Google-Ad-Spend.</li>
                <li><strong className="text-foreground">Currenxie:</strong> Global Account mit virtuellen Karten, FX-fokussiert.</li>
                <li><strong className="text-foreground">HSBC HK:</strong> ATM-/Debitkarte zum Konto; Business-Kreditkarte erst mit echter HK-Präsenz + Bankbeziehung.</li>
              </ul>
              <div className="text-[11px] text-muted-foreground mt-2">
                Für D2C/Performance-Marketing: Airwallex-Multi-Currency-Karten sind Standard für
                Ad-Spend mit niedrigem Währungsverlust; Versand der Karten an deine DE-Adresse möglich.
              </div>
            </div>

            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-3 text-xs mb-3">
              <AlertTriangle className="h-3 w-3 inline mr-1 text-red-700" />
              <strong>HK-Banking-Realität 2026:</strong>
              <ul className="list-disc pl-4 mt-1 space-y-0.5 text-muted-foreground">
                <li>HSBC + DBS + Bank of China haben Foreign-Founder-Ablehnungs-Quote 40-60%</li>
                <li>Persönlicher HK-Termin Pflicht (Flug + Hotel ~2-3k EUR)</li>
                <li>Account-Reviews alle 12-24 Monate — neue KYC-Runde</li>
                <li>HKMA Stablecoin-Lizenz April 2026 verschärft KYC weiter</li>
                <li>Fintechs (Statrys/Airwallex/Currenxie) sind die De-facto-Standard-Lösung</li>
              </ul>
            </div>

            <Link to="/cockpit/intl-banking" className="inline-flex items-center gap-1 text-xs text-accent-blue hover:underline">
              → Detaillierter Banking-Vergleich mit Closure-Risk
            </Link>
          </>
        )}

        {/* STEP 11: Audit + Annual Returns */}
        {step === 11 && (
          <>
            <h2 className="text-base font-bold mb-1">11. Audit + Annual Returns</h2>
            <p className="text-xs text-muted-foreground mb-4">
              JÄHRLICHE Pflichten — selbst bei 0 Umsatz! Versäumnis = bis HKD 3.480 Late-Filing-Fee (NAR1).
            </p>

            <div className="space-y-3">
              <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-3 text-xs">
                <div className="font-bold mb-2 text-red-700">⚠ 1) Audit-Pflicht (jährlich, auch bei 0 Umsatz!)</div>
                <ul className="text-muted-foreground list-disc pl-4 space-y-0.5">
                  <li>HK-zertifizierter Auditor (CPA mit Practising Certificate) zwingend</li>
                  <li>Audit-Bericht muss zusammen mit Profits Tax Return eingereicht werden</li>
                  <li>Budget: HKD 8.000-25.000/Jahr für kleine Firmen</li>
                  <li>Aktive Trading: HKD 15.000-50.000/Jahr</li>
                  <li>Sleek/Osome bieten Audit-Pakete für HKD 8.000-15.000/Jahr</li>
                  <li>Dormant-Status (0 Tx) möglich → reduzierter Audit, aber nicht weggelassen</li>
                </ul>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-xs">
                <div className="font-bold mb-2">2) Annual Return (Form NAR1)</div>
                <ul className="text-muted-foreground list-disc pl-4 space-y-0.5">
                  <li>Frist: 42 Tage nach Anniversary-Date der Gründung</li>
                  <li>Fee: HKD 105 (Private Company)</li>
                  <li>Bei Versäumnis: gestaffelte Late-Filing-Registration-Fee 870/1.740/2.610/3.480, max. HKD 3.480 (NAR1 Private Company)</li>
                </ul>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-xs">
                <div className="font-bold mb-2">3) Profits Tax Return (IRD)</div>
                <ul className="text-muted-foreground list-disc pl-4 space-y-0.5">
                  <li>Erste PTR: 18 Monate nach Gründung (BIR51)</li>
                  <li>Folgende: jährlich, ~1 Monat nach IRD-Versand</li>
                  <li>Bei Offshore-Claim: separater "Notice of Foreign-Sourced Income" anhängen</li>
                </ul>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-xs">
                <div className="font-bold mb-2">4) Business Registration Renewal</div>
                <ul className="text-muted-foreground list-disc pl-4 space-y-0.5">
                  <li>Automatisch — IRD schickt Demand Note</li>
                  <li>HKD 2.350/Jahr (HKD 2.200 + HKD 150 Levy) oder HKD 6.170/3 Jahre</li>
                </ul>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-xs">
                <div className="font-bold mb-2">5) Significant Controllers Register Update</div>
                <ul className="text-muted-foreground list-disc pl-4 space-y-0.5">
                  <li>Bei jeder Änderung (Owner/Shareholder/Director) Update binnen 7 Tagen</li>
                  <li>Pflicht-Inspektion durch HK-Polizei oder Companies Registry möglich</li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-3 mt-3 text-xs">
              <Info className="h-3 w-3 inline mr-1 text-blue-700" />
              <strong>DE-Steuer-Aspekt:</strong> Bei DE-Wohnsitz des Directors/Owners ist §AStG-
              Hinzurechnungsbesteuerung möglich (Niedrigsteuer-Schwelle 15% seit 2024, HK
              effektiv 8,25%). Siehe <Link to="/cockpit/dba-cfc" className="text-accent-blue underline">DBA-CFC-Rechner</Link>
              {" "}und <Link to="/cockpit/substance-checker" className="text-accent-blue underline">Substance-Checker</Link>.
            </div>

            {/* Summary */}
            <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/5 p-5 mt-6">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-700" /> Setup-Zusammenfassung
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase">Firma</div>
                  <div className="font-bold">{companyNameEn || "—"}</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase">Service-Provider</div>
                  <div className="font-bold capitalize">{serviceProvider === "diy" ? "DIY" : serviceProvider}</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase">Setup-Kosten Jahr 1</div>
                  <div className="font-bold text-emerald-700">{totalSetupCost.total.toLocaleString("en-US")} HKD</div>
                  <div className="text-[10px] text-muted-foreground mt-1">
                    Filing {totalSetupCost.filing} + BR {totalSetupCost.br} + CS {totalSetupCost.cs}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase">Lfd. Kosten ab Jahr 2</div>
                  <div className="font-bold">
                    {(totalSetupCost.cs + 2350 + 8000).toLocaleString("en-US")} HKD/yr
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-1">CS + BR + Audit min. 8k</div>
                </div>
              </div>
            </div>

            <Link
              to="/playbook/preview/hk-limited"
              className="inline-flex items-center gap-1 rounded-lg border border-accent-blue/30 bg-accent-blue/5 px-4 py-2 text-sm hover:bg-accent-blue/10 mt-4"
            >
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
          <Globe className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          <div className="text-muted-foreground">
            <strong className="text-foreground">Wichtige Updates Mai 2026:</strong>
            <ul className="list-disc pl-4 space-y-0.5 mt-1">
              <li>FSIE-Regime seit 1.1.2023 für passive Einkünfte verschärft (Substanz-Anforderungen)</li>
              <li>HKMA Stablecoin-Lizenz April 2026 → strengere Bank-KYC für alle HK-Banken</li>
              <li>SCR-Pflicht seit 1.3.2018 (HKD 25.000 Fine + HKD 700/Tag bei Versäumnis)</li>
              <li>KEIN umfassendes DBA Deutschland–HK in Kraft (nur beschränktes Schiff-/Luftverkehrs-Abkommen 2011; Comprehensive DTA seit 2014 in Verhandlung, nicht in Kraft) → keine DBA-Quellensteuerreduktion, §AStG-Risiko entsprechend höher</li>
              <li>Two-Tier Profits Tax unverändert: 8,25% bis HKD 2M, 16,5% darüber</li>
              <li>Audit-Pflicht weiterhin auch bei 0 Umsatz (HKD 8-15k/Jahr Standard)</li>
            </ul>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

export default HkLimitedWizard;
