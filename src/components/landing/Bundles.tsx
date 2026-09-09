import { Button } from "@/components/ui/button";
import { Check, Loader2, ShoppingCart, PackageCheck, ClipboardList, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { getStoredAffiliateRef } from "@/utils/affiliate";
import { STRIPE_PRICES } from "@/lib/stripe";
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

// Alle Beträge sind BRUTTO — AGB § 4 Abs. 1 führt Solo mit „54,61 € netto /
// Monat (64,99 € brutto)" und das Bundle mit „84,03 € netto (99,99 € brutto)".
// Der Nettoanteil wird in der Buy-Box herausgerechnet, nicht aufgeschlagen.
const SOLO: Variant = {
  id: "gruenderx",
  name: "GründerX — monatlich",
  sku: "GX-PRO-M",
  grossCents: 6499,
  period: "month",
};

const SOLO_YEAR: Variant = {
  id: "gruenderx-year",
  name: "GründerX — jährlich",
  sku: "GX-PRO-Y",
  grossCents: 64990,
  anchorCents: 77988,
  period: "year",
  note: "Zwei Monate geschenkt gegenüber der Monatszahlung (12 × 64,99 € = 779,88 €).",
};

const BUNDLE: Variant = {
  id: "bundle",
  name: "Founder-Set — GründerX + AnwaltX",
  sku: "GX-AX-SET-M",
  grossCents: 9999,
  anchorCents: 12998,
  period: "month",
  note: "Enthält zusätzlich den vollen AnwaltX-Zugang (Juri). Ein Konto, eine Abrechnung.",
};

const BUNDLE_YEAR: Variant = {
  id: "bundle-year",
  name: "Founder-Set — jährlich",
  sku: "GX-AX-SET-Y",
  grossCents: 99990,
  anchorCents: 119988,
  period: "year",
  note: "Beide Zugänge, zwei Monate geschenkt gegenüber der Monatszahlung.",
};

const VARIANTS: Variant[] = [SOLO, SOLO_YEAR, BUNDLE, BUNDLE_YEAR];

/** priceId + Intervall je Ausführung. Der Preis selbst kommt aus der Edge-Function. */
const CHECKOUT: Record<string, { priceId: string; interval: "month" | "year" }> = {
  "gruenderx": { priceId: STRIPE_PRICES.gruenderx, interval: "month" },
  "gruenderx-year": { priceId: STRIPE_PRICES.gruenderx, interval: "year" },
  "bundle": { priceId: STRIPE_PRICES.bundle, interval: "month" },
  "bundle-year": { priceId: STRIPE_PRICES.bundle, interval: "year" },
};

const SOLO_GALLERY: GalleryImage[] = [
  { src: "/mascots/felix-pricecard.webp", alt: "GründerX Einzelzugang — Felix mit Preiskarte", caption: "GründerX — Einzelzugang" },
  { src: "/mascots/felix-hero-desk.webp", alt: "Felix am Schreibtisch mit dem Gründungs-Cockpit", caption: "Cockpit für Gründung, Steuern und Marketplace-Setup" },
  { src: "/mascots/felix-roadmap.webp", alt: "Felix vor der Gründungs-Roadmap", caption: "Roadmap: Rechtsform, Finanzamt, Anmeldungen — Schritt für Schritt" },
  { src: "/mascots/felix-boxes.webp", alt: "Felix mit Versandkartons für den Marketplace-Start", caption: "Marketplace-Setup: Amazon, Kaufland, Shopify, TikTok-Shop" },
];

const BUNDLE_GALLERY: GalleryImage[] = [
  { src: "/mascots/bundle-duo.webp", alt: "Felix von GründerX und Juri von AnwaltX stehen als Team nebeneinander", caption: "Founder-Set — beide Zugänge in einer Abrechnung" },
  { src: "/mascots/felix-pricecard.webp", alt: "GründerX als Teil des Sets", caption: "Enthält den vollen GründerX-Zugang" },
  { src: "/mascots/felix-present.webp", alt: "Felix überreicht das Founder-Set", caption: "23 % günstiger als beide Zugänge einzeln" },
];

const GALLERY: Record<string, GalleryImage[]> = {
  "gruenderx": SOLO_GALLERY,
  "gruenderx-year": [
    { src: "/mascots/felix-present.webp", alt: "Felix überreicht das Jahresabo", caption: "GründerX — jährlich, zwei Monate geschenkt" },
    ...SOLO_GALLERY.slice(0, 3),
  ],
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
  {
    label: "Nicht enthalten",
    value:
      "Steuerberatung und Rechtsberatung im Einzelfall sowie Amtsgebühren (Gewerbeanmeldung, Notar, Handelsregister, Markenanmeldung). GründerX ist eine Software und weder Steuerberatung noch Rechtsdienstleistung.",
  },
];

/** Voller Funktionsumfang, gruppiert wie das Cockpit — 66 Tools plus Guides. */
const SOLO_CONTENTS = [
  "Felix — KI-Co-Pilot für Gründung, Steuern und Marketplaces, unbegrenzt im Chat",
  "Gründung: Rechtsform-Wizard, Gewerbeanmeldung, Fragebogen zur steuerlichen Erfassung (Einzel, Personen- und Kapitalgesellschaft), Erste-Schritte-Roadmap, Entscheidungs-Engine, Gewerbe-Check",
  "Steuer-Cockpit: USt-Voranmeldung, Anlage EÜR, BWA-Generator, DATEV-Mapper, Quartals-Steuerschätzung, IAB-Rechner, Abschreibungs-Erklärer, Fristen-Kalender",
  "Belege & Buchhaltung: Rechnungs-Generator (PDF), Settlement-Parser, Reisekosten-Logger, Kfz-Optimizer, Crypto-Steuer, Steuer-ABC-Glossar",
  "E-Commerce: Amazon-Erstattungen & Seller-Automation, Amazon-USt EU vs. US, Marge-Tracker, Shop-Profit-Rechner, ECom-Brand-Roadmap, Side-Hustle-Schwellen-Check, Sales-Tax-Nexus",
  "Marke & Compliance: Brand-Check, Marken-Wizard, Marken-Monitor, LUCID-Wizard, WEEE/EAR-Check, CE/RoHS-Generator, GPSR, BattG, CPNP, Pre-Year-End-Check",
  "International: US-LLC- und HK-Limited-Wizard (EIN, ITIN, BOI, Banking), US- und HK-Tax-Helper, DBA-CFC-Rechner, IP-Box-Vergleich, EU-Alternativen, Substance-Checker, Visa-Helper",
  "Geld & Absicherung: Auszahlung-Optimizer, Salary-vs-Dividende, Runway- & Burn-Rate-Rechner, KV- und Pension-Optimizer, Brutto-Netto Solo, Stundensatz-Rechner, Versicherungs-Basis-Check",
  "Banking & Karten: Intl. Banking, Geschäftskreditkarten- und US-Kreditkarten-Vergleich, Förderung-Datenbank",
  "Steuerberater: StB-Finder, StB-Match, Cost-Benefit-Check und Hand-off-Paket für den Wechsel",
  "Anbieter-Vergleich in 14 Kategorien: Banking, Buchhaltung, 3PL, Versand, Domains, Tracking, Labor und mehr",
  "Holding-Designer für Struktur- und Beteiligungsfragen",
  "Gründungs-Guides und Playbooks (GmbH, UG, Einzelunternehmen, US-LLC, Holding) plus laufend gepflegte Ratgeber",
  "Coop-Deals und Anbieter-Konditionen für Abonnenten",
  "E-Mail-Support",
];

const BUNDLE_CONTENTS = [
  "Alles aus dem GründerX-Zugang (siehe Einzelzugang)",
  "Juri — KI-Rechts-Assistentin (AnwaltX), unbegrenzt im Chat",
  "Vertragsprüfung: Vertrag oder AGB hochladen, Risiko-Klauseln markiert zurück",
  "Vertrags-Builder für eigene Verträge und AGB",
  "Abmahnungs-Soforthilfe mit Einordnung, Fristenlage und Antwortentwurf",
  "Abmahn-Radar: laufende Abmahnwellen, bevor sie dich treffen",
  "Markencheck und Chargeback-Verteidigung",
  "Rechts-Generatoren: Impressum, Datenschutz, Widerruf, Datenschutzklauseln",
  "Fristen-Tracker und rechtssichere Mails direkt aus dem System",
  "Felix und Juri gemeinsam im selben Chat",
  "Priorisierter Support",
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
      { label: "Ersparnis", value: "129,98 € gegenüber zwölf Monatszahlungen (779,88 €) — zwei Monate gratis" },
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
      { label: "Ersparnis", value: "199,98 € gegenüber zwölf Monatszahlungen (1.199,88 €) — zwei Monate gratis" },
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
                  Gutscheincode <span className="font-semibold text-foreground">FOUNDER</span>: 20 % im ersten
                  Monat, einlösbar an der Kasse unter „Promo-Code hinzufügen“.
                </p>
              )}
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
