/**
 * BruttoNettoSolo — "Was bleibt am Ende übrig?"
 *
 * Tool 5 der Anfänger-Wave (Starter-Kategorie, Wave 2).
 * Brutto-Netto-Rechner für Solo-Selbstständige (Freiberufler + Gewerbe).
 *
 * Berechnung:
 *  Umsatz → Betriebsausgaben → Gewinn → ESt (§32a Progression) + SolZ + ggf. KiSt
 *  + GewSt (falls Gewerbe, ab 24.500 € Freibetrag, mit §35 EStG-Anrechnung Faktor 4,0)
 *  + freiwillige KV/PV (Mindestbeitrag oder einkommensbasiert bis BBG)
 *  + freiwillige RV (oder KSK-50%-Bundeszuschuss)
 *  = Netto pro Jahr / Monat
 *
 * Plus: Vergleich mit gleicher Brutto-Summe als Angestellter (ESt + SV-AN-Anteil 20%).
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { NumberField } from "@/components/ui/number-field";
import { HebesatzPicker } from "@/components/ui/hebesatz-picker";
import { Label } from "@/components/ui/label";
import {
  Lightbulb,
  Wallet,
  TrendingDown,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";
import {
  progressionESt,
  solZ as solZAuf,
  GEWST_MESSZAHL,
  GEWST_FREIBETRAG_NATUERLICH,
  GEWST_ANRECHNUNG_FAKTOR,
} from "@/lib/germanTax";

const MINDEST_BEMESSUNG_GKV_MONAT_2026 = 1318.33; // freiwillig versicherte Selbstständige
const BBG_KV_MONAT_2026 = 5512.5; // Höchst-Bemessung
const KV_ALLG_SATZ = 14.6;
const KV_ZUSATZ_DEFAULT = 2.9;
const PV_SATZ_KINDERLOS = 4.2; // 3.6 + 0.6 Kinderlos-Zuschlag
const PV_SATZ_KIND = 3.6;
const RV_SATZ = 18.6; // freiwillige RV: AN+AG-Anteil selbst, gleicher Satz wie Pflicht
const BBG_RV_MONAT_2026 = 8450;

type Rechtsform = "freiberuf" | "gewerbe";
type KvVariante = "gkv-freiwillig" | "pkv" | "ksk";

const BruttoNettoSolo = () => {
  const [umsatz, setUmsatz] = useState(60000);
  const [betriebsausgaben, setBetriebsausgaben] = useState(15000);
  const [rechtsform, setRechtsform] = useState<Rechtsform>("freiberuf");
  const [hebesatz, setHebesatz] = useState(400);
  const [kvVariante, setKvVariante] = useState<KvVariante>("gkv-freiwillig");
  const [zusatzBeitrag, setZusatzBeitrag] = useState(KV_ZUSATZ_DEFAULT);
  const [kinderlos, setKinderlos] = useState(true);
  const [pkvBeitragMonat, setPkvBeitragMonat] = useState(450);
  const [rvFreiwillig, setRvFreiwillig] = useState(false);
  const [kistSatz, setKistSatz] = useState(0); // 0/8/9
  const [verheiratet, setVerheiratet] = useState(false);

  const calc = useMemo(() => {
    const gewinn = Math.max(0, umsatz - betriebsausgaben);

    // === ESt ===
    // Vereinfacht ohne andere Einkünfte. Verheiratet: Splitting-Tarif (vereinfacht: 2× progressionESt(zvE/2))
    const eSt = verheiratet ? 2 * progressionESt(gewinn / 2) : progressionESt(gewinn);
    const solz = solZAuf(eSt);
    const kist = eSt * (kistSatz / 100);

    // === GewSt (nur bei Gewerbe) ===
    let gewSt = 0;
    let gewStAnrechnung = 0;
    if (rechtsform === "gewerbe") {
      const gewstBasis = Math.max(0, gewinn - GEWST_FREIBETRAG_NATUERLICH);
      const gewstMessbetrag = gewstBasis * GEWST_MESSZAHL;
      const gewstBrutto = gewstMessbetrag * (hebesatz / 100);
      // §35 EStG: Anrechnung Faktor 4,0 × Messbetrag, max bis tatsächliche ESt
      gewStAnrechnung = Math.min(gewstMessbetrag * GEWST_ANRECHNUNG_FAKTOR, eSt);
      gewSt = Math.max(0, gewstBrutto - gewStAnrechnung);
    }

    // === KV/PV ===
    const monatBemessung = Math.max(
      MINDEST_BEMESSUNG_GKV_MONAT_2026,
      Math.min(BBG_KV_MONAT_2026, gewinn / 12),
    );
    const pvSatz = kinderlos ? PV_SATZ_KINDERLOS : PV_SATZ_KIND;
    let kvJahr = 0;
    if (kvVariante === "gkv-freiwillig") {
      kvJahr = monatBemessung * 12 * ((KV_ALLG_SATZ + zusatzBeitrag + pvSatz) / 100);
    } else if (kvVariante === "pkv") {
      kvJahr = pkvBeitragMonat * 12;
    } else if (kvVariante === "ksk") {
      // KSK: Bund zahlt ~50% — vereinfacht: Hälfte des freiwilligen GKV-Beitrags
      kvJahr = (monatBemessung * 12 * ((KV_ALLG_SATZ + zusatzBeitrag + pvSatz) / 100)) / 2;
    }

    // === Rentenversicherung (optional freiwillig) ===
    let rvJahr = 0;
    if (rvFreiwillig) {
      const rvBemessung = Math.min(BBG_RV_MONAT_2026, gewinn / 12);
      rvJahr = rvBemessung * 12 * (RV_SATZ / 100);
    }

    const steuerGesamt = eSt + solz + kist + gewSt;
    const sozialGesamt = kvJahr + rvJahr;
    const nettoJahr = Math.max(0, gewinn - steuerGesamt - sozialGesamt);
    const nettoMonat = nettoJahr / 12;
    const steuerquote = gewinn > 0 ? (steuerGesamt / gewinn) * 100 : 0;
    const gesamtbelastung = gewinn > 0 ? ((steuerGesamt + sozialGesamt) / gewinn) * 100 : 0;

    // === Vergleichs-Szenario: Angestellter bei gleichem AG-Total ===
    // FAIRER VERGLEICH: dein Solo-Gewinn ist das, was du selbst komplett
    // schulterst (Steuer + KV + RV alles aus dem Gewinn). Beim Angestellten
    // zahlt der AG aber zusätzlich seinen ~20,5 % SV-Anteil OBEN DRAUF.
    // → Bei gleichem AG-Gesamt-Total: AN-Brutto = Gewinn / (1 + AG-SV-Quote).
    // (Vorheriger "gleicher Brutto"-Vergleich hat den AG-Anteil unterschlagen
    //  und Solo-Selbstständige systematisch schlechter aussehen lassen.)
    const AG_SV_QUOTE = 0.205;
    const an_brutto = gewinn / (1 + AG_SV_QUOTE);
    const an_sv = Math.min(an_brutto, BBG_RV_MONAT_2026 * 12) * 0.205;
    const an_zvE = an_brutto - an_sv;
    const an_eSt = verheiratet ? 2 * progressionESt(an_zvE / 2) : progressionESt(an_zvE);
    const an_solz = solZAuf(an_eSt);
    const an_kist = an_eSt * (kistSatz / 100);
    const an_netto = Math.max(0, an_brutto - an_sv - an_eSt - an_solz - an_kist);

    return {
      gewinn,
      eSt, solz, kist, gewSt, gewStAnrechnung,
      kvJahr, rvJahr, sozialGesamt, steuerGesamt,
      nettoJahr, nettoMonat,
      steuerquote, gesamtbelastung,
      anNetto: an_netto, anSv: an_sv, anESt: an_eSt, anBrutto: an_brutto,
    };
  }, [umsatz, betriebsausgaben, rechtsform, hebesatz, kvVariante, zusatzBeitrag, kinderlos, pkvBeitragMonat, rvFreiwillig, kistSatz, verheiratet]);

  return (
    <CockpitShell
      eyebrow="🌱 Erste Schritte · für komplette Anfänger:innen"
      title="Brutto-Netto-Rechner für Solo-Selbstständige"
      subtitle="Was bleibt am Ende wirklich übrig? Umsatz → Betriebsausgaben → ESt + SolZ + ggf. KSt/GewSt + KV/PV → Netto. Mit Step-by-Step-Erklärung jeder Position und Fair-Vergleich gegen 'gleiches AG-Total als Angestellter' (inkl. AG-SV-Anteil)."
    >
      <BeginnerHero />

      {/* === Eingaben === */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Wallet className="h-4 w-4 text-accent-blue" /> Deine Zahlen
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Jahres-Umsatz (€)</Label>
            <NumberField value={umsatz} onChange={setUmsatz} min={0} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">Summe Honorare/Erlöse netto (= ohne USt)</div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Jahres-Betriebsausgaben (€)</Label>
            <NumberField value={betriebsausgaben} onChange={setBetriebsausgaben} min={0} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">Bürokosten, Software, Reisen, Werbung, AfA, etc.</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Rechtsform</Label>
            <select value={rechtsform} onChange={(e) => setRechtsform(e.target.value as Rechtsform)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="freiberuf">Freiberufler:in (§18 EStG) — keine GewSt</option>
              <option value="gewerbe">Einzel-Gewerbe — GewSt ab 24.500€ Gewinn</option>
            </select>
          </div>
          {rechtsform === "gewerbe" && (
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">GewSt-Hebesatz (%) der Gemeinde</Label>
              <HebesatzPicker value={hebesatz} onChange={setHebesatz} className="mt-1" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Krankenversicherung</Label>
            <select value={kvVariante} onChange={(e) => setKvVariante(e.target.value as KvVariante)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="gkv-freiwillig">GKV freiwillig (Mindestbeitrag 260-280€)</option>
              <option value="pkv">PKV (eigener Beitrag)</option>
              <option value="ksk">KSK (Bund zahlt 50% — nur Künstler/Publizisten)</option>
            </select>
          </div>
          {kvVariante === "gkv-freiwillig" || kvVariante === "ksk" ? (
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Zusatzbeitrag deiner Kasse (%)</Label>
              <NumberField step="0.01" value={zusatzBeitrag} onChange={setZusatzBeitrag} min={0} className="mt-1" />
              <div className="text-[10px] text-muted-foreground mt-1">2026 ⌀ 2,9 % · Spanne 2,18 – 4,39 %</div>
            </div>
          ) : (
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">PKV-Beitrag pro Monat (€)</Label>
              <NumberField value={pkvBeitragMonat} onChange={setPkvBeitragMonat} min={0} className="mt-1" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          <label className="flex items-center gap-2 text-xs cursor-pointer rounded-lg border border-border p-2">
            <input type="checkbox" checked={kinderlos} onChange={(e) => setKinderlos(e.target.checked)} className="h-4 w-4" />
            <span>Kinderlos (+0,6 % PV)</span>
          </label>
          <label className="flex items-center gap-2 text-xs cursor-pointer rounded-lg border border-border p-2">
            <input type="checkbox" checked={verheiratet} onChange={(e) => setVerheiratet(e.target.checked)} className="h-4 w-4" />
            <span>Verheiratet (Splitting)</span>
          </label>
          <label className="flex items-center gap-2 text-xs cursor-pointer rounded-lg border border-border p-2">
            <input type="checkbox" checked={rvFreiwillig} onChange={(e) => setRvFreiwillig(e.target.checked)} className="h-4 w-4" />
            <span>Freiw. Renten-Vers.</span>
          </label>
          <div>
            <Label className="text-[10px] uppercase text-muted-foreground">Kirchensteuer</Label>
            <select value={kistSatz} onChange={(e) => setKistSatz(Number(e.target.value))} className="h-8 w-full rounded-md border border-input bg-background px-2 text-xs mt-1">
              <option value={0}>0 % (kein Eintrag)</option>
              <option value={8}>8 % (BY, BW)</option>
              <option value={9}>9 % (Rest DE)</option>
            </select>
          </div>
        </div>
      </div>

      {/* === Ergebnis-Karte === */}
      <div className="rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-card to-card p-5 mb-6">
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Dein Netto</div>
        <div className="flex items-baseline gap-3 flex-wrap mb-3">
          <div className="text-4xl font-bold text-emerald-700">
            {Math.round(calc.nettoMonat).toLocaleString("de-DE")} €
          </div>
          <div className="text-lg text-muted-foreground">/ Monat</div>
          <div className="text-sm text-muted-foreground">
            = {Math.round(calc.nettoJahr).toLocaleString("de-DE")} €/Jahr
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="rounded-lg bg-secondary/40 p-2">
            <div className="text-[10px] uppercase text-muted-foreground">Gewinn</div>
            <div className="font-mono text-base font-semibold">{calc.gewinn.toLocaleString("de-DE")} €</div>
          </div>
          <div className="rounded-lg bg-amber-500/10 p-2">
            <div className="text-[10px] uppercase text-amber-700">Steuern</div>
            <div className="font-mono text-base font-semibold">{Math.round(calc.steuerGesamt).toLocaleString("de-DE")} €</div>
            <div className="text-[10px] text-muted-foreground">{calc.steuerquote.toFixed(1)} %</div>
          </div>
          <div className="rounded-lg bg-blue-500/10 p-2">
            <div className="text-[10px] uppercase text-blue-700">Sozialvers.</div>
            <div className="font-mono text-base font-semibold">{Math.round(calc.sozialGesamt).toLocaleString("de-DE")} €</div>
          </div>
          <div className="rounded-lg bg-emerald-500/10 p-2">
            <div className="text-[10px] uppercase text-emerald-700">Belastung total</div>
            <div className="font-mono text-base font-semibold">{calc.gesamtbelastung.toFixed(1)} %</div>
          </div>
        </div>
      </div>

      {/* === Detail-Rechnung === */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Wallet className="h-4 w-4 text-accent-blue" /> Detail-Rechnung Step-by-Step
        </h3>
        <div className="space-y-1 text-sm">
          <Row label="Jahres-Umsatz (netto)" val={umsatz} />
          <Row label="./. Betriebsausgaben" val={-betriebsausgaben} />
          <Row label="= Gewinn (Bemessungsgrundlage)" val={calc.gewinn} bold />
          <div className="h-3" />
          <Row label="./. Einkommensteuer §32a EStG (Progression)" val={-calc.eSt}
               note={verheiratet ? "Splitting-Tarif (verheiratet)" : "Grundtarif (Single)"} />
          {calc.solz > 0 && <Row label="./. Solidaritätszuschlag 5,5 % auf ESt" val={-calc.solz} note="Freigrenze 19.950 € ESt" />}
          {calc.kist > 0 && <Row label={`./. Kirchensteuer ${kistSatz} %`} val={-calc.kist} />}
          {calc.gewSt > 0 && (
            <Row label="./. Gewerbesteuer (nach §35-Anrechnung)" val={-calc.gewSt}
                 note={`Hebesatz ${hebesatz}% · Anrechnung ${Math.round(calc.gewStAnrechnung).toLocaleString("de-DE")}€ auf ESt`} />
          )}
          <Row label="= Nach Steuern" val={calc.gewinn - calc.steuerGesamt} bold />
          <div className="h-3" />
          {calc.kvJahr > 0 && (
            <Row label={
              kvVariante === "gkv-freiwillig" ? "./. KV/PV freiwillig (auf Bemessung)"
              : kvVariante === "pkv" ? "./. PKV-Beitrag (eigene Kasse)"
              : "./. KSK-Anteil (Bund zahlt 50%)"
            } val={-calc.kvJahr} note={
              kvVariante === "gkv-freiwillig"
                ? `${(KV_ALLG_SATZ + zusatzBeitrag + (kinderlos ? PV_SATZ_KINDERLOS : PV_SATZ_KIND)).toFixed(1)}% × Bemessung min. ${MINDEST_BEMESSUNG_GKV_MONAT_2026.toFixed(0)}€/Mon`
                : kvVariante === "pkv" ? `${pkvBeitragMonat} €/Mon × 12`
                : "Bundeszuschuss ~50% bei Künstlern/Publizisten"
            } />
          )}
          {calc.rvJahr > 0 && (
            <Row label="./. Renten-Versicherung freiwillig" val={-calc.rvJahr}
                 note={`${RV_SATZ}% × min(Gewinn, BBG-RV ${BBG_RV_MONAT_2026.toLocaleString("de-DE")} €/Mon)`} />
          )}
          <Row label="= Netto pro Jahr" val={calc.nettoJahr} bold highlight />
          <Row label="= Netto pro Monat" val={calc.nettoMonat} bold highlight />
        </div>
      </div>

      {/* === Vergleich Angestellter === */}
      <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-5 mb-6">
        <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
          <TrendingDown className="h-4 w-4 text-purple-700" />
          Vergleich: gleiches AG-Total als Angestellter
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          Fair-Vergleich: dein Solo-Gewinn ({Math.round(calc.gewinn).toLocaleString("de-DE")} €/Jahr) ist das,
          was du als „virtueller AG" für dich aufbringst — Steuer + KV + RV gehen alles aus diesem Topf.
          Beim Angestellten zahlt der AG seinen ~20,5 % SV-Anteil <em>zusätzlich</em>. Bei gleichem AG-Total
          ist das AN-Bruttogehalt also <strong>{Math.round(calc.anBrutto).toLocaleString("de-DE")} €/Jahr</strong>
          {" "}(= Gewinn / 1,205), nicht der volle Gewinn.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
          <div className="rounded-lg bg-secondary/40 p-3">
            <div className="text-[10px] uppercase text-muted-foreground">Selbstständig (du)</div>
            <div className="text-base font-bold text-emerald-700">{Math.round(calc.nettoMonat).toLocaleString("de-DE")} €/Mon</div>
            <div className="text-[10px] text-muted-foreground">netto nach Steuer + KV/RV</div>
          </div>
          <div className="rounded-lg bg-secondary/40 p-3">
            <div className="text-[10px] uppercase text-muted-foreground">Angestellt (gleiches AG-Total)</div>
            <div className="text-base font-bold text-purple-700">{Math.round(calc.anNetto / 12).toLocaleString("de-DE")} €/Mon</div>
            <div className="text-[10px] text-muted-foreground">netto nach ESt + AN-SV-Anteil 20,5 %</div>
          </div>
          <div className={`rounded-lg p-3 ${calc.nettoMonat > calc.anNetto / 12 ? "bg-emerald-500/10" : "bg-amber-500/10"}`}>
            <div className="text-[10px] uppercase text-muted-foreground">Differenz</div>
            <div className={`text-base font-bold ${calc.nettoMonat > calc.anNetto / 12 ? "text-emerald-700" : "text-amber-700"}`}>
              {calc.nettoMonat > calc.anNetto / 12 ? "+" : ""}
              {Math.round(calc.nettoMonat - calc.anNetto / 12).toLocaleString("de-DE")} €/Mon
            </div>
            <div className="text-[10px] text-muted-foreground">
              {calc.nettoMonat > calc.anNetto / 12 ? "Mehr Netto" : "Weniger Netto"} als Angestellter
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-2 mt-3 text-[11px] leading-relaxed">
          <strong>⚠ Trotzdem aufpassen:</strong> Als Selbstständig fehlen dir AG-Leistungen (Lohnfortzahlung
          6 Wochen, bezahlter Urlaub, Mutterschutz, Arbeitslosenversicherung optional, gesetzliche
          RV-Anwartschaft). Faustregel: Selbstständig wirklich rentabel ab <strong>~20-30 % Mehr-Netto</strong>{" "}
          als Angestellter — der Aufschlag deckt die fehlende Absicherung (BU, Krankentagegeld, eigene Rente).
        </div>
      </div>

      {/* === Cross-Links === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
        <Link to="/cockpit/gewerbe-check" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">← Brauche ich Gewerbe? (Tool 1)</div>
          <div className="text-muted-foreground">Falls noch unklar ob Anmeldung nötig</div>
        </Link>
        <Link to="/cockpit/quartals-steuer" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">Quartals-Steuerschätzung →</div>
          <div className="text-muted-foreground">VZ-Termine 10.3/6/9/12 + Rücklage planen</div>
        </Link>
        <Link to="/cockpit/kv-optimizer" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">KV-Optimizer →</div>
          <div className="text-muted-foreground">Kasse wechseln + Spar-Potenzial</div>
        </Link>
      </div>

      <Glossar />
      <Stand2026Footer
        sources={[
          { label: "§32a EStG (ESt-Tarif 2026)", url: "https://www.gesetze-im-internet.de/estg/__32a.html" },
          { label: "§35 EStG (GewSt-Anrechnung)", url: "https://www.gesetze-im-internet.de/estg/__35.html" },
          { label: "§11 GewStG (GewSt-Freibetrag 24.500€)", url: "https://www.gesetze-im-internet.de/gewstg/__11.html" },
          { label: "Mindestbemessung GKV freiwillig 2026", url: "https://covago.de/mindestbemessungsgrundlage-2026/" },
          { label: "KSK Künstlersozialkasse", url: "https://www.kuenstlersozialkasse.de" },
        ]}
        note="Rechnung ist vereinfacht (ohne Sonderausgaben außer SV, ohne außergewöhnliche Belastungen, ohne weitere Einkunftsarten). Konkrete ESt-Veranlagung bitte mit StB oder ELSTER. Splitting-Vorteil bei Verheirateten ist Approximation."
      />
    </CockpitShell>
  );
};

// ============================================================================
// Sub-Components
// ============================================================================
const Row = ({ label, val, bold, highlight, note }: { label: string; val: number; bold?: boolean; highlight?: boolean; note?: string }) => (
  <div className={`flex items-baseline justify-between gap-3 py-1 ${highlight ? "rounded-lg bg-emerald-500/5 px-3" : ""}`}>
    <div className={`flex-1 ${bold ? "font-bold" : ""}`}>
      {label}
      {note && <div className="text-[10px] text-muted-foreground font-normal">{note}</div>}
    </div>
    <div className={`font-mono ${bold ? "font-bold text-base" : "text-sm"} ${highlight ? "text-emerald-700" : ""}`}>
      {val < 0 ? "−" : ""}
      {Math.round(Math.abs(val)).toLocaleString("de-DE")} €
    </div>
  </div>
);

const BeginnerHero = () => (
  <div className="rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-card to-card p-5 mb-6">
    <div className="flex items-start gap-3">
      <Lightbulb className="h-6 w-6 text-emerald-700 shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="font-bold text-sm mb-1">Was ist das hier?</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-2">
          Du fragst dich: „Wenn ich 60.000 € im Jahr einnehme — was bleibt davon NACH allem (Steuer, KV, Rente) am Ende übrig?" Standard-Brutto-Netto-Rechner aus dem Web sind für Angestellte gemacht und geben Selbstständigen falsche Werte. Dieses Tool rechnet Solo-Selbstständige-spezifisch: Umsatz minus BA = Gewinn → ESt mit Progression → ggf. GewSt → freiwillige KV/PV → Netto.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
          <div className="rounded-lg bg-emerald-500/5 p-2 border border-emerald-500/20">
            <strong className="text-emerald-700">✅ Step-by-Step-Transparenz</strong>
            <div className="text-muted-foreground mt-0.5">Jede Abzug-Position wird einzeln gezeigt mit §-Verweis und Begründung</div>
          </div>
          <div className="rounded-lg bg-purple-500/5 p-2 border border-purple-500/20">
            <strong className="text-purple-700">🔄 Vergleich Angestellter</strong>
            <div className="text-muted-foreground mt-0.5">Fair-Vergleich: was würde dasselbe AG-Total als Angestellter abwerfen? (inkl. AG-Anteil SV)</div>
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
        { begriff: "Gewinn (= Bemessungsgrundlage)", erklaerung: "Umsatz minus Betriebsausgaben. Aus dem Gewinn werden alle Steuern (ESt, GewSt) und Sozialversicherungs-Beiträge berechnet. Wichtig: nicht der Umsatz, sondern der Gewinn ist die Basis!" },
        { begriff: "Einkommensteuer-Progression §32a EStG", erklaerung: "Je höher dein Einkommen, desto höher der Steuersatz: 0% bis 12.348€ Grundfreibetrag, dann 14% (Eingangssatz), bis 42% (Spitzensatz ab 68.481€), 45% Reichensteuer ab 277.826€. Splitting bei Verheirateten halbiert effektiv den Tarif." },
        { begriff: "Solidaritätszuschlag (SolZ)", erklaerung: "5,5 % auf die ESt. Aber: Freigrenze 19.950 € ESt (Single) — darunter zahlst du keinen SolZ. Bei verheirateten Paaren liegt die Grenze bei 39.900 € ESt." },
        { begriff: "Gewerbesteuer (GewSt)", erklaerung: "Nur bei Gewerbe (nicht Freiberuf). Freibetrag 24.500 € Gewinn. Rest mit Messzahl 3,5 % × Hebesatz der Gemeinde. Wichtig: GewSt wird via §35 EStG mit Faktor 4,0 auf die ESt angerechnet — bei Hebesatz ≤400% effektiv neutral!" },
        { begriff: "Kirchensteuer (KiSt)", erklaerung: "8 % der ESt in Bayern und Baden-Württemberg, 9 % im Rest. Nur wenn du Mitglied einer steuererhebenden Religionsgemeinschaft bist. Austritt = sofortige Befreiung." },
        { begriff: "KV/PV freiwillig (Mindestbemessung)", erklaerung: "Als Selbstständiger zahlst du GKV freiwillig: mindestens auf 1.318,33 €/Monat fingiertes Einkommen (Mindestbemessung 2026 ≈ 260-280 €/Mon Beitrag), max. auf BBG 5.512,50 €/Mon (höchster Beitrag ~1.150 €/Mon)." },
        { begriff: "Künstlersozialkasse (KSK)", erklaerung: "Bund übernimmt 50 % der GKV+RV-Beiträge für selbstständige Künstler/Publizisten — wie bei Angestellten. Pflicht-Mitgliedschaft für: Maler, Musiker, Autor, Journalist, Designer, Fotograf etc. Mindesteinkommen 3.900 €/J (sonst Befreiung)." },
        { begriff: "Vergleich Selbstständig vs. Angestellt (fair)", erklaerung: "Der faire Vergleich rechnet auf gleichem AG-Total, NICHT auf gleichem Brutto-Gehalt. Grund: dein Solo-Gewinn entspricht konzeptionell dem, was ein AG insgesamt für seinen Mitarbeiter aufbringen müsste (AN-Brutto + AG-SV-Anteil ~20,5 %). Würdest du Solo-Gewinn = AN-Brutto setzen, ignoriert das den AG-Anteil und macht Selbstständige systematisch ärmer aussehen als sie sind. Faustregel: Selbstständig rentabel ab ~20-30 % Mehr-Netto — der Aufschlag deckt Sicherheits-Lücke (Lohnfortzahlung, Urlaub, BU, Rente)." },
      ].map((g) => (
        <div key={g.begriff} className="rounded-lg bg-secondary/30 p-3">
          <div className="font-semibold text-foreground mb-1">{g.begriff}</div>
          <div className="text-muted-foreground">{g.erklaerung}</div>
        </div>
      ))}
    </div>
  </details>
);

export default BruttoNettoSolo;
