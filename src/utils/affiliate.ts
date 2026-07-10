// Affiliate-Reflink-Erfassung: ?ref=CODE -> Cookie (60 Tage) -> Checkout-Attribution.
const COOKIE = "aff_ref";
const MAX_AGE = 60 * 60 * 24 * 60;

export function captureAffiliateRef(): void {
  try {
    const raw = (new URLSearchParams(window.location.search).get("ref") || "").trim();
    if (raw && /^[A-Za-z0-9]{4,32}$/.test(raw)) {
      document.cookie = `${COOKIE}=${encodeURIComponent(raw.toUpperCase())};path=/;max-age=${MAX_AGE};SameSite=Lax`;
    }
  } catch { /* noop */ }
}

export function getStoredAffiliateRef(): string | undefined {
  try {
    const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=([^;]+)`));
    return m ? decodeURIComponent(m[1]) : undefined;
  } catch { return undefined; }
}
