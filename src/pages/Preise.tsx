import { Link, useNavigate } from "react-router-dom";
import { Check, Gift, ShoppingCart, Receipt, CalendarX, Info } from "lucide-react";
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
    a: `Ja, ohne Konto: WEEE-Check, Brand-Check, LUCID-Wizard und Gründungskosten-Rechner je einmal kostenlos, das Ergebnis gibt es gegen deine E-Mail-Adresse. Dazu kommen die kostenlosen Generatoren unter /gratis-tools. Eine Testphase mit Konto gibt es nicht – das Konto entsteht erst nach der Zahlung.`,
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
  // den Warenkorb.
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
      <main className="container max-w-5xl px-4 pt-28 pb-16 md:pt-32">
        <nav className="text-xs text-muted-foreground mb-6 flex items-center gap-1.5" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground">Start</Link>
          <span>/</span>
          <span className="text-foreground">Preise</span>
        </nav>

        <header className="max-w-2xl mb-10">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Preise</h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Ein Abo, alle {LANDING_TOOLS.length} Tools aus der{" "}
            <Link to="/tools" className="underline hover:text-foreground">Tool-Übersicht</Link>, alle{" "}
            <Link to="/guides" className="underline hover:text-foreground">Guides</Link> und der KI-Co-Pilot Felix –
            ohne Abrechnung pro Tool oder pro Frage.{" "}
            <strong className="text-foreground">Alle Preise sind Endpreise inkl. {VAT_PERCENT} % USt.</strong>
          </p>
        </header>

        {/* Preiskarten */}
        <section aria-labelledby="plaene" className="mb-14">
          <h2 id="plaene" className="sr-only">Pläne</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {PRODUCTS.map((p) => {
              const m = PLANS[p.month];
              const y = PLANS[p.year];
              return (
                <div key={p.key} className="flex flex-col rounded-3xl border border-border bg-card p-6 md:p-8 shadow-card">
                  <h3 className="text-xl font-bold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.subtitle}</p>

                  <div className="mt-6 space-y-4">
                    {[m, y].map((v) => (
                      <div key={v.id} className="rounded-2xl border border-border p-4">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="text-sm font-medium">{v.period === "year" ? "Jährlich" : "Monatlich"}</span>
                          <span>
                            <span className="text-2xl font-bold tabular-nums">{formatEurCents(v.grossCents)}</span>
                            <span className="text-sm text-muted-foreground"> / {periodWord(v)}</span>
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          inkl. {VAT_PERCENT} % USt. ({formatEurCents(netCentsOf(v.grossCents))} netto) · Art.-Nr. {v.sku}
                        </p>
                        {v.period === "year" && v.anchorCents && (
                          <p className="mt-1 text-xs text-success">
                            {formatEurCents(yearSaving(v))} günstiger als 12 Monatszahlungen ({formatEurCents(v.anchorCents)})
                          </p>
                        )}
                        {v.id === "bundle" && (
                          <p className="mt-1 text-xs text-success">
                            {formatEurCents(bundleSaving)} im Monat günstiger als beide Zugänge einzeln ({formatEurCents(v.anchorCents!)})
                          </p>
                        )}
                        <Button
                          onClick={() => buy(v.id)}
                          className="mt-3 w-full rounded-full bg-gradient-primary text-primary-foreground hover:opacity-95"
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          {v.period === "year" ? "Jahreszugang wählen" : "Monatszugang wählen"}
                        </Button>
                      </div>
                    ))}
                  </div>

                  <h4 className="mt-8 mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Leistungen
                  </h4>
                  <ul className="space-y-2.5">
                    {p.contents.map((c) => (
                      <li key={c} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-blue" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Weiter zur gesicherten Zahlung bei Stripe; erst dort wird die Bestellung kostenpflichtig. Ohne Konto
            entsteht dein Konto direkt nach der Zahlung. Gutscheincode {FOUNDER_CODE.code}: {FOUNDER_CODE.percent} % auf
            den ersten Monat eines Monatszugangs.
          </p>
        </section>

        {/* Kündigung + Abrechnung */}
        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">
              <CalendarX className="h-5 w-5 text-accent-blue" /> Kündigung
            </h2>
            <p className="text-sm text-muted-foreground">
              {CANCEL_NOTE} Details in den <Link to="/agb" className="underline">AGB</Link> und der{" "}
              <Link to="/widerruf" className="underline">Widerrufsbelehrung</Link>.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">
              <Receipt className="h-5 w-5 text-accent-blue" /> Abrechnung
            </h2>
            <p className="text-sm text-muted-foreground">
              Monatszugänge verlängern sich um jeweils einen Monat, Jahreszugänge um jeweils zwölf Monate. Du bekommst
              zu jeder Zahlung eine Rechnung mit ausgewiesener Umsatzsteuer. Für EU-Unternehmer mit gültiger
              USt-IdNr. gilt Reverse-Charge.
            </p>
          </div>
        </section>

        {/* Gratis-Einstieg */}
        <section className="mb-14 rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-6 md:p-8">
          <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">
            <Gift className="h-5 w-5 text-accent-blue" /> Erst ausprobieren: {TRIAL_CLAIM}
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Diese Tools kannst du ohne Konto je einmal nutzen. Das Ergebnis gibt es gegen deine E-Mail-Adresse.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {TRIAL_TOOLS.map((t) => (
              <li key={t.slug}>
                <Link to={t.trialPath} className="font-medium text-accent-blue hover:underline">{t.name}</Link>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Nicht enthalten */}
        <section className="mb-14">
          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            <span><strong className="text-foreground">Nicht enthalten:</strong> {NOT_INCLUDED}</span>
          </p>
        </section>

        {/* FAQ — natives <details>, damit die Antworten im prerenderten HTML stehen */}
        <section aria-labelledby="preise-faq">
          <h2 id="preise-faq" className="mb-6 text-2xl md:text-3xl font-bold">Häufige Fragen zu Preisen</h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-border bg-card px-6 py-4 shadow-card">
                <summary className="cursor-pointer list-none font-semibold flex items-center justify-between gap-3">
                  {f.q}
                  <span className="text-muted-foreground transition-transform group-open:rotate-45 shrink-0">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Preise;
