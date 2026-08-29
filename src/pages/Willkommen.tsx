// Schritt 2 von pay-first: Die Zahlung ist durch, jetzt entsteht das Konto.
//
// Der empfindlichste Punkt des Ablaufs. Wer hier abbricht, hat BEZAHLT und
// kommt trotzdem nicht rein — teurer als jeder verlorene Klick auf der
// Landingpage. Daraus folgen drei Regeln:
//
//  1. Nur ein einziges Pflichtfeld (Passwort).
//  2. Die E-Mail stammt vom Server und ist nicht editierbar:
//     `check-subscription` findet den Kunden über genau diese Adresse.
//  3. Jeder Fehlerfall endet mit einem gangbaren Weg, nie in einer Sackgasse.
//
// Zwei Kaufwege landen hier:
//   ?session_id=cs_...            — direkt über Stripe gekauft
//   ?provider=copecart&order=...  — über eine Reseller-Plattform gekauft
// Die order_id spielt dabei die Rolle der session_id; claim-account löst
// daraus die E-Mail auf. Beide Wege sehen für den Käufer identisch aus.

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { trackAdConversion } from "@/utils/adConversions";
import { AD_CONVERSION_VALUES } from "@/config/tracking";

interface ClaimResponse {
  status: "new" | "exists" | "created" | "unpaid";
  email?: string;
  amount?: number;
  currency?: string;
  error?: string;
  code?: string;
}

const Willkommen = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id") || "";
  // Die Plattformen benennen den Parameter unterschiedlich; beide Schreibweisen
  // annehmen ist billiger als ein Käufer, der bezahlt hat und nicht reinkommt.
  const provider = searchParams.get("provider") || "";
  const orderId = searchParams.get("order") || searchParams.get("order_id") || "";
  const external = Boolean(provider && orderId);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [fatal, setFatal] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const callClaim = async (body: Record<string, unknown>): Promise<ClaimResponse> => {
    const { data, error } = await supabase.functions.invoke<ClaimResponse>("claim-account", {
      body: external ? { provider, orderId, ...body } : { sessionId, ...body },
    });
    if (error && !data) throw error;
    return (data ?? {}) as ClaimResponse;
  };

  useEffect(() => {
    if (!sessionId && !external) {
      setFatal("Dieser Link ist unvollständig. Bitte öffne ihn erneut aus deiner Kaufbestätigung.");
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const data = await callClaim({});
        if (cancelled) return;
        if (data.status === "unpaid") {
          // Beim Reseller-Weg ist der Käufer regelmäßig schneller auf dieser
          // Seite als die IPN-Meldung der Plattform. Das ist kein Fehler,
          // sondern eine Frage von Sekunden — entsprechend formulieren.
          setFatal(
            data.error ?? "Zu dieser Sitzung liegt noch keine abgeschlossene Zahlung vor.",
          );
        } else if (data.email) {
          setEmail(data.email);
          setAmount(data.amount ?? null);
          setAlreadyExists(data.status === "exists");
        } else {
          setFatal(data.error || "Die Zahlung konnte nicht zugeordnet werden.");
        }
      } catch {
        if (!cancelled) setFatal("Die Zahlung konnte gerade nicht geprüft werden. Bitte lade die Seite neu.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [sessionId, provider, orderId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast({ title: "Passwort zu kurz", description: "Bitte mindestens 8 Zeichen.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const data = await callClaim({ password, firstName, lastName });

      if (data.status === "exists") {
        setAlreadyExists(true);
        return;
      }
      if (data.status !== "created") {
        toast({
          title: "Konto konnte nicht angelegt werden",
          description: data.error || "Bitte versuche es noch einmal.",
          variant: "destructive",
        });
        return;
      }

      // Kauf und Registrierung melden, BEVOR navigiert wird.
      //
      // Die event_id des Kaufs ist `stripe_<session_id>` — exakt die, die der
      // Stripe-Webhook serverseitig an die CAPI schickt. Nur bei identischer ID
      // zählt Meta beide Meldungen als EIN Ereignis.
      //
      // Reseller-Käufe bekommen einen eigenen Namensraum (`copecart_<order>`):
      // Sie melden nur von hier, und eine order_id könnte einer session_id
      // gleichen — dann fielen zwei verschiedene Käufe zu einem zusammen.
      trackAdConversion("purchase", {
        eventId: external ? `${provider}_${orderId}` : `stripe_${sessionId}`,
        value: amount ?? AD_CONVERSION_VALUES.purchase,
        email: data.email,
        label: "pay_first_checkout",
      });
      trackAdConversion("signup", { email: data.email, label: "pay_first_account" });

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email!,
        password,
      });
      if (signInError) {
        toast({ title: "Konto steht bereit", description: "Bitte melde dich einmal an." });
        navigate("/auth");
        return;
      }
      navigate("/onboarding?willkommen=1");
    } catch {
      toast({
        title: "Verbindungsfehler",
        description: "Bitte versuche es noch einmal.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (fatal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Das hat nicht geklappt</CardTitle>
            <CardDescription>{fatal}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Falls Geld abgebucht wurde, ist es nicht verloren — melde dich mit der
              Bestätigungsmail von Stripe, wir legen das Konto von Hand an.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/kontakt">Support kontaktieren</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (alreadyExists) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Zu dieser Adresse gibt es schon ein Konto</CardTitle>
            <CardDescription>
              Melde dich mit <strong>{email}</strong> an — das Abo ist bereits hinterlegt.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => navigate("/auth")}>
              Zur Anmeldung
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Zahlung bestätigt</span>
          </div>
          <CardTitle>Noch ein Schritt: Passwort festlegen</CardTitle>
          <CardDescription>
            Dein Zugang läuft auf <strong>{email}</strong>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Alert>
              <AlertDescription className="text-sm">
                Die E-Mail stammt aus deiner Zahlung und lässt sich hier nicht ändern —
                daran hängt dein Abo.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="password">Passwort *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="mindestens 8 Zeichen"
                  autoComplete="new-password"
                  autoFocus
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-muted-foreground"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Optional und bewusst nach dem Passwort: Pflichtfelder hinter der
                Bezahlschranke sind der haeufigste Grund, warum ein bezahlter
                Kunde nie ankommt. */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-muted-foreground">Vorname</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-muted-foreground">Nachname</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Konto wird angelegt…</>
              ) : (
                "Konto anlegen und starten"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Willkommen;
