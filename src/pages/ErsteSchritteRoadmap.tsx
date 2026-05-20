/**
 * ErsteSchritteRoadmap — 30/60/90-Tage-Timeline für Solo-Selbstständige
 *
 * Tool 11 der Anfänger-Wave (Starter-Kategorie, Wave 3).
 *
 * 5-Frage-Setup → personalisierte Roadmap mit 15-25 Aufgaben aus 25-Item-DB.
 * Status-Tracking pro Aufgabe (offen / in arbeit / erledigt) via localStorage.
 * Fortschritts-Bar pro Phase + Gesamt-Fortschritt.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  CheckCircle2,
  Circle,
  Clock,
  ExternalLink,
  ChevronRight,
  RotateCcw,
  Filter,
  HelpCircle,
  Target,
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
      subtitle="Personalisierte Timeline mit 15-25 Pflicht- und Soll-Aufgaben für die ersten 90 Tage deiner Selbstständigkeit. Setup-Fragen klären deine Situation, dann werden nur relevante Aufgaben angezeigt. Status-Tracking lokal im Browser."
    >
      <BeginnerHero />

      {/* === Setup === */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-4">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Target className="h-4 w-4 text-accent-blue" /> Setup — wer bist du? (5 Fragen)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Rechtsform</Label>
            <select value={setup.rechtsform} onChange={(e) => updateSetup("rechtsform", e.target.value as Rechtsform)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="freiberuf">Freiberufler (§18 EStG)</option>
              <option value="einzel-gewerbe">Einzel-Gewerbe</option>
              <option value="gbr">GbR</option>
              <option value="ug-gmbh">UG / GmbH</option>
            </select>
          </div>
          <div>
            <Label className="text-xs">USt-Status</Label>
            <select value={setup.ustStatus} onChange={(e) => updateSetup("ustStatus", e.target.value as UstStatus)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="ku">Kleinunternehmer §19 UStG (keine USt)</option>
              <option value="regel">Regelbesteuerung (mit USt)</option>
              <option value="unsicher">Noch unsicher</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-xs cursor-pointer rounded-lg border border-border p-3">
            <input type="checkbox" checked={setup.bereitsAngemeldet} onChange={(e) => updateSetup("bereitsAngemeldet", e.target.checked)} className="h-4 w-4" />
            <div>
              <strong>Bereits angemeldet?</strong>
              <div className="text-[10px] text-muted-foreground">Gewerbe + FA-Anmeldung schon durch</div>
            </div>
          </label>
          <label className="flex items-center gap-2 text-xs cursor-pointer rounded-lg border border-border p-3">
            <input type="checkbox" checked={setup.b2b} onChange={(e) => updateSetup("b2b", e.target.checked)} className="h-4 w-4" />
            <div>
              <strong>B2B-Geschäft?</strong>
              <div className="text-[10px] text-muted-foreground">Verkauf an Unternehmen / nicht nur Endkunden</div>
            </div>
          </label>
          <label className="flex items-center gap-2 text-xs cursor-pointer rounded-lg border border-border p-3">
            <input type="checkbox" checked={setup.euGeschaeft} onChange={(e) => updateSetup("euGeschaeft", e.target.checked)} className="h-4 w-4" />
            <div>
              <strong>EU-Geschäft?</strong>
              <div className="text-[10px] text-muted-foreground">Kunden in EU-Ausland (B2B oder B2C)</div>
            </div>
          </label>
          <label className="flex items-center gap-2 text-xs cursor-pointer rounded-lg border border-border p-3">
            <input type="checkbox" checked={setup.mitarbeiter} onChange={(e) => updateSetup("mitarbeiter", e.target.checked)} className="h-4 w-4" />
            <div>
              <strong>Mitarbeiter?</strong>
              <div className="text-[10px] text-muted-foreground">Plant Minijob/Festanstellung in 90 Tagen</div>
            </div>
          </label>
        </div>
      </div>

      {/* === Fortschritt-Hero === */}
      <div className="rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-card to-card p-5 mb-4">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Fortschritt</div>
            <div className="text-3xl font-bold text-emerald-700">
              {fortschritt.done} / {fortschritt.total}
              <span className="text-base text-muted-foreground ml-2">Aufgaben erledigt ({Math.round(fortschritt.prozent)} %)</span>
            </div>
          </div>
          <Button onClick={resetStatus} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-1" /> Status zurücksetzen
          </Button>
        </div>
        <div className="h-3 rounded-full bg-secondary overflow-hidden mb-3">
          <div className="h-full bg-emerald-500 transition-all" style={{ width: `${fortschritt.prozent}%` }} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          {(["T0", "T30", "T60", "T90"] as Phase[]).map((p) => (
            <div key={p} className="rounded-lg bg-secondary/40 p-2">
              <div className="text-[10px] uppercase text-muted-foreground">{PHASE_LABELS[p].titel.split(":")[0]}</div>
              <div className="font-mono font-semibold">{fortschritt.proPhase[p].done} / {fortschritt.proPhase[p].total}</div>
              <div className="h-1 rounded-full bg-secondary mt-1 overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${fortschritt.proPhase[p].total > 0 ? (fortschritt.proPhase[p].done / fortschritt.proPhase[p].total) * 100 : 0}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === Filter === */}
      <div className="rounded-2xl border border-border bg-card p-3 mb-4 flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Filter:</span>
        <select value={filterPflicht} onChange={(e) => setFilterPflicht(e.target.value as Pflicht | "alle")} className="h-8 rounded-md border border-input bg-background px-2 text-xs">
          <option value="alle">Alle Pflicht-Stufen</option>
          <option value="muss">Nur MUSS</option>
          <option value="soll">Nur SOLL</option>
          <option value="kann">Nur KANN</option>
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as TaskStatus | "alle")} className="h-8 rounded-md border border-input bg-background px-2 text-xs">
          <option value="alle">Alle Status</option>
          <option value="offen">Nur offen</option>
          <option value="laufend">Nur in Arbeit</option>
          <option value="erledigt">Nur erledigt</option>
        </select>
        <div className="text-xs text-muted-foreground ml-auto">
          {filtered.length} von {relevantTasks.length} sichtbar
        </div>
      </div>

      {/* === Phasen-Listen === */}
      {(["T0", "T30", "T60", "T90"] as Phase[]).map((phase) => (
        <PhaseSection key={phase} phase={phase} tasks={byPhase[phase]} status={status} onCycle={cycleStatus} onSetStatus={updateStatus} />
      ))}

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          Keine Aufgaben matchen den aktuellen Filter. Filter zurücksetzen oder Setup anpassen.
        </div>
      )}

      {/* === Cross-Links === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-6 mb-6">
        <Link to="/cockpit/gewerbeanmeldung-wizard" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">Gewerbeanmeldung-Wizard (Tool 10) →</div>
          <div className="text-muted-foreground">GewA1-Vorbereitung</div>
        </Link>
        <Link to="/cockpit/stb-cost-benefit" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">StB Cost-Benefit (Tool 7) →</div>
          <div className="text-muted-foreground">DIY oder Steuerberater?</div>
        </Link>
        <Link to="/cockpit/rechnungs-generator" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">Rechnungs-Generator (Tool 9) →</div>
          <div className="text-muted-foreground">Erste §14-Rechnung</div>
        </Link>
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

  return (
    <div className="mb-4">
      <div className="flex items-baseline gap-2 mb-2 px-1">
        <h3 className="font-bold text-base">{labels.titel}</h3>
        <span className="text-xs text-muted-foreground">— {labels.subtitel}</span>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} status={status[task.id] || "offen"} onCycle={() => onCycle(task.id)} onSetStatus={onSetStatus} />
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// Task-Card
// ============================================================================
const TaskCard = ({ task, status, onCycle, onSetStatus }: {
  task: RoadmapTask;
  status: TaskStatus;
  onCycle: () => void;
  onSetStatus: (id: string, s: TaskStatus) => void;
}) => {
  const [expanded, setExpanded] = useState(false);

  const pflichtFarbe = task.pflicht === "muss" ? "text-red-700 bg-red-500/10 border-red-500/30"
    : task.pflicht === "soll" ? "text-amber-700 bg-amber-500/10 border-amber-500/30"
    : "text-blue-700 bg-blue-500/10 border-blue-500/30";

  const phaseColor = task.phase === "T0" ? "bg-purple-500/20 text-purple-700"
    : task.phase === "T30" ? "bg-emerald-500/20 text-emerald-700"
    : task.phase === "T60" ? "bg-blue-500/20 text-blue-700"
    : "bg-amber-500/20 text-amber-700";

  return (
    <div className={`rounded-xl border bg-card p-3 transition ${status === "erledigt" ? "opacity-60" : ""}`}>
      <div className="flex items-start gap-3">
        <button onClick={onCycle} className="mt-0.5 shrink-0" title="Klicken zum Wechseln: offen → in Arbeit → erledigt">
          {status === "erledigt" ? <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            : status === "laufend" ? <Clock className="h-5 w-5 text-amber-600" />
            : <Circle className="h-5 w-5 text-muted-foreground" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${phaseColor}`}>{task.phase}</span>
              <span className={`text-[10px] font-bold uppercase border px-1.5 py-0.5 rounded ${pflichtFarbe}`}>{task.pflicht}</span>
              <span className={`font-semibold text-sm ${status === "erledigt" ? "line-through" : ""}`}>{task.titel}</span>
            </div>
            <button onClick={() => setExpanded(!expanded)} className="text-[11px] text-accent-blue hover:underline">
              {expanded ? "weniger" : "mehr"}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{task.beschreibung}</p>
          <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground">
            <span>⏱ {task.zeitaufwand}</span>
            {task.kostenHint && <span>💰 {task.kostenHint}</span>}
          </div>

          {expanded && (
            <div className="mt-3 space-y-2">
              <div>
                <div className="font-semibold text-xs mb-1">Schritte:</div>
                <ul className="text-xs space-y-0.5 list-disc list-inside text-muted-foreground">
                  {task.schritte.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {task.toolLink && (
                  <Link to={task.toolLink.route} className="inline-flex items-center gap-1 text-[11px] text-accent-blue hover:underline">
                    <ChevronRight className="h-3 w-3" /> {task.toolLink.label}
                  </Link>
                )}
                {task.externalLink && (
                  <a href={task.externalLink.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] text-accent-blue hover:underline">
                    <ExternalLink className="h-3 w-3" /> {task.externalLink.label}
                  </a>
                )}
              </div>
              <div className="flex gap-1 pt-1">
                {(["offen", "laufend", "erledigt"] as TaskStatus[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => onSetStatus(task.id, s)}
                    className={`text-[10px] px-2 py-1 rounded border transition ${
                      status === s
                        ? "bg-accent-blue text-white border-accent-blue"
                        : "border-border bg-card hover:border-accent-blue"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Sub-Components
// ============================================================================
const BeginnerHero = () => (
  <div className="rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-card to-card p-5 mb-6">
    <div className="flex items-start gap-3">
      <Lightbulb className="h-6 w-6 text-purple-700 shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="font-bold text-sm mb-1">90-Tage-Plan für die ersten 3 Monate</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-2">
          Anfänger:innen wissen oft nicht WAS in WELCHER REIHENFOLGE kommt. Diese Roadmap personalisiert
          25 Pflicht- und Soll-Aufgaben anhand deiner Situation (Rechtsform, USt-Status, B2B/B2C, EU-Geschäft) und
          gruppiert sie in 4 Phasen (T0/T30/T60/T90). Status-Tracking lokal im Browser — kein Konto nötig.
        </p>
        <div className="grid grid-cols-3 gap-2 text-[11px]">
          <div className="rounded-lg bg-red-500/5 p-2 border border-red-500/20">
            <strong className="text-red-700">MUSS</strong>
            <div className="text-muted-foreground mt-0.5">Pflicht — fehlende Erfüllung = Bußgeld/Nachzahlung</div>
          </div>
          <div className="rounded-lg bg-amber-500/5 p-2 border border-amber-500/20">
            <strong className="text-amber-700">SOLL</strong>
            <div className="text-muted-foreground mt-0.5">Dringend empfohlen — meiste Profis machen es</div>
          </div>
          <div className="rounded-lg bg-blue-500/5 p-2 border border-blue-500/20">
            <strong className="text-blue-700">KANN</strong>
            <div className="text-muted-foreground mt-0.5">Optional je nach Strategie / Geschäftsmodell</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Glossar = () => (
  <details className="rounded-2xl border border-border bg-card p-5 mb-6">
    <summary className="cursor-pointer font-bold text-sm flex items-center gap-2">
      <HelpCircle className="h-4 w-4 text-accent-blue" /> Glossar — Begriffe einfach erklärt
    </summary>
    <div className="mt-3 space-y-3 text-xs leading-relaxed">
      {[
        { b: "T0 / T30 / T60 / T90", e: "Zeit-Phasen relativ zum Start: T0 = vor/bei der Anmeldung, T30 = innerhalb der ersten 30 Tage danach, T60 = Tag 31-60, T90 = Tag 61-90. Nach T90 = laufender Betrieb." },
        { b: "MUSS vs SOLL vs KANN", e: "MUSS = rechtliche oder vertragliche Pflicht (z.B. GewA1, KV, USt-VA). SOLL = dringend empfohlen (z.B. Geschäftskonto, Buchhaltungs-Software, Berufshaftpflicht). KANN = optional je nach Geschäftsmodell (z.B. Marken-Anmeldung, BU)." },
        { b: "Pflichtversicherung Rentenversicherung", e: "BEACHTEN: Manche Solo-Selbstständige sind RV-PFLICHT: Künstler in KSK, Erzieher, Pflegekräfte, Lehrer, arbeitnehmerähnliche Selbstständige (>5/6-Regel, ein Auftraggeber). Folge: 18,6 % vom Gewinn rückwirkend. DRV-Statusfeststellung (V0023) kostenlos vor Tag 1 prüfen!" },
        { b: "Fragebogen zur steuerlichen Erfassung (FsE)", e: "Kommt 2-4 Wochen nach Gewerbeanmeldung automatisch vom Finanzamt. ELSTER-Pflicht. Hier wird § 19 KU final entschieden (5 Jahre Bindung!), voraussichtliche Einkünfte angegeben (Basis für ESt-Vorauszahlungen), Anlage S oder G gewählt." },
        { b: "USt-Voranmeldung (USt-VA)", e: "Bei Regelbesteuerung Pflicht. Frequenz hängt vom USt-Aufkommen ab: <1.000 €/J = jährlich, 1k-7.500 € = quartalsweise, >7.500 € = monatlich. Frist: 10. des Folgemonats. Dauerfristverlängerung (+1 Monat) ist Standard." },
        { b: "Dauerfristverlängerung", e: "Verlängerung der USt-VA-Frist um 1 Monat. Antrag online via ELSTER. Bei monatlicher USt-VA: 1/11 als Sondervorauszahlung (wird im Dez. zurückgerechnet). Lohnt sich fast immer." },
        { b: "Notgroschen + Steuer-Rücklage", e: "Solo-Selbstständige sollten 3-6 Monatsausgaben Notgroschen + 30-40 % vom Gewinn Steuer-Rücklage haben. Sub-Konto bei Geschäftskonto einrichten und automatisch monatlich transferieren. Sonst böses Erwachen beim ESt-Bescheid." },
      ].map((g) => (
        <div key={g.b} className="rounded-lg bg-secondary/30 p-3">
          <div className="font-semibold text-foreground mb-1">{g.b}</div>
          <div className="text-muted-foreground">{g.e}</div>
        </div>
      ))}
    </div>
  </details>
);

export default ErsteSchritteRoadmap;
