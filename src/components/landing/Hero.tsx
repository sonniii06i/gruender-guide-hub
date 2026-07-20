import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ShieldCheck, Clock, Sparkles, Calculator, ArrowRight } from "lucide-react";

const chips = [
  { icon: ShieldCheck, label: "DSGVO-konform" },
  { icon: Clock, label: "24/7 verfügbar" },
  { icon: Sparkles, label: "KI-gestützt" },
  { icon: Calculator, label: "Steuer-ready" },
];

/** Bewusst faktisch – keine erfundenen Kundenzahlen. */
const proof = [
  { value: "80+", label: "Tools & Wizards" },
  { value: "78", label: "Schritt-für-Schritt-Guides" },
  { value: "EU", label: "Server, DSGVO-konform" },
  { value: "DE / US / HK", label: "Gründungs-Guides" },
];

export const Hero = () => {
  return (
    <section className="relative bg-hero pt-32 pb-20 md:pt-36 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-60" aria-hidden="true">
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-accent-blue/20 blur-3xl" />
        <div className="absolute top-40 right-1/4 w-96 h-96 rounded-full bg-brand-green/15 blur-3xl" />
      </div>

      <div className="container max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Text-Spalte */}
          <div className="text-center lg:text-left">
            <Badge
              variant="outline"
              className="mb-6 rounded-full border-brand-green/30 bg-brand-green-soft text-brand-green px-4 py-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Early-Bird: 20 % Rabatt im
              ersten Monat mit Code FOUNDER
            </Badge>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.12] tracking-tight text-balance">
              <span className="block">Unternehmen gründen?</span>
              <span className="block text-accent-blue">Sofort startklar.</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 text-balance">
              Rechtsform, Amazon-Business, Buchhaltung &amp; Steuer, Marke – Felix
              führt dich als KI-Co-Pilot Schritt für Schritt durch die ganze
              Gründung, statt 40 Browser-Tabs offen zu haben.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              {chips.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-card"
                >
                  <c.icon className="h-3.5 w-3.5 text-brand-green" />
                  {c.label}
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center">
              <Link to="/auth" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="group w-full sm:w-auto rounded-full bg-gradient-primary hover:opacity-95 text-primary-foreground h-14 px-10 shadow-glow hover:-translate-y-0.5 transition-all duration-300 text-base font-semibold"
                >
                  Kostenlos starten{" "}
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a
                href="#bundles"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                oder erst Preise ansehen
              </a>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Kostenloses Konto · keine Kreditkarte nötig · monatlich kündbar
            </p>
          </div>

          {/* Felix arbeitet, statt zu posieren */}
          <div className="relative order-first lg:order-last">
            <div
              className="absolute inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-green/25 via-accent-blue/10 to-transparent blur-2xl"
              aria-hidden="true"
            />
            <img
              src="/mascots/felix-hero-desk.webp"
              srcSet="/mascots/felix-hero-desk.webp 1x, /mascots/felix-hero-desk@2x.webp 2x"
              alt="Felix, dein KI-Gründungs-Copilot, arbeitet am Laptop eine Gründungs-Checkliste ab"
              width={1376}
              height={768}
              fetchPriority="high"
              decoding="async"
              className="w-full rounded-3xl shadow-card"
            />
          </div>
        </div>

        {/* Honest Proof-Strip — echte Fakten statt Fake-Testimonials */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
          {proof.map((p) => (
            <div key={p.label} className="flex items-baseline gap-1.5">
              <span className="font-bold text-foreground">{p.value}</span>
              <span className="text-muted-foreground">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
