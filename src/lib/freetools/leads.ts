// Kostenlose Nutzung gegen E-Mail-Adresse — Schwester von
// src/lib/freetools/leads.ts in AnwaltX.
//
// Der Lead landet in public.tool_leads (Herkunft `gx-tool:<slug>`,
// Migration supabase/migrations/20260925120000_tool_leads.sql). Das ist
// KEINE Werbeeinwilligung. GründerX hat (Stand 25.09.2026) keinen
// Newsletter mit Double-Opt-in; deshalb gibt es im Tor auch kein
// Newsletter-Häkchen. Eine Einwilligung wird nie still gesetzt.
//
// Der Browser darf in tool_leads nur EINFÜGEN (RLS), nie lesen.

import { supabase } from "@/integrations/supabase/client";
import { trackAdConversion } from "@/utils/adConversions";

export const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

const UNLOCK_KEY_PREFIX = "gruenderx:tool-unlocked:";

/**
 * Speichert die Adresse als Lead. Scheitert das Speichern, wird trotzdem
 * freigeschaltet — das Versprechen „kostenlos gegen E-Mail" darf nicht an
 * einer Tabelle hängen. Rückgabe: ob der Lead gespeichert wurde.
 */
export async function saveToolLead(params: { email: string; slug: string }): Promise<boolean> {
  const email = params.email.trim().toLowerCase();
  const source = `gx-tool:${params.slug}`;
  try {
    // `as any`: types.ts ist generiert und kennt die Tabelle erst nach
    // Migration und nächstem Typen-Export. Bewusst ohne .select() — die RLS
    // erlaubt nur Einfügen, kein Zurücklesen.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from("tool_leads").insert({
      email,
      source,
      tool_slug: params.slug,
    });
    if (error) {
      console.warn("tool_leads: Lead nicht gespeichert:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("tool_leads: Lead nicht gespeichert:", (err as Error).message);
    return false;
  }
}

/**
 * Meldet die Freischaltung als `lead` (Meta: „Lead", Stufe `tool_result`).
 * trackAdConversion prüft die Marketing-Einwilligung selbst: ohne sie wird
 * nichts gesendet. Die E-Mail-Adresse geht bewusst NICHT mit.
 */
export function trackToolLead(slug: string): void {
  try {
    trackAdConversion("tool_result", { label: `gx-tool:${slug}` });
  } catch {
    /* Tracking darf die Freischaltung nie verhindern */
  }
}

/** Freischaltung je Tool im localStorage merken. */
export function rememberToolUnlocked(slug: string): void {
  try {
    window.localStorage.setItem(UNLOCK_KEY_PREFIX + slug, new Date().toISOString());
  } catch {
    /* privater Modus / blockierter Speicher: dann fragt das Tor eben erneut */
  }
}

export function isToolUnlockedLocally(slug: string): boolean {
  try {
    return Boolean(window.localStorage.getItem(UNLOCK_KEY_PREFIX + slug));
  } catch {
    return false;
  }
}
