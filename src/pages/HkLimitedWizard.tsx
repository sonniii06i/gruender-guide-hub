import { useState, useMemo, type ElementType, type ReactNode } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Callout, Field, ResultPanel, ResultRow, ToneBadge, ToolSection, type Tone } from "@/components/cockpit/kit";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calculator,
  Check,
  CreditCard,
  ExternalLink,
  FileCheck2,
  FileText,
  Globe,
  Landmark,
  MapPin,
  Sparkles,
  Tag,
  Target,
  UserCog,
  Users,
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
  // EUR/HKD (nicht 7,85 — das ist die USD/HKD-Kopplung). Startwert grob, Nutzer trägt Tageskurs ein.
  const [eurHkd, setEurHkd] = useState(9.0);
  const [offshoreClaim, setOffshoreClaim] = useState(false);
  const [bankPreference, setBankPreference] = useState<"statrys" | "airwallex" | "currenxie" | "hsbc">("statrys");

  const profitsTax = useMemo(() => {
    const margin = Math.max(0, Math.min(100, profitMargin)) / 100;
    const profitHkd = annualRevenue * margin * eurHkd;
    const tier1Limit = 2_000_000;
    if (offshoreClaim) return 0;
    if (profitHkd <= tier1Limit) return profitHkd * 0.0825;
    return tier1Limit * 0.0825 + (profitHkd - tier1Limit) * 0.165;
  }, [annualRevenue, profitMargin, offshoreClaim, eurHkd]);

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


  const stepIcon = STEP_ICONS[step - 1];
  const fortschritt = Math.round((step / totalSteps) * 100);

  return (
    <CockpitShell
      eyebrow="HK-Limited-Wizard · Stand Mai 2026"
      title="Hong Kong Limited gründen: Schritt für Schritt"
      subtitle="Elf Schritte von der Strategie bis zu Audit und Annual Return. Stand Mai 2026, mit FSIE-Reform 2023, SCR-Pflicht und der Banking-Realität für Foreign Founder (40 bis 60 % Ablehnungsquote bei HSBC)."
    >
      <div className="grid items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
        {/* Fortschritt: mobil als Leiste, ab lg als Schrittliste */}
        <aside className="min-w-0 space-y-4 lg:sticky lg:top-20">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-card lg:hidden">
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="shrink-0 font-medium">
                Schritt <span className="tabular">{step}</span> von <span className="tabular">{totalSteps}</span>
              </span>
              <span className="truncate text-muted-foreground">{STEP_TITLES[step - 1]}</span>
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
                    <span className="min-w-0 leading-snug">{STEP_TITLES[i]}</span>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="hidden rounded-2xl border border-border bg-card p-4 shadow-card lg:block">
            <p className="text-sm font-semibold">Dein Setup bisher</p>
            <div className="mt-1 divide-y divide-border/70">
              <ResultRow label="Firma" value={<span className="block max-w-[120px] truncate">{companyNameEn || "offen"}</span>} />
              <ResultRow label="Provider" value={PROVIDER_NAME[serviceProvider]} />
              <ResultRow label="Kosten Jahr 1" value={`${totalSetupCost.total.toLocaleString("en-US")} HKD`} strong />
            </div>
          </div>
        </aside>

        <div className="min-w-0 space-y-6">
          <ToolSection title={STEP_TITLES[step - 1]} icon={stepIcon}>
            {/* STEP 1: Use-Case */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Eine HK-Ltd passt nicht für jeden. Der Use-Case bestimmt Setup, Bank und Steuer-Strategie.
                </p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {[
                    { v: "trading" as const, l: "Active Trading / Service", d: "Cross-Border-Trade (Asien↔Europa), Consulting, Service-Geschäft", rec: "Standard-Setup, Two-Tier-Tax 8,25 bis 16,5 %", tone: "accent" as Tone },
                    { v: "holding" as const, l: "Holding (passiv)", d: "Beteiligungen halten, IP-Holding, Investment-Vehicle", rec: "FSIE 2023 kritisch: Substanz nötig", tone: "warning" as Tone },
                    { v: "ip" as const, l: "IP-Lizenzierung", d: "Royalties, Software-Lizenzen, Trademark-Holding", rec: "FSIE-Risiko und Substanz-Anforderungen", tone: "warning" as Tone },
                    { v: "ecom" as const, l: "E-Commerce Asien", d: "China/Asien-Marktzugang, Alibaba-Vendoren", rec: "Guter Fit, ggf. Offshore-Claim", tone: "success" as Tone },
                    { v: "consulting" as const, l: "DE-Consultant mit Asien-Kunden", d: "Solo-Consultant, Asien-Klienten, will Asien-Banking", rec: "FSIE-Risiko bei passiven Einkünften mit DE-Wohnsitz", tone: "warning" as Tone },
                  ].map((o) => (
                    <OptionCard key={o.v} active={useCase === o.v} onClick={() => setUseCase(o.v)}>
                      <span className="block font-semibold">{o.l}</span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">{o.d}</span>
                      <span className={cn("mt-2 flex items-center gap-1 text-xs font-medium", TONE_TEXT_LOCAL[o.tone])}>
                        <ArrowRight className="h-3 w-3" aria-hidden="true" /> {o.rec}
                      </span>
                    </OptionCard>
                  ))}
                </div>
                {(useCase === "holding" || useCase === "ip" || useCase === "consulting") && (
                  <Callout tone="warning" title="FSIE-Warnung seit 2023">
                    Das verschärfte Foreign-Sourced-Income-Exemption-Regime (seit 1.1.2023) greift NUR für{" "}
                    <strong>MNE-Entities</strong>, also Gesellschaften, die Teil eines multinationalen Konzern-Verbunds sind.
                    Eine echte Solo-HK-Ltd ohne Gruppen-Verbund fällt nicht darunter; für sie gilt weiter das klassische
                    Territorialprinzip (plus ggf. Offshore-Claim, Schritt 9). Bist du aber Teil einer Gruppe (z.B. HK-Ltd hält
                    Beteiligungen oder wird von deiner DE-GmbH gehalten), brauchst du für passive Einkünfte (Dividenden, Zinsen,
                    Royalties, Veräußerungsgewinne) Substanz in HK (qualifizierte Mitarbeiter, Räume, Kosten), sonst reguläre
                    16,5 %. Für DE-Wohnsitz-Owner zusätzlich §AStG-Risiko in DE. Siehe{" "}
                    <InLink to="/cockpit/substance-checker">Substance-Checker</InLink>.
                  </Callout>
                )}
              </div>
            )}

            {/* STEP 2: Director + Shareholder */}
            {step === 2 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  HK-Gesetz: mind. 1 Director (natürliche Person, jede Nationalität, KEIN HK-Resident-Status nötig) und
                  1 Shareholder. Director kann gleichzeitig Shareholder sein.
                </p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  {[
                    { v: "self-de" as const, l: "Ich als DE-Resident-Director", d: "Standard für Solo-Founder. KEIN HK-Visum nötig.", rec: "Empfohlen für Solo", tone: "success" as Tone },
                    { v: "self-hk" as const, l: "Lokaler HK-Resident-Director", d: "Wenn du selbst nach HK ziehst oder Partner mit HKID hast", rec: "Beste Substanz", tone: "success" as Tone },
                    { v: "nominee" as const, l: "Nominee-Director", d: "Service-Provider (Sleek/Statrys) übernimmt. Für Privacy.", rec: "Substance-Issue und DBA-Risiko", tone: "warning" as Tone },
                  ].map((o) => (
                    <OptionCard key={o.v} active={directorType === o.v} onClick={() => setDirectorType(o.v)}>
                      <span className="block font-semibold leading-snug">{o.l}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{o.d}</span>
                      <ToneBadge tone={o.tone} className="mt-3">{o.rec}</ToneBadge>
                    </OptionCard>
                  ))}
                </div>

                <InfoList
                  title="Anforderungen (Companies Ordinance §453)"
                  items={[
                    <><strong className="text-foreground">Mind. 1 Director</strong>: natürliche Person, mind. 18 Jahre alt, jede Nationalität</>,
                    <><strong className="text-foreground">Mind. 1 Shareholder</strong>: natürliche Person ODER Body Corporate, max. 50 für Private Ltd</>,
                    <>Director und Shareholder können IDENTISCH sein (Solo-Setup)</>,
                    <><strong className="text-foreground">HK-Resident-Director NICHT Pflicht</strong> (anders als z. B. in Singapur)</>,
                    <>Pass-Kopie und Address-Proof aller Directors/Shareholders zwingend für SCR (Schritt 8)</>,
                  ]}
                />

                {directorType === "nominee" && (
                  <Callout tone="danger" title="Nominee-Risiken">
                    <Bullets
                      items={[
                        "FSIE-Substance scheitert oft (Nominee = keine echte Mitwirkung)",
                        "DBA-Anti-Treaty-Shopping (§50d Abs. 3 EStG analog) versagt Vorteile",
                        "SCR-Eintrag muss trotzdem den ECHTEN Beneficial Owner zeigen",
                        "HSBC und andere Banken lehnen Nominee-Setups oft ab",
                        "HK-Companies Registry erkennt Nominee-Trick, keine wahre Privacy",
                      ]}
                    />
                  </Callout>
                )}
              </div>
            )}

            {/* STEP 3: Firmennamen */}
            {step === 3 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  Englischer Name und optional ein chinesischer Name (Traditional). Beide werden offiziell registriert.
                </p>
                <Field label="Englischer Name (Pflicht)" htmlFor="hk-name-en" hint={'Muss mit „Limited“ enden. Kein Apostroph, keine Sonderzeichen außer .,&-()'}>
                  <Input
                    id="hk-name-en"
                    value={companyNameEn}
                    onChange={(e) => setCompanyNameEn(e.target.value)}
                    placeholder='z.B. "Acme Trading Limited"'
                    autoFocus
                  />
                </Field>
                <Field
                  label="Chinesischer Name (optional, Traditional)"
                  htmlFor="hk-name-cn"
                  hint="Empfohlen bei China- oder Asien-Geschäft: hilft beim Bank-Onboarding und im Marktauftritt. Wenn weggelassen, später nachregistrierbar (kostet HKD 295)."
                >
                  <Input
                    id="hk-name-cn"
                    value={companyNameCn}
                    onChange={(e) => setCompanyNameCn(e.target.value)}
                    placeholder='z.B. "雅康貿易有限公司"'
                  />
                </Field>

                <div>
                  <h3 className="text-sm font-semibold">Verfügbarkeit prüfen in drei Schritten</h3>
                  <ol className="mt-3 space-y-3">
                    <CheckItem n={1} title="Companies Registry">
                      <ExtLink href="https://www.cr.gov.hk/en/services/cyber-search.htm">Cyber Search Centre öffnen</ExtLink>
                    </CheckItem>
                    <CheckItem n={2} title="HK Trademark Search">
                      Trademark-Konflikte vermeiden.{" "}
                      <ExtLink href="https://esearch.ipd.gov.hk">esearch.ipd.gov.hk</ExtLink>
                    </CheckItem>
                    <CheckItem n={3} title="DPMA und EUIPO">
                      Wenn auch DE/EU-Markt: <InLink to="/cockpit/check">Brand-Check (DPMA + EUIPO)</InLink>
                    </CheckItem>
                  </ol>
                </div>
              </div>
            )}

            {/* STEP 4: Company Secretary */}
            {step === 4 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  Pflicht (§474 Companies Ordinance): Jede HK-Ltd MUSS einen lokalen Company Secretary haben. Entweder eine
                  TCSP-lizenzierte Firma oder eine natürliche Person mit HK-Resident-Status.
                </p>
                <div className="space-y-2.5">
                  {[
                    { v: "statrys" as const, name: "Statrys", price: "HKD 1.500/yr", note: "Banking und CS-Paket kombiniert (Account in 3 Tagen, Trustpilot 4.6/5)", top: true, url: "https://statrys.com" },
                    { v: "sleek" as const, name: "Sleek HK", price: "HKD 1.200/yr", note: "All-in-1: CS + Address + Compliance + Buchhaltung. Empfohlen für Solo.", top: false, url: "https://sleek.com/hk" },
                    { v: "osome" as const, name: "Osome HK", price: "HKD 1.000/yr", note: "Günstig mit automatisierter Buchhaltung", top: false, url: "https://osome.com/hk/" },
                    { v: "hawksford" as const, name: "Hawksford HK", price: "HKD 3.000+/yr", note: "Premium für komplexe Strukturen und Family-Offices", top: false, url: "https://www.hawksford.com/hong-kong" },
                    { v: "diy" as const, name: "Eigener lokaler Director (DIY)", price: "HKD 0", note: "Nur wenn du selbst nach HK ziehst oder Partner mit HKID hast", top: false, url: "" },
                  ].map((o) => (
                    <div key={o.v} className="relative">
                      <OptionCard active={serviceProvider === o.v} onClick={() => setServiceProvider(o.v)}>
                        <span className="flex items-start justify-between gap-3">
                          <span className="min-w-0">
                            <span className="flex flex-wrap items-center gap-2 font-semibold">
                              {o.name}
                              {o.top && <ToneBadge tone="accent">Banking inklusive</ToneBadge>}
                            </span>
                            <span className="mt-0.5 block text-sm text-muted-foreground">{o.note}</span>
                          </span>
                          <span className="shrink-0 text-sm font-semibold tabular">{o.price}</span>
                        </span>
                        {o.url && <span className="mt-2 block h-4" aria-hidden="true" />}
                      </OptionCard>
                      {o.url && (
                        <a
                          href={o.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="absolute bottom-3.5 left-4 inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:underline"
                        >
                          Website <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                {/* Konkreter Rundown beim Empfehlungs-Anbieter */}
                <Callout tone="success" title="Empfehlung: Sleek HK, so gehst du vor">
                  <p>
                    Für Solo-Founder die beste All-in-1-Lösung: Sleek übernimmt Incorporation, Company Secretary, Registered
                    Office, SCR und Buchhaltung in EINEM Flow, du fasst kein Behörden-Portal selbst an. (Statrys, wenn du
                    Banking und CS aus einer Hand willst; Osome, wenn die billigste automatisierte Buchhaltung Priorität hat.)
                  </p>
                  <p className="mt-3 font-semibold text-foreground">Schritt für Schritt</p>
                  <ol className="mt-1.5 list-decimal space-y-1 pl-5 marker:text-muted-foreground">
                    <li>Auf <ExtLink href="https://sleek.com/hk" icon={false}>sleek.com/hk</ExtLink> „Incorporate a company“ (Neugründung) starten.</li>
                    <li>Firmennamen (EN, optional CN) eingeben. Sleek prüft live gegen die Companies Registry (= Schritt 3).</li>
                    <li>Director/Shareholder erfassen: du als DE-Resident, kein HK-Visum nötig (= Schritt 2).</li>
                    <li>KYC: Pass und Wohnsitznachweis (Utility-Bill/Bankauszug) hochladen, für SCR Pflicht.</li>
                    <li>Paket wählen: Incorporation-Bundle inkl. <strong>CS + Registered Office + 1. BR-Jahr</strong>; bezahlen per DE-Kreditkarte.</li>
                    <li>Sleek reicht <strong>NNC1 + Business Registration</strong> (Schritt 7) für dich ein. Approval i.d.R. 1 bis 3 Werktage.</li>
                    <li>Im Dashboard bekommst du: <strong>Certificate of Incorporation + BR-Certificate (mit BRN!)</strong> und Articles als PDF.</li>
                    <li>Sleek legt das <strong>SCR</strong> an und stellt den Designated Representative (= Schritt 8), läuft automatisch mit.</li>
                    <li>Danach: Bank-Antrag (Schritt 10) mit den Sleek-Dokumenten; an Renewals (Annual Return, BR, Audit-Koordination) erinnert Sleek jährlich.</li>
                  </ol>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Die CI- und BR-Dokumente aus Schritt 7 sind genau das, was Statrys/Airwallex später fürs Konto verlangen.
                  </p>
                </Callout>

                <Callout tone="info" title="TCSP-Pflicht seit 2018">
                  Provider müssen eine TCSP-Lizenz (Trust or Company Service Provider) haben. Alle oben gelisteten sind
                  lizenziert. Achte bei eigener Recherche darauf.
                </Callout>
              </div>
            )}

            {/* STEP 5: Registered Office */}
            {step === 5 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  Pflicht: physische HK-Adresse für Behörden-Post (Companies Registry, IRD, Gerichte). KEIN PO-Box, KEIN
                  reines Mailbox-Center. Die Adresse wird im öffentlichen Register publiziert.
                </p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <OptionTile kuerzel="A" title="Über den Company Secretary" badge={<ToneBadge tone="success">Standard</ToneBadge>}>
                    Sleek/Statrys/Osome inkludieren die Adresse oft im CS-Paket. Einfachste Lösung, kostet meist HKD 0 bis 500
                    extra pro Jahr.
                  </OptionTile>
                  <OptionTile kuerzel="B" title="Virtual Office (separater Provider)">
                    Z.B. <ExtLink href="https://www.regus.com.hk" icon={false}>Regus</ExtLink>, Servcorp, Centaline. HKD 200 bis
                    800 pro Monat. Mail-Forwarding und Phone-Reception oft inklusive.
                  </OptionTile>
                  <OptionTile kuerzel="C" title="Echtes Office (für FSIE-Substance)">
                    Wenn du FSIE-Status willst oder Banking-Substance brauchst: eigener Mietvertrag und Mitarbeiter vor Ort.
                    HKD 5.000 bis 30.000 pro Monat je nach Lage.
                  </OptionTile>
                </div>

                <Callout tone="warning" title="Achtung bei Service-Provider-Adressen">
                  HSBC und Banken in HK haben 2024 bis 2026 begonnen, reine Service-Provider-Adressen abzulehnen. Für die
                  Banking-Freigabe ist ein Virtual Office mit echtem Lease oder ein echtes Office stärker.
                </Callout>

                <Callout tone="info" title="Mail-Handling und Paket-/Karten-Empfang">
                  Das Registered Office ist die offizielle Postadresse für Behörden. Für Mail-Scan/Weiterleitung inkludieren
                  Sleek/Statrys/Osome meist Scan-to-App. Für Kuriere/Pakete, z.B. den Versand deiner Bank-Karte, nutze die
                  CS-Adresse oder ein Virtual Office mit Reception (Regus/Servcorp); reine Registered-Office-Adressen nehmen oft
                  keine Pakete an. Tipp: Fintech-Karten (Statrys/Airwallex) liefern an deine DE-Adresse, das umgeht das Problem.
                </Callout>
              </div>
            )}

            {/* STEP 6: Share Capital + Articles */}
            {step === 6 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  Kein gesetzliches Mindestkapital. Standard sind 10.000 HKD (1.000 Shares à 10 HKD).
                </p>
                <Field label="Share Capital (HKD)" htmlFor="hk-capital" hint="10.000 HKD sind je nach Kurs ca. 1.100 EUR. Kein Capital-Stamp-Tax in HK.">
                  <Input
                    id="hk-capital"
                    type="number"
                    inputMode="numeric"
                    value={shareCapital}
                    onChange={(e) => setShareCapital(Math.max(0, Number(e.target.value) || 0))}
                    className="tabular sm:max-w-xs"
                  />
                </Field>

                <dl className="divide-y divide-border/70 rounded-xl border border-border bg-secondary/40 px-4 text-sm">
                  <DefRow term="Share-Standard-Setup">10.000 ordinary shares à HKD 1 ODER 1.000 shares à HKD 10</DefRow>
                  <DefRow term="Shareholder-Struktur">Solo = 100 % an Founder, oder Multi mit klaren %-Anteilen</DefRow>
                  <DefRow term="Articles of Association (AoA)">
                    Automatisch Model Articles (Companies Registry Standard) oder eigene custom, bei VC später relevant
                  </DefRow>
                </dl>

                <Callout tone="info" title="Tipp">
                  Standard 10k HKD reicht für 95 % der Fälle. Bei einer späteren VC-Runde kannst du das Share-Capital
                  problemlos erhöhen.
                </Callout>
              </div>
            )}

            {/* STEP 7: NNC1 + Business Registration */}
            {step === 7 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  ZWEI Behörden gleichzeitig: Companies Registry (NNC1) und Inland Revenue Department (BR). Beide werden über
                  das gleiche Portal abgewickelt.
                </p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="flex items-center gap-2 text-sm font-semibold">
                      <FileText className="h-4 w-4 text-accent-blue" aria-hidden="true" /> A) Companies Registry: NNC1
                    </p>
                    <Bullets
                      className="mt-3"
                      items={[
                        "Form NNC1 und Articles of Association einreichen",
                        <>Filing-Fee: <strong className="text-foreground tabular">HKD 1.545</strong> (elektronisch) / HKD 1.720 (Papier), zzgl. HKD 265 Document-Storage-Fee</>,
                        'Express "guaranteed-by-date": +HKD 505',
                        "Approval: 1 Werktag (Online) / 4 Werktage (Papier)",
                        "Output: Certificate of Incorporation (CI)",
                      ]}
                    />
                    <ExtLink href="https://www.eregistry.gov.hk" className="mt-3 text-sm">e-Registry HK Portal</ExtLink>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="flex items-center gap-2 text-sm font-semibold">
                      <FileText className="h-4 w-4 text-accent-blue" aria-hidden="true" /> B) Inland Revenue Department: Business Registration
                    </p>
                    <Bullets
                      className="mt-3"
                      items={[
                        "Automatisch parallel mit NNC1 (One-Stop)",
                        <>Fee: <strong className="text-foreground tabular">HKD 2.350/Jahr</strong> (HKD 2.200 + HKD 150 Levy, Stand ab 1.4.2026) oder HKD 6.170 für 3 Jahre</>,
                        "Output: Business Registration Certificate (BR)",
                        "BR muss am Geschäftsort ausgehängt werden (auch Virtual Office)",
                        "Renewal automatisch, IRD schickt Erinnerung",
                      ]}
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-secondary/40 p-4 text-sm">
                  <p className="flex items-center gap-2 font-semibold">
                    <MapPin className="h-4 w-4 text-muted-foreground" aria-hidden="true" /> Postanschriften
                  </p>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>Companies Registry: 14/F, Queensway Government Offices, 66 Queensway, Hong Kong</li>
                    <li>IRD: GPO Box 132, Hong Kong</li>
                  </ul>
                </div>
              </div>
            )}

            {/* STEP 8: SCR */}
            {step === 8 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  Pflicht seit 1.3.2018 (Companies (Amendment) Ordinance 2018). Internes Register, KEIN öffentliches
                  Register, muss aber am Registered Office verfügbar sein.
                </p>

                <div className="rounded-xl border border-border bg-secondary/40 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    <Users className="h-4 w-4 text-accent-blue" aria-hidden="true" /> Wer ist Significant Controller?
                  </p>
                  <dl className="mt-2 divide-y divide-border/70 text-sm">
                    <DefRow term="Condition A">Hält direkt oder indirekt {">"} 25 % der Issued Shares</DefRow>
                    <DefRow term="Condition B">Hält direkt oder indirekt {">"} 25 % der Stimmrechte</DefRow>
                    <DefRow term="Condition C">Hat das Recht, die Mehrheit des Boards zu bestellen</DefRow>
                    <DefRow term="Condition D">Hat das Recht, "Significant Influence or Control" auszuüben</DefRow>
                    <DefRow term="Condition E">Significant Influence über einen Trust mit dem Recht über die Company</DefRow>
                  </dl>
                </div>

                <InfoList
                  title="Was im SCR stehen muss"
                  items={[
                    "Voller Name und Geburtsdatum jeder controlled Person",
                    "Wohnadresse (NICHT public, aber im Register)",
                    "Pass-Nummer und Ausstellungs-Land",
                    "Datum, ab dem die Person als Controller gilt",
                    "Nature of Control (A/B/C/D/E)",
                  ]}
                />

                <Callout tone="warning" title="Strafen bei Versäumnis">
                  Bis HKD 25.000 Fine + HKD 700/Tag. Inspection-Pflicht durch HK-Polizei/Companies Registry binnen 7 Tagen
                  nach Aufforderung.
                  <span className="mt-2 block">
                    <strong>Designated Representative</strong> muss benannt werden (Director, Mitglied oder lizenzierter
                    TCSP-Provider), meist über den Company Secretary geregelt.
                  </span>
                </Callout>

                <p className="text-sm text-muted-foreground">
                  Praxis: Dein Company Secretary (Sleek/Statrys/Osome) erstellt und pflegt das SCR automatisch. Als
                  Solo-Founder bist du der Significant Controller (Conditions A+B+C+D).
                </p>
              </div>
            )}

            {/* STEP 9: Profits Tax + FSIE */}
            {step === 9 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  Two-Tier Profits Tax und Foreign-Sourced-Income-Exemption (FSIE), seit 1.1.2023 verschärft.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Erwarteter Jahresumsatz (EUR)" htmlFor="hk-umsatz">
                    <Input
                      id="hk-umsatz"
                      type="number"
                      inputMode="numeric"
                      value={annualRevenue}
                      onChange={(e) => setAnnualRevenue(Math.max(0, Number(e.target.value) || 0))}
                      className="tabular"
                    />
                  </Field>
                  <Field
                    label="Gewinnmarge (% vom Umsatz)"
                    htmlFor="hk-marge"
                    hint="Reine Schätzung. Steuer = Marge × Umsatz × HKD-Kurs × Profits-Tax-Satz."
                  >
                    <Input
                      id="hk-marge"
                      type="number"
                      inputMode="numeric"
                      value={profitMargin}
                      onChange={(e) => setProfitMargin(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                      className="tabular"
                    />
                  </Field>
                  <Field
                    label="Wechselkurs EUR/HKD"
                    htmlFor="hk-kurs"
                    hint="1 EUR = x HKD. Bitte Tageskurs eintragen (z. B. EZB-Referenzkurs). 7,85 ist der USD/HKD-Kurs, nicht EUR."
                  >
                    <Input
                      id="hk-kurs"
                      type="number"
                      step="0.01"
                      value={eurHkd}
                      onChange={(e) => setEurHkd(Math.max(0.01, Number(e.target.value) || 0.01))}
                      className="tabular"
                    />
                  </Field>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium">Offshore-Status beantragen (für aktive Einkünfte, separat von FSIE)?</p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2" role="group" aria-label="Offshore-Status">
                    {[
                      { v: false, l: "Nein, Onshore-Geschäft (Standard)" },
                      { v: true, l: "Ja, alle Einnahmen außerhalb HK" },
                    ].map((o) => (
                      <OptionCard key={String(o.v)} compact active={offshoreClaim === o.v} onClick={() => setOffshoreClaim(o.v)}>
                        <span className="text-sm font-medium">{o.l}</span>
                      </OptionCard>
                    ))}
                  </div>
                  {offshoreClaim && (
                    <Callout tone="warning" title="Offshore-Claim: 0 % Profits Tax möglich, aber hohe Hürden seit 2018" className="mt-3">
                      <Bullets
                        items={[
                          "Keine HK-Kunden, keine HK-Mitarbeiter, keine HK-Lieferanten in der Wertschöpfungskette",
                          "Antrag mit der ersten Profits Tax Return (innerhalb 18 Monaten nach Gründung)",
                          "IRD-Audit-Verfahren 6 bis 18 Monate",
                          "Mailbox-Setup ohne echte Substanz wird ABGELEHNT",
                        ]}
                      />
                    </Callout>
                  )}
                </div>

                <ResultPanel
                  variant="ink"
                  kicker="Schätzung"
                  title="Profits Tax pro Jahr"
                  value={`${Math.round(profitsTax).toLocaleString("en-US")} HKD`}
                  valueHint={`ca. ${Math.round(profitsTax / eurHkd).toLocaleString("de-DE")} EUR (Kurs ${eurHkd.toLocaleString("de-DE")}), Annahme: ${profitMargin} % Marge auf ${annualRevenue.toLocaleString("de-DE")} EUR Umsatz`}
                />

                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-sm font-semibold">Two-Tier Profits Tax (unverändert seit 2018)</p>
                  <dl className="mt-2 divide-y divide-border/70 text-sm">
                    <DefRow term="8,25 %">auf die ersten HKD 2 Mio Profit</DefRow>
                    <DefRow term="16,5 %">auf alles darüber</DefRow>
                    <DefRow term="Tax Year">1.4. bis 31.3. (oder eigenes Geschäftsjahr)</DefRow>
                    <DefRow term="Profits Tax Return">jährlich, ca. 1 Monat nach Versand-Aufforderung</DefRow>
                    <DefRow term="Connected-Group-Rule">nur EINE Gesellschaft pro Group nutzt 8,25 %</DefRow>
                  </dl>
                </div>

                <Callout tone="danger" title="FSIE-Regime seit 1.1.2023 (nur für Konzern-/MNE-Entities)">
                  <p>
                    <strong>Scope zuerst klären:</strong> FSIE gilt ausschließlich für <strong>MNE-Entities</strong>
                    (Mitglieder einer multinationalen Gruppe). Eine eigenständige Solo-HK-Ltd ohne Konzern-Verbund ist NICHT
                    betroffen, dort zählt das klassische Territorialprinzip plus ggf. Offshore-Claim, nicht FSIE. Bei
                    Gruppen-Zugehörigkeit gilt FSIE nicht mehr automatisch für passive Einkünfte (Dividenden, Zinsen,
                    Royalties, Veräußerungsgewinne). Voraussetzungen dann:
                  </p>
                  <Bullets
                    className="mt-2"
                    items={[
                      <><strong>Economic Substance Test:</strong> qualifizierte Mitarbeiter, Räume und Operating Costs IN HK</>,
                      <><strong>Anti-Misuse-Rule:</strong> keine "passive Holding ohne Substanz"</>,
                      <><strong>Nexus-Test für IP:</strong> R&D-Aktivitäten in HK nötig</>,
                      "OHNE Substanz: reguläre 16,5 % auf passive Foreign-Income",
                    ]}
                  />
                  <p className="mt-2">
                    Standalone-Solo-Ltd: FSIE i.d.R. nicht anwendbar (dann Source-/Offshore-Frage statt FSIE).
                    Konzern-eingebundene Trading/Active-Business-Holding: FSIE-Substanz machbar. Konzern-IP-Holding ohne
                    HK-Aktivität: sehr schwierig.
                  </p>
                </Callout>

                <Callout tone="info" title="HK hat keine separate „TIN“">
                  <Bullets
                    items={[
                      <>Die <strong>Business Registration Number (BRN)</strong>, die 8-stellige Nummer auf dem BR-Certificate, gilt als Firmen-TIN. Genau die tragen Stripe, ausländische Banken und CRS-Formulare als HK-Entity-TIN ein.</>,
                      <>Persönliche TIN = <strong>HKID-Nummer</strong> (Residents) bzw. Pass-Referenz für Nicht-Residenten.</>,
                      "Die IRD führt intern eine File-Number, nach außen ist aber die BRN der Identifier. Du brauchst keinen separaten TIN-Antrag.",
                    ]}
                  />
                </Callout>
              </div>
            )}

            {/* STEP 10: Bank */}
            {step === 10 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  HK-Banking ist 2024 bis 2026 HART. HSBC und Standard-Banken haben 40 bis 60 % Ablehnungsquote für Foreign
                  Founders und verlangen eine persönliche HK-Vorstellung. Fintechs sind die Realität.
                </p>

                <div className="space-y-2.5">
                  {[
                    { v: "statrys" as const, name: "Statrys", price: "HKD 0/Mo (HKD 88/Mo bei <5 Outflows)", note: "Beste All-Round-Wahl für Foreign Founders. Online in 3 Tagen. Trustpilot 4.6/5.", badge: { tone: "success" as Tone, t: "Empfohlen" } },
                    { v: "airwallex" as const, name: "Airwallex", price: "€0 mit €10k Saldo, sonst €19+/Mo", note: "Trustpilot fällt 2026 (3.3/5), zunehmend Account-Freezes", badge: { tone: "warning" as Tone, t: "Freeze-Risiko" } },
                    { v: "currenxie" as const, name: "Currenxie", price: "$0/Mo", note: "FX-fokussiert (0,10 % USD/HKD). Für International Trade.", badge: null },
                    { v: "hsbc" as const, name: "HSBC HK", price: "HKD 200/Mo (entfällt ab HKD 50k Saldo)", note: "Persönliche HK-Vorstellung Pflicht. Ca. 40 bis 60 % Ablehnung. 14 bis 56 Tage.", badge: { tone: "danger" as Tone, t: "Hohe Ablehnung" } },
                  ].map((o) => (
                    <OptionCard key={o.v} active={bankPreference === o.v} onClick={() => setBankPreference(o.v)}>
                      <span className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                        <span className="min-w-0">
                          <span className="flex flex-wrap items-center gap-2 font-semibold">
                            {o.name}
                            {o.badge && <ToneBadge tone={o.badge.tone}>{o.badge.t}</ToneBadge>}
                          </span>
                          <span className="mt-0.5 block text-sm text-muted-foreground">{o.note}</span>
                        </span>
                        <span className="shrink-0 text-sm font-medium tabular sm:text-right">{o.price}</span>
                      </span>
                    </OptionCard>
                  ))}
                </div>

                <div className="rounded-xl border border-border bg-secondary/40 p-4 text-sm">
                  <p className="flex items-center gap-2 font-semibold">
                    <CreditCard className="h-4 w-4 text-accent-blue" aria-hidden="true" /> Karten zum HK-Konto
                  </p>
                  <dl className="mt-2 divide-y divide-border/70">
                    <DefRow term="Statrys">physische und virtuelle Prepaid-Mastercard, Multi-Currency direkt am Konto.</DefRow>
                    <DefRow term="Airwallex">
                      unbegrenzt virtuelle und physische <strong>Borderless-Visa-Karten</strong>, Employee-Cards, niedrige FX,
                      ideal für Meta/TikTok/Google-Ad-Spend.
                    </DefRow>
                    <DefRow term="Currenxie">Global Account mit virtuellen Karten, FX-fokussiert.</DefRow>
                    <DefRow term="HSBC HK">ATM-/Debitkarte zum Konto; Business-Kreditkarte erst mit echter HK-Präsenz und Bankbeziehung.</DefRow>
                  </dl>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Für D2C/Performance-Marketing: Airwallex-Multi-Currency-Karten sind Standard für Ad-Spend mit niedrigem
                    Währungsverlust; Versand der Karten an deine DE-Adresse möglich.
                  </p>
                </div>

                <Callout tone="danger" title="HK-Banking-Realität 2026">
                  <Bullets
                    items={[
                      "HSBC, DBS und Bank of China haben eine Foreign-Founder-Ablehnungsquote von 40 bis 60 %",
                      "Persönlicher HK-Termin Pflicht (Flug und Hotel ca. 2.000 bis 3.000 EUR)",
                      "Account-Reviews alle 12 bis 24 Monate, jeweils neue KYC-Runde",
                      "HKMA Stablecoin-Lizenz April 2026 verschärft KYC weiter",
                      "Fintechs (Statrys/Airwallex/Currenxie) sind die De-facto-Standard-Lösung",
                    ]}
                  />
                </Callout>

                <InLink to="/cockpit/intl-banking" className="text-sm">
                  Detaillierter Banking-Vergleich mit Closure-Risiko <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </InLink>
              </div>
            )}

            {/* STEP 11: Audit + Annual Returns */}
            {step === 11 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  JÄHRLICHE Pflichten, selbst bei 0 Umsatz! Versäumnis: bis HKD 3.480 Late-Filing-Fee (NAR1).
                </p>

                <ol className="space-y-3">
                  <PflichtItem n={1} tone="danger" title="Audit-Pflicht (jährlich, auch bei 0 Umsatz)">
                    <Bullets
                      items={[
                        "HK-zertifizierter Auditor (CPA mit Practising Certificate) zwingend",
                        "Audit-Bericht muss zusammen mit der Profits Tax Return eingereicht werden",
                        "Budget: HKD 8.000 bis 25.000 pro Jahr für kleine Firmen",
                        "Aktives Trading: HKD 15.000 bis 50.000 pro Jahr",
                        "Sleek/Osome bieten Audit-Pakete für HKD 8.000 bis 15.000 pro Jahr",
                        "Dormant-Status (0 Transaktionen) möglich: reduzierter Audit, aber nicht weggelassen",
                      ]}
                    />
                  </PflichtItem>
                  <PflichtItem n={2} tone="warning" title="Annual Return (Form NAR1)">
                    <Bullets
                      items={[
                        "Frist: 42 Tage nach dem Anniversary-Date der Gründung",
                        "Fee: HKD 105 (Private Company)",
                        "Bei Versäumnis: gestaffelte Late-Filing-Registration-Fee 870/1.740/2.610/3.480, max. HKD 3.480 (NAR1 Private Company)",
                      ]}
                    />
                  </PflichtItem>
                  <PflichtItem n={3} tone="warning" title="Profits Tax Return (IRD)">
                    <Bullets
                      items={[
                        "Erste PTR: 18 Monate nach Gründung (BIR51)",
                        "Folgende: jährlich, ca. 1 Monat nach IRD-Versand",
                        'Bei Offshore-Claim: separate "Notice of Foreign-Sourced Income" anhängen',
                      ]}
                    />
                  </PflichtItem>
                  <PflichtItem n={4} tone="warning" title="Business Registration Renewal">
                    <Bullets
                      items={[
                        "Automatisch, IRD schickt eine Demand Note",
                        "HKD 2.350/Jahr (HKD 2.200 + HKD 150 Levy) oder HKD 6.170 für 3 Jahre",
                      ]}
                    />
                  </PflichtItem>
                  <PflichtItem n={5} tone="warning" title="Significant Controllers Register Update">
                    <Bullets
                      items={[
                        "Bei jeder Änderung (Owner/Shareholder/Director) Update binnen 7 Tagen",
                        "Pflicht-Inspektion durch HK-Polizei oder Companies Registry möglich",
                      ]}
                    />
                  </PflichtItem>
                </ol>

                <Callout tone="info" title="DE-Steuer-Aspekt">
                  Bei DE-Wohnsitz des Directors/Owners ist §AStG-Hinzurechnungsbesteuerung möglich (Niedrigsteuer-Schwelle
                  15 % seit 2024, HK effektiv 8,25 %). Siehe <InLink to="/cockpit/dba-cfc">DBA-CFC-Rechner</InLink> und{" "}
                  <InLink to="/cockpit/substance-checker">Substance-Checker</InLink>.
                </Callout>

                {/* Summary */}
                <ResultPanel variant="ink" kicker="Setup-Zusammenfassung" title={companyNameEn || "Firmenname noch offen"}>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <SummaryTile label="Service-Provider" value={PROVIDER_NAME[serviceProvider]} />
                    <SummaryTile
                      label="Setup-Kosten Jahr 1"
                      value={`${totalSetupCost.total.toLocaleString("en-US")} HKD`}
                      hint={`Filing ${totalSetupCost.filing} + BR ${totalSetupCost.br} + CS ${totalSetupCost.cs}`}
                    />
                    <SummaryTile
                      label="Laufende Kosten ab Jahr 2"
                      value={`${(totalSetupCost.cs + 2350 + 8000).toLocaleString("en-US")} HKD/yr`}
                      hint="CS + BR + Audit min. 8k"
                    />
                    <SummaryTile label="Geschätzte Profits Tax" value={`${Math.round(profitsTax).toLocaleString("en-US")} HKD/yr`} hint="aus Schritt 9" />
                  </div>
                  <Link
                    to="/playbook/preview/hk-limited"
                    className={cn(buttonVariants({ variant: "secondary" }), "mt-5 w-full sm:w-auto")}
                  >
                    <Sparkles aria-hidden="true" /> Komplettes Playbook öffnen <ArrowRight aria-hidden="true" />
                  </Link>
                </ResultPanel>
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
          <ToolSection title="Wichtige Updates Mai 2026" icon={Globe}>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                "FSIE-Regime seit 1.1.2023 für passive Einkünfte verschärft (Substanz-Anforderungen)",
                "HKMA Stablecoin-Lizenz April 2026: strengere Bank-KYC für alle HK-Banken",
                "SCR-Pflicht seit 1.3.2018 (HKD 25.000 Fine + HKD 700/Tag bei Versäumnis)",
                "KEIN umfassendes DBA Deutschland–HK in Kraft (nur beschränktes Schiff-/Luftverkehrs-Abkommen 2011; Comprehensive DTA seit 2014 in Verhandlung, nicht in Kraft): keine DBA-Quellensteuerreduktion, §AStG-Risiko entsprechend höher",
                "Two-Tier Profits Tax unverändert: 8,25 % bis HKD 2M, 16,5 % darüber",
                "Audit-Pflicht weiterhin auch bei 0 Umsatz (HKD 8.000 bis 15.000 pro Jahr Standard)",
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
  "Director und Shareholder",
  "Firmennamen prüfen",
  "Company Secretary engagieren",
  "Registered Office Address",
  "Share Capital und Articles",
  "NNC1-Filing und Business Registration",
  "Significant Controllers Register",
  "Profits Tax und FSIE-Status",
  "Bank-Setup",
  "Audit und Annual Returns",
];

const STEP_ICONS: ElementType[] = [Target, UserCog, Tag, Users, MapPin, FileText, FileCheck2, Users, Calculator, Landmark, Building2];

const PROVIDER_NAME: Record<string, string> = {
  statrys: "Statrys",
  sleek: "Sleek HK",
  osome: "Osome HK",
  hawksford: "Hawksford HK",
  diy: "DIY",
};

const TONE_TEXT_LOCAL: Record<Tone, string> = {
  neutral: "text-muted-foreground",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  accent: "text-accent-blue",
};

const OptionCard = ({
  active,
  onClick,
  compact = false,
  children,
}: {
  active: boolean;
  onClick: () => void;
  compact?: boolean;
  children: ReactNode;
}) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={cn(
      "relative block w-full rounded-xl border text-left text-foreground transition-[background-color,border-color,box-shadow] duration-200 active:translate-y-px",
      compact ? "px-3.5 py-2.5" : "p-4",
      active
        ? "border-accent-blue bg-accent shadow-[0_0_0_1px_hsl(var(--accent-blue)/0.35)]"
        : "border-border bg-card hover:border-foreground/25",
    )}
  >
    {children}
  </button>
);

const OptionTile = ({ kuerzel, title, badge, children }: { kuerzel: string; title: string; badge?: ReactNode; children: ReactNode }) => (
  <div className="rounded-xl border border-border bg-card p-4 text-sm">
    <div className="flex items-center justify-between gap-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-xs font-semibold text-accent-blue">{kuerzel}</span>
      {badge}
    </div>
    <p className="mt-3 font-semibold leading-snug">{title}</p>
    <p className="mt-1 text-muted-foreground">{children}</p>
  </div>
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

const InLink = ({ to, children, className }: { to: string; children: ReactNode; className?: string }) => (
  <Link to={to} className={cn("inline-flex items-center gap-1 font-medium text-accent-blue underline-offset-2 hover:underline", className)}>
    {children}
  </Link>
);

const Bullets = ({ items, className }: { items: ReactNode[]; className?: string }) => (
  <ul className={cn("space-y-1.5", className)}>
    {items.map((t, i) => (
      <li key={i} className="flex gap-2">
        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-current opacity-60" aria-hidden="true" />
        <span className="min-w-0">{t}</span>
      </li>
    ))}
  </ul>
);

const InfoList = ({ title, items }: { title: string; items: ReactNode[] }) => (
  <div className="rounded-xl border border-border bg-secondary/40 p-4">
    <p className="text-sm font-semibold">{title}</p>
    <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-blue" aria-hidden="true" />
          <span className="min-w-0">{t}</span>
        </li>
      ))}
    </ul>
  </div>
);

const DefRow = ({ term, children }: { term: ReactNode; children: ReactNode }) => (
  <div className="grid gap-1 py-2.5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-4">
    <dt className="font-medium text-foreground">{term}</dt>
    <dd className="text-muted-foreground">{children}</dd>
  </div>
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

const PflichtItem = ({ n, tone, title, children }: { n: number; tone: "danger" | "warning"; title: string; children: ReactNode }) => (
  <li className="flex gap-3 rounded-xl border border-border bg-card p-4">
    <span
      className={cn(
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular",
        tone === "danger" ? "bg-danger-soft text-danger" : "bg-warning-soft text-warning",
      )}
    >
      {n}
    </span>
    <div className="min-w-0 text-sm">
      <p className="font-semibold">{title}</p>
      <div className="mt-1.5 text-muted-foreground">{children}</div>
    </div>
  </li>
);

const SummaryTile = ({ label, value, hint }: { label: string; value: ReactNode; hint?: string }) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3.5">
    <p className="text-sm text-primary-foreground/70">{label}</p>
    <p className="mt-1 text-lg font-semibold tracking-tight text-primary-foreground tabular">{value}</p>
    {hint && <p className="mt-0.5 text-xs text-primary-foreground/60 tabular">{hint}</p>}
  </div>
);

export default HkLimitedWizard;
