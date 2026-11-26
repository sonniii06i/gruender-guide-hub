import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAccess } from "@/hooks/useAccess";
import { supabase } from "@/integrations/supabase/client";
import { getStoredAffiliateRef } from "@/utils/affiliate";
import { checkoutAttribution } from "@/utils/checkoutAttribution";
import { trackMonetization } from "@/utils/analytics";
import { startAngebotCheckout } from "@/utils/startAngebot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Briefcase,
  Calculator,
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  Globe2,
  Loader2,
  Lock,
  LogOut,
  PackageCheck,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag,
  Target,
} from "lucide-react";
import { toast } from "sonner";
import {
  FOUNDER_CODE,
  FOUNDER_KURZ,
  PLANS,
  founderFirstInvoiceCents,
} from "@/config/pricing";
import { ANBIETER_ANZAHL, GUIDE_COUNT, TOOL_COUNT } from "@/data/kennzahlen";
import { normalizeCartVariant, readCartVariant, rememberCartVariant, type CartVariant } from "@/lib/cart";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";

const VAT_RATE = 0.19;
const eur = (cents: number) =>
  (cents / 100).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
const netOf = (gross: number) => Math.round(gross / (1 + VAT_RATE));
const perDay = (gross: number, days: number) => Math.round(gross / days);

type CheckoutOption = "trial" | CartVariant;

type FocusId = "gruendung" | "steuern" | "ecom" | "us" | "foerderung";

const FOCUS_TRACKS: {
  id: FocusId;
  label: string;
  icon: typeof Briefcase;
  unlocks: string[];
}[] = [
  {
    id: "gruendung",
    label: "Gründung & Rechtsform",
    icon: Briefcase,
    unlocks: [
      "Rechtsform-Wizard: Einzelunternehmen, UG & GmbH im Vergleich",
      "Gewerbeanmeldung-Wizard + Fragebogen steuerliche Erfassung",
      "Notar-, Handelsregister- & Transparenzregister-Checklisten",
    ],
  },
  {
    id: "steuern",
    label: "Steuern & Fristen",
    icon: Calculator,
    unlocks: [
      "Persönlicher Steuerkalender (mit .ics-Export & Erinnerungen)",
      "USt-Voranmeldung, Anlage EÜR, IAB- & Brutto-Netto-Rechner",
      "Rechnungs-Generator (PDF), E-Rechnung & DATEV-Mapper",
    ],
  },
  {
    id: "ecom",
    label: "Onlineshop & Amazon",
    icon: ShoppingBag,
    unlocks: [
      "Shop-Profit-Rechner mit USt., PayPal & Klickkosten",
      "LUCID-, WEEE/EAR-, CE/RoHS- & GPSR-Pflichten-Checks",
      "Amazon-Buchungscodes, EU-OSS & Schwellen-Check",
    ],
  },
  {
    id: "us",
    label: "US-LLC & Amex US",
    icon: Globe2,
    unlocks: [
      "Amex US Kurs: US-Adresse, Tello eSIM & Global Transfer aus DE",
      "US-LLC-Wizard, Sales-Tax-Nexus & DBA/CFC-Steuer-Rechner",
      "US-Banking-Vergleich: Mercury, Relay, Wise, Chase & BofA",
    ],
  },
  {
    id: "foerderung",
    label: "Förderung & Credits",
    icon: Target,
    unlocks: [
      "Gründungszuschuss-, Einstiegsgeld- & BAFA-Checks",
      "Förder-Datenbank & tagesaktuelles Chancen-Radar",
      "Startup-Guthaben: AWS, Google Cloud, Cloudflare, Notion & KI",
    ],
  },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { loading: accLoading, hasActiveSub, isAdmin, onboardingCompleted, known: accKnown, refresh } = useAccess();
  const [busy, setBusy] = useState(false);
  const [checking, setChecking] = useState(false);
  const [selectedFocus, setSelectedFocus] = useState<FocusId[]>(["gruendung", "steuern"]);
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const [option, setOption] = useState<CheckoutOption>(() => {
    const wanted = new URLSearchParams(window.location.search).get("variant");
    const norm = normalizeCartVariant(wanted) ?? readCartVariant();
    if (norm === "gruenderx-year") return "gruenderx-year";
    if (wanted === "gruenderx") return "gruenderx";
    return "trial";
  });

  const monat = PLANS.gruenderx;
  const jahr = PLANS["gruenderx-year"];
  const jahrSaving = (jahr.anchorCents ?? 0) - jahr.grossCents;

  const isTrial = option === "trial";
  const isYear = option === "gruenderx-year";
  const activePlan = isYear ? jahr : monat;
  const todayGrossCents = isTrial
    ? 100
    : promoApplied && !isYear
      ? founderFirstInvoiceCents(monat.grossCents)
      : activePlan.grossCents;
  const netCents = netOf(todayGrossCents);
  const vatCents = todayGrossCents - netCents;

  const selectOption = (next: CheckoutOption) => {
    setOption(next);
    if (next !== "trial") rememberCartVariant(next);
    if (next !== "gruenderx") setPromoApplied(false);
  };

  const toggleFocus = (id: FocusId) => {
    setSelectedFocus((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((x) => x !== id)
          : prev
        : [...prev, id],
    );
  };

  const applyPromo = () => {
    const clean = promoInput.trim().toUpperCase();
    if (!clean) return;
    if (clean === FOUNDER_CODE.code) {
      setPromoApplied(true);
      if (option !== "gruenderx") setOption("gruenderx");
      navigator.clipboard?.writeText(FOUNDER_CODE.code).catch(() => {});
      toast.success(`Code ${FOUNDER_CODE.code} vorgemerkt und kopiert. Bitte im Stripe-Feld „Promo-Code“ einfügen.`);
    } else {
      toast.info(`Code „${clean}“ kannst du direkt im nächsten Schritt an der Stripe-Kasse eingeben.`);
    }
  };

  const handleStatusCheck = async () => {
    setChecking(true);
    try {
      await refresh();
      const { data } = await supabase
        .from("subscriptions")
        .select("status, comp_access")
        .eq("user_id", user!.id)
        .maybeSingle();
      const active =
        data?.status === "active" ||
        data?.status === "trialing" ||
        !!(data as { comp_access?: boolean } | null)?.comp_access;
      if (active || isAdmin) {
        toast.success("Abo aktiv, du wirst weitergeleitet …");
      } else {
        toast.info("Noch keine aktive Bestellung gefunden. Nach einer Zahlung kann es einen Moment dauern.");
      }
    } catch {
      toast.error("Status konnte nicht geprüft werden.");
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth?mode=kauf", { replace: true });
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (accLoading) return;
    if (hasActiveSub || isAdmin) {
      navigate("/dashboard", { replace: true });
      return;
    }
    if (accKnown && !onboardingCompleted) {
      navigate("/onboarding", { replace: true });
    }
  }, [accLoading, accKnown, hasActiveSub, isAdmin, onboardingCompleted, navigate]);

  const startPayment = async () => {
    setBusy(true);
    if (isTrial) {
      try {
        const res = await startAngebotCheckout(true);
        if (res === "kein_neukunde") {
          toast.info("Das 7-Tage-Startangebot gilt nur für Neukunden. Wir haben auf den Monatszugang umgestellt.");
          setOption("gruenderx");
          setBusy(false);
        } else if (res === "onboarding") {
          navigate("/onboarding");
        } else if (res !== "weiter") {
          setBusy(false);
        }
      } catch (e: any) {
        toast.error(e?.message ?? "Checkout fehlgeschlagen");
        setBusy(false);
      }
      return;
    }

    trackMonetization.checkoutStarted(activePlan.id, activePlan.grossCents);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          priceId: activePlan.priceId,
          interval: activePlan.interval,
          affiliateRef: getStoredAffiliateRef(),
          ...checkoutAttribution(),
        },
      });
      if (error) {
        let msg = error.message;
        try {
          const body = await (error as any)?.context?.json?.();
          if (body?.error) msg = body.error;
        } catch {
          /* ignore */
        }
        if (msg?.includes("Onboarding")) {
          navigate("/onboarding");
          return;
        }
        throw new Error(msg);
      }
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error("Keine Checkout-URL erhalten, bitte erneut versuchen.");
    } catch (e: any) {
      toast.error(e.message ?? "Checkout fehlgeschlagen");
      setBusy(false);
    }
  };

  if (authLoading || accLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const activeTracks = FOCUS_TRACKS.filter((t) => selectedFocus.includes(t.id));

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Ruhiger Revolut × Lexoffice Kopf */}
      <header className="border-b border-border bg-white">
        <div className="container flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <Link to="/" className="flex items-center gap-2.5">
            <Logo asImage className="h-7 w-7" />
            <span className="text-[17px] font-bold tracking-tight text-primary">GründerX</span>
          </Link>
          <div className="flex shrink-0 items-center gap-1.5">
            <Button variant="ghost" size="sm" onClick={handleStatusCheck} disabled={checking} className="whitespace-nowrap rounded-xl px-2.5 text-xs sm:text-sm">
              {checking && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
              {checking ? "Prüfe …" : "Status prüfen"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="whitespace-nowrap rounded-xl px-2.5 text-xs sm:text-sm"
              onClick={async () => {
                await signOut();
                navigate("/auth");
              }}
            >
              <LogOut className="mr-1.5 h-3.5 w-3.5" /> Abmelden
            </Button>
          </div>
        </div>
      </header>

      <div className="container max-w-6xl px-4 pt-7 md:pt-9">
        {/* Visuelle 3-Schritt-Leiste */}
        <ol className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold">
          {[
            { label: "Konto erstellt", done: true },
            { label: "Zugang konfigurieren", active: true },
            { label: "Sichere Stripe-Kasse", active: false },
            { label: "Sofort freigeschaltet", active: false },
          ].map((s, idx) => (
            <li
              key={s.label}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5",
                s.done
                  ? "bg-brand-green-soft text-brand-green"
                  : s.active
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white text-muted-foreground ring-1 ring-border",
              )}
            >
              {s.done ? (
                <Check className="h-3.5 w-3.5" strokeWidth={2.75} aria-hidden="true" />
              ) : (
                <span className="tabular">{idx + 1}.</span>
              )}
              {s.label}
            </li>
          ))}
        </ol>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_370px] lg:items-start">
          {/* Linke Konfigurator-Spalte */}
          <div className="space-y-5">
            {/* 1. Plan-Wahl */}
            <section className="rounded-2xl border border-border bg-white p-5 shadow-card md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
                    Deinen GründerX-Zugang wählen
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Ein Zugang, alles drin: {GUIDE_COUNT} Kurse, {TOOL_COUNT} Tools, {ANBIETER_ANZAHL} Anbieter und Felix.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green-soft px-3 py-1 text-xs font-semibold text-brand-green">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> Sofort verfügbar
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Tarif wählen">
                {[
                  {
                    id: "trial" as const,
                    tag: "Startangebot",
                    tagCls: "bg-brand-green text-white",
                    title: "7 Tage testen",
                    price: "1,00 €",
                    unit: "für 7 Tage",
                    hint: `Danach ${eur(monat.grossCents)}/Mon., jederzeit kündbar`,
                  },
                  {
                    id: "gruenderx" as const,
                    tag: "Flexibel",
                    tagCls: "bg-secondary text-primary",
                    title: "Monatlich",
                    price: eur(monat.grossCents),
                    unit: "/ Monat",
                    hint: `${eur(perDay(monat.grossCents, 30))} pro Tag · monatlich kündbar`,
                  },
                  {
                    id: "gruenderx-year" as const,
                    tag: `${eur(jahrSaving)} sparen`,
                    tagCls: "bg-accent text-primary",
                    title: "Jährlich",
                    price: eur(jahr.grossCents),
                    unit: "/ Jahr",
                    hint: `${eur(perDay(jahr.grossCents, 365))} pro Tag · 2 Monate gratis`,
                  },
                ].map((opt) => {
                  const active = option === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => selectOption(opt.id)}
                      className={cn(
                        "press flex flex-col rounded-2xl border-2 p-4 text-left transition-colors",
                        active ? "border-primary bg-accent/35 shadow-sm" : "border-border bg-white hover:border-primary/35",
                      )}
                    >
                      <span className={cn("w-fit rounded-md px-2 py-0.5 text-[11px] font-semibold", opt.tagCls)}>
                        {opt.tag}
                      </span>
                      <span className="mt-2.5 text-sm font-bold text-primary">{opt.title}</span>
                      <span className="mt-1 text-2xl font-bold tracking-tight text-primary tabular">{opt.price}</span>
                      <span className="text-xs text-muted-foreground">{opt.unit}</span>
                      <span className="mt-2.5 border-t border-border/70 pt-2 text-[11px] leading-snug text-muted-foreground">
                        {opt.hint}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 2. Interaktiver Fokus-Check: Was schaltest du konkret frei? */}
            <section className="rounded-2xl border border-border bg-white p-5 shadow-card md:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="flex items-center gap-2 text-base font-bold text-primary">
                    <Sparkles className="h-4 w-4 text-accent-blue" aria-hidden="true" />
                    Wofür nutzt du GründerX zuerst?
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Klick deine Themen an und sieh direkt, was sofort für dich bereitsteht (alle Themen sind immer enthalten).
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {FOCUS_TRACKS.map((t) => {
                  const Icon = t.icon;
                  const active = selectedFocus.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleFocus(t.id)}
                      className={cn(
                        "press inline-flex min-h-9 items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors",
                        active
                          ? "border-primary bg-primary text-white"
                          : "border-border bg-secondary/40 text-foreground/85 hover:border-primary/40",
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {t.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 rounded-xl border border-border bg-[#F8FAFC] p-4">
                <p className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                  <PackageCheck className="h-4 w-4 text-brand-green" aria-hidden="true" />
                  Für deine Auswahl direkt im Cockpit freigeschaltet
                </p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {activeTracks.flatMap((t) =>
                    t.unlocks.map((u) => (
                      <li key={u} className="flex items-start gap-2 text-xs leading-relaxed text-foreground">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green" strokeWidth={2.75} aria-hidden="true" />
                        <span>{u}</span>
                      </li>
                    )),
                  )}
                </ul>
              </div>
            </section>

            {/* 3. Ablauf-Timeline: Keine Überraschungen */}
            <section className="rounded-2xl border border-border bg-white p-5 shadow-card md:p-6">
              <h2 className="text-base font-bold text-primary">So geht es nach dem Klick weiter</h2>
              <ol className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    nr: "01",
                    title: "Sichere Stripe-Kasse",
                    text: "Bezahle bequem per Apple Pay, Karte oder Klarna. USt-ID kannst du direkt angeben.",
                  },
                  {
                    nr: "02",
                    title: "Sofort im Cockpit",
                    text: "Du wirst automatisch zurückgeleitet. Alle 81 Kurse, 90 Tools und Felix sind sofort aktiv.",
                  },
                  {
                    nr: "03",
                    title: "Volle Kontrolle",
                    text: "USt-Rechnung kommt automatisch. Kündigung jederzeit mit 1 Klick im Konto oder über /kuendigen.",
                  },
                ].map((s) => (
                  <li key={s.nr} className="rounded-xl border border-border bg-secondary/35 p-3.5">
                    <span className="text-xs font-bold text-brand-green tabular">Schritt {s.nr}</span>
                    <p className="mt-1 text-sm font-bold text-primary">{s.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.text}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          {/* Rechte Sticky Bestellübersicht */}
          <aside className="lg:sticky lg:top-8">
            <div className="rounded-2xl border-2 border-primary bg-white p-5 shadow-soft md:p-6">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base font-bold text-primary">Bestellübersicht</h2>
                <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                  {isTrial ? "Startangebot" : `Art.-Nr. ${activePlan.sku}`}
                </span>
              </div>

              <dl className="mt-4 space-y-2.5 text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-muted-foreground">
                    {isTrial
                      ? "7-Tage-Startangebot"
                      : isYear
                        ? "GründerX · Jährlich"
                        : "GründerX · Monatlich"}
                  </dt>
                  <dd className="font-semibold text-foreground tabular">
                    {isTrial ? "1,00 €" : eur(activePlan.grossCents)}
                  </dd>
                </div>

                {isYear && (
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-muted-foreground">Jahresvorteil (2 Monate gratis)</dt>
                    <dd className="font-semibold text-brand-green tabular">−{eur(jahrSaving)}</dd>
                  </div>
                )}

                {promoApplied && !isTrial && !isYear && (
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-brand-green">Gutscheincode {FOUNDER_CODE.code} (1. Monat)</dt>
                    <dd className="font-semibold text-brand-green tabular">
                      −{eur(monat.grossCents - todayGrossCents)}
                    </dd>
                  </div>
                )}

                <div className="flex items-baseline justify-between gap-4 border-t border-border pt-2.5 text-xs">
                  <dt className="text-muted-foreground">Nettobetrag</dt>
                  <dd className="tabular text-muted-foreground">{eur(netCents)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 text-xs">
                  <dt className="text-muted-foreground">enthaltene 19 % USt.</dt>
                  <dd className="tabular text-muted-foreground">{eur(vatCents)}</dd>
                </div>

                <div className="flex items-baseline justify-between gap-4 border-t-2 border-border pt-3">
                  <div>
                    <dt className="font-bold text-primary">Heute fällig</dt>
                    <p className="text-[11px] text-muted-foreground">
                      {isTrial ? `danach ${eur(monat.grossCents)}/Monat` : isYear ? "einmal jährlich" : "monatlich kündbar"}
                    </p>
                  </div>
                  <dd className="text-2xl font-extrabold text-primary tabular">{eur(todayGrossCents)}</dd>
                </div>
              </dl>

              {/* Interaktiver Gutscheincode-Bereich (bei Monatsplan) */}
              {!isTrial && !isYear && (
                <div className="mt-4 rounded-xl border border-border bg-secondary/40 p-3">
                  {!promoOpen ? (
                    <button
                      type="button"
                      onClick={() => setPromoOpen(true)}
                      className="flex w-full items-center justify-between text-xs font-semibold text-primary hover:text-accent-blue"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <Tag className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
                        Gutscheincode vorhanden? ({FOUNDER_CODE.code}: {FOUNDER_KURZ})
                      </span>
                      <span>Einlösen</span>
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-1.5">
                        <Input
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder={FOUNDER_CODE.code}
                          aria-label="Gutscheincode"
                          className="h-9 rounded-lg bg-white text-xs uppercase"
                        />
                        <Button type="button" size="sm" onClick={applyPromo} className="h-9 rounded-lg px-3 text-xs">
                          Prüfen
                        </Button>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setPromoInput(FOUNDER_CODE.code);
                          setPromoApplied(true);
                          navigator.clipboard?.writeText(FOUNDER_CODE.code).catch(() => {});
                          toast.success(`Code ${FOUNDER_CODE.code} kopiert für die Stripe-Kasse.`);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-green hover:underline"
                      >
                        <Copy className="h-3 w-3" aria-hidden="true" />
                        {FOUNDER_CODE.code} direkt übernehmen &amp; kopieren
                      </button>
                    </div>
                  )}
                </div>
              )}

              <Button
                onClick={startPayment}
                disabled={busy}
                size="lg"
                className="press mt-5 h-12 w-full rounded-xl bg-primary text-sm font-semibold text-white hover:bg-primary/90"
              >
                {busy ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Lock className="mr-2 h-4 w-4" aria-hidden="true" />
                )}
                {isTrial
                  ? "7 Tage für 1,00 € starten"
                  : `Zur Kasse · ${eur(todayGrossCents)}`}
                {!busy && <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />}
              </Button>
              <p className="mt-2 text-center text-[11px] leading-relaxed text-muted-foreground">
                Weiter zur gesicherten Zahlung bei Stripe. Erst dort wird die Bestellung kostenpflichtig abgeschlossen.
              </p>

              <ul className="mt-4 space-y-1.5 border-t border-border pt-4 text-[11px] text-muted-foreground">
                <li className="flex items-center gap-2"><Lock className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" /> SSL-verschlüsselt, Zahlung über Stripe</li>
                <li className="flex items-center gap-2"><CreditCard className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" /> Karte · Klarna · Apple Pay · Link · USt-ID</li>
                <li className="flex items-center gap-2">
                  <RefreshCw className="h-3.5 w-3.5 shrink-0 text-brand-green" aria-hidden="true" />
                  {isYear
                    ? "Kündbar zum Ende der 12-Monats-Laufzeit"
                    : "Jederzeit mit 1 Klick kündbar, keine Mindestlaufzeit"}
                </li>
                <li className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 shrink-0 text-brand-green" aria-hidden="true" /> DSGVO-konform, Server in Frankfurt</li>
              </ul>

              <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                Angegebene Preise sind Endpreise inkl. 19 % USt. (AGB § 4 Abs. 1). Widerrufsrecht für Verbraucher nach § 355 BGB:{" "}
                <Link to="/widerruf" className="underline hover:text-foreground">Widerrufsbelehrung</Link>. Verkauf durch Sonni Buttke, Einzelunternehmen.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
