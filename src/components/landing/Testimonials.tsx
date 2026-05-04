const items = [
  {
    quote:
      "Ich hatte morgens die Idee, abends war meine UG angemeldet. Felix hat alle Formulare vorbereitet und mir genau gesagt, was ich beim Notar brauche.",
    name: "Lara K.",
    role: "Gründerin, Skincare-Brand",
  },
  {
    quote:
      "Als TikTok-Shop-Seller war Steuern immer ein Albtraum. OSS, USt, Marktplatz-Abrechnungen – GründerX nimmt mir das alles ab.",
    name: "Marco B.",
    role: "E-Commerce Operator",
  },
  {
    quote:
      "Das Bundle mit AnwaltX ist ein Gamechanger. Gründung, Steuern und Recht in einem Tool – ich brauche keine drei Berater mehr.",
    name: "Sophie R.",
    role: "Creator & Founder",
  },
];

export const Testimonials = () => (
  <section className="py-24">
    <div className="container max-w-6xl">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent-blue mb-3">
          Stimmen aus der Community
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-balance">
          Founder, die schon mit uns gestartet sind.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {items.map((i) => (
          <div
            key={i.name}
            className="rounded-2xl border border-border bg-card p-7 shadow-card"
          >
            <p className="text-foreground leading-relaxed">„{i.quote}"</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                {i.name[0]}
              </div>
              <div>
                <div className="font-semibold text-sm">{i.name}</div>
                <div className="text-xs text-muted-foreground">{i.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
