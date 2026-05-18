import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Badge } from "@/components/ui/badge";
import {
  LABORE,
  USE_CASE_STACKS,
  PREIS_LISTE,
  AVOID_LIST,
  REGULATORIK_2026,
  type TestCategory,
  type Labor,
} from "@/data/laborAnbieter";
import {
  FlaskConical,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  ExternalLink,
  Lightbulb,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  EuroIcon,
} from "lucide-react";

const CATEGORY_META: Record<TestCategory, { label: string; emoji: string }> = {
  cosmetic: { label: "Kosmetik / CPSR", emoji: "🧴" },
  food: { label: "Lebensmittel", emoji: "🍎" },
  supplement: { label: "Supplement / NEM", emoji: "💊" },
  petfood: { label: "Pet-Food", emoji: "🐕" },
  rohs: { label: "RoHS", emoji: "⚡" },
  reach: { label: "REACH-SVHC", emoji: "🧪" },
  ce_emv: { label: "CE / EMV / Funk", emoji: "📡" },
  battery: { label: "Batterie (UN 38.3)", emoji: "🔋" },
  toys: { label: "Spielzeug EN 71", emoji: "🧸" },
  textile: { label: "Textil / OEKO-TEX", emoji: "👕" },
  packaging: { label: "Verpackung", emoji: "📦" },
  pfas: { label: "PFAS", emoji: "🚨" },
};

const TIER_META = {
  tier1: { label: "Tier-1 Generalist", color: "bg-purple-500/10 text-purple-700 border-purple-500/30" },
  spezialist: { label: "Spezialist", color: "bg-blue-500/10 text-blue-700 border-blue-500/30" },
  boutique: { label: "Boutique", color: "bg-amber-500/10 text-amber-700 border-amber-500/30" },
} as const;

const LaborVergleich = () => {
  const [activeCategory, setActiveCategory] = useState<TestCategory | "all">("all");
  const [activeUseCase, setActiveUseCase] = useState<string | null>(null);
  const [showAvoid, setShowAvoid] = useState(false);
  const [showRegulatorik, setShowRegulatorik] = useState(false);
  const [showPreisliste, setShowPreisliste] = useState(false);
  const [topPicksOnly, setTopPicksOnly] = useState(false);

  const filtered = useMemo(() => {
    return LABORE.filter((l) => {
      if (activeCategory !== "all" && !l.testCategories.includes(activeCategory)) return false;
      if (topPicksOnly && !l.topPick) return false;
      return true;
    });
  }, [activeCategory, topPicksOnly]);

  const categoryCounts = useMemo(() => {
    const counts: Record<TestCategory, number> = {
      cosmetic: 0, food: 0, supplement: 0, petfood: 0, rohs: 0, reach: 0,
      ce_emv: 0, battery: 0, toys: 0, textile: 0, packaging: 0, pfas: 0,
    };
    LABORE.forEach((l) => l.testCategories.forEach((c) => counts[c]++));
    return counts;
  }, []);

  const activeStack = useMemo(
    () => USE_CASE_STACKS.find((s) => s.id === activeUseCase),
    [activeUseCase],
  );

  const stackLabore = useMemo(() => {
    if (!activeStack) return [];
    return activeStack.stack.map((s) => ({
      ...s,
      labor: LABORE.find((l) => l.id === s.laborId)!,
    }));
  }, [activeStack]);

  return (
    <CockpitShell
      eyebrow="Labor-Anbieter · Stand Mai 2026"
      title="Labor-Vergleich für Brand-Founder"
      subtitle="21 akkreditierte Labore (DAkkS ISO 17025) für Kosmetik (CPSR/Mikrobio/Stabilität), Lebensmittel, Supplement, Pet-Food, Electronics (RoHS/REACH/CE/Funk/Batterie), Spielzeug (EN 71), Textil (OEKO-TEX), PFAS. Inkl. 6 Use-Case-Stacks mit Komplett-Kosten-Ballparks, Preisliste pro Test-Typ + AVOID-Block."
    >
      {/* ===== USE-CASE-STACKS ===== */}
      <div className="rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-5 w-5 text-emerald-700" />
          <h2 className="font-bold text-emerald-900">Use-Case-Stacks (Empfohlene Labor-Kombi pro Brand-Typ)</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {USE_CASE_STACKS.map((stack) => {
            const active = activeUseCase === stack.id;
            return (
              <button
                key={stack.id}
                onClick={() => setActiveUseCase(active ? null : stack.id)}
                className={`rounded-xl border-2 p-3 text-left transition-all ${
                  active
                    ? "border-emerald-500 bg-white shadow-md"
                    : "border-emerald-500/20 bg-white/60 hover:border-emerald-500/50"
                }`}
              >
                <div className="text-2xl mb-1">{stack.emoji}</div>
                <div className="font-bold text-xs leading-tight">{stack.title}</div>
                <div className="text-[10px] text-muted-foreground mt-1">{stack.kostenBallpark.split("·")[0]}</div>
              </button>
            );
          })}
        </div>

        {activeStack && (
          <div className="mt-4 rounded-xl border border-emerald-500/30 bg-white p-4">
            <div className="text-sm text-muted-foreground mb-2">{activeStack.description}</div>
            <div className="mb-3">
              <div className="text-xs font-semibold text-emerald-900 mb-1">Empfohlener Stack:</div>
              <ol className="space-y-1.5">
                {stackLabore.map(({ labor, rolle }, idx) => (
                  <li key={labor.id} className="text-sm flex gap-2">
                    <span className="font-mono text-xs text-emerald-700 shrink-0 mt-0.5">{idx + 1}.</span>
                    <div>
                      <span className="font-semibold">{labor.shortName}</span>
                      <span className="text-muted-foreground"> ({labor.city.split(",")[0]})</span>
                      <span className="text-foreground"> — {rolle}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-lg bg-emerald-500/10 p-3 mb-3">
              <div className="text-xs font-bold text-emerald-900 mb-0.5">Kosten-Ballpark:</div>
              <div className="text-sm font-bold text-emerald-800">{activeStack.kostenBallpark}</div>
            </div>
            <details className="rounded-lg border border-border p-2">
              <summary className="cursor-pointer text-xs font-semibold">
                Kostenstruktur-Breakdown ↓
              </summary>
              <table className="w-full text-xs mt-2">
                <thead>
                  <tr className="text-left text-muted-foreground border-b border-border">
                    <th className="py-1.5">Test</th>
                    <th className="py-1.5 text-right">Preis</th>
                  </tr>
                </thead>
                <tbody>
                  {activeStack.kostenBreakdown.map((row, idx) => (
                    <tr key={idx} className="border-b border-border/40">
                      <td className="py-1.5">{row.test}</td>
                      <td className="py-1.5 text-right font-mono">{row.preis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          </div>
        )}
      </div>

      {/* ===== KATEGORIE-FILTER ===== */}
      <div className="mb-3">
        <div className="text-xs font-semibold text-muted-foreground mb-2">Test-Kategorie filtern:</div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              activeCategory === "all"
                ? "bg-accent-blue text-primary-foreground"
                : "border border-border bg-card hover:bg-secondary"
            }`}
          >
            Alle ({LABORE.length})
          </button>
          {(Object.entries(CATEGORY_META) as [TestCategory, typeof CATEGORY_META[TestCategory]][]).map(
            ([key, meta]) => {
              const active = activeCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    active
                      ? "bg-accent-blue text-primary-foreground"
                      : "border border-border bg-card hover:bg-secondary"
                  }`}
                >
                  {meta.emoji} {meta.label} ({categoryCounts[key]})
                </button>
              );
            },
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <button
          onClick={() => setTopPicksOnly((v) => !v)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            topPicksOnly
              ? "bg-emerald-500 text-white"
              : "border border-border bg-card hover:bg-secondary"
          }`}
        >
          ★ Nur Top-Picks
        </button>
        <span className="text-xs text-muted-foreground ml-2">→ {filtered.length} Treffer</span>
      </div>

      {/* ===== LABOR-KARTEN-GRID ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        {filtered.length === 0 ? (
          <div className="md:col-span-2 rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
            Keine Labore in dieser Kategorie.
          </div>
        ) : (
          filtered.map((labor) => (
            <div
              key={labor.id}
              className={`rounded-2xl border p-4 ${
                labor.topPick ? "border-emerald-500/40 bg-emerald-500/5" : "border-border bg-card"
              }`}
            >
              <div className="flex items-start justify-between mb-2 gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base flex items-center gap-2">
                    <FlaskConical className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{labor.shortName}</span>
                    {labor.topPick && <span className="text-emerald-600 text-sm">★</span>}
                  </h3>
                  <div className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" /> {labor.city} · {labor.country}
                  </div>
                </div>
                <Badge variant="outline" className={`text-[10px] shrink-0 ${TIER_META[labor.tier].color}`}>
                  {TIER_META[labor.tier].label}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-1 mb-2">
                {labor.testCategories.map((cat) => (
                  <Badge
                    key={cat}
                    variant="outline"
                    className="text-[10px] text-muted-foreground border-border"
                  >
                    {CATEGORY_META[cat].emoji} {CATEGORY_META[cat].label}
                  </Badge>
                ))}
              </div>

              <div className="rounded-lg bg-secondary/40 p-2 mb-2 text-xs space-y-1">
                <div className="flex items-start gap-1.5">
                  <EuroIcon className="h-3 w-3 text-accent-blue shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Preise:</span> <span className="text-foreground">{labor.preise}</span>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <Clock className="h-3 w-3 text-accent-blue shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Lieferzeit:</span>{" "}
                    <span className="text-muted-foreground">{labor.lieferzeit}</span>
                  </div>
                </div>
              </div>

              <details className="mb-2">
                <summary className="cursor-pointer text-xs font-semibold text-accent-blue">
                  Akkreditierung + Specialties ↓
                </summary>
                <div className="mt-1.5 space-y-1 text-[11px]">
                  <div>
                    <span className="font-semibold">Akkreditierung:</span>{" "}
                    <span className="text-muted-foreground">{labor.accreditation.join(" · ")}</span>
                  </div>
                  <ul className="space-y-0.5">
                    {labor.specialties.map((s, i) => (
                      <li key={i} className="flex gap-1.5">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>

              <div className="text-xs mb-2">
                <span className="font-semibold text-foreground">Best für: </span>
                <span className="text-muted-foreground">{labor.bestFor.join(" · ")}</span>
              </div>

              {labor.watchouts.length > 0 && (
                <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-2 mb-2">
                  <div className="text-[10px] font-bold text-amber-900 flex items-center gap-1 mb-1">
                    <AlertTriangle className="h-3 w-3" /> WATCHOUTS
                  </div>
                  <ul className="space-y-0.5">
                    {labor.watchouts.map((w, i) => (
                      <li key={i} className="text-[11px] text-amber-900/80">
                        · {w}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t border-border pt-2">
                <span>{labor.bekanntheit}</span>
                <a
                  href={labor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-blue hover:underline flex items-center gap-1"
                >
                  Website <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ===== PREIS-LISTE ===== */}
      <div className="rounded-2xl border border-border bg-card p-4 mb-4">
        <button
          onClick={() => setShowPreisliste((v) => !v)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-2">
            <EuroIcon className="h-5 w-5 text-accent-blue" />
            <h2 className="font-bold">Preisliste pro Test-Typ (Marktmedian Mai 2026)</h2>
            <Badge variant="outline" className="text-[10px]">{PREIS_LISTE.length} Tests</Badge>
          </div>
          <span className="text-xs text-muted-foreground">{showPreisliste ? "▲" : "▼"}</span>
        </button>
        {showPreisliste && (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-muted-foreground border-b border-border">
                  <th className="py-2 pr-2">Test-Typ</th>
                  <th className="py-2 pr-2">Range</th>
                  <th className="py-2">Notiz</th>
                </tr>
              </thead>
              <tbody>
                {PREIS_LISTE.map((p, idx) => (
                  <tr key={idx} className="border-b border-border/40">
                    <td className="py-2 pr-2">
                      <span className="font-semibold">{p.testTyp}</span>
                      <Badge variant="outline" className="text-[9px] ml-2">
                        {CATEGORY_META[p.kategorie].emoji}
                      </Badge>
                    </td>
                    <td className="py-2 pr-2 font-mono text-emerald-700 whitespace-nowrap">{p.range}</td>
                    <td className="py-2 text-muted-foreground">{p.notiz}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ===== REGULATORIK 2026 ===== */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4 mb-4">
        <button
          onClick={() => setShowRegulatorik((v) => !v)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-accent-blue" />
            <h2 className="font-bold">Regulatorik 2026 — was Brands jetzt testen müssen</h2>
          </div>
          <span className="text-xs text-muted-foreground">{showRegulatorik ? "▲" : "▼"}</span>
        </button>
        {showRegulatorik && (
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
            {REGULATORIK_2026.map((r, idx) => (
              <div key={idx} className="rounded-xl bg-white p-3 border border-accent-blue/20">
                <div className="font-bold text-sm">{r.titel}</div>
                <div className="text-[11px] text-accent-blue font-mono mb-1">{r.datum}</div>
                <div className="text-xs text-foreground/80 mb-1">{r.was}</div>
                <div className="text-xs text-foreground font-semibold">
                  → {r.auswirkung}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== AVOID ===== */}
      <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4 mb-4">
        <button
          onClick={() => setShowAvoid((v) => !v)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-rose-700" />
            <h2 className="font-bold text-rose-900">AVOID-Liste / Watchouts</h2>
          </div>
          <span className="text-xs text-rose-700">{showAvoid ? "▲" : "▼"}</span>
        </button>
        {showAvoid && (
          <div className="mt-3 space-y-2">
            {AVOID_LIST.map((a, idx) => (
              <div key={idx} className="rounded-xl bg-white p-3 border border-rose-500/20">
                <div className="font-bold text-sm text-rose-900 mb-1">{a.name}</div>
                <div className="text-xs text-foreground/80">{a.warnung}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== HINWEIS ===== */}
      <div className="rounded-2xl border border-border bg-secondary/30 p-4 text-xs text-muted-foreground">
        <div className="flex items-start gap-2">
          <Lightbulb className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-foreground">Strategie-Tipp für Bootstrap-Founder:</span>{" "}
            BAV Institut + Dermatest + AGROLAB ist der beste DE-Boutique-Stack für Skincare oder Supplement.
            Tier-1 (Eurofins/SGS/Intertek) machen erst Sinn ab 10+ SKUs oder Multi-Markt-Launch.
            Preise sind Marktmedian — bei Volumen unbedingt verhandeln (10-30% Rabatt drin).
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

export default LaborVergleich;
