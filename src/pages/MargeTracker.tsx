import { useState, useMemo } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, TrendingDown, Plus, Trash2, AlertTriangle, Loader2, RefreshCw, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  calcMarketplaceFees,
  getMarketplaceCategories,
  type Marketplace,
} from "@/lib/marketplaceFees";

type Channel = "shopify" | "amazon-fba" | "amazon-fbm" | "ebay" | "kaufland" | "otto" | "etsy";

/**
 * Channel-Defaults inkl. Versand-Annahme (DHL Geschäftskunden 2026).
 * `defaultShipping` = €/Order Versandkosten die Seller selbst trägt (0 bei FBA).
 */
const CHANNEL_INFO: Record<Channel, {
  name: string;
  emoji: string;
  defaultProvision: number;
  defaultPaymentFee: number;
  defaultShipping: number;
  bemerkung: string;
  supportsFeePull: boolean;
  isOwnShop: boolean;
}> = {
  shopify: { name: "Shopify (eigener Shop)", emoji: "🛍️", defaultProvision: 0, defaultPaymentFee: 2.5, defaultShipping: 4.5, bemerkung: "Eigener Shop · Payment-Fee 1,9–2,9 % · Du versendest selbst · zusätzlich: Affiliate, Preisvergleich (Idealo/Google Shopping), Tools", supportsFeePull: false, isOwnShop: true },
  "amazon-fba": { name: "Amazon FBA", emoji: "📦", defaultProvision: 15, defaultPaymentFee: 0, defaultShipping: 0, bemerkung: "Amazon übernimmt Versand + Customer-Service · Referral 8-17 % + FBA-Pick&Pack 2-10€", supportsFeePull: true, isOwnShop: false },
  "amazon-fbm": { name: "Amazon FBM", emoji: "📮", defaultProvision: 15, defaultPaymentFee: 0, defaultShipping: 4.5, bemerkung: "Du versendest selbst · Nur Referral-Fee · DHL/Hermes ~4-6€/Order", supportsFeePull: true, isOwnShop: false },
  ebay: { name: "eBay", emoji: "🔨", defaultProvision: 12.55, defaultPaymentFee: 0, defaultShipping: 4.5, bemerkung: "Kategorie-abhängig 1-13 % EPV + 0,35 €/Verkauf · Versand selbst · Managed Payments inkl.", supportsFeePull: true, isOwnShop: false },
  kaufland: { name: "Kaufland.de", emoji: "🏪", defaultProvision: 10, defaultPaymentFee: 0, defaultShipping: 4.5, bemerkung: "Kategorie 6-14 % + 0,30 €/Verkauf · Versand selbst (KFS optional) · 39,95 €/Mon Pro-Account", supportsFeePull: true, isOwnShop: false },
  otto: { name: "Otto Marketplace", emoji: "🛒", defaultProvision: 14, defaultPaymentFee: 0, defaultShipping: 5.5, bemerkung: "Kategorie 11-17 % · Versand selbst (Otto erwartet Premium-Versand ~5-7€)", supportsFeePull: true, isOwnShop: false },
  etsy: { name: "Etsy", emoji: "🎨", defaultProvision: 6.5, defaultPaymentFee: 4, defaultShipping: 5.5, bemerkung: "6,5 % + 0,21€ Listing + 3 % Payment + 0,25€ fix · Versand selbst · ggf. 15 % Offsite-Ads", supportsFeePull: true, isOwnShop: false },
};

const CHANNEL_TO_MARKETPLACE: Partial<Record<Channel, Marketplace>> = {
  kaufland: "kaufland",
  otto: "otto",
  ebay: "ebay",
  etsy: "etsy",
};

type SkuData = {
  id: string;
  name: string;
  channel: Channel;
  /** EAN/GTIN (8-14 Ziffern) — Primär-Identifier für alle Marketplaces. */
  ean?: string;
  /** Amazon ASIN (10-stellig) — Fallback wenn EAN-Lookup fehlschlägt. */
  asin?: string;
  /** Kategorie-Slug für Marketplace-Fee-Tabelle (Kaufland/Otto/eBay/Etsy). */
  category?: string;
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
  /** Affiliate-Kommission in % vom VK brutto (nur eigener Shop). */
  affiliatePct: number;
  /** Preisvergleich CPC (€ pro Klick, z.B. Idealo 0,40-0,60€). */
  preisvergleichCpc: number;
  /** Preisvergleich Klick-to-Sale-Conversion in % (typisch 3-8 %). */
  preisvergleichConversionPct: number;
  /** Sonstige Gebühren pro Verkauf (€/Stück) — Catch-All. */
  sonstigeGebuehren: number;
  /** Status für SP-API-Fee-Pull. */
  feesPulledAt?: string;
  feesPullError?: string;
};

type FeesEstimateResponse = {
  asin?: string;
  ean?: string;
  referralFee: number;
  fbaFees: number;
  variableClosingFee: number;
  perItemFee: number;
  totalFees: number;
  currency: string;
  feeDetails: Array<{ type: string; amount: number; included?: Array<{ type: string; amount: number }> }>;
  error?: string;
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
      affiliatePct: 0,
      preisvergleichCpc: 0,
      preisvergleichConversionPct: 5,
      sonstigeGebuehren: 0,
    },
  ]);

  const addSku = () => {
    const ch = "amazon-fba" as Channel;
    const info = CHANNEL_INFO[ch];
    setSkus([
      ...skus,
      {
        id: Date.now().toString(),
        name: `SKU ${skus.length + 1}`,
        channel: ch,
        vkNetto: 0,
        versandKundeNetto: 0,
        cogs: 0,
        versandKostenNetto: info.defaultShipping,
        verpackung: 0,
        provisionPct: info.defaultProvision,
        paymentFeePct: info.defaultPaymentFee,
        fulfilmentPerUnit: 0,
        werbungPerUnit: 0,
        retourenPct: 0,
        affiliatePct: 0,
        preisvergleichCpc: 0,
        preisvergleichConversionPct: 5,
        sonstigeGebuehren: 0,
      },
    ]);
  };

  const removeSku = (id: string) => setSkus(skus.filter((s) => s.id !== id));
  const updateSku = (id: string, patch: Partial<SkuData>) => setSkus(skus.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const updateChannel = (id: string, channel: Channel) => {
    const info = CHANNEL_INFO[channel];
    updateSku(id, {
      channel,
      provisionPct: info.defaultProvision,
      paymentFeePct: info.defaultPaymentFee,
      versandKostenNetto: info.defaultShipping,
    });
  };

  const [pullingFees, setPullingFees] = useState<string | null>(null);

  /** Holt echte Fees für alle Channels. Amazon via SP-API, andere via marketplaceFees-Lib. */
  const pullFees = async (s: SkuData) => {
    if (!s.vkNetto || s.vkNetto <= 0) {
      updateSku(s.id, { feesPullError: "VK brutto muss > 0 sein" });
      return;
    }
    setPullingFees(s.id);
    updateSku(s.id, { feesPullError: undefined });
    try {
      const vkBrutto = s.vkNetto * 1.19;

      // Amazon: SP-API
      if (s.channel === "amazon-fba" || s.channel === "amazon-fbm") {
        const hasAsin = s.asin && s.asin.length === 10;
        const hasEan = s.ean && /^[0-9]{8,14}$/.test(s.ean);
        if (!hasAsin && !hasEan) {
          throw new Error("EAN (8-14 Ziffern) oder ASIN (10-stellig) erforderlich");
        }
        const { data, error } = await supabase.functions.invoke<FeesEstimateResponse>(
          "amazon-fees-estimate",
          {
            body: {
              asin: hasAsin ? s.asin!.toUpperCase() : undefined,
              ean: hasEan ? s.ean : undefined,
              priceBrutto: vkBrutto,
              currency: "EUR",
              marketplace: "DE",
              isAmazonFulfilled: s.channel === "amazon-fba",
            },
          },
        );
        if (error) throw new Error(error.message);
        if (!data) throw new Error("Leere Response");
        if (data.error) throw new Error(data.error);

        const newProvisionPct = vkBrutto > 0 ? (data.referralFee / vkBrutto) * 100 : 0;
        // FBM: keine FBA-Fees → 0
        const newFulfilment = s.channel === "amazon-fba"
          ? data.fbaFees + data.variableClosingFee + data.perItemFee
          : data.variableClosingFee + data.perItemFee;

        updateSku(s.id, {
          asin: data.asin || s.asin,
          provisionPct: Number(newProvisionPct.toFixed(2)),
          fulfilmentPerUnit: Number(newFulfilment.toFixed(2)),
          feesPulledAt: new Date().toISOString(),
          feesPullError: undefined,
        });
        return;
      }

      // Andere Marketplaces: lokale Lib
      const marketplace = CHANNEL_TO_MARKETPLACE[s.channel];
      if (!marketplace) {
        throw new Error(`Kein Fee-Calculator für Channel ${s.channel}`);
      }
      if (!s.category) {
        throw new Error("Kategorie wählen für Fee-Berechnung");
      }
      const fees = calcMarketplaceFees(marketplace, vkBrutto, s.category);
      const newProvisionPct = vkBrutto > 0 ? ((fees.provision + fees.paymentFee + fees.offsiteAdsFee) / vkBrutto) * 100 : 0;
      const newFulfilment = fees.closingFee;

      updateSku(s.id, {
        provisionPct: Number(newProvisionPct.toFixed(2)),
        fulfilmentPerUnit: Number(newFulfilment.toFixed(2)),
        feesPulledAt: new Date().toISOString(),
        feesPullError: undefined,
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      updateSku(s.id, { feesPullError: msg });
    } finally {
      setPullingFees(null);
    }
  };

  const calcSku = (s: SkuData) => {
    const vkBrutto = (s.vkNetto + s.versandKundeNetto) * 1.19; // 19% USt
    const provision = (vkBrutto * s.provisionPct) / 100;
    const paymentFee = (vkBrutto * s.paymentFeePct) / 100;
    const affiliateFee = (vkBrutto * s.affiliatePct) / 100;
    // Preisvergleich: CPC × Clicks-pro-Sale (= 100 ÷ Conversion%)
    const preisvergleichFeePerSale =
      s.preisvergleichConversionPct > 0
        ? (s.preisvergleichCpc * 100) / s.preisvergleichConversionPct
        : 0;
    const totalKosten =
      s.cogs +
      s.versandKostenNetto +
      s.verpackung +
      provision +
      paymentFee +
      s.fulfilmentPerUnit +
      s.werbungPerUnit +
      affiliateFee +
      preisvergleichFeePerSale +
      s.sonstigeGebuehren;
    const margeVorRetoure = s.vkNetto - totalKosten;

    // Retoure-Last realistisch:
    // - 100% VK-Erlös zurück
    // - Versandkosten Hin+Zurück (1,5x Versand)
    // - Restocking-Aufwand 1€/Stück (pauschal)
    // - Bei FBA: zusätzlich Returns-Processing-Fee (~50% von FBA-Pick&Pack)
    const retoureKostenProRetoure =
      s.vkNetto + s.versandKostenNetto * 1.5 + 1 + (s.channel === "amazon-fba" ? s.fulfilmentPerUnit * 0.5 : 0);
    const retoureLast = retoureKostenProRetoure * (s.retourenPct / 100);
    const margeNetto = margeVorRetoure - retoureLast;

    // Brutto-Marge = Profit ÷ VK_brutto (Standard für Reseller, wie SAS/Helium10)
    const margePct = vkBrutto > 0 ? (margeNetto / vkBrutto) * 100 : 0;
    const ROAS = s.werbungPerUnit > 0 ? s.vkNetto / s.werbungPerUnit : 0;
    return {
      vkBrutto,
      provision,
      paymentFee,
      affiliateFee,
      preisvergleichFeePerSale,
      totalKosten,
      margeBrutto: margeVorRetoure,
      margeNetto,
      margePct,
      ROAS,
      retoureLast,
    };
  };

  // Aggregat (Brutto-Marge wie SAS/Helium10)
  const aggregat = useMemo(() => {
    let totalVkBrutto = 0;
    let totalVkNetto = 0;
    let totalKosten = 0;
    let totalMarge = 0;
    skus.forEach((s) => {
      const c = calcSku(s);
      totalVkBrutto += c.vkBrutto;
      totalVkNetto += s.vkNetto;
      totalKosten += c.totalKosten;
      totalMarge += c.margeNetto;
    });
    return {
      totalVk: totalVkNetto,
      totalVkBrutto,
      totalKosten,
      totalMarge,
      avgMargePct: totalVkBrutto > 0 ? (totalMarge / totalVkBrutto) * 100 : 0,
    };
  }, [skus]);

  const channelGroup = useMemo(() => {
    const groups: Record<Channel, { count: number; vk: number; vkBrutto: number; marge: number }> = {} as never;
    skus.forEach((s) => {
      const c = calcSku(s);
      if (!groups[s.channel]) groups[s.channel] = { count: 0, vk: 0, vkBrutto: 0, marge: 0 };
      groups[s.channel].count++;
      groups[s.channel].vk += s.vkNetto;
      groups[s.channel].vkBrutto += c.vkBrutto;
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
              const margePct = g.vkBrutto > 0 ? (g.marge / g.vkBrutto) * 100 : 0;
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

              {ch.supportsFeePull && (
                <div className="rounded-xl border border-accent-blue/30 bg-accent-blue/5 p-3 mb-3">
                  <div className="flex items-start gap-2 flex-wrap">
                    {(s.channel === "amazon-fba" || s.channel === "amazon-fbm") && (
                      <>
                        <div className="flex-1 min-w-[140px]">
                          <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
                            EAN/GTIN (Primär)
                          </Label>
                          <Input
                            value={s.ean || ""}
                            onChange={(e) =>
                              updateSku(s.id, { ean: e.target.value.replace(/\D/g, ""), feesPullError: undefined })
                            }
                            placeholder="4012345678901"
                            maxLength={14}
                            className="h-8 mt-1 font-mono text-xs"
                          />
                        </div>
                        <div className="flex-1 min-w-[140px]">
                          <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
                            oder ASIN (Fallback)
                          </Label>
                          <Input
                            value={s.asin || ""}
                            onChange={(e) =>
                              updateSku(s.id, { asin: e.target.value.toUpperCase(), feesPullError: undefined })
                            }
                            placeholder="B0XXXXXXXX"
                            maxLength={10}
                            className="h-8 mt-1 font-mono text-xs uppercase"
                          />
                        </div>
                      </>
                    )}
                    {CHANNEL_TO_MARKETPLACE[s.channel] && (
                      <>
                        <div className="flex-1 min-w-[140px]">
                          <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
                            EAN/GTIN (optional)
                          </Label>
                          <Input
                            value={s.ean || ""}
                            onChange={(e) =>
                              updateSku(s.id, { ean: e.target.value.replace(/\D/g, ""), feesPullError: undefined })
                            }
                            placeholder="4012345678901"
                            maxLength={14}
                            className="h-8 mt-1 font-mono text-xs"
                          />
                        </div>
                        <div className="flex-1 min-w-[180px]">
                          <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
                            Kategorie (für Fee-Lookup)
                          </Label>
                          <select
                            value={s.category || ""}
                            onChange={(e) => updateSku(s.id, { category: e.target.value, feesPullError: undefined })}
                            className="h-8 mt-1 w-full rounded-md border border-input bg-background px-2 text-xs"
                          >
                            <option value="">— wählen —</option>
                            {getMarketplaceCategories(CHANNEL_TO_MARKETPLACE[s.channel]!).map((c) => (
                              <option key={c.slug} value={c.slug}>
                                {c.label} ({c.provisionPct} %)
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}
                    <div className="shrink-0 pt-5">
                      <button
                        onClick={() => pullFees(s)}
                        disabled={pullingFees === s.id || !s.vkNetto}
                        className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-3 py-2 text-xs font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {pullingFees === s.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3.5 w-3.5" />
                        )}
                        Echte Fees ziehen
                      </button>
                    </div>
                    {s.feesPulledAt && !s.feesPullError && (
                      <div className="basis-full text-[10px] text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Fees aktualisiert {new Date(s.feesPulledAt).toLocaleString("de-DE")}
                        {s.asin ? ` · ASIN ${s.asin}` : ""}
                      </div>
                    )}
                    {s.feesPullError && (
                      <div className="basis-full text-[10px] text-red-700 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {s.feesPullError}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 text-xs mb-3">
                <div>
                  <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    VK brutto € <span className="normal-case text-muted-foreground/60">(= Listing Price)</span>
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={s.vkNetto ? (s.vkNetto * 1.19).toFixed(2) : ""}
                    onChange={(e) => {
                      const brutto = Math.max(0, Number(e.target.value) || 0);
                      updateSku(s.id, { vkNetto: brutto / 1.19 });
                    }}
                    placeholder="0,00"
                    className="h-8 text-right text-xs mt-1"
                  />
                  <div className="text-[9px] text-muted-foreground/70 mt-0.5 text-right">
                    netto: {s.vkNetto.toFixed(2)} €
                  </div>
                </div>
                <Field
                  label="Versand v. Kunde netto"
                  value={s.versandKundeNetto}
                  onChange={(v) => updateSku(s.id, { versandKundeNetto: v })}
                  suffix="€"
                />
                <div>
                  <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    EK brutto € <span className="normal-case text-muted-foreground/60">(Cost Price)</span>
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={s.cogs ? (s.cogs * 1.19).toFixed(2) : ""}
                    onChange={(e) => {
                      const brutto = Math.max(0, Number(e.target.value) || 0);
                      updateSku(s.id, { cogs: brutto / 1.19 });
                    }}
                    placeholder="0,00"
                    className="h-8 text-right text-xs mt-1"
                  />
                  <div className="text-[9px] text-muted-foreground/70 mt-0.5 text-right">
                    netto: {s.cogs.toFixed(2)} €
                  </div>
                </div>
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

              {/* Zusatz-Kosten — bei eigenem Shop aufgeklappt, sonst eingeklappt */}
              <details open={ch.isOwnShop} className="text-xs mb-3 group">
                <summary className="cursor-pointer font-semibold text-foreground select-none">
                  Zusatz-Kosten {ch.isOwnShop ? "(Eigener Shop)" : "(Affiliate, Preisvergleich, Sonstige)"} ▾
                </summary>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Field
                    label="Affiliate %"
                    value={s.affiliatePct}
                    onChange={(v) => updateSku(s.id, { affiliatePct: v })}
                    suffix="%"
                  />
                  <Field
                    label="Idealo CPC €"
                    value={s.preisvergleichCpc}
                    onChange={(v) => updateSku(s.id, { preisvergleichCpc: v })}
                    suffix="€"
                  />
                  <Field
                    label="Klick→Sale %"
                    value={s.preisvergleichConversionPct}
                    onChange={(v) => updateSku(s.id, { preisvergleichConversionPct: v })}
                    suffix="%"
                  />
                  <Field
                    label="Sonstige €/Stk"
                    value={s.sonstigeGebuehren}
                    onChange={(v) => updateSku(s.id, { sonstigeGebuehren: v })}
                    suffix="€"
                  />
                </div>
                {(s.preisvergleichCpc > 0 && s.preisvergleichConversionPct > 0) && (
                  <div className="mt-1 text-[10px] text-muted-foreground italic">
                    Preisvergleich-Cost: {s.preisvergleichCpc.toFixed(2)} €/Klick × {(100 / s.preisvergleichConversionPct).toFixed(1)} Klicks/Sale =
                    <span className="font-mono font-semibold text-foreground"> {c.preisvergleichFeePerSale.toFixed(2)} €/Sale</span>
                  </div>
                )}
                {ch.isOwnShop && (
                  <div className="mt-2 text-[10px] text-muted-foreground bg-secondary/40 rounded p-2 leading-relaxed">
                    <strong>Eigener-Shop-Tipps:</strong> Affiliate-Programme typisch 5-15 % Commission ·
                    Idealo CPC Standard 0,15-0,70 € (Elektronik 0,40-0,60 €) ·
                    Klick→Sale-Conversion 3-8 % typisch (5 % Median).
                  </div>
                )}
              </details>

              <details className="text-xs">
                <summary className="cursor-pointer font-semibold text-foreground">Berechnungs-Details ▾</summary>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-1 text-muted-foreground">
                  <div>VK brutto (mit USt): <span className="font-mono">{c.vkBrutto.toFixed(2)} €</span></div>
                  <div>Provision: <span className="font-mono">{c.provision.toFixed(2)} €</span></div>
                  <div>Payment-Fee: <span className="font-mono">{c.paymentFee.toFixed(2)} €</span></div>
                  {c.affiliateFee > 0 && (
                    <div>Affiliate-Fee: <span className="font-mono">{c.affiliateFee.toFixed(2)} €</span></div>
                  )}
                  {c.preisvergleichFeePerSale > 0 && (
                    <div>Preisvergleich/Sale: <span className="font-mono">{c.preisvergleichFeePerSale.toFixed(2)} €</span></div>
                  )}
                  <div>FBA/Versand: <span className="font-mono">{(s.fulfilmentPerUnit + s.versandKostenNetto).toFixed(2)} €</span></div>
                  <div>Werbung: <span className="font-mono">{s.werbungPerUnit.toFixed(2)} €</span></div>
                  <div>Total Kosten: <span className="font-mono">{c.totalKosten.toFixed(2)} €</span></div>
                  <div>Marge vor Retoure: <span className="font-mono">{c.margeBrutto.toFixed(2)} €</span></div>
                  <div>Retoure-Last ({s.retourenPct} %): <span className="font-mono">{c.retoureLast.toFixed(2)} €</span></div>
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
