import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Sparkles, Loader2, Eye, EyeOff, Check, X } from "lucide-react";

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
    try {
      if (mode === "signup") {
        if (!pwValid) {
          throw new Error("Passwort: min. 8 Zeichen, 1 Zahl und 1 Sonderzeichen.");
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/onboarding`,
            data: { first_name: firstName, last_name: lastName },
          },
        });
        if (error) throw error;
        toast.success("Account erstellt! Richte jetzt dein Profil ein 🚀");
        navigate("/onboarding");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Willkommen zurück!");
        navigate("/dashboard");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Etwas ist schiefgelaufen.");
    } finally {
      setLoading(false);
    }
  };

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

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full rounded-full bg-gradient-primary text-primary-foreground hover:opacity-95 shadow-glow h-12 font-semibold mt-2"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (mode === "signup" ? "Account erstellen" : "Anmelden")}
              </Button>
            </form>

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
