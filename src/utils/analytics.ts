// First-Party-Produktanalytik für GründerX.
//
// Schwester von src/utils/analytics.ts in AnwaltX — gleiche Event-Namen und
// gleiches Schema, damit beide Produkte mit derselben Auswertung lesbar sind.
// Unterschied: GründerX hat keine attribution.ts, der First-Touch wird deshalb
// hier erfasst.
//
// Ergänzt das Bestehende, ersetzt es nicht: useTrackPageview zählt weiter
// Seitenaufrufe, valueEvent.ts steuert weiter den Referral-Nudge.
//
// Grundregel: Tracking darf nie das Produkt kaputtmachen. Alles fire-and-forget.

import { supabase } from "@/integrations/supabase/client";

export type EventLayer =
  | "traffic"
  | "signup"
  | "activation"
  | "retention"
  | "monetization"
  | "referral"
  | "content"
  | "experiment";

const ANON_KEY = "gx_anon_id";
const SESSION_KEY = "gx_session_id";
const SESSION_TS_KEY = "gx_session_ts";
const FIRST_TOUCH_KEY = "gx_first_touch";
const SELF_REPORTED_KEY = "gx_self_reported_source";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

interface FirstTouch {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  ttclid?: string;
  referrer?: string;
  landing_path?: string;
}

function uuid(): string {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  } catch {
    /* Fallback unten */
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

function get(store: "local" | "session", key: string): string | null {
  try {
    return (store === "local" ? localStorage : sessionStorage).getItem(key);
  } catch {
    return null;
  }
}

function set(store: "local" | "session", key: string, value: string): void {
  try {
    (store === "local" ? localStorage : sessionStorage).setItem(key, value);
  } catch {
    /* Private Mode — dann eben nicht zuordenbar */
  }
}

export function getAnonId(): string {
  let id = get("local", ANON_KEY);
  if (!id || id.length < 8) {
    id = uuid();
    set("local", ANON_KEY, id);
  }
  return id;
}

export function getSessionId(): string {
  const now = Date.now();
  const last = Number(get("session", SESSION_TS_KEY) || 0);
  let id = get("session", SESSION_KEY);
  if (!id || id.length < 8 || !last || now - last > SESSION_TIMEOUT_MS) {
    id = uuid();
    set("session", SESSION_KEY, id);
  }
  set("session", SESSION_TS_KEY, String(now));
  return id;
}

// First-Touch wird EINMAL festgeschrieben und nie überschrieben. Interne
// <Link>-Navigation verliert die Query-Parameter — ohne diese Sperre wäre nach
// dem ersten Klick jede Anmeldung "direct".
export function captureFirstTouch(): void {
  if (typeof window === "undefined") return;
  if (get("local", FIRST_TOUCH_KEY)) return;

  const p = new URLSearchParams(window.location.search);
  const clean = (v: string | null) => (v ? v.trim().slice(0, 200) : undefined);
  const ref = document.referrer || "";
  const externalRef = ref && !ref.includes(window.location.host) ? ref.slice(0, 200) : undefined;

  const touch: FirstTouch = {
    utm_source: clean(p.get("utm_source"))?.toLowerCase(),
    utm_medium: clean(p.get("utm_medium"))?.toLowerCase(),
    utm_campaign: clean(p.get("utm_campaign"))?.toLowerCase(),
    utm_content: clean(p.get("utm_content"))?.toLowerCase(),
    gclid: clean(p.get("gclid")),
    fbclid: clean(p.get("fbclid")),
    ttclid: clean(p.get("ttclid")),
    referrer: externalRef,
    landing_path: window.location.pathname.slice(0, 300),
  };

  try {
    set("local", FIRST_TOUCH_KEY, JSON.stringify(touch));
  } catch {
    /* egal */
  }
}

function readFirstTouch(): FirstTouch | null {
  const raw = get("local", FIRST_TOUCH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as FirstTouch;
  } catch {
    return null;
  }
}

// Klick-ID schlägt utm_medium: sie ist fälschungssicherer.
function deriveChannel(t: FirstTouch | null): string | undefined {
  if (!t) return undefined;
  if (t.gclid) return "google_ads";
  if (t.fbclid) return "meta_ads";
  if (t.ttclid) return "tiktok_ads";

  const m = (t.utm_medium || "").toLowerCase();
  if (m) {
    if (/cpc|ppc|paid|ads?/.test(m)) return "paid";
    if (/email|newsletter/.test(m)) return "email";
    if (/social/.test(m)) return "social";
    if (/affiliate|partner/.test(m)) return "affiliate";
    if (/referral/.test(m)) return "referral";
    if (/organic/.test(m)) return "organic";
    return m.slice(0, 40);
  }
  if (t.utm_source) return `utm:${t.utm_source}`.slice(0, 40);

  const r = t.referrer || "";
  if (r) {
    if (/google\.|bing\.|duckduckgo|ecosia|yahoo\./i.test(r)) return "organic_search";
    if (/instagram|facebook|tiktok|linkedin|youtube|x\.com|twitter/i.test(r)) return "organic_social";
    return "referral";
  }
  return "direct";
}

export function setSelfReportedSource(value: string): void {
  const v = (value || "").trim().slice(0, 120);
  if (v) set("local", SELF_REPORTED_KEY, v);
}

export function track(
  layer: EventLayer,
  eventName: string,
  props: Record<string, unknown> = {},
  options: { experimentId?: string; variantId?: string } = {},
): void {
  if (typeof window === "undefined") return;

  void (async () => {
    try {
      const t = readFirstTouch();
      const { data } = await supabase.auth.getSession();

      const row: Record<string, unknown> = {
        event_name: eventName.slice(0, 64),
        layer,
        user_id: data?.session?.user?.id ?? null,
        anon_id: getAnonId(),
        session_id: getSessionId(),
        path: window.location.pathname.slice(0, 300),
        utm_source: t?.utm_source ?? null,
        utm_medium: t?.utm_medium ?? null,
        utm_campaign: t?.utm_campaign ?? null,
        utm_content: t?.utm_content ?? null,
        referrer: t?.referrer ?? null,
        landing_page: t?.landing_path ?? null,
        first_touch_channel: deriveChannel(t) ?? null,
        self_reported_source: get("local", SELF_REPORTED_KEY),
        experiment_id: options.experimentId ?? null,
        variant_id: options.variantId ?? null,
        props: props ?? {},
      };

      const { error } = await (supabase as any).from("analytics_events").insert(row);
      if (!error) return;

      // Rettungsversuch ohne user_id -- siehe ausfuehrliche Begruendung in
      // der Schwesterdatei von AnwaltX. Kurz: Die RLS-Regel
      // `WITH CHECK (user_id IS NULL OR user_id = auth.uid())` verwirft die
      // Zeile still, wenn PostgREST kein gueltiges JWT sieht (auth.uid() ist
      // dann NULL, der Vergleich ergibt NULL statt false). In AnwaltX hat das
      // dazu gefuehrt, dass bei 34 Nutzern NIE ein signup_completed ankam --
      // also genau das Ereignis, auf das die Kampagnen optimieren.
      if (row.user_id) {
        await (supabase as any).from("analytics_events").insert({
          ...row,
          user_id: null,
          props: { ...(props ?? {}), uid: row.user_id, rls_fallback: true },
        });
      }
    } catch {
      /* Analytik darf nie eskalieren */
    }
  })();
}

/* Event-Namen stehen EINMAL hier, nicht als Strings über die Codebase verstreut. */

export const trackTraffic = {
  sessionStart: (props?: Record<string, unknown>) => track("traffic", "session_start", props),
};

export const trackSignup = {
  started: (method?: string) => track("signup", "signup_started", { method }),
  ssoClicked: (provider: string) => track("signup", "sso_clicked", { provider }),
  formError: (field: string, message?: string) =>
    track("signup", "form_error", { field, message: message?.slice(0, 200) }),
  dropoff: (step: string) => track("signup", "dropoff_step", { step }),
  completed: (method: string, timeToSignupMs?: number) =>
    track("signup", "signup_completed", { method, time_to_signup_ms: timeToSignupMs }),
};

export const trackActivation = {
  workspaceCreated: () => track("activation", "workspace_created"),
  templateUsed: (template: string) => track("activation", "template_used", { template }),
  integrationConnected: (integration: string) =>
    track("activation", "integration_connected", { integration }),
  firstOutputGenerated: (kind: string) => track("activation", "first_output_generated", { kind }),
  inviteSentAfterActivation: () => track("activation", "invite_sent_after_activation"),
};

export const trackRetention = {
  returned: (day: 1 | 7) => track("retention", `day${day}_returned`),
  weeklyActive: () => track("retention", "weekly_active"),
  featureRepeatUsage: (feature: string, count: number) =>
    track("retention", "feature_repeat_usage", { feature, count }),
};

export const trackMonetization = {
  trialStarted: (plan: string) => track("monetization", "trial_started", { plan }),
  planViewed: (plan: string) => track("monetization", "plan_viewed", { plan }),
  checkoutStarted: (plan: string, priceCents?: number) =>
    track("monetization", "checkout_started", { plan, price_cents: priceCents }),
  subscriptionStarted: (plan: string, priceCents?: number) =>
    track("monetization", "subscription_started", { plan, price_cents: priceCents }),
  cancelRequested: (plan: string) => track("monetization", "cancel_requested", { plan }),
};

export const trackReferral = {
  promptSeen: (placement: string) => track("referral", "invite_prompt_seen", { placement }),
  sent: (channel: string) => track("referral", "invite_sent", { channel }),
  referredSignup: (code: string) => track("referral", "referred_signup", { code }),
};

export const trackContent = {
  viewed: (slug: string, kind: string) => track("content", "content_viewed", { slug, kind }),
  scroll50: (slug: string) => track("content", "scroll_50", { slug }),
  ctaClicked: (slug: string, cta: string) => track("content", "cta_clicked", { slug, cta }),
};

export const trackExperiment = {
  exposure: (experimentId: string, variantId: string, eligible: boolean) =>
    track(
      "experiment",
      "exposure",
      { eligibility_flag: eligible, exposure_timestamp: new Date().toISOString() },
      { experimentId, variantId },
    ),
};
