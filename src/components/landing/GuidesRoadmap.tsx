import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mascot } from "./Mascot";

/** Beispielhafte Guides – Slugs entsprechen /guides/:slug aus playbooks.ts */
const SAMPLE_GUIDES = [
  { slug: "gmbh-gruendung", title: "GmbH gründen", meta: "Mittel · 1.000–1.500 €" },
  { slug: "ug-gruendung", title: "UG gründen", meta: "Einfach · ab 1 € Stammkapital" },
  { slug: "holding", title: "Holding-Struktur", meta: "Komplex · ~1,5 % auf Ausschüttungen" },
  { slug: "amazon-fba-launch", title: "Amazon FBA Launch", meta: "Mittel · Sourcing bis erster Sale" },
  { slug: "us-llc", title: "US-LLC gründen", meta: "Komplex · EIN, ITIN, BOI" },
  { slug: "oss-anmeldung", title: "OSS-Anmeldung", meta: "Einfach · EU-weit verkaufen" },
];

/**
 * Guides-Section: zeigt die 78 Playbooks als konkrete Schritt-Kette.
 * Felix zeigt auf den nächsten offenen Schritt – "du bist hier".
 */
export const GuidesRoadmap = () => (
  <section id="guides" className="py-20 md:py-24">
    <div className="container max-w-6xl">
      <div className="grid lg:grid-cols-[auto,1fr] gap-10 lg:gap-14 items-center">
        <div className="flex justify-center">
          <Mascot
            name="felix-roadmap"
            alt="Felix zeigt auf den nächsten offenen Schritt einer Gründungs-Roadmap"
            className="w-52 md:w-64"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-green mb-3">
            Guides &amp; Playbooks
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-balance leading-tight">
            78 Wege, die schon jemand vor dir gegangen ist.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Jeder Guide ist eine abhakbare Schritt-Kette mit Formularen, echten
            Beträgen und Paragrafen – nicht der übliche Blog-Artikel.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {SAMPLE_GUIDES.map((g) => (
              <Link
                key={g.slug}
                to={`/guides/${g.slug}`}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-card hover:border-brand-green/50 hover:shadow-soft transition-all"
              >
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">{g.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{g.meta}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 group-hover:text-brand-green group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>

          <Button asChild variant="outline" size="lg" className="mt-8 rounded-full">
            <Link to="/guides">
              Alle 78 Guides ansehen
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);
