import { supabase } from "@/integrations/supabase/client";
import type { ChancenArt } from "@/lib/gruenderChancen";

// Chancen-Alarm (25.10.2026): wöchentliche Mail mit neuen Gründer-Chancen, Double-Opt-in über
// chancen-anfordern → Bestätigungsmail → chancen-bestaetigen. Text und Version müssen mit
// supabase/functions/_shared/chancenAlarm.ts übereinstimmen (Test chancen-alarm) – die Function
// lehnt jede andere Version ab, geändert wird immer an beiden Stellen.
/** Schalter: Formular erst zeigen, wenn Tabelle, Functions und Cron laufen (Freigabe des Betreibers). */
export const CHANCEN_ALARM_AKTIV = true;

export const ALARM_VERSION = "2026-10-25";
export const ALARM_TEXT =
  "Ja, schickt mir einmal pro Woche eine E-Mail mit neuen Gründer-Chancen zu meiner Auswahl " +
  "(mit Messung von Öffnungen und Klicks). Abmelden geht jederzeit mit einem Klick.";

export type AlarmStatus = "gesendet" | "bereits_bestaetigt" | "bereits_gesendet" | "limit" | "fehler";

export async function chancenAlarmAnfordern(o: {
  email: string; arten: ChancenArt[]; region: string; ohneNurFrauen: boolean; website?: string;
}): Promise<AlarmStatus> {
  try {
    const { data, error } = await supabase.functions.invoke("chancen-anfordern", {
      body: { ...o, email: o.email.trim().toLowerCase(), version: ALARM_VERSION },
    });
    const d = data as { ok?: boolean; status?: AlarmStatus } | null;
    return !error && d?.ok && d.status ? d.status : "fehler";
  } catch {
    return "fehler";
  }
}
