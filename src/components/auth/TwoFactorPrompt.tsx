import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  onVerified: () => void;
  onCancel: () => void;
}

/**
 * Zweiter Schritt beim Anmelden.
 *
 * Wird erst gezeigt, nachdem das Passwort stimmt — die Session existiert an
 * dieser Stelle also bereits und wird von verify-2fa-login vorausgesetzt.
 * Bricht der Nutzer ab, meldet der Aufrufer die Session wieder ab; ohne
 * zweiten Faktor darf sie nicht als vollwertig gelten.
 */
export const TwoFactorPrompt = ({ onVerified, onCancel }: Props) => {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [useBackup, setUseBackup] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = code.trim();
    if (!clean) {
      toast.error("Bitte Code eingeben.");
      return;
    }

    setBusy(true);
    const { data, error } = await supabase.functions.invoke("verify-2fa-login", {
      body: { token: clean, is_backup_code: useBackup },
    });
    setBusy(false);

    const payload = data as any;
    if (error || payload?.error) {
      if (payload?.retry_after_seconds) {
        const min = Math.ceil(payload.retry_after_seconds / 60);
        toast.error(`Zu viele Fehlversuche. Bitte in ${min} Minute(n) erneut versuchen.`);
      } else if (payload?.attempts_left !== undefined) {
        toast.error(`${payload.error} – noch ${payload.attempts_left} Versuch(e)`);
      } else {
        toast.error(payload?.error ?? "Code ungültig");
      }
      setCode("");
      return;
    }

    if (payload?.backup_codes_remaining !== undefined && useBackup) {
      toast.success(
        `Angemeldet. Noch ${payload.backup_codes_remaining} Backup-Code(s) übrig.`,
      );
    }
    onVerified();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-lg"
      >
        <div className="mb-4 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <h2 className="font-bold">Bestätigung erforderlich</h2>
        </div>

        <p className="mb-4 text-sm text-muted-foreground">
          {useBackup
            ? "Gib einen deiner Backup-Codes ein. Jeder Code funktioniert nur einmal."
            : "Gib den 6-stelligen Code aus deiner Authenticator-App ein."}
        </p>

        <Label htmlFor="totp-login" className="sr-only">
          Bestätigungscode
        </Label>
        <Input
          id="totp-login"
          autoFocus
          autoComplete="one-time-code"
          inputMode={useBackup ? "text" : "numeric"}
          maxLength={useBackup ? 11 : 6}
          placeholder={useBackup ? "ABCDE-FGHIJ" : "123456"}
          value={code}
          onChange={(e) =>
            setCode(useBackup ? e.target.value.toUpperCase() : e.target.value.replace(/\D/g, ""))
          }
          className="text-center text-lg tracking-[0.3em]"
        />

        <Button type="submit" className="mt-4 w-full" disabled={busy}>
          {busy ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : null}
          Bestätigen
        </Button>

        <div className="mt-3 flex items-center justify-between text-sm">
          <button
            type="button"
            className="text-muted-foreground underline-offset-2 hover:underline"
            onClick={() => {
              setUseBackup((v) => !v);
              setCode("");
            }}
          >
            {useBackup ? "Code aus der App verwenden" : "Backup-Code verwenden"}
          </button>
          <button
            type="button"
            className="text-muted-foreground underline-offset-2 hover:underline"
            onClick={onCancel}
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
};
