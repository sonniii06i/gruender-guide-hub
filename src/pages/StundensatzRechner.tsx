/**
 * StundensatzRechner — "Welchen Stundensatz muss ich nehmen?"
 *
 * Tool 6 der Anfänger-Wave (Starter-Kategorie, Wave 2).
 *
 * Rückwärts-Rechnung: Wunsch-Netto + Lebenshaltung + KV + Rücklage + BA = nötiger
 * Brutto-Umsatz pro Jahr. Dann durch Billable-Stunden teilen.
 *
 * Beginner-Fehler die das Tool fixt:
 *  1. Vergessen, dass nur ~70 % der Arbeitszeit billable ist (Akquise/Buchhaltung)
 *  2. KV/Rentenversicherung als Selbstständig komplett selbst zahlen
 *  3. Rücklage für Urlaub (20 Tage) + Krankheit (10 Tage) + Weiterbildung (5 Tage)
 *  4. ESt-Progression: bei höherem Brutto höherer Grenzsatz
 *  5. Stundensatz so niedrig ansetzen wie der Lohn pro Stunde im Angestellten-Job
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { NumberField } from "@/components/ui/number-field";
import { Label } from "@/components/ui/label";
import {
  Lightbulb,
  Clock,
  Calculator,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import { progressionESt, solZ as solZAuf, GEWST_MESSZAHL, GEWST_FREIBETRAG_NATUERLICH, GEWST_ANRECHNUNG_FAKTOR } from "@/lib/germanTax";

const MINDEST_BEMESSUNG_GKV_MONAT_2026 = 1318.33;
const BBG_KV_MONAT_2026 = 5512.5;
const KV_ALLG_SATZ = 14.6;
const PV_SATZ_KINDERLOS = 4.2;
const PV_SATZ_KIND = 3.6;
const RV_SATZ = 18.6;
const BBG_RV_MONAT_2026 = 8450;

type ArbeitszeitProfil = "vollzeit" | "teilzeit-30" | "teilzeit-20";

const StundensatzRechner = () => {
  // Lebens-/Kosten-Sicht
  const [lebenshaltungMonat, setLebenshaltungMonat] = useState(2500);
  const [zusatzNettoMonat, setZusatzNettoMonat] = useState(500); // Sparen, Investment
  const [betriebsausgabenMonat, setBetriebsausgabenMonat] = useState(400);
  const [zusatzbeitragKV, setZusatzbeitragKV] = useState(2.9);
  const [kinderlos, setKinderlos] = useState(true);
  const [rvFreiwillig, setRvFreiwillig] = useState(false);
  // Arbeitszeit-Sicht
  const [profil, setProfil] = useState<ArbeitszeitProfil>("vollzeit");
  const [billableQuote, setBillableQuote] = useState(70);
  const [urlaubTage, setUrlaubTage] = useState(25);
  const [krankheitTage, setKrankheitTage] = useState(10);
  const [weiterbildungTage, setWeiterbildungTage] = useState(5);

  const profilStunden: Record<ArbeitszeitProfil, { l: string; arbeitstageProJahr: number; stundenProTag: number }> = {
    vollzeit: { l: "Vollzeit (40 h/Woche)", arbeitstageProJahr: 220, stundenProTag: 8 },
    "teilzeit-30": { l: "Teilzeit 30 h/Woche", arbeitstageProJahr: 220, stundenProTag: 6 },
    "teilzeit-20": { l: "Teilzeit 20 h/Woche", arbeitstageProJahr: 220, stundenProTag: 4 },
  };

  const calc = useMemo(() => {
    // === Schritt 1: Wunsch-Netto pro Jahr ===
    const wunschNettoJahr = (lebenshaltungMonat + zusatzNettoMonat) * 12;

    // === Schritt 2: KV/PV/RV als Selbstständig ===
    // Iteratives Vorgehen: wir kennen das Brutto noch nicht, müssen aber KV darauf rechnen.
    // Annahme: KV-Bemessung = mindestens 1.318€, max 5.512€/Mon.
    // Wir nehmen für die KV-Bemessung den Gewinn (Brutto-Umsatz - BA) /12.
    // Iterativ verfeinern: Start = wunschNetto × 1.6 als grobe Brutto-Schätzung.
    const pvSatz = kinderlos ? PV_SATZ_KINDERLOS : PV_SATZ_KIND;
    const sozialQuoteKV = (KV_ALLG_SATZ + zusatzbeitragKV + pvSatz) / 100;

    // Iteration für Brutto (3 Runden reichen)
    let estimatedBrutto = wunschNettoJahr * 1.8;
    for (let i = 0; i < 5; i++) {
      const gewinn = Math.max(0, estimatedBrutto - betriebsausgabenMonat * 12);
      const monatBemessung = Math.max(MINDEST_BEMESSUNG_GKV_MONAT_2026, Math.min(BBG_KV_MONAT_2026, gewinn / 12));
      const kv = monatBemessung * 12 * sozialQuoteKV;
      const rv = rvFreiwillig ? Math.min(BBG_RV_MONAT_2026, gewinn / 12) * 12 * (RV_SATZ / 100) : 0;
      const eSt = progressionESt(gewinn);
      const solz = solZAuf(eSt);
      const steuern = eSt + solz;
      const sozial = kv + rv;
      const nettoIst = Math.max(0, gewinn - steuern - sozial);
      const diff = wunschNettoJahr - nettoIst;
      if (Math.abs(diff) < 50) break;
      // Wir brauchen mehr Brutto wenn diff > 0
      estimatedBrutto += diff * 1.5; // Overshoot wegen Progression
    }

    // Finale Rechnung mit dem konvergierten Brutto
    const brutto = estimatedBrutto;
    const gewinn = Math.max(0, brutto - betriebsausgabenMonat * 12);
    const monatBemessung = Math.max(MINDEST_BEMESSUNG_GKV_MONAT_2026, Math.min(BBG_KV_MONAT_2026, gewinn / 12));
    const kv = monatBemessung * 12 * sozialQuoteKV;
    const rv = rvFreiwillig ? Math.min(BBG_RV_MONAT_2026, gewinn / 12) * 12 * (RV_SATZ / 100) : 0;
    const eSt = progressionESt(gewinn);
    const solz = solZAuf(eSt);

    // === Schritt 3: Arbeitszeit & Billable-Stunden ===
    const p = profilStunden[profil];
    const max_arbeitstage = 220 - urlaubTage - krankheitTage - weiterbildungTage; // brutto Arbeitstage
    const max_stunden = Math.max(0, max_arbeitstage * p.stundenProTag);
    const billableStunden = max_stunden * (billableQuote / 100);

    const stundensatz = billableStunden > 0 ? brutto / billableStunden : 0;
    const tagessatz = stundensatz * 8;

    // Vergleich: was bekommt ein Angestellter mit gleichem Netto?
    // Vereinfacht: Brutto = Netto × 1.6 (mit Progression + 20% SV)
    const an_vergleich_brutto = wunschNettoJahr * 1.6;
    const an_stundensatz = an_vergleich_brutto / (220 * 8); // 220 Arbeitstage × 8h

    return {
      wunschNettoJahr,
      brutto, gewinn,
      eSt, solz, kv, rv,
      steuern: eSt + solz,
      sozial: kv + rv,
      max_arbeitstage,
      max_stunden,
      billableStunden,
      stundensatz,
      tagessatz,
      an_stundensatz,
    };
  }, [lebenshaltungMonat, zusatzNettoMonat, betriebsausgabenMonat, zusatzbeitragKV, kinderlos, rvFreiwillig, profil, billableQuote, urlaubTage, krankheitTage, weiterbildungTage]);

  // Plausibilität: Stundensatz sollte mind. 30 €/h sein (sonst Notlage)
  const istNiedrig = calc.stundensatz < 30;
  const istAngemessen = calc.stundensatz >= 40 && calc.stundensatz <= 120;
  const istHoch = calc.stundensatz > 120;

  return (
    <CockpitShell
      eyebrow="🌱 Erste Schritte · für komplette Anfänger:innen"
      title="Stundensatz-Rechner für Anfänger:innen"
      subtitle="Anfänger unterschätzen ihren Stundensatz systematisch um 30-50 %. Dieses Tool rechnet rückwärts: dein Wunsch-Netto + Lebenshaltung + KV + Rücklagen + BA → nötiger Brutto-Umsatz → ÷ Billable-Stunden = realistischer Stundensatz."
    >
      <BeginnerHero />

      {/* === Lebenskosten-Eingabe === */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-4">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-accent-blue" /> 1. Was brauchst du zum Leben?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Lebenshaltung / Monat (€)</Label>
            <NumberField value={lebenshaltungMonat} onChange={setLebenshaltungMonat} min={0} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">Miete, Essen, Auto, Versicherungen, alles Private</div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Sparen / Investment / Monat (€)</Label>
            <NumberField value={zusatzNettoMonat} onChange={setZusatzNettoMonat} min={0} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">ETF-Sparplan, eigene Rente, Urlaubs-Geld</div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Geschäfts-Ausgaben / Monat (€)</Label>
            <NumberField value={betriebsausgabenMonat} onChange={setBetriebsausgabenMonat} min={0} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">Software, Internet, Telefon, Büro, Versicherung</div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
          <div>
            <Label className="text-[10px] uppercase text-muted-foreground">GKV-Zusatzbeitrag %</Label>
            <NumberField step="0.01" value={zusatzbeitragKV} onChange={setZusatzbeitragKV} min={0} className="h-9 mt-1" />
          </div>
          <label className="flex items-center gap-2 text-xs cursor-pointer rounded-lg border border-border p-2">
            <input type="checkbox" checked={kinderlos} onChange={(e) => setKinderlos(e.target.checked)} className="h-4 w-4" />
            <span>Kinderlos (+0,6 % PV)</span>
          </label>
          <label className="flex items-center gap-2 text-xs cursor-pointer rounded-lg border border-border p-2">
            <input type="checkbox" checked={rvFreiwillig} onChange={(e) => setRvFreiwillig(e.target.checked)} className="h-4 w-4" />
            <span>Freiwillige RV (18,6 %)</span>
          </label>
        </div>
      </div>

      {/* === Arbeitszeit-Eingabe === */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-4">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Clock className="h-4 w-4 text-accent-blue" /> 2. Wie viel arbeitest du wirklich?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Arbeitszeit-Profil</Label>
            <select value={profil} onChange={(e) => setProfil(e.target.value as ArbeitszeitProfil)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              {(Object.entries(profilStunden) as [ArbeitszeitProfil, typeof profilStunden["vollzeit"]][]).map(([k, v]) => (
                <option key={k} value={k}>{v.l}</option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Billable-Quote (%) — typisch 60-80 %</Label>
            <NumberField value={billableQuote} onChange={setBillableQuote} min={20} max={100} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">
              Anteil der Arbeitszeit den du Kunden in Rechnung stellen kannst. Akquise, Buchhaltung, Pausen = nicht billable.
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label className="text-[10px] uppercase text-muted-foreground">Urlaubstage / Jahr</Label>
            <NumberField value={urlaubTage} onChange={setUrlaubTage} min={0} max={60} className="h-9 mt-1" />
            <div className="text-[10px] text-muted-foreground mt-0.5">Min. 24 § BUrlG (an AN-Tag)</div>
          </div>
          <div>
            <Label className="text-[10px] uppercase text-muted-foreground">Krankheitstage / Jahr</Label>
            <NumberField value={krankheitTage} onChange={setKrankheitTage} min={0} max={40} className="h-9 mt-1" />
            <div className="text-[10px] text-muted-foreground mt-0.5">⌀ DE: 17,8 Tage AN, Selbstständig oft 5-15</div>
          </div>
          <div>
            <Label className="text-[10px] uppercase text-muted-foreground">Weiterbildung / Jahr</Label>
            <NumberField value={weiterbildungTage} onChange={setWeiterbildungTage} min={0} max={30} className="h-9 mt-1" />
            <div className="text-[10px] text-muted-foreground mt-0.5">Konferenzen, Kurse, Self-Learning</div>
          </div>
        </div>
      </div>

      {/* === Ergebnis-Hero === */}
      <div className={`rounded-2xl border-2 p-5 mb-6 ${
        istNiedrig ? "border-red-500/40 bg-red-500/5"
        : istHoch ? "border-amber-500/40 bg-amber-500/5"
        : "border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-card to-card"
      }`}>
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Dein nötiger Stundensatz</div>
        <div className="flex items-baseline gap-3 flex-wrap mb-3">
          <div className={`text-5xl font-bold ${
            istNiedrig ? "text-red-700" : istHoch ? "text-amber-700" : "text-emerald-700"
          }`}>
            {Math.round(calc.stundensatz).toLocaleString("de-DE")} €
          </div>
          <div className="text-lg text-muted-foreground">/ Stunde (netto, ohne USt)</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs mb-3">
          <div className="rounded-lg bg-secondary/40 p-2">
            <div className="text-[10px] uppercase text-muted-foreground">Tagessatz (8h)</div>
            <div className="font-mono text-base font-semibold">{Math.round(calc.tagessatz).toLocaleString("de-DE")} €</div>
          </div>
          <div className="rounded-lg bg-secondary/40 p-2">
            <div className="text-[10px] uppercase text-muted-foreground">Brutto-Umsatz/Jahr nötig</div>
            <div className="font-mono text-base font-semibold">{Math.round(calc.brutto).toLocaleString("de-DE")} €</div>
          </div>
          <div className="rounded-lg bg-secondary/40 p-2">
            <div className="text-[10px] uppercase text-muted-foreground">Billable-Stunden/Jahr</div>
            <div className="font-mono text-base font-semibold">{Math.round(calc.billableStunden).toLocaleString("de-DE")} h</div>
          </div>
        </div>

        {istNiedrig && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/40 p-3 text-xs leading-relaxed flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-red-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-red-900">⚠ Stundensatz unter 30 €/h ist UNREALISTISCH NIEDRIG.</strong> Das ist
              weniger als ein typischer Angestellten-Stundenlohn — und du hast als Selbstständige:r KEINE
              Lohnfortzahlung im Krankheitsfall, KEIN bezahlten Urlaub und KEINE Arbeitslosenversicherung.
              Erhöhe Wunsch-Netto, reduziere BA, oder akzeptiere mehr Arbeitsstunden.
            </div>
          </div>
        )}
        {istAngemessen && (
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/40 p-3 text-xs">
            ✅ Realistischer Stundensatz für Solo-Selbstständige. Markt-üblich für Solo-Berater:innen / Freelancer:innen DACH 2026: 50-120 €/h.
          </div>
        )}
        {istHoch && (
          <div className="rounded-lg bg-amber-500/10 border border-amber-500/40 p-3 text-xs leading-relaxed">
            <strong>💡 Hoher Stundensatz</strong> — markttauglich für Spezialist:innen (Senior-IT 100-200 €/h, Strategieberatung 200+ €/h). Bei generischen Tätigkeiten Markt-Akzeptanz prüfen. Optionen: höhere Billable-Quote, weniger Urlaub/Krankheit, oder Wert-Argument klar kommunizieren.
          </div>
        )}
      </div>

      {/* === Step-by-Step Detail === */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Calculator className="h-4 w-4 text-accent-blue" /> So wird gerechnet
        </h3>
        <ol className="space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <span className="rounded-full bg-accent-blue/10 text-accent-blue h-6 w-6 flex items-center justify-center font-bold text-xs shrink-0">1</span>
            <div className="flex-1">
              <div className="font-semibold">Wunsch-Netto pro Jahr</div>
              <div className="text-xs text-muted-foreground">
                ({lebenshaltungMonat.toLocaleString("de-DE")} € Leben + {zusatzNettoMonat.toLocaleString("de-DE")} € Sparen) × 12 = <strong className="text-foreground">{calc.wunschNettoJahr.toLocaleString("de-DE")} €/Jahr</strong>
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="rounded-full bg-accent-blue/10 text-accent-blue h-6 w-6 flex items-center justify-center font-bold text-xs shrink-0">2</span>
            <div className="flex-1">
              <div className="font-semibold">Steuern + KV + ggf. RV obendrauf rechnen</div>
              <div className="text-xs text-muted-foreground">
                ESt {Math.round(calc.eSt).toLocaleString("de-DE")} € · SolZ {Math.round(calc.solz).toLocaleString("de-DE")} € · KV {Math.round(calc.kv).toLocaleString("de-DE")} €
                {rvFreiwillig && <> · RV {Math.round(calc.rv).toLocaleString("de-DE")} €</>} →{" "}
                Brutto-Bedarf nach BA: <strong className="text-foreground">{Math.round(calc.gewinn).toLocaleString("de-DE")} €/J Gewinn</strong>
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="rounded-full bg-accent-blue/10 text-accent-blue h-6 w-6 flex items-center justify-center font-bold text-xs shrink-0">3</span>
            <div className="flex-1">
              <div className="font-semibold">Geschäfts-Ausgaben dazu</div>
              <div className="text-xs text-muted-foreground">
                + {(betriebsausgabenMonat * 12).toLocaleString("de-DE")} €/J BA = <strong className="text-foreground">{Math.round(calc.brutto).toLocaleString("de-DE")} €/J Brutto-Umsatz</strong>
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="rounded-full bg-accent-blue/10 text-accent-blue h-6 w-6 flex items-center justify-center font-bold text-xs shrink-0">4</span>
            <div className="flex-1">
              <div className="font-semibold">Arbeitsstunden pro Jahr berechnen</div>
              <div className="text-xs text-muted-foreground">
                {profilStunden[profil].arbeitstageProJahr} Arbeitstage − {urlaubTage} Urlaub − {krankheitTage} Krankheit − {weiterbildungTage} Weiterbildung
                = <strong className="text-foreground">{calc.max_arbeitstage} aktive Arbeitstage</strong> × {profilStunden[profil].stundenProTag} h = {calc.max_stunden} h Arbeitszeit
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="rounded-full bg-accent-blue/10 text-accent-blue h-6 w-6 flex items-center justify-center font-bold text-xs shrink-0">5</span>
            <div className="flex-1">
              <div className="font-semibold">Billable-Quote anwenden</div>
              <div className="text-xs text-muted-foreground">
                Nur {billableQuote} % der Zeit ist Kunden-rechnung-fähig (Akquise, Admin, Buchhaltung = nicht billable):
                {" "}{calc.max_stunden} h × {billableQuote}% = <strong className="text-foreground">{Math.round(calc.billableStunden)} Billable-Stunden/J</strong>
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="rounded-full bg-emerald-500/10 text-emerald-700 h-6 w-6 flex items-center justify-center font-bold text-xs shrink-0">=</span>
            <div className="flex-1">
              <div className="font-semibold text-emerald-700">Stundensatz = Brutto-Umsatz ÷ Billable-Stunden</div>
              <div className="text-xs text-muted-foreground">
                {Math.round(calc.brutto).toLocaleString("de-DE")} € ÷ {Math.round(calc.billableStunden)} h = <strong className="text-emerald-700 text-base">{Math.round(calc.stundensatz)} €/h</strong>
              </div>
            </div>
          </li>
        </ol>
      </div>

      {/* === Vergleich Angestellter === */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-accent-blue" />
          Vergleich: dasselbe Netto als Angestellter
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          Bei gleichem Wunsch-Netto würde ein:e Angestellte:r {Math.round(calc.an_stundensatz).toLocaleString("de-DE")} €/h Brutto-Stundenlohn brauchen (Brutto ≈ 1,6× Netto, 220 Arbeitstage × 8 h). Aber: AN bekommen Urlaub, Krankheit, ALG dazu — du als Selbstständige:r nicht.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
          <div className="rounded-lg bg-secondary/40 p-3">
            <div className="text-[10px] uppercase text-muted-foreground">Selbstständig (du)</div>
            <div className="text-base font-bold text-emerald-700">{Math.round(calc.stundensatz).toLocaleString("de-DE")} €/h</div>
          </div>
          <div className="rounded-lg bg-secondary/40 p-3">
            <div className="text-[10px] uppercase text-muted-foreground">Angestellt (gleicher Netto)</div>
            <div className="text-base font-bold text-accent-blue">{Math.round(calc.an_stundensatz).toLocaleString("de-DE")} €/h</div>
          </div>
          <div className="rounded-lg bg-amber-500/10 p-3">
            <div className="text-[10px] uppercase text-amber-700">Selbstständig-Aufschlag</div>
            <div className="text-base font-bold text-amber-700">
              {((calc.stundensatz / Math.max(1, calc.an_stundensatz)) - 1).toLocaleString("de-DE", { style: "percent", maximumFractionDigits: 0 })}
            </div>
            <div className="text-[10px] text-muted-foreground">Mehr als AN-Brutto-Stunde nötig</div>
          </div>
        </div>
      </div>

      {/* === Cross-Links === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
        <Link to="/cockpit/brutto-netto-solo" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">← Brutto-Netto-Rechner (Tool 5)</div>
          <div className="text-muted-foreground">Vorwärts-Rechnung: Umsatz → Netto</div>
        </Link>
        <Link to="/cockpit/kv-optimizer" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">KV-Optimizer →</div>
          <div className="text-muted-foreground">Günstigste GKV-Kasse 2026</div>
        </Link>
        <Link to="/cockpit/schwellen-check" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">Schwellen-Check (Tool 3) →</div>
          <div className="text-muted-foreground">Freibeträge optimieren</div>
        </Link>
      </div>

      <Glossar />
      <Stand2026Footer
        sources={[
          { label: "§32a EStG (ESt-Progression 2026)", url: "https://www.gesetze-im-internet.de/estg/__32a.html" },
          { label: "freelancermap Stundensatz-Studie", url: "https://www.freelancermap.de/blog/welchen-stundenlohn-kann-man-als-freelancer-verlangen/" },
          { label: "BUrlG (Mindesturlaub)", url: "https://www.gesetze-im-internet.de/burlg/" },
          { label: "KSK Künstlersozialkasse", url: "https://www.kuenstlersozialkasse.de" },
        ]}
        note="Rückwärts-Berechnung mit 5 Iterationen für Konvergenz Brutto ↔ Netto (wegen ESt-Progression). Bei sehr hohen Wunsch-Netto-Werten Konvergenz-Drift möglich. Stundensatz-Empfehlung ist Mindest-Anforderung — Markt kann höher zahlen wenn Wert-Positionierung stark."
      />
    </CockpitShell>
  );
};

// ============================================================================
// Sub-Components
// ============================================================================
const BeginnerHero = () => (
  <div className="rounded-2xl border-2 border-accent-blue/30 bg-gradient-to-br from-accent-blue/10 via-card to-card p-5 mb-6">
    <div className="flex items-start gap-3">
      <Lightbulb className="h-6 w-6 text-accent-blue shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="font-bold text-sm mb-1">Was ist das hier?</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-2">
          Anfänger setzen ihren Stundensatz oft zu niedrig an — sie rechnen wie ein Angestellter (Brutto-Lohn ÷ 160 h/Mon)
          und vergessen: nur ~70 % der Arbeitszeit ist <strong>billable</strong> (Akquise/Buchhaltung/Admin = unbezahlt),
          die Sozialversicherung zahlst DU komplett (~600-1000 €/Mon), Urlaub/Krankheit kostet dich Umsatz.
          Dieses Tool rechnet rückwärts: was du brauchst → durch tatsächliche Stunden → Stundensatz.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
          <div className="rounded-lg bg-red-500/5 p-2 border border-red-500/20">
            <strong className="text-red-700">⚠ Anfänger-Fehler</strong>
            <div className="text-muted-foreground mt-0.5">„Ich nehme 30 €/h, das ist wie meine 60k-Stelle netto" — falsch! Mit Steuern + KV + Rücklage bist du bei ~15 €/h netto.</div>
          </div>
          <div className="rounded-lg bg-emerald-500/5 p-2 border border-emerald-500/20">
            <strong className="text-emerald-700">✅ Realistische Spanne 2026</strong>
            <div className="text-muted-foreground mt-0.5">Solo-Freelancer DACH: 50-120 €/h. IT-Senior 90-180 €/h. Coaching/Strategy 100-300 €/h. Unter 40 €/h: Notlage.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Glossar = () => (
  <details className="rounded-2xl border border-border bg-card p-5 mb-6">
    <summary className="cursor-pointer font-bold text-sm flex items-center gap-2">
      <HelpCircle className="h-4 w-4 text-accent-blue" /> Glossar — Begriffe einfach erklärt
    </summary>
    <div className="mt-3 space-y-3 text-xs leading-relaxed">
      {[
        { begriff: "Billable-Quote", erklaerung: "Anteil deiner Arbeitszeit, den du Kunden in Rechnung stellen kannst. Akquise (Angebote schreiben, Kunden-Termine), Buchhaltung (Rechnungen, USt-VA), Admin (Email, Verträge), Weiterbildung, Pausen — alles unbezahlt. Realistisch: 60-80 % billable bei erfahrenen Solo-Selbstständigen, 50-60 % im ersten Jahr (viel Akquise)." },
        { begriff: "Tagessatz", erklaerung: "Stundensatz × 8 h. Wird oft bei längeren Projekten/Auftragsarbeit angeboten. Vorteil: planbar, keine Sek-Tracking-Pflicht. Nachteil: Risiko bei verkalkulierten Tagen." },
        { begriff: "Wunsch-Netto", erklaerung: "Was du WIRKLICH zum Leben + Sparen brauchst pro Monat. Realistisch: nicht NUR Lebenshaltung, sondern + 10-30 % für Sparen/Rente/Notgroschen." },
        { begriff: "Rücklage Urlaub + Krankheit", erklaerung: "Selbstständige bekommen 0 € bei Urlaub/Krankheit. Bei 25 Urlaubstagen + 10 Krankheitstagen fehlen dir 35 Tage Umsatz/Jahr (~7 Wochen). Stundensatz muss diese Ausfälle decken." },
        { begriff: "Vergleich AN-Stundenlohn", erklaerung: "Angestellte:r mit gleichem Brutto-Stundenlohn bekommt + bez. Urlaub + Lohnfortzahlung + AG-SV-Anteil + ALV. Faustregel: Selbstständig-Stundensatz mindestens 40-60 % über AN-Stundenlohn um gleichen Sicherheits-Standard zu erreichen." },
        { begriff: "Konvergenz-Iteration", erklaerung: "Da ESt progressiv ist, kann man nicht einfach 'Netto + 30 % = Brutto' rechnen. Tool iteriert 5× zwischen geschätztem Brutto und resultierendem Netto, bis die Differenz < 50 € ist. Klassische Methode für rückwärts-gerechnete Steuer-Probleme." },
      ].map((g) => (
        <div key={g.begriff} className="rounded-lg bg-secondary/30 p-3">
          <div className="font-semibold text-foreground mb-1">{g.begriff}</div>
          <div className="text-muted-foreground">{g.erklaerung}</div>
        </div>
      ))}
    </div>
  </details>
);

export default StundensatzRechner;
