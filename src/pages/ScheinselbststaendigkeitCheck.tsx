import { useMemo, useState } from "react";
import { Briefcase, ExternalLink, Landmark, ShieldCheck } from "lucide-react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { FrageZeile, eur } from "@/components/cockpit/AmpelCheck";
import { Input } from "@/components/ui/input";
import { Callout, Field, ResultPanel, StatGrid, StatTile, ToneBadge, ToolLayout, ToolSection, type Tone } from "@/components/cockpit/kit";
import { INDIZIEN, RV_2026, bewerteStatus, pruefeRvPflicht, type RvEingabe } from "@/lib/statusCheck";

const DRV_SELBSTCHECK = "https://www.deutsche-rentenversicherung.de/DRV/DE/Rente/Arbeitnehmer-und-Selbststaendige/03_Selbststaendige/selbstcheck-erwerbsstatus";
const DRV_STATUS = "https://www.deutsche-rentenversicherung.de/SharedDocs/Formulare/DE/Formularpakete/01_versicherte/01_vor_der_rente/_DRV_Paket_Versicherung_Statusfeststellung";

const RISIKO: Record<string, { text: string; tone: Tone }> = {
  niedrig: { text: "Geringes Risiko", tone: "success" },
  mittel: { text: "Mittleres Risiko, genauer prüfen", tone: "warning" },
  hoch: { text: "Hohes Risiko der Scheinselbstständigkeit", tone: "danger" },
  offen: { text: "Beantworte noch ein paar Fragen", tone: "neutral" },
};

const ScheinselbststaendigkeitCheck = () => {
  const [antworten, setAntworten] = useState<Record<string, boolean | undefined>>({});
  const [rv, setRv] = useState<RvEingabe>({ anteilHauptkunde: 90, svPflichtigeMitarbeiter: false, minijobSummeMonat: 0, einkommenMonat: 3000, monateSeitStart: 6 });
  const status = useMemo(() => bewerteStatus(antworten), [antworten]);
  const rvErg = useMemo(() => pruefeRvPflicht(rv), [rv]);
  const r = RISIKO[status.risiko];

  return (
    <CockpitShell
      eyebrow="Scheinselbstständigkeit & Rentenversicherung · Stand 2026"
      title="Scheinselbstständigkeits-Check für Freelancer"
      subtitle="Zwei Fragen, die jeder Freelancer mit einem Hauptkunden klären muss: Bin ich in Wahrheit angestellt? Und muss ich als Selbstständiger in die Rentenversicherung? Mit den Kriterien der Deutschen Rentenversicherung."
    >
      <ToolLayout
        className="mb-8"
        inputs={
          <ToolSection
            icon={Briefcase}
            title="1. Wie läuft die Zusammenarbeit tatsächlich?"
            description="Entscheidend ist, wie es gelebt wird, nicht, was im Vertrag steht."
            bodyClassName="py-1 md:py-2"
          >
            <div className="divide-y divide-border">
              {INDIZIEN.map((i) => (
                <FrageZeile key={i.id} frage={i.frage} wert={antworten[i.id] ?? null} setze={(v) => setAntworten((a) => ({ ...a, [i.id]: v }))} />
              ))}
            </div>
          </ToolSection>
        }
        result={
          <>
            <ResultPanel kicker="Einschätzung" title={r.text}>
              <StatGrid cols={2}>
                <StatTile label="Merkmale einer Anstellung" value={`${status.punkteAbhaengig} Punkte`} tone={status.risiko === "hoch" ? "danger" : "neutral"} />
                <StatTile label="Merkmale für Selbstständigkeit" value={`${status.punkteSelbststaendig} Punkte`} tone={status.risiko === "niedrig" ? "success" : "neutral"} />
              </StatGrid>
              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <ToneBadge tone={r.tone}>{status.beantwortet}/{INDIZIEN.length}</ToneBadge> Fragen beantwortet
              </div>
              <Callout tone={r.tone} className="mt-4" icon={status.risiko === "offen" ? false : undefined}>
                {status.risiko === "hoch"
                  ? "Mehrere starke Merkmale einer Anstellung. Für deinen Auftraggeber drohen Nachzahlungen der Sozialversicherung für bis zu 4 Jahre (bei Vorsatz 30), meist ohne Rückgriff auf dich."
                  : status.risiko === "mittel"
                    ? "Einige Merkmale sprechen für eine Anstellung. Ändere, was du ändern kannst (eigene Ausstattung, freie Zeiteinteilung, weitere Kunden), oder lass den Status feststellen."
                    : status.risiko === "niedrig"
                      ? "Die Merkmale sprechen überwiegend für Selbstständigkeit. Prüf trotzdem Punkt 2: Die Rentenversicherungspflicht kann auch echte Selbstständige treffen."
                      : "Die Einschätzung erscheint, sobald die meisten Fragen beantwortet sind."}
              </Callout>
            </ResultPanel>
            <ToolSection icon={ShieldCheck} title="Sicherheit bekommen" bodyClassName="space-y-3 text-sm leading-relaxed text-foreground/85">
              <p>
                <a href={DRV_SELBSTCHECK} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 font-medium text-accent-blue hover:underline">
                  Selbstcheck Erwerbsstatus der DRV <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
                : anonym und unverbindlich (nicht für GmbH-Geschäftsführer).
              </p>
              <p>
                <a href={DRV_STATUS} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 font-medium text-accent-blue hover:underline">
                  Statusfeststellung (Antrag V0027) <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
                : verbindlich durch die Clearingstelle. Stellst du den Antrag innerhalb eines Monats nach Beginn, beginnt eine
                Versicherungspflicht erst mit der Entscheidung (wenn du zustimmst und bis dahin abgesichert warst). Schon vor
                Beginn ist eine Prognoseentscheidung möglich (geltendes Recht bis 30.06.2027; eine Reform ist angekündigt).
              </p>
            </ToolSection>
          </>
        }
      />

      <ToolSection
        className="mb-6"
        icon={Landmark}
        title="2. Rentenversicherungspflicht als Selbstständiger mit einem Hauptkunden"
        description={
          <>
            Auch echte Selbstständige sind rentenversicherungspflichtig, wenn sie dauerhaft im Wesentlichen für einen
            Auftraggeber arbeiten und keine versicherungspflichtigen Mitarbeiter haben (§ 2 Satz 1 Nr. 9 SGB VI). Die DRV
            legt „im Wesentlichen“ als mindestens 5/6 der Betriebseinnahmen aus.
          </>
        }
      >
        <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Anteil Hauptkunde an deinen Einnahmen (%)" htmlFor="rv-anteil">
            <Input id="rv-anteil" type="number" inputMode="numeric" min={0} max={100} value={rv.anteilHauptkunde} onChange={(e) => setRv((x) => ({ ...x, anteilHauptkunde: Number(e.target.value) || 0 }))} />
          </Field>
          <Field label="Gewinn pro Monat (€)" htmlFor="rv-gewinn">
            <Input id="rv-gewinn" type="number" inputMode="numeric" min={0} value={rv.einkommenMonat} onChange={(e) => setRv((x) => ({ ...x, einkommenMonat: Number(e.target.value) || 0 }))} />
          </Field>
          <Field label="Summe Minijob-Löhne pro Monat (€)" htmlFor="rv-minijob">
            <Input id="rv-minijob" type="number" inputMode="numeric" min={0} value={rv.minijobSummeMonat} onChange={(e) => setRv((x) => ({ ...x, minijobSummeMonat: Number(e.target.value) || 0 }))} />
          </Field>
          <Field label="Monate seit Start" htmlFor="rv-monate">
            <Input id="rv-monate" type="number" inputMode="numeric" min={0} value={rv.monateSeitStart} onChange={(e) => setRv((x) => ({ ...x, monateSeitStart: Number(e.target.value) || 0 }))} />
          </Field>
        </div>
        <label className="mt-5 flex cursor-pointer items-start gap-2.5 rounded-xl border border-border bg-background/60 p-3.5 text-sm">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]"
            checked={rv.svPflichtigeMitarbeiter}
            onChange={(e) => setRv((x) => ({ ...x, svPflichtigeMitarbeiter: e.target.checked }))}
          />
          Ich beschäftige mindestens einen sozialversicherungspflichtigen Mitarbeiter (auch Azubi)
        </label>

        <Callout
          className="mt-5"
          tone={rvErg.pflichtig ? "danger" : "success"}
          title={rvErg.pflichtig ? "Voraussichtlich rentenversicherungspflichtig" : "Voraussichtlich keine Pflicht nach § 2 Nr. 9"}
        >
          <ul className="list-disc space-y-1 pl-5">
            {rvErg.gruende.map((g) => <li key={g}>{g}</li>)}
          </ul>
          {rvErg.pflichtig && (
            <div className="mt-4 space-y-3">
              <StatGrid cols={4}>
                <StatTile label="Beitrag nach Einkommen" value={eur(rvErg.beitragGeschaetzt, 2)} hint={`pro Monat, ${RV_2026.beitragssatz} %`} tone="danger" emphasis />
                <StatTile label="Regelbeitrag" value={eur(RV_2026.regelbeitrag, 2)} hint="pauschal" />
                <StatTile label="Halber Regelbeitrag" value={eur(RV_2026.halberRegelbeitrag, 2)} hint="erste drei Jahre" />
                <StatTile label="Mindestbeitrag" value={eur(RV_2026.mindestbeitrag, 2)} />
              </StatGrid>
              {rvErg.befreiungMoeglich && (
                <p className="font-medium text-success">
                  Befreiung möglich: Existenzgründer können sich für 3 Jahre nach Aufnahme befreien lassen (§ 6 Abs. 1a SGB VI). Antrag
                  innerhalb von 3 Monaten stellen, dann wirkt sie von Anfang an.
                </p>
              )}
              <p>Melden musst du dich selbst innerhalb von 3 Monaten nach Beginn bei der DRV.</p>
            </div>
          )}
        </Callout>
      </ToolSection>

      <Callout tone="warning" title="Stand 08.10.2026">
        § 7, § 7a SGB IV, § 2, § 6 SGB VI, Beitragswerte 2026 laut DRV (V0091). Für Lehrkräfte gilt eine Übergangsregel bis
        31.12.2027 (§ 127 SGB IV). Der Check ist eine Risikoeinschätzung; verbindlich entscheidet nur die Deutsche
        Rentenversicherung.
      </Callout>
    </CockpitShell>
  );
};

export default ScheinselbststaendigkeitCheck;
