import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Check, Copy, LifeBuoy, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PageHeader } from "@/components/landing/PageHeader";
import { PublicSection, InfoCard, FaqList, CtaBand, ctaPrimaryOnInk, ctaSecondaryOnInk } from "@/components/public/PublicBlocks";
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
    <InfoCard title={titel} className="min-w-0">
      {children}
    </InfoCard>
  );
}

const Code = ({ children }: { children: string }) => (
  <pre className="overflow-x-auto rounded-lg bg-[hsl(224_60%_11%)] p-3.5 text-xs leading-relaxed text-primary-foreground/90">{children}</pre>
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
      <main>
        <PageHeader
          width="max-w-5xl"
          kicker={
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[13px] font-medium text-muted-foreground shadow-card">
              <Bot className="h-3.5 w-3.5 text-accent-blue" aria-hidden="true" /> Neu, kostenlos, ohne Anmeldung
            </span>
          }
          title="GründerX direkt in ChatGPT und Claude"
          lead={
            <p>
              Frag deinen KI-Assistenten nach Gründer-Events in deiner Region, nach Bewerbungsfristen für Wettbewerbe und
              Stipendien oder nach Startup-Guthaben. Er holt sich die Antwort aus den aktuellen GründerX-Daten.
            </p>
          }
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-2 pl-4 shadow-card">
              <code className="min-w-0 flex-1 truncate text-left text-sm font-semibold" translate="no">{MCP_URL}</code>
              <Kopieren text={MCP_URL} />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">MCP-Server-URL, Streamable HTTP. Keine Anmeldung, kein API-Schlüssel.</p>
          </div>
        </PageHeader>

        <div className="container max-w-5xl space-y-16 px-4 py-14 md:py-20">
          <PublicSection title="In zwei Minuten verbunden">
            <div className="grid gap-4 md:grid-cols-2">
              <Karte titel="ChatGPT">
                <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-relaxed">
                  <li>Einstellungen, dann <b>Apps &amp; Connectors</b> öffnen.</li>
                  <li>Unter „Erweitert“ den <b>Entwicklermodus</b> aktivieren (je nach Tarif verfügbar).</li>
                  <li><b>Connector erstellen</b>, Name „GründerX“, URL <code className="break-all">{MCP_URL}</code>, Authentifizierung „Keine“.</li>
                  <li>Im Chat über „+“ den Connector auswählen.</li>
                </ol>
              </Karte>
              <Karte titel="Claude (claude.ai & Desktop)">
                <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-relaxed">
                  <li>Einstellungen, dann <b>Connectors</b> öffnen.</li>
                  <li><b>Benutzerdefinierten Connector hinzufügen</b>.</li>
                  <li>Name „GründerX“, URL <code className="break-all">{MCP_URL}</code> eintragen, speichern.</li>
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
          </PublicSection>

          <PublicSection title="Was der Assistent damit kann">
            <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              {TOOLS.map((t) => (
                <div key={t.name} className="grid gap-1 p-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-6 md:px-6">
                  <div className="min-w-0">
                    <div className="font-semibold">{t.title}</div>
                    <code className="break-all text-xs text-muted-foreground" translate="no">{t.name}</code>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{KURZ[t.name]}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Dieselben Daten findest du auf <Link to="/gruender-events" className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">Gründer-Events</Link>,{" "}
              <Link to="/startup-guthaben" className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">Startup-Guthaben</Link> und im{" "}
              <Link to="/ratgeber" className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">Ratgeber</Link>. Angaben ohne Gewähr, keine Rechts- oder Steuerberatung.
            </p>
          </PublicSection>

          <PublicSection title="So fragst du">
            <ul className="grid gap-3 sm:grid-cols-2">
              {BEISPIELE.map((b) => (
                <li key={b} className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm leading-relaxed">
                  <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-accent-blue" aria-hidden="true" />
                  <span>„{b}“</span>
                </li>
              ))}
            </ul>
          </PublicSection>

          <CtaBand
            title="Mehr als Termine und Fristen"
            actions={
              <>
                <Button asChild size="lg" className={ctaPrimaryOnInk}>
                  <Link to="/preise">Preise ansehen <ArrowRight /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className={ctaSecondaryOnInk}>
                  <Link to="/gratis-tools">Gratis-Tools</Link>
                </Button>
              </>
            }
          >
            Im GründerX-Cockpit rechnest du Gründungszuschuss, Finanzplan, Rechtsform und Steuern durch und bekommst
            Schritt-für-Schritt-Guides für deine Gründung.
          </CtaBand>

          <PublicSection id="support" title="Support">
            <InfoCard icon={LifeBuoy}>
              <p className="leading-relaxed text-muted-foreground">
                Fragen, Fehler oder Wünsche zum MCP-Server oder zur GPT-Schnittstelle? Schreib uns an{" "}
                <a href="mailto:impressum@xn--grnderx-o2a.de" className="font-medium text-foreground underline underline-offset-4">impressum@gründerx.de</a> oder über das{" "}
                <Link to="/kontakt" className="font-medium text-foreground underline underline-offset-4">Kontaktformular</Link>. Wie wir dabei mit Daten umgehen, steht in der{" "}
                <Link to="/datenschutz#ki-schnittstelle" className="font-medium text-foreground underline underline-offset-4">Datenschutzerklärung</Link>.
              </p>
            </InfoCard>
          </PublicSection>

          <PublicSection title="Häufige Fragen">
            <FaqList items={faqs} />
          </PublicSection>
        </div>
      </main>
      <Footer />
    </div>
  );
}
