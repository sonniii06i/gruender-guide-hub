import { useMemo, useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyState, ToneBadge } from "@/components/cockpit/kit";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Star,
  Tag,
  ArrowRight,
  Info,
  Clock,
  AlertCircle,
  Search,
  Wallet,
  Truck,
  Receipt,
  Warehouse,
  Recycle,
  Mail,
  BarChart3,
  ShoppingCart,
  Globe2,
  Briefcase,
  Shield,
  Scale,
  Car,
  X,
  CheckSquare,
  Sparkles,
  Headphones,
  ThumbsUp,
  Lock,
  Package,
  Users,
  Video,
  Link2,
  Award,
  Repeat,
  FlaskConical,
  MessageSquare,
  CreditCard,
  Share2,
  PiggyBank,
  ShieldCheck,
  Film,
  Check,
  Plus,
  ExternalLink,
  SlidersHorizontal,
  Building2,
  Server,
} from "lucide-react";
import { Seo } from "@/components/Seo";
import { AnbieterLink } from "@/components/PartnerLink";
import {
  LEGAL_URLS,
  FULL_DESCRIPTIONS,
  PROVIDERS,
  isCoopActive,
  type Provider,
} from "@/data/anbieter";
import { cn } from "@/lib/utils";

// Backward-compat re-export für pages/AnbieterDetail.tsx
export { LEGAL_URLS, FULL_DESCRIPTIONS, PROVIDERS, isCoopActive, type Provider };

type CatGroup = {
  id: string;
  label: string;
  icon: typeof Wallet;
  cats: { name: string; icon: typeof Wallet }[];
};

const CAT_GROUPS: CatGroup[] = [
  {
    id: "finanzen",
    label: "Finanzen & Steuern",
    icon: Wallet,
    cats: [
      { name: "Banking DE", icon: Wallet },
      { name: "Banking US", icon: Wallet },
      { name: "Kreditkarten", icon: CreditCard },
      { name: "Buchhaltung", icon: Receipt },
      { name: "Gründung & Steuern", icon: Building2 },
    ],
  },
  {
    id: "tech",
    label: "Shop, Cloud & Tech",
    icon: ShoppingCart,
    cats: [
      { name: "Shop-System", icon: ShoppingCart },
      { name: "Payment", icon: CreditCard },
      { name: "Hosting & Cloud", icon: Server },
      { name: "Domains", icon: Globe2 },
      { name: "Workspace", icon: Briefcase },
      { name: "Warenwirtschaft", icon: Package },
      { name: "Site-Search", icon: Search },
      { name: "Subscriptions", icon: Repeat },
      { name: "Loyalty", icon: Award },
    ],
  },
  {
    id: "logistik",
    label: "Versand & Pflichten",
    icon: Truck,
    cats: [
      { name: "Versand DACH", icon: Truck },
      { name: "LUCID", icon: Recycle },
      { name: "3PL", icon: Warehouse },
      { name: "Fulfillment", icon: Warehouse },
    ],
  },
  {
    id: "marketing",
    label: "Marketing & AI",
    icon: BarChart3,
    cats: [
      { name: "AI-Tools", icon: Sparkles },
      { name: "Email", icon: Mail },
      { name: "Newsletter", icon: Mail },
      { name: "SMS-Marketing", icon: MessageSquare },
      { name: "Tracking", icon: BarChart3 },
      { name: "Attribution", icon: BarChart3 },
      { name: "Affiliate", icon: Share2 },
      { name: "CRO", icon: FlaskConical },
    ],
  },
  {
    id: "creator",
    label: "Creator & Support",
    icon: Users,
    cats: [
      { name: "Community", icon: Users },
      { name: "Video-Editing", icon: Film },
      { name: "UGC", icon: Video },
      { name: "Linktools", icon: Link2 },
      { name: "Customer-Support", icon: Headphones },
      { name: "Reviews", icon: ThumbsUp },
      { name: "Helpdesk", icon: Headphones },
    ],
  },
  {
    id: "schutz",
    label: "Recht & Schutz",
    icon: Shield,
    cats: [
      { name: "Haftpflichtversicherung", icon: Shield },
      { name: "Rechtsschutz", icon: Scale },
      { name: "Geschäftsfahrzeug", icon: Car },
      { name: "DSGVO", icon: Lock },
      { name: "Brand-Protection", icon: ShieldCheck },
      { name: "Crowdfunding", icon: PiggyBank },
      { name: "Productivity", icon: CheckSquare },
    ],
  },
];

const ALL_CATS = CAT_GROUPS.flatMap((g) => g.cats);

type SortKey = "rating" | "deals" | "name";

const Anbieter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get("cat") ?? "Alle";
  const [cat, setCat] = useState(initialCat);
  const [clusterId, setClusterId] = useState<string>("alle");
  const [q, setQ] = useState("");
  const [onlyDeals, setOnlyDeals] = useState(false);
  const [sort, setSort] = useState<SortKey>("rating");
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const urlCat = searchParams.get("cat") ?? "Alle";
    if (urlCat !== cat) setCat(urlCat);
    if (urlCat !== "Alle") {
      const foundCluster = CAT_GROUPS.find((g) => g.cats.some((c) => c.name === urlCat));
      if (foundCluster) setClusterId(foundCluster.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if (initialCat !== "Alle" && resultsRef.current) {
      const t = setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCatWithUrl = (newCat: string) => {
    setCat(newCat);
    const next = new URLSearchParams(searchParams);
    if (newCat === "Alle") next.delete("cat");
    else next.set("cat", newCat);
    setSearchParams(next, { replace: true });
  };

  const counts = useMemo(() => {
    const m: Record<string, number> = { Alle: PROVIDERS.length };
    PROVIDERS.forEach((p) => {
      m[p.category] = (m[p.category] || 0) + 1;
    });
    return m;
  }, []);

  const categoryCount = useMemo(() => new Set(PROVIDERS.map((p) => p.category)).size, []);
  const activeCluster = CAT_GROUPS.find((g) => g.id === clusterId) ?? null;

  const visibleSubCats = useMemo(() => {
    if (!activeCluster) return [];
    return activeCluster.cats.filter((c) => (counts[c.name] || 0) > 0);
  }, [activeCluster, counts]);

  const list = useMemo(() => {
    const ql = q.trim().toLowerCase();
    const clusterCats = activeCluster ? new Set(activeCluster.cats.map((c) => c.name)) : null;

    const filtered = PROVIDERS.filter((p) => {
      if (cat !== "Alle" && p.category !== cat) return false;
      if (cat === "Alle" && clusterCats && !clusterCats.has(p.category)) return false;
      if (onlyDeals && !isCoopActive(p.coop)) return false;
      if (!ql) return true;
      return (
        p.name +
        " " +
        p.category +
        " " +
        p.tagline +
        " " +
        p.pros.join(" ") +
        " " +
        p.cons.join(" ")
      )
        .toLowerCase()
        .includes(ql);
    });

    return [...filtered].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name, "de");
      if (sort === "deals") {
        const da = isCoopActive(a.coop) ? 1 : 0;
        const db = isCoopActive(b.coop) ? 1 : 0;
        if (db !== da) return db - da;
      }
      return b.rating - a.rating;
    });
  }, [cat, activeCluster, q, onlyDeals, sort]);

  const compareItems = useMemo(
    () => compareSlugs.map((s) => PROVIDERS.find((p) => p.slug === s)).filter((p): p is Provider => Boolean(p)),
    [compareSlugs],
  );

  const toggleCompare = (slug: string) => {
    setCompareSlugs((prev) => {
      if (prev.includes(slug)) return prev.filter((x) => x !== slug);
      if (prev.length >= 3) return [...prev.slice(1), slug];
      return [...prev, slug];
    });
  };

  const resetFilters = () => {
    setCatWithUrl("Alle");
    setClusterId("alle");
    setQ("");
    setOnlyDeals(false);
  };

  const dealsCount = useMemo(() => PROVIDERS.filter((p) => isCoopActive(p.coop)).length, []);

  return (
    <CockpitShell
      eyebrow="Anbieter-Vergleich"
      title="Anbieter ehrlich vergleichen"
      subtitle={`${PROVIDERS.length} geprüfte Anbieter in ${categoryCount} Kategorien mit echten Preisen, Stärken und Schwächen.`}
    >
      <Seo
        title="Anbieter-Vergleich 2026: Geschäftskonto, Buchhaltung, Hosting | GründerX"
        description={`Über ${PROVIDERS.length} Anbieter in ${categoryCount} Kategorien im direkten Vergleich: Geschäftskonto, Kreditkarten, Buchhaltung, Gründung, Hosting, Versicherung und Tools.`}
        path="/anbieter"
      />

      {/* Ruhige, aufgeräumte Revolut × Lexoffice Filterleiste (keine Chip-Wand mehr) */}
      <section aria-label="Anbieter filtern" className="mb-6 rounded-2xl border border-border bg-white p-3.5 shadow-card sm:p-4">
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              placeholder="Anbieter, Stärke oder Kategorie suchen …"
              aria-label="Anbieter suchen"
              value={q}
              onChange={(e) => {
                const val = e.target.value;
                setQ(val);
                if (val !== "" && (cat !== "Alle" || clusterId !== "alle")) {
                  setCatWithUrl("Alle");
                  setClusterId("alle");
                }
              }}
              className="h-10 rounded-xl border-border bg-secondary/40 pl-10 pr-9 text-sm focus:bg-white"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-foreground"
                aria-label="Suche löschen"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Direkte Kategorie-Auswahl (alle 40 Kategorien kompakt in 1 Dropdown) */}
            <select
              aria-label="Kategorie wählen"
              value={cat}
              onChange={(e) => {
                const nextCat = e.target.value;
                setCatWithUrl(nextCat);
                if (nextCat === "Alle") {
                  setClusterId("alle");
                } else {
                  const found = CAT_GROUPS.find((g) => g.cats.some((c) => c.name === nextCat));
                  if (found) setClusterId(found.id);
                }
              }}
              className="h-10 max-w-[210px] rounded-xl border border-border bg-white px-3 text-xs font-semibold text-foreground focus:border-primary focus:outline-none sm:text-sm"
            >
              <option value="Alle">Alle Kategorien ({categoryCount})</option>
              {CAT_GROUPS.map((g) => (
                <optgroup key={g.id} label={g.label}>
                  {g.cats
                    .filter((c) => (counts[c.name] || 0) > 0)
                    .map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name} ({counts[c.name]})
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>

            {dealsCount > 0 && (
              <button
                type="button"
                aria-pressed={onlyDeals}
                onClick={() => setOnlyDeals((v) => !v)}
                className={cn(
                  "press inline-flex h-10 items-center gap-1.5 rounded-xl border px-3 text-xs font-semibold sm:text-sm",
                  onlyDeals
                    ? "border-brand-green bg-brand-green text-white"
                    : "border-border bg-white text-foreground hover:border-primary/40",
                )}
              >
                <Tag className="h-3.5 w-3.5" aria-hidden="true" />
                Deals ({dealsCount})
              </button>
            )}

            <div className="relative flex items-center">
              <SlidersHorizontal
                className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-muted-foreground"
                aria-hidden="true"
              />
              <select
                aria-label="Sortierung"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-10 rounded-xl border border-border bg-white pl-8 pr-7 text-xs font-semibold text-foreground focus:border-primary focus:outline-none sm:text-sm"
              >
                <option value="rating">Beste Bewertung</option>
                <option value="deals">Deals zuerst</option>
                <option value="name">A bis Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Eine ruhige Themen-Leiste (Revolut-Segment-Pills) */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto border-t border-border/70 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            aria-pressed={clusterId === "alle" && cat === "Alle"}
            onClick={() => {
              setClusterId("alle");
              setCatWithUrl("Alle");
            }}
            className={cn(
              "press inline-flex h-9 shrink-0 items-center rounded-xl px-3.5 text-xs font-semibold transition-colors",
              clusterId === "alle" && cat === "Alle"
                ? "bg-primary text-white shadow-sm"
                : "bg-secondary/60 text-foreground/80 hover:bg-accent hover:text-primary",
            )}
          >
            Alle
          </button>

          {CAT_GROUPS.map((g) => {
            const active = clusterId === g.id;
            const Icon = g.icon;
            return (
              <button
                key={g.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  if (active) {
                    setClusterId("alle");
                    setCatWithUrl("Alle");
                  } else {
                    setClusterId(g.id);
                    setCatWithUrl("Alle");
                  }
                }}
                className={cn(
                  "press inline-flex h-9 shrink-0 items-center gap-1.5 rounded-xl px-3.5 text-xs font-semibold transition-colors",
                  active
                    ? "bg-primary text-white shadow-sm"
                    : "bg-secondary/60 text-foreground/80 hover:bg-accent hover:text-primary",
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {g.label}
              </button>
            );
          })}

          {(cat !== "Alle" || clusterId !== "alle" || q || onlyDeals) && (
            <button
              type="button"
              onClick={resetFilters}
              className="ml-auto inline-flex h-9 shrink-0 items-center gap-1 px-2 text-xs font-semibold text-accent-blue hover:underline"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" /> Zurücksetzen
            </button>
          )}
        </div>

        {/* Unterkategorien erscheinen erst, wenn gezielt ein Themenbereich gewählt wurde */}
        {visibleSubCats.length > 0 && (
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5 border-t border-border/60 pt-2.5">
            {visibleSubCats.map(({ name, icon: Icon }) => {
              const active = cat === name;
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCatWithUrl(active ? "Alle" : name)}
                  className={cn(
                    "press inline-flex min-h-8 items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors",
                    active
                      ? "border-accent-blue bg-accent-blue text-white"
                      : "border-border bg-white text-foreground/80 hover:border-primary/40 hover:text-primary",
                  )}
                >
                  <Icon className="h-3 w-3 shrink-0" aria-hidden="true" />
                  <span>{name}</span>
                  <span className="tabular opacity-75">{counts[name]}</span>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Ergebnis-Kopf */}
      <div ref={resultsRef} className="mb-4 flex flex-wrap items-center justify-between gap-2 scroll-mt-20">
        <h2 className="text-base font-bold tracking-tight text-primary sm:text-lg">
          {cat !== "Alle" ? cat : activeCluster ? activeCluster.label : "Alle Anbieter"}
          {q && <span className="ml-2 font-normal text-muted-foreground">· „{q}“</span>}
          <span className="ml-2 text-sm font-normal text-muted-foreground tabular">({list.length} Anbieter)</span>
        </h2>
        {compareItems.length > 0 && (
          <Button type="button" size="sm" onClick={() => setCompareOpen(true)} className="press gap-1.5 rounded-xl">
            <Scale className="h-4 w-4" aria-hidden="true" />
            {compareItems.length} im Direkt-Vergleich öffnen
          </Button>
        )}
      </div>

      {list.length === 0 ? (
        <EmptyState
          icon={Search}
          title="Keine Anbieter gefunden"
          description="Versuch einen anderen Suchbegriff oder setze die Filter zurück."
          action={
            <Button variant="outline" onClick={resetFilters}>
              Filter zurücksetzen
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProviderCard
              key={p.slug}
              p={p}
              compared={compareSlugs.includes(p.slug)}
              onToggleCompare={() => toggleCompare(p.slug)}
            />
          ))}
        </div>
      )}

      {/* Alle Kategorien kompakt als Sprung-Index ganz unten statt oben im Blickfeld */}
      <section className="mt-10 rounded-2xl border border-border bg-white p-5 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Alle {categoryCount} Kategorien im Überblick
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {ALL_CATS.filter((c) => (counts[c.name] || 0) > 0).map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => {
                setCatWithUrl(c.name);
                const found = CAT_GROUPS.find((g) => g.cats.some((x) => x.name === c.name));
                if (found) setClusterId(found.id);
                resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="rounded-lg border border-border bg-secondary/40 px-2.5 py-1 text-xs font-medium text-foreground/85 transition-colors hover:border-primary/40 hover:bg-white hover:text-primary"
            >
              {c.name} <span className="text-muted-foreground tabular">({counts[c.name]})</span>
            </button>
          ))}
        </div>
      </section>

      <p className="mt-6 flex items-start gap-2 rounded-2xl border border-border bg-white p-4 text-xs leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
        <span>
          <strong className="font-semibold text-foreground">Transparenz-Hinweis:</strong> Einige Anbieter-Links sind
          Partner-Links. Bei Vertragsabschluss erhält GründerX ggf. eine Provision ohne Mehrkosten für dich. Unsere
          Bewertungen und Schwächen-Hinweise sind davon unabhängig. Details in{" "}
          <Link to="/agb" className="underline hover:text-foreground">
            § 14 AGB
          </Link>
          .
        </span>
      </p>

      {/* Schwebende Direkt-Vergleich-Leiste */}
      {compareItems.length > 0 && (
        <div className="fixed inset-x-4 bottom-20 z-30 mx-auto flex max-w-2xl items-center justify-between gap-3 rounded-2xl border border-primary/30 bg-primary px-4 py-3 text-white shadow-xl md:bottom-5">
          <div className="flex min-w-0 items-center gap-2 overflow-x-auto">
            <Scale className="h-4 w-4 shrink-0 text-brand-green-glow" aria-hidden="true" />
            <div className="flex items-center gap-1.5">
              {compareItems.map((item) => (
                <span
                  key={item.slug}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold"
                >
                  {item.name}
                  <button
                    type="button"
                    aria-label={`${item.name} aus Vergleich entfernen`}
                    onClick={() => toggleCompare(item.slug)}
                    className="rounded-full p-0.5 hover:bg-white/20"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => setCompareOpen(true)}
            className="shrink-0 rounded-xl bg-brand-green text-white hover:bg-brand-green/90"
          >
            Vergleichen ({compareItems.length})
          </Button>
        </div>
      )}

      {/* Side-by-Side Vergleichs-Sheet */}
      <Sheet open={compareOpen} onOpenChange={setCompareOpen}>
        <SheetContent side="bottom" className="max-h-[88vh] overflow-y-auto rounded-t-3xl bg-background">
          <div className="mx-auto max-w-5xl">
            <SheetHeader className="mb-5 text-left">
              <SheetTitle>Direkt-Vergleich ({compareItems.length} Anbieter)</SheetTitle>
              <SheetDescription>Preis, Bewertung, Stärken und Schwächen direkt nebeneinander.</SheetDescription>
            </SheetHeader>

            <div className="grid gap-4 md:grid-cols-3">
              {compareItems.map((p) => (
                <div key={p.slug} className="flex flex-col rounded-2xl border border-border bg-white p-5 shadow-card">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">{p.category}</p>
                      <h3 className="text-lg font-bold text-primary">{p.name}</h3>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-warning-soft px-2.5 py-1 text-xs font-semibold tabular">
                      <Star className="h-3 w-3 fill-warning text-warning" aria-hidden="true" />
                      {p.rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="mt-3 rounded-xl bg-secondary/50 p-3 text-sm">
                    <p className="text-xs text-muted-foreground">Preis ab</p>
                    <p className="font-semibold text-foreground">{p.starting}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Region: {p.region} · Setup: {p.signupTime ?? "Sofort"}
                    </p>
                  </div>

                  <div className="mt-4 space-y-3 text-xs">
                    <div>
                      <p className="mb-1.5 font-semibold text-success">Stärken</p>
                      <ul className="space-y-1 text-foreground/85">
                        {p.pros.slice(0, 4).map((x) => (
                          <li key={x} className="flex gap-1.5">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-1.5 font-semibold text-danger">Schwächen</p>
                      <ul className="space-y-1 text-foreground/85">
                        {p.cons.slice(0, 3).map((x) => (
                          <li key={x} className="flex gap-1.5">
                            <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger" aria-hidden="true" />
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-auto flex gap-2 pt-5">
                    <Button asChild size="sm" className="flex-1 rounded-xl">
                      <AnbieterLink url={p.url} slug={p.slug} ort="anbieter-vergleich">
                        Zum Anbieter <ExternalLink className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
                      </AnbieterLink>
                    </Button>
                    <Button asChild size="sm" variant="outline" className="rounded-xl">
                      <Link to={`/anbieter/${p.slug}`} onClick={() => setCompareOpen(false)}>
                        Details
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </CockpitShell>
  );
};

const ProviderCard = ({
  p,
  compared,
  onToggleCompare,
}: {
  p: Provider;
  compared: boolean;
  onToggleCompare: () => void;
}) => {
  const hasDeal = isCoopActive(p.coop) && Boolean(p.coop);
  return (
    <article
      className={cn(
        "group flex min-w-0 flex-col rounded-2xl border bg-white p-5 shadow-card transition-[border-color,box-shadow]",
        compared ? "border-primary ring-2 ring-primary/15" : "border-border hover:border-primary/35 hover:shadow-soft",
      )}
    >
      {/* Kopf: Monogramm + Name + Score */}
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-sm font-bold text-primary"
          aria-hidden="true"
        >
          {p.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold text-muted-foreground">
                <span>{p.category}</span> · <span>{p.region}</span>
              </p>
              <Link to={`/anbieter/${p.slug}`} className="block truncate text-base font-bold text-primary hover:text-accent-blue">
                {p.name}
              </Link>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-warning-soft px-2 py-0.5 text-xs font-semibold tabular">
              <Star className="h-3 w-3 fill-warning text-warning" aria-hidden="true" />
              {p.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{p.tagline}</p>

      {/* Preis & Setup kompakt */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className="rounded-lg bg-secondary px-2.5 py-1 text-xs font-semibold text-foreground">{p.starting}</span>
        {p.signupTime && (
          <ToneBadge tone="neutral">
            <Clock className="h-3 w-3" aria-hidden="true" /> {p.signupTime}
          </ToneBadge>
        )}
        {p.monthlyMin && (
          <ToneBadge tone="warning">
            <AlertCircle className="h-3 w-3" aria-hidden="true" /> Min.-Umsatz
          </ToneBadge>
        )}
      </div>

      {/* Saubere Pro / Contra Zusammenfassung */}
      <div className="mt-3.5 space-y-1.5 rounded-xl border border-border/70 bg-[#F8FAFC] p-3 text-xs">
        {p.pros.slice(0, 2).map((s, i) => (
          <p key={`pro-${i}`} className="flex items-start gap-2 leading-snug text-foreground/90">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green" strokeWidth={2.75} aria-hidden="true" />
            <span className="line-clamp-1">{s}</span>
          </p>
        ))}
        {p.cons[0] && (
          <p className="flex items-start gap-2 leading-snug text-muted-foreground">
            <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger" aria-hidden="true" />
            <span className="line-clamp-1">{p.cons[0]}</span>
          </p>
        )}
      </div>

      {hasDeal && p.coop && (
        <div className="mt-3 flex items-start gap-2 rounded-xl border border-brand-green/30 bg-brand-green-soft/60 px-3 py-2 text-xs font-medium text-foreground">
          <Tag className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green" aria-hidden="true" />
          <span className="line-clamp-1">
            {p.coop.text}
            {p.coop.code ? ` · Code ${p.coop.code}` : ""}
          </span>
        </div>
      )}

      {/* Aktionen */}
      <div className="mt-auto flex items-center justify-between gap-2 border-t border-border/70 pt-3.5">
        <Link
          to={`/anbieter/${p.slug}`}
          className="inline-flex min-h-9 items-center gap-1 text-xs font-bold text-primary hover:text-accent-blue sm:text-sm"
        >
          Details ansehen <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
        <button
          type="button"
          aria-pressed={compared}
          onClick={onToggleCompare}
          className={cn(
            "press inline-flex min-h-9 items-center gap-1 rounded-xl border px-3 text-xs font-semibold",
            compared
              ? "border-primary bg-primary text-white"
              : "border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-primary",
          )}
        >
          {compared ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Plus className="h-3.5 w-3.5" aria-hidden="true" />}
          {compared ? "Gewählt" : "Vergleichen"}
        </button>
      </div>
    </article>
  );
};

export default Anbieter;
