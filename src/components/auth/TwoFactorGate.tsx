import { ReactNode, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { needsSecondFactor, sessionLoginMs } from "@/lib/twoFactorGate";
import { TwoFactorPrompt } from "./TwoFactorPrompt";

// Seiten, die ohne zweiten Faktor erreichbar bleiben muessen.
// /reset-password: Wer das Passwort per Mail-Link zuruecksetzt, kommt danach
// trotzdem nur mit zweitem Faktor in die App.
const AUSNAHMEN = ["/reset-password"];

/**
 * Riegel fuer den zweiten Faktor -- unabhaengig von der Route.
 *
 * Solange die aktuelle Session den zweiten Faktor schuldet (siehe
 * needsSecondFactor), wird statt des Inhalts die Code-Abfrage gezeigt.
 * Reload, Direktaufruf von /dashboard oder Google-Anmeldung aendern daran
 * nichts, weil die Pruefung an der Session haengt.
 */
export const TwoFactorGate = ({ children }: { children: ReactNode }) => {
  const { session, user, signOut } = useAuth();
  const { pathname } = useLocation();
  // Merkt sich die bestaetigte Session, falls refreshSession() scheitert und
  // die neuen app_metadata deshalb noch nicht im Client angekommen sind.
  const [bestaetigtFuer, setBestaetigtFuer] = useState<string | null>(null);

  const gateUser = session?.user ?? user;
  const token = session?.access_token ?? null;
  const sessionKey = gateUser ? `${gateUser.id}:${sessionLoginMs(token) ?? ""}` : null;

  // Aktivierungszeitpunkt (user_two_factor.confirmed_at) je Session. Eine
  // Session, die vor dem Einschalten begann, ist die, in der der Nutzer 2FA
  // gerade mit gueltigem Code aktiviert hat -- sie wird nicht erneut gefragt.
  const [aktivierung, setAktivierung] = useState<{ key: string; am: string | null } | null>(null);

  const schuldetOhneAktivierung =
    !!gateUser &&
    sessionKey !== bestaetigtFuer &&
    !AUSNAHMEN.includes(pathname) &&
    needsSecondFactor(gateUser, token);

  const aktivierungGeladen = aktivierung?.key === sessionKey;

  // Session, die schon ohne Riegel lief (2FA war noch aus). Waehrend der
  // Pruefung bleibt ihr Inhalt stehen, statt beim Token-Refresh nach dem
  // Einschalten kurz auszuhaengen (offene Formulare verloeren sonst ihren Stand).
  const zugelassenFuer = useRef<string | null>(null);

  useEffect(() => {
    if (!schuldetOhneAktivierung || !sessionKey || aktivierungGeladen) return;
    let abgebrochen = false;
    supabase.functions
      .invoke("check-2fa-status")
      .then(({ data, error }) => {
        if (abgebrochen) return;
        const am = !error && typeof data?.confirmed_at === "string" ? data.confirmed_at : null;
        setAktivierung({ key: sessionKey, am });
      })
      .catch(() => {
        // Ohne Antwort: nachfragen statt durchwinken.
        if (!abgebrochen) setAktivierung({ key: sessionKey, am: null });
      });
    return () => { abgebrochen = true; };
  }, [schuldetOhneAktivierung, sessionKey, aktivierungGeladen]);

  if (!schuldetOhneAktivierung) {
    zugelassenFuer.current = sessionKey;
    return <>{children}</>;
  }

  // Inhalt erst zeigen, wenn klar ist, ob die Session vor der Aktivierung lag.
  if (!aktivierungGeladen) {
    if (sessionKey !== null && zugelassenFuer.current === sessionKey) return <>{children}</>;
    return (
      <div className="flex min-h-[50vh] items-center justify-center" aria-busy="true">
        <span className="sr-only">Anmeldung wird geprüft…</span>
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground" />
      </div>
    );
  }

  if (!needsSecondFactor(gateUser, token, aktivierung?.am)) return <>{children}</>;

  return (
    <TwoFactorPrompt
      onVerified={async () => {
        setBestaetigtFuer(sessionKey);
        // Holt die neuen app_metadata (two_factor_verified_at) in den Client.
        try { await supabase.auth.refreshSession(); } catch { /* lokal bestaetigt */ }
      }}
      onCancel={async () => {
        // Ohne zweiten Faktor darf die Session nicht bestehen bleiben.
        await signOut();
      }}
    />
  );
};
