import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock, Gift, Sparkles, Trophy, Zap, ClipboardList } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { PageHeader } from "@/components/landing/PageHeader";
import { HubNav } from "@/components/landing/HubNav";
import { QUIZZES } from "@/data/quizzes";
import { FOUNDER_CODE, FOUNDER_KURZ } from "@/config/pricing";
import { MobileCtaBar } from "@/components/landing/MobileCtaBar";
import { readGamification } from "@/lib/gamification";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const SITE = "https://gruenderx.de";

const QuizIndex = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<"alle" | "quiz" | "umfrage">("alle");
  const quizCount = QUIZZES.filter((q) => q.kind === "quiz").length;
  const surveyCount = QUIZZES.filter((q) => q.kind === "umfrage").length;
  const shown = filter === "alle" ? QUIZZES : QUIZZES.filter((q) => q.kind === filter);
  const gam = readGamification(user?.id);

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
          title={
            <>
              Spielerisch testen. <span className="text-[#6EE7B7]">Klarheit mitnehmen.</span>
            </>
          }
          lead={
            <p>
              {quizCount} interaktive Quizze und {surveyCount} kurze Gründer-Umfragen für alle von 12 bis 70.
              Wenig Text, direktes Ergebnis, XP und am Ende deine Belohnung ({FOUNDER_KURZ} mit Code {FOUNDER_CODE.code}).
            </p>
          }
        />

        <section className="container max-w-6xl px-4 py-10 md:py-14">
          {/* Aktions-Hinweis */}
          <div className="gx-card mb-7 flex flex-col gap-3 border-brand-green/35 bg-brand-green-soft/65 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green text-white shadow-sm">
                <Gift className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">Belohnung nach jedem abgeschlossenen Quiz &amp; jeder Umfrage</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Du bekommst deinen persönlichen Startplan, XP für dein Gründer-Level und schaltest dein Aktions-Angebot frei.
                </p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-xl bg-card px-3.5 py-2 text-xs font-bold text-primary tabular shadow-sm sm:self-center">
              <Trophy className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
              {gam.completedQuizzes.length} / {QUIZZES.length} erledigt
            </span>
          </div>

          {/* Filter-Tabs */}
          <div className="mb-7 inline-flex flex-wrap gap-1.5 rounded-2xl border border-border bg-secondary/75 p-1" role="tablist" aria-label="Quizze und Umfragen filtern">
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
                    "press min-h-10 rounded-xl px-4 text-sm font-semibold transition-all",
                    active
                      ? "bg-card text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((q) => {
              const done = gam.completedQuizzes.includes(q.slug);
              return (
                <Link
                  key={q.slug}
                  to={`${q.routePrefix}/${q.slug}`}
                  className={cn(
                    "gx-card gx-card-hover press group flex flex-col overflow-hidden",
                    done && "ring-1 ring-brand-green/50",
                  )}
                >
                  <div
                    className="flex items-center justify-between gap-2 px-5 py-3 text-xs font-bold text-white"
                    style={{
                      backgroundImage:
                        q.kind === "umfrage"
                          ? "linear-gradient(135deg, #092B25 0%, #0F513E 100%)"
                          : "linear-gradient(135deg, #0B1B40 0%, #173678 100%)",
                    }}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {q.kind === "umfrage" ? (
                        <ClipboardList className="h-3.5 w-3.5 text-[#6EE7B7]" aria-hidden="true" />
                      ) : (
                        <Sparkles className="h-3.5 w-3.5 text-[#6EE7B7]" aria-hidden="true" />
                      )}
                      {q.kategorie}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/25 px-2.5 py-0.5 text-[11px] text-[#6EE7B7] tabular">
                      {done ? (
                        <>
                          <CheckCircle2 className="h-3 w-3" aria-hidden="true" /> Erledigt
                        </>
                      ) : (
                        <>
                          <Zap className="h-3 w-3" aria-hidden="true" /> +{q.xp} XP
                        </>
                      )}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-lg font-bold leading-snug tracking-tight text-primary group-hover:text-accent-blue">
                      {q.titel}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {q.lead}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1 font-medium tabular">
                        <Clock className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                        {q.dauer} · {q.fragen.length} Fragen
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-accent-blue">
                        {done ? "Nochmal spielen" : "Starten"}{" "}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
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
