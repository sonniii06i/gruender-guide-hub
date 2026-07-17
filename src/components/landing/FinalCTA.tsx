import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const FinalCTA = () => (
  <section className="py-24">
    <div className="container max-w-5xl">
      <div className="rounded-3xl bg-gradient-primary text-primary-foreground p-12 md:p-20 text-center shadow-glow relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-accent-blue/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <div className="relative flex justify-center mb-8">
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-white/25 blur-3xl" />
            </div>
            <img
              src="/mascots/felix-cheer.png"
              alt="Felix, dein KI-Gründungs-Copilot, feiert deinen Start"
              loading="lazy"
              className="relative w-32 md:w-44 max-w-full drop-shadow-xl animate-floaty"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-balance">
            Bereit zu gründen?
          </h2>
          <p className="mt-5 text-lg md:text-xl text-primary-foreground/85 max-w-2xl mx-auto text-balance">
            Starte heute kostenlos – und hab dein Unternehmen in wenigen Tagen
            startklar.
          </p>
          <Link to="/auth?mode=signup">
            <Button
              size="lg"
              className="mt-9 rounded-full bg-card text-primary hover:bg-card/90 h-12 px-8"
            >
              Jetzt kostenlos starten <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
          <p className="mt-5 text-sm text-primary-foreground/75">
            Kostenloses Konto · keine Kreditkarte · monatlich kündbar · Code{" "}
            <span className="font-semibold text-primary-foreground">FOUNDER</span> = 20 % im 1. Monat
          </p>
        </div>
      </div>
    </div>
  </section>
);
