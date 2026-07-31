import { trackActivation } from "@/utils/analytics";
import { trackAdConversion } from "@/utils/adConversions";

// "Aha"-Moment-Tracking (lokal, ohne Backend): Der Referral-Prompt darf erst erscheinen,
// NACHDEM der Nutzer einen echten Output bekommen hat — nicht beim Signup und nicht
// als Dauer-Banner. Erst Nutzen, dann Bitte.
const EVENTS_KEY = "gx_value_events";
const DISMISS_KEY = "gx_referral_nudge_dismissed";

/** Ein echter Nutzwert ist entstanden (Felix-Antwort, Tool-Ergebnis, Wizard fertig). */
export function markValueEvent(kind: string): void {
  let isFirst = false;
  try {
    const raw = localStorage.getItem(EVENTS_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    isFirst = list.length === 0;
    list.push(`${kind}:${Date.now()}`);
    localStorage.setItem(EVENTS_KEY, JSON.stringify(list.slice(-20)));
  } catch {
    /* Storage gesperrt (Private Mode) — dann eben kein Nudge. */
  }

  // Der Aha-Moment war bisher nur lokal bekannt und steuerte allein den
  // Referral-Nudge. Damit war "wie viele aktivieren ueberhaupt?" nicht
  // beantwortbar. first_output_generated feuert nur beim ERSTEN Mal --
  // Aktivierung passiert genau einmal, jede Wiederholung waere eine
  // Verfaelschung der Rate.
  if (isFirst) {
    trackActivation.firstOutputGenerated(kind);
    // L4 der Event-Leiter. Nur beim ERSTEN Mal, aus demselben Grund wie oben:
    // Aktivierung passiert genau einmal. Wuerde jedes Tool-Ergebnis eine
    // Conversion melden, optimierten beide Plattformen auf Vielnutzer statt
    // auf Neukunden -- und die Aktivierungsquote, die entscheidet, ob eine
    // Kampagne Kaeufer oder Neugierige einkauft, waere nicht mehr lesbar.
    trackAdConversion("activation", { label: `value_event:${kind}` });
  }
  trackActivation.templateUsed(kind);
}

export function valueEventCount(): number {
  try {
    const raw = localStorage.getItem(EVENTS_KEY);
    return raw ? (JSON.parse(raw) as string[]).length : 0;
  } catch {
    return 0;
  }
}

export function referralNudgeDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

export function dismissReferralNudge(): void {
  try {
    localStorage.setItem(DISMISS_KEY, "1");
  } catch {
    /* egal */
  }
}
