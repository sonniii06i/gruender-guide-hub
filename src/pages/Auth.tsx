import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { trackSignup } from "@/utils/analytics";
import { startGuestCheckout } from "@/utils/guestCheckout";
import { readCartVariant } from "@/lib/cart";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff, Mail, Check } from "lucide-react";
import { KontoRahmen, FormFehler, kontoCta } from "@/components/KontoRahmen";
import { PLANS, formatEurCents } from "@/config/pricing";
import { WERBE_HINWEIS } from "@/lib/werbeHinweis";
import { trackAdConversion } from "@/utils/adConversions";
import { StartAngebotButton } from "@/components/StartAngebotButton";

const Auth = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">(
    params.get("mode") === "signin" ? "signin" : "signup",
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  // Gesetzt nach Signup, wenn E-Mail-Bestätigung nötig ist (keine Session) -> Hinweis statt Loop.
  const [signupEmail, setSignupEmail] = useState<string | null>(null);
  // Sichtbare Inline-Fehlermeldung im Formular (zusätzlich zum Toast).
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const pwChecks = {
    length: password.length >= 8,
    digit: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
  const pwValid = pwChecks.length && pwChecks.digit && pwChecks.special;

  useEffect(() => {
    // Den zweiten Faktor fragt der globale TwoFactorGate ab, bevor diese
    // Seite (oder irgendeine andere) ueberhaupt rendert.
    if (!authLoading && user) navigate("/onboarding", { replace: true });
  }, [user, authLoading, navigate]);

  // signup_started ab der ersten Eingabe, nicht ab Seitenaufruf -- sonst waere
  // jeder Besucher ein Signup-Versuch und time_to_signup wertlos.
  const signupStartedAt = useRef<number | null>(null);
  const markSignupStarted = () => {
    if (signupStartedAt.current !== null || mode !== "signup") return;
    signupStartedAt.current = Date.now();
    trackSignup.started("password");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      if (mode === "signup") {
        // 27.10.2026 (Betreiber: „erstmal ne Menge Sales“): Gratis-Konto ist
        // wieder da. Pay-first (09.08.) hatte 31 Checkout-Abbrueche und 0
        // Kaeufe – kalter Traffic gibt eher eine Mail als 64,99 €. Der direkte
        // Kaufweg (Gast-Checkout → /willkommen) bleibt zusaetzlich bestehen.
        if (!pwValid) throw new Error("Passwort: min. 8 Zeichen, 1 Zahl und 1 Sonderzeichen.");
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/onboarding`,
            data: { first_name: firstName, last_name: lastName },
          },
        });
        if (error) throw error;
        // Bestehende Adresse: Supabase meldet keinen Fehler, aber identities ist leer.
        if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
          setErrorMsg("Diese E-Mail ist bereits registriert. Bitte melde dich an.");
          setPassword("");
          setMode("signin");
          return;
        }
        trackSignup.completed("password", signupStartedAt.current ? Date.now() - signupStartedAt.current : undefined);
        trackAdConversion("signup", { label: "registration_password" });
        if (!data.session) {
          setSignupEmail(email);
          return;
        }
        toast.success("Konto erstellt! Richte jetzt dein Profil ein.");
        navigate("/onboarding");
        return;
      }

      const { data: signIn, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // two_factor_enabled steht in app_metadata: vom Client lesbar,
      // aber nicht setzbar. Die Code-Abfrage zeigt der globale
      // TwoFactorGate (App.tsx) -- er haengt an der Session und haelt deshalb
      // auch nach Reload oder Direktaufruf von /dashboard stand.
      if (!signIn.user?.app_metadata?.two_factor_enabled) {
        toast.success("Willkommen zurück!");
      }
      navigate("/dashboard");
    } catch (err: any) {
      const raw = err?.message ?? "";
      let msg = raw || "Etwas ist schiefgelaufen. Bitte versuch es erneut.";
      if (/invalid login credentials/i.test(raw))
        msg = "E-Mail oder Passwort falsch – oder es gibt noch keinen Account mit dieser E-Mail.";
      else if (/email not confirmed/i.test(raw))
        msg = "Deine E-Mail ist noch nicht bestätigt. Klick den Link in der Bestätigungs-Mail (auch im Spam-Ordner schauen).";
      else if (/rate limit|too many/i.test(raw))
        msg = "Zu viele Versuche. Bitte warte kurz und versuch es erneut.";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    if (!email) {
      setErrorMsg("Bitte gib oben deine E-Mail-Adresse ein, dann schicke ich dir einen Link.");
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) { setErrorMsg(error.message); return; }
    toast.success("Link zum Zurücksetzen gesendet – schau in dein Postfach (auch Spam).");
  };

  // Direkter Kaufweg (Preise/Bundles mit gewaehlter Variante, ausgeloggt):
  // /auth?mode=kauf zeigt Preis + AGB-Hinweis und fuehrt in den Gast-Checkout
  // (pay-first wie seit 09.08.). /auth ohne mode = Gratis-Konto (27.10.).
  if (params.get("mode") === "kauf" && !user) {
    const chosen = readCartVariant() ?? "gruenderx";
    const istBundle = chosen.startsWith("bundle");
    const istJahr = chosen.endsWith("-year");
    const plan = PLANS[chosen as keyof typeof PLANS] ?? PLANS.gruenderx;
    return (
      <KontoRahmen
        kicker="Zugang kaufen"
        title={istBundle ? "Founder-Set: GründerX + AnwaltX" : "GründerX-Zugang"}
        subtitle={`${formatEurCents(plan.grossCents)} ${istJahr ? "im Jahr" : "im Monat"}, ${istJahr ? "jährlich" : "monatlich"} kündbar. Nach der Zahlung legst du dein Konto an.`}
        footer={<>Mit dem Kauf akzeptierst du unsere{" "}
          <Link to="/agb" className="underline underline-offset-4 hover:text-foreground">AGB</Link> und{" "}
          <Link to="/datenschutz" className="underline underline-offset-4 hover:text-foreground">Datenschutzerklärung</Link>.{" "}{WERBE_HINWEIS}</>}
      >
        {errorMsg && <FormFehler>{errorMsg}</FormFehler>}
        <Button size="lg" disabled={loading} className={kontoCta} onClick={async () => {
          setLoading(true); setErrorMsg(null);
          try { await startGuestCheckout(istBundle ? "bundle" : "gruenderx", istJahr ? "year" : "month"); }
          catch (e) { setErrorMsg((e as Error).message || "Checkout fehlgeschlagen"); setLoading(false); }
        }}>
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />Weiterleitung zur Zahlung …</> : "Weiter zur Zahlung"}
        </Button>
        {!istBundle && !istJahr && (
          <div className="mt-4"><StartAngebotButton variant="outline" /></div>
        )}
        <div className="mt-6 border-t border-border pt-5 text-center text-sm text-muted-foreground">
          Erst mal reinschauen? <Link to="/auth" className="font-semibold text-accent-blue hover:underline">Kostenloses Konto</Link>
          {" · "}<Link to="/auth?mode=signin" className="font-semibold text-accent-blue hover:underline">Anmelden</Link>
        </div>
      </KontoRahmen>
    );
  }

  // Nach erfolgreichem Signup mit nötiger E-Mail-Bestätigung: Hinweis + Login-Link statt Loop.
  if (signupEmail) {
    return (
      <KontoRahmen
        icon={Mail}
        tone="accent"
        title="Fast geschafft"
        subtitle={
          <>
            Wir haben dir eine Bestätigungs-E-Mail an <span className="font-semibold text-foreground">{signupEmail}</span> geschickt.
            Klick den Link darin, um deinen Account zu aktivieren. Danach kannst du dich anmelden.
          </>
        }
      >
        <Button
          size="lg"
          onClick={() => { setSignupEmail(null); setPassword(""); setMode("signin"); }}
          className={kontoCta}
        >
          Zum Login
        </Button>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Keine E-Mail erhalten? Prüfe den Spam-Ordner oder{" "}
          <button onClick={() => { setSignupEmail(null); setMode("signup"); }} className="font-semibold text-accent-blue hover:underline">
            erneut registrieren
          </button>.
        </p>
      </KontoRahmen>
    );
  }


  return (
    <KontoRahmen
      kicker={mode === "signup" ? "Kostenlos starten" : "Willkommen zurück"}
      title={mode === "signup" ? "Gründe schlauer mit Felix" : "Bei GründerX anmelden"}
      subtitle={
        mode === "signup"
          ? "Kostenloses Konto in 30 Sekunden – ohne Kreditkarte. Vollen Zugang zu allen Tools, Guides und Felix kannst du danach 7 Tage für 1 € testen."
          : "Schön, dass du wieder da bist. Melde dich mit deiner E-Mail und deinem Passwort an."
      }
      footer={
        mode === "signup" && (
        <>
          Mit der Registrierung akzeptierst du unsere{" "}
          <Link to="/agb" className="underline underline-offset-4 hover:text-foreground">AGB</Link> und{" "}
          <Link to="/datenschutz" className="underline underline-offset-4 hover:text-foreground">Datenschutzerklärung</Link>.{" "}
          {WERBE_HINWEIS}
        </>
        )
      }
    >
      {mode === "signup" && (
        <ul className="mb-5 space-y-2 rounded-xl border border-border bg-secondary/50 p-4 text-sm">
          {[
            "Kostenlos, keine Kreditkarte",
            "Gratis-Tools, Rechner und Fristen-Erinnerungen",
            `Voller Zugang: 7 Tage für 1 €, danach ${formatEurCents(PLANS.gruenderx.grossCents)}/Monat, jederzeit kündbar`,
          ].map((t) => (
            <li key={t} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 27.10.2026: Registrieren legt wieder ein Gratis-Konto an (Name, Mail, Passwort). */}
        {mode === "signup" && (
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="first">Vorname</Label>
              <Input id="first" value={firstName} onChange={(e) => { markSignupStarted(); setFirstName(e.target.value); }} placeholder="Max" required className="h-11 rounded-lg" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="last">Nachname</Label>
              <Input id="last" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Mustermann" required className="h-11 rounded-lg" />
            </div>
          </div>
        )}
        <>
        <div className="space-y-1.5">
          <Label htmlFor="email">E-Mail</Label>
          <Input id="email" type="email" value={email} onChange={(e) => { markSignupStarted(); setEmail(e.target.value); }} placeholder="du@firma.de" required className="h-11 rounded-lg" />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="pw">Passwort</Label>
            {mode === "signin" && (
            <button type="button" onClick={handleForgot} className="text-xs font-medium text-accent-blue hover:underline">
              Passwort vergessen?
            </button>
            )}
          </div>
          <div className="relative">
            <Input
              id="pw"
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === "signup" ? "Neues Passwort" : "Dein Passwort"}
              minLength={8}
              required
              className="h-11 rounded-lg pr-10"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              aria-label={showPw ? "Passwort verbergen" : "Passwort anzeigen"}
              className="absolute inset-y-0 right-2 flex items-center px-1 text-muted-foreground hover:text-foreground"
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {mode === "signup" && (
            <ul className="mt-1 grid gap-1 text-xs">
              {[
                { ok: pwChecks.length, label: "Mindestens 8 Zeichen" },
                { ok: pwChecks.digit, label: "Mindestens 1 Zahl" },
                { ok: pwChecks.special, label: "Mindestens 1 Sonderzeichen" },
              ].map((c) => (
                <li key={c.label} className={c.ok ? "text-success" : "text-muted-foreground"}>{c.ok ? "✓" : "○"} {c.label}</li>
              ))}
            </ul>
          )}
        </div>
        </>

        {errorMsg && <FormFehler>{errorMsg}</FormFehler>}

        <Button type="submit" size="lg" disabled={loading} className={kontoCta}>
          {loading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />{mode === "signup" ? "Konto wird erstellt …" : "Anmeldung läuft …"}</>
          ) : (mode === "signup" ? "Kostenloses Konto erstellen" : "Anmelden")}
        </Button>
      </form>

      {/* Google: Anmelden und (seit 27.10. wieder) Gratis-Registrierung. */}
      <>
      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
        <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">oder</span></div>
      </div>

      <Button
        type="button"
        variant="outline"
        size="lg"
        disabled={loading}
        onClick={async () => {
          // Vor dem Redirect: danach ist die Seite weg und ein hier
          // abgesetztes Event ginge verloren. Seit 27.10. legt Google im
          // Registrier-Modus bewusst ein Gratis-Konto an.
          trackSignup.ssoClicked("google");
          setLoading(true);
          const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: `${window.location.origin}/onboarding` },
          });
          if (error) {
            toast.error(error.message);
            setLoading(false);
          }
        }}
        className="h-11 w-full gap-2 rounded-xl font-semibold"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"/>
        </svg>
        {mode === "signup" ? "Mit Google registrieren" : "Mit Google anmelden"}
      </Button>
      </>

      {mode === "signup" && (
        <div className="mt-5 rounded-xl border border-border bg-secondary/40 p-4">
          <p className="mb-3 text-center text-sm font-semibold">Lieber gleich alles freischalten?</p>
          <StartAngebotButton variant="outline" />
          <button
            type="button"
            onClick={async () => {
              const chosen = readCartVariant() ?? "gruenderx";
              try {
                await startGuestCheckout(chosen.startsWith("bundle") ? "bundle" : "gruenderx", chosen.endsWith("-year") ? "year" : "month");
              } catch (e) { toast.error((e as Error).message || "Checkout fehlgeschlagen"); }
            }}
            className="mt-3 w-full text-center text-xs font-semibold text-accent-blue hover:underline"
          >
            Zugang direkt kaufen – {formatEurCents(PLANS.gruenderx.grossCents)}/Monat
          </button>
        </div>
      )}

      <div className="mt-6 border-t border-border pt-5 text-center text-sm text-muted-foreground">
        {mode === "signup" ? (
          <>Schon einen Account? <button onClick={() => setMode("signin")} className="font-semibold text-accent-blue hover:underline">Anmelden</button></>
        ) : (
          <>Neu hier? <button onClick={() => setMode("signup")} className="font-semibold text-accent-blue hover:underline">Kostenlos registrieren</button></>
        )}
      </div>
    </KontoRahmen>
  );
};

export default Auth;
