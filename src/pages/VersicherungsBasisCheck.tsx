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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Lightbulb,
  Shield,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Award,
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
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      try { return { ...defaultSetup, ...JSON.parse(saved) }; } catch { return defaultSetup; }
    }
    return defaultSetup;
  });

  const updateSetup = <K extends keyof VersicherungsSetup>(field: K, val: VersicherungsSetup[K]) => {
    const next = { ...setup, [field]: val };
    setSetup(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
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

  return (
    <CockpitShell
      eyebrow="🌱 Erste Schritte · für komplette Anfänger:innen"
      title="Versicherungs-Basis-Check Solo"
      subtitle="Welche Versicherungen brauchst du WIRKLICH? 7-Frage-Setup → priorisierte Empfehlungen aus 11 Versicherungs-Typen mit Schadenbeispielen, Beitrags-Schätzung und Worauf-Achten-Liste. Kein Versicherungs-Verkauf — neutrale Orientierung."
    >
      <BeginnerHero />

      {/* === Setup === */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-4">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Shield className="h-4 w-4 text-accent-blue" /> Setup — 7 Fragen
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Berufsbild *</Label>
            <select value={setup.berufsbild} onChange={(e) => updateSetup("berufsbild", e.target.value as Berufsbild)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              {Object.entries(BERUFSBILD_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-xs">Rechtsform</Label>
            <select value={setup.rechtsform} onChange={(e) => updateSetup("rechtsform", e.target.value as Rechtsform)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="einzel-freiberuf">Freiberuf (Einzelunternehmen)</option>
              <option value="einzel-gewerbe">Einzel-Gewerbe</option>
              <option value="gbr">GbR</option>
              <option value="ug-gmbh">UG / GmbH</option>
            </select>
          </div>
          <div>
            <Label className="text-xs">Voraussichtlicher Jahres-Umsatz (€)</Label>
            <Input type="number" value={setup.jahresUmsatz} onChange={(e) => updateSetup("jahresUmsatz", Math.max(0, Number(e.target.value) || 0))} className="h-9 mt-1" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Situation</Label>
            <label className="flex items-center gap-2 text-xs cursor-pointer rounded-lg border border-border p-2">
              <input type="checkbox" checked={setup.mitarbeiter} onChange={(e) => updateSetup("mitarbeiter", e.target.checked)} className="h-4 w-4" />
              <span>Mitarbeiter / Praktikant / Minijob</span>
            </label>
            <label className="flex items-center gap-2 text-xs cursor-pointer rounded-lg border border-border p-2">
              <input type="checkbox" checked={setup.eigenesBuero} onChange={(e) => updateSetup("eigenesBuero", e.target.checked)} className="h-4 w-4" />
              <span>Eigenes Büro / Lager mit Inventar &gt; 5k €</span>
            </label>
            <label className="flex items-center gap-2 text-xs cursor-pointer rounded-lg border border-border p-2">
              <input type="checkbox" checked={setup.onlineDatenverarbeitung} onChange={(e) => updateSetup("onlineDatenverarbeitung", e.target.checked)} className="h-4 w-4" />
              <span>Online-Geschäft / Kundendaten verarbeitend</span>
            </label>
            <label className="flex items-center gap-2 text-xs cursor-pointer rounded-lg border border-border p-2">
              <input type="checkbox" checked={setup.eigeneProdukte} onChange={(e) => updateSetup("eigeneProdukte", e.target.checked)} className="h-4 w-4" />
              <span>Eigene Produkte / Eigenmarke (verkauft, nicht nur Dienstleistung)</span>
            </label>
          </div>
        </div>
      </div>

      {/* === Kosten-Hero === */}
      <div className="rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-card to-card p-5 mb-4">
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
          Geschätzte Jahreskosten für PFLICHT + DRINGEND ({kostenSchaetzung.anzahl} Versicherungen)
        </div>
        <div className="flex items-baseline gap-3 flex-wrap mb-2">
          <div className="text-4xl font-bold text-emerald-700">
            {kostenSchaetzung.mittel.toLocaleString("de-DE")} €
          </div>
          <div className="text-sm text-muted-foreground">
            Spanne: {kostenSchaetzung.min.toLocaleString("de-DE")} – {kostenSchaetzung.max.toLocaleString("de-DE")} €/Jahr
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          Pro Monat: ~{Math.round(kostenSchaetzung.mittel / 12).toLocaleString("de-DE")} €
          {" · "}Schätzwerte für Solo-Selbstständige bei mittlerem Risiko-Profil.
        </div>
      </div>

      {/* === Empfehlungs-Liste === */}
      <div className="space-y-3 mb-6">
        {empfehlungen.filter((e) => e.priorityResult !== "nicht-noetig").map((v) => (
          <VersicherungsCard
            key={v.id}
            versicherung={v}
            prioritaet={v.priorityResult}
            pflichtGrund={v.pflichtGrund}
          />
        ))}
      </div>

      {/* === Nicht nötig === */}
      {empfehlungen.some((e) => e.priorityResult === "nicht-noetig") && (
        <details className="rounded-2xl border border-border bg-card p-4 mb-6">
          <summary className="cursor-pointer font-bold text-sm flex items-center gap-2">
            <ChevronDown className="h-4 w-4" />
            Versicherungen die du laut deinem Setup NICHT brauchst ({empfehlungen.filter((e) => e.priorityResult === "nicht-noetig").length})
          </summary>
          <div className="mt-3 space-y-2">
            {empfehlungen.filter((e) => e.priorityResult === "nicht-noetig").map((v) => (
              <div key={v.id} className="rounded-lg bg-secondary/20 p-3 text-xs">
                <div className="font-semibold text-muted-foreground">{v.name}</div>
                <div className="text-muted-foreground mt-0.5">{v.beschreibung}</div>
              </div>
            ))}
          </div>
        </details>
      )}

      {/* === Cross-Links === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
        <Link to="/cockpit/kv-optimizer" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">KV-Optimizer →</div>
          <div className="text-muted-foreground">Krankenversicherung im Detail</div>
        </Link>
        <Link to="/cockpit/erste-schritte-roadmap" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">Erste-Schritte-Roadmap (Tool 11) →</div>
          <div className="text-muted-foreground">Wann welche Versicherung?</div>
        </Link>
        <Link to="/cockpit/pension-optimizer" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">Pension-Optimizer →</div>
          <div className="text-muted-foreground">Altersvorsorge ergänzen</div>
        </Link>
      </div>

      <Glossar />
      <Stand2026Footer
        sources={[
          { label: "BaFin Versicherungs-Aufsicht", url: "https://www.bafin.de" },
          { label: "GDV Versicherer-Verband", url: "https://www.gdv.de" },
          { label: "§51 BRAO (Anwalt-BHV)", url: "https://www.gesetze-im-internet.de/brao/__51.html" },
          { label: "§193 VVG (KV-Pflicht)", url: "https://www.gesetze-im-internet.de/vvg_2008/__193.html" },
        ]}
        note="Beitrags-Ranges sind 2025/2026-Markt-Durchschnitte für Solo bei mittlerem Risiko. Bei Hochrisiko-Tätigkeiten (USA-Geschäft, Health-Tech, Hochleistungs-Sport, Architekt) deutlich höher. Tool ist NEUTRALE Orientierung — kein Versicherungs-Verkauf. Vor Abschluss: Makler-Beratung empfohlen wegen Detail-Komplexität (Klauseln, Ausschlüsse, Selbstbehalt). Mein Tipp: 2-3 Angebote einholen + Bedingungen vergleichen, nicht nur Preis."
      />
    </CockpitShell>
  );
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
    <div className={`rounded-xl border-2 ${c.border} bg-card p-4 transition`}>
      <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${c.bg} ${c.text} border ${c.border}`}>
              {c.label}
            </span>
            <span className="text-[10px] uppercase font-mono text-muted-foreground">{v.kuerzel}</span>
          </div>
          <h3 className="font-bold text-base">{v.name}</h3>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase text-muted-foreground">Beitrag/Jahr (mittel)</div>
          <div className="text-lg font-bold font-mono text-emerald-700">
            {v.beitragRange.mittel.toLocaleString("de-DE")} €
          </div>
          <div className="text-[10px] text-muted-foreground font-mono">
            {v.beitragRange.min.toLocaleString("de-DE")} – {v.beitragRange.max.toLocaleString("de-DE")} €
          </div>
        </div>
      </div>

      {pflichtGrund && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-2 text-xs flex items-start gap-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-red-700 shrink-0 mt-0.5" />
          <div><strong className="text-red-700">Pflicht-Begründung:</strong> {pflichtGrund}</div>
        </div>
      )}

      <p className="text-xs text-muted-foreground mb-2">{v.beschreibung}</p>

      <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-2 text-xs mb-2">
        <strong className="text-amber-700">🎯 Beispiel-Schadensfall:</strong>
        <div className="text-muted-foreground mt-0.5">{v.schadenbeispiel}</div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-[11px] text-accent-blue hover:underline mt-1"
      >
        {expanded ? "weniger anzeigen ▲" : "mehr Details ▼"}
      </button>

      {expanded && (
        <div className="mt-3 space-y-3 text-xs">
          <div>
            <div className="font-semibold mb-1">📋 Empfohlene Deckungssumme</div>
            <div className="text-muted-foreground">{v.deckungssumme}</div>
          </div>
          <div>
            <div className="font-semibold mb-1">⚠️ Worauf achten</div>
            <ul className="space-y-1 text-muted-foreground">
              {v.worauf_achten.map((w, i) => (
                <li key={i} className="flex items-start gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-1">🏢 Anbieter-Hinweise (nur Orientierung, keine Empfehlung)</div>
            <ul className="space-y-0.5 text-muted-foreground">
              {v.anbieter_hinweise.map((a, i) => <li key={i}>• {a}</li>)}
            </ul>
          </div>
        </div>
      )}
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
        <h3 className="font-bold text-sm mb-1">Welche Versicherungen brauchst du als Solo-Selbstständige:r?</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-2">
          Versicherungsmakler verkaufen oft zu viel. Diese Tool gibt eine NEUTRALE Orientierung: aus 11 Typen
          werden nur die wirklich nötigen empfohlen. 4 Pflicht-Stufen sortiert. Mit Schadenbeispielen,
          Beitrags-Schätzung und Hinweisen worauf bei den Bedingungen zu achten ist.
        </p>
        <div className="flex flex-wrap gap-2 text-[11px]">
          <span className="rounded-lg bg-red-500/5 px-2 py-1 border border-red-500/20"><strong className="text-red-700">PFLICHT</strong> = rechtlich vorgeschrieben</span>
          <span className="rounded-lg bg-amber-500/5 px-2 py-1 border border-amber-500/20"><strong className="text-amber-700">DRINGEND</strong> = ohne = existenzbedrohend</span>
          <span className="rounded-lg bg-blue-500/5 px-2 py-1 border border-blue-500/20"><strong className="text-blue-700">SINNVOLL</strong> = je nach Risiko-Profil</span>
          <span className="rounded-lg bg-secondary/40 px-2 py-1 border border-border"><strong>OPTIONAL</strong> = nur bei spezifischem Bedarf</span>
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
        { b: "Berufshaftpflicht (BHV) vs Privathaftpflicht (PHV)", e: "Zwei VERSCHIEDENE Versicherungen! BHV deckt berufliche Schäden (Kunde-Schaden durch deine Arbeit), PHV private Schäden (privat verursachte Schäden). Beide sind nötig — PHV ist Basis, BHV beruflich obendrauf. PHV ist KEIN Ersatz für BHV." },
        { b: "Deckungssumme vs Versicherungssumme", e: "Deckungssumme = max. Auszahlung pro Schadensfall. Versicherungssumme = max. pro Jahr (kann mehrere Schäden bündeln). Bei Personen-Schäden Mindest 5-10 Mio €, bei Sach 1-3 Mio. Klein-Wahl spart 10-30 % Beitrag, aber Risiko-Lücke!" },
        { b: "Selbstbehalt", e: "Was du im Schadensfall SELBST zahlst, bevor Versicherung übernimmt. 150-500 € üblich. Höherer SB = günstigerer Beitrag (typisch 10-20 % Ersparnis bei 500 € statt 0 €)." },
        { b: "Pauschaldeckung vs Einzeldeckung", e: "Pauschal = eine Summe für ALLE Schadensarten (z.B. 1 Mio gesamt). Einzel = pro Art aufgeteilt (z.B. 1 Mio Person + 500k Sach + 100k Vermögen). PAUSCHAL ist besser — keine Lücken." },
        { b: "Konkrete vs abstrakte Verweisung (BU)", e: "Bei BU: Konkrete Verweisung = nur auf konkreten, gleichwertigen Job; Abstrakte = auf jeden 'theoretisch zumutbaren'. Du willst KEINE abstrakte Verweisung — sonst muss man umlernen, statt BU zu kassieren. Faustregel: Verzicht auf abstrakte Verweisung MUSS im Vertrag stehen." },
        { b: "Karenzzeit (Krankentagegeld)", e: "Anzahl Tage bis Auszahlung beginnt. 22 Tage = Standard für PKV-User, 43 Tage = Standard für GKV-Krankengeld-Wahltarif (TK Tarif WAH). Kurze Karenz = teurer." },
        { b: "Vermögensschaden vs Personen-/Sachschaden", e: "Personen-Schaden = jemand verletzt. Sach-Schaden = etwas kaputt. Vermögens-Schaden = reiner Geldverlust ohne körperliches Schadensereignis (z.B. Fehl-Beratung). Klassische BHV deckt Personen+Sach, REINE Vermögensschäden braucht VSH-Modul." },
        { b: "D&O bei UG/GmbH", e: "Geschäftsführer haften persönlich für Pflichtverletzungen (§43 GmbHG). Insolvenzantragspflicht-Versäumnis, Steuerverkürzung, Verletzung von Sorgfaltspflichten → persönliche Haftung bis Privatvermögen. D&O schützt das, kostet 800-3.500 €/J." },
      ].map((g) => (
        <div key={g.b} className="rounded-lg bg-secondary/30 p-3">
          <div className="font-semibold text-foreground mb-1">{g.b}</div>
          <div className="text-muted-foreground">{g.e}</div>
        </div>
      ))}
    </div>
  </details>
);

export default VersicherungsBasisCheck;
