import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { GuideCard } from "@/components/dashboard/GuideCard";
import { ContinueLearning } from "@/components/dashboard/ContinueLearning";
import { GamificationBar } from "@/components/gamification/GamificationBar";
import { PLAYBOOKS } from "@/data/playbooks";
import {
  BookOpen,
  Building2,
  CreditCard,
  Globe,
  Search,
  ShoppingBag,
  Sparkles,
  Smartphone,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChoiceGroup, EmptyState } from "@/components/cockpit/kit";
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
  { id: "all", label: "Alle Guides", kurz: "Alle Themen", icon: BookOpen },
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

const Playbooks = () => {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [pfad, setPfad] = useState<string>("all");

  const activePfad = LERNPFADE.find((p) => p.id === pfad) ?? LERNPFADE[0];

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
    <>
      <Seo
        title="Lern-Studio: Alle Gründungs-Guides | GründerX"
        description={`${PLAYBOOKS.length} interaktive Schritt-für-Schritt-Guides: Gründung, Website, App, Amazon, TikTok Shop, US-LLC und Amex US.`}
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
      <CockpitShell
        eyebrow="Lern-Studio"
        title="Alle Guides auf einen Blick"
        subtitle="Wähle dein Ziel, klick dich Schritt für Schritt durch und öffne passende Werkzeuge direkt im Guide. Jeder Schritt bringt XP."
      >
        {/* Gamification-Status */}
        <GamificationBar className="mb-6" />

        {/* Weiterlernen */}
        <div className="mb-6">
          <ContinueLearning />
        </div>

        {/* Highlight-Banner: Neu Amex US Guide & Quizzes */}
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          <Link
            to="/playbook/preview/amex-us-beantragen"
            className="press flex min-w-0 items-center gap-3.5 overflow-hidden rounded-xl border border-brand-green/35 bg-brand-green-soft/60 p-4 transition-colors hover:border-brand-green"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green text-brand-green-foreground">
              <Globe className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-green">Neu · Stand 11/2026</p>
              <p className="truncate text-sm font-semibold text-foreground">Amex US Guide (Privat & Business)</p>
              <p className="truncate text-xs text-muted-foreground">Global Transfer, Cloud Residence, Tello eSIM, US-Bank</p>
            </div>
          </Link>

          <Link
            to="/quiz"
            className="press flex min-w-0 items-center gap-3.5 overflow-hidden rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-accent-blue">Interaktiv · +150 XP</p>
              <p className="truncate text-sm font-semibold text-foreground">Gründer-Quizze & Schnell-Checks</p>
              <p className="truncate text-xs text-muted-foreground">In 60 Sekunden deinen nächsten Guide finden</p>
            </div>
          </Link>
        </div>

        {/* Kuratierte Ziel-Kategorien (Udemy / Knowunity-Stil) */}
        <div className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
          {LERNPFADE.map((item) => {
            const Icon = item.icon;
            const active = pfad === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setPfad(item.id)}
                className={cn(
                  "press inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-left text-sm font-medium transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/40",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Suche & Schwierigkeit */}
        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-border bg-card p-3 shadow-sm md:flex-row md:items-center md:p-4">
          <div className="relative flex-1 md:max-w-md">
            <label htmlFor="guide-suche" className="sr-only">Guides durchsuchen</label>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="guide-suche"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Guide suchen, z. B. Amex US, App, GmbH, Website…"
              className="h-11 pl-9"
            />
          </div>
          <ChoiceGroup<string>
            label="Schwierigkeit"
            size="sm"
            value={filter}
            onChange={setFilter}
            options={FILTERS.map((f) => ({ value: f.id, label: f.label }))}
          />
          <p className="text-sm text-muted-foreground tabular md:ml-auto" aria-live="polite">
            {list.length} von {PLAYBOOKS.length} Guides
          </p>
        </div>

        {list.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <GuideCard key={p.slug} pb={p} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Search}
            title="Keine Guides gefunden"
            description="Versuch einen anderen Suchbegriff oder wähle oben „Alle Guides“."
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
        )}
      </CockpitShell>
    </>
  );
};

export default Playbooks;
