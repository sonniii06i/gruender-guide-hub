import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Coins,
  ExternalLink,
  FileText,
  ListChecks,
  Loader2,
  Play,
  Repeat,
  Target,
  Wrench,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState, ToneBadge, type Tone } from "@/components/cockpit/kit";
import { getPlaybook, type PlaybookStep } from "@/data/playbooks";
import { useGuideStart } from "@/hooks/useGuideStart";
import { useGuideDetail, mergeStepDetail } from "@/hooks/useGuideDetail";
import { useAuth } from "@/hooks/useAuth";
import { readGamification } from "@/lib/gamification";
import { Seo } from "@/components/Seo";
import { cn } from "@/lib/utils";

const STEP_KIND_LABEL: Record<PlaybookStep["kind"], string> = {
  checklist: "Checkliste",
  form: "Arbeitsfenster",
  info: "Kurz erklärt",
  decision: "Entscheidung",
  external: "Portal / Antrag",
};

const STEP_KIND_TONE: Record<PlaybookStep["kind"], Tone> = {
  checklist: "success",
  form: "info",
  info: "neutral",
  decision: "accent",
  external: "warning",
};

const WORKSPACE_SLUGS = new Set([
  "name",
  "notar",
  "satzung",
  "konto",
  "gewa1-pdf",
  "familiengericht",
  "voraussetzungen-check",
  "us-bankkonto",
  "global-transfer-antrag",
]);

const DOC_KEYWORDS = [
  "Personalausweis",
  "Pass",
  "Reisepass",
  "Steuer-ID",
  "Handelsregisterauszug",
  "Vollmacht",
  "Geburtsurkunde",
  "Adressnachweis",
  "Utility-Rechnung",
  "Utility-Bill",
  "eSIM",
  "Bankverbindung",
  "Operating Agreement",
  "Form SS-4",
  "Form W-7",
  "USt-ID",
  "Zustimmung",
];

function extractDocs(playbookSteps: PlaybookStep[]): string[] {
  const docs = new Set<string>();
  for (const step of playbookSteps) {
    const items = [...(step.checklist ?? []), ...(step.extendedNotes ?? [])];
    for (const item of items) {
      for (const kw of DOC_KEYWORDS) {
        if (new RegExp(`\\b${kw}\\b`, "i").test(item)) {
          docs.add(kw);
          break;
        }
      }
    }
  }
  return Array.from(docs).sort();
}

const PlaybookPreview = () => {
  const { slug } = useParams<{ slug: string }>();
  const pb = slug ? getPlaybook(slug) : null;
  const { start, starting } = useGuideStart();
  const { user } = useAuth();
  const isStarting = starting === slug;
  const { detail } = useGuideDetail(slug);

  const mergedSteps = useMemo(
    () => (pb ? pb.steps.map((s) => mergeStepDetail(s, detail)) : []),
    [pb, detail],
  );
  const totalMinutes = useMemo(
    () => pb?.steps.reduce((sum, s) => sum + (s.estMinutes ?? 0), 0) ?? 0,
    [pb],
  );
  const docs = useMemo(() => extractDocs(mergedSteps), [mergedSteps]);

  if (!pb) {
    return (
      <div className="container max-w-4xl px-4 py-10">
        <Seo
          title="Guide nicht gefunden | GründerX"
          description="Dieser Guide existiert nicht. Sieh dir alle verfügbaren Guides an."
          path={`/playbook/preview/${slug ?? ""}`}
          noindex
        />
        <EmptyState
          icon={FileText}
          title="Diesen Guide gibt es nicht"
          description="Der Link ist veraltet oder falsch geschrieben. In der Übersicht findest du alle Guides."
          action={
            <Button asChild>
              <Link to="/playbooks">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Zur Guide-Übersicht
              </Link>
            </Button>
          }
        />
      </div>
    );
  }

  const gam = readGamification(user?.id);
  const doneKeys = new Set(gam.completedSteps);
  const doneCount = pb.steps.filter((s) => doneKeys.has(`${pb.slug}:${s.slug}`)).length;
  const progressPct = pb.steps.length > 0 ? Math.round((doneCount / pb.steps.length) * 100) : 0;
  const totalXp = pb.steps.length * 100 + 250;

  const hours = Math.floor(totalMinutes / 60);
  const remainingMin = totalMinutes % 60;
  const totalTimeLabel =
    hours > 0 ? `${hours} h ${remainingMin > 0 ? `${remainingMin} Min.` : ""}`.trim() : `${totalMinutes} Min.`;

  return (
    <div className="min-h-screen bg-background pb-32 md:pb-16">
      <Seo
        title={`${pb.title} | GründerX`}
        description={`${pb.tagline}. ${pb.steps.length} interaktive Schritte, ${pb.duration}, Schwierigkeit: ${pb.difficulty}.`}
        path={`/playbook/preview/${pb.slug}`}
        type="article"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: pb.title,
            description: pb.tagline,
            totalTime: `PT${totalMinutes}M`,
            step: mergedSteps.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.title,
              text: s.description,
            })),
          },
        ]}
      />

      {/* Udemy / Masterclass-inspirierter Kurs-Hero */}
      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="container max-w-5xl px-4 py-6 md:px-6 md:py-9">
          <Link
            to="/playbooks"
            className="inline-flex min-h-9 items-center gap-1.5 text-xs font-medium text-primary-foreground/80 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Alle Guides
          </Link>

          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 max-w-2xl">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="rounded-md bg-white/15 px-2.5 py-1 text-white">{pb.difficulty}</span>
                <span className="inline-flex items-center gap-1 rounded-md bg-brand-green px-2.5 py-1 text-brand-green-foreground tabular">
                  <Zap className="h-3.5 w-3.5" aria-hidden="true" /> +{totalXp} XP möglich
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-1 text-white/90 tabular">
                  <ListChecks className="h-3.5 w-3.5" aria-hidden="true" /> {pb.steps.length} Schritte · {totalTimeLabel}
                </span>
              </div>

              <h1 className="text-2xl font-semibold leading-tight tracking-tight text-balance sm:text-3xl md:text-4xl">
                {pb.title}
              </h1>
              <p className="mt-2.5 text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
                {pb.tagline}
              </p>
            </div>

            <div className="hidden shrink-0 lg:block">
              <Button
                onClick={() => start(pb.slug)}
                disabled={isStarting}
                size="lg"
                className="press h-12 gap-2 bg-brand-green px-6 text-sm font-semibold text-brand-green-foreground hover:bg-brand-green/90"
              >
                {isStarting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Startet…
                  </>
                ) : doneCount > 0 ? (
                  <>
                    <Play className="h-4 w-4 fill-current" aria-hidden="true" /> Weiter bei Schritt {Math.min(doneCount + 1, pb.steps.length)}
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-current" aria-hidden="true" /> Guide jetzt starten
                  </>
                )}
              </Button>
            </div>
          </div>

          {doneCount > 0 && (
            <div className="mt-5 max-w-md">
              <div className="mb-1 flex items-center justify-between text-xs text-primary-foreground/85 tabular">
                <span>Dein Fortschritt</span>
                <span>{doneCount} von {pb.steps.length} ({progressPct} %)</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/20">
                <div className="h-full rounded-full bg-brand-green-glow" style={{ width: `${progressPct}%` }} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Inhalt: Ergebnis, Kosten, Unterlagen & interaktiver Lehrplan */}
      <div className="container max-w-5xl px-4 pt-6 md:px-6 md:pt-8">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_310px]">
          <div className="min-w-0 space-y-6">
            {/* Was du am Ende hast */}
            <section className="rounded-xl border border-brand-green/35 bg-brand-green-soft/60 p-5">
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-green">
                <Target className="h-4 w-4" aria-hidden="true" /> Dein fertiges Ergebnis
              </p>
              <p className="mt-1.5 text-sm font-medium leading-relaxed text-foreground sm:text-[15px]">
                {pb.outcome}
              </p>
            </section>

            {/* Lehrplan (interaktiv aufklappbar wie Udemy / Masterclass) */}
            <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <header className="flex items-center justify-between border-b border-border px-5 py-4">
                <div>
                  <h2 className="text-base font-semibold tracking-tight text-primary">Lehrplan ({pb.steps.length} Schritte)</h2>
                  <p className="text-xs text-muted-foreground">Jeder Schritt hat ein eigenes Arbeitsfenster und bringt +100 XP.</p>
                </div>
                <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-foreground tabular">{pb.duration}</span>
              </header>

              <ol className="divide-y divide-border/70">
                {mergedSteps.map((s, i) => {
                  const isDone = doneKeys.has(`${pb.slug}:${s.slug}`);
                  const hasWindow = WORKSPACE_SLUGS.has(s.slug) || Boolean(s.fields?.length);
                  return (
                    <li key={s.slug} id={s.slug} className="px-4 py-4 transition-colors hover:bg-secondary/30 sm:px-5">
                      <details open={i === 0} className="group">
                        <summary className="flex cursor-pointer list-none items-start gap-3 [&::-webkit-details-marker]:hidden">
                          <span
                            className={cn(
                              "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular",
                              isDone
                                ? "bg-brand-green text-brand-green-foreground"
                                : "border border-primary/25 bg-primary/5 text-primary",
                            )}
                          >
                            {isDone ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : i + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h3 className="text-sm font-semibold leading-snug text-foreground sm:text-[15px]">
                                {s.title}
                              </h3>
                              <div className="flex items-center gap-1.5">
                                <ToneBadge tone={STEP_KIND_TONE[s.kind]}>{STEP_KIND_LABEL[s.kind]}</ToneBadge>
                                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground tabular">
                                  <Clock className="h-3 w-3" aria-hidden="true" /> {s.estMinutes} Min.
                                </span>
                              </div>
                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
                                <Wrench className="h-3 w-3" aria-hidden="true" /> {hasWindow ? "Spezial-Arbeitsfenster" : "Arbeitsfenster"}
                              </span>
                              {s.estCost && (
                                <span className="inline-flex items-center gap-1 font-medium text-brand-green">
                                  <Coins className="h-3 w-3" aria-hidden="true" />
                                  {s.estCost.length > 55 ? s.estCost.split("·")[0].trim() : s.estCost}
                                </span>
                              )}
                              {s.externalLinks && s.externalLinks.length > 0 && (
                                <span className="inline-flex items-center gap-1 text-muted-foreground">
                                  <ExternalLink className="h-3 w-3" aria-hidden="true" /> {s.externalLinks.length} Direkt-Links
                                </span>
                              )}
                            </div>
                          </div>
                        </summary>

                        <div className="mt-3 pl-10 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                          {s.description && <p>{s.description}</p>}
                          {s.warning && (
                            <p className="mt-2 inline-flex items-start gap-1.5 rounded-lg bg-danger-soft px-3 py-2 text-xs text-danger">
                              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                              <span>{s.warning}</span>
                            </p>
                          )}
                        </div>
                      </details>
                    </li>
                  );
                })}
              </ol>
            </section>
          </div>

          {/* Rechte Info-Karte (Kosten & Unterlagen) */}
          <aside className="space-y-4 lg:sticky lg:top-20">
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-foreground">Auf einen Blick</h2>
              <dl className="mt-3 space-y-3 text-xs">
                <div className="flex items-start justify-between gap-3 border-b border-border/70 pb-2.5">
                  <dt className="text-muted-foreground">Realistische Dauer</dt>
                  <dd className="text-right font-semibold text-foreground">{pb.duration}</dd>
                </div>
                {pb.totalCost && (
                  <div className="flex items-start justify-between gap-3 border-b border-border/70 pb-2.5">
                    <dt className="text-muted-foreground">Setup-Kosten</dt>
                    <dd className="text-right font-semibold text-foreground">{pb.totalCost}</dd>
                  </div>
                )}
                {pb.runningCost && (
                  <div className="flex items-start justify-between gap-3 border-b border-border/70 pb-2.5">
                    <dt className="inline-flex items-center gap-1 text-muted-foreground">
                      <Repeat className="h-3 w-3" aria-hidden="true" /> Laufend
                    </dt>
                    <dd className="text-right font-medium text-foreground">{pb.runningCost}</dd>
                  </div>
                )}
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-muted-foreground">Belohnung</dt>
                  <dd className="font-semibold text-brand-green tabular">+{totalXp} XP</dd>
                </div>
              </dl>

              <Button
                onClick={() => start(pb.slug)}
                disabled={isStarting}
                className="press mt-5 h-11 w-full gap-2 bg-primary font-semibold"
              >
                {isStarting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Startet…
                  </>
                ) : (
                  <>
                    Guide starten <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </Button>
            </div>

            {docs.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <h2 className="text-sm font-semibold text-foreground">Unterlagen bereitlegen</h2>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {docs.map((doc) => (
                    <span
                      key={doc}
                      className="rounded-md border border-border bg-secondary/50 px-2.5 py-1 text-xs font-medium text-foreground"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Fixe Mobile Start-Bar über der Bottom-Tab-Bar */}
      <div
        className="fixed inset-x-0 bottom-14 z-30 border-t border-border bg-card/95 px-4 py-2.5 backdrop-blur-md lg:hidden"
        style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
      >
        <Button
          onClick={() => start(pb.slug)}
          disabled={isStarting}
          className="press h-11 w-full gap-2 bg-brand-green text-sm font-semibold text-brand-green-foreground hover:bg-brand-green/90"
        >
          {isStarting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Guide wird geöffnet…
            </>
          ) : doneCount > 0 ? (
            <>
              <Play className="h-4 w-4 fill-current" aria-hidden="true" /> Weiter bei Schritt {Math.min(doneCount + 1, pb.steps.length)}
            </>
          ) : (
            <>
              <Play className="h-4 w-4 fill-current" aria-hidden="true" /> Guide starten (+{totalXp} XP)
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PlaybookPreview;
