import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

const tiers = [
  {
    name: "GründerX",
    price: "99,99",
    desc: "Dein KI-Co-Pilot Felix für Gründung, Steuern, Marketplaces und Brand-Launch.",
    features: [
      "Felix – KI-Gründungs-Co-Pilot",
      "DE-Gründung: Rechtsform, Finanzamt-Fragebogen, Steuer-Setup",
      "US-LLC & HK-Limited Wizards (EIN, ITIN, BOI, Banking)",
      "Steuer-Cockpit: USt, OSS, IAB, Fristen-Kalender",
      "Marketplace-Setup: Amazon, Kaufland, Shopify, Stripe, PayPal",
      "Brand-Compliance: WEEE/EAR, LUCID, BattG, GPSR, CPNP",
      "Anbieter-Vergleich: Banking, Buchhaltung, 3PL, Tracking",
      "E-Mail Support",
    ],
    cta: "GründerX wählen",
    highlight: false,
  },
  {
    name: "Founder Bundle",
    price: "179,99",
    desc: "GründerX + AnwaltX in einem. Gründung, Steuern und Recht aus einer Hand – nur im Bundle erhältlich.",
    features: [
      "Alles aus GründerX",
      "Juri – KI-Rechts-Assistentin (AnwaltX)",
      "Vertragsprüfung & Vertragsgenerator",
      "Abmahn- & Streitfall-Hilfe",
      "Rechtssichere Mails versenden",
      "Felix + Juri zusammen im Chat",
      "Priorisierter Support",
    ],
    cta: "Bundle sichern",
    highlight: true,
  },
];

export const Bundles = () => (
  <section id="bundles" className="py-24 bg-secondary/40">
    <div className="container max-w-6xl">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent-blue mb-3">
          Bundles
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-balance max-w-3xl mx-auto">
          GründerX + AnwaltX –{" "}
          <span className="text-gradient-primary inline-block">
            stärker zusammen.
          </span>
        </h2>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
          Gründung und Recht greifen ineinander. Hol dir beide KIs im Bundle und
          spare gegenüber den Einzelpreisen.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 items-stretch">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`rounded-3xl p-8 flex flex-col ${
              t.highlight
                ? "bg-gradient-primary text-primary-foreground shadow-glow md:scale-105 border border-accent-blue/40"
                : "bg-card border border-border shadow-card"
            }`}
          >
            {t.highlight && (
              <div className="inline-flex self-start items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-semibold mb-4">
                <Sparkles className="h-3.5 w-3.5" /> Beliebteste Wahl
              </div>
            )}
            <h3 className="text-xl font-bold mb-2">{t.name}</h3>
            <p
              className={`text-sm mb-6 ${
                t.highlight ? "text-primary-foreground/80" : "text-muted-foreground"
              }`}
            >
              {t.desc}
            </p>
            <div className="mb-6">
              <span className="text-5xl font-extrabold">{t.price}€</span>
              <span
                className={
                  t.highlight ? "text-primary-foreground/70" : "text-muted-foreground"
                }
              >
                {" "}
                /Monat
              </span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check
                    className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                      t.highlight ? "text-primary-foreground" : "text-success"
                    }`}
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              className={`w-full rounded-full ${
                t.highlight
                  ? "bg-card text-primary hover:bg-card/90"
                  : "bg-accent-blue text-accent-blue-foreground hover:bg-accent-blue/90"
              }`}
            >
              {t.cta}
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);
