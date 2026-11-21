const steps = [
  {
    n: "01",
    title: "Registrieren",
    desc: "Schalte den Zugang frei. Danach legst du in 60 Sekunden dein Konto an.",
  },
  {
    n: "02",
    title: "Mit Felix chatten",
    desc: "Beschreibe dein Vorhaben. Felix erstellt deinen Gründungs-Fahrplan und zeigt dir, welche Dokumente du brauchst.",
  },
  {
    n: "03",
    title: "Unternehmen läuft",
    desc: "Du startest, GründerX zeigt dir Schritt für Schritt, was bei Steuern und Setup ansteht, und erinnert dich an Fristen. Software, keine Steuer- oder Rechtsberatung.",
  },
];

export const HowItWorks = () => (
  <section className="py-14 md:py-20">
    <div className="container max-w-6xl">
      <div className="mb-8 max-w-2xl md:mb-10">
        {/* Felix bewusst entfernt – siehe Features.tsx */}
        <h2 className="text-balance text-2xl font-semibold leading-[1.12] tracking-[-0.02em] text-primary md:text-[2rem]">
          In drei Schritten zum eigenen Unternehmen.
        </h2>
      </div>

      {/* Echte Abfolge, daher nummeriert. Desktop: Schiene mit Verbindungslinie. */}
      <div className="relative">
      <div className="absolute left-5 right-5 top-5 hidden h-px bg-border md:block" aria-hidden="true" />
      <ol className="relative grid gap-8 md:grid-cols-3 md:gap-8">
        {steps.map((s, i) => (
          <li key={s.n} className="relative">
            <span
              className={`relative flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold tabular ${
                i === steps.length - 1
                  ? "border-brand-green/30 bg-brand-green text-brand-green-foreground"
                  : "border-foreground/25 bg-card text-foreground"
              }`}
            >
              {i + 1}
            </span>
            <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 max-w-sm leading-relaxed text-muted-foreground">{s.desc}</p>
          </li>
        ))}
      </ol>
      </div>
    </div>
  </section>
);
