export const STRIPE_PRICES = {
  gruenderx: "price_1TTUf764hSN6usxPLDOylK70",
  bundle: "price_1TTUfV64hSN6usxPe60ADpTF",
} as const;

export const PLAN_LABELS: Record<string, string> = {
  [STRIPE_PRICES.gruenderx]: "GründerX",
  [STRIPE_PRICES.bundle]: "Founder Bundle",
};
