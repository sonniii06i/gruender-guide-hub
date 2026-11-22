import { useMemo, useState } from "react";
import { Copy, Check, Sparkles, UserRound, ListChecks } from "lucide-react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { FrageZeile } from "@/components/cockpit/AmpelCheck";
import { Callout, ChoiceGroup, ResultPanel, ToneBadge, ToolLayout, ToolSection, type Tone } from "@/components/cockpit/kit";
import { KI_NACHFRIST, kiPflichten, type KiInhalt, type KiPflicht, type KiRolle } from "@/lib/relevanz2027";
import { Q, STAND } from "@/data/stichtage";

const datum = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });

const INHALTE: { id: KiInhalt; label: string }[] = [
  { id: "chatbot", label: "Chatbot oder KI-Assistent" },
  { id: "text", label: "Texte" },
  { id: "bild", label: "Bilder" },
  { id: "video", label: "Videos" },
  { id: "stimme", label: "Stimmen und Audio" },
  { id: "emotion", label: "Emotionserkennung oder biometrische Kategorisierung" },
];

const STUFE: Record<KiPflicht["stufe"], { text: string; tone: Tone }> = {
  ja: { text: "Kennzeichnen", tone: "danger" },
  eingeschraenkt: { text: "Hinweis genügt", tone: "warning" },
  nein: { text: "Keine Pflicht für dich", tone: "success" },
  anbieter: { text: "Pflicht beim Anbieter", tone: "info" },
  offen: { text: "Noch offen", tone: "neutral" },
};

const Baustein = ({ text }: { text: string }) => {
  const [kopiert, setKopiert] = useState(false);
  return (
    <div className="mt-2 flex items-start justify-between gap-3 rounded-md border border-border bg-background/60 px-3 py-2 text-sm">
      <span className="min-w-0">„{text}“</span>
      <button
        type="button"
        className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-accent-blue hover:underline"
        onClick={() => {
          navigator.clipboard?.writeText(text).then(() => {
            setKopiert(true);
            setTimeout(() => setKopiert(false), 1500);
          }).catch(() => undefined);
        }}
      >
        {kopiert ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
        {kopiert ? "Kopiert" : "Kopieren"}
      </button>
    </div>
  );
};

const KiKennzeichnung = () => {
  const [rolle, setRolle] = useState<KiRolle>("betreiber");
  const [inhalte, setInhalte] = useState<KiInhalt[]>(["bild"]);
  const [f, setF] = useState<{ vorStichtag?: boolean; deepfake?: boolean; kunst?: boolean; textOeffentlich?: boolean; redaktion?: boolean }>({});
  const pflichten = useMemo(() => kiPflichten({ rolle, inhalte, ...f }), [rolle, inhalte, f]);
  const toggle = (id: KiInhalt) => setInhalte((x) => (x.includes(id) ? x.filter((y) => y !== id) : [...x, id]));
  const setze = (k: keyof typeof f) => (v: boolean) => setF((x) => ({ ...x, [k]: v }));
  const medien = inhalte.some((i) => i === "bild" || i === "video" || i === "stimme");
  const anzahlJa = pflichten.filter((p) => p.stufe === "ja" || p.stufe === "eingeschraenkt").length;
  const nachfrist = rolle === "anbieter" && f.vorStichtag && inhalte.some((i) => i !== "chatbot" && i !== "emotion");

  return (
    <CockpitShell
      eyebrow="KI-Kennzeichnung · Stand 22.11.2026"
      title="Muss ich KI-Inhalte kennzeichnen?"
      subtitle="Seit 02.08.2026 gelten die Transparenzpflichten der KI-Verordnung (Art. 50). Wer ein KI-Tool vor diesem Tag auf den Markt gebracht hat, muss die maschinenlesbare Kennzeichnung bis 02.12.2026 nachrüsten. Drei Fragen, dann weißt du, was du kennzeichnen musst, wie und auf welcher Grundlage."
    >
      <ToolLayout
        className="mb-8"
        inputs={
          <>
            <ToolSection icon={UserRound} title="1. Wie nutzt du KI?" description="Die Pflichten hängen an deiner Rolle, nicht am Tool.">
              <ChoiceGroup<KiRolle>
                label="Rolle"
                value={rolle}
                onChange={setRolle}
                options={[
                  { value: "betreiber", label: "Ich setze KI-Tools beruflich ein", hint: "z. B. Bilder, Texte oder Videos für dein Business" },
                  { value: "anbieter", label: "Ich biete ein eigenes KI-Tool an", hint: "selbst oder für dich entwickelt, unter deinem Namen oder deiner Marke" },
                  { value: "privat", label: "Nur privat", hint: "keine berufliche Nutzung" },
                ]}
              />
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Anbieter ist, wer ein KI-System entwickelt oder entwickeln lässt und unter eigenem Namen oder eigener Marke in Verkehr bringt (Art. 3 Nr. 3). Betreiber ist, wer ein KI-System in eigener Verantwortung nutzt, außer rein privat (Art. 3 Nr. 4).
              </p>
            </ToolSection>

            {rolle !== "privat" && (
              <ToolSection icon={Sparkles} title={rolle === "anbieter" ? "2. Was erzeugt dein Tool?" : "2. Was erzeugst du mit KI?"} description="Mehrfachauswahl.">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {INHALTE.map((i) => (
                    <label key={i.id} className="flex cursor-pointer items-start gap-2.5 rounded-md border border-border bg-background/60 px-3 py-2.5 text-sm hover:border-foreground/20">
                      <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]" checked={inhalte.includes(i.id)} onChange={() => toggle(i.id)} />
                      {i.label}
                    </label>
                  ))}
                </div>
              </ToolSection>
            )}

            {rolle !== "privat" && inhalte.length > 0 && (
              <ToolSection icon={ListChecks} title="3. Die Details" bodyClassName="py-1 md:py-2">
                <div className="divide-y divide-border">
                  {rolle === "anbieter" && (
                    <FrageZeile frage="War dein Tool schon vor dem 02.08.2026 auf dem Markt?" hilfe="Dann gilt für die maschinenlesbare Kennzeichnung die Nachfrist bis 02.12.2026 (Art. 111 Abs. 4)." wert={f.vorStichtag ?? null} setze={setze("vorStichtag")} />
                  )}
                  {rolle === "betreiber" && medien && (
                    <FrageZeile frage="Zeigt der Inhalt echte Personen, Orte, Gegenstände oder Ereignisse so, dass man ihn für echt halten könnte?" hilfe="Das ist ein Deepfake im Sinne von Art. 3 Nr. 60." wert={f.deepfake ?? null} setze={setze("deepfake")} />
                  )}
                  {rolle === "betreiber" && medien && f.deepfake && (
                    <FrageZeile frage="Ist es offensichtlich ein künstlerisches, kreatives, satirisches oder fiktionales Werk?" wert={f.kunst ?? null} setze={setze("kunst")} />
                  )}
                  {rolle === "betreiber" && inhalte.includes("text") && (
                    <FrageZeile frage="Veröffentlichst du die Texte, um die Öffentlichkeit über Themen von öffentlichem Interesse zu informieren?" hilfe="Zum Beispiel Nachrichten oder Berichte zu gesellschaftlichen Themen." wert={f.textOeffentlich ?? null} setze={setze("textOeffentlich")} />
                  )}
                  {rolle === "betreiber" && inhalte.includes("text") && f.textOeffentlich && (
                    <FrageZeile frage="Prüft ein Mensch die Texte vor der Veröffentlichung, und trägt jemand die redaktionelle Verantwortung?" wert={f.redaktion ?? null} setze={setze("redaktion")} />
                  )}
                  {!(rolle === "anbieter") && !medien && !inhalte.includes("text") && (
                    <p className="py-3.5 text-sm text-muted-foreground">Keine weiteren Fragen für deine Auswahl.</p>
                  )}
                </div>
              </ToolSection>
            )}
          </>
        }
        result={
          <>
            <ResultPanel
              kicker="Dein Ergebnis"
              title={rolle === "privat" ? "Keine Pflichten aus Art. 50" : inhalte.length === 0 ? "Wähl aus, was du mit KI erzeugst" : pflichten.some((p) => p.stufe === "offen") && !anzahlJa ? "Noch ein paar Fragen offen" : anzahlJa ? `${anzahlJa} ${anzahlJa === 1 ? "Fall braucht" : "Fälle brauchen"} einen Hinweis` : "Für deine Auswahl keine Kennzeichnung durch dich"}
            >
              <ul className="space-y-4">
                {pflichten.map((p) => (
                  <li key={p.inhalt} className="text-sm leading-relaxed">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{p.titel}</span>
                      <ToneBadge tone={STUFE[p.stufe].tone}>{STUFE[p.stufe].text}</ToneBadge>
                    </div>
                    <p className="mt-1 text-foreground/85">{p.was}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {p.grundlage}
                      {p.ab && <> · gilt ab {datum(p.ab)}</>}
                    </p>
                    {p.baustein && (p.stufe === "ja" || p.stufe === "eingeschraenkt" || p.stufe === "anbieter") && <Baustein text={p.baustein} />}
                  </li>
                ))}
              </ul>
            </ResultPanel>
            {nachfrist && (
              <Callout tone="danger" title={`Frist: ${datum(KI_NACHFRIST)}`}>
                Für KI-Tools, die vor dem 02.08.2026 auf dem Markt waren, endet die Nachfrist für die maschinenlesbare Kennzeichnung (Art. 50 Abs. 2) am 02.12.2026.
              </Callout>
            )}
            {pflichten.some((p) => p.stufe === "ja" || p.stufe === "eingeschraenkt") && (
              <Callout tone="info" title="Wann und wie">
                Der Hinweis muss klar und eindeutig sein und spätestens bei der ersten Interaktion oder beim ersten Kontakt mit dem Inhalt erscheinen. Er muss barrierefrei sein (Art. 50 Abs. 5). Einen festen Wortlaut schreibt die Verordnung nicht vor; die Textbausteine sind unser Vorschlag.
              </Callout>
            )}
          </>
        }
      />

      <Callout tone="warning" title="Noch offen">
        Wie Art. 50 Abs. 4 bei Werbe-Creatives in der Praxis ausgelegt wird, ist noch nicht geklärt. Die Leitlinien der EU-Kommission dazu haben wir nicht ausgewertet. Pflichten für Hochrisiko-KI (Anhang III ab 02.12.2027, Anhang I ab 02.08.2028) deckt dieser Check nicht ab.
      </Callout>

      <Stand2026Footer stand={STAND} sources={[Q.ki_vo, Q.ki_omnibus]} note="Wortlaut nach dem Amtsblatt der EU (deutsche Fassung). Die Verordnung (EU) 2026/1744 ändert Art. 50 nur in Abs. 7 und ergänzt die Nachfrist in Art. 111 Abs. 4." />
    </CockpitShell>
  );
};

export default KiKennzeichnung;
