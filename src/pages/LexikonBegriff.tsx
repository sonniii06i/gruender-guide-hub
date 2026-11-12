import { Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ChevronLeft, Info } from "lucide-react";
import PublicShell from "@/layouts/PublicShell";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { LexikonText } from "@/components/lexikon/LexikonText";
import { PLANS, formatEurCents } from "@/config/pricing";
import { LEXIKON_BY_SLUG, LEXIKON_THEMEN, lexikonPfad } from "@/data/lexikon";
import { lexikonKlartext, type LexikonBegriff as Begriff, type LexikonBlock } from "@/data/lexikon/types";
import { lexikonInhaltLesen } from "@/lib/lexikon/inhaltLaden";
import NotFound from "./NotFound";

const SITE = "https://gruenderx.de";

const datumDe = (d: string) =>
  // feste Zone: Prerender (UTC) und Besucher rendern dasselbe Datum
  new Date(d).toLocaleDateString("de-DE", { timeZone: "Europe/Berlin", day: "2-digit", month: "long", year: "numeric" });

export default function LexikonBegriff() {
  const { slug = "" } = useParams();
  const begriff = LEXIKON_BY_SLUG[slug];
  if (!begriff) return <NotFound />;
  return (
    <PublicShell>
      {/* Eigene Suspense-Grenze: Die Seite wartet auf inhalte/<slug>.ts; beim Hydrieren bleibt das prerenderte HTML stehen. */}
      <Suspense fallback={<p className="container max-w-3xl px-4 py-36 text-muted-foreground">Begriff wird geladen …</p>}>
        <BegriffSeite key={slug} begriff={begriff} />
      </Suspense>
    </PublicShell>
  );
}

function Block({ block }: { block: LexikonBlock }) {
  switch (block.art) {
    case "text":
      return (
        <p className="mt-4 leading-relaxed text-foreground/90">
          <LexikonText text={block.text} />
        </p>
      );
    case "liste":
      return (
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-foreground/90 marker:text-muted-foreground">
          {block.punkte.map((p, i) => (
            <li key={i}>
              <LexikonText text={p} />
            </li>
          ))}
        </ul>
      );
    case "formel":
      return (
        <p className="mt-4 rounded-xl border border-border bg-secondary/50 px-4 py-3 font-medium tabular">{block.text}</p>
      );
    case "tabelle":
      return (
        <div className="mt-5 overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-sm [&_td]:border-t [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:align-top [&_th]:bg-secondary/60 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold">
            <thead>
              <tr>
                {block.kopf.map((k, i) => (
                  <th key={i} scope="col">{k}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.zeilen.map((z, i) => (
                <tr key={i}>
                  {z.map((c, j) => (
                    <td key={j} className="tabular">{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "hinweis":
      return (
        <p className="mt-5 flex items-start gap-3 rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{block.text}</span>
        </p>
      );
  }
}

function BegriffSeite({ begriff }: { begriff: Begriff }) {
  const inhalt = lexikonInhaltLesen(begriff);
  const pfad = lexikonPfad(begriff.slug);
  const url = `${SITE}${pfad}`;
  const thema = LEXIKON_THEMEN.find((t) => t.key === begriff.thema);
  const verwandt = inhalt.verwandt.map((s) => LEXIKON_BY_SLUG[s]).filter((b): b is Begriff => !!b);

  return (
    <>
      <Seo
        title={begriff.seo.title}
        description={begriff.seo.description}
        path={pfad}
        type="article"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: begriff.begriff,
            description: begriff.seo.description,
            abstract: lexikonKlartext(inhalt.definition),
            image: `${SITE}/og-image.png`,
            inLanguage: "de",
            datePublished: begriff.veroeffentlicht,
            dateModified: begriff.stand,
            // Wie bei den Ratgebern (Betreiber 12.11.2026: „Byline Sonni Buttke“): Autor ist die verantwortliche, echte Person;
            // dass die Texte KI-gestützt entstehen, steht sichtbar am Seitenende.
            author: { "@type": "Person", name: "Sonni Buttke", jobTitle: "Gründer von GründerX", url: `${SITE}/impressum` },
            publisher: {
              "@type": "Organization",
              name: "GründerX",
              logo: { "@type": "ImageObject", url: `${SITE}/favicon.png` },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            citation: inhalt.quellen.map((q) => q.url),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Start", item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: "Lexikon", item: `${SITE}/lexikon` },
              { "@type": "ListItem", position: 3, name: begriff.begriff, item: url },
            ],
          },
        ]}
      />

      <article>
        <header className="relative overflow-hidden border-b border-border/70 bg-hero pb-12 pt-28 md:pb-14 md:pt-32">
          <div
            className="pointer-events-none absolute inset-0 bg-dots [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
            aria-hidden="true"
          />
          <div className="container relative max-w-3xl px-4">
            <Link to="/lexikon" className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ChevronLeft className="mr-1 h-4 w-4" aria-hidden="true" /> Alle Begriffe im Lexikon
            </Link>
            <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
              {thema && (
                <span className="inline-flex items-center rounded-full border border-accent-blue/20 bg-accent px-3 py-0.5 text-[13px] font-medium text-accent-blue">
                  {thema.titel}
                </span>
              )}
              <span>
                Stand: <time dateTime={begriff.stand}>{datumDe(begriff.stand)}</time>
              </span>
            </div>
            <h1 className="text-balance text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.035em] md:text-[3rem]">
              {begriff.begriff}
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed">
              <LexikonText text={inhalt.definition} />
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Von{" "}
              <Link to="/impressum" rel="author" className="font-medium text-foreground hover:underline">Sonni Buttke</Link>
              , Gründer von GründerX
              {begriff.rechtsthema && <> · Erklärt den Begriff, kein Ersatz für Rechts- oder Steuerberatung</>}
            </p>
          </div>
        </header>

        <div className="container max-w-3xl px-4 py-12 md:py-16">
          <nav aria-label="Inhalt" className="rounded-xl border border-border bg-card p-4 md:p-5">
            <p className="text-sm font-semibold">Inhalt</p>
            <ol className="mt-2 space-y-1 text-sm">
              {inhalt.abschnitte.map((a, i) => (
                <li key={i}>
                  <a href={`#abschnitt-${i + 1}`} className="text-accent-blue hover:underline">{a.titel}</a>
                </li>
              ))}
            </ol>
          </nav>

          {inhalt.abschnitte.map((a, i) => (
            <section key={i} aria-labelledby={`abschnitt-${i + 1}`}>
              <h2 id={`abschnitt-${i + 1}`} className="mt-12 scroll-mt-24 text-[1.6rem] font-semibold leading-snug tracking-tight">
                {a.titel}
              </h2>
              {a.bloecke.map((b, j) => (
                <Block key={j} block={b} />
              ))}
            </section>
          ))}

          {verwandt.length > 0 && (
            <section className="mt-14" aria-labelledby="verwandte-begriffe">
              <h2 id="verwandte-begriffe" className="text-lg font-semibold tracking-tight">Verwandte Begriffe</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {verwandt.map((b) => (
                  <Link
                    key={b.slug}
                    to={lexikonPfad(b.slug)}
                    className="press group rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent-blue/40 hover:shadow-card"
                  >
                    <p className="mb-1 text-sm font-semibold leading-snug">{b.begriff}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{b.kurz}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mt-14" aria-labelledby="passende-hilfen">
            <h2 id="passende-hilfen" className="text-lg font-semibold tracking-tight">Passende Tools, Guides und Ratgeber</h2>
            <ul className="mt-4 space-y-3">
              {inhalt.kontext.map((k) => (
                <li key={k.pfad} className="rounded-xl border border-border bg-card p-4">
                  <Link to={k.pfad} className="inline-flex items-center gap-1 text-sm font-semibold text-accent-blue hover:underline">
                    {k.label} <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">{k.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-14" aria-labelledby="quellen">
            <h2 id="quellen" className="text-lg font-semibold tracking-tight">Quellen</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Abgerufen und geprüft am {datumDe(begriff.stand)}. Rechenbeispiele sind frei gewählt und als Beispiel gekennzeichnet.
            </p>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm">
              {inhalt.quellen.map((q) => (
                <li key={q.url}>
                  <a href={q.url} target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">
                    {q.titel}
                  </a>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-14 rounded-2xl border border-border bg-card p-5 md:p-7">
            <h2 className="text-xl font-semibold tracking-tight">Wie geht es bei dir weiter?</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Mit dem kostenlosen Konto hast du Gratis-Tools und Rechner an einem Ort, ohne Kreditkarte. Den vollen Zugang mit
              allen Guides und Felix kannst du danach 7 Tage für 1 € testen, dann {formatEurCents(PLANS.gruenderx.grossCents)} im
              Monat, monatlich kündbar.
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Button asChild size="lg" className="h-11 rounded-xl bg-gradient-primary font-semibold">
                <Link to="/auth" data-cta="lexikon-ende">Kostenlos starten</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 rounded-xl font-semibold">
                <Link to="/gratis-tools" data-cta="lexikon-ende-tools">Gratis-Tools testen</Link>
              </Button>
            </div>
          </section>

          <div className="mt-14 flex items-start gap-3 rounded-2xl border border-border bg-secondary/40 p-5 md:p-6">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              So entsteht diese Seite: mit KI-Unterstützung recherchiert und geschrieben, Zahlen und Fristen an den genannten
              Quellen geprüft, Stand {datumDe(begriff.stand)}. Autor und verantwortlich für den Inhalt:{" "}
              <Link to="/impressum" className="font-semibold text-foreground hover:underline">Sonni Buttke</Link>, Gründer
              von GründerX. Keine Steuer- oder Rechtsberatung – im Einzelfall Steuerberater oder Anwalt fragen.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
