import { Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { HubNav } from "@/components/landing/HubNav";
import { PageHeader } from "@/components/landing/PageHeader";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, LANDING_TOOLS } from "@/data/features";

const SITE = "https://gruenderx.de";

/**
 * Öffentliche Übersicht aller Cockpit-Tools (/tools) — crawlbarer Hub, der auf
 * jede /tools/:slug-Landing verlinkt. Zeigt KEINEN Bezahl-Inhalt.
 */
const Tools = () => {
  // Nur Kategorien mit landing-fähigen Tools, in der CATEGORIES-Reihenfolge.
  const grouped = CATEGORIES.map((cat) => ({
    cat,
    tools: LANDING_TOOLS.filter((t) => t.categorySlug === cat.slug),
  })).filter((g) => g.tools.length > 0);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "GründerX Tools für Gründer",
      itemListElement: LANDING_TOOLS.slice(0, 60).map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE}/tools/${t.slug}`,
        name: t.title,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: SITE },
        { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE}/tools` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Tools für Gründer: Steuer & Rechtsform 2026 | GründerX"
        description={`${LANDING_TOOLS.length} Rechner, Wizards und Checks für Unternehmensgründung, Steuern, Buchhaltung, Marken und internationale Setups — für deutsche Gründer, E-Commerce & Creator.`}
        path="/tools"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main>
        <PageHeader zentriert
          crumbs={[{ label: "Start", to: "/" }, { label: "Tools" }]}
          title="Tools für Gründer"
          lead={
            <p>
              {LANDING_TOOLS.length} Rechner, Wizards und Checks rund um Gründung, Steuern, Buchhaltung, Marken und
              internationale Setups, gebaut für deutsche Gründer, E-Commerce-Brands, Creator und
              Solo-Selbstständige, die ohne teuren Berater starten wollen.
            </p>
          }
        >
          <nav aria-label="Kategorien" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:flex-wrap">
            {grouped.map(({ cat, tools }) => (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground/80 shadow-card transition-colors hover:border-accent-blue/40 hover:text-foreground"
              >
                {cat.title.replace(/^[^\wÄÖÜäöü]+/, "").trim()}
                <span className="text-xs text-muted-foreground tabular">{tools.length}</span>
              </a>
            ))}
          </nav>
        </PageHeader>

        <div className="container max-w-5xl px-4 py-14 md:py-20">
          <div className="space-y-16">
            {grouped.map(({ cat, tools }) => {
              const Icon = cat.icon;
              return (
                <section key={cat.slug} id={cat.slug} className="scroll-mt-24">
                  <div className="mb-6 flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-blue">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                        {cat.title.replace(/^[^\wÄÖÜäöü]+/, "").trim()}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">{cat.tagline}</p>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {tools.map((t) => (
                      <Link
                        key={t.slug}
                        to={`/tools/${t.slug}`}
                        className="press group flex flex-col rounded-xl border border-border bg-card p-4 hover:border-accent-blue/40 hover:shadow-card"
                      >
                        <p className="mb-1 flex items-start justify-between gap-2 text-sm font-semibold">
                          {t.title}
                          <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent-blue" aria-hidden="true" />
                        </p>
                        <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">{t.desc}</p>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <HubNav show={["guides", "ratgeber"]} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tools;
