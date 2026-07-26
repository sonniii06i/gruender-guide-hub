// "Aha"-Moment-Tracking (lokal, ohne Backend): Der Referral-Prompt darf erst erscheinen,
// NACHDEM der Nutzer einen echten Output bekommen hat — nicht beim Signup und nicht
// als Dauer-Banner. Erst Nutzen, dann Bitte.
const EVENTS_KEY = "gx_value_events";
const DISMISS_KEY = "gx_referral_nudge_dismissed";

/** Ein echter Nutzwert ist entstanden (Felix-Antwort, Tool-Ergebnis, Wizard fertig). */
export function markValueEvent(kind: string): void {
  try {
    const raw = localStorage.getItem(EVENTS_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    list.push(`${kind}:${Date.now()}`);
    localStorage.setItem(EVENTS_KEY, JSON.stringify(list.slice(-20)));
  } catch {
    /* Storage gesperrt (Private Mode) — dann eben kein Nudge. */
  }
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
