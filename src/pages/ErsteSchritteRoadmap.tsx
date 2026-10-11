/**
 * ErsteSchritteRoadmap — 30/60/90-Tage-Timeline für Solo-Selbstständige
 *
 * Tool 11 der Anfänger-Wave (Starter-Kategorie, Wave 3).
 *
 * 5-Frage-Setup → personalisierte Roadmap mit 15-25 Aufgaben aus 25-Item-DB.
 * Status-Tracking pro Aufgabe (offen / in arbeit / erledigt) via localStorage.
 * Fortschritts-Bar pro Phase + Gesamt-Fortschritt.
 */
import { useMemo, useState, type ElementType } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import {
  ChoiceGroup,
  EmptyState,
  Field,
  ResultPanel,
  ToneBadge,
  ToolLayout,
  ToolSection,
  selectCls,
  toneSoft,
  toneText,
  type Tone,
} from "@/components/cockpit/kit";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CalendarDays,
  CalendarRange,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock,
  ExternalLink,
  ChevronRight,
  Flag,
  RotateCcw,
  Filter,
  HelpCircle,
  Rocket,
  Target,
  Wallet,
} from "lucide-react";
import {
  ROADMAP_TASKS,
  PHASE_LABELS,
  taskMatches,
  type Phase,
  type UserSetup,
  type RoadmapTask,
  type Rechtsform,
  type UstStatus,
  type Pflicht,
} from "@/data/roadmapTasks";

type TaskStatus = "offen" | "laufend" | "erledigt";

const LS_KEY_SETUP = "ggh-roadmap-setup-v1";
const LS_KEY_STATUS = "ggh-roadmap-status-v1";

const defaultSetup: UserSetup = {
  rechtsform: "einzel-gewerbe",
  ustStatus: "unsicher",
  euGeschaeft: false,
  b2b: true,
  bereitsAngemeldet: false,
  mitarbeiter: false,
};

const ErsteSchritteRoadmap = () => {
  const [setup, setSetup] = useState<UserSetup>(() => {
    if (typeof window === "undefined") return defaultSetup;
    const saved = localStorage.getItem(LS_KEY_SETUP);
    if (saved) {
      try { return { ...defaultSetup, ...JSON.parse(saved) }; } catch { return defaultSetup; }
    }
    return defaultSetup;
  });

  const [status, setStatus] = useState<Record<string, TaskStatus>>(() => {
    if (typeof window === "undefined") return {};
    const saved = localStorage.getItem(LS_KEY_STATUS);
    return saved ? JSON.parse(saved) : {};
  });

  const [filterPflicht, setFilterPflicht] = useState<Pflicht | "alle">("alle");
  const [filterStatus, setFilterStatus] = useState<TaskStatus | "alle">("alle");

  const updateSetup = <K extends keyof UserSetup>(field: K, val: UserSetup[K]) => {
    const next = { ...setup, [field]: val };
    setSetup(next);
    localStorage.setItem(LS_KEY_SETUP, JSON.stringify(next));
  };

  const updateStatus = (taskId: string, s: TaskStatus) => {
    const next = { ...status, [taskId]: s };
    setStatus(next);
    localStorage.setItem(LS_KEY_STATUS, JSON.stringify(next));
  };

  const cycleStatus = (taskId: string) => {
    const current = status[taskId] || "offen";
    const next: TaskStatus = current === "offen" ? "laufend" : current === "laufend" ? "erledigt" : "offen";
    updateStatus(taskId, next);
  };

  const resetStatus = () => {
    if (confirm("Alle Status-Häkchen zurücksetzen?")) {
      setStatus({});
      localStorage.removeItem(LS_KEY_STATUS);
    }
  };

  // Personalisierte Aufgaben + Status anwenden
  const relevantTasks = useMemo(() => ROADMAP_TASKS.filter((t) => taskMatches(t, setup)), [setup]);

  const filtered = useMemo(() => relevantTasks.filter((t) => {
    if (filterPflicht !== "alle" && t.pflicht !== filterPflicht) return false;
    if (filterStatus !== "alle" && (status[t.id] || "offen") !== filterStatus) return false;
    return true;
  }), [relevantTasks, filterPflicht, filterStatus, status]);

  // Gruppierung nach Phase
  const byPhase = useMemo(() => {
    const out: Record<Phase, RoadmapTask[]> = { T0: [], T30: [], T60: [], T90: [] };
    filtered.forEach((t) => out[t.phase].push(t));
    return out;
  }, [filtered]);

  // Fortschritt
  const fortschritt = useMemo(() => {
    const total = relevantTasks.length;
    const done = relevantTasks.filter((t) => status[t.id] === "erledigt").length;
    const laufend = relevantTasks.filter((t) => status[t.id] === "laufend").length;
    const proPhase: Record<Phase, { total: number; done: number }> = {
      T0: { total: 0, done: 0 }, T30: { total: 0, done: 0 }, T60: { total: 0, done: 0 }, T90: { total: 0, done: 0 },
    };
    relevantTasks.forEach((t) => {
      proPhase[t.phase].total++;
      if (status[t.id] === "erledigt") proPhase[t.phase].done++;
    });
    return { total, done, laufend, prozent: total > 0 ? (done / total) * 100 : 0, proPhase };
  }, [relevantTasks, status]);


  return (
    <CockpitShell
      eyebrow="🌱 Erste Schritte · für komplette Anfänger:innen"
      title="Erste-Schritte-Roadmap (T0/T30/T60/T90)"
      subtitle="Personalisierte Timeline mit 15 bis 25 Pflicht- und Soll-Aufgaben für die ersten 90 Tage deiner Selbstständigkeit. Die Setup-Fragen klären deine Situation, danach siehst du nur relevante Aufgaben. Der Status bleibt lokal in deinem Browser."
    >
      <BeginnerHero />

      <ToolLayout
        className="mb-8"
        inputs={
          /* === Setup === */
          <ToolSection title="Setup: wer bist du? (5 Fragen)" icon={Target}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Rechtsform" htmlFor="rm-rechtsform">
                <select id="rm-rechtsform" value={setup.rechtsform} onChange={(e) => updateSetup("rechtsform", e.target.value as Rechtsform)} className={selectCls}>
                  <option value="freiberuf">Freiberufler (§18 EStG)</option>
                  <option value="einzel-gewerbe">Einzel-Gewerbe</option>
                  <option value="gbr">GbR</option>
                  <option value="ug-gmbh">UG / GmbH</option>
                </select>
              </Field>
              <Field label="USt-Status" htmlFor="rm-ust">
                <select id="rm-ust" value={setup.ustStatus} onChange={(e) => updateSetup("ustStatus", e.target.value as UstStatus)} className={selectCls}>
                  <option value="ku">Kleinunternehmer §19 UStG (keine USt)</option>
                  <option value="regel">Regelbesteuerung (mit USt)</option>
                  <option value="unsicher">Noch unsicher</option>
                </select>
              </Field>
              <CheckKarte
                checked={setup.bereitsAngemeldet}
                onChange={(v) => updateSetup("bereitsAngemeldet", v)}
                titel="Bereits angemeldet?"
                hinweis="Gewerbe + FA-Anmeldung schon durch"
              />
              <CheckKarte
                checked={setup.b2b}
                onChange={(v) => updateSetup("b2b", v)}
                titel="B2B-Geschäft?"
                hinweis="Verkauf an Unternehmen / nicht nur Endkunden"
              />
              <CheckKarte
                checked={setup.euGeschaeft}
                onChange={(v) => updateSetup("euGeschaeft", v)}
                titel="EU-Geschäft?"
                hinweis="Kunden in EU-Ausland (B2B oder B2C)"
              />
              <CheckKarte
                checked={setup.mitarbeiter}
                onChange={(v) => updateSetup("mitarbeiter", v)}
                titel="Mitarbeiter?"
                hinweis="Plant Minijob/Festanstellung in 90 Tagen"
              />
            </div>
          </ToolSection>
        }
        result={
          /* === Fortschritt === */
          <ResultPanel
            variant="ink"
            kicker="Fortschritt"
            title={`${Math.round(fortschritt.prozent)} % erledigt`}
            value={
              <>
                {fortschritt.done} / {fortschritt.total}
              </>
            }
            valueHint="Aufgaben erledigt"
            actions={
              <Button
                onClick={resetStatus}
                variant="outline"
                size="sm"
                className="border-white/20 bg-white/10 text-primary-foreground hover:border-white/30 hover:bg-white/15"
              >
                <RotateCcw aria-hidden="true" /> Status zurücksetzen
              </Button>
            }
          >
            <div className="h-2 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
              <div className="h-full rounded-full bg-brand-green transition-all" style={{ width: `${fortschritt.prozent}%` }} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10">
              {(["T0", "T30", "T60", "T90"] as Phase[]).map((p) => (
                <div key={p} className="bg-white/[0.04] p-3">
                  <div className="text-xs text-primary-foreground/65">{PHASE_LABELS[p].titel.split(":")[0]}</div>
                  <div className="mt-0.5 font-semibold text-primary-foreground tabular">
                    {fortschritt.proPhase[p].done} / {fortschritt.proPhase[p].total}
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-brand-green" style={{ width: `${fortschritt.proPhase[p].total > 0 ? (fortschritt.proPhase[p].done / fortschritt.proPhase[p].total) * 100 : 0}%` }} />
                  </div>
                </div>
              ))}
            </div>
            {fortschritt.laufend > 0 && (
              <p className="mt-3 text-sm text-primary-foreground/70">
                <span className="tabular">{fortschritt.laufend}</span> {fortschritt.laufend === 1 ? "Aufgabe" : "Aufgaben"} in Arbeit
              </p>
            )}
          </ResultPanel>
        }
      />

      {/* === Filter === */}
      <div className="mb-6 flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-card p-4 shadow-card">
        <Field label="Pflicht-Stufe" htmlFor="rm-f-pflicht" className="min-w-[180px] flex-1 sm:flex-none">
          <select id="rm-f-pflicht" value={filterPflicht} onChange={(e) => setFilterPflicht(e.target.value as Pflicht | "alle")} className={selectCls}>
            <option value="alle">Alle Pflicht-Stufen</option>
            <option value="muss">Nur MUSS</option>
            <option value="soll">Nur SOLL</option>
            <option value="kann">Nur KANN</option>
          </select>
        </Field>
        <Field label="Status" htmlFor="rm-f-status" className="min-w-[180px] flex-1 sm:flex-none">
          <select id="rm-f-status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as TaskStatus | "alle")} className={selectCls}>
            <option value="alle">Alle Status</option>
            <option value="offen">Nur offen</option>
            <option value="laufend">Nur in Arbeit</option>
            <option value="erledigt">Nur erledigt</option>
          </select>
        </Field>
        <p className="flex items-center gap-1.5 pb-2.5 text-sm text-muted-foreground sm:ml-auto">
          <Filter className="h-4 w-4" aria-hidden="true" />
          <span className="tabular">{filtered.length} von {relevantTasks.length} sichtbar</span>
        </p>
      </div>

      {/* === Phasen-Listen === */}
      {(["T0", "T30", "T60", "T90"] as Phase[]).map((phase) => (
        <PhaseSection key={phase} phase={phase} tasks={byPhase[phase]} status={status} onCycle={cycleStatus} onSetStatus={updateStatus} />
      ))}

      {filtered.length === 0 && (
        <EmptyState
          icon={Filter}
          className="mb-6"
          title="Keine Aufgaben passen zum Filter"
          description="Ändere die Filter oben oder passe dein Setup an."
        />
      )}

      {/* === Cross-Links === */}
      <div className="mb-6 mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
        {[
          { to: "/cockpit/gewerbeanmeldung-wizard", t: "Gewerbeanmeldung-Wizard", d: "GewA1-Vorbereitung" },
          { to: "/cockpit/stb-cost-benefit", t: "Steuerberater: Kosten und Nutzen", d: "DIY oder Steuerberater?" },
          { to: "/cockpit/rechnungs-generator", t: "Rechnungs-Generator", d: "Erste §14-Rechnung" },
        ].map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-card transition-colors hover:border-accent-blue/40"
          >
            <span>
              <span className="block text-sm font-semibold">{l.t}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground">{l.d}</span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent-blue" aria-hidden="true" />
          </Link>
        ))}
      </div>

      <Glossar />
      <Stand2026Footer
        sources={[
          { label: "§14 GewO (Anzeigepflicht)", url: "https://www.gesetze-im-internet.de/gewo/__14.html" },
          { label: "ELSTER (FsE + USt-VA)", url: "https://www.elster.de" },
          { label: "DRV Statusfeststellung (Rentenversicherungs-Pflicht)", url: "https://www.deutsche-rentenversicherung.de" },
          { label: "BZSt USt-ID-Antrag", url: "https://www.bzst.de" },
          { label: "DPMA Markenanmeldung", url: "https://www.dpma.de" },
        ]}
        note="Roadmap ist Orientierung — Reihenfolge und Pflichten variieren leicht je Berufsbild und Stadt. Bei erlaubnispflichtigen Gewerben (Gastronomie, Makler, Sicherheit) zusätzliche Schritte VOR Anmeldung. Bei Pflichtversicherten Berufen (Künstler in KSK, arbeitnehmerähnliche Selbstständige) RV-Beiträge ab Tag 1!"
      />
    </CockpitShell>
  );
};

// ============================================================================
// Setup-Checkbox als Karte
// ============================================================================
const CheckKarte = ({ checked, onChange, titel, hinweis }: {
  checked: boolean;
  onChange: (v: boolean) => void;
  titel: string;
  hinweis: string;
}) => (
  <label
    className={cn(
      "flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors",
      checked ? "border-accent-blue/40 bg-accent" : "border-border bg-card hover:border-foreground/25",
    )}
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--accent-blue))]"
    />
    <span className="text-sm">
      <span className="block font-medium">{titel}</span>
      <span className="mt-0.5 block text-muted-foreground">{hinweis}</span>
    </span>
  </label>
);

// ============================================================================
// Phase-Section
// ============================================================================
const PhaseSection = ({ phase, tasks, status, onCycle, onSetStatus }: {
  phase: Phase;
  tasks: RoadmapTask[];
  status: Record<string, TaskStatus>;
  onCycle: (id: string) => void;
  onSetStatus: (id: string, s: TaskStatus) => void;
}) => {
  if (tasks.length === 0) return null;
  const labels = PHASE_LABELS[phase];
  const erledigt = tasks.filter((t) => status[t.id] === "erledigt").length;

  return (
    <ToolSection
      title={labels.titel}
      description={labels.subtitel}
      icon={PHASE_ICON[phase]}
      className="mb-6"
      bodyClassName="p-3 md:p-4"
      actions={
        <span className="text-sm text-muted-foreground tabular">
          {erledigt} von {tasks.length} erledigt
        </span>
      }
    >
      <ul className="space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} status={status[task.id] || "offen"} onCycle={() => onCycle(task.id)} onSetStatus={onSetStatus} />
        ))}
      </ul>
    </ToolSection>
  );
};

const PHASE_ICON: Record<Phase, ElementType> = { T0: Flag, T30: CalendarDays, T60: CalendarRange, T90: Rocket };

// ============================================================================
// Task-Card
// ============================================================================
const PFLICHT: Record<Pflicht, { label: string; tone: Tone }> = {
  muss: { label: "Muss", tone: "danger" },
  soll: { label: "Soll", tone: "warning" },
  kann: { label: "Kann", tone: "info" },
};
const STATUS_LABEL: Record<TaskStatus, string> = { offen: "Offen", laufend: "In Arbeit", erledigt: "Erledigt" };

const TaskCard = ({ task, status, onCycle, onSetStatus }: {
  task: RoadmapTask;
  status: TaskStatus;
  onCycle: () => void;
  onSetStatus: (id: string, s: TaskStatus) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const pflicht = PFLICHT[task.pflicht];

  return (
    <li className={cn("rounded-xl border border-border bg-card p-3.5 transition-colors", status === "erledigt" && "bg-secondary/40")}>
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={onCycle}
          className="mt-0.5 shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          title="Klicken zum Wechseln: offen → in Arbeit → erledigt"
          aria-label={`Status von „${task.titel}“: ${STATUS_LABEL[status]}. Klicken zum Wechseln`}
        >
          {status === "erledigt" ? <CheckCircle2 className="h-5 w-5 text-success" aria-hidden="true" />
            : status === "laufend" ? <Clock className="h-5 w-5 text-warning" aria-hidden="true" />
            : <Circle className="h-5 w-5 text-muted-foreground" aria-hidden="true" />}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <ToneBadge tone={pflicht.tone}>{pflicht.label}</ToneBadge>
              <span className={cn("text-sm font-semibold", status === "erledigt" && "text-muted-foreground line-through decoration-muted-foreground/50")}>
                {task.titel}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-0.5 text-sm font-medium text-accent-blue hover:underline"
            >
              {expanded ? "weniger" : "mehr"}<ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} aria-hidden="true" />
            </button>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{task.beschreibung}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {task.zeitaufwand}
            </span>
            {task.kostenHint && (
              <span className="inline-flex items-center gap-1">
                <Wallet className="h-3.5 w-3.5" aria-hidden="true" /> {task.kostenHint}
              </span>
            )}
          </div>

          {expanded && (
            <div className="mt-3 space-y-3 border-t border-border/70 pt-3">
              <div>
                <p className="mb-1 text-sm font-semibold">Schritte:</p>
                <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground marker:text-muted-foreground/70">
                  {task.schritte.map((s, i) => <li key={i}>{s}</li>)}
                </ol>
              </div>
              {(task.toolLink || task.externalLink) && (
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {task.toolLink && (
                    <Link to={task.toolLink.route} className="inline-flex items-center gap-1 text-sm font-medium text-accent-blue hover:underline">
                      <ChevronRight className="h-4 w-4" aria-hidden="true" /> {task.toolLink.label}
                    </Link>
                  )}
                  {task.externalLink && (
                    <a href={task.externalLink.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-accent-blue hover:underline">
                      <ExternalLink className="h-4 w-4" aria-hidden="true" /> {task.externalLink.label}
                    </a>
                  )}
                </div>
              )}
              <ChoiceGroup<TaskStatus>
                label="Status setzen"
                size="sm"
                value={status}
                onChange={(s) => onSetStatus(task.id, s)}
                options={(["offen", "laufend", "erledigt"] as TaskStatus[]).map((s) => ({ value: s, label: STATUS_LABEL[s] }))}
              />
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

// ============================================================================
// Sub-Components
// ============================================================================
const BeginnerHero = () => (
  <section className="mb-8 rounded-2xl border border-border bg-card p-5 shadow-card md:p-6">
    <h2 className="text-base font-semibold tracking-tight">90-Tage-Plan für die ersten 3 Monate</h2>
    <p className="mt-1.5 max-w-[80ch] text-sm leading-relaxed text-muted-foreground">
      Anfänger:innen wissen oft nicht WAS in WELCHER REIHENFOLGE kommt. Diese Roadmap personalisiert
      25 Pflicht- und Soll-Aufgaben anhand deiner Situation (Rechtsform, USt-Status, B2B/B2C, EU-Geschäft) und
      gruppiert sie in 4 Phasen (T0/T30/T60/T90). Status-Tracking lokal im Browser — kein Konto nötig.
    </p>
    <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
      {[
        { k: "MUSS", d: "Pflicht — fehlende Erfüllung = Bußgeld/Nachzahlung", tone: "danger" as Tone },
        { k: "SOLL", d: "Dringend empfohlen — meiste Profis machen es", tone: "warning" as Tone },
        { k: "KANN", d: "Optional je nach Strategie / Geschäftsmodell", tone: "info" as Tone },
      ].map((c) => (
        <div key={c.k} className={cn("rounded-xl border p-3", toneSoft(c.tone))}>
          <strong className={cn("text-sm font-semibold", toneText(c.tone))}>{c.k}</strong>
          <div className="mt-0.5 text-sm text-foreground/75">{c.d}</div>
        </div>
      ))}
    </div>
  </section>
);

const Glossar = () => (
  <details className="group mb-6 rounded-2xl border border-border bg-card shadow-card [&_summary::-webkit-details-marker]:hidden">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-base font-semibold md:px-6">
      <span className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-blue">
          <HelpCircle className="h-4 w-4" aria-hidden="true" />
        </span>
        Glossar: Begriffe einfach erklärt
      </span>
      <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
    </summary>
    <dl className="divide-y divide-border/70 border-t border-border/70 px-5 md:px-6">
      {[
        { b: "T0 / T30 / T60 / T90", e: "Zeit-Phasen relativ zum Start: T0 = vor/bei der Anmeldung, T30 = innerhalb der ersten 30 Tage danach, T60 = Tag 31-60, T90 = Tag 61-90. Nach T90 = laufender Betrieb." },
        { b: "MUSS vs SOLL vs KANN", e: "MUSS = rechtliche oder vertragliche Pflicht (z.B. GewA1, KV, USt-VA). SOLL = dringend empfohlen (z.B. Geschäftskonto, Buchhaltungs-Software, Berufshaftpflicht). KANN = optional je nach Geschäftsmodell (z.B. Marken-Anmeldung, BU)." },
        { b: "Pflichtversicherung Rentenversicherung", e: "BEACHTEN: Manche Solo-Selbstständige sind RV-PFLICHT: Künstler in KSK, Erzieher, Pflegekräfte, Lehrer, arbeitnehmerähnliche Selbstständige (>5/6-Regel, ein Auftraggeber). Folge: 18,6 % vom Gewinn rückwirkend. DRV-Statusfeststellung (V0023) kostenlos vor Tag 1 prüfen!" },
        { b: "Fragebogen zur steuerlichen Erfassung (FsE)", e: "Kommt 2-4 Wochen nach Gewerbeanmeldung automatisch vom Finanzamt. ELSTER-Pflicht. Hier wird § 19 KU final entschieden (5 Jahre Bindung!), voraussichtliche Einkünfte angegeben (Basis für ESt-Vorauszahlungen), Anlage S oder G gewählt." },
        { b: "USt-Voranmeldung (USt-VA)", e: "Bei Regelbesteuerung Pflicht. Frequenz hängt vom USt-Aufkommen ab: <1.000 €/J = jährlich, 1k-7.500 € = quartalsweise, >7.500 € = monatlich. Frist: 10. des Folgemonats. Dauerfristverlängerung (+1 Monat) ist Standard." },
        { b: "Dauerfristverlängerung", e: "Verlängerung der USt-VA-Frist um 1 Monat. Antrag online via ELSTER. Bei monatlicher USt-VA: 1/11 als Sondervorauszahlung (wird im Dez. zurückgerechnet). Lohnt sich fast immer." },
        { b: "Notgroschen + Steuer-Rücklage", e: "Solo-Selbstständige sollten 3-6 Monatsausgaben Notgroschen + 30-40 % vom Gewinn Steuer-Rücklage haben. Sub-Konto bei Geschäftskonto einrichten und automatisch monatlich transferieren. Sonst böses Erwachen beim ESt-Bescheid." },
      ].map((g) => (
        <div key={g.b} className="py-4">
          <dt className="text-sm font-semibold">{g.b}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{g.e}</dd>
        </div>
      ))}
    </dl>
  </details>
);

export default ErsteSchritteRoadmap;
