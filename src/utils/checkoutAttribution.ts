// Freigabe #65 (27.10.2026): UTM + Einstiegsseite für JEDEN Checkout (Gast und eingeloggt).
// Liest nur die aktuelle URL bzw. den schon vorhandenen First Touch (analytics.ts) – keine neue Speicherung.
// Bewusst ohne Supabase-Import, damit die Landing-Chunks schlank bleiben.

/** Liest einen Wert aus der aktuellen URL oder dem gespeicherten First Touch. */
export function attributionValue(key: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  const fromUrl = new URLSearchParams(window.location.search).get(key);
  if (fromUrl) return fromUrl;
  try {
    const raw = localStorage.getItem("gx_first_touch");
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as Record<string, string>;
    return parsed?.[key] || undefined;
  } catch {
    return undefined;
  }
}

/** Freigabe #65 (27.10.2026): UTM + Einstiegsseite für JEDEN Checkout (Gast und eingeloggt) – nur aus URL bzw.
 * dem vorhandenen First Touch, keine neue Speicherung. */
export function checkoutAttribution(): Record<string, string | undefined> {
  return {
    utm_source: attributionValue("utm_source"),
    utm_medium: attributionValue("utm_medium"),
    utm_campaign: attributionValue("utm_campaign"),
    utm_content: attributionValue("utm_content"),
    utm_term: attributionValue("utm_term"),
    landing: attributionValue("landing_path"),
  };
}

