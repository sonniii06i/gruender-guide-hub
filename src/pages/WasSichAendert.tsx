import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarRange, ClipboardList, ExternalLink } from "lucide-react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { FrageZeile } from "@/components/cockpit/AmpelCheck";
import { Callout, ChoiceGroup, Field, KitTable, ResultPanel, ToneBadge, ToolLayout, ToolSection, selectCls, type Tone } from "@/components/cockpit/kit";
import { Q, STAND, STAND_TEXT, STICHTAGE, WERTE_2027, type Wert2027 } from "@/data/stichtage";

const datum = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
const STAND_TON: Record<Wert2027["stand"], Tone> = { beschlossen: "success", festgelegt: "success", verkuendungOffen: "warning" };

type Rechtsform = "einzel" | "kapital";
type Kv = "freiwillig" | "pflicht" | "privat";
type Ma = "keine" | "minijob" | "sv";

type Punkt = { text: string; detail?: string; wert?: Wert2027; link?: { to: string; label: string } };

const WERT = Object.fromEntries(WERTE_2027.map((w) => [w.id, w])) as Record<string, Wert2027>;

function meineAenderungen(a: { rechtsform: Rechtsform; kv: Kv; mitarbeiter: Ma; umsatzUeber800k: boolean | null; kreative: boolean | null }): Punkt[] {
  const out: Punkt[] = [];
  if (a.kv === "freiwillig") {
    out.push({ text: "Deine Mindest- und Höchstbeiträge zur Krankenversicherung ändern sich.", wert: WERT.bezugsgroesse, link: { to: "/cockpit/kv-optimizer", label: "Krankenkassen-Optimizer" } });
    out.push({ text: "Der Höchstbeitrag richtet sich nach der neuen Beitragsbemessungsgrenze.", wert: WERT.bbg_kv });
    out.push({ text: "Vergleich deinen Zusatzbeitrag mit dem neuen Durchschnitt.", wert: WERT.zusatzbeitrag });
  }
  if (a.kv === "pflicht") {
    out.push({ text: "Höchstbeitrag zur Kranken- und Pflegeversicherung steigt.", wert: WERT.bbg_kv, link: { to: "/cockpit/brutto-netto-solo", label: "Brutto-Netto-Rechner" } });
    out.push({ text: "Wechsel in die private Krankenversicherung erst über der neuen Grenze.", wert: WERT.jaeg });
    out.push({ text: "Neuer Durchschnitt beim Zusatzbeitrag.", wert: WERT.zusatzbeitrag });
  }
  if (a.rechtsform === "kapital" && a.kv === "pflicht")
    out.push({ text: "Als versicherungspflichtiger Geschäftsführer zahlst du Renten- und Arbeitslosenversicherung bis zur neuen Grenze.", wert: WERT.bbg_rv });
  if (a.mitarbeiter !== "keine") {
    out.push({ text: "Prüf die Stundenlöhne aller Mitarbeiter, auch von Aushilfen.", wert: WERT.mindestlohn, link: { to: "/playbook/preview/hiring-minijob-werkstudent", label: "Guide Minijob & Werkstudent" } });
    out.push({ text: "Minijobber dürfen mehr verdienen. Wer bisher an der Grenze lag, kann Stunden oder Lohn anpassen.", wert: WERT.minijob });
  }
  if (a.mitarbeiter === "sv") {
    out.push({ text: "Beiträge für Angestellte mit hohem Gehalt steigen bis zur neuen Grenze.", wert: WERT.bbg_rv });
    out.push({ text: "Für Angestellte mit hohem Gehalt steigt auch die Grenze in der Kranken- und Pflegeversicherung.", wert: WERT.bbg_kv });
  }
  if (a.umsatzUeber800k === true)
    out.push({ text: "Ab 01.01.2027 schreibst du an Unternehmer im Inland nur noch E-Rechnungen.", detail: "§ 27 Abs. 38 UStG, Umsatz 2026 über 800.000 €", link: { to: "/cockpit/e-rechnung-check", label: "E-Rechnung-Check" } });
  if (a.umsatzUeber800k === false)
    out.push({ text: "Papier- und PDF-Rechnungen an Unternehmer im Inland gehen mit Zustimmung noch bis 31.12.2027, ab 01.01.2028 nur noch E-Rechnungen.", detail: "§ 27 Abs. 38 UStG", link: { to: "/cockpit/e-rechnung-check", label: "E-Rechnung-Check" } });
  if (a.kreative === true)
    out.push({ text: "Künstlersozialabgabe: Meldung für 2026 bis 31.03.2027, Satz 2027 5,0 % (2026: 4,9 %).", detail: "§ 27 KSVG, Satz laut Künstlersozialkasse", link: { to: "/cockpit/ksa-check", label: "KSA-Check" } });
  return out;
}

const WasSichAendert = () => {
  const [rechtsform, setRechtsform] = useState<Rechtsform>("einzel");
  const [kv, setKv] = useState<Kv>("freiwillig");
  const [mitarbeiter, setMitarbeiter] = useState<Ma>("keine");
  const [umsatzUeber800k, setUmsatz] = useState<boolean | null>(null);
  const [kreative, setKreative] = useState<boolean | null>(null);
  const punkte = useMemo(() => meineAenderungen({ rechtsform, kv, mitarbeiter, umsatzUeber800k, kreative }), [rechtsform, kv, mitarbeiter, umsatzUeber800k, kreative]);
  const heute = new Date().toISOString().slice(0, 10);
  const kommend = STICHTAGE.filter((s) => s.datum >= heute);

  return (
    <CockpitShell
      eyebrow="Steuern & Fristen · Stand 22.11.2026"
      title="Das ändert sich für dich zum 01.01.2027"
      subtitle="Neue Grenzen in der Sozialversicherung, höherer Mindestlohn, E-Rechnung, Künstlersozialabgabe und KI-Kennzeichnung. Fünf Fragen, dann siehst du, was davon dich betrifft. Jeder Wert mit Quelle und Rechtsstand."
      tabs={[
        { label: "Steuer-Cockpit", to: "/cockpit/steuer" },
        { label: "Steuerkalender", to: "/cockpit/steuerkalender" },
        { label: "USt-Voranmeldung", to: "/cockpit/ust-voranmeldung" },
        { label: "Anlage EÜR", to: "/cockpit/anlage-euer" },
        { label: "Neu ab 2027", to: "/cockpit/aktuell" },
      ]}
    >
      <ToolLayout
        className="mb-8"
        inputs={
          <ToolSection icon={ClipboardList} title="Deine Situation" bodyClassName="space-y-4">
            <Field label="Rechtsform">
              <ChoiceGroup<Rechtsform> label="Rechtsform" value={rechtsform} onChange={setRechtsform} options={[{ value: "einzel", label: "Einzelunternehmen oder Freiberufler" }, { value: "kapital", label: "GmbH oder UG" }]} />
            </Field>
            <Field label="Wie bist du krankenversichert?" htmlFor="wsa-kv">
              <select id="wsa-kv" className={selectCls} value={kv} onChange={(e) => setKv(e.target.value as Kv)}>
                <option value="freiwillig">gesetzlich, freiwillig (als Selbstständiger)</option>
                <option value="pflicht">gesetzlich, pflichtversichert (angestellt, auch als Geschäftsführer)</option>
                <option value="privat">privat</option>
              </select>
            </Field>
            <Field label="Mitarbeiter" htmlFor="wsa-ma">
              <select id="wsa-ma" className={selectCls} value={mitarbeiter} onChange={(e) => setMitarbeiter(e.target.value as Ma)}>
                <option value="keine">keine</option>
                <option value="minijob">nur Minijobber oder Aushilfen</option>
                <option value="sv">sozialversicherungspflichtig Angestellte</option>
              </select>
            </Field>
            <div className="divide-y divide-border">
              <FrageZeile frage="Lag dein Gesamtumsatz 2026 über 800.000 €?" wert={umsatzUeber800k} setze={setUmsatz} />
              <FrageZeile frage="Beauftragst du selbständige Künstler oder Publizisten, etwa für Design, Fotos oder Texte?" wert={kreative} setze={setKreative} />
            </div>
          </ToolSection>
        }
        result={
          <ResultPanel kicker="Ab 01.01.2027" title={punkte.length ? `${punkte.length} Änderungen für dich` : "Für deine Angaben keine der Änderungen"}>
            <ul className="space-y-3.5">
              {punkte.map((p, i) => (
                <li key={i} className="text-sm leading-relaxed">
                  <p>{p.text}</p>
                  {p.wert && (
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px]">
                      <span className="font-semibold tabular">{p.wert.titel}: {p.wert.wert2027}</span>
                      {p.wert.wert2026 && <span className="text-muted-foreground tabular">(2026: {p.wert.wert2026})</span>}
                      <ToneBadge tone={STAND_TON[p.wert.stand]}>{STAND_TEXT[p.wert.stand]}</ToneBadge>
                    </p>
                  )}
                  {p.detail && <p className="mt-1 text-xs text-muted-foreground">{p.detail}</p>}
                  {p.link && (
                    <Link to={p.link.to} className="mt-1 inline-flex items-center gap-1 text-[13px] font-medium text-accent-blue hover:underline">
                      {p.link.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </ResultPanel>
        }
      />

      <ToolSection icon={CalendarRange} title="Stichtage" description="Gesetzliche Termine, die für viele Gründer gelten. Sie stehen auch in deiner Übersicht, sobald sie in den nächsten 14 Tagen liegen." className="mb-6" bodyClassName="p-0">
        <ul className="divide-y divide-border">
          {kommend.map((s) => (
            <li key={s.datum + s.titel} className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-baseline sm:gap-4">
              <span className="w-24 shrink-0 text-sm font-semibold tabular">{datum(s.datum)}</span>
              <div className="min-w-0 text-sm leading-relaxed">
                <Link to={s.link} className="font-medium hover:text-accent-blue hover:underline">{s.titel}</Link>
                <span className="block text-xs text-muted-foreground">Für {s.wer} · {s.quellen.map((q) => q.label).join(" · ")}</span>
              </div>
            </li>
          ))}
        </ul>
      </ToolSection>

      <ToolSection title="Alle Werte 2027" className="mb-6">
        <KitTable caption="Werte ab 01.01.2027">
          <thead>
            <tr>
              <th>Wert</th>
              <th>Ab 01.01.2027</th>
              <th>2026</th>
              <th>Stand</th>
              <th>Quelle</th>
            </tr>
          </thead>
          <tbody>
            {WERTE_2027.map((w) => (
              <tr key={w.id}>
                <td className="min-w-[12rem]">{w.titel}<span className="block text-xs text-muted-foreground">{w.fuer}</span></td>
                <td className="whitespace-nowrap font-semibold">{w.wert2027}</td>
                <td className="whitespace-nowrap text-muted-foreground">{w.wert2026 ?? "–"}</td>
                <td><ToneBadge tone={STAND_TON[w.stand]}>{STAND_TEXT[w.stand]}</ToneBadge></td>
                <td className="min-w-[10rem] text-xs">
                  {w.quellen.map((q) => (
                    <a key={q.url} href={q.url} target="_blank" rel="noreferrer noopener" className="mb-0.5 flex items-start gap-1 text-accent-blue hover:underline">
                      {q.label} <ExternalLink className="mt-0.5 h-2.5 w-2.5 shrink-0" aria-hidden="true" />
                    </a>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </KitTable>
      </ToolSection>

      <Callout tone="warning" title="Was „Verkündung offen“ heißt">
        Die Sozialversicherungs-Rechengrößen 2027 hat der Bundesrat am 20.11.2026 beschlossen. Sie gelten ab 01.01.2027, im Bundesgesetzblatt verkündet sind sie noch nicht. Unsere Rechner rechnen bis Jahresende weiter mit den Werten 2026.
      </Callout>

      <Stand2026Footer stand={STAND} sources={[Q.bmas_rg, Q.bundesrat_rg, Q.breg_mindestlohn, Q.bmg_zusatz, Q.ustg27, Q.ksk_2027, Q.ki_omnibus]} />
    </CockpitShell>
  );
};

export default WasSichAendert;
