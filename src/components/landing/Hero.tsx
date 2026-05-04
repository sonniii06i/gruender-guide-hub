import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Clock, Sparkles, Calculator, ArrowRight } from "lucide-react";

const chips = [
  { icon: ShieldCheck, label: "DSGVO-konform" },
  { icon: Clock, label: "24/7 verfügbar" },
  { icon: Sparkles, label: "KI-gestützt" },
  { icon: Calculator, label: "Steuer-ready" },
];

export const Hero = () => {
  return (
    <section className="relative bg-hero pt-36 pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-60">
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-accent-blue/20 blur-3xl" />
        <div className="absolute top-40 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container max-w-5xl text-center">
        <Badge variant="outline" className="mb-6 rounded-full border-accent-blue/30 bg-accent-blue/5 text-accent-blue px-4 py-1.5">
          <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Early-Bird: 10% Rabatt als Gründungsmitglied
        </Badge>

        <h1 className="text-5xl md:text-7xl font-extrabold text-balance leading-[1.15] tracking-tight">
          <span className="block">Unternehmen <span className="text-accent-blue">gründen?</span></span>
          <span className="block">Sofort <span className="text-accent-blue">startklar.</span></span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
          GründerX ist dein KI-Co-Pilot für{" "}
          <span className="font-semibold text-foreground">
            Amazon-Seller, Meta-Ads-Operator, E-Commerce-Founder und Creator
          </span>
          . Von der Rechtsform-Wahl über Amazon Business & Seller Account bis zu Buchhaltung mit Lexware, sevDesk & Co. – Felix führt dich Schritt für Schritt.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {chips.map((c) => (
            <div
              key={c.label}
              className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-card"
            >
              <c.icon className="h-3.5 w-3.5 text-accent-blue" />
              {c.label}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" className="group rounded-full bg-gradient-primary hover:opacity-95 text-primary-foreground h-14 px-8 shadow-glow hover:shadow-[0_25px_70px_-15px_hsl(var(--accent-blue)/0.6)] hover:-translate-y-0.5 transition-all duration-300 text-base font-semibold">
            Kostenlos starten <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full h-14 px-8 border-2 hover:bg-accent-blue/5 hover:border-accent-blue hover:-translate-y-0.5 transition-all duration-300 text-base font-semibold backdrop-blur">
            Leistungen ansehen
          </Button>
        </div>
      </div>
    </section>
  );
};
