import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Copy, Pause, Play, RotateCcw, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { HubNav } from "@/components/landing/HubNav";
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

      <section className="relative pt-28 pb-8 md:pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Badge variant="secondary" className="mb-4">
            <Timer className="mr-1.5 h-3.5 w-3.5" /> Für Hackathons & Build-Sessions
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">In 3 Stunden zum Prototyp</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Zeitplan mit Timer, Prompt-Vorlagen zum Kopieren und eine Packliste – damit du auf dem nächsten Hackathon nicht
            die erste Stunde mit Planen verlierst.
          </p>
        </div>
      </section>

      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Timer */}
          <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-5">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Phase {aktiv + 1} von {PHASEN.length}</div>
                <div className="text-xl font-bold">{PHASEN[aktiv].titel}</div>
                <div className="text-sm text-muted-foreground">{PHASEN[aktiv].ziel}</div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold tabular-nums">{mmss(phaseRest)}</div>
                <div className="text-xs text-muted-foreground">gesamt noch {mmss(GESAMT - vergangen)}</div>
              </div>
            </div>
            <div className="flex h-2 rounded-full overflow-hidden bg-secondary mb-4">
              <div className="bg-orange-500 transition-all" style={{ width: `${(vergangen / GESAMT) * 100}%` }} />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setLaeuft((l) => !l)} disabled={vergangen >= GESAMT}>
                {laeuft ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {laeuft ? "Pause" : vergangen ? "Weiter" : "Start"}
              </Button>
              <Button variant="outline" onClick={() => { setLaeuft(false); setVergangen(0); }}>
                <RotateCcw className="h-4 w-4 mr-2" /> Zurücksetzen
              </Button>
            </div>
            <ol className="grid grid-cols-1 sm:grid-cols-5 gap-2 mt-4">
              {PHASEN.map((p, i) => (
                <li key={p.titel} className={`rounded-lg p-2 text-xs border ${i === aktiv ? "border-orange-500 bg-background" : "border-border bg-card"} ${i < aktiv ? "opacity-60" : ""}`}>
                  <div className="font-semibold">{p.titel}</div>
                  <div className="text-muted-foreground">{p.min} Min.</div>
                </li>
              ))}
            </ol>
          </div>

          {/* Prompts */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-3">Prompt-Vorlagen zum Kopieren</h2>
            <div className="space-y-3">
              {PROMPTS.map((p, i) => (
                <div key={p.titel} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm">{p.titel}</h3>
                    <button type="button" onClick={() => kopieren(i, p.text)} className="text-xs text-accent-blue inline-flex items-center gap-1 hover:underline">
                      <Copy className="h-3 w-3" /> {kopiert === i ? "kopiert" : "kopieren"}
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground font-mono leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="font-bold mb-3">Werkzeuge</h2>
              <ul className="space-y-2 text-sm">
                {WERKZEUGE.map((w) => (
                  <li key={w.name}>
                    <a href={w.url} target="_blank" rel="noreferrer noopener" className="font-semibold text-accent-blue hover:underline">{w.name}</a>{" "}
                    <span className="text-muted-foreground">– {w.wofuer}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="font-bold mb-3">Packliste für den Abend vorher</h2>
              <ul className="list-disc pl-4 space-y-1.5 text-sm text-muted-foreground">
                {PACKLISTE.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <p className="text-xs text-muted-foreground mt-3">
                Namen prüfen: <Link to="/tools/brand-check" className="text-accent-blue hover:underline">Marken- und Domain-Check</Link>
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-bold mb-3">Nach dem Hackathon: vom Prototyp zur Firma</h2>
            <ol className="list-decimal pl-5 space-y-1.5 text-sm text-muted-foreground">
              <li>Zehn potenziellen Kunden den Prototyp zeigen und fragen, ob sie dafür zahlen würden.</li>
              <li>Pitch-Deck bauen und dich bei einem Wettbewerb oder Accelerator bewerben – Fristen im <Link to="/gruender-events" className="text-accent-blue hover:underline">Fristen-Radar</Link>.</li>
              <li>Rechtsform wählen: <Link to="/rechtsform-finden" className="text-accent-blue hover:underline">Rechtsform-Finder</Link>.</li>
              <li>Finanzierung planen: <Link to="/gruendungskosten-rechner" className="text-accent-blue hover:underline">Gründungskosten-Rechner</Link> und Förderung prüfen.</li>
            </ol>
          </div>

          <div className="rounded-2xl bg-primary/5 p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Der nächste Hackathon in deiner Nähe</h2>
            <p className="text-sm text-muted-foreground mb-4">Täglich aktualisiert: Hackathons, Build-Days und KI-Meetups in ganz Deutschland.</p>
            <Link to="/gruender-events">
              <Button size="lg">
                Zu den Gründer-Events <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-3">Häufige Fragen</h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <div key={f.q} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-semibold mb-1.5">{f.q}</h3>
                  <p className="text-sm text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
          <HubNav show={["tools", "guides", "ratgeber"]} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
