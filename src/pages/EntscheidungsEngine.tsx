import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, ExternalLink, AlertTriangle } from "lucide-react";

type Setup = {
  jahresGewinn?: number;
  reinvestPct?: number;
  /** Anzahl Gesellschafter / Co-Founder. */
  founders?: number;
  vcPlanned?: boolean;
  exitInYears?: number;
  /** Internationale Geschäftstätigkeit? */
  international?: "none" | "eu" | "global";
  /** Familien-Aspekte. */
  familyContext?: boolean;
  /** Vermögen über 5M (Stiftung sinnvoll)? */
  largeWealth?: boolean;
  /** Multi-Brand. */
  multiBrand?: boolean;
  /** Hoher IP-Wert. */
  hasIP?: boolean;
};

type Recommendation = {
  rank: number;
  title: string;
  emoji: string;
  why: string[];
  link: { label: string; to: string };
  caveat?: string;
};

function calculateRecommendations(s: Setup): Recommendation[] {
  const recs: Recommendation[] = [];
  const profit = s.jahresGewinn ?? 0;
  const reinvest = s.reinvestPct ?? 50;

  // ============ Einzelunternehmen (sehr klein) ============
  if (profit < 30000 && (s.founders ?? 1) === 1 && !s.vcPlanned) {
    recs.push({
      rank: 1,
      title: "Einzelunternehmen + Kleinunternehmer §19 UStG",
      emoji: "🚀",
      why: [
        "Gewinn < 30 k → KSt+GewSt-Setup (~30 %) zahlt sich nicht aus vs. niedriger ESt",
        "Kein Notar nötig, 20–60 € Gewerbeamt",
        "Keine Doppelbuchhaltung",
      ],
      link: { label: "Einzelunternehmen-Playbook", to: "/playbook/preview/einzelunternehmen-gruendung" },
      caveat: "Bei Wachstum > 50 k Gewinn: UG/GmbH erwägen (Haftung).",
    });
  }

  // ============ UG bei kleinem Gewinn + Wachstumsplanung ============
  if (profit >= 30000 && profit < 100000 && !s.vcPlanned && (s.founders ?? 1) <= 2) {
    recs.push({
      rank: recs.length + 1,
      title: "UG (haftungsbeschränkt) — Mini-GmbH",
      emoji: "🇩🇪",
      why: [
        `Gewinn ${profit.toLocaleString("de-DE")} € → noch zu klein für volle Holding (Setup 1.500-2.500 € amortisiert sich nicht)`,
        "1 € Stammkapital möglich (realistisch 500–5.000 €)",
        "Haftungsbeschränkung wie GmbH",
        "Bei Wachstum: später in GmbH umwandelbar (25 k Stammkapital aus thesaurierter Rücklage)",
      ],
      link: { label: "UG-Playbook", to: "/playbook/preview/ug-gruendung" },
    });
  }

  // ============ Standard-Holding bei mittlerem-höherem Gewinn ============
  if (profit >= 100000 && !s.vcPlanned && !s.multiBrand && !s.familyContext) {
    recs.push({
      rank: recs.length + 1,
      title: "Standard 2-Stufen-Holding (Privat → Holding-GmbH → Op-GmbH)",
      emoji: "🏛️",
      why: [
        `Gewinn ${profit.toLocaleString("de-DE")} € → Holding-Setup (~2 k) amortisiert sich`,
        `Reinvest ${reinvest} % → Schachtelprivileg (1,5 % statt 26 % AbgSt)`,
        `Bei Exit in ${s.exitInYears ?? "?"} Jahren: 5 % statt 25 % auf Verkaufserlös → bei 1 Mio Erlös 200 k € gespart`,
      ],
      link: { label: "Holding-Designer öffnen", to: "/cockpit/holding-designer" },
      caveat: "7-Jahres-Sperrfrist §22 UmwStG bei Anteilseinbringung beachten.",
    });
  }

  // ============ Familien-Pool wenn Familie + > 200k Gewinn ============
  if (s.familyContext && profit >= 200000 && !s.largeWealth) {
    recs.push({
      rank: recs.length + 1,
      title: "Familien-Pool-Holding (Eltern + Kinder als Gesellschafter)",
      emoji: "👨‍👩‍👧",
      why: [
        "Familien-Kontext + Gewinn > 200 k → Familien-Pool sinnvoll",
        "§13a ErbStG Verschonungsabschlag: bis 100 % Schenkungssteuer-Befreiung",
        "Kinder als Mit-Gesellschafter über Jahre aufbauen vor Erbgang",
      ],
      link: { label: "Familien-Pool im Holding-Designer", to: "/cockpit/holding-designer" },
      caveat: "7-Jahres-Behaltensfrist + 700 % Lohnsumme über 7 Jahre für Vollverschonung.",
    });
  }

  // ============ Familienstiftung wenn großes Vermögen ============
  if (s.largeWealth) {
    recs.push({
      rank: recs.length + 1,
      title: "Familienstiftung + Holding (Generationen-Vermögensschutz)",
      emoji: "🏛️",
      why: [
        "Vermögen > 5 Mio € + Generationen-Planung",
        "Pflichtteilsschutz, kein Scheidungs-Zugewinn, kein Privat-Pfänden",
        "Lebt ewig — auch nach Tod der Gründer",
      ],
      link: { label: "Familienstiftung im Holding-Designer", to: "/cockpit/holding-designer" },
      caveat: "Erbersatzsteuer alle 30 Jahre · Vermögen unwiderruflich übertragen · Setup-Aufwand 10–30 k €.",
    });
  }

  // ============ Doppel-Holding wenn VC ============
  if (s.vcPlanned) {
    recs.push({
      rank: recs.length + 1,
      title: "Doppel-Holding mit Investor (VC-optimiert)",
      emoji: "📈",
      why: [
        "VC-Runde geplant → Founder-Holding VOR Term-Sheet aufsetzen",
        "Bei Exit: Founder-Anteil über Holding mit 1,5 % besteuert statt 25 % privat",
        "Bei 10 Mio Founder-Exit: ~2,5 Mio € Steuer-Ersparnis pro Founder",
      ],
      link: { label: "VC-Doppel-Holding im Designer", to: "/cockpit/holding-designer" },
      caveat: "MUSS vor Term-Sheet aufgesetzt sein. 7-Jahres-Sperrfrist §22 UmwStG bei Einbringung bestehender GmbH-Anteile.",
    });
  }

  // ============ 3-Stufen-Holding bei Multi-Brand ============
  if (s.multiBrand) {
    recs.push({
      rank: recs.length + 1,
      title: "3-Stufen-Holding (Multi-Brand-Architektur)",
      emoji: "🏢",
      why: [
        "Multiple Brands / Geschäftsfelder → Risiko-Trennung pro Sub-Holding",
        "Selektiver Exit pro Brand möglich",
        "Investoren-Aufnahme nur in Sub-Bereich ohne Top-Holding zu öffnen",
      ],
      link: { label: "3-Stufen-Holding im Designer", to: "/cockpit/holding-designer" },
      caveat: "Komplexität skaliert linear (4–7 GmbHs zu führen). Ab Konzern-Pflicht (40 Mio Bilanz / 80 Mio Umsatz / 250 MA): Wirtschaftsprüfer Pflicht.",
    });
  }

  // ============ IP-Holding bei hohem IP-Wert ============
  if (s.hasIP) {
    recs.push({
      rank: recs.length + 1,
      title: "IP-/Patent-Holding (Marken/Software/Patente separat)",
      emoji: "💡",
      why: [
        "Hoher IP-Wert + Lizenz-Potenzial > 100 k €/Jahr",
        "IP getrennt halten → schützt vor Op-GmbH-Insolvenz",
        "Lizenzgebühren reduzieren Op-GmbH-Steuer-Last",
      ],
      link: { label: "IP-Holding im Designer", to: "/cockpit/holding-designer" },
      caveat: "Verrechnungspreis-Studie Pflicht (§1 AStG). Lizenzschranke §4j EStG bei Auslands-Holding.",
    });
  }

  // ============ EU-Alternativen ============
  if (s.international === "eu" || s.international === "global") {
    if (profit > 0 && profit < 200000 && reinvest > 70) {
      recs.push({
        rank: recs.length + 1,
        title: "Estland OÜ (0 % auf reinvestierte Gewinne)",
        emoji: "🇪🇪",
        why: [
          "Hoher Reinvest-Anteil + EU-Geschäft",
          "0 % Steuer auf thesaurierte Gewinne (Estland-Spezialität)",
          "Setup via e-Residency in 2-5 Tagen, ~600 € all-in",
        ],
        link: { label: "Estland OÜ Detail", to: "/cockpit/eu-alternativen" },
        caveat: "Bei DE-Wohnsitz: §AStG-Hinzurechnung möglich bei passiven Einkünften.",
      });
    }
    if (profit >= 200000) {
      recs.push({
        rank: recs.length + 1,
        title: "Niederlande BV (Innovation Box bei IP)",
        emoji: "🇳🇱",
        why: [
          "EU-Geschäft + > 200 k Gewinn",
          "Innovation Box: 9 % auf Patent-Einkünfte (statt 25,8 %)",
          "Participation Exemption: 100 % Beteiligungs-Befreiung (besser als DE 95 %)",
        ],
        link: { label: "Niederlande BV Detail", to: "/cockpit/eu-alternativen" },
        caveat: "Substance-Test seit 2024 verschärft (ATAD III). Echte NL-Substanz nötig.",
      });
    }
    if (s.international === "global" && profit >= 100000) {
      recs.push({
        rank: recs.length + 1,
        title: "US-LLC (für US-/Global-Geschäft)",
        emoji: "🇺🇸",
        why: [
          "Globales Geschäft + USA-Fokus",
          "Wyoming/New Mexico LLC ab 50 $ Filing",
          "Bei Single-Member: Disregarded Entity (US-Steuer transparent)",
        ],
        link: { label: "US-LLC-Playbook", to: "/playbook/preview/us-llc" },
        caveat: "Form 5472+1120 Pflicht (25 k $ Strafe bei Versäumnis). DE-Wohnsitz: DBA-Anrechnung.",
      });
    }
  }

  // Wenn keine Empfehlung möglich
  if (recs.length === 0) {
    recs.push({
      rank: 1,
      title: "Mehr Daten erfassen",
      emoji: "🤔",
      why: ["Zu wenig Antworten für Empfehlung", "Bitte alle Felder ausfüllen"],
      link: { label: "Rechtsform-Wizard", to: "/wizard/rechtsform" },
    });
  }

  return recs.slice(0, 4); // Top 4
}

const EntscheidungsEngine = () => {
  const [setup, setSetup] = useState<Setup>({});
  const [step, setStep] = useState(1);
  const update = (patch: Partial<Setup>) => setSetup({ ...setup, ...patch });
  const recs = useMemo(() => calculateRecommendations(setup), [setup]);

  return (
    <CockpitShell
      eyebrow="Entscheidungs-Engine"
      title="Welche Struktur passt zu dir?"
      subtitle="6-Fragen-Wizard quer über alle Strukturen: Einzel · UG · GmbH · 2-Stufen-Holding · Multi-Brand · Familien-Pool · Stiftung · VC-Doppel · IP-Holding · EU-Alternativen · US-LLC. Output: Top-4-Empfehlungen mit konkreter Begründung + Direkt-Links."
    >
      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3, 4, 5, 6, 7].map((s) => (
          <div key={s} className="flex items-center gap-1.5 flex-1">
            <div
              className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                s < step
                  ? "bg-emerald-500 text-white"
                  : s === step
                  ? "bg-accent-blue text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {s < step ? <CheckCircle2 className="h-3 w-3" /> : s}
            </div>
            {s < 7 && <div className={`h-0.5 flex-1 ${s < step ? "bg-emerald-500" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        {step === 1 && (
          <>
            <h2 className="text-base font-bold mb-1">1. Erwarteter Jahres-Gewinn?</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Operativer Gewinn vor Steuer (oder geplant in 12 Monaten).
            </p>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">€ pro Jahr</Label>
            <Input
              type="number"
              value={setup.jahresGewinn ?? ""}
              onChange={(e) => update({ jahresGewinn: Number(e.target.value) || undefined })}
              placeholder="z.B. 250000"
              className="mt-1"
              autoFocus
            />
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-base font-bold mb-1">2. Wieviel reinvestieren vs. privat entnehmen?</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Hoher Reinvest-Anteil → Holding lohnt mehr (Schachtelprivileg).
            </p>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Reinvest in % (0-100)</Label>
            <Input
              type="number"
              min={0}
              max={100}
              value={setup.reinvestPct ?? ""}
              onChange={(e) => update({ reinvestPct: Number(e.target.value) || undefined })}
              placeholder="z.B. 50"
              className="mt-1"
            />
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-base font-bold mb-1">3. Anzahl Gründer / Gesellschafter?</h2>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => update({ founders: n })}
                  className={`text-center rounded-xl border p-3 text-sm transition-colors ${
                    setup.founders === n
                      ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                      : "border-border hover:border-accent-blue/40"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-base font-bold mb-1">4. VC / Investor in den nächsten 12 Monaten?</h2>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {[
                { v: true, l: "Ja, VC/Angel/Strategisch geplant" },
                { v: false, l: "Nein, Bootstrap" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => update({ vcPlanned: o.v })}
                  className={`text-left rounded-xl border p-3 text-sm transition-colors ${
                    setup.vcPlanned === o.v
                      ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                      : "border-border hover:border-accent-blue/40"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
            {setup.vcPlanned !== undefined && (
              <div className="mt-4">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Geplanter Exit-Horizont (Jahre)</Label>
                <Input
                  type="number"
                  min={0}
                  max={30}
                  value={setup.exitInYears ?? ""}
                  onChange={(e) => update({ exitInYears: Number(e.target.value) || undefined })}
                  placeholder="z.B. 5 (oder 0 falls nie)"
                  className="mt-1"
                />
              </div>
            )}
          </>
        )}

        {step === 5 && (
          <>
            <h2 className="text-base font-bold mb-1">5. Internationale Geschäftstätigkeit?</h2>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[
                { v: "none", l: "Nur DACH" },
                { v: "eu", l: "EU-weit" },
                { v: "global", l: "Global (inkl. USA/Asia)" },
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => update({ international: o.v as Setup["international"] })}
                  className={`text-center rounded-xl border p-3 text-sm transition-colors ${
                    setup.international === o.v
                      ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                      : "border-border hover:border-accent-blue/40"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 6 && (
          <>
            <h2 className="text-base font-bold mb-1">6. Familie / Multi-Brand / IP?</h2>
            <p className="text-xs text-muted-foreground mb-3">Ankreuzen was zutrifft (mehrere möglich).</p>
            <div className="space-y-2">
              {[
                { k: "familyContext", l: "Familien-Kontext (Erbplanung, Pool mit Kindern)" },
                { k: "largeWealth", l: "Vermögen > 5 Mio € (Stiftung-relevant)" },
                { k: "multiBrand", l: "Mehrere Brands / Geschäftsfelder" },
                { k: "hasIP", l: "Hoher IP-Wert (Marken, Patente, Software-Lizenzen)" },
              ].map((o) => (
                <button
                  key={o.k}
                  onClick={() => update({ [o.k]: !setup[o.k as keyof Setup] } as Partial<Setup>)}
                  className={`w-full text-left rounded-xl border p-3 text-sm transition-colors flex items-center gap-3 ${
                    setup[o.k as keyof Setup]
                      ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                      : "border-border hover:border-accent-blue/40"
                  }`}
                >
                  <div className={`h-5 w-5 rounded border ${setup[o.k as keyof Setup] ? "bg-accent-blue border-accent-blue" : "border-border"} flex items-center justify-center shrink-0`}>
                    {setup[o.k as keyof Setup] && <CheckCircle2 className="h-3 w-3 text-primary-foreground" />}
                  </div>
                  {o.l}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 7 && (
          <>
            <h2 className="text-base font-bold mb-1">Empfehlung</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Basierend auf deinen Antworten — Top-{recs.length} passende Strukturen:
            </p>
            <div className="space-y-3">
              {recs.map((r, i) => (
                <Link
                  key={i}
                  to={r.link.to}
                  className="block rounded-xl border border-accent-blue/30 bg-accent-blue/5 hover:bg-accent-blue/10 p-4 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="rounded-full bg-accent-blue text-primary-foreground px-2 py-0.5 text-[10px] font-bold">
                          #{i + 1}
                        </span>
                        <span className="text-2xl">{r.emoji}</span>
                        <span className="font-bold">{r.title}</span>
                      </div>
                      <ul className="space-y-1 text-xs">
                        {r.why.map((w, j) => (
                          <li key={j} className="flex items-start gap-1.5">
                            <span className="text-accent-blue shrink-0">→</span>
                            <span className="text-muted-foreground">{w}</span>
                          </li>
                        ))}
                      </ul>
                      {r.caveat && (
                        <div className="mt-2 rounded-lg bg-amber-500/10 border border-amber-500/20 p-2 text-[11px] text-amber-800">
                          <AlertTriangle className="h-3 w-3 inline mr-1" /> {r.caveat}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-accent-blue text-xs font-semibold shrink-0">
                      {r.link.label} <ExternalLink className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Zurück
          </button>
          {step < 7 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90"
            >
              Weiter <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                setStep(1);
                setSetup({});
              }}
              className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary"
            >
              <Sparkles className="h-4 w-4" /> Nochmal mit anderen Daten
            </button>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 mt-6 text-[11px] text-muted-foreground leading-relaxed">
        <strong>Disclaimer:</strong> Empfehlungen sind Heuristiken — keine Steuerberatung. Konkrete Strukturierung
        immer mit Steuerberater + Fachanwalt klären. Stand: Mai 2026.
      </div>
    </CockpitShell>
  );
};

export default EntscheidungsEngine;
