import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Calculator, CalendarClock, ClipboardCheck, ExternalLink, ListOrdered } from "lucide-react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { AmpelErgebnis, FrageZeile, eur } from "@/components/cockpit/AmpelCheck";
import { Input } from "@/components/ui/input";
import { Callout, Field, ResultPanel, ToolLayout, ToolSection, selectCls } from "@/components/cockpit/kit";
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
      subtitle="Bis zu 80 % deiner Unternehmensberatung zahlt der Staat, aber nur, wenn du den Antrag VOR dem Beratungsvertrag stellst. Prüf in 2 Minuten, ob du förderfähig bist und wie viel es gibt."
    >
      <Callout tone="danger" icon={CalendarClock} title={<>Noch {tage} Tage bis zum Antragsschluss</>} className="mb-8">
        Die Förderrichtlinie gilt nur für Anträge bis 31.12.2026. Eine Nachfolgeregelung ist bisher nicht veröffentlicht.
        Wer die Förderung will, sollte den Antrag dieses Jahr stellen.
      </Callout>

      <ToolLayout
        className="mb-10"
        inputs={
          <ToolSection
            icon={ClipboardCheck}
            title="Bist du förderfähig?"
            description="Sechs Fragen nach der aktuellen Richtlinie. Jede Antwort aktualisiert die Ampel sofort."
            bodyClassName="py-2 md:py-2"
          >
            <div className="divide-y divide-border">
              {FRAGEN.map((f) => (
                <FrageZeile key={f.key} frage={f.frage} hilfe={f.hilfe} wert={a[f.key] as boolean | null} setze={(v) => setA((x) => ({ ...x, [f.key]: v }))} />
              ))}
              <div className="py-4">
                <Field
                  label="Gründungsdatum"
                  hint="Gewerbeanmeldung, HR-Eintrag bzw. Anmeldung beim Finanzamt"
                  htmlFor="bafa-gruendung"
                >
                  <Input
                    id="bafa-gruendung"
                    type="date"
                    className="max-w-[220px]"
                    onChange={(e) => setA((x) => ({ ...x, gruendungsDatum: e.target.value || null }))}
                  />
                </Field>
              </div>
            </div>
          </ToolSection>
        }
        result={
          <>
            <AmpelErgebnis
              ampel={pruefung.ampel}
              befunde={pruefung.befunde}
              titel={{ gruen: "Förderfähig", gelb: "Förderfähig, mit Pflichtschritt", rot: "So nicht förderfähig", offen: "Noch nicht alle Fragen beantwortet" }}
            />
            <ResultPanel
              variant="ink"
              kicker="Dein Zuschuss"
              title="Zuschuss vom BAFA"
              value={eur(r.zuschuss, 2)}
              valueHint={<>Fördersatz {Math.round(r.satz * 100)} % auf {eur(r.bemessung)} förderfähiges Honorar</>}
            >
              <div className="divide-y divide-white/10 border-t border-white/10">
                <div className="flex justify-between py-2.5 text-sm"><span>Förderfähig (max. {eur(BAFA.bemessungMax)})</span><span className="tabular font-medium">{eur(r.bemessung)}</span></div>
                <div className="flex justify-between py-2.5 text-sm"><span>Fördersatz</span><span className="tabular font-medium">{Math.round(r.satz * 100)} %</span></div>
                <div className="flex justify-between py-2.5 text-sm"><span>Dein Eigenanteil{vorsteuer ? " (nach Vorsteuer)" : ""}</span><span className="tabular font-medium">{eur(r.eigenanteil, 2)}</span></div>
              </div>
            </ResultPanel>
            <ToolSection icon={Calculator} title="Deine Angaben zum Honorar">
              <div className="space-y-4">
                <Field label="Beratungshonorar netto" hint="Inklusive Auslagen und Reisekosten" htmlFor="bafa-honorar">
                  <Input id="bafa-honorar" type="number" min={0} value={honorar} onChange={(e) => setHonorar(Number(e.target.value) || 0)} className="tabular" />
                </Field>
                <Field label="Standort der beratenen Betriebsstätte" htmlFor="bafa-land">
                  <select
                    id="bafa-land"
                    value={region.land}
                    onChange={(e) => setRegion((x) => ({ ...x, land: e.target.value }))}
                    className={selectCls}
                  >
                    {Object.entries(BUNDESLAND_NAMES).filter(([k]) => k !== "bund").map(([k, n]) => (
                      <option key={k} value={k}>{n}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Sonderregion" htmlFor="bafa-sonder">
                  <select
                    id="bafa-sonder"
                    value={region.sonderregion}
                    onChange={(e) => setRegion((x) => ({ ...x, sonderregion: e.target.value as BafaRegion["sonderregion"] }))}
                    className={selectCls}
                  >
                    <option value="keine">keine Sonderregion</option>
                    <option value="leipzig">Region Leipzig (50 %)</option>
                    <option value="lueneburg">Region Lüneburg (80 %)</option>
                    <option value="trier">Region Trier (80 %)</option>
                  </select>
                </Field>
                <label className="flex cursor-pointer items-start gap-2.5 text-sm">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]" checked={vorsteuer} onChange={(e) => setVorsteuer(e.target.checked)} />
                  <span>Ich bin vorsteuerabzugsberechtigt (keine Kleinunternehmerregelung)</span>
                </label>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Du zahlst die Rechnung zuerst komplett (<span className="tabular">{eur(r.gezahlt, 2)}</span> inkl. USt) per Überweisung, bar zählt nicht. Seit
                  15.11.2025 wird ohne Vorsteuerabzug brutto gerechnet. Regionen Leipzig, Lüneburg, Trier: PLZ-Listen auf der{" "}
                  <a href={SEITE} target="_blank" rel="noreferrer noopener" className="text-accent-blue hover:underline">BAFA-Seite</a>.
                </p>
              </div>
            </ToolSection>
          </>
        }
      />

      <ToolSection icon={ListOrdered} title="So läuft es ab" description="Die Reihenfolge entscheidet: erst Antrag, dann Vertrag." className="mb-6">
        <ol className="space-y-4 text-sm">
          {[
            <>Im ersten Jahr nach Gründung: <strong className="text-foreground">kostenloses Informationsgespräch</strong> bei einem Regionalpartner (z. B. IHK, HWK), frühestens 3 Monate vor dem Antrag. Die Bestätigung reichst du später mit dem Verwendungsnachweis ein.</>,
            <><strong className="text-foreground">Online-Antrag</strong> über eine Leitstelle deiner Wahl (DIHK-Service, ZDH, BDS-DGV, BBG, INTERHOGA, Leitstelle für Gewerbeförderungsmittel), vor jedem Vertrag mit dem Berater.</>,
            <><strong className="text-foreground">Informationsschreiben abwarten</strong>, erst dann den Beratungsvertrag unterschreiben. Berater muss beim BAFA registriert sein; max. 5 Beratungstage.</>,
            <>Rechnung <strong className="text-foreground">vollständig per Überweisung</strong> bezahlen und den Beratungsbericht erhalten.</>,
            <><strong className="text-foreground">Verwendungsnachweis</strong> innerhalb von 6 Monaten nach dem Informationsschreiben einreichen, dann wird ausgezahlt.</>,
          ].map((s, i) => (
            <li key={i} className="flex gap-3.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-xs font-semibold tabular">{i + 1}</span>
              <span className="pt-0.5 leading-relaxed text-muted-foreground">{s}</span>
            </li>
          ))}
        </ol>
        <p className="mt-5 border-t border-border/70 pt-4 text-xs leading-relaxed text-muted-foreground">
          Höchstens {BAFA.proJahr} Beratungen pro Jahr und {BAFA.gesamt} insgesamt. Nur Einzelberatung, keine Seminare.
          De-minimis-Beihilfe (max. 300.000 € in 3 Jahren), kein Rechtsanspruch. Die Beratungstermine der IHK und HWK findest
          du unter <Link to="/gruender-events" className="text-accent-blue hover:underline">Gründer-Events</Link>.
        </p>
      </ToolSection>

      <Callout tone="neutral" icon={BookOpen} title="Stand 07.10.2026">
        Richtlinie „Förderung von Unternehmensberatungen für KMU“ vom 14.12.2022 in der Fassung vom 12.12.2024. Die frühere
        Staffel nach Jungunternehmen, Bestandsunternehmen und Unternehmen in Schwierigkeiten gilt nicht mehr.{" "}
        <a href={RL} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-0.5 text-accent-blue hover:underline">
          Richtlinie (PDF) <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      </Callout>
    </CockpitShell>
  );
};

export default BafaBeratungCheck;
