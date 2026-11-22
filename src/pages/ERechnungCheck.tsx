import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, FileCheck2, Inbox } from "lucide-react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { Callout, Field, ResultPanel, ToolLayout, ToolSection } from "@/components/cockpit/kit";
import { eRechnungPflicht } from "@/lib/relevanz2027";
import { Q, STAND } from "@/data/stichtage";

const datum = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });

const Haken = ({ label, hilfe, wert, setze }: { label: string; hilfe?: string; wert: boolean; setze: (v: boolean) => void }) => (
  <label className="flex cursor-pointer items-start gap-2.5 rounded-md border border-border bg-background/60 px-3 py-2.5 text-sm hover:border-foreground/20">
    <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]" checked={wert} onChange={(e) => setze(e.target.checked)} />
    <span>
      <span className="font-medium">{label}</span>
      {hilfe && <span className="mt-0.5 block text-xs text-muted-foreground">{hilfe}</span>}
    </span>
  </label>
);

const UMSTELLEN = [
  { to: "/cockpit/rechnungs-generator", label: "Rechnungs-Generator", desc: "Rechnungen als XRechnung erstellen" },
  { to: "/e-rechnung-lesen", label: "E-Rechnung lesen", desc: "Eingehende XRechnung oder ZUGFeRD lesbar machen" },
  { to: "/pdf-in-e-rechnung-umwandeln", label: "PDF in E-Rechnung umwandeln", desc: "Bestehende PDF-Rechnung als E-Rechnung ausgeben" },
];

const ERechnungCheck = () => {
  const [e, setE] = useState({ b2bInland: true, b2c: false, ausland: false, kleinunternehmer: false, umsatz2026: 120000 });
  const r = useMemo(() => eRechnungPflicht(e), [e]);
  const set = <K extends keyof typeof e>(k: K, v: (typeof e)[K]) => setE((x) => ({ ...x, [k]: v }));

  return (
    <CockpitShell
      eyebrow="E-Rechnung · Stand 22.11.2026"
      title="Ab wann musst du E-Rechnungen schreiben?"
      subtitle="Die Übergangsfristen für Papier- und PDF-Rechnungen im B2B laufen aus: zuerst für Unternehmen mit mehr als 800.000 € Umsatz, ab 2028 für alle. Gib drei Dinge ein und du bekommst dein Datum."
    >
      <ToolLayout
        className="mb-8"
        inputs={
          <>
            <ToolSection icon={Building2} title="Deine Kunden" description="Mehrfachauswahl." bodyClassName="space-y-2">
              <Haken label="Unternehmen in Deutschland (B2B Inland)" wert={e.b2bInland} setze={(v) => set("b2bInland", v)} />
              <Haken label="Privatkunden (B2C)" wert={e.b2c} setze={(v) => set("b2c", v)} />
              <Haken label="Kunden im Ausland" wert={e.ausland} setze={(v) => set("ausland", v)} />
            </ToolSection>
            <ToolSection title="Dein Unternehmen" bodyClassName="space-y-4">
              <Haken label="Ich bin Kleinunternehmer (§ 19 UStG)" wert={e.kleinunternehmer} setze={(v) => set("kleinunternehmer", v)} />
              {!e.kleinunternehmer && (
                <Field label="Gesamtumsatz 2026 (€)" htmlFor="er-umsatz" hint="Gesamtumsatz im Sinne von § 19 Abs. 2 UStG. Die Grenze liegt bei 800.000 €; genau 800.000 € zählt noch als darunter.">
                  <Input id="er-umsatz" type="number" inputMode="numeric" min={0} value={e.umsatz2026} onChange={(ev) => set("umsatz2026", Number(ev.target.value) || 0)} />
                </Field>
              )}
            </ToolSection>
          </>
        }
        result={
          <>
            <ResultPanel
              variant="ink"
              kicker="Pflicht zum Ausstellen"
              title={r.art === "ab" ? "E-Rechnung Pflicht ab" : r.art === "befreit" ? "Befreit vom Ausstellen" : "Keine Pflicht zum Ausstellen"}
              value={r.ab ? datum(r.ab) : r.art === "befreit" ? "Kleinunternehmer" : "nur B2C/Ausland"}
              valueHint={r.papierBis ? `Papier oder PDF mit Zustimmung des Kunden noch für Leistungen bis ${datum(r.papierBis)}` : undefined}
            >
              <p className="text-sm leading-relaxed">{r.satz}</p>
              <p className="mt-2 text-xs opacity-75">{r.grundlagen.join(" · ")}</p>
            </ResultPanel>
            <Callout tone="info" icon={Inbox} title="Empfangen musst du sie trotzdem können">
              Für Rechnungen zwischen Unternehmern im Inland braucht dein Lieferant deine Zustimmung zur E-Rechnung nicht (§ 14 Abs. 1 Satz 5 UStG). Du brauchst also einen Weg, E-Rechnungen anzunehmen und zu lesen, auch als Kleinunternehmer.
            </Callout>
          </>
        }
      />

      <ToolSection icon={FileCheck2} title="Ausnahmen, die bleiben" className="mb-6" bodyClassName="space-y-2 text-sm leading-relaxed text-foreground/85">
        <p>Rechnungen bis 250 € (Kleinbetragsrechnungen) darfst du immer als Papier oder PDF schicken (§ 33 Satz 4 UStDV). Das gilt nicht für Fernverkäufe, innergemeinschaftliche Lieferungen und Reverse-Charge-Fälle.</p>
        <p>Für steuerfreie Umsätze nach § 4 Nr. 8 bis 29 UStG besteht keine Pflicht zur Rechnung, also auch keine zur E-Rechnung (§ 14 Abs. 2 UStG).</p>
        <p>Rechnungen an Privatkunden und an Kunden im Ausland fallen nicht unter die Pflicht (§ 14 Abs. 2 Satz 2 Nr. 1 UStG).</p>
      </ToolSection>

      <ToolSection title="So stellst du um" className="mb-6">
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {UMSTELLEN.map((u) => (
            <li key={u.to}>
              <Link to={u.to} className="group block h-full rounded-md border border-border bg-background/60 p-3.5 transition-colors hover:border-foreground/25">
                <span className="flex items-center justify-between gap-2 text-sm font-semibold">
                  {u.label} <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
                <span className="mt-1 block text-[13px] leading-snug text-muted-foreground">{u.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </ToolSection>

      <Stand2026Footer
        stand={STAND}
        sources={[Q.ustg14, Q.ustg27, Q.ustdv33, Q.ustdv34a]}
        note="Maßgeblich ist der Gesetzestext mit Stand 22.11.2026. Gesamtumsatz und Kleinunternehmer-Grenzen nach § 19 UStG."
      />
    </CockpitShell>
  );
};

export default ERechnungCheck;
