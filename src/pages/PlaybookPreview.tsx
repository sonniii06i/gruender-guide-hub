import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { ArrowLeft, ArrowRight, Check, Clock, Coins, ListChecks, Target, FileText, AlertTriangle, ExternalLink, Loader2, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Callout, EmptyState, ResultPanel, StatGrid, StatTile, ToneBadge, ToolSection, type Tone } from "@/components/cockpit/kit";
import { getPlaybook, type PlaybookStep } from "@/data/playbooks";
import { useGuideStart } from "@/hooks/useGuideStart";
import { useGuideDetail, mergeStepDetail } from "@/hooks/useGuideDetail";
import { Seo } from "@/components/Seo";

const STEP_KIND_LABEL: Record<PlaybookStep["kind"], string> = {
  checklist: "Checkliste",
  form: "Formular",
  info: "Info",
  decision: "Entscheidung",
  external: "Extern",
};

const STEP_KIND_TONE: Record<PlaybookStep["kind"], Tone> = {
  checklist: "success",
  form: "info",
  info: "neutral",
  decision: "accent",
  external: "warning",
};

// Keywords die typische Unterlagen / Mitbringel signalisieren
const DOC_KEYWORDS = [
  "Personalausweis",
  "Pass",
  "Reisepass",
  "Steuer-ID",
  "Steuer-Identifikationsnummer",
  "HR-Auszug",
  "Handelsregisterauszug",
  "Vollmacht",
  "Geburtsurkunde",
  "Sorgerechtsbeschluss",
  "Sacheinlage-Vereinbarung",
  "Werthaltigkeitsbescheinigung",
  "Beurkundung",
  "Beglaubigte Kopie",
  "Adressnachweis",
  "Mietvertrag",
  "Stromrechnung",
  "Aufenthaltstitel",
  "Schulzeugnis",
  "Business-Plan",
  "Tätigkeitsbeschreibung",
  "Geschäftsplan",
  "Bankverbindung",
  "Bankbestätigung",
  "Kontoeröffnung",
  "Notar-Bescheinigung",
  "Beneficial Ownership",
  "Operating Agreement",
  "Articles of Organization",
  "Form SS-4",
  "Form W-7",
  "Form 5472",
  "EAN",
  "GTIN",
  "Markenanmeldung",
  "Markenregistriernummer",
  "USt-ID",
  "Erlaubnis",
  "Genehmigung",
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
  const isStarting = starting === slug;
  // Bezahlte Detailfelder server-seitig (Abo-gegated) nachladen und einmischen.
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
      <CockpitShell eyebrow="Guide" title="Guide nicht gefunden" subtitle="Slug ungültig oder Guide existiert nicht.">
        <Seo
          title="Guide nicht gefunden | GründerX"
          description="Dieser Gründungs-Guide existiert nicht. Sieh dir alle verfügbaren Guides an."
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
      </CockpitShell>
    );
  }

  const hours = Math.floor(totalMinutes / 60);
  const remainingMin = totalMinutes % 60;
  const totalTimeLabel = hours > 0 ? `${hours} h ${remainingMin > 0 ? `${remainingMin} Min` : ""}`.trim() : `${totalMinutes} Min`;

  return (
    <CockpitShell
      eyebrow="Guide-Übersicht"
      title={pb.title}
      subtitle={pb.tagline}
    >
      <Seo
        title={`${pb.title} – Schritt für Schritt | GründerX`}
        description={`${pb.tagline} – ${pb.steps.length} Schritte, ${pb.duration}, Schwierigkeit: ${pb.difficulty}. Alles was du wissen musst inkl. Kosten, Pflichtunterlagen und Stolperfallen.`}
        path={`/playbook/preview/${pb.slug}`}
        type="article"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: pb.title,
            description: pb.tagline,
            totalTime: `PT${totalMinutes}M`,
            estimatedCost: pb.totalCost
              ? { "@type": "MonetaryAmount", currency: "EUR", value: pb.totalCost }
              : undefined,
            step: mergedSteps.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.title,
              text: s.description,
              url: `https://gruenderx.de/playbook/preview/${pb.slug}#${s.slug}`,
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Start", item: "https://gruenderx.de/" },
              { "@type": "ListItem", position: 2, name: "Guides", item: "https://gruenderx.de/playbooks" },
              { "@type": "ListItem", position: 3, name: pb.title, item: `https://gruenderx.de/playbook/preview/${pb.slug}` },
            ],
          },
        ]}
      />
      <div className="mb-6">
        <Link to="/playbooks" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Zur Guide-Übersicht
        </Link>
      </div>

      {/* Kennzahlen */}
      <StatGrid cols={4} className="mb-8">
        <StatTile label={<span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden="true" /> Gesamt-Aufwand</span>} value={totalTimeLabel} hint={`${pb.duration} Real-Zeit`} />
        <StatTile label={<span className="inline-flex items-center gap-1.5"><ListChecks className="h-4 w-4" aria-hidden="true" /> Schritte</span>} value={`${pb.steps.length}`} hint={`Schwierigkeit: ${pb.difficulty}`} />
        <StatTile
          label={<span className="inline-flex items-center gap-1.5"><Target className="h-4 w-4" aria-hidden="true" /> Setup-Kosten</span>}
          value={pb.totalCost ? pb.totalCost.split("(")[0].trim() : "–"}
          hint={pb.totalCost?.includes("(") ? `(${pb.totalCost.split("(")[1]}` : undefined}
        />
        <StatTile label={<span className="inline-flex items-center gap-1.5"><FileText className="h-4 w-4" aria-hidden="true" /> Pflicht-Unterlagen</span>} value={`${docs.length}`} hint={docs.length > 0 ? "Übersicht unten" : undefined} />
      </StatGrid>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
        <div className="min-w-0 space-y-6">
          <Callout tone="success" icon={Target} title="Was du am Ende hast">
            {pb.outcome}
          </Callout>

          {pb.runningCost && (
            <Callout tone="neutral" icon={Repeat} title="Laufende Folgekosten">
              {pb.runningCost}
            </Callout>
          )}

          {/* Step-Rundown */}
          <ToolSection title="Schritt-für-Schritt-Plan" icon={ListChecks} bodyClassName="p-0 md:p-0">
            <ol className="divide-y divide-border/70">
              {mergedSteps.map((s, i) => (
                <li key={s.slug} id={s.slug} className="scroll-mt-24 px-5 py-4 transition-colors hover:bg-secondary/30 md:px-6">
                  <div className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-card text-xs font-semibold tabular shadow-card">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                        <h3 className="text-[15px] font-semibold leading-snug">{s.title}</h3>
                        <div className="flex shrink-0 items-center gap-2">
                          <ToneBadge tone={STEP_KIND_TONE[s.kind]}>{STEP_KIND_LABEL[s.kind]}</ToneBadge>
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground tabular">
                            <Clock className="h-3 w-3" aria-hidden="true" /> {s.estMinutes} Min
                          </span>
                        </div>
                      </div>
                      <p className="mb-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                        {s.estCost && (
                          <span className="inline-flex items-center gap-1 font-medium text-success">
                            <Coins className="h-3 w-3" aria-hidden="true" />
                            {s.estCost.length > 80 ? s.estCost.split("·")[0].trim() : s.estCost}
                          </span>
                        )}
                        {s.checklist && s.checklist.length > 0 && (
                          <span className="text-muted-foreground">
                            Checkliste: {s.checklist.length} Punkt{s.checklist.length !== 1 ? "e" : ""}
                          </span>
                        )}
                        {s.externalLinks && s.externalLinks.length > 0 && (
                          <span className="inline-flex items-center gap-1 text-muted-foreground">
                            <ExternalLink className="h-3 w-3" aria-hidden="true" />
                            {s.externalLinks.length} extern{s.externalLinks.length === 1 ? "er Link" : "e Links"}
                          </span>
                        )}
                      </div>
                      {s.warning && (
                        <div className="mt-1.5 inline-flex items-start gap-1.5 text-xs text-danger">
                          <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                          <span className="line-clamp-1">{s.warning}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </ToolSection>
        </div>

        <aside className="min-w-0 space-y-6 lg:sticky lg:top-20">
          {/* CTA */}
          <ResultPanel variant="ink" kicker="Bereit anzufangen?" title={null}>
            <p className="text-sm leading-relaxed">
              Geschätzt <span className="font-semibold text-primary-foreground">{totalTimeLabel}</span> Aktiv-Zeit über {pb.duration}. Du kannst jederzeit pausieren.
            </p>
            <Button
              onClick={() => slug && start(slug)}
              disabled={isStarting}
              size="lg"
              className="mt-5 w-full rounded-xl bg-card font-semibold text-primary shadow-none hover:bg-card/90"
            >
              {isStarting ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-label="Guide wird gestartet" />
              ) : (
                <>
                  Guide starten <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </Button>
          </ResultPanel>

          {/* Pflicht-Unterlagen */}
          {docs.length > 0 && (
            <ToolSection title="Unterlagen, die du brauchst" description="Über alle Schritte hinweg" icon={FileText}>
              <ul className="space-y-2 text-sm">
                {docs.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-blue" aria-hidden="true" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Automatisch aus den Schritten zusammengestellt. Welcher Schritt welches Dokument braucht, steht im jeweiligen Schritt.
              </p>
            </ToolSection>
          )}
        </aside>
      </div>
    </CockpitShell>
  );
};

export default PlaybookPreview;
