import { useMemo, useState } from "react";
import { CalendarClock, Palette } from "lucide-react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { FrageZeile, eur } from "@/components/cockpit/AmpelCheck";
import { Input } from "@/components/ui/input";
import { Callout, ChoiceGroup, Field, ResultPanel, ResultRow, ToolLayout, ToolSection } from "@/components/cockpit/kit";
import { KSA_SATZ, ksaCheck, type KsaTyp } from "@/lib/relevanz2027";
import { Q, STAND } from "@/data/stichtage";

const satz = (n: number) => `${n.toLocaleString("de-DE", { minimumFractionDigits: 1 })} %`;

const KsaCheck = () => {
  const [typ, setTyp] = useState<KsaTyp>("eigenwerbung");
  const [summe, setSumme] = useState(3000);
  const [nurVeranstaltungen, setNurVeranstaltungen] = useState<boolean | null>(null);
  const r = useMemo(() => ksaCheck({ typ, summe2026: summe, nurVeranstaltungen: !!nurVeranstaltungen }), [typ, summe, nurVeranstaltungen]);

  return (
    <CockpitShell
      eyebrow="Künstlersozialabgabe · Stand 22.11.2026"
      title="Musst du Künstlersozialabgabe zahlen?"
      subtitle="Wer Designer, Fotografen, Texter oder andere selbständige Kreative beauftragt, kann abgabepflichtig sein. Der Satz liegt 2026 bei 4,9 % und steigt 2027 auf 5,0 %. Die Meldung für 2026 ist bis 31.03.2027 fällig."
    >
      <ToolLayout
        className="mb-8"
        inputs={
          <>
            <ToolSection icon={Palette} title="1. Wofür beauftragst du Kreative?">
              <ChoiceGroup<KsaTyp>
                label="Art der Beauftragung"
                value={typ}
                onChange={setTyp}
                options={[
                  { value: "eigenwerbung", label: "Werbung für mein eigenes Unternehmen", hint: "z. B. Fotos, Texte, Design oder Videos für deine Werbung (§ 24 Abs. 2 Nr. 1)" },
                  { value: "nutzung", label: "Ich nutze ihre Werke, um Einnahmen zu erzielen", hint: "§ 24 Abs. 2 Nr. 2" },
                  { value: "verwerter", label: "Das ist mein Geschäft", hint: "z. B. Verlag, Werbeagentur für Dritte, Galerie (§ 24 Abs. 1)" },
                  { value: "keins", label: "Gar nicht" },
                ]}
              />
            </ToolSection>
            {typ !== "keins" && (
              <ToolSection title="2. Wie viel hast du 2026 gezahlt?">
                <Field
                  label="Entgelte 2026 an selbständige Künstler und Publizisten (€)"
                  htmlFor="ksa-summe"
                  hint="Alles, was du zahlst, ohne gesondert ausgewiesene Umsatzsteuer. Nicht mit: Zahlungen an GmbH, UG, AG, e. V., OHG oder KG, die im eigenen Namen handeln, Reisekosten im Rahmen der steuerlichen Grenzen und steuerfreie Aufwandsentschädigungen."
                >
                  <Input id="ksa-summe" type="number" inputMode="numeric" min={0} value={summe} onChange={(e) => setSumme(Number(e.target.value) || 0)} />
                </Field>
              </ToolSection>
            )}
            {typ === "nutzung" && (
              <ToolSection title="3. Nur bei Veranstaltungen?" bodyClassName="py-1 md:py-2">
                <FrageZeile frage="Zahlst du die Entgelte nur bei höchstens drei Veranstaltungen im Jahr?" hilfe="Dann löst das keine Abgabe aus (§ 24 Abs. 2 Satz 3 Nr. 1 KSVG)." wert={nurVeranstaltungen} setze={setNurVeranstaltungen} />
              </ToolSection>
            )}
          </>
        }
        result={
          <>
            <ResultPanel variant="ink" kicker="Ergebnis" title={r.pflichtig ? "Abgabepflichtig" : "Nicht abgabepflichtig"} value={r.pflichtig ? eur(r.abgabe2026, 2) : "0 €"} valueHint={r.pflichtig ? `Abgabe für 2026 (${satz(KSA_SATZ[2026])} von ${eur(summe)})` : undefined}>
              <p className="text-sm leading-relaxed">{r.grund}</p>
              {r.pflichtig && (
                <div className="mt-3 divide-y divide-white/10">
                  <ResultRow label="Abgabesatz 2026" value={satz(KSA_SATZ[2026])} />
                  <ResultRow label="Abgabesatz 2027" value={satz(KSA_SATZ[2027])} />
                  <ResultRow
                    label="Vorauszahlung je Monat ab März 2027"
                    hint={r.vorauszahlungEntfaellt ? "entfällt, weil höchstens 40 € (§ 27 Abs. 3 KSVG)" : `1/12 der Entgelte 2026 × ${satz(KSA_SATZ[2027])}`}
                    value={r.vorauszahlungEntfaellt ? "entfällt" : eur(r.vorauszahlung2027, 2)}
                    strong
                  />
                </div>
              )}
            </ResultPanel>
            {r.pflichtig && (
              <Callout tone="danger" icon={CalendarClock} title="Deine Termine">
                <ul className="list-disc space-y-1 pl-5">
                  <li>Bis 31.03.2027: Summe der Entgelte 2026 an die Künstlersozialkasse melden, mit dem Vordruck der KSK (§ 27 Abs. 1 KSVG).</li>
                  <li>Jeden Monat bis zum 10. des Folgemonats: Vorauszahlung, sobald die KSK sie festgesetzt hat (§ 27 Abs. 1a, 2 KSVG). Bis 1. März gilt der Betrag vom Dezember des Vorjahres weiter.</li>
                </ul>
              </Callout>
            )}
          </>
        }
      />

      <Callout tone="info" title="Woher der Satz 2027 kommt">
        5,0 % für 2027 laut Künstlersozialkasse; die Künstlersozialabgabe-Verordnung 2027 wurde nach ihrer Mitteilung am 15.09.2026 im Bundesgesetzblatt veröffentlicht. Den Eintrag im Bundesgesetzblatt selbst konnten wir nicht abrufen.
      </Callout>

      <Stand2026Footer stand={STAND} sources={[Q.ksvg24, Q.ksvg25, Q.ksvg27, Q.ksk_bemessung, Q.ksk_2027, Q.bmas_ksa]} />
    </CockpitShell>
  );
};

export default KsaCheck;
