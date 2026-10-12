import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { Callout, Field, ResultPanel, ToneBadge, ToolLayout, ToolSection, selectCls } from "@/components/cockpit/kit";
import { Calculator, AlertTriangle, TrendingUp, SlidersHorizontal, ChevronDown, Plus, Minus } from "lucide-react";
import {
  annuityFV as annuity_fv,
  RUERUP_MAX_SINGLE,
  BAV_STEUERFREI_QUOTE,
  BAV_SV_FREI_QUOTE,
  BBG_RV_WEST_JAHR,
  BAV_KV_FREIBETRAG_JAHR_2026,
  RIESTER_MAX,
  RIESTER_GRUNDZULAGE,
  RIESTER_KIND_ZULAGE_AB_2008,
  RIESTER_KIND_ZULAGE_VOR_2008,
  RIESTER_SOCKELBETRAG,
  RIESTER_MINDEST_EIGENBEITRAG_QUOTE,
} from "@/lib/germanTax";

type EtfTyp = "aktien" | "misch" | "anleihen";
const TEILFREISTELLUNG: Record<EtfTyp, number> = {
  aktien: 0.30,   // §20 InvStG: 30% steuerfrei für Aktien-Anteil ≥51%
  misch: 0.15,    // 15% für Mischfonds (Aktien-Anteil 25-50%)
  anleihen: 0,    // 0% für Anleihen/Geldmarkt-Fonds
};

const PensionOptimizer = () => {
  const [alter, setAlter] = useState(35);
  const [renteAlter, setRenteAlter] = useState(67);
  const [jahresEinkommen, setJahresEinkommen] = useState(80000);
  const [estSatz, setEstSatz] = useState(0.42);
  const [monatlichSparen, setMonatlichSparen] = useState(500);
  const [annualReturn, setAnnualReturn] = useState(0.06);
  // Beherrschender GF? → keine SV-Pflicht auf bAV-Beiträge, also keine SV-Ersparnis
  const [istBeherrschenderGF, setIstBeherrschenderGF] = useState(false);
  // Riester: Kinder differenziert nach Geburtsjahr (300 € ab 2008, 185 € vor 2008)
  const [riesterKinderAb2008, setRiesterKinderAb2008] = useState(0);
  const [riesterKinderVor2008, setRiesterKinderVor2008] = useState(0);
  // ETF-Asset-Klasse für Teilfreistellung
  const [etfTyp, setEtfTyp] = useState<EtfTyp>("aktien");
  // Re-Invest der Sparphasen-Steuerersparnis? Sonst undiskontiert
  const [reinvestSteuerErsparnis, setReinvestSteuerErsparnis] = useState(true);
  // NPV-Diskontierungssatz (Inflation/Opportunitätskosten) — Default 2,5% real
  const [diskontierungssatz, setDiskontierungssatz] = useState(0.025);

  const jahre = renteAlter - alter;
  const jaehrlichSparen = monatlichSparen * 12;

  // Vereinfachte Berechnungen
  const calc = useMemo(() => {
    const yearsToRetirement = Math.max(1, jahre);

    // ETF-Privat: Sparplan mit thesaurierendem ETF.
    // Vorabpauschale (Basiszins × 70% × Bestand × Aktien-Teilfreistellung × 26,375%) ≈ 0,3-0,7%/J Drag.
    const teilfreistellung = TEILFREISTELLUNG[etfTyp];
    const etfReturn = annualReturn - 0.005; // 0,5% Steuer-Drag während Sparphase
    const etfEnd = annuity_fv(jaehrlichSparen, etfReturn, yearsToRetirement);
    const etfGewinn = etfEnd - jaehrlichSparen * yearsToRetirement;
    // AbgSt auf Gewinn mit Teilfreistellung (Aktien 30%, Misch 15%, Anleihen 0%)
    const etfAbgSt = etfGewinn * 0.26375 * (1 - teilfreistellung);
    const etfNetEnd = etfEnd - etfAbgSt;

    // Helper: Steuer-Ersparnis-Reinvestition (in einem ETF mit netto-Rendite annualReturn-0,005)
    const reinvestErsparnis = (jaehrlichErsparnis: number) =>
      reinvestSteuerErsparnis ? annuity_fv(jaehrlichErsparnis, annualReturn - 0.005, yearsToRetirement) - jaehrlichErsparnis * yearsToRetirement : 0;

    // Rürup-Höchstbetrag (Stand 2025; 2026-Wert via BMF-Schreiben — Approximation)
    const ruerup_max = RUERUP_MAX_SINGLE;
    const ruerup_sparen = Math.min(jaehrlichSparen, ruerup_max);
    const ruerup_steuerErsparnisProJahr = ruerup_sparen * estSatz;
    const ruerup_end = annuity_fv(jaehrlichSparen, annualReturn, yearsToRetirement);
    const ruerup_renteJaehrlich = ruerup_end / 20;
    const ruerup_steuerImRentenalter = ruerup_renteJaehrlich * 0.25 * 20;
    const ruerup_netto = ruerup_end - ruerup_steuerImRentenalter;
    const ruerup_steuerErsparnisGesamt = ruerup_steuerErsparnisProJahr * yearsToRetirement;
    const ruerup_reinvestGewinn = reinvestErsparnis(ruerup_steuerErsparnisProJahr);
    const ruerup_finalEffekt = ruerup_netto + ruerup_steuerErsparnisGesamt + ruerup_reinvestGewinn;

    // bAV §3 Nr. 63 EStG: 8 % BBG-RV steuerfrei, davon 4 % zusätzlich SV-frei.
    // 2026 (BBG bundeseinheitlich 101.400): Steuer-frei bis 8.112 €, SV-frei bis 4.056 €.
    const bav_max_steuerfrei = BBG_RV_WEST_JAHR * BAV_STEUERFREI_QUOTE;
    const bav_sparen = Math.min(jaehrlichSparen, bav_max_steuerfrei);
    const bav_max_svfrei = BBG_RV_WEST_JAHR * BAV_SV_FREI_QUOTE;
    const bav_sv_anteil_an = istBeherrschenderGF ? 0 : 0.10;
    const bav_sv_ersparnis_pro_jahr = Math.min(bav_sparen, bav_max_svfrei) * bav_sv_anteil_an;
    const bav_steuerErsparnisProJahr = bav_sparen * estSatz + bav_sv_ersparnis_pro_jahr;
    const bav_end = annuity_fv(jaehrlichSparen, annualReturn - 0.01, yearsToRetirement);
    const bav_renteJaehrlich = bav_end / 20;
    const bav_steuerImRentenalter = bav_renteJaehrlich * 0.25 * 20;
    // bAV ist Versorgungsbezug (§229 SGB V) → voller KV-Beitrag (~14,6 % + Zusatzbeitrag) im Alter.
    // Versorgungsbezüge-Freibetrag (§226 Abs. 2 SGB V, 2026: 2.373 €/J) gilt NUR für KVdR-Pflichtversicherte.
    // Beherrschende GmbH-GF sind i.d.R. freiwillig/privat versichert → kein Freibetrag, gesamte bAV beitragspflichtig.
    const bav_kv_freibetrag = istBeherrschenderGF ? 0 : BAV_KV_FREIBETRAG_JAHR_2026;
    const bav_kv_basis_jaehrlich = Math.max(0, bav_renteJaehrlich - bav_kv_freibetrag);
    const bav_kvImRentenalter = bav_kv_basis_jaehrlich * 0.146 * 20;
    const bav_netto = bav_end - bav_steuerImRentenalter - bav_kvImRentenalter;
    const bav_steuerErsparnisGesamt = bav_steuerErsparnisProJahr * yearsToRetirement;
    const bav_reinvestGewinn = reinvestErsparnis(bav_steuerErsparnisProJahr);
    const bav_finalEffekt = bav_netto + bav_steuerErsparnisGesamt + bav_reinvestGewinn;

    // Riester: §86 EStG Mindesteigenbeitrag = 4 % Vorjahres-Brutto abzgl. Zulagen, mindestens 60 € (Sockel).
    // Zulagen werden nur GANZ ausgezahlt, wenn Mindesteigenbeitrag erfüllt — sonst anteilig gekürzt.
    const riester_max = RIESTER_MAX;
    const riester_sparen = Math.min(jaehrlichSparen, riester_max);
    const riester_zulagen_gesamt =
      RIESTER_GRUNDZULAGE +
      Math.max(0, riesterKinderAb2008) * RIESTER_KIND_ZULAGE_AB_2008 +
      Math.max(0, riesterKinderVor2008) * RIESTER_KIND_ZULAGE_VOR_2008;
    // Mindesteigenbeitrag prüfen
    const riester_mindest_brutto = jahresEinkommen * RIESTER_MINDEST_EIGENBEITRAG_QUOTE - riester_zulagen_gesamt;
    const riester_mindest_eigenbeitrag = Math.max(RIESTER_SOCKELBETRAG, riester_mindest_brutto);
    const riester_zulagen_quote = riester_sparen >= riester_mindest_eigenbeitrag
      ? 1
      : Math.max(0, riester_sparen / Math.max(1, riester_mindest_eigenbeitrag));
    const riester_zulagen_effektiv = riester_zulagen_gesamt * riester_zulagen_quote;
    const riester_steuerersparnis_brutto = riester_sparen * estSatz;
    const riester_steuerErsparnisProJahr = Math.max(0, riester_steuerersparnis_brutto - riester_zulagen_effektiv);
    const riester_end = annuity_fv(riester_sparen + riester_zulagen_effektiv, annualReturn - 0.015, yearsToRetirement);
    const riester_steuerErsparnisGesamt = riester_steuerErsparnisProJahr * yearsToRetirement;
    const riester_renteJaehrlich = riester_end / 20;
    const riester_steuerImRentenalter = riester_renteJaehrlich * 0.25 * 20;
    const riester_netto = riester_end - riester_steuerImRentenalter;
    const riester_reinvestGewinn = reinvestErsparnis(riester_steuerErsparnisProJahr);
    const riester_finalEffekt = riester_netto + riester_steuerErsparnisGesamt + riester_reinvestGewinn;

    // === NPV: Auszahlungswerte (in Y Jahren) auf Heute diskontieren ===
    // discountFactor = 1 / (1 + r)^Y
    const discountFactor = 1 / Math.pow(1 + diskontierungssatz, yearsToRetirement);
    const npv = (futureNetto: number, sparphasenSteuerCash: number) =>
      futureNetto * discountFactor + sparphasenSteuerCash;
    const etf_npv = npv(etfNetEnd, 0);
    const ruerup_npv = npv(ruerup_netto, ruerup_steuerErsparnisGesamt);
    const bav_npv = npv(bav_netto, bav_steuerErsparnisGesamt);
    const riester_npv = npv(riester_netto, riester_steuerErsparnisGesamt);
    // riester quote für Anzeige
    const riester_warnung_quote = riester_zulagen_quote < 1
      ? `⚠ Eigenbeitrag ${riester_sparen.toFixed(0)} € < Mindest ${riester_mindest_eigenbeitrag.toFixed(0)} € → Zulagen nur zu ${(riester_zulagen_quote * 100).toFixed(0)} %`
      : null;

    return {
      etf: {
        endkapital: etfEnd, netto: etfNetEnd, steuerErsparnis: 0,
        finalEffekt: etfNetEnd, npv: etf_npv,
      },
      ruerup: {
        endkapital: ruerup_end, netto: ruerup_netto,
        steuerErsparnis: ruerup_steuerErsparnisGesamt,
        finalEffekt: ruerup_finalEffekt, npv: ruerup_npv,
      },
      bav: {
        endkapital: bav_end, netto: bav_netto,
        steuerErsparnis: bav_steuerErsparnisGesamt,
        finalEffekt: bav_finalEffekt, npv: bav_npv,
        bavKvBasis: bav_kv_basis_jaehrlich,
      },
      riester: {
        endkapital: riester_end, netto: riester_netto,
        steuerErsparnis: riester_steuerErsparnisGesamt,
        finalEffekt: riester_finalEffekt, npv: riester_npv,
        warnung: riester_warnung_quote,
        zulagen_effektiv: riester_zulagen_effektiv,
      },
    };
  }, [jahre, jaehrlichSparen, estSatz, annualReturn, istBeherrschenderGF, riesterKinderAb2008, riesterKinderVor2008, etfTyp, reinvestSteuerErsparnis, diskontierungssatz, jahresEinkommen]);

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
        description: "Steuerlich geförderte Basisrente — bis 30.826 €/Jahr (Single 2026, Verheiratet 61.652 €) zu 100 % als Sonderausgabe absetzbar",
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
          "Begrenzt auf 2.100 €/Jahr inkl. Zulagen",
          "**Mindesteigenbeitrag 4 % Vorjahres-Brutto** (Sockel 60 €) — sonst Zulagen anteilig gekürzt",
          "Versicherungs-Kosten oft hoch",
          "**Reform 2026 beschlossen**: Bundesrat hat am 08.05.2026 die Riester-Nachfolge verabschiedet — ab 2027 neues Modell. Bestandsverträge bleiben, Neuabschluss-Sinn fraglich",
          "Komplex / bürokratisch",
        ],
      },
    ].sort((a, b) => b.finalEffekt - a.finalEffekt);
  }, [calc]);


  const eur = (n: number) => `${Math.round(n).toLocaleString("de-DE")} €`;
  const top = sortedOptions[0];
  const checkCls = "mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]";

  return (
    <CockpitShell
      eyebrow="Pension-Optimizer"
      title="Rürup, bAV, Riester oder ETF privat"
      subtitle="Steuer-Effekt-Vergleich der 4 wichtigsten Altersvorsorge-Wege für Selbstständige und Angestellte. Endkapital und Steuer-Ersparnis werden live berechnet."
    >
      <ToolLayout
        className="mb-8"
        inputs={
          <>
            <ToolSection title="Deine Situation" icon={Calculator}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Aktuelles Alter" htmlFor="po-alter">
                  <Input
                    id="po-alter"
                    type="number"
                    value={alter}
                    onChange={(e) => setAlter(Math.max(18, Math.min(80, Number(e.target.value) || 35)))}
                    className="tabular"
                  />
                </Field>
                <Field label="Renteneintrittsalter" htmlFor="po-rente">
                  <Input
                    id="po-rente"
                    type="number"
                    value={renteAlter}
                    onChange={(e) => setRenteAlter(Math.max(60, Math.min(85, Number(e.target.value) || 67)))}
                    className="tabular"
                  />
                </Field>
                <Field label="Sparrate pro Monat (€)" htmlFor="po-sparen">
                  <Input
                    id="po-sparen"
                    type="number"
                    value={monatlichSparen}
                    onChange={(e) => setMonatlichSparen(Math.max(0, Number(e.target.value) || 0))}
                    className="tabular"
                  />
                </Field>
                <Field label="Jahreseinkommen (€)" htmlFor="po-einkommen">
                  <Input
                    id="po-einkommen"
                    type="number"
                    value={jahresEinkommen}
                    onChange={(e) => setJahresEinkommen(Math.max(0, Number(e.target.value) || 0))}
                    className="tabular"
                  />
                </Field>
                <Field label="Persönlicher Steuersatz" htmlFor="po-est">
                  <select id="po-est" value={estSatz} onChange={(e) => setEstSatz(Number(e.target.value))} className={selectCls}>
                    <option value={0.14}>14 %</option>
                    <option value={0.24}>24 %</option>
                    <option value={0.32}>32 %</option>
                    <option value={0.42}>42 %</option>
                    <option value={0.45}>45 %</option>
                  </select>
                </Field>
                <Field label="Erwartete Rendite pro Jahr" htmlFor="po-rendite">
                  <select id="po-rendite" value={annualReturn} onChange={(e) => setAnnualReturn(Number(e.target.value))} className={selectCls}>
                    <option value={0.04}>4 % (konservativ)</option>
                    <option value={0.06}>6 % (Standard MSCI World)</option>
                    <option value={0.08}>8 % (aggressiv)</option>
                    <option value={0.10}>10 % (sehr aggressiv)</option>
                  </select>
                </Field>
              </div>
              <div className="mt-4 rounded-xl bg-secondary/60 px-4 py-3 text-sm tabular">
                <strong className="font-semibold">{jahre} Jahre bis zur Rente</strong> · {jaehrlichSparen.toLocaleString("de-DE")} € pro Jahr ·
                insgesamt eingezahlt: {(jaehrlichSparen * jahre).toLocaleString("de-DE")} €
              </div>
            </ToolSection>

            <ToolSection title="Feinheiten" description="Annahmen für bAV, Riester, ETF und die Barwert-Rechnung." icon={SlidersHorizontal}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Riester-Kinder ab 2008" hint="Zulage je 300 €" htmlFor="po-kinder-ab">
                  <Input
                    id="po-kinder-ab"
                    type="number"
                    value={riesterKinderAb2008}
                    onChange={(e) => setRiesterKinderAb2008(Math.max(0, Number(e.target.value) || 0))}
                    className="tabular"
                  />
                </Field>
                <Field label="Riester-Kinder vor 2008" hint="Zulage je 185 €" htmlFor="po-kinder-vor">
                  <Input
                    id="po-kinder-vor"
                    type="number"
                    value={riesterKinderVor2008}
                    onChange={(e) => setRiesterKinderVor2008(Math.max(0, Number(e.target.value) || 0))}
                    className="tabular"
                  />
                </Field>
                <Field label="NPV-Diskontierungssatz pro Jahr" htmlFor="po-npv" className="sm:col-span-2">
                  <select id="po-npv" value={diskontierungssatz} onChange={(e) => setDiskontierungssatz(Number(e.target.value))} className={selectCls}>
                    <option value={0}>0 % (nominal, keine Diskontierung)</option>
                    <option value={0.02}>2 % (EZB-Inflationsziel)</option>
                    <option value={0.025}>2,5 % (real, Standard)</option>
                    <option value={0.04}>4 % (Opportunitäts-Rendite konservativ)</option>
                    <option value={0.06}>6 % (Aktien-Opportunität)</option>
                  </select>
                </Field>
                <Field label="ETF-Typ (Teilfreistellung § 20 InvStG)" htmlFor="po-etf" className="sm:col-span-2">
                  <select id="po-etf" value={etfTyp} onChange={(e) => setEtfTyp(e.target.value as EtfTyp)} className={selectCls}>
                    <option value="aktien">Aktien-ETF (ab 51 % Aktien, 30 % TF)</option>
                    <option value="misch">Misch-ETF (25 bis 50 % Aktien, 15 % TF)</option>
                    <option value="anleihen">Anleihen-/Geldmarkt-ETF (0 % TF)</option>
                  </select>
                </Field>
              </div>
              <div className="mt-4 space-y-2">
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-3.5 text-sm transition-colors hover:border-foreground/25">
                  <input
                    type="checkbox"
                    checked={istBeherrschenderGF}
                    onChange={(e) => setIstBeherrschenderGF(e.target.checked)}
                    className={checkCls}
                  />
                  <span>
                    <span className="font-medium">Ich bin beherrschender Geschäftsführer</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">In der Regel SV-frei, daher keine SV-Ersparnis bei der bAV.</span>
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-3.5 text-sm transition-colors hover:border-foreground/25">
                  <input
                    type="checkbox"
                    checked={reinvestSteuerErsparnis}
                    onChange={(e) => setReinvestSteuerErsparnis(e.target.checked)}
                    className={checkCls}
                  />
                  <span>
                    <span className="font-medium">Steuer-Ersparnis reinvestieren</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      Realistischer Vergleich. Sonst stehen Sparphasen-Cash und Renten-Auszahlung in 30 Jahren unvergleichbar nebeneinander.
                    </span>
                  </span>
                </label>
              </div>
            </ToolSection>
          </>
        }
        result={
          top && (
            <ResultPanel
              variant="ink"
              kicker="Steuer-optimal für dich"
              title={top.name}
              value={eur(top.finalEffekt)}
              valueHint={`Total-Effekt: Netto plus Steuer-Ersparnis${reinvestSteuerErsparnis ? " (reinvestiert)" : " (undiskontiert)"}`}
            >
              <p className="text-sm leading-relaxed text-primary-foreground/75">{top.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10">
                {[
                  { l: "Endkapital", v: eur(top.endkapital) },
                  { l: "Steuer-Ersparnis (kumuliert)", v: eur(top.steuerErsparnis) },
                ].map((k) => (
                  <div key={k.l} className="bg-white/[0.04] p-3">
                    <div className="text-xs text-primary-foreground/65">{k.l}</div>
                    <div className="mt-0.5 font-semibold text-primary-foreground tabular">{k.v}</div>
                  </div>
                ))}
              </div>
            </ResultPanel>
          )
        }
      />

      <ToolSection title="Alle 4 Optionen im Vergleich" description="Sortiert nach Total-Effekt nach Steuer." icon={TrendingUp} className="mb-6">
        <div className="space-y-3">
          {sortedOptions.map((o, i) => (
            <article
              key={o.slug}
              className={`rounded-xl border p-4 md:p-5 ${
                i === 0
                  ? "border-success/30 bg-success-soft/60"
                  : i === sortedOptions.length - 1
                  ? "border-danger/20 bg-danger-soft/40"
                  : "border-border bg-card"
              }`}
            >
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <ToneBadge tone="neutral" className="tabular">#{i + 1}</ToneBadge>
                    <h3 className="font-semibold">{o.name}</h3>
                    {i === 0 && <ToneBadge tone="success">Beste Option</ToneBadge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{o.description}</p>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-xl font-semibold tracking-tight tabular">{eur(o.finalEffekt)}</div>
                  <div className="text-xs text-muted-foreground">Total-Effekt nach Steuer</div>
                </div>
              </div>
              <div className="mb-3 grid grid-cols-2 gap-2 md:grid-cols-4">
                {[
                  { l: "Endkapital", v: o.endkapital },
                  { l: "Netto nach Steuer", v: o.netto },
                  { l: "Steuer-Ersparnis", v: o.steuerErsparnis, tone: "text-success" },
                  { l: `NPV (${(diskontierungssatz * 100).toFixed(1)} %)`, v: (o as any).npv ?? 0, tone: "text-info" },
                ].map((k) => (
                  <div key={k.l} className="rounded-lg bg-card/80 p-2.5 ring-1 ring-border/70">
                    <div className="text-xs text-muted-foreground">{k.l}</div>
                    <div className={`mt-0.5 text-sm font-semibold tabular ${k.tone ?? ""}`}>{eur(k.v)}</div>
                  </div>
                ))}
              </div>
              {(o as any).warnung && (
                <Callout tone="warning" className="mb-3 p-3 text-xs">
                  {(o as any).warnung}
                </Callout>
              )}
              <details className="group text-sm">
                <summary className="flex cursor-pointer list-none items-center gap-1 font-medium text-accent-blue [&::-webkit-details-marker]:hidden">
                  Vor- und Nachteile
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-success">
                      <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Vorteile
                    </p>
                    <ul className="space-y-1 text-muted-foreground [&_strong]:text-foreground">
                      {o.pros.map((p, j) => (
                        <li key={j} dangerouslySetInnerHTML={{ __html: "· " + p.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") }} />
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-danger">
                      <Minus className="h-3.5 w-3.5" aria-hidden="true" /> Nachteile
                    </p>
                    <ul className="space-y-1 text-muted-foreground [&_strong]:text-foreground">
                      {o.cons.map((c, j) => (
                        <li key={j} dangerouslySetInnerHTML={{ __html: "· " + c.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") }} />
                      ))}
                    </ul>
                  </div>
                </div>
              </details>
            </article>
          ))}
        </div>
      </ToolSection>

      <Callout tone="warning" title="Wichtige Vereinfachungen" icon={AlertTriangle} className="mb-6">
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>Vereinfachtes Modell: Die reale Berechnung mit Steuerberatung und deiner individuellen Vermögenssituation prüfen.</li>
          <li>
            <strong>Rürup ist für Selbstständige mit hohem Steuersatz (42 bis 45 %) meist die beste Wahl</strong>: Steuer-Ersparnis
            sofort, die Rente wird erst später besteuert (oft mit niedrigerem Rentner-Tarif).
          </li>
          <li>
            <strong>Mix-Strategie</strong>: 50 % Rürup für den Steuervorteil und 50 % ETF für Liquidität ist eine typische Empfehlung.
          </li>
          <li>
            <strong>bAV nur sinnvoll mit GmbH</strong> (du als versicherter GF). Beachte: Der bAV-KV-Freibetrag (2.373 € pro Jahr,
            2026) im Rentenalter greift NUR bei KVdR-Pflichtversicherten. Als beherrschender GmbH-GF (meist freiwillig oder privat
            versichert) zahlst du den vollen KV-Beitrag auf die gesamte bAV. Der Rechner berücksichtigt das, sobald du
            „beherrschender GF“ anhakst.
          </li>
          <li>
            <strong>Riester</strong>: nur für Angestellte oder Ehepartner von Selbstständigen.
          </li>
          <li>Rendite-Annahmen historisch (MSCI World 1990 bis 2024 etwa 7,5 % real). Die Zukunft kann anders aussehen.</li>
          <li>Konkrete Produktwahl mit Honorarberatung klären, NICHT mit Provisions-Verkäufern.</li>
        </ul>
      </Callout>

      <Stand2026Footer
        sources={[
          { label: "§10 EStG (Sonderausgaben Altersvorsorge)", url: "https://www.gesetze-im-internet.de/estg/__10.html" },
          { label: "§3 Nr. 63 EStG (bAV steuerfrei)", url: "https://www.gesetze-im-internet.de/estg/__3.html" },
          { label: "AltZertG (Riester-Zertifizierung)", url: "https://www.gesetze-im-internet.de/altzertg/" },
          { label: "BBG-RV 2026 (Bundesregierung) — bundeseinheitlich seit 2025", url: "https://www.bundesregierung.de/breg-de/aktuelles/beitragsgemessungsgrenzen-2386514" },
          { label: "bAV KV-Freibetrag 2026 (TK)", url: "https://www.tk.de/firmenkunden/versicherung/beitraege-faq/zahlen-und-grenzwerte/versorgungsbezuege-beitragspflichtig-2033042" },
          { label: "Riester-Reform 2026 (DRV Bundesrat 08.05.2026)", url: "https://www.deutsche-rentenversicherung.de/DRV/DE/Ueber-uns-und-Presse/Presse/Meldungen/2026/260508-bundesrat-reform-private-altersvorsorge.html" },
        ]}
        note="Stand 2026: Rürup-Höchstbetrag 30.826 € (Single) / 61.652 € (Verheir.) · BBG-RV 101.400 €/J bundeseinheitlich · bAV-Cap 8 % = 8.112 € · bAV-KV-Freibetrag 197,75 €/Mon · Riester-Reform vom Bundesrat am 08.05.2026 beschlossen — neues Modell ab 2027 (Bestandsverträge bleiben)."
      />
    </CockpitShell>
  );
};

export default PensionOptimizer;
