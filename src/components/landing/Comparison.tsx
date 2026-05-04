import { Check, X } from "lucide-react";

const generic = [
  "Gibt nur generische Antworten",
  "Kennt weder Amazon noch Meta Ads",
  "Reicht keine Formulare ein",
  "Empfiehlt keine konkreten Anbieter",
  "Verfolgt keine Fristen",
];

const ours = [
  "Trainiert auf realen Gründungen aus Amazon FBA, Shopify & Creator-Bereich",
  "Wählt mit dir die passende Rechtsform: Einzelunternehmen, UG oder GmbH",
  "Begleitet dich beim Amazon Seller / Business Account und Meta Business Manager",
  "Empfiehlt konkrete Tools: Lexware, sevDesk, Lucid, Qonto, Stripe Tax & Co.",
  "Erinnert an Fristen (USt-VA, OSS, EÜR) und automatisiert wiederkehrende Aufgaben",
];

export const Comparison = () => (
  <section className="py-20 bg-secondary/40">
    <div className="container max-w-6xl">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent-blue mb-3">
          Warum GründerX anders ist
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-balance max-w-3xl mx-auto">
          Andere Tools erklären nur –{" "}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            GründerX gründet mit dir.
          </span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
          <h3 className="text-xl font-bold mb-1 text-muted-foreground">ChatGPT & Co.</h3>
          <p className="text-sm text-muted-foreground mb-6">Allgemeine KI ohne Kontext</p>
          <ul className="space-y-3">
            {generic.map((t) => (
              <li key={t} className="flex items-start gap-3 text-muted-foreground">
                <X className="h-5 w-5 mt-0.5 text-destructive/70 flex-shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-accent-blue/30 bg-card p-8 shadow-glow relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-accent-blue/10 blur-3xl" />
          <div className="relative">
            <h3 className="text-xl font-bold mb-1 text-primary">GründerX</h3>
            <p className="text-sm text-accent-blue mb-6 font-medium">
              Gründungs-Co-Pilot für E-Commerce & Creator
            </p>
            <ul className="space-y-3">
              {ours.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <div className="h-5 w-5 mt-0.5 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-success" />
                  </div>
                  <span className="text-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);
