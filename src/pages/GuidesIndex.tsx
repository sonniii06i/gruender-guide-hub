import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { HubNav } from "@/components/landing/HubNav";
import { PageHeader } from "@/components/landing/PageHeader";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { GUIDE_LANDINGS } from "@/data/guides";
import { guideHref } from "@/data/guideMerges";
import { MobileCtaBar } from "@/components/landing/MobileCtaBar";
import { cn } from "@/lib/utils";

const SITE = "https://gruenderx.de";

const FILTER_CHIPS = [
  { id: "all", label: "Alle" },
  { id: "Einfach", label: "Einfach" },
  { id: "Mittel", label: "Mittel" },
  { id: "Komplex", label: "Komplex" },
];

/**
 * Öffentliche Übersicht aller Guides (/guides) — crawlbarer Hub, der auf jede
 * /guides/:slug-Landing verlinkt. Zeigt KEINEN Bezahl-Inhalt.
 */
const GuidesIndex = () => {
  const [q, setQ] = useState("");
  const [diff, setDiff] = useState("all");

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return GUIDE_LANDINGS.filter((g) => {
      if (diff !== "all" && g.difficulty !== diff) return false;
      if (!ql) return true;
      return g.title.toLowerCase().includes(ql) || g.tagline.toLowerCase().includes(ql);
    });
  }, [q, diff]);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "GründerX Schritt-für-Schritt-Guides",
      itemListElement: GUIDE_LANDINGS.slice(0, 60).map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE}${guideHref(g.slug)}`,
        name: g.title,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: SITE },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE}/guides` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Seo
        title="Interaktive Schritt-für-Schritt-Guides für Gründer (2026) | GründerX"
        description={`${GUIDE_LANDINGS.length} interaktive Guides: Gründung, Website, App, Amazon, TikTok Shop, US-LLC und Amex US. In der richtigen Reihenfolge, mobil bedienbar.`}
        path="/guides"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main id="inhalt">
        <PageHeader
          zentriert
          crumbs={[{ label: "Start", to: "/" }, { label: "Guides" }]}
          title="Guides zum Durchklicken."
          lead={
            <p>
              {GUIDE_LANDINGS.length} Schritt-für-Schritt-Guides von Website und App über Gewerbe, GmbH und Steuern
              bis US-Amex. Kurz erklärt, mobil optimiert, mit direkten Arbeitsfenstern.
            </p>
          }
        />

        <div className="container max-w-5xl px-4 py-10 md:py-14">
          {/* Schnell-Einstieg Quiz & Amex US */}
          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            <Link
              to="/guides/amex-us-beantragen"
              className="press flex items-center justify-between gap-3 rounded-xl border border-brand-green/35 bg-brand-green-soft/60 p-4 transition-colors hover:border-brand-green"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-green">Neu · Stand 11/2026</p>
                <p className="text-sm font-semibold text-foreground">Amex US beantragen (Privat & Business)</p>
                <p className="text-xs text-muted-foreground">Global Transfer, Cloud Residence, Tello eSIM, US-Bank</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
            </Link>

            <Link
              to="/quiz/gruendertyp"
              className="press flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
            >
              <div>
                <p className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-accent-blue">
                  <Sparkles className="h-3 w-3" aria-hidden="true" /> Nicht sicher wo anfangen?
                </p>
                <p className="text-sm font-semibold text-foreground">60-Sekunden-Gründertyp-Quiz</p>
                <p className="text-xs text-muted-foreground">Alter & Ziel wählen, passenden Guide + Rabatt bekommen</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-accent-blue" aria-hidden="true" />
            </Link>
          </div>

          {/* Suche & Filter */}
          <div className="mb-6 flex flex-col gap-3 rounded-xl border border-border bg-card p-3 sm:flex-row sm:items-center sm:p-4">
            <div className="relative flex-1">
              <label htmlFor="public-guide-suche" className="sr-only">Guides suchen</label>
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                id="public-guide-suche"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Guide suchen, z. B. Amex US, App, GmbH, Website…"
                className="h-11 pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {FILTER_CHIPS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={diff === c.id}
                  onClick={() => setDiff(c.id)}
                  className={cn(
                    "min-h-10 rounded-lg border px-3 text-xs font-semibold transition-colors",
                    diff === c.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:text-foreground",
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((g) => (
              <Link
                key={g.slug}
                to={guideHref(g.slug)}
                className="press group flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-[border-color,box-shadow] duration-150 hover:border-brand-green/50 hover:shadow-md"
              >
                <p className="mb-1.5 flex items-start justify-between gap-2 font-semibold">
                  {g.title}
                  <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand-green" aria-hidden="true" />
                </p>
                <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">{g.tagline}</p>
                <p className="flex flex-wrap gap-1.5 text-[11px] font-medium text-muted-foreground">
                  <span className="rounded-md bg-secondary px-2 py-0.5">{g.duration}</span>
                  <span className="rounded-md bg-secondary px-2 py-0.5">{g.difficulty}</span>
                  <span className="rounded-md bg-secondary px-2 py-0.5 tabular">{g.steps} Schritte</span>
                </p>
              </Link>
            ))}
          </div>

          <HubNav show={["tools", "ratgeber"]} />
        </div>
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
};

export default GuidesIndex;
