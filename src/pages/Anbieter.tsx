import { useMemo, useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyState, ToneBadge } from "@/components/cockpit/kit";
import {
  Star, Tag, ArrowRight, Info, Clock, AlertCircle,
  Search, Wallet, Truck, Receipt, Warehouse, Recycle,
  Mail, BarChart3, ShoppingCart, Globe2, Briefcase,
  Shield, Scale, Car, Grid3x3, X,
  CheckSquare, Sparkles, Headphones, ThumbsUp, Lock, Package,
  Users, Video, Link2, Award, Repeat, FlaskConical,
  MessageSquare, CreditCard, Share2, PiggyBank, ShieldCheck, Film,
} from "lucide-react";
import { Seo } from "@/components/Seo";
import {
  LEGAL_URLS,
  FULL_DESCRIPTIONS,
  PROVIDERS,
  isCoopActive,
  type Provider,
} from "@/data/anbieter";

// Backward-compat re-export für pages/AnbieterDetail.tsx (import from "./Anbieter")
export { LEGAL_URLS, FULL_DESCRIPTIONS, PROVIDERS, isCoopActive, type Provider };

// Kategorisierung: 5 Cluster für saubere UX statt 16-Pills-Horizontal-Scroll
type CatGroup = {
  label: string;
  cats: { name: string; icon: typeof Wallet }[];
};

const CAT_GROUPS: CatGroup[] = [
  {
    label: "Finanzen",
    cats: [
      { name: "Kreditkarten", icon: CreditCard },
      { name: "Banking DE", icon: Wallet },
      { name: "Banking US", icon: Wallet },
      { name: "Buchhaltung", icon: Receipt },
    ],
  },
  {
    label: "Logistik",
    cats: [
      { name: "Versand DACH", icon: Truck },
      { name: "3PL", icon: Warehouse },
      { name: "Fulfillment", icon: Warehouse },
      { name: "LUCID", icon: Recycle },
    ],
  },
  {
    label: "Marketing",
    cats: [
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
    label: "Tech",
    cats: [
      { name: "Shop-System", icon: ShoppingCart },
      { name: "Warenwirtschaft", icon: Package },
      { name: "Site-Search", icon: Search },
      { name: "Subscriptions", icon: Repeat },
      { name: "Loyalty", icon: Award },
      { name: "Payment", icon: CreditCard },
      { name: "Domains", icon: Globe2 },
      { name: "Workspace", icon: Briefcase },
    ],
  },
  {
    label: "Creator",
    cats: [
      { name: "Community", icon: Users },
      { name: "Video-Editing", icon: Film },
      { name: "UGC", icon: Video },
      { name: "Linktools", icon: Link2 },
    ],
  },
  {
    label: "Funding & Schutz",
    cats: [
      { name: "Crowdfunding", icon: PiggyBank },
      { name: "Brand-Protection", icon: ShieldCheck },
      { name: "Helpdesk", icon: Headphones },
    ],
  },
  {
    label: "Versicherung & Recht",
    cats: [
      { name: "Haftpflichtversicherung", icon: Shield },
      { name: "Rechtsschutz", icon: Scale },
      { name: "Geschäftsfahrzeug", icon: Car },
      { name: "DSGVO", icon: Lock },
    ],
  },
  {
    label: "Productivity & AI",
    cats: [
      { name: "Productivity", icon: CheckSquare },
      { name: "AI-Tools", icon: Sparkles },
    ],
  },
  {
    label: "Customer-Experience",
    cats: [
      { name: "Customer-Support", icon: Headphones },
      { name: "Reviews", icon: ThumbsUp },
    ],
  },
];

const Anbieter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get("cat") ?? "Alle";
  const [cat, setCat] = useState(initialCat);
  const [q, setQ] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  // Halte URL-Param und State synchron — User kann Link sharen + Back-Button funktioniert
  useEffect(() => {
    const urlCat = searchParams.get("cat") ?? "Alle";
    if (urlCat !== cat) setCat(urlCat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Auto-Scroll zum Anbieter-Grid wenn Page mit cat-Param geöffnet wird
  // (User kommt vom Dashboard via Direct-Routing → soll direkt die Anbieter sehen)
  useEffect(() => {
    if (initialCat !== "Alle" && resultsRef.current) {
      // Kurzes Delay damit Filter-Render fertig ist
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

  // Provider-Count pro Kategorie für Badge
  const counts = useMemo(() => {
    const m: Record<string, number> = { Alle: PROVIDERS.length };
    PROVIDERS.forEach((p) => {
      m[p.category] = (m[p.category] || 0) + 1;
    });
    return m;
  }, []);

  const list = useMemo(() => PROVIDERS.filter((p) =>
    (cat === "Alle" || p.category === cat) &&
    (q === "" || (p.name + " " + p.tagline + " " + p.pros.join(" ") + " " + p.cons.join(" ")).toLowerCase().includes(q.toLowerCase()))
  ), [cat, q]);

  return (
    <CockpitShell
      eyebrow="Anbieter-Vergleichs-Engine"
      title="Die besten Tools für deine Gründung"
      subtitle="Top-Anbieter pro Kategorie, mit Stärken und Schwächen aus Reddit und E-Com-Foren. Aktive Aktionen werden wöchentlich aktualisiert."
    >
      <Seo
        title="Anbieter-Vergleich 2026 – Geschäftskonto, Buchhaltung, Hosting | GründerX"
        description={`Über ${PROVIDERS.length} Anbieter im Vergleich: Geschäftskonto, Buchhaltung, Notar, Tools für Gründer & E-Commerce. Mit echten Erfahrungen aus Foren.`}
        path="/anbieter"
      />

      {/* Such- und Filterleiste */}
      <section aria-label="Anbieter filtern" className="mb-6 rounded-2xl border border-border bg-card shadow-card">
        <div className="flex flex-col gap-3 border-b border-border/70 p-4 md:flex-row md:items-center md:p-5">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              placeholder="Anbieter, Stärke oder Schwäche suchen…"
              aria-label="Anbieter suchen"
              value={q}
              onChange={(e) => {
                const val = e.target.value;
                setQ(val);
                // Suche immer global: vorgewählte Kategorie zurücksetzen, sonst
                // wirkt die Suche „kaputt" wenn man via ?cat=-Link reinkommt.
                if (val !== "" && cat !== "Alle") setCatWithUrl("Alle");
              }}
              className="h-11 pl-10 pr-10"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-muted-foreground hover:text-foreground"
                aria-label="Suche löschen"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            type="button"
            aria-pressed={cat === "Alle"}
            onClick={() => setCatWithUrl("Alle")}
            className={`inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-xl border px-4 text-sm font-semibold transition-colors ${
              cat === "Alle"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:border-foreground/25"
            }`}
          >
            <Grid3x3 className="h-4 w-4" aria-hidden="true" />
            Alle Anbieter
            <span className={`rounded-md px-1.5 py-0.5 text-xs font-semibold tabular ${
              cat === "Alle" ? "bg-white/15 text-primary-foreground" : "bg-secondary text-muted-foreground"
            }`}>
              {counts.Alle}
            </span>
          </button>
        </div>

        <div className="space-y-5 p-4 md:p-5">
          {CAT_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="mb-2 text-sm font-medium text-muted-foreground">{group.label}</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {group.cats.map(({ name, icon: Icon }) => {
                  const active = cat === name;
                  const count = counts[name] || 0;
                  if (count === 0) return null; // Kategorie ohne Anbieter ausblenden
                  return (
                    <button
                      key={name}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setCatWithUrl(active ? "Alle" : name)}
                      className={`flex min-w-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-colors active:translate-y-px ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card hover:border-accent-blue/40 hover:bg-accent/50"
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${active ? "text-primary-foreground" : "text-accent-blue"}`} aria-hidden="true" />
                      <span className="min-w-0 flex-1 truncate text-sm font-medium">{name}</span>
                      <span
                        className={`shrink-0 rounded-md px-1.5 py-0.5 text-xs font-semibold tabular ${
                          active ? "bg-white/15 text-primary-foreground" : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Zurücksetzen, wenn ein Filter aktiv ist */}
        {(cat !== "Alle" || q) && (
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/70 px-4 py-3 text-sm md:px-5">
            <div className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
              Aktive Filter:
              {cat !== "Alle" && (
                <span className="inline-flex items-center gap-1 rounded-md border border-accent-blue/20 bg-accent px-2 py-0.5 text-xs font-semibold text-accent-blue">
                  {cat}
                  <button type="button" onClick={() => setCatWithUrl("Alle")} className="rounded-sm hover:bg-accent-blue/15" aria-label="Kategorie-Filter entfernen">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {q && (
                <span className="inline-flex items-center gap-1 rounded-md border border-accent-blue/20 bg-accent px-2 py-0.5 text-xs font-semibold text-accent-blue">
                  „{q}"
                  <button type="button" onClick={() => setQ("")} className="rounded-sm hover:bg-accent-blue/15" aria-label="Suche entfernen">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setCatWithUrl("Alle");
                setQ("");
              }}
              className="font-semibold text-accent-blue hover:underline"
            >
              Alle Filter zurücksetzen
            </button>
          </div>
        )}
      </section>

      {/* Ergebnis-Kopf */}
      <div ref={resultsRef} className="mb-4 flex flex-wrap items-baseline justify-between gap-2 scroll-mt-20">
        <h2 className="text-lg font-semibold tracking-tight">
          {cat === "Alle" ? "Alle Kategorien" : cat}
          {q && <span className="ml-2 font-normal text-muted-foreground">· „{q}"</span>}
          <span className="ml-2 text-sm font-normal text-muted-foreground tabular">
            ({list.length} Anbieter)
          </span>
        </h2>
      </div>

      {list.length === 0 ? (
        <EmptyState
          icon={Search}
          title="Keine Anbieter gefunden"
          description="Versuch andere Filter oder lösche die Suche."
          action={
            <Button
              variant="outline"
              onClick={() => {
                setCatWithUrl("Alle");
                setQ("");
              }}
            >
              Filter zurücksetzen
            </Button>
          }
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <ProviderCard key={p.slug} p={p} />)}
        </div>
      )}

      <p className="mt-8 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span>
          <strong className="font-semibold text-foreground">*Affiliate-Hinweis:</strong> Einige Anbieter-Links sind Partner-Links. Bei Vertragsabschluss erhält GründerX ggf. eine Provision, für dich ohne Mehrkosten. Bewertungen sind unabhängig von der Vergütung. Details in <a href="/agb" className="underline hover:text-foreground">§ 14 AGB</a>.
        </span>
      </p>
    </CockpitShell>
  );
};

const ProviderCard = ({ p }: { p: Provider }) => (
  <Link
    to={`/anbieter/${p.slug}`}
    className="group flex min-w-0 flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition-[border-color,box-shadow] hover:border-accent-blue/40 hover:shadow-soft"
  >
    {/* Kopf: Kategorie, Name, Bewertung */}
    <div className="mb-2 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-accent-blue">{p.category}</p>
        <h3 className="truncate text-lg font-semibold leading-tight tracking-tight">{p.name}</h3>
      </div>
      <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-warning/25 bg-warning-soft px-2 py-0.5 text-xs font-semibold tabular">
        <Star className="h-3 w-3 fill-warning text-warning" aria-hidden="true" />
        {p.rating.toFixed(1)}
      </span>
    </div>

    <p className="mb-4 line-clamp-2 min-h-[2.5rem] text-sm leading-snug text-muted-foreground">{p.tagline}</p>

    <div className="mb-4 grid grid-cols-2 gap-2">
      <div className="min-h-[7rem] min-w-0 rounded-xl border border-success/20 bg-success-soft p-3">
        <p className="mb-1.5 text-xs font-semibold text-success">Stärken</p>
        <ul className="space-y-1.5 text-xs leading-snug text-foreground/80 [overflow-wrap:anywhere]">
          {p.pros.slice(0, 3).map((s, i) => (
            <li key={i} className="flex gap-1">
              <span className="shrink-0 text-success" aria-hidden="true">+</span>
              <span className="line-clamp-2">{s}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="min-h-[7rem] min-w-0 rounded-xl border border-danger/20 bg-danger-soft p-3">
        <p className="mb-1.5 text-xs font-semibold text-danger">Schwächen</p>
        <ul className="space-y-1.5 text-xs leading-snug text-foreground/80 [overflow-wrap:anywhere]">
          {p.cons.slice(0, 3).map((s, i) => (
            <li key={i} className="flex gap-1">
              <span className="shrink-0 text-danger" aria-hidden="true">−</span>
              <span className="line-clamp-2">{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="mb-3 border-t border-border/70 pt-3">
      <p className="mb-0.5 text-xs text-muted-foreground">{p.region}</p>
      <p className="break-words text-sm font-semibold leading-snug">{p.starting}</p>
    </div>

    {(p.signupTime || p.monthlyMin) && (
      <div className="mb-3 flex flex-wrap gap-1.5">
        {p.signupTime && (
          <ToneBadge tone="neutral">
            <Clock className="h-3 w-3" aria-hidden="true" />{p.signupTime}
          </ToneBadge>
        )}
        {p.monthlyMin && (
          <ToneBadge tone="warning">
            <AlertCircle className="h-3 w-3" aria-hidden="true" />Min-Umsatz
          </ToneBadge>
        )}
      </div>
    )}

    {isCoopActive(p.coop) && p.coop && (
      <div className="mb-3 flex items-start gap-1.5 rounded-lg border border-accent-blue/20 bg-accent p-2.5 text-xs font-medium">
        <Tag className="mt-0.5 h-3 w-3 shrink-0 text-accent-blue" aria-hidden="true" />
        <span className="line-clamp-2">{p.coop.text}{p.coop.code ? ` · ${p.coop.code}` : ""}</span>
      </div>
    )}

    <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-accent-blue">
      Details ansehen <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </span>
  </Link>
);

export default Anbieter;
