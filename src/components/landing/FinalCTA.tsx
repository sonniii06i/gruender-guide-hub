import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PLANS, FOUNDER_CODE, FOUNDER_KURZ, formatEurCents } from "@/config/pricing";

// Preise aus config/pricing (vorher hart codiert im Text).
const month = PLANS.gruenderx.grossCents;
const year = PLANS["gruenderx-year"].grossCents;
const perDay = Math.round(month / 30);

export const FinalCTA = () => (
  <section className="py-14 md:py-20">
    <div className="container max-w-6xl">
      <div className="overflow-hidden rounded-lg bg-ink text-primary-foreground">
        <div className="grid items-center gap-8 p-6 md:grid-cols-[1fr,auto] md:p-10">
          <div>
            <h2 className="text-2xl font-semibold leading-[1.12] tracking-[-0.02em] md:text-[2rem]">Bereit zu gründen?</h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-primary-foreground/80">
              Schalte GründerX frei und geh deine Gründung Schritt für Schritt an. Vorher ausprobieren?{" "}
              <Link to="/gratis-tools" className="font-medium text-primary-foreground underline underline-offset-4">
                Einzelne Tools
              </Link>{" "}
              kannst du ohne Konto je einmal kostenlos nutzen.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-7 h-12 bg-card px-6 font-semibold text-primary hover:bg-card/90"
            >
              <Link to="/auth?mode=signup">
                Kostenlos starten <ArrowRight />
              </Link>
            </Button>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-primary-foreground/75 tabular">
              {formatEurCents(month)} im Monat ({formatEurCents(perDay)} am Tag) oder {formatEurCents(year)} im Jahr,
              zwei Monate geschenkt. Inkl. USt., als Betriebsausgabe absetzbar, jederzeit kündbar. Code{" "}
              <span className="font-semibold text-primary-foreground">{FOUNDER_CODE.code}</span> ={" "}
              {FOUNDER_KURZ}.
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
            className="mx-auto w-32 md:w-44"
          />
        </div>
      </div>
    </div>
  </section>
);
