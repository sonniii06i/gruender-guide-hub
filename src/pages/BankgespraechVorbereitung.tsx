import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Download, ExternalLink, ListChecks, MessageSquareText } from "lucide-react";
import jsPDF from "jspdf";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { eur } from "@/components/cockpit/AmpelCheck";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Callout, Field, ResultPanel, ToneBadge, ToolLayout, ToolSection, selectCls } from "@/components/cockpit/kit";
import { Textarea } from "@/components/ui/textarea";
import { darlehensplan } from "@/lib/finanzplan";

// KfW ERP-Gründerkredit StartGeld (067), Merkblatt Stand 18.06.2026; Konditionen ab 22.10.2026.
// Unterlagen: KfW-Checkliste Risikoprüfung, IHK Darmstadt; Fragen: IHK Limburg.
export const STARTGELD = {
  max: 200000,
  maxBetriebsmittel: 80000,
  haftungsfreistellung: 80,
  varianten: [
    { laufzeit: 5, tilgungsfrei: 1, sollzins: 5.3, effektiv: 5.44 },
    { laufzeit: 10, tilgungsfrei: 2, sollzins: 5.45, effektiv: 5.59 },
  ],
  konditionenStand: "22.10.2026",
} as const;

const UNTERLAGEN = [
  "Businessplan mit Geschäftsidee, Markt, Wettbewerb und Marketing",
  "Kapitalbedarfs- und Finanzierungsplan",
  "Rentabilitätsvorschau und Kapitaldienstberechnung (mind. 2 Jahre)",
  "Liquiditätsplan (mind. 12 Monate)",
  "Tabellarischer Lebenslauf mit Qualifikationsnachweisen",
  "Selbstauskunft: Vermögen und Verbindlichkeiten",
  "Nachweis Eigenkapital / Eigenleistung",
  "Angaben zu Sicherheiten (bei GmbH/UG: Mithaftung der Gesellschafter)",
  "Bei bestehendem Unternehmen: Jahresabschlüsse/EÜR, aktuelle BWA (max. 3 Monate alt)",
  "Gesellschaftsvertrag und Handelsregisterauszug (falls vorhanden)",
  "Letzter Einkommensteuerbescheid",
];

const FRAGEN = [
  "Was genau bietet ihr an – und welche Lücke im Markt füllt ihr?",
  "Wer sind die Wettbewerber und worin unterscheidet ihr euch?",
  "Wie groß ist der Markt und welche Trends gibt es?",
  "Warum dieser Standort?",
  "Wie hoch ist der Kapitalbedarf – getrennt nach Investitionen und Betriebsmitteln?",
  "Mit welchen laufenden Kosten rechnest du?",
  "Wie viel Eigenkapital bringst du ein?",
  "Welche Förderkredite und Zuschüsse planst du zusätzlich?",
  "Welche Sicherheiten kannst du stellen?",
  "Welche Umsätze erwartest du – und wie begründest du sie?",
  "Ab wann trägt sich das Unternehmen und deckt deinen Lebensunterhalt?",
  "Sind Zins und Tilgung auch bei schwächerem Umsatz tragbar?",
  "Welche Qualifikation und Erfahrung bringst du mit?",
  "Planst du Personal – wann und zu welchen Kosten?",
];

const SPEICHER = "gx-bankgespraech-v1";

const BankgespraechVorbereitung = () => {
  const [betrag, setBetrag] = useState(50000);
  const [variante, setVariante] = useState(0);
  const [antworten, setAntworten] = useState<Record<number, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem(SPEICHER) || "{}");
    } catch {
      return {};
    }
  });
  const [haken, setHaken] = useState<Record<number, boolean>>({});
  useEffect(() => {
    try {
      localStorage.setItem(SPEICHER, JSON.stringify(antworten));
    } catch {
      /* ohne Zwischenspeicher */
    }
  }, [antworten]);

  const v = STARTGELD.varianten[variante];
  const plan = useMemo(
    () => darlehensplan({ betrag: Math.min(betrag, STARTGELD.max), zinsProzent: v.sollzins, laufzeitJahre: v.laufzeit, tilgungsfreiMonate: v.tilgungsfrei * 12 }, v.laufzeit * 12),
    [betrag, v],
  );
  const rateTilgungsfrei = plan[0]?.zins ?? 0;
  const rateDanach = (plan[v.tilgungsfrei * 12]?.zins ?? 0) + (plan[v.tilgungsfrei * 12]?.tilgung ?? 0);
  const zinsenGesamt = plan.reduce((n, m) => n + m.zins, 0);

  const pdf = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Vorbereitung Bankgespräch", 14, 18);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(
      [
        `Kreditwunsch: ${betrag.toLocaleString("de-DE")} € (ERP-Gründerkredit StartGeld, ${v.laufzeit} Jahre, ${v.tilgungsfrei} tilgungsfrei)`,
        `Rate tilgungsfreie Zeit ca. ${Math.round(rateTilgungsfrei).toLocaleString("de-DE")} €/Monat, danach ca. ${Math.round(rateDanach).toLocaleString("de-DE")} €/Monat`,
        `Zinsen gesamt ca. ${Math.round(zinsenGesamt).toLocaleString("de-DE")} € (Sollzins ${v.sollzins} %, Stand ${STARTGELD.konditionenStand}, maßgeblich ist die Zusage)`,
      ],
      14,
      26,
    );
    let y = 46;
    FRAGEN.forEach((f, i) => {
      if (y > 270) {
        doc.addPage();
        y = 18;
      }
      doc.setFont("helvetica", "bold");
      const fz = doc.splitTextToSize(`${i + 1}. ${f}`, 180);
      doc.text(fz, 14, y);
      y += fz.length * 4.6;
      doc.setFont("helvetica", "normal");
      const az = doc.splitTextToSize((antworten[i] || "–").trim(), 176);
      doc.text(az, 18, y + 1);
      y += az.length * 4.6 + 5;
    });
    doc.save("bankgespraech-vorbereitung.pdf");
  };

  const beantwortet = FRAGEN.filter((_, i) => (antworten[i] ?? "").trim().length > 0).length;
  const abgehakt = UNTERLAGEN.filter((_, i) => haken[i]).length;

  return (
    <CockpitShell
      eyebrow="Finanzierung · KfW ERP-Gründerkredit StartGeld"
      title="Bankgespräch vorbereiten: KfW-StartGeld"
      subtitle="Bis 200.000 € Gründerkredit über deine Hausbank, 80 % Haftungsfreistellung für die Bank, auch im Nebenerwerb. Rechne die Raten aus, hak die Unterlagen ab und bereite die Antworten auf die typischen Bankfragen vor."
    >
      <ToolLayout
        inputs={
          <ToolSection
            title="Die Fragen, die die Bank stellt"
            icon={MessageSquareText}
            description="Antworte in zwei bis drei Sätzen, möglichst mit Zahlen. Deine Antworten bleiben in diesem Browser gespeichert."
            actions={<ToneBadge tone={beantwortet === FRAGEN.length ? "success" : "neutral"}><span className="tabular">{beantwortet} / {FRAGEN.length}</span> beantwortet</ToneBadge>}
          >
            <ol className="space-y-5">
              {FRAGEN.map((f, i) => (
                <li key={f}>
                  <Field label={<span className="flex gap-2"><span className="tabular text-muted-foreground">{i + 1}.</span><span>{f}</span></span>} htmlFor={`bank-frage-${i}`}>
                    <Textarea id={`bank-frage-${i}`} rows={2} value={antworten[i] ?? ""} onChange={(e) => setAntworten((a) => ({ ...a, [i]: e.target.value }))} placeholder="Deine Antwort in 2 bis 3 Sätzen, mit Zahlen …" />
                  </Field>
                </li>
              ))}
            </ol>
          </ToolSection>
        }
        result={
          <>
            <ResultPanel variant="ink" kicker="Kreditrechner StartGeld" title="Monatliche Rate nach der tilgungsfreien Zeit" value={eur(rateDanach)} valueHint={`${v.laufzeit} Jahre Laufzeit, ${v.tilgungsfrei} Jahr${v.tilgungsfrei > 1 ? "e" : ""} tilgungsfrei, Sollzins ${v.sollzins.toLocaleString("de-DE")} %`}>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="bank-betrag" className="block text-sm font-medium text-primary-foreground">Kreditbetrag</label>
                  <Input id="bank-betrag" type="number" value={betrag} onChange={(e) => setBetrag(Number(e.target.value) || 0)} className="tabular text-foreground" />
                  <p className="text-xs text-primary-foreground/65">Max. 200.000 €, davon max. 80.000 € Betriebsmittel.</p>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="bank-variante" className="block text-sm font-medium text-primary-foreground">Variante</label>
                  <select id="bank-variante" value={variante} onChange={(e) => setVariante(Number(e.target.value))} className={`${selectCls} text-foreground`}>
                    {STARTGELD.varianten.map((x, i) => (
                      <option key={i} value={i}>{x.laufzeit} Jahre, {x.tilgungsfrei} tilgungsfrei, {x.sollzins} % (eff. {x.effektiv} %)</option>
                    ))}
                  </select>
                </div>
                <dl className="divide-y divide-white/10 border-y border-white/10 text-sm">
                  <div className="flex justify-between gap-4 py-2.5"><dt className="text-primary-foreground/75">Rate in der tilgungsfreien Zeit</dt><dd className="font-semibold tabular">{eur(rateTilgungsfrei)}</dd></div>
                  <div className="flex justify-between gap-4 py-2.5"><dt className="text-primary-foreground/75">Rate danach</dt><dd className="font-semibold tabular">{eur(rateDanach)}</dd></div>
                  <div className="flex justify-between gap-4 py-2.5"><dt className="text-primary-foreground/75">Zinsen gesamt</dt><dd className="font-semibold tabular">{eur(zinsenGesamt)}</dd></div>
                </dl>
                {betrag > STARTGELD.max && <p className="rounded-lg bg-white/10 px-3 py-2 text-xs text-primary-foreground">Über 200.000 €: gerechnet mit dem Höchstbetrag.</p>}
                <p className="text-xs leading-relaxed text-primary-foreground/65">
                  Maximalzinsen laut KfW ab {STARTGELD.konditionenStand}; der Zins wird am Tag der Zusage festgeschrieben.{" "}
                  <a href="https://www.kfw.de/konditionen" target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-0.5 text-primary-foreground underline underline-offset-2">
                    Aktuelle Konditionen <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </p>
                <Button size="lg" className="w-full rounded-xl bg-card font-semibold text-primary shadow-none hover:bg-card/90" onClick={pdf}>
                  <Download className="h-4 w-4" aria-hidden="true" /> Gesprächsmappe als PDF
                </Button>
              </div>
            </ResultPanel>

            <ToolSection
              title="Unterlagen-Checkliste"
              icon={ListChecks}
              actions={<ToneBadge tone={abgehakt === UNTERLAGEN.length ? "success" : "neutral"}><span className="tabular">{abgehakt} / {UNTERLAGEN.length}</span></ToneBadge>}
            >
              <ul className="space-y-2.5 text-sm">
                {UNTERLAGEN.map((u, i) => (
                  <li key={u}>
                    <label className="flex cursor-pointer gap-2.5 leading-snug">
                      <input type="checkbox" checked={!!haken[i]} onChange={(e) => setHaken((h) => ({ ...h, [i]: e.target.checked }))} className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]" />
                      <span className={haken[i] ? "text-muted-foreground line-through" : ""}>{u}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-border/70 pt-4 text-xs leading-relaxed text-muted-foreground">
                Zahlen fürs Gespräch: <Link to="/cockpit/gruendungsunterlagen" className="text-accent-blue hover:underline">Finanzplan-Generator</Link>.
                Tipp der IHK: Unterlagen eine Woche vorher schicken, mindestens zwei Banken ansprechen, Gespräch protokollieren.
              </p>
            </ToolSection>
          </>
        }
      />
      <Callout tone="warning" title="StartGeld (067), Stand 18.06.2026" className="mt-8">
        Für Gründer und kleine Unternehmen unter 5 Jahren am Markt, auch im Nebenerwerb. Antrag über die Hausbank vor Beginn des
        Vorhabens; kein Mindest-Eigenkapital, aber eigene Mittel verbessern die Bonität. Nicht kombinierbar mit anderen KfW-/ERP-Programmen
        für dasselbe Vorhaben, keine Umschuldung.
      </Callout>
    </CockpitShell>
  );
};

export default BankgespraechVorbereitung;
