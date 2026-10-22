// ===================================================================
// Freigabe der Vorlagen-Bibliothek (/vorlagen) im Browser.
//
// Anders als bei den Gratis-Tools (lib/freetools/leads.ts: Adresse
// eintippen, sofort frei) wird hier BESTÄTIGT: Die Edge Function
// vorlage-anfordern schickt eine Mail mit signiertem Link; der Klick
// führt über vorlage-bestaetigen zurück auf die Vorlagenseite mit
// `?freigabe=1&e=<adresse>&s=<signatur>`. Erst dann merkt sich dieser
// Browser die Freigabe — und zwar für ALLE Vorlagen, nicht je Vorlage.
//
// Die Freigabe ist ein Schlüssel für diesen Browser, keine Sicherheits-
// grenze: Die Vorlagen sind Text im Bundle. Der Wert liegt im bestätigten
// Lead (vorlagen_leads.bestaetigt_am), nicht im Verstecken der Datei.
// ===================================================================

import { supabase } from "@/integrations/supabase/client";
import { EMAIL_PATTERN } from "@/lib/freetools/leads";
import { trackAdConversion } from "@/utils/adConversions";

export const FREIGABE_KEY = "gruenderx:vorlagen-freigabe";
/** Zuletzt angeforderte Adresse — nur, um nach dem Klick zu wissen, was wir erwarten. */
export const PENDING_KEY = "gruenderx:vorlagen-angefordert";

export interface VorlagenFreigabe {
  email: string;
  sig: string;
  /** ISO-Zeitpunkt der Freigabe in diesem Browser. */
  at: string;
}

const SIG_RE = /^[0-9a-f]{64}$/;

export function freigabeLesen(): VorlagenFreigabe | null {
  try {
    const raw = window.localStorage.getItem(FREIGABE_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Partial<VorlagenFreigabe>;
    if (!v || typeof v.email !== "string" || typeof v.sig !== "string") return null;
    if (!EMAIL_PATTERN.test(v.email) || !SIG_RE.test(v.sig)) return null;
    return { email: v.email, sig: v.sig, at: typeof v.at === "string" ? v.at : "" };
  } catch {
    return null;
  }
}

export function freigabeMerken(email: string, sig: string): void {
  try {
    const wert: VorlagenFreigabe = { email: email.trim().toLowerCase(), sig, at: new Date().toISOString() };
    window.localStorage.setItem(FREIGABE_KEY, JSON.stringify(wert));
    window.localStorage.removeItem(PENDING_KEY);
  } catch {
    /* privater Modus: dann fragt die Seite beim nächsten Mal erneut */
  }
}

export function freigabeLoeschen(): void {
  try {
    window.localStorage.removeItem(FREIGABE_KEY);
  } catch {
    /* egal */
  }
}

/**
 * Liest `?freigabe=1&e=…&s=…` aus der URL (das Ziel der Weiterleitung von
 * vorlage-bestaetigen). Gibt die Freigabe zurück, wenn beide Werte
 * plausibel sind — echt geprüft hat sie die Edge Function schon, sonst
 * hätte sie nicht weitergeleitet.
 */
export function freigabeAusUrl(search: string): VorlagenFreigabe | null {
  const p = new URLSearchParams(search);
  if (p.get("freigabe") !== "1") return null;
  const email = (p.get("e") || "").trim().toLowerCase();
  const sig = (p.get("s") || "").trim();
  if (!EMAIL_PATTERN.test(email) || !SIG_RE.test(sig)) return null;
  return { email, sig, at: new Date().toISOString() };
}

/** Entfernt die Freigabe-Parameter aus der URL, ohne die Seite zu laden. */
export function freigabeParameterEntfernen(): void {
  try {
    const url = new URL(window.location.href);
    if (!url.searchParams.has("freigabe")) return;
    for (const k of ["freigabe", "e", "s"]) url.searchParams.delete(k);
    window.history.replaceState(window.history.state, "", url.pathname + (url.search || "") + url.hash);
  } catch {
    /* egal */
  }
}

export function angefordertMerken(email: string): void {
  try {
    window.localStorage.setItem(PENDING_KEY, JSON.stringify({ email: email.trim().toLowerCase(), at: new Date().toISOString() }));
  } catch {
    /* egal */
  }
}

export function angefordertLesen(): { email: string; at: string } | null {
  try {
    const raw = window.localStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as { email?: string; at?: string };
    if (!v?.email || !EMAIL_PATTERN.test(v.email)) return null;
    return { email: v.email, at: v.at ?? "" };
  } catch {
    return null;
  }
}

export type AnfordernStatus = "gesendet" | "bereits_gesendet" | "limit";
export type AnfordernErgebnis =
  | { ok: true; status: AnfordernStatus }
  | { ok: false; fehler: "email" | "versand" | "nicht_konfiguriert" | "netz" | "unbekannt" };

/**
 * Fordert die Bestätigungsmail an. Wirft nie; der Dialog zeigt den Grund.
 * `website` ist der Honigtopf — Menschen sehen das Feld nicht.
 */
export async function vorlageAnfordern(params: { email: string; slug: string; website?: string }): Promise<AnfordernErgebnis> {
  const email = params.email.trim().toLowerCase();
  if (!EMAIL_PATTERN.test(email)) return { ok: false, fehler: "email" };
  try {
    const { data, error } = await supabase.functions.invoke("vorlage-anfordern", {
      body: { email, slug: params.slug, website: params.website ?? "" },
    });
    if (error) {
      // supabase-js verpackt HTTP-Fehler; der Grund steht im Body der Antwort.
      const grund = await fehlerGrund(error);
      if (grund === "versand") return { ok: false, fehler: "versand" };
      if (grund === "nicht_konfiguriert") return { ok: false, fehler: "nicht_konfiguriert" };
      if (grund === "email") return { ok: false, fehler: "email" };
      return { ok: false, fehler: "unbekannt" };
    }
    const status = (data as { status?: string } | null)?.status;
    if (status === "gesendet" || status === "bereits_gesendet" || status === "limit") return { ok: true, status };
    return { ok: false, fehler: "unbekannt" };
  } catch {
    return { ok: false, fehler: "netz" };
  }
}

async function fehlerGrund(error: unknown): Promise<string | undefined> {
  try {
    const ctx = (error as { context?: Response }).context;
    if (ctx && typeof ctx.json === "function") {
      const body = (await ctx.json()) as { error?: string };
      return body?.error;
    }
  } catch {
    /* kein JSON */
  }
  return undefined;
}

/** Meldet die Freigabe als Lead (ohne Adresse); prüft die Einwilligung selbst. */
export function trackVorlagenFreigabe(slug: string): void {
  try {
    trackAdConversion("tool_result", { label: `gx-vorlage:${slug}` });
  } catch {
    /* Tracking darf nie stören */
  }
}
