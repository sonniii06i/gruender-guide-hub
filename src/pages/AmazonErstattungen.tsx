import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import {
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
const ArbitragexCta = ({ variant = "solid" }: { variant?: "solid" | "light" }) => (
  <Button
    asChild
    size="lg"
    className={
      variant === "solid"
        ? "group h-12 rounded-xl bg-gradient-primary px-6 text-base font-semibold shadow-glow hover:opacity-95"
        : "group h-12 rounded-xl bg-card px-6 text-base font-semibold text-primary shadow-none hover:bg-card/90"
    }
  >
    <a href={ARBITRAGEX_URL} target="_blank" rel="noopener noreferrer">
      In Arbitragex starten
      <ExternalLink className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      <span className="sr-only">(öffnet in neuem Tab)</span>
    </a>
  </Button>
);

const kpis = [
  {
    icon: PiggyBank,
    stat: "Erstattungen",
    label: "automatisch aufspüren",
    sub: "Verlorene FBA-Ware und unterbezahlte Erstattungen summieren sich. Arbitragex sucht sie in deinen Kontodaten.",
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
    subtitle="Verlorene FBA-Ware, Wareneingangs-Differenzen, beschädigte Retouren und unterbezahlte Erstattungen werden automatisch aufgespürt und als fertige Amazon-Cases mit KI-Antworten eingereicht, dazu Gewinn, Bestand und Erstattungen wie in Sellerboard. Umgesetzt in unserem Seller-Tool Arbitragex."
  >
    {/* Bridge-CTA oben */}
    <section className="relative mb-10 overflow-hidden rounded-2xl bg-ink p-6 text-primary-foreground shadow-soft md:p-10">
      <div className="pointer-events-none absolute inset-0 bg-dots-light" aria-hidden="true" />
      <div className="relative grid items-center gap-6 md:grid-cols-[1fr,auto] md:gap-10">
        <div>
          <p className="mb-3 text-sm font-medium text-brand-green-glow">Direkt loslegen</p>
          <h2 className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
            Jede Woche ohne Erstattungs-Automation ist Geld, das liegen bleibt.
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-primary-foreground/75">
            Die Erstattungs-Automation läuft in Arbitragex, unserem Seller-Ops-Tool. Verbinde deinen Amazon-Account und
            lass verlorene Ware, Retouren und unterbezahlte Erstattungen automatisch zurückholen.
          </p>
          <div className="mt-6">
            <ArbitragexCta variant="light" />
          </div>
        </div>
        <img
          src="/mascots/felix-34-t.webp"
          alt="Felix, dein KI-Gründungs-Copilot, prüft deine Erstattungen"
          loading="lazy"
          width={160}
          height={197}
          className="hidden w-40 drop-shadow-2xl md:block"
        />
      </div>
    </section>

    {/* Funktionen */}
    <section aria-labelledby="ae-funktionen" className="mb-12">
      <h2 id="ae-funktionen" className="sr-only">Funktionen</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-blue">
              <k.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="text-xl font-semibold tracking-tight">{k.stat}</p>
            <p className="mb-1.5 text-sm font-medium">{k.label}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{k.sub}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Was es aufspürt */}
    <section className="mb-12">
      <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Was automatisch aufgespürt wird</h2>
      <p className="mb-6 mt-1.5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
        Amazon erstattet vieles nicht von allein. Diese vier Kategorien machen den Großteil des Geldes aus, das
        Sellern durch die Lappen geht.
      </p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {findings.map((f) => (
          <div key={f.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
              <f.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="mb-1 font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* So funktioniert's */}
    <section className="mb-12">
      <h2 className="mb-6 text-xl font-semibold tracking-tight md:text-2xl">So funktioniert's</h2>
      <ol className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
        {steps.map((s) => (
          <li key={s.n} className="flex gap-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-sm font-semibold tabular shadow-card">
              {s.n}
            </span>
            <div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>

    {/* Vertrauen */}
    <ul className="mb-12 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {[
        { icon: ShieldCheck, label: "Offizielle Amazon SP-API" },
        { icon: ClipboardCheck, label: "Fertige Cases, du prüfst nur" },
        { icon: RefreshCw, label: "Automatischer Case-Poller" },
        { icon: Bot, label: "KI antwortet auf Rückfragen" },
      ].map((c) => (
        <li key={c.label} className="flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-3.5 py-3 text-sm font-medium">
          <c.icon className="h-4 w-4 shrink-0 text-accent-blue" aria-hidden="true" />
          {c.label}
        </li>
      ))}
    </ul>

    {/* Bridge-CTA unten */}
    <section className="rounded-2xl border border-accent-blue/20 bg-accent/60 p-8 text-center md:p-10">
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Bereit, deine Erstattungen einzusammeln?</h2>
      <p className="mx-auto mb-7 mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
        Arbitragex verbindet deinen Amazon-Seller-Account, findet erstattungsfähige Differenzen und reicht die Cases
        für dich ein. Die erste Analyse deines Kontos zeigt dir, was du liegen gelassen hast.
      </p>
      <div className="flex justify-center">
        <ArbitragexCta />
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Öffnet arbitrage.anwaltx.de in einem neuen Tab.</p>
    </section>
  </CockpitShell>
);

export default AmazonErstattungen;
