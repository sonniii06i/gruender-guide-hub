import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAccess } from "@/hooks/useAccess";
import { supabase } from "@/integrations/supabase/client";
import { getStoredAffiliateRef } from "@/utils/affiliate";
import { Button } from "@/components/ui/button";
import {
  Loader2, Check, LogOut, Lock, RefreshCw, ShieldCheck, ShoppingCart,
  Truck, Tag, ChevronRight, PackageCheck, CreditCard,
} from "lucide-react";
import { toast } from "sonner";
import { STRIPE_PRICES } from "@/lib/stripe";
import { readCartPrice, rememberCartPrice } from "@/lib/cart";
import Logo from "@/components/Logo";
import { UseCasesShowcase } from "@/components/landing/UseCasesShowcase";

/* ---------------------------------------------------------------------------
   /checkout ist der Warenkorb — die Seite zwischen Produktblock und Kasse.
   Aufbau wie im Shop: Schrittanzeige, Position links, Bestellübersicht rechts.

   Vorher standen hier zwei Plan-Kacheln. Für jemanden, der auf der Startseite
   schon auf "Bundle sichern" geklickt hatte, war das die zweite Entscheidung
   für dieselbe Sache — und nirgends stand, was am Monatsende tatsächlich vom
   Konto geht. Genau das erwartet man beim Kauf einer Ware und bekommt es bei
   Software fast nie: Artikelnummer, Nettobetrag, Umsatzsteuer, Endbetrag.

   Alle Beträge sind NETTO (AGB § 4 Abs. 1). Brutto wird gerechnet, nicht
   getippt — sonst laufen die Zahlen bei der nächsten Preisänderung auseinander.
   --------------------------------------------------------------------------- */

const VAT_RATE = 0.19;

const eur = (cents: number) =>
  (cents / 100).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

type Item = {
  priceId: string;
  name: string;
  sku: string;
  netCents: number;
  anchorCents?: number;
  image: string;
  contents: string[];
};

const ITEMS: Item[] = [
  {
    priceId: STRIPE_PRICES.gruenderx,
    name: "GründerX — Einzelzugang",
    sku: "GX-PRO-M",
    netCents: 6499,
    image: "/mascots/felix-pricecard.webp",
    contents: [
      "Felix — KI-Gründungs-Co-Pilot",
      "Alle Wizards und Cockpits",
      "Steuer-Cockpit: USt, OSS, IAB, Fristen",
      "Marketplace- und Brand-Compliance-Setup",
      "Anbieter-Vergleich und Coop-Deals",
      "E-Mail-Support",
    ],
  },
  {
    priceId: STRIPE_PRICES.bundle,
    name: "Founder-Set — GründerX + AnwaltX",
    sku: "GX-AX-SET-M",
    netCents: 9999,
    anchorCents: 12998,
    image: "/mascots/bundle-duo.webp",
    contents: [
      "Alles aus dem GründerX-Einzelzugang",
      "Juri — KI-Rechts-Assistentin (AnwaltX)",
      "Vertragsprüfung und Vertragsgenerator",
      "Abmahn- und Streitfall-Hilfe",
      "Felix und Juri gemeinsam im Chat",
      "Priorisierter Support",
    ],
  },
];

const Steps = ({ current }: { current: number }) => {
  const steps = ["Warenkorb", "Zahlung", "Freischaltung"];
  return (
    <ol className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
      {steps.map((label, i) => (
        <li key={label} className="flex items-center gap-2">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
              i <= current ? "bg-gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {i + 1}
          </span>
          <span className={i === current ? "font-semibold text-foreground" : "text-muted-foreground"}>{label}</span>
          {i < steps.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground/60" />}
        </li>
      ))}
    </ol>
  );
};

const Checkout = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { loading: accLoading, hasActiveSub, isAdmin, onboardingCompleted, refresh } = useAccess();
  const [busy, setBusy] = useState(false);
  const [checking, setChecking] = useState(false);
  // Vorauswahl aus dem Produktblock. Ohne gemerkte Wahl liegt der Einzelzugang
  // im Korb — der günstigere Artikel, nicht der teurere.
  const [priceId, setPriceId] = useState<string>(() => readCartPrice() ?? STRIPE_PRICES.gruenderx);

  const item = ITEMS.find((i) => i.priceId === priceId) ?? ITEMS[0];
  const vatCents = Math.round(item.netCents * VAT_RATE);
  const grossCents = item.netCents + vatCents;

  const selectItem = (id: string) => {
    setPriceId(id);
    rememberCartPrice(id);
  };

  const handleStatusCheck = async () => {
    setChecking(true);
    try {
      await refresh();
      const { data } = await supabase
        .from("subscriptions")
        .select("status")
        .eq("user_id", user!.id)
        .maybeSingle();
      const active = data?.status === "active" || data?.status === "trialing";
      if (active || isAdmin) {
        toast.success("Abo aktiv – du wirst weitergeleitet …");
      } else {
        toast.info("Noch keine aktive Bestellung gefunden. Nach einer Zahlung kann es einen Moment dauern – sonst oben zur Kasse gehen.");
      }
    } catch {
      toast.error("Status konnte nicht geprüft werden.");
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (accLoading) return;
    if (hasActiveSub || isAdmin) {
      navigate("/dashboard", { replace: true });
      return;
    }
    if (!onboardingCompleted) {
      navigate("/onboarding", { replace: true });
    }
  }, [accLoading, hasActiveSub, isAdmin, onboardingCompleted, navigate]);

  const checkout = async () => {
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", { body: { priceId, affiliateRef: getStoredAffiliateRef() } });
      if (error) {
        // Den echten Backend-Fehler aus der Response ziehen (sonst nur "non-2xx status code").
        let msg = error.message;
        try {
          const body = await (error as any)?.context?.json?.();
          if (body?.error) msg = body.error;
        } catch { /* ignore */ }
        if (msg?.includes("Onboarding")) { navigate("/onboarding"); return; }
        throw new Error(msg);
      }
      if (data?.url) { window.location.href = data.url; return; }
      throw new Error("Keine Checkout-URL erhalten – bitte erneut versuchen.");
    } catch (e: any) { toast.error(e.message ?? "Checkout fehlgeschlagen"); setBusy(false); }
  };

  if (authLoading || accLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-accent-blue" /></div>;
  }

  return (
    <div className="min-h-screen bg-hero">
      <div className="container max-w-6xl py-8">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="font-bold tracking-tight">GründerX</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleStatusCheck} disabled={checking}>
              {checking && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
              {checking ? "Prüfe …" : "Status prüfen"}
            </Button>
            <Button variant="ghost" size="sm" onClick={async () => { await signOut(); navigate("/auth"); }}>
              <LogOut className="mr-1 h-4 w-4" /> Abmelden
            </Button>
          </div>
        </div>

        <Steps current={0} />

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Dein Warenkorb</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          1 Artikel · digitale Lieferung · es wird nichts abgebucht, bevor du an der Kasse bestätigst.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          {/* ---------------- Position ---------------- */}
          <div className="space-y-5">
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
              <div className="flex flex-col gap-4 p-5 sm:flex-row">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 shrink-0 self-center rounded-2xl bg-muted/40 object-contain p-2 sm:self-start"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h2 className="text-lg font-bold">{item.name}</h2>
                      <p className="text-xs text-muted-foreground">Art.-Nr. {item.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{eur(item.netCents)}</p>
                      {item.anchorCents && (
                        <p className="text-xs text-muted-foreground line-through">{eur(item.anchorCents)}</p>
                      )}
                      <p className="text-xs text-muted-foreground">netto / Monat</p>
                    </div>
                  </div>

                  <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-success">
                    <Check className="h-4 w-4" /> Sofort verfügbar
                  </p>
                  <p className="mt-1 flex items-start gap-1.5 text-sm text-muted-foreground">
                    <Truck className="mt-0.5 h-4 w-4 shrink-0" /> Lieferung digital, 0,00 € — Freischaltung
                    unmittelbar nach der Zahlung
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">Menge: 1 Zugang</p>
                </div>
              </div>

              {/* Ausführung wechseln — im Warenkorb, nicht als neue Entscheidung
                  auf einer eigenen Seite. */}
              <div className="border-t border-border bg-secondary/30 px-5 py-4">
                <p className="mb-2 text-sm font-semibold">Ausführung</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {ITEMS.map((opt) => (
                    <button
                      key={opt.priceId}
                      type="button"
                      onClick={() => selectItem(opt.priceId)}
                      aria-pressed={opt.priceId === item.priceId}
                      className={`rounded-2xl border-2 p-3 text-left transition-all ${
                        opt.priceId === item.priceId
                          ? "border-accent-blue bg-accent-blue/5 shadow-sm"
                          : "border-border bg-card hover:border-accent-blue/40"
                      }`}
                    >
                      <span className="block text-sm font-semibold">{opt.name}</span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">
                        {eur(opt.netCents)} netto / Monat
                        {opt.anchorCents && <span className="ml-1.5 line-through">{eur(opt.anchorCents)}</span>}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-border px-5 py-4">
                <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <PackageCheck className="h-4 w-4 text-accent-blue" /> Im Lieferumfang enthalten
                </p>
                <ul className="grid gap-1.5 sm:grid-cols-2">
                  {item.contents.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-blue" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ---------------- Bestellübersicht ---------------- */}
          <aside className="lg:sticky lg:top-8">
            <div className="rounded-3xl border-2 border-accent-blue/30 bg-card p-5 shadow-card">
              <h2 className="text-base font-bold">Bestellübersicht</h2>

              <dl className="mt-4 space-y-2.5 text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-muted-foreground">Zwischensumme (1 Artikel)</dt>
                  <dd className="font-medium">{eur(item.netCents)}</dd>
                </div>
                {item.anchorCents && (
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-muted-foreground">Set-Vorteil gegenüber Einzelkauf</dt>
                    <dd className="font-medium text-success">−{eur(item.anchorCents - item.netCents)}</dd>
                  </div>
                )}
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="flex items-center gap-1.5 text-muted-foreground">
                    <Truck className="h-3.5 w-3.5" /> Lieferung
                  </dt>
                  <dd className="font-medium text-success">0,00 €</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="flex items-center gap-1.5 text-muted-foreground">
                    <Tag className="h-3.5 w-3.5" /> Gutscheincode
                  </dt>
                  <dd className="text-right text-xs text-muted-foreground">an der Kasse einlösbar</dd>
                </div>

                <div className="flex items-baseline justify-between gap-4 border-t border-border pt-2.5">
                  <dt className="text-muted-foreground">Nettobetrag</dt>
                  <dd className="font-medium">{eur(item.netCents)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-muted-foreground">zzgl. 19 % USt.</dt>
                  <dd className="font-medium">{eur(vatCents)}</dd>
                </div>

                <div className="flex items-baseline justify-between gap-4 border-t-2 border-border pt-3">
                  <dt className="font-bold">Gesamt / Monat</dt>
                  <dd className="text-2xl font-extrabold">{eur(grossCents)}</dd>
                </div>
              </dl>

              <Button
                onClick={checkout}
                disabled={busy}
                size="lg"
                className="mt-5 h-12 w-full rounded-full bg-gradient-primary font-semibold text-primary-foreground hover:opacity-95"
              >
                {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShoppingCart className="mr-2 h-4 w-4" />}
                Zur Kasse
              </Button>
              <p className="mt-2 text-center text-[11px] leading-relaxed text-muted-foreground">
                Weiter zur gesicherten Zahlung bei Stripe. Erst dort wird die Bestellung
                kostenpflichtig abgeschlossen.
              </p>

              <ul className="mt-4 space-y-1.5 border-t border-border pt-4 text-[11px] text-muted-foreground">
                <li className="flex items-center gap-2"><Lock className="h-3.5 w-3.5 shrink-0 text-accent-blue" /> SSL-verschlüsselt, Zahlung über Stripe</li>
                <li className="flex items-center gap-2"><CreditCard className="h-3.5 w-3.5 shrink-0 text-accent-blue" /> Kreditkarte · Apple&nbsp;Pay · Google&nbsp;Pay · USt-ID erfassbar</li>
                <li className="flex items-center gap-2"><RefreshCw className="h-3.5 w-3.5 shrink-0 text-accent-blue" /> Monatlich kündbar, keine Mindestlaufzeit</li>
                <li className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 shrink-0 text-accent-blue" /> DSGVO-konform, Server in der EU</li>
              </ul>

              <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                Laufzeit 1 Monat, verlängert sich automatisch. Kündigung jederzeit im Konto zum Ende des
                Abrechnungsmonats. Widerrufsrecht für Verbraucher nach § 355 BGB — Einzelheiten in der{" "}
                <Link to="/widerruf" className="underline hover:text-foreground">Widerrufsbelehrung</Link>.
                Verkauf und Bereitstellung durch Sonni Buttke, Einzelunternehmen.
              </p>
            </div>
          </aside>
        </div>

        {/* Bottom-of-Funnel: was im Zugang steckt */}
        <div className="mt-16">
          <UseCasesShowcase compact />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
