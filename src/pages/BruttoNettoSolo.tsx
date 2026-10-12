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
import { NumberField } from "@/components/ui/number-field";
import { HebesatzPicker } from "@/components/ui/hebesatz-picker";
import {
  Callout,
  Field,
  ResultPanel,
  StatGrid,
  StatTile,
  ToolLayout,
  ToolSection,
  selectCls,
} from "@/components/cockpit/kit";
import {
  Lightbulb,
  Wallet,
  TrendingDown,
  HelpCircle,
  Landmark,
  ShieldCheck,
  ListOrdered,
  ArrowRight,
  ChevronDown,
  Check,
} from "lucide-react";
import {
  progressionESt,
  solZ as solZAuf,
  GEWST_MESSZAHL,
  GEWST_FREIBETRAG_NATUERLICH,
  GEWST_ANRECHNUNG_FAKTOR,
} from "@/lib/germanTax";

const MINDEST_BEMESSUNG_GKV_MONAT_2026 = 1318.33; // freiwillig versicherte Selbstständige
const BBG_KV_MONAT_2026 = 5812.5; // Höchst-Bemessung (69.750 €/Jahr; 2025: 5.512,50)
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
    // 2026 zwei getrennte Beitragsbemessungsgrenzen: KV/PV bis 69.750 €, RV/AV bis 101.400 €.
    // AN-Anteile getrennt deckeln (KV+PV ~10,25 %, RV+AV ~10,6 %), sonst wird der KV-Teil zu hoch gekappt.
    const an_kvpv = Math.min(an_brutto, BBG_KV_MONAT_2026 * 12) * 0.1025;
    const an_rvav = Math.min(an_brutto, BBG_RV_MONAT_2026 * 12) * 0.106;
    const an_sv = an_kvpv + an_rvav;
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

  const vorteil = calc.nettoMonat > calc.anNetto / 12;

  return (
    <CockpitShell
      eyebrow="Erste Schritte · für komplette Anfänger:innen"
      title="Brutto-Netto-Rechner für Solo-Selbstständige"
      subtitle="Was bleibt am Ende wirklich übrig? Umsatz → Betriebsausgaben → ESt + SolZ + ggf. KSt/GewSt + KV/PV → Netto. Mit Erklärung jeder Position und fairem Vergleich gegen „gleiches AG-Total als Angestellter“ (inkl. AG-SV-Anteil)."
    >
      <BeginnerHero />

      <ToolLayout
        className="mb-8"
        inputs={
          <>
            <ToolSection title="Deine Zahlen" description="Werte pro Jahr, ohne Umsatzsteuer" icon={Wallet}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Jahres-Umsatz (€)" hint="Summe Honorare/Erlöse netto (= ohne USt)">
                  <NumberField value={umsatz} onChange={setUmsatz} min={0} aria-label="Jahres-Umsatz in Euro" />
                </Field>
                <Field label="Jahres-Betriebsausgaben (€)" hint="Bürokosten, Software, Reisen, Werbung, AfA usw.">
                  <NumberField value={betriebsausgaben} onChange={setBetriebsausgaben} min={0} aria-label="Jahres-Betriebsausgaben in Euro" />
                </Field>
              </div>
            </ToolSection>

            <ToolSection title="Rechtsform und Steuer" icon={Landmark}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Rechtsform" htmlFor="bns-rf" className={rechtsform === "gewerbe" ? undefined : "sm:col-span-2"}>
                  <select id="bns-rf" value={rechtsform} onChange={(e) => setRechtsform(e.target.value as Rechtsform)} className={selectCls}>
                    <option value="freiberuf">Freiberufler:in (§18 EStG), keine GewSt</option>
                    <option value="gewerbe">Einzel-Gewerbe, GewSt ab 24.500€ Gewinn</option>
                  </select>
                </Field>
                {rechtsform === "gewerbe" && (
                  <Field label="GewSt-Hebesatz der Gemeinde (%)">
                    <HebesatzPicker value={hebesatz} onChange={setHebesatz} />
                  </Field>
                )}
                <Field label="Kirchensteuer" htmlFor="bns-kist">
                  <select id="bns-kist" value={kistSatz} onChange={(e) => setKistSatz(Number(e.target.value))} className={selectCls}>
                    <option value={0}>0 % (kein Eintrag)</option>
                    <option value={8}>8 % (BY, BW)</option>
                    <option value={9}>9 % (Rest DE)</option>
                  </select>
                </Field>
                <div className="flex items-end">
                  <CheckOption checked={verheiratet} onChange={setVerheiratet} label="Verheiratet" hint="Splitting-Tarif" />
                </div>
              </div>
            </ToolSection>

            <ToolSection title="Kranken- und Rentenversicherung" icon={ShieldCheck}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Krankenversicherung" htmlFor="bns-kv" className="sm:col-span-2">
                  <select id="bns-kv" value={kvVariante} onChange={(e) => setKvVariante(e.target.value as KvVariante)} className={selectCls}>
                    <option value="gkv-freiwillig">GKV freiwillig (Mindestbeitrag 260-280€)</option>
                    <option value="pkv">PKV (eigener Beitrag)</option>
                    <option value="ksk">KSK (Bund zahlt 50%, nur Künstler/Publizisten)</option>
                  </select>
                </Field>
                {kvVariante === "gkv-freiwillig" || kvVariante === "ksk" ? (
                  <Field className="sm:col-span-2" label="Zusatzbeitrag deiner Kasse (%)" hint="2026 ⌀ 2,9 % · Spanne 2,18 bis 4,39 %">
                    <NumberField step="0.01" value={zusatzBeitrag} onChange={setZusatzBeitrag} min={0} aria-label="Zusatzbeitrag in Prozent" />
                  </Field>
                ) : (
                  <Field className="sm:col-span-2" label="PKV-Beitrag pro Monat (€)">
                    <NumberField value={pkvBeitragMonat} onChange={setPkvBeitragMonat} min={0} aria-label="PKV-Beitrag pro Monat in Euro" />
                  </Field>
                )}
                <CheckOption checked={kinderlos} onChange={setKinderlos} label="Kinderlos" hint="+0,6 % Pflegeversicherung" />
                <CheckOption checked={rvFreiwillig} onChange={setRvFreiwillig} label="Freiwillige Rentenversicherung" hint={`${RV_SATZ} % auf den Gewinn`} />
              </div>
            </ToolSection>
          </>
        }
        result={
          <>
            <ResultPanel
              variant="ink"
              kicker="Dein Netto"
              title="Was nach Steuern und Versicherung bleibt"
              value={`${Math.round(calc.nettoMonat).toLocaleString("de-DE")} € / Monat`}
              valueHint={`= ${Math.round(calc.nettoJahr).toLocaleString("de-DE")} € pro Jahr`}
            >
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10">
                {[
                  { l: "Gewinn", v: `${calc.gewinn.toLocaleString("de-DE")} €` },
                  { l: "Steuern", v: `${Math.round(calc.steuerGesamt).toLocaleString("de-DE")} €`, h: `${calc.steuerquote.toFixed(1)} % vom Gewinn` },
                  { l: "Sozialversicherung", v: `${Math.round(calc.sozialGesamt).toLocaleString("de-DE")} €` },
                  { l: "Belastung gesamt", v: `${calc.gesamtbelastung.toFixed(1)} %` },
                ].map((k) => (
                  <div key={k.l} className="bg-white/[0.04] p-3">
                    <div className="text-xs text-primary-foreground/65">{k.l}</div>
                    <div className="mt-0.5 font-semibold text-primary-foreground tabular">{k.v}</div>
                    {k.h && <div className="text-xs text-primary-foreground/55 tabular">{k.h}</div>}
                  </div>
                ))}
              </div>
            </ResultPanel>

            <ToolSection title="Rechnung Schritt für Schritt" icon={ListOrdered}>
              <div className="text-sm">
                <Row label="Jahres-Umsatz (netto)" val={umsatz} />
                <Row label="./. Betriebsausgaben" val={-betriebsausgaben} />
                <Row label="= Gewinn (Bemessungsgrundlage)" val={calc.gewinn} bold />
                <div className="my-2 border-t border-border/70" />
                <Row label="./. Einkommensteuer §32a EStG (Progression)" val={-calc.eSt}
                     note={verheiratet ? "Splitting-Tarif (verheiratet)" : "Grundtarif (Single)"} />
                {calc.solz > 0 && <Row label="./. Solidaritätszuschlag 5,5 % auf ESt" val={-calc.solz} note="Freigrenze 20.350 € ESt" />}
                {calc.kist > 0 && <Row label={`./. Kirchensteuer ${kistSatz} %`} val={-calc.kist} />}
                {calc.gewSt > 0 && (
                  <Row label="./. Gewerbesteuer (nach §35-Anrechnung)" val={-calc.gewSt}
                       note={`Hebesatz ${hebesatz}% · Anrechnung ${Math.round(calc.gewStAnrechnung).toLocaleString("de-DE")}€ auf ESt`} />
                )}
                <Row label="= Nach Steuern" val={calc.gewinn - calc.steuerGesamt} bold />
                <div className="my-2 border-t border-border/70" />
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
                <div className="mt-2 space-y-1">
                  <Row label="= Netto pro Jahr" val={calc.nettoJahr} bold highlight />
                  <Row label="= Netto pro Monat" val={calc.nettoMonat} bold highlight />
                </div>
              </div>
            </ToolSection>
          </>
        }
      />

      {/* === Vergleich Angestellter === */}
      <ToolSection title="Vergleich: gleiches AG-Total als Angestellter" icon={TrendingDown} className="mb-6">
        <p className="mb-4 max-w-[80ch] text-sm leading-relaxed text-muted-foreground">
          Fair-Vergleich: dein Solo-Gewinn ({Math.round(calc.gewinn).toLocaleString("de-DE")} €/Jahr) ist das,
          was du als „virtueller AG" für dich aufbringst. Steuer, KV und RV gehen alle aus diesem Topf.
          Beim Angestellten zahlt der AG seinen ~20,5 % SV-Anteil <em>zusätzlich</em>. Bei gleichem AG-Total
          ist das AN-Bruttogehalt also <strong className="text-foreground tabular">{Math.round(calc.anBrutto).toLocaleString("de-DE")} €/Jahr</strong>
          {" "}(= Gewinn / 1,205), nicht der volle Gewinn.
        </p>
        <StatGrid cols={3}>
          <StatTile
            label="Selbstständig (du)"
            value={`${Math.round(calc.nettoMonat).toLocaleString("de-DE")} €/Mon`}
            hint="netto nach Steuer + KV/RV"
          />
          <StatTile
            label="Angestellt (gleiches AG-Total)"
            value={`${Math.round(calc.anNetto / 12).toLocaleString("de-DE")} €/Mon`}
            hint="netto nach ESt + AN-SV-Anteil 20,5 %"
          />
          <StatTile
            label="Differenz"
            tone={vorteil ? "success" : "warning"}
            emphasis
            value={`${vorteil ? "+" : ""}${Math.round(calc.nettoMonat - calc.anNetto / 12).toLocaleString("de-DE")} €/Mon`}
            hint={`${vorteil ? "Mehr Netto" : "Weniger Netto"} als Angestellter`}
          />
        </StatGrid>
        <Callout tone="warning" title="Trotzdem aufpassen" className="mt-4">
          Als Selbstständige:r fehlen dir AG-Leistungen (Lohnfortzahlung 6 Wochen, bezahlter Urlaub, Mutterschutz,
          Arbeitslosenversicherung optional, gesetzliche RV-Anwartschaft). Faustregel: Selbstständig wirklich rentabel ab <strong>~20-30 % Mehr-Netto</strong>{" "}
          als Angestellter. Der Aufschlag deckt die fehlende Absicherung (BU, Krankentagegeld, eigene Rente).
        </Callout>
      </ToolSection>

      {/* === Cross-Links === */}
      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        {[
          { to: "/cockpit/gewerbe-check", t: "Brauche ich ein Gewerbe?", d: "Falls noch unklar ist, ob eine Anmeldung nötig ist" },
          { to: "/cockpit/quartals-steuer", t: "Quartals-Steuerschätzung", d: "VZ-Termine 10.3/6/9/12 + Rücklage planen" },
          { to: "/cockpit/kv-optimizer", t: "KV-Optimizer", d: "Kasse wechseln + Spar-Potenzial" },
        ].map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="group rounded-2xl border border-border bg-card p-4 shadow-card transition-[border-color,box-shadow] duration-200 hover:border-accent-blue/40 hover:shadow-soft"
          >
            <p className="flex items-center justify-between gap-2 text-sm font-semibold">
              {l.t}
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent-blue" aria-hidden="true" />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{l.d}</p>
          </Link>
        ))}
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
const GLOSSAR = [
  { begriff: "Gewinn (= Bemessungsgrundlage)", erklaerung: "Umsatz minus Betriebsausgaben. Aus dem Gewinn werden alle Steuern (ESt, GewSt) und Sozialversicherungs-Beiträge berechnet. Wichtig: nicht der Umsatz, sondern der Gewinn ist die Basis!" },
  { begriff: "Einkommensteuer-Progression §32a EStG", erklaerung: "Je höher dein Einkommen, desto höher der Steuersatz: 0% bis 12.348€ Grundfreibetrag, dann 14% (Eingangssatz), bis 42% (Spitzensatz ab 69.879€), 45% Reichensteuer ab 277.826€. Splitting bei Verheirateten halbiert effektiv den Tarif." },
  { begriff: "Solidaritätszuschlag (SolZ)", erklaerung: "5,5 % auf die ESt. Aber: Freigrenze 20.350 € ESt (Single) — darunter zahlst du keinen SolZ. Bei verheirateten Paaren liegt die Grenze bei 40.700 € ESt." },
  { begriff: "Gewerbesteuer (GewSt)", erklaerung: "Nur bei Gewerbe (nicht Freiberuf). Freibetrag 24.500 € Gewinn. Rest mit Messzahl 3,5 % × Hebesatz der Gemeinde. Wichtig: GewSt wird via §35 EStG mit Faktor 4,0 auf die ESt angerechnet — bei Hebesatz ≤400% effektiv neutral!" },
  { begriff: "Kirchensteuer (KiSt)", erklaerung: "8 % der ESt in Bayern und Baden-Württemberg, 9 % im Rest. Nur wenn du Mitglied einer steuererhebenden Religionsgemeinschaft bist. Austritt = sofortige Befreiung." },
  { begriff: "KV/PV freiwillig (Mindestbemessung)", erklaerung: "Als Selbstständiger zahlst du GKV freiwillig: mindestens auf 1.318,33 €/Monat fingiertes Einkommen (Mindestbemessung 2026 ≈ 260-280 €/Mon Beitrag), max. auf BBG 5.812,50 €/Mon (höchster Beitrag ~1.210 €/Mon)." },
  { begriff: "Künstlersozialkasse (KSK)", erklaerung: "Bund übernimmt 50 % der GKV+RV-Beiträge für selbstständige Künstler/Publizisten — wie bei Angestellten. Pflicht-Mitgliedschaft für: Maler, Musiker, Autor, Journalist, Designer, Fotograf etc. Mindesteinkommen 3.900 €/J (sonst Befreiung)." },
  { begriff: "Vergleich Selbstständig vs. Angestellt (fair)", erklaerung: "Der faire Vergleich rechnet auf gleichem AG-Total, NICHT auf gleichem Brutto-Gehalt. Grund: dein Solo-Gewinn entspricht konzeptionell dem, was ein AG insgesamt für seinen Mitarbeiter aufbringen müsste (AN-Brutto + AG-SV-Anteil ~20,5 %). Würdest du Solo-Gewinn = AN-Brutto setzen, ignoriert das den AG-Anteil und macht Selbstständige systematisch ärmer aussehen als sie sind. Faustregel: Selbstständig rentabel ab ~20-30 % Mehr-Netto — der Aufschlag deckt Sicherheits-Lücke (Lohnfortzahlung, Urlaub, BU, Rente)." },
];

const Row = ({ label, val, bold, highlight, note }: { label: string; val: number; bold?: boolean; highlight?: boolean; note?: string }) => (
  <div className={`flex items-baseline justify-between gap-3 py-1.5 ${highlight ? "rounded-lg bg-success-soft px-3" : ""}`}>
    <div className={`min-w-0 flex-1 ${bold ? "font-semibold" : "text-foreground/85"}`}>
      {label}
      {note && <div className="text-xs font-normal text-muted-foreground">{note}</div>}
    </div>
    <div className={`shrink-0 tabular ${bold ? "text-base font-semibold" : "text-sm"} ${highlight ? "text-success" : ""}`}>
      {val < 0 ? "−" : ""}
      {Math.round(Math.abs(val)).toLocaleString("de-DE")} €
    </div>
  </div>
);

/** Ankreuz-Option als Karte; natives Checkbox-Feld bleibt für Tastatur und Tests erhalten. */
const CheckOption = ({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) => (
  <label
    className={`flex w-full cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
      checked ? "border-accent-blue/40 bg-accent" : "border-border bg-card hover:border-foreground/25"
    }`}
  >
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
    <span
      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border peer-focus-visible:ring-2 peer-focus-visible:ring-ring ${
        checked ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card"
      }`}
      aria-hidden="true"
    >
      {checked && <Check className="h-3 w-3" />}
    </span>
    <span className="min-w-0">
      <span className="block text-sm font-medium">{label}</span>
      {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}
    </span>
  </label>
);

const BeginnerHero = () => (
  <Callout tone="accent" icon={Lightbulb} title="Was ist das hier?" className="mb-6 p-5">
    <p className="max-w-[90ch]">
      Du fragst dich: „Wenn ich 60.000 € im Jahr einnehme, was bleibt davon NACH allem (Steuer, KV, Rente) am Ende übrig?" Standard-Brutto-Netto-Rechner aus dem Web sind für Angestellte gemacht und geben Selbstständigen falsche Werte. Dieses Tool rechnet Solo-Selbstständige-spezifisch: Umsatz minus BA = Gewinn → ESt mit Progression → ggf. GewSt → freiwillige KV/PV → Netto.
    </p>
    <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
      <div className="rounded-lg border border-accent-blue/15 bg-card/70 p-3">
        <p className="font-semibold text-foreground">Schritt-für-Schritt-Transparenz</p>
        <p className="mt-0.5 text-muted-foreground">Jede Abzug-Position wird einzeln gezeigt mit §-Verweis und Begründung</p>
      </div>
      <div className="rounded-lg border border-accent-blue/15 bg-card/70 p-3">
        <p className="font-semibold text-foreground">Vergleich Angestellter</p>
        <p className="mt-0.5 text-muted-foreground">Fair-Vergleich: was würde dasselbe AG-Total als Angestellter abwerfen? (inkl. AG-Anteil SV)</p>
      </div>
    </div>
  </Callout>
);

const Glossar = () => (
  <details className="group mb-6 rounded-2xl border border-border bg-card shadow-card [&_summary::-webkit-details-marker]:hidden">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-base font-semibold md:px-6">
      <span className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-blue">
          <HelpCircle className="h-4 w-4" aria-hidden="true" />
        </span>
        Glossar: Begriffe einfach erklärt
      </span>
      <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
    </summary>
    <dl className="divide-y divide-border/70 border-t border-border/70 px-5 md:px-6">
      {GLOSSAR.map((g) => (
        <div key={g.begriff} className="py-3.5 text-sm">
          <dt className="font-semibold text-foreground">{g.begriff}</dt>
          <dd className="mt-1 leading-relaxed text-muted-foreground">{g.erklaerung}</dd>
        </div>
      ))}
    </dl>
  </details>
);

export default BruttoNettoSolo;
