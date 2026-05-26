import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Badge } from "@/components/ui/badge";
import {
  BIZ_CARDS,
  SEGMENT_META,
  DECISION_GUIDE,
  AMEX_REFERRAL,
  type CardSegment,
} from "@/data/businessCreditCards";
import {
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Info,
  Compass,
  Layers,
  Award,
  Crown,
  ArrowRight,
} from "lucide-react";

const cardTypeBadge: Record<string, string> = {
  Charge: "text-purple-700 border-purple-500/30 bg-purple-500/5",
  Debit: "text-blue-700 border-blue-500/30 bg-blue-500/5",
  Kreditkarte: "text-emerald-700 border-emerald-500/30 bg-emerald-500/5",
  Prepaid: "text-amber-700 border-amber-500/30 bg-amber-500/5",
};

const BusinessCreditCards = () => {
  const [activeSegment, setActiveSegment] = useState<CardSegment | "all">("solo");
  const [noSchufaOnly, setNoSchufaOnly] = useState(false);
  const [soloDayOneOnly, setSoloDayOneOnly] = useState(false);
  const [datevOnly, setDatevOnly] = useState(false);
  const [freeTierOnly, setFreeTierOnly] = useState(false);
  const [showTypes, setShowTypes] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const filtered = useMemo(() => {
    return BIZ_CARDS.filter((c) => {
      if (activeSegment !== "all" && c.segment !== activeSegment) return false;
      if (noSchufaOnly && c.schufa) return false;
      if (soloDayOneOnly && !c.soloDayOne) return false;
      if (datevOnly && !c.datevNative) return false;
      if (freeTierOnly && !c.hasFreeTier) return false;
      return true;
    });
  }, [activeSegment, noSchufaOnly, soloDayOneOnly, datevOnly, freeTierOnly]);

  const segmentCounts = useMemo(() => {
    const counts: Record<CardSegment, number> = {
      solo: 0,
      team: 0,
      premium: 0,
      international: 0,
    };
    BIZ_CARDS.forEach((c) => counts[c.segment]++);
    return counts;
  }, []);

  return (
    <CockpitShell
      eyebrow="DE-Geschäftskreditkarten · Stand Mai 2026"
      title="Geschäftskreditkarten-Vergleich für Gründer"
      subtitle="12 Karten/Spend-Cards für Selbstständige & Firmen — gefiltert nach Gründer-Typ. Charge (Liquidität) vs. Debit (SCHUFA-frei) vs. echte Kreditlinie. Mit DATEV-Anbindung, FX-Gebühr, SCHUFA-Hürde & echten Watchouts. Quellen: Anbieter-Pricing-Seiten + Finanzfluss. Konditionen vor Antrag verifizieren."
    >
      {/* ===== TOP-EMPFEHLUNG: AMEX BUSINESS ===== */}
      <div className="rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-yellow-500/5 p-4 md:p-5 mb-5">
        <div className="flex items-center gap-2 mb-1">
          <Award className="h-5 w-5 text-amber-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Unsere Empfehlung für Gründer
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Für die meisten Gründer ist eine <strong className="text-foreground">American Express
          Business</strong> die beste Wahl: Das <strong className="text-foreground">Zahlungsziel von
          bis zu 50–58 Tagen</strong> überbrückt Ad-Spend &amp; Wareneinkauf bis zur Abrechnung
          (echter Cashflow-Hebel), dazu Membership-Rewards-Punkte, starke Reise-/Mietwagen-
          Versicherungen und bis zu 99 kostenlose Zusatzkarten — alles, was Debit-Karten nicht
          bieten.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* GOLD — Primär */}
          <div className="rounded-xl border-2 border-amber-500/50 bg-card p-4 flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                <Award className="h-3 w-3" /> Top-Empfehlung
              </span>
              <span className="text-xs font-bold">175 € / Jahr</span>
            </div>
            <h3 className="font-bold text-lg mt-1">Amex Business Gold</h3>
            <p className="text-xs text-muted-foreground mb-2">
              Der beste Allrounder für die meisten Gründer.
            </p>
            <ul className="text-xs space-y-1 text-muted-foreground mb-3 flex-1">
              <li className="flex gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" /> bis 50 Tage zinsfreies Zahlungsziel</li>
              <li className="flex gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" /> 75.000 MR-Punkte Willkommensbonus (Aktion)</li>
              <li className="flex gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" /> starke Reise- &amp; Mietwagen-Versicherung</li>
              <li className="flex gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" /> 1. Jahr oft beitragsfrei · bis 99 Zusatzkarten gratis</li>
            </ul>
            <a
              href={AMEX_REFERRAL.gold}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm px-4 py-2.5 transition-colors"
            >
              Amex Gold beantragen <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* PLATINUM — Premium */}
          <div className="rounded-xl border-2 border-slate-400/50 bg-card p-4 flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-700 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                <Crown className="h-3 w-3" /> Premium
              </span>
              <span className="text-xs font-bold">850 € / Jahr</span>
            </div>
            <h3 className="font-bold text-lg mt-1">Amex Business Platinum</h3>
            <p className="text-xs text-muted-foreground mb-2">
              Für Vielreiser &amp; maximale Liquidität.
            </p>
            <ul className="text-xs space-y-1 text-muted-foreground mb-3 flex-1">
              <li className="flex gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" /> bis 58 Tage zinsfreies Zahlungsziel</li>
              <li className="flex gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" /> bis 200.000 MR-Punkte Willkommensbonus (Aktion)</li>
              <li className="flex gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" /> umfangreichstes Versicherungspaket am Markt</li>
              <li className="flex gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" /> Lounge-Zugang (Kooperation bis 30.09.2026)</li>
            </ul>
            <a
              href={AMEX_REFERRAL.platinum}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-sm px-4 py-2.5 transition-colors"
            >
              Amex Platinum beantragen <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
          Hinweis: Amex ist eine Charge-Card mit Bonitätsprüfung (SCHUFA ohne Negativeintrag) und
          setzt ein bestehendes Geschäft voraus. Wenn du SCHUFA-frei oder ohne Historie ab Tag 1
          startest, findest du unten passende Debit-Alternativen (Qonto, Finom, Vivid …). Die Amex-
          Links sind Empfehlungs-/Affiliate-Links.
        </p>
      </div>

      {/* ===== SEGMENT-SWITCHER ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        {(Object.entries(SEGMENT_META) as [CardSegment, typeof SEGMENT_META[CardSegment]][]).map(
          ([key, meta]) => {
            const active = activeSegment === key;
            return (
              <button
                key={key}
                onClick={() => setActiveSegment(key)}
                className={`rounded-2xl border-2 p-4 text-left transition-all ${
                  active
                    ? "border-accent-blue bg-accent-blue/5 shadow-md"
                    : "border-border bg-card hover:border-accent-blue/40"
                }`}
              >
                <div className="text-2xl mb-1">{meta.emoji}</div>
                <div className="font-bold text-sm">{meta.label}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">
                  {segmentCounts[key]} Karten
                </div>
              </button>
            );
          },
        )}
      </div>

      {/* Active Segment Description */}
      {activeSegment !== "all" && (
        <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4 mb-4 text-sm">
          {SEGMENT_META[activeSegment].description}
        </div>
      )}

      {/* ===== FILTER-CHIPS ===== */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <button
          onClick={() => setActiveSegment("all")}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            activeSegment === "all"
              ? "bg-accent-blue text-primary-foreground"
              : "border border-border bg-card hover:bg-secondary"
          }`}
        >
          Alle {BIZ_CARDS.length} Karten
        </button>
        <button
          onClick={() => setNoSchufaOnly((v) => !v)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            noSchufaOnly ? "bg-emerald-500 text-white" : "border border-border bg-card hover:bg-secondary"
          }`}
        >
          Nur SCHUFA-frei
        </button>
        <button
          onClick={() => setSoloDayOneOnly((v) => !v)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            soloDayOneOnly ? "bg-emerald-500 text-white" : "border border-border bg-card hover:bg-secondary"
          }`}
        >
          Solo ab Tag 1
        </button>
        <button
          onClick={() => setDatevOnly((v) => !v)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            datevOnly ? "bg-emerald-500 text-white" : "border border-border bg-card hover:bg-secondary"
          }`}
        >
          Native DATEV
        </button>
        <button
          onClick={() => setFreeTierOnly((v) => !v)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            freeTierOnly ? "bg-emerald-500 text-white" : "border border-border bg-card hover:bg-secondary"
          }`}
        >
          0 €-Einstieg
        </button>
        <span className="text-xs text-muted-foreground ml-2">→ {filtered.length} Treffer</span>
      </div>

      {/* ===== KARTEN-GRID ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
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
                  isStar ? "border-emerald-500/40 bg-emerald-500/5" : "border-border bg-card"
                }`}
              >
                <div className="flex items-start justify-between mb-2 gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="truncate">{card.name}</span>
                    </h3>
                    <div className="text-[11px] text-muted-foreground">
                      {card.issuer} · {card.network}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-muted-foreground">Preis</div>
                    <div
                      className={`font-bold text-sm ${
                        card.hasFreeTier ? "text-emerald-700" : "text-foreground"
                      }`}
                    >
                      {card.hasFreeTier ? "ab 0 €" : card.annualEur ? `${card.annualEur} €/J` : "auf Anfrage"}
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

                {/* Preis-Detail + Rewards */}
                <div className="rounded-lg bg-secondary/40 p-2 mb-2 text-xs space-y-1">
                  <div>
                    <span className="text-muted-foreground">Tarif: </span>
                    {card.priceLabel}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rewards: </span>
                    {card.rewards}
                  </div>
                  {card.paymentTerm && (
                    <div>
                      <span className="text-muted-foreground">Zahlungsziel: </span>
                      {card.paymentTerm}
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">FX-Gebühr: </span>
                    {card.fxFee}
                  </div>
                  {card.signupBonus && (
                    <div className="text-accent-blue font-medium">🎁 {card.signupBonus}</div>
                  )}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1 mb-2">
                  <Badge variant="outline" className={`text-[10px] ${cardTypeBadge[card.cardType]}`}>
                    {card.cardType}
                  </Badge>
                  {!card.schufa && (
                    <Badge variant="outline" className="text-[10px] text-emerald-700 border-emerald-500/30 bg-emerald-500/5">
                      SCHUFA-frei
                    </Badge>
                  )}
                  {card.schufa && (
                    <Badge variant="outline" className="text-[10px] text-amber-700 border-amber-500/30 bg-amber-500/5">
                      Bonität/SCHUFA nötig
                    </Badge>
                  )}
                  {card.soloDayOne && (
                    <Badge variant="outline" className="text-[10px] text-blue-700 border-blue-500/30 bg-blue-500/5">
                      Solo ab Tag 1
                    </Badge>
                  )}
                  {card.datevNative && (
                    <Badge variant="outline" className="text-[10px] text-purple-700 border-purple-500/30 bg-purple-500/5">
                      Native DATEV
                    </Badge>
                  )}
                </div>

                {/* Wer + Zusatzkarten */}
                <div className="text-[11px] text-muted-foreground space-y-0.5 mb-2">
                  <div>
                    <span className="font-semibold text-foreground/70">Wer: </span>
                    {card.who}
                  </div>
                  <div>
                    <span className="font-semibold text-foreground/70">Zusatzkarten: </span>
                    {card.extraCards}
                  </div>
                  {card.insurance && (
                    <div>
                      <span className="font-semibold text-foreground/70">Versicherung: </span>
                      {card.insurance}
                    </div>
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

                {/* Data-Note */}
                {card.dataNote && (
                  <div className="mt-2 rounded bg-amber-500/10 border border-amber-500/20 p-1.5 text-[10px] text-amber-800 flex items-start gap-1.5">
                    <Info className="h-3 w-3 shrink-0 mt-0.5" />
                    <span>{card.dataNote}</span>
                  </div>
                )}

                {/* Link */}
                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-accent-blue hover:underline mt-2"
                >
                  Zur Anbieter-Seite <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            );
          })
        )}
      </div>

      {/* ===== KARTEN-TYPEN ERKLÄRT ===== */}
      <CollapsiblePanel
        open={showTypes}
        onToggle={() => setShowTypes((v) => !v)}
        icon={<Layers className="h-5 w-5 text-blue-700" />}
        title="Charge vs. Debit vs. Kreditkarte vs. Prepaid — was heißt das?"
        subtitle="Der wichtigste Unterschied: Liquiditätsvorteil vs. SCHUFA-Hürde"
        colorClass="border-blue-500/30 bg-blue-500/5"
      >
        <div className="space-y-2">
          {[
            {
              t: "Charge-Card",
              d: "Du gibst aus und zahlst am Monatsende alles auf einmal zurück (Zahlungsziel bis zu ~58 Tage). Überbrückt Ad-Spend & Wareneinkauf bis zur Abrechnung — echter Cashflow-Hebel. Braucht Bonitätsprüfung. Hier: Amex.",
            },
            {
              t: "Echte Kreditkarte (revolvierend / Kreditlinie)",
              d: "Feste Kreditlinie, Rückzahlung optional gestreckt. Bei Moss bis 2,5 Mio €. SCHUFA-/Bonitätsprüfung Standard — eher für Firmen mit Historie.",
            },
            {
              t: "Debit-Card",
              d: "Bucht sofort vom Guthaben ab — du kannst nur ausgeben, was auf dem Konto liegt. Kein Liquiditätsvorteil, aber KEIN SCHUFA-Risiko → für Solo/Freelancer ab Tag 1. Qonto, Vivid, Wise, Revolut, Finom, Pleo.",
            },
            {
              t: "Prepaid",
              d: "Karte wird vorab aufgeladen, keine persönliche Haftung, keine Kreditlinie. Typisch für Team-Spend-Management. Spendesk.",
            },
          ].map((row) => (
            <div key={row.t} className="rounded-xl border border-border bg-card p-3">
              <div className="font-semibold text-sm mb-0.5">{row.t}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{row.d}</div>
            </div>
          ))}
        </div>
      </CollapsiblePanel>

      {/* ===== ENTSCHEIDUNGS-HILFE ===== */}
      <CollapsiblePanel
        open={showGuide}
        onToggle={() => setShowGuide((v) => !v)}
        icon={<Compass className="h-5 w-5 text-emerald-700" />}
        title="Welche Karte für welchen Gründer-Typ?"
        subtitle={`${DECISION_GUIDE.length} Profile mit konkreter Empfehlung + Begründung`}
        colorClass="border-emerald-500/30 bg-emerald-500/5"
      >
        <div className="space-y-2">
          {DECISION_GUIDE.map((g, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-3">
              <div className="font-semibold text-sm mb-1 flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                {g.profile}
              </div>
              <div className="text-sm text-accent-blue font-medium pl-6">→ {g.pick}</div>
              <div className="text-xs text-muted-foreground leading-relaxed pl-6 mt-0.5">{g.why}</div>
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
                Konditionen, Gebühren & Boni ändern sich laufend — Werte Stand Mai 2026, vor Antrag
                auf der Anbieter-Seite verifizieren.
              </li>
              <li>
                Amex-Willkommensboni sind Aktionswerte (keine Dauerkonditionen) und an Mindest-Umsätze
                gebunden.
              </li>
              <li>
                Payhawk &amp; Spendesk veröffentlichen keine Preise → „auf Anfrage". Revolut-Tarife wurden
                3/2026 geändert, vor Wahl gegenprüfen.
              </li>
              <li>
                Keine Steuer-/Finanzberatung (StBerG) — diese Seite ist eine kuratierte Orientierung,
                keine Empfehlung im aufsichtsrechtlichen Sinn.
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

export default BusinessCreditCards;
