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

const proof = [
  { value: "80+", label: "Tools & Wizards" },
  { value: "9", label: "Themen-Kategorien" },
  { value: "EU", label: "Server, DSGVO-konform" },
  { value: "DE / US / HK", label: "Gründungs-Guides" },
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
          <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Early-Bird: 20% Rabatt im ersten Monat mit Code FOUNDER
        </Badge>

        <h1 className="text-5xl md:text-7xl font-extrabold text-balance leading-[1.15] tracking-tight">
          <span className="block">Gründen ohne Steuerberater-</span>
          <span className="block">Wartezeit. <span className="text-accent-blue">Sofort startklar.</span></span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
          Rechtsform wählen, Amazon Business & Seller-Account einrichten, Buchhaltung und Steuer im Griff,
          Marke anmelden – GründerX ist der KI-Co-Pilot für{" "}
          <span className="font-semibold text-foreground">
            Amazon-Seller, E-Commerce-Founder und Creator
          </span>
          . Felix führt dich Schritt für Schritt, statt 40 Browser-Tabs offen zu haben.
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

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link to="/auth" className="w-full sm:w-auto">
            <Button size="lg" className="group w-full sm:w-auto rounded-full bg-gradient-primary hover:opacity-95 text-primary-foreground h-14 px-10 shadow-glow hover:shadow-[0_25px_70px_-15px_hsl(var(--accent-blue)/0.6)] hover:-translate-y-0.5 transition-all duration-300 text-base font-semibold">
              Kostenlos starten <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/#leistungen" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline">
            oder erst Leistungen ansehen
          </Link>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Kostenloses Konto · keine Kreditkarte nötig · monatlich kündbar
        </p>

        {/* Honest Proof-Strip — echte Fakten statt Fake-Testimonials */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
          {proof.map((p) => (
            <div key={p.label} className="flex items-baseline gap-1.5">
              <span className="font-bold text-foreground">{p.value}</span>
              <span className="text-muted-foreground">{p.label}</span>
            </div>
          ))}
        </div>

        {/* Felix als Hero-Begleiter */}
        <div className="mt-12 flex justify-center">
          <img
            src="/mascots/felix-fullbody.png"
            alt="Felix, dein KI-Gründungs-Copilot, mit interaktiver Checkliste"
            className="w-48 md:w-72 max-w-full rounded-3xl shadow-card"
          />
        </div>
      </div>
    </section>
  );
};
