import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Download } from "lucide-react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FOLIEN, elevatorPitch, felixJuryPrompt, juryFragen, leeresDeck, pruefePitch, type PitchDeck } from "@/lib/pitchDeck";
import { bauePitchPdf } from "@/lib/pitchDeckPdf";

const SPEICHER = "gx-pitchdeck-v1";
const lade = (): PitchDeck => {
  try {
    const roh = localStorage.getItem(SPEICHER);
    return roh ? { ...leeresDeck(), ...JSON.parse(roh) } : leeresDeck();
  } catch {
    return leeresDeck();
  }
};

const PitchDeckGenerator = () => {
  const [d, setD] = useState<PitchDeck>(lade);
  const [kopiert, setKopiert] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem(SPEICHER, JSON.stringify(d));
    } catch {
      /* ohne Zwischenspeicher weiter */
    }
  }, [d]);
  const hinweise = useMemo(() => pruefePitch(d), [d]);
  const pitch = useMemo(() => elevatorPitch(d), [d]);
  const setFolie = (id: keyof PitchDeck["folien"], v: string) => setD((x) => ({ ...x, folien: { ...x.folien, [id]: v } }));
  const beispielLaden = () =>
    setD({ name: "Feldwerk", kontakt: "hallo@beispiel.de", folien: Object.fromEntries(FOLIEN.map((f) => [f.id, f.beispiel])) as PitchDeck["folien"] });

  const kopieren = async () => {
    try {
      await navigator.clipboard.writeText(pitch);
      setKopiert(true);
      setTimeout(() => setKopiert(false), 1500);
    } catch {
      /* Zwischenablage gesperrt */
    }
  };

  return (
    <CockpitShell
      eyebrow="Pitch-Deck · Wettbewerbe, Accelerator, Investoren"
      title="Pitch-Deck-Generator: 10 Folien, die Jurys lesen"
      subtitle="Füll die 10 Folien aus, die jede Jury und jeder Investor erwartet. Der Check zeigt dir live, was fehlt oder zu lang ist – am Ende bekommst du ein 16:9-PDF und deinen 60-Sekunden-Elevator-Pitch."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-8">
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Name des Vorhabens</Label>
              <Input value={d.name} onChange={(e) => setD((x) => ({ ...x, name: e.target.value }))} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">Kontakt (Titelfolie)</Label>
              <Input value={d.kontakt} onChange={(e) => setD((x) => ({ ...x, kontakt: e.target.value }))} placeholder="Name · Mail · Website" className="mt-1" />
            </div>
          </div>
          {FOLIEN.map((f, i) => (
            <div key={f.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="font-bold">
                  {i + 1}. {f.titel} {!f.pflicht && <span className="text-xs font-normal text-muted-foreground">(optional)</span>}
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{f.frage} Ein Punkt pro Zeile.</p>
              <Textarea value={d.folien[f.id]} onChange={(e) => setFolie(f.id, e.target.value)} placeholder={f.beispiel} rows={f.id === "titel" ? 2 : 4} />
            </div>
          ))}
        </div>

        <div className="space-y-4 lg:sticky lg:top-4 self-start">
          <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5">
            <h2 className="font-bold mb-3">Jury-Check</h2>
            <ul className="space-y-1.5 text-xs">
              {hinweise.map((h, i) => (
                <li key={i} className={h.stufe === "ok" ? "text-emerald-700" : h.stufe === "warnung" ? "text-amber-700" : "text-red-700"}>
                  {h.stufe === "ok" ? "✅" : h.stufe === "warnung" ? "⚠️" : "⛔"} {h.text}
                </li>
              ))}
            </ul>
            <Button className="w-full mt-4" onClick={() => bauePitchPdf(d).save(`${(d.name || "pitch-deck").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.pdf`)}>
              <Download className="h-4 w-4 mr-2" /> Pitch-Deck als PDF (16:9)
            </Button>
            <div className="flex justify-between mt-2">
              <button type="button" className="text-[11px] text-accent-blue hover:underline" onClick={beispielLaden}>Beispiel laden</button>
              <button type="button" className="text-[11px] text-muted-foreground hover:underline" onClick={() => setD(leeresDeck())}>Alles leeren</button>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold">60-Sekunden-Pitch</h2>
              <button type="button" onClick={kopieren} className="text-xs text-accent-blue inline-flex items-center gap-1 hover:underline">
                <Copy className="h-3 w-3" /> {kopiert ? "kopiert" : "kopieren"}
              </button>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{pitch || "Füll Problem, Lösung, Traction und Ask aus – dann steht hier dein Elevator-Pitch."}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-bold mb-2">Pitch-Training: Das fragt die Jury</h2>
            <ol className="list-decimal pl-5 space-y-1 text-xs text-muted-foreground">
              {juryFragen(d).map((f) => <li key={f}>{f}</li>)}
            </ol>
            <Link
              to={`/felix?frage=${encodeURIComponent(felixJuryPrompt(d))}`}
              className="mt-3 inline-flex items-center text-xs font-semibold text-accent-blue hover:underline"
            >
              Mit Felix als Jury üben →
            </Link>
          </div>
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
            <strong>Wohin damit?</strong> Offene Bewerbungsfristen für Businessplan-Wettbewerbe, Stipendien und Accelerator
            findest du im <Link to="/gruender-events" className="text-accent-blue hover:underline">Fristen-Radar</Link>. Die Zahlen
            für die letzte Folie liefert der{" "}
            <Link to="/cockpit/gruendungsunterlagen" className="text-accent-blue hover:underline">Finanzplan-Generator</Link>.
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

export default PitchDeckGenerator;
