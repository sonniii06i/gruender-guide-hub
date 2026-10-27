import { useState } from "react";
import { useLocation } from "react-router-dom";
import { MailWarning, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

/**
 * Hinweis „Bitte bestätige deine Mail“ (27.10.2026) für eingeloggte Nutzer ohne
 * Adressnachweis. Gleiche Regel wie serverseitig (_shared/mailBesitz.ts); der
 * Server entscheidet ohnehin selbst — dieser Hinweis ist nur Komfort.
 * Kein Massenversand: Die Mail geht erst, wenn der Nutzer hier klickt.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

export function mailVerifiziertClient(user: Any): boolean {
  if (!user?.email) return false;
  const am = user.app_metadata ?? {};
  const aktuell = String(user.email).trim().toLowerCase();
  if (am.mail_verifiziert === true) return String(am.mail_verifiziert_email ?? "") === aktuell;
  if (am.mail_verifiziert === false) return false;
  const ids: Any[] = Array.isArray(user.identities) ? user.identities : [];
  return ids.some((i) => String(i?.provider ?? "email") !== "email" &&
    String(i?.identity_data?.email ?? "").trim().toLowerCase() === aktuell);
}

const OHNE = ["/mail-bestaetigen", "/login", "/auth", "/willkommen"];

export function MailBestaetigenHinweis() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [zu, setZu] = useState(() => {
    try { return sessionStorage.getItem("mailHinweisZu") === "1"; } catch { return false; }
  });
  const [status, setStatus] = useState<"" | "laeuft" | "gesendet" | "zu_frueh" | "fehler">("");

  if (!user || zu || mailVerifiziertClient(user) || OHNE.some((p) => pathname.startsWith(p))) return null;

  const senden = async () => {
    setStatus("laeuft");
    const { data, error } = await supabase.functions.invoke("mail-verifizieren", { body: { aktion: "senden" } });
    if (data?.schon) { setZu(true); return; }
    setStatus(data?.ok ? "gesendet" : (data?.error === "zu_frueh" || (error as Any)?.context?.status === 429) ? "zu_frueh" : "fehler");
  };
  const schliessen = () => {
    try { sessionStorage.setItem("mailHinweisZu", "1"); } catch { /* egal */ }
    setZu(true);
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-lg border border-amber-300 bg-amber-50 p-4 shadow-lg dark:border-amber-700 dark:bg-amber-950" role="status">
      <div className="flex items-start gap-3">
        <MailWarning className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <div className="flex-1 space-y-2 text-sm">
          <p className="font-medium">Bitte bestätige deine E-Mail-Adresse</p>
          <p className="text-muted-foreground">
            {status === "gesendet" ? `Wir haben dir einen Link an ${user.email} geschickt.`
              : status === "zu_frueh" ? "Gerade erst gesendet – schau in dein Postfach (auch Spam)."
              : status === "fehler" ? "Das hat nicht geklappt. Versuch es gleich noch einmal."
              : "Erst danach verbinden wir dein Konto mit bestehenden Käufen oder einem Partnerkonto zu dieser Adresse."}
          </p>
          {status !== "gesendet" && (
            <Button size="sm" onClick={senden} disabled={status === "laeuft"}>
              {status === "laeuft" ? "Wird gesendet …" : "Mail erneut senden"}
            </Button>
          )}
        </div>
        <button onClick={schliessen} aria-label="Hinweis schließen" className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
