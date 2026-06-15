import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Sparkles, Loader2, Eye, EyeOff, Check, X, Mail } from "lucide-react";

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
    if (!authLoading && user) navigate("/onboarding", { replace: true });
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      if (mode === "signup") {
        if (!pwValid) {
          throw new Error("Passwort: min. 8 Zeichen, 1 Zahl und 1 Sonderzeichen.");
        }
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/onboarding`,
            data: { first_name: firstName, last_name: lastName },
          },
        });
        if (error) throw error;
        // Supabase verschleiert bestehende E-Mails (kein Enumeration-Leak): bei bereits
        // registrierter Adresse kommt KEIN Fehler, aber data.user.identities ist leer.
        // -> klare Meldung + auf Login leiten statt erneut "Bestätigung gesendet" zu faken.
        if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
          const m = "Diese E-Mail ist bereits registriert. Bitte melde dich an.";
          setErrorMsg(m);
          toast.error(m);
          setPassword("");
          setMode("signin");
          return;
        }
        // Bei aktiver E-Mail-Bestätigung gibt es KEINE Session -> nicht zu /onboarding
        // navigieren (würde zurück auf /auth loopen), sondern Bestätigungs-Hinweis zeigen.
        if (!data.session) {
          setSignupEmail(email);
          return;
        }
        toast.success("Account erstellt! Richte jetzt dein Profil ein 🚀");
        navigate("/onboarding");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Willkommen zurück!");
        navigate("/dashboard");
      }
    } catch (err: any) {
      const raw = err?.message ?? "";
      let msg = raw || "Etwas ist schiefgelaufen. Bitte versuch es erneut.";
      if (/invalid login credentials/i.test(raw))
        msg = "E-Mail oder Passwort falsch – oder es gibt noch keinen Account mit dieser E-Mail. Bitte prüfe deine Eingabe oder registriere dich.";
      else if (/email not confirmed/i.test(raw))
        msg = "Deine E-Mail ist noch nicht bestätigt. Klick den Link in der Bestätigungs-Mail (auch im Spam-Ordner schauen).";
      else if (/user already registered/i.test(raw))
        msg = "Diese E-Mail ist bereits registriert. Bitte melde dich an.";
      else if (/rate limit|too many/i.test(raw))
        msg = "Zu viele Versuche. Bitte warte kurz und versuch es erneut.";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Nach erfolgreichem Signup mit nötiger E-Mail-Bestätigung: Hinweis + Login-Link statt Loop.
  if (signupEmail) {
    return (
      <div className="min-h-screen bg-hero flex flex-col">
        <div className="container max-w-6xl py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Zurück zur Startseite
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center px-4 pb-16">
          <div className="w-full max-w-md text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-accent-blue/10 mb-6">
              <Mail className="h-7 w-7 text-accent-blue" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Fast geschafft!</h1>
            <p className="mt-3 text-muted-foreground">
              Wir haben dir eine Bestätigungs-E-Mail an <span className="font-semibold text-foreground">{signupEmail}</span> geschickt.
              Klick den Link darin, um deinen Account zu aktivieren – danach kannst du dich einloggen.
            </p>
            <div className="mt-8 bg-card border border-border rounded-3xl p-8 shadow-card">
              <p className="text-sm text-muted-foreground mb-4">E-Mail bestätigt?</p>
              <Button
                size="lg"
                onClick={() => { setSignupEmail(null); setPassword(""); setMode("signin"); }}
                className="w-full rounded-full bg-gradient-primary text-primary-foreground hover:opacity-95 shadow-glow h-12 font-semibold"
              >
                Zum Login
              </Button>
              <p className="mt-4 text-xs text-muted-foreground">
                Keine E-Mail erhalten? Prüfe den Spam-Ordner oder{" "}
                <button onClick={() => { setSignupEmail(null); setMode("signup"); }} className="text-accent-blue font-semibold hover:underline">
                  erneut registrieren
                </button>.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero flex flex-col">
      <div className="container max-w-6xl py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Zurück zur Startseite
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-blue/10 border border-accent-blue/20 px-3 py-1 text-xs font-semibold text-accent-blue mb-5">
              <Sparkles className="h-3.5 w-3.5" /> {mode === "signup" ? "Kostenlos starten" : "Willkommen zurück"}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {mode === "signup" ? "Gründe schlauer mit Felix." : "Anmelden bei GründerX"}
            </h1>
            <p className="mt-3 text-muted-foreground">
              {mode === "signup"
                ? "Erstelle deinen Account in 30 Sekunden – keine Kreditkarte nötig."
                : "Schön dich wiederzusehen."}
            </p>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 shadow-card">
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="first">Vorname</Label>
                    <Input id="first" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Max" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="last">Nachname</Label>
                    <Input id="last" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Mustermann" required />
                  </div>
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="email">E-Mail</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="du@firma.de" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pw">Passwort</Label>
                <div className="relative">
                  <Input
                    id="pw"
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mind. 8 Zeichen, 1 Zahl, 1 Sonderzeichen"
                    minLength={8}
                    required
                    className="pr-10"
                    autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    aria-label={showPw ? "Passwort verbergen" : "Passwort anzeigen"}
                    className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground"
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {mode === "signup" && password.length > 0 && (
                  <ul className="mt-2 space-y-1 text-xs">
                    {[
                      { ok: pwChecks.length, label: "Mindestens 8 Zeichen" },
                      { ok: pwChecks.digit, label: "Mindestens 1 Zahl" },
                      { ok: pwChecks.special, label: "Mindestens 1 Sonderzeichen" },
                    ].map((c) => (
                      <li key={c.label} className={`flex items-center gap-1.5 ${c.ok ? "text-success" : "text-muted-foreground"}`}>
                        {c.ok ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                        {c.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {errorMsg && (
                <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
                  <X className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full rounded-full bg-gradient-primary text-primary-foreground hover:opacity-95 shadow-glow h-12 font-semibold mt-2"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (mode === "signup" ? "Account erstellen" : "Anmelden")}
              </Button>
            </form>

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
              className="w-full rounded-full h-12 font-semibold gap-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"/>
              </svg>
              Mit Google {mode === "signup" ? "registrieren" : "anmelden"}
            </Button>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {mode === "signup" ? (
                <>Schon einen Account? <button onClick={() => setMode("signin")} className="text-accent-blue font-semibold hover:underline">Anmelden</button></>
              ) : (
                <>Neu hier? <button onClick={() => setMode("signup")} className="text-accent-blue font-semibold hover:underline">Kostenlos registrieren</button></>
              )}
            </div>
          </div>

          <p className="mt-6 text-xs text-muted-foreground text-center">
            Mit der Registrierung akzeptierst du unsere <Link to="/agb" className="underline">AGB</Link> und <Link to="/datenschutz" className="underline">Datenschutzerklärung</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
