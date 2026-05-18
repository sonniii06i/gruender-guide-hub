import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Package,
  ExternalLink,
  Calculator,
  Sparkles,
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
  const [step, setStep] = useState(1);
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
    return { low: Math.max(75, low), mid: Math.max(75, mid), high: Math.max(75, high) };
  }, [materialMengen]);

  const recommendedSystems = useMemo(() => {
    if (isKleinmenge) return SYSTEMS.filter((s) => ["lizenzero", "noventiz"].includes(s.slug));
    if (totalKg < 1000) return SYSTEMS.filter((s) => ["lizenzero", "interzero", "noventiz"].includes(s.slug));
    if (totalKg < 10000)
      return SYSTEMS.filter((s) => ["interzero", "bellandvision", "prezero", "zentek"].includes(s.slug));
    return SYSTEMS.filter((s) => ["prezero", "bellandvision", "interzero", "der-gruene-punkt"].includes(s.slug));
  }, [totalKg, isKleinmenge]);

  const updateMenge = (k: MaterialKey, val: number) =>
    setMaterialMengen({ ...materialMengen, [k]: Math.max(0, val) });

  return (
    <CockpitShell
      eyebrow="LUCID-Wizard"
      title="Verpackungsregister-Anmeldung Step-by-Step"
      subtitle="LUCID-Registrierung + 9 duale Systeme + Kosten-Schätzung 2026 (Tarife +9-24% vs 2025!). Inkl. PPWR (EU 2025/40, Hauptpflichten 12.8.2026), EWKFondsG-Doppelbelastung (€8,97/kg Tabakfilter!), Mehrweg-Pflicht §33, §7c-Marketplace-Haftung. Stand Mai 2026."
    >
      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex items-center gap-1.5 flex-1">
            <div
              className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                s < step
                  ? "bg-emerald-500 text-white"
                  : s === step
                  ? "bg-accent-blue text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {s < step ? <CheckCircle2 className="h-3 w-3" /> : s}
            </div>
            {s < 5 && <div className={`h-0.5 flex-1 ${s < step ? "bg-emerald-500" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 mb-6">
        {step === 1 && (
          <>
            <h2 className="text-base font-bold mb-1">1. Bist du LUCID-pflichtig?</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Pflicht für JEDEN der erste in Verkehr bringt: Versand-Verpackungen, Produkt-Verpackungen,
              Service-Verpackungen.
            </p>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 mb-4">
              <div className="font-semibold text-sm mb-2">⚠ Pflicht ab 1. verkaufter Sendung wenn:</div>
              <ul className="text-xs space-y-1 text-muted-foreground list-disc pl-5">
                <li>Du verkaufst Waren an Privatkunden in DE (B2C)</li>
                <li>Du verpackst die Ware (Karton, Tüte, Folie, Polster) — auch wenn nur Versand-Karton</li>
                <li>Auch Marketplace-Verkäufer (Amazon FBA, Kaufland, eBay) sind selbst pflichtig</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { v: true, l: "Ja, ich verkaufe Waren mit Verpackung an DE-Kunden" },
                { v: false, l: "Nein, nur Dienstleistungen / digital" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => setVerkauft2024(o.v)}
                  className={`text-left rounded-xl border p-3 text-sm transition-colors ${
                    verkauft2024 === o.v
                      ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                      : "border-border hover:border-accent-blue/40"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
            {verkauft2024 === false && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm text-emerald-700 mt-4">
                ✓ Keine LUCID-Pflicht für reine Dienstleister / digitale Produkte. Wenn du später physische Ware
                verkaufst, MUSS Anmeldung VOR der ersten Sendung erfolgen.
              </div>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-base font-bold mb-1">2. Firmen-Daten</h2>
            <p className="text-xs text-muted-foreground mb-4">Daten für die LUCID-Anmeldung.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="md:col-span-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Firmenname</Label>
                <Input
                  value={firmenname}
                  onChange={(e) => setFirmenname(e.target.value)}
                  placeholder="z.B. Mustermann GmbH"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">HR-Nummer</Label>
                <Input
                  value={hrnummer}
                  onChange={(e) => setHrnummer(e.target.value)}
                  placeholder="HRB 12345 B"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">USt-ID</Label>
                <Input
                  value={ustId}
                  onChange={(e) => setUstId(e.target.value)}
                  placeholder="DE123456789"
                  className="mt-1"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Geschäftsadresse</Label>
                <Input
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  placeholder="Musterstr. 1, 10115 Berlin"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="rounded-xl border border-accent-blue/30 bg-accent-blue/5 p-3 mt-4 text-xs">
              💡 LUCID-Registrierung selbst ist <strong>kostenlos</strong> bei der Stiftung Zentrale Stelle. Der
              Pflichtteil sind nur Stammdaten.
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-base font-bold mb-1">3. Verpackungs-Mengen pro Jahr</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Trage die Gesamt-Menge pro Material ein (Schätzung Jahresende). LUCID + duales System brauchen das
              jährlich.
            </p>
            <div className="space-y-2">
              {(Object.keys(MATERIAL_LABELS) as MaterialKey[]).map((k) => (
                <div key={k} className="rounded-xl border border-border bg-card p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{MATERIAL_LABELS[k].emoji}</span>
                      <Label className="text-sm font-semibold">{MATERIAL_LABELS[k].name}</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min={0}
                        value={materialMengen[k] || ""}
                        onChange={(e) => updateMenge(k, Number(e.target.value) || 0)}
                        placeholder="0"
                        className="w-32 h-8 text-right text-sm"
                      />
                      <span className="text-xs text-muted-foreground">kg/Jahr</span>
                    </div>
                  </div>
                  {materialMengen[k] > 0 && (
                    <div className="text-[10px] text-muted-foreground mt-1">
                      Geschätzte Lizenzkosten:{" "}
                      {(materialMengen[k] * MATERIAL_LABELS[k].ratePerKg.low).toFixed(0)} €
                      —{" "}
                      {(materialMengen[k] * MATERIAL_LABELS[k].ratePerKg.high).toFixed(0)} €/Jahr
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-secondary/40 p-3 mt-3 text-xs">
              <strong>Total: {totalKg.toLocaleString("de-DE")} kg/Jahr</strong>
              {isKleinmenge && (
                <span className="text-emerald-700 ml-2">→ Kleinmengen-Tarif möglich (oft 75–150 €/Jahr)</span>
              )}
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-base font-bold mb-1">4. Empfohlene duale Systeme</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Du musst dich bei einem dualen System lizenzieren — du wählst aus 9 zugelassenen Anbietern. Hier die
              für deine Mengen passendsten:
            </p>
            <div className="space-y-2">
              {recommendedSystems.map((s) => (
                <a
                  key={s.slug}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="block rounded-xl border border-border bg-card p-4 hover:border-accent-blue/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-bold text-sm mb-1">
                        {s.name}{" "}
                        <span className="text-[10px] font-normal text-muted-foreground">
                          ({s.marketShare} Markt)
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mb-1">{s.pricing}</div>
                      <div className="text-[11px] text-emerald-700">→ Best für: {s.bestFor}</div>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-1" />
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h2 className="text-base font-bold mb-1">5. Übersicht + nächste Schritte</h2>
            <p className="text-xs text-muted-foreground mb-4">Zusammenfassung deiner Daten + Action-Plan.</p>

            <div className="rounded-2xl border border-border bg-secondary/30 p-4 mb-4 text-sm">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Firma:</span>
                  <span className="font-semibold">{firmenname || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">USt-ID:</span>
                  <span className="font-mono">{ustId || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Verpackung:</span>
                  <span className="font-mono">{totalKg.toLocaleString("de-DE")} kg/Jahr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Geschätzte Kosten:</span>
                  <span className="font-mono">
                    {Math.round(costEstimate.low)}–{Math.round(costEstimate.high)} €/Jahr
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 mb-4">
              <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
                <Calculator className="h-4 w-4 text-emerald-700" />
                Action-Plan
              </h3>
              <ol className="space-y-2 text-sm">
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
                    className="text-xs leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"),
                    }}
                  />
                ))}
              </ol>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href="https://lucid.verpackungsregister.org"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90"
              >
                <ExternalLink className="h-4 w-4" /> LUCID-Portal öffnen
              </a>
              <a
                href="https://www.verpackungsregister.org/themen/duale-systeme"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary"
              >
                Liste aller dualen Systeme
              </a>
            </div>
          </>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Zurück
          </button>
          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90"
            >
              Weiter <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary"
            >
              <Sparkles className="h-4 w-4" /> Nochmal
            </button>
          )}
        </div>
      </div>

      {/* ★ KRITISCHE 2025/2026-UPDATES (NEU) */}
      <div className="rounded-2xl border-2 border-red-500/40 bg-red-500/5 p-4 mb-3 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-red-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-red-700 mb-2">★ Kritische Verpackungs-Regelungen 2025/2026</div>
            <ul className="list-disc pl-4 space-y-1.5 text-muted-foreground">
              <li>
                <strong className="text-foreground">PPWR (EU 2025/40):</strong> in Kraft 11.2.2025,
                Hauptpflichten ab <strong>12.8.2026</strong>. Empty-Space-Ratio ≤50% in E-Com-Kartons,
                Recyclat-Quoten 10-35% ab 2030, Single-Use-Verbote für To-Go (2030).
              </li>
              <li>
                <strong className="text-foreground">EWKFondsG (Einwegkunststofffonds):</strong> live seit
                01.01.2024 — DOPPELBELASTUNG zu LUCID! Sätze pro kg:
                Getränkebecher €1,236 · Tüten €0,876 · Lebensmittelbehälter €0,177 · Feuchttücher €0,061 ·
                <strong className="text-red-700"> Tabakfilter €8,972</strong>. Meldung via DIVID-Plattform (UBA),
                KEINE Schwellenwerte — ab 1 kg/Jahr meldepflichtig.
              </li>
              <li>
                <strong className="text-foreground">Mehrweg-Pflicht §33 VerpackG</strong> seit 1.1.2023 —
                Letztvertreiber von Einweg-Plastik-Lebensmittelverpackungen + Einweg-Bechern. Ausnahme: ≤5 MA
                UND ≤80 m² Verkaufsfläche.
              </li>
              <li>
                <strong className="text-foreground">§7c VerpackG Marketplace-Haftung</strong> seit 1.7.2022:
                Amazon/eBay/Etsy MÜSSEN LUCID-Nr. + Systembeteiligung jedes Sellers prüfen — sonst
                Mitstörer-Haftung. Ohne LUCID: Listing-Blockade binnen Tagen!
              </li>
              <li>
                <strong className="text-foreground">Tarife 2026 stark erhöht:</strong> Kunststoff +9,4%,
                Aluminium +12,2%, Glas <strong className="text-red-700">+23,9%</strong>, Verbund +8-10%.
                Gesamtmenge im System sinkt -2,3% YoY → Druck auf Preise. Anbieter-Vergleich Pflicht ab
                ~500 kg Plastik.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Wichtig:</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                <strong>Bußgeld bis 200.000 €</strong> bei fehlender Registrierung + Vertriebsverbot
              </li>
              <li>
                <strong>VerpackG seit 2019</strong> — Nachfolger der alten Verpackungsverordnung. ZSVR (Zentrale
                Stelle Verpackungsregister) als Behörde
              </li>
              <li>
                <strong>Marketplace-Verkäufer</strong>: seit 2022 sind Amazon, eBay, Kaufland verpflichtet,
                LUCID-Nummer ihrer Seller zu prüfen → wer keine hat, wird gesperrt
              </li>
              <li>
                <strong>Kleinmengen</strong> (typisch &lt; 80 kg/Jahr): Mehrere Systeme bieten Mini-Lizenzen ab 75
                €/Jahr
              </li>
              <li>
                <strong>Vollständigkeitserklärung</strong> bei Über-Schwellen-Mengen (50.000 kg Glas, 30.000 kg
                Papier, etc.) — geprüft durch IHK-Sachverständigen
              </li>
            </ul>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

export default LucidWizard;
