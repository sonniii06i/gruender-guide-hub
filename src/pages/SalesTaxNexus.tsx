import { useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, AlertTriangle, CheckCircle2, MapPin, ExternalLink } from "lucide-react";

// US-Bundesstaaten mit ihren Economic-Nexus-Schwellen (Stand 2026, post-Wayfair).
// Quelle: TaxJar / Avalara / individuelle State-DOR-Websites.
type StateNexus = {
  code: string;
  name: string;
  /** $-Schwelle pro Jahr. */
  salesThreshold: number;
  /** Anzahl-Transaktions-Schwelle (manchmal alternativ). */
  transactionThreshold?: number;
  /** Logik: AND (beide gleichzeitig) oder OR (eins reicht). */
  logic: "AND" | "OR" | "salesOnly";
  /** Standard-Sales-Tax-Satz (state) in %. */
  stateRate: number;
  /** Mit lokalem Zuschlag durchschnittlich. */
  combinedAvg: number;
  /** Hat Marketplace-Facilitator-Gesetz (Amazon kassiert Sales Tax)? */
  marketplaceFacilitator: boolean;
  notes?: string;
};

const US_STATES: StateNexus[] = [
  { code: "AL", name: "Alabama", salesThreshold: 250000, logic: "salesOnly", stateRate: 4, combinedAvg: 9.25, marketplaceFacilitator: true },
  { code: "AK", name: "Alaska", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 0, combinedAvg: 1.76, marketplaceFacilitator: true, notes: "Kein State-Tax, aber Local-Tax in einigen Gemeinden" },
  { code: "AZ", name: "Arizona", salesThreshold: 100000, logic: "salesOnly", stateRate: 5.6, combinedAvg: 8.4, marketplaceFacilitator: true },
  { code: "AR", name: "Arkansas", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 6.5, combinedAvg: 9.46, marketplaceFacilitator: true },
  { code: "CA", name: "Kalifornien", salesThreshold: 500000, logic: "salesOnly", stateRate: 7.25, combinedAvg: 8.82, marketplaceFacilitator: true, notes: "Höchste Schwelle aller Staaten" },
  { code: "CO", name: "Colorado", salesThreshold: 100000, logic: "salesOnly", stateRate: 2.9, combinedAvg: 7.78, marketplaceFacilitator: true },
  { code: "CT", name: "Connecticut", salesThreshold: 100000, transactionThreshold: 200, logic: "AND", stateRate: 6.35, combinedAvg: 6.35, marketplaceFacilitator: true },
  { code: "DC", name: "Washington D.C.", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 6, combinedAvg: 6, marketplaceFacilitator: true },
  { code: "FL", name: "Florida", salesThreshold: 100000, logic: "salesOnly", stateRate: 6, combinedAvg: 7.02, marketplaceFacilitator: true },
  { code: "GA", name: "Georgia", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 4, combinedAvg: 7.32, marketplaceFacilitator: true },
  { code: "HI", name: "Hawaii", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 4, combinedAvg: 4.44, marketplaceFacilitator: true, notes: "GET (General Excise Tax) statt Sales Tax — anderer Mechanismus" },
  { code: "ID", name: "Idaho", salesThreshold: 100000, logic: "salesOnly", stateRate: 6, combinedAvg: 6.02, marketplaceFacilitator: true },
  { code: "IL", name: "Illinois", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 6.25, combinedAvg: 8.84, marketplaceFacilitator: true },
  { code: "IN", name: "Indiana", salesThreshold: 100000, logic: "salesOnly", stateRate: 7, combinedAvg: 7, marketplaceFacilitator: true },
  { code: "IA", name: "Iowa", salesThreshold: 100000, logic: "salesOnly", stateRate: 6, combinedAvg: 6.94, marketplaceFacilitator: true },
  { code: "KS", name: "Kansas", salesThreshold: 100000, logic: "salesOnly", stateRate: 6.5, combinedAvg: 8.7, marketplaceFacilitator: true },
  { code: "KY", name: "Kentucky", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 6, combinedAvg: 6, marketplaceFacilitator: true },
  { code: "LA", name: "Louisiana", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 4.45, combinedAvg: 9.55, marketplaceFacilitator: true },
  { code: "ME", name: "Maine", salesThreshold: 100000, logic: "salesOnly", stateRate: 5.5, combinedAvg: 5.5, marketplaceFacilitator: true },
  { code: "MD", name: "Maryland", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 6, combinedAvg: 6, marketplaceFacilitator: true },
  { code: "MA", name: "Massachusetts", salesThreshold: 100000, logic: "salesOnly", stateRate: 6.25, combinedAvg: 6.25, marketplaceFacilitator: true },
  { code: "MI", name: "Michigan", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 6, combinedAvg: 6, marketplaceFacilitator: true },
  { code: "MN", name: "Minnesota", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 6.875, combinedAvg: 7.49, marketplaceFacilitator: true },
  { code: "MS", name: "Mississippi", salesThreshold: 250000, logic: "salesOnly", stateRate: 7, combinedAvg: 7.07, marketplaceFacilitator: true },
  { code: "MO", name: "Missouri", salesThreshold: 100000, logic: "salesOnly", stateRate: 4.225, combinedAvg: 8.39, marketplaceFacilitator: true, notes: "Erst 2023 implementiert" },
  { code: "NE", name: "Nebraska", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 5.5, combinedAvg: 6.97, marketplaceFacilitator: true },
  { code: "NV", name: "Nevada", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 6.85, combinedAvg: 8.24, marketplaceFacilitator: true },
  { code: "NJ", name: "New Jersey", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 6.625, combinedAvg: 6.6, marketplaceFacilitator: true },
  { code: "NM", name: "New Mexico", salesThreshold: 100000, logic: "salesOnly", stateRate: 4.875, combinedAvg: 7.83, marketplaceFacilitator: true },
  { code: "NY", name: "New York", salesThreshold: 500000, transactionThreshold: 100, logic: "AND", stateRate: 4, combinedAvg: 8.53, marketplaceFacilitator: true },
  { code: "NC", name: "North Carolina", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 4.75, combinedAvg: 6.99, marketplaceFacilitator: true },
  { code: "ND", name: "North Dakota", salesThreshold: 100000, logic: "salesOnly", stateRate: 5, combinedAvg: 6.97, marketplaceFacilitator: true },
  { code: "OH", name: "Ohio", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 5.75, combinedAvg: 7.24, marketplaceFacilitator: true },
  { code: "OK", name: "Oklahoma", salesThreshold: 100000, logic: "salesOnly", stateRate: 4.5, combinedAvg: 8.99, marketplaceFacilitator: true },
  { code: "PA", name: "Pennsylvania", salesThreshold: 100000, logic: "salesOnly", stateRate: 6, combinedAvg: 6.34, marketplaceFacilitator: true },
  { code: "RI", name: "Rhode Island", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 7, combinedAvg: 7, marketplaceFacilitator: true },
  { code: "SC", name: "South Carolina", salesThreshold: 100000, logic: "salesOnly", stateRate: 6, combinedAvg: 7.46, marketplaceFacilitator: true },
  { code: "SD", name: "South Dakota", salesThreshold: 100000, logic: "salesOnly", stateRate: 4.5, combinedAvg: 6.4, marketplaceFacilitator: true, notes: "Origin des Wayfair-Urteils" },
  { code: "TN", name: "Tennessee", salesThreshold: 100000, logic: "salesOnly", stateRate: 7, combinedAvg: 9.55, marketplaceFacilitator: true },
  { code: "TX", name: "Texas", salesThreshold: 500000, logic: "salesOnly", stateRate: 6.25, combinedAvg: 8.2, marketplaceFacilitator: true },
  { code: "UT", name: "Utah", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 4.85, combinedAvg: 7.2, marketplaceFacilitator: true },
  { code: "VT", name: "Vermont", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 6, combinedAvg: 6.36, marketplaceFacilitator: true },
  { code: "VA", name: "Virginia", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 5.3, combinedAvg: 5.77, marketplaceFacilitator: true },
  { code: "WA", name: "Washington", salesThreshold: 100000, logic: "salesOnly", stateRate: 6.5, combinedAvg: 9.38, marketplaceFacilitator: true },
  { code: "WV", name: "West Virginia", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 6, combinedAvg: 6.55, marketplaceFacilitator: true },
  { code: "WI", name: "Wisconsin", salesThreshold: 100000, logic: "salesOnly", stateRate: 5, combinedAvg: 5.43, marketplaceFacilitator: true },
  { code: "WY", name: "Wyoming", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 4, combinedAvg: 5.36, marketplaceFacilitator: true },
];

// 5 Staaten ohne Sales Tax: Delaware, Montana, New Hampshire, Oregon, Alaska (state-level 0)
const NO_SALES_TAX_STATES = ["Delaware", "Montana", "New Hampshire", "Oregon"];

const SalesTaxNexus = () => {
  const [umsatzPerState, setUmsatzPerState] = useState<Record<string, number>>({});
  const [transaktionenPerState, setTransaktionenPerState] = useState<Record<string, number>>({});
  const [marketplaceMix, setMarketplaceMix] = useState<"shopify" | "amazon" | "mixed">("shopify");

  const updateUmsatz = (code: string, val: number) =>
    setUmsatzPerState({ ...umsatzPerState, [code]: val });

  const updateTransactions = (code: string, val: number) =>
    setTransaktionenPerState({ ...transaktionenPerState, [code]: val });

  const checkNexus = (state: StateNexus) => {
    const sales = umsatzPerState[state.code] ?? 0;
    const txns = transaktionenPerState[state.code] ?? 0;

    if (state.logic === "salesOnly") {
      return sales >= state.salesThreshold;
    }
    if (state.logic === "AND") {
      return sales >= state.salesThreshold && (state.transactionThreshold ? txns >= state.transactionThreshold : true);
    }
    // OR
    return (
      sales >= state.salesThreshold ||
      (state.transactionThreshold ? txns >= state.transactionThreshold : false)
    );
  };

  const triggeredStates = US_STATES.filter(checkNexus);
  const totalNexusUmsatz = triggeredStates.reduce((sum, s) => sum + (umsatzPerState[s.code] ?? 0), 0);
  const totalAllUmsatz = US_STATES.reduce((sum, s) => sum + (umsatzPerState[s.code] ?? 0), 0);

  // Geschätzte Sales-Tax-Pflicht (vereinfacht)
  const estimatedTax = triggeredStates.reduce((sum, s) => {
    const sales = umsatzPerState[s.code] ?? 0;
    return sum + sales * (s.combinedAvg / 100);
  }, 0);

  // Wenn Marketplace (Amazon) → Marketplace-Facilitator-Law: Amazon kassiert Sales Tax → User selbst nur Direct-Sales betroffen
  const showMarketplaceHint = marketplaceMix !== "shopify";

  return (
    <CockpitShell
      eyebrow="Sales-Tax-Nexus"
      title="US-Sales-Tax: pro Staat ab welchem Umsatz registrieren?"
      subtitle="Live-Check der Wayfair-Schwellen (Economic Nexus) für alle 46 sales-tax-pflichtigen US-Staaten + DC. Trag deinen jährlichen Staaten-Umsatz ein → siehe wo du registrieren musst."
    >
      {/* Mode Toggle */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4 mb-6">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
          Hauptverkaufs-Kanal
        </Label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { v: "shopify", l: "🛍️ Eigener Shop (Shopify/eigene Website)" },
            { v: "amazon", l: "📦 Amazon FBA (Marketplace)" },
            { v: "mixed", l: "Beides parallel" },
          ].map((o) => (
            <button
              key={o.v}
              onClick={() => setMarketplaceMix(o.v as typeof marketplaceMix)}
              className={`text-left rounded-xl border p-3 text-xs transition-colors ${
                marketplaceMix === o.v
                  ? "border-accent-blue bg-accent-blue/10 text-accent-blue font-semibold"
                  : "border-border hover:border-accent-blue/40"
              }`}
            >
              {o.l}
            </button>
          ))}
        </div>
        {showMarketplaceHint && (
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs text-emerald-700 mt-3">
            <CheckCircle2 className="h-3 w-3 inline mr-1" />
            <strong>Marketplace-Facilitator-Law:</strong> Amazon kassiert Sales Tax automatisch in allen 46 Staaten.
            Du musst dich NUR für DIRECT-Sales (eigener Shop) registrieren wenn die Schwelle dort erreicht ist.
            Reine Amazon-Sellers haben oft 0 Nexus-Pflicht.
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Gesamt-US-Umsatz</div>
          <div className="text-xl font-bold">${totalAllUmsatz.toLocaleString("en-US")}</div>
        </div>
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
          <div className="text-[10px] uppercase tracking-wider text-amber-700 mb-1">Nexus erreicht in</div>
          <div className="text-xl font-bold text-amber-700">
            {triggeredStates.length} / {US_STATES.length} Staaten
          </div>
        </div>
        <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-4">
          <div className="text-[10px] uppercase tracking-wider text-orange-700 mb-1">Davon Umsatz</div>
          <div className="text-xl font-bold text-orange-700">${totalNexusUmsatz.toLocaleString("en-US")}</div>
        </div>
        <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-4">
          <div className="text-[10px] uppercase tracking-wider text-red-700 mb-1">Geschätzte Tax-Last</div>
          <div className="text-xl font-bold text-red-700">${Math.round(estimatedTax).toLocaleString("en-US")}</div>
        </div>
      </div>

      {/* Triggered States */}
      {triggeredStates.length > 0 && (
        <div className="rounded-2xl border border-amber-500/40 bg-amber-500/5 p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-amber-700" />
            <h3 className="font-bold">⚠ Registrierungs-Pflicht in folgenden Staaten</h3>
          </div>
          <div className="space-y-2">
            {triggeredStates.map((s) => {
              const sales = umsatzPerState[s.code] ?? 0;
              const taxAmt = sales * (s.combinedAvg / 100);
              return (
                <div key={s.code} className="rounded-xl bg-card border border-amber-500/20 p-3">
                  <div className="flex items-center justify-between gap-3 flex-wrap mb-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-amber-700" />
                      <span className="font-bold text-sm">
                        {s.name} ({s.code})
                      </span>
                      <span className="rounded-full bg-amber-500/10 text-amber-700 px-2 py-0.5 text-[10px] font-semibold">
                        {s.combinedAvg.toFixed(2)} % combined
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Umsatz: ${sales.toLocaleString("en-US")} (Schwelle: ${s.salesThreshold.toLocaleString("en-US")})
                    </div>
                  </div>
                  <div className="text-xs">
                    Sales Tax geschätzt:{" "}
                    <span className="font-mono font-semibold">${Math.round(taxAmt).toLocaleString("en-US")}</span>
                  </div>
                  {s.notes && <div className="text-[11px] text-muted-foreground italic mt-1">{s.notes}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All States Input Table */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-3">Umsatz pro Staat eingeben (in USD)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-2">Staat</th>
                <th className="text-left py-2 px-2">Schwelle</th>
                <th className="text-left py-2 px-2">Tax-Satz</th>
                <th className="text-right py-2 px-2">Dein Umsatz ($)</th>
                <th className="text-right py-2 pl-2">Transaktionen</th>
                <th className="text-center py-2 pl-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {US_STATES.map((s) => {
                const sales = umsatzPerState[s.code] ?? 0;
                const txns = transaktionenPerState[s.code] ?? 0;
                const triggered = checkNexus(s);
                return (
                  <tr key={s.code} className="border-b border-border last:border-0">
                    <td className="py-2 pr-2">
                      <span className="font-semibold">{s.name}</span>
                      <span className="text-muted-foreground ml-1">({s.code})</span>
                    </td>
                    <td className="py-2 px-2 text-muted-foreground font-mono text-[10px]">
                      ${(s.salesThreshold / 1000).toFixed(0)}k
                      {s.transactionThreshold && (
                        <>
                          {" "}
                          {s.logic === "AND" ? "&" : "/"} {s.transactionThreshold} txn
                        </>
                      )}
                    </td>
                    <td className="py-2 px-2 font-mono text-[10px]">{s.combinedAvg.toFixed(1)} %</td>
                    <td className="py-2 px-2 text-right">
                      <Input
                        type="number"
                        min={0}
                        value={sales || ""}
                        onChange={(e) => updateUmsatz(s.code, Math.max(0, Number(e.target.value) || 0))}
                        placeholder="0"
                        className="h-8 text-right text-xs"
                      />
                    </td>
                    <td className="py-2 pl-2 text-right">
                      {s.transactionThreshold && (
                        <Input
                          type="number"
                          min={0}
                          value={txns || ""}
                          onChange={(e) => updateTransactions(s.code, Math.max(0, Number(e.target.value) || 0))}
                          placeholder="0"
                          className="h-8 text-right text-xs"
                        />
                      )}
                    </td>
                    <td className="py-2 pl-2 text-center">
                      {triggered ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 text-amber-700 px-2 py-0.5 text-[10px] font-semibold">
                          ⚠ Pflicht
                        </span>
                      ) : sales > 0 ? (
                        <span className="text-[10px] text-emerald-600">✓ unter Schwelle</span>
                      ) : (
                        <span className="text-[10px] text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* No-Sales-Tax States */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 mb-6 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Staaten OHNE Sales Tax (kein Nexus möglich):</div>
            <div className="flex flex-wrap gap-1.5">
              {NO_SALES_TAX_STATES.map((n) => (
                <span key={n} className="rounded-full bg-emerald-500/10 text-emerald-700 px-2 py-0.5 text-[10px]">
                  {n}
                </span>
              ))}
            </div>
            <div className="text-muted-foreground mt-1">
              Hier brauchst du keine State-Sales-Tax-Registration. Verkaufst du nur in diese 4 Staaten: 0 Nexus-Pflicht.
            </div>
          </div>
        </div>
      </div>

      {/* Tipps */}
      <div className="rounded-2xl border border-border bg-card p-4 text-xs leading-relaxed mb-6">
        <h3 className="font-bold text-sm mb-2">Wichtige Hinweise zu US-Sales-Tax</h3>
        <ul className="list-disc pl-4 space-y-1.5 text-muted-foreground">
          <li>
            <strong>Wayfair-Urteil 2018</strong>: Seit dem dürfen Staaten Out-of-State-Verkäufer zur Sales-Tax-
            Registrierung zwingen ab Erreichen der Schwelle (Economic Nexus).
          </li>
          <li>
            <strong>Marketplace-Facilitator-Laws</strong>: Amazon, eBay, Etsy kassieren Sales Tax in allen 46
            Staaten automatisch. Reine Marketplace-Verkäufer haben oft 0 Direct-Nexus.
          </li>
          <li>
            <strong>Direct-Sales (Shopify)</strong>: Du musst selbst registrieren + abführen. Tools wie TaxJar
            (Stripe), Avalara, Anrok automatisieren das.
          </li>
          <li>
            <strong>Software-Empfehlung</strong>: TaxJar 19 $/Mon (für &lt; 200 txn) bzw. Stripe Tax (gratis bis 100k
            $).
          </li>
          <li>
            <strong>Registrierung</strong>: pro Staat separat, dauert 2–6 Wochen. Quartal-/Monats-Filings danach.
          </li>
          <li>
            <strong>Bundessteuer (Federal)</strong>: Sales Tax ist NUR State/Local — Federal hat keine Sales Tax.
          </li>
          <li>
            <strong>Schwellen können sich ändern</strong>: Stand Mai 2026. Bei kommerziellem Setup mit US-CPA
            klären.
          </li>
        </ul>
      </div>

      {/* Tools */}
      <div className="rounded-2xl border border-border bg-card p-4 text-xs">
        <h3 className="font-bold mb-2">Empfohlene Tools für Sales-Tax-Compliance:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <a
            href="https://www.taxjar.com"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-lg border border-border bg-secondary/40 p-3 hover:bg-secondary transition-colors"
          >
            <div className="font-semibold mb-0.5">TaxJar (Stripe)</div>
            <div className="text-[11px] text-muted-foreground">
              Automatisches Filing pro Staat, ab 19 $/Mon
              <ExternalLink className="h-3 w-3 inline ml-1" />
            </div>
          </a>
          <a
            href="https://stripe.com/tax"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-lg border border-border bg-secondary/40 p-3 hover:bg-secondary transition-colors"
          >
            <div className="font-semibold mb-0.5">Stripe Tax</div>
            <div className="text-[11px] text-muted-foreground">
              Bis 100k $ kostenlos, dann 0,5 % Transaction-Fee
              <ExternalLink className="h-3 w-3 inline ml-1" />
            </div>
          </a>
          <a
            href="https://www.avalara.com"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-lg border border-border bg-secondary/40 p-3 hover:bg-secondary transition-colors"
          >
            <div className="font-semibold mb-0.5">Avalara</div>
            <div className="text-[11px] text-muted-foreground">
              Enterprise-Lösung, custom Pricing
              <ExternalLink className="h-3 w-3 inline ml-1" />
            </div>
          </a>
        </div>
      </div>
    </CockpitShell>
  );
};

export default SalesTaxNexus;
