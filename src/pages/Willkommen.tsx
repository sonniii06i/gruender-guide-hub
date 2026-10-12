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
import { CheckCircle2, Eye, EyeOff, Loader2, Lock, LifeBuoy, AlertTriangle, UserCheck, Receipt } from "lucide-react";
import { KontoRahmen, kontoCta } from "@/components/KontoRahmen";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { trackAdConversion } from "@/utils/adConversions";
import { AD_CONVERSION_VALUES } from "@/config/tracking";

interface ClaimResponse {
  status: "new" | "exists" | "created" | "unpaid";
  /** Woher der Kauf kam. CopeCart liefert `provider` in der Danke-Seiten-URL
   *  nicht mit, deshalb sagt der Server es uns. */
  source?: string;
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
  // provider fehlt in der Praxis: CopeCart verwirft die Query-Parameter der
  // hinterlegten Danke-Seiten-URL und haengt nur seine eigenen an. Die order_id
  // allein genuegt — claim-account findet den Kauf darueber und weiss dann
  // selbst, von welcher Plattform er stammt.
  const external = Boolean(orderId);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [fatal, setFatal] = useState<string | null>(null);
  const [infoOnly, setInfoOnly] = useState(false);
  const [claimedProvider, setClaimedProvider] = useState("");

  // Reseller sind Merchant of Record: die Abbuchung erscheint unter IHREM Namen
  // auf dem Kontoauszug, nicht unter unserem. Beide Plattformen verlangen den
  // Hinweis woertlich auf der Danke-Seite — und jede ihren eigenen Wortlaut;
  // Digistores Freigabe-Checkliste prueft ihren Satz Wort fuer Wort ab. Bei
  // Stripe bucht unsere eigene Firma ab, dort waere der Satz schlicht falsch.
  const MERCHANT_HINWEIS: Record<string, string> = {
    copecart: "Die Abbuchung erfolgt durch CopeCart.",
    digistore24: "Die Abbuchung erfolgt durch Digistore24.",
  };
  // claimedProvider zuerst: Er kommt vom Server aus der gefundenen Bestellung.
  // Der Query-Parameter ist unzuverlaessig — CopeCart ersetzt den Query-String
  // der Danke-Seite komplett, und bei Digistore steht er gar nicht erst drin.
  const merchantHinweis = MERCHANT_HINWEIS[claimedProvider || provider] ?? "";

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
      // Kein Kauf in der URL: Das ist KEIN Fehlerfall. Die Verkaufsplattformen
      // pruefen diese Seite vor der Freigabe, und zwar ohne Bestellung — eine
      // Fehlermeldung liest sich dort als tote Danke-Seite und fuehrt zur
      // Ablehnung. Stattdessen erklaeren wir, wie der Zugang ankommt.
      setInfoOnly(true);
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
          setClaimedProvider(data.source ?? "");
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
      <KontoRahmen icon={Loader2} iconSpin tone="neutral" title="Zahlung wird geprüft …" subtitle="Einen Moment bitte, wir ordnen deine Bestellung zu.">
        <div className="space-y-3" aria-hidden="true">
          <div className="h-12 animate-pulse rounded-xl bg-secondary" />
          <div className="h-4 w-24 animate-pulse rounded bg-secondary" />
          <div className="h-11 animate-pulse rounded-lg bg-secondary" />
          <div className="h-11 animate-pulse rounded-xl bg-secondary" />
        </div>
      </KontoRahmen>
    );
  }

  if (infoOnly) {
    return (
      <KontoRahmen
        icon={Receipt}
        title="Hier geht es nach dem Kauf weiter"
        subtitle="Diese Seite öffnet sich automatisch, sobald deine Zahlung durch ist."
      >
        <div className="space-y-5 text-sm">
          <ol className="space-y-3">
            {[
              "Nach dem Kauf landest du automatisch hier, mit deiner Bestellung im Link.",
              "Du legst einmalig dein Passwort fest. Die E-Mail kommt aus deiner Zahlung.",
              "Der Zugang ist sofort im Browser nutzbar. Kein Download, kein Versand.",
            ].map((t, i) => (
              <li key={t} className="flex items-start gap-3">
                <span className="tabular flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-blue">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-foreground/85">{t}</span>
              </li>
            ))}
          </ol>
          {/*
            Beide Plattformen sind Merchant of Record und verlangen ihren Satz
            woertlich auf der Danke-Seite. Ohne Bestellung wissen wir nicht,
            welcher Kaufweg gemeint ist — deshalb hier beide, nach Kaufweg
            beschriftet. Genau diese Ansicht bekommt auch der Pruefer der
            Plattform zu sehen.
          */}
          <div className="rounded-xl border border-border bg-secondary/40 p-4">
            <p className="mb-2 font-semibold text-foreground">Wer abbucht</p>
            <div className="space-y-1.5 text-muted-foreground">
              <p>Über Digistore24: Die Abbuchung erfolgt durch Digistore24.</p>
              <p>Über CopeCart: Die Abbuchung erfolgt durch CopeCart.</p>
              <p>Direkt bei uns: Die Abbuchung erfolgt durch uns selbst.</p>
            </div>
          </div>
          <p className="text-muted-foreground">
            Du hast bezahlt und bist trotzdem ohne Bestellung hier gelandet? Dann melde
            dich bei uns, wir schalten dich von Hand frei.
          </p>
          <Button asChild variant="outline" size="lg" className="h-11 w-full gap-2 rounded-xl">
            <Link to="/kontakt"><LifeBuoy className="h-4 w-4" aria-hidden="true" /> Support kontaktieren</Link>
          </Button>
        </div>
      </KontoRahmen>
    );
  }

  if (fatal) {
    return (
      <KontoRahmen icon={AlertTriangle} tone="warning" title="Das hat nicht geklappt" subtitle={fatal}>
        <div className="space-y-4">
          <p className="rounded-xl border border-border bg-secondary/40 p-4 text-sm text-foreground/85">
            Falls Geld abgebucht wurde, ist es nicht verloren. Melde dich mit der
            Bestätigungsmail von Stripe, wir legen das Konto von Hand an.
          </p>
          <Button asChild variant="outline" size="lg" className="h-11 w-full gap-2 rounded-xl">
            <Link to="/kontakt"><LifeBuoy className="h-4 w-4" aria-hidden="true" /> Support kontaktieren</Link>
          </Button>
        </div>
      </KontoRahmen>
    );
  }

  if (alreadyExists) {
    return (
      <KontoRahmen
        icon={UserCheck}
        title="Zu dieser Adresse gibt es schon ein Konto"
        subtitle={
          <>
            Melde dich mit <strong className="font-semibold text-foreground">{email}</strong> an. Das Abo ist bereits hinterlegt.
            {merchantHinweis && <span className="mt-2 block text-xs">{merchantHinweis}</span>}
          </>
        }
      >
        <Button size="lg" className={kontoCta} onClick={() => navigate("/auth")}>
          Zur Anmeldung
        </Button>
      </KontoRahmen>
    );
  }

  return (
    <KontoRahmen
      backLink={false}
      icon={CheckCircle2}
      tone="success"
      kicker="Zahlung bestätigt"
      title="Noch ein Schritt: Passwort festlegen"
      subtitle={
        <>
          Dein Zugang läuft auf <strong className="font-semibold text-foreground">{email}</strong>.
          {merchantHinweis && <span className="mt-2 block text-xs">{merchantHinweis}</span>}
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/40 p-3.5 text-sm">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <p className="text-foreground/85">
            Die E-Mail stammt aus deiner Zahlung und lässt sich hier nicht ändern,
            daran hängt dein Abo.
          </p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Passwort</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className="h-11 rounded-lg pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mindestens 8 Zeichen"
              autoComplete="new-password"
              autoFocus
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 flex items-center px-1 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <p className={`text-xs ${password.length >= 8 ? "text-success" : "text-muted-foreground"}`}>
            {password.length >= 8 ? "Passt, mindestens 8 Zeichen." : "Mindestens 8 Zeichen."}
          </p>
        </div>

        {/* Optional und bewusst nach dem Passwort: Pflichtfelder hinter der
            Bezahlschranke sind der haeufigste Grund, warum ein bezahlter
            Kunde nie ankommt. */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="firstName">
              Vorname <span className="font-normal text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="firstName"
              className="h-11 rounded-lg"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastName">
              Nachname <span className="font-normal text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="lastName"
              className="h-11 rounded-lg"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
            />
          </div>
        </div>

        <Button type="submit" size="lg" className={kontoCta} disabled={submitting}>
          {submitting ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> Konto wird angelegt …</>
          ) : (
            "Konto anlegen und starten"
          )}
        </Button>
      </form>
    </KontoRahmen>
  );
};

export default Willkommen;
