import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Gift,
  RotateCcw,
  Sparkles,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { getQuiz, QUIZZES, type QuizOption, type QuizResultProfile } from "@/data/quizzes";
import { awardQuizXp } from "@/lib/gamification";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  FOUNDER_CODE,
  FOUNDER_KURZ,
  PLANS,
  formatEurCents,
  founderFirstInvoiceCents,
} from "@/config/pricing";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SITE = "https://gruenderx.de";

const QuizPlay = ({ forcedSlug }: { forcedSlug?: string }) => {
  const params = useParams();
  const slug = forcedSlug ?? params.slug ?? "";
  const quiz = getQuiz(slug);
  const { user } = useAuth();

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, QuizOption>>({});
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-background">
        <Seo title="Quiz nicht gefunden | GründerX" description="Dieses Quiz existiert nicht." path={`/quiz/${slug}`} noindex />
        <Navbar />
        <main className="container max-w-xl px-4 pb-24 pt-28 text-center">
          <h1 className="text-2xl font-semibold">Quiz nicht gefunden</h1>
          <p className="mt-2 text-sm text-muted-foreground">Schau dir unsere aktiven Quizze und Umfragen an.</p>
          <Button asChild className="mt-6">
            <Link to="/quiz">Alle Quizze ansehen</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const currentQuestion = quiz.fragen[stepIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const total = quiz.fragen.length;
  const progressPct = finished ? 100 : Math.round(((stepIndex + (currentAnswer ? 1 : 0)) / total) * 100);

  const computeResult = (finalAnswers: Record<string, QuizOption>): { profile: QuizResultProfile; score: number | null } => {
    if (quiz.isKnowledgeQuiz) {
      const correctCount = Object.values(finalAnswers).filter((o) => o.correct).length;
      const ratio = correctCount / Math.max(1, total);
      const key = ratio >= 0.8 ? "high" : ratio >= 0.5 ? "mid" : "low";
      const profile = quiz.profile.find((p) => p.key === key) ?? quiz.profile[0];
      return { profile, score: correctCount };
    }

    const counts: Record<string, number> = {};
    for (const opt of Object.values(finalAnswers)) {
      if (opt.tag) counts[opt.tag] = (counts[opt.tag] ?? 0) + 1;
    }
    // Priorisiere U18 oder US-Risiko, wenn explizit gewählt
    if (counts.u18) {
      const p = quiz.profile.find((x) => x.key === "u18");
      if (p) return { profile: p, score: null };
    }
    if (counts.risk) {
      const p = quiz.profile.find((x) => x.key === "risk");
      if (p) return { profile: p, score: null };
    }
    let bestKey = quiz.profile[0].key;
    let bestCount = -1;
    for (const p of quiz.profile) {
      const c = counts[p.key] ?? 0;
      if (c > bestCount) {
        bestCount = c;
        bestKey = p.key;
      }
    }
    return { profile: quiz.profile.find((p) => p.key === bestKey) ?? quiz.profile[0], score: null };
  };

  const persistSubmission = (finalAnswers: Record<string, QuizOption>, res: { profile: QuizResultProfile; score: number | null }) => {
    const ageOpt = Object.values(finalAnswers).find((o) => o.ageGroup);
    const goalOpt = Object.values(finalAnswers).find((o) => o.goal);
    const compactAnswers: Record<string, string> = {};
    for (const [k, v] of Object.entries(finalAnswers)) compactAnswers[k] = v.id;

    // Lokal speichern für sofortige Persona-/Gamification-Auswertung
    try {
      const prev = JSON.parse(localStorage.getItem("gx-quiz-submissions") ?? "[]");
      prev.push({
        quiz_slug: quiz.slug,
        age_group: ageOpt?.ageGroup ?? null,
        primary_goal: goalOpt?.goal ?? null,
        result_key: res.profile.key,
        score: res.score,
        at: new Date().toISOString(),
      });
      localStorage.setItem("gx-quiz-submissions", JSON.stringify(prev.slice(-30)));
    } catch {
      /* ignore */
    }

    // Asynchron in Supabase sichern (best-effort, blockiert UI nie)
    void (supabase.from("quiz_submissions" as any) as any)
      .insert({
        user_id: user?.id ?? null,
        quiz_slug: quiz.slug,
        age_group: ageOpt?.ageGroup ?? null,
        primary_goal: goalOpt?.goal ?? null,
        answers: compactAnswers,
        result_key: res.profile.key,
        result_label: res.profile.titel,
        score: res.score,
        reward_code: FOUNDER_CODE.code,
      })
      .then(() => undefined, () => undefined);
  };

  const handleSelect = (opt: QuizOption) => {
    const nextAnswers = { ...answers, [currentQuestion.id]: opt };
    setAnswers(nextAnswers);

    if (quiz.isKnowledgeQuiz) {
      setRevealed(true);
      return;
    }

    // Bei Persönlichkeits-/Umfrage-Quizzen sanft zum nächsten Schritt
    if (stepIndex < total - 1) {
      setTimeout(() => setStepIndex((i) => Math.min(total - 1, i + 1)), 180);
    } else {
      const res = computeResult(nextAnswers);
      awardQuizXp(quiz.slug, user?.id);
      persistSubmission(nextAnswers, res);
      setTimeout(() => setFinished(true), 200);
    }
  };

  const handleNextKnowledge = () => {
    setRevealed(false);
    if (stepIndex < total - 1) {
      setStepIndex((i) => i + 1);
    } else {
      const res = computeResult(answers);
      awardQuizXp(quiz.slug, user?.id);
      persistSubmission(answers, res);
      setFinished(true);
    }
  };

  const restart = () => {
    setStepIndex(0);
    setAnswers({});
    setRevealed(false);
    setFinished(false);
    setCopied(false);
  };

  const copyCode = () => {
    navigator.clipboard?.writeText(FOUNDER_CODE.code).then(
      () => {
        setCopied(true);
        toast.success(`Code ${FOUNDER_CODE.code} kopiert.`);
      },
      () => toast.info(`Code: ${FOUNDER_CODE.code}`),
    );
  };

  const result = finished ? computeResult(answers) : null;
  const firstMonthDiscounted = formatEurCents(founderFirstInvoiceCents(PLANS.gruenderx.grossCents));
  const regularMonth = formatEurCents(PLANS.gruenderx.grossCents);
  const otherQuizzes = QUIZZES.filter((q) => q.slug !== quiz.slug).slice(0, 3);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Quiz",
      name: quiz.titel,
      description: quiz.seoDescription,
      url: `${SITE}${quiz.routePrefix}/${quiz.slug}`,
      educationalLevel: "Anfänger bis Fortgeschritten",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: SITE },
        { "@type": "ListItem", position: 2, name: "Quizze", item: `${SITE}/quiz` },
        { "@type": "ListItem", position: 3, name: quiz.titel, item: `${SITE}${quiz.routePrefix}/${quiz.slug}` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={quiz.seoTitle}
        description={quiz.seoDescription}
        path={`${quiz.routePrefix}/${quiz.slug}`}
        jsonLd={jsonLd}
      />
      <Navbar />
      <main id="inhalt" className="container max-w-2xl px-4 pb-20 pt-20 md:pt-24">
        <div className="mb-5 flex items-center justify-between gap-3">
          <Link
            to="/quiz"
            className="inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Alle Quizze
          </Link>
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-green-soft px-3 py-1 text-xs font-semibold text-brand-green tabular">
            <Zap className="h-3.5 w-3.5" aria-hidden="true" /> +{quiz.xp} XP
          </span>
        </div>

        {/* Kopf */}
        <header className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {quiz.kategorie} · {quiz.dauer}
          </p>
          <h1 className="mt-1 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
            {quiz.titel}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{quiz.lead}</p>
        </header>

        {/* Fortschrittsbalken */}
        <div className="mb-6">
          <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-muted-foreground tabular">
            <span>{finished ? "Geschafft" : `Frage ${stepIndex + 1} von ${total}`}</span>
            <span>{progressPct} %</span>
          </div>
          <div
            className="h-2.5 overflow-hidden rounded-full bg-secondary"
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Quiz-Fortschritt"
          >
            <div
              className="h-full rounded-full bg-brand-green transition-[width] duration-300 ease-out"
              style={{ width: `${Math.max(progressPct, 6)}%` }}
            />
          </div>
        </div>

        {!finished ? (
          <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold leading-snug tracking-tight sm:text-xl">
              {currentQuestion.frage}
            </h2>
            {currentQuestion.hinweis && (
              <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">{currentQuestion.hinweis}</p>
            )}

            <div className="mt-5 space-y-2.5">
              {currentQuestion.optionen.map((opt) => {
                const selected = currentAnswer?.id === opt.id;
                const showCorrect = revealed && opt.correct;
                const showWrong = revealed && selected && opt.correct === false;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={revealed}
                    onClick={() => handleSelect(opt)}
                    className={cn(
                      "press flex min-h-14 w-full items-center justify-between gap-3 rounded-xl border p-4 text-left transition-colors",
                      showCorrect
                        ? "border-brand-green bg-brand-green-soft/70"
                        : showWrong
                          ? "border-danger bg-danger-soft"
                          : selected
                            ? "border-primary bg-primary/5"
                            : "border-border bg-background hover:border-primary/40",
                    )}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-foreground sm:text-[15px]">
                        {opt.label}
                      </span>
                      {opt.sub && (
                        <span className="mt-0.5 block text-xs text-muted-foreground">{opt.sub}</span>
                      )}
                    </span>
                    {showCorrect ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-green" aria-hidden="true" />
                    ) : showWrong ? (
                      <XCircle className="h-5 w-5 shrink-0 text-danger" aria-hidden="true" />
                    ) : (
                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                          selected ? "border-primary bg-primary text-primary-foreground" : "border-border",
                        )}
                      >
                        {selected && <Check className="h-3 w-3" aria-hidden="true" />}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {revealed && currentQuestion.erklaerung && (
              <div className="mt-4 rounded-xl border border-primary/20 bg-secondary/50 p-4 text-sm leading-relaxed text-foreground">
                {currentQuestion.erklaerung}
              </div>
            )}

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-border/70 pt-4">
              <Button
                type="button"
                variant="ghost"
                disabled={stepIndex === 0}
                onClick={() => {
                  setRevealed(false);
                  setStepIndex((i) => Math.max(0, i - 1));
                }}
                className="min-h-11"
              >
                <ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" /> Zurück
              </Button>

              {quiz.isKnowledgeQuiz && revealed && (
                <Button type="button" onClick={handleNextKnowledge} className="press min-h-11 gap-1.5">
                  {stepIndex < total - 1 ? "Nächste Frage" : "Ergebnis & Belohnung"}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              )}
            </div>
          </section>
        ) : (
          result && (
            <div className="space-y-5">
              {/* Ergebnis-Karte */}
              <section className="rounded-xl border border-brand-green/40 bg-card p-5 shadow-sm sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green-soft px-3 py-1 text-xs font-semibold text-brand-green">
                    <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
                    {result.score !== null
                      ? `${result.score} von ${total} richtig · +${quiz.xp} XP`
                      : `Auswertung fertig · +${quiz.xp} XP`}
                  </span>
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Nochmal spielen
                  </button>
                </div>

                <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                  {result.profile.titel}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {result.profile.kurz}
                </p>

                <div className="mt-5 rounded-xl bg-secondary/50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Deine nächsten Schritte
                  </p>
                  <ul className="mt-2.5 space-y-2">
                    {result.profile.naechsteSchritte.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                  <Button asChild className="press min-h-11 flex-1 gap-1.5">
                    <Link to={result.profile.guideTo}>
                      {result.profile.guideLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="min-h-11 flex-1">
                    <Link to={result.profile.freeToolTo}>{result.profile.freeToolLabel}</Link>
                  </Button>
                </div>
              </section>

              {/* Aktions-Offer Belohnung (Black-Friday-Style, ehrlich & brutto) */}
              <section className="rounded-xl border border-primary/35 bg-primary p-5 text-primary-foreground shadow-sm sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green text-brand-green-foreground">
                    <Gift className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-brand-green-glow">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                      Dein Quiz-Vorteil freigeschaltet
                    </p>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
                      {FOUNDER_KURZ} auf GründerX
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-primary-foreground/85">
                      Im Monatszugang zahlst du mit dem Code im ersten Monat{" "}
                      <strong className="font-semibold text-white">{firstMonthDiscounted}</strong> statt{" "}
                      <span className="line-through opacity-80">{regularMonth}</span> (Endpreis inkl. 19 % USt., monatlich kündbar).
                    </p>

                    <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                      <button
                        type="button"
                        onClick={copyCode}
                        className="press inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold tracking-wider text-primary"
                      >
                        <span>{FOUNDER_CODE.code}</span>
                        {copied ? <Check className="h-4 w-4 text-brand-green" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                      </button>
                      <Link
                        to="/preise"
                        className="press inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg bg-brand-green px-5 py-2 text-sm font-semibold text-brand-green-foreground"
                      >
                        Angebot ansehen <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )
        )}

        {/* Weitere Quizze */}
        <section className="mt-10 border-t border-border pt-8">
          <h2 className="mb-3 text-base font-semibold">Noch mehr spielerische Checks</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {otherQuizzes.map((q) => (
              <Link
                key={q.slug}
                to={`${q.routePrefix}/${q.slug}`}
                className="press rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
              >
                <p className="text-xs font-medium text-muted-foreground">{q.kategorie}</p>
                <p className="mt-1 text-sm font-semibold leading-snug">{q.titel}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default QuizPlay;
