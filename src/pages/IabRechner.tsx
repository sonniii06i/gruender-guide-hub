import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { HebesatzPicker } from "@/components/ui/hebesatz-picker";
import { Callout, EmptyState, Field, KitTable, ResultPanel, ToolLayout, ToolSection, selectCls } from "@/components/cockpit/kit";
import { Calculator, ArrowRight, CalendarRange, Layers } from "lucide-react";
import {
  progressionESt,
  grenzSteuerSatz,
  kstGewstRate,
  IAB_QUOTE,
  IAB_MAX,
  SOLZ_RATE as SOLZ,
  solZ,
} from "@/lib/germanTax";

type Rechtsform = "einzel" | "freiberuf" | "ug" | "gmbh";

const IAB_FRIST_JAHRE = 3; // Investition muss innerhalb 3 Wj erfolgen
const GEWST_MESSZAHL = 0.035; // §11 GewStG

const IabRechner = () => {
  const [rechtsform, setRechtsform] = useState<Rechtsform>("gmbh");
  const [gewinnVorIab, setGewinnVorIab] = useState(150000);
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
  // Einheitliche Gewinngrenze seit JStG 2020 (21.12.2020): Gewinn vor IAB ≤ 200.000 € für
  // ALLE Rechtsformen (auch GmbH/UG). Das frühere Bilanzsumme-/Betriebsvermögen-Kriterium
  // (235.000 €) für Bilanzierer wurde ersatzlos gestrichen (anwendbar ab WJ-Ende nach 31.12.2019).
  const eligibility = useMemo(() => {
    return {
      ok: gewinnVorIab <= 200000,
      rule: "Alle Rechtsformen: Gewinn vor IAB max. 200.000 € (einheitlich seit JStG 2020)",
      actual: `${gewinnVorIab.toLocaleString("de-DE")} €`,
      threshold: "200.000 €",
    };
  }, [gewinnVorIab]);

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
      // Andere Einkünfte (Lohn, V+V) ERHÖHEN das zvE und damit den Grenzsteuersatz
      const zvE = Math.max(0, gewinnVorIab + estVorIab);
      const zvENachIab = Math.max(0, zvE - iabHoehe);

      // ESt + SolZ über Progression
      const estOhne = progressionESt(zvE);
      const estMit = progressionESt(zvENachIab);
      // SolZ mit Freigrenze und Milderungszone (§3 Abs. 3, §4 SolzG)
      const solzOhne = solZ(estOhne);
      const solzMit = solZ(estMit);

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

  const istPerson = rechtsform === "einzel" || rechtsform === "freiberuf";

  return (
    <CockpitShell
      eyebrow="IAB-Rechner"
      title="Investitionsabzugsbetrag §7g EStG"
      subtitle="50 % der geplanten Investitionen (max. 200.000 €) im laufenden Jahr abziehen, sofort steuerwirksam. Auflösung in den 3 Folgejahren bei tatsächlicher Anschaffung."
    >
      {/* Vorab-Erklärung */}
      <Callout tone="accent" title="So funktioniert der IAB (§7g EStG)" className="mb-6 p-5">
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>
            Du planst Investitionen (bewegliche, abnutzbare WG) für die nächsten 3 Wirtschaftsjahre
            (z.B. Maschinen, Computer, Fahrzeug, Ausstattung).
          </li>
          <li>
            Du ziehst <strong>50 %</strong> dieser geplanten Investitionen schon JETZT als
            Betriebsausgabe ab, bevor das WG überhaupt da ist.
          </li>
          <li>Maximum: 200.000 € IAB pro Betrieb (kumuliert über alle Jahre).</li>
          <li>
            Bei tatsächlicher Investition wird der IAB <strong>aufgelöst</strong> (= dem Gewinn
            hinzugerechnet); im Gegenzug dürfen die Anschaffungskosten um bis zu 50 % gemindert werden (§7g Abs. 2 EStG). Zusätzlich ist die Sonder-AfA §7g Abs. 5 (bis 40 %) möglich.
          </li>
          <li>
            Wenn nicht in 3 Wirtschaftsjahren investiert: rückwirkende Auflösung im Jahr der
            Bildung + Nachzahlungszinsen 0,15 % pro Monat (1,8 % p.a., §233a i. V. m. §238 Abs. 1 AO).
          </li>
        </ul>
      </Callout>

      <ToolLayout
        className="mb-8"
        inputs={
          <>
            <ToolSection title="Deine Daten" icon={Calculator}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Rechtsform" htmlFor="iab-rf">
                  <select
                    id="iab-rf"
                    value={rechtsform}
                    onChange={(e) => setRechtsform(e.target.value as Rechtsform)}
                    className={selectCls}
                  >
                    <option value="einzel">Einzelunternehmen / e.K.</option>
                    <option value="freiberuf">Freiberufler</option>
                    <option value="ug">UG (haftungsbeschränkt)</option>
                    <option value="gmbh">GmbH</option>
                  </select>
                </Field>
                <Field label="Gewinn vor IAB (€)" hint="Steuerlicher Gewinn für das aktuelle Wirtschaftsjahr" htmlFor="iab-gewinn">
                  <Input
                    id="iab-gewinn"
                    type="number"
                    value={gewinnVorIab}
                    onChange={(e) => setGewinnVorIab(Math.max(0, Number(e.target.value) || 0))}
                    className="tabular"
                  />
                </Field>

                {istPerson && (
                  <Field
                    className="sm:col-span-2"
                    label="Andere Einkünfte (€), zusätzlich zum Gewinn"
                    hint="z. B. Lohn, V+V. Erhöht das ZvE und damit deinen Grenzsteuersatz."
                    htmlFor="iab-andere"
                  >
                    <Input
                      id="iab-andere"
                      type="number"
                      value={estVorIab}
                      onChange={(e) => setEstVorIab(Math.max(0, Number(e.target.value) || 0))}
                      className="tabular"
                    />
                  </Field>
                )}

                {rechtsform !== "freiberuf" && (
                  <Field label="GewSt-Hebesatz der Gemeinde (%)">
                    <HebesatzPicker value={hebesatz} onChange={setHebesatz} />
                  </Field>
                )}
                {rechtsform === "einzel" && (
                  <div className="flex items-end">
                    <label
                      className={`flex w-full cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
                        istFreiberuflerOhneGewSt ? "border-accent-blue/40 bg-accent" : "border-border bg-card hover:border-foreground/25"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={istFreiberuflerOhneGewSt}
                        onChange={(e) => setIstFreiberuflerOhneGewSt(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
                      />
                      <span className="min-w-0">
                        <span className="block text-sm font-medium">Freiberuflich (keine GewSt)</span>
                        <span className="block text-xs text-muted-foreground">Sonst gewerblich</span>
                      </span>
                    </label>
                  </div>
                )}
              </div>
            </ToolSection>

            <ToolSection title="Geplante Investitionen" description="3-Jahres-Fenster nach §7g EStG" icon={CalendarRange}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { l: "Jahr 1 (€)", v: invJahr1, set: setInvJahr1 },
                  { l: "Jahr 2 (€)", v: invJahr2, set: setInvJahr2 },
                  { l: "Jahr 3 (€)", v: invJahr3, set: setInvJahr3 },
                ].map((f, i) => (
                  <Field key={f.l} label={f.l} htmlFor={`iab-inv-${i + 1}`}>
                    <Input
                      id={`iab-inv-${i + 1}`}
                      type="number"
                      value={f.v}
                      onChange={(e) => f.set(Math.max(0, Number(e.target.value) || 0))}
                      className="tabular"
                    />
                  </Field>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap justify-between gap-x-6 gap-y-1 rounded-xl bg-secondary/60 px-4 py-3 text-sm">
                <span className="text-muted-foreground">
                  Total geplant: <span className="font-semibold text-foreground tabular">{totalInvestition.toLocaleString("de-DE")} €</span>
                </span>
                <span className="text-muted-foreground">
                  Max. IAB (50 %):{" "}
                  <span className="font-semibold text-foreground tabular">
                    {Math.min(totalInvestition * 0.5, IAB_MAX).toLocaleString("de-DE")} €
                  </span>
                </span>
              </div>
            </ToolSection>
          </>
        }
        result={
          <>
            {/* Voraussetzungs-Check */}
            <Callout
              tone={eligibility.ok ? "success" : "danger"}
              title={eligibility.ok ? "Voraussetzungen erfüllt: IAB möglich" : "Voraussetzungen NICHT erfüllt: IAB gesperrt"}
            >
              <p>{eligibility.rule}</p>
              <p className="mt-1 tabular">
                Dein Wert: <span className="font-semibold text-foreground">{eligibility.actual}</span> · Schwelle:{" "}
                <span className="font-semibold text-foreground">{eligibility.threshold}</span>
              </p>
            </Callout>

            {iabHoehe > 0 ? (
              <ResultPanel
                variant="ink"
                kicker="Steuer-Ersparnis (sofort)"
                title={`IAB von ${Math.round(iabHoehe).toLocaleString("de-DE")} € im aktuellen Jahr`}
                value={`${Math.round(result.ersparnis).toLocaleString("de-DE")} €`}
                valueHint={`~${result.effektivProzent.toFixed(1)} % effektiv · ${istPerson ? "ESt-Grenz" : "KSt+GewSt+SolZ"}`}
              >
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10">
                  {[
                    { l: "IAB-Höhe (50 %)", v: `${Math.round(iabHoehe).toLocaleString("de-DE")} €`, h: "als BA abgezogen" },
                    { l: "Liquiditäts-Vorteil", v: `${Math.round(result.ersparnis * 0.06).toLocaleString("de-DE")} €`, h: "Faustregel 6 % p.a." },
                    { l: "Steuer ohne IAB", v: `${Math.round(result.steuerOhneIab).toLocaleString("de-DE")} €`, h: `auf ${gewinnVorIab.toLocaleString("de-DE")} €` },
                    { l: "Steuer mit IAB", v: `${Math.round(result.steuerMitIab).toLocaleString("de-DE")} €`, h: `auf ${(gewinnVorIab - iabHoehe).toLocaleString("de-DE")} €` },
                  ].map((k) => (
                    <div key={k.l} className="bg-white/[0.04] p-3">
                      <div className="text-xs text-primary-foreground/65">{k.l}</div>
                      <div className="mt-0.5 font-semibold text-primary-foreground tabular">{k.v}</div>
                      <div className="text-xs text-primary-foreground/55 tabular">{k.h}</div>
                    </div>
                  ))}
                </div>
              </ResultPanel>
            ) : (
              <EmptyState
                icon={Calculator}
                title="Noch kein IAB berechenbar"
                description={
                  eligibility.ok
                    ? "Trag geplante Investitionen und einen Gewinn über 0 € ein, dann siehst du hier die Steuer-Ersparnis."
                    : "Mit einem Gewinn über 200.000 € ist der IAB gesperrt. Prüfe stattdessen die Sonderabschreibung oder andere Hebel unten."
                }
                className="py-10"
              />
            )}
          </>
        }
      />

      {/* Auflösungs-Plan */}
      {iabHoehe > 0 && (
        <ToolSection
          title="Auflösungs-Plan (Hinzurechnung bei Investition)"
          icon={ArrowRight}
          className="mb-6"
        >
          <KitTable caption="Auflösungs-Plan je Jahr">
            <thead>
              <tr>
                <th>Jahr</th>
                <th className="!text-right">Investition</th>
                <th className="!text-right">Hinzurechnung</th>
              </tr>
            </thead>
            <tbody>
              {[
                { jahr: "Jahr 1", inv: invJahr1, aufl: aufloesung.j1 },
                { jahr: "Jahr 2", inv: invJahr2, aufl: aufloesung.j2 },
                { jahr: "Jahr 3", inv: invJahr3, aufl: aufloesung.j3 },
              ].map((row) => (
                <tr key={row.jahr}>
                  <td className="font-medium">{row.jahr}</td>
                  <td className="text-right">{row.inv.toLocaleString("de-DE")} €</td>
                  <td className="text-right font-medium text-warning">+{Math.round(row.aufl).toLocaleString("de-DE")} €</td>
                </tr>
              ))}
            </tbody>
          </KitTable>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Bei tatsächlicher Investition wird der gebildete IAB-Anteil dem Gewinn HINZUGERECHNET (=
            versteuert). Gleichzeitig kann die AK/HK des WG um den Hinzurechnungs-Betrag GEMINDERT
            werden, die AfA-Basis wird halbiert. Effekt: Steuer-Stundung, kein dauerhafter Vorteil.
          </p>
        </ToolSection>
      )}

      {/* Fall-Stricke */}
      <Callout tone="warning" title="Stolperfallen und Pflichten" className="mb-6 p-5">
        <ul className="mt-1 list-disc space-y-1.5 pl-4">
          <li>
            <strong>Frist 3 Wirtschaftsjahre:</strong> wenn Investition NICHT erfolgt → IAB wird
            rückwirkend im Jahr der Bildung aufgelöst + Steuer + Nachzahlungszinsen 0,15 % pro Monat = 1,8 % p.a. (§233a i. V. m. §238 Abs. 1 AO, seit 2019).
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
            <strong>Sonderabschreibung §7g(5) zusätzlich:</strong> bis 40 % Sonder-AfA (frei auf Anschaffungsjahr + 4 Folgejahre verteilbar) + lineare AfA
            kombinierbar. Das ist eine eigene Abschreibung, NICHT der IAB.
          </li>
          <li>
            <strong>Anhang im Steuer-Return:</strong> §7g-Erklärung mit Liste der geplanten WG +
            Verwendungszweck einreichen.
          </li>
          <li>
            <strong>Optimal: Gewinn senken auf Spitzensteuersatz-Schwelle</strong> (Einzel): wenn ZvE
            durch IAB unter 69.879 € fällt, gewinnst du eine zusätzliche Progressions-Stufe.
          </li>
        </ul>
      </Callout>

      {/* Kombination Hinweis */}
      <ToolSection title="Kombiniere mit weiteren Hebeln" icon={Layers} className="mb-6">
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {[
            {
              t: "Pre-Year-End-Check",
              d: (
                <>
                  IAB ist 1 von 7 Hebeln kurz vor 31.12. Vergleiche alle Hebel im{" "}
                  <a href="/cockpit/pre-year-end" className="font-medium text-accent-blue underline underline-offset-4">
                    Pre-Year-End-Check
                  </a>
                  .
                </>
              ),
            },
            {
              t: "Sonderabschreibung",
              d: "§7g(5) erlaubt zusätzlich bis 40 % Sonder-AfA neben dem IAB (frei auf Anschaffungsjahr + 4 Folgejahre verteilbar), kombinierbar.",
            },
            { t: "GWG (§6 Abs. 2 EStG)", d: "Wirtschaftsgüter bis 800 € (netto) sofort abschreiben, kein IAB nötig." },
            {
              t: "Sammelposten 250-1.000 €",
              d: "Wahlrecht für Sammel-AfA über 5 Jahre, Alternative zur 7g-Sonderabschreibung.",
            },
          ].map((h) => (
            <li key={h.t} className="rounded-xl border border-border bg-card p-4 text-sm">
              <p className="font-semibold">{h.t}</p>
              <p className="mt-1 leading-relaxed text-muted-foreground">{h.d}</p>
            </li>
          ))}
        </ul>
      </ToolSection>

      <Stand2026Footer
        sources={[
          { label: "§7g EStG (IAB)", url: "https://www.gesetze-im-internet.de/estg/__7g.html" },
          { label: "§32a EStG (Tarif)", url: "https://www.gesetze-im-internet.de/estg/__32a.html" },
          { label: "§233a AO (Verzinsung)", url: "https://www.gesetze-im-internet.de/ao_1977/__233a.html" },
        ]}
        note="Liquiditäts-Vorteil-Schätzung 6 % p.a. ist grobe Faustregel; der echte Zins-Effekt hängt von individueller Kapitalverfügbarkeit ab."
      />
    </CockpitShell>
  );
};

export default IabRechner;
