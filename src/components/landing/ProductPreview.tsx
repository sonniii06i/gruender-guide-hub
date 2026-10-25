import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { TOOL_COUNT } from "@/data/kennzahlen";

const S = "/screens/2026-10";

const SHOTS = [
  {
    file: "uebersicht",
    alt: "GründerX-Cockpit mit Fristen der nächsten 14 Tage, Event-Radar und Einstieg für Anfänger",
    caption: "Cockpit: was diese Woche ansteht und wo du weitermachst",
  },
  {
    file: "rechtsform",
    alt: "Rechtsform-Wizard mit Empfehlung UG und Begründung",
    caption: "Rechtsform-Wizard mit begründeter Empfehlung",
  },
  {
    file: "steuerkalender",
    alt: "Steuer- und Fristenkalender mit den Terminen der nächsten 12 Monate",
    caption: "Steuer- und Fristenkalender für deine Situation",
  },
];

const Shot = ({ file, alt, caption, eager = false }: { file: string; alt: string; caption: string; eager?: boolean }) => (
  <figure className="min-w-0">
    <div className="overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-soft">
      <img
        src={`${S}/${file}.webp`}
        srcSet={`${S}/${file}-720.webp 720w, ${S}/${file}.webp 1440w`}
        sizes="(min-width: 1024px) 60vw, 100vw"
        width={1440}
        height={900}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="aspect-[16/10] w-full rounded-xl object-cover object-left-top"
      />
    </div>
    <figcaption className="mt-3 text-sm text-muted-foreground">{caption}</figcaption>
  </figure>
);

/**
 * Produkt-Einblick direkt unter dem Hero: echte Screenshots der App
 * (10/2026, Testkonto ohne Kundendaten) statt Illustrationen.
 */
export const ProductPreview = () => (
  <section className="mt-10 border-y border-border/70 bg-card py-14 md:py-28" aria-labelledby="einblick">
    <div className="container max-w-6xl">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h2 id="einblick" className="text-3xl font-semibold leading-[1.1] md:text-[2.75rem]">
            So sieht die Arbeit in GründerX aus.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Echte Ansichten aus der App, aufgenommen mit einem Testkonto. Insgesamt {TOOL_COUNT} Tools,
            Wizards und Rechner, alle im selben Cockpit.
          </p>
        </div>
        <Link
          to="/tools"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent-blue"
        >
          Alle Tools ansehen
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.45fr,1fr] lg:gap-8">
        <Shot {...SHOTS[0]} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          <Shot {...SHOTS[1]} />
          <Shot {...SHOTS[2]} />
        </div>
      </div>
    </div>
  </section>
);
