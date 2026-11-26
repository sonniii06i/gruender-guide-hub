import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { trackSignup } from "@/utils/analytics";
import { startGuestCheckout } from "@/utils/guestCheckout";
import { readCartVariant, rememberCartVariant, type CartVariant } from "@/lib/cart";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  CreditCard,
  Eye,
  EyeOff,
  Globe2,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
} from "lucide-react";
import Logo from "@/components/Logo";
import { KontoRahmen, FormFehler, kontoCta, SUPPORT_MAIL } from "@/components/KontoRahmen";
import { PLANS, formatEurCents, netCentsOf } from "@/config/pricing";
import { TOOL_COUNT, GUIDE_COUNT, ANBIETER_ANZAHL } from "@/data/kennzahlen";
import { WERBE_HINWEIS } from "@/lib/werbeHinweis";
import { trackAdConversion } from "@/utils/adConversions";
import { StartAngebotButton } from "@/components/StartAngebotButton";
import { isGruenderXIosApp } from "@/lib/iosApp";
import { cn } from "@/lib/utils";

type GoalKey = "gewerbe" | "ecom" | "gmbh" | "us" | "app";

const SIGNUP_GOALS: {
  id: GoalKey;
  label: string;
  icon: typeof Briefcase;
  headline: string;
  items: string[];
}[] = [
  {
    id: "gewerbe",
    label: "Gewerbe & Steuern",
    icon: Briefcase,
    headline: "Dein Startpaket für Gewerbe & Finanzamt",
    items: [
      "Gewerbe-Check & Gewerbeanmeldung-Wizard Schritt für Schritt",
      "Fragebogen zur steuerlichen Erfassung (ELSTER-Vorbereitung)",
      "Steuer- & Fristenkalender + Brutto-Netto-Rechner 2026",
    ],
  },
  {
    id: "ecom",
    label: "Shop & Amazon",
    icon: ShoppingBag,
    headline: "Dein Startpaket für Onlineshop & Amazon FBA",
    items: [
      "Shop-Profit-Rechner mit echter USt., Versand & Klickkosten",
      "LUCID-, WEEE/EAR- & GPSR-Pflichten-Checks vor dem Start",
      "Anbieter-Vergleich für Shop-Systeme, Payment & 3PL-Fulfillment",
    ],
  },
  {
    id: "gmbh",
    label: "UG / GmbH gründen",
    icon: Building2,
    headline: "Dein Startpaket für UG & GmbH",
    items: [
      "Rechtsform-Wizard: Einzelunternehmen vs. UG vs. GmbH im Zahlenvergleich",
      "Kompletter Notar-, Handelsregister- & Transparenzregister-Kurs",
      "Geschäftsführer-Gehalt vs. Dividende & Holding-Rechner",
    ],
  },
  {
    id: "us",
    label: "US-LLC & Amex US",
    icon: Globe2,
    headline: "Dein Startpaket für US-Setup & Global Transfer",
    items: [
      "US-Amex-Kurs: US-Adresse, Tello eSIM & Global Transfer aus DE",
      "US-LLC-Wizard, Sales-Tax-Nexus & DBA/CFC-Steuer-Check",
      "US-Banking-Vergleich: Mercury, Relay, Wise, Chase & BofA",
    ],
  },
  {
    id: "app",
    label: "Website & App",
    icon: Store,
    headline: "Dein Startpaket für SaaS, App & digitale Produkte",
    items: [
      "App-Store-Umsatz- & Runway-Rechner mit Cash-Verlauf",
      "Startup-Guthaben: Cloud-, Hosting- & KI-Credits im Überblick",
      "DSGVO-, Impressum- & Vertragsvorlagen-Bibliothek",
    ],
  },
];

const Auth = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const iosApp = isGruenderXIosApp();
  const [mode, setMode] = useState<"signin" | "signup">(
    iosApp || params.get("mode") === "signin" ? "signin" : "signup",
  );
  const [goal, setGoal] = useState<GoalKey>("gewerbe");
  const [kaufPlan, setKaufPlan] = useState<"trial" | CartVariant>(() => {
    const chosen = readCartVariant();
    if (chosen === "gruenderx-year") return "gruenderx-year";
    return "trial";
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [signupEmail, setSignupEmail] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const pwChecks = {
    length: password.length >= 8,
    digit: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
  const pwValid = pwChecks.length && pwChecks.digit && pwChecks.special;

  useEffect(() => {
    if (!authLoading && user) navigate("/onboarding", { replace: true });
  }, [user, authLoading, navigate]);

  const signupStartedAt = useRef<number | null>(null);
  const markSignupStarted = () => {
    if (signupStartedAt.current !== null || mode !== "signup") return;
    signupStartedAt.current = Date.now();
    trackSignup.started("password");
  };

  const selectGoal = (g: GoalKey) => {
    setGoal(g);
    try {
      sessionStorage.setItem("gx-signup-goal", g);
    } catch {
      /* ignore */
    }
  };

  const handleGoogleAuth = async () => {
    trackSignup.ssoClicked("google");
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/onboarding` },
    });
    if (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      if (mode === "signup") {
        if (!pwValid) throw new Error("Passwort: min. 8 Zeichen, 1 Zahl und 1 Sonderzeichen.");
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/onboarding`,
            data: { first_name: firstName, last_name: lastName },
          },
        });
        if (error) throw error;
        if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
          setErrorMsg("Diese E-Mail ist bereits registriert. Bitte melde dich an.");
          setPassword("");
          setMode("signin");
          return;
        }
        trackSignup.completed("password", signupStartedAt.current ? Date.now() - signupStartedAt.current : undefined);
        trackAdConversion("signup", { label: "registration_password" });
        if (!data.session) {
          setSignupEmail(email);
          return;
        }
        toast.success("Konto erstellt! Richte jetzt dein Profil ein.");
        navigate("/onboarding");
        return;
      }

      const { data: signIn, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      if (!signIn.user?.app_metadata?.two_factor_enabled) {
        toast.success("Willkommen zurück!");
      }
      navigate("/dashboard");
    } catch (err: any) {
      const raw = err?.message ?? "";
      let msg = raw || "Etwas ist schiefgelaufen. Bitte versuch es erneut.";
      if (/invalid login credentials/i.test(raw))
        msg = "E-Mail oder Passwort falsch, oder es gibt noch keinen Account mit dieser E-Mail.";
      else if (/email not confirmed/i.test(raw))
        msg = "Deine E-Mail ist noch nicht bestätigt. Klick den Link in der Bestätigungs-Mail (auch im Spam-Ordner schauen).";
      else if (/rate limit|too many/i.test(raw))
        msg = "Zu viele Versuche. Bitte warte kurz und versuch es erneut.";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    if (!email) {
      setErrorMsg("Bitte gib oben deine E-Mail-Adresse ein, dann schicke ich dir einen Link.");
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    toast.success("Link zum Zurücksetzen gesendet. Schau in dein Postfach (auch Spam).");
  };

  // Native GründerX iOS-App (Apple Guideline 3.1.1):
  // Reiner Login + kostenloses Konto ohne Preise, Testwoche, Checkout-Wege oder WebView-Google-OAuth.
  if (iosApp && !signupEmail) {
    return (
      <KontoRahmen
        backLink={false}
        kicker="GründerX iOS"
        title={mode === "signin" ? "Bei GründerX anmelden" : "Kostenloses Konto anlegen"}
        subtitle={
          mode === "signin"
            ? "Melde dich mit deinem GründerX-Konto an. Alle Kurse, Fortschritte und Tools sind sofort synchron."
            : "Richte dein Konto ein, um deinen Gründungs-Fahrplan und alle Inhalte zu nutzen."
        }
      >
        <div
          role="tablist"
          aria-label="Anmeldeart"
          className="mb-5 grid grid-cols-2 gap-1 rounded-xl border border-border bg-secondary/75 p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === "signin"}
            onClick={() => { setErrorMsg(null); setMode("signin"); }}
            className={cn(
              "min-h-10 rounded-[9px] text-sm font-semibold transition-colors",
              mode === "signin" ? "bg-white text-primary shadow-sm" : "text-muted-foreground",
            )}
          >
            Anmelden
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "signup"}
            onClick={() => { setErrorMsg(null); setMode("signup"); }}
            className={cn(
              "min-h-10 rounded-[9px] text-sm font-semibold transition-colors",
              mode === "signup" ? "bg-white text-primary shadow-sm" : "text-muted-foreground",
            )}
          >
            Konto anlegen
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="ios-first-name">Vorname</Label>
                <Input
                  id="ios-first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Max"
                  required
                  autoComplete="given-name"
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ios-last-name">Nachname</Label>
                <Input
                  id="ios-last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Muster"
                  required
                  autoComplete="family-name"
                  className="h-11 rounded-xl"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="ios-email">E-Mail</Label>
            <Input
              id="ios-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="du@firma.de"
              required
              autoComplete="username"
              className="h-11 rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="ios-pw">Passwort</Label>
              {mode === "signin" && (
                <button
                  type="button"
                  onClick={handleForgot}
                  className="text-xs font-semibold text-accent-blue hover:underline"
                >
                  Passwort vergessen?
                </button>
              )}
            </div>
            <div className="relative">
              <Input
                id="ios-pw"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === "signin" ? "Dein Passwort" : "Mind. 8 Zeichen"}
                minLength={8}
                required
                className="h-11 rounded-xl pr-11"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                aria-label={showPw ? "Passwort verbergen" : "Passwort anzeigen"}
                className="absolute inset-y-0 right-1 flex min-w-[40px] items-center justify-center text-muted-foreground"
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {mode === "signup" && (
              <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] font-medium">
                {[
                  { ok: pwChecks.length, label: "Min. 8 Zeichen" },
                  { ok: pwChecks.digit, label: "1 Zahl" },
                  { ok: pwChecks.special, label: "1 Sonderzeichen" },
                ].map((c) => (
                  <span
                    key={c.label}
                    className={cn(
                      "rounded-md px-2 py-0.5",
                      c.ok ? "bg-brand-green-soft text-brand-green" : "bg-secondary text-muted-foreground",
                    )}
                  >
                    {c.ok ? "✓ " : ""}{c.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          {errorMsg && <FormFehler>{errorMsg}</FormFehler>}

          <Button type="submit" size="lg" disabled={loading} className={kontoCta}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                {mode === "signin" ? "Anmeldung läuft …" : "Konto wird angelegt …"}
              </>
            ) : mode === "signin" ? (
              "Anmelden"
            ) : (
              "Kostenloses Konto anlegen"
            )}
          </Button>
        </form>
      </KontoRahmen>
    );
  }

  // Interaktiver Direkt-Kaufweg (/auth?mode=kauf, ausgeloggt) im Revolut × Lexoffice Stil
  if (params.get("mode") === "kauf" && !user) {
    const monat = PLANS.gruenderx;
    const jahr = PLANS["gruenderx-year"];
    const jahrErsparnis = (jahr.anchorCents ?? 0) - jahr.grossCents;
    const isTrial = kaufPlan === "trial";
    const activePlan = kaufPlan === "gruenderx-year" ? jahr : monat;

    return (
      <div className="flex min-h-screen flex-col bg-background">
        <header className="border-b border-border bg-white">
          <div className="container flex h-16 max-w-5xl items-center justify-between gap-4 px-4">
            <Link to="/" aria-label="GründerX, zur Startseite" className="inline-flex items-center gap-2.5">
              <Logo asImage className="h-7 w-7" />
              <span className="text-[17px] font-bold tracking-tight text-primary">GründerX</span>
            </Link>
            <div className="flex items-center gap-3 text-sm">
              <Link to="/auth?mode=signin" className="font-semibold text-muted-foreground hover:text-primary">
                Anmelden
              </Link>
              <Link to="/preise" className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Preise</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="container max-w-4xl flex-1 px-4 py-8 md:py-12">
          {/* Schritt-Leiste */}
          <ol className="mb-7 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
            {["1. Zugang wählen", "2. Sichere Zahlung bei Stripe", "3. Konto & Sofort-Start"].map((step, i) => (
              <li
                key={step}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1",
                  i === 0 ? "bg-primary text-white" : "bg-white text-muted-foreground ring-1 ring-border",
                )}
              >
                {step}
              </li>
            ))}
          </ol>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_340px] lg:items-start">
            <section className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-green">Sofort-Zugang</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-primary sm:text-[1.75rem]">
                Wähle deinen Start bei GründerX
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Voller Zugriff auf alle {GUIDE_COUNT} Kurse, {TOOL_COUNT} Tools, {ANBIETER_ANZAHL} Anbieter und Felix.
                Alle Preise sind Endpreise inkl. 19 % USt.
              </p>

              {/* Interaktive 3-Wege-Wahl */}
              <div className="mt-5 space-y-2.5" role="radiogroup" aria-label="Zugangs-Variante wählen">
                {[
                  {
                    id: "trial" as const,
                    badge: "Meistgewählt zum Testen",
                    badgeTone: "bg-brand-green text-white",
                    title: "7 Tage für 1,00 € testen",
                    sub: `Danach ${formatEurCents(monat.grossCents)} / Monat, monatlich kündbar. Während der 7 Tage mit 1 Klick kündbar.`,
                    price: "1,00 €",
                    period: "für 7 Tage",
                  },
                  {
                    id: "gruenderx" as const,
                    badge: "Flexibel",
                    badgeTone: "bg-secondary text-primary",
                    title: "Monatszugang",
                    sub: "Voller Zugang ohne Bindung, monatlich zum Periodenende kündbar.",
                    price: formatEurCents(monat.grossCents),
                    period: "/ Monat",
                  },
                  {
                    id: "gruenderx-year" as const,
                    badge: `${formatEurCents(jahrErsparnis)} sparen`,
                    badgeTone: "bg-accent text-primary",
                    title: "Jahreszugang (2 Monate gratis)",
                    sub: `Einmal jährlich ${formatEurCents(jahr.grossCents)} statt ${formatEurCents(jahr.anchorCents ?? 0)}.`,
                    price: formatEurCents(jahr.grossCents),
                    period: "/ Jahr",
                  },
                ].map((opt) => {
                  const active = kaufPlan === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => {
                        setKaufPlan(opt.id);
                        if (opt.id !== "trial") rememberCartVariant(opt.id);
                      }}
                      className={cn(
                        "press flex w-full items-start justify-between gap-3 rounded-2xl border-2 p-4 text-left transition-colors",
                        active ? "border-primary bg-accent/40" : "border-border bg-white hover:border-primary/35",
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <span className={cn("inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold", opt.badgeTone)}>
                          {opt.badge}
                        </span>
                        <p className="mt-1.5 text-[15px] font-bold text-primary">{opt.title}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{opt.sub}</p>
                      </div>
                      <div className="shrink-0 text-right tabular">
                        <p className="text-lg font-bold text-primary">{opt.price}</p>
                        <p className="text-[11px] text-muted-foreground">{opt.period}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 rounded-xl bg-secondary/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sofort nach Zahlung freigeschaltet</p>
                <ul className="mt-2.5 grid gap-1.5 text-xs text-foreground sm:grid-cols-2">
                  {[
                    `${GUIDE_COUNT} interaktive Kurse & Checklisten`,
                    `${TOOL_COUNT} Rechner, Wizards & Steuer-Cockpit`,
                    "KI-Co-Pilot Felix ohne Limit pro Frage",
                    `${ANBIETER_ANZAHL} Anbieter im Direkt-Vergleich`,
                  ].map((x) => (
                    <li key={x} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green" aria-hidden="true" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Rechte Zusammenfassung */}
            <aside className="rounded-2xl border-2 border-primary bg-white p-5 shadow-soft lg:sticky lg:top-8">
              <h2 className="text-base font-bold text-primary">Deine Übersicht</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">Auswahl</dt>
                  <dd className="font-semibold text-foreground">
                    {isTrial ? "7-Tage-Startangebot" : kaufPlan === "gruenderx-year" ? "Jahreszugang" : "Monatszugang"}
                  </dd>
                </div>
                {!isTrial && (
                  <div className="flex justify-between gap-2 text-xs">
                    <dt className="text-muted-foreground">davon netto (zzgl. 19 % USt.)</dt>
                    <dd className="tabular text-muted-foreground">{formatEurCents(netCentsOf(activePlan.grossCents))}</dd>
                  </div>
                )}
                <div className="flex items-baseline justify-between gap-2 border-t border-border pt-3">
                  <dt className="font-bold text-primary">Heute fällig (brutto)</dt>
                  <dd className="text-2xl font-bold text-primary tabular">
                    {isTrial ? "1,00 €" : formatEurCents(activePlan.grossCents)}
                  </dd>
                </div>
              </dl>

              {errorMsg && <div className="mt-4"><FormFehler>{errorMsg}</FormFehler></div>}

              <div className="mt-5">
                {isTrial ? (
                  <StartAngebotButton variant="default" cta="auth-kauf-trial" />
                ) : (
                  <Button
                    size="lg"
                    disabled={loading}
                    className="press h-12 w-full rounded-xl bg-primary text-sm font-semibold text-white hover:bg-primary/90"
                    onClick={async () => {
                      setLoading(true);
                      setErrorMsg(null);
                      try {
                        await startGuestCheckout("gruenderx", kaufPlan === "gruenderx-year" ? "year" : "month");
                      } catch (e) {
                        setErrorMsg((e as Error).message || "Checkout fehlgeschlagen");
                        setLoading(false);
                      }
                    }}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                        Weiterleitung zur Kasse …
                      </>
                    ) : (
                      <>
                        Weiter zur sicheren Zahlung <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </Button>
                )}
              </div>

              <ul className="mt-4 space-y-1.5 border-t border-border pt-4 text-[11px] text-muted-foreground">
                <li className="flex items-center gap-2"><Lock className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" /> Gesicherte Zahlung über Stripe</li>
                <li className="flex items-center gap-2"><CreditCard className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" /> Apple Pay · Karte · Klarna · USt-Rechnung</li>
                <li className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 shrink-0 text-brand-green" aria-hidden="true" /> Kündigung jederzeit per 1 Klick im Cockpit</li>
              </ul>

              <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                Mit dem Kauf akzeptierst du unsere{" "}
                <Link to="/agb" className="underline">AGB</Link>,{" "}
                <Link to="/datenschutz" className="underline">Datenschutz</Link> und{" "}
                <Link to="/widerruf" className="underline">Widerrufsbelehrung</Link>. {WERBE_HINWEIS}
              </p>

              <div className="mt-4 border-t border-border pt-3 text-center text-xs text-muted-foreground">
                Erst kostenlos reinschauen?{" "}
                <Link to="/auth" className="font-semibold text-accent-blue hover:underline">Gratis-Konto anlegen</Link>
              </div>
            </aside>
          </div>
        </main>
      </div>
    );
  }

  // E-Mail-Bestätigung nach Signup
  if (signupEmail) {
    return (
      <KontoRahmen
        icon={Mail}
        tone="accent"
        title="Fast geschafft"
        subtitle={
          <>
            Wir haben dir eine Bestätigungs-E-Mail an <span className="font-semibold text-foreground">{signupEmail}</span> geschickt.
            Klick den Link darin, um deinen Account zu aktivieren. Danach kannst du dich anmelden.
          </>
        }
      >
        <Button
          size="lg"
          onClick={() => {
            setSignupEmail(null);
            setPassword("");
            setMode("signin");
          }}
          className={kontoCta}
        >
          Zum Login
        </Button>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Keine E-Mail erhalten? Prüfe den Spam-Ordner oder{" "}
          <button onClick={() => { setSignupEmail(null); setMode("signup"); }} className="font-semibold text-accent-blue hover:underline">
            erneut registrieren
          </button>
          .
        </p>
      </KontoRahmen>
    );
  }

  // Login bleibt kompakt zentriert im KontoRahmen
  if (mode === "signin") {
    return (
      <KontoRahmen
        kicker="Willkommen zurück"
        title="Bei GründerX anmelden"
        subtitle="Melde dich mit Google oder deiner E-Mail-Adresse an."
      >
        <Button
          type="button"
          variant="outline"
          size="lg"
          disabled={loading}
          onClick={handleGoogleAuth}
          className="h-11 w-full gap-2 rounded-xl border-border bg-white font-semibold hover:bg-secondary/50"
        >
          <GoogleIcon />
          Mit Google anmelden
        </Button>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-xs"><span className="bg-card px-2.5 text-muted-foreground">oder mit E-Mail</span></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">E-Mail</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="du@firma.de" required className="h-11 rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="pw">Passwort</Label>
              <button type="button" onClick={handleForgot} className="text-xs font-medium text-accent-blue hover:underline">
                Passwort vergessen?
              </button>
            </div>
            <div className="relative">
              <Input
                id="pw"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Dein Passwort"
                minLength={8}
                required
                className="h-11 rounded-xl pr-10"
                autoComplete="current-password"
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
          </div>

          {errorMsg && <FormFehler>{errorMsg}</FormFehler>}

          <Button type="submit" size="lg" disabled={loading} className={kontoCta}>
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />Anmeldung läuft …</> : "Anmelden"}
          </Button>
        </form>

        <div className="mt-6 border-t border-border pt-5 text-center text-sm text-muted-foreground">
          Neu hier?{" "}
          <button onClick={() => setMode("signup")} className="font-semibold text-accent-blue hover:underline">
            Kostenlos registrieren
          </button>
        </div>
      </KontoRahmen>
    );
  }

  // Interaktiver 2-Spalten-Signup im Revolut × Lexoffice Stil
  const activeGoal = SIGNUP_GOALS.find((g) => g.id === goal) ?? SIGNUP_GOALS[0];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-white">
        <div className="container flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <Link to="/" aria-label="GründerX, zur Startseite" className="inline-flex items-center gap-2.5">
            <Logo asImage className="h-7 w-7" />
            <span className="text-[17px] font-bold tracking-tight text-primary">GründerX</span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-muted-foreground sm:inline">Schon dabei?</span>
            <button
              type="button"
              onClick={() => setMode("signin")}
              className="rounded-xl border border-border bg-white px-3.5 py-1.5 text-sm font-semibold text-primary hover:bg-secondary"
            >
              Anmelden
            </button>
          </div>
        </div>
      </header>

      <main className="container max-w-5xl flex-1 px-4 py-7 md:py-12">
        <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-10">
          {/* Links: Interaktiver Ziel-Konfigurator */}
          <section className="order-2 space-y-5 lg:order-1 lg:pt-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green-soft px-3 py-1 text-xs font-semibold text-brand-green">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Kostenloses Konto · ohne Kreditkarte
              </span>
              <h1 className="mt-3 text-balance text-2xl font-bold leading-tight tracking-[-0.025em] text-primary sm:text-3xl md:text-[2.1rem]">
                Starte mit einem klaren Fahrplan statt 20 offenen Tabs.
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                Wähle kurz dein Hauptziel, dann richten wir dein Cockpit direkt passend ein.
              </p>
            </div>

            {/* Interaktive Ziel-Auswahl */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Wobei soll GründerX dir zuerst helfen?
              </p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Dein erstes Ziel">
                {SIGNUP_GOALS.map((g) => {
                  const Icon = g.icon;
                  const active = goal === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => selectGoal(g.id)}
                      className={cn(
                        "press inline-flex min-h-10 items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors sm:text-sm",
                        active
                          ? "border-primary bg-primary text-white shadow-sm"
                          : "border-border bg-white text-foreground/85 hover:border-primary/40 hover:text-primary",
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {g.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live-Vorschau des Startpakets */}
            <div className="relative overflow-hidden rounded-2xl border border-border bg-white p-5 pl-6 shadow-card">
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-brand-green" />
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-green">Direkt nach dem Login bereit</p>
              <h2 className="mt-1 text-base font-bold text-primary">{activeGoal.headline}</h2>
              <ul className="mt-3 space-y-2.5 text-sm text-foreground/90">
                {activeGoal.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green-soft text-brand-green">
                      <Check className="h-3 w-3" strokeWidth={2.75} aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3 text-xs text-muted-foreground tabular">
                <span><strong className="text-primary">{GUIDE_COUNT}</strong> Kurse</span>
                <span><strong className="text-primary">{TOOL_COUNT}</strong> Rechner &amp; Tools</span>
                <span><strong className="text-primary">{ANBIETER_ANZAHL}</strong> Anbieter im Vergleich</span>
              </div>
            </div>

            {/* Direkter 1€-Startangebot-Shortcut */}
            <div className="rounded-2xl border border-border bg-white p-5 shadow-card">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-primary">Lieber sofort vollen Zugang testen?</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    7 Tage alle Kurse, Tools und Felix für 1 €, danach {formatEurCents(PLANS.gruenderx.grossCents)}/Monat (jederzeit kündbar).
                  </p>
                </div>
                <div className="sm:w-52 shrink-0">
                  <StartAngebotButton variant="outline" cta="auth-signup-trial" />
                </div>
              </div>
            </div>
          </section>

          {/* Rechts: Reibungsloses Signup-Formular */}
          <section className="order-1 rounded-2xl border border-border bg-white p-6 shadow-soft sm:p-7 lg:order-2">
            <div className="mb-4 flex items-center justify-between text-xs font-semibold text-muted-foreground">
              <span className="text-primary">Schritt 1 von 2: Konto anlegen</span>
              <span>ca. 30 Sek.</span>
            </div>
            <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-1/2 rounded-full bg-brand-green" />
            </div>

            {/* 1-Klick Google Signup ganz oben */}
            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled={loading}
              onClick={handleGoogleAuth}
              className="press h-12 w-full gap-2.5 rounded-xl border-border bg-white text-sm font-semibold text-foreground shadow-sm hover:border-primary/40 hover:bg-secondary/40"
            >
              <GoogleIcon />
              Mit Google kostenlos starten
            </Button>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-white px-2.5 text-muted-foreground">oder mit E-Mail</span></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="first" className="text-xs font-semibold">Vorname</Label>
                  <Input
                    id="first"
                    value={firstName}
                    onChange={(e) => { markSignupStarted(); setFirstName(e.target.value); }}
                    placeholder="Max"
                    required
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="last" className="text-xs font-semibold">Nachname</Label>
                  <Input
                    id="last"
                    value={lastName}
                    onChange={(e) => { markSignupStarted(); setLastName(e.target.value); }}
                    placeholder="Mustermann"
                    required
                    className="h-11 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs font-semibold">E-Mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { markSignupStarted(); setEmail(e.target.value); }}
                  placeholder="du@firma.de"
                  required
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="pw" className="text-xs font-semibold">Passwort</Label>
                <div className="relative">
                  <Input
                    id="pw"
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mindestens 8 Zeichen"
                    minLength={8}
                    required
                    className="h-11 rounded-xl pr-10"
                    autoComplete="new-password"
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
                <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] font-medium">
                  {[
                    { ok: pwChecks.length, label: "8+ Zeichen" },
                    { ok: pwChecks.digit, label: "1 Zahl" },
                    { ok: pwChecks.special, label: "1 Sonderzeichen" },
                  ].map((c) => (
                    <span
                      key={c.label}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-md px-2 py-0.5",
                        c.ok ? "bg-brand-green-soft text-brand-green" : "bg-secondary text-muted-foreground",
                      )}
                    >
                      {c.ok ? "✓" : "○"} {c.label}
                    </span>
                  ))}
                </div>
              </div>

              {errorMsg && <FormFehler>{errorMsg}</FormFehler>}

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="press h-12 w-full rounded-xl bg-primary text-sm font-semibold text-white hover:bg-primary/90"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    Konto wird erstellt …
                  </>
                ) : (
                  <>
                    Kostenloses Konto erstellen <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </Button>
            </form>

            <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
              Mit der Registrierung akzeptierst du unsere{" "}
              <Link to="/agb" className="underline hover:text-foreground">AGB</Link> und{" "}
              <Link to="/datenschutz" className="underline hover:text-foreground">Datenschutzerklärung</Link>. {WERBE_HINWEIS}
            </p>

            <p className="mt-4 flex items-center justify-center gap-1.5 border-t border-border pt-4 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              EU-Server (Frankfurt) · Fragen?{" "}
              <a href={`mailto:${SUPPORT_MAIL}`} className="font-medium text-foreground hover:underline">
                {SUPPORT_MAIL}
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

const GoogleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z" />
  </svg>
);

export default Auth;
