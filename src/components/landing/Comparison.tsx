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
  <section className="py-14 md:py-20">
    <div className="container max-w-6xl">
      <div className="mb-8 max-w-2xl md:mb-10">
        <h2 className="text-balance text-2xl font-semibold leading-[1.12] tracking-[-0.02em] text-primary md:text-[2rem]">
          Andere Tools erklären nur. GründerX gründet mit dir.
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-[0.9fr,1.1fr]">
        <div className="rounded-lg border border-border bg-secondary/60 p-6 md:p-7">
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

        <div className="rounded-lg border border-primary bg-card p-6 md:p-7">
          <h3 className="text-lg font-semibold text-foreground">GründerX</h3>
          <p className="mb-6 text-sm font-medium text-muted-foreground">Gründungs-Co-Pilot für E-Commerce &amp; Creator</p>
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
