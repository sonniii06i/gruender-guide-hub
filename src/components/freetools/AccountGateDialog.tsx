import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Lock, Mail, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";

interface AccountGateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUnlocked: () => void;
  documentName: string;
  prefill?: { firstName?: string; lastName?: string };
}

// Gate am Ende des Free-Tool-Funnels: Konto erstellen (KEIN Abo) → Dokument frei.
// GründerX-Auth: direkt supabase.auth.signUp (Auto-Login, keine Mail-Bestätigung).
export function AccountGateDialog({
  open,
  onOpenChange,
  onUnlocked,
  documentName,
  prefill,
}: AccountGateDialogProps) {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  // Nach Signup mit nötiger E-Mail-Bestätigung: Hinweis im Dialog statt Sackgasse.
  const [confirmSent, setConfirmSent] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) {
      toast.error("Bitte E-Mail und Passwort eingeben.");
      return;
    }
    if (password.length < 6) {
      toast.error("Das Passwort muss mindestens 6 Zeichen haben.");
      return;
    }
    if (!accepted) {
      toast.error("Bitte bestätige AGB & Datenschutz.");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/onboarding`,
        data: {
          first_name: prefill?.firstName || "",
          last_name: prefill?.lastName || "",
        },
      },
    });
    setLoading(false);

    if (error) {
      const msg = error.message?.toLowerCase() || "";
      if (msg.includes("already") || msg.includes("registered")) {
        toast("Diese E-Mail ist bereits registriert – bitte melde dich an.");
        setMode("login");
        return;
      }
      toast.error(error.message || "Registrierung fehlgeschlagen.");
      return;
    }

    // Supabase verschleiert bestehende E-Mails (kein Fehler): identities==[] => existiert schon.
    if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      toast("Diese E-Mail ist bereits registriert – bitte melde dich an.");
      setMode("login");
      setPassword("");
      return;
    }

    if (!data.session) {
      // E-Mail-Bestätigung aktiv: kein sofortiger Zugriff -> Hinweis-Panel statt offener Dialog.
      setConfirmSent(true);
      return;
    }

    toast.success(`Konto erstellt 🎉 Dein ${documentName} ist freigeschaltet.`);
    onUnlocked();
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Bitte E-Mail und Passwort eingeben.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error("E-Mail oder Passwort stimmen nicht.");
      return;
    }
    toast.success(`Willkommen zurück 👋 Dein ${documentName} ist freigeschaltet.`);
    onUnlocked();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">
            {mode === "signup" ? `${documentName} kostenlos freischalten` : "Anmelden & freischalten"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {mode === "signup"
              ? "Dein Ergebnis ist fertig. Erstelle ein kostenloses GründerX-Konto, um es anzusehen und als PDF herunterzuladen – ohne Zahlung."
              : "Melde dich an, um dein Ergebnis freizuschalten."}
          </DialogDescription>
        </DialogHeader>

        {confirmSent ? (
          <div className="space-y-4 pt-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Wir haben dir eine Bestätigungs-E-Mail an{" "}
              <span className="font-semibold text-foreground">{email}</span> geschickt. Bestätige sie
              (auch im Spam schauen) und melde dich dann hier an, um dein {documentName} freizuschalten.
            </p>
            <Button
              className="w-full"
              size="lg"
              onClick={() => { setConfirmSent(false); setMode("login"); setPassword(""); }}
            >
              Zum Login
            </Button>
          </div>
        ) : (
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="gate-email">E-Mail-Adresse</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="gate-email"
                type="email"
                autoComplete="email"
                placeholder="du@beispiel.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gate-password">Passwort</Label>
            <Input
              id="gate-password"
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              placeholder={mode === "signup" ? "Mind. 6 Zeichen" : "Dein Passwort"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") (mode === "signup" ? handleSignup : handleLogin)();
              }}
            />
          </div>

          {mode === "signup" && (
            <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer">
              <Checkbox checked={accepted} onCheckedChange={(v) => setAccepted(v === true)} className="mt-0.5" />
              <span>
                Ich akzeptiere die{" "}
                <a href="/agb" target="_blank" className="text-primary hover:underline">AGB</a> und die{" "}
                <a href="/datenschutz" target="_blank" className="text-primary hover:underline">
                  Datenschutzerklärung
                </a>
                .
              </span>
            </label>
          )}

          <Button className="w-full" size="lg" disabled={loading} onClick={mode === "signup" ? handleSignup : handleLogin}>
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                {mode === "signup" ? "Kostenlos freischalten" : "Anmelden & freischalten"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            {mode === "signup" ? (
              <>
                Schon ein Konto?{" "}
                <button type="button" onClick={() => setMode("login")} className="text-primary hover:underline">
                  Anmelden
                </button>
              </>
            ) : (
              <>
                Noch kein Konto?{" "}
                <button type="button" onClick={() => setMode("signup")} className="text-primary hover:underline">
                  Kostenlos registrieren
                </button>
              </>
            )}
          </p>
        </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
