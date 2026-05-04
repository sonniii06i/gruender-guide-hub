import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export const Assistant = () => (
  <section className="py-24">
    <div className="container max-w-6xl">
      <div className="rounded-3xl bg-gradient-primary p-8 md:p-14 text-primary-foreground relative overflow-hidden shadow-glow">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent-blue/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl" />

        <div className="grid md:grid-cols-[1fr,auto] gap-10 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium mb-5 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> KI-Assistent
            </div>
            <h3 className="text-3xl md:text-5xl font-bold leading-tight text-balance">
              Lerne Felix kennen –<br />
              dein persönlicher Gründungs-Co-Pilot.
            </h3>
            <p className="mt-5 text-lg text-primary-foreground/85 max-w-2xl text-balance">
              Felix begleitet dich durch Finanzamt-Fragebogen, USt-Voranmeldung,
              Rechnungs- und Buchhaltungs-Setup, OSS, LUCID, WEEE und sagt dir,
              welche Rechtsform, welche Tools und welche Anbieter wirklich zu
              dir passen. Trainiert auf echten Gründungen aus E-Commerce &
              Creator-Business – nicht auf Wikipedia.
            </p>
            <Button
              size="lg"
              className="mt-8 rounded-full bg-card text-primary hover:bg-card/90 h-14 px-7 font-semibold"
            >
              Jetzt kostenlos testen <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="hidden md:flex h-56 w-56 rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 items-center justify-center text-7xl font-bold">
            F
          </div>
        </div>
      </div>
    </div>
  </section>
);
