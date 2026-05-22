import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { HebesatzPicker } from "@/components/ui/hebesatz-picker";
import { Label } from "@/components/ui/label";
import {
  Calculator,
  CheckCircle2,
  AlertTriangle,
  TrendingDown,
  Info,
  ArrowRight,
} from "lucide-react";
import {
  progressionESt,
  grenzSteuerSatz,
  kstGewstRate,
  IAB_QUOTE,
  IAB_MAX,
  SOLZ_RATE as SOLZ,
} from "@/lib/germanTax";

type Rechtsform = "einzel" | "freiberuf" | "ug" | "gmbh";

const IAB_FRIST_JAHRE = 3; // Investition muss innerhalb 3 Wj erfolgen
const GEWST_MESSZAHL = 0.035; // §11 GewStG

const IabRechner = () => {
  const [rechtsform, setRechtsform] = useState<Rechtsform>("gmbh");
  const [gewinnVorIab, setGewinnVorIab] = useState(150000);
  const [bilanzsumme, setBilanzsumme] = useState(180000);
  const [estVorIab, setEstVorIab] = useState(0);
  const [hebesatz, setHebesatz] = useState(400); // Gemeinde-Hebesatz GewSt
  const [istFreiberuflerOhneGewSt, setIstFreiberuflerOhneGewSt] = useState(true);

  const gewStSatz = (hebesatz / 100) * GEWST_MESSZAHL; // z.B. 4,00 × 3,5 % = 14 %
  const KSt_GEWST_DYN = kstGewstRate(hebesatz); // GmbH-Effektivsatz inkl. SolZ

  // Geplante Investitionen (3-Jahres-Fenster)
  const [invJahr1, setInvJahr1] = useState(20000);
  const [invJahr2, setInvJahr2] = useState(15000);
  const [invJahr3, setInvJahr3] = useState(10000);

  const totalInvestition = invJahr1 + invJahr2 + invJahr3;

  // Voraussetzungs-Prüfung §7g EStG (Stand 2026)
  // Einzelunternehmer/Freiberufler: Gewinn vor IAB ≤ 200.000 €
  // GmbH/UG (Bilanzierer): Bilanzsumme ≤ 235.000 € (Wirtschaftsjahr-Ende)
  const eligibility = useMemo(() => {
    if (rechtsform === "einzel" || rechtsform === "freiberuf") {
      return {
        ok: gewinnVorIab <= 200000,
        rule: "Einzel/Freiberuf: Gewinn vor IAB max. 200.000 €",
        actual: `${gewinnVorIab.toLocaleString("de-DE")} €`,
        threshold: "200.000 €",
      };
    }
    // GmbH/UG
    return {
      ok: bilanzsumme <= 235000,
      rule: "GmbH/UG: Bilanzsumme max. 235.000 € (zum Wirtschaftsjahr-Ende)",
      actual: `${bilanzsumme.toLocaleString("de-DE")} €`,
      threshold: "235.000 €",
    };
  }, [rechtsform, gewinnVorIab, bilanzsumme]);

  // Maximaler IAB pro Jahr (vereinfacht — kumulierte Grenze über alle Jahre 200k)
  const iabHoehe = useMemo(() => {
    if (!eligibility.ok) return 0;
    const optimal = totalInvestition * IAB_QUOTE;
    // Begrenzt durch Gewinn vor IAB (kann nicht negative ZvE schaffen — vereinfacht)
    const gewinnLimit = Math.max(0, gewinnVorIab);
    return Math.min(optimal, IAB_MAX, gewinnLimit);
  }, [eligibility.ok, totalInvestition, gewinnVorIab]);

  // Steuer-Effekt
  const result = useMemo(() => {
    if (iabHoehe <= 0)
      return {
        gewinnVorIabSteuer: 0,
        gewinnNachIabSteuer: 0,
        steuerOhneIab: 0,
        steuerMitIab: 0,
        ersparnis: 0,
        effektivProzent: 0,
      };

    if (rechtsform === "einzel" || rechtsform === "freiberuf") {
      const istGewerblich = rechtsform === "einzel" && !istFreiberuflerOhneGewSt;
      const zvE = Math.max(0, gewinnVorIab - estVorIab);
      const zvENachIab = Math.max(0, zvE - iabHoehe);

      // ESt + SolZ über Progression
      const estOhne = progressionESt(zvE);
      const estMit = progressionESt(zvENachIab);
      const solzOhne = estOhne * SOLZ; // vereinfacht ohne SolZ-Freigrenze (ESt > 19.950 Single)
      const solzMit = estMit * SOLZ;

      // GewSt bei Einzelunternehmer (Gewerbe): GewSt-Anrechnung §35 EStG bis 400 % Hebesatz
      let gewStOhne = 0;
      let gewStMit = 0;
      if (istGewerblich) {
        const gewinnFuerGewSt = Math.max(0, gewinnVorIab - 24500); // Freibetrag §11 GewStG
        const gewinnFuerGewStNachIab = Math.max(0, gewinnVorIab - iabHoehe - 24500);
        const gewStBrutto = gewinnFuerGewSt * gewStSatz;
        const gewStBruttoNachIab = gewinnFuerGewStNachIab * gewStSatz;
        // §35 EStG: bis 4,0 × Messbetrag anrechenbar auf ESt → effektiv bis Hebesatz 400 neutral
        const anrechnungsfaktor = 4.0;
        const gewStAnrechnungOhne = Math.min(gewStBrutto, gewinnFuerGewSt * GEWST_MESSZAHL * anrechnungsfaktor);
        const gewStAnrechnungMit = Math.min(gewStBruttoNachIab, gewinnFuerGewStNachIab * GEWST_MESSZAHL * anrechnungsfaktor);
        gewStOhne = Math.max(0, gewStBrutto - gewStAnrechnungOhne);
        gewStMit = Math.max(0, gewStBruttoNachIab - gewStAnrechnungMit);
      }

      const totalOhne = estOhne + solzOhne + gewStOhne;
      const totalMit = estMit + solzMit + gewStMit;
      const grenz = grenzSteuerSatz(zvE - iabHoehe / 2);
      return {
        gewinnVorIabSteuer: totalOhne,
        gewinnNachIabSteuer: totalMit,
        steuerOhneIab: totalOhne,
        steuerMitIab: totalMit,
        ersparnis: totalOhne - totalMit,
        effektivProzent: grenz * 100 * (1 + SOLZ) + (istGewerblich && hebesatz > 400 ? (hebesatz - 400) / 100 * GEWST_MESSZAHL * 100 : 0),
      };
    }

    // GmbH/UG: KSt 15 % + SolZ 5,5 % auf KSt + GewSt (Hebesatz-abhängig)
    const kStOhne = gewinnVorIab * 0.15 * (1 + SOLZ);
    const gewStOhne = gewinnVorIab * gewStSatz;
    const totalOhne = kStOhne + gewStOhne;
    const kStMit = (gewinnVorIab - iabHoehe) * 0.15 * (1 + SOLZ);
    const gewStMit = (gewinnVorIab - iabHoehe) * gewStSatz;
    const totalMit = kStMit + gewStMit;
    return {
      gewinnVorIabSteuer: totalOhne,
      gewinnNachIabSteuer: totalMit,
      steuerOhneIab: totalOhne,
      steuerMitIab: totalMit,
      ersparnis: totalOhne - totalMit,
      effektivProzent: KSt_GEWST_DYN * 100,
    };
  }, [rechtsform, gewinnVorIab, estVorIab, iabHoehe, hebesatz, gewStSatz, KSt_GEWST_DYN, istFreiberuflerOhneGewSt]);

  // Auflösungs-Plan (Hinzurechnung bei tatsächlicher Investition)
  const aufloesung = useMemo(() => {
    const auflJ1 = Math.min(invJahr1 * IAB_QUOTE, iabHoehe);
    const auflJ2 = Math.min(invJahr2 * IAB_QUOTE, iabHoehe - auflJ1);
    const auflJ3 = Math.min(invJahr3 * IAB_QUOTE, iabHoehe - auflJ1 - auflJ2);
    return { j1: auflJ1, j2: auflJ2, j3: auflJ3 };
  }, [invJahr1, invJahr2, invJahr3, iabHoehe]);

  return (
    <CockpitShell
      eyebrow="IAB-Rechner"
      title="Investitionsabzugsbetrag §7g EStG"
      subtitle="50 % der geplanten Investitionen (max. 200.000 €) im laufenden Jahr abziehen — sofort steuerwirksam. Auflösung in den 3 Folgejahren bei tatsächlicher Anschaffung."
    >
      {/* Vorab-Erklärung */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4 mb-6 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-accent-blue shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">So funktioniert der IAB (§7g EStG):</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                Du planst Investitionen (bewegliche, abnutzbare WG) für die nächsten 3 Wirtschaftsjahre
                (z.B. Maschinen, Computer, Fahrzeug, Ausstattung).
              </li>
              <li>
                Du ziehst <strong>50 %</strong> dieser geplanten Investitionen schon JETZT als
                Betriebsausgabe ab — bevor das WG überhaupt da ist.
              </li>
              <li>
                Maximum: 200.000 € IAB pro Betrieb (kumuliert über alle Jahre).
              </li>
              <li>
                Bei tatsächlicher Investition wird der IAB <strong>aufgelöst</strong> (= dem Gewinn
                hinzugerechnet) — die Sonder-AfA mindert dann die AK/HK auf 50 % der Anschaffung.
              </li>
              <li>
                Wenn nicht in 3 Wirtschaftsjahren investiert: rückwirkende Auflösung im Jahr der
                Bildung + 6 % p.a. Verzinsung.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="h-4 w-4 text-accent-blue" />
          <h3 className="font-bold text-sm">Deine Daten</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Rechtsform</Label>
            <select
              value={rechtsform}
              onChange={(e) => setRechtsform(e.target.value as Rechtsform)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="einzel">Einzelunternehmen / e.K.</option>
              <option value="freiberuf">Freiberufler</option>
              <option value="ug">UG (haftungsbeschränkt)</option>
              <option value="gmbh">GmbH</option>
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Gewinn vor IAB (€)</Label>
            <Input
              type="number"
              value={gewinnVorIab}
              onChange={(e) => setGewinnVorIab(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-1">
              Steuerlicher Gewinn (BE) für das aktuelle Wirtschaftsjahr
            </div>
          </div>
        </div>

        {(rechtsform === "ug" || rechtsform === "gmbh") && (
          <div className="mb-3">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Bilanzsumme (€)</Label>
            <Input
              type="number"
              value={bilanzsumme}
              onChange={(e) => setBilanzsumme(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-1">
              Bilanzsumme zum Wirtschaftsjahr-Ende — Schwelle für IAB-Berechtigung 235.000 €
            </div>
          </div>
        )}

        {(rechtsform === "einzel" || rechtsform === "freiberuf") && (
          <div className="mb-3">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Andere Einkünfte (€) — zusätzlich zum Gewinn (z.B. Lohn, V+V)
            </Label>
            <Input
              type="number"
              value={estVorIab}
              onChange={(e) => setEstVorIab(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-1">
              Mindert das ZvE — relevant für deine Grenzsteuersatz-Position
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          {rechtsform !== "freiberuf" && (
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                GewSt-Hebesatz Gemeinde (%)
              </Label>
              <HebesatzPicker value={hebesatz} onChange={setHebesatz} className="mt-1" />
            </div>
          )}
          {rechtsform === "einzel" && (
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-xs cursor-pointer pb-2">
                <input
                  type="checkbox"
                  checked={istFreiberuflerOhneGewSt}
                  onChange={(e) => setIstFreiberuflerOhneGewSt(e.target.checked)}
                  className="h-4 w-4"
                />
                <span>Freiberuflich (keine GewSt) — sonst gewerblich</span>
              </label>
            </div>
          )}
        </div>

        <div className="border-t border-border pt-3">
          <div className="text-xs font-semibold mb-2 text-foreground">Geplante Investitionen (3-Jahres-Fenster)</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Jahr 1 (€)</Label>
              <Input
                type="number"
                value={invJahr1}
                onChange={(e) => setInvJahr1(Math.max(0, Number(e.target.value) || 0))}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Jahr 2 (€)</Label>
              <Input
                type="number"
                value={invJahr2}
                onChange={(e) => setInvJahr2(Math.max(0, Number(e.target.value) || 0))}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Jahr 3 (€)</Label>
              <Input
                type="number"
                value={invJahr3}
                onChange={(e) => setInvJahr3(Math.max(0, Number(e.target.value) || 0))}
                className="mt-1"
              />
            </div>
          </div>
          <div className="text-[11px] text-muted-foreground mt-2">
            Total geplant: <strong>{totalInvestition.toLocaleString("de-DE")} €</strong> · max IAB (50 %):{" "}
            <strong>{Math.min(totalInvestition * 0.5, IAB_MAX).toLocaleString("de-DE")} €</strong>
          </div>
        </div>
      </div>

      {/* Voraussetzungs-Check */}
      <div
        className={`rounded-2xl border p-5 mb-6 ${
          eligibility.ok
            ? "border-emerald-500/30 bg-emerald-500/5"
            : "border-red-500/30 bg-red-500/5"
        }`}
      >
        <div className="flex items-start gap-3">
          {eligibility.ok ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-red-700 dark:text-red-400 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <div className="font-semibold text-sm text-foreground mb-1">
              {eligibility.ok
                ? "Voraussetzungen erfüllt — IAB möglich"
                : "Voraussetzungen NICHT erfüllt — IAB gesperrt"}
            </div>
            <div className="text-xs text-muted-foreground mb-1">{eligibility.rule}</div>
            <div className="text-xs">
              <span className="text-muted-foreground">Dein Wert: </span>
              <span className="font-semibold text-foreground">{eligibility.actual}</span>
              <span className="text-muted-foreground"> · Schwelle: </span>
              <span className="font-semibold text-foreground">{eligibility.threshold}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Result */}
      {iabHoehe > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4">
              <div className="text-[10px] uppercase tracking-wider text-accent-blue font-semibold mb-1">
                IAB-Höhe (50 % der Investitionen)
              </div>
              <div className="text-3xl font-bold text-foreground">
                {Math.round(iabHoehe).toLocaleString("de-DE")} €
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                wird im aktuellen Jahr als BA abgezogen
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
              <div className="text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold mb-1">
                Steuer-Ersparnis (sofort)
              </div>
              <div className="text-3xl font-bold text-foreground">
                {Math.round(result.ersparnis).toLocaleString("de-DE")} €
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                ~{result.effektivProzent.toFixed(1)} % effektiv ·{" "}
                {rechtsform === "einzel" || rechtsform === "freiberuf" ? "ESt-Grenz" : "KSt+GewSt+SolZ"}
              </div>
            </div>
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
              <div className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold mb-1">
                Liquiditäts-Vorteil (Zeit)
              </div>
              <div className="text-3xl font-bold text-foreground">
                {Math.round(result.ersparnis * 0.06).toLocaleString("de-DE")} €
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                grobe Faustregel 6 % p.a. Zinsen auf Steuer-Stundung
              </div>
            </div>
          </div>

          {/* Steuer Vergleich */}
          <div className="rounded-2xl border border-border bg-card p-5 mb-6">
            <h3 className="font-bold text-sm mb-3">Steuer-Vergleich</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                  Ohne IAB
                </div>
                <div className="text-xl font-bold text-foreground">
                  {Math.round(result.steuerOhneIab).toLocaleString("de-DE")} €
                </div>
                <div className="text-[10px] text-muted-foreground">Steuer auf {gewinnVorIab.toLocaleString("de-DE")} €</div>
              </div>
              <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
                <div className="text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold mb-1">
                  Mit IAB
                </div>
                <div className="text-xl font-bold text-foreground">
                  {Math.round(result.steuerMitIab).toLocaleString("de-DE")} €
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Steuer auf {(gewinnVorIab - iabHoehe).toLocaleString("de-DE")} €
                </div>
              </div>
            </div>
          </div>

          {/* Auflösungs-Plan */}
          <div className="rounded-2xl border border-border bg-card p-5 mb-6">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-accent-blue" />
              Auflösungs-Plan (Hinzurechnung bei Investition)
            </h3>
            <div className="space-y-2">
              {[
                { jahr: "Jahr 1", inv: invJahr1, aufl: aufloesung.j1 },
                { jahr: "Jahr 2", inv: invJahr2, aufl: aufloesung.j2 },
                { jahr: "Jahr 3", inv: invJahr3, aufl: aufloesung.j3 },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-3 gap-3 items-center text-xs rounded-lg bg-secondary/30 p-3">
                  <div className="font-semibold text-foreground">{row.jahr}</div>
                  <div className="text-muted-foreground">
                    Investition: <strong className="text-foreground">{row.inv.toLocaleString("de-DE")} €</strong>
                  </div>
                  <div className="text-right">
                    Hinzurechnung: <strong className="text-amber-700 dark:text-amber-400">+{Math.round(row.aufl).toLocaleString("de-DE")} €</strong>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-[11px] text-muted-foreground leading-relaxed">
              Bei tatsächlicher Investition wird der gebildete IAB-Anteil dem Gewinn HINZUGERECHNET (=
              versteuert). Gleichzeitig kann die AK/HK des WG um den Hinzurechnungs-Betrag GEMINDERT
              werden — die AfA-Basis wird halbiert. Effekt: Steuer-Stundung, kein dauerhafter
              Vorteil.
            </div>
          </div>
        </>
      )}

      {/* Fall-Stricke */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 mb-6">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-sm text-foreground mb-2">Stolperfallen + Pflichten</div>
            <ul className="list-disc pl-4 space-y-1 text-xs text-muted-foreground">
              <li>
                <strong>Frist 3 Wirtschaftsjahre:</strong> wenn Investition NICHT erfolgt → IAB wird
                rückwirkend im Jahr der Bildung aufgelöst + Steuer + Verzinsung 6 % p.a. (§233a AO).
              </li>
              <li>
                <strong>Nur bewegliche, abnutzbare WG:</strong> kein Grundstück, keine Software die nicht
                Stand-alone-WG ist (Cloud-Lizenzen typisch nicht). Computer, Maschinen, Fahrzeuge: ja.
              </li>
              <li>
                <strong>Mindestnutzung:</strong> WG muss im Jahr der Anschaffung + im Folgejahr zu mind. 90 %
                betrieblich genutzt werden (Privat-Nutzung &lt; 10 %).
              </li>
              <li>
                <strong>Sonderabschreibung §7g(5) zusätzlich:</strong> 20 % Sofort-AfA + lineare AfA
                kombinierbar — das ist eigene Abschreibung, NICHT der IAB.
              </li>
              <li>
                <strong>Anhang im Steuer-Return:</strong> §7g-Erklärung mit Liste der geplanten WG +
                Verwendungszweck einreichen.
              </li>
              <li>
                <strong>Optimal: Gewinn senken auf Spitzensteuersatz-Schwelle</strong> (Einzel) — wenn ZvE
                durch IAB unter 68.480 € fällt: gewinnst zusätzliche Progressions-Stufe.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Kombination Hinweis */}
      <div className="rounded-2xl border border-accent-blue/20 bg-accent-blue/5 p-5">
        <h3 className="font-bold text-sm mb-2 text-accent-blue flex items-center gap-2">
          <Info className="h-4 w-4" /> Kombiniere mit weiteren Hebeln
        </h3>
        <ul className="space-y-1.5 text-xs text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-accent-blue font-semibold shrink-0">→</span>
            <span>
              <strong className="text-foreground">Pre-Year-End-Check:</strong> IAB ist 1 von 7 Hebeln
              kurz vor 31.12. Vergleiche alle Hebel im{" "}
              <a href="/cockpit/pre-year-end" className="text-accent-blue underline">
                Pre-Year-End-Check
              </a>
              .
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent-blue font-semibold shrink-0">→</span>
            <span>
              <strong className="text-foreground">Sonderabschreibung:</strong> §7g(5) erlaubt zusätzlich
              20 % Sonder-AfA neben dem IAB im Jahr der Anschaffung — kombinierbar.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent-blue font-semibold shrink-0">→</span>
            <span>
              <strong className="text-foreground">GWG (§6 Abs. 2 EStG):</strong> Wirtschaftsgüter bis
              800 € (netto) sofort abschreiben — kein IAB nötig.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent-blue font-semibold shrink-0">→</span>
            <span>
              <strong className="text-foreground">Sammelposten 250-1.000 €:</strong> Wahlrecht für
              Sammel-AfA über 5 Jahre — Alternative zur 7g-Sonderabschreibung.
            </span>
          </li>
        </ul>
      </div>

      <Stand2026Footer
        sources={[
          { label: "§7g EStG (IAB)", url: "https://www.gesetze-im-internet.de/estg/__7g.html" },
          { label: "§32a EStG (Tarif)", url: "https://www.gesetze-im-internet.de/estg/__32a.html" },
          { label: "§233a AO (Verzinsung)", url: "https://www.gesetze-im-internet.de/ao_1977/__233a.html" },
        ]}
        note="Liquiditäts-Vorteil-Schätzung 6 % p.a. ist grobe Faustregel — echter Zins-Effekt hängt von individueller Kapitalverfügbarkeit ab."
      />
    </CockpitShell>
  );
};

export default IabRechner;
