import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { TOOL_COUNT, GUIDE_COUNT, ANBIETER_ANZAHL } from "@/data/kennzahlen";
import { HeroFahrplan } from "./HeroFahrplan";
import { PLANS, FOUNDER_CODE, formatEurCents } from "@/config/pricing";

/** Bewusst faktisch, keine erfundenen Kundenzahlen. Zahlen kommen aus den Datenquellen. */
const proof = [
  { value: String(TOOL_COUNT), label: "Tools & Wizards" },
  { value: String(GUIDE_COUNT), label: "Schritt-für-Schritt-Guides" },
  { value: String(ANBIETER_ANZAHL), label: "Anbieter im Vergleich" },
  { value: "EU", label: "Server, DSGVO-konform" },
];

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-hero pt-28 md:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-dots [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" aria-hidden="true" />

      <div className="container relative max-w-6xl">
        <div className="grid items-center gap-10 pb-14 lg:grid-cols-[1fr,1.05fr] lg:gap-14 lg:pb-20">
          {/* Text-Spalte */}
          <div>
            {/* Zielgruppe zuerst: Relevanz muss in 3 Sekunden sitzen. */}
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 py-1 pl-1 pr-3 text-sm text-foreground/80">
              <img src="/mascots/felix-face.png" alt="" width={24} height={24} className="h-6 w-6 rounded-full bg-brand-green-soft object-cover" />
              Gründungs-Cockpit mit KI-Co-Pilot Felix
            </p>

            <h1 className="text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-[3.1rem]">
              Gründung, Steuer &amp; Marketplace-Setup.{" "}
              <span className="sm:block">In der richtigen Reihenfolge.</span>
            </h1>

            {/* Was es ist und was es tut, fuer wen: in zwei Saetzen. */}
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
              Für E-Commerce-Händler und Creator in Deutschland: Felix baut dir deinen Fahrplan,
              und {TOOL_COUNT} Tools erledigen den Papierkram dazu.
            </p>

            <ul className="mt-6 grid gap-2.5 text-[15px] text-foreground/85">
              {[
                "Rechtsform, Gewerbe und Steuer-Fragebogen Schritt für Schritt",
                "Amazon, LUCID, WEEE und OSS, bevor ein Listing gesperrt wird",
                "Fristen-Kalender, Guides und Anbieter-Vergleich in einem Konto",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand-green" strokeWidth={2.5} aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="group h-[52px] rounded-xl bg-gradient-primary px-7 text-base font-semibold shadow-glow hover:opacity-95"
              >
                <Link to="/auth">
                  Zugang freischalten
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-[52px] rounded-xl px-6 text-base">
                <Link to="/gratis-tools">Gratis-Tools testen</Link>
              </Button>
            </div>

            <p className="mt-5 text-sm text-muted-foreground tabular">
              {formatEurCents(PLANS.gruenderx.grossCents)} im Monat inkl. USt., monatlich kündbar.{" "}
              {FOUNDER_CODE.percent} % im ersten Monat mit Code{" "}
              <strong className="font-semibold text-foreground">{FOUNDER_CODE.code}</strong>.
            </p>
          </div>

          {/* Produktszene: ein Fahrplan mit echten gesetzlichen Fristen */}
          <div className="min-w-0">
            <HeroFahrplan />
          </div>
        </div>
      </div>

      {/* Ehrlicher Fakten-Streifen, eigenes Band unter dem Hero */}
      <div className="relative border-y border-border/80 bg-card/60 backdrop-blur">
        <dl className="container grid max-w-6xl grid-cols-2 divide-border/80 md:grid-cols-4 md:divide-x">
          {proof.map((p) => (
            <div key={p.label} className="px-2 py-5 md:px-6 md:first:pl-0">
              <dt className="sr-only">{p.label}</dt>
              <dd className="text-2xl font-semibold tracking-tight text-foreground tabular md:text-[1.7rem]">{p.value}</dd>
              <dd className="mt-0.5 text-sm text-muted-foreground">{p.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
