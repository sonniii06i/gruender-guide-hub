import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
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
import { getCourseTheme } from "@/components/CourseCoverCard";
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

/**
 * Helle, aufgeräumte Kurs-Übersicht im Studyflix- × Udemy-Stil:
 * Weißer Kurskopf mit Pastell-Themenband, klarer Fortschrittsanzeige,
 * sauberem vertikalem Lehrplan und sticky Lexoffice-Startkarte rechts.
 */
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
          title="Kurs nicht gefunden | GründerX"
          description="Dieser Kurs existiert nicht. Sieh dir alle verfügbaren Kurse an."
          path={`/playbook/preview/${slug ?? ""}`}
          noindex
        />
        <EmptyState
          icon={FileText}
          title="Diesen Kurs gibt es nicht"
          description="Der Link ist veraltet oder falsch geschrieben. In der Übersicht findest du alle 81 Kurse."
          action={
            <Button asChild>
              <Link to="/playbooks">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Alle Kurse ansehen
              </Link>
            </Button>
          }
        />
      </div>
    );
  }

  const theme = getCourseTheme(pb.slug, pb.title);
  const ThemeIcon = theme.icon;
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

      {/* Heller Studyflix × Udemy Kurskopf */}
      <section className="border-b border-border bg-white">
        <div className="container max-w-6xl px-4 py-6 md:px-6 md:py-8">
          <nav aria-label="Pfad" className="mb-4 flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Link to="/playbooks" className="transition-colors hover:text-primary">
              Kurse &amp; Guides
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" aria-hidden="true" />
            <span className={cn("font-semibold", theme.pillText)}>{theme.label}</span>
          </nav>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 max-w-3xl">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className={cn("inline-flex items-center gap-1.5 rounded-md px-2.5 py-1", theme.bandBg, theme.pillText)}>
                  <ThemeIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  {theme.label}
                </span>
                <span className="rounded-md bg-secondary px-2.5 py-1 text-foreground">{pb.difficulty}</span>
                <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 text-foreground tabular">
                  <ListChecks className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  {pb.steps.length} Schritte · {totalTimeLabel}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-brand-green-soft px-2.5 py-1 text-brand-green tabular">
                  <Zap className="h-3.5 w-3.5" aria-hidden="true" /> +{totalXp} XP
                </span>
              </div>

              <h1 className="text-balance text-2xl font-bold leading-tight tracking-[-0.025em] text-primary sm:text-3xl md:text-[2.15rem]">
                {pb.title}
              </h1>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {pb.tagline}
              </p>

              {doneCount > 0 && (
                <div className="mt-5 max-w-md">
                  <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-foreground tabular">
                    <span>Dein Fortschritt</span>
                    <span className="text-brand-green">
                      {doneCount} von {pb.steps.length} erledigt ({progressPct} %)
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-brand-green transition-[width] duration-300" style={{ width: `${progressPct}%` }} />
                  </div>
                </div>
              )}
            </div>

            <div className="hidden shrink-0 lg:block">
              <Button
                onClick={() => start(pb.slug)}
                disabled={isStarting}
                size="lg"
                className="press h-12 gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90"
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
                    <Play className="h-4 w-4 fill-current" aria-hidden="true" /> Kurs jetzt starten
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2-Spalten Inhalt */}
      <div className="container max-w-6xl px-4 pt-6 md:px-6 md:pt-8">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-6">
            {/* Ziel-Box */}
            <section className="relative overflow-hidden rounded-2xl border border-brand-green/30 bg-white p-5 pl-6 shadow-card">
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-brand-green" />
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-green">
                <Target className="h-4 w-4" aria-hidden="true" /> Dein fertiges Ergebnis
              </p>
              <p className="mt-1.5 text-sm font-medium leading-relaxed text-foreground sm:text-[15px]">
                {pb.outcome}
              </p>
            </section>

            {/* Sauberer Udemy-Lehrplan */}
            <section className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
              <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-[#F8FAFC] px-5 py-4">
                <div>
                  <h2 className="text-base font-bold tracking-tight text-primary">
                    Kurs-Lehrplan ({pb.steps.length} Schritte)
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Klick auf einen Schritt für die Kurz-Vorschau. Im Kurs hakst du alles direkt ab.
                  </p>
                </div>
                <span className="rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-foreground ring-1 ring-border tabular">
                  {pb.duration}
                </span>
              </header>

              <ol className="divide-y divide-border">
                {mergedSteps.map((s, i) => {
                  const isDone = doneKeys.has(`${pb.slug}:${s.slug}`);
                  const hasWindow = WORKSPACE_SLUGS.has(s.slug) || Boolean(s.fields?.length);
                  return (
                    <li key={s.slug} id={s.slug} className="transition-colors hover:bg-secondary/30">
                      <details open={i === 0} className="group px-5 py-4">
                        <summary className="flex cursor-pointer list-none items-start gap-3.5 [&::-webkit-details-marker]:hidden">
                          <span
                            className={cn(
                              "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold tabular",
                              isDone
                                ? "bg-brand-green text-white"
                                : "bg-accent text-primary",
                            )}
                          >
                            {isDone ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : String(i + 1).padStart(2, "0")}
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h3 className="text-sm font-semibold leading-snug text-foreground sm:text-[15px]">
                                {s.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-1.5">
                                <ToneBadge tone={STEP_KIND_TONE[s.kind]}>{STEP_KIND_LABEL[s.kind]}</ToneBadge>
                                <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground tabular">
                                  <Clock className="h-3 w-3" aria-hidden="true" /> {s.estMinutes} Min.
                                </span>
                                <ChevronDown
                                  className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180"
                                  aria-hidden="true"
                                />
                              </div>
                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                              {hasWindow && (
                                <span className="inline-flex items-center gap-1 rounded-md bg-brand-green-soft px-2 py-0.5 font-semibold text-brand-green">
                                  <Wrench className="h-3 w-3" aria-hidden="true" /> Arbeitsfenster
                                </span>
                              )}
                              {s.estCost && (
                                <span className="inline-flex items-center gap-1 text-muted-foreground">
                                  <Coins className="h-3 w-3 text-primary" aria-hidden="true" />
                                  {s.estCost.length > 55 ? s.estCost.split("·")[0].trim() : s.estCost}
                                </span>
                              )}
                              {s.externalLinks && s.externalLinks.length > 0 && (
                                <span className="inline-flex items-center gap-1 text-muted-foreground">
                                  <ExternalLink className="h-3 w-3" aria-hidden="true" />{" "}
                                  {s.externalLinks.length} {s.externalLinks.length === 1 ? "Portal-Link" : "Portal-Links"}
                                </span>
                              )}
                            </div>
                          </div>
                        </summary>

                        <div className="mt-3 pl-10 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                          {s.description && <p>{s.description}</p>}
                          {s.warning && (
                            <p className="relative mt-2.5 flex items-start gap-2 overflow-hidden rounded-lg border border-danger/25 bg-danger-soft px-3 py-2 pl-4 text-xs text-foreground">
                              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-danger" />
                              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger" aria-hidden="true" />
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

          {/* Rechte sticky Kurs-Start-Karte */}
          <aside className="space-y-4 lg:sticky lg:top-20">
            <div className="rounded-2xl border border-border bg-white p-5 shadow-card">
              <h2 className="text-sm font-bold text-primary">Kurs-Eckdaten</h2>
              <dl className="mt-3.5 space-y-3 text-xs">
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
                  <dt className="text-muted-foreground">Abschluss-XP</dt>
                  <dd className="font-semibold text-brand-green tabular">+{totalXp} XP</dd>
                </div>
              </dl>

              <Button
                onClick={() => start(pb.slug)}
                disabled={isStarting}
                className="press mt-5 h-11 w-full gap-2 rounded-xl bg-primary font-semibold text-white hover:bg-primary/90"
              >
                {isStarting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Startet…
                  </>
                ) : (
                  <>
                    {doneCount > 0 ? "Kurs fortsetzen" : "Kurs starten"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </Button>
            </div>

            {docs.length > 0 && (
              <div className="rounded-2xl border border-border bg-white p-5 shadow-card">
                <h2 className="text-sm font-bold text-primary">Unterlagen bereitlegen</h2>
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
        className="fixed inset-x-0 bottom-14 z-30 border-t border-border bg-white px-4 py-2.5 lg:hidden"
        style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
      >
        <Button
          onClick={() => start(pb.slug)}
          disabled={isStarting}
          className="press h-11 w-full gap-2 rounded-xl bg-primary text-sm font-semibold text-white hover:bg-primary/90"
        >
          {isStarting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Kurs wird geöffnet…
            </>
          ) : doneCount > 0 ? (
            <>
              <Play className="h-4 w-4 fill-current" aria-hidden="true" /> Weiter bei Schritt {Math.min(doneCount + 1, pb.steps.length)}
            </>
          ) : (
            <>
              <Play className="h-4 w-4 fill-current" aria-hidden="true" /> Kurs starten (+{totalXp} XP)
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PlaybookPreview;
