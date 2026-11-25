import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Gift, Sparkles, Trophy, Zap, ClipboardList } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { PageHeader } from "@/components/landing/PageHeader";
import { HubNav } from "@/components/landing/HubNav";
import { QUIZZES } from "@/data/quizzes";
import { FOUNDER_CODE, FOUNDER_KURZ } from "@/config/pricing";
import { MobileCtaBar } from "@/components/landing/MobileCtaBar";
import { cn } from "@/lib/utils";

const SITE = "https://gruenderx.de";

const QuizIndex = () => {
  const [filter, setFilter] = useState<"alle" | "quiz" | "umfrage">("alle");
  const quizCount = QUIZZES.filter((q) => q.kind === "quiz").length;
  const surveyCount = QUIZZES.filter((q) => q.kind === "umfrage").length;
  const shown = filter === "alle" ? QUIZZES : QUIZZES.filter((q) => q.kind === filter);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "GründerX Interaktive Quizze & Umfragen",
      itemListElement: QUIZZES.map((q, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE}${q.routePrefix}/${q.slug}`,
        name: q.titel,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: SITE },
        { "@type": "ListItem", position: 2, name: "Quizze & Umfragen", item: `${SITE}/quiz` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Seo
        title={`${QUIZZES.length} Interaktive Gründer-Quizze & Umfragen (mit Rabatt) | GründerX`}
        description="Gründertyp, Rechtsform, Steuer-Quiz, US-Amex-Check, U18-Check, Website- & App-Quiz, Shop-Check, Förderung und 3 Gründer-Umfragen mit Aktions-Rabatt."
        path="/quiz"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main id="inhalt">
        <PageHeader
          zentriert
          crumbs={[{ label: "Start", to: "/" }, { label: "Quizze & Umfragen" }]}
          title="Spielerisch testen. Klarheit mitnehmen."
          lead={
            <p>
              {quizCount} interaktive Quizze und {surveyCount} kurze Gründer-Umfragen für alle von 12 bis 70.
              Wenig Text, direktes Ergebnis und am Ende deine Belohnung ({FOUNDER_KURZ} mit Code {FOUNDER_CODE.code}).
            </p>
          }
        />

        <section className="container max-w-5xl px-4 py-10 md:py-16">
          {/* Aktions-Hinweis */}
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-brand-green/35 bg-brand-green-soft/60 p-4 sm:flex-row sm:items-center sm:justify-between md:p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green text-brand-green-foreground">
                <Gift className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Belohnung nach jedem abgeschlossenen Quiz &amp; jeder Umfrage</p>
                <p className="text-xs text-muted-foreground">
                  Du bekommst deinen persönlichen Startplan, XP für dein Gründer-Level und schaltest dein Aktions-Angebot frei.
                </p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-xl bg-card px-3 py-1.5 text-xs font-semibold text-primary tabular shadow-sm sm:self-center">
              <Trophy className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
              {QUIZZES.length} Checks verfügbar
            </span>
          </div>

          {/* Filter-Tabs: Alle / Quizze / Umfragen */}
          <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Quizze und Umfragen filtern">
            {[
              { id: "alle" as const, label: `Alle (${QUIZZES.length})` },
              { id: "quiz" as const, label: `Interaktive Quizze (${quizCount})` },
              { id: "umfrage" as const, label: `Gründer-Umfragen (${surveyCount})` },
            ].map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(tab.id)}
                  className={cn(
                    "press min-h-10 rounded-xl border px-4 py-2 text-sm font-semibold",
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-card text-foreground/85 hover:border-primary/35",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((q) => (
              <Link
                key={q.slug}
                to={`${q.routePrefix}/${q.slug}`}
                className="press group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card hover:border-primary/40"
              >
                <div className="mb-3 flex items-center justify-between gap-2 text-xs font-medium">
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-foreground">
                    {q.kind === "umfrage" ? (
                      <ClipboardList className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    ) : (
                      <Sparkles className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
                    )}
                    {q.kategorie}
                  </span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground tabular">
                    <Zap className="h-3.5 w-3.5 text-accent-blue" aria-hidden="true" />
                    +{q.xp} XP
                  </span>
                </div>

                <h2 className="text-lg font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary">
                  {q.titel}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {q.lead}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 tabular">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {q.dauer} · {q.fragen.length} Fragen
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent-blue">
                    Starten <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <HubNav show={["guides", "tools", "ratgeber"]} />
        </section>
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
};

export default QuizIndex;
