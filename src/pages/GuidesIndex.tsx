import { Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { GUIDE_LANDINGS } from "@/data/guides";

const SITE = "https://gruenderx.de";

/**
 * Öffentliche Übersicht aller Guides (/guides) — crawlbarer Hub, der auf jede
 * /guides/:slug-Landing verlinkt. Zeigt KEINEN Bezahl-Inhalt.
 */
const GuidesIndex = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "GründerX Schritt-für-Schritt-Guides",
      itemListElement: GUIDE_LANDINGS.slice(0, 60).map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE}/guides/${g.slug}`,
        name: g.title,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: SITE },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE}/guides` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Schritt-für-Schritt-Guides für Gründer 2026 | GründerX"
        description={`${GUIDE_LANDINGS.length} Schritt-für-Schritt-Guides: Gründung, Holding, US-LLC, Steuern & E-Commerce — verständlich erklärt, in der richtigen Reihenfolge, ohne Behörden-Deutsch.`}
        path="/guides"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="container max-w-5xl py-12 md:py-16 px-4">
        <header className="mb-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Guides für Gründer</h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {GUIDE_LANDINGS.length} Schritt-für-Schritt-Guides rund um Gründung, Rechtsform, Holding, Steuern und
            E-Commerce — jeder Schritt in der richtigen Reihenfolge, verständlich erklärt, ohne Behörden-Deutsch.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {GUIDE_LANDINGS.map((g) => (
            <Link
              key={g.slug}
              to={`/guides/${g.slug}`}
              className="rounded-xl border border-border bg-card p-4 hover:border-accent-blue/50 transition-colors flex flex-col"
            >
              <p className="font-medium text-sm mb-1">{g.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">{g.tagline}</p>
              <p className="text-[11px] text-muted-foreground/80">
                {g.duration} · {g.difficulty} · {g.steps} Schritte
              </p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GuidesIndex;
