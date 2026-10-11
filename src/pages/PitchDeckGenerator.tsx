import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, Check, CheckCircle2, Copy, Download, MessagesSquare, Mic, Presentation, RotateCcw, Sparkles, XCircle } from "lucide-react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Callout, Field, ResultPanel, ToneBadge, ToolLayout, ToolSection } from "@/components/cockpit/kit";
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

  const offen = hinweise.filter((h) => h.stufe !== "ok").length;
  const HINWEIS_ICON = {
    ok: { Icon: CheckCircle2, cls: "text-success", label: "erfüllt" },
    warnung: { Icon: AlertTriangle, cls: "text-warning", label: "Warnung" },
    fehlt: { Icon: XCircle, cls: "text-danger", label: "fehlt" },
  } as const;

  return (
    <CockpitShell
      eyebrow="Pitch-Deck · Wettbewerbe, Accelerator, Investoren"
      title="Pitch-Deck-Generator: 10 Folien, die Jurys lesen"
      subtitle="Füll die 10 Folien aus, die jede Jury und jeder Investor erwartet. Der Check zeigt dir live, was fehlt oder zu lang ist. Am Ende bekommst du ein 16:9-PDF und deinen 60-Sekunden-Elevator-Pitch."
      actions={
        <>
          <Button variant="outline" size="sm" onClick={beispielLaden}>
            <Sparkles /> Beispiel laden
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setD(leeresDeck())}>
            <RotateCcw /> Alles leeren
          </Button>
        </>
      }
    >
      <ToolLayout
        inputs={
          <>
            <ToolSection title="Titelfolie" icon={Presentation}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Name des Vorhabens" htmlFor="pd-name">
                  <Input id="pd-name" value={d.name} onChange={(e) => setD((x) => ({ ...x, name: e.target.value }))} />
                </Field>
                <Field label="Kontakt (Titelfolie)" htmlFor="pd-kontakt">
                  <Input id="pd-kontakt" value={d.kontakt} onChange={(e) => setD((x) => ({ ...x, kontakt: e.target.value }))} placeholder="Name, Mail, Website" />
                </Field>
              </div>
            </ToolSection>
            <ol className="space-y-4">
              {FOLIEN.map((f, i) => (
                <li key={f.id}>
                  <ToolSection
                    title={
                      <span className="flex items-center gap-2.5">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold tabular text-foreground">
                          {i + 1}
                        </span>
                        {f.titel}
                        {!f.pflicht && <ToneBadge>optional</ToneBadge>}
                      </span>
                    }
                    description={`${f.frage} Ein Punkt pro Zeile.`}
                  >
                    <Textarea
                      aria-label={`Folie ${i + 1}: ${f.titel}`}
                      value={d.folien[f.id]}
                      onChange={(e) => setFolie(f.id, e.target.value)}
                      placeholder={f.beispiel}
                      rows={f.id === "titel" ? 2 : 4}
                    />
                  </ToolSection>
                </li>
              ))}
            </ol>
          </>
        }
        result={
          <>
            <ResultPanel
              kicker="Jury-Check"
              title={offen === 0 ? "Bereit für die Bewerbung" : "Noch nicht juryreif"}
              value={offen}
              valueHint={offen === 1 ? "offener Punkt" : "offene Punkte"}
            >
              <ul className="space-y-2 text-sm">
                {hinweise.map((h, i) => {
                  const H = HINWEIS_ICON[h.stufe as keyof typeof HINWEIS_ICON] ?? HINWEIS_ICON.warnung;
                  return (
                    <li key={i} className="flex gap-2.5 leading-relaxed">
                      <H.Icon className={`mt-0.5 h-4 w-4 shrink-0 ${H.cls}`} aria-label={H.label} />
                      <span>{h.text}</span>
                    </li>
                  );
                })}
              </ul>
              <Button
                className="mt-5 h-11 w-full rounded-xl bg-gradient-primary font-semibold shadow-glow hover:opacity-95"
                onClick={() => bauePitchPdf(d).save(`${(d.name || "pitch-deck").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.pdf`)}
              >
                <Download /> Pitch-Deck als PDF (16:9)
              </Button>
            </ResultPanel>

            <ToolSection
              title="60-Sekunden-Pitch"
              icon={Mic}
              actions={
                <Button variant="ghost" size="sm" onClick={kopieren} aria-live="polite">
                  {kopiert ? <Check /> : <Copy />} {kopiert ? "kopiert" : "kopieren"}
                </Button>
              }
            >
              {pitch ? (
                <p className="text-sm leading-relaxed text-foreground/85">{pitch}</p>
              ) : (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Füll Problem, Lösung, Traction und Ask aus, dann steht hier dein Elevator-Pitch.
                </p>
              )}
            </ToolSection>

            <ToolSection title="Pitch-Training: Das fragt die Jury" icon={MessagesSquare}>
              <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground marker:text-foreground/50">
                {juryFragen(d).map((f) => <li key={f}>{f}</li>)}
              </ol>
              <Button asChild variant="outline" size="sm" className="mt-4">
                <Link to={`/felix?frage=${encodeURIComponent(felixJuryPrompt(d))}`}>
                  Mit Felix als Jury üben <ArrowRight />
                </Link>
              </Button>
            </ToolSection>

            <Callout tone="info" title="Wohin damit?">
              Offene Bewerbungsfristen für Businessplan-Wettbewerbe, Stipendien und Accelerator findest du im{" "}
              <Link to="/gruender-events" className="font-medium text-accent-blue hover:underline">Fristen-Radar</Link>. Die Zahlen
              für die letzte Folie liefert der{" "}
              <Link to="/cockpit/gruendungsunterlagen" className="font-medium text-accent-blue hover:underline">Finanzplan-Generator</Link>.
            </Callout>
          </>
        }
      />
    </CockpitShell>
  );
};

export default PitchDeckGenerator;
