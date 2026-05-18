import { useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Link } from "react-router-dom";
import { CATEGORIES_ROADMAP, type CategoryRoadmap } from "@/data/ecomCategories";
import { ChevronRight, AlertTriangle, CheckCircle2, ExternalLink, ArrowRight } from "lucide-react";

const wettbewerbStyle: Record<CategoryRoadmap["wettbewerb"], string> = {
  niedrig: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
  mittel: "bg-amber-500/10 text-amber-700 border-amber-500/30",
  hoch: "bg-orange-500/10 text-orange-700 border-orange-500/30",
  extrem: "bg-red-500/10 text-red-700 border-red-500/30",
};

const EcomRoadmap = () => {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = CATEGORIES_ROADMAP.find((c) => c.slug === activeSlug);

  return (
    <CockpitShell
      eyebrow="ECom-Brand-Roadmap · Stand Mai 2026"
      title="Compliance + Setup-Pfad pro Produkt-Kategorie"
      subtitle="8 Kategorien (Beauty, Supplement, Electronics, Toys, Apparel, Food, Pet, Hardware) · Pro Kategorie: DE/EU/US-Compliance + Standard-Stack + Stolperfallen. ★ 2026-Updates: GPSR (live!), Battery Reg, EUDR, PFAS-Verbote, MoCRA, AI Act."
    >
      {/* ★ KRITISCHE 2025/2026-UPDATES (NEU) — Querschnitt für ALLE Kategorien */}
      <div className="rounded-2xl border-2 border-red-500/40 bg-red-500/5 p-4 mb-6 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-700 shrink-0 mt-0.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          <div>
            <div className="font-bold text-red-700 mb-2">★ Querschnitts-Regelungen 2026 — gelten für ALLE Produkt-Kategorien</div>
            <ul className="list-disc pl-4 space-y-1.5 text-muted-foreground">
              <li>
                <strong className="text-foreground">EU GPSR 2023/988 (live seit 13.12.2024):</strong>{" "}
                Alle Konsumgüter B2C brauchen <strong>Responsible Person in EU</strong>, Adressen am Produkt UND
                im Listing, Risk Assessment (10 Jahre Retention). Strafen bis €100k. KEIN Bestandsschutz!
                Amazon/eBay/Etsy prüfen RPE-Daten + entfernen non-compliant Listings.
              </li>
              <li>
                <strong className="text-foreground">EU Battery Reg 2023/1542:</strong> für Geräte mit Akku
                (Headphones, IoT, Wearables) — TRIPLE-EPR (Battery + WEEE + LUCID). DE-BattDG-Migration
                bis 15.1.2026 Pflicht.
              </li>
              <li>
                <strong className="text-foreground">EUDR 2023/1115 (verschoben):</strong> Large 30.12.2026 /
                SME 30.6.2027. Für Holz, Kakao, Kaffee, Soja, Palmöl, Kautschuk + Folgeprodukte (Schokolade,
                Leder, Möbel, Papier, Reifen). Geolocation-Polygone der Anbauflächen Pflicht.
              </li>
              <li>
                <strong className="text-foreground">US PFAS-Bans 2026:</strong>{" "}
                <strong className="text-red-700">Maine: Total-Verkaufsverbot</strong> für Cosmetics, Textiles,
                Cookware, Children's Products, Menstrual ab 1.1.2026. NY/IL/MN folgen. Empfehlung: PFAS-frei
                für GANZEN US-Markt (statt State-by-State).
              </li>
              <li>
                <strong className="text-foreground">US MoCRA Renewal-Welle 2026:</strong> 2-Jahres-Zyklus für
                Facility Registration läuft seit Feb 2026. Foreign Facility braucht US-Agent ($500-2.5k/Jahr).
              </li>
              <li>
                <strong className="text-foreground">PPWR + EWKFondsG (Verpackung):</strong> Empty-Space-Ratio
                ≤50% ab 2030, Plastiksteuer €0,18-8,97/kg seit 2024 (Doppelbelastung zu LUCID!). Siehe{" "}
                <a href="/cockpit/lucid-wizard" className="text-accent-blue underline">LUCID-Wizard</a>.
              </li>
              <li>
                <strong className="text-foreground">AI Act Article 50 (ab 2.8.2026):</strong> Chatbot/AI-Content
                in Produkten muss disclosed werden. Smart-Speaker/Wearables mit AI-Funktion betroffen.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {!active && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {CATEGORIES_ROADMAP.map((c) => (
              <button
                key={c.slug}
                onClick={() => setActiveSlug(c.slug)}
                className="group rounded-2xl border border-border bg-card p-5 text-left hover:border-accent-blue hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="text-2xl">{c.emoji}</div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent-blue group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="font-bold text-base mb-1">{c.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{c.blurb}</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className={`inline-flex rounded-full text-[10px] px-2 py-0.5 border ${wettbewerbStyle[c.wettbewerb]} font-semibold`}>
                    Wettbewerb: {c.wettbewerb}
                  </span>
                  <span className="inline-flex rounded-full text-[10px] px-2 py-0.5 border border-border bg-secondary text-muted-foreground">
                    Eintritt: {c.marktEinstieg}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 mt-6 text-xs leading-relaxed">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold mb-1">Hinweis</div>
                <p className="text-muted-foreground">
                  Stand 2026, keine Rechtsberatung. Pflicht-Compliance + Schwellen + Behörden-Links sind Orientierung.
                  Vor Launch durch Anwalt + StB verifizieren — Pflicht-Texte (Etiketten, AGB) lasse durch
                  Fachanwalt für Wettbewerbsrecht prüfen, das spart 4-stellige Abmahn-Beträge.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {active && (
        <div>
          <button
            onClick={() => setActiveSlug(null)}
            className="text-xs text-muted-foreground hover:text-accent-blue mb-4 inline-flex items-center"
          >
            ← Alle Kategorien
          </button>

          <div className="rounded-2xl border border-border bg-card p-5 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{active.emoji}</span>
              <div>
                <h2 className="text-2xl font-bold">{active.name}</h2>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{active.blurb}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Markt-Eintritt</div>
                <div className="font-semibold mt-0.5">{active.marktEinstieg}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Wettbewerb</div>
                <span className={`inline-flex rounded-full text-[10px] px-2 py-0.5 border ${wettbewerbStyle[active.wettbewerb]} font-semibold mt-0.5`}>
                  {active.wettbewerb}
                </span>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Plattformen</div>
                <div className="font-semibold mt-0.5">{active.plattformen}</div>
              </div>
            </div>
          </div>

          {/* DE-Compliance */}
          <Section title="🇩🇪 DE-Compliance (Pflicht)" items={active.deCompliance} />

          {/* EU-Compliance */}
          {active.euCompliance.length > 0 && (
            <Section title="🇪🇺 EU-Compliance (zusätzlich)" items={active.euCompliance} />
          )}

          {/* US-Compliance */}
          <Section title="🇺🇸 US-Compliance (für US-Markt-Eintritt)" items={active.usCompliance} />

          {/* Standard-Stack */}
          <div className="rounded-2xl border border-border bg-card p-5 mb-4">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              Standard-Stack (Best-Practice-Setup-Reihenfolge)
            </h3>
            <ol className="space-y-2.5">
              {active.standardStack.map((s, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs">
                  <span className="shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-full bg-accent-blue text-primary-foreground font-bold text-[11px]">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <div className="font-semibold">{s.schritt}</div>
                    <div className="text-muted-foreground leading-relaxed">{s.beschreibung}</div>
                    {s.tool && (
                      <Link
                        to={s.tool.route}
                        className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-accent-blue hover:underline"
                      >
                        Tool: {s.tool.label} <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Stolperfallen */}
          <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5 mb-4">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-4 w-4" />
              Stolperfallen (häufige + teure Fehler)
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-xs leading-relaxed text-muted-foreground">
              {active.stolperfallen.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </CockpitShell>
  );
};

const Section = ({ title, items }: { title: string; items: CategoryRoadmap["deCompliance"] }) => (
  <div className="rounded-2xl border border-border bg-card p-5 mb-4">
    <h3 className="font-bold text-sm mb-3">{title}</h3>
    <div className="space-y-3">
      {items.map((i, idx) => (
        <div key={idx} className="border-l-2 border-accent-blue/40 pl-3">
          <div className="font-semibold text-xs mb-1">{i.pflicht}</div>
          <p className="text-xs text-muted-foreground leading-relaxed">{i.details}</p>
          <div className="flex flex-wrap gap-2 mt-1.5 text-[10px]">
            {i.behoerde && (
              <span className="text-muted-foreground">
                Behörde: <span className="font-mono">{i.behoerde}</span>
              </span>
            )}
            {i.kostenDe && (
              <span className="text-emerald-700 font-semibold">Kosten: {i.kostenDe}</span>
            )}
            {i.link && (
              <a
                href={i.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-accent-blue hover:underline font-semibold"
              >
                Behörden-Link <ExternalLink className="h-2.5 w-2.5" />
              </a>
            )}
            {i.tool && (
              <Link
                to={i.tool.route}
                className="inline-flex items-center gap-1 text-accent-blue hover:underline font-semibold"
              >
                Tool: {i.tool.label} <ArrowRight className="h-2.5 w-2.5" />
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default EcomRoadmap;
