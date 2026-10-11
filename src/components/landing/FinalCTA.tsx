import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PLANS, FOUNDER_CODE, formatEurCents } from "@/config/pricing";

// Preise aus config/pricing (vorher hart codiert im Text).
const month = PLANS.gruenderx.grossCents;
const year = PLANS["gruenderx-year"].grossCents;
const perDay = Math.round(month / 30);

export const FinalCTA = () => (
  <section className="py-20 md:py-28">
    <div className="container max-w-6xl">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink text-primary-foreground shadow-soft">
        <div className="pointer-events-none absolute inset-0 bg-dots-light" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-brand-green/25 blur-3xl" aria-hidden="true" />
        <div className="relative grid items-center gap-8 p-8 md:grid-cols-[1fr,auto] md:p-16">
          <div>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-6xl">Bereit zu gründen?</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/75">
              Schalte GründerX frei und geh deine Gründung Schritt für Schritt an. Vorher ausprobieren?{" "}
              <Link to="/gratis-tools" className="font-medium text-primary-foreground underline underline-offset-4">
                Einzelne Tools
              </Link>{" "}
              kannst du ohne Konto je einmal kostenlos nutzen.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-9 h-12 rounded-xl bg-card px-6 font-semibold text-primary shadow-none hover:bg-card/90"
            >
              <Link to="/auth?mode=signup">
                Zugang freischalten <ArrowRight />
              </Link>
            </Button>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-primary-foreground/65 tabular">
              {formatEurCents(month)} im Monat ({formatEurCents(perDay)} am Tag) oder {formatEurCents(year)} im Jahr,
              zwei Monate geschenkt. Inkl. USt., als Betriebsausgabe absetzbar, jederzeit kündbar. Code{" "}
              <span className="font-semibold text-primary-foreground">{FOUNDER_CODE.code}</span> ={" "}
              {FOUNDER_CODE.percent} % im 1. Monat.
            </p>
          </div>
          <img
            src="/mascots/felix-wave.webp"
            srcSet="/mascots/felix-wave.webp 1x, /mascots/felix-wave@2x.webp 2x"
            alt="Felix, dein KI-Gründungs-Copilot, winkt und feiert deinen Start"
            loading="lazy"
            decoding="async"
            width={240}
            height={240}
            className="mx-auto w-40 drop-shadow-2xl md:w-60"
          />
        </div>
      </div>
    </div>
  </section>
);
