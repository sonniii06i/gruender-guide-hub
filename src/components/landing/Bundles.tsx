import { Button } from "@/components/ui/button";
import { Check, Loader2, ShoppingCart, PackageCheck, ClipboardList, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { getStoredAffiliateRef } from "@/utils/affiliate";
import { STRIPE_PRICES } from "@/lib/stripe";
import { rememberCartPrice } from "@/lib/cart";
import { toast } from "sonner";
import { ProductGallery, type GalleryImage } from "@/components/product/ProductGallery";
import { ProductBuyBox, eur, type Variant } from "@/components/product/ProductBuyBox";
import { SpecTable, type Spec } from "@/components/product/SpecTable";

/* ---------------------------------------------------------------------------
   Der Produktblock der Startseite — aufgebaut wie das Datenblatt einer Ware
   und nicht wie eine Pricing-Tabelle: Galerie links, Buy-Box rechts, darunter
   Lieferumfang und Produktdetails.

   Was gegenüber den alten Plan-Kacheln dazugekommen ist, sind genau die
   Angaben, die man bei einer Ware selbstverständlich erwartet und bei Software
   fast nie bekommt: Artikelnummer, Umsatzsteuer-Ausweis (§ 3 PAngV — die
   Kacheln zeigten den Nettopreis nackt, obwohl AGB § 4 Abs. 1 Nettopreise
   vereinbart), Lieferform, Lieferzeit, Kündigungsregel und Verkäufer.

   Die Kaufknöpfe verhalten sich unverändert: direkt in den Stripe-Checkout,
   für Ausgeloggte vorher über /auth. Am Funnel wurde nichts gedreht.
   --------------------------------------------------------------------------- */

const SOLO: Variant = {
  id: "gruenderx",
  name: "GründerX — Einzelzugang",
  sku: "GX-PRO-M",
  netCents: 6499,
};

const BUNDLE: Variant = {
  id: "bundle",
  name: "Founder-Set — GründerX + AnwaltX",
  sku: "GX-AX-SET-M",
  netCents: 9999,
  anchorCents: 12998,
  note: "Enthält zusätzlich den vollen AnwaltX-Zugang (Juri). Ein Konto, eine Abrechnung.",
};

const VARIANTS: Variant[] = [SOLO, BUNDLE];

const PRICE_ID: Record<string, string> = {
  gruenderx: STRIPE_PRICES.gruenderx,
  bundle: STRIPE_PRICES.bundle,
};

const GALLERY: Record<string, GalleryImage[]> = {
  gruenderx: [
    { src: "/mascots/felix-pricecard.webp", alt: "GründerX Einzelzugang — Felix mit Preiskarte", caption: "GründerX — Einzelzugang, monatlich" },
    { src: "/mascots/felix-hero-desk.webp", alt: "Felix am Schreibtisch mit dem Gründungs-Cockpit", caption: "Cockpit für Gründung, Steuern und Marketplace-Setup" },
    { src: "/mascots/felix-roadmap.webp", alt: "Felix vor der Gründungs-Roadmap", caption: "Roadmap: Rechtsform, Finanzamt, Anmeldungen — Schritt für Schritt" },
    { src: "/mascots/felix-boxes.webp", alt: "Felix mit Versandkartons für den Marketplace-Start", caption: "Marketplace-Setup: Amazon, Kaufland, Shopify, TikTok-Shop" },
  ],
  bundle: [
    { src: "/mascots/bundle-duo.webp", alt: "Felix von GründerX und Juri von AnwaltX stehen als Team nebeneinander", caption: "Founder-Set — beide Zugänge in einer Abrechnung" },
    { src: "/mascots/felix-pricecard.webp", alt: "GründerX als Teil des Sets", caption: "Enthält den vollen GründerX-Zugang" },
    { src: "/mascots/felix-present.webp", alt: "Felix überreicht das Founder-Set", caption: "23 % günstiger als beide Zugänge einzeln" },
  ],
};

const BASE_SPECS: Spec[] = [
  { label: "Kategorie", value: "Software-Abonnement (SaaS) — Gründung, Steuern, Marketplace-Setup" },
  { label: "Lieferform", value: "Digital — Freischaltung im GründerX-Konto, keine Installation, kein Datenträger" },
  { label: "Lieferzeit", value: "Sofort nach Zahlungsbestätigung durch Stripe (in der Regel unter einer Minute)" },
  { label: "Versandkosten", value: "0,00 € — es wird nichts versendet" },
  { label: "Laufzeit", value: "1 Monat, verlängert sich automatisch um jeweils einen Monat" },
  { label: "Kündigung", value: "Jederzeit im Konto, wirksam zum Ende des laufenden Abrechnungsmonats" },
  { label: "Zahlungsarten", value: "Kreditkarte, Apple Pay, Google Pay — weitere Zahlarten je nach Land im Stripe-Checkout. USt-ID wird dort erfasst." },
  { label: "Gutscheincode", value: "Im Stripe-Checkout unter „Promo-Code hinzufügen“ — ein Code pro Bestellung, nicht kombinierbar" },
  { label: "Sprache", value: "Deutsch" },
  { label: "Voraussetzung", value: "Aktueller Webbrowser und Internetverbindung — Desktop und Mobil" },
  { label: "Datenhaltung", value: "Server in der EU, DSGVO-konform" },
  { label: "Anbieter", value: "Sonni Buttke, Einzelunternehmen (siehe Impressum)" },
  {
    label: "Nicht enthalten",
    value:
      "Steuerberatung und Rechtsberatung im Einzelfall. GründerX ist eine Software und weder Steuerberatung noch Rechtsdienstleistung.",
  },
];

const PRODUCTS: Record<string, { title: string; subtitle: string; contents: string[]; specs: Spec[] }> = {
  gruenderx: {
    title: "GründerX",
    subtitle:
      "Dein KI-Co-Pilot Felix für Gründung, Steuern, Marketplaces und Brand-Launch — über 80 Wizards und Cockpits in einem Zugang.",
    contents: [
      "Felix — KI-Gründungs-Co-Pilot, unbegrenzt nutzbar",
      "DE-Gründung: Rechtsform, Finanzamt-Fragebogen, Steuer-Setup",
      "US-LLC- und HK-Limited-Wizards (EIN, ITIN, BOI, Banking)",
      "Steuer-Cockpit: USt, OSS, IAB, Fristen-Kalender",
      "Marketplace-Setup: Amazon, Kaufland, Shopify, Stripe, PayPal",
      "Brand-Compliance: WEEE/EAR, LUCID, BattG, GPSR, CPNP",
      "Anbieter-Vergleich: Banking, Buchhaltung, 3PL, Tracking",
      "E-Mail-Support",
    ],
    specs: [{ label: "Artikelnummer", value: "GX-PRO-M" }, ...BASE_SPECS],
  },
  bundle: {
    title: "Founder-Set: GründerX + AnwaltX",
    subtitle:
      "Gründung und Recht greifen ineinander. Felix und Juri zusammen in einem Konto — 23 % günstiger als beide Zugänge einzeln.",
    contents: [
      "Alles aus dem GründerX-Einzelzugang",
      "Juri — KI-Rechts-Assistentin (AnwaltX)",
      "Vertragsprüfung und Vertragsgenerator",
      "Abmahn- und Streitfall-Hilfe",
      "Rechtssichere Mails direkt versenden",
      "Felix und Juri gemeinsam im selben Chat",
      "Priorisierter Support",
    ],
    specs: [
      { label: "Artikelnummer", value: "GX-AX-SET-M" },
      { label: "Set-Inhalt", value: "2 Zugänge: GründerX + AnwaltX — ein Konto, eine Abrechnung" },
      ...BASE_SPECS.slice(1),
    ],
  },
};

export const Bundles = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>("bundle");

  const product = PRODUCTS[selected];
  const variant = VARIANTS.find((v) => v.id === selected) ?? SOLO;

  const handleCheckout = async (priceId: string) => {
    // Auswahl merken, bevor der Weg über /auth sie verschluckt.
    rememberCartPrice(priceId);
    if (!user) {
      navigate(`/auth?mode=signup&price=${priceId}`);
      return;
    }
    setLoading(priceId);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { priceId, affiliateRef: getStoredAffiliateRef() },
      });
      if (error) {
        let msg = error.message;
        try {
          const body = await (error as any)?.context?.json?.();
          if (body?.error) msg = body.error;
        } catch { /* ignore */ }
        if (msg?.includes("Onboarding")) { navigate("/onboarding"); return; }
        throw new Error(msg);
      }
      // Full-Page-Redirect statt window.open: kein Popup-Blocker (open nach await wird sonst geblockt)
      if (data?.url) { window.location.href = data.url; return; }
      throw new Error("Keine Checkout-URL erhalten – bitte erneut versuchen.");
    } catch (e: any) {
      toast.error(e.message ?? "Checkout fehlgeschlagen");
    } finally {
      setLoading(null);
    }
  };

  const busy = loading === PRICE_ID[selected];

  return (
    <section id="bundles" className="py-24 bg-secondary/40">
      <div className="container max-w-6xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent-blue">Produkt</p>

        {/* Galerie + Buy-Box */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery images={GALLERY[selected]} />
          </div>

          <ProductBuyBox
            brand="GründerX"
            title={product.title}
            subtitle={product.subtitle}
            variants={VARIANTS}
            selected={selected}
            onSelect={setSelected}
            cancelNote="Jederzeit im Konto kündbar, wirksam zum Ende des Abrechnungsmonats — danach keine weitere Abbuchung. Widerrufsrecht für Verbraucher nach § 355 BGB."
            seller="Sonni Buttke, Einzelunternehmen (Anbieter lt. Impressum)"
            paymentMethods="Kreditkarte · Apple Pay · Google Pay — weitere Zahlarten je nach Land im Stripe-Checkout"
          >
            <div className="space-y-2">
              <Button
                size="lg"
                onClick={() => handleCheckout(PRICE_ID[selected])}
                disabled={busy}
                className="h-14 w-full rounded-full bg-gradient-primary text-base font-semibold text-primary-foreground shadow-glow hover:opacity-95"
              >
                {busy ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Jetzt kaufen — {eur(variant.netCents)}/Monat
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                {user
                  ? "Weiter zur gesicherten Zahlung bei Stripe. Erst dort wird die Bestellung kostenpflichtig."
                  : "Erst Konto anlegen, dann zur Kasse. Es wird nichts abgebucht, bevor du bei Stripe bestätigst."}
              </p>
              <p className="text-center text-xs text-muted-foreground">
                Gutscheincode <span className="font-semibold text-foreground">FOUNDER</span>: 20 % im ersten
                Monat, einlösbar an der Kasse unter „Promo-Code hinzufügen“.
              </p>
            </div>
          </ProductBuyBox>
        </div>

        {/* Lieferumfang + Produktdetails */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <PackageCheck className="h-6 w-6 text-accent-blue" />
              Lieferumfang
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Das ist im monatlichen Preis enthalten — ohne Abrechnung pro Wizard oder pro Frage.
            </p>
            <ul className="space-y-3">
              {product.contents.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-blue/10">
                    <Check className="h-3 w-3 text-accent-blue" />
                  </span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <ClipboardList className="h-6 w-6 text-accent-blue" />
              Produktdetails
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Die Angaben, die bei einer Ware auf dem Etikett stehen würden.
            </p>
            <SpecTable specs={product.specs} />
          </div>
        </div>

        {/* Set-Empfehlung — nur solange der Einzelzugang gewählt ist */}
        {selected === "gruenderx" && (
          <div className="mt-16 max-w-4xl">
            <h3 className="mb-4 text-2xl font-bold">Häufig zusammen gekauft</h3>
            <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-card p-6 shadow-card sm:flex-row">
              <img src="/mascots/felix-pricecard.webp" alt="" aria-hidden className="h-20 w-20 shrink-0 object-contain" loading="lazy" />
              <Plus className="h-5 w-5 shrink-0 text-muted-foreground" />
              <img src="/mascots/bundle-duo.webp" alt="" aria-hidden className="h-20 w-20 shrink-0 object-contain" loading="lazy" />
              <div className="flex-1 text-center sm:text-left">
                <p className="font-semibold">GründerX + AnwaltX als Set</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Als Set <strong className="text-foreground">{eur(BUNDLE.netCents)}/Monat</strong> statt{" "}
                  <span className="line-through">{eur(BUNDLE.anchorCents!)}</span> einzeln — du sparst{" "}
                  <strong className="text-success">{eur(BUNDLE.anchorCents! - BUNDLE.netCents)} im Monat</strong>.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => { setSelected("bundle"); window.scrollTo({ top: document.getElementById("bundles")?.offsetTop ?? 0, behavior: "smooth" }); }}
                className="w-full shrink-0 rounded-full sm:w-auto"
              >
                Set wählen
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
