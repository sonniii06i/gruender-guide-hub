import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Mail, MailCheck } from "lucide-react";
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
import { EMAIL_PATTERN } from "@/lib/freetools/leads";
import { angefordertLesen, angefordertMerken, vorlageAnfordern } from "@/lib/vorlagen/freigabe";

interface VorlagenGateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Titel der Vorlage, z. B. „GbR-Gesellschaftsvertrag“. */
  titel: string;
  slug: string;
}

// Tor vor dem Download der Vorlagen: Adresse eingeben → Bestätigungsmail →
// Klick auf den Link schaltet frei (Double-Opt-in). Schwester des
// EmailGateDialog der Gratis-Tools, aber mit zweitem Zustand „Mail ist
// raus“: Der Nutzer bleibt hier, bis er den Link geklickt hat.
//
// Es entsteht kein Konto und keine Werbeeinwilligung.
export function VorlagenGateDialog({ open, onOpenChange, titel, slug }: VorlagenGateDialogProps) {
  const [email, setEmail] = useState(() => angefordertLesen()?.email ?? "");
  const [website, setWebsite] = useState(""); // Honigtopf
  const [loading, setLoading] = useState(false);
  const [gesendetAn, setGesendetAn] = useState<string | null>(null);
  const [wartezeit, setWartezeit] = useState(0);

  useEffect(() => {
    if (wartezeit <= 0) return;
    const t = window.setTimeout(() => setWartezeit((w) => w - 1), 1000);
    return () => window.clearTimeout(t);
  }, [wartezeit]);

  const senden = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (loading) return;
    const clean = email.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(clean)) {
      toast.error("Bitte eine gültige E-Mail-Adresse angeben.");
      return;
    }
    setLoading(true);
    const r = await vorlageAnfordern({ email: clean, slug, website });
    setLoading(false);
    if (r.ok === true) {
      angefordertMerken(clean);
      setGesendetAn(clean);
      setWartezeit(60);
      if (r.status === "limit") {
        toast.warning("Für heute sind genug Mails an diese Adresse raus. Schau bitte in dein Postfach – auch im Spam-Ordner.");
      } else if (r.status === "bereits_gesendet") {
        toast.info("Die Mail ist schon unterwegs. Bitte kurz warten und das Postfach prüfen.");
      } else {
        toast.success("Bestätigungsmail ist raus.");
      }
      return;
    }
    // `=== true` oben statt Truthiness: ohne strictNullChecks engt TypeScript
    // die Union sonst nicht ein und kennt `fehler` hier nicht.
    const fehler = r.fehler;
    if (fehler === "email") toast.error("Diese E-Mail-Adresse wurde nicht angenommen.");
    else if (fehler === "versand") toast.error("Die Mail konnte gerade nicht verschickt werden. Bitte in ein paar Minuten noch einmal versuchen.");
    else if (fehler === "nicht_konfiguriert") toast.error("Der Mailversand ist gerade nicht eingerichtet. Bitte später noch einmal versuchen.");
    else if (fehler === "netz") toast.error("Keine Verbindung. Bitte Internet prüfen und erneut versuchen.");
    else toast.error("Das hat gerade nicht geklappt. Bitte erneut versuchen.");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {gesendetAn ? (
          <>
            <DialogHeader>
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-brand-green-soft">
                <MailCheck className="h-6 w-6 text-brand-green" />
              </div>
              <DialogTitle className="text-center text-xl">Jetzt nur noch bestätigen</DialogTitle>
              <DialogDescription className="text-center">
                Wir haben eine Mail an <b className="text-foreground">{gesendetAn}</b> geschickt. Klick auf den Link darin –
                dann öffnet sich die Vorlage „{titel}“ sofort, und alle anderen Vorlagen sind ebenfalls frei.
              </DialogDescription>
            </DialogHeader>
            <ul className="space-y-2 pt-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-green" /> Die Mail kommt von GründerX (service@gruenderx.de). Bitte auch im Spam-Ordner nachsehen.</li>
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-green" /> Kein Konto, keine Werbung: Die Bestätigung gilt nur für den Download.</li>
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-green" /> Du kannst diesen Tab offen lassen oder den Link auf dem Handy öffnen – die Freigabe gilt für den Browser, in dem du klickst.</li>
            </ul>
            <div className="flex flex-col gap-2 pt-2 sm:flex-row">
              <Button type="button" variant="outline" className="flex-1" disabled={wartezeit > 0 || loading} onClick={() => senden()}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : wartezeit > 0 ? `Erneut senden (${wartezeit}s)` : "Mail erneut senden"}
              </Button>
              <Button type="button" variant="ghost" className="flex-1" onClick={() => setGesendetAn(null)}>
                Andere Adresse
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <DialogTitle className="text-center text-xl">{titel} kostenlos herunterladen</DialogTitle>
              <DialogDescription className="text-center">
                Gib deine E-Mail-Adresse an und bestätige sie mit einem Klick auf den Link in der Mail. Danach sind alle
                Vorlagen als Word, PDF und Text für dich frei – kein Konto, keine Zahlung.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={senden} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="vorlagen-email">E-Mail-Adresse</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="vorlagen-email"
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
              {/* Honigtopf: für Menschen unsichtbar, Bots füllen ihn aus. */}
              <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="vorlagen-website">Website</label>
                <input id="vorlagen-website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <MailCheck className="mr-2 h-4 w-4" />
                    Bestätigungslink schicken
                  </>
                )}
              </Button>

              <p className="text-xs leading-relaxed text-muted-foreground">
                Wir speichern deine Adresse, die angeforderte Vorlage und den Zeitpunkt der Bestätigung, um den Download
                nachzuhalten. Unbestätigte Adressen löschen wir nach 30 Tagen. Werbung oder einen Newsletter bekommst du
                dadurch nicht. Mehr in der{" "}
                <a href="/datenschutz#vorlagen" target="_blank" className="text-primary hover:underline">
                  Datenschutzerklärung
                </a>
                .
              </p>

              <p className="text-center text-xs text-muted-foreground">
                Schon GründerX-Kunde?{" "}
                <Link to="/auth?mode=signin" className="text-primary hover:underline">
                  Anmelden
                </Link>{" "}
                – mit Abo sind alle Vorlagen ohne Bestätigung frei.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
