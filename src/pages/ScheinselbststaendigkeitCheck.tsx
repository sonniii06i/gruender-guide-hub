import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { FrageZeile, eur } from "@/components/cockpit/AmpelCheck";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { INDIZIEN, RV_2026, bewerteStatus, pruefeRvPflicht, type RvEingabe } from "@/lib/statusCheck";

const DRV_SELBSTCHECK = "https://www.deutsche-rentenversicherung.de/DRV/DE/Rente/Arbeitnehmer-und-Selbststaendige/03_Selbststaendige/selbstcheck-erwerbsstatus";
const DRV_STATUS = "https://www.deutsche-rentenversicherung.de/SharedDocs/Formulare/DE/Formularpakete/01_versicherte/01_vor_der_rente/_DRV_Paket_Versicherung_Statusfeststellung";

const RISIKO = {
  niedrig: { text: "Geringes Risiko", farbe: "border-emerald-500/40 bg-emerald-500/5 text-emerald-700" },
  mittel: { text: "Mittleres Risiko – genauer prüfen", farbe: "border-amber-500/40 bg-amber-500/5 text-amber-700" },
  hoch: { text: "Hohes Risiko der Scheinselbstständigkeit", farbe: "border-red-500/40 bg-red-500/5 text-red-700" },
  offen: { text: "Beantworte noch ein paar Fragen", farbe: "border-border bg-secondary/40 text-muted-foreground" },
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
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 mb-8">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-bold mb-1">1. Wie läuft die Zusammenarbeit tatsächlich?</h2>
          <p className="text-xs text-muted-foreground mb-2">Entscheidend ist, wie es gelebt wird – nicht, was im Vertrag steht.</p>
          <div className="divide-y divide-border">
            {INDIZIEN.map((i) => (
              <FrageZeile key={i.id} frage={i.frage} wert={antworten[i.id] ?? null} setze={(v) => setAntworten((a) => ({ ...a, [i.id]: v }))} />
            ))}
          </div>
        </div>
        <div className="space-y-4 lg:sticky lg:top-4 self-start">
          <div className={`rounded-2xl border p-5 ${r.farbe}`}>
            <div className="font-bold">{r.text}</div>
            <div className="text-xs text-foreground mt-2">
              Merkmale einer Anstellung: <strong>{status.punkteAbhaengig}</strong> Punkte · für Selbstständigkeit:{" "}
              <strong>{status.punkteSelbststaendig}</strong> Punkte ({status.beantwortet}/{INDIZIEN.length} beantwortet)
            </div>
            <p className="text-xs text-foreground mt-2">
              {status.risiko === "hoch"
                ? "Mehrere starke Merkmale einer Anstellung. Für deinen Auftraggeber drohen Nachzahlungen der Sozialversicherung für bis zu 4 Jahre (bei Vorsatz 30), meist ohne Rückgriff auf dich."
                : status.risiko === "mittel"
                  ? "Einige Merkmale sprechen für eine Anstellung. Ändere, was du ändern kannst (eigene Ausstattung, freie Zeiteinteilung, weitere Kunden), oder lass den Status feststellen."
                  : status.risiko === "niedrig"
                    ? "Die Merkmale sprechen überwiegend für Selbstständigkeit. Prüf trotzdem Punkt 2 – die Rentenversicherungspflicht kann auch echte Selbstständige treffen."
                    : "Die Einschätzung erscheint, sobald die meisten Fragen beantwortet sind."}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 text-xs space-y-2">
            <div className="font-bold text-sm">Sicherheit bekommen</div>
            <p>
              <a href={DRV_SELBSTCHECK} target="_blank" rel="noreferrer noopener" className="text-accent-blue hover:underline inline-flex items-center gap-1">
                Selbstcheck Erwerbsstatus der DRV <ExternalLink className="h-3 w-3" />
              </a>{" "}
              – anonym und unverbindlich (nicht für GmbH-Geschäftsführer).
            </p>
            <p>
              <a href={DRV_STATUS} target="_blank" rel="noreferrer noopener" className="text-accent-blue hover:underline inline-flex items-center gap-1">
                Statusfeststellung (Antrag V0027) <ExternalLink className="h-3 w-3" />
              </a>{" "}
              – verbindlich durch die Clearingstelle. Stellst du den Antrag innerhalb eines Monats nach Beginn, beginnt eine
              Versicherungspflicht erst mit der Entscheidung (wenn du zustimmst und bis dahin abgesichert warst). Schon vor
              Beginn ist eine Prognoseentscheidung möglich (geltendes Recht bis 30.06.2027; eine Reform ist angekündigt).
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h2 className="font-bold mb-1">2. Rentenversicherungspflicht als Selbstständiger mit einem Hauptkunden</h2>
        <p className="text-xs text-muted-foreground mb-4">
          Auch echte Selbstständige sind rentenversicherungspflichtig, wenn sie dauerhaft im Wesentlichen für einen Auftraggeber
          arbeiten und keine versicherungspflichtigen Mitarbeiter haben (§ 2 Satz 1 Nr. 9 SGB VI). Die DRV legt „im
          Wesentlichen“ als mindestens 5/6 der Betriebseinnahmen aus.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div>
            <Label className="text-xs">Anteil Hauptkunde an deinen Einnahmen (%)</Label>
            <Input type="number" min={0} max={100} value={rv.anteilHauptkunde} onChange={(e) => setRv((x) => ({ ...x, anteilHauptkunde: Number(e.target.value) || 0 }))} className="mt-1" />
          </div>
          <div>
            <Label className="text-xs">Gewinn pro Monat (€)</Label>
            <Input type="number" min={0} value={rv.einkommenMonat} onChange={(e) => setRv((x) => ({ ...x, einkommenMonat: Number(e.target.value) || 0 }))} className="mt-1" />
          </div>
          <div>
            <Label className="text-xs">Summe Minijob-Löhne / Monat (€)</Label>
            <Input type="number" min={0} value={rv.minijobSummeMonat} onChange={(e) => setRv((x) => ({ ...x, minijobSummeMonat: Number(e.target.value) || 0 }))} className="mt-1" />
          </div>
          <div>
            <Label className="text-xs">Monate seit Start</Label>
            <Input type="number" min={0} value={rv.monateSeitStart} onChange={(e) => setRv((x) => ({ ...x, monateSeitStart: Number(e.target.value) || 0 }))} className="mt-1" />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm mb-4 cursor-pointer">
          <input type="checkbox" checked={rv.svPflichtigeMitarbeiter} onChange={(e) => setRv((x) => ({ ...x, svPflichtigeMitarbeiter: e.target.checked }))} />
          Ich beschäftige mindestens einen sozialversicherungspflichtigen Mitarbeiter (auch Azubi)
        </label>
        <div className={`rounded-xl border p-4 text-sm ${rvErg.pflichtig ? "border-red-500/40 bg-red-500/5" : "border-emerald-500/40 bg-emerald-500/5"}`}>
          <div className="font-bold mb-1">{rvErg.pflichtig ? "Voraussichtlich rentenversicherungspflichtig" : "Voraussichtlich keine Pflicht nach § 2 Nr. 9"}</div>
          <ul className="list-disc pl-5 text-xs space-y-1">
            {rvErg.gruende.map((g) => <li key={g}>{g}</li>)}
          </ul>
          {rvErg.pflichtig && (
            <div className="text-xs mt-3 space-y-1">
              <div>
                Beitrag nach Einkommen: ca. <strong>{eur(rvErg.beitragGeschaetzt, 2)}</strong> im Monat ({RV_2026.beitragssatz} %). Pauschal möglich:
                Regelbeitrag {eur(RV_2026.regelbeitrag, 2)}, in den ersten drei Jahren halber Regelbeitrag {eur(RV_2026.halberRegelbeitrag, 2)},
                mindestens {eur(RV_2026.mindestbeitrag, 2)}.
              </div>
              {rvErg.befreiungMoeglich && (
                <div className="text-emerald-800">
                  Befreiung möglich: Existenzgründer können sich für 3 Jahre nach Aufnahme befreien lassen (§ 6 Abs. 1a SGB VI). Antrag
                  innerhalb von 3 Monaten stellen, dann wirkt sie von Anfang an.
                </div>
              )}
              <div>Melden musst du dich selbst innerhalb von 3 Monaten nach Beginn bei der DRV.</div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <strong>Stand 08.10.2026:</strong> § 7, § 7a SGB IV, § 2, § 6 SGB VI, Beitragswerte 2026 laut DRV (V0091). Für Lehrkräfte
        gilt eine Übergangsregel bis 31.12.2027 (§ 127 SGB IV). Der Check ist eine Risikoeinschätzung; verbindlich entscheidet nur
        die Deutsche Rentenversicherung.
      </div>
    </CockpitShell>
  );
};

export default ScheinselbststaendigkeitCheck;
