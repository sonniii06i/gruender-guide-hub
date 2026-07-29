import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, ShieldOff, Loader2, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface Status {
  enabled: boolean;
  backup_codes_remaining: number;
}

interface SetupData {
  secret: string;
  otpauth_url: string;
  qr_code: string;
  backup_codes: string[];
}

/**
 * Zwei-Faktor-Authentifizierung im Sicherheits-Tab.
 *
 * Ablauf beim Einrichten: setup-2fa liefert Secret, QR-Code und Backup-Codes.
 * Scharf geschaltet wird erst, wenn der Nutzer ueber verify-2fa einen
 * gueltigen Code bestaetigt — sonst koennte man sich aussperren, indem man
 * die Einrichtung abbricht, bevor die App eingerichtet ist.
 */
export const TwoFactorPanel = () => {
  const [status, setStatus] = useState<Status | null>(null);
  const [setup, setSetup] = useState<SetupData | null>(null);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [disabling, setDisabling] = useState(false);

  const loadStatus = useCallback(async () => {
    const { data, error } = await supabase.functions.invoke("check-2fa-status");
    if (error) return;
    setStatus(data as Status);
  }, []);

  useEffect(() => {
    void loadStatus();
  }, [loadStatus]);

  const startSetup = async () => {
    setBusy(true);
    const { data, error } = await supabase.functions.invoke("setup-2fa");
    setBusy(false);
    if (error || (data as any)?.error) {
      toast.error((data as any)?.error ?? "Einrichtung fehlgeschlagen");
      return;
    }
    setSetup(data as SetupData);
    setCode("");
  };

  const confirmSetup = async () => {
    if (code.replace(/\s/g, "").length !== 6) {
      toast.error("Bitte den 6-stelligen Code aus der App eingeben.");
      return;
    }
    setBusy(true);
    const { data, error } = await supabase.functions.invoke("verify-2fa", {
      body: { token: code },
    });
    setBusy(false);
    if (error || (data as any)?.error) {
      const d = data as any;
      toast.error(
        d?.attempts_left !== undefined
          ? `${d.error} – noch ${d.attempts_left} Versuch(e)`
          : d?.error ?? "Code ungültig",
      );
      return;
    }
    toast.success("Zwei-Faktor-Authentifizierung ist aktiv.");
    setSetup(null);
    setCode("");
    void loadStatus();
  };

  const disable = async () => {
    if (code.replace(/\s/g, "").length < 6) {
      toast.error("Zum Deaktivieren einen aktuellen Code oder Backup-Code eingeben.");
      return;
    }
    setBusy(true);
    const isBackup = code.includes("-") || code.replace(/\s/g, "").length > 6;
    const { data, error } = await supabase.functions.invoke("disable-2fa", {
      body: { token: code, is_backup_code: isBackup },
    });
    setBusy(false);
    if (error || (data as any)?.error) {
      toast.error((data as any)?.error ?? "Deaktivieren fehlgeschlagen");
      return;
    }
    toast.success("Zwei-Faktor-Authentifizierung deaktiviert.");
    setDisabling(false);
    setCode("");
    void loadStatus();
  };

  const copyCodes = async () => {
    if (!setup) return;
    await navigator.clipboard.writeText(setup.backup_codes.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- Einrichtung laeuft --------------------------------------------------
  if (setup) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="font-bold mb-2">Zwei-Faktor-Authentifizierung einrichten</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Scanne den Code mit einer Authenticator-App (Google Authenticator, 1Password,
          Authy) und bestätige mit dem angezeigten 6-stelligen Code.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          {setup.qr_code ? (
            <img
              src={setup.qr_code}
              alt="QR-Code für die Authenticator-App"
              className="h-44 w-44 rounded-lg border border-border bg-white p-2"
            />
          ) : null}

          <div className="flex-1 space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground">
                Falls der QR-Code nicht funktioniert – Schlüssel manuell eingeben:
              </Label>
              <code className="mt-1 block break-all rounded-lg bg-muted px-3 py-2 text-xs">
                {setup.secret}
              </code>
            </div>

            <div>
              <Label htmlFor="totp-setup">Code aus der App</Label>
              <Input
                id="totp-setup"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                className="mt-1 tracking-[0.4em] text-center text-lg"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/5 p-4">
          <p className="text-sm font-medium mb-2">
            Backup-Codes – jetzt sichern, sie werden nur einmal angezeigt
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            Jeder Code funktioniert genau einmal und ersetzt den Code aus der App,
            falls du keinen Zugriff mehr auf dein Gerät hast.
          </p>
          <div className="grid grid-cols-2 gap-2 font-mono text-sm sm:grid-cols-3">
            {setup.backup_codes.map((c) => (
              <span key={c} className="rounded bg-muted px-2 py-1 text-center">
                {c}
              </span>
            ))}
          </div>
          <Button variant="outline" size="sm" className="mt-3" onClick={copyCodes}>
            {copied ? (
              <Check className="h-3.5 w-3.5 mr-1" />
            ) : (
              <Copy className="h-3.5 w-3.5 mr-1" />
            )}
            {copied ? "Kopiert" : "Alle kopieren"}
          </Button>
        </div>

        <div className="mt-6 flex gap-2">
          <Button onClick={confirmSetup} disabled={busy}>
            {busy ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : null}
            Aktivieren
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setSetup(null);
              setCode("");
            }}
          >
            Abbrechen
          </Button>
        </div>
      </div>
    );
  }

  // --- Aktiv ---------------------------------------------------------------
  if (status?.enabled) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-500 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-bold mb-1">Zwei-Faktor-Authentifizierung ist aktiv</h3>
            <p className="text-sm text-muted-foreground">
              Beim Anmelden wird zusätzlich ein Code aus deiner Authenticator-App
              abgefragt. Noch {status.backup_codes_remaining} Backup-Code
              {status.backup_codes_remaining === 1 ? "" : "s"} übrig.
            </p>

            {status.backup_codes_remaining <= 2 ? (
              <p className="mt-2 text-sm text-amber-600 dark:text-amber-500">
                Wenige Backup-Codes übrig. Deaktiviere 2FA und richte sie neu ein,
                um einen frischen Satz zu erhalten.
              </p>
            ) : null}

            {disabling ? (
              <div className="mt-4 space-y-3">
                <div>
                  <Label htmlFor="totp-disable">
                    Zum Deaktivieren aktuellen Code oder Backup-Code eingeben
                  </Label>
                  <Input
                    id="totp-disable"
                    autoComplete="one-time-code"
                    placeholder="123456 oder ABCDE-FGHIJ"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="mt-1 max-w-xs"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="destructive" onClick={disable} disabled={busy}>
                    {busy ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : null}
                    Deaktivieren
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setDisabling(false);
                      setCode("");
                    }}
                  >
                    Abbrechen
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setDisabling(true)}
              >
                <ShieldOff className="h-4 w-4 mr-1" />
                Deaktivieren
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- Nicht eingerichtet --------------------------------------------------
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="font-bold mb-2">Zwei-Faktor-Authentifizierung</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Zusätzlicher Schutz beim Anmelden: neben dem Passwort wird ein Code aus
        deiner Authenticator-App abgefragt. Wer nur dein Passwort kennt, kommt
        damit nicht mehr in dein Konto.
      </p>
      <Button onClick={startSetup} disabled={busy || status === null}>
        {busy ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : null}
        Einrichten
      </Button>
    </div>
  );
};
