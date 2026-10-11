import { Compass, Lightbulb, Heart } from "lucide-react";

const points = [
  {
    icon: Compass,
    title: "Wir starten gerade selbst",
    text: "GründerX ist brandneu: noch keine Kundenstimmen, keine Fake-Logos, keine ausgedachten Founder-Quotes. Stattdessen ein ehrliches Werkzeug, an dem wir täglich bauen.",
  },
  {
    icon: Lightbulb,
    title: "Aus eigener Frustration entstanden",
    text: "Wir haben selbst Amazon-Seller, UGs, US-LLCs und Hong-Kong-Setups durchgezogen und uns jedes Mal gewünscht, dass uns jemand klar an die Hand nimmt, statt 40 Browser-Tabs offen zu haben.",
  },
  {
    icon: Heart,
    title: "Genau das wollen wir bauen",
    text: "Den Co-Piloten, den wir am Anfang gebraucht hätten: Schritt-für-Schritt-Playbooks, Frist-Cockpit, ehrlicher Anbieter-Vergleich. Sei einer der ersten, die mit uns starten.",
  },
];

export const Testimonials = () => (
  <section className="border-t border-border/70 bg-card py-20 md:py-28">
    <div className="container grid max-w-6xl items-start gap-12 lg:grid-cols-[0.9fr,1.1fr] lg:gap-20">
      <div className="lg:sticky lg:top-28">
        <img
          src="/mascots/felix-cheer.png"
          alt="Felix, dein KI-Gründungs-Copilot, freut sich mit dir"
          loading="lazy"
          width={160}
          height={160}
          className="mb-6 w-28 drop-shadow-xl md:w-36"
        />
        <p className="mb-4 text-sm font-medium text-accent-blue">Warum es GründerX gibt</p>
        <h2 className="text-3xl font-semibold leading-[1.1] md:text-[2.75rem]">
          Das Tool, das wir uns selbst gewünscht hätten.
        </h2>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
          Keine Fake-Testimonials, keine erfundenen 5-Sterne-Bewertungen. Nur die ehrliche Geschichte, warum
          wir GründerX bauen.
        </p>
      </div>

      <ul className="divide-y divide-border border-y border-border">
        {points.map((p) => (
          <li key={p.title} className="flex gap-5 py-8">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
              <p.icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 max-w-prose leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
