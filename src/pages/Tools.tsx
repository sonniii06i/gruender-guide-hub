import { Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { HubNav } from "@/components/landing/HubNav";
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
        title="Alle Tools für Gründer – Steuer, Rechtsform, Buchhaltung 2026 | GründerX"
        description={`${LANDING_TOOLS.length}+ Rechner, Wizards und Checks für Unternehmensgründung, Steuern, Buchhaltung, Marken und internationale Setups — für deutsche Gründer, E-Commerce & Creator.`}
        path="/tools"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="container max-w-5xl py-12 md:py-16 px-4">
        <header className="mb-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Tools für Gründer
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {LANDING_TOOLS.length}+ Rechner, Wizards und Checks rund um Gründung, Steuern, Buchhaltung,
            Marken und internationale Setups — gebaut für deutsche Gründer, E-Commerce-Brands, Creator
            und Solo-Selbstständige, die ohne teuren Berater starten wollen.
          </p>
        </header>

        <div className="space-y-12">
          {grouped.map(({ cat, tools }) => (
            <section key={cat.slug}>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-1">
                {cat.title.replace(/^[^\wÄÖÜäöü]+/, "").trim()}
              </h2>
              <p className="text-sm text-muted-foreground mb-5">{cat.tagline}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {tools.map((t) => (
                  <Link
                    key={t.slug}
                    to={`/tools/${t.slug}`}
                    className="rounded-xl border border-border bg-card p-4 hover:border-accent-blue/50 transition-colors"
                  >
                    <p className="font-medium text-sm mb-1">{t.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-3">{t.desc}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <HubNav show={["guides", "ratgeber"]} />
      </main>
      <Footer />
    </div>
  );
};

export default Tools;
