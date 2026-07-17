import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ExternalLink,
  PackageSearch,
  Bot,
  TrendingUp,
  PiggyBank,
  ClipboardCheck,
  RefreshCw,
  ShieldCheck,
  Boxes,
  Undo2,
} from "lucide-react";

const ARBITRAGEX_URL = "https://arbitrage.anwaltx.de";

/** Prominenter Bridge-CTA nach Arbitragex (öffnet in neuem Tab). */
const ArbitragexCta = ({ variant = "solid" }: { variant?: "solid" | "outline" }) => (
  <a href={ARBITRAGEX_URL} target="_blank" rel="noopener noreferrer">
    <Button
      size="lg"
      className={
        variant === "solid"
          ? "group rounded-full h-14 px-8 bg-gradient-primary text-primary-foreground hover:opacity-95 shadow-glow text-base font-semibold"
          : "group rounded-full h-14 px-8 border-2 hover:bg-accent-blue/5 hover:border-accent-blue text-base font-semibold"
      }
      variant={variant === "outline" ? "outline" : "default"}
    >
      Jetzt in Arbitragex starten
      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
    </Button>
  </a>
);

const kpis = [
  {
    icon: PiggyBank,
    stat: "Ø 1–3 %",
    label: "vom Umsatz zurückholen",
    sub: "Verlorene FBA-Ware & unterbezahlte Erstattungen summieren sich – vollautomatisch aufgespürt.",
  },
  {
    icon: RefreshCw,
    stat: "24/7",
    label: "Case-Poller läuft automatisch",
    sub: "Erkennt neue Erstattungs-Fälle laufend und reicht sie fertig vorbereitet ein.",
  },
  {
    icon: Bot,
    stat: "KI",
    label: "beantwortet Amazon-Rückfragen",
    sub: "Antwortet auf Seller-Support-Nachfragen im Case-Thread mit passender Begründung.",
  },
  {
    icon: TrendingUp,
    stat: "Sellerboard",
    label: "Gewinn, Bestand & Erstattungen",
    sub: "Profit-Analytics, P&L und Bestandsübersicht in einem – ohne zweites Tool.",
  },
];

const findings = [
  {
    icon: Boxes,
    title: "Verlorene & beschädigte FBA-Ware",
    text: "Bestand, den Amazon im Lager verliert oder beschädigt, ohne dich automatisch zu erstatten – Stück für Stück nachverfolgt.",
  },
  {
    icon: PackageSearch,
    title: "Wareneingangs-Differenzen",
    text: "Eingesendete Mengen, die im Seller-Central nie vollständig verbucht wurden – abgeglichen und reklamiert.",
  },
  {
    icon: Undo2,
    title: "Beschädigte & verlorene Retouren",
    text: "Kundenretouren, die nie im Bestand ankommen oder beschädigt zurückgebucht werden – als Erstattungsfall erkannt.",
  },
  {
    icon: PiggyBank,
    title: "Unterbezahlte Erstattungen",
    text: "Fälle, in denen Amazon zu wenig erstattet hat – neu berechnet und mit korrektem Betrag nachgefordert.",
  },
];

const steps = [
  {
    n: 1,
    title: "Seller-Account verbinden",
    text: "Arbitragex liest per SP-API Bestand, Sendungen, Retouren und Erstattungen deines Amazon-Kontos ein.",
  },
  {
    n: 2,
    title: "Diskrepanzen automatisch finden",
    text: "Die Engine gleicht Soll und Ist ab und deckt jede erstattungsfähige Differenz auf – ohne manuelles Excel-Wühlen.",
  },
  {
    n: 3,
    title: "Fertige Cases mit KI-Text einreichen",
    text: "Zu jedem Fund entsteht ein einreichfertiger Amazon-Case inkl. Begründung. Der Poller reicht ein und die KI beantwortet Rückfragen.",
  },
  {
    n: 4,
    title: "Auszahlungen & Gewinn im Blick",
    text: "Erstattungen, Gewinn, PPC, Ausgaben und P&L laufen wie in Sellerboard in einem Dashboard zusammen.",
  },
];

const AmazonErstattungen = () => (
  <CockpitShell
    eyebrow="Amazon Erstattungen & Seller-Automation"
    title="Hol dir das Geld zurück, das Amazon dir schuldet"
    subtitle="Verlorene FBA-Ware, Wareneingangs-Differenzen, beschädigte Retouren und unterbezahlte Erstattungen werden vollautomatisch aufgespürt und als fertige Amazon-Cases mit KI-Antworten eingereicht – plus Gewinn, Bestand und Erstattungen wie in Sellerboard. Umgesetzt in unserem Seller-Tool Arbitragex."
  >
    {/* Bridge-CTA oben */}
    <div className="rounded-3xl bg-gradient-primary text-primary-foreground p-6 md:p-8 shadow-glow relative overflow-hidden mb-8">
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent-blue/30 blur-3xl" />
      <div className="relative flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
        <div className="flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-foreground/70 mb-2">
            Direkt loslegen
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            Jede Woche ohne Erstattungs-Automation ist bares Geld, das liegen bleibt.
          </h2>
          <p className="text-sm md:text-base text-primary-foreground/85 max-w-2xl">
            Die Erstattungs-Automation läuft in Arbitragex, unserem Seller-Ops-Tool. Verbinde deinen
            Amazon-Account und lass verlorene Ware, Retouren und unterbezahlte Erstattungen automatisch
            zurückholen.
          </p>
        </div>
        <div className="shrink-0 flex flex-col items-center gap-4">
          <img
            src="/mascots/felix-34-t.png"
            alt="Felix, dein KI-Gründungs-Copilot, prüft deine Erstattungen"
            loading="lazy"
            className="hidden md:block w-40 max-w-full drop-shadow-xl animate-floaty"
          />
          <a href={ARBITRAGEX_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="group rounded-full h-14 px-8 bg-card text-primary hover:bg-card/90 text-base font-semibold shadow-glow"
            >
              Jetzt in Arbitragex starten
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </div>

    {/* KPI / Proof-Tiles */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
      {kpis.map((k) => (
        <div key={k.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="h-10 w-10 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue mb-4">
            <k.icon className="h-5 w-5" />
          </div>
          <div className="text-2xl font-bold tracking-tight">{k.stat}</div>
          <div className="text-sm font-semibold mb-1.5">{k.label}</div>
          <p className="text-xs text-muted-foreground leading-relaxed">{k.sub}</p>
        </div>
      ))}
    </div>

    {/* Was es aufspürt */}
    <section className="mb-10">
      <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-1">Was automatisch aufgespürt wird</h2>
      <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
        Amazon erstattet vieles nicht von allein. Diese vier Kategorien machen den Großteil des Geldes aus,
        das den meisten Sellern durch die Lappen geht.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {findings.map((f) => (
          <div key={f.title} className="rounded-2xl border border-border bg-card p-5 flex gap-4">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground">
              <f.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* So funktioniert's */}
    <section className="mb-10">
      <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-5">So funktioniert's</h2>
      <ol className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {steps.map((s) => (
          <li key={s.n} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-blue/10 text-sm font-bold text-accent-blue">
                {s.n}
              </span>
              <h3 className="font-semibold text-sm">{s.title}</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>

    {/* Vertrauen / Risk-Reversal */}
    <div className="flex flex-wrap gap-2 mb-10">
      {[
        { icon: ShieldCheck, label: "Offizielle Amazon SP-API" },
        { icon: ClipboardCheck, label: "Fertige Cases – du prüfst nur" },
        { icon: RefreshCw, label: "Automatischer Case-Poller" },
        { icon: Bot, label: "KI antwortet auf Rückfragen" },
      ].map((c) => (
        <div
          key={c.label}
          className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-card"
        >
          <c.icon className="h-3.5 w-3.5 text-accent-blue" />
          {c.label}
        </div>
      ))}
    </div>

    {/* Bridge-CTA unten */}
    <div className="rounded-3xl border border-accent-blue/20 bg-accent-blue/5 p-8 md:p-10 text-center">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
        Bereit, deine Erstattungen einzusammeln?
      </h2>
      <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-7">
        Arbitragex verbindet deinen Amazon-Seller-Account, findet jede erstattungsfähige Differenz und reicht
        die Cases für dich ein. Starte jetzt – die erste Analyse deines Kontos zeigt dir sofort, was du liegen
        gelassen hast.
      </p>
      <div className="flex justify-center">
        <ArbitragexCta />
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Öffnet arbitrage.anwaltx.de in einem neuen Tab.
      </p>
    </div>
  </CockpitShell>
);

export default AmazonErstattungen;
