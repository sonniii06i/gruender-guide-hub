import { useEffect, useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Callout, ChoiceGroup, Field, ResultPanel, ResultRow, ToneBadge, ToolSection } from "@/components/cockpit/kit";
import { useTrackToolEvent } from "@/hooks/useTrackToolEvent";
import { TrialResult, useToolTrial } from "@/components/freetools/ToolTrial";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Package,
  ExternalLink,
  Calculator,
  HelpCircle,
  Building2,
  Scale,
  ListChecks,
  Lightbulb,
  RotateCcw,
} from "lucide-react";

type MaterialKey = "papier" | "kunststoff" | "glas" | "metall" | "holz" | "verbund";

// Material-Tarife verifiziert Mai 2026 (Quelle: verpackungslizenz24.de
// Vergleich 2026, lieferantenübergreifend; Anstieg +9-24% vs 2025).
// UNCLEAR-Werte (Glas, Holz, Papier-2026-Punktwert) konservativ erweitert.
const MATERIAL_LABELS: Record<MaterialKey, { name: string; emoji: string; ratePerKg: { low: number; mid: number; high: number } }> = {
  papier: { name: "Papier / Pappe / Karton", emoji: "📦", ratePerKg: { low: 0.18, mid: 0.24, high: 0.32 } },
  kunststoff: { name: "Kunststoff (PET, PE, PP)", emoji: "♻️", ratePerKg: { low: 1.05, mid: 1.17, high: 1.25 } },
  glas: { name: "Glas (+23,9% in 2026!)", emoji: "🍾", ratePerKg: { low: 0.11, mid: 0.14, high: 0.18 } },
  metall: { name: "Metall (Aluminium 1,12 / Stahl 1,10)", emoji: "🥫", ratePerKg: { low: 1.0, mid: 1.11, high: 1.2 } },
  holz: { name: "Holz", emoji: "🪵", ratePerKg: { low: 0.03, mid: 0.05, high: 0.08 } },
  verbund: { name: "Verbund (Getränke 1,13 / Sonstige 1,16)", emoji: "🥛", ratePerKg: { low: 1.05, mid: 1.15, high: 1.25 } },
};

type DualesSystem = {
  slug: string;
  name: string;
  marketShare: string;
  pricing: string;
  bestFor: string;
  url: string;
};

// 9-10 zugelassene duale Systeme (Stand Mai 2026, ZSVR-Liste).
// Marktanteile via EUWID Q1 2026. PreZero neuer Marktführer (~22,9%),
// Edeka-Wechsel von BellandVision zu Zentek 2025 = ~9% Verschiebung.
const SYSTEMS: DualesSystem[] = [
  {
    slug: "prezero",
    name: "PreZero (Schwarz-Gruppe) ★ Marktführer",
    marketShare: "~22,9% (neu seit 2025)",
    pricing: "Mid-Range · skalierende Tarife",
    bestFor: "Mittelständler bis Großunternehmen",
    url: "https://www.prezero.com",
  },
  {
    slug: "bellandvision",
    name: "BellandVision (Veolia seit 2017)",
    marketShare: "~18% (führt bei LVP+Glas)",
    pricing: "Standard-Tarife",
    bestFor: "Mittelständische DACH-Marken",
    url: "https://www.bellandvision.de",
  },
  {
    slug: "interzero",
    name: "Interzero (vormals Interseroh+)",
    marketShare: "~15%",
    pricing: "Mid-Range · Online-Shop ab €300 Mindestlizenz",
    bestFor: "Mittelständler mit gemischten Materialien",
    url: "https://www.interzero.de",
  },
  {
    slug: "der-gruene-punkt",
    name: "Der Grüne Punkt (DSD)",
    marketShare: "~12%",
    pricing: "Premium-Range",
    bestFor: "Etablierte Marken mit Branding-Bezug",
    url: "https://www.gruener-punkt.de",
  },
  {
    slug: "zentek",
    name: "Zentek (Edeka-Partner seit 2025)",
    marketShare: "~10% (stark wachsend nach Edeka-Wechsel)",
    pricing: "Mid-Range · Volumen-Rabatte",
    bestFor: "Retail + große D2C-Marken",
    url: "https://www.zentek.de",
  },
  {
    slug: "lizenzero",
    name: "Lizenzero (Veolia)",
    marketShare: "~8%",
    pricing: "Online-Self-Service · ab €75 Kleinmengen",
    bestFor: "★ E-Commerce-Solos / kleine D2C-Brands",
    url: "https://www.lizenzero.de",
  },
  {
    slug: "noventiz",
    name: "Noventiz",
    marketShare: "~6%",
    pricing: "Günstig · Online-First",
    bestFor: "Solo-Founder + Startup-Brands",
    url: "https://www.noventiz.de",
  },
  {
    slug: "reclay",
    name: "Reclay/Redual (eigenständig, nicht Veolia)",
    marketShare: "~4%",
    pricing: "Eher hochpreisig · für größere Mengen",
    bestFor: "Industrie + Großverpackungen",
    url: "https://www.reclay-group.com",
  },
  {
    slug: "ekopunkt",
    name: "Eko-Punkt (Remondis)",
    marketShare: "~3%",
    pricing: "Mid-Range",
    bestFor: "Remondis-Kunden",
    url: "https://www.eko-punkt.de",
  },
];

const LucidWizard = () => {
  const trackEvent = useTrackToolEvent("lucid-wizard");
  const [step, setStep] = useState(1);
  // Nur auf der öffentlichen Probier-Seite gesetzt, im Cockpit null.
  // Die Auswertung (Schritt 4 + 5) liegt dort hinter dem E-Mail-Tor.
  const trial = useToolTrial();

  // Track Step-Reached (löst bei jedem Step-Wechsel aus)
  useEffect(() => {
    trackEvent(`step_${step}_reached`);
  }, [step, trackEvent]);
  const [firmenname, setFirmenname] = useState("");
  const [hrnummer, setHrnummer] = useState("");
  const [ustId, setUstId] = useState("");
  const [adresse, setAdresse] = useState("");
  const [materialMengen, setMaterialMengen] = useState<Record<MaterialKey, number>>({
    papier: 0,
    kunststoff: 0,
    glas: 0,
    metall: 0,
    holz: 0,
    verbund: 0,
  });
  const [verkauft2024, setVerkauft2024] = useState(true);

  const totalKg = useMemo(
    () => Object.values(materialMengen).reduce((sum, kg) => sum + kg, 0),
    [materialMengen],
  );

  const isKleinmenge = totalKg < 80; // < 80 kg/Jahr = oft günstiger Tarif

  const costEstimate = useMemo(() => {
    const low = Object.entries(materialMengen).reduce(
      (sum, [k, kg]) => sum + kg * MATERIAL_LABELS[k as MaterialKey].ratePerKg.low,
      0,
    );
    const mid = Object.entries(materialMengen).reduce(
      (sum, [k, kg]) => sum + kg * MATERIAL_LABELS[k as MaterialKey].ratePerKg.mid,
      0,
    );
    const high = Object.entries(materialMengen).reduce(
      (sum, [k, kg]) => sum + kg * MATERIAL_LABELS[k as MaterialKey].ratePerKg.high,
      0,
    );
    // Floor 75€ greift nur bei tatsächlichen Mengen — bei 0 kg keine künstliche Mindest-Anzeige
    if (totalKg === 0) return { low: 0, mid: 0, high: 0 };
    return { low: Math.max(75, low), mid: Math.max(75, mid), high: Math.max(75, high) };
  }, [materialMengen, totalKg]);

  // VE-Pflicht-Schwellen (§ 10 Abs. 4 VerpackDG: 80 t Glas, 50 t PPK, 30 t übrige Materialarten)
  const veSchwellen = useMemo(() => {
    const m = materialMengen;
    const ueber = [
      m.glas > 80000 && "Glas > 80.000 kg",
      m.papier > 50000 && "Papier > 50.000 kg",
      m.kunststoff + m.metall + m.verbund > 30000 && "LVP (Kunststoff+Metall+Verbund) > 30.000 kg",
    ].filter(Boolean) as string[];
    return ueber;
  }, [materialMengen]);

  const step3HasMengen = totalKg > 0;

  const recommendedSystems = useMemo(() => {
    if (isKleinmenge) return SYSTEMS.filter((s) => ["lizenzero", "noventiz"].includes(s.slug));
    if (totalKg < 1000) return SYSTEMS.filter((s) => ["lizenzero", "interzero", "noventiz"].includes(s.slug));
    if (totalKg < 10000)
      return SYSTEMS.filter((s) => ["interzero", "bellandvision", "prezero", "zentek"].includes(s.slug));
    return SYSTEMS.filter((s) => ["prezero", "bellandvision", "interzero", "der-gruene-punkt"].includes(s.slug));
  }, [totalKg, isKleinmenge]);

  const updateMenge = (k: MaterialKey, val: number) =>
    setMaterialMengen({ ...materialMengen, [k]: Math.max(0, val) });

  const STEP_LABELS = ["Pflicht", "Firmendaten", "Mengen", "Systeme", "Action-Plan"];
  const STEP_TITLES = [
    "Bist du LUCID-pflichtig?",
    "Firmendaten",
    "Verpackungsmengen pro Jahr",
    "Empfohlene duale Systeme",
    "Übersicht und nächste Schritte",
  ];
  const STEP_DESC = [
    "Pflicht für jeden, der Verpackungen erstmals in Verkehr bringt: Versand-, Produkt- und Serviceverpackungen.",
    "Stammdaten für die LUCID-Anmeldung.",
    "Trage die Gesamtmenge pro Material ein (Schätzung bis Jahresende). LUCID und das duale System brauchen das jährlich.",
    "Du lizenzierst bei einem der 9 zugelassenen dualen Systeme. Diese passen am besten zu deinen Mengen:",
    "Zusammenfassung deiner Daten und Action-Plan.",
  ];
  const STEP_ICONS = [HelpCircle, Building2, Scale, Package, ListChecks];
  const StepIcon = STEP_ICONS[step - 1];

  return (
    <CockpitShell
      eyebrow="LUCID-Wizard · 5-Schritte-Rechner (kein Verzeichnis)"
      title="Verpackungslizenz-Rechner + Anbieter-Empfehlung"
      subtitle="Schätzt deine jährlichen Lizenzkosten anhand der Materialmengen, vergleicht 9 zugelassene duale Systeme und gibt dir einen Action-Plan für die LUCID-Eintragung (die machst du selbst auf verpackungsregister.org). Tarife 2026 (+9-24 % ggü. 2025), inkl. PPWR (EU 2025/40, Hauptpflichten 12.8.2026), EWKFondsG-Doppelbelastung, Mehrweg-Angebotspflicht (§ 60 VerpackDG) und Prüfpflichten für Plattformen und Fulfilment-Dienstleister. Seit 12.8.2026 gilt das VerpackDG statt des VerpackG."
    >
      <div className="mx-auto max-w-4xl">
        {/* Fortschritt */}
        <nav aria-label="Fortschritt" className="mb-6">
          <p className="mb-3 text-sm text-muted-foreground tabular">
            Schritt {step} von 5 · <span className="font-medium text-foreground">{STEP_LABELS[step - 1]}</span>
          </p>
          <ol className="flex items-center gap-1.5 sm:gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <li key={s} className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2" aria-current={s === step ? "step" : undefined}>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular transition-colors ${
                    s < step
                      ? "bg-success text-white"
                      : s === step
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/15"
                      : "border border-border bg-card text-muted-foreground"
                  }`}
                >
                  {s < step ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> : s}
                </span>
                <span className={`hidden truncate text-xs font-medium md:inline ${s === step ? "text-foreground" : "text-muted-foreground"}`}>
                  {STEP_LABELS[s - 1]}
                </span>
                {s < 5 && <span className={`h-px min-w-2 flex-1 ${s < step ? "bg-success" : "bg-border"}`} aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </nav>

        <ToolSection
          className="mb-6"
          icon={StepIcon}
          title={`${step}. ${STEP_TITLES[step - 1]}`}
          description={STEP_DESC[step - 1]}
        >
        {step === 1 && (
          <div className="space-y-4">
            <Callout tone="warning" title="Pflicht ab der ersten verkauften Sendung, wenn:">
              <ul className="list-disc space-y-1 pl-4">
                <li>Du verkaufst Waren an Privatkunden in DE (B2C)</li>
                <li>Du verpackst die Ware (Karton, Tüte, Folie, Polster), auch wenn es nur der Versandkarton ist</li>
                <li>Auch Marketplace-Verkäufer (Amazon FBA, Kaufland, eBay) sind selbst pflichtig</li>
              </ul>
            </Callout>
            <ChoiceGroup<boolean>
              label="Verkaufst du Waren mit Verpackung?"
              value={verkauft2024}
              onChange={setVerkauft2024}
              options={[
                { value: true, label: "Ja, ich verkaufe Waren mit Verpackung an DE-Kunden" },
                { value: false, label: "Nein, nur Dienstleistungen oder digital" },
              ]}
            />
            {verkauft2024 === false && (
              <Callout tone="success" title="Keine LUCID-Pflicht">
                Reine Dienstleister und digitale Produkte sind nicht pflichtig. Wenn du später physische Ware verkaufst,
                muss die Anmeldung vor der ersten Sendung erfolgen.
              </Callout>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Firmenname" htmlFor="lucid-firma" className="md:col-span-2">
                <Input id="lucid-firma" value={firmenname} onChange={(e) => setFirmenname(e.target.value)} placeholder="z. B. Mustermann GmbH" />
              </Field>
              <Field label="HR-Nummer" htmlFor="lucid-hr" hint="Falls im Handelsregister eingetragen">
                <Input id="lucid-hr" value={hrnummer} onChange={(e) => setHrnummer(e.target.value)} placeholder="HRB 12345 B" />
              </Field>
              <Field label="USt-ID" htmlFor="lucid-ustid">
                <Input id="lucid-ustid" value={ustId} onChange={(e) => setUstId(e.target.value)} placeholder="DE123456789" />
              </Field>
              <Field label="Geschäftsadresse" htmlFor="lucid-adresse" className="md:col-span-2">
                <Input id="lucid-adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} placeholder="Musterstr. 1, 10115 Berlin" />
              </Field>
            </div>
            <Callout tone="info" icon={Lightbulb}>
              Die LUCID-Registrierung selbst ist <strong>kostenlos</strong> bei der Stiftung Zentrale Stelle. Pflicht sind
              nur die Stammdaten.
            </Callout>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <div className="divide-y divide-border/70 rounded-xl border border-border">
              {(Object.keys(MATERIAL_LABELS) as MaterialKey[]).map((k) => (
                <div key={k} className="flex flex-col gap-2 p-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <div className="min-w-0">
                    <Label htmlFor={`lucid-m-${k}`} className="text-sm font-medium">{MATERIAL_LABELS[k].name}</Label>
                    {materialMengen[k] > 0 && (
                      <p className="mt-0.5 text-xs text-muted-foreground tabular">
                        Geschätzte Lizenzkosten: {(materialMengen[k] * MATERIAL_LABELS[k].ratePerKg.low).toFixed(0)} € bis{" "}
                        {(materialMengen[k] * MATERIAL_LABELS[k].ratePerKg.high).toFixed(0)} € pro Jahr
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Input
                      id={`lucid-m-${k}`}
                      type="number"
                      min={0}
                      value={materialMengen[k] || ""}
                      onChange={(e) => updateMenge(k, Number(e.target.value) || 0)}
                      placeholder="0"
                      className="h-9 w-full text-right tabular sm:w-32"
                    />
                    <span className="w-14 shrink-0 text-xs text-muted-foreground">kg/Jahr</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-secondary/60 px-4 py-3 text-sm">
              <span className="font-semibold tabular">Gesamt: {totalKg.toLocaleString("de-DE")} kg/Jahr</span>
              {isKleinmenge && totalKg > 0 && (
                <ToneBadge tone="success">Kleinmengen-Tarif möglich (oft 75-150 €/Jahr)</ToneBadge>
              )}
            </div>
            {!step3HasMengen && (
              <Callout tone="warning">
                Trag mindestens ein Material mit Menge &gt; 0 ein, damit die Empfehlung in Schritt 4 sinnvoll ist.
              </Callout>
            )}
            {veSchwellen.length > 0 && (
              <Callout tone="danger" title="Vollständigkeitserklärung (VE) nach § 10 VerpackDG ist Pflicht">
                {veSchwellen.join(" · ")}. Die VE muss bis <strong>15.05.</strong> des Folgejahres hinterlegt und von einem registrierten
                Sachverständigen (oder WP/StB) geprüft sein (typisch 800-3.000 € Prüfkosten).
              </Callout>
            )}
          </div>
        )}

        {step === 4 && (
          <TrialResult>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {recommendedSystems.map((s) => (
                <a
                  key={s.slug}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex flex-col rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent-blue/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-sm font-semibold">{s.name}</span>
                    <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-accent-blue" aria-hidden="true" />
                  </div>
                  <span className="mt-1 text-xs text-muted-foreground tabular">Marktanteil {s.marketShare}</span>
                  <span className="mt-2 text-sm text-muted-foreground">{s.pricing}</span>
                  <span className="mt-3 border-t border-border/70 pt-3 text-xs">
                    <span className="font-medium text-success">Passt für:</span> {s.bestFor}
                  </span>
                </a>
              ))}
            </div>
          </TrialResult>
        )}

        {step === 5 && (
          <TrialResult>
            <div className="space-y-4">
              <ResultPanel
                variant="ink"
                kicker="Geschätzte Lizenzkosten"
                title={firmenname || "Deine Firma"}
                value={totalKg > 0 ? `~${Math.round(costEstimate.mid)} €` : "0 €"}
                valueHint={`Mittlere Schätzung pro Jahr, Spanne ${Math.round(costEstimate.low)}-${Math.round(costEstimate.high)} €`}
              >
                <div className="divide-y divide-white/10 rounded-xl bg-white/[0.04] px-4">
                  <ResultRow label="Firma" value={firmenname || "nicht angegeben"} />
                  <ResultRow label="USt-ID" value={ustId || "nicht angegeben"} />
                  <ResultRow label="Verpackung gesamt" value={`${totalKg.toLocaleString("de-DE")} kg/Jahr`} />
                </div>
              </ResultPanel>

              {veSchwellen.length > 0 && (
                <Callout tone="danger" title="Vollständigkeitserklärung (VE) nach § 10 VerpackDG ist Pflicht">
                  {veSchwellen.join(" · ")}. Hinterlegung bis <strong>15.05.</strong> des Folgejahres, geprüft durch registrierten
                  Sachverständigen (oder WP/StB). Prüfkosten typisch 800-3.000 €.
                </Callout>
              )}

              <div className="rounded-xl border border-success/25 bg-success-soft p-4 md:p-5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <Calculator className="h-4 w-4 text-success" aria-hidden="true" />
                  Action-Plan
                </h3>
                <ol className="space-y-2">
                  {[
                    "1. **LUCID-Registrierung** bei https://lucid.verpackungsregister.org (kostenlos, ~15 Min)",
                    "2. **Stamm-Daten eintragen**: Firma, USt-ID, HR-Nr, Adresse, Marken-Namen",
                    "3. **Duales System wählen** (Top-Liste vorher) und Lizenz abschließen",
                    "4. **Mengen-Erklärung** in LUCID hochladen (vom dualen System bekommst du den Beleg)",
                    "5. **Jährliche Vollständigkeitserklärung** (VE) bis 15.05. des Folgejahres bei Über-Schwellen-Mengen",
                    "6. **Bei Marketplaces** (Amazon FBA, Kaufland, eBay): zusätzlich dein LUCID-Codenummer als Verkäufer hinterlegen",
                  ].map((s, i) => (
                    <li
                      key={i}
                      className="text-sm leading-relaxed text-foreground/85"
                      dangerouslySetInnerHTML={{
                        __html: s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"),
                      }}
                    />
                  ))}
                </ol>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button asChild>
                  <a
                    href="https://lucid.verpackungsregister.org"
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => trackEvent("cta_clicked", { which: "lucid_portal" })}
                  >
                    <ExternalLink className="mr-1.5 h-4 w-4" aria-hidden="true" /> LUCID-Portal öffnen
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="https://www.verpackungsregister.org/themen/duale-systeme" target="_blank" rel="noreferrer noopener">
                    Liste aller dualen Systeme
                  </a>
                </Button>
              </div>
            </div>
          </TrialResult>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-5">
          <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
            <ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" /> Zurück
          </Button>
          {step < 5 ? (
            <Button
              onClick={() => {
                if (step === 3 && trial && !trial.beforeRun()) return;
                setStep(step + 1);
              }}
              disabled={(step === 1 && verkauft2024 === false) || (step === 3 && !step3HasMengen)}
              title={
                step === 1 && verkauft2024 === false
                  ? "Du hast 'keine physische Ware' gewählt — keine LUCID-Pflicht. Falls sich das ändert, wähle oben Ja."
                  : step === 3 && !step3HasMengen
                  ? "Trag mindestens ein Material mit Menge > 0 ein."
                  : ""
              }
            >
              Weiter <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
            </Button>
          ) : (
            <Button variant="outline" onClick={() => setStep(1)}>
              <RotateCcw className="mr-1.5 h-4 w-4" aria-hidden="true" /> Neu starten
            </Button>
          )}
        </div>
        </ToolSection>

        <Callout tone="danger" title="Kritische Verpackungsregeln 2025/2026" className="mb-4">
          <ul className="list-disc space-y-1.5 pl-4">
            <li>
              <strong className="text-foreground">PPWR (EU 2025/40):</strong> in Kraft 11.2.2025,
              Hauptpflichten ab <strong>12.8.2026</strong>. Empty-Space-Ratio ≤50% in E-Com-Kartons,
              Recyclat-Quoten 10-35% ab 2030, Single-Use-Verbote für To-Go (2030).
            </li>
            <li>
              <strong className="text-foreground">EWKFondsG (Einwegkunststofffonds):</strong> live seit
              01.01.2024, Doppelbelastung zu LUCID. Sätze pro kg:
              Getränkebecher €1,236 · Tüten €0,876 · Lebensmittelbehälter €0,177 · Feuchttücher €0,061 ·
              <strong className="text-danger"> Tabakfilter €8,972</strong>. Meldung via DIVID-Plattform (UBA),
              keine Schwellenwerte: ab 1 kg/Jahr meldepflichtig.
            </li>
            <li>
              <strong className="text-foreground">Mehrweg-Angebotspflicht (§ 60 VerpackDG, vorher § 33 VerpackG)</strong> seit 1.1.2023:
              Letztvertreiber von Einweg-Plastik-Lebensmittelverpackungen + Einweg-Bechern. Ausnahme: ≤5 MA
              UND ≤80 m² Verkaufsfläche.
            </li>
            <li>
              <strong className="text-foreground">Prüfpflicht für Marktplätze und Fulfilment</strong> (seit 1.7.2022, jetzt
              § 13 Abs. 4 VerpackDG + PPWR/DSA): Fulfilment-Dienstleister dürfen ohne LUCID-Registrierung des
              Herstellers nicht tätig werden, Amazon/eBay/Etsy prüfen die LUCID-Nr. ihrer Seller. Ohne LUCID:
              Listing-Sperre.
            </li>
            <li>
              <strong className="text-foreground">Tarife 2026 stark erhöht:</strong> Kunststoff +9,4%,
              Aluminium +12,2%, Glas <strong className="text-danger">+23,9%</strong>, Verbund +8-10%.
              Gesamtmenge im System sinkt -2,3% YoY, Druck auf Preise. Anbieter-Vergleich Pflicht ab
              ~500 kg Plastik.
            </li>
          </ul>
        </Callout>

        <Callout tone="warning" title="Wichtig">
          <ul className="list-disc space-y-1 pl-4">
            <li>
              <strong>Bußgeld bis 100.000 €</strong> bei fehlender Registrierung, <strong>bis 200.000 €</strong> bei fehlender Systembeteiligung, dazu Vertriebsverbot (§§ 13, 66 VerpackDG)
            </li>
            <li>
              <strong>VerpackDG seit 12.8.2026</strong>: löst das VerpackG (2019) ab und ergänzt die EU-Verpackungsverordnung
              PPWR. ZSVR (Zentrale Stelle Verpackungsregister) führt weiter das Register LUCID
            </li>
            <li>
              <strong>Marketplace-Verkäufer</strong>: Seit 2022 sind Amazon, eBay, Kaufland verpflichtet, die
              LUCID-Nummer ihrer Seller zu prüfen. Wer keine hat, wird gesperrt
            </li>
            <li>
              <strong>Kleinmengen</strong> (typisch &lt; 80 kg/Jahr): Mehrere Systeme bieten Mini-Lizenzen ab 75
              €/Jahr
            </li>
            <li>
              <strong>Vollständigkeitserklärung (§ 10 VerpackDG)</strong> ab 80.000 kg Glas, 50.000 kg
              Papier/Karton oder 30.000 kg übrige Materialien, geprüft durch registrierten Sachverständigen (oder WP/StB)
            </li>
          </ul>
        </Callout>
      </div>
    </CockpitShell>
  );
};

export default LucidWizard;
