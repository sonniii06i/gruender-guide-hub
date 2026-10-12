import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff, Check, X, KeyRound, Link2Off } from "lucide-react";
import { KontoRahmen, FormFehler, kontoCta } from "@/components/KontoRahmen";

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
    toast.success("Passwort geändert, du bist angemeldet.");
    navigate("/dashboard");
  };

  if (checking) {
    return (
      <KontoRahmen icon={Loader2} iconSpin tone="neutral" title="Link wird geprüft …" subtitle="Einen Moment bitte, wir prüfen deinen Reset-Link.">
        <div className="space-y-3" aria-hidden="true">
          <div className="h-4 w-28 animate-pulse rounded bg-secondary" />
          <div className="h-11 animate-pulse rounded-lg bg-secondary" />
          <div className="h-11 animate-pulse rounded-xl bg-secondary" />
        </div>
      </KontoRahmen>
    );
  }

  if (!ready) {
    return (
      <KontoRahmen
        icon={Link2Off}
        tone="warning"
        title="Link ungültig oder abgelaufen"
        subtitle="Dieser Link ist ungültig oder abgelaufen. Fordere den Reset bitte erneut an: auf der Anmeldeseite unter „Passwort vergessen?“."
      >
        <Button onClick={() => navigate("/auth?mode=signin")} size="lg" className={kontoCta}>
          Zum Login
        </Button>
      </KontoRahmen>
    );
  }

  return (
    <KontoRahmen
      icon={KeyRound}
      title="Neues Passwort setzen"
      subtitle="Wähle ein neues Passwort für dein GründerX-Konto. Danach bist du direkt angemeldet."
    >
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="newpw">Neues Passwort</Label>
          <div className="relative">
            <Input
              id="newpw"
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Dein neues Passwort"
              autoComplete="new-password"
              required
              className="h-11 rounded-lg pr-10"
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
          <ul className="mt-2 grid gap-1 text-xs" aria-live="polite">
            {[
              { ok: pwChecks.length, label: "Mindestens 8 Zeichen" },
              { ok: pwChecks.digit, label: "Mindestens 1 Zahl" },
              { ok: pwChecks.special, label: "Mindestens 1 Sonderzeichen" },
            ].map((c) => (
              <li key={c.label} className={`flex items-center gap-1.5 ${c.ok ? "text-success" : "text-muted-foreground"}`}>
                {c.ok ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <X className="h-3.5 w-3.5" aria-hidden="true" />}
                {c.label}
              </li>
            ))}
          </ul>
        </div>

        {error && <FormFehler>{error}</FormFehler>}

        <Button type="submit" size="lg" disabled={saving} className={kontoCta}>
          {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />Passwort wird gespeichert …</> : "Passwort speichern"}
        </Button>
      </form>
    </KontoRahmen>
  );
};

export default ResetPassword;
