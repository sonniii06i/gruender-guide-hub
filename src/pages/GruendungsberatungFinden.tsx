import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Seo } from "@/components/Seo";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { HubNav } from "@/components/landing/HubNav";
import { breadcrumbSchema, faqSchema } from "@/lib/freetools/schema";
import { BUNDESLAND_NAMES } from "@/data/foerderprogramme";
import { aktuelleEvents } from "@/data/gruenderEvents";
import { plzZuLand } from "@/lib/plz";

const SITE = "https://gruenderx.de";

const STELLEN = [
  { name: "Deine IHK", text: "Gründungsberatung, Gründertage, Stellungnahme zum Gründungszuschuss – für Gewerbe und Handel.", url: "https://www.ihk.de/die-ihk/ihk-finder-5507608", label: "IHK-Finder nach PLZ" },
  { name: "Deine Handwerkskammer", text: "Beratung für Gründungen im Handwerk, Meisterpflicht, Eintrag in die Handwerksrolle.", url: "https://www.zdh.de/ueber-uns/organisationen-des-handwerks/handwerkskammern/adressen-der-handwerkskammern/", label: "Alle 53 Handwerkskammern" },
  { name: "Agentur für Arbeit", text: "Gründungszuschuss, Beratungstermin bei der Vermittlungsfachkraft (0800 4 555500).", url: "https://web.arbeitsagentur.de/portal/dienststellensuche/", label: "Dienststelle nach PLZ" },
  { name: "Gründungsnetzwerk deines Landes", text: "Landesinitiativen, Gründerzentren und Wirtschaftsförderungen – sortiert nach Bundesland.", url: "https://www.existenzgruendungsportal.de/Navigation/DE/Netzwerke/Deutschland-Karte/deutschland_karte", label: "Länderkarte (BMWE)" },
  { name: "Gründerplattform-Partner", text: "Hunderte Partner: Kammern, Banken, Hochschulen, Gründerzentren – nach Bundesland filterbar.", url: "https://gruenderplattform.de/partner", label: "Partnerverzeichnis" },
  { name: "Angebote für Gründerinnen", text: "Beratung, Netzwerke und Mentoring speziell für Frauen.", url: "https://www.existenzgruendungsportal.de/Navigation/DE/Netzwerke/Gruendungsnetzwerke/Unterstuetzungsangebote-fuer-Frauen", label: "Übersicht (BMWE)" },
];

const RE_BERATUNG = /sprechtag|sprechstunde|beratung|beratertag|infotag|info-?abend|gründerabend|gründertag|gründungstag|existenzgründung|gründungsseminar|gründungskompass|starthilfe|erfolgreich gründen|basiswissen/i;

const faqs = [
  { q: "Ist die Gründungsberatung der IHK kostenlos?", a: "Die Erstberatung und Gründertage der IHKs und Handwerkskammern sind in der Regel kostenlos. Kosten fallen meist erst für Seminare oder die Stellungnahme zum Gründungszuschuss an (bei IHKs etwa 60 bis 120 €)." },
  { q: "Wer berät mich, wenn ich Freiberufler werde?", a: "Freiberufler gehören nicht zur IHK. Anlaufstellen sind die Gründungsnetzwerke der Länder, Gründerzentren, die Agentur für Arbeit und – je nach Beruf – die zuständige Kammer (z. B. Architekten-, Ärzte- oder Steuerberaterkammer)." },
  { q: "Gibt es Zuschüsse für eine Gründungsberatung?", a: "Ja: Die BAFA-Förderung für Unternehmensberatungen übernimmt 50 bis 80 % von bis zu 3.500 € Beratungskosten – Anträge sind nach aktueller Richtlinie nur noch bis 31.12.2026 möglich." },
];

export default function GruendungsberatungFinden() {
  const [plz, setPlz] = useState("");
  const land = plzZuLand(plz);
  const heute = new Date().toISOString().slice(0, 10);
  const termine = useMemo(() => {
    if (!land) return [];
    return aktuelleEvents(heute)
      .filter((e) => e.datum && (e.region === land || e.format === "online") && (RE_BERATUNG.test(e.name) || e.art === "gruenderabend"))
      .sort((a, b) => Number(b.region === land) - Number(a.region === land) || a.datum!.localeCompare(b.datum!))
      .slice(0, 12)
      .sort((a, b) => a.datum!.localeCompare(b.datum!));
  }, [land, heute]);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Kostenlose Gründungsberatung finden – nach Postleitzahl | GründerX"
        description="IHK, Handwerkskammer, Arbeitsagentur und Gründungsnetzwerke in deiner Nähe – plus die nächsten kostenlosen Gründerabende und Sprechtage in deinem Bundesland."
        path="/gruendungsberatung"
        jsonLd={[breadcrumbSchema([{ name: "Start", url: `${SITE}/` }, { name: "Gründungsberatung finden", url: `${SITE}/gruendungsberatung` }]), faqSchema(faqs)]}
      />
      <Navbar />
      <section className="relative pt-28 pb-8 md:pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Badge variant="secondary" className="mb-4"><MapPin className="mr-1.5 h-3.5 w-3.5" /> Kostenlose Beratung in deiner Nähe</Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">Gründungsberatung finden</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Gib deine Postleitzahl ein: Du siehst die zuständigen Stellen und die nächsten kostenlosen Gründerabende, Sprechtage und
            Infoveranstaltungen in deinem Bundesland.
          </p>
          <div className="max-w-xs mx-auto">
            <Input inputMode="numeric" maxLength={5} placeholder="Postleitzahl, z. B. 80331" value={plz} onChange={(e) => setPlz(e.target.value.replace(/\D/g, ""))} className="text-center text-lg h-12" aria-label="Postleitzahl" />
            {plz.length === 5 && !land && <p className="text-xs text-red-700 mt-2">Diese Postleitzahl kennen wir nicht.</p>}
            {land && <p className="text-sm text-muted-foreground mt-2">{BUNDESLAND_NAMES[land]}</p>}
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          {land && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-3">Nächste Beratungstermine in {BUNDESLAND_NAMES[land]}</h2>
              {termine.length ? (
                <div className="space-y-2">
                  {termine.map((e) => (
                    <a key={e.slug} href={e.url} target="_blank" rel="noreferrer noopener" className="flex items-start gap-3 rounded-xl border border-border bg-card p-3 hover:border-accent-blue/40">
                      <div className="w-16 shrink-0 text-sm font-semibold">{new Date(`${e.datum}T12:00:00`).toLocaleDateString("de-DE", { day: "2-digit", month: "short" })}</div>
                      <div className="flex-1 min-w-0 text-sm">
                        <div className="font-medium">{e.name}</div>
                        <div className="text-xs text-muted-foreground">{e.veranstalter} · {e.format === "online" ? "online" : e.ort}{e.kostenlos ? " · kostenlos" : ""}</div>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-1" />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Gerade keine Termine im Kalender – die Stellen unten beraten auch ohne Veranstaltung.</p>
              )}
              <Link to="/gruender-events" className="text-sm text-accent-blue hover:underline inline-flex items-center gap-1 mt-3">Alle Gründer-Events <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
          )}

          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-3">Wer dich berät</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[...STELLEN, ...(land === "NW" ? [{ name: "STARTERCENTER NRW", text: "73 Standorte in NRW für Gründungsberatung aus einer Hand.", url: "https://www.startercenter.nrw/de/starten", label: "Standort im Umkreis" }] : [])].map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer noopener" className="rounded-xl border border-border bg-card p-4 hover:border-accent-blue/40">
                  <div className="font-semibold">{s.name}</div>
                  <p className="text-xs text-muted-foreground mt-1">{s.text}</p>
                  <span className="text-xs text-accent-blue inline-flex items-center gap-1 mt-2">{s.label} <ExternalLink className="h-3 w-3" /></span>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-primary/5 p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Vorbereitet ins Beratungsgespräch</h2>
            <p className="text-sm text-muted-foreground mb-4">Wer mit Businessplan und Zahlen kommt, bekommt die bessere Beratung.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/businessplan-erstellen"><Button size="lg">Businessplan erstellen <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
              <Link to="/gruendungskosten-rechner"><Button size="lg" variant="outline">Gründungskosten rechnen</Button></Link>
            </div>
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
