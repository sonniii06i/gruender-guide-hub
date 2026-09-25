import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, Mail, Unlock } from "lucide-react";
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
import { EMAIL_PATTERN, rememberToolUnlocked, saveToolLead, trackToolLead } from "@/lib/freetools/leads";

interface EmailGateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Nach dem Speichern der Adresse: Ergebnis freischalten. */
  onUnlocked: () => void;
  /** z. B. „WEEE-Check-Ergebnis" — erscheint in Titel und Bestätigung. */
  resultName: string;
  /** Tool-Slug, landet als Herkunft `gx-tool:<slug>` am Lead. */
  slug: string;
  /** Einmal-Nutzung (Checks) oder dauerhaft frei (Generatoren). */
  singleUse?: boolean;
}

// Tor vor dem Ergebnis der kostenlosen Tools: Ergebnis gegen E-Mail-Adresse.
//
// Schwester von EmailGateDialog.tsx in AnwaltX. Es entsteht KEIN Konto —
// das entsteht bei GründerX erst mit dem Abo (pay-first). Früher stand hier
// ein Registrierungsdialog (AccountGateDialog, supabase.auth.signUp): ein
// zweiter Weg zu einem Konto ohne Zahlung, den /auth bewusst nicht mehr hat.
//
// Kein Newsletter-Häkchen: GründerX hat keinen Newsletter mit Double-Opt-in.
// Die Adresse ist keine Werbeeinwilligung.
export function EmailGateDialog({
  open,
  onOpenChange,
  onUnlocked,
  resultName,
  slug,
  singleUse = false,
}: EmailGateDialogProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUnlock = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (loading) return;
    const clean = email.trim();
    if (!EMAIL_PATTERN.test(clean)) {
      toast.error("Bitte eine gültige E-Mail-Adresse angeben.");
      return;
    }
    setLoading(true);
    // Freigeschaltet wird in jedem Fall, auch wenn das Speichern scheitert.
    await saveToolLead({ email: clean, slug });
    setLoading(false);
    rememberToolUnlocked(slug);
    trackToolLead(slug);
    toast.success(`Dein ${resultName} ist freigeschaltet.`);
    onUnlocked();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Unlock className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">{resultName} kostenlos freischalten</DialogTitle>
          <DialogDescription className="text-center">
            {singleUse
              ? "Dein Ergebnis ist fertig. Gib deine E-Mail-Adresse an und sieh es dir sofort an – kein Konto, keine Zahlung. Das ist deine eine kostenlose Nutzung dieses Tools."
              : "Dein Ergebnis ist fertig. Gib deine E-Mail-Adresse an und lade es sofort herunter – kein Konto, keine Zahlung."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUnlock} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="gate-email">E-Mail-Adresse</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="gate-email"
                type="email"
                required
                autoComplete="email"
                placeholder="du@beispiel.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Unlock className="mr-2 h-4 w-4" />
                Ergebnis kostenlos freischalten
              </>
            )}
          </Button>

          <p className="text-xs leading-relaxed text-muted-foreground">
            Wir speichern deine Adresse zusammen mit dem genutzten Tool, um die kostenlose Nutzung
            nachzuhalten, und löschen sie nach 12 Monaten. Werbung senden wir dir an diese Adresse
            nicht. Mehr in der{" "}
            <a href="/datenschutz#kostenlose-tools" target="_blank" className="text-primary hover:underline">
              Datenschutzerklärung
            </a>
            .
          </p>

          <p className="text-center text-xs text-muted-foreground">
            Schon GründerX-Kunde?{" "}
            <Link to="/auth?mode=signin" className="text-primary hover:underline">
              Anmelden
            </Link>{" "}
            – mit Abo ist jedes Tool unbegrenzt frei.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
