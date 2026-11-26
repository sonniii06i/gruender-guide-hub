import { Link, useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/landing/PageHeader";
import { Check, Gift, ShoppingCart, Receipt, CalendarX, Info, Plus, Sparkles } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { StartAngebotButton } from "@/components/StartAngebotButton";
import { useAuth } from "@/hooks/useAuth";
import { rememberCartVariant } from "@/lib/cart";
import {
  PLANS,
  VAT_RATE,
  CANCEL_NOTE,
  FOUNDER_CODE,
  FOUNDER_KURZ,
  FOUNDER_SATZ,
  SOLO_CONTENTS,
  NOT_INCLUDED,
  formatEurCents,
  netCentsOf,
  schemaPrice,
  type PlanId,
  type PlanVariant,
} from "@/config/pricing";
import { TRIAL_TOOLS, TRIAL_CLAIM } from "@/lib/freetools/trialTools";
import { LANDING_TOOLS } from "@/data/features";
import { SCREENS } from "@/data/screenshots";

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
];

const periodWord = (p: PlanVariant) => (p.period === "year" ? "Jahr" : "Monat");

const yearSaving = (year: PlanVariant) => (year.anchorCents ?? 0) - year.grossCents;

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
    a: `Ja, ohne Konto: WEEE-Check, Brand-Check, LUCID-Wizard und Gründungskosten-Rechner je einmal kostenlos, das Ergebnis gibt es gegen deine E-Mail-Adresse. Dazu kommt je eine kostenlose Nutzung der Generatoren unter /gratis-tools (Businessplan, Rechtsform-Finder, Amazon-Widersprüche). Das Konto selbst legst du kostenlos an; alle Tools, Guides und Felix schaltet das Abo frei, für Neukunden zum Start 7 Tage für 1 €.`,
  },
  {
    q: "Was ist der Unterschied zwischen Monats- und Jahreszugang?",
    a: `Der Funktionsumfang ist gleich. Der Jahreszugang wird einmal im Jahr abgerechnet und kostet ${formatEurCents(PLANS["gruenderx-year"].grossCents)} statt 12 × ${formatEurCents(PLANS.gruenderx.grossCents)} = ${formatEurCents(PLANS["gruenderx-year"].anchorCents!)}. Du sparst ${formatEurCents(yearSaving(PLANS["gruenderx-year"]))}.`,
  },
  {
    q: "Gibt es einen Gutschein?",
    a: `${FOUNDER_SATZ} Du gibst ihn im Stripe-Checkout unter „Promo-Code hinzufügen“ ein; ein Code pro Bestellung.`,
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
    navigate(user ? `/checkout?variant=${id}` : "/auth?mode=kauf");
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
        title={`Preise: GründerX ab ${formatEurCents(PLANS.gruenderx.grossCents)} im Monat inkl. USt.`}
        description={`GründerX kostet ${formatEurCents(PLANS.gruenderx.grossCents)} im Monat oder ${formatEurCents(PLANS["gruenderx-year"].grossCents)} im Jahr. Endpreise inkl. USt., jederzeit kündbar.`}
        path="/preise"
        type="product"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main>
        <PageHeader
          zentriert
          crumbs={[{ label: "Start", to: "/" }, { label: "Preise" }]}
          title={<>Ein Abo. <span className="text-accent-blue">Alle {LANDING_TOOLS.length} Tools &amp; 81 Kurse.</span></>}
          lead={
            <p>
              Alle Tools aus der{" "}
              <Link to="/tools">Tool-Übersicht</Link>, alle{" "}
              <Link to="/guides">Kurse &amp; Guides</Link> und der KI-Co-Pilot Felix,
              ohne Abrechnung pro Tool oder pro Frage.{" "}
              <strong>Alle Preise sind Endpreise inkl. {VAT_PERCENT}&nbsp;% USt.</strong>
            </p>
          }
        />

        <div className="container max-w-5xl px-4 pb-20 pt-10 md:pt-12">
        {/* 7-Tage-für-1-€-Startangebot prominent im Revolut-Stil */}
        <section
          aria-labelledby="startangebot-box"
          className="relative mb-8 overflow-hidden rounded-2xl border border-brand-green/35 bg-white p-5 pl-6 shadow-card md:p-7 md:pl-8"
        >
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-brand-green" />
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0 max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-brand-green-soft px-2.5 py-1 text-xs font-bold text-brand-green">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Für Neukunden · 7 Tage testen
              </span>
              <h2 id="startangebot-box" className="mt-2.5 text-xl font-bold tracking-tight text-primary sm:text-2xl">
                Alles 7 Tage für 1,00 € ausprobieren
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Voller Zugriff auf alle {LANDING_TOOLS.length} Tools, 81 Kurse und Felix. Wenn es nicht passt, kündigst du in den 7 Tagen
                mit einem Klick. Danach {formatEurCents(PLANS.gruenderx.grossCents)}/Monat (inkl. 19 % USt., monatlich kündbar).
              </p>
            </div>
            <div className="shrink-0 md:w-64">
              <StartAngebotButton variant="default" cta="preise-startangebot" />
            </div>
          </div>
        </section>

        {/* Preiskarten: Klare 2-Spalten-Ansicht im Lexoffice-Stil */}
        <section aria-labelledby="plaene" className="mb-16">
          <h2 id="plaene" className="sr-only">Pläne</h2>
          {PRODUCTS.map((p) => {
            const m = PLANS[p.month];
            const y = PLANS[p.year];
            return (
              <div key={p.key} className="space-y-8">
                <div className="grid gap-5 md:grid-cols-2">
                  {/* Monatszugang */}
                  <div className="gx-card flex flex-col p-6 md:p-8">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold text-primary">
                        Flexibel starten
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">Art.-Nr. {m.sku}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-primary">{p.title} · Monatlich</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Monatlich kündbar, voller Zugriff auf alle Kurse und Tools.</p>
                    <div className="mt-5 flex items-baseline gap-1.5">
                      <span className="text-4xl font-bold tracking-[-0.03em] text-primary tabular">{formatEurCents(m.grossCents)}</span>
                      <span className="text-sm font-medium text-muted-foreground">/ {periodWord(m)}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground tabular">
                      inkl. {VAT_PERCENT} % USt. ({formatEurCents(netCentsOf(m.grossCents))} netto)
                    </p>
                    <Button
                      data-cta={`kauf-${m.id}`}
                      onClick={() => buy(m.id)}
                      variant="outline"
                      className="press mt-6 h-12 w-full rounded-xl border-primary text-sm font-semibold text-primary hover:bg-primary hover:text-white"
                    >
                      <ShoppingCart className="mr-1.5 h-4 w-4" />
                      Monatszugang wählen
                    </Button>
                  </div>

                  {/* Jahreszugang klar hervorgehoben */}
                  <div className="flex flex-col rounded-2xl border-2 border-primary bg-white p-6 shadow-soft md:p-8">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-md bg-brand-green px-2.5 py-1 text-xs font-semibold text-white">
                        {formatEurCents(yearSaving(y))} günstiger (2 Monate gratis)
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">Art.-Nr. {y.sku}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-primary">{p.title} · Jährlich</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Derselbe volle Funktionsumfang, einmal jährlich abgerechnet.</p>
                    <div className="mt-5 flex items-baseline gap-1.5">
                      <span className="text-4xl font-bold tracking-[-0.03em] text-primary tabular">{formatEurCents(y.grossCents)}</span>
                      <span className="text-sm font-medium text-muted-foreground">/ {periodWord(y)}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground tabular">
                      inkl. {VAT_PERCENT} % USt. ({formatEurCents(netCentsOf(y.grossCents))} netto)
                      {y.anchorCents ? ` · statt ${formatEurCents(y.anchorCents)} bei 12 Monatszahlungen` : ""}
                    </p>
                    <Button
                      data-cta={`kauf-${y.id}`}
                      onClick={() => buy(y.id)}
                      className="press mt-6 h-12 w-full rounded-xl bg-primary text-sm font-semibold text-white hover:bg-primary/90"
                    >
                      <ShoppingCart className="mr-1.5 h-4 w-4" />
                      Jahreszugang wählen
                    </Button>
                  </div>
                </div>

                {/* Enthaltene Leistungen */}
                <div className="gx-card p-6 md:p-8">
                  <h4 className="text-base font-bold text-primary">In beiden Zugängen vollständig enthalten</h4>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {p.contents.map((c) => (
                      <li key={c} className="flex items-start gap-2.5 text-sm leading-relaxed">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green-soft text-brand-green">
                          <Check className="h-3 w-3" strokeWidth={2.75} aria-hidden="true" />
                        </span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Weiter zur gesicherten Zahlung bei Stripe; erst dort wird die Bestellung kostenpflichtig. Ohne Konto
            entsteht dein Konto direkt nach der Zahlung. Gutscheincode {FOUNDER_CODE.code}:{" "}
            {FOUNDER_KURZ}.
          </p>
        </section>

        {/* Einblick: Ansicht nach der Freischaltung (Beispieldaten) */}
        <section aria-labelledby="einblick" className="mb-16 grid items-center gap-8 rounded-2xl border border-border bg-card p-6 md:grid-cols-[1fr,1.3fr] md:p-8">
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
              src={SCREENS.dashboard.gross}
              srcSet={`${SCREENS.dashboard.klein} 720w, ${SCREENS.dashboard.gross} 1600w`}
              sizes="(min-width: 768px) 560px, 100vw"
              width={1600}
              height={870}
              loading="lazy"
              decoding="async"
              alt={SCREENS.dashboard.alt}
              className="aspect-[16/10] w-full rounded-xl border border-border object-cover object-left-top"
            />
            <figcaption className="mt-2 text-xs text-muted-foreground">Ansicht der App, aufgenommen mit Beispieldaten.</figcaption>
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
            <span>
              <strong className="text-foreground">Nicht enthalten:</strong> {NOT_INCLUDED} Was ein Steuerberater kostet und wann er die
              bessere Wahl ist, zeigt der{" "}
              <Link to="/vergleich/gruendung-selbst-steuerberater-gruenderx" className="underline underline-offset-2 hover:text-foreground">
                Vergleich: selbst, mit Steuerberater oder mit GründerX
              </Link>.
            </span>
          </p>
        </section>

        {/* FAQ — natives <details>, damit die Antworten im prerenderten HTML stehen */}
        <section aria-labelledby="preise-faq">
          <h2 id="preise-faq" className="mb-6 text-2xl font-semibold md:text-3xl">Häufige Fragen zu Preisen</h2>
          <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
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
