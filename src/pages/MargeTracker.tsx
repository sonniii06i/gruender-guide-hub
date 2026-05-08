import { useState, useMemo } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, TrendingDown, Plus, Trash2, AlertTriangle } from "lucide-react";

type Channel = "shopify" | "amazon-fba" | "amazon-fbm" | "ebay" | "kaufland" | "otto" | "etsy";

const CHANNEL_INFO: Record<Channel, { name: string; emoji: string; defaultProvision: number; defaultPaymentFee: number; bemerkung: string }> = {
  shopify: { name: "Shopify (eigener Shop)", emoji: "🛍️", defaultProvision: 0, defaultPaymentFee: 2.5, bemerkung: "Keine Marketplace-Provision · Payment-Fee 1,9–2,9 %" },
  "amazon-fba": { name: "Amazon FBA", emoji: "📦", defaultProvision: 15, defaultPaymentFee: 0, bemerkung: "Verkaufsprovision 8–17 % · FBA-Pick&Pack separat" },
  "amazon-fbm": { name: "Amazon FBM", emoji: "📮", defaultProvision: 15, defaultPaymentFee: 0, bemerkung: "Wie FBA aber Versand selbst — keine FBA-Pick&Pack" },
  ebay: { name: "eBay", emoji: "🔨", defaultProvision: 12.55, defaultPaymentFee: 0, bemerkung: "11 % Endpreisvergebühr + 0,35 € pro Listing" },
  kaufland: { name: "Kaufland.de", emoji: "🏪", defaultProvision: 10, defaultPaymentFee: 0, bemerkung: "Kategorie-abhängig 6–14 % · 39,95 €/Mon Pro" },
  otto: { name: "Otto Marketplace", emoji: "🛒", defaultProvision: 14, defaultPaymentFee: 0, bemerkung: "Kategorie-abhängig 11–20 %" },
  etsy: { name: "Etsy", emoji: "🎨", defaultProvision: 6.5, defaultPaymentFee: 4, bemerkung: "6,5 % Transaktion + 0,20 $ Listing + ~4 % Payment" },
};

type SkuData = {
  id: string;
  name: string;
  channel: Channel;
  /** Verkaufspreis netto. */
  vkNetto: number;
  /** Versandkosten an Kunde. */
  versandKundeNetto: number;
  /** Wareneinsatz / COGS. */
  cogs: number;
  /** Eigene Versandkosten an Marketplace/Kunde. */
  versandKostenNetto: number;
  /** Verpackungskosten. */
  verpackung: number;
  /** Marketplace-Provision in % vom VK brutto. */
  provisionPct: number;
  /** Payment-Fee in % vom VK brutto. */
  paymentFeePct: number;
  /** FBA / 3PL-Pick-Pack pro Stück (€). */
  fulfilmentPerUnit: number;
  /** Werbe-Anteil (PPC, Sponsored) als € pro Stück. */
  werbungPerUnit: number;
  /** Retoure-Quote in %. */
  retourenPct: number;
};

const MargeTracker = () => {
  const [skus, setSkus] = useState<SkuData[]>([
    {
      id: "1",
      name: "Beispiel-Produkt",
      channel: "amazon-fba",
      vkNetto: 25,
      versandKundeNetto: 0,
      cogs: 6,
      versandKostenNetto: 0,
      verpackung: 0.5,
      provisionPct: 15,
      paymentFeePct: 0,
      fulfilmentPerUnit: 3.5,
      werbungPerUnit: 2,
      retourenPct: 8,
    },
  ]);

  const addSku = () => {
    const ch = "amazon-fba" as Channel;
    setSkus([
      ...skus,
      {
        id: Date.now().toString(),
        name: `SKU ${skus.length + 1}`,
        channel: ch,
        vkNetto: 0,
        versandKundeNetto: 0,
        cogs: 0,
        versandKostenNetto: 0,
        verpackung: 0,
        provisionPct: CHANNEL_INFO[ch].defaultProvision,
        paymentFeePct: CHANNEL_INFO[ch].defaultPaymentFee,
        fulfilmentPerUnit: 0,
        werbungPerUnit: 0,
        retourenPct: 0,
      },
    ]);
  };

  const removeSku = (id: string) => setSkus(skus.filter((s) => s.id !== id));
  const updateSku = (id: string, patch: Partial<SkuData>) => setSkus(skus.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const updateChannel = (id: string, channel: Channel) => {
    const info = CHANNEL_INFO[channel];
    updateSku(id, { channel, provisionPct: info.defaultProvision, paymentFeePct: info.defaultPaymentFee });
  };

  const calcSku = (s: SkuData) => {
    const vkBrutto = (s.vkNetto + s.versandKundeNetto) * 1.19; // 19% USt
    const provision = (vkBrutto * s.provisionPct) / 100;
    const paymentFee = (vkBrutto * s.paymentFeePct) / 100;
    const totalKosten =
      s.cogs + s.versandKostenNetto + s.verpackung + provision + paymentFee + s.fulfilmentPerUnit + s.werbungPerUnit;
    const margeBrutto = s.vkNetto - totalKosten;
    const retoureLast = s.vkNetto * (s.retourenPct / 100);
    const margeNetto = margeBrutto - retoureLast;
    const margePct = s.vkNetto > 0 ? (margeNetto / s.vkNetto) * 100 : 0;
    const ROAS = s.werbungPerUnit > 0 ? s.vkNetto / s.werbungPerUnit : 0;
    return {
      vkBrutto,
      provision,
      paymentFee,
      totalKosten,
      margeBrutto,
      margeNetto,
      margePct,
      ROAS,
      retoureLast,
    };
  };

  // Aggregat
  const aggregat = useMemo(() => {
    let totalVk = 0;
    let totalKosten = 0;
    let totalMarge = 0;
    skus.forEach((s) => {
      const c = calcSku(s);
      totalVk += s.vkNetto;
      totalKosten += c.totalKosten;
      totalMarge += c.margeNetto;
    });
    return {
      totalVk,
      totalKosten,
      totalMarge,
      avgMargePct: totalVk > 0 ? (totalMarge / totalVk) * 100 : 0,
    };
  }, [skus]);

  const channelGroup = useMemo(() => {
    const groups: Record<Channel, { count: number; vk: number; marge: number }> = {} as never;
    skus.forEach((s) => {
      const c = calcSku(s);
      if (!groups[s.channel]) groups[s.channel] = { count: 0, vk: 0, marge: 0 };
      groups[s.channel].count++;
      groups[s.channel].vk += s.vkNetto;
      groups[s.channel].marge += c.margeNetto;
    });
    return groups;
  }, [skus]);

  return (
    <CockpitShell
      eyebrow="Marge-Tracker"
      title="Multi-Channel-Marge pro SKU"
      subtitle="7 Channels (Shopify, Amazon FBA/FBM, eBay, Kaufland, Otto, Etsy) mit Default-Provisionen. Pro SKU: VK, COGS, Versand, Verpackung, Marketplace-Provision, Payment-Fee, Fulfilment, Werbung, Retouren — Live-Marge-Berechnung."
    >
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Anzahl SKUs</div>
          <div className="text-xl font-bold">{skus.length}</div>
        </div>
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
          <div className="text-[10px] uppercase tracking-wider text-emerald-700">Gesamt VK netto</div>
          <div className="text-xl font-bold text-emerald-700">
            {aggregat.totalVk.toLocaleString("de-DE", { maximumFractionDigits: 2 })} €
          </div>
        </div>
        <div className={`rounded-2xl border p-4 ${
          aggregat.totalMarge > 0 ? "border-emerald-500/30 bg-emerald-500/5" : "border-red-500/30 bg-red-500/5"
        }`}>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Marge gesamt</div>
          <div className={`text-xl font-bold ${aggregat.totalMarge > 0 ? "text-emerald-700" : "text-red-700"}`}>
            {aggregat.totalMarge.toLocaleString("de-DE", { maximumFractionDigits: 2 })} €
          </div>
        </div>
        <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4">
          <div className="text-[10px] uppercase tracking-wider text-accent-blue">Avg Marge %</div>
          <div className="text-xl font-bold text-accent-blue">{aggregat.avgMargePct.toFixed(1)} %</div>
        </div>
      </div>

      {/* Per-Channel Breakdown */}
      {Object.keys(channelGroup).length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-5 mb-6">
          <h3 className="font-bold text-sm mb-3">Channel-Aufsplittung</h3>
          <div className="space-y-2 text-sm">
            {(Object.entries(channelGroup) as [Channel, typeof channelGroup[Channel]][]).map(([ch, g]) => {
              const margePct = g.vk > 0 ? (g.marge / g.vk) * 100 : 0;
              return (
                <div key={ch} className="flex items-center justify-between gap-3 rounded-lg bg-secondary/40 p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{CHANNEL_INFO[ch].emoji}</span>
                    <span className="font-semibold">{CHANNEL_INFO[ch].name}</span>
                    <span className="text-[10px] text-muted-foreground">({g.count} SKU)</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-muted-foreground">
                      VK: <span className="font-mono">{g.vk.toFixed(2)} €</span>
                    </span>
                    <span className={`font-mono font-semibold ${margePct > 20 ? "text-emerald-700" : margePct > 10 ? "text-accent-blue" : "text-red-700"}`}>
                      {margePct.toFixed(1)} %
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SKU-Eingabe */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm">SKUs ({skus.length})</h3>
        <button
          onClick={addSku}
          className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-3 py-1.5 text-xs font-semibold hover:opacity-90"
        >
          <Plus className="h-3.5 w-3.5" /> SKU hinzufügen
        </button>
      </div>

      <div className="space-y-3 mb-6">
        {skus.map((s) => {
          const c = calcSku(s);
          const ch = CHANNEL_INFO[s.channel];
          const margeColor =
            c.margePct > 20 ? "text-emerald-700" : c.margePct > 10 ? "text-accent-blue" : "text-red-700";
          return (
            <div key={s.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className="text-2xl">{ch.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <Input
                      value={s.name}
                      onChange={(e) => updateSku(s.id, { name: e.target.value })}
                      className="font-bold text-base mb-1"
                      placeholder="SKU-Name"
                    />
                    <select
                      value={s.channel}
                      onChange={(e) => updateChannel(s.id, e.target.value as Channel)}
                      className="text-xs h-7 rounded-md border border-input bg-background px-2"
                    >
                      {(Object.keys(CHANNEL_INFO) as Channel[]).map((k) => (
                        <option key={k} value={k}>
                          {CHANNEL_INFO[k].emoji} {CHANNEL_INFO[k].name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-2xl font-bold ${margeColor}`}>{c.margePct.toFixed(1)} %</div>
                  <div className="text-[10px] text-muted-foreground">
                    {c.margeNetto.toFixed(2)} € / Einheit
                  </div>
                  {c.margePct >= 20 ? (
                    <TrendingUp className="h-4 w-4 text-emerald-700 inline" />
                  ) : c.margePct < 10 ? (
                    <TrendingDown className="h-4 w-4 text-red-700 inline" />
                  ) : null}
                </div>
                <button
                  onClick={() => removeSku(s.id)}
                  className="text-red-600 hover:bg-red-500/10 p-1 rounded"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="text-[10px] text-muted-foreground italic mb-3">{ch.bemerkung}</div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 text-xs mb-3">
                <Field label="VK netto" value={s.vkNetto} onChange={(v) => updateSku(s.id, { vkNetto: v })} suffix="€" />
                <Field
                  label="Versand v. Kunde netto"
                  value={s.versandKundeNetto}
                  onChange={(v) => updateSku(s.id, { versandKundeNetto: v })}
                  suffix="€"
                />
                <Field label="COGS" value={s.cogs} onChange={(v) => updateSku(s.id, { cogs: v })} suffix="€" />
                <Field
                  label="Versand-K (du)"
                  value={s.versandKostenNetto}
                  onChange={(v) => updateSku(s.id, { versandKostenNetto: v })}
                  suffix="€"
                />
                <Field
                  label="Verpackung"
                  value={s.verpackung}
                  onChange={(v) => updateSku(s.id, { verpackung: v })}
                  suffix="€"
                />
                <Field
                  label="Provision %"
                  value={s.provisionPct}
                  onChange={(v) => updateSku(s.id, { provisionPct: v })}
                  suffix="%"
                />
                <Field
                  label="Payment %"
                  value={s.paymentFeePct}
                  onChange={(v) => updateSku(s.id, { paymentFeePct: v })}
                  suffix="%"
                />
                <Field
                  label="FBA/3PL/Stück"
                  value={s.fulfilmentPerUnit}
                  onChange={(v) => updateSku(s.id, { fulfilmentPerUnit: v })}
                  suffix="€"
                />
                <Field
                  label="Werbung/Stück"
                  value={s.werbungPerUnit}
                  onChange={(v) => updateSku(s.id, { werbungPerUnit: v })}
                  suffix="€"
                />
                <Field
                  label="Retouren %"
                  value={s.retourenPct}
                  onChange={(v) => updateSku(s.id, { retourenPct: v })}
                  suffix="%"
                />
              </div>

              <details className="text-xs">
                <summary className="cursor-pointer font-semibold text-foreground">Berechnungs-Details ▾</summary>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-1 text-muted-foreground">
                  <div>VK brutto (mit USt): <span className="font-mono">{c.vkBrutto.toFixed(2)} €</span></div>
                  <div>Provision: <span className="font-mono">{c.provision.toFixed(2)} €</span></div>
                  <div>Payment-Fee: <span className="font-mono">{c.paymentFee.toFixed(2)} €</span></div>
                  <div>Total Kosten: <span className="font-mono">{c.totalKosten.toFixed(2)} €</span></div>
                  <div>Marge brutto: <span className="font-mono">{c.margeBrutto.toFixed(2)} €</span></div>
                  <div>Retoure-Last: <span className="font-mono">{c.retoureLast.toFixed(2)} €</span></div>
                  <div className="col-span-2 border-t pt-1 mt-1">
                    <strong>Marge netto: <span className="font-mono">{c.margeNetto.toFixed(2)} €</span></strong>
                  </div>
                </div>
              </details>
            </div>
          );
        })}
      </div>

      {/* Tipps */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Healthy-Marge-Benchmarks pro Channel:</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                <strong>Shopify D2C</strong>: 30 %+ Marge Pflicht (Werbe-Spend frisst sonst alles auf — Faustregel
                CAC = 25–35 % vom AOV)
              </li>
              <li>
                <strong>Amazon FBA</strong>: 20 %+ Marge nach allen Fees (Provision 15 % + FBA-PnP 3–5 €/Stück +
                Werbung 10–20 % bei Launch)
              </li>
              <li>
                <strong>eBay/Kaufland/Otto</strong>: 15 %+ — niedrigere Werbekosten, aber niedrigerer AOV
              </li>
              <li>
                <strong>Etsy</strong>: 25 %+ wegen niedriger Werbe-Notwendigkeit aber 4 % Payment + 6,5 %
                Transaktion
              </li>
              <li>
                <strong>Retouren</strong>: bei Mode/Beauty 15–25 %, Elektronik 5–10 %, Verbrauchsgüter &lt; 5 %
              </li>
              <li>
                <strong>Cash-Marge ≠ Profit-Marge</strong>: Tool berechnet Stück-Marge. Plus du brauchst Fixkosten
                (Personal, Tools, Miete) zu deckenden Marge × Stückzahl
              </li>
              <li>
                <strong>USt</strong>: Tool nimmt 19 % an. Bei 7 % (Lebensmittel/Bücher) oder Reverse-Charge B2B-EU:
                manuelle Korrektur nötig
              </li>
            </ul>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

const Field = ({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
}) => (
  <div>
    <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
      {label} {suffix}
    </Label>
    <Input
      type="number"
      step="0.01"
      value={value || ""}
      onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
      placeholder="0"
      className="h-8 text-right text-xs mt-1"
    />
  </div>
);

export default MargeTracker;
