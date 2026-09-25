import { Button } from "@/components/ui/button";
import { Check, Loader2, ShoppingCart, PackageCheck, ClipboardList, Plus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { getStoredAffiliateRef } from "@/utils/affiliate";
import { PLANS, PLAN_ORDER, SOLO_CONTENTS, BUNDLE_CONTENTS, NOT_INCLUDED, CANCEL_NOTE, FOUNDER_CODE, formatEurCents } from "@/config/pricing";
import { rememberCartVariant } from "@/lib/cart";
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
   Kacheln zeigten den Preis nackt), Lieferform, Lieferzeit, Kündigungsregel
   und Verkäufer. Die Beträge sind BRUTTO; AGB § 4 Abs. 1 führt Solo mit
   „54,61 € netto / Monat (64,99 € brutto)".

   GründerX ist pay-first: Der Kaufknopf führt eingeloggt wie ausgeloggt
   direkt in den Stripe-Checkout, das Konto entsteht danach über /willkommen.
   Die gewählte Ausführung wird vorher in sessionStorage gemerkt — /auth
   wertet den `price`-Parameter nicht aus und würde sonst immer GründerX
   monatlich kaufen.
   --------------------------------------------------------------------------- */

// Preise, Ausführungen und Leistungen kommen aus src/config/pricing.ts —
// dieselbe Quelle wie /preise und /checkout. Alle Beträge sind BRUTTO.
const SOLO: Variant = PLANS.gruenderx;
const BUNDLE: Variant = PLANS.bundle;
const VARIANTS: Variant[] = PLAN_ORDER.map((id) => PLANS[id]);

/** priceId + Intervall je Ausführung. Der Preis selbst kommt aus der Edge-Function. */
const CHECKOUT: Record<string, { priceId: string; interval: "month" | "year" }> = Object.fromEntries(
  PLAN_ORDER.map((id) => [id, { priceId: PLANS[id].priceId, interval: PLANS[id].interval }]),
);

/**
 * Echte Screenshots aus dem laufenden Cockpit statt Maskottchen.
 *
 * Die Maskottchen sind Markenbilder, kein Produkt: Wer wissen will, was er
 * fuer 64,99 EUR bekommt, sieht darauf nichts davon. Bei Software IST die
 * Oberflaeche das Produkt -- ein Screenshot schlaegt hier jede Illustration
 * und jedes 3D-Mockup.
 */
const SOLO_GALLERY: GalleryImage[] = [
  { src: "/screens/cockpit-uebersicht.jpg", alt: "GründerX-Cockpit mit laufenden Guides und Einsteiger-Tools", caption: "Dein Cockpit — laufende Guides, Tools und Empfehlungen an einer Stelle" },
  { src: "/screens/cockpit-rechtsform.jpg", alt: "Rechtsform-Wizard mit Empfehlung UG und Begründung", caption: "Rechtsform-Wizard: fünf Fragen, dann eine begründete Empfehlung samt Fallstricken" },
  { src: "/screens/cockpit-steuer.jpg", alt: "Steuer-Cockpit mit Fristen-Kalender 2026 und USt-Einstellungen", caption: "Steuer-Cockpit: Fristen richten sich live nach Rechtsform, USt-Rhythmus und OSS" },
  { src: "/screens/cockpit-anbieter.jpg", alt: "Anbieter-Vergleich mit 213 Anbietern nach Kategorien", caption: "Anbieter-Vergleich: 213 Anbieter mit Stärken und Schwächen, wöchentlich gepflegt" },
];

const BUNDLE_GALLERY: GalleryImage[] = [
  { src: "/screens/cockpit-uebersicht.jpg", alt: "GründerX-Cockpit mit laufenden Guides", caption: "Founder-Set — enthält den vollen GründerX-Zugang, dazu Juri von AnwaltX" },
  { src: "/screens/cockpit-rechtsform.jpg", alt: "Rechtsform-Wizard mit Empfehlung", caption: "Alle Wizards und Cockpits ohne Aufpreis" },
  { src: "/screens/cockpit-steuer.jpg", alt: "Steuer-Cockpit mit Fristen-Kalender", caption: "Fristen, USt und OSS im Blick" },
];

const GALLERY: Record<string, GalleryImage[]> = {
  "gruenderx": SOLO_GALLERY,
  "gruenderx-year": SOLO_GALLERY,
  "bundle": BUNDLE_GALLERY,
  "bundle-year": BUNDLE_GALLERY,
};

const BASE_SPECS: Spec[] = [
  { label: "Kategorie", value: "Software-Abonnement (SaaS) — Gründung, Steuern, Marketplace-Setup" },
  { label: "Lieferform", value: "Digital — Freischaltung im GründerX-Konto, keine Installation, kein Datenträger" },
  { label: "Lieferzeit", value: "Sofort nach Zahlungsbestätigung durch Stripe (in der Regel unter einer Minute)" },
  { label: "Versandkosten", value: "0,00 € — es wird nichts versendet" },
  { label: "Kündigung", value: "Jederzeit im Konto, wirksam zum Ende der laufenden Abrechnungsperiode" },
  { label: "Preisangabe", value: "Endpreis inkl. 19 % USt. (AGB § 4 Abs. 1). Es wird an der Kasse nichts aufgeschlagen; für Unternehmer voll als Betriebsausgabe absetzbar. Für EU-Unternehmer mit gültiger USt-IdNr. Reverse-Charge nach § 3a Abs. 2 UStG — die USt-ID wird im Checkout erfasst." },
  { label: "Nutzungsgrenzen", value: "Keine. Alle Tools, Wizards, Rechner und Guides unbegrenzt — keine Abrechnung pro Wizard, pro Dokument oder pro Frage an Felix." },
  { label: "Zahlungsarten", value: "Kreditkarte, Klarna, Apple Pay und Link — welche Zahlarten genau erscheinen, zeigt der Checkout je nach Land und Gerät. Die USt-ID wird dort erfasst." },
  { label: "Gutscheincode", value: "Im Stripe-Checkout unter „Promo-Code hinzufügen“ — ein Code pro Bestellung, nicht kombinierbar" },
  { label: "Sprache", value: "Deutsch" },
  { label: "Voraussetzung", value: "Aktueller Webbrowser und Internetverbindung — Desktop und Mobil" },
  { label: "Datenhaltung", value: "Server in der EU, DSGVO-konform" },
  { label: "Anbieter", value: "Sonni Buttke, Einzelunternehmen (siehe Impressum)" },
  { label: "Nicht enthalten", value: NOT_INCLUDED },
];

const PRODUCTS: Record<string, { title: string; subtitle: string; contents: string[]; specs: Spec[] }> = {
  "gruenderx": {
    title: "GründerX",
    subtitle:
      "Dein KI-Co-Pilot Felix für Gründung, Steuern, Marketplaces und Brand-Launch — 66 Wizards und Rechner plus Guides in einem Zugang.",
    contents: SOLO_CONTENTS,
    specs: [
      { label: "Artikelnummer", value: "GX-PRO-M" },
      { label: "Laufzeit", value: "1 Monat, verlängert sich automatisch um jeweils einen Monat" },
      ...BASE_SPECS,
    ],
  },
  "gruenderx-year": {
    title: "GründerX — Jahreszugang",
    subtitle:
      "Derselbe volle Funktionsumfang, einmal jährlich abgerechnet — zwei Monate geschenkt.",
    contents: SOLO_CONTENTS,
    specs: [
      { label: "Artikelnummer", value: "GX-PRO-Y" },
      { label: "Laufzeit", value: "12 Monate, verlängert sich automatisch um jeweils zwölf Monate" },
      { label: "Ersparnis", value: `${formatEurCents(PLANS["gruenderx-year"].anchorCents! - PLANS["gruenderx-year"].grossCents)} gegenüber zwölf Monatszahlungen (${formatEurCents(PLANS["gruenderx-year"].anchorCents!)}) — zwei Monate gratis` },
      ...BASE_SPECS,
    ],
  },
  "bundle": {
    title: "Founder-Set: GründerX + AnwaltX",
    subtitle:
      "Gründung und Recht greifen ineinander. Felix und Juri zusammen in einem Konto — 23 % günstiger als beide Zugänge einzeln.",
    contents: BUNDLE_CONTENTS,
    specs: [
      { label: "Artikelnummer", value: "GX-AX-SET-M" },
      { label: "Set-Inhalt", value: "2 Zugänge: GründerX + AnwaltX — ein Konto, eine Abrechnung" },
      { label: "Laufzeit", value: "1 Monat, verlängert sich automatisch um jeweils einen Monat" },
      ...BASE_SPECS,
    ],
  },
  "bundle-year": {
    title: "Founder-Set — Jahreszugang",
    subtitle:
      "Beide Zugänge, einmal jährlich abgerechnet — zwei Monate geschenkt und weiterhin 23 % günstiger als einzeln.",
    contents: BUNDLE_CONTENTS,
    specs: [
      { label: "Artikelnummer", value: "GX-AX-SET-Y" },
      { label: "Set-Inhalt", value: "2 Zugänge: GründerX + AnwaltX — ein Konto, eine Abrechnung" },
      { label: "Laufzeit", value: "12 Monate, verlängert sich automatisch um jeweils zwölf Monate" },
      { label: "Ersparnis", value: `${formatEurCents(PLANS["bundle-year"].anchorCents! - PLANS["bundle-year"].grossCents)} gegenüber zwölf Monatszahlungen (${formatEurCents(PLANS["bundle-year"].anchorCents!)}) — zwei Monate gratis` },
      ...BASE_SPECS,
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

  const handleCheckout = async (variantId: string) => {
    const { priceId, interval } = CHECKOUT[variantId] ?? CHECKOUT.gruenderx;
    // Auswahl merken, bevor der Weg über /auth sie verschluckt.
    rememberCartVariant(variantId);
    if (!user) {
      navigate(`/auth?mode=signup&price=${priceId}`);
      return;
    }
    setLoading(variantId);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { priceId, interval, affiliateRef: getStoredAffiliateRef() },
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

  const busy = loading === selected;

  return (
    <section id="bundles" className="py-24 bg-secondary/40">
      <div className="container max-w-6xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent-blue">Produkt</p>

        {/* Galerie + Buy-Box */}
        {/* Die Galerie zeigt 16:9-Screenshots — sie bekommt die breite Spalte,
            die Buy-Box die feste. */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,430px)]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery images={GALLERY[selected]} variant="screenshot" />
          </div>

          <ProductBuyBox
            brand="GründerX"
            title={product.title}
            subtitle={product.subtitle}
            variants={VARIANTS}
            selected={selected}
            onSelect={setSelected}
            cancelNote={CANCEL_NOTE}
            seller="Sonni Buttke, Einzelunternehmen (Anbieter lt. Impressum)"
            paymentMethods="Kreditkarte · Klarna · Apple Pay · Link — weitere je nach Land und Gerät"
          >
            <div className="space-y-2">
              <Button
                size="lg"
                onClick={() => handleCheckout(selected)}
                disabled={busy}
                className="h-14 w-full rounded-full bg-gradient-primary text-base font-semibold text-primary-foreground shadow-glow hover:opacity-95"
              >
                {busy ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Jetzt kaufen — {eur(variant.grossCents)}/{variant.period === "year" ? "Jahr" : "Monat"}
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                {user
                  ? "Weiter zur gesicherten Zahlung bei Stripe. Erst dort wird die Bestellung kostenpflichtig."
                  : "Weiter zur gesicherten Zahlung bei Stripe. Dein Konto entsteht direkt nach der Zahlung — es wird nichts abgebucht, bevor du dort bestätigst."}
              </p>
              {variant.period === "month" && (
                <p className="text-center text-xs text-muted-foreground">
                  Gutscheincode <span className="font-semibold text-foreground">{FOUNDER_CODE.code}</span>: {FOUNDER_CODE.percent} % im ersten
                  Monat, einlösbar an der Kasse unter „Promo-Code hinzufügen“.
                </p>
              )}
              <p className="text-center text-xs">
                <Link to="/preise" className="text-accent-blue hover:underline">
                  Alle Preise, Kündigung und Fragen zum Abo
                </Link>
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
        {selected.startsWith("gruenderx") && (
          <div className="mt-16 max-w-4xl">
            <h3 className="mb-4 text-2xl font-bold">Häufig zusammen gekauft</h3>
            <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-card p-6 shadow-card sm:flex-row">
              <img src="/mascots/felix-pricecard.webp" alt="" aria-hidden className="h-20 w-20 shrink-0 object-contain" loading="lazy" />
              <Plus className="h-5 w-5 shrink-0 text-muted-foreground" />
              <img src="/mascots/bundle-duo.webp" alt="" aria-hidden className="h-20 w-20 shrink-0 object-contain" loading="lazy" />
              <div className="flex-1 text-center sm:text-left">
                <p className="font-semibold">GründerX + AnwaltX als Set</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Als Set <strong className="text-foreground">{eur(BUNDLE.grossCents)}/Monat</strong> statt{" "}
                  <span className="line-through">{eur(BUNDLE.anchorCents!)}</span> einzeln — du sparst{" "}
                  <strong className="text-success">{eur(BUNDLE.anchorCents! - BUNDLE.grossCents)} im Monat</strong>.
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
