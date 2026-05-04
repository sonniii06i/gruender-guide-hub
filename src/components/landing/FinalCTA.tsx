import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FinalCTA = () => (
  <section className="py-24">
    <div className="container max-w-5xl">
      <div className="rounded-3xl bg-gradient-primary text-primary-foreground p-12 md:p-20 text-center shadow-glow relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-accent-blue/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <h2 className="text-4xl md:text-6xl font-bold text-balance">
            Bereit zu gründen?
          </h2>
          <p className="mt-5 text-lg md:text-xl text-primary-foreground/85 max-w-2xl mx-auto text-balance">
            Starte heute kostenlos – und hab dein Unternehmen in wenigen Tagen
            startklar.
          </p>
          <Button
            size="lg"
            className="mt-9 rounded-full bg-card text-primary hover:bg-card/90 h-12 px-8"
          >
            Jetzt kostenlos starten <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </section>
);
