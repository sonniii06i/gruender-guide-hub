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
  <section className="py-20 md:py-28">
    <div className="container max-w-6xl">
      <div className="mb-14 max-w-3xl">
        {/* Felix bewusst entfernt – siehe Features.tsx */}
        <h2 className="text-3xl font-semibold leading-[1.1] md:text-[2.75rem]">
          In drei Schritten zum eigenen Unternehmen.
        </h2>
      </div>

      {/* Echte Abfolge, daher nummeriert. Desktop: Schiene mit Verbindungslinie. */}
      <div className="relative">
      <div className="absolute left-5 right-5 top-5 hidden h-px bg-gradient-to-r from-accent-blue/50 via-border to-brand-green/50 md:block" aria-hidden="true" />
      <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
        {steps.map((s, i) => (
          <li key={s.n} className="relative">
            <span
              className={`relative flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold tabular ${
                i === steps.length - 1
                  ? "border-brand-green/30 bg-brand-green text-brand-green-foreground"
                  : "border-border bg-card text-foreground shadow-card"
              }`}
            >
              {i + 1}
            </span>
            <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 max-w-sm leading-relaxed text-muted-foreground">{s.desc}</p>
          </li>
        ))}
      </ol>
      </div>
    </div>
  </section>
);
