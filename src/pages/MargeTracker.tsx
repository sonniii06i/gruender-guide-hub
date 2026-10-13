import { useState, useMemo, useEffect, useRef } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Plus,
  Trash2,
  AlertTriangle,
  Loader2,
  RefreshCw,
  CheckCircle2,
  ChevronDown,
  Lightbulb,
  Package,
  PieChart,
} from "lucide-react";
import {
  Callout,
  EmptyState,
  Field,
  ResultRow,
  StatGrid,
  StatTile,
  ToneBadge,
  ToolSection,
  selectCls,
  toneSoft,
  toneText,
  type Tone,
} from "@/components/cockpit/kit";
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
  defaultPaymentFeeFixed: number;
  defaultShipping: number;
  bemerkung: string;
  supportsFeePull: boolean;
  isOwnShop: boolean;
}> = {
  shopify: { name: "Shopify (eigener Shop)", emoji: "🛍️", defaultProvision: 0, defaultPaymentFee: 2.5, defaultPaymentFeeFixed: 0.30, defaultShipping: 4.5, bemerkung: "Eigener Shop · Payment-Fee 1,9–2,9 % + 0,30€/Transaction · Du versendest selbst · zusätzlich: Affiliate, Preisvergleich (Idealo/Google Shopping), Tools", supportsFeePull: false, isOwnShop: true },
  "amazon-fba": { name: "Amazon FBA", emoji: "📦", defaultProvision: 15, defaultPaymentFee: 0, defaultPaymentFeeFixed: 0, defaultShipping: 0, bemerkung: "Amazon übernimmt Versand + Customer-Service · Referral 8-17 % + FBA-Pick&Pack 2-10€ + Storage ~0,99€/Mon", supportsFeePull: true, isOwnShop: false },
  "amazon-fbm": { name: "Amazon FBM", emoji: "📮", defaultProvision: 15, defaultPaymentFee: 0, defaultPaymentFeeFixed: 0, defaultShipping: 4.5, bemerkung: "Du versendest selbst · Nur Referral-Fee · DHL/Hermes ~4-6€/Order", supportsFeePull: true, isOwnShop: false },
  ebay: { name: "eBay", emoji: "🔨", defaultProvision: 11, defaultPaymentFee: 0, defaultPaymentFeeFixed: 0.35, defaultShipping: 4.5, bemerkung: "Kategorie-abhängig 1-13 % EPV + 0,35 €/Verkauf · Versand selbst · Managed Payments inkl.", supportsFeePull: true, isOwnShop: false },
  kaufland: { name: "Kaufland.de", emoji: "🏪", defaultProvision: 11, defaultPaymentFee: 0, defaultPaymentFeeFixed: 0.30, defaultShipping: 4.5, bemerkung: "Kategorie 6-14 % + 0,30 €/Verkauf · Versand selbst (KFS optional) · 39,95 €/Mon Pro-Account", supportsFeePull: true, isOwnShop: false },
  otto: { name: "Otto Marketplace", emoji: "🛒", defaultProvision: 14, defaultPaymentFee: 0, defaultPaymentFeeFixed: 0, defaultShipping: 6, bemerkung: "Kategorie 11-17 % · Versand selbst (Otto erwartet Premium-Versand ~5-7€)", supportsFeePull: true, isOwnShop: false },
  etsy: { name: "Etsy", emoji: "🎨", defaultProvision: 6.5, defaultPaymentFee: 4, defaultPaymentFeeFixed: 0.30, defaultShipping: 5.5, bemerkung: "6,5 % + 0,21€ Listing + 4 % Payment + 0,30€ fix · Versand selbst · ggf. 15 % Offsite-Ads", supportsFeePull: true, isOwnShop: false },
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
  /** Payment-Fee Festbetrag pro Transaction (€). Shopify 0,30€, eBay 0,35€, Etsy 0,30€ etc. */
  paymentFeeFixed: number;
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
  /** Vom Listing automatisch gezogener Lowest-FBA-Preis (Brutto inkl. Versand) — gesetzt wenn Tool den Preis selbst holen sollte. */
  lowestFbaPrice?: number;
  lowestFbaSource?: "buybox" | "lowest-fba" | "lowest-any";
  priceUsedForFees?: number;
  error?: string;
};

const MargeTracker = () => {
  const [skus, setSkus] = useState<SkuData[]>([
    {
      id: "1",
      name: "Beispiel-Produkt",
      channel: "amazon-fba",
      vkNetto: 0,
      versandKundeNetto: 0,
      cogs: 0,
      versandKostenNetto: 0,
      verpackung: 0,
      provisionPct: 0,
      paymentFeePct: 0,
      paymentFeeFixed: 0,
      fulfilmentPerUnit: 0,
      werbungPerUnit: 0,
      retourenPct: 0,
      affiliatePct: 0,
      preisvergleichCpc: 0,
      preisvergleichConversionPct: 0,
      sonstigeGebuehren: 0,
    },
  ]);

  const addSku = () => {
    const ch = "amazon-fba" as Channel;
    const info = CHANNEL_INFO[ch];
    setSkus((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: `SKU ${prev.length + 1}`,
        channel: ch,
        vkNetto: 0,
        versandKundeNetto: 0,
        cogs: 0,
        versandKostenNetto: info.defaultShipping,
        verpackung: 0,
        provisionPct: info.defaultProvision,
        paymentFeePct: info.defaultPaymentFee,
        paymentFeeFixed: info.defaultPaymentFeeFixed,
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

  // Funktionale Updates: asynchrone Gebühren-Abrufe dürfen zwischenzeitliche Eingaben nicht überschreiben
  const removeSku = (id: string) => setSkus((prev) => prev.filter((s) => s.id !== id));
  const updateSku = (id: string, patch: Partial<SkuData>) => setSkus((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const updateChannel = (id: string, channel: Channel) => {
    const info = CHANNEL_INFO[channel];
    updateSku(id, {
      channel,
      provisionPct: info.defaultProvision,
      paymentFeePct: info.defaultPaymentFee,
      paymentFeeFixed: info.defaultPaymentFeeFixed,
      versandKostenNetto: info.defaultShipping,
    });
  };

  const [pullingFees, setPullingFees] = useState<string | null>(null);

  /** Auto-Trigger: sobald ASIN (10) oder EAN (8-14) für eine Amazon-SKU vollständig ist
   * UND sich gegenüber dem letzten Pull geändert hat → automatisch Fees + Lowest-FBA holen.
   */
  const lastPulledRef = useRef<Map<string, string>>(new Map());
  const pullFeesRef = useRef<(s: SkuData) => void>(() => {});

  /** Holt echte Fees für alle Channels. Amazon via SP-API, andere via marketplaceFees-Lib.
   * Bei Amazon: zieht standardmäßig Lowest-FBA-Preis vom Listing als VK.
   * useUserPrice=true → nimmt den vorhandenen VK (nur für manuelle Re-Pulls relevant).
   */
  const pullFees = async (s: SkuData, useUserPrice = false) => {
    setPullingFees(s.id);
    updateSku(s.id, { feesPullError: undefined });
    try {
      const vkBruttoInput = s.vkNetto > 0 ? s.vkNetto * 1.19 : 0;

      // Amazon: SP-API. VK wird i.d.R. aus Listing gezogen (Lowest-FBA / Buy-Box).
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
              // priceBrutto nur senden wenn explizit gewünscht — sonst holt Edge-Function Lowest-FBA
              priceBrutto: useUserPrice && vkBruttoInput > 0 ? vkBruttoInput : undefined,
              currency: "EUR",
              marketplace: "DE",
              isAmazonFulfilled: s.channel === "amazon-fba",
            },
          },
        );
        if (error) throw new Error(error.message);
        if (!data) throw new Error("Leere Response");
        if (data.error) throw new Error(data.error);

        // Effektiver Preis für die Fee-Berechnung (entweder vom User oder vom Listing)
        const effectiveBrutto = data.priceUsedForFees || vkBruttoInput;
        if (effectiveBrutto <= 0) throw new Error("Konnte keinen Preis ermitteln");

        const newProvisionPct = (data.referralFee / effectiveBrutto) * 100;
        // FBA: Pick&Pack + ~0,99€/Monat Storage pauschal für Standard-Size (Q1-Q3, 1 Monat)
        // Echter Wert variiert nach Volumen — User soll bei Bedarf anpassen.
        const fbaStorageFeeMonatlich = 0.99;
        const newFulfilment = s.channel === "amazon-fba"
          ? data.fbaFees + data.variableClosingFee + data.perItemFee + fbaStorageFeeMonatlich
          : data.variableClosingFee + data.perItemFee;

        // Wenn VK nicht gesetzt war (oder Listing-Preis gezogen wurde): VK aus Listing übernehmen
        const patch: Partial<SkuData> = {
          asin: data.asin || s.asin,
          provisionPct: Number(newProvisionPct.toFixed(2)),
          fulfilmentPerUnit: Number(newFulfilment.toFixed(2)),
          feesPulledAt: new Date().toISOString(),
          feesPullError: undefined,
        };
        if (data.lowestFbaPrice && data.lowestFbaPrice > 0) {
          patch.vkNetto = data.lowestFbaPrice / 1.19;
        }
        updateSku(s.id, patch);
        return;
      }

      // Andere Marketplaces: brauchen weiter VK + Kategorie
      if (vkBruttoInput <= 0) {
        throw new Error("VK brutto muss > 0 sein für diesen Channel");
      }
      const marketplace = CHANNEL_TO_MARKETPLACE[s.channel];
      if (!marketplace) {
        throw new Error(`Kein Fee-Calculator für Channel ${s.channel}`);
      }
      if (!s.category) {
        throw new Error("Kategorie wählen für Fee-Berechnung");
      }
      const fees = calcMarketplaceFees(marketplace, vkBruttoInput, s.category);
      const newProvisionPct = ((fees.provision + fees.paymentFee + fees.offsiteAdsFee) / vkBruttoInput) * 100;
      const newFulfilment = fees.closingFee;

      updateSku(s.id, {
        provisionPct: Number(newProvisionPct.toFixed(2)),
        fulfilmentPerUnit: Number(newFulfilment.toFixed(2)),
        // Zahlungs- und Abschlussgebühren stecken jetzt in Provision bzw. Fulfilment → Kanal-Standardwerte nicht doppelt zählen
        paymentFeePct: 0,
        paymentFeeFixed: 0,
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

  // pullFees-Ref aktuell halten (closure capture vermeiden)
  pullFeesRef.current = pullFees;

  // Auto-Pull-Trigger: bei vollständiger ASIN/EAN-Eingabe oder Channel-Wechsel
  const idKey = skus
    .map((s) => `${s.id}|${(s.asin || "").toUpperCase()}|${s.ean || ""}|${s.channel}`)
    .join("§");
  useEffect(() => {
    skus.forEach((s) => {
      if (s.channel !== "amazon-fba" && s.channel !== "amazon-fbm") return;
      const asin = s.asin?.trim().toUpperCase();
      const ean = s.ean?.trim();
      const hasAsin = asin && asin.length === 10;
      const hasEan = ean && /^[0-9]{8,14}$/.test(ean);
      if (!hasAsin && !hasEan) return;
      const identifier = `${s.channel}|${hasAsin ? `asin:${asin}` : `ean:${ean}`}`;
      if (lastPulledRef.current.get(s.id) === identifier) return;
      if (pullingFees === s.id) return;
      lastPulledRef.current.set(s.id, identifier);
      pullFeesRef.current(s);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idKey]);

  const calcSku = (s: SkuData) => {
    const vkBrutto = (s.vkNetto + s.versandKundeNetto) * 1.19; // 19% USt
    const provision = (vkBrutto * s.provisionPct) / 100;
    const paymentFee = (vkBrutto * s.paymentFeePct) / 100 + (s.paymentFeeFixed ?? 0);
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

    // Retoure-Last realistisch berechnen: bei Retoure kommt die Ware zurück (COGS bleibt verlustfrei
    // wenn wieder verkäuflich), Marketplace-Provision wird erstattet, Werbung ist verloren.
    // Zusatz-Kosten je Retoure = Return-Shipping + Restocking + verlorene Werbung + FBA-Returns-Fee.
    // Marge nach Retoure = (1 - r) × margeVorRetoure - r × zusatzKostenJeRetoure
    const retourenAnteil = Math.max(0, Math.min(1, s.retourenPct / 100));
    const returnShipping = s.versandKostenNetto * 1.5; // hin + zurück + Bearbeitung
    const restocking = 1; // pauschal/Stück
    const lostAds = s.werbungPerUnit; // Ads für Retouren-Stück verloren
    const fbaReturnFee = s.channel === "amazon-fba" ? s.fulfilmentPerUnit * 0.5 : 0;
    const zusatzKostenJeRetoure = returnShipping + restocking + lostAds + fbaReturnFee;
    const retoureLast = retourenAnteil * (margeVorRetoure + zusatzKostenJeRetoure);
    const margeNetto = margeVorRetoure * (1 - retourenAnteil) - retourenAnteil * zusatzKostenJeRetoure;

    // Marge-Quote: Standard ist Netto-Marge / Netto-Umsatz (USt ist durchlaufend).
    const margePct = s.vkNetto > 0 ? (margeNetto / s.vkNetto) * 100 : 0;
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

  const margeTone = (pct: number): Tone => (pct > 20 ? "success" : pct > 10 ? "accent" : "danger");

  return (
    <CockpitShell
      eyebrow="E-Commerce · Marge-Tracker"
      title="Multi-Channel-Marge pro SKU"
      subtitle="Sieben Channels (Shopify, Amazon FBA/FBM, eBay, Kaufland, Otto, Etsy) mit Standard-Provisionen. Pro SKU: VK, Wareneinsatz, Versand, Verpackung, Provision, Payment-Fee, Fulfilment, Werbung und Retouren, die Marge rechnet live mit."
      actions={
        <Button onClick={addSku}>
          <Plus className="h-4 w-4" aria-hidden="true" /> SKU hinzufügen
        </Button>
      }
    >
      {/* Summary */}
      <StatGrid cols={4} className="mb-6">
        <StatTile label="Anzahl SKUs" value={skus.length} />
        <StatTile
          label="Gesamt-VK netto"
          value={`${aggregat.totalVk.toLocaleString("de-DE", { maximumFractionDigits: 2 })} €`}
        />
        <StatTile
          label="Marge gesamt"
          value={`${aggregat.totalMarge.toLocaleString("de-DE", { maximumFractionDigits: 2 })} €`}
          tone={aggregat.totalVk === 0 ? "neutral" : aggregat.totalMarge > 0 ? "success" : "danger"}
          emphasis={aggregat.totalVk !== 0}
        />
        <StatTile label="Durchschnittliche Marge" value={`${aggregat.avgMargePct.toFixed(1)} %`} tone="accent" emphasis />
      </StatGrid>

      {/* Per-Channel Breakdown */}
      {Object.keys(channelGroup).length > 0 && (
        <ToolSection title="Aufteilung nach Channel" icon={PieChart} className="mb-6" bodyClassName="p-0 md:p-0">
          <ul className="divide-y divide-border/70">
            {(Object.entries(channelGroup) as [Channel, typeof channelGroup[Channel]][]).map(([ch, g]) => {
              const margePct = g.vkBrutto > 0 ? (g.marge / g.vkBrutto) * 100 : 0;
              return (
                <li key={ch} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-3 md:px-6">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="text-sm font-semibold">{CHANNEL_INFO[ch].name}</span>
                    <span className="text-xs text-muted-foreground tabular">
                      {g.count} {g.count === 1 ? "SKU" : "SKUs"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm tabular">
                    <span className="text-muted-foreground">VK {g.vk.toFixed(2)} €</span>
                    <ToneBadge tone={g.vk > 0 ? margeTone(margePct) : "neutral"}>{margePct.toFixed(1)} %</ToneBadge>
                  </div>
                </li>
              );
            })}
          </ul>
        </ToolSection>
      )}

      {/* SKU-Eingabe */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight">
          SKUs <span className="font-normal text-muted-foreground tabular">({skus.length})</span>
        </h2>
      </div>

      <div className="mb-6 space-y-4">
        {skus.length === 0 && (
          <EmptyState
            icon={Package}
            title="Noch keine SKU angelegt"
            description="Lege eine SKU an, wähle den Channel und trage VK und Einkaufspreis ein. Die Marge erscheint sofort."
            action={
              <Button onClick={addSku}>
                <Plus className="h-4 w-4" aria-hidden="true" /> SKU hinzufügen
              </Button>
            }
          />
        )}
        {skus.map((s) => {
          const c = calcSku(s);
          const ch = CHANNEL_INFO[s.channel];
          const tone: Tone = s.vkNetto > 0 ? margeTone(c.margePct) : "neutral";
          const isAmazon = s.channel === "amazon-fba" || s.channel === "amazon-fbm";
          return (
            <article key={s.id} className="rounded-2xl border border-border bg-card shadow-card">
              {/* Kopf: Name, Channel, Marge */}
              <div className="flex flex-wrap items-start gap-4 border-b border-border/70 px-5 py-4 md:px-6">
                <div className="grid min-w-0 flex-1 basis-full grid-cols-1 gap-3 sm:basis-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,220px)]">
                  <Field label="SKU-Name" htmlFor={`sku-name-${s.id}`}>
                    <Input
                      id={`sku-name-${s.id}`}
                      value={s.name}
                      onChange={(e) => updateSku(s.id, { name: e.target.value })}
                      className="font-semibold"
                      placeholder="SKU-Name"
                    />
                  </Field>
                  <Field label="Channel" htmlFor={`sku-channel-${s.id}`}>
                    <select
                      id={`sku-channel-${s.id}`}
                      value={s.channel}
                      onChange={(e) => updateChannel(s.id, e.target.value as Channel)}
                      className={selectCls}
                    >
                      {(Object.keys(CHANNEL_INFO) as Channel[]).map((k) => (
                        <option key={k} value={k}>
                          {CHANNEL_INFO[k].name}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <div className="flex w-full items-start justify-between gap-2 sm:w-auto">
                  <div className={`min-w-[132px] flex-1 sm:flex-none rounded-xl border px-4 py-2.5 text-right ${toneSoft(tone)}`}>
                    <p className="text-xs text-muted-foreground">Marge netto</p>
                    <p className={`flex items-center justify-end gap-1 text-2xl font-semibold tracking-tight tabular ${toneText(tone)}`}>
                      {s.vkNetto <= 0 ? null : c.margePct >= 20 ? (
                        <TrendingUp className="h-4 w-4" aria-hidden="true" />
                      ) : c.margePct < 10 ? (
                        <TrendingDown className="h-4 w-4" aria-hidden="true" />
                      ) : null}
                      {c.margePct.toFixed(1)} %
                    </p>
                    <p className="text-xs text-muted-foreground tabular">{c.margeNetto.toFixed(2)} € je Einheit</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSku(s.id)}
                    aria-label={`${s.name || "SKU"} entfernen`}
                    className="text-muted-foreground hover:bg-danger-soft hover:text-danger"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>

              <div className="space-y-5 p-5 md:p-6">
                <p className="text-sm leading-relaxed text-muted-foreground">{ch.bemerkung}</p>

                {ch.supportsFeePull && (
                  <div className="rounded-xl border border-accent-blue/20 bg-accent p-4">
                    <p className="text-sm font-semibold">{isAmazon ? "Fees und VK automatisch holen" : "Echte Marketplace-Fees"}</p>
                    <div className="mt-3 flex flex-wrap items-end gap-3">
                      {isAmazon && (
                        <>
                          <Field label="EAN/GTIN" hint="Primärer Schlüssel" className="min-w-[160px] flex-1" htmlFor={`sku-ean-${s.id}`}>
                            <Input
                              id={`sku-ean-${s.id}`}
                              value={s.ean || ""}
                              onChange={(e) =>
                                updateSku(s.id, { ean: e.target.value.replace(/\D/g, ""), feesPullError: undefined })
                              }
                              placeholder="4012345678901"
                              maxLength={14}
                              className="font-mono tabular"
                            />
                          </Field>
                          <Field label="oder ASIN" hint="Fallback, 10 Zeichen" className="min-w-[160px] flex-1" htmlFor={`sku-asin-${s.id}`}>
                            <Input
                              id={`sku-asin-${s.id}`}
                              value={s.asin || ""}
                              onChange={(e) =>
                                updateSku(s.id, { asin: e.target.value.toUpperCase(), feesPullError: undefined })
                              }
                              placeholder="B0XXXXXXXX"
                              maxLength={10}
                              className="font-mono uppercase"
                            />
                          </Field>
                        </>
                      )}
                      {CHANNEL_TO_MARKETPLACE[s.channel] && (
                        <>
                          <Field label="EAN/GTIN (optional)" className="min-w-[160px] flex-1" htmlFor={`sku-ean-${s.id}`}>
                            <Input
                              id={`sku-ean-${s.id}`}
                              value={s.ean || ""}
                              onChange={(e) =>
                                updateSku(s.id, { ean: e.target.value.replace(/\D/g, ""), feesPullError: undefined })
                              }
                              placeholder="4012345678901"
                              maxLength={14}
                              className="font-mono tabular"
                            />
                          </Field>
                          <Field label="Kategorie" hint="Für die Fee-Tabelle" className="min-w-[200px] flex-1" htmlFor={`sku-cat-${s.id}`}>
                            <select
                              id={`sku-cat-${s.id}`}
                              value={s.category || ""}
                              onChange={(e) => updateSku(s.id, { category: e.target.value, feesPullError: undefined })}
                              className={selectCls}
                            >
                              <option value="">Bitte wählen</option>
                              {getMarketplaceCategories(CHANNEL_TO_MARKETPLACE[s.channel]!).map((c) => (
                                <option key={c.slug} value={c.slug}>
                                  {c.label} ({c.provisionPct} %)
                                </option>
                              ))}
                            </select>
                          </Field>
                        </>
                      )}
                      <Button
                        onClick={() => {
                          // Manueller Re-Pull: Identifier auf "force-refresh" setzen, damit Auto-Trigger
                          // nicht parallel feuert. Erst nach Pull-Ende übernimmt der Auto-Trigger wieder.
                          const asin = s.asin?.trim().toUpperCase();
                          const ean = s.ean?.trim();
                          const identifier = `${s.channel}|${asin && asin.length === 10 ? `asin:${asin}` : `ean:${ean}`}`;
                          lastPulledRef.current.set(s.id, identifier);
                          pullFees(s);
                        }}
                        disabled={pullingFees === s.id}
                        className="mb-[22px] shrink-0"
                      >
                        {pullingFees === s.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        ) : (
                          <RefreshCw className="h-4 w-4" aria-hidden="true" />
                        )}
                        {pullingFees === s.id ? "Wird geladen …" : isAmazon ? "Fees und VK neu ziehen" : "Echte Fees ziehen"}
                      </Button>
                    </div>
                    {s.feesPulledAt && !s.feesPullError && (
                      <p className="mt-3 flex items-start gap-1.5 text-xs text-success">
                        <CheckCircle2 className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>
                          Fees und VK (Lowest-FBA) aktualisiert {new Date(s.feesPulledAt).toLocaleString("de-DE")}
                          {s.asin ? `, ASIN ${s.asin}` : ""}
                          {(s.channel === "amazon-fba") && ", inkl. 0,99 €/Monat Storage-Schätzung in FBA/Stück"}
                        </span>
                      </p>
                    )}
                    {isAmazon && !s.feesPulledAt && !s.feesPullError && (
                      <p className="mt-3 text-xs text-muted-foreground">
                        Tipp: ASIN oder EAN einfügen, das Tool zieht Lowest-FBA-Preis und Fees automatisch. Danach nur noch den EK eintragen.
                      </p>
                    )}
                    {s.feesPullError && (
                      <p className="mt-3 flex items-start gap-1.5 text-xs font-medium text-danger" role="alert">
                        <AlertTriangle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        {s.feesPullError}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <p className="mb-3 text-sm font-semibold">Preise und Kosten je Stück</p>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-4 md:grid-cols-3 lg:grid-cols-4">
                    <Field label="VK brutto (€)" hint={<span className="tabular">Listing-Preis, netto {s.vkNetto.toFixed(2)} €</span>}>
                      <NumberInput
                        value={s.vkNetto * 1.19}
                        onChange={(brutto) => updateSku(s.id, { vkNetto: brutto / 1.19 })}
                        placeholder="0,00"
                        ariaLabel="VK brutto in Euro"
                      />
                    </Field>
                    <NumField
                      label="Versand vom Kunden"
                      value={s.versandKundeNetto}
                      onChange={(v) => updateSku(s.id, { versandKundeNetto: v })}
                      suffix="€"
                    />
                    <Field label="EK brutto (€)" hint={<span className="tabular">Einkaufspreis, netto {s.cogs.toFixed(2)} €</span>}>
                      <NumberInput
                        value={s.cogs * 1.19}
                        onChange={(brutto) => updateSku(s.id, { cogs: brutto / 1.19 })}
                        placeholder="0,00"
                        ariaLabel="EK brutto in Euro"
                      />
                    </Field>
                    <NumField
                      label="Eigener Versand"
                      value={s.versandKostenNetto}
                      onChange={(v) => updateSku(s.id, { versandKostenNetto: v })}
                      suffix="€"
                    />
                    <NumField
                      label="Verpackung"
                      value={s.verpackung}
                      onChange={(v) => updateSku(s.id, { verpackung: v })}
                      suffix="€"
                    />
                    <NumField
                      label="Provision"
                      value={s.provisionPct}
                      onChange={(v) => updateSku(s.id, { provisionPct: v })}
                      suffix="%"
                    />
                    <NumField
                      label="Payment-Fee"
                      value={s.paymentFeePct}
                      onChange={(v) => updateSku(s.id, { paymentFeePct: v })}
                      suffix="%"
                    />
                    <NumField
                      label="Payment fix"
                      value={s.paymentFeeFixed}
                      onChange={(v) => updateSku(s.id, { paymentFeeFixed: v })}
                      suffix="€"
                    />
                    <NumField
                      label="FBA/3PL je Stück"
                      value={s.fulfilmentPerUnit}
                      onChange={(v) => updateSku(s.id, { fulfilmentPerUnit: v })}
                      suffix="€"
                    />
                    <NumField
                      label="Werbung je Stück"
                      value={s.werbungPerUnit}
                      onChange={(v) => updateSku(s.id, { werbungPerUnit: v })}
                      suffix="€"
                    />
                    <NumField
                      label="Retourenquote"
                      value={s.retourenPct}
                      onChange={(v) => updateSku(s.id, { retourenPct: v })}
                      suffix="%"
                    />
                  </div>
                </div>

                {/* Zusatz-Kosten: bei eigenem Shop aufgeklappt, sonst eingeklappt */}
                <details open={ch.isOwnShop} className="group rounded-xl border border-border [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold select-none">
                    <span>
                      Zusatzkosten{" "}
                      <span className="font-normal text-muted-foreground">
                        {ch.isOwnShop ? "(eigener Shop)" : "(Affiliate, Preisvergleich, Sonstige)"}
                      </span>
                    </span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <div className="space-y-3 border-t border-border/70 px-4 py-4">
                    <div className="grid grid-cols-2 gap-x-3 gap-y-4 md:grid-cols-4">
                      <NumField
                        label="Affiliate"
                        value={s.affiliatePct}
                        onChange={(v) => updateSku(s.id, { affiliatePct: v })}
                        suffix="%"
                      />
                      <NumField
                        label="Idealo-CPC"
                        value={s.preisvergleichCpc}
                        onChange={(v) => updateSku(s.id, { preisvergleichCpc: v })}
                        suffix="€"
                      />
                      <NumField
                        label="Klick zu Sale"
                        value={s.preisvergleichConversionPct}
                        onChange={(v) => updateSku(s.id, { preisvergleichConversionPct: v })}
                        suffix="%"
                      />
                      <NumField
                        label="Sonstige je Stück"
                        value={s.sonstigeGebuehren}
                        onChange={(v) => updateSku(s.id, { sonstigeGebuehren: v })}
                        suffix="€"
                      />
                    </div>
                    {(s.preisvergleichCpc > 0 && s.preisvergleichConversionPct > 0) && (
                      <p className="text-xs text-muted-foreground tabular">
                        Preisvergleich: {s.preisvergleichCpc.toFixed(2)} €/Klick × {(100 / s.preisvergleichConversionPct).toFixed(1)} Klicks/Sale ={" "}
                        <span className="font-semibold text-foreground">{c.preisvergleichFeePerSale.toFixed(2)} €/Sale</span>
                      </p>
                    )}
                    {ch.isOwnShop && (
                      <Callout tone="neutral" icon={Lightbulb} title="Tipps für den eigenen Shop">
                        Affiliate-Programme typisch 5 bis 15 % Provision. Idealo-CPC Standard 0,15 bis 0,70 € (Elektronik 0,40 bis 0,60 €).
                        Klick-zu-Sale-Conversion typisch 3 bis 8 % (Median 5 %).
                      </Callout>
                    )}
                  </div>
                </details>

                <details className="group rounded-xl border border-border [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold select-none">
                    Berechnung im Detail
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <div className="grid grid-cols-1 gap-x-8 border-t border-border/70 px-4 py-2 md:grid-cols-2 [&>div]:border-b [&>div]:border-border/50">
                    <ResultRow label="VK brutto (mit USt)" value={`${c.vkBrutto.toFixed(2)} €`} />
                    <ResultRow label="Provision" value={`${c.provision.toFixed(2)} €`} />
                    <ResultRow label="Payment-Fee" value={`${c.paymentFee.toFixed(2)} €`} />
                    {c.affiliateFee > 0 && <ResultRow label="Affiliate-Fee" value={`${c.affiliateFee.toFixed(2)} €`} />}
                    {c.preisvergleichFeePerSale > 0 && (
                      <ResultRow label="Preisvergleich je Sale" value={`${c.preisvergleichFeePerSale.toFixed(2)} €`} />
                    )}
                    <ResultRow label="FBA und Versand" value={`${(s.fulfilmentPerUnit + s.versandKostenNetto).toFixed(2)} €`} />
                    <ResultRow label="Werbung" value={`${s.werbungPerUnit.toFixed(2)} €`} />
                    <ResultRow label="Kosten gesamt" value={`${c.totalKosten.toFixed(2)} €`} />
                    <ResultRow label="Marge vor Retoure" value={`${c.margeBrutto.toFixed(2)} €`} />
                    <ResultRow label={`Retoure-Last (${s.retourenPct} %)`} value={`${c.retoureLast.toFixed(2)} €`} />
                  </div>
                  <div className="px-4 pb-2">
                    <ResultRow label="Marge netto" value={`${c.margeNetto.toFixed(2)} €`} tone={tone} strong />
                  </div>
                </details>
              </div>
            </article>
          );
        })}
        {skus.length > 0 && (
          <Button variant="outline" onClick={addSku} className="w-full border-dashed">
            <Plus className="h-4 w-4" aria-hidden="true" /> Weitere SKU hinzufügen
          </Button>
        )}
      </div>

      {/* Tipps */}
      <ToolSection title="Gesunde Margen je Channel" icon={Lightbulb}>
        <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <li>
            <strong className="font-semibold text-foreground">Shopify D2C:</strong> ab 30 % Marge Pflicht, sonst frisst der Werbe-Spend alles auf (Faustregel: CAC = 25 bis 35 % vom AOV).
          </li>
          <li>
            <strong className="font-semibold text-foreground">Amazon FBA:</strong> ab 20 % Marge nach allen Fees (Provision 15 %, FBA-Pick&amp;Pack 3 bis 5 €/Stück, Werbung 10 bis 20 % beim Launch).
          </li>
          <li>
            <strong className="font-semibold text-foreground">eBay, Kaufland, Otto:</strong> ab 15 %, niedrigere Werbekosten, aber auch niedrigerer AOV.
          </li>
          <li>
            <strong className="font-semibold text-foreground">Etsy:</strong> ab 25 %, wenig Werbung nötig, aber 4 % Payment und 6,5 % Transaktion.
          </li>
          <li>
            <strong className="font-semibold text-foreground">Retouren:</strong> Mode/Beauty 15 bis 25 %, Elektronik 5 bis 10 %, Verbrauchsgüter unter 5 %.
          </li>
          <li>
            <strong className="font-semibold text-foreground">Stück-Marge ist nicht Gewinn:</strong> Das Tool rechnet die Marge je Stück. Marge × Stückzahl muss zusätzlich deine Fixkosten (Personal, Tools, Miete) decken.
          </li>
          <li>
            <strong className="font-semibold text-foreground">USt:</strong> Das Tool nimmt 19 % an. Bei 7 % (Lebensmittel, Bücher) oder Reverse-Charge B2B-EU manuell korrigieren.
          </li>
        </ul>
      </ToolSection>
    </CockpitShell>
  );
};

/**
 * Robustes Zahlen-Input. Akzeptiert Komma + Punkt als Dezimaltrenner, blockiert nicht beim Tippen.
 * Interner String-State verhindert, dass Tippen "1.5" → "1" + "." + "5" beim Re-Render kollabiert.
 */
const NumberInput = ({
  value,
  onChange,
  placeholder,
  className,
  ariaLabel,
}: {
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
  className?: string;
  ariaLabel?: string;
}) => {
  // Lokaler String-State: erlaubt Zwischenstände wie "1," oder "0."
  const initial = value > 0 ? String(Math.round(value * 100) / 100).replace(".", ",") : "";
  const [text, setText] = useState<string>(initial);
  const lastValueRef = useRef<number>(value);

  // Wenn der parent-Wert sich von außen substantiell ändert (z.B. Reset, fees-Pull),
  // Text synchronisieren — Toleranz 0.005€/0.005% gegen Rundungs-Roundtrips (Brutto/Netto).
  useEffect(() => {
    if (Math.abs(lastValueRef.current - value) > 0.005) {
      lastValueRef.current = value;
      setText(value > 0 ? String(Math.round(value * 100) / 100).replace(".", ",") : "");
    }
  }, [value]);

  const parse = (raw: string): number | null => {
    const cleaned = raw.replace(/\s/g, "").replace(",", ".");
    if (cleaned === "" || cleaned === ".") return 0;
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? Math.max(0, n) : null;
  };

  return (
    <Input
      type="text"
      inputMode="decimal"
      value={text}
      placeholder={placeholder ?? "0"}
      aria-label={ariaLabel}
      className={className ?? "text-right tabular"}
      onChange={(e) => {
        const raw = e.target.value;
        // Erlaube nur Ziffern, ein Komma/Punkt, leer
        if (!/^[\d.,]*$/.test(raw)) return;
        setText(raw);
        const parsed = parse(raw);
        if (parsed !== null) {
          lastValueRef.current = parsed;
          onChange(parsed);
        }
      }}
      onBlur={() => {
        // Beim Verlassen: auf 2 Nachkommastellen normalisieren wenn Wert > 0
        if (value > 0) setText(String(Math.round(value * 100) / 100).replace(".", ","));
        else setText("");
      }}
    />
  );
};

const NumField = ({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
}) => {
  const text = suffix ? `${label} (${suffix})` : label;
  return (
    <Field label={text}>
      <NumberInput value={value} onChange={onChange} ariaLabel={text} />
    </Field>
  );
};

export default MargeTracker;
