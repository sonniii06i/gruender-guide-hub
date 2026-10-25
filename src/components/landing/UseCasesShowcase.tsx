import { CATEGORIES, categoryToolCount, LANDING_TOOLS } from "@/data/features";

// Bottom-of-Funnel: zeigt nochmal die ganze Breite an Use-Cases/Tools.
// Wird auf der Landingpage (vor dem finalen CTA) und im Checkout/Paywall genutzt.
export const UseCasesShowcase = ({ compact = false }: { compact?: boolean }) => {
  const total = LANDING_TOOLS.length;
  return (
    <section className={compact ? "py-2" : "py-14 md:py-28"}>
      <div className="container max-w-6xl px-4">
        <div className={compact ? "mb-6 text-center" : "mb-12 max-w-3xl"}>
          {/* Felix bewusst entfernt – siehe Features.tsx */}
          <h2 className={compact ? "text-2xl font-semibold tracking-tight" : "text-3xl font-semibold leading-[1.1] md:text-[2.75rem]"}>
            {compact ? "Das schaltest du frei" : "Für jeden Schritt deiner Gründung das richtige Tool"}
          </h2>
          <p className={`mt-4 text-muted-foreground ${compact ? "mx-auto max-w-2xl text-sm md:text-base" : "max-w-2xl text-lg leading-relaxed"}`}>
            Von der ersten Idee bis zur internationalen Holding: {total} Tools, Wizards, Rechner und
            Guides plus Felix als KI-Co-Founder. Ein Abo, alles drin.
          </p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            return (
              <li
                key={c.slug}
                className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-[border-color,box-shadow] hover:border-accent-blue/35 hover:shadow-card"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-blue">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[15px] font-semibold leading-tight">{c.title}</h3>
                    <span className="shrink-0 text-xs font-medium text-muted-foreground tabular">
                      {categoryToolCount(c.slug)} Tools
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.tagline}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
