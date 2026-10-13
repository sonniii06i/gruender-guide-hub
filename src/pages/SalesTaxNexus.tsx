import { useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { NumberField } from "@/components/ui/number-field";
import {
  Callout,
  ChoiceGroup,
  EmptyState,
  Field,
  KitTable,
  ResultPanel,
  ResultRow,
  ToneBadge,
  ToolLayout,
  ToolSection,
} from "@/components/cockpit/kit";
import { Calculator, AlertTriangle, MapPin, ExternalLink, Store, Info, Wrench } from "lucide-react";

// ============================================================
// US-SALES-TAX-NEXUS · Stand Mai 2026
// ============================================================
// Verifizierte Quellen: Sales Tax Institute (5/4/2026), Tax Foundation 2026,
// Avalara, TaxCloud, TaxValet, ARSSTC. Audit Mai 2026: 9 Staaten haben
// ihre Transaction-Threshold seit 2023 abgeschafft.
// ============================================================
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
  /** Verlangt Staat US-Adresse / SSN / ITIN für Registrierung? Hinderlich für DE-LLC. */
  foreignSellerBlocked?: boolean;
  notes?: string;
};

// Daten Mai 2026 — 45 Sales-Tax-Staaten + DC (Alaska nur lokal, keine State-Tax). Alle Updates seit 2023 verifiziert.
const US_STATES: StateNexus[] = [
  { code: "AL", name: "Alabama", salesThreshold: 250000, logic: "salesOnly", stateRate: 4, combinedAvg: 9.46, marketplaceFacilitator: true, notes: "Höhere Schwelle als Standard" },
  { code: "AK", name: "Alaska", salesThreshold: 100000, logic: "salesOnly", stateRate: 0, combinedAvg: 1.82, marketplaceFacilitator: true, notes: "Keine State-Tax, lokale Tax via ARSSTC. Txn-Schwelle weg seit 1.1.2025. Anchorage + Fairbanks haben gar keine Tax." },
  { code: "AZ", name: "Arizona", salesThreshold: 100000, logic: "salesOnly", stateRate: 5.6, combinedAvg: 8.52, marketplaceFacilitator: true, notes: "TPT (Transaction Privilege Tax) statt klassische Sales Tax" },
  { code: "AR", name: "Arkansas", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 6.5, combinedAvg: 9.46, marketplaceFacilitator: true },
  { code: "CA", name: "California", salesThreshold: 500000, logic: "salesOnly", stateRate: 7.25, combinedAvg: 8.99, marketplaceFacilitator: true, notes: "Höchste State-Rate. FBA-Inventar = physical Nexus ab $0 (CDTFA-Ruling 2025: schon <$2.5k reichen!)" },
  { code: "CO", name: "Colorado", salesThreshold: 100000, logic: "salesOnly", stateRate: 2.9, combinedAvg: 7.89, marketplaceFacilitator: true, notes: "Home-Rule-Cities mit eigenen Registrierungen (SUTS-Portal vereinfacht)" },
  { code: "CT", name: "Connecticut", salesThreshold: 100000, transactionThreshold: 200, logic: "AND", stateRate: 6.35, combinedAvg: 6.35, marketplaceFacilitator: true, notes: "AND-Logik (beide müssen erfüllt sein) — sehr seller-freundlich" },
  { code: "DC", name: "Washington D.C.", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 6, combinedAvg: 6, marketplaceFacilitator: true, foreignSellerBlocked: true, notes: "Verlangt SSN/ITIN/US-Adresse — keine DE-LLC-Registrierung möglich" },
  { code: "FL", name: "Florida", salesThreshold: 100000, logic: "salesOnly", stateRate: 6, combinedAvg: 6.98, marketplaceFacilitator: true, notes: "Neues eFile-Portal seit 12/2025, Commercial-Rent-Tax repealed 10/2025" },
  { code: "GA", name: "Georgia", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 4, combinedAvg: 7.49, marketplaceFacilitator: true },
  { code: "HI", name: "Hawaii", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 4, combinedAvg: 4.5, marketplaceFacilitator: true, notes: "GET (General Excise Tax) statt Sales Tax — kaskadiert in B2B (Wholesale 0,5% zusätzlich!)" },
  { code: "ID", name: "Idaho", salesThreshold: 100000, logic: "salesOnly", stateRate: 6, combinedAvg: 6.03, marketplaceFacilitator: true },
  { code: "IL", name: "Illinois", salesThreshold: 100000, logic: "salesOnly", stateRate: 6.25, combinedAvg: 8.96, marketplaceFacilitator: true, notes: "Txn-Schwelle weg seit 1.1.2026" },
  { code: "IN", name: "Indiana", salesThreshold: 100000, logic: "salesOnly", stateRate: 7, combinedAvg: 7, marketplaceFacilitator: true, notes: "Txn-Schwelle weg seit 1.1.2024" },
  { code: "IA", name: "Iowa", salesThreshold: 100000, logic: "salesOnly", stateRate: 6, combinedAvg: 6.94, marketplaceFacilitator: true },
  { code: "KS", name: "Kansas", salesThreshold: 100000, logic: "salesOnly", stateRate: 6.5, combinedAvg: 8.69, marketplaceFacilitator: true },
  { code: "KY", name: "Kentucky", salesThreshold: 100000, logic: "salesOnly", stateRate: 6, combinedAvg: 6, marketplaceFacilitator: true, notes: "Txn-Schwelle weg seit 1.8.2026 (HB 757, April 2026) — nur noch Umsatz-Schwelle 100k" },
  { code: "LA", name: "Louisiana", salesThreshold: 100000, logic: "salesOnly", stateRate: 5, combinedAvg: 10.11, marketplaceFacilitator: true, notes: "★ Höchster Combined-Rate USA. Txn-Schwelle weg seit 8/2023. Parish-System komplex." },
  { code: "ME", name: "Maine", salesThreshold: 100000, logic: "salesOnly", stateRate: 5.5, combinedAvg: 5.5, marketplaceFacilitator: true },
  { code: "MD", name: "Maryland", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 6, combinedAvg: 6, marketplaceFacilitator: true },
  { code: "MA", name: "Massachusetts", salesThreshold: 100000, logic: "salesOnly", stateRate: 6.25, combinedAvg: 6.25, marketplaceFacilitator: true },
  { code: "MI", name: "Michigan", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 6, combinedAvg: 6, marketplaceFacilitator: true },
  { code: "MN", name: "Minnesota", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 6.875, combinedAvg: 8.14, marketplaceFacilitator: true },
  { code: "MS", name: "Mississippi", salesThreshold: 250000, logic: "salesOnly", stateRate: 7, combinedAvg: 7.06, marketplaceFacilitator: true, notes: "Höhere Schwelle" },
  { code: "MO", name: "Missouri", salesThreshold: 100000, logic: "salesOnly", stateRate: 4.225, combinedAvg: 8.44, marketplaceFacilitator: true, notes: "Letzter Staat mit MPF (seit 1.1.2023)" },
  { code: "NE", name: "Nebraska", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 5.5, combinedAvg: 6.98, marketplaceFacilitator: true },
  { code: "NV", name: "Nevada", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 6.85, combinedAvg: 8.24, marketplaceFacilitator: true },
  { code: "NJ", name: "New Jersey", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 6.625, combinedAvg: 6.6, marketplaceFacilitator: true },
  { code: "NM", name: "New Mexico", salesThreshold: 100000, logic: "salesOnly", stateRate: 4.875, combinedAvg: 7.67, marketplaceFacilitator: true, notes: "GRT (Gross Receipts Tax) destination-based seit 2021 — funktional Sales-Tax-äquivalent" },
  { code: "NY", name: "New York", salesThreshold: 500000, transactionThreshold: 100, logic: "AND", stateRate: 4, combinedAvg: 8.54, marketplaceFacilitator: true, notes: "AND-Logik mit 100 Txn (nicht 200!), rolling 4-Quarter-Window" },
  { code: "NC", name: "North Carolina", salesThreshold: 100000, logic: "salesOnly", stateRate: 4.75, combinedAvg: 7, marketplaceFacilitator: true, notes: "Txn-Schwelle weg seit 1.7.2024" },
  { code: "ND", name: "North Dakota", salesThreshold: 100000, logic: "salesOnly", stateRate: 5, combinedAvg: 7.09, marketplaceFacilitator: true, foreignSellerBlocked: true, notes: "Verlangt SSN/ITIN/US-Adresse — keine DE-LLC-Registrierung möglich" },
  { code: "OH", name: "Ohio", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 5.75, combinedAvg: 7.29, marketplaceFacilitator: true },
  { code: "OK", name: "Oklahoma", salesThreshold: 100000, logic: "salesOnly", stateRate: 4.5, combinedAvg: 9.06, marketplaceFacilitator: true },
  { code: "PA", name: "Pennsylvania", salesThreshold: 100000, logic: "salesOnly", stateRate: 6, combinedAvg: 6.34, marketplaceFacilitator: true, foreignSellerBlocked: true, notes: "Verlangt SSN/ITIN/US-Adresse — keine DE-LLC-Registrierung möglich" },
  { code: "RI", name: "Rhode Island", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 7, combinedAvg: 7, marketplaceFacilitator: true },
  { code: "SC", name: "South Carolina", salesThreshold: 100000, logic: "salesOnly", stateRate: 6, combinedAvg: 7.49, marketplaceFacilitator: true },
  { code: "SD", name: "South Dakota", salesThreshold: 100000, logic: "salesOnly", stateRate: 4.2, combinedAvg: 6.11, marketplaceFacilitator: true, foreignSellerBlocked: true, notes: "Wayfair-Origin. Rate 4,2% bis 30.6.2027 (Sunset auf 4,5%). Txn-Schwelle weg seit 7/2023. Verlangt SSN/US-Adresse." },
  { code: "TN", name: "Tennessee", salesThreshold: 100000, logic: "salesOnly", stateRate: 7, combinedAvg: 9.61, marketplaceFacilitator: true, notes: "Zweithöchster Combined-Rate" },
  { code: "TX", name: "Texas", salesThreshold: 500000, logic: "salesOnly", stateRate: 6.25, combinedAvg: 8.2, marketplaceFacilitator: true, notes: "Single-Local-Use-Rate-Election 1,75% verfügbar. Bond für Foreign-Seller potenziell." },
  { code: "UT", name: "Utah", salesThreshold: 100000, logic: "salesOnly", stateRate: 4.85, combinedAvg: 7.42, marketplaceFacilitator: true, notes: "Txn-Schwelle weg seit 1.7.2025. State-Rate 4,85% (4,70% Basis + 0,15% statewide); inkl. uniform local ~6,10% Mindest-Kombi." },
  { code: "VT", name: "Vermont", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 6, combinedAvg: 6.39, marketplaceFacilitator: true },
  { code: "VA", name: "Virginia", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 5.3, combinedAvg: 5.77, marketplaceFacilitator: true, notes: "Inkl. 1% mandatory local add-on" },
  { code: "WA", name: "Washington", salesThreshold: 100000, logic: "salesOnly", stateRate: 6.5, combinedAvg: 9.51, marketplaceFacilitator: true, notes: "★ Doppel-Hit: Sales Tax + B&O Tax 1,5-2,1% zusätzlich!" },
  { code: "WV", name: "West Virginia", salesThreshold: 100000, transactionThreshold: 200, logic: "OR", stateRate: 6, combinedAvg: 6.59, marketplaceFacilitator: true },
  { code: "WI", name: "Wisconsin", salesThreshold: 100000, logic: "salesOnly", stateRate: 5, combinedAvg: 5.72, marketplaceFacilitator: true },
  { code: "WY", name: "Wyoming", salesThreshold: 100000, logic: "salesOnly", stateRate: 4, combinedAvg: 5.56, marketplaceFacilitator: true, notes: "Txn-Schwelle weg seit 1.7.2024" },
];

// NOMAD-Staaten ohne State-Sales-Tax: New Hampshire, Oregon, Montana, Alaska, Delaware.
// Alaska hat state-level KEINE Sales Tax (nur lokale Taxes), daher hier nicht im Array (das nur State-Tax-0-Staaten ohne lokale listet).
const NO_SALES_TAX_STATES = ["Delaware", "Montana", "New Hampshire", "Oregon"];

const SalesTaxNexus = () => {
  const [umsatzPerState, setUmsatzPerState] = useState<Record<string, number>>({});
  const [transaktionenPerState, setTransaktionenPerState] = useState<Record<string, number>>({});
  const [marketplaceMix, setMarketplaceMix] = useState<"shopify" | "amazon" | "mixed">("shopify");
  // Anteil der Umsätze über Marktplätze (bei "Beides parallel")
  const [marketplaceAnteilMixed, setMarketplaceAnteilMixed] = useState(50);
  // Staaten mit eigenem Lagerbestand (z. B. FBA-Fulfillment-Center) → physischer Nexus unabhängig von Schwellen
  const [lagerStaatenRaw, setLagerStaatenRaw] = useState("");
  const lagerStaaten = new Set(
    lagerStaatenRaw.toUpperCase().split(/[^A-Z]+/).filter((c) => c.length === 2),
  );
  const marketplaceAnteil = marketplaceMix === "amazon" ? 1 : marketplaceMix === "mixed" ? Math.min(100, Math.max(0, marketplaceAnteilMixed)) / 100 : 0;

  const updateUmsatz = (code: string, val: number) =>
    setUmsatzPerState({ ...umsatzPerState, [code]: val });

  const updateTransactions = (code: string, val: number) =>
    setTransaktionenPerState({ ...transaktionenPerState, [code]: val });

  const checkNexus = (state: StateNexus) => {
    const sales = umsatzPerState[state.code] ?? 0;
    const txns = transaktionenPerState[state.code] ?? 0;

    // Physischer Nexus: Lagerbestand im Staat (auch FBA-Inventar) → Registrierungspflicht ohne Schwelle
    if (lagerStaaten.has(state.code)) return true;
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

  // Geschätzte selbst abzuführende Sales Tax (vereinfacht): Marketplace-Umsätze zählen zwar meist zur
  // Nexus-Schwelle, die Steuer darauf erhebt und führt aber der Marktplatz ab (Marketplace Facilitator Laws).
  const estimatedTax = triggeredStates.reduce((sum, s) => {
    const sales = umsatzPerState[s.code] ?? 0;
    return sum + sales * (1 - marketplaceAnteil) * (s.combinedAvg / 100);
  }, 0);

  // Wenn Marketplace (Amazon) → Marketplace-Facilitator-Law: Amazon kassiert Sales Tax → User selbst nur Direct-Sales betroffen
  const showMarketplaceHint = marketplaceMix !== "shopify";

  return (
    <CockpitShell
      eyebrow="Sales-Tax-Nexus · Stand Mai 2026"
      title="US-Sales-Tax: pro Staat ab welchem Umsatz registrieren?"
      subtitle="Live-Check der Wayfair-Schwellen (Economic Nexus) für 45 Sales-Tax-Staaten plus DC (Alaska nur lokal). Updates 2026: 9 Staaten haben die Transaktions-Schwelle abgeschafft (SD, LA, IN, NC, WY, AK, UT, IL, KY). FBA-Inventar bedeutet Nexus ab 0 $. 4 Staaten (DC, ND, PA, SD) blockieren DE-LLCs ohne SSN."
    >
      <ToolLayout
        className="mb-8"
        inputs={
          <>
            <ToolSection title="Hauptverkaufskanal" icon={Store}>
              <ChoiceGroup<typeof marketplaceMix>
                label="Hauptverkaufskanal"
                value={marketplaceMix}
                onChange={setMarketplaceMix}
                className="grid grid-cols-1 sm:grid-cols-3"
                options={[
                  { value: "shopify", label: "Eigener Shop", hint: "Shopify oder eigene Website" },
                  { value: "amazon", label: "Amazon FBA", hint: "Marketplace" },
                  { value: "mixed", label: "Beides parallel", hint: "Shop und Marketplace" },
                ]}
              />
              {showMarketplaceHint && (
                <Callout tone="success" title="Marketplace-Facilitator-Law" className="mt-4">
                  Amazon erhebt und führt die Sales Tax auf Marketplace-Verkäufe in allen Staaten mit Sales Tax ab (Alaska nur lokal).
                  Für die Nexus-Schwelle zählen Marketplace-Umsätze aber in den meisten Staaten mit: Wer sie überschreitet oder
                  Lagerbestand (FBA-Inventar) im Staat hat, muss sich je nach Staat trotzdem registrieren und ggf. Null-Erklärungen abgeben.
                  Die eigene Sales Tax fällt dann nur auf Direktverkäufe (eigener Shop) an.
                </Callout>
              )}
              {marketplaceMix === "mixed" && (
                <Field label="Anteil Marketplace-Umsatz (%)" htmlFor="stn-mp-anteil" className="mt-4">
                  <NumberField
                    id="stn-mp-anteil"
                    value={marketplaceAnteilMixed}
                    onChange={setMarketplaceAnteilMixed}
                    min={0}
                    max={100}
                    aria-label="Anteil Marketplace-Umsatz in Prozent"
                  />
                </Field>
              )}
              <Field
                label="Staaten mit Lagerbestand (Kürzel, z. B. CA, TX, AZ)"
                htmlFor="stn-lager"
                hint="FBA-Fulfillment-Center oder eigenes Lager begründen physischen Nexus ohne Umsatzschwelle. Die Lagerorte stehen im Seller Central (Inventory Event Detail)."
                className="mt-4"
              >
                <Input id="stn-lager" value={lagerStaatenRaw} onChange={(e) => setLagerStaatenRaw(e.target.value)} placeholder="z. B. CA, TX" />
              </Field>
            </ToolSection>

            <Callout tone="success" title="Staaten ohne Sales Tax (kein Nexus möglich)">
              <div className="mt-1 flex flex-wrap gap-1.5">
                {NO_SALES_TAX_STATES.map((n) => (
                  <ToneBadge key={n} tone="success">
                    {n}
                  </ToneBadge>
                ))}
              </div>
              <p className="mt-2">
                Hier brauchst du keine State-Sales-Tax-Registrierung. Verkaufst du nur in diese 4 Staaten, entsteht keine
                Nexus-Pflicht.
              </p>
            </Callout>
          </>
        }
        result={
          <>
            <ResultPanel
              variant="ink"
              kicker="Nexus erreicht in"
              title="Staaten mit Registrierungspflicht"
              value={
                <>
                  {triggeredStates.length}
                  <span className="text-2xl text-primary-foreground/60"> / {US_STATES.length}</span>
                </>
              }
            >
              <div className="divide-y divide-white/10">
                <ResultRow label="Gesamt-US-Umsatz" value={`$${totalAllUmsatz.toLocaleString("en-US")}`} />
                <ResultRow label="Davon in Nexus-Staaten" value={`$${totalNexusUmsatz.toLocaleString("en-US")}`} />
                <ResultRow
                  label="Geschätzte selbst abzuführende Sales Tax"
                  hint="Combined-Durchschnitt je Staat, ohne Marketplace-Umsätze (die führt der Marktplatz ab)"
                  value={`$${Math.round(estimatedTax).toLocaleString("en-US")}`}
                  strong
                />
              </div>
            </ResultPanel>
          </>
        }
      />

      <ToolSection
        className="mb-6"
        title="Umsatz pro Staat (USD)"
        description="Jahresumsatz und, wo relevant, Anzahl Transaktionen eintragen."
        icon={Calculator}
      >
        <KitTable caption="Umsatz und Transaktionen pro US-Staat" className="max-h-[640px] overflow-y-auto">
          <thead className="sticky top-0 z-10">
            <tr>
              <th>Staat</th>
              <th>Schwelle</th>
              <th className="!text-right">Satz</th>
              <th className="!text-right">Umsatz ($)</th>
              <th className="!text-right">Transaktionen</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {US_STATES.map((s) => {
              const sales = umsatzPerState[s.code] ?? 0;
              const txns = transaktionenPerState[s.code] ?? 0;
              const triggered = checkNexus(s);
              return (
                <tr key={s.code} className={triggered ? "bg-warning-soft/60" : undefined}>
                  <td className="whitespace-nowrap">
                    <span className="font-medium">{s.name}</span>
                    <span className="ml-1 text-muted-foreground">({s.code})</span>
                  </td>
                  <td className="whitespace-nowrap text-xs text-muted-foreground">
                    ${(s.salesThreshold / 1000).toFixed(0)}k
                    {s.transactionThreshold && (
                      <>
                        {" "}
                        {s.logic === "AND" ? "&" : "/"} {s.transactionThreshold} Txn
                      </>
                    )}
                  </td>
                  <td className="whitespace-nowrap text-right text-xs">{s.combinedAvg.toFixed(1)} %</td>
                  <td className="text-right">
                    <Input
                      type="number"
                      min={0}
                      value={sales || ""}
                      onChange={(e) => updateUmsatz(s.code, Math.max(0, Number(e.target.value) || 0))}
                      placeholder="0"
                      aria-label={`Umsatz ${s.name} in USD`}
                      className="ml-auto h-8 w-28 text-right text-sm tabular"
                    />
                  </td>
                  <td className="text-right">
                    {s.transactionThreshold && (
                      <Input
                        type="number"
                        min={0}
                        value={txns || ""}
                        onChange={(e) => updateTransactions(s.code, Math.max(0, Number(e.target.value) || 0))}
                        placeholder="0"
                        aria-label={`Transaktionen ${s.name}`}
                        className="ml-auto h-8 w-24 text-right text-sm tabular"
                      />
                    )}
                  </td>
                  <td className="whitespace-nowrap">
                    {triggered ? (
                      <ToneBadge tone="warning">Pflicht</ToneBadge>
                    ) : sales > 0 ? (
                      <ToneBadge tone="success">unter Schwelle</ToneBadge>
                    ) : (
                      <span className="text-xs text-muted-foreground">offen</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </KitTable>
      </ToolSection>
      {triggeredStates.length > 0 ? (
        <ToolSection title="Registrierungspflicht in diesen Staaten" icon={AlertTriangle} className="mb-6">
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {triggeredStates.map((s) => {
              const sales = umsatzPerState[s.code] ?? 0;
              const taxAmt = sales * (s.combinedAvg / 100);
              return (
                <li key={s.code} className="rounded-xl border border-warning/25 bg-warning-soft p-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <MapPin className="h-4 w-4 text-warning" aria-hidden="true" />
                      {s.name} ({s.code})
                    </span>
                    <ToneBadge tone="warning">{s.combinedAvg.toFixed(2)} % combined</ToneBadge>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">Umsatz / Schwelle</p>
                      <p className="font-medium tabular">
                        ${sales.toLocaleString("en-US")} / ${s.salesThreshold.toLocaleString("en-US")}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Sales Tax geschätzt</p>
                      <p className="font-semibold tabular">${Math.round(taxAmt).toLocaleString("en-US")}</p>
                    </div>
                  </div>
                  {s.notes && <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.notes}</p>}
                </li>
              );
            })}
          </ul>
        </ToolSection>
      ) : (
        <EmptyState
          icon={MapPin}
          title="Noch keine Registrierungspflicht"
          description="Trag oben deinen Umsatz pro Staat ein. Staaten über der Schwelle erscheinen hier mit geschätzter Sales Tax."
          className="mb-6 py-10"
        />
      )}


      {/* CRITICAL: Was Solo-FBA-Seller WIRKLICH wissen müssen */}
      <Callout tone="danger" title="Kritisch für FBA-Seller: was du wirklich wissen musst (Mai 2026)" className="mb-6">
        <ul className="mt-1 list-disc space-y-1.5 pl-4">
          <li>
            <strong className="text-foreground">Marketplace-Facilitator ≠ "set & forget":</strong>{" "}
            Amazon kassiert zwar, aber Marketplace-Sales zählen TROTZDEM zur Nexus-Schwelle in den
            meisten Staaten. Sobald du über Amazon-only die Schwelle reißt, musst du registrieren +
            Zero-Returns einreichen. Ausnahmen: AZ, CT, IA, TN (rechnen Marketplace-Sales nicht zur Schwelle).
          </li>
          <li>
            <strong className="text-foreground">FBA-Inventory = Physical Nexus ($0-Schwelle!):</strong>{" "}
            Sobald Amazon dein Inventar in ein FC im Staat verschiebt → sofortige Registrierungspflicht,
            UNABHÄNGIG der Umsatz-Schwelle. CA hatte 2025 ein Ruling: schon $2.5k Inventar reichten.
            FBA-Inventory-Ledger nach Staat monatlich tracken!
          </li>
          <li>
            <strong className="text-foreground">DC, ND, PA, SD blockieren DE-LLCs:</strong> Diese 4
            Staaten verlangen SSN/ITIN/US-Adresse für Registrierung — als reine DE-LLC ohne US-Pendant
            kein Registrierungs-Weg. Ironisch: SD ist Wayfair-Origin.
          </li>
          <li>
            <strong className="text-foreground">SSTRS als Foreign-Seller-Workaround:</strong> Streamlined
            Sales Tax Registration System (sstregister.org) erlaubt Registrierung ohne FEIN/SSN für 24
            Member-Staaten (AR, GA, IN, IA, KS, KY, MI, MN, NE, NV, NJ, NC, ND, OH, OK, RI, SD, TN,
            UT, VT, WA, WV, WI, WY). Vergibt Ersatz-ID.
          </li>
          <li>
            <strong className="text-foreground">EIN ohne SSN/ITIN:</strong> Telefonisch IRS International
            Line +1-267-941-1099 oder Form SS-4 per Fax. Online geht nicht.
          </li>
          <li>
            <strong className="text-foreground">WA + HI + NM:</strong> Plane Buchungsrücklage 1-10%
            zusätzlich (B&O-Tax bzw. GET-Pyramidierung bzw. GRT) NEBEN Sales Tax.
          </li>
        </ul>
      </Callout>

      <ToolSection title="Wichtige Hinweise zu US-Sales-Tax (Stand Mai 2026)" icon={Info} className="mb-6">
        <ul className="list-disc space-y-2 pl-4 text-sm leading-relaxed text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground">
          <li>
            <strong>Wayfair-Urteil 2018</strong>: Seitdem dürfen Staaten Out-of-State-Verkäufer zur
            Sales-Tax-Registrierung zwingen ab Erreichen der Schwelle (Economic Nexus).
          </li>
          <li>
            <strong>9 Staaten haben ihre Transaction-Schwelle seit 2023 ABGESCHAFFT:</strong> SD (7/2023),
            LA (8/2023), IN (1/2024), NC (7/2024), WY (7/2024), AK (1/2025), UT (7/2025), IL (1/2026),
            KY (8/2026 kommend). Veraltete Guides verbreiten noch die alten 200-Txn-Schwellen — nicht
            mehr gültig!
          </li>
          <li>
            <strong>Marketplace-Facilitator-Laws</strong>: Alle 45 Sales-Tax-Staaten + DC + Alaska (state-level keine Sales Tax)
            (ARSSTC) haben jetzt MPF. Missouri war 1.1.2023 der letzte.
          </li>
          <li>
            <strong>Software-Empfehlung</strong>: TaxJar 19$/Mon (für &lt;200 txn) bzw. Stripe Tax
            (gratis bis 100k$) bzw. Avalara (Enterprise) bzw. Numeral (modern, Foreign-Seller-friendly).
          </li>
          <li>
            <strong>Registrierung</strong>: pro Staat separat, 2-6 Wochen. Quartal-/Monats-Filings
            danach. SSTRS für 24 SSUTA-Staaten gleichzeitig.
          </li>
          <li>
            <strong>Bundessteuer (Federal)</strong>: Sales Tax ist NUR State/Local — Federal hat keine.
          </li>
          <li>
            <strong>Höchster Combined-Rate</strong>: Louisiana 10,11% (★), Tennessee 9,61%, Washington
            9,51%, Arkansas 9,46%, Alabama 9,46%.
          </li>
          <li>
            <strong>Schwellen können sich ändern</strong>: Stand Mai 2026. Bei kommerziellem Setup mit
            US-CPA klären.
          </li>
        </ul>
      </ToolSection>

      <ToolSection title="Empfohlene Tools für Sales-Tax-Compliance" icon={Wrench}>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            { href: "https://www.taxjar.com", t: "TaxJar (Stripe)", d: "Automatisches Filing pro Staat, ab 19 $/Mon" },
            { href: "https://stripe.com/tax", t: "Stripe Tax", d: "Bis 100k $ kostenlos, dann 0,5 % Transaction-Fee" },
            { href: "https://www.avalara.com", t: "Avalara", d: "Enterprise-Lösung, custom Pricing" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group rounded-xl border border-border bg-card p-4 transition-[border-color,box-shadow] duration-200 hover:border-accent-blue/40 hover:shadow-card"
            >
              <p className="flex items-center justify-between gap-2 text-sm font-semibold">
                {l.t}
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent-blue" aria-hidden="true" />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{l.d}</p>
            </a>
          ))}
        </div>
      </ToolSection>
    </CockpitShell>
  );
};

export default SalesTaxNexus;
