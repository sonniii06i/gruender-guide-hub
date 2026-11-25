import { Button } from "@/components/ui/button";
import { Check, Loader2, ShoppingCart, PackageCheck, ClipboardList } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ladeSupabase } from "@/integrations/supabase/lazy";
import { getStoredAffiliateRef } from "@/utils/affiliate";
import { checkoutAttribution } from "@/utils/checkoutAttribution";
import { trackMonetization } from "@/utils/analytics";
import {
  PLANS,
  PLAN_ORDER,
  SOLO_CONTENTS,
  NOT_INCLUDED,
  CANCEL_NOTE,
  FOUNDER_CODE,
  FOUNDER_KURZ,
  formatEurCents,
} from "@/config/pricing";
import { rememberCartVariant } from "@/lib/cart";
import { ANBIETER_ANZAHL, ANBIETER_KATEGORIEN, GUIDE_COUNT, TOOL_COUNT } from "@/data/kennzahlen";
import { toast } from "sonner";
import { ProductGallery, type GalleryImage } from "@/components/product/ProductGallery";
import { galerieBild } from "@/data/screenshots";
import { ProductBuyBox, eur, type Variant } from "@/components/product/ProductBuyBox";
import { SpecTable, type Spec } from "@/components/product/SpecTable";

const SOLO: Variant = PLANS.gruenderx;
const VARIANTS: Variant[] = PLAN_ORDER.map((id) => PLANS[id]);

const CHECKOUT: Record<string, { priceId: string; interval: "month" | "year" }> = Object.fromEntries(
  PLAN_ORDER.map((id) => [id, { priceId: PLANS[id].priceId, interval: PLANS[id].interval }]),
);

const SOLO_GALLERY: GalleryImage[] = [
  {
    src: galerieBild("uebersicht"),
    alt: "GründerX-Cockpit mit persönlichem Fahrplan, nächstem Schritt und den Terminen der nächsten 14 Tage",
    caption: "Dein Cockpit: der nächste Schritt aus deinem Fahrplan, dein Level und die nächsten Termine (Ansicht mit Beispieldaten)",
  },
  {
    src: galerieBild("rechtsform"),
    alt: "Rechtsform-Wizard mit Empfehlung UG und Begründung",
    caption: "Rechtsform-Wizard: wenige Fragen, dann eine klare Gegenüberstellung mit Fallstricken",
  },
  {
    src: galerieBild("steuerkalender"),
    alt: "Steuer- und Fristenkalender mit den Terminen der nächsten 12 Monate",
    caption: "Steuer- und Fristenkalender: alle Termine der nächsten 12 Monate für deine Situation",
  },
  {
    src: galerieBild("anbieter"),
    alt: `Anbieter-Vergleich mit ${ANBIETER_ANZAHL} Anbietern nach Kategorien`,
    caption: `Anbieter-Vergleich: ${ANBIETER_ANZAHL} Anbieter in ${ANBIETER_KATEGORIEN} Kategorien mit Stärken und Schwächen`,
  },
  {
    src: galerieBild("runway"),
    alt: "Runway-Rechner mit Ergebnis in Monaten",
    caption: "Runway-Rechner: wie lange dein Budget reicht und ab wann sich dein Projekt trägt",
  },
];

const GALLERY: Record<string, GalleryImage[]> = {
  gruenderx: SOLO_GALLERY,
  "gruenderx-year": SOLO_GALLERY,
};

const BASE_SPECS: Spec[] = [
  { label: "Kategorie", value: "Software-Abonnement (SaaS) für Gründung, Webseite, App, Steuern und Setup" },
  { label: "Lieferform", value: "Digital: Freischaltung im GründerX-Konto im Browser und als App" },
  { label: "Lieferzeit", value: "Sofort nach Zahlungsbestätigung durch Stripe (in der Regel unter einer Minute)" },
  { label: "Versandkosten", value: "0,00 € (digitaler Zugang, es wird nichts versendet)" },
  { label: "Kündigung", value: "Jederzeit im Konto, wirksam zum Ende der laufenden Abrechnungsperiode" },
  {
    label: "Preisangabe",
    value:
      "Endpreis inkl. 19 % USt. (AGB § 4 Abs. 1). An der Kasse wird nichts aufgeschlagen; für Unternehmer als Betriebsausgabe absetzbar. Für EU-Unternehmer mit gültiger USt-IdNr. gilt Reverse-Charge nach § 3a Abs. 2 UStG (USt-ID wird im Checkout erfasst).",
  },
  {
    label: "Nutzungsgrenzen",
    value:
      `Keine. Alle ${TOOL_COUNT} Tools, ${GUIDE_COUNT} interaktiven Guides, Arbeitsfenster und Felix unbegrenzt ohne Abrechnung pro Tool oder pro Frage.`,
  },
  {
    label: "Zahlungsarten",
    value:
      "Kreditkarte, Klarna, Apple Pay und Link. Welche Zahlarten genau erscheinen, zeigt der Checkout je nach Land und Gerät.",
  },
  {
    label: "Gutscheincode",
    value: "Im Stripe-Checkout unter „Promo-Code hinzufügen“. Ein Code pro Bestellung, nicht kombinierbar.",
  },
  { label: "Sprache", value: "Deutsch" },
  { label: "Voraussetzung", value: "Aktueller Webbrowser und Internetverbindung auf Desktop, Tablet oder Handy" },
  { label: "Datenhaltung", value: "Server in der EU, DSGVO-konform" },
  { label: "Anbieter", value: "Sonni Buttke, Einzelunternehmen (siehe Impressum)" },
  { label: "Nicht enthalten", value: NOT_INCLUDED },
];

const PRODUCTS: Record<string, { title: string; subtitle: string; contents: string[]; specs: Spec[] }> = {
  gruenderx: {
    title: "GründerX",
    subtitle: `Dein Lern-Studio und Cockpit für Gründung, Webseite, App, Steuern und US-Setup: ${GUIDE_COUNT} interaktive Guides, ${TOOL_COUNT} Tools und Felix in einem Zugang.`,
    contents: SOLO_CONTENTS,
    specs: [
      { label: "Artikelnummer", value: "GX-PRO-M" },
      { label: "Laufzeit", value: "1 Monat, verlängert sich automatisch um jeweils einen Monat" },
      ...BASE_SPECS,
    ],
  },
  "gruenderx-year": {
    title: "GründerX (Jahreszugang)",
    subtitle: "Derselbe volle Funktionsumfang, einmal jährlich abgerechnet mit zwei Monaten Ersparnis.",
    contents: SOLO_CONTENTS,
    specs: [
      { label: "Artikelnummer", value: "GX-PRO-Y" },
      { label: "Laufzeit", value: "12 Monate, verlängert sich automatisch um jeweils zwölf Monate" },
      {
        label: "Ersparnis",
        value: `${formatEurCents(PLANS["gruenderx-year"].anchorCents! - PLANS["gruenderx-year"].grossCents)} gegenüber zwölf Monatszahlungen (${formatEurCents(PLANS["gruenderx-year"].anchorCents!)}), entspricht zwei Monaten gratis`,
      },
      ...BASE_SPECS,
    ],
  },
};

export const Bundles = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>("gruenderx");

  const product = PRODUCTS[selected];
  const variant = VARIANTS.find((v) => v.id === selected) ?? SOLO;

  const handleCheckout = async (variantId: string) => {
    const { priceId, interval } = CHECKOUT[variantId] ?? CHECKOUT.gruenderx;
    rememberCartVariant(variantId);
    if (!user) {
      navigate(`/auth?mode=kauf&price=${priceId}`);
      return;
    }
    setLoading(variantId);
    trackMonetization.checkoutStarted(variantId);
    try {
      const supabase = await ladeSupabase();
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { priceId, interval, affiliateRef: getStoredAffiliateRef(), ...checkoutAttribution() },
      });
      if (error) {
        let msg = error.message;
        try {
          const body = await (error as { context?: { json?: () => Promise<{ error?: string }> } }).context?.json?.();
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
      throw new Error("Keine Checkout-URL erhalten. Bitte versuche es noch einmal.");
    } catch (e) {
      toast.error(e instanceof Error && e.message ? e.message : "Checkout fehlgeschlagen");
    } finally {
      setLoading(null);
    }
  };

  const busy = loading === selected;
  const [detailsOffen, setDetailsOffen] = useState(true);
  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) setDetailsOffen(false);
  }, []);

  return (
    <section id="bundles" className="border-y border-border bg-secondary/45 py-14 md:py-20">
      <div className="container max-w-6xl px-4">
        <p className="mb-6 inline-flex items-center rounded-full border border-border bg-card px-3 py-0.5 text-[12.5px] font-semibold text-primary shadow-sm">
          Transparente Preise
        </p>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,430px)]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery images={GALLERY[selected]} variant="screenshot" />
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
            <ProductBuyBox
              brand="GründerX"
              title={product.title}
              subtitle={product.subtitle}
              variants={VARIANTS}
              selected={selected}
              onSelect={setSelected}
              cancelNote={CANCEL_NOTE}
              seller="Sonni Buttke, Einzelunternehmen (Anbieter lt. Impressum)"
              paymentMethods="Kreditkarte · Klarna · Apple Pay · Link (weitere je nach Land und Gerät)"
            >
              <div className="space-y-2.5">
                <Button
                  size="lg"
                  data-cta={`kauf-${selected}`}
                  onClick={() => handleCheckout(selected)}
                  disabled={busy}
                  className="press h-14 w-full rounded-xl bg-gradient-primary text-base font-semibold text-primary-foreground hover:opacity-95"
                >
                  {busy ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Jetzt kaufen: {eur(variant.grossCents)}/{variant.period === "year" ? "Jahr" : "Monat"}
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  {user
                    ? "Weiter zur gesicherten Zahlung bei Stripe. Erst dort wird die Bestellung kostenpflichtig."
                    : "Weiter zur gesicherten Zahlung bei Stripe. Dein Konto entsteht direkt nach der Zahlung. Vor deiner Bestätigung wird nichts abgebucht."}
                </p>
                <p className="rounded-xl border border-brand-green/25 bg-brand-green-soft/60 px-3 py-2 text-center text-xs text-foreground">
                  Gutscheincode <span className="font-semibold text-primary">{FOUNDER_CODE.code}</span>: {FOUNDER_KURZ},
                  einlösbar an der Kasse unter „Promo-Code hinzufügen“.
                </p>
                <p className="text-center text-xs">
                  <Link to="/preise" className="font-semibold text-accent-blue hover:underline">
                    Alle Preise, Kündigung und Fragen zum Abo
                  </Link>
                </p>
              </div>
            </ProductBuyBox>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDetailsOffen((o) => !o)}
          aria-expanded={detailsOffen}
          className="mt-10 flex w-full items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 text-left font-semibold shadow-card md:hidden"
        >
          Lieferumfang &amp; Produktdetails
          <span aria-hidden="true" className="text-accent-blue">
            {detailsOffen ? "−" : "+"}
          </span>
        </button>

        <div className={cn("mt-14 grid gap-8 lg:grid-cols-2", !detailsOffen && "max-md:hidden", "max-md:mt-6")}>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-3 flex items-center gap-2.5 text-xl font-semibold text-primary">
              <PackageCheck className="h-5 w-5 text-brand-green" />
              Lieferumfang
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Alles im Zugang enthalten, ohne Abrechnung pro Guide, pro Tool oder pro Frage.
            </p>
            <ul className="space-y-3">
              {product.contents.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green-soft">
                    <Check className="h-3 w-3 text-brand-green" strokeWidth={2.75} />
                  </span>
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-3 flex items-center gap-2.5 text-xl font-semibold text-primary">
              <ClipboardList className="h-5 w-5 text-accent-blue" />
              Produktdetails
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Alle klaren Fakten zum Abo, wie auf einem Produkt-Etikett.
            </p>
            <SpecTable specs={product.specs} />
          </div>
        </div>
      </div>
    </section>
  );
};
