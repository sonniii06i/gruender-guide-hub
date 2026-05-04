const steps = [
  {
    n: "01",
    title: "Registrieren",
    desc: "Erstelle in 60 Sekunden deinen Account – kostenlos, keine Kreditkarte nötig.",
  },
  {
    n: "02",
    title: "Mit Felix chatten",
    desc: "Beschreibe dein Vorhaben. Felix erstellt deinen Gründungs-Fahrplan und alle Dokumente.",
  },
  {
    n: "03",
    title: "Unternehmen läuft",
    desc: "Du startest – wir kümmern uns um Steuern, Fristen und das laufende Setup.",
  },
];

export const HowItWorks = () => (
  <section className="py-24">
    <div className="container max-w-6xl">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent-blue mb-3">
          So funktioniert's
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-balance">
          In drei Schritten zum eigenen Unternehmen.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s) => (
          <div
            key={s.n}
            className="rounded-2xl border border-border bg-card p-8 shadow-card"
          >
            <div className="text-5xl font-extrabold text-gradient-primary inline-block mb-4">
              {s.n}
            </div>
            <h3 className="font-bold text-xl mb-2">{s.title}</h3>
            <p className="text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
