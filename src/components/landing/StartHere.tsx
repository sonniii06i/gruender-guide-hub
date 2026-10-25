import { Link } from "react-router-dom";
import { ArrowRight, Gift, ListChecks } from "lucide-react";
import { TRIAL_TOOLS, TRIAL_CLAIM } from "@/lib/freetools/trialTools";
import { GUIDE_LANDINGS } from "@/data/guides";
import { guideHref } from "@/data/guideMerges";

/**
 * Einstieg auf der Startseite: die vier Tools mit kostenloser Probe und die
 * wichtigsten Guides, jeweils EINZELN verlinkt (interne Verlinkung — vorher
 * verlinkte die Startseite /tools genau einmal und keine einzelne Tool- oder
 * Guide-Seite).
 */
const TOP_GUIDE_SLUGS = ["gmbh-gruendung", "ug-gruendung", "einzelunternehmen-gruendung", "amazon-fba-launch"];

const TOP_GUIDES = TOP_GUIDE_SLUGS.map((slug) => GUIDE_LANDINGS.find((g) => g.slug === slug)).filter(
  (g): g is (typeof GUIDE_LANDINGS)[number] => Boolean(g),
);

export const StartHere = () => (
  <section id="einstieg" className="border-t border-border/70 bg-card py-14 md:py-28">
    <div className="container max-w-6xl">
      <h2 className="mb-4 text-3xl font-semibold leading-[1.1] md:text-[2.75rem]">Erst ausprobieren, dann entscheiden.</h2>
      <p className="mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Vier Tools aus dem Cockpit kannst du ohne Konto testen: {TRIAL_CLAIM}. Die Guides zeigen dir vorab,
        was dich Schritt für Schritt erwartet.
      </p>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold">
            <Gift className="h-5 w-5 text-accent-blue" /> Tools kostenlos testen
          </h3>
          <ul className="space-y-3">
            {TRIAL_TOOLS.map((t) => (
              <li key={t.slug} className="rounded-xl border border-border bg-background p-4 transition-colors hover:border-accent-blue/40">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <Link to={t.trialPath} className="font-semibold text-foreground hover:text-accent-blue">
                    {t.name}
                  </Link>
                  {t.landingPath !== t.trialPath && (
                    <Link to={t.landingPath} className="text-xs text-muted-foreground hover:text-foreground">
                      Mehr zum Tool
                    </Link>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold">
            <ListChecks className="h-5 w-5 text-accent-blue" /> Die wichtigsten Guides
          </h3>
          <ul className="space-y-3">
            {TOP_GUIDES.map((g) => (
              <li key={g.slug}>
                <Link
                  to={guideHref(g.slug)}
                  className="press group flex items-center justify-between gap-3 rounded-xl border border-border bg-background p-4 hover:border-accent-blue/40 hover:bg-card hover:shadow-card"
                >
                  <span className="font-medium">{g.title}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
            <Link to="/tools" className="text-accent-blue hover:underline">Alle Tools</Link>
            <Link to="/guides" className="text-accent-blue hover:underline">Alle Guides</Link>
            <Link to="/gratis-tools" className="text-accent-blue hover:underline">Gratis-Tools</Link>
            <Link to="/vorlagen" className="text-accent-blue hover:underline">Vertragsvorlagen</Link>
            <Link to="/preise" className="text-accent-blue hover:underline">Preise</Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);
