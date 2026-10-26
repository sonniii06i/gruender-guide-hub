import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

// Info-Mails „Steuerfristen & Neuigkeiten“ (26.10.2026). Liste und Double-Opt-in liegen beim
// Mail-Agent im HQ (POST /px/mail/anmelden, marke=gruenderx); versendet wird über hq-send.
// Eigene Liste neben Tipps-Strecke (tool-gebunden) und Chancen-Alarm (Förderchancen).
const ENDPUNKT = "https://arbitragex.de/px/mail/anmelden";
export const OPTIN_TEXT =
  "Ja, schickt mir Erinnerungen an Steuerfristen (z. B. USt-Voranmeldung) und Neuigkeiten für Gründer per E-Mail " +
  "(höchstens zwei pro Woche, mit Messung von Öffnungen und Klicks). Abmelden geht jederzeit mit einem Klick.";

type Zustand = "bereit" | "sendet" | "ok" | "fehler";

export const NewsletterOptin = ({ kompakt = false }: { kompakt?: boolean }) => {
  const id = useId();
  const [zustand, setZustand] = useState<Zustand>("bereit");

  const absenden = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setZustand("sendet");
    try {
      const r = await fetch(ENDPUNKT, {
        method: "POST",
        body: new URLSearchParams({
          marke: "gruenderx",
          email: String(fd.get("email") ?? "").trim(),
          website: String(fd.get("website") ?? ""),
        }),
      });
      const d = (await r.json().catch(() => null)) as { ok?: boolean } | null;
      setZustand(r.ok && d?.ok ? "ok" : "fehler");
    } catch {
      setZustand("fehler");
    }
  };

  return (
    <section
      aria-labelledby={`${id}-t`}
      className={kompakt ? "" : "mt-14 rounded-2xl border border-border bg-card p-6 shadow-card md:p-7"}
    >
      <h2 id={`${id}-t`} className={kompakt ? "mb-2 text-sm font-semibold text-foreground" : "text-lg font-semibold tracking-tight"}>
        Steuerfristen &amp; Neuigkeiten für Gründer
      </h2>
      <p className={`text-sm leading-relaxed text-muted-foreground ${kompakt ? "mb-3 max-w-md" : "mb-4 mt-1"}`}>
        Kurze Mail, bevor eine Frist abläuft oder sich für Gründer etwas ändert – höchstens zwei pro Woche, meist seltener.
      </p>
      {zustand === "ok" ? (
        <p role="status" className="text-sm font-medium text-foreground">
          Fast geschafft: Bitte bestätige die Mail in deinem Postfach. Ohne Bestätigung schicken wir dir nichts.
        </p>
      ) : (
        <form onSubmit={absenden} className="max-w-md space-y-3">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <div className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor={`${id}-m`} className="sr-only">E-Mail-Adresse</label>
            <input
              id={`${id}-m`}
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="deine@mail.de"
              className="h-10 min-w-0 flex-1 rounded-md border border-input bg-background px-3 text-sm"
            />
            <Button type="submit" disabled={zustand === "sendet"} className="h-10">
              {zustand === "sendet" ? "Sende …" : "Anmelden"}
            </Button>
          </div>
          <label className="flex items-start gap-2 text-xs leading-snug text-muted-foreground">
            <input type="checkbox" name="einwilligung" required className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              {OPTIN_TEXT} Details in der{" "}
              <a href="/datenschutz#newsletter" className="underline hover:text-foreground">Datenschutzerklärung</a>.
            </span>
          </label>
          <p role="status" aria-live="polite" className="text-sm text-destructive">
            {zustand === "fehler" ? "Das hat nicht geklappt. Bitte prüfe die Adresse und versuche es noch einmal." : ""}
          </p>
        </form>
      )}
    </section>
  );
};
