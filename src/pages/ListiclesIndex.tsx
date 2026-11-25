import { Link } from "react-router-dom";
import { ArrowRight, Clock, ListChecks, Sparkles } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { PageHeader } from "@/components/landing/PageHeader";
import { HubNav } from "@/components/landing/HubNav";
import { LISTICLES } from "@/data/listicles";
import { MobileCtaBar } from "@/components/landing/MobileCtaBar";

const SITE = "https://gruenderx.de";

const ListiclesIndex = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "GründerX Listicles & Schnell-Übersichten",
      itemListElement: LISTICLES.map((l, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE}/listicles/${l.slug}`,
        name: l.titel,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: SITE },
        { "@type": "ListItem", position: 2, name: "Listicles", item: `${SITE}/listicles` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Seo
        title="Listicles & Schnell-Checks für Gründer | GründerX"
        description="Kurze, klare Punkt-für-Punkt-Übersichten zu US-Amex, Gründung, Unter 18 starten, Nebengewerbe sowie eigener Website & App. Ohne Textwände, mit Stand und Quelle."
        path="/listicles"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main id="inhalt">
        <PageHeader
          zentriert
          crumbs={[{ label: "Start", to: "/" }, { label: "Listicles" }]}
          title="Kurz auf den Punkt."
          lead={
            <p>
              Wenig Text, klare Reihenfolge, echte Fakten. Jede Übersicht liest du in 3 Minuten auf dem Handy
              und weißt danach genau, was zuerst kommt.
            </p>
          }
        />

        <section className="container max-w-5xl px-4 py-10 md:py-16">
          <div className="grid gap-4 sm:grid-cols-2">
            {LISTICLES.map((item) => (
              <Link
                key={item.slug}
                to={`/listicles/${item.slug}`}
                className="press group flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-primary/40 hover:shadow-md"
              >
                <div className="mb-3 flex items-center justify-between gap-2 text-xs font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 text-foreground">
                    <ListChecks className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
                    {item.kategorie}
                  </span>
                  <span className="inline-flex items-center gap-1 tabular">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {item.lesezeit} · {item.punkte.length} Punkte
                  </span>
                </div>

                <h2 className="text-lg font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary">
                  {item.titel}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.lead}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3 text-sm font-medium text-accent-blue">
                  <span>Übersicht lesen</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-brand-green/30 bg-brand-green-soft/60 p-5 md:flex md:items-center md:justify-between md:gap-6 md:p-6">
            <div>
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-green">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Interaktiv testen
              </p>
              <h2 className="mt-1 text-lg font-semibold tracking-tight">
                Lieber in 60 Sekunden dein eigenes Ergebnis bekommen?
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                In unseren interaktiven Quizzen klickst du dich kurz durch und schaltest am Ende deinen Aktions-Rabatt frei.
              </p>
            </div>
            <Link
              to="/quiz"
              className="press mt-4 inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-95 md:mt-0"
            >
              Zu allen Quizzen <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <HubNav show={["guides", "tools", "ratgeber"]} />
        </section>
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
};

export default ListiclesIndex;
