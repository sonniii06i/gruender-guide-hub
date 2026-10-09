import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Check, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { breadcrumbSchema, faqSchema } from "@/lib/freetools/schema";
import { KURZ, TOOLS } from "../../api/_lib/gxMcp";

// /ki-assistent: Promo + Anleitung für den öffentlichen MCP-Server https://gruenderx.de/mcp
// (api/mcp.ts). Werkzeugliste kommt direkt aus api/_lib/gxMcp.ts, damit Seite und Server nie
// auseinanderlaufen. Nur belegbare Aussagen.

const SITE = "https://gruenderx.de";
const MCP_URL = `${SITE}/mcp`;

const faqs = [
  {
    q: "Was ist ein MCP-Server?",
    a: "MCP (Model Context Protocol) ist ein offener Standard, über den KI-Assistenten wie ChatGPT und Claude externe Werkzeuge aufrufen. Trägst du die GründerX-URL ein, kann dein Assistent aktuelle Gründer-Events, Bewerbungsfristen, Startup-Guthaben und unsere Ratgeber abfragen, statt aus dem Gedächtnis zu antworten.",
  },
  { q: "Kostet das etwas?", a: "Nein. Der MCP-Server ist kostenlos und braucht weder Anmeldung noch API-Schlüssel." },
  {
    q: "Welche Daten sieht GründerX?",
    a: "Nur die Werte, die der Assistent an das Werkzeug übergibt (z. B. Bundesland oder Stichwort). Es gibt keinen Zugriff auf deinen Chat und kein Konto. Gezählt wird nur, welches Werkzeug aufgerufen wurde, ohne IP-Adresse und ohne Eingaben.",
  },
  {
    q: "Woher kommen die Daten?",
    a: "Es sind dieselben Daten wie auf gruenderx.de: der täglich laufende Event-Monitor und der Fristen-Radar (Gründer-Events), die an den offiziellen Anbieterseiten geprüften Startup-Programme (Startup-Guthaben) und die veröffentlichten GründerX-Ratgeber.",
  },
  {
    q: "Ersetzt das eine Beratung?",
    a: "Nein. Die Werkzeuge liefern Termine, Fristen und Hintergrundwissen. Für deine konkrete Situation bleiben Steuerberatung, Gründungsberatung oder Rechtsberatung zuständig. Termine und Bedingungen immer beim Veranstalter bzw. Anbieter prüfen.",
  },
];

const BEISPIELE = [
  "Welche kostenlosen Gründer-Events gibt es im November in Bayern?",
  "Welche Gründungswettbewerbe haben in den nächsten 60 Tagen Bewerbungsschluss?",
  "Wir haben vor zwei Jahren ohne Investor gegründet. Welche Cloud-Guthaben bekommen wir?",
  "Fass mir den GründerX-Ratgeber „UG oder GmbH“ zusammen.",
];

function Kopieren({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <Button
      type="button"
      size="sm"
      onClick={() => navigator.clipboard?.writeText(text).then(() => { setOk(true); setTimeout(() => setOk(false), 2000); })}
    >
      {ok ? <Check className="mr-1.5 h-4 w-4" /> : <Copy className="mr-1.5 h-4 w-4" />} {ok ? "Kopiert" : "Kopieren"}
    </Button>
  );
}

function Karte({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-semibold text-lg mb-3">{titel}</h3>
      {children}
    </div>
  );
}

const Code = ({ children }: { children: string }) => (
  <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-950 p-3 text-xs text-slate-100">{children}</pre>
);

export default function KiAssistent() {
  const jsonLd = [
    breadcrumbSchema([
      { name: "Start", url: `${SITE}/` },
      { name: "KI-Assistent (MCP)", url: `${SITE}/ki-assistent` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "GründerX MCP-Server",
      description: "MCP-Server für KI-Assistenten: Gründer-Events, Bewerbungsfristen, Startup-Guthaben und Gründer-Ratgeber für Deutschland.",
      url: `${SITE}/ki-assistent`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "de",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    },
    faqSchema(faqs),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="GründerX in ChatGPT & Claude (MCP) – kostenlos | GründerX"
        description="Verbinde ChatGPT, Claude, Cursor oder VS Code mit dem GründerX-MCP-Server: Gründer-Events, Bewerbungsfristen, Startup-Guthaben und Ratgeber direkt im KI-Chat. Kostenlos, ohne Anmeldung."
        path="/ki-assistent"
        jsonLd={jsonLd}
      />
      <Navbar />

      <section className="relative pt-28 pb-8 md:pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Badge variant="secondary" className="mb-4">
            <Bot className="mr-1.5 h-3.5 w-3.5" /> Neu · kostenlos · ohne Anmeldung
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">GründerX direkt in ChatGPT und Claude</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Frag deinen KI-Assistenten nach Gründer-Events in deiner Region, nach Bewerbungsfristen für Wettbewerbe und Stipendien
            oder nach Startup-Guthaben. Er holt sich die Antwort aus den aktuellen GründerX-Daten.
          </p>
          <div className="mx-auto mt-7 flex max-w-xl items-center gap-2 rounded-xl border border-border bg-card p-2 pl-4">
            <code className="min-w-0 flex-1 truncate text-left font-semibold">{MCP_URL}</code>
            <Kopieren text={MCP_URL} />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">MCP-Server-URL · Streamable HTTP · keine Anmeldung, kein API-Schlüssel</p>
        </div>
      </section>

      <section className="pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">In zwei Minuten verbunden</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Karte titel="ChatGPT">
                <ol className="list-decimal space-y-1 pl-5 text-sm">
                  <li>Einstellungen → <b>Apps &amp; Connectors</b> öffnen.</li>
                  <li>Unter „Erweitert“ den <b>Entwicklermodus</b> aktivieren (je nach Tarif verfügbar).</li>
                  <li><b>Connector erstellen</b>, Name „GründerX“, URL <code>{MCP_URL}</code>, Authentifizierung „Keine“.</li>
                  <li>Im Chat über „+“ den Connector auswählen.</li>
                </ol>
              </Karte>
              <Karte titel="Claude (claude.ai & Desktop)">
                <ol className="list-decimal space-y-1 pl-5 text-sm">
                  <li>Einstellungen → <b>Connectors</b> öffnen.</li>
                  <li><b>Benutzerdefinierten Connector hinzufügen</b>.</li>
                  <li>Name „GründerX“, URL <code>{MCP_URL}</code> eintragen, speichern.</li>
                  <li>Im Chat im Werkzeug-Menü aktivieren.</li>
                </ol>
              </Karte>
              <Karte titel="Claude Code">
                <Code>{`claude mcp add --transport http gruenderx ${MCP_URL}`}</Code>
              </Karte>
              <Karte titel="Cursor, VS Code & andere MCP-Clients">
                <Code>{`{\n  "mcpServers": {\n    "gruenderx": { "url": "${MCP_URL}" }\n  }\n}`}</Code>
              </Karte>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Was der Assistent damit kann</h2>
            <div className="divide-y divide-border rounded-2xl border border-border bg-card">
              {TOOLS.map((t) => (
                <div key={t.name} className="grid gap-1 p-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-4">
                  <div>
                    <div className="font-semibold">{t.title}</div>
                    <code className="text-xs text-muted-foreground">{t.name}</code>
                  </div>
                  <p className="text-sm text-muted-foreground">{KURZ[t.name]}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Dieselben Daten findest du auf <Link to="/gruender-events" className="underline">Gründer-Events</Link>,{" "}
              <Link to="/startup-guthaben" className="underline">Startup-Guthaben</Link> und im{" "}
              <Link to="/ratgeber" className="underline">Ratgeber</Link>. Angaben ohne Gewähr, keine Rechts- oder Steuerberatung.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">So fragst du</h2>
            <div className="rounded-2xl border border-border bg-muted/40 p-5 space-y-2 text-sm">
              {BEISPIELE.map((b) => <p key={b}>„{b}“</p>)}
            </div>
          </div>

          <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-6">
            <h2 className="text-2xl font-bold mb-2">Mehr als Termine und Fristen</h2>
            <p className="text-muted-foreground mb-4">
              Im GründerX-Cockpit rechnest du Gründungszuschuss, Finanzplan, Rechtsform und Steuern durch und bekommst Schritt-für-Schritt-Guides
              für deine Gründung.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild><Link to="/preise">Preise ansehen <ArrowRight className="ml-1.5 h-4 w-4" /></Link></Button>
              <Button asChild variant="outline"><Link to="/gratis-tools">Gratis-Tools</Link></Button>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Häufige Fragen</h2>
            {faqs.map((f) => (
              <details key={f.q} className="border-b border-border py-3">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-2 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
