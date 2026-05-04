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

        <h1 className="text-5xl md:text-7xl font-extrabold text-balance leading-[1.1]">
          Unternehmen{" "}
          <span className="bg-gradient-primary bg-clip-text text-transparent inline-block pb-2">
            gründen?
          </span>
          <br />
          <span className="bg-gradient-primary bg-clip-text text-transparent inline-block pb-2">
            Sofort startklar.
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
          GründerX kombiniert fortschrittliche KI mit Gründungs- und Steuerwissen für{" "}
          <span className="font-semibold text-foreground">
            E-Commerce-Händler, Creator und Founder
          </span>
          . Von der Rechtsform bis zur ersten USt-Voranmeldung – dein KI-Co-Pilot für jeden Schritt.
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
          <Button size="lg" className="rounded-full bg-accent-blue hover:bg-accent-blue/90 text-accent-blue-foreground h-12 px-7 shadow-glow">
            Kostenlos starten <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full h-12 px-7">
            Leistungen ansehen
          </Button>
        </div>
      </div>
    </section>
  );
};
