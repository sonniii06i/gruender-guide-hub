/**
 * VersicherungsBasisCheck — "Welche Versicherungen brauche ich wirklich?"
 *
 * Tool 12 der Anfänger-Wave (Starter-Kategorie, Wave 3, finale Tool).
 *
 * 7-Frage-Setup → priorisierte Empfehlungen (PFLICHT/DRINGEND/SINNVOLL/
 * OPTIONAL/NICHT NÖTIG) mit Schadenbeispielen, Beitrags-Schätzung,
 * Worauf-Achten-Checkliste und Gesamt-Kosten-Vorschau.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { NumberField } from "@/components/ui/number-field";
import { Callout, Field, ResultPanel, ToneBadge, ToolLayout, ToolSection, selectCls, type Tone } from "@/components/cockpit/kit";
import {
  Lightbulb,
  Shield,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Building2,
  FileCheck,
  Target,
} from "lucide-react";
import {
  VERSICHERUNGEN,
  BERUFSBILD_LABELS,
  PRIORITAET_FARBE,
  type Berufsbild,
  type Rechtsform,
  type VersicherungsSetup,
  type Prioritaet,
} from "@/data/versicherungen";

const LS_KEY = "ggh-versicherungs-setup-v1";

const defaultSetup: VersicherungsSetup = {
  berufsbild: "it-software",
  rechtsform: "einzel-freiberuf",
  mitarbeiter: false,
  eigenesBuero: false,
  onlineDatenverarbeitung: true,
  eigeneProdukte: false,
  jahresUmsatz: 60000,
};

const VersicherungsBasisCheck = () => {
  const [setup, setSetup] = useState<VersicherungsSetup>(() => {
    if (typeof window === "undefined") return defaultSetup;
    // localStorage kann werfen (Safari privat, blockierter Speicher)
    try {
      const saved = localStorage.getItem(LS_KEY);
      return saved ? { ...defaultSetup, ...JSON.parse(saved) } : defaultSetup;
    } catch {
      return defaultSetup;
    }
  });

  const updateSetup = <K extends keyof VersicherungsSetup>(field: K, val: VersicherungsSetup[K]) => {
    const next = { ...setup, [field]: val };
    setSetup(next);
    try { localStorage.setItem(LS_KEY, JSON.stringify(next)); } catch { /* Speicher gesperrt */ }
  };

  // Empfehlungen berechnen
  const empfehlungen = useMemo(() => {
    return VERSICHERUNGEN.map((v) => ({
      ...v,
      priorityResult: v.prioritaet(setup),
      pflichtGrund: v.pflicht_begruendung?.(setup) ?? null,
    })).sort((a, b) => {
      const order: Record<Prioritaet, number> = { "pflicht": 0, "dringend": 1, "sinnvoll": 2, "optional": 3, "nicht-noetig": 4 };
      return order[a.priorityResult] - order[b.priorityResult];
    });
  }, [setup]);

  // Gesamt-Kosten-Schätzung (Mittel) für PFLICHT + DRINGEND
  const kostenSchaetzung = useMemo(() => {
    const relevant = empfehlungen.filter((e) => e.priorityResult === "pflicht" || e.priorityResult === "dringend");
    const min = relevant.reduce((sum, e) => sum + e.beitragRange.min, 0);
    const mittel = relevant.reduce((sum, e) => sum + e.beitragRange.mittel, 0);
    const max = relevant.reduce((sum, e) => sum + e.beitragRange.max, 0);
    return { anzahl: relevant.length, min, mittel, max };
  }, [empfehlungen]);

  const nichtNoetig = empfehlungen.filter((e) => e.priorityResult === "nicht-noetig");

  return (
    <CockpitShell
      eyebrow="🌱 Erste Schritte · für komplette Anfänger:innen"
      title="Versicherungs-Basis-Check Solo"
      subtitle="Welche Versicherungen brauchst du WIRKLICH? 7-Frage-Setup → priorisierte Empfehlungen aus 11 Versicherungs-Typen mit Schadenbeispielen, Beitrags-Schätzung und Worauf-Achten-Liste. Kein Versicherungs-Verkauf, neutrale Orientierung."
    >
      <BeginnerHero />

      <ToolLayout
        className="mb-10"
        inputs={
          <ToolSection icon={Shield} title="Setup: 7 Fragen" description="Deine Antworten bleiben in diesem Browser gespeichert.">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Berufsbild" htmlFor="vb-beruf">
                <select id="vb-beruf" value={setup.berufsbild} onChange={(e) => updateSetup("berufsbild", e.target.value as Berufsbild)} className={selectCls}>
                  {Object.entries(BERUFSBILD_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </Field>
              <Field label="Rechtsform" htmlFor="vb-rf">
                <select id="vb-rf" value={setup.rechtsform} onChange={(e) => updateSetup("rechtsform", e.target.value as Rechtsform)} className={selectCls}>
                  <option value="einzel-freiberuf">Freiberuf (Einzelunternehmen)</option>
                  <option value="einzel-gewerbe">Einzel-Gewerbe</option>
                  <option value="gbr">GbR</option>
                  <option value="ug-gmbh">UG / GmbH</option>
                </select>
              </Field>
              <Field label="Voraussichtlicher Jahres-Umsatz (€)" className="md:col-span-2">
                <NumberField aria-label="Voraussichtlicher Jahres-Umsatz in Euro" value={setup.jahresUmsatz} onChange={(n) => updateSetup("jahresUmsatz", n)} min={0} className="tabular" />
              </Field>
            </div>
            <fieldset className="mt-5">
              <legend className="mb-2 text-sm font-medium">Deine Situation</legend>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {([
                  ["mitarbeiter", "Mitarbeiter / Praktikant / Minijob"],
                  ["eigenesBuero", "Eigenes Büro / Lager mit Inventar > 5k €"],
                  ["onlineDatenverarbeitung", "Online-Geschäft / Kundendaten verarbeitend"],
                  ["eigeneProdukte", "Eigene Produkte / Eigenmarke (verkauft, nicht nur Dienstleistung)"],
                ] as const).map(([k, label]) => (
                  <label
                    key={k}
                    className={`flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 text-sm transition-colors ${
                      setup[k] ? "border-accent-blue/40 bg-accent/60" : "border-border bg-card hover:border-foreground/20"
                    }`}
                  >
                    <input type="checkbox" checked={setup[k]} onChange={(e) => updateSetup(k, e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]" />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </ToolSection>
        }
        result={
          <ResultPanel
            variant="ink"
            kicker={<>Geschätzte Jahreskosten für PFLICHT + DRINGEND ({kostenSchaetzung.anzahl} Versicherungen)</>}
            title={null}
            value={<>{kostenSchaetzung.mittel.toLocaleString("de-DE")} €</>}
            valueHint={<>Spanne: {kostenSchaetzung.min.toLocaleString("de-DE")} bis {kostenSchaetzung.max.toLocaleString("de-DE")} € pro Jahr</>}
          >
            <div className="flex items-baseline justify-between border-t border-white/10 pt-4 text-sm">
              <span>Pro Monat</span>
              <span className="text-lg font-semibold tabular">~{Math.round(kostenSchaetzung.mittel / 12).toLocaleString("de-DE")} €</span>
            </div>
            <p className="mt-3 text-xs text-primary-foreground/65">Schätzwerte für Solo-Selbstständige bei mittlerem Risiko-Profil.</p>
          </ResultPanel>
        }
      />

      <h2 className="mb-4 text-lg font-semibold tracking-tight">Deine Empfehlungen</h2>
      <div className="mb-6 space-y-3">
        {empfehlungen.filter((e) => e.priorityResult !== "nicht-noetig").map((v) => (
          <VersicherungsCard
            key={v.id}
            versicherung={v}
            prioritaet={v.priorityResult}
            pflichtGrund={v.pflichtGrund}
          />
        ))}
      </div>

      {nichtNoetig.length > 0 && (
        <details className="group mb-8 rounded-2xl border border-border bg-card [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-4 text-sm font-semibold">
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
            Versicherungen die du laut deinem Setup NICHT brauchst ({nichtNoetig.length})
          </summary>
          <div className="grid gap-2 px-5 pb-5 sm:grid-cols-2">
            {nichtNoetig.map((v) => (
              <div key={v.id} className="rounded-xl bg-secondary/50 p-3 text-sm">
                <div className="font-medium text-foreground/80">{v.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{v.beschreibung}</div>
              </div>
            ))}
          </div>
        </details>
      )}

      <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-3">
        {[
          { to: "/cockpit/kv-optimizer", t: "KV-Optimizer", d: "Krankenversicherung im Detail" },
          { to: "/cockpit/erste-schritte-roadmap", t: "Erste-Schritte-Roadmap (Tool 11)", d: "Wann welche Versicherung?" },
          { to: "/cockpit/pension-optimizer", t: "Pension-Optimizer", d: "Altersvorsorge ergänzen" },
        ].map((l) => (
          <Link key={l.to} to={l.to} className="press group rounded-xl border border-border bg-card p-4 hover:border-accent-blue/40 hover:shadow-card">
            <div className="flex items-center justify-between gap-2 text-sm font-semibold">
              {l.t}
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent-blue" aria-hidden="true" />
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">{l.d}</div>
          </Link>
        ))}
      </div>

      <Glossar />
      <Stand2026Footer
        sources={[
          { label: "BaFin Versicherungs-Aufsicht", url: "https://www.bafin.de" },
          { label: "GDV Versicherer-Verband", url: "https://www.gdv.de" },
          { label: "§51 BRAO (Anwalt-BHV)", url: "https://www.gesetze-im-internet.de/brao/__51.html" },
          { label: "§193 VVG (KV-Pflicht)", url: "https://www.gesetze-im-internet.de/vvg_2008/__193.html" },
        ]}
        note="Beitrags-Ranges sind 2025/2026-Markt-Durchschnitte für Solo bei mittlerem Risiko. Bei Hochrisiko-Tätigkeiten (USA-Geschäft, Health-Tech, Hochleistungs-Sport, Architekt) deutlich höher. Tool ist NEUTRALE Orientierung, kein Versicherungs-Verkauf. Vor Abschluss: Makler-Beratung empfohlen wegen Detail-Komplexität (Klauseln, Ausschlüsse, Selbstbehalt). Mein Tipp: 2-3 Angebote einholen + Bedingungen vergleichen, nicht nur Preis."
      />
    </CockpitShell>
  );
};

const TONE: Record<Prioritaet, Tone> = {
  pflicht: "danger",
  dringend: "warning",
  sinnvoll: "info",
  optional: "neutral",
  "nicht-noetig": "neutral",
};
const RAND: Record<Prioritaet, string> = {
  pflicht: "border-l-danger",
  dringend: "border-l-warning",
  sinnvoll: "border-l-info",
  optional: "border-l-border",
  "nicht-noetig": "border-l-border",
};

// ============================================================================
// Versicherungs-Card
// ============================================================================
const VersicherungsCard = ({ versicherung: v, prioritaet, pflichtGrund }: {
  versicherung: typeof VERSICHERUNGEN[0];
  prioritaet: Prioritaet;
  pflichtGrund: string | null;
}) => {
  const [expanded, setExpanded] = useState(prioritaet === "pflicht" || prioritaet === "dringend");
  const c = PRIORITAET_FARBE[prioritaet];

  return (
    <article className={`rounded-2xl border border-l-4 border-border bg-card p-5 shadow-card ${RAND[prioritaet]}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <ToneBadge tone={TONE[prioritaet]}>{c.label}</ToneBadge>
            <span className="text-xs text-muted-foreground">{v.kuerzel}</span>
          </div>
          <h3 className="text-base font-semibold">{v.name}</h3>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Beitrag/Jahr (mittel)</div>
          <div className="text-lg font-semibold tabular">
            {v.beitragRange.mittel.toLocaleString("de-DE")} €
          </div>
          <div className="text-xs text-muted-foreground tabular">
            {v.beitragRange.min.toLocaleString("de-DE")} bis {v.beitragRange.max.toLocaleString("de-DE")} €
          </div>
        </div>
      </div>

      {pflichtGrund && (
        <Callout tone="danger" className="mt-3 p-3 text-xs">
          <strong className="text-danger">Pflicht-Begründung:</strong> {pflichtGrund}
        </Callout>
      )}

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.beschreibung}</p>

      <div className="mt-3 rounded-xl bg-secondary/60 p-3 text-sm">
        <p className="flex items-center gap-1.5 font-medium text-foreground">
          <Target className="h-3.5 w-3.5 text-warning" aria-hidden="true" /> Beispiel-Schadensfall
        </p>
        <p className="mt-0.5 text-muted-foreground">{v.schadenbeispiel}</p>
      </div>

      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent-blue hover:underline"
      >
        {expanded ? "weniger anzeigen" : "mehr Details"}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {expanded && (
        <div className="mt-4 grid gap-4 border-t border-border/70 pt-4 text-sm md:grid-cols-3">
          <div>
            <p className="mb-1 flex items-center gap-1.5 font-medium"><FileCheck className="h-3.5 w-3.5 text-accent-blue" aria-hidden="true" /> Empfohlene Deckungssumme</p>
            <p className="text-muted-foreground">{v.deckungssumme}</p>
          </div>
          <div>
            <p className="mb-1 flex items-center gap-1.5 font-medium"><AlertTriangle className="h-3.5 w-3.5 text-warning" aria-hidden="true" /> Worauf achten</p>
            <ul className="space-y-1 text-muted-foreground">
              {v.worauf_achten.map((w, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-1 flex items-center gap-1.5 font-medium"><Building2 className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" /> Anbieter-Hinweise (nur Orientierung, keine Empfehlung)</p>
            <ul className="list-disc space-y-0.5 pl-4 text-muted-foreground">
              {v.anbieter_hinweise.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>
        </div>
      )}
    </article>
  );
};

// ============================================================================
// Sub-Components
// ============================================================================
const BeginnerHero = () => (
  <Callout tone="accent" icon={Lightbulb} title="Welche Versicherungen brauchst du als Solo-Selbstständige:r?" className="mb-8 p-5">
    <p className="mb-3">
      Versicherungsmakler verkaufen oft zu viel. Dieses Tool gibt eine NEUTRALE Orientierung: aus 11 Typen
      werden nur die wirklich nötigen empfohlen, nach 4 Pflicht-Stufen sortiert. Mit Schadenbeispielen,
      Beitrags-Schätzung und Hinweisen, worauf bei den Bedingungen zu achten ist.
    </p>
    <div className="flex flex-wrap gap-2 text-xs">
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-card px-2 py-1"><ToneBadge tone="danger">PFLICHT</ToneBadge> rechtlich vorgeschrieben</span>
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-card px-2 py-1"><ToneBadge tone="warning">DRINGEND</ToneBadge> ohne existenzbedrohend</span>
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-card px-2 py-1"><ToneBadge tone="info">SINNVOLL</ToneBadge> je nach Risiko-Profil</span>
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-card px-2 py-1"><ToneBadge tone="neutral">OPTIONAL</ToneBadge> nur bei spezifischem Bedarf</span>
    </div>
  </Callout>
);

const Glossar = () => (
  <details className="group mb-6 rounded-2xl border border-border bg-card [&_summary::-webkit-details-marker]:hidden">
    <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-4 text-sm font-semibold">
      <HelpCircle className="h-4 w-4 text-accent-blue" aria-hidden="true" /> Glossar: Begriffe einfach erklärt
      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
    </summary>
    <dl className="grid gap-3 px-5 pb-5 text-sm leading-relaxed md:grid-cols-2">
      {[
        { b: "Berufshaftpflicht (BHV) vs Privathaftpflicht (PHV)", e: "Zwei VERSCHIEDENE Versicherungen! BHV deckt berufliche Schäden (Kunde-Schaden durch deine Arbeit), PHV private Schäden (privat verursachte Schäden). Beide sind nötig — PHV ist Basis, BHV beruflich obendrauf. PHV ist KEIN Ersatz für BHV." },
        { b: "Deckungssumme vs Versicherungssumme", e: "Deckungssumme = max. Auszahlung pro Schadensfall. Versicherungssumme = max. pro Jahr (kann mehrere Schäden bündeln). Bei Personen-Schäden Mindest 5-10 Mio €, bei Sach 1-3 Mio. Klein-Wahl spart 10-30 % Beitrag, aber Risiko-Lücke!" },
        { b: "Selbstbehalt", e: "Was du im Schadensfall SELBST zahlst, bevor Versicherung übernimmt. 150-500 € üblich. Höherer SB = günstigerer Beitrag (typisch 10-23 % Ersparnis bei 500 € statt 0 €)." },
        { b: "Pauschaldeckung vs Einzeldeckung", e: "Pauschal = eine Summe für ALLE Schadensarten (z.B. 1 Mio gesamt). Einzel = pro Art aufgeteilt (z.B. 1 Mio Person + 500k Sach + 100k Vermögen). PAUSCHAL ist besser — keine Lücken." },
        { b: "Konkrete vs abstrakte Verweisung (BU)", e: "Bei BU: Konkrete Verweisung = nur auf konkreten, gleichwertigen Job; Abstrakte = auf jeden 'theoretisch zumutbaren'. Du willst KEINE abstrakte Verweisung — sonst muss man umlernen, statt BU zu kassieren. Faustregel: Verzicht auf abstrakte Verweisung MUSS im Vertrag stehen." },
        { b: "Karenzzeit (Krankentagegeld)", e: "Anzahl Tage bis Auszahlung beginnt. 22 Tage = Standard für PKV-User, 43 Tage = Standard für GKV-Krankengeld-Wahltarif (TK Tarif WAH). Kurze Karenz = teurer." },
        { b: "Vermögensschaden vs Personen-/Sachschaden", e: "Personen-Schaden = jemand verletzt. Sach-Schaden = etwas kaputt. Vermögens-Schaden = reiner Geldverlust ohne körperliches Schadensereignis (z.B. Fehl-Beratung). Klassische BHV deckt Personen+Sach, REINE Vermögensschäden braucht VSH-Modul." },
        { b: "D&O bei UG/GmbH", e: "Geschäftsführer haften persönlich für Pflichtverletzungen (§43 GmbHG). Insolvenzantragspflicht-Versäumnis, Steuerverkürzung, Verletzung von Sorgfaltspflichten → persönliche Haftung bis Privatvermögen. D&O schützt das, kostet 800-3.500 €/J." },
      ].map((g) => (
        <div key={g.b} className="rounded-xl bg-secondary/50 p-4">
          <dt className="mb-1 font-medium text-foreground">{g.b}</dt>
          <dd className="text-muted-foreground">{g.e}</dd>
        </div>
      ))}
    </dl>
  </details>
);

export default VersicherungsBasisCheck;
