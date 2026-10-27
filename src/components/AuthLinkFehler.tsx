import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// 27.10.2026: Abgelaufene oder schon benutzte Auth-Links (Bestätigung, Passwort-Reset,
// Magic Link) leiten Supabase mit #error_code=… zurück. Bisher landete man ohne
// Hinweis auf der Startseite/Anmeldung. Diese Leiste erklärt es und bietet einen neuen Link an.
const TEXTE: Record<string, string> = {
  otp_expired: "Dieser Link ist abgelaufen oder wurde schon benutzt.",
  access_denied: "Dieser Link ist ungültig oder abgelaufen.",
};

export function AuthLinkFehler() {
  const [fehler, setFehler] = useState<string | null>(null);
  const [mail, setMail] = useState("");
  const [status, setStatus] = useState<"" | "sende" | "ok" | "fehler">("");

  useEffect(() => {
    const roh = (window.location.hash || "").replace(/^#/, "") || window.location.search.replace(/^\?/, "");
    const p = new URLSearchParams(roh);
    const code = p.get("error_code") || (p.get("error") ? "access_denied" : "");
    if (!code) return;
    setFehler(TEXTE[code] ?? TEXTE.access_denied);
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  if (!fehler) return null;

  const neuSenden = async () => {
    const adresse = mail.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(adresse)) { setStatus("fehler"); return; }
    setStatus("sende");
    const { error } = await supabase.auth.resend({
      type: "signup", email: adresse, options: { emailRedirectTo: `${window.location.origin}/onboarding` },
    });
    setStatus(error ? "fehler" : "ok");
  };

  return (
    <div role="alert" className="fixed inset-x-0 top-0 z-[100] flex justify-center p-3">
      <div className="w-full max-w-lg rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950 shadow-lg">
        <p className="font-semibold">{fehler}</p>
        <p className="mt-1">Bestätigungslinks gelten 24 Stunden und nur einmal. Hol dir einfach einen neuen:</p>
        {status === "ok" ? (
          <p className="mt-3 font-medium">Wenn es zu dieser Adresse ein unbestätigtes Konto gibt, ist ein neuer Link unterwegs. Schau auch im Spam-Ordner nach.</p>
        ) : (
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} placeholder="deine@mail.de"
              className="min-w-0 flex-1 rounded-md border border-amber-300 bg-white px-3 py-2" aria-label="E-Mail-Adresse" />
            <button type="button" onClick={neuSenden} disabled={status === "sende"}
              className="rounded-md bg-amber-900 px-4 py-2 font-semibold text-white disabled:opacity-60">
              {status === "sende" ? "Sende …" : "Bestätigungslink neu senden"}
            </button>
          </div>
        )}
        {status === "fehler" && <p className="mt-2 text-red-700">Das hat nicht geklappt. Bitte prüfe die Adresse und versuch es in einer Minute erneut.</p>}
        <p className="mt-3">Passwort-Link abgelaufen? <a className="underline" href="/auth?mode=signin">Hier neu anfordern</a>. · <button type="button" className="underline" onClick={() => setFehler(null)}>Schließen</button></p>
        <p className="mt-1 text-xs text-amber-800">GründerX</p>
      </div>
    </div>
  );
}
