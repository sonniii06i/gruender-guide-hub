import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import { Callout, EmptyState, KitTable, ResultRow, StatTile, ToneBadge } from "@/components/cockpit/kit";
import {
  US_CARDS,
  USE_CASE_META,
  AUSWANDERER_TIMELINE,
  SECRET_TIPS,
  TAX_COMPLIANCE,
  AVOID_LIST,
  MR_TRANSFER_DE_US,
  TRANSFER_PARTNERS,
  SWEET_SPOTS,
  DEADLINES_2026,
  VELOCITY_STRATEGY,
  VELOCITY_TOTAL_VALUE,
  MILES_AVOID,
  MILES_TAX_NOTES,
  type CardUseCase,
} from "@/data/usCreditCards";
import {
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  ExternalLink,
  Lightbulb,
  Clock,
  FileText,
  Plane,
  Phone,
  TrendingUp,
  Calendar,
  Zap,
  ChevronDown,
  Check,
  ArrowRight,
  XCircle,
  UserRound,
  Building2,
  Gift,
} from "lucide-react";

// Deadline-Status dynamisch aus dem Datum berechnen (statt hartkodiertem status-Feld),
// damit vergangene Termine nicht weiterhin als "AKTIV" angezeigt werden.
const isDeadlinePast = (s: string): boolean => {
  const m = s.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  if (!m) return false;
  const d = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d < today;
};

const UsCreditCards = () => {
  const [activeUseCase, setActiveUseCase] = useState<CardUseCase | "all">("business-ein");
  const [showAvoid, setShowAvoid] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [showTax, setShowTax] = useState(false);
  const [showMrTransfer, setShowMrTransfer] = useState(false);
  const [showSweetSpots, setShowSweetSpots] = useState(false);
  const [showDeadlines, setShowDeadlines] = useState(false);
  const [showVelocity, setShowVelocity] = useState(false);
  const [showTransferPartners, setShowTransferPartners] = useState(false);
  const [showMilesAvoid, setShowMilesAvoid] = useState(false);
  const [showMilesTax, setShowMilesTax] = useState(false);
  const [noFeeOnly, setNoFeeOnly] = useState(false);
  const [foreignOk, setForeignOk] = useState(false);

  const filtered = useMemo(() => {
    return US_CARDS.filter((c) => {
      if (activeUseCase !== "all" && c.useCase !== activeUseCase) return false;
      if (noFeeOnly && c.annualFee > 0) return false;
      if (foreignOk && !c.acceptsForeignAddress) return false;
      return true;
    });
  }, [activeUseCase, noFeeOnly, foreignOk]);

  const useCaseCounts = useMemo(() => {
    const counts: Record<CardUseCase, number> = {
      "de-personal": 0,
      "business-ein": 0,
      "credit-builder": 0,
      rewards: 0,
    };
    US_CARDS.forEach((c) => counts[c.useCase]++);
    return counts;
  }, []);

  const offeneDeadlines = DEADLINES_2026.filter((d) => !isDeadlinePast(d.date)).length;

  return (
    <CockpitShell
      eyebrow="International · US-Kreditkarten, Stand Mai 2026"
      title="US-Kreditkarten für Gründer aus Deutschland"
      subtitle="23 geprüfte Karten, 15 Miles-Sweet-Spots, der DE-zu-US-MR-Transfer (rund 17 % FX-Bonus), eine Velocity-Strategie (8 bis 12 Tsd. € Signup-Bonus pro Jahr), die Auswanderer-Timeline und BOI-/Steuer-Compliance. Quellen: Issuer-Seiten, The Points Guy, LoyaltyLobby."
    >
      {/* ===== USE-CASE-SWITCHER ===== */}
      <div role="group" aria-label="Einsatzzweck" className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {(Object.entries(USE_CASE_META) as [CardUseCase, typeof USE_CASE_META[CardUseCase]][]).map(
          ([key, meta]) => {
            const active = activeUseCase === key;
            const Icon = USE_CASE_ICON[key] ?? CreditCard;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveUseCase(key)}
                className={`press rounded-2xl border p-4 text-left transition-[border-color,background-color,box-shadow] duration-200 ${
                  active
                    ? "border-accent-blue bg-accent shadow-card ring-1 ring-accent-blue/30"
                    : "border-border bg-card hover:border-foreground/25"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    active ? "bg-accent-blue text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="mt-3 block text-sm font-semibold">{meta.label}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground tabular">{useCaseCounts[key]} Karten</span>
              </button>
            );
          },
        )}
      </div>

      {/* Active Use-Case Description */}
      {activeUseCase !== "all" && (
        <Callout tone="accent" className="mb-4">
          {USE_CASE_META[activeUseCase].description}
        </Callout>
      )}

      {/* ===== FILTER-CHIPS ===== */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <FilterChip active={activeUseCase === "all"} onClick={() => setActiveUseCase("all")}>
          Alle {US_CARDS.length} Karten
        </FilterChip>
        <FilterChip active={noFeeOnly} onClick={() => setNoFeeOnly((v) => !v)}>
          Nur ohne Jahresgebühr
        </FilterChip>
        <FilterChip active={foreignOk} onClick={() => setForeignOk((v) => !v)}>
          Ausländische Adresse möglich
        </FilterChip>
        <span className="ml-auto text-sm text-muted-foreground tabular">
          {filtered.length} Treffer
        </span>
      </div>

      {/* ===== KARTEN-GRID ===== */}
      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.length === 0 ? (
          <EmptyState
            className="md:col-span-2"
            icon={CreditCard}
            title="Keine Karte passt zu deinen Filtern"
            description="Nimm einen Filter heraus oder wähle einen anderen Einsatzzweck."
            action={
              <Button
                variant="outline"
                onClick={() => {
                  setActiveUseCase("all");
                  setNoFeeOnly(false);
                  setForeignOk(false);
                }}
              >
                Alle Karten zeigen
              </Button>
            }
          />
        ) : (
          filtered.map((card) => {
            const isStar = card.bestFor.startsWith("★");
            return (
              <article
                key={card.id}
                className={`flex flex-col rounded-2xl border bg-card p-5 shadow-card ${
                  isStar ? "border-success/40 ring-1 ring-success/20" : "border-border"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                      <CreditCard className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold leading-snug">{card.name}</h3>
                      <p className="text-sm text-muted-foreground">{card.issuer}</p>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs text-muted-foreground">Jahresgebühr</p>
                    <p className={`text-lg font-semibold tabular ${card.annualFee === 0 ? "text-success" : ""}`}>
                      {card.annualFee === 0 ? "$0" : `$${card.annualFee}`}
                    </p>
                  </div>
                </div>

                {/* Best-For */}
                <p className={`mt-3 text-sm leading-relaxed ${isStar ? "font-medium text-foreground" : "text-foreground/80"}`}>
                  {card.bestFor}
                </p>

                {/* Bonus */}
                {card.signupBonus !== "Kein Bonus" && (
                  <div className="mt-3 rounded-xl border border-accent-blue/20 bg-accent px-3.5 py-2.5">
                    <p className="text-sm font-semibold text-accent-blue">{card.signupBonus}</p>
                    {card.spendingRequirement && (
                      <p className="mt-0.5 text-xs text-muted-foreground">Mindestumsatz: {card.spendingRequirement}</p>
                    )}
                  </div>
                )}

                {/* Badges */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {!card.needsSsn && <ToneBadge tone="success">Kein SSN nötig</ToneBadge>}
                  {card.einOnlyBusiness && <ToneBadge tone="accent">Nur EIN</ToneBadge>}
                  {card.acceptsForeignAddress && <ToneBadge tone="info">Ausländische Adresse OK</ToneBadge>}
                  {card.foreignTransactionFee === 0 && <ToneBadge>0 % FX-Gebühr</ToneBadge>}
                  {card.minCreditScore !== null && card.minCreditScore > 0 && (
                    <ToneBadge className="tabular">Min. FICO {card.minCreditScore}</ToneBadge>
                  )}
                </div>

                <div className="mt-auto pt-4">
                  {/* Watchouts */}
                  {card.watchouts.length > 0 && (
                    <details className="group mb-3 text-sm [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer list-none items-center gap-1.5 font-medium text-warning">
                        <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                        {card.watchouts.length} {card.watchouts.length === 1 ? "Fallstrick" : "Fallstricke"}
                        <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" aria-hidden="true" />
                      </summary>
                      <ul className="mt-2 list-disc space-y-1 pl-4 text-muted-foreground">
                        {card.watchouts.map((w, i) => (
                          <li key={i}>{w}</li>
                        ))}
                      </ul>
                    </details>
                  )}

                  {/* Link */}
                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:underline"
                  >
                    Zur Karten-Seite <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* ===== MILES & POINTS-STRATEGIEN ===== */}
      <h2 className="mb-3 text-lg font-semibold tracking-tight">Miles und Punkte</h2>

      {/* Deadline-Banner: wenn noch unaufgeklappt, prominent oben */}
      {!showDeadlines && DEADLINES_2026.some((d) => !isDeadlinePast(d.date)) && (
        <button
          type="button"
          onClick={() => setShowDeadlines(true)}
          className="mb-3 flex w-full items-start gap-3 rounded-2xl border border-danger/25 bg-danger-soft p-4 text-left transition-colors hover:border-danger/40 md:px-6"
        >
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-card text-danger">
            <Calendar className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-base font-semibold text-danger tabular">
              {offeneDeadlines} kritische Miles-Deadlines 2026
            </span>
            <span className="mt-0.5 block text-sm text-foreground/75">
              Hyatt (20.5.), Aeroplan (1.6.), Etihad-Ende (30.6.), Amex-LH-Lounge-Ende (1.10.): jetzt buchen statt später bereuen.
            </span>
          </span>
          <ChevronDown className="mt-2 h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
        </button>
      )}

      {/* DE→US-Transfer-Hack: DER zentrale Hebel */}
      <CollapsiblePanel
        open={showMrTransfer}
        onToggle={() => setShowMrTransfer((v) => !v)}
        icon={Phone}
        tone="accent"
        title="DE-zu-US Amex MR-Transfer: der zentrale Hebel"
        subtitle={`Konversion ~${MR_TRANSFER_DE_US.conversionRatio} dank EUR-USD-FX = ${MR_TRANSFER_DE_US.fxBonus}`}
      >
        <div className="space-y-3">
          <InfoBox title="Wie es funktioniert">
            <p className="text-sm leading-relaxed text-muted-foreground">{MR_TRANSFER_DE_US.mechanism}</p>
          </InfoBox>

          <InfoBox title="Hotline-Nummern" icon={Phone}>
            <div className="divide-y divide-border/70">
              <ResultRow label="US Global Card Transfer Team (24/7)" value={<strong>877-621-2639</strong>} />
              <ResultRow label="Amex US Platinum-Hotline" value={<strong>1-800-525-3355</strong>} />
            </div>
          </InfoBox>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <InfoBox title="Voraussetzungen">
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {MR_TRANSFER_DE_US.requirements.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </InfoBox>
            <InfoBox title="Ablauf">
              <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                {MR_TRANSFER_DE_US.process.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ol>
            </InfoBox>
          </div>

          <Callout tone="warning" title="Fallstricke">
            <ul className="list-disc space-y-1 pl-4">
              {MR_TRANSFER_DE_US.watchouts.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </Callout>
        </div>
      </CollapsiblePanel>

      {/* Sweet-Spots */}
      <CollapsiblePanel
        open={showSweetSpots}
        onToggle={() => setShowSweetSpots((v) => !v)}
        icon={Plane}
        tone="info"
        title={`${SWEET_SPOTS.length} Sweet-Spots 2026: Prämien mit dem höchsten €-Wert`}
        subtitle="Aeroplan, Virgin, Hyatt, Iberia, Avianca, KrisFlyer: Cent-pro-Punkt-Wert geprüft"
      >
        <div className="space-y-3">
          {SWEET_SPOTS.map((s) => {
            const deadlineOffen = !!s.deadline && !isDeadlinePast(s.deadline);
            return (
              <div
                key={s.id}
                className={`rounded-xl border p-4 ${deadlineOffen ? "border-warning/30 bg-warning-soft" : "border-border bg-card"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{s.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{s.bestFor}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-lg font-semibold text-success tabular">€{s.realerWertEur.toLocaleString("de-DE")}</p>
                    <p className="text-xs text-muted-foreground">realer Wert</p>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  <MiniStat label="Punkte" value={s.punkte > 0 ? s.punkte.toLocaleString("de-DE") : "n/a"} />
                  <MiniStat label="Cent/Punkt" value={s.centProPunkt > 0 ? `${s.centProPunkt}¢` : "—"} />
                  <MiniStat label="Verhältnis" value={s.ratio} />
                </div>

                <p className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{s.fromProgram}</span>
                  <ArrowRight className="h-3 w-3" aria-label="zu" />
                  <span className="font-medium text-foreground">{s.toProgram}</span>
                </p>

                {s.deadline && (
                  <p className={`mt-2 flex items-center gap-1.5 text-xs font-semibold ${isDeadlinePast(s.deadline) ? "text-muted-foreground" : "text-warning"}`}>
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    Deadline: {s.deadline}{isDeadlinePast(s.deadline) ? " (abgelaufen)" : ""}
                  </p>
                )}

                {s.watchouts.length > 0 && (
                  <details className="group mt-2 text-xs [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer list-none items-center gap-1 text-muted-foreground hover:text-foreground">
                      {s.watchouts.length} {s.watchouts.length === 1 ? "Fallstrick" : "Fallstricke"}
                      <ChevronDown className="h-3 w-3 transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <ul className="mt-1 list-disc space-y-0.5 pl-4 text-muted-foreground">
                      {s.watchouts.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            );
          })}
        </div>
      </CollapsiblePanel>

      {/* Deadlines 2026 */}
      <CollapsiblePanel
        open={showDeadlines}
        onToggle={() => setShowDeadlines((v) => !v)}
        icon={Calendar}
        tone="danger"
        title={`${DEADLINES_2026.length} kritische Miles- und Hotel-Deadlines 2026`}
        subtitle="Hyatt (20.5.), Aeroplan (1.6.), Etihad-Ende (30.6.), Amex-LH-Lounge (1.10.)"
      >
        <ul className="space-y-2">
          {DEADLINES_2026.map((d, i) => {
            const past = isDeadlinePast(d.date);
            return (
              <li
                key={i}
                className={`flex items-start gap-4 rounded-xl border p-3.5 ${past ? "border-border bg-secondary/30 opacity-60" : "border-danger/25 bg-card"}`}
              >
                <div className="w-24 shrink-0">
                  <p className={`text-sm font-semibold tabular ${past ? "text-muted-foreground" : "text-danger"}`}>{d.date}</p>
                  <ToneBadge tone={past ? "neutral" : "danger"} className="mt-1">
                    {past ? "vorbei" : "aktiv"}
                  </ToneBadge>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{d.event}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{d.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </CollapsiblePanel>

      {/* Velocity-Strategie */}
      <CollapsiblePanel
        open={showVelocity}
        onToggle={() => setShowVelocity((v) => !v)}
        icon={TrendingUp}
        tone="success"
        title={`Velocity-Strategie: 12 Monate für €${VELOCITY_TOTAL_VALUE.realistic.replace("€", "")} Bonus-Wert`}
        subtitle="Optimale Reihenfolge der Kartenanträge für DE-Residents mit US-LLC"
      >
        <ol className="mb-4 space-y-2">
          {VELOCITY_STRATEGY.map((step, i) => (
            <li key={i} className="flex flex-col gap-2 rounded-xl border border-border bg-card p-3.5 sm:flex-row sm:items-start sm:gap-4">
              <div className="shrink-0 sm:w-32">
                <ToneBadge tone="accent">{step.month}</ToneBadge>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{step.action}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{step.note}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <StatTile
            label="Realistischer Bonus-Wert pro Jahr"
            value={VELOCITY_TOTAL_VALUE.realistic}
            hint="bei sauberer Ausführung"
            tone="success"
            emphasis
          />
          <StatTile label="Aggressive Variante" value={VELOCITY_TOTAL_VALUE.aggressive} />
        </div>
      </CollapsiblePanel>

      {/* Transfer-Partner Vergleich */}
      <CollapsiblePanel
        open={showTransferPartners}
        onToggle={() => setShowTransferPartners((v) => !v)}
        icon={Zap}
        tone="warning"
        title={`${TRANSFER_PARTNERS.length} Transfer-Partner: DE-MR und US-MR im Vergleich`}
        subtitle="Wo US-Karten 25 bis 100 % bessere Umrechnungen haben (Aeroplan, Virgin, Avianca, ANA: alle nur über US)"
      >
        <KitTable caption="Transfer-Partner im Vergleich" className="relative">
          <thead>
            <tr>
              <th>Partner</th>
              <th>US-MR</th>
              <th>DE-MR</th>
              <th>Vorteil</th>
            </tr>
          </thead>
          <tbody>
            {TRANSFER_PARTNERS.map((p) => (
              <tr key={p.name}>
                <td className="font-medium">
                  {p.name}
                  {p.note && <span className="block text-xs font-normal text-muted-foreground">{p.note}</span>}
                </td>
                <td className="whitespace-nowrap">{p.usRatio}</td>
                <td className="whitespace-nowrap">{p.deRatio}</td>
                <td>
                  {p.winner === "us" && <ToneBadge tone="success">US</ToneBadge>}
                  {p.winner === "us-only" && <ToneBadge tone="accent">nur US</ToneBadge>}
                  {p.winner === "de-only" && <ToneBadge tone="warning">nur DE</ToneBadge>}
                  {p.winner === "equal" && <ToneBadge>gleich</ToneBadge>}
                </td>
              </tr>
            ))}
          </tbody>
        </KitTable>
      </CollapsiblePanel>

      {/* Miles-Steuer */}
      <CollapsiblePanel
        open={showMilesTax}
        onToggle={() => setShowMilesTax((v) => !v)}
        icon={FileText}
        tone="success"
        title="Steuer: Boni und Punkte für DE-Residents"
        subtitle="Privat steuerfrei (BFH, §3 Nr. 38 EStG), geschäftlich Grauzone"
      >
        <CheckList items={MILES_TAX_NOTES.map((n) => ({ title: n.headline, detail: n.detail }))} />
      </CollapsiblePanel>

      {/* Miles-AVOID */}
      <CollapsiblePanel
        open={showMilesAvoid}
        onToggle={() => setShowMilesAvoid((v) => !v)}
        icon={ShieldAlert}
        tone="danger"
        title={`${MILES_AVOID.length} Miles-Fallen 2026`}
        subtitle="Manufactured Spending, Etihad-Ende, Bilt 2.0 u. a."
      >
        <div className="space-y-2">
          {MILES_AVOID.map((a, i) => (
            <Callout key={i} tone="danger" icon={XCircle} title={a.item}>
              {a.reason}
            </Callout>
          ))}
        </div>
      </CollapsiblePanel>

      {/* ===== KARTEN-SEKTIONEN (existing) ===== */}
      <h2 className="mb-3 mt-10 text-lg font-semibold tracking-tight">Wissen für Gründer</h2>

      {/* Geheim-Tipps */}
      <CollapsiblePanel
        open={showTips}
        onToggle={() => setShowTips((v) => !v)}
        icon={Lightbulb}
        tone="warning"
        title="Insider-Tipps aus der Gründerszene"
        subtitle={`${SECRET_TIPS.length} unkonventionelle Setups, die selten erwähnt werden`}
      >
        <div className="space-y-3">
          {SECRET_TIPS.map((tip, i) => (
            <InfoBox key={i} title={tip.title}>
              <p className="text-sm leading-relaxed text-muted-foreground">{tip.detail}</p>
            </InfoBox>
          ))}
        </div>
      </CollapsiblePanel>

      {/* Auswanderer-Timeline */}
      <CollapsiblePanel
        open={showTimeline}
        onToggle={() => setShowTimeline((v) => !v)}
        icon={Clock}
        tone="info"
        title="Auswanderer-Timeline: von 0 auf 700 FICO in 12 bis 18 Monaten"
        subtitle={`${AUSWANDERER_TIMELINE.length} Schritte vom ITIN-Antrag bis zur Premium-Karte`}
      >
        <ol className="space-y-2">
          {AUSWANDERER_TIMELINE.map((step, i) => (
            <li key={i} className="flex flex-col gap-2 rounded-xl border border-border bg-card p-3.5 sm:flex-row sm:items-start sm:gap-4">
              <div className="shrink-0 sm:w-24">
                <ToneBadge tone="info">{step.time}</ToneBadge>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{step.step}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </CollapsiblePanel>

      {/* Tax / Compliance */}
      <CollapsiblePanel
        open={showTax}
        onToggle={() => setShowTax((v) => !v)}
        icon={FileText}
        tone="success"
        title="Steuer und Compliance für Kunden aus DE"
        subtitle="BOI entfällt, Punkte sind steuerfrei, FX-Gebühren absetzbar: alles, was du wissen musst"
      >
        <CheckList items={TAX_COMPLIANCE.map((t) => ({ title: t.headline, detail: t.detail }))} />
      </CollapsiblePanel>

      {/* AVOID-Liste */}
      <CollapsiblePanel
        open={showAvoid}
        onToggle={() => setShowAvoid((v) => !v)}
        icon={ShieldAlert}
        tone="danger"
        title="Lieber meiden: Karten und Strategien 2026"
        subtitle={`${AVOID_LIST.length} Karten und Strategien, vor denen Community und Issuer-Praxis warnen`}
      >
        <div className="space-y-2">
          {AVOID_LIST.map((a, i) => (
            <Callout key={i} tone="danger" icon={XCircle} title={a.name}>
              {a.reason}
            </Callout>
          ))}
        </div>
      </CollapsiblePanel>

      {/* ===== DISCLAIMER ===== */}
      <Callout tone="warning" title="Wichtige Hinweise" className="mt-6">
        <ul className="list-disc space-y-1 pl-4">
          <li>Signup-Boni ändern sich monatlich. Werte Stand Mai 2026, vor dem Antrag auf der Issuer-Seite prüfen.</li>
          <li>
            Mercury, Brex und Ramp brauchen für Gründer aus DE mit US-LLC oft 1 bis 3 Wochen bis zur Freigabe;
            Mindestguthaben ändern sich.
          </li>
          <li>5/24, 2/90 und 1/6 sind ungeschriebene Issuer-Regeln und können sich ohne Vorwarnung ändern.</li>
          <li>Steuer-Aussagen sind keine Beratung (StBerG). Beim US-LLC-Setup zwingend StB und ggf. US-CPA einbinden.</li>
          <li>
            <strong className="font-semibold text-foreground">BOI-Filing:</strong> Die FinCEN Interim Final Rule vom
            26.3.2025 hat US-LLCs vom Reporting ausgenommen. Vor Filings für 2025 prüfen, ob das noch aktuell ist.
          </li>
        </ul>
      </Callout>
    </CockpitShell>
  );
};

// ===== HELPER =====
const USE_CASE_ICON: Partial<Record<CardUseCase, React.ElementType>> = {
  "de-personal": UserRound,
  "business-ein": Building2,
  "credit-builder": TrendingUp,
  rewards: Gift,
};

const PANEL_TONE: Record<"accent" | "info" | "success" | "warning" | "danger", string> = {
  accent: "bg-accent text-accent-blue",
  info: "bg-info-soft text-info",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
};

const FilterChip = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
      active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground/80 hover:border-foreground/25"
    }`}
  >
    {active && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
    {children}
  </button>
);

const MiniStat = ({ label, value }: { label: string; value: string }) => (
  <div className="min-w-0 rounded-lg bg-secondary/50 px-2.5 py-1.5">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="truncate text-sm font-semibold tabular">{value}</p>
  </div>
);

const InfoBox = ({ title, icon: Icon, children }: { title: string; icon?: React.ElementType; children: React.ReactNode }) => (
  <div className="rounded-xl border border-border bg-card p-4">
    <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
      {Icon && <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />}
      {title}
    </p>
    {children}
  </div>
);

const CheckList = ({ items }: { items: { title: string; detail: string }[] }) => (
  <ul className="space-y-2">
    {items.map((it, i) => (
      <li key={i} className="flex gap-3 rounded-xl border border-border bg-card p-3.5">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-sm font-semibold">{it.title}</p>
          <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{it.detail}</p>
        </div>
      </li>
    ))}
  </ul>
);

const CollapsiblePanel = ({
  open,
  onToggle,
  icon: Icon,
  tone,
  title,
  subtitle,
  children,
}: {
  open: boolean;
  onToggle: () => void;
  icon: React.ElementType;
  tone: keyof typeof PANEL_TONE;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => (
  <div className="mb-3 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-secondary/40 md:px-6"
    >
      <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${PANEL_TONE[tone]}`}>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-base font-semibold leading-snug">{title}</span>
        <span className="mt-0.5 block text-sm text-muted-foreground">{subtitle}</span>
      </span>
      <ChevronDown className={`mt-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
    </button>
    {open && <div className="border-t border-border/70 px-5 py-5 md:px-6">{children}</div>}
  </div>
);

export default UsCreditCards;
