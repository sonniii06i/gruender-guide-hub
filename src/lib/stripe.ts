export const STRIPE_PRICES = {
  gruenderx: "price_1TTUf764hSN6usxPLDOylK70",
} as const;

export const PLAN_LABELS: Record<string, string> = {
  [STRIPE_PRICES.gruenderx]: "GründerX",
};
