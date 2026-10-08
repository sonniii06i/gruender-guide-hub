import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { eur } from "@/components/cockpit/AmpelCheck";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EINSTIEGSGELD, REGELBEDARF_2026, rechneEinstiegsgeld, type EinstiegsgeldEingabe } from "@/lib/foerderRechner";

const EinstiegsgeldRechner = () => {
  const [e, setE] = useState<EinstiegsgeldEingabe>({ stufe: 1, weiterePersonen: 0, monateArbeitslos: 6, vermittlungshemmnisse: false, monate: 12 });
  const r = useMemo(() => rechneEinstiegsgeld(e), [e]);
  const set = <K extends keyof EinstiegsgeldEingabe>(k: K, v: EinstiegsgeldEingabe[K]) => setE((x) => ({ ...x, [k]: v }));

  return (
    <CockpitShell
      eyebrow="Einstiegsgeld · § 16b SGB II · Regelbedarfe 2026"
      title="Einstiegsgeld-Rechner: Gründen aus dem Grundsicherungsgeld"
      subtitle="Wer Grundsicherungsgeld (bis 30.06.2026: Bürgergeld) bezieht und sich hauptberuflich selbstständig macht, kann bis zu 24 Monate Einstiegsgeld zusätzlich bekommen – plus bis zu 5.000 € für Ausstattung. Rechne deinen Höchstbetrag aus."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-8">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <h2 className="font-bold">Deine Situation</h2>
          <div>
            <Label className="text-xs">Deine Regelbedarfsstufe</Label>
            <select
              value={e.stufe}
              onChange={(ev) => set("stufe", Number(ev.target.value) as EinstiegsgeldEingabe["stufe"])}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value={1}>Stufe 1 – alleinstehend / alleinerziehend ({eur(REGELBEDARF_2026[1])})</option>
              <option value={2}>Stufe 2 – Partner in Paar-Bedarfsgemeinschaft ({eur(REGELBEDARF_2026[2])})</option>
              <option value={3}>Stufe 3 – Erwachsene unter 25 im Elternhaushalt ({eur(REGELBEDARF_2026[3])})</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Weitere Personen in der Bedarfsgemeinschaft</Label>
              <Input type="number" min={0} value={e.weiterePersonen} onChange={(ev) => set("weiterePersonen", Number(ev.target.value) || 0)} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">Monate arbeitslos vor der Gründung</Label>
              <Input type="number" min={0} value={e.monateArbeitslos} onChange={(ev) => set("monateArbeitslos", Number(ev.target.value) || 0)} className="mt-1" />
            </div>
          </div>
          <label className="flex items-start gap-2 text-sm cursor-pointer">
            <input type="checkbox" className="mt-1" checked={e.vermittlungshemmnisse} onChange={(ev) => set("vermittlungshemmnisse", ev.target.checked)} />
            <span>
              Vermittlungshemmnisse in meiner Person (z. B. gesundheitlich, fehlender Abschluss)
              <span className="block text-[11px] text-muted-foreground">Dann gibt es den Langzeit-Zuschlag schon ab 6 statt 24 Monaten Arbeitslosigkeit.</span>
            </span>
          </label>
          <div>
            <Label className="text-xs">Förderdauer in Monaten (höchstens {EINSTIEGSGELD.maxMonate})</Label>
            <Input type="number" min={1} max={24} value={e.monate} onChange={(ev) => set("monate", Number(ev.target.value) || 0)} className="mt-1 max-w-[160px]" />
          </div>
        </div>

        <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 self-start lg:sticky lg:top-4">
          <h2 className="font-bold mb-3">Höchstbetrag Einstiegsgeld</h2>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between"><span>Grundbetrag (50 % Regelbedarf)</span><strong>{eur(r.grund, 2)}</strong></div>
            <div className="flex justify-between"><span>Zuschlag Langzeitarbeitslosigkeit (20 %)</span><strong>{eur(r.zuschlagLangzeit, 2)}</strong></div>
            <div className="flex justify-between"><span>Zuschlag Bedarfsgemeinschaft (je 10 %)</span><strong>{eur(r.zuschlagPersonen, 2)}</strong></div>
            <div className="flex justify-between border-t border-border pt-1.5 text-base">
              <span className="font-semibold">pro Monat</span><strong>{eur(r.monatlich, 2)}</strong>
            </div>
            {r.gedeckelt && <div className="text-[11px] text-amber-700">Gedeckelt auf 100 % des Regelbedarfs Stufe 1 ({eur(REGELBEDARF_2026[1])}).</div>}
            <div className="flex justify-between text-base">
              <span className="font-semibold">× {r.monate} Monate</span><strong>{eur(r.gesamt, 2)}</strong>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground mt-3">
            Zusätzlich zum Grundsicherungsgeld und nicht darauf angerechnet. Das Jobcenter entscheidet nach Ermessen – das sind
            Höchstbeträge. Für besonders zu fördernde Gruppen ist pauschal bis {eur(r.pauschalMax, 2)} möglich.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-bold mb-2">Bis zu 5.000 € für Ausstattung (§ 16c)</h2>
          <p className="text-sm text-muted-foreground">
            Für notwendige Sachgüter – Laptop, Werkzeug, Maschinen – gibt es Zuschüsse bis 5.000 € und Darlehen ohne festen
            Höchstbetrag. Voraussetzung: hauptberufliche, wirtschaftlich tragfähige Selbstständigkeit. Das Jobcenter soll dafür
            eine Stellungnahme einer fachkundigen Stelle verlangen.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-bold mb-2">Was du dem Jobcenter vorlegst</h2>
          <ul className="list-disc pl-4 space-y-1 text-sm text-muted-foreground">
            <li>Businessplan – <Link to="/businessplan-erstellen" className="text-accent-blue hover:underline">Businessplan-Generator</Link></li>
            <li>Kapitalbedarfs- und Finanzierungsplan</li>
            <li>Umsatz- und Rentabilitätsvorschau über 3 Jahre – <Link to="/cockpit/gruendungsunterlagen" className="text-accent-blue hover:underline">Unterlagen-Generator</Link></li>
            <li>ggf. Stellungnahme einer fachkundigen Stelle (IHK, HWK, Gründungsberatung)</li>
            <li>mindestens 15 Wochenstunden Selbstständigkeit</li>
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <strong>Stand 07.10.2026:</strong> § 16b, § 16c SGB II, Einstiegsgeld-Verordnung §§ 1, 2, Regelbedarfe 2026 nach RBSFV
        2026 (unverändert gegenüber 2025). Seit 01.07.2026 heißt das Bürgergeld Grundsicherungsgeld; am Einstiegsgeld ändert
        das nichts. Beziehst du Arbeitslosengeld I, ist der{" "}
        <Link to="/cockpit/gruendungszuschuss" className="text-accent-blue hover:underline">Gründungszuschuss</Link> der richtige
        Weg.{" "}
        <a href="https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld/arbeit-finden/einstiegsgeld-fuer-selbststaendigkeit" target="_blank" rel="noreferrer noopener" className="text-accent-blue hover:underline inline-flex items-center gap-0.5">
          Arbeitsagentur <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </CockpitShell>
  );
};

export default EinstiegsgeldRechner;
