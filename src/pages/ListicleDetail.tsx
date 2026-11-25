import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, ExternalLink, Lightbulb, ShieldAlert, Sparkles } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { getListicle, LISTICLES } from "@/data/listicles";
import { MobileCtaBar } from "@/components/landing/MobileCtaBar";

const SITE = "https://gruenderx.de";

const ListicleDetail = () => {
  const { slug = "" } = useParams();
  const item = getListicle(slug);

  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <Seo title="Listicle nicht gefunden | GründerX" description="Diese Übersicht existiert nicht." path={`/listicles/${slug}`} noindex />
        <Navbar />
        <main className="container max-w-xl px-4 pb-24 pt-28 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Übersicht nicht gefunden</h1>
          <p className="mt-2 text-sm text-muted-foreground">Diese Seite existiert nicht (mehr).</p>
          <Button asChild className="mt-6">
            <Link to="/listicles">Alle Listicles ansehen</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const andere = LISTICLES.filter((l) => l.slug !== item.slug).slice(0, 3);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: item.titel,
      description: item.seoDescription,
      dateModified: item.standIso,
      author: { "@type": "Organization", name: "GründerX" },
      publisher: { "@type": "Organization", name: "GründerX", url: SITE },
      mainEntityOfPage: `${SITE}/listicles/${item.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: item.titel,
      itemListElement: item.punkte.map((p) => ({
        "@type": "ListItem",
        position: p.nummer,
        name: p.titel,
        description: p.kurz,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: SITE },
        { "@type": "ListItem", position: 2, name: "Listicles", item: `${SITE}/listicles` },
        { "@type": "ListItem", position: 3, name: item.titel, item: `${SITE}/listicles/${item.slug}` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Seo
        title={item.seoTitle}
        description={item.seoDescription}
        path={`/listicles/${item.slug}`}
        type="article"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main id="inhalt" className="container max-w-3xl px-4 pb-16 pt-20 md:pt-24">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Start</Link>
          <span aria-hidden="true">/</span>
          <Link to="/listicles" className="hover:text-foreground">Listicles</Link>
          <span aria-hidden="true">/</span>
          <span className="truncate text-foreground">{item.kategorie}</span>
        </nav>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="rounded-md bg-secondary px-2.5 py-1 text-foreground">{item.kategorie}</span>
            <span className="inline-flex items-center gap-1 tabular">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {item.lesezeit} Lesezeit
            </span>
            <span>· Stand: {item.stand}</span>
          </div>

          <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-balance sm:text-3xl md:text-4xl">
            {item.titel}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            {item.lead}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Für: <strong className="font-medium text-foreground">{item.zielgruppe}</strong>
          </p>
        </header>

        {/* Schnellsprung-Leiste (Studyflix/Knowunity-Scannability) */}
        <section className="mb-8 rounded-xl border border-border bg-card p-4 shadow-sm" aria-label="Auf einen Blick">
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Auf einen Blick ({item.punkte.length} Punkte)
          </p>
          <ol className="grid gap-1.5 sm:grid-cols-2">
            {item.punkte.map((p) => (
              <li key={p.nummer}>
                <a
                  href={`#punkt-${p.nummer}`}
                  className="flex items-start gap-2 rounded-md px-2 py-1.5 text-sm text-foreground/85 transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green-soft text-xs font-semibold text-brand-green tabular">
                    {p.nummer}
                  </span>
                  <span className="leading-snug">{p.titel}</span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        {/* Punkt-Karten */}
        <ol className="space-y-4">
          {item.punkte.map((p) => (
            <li
              key={p.nummer}
              id={`punkt-${p.nummer}`}
              className="scroll-mt-24 rounded-xl border border-border bg-card p-5 shadow-sm md:p-6"
            >
              <div className="flex items-start gap-3.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground tabular">
                  {p.nummer}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-semibold leading-snug tracking-tight md:text-xl">
                    {p.titel}
                  </h2>
                  <p className="mt-1.5 text-sm font-medium text-foreground">
                    {p.kurz}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                    {p.detail}
                  </p>

                  <div className="mt-3.5 flex items-start gap-2 rounded-lg border border-brand-green/25 bg-brand-green-soft/60 px-3.5 py-2.5 text-xs leading-relaxed text-foreground md:text-sm">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
                    <span><strong className="font-semibold">Praxis-Schritt:</strong> {p.praxisTipp}</span>
                  </div>

                  {p.risikoHinweis && (
                    <div className="mt-2.5 flex items-start gap-2 rounded-lg border border-warning/30 bg-warning-soft px-3.5 py-2.5 text-xs leading-relaxed text-foreground">
                      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
                      <span>{p.risikoHinweis}</span>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* Vergleichs- & Kostentabelle (SEO + AI-Zitierbarkeit) */}
        {item.vergleichTabelle && (
          <section className="mt-8 rounded-xl border border-border bg-card p-5 shadow-sm md:p-6">
            <h2 className="text-lg font-semibold tracking-tight">{item.vergleichTabelle.titel}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{item.vergleichTabelle.lead}</p>
            <div className="mt-4 overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[540px] border-collapse text-left text-xs sm:text-sm">
                <thead className="bg-secondary/70 text-foreground">
                  <tr>
                    {item.vergleichTabelle.kopf.map((col) => (
                      <th key={col} className="border-b border-border px-3.5 py-2.5 font-semibold">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/70">
                  {item.vergleichTabelle.zeilen.map((row) => (
                    <tr key={row[0]} className="bg-card">
                      {row.map((cell, idx) => (
                        <td
                          key={idx}
                          className={idx === 0 ? "px-3.5 py-2.5 font-semibold text-foreground" : "px-3.5 py-2.5 text-muted-foreground"}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2.5 text-xs text-muted-foreground">{item.vergleichTabelle.fuss}</p>
          </section>
        )}

        {/* Voraussetzungen-Box (z. B. Amex US) */}
        {item.voraussetzungenBox && (
          <section className="mt-8 rounded-xl border border-primary/25 bg-card p-5 shadow-sm md:p-6">
            <h2 className="text-lg font-semibold tracking-tight">{item.voraussetzungenBox.titel}</h2>
            <ul className="mt-4 space-y-3">
              {item.voraussetzungenBox.eintraege.map((e) => (
                <li key={e.label} className="flex items-start gap-2.5 text-sm leading-relaxed">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-foreground">{e.label}:</strong>{" "}
                    <span className="text-muted-foreground">{e.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Nächster Schritt CTA */}
        <section className="mt-8 rounded-xl border border-primary/30 bg-primary p-5 text-primary-foreground shadow-sm md:p-6">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-green-glow">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Dein nächster Schritt
          </p>
          <h2 className="mt-1.5 text-xl font-semibold tracking-tight">{item.naechsterSchritt.titel}</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-primary-foreground/85">
            {item.naechsterSchritt.text}
          </p>
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <Link
              to={item.naechsterSchritt.quizTo}
              className="press inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-green px-5 py-2.5 text-sm font-semibold text-brand-green-foreground transition-opacity hover:opacity-95"
            >
              {item.naechsterSchritt.quizLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to={item.naechsterSchritt.guideTo}
              className="press inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-primary-foreground/25 bg-primary-foreground/10 px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/20"
            >
              {item.naechsterSchritt.guideLabel}
            </Link>
          </div>
        </section>

        {/* Quellen & Hinweis */}
        <footer className="mt-8 border-t border-border pt-6 text-xs text-muted-foreground">
          <p className="font-semibold text-foreground">Quellen & Stand ({item.stand})</p>
          <ul className="mt-2 space-y-1.5">
            {item.quellen.map((q) => (
              <li key={q.url}>
                <a
                  href={q.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-accent-blue hover:underline"
                >
                  {q.label} <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            Hinweis: GründerX ist eine Software zur strukturierten Orientierung und keine Steuer-, Finanz- oder Rechtsberatung im Einzelfall.
          </p>
        </footer>

        {/* Weitere Listicles */}
        {andere.length > 0 && (
          <section className="mt-10 border-t border-border pt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold">Weitere Kurz-Übersichten</h2>
              <Link to="/listicles" className="text-xs font-medium text-accent-blue hover:underline">
                Alle ansehen
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {andere.map((a) => (
                <Link
                  key={a.slug}
                  to={`/listicles/${a.slug}`}
                  className="press rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
                >
                  <p className="text-xs font-medium text-muted-foreground">{a.kategorie} · {a.lesezeit}</p>
                  <p className="mt-1 text-sm font-semibold leading-snug">{a.titel}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-8">
          <Link to="/listicles" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Zurück zu allen Listicles
          </Link>
        </div>
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
};

export default ListicleDetail;
