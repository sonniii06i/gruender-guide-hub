import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Download, ExternalLink } from "lucide-react";
import jsPDF from "jspdf";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { eur } from "@/components/cockpit/AmpelCheck";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { darlehensplan } from "@/lib/finanzplan";

// KfW ERP-Gründerkredit StartGeld (067), Merkblatt Stand 18.06.2026; Konditionen ab 06.10.2026.
// Unterlagen: KfW-Checkliste Risikoprüfung, IHK Darmstadt; Fragen: IHK Limburg.
export const STARTGELD = {
  max: 200000,
  maxBetriebsmittel: 80000,
  haftungsfreistellung: 80,
  varianten: [
    { laufzeit: 5, tilgungsfrei: 1, sollzins: 5.28, effektiv: 5.41 },
    { laufzeit: 10, tilgungsfrei: 2, sollzins: 5.45, effektiv: 5.59 },
  ],
  konditionenStand: "06.10.2026",
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

  return (
    <CockpitShell
      eyebrow="Finanzierung · KfW ERP-Gründerkredit StartGeld"
      title="Bankgespräch vorbereiten: KfW-StartGeld"
      subtitle="Bis 200.000 € Gründerkredit über deine Hausbank, 80 % Haftungsfreistellung für die Bank – auch im Nebenerwerb. Rechne die Raten aus, hak die Unterlagen ab und bereite die Antworten auf die typischen Bankfragen vor."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-6">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-bold mb-3">Die Fragen, die die Bank stellt</h2>
          <div className="space-y-3">
            {FRAGEN.map((f, i) => (
              <div key={f}>
                <Label className="text-sm">{i + 1}. {f}</Label>
                <Textarea rows={2} value={antworten[i] ?? ""} onChange={(e) => setAntworten((a) => ({ ...a, [i]: e.target.value }))} className="mt-1" placeholder="Deine Antwort in 2–3 Sätzen, mit Zahlen" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 lg:sticky lg:top-4 self-start">
          <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5">
            <h2 className="font-bold mb-3">Kreditrechner StartGeld</h2>
            <Label className="text-xs">Kreditbetrag (max. 200.000 €, davon max. 80.000 € Betriebsmittel)</Label>
            <Input type="number" value={betrag} onChange={(e) => setBetrag(Number(e.target.value) || 0)} className="mt-1 bg-background" />
            <Label className="text-xs mt-3 block">Variante</Label>
            <select value={variante} onChange={(e) => setVariante(Number(e.target.value))} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              {STARTGELD.varianten.map((x, i) => (
                <option key={i} value={i}>{x.laufzeit} Jahre, {x.tilgungsfrei} tilgungsfrei – {x.sollzins} % (eff. {x.effektiv} %)</option>
              ))}
            </select>
            <div className="mt-4 space-y-1 text-sm">
              <div className="flex justify-between"><span>Rate tilgungsfreie Zeit</span><strong>{eur(rateTilgungsfrei)}</strong></div>
              <div className="flex justify-between"><span>Rate danach</span><strong>{eur(rateDanach)}</strong></div>
              <div className="flex justify-between"><span>Zinsen gesamt</span><strong>{eur(zinsenGesamt)}</strong></div>
            </div>
            {betrag > STARTGELD.max && <p className="text-xs text-red-700 mt-2">Über 200.000 € – gerechnet mit dem Höchstbetrag.</p>}
            <p className="text-[11px] text-muted-foreground mt-3">
              Maximalzinsen laut KfW ab {STARTGELD.konditionenStand}; der Zins wird am Tag der Zusage festgeschrieben.{" "}
              <a href="https://www.kfw.de/konditionen" target="_blank" rel="noreferrer noopener" className="text-accent-blue hover:underline inline-flex items-center gap-0.5">
                Aktuelle Konditionen <ExternalLink className="h-3 w-3" />
              </a>
            </p>
            <Button className="w-full mt-4" onClick={pdf}><Download className="h-4 w-4 mr-2" /> Gesprächsmappe als PDF</Button>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-bold mb-2 text-sm">Unterlagen-Checkliste</h2>
            <ul className="space-y-1.5 text-xs">
              {UNTERLAGEN.map((u, i) => (
                <li key={u} className="flex gap-2">
                  <input type="checkbox" checked={!!haken[i]} onChange={(e) => setHaken((h) => ({ ...h, [i]: e.target.checked }))} className="mt-0.5" aria-label={u} />
                  <span className={haken[i] ? "line-through text-muted-foreground" : ""}>{u}</span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-muted-foreground mt-3">
              Zahlen fürs Gespräch: <Link to="/cockpit/gruendungsunterlagen" className="text-accent-blue hover:underline">Finanzplan-Generator</Link>.
              Tipp der IHK: Unterlagen eine Woche vorher schicken, mindestens zwei Banken ansprechen, Gespräch protokollieren.
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <strong>StartGeld (067), Stand 18.06.2026:</strong> für Gründer und kleine Unternehmen unter 5 Jahren am Markt, auch im
        Nebenerwerb. Antrag über die Hausbank vor Beginn des Vorhabens; kein Mindest-Eigenkapital, aber eigene Mittel verbessern die
        Bonität. Nicht kombinierbar mit anderen KfW-/ERP-Programmen für dasselbe Vorhaben, keine Umschuldung.
      </div>
    </CockpitShell>
  );
};

export default BankgespraechVorbereitung;
