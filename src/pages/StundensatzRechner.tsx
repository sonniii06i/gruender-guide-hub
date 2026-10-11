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
import { NumberField } from "@/components/ui/number-field";
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
import { Lightbulb, Clock, Calculator, HelpCircle, TrendingUp, Wallet, ArrowRight, ChevronDown } from "lucide-react";
import { progressionESt, solZ as solZAuf, GEWST_MESSZAHL, GEWST_FREIBETRAG_NATUERLICH, GEWST_ANRECHNUNG_FAKTOR } from "@/lib/germanTax";

const MINDEST_BEMESSUNG_GKV_MONAT_2026 = 1318.33;
const BBG_KV_MONAT_2026 = 5812.5; // 69.750 €/Jahr (2025: 5.512,50)
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
  const eur = (n: number) => Math.round(n).toLocaleString("de-DE");
  const status: { tone: "danger" | "warning" | "success"; label: string } = istNiedrig
    ? { tone: "danger", label: "Zu niedrig" }
    : istHoch
      ? { tone: "warning", label: "Spezialisten-Niveau" }
      : { tone: "success", label: "Marktüblich" };

  return (
    <CockpitShell
      eyebrow="Erste Schritte · für Einsteiger:innen"
      title="Stundensatz-Rechner für Anfänger:innen"
      subtitle="Wer neu startet, unterschätzt den eigenen Stundensatz oft um 30 bis 50 %. Der Rechner geht rückwärts: Wunsch-Netto, Steuern, Krankenversicherung und Geschäftsausgaben ergeben den nötigen Umsatz, geteilt durch die abrechenbaren Stunden ergibt sich ein realistischer Stundensatz."
    >
      <BeginnerHero />

      <ToolLayout
        className="mb-8"
        inputs={
          <>
            <ToolSection title="Was brauchst du zum Leben?" description="Schritt 1 von 2" icon={Wallet}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Lebenshaltung pro Monat (€)" hint="Miete, Essen, Auto, Versicherungen, alles Private">
                  <NumberField value={lebenshaltungMonat} onChange={setLebenshaltungMonat} min={0} aria-label="Lebenshaltung pro Monat in Euro" />
                </Field>
                <Field label="Sparen und Vorsorge pro Monat (€)" hint="ETF-Sparplan, eigene Rente, Urlaubsgeld">
                  <NumberField value={zusatzNettoMonat} onChange={setZusatzNettoMonat} min={0} aria-label="Sparen pro Monat in Euro" />
                </Field>
                <Field label="Geschäftsausgaben pro Monat (€)" hint="Software, Internet, Telefon, Büro, Versicherung">
                  <NumberField value={betriebsausgabenMonat} onChange={setBetriebsausgabenMonat} min={0} aria-label="Geschäftsausgaben pro Monat in Euro" />
                </Field>
                <Field label="GKV-Zusatzbeitrag (%)" hint="Durchschnitt 2026: 2,9 %">
                  <NumberField step="0.01" value={zusatzbeitragKV} onChange={setZusatzbeitragKV} min={0} aria-label="GKV-Zusatzbeitrag in Prozent" />
                </Field>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border px-3 py-2.5 text-sm">
                  <input
                    type="checkbox"
                    checked={kinderlos}
                    onChange={(e) => setKinderlos(e.target.checked)}
                    className="h-4 w-4 accent-[hsl(var(--primary))]"
                  />
                  Kinderlos (Pflege plus 0,6 %)
                </label>
                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border px-3 py-2.5 text-sm">
                  <input
                    type="checkbox"
                    checked={rvFreiwillig}
                    onChange={(e) => setRvFreiwillig(e.target.checked)}
                    className="h-4 w-4 accent-[hsl(var(--primary))]"
                  />
                  Freiwillige Rentenversicherung (18,6 %)
                </label>
              </div>
            </ToolSection>

            <ToolSection title="Wie viel arbeitest du wirklich?" description="Schritt 2 von 2" icon={Clock}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Arbeitszeit" htmlFor="sr-profil">
                  <select
                    id="sr-profil"
                    value={profil}
                    onChange={(e) => setProfil(e.target.value as ArbeitszeitProfil)}
                    className={selectCls}
                  >
                    {(Object.entries(profilStunden) as [ArbeitszeitProfil, typeof profilStunden["vollzeit"]][]).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v.l}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field
                  label="Billable-Quote (%)"
                  hint="Anteil der Zeit, den du Kunden berechnen kannst. Typisch 60 bis 80 %; Akquise, Buchhaltung und Pausen zählen nicht."
                >
                  <NumberField value={billableQuote} onChange={setBillableQuote} min={20} max={100} aria-label="Billable-Quote in Prozent" />
                </Field>
                <Field label="Urlaubstage pro Jahr" hint="Gesetzlicher Mindesturlaub: 24 Werktage (BUrlG)">
                  <NumberField value={urlaubTage} onChange={setUrlaubTage} min={0} max={60} aria-label="Urlaubstage pro Jahr" />
                </Field>
                <Field label="Krankheitstage pro Jahr" hint="Angestellte im Schnitt 17,8 Tage, Selbstständige oft 5 bis 15">
                  <NumberField value={krankheitTage} onChange={setKrankheitTage} min={0} max={40} aria-label="Krankheitstage pro Jahr" />
                </Field>
                <Field label="Weiterbildungstage pro Jahr" hint="Konferenzen, Kurse, Selbststudium" className="sm:col-span-2">
                  <NumberField value={weiterbildungTage} onChange={setWeiterbildungTage} min={0} max={30} aria-label="Weiterbildungstage pro Jahr" />
                </Field>
              </div>
            </ToolSection>
          </>
        }
        result={
          <>
            <ResultPanel
              variant="ink"
              kicker="Dein nötiger Stundensatz"
              title={status.label}
              value={`${eur(calc.stundensatz)} €`}
              valueHint="/ Stunde (netto, ohne USt)"
            >
              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-3">
                {[
                  { l: "Tagessatz (8 h)", v: `${eur(calc.tagessatz)} €` },
                  { l: "Umsatz pro Jahr nötig", v: `${eur(calc.brutto)} €` },
                  { l: "Billable-Stunden pro Jahr", v: `${eur(calc.billableStunden)} h` },
                ].map((k) => (
                  <div key={k.l} className="bg-white/[0.04] p-3">
                    <div className="text-xs text-primary-foreground/65">{k.l}</div>
                    <div className="mt-0.5 font-semibold text-primary-foreground tabular">{k.v}</div>
                  </div>
                ))}
              </div>
            </ResultPanel>

            {istNiedrig && (
              <Callout tone="danger" title="Unter 30 € pro Stunde ist unrealistisch niedrig.">
                Das liegt unter einem typischen Angestellten-Stundenlohn, und als Selbstständige:r hast du keine
                Lohnfortzahlung bei Krankheit, keinen bezahlten Urlaub und keine Arbeitslosenversicherung. Erhöhe das
                Wunsch-Netto, senke die Geschäftsausgaben oder plane mehr Arbeitsstunden.
              </Callout>
            )}
            {istAngemessen && (
              <Callout tone="success" title="Realistischer Stundensatz für Solo-Selbstständige">
                Marktüblich für Solo-Berater:innen und Freelancer:innen im DACH-Raum 2026: 50 bis 120 € pro Stunde.
              </Callout>
            )}
            {istHoch && (
              <Callout tone="warning" icon={Lightbulb} title="Hoher Stundensatz">
                Markttauglich für Spezialist:innen (Senior-IT 100 bis 200 €, Strategieberatung ab 200 € pro Stunde). Bei
                allgemeinen Tätigkeiten die Marktakzeptanz prüfen. Hebel: höhere Billable-Quote, weniger Ausfalltage oder den
                Mehrwert klar kommunizieren.
              </Callout>
            )}
          </>
        }
      />

      {/* Rechenweg */}
      <ToolSection title="So wird gerechnet" icon={Calculator} className="mb-6">
        <ol className="space-y-4 text-sm">
          {[
            {
              t: "Wunsch-Netto pro Jahr",
              d: (
                <>
                  ({lebenshaltungMonat.toLocaleString("de-DE")} € Leben + {zusatzNettoMonat.toLocaleString("de-DE")} € Sparen) × 12 ={" "}
                  <strong className="text-foreground">{calc.wunschNettoJahr.toLocaleString("de-DE")} € pro Jahr</strong>
                </>
              ),
            },
            {
              t: "Steuern + KV + ggf. RV obendrauf rechnen",
              d: (
                <>
                  ESt {eur(calc.eSt)} € · SolZ {eur(calc.solz)} € · KV {eur(calc.kv)} €
                  {rvFreiwillig && <> · RV {eur(calc.rv)} €</>}, ergibt als Gewinn nach Geschäftsausgaben:{" "}
                  <strong className="text-foreground">{eur(calc.gewinn)} € pro Jahr</strong>
                </>
              ),
            },
            {
              t: "Geschäfts-Ausgaben dazu",
              d: (
                <>
                  + {(betriebsausgabenMonat * 12).toLocaleString("de-DE")} € Geschäftsausgaben ={" "}
                  <strong className="text-foreground">{eur(calc.brutto)} € Umsatz pro Jahr</strong>
                </>
              ),
            },
            {
              t: "Arbeitsstunden pro Jahr berechnen",
              d: (
                <>
                  {profilStunden[profil].arbeitstageProJahr} Arbeitstage − {urlaubTage} Urlaub − {krankheitTage} Krankheit −{" "}
                  {weiterbildungTage} Weiterbildung = <strong className="text-foreground">{calc.max_arbeitstage} aktive Arbeitstage</strong> ×{" "}
                  {profilStunden[profil].stundenProTag} h = {calc.max_stunden} h Arbeitszeit
                </>
              ),
            },
            {
              t: "Billable-Quote anwenden",
              d: (
                <>
                  Nur {billableQuote} % der Zeit lassen sich Kunden berechnen: {calc.max_stunden} h × {billableQuote} % ={" "}
                  <strong className="text-foreground">{Math.round(calc.billableStunden)} Billable-Stunden pro Jahr</strong>
                </>
              ),
            },
          ].map((s, i) => (
            <li key={s.t} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold tabular">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="font-medium">{s.t}</p>
                <p className="mt-0.5 leading-relaxed text-muted-foreground tabular">{s.d}</p>
              </div>
            </li>
          ))}
          <li className="flex items-start gap-3 rounded-xl border border-success/25 bg-success-soft/60 p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success text-xs font-semibold text-primary-foreground">
              =
            </span>
            <div className="min-w-0">
              <p className="font-medium">Stundensatz = Brutto-Umsatz ÷ Billable-Stunden</p>
              <p className="mt-0.5 text-muted-foreground tabular">
                {eur(calc.brutto)} € ÷ {Math.round(calc.billableStunden)} h ={" "}
                <strong className="text-base text-success">{Math.round(calc.stundensatz)} € pro Stunde</strong>
              </p>
            </div>
          </li>
        </ol>
      </ToolSection>

      {/* Vergleich Angestellter */}
      <ToolSection
        title="Vergleich: dasselbe Netto als Angestellter"
        description={`Bei gleichem Wunsch-Netto bräuchte ein:e Angestellte:r ${eur(calc.an_stundensatz)} € Brutto-Stundenlohn (Brutto etwa 1,6 mal Netto, 220 Arbeitstage mal 8 h). Angestellte bekommen Urlaub, Lohnfortzahlung und Arbeitslosengeld dazu, Selbstständige nicht.`}
        icon={TrendingUp}
        className="mb-6"
      >
        <StatGrid cols={3}>
          <StatTile label="Selbstständig (du)" value={`${eur(calc.stundensatz)} €/h`} tone="success" />
          <StatTile label="Angestellt (gleicher Netto)" value={`${eur(calc.an_stundensatz)} €/h`} tone="accent" />
          <StatTile
            emphasis
            tone="warning"
            label="Selbstständig-Aufschlag"
            value={(calc.stundensatz / Math.max(1, calc.an_stundensatz) - 1).toLocaleString("de-DE", { style: "percent", maximumFractionDigits: 0 })}
            hint="So viel mehr als die Brutto-Stunde eines Angestellten"
          />
        </StatGrid>
      </ToolSection>

      {/* Weiterführend */}
      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        {[
          { to: "/cockpit/brutto-netto-solo", t: "Brutto-Netto-Rechner", d: "Vorwärts gerechnet: vom Umsatz zum Netto" },
          { to: "/cockpit/kv-optimizer", t: "KV-Optimizer", d: "Die günstigste gesetzliche Kasse 2026" },
          { to: "/cockpit/schwellen-check", t: "Schwellen-Check", d: "Freibeträge und Grenzen optimal nutzen" },
        ].map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="group rounded-xl border border-border bg-card p-4 shadow-card transition-colors hover:border-accent-blue/40"
          >
            <p className="flex items-center gap-1.5 text-sm font-semibold">
              {l.t}
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{l.d}</p>
          </Link>
        ))}
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
  <section className="mb-8 rounded-2xl border border-accent-blue/20 bg-accent/60 p-5 md:p-6">
    <div className="flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-card text-accent-blue">
        <Lightbulb className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="text-base font-semibold">Was ist das hier?</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Viele setzen den Stundensatz zu niedrig an, weil sie wie Angestellte rechnen (Bruttolohn geteilt durch 160 Stunden
          im Monat). Dabei ist nur rund 70 % der Arbeitszeit <strong className="text-foreground">billable</strong>, Akquise,
          Buchhaltung und Verwaltung bleiben unbezahlt. Die Sozialversicherung zahlst du komplett selbst (rund 600 bis 1.000 €
          im Monat), und Urlaub oder Krankheit kosten dich Umsatz. Der Rechner geht deshalb rückwärts: was du brauchst, geteilt
          durch die tatsächlichen Stunden.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <Callout tone="danger" title="Typischer Anfänger-Fehler" className="bg-card">
            „Ich nehme 30 € pro Stunde, das entspricht meiner 60k-Stelle“: falsch. Nach Steuern, Krankenversicherung und
            Rücklagen bleiben rund 15 € netto pro Stunde.
          </Callout>
          <Callout tone="success" title="Realistische Spanne 2026" className="bg-card">
            Solo-Freelancer im DACH-Raum: 50 bis 120 € pro Stunde. IT-Senior 90 bis 180 €, Coaching und Strategie 100 bis
            300 €. Unter 40 € ist eine Notlage.
          </Callout>
        </div>
      </div>
    </div>
  </section>
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
      {[
        { begriff: "Billable-Quote", erklaerung: "Anteil deiner Arbeitszeit, den du Kunden in Rechnung stellen kannst. Akquise (Angebote schreiben, Kunden-Termine), Buchhaltung (Rechnungen, USt-VA), Admin (Email, Verträge), Weiterbildung, Pausen — alles unbezahlt. Realistisch: 60-80 % billable bei erfahrenen Solo-Selbstständigen, 50-60 % im ersten Jahr (viel Akquise)." },
        { begriff: "Tagessatz", erklaerung: "Stundensatz × 8 h. Wird oft bei längeren Projekten/Auftragsarbeit angeboten. Vorteil: planbar, keine Sek-Tracking-Pflicht. Nachteil: Risiko bei verkalkulierten Tagen." },
        { begriff: "Wunsch-Netto", erklaerung: "Was du WIRKLICH zum Leben + Sparen brauchst pro Monat. Realistisch: nicht NUR Lebenshaltung, sondern + 10-30 % für Sparen/Rente/Notgroschen." },
        { begriff: "Rücklage Urlaub + Krankheit", erklaerung: "Selbstständige bekommen 0 € bei Urlaub/Krankheit. Bei 25 Urlaubstagen + 10 Krankheitstagen fehlen dir 35 Tage Umsatz/Jahr (~7 Wochen). Stundensatz muss diese Ausfälle decken." },
        { begriff: "Vergleich AN-Stundenlohn", erklaerung: "Angestellte:r mit gleichem Brutto-Stundenlohn bekommt + bez. Urlaub + Lohnfortzahlung + AG-SV-Anteil + ALV. Faustregel: Selbstständig-Stundensatz mindestens 40-60 % über AN-Stundenlohn um gleichen Sicherheits-Standard zu erreichen." },
        { begriff: "Konvergenz-Iteration", erklaerung: "Da ESt progressiv ist, kann man nicht einfach 'Netto + 30 % = Brutto' rechnen. Tool iteriert 5× zwischen geschätztem Brutto und resultierendem Netto, bis die Differenz < 50 € ist. Klassische Methode für rückwärts-gerechnete Steuer-Probleme." },
      ].map((g) => (
        <div key={g.begriff} className="py-3.5 text-sm">
          <dt className="font-semibold text-foreground">{g.begriff}</dt>
          <dd className="mt-1 leading-relaxed text-muted-foreground">{g.erklaerung}</dd>
        </div>
      ))}
    </dl>
  </details>
);

export default StundensatzRechner;
