import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Check, ClipboardList, ExternalLink, Laptop, UserRound } from "lucide-react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { eur } from "@/components/cockpit/AmpelCheck";
import { Input } from "@/components/ui/input";
import { Callout, Field, ResultPanel, ResultRow, ToolLayout, ToolSection, selectCls } from "@/components/cockpit/kit";
import { EINSTIEGSGELD, REGELBEDARF_2026, rechneEinstiegsgeld, type EinstiegsgeldEingabe } from "@/lib/foerderRechner";

/** ResultRow-Label in der dunklen Ergebnis-Karte (ResultRow färbt Labels sonst dunkel). */
const InkLabel = ({ children }: { children: React.ReactNode }) => <span className="text-primary-foreground/80">{children}</span>;

const EinstiegsgeldRechner = () => {
  const [e, setE] = useState<EinstiegsgeldEingabe>({ stufe: 1, weiterePersonen: 0, monateArbeitslos: 6, vermittlungshemmnisse: false, monate: 12 });
  const r = useMemo(() => rechneEinstiegsgeld(e), [e]);
  const set = <K extends keyof EinstiegsgeldEingabe>(k: K, v: EinstiegsgeldEingabe[K]) => setE((x) => ({ ...x, [k]: v }));

  return (
    <CockpitShell
      eyebrow="Einstiegsgeld · § 16b SGB II · Regelbedarfe 2026"
      title="Einstiegsgeld-Rechner: Gründen aus dem Grundsicherungsgeld"
      subtitle="Wer Grundsicherungsgeld (bis 30.06.2026: Bürgergeld) bezieht und sich hauptberuflich selbstständig macht, kann bis zu 24 Monate Einstiegsgeld zusätzlich bekommen, dazu bis zu 5.000 € für Ausstattung. Rechne deinen Höchstbetrag aus."
    >
      <ToolLayout
        className="mb-10"
        inputs={
          <ToolSection title="Deine Situation" icon={UserRound} description="Die Angaben bleiben in deinem Browser.">
            <div className="space-y-5">
              <Field label="Regelbedarfsstufe" htmlFor="eg-stufe">
                <select
                  id="eg-stufe"
                  value={e.stufe}
                  onChange={(ev) => set("stufe", Number(ev.target.value) as EinstiegsgeldEingabe["stufe"])}
                  className={selectCls}
                >
                  <option value={1}>Stufe 1: alleinstehend / alleinerziehend ({eur(REGELBEDARF_2026[1])})</option>
                  <option value={2}>Stufe 2: Partner in Paar-Bedarfsgemeinschaft ({eur(REGELBEDARF_2026[2])})</option>
                  <option value={3}>Stufe 3: Erwachsene unter 25 im Elternhaushalt ({eur(REGELBEDARF_2026[3])})</option>
                </select>
              </Field>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Weitere Personen in der Bedarfsgemeinschaft" htmlFor="eg-personen">
                  <Input id="eg-personen" type="number" inputMode="numeric" min={0} value={e.weiterePersonen} onChange={(ev) => set("weiterePersonen", Number(ev.target.value) || 0)} />
                </Field>
                <Field label="Monate arbeitslos vor der Gründung" htmlFor="eg-monate-al">
                  <Input id="eg-monate-al" type="number" inputMode="numeric" min={0} value={e.monateArbeitslos} onChange={(ev) => set("monateArbeitslos", Number(ev.target.value) || 0)} />
                </Field>
              </div>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background/60 p-3.5 text-sm transition-colors hover:border-foreground/20">
                <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]" checked={e.vermittlungshemmnisse} onChange={(ev) => set("vermittlungshemmnisse", ev.target.checked)} />
                <span>
                  <span className="font-medium">Vermittlungshemmnisse in meiner Person</span> (z. B. gesundheitlich, fehlender Abschluss)
                  <span className="mt-0.5 block text-xs text-muted-foreground">Dann gibt es den Langzeit-Zuschlag schon ab 6 statt 24 Monaten Arbeitslosigkeit.</span>
                </span>
              </label>
              <Field label={`Förderdauer in Monaten (höchstens ${EINSTIEGSGELD.maxMonate})`} htmlFor="eg-dauer">
                <Input id="eg-dauer" type="number" inputMode="numeric" min={1} max={24} value={e.monate} onChange={(ev) => set("monate", Number(ev.target.value) || 0)} className="max-w-[160px]" />
              </Field>
            </div>
          </ToolSection>
        }
        result={
          <ResultPanel
            variant="ink"
            kicker="Höchstbetrag Einstiegsgeld"
            title="pro Monat"
            value={eur(r.monatlich, 2)}
            valueHint={`${eur(r.gesamt, 2)} über ${r.monate} Monate`}
          >
            <div className="divide-y divide-white/10 border-t border-white/10">
              <ResultRow label={<InkLabel>Grundbetrag (50 % Regelbedarf)</InkLabel>} value={eur(r.grund, 2)} />
              <ResultRow label={<InkLabel>Zuschlag Langzeitarbeitslosigkeit (20 %)</InkLabel>} value={eur(r.zuschlagLangzeit, 2)} />
              <ResultRow label={<InkLabel>Zuschlag Bedarfsgemeinschaft (je 10 %)</InkLabel>} value={eur(r.zuschlagPersonen, 2)} />
              <ResultRow label={`× ${r.monate} Monate`} value={eur(r.gesamt, 2)} strong />
            </div>
            {r.gedeckelt && (
              <p className="mt-3 rounded-lg bg-white/10 px-3 py-2 text-xs text-primary-foreground">
                Gedeckelt auf 100 % des Regelbedarfs Stufe 1 ({eur(REGELBEDARF_2026[1])}).
              </p>
            )}
            <p className="mt-4 text-xs leading-relaxed text-primary-foreground/65">
              Zusätzlich zum Grundsicherungsgeld und nicht darauf angerechnet. Das Jobcenter entscheidet nach Ermessen, das sind
              Höchstbeträge. Für besonders zu fördernde Gruppen ist pauschal bis {eur(r.pauschalMax, 2)} möglich.
            </p>
          </ResultPanel>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <ToolSection title="Bis zu 5.000 € für Ausstattung (§ 16c)" icon={Laptop}>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Für notwendige Sachgüter wie Laptop, Werkzeug oder Maschinen gibt es Zuschüsse bis 5.000 € und Darlehen ohne festen
            Höchstbetrag. Voraussetzung: hauptberufliche, wirtschaftlich tragfähige Selbstständigkeit. Das Jobcenter soll dafür
            eine Stellungnahme einer fachkundigen Stelle verlangen.
          </p>
        </ToolSection>
        <ToolSection title="Was du dem Jobcenter vorlegst" icon={ClipboardList}>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              <>Businessplan, mit dem <Link to="/businessplan-erstellen" className="font-medium text-accent-blue hover:underline">Businessplan-Generator</Link></>,
              <>Kapitalbedarfs- und Finanzierungsplan</>,
              <>Umsatz- und Rentabilitätsvorschau über 3 Jahre, mit dem <Link to="/cockpit/gruendungsunterlagen" className="font-medium text-accent-blue hover:underline">Unterlagen-Generator</Link></>,
              <>ggf. Stellungnahme einer fachkundigen Stelle (IHK, HWK, Gründungsberatung)</>,
              <>mindestens 15 Wochenstunden Selbstständigkeit</>,
            ].map((t, i) => (
              <li key={i} className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </ToolSection>
      </div>

      <Callout tone="warning" title="Stand 07.10.2026">
        § 16b, § 16c SGB II, Einstiegsgeld-Verordnung §§ 1, 2, Regelbedarfe 2026 nach RBSFV 2026 (unverändert gegenüber 2025).
        Seit 01.07.2026 heißt das Bürgergeld Grundsicherungsgeld; am Einstiegsgeld ändert das nichts. Beziehst du
        Arbeitslosengeld I, ist der{" "}
        <Link to="/cockpit/gruendungszuschuss" className="font-medium text-accent-blue hover:underline">Gründungszuschuss</Link> der richtige
        Weg.{" "}
        <a href="https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld/arbeit-finden/einstiegsgeld-fuer-selbststaendigkeit" target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-0.5 font-medium text-accent-blue hover:underline">
          Arbeitsagentur <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      </Callout>
    </CockpitShell>
  );
};

export default EinstiegsgeldRechner;
