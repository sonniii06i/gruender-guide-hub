import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// SP-API EU-Endpoint (DACH). Für US: https://sellingpartnerapi-na.amazon.com
const SP_API_ENDPOINT_EU = "https://sellingpartnerapi-eu.amazon.com";
const SP_API_ENDPOINT_NA = "https://sellingpartnerapi-na.amazon.com";
const SP_API_ENDPOINT_FE = "https://sellingpartnerapi-fe.amazon.com";

// Marketplace-IDs
const MARKETPLACE_IDS: Record<string, string> = {
  DE: "A1PA6795UKMFR9",
  AT: "A1PA6795UKMFR9", // Österreich nutzt DE-Marketplace
  FR: "A13V1IB3VIYZZH",
  IT: "APJ6JRA9NG5V4",
  ES: "A1RKKUPIHCS9HS",
  NL: "A1805IZSGTT6HS",
  BE: "AMEN7PMS3EDWL",
  PL: "A1C3SOZRARQ6R3",
  SE: "A2NODRKZP88ZB9",
  UK: "A1F83G8C2ARO7P",
  US: "ATVPDKIKX0DER",
  CA: "A2EUQ1WTGCTBG2",
};

interface FeesRequest {
  asin?: string;
  ean?: string;
  priceBrutto?: number;
  priceNetto?: number;
  currency?: string;
  marketplace?: string;
  isAmazonFulfilled?: boolean;
}

let cachedAccessToken: { token: string; expiresAt: number } | null = null;

function describeSecret(name: string, value: string | undefined): {
  name: string;
  set: boolean;
  length: number;
  startsWith?: string;
  endsWith?: string;
  hasLeadingWs?: boolean;
  hasTrailingWs?: boolean;
} {
  if (!value) return { name, set: false, length: 0 };
  return {
    name,
    set: true,
    length: value.length,
    startsWith: value.slice(0, 6),
    endsWith: value.slice(-4),
    hasLeadingWs: value !== value.trimStart(),
    hasTrailingWs: value !== value.trimEnd(),
  };
}

async function getLwaAccessToken(): Promise<string> {
  // Cache 50min (token gilt 1h)
  if (cachedAccessToken && Date.now() < cachedAccessToken.expiresAt - 600_000) {
    return cachedAccessToken.token;
  }

  // Auto-trim Whitespace (häufigster Paste-Fehler)
  const clientId = Deno.env.get("AMAZON_SP_LWA_CLIENT_ID")?.trim();
  const clientSecret = Deno.env.get("AMAZON_SP_LWA_CLIENT_SECRET")?.trim();
  const refreshToken = Deno.env.get("AMAZON_SP_REFRESH_TOKEN")?.trim();

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "SP-API-Credentials fehlen. Setze AMAZON_SP_LWA_CLIENT_ID, AMAZON_SP_LWA_CLIENT_SECRET, AMAZON_SP_REFRESH_TOKEN in Supabase-Secrets.",
    );
  }

  const res = await fetch("https://api.amazon.com/auth/o2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    // Diagnostic Info MIT in Error packen (keine geheime Daten)
    const diag = [
      describeSecret("CLIENT_ID", Deno.env.get("AMAZON_SP_LWA_CLIENT_ID")),
      describeSecret("CLIENT_SECRET", Deno.env.get("AMAZON_SP_LWA_CLIENT_SECRET")),
      describeSecret("REFRESH_TOKEN", Deno.env.get("AMAZON_SP_REFRESH_TOKEN")),
    ];
    throw new Error(
      `LWA-Token-Exchange fehlgeschlagen (${res.status}): ${errText} | Secret-Diagnostik: ${JSON.stringify(diag)}`,
    );
  }

  const data = await res.json();
  cachedAccessToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return data.access_token;
}

function pickEndpoint(marketplace: string): string {
  if (["US", "CA", "MX", "BR"].includes(marketplace)) return SP_API_ENDPOINT_NA;
  if (["JP", "AU", "SG", "IN"].includes(marketplace)) return SP_API_ENDPOINT_FE;
  return SP_API_ENDPOINT_EU;
}

/**
 * Holt den niedrigsten FBA-Offer-Preis (Listing+Shipping) für eine ASIN vom Marketplace.
 * Fallback: niedrigster Merchant-Fulfilled-Offer. Wirft Error wenn überhaupt kein Angebot da.
 */
async function fetchLowestFbaPrice(
  asin: string,
  marketplaceId: string,
  endpoint: string,
): Promise<{ price: number; currency: string; isFba: boolean; source: "buybox" | "lowest-fba" | "lowest-any" }> {
  const accessToken = await getLwaAccessToken();
  const url = `${endpoint}/products/pricing/v0/items/${encodeURIComponent(asin)}/offers?MarketplaceId=${marketplaceId}&ItemCondition=New&CustomerType=Consumer`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "x-amz-access-token": accessToken,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Lowest-Price-Lookup fehlgeschlagen (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const payload = data?.payload;
  if (!payload) throw new Error("Leere Pricing-Response");

  const offers: any[] = Array.isArray(payload.Offers) ? payload.Offers : [];
  const currency =
    payload.Summary?.LowestPrices?.[0]?.LandedPrice?.CurrencyCode ||
    offers[0]?.ListingPrice?.CurrencyCode ||
    "EUR";

  const offerPrice = (o: any): number => {
    const lp = o?.ListingPrice?.Amount || 0;
    const ship = o?.Shipping?.Amount || 0;
    return lp + ship;
  };

  // Priorität 1: Buy-Box-Winner (sofern FBA)
  const buyBox = offers.find((o: any) => o.IsBuyBoxWinner === true);
  if (buyBox && buyBox.IsFulfilledByAmazon) {
    const p = offerPrice(buyBox);
    if (p > 0) return { price: p, currency, isFba: true, source: "buybox" };
  }

  // Priorität 2: günstigster FBA-Offer
  const fbaOffers = offers.filter((o: any) => o.IsFulfilledByAmazon === true);
  if (fbaOffers.length > 0) {
    const cheapest = fbaOffers.reduce((min, o) => (offerPrice(o) < offerPrice(min) ? o : min));
    const p = offerPrice(cheapest);
    if (p > 0) return { price: p, currency, isFba: true, source: "lowest-fba" };
  }

  // Priorität 3: irgendein Offer (Merchant-Fulfilled)
  if (offers.length > 0) {
    const cheapest = offers.reduce((min, o) => (offerPrice(o) < offerPrice(min) ? o : min));
    const p = offerPrice(cheapest);
    if (p > 0) return { price: p, currency, isFba: false, source: "lowest-any" };
  }

  throw new Error(`Kein aktives Angebot für ASIN ${asin} gefunden`);
}

async function lookupAsinByEan(ean: string, marketplaceId: string, endpoint: string): Promise<string> {
  const accessToken = await getLwaAccessToken();
  const url = `${endpoint}/catalog/2022-04-01/items?identifiers=${encodeURIComponent(ean)}&identifiersType=EAN&marketplaceIds=${marketplaceId}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "x-amz-access-token": accessToken,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`EAN-Lookup fehlgeschlagen (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const items = data.items || [];
  if (items.length === 0) {
    throw new Error(`Keine ASIN gefunden für EAN ${ean} im Marketplace`);
  }
  return items[0].asin as string;
}

async function fetchFeesEstimate(req: FeesRequest, asin: string): Promise<unknown> {
  const accessToken = await getLwaAccessToken();
  const marketplace = (req.marketplace || "DE").toUpperCase();
  const marketplaceId = MARKETPLACE_IDS[marketplace];
  if (!marketplaceId) {
    throw new Error(`Unbekannter Marketplace: ${marketplace}. Erlaubt: ${Object.keys(MARKETPLACE_IDS).join(", ")}`);
  }

  const endpoint = pickEndpoint(marketplace);
  const url = `${endpoint}/products/fees/v0/items/${encodeURIComponent(asin)}/feesEstimate`;

  // Brutto-Preis: bevorzugt priceBrutto, sonst priceNetto * 1.19
  const priceBrutto = req.priceBrutto ?? (req.priceNetto ? req.priceNetto * 1.19 : 0);

  const body = {
    FeesEstimateRequest: {
      MarketplaceId: marketplaceId,
      IsAmazonFulfilled: req.isAmazonFulfilled !== false, // default true (FBA)
      PriceToEstimateFees: {
        ListingPrice: {
          CurrencyCode: req.currency || "EUR",
          Amount: priceBrutto,
        },
      },
      Identifier: crypto.randomUUID(),
      OptionalFulfillmentProgram: req.isAmazonFulfilled !== false ? "FBA_CORE" : undefined,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "x-amz-access-token": accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`SP-API-Call fehlgeschlagen (${res.status}): ${errText}`);
  }

  return await res.json();
}

interface ParsedFees {
  asin: string;
  ean?: string;
  referralFee: number;
  fbaFees: number;
  variableClosingFee: number;
  perItemFee: number;
  totalFees: number;
  currency: string;
  feeDetails: Array<{ type: string; amount: number; included?: Array<{ type: string; amount: number }> }>;
  warning?: string;
  /** Vom Listing automatisch ermittelter Lowest-FBA-Preis (Brutto, inkl. Versand) — gesetzt wenn Tool den Preis selbst holen sollte. */
  lowestFbaPrice?: number;
  lowestFbaSource?: "buybox" | "lowest-fba" | "lowest-any";
  priceUsedForFees?: number;
}

function parseFeesResponse(raw: any, asin: string, ean?: string): ParsedFees {
  const result = raw?.payload?.FeesEstimateResult;
  if (!result) throw new Error("Unerwartete SP-API-Response (kein FeesEstimateResult)");

  if (result.Status !== "Success") {
    const errMsg = result.Error?.Message || "Unbekannter SP-API-Fehler";
    throw new Error(`SP-API-Status ${result.Status}: ${errMsg}`);
  }

  const estimate = result.FeesEstimate;
  if (!estimate) throw new Error("Kein FeesEstimate in Response");

  const currency = estimate.TotalFeesEstimate?.CurrencyCode || "EUR";
  const total = estimate.TotalFeesEstimate?.Amount || 0;

  let referralFee = 0;
  let fbaFees = 0;
  let variableClosingFee = 0;
  let perItemFee = 0;

  const feeDetails: ParsedFees["feeDetails"] = [];
  for (const detail of estimate.FeeDetailList || []) {
    const amount = detail.FeeAmount?.Amount || 0;
    const type = detail.FeeType;
    feeDetails.push({
      type,
      amount,
      included: detail.IncludedFeeDetailList?.map((d: any) => ({
        type: d.FeeType,
        amount: d.FeeAmount?.Amount || 0,
      })),
    });
    if (type === "ReferralFee") referralFee = amount;
    else if (type === "FBAFees") fbaFees = amount;
    else if (type === "VariableClosingFee") variableClosingFee = amount;
    else if (type === "PerItemFee") perItemFee = amount;
  }

  return {
    asin,
    ean,
    referralFee,
    fbaFees,
    variableClosingFee,
    perItemFee,
    totalFees: total,
    currency,
    feeDetails,
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Nur POST erlaubt" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json()) as FeesRequest;
    console.log("[amazon-fees-estimate] incoming body:", JSON.stringify(body));

    // ASIN ODER EAN Pflicht
    const hasAsin = body.asin && typeof body.asin === "string" && body.asin.length === 10;
    const hasEan = body.ean && typeof body.ean === "string" && /^[0-9]{8,14}$/.test(body.ean);
    if (!hasAsin && !hasEan) {
      return new Response(JSON.stringify({ error: "ASIN (10-stellig) oder EAN (8-14 Ziffern) erforderlich" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Wenn EAN gegeben aber keine ASIN: erst EAN→ASIN lookup
    const marketplace = (body.marketplace || "DE").toUpperCase();
    const marketplaceId = MARKETPLACE_IDS[marketplace];
    if (!marketplaceId) {
      return new Response(JSON.stringify({ error: `Unbekannter Marketplace: ${marketplace}` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const endpoint = pickEndpoint(marketplace);

    let asin = body.asin || "";
    if (!hasAsin && hasEan) {
      asin = await lookupAsinByEan(body.ean!, marketplaceId, endpoint);
    }

    // Wenn KEIN Preis im Request: Lowest-FBA-Preis vom Listing holen.
    const requestedPrice = body.priceBrutto ?? (body.priceNetto ? body.priceNetto * 1.19 : 0);
    let lowestFbaPrice: number | undefined;
    let lowestFbaSource: "buybox" | "lowest-fba" | "lowest-any" | undefined;
    let priceForFees = requestedPrice;
    if (priceForFees <= 0) {
      const lp = await fetchLowestFbaPrice(asin, marketplaceId, endpoint);
      lowestFbaPrice = lp.price;
      lowestFbaSource = lp.source;
      priceForFees = lp.price;
    }
    if (priceForFees <= 0) {
      return new Response(JSON.stringify({ error: "Kein Preis verfügbar — weder im Request noch im Listing" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const raw = await fetchFeesEstimate({ ...body, priceBrutto: priceForFees }, asin);
    const parsed = parseFeesResponse(raw, asin, body.ean);
    parsed.lowestFbaPrice = lowestFbaPrice;
    parsed.lowestFbaSource = lowestFbaSource;
    parsed.priceUsedForFees = priceForFees;

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    const stack = e instanceof Error ? e.stack : undefined;
    console.error("amazon-fees-estimate error:", message, stack ? `\nSTACK: ${stack}` : "");
    return new Response(JSON.stringify({ error: message, stack }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
