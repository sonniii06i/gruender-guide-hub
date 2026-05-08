import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, AlertTriangle, TrendingUp } from "lucide-react";

const PensionOptimizer = () => {
  const [alter, setAlter] = useState(35);
  const [renteAlter, setRenteAlter] = useState(67);
  const [jahresEinkommen, setJahresEinkommen] = useState(80000);
  const [estSatz, setEstSatz] = useState(0.42);
  const [monatlichSparen, setMonatlichSparen] = useState(500);
  const [annualReturn, setAnnualReturn] = useState(0.06);

  const jahre = renteAlter - alter;
  const jaehrlichSparen = monatlichSparen * 12;

  // Vereinfachte Berechnungen
  const calc = useMemo(() => {
    const yearsToRetirement = Math.max(1, jahre);

    // ETF-Privat: Sparplan mit thesaurierendem ETF
    // Steuerlich: 25% Vorabpauschale auf Basisertrag (TBD pro Jahr ~0,3-0,7%) + 26,375% AbgSt bei Auszahlung
    // Vereinfacht: 6% return brutto, 1% effektive Steuer-Drag durch Vorabpauschale + AbgSt-Hit am Ende
    const etfReturn = annualReturn - 0.005; // -0.5% Steuer-Drag während Sparphase
    const etfEnd = annuity_fv(jaehrlichSparen, etfReturn, yearsToRetirement);
    const etfNetEnd = etfEnd - (etfEnd - jaehrlichSparen * yearsToRetirement) * 0.26375 * 0.7; // 70% des Gewinns × AbgSt
    // Steuer-Ersparnis ETF: 0 (kein Sonderausgaben-Abzug)

    // Rürup: bis 29.344 € (2026, neuerdings 100% absetzbar) als Sonderausgaben absetzbar
    const ruerup_max = 29344;
    const ruerup_sparen = Math.min(jaehrlichSparen, ruerup_max);
    const ruerup_steuerErsparnisProJahr = ruerup_sparen * estSatz;
    const ruerup_end = annuity_fv(jaehrlichSparen, annualReturn, yearsToRetirement);
    // Auszahlung: voll als Rente besteuert (~100% steuerpflichtig ab 2040+)
    // Rentner-Steuersatz ~25%
    const ruerup_renteJaehrlich = ruerup_end / 20; // 20 Jahre Rentenbezug
    const ruerup_steuerImRentenalter = ruerup_renteJaehrlich * 0.25 * 20;
    const ruerup_netto = ruerup_end - ruerup_steuerImRentenalter;
    const ruerup_steuerErsparnisGesamt = ruerup_steuerErsparnisProJahr * yearsToRetirement;
    const ruerup_finalEffekt = ruerup_netto + ruerup_steuerErsparnisGesamt;

    // bAV (Direktversicherung über GmbH): 4% BBG steuer- + sv-frei (~3.624€ in 2026), bis 8% steuerfrei
    const bav_max_steuerfrei = 7248; // 8% von BBG ~90.600 € (West)
    const bav_sparen = Math.min(jaehrlichSparen, bav_max_steuerfrei);
    const bav_steuerErsparnisProJahr = bav_sparen * (estSatz + 0.20); // +20% SV-Ersparnis (50% Arbeitnehmer + 50% Arbeitgeber)
    const bav_end = annuity_fv(jaehrlichSparen, annualReturn - 0.01, yearsToRetirement); // -1% Versicherungs-Kosten
    // Auszahlung als Rente oder einmalig — voll steuerpflichtig + KV-Pflicht
    const bav_renteJaehrlich = bav_end / 20;
    const bav_steuerImRentenalter = bav_renteJaehrlich * 0.30 * 20; // 25% ESt + ~5% KV
    const bav_netto = bav_end - bav_steuerImRentenalter;
    const bav_steuerErsparnisGesamt = bav_steuerErsparnisProJahr * yearsToRetirement;
    const bav_finalEffekt = bav_netto + bav_steuerErsparnisGesamt;

    // Riester (für Angestellte): 175 € Grundzulage + Kinderzulagen + ESt-Sonderausgabe bis 2.100 €/Jahr
    // Vereinfacht: bis 2.100 € absetzbar, dann nachgelagerte Besteuerung
    const riester_max = 2100;
    const riester_sparen = Math.min(jaehrlichSparen, riester_max);
    const riester_zulage = 175; // Grundzulage
    const riester_steuerErsparnisProJahr = (riester_sparen + riester_zulage) * estSatz - riester_zulage; // Günstigerprüfung
    const riester_end = annuity_fv(riester_sparen + riester_zulage, annualReturn - 0.015, yearsToRetirement);
    const riester_steuerErsparnisGesamt = Math.max(0, riester_steuerErsparnisProJahr * yearsToRetirement);
    const riester_renteJaehrlich = riester_end / 20;
    const riester_steuerImRentenalter = riester_renteJaehrlich * 0.25 * 20;
    const riester_netto = riester_end - riester_steuerImRentenalter;
    const riester_finalEffekt = riester_netto + riester_steuerErsparnisGesamt;

    return {
      etf: {
        endkapital: etfEnd,
        netto: etfNetEnd,
        steuerErsparnis: 0,
        finalEffekt: etfNetEnd,
      },
      ruerup: {
        endkapital: ruerup_end,
        netto: ruerup_netto,
        steuerErsparnis: ruerup_steuerErsparnisGesamt,
        finalEffekt: ruerup_finalEffekt,
      },
      bav: {
        endkapital: bav_end,
        netto: bav_netto,
        steuerErsparnis: bav_steuerErsparnisGesamt,
        finalEffekt: bav_finalEffekt,
      },
      riester: {
        endkapital: riester_end,
        netto: riester_netto,
        steuerErsparnis: riester_steuerErsparnisGesamt,
        finalEffekt: riester_finalEffekt,
      },
    };
  }, [jahre, jaehrlichSparen, estSatz, annualReturn]);

  const sortedOptions = useMemo(() => {
    return [
      {
        slug: "etf",
        name: "ETF-Privat (Depot)",
        emoji: "📈",
        description: "Sparplan in thesaurierendes ETF-Welt-Portfolio (z.B. MSCI World oder ACWI)",
        ...calc.etf,
        pros: [
          "Maximale Flexibilität — jederzeit verkaufbar",
          "Niedrige Kosten (TER 0,2 %)",
          "Liquidität bei Schicksal/Hochzeit/Krise",
          "Vererbbarkeit ohne 100% Steuer-Last",
        ],
        cons: [
          "Keine Steuer-Ersparnis im Sparen (kein Sonderausgaben)",
          "Vorabpauschale + AbgSt auf Gewinne",
          "Bei Selbstständigen: keine SV-Effekte",
        ],
      },
      {
        slug: "ruerup",
        name: "Rürup (Basisrente)",
        emoji: "🏛️",
        description: "Steuerlich geförderte Basisrente — bis 29.344 €/Jahr (2026) zu 100 % als Sonderausgabe absetzbar",
        ...calc.ruerup,
        pros: [
          "**100 % steuerlich absetzbar** (2026)",
          "Beste Wahl für Selbstständige mit hohem ESt-Satz",
          "Pfändungsschutz wie gesetzliche Rente",
          "Hohe Sparraten möglich",
        ],
        cons: [
          "**Geld komplett gebunden bis Rentenalter** — kein vorzeitiger Zugriff",
          "Auszahlung NUR als monatliche Rente (kein Einmal-Auszahlung)",
          "Kein Vererben an Erben (außer Restsumme an Ehepartner)",
          "Nachgelagerte Besteuerung — Rente voll mit Rentner-ESt-Satz",
        ],
      },
      {
        slug: "bav",
        name: "bAV / Direktversicherung",
        emoji: "💼",
        description: "Betriebliche Altersvorsorge über GmbH — 4–8 % BBG steuer-+SV-frei",
        ...calc.bav,
        pros: [
          "Steuer- + SV-frei in der Sparphase (bis 8 % BBG / ~7.200 €)",
          "Arbeitgeber-Anteil von bisheriger SV-Ersparnis",
          "Flexible Auszahlung (Rente oder Einmalbetrag)",
        ],
        cons: [
          "Volle Besteuerung in Rentenphase + KV-Pflicht (anders als gesetzliche Rente)",
          "Rendite oft schwach (1,5-2,5 % nach Versicherungs-Kosten)",
          "Nur sinnvoll mit GmbH-Setup (du als Geschäftsführer)",
          "Hohe Stornokosten bei vorzeitiger Kündigung",
        ],
      },
      {
        slug: "riester",
        name: "Riester (für Angestellte)",
        emoji: "👨‍💼",
        description: "Steuer-Förderung + Zulage. Bis 2.100 €/Jahr absetzbar + 175 € Grundzulage + Kinderzulagen",
        ...calc.riester,
        pros: [
          "Zulagen vom Staat (175 € Grund + 300 € pro Kind)",
          "100 % Beitragsgarantie (kein Verlust)",
          "Auszahlung als Rente",
        ],
        cons: [
          "**Nur für Angestellte** (Selbstständige nur via Ehepartner)",
          "Begrenzt auf 2.100 €/Jahr",
          "Versicherungs-Kosten oft hoch",
          "Reform diskutiert — Zukunft unsicher (Politik plant Riester-Reform 2025+)",
          "Komplex / bürokratisch",
        ],
      },
    ].sort((a, b) => b.finalEffekt - a.finalEffekt);
  }, [calc]);

  return (
    <CockpitShell
      eyebrow="Pension-Optimizer"
      title="Rürup vs. bAV vs. Riester vs. ETF-Privat"
      subtitle="Steuer-Effekt-Vergleich der 4 wichtigsten Altersvorsorge-Vehikel für Selbstständige + Angestellte. Live-Berechnung der End-Kapitale + Steuer-Ersparnis."
    >
      {/* Inputs */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
        <h3 className="font-bold text-sm mb-3">Deine Situation</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Aktuelles Alter</Label>
            <Input
              type="number"
              value={alter}
              onChange={(e) => setAlter(Math.max(18, Math.min(80, Number(e.target.value) || 35)))}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Renteneintritts-Alter</Label>
            <Input
              type="number"
              value={renteAlter}
              onChange={(e) => setRenteAlter(Math.max(60, Math.min(85, Number(e.target.value) || 67)))}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Sparrate / Monat</Label>
            <Input
              type="number"
              value={monatlichSparen}
              onChange={(e) => setMonatlichSparen(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Jahres-Einkommen (€)</Label>
            <Input
              type="number"
              value={jahresEinkommen}
              onChange={(e) => setJahresEinkommen(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Persönl. ESt-Satz</Label>
            <select
              value={estSatz}
              onChange={(e) => setEstSatz(Number(e.target.value))}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value={0.14}>14 %</option>
              <option value={0.24}>24 %</option>
              <option value={0.32}>32 %</option>
              <option value={0.42}>42 %</option>
              <option value={0.45}>45 %</option>
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Erwartete Rendite p.a.</Label>
            <select
              value={annualReturn}
              onChange={(e) => setAnnualReturn(Number(e.target.value))}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value={0.04}>4 % (konservativ)</option>
              <option value={0.06}>6 % (Standard MSCI World)</option>
              <option value={0.08}>8 % (aggressiv)</option>
              <option value={0.10}>10 % (sehr aggressiv)</option>
            </select>
          </div>
        </div>
        <div className="rounded-xl bg-secondary/40 p-3 mt-3 text-xs">
          <strong>{jahre} Jahre bis Rente</strong> · {jaehrlichSparen.toLocaleString("de-DE")} €/Jahr Sparrate · Total
          eingezahlt: {(jaehrlichSparen * jahre).toLocaleString("de-DE")} €
        </div>
      </div>

      {/* Top-Empfehlung */}
      {sortedOptions.length > 0 && (
        <div className="rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-card via-card to-emerald-500/5 p-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-emerald-700" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Steuer-optimal für dich
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-1">
            {sortedOptions[0].emoji} {sortedOptions[0].name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{sortedOptions[0].description}</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-secondary/40 p-3">
              <div className="text-[10px] text-muted-foreground uppercase">Endkapital</div>
              <div className="text-base font-bold">
                {Math.round(sortedOptions[0].endkapital).toLocaleString("de-DE")} €
              </div>
            </div>
            <div className="rounded-lg bg-secondary/40 p-3">
              <div className="text-[10px] text-muted-foreground uppercase">Steuer-Ersparnis (kumuliert)</div>
              <div className="text-base font-bold text-emerald-700">
                {Math.round(sortedOptions[0].steuerErsparnis).toLocaleString("de-DE")} €
              </div>
            </div>
            <div className="rounded-lg bg-emerald-500/10 p-3">
              <div className="text-[10px] text-emerald-700 uppercase">Total-Effekt</div>
              <div className="text-base font-bold text-emerald-700">
                {Math.round(sortedOptions[0].finalEffekt).toLocaleString("de-DE")} €
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alle Optionen Vergleich */}
      <h3 className="text-base font-bold mb-3">Alle 4 Optionen im Vergleich</h3>
      <div className="space-y-3 mb-6">
        {sortedOptions.map((o, i) => (
          <div
            key={o.slug}
            className={`rounded-2xl border p-5 ${
              i === 0
                ? "border-emerald-500/40 bg-emerald-500/5"
                : i === sortedOptions.length - 1
                ? "border-red-500/30 bg-red-500/5"
                : "border-border bg-card"
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
              <div className="flex items-start gap-3">
                <span className="text-3xl">{o.emoji}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="rounded-full bg-secondary text-muted-foreground px-2 py-0.5 text-[10px] font-bold">
                      #{i + 1}
                    </span>
                    <h4 className="font-bold">{o.name}</h4>
                    {i === 0 && (
                      <span className="rounded-full bg-emerald-500/10 text-emerald-700 px-2 py-0.5 text-[10px] font-semibold">
                        ✓ Beste
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{o.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold">{Math.round(o.finalEffekt).toLocaleString("de-DE")} €</div>
                <div className="text-[10px] text-muted-foreground">Total-Effekt nach Steuer</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs mb-3">
              <div className="rounded-lg bg-secondary/40 p-2">
                <div className="text-[10px] text-muted-foreground uppercase">Endkapital</div>
                <div className="font-mono">{Math.round(o.endkapital).toLocaleString("de-DE")} €</div>
              </div>
              <div className="rounded-lg bg-secondary/40 p-2">
                <div className="text-[10px] text-muted-foreground uppercase">Netto nach Steuer</div>
                <div className="font-mono">{Math.round(o.netto).toLocaleString("de-DE")} €</div>
              </div>
              <div className="rounded-lg bg-emerald-500/10 p-2">
                <div className="text-[10px] text-emerald-700 uppercase">Steuer-Ersparnis</div>
                <div className="font-mono">{Math.round(o.steuerErsparnis).toLocaleString("de-DE")} €</div>
              </div>
            </div>
            <details className="text-xs">
              <summary className="cursor-pointer font-semibold text-muted-foreground">Pros / Cons ▾</summary>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold mb-1">+</div>
                  <ul className="space-y-0.5 text-muted-foreground">
                    {o.pros.map((p, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: "· " + p.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") }} />
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-red-700 font-semibold mb-1">−</div>
                  <ul className="space-y-0.5 text-muted-foreground">
                    {o.cons.map((c, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: "· " + c.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") }} />
                    ))}
                  </ul>
                </div>
              </div>
            </details>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Wichtige Vereinfachungen:</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                Vereinfachtes Modell — reale Berechnung mit StB und individueller Vermögens-Situation prüfen
              </li>
              <li>
                <strong>Rürup ist meist beste Wahl für Selbstständige mit hohem ESt-Satz</strong> (42–45 %) —
                Steuer-Ersparnis sofort, Rente erst in der Zukunft besteuert (oft niedrigerer Rentner-Tarif)
              </li>
              <li>
                <strong>Mix-Strategie</strong>: 50 % Rürup für Steuer-Vorteil + 50 % ETF für Liquidität ist typische
                Empfehlung
              </li>
              <li>
                <strong>bAV nur sinnvoll mit GmbH</strong> (du als GF-Versicherter)
              </li>
              <li>
                <strong>Riester</strong>: nur für Angestellte oder Ehepartner von Selbstständigen
              </li>
              <li>
                Rendite-Annahmen historisch (MSCI World 1990–2024 ~7,5 % real). Zukunft kann anders sein.
              </li>
              <li>Konkrete Produktwahl mit Honorarberater (NICHT Provisions-Verkäufer) klären</li>
            </ul>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

// Future-Value einer Annuität
function annuity_fv(annualPayment: number, rate: number, years: number): number {
  if (rate === 0) return annualPayment * years;
  return annualPayment * (Math.pow(1 + rate, years) - 1) / rate;
}

export default PensionOptimizer;
