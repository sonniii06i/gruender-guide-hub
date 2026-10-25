import { supabase } from "@/integrations/supabase/client";

// Einwilligung in die Tipps-Strecke (25.10.2026). Text und Version müssen mit
// supabase/functions/_shared/tippsStrecke.ts übereinstimmen (Test tipps-einwilligung).
// Die Function lehnt jede andere Version ab – geändert wird immer an beiden Stellen.
/** Schalter: Häkchen erst zeigen, wenn Tabelle, Functions und Cron laufen und der Betreiber die Texte freigegeben hat. */
export const TIPPS_AKTIV = false;

export const EINWILLIGUNG_VERSION = "2026-10-25";
export const EINWILLIGUNG_TEXT =
  "Ja, schickt mir in den nächsten 10 Tagen bis zu 4 E-Mails mit Tipps zu diesem Thema und zu GründerX " +
  "(mit Messung von Öffnungen und Klicks). Abmelden geht jederzeit mit einem Klick.";

/** Tools, nach denen die Strecke angeboten wird (= TOOL_STRECKE in der Function). */
export const TIPPS_TOOLS = new Set([
  "influencer-steuer-check", "pr-paket-rechner", "tiktok-shop-checkliste",
  "businessplan-erstellen", "gruendungskosten-rechner", "rechtsform-finden",
  "weee-check", "brand-check", "lucid-wizard",
  "amazon-marken-freischaltung-widerspruch-generator", "amazon-transparency-seriennummer-widerspruch-generator",
]);

/** Fordert die Bestätigungsmail an. Scheitert leise – das Ergebnis des Tools hängt nie daran. */
export async function tippsAnfordern(email: string, slug: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.functions.invoke("tipps-anfordern", {
      body: { email: email.trim().toLowerCase(), slug, version: EINWILLIGUNG_VERSION },
    });
    return !error && Boolean((data as { ok?: boolean } | null)?.ok);
  } catch {
    return false;
  }
}
