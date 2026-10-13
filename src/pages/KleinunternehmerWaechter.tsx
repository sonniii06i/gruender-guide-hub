import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Field, ToolLayout, ToolSection, ResultPanel, StatGrid, StatTile, Callout, selectCls, type Tone } from "@/components/cockpit/kit";
import { CalendarCheck, Scale, Wallet } from "lucide-react";
import { KU_LAUFEND, KU_VORJAHR, pruefeKleinunternehmer, type KuEingabe } from "@/lib/kleinunternehmer";

const SPEICHER = "gx-ku-waechter-v1";
const MONATE = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
const STANDARD: KuEingabe = { gruendungsjahr: false, vorjahr: 0, monate: Array(12).fill(0), bisMonat: new Date().getMonth() + 1 };
const lade = (): KuEingabe => {
  try {
    const r = localStorage.getItem(SPEICHER);
    return r ? { ...STANDARD, ...JSON.parse(r), bisMonat: new Date().getMonth() + 1 } : STANDARD;
  } catch {
    return STANDARD;
  }
};
const eur = (n: number) => n.toLocaleString("de-DE", { maximumFractionDigits: 0 }) + " €";

const TON: Record<string, Tone> = { ku: "success", warnung: "warning", ueberschritten: "danger", "kein-ku": "danger" };
const BALKEN: Record<string, string> = { ku: "bg-success", warnung: "bg-warning", ueberschritten: "bg-danger", "kein-ku": "bg-danger" };
const TITEL = { ku: "Kleinunternehmer: alles im grünen Bereich", warnung: "Achtung: Grenze rückt näher", ueberschritten: "Grenze überschritten", "kein-ku": "Dieses Jahr kein Kleinunternehmer" };

const KleinunternehmerWaechter = () => {
  const [e, setE] = useState<KuEingabe>(lade);
  useEffect(() => {
    try {
      localStorage.setItem(SPEICHER, JSON.stringify(e));
    } catch {
      /* ohne Speicher */
    }
  }, [e]);
  const r = useMemo(() => pruefeKleinunternehmer(e), [e]);
  let kum = 0;

  return (
    <CockpitShell
      eyebrow="Kleinunternehmerregelung § 19 UStG · seit 2025"
      title="Kleinunternehmer-Wächter"
      subtitle="Trag deine monatlichen Einnahmen ein. Der Wächter zeigt, wie nah du an der 25.000- bzw. 100.000-€-Grenze bist, wann du sie bei gleichem Tempo reißt und ob du nächstes Jahr noch Kleinunternehmer bist."
    >
      <ToolLayout
        inputs={
          <>
            <ToolSection title="Ausgangslage" icon={CalendarCheck}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background/60 p-3.5 text-sm transition-colors hover:border-foreground/20">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]"
                    checked={e.gruendungsjahr}
                    onChange={(ev) => setE((x) => ({ ...x, gruendungsjahr: ev.target.checked }))}
                  />
                  <span>
                    <span className="font-medium">Ich habe dieses Jahr gegründet</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">Dann gilt 25.000 € statt 100.000 €.</span>
                  </span>
                </label>
                {e.gruendungsjahr && (
                  <Field label="Gründungsmonat" htmlFor="ku-gruendung" hint="Für das Folgejahr wird dein Rumpfjahr auf 12 Monate hochgerechnet.">
                    <select
                      id="ku-gruendung"
                      className={selectCls}
                      value={e.gruendungsMonat ?? 1}
                      onChange={(ev) => setE((x) => ({ ...x, gruendungsMonat: Number(ev.target.value) }))}
                    >
                      {["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"].map((m, i) => (
                        <option key={m} value={i + 1}>{m}</option>
                      ))}
                    </select>
                  </Field>
                )}
                {!e.gruendungsjahr && (
                  <Field label="Umsatz im Vorjahr (netto, €)" htmlFor="ku-vorjahr">
                    <Input
                      id="ku-vorjahr"
                      type="number"
                      inputMode="decimal"
                      value={e.vorjahr}
                      onChange={(ev) => setE((x) => ({ ...x, vorjahr: Number(ev.target.value) || 0 }))}
                    />
                  </Field>
                )}
              </div>
            </ToolSection>

            <ToolSection
              title="Umsätze je Monat"
              description="Eingenommene Umsätze netto, ohne Verkauf von Anlagevermögen. Künftige Monate sind ausgegraut."
              icon={Wallet}
            >
              <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6">
                {MONATE.map((m, i) => (
                  <div key={m} className={i >= e.bisMonat ? "opacity-50" : ""}>
                    <label htmlFor={`ku-monat-${i}`} className="mb-1 block text-xs font-medium text-muted-foreground">
                      {m}
                    </label>
                    <Input
                      id={`ku-monat-${i}`}
                      type="number"
                      inputMode="decimal"
                      value={e.monate[i] || ""}
                      placeholder="0"
                      onChange={(ev) => setE((x) => ({ ...x, monate: x.monate.map((v, j) => (j === i ? Number(ev.target.value) || 0 : v)) }))}
                      className="h-9 tabular"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <p className="mb-2 text-sm font-medium">Verlauf kumuliert</p>
                <div className="flex h-36 items-end gap-1 rounded-xl bg-secondary/50 p-3 pb-2">
                  {e.monate.map((v, i) => {
                    kum += i < e.bisMonat ? v : 0;
                    const h = Math.min(100, (kum / r.grenze) * 100);
                    return (
                      <div key={i} className="flex h-full flex-1 flex-col justify-end" title={`${MONATE[i]}: ${eur(kum)}`}>
                        <div
                          className={`rounded-t ${kum > r.grenze ? "bg-danger" : kum > r.grenze * 0.8 ? "bg-warning" : "bg-accent-blue"} ${i >= e.bisMonat ? "opacity-20" : ""}`}
                          style={{ height: `${Math.max(2, h)}%` }}
                        />
                        <div className="mt-1 text-center text-[10px] text-muted-foreground">{MONATE[i]}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ToolSection>
          </>
        }
        result={
          <>
            <ResultPanel
              kicker="Status"
              title={TITEL[r.status]}
              value={eur(r.bisher)}
              valueHint={`von ${eur(r.grenze)} Grenze`}
            >
              <div className="h-2.5 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
                <div className={`h-full rounded-full ${BALKEN[r.status]}`} style={{ width: `${Math.min(100, r.anteil * 100)}%` }} />
              </div>
              <div className="mt-4">
                <StatGrid cols={2}>
                  <StatTile label="Ausgeschöpft" value={`${Math.round(Math.min(100, r.anteil * 100))} %`} tone={TON[r.status]} />
                  <StatTile label="Prognose Jahr" value={eur(r.prognoseJahr)} />
                </StatGrid>
              </div>
              {r.texte.length > 0 && (
                <Callout tone={TON[r.status]} className="mt-4">
                  <ul className="list-disc space-y-1 pl-4">
                    {r.texte.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </Callout>
              )}
            </ResultPanel>

            <ToolSection title="Regeln seit 2025" icon={Scale} bodyClassName="space-y-2.5 text-sm leading-relaxed text-foreground/85">
              <p>
                Kleinunternehmer bist du, wenn der Umsatz im Vorjahr höchstens {eur(KU_VORJAHR)} betrug und im laufenden Jahr{" "}
                {eur(KU_LAUFEND)} nicht übersteigt. Im Gründungsjahr gilt {eur(KU_VORJAHR)}.
              </p>
              <p>Schon der Umsatz, mit dem du die Grenze überschreitest, ist voll steuerpflichtig, nicht erst das nächste Jahr.</p>
              <p>
                Auf jede Rechnung gehört der Hinweis auf die Steuerbefreiung nach § 19 UStG. Rechnungen schreibst du im{" "}
                <Link to="/cockpit/rechnungs-generator" className="font-medium text-accent-blue hover:underline">
                  Rechnungs-Generator
                </Link>
                .
              </p>
              <p className="text-xs text-muted-foreground">Gespeichert nur in diesem Browser. Grundlage: § 19 UStG, BMF-Schreiben vom 18.03.2025.</p>
            </ToolSection>
          </>
        }
      />
    </CockpitShell>
  );
};

export default KleinunternehmerWaechter;
