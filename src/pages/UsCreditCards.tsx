import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Badge } from "@/components/ui/badge";
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

  return (
    <CockpitShell
      eyebrow="US-Kreditkarten · Stand Mai 2026"
      title="US-Cards für DE-Kunden — kuratierter Guide"
      subtitle="23 verifizierte Karten + 15 Miles-Sweet-Spots + DE→US-MR-Transfer-Hack (~17% FX-Bonus!) + Velocity-Strategie (€8-12k SUB/Jahr) + Auswanderer-Timeline + BOI/Tax-Compliance. Quellen: Issuer-Sites + The Points Guy + LoyaltyLobby."
    >
      {/* ===== USE-CASE-SWITCHER ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        {(Object.entries(USE_CASE_META) as [CardUseCase, typeof USE_CASE_META[CardUseCase]][]).map(
          ([key, meta]) => {
            const active = activeUseCase === key;
            return (
              <button
                key={key}
                onClick={() => setActiveUseCase(key)}
                className={`rounded-2xl border-2 p-4 text-left transition-all ${
                  active
                    ? "border-accent-blue bg-accent-blue/5 shadow-md"
                    : "border-border bg-card hover:border-accent-blue/40"
                }`}
              >
                <div className="text-2xl mb-1">{meta.emoji}</div>
                <div className="font-bold text-sm">{meta.label}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">
                  {useCaseCounts[key]} Karten
                </div>
              </button>
            );
          },
        )}
      </div>

      {/* Active Use-Case Description */}
      {activeUseCase !== "all" && (
        <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4 mb-4 text-sm">
          {USE_CASE_META[activeUseCase].description}
        </div>
      )}

      {/* ===== FILTER-CHIPS ===== */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <button
          onClick={() => setActiveUseCase("all")}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            activeUseCase === "all"
              ? "bg-accent-blue text-primary-foreground"
              : "border border-border bg-card hover:bg-secondary"
          }`}
        >
          Alle {US_CARDS.length} Karten
        </button>
        <button
          onClick={() => setNoFeeOnly((v) => !v)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            noFeeOnly
              ? "bg-emerald-500 text-white"
              : "border border-border bg-card hover:bg-secondary"
          }`}
        >
          Nur ohne Annual Fee
        </button>
        <button
          onClick={() => setForeignOk((v) => !v)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            foreignOk
              ? "bg-emerald-500 text-white"
              : "border border-border bg-card hover:bg-secondary"
          }`}
        >
          Foreign-Address OK
        </button>
        <span className="text-xs text-muted-foreground ml-2">
          → {filtered.length} Treffer
        </span>
      </div>

      {/* ===== KARTEN-GRID ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        {filtered.length === 0 ? (
          <div className="md:col-span-2 rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
            Keine Karten passen zu deinen Filtern.
          </div>
        ) : (
          filtered.map((card) => {
            const isStar = card.bestFor.startsWith("★");
            return (
              <div
                key={card.id}
                className={`rounded-2xl border p-4 ${
                  isStar
                    ? "border-emerald-500/40 bg-emerald-500/5"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex items-start justify-between mb-2 gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="truncate">{card.name}</span>
                    </h3>
                    <div className="text-[11px] text-muted-foreground">{card.issuer}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-muted-foreground">Annual Fee</div>
                    <div
                      className={`font-bold ${
                        card.annualFee === 0 ? "text-emerald-700" : "text-foreground"
                      }`}
                    >
                      {card.annualFee === 0 ? "$0" : `$${card.annualFee}`}
                    </div>
                  </div>
                </div>

                {/* Best-For */}
                <div
                  className={`text-sm mb-2 ${
                    isStar ? "font-semibold text-emerald-800" : "text-foreground"
                  }`}
                >
                  {card.bestFor}
                </div>

                {/* Bonus */}
                {card.signupBonus !== "Kein Bonus" && (
                  <div className="rounded-lg bg-secondary/40 p-2 mb-2 text-xs">
                    <div className="font-semibold text-accent-blue">{card.signupBonus}</div>
                    {card.spendingRequirement && (
                      <div className="text-muted-foreground text-[11px]">
                        Spend: {card.spendingRequirement}
                      </div>
                    )}
                  </div>
                )}

                {/* Badges */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {!card.needsSsn && (
                    <Badge variant="outline" className="text-[10px] text-emerald-700 border-emerald-500/30 bg-emerald-500/5">
                      Kein SSN nötig
                    </Badge>
                  )}
                  {card.einOnlyBusiness && (
                    <Badge variant="outline" className="text-[10px] text-blue-700 border-blue-500/30 bg-blue-500/5">
                      EIN-only
                    </Badge>
                  )}
                  {card.acceptsForeignAddress && (
                    <Badge variant="outline" className="text-[10px] text-purple-700 border-purple-500/30 bg-purple-500/5">
                      Foreign Address OK
                    </Badge>
                  )}
                  {card.foreignTransactionFee === 0 && (
                    <Badge variant="outline" className="text-[10px] text-muted-foreground border-border">
                      0% FX-Fee
                    </Badge>
                  )}
                  {card.minCreditScore !== null && card.minCreditScore > 0 && (
                    <Badge variant="outline" className="text-[10px] text-muted-foreground border-border">
                      Min FICO {card.minCreditScore}
                    </Badge>
                  )}
                </div>

                {/* Watchouts */}
                {card.watchouts.length > 0 && (
                  <details className="text-xs">
                    <summary className="cursor-pointer text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" /> {card.watchouts.length} Watchout
                      {card.watchouts.length === 1 ? "" : "s"}
                    </summary>
                    <ul className="list-disc pl-4 mt-1 space-y-0.5 text-muted-foreground">
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
                  className="inline-flex items-center gap-1 text-xs text-accent-blue hover:underline mt-2"
                >
                  Zur Karten-Seite <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            );
          })
        )}
      </div>

      {/* ===== MILES & POINTS-STRATEGIEN ===== */}

      {/* Deadline-Banner — wenn noch unaufgeklappt, prominent oben */}
      {!showDeadlines && DEADLINES_2026.some((d) => !isDeadlinePast(d.date)) && (
        <div className="rounded-2xl border-2 border-red-500/40 bg-red-500/5 p-4 mb-3">
          <button
            onClick={() => setShowDeadlines(true)}
            className="w-full text-left flex items-start gap-3"
          >
            <Calendar className="h-6 w-6 text-red-700 shrink-0" />
            <div className="flex-1">
              <div className="font-bold text-base text-red-700">
                🚨 {DEADLINES_2026.filter((d) => !isDeadlinePast(d.date)).length} kritische Miles-Deadlines 2026
              </div>
              <div className="text-sm text-muted-foreground mt-0.5">
                Hyatt (20.5.) · Aeroplan (1.6.) · Etihad-Ende (30.6.) · Amex-LH-Lounge-Ende (1.10.) — jetzt buchen, später bereuen
              </div>
            </div>
            <div className="text-red-700 text-xs">▼</div>
          </button>
        </div>
      )}

      {/* DE→US-Transfer-Hack — DER zentrale Hebel */}
      <CollapsiblePanel
        open={showMrTransfer}
        onToggle={() => setShowMrTransfer((v) => !v)}
        icon={<Phone className="h-5 w-5 text-purple-700" />}
        title="🎯 DE → US Amex MR-Transfer — der Haupt-Hack"
        subtitle={`Konversion ~${MR_TRANSFER_DE_US.conversionRatio} dank EUR-USD-FX = ${MR_TRANSFER_DE_US.fxBonus}`}
        colorClass="border-purple-500/30 bg-purple-500/5"
      >
        <div className="space-y-3">
          <div className="rounded-xl bg-card border border-border p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-2">
              Wie es funktioniert
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {MR_TRANSFER_DE_US.mechanism}
            </p>
          </div>

          <div className="rounded-xl bg-card border border-border p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-2 flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" /> Hotline-Nummern
            </div>
            <ul className="text-sm space-y-1.5">
              <li>
                <strong>877-621-2639</strong> — US Global Card Transfer Team (24/7)
              </li>
              <li>
                <strong>1-800-525-3355</strong> — Amex US Platinum-Hotline
              </li>
            </ul>
          </div>

          <div className="rounded-xl bg-card border border-border p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
              Voraussetzungen
            </div>
            <ul className="text-sm space-y-1 list-disc pl-5 text-muted-foreground">
              {MR_TRANSFER_DE_US.requirements.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-card border border-border p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
              Prozess
            </div>
            <ol className="text-sm space-y-1 list-decimal pl-5 text-muted-foreground">
              {MR_TRANSFER_DE_US.process.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ol>
          </div>

          <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-3.5 w-3.5" /> Watchouts
            </div>
            <ul className="text-sm space-y-1 list-disc pl-5 text-muted-foreground">
              {MR_TRANSFER_DE_US.watchouts.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        </div>
      </CollapsiblePanel>

      {/* Sweet-Spots */}
      <CollapsiblePanel
        open={showSweetSpots}
        onToggle={() => setShowSweetSpots((v) => !v)}
        icon={<Plane className="h-5 w-5 text-blue-700" />}
        title={`${SWEET_SPOTS.length} Sweet-Spots 2026 — Awards mit höchstem €-Wert`}
        subtitle="Aeroplan / Virgin / Hyatt / Iberia / Avianca / KrisFlyer — Cent-pro-Punkt-Wert verifiziert"
        colorClass="border-blue-500/30 bg-blue-500/5"
      >
        <div className="space-y-2">
          {SWEET_SPOTS.map((s) => (
            <div
              key={s.id}
              className={`rounded-xl border p-3 ${
                s.deadline && !isDeadlinePast(s.deadline) ? "border-amber-500/30 bg-amber-500/5" : "border-border bg-card"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm">{s.title}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{s.bestFor}</div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-lg font-bold text-emerald-700">
                    €{s.realerWertEur.toLocaleString("de-DE")}
                  </div>
                  <div className="text-[10px] text-muted-foreground">realer Wert</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-2 text-[11px]">
                <div className="rounded-md bg-secondary/40 px-2 py-1">
                  <div className="text-muted-foreground">Punkte</div>
                  <div className="font-semibold">
                    {s.punkte > 0 ? s.punkte.toLocaleString("de-DE") : "n/a"}
                  </div>
                </div>
                <div className="rounded-md bg-secondary/40 px-2 py-1">
                  <div className="text-muted-foreground">Cent/Punkt</div>
                  <div className="font-semibold">{s.centProPunkt > 0 ? `${s.centProPunkt}¢` : "—"}</div>
                </div>
                <div className="rounded-md bg-secondary/40 px-2 py-1">
                  <div className="text-muted-foreground">Ratio</div>
                  <div className="font-semibold truncate">{s.ratio}</div>
                </div>
              </div>

              <div className="text-[11px] text-muted-foreground">
                <strong className="text-foreground">Aus:</strong> {s.fromProgram}{" "}
                <strong className="text-foreground ml-2">→</strong> {s.toProgram}
              </div>

              {s.deadline && (
                <div className={`mt-2 text-xs font-semibold flex items-center gap-1 ${isDeadlinePast(s.deadline) ? "text-muted-foreground" : "text-amber-700"}`}>
                  ⏰ Deadline: {s.deadline}{isDeadlinePast(s.deadline) ? " (abgelaufen)" : ""}
                </div>
              )}

              {s.watchouts.length > 0 && (
                <details className="text-[11px] mt-2">
                  <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                    {s.watchouts.length} Watchout{s.watchouts.length === 1 ? "" : "s"}
                  </summary>
                  <ul className="list-disc pl-4 mt-1 space-y-0.5 text-muted-foreground">
                    {s.watchouts.map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          ))}
        </div>
      </CollapsiblePanel>

      {/* Deadlines 2026 */}
      <CollapsiblePanel
        open={showDeadlines}
        onToggle={() => setShowDeadlines((v) => !v)}
        icon={<Calendar className="h-5 w-5 text-red-700" />}
        title={`${DEADLINES_2026.length} kritische Miles/Hotel-Deadlines 2026`}
        subtitle="Hyatt (20.5.) · Aeroplan (1.6.) · Etihad-Ende (30.6.) · Amex-LH-Lounge (1.10.)"
        colorClass="border-red-500/30 bg-red-500/5"
      >
        <div className="space-y-2">
          {DEADLINES_2026.map((d, i) => (
            <div
              key={i}
              className={`rounded-xl border p-3 flex items-start gap-3 ${
                !isDeadlinePast(d.date)
                  ? "border-red-500/30 bg-card"
                  : "border-border bg-secondary/30 opacity-60"
              }`}
            >
              <div className="shrink-0 w-24">
                <div
                  className={`text-xs font-bold ${
                    !isDeadlinePast(d.date) ? "text-red-700" : "text-muted-foreground"
                  }`}
                >
                  {d.date}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {!isDeadlinePast(d.date) ? "AKTIV" : "passiert"}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{d.event}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{d.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </CollapsiblePanel>

      {/* Velocity-Strategie */}
      <CollapsiblePanel
        open={showVelocity}
        onToggle={() => setShowVelocity((v) => !v)}
        icon={<TrendingUp className="h-5 w-5 text-emerald-700" />}
        title={`Velocity-Strategie: 12 Monate für €${VELOCITY_TOTAL_VALUE.realistic.replace("€", "")} SUB-Wert`}
        subtitle="Optimale Reihenfolge der Card-Applies für DE-Resident mit US-LLC"
        colorClass="border-emerald-500/30 bg-emerald-500/5"
      >
        <div className="space-y-2 mb-3">
          {VELOCITY_STRATEGY.map((step, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-card p-3 flex gap-3 items-start"
            >
              <div className="shrink-0 w-32">
                <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider">
                  {step.month}
                </Badge>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{step.action}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{step.note}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-sm">
          <div className="font-bold text-emerald-700 mb-1">Realistischer Jahres-SUB-Wert</div>
          <div className="text-foreground">
            <strong>{VELOCITY_TOTAL_VALUE.realistic}</strong> bei sauberer Ausführung
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Aggressiv: {VELOCITY_TOTAL_VALUE.aggressive}
          </div>
        </div>
      </CollapsiblePanel>

      {/* Transfer-Partner Vergleich */}
      <CollapsiblePanel
        open={showTransferPartners}
        onToggle={() => setShowTransferPartners((v) => !v)}
        icon={<Zap className="h-5 w-5 text-orange-700" />}
        title={`${TRANSFER_PARTNERS.length} Transfer-Partner: DE-MR vs US-MR Vergleich`}
        subtitle="Wo US-Karten 25-100% bessere Conversions haben (Aeroplan, Virgin, Avianca, ANA — alle DE-killing US-only)"
        colorClass="border-orange-500/30 bg-orange-500/5"
      >
        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 px-2 font-semibold">Partner</th>
                <th className="py-2 px-2 font-semibold">US-MR</th>
                <th className="py-2 px-2 font-semibold">DE-MR</th>
                <th className="py-2 px-2 font-semibold">Winner</th>
              </tr>
            </thead>
            <tbody>
              {TRANSFER_PARTNERS.map((p) => (
                <tr key={p.name} className="border-b border-border/40 hover:bg-secondary/30">
                  <td className="py-2 px-2 font-medium">
                    {p.name}
                    {p.note && <div className="text-[10px] text-muted-foreground italic">{p.note}</div>}
                  </td>
                  <td className="py-2 px-2 font-mono">{p.usRatio}</td>
                  <td className="py-2 px-2 font-mono">{p.deRatio}</td>
                  <td className="py-2 px-2">
                    {p.winner === "us" && <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-500/30">US 🇺🇸</Badge>}
                    {p.winner === "us-only" && <Badge className="bg-blue-500/10 text-blue-700 border-blue-500/30">US-only</Badge>}
                    {p.winner === "de-only" && <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/30">DE-only</Badge>}
                    {p.winner === "equal" && <Badge variant="outline">Gleich</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CollapsiblePanel>

      {/* Miles-Steuer */}
      <CollapsiblePanel
        open={showMilesTax}
        onToggle={() => setShowMilesTax((v) => !v)}
        icon={<FileText className="h-5 w-5 text-emerald-700" />}
        title="Steuer: SUBs & Punkte für DE-Resident"
        subtitle="Privat = steuerfrei (BFH/§3 Nr. 38 EStG), Business = Grauzone"
        colorClass="border-emerald-500/30 bg-emerald-500/5"
      >
        <div className="space-y-2">
          {MILES_TAX_NOTES.map((n, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-3">
              <div className="font-semibold text-sm mb-1 flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                {n.headline}
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed pl-6">{n.detail}</div>
            </div>
          ))}
        </div>
      </CollapsiblePanel>

      {/* Miles-AVOID */}
      <CollapsiblePanel
        open={showMilesAvoid}
        onToggle={() => setShowMilesAvoid((v) => !v)}
        icon={<ShieldAlert className="h-5 w-5 text-red-700" />}
        title={`${MILES_AVOID.length} Miles-AVOIDs 2026`}
        subtitle="Manufactured Spending, Etihad-Ende, Bilt 2.0 etc."
        colorClass="border-red-500/30 bg-red-500/5"
      >
        <div className="space-y-2">
          {MILES_AVOID.map((a, i) => (
            <div key={i} className="rounded-xl border border-red-500/20 bg-card p-3">
              <div className="font-semibold text-sm text-red-700">{a.item}</div>
              <div className="text-xs text-muted-foreground mt-1">{a.reason}</div>
            </div>
          ))}
        </div>
      </CollapsiblePanel>

      <div className="h-3" />

      {/* ===== KARTEN-SEKTIONEN (existing) ===== */}

      {/* Geheim-Tipps */}
      <CollapsiblePanel
        open={showTips}
        onToggle={() => setShowTips((v) => !v)}
        icon={<Lightbulb className="h-5 w-5 text-amber-700" />}
        title="Geheim-Tipps DE-Founder-Szene"
        subtitle={`${SECRET_TIPS.length} unkonventionelle Setups die selten erwähnt werden`}
        colorClass="border-amber-500/30 bg-amber-500/5"
      >
        <div className="space-y-3">
          {SECRET_TIPS.map((tip, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-3">
              <div className="font-semibold text-sm mb-1">{tip.title}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{tip.detail}</div>
            </div>
          ))}
        </div>
      </CollapsiblePanel>

      {/* Auswanderer-Timeline */}
      <CollapsiblePanel
        open={showTimeline}
        onToggle={() => setShowTimeline((v) => !v)}
        icon={<Clock className="h-5 w-5 text-blue-700" />}
        title="Auswanderer-Timeline: 0 → 700 FICO in 12-18 Monaten"
        subtitle={`${AUSWANDERER_TIMELINE.length} Steps von ITIN-Antrag bis Premium-Card`}
        colorClass="border-blue-500/30 bg-blue-500/5"
      >
        <div className="space-y-2">
          {AUSWANDERER_TIMELINE.map((step, i) => (
            <div
              key={i}
              className="flex gap-3 rounded-lg border border-border bg-card p-3 items-start"
            >
              <div className="shrink-0 w-20">
                <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider">
                  {step.time}
                </Badge>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{step.step}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{step.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </CollapsiblePanel>

      {/* Tax / Compliance */}
      <CollapsiblePanel
        open={showTax}
        onToggle={() => setShowTax((v) => !v)}
        icon={<FileText className="h-5 w-5 text-emerald-700" />}
        title="Tax / Compliance für DE-Kunden"
        subtitle="BOI ist tot, Punkte sind steuerfrei, FX-Fees absetzbar — alles was du wissen musst"
        colorClass="border-emerald-500/30 bg-emerald-500/5"
      >
        <div className="space-y-2">
          {TAX_COMPLIANCE.map((t, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-3">
              <div className="font-semibold text-sm mb-1 flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                {t.headline}
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed pl-6">{t.detail}</div>
            </div>
          ))}
        </div>
      </CollapsiblePanel>

      {/* AVOID-Liste */}
      <CollapsiblePanel
        open={showAvoid}
        onToggle={() => setShowAvoid((v) => !v)}
        icon={<ShieldAlert className="h-5 w-5 text-red-700" />}
        title="AVOID-Liste — vermeiden 2026"
        subtitle={`${AVOID_LIST.length} Karten/Strategien wo Community/Issuer-Praxis warnen`}
        colorClass="border-red-500/30 bg-red-500/5"
      >
        <div className="space-y-2">
          {AVOID_LIST.map((a, i) => (
            <div key={i} className="rounded-xl border border-red-500/20 bg-card p-3">
              <div className="font-semibold text-sm text-red-700">{a.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{a.reason}</div>
            </div>
          ))}
        </div>
      </CollapsiblePanel>

      {/* ===== DISCLAIMER ===== */}
      <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Wichtige Hinweise:</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                Sign-Up-Bonuses ändern sich monatlich — Werte stand Mai 2026, vor Apply auf
                Issuer-Webseite verifizieren!
              </li>
              <li>
                Mercury / Brex / Ramp Approval-Prozess kann 1-3 Wochen dauern für
                DE-Founder mit US-LLC — Mindest-Balance-Anforderungen ändern sich
              </li>
              <li>
                5/24 / 2/90 / 1/6 sind ungeschriebene Issuer-Regeln — können sich ohne
                Vorwarnung ändern
              </li>
              <li>
                Steuer-Aussagen sind keine Beratung (StBerG) — bei US-LLC-Setup zwingend
                StB + ggfs. US-CPA konsultieren
              </li>
              <li>
                <strong>BOI-Filing-Status:</strong> FinCEN Interim Final Rule vom 26.3.2025
                hat US-LLCs vom Reporting ausgenommen — vor 2025-Filings prüfen ob das
                noch aktuell ist
              </li>
            </ul>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

// ===== HELPER: Collapsible Panel =====
const CollapsiblePanel = ({
  open,
  onToggle,
  icon,
  title,
  subtitle,
  colorClass,
  children,
}: {
  open: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  colorClass: string;
  children: React.ReactNode;
}) => (
  <div className={`rounded-2xl border ${colorClass} mb-3 overflow-hidden`}>
    <button
      onClick={onToggle}
      className="w-full p-4 text-left flex items-start gap-3 hover:bg-black/5 transition-colors"
    >
      <div className="shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm">{title}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </div>
      <div className="text-muted-foreground text-xs shrink-0 mt-1">{open ? "▲" : "▼"}</div>
    </button>
    {open && <div className="px-4 pb-4">{children}</div>}
  </div>
);

export default UsCreditCards;
