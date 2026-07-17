import { Heart, Lightbulb, Compass } from "lucide-react";

const points = [
  {
    icon: Compass,
    title: "Wir starten gerade selbst",
    text: "GründerX ist brandneu – noch keine Kundenstimmen, keine Fake-Logos, keine ausgedachten Founder-Quotes. Stattdessen: ein ehrliches Werkzeug, an dem wir täglich bauen.",
  },
  {
    icon: Lightbulb,
    title: "Aus eigener Frustration entstanden",
    text: "Wir haben selbst Amazon-Seller, UGs, US-LLCs und Hong-Kong-Setups durchgezogen – und uns jedes Mal gewünscht, dass uns jemand klar an die Hand nimmt, statt 40 Browser-Tabs offen zu haben.",
  },
  {
    icon: Heart,
    title: "Genau das wollen wir bauen",
    text: "Den Co-Piloten, den wir am Anfang gebraucht hätten: Schritt-für-Schritt-Playbooks, Frist-Cockpit, ehrlicher Anbieter-Vergleich. Sei einer der ersten, die mit uns starten.",
  },
];

export const Testimonials = () => (
  <section className="py-24">
    <div className="container max-w-6xl">
      <div className="text-center mb-14">
        <div className="relative flex justify-center mb-6">
          <div className="absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-primary/15 blur-3xl" />
          </div>
          <img
            src="/mascots/felix-cheer.png"
            alt="Felix, dein KI-Gründungs-Copilot, freut sich mit dir"
            loading="lazy"
            className="w-28 md:w-40 max-w-full drop-shadow-xl animate-floaty"
            style={{ animationDelay: "1.5s" }}
          />
        </div>
        <p className="text-sm font-semibold uppercase tracking-wider text-accent-blue mb-3">
          Warum es GründerX gibt
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-balance">
          Das Tool, das wir uns selbst gewünscht hätten.
        </h2>
        <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-balance">
          Keine Fake-Testimonials, keine erfundenen 5-Sterne-Bewertungen.
          Nur die ehrliche Geschichte, warum wir GründerX bauen.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {points.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-border bg-card p-7 shadow-card"
          >
            <div className="h-11 w-11 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground mb-5">
              <p.icon className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {p.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
