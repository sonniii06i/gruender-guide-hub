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
} from "lucide-react";

const HkLimitedWizard = () => {
  const [step, setStep] = useState(1);
  const [companyNameEn, setCompanyNameEn] = useState("");
  const [companyNameCn, setCompanyNameCn] = useState("");
  const [shareCapital, setShareCapital] = useState(10000);
  const [serviceProvider, setServiceProvider] = useState<"statrys" | "sleek" | "osome" | "hawksford" | "diy">("sleek");
  const [annualRevenue, setAnnualRevenue] = useState(500000);
  const [offshoreClaim, setOffshoreClaim] = useState(false);
  const [bankPreference, setBankPreference] = useState<"statrys" | "airwallex" | "currenxie" | "hsbc">("statrys");

  const profitsTax = useMemo(() => {
    // Two-tier system: 8.25% bis 2 Mio HKD, 16.5% darüber
    const profitHkd = annualRevenue * 0.20 * 7.85; // grobe Schätzung 20 % Marge × HKD-Kurs
    const tier1Limit = 2_000_000;
    if (offshoreClaim) return 0;
    if (profitHkd <= tier1Limit) return profitHkd * 0.0825;
    return tier1Limit * 0.0825 + (profitHkd - tier1Limit) * 0.165;
  }, [annualRevenue, offshoreClaim]);

  const totalSetupCost = useMemo(() => {
    const filing = 1720; // HKD Online Filing
    const br = 250; // 1 Year BR
    const cs: Record<string, number> = {
      statrys: 1500,
      sleek: 1200,
      osome: 1000,
      hawksford: 3000,
      diy: 0,
    };
    return { filing, br, cs: cs[serviceProvider], total: filing + br + cs[serviceProvider] };
  }, [serviceProvider]);

  return (
    <CockpitShell
      eyebrow="HK-Limited-Wizard"
      title="Hong Kong Limited gründen"
      subtitle="Step-by-Step: Namens-Check, Company Secretary, NNC1-Filing, Business Registration, Bank, Audit-Setup. Mit Profits-Tax-Rechner + Offshore-Status-Check."
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
            <h2 className="text-base font-bold mb-1">1. Firmennamen prüfen</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Englischer Name + optional Chinesischer Name. Verfügbarkeit beim Cyber Search Centre des Companies
              Registry prüfen.
            </p>
            <div className="space-y-3">
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Englischer Name (Pflicht)</Label>
                <Input
                  value={companyNameEn}
                  onChange={(e) => setCompanyNameEn(e.target.value)}
                  placeholder="z.B. Acme Trading Limited"
                  className="mt-1"
                  autoFocus
                />
                <div className="text-[10px] text-muted-foreground mt-1">
                  Muss "Limited" oder "Ltd" am Ende enthalten
                </div>
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Chinesischer Name (optional)
                </Label>
                <Input
                  value={companyNameCn}
                  onChange={(e) => setCompanyNameCn(e.target.value)}
                  placeholder="例: 阿克美貿易有限公司"
                  className="mt-1"
                />
                <div className="text-[10px] text-muted-foreground mt-1">
                  Bei China-Geschäft empfohlen — kostet nichts extra
                </div>
              </div>
              <a
                href="https://www.icris.cr.gov.hk"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-xs text-accent-blue hover:underline"
              >
                ICRIS Cyber Search Centre — Verfügbarkeit prüfen{" "}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-base font-bold mb-1">2. Company Secretary engagieren</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Pflicht §474 Companies Ordinance: jede HK-Ltd MUSS einen lokalen Company Secretary haben (lizenzierte
              Firma oder natürliche Person mit HK-Resident-Status).
            </p>
            <div className="space-y-2">
              {[
                {
                  v: "statrys",
                  name: "Statrys",
                  price: "1.500 HKD/yr",
                  note: "Banking + CS-Paket inkludiert. Beste Lösung wenn du auch HK-Konto willst.",
                  url: "https://statrys.com",
                },
                {
                  v: "sleek",
                  name: "Sleek HK",
                  price: "1.200 HKD/yr",
                  note: "All-in-1: CS + Address + Compliance + Buchhaltung. Empfohlen für Solo-Founder.",
                  url: "https://sleek.com/hk",
                },
                {
                  v: "osome",
                  name: "Osome HK",
                  price: "1.000 HKD/yr",
                  note: "Günstig + automatisierte Buchhaltung. Gut für Small/Medium.",
                  url: "https://osome.com/hk/",
                },
                {
                  v: "hawksford",
                  name: "Hawksford HK",
                  price: "3.000+ HKD/yr",
                  note: "Premium-Provider für komplexe Strukturen + Family-Offices.",
                  url: "https://www.hawksford.com/hong-kong",
                },
                {
                  v: "diy",
                  name: "Eigenen lokalen Director (DIY)",
                  price: "0 HKD",
                  note: "Nur wenn du selbst nach HK ziehst oder Partner mit HKID hast",
                  url: "",
                },
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => setServiceProvider(o.v as typeof serviceProvider)}
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
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-base font-bold mb-1">3. Share Capital festlegen</h2>
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
              Tipp: 10.000 HKD ist Standard, ausreichend, kein Capital-Stempel-Tax.
            </div>
            <div className="rounded-xl bg-secondary/40 p-3 mt-3 text-xs">
              <strong>Director:</strong> mind. 1 natürliche Person (jede Nationalität, kein HK-Resident-Status nötig).
              <br />
              <strong>Shareholder:</strong> mind. 1, max. 50 (für "private limited").
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-base font-bold mb-1">4. Filing + Business Registration</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Form NNC1 + Articles of Association beim Companies Registry. Online via e-Registry-Portal.
            </p>
            <div className="rounded-xl bg-secondary/40 p-3 mb-3 text-xs space-y-2">
              <div>
                <strong>Schritt 1:</strong> NNC1-Form online ausfüllen (
                <a
                  href="https://www.cr.gov.hk/en/forms/forms-companies.htm"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-accent-blue underline inline-flex items-center gap-0.5"
                >
                  Form NNC1 PDF <ExternalLink className="h-2.5 w-2.5" />
                </a>
                )
              </div>
              <div>
                <strong>Schritt 2:</strong> Bei{" "}
                <a
                  href="https://www.eregistry.gov.hk"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-accent-blue underline inline-flex items-center gap-0.5"
                >
                  e-Registry HK <ExternalLink className="h-2.5 w-2.5" />
                </a>{" "}
                einreichen — Approval ~1 Werktag, max 1 Woche
              </div>
              <div>
                <strong>Filing-Fee:</strong> HKD 1.720 Online (HKD 2.225 mit "guaranteed-by-date")
              </div>
              <div>
                <strong>Business Registration:</strong> automatisch parallel mit IRD (Inland Revenue Department).
                Initial-Fee: HKD 250 für 1 Jahr (oder HKD 3.950 für 3 Jahre)
              </div>
            </div>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-xs">
              <strong>Postanschrift Companies Registry HK</strong> (für Brief-Filing):
              <br />
              14/F, Queensway Government Offices, 66 Queensway, Hong Kong
              <br />
              <br />
              <strong>IRD-Postanschrift:</strong> GPO Box 132, Hong Kong
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h2 className="text-base font-bold mb-1">5. Profits Tax + Offshore-Status</h2>
            <p className="text-xs text-muted-foreground mb-4">
              HK hat zwei-stufiges Steuersystem. Plus: Offshore-Claim möglich bei Auslands-Geschäft.
            </p>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Erwarteter Jahres-Umsatz (EUR)
            </Label>
            <Input
              type="number"
              value={annualRevenue}
              onChange={(e) => setAnnualRevenue(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1 mb-3"
            />
            <div className="rounded-xl border border-border bg-card p-3 mb-3 text-xs">
              <div className="font-bold mb-2">Two-Tier Profits Tax:</div>
              <div className="space-y-1 text-muted-foreground">
                <div>
                  · <strong>8,25 %</strong> auf erste 2 Mio HKD Profit
                </div>
                <div>
                  · <strong>16,5 %</strong> auf alles darüber
                </div>
                <div>
                  · <strong>Tax Year:</strong> 1.4. – 31.3. (oder eigenes Geschäftsjahr)
                </div>
                <div>
                  · <strong>Profits Tax Return</strong> jährlich, ~1 Monat nach Filing fällig
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-accent-blue/30 bg-accent-blue/5 p-3 mb-3">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Offshore-Status beantragen?
              </Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  { v: false, l: "Nein, Onshore-Geschäft" },
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
                  ✓ Offshore-Claim → 0 % Profits Tax möglich. ABER hohe Substanz-Anforderungen seit 2018:
                  <ul className="list-disc pl-4 mt-1 space-y-0.5">
                    <li>Keine HK-Kunden, keine HK-Mitarbeiter, keine HK-Lieferanten in Wertschöpfungskette</li>
                    <li>Antrag mit erster Profits Tax Return (innerhalb 18 Monaten nach Gründung)</li>
                    <li>IRD-Audit-Verfahren 6–18 Monate</li>
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
                ({Math.round(profitsTax / 7.85).toLocaleString("de-DE")} EUR)
              </span>
              <div className="text-[10px] text-muted-foreground mt-1">
                Annahme 20 % Marge auf {annualRevenue.toLocaleString("de-DE")} EUR Umsatz
              </div>
            </div>
          </>
        )}

        {step === 6 && (
          <>
            <h2 className="text-base font-bold mb-1">6. Bank + Audit-Setup</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Bank-Account + jährliches Audit (Pflicht für ALLE HK-Limiteds).
            </p>
            <div className="space-y-2 mb-4">
              {[
                {
                  v: "statrys",
                  name: "Statrys",
                  price: "9 USD/Mon",
                  note: "100 % remote · Multi-Currency · oft mit CS-Paket kombiniert",
                  url: "https://statrys.com",
                },
                {
                  v: "airwallex",
                  name: "Airwallex",
                  price: "0 USD/Mon",
                  note: "Multi-Currency Business-Account. Stark wachsend, gut für Tech-Startups.",
                  url: "https://airwallex.com",
                },
                {
                  v: "currenxie",
                  name: "Currenxie",
                  price: "0 USD/Mon",
                  note: "FX-fokussiert. Gut für International Trade.",
                  url: "https://currenxie.com",
                },
                {
                  v: "hsbc",
                  name: "HSBC HK",
                  price: "ab 200 HKD/Mon",
                  note: "Persönliche Vorstellung in HK Pflicht — nicht remote möglich.",
                  url: "https://www.hsbc.com.hk",
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
                    <div className="font-mono text-sm shrink-0">{o.price}</div>
                  </div>
                </button>
              ))}
            </div>
            <Link
              to="/cockpit/intl-banking"
              className="inline-flex items-center gap-1 text-xs text-accent-blue hover:underline"
            >
              → Detaillierter Banking-Vergleich (US + HK)
            </Link>

            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 mt-4 text-xs">
              <div className="font-semibold mb-1">Audit-Pflicht (jährlich):</div>
              <ul className="list-disc pl-4 space-y-0.5 text-muted-foreground">
                <li>HK-zertifizierter Auditor (CPA mit Practising Certificate) Pflicht</li>
                <li>Budget: HKD 8.000–25.000/Jahr für kleine Firmen, ab HKD 30.000 für aktive Trading</li>
                <li>Inaktive Firmen oft am unteren Ende</li>
                <li>Sleek/Osome bieten Audit-Pakete für ~HKD 8.000–15.000/Jahr</li>
              </ul>
            </div>

            {/* Summary */}
            <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/5 p-5 mt-6">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-700" />
                Setup-Zusammenfassung
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
                    {(totalSetupCost.cs + 250 + 8000).toLocaleString("en-US")} HKD/yr
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
          <Globe className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Jährliche Pflichten:</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                <strong>Annual Return (Form NAR1)</strong> bis 42 Tage nach Anniversary-Date — sonst Strafgebühren
                bis HKD 8.700
              </li>
              <li>
                <strong>Profits Tax Return</strong> jährlich ans IRD (typisch 1 Monat nach Versand-Aufforderung)
              </li>
              <li>
                <strong>Audited Accounts</strong> durch HK-CPA — Pflicht
              </li>
              <li>
                <strong>Business Registration Renewal</strong> — Reminder kommt automatisch von IRD
              </li>
              <li>
                <strong>DE-Steuer:</strong> bei DE-Wohnsitz § AStG-Hinzurechnung möglich. DBA Deutschland-HK seit
                2011 — Aktive Substanz nötig.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

export default HkLimitedWizard;
