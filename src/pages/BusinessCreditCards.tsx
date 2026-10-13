import { useMemo, useState, type ElementType } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Callout, EmptyState, ToneBadge, ToolSection, stripEmoji, type Tone } from "@/components/cockpit/kit";
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
  ChevronDown,
  Gift,
  SlidersHorizontal,
} from "lucide-react";

const cardTypeTone: Record<string, Tone> = {
  Charge: "accent",
  Debit: "info",
  Kreditkarte: "success",
  Prepaid: "warning",
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

  const filterChip = (active: boolean) =>
    `inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
      active
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border bg-card text-foreground/80 hover:border-foreground/25 hover:text-foreground"
    }`;

  return (
    <CockpitShell
      eyebrow="DE-Geschäftskreditkarten · Stand Mai 2026"
      title="Geschäftskreditkarten-Vergleich für Gründer"
      subtitle="12 Karten und Spend-Cards für Selbstständige und Firmen, gefiltert nach Gründer-Typ: Charge (Liquidität), Debit (SCHUFA-frei) oder echte Kreditlinie. Mit DATEV-Anbindung, FX-Gebühr, SCHUFA-Hürde und echten Watchouts. Quellen: Preisseiten der Anbieter und Finanzfluss. Konditionen vor dem Antrag prüfen."
    >
      {/* ===== TOP-EMPFEHLUNG: AMEX BUSINESS ===== */}
      <ToolSection
        title="Unsere Empfehlung für Gründer"
        icon={Award}
        className="mb-6"
        description={
          <>
            Für die meisten Gründer ist eine <strong className="text-foreground">American Express Business</strong> die beste Wahl:
            Das <strong className="text-foreground">Zahlungsziel von bis zu 50 bis 58 Tagen</strong> überbrückt Ad-Spend und
            Wareneinkauf bis zur Abrechnung (echter Cashflow-Hebel). Dazu Membership-Rewards-Punkte, starke Reise- und
            Mietwagen-Versicherungen und bis zu 99 kostenlose Zusatzkarten, alles, was Debit-Karten nicht bieten.
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* GOLD — Primär */}
          <div className="flex flex-col rounded-2xl bg-ink p-5 text-primary-foreground shadow-soft">
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-0.5 text-xs font-semibold text-brand-green-glow">
                <Award className="h-3.5 w-3.5" aria-hidden="true" /> Top-Empfehlung
              </span>
              <span className="text-sm font-semibold tabular">175 € / Jahr</span>
            </div>
            <h3 className="mt-2 text-lg font-semibold tracking-tight">Amex Business Gold</h3>
            <p className="mb-3 text-sm text-primary-foreground/70">Der beste Allrounder für die meisten Gründer.</p>
            <ul className="mb-4 flex-1 space-y-1.5 text-sm text-primary-foreground/85">
              {[
                "bis 50 Tage zinsfreies Zahlungsziel",
                "75.000 MR-Punkte Willkommensbonus (Aktion)",
                "starke Reise- und Mietwagen-Versicherung",
                "1. Jahr oft beitragsfrei · bis 99 Zusatzkarten gratis",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green-glow" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
            <a
              href={AMEX_REFERRAL.gold}
              target="_blank"
              rel="noopener noreferrer"
              className="press inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-card px-4 text-sm font-semibold text-foreground transition-colors hover:bg-card/90"
            >
              Amex Gold beantragen <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* PLATINUM — Premium */}
          <div className="flex flex-col rounded-2xl border border-border bg-card p-5">
            <div className="mb-1 flex items-center justify-between gap-2">
              <ToneBadge tone="accent">
                <Crown className="h-3 w-3" aria-hidden="true" /> Premium
              </ToneBadge>
              <span className="text-sm font-semibold tabular">850 € / Jahr</span>
            </div>
            <h3 className="mt-2 text-lg font-semibold tracking-tight">Amex Business Platinum</h3>
            <p className="mb-3 text-sm text-muted-foreground">Für Vielreiser und maximale Liquidität.</p>
            <ul className="mb-4 flex-1 space-y-1.5 text-sm text-muted-foreground">
              {[
                { t: "bis 58 Tage zinsfreies Zahlungsziel" },
                { t: "bis 200.000 MR-Punkte Willkommensbonus (Aktion)" },
                { t: "umfangreichstes Versicherungspaket am Markt" },
                // Datierte Vorteile laufen automatisch aus, damit keine abgelaufenen Angebote beworben werden
                { t: "Lounge-Zugang (Kooperation bis 30.09.2026)", bis: "2026-09-30" },
              ]
                .filter((v) => !v.bis || new Date().toISOString().slice(0, 10) <= v.bis)
                .map(({ t }) => (
                <li key={t} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
            <a
              href={AMEX_REFERRAL.platinum}
              target="_blank"
              rel="noopener noreferrer"
              className="press inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Amex Platinum beantragen <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Hinweis: Amex ist eine Charge-Card mit Bonitätsprüfung (SCHUFA ohne Negativeintrag) und setzt ein bestehendes Geschäft
          voraus. Startest du SCHUFA-frei oder ohne Historie ab Tag 1, findest du unten passende Debit-Alternativen (Qonto, Finom,
          Vivid …). Die Amex-Links sind Empfehlungs- bzw. Affiliate-Links.
        </p>
      </ToolSection>

      {/* ===== SEGMENT-SWITCHER + FILTER ===== */}
      <ToolSection title="Karten filtern" icon={SlidersHorizontal} className="mb-6">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {(Object.entries(SEGMENT_META) as [CardSegment, typeof SEGMENT_META[CardSegment]][]).map(([key, meta]) => {
            const active = activeSegment === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveSegment(key)}
                className={`rounded-xl border p-3.5 text-left transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-foreground/25"
                }`}
              >
                <span className="block text-sm font-semibold">{stripEmoji(meta.label)}</span>
                <span className={`mt-0.5 block text-xs tabular ${active ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                  {segmentCounts[key]} Karten
                </span>
              </button>
            );
          })}
        </div>

        {activeSegment !== "all" && (
          <Callout tone="accent" icon={false} className="mt-3">
            {SEGMENT_META[activeSegment].description}
          </Callout>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/70 pt-4">
          <button type="button" aria-pressed={activeSegment === "all"} onClick={() => setActiveSegment("all")} className={filterChip(activeSegment === "all")}>
            Alle {BIZ_CARDS.length} Karten
          </button>
          <button type="button" aria-pressed={noSchufaOnly} onClick={() => setNoSchufaOnly((v) => !v)} className={filterChip(noSchufaOnly)}>
            Nur SCHUFA-frei
          </button>
          <button type="button" aria-pressed={soloDayOneOnly} onClick={() => setSoloDayOneOnly((v) => !v)} className={filterChip(soloDayOneOnly)}>
            Solo ab Tag 1
          </button>
          <button type="button" aria-pressed={datevOnly} onClick={() => setDatevOnly((v) => !v)} className={filterChip(datevOnly)}>
            Native DATEV
          </button>
          <button type="button" aria-pressed={freeTierOnly} onClick={() => setFreeTierOnly((v) => !v)} className={filterChip(freeTierOnly)}>
            0 €-Einstieg
          </button>
          <span className="ml-auto text-sm text-muted-foreground tabular" aria-live="polite">
            {filtered.length} Treffer
          </span>
        </div>
      </ToolSection>

      {/* ===== KARTEN-GRID ===== */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={CreditCard}
          title="Keine Karten passen zu deinen Filtern."
          description="Nimm einen Filter heraus oder wechsle zu „Alle Karten“."
          className="mb-6"
        />
      ) : (
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((card) => {
            const isStar = card.bestFor.startsWith("★");
            return (
              <article
                key={card.id}
                className={`flex flex-col rounded-2xl border p-5 shadow-card ${
                  isStar ? "border-success/30 bg-success-soft/50" : "border-border bg-card"
                }`}
              >
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="flex items-center gap-2 text-base font-semibold">
                      <CreditCard className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                      <span className="truncate">{card.name}</span>
                    </h3>
                    <div className="text-xs text-muted-foreground">
                      {card.issuer} · {card.network}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-xs text-muted-foreground">Preis</div>
                    <div className={`text-sm font-semibold tabular ${card.hasFreeTier ? "text-success" : "text-foreground"}`}>
                      {card.hasFreeTier ? "ab 0 €" : card.annualEur ? `${card.annualEur} €/J` : "auf Anfrage"}
                    </div>
                  </div>
                </div>

                <p className={`mb-3 text-sm ${isStar ? "font-semibold text-foreground" : "text-foreground/90"}`}>{card.bestFor}</p>

                <dl className="mb-3 space-y-1 rounded-xl bg-secondary/60 p-3 text-xs">
                  <div>
                    <dt className="inline text-muted-foreground">Tarif: </dt>
                    <dd className="inline">{card.priceLabel}</dd>
                  </div>
                  <div>
                    <dt className="inline text-muted-foreground">Rewards: </dt>
                    <dd className="inline">{card.rewards}</dd>
                  </div>
                  {card.paymentTerm && (
                    <div>
                      <dt className="inline text-muted-foreground">Zahlungsziel: </dt>
                      <dd className="inline">{card.paymentTerm}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="inline text-muted-foreground">FX-Gebühr: </dt>
                    <dd className="inline">{card.fxFee}</dd>
                  </div>
                  {card.signupBonus && (
                    <div className="flex items-start gap-1.5 font-medium text-accent-blue">
                      <Gift className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {card.signupBonus}
                    </div>
                  )}
                </dl>

                <div className="mb-3 flex flex-wrap gap-1.5">
                  <ToneBadge tone={cardTypeTone[card.cardType] ?? "neutral"}>{card.cardType}</ToneBadge>
                  {!card.schufa && <ToneBadge tone="success">SCHUFA-frei</ToneBadge>}
                  {card.schufa && <ToneBadge tone="warning">Bonität/SCHUFA nötig</ToneBadge>}
                  {card.soloDayOne && <ToneBadge tone="info">Solo ab Tag 1</ToneBadge>}
                  {card.datevNative && <ToneBadge tone="accent">Native DATEV</ToneBadge>}
                </div>

                <div className="mb-3 space-y-0.5 text-xs text-muted-foreground">
                  <div>
                    <span className="font-medium text-foreground/80">Wer: </span>
                    {card.who}
                  </div>
                  <div>
                    <span className="font-medium text-foreground/80">Zusatzkarten: </span>
                    {card.extraCards}
                  </div>
                  {card.insurance && (
                    <div>
                      <span className="font-medium text-foreground/80">Versicherung: </span>
                      {card.insurance}
                    </div>
                  )}
                </div>

                {card.watchouts.length > 0 && (
                  <details className="group text-xs">
                    <summary className="flex cursor-pointer list-none items-center gap-1 font-medium text-warning [&::-webkit-details-marker]:hidden">
                      <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" /> {card.watchouts.length} Watchout
                      {card.watchouts.length === 1 ? "" : "s"}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-muted-foreground">
                      {card.watchouts.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </details>
                )}

                {card.dataNote && (
                  <Callout tone="warning" icon={Info} className="mt-3 p-2.5 text-xs">
                    {card.dataNote}
                  </Callout>
                )}

                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium text-accent-blue hover:underline"
                >
                  Zur Anbieter-Seite <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      )}

      {/* ===== KARTEN-TYPEN ERKLÄRT ===== */}
      <CollapsiblePanel
        open={showTypes}
        onToggle={() => setShowTypes((v) => !v)}
        icon={Layers}
        title="Charge vs. Debit vs. Kreditkarte vs. Prepaid: was heißt das?"
        subtitle="Der wichtigste Unterschied: Liquiditätsvorteil oder SCHUFA-Hürde"
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
            <div key={row.t} className="rounded-xl border border-border bg-secondary/40 p-3.5">
              <div className="mb-0.5 text-sm font-semibold">{row.t}</div>
              <div className="text-sm leading-relaxed text-muted-foreground">{row.d}</div>
            </div>
          ))}
        </div>
      </CollapsiblePanel>

      {/* ===== ENTSCHEIDUNGS-HILFE ===== */}
      <CollapsiblePanel
        open={showGuide}
        onToggle={() => setShowGuide((v) => !v)}
        icon={Compass}
        title="Welche Karte für welchen Gründer-Typ?"
        subtitle={`${DECISION_GUIDE.length} Profile mit konkreter Empfehlung und Begründung`}
      >
        <div className="space-y-2">
          {DECISION_GUIDE.map((g, i) => (
            <div key={i} className="rounded-xl border border-border bg-secondary/40 p-3.5">
              <div className="mb-1 flex items-start gap-2 text-sm font-semibold">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                {g.profile}
              </div>
              <div className="flex items-start gap-1 pl-6 text-sm font-medium text-accent-blue">
                <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {g.pick}
              </div>
              <div className="mt-0.5 pl-6 text-sm leading-relaxed text-muted-foreground">{g.why}</div>
            </div>
          ))}
        </div>
      </CollapsiblePanel>

      {/* ===== DISCLAIMER ===== */}
      <Callout tone="warning" title="Wichtige Hinweise" icon={AlertTriangle} className="mt-6">
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>Konditionen, Gebühren und Boni ändern sich laufend. Werte Stand Mai 2026, vor dem Antrag auf der Anbieter-Seite prüfen.</li>
          <li>Amex-Willkommensboni sind Aktionswerte (keine Dauerkonditionen) und an Mindestumsätze gebunden.</li>
          <li>
            Payhawk und Spendesk veröffentlichen keine Preise, daher „auf Anfrage“. Revolut hat die Tarife 3/2026 geändert, vor der
            Wahl gegenprüfen.
          </li>
          <li>
            Keine Steuer- oder Finanzberatung (StBerG). Diese Seite ist eine kuratierte Orientierung, keine Empfehlung im
            aufsichtsrechtlichen Sinn.
          </li>
        </ul>
      </Callout>
    </CockpitShell>
  );
};

// ===== HELPER: Collapsible Panel =====
const CollapsiblePanel = ({
  open,
  onToggle,
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  open: boolean;
  onToggle: () => void;
  icon: ElementType;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => (
  <div className="mb-3 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
    <button
      type="button"
      aria-expanded={open}
      onClick={onToggle}
      className="flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-secondary/40 md:px-6"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-blue">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-base font-semibold">{title}</span>
        <span className="block text-sm text-muted-foreground">{subtitle}</span>
      </span>
      <ChevronDown
        className={`mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        aria-hidden="true"
      />
    </button>
    {open && <div className="border-t border-border/70 px-5 py-4 md:px-6">{children}</div>}
  </div>
);

export default BusinessCreditCards;
