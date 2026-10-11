import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";

const ZIELE = [
  { to: "/tools", title: "Tools", desc: "Rechner, Wizards und Checks fürs Gründen" },
  { to: "/guides", title: "Guides", desc: "Schritt für Schritt durch jede Gründung" },
  { to: "/ratgeber", title: "Ratgeber", desc: "Artikel zu Steuern, Recht und E-Commerce" },
  { to: "/gratis-tools", title: "Gratis-Tools", desc: "Ohne Konto ausprobieren" },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Seo
        title="Seite nicht gefunden | GründerX"
        description="Diese Seite gibt es bei GründerX nicht. Weiter zu Tools, Guides, Ratgeber oder Gratis-Tools."
        path={location.pathname}
        noindex
      />
      <Navbar />
      <main className="flex-1 bg-hero">
        <div className="container max-w-3xl px-4 pb-20 pt-32 md:pt-40">
          <p className="text-sm font-medium text-accent-blue tabular">Fehler 404</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">Diese Seite gibt es nicht.</h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Die Adresse <code className="rounded bg-secondary px-1.5 py-0.5 text-[0.9em] text-foreground">{location.pathname}</code>{" "}
            führt ins Leere. Vielleicht hilft dir einer dieser Einstiege weiter.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {ZIELE.map((z) => (
              <Link
                key={z.to}
                to={z.to}
                className="press group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 hover:border-accent-blue/40 hover:shadow-card"
              >
                <span>
                  <span className="block font-semibold">{z.title}</span>
                  <span className="block text-sm text-muted-foreground">{z.desc}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            ))}
          </div>

          <Button asChild size="lg" className="mt-10 rounded-xl font-semibold">
            <Link to="/">Zur Startseite</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
