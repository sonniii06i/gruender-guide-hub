import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Copy, ListChecks, Pause, Play, RotateCcw, Timer, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { HubNav } from "@/components/landing/HubNav";
import { PageHeader } from "@/components/landing/PageHeader";
import { PublicSection, InfoCard, FaqList, CtaBand, ctaPrimaryOnInk } from "@/components/public/PublicBlocks";
import { breadcrumbSchema, faqSchema, howToSchema } from "@/lib/freetools/schema";

const SITE = "https://gruenderx.de";

export const PHASEN = [
  { min: 20, titel: "Problem & Idee schärfen", ziel: "Ein Satz: Wer hat welches Problem, und was ist das Kleinste, das es löst?" },
  { min: 20, titel: "MVP festlegen", ziel: "Genau ein Ablauf: eine Eingabe, ein Ergebnis. Alles andere streichen." },
  { min: 90, titel: "Bauen", ziel: "Mit KI-Werkzeug den Kernablauf bauen, alle 20 Minuten lauffähig halten." },
  { min: 25, titel: "Testen & fixen", ziel: "Drei Leute ausprobieren lassen, nur die größte Hürde beheben." },
  { min: 25, titel: "Pitch & Demo", ziel: "Online stellen, 60-Sekunden-Pitch üben, Demo zweimal durchklicken." },
];
const GESAMT = PHASEN.reduce((n, p) => n + p.min, 0) * 60;

const PROMPTS = [
  {
    titel: "1 · Idee schärfen",
    text: "Ich habe 3 Stunden, um einen Prototyp zu bauen. Meine Idee: [IDEE]. Zielgruppe: [WER]. Stell mir 5 kritische Fragen zum Problem, dann schlag mir die kleinste Version vor, die man in 90 Minuten bauen kann und die das Problem schon spürbar löst. Antworte knapp.",
  },
  {
    titel: "2 · MVP-Spezifikation",
    text: "Schreib eine Ein-Seiten-Spezifikation für einen Web-Prototyp: [MVP IN EINEM SATZ]. Genau ein Nutzerablauf, Liste der Bildschirme (max. 3), Datenfelder, was bewusst NICHT gebaut wird. Format: Markdown-Checkliste, die ich Schritt für Schritt abhaken kann.",
  },
  {
    titel: "3 · Bauen (Lovable, Bolt, v0 oder Claude Code)",
    text: "Baue folgende Web-App nach dieser Spezifikation: [SPEZIFIKATION EINFÜGEN]. Nutze React und Tailwind, kein Login, Daten im Browser speichern. Starte mit dem Kernablauf und einer schlichten, gut lesbaren Oberfläche auf Deutsch. Nach jedem Schritt muss die App lauffähig sein.",
  },
  {
    titel: "4 · Fehler beheben",
    text: "Beim Testen ist Folgendes passiert: [WAS DER NUTZER GETAN HAT] – erwartet war [ERWARTET], passiert ist [TATSÄCHLICH]. Fehlermeldung: [FEHLER]. Finde die Ursache und behebe nur das, ohne andere Teile umzubauen.",
  },
  {
    titel: "5 · Pitch",
    text: "Schreib mir einen 60-Sekunden-Pitch für meinen Hackathon-Prototyp: Problem [PROBLEM], Lösung [LÖSUNG], was die Demo zeigt [DEMO], wer zahlen würde [ZIELGRUPPE]. Struktur: Hook, Problem, Demo-Moment, warum jetzt, nächster Schritt. Maximal 150 Wörter, gesprochene Sprache.",
  },
];

const WERKZEUGE = [
  { name: "Claude", url: "https://claude.ai", wofuer: "Idee schärfen, Spezifikation, Code und Texte" },
  { name: "Claude Code", url: "https://claude.com/product/claude-code", wofuer: "programmieren im Terminal oder Editor" },
  { name: "Lovable", url: "https://lovable.dev", wofuer: "komplette Web-App aus einer Beschreibung" },
  { name: "Cursor", url: "https://cursor.com", wofuer: "KI-Editor für eigenen Code" },
  { name: "Bolt", url: "https://bolt.new", wofuer: "Web-App im Browser bauen und teilen" },
  { name: "v0", url: "https://v0.app", wofuer: "Oberflächen aus Text erzeugen" },
];

const PACKLISTE = [
  "Konten bei den Werkzeugen vorher anlegen und einloggen – nicht in der ersten halben Stunde",
  "Ein Problem notieren, das du oder jemand in deinem Umfeld wirklich hat",
  "Laptop-Ladegerät, Mehrfachstecker, Kopfhörer",
  "Testdaten bereitlegen (Beispieltexte, Bilder, eine kleine Tabelle)",
  "Prüfen, ob dein Wunschname frei ist – Domain und Marke",
];

const faqs = [
  { q: "Kann ich ohne Programmierkenntnisse in 3 Stunden einen Prototyp bauen?", a: "Ja, mit KI-Werkzeugen wie Lovable, Bolt oder Claude entsteht ein klickbarer Web-Prototyp aus Beschreibungen. Entscheidend ist, dass du den Umfang radikal klein hältst: ein Ablauf, eine Eingabe, ein Ergebnis." },
  { q: "Wie teile ich die 3 Stunden auf?", a: "20 Minuten Problem, 20 Minuten MVP festlegen, 90 Minuten bauen, 25 Minuten testen und 25 Minuten für Pitch und Demo. Der Timer auf dieser Seite führt dich durch die Phasen." },
  { q: "Was mache ich nach dem Hackathon mit dem Prototyp?", a: "Wenn Leute ihn nutzen oder bezahlen wollen: Namen sichern, Rechtsform wählen und anmelden. Für Wettbewerbe und Stipendien lohnt sich ein Pitch-Deck – offene Fristen stehen im Fristen-Radar." },
];

const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export default function HackathonStarterKit() {
  const [laeuft, setLaeuft] = useState(false);
  const [vergangen, setVergangen] = useState(0);
  const [kopiert, setKopiert] = useState<number | null>(null);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (!laeuft) return;
    ref.current = window.setInterval(() => setVergangen((s) => Math.min(GESAMT, s + 1)), 1000);
    return () => {
      if (ref.current) window.clearInterval(ref.current);
    };
  }, [laeuft]);
  useEffect(() => {
    if (vergangen >= GESAMT) setLaeuft(false);
  }, [vergangen]);

  let rest = vergangen;
  let aktiv = PHASEN.length - 1;
  for (let i = 0; i < PHASEN.length; i++) {
    if (rest < PHASEN[i].min * 60) {
      aktiv = i;
      break;
    }
    rest -= PHASEN[i].min * 60;
  }
  const phaseRest = vergangen >= GESAMT ? 0 : PHASEN[aktiv].min * 60 - rest;

  const kopieren = async (i: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setKopiert(i);
      setTimeout(() => setKopiert(null), 1500);
    } catch {
      /* Zwischenablage gesperrt */
    }
  };

  const jsonLd = [
    breadcrumbSchema([
      { name: "Start", url: `${SITE}/` },
      { name: "Gründer-Events", url: `${SITE}/gruender-events` },
      { name: "Hackathon-Starter-Kit", url: `${SITE}/hackathon-starter-kit` },
    ]),
    {
      ...howToSchema(
        "In 3 Stunden einen Prototyp bauen",
        "Zeitplan für Hackathons und Build-Sessions mit KI-Werkzeugen.",
        PHASEN.map((p) => ({ name: `${p.titel} (${p.min} Min.)`, text: p.ziel })),
      ),
      totalTime: "PT3H",
    },
    faqSchema(faqs),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Hackathon-Starter-Kit: In 3 Stunden zum Prototyp | GründerX"
        description="Zeitplan mit Timer, Prompt-Vorlagen für Claude, Lovable und Cursor, Packliste und 60-Sekunden-Pitch: So baust du auf Hackathons und Build-Sessions in 3 Stunden einen Prototyp."
        path="/hackathon-starter-kit"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main>
        <PageHeader
          width="max-w-4xl"
          kicker={
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[13px] font-medium text-muted-foreground shadow-card">
              <Timer className="h-3.5 w-3.5 text-accent-blue" aria-hidden="true" /> Für Hackathons & Build-Sessions
            </span>
          }
          title="In 3 Stunden zum Prototyp"
          lead={
            <p>
              Zeitplan mit Timer, Prompt-Vorlagen zum Kopieren und eine Packliste, damit du auf dem nächsten Hackathon nicht
              die erste Stunde mit Planen verlierst.
            </p>
          }
        />

        <div className="container max-w-4xl space-y-12 px-4 py-12 md:py-16">
          {/* Timer */}
          <section aria-label="Zeitplan mit Timer" className="overflow-hidden rounded-2xl bg-ink text-primary-foreground shadow-soft">
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-brand-green-glow tabular">Phase {aktiv + 1} von {PHASEN.length}</p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight">{PHASEN[aktiv].titel}</p>
                  <p className="mt-1 max-w-md text-sm leading-relaxed text-primary-foreground/70">{PHASEN[aktiv].ziel}</p>
                </div>
                <div className="text-left sm:text-right" aria-live="polite">
                  <p className="text-5xl font-semibold tracking-[-0.04em] tabular md:text-6xl">{mmss(phaseRest)}</p>
                  <p className="mt-1 text-sm text-primary-foreground/65 tabular">gesamt noch {mmss(GESAMT - vergangen)}</p>
                </div>
              </div>
              <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuemin={0} aria-valuemax={GESAMT} aria-valuenow={vergangen} aria-label="Fortschritt">
                <div className="h-full origin-left rounded-full bg-brand-green-glow transition-transform duration-500" style={{ transform: `scaleX(${vergangen / GESAMT})` }} />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button onClick={() => setLaeuft((l) => !l)} disabled={vergangen >= GESAMT} className="h-11 rounded-xl bg-card px-5 font-semibold text-primary shadow-none hover:bg-card/90">
                  {laeuft ? <Pause className="mr-1 h-4 w-4" /> : <Play className="mr-1 h-4 w-4" />}
                  {laeuft ? "Pause" : vergangen ? "Weiter" : "Start"}
                </Button>
                <Button variant="outline" onClick={() => { setLaeuft(false); setVergangen(0); }} className="h-11 rounded-xl border-white/20 bg-transparent px-5 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                  <RotateCcw className="mr-1 h-4 w-4" /> Zurücksetzen
                </Button>
              </div>
            </div>
            <ol className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-5">
              {PHASEN.map((p, i) => (
                <li
                  key={p.titel}
                  aria-current={i === aktiv ? "step" : undefined}
                  className={`border-white/10 px-5 py-3.5 text-sm sm:border-l sm:first:border-l-0 [&:not(:first-child)]:border-t sm:[&:not(:first-child)]:border-t-0 ${i === aktiv ? "bg-white/[0.08]" : ""} ${i < aktiv ? "text-primary-foreground/50" : ""}`}
                >
                  <div className="font-semibold">{p.titel}</div>
                  <div className="text-primary-foreground/60 tabular">{p.min} Min.</div>
                </li>
              ))}
            </ol>
          </section>

          {/* Prompts */}
          <PublicSection title="Prompt-Vorlagen zum Kopieren">
            <div className="space-y-3">
              {PROMPTS.map((p, i) => (
                <div key={p.titel} className="rounded-xl border border-border bg-card p-4 shadow-card md:p-5">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold">{p.titel}</h3>
                    <Button type="button" size="sm" variant="outline" onClick={() => kopieren(i, p.text)} className="h-8 shrink-0" aria-live="polite">
                      <Copy className="h-3.5 w-3.5" /> <span className="capitalize">{kopiert === i ? "kopiert" : "kopieren"}</span>
                    </Button>
                  </div>
                  <p className="rounded-lg bg-secondary/60 p-3 font-mono text-[13px] leading-relaxed text-foreground/80">{p.text}</p>
                </div>
              ))}
            </div>
          </PublicSection>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoCard title="Werkzeuge" icon={Wrench} as="section">
              <ul className="space-y-2.5 text-sm leading-relaxed">
                {WERKZEUGE.map((w) => (
                  <li key={w.name}>
                    <a href={w.url} target="_blank" rel="noreferrer noopener" className="font-semibold text-accent-blue hover:underline">{w.name}</a>
                    <span className="text-muted-foreground">: {w.wofuer}</span>
                  </li>
                ))}
              </ul>
            </InfoCard>
            <InfoCard title="Packliste für den Abend vorher" icon={ListChecks} as="section">
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {PACKLISTE.map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                Namen prüfen: <Link to="/tools/brand-check" className="font-medium text-accent-blue hover:underline">Marken- und Domain-Check</Link>
              </p>
            </InfoCard>
          </div>

          <PublicSection title="Nach dem Hackathon: vom Prototyp zur Firma">
            <ol className="space-y-3">
              {[
                <>Zehn potenziellen Kunden den Prototyp zeigen und fragen, ob sie dafür zahlen würden.</>,
                <>Pitch-Deck bauen und dich bei einem Wettbewerb oder Accelerator bewerben. Fristen im <Link to="/gruender-events" className="font-medium text-accent-blue hover:underline">Fristen-Radar</Link>.</>,
                <>Rechtsform wählen: <Link to="/rechtsform-finden" className="font-medium text-accent-blue hover:underline">Rechtsform-Finder</Link>.</>,
                <>Finanzierung planen: <Link to="/gruendungskosten-rechner" className="font-medium text-accent-blue hover:underline">Gründungskosten-Rechner</Link> und Förderung prüfen.</>,
              ].map((x, i) => (
                <li key={i} className="flex gap-3.5 rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold text-foreground tabular">{i + 1}</span>
                  <span className="pt-0.5">{x}</span>
                </li>
              ))}
            </ol>
          </PublicSection>

          <CtaBand
            title="Der nächste Hackathon in deiner Nähe"
            actions={
              <Button asChild size="lg" className={ctaPrimaryOnInk}>
                <Link to="/gruender-events">Zu den Gründer-Events <ArrowRight /></Link>
              </Button>
            }
          >
            Täglich aktualisiert: Hackathons, Build-Days und KI-Meetups in ganz Deutschland.
          </CtaBand>

          <PublicSection title="Häufige Fragen">
            <FaqList items={faqs} />
          </PublicSection>
          <HubNav show={["tools", "guides", "ratgeber"]} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
