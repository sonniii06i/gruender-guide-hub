import { useMemo, useState, type ElementType, type ReactNode } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Callout, EmptyState, KitTable, ToneBadge, ToolSection, type Tone } from "@/components/cockpit/kit";
import { cn } from "@/lib/utils";
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
  ChevronDown,
  Layers,
  Star,
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
  medical_device: { label: "Medizinprodukte (MDR)", emoji: "🩺" },
  psa: { label: "PSA / Workwear", emoji: "🦺" },
};

const TIER_META: Record<Labor["tier"], { label: string; tone: Tone }> = {
  tier1: { label: "Tier-1 Generalist", tone: "accent" },
  spezialist: { label: "Spezialist", tone: "info" },
  boutique: { label: "Boutique", tone: "neutral" },
};

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
      medical_device: 0, psa: 0,
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
      subtitle={`${LABORE.length} etablierte Labore (DAkkS ISO 17025, alle mit nachweisbarer Historie, ältestes seit 1828) für 14 Test-Kategorien von Kosmetik über Elektronik bis Medizinprodukte. Dazu ${USE_CASE_STACKS.length} Use-Case-Stacks mit Kosten-Ballparks, eine Preisliste mit ${PREIS_LISTE.length} Einträgen und eine AVOID-Liste.`}
    >
      {/* ===== USE-CASE-STACKS ===== */}
      <ToolSection
        title="Use-Case-Stacks"
        description="Empfohlene Labor-Kombination je Brand-Typ. Wähle deinen Typ für Stack und Kosten."
        icon={Sparkles}
        className="mb-6"
      >
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {USE_CASE_STACKS.map((stack) => {
            const active = activeUseCase === stack.id;
            return (
              <button
                key={stack.id}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveUseCase(active ? null : stack.id)}
                className={cn(
                  "rounded-xl border p-3.5 text-left transition-[background-color,border-color,box-shadow] duration-200 active:translate-y-px",
                  active
                    ? "border-accent-blue bg-accent shadow-[0_0_0_1px_hsl(var(--accent-blue)/0.35)]"
                    : "border-border bg-card hover:border-foreground/25",
                )}
              >
                <div className="text-sm font-semibold leading-snug">{stack.title}</div>
                <div className="mt-1.5 text-xs text-muted-foreground tabular">{stack.kostenBallpark.split("·")[0]}</div>
              </button>
            );
          })}
        </div>

        {activeStack && (
          <div className="mt-5 grid gap-4 rounded-xl border border-border bg-secondary/30 p-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:p-5">
            <div>
              <p className="text-sm text-muted-foreground">{activeStack.description}</p>
              <p className="mb-2 mt-4 text-sm font-semibold">Empfohlener Stack</p>
              <ol className="space-y-2">
                {stackLabore.map(({ labor, rolle }, idx) => (
                  <li key={labor.id} className="flex gap-3 text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-blue tabular">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <span className="font-semibold">{labor.shortName}</span>
                      <span className="text-muted-foreground"> ({labor.city.split(",")[0]})</span>
                      <span className="block text-foreground/80">{rolle}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl bg-ink p-4 text-primary-foreground">
                <p className="text-sm font-medium text-brand-green-glow">Kosten-Ballpark</p>
                <p className="mt-1 text-lg font-semibold leading-snug tabular">{activeStack.kostenBallpark}</p>
              </div>
              <details className="group rounded-xl border border-border bg-card [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-semibold">
                  Kostenstruktur im Detail
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="border-t border-border/70 px-4 pb-1">
                  {activeStack.kostenBreakdown.map((row, idx) => (
                    <div key={idx} className="flex items-baseline justify-between gap-4 border-b border-border/50 py-2 text-sm last:border-0">
                      <span className="text-foreground/85">{row.test}</span>
                      <span className="shrink-0 font-medium tabular">{row.preis}</span>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          </div>
        )}
      </ToolSection>

      {/* ===== KATEGORIE-FILTER ===== */}
      <ToolSection title="Labore filtern" icon={FlaskConical} className="mb-6" bodyClassName="space-y-4 p-5 md:p-6">
        <div>
          <p className="mb-2 text-sm font-medium">Test-Kategorie</p>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Test-Kategorie">
            <FilterChip active={activeCategory === "all"} onClick={() => setActiveCategory("all")} count={LABORE.length}>
              Alle
            </FilterChip>
            {(Object.entries(CATEGORY_META) as [TestCategory, typeof CATEGORY_META[TestCategory]][]).map(([key, meta]) => (
              <FilterChip key={key} active={activeCategory === key} onClick={() => setActiveCategory(key)} count={categoryCounts[key]}>
                {meta.label}
              </FilterChip>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 border-t border-border/70 pt-4">
          <button
            type="button"
            aria-pressed={topPicksOnly}
            onClick={() => setTopPicksOnly((v) => !v)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
              topPicksOnly ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-foreground/25",
            )}
          >
            <Star className={cn("h-3.5 w-3.5", topPicksOnly && "fill-current")} aria-hidden="true" /> Nur Top-Picks
          </button>
          <span className="text-sm text-muted-foreground tabular" aria-live="polite">
            {filtered.length} Treffer
          </span>
        </div>
      </ToolSection>

      {/* ===== LABOR-KARTEN-GRID ===== */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.length === 0 ? (
          <EmptyState
            icon={FlaskConical}
            className="md:col-span-2"
            title="Keine Labore in dieser Kategorie"
            description="Wähle eine andere Test-Kategorie oder blende auch Labore ohne Top-Pick ein."
          />
        ) : (
          filtered.map((labor) => <LaborKarte key={labor.id} labor={labor} />)
        )}
      </div>

      {/* ===== PREIS-LISTE ===== */}
      <Klappsektion
        offen={showPreisliste}
        onToggle={() => setShowPreisliste((v) => !v)}
        icon={EuroIcon}
        titel="Preisliste pro Test-Typ (Marktmedian Mai 2026)"
        zusatz={<ToneBadge tone="neutral">{PREIS_LISTE.length} Tests</ToneBadge>}
      >
        <KitTable caption="Preisliste pro Test-Typ">
          <thead>
            <tr>
              <th>Test-Typ</th>
              <th>Kategorie</th>
              <th>Range</th>
              <th>Notiz</th>
            </tr>
          </thead>
          <tbody>
            {PREIS_LISTE.map((p, idx) => (
              <tr key={idx}>
                <td className="min-w-44 font-medium">{p.testTyp}</td>
                <td className="whitespace-nowrap text-muted-foreground">{CATEGORY_META[p.kategorie].label}</td>
                <td className="whitespace-nowrap font-medium">{p.range}</td>
                <td className="min-w-56 text-muted-foreground">{p.notiz}</td>
              </tr>
            ))}
          </tbody>
        </KitTable>
      </Klappsektion>

      {/* ===== REGULATORIK 2026 ===== */}
      <Klappsektion
        offen={showRegulatorik}
        onToggle={() => setShowRegulatorik((v) => !v)}
        icon={Calendar}
        titel="Regulatorik 2026: was Brands jetzt testen müssen"
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {REGULATORIK_2026.map((r, idx) => (
            <div key={idx} className="rounded-xl border border-border bg-secondary/30 p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="text-sm font-semibold">{r.titel}</p>
                <ToneBadge tone="accent">{r.datum}</ToneBadge>
              </div>
              <p className="mt-1.5 text-sm text-foreground/80">{r.was}</p>
              <p className="mt-2 text-sm font-medium">→ {r.auswirkung}</p>
            </div>
          ))}
        </div>
      </Klappsektion>

      {/* ===== AVOID ===== */}
      <Klappsektion
        offen={showAvoid}
        onToggle={() => setShowAvoid((v) => !v)}
        icon={ShieldAlert}
        tone="danger"
        titel="AVOID-Liste und Watchouts"
      >
        <div className="space-y-2">
          {AVOID_LIST.map((a, idx) => (
            <div key={idx} className="rounded-xl border border-danger/20 bg-danger-soft p-3.5">
              <p className="text-sm font-semibold text-danger">{a.name}</p>
              <p className="mt-1 text-sm text-foreground/80">{a.warnung}</p>
            </div>
          ))}
        </div>
      </Klappsektion>

      {/* ===== HINWEIS ===== */}
      <Callout tone="info" icon={Lightbulb} title="Strategie-Tipp für Bootstrap-Founder" className="mt-6">
        BAV Institut + Dermatest + AGROLAB ist der beste DE-Boutique-Stack für Skincare oder Supplement.
        Tier-1 (Eurofins/SGS/Intertek) machen erst Sinn ab 10+ SKUs oder Multi-Markt-Launch.
        Preise sind Marktmedian — bei Volumen unbedingt verhandeln (10-30% Rabatt drin).
      </Callout>
    </CockpitShell>
  );
};

/* ------------------------------------------------------------------ Darstellung */

const FilterChip = ({
  active,
  onClick,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  count: number;
  children: ReactNode;
}) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={cn(
      "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm font-medium transition-colors",
      active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground/80 hover:border-foreground/25 hover:text-foreground",
    )}
  >
    {children}
    <span className={cn("text-xs tabular", active ? "text-primary-foreground/70" : "text-muted-foreground")}>{count}</span>
  </button>
);

const LaborKarte = ({ labor }: { labor: Labor }) => (
  <article
    className={cn(
      "flex flex-col rounded-2xl border bg-card p-5 shadow-card",
      labor.topPick ? "border-success/35" : "border-border",
    )}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <h3 className="flex items-center gap-2 text-base font-semibold">
          <span className="truncate">{labor.shortName}</span>
          {labor.topPick && (
            <ToneBadge tone="success" className="shrink-0">
              <Star className="h-3 w-3 fill-current" aria-hidden="true" /> Top-Pick
            </ToneBadge>
          )}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {labor.city} · {labor.country}
        </p>
        {labor.establishedSince && (
          <p className="mt-0.5 text-xs text-muted-foreground">Etabliert seit {labor.establishedSince}</p>
        )}
      </div>
      <ToneBadge tone={TIER_META[labor.tier].tone} className="shrink-0">
        {TIER_META[labor.tier].label}
      </ToneBadge>
    </div>

    <div className="mt-3 flex flex-wrap gap-1">
      {labor.testCategories.map((cat) => (
        <span key={cat} className="rounded-md bg-secondary px-1.5 py-0.5 text-xs text-foreground/75">
          {CATEGORY_META[cat].label}
        </span>
      ))}
    </div>

    <dl className="mt-3 space-y-1.5 rounded-xl bg-secondary/50 p-3 text-sm">
      <div className="flex items-start gap-2">
        <EuroIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-blue" aria-hidden="true" />
        <div>
          <dt className="inline font-medium">Preise:</dt> <dd className="inline text-foreground/85">{labor.preise}</dd>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-blue" aria-hidden="true" />
        <div>
          <dt className="inline font-medium">Lieferzeit:</dt> <dd className="inline text-muted-foreground">{labor.lieferzeit}</dd>
        </div>
      </div>
    </dl>

    <p className="mt-3 text-sm">
      <span className="font-medium">Best für: </span>
      <span className="text-muted-foreground">{labor.bestFor.join(" · ")}</span>
    </p>

    <details className="group mt-3 [&_summary::-webkit-details-marker]:hidden">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-sm font-medium text-accent-blue">
        Akkreditierung und Spezialgebiete
        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="mt-2 space-y-1.5 text-sm">
        <p>
          <span className="font-medium">Akkreditierung:</span>{" "}
          <span className="text-muted-foreground">{labor.accreditation.join(" · ")}</span>
        </p>
        <ul className="space-y-1">
          {labor.specialties.map((s, i) => (
            <li key={i} className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
              <span className="text-foreground/80">{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </details>

    {labor.watchouts.length > 0 && (
      <div className="mt-3 rounded-xl border border-warning/25 bg-warning-soft p-3">
        <p className="flex items-center gap-1.5 text-sm font-semibold">
          <AlertTriangle className="h-3.5 w-3.5 text-warning" aria-hidden="true" /> Watchouts
        </p>
        <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-foreground/80">
          {labor.watchouts.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      </div>
    )}

    <div className="mt-auto pt-4">
    <div className="flex items-center justify-between gap-3 border-t border-border/70 pt-3 text-xs text-muted-foreground">
      <span>{labor.bekanntheit}</span>
      <a
        href={labor.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-accent-blue hover:underline"
      >
        Website <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </div>
    </div>
  </article>
);

const Klappsektion = ({
  offen,
  onToggle,
  icon: Icon,
  titel,
  zusatz,
  tone = "accent",
  children,
}: {
  offen: boolean;
  onToggle: () => void;
  icon: ElementType;
  titel: string;
  zusatz?: ReactNode;
  tone?: "accent" | "danger";
  children: ReactNode;
}) => (
  <section className="mb-4 rounded-2xl border border-border bg-card shadow-card">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={offen}
      className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left md:px-6"
    >
      <span className="flex min-w-0 items-center gap-3">
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
            tone === "danger" ? "bg-danger-soft text-danger" : "bg-accent text-accent-blue",
          )}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <h2 className="text-base font-semibold leading-snug">{titel}</h2>
        {zusatz}
      </span>
      <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", offen && "rotate-180")} aria-hidden="true" />
    </button>
    {offen && <div className="border-t border-border/70 p-5 md:p-6">{children}</div>}
  </section>
);

export default LaborVergleich;
