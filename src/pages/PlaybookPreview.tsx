import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { ArrowLeft, ArrowRight, Clock, ListChecks, Target, FileText, AlertTriangle, ExternalLink, Loader2, Sparkles } from "lucide-react";
import { getPlaybook, type PlaybookStep } from "@/data/playbooks";
import { useGuideStart } from "@/hooks/useGuideStart";

const STEP_KIND_LABEL: Record<PlaybookStep["kind"], string> = {
  checklist: "Checkliste",
  form: "Formular",
  info: "Info",
  decision: "Entscheidung",
  external: "Extern",
};

const STEP_KIND_COLOR: Record<PlaybookStep["kind"], string> = {
  checklist: "bg-emerald-500/10 text-emerald-700",
  form: "bg-accent-blue/10 text-accent-blue",
  info: "bg-secondary text-muted-foreground",
  decision: "bg-purple-500/10 text-purple-700",
  external: "bg-orange-500/10 text-orange-700",
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

  const totalMinutes = useMemo(
    () => pb?.steps.reduce((sum, s) => sum + (s.estMinutes ?? 0), 0) ?? 0,
    [pb],
  );
  const docs = useMemo(() => (pb ? extractDocs(pb.steps) : []), [pb]);

  if (!pb) {
    return (
      <CockpitShell eyebrow="Guide" title="Guide nicht gefunden" subtitle="Slug ungültig oder Guide existiert nicht.">
        <Link
          to="/playbooks"
          className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90"
        >
          <ArrowLeft className="h-4 w-4" /> Zur Guide-Übersicht
        </Link>
      </CockpitShell>
    );
  }

  const hours = Math.floor(totalMinutes / 60);
  const remainingMin = totalMinutes % 60;
  const totalTimeLabel = hours > 0 ? `${hours} h ${remainingMin > 0 ? `${remainingMin} Min` : ""}`.trim() : `${totalMinutes} Min`;

  return (
    <CockpitShell
      eyebrow={`${pb.emoji} Guide-Übersicht`}
      title={pb.title}
      subtitle={pb.tagline}
    >
      <div className="mb-6">
        <Link
          to="/playbooks"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-accent-blue"
        >
          <ArrowLeft className="h-3 w-3" /> Zur Guide-Übersicht
        </Link>
      </div>

      {/* Hero-Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Stat
          icon={<Clock className="h-4 w-4" />}
          label="Gesamt-Aufwand"
          value={totalTimeLabel}
          sub={`${pb.duration} Real-Zeit`}
        />
        <Stat
          icon={<ListChecks className="h-4 w-4" />}
          label="Schritte"
          value={`${pb.steps.length}`}
          sub={`Schwierigkeit: ${pb.difficulty}`}
        />
        <Stat
          icon={<Target className="h-4 w-4" />}
          label="Setup-Kosten"
          value={pb.totalCost ? pb.totalCost.split("(")[0].trim() : "–"}
          sub={pb.totalCost?.includes("(") ? `(${pb.totalCost.split("(")[1]}` : ""}
        />
        <Stat
          icon={<FileText className="h-4 w-4" />}
          label="Pflicht-Unterlagen"
          value={`${docs.length}`}
          sub={docs.length > 0 ? "Übersicht unten" : ""}
        />
      </div>

      {/* Outcome */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 mb-6">
        <div className="flex items-start gap-2">
          <Target className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
              Was du am Ende hast
            </div>
            <div className="text-sm leading-relaxed">{pb.outcome}</div>
          </div>
        </div>
      </div>

      {/* Folgekosten falls da */}
      {pb.runningCost && (
        <div className="rounded-xl border border-border bg-card p-4 mb-6 text-xs leading-relaxed">
          <span className="font-semibold">🔁 Laufende Folgekosten:</span>{" "}
          <span className="text-muted-foreground">{pb.runningCost}</span>
        </div>
      )}

      {/* Step-Rundown */}
      <div className="mb-6">
        <h2 className="text-base font-bold mb-3 flex items-center gap-2">
          <ListChecks className="h-4 w-4" /> Schritt-für-Schritt-Plan
        </h2>
        <div className="rounded-2xl border border-border bg-card divide-y divide-border">
          {pb.steps.map((s, i) => (
            <div key={s.slug} className="p-4 hover:bg-secondary/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-secondary text-muted-foreground flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-sm leading-snug">{s.title}</h3>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${STEP_KIND_COLOR[s.kind]}`}>
                        {STEP_KIND_LABEL[s.kind]}
                      </span>
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground">
                        <Clock className="h-2.5 w-2.5" /> {s.estMinutes} Min
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-1">{s.description}</p>
                  {s.estCost && (
                    <div className="text-[11px] font-semibold text-emerald-700 mb-1">
                      💶 {s.estCost.length > 80 ? s.estCost.split("·")[0].trim() : s.estCost}
                    </div>
                  )}
                  {s.warning && (
                    <div className="text-[11px] text-red-600 inline-flex items-start gap-1 mt-1">
                      <AlertTriangle className="h-3 w-3 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{s.warning}</span>
                    </div>
                  )}
                  {s.checklist && s.checklist.length > 0 && (
                    <div className="text-[11px] text-muted-foreground mt-1">
                      <span className="font-semibold">Checkliste:</span> {s.checklist.length} Punkt{s.checklist.length !== 1 ? "e" : ""}
                    </div>
                  )}
                  {s.externalLinks && s.externalLinks.length > 0 && (
                    <div className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                      <ExternalLink className="h-2.5 w-2.5" />
                      {s.externalLinks.length} extern{s.externalLinks.length === 1 ? "er Link" : "e Links"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pflicht-Unterlagen */}
      {docs.length > 0 && (
        <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
          <h2 className="text-base font-bold mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-accent-blue" /> Was du an Unterlagen brauchst (über alle Schritte)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-sm">
            {docs.map((d) => (
              <div key={d} className="flex items-start gap-2">
                <span className="text-accent-blue mt-0.5">•</span>
                <span className="text-muted-foreground">{d}</span>
              </div>
            ))}
          </div>
          <div className="text-[11px] text-muted-foreground mt-3 leading-relaxed">
            Diese Liste ist aus den Schritten auto-extrahiert — pro Schritt nochmal genauer drin (welcher Schritt
            welches Doc braucht).
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="rounded-2xl border border-accent-blue/40 bg-gradient-to-br from-card via-card to-accent-blue/5 p-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="font-bold text-lg mb-1">Bereit anzufangen?</div>
            <div className="text-sm text-muted-foreground">
              Geschätzt {totalTimeLabel} Aktiv-Zeit über {pb.duration}. Du kannst jederzeit pausieren.
            </div>
          </div>
          <button
            onClick={() => slug && start(slug)}
            disabled={isStarting}
            className="inline-flex items-center gap-2 rounded-xl bg-accent-blue text-primary-foreground px-6 py-3 text-sm font-bold hover:opacity-90 disabled:opacity-50"
          >
            {isStarting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Guide starten <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </CockpitShell>
  );
};

const Stat = ({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) => (
  <div className="rounded-xl border border-border bg-card p-3">
    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
      {icon}
      <div className="text-[10px] uppercase tracking-wider font-semibold">{label}</div>
    </div>
    <div className="text-lg font-bold leading-tight">{value}</div>
    {sub && <div className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{sub}</div>}
  </div>
);

export default PlaybookPreview;
