import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GuideCard } from "@/components/dashboard/GuideCard";
import { ContinueLearning } from "@/components/dashboard/ContinueLearning";
import { PLAYBOOKS } from "@/data/playbooks";
import { useGuideStart } from "@/hooks/useGuideStart";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Clock,
  CreditCard,
  ListChecks,
  Loader2,
  Search,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { EmptyState } from "@/components/cockpit/kit";
import { Seo } from "@/components/Seo";
import { cn } from "@/lib/utils";

const FILTERS = [
  { id: "all", label: "Alle" },
  { id: "Einfach", label: "Einfach" },
  { id: "Mittel", label: "Mittel" },
  { id: "Komplex", label: "Komplex" },
];

interface LernPfad {
  id: string;
  label: string;
  kurz: string;
  icon: typeof BookOpen;
  slugs?: string[];
}

const LERNPFADE: LernPfad[] = [
  { id: "all", label: "Alle Kurse", kurz: "Alle Themen", icon: BookOpen },
  {
    id: "start",
    label: "Start & Rechtsform",
    kurz: "Gewerbe, UG, GmbH, U18",
    icon: Building2,
    slugs: [
      "einzelunternehmen-gruendung",
      "kleinunternehmer",
      "elster-fse-fillout",
      "freiberufler-anmelden",
      "ug-gruendung",
      "gmbh-gruendung",
      "gbr-gruenden",
      "holding",
      "buchhaltung-setup",
    ],
  },
  {
    id: "web-app",
    label: "Website & App",
    kurz: "Von Idee bis Live",
    icon: Smartphone,
    slugs: [
      "erste-webseite-seo",
      "eigene-app-launchen",
      "b2b-saas-spezifika",
      "seo-step-by-step",
      "marke-anmelden",
      "dsgvo-shop",
    ],
  },
  {
    id: "ecom",
    label: "Shop & Marktplätze",
    kurz: "Amazon, Shopify, TikTok",
    icon: ShoppingBag,
    slugs: [
      "amazon-fba-launch",
      "amazon-verkaeuferkonto-setup",
      "shopify-launch",
      "tiktok-shop-starten",
      "tiktok-shop-launch",
      "kaufland-launch",
      "reseller-marketplace-setup",
      "brand-owner-d2c-setup",
      "gpsr-compliance",
      "weee-registrierung",
      "oss-anmeldung",
      "dac7",
    ],
  },
  {
    id: "us-intl",
    label: "US & Amex US",
    kurz: "Global Transfer, LLC, HK",
    icon: CreditCard,
    slugs: ["amex-us-beantragen", "us-llc", "us-accounts-deutscher", "hk-limited", "wegzugsbesteuerung"],
  },
  {
    id: "creator",
    label: "Creator & Coach",
    kurz: "Content, Kurse, Agentur",
    icon: Sparkles,
    slugs: [
      "creator-setup",
      "creator-influencer-setup",
      "creator-tiktok-instagram",
      "creator-youtube-longform",
      "agency-services-setup",
      "coach-experte-setup",
      "coach-online-course",
    ],
  },
  {
    id: "wachstum",
    label: "Team & Finanzierung",
    kurz: "Hiring, Förderung, Exit",
    icon: Users,
    slugs: [
      "foerderung-stipendium",
      "hiring-erste-10",
      "hiring-minijob-werkstudent",
      "hiring-freelancer",
      "cashflow-forecasting",
      "insurance-stack",
      "vc-pitch-deck",
      "unternehmenskauf",
    ],
  },
];

const SPOTLIGHT_SLUGS = ["amex-us-beantragen", "eigene-app-launchen", "gmbh-gruendung"] as const;

const Playbooks = () => {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [pfad, setPfad] = useState<string>("all");
  const [spotIdx, setSpotIdx] = useState(0);
  const { start, starting } = useGuideStart();

  const activePfad = LERNPFADE.find((p) => p.id === pfad) ?? LERNPFADE[0];
  const spotlight = PLAYBOOKS.find((p) => p.slug === SPOTLIGHT_SLUGS[spotIdx]) ?? PLAYBOOKS[0];

  const list = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return PLAYBOOKS.filter((p) => {
      if (activePfad.slugs && !activePfad.slugs.includes(p.slug)) return false;
      if (filter !== "all" && p.difficulty !== filter) return false;
      if (!ql) return true;
      return (
        p.title.toLowerCase().includes(ql) ||
        p.tagline.toLowerCase().includes(ql) ||
        p.outcome.toLowerCase().includes(ql)
      );
    });
  }, [q, filter, activePfad]);

  return (
    <div className="container max-w-6xl px-4 pb-24 pt-5 md:px-6 md:pb-16 md:pt-7">
      <Seo
        title="Lern-Studio: Alle 81 Gründungs-Kurse | GründerX"
        description={`${PLAYBOOKS.length} interaktive Schritt-für-Schritt-Kurse: Gründung, Website, App, Amazon, TikTok Shop, US-LLC und Amex US.`}
        path="/playbooks"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: PLAYBOOKS.slice(0, 30).map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://gruenderx.de/playbook/preview/${p.slug}`,
            name: p.title,
          })),
        }}
      />

      {/* Heller Udemy × Studyflix Kurs-Empfehlungskopf */}
      <section className="gx-card mb-7 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-[#F4F7FC] px-6 py-3.5 md:px-7">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
            Kursbibliothek · {PLAYBOOKS.length} Kurse mit Arbeitsfenster
          </span>

          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Empfohlene Kurse">
            {SPOTLIGHT_SLUGS.map((slug, idx) => {
              const pb = PLAYBOOKS.find((x) => x.slug === slug);
              if (!pb) return null;
              return (
                <button
                  key={slug}
                  type="button"
                  role="tab"
                  aria-selected={spotIdx === idx}
                  onClick={() => setSpotIdx(idx)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                    spotIdx === idx
                      ? "bg-primary text-white shadow-sm"
                      : "bg-white text-foreground/80 ring-1 ring-border hover:text-primary",
                  )}
                >
                  {idx === 0 ? "Amex US" : idx === 1 ? "App bauen" : "GmbH"}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid items-end gap-6 p-6 md:p-7 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <h1 className="text-balance text-2xl font-bold leading-tight tracking-[-0.025em] text-primary md:text-[2rem]">
              {spotlight.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {spotlight.outcome}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 text-foreground tabular">
                <ListChecks className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                {spotlight.steps.length} Schritte
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 text-foreground">
                <Clock className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                {spotlight.duration}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-brand-green-soft px-2.5 py-1 text-brand-green tabular">
                <Zap className="h-3.5 w-3.5" aria-hidden="true" /> +{spotlight.steps.length * 100} XP
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 text-foreground">
                <Wrench className="h-3.5 w-3.5 text-accent-blue" aria-hidden="true" /> Direktes Arbeitsfenster
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Button
              size="lg"
              disabled={starting === spotlight.slug}
              onClick={() => start(spotlight.slug)}
              className="press h-11 rounded-xl bg-primary px-6 font-semibold text-white hover:bg-primary/90"
            >
              {starting === spotlight.slug ? (
                <>
                  <Loader2 className="mr-1.5 h-4 w-4 animate-spin" aria-hidden="true" /> Startet…
                </>
              ) : (
                <>
                  Kurs starten <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                </>
              )}
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="press h-11 rounded-xl px-5 font-semibold"
            >
              <Link to={`/playbook/preview/${spotlight.slug}`}>Lehrplan ansehen</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Weiterlernen */}
      <div className="mb-7">
        <ContinueLearning />
      </div>

      {/* Filter- & Such-Studio */}
      <section className="gx-card mb-7 p-4 md:p-5" aria-label="Kurse filtern">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Kurs suchen, z. B. Amex US, Website, App, GmbH, ELSTER, Amazon…"
              aria-label="Kurse suchen"
              className="h-11 rounded-xl pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "press min-h-10 rounded-xl border px-3.5 text-xs font-bold transition-colors",
                  filter === f.id
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-background text-muted-foreground hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lernpfad-Cluster */}
        <div className="mt-4 flex flex-wrap gap-2">
          {LERNPFADE.map((lp) => {
            const Icon = lp.icon;
            const active = pfad === lp.id;
            return (
              <button
                key={lp.id}
                type="button"
                aria-pressed={active}
                onClick={() => setPfad(lp.id)}
                className={cn(
                  "press inline-flex min-h-10 items-center gap-2 rounded-xl border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                  active
                    ? "border-primary bg-primary text-white shadow-sm"
                    : "border-border bg-secondary/50 text-foreground/85 hover:border-primary/40 hover:bg-secondary",
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{lp.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Kurs-Katalog */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-lg font-bold text-primary">
          {activePfad.label}{" "}
          <span className="text-sm font-medium text-muted-foreground tabular">({list.length} Kurse)</span>
        </h2>
      </div>

      {list.length === 0 ? (
        <EmptyState
          icon={Search}
          title="Kein passender Kurs gefunden"
          description="Setz den Filter zurück oder such nach einem kürzeren Begriff wie GmbH, App, Amazon oder Amex."
          action={
            <Button
              variant="outline"
              onClick={() => {
                setQ("");
                setFilter("all");
                setPfad("all");
              }}
            >
              Filter zurücksetzen
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((pb) => (
            <GuideCard key={pb.slug} pb={pb} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Playbooks;
