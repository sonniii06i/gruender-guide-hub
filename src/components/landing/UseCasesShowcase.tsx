import { CATEGORIES, categoryToolCount, LANDING_TOOLS } from "@/data/features";

// Bottom-of-Funnel: zeigt nochmal die ganze Breite an Use-Cases/Tools.
// Wird auf der Landingpage (vor dem finalen CTA) und im Checkout/Paywall genutzt.
export const UseCasesShowcase = ({ compact = false }: { compact?: boolean }) => {
  const total = LANDING_TOOLS.length;
  return (
    <section className={compact ? "py-2" : "py-16 md:py-20"}>
      <div className="container max-w-6xl px-4">
        <div className="text-center mb-8 md:mb-10">
          {!compact && (
            <div className="flex justify-center mb-5">
              <img
                src="/mascots/felix-analytical.png"
                alt="Felix, dein KI-Gründungs-Copilot, behält dein Cockpit im Blick"
                loading="lazy"
                className="w-32 md:w-44 max-w-full rounded-2xl shadow-card"
              />
            </div>
          )}
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-blue/10 border border-accent-blue/20 px-3 py-1 text-xs font-semibold text-accent-blue mb-3">
            Alles in einem Cockpit
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            {compact ? "Das schaltest du frei" : "Für jeden Schritt deiner Gründung das richtige Tool"}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Von der ersten Idee bis zur internationalen Holding – {total}+ Tools, Wizards, Rechner &
            Guides plus Felix als KI-Co-Founder. Ein Abo, alles drin.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.slug}
                className="rounded-2xl border border-border bg-card p-4 md:p-5 hover:border-accent-blue/40 hover:shadow-card transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-accent-blue/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-accent-blue" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm leading-tight">{c.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{c.tagline}</p>
                    <p className="text-[11px] font-semibold text-accent-blue mt-2">
                      {categoryToolCount(c.slug)} Tools & Guides
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
