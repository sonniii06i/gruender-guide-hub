import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { HubNav } from "@/components/landing/HubNav";
import { PageHeader } from "@/components/landing/PageHeader";
import { Input } from "@/components/ui/input";
import { CourseCoverCard } from "@/components/CourseCoverCard";
import { ArrowRight, CreditCard, Search, Sparkles } from "lucide-react";
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
          title={
            <>
              {GUIDE_LANDINGS.length} Kurse zum <span className="text-[#6EE7B7]">Durchklicken.</span>
            </>
          }
          lead={
            <p>
              Von Website und App über Gewerbe, GmbH und Steuern bis Amex US. Jeder Kurs hat klare Schritte, XP und
              direkte Arbeitsfenster statt endloser Textwände.
            </p>
          }
        />

        <div className="container max-w-6xl px-4 py-10 md:py-14">
          {/* Spotlight-Einstieg: Amex US & Quiz */}
          <div className="mb-7 grid gap-3.5 sm:grid-cols-2">
            <Link
              to="/guides/amex-us-beantragen"
              className="gx-stage press group flex items-center justify-between gap-4 rounded-2xl p-5 text-white shadow-soft"
            >
              <div className="flex items-start gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/12 text-[#FDE68A]">
                  <CreditCard className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#6EE7B7]">Neu · Stand 11/2026</p>
                  <p className="mt-0.5 text-base font-bold text-white">Amex US beantragen (Privat &amp; Business)</p>
                  <p className="mt-0.5 text-xs text-white/75">Global Transfer, Cloud Residence, Tello eSIM, US-Bank</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-[#6EE7B7] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>

            <Link
              to="/quiz/gruendertyp"
              className="gx-card gx-card-hover press flex items-center justify-between gap-4 border-brand-green/35 bg-brand-green-soft/60 p-5"
            >
              <div className="flex items-start gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green text-white">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-green">Nicht sicher wo anfangen?</p>
                  <p className="mt-0.5 text-base font-bold text-foreground">60-Sekunden-Gründertyp-Quiz</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Alter &amp; Ziel wählen, passenden Kurs + Aktionscode bekommen</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
            </Link>
          </div>

          {/* Suche & Filter */}
          <div className="gx-card mb-7 flex flex-col gap-3 p-3.5 sm:flex-row sm:items-center sm:p-4">
            <div className="relative flex-1">
              <label htmlFor="public-guide-suche" className="sr-only">
                Guides suchen
              </label>
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                id="public-guide-suche"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Kurs suchen, z. B. Amex US, App, GmbH, Website…"
                className="h-11 rounded-xl pl-10"
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
                    "press min-h-10 rounded-xl border px-3.5 text-xs font-bold transition-colors",
                    diff === c.id
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-background text-muted-foreground hover:text-foreground",
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((g) => (
              <CourseCoverCard
                key={g.slug}
                slug={g.slug}
                title={g.title}
                subtitle={g.tagline}
                duration={g.duration}
                difficulty={g.difficulty}
                stepsCount={g.steps}
                to={guideHref(g.slug)}
                badgeText={g.slug === "amex-us-beantragen" ? "Neu · US & Amex" : undefined}
              />
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
