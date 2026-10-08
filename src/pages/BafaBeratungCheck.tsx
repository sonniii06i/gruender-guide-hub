import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { AmpelErgebnis, FrageZeile, eur } from "@/components/cockpit/AmpelCheck";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BUNDESLAND_NAMES } from "@/data/foerderprogramme";
import { BAFA, pruefeBafa, rechneBafa, type BafaAntworten, type BafaRegion } from "@/lib/foerderRechner";

const RL = "https://www.bafa.de/SharedDocs/Downloads/DE/Wirtschaft/unb_foerderrichtlinie_kmu_241212.pdf?__blob=publicationFile&v=2";
const SEITE = "https://www.bafa.de/DE/Wirtschaft/Beratung_Finanzierung/Unternehmensberatung/unternehmensberatung_node.html";

const FRAGEN: { key: keyof BafaAntworten; frage: string; hilfe?: string }[] = [
  { key: "kmu", frage: "Ist dein Unternehmen ein KMU?", hilfe: "Unter 250 Beschäftigte und höchstens 50 Mio. € Umsatz oder 43 Mio. € Bilanzsumme – trifft auf fast alle Gründungen zu." },
  { key: "sitzDe", frage: "Liegen Sitz und Geschäftsbetrieb in Deutschland?" },
  { key: "ausgeschlosseneBranche", frage: "Bist du selbst Berater, Steuerberater, Anwalt, Notar, Wirtschaftsprüfer – oder gemeinnützig, Verein, Stiftung, Landwirtschaft?" },
  { key: "insolvenz", frage: "Läuft ein Insolvenzverfahren oder besteht Pflicht zur Vermögensauskunft?" },
  { key: "beratungBegonnen", frage: "Hast du den Beratungsvertrag schon unterschrieben oder die Beratung begonnen?", hilfe: "Schon der Vertrag zählt als Beginn – dann ist die Förderung weg." },
  { key: "ueberwiegendRechtSteuer", frage: "Geht es in der Beratung überwiegend um Recht, Steuern, Versicherungen oder Fördermittel?" },
];

const BafaBeratungCheck = () => {
  const heute = new Date().toISOString().slice(0, 10);
  const [a, setA] = useState<BafaAntworten>({
    kmu: null, sitzDe: null, ausgeschlosseneBranche: null, insolvenz: null,
    beratungBegonnen: null, ueberwiegendRechtSteuer: null, gruendungsDatum: null,
  });
  const [region, setRegion] = useState<BafaRegion>({ land: "BY", sonderregion: "keine" });
  const [honorar, setHonorar] = useState(3500);
  const [vorsteuer, setVorsteuer] = useState(true);

  const pruefung = useMemo(() => pruefeBafa(a, heute), [a, heute]);
  const r = useMemo(() => rechneBafa(honorar, region, vorsteuer), [honorar, region, vorsteuer]);
  const tage = Math.max(0, Math.ceil((Date.parse(BAFA.antragBis) - Date.parse(heute)) / 864e5));

  return (
    <CockpitShell
      eyebrow="BAFA-Beratungsförderung · Richtlinie bis 31.12.2026"
      title="BAFA-Beratungsförderung: Check & Zuschuss-Rechner"
      subtitle="Bis zu 80 % deiner Unternehmensberatung zahlt der Staat – aber nur, wenn du den Antrag VOR dem Beratungsvertrag stellst. Prüf in 2 Minuten, ob du förderfähig bist und wie viel es gibt."
    >
      <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-4 mb-6 text-sm">
        <strong>Noch {tage} Tage:</strong> Die Förderrichtlinie gilt nur für Anträge bis 31.12.2026. Eine Nachfolgeregelung
        ist bisher nicht veröffentlicht – wer die Förderung will, sollte den Antrag dieses Jahr stellen.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-8">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-bold mb-2">1. Bist du förderfähig?</h2>
          <div className="divide-y divide-border">
            {FRAGEN.map((f) => (
              <FrageZeile key={f.key} frage={f.frage} hilfe={f.hilfe} wert={a[f.key] as boolean | null} setze={(v) => setA((x) => ({ ...x, [f.key]: v }))} />
            ))}
            <div className="py-3">
              <Label className="text-xs">Gründungsdatum (Gewerbeanmeldung, HR-Eintrag bzw. Anmeldung beim Finanzamt)</Label>
              <Input type="date" className="mt-1 max-w-[220px]" onChange={(e) => setA((x) => ({ ...x, gruendungsDatum: e.target.value || null }))} />
            </div>
          </div>
        </div>

        <div className="space-y-4 lg:sticky lg:top-4 self-start">
          <AmpelErgebnis
            ampel={pruefung.ampel}
            befunde={pruefung.befunde}
            titel={{ gruen: "Förderfähig", gelb: "Förderfähig – mit Pflichtschritt", rot: "So nicht förderfähig", offen: "Noch nicht alle Fragen beantwortet" }}
          />
          <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5">
            <h2 className="font-bold mb-3">2. Dein Zuschuss</h2>
            <Label className="text-xs">Beratungshonorar netto (inkl. Auslagen, Reisekosten)</Label>
            <Input type="number" min={0} value={honorar} onChange={(e) => setHonorar(Number(e.target.value) || 0)} className="mt-1 bg-background" />
            <Label className="text-xs mt-3 block">Standort der beratenen Betriebsstätte</Label>
            <select
              value={region.land}
              onChange={(e) => setRegion((x) => ({ ...x, land: e.target.value }))}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {Object.entries(BUNDESLAND_NAMES).filter(([k]) => k !== "bund").map(([k, n]) => (
                <option key={k} value={k}>{n}</option>
              ))}
            </select>
            <select
              value={region.sonderregion}
              onChange={(e) => setRegion((x) => ({ ...x, sonderregion: e.target.value as BafaRegion["sonderregion"] }))}
              className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="keine">keine Sonderregion</option>
              <option value="leipzig">Region Leipzig (50 %)</option>
              <option value="lueneburg">Region Lüneburg (80 %)</option>
              <option value="trier">Region Trier (80 %)</option>
            </select>
            <label className="flex items-center gap-2 text-xs mt-3 cursor-pointer">
              <input type="checkbox" checked={vorsteuer} onChange={(e) => setVorsteuer(e.target.checked)} /> Ich bin
              vorsteuerabzugsberechtigt (keine Kleinunternehmerregelung)
            </label>
            <div className="mt-4 space-y-1.5 text-sm">
              <div className="flex justify-between"><span>Förderfähig (max. {eur(BAFA.bemessungMax)})</span><strong>{eur(r.bemessung)}</strong></div>
              <div className="flex justify-between"><span>Fördersatz</span><strong>{Math.round(r.satz * 100)} %</strong></div>
              <div className="flex justify-between border-t border-border pt-1.5 text-base"><span className="font-semibold">Zuschuss</span><strong>{eur(r.zuschuss, 2)}</strong></div>
              <div className="flex justify-between text-xs text-muted-foreground"><span>Dein Eigenanteil{vorsteuer ? " (nach Vorsteuer)" : ""}</span><span>{eur(r.eigenanteil, 2)}</span></div>
            </div>
            <p className="text-[11px] text-muted-foreground mt-3">
              Du zahlst die Rechnung zuerst komplett ({eur(r.gezahlt, 2)} inkl. USt) per Überweisung – bar zählt nicht. Seit
              15.11.2025 wird ohne Vorsteuerabzug brutto gerechnet. Regionen Leipzig, Lüneburg, Trier: PLZ-Listen auf der{" "}
              <a href={SEITE} target="_blank" rel="noreferrer noopener" className="text-accent-blue hover:underline">BAFA-Seite</a>.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h2 className="font-bold mb-3">3. So läuft es ab</h2>
        <ol className="space-y-3 text-sm">
          {[
            <>Im ersten Jahr nach Gründung: <strong>kostenloses Informationsgespräch</strong> bei einem Regionalpartner (z. B. IHK, HWK) – frühestens 3 Monate vor dem Antrag. Die Bestätigung reichst du später mit dem Verwendungsnachweis ein.</>,
            <><strong>Online-Antrag</strong> über eine Leitstelle deiner Wahl (DIHK-Service, ZDH, BDS-DGV, BBG, INTERHOGA, Leitstelle für Gewerbeförderungsmittel) – vor jedem Vertrag mit dem Berater.</>,
            <><strong>Informationsschreiben abwarten</strong>, erst dann den Beratungsvertrag unterschreiben. Berater muss beim BAFA registriert sein; max. 5 Beratungstage.</>,
            <>Rechnung <strong>vollständig per Überweisung</strong> bezahlen und den Beratungsbericht erhalten.</>,
            <><strong>Verwendungsnachweis</strong> innerhalb von 6 Monaten nach dem Informationsschreiben einreichen – dann wird ausgezahlt.</>,
          ].map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-blue text-primary-foreground text-xs font-bold">{i + 1}</span>
              <span className="text-muted-foreground">{s}</span>
            </li>
          ))}
        </ol>
        <p className="text-xs text-muted-foreground mt-4">
          Höchstens {BAFA.proJahr} Beratungen pro Jahr und {BAFA.gesamt} insgesamt. Nur Einzelberatung, keine Seminare.
          De-minimis-Beihilfe (max. 300.000 € in 3 Jahren), kein Rechtsanspruch. Die Beratungstermine der IHK und HWK findest
          du unter <Link to="/gruender-events" className="text-accent-blue hover:underline">Gründer-Events</Link>.
        </p>
      </div>

      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <strong>Stand 07.10.2026:</strong> Richtlinie „Förderung von Unternehmensberatungen für KMU“ vom 14.12.2022 in der
        Fassung vom 12.12.2024. Die frühere Staffel nach Jungunternehmen, Bestandsunternehmen und Unternehmen in
        Schwierigkeiten gilt nicht mehr.{" "}
        <a href={RL} target="_blank" rel="noreferrer noopener" className="text-accent-blue hover:underline inline-flex items-center gap-0.5">
          Richtlinie (PDF) <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </CockpitShell>
  );
};

export default BafaBeratungCheck;
