import { useMemo, useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import {
  Star, Tag, ExternalLink, Clock, AlertCircle,
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
      eyebrow="🏆 Anbieter-Vergleichs-Engine"
      title="Die besten Tools für deine Gründung"
      subtitle="Top-Anbieter pro Kategorie – mit Stärken/Schwächen aus Reddit & E-Com-Foren. Aktive Aktionen werden wöchentlich aktualisiert."
    >
      <Seo
        title="Anbieter-Vergleich 2026 – Geschäftskonto, Buchhaltung, Hosting | GründerX"
        description={`Über ${PROVIDERS.length} Anbieter im Vergleich: Geschäftskonto, Buchhaltung, Notar, Tools für Gründer & E-Commerce. Mit echten Erfahrungen aus Foren.`}
        path="/anbieter"
      />
      <div className="rounded-xl border border-border bg-secondary/30 px-3 py-2 mb-4 text-[11px] text-muted-foreground">
        <strong>*Affiliate-Hinweis:</strong> Einige Anbieter-Links sind Partner-Links. Bei Vertragsabschluss erhält GründerX ggf. eine Provision — für dich keine Mehrkosten. Bewertungen sind unabhängig von der Vergütung. Details in <a href="/agb" className="underline hover:text-foreground">§ 14 AGB</a>.
      </div>

      {/* === Such- + Master-Filter-Bar === */}
      <div className="rounded-2xl border border-border bg-gradient-to-br from-card via-card to-secondary/20 p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Anbieter, Stärke oder Schwäche suchen..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="h-11 pl-10 pr-10 text-sm bg-background"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Suche löschen"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setCatWithUrl("Alle")}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 h-11 text-sm font-bold transition-all whitespace-nowrap ${
              cat === "Alle"
                ? "bg-accent-blue text-primary-foreground shadow-md"
                : "bg-background border border-border hover:border-accent-blue/40"
            }`}
          >
            <Grid3x3 className="h-4 w-4" />
            Alle Anbieter
            <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${
              cat === "Alle" ? "bg-white/25 text-white" : "bg-secondary text-muted-foreground"
            }`}>
              {counts.Alle}
            </span>
          </button>
        </div>

        {/* === Kategorie-Karten-Grid === */}
        <div className="space-y-4">
          {CAT_GROUPS.map((group) => (
            <div key={group.label}>
              <div className="flex items-center gap-2 mb-2">
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground/80">
                  {group.label}
                </div>
                <div className="h-px flex-1 bg-border/60" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {group.cats.map(({ name, icon: Icon }) => {
                  const active = cat === name;
                  const count = counts[name] || 0;
                  if (count === 0) return null; // Kategorie ohne Anbieter ausblenden
                  return (
                    <button
                      key={name}
                      onClick={() => setCatWithUrl(active ? "Alle" : name)}
                      className={`group relative rounded-xl px-3 py-3 text-left transition-all ${
                        active
                          ? "bg-accent-blue text-primary-foreground shadow-md ring-2 ring-accent-blue/30 ring-offset-2 ring-offset-card"
                          : "bg-background border border-border hover:border-accent-blue/40 hover:bg-accent-blue/5 hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1.5">
                        <Icon
                          className={`h-4 w-4 transition-colors ${
                            active ? "text-primary-foreground" : "text-accent-blue"
                          }`}
                        />
                        <span
                          className={`text-[10px] font-bold rounded-md px-1.5 py-0.5 ${
                            active
                              ? "bg-white/25 text-white"
                              : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {count}
                        </span>
                      </div>
                      <div
                        className={`text-xs font-semibold leading-tight ${
                          active ? "text-primary-foreground" : "text-foreground"
                        }`}
                      >
                        {name}
                      </div>
                      {active && (
                        <div className="text-[10px] text-primary-foreground/80 mt-0.5">
                          Filter aktiv ✓
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Reset-Footer wenn Filter aktiv */}
        {(cat !== "Alle" || q) && (
          <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between text-xs">
            <div className="text-muted-foreground">
              Aktive Filter:{" "}
              {cat !== "Alle" && (
                <span className="inline-flex items-center gap-1 ml-1 rounded-md bg-accent-blue/10 text-accent-blue px-2 py-0.5 font-semibold">
                  {cat}
                  <button onClick={() => setCatWithUrl("Alle")} className="hover:bg-accent-blue/20 rounded-sm">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {q && (
                <span className="inline-flex items-center gap-1 ml-1 rounded-md bg-accent-blue/10 text-accent-blue px-2 py-0.5 font-semibold">
                  „{q}"
                  <button onClick={() => setQ("")} className="hover:bg-accent-blue/20 rounded-sm">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
            <button
              onClick={() => {
                setCatWithUrl("Alle");
                setQ("");
              }}
              className="text-accent-blue hover:underline font-semibold"
            >
              Alle Filter zurücksetzen
            </button>
          </div>
        )}
      </div>

      {/* Resultats-Header */}
      <div ref={resultsRef} className="flex items-baseline justify-between mb-4 scroll-mt-4">
        <h2 className="text-sm font-semibold text-muted-foreground">
          {cat === "Alle" ? "Alle Kategorien" : cat}
          {q && <span className="ml-2 text-foreground">· „{q}"</span>}
          <span className="ml-2 text-xs text-muted-foreground/70">
            ({list.length} Anbieter)
          </span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((p) => <ProviderCard key={p.slug} p={p} />)}
      </div>

      {list.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <div className="font-semibold mb-1">Keine Anbieter gefunden</div>
          <div className="text-xs">Versuch andere Filter oder die Suche zu löschen.</div>
        </div>
      )}
    </CockpitShell>
  );
};

const ProviderCard = ({ p }: { p: Provider }) => (
  <Link to={`/anbieter/${p.slug}`} className="rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-soft hover:border-accent-blue/40 transition-all flex flex-col">
    {/* Header: Kategorie · Name · Rating */}
    <div className="flex items-start justify-between mb-2 gap-3">
      <div className="min-w-0">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-accent-blue truncate">{p.category}</div>
        <h3 className="font-bold text-lg leading-tight truncate">{p.name}</h3>
      </div>
      <div className="flex items-center gap-1 text-xs font-semibold shrink-0 rounded-md bg-yellow-50 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-300 px-2 py-0.5">
        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
        {p.rating.toFixed(1)}
      </div>
    </div>

    {/* Tagline – fixed 2 lines */}
    <p className="text-sm text-muted-foreground leading-snug mb-4 line-clamp-2 min-h-[2.5rem]">{p.tagline}</p>

    {/* Pros / Cons als eigene Boxen mit fixer Höhe */}
    <div className="grid grid-cols-2 gap-2 mb-4">
      <div className="rounded-lg border border-success/20 bg-success/5 p-2.5 min-h-[7rem]">
        <div className="text-[10px] font-bold uppercase tracking-wider text-success mb-1.5">Stärken</div>
        <ul className="space-y-1.5 text-[11px] leading-snug text-foreground/80">
          {p.pros.slice(0, 3).map((s, i) => (
            <li key={i} className="flex gap-1">
              <span className="shrink-0 text-success">+</span>
              <span className="line-clamp-2">{s}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-2.5 min-h-[7rem]">
        <div className="text-[10px] font-bold uppercase tracking-wider text-destructive mb-1.5">Schwächen</div>
        <ul className="space-y-1.5 text-[11px] leading-snug text-foreground/80">
          {p.cons.slice(0, 3).map((s, i) => (
            <li key={i} className="flex gap-1">
              <span className="shrink-0 text-destructive">−</span>
              <span className="line-clamp-2">{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Footer-Zeile: Region (Label) + Preis (volle Breite) */}
    <div className="mb-3 border-t border-border pt-3">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1">{p.region}</div>
      <div className="text-xs font-semibold text-foreground leading-snug break-words">{p.starting}</div>
    </div>

    {/* Tags – nur wenn vorhanden, einheitlich */}
    {(p.signupTime || p.monthlyMin) && (
      <div className="flex flex-wrap gap-1.5 text-[10px] mb-3">
        {p.signupTime && (
          <span className="rounded-full bg-secondary text-muted-foreground px-2 py-0.5 inline-flex items-center gap-1">
            <Clock className="h-2.5 w-2.5" />{p.signupTime}
          </span>
        )}
        {p.monthlyMin && (
          <span className="rounded-full bg-warning/10 text-warning-foreground border border-warning/30 px-2 py-0.5 inline-flex items-center gap-1">
            <AlertCircle className="h-2.5 w-2.5" />Min-Umsatz
          </span>
        )}
      </div>
    )}

    {/* Aktiver Deal (kompakt) */}
    {isCoopActive(p.coop) && p.coop && (
      <div className="rounded-lg bg-accent-blue/10 border border-accent-blue/30 text-foreground p-2 text-[11px] font-medium mb-3 flex items-start gap-1.5">
        <Tag className="h-3 w-3 mt-0.5 shrink-0 text-accent-blue" />
        <span className="line-clamp-2">{p.coop.text}{p.coop.code ? ` · ${p.coop.code}` : ""}</span>
      </div>
    )}

    {/* CTA */}
    <div className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-accent-blue">
      Details ansehen <ExternalLink className="h-3 w-3" />
    </div>
  </Link>
);

export default Anbieter;
