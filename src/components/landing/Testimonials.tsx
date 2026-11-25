import { Compass, Lightbulb, Heart } from "lucide-react";

const points = [
  {
    icon: Compass,
    title: "Ehrlich von Anfang an",
    text: "Keine ausgedachten 5-Sterne-Zitate, keine erfundenen Nutzerzahlen und keine fremden Logos. Stattdessen ein klares Werkzeug, an dem wir laufend weiterbauen.",
  },
  {
    icon: Lightbulb,
    title: "Aus echter eigener Praxis entstanden",
    text: "Wir haben selbst Webseiten, Online-Shops, Amazon-Accounts, deutsche Gesellschaften, US-LLCs und internationale Setups durchgezogen. Jedes Mal fehlte ein System, das die Schritte einfach nacheinander ordnet.",
  },
  {
    icon: Heart,
    title: "Gemacht für 12 bis 70",
    text: "Ob erstes eigenes Projekt als Jugendlicher mit Eltern, Nebengewerbe neben dem Job oder Neustart mit über 50: Jeder bekommt denselben ruhigen, verständlichen Ablauf ohne Behördendeutsch.",
  },
];

export const Testimonials = () => (
  <section className="border-t border-border bg-card py-14 md:py-20">
    <div className="container grid max-w-6xl items-start gap-10 px-4 lg:grid-cols-[0.88fr,1.12fr] lg:gap-16">
      <div className="lg:sticky lg:top-28">
        <img
          src="/mascots/felix-cheer.png"
          alt="Felix, dein KI-Gründungsbegleiter"
          loading="lazy"
          width={160}
          height={160}
          className="mb-5 w-24 md:w-32"
        />
        <p className="mb-2.5 inline-flex items-center rounded-full border border-border bg-secondary px-3 py-0.5 text-[12.5px] font-semibold text-primary">
          Warum es GründerX gibt
        </p>
        <h2 className="text-balance text-2xl font-semibold leading-[1.14] tracking-[-0.02em] text-primary md:text-[2.125rem]">
          Das Lern-Studio, das wir uns selbst gewünscht hätten.
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
          Kein lautes Marketing, keine erfundenen Bewertungen. Nur die ehrliche Geschichte, warum wir GründerX bauen.
        </p>
      </div>

      <ul className="space-y-3.5">
        {points.map((p) => (
          <li key={p.title} className="flex gap-4 rounded-2xl border border-border bg-background/60 p-5 shadow-card md:p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card text-primary shadow-sm">
              <p.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
              <p className="mt-1.5 max-w-prose text-[15px] leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
