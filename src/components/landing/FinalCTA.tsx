import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { PLANS, FOUNDER_CODE, FOUNDER_KURZ, formatEurCents } from "@/config/pricing";

const month = PLANS.gruenderx.grossCents;
const year = PLANS["gruenderx-year"].grossCents;
const perDay = Math.round(month / 30);

export const FinalCTA = () => (
  <section className="py-14 md:py-20">
    <div className="container max-w-6xl px-4">
      <div className="overflow-hidden rounded-2xl bg-ink text-primary-foreground shadow-lg">
        <div className="grid items-center gap-8 p-6 md:grid-cols-[1fr,auto] md:p-10">
          <div>
            <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold text-brand-green-glow">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Dein Plan für 12 bis 70
            </p>
            <h2 className="text-balance text-2xl font-semibold leading-[1.14] tracking-[-0.02em] md:text-[2.125rem]">
              Starte deinen ersten Guide in zwei Minuten.
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-primary-foreground/85">
              Klick dich Schritt für Schritt zu deiner Webseite, deiner App oder deinem Unternehmen. Lieber erst
              kostenlos testen? Mach ein kurzes{" "}
              <Link to="/quiz" className="font-semibold text-primary-foreground underline underline-offset-4">
                Gründer-Quiz
              </Link>{" "}
              oder probiere unsere{" "}
              <Link to="/gratis-tools" className="font-semibold text-primary-foreground underline underline-offset-4">
                Gratis-Tools
              </Link>{" "}
              ohne Konto aus.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="press h-12 rounded-xl bg-card px-6 font-semibold text-primary hover:bg-card/90"
              >
                <Link to="/auth?mode=signup">
                  Kostenlos starten <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="press h-12 rounded-xl border-primary-foreground/25 bg-transparent px-6 font-semibold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/quiz">Quiz machen &amp; Rabatt sichern</Link>
              </Button>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-primary-foreground/75 tabular">
              {formatEurCents(month)} im Monat ({formatEurCents(perDay)} am Tag) oder {formatEurCents(year)} im Jahr,
              zwei Monate geschenkt. Inkl. USt., als Betriebsausgabe absetzbar, jederzeit kündbar. Code{" "}
              <span className="font-semibold text-primary-foreground">{FOUNDER_CODE.code}</span> = {FOUNDER_KURZ}.
            </p>
          </div>
          <img
            src="/mascots/felix-wave.webp"
            srcSet="/mascots/felix-wave.webp 1x, /mascots/felix-wave@2x.webp 2x"
            alt="Felix, dein KI-Gründungsbegleiter, winkt zum Start"
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
