import { Link, useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/landing/PageHeader";
import { Check, Gift, ShoppingCart, Receipt, CalendarX, Info, Plus } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { rememberCartVariant } from "@/lib/cart";
import {
  PLANS,
  VAT_RATE,
  CANCEL_NOTE,
  FOUNDER_CODE,
  SOLO_CONTENTS,
  BUNDLE_CONTENTS,
  NOT_INCLUDED,
  formatEurCents,
  netCentsOf,
  schemaPrice,
  type PlanId,
  type PlanVariant,
} from "@/config/pricing";
import { TRIAL_TOOLS, TRIAL_CLAIM } from "@/lib/freetools/trialTools";
import { LANDING_TOOLS } from "@/data/features";

const SITE = "https://gruenderx.de";
const VAT_PERCENT = Math.round(VAT_RATE * 100);

/**
 * /preise — die Preisseite. Vorher gab es keine: /preise und /pricing lieferten
 * eine Soft-404 (Startseite mit canonical=/), die Preise standen nur unter
 * /#bundles.
 *
 * Alle Zahlen kommen aus src/config/pricing.ts (dieselbe Quelle wie /#bundles
 * und /checkout). Nichts hier ist getippt: Netto, Ersparnis und JSON-LD werden
 * aus den Bruttopreisen gerechnet.
 */

const PRODUCTS: { key: string; title: string; subtitle: string; month: PlanId; year: PlanId; contents: string[] }[] = [
  {
    key: "solo",
    title: "GründerX",
    subtitle: "Der volle GründerX-Zugang: alle Tools, Wizards, Guides und Felix.",
    month: "gruenderx",
    year: "gruenderx-year",
    contents: SOLO_CONTENTS,
  },
  {
    key: "bundle",
    title: "Founder-Set: GründerX + AnwaltX",
    subtitle: "GründerX und AnwaltX in einem Konto, mit einer Abrechnung.",
    month: "bundle",
    year: "bundle-year",
    contents: BUNDLE_CONTENTS,
  },
];

const periodWord = (p: PlanVariant) => (p.period === "year" ? "Jahr" : "Monat");

const yearSaving = (year: PlanVariant) => (year.anchorCents ?? 0) - year.grossCents;

const bundleSaving = PLANS.bundle.anchorCents! - PLANS.bundle.grossCents;
const bundleSavingPercent = Math.round((bundleSaving / PLANS.bundle.anchorCents!) * 100);

const FAQS: { q: string; a: string }[] = [
  {
    q: "Sind die Preise brutto oder netto?",
    a: `Alle Preise sind Endpreise inklusive ${VAT_PERCENT} % Umsatzsteuer. An der Kasse wird nichts aufgeschlagen. GründerX monatlich kostet ${formatEurCents(PLANS.gruenderx.grossCents)}, davon ${formatEurCents(netCentsOf(PLANS.gruenderx.grossCents))} netto. Für EU-Unternehmer mit gültiger USt-IdNr. gilt Reverse-Charge; die USt-IdNr. wird im Checkout erfasst.`,
  },
  {
    q: "Wie kündige ich?",
    a: `${CANCEL_NOTE} Die Kündigung erledigst du selbst im Konto unter Profil → Abrechnung.`,
  },
  {
    q: "Kann ich GründerX vorher ausprobieren?",
    a: `Ja, ohne Konto: WEEE-Check, Brand-Check, LUCID-Wizard und Gründungskosten-Rechner je einmal kostenlos, das Ergebnis gibt es gegen deine E-Mail-Adresse. Dazu kommt je eine kostenlose Nutzung der Generatoren unter /gratis-tools (Businessplan, Rechtsform-Finder, Amazon-Widersprüche). Eine Testphase mit Konto gibt es nicht – das Konto entsteht erst nach der Zahlung.`,
  },
  {
    q: "Was ist der Unterschied zwischen Monats- und Jahreszugang?",
    a: `Der Funktionsumfang ist gleich. Der Jahreszugang wird einmal im Jahr abgerechnet und kostet ${formatEurCents(PLANS["gruenderx-year"].grossCents)} statt 12 × ${formatEurCents(PLANS.gruenderx.grossCents)} = ${formatEurCents(PLANS["gruenderx-year"].anchorCents!)} – du sparst ${formatEurCents(yearSaving(PLANS["gruenderx-year"]))}.`,
  },
  {
    q: "Was bringt das Founder-Set?",
    a: `Zusätzlich zum GründerX-Zugang den vollen AnwaltX-Zugang mit der KI-Rechts-Assistentin Juri, Vertragsprüfung und Abmahn-Hilfe. Einzeln kosten beide Zugänge zusammen ${formatEurCents(PLANS.bundle.anchorCents!)} im Monat, im Set ${formatEurCents(PLANS.bundle.grossCents)} – ${formatEurCents(bundleSaving)} bzw. ${bundleSavingPercent} % weniger.`,
  },
  {
    q: "Gibt es einen Gutschein?",
    a: `Mit dem Code ${FOUNDER_CODE.code} bekommst du ${FOUNDER_CODE.percent} % auf den ersten Monat eines Monatszugangs. Du gibst ihn im Stripe-Checkout unter „Promo-Code hinzufügen“ ein; ein Code pro Bestellung.`,
  },
  {
    q: "Welche Zahlungsarten gibt es?",
    a: "Die Zahlung läuft über Stripe. Welche Zahlarten erscheinen (z. B. Kreditkarte, Klarna, Apple Pay, Link), zeigt der Checkout je nach Land und Gerät.",
  },
  {
    q: "Ersetzt GründerX Steuerberater oder Anwalt?",
    a: NOT_INCLUDED,
  },
];

function productJsonLd() {
  return PRODUCTS.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.title,
    description: p.subtitle,
    brand: { "@type": "Brand", name: "GründerX" },
    image: `${SITE}/og-image.png`,
    url: `${SITE}/preise`,
    offers: [PLANS[p.month], PLANS[p.year]].map((v) => ({
      "@type": "Offer",
      name: v.name,
      sku: v.sku,
      price: schemaPrice(v.grossCents),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${SITE}/preise`,
      seller: { "@type": "Organization", name: "GründerX" },
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: schemaPrice(v.grossCents),
        priceCurrency: "EUR",
        valueAddedTaxIncluded: true,
        billingDuration: v.period === "year" ? "P1Y" : "P1M",
        unitCode: v.period === "year" ? "ANN" : "MON",
      },
    })),
  }));
}

const Preise = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Derselbe Weg wie der Produktblock der Startseite: Auswahl merken, dann
  // ausgeloggt über /auth in den Gast-Checkout (pay-first), eingeloggt in
  // den Warenkorb. /auth zeigt den AGB-/Datenschutz-Hinweis vor dem Kauf und
  // "Schon Kunde? Anmelden" -- ein Direktsprung braucht die Betreiber-Freigabe.
  const buy = (id: PlanId) => {
    rememberCartVariant(id);
    navigate(user ? `/checkout?variant=${id}` : "/auth?mode=signup");
  };

  const jsonLd = [
    ...productJsonLd(),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: SITE },
        { "@type": "ListItem", position: 2, name: "Preise", item: `${SITE}/preise` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`Preise – GründerX ab ${formatEurCents(PLANS.gruenderx.grossCents)} im Monat inkl. USt.`}
        description={`GründerX kostet ${formatEurCents(PLANS.gruenderx.grossCents)} im Monat oder ${formatEurCents(PLANS["gruenderx-year"].grossCents)} im Jahr, das Founder-Set mit AnwaltX ${formatEurCents(PLANS.bundle.grossCents)}. Endpreise inkl. USt., jederzeit kündbar.`}
        path="/preise"
        type="product"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main>
        <PageHeader
          zentriert
          crumbs={[{ label: "Start", to: "/" }, { label: "Preise" }]}
          title={<>Ein Abo. <span className="text-accent-blue">Alle {LANDING_TOOLS.length} Tools.</span></>}
          lead={
            <p>
              Alle Tools aus der{" "}
              <Link to="/tools" className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">Tool-Übersicht</Link>, alle{" "}
              <Link to="/guides" className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">Guides</Link> und der KI-Co-Pilot Felix,
              ohne Abrechnung pro Tool oder pro Frage.{" "}
              <strong className="font-semibold text-foreground">Alle Preise sind Endpreise inkl. {VAT_PERCENT}&nbsp;% USt.</strong>
            </p>
          }
        />

        <div className="container max-w-5xl px-4 pb-20">
        {/* Preiskarten */}
        <section aria-labelledby="plaene" className="mb-16">
          <h2 id="plaene" className="sr-only">Pläne</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {PRODUCTS.map((p) => {
              const m = PLANS[p.month];
              const y = PLANS[p.year];
              const isSet = p.key === "bundle";
              return (
                <div
                  key={p.key}
                  className={`relative flex flex-col overflow-hidden rounded-2xl border bg-card p-6 shadow-card md:p-8 ${
                    isSet ? "border-accent-blue/30" : "border-border"
                  }`}
                >
                  {isSet && (
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-blue to-brand-green" aria-hidden="true" />
                  )}
                  {/* Feste Kopfhöhe ab md, damit Preisblöcke beider Karten auf einer Linie starten. */}
                  <div className="md:min-h-[6.25rem]">
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{p.subtitle}</p>
                    {isSet && (
                      <span className="mt-3 inline-block rounded-md bg-brand-green-soft px-2 py-1 text-xs font-semibold text-brand-green tabular">
                        −{bundleSavingPercent} % gegenüber beiden Zugängen einzeln
                      </span>
                    )}
                  </div>

                  <div className="mt-6 space-y-3">
                    {[m, y].map((v) => (
                      <div key={v.id} className="rounded-xl border border-border bg-background/60 p-4">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="text-sm font-medium">{v.period === "year" ? "Jährlich" : "Monatlich"}</span>
                          <span>
                            <span className="text-3xl font-semibold tracking-[-0.03em] tabular">{formatEurCents(v.grossCents)}</span>
                            <span className="text-sm text-muted-foreground"> / {periodWord(v)}</span>
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground tabular">
                          inkl. {VAT_PERCENT} % USt. ({formatEurCents(netCentsOf(v.grossCents))} netto) · Art.-Nr. {v.sku}
                        </p>
                        {v.period === "year" && v.anchorCents && (
                          <p className="mt-1 text-xs font-medium text-success tabular">
                            {formatEurCents(yearSaving(v))} günstiger als 12 Monatszahlungen ({formatEurCents(v.anchorCents)})
                          </p>
                        )}
                        {v.id === "bundle" && (
                          <p className="mt-1 text-xs font-medium text-success tabular">
                            {formatEurCents(bundleSaving)} im Monat günstiger als beide Zugänge einzeln ({formatEurCents(v.anchorCents!)})
                          </p>
                        )}
                        <Button
                          onClick={() => buy(v.id)}
                          variant={v.period === "year" ? "outline" : "default"}
                          className={`mt-4 h-11 w-full rounded-xl font-semibold ${v.period === "year" ? "" : "bg-gradient-primary shadow-glow hover:opacity-95"}`}
                        >
                          <ShoppingCart className="mr-1 h-4 w-4" />
                          {v.period === "year" ? "Jahreszugang wählen" : "Monatszugang wählen"}
                        </Button>
                      </div>
                    ))}
                  </div>

                  <h4 className="mb-3 mt-8 text-sm font-semibold text-foreground">Leistungen</h4>
                  <ul className="space-y-2.5">
                    {p.contents.map((c) => (
                      <li key={c} className="flex items-start gap-2.5 text-sm leading-relaxed">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Weiter zur gesicherten Zahlung bei Stripe; erst dort wird die Bestellung kostenpflichtig. Ohne Konto
            entsteht dein Konto direkt nach der Zahlung. Gutscheincode {FOUNDER_CODE.code}: {FOUNDER_CODE.percent} % auf
            den ersten Monat eines Monatszugangs.
          </p>
        </section>

        {/* Einblick: echte Ansicht nach der Freischaltung (Testkonto) */}
        <section aria-labelledby="einblick" className="mb-16 grid items-center gap-8 rounded-2xl border border-border bg-card p-6 shadow-card md:grid-cols-[1fr,1.3fr] md:p-8">
          <div>
            <h2 id="einblick" className="text-2xl font-semibold tracking-tight">Das schaltest du frei</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Nach der Zahlung legst du dein Konto an und landest im Cockpit. Alle {LANDING_TOOLS.length} Tools, die
              Guides und Felix sind sofort freigeschaltet, ohne Abrechnung pro Tool oder pro Frage.
            </p>
            <Link to="/tools" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-blue hover:underline">
              Alle Tools ansehen
            </Link>
          </div>
          <figure>
            <img
              src="/screens/2026-10b/dashboard.webp"
              srcSet="/screens/2026-10b/dashboard-720.webp 720w, /screens/2026-10b/dashboard.webp 1600w"
              sizes="(min-width: 768px) 560px, 100vw"
              width={1600}
              height={870}
              loading="lazy"
              decoding="async"
              alt="GründerX-Cockpit nach der Anmeldung mit laufenden Guides, Event-Radar und den Terminen der nächsten 14 Tage"
              className="aspect-[16/10] w-full rounded-xl border border-border object-cover object-left-top"
            />
            <figcaption className="mt-2 text-xs text-muted-foreground">Echte Ansicht der App, aufgenommen mit einem Testkonto.</figcaption>
          </figure>
        </section>

        {/* Kündigung + Abrechnung */}
        <section className="mb-16 grid overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-2 md:divide-x md:divide-border">
          <div className="p-6 md:p-8">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">
              <CalendarX className="h-5 w-5 text-accent-blue" aria-hidden="true" /> Kündigung
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {CANCEL_NOTE} Details in den <Link to="/agb" className="underline underline-offset-2">AGB</Link> und der{" "}
              <Link to="/widerruf" className="underline underline-offset-2">Widerrufsbelehrung</Link>.
            </p>
          </div>
          <div className="border-t border-border p-6 md:border-t-0 md:p-8">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">
              <Receipt className="h-5 w-5 text-accent-blue" aria-hidden="true" /> Abrechnung
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Monatszugänge verlängern sich um jeweils einen Monat, Jahreszugänge um jeweils zwölf Monate. Du bekommst
              zu jeder Zahlung eine Rechnung mit ausgewiesener Umsatzsteuer. Für EU-Unternehmer mit gültiger
              USt-IdNr. gilt Reverse-Charge.
            </p>
          </div>
        </section>

        {/* Gratis-Einstieg */}
        <section className="mb-16 rounded-2xl border border-brand-green/20 bg-brand-green-soft/60 p-6 md:p-8">
          <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">
            <Gift className="h-5 w-5 text-brand-green" aria-hidden="true" /> Erst ausprobieren: {TRIAL_CLAIM}
          </h2>
          <p className="mb-5 text-sm text-muted-foreground">
            Diese Tools kannst du ohne Konto je einmal nutzen. Das Ergebnis gibt es gegen deine E-Mail-Adresse.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {TRIAL_TOOLS.map((t) => (
              <li key={t.slug} className="rounded-xl border border-border/70 bg-card p-4">
                <Link to={t.trialPath} className="font-semibold text-foreground hover:text-accent-blue">{t.name}</Link>
                <p className="mt-0.5 text-sm text-muted-foreground">{t.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Nicht enthalten */}
        <section className="mb-16">
          <p className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span><strong className="text-foreground">Nicht enthalten:</strong> {NOT_INCLUDED}</span>
          </p>
        </section>

        {/* FAQ — natives <details>, damit die Antworten im prerenderten HTML stehen */}
        <section aria-labelledby="preise-faq">
          <h2 id="preise-faq" className="mb-6 text-2xl font-semibold md:text-3xl">Häufige Fragen zu Preisen</h2>
          <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            {FAQS.map((f) => (
              <details key={f.q} className="group px-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold transition-colors hover:text-accent-blue">
                  {f.q}
                  <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p className="-mt-1 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Preise;
