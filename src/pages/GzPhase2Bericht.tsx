import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { eur } from "@/components/cockpit/AmpelCheck";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Bericht für Phase 2 des Gründungszuschusses (§ 94 Abs. 2 SGB III, FW 94.10–94.13):
// Pflicht: Aktivitäten + Einnahmen/Ausgaben der vergangenen Monate; optional Ausblick,
// Auftragseingänge, Akquise. Deckt das Einkommen schon Lebensunterhalt und soziale
// Sicherung, entfällt Phase 2 regelmäßig (FW 94.13).

type Monat = { einnahmen: number; ausgaben: number };
type Bericht = {
  name: string;
  kundennummer: string;
  start: string;
  stunden: number;
  monate: Monat[];
  aktivitaeten: string;
  auftraege: string;
  ausblick: string;
  lebenshaltung: number;
};

const SPEICHER = "gx-gz-phase2-v1";
const LEER: Bericht = {
  name: "", kundennummer: "", start: "", stunden: 40,
  monate: Array.from({ length: 6 }, () => ({ einnahmen: 0, ausgaben: 0 })),
  aktivitaeten: "", auftraege: "", ausblick: "", lebenshaltung: 1800,
};

const lade = (): Bericht => {
  try {
    const r = localStorage.getItem(SPEICHER);
    return r ? { ...LEER, ...JSON.parse(r) } : LEER;
  } catch {
    return LEER;
  }
};

export const phase2Auswertung = (b: Bericht) => {
  const einnahmen = b.monate.reduce((n, m) => n + (m.einnahmen || 0), 0);
  const ausgaben = b.monate.reduce((n, m) => n + (m.ausgaben || 0), 0);
  const letzte3 = b.monate.slice(-3).reduce((n, m) => n + (m.einnahmen || 0) - (m.ausgaben || 0), 0) / 3;
  const hinweise: { stufe: "ok" | "warnung" | "kritisch"; text: string }[] = [];
  if (b.stunden < 15) hinweise.push({ stufe: "kritisch", text: "Unter 15 Wochenstunden gilt die Tätigkeit nicht als hauptberuflich – Phase 2 wird so abgelehnt." });
  else hinweise.push({ stufe: "ok", text: `${b.stunden} Wochenstunden – hauptberuflich.` });
  if (!b.aktivitaeten.trim()) hinweise.push({ stufe: "kritisch", text: "Beschreibe deine unternehmerischen Aktivitäten – das ist Pflichtinhalt des Berichts." });
  if (einnahmen === 0) hinweise.push({ stufe: "warnung", text: "Noch keine Einnahmen: Zeig dann besonders konkret, welche Aufträge in Aussicht sind und was du für die Akquise tust." });
  if (letzte3 >= b.lebenshaltung && b.lebenshaltung > 0)
    hinweise.push({
      stufe: "warnung",
      text: `Dein Gewinn der letzten drei Monate (Ø ${eur(letzte3)}) deckt deine Lebenshaltung (${eur(b.lebenshaltung)}). Dann gilt Phase 2 meist als nicht nötig (FW 94.13) – ehrlich bleiben, aber Schwankungen und Investitionen erklären.`,
    });
  return { einnahmen, ausgaben, ergebnis: einnahmen - ausgaben, letzte3, hinweise };
};

const GzPhase2Bericht = () => {
  const [b, setB] = useState<Bericht>(lade);
  useEffect(() => {
    try {
      localStorage.setItem(SPEICHER, JSON.stringify(b));
    } catch {
      /* ohne Zwischenspeicher */
    }
  }, [b]);
  const a = useMemo(() => phase2Auswertung(b), [b]);
  const set = <K extends keyof Bericht>(k: K, v: Bericht[K]) => setB((x) => ({ ...x, [k]: v }));
  const setMonat = (i: number, k: keyof Monat, v: number) => setB((x) => ({ ...x, monate: x.monate.map((m, j) => (j === i ? { ...m, [k]: v } : m)) }));

  const pdf = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Bericht über die bisherige Geschäftstätigkeit", 14, 18);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(["Antrag auf Gründungszuschuss Phase 2 (§ 94 Abs. 2 SGB III)", b.name && `Name: ${b.name}`, b.kundennummer && `Kundennummer: ${b.kundennummer}`, b.start && `Beginn der Selbstständigkeit: ${b.start.split("-").reverse().join(".")}`, `Arbeitszeit: ca. ${b.stunden} Stunden pro Woche`].filter(Boolean) as string[], 14, 26);
    let y = 52;
    const abschnitt = (titel: string, text: string) => {
      if (!text.trim()) return;
      doc.setFont("helvetica", "bold");
      doc.text(titel, 14, y);
      doc.setFont("helvetica", "normal");
      const z = doc.splitTextToSize(text.trim(), 180);
      doc.text(z, 14, y + 5);
      y += 9 + z.length * 4.6;
    };
    abschnitt("1. Unternehmerische Aktivitäten", b.aktivitaeten);
    doc.setFont("helvetica", "bold");
    doc.text("2. Einnahmen und Ausgaben der vergangenen Monate", 14, y);
    autoTable(doc, {
      startY: y + 3,
      head: [["Monat", "Einnahmen (€)", "Ausgaben (€)", "Ergebnis (€)"]],
      body: [
        ...b.monate.map((m, i) => [`Monat ${i + 1}`, Math.round(m.einnahmen).toLocaleString("de-DE"), Math.round(m.ausgaben).toLocaleString("de-DE"), Math.round(m.einnahmen - m.ausgaben).toLocaleString("de-DE")]),
        ["Summe", Math.round(a.einnahmen).toLocaleString("de-DE"), Math.round(a.ausgaben).toLocaleString("de-DE"), Math.round(a.ergebnis).toLocaleString("de-DE")],
      ],
      styles: { fontSize: 9 },
      columnStyles: { 1: { halign: "right" }, 2: { halign: "right" }, 3: { halign: "right" } },
    });
    y = ((doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? y) + 10;
    abschnitt("3. Auftragseingänge und Akquise", b.auftraege);
    abschnitt("4. Ausblick auf die nächsten Monate", b.ausblick);
    doc.text("Ort, Datum, Unterschrift: ______________________________", 14, Math.min(y + 8, 280));
    doc.save("gruendungszuschuss-phase2-bericht.pdf");
  };

  return (
    <CockpitShell
      eyebrow="Gründungszuschuss · Phase 2"
      title="Bericht für Phase 2 des Gründungszuschusses"
      subtitle="Nach sechs Monaten gibt es auf Antrag weitere 9 × 300 € – wenn du eine intensive, hauptberufliche Geschäftstätigkeit belegst. Hier erstellst du den Bericht, den die Agentur dafür sehen will, als PDF."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 mb-8">
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="col-span-2"><Label className="text-xs">Name</Label><Input value={b.name} onChange={(e) => set("name", e.target.value)} className="mt-1" /></div>
            <div><Label className="text-xs">Kundennummer der Agentur</Label><Input value={b.kundennummer} onChange={(e) => set("kundennummer", e.target.value)} className="mt-1" /></div>
            <div><Label className="text-xs">Start der Selbstständigkeit</Label><Input type="date" value={b.start} onChange={(e) => set("start", e.target.value)} className="mt-1" /></div>
            <div><Label className="text-xs">Wochenstunden</Label><Input type="number" value={b.stunden} onChange={(e) => set("stunden", Number(e.target.value) || 0)} className="mt-1" /></div>
            <div><Label className="text-xs">Lebenshaltung / Monat (€)</Label><Input type="number" value={b.lebenshaltung} onChange={(e) => set("lebenshaltung", Number(e.target.value) || 0)} className="mt-1" /></div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-bold mb-3">Einnahmen und Ausgaben (netto) der vergangenen Monate</h2>
            <div className="grid grid-cols-[80px_1fr_1fr] gap-2 text-xs items-center">
              <span />
              <span className="text-muted-foreground">Einnahmen €</span>
              <span className="text-muted-foreground">Ausgaben €</span>
              {b.monate.map((m, i) => (
                <div key={i} className="contents">
                  <span>Monat {i + 1}</span>
                  <Input type="number" value={m.einnahmen} onChange={(e) => setMonat(i, "einnahmen", Number(e.target.value) || 0)} className="h-9" />
                  <Input type="number" value={m.ausgaben} onChange={(e) => setMonat(i, "ausgaben", Number(e.target.value) || 0)} className="h-9" />
                </div>
              ))}
            </div>
          </div>
          {(
            [
              ["aktivitaeten", "Unternehmerische Aktivitäten (Pflicht)", "Was hast du in den Monaten gemacht? Kunden, Projekte, Marketing, Website, Netzwerk, Messen, Investitionen …"],
              ["auftraege", "Auftragseingänge und Akquise", "Welche Aufträge sind fest, welche Angebote offen, wie gewinnst du Kunden?"],
              ["ausblick", "Ausblick auf die nächsten Monate", "Was planst du, wie entwickeln sich Umsatz und Kosten, wann trägst du dich selbst?"],
            ] as const
          ).map(([k, t, ph]) => (
            <div key={k} className="rounded-2xl border border-border bg-card p-5">
              <Label className="text-sm font-bold">{t}</Label>
              <Textarea rows={5} value={b[k]} onChange={(e) => set(k, e.target.value)} placeholder={ph} className="mt-2" />
            </div>
          ))}
        </div>
        <div className="space-y-4 lg:sticky lg:top-4 self-start">
          <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5">
            <h2 className="font-bold mb-2">Prüfung</h2>
            <ul className="space-y-1.5 text-xs">
              {a.hinweise.map((h) => (
                <li key={h.text} className={h.stufe === "ok" ? "text-emerald-700" : h.stufe === "warnung" ? "text-amber-700" : "text-red-700"}>
                  {h.stufe === "ok" ? "✅" : h.stufe === "warnung" ? "⚠️" : "⛔"} {h.text}
                </li>
              ))}
            </ul>
            <div className="mt-3 text-sm space-y-1">
              <div className="flex justify-between"><span>Einnahmen gesamt</span><strong>{eur(a.einnahmen)}</strong></div>
              <div className="flex justify-between"><span>Ausgaben gesamt</span><strong>{eur(a.ausgaben)}</strong></div>
              <div className="flex justify-between"><span>Ergebnis</span><strong>{eur(a.ergebnis)}</strong></div>
            </div>
            <Button className="w-full mt-4" onClick={pdf}><Download className="h-4 w-4 mr-2" /> Bericht als PDF</Button>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-xs leading-relaxed">
            Den Antrag stellst du online in der Vorgangsübersicht deines Kontos bei der Arbeitsagentur, im Anschluss an Phase 1.
            Phase 2 ist eine Ermessensleistung (9 × 300 €). Ist die Lage unklar, kann die Agentur eine neue Stellungnahme einer
            fachkundigen Stelle verlangen – die Zahlen dafür liefert der{" "}
            <Link to="/cockpit/gruendungsunterlagen" className="text-accent-blue hover:underline">Finanzplan-Generator</Link>.
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

export default GzPhase2Bericht;
