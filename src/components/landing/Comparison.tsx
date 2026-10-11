import { Check, X } from "lucide-react";

const generic = [
  "Gibt nur generische Antworten",
  "Kennt weder Amazon noch Meta Ads",
  "Führt nicht Zeile für Zeile durch ELSTER-Formulare",
  "Empfiehlt keine konkreten Anbieter",
  "Verfolgt keine Fristen",
];

const ours = [
  "Schritt-für-Schritt-Guides für Amazon FBA, Shopify & Creator-Business",
  "Wählt mit dir die passende Rechtsform: Einzelunternehmen, UG oder GmbH",
  "Begleitet dich beim Amazon Seller / Business Account und Meta Business Manager",
  "Empfiehlt konkrete Tools: Lexware, sevDesk, Lucid, Qonto, Stripe Tax & Co.",
  "Erinnert an Fristen (USt-VA, OSS, EÜR) und wertet Amazon- & Stripe-Abrechnungen aus",
];

export const Comparison = () => (
  <section className="py-20 md:py-28">
    <div className="container max-w-6xl">
      <div className="mb-12 max-w-3xl">
        <h2 className="text-3xl font-semibold leading-[1.1] md:text-[2.75rem]">
          Andere Tools erklären nur. GründerX gründet mit dir.
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-[0.9fr,1.1fr]">
        <div className="rounded-2xl border border-border bg-secondary/60 p-7 md:p-8">
          <h3 className="text-lg font-semibold text-muted-foreground">ChatGPT &amp; Co.</h3>
          <p className="mb-6 text-sm text-muted-foreground">Allgemeine KI ohne Kontext</p>
          <ul className="space-y-3.5">
            {generic.map((t) => (
              <li key={t} className="flex items-start gap-3 text-muted-foreground">
                <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground/60" aria-hidden="true" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-accent-blue/25 bg-card p-7 shadow-soft md:p-8">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-blue via-accent-blue to-brand-green" aria-hidden="true" />
          <h3 className="text-lg font-semibold text-foreground">GründerX</h3>
          <p className="mb-6 text-sm font-medium text-accent-blue">Gründungs-Co-Pilot für E-Commerce &amp; Creator</p>
          <ul className="space-y-3.5">
            {ours.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-green-soft">
                  <Check className="h-3 w-3 text-brand-green" aria-hidden="true" />
                </span>
                <span className="text-foreground">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);
