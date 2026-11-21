import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScreenshotFrame } from "@/components/marketing/Marketing";
import { SCREENS } from "@/data/screenshots";
import { guideHref } from "@/data/guideMerges";
import { GUIDE_COUNT } from "@/data/kennzahlen";

/** Beispielhafte Guides – Slugs entsprechen /guides/:slug aus playbooks.ts */
const SAMPLE_GUIDES = [
  { slug: "gmbh-gruendung", title: "GmbH gründen", meta: "Mittel · 1.000–1.500 €" },
  { slug: "ug-gruendung", title: "UG gründen", meta: "Einfach · ab 1 € Stammkapital" },
  { slug: "holding", title: "Holding-Struktur", meta: "Komplex · ~1,5 % auf Ausschüttungen (§ 8b KStG)" },
  { slug: "amazon-fba-launch", title: "Amazon FBA Launch", meta: "Mittel · Sourcing bis erster Sale" },
  { slug: "us-llc", title: "US-LLC gründen", meta: "Komplex · EIN, ITIN, Form 5472" },
  { slug: "oss-anmeldung", title: "OSS-Anmeldung", meta: "Einfach · EU-weit verkaufen" },
];

/**
 * Guides-Section: zeigt die Playbooks (Anzahl aus GUIDE_COUNT) als konkrete Schritt-Kette.
 * Felix zeigt auf den nächsten offenen Schritt – "du bist hier".
 */
export const GuidesRoadmap = () => (
  <section id="guides" className="border-y border-border/70 bg-card py-14 md:py-20">
    <div className="container max-w-6xl">
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr,0.85fr] lg:gap-16">
        <div className="order-last min-w-0 lg:order-first">
          <ScreenshotFrame shot={SCREENS.guideTiktok} fade={false} />
        </div>

        <div className="min-w-0">
          <p className="mb-2 text-[13px] font-semibold text-muted-foreground">Guides &amp; Playbooks</p>
          <h2 className="text-balance text-2xl font-semibold leading-[1.12] tracking-[-0.02em] text-primary md:text-[2rem]">
            {GUIDE_COUNT} Wege, die schon jemand vor dir gegangen ist.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Jeder Guide ist eine abhakbare Schritt-Kette mit Formularen, echten
            Beträgen und Paragrafen, nicht der übliche Blog-Artikel.
          </p>

          <div className="mt-8 grid gap-2.5 sm:grid-cols-2">
            {SAMPLE_GUIDES.map((g) => (
              <Link
                key={g.slug}
                to={guideHref(g.slug)}
                className="press group flex min-w-0 items-center justify-between gap-3 rounded-md border border-border bg-background px-4 py-3.5 hover:border-foreground/30 hover:bg-card"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">{g.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{g.meta}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
              </Link>
            ))}
          </div>

          <Button asChild variant="outline" size="lg" className="mt-7">
            <Link to="/guides">
              Alle {GUIDE_COUNT} Guides ansehen
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);
