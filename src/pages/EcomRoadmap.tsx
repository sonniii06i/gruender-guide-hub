import { useState, type ElementType } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Link } from "react-router-dom";
import { CATEGORIES_ROADMAP, type CategoryRoadmap } from "@/data/ecomCategories";
import { ChevronRight, AlertTriangle, CheckCircle2, ExternalLink, ArrowRight, ArrowLeft, ShieldAlert, Landmark, Globe2, Flag } from "lucide-react";
import { Callout, ToneBadge, ToolSection, type Tone } from "@/components/cockpit/kit";
import { Button } from "@/components/ui/button";

const wettbewerbTon: Record<CategoryRoadmap["wettbewerb"], Tone> = {
  niedrig: "success",
  mittel: "warning",
  hoch: "warning",
  extrem: "danger",
};

const EcomRoadmap = () => {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = CATEGORIES_ROADMAP.find((c) => c.slug === activeSlug);

  return (
    <CockpitShell
      eyebrow="ECom-Brand-Roadmap · Stand Mai 2026"
      title="Compliance und Setup-Pfad pro Produkt-Kategorie"
      subtitle={`${CATEGORIES_ROADMAP.length} Kategorien, je mit DE-, EU- und US-Compliance, Standard-Stack und Stolperfallen. Berücksichtigt die Updates 2026: GPSR, Battery Regulation, EUDR, PFAS-Verbote, MoCRA und AI Act.`}
    >
      {/* Kritische 2025/2026-Updates: Querschnitt für alle Kategorien */}
      <Callout tone="danger" title="Querschnitts-Regelungen 2026, gelten für alle Produkt-Kategorien" icon={ShieldAlert} className="mb-8">
            <ul className="mt-2 list-disc space-y-2 pl-4 text-foreground/80">
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
                <strong className="text-danger">Maine: Total-Verkaufsverbot</strong> für Cosmetics, Textiles,
                Cookware, Children's Products, Menstrual ab 1.1.2026. NY/IL/MN folgen. Empfehlung: PFAS-frei
                für GANZEN US-Markt (statt State-by-State).
              </li>
              <li>
                <strong className="text-foreground">US MoCRA Renewal-Welle 2026:</strong> 2-Jahres-Zyklus für
                Facility Registration läuft seit Feb 2026. Foreign Facility braucht US-Agent ($500-2.5k/Jahr).
              </li>
              <li>
                <strong className="text-foreground">PPWR + EWKFondsG (Verpackung):</strong> Empty-Space-Ratio
                ≤50% ab 2030, EWKFonds-Einwegkunststoff-Abgabe (keine „Plastiksteuer") ~€0,001-8,972/kg je Produktgruppe seit 2024 (Doppelbelastung zu LUCID!). Siehe{" "}
                <Link to="/cockpit/lucid-wizard" className="font-medium text-accent-blue hover:underline">LUCID-Wizard</Link>.
              </li>
              <li>
                <strong className="text-foreground">AI Act Article 50 (ab 2.8.2026):</strong> Chatbot/AI-Content
                in Produkten muss disclosed werden. Smart-Speaker/Wearables mit AI-Funktion betroffen.
              </li>
            </ul>
      </Callout>

      {!active && (
        <>
          <h2 className="mb-4 text-lg font-semibold tracking-tight">Wähle deine Produkt-Kategorie</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {CATEGORIES_ROADMAP.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => setActiveSlug(c.slug)}
                className="press group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 text-left shadow-card hover:border-accent-blue/40 hover:shadow-soft"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-xl" aria-hidden="true">
                  {c.emoji}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-2">
                    <span className="text-base font-semibold">{c.name}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent-blue" aria-hidden="true" />
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{c.blurb}</span>
                  <span className="mt-3 flex flex-wrap gap-1.5">
                    <ToneBadge tone={wettbewerbTon[c.wettbewerb]}>Wettbewerb: {c.wettbewerb}</ToneBadge>
                    <ToneBadge>Eintritt: {c.marktEinstieg}</ToneBadge>
                  </span>
                </span>
              </button>
            ))}
          </div>

          <Callout tone="warning" title="Hinweis" className="mt-6">
            Stand 2026, keine Rechtsberatung. Pflicht-Compliance, Schwellen und Behörden-Links sind Orientierung.
            Vor dem Launch durch Anwalt und StB verifizieren. Pflicht-Texte (Etiketten, AGB) lässt du am besten von einem
            Fachanwalt für Wettbewerbsrecht prüfen, das spart vierstellige Abmahn-Beträge.
          </Callout>
        </>
      )}

      {active && (
        <div>
          <Button variant="ghost" size="sm" onClick={() => setActiveSlug(null)} className="mb-4 -ml-2 text-muted-foreground">
            <ArrowLeft aria-hidden="true" /> Alle Kategorien
          </Button>

          <section className="mb-6 rounded-2xl border border-border bg-card p-5 shadow-card md:p-6">
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-2xl" aria-hidden="true">{active.emoji}</span>
              <h2 className="text-2xl font-semibold tracking-tight">{active.name}</h2>
            </div>
            <p className="mb-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">{active.blurb}</p>
            <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border text-sm md:grid-cols-3">
              <div className="bg-background/60 p-3.5">
                <dt className="text-xs text-muted-foreground">Markt-Eintritt</dt>
                <dd className="mt-0.5 font-semibold">{active.marktEinstieg}</dd>
              </div>
              <div className="bg-background/60 p-3.5">
                <dt className="text-xs text-muted-foreground">Wettbewerb</dt>
                <dd className="mt-1"><ToneBadge tone={wettbewerbTon[active.wettbewerb]}>{active.wettbewerb}</ToneBadge></dd>
              </div>
              <div className="bg-background/60 p-3.5">
                <dt className="text-xs text-muted-foreground">Plattformen</dt>
                <dd className="mt-0.5 font-semibold">{active.plattformen}</dd>
              </div>
            </dl>
          </section>

          <div className="space-y-4">
            <Section title="Deutschland: Pflicht-Compliance" icon={Flag} items={active.deCompliance} />
            {active.euCompliance.length > 0 && (
              <Section title="EU: zusätzliche Compliance" icon={Landmark} items={active.euCompliance} />
            )}
            <Section title="USA: Compliance für den US-Markteintritt" icon={Globe2} items={active.usCompliance} />

            <ToolSection title="Standard-Stack" description="Best-Practice-Reihenfolge für das Setup" icon={CheckCircle2}>
              <ol className="space-y-4">
                {active.standardStack.map((st, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-xs font-semibold tabular">
                      {idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold">{st.schritt}</div>
                      <div className="mt-0.5 leading-relaxed text-muted-foreground">{st.beschreibung}</div>
                      {st.tool && (
                        <Link to={st.tool.route} className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-accent-blue hover:underline">
                          Tool: {st.tool.label} <ArrowRight className="h-3 w-3" aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </ToolSection>

            <Callout tone="danger" title="Stolperfallen: häufige und teure Fehler" icon={AlertTriangle}>
              <ul className="mt-1 list-disc space-y-1.5 pl-4">
                {active.stolperfallen.map((st, idx) => (
                  <li key={idx}>{st}</li>
                ))}
              </ul>
            </Callout>
          </div>
        </div>
      )}
    </CockpitShell>
  );
};

const Section = ({ title, icon, items }: { title: string; icon: ElementType; items: CategoryRoadmap["deCompliance"] }) => (
  <ToolSection title={title} icon={icon}>
    <div className="divide-y divide-border/70">
      {items.map((i, idx) => (
        <div key={idx} className="py-3.5 first:pt-0 last:pb-0">
          <div className="text-sm font-semibold">{i.pflicht}</div>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{i.details}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
            {i.behoerde && (
              <span className="text-muted-foreground">
                Behörde: <span className="font-medium text-foreground">{i.behoerde}</span>
              </span>
            )}
            {i.kostenDe && <ToneBadge tone="success">Kosten: {i.kostenDe}</ToneBadge>}
            {i.link && (
              <a href={i.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-accent-blue hover:underline">
                Behörden-Link <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            )}
            {i.tool && (
              <Link to={i.tool.route} className="inline-flex items-center gap-1 font-semibold text-accent-blue hover:underline">
                Tool: {i.tool.label} <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  </ToolSection>
);

export default EcomRoadmap;
