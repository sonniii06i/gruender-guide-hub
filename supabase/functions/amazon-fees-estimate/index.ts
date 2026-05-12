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
  asin: string;
  priceNetto: number;
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

async function fetchFeesEstimate(req: FeesRequest): Promise<unknown> {
  const accessToken = await getLwaAccessToken();
  const marketplace = (req.marketplace || "DE").toUpperCase();
  const marketplaceId = MARKETPLACE_IDS[marketplace];
  if (!marketplaceId) {
    throw new Error(`Unbekannter Marketplace: ${marketplace}. Erlaubt: ${Object.keys(MARKETPLACE_IDS).join(", ")}`);
  }

  const endpoint = pickEndpoint(marketplace);
  const url = `${endpoint}/products/fees/v0/items/${encodeURIComponent(req.asin)}/feesEstimate`;

  const body = {
    FeesEstimateRequest: {
      MarketplaceId: marketplaceId,
      IsAmazonFulfilled: req.isAmazonFulfilled !== false, // default true (FBA)
      PriceToEstimateFees: {
        ListingPrice: {
          CurrencyCode: req.currency || "EUR",
          Amount: req.priceNetto * 1.19, // SP-API erwartet Brutto-Preis (Listing-Price)
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
  referralFee: number;
  fbaFees: number;
  variableClosingFee: number;
  perItemFee: number;
  totalFees: number;
  currency: string;
  feeDetails: Array<{ type: string; amount: number; included?: Array<{ type: string; amount: number }> }>;
  warning?: string;
}

function parseFeesResponse(raw: any): ParsedFees {
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

    if (!body.asin || typeof body.asin !== "string" || body.asin.length !== 10) {
      return new Response(JSON.stringify({ error: "ASIN ungültig (muss 10-stellig sein)" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!body.priceNetto || body.priceNetto <= 0) {
      return new Response(JSON.stringify({ error: "priceNetto muss > 0 sein" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const raw = await fetchFeesEstimate(body);
    const parsed = parseFeesResponse(raw);

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("amazon-fees-estimate error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
