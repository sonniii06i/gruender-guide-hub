// Auswertung der Antwort von supabase/functions/delete-account.
//
// supabase.functions.invoke liefert bei Nicht-2xx nur einen FunctionsHttpError;
// der eigentliche JSON-Körper (Meldung, Grund) steckt in error.context (Response).
// Ohne Auslesen sah der Nutzer bei einem laufenden Abo nur
// "Löschen fehlgeschlagen" und wusste nicht, dass er erst kündigen muss.

export type DeleteAccountOutcome =
  | { kind: "deleted" }
  /** Laufendes Stripe-Abo (active/trialing/past_due): erst im Kundenportal kündigen. */
  | { kind: "active_subscription"; message: string }
  /** Abo-Prüfung nicht möglich, Teil-Löschung oder sonstiger Fehler: Konto besteht weiter. */
  | { kind: "error"; message: string };

const FALLBACK = "Löschen fehlgeschlagen. Bitte versuche es erneut oder kontaktiere den Support.";

type Body = { ok?: boolean; error?: unknown; message?: unknown } | null | undefined;

async function readErrorBody(error: unknown): Promise<Body> {
  const ctx = (error as { context?: unknown } | null)?.context;
  if (ctx && typeof (ctx as Response).json === "function") {
    try {
      // clone(): falls der Körper anderswo schon gelesen wird.
      const res = typeof (ctx as Response).clone === "function" ? (ctx as Response).clone() : (ctx as Response);
      return (await res.json()) as Body;
    } catch {
      return null;
    }
  }
  return null;
}

export async function interpretDeleteAccountResult(res: { data: unknown; error: unknown }): Promise<DeleteAccountOutcome> {
  const body: Body = res.error ? await readErrorBody(res.error) : (res.data as Body);
  const message = typeof body?.message === "string" && body.message.trim() ? body.message : FALLBACK;

  if (body?.error === "active_subscription") return { kind: "active_subscription", message };
  if (!res.error && body?.ok === true && !body?.error) return { kind: "deleted" };
  return { kind: "error", message };
}
