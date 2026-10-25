import { Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { HubNav } from "@/components/landing/HubNav";
import { PageHeader } from "@/components/landing/PageHeader";
import { ArrowRight } from "lucide-react";
import { GUIDE_LANDINGS } from "@/data/guides";
import { guideHref } from "@/data/guideMerges";

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
        url: `${SITE}${guideHref(g.slug)}`,
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
      <main>
        <PageHeader zentriert
          crumbs={[{ label: "Start", to: "/" }, { label: "Guides" }]}
          title="Guides für Gründer"
          lead={
            <p>
              {GUIDE_LANDINGS.length} Schritt-für-Schritt-Guides rund um Gründung, Rechtsform, Holding, Steuern und
              E-Commerce. Jeder Schritt in der richtigen Reihenfolge, verständlich erklärt, ohne Behörden-Deutsch.
            </p>
          }
        />
        <div className="container max-w-5xl px-4 py-14 md:py-20">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDE_LANDINGS.map((g) => (
              <Link
                key={g.slug}
                to={guideHref(g.slug)}
                className="press group flex flex-col rounded-xl border border-border bg-card p-5 hover:border-brand-green/40 hover:shadow-card"
              >
                <p className="mb-1.5 flex items-start justify-between gap-2 font-semibold">
                  {g.title}
                  <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand-green" aria-hidden="true" />
                </p>
                <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">{g.tagline}</p>
                <p className="flex flex-wrap gap-1.5 text-[11px] font-medium text-muted-foreground">
                  <span className="rounded-md bg-secondary px-2 py-0.5">{g.duration}</span>
                  <span className="rounded-md bg-secondary px-2 py-0.5">{g.difficulty}</span>
                  <span className="rounded-md bg-secondary px-2 py-0.5 tabular">{g.steps} Schritte</span>
                </p>
              </Link>
            ))}
          </div>

          <HubNav show={["tools", "ratgeber"]} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GuidesIndex;
