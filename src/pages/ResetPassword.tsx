import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Eye, EyeOff, Check, X, Lock } from "lucide-react";
import Logo from "@/components/Logo";

// Ziel des Passwort-Reset-Links aus der E-Mail. Supabase verarbeitet den Recovery-Token
// in der URL automatisch (detectSessionInUrl) -> hier liegt dann eine Recovery-Session vor.
const ResetPassword = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pwChecks = {
    length: password.length >= 8,
    digit: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
  const pwValid = pwChecks.length && pwChecks.digit && pwChecks.special;

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) { setReady(true); setChecking(false); }
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
      setChecking(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwValid) { setError("Passwort: min. 8 Zeichen, 1 Zahl und 1 Sonderzeichen."); return; }
    setSaving(true);
    setError(null);
    const { error: updErr } = await supabase.auth.updateUser({ password });
    setSaving(false);
    if (updErr) { setError(updErr.message || "Passwort konnte nicht geändert werden."); return; }
    toast.success("Passwort geändert – du bist eingeloggt 🎉");
    navigate("/dashboard");
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
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-accent-blue/10 mb-5">
              <Lock className="h-7 w-7 text-accent-blue" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Neues Passwort setzen</h1>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 shadow-card">
            {checking ? (
              <div className="flex justify-center py-6"><Loader2 className="h-6 w-6 animate-spin text-accent-blue" /></div>
            ) : !ready ? (
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Dieser Link ist ungültig oder abgelaufen. Fordere den Reset bitte erneut an.
                </p>
                <Button onClick={() => navigate("/auth?mode=signin")} size="lg" className="w-full rounded-full bg-gradient-primary text-primary-foreground h-12 font-semibold">
                  Zum Login
                </Button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="newpw">Neues Passwort</Label>
                  <div className="relative">
                    <Input
                      id="newpw"
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mind. 8 Zeichen, 1 Zahl, 1 Sonderzeichen"
                      autoComplete="new-password"
                      required
                      className="pr-10"
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
                  {password.length > 0 && (
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

                {error && (
                  <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
                    <X className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={saving}
                  className="w-full rounded-full bg-gradient-primary text-primary-foreground hover:opacity-95 shadow-glow h-12 font-semibold mt-2"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Passwort speichern"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
