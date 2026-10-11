import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Seo } from "@/components/Seo";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { HubNav } from "@/components/landing/HubNav";
import { PageHeader } from "@/components/landing/PageHeader";
import { PublicSection, FaqList, CtaBand, ctaPrimaryOnInk, ctaSecondaryOnInk } from "@/components/public/PublicBlocks";
import { breadcrumbSchema, faqSchema } from "@/lib/freetools/schema";
import { BUNDESLAND_NAMES } from "@/data/foerderprogramme";
import { aktuelleEvents } from "@/data/gruenderEvents";
import { plzZuLand } from "@/lib/plz";
import { finanzamtSucheUrl, gewerbeamtFuerPlz, type Gewerbeamt } from "@/lib/pvog";

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
  const [amt, setAmt] = useState<{ plz: string; daten: Gewerbeamt | null; fehler?: boolean } | null>(null);
  useEffect(() => {
    if (!land) return;
    const ctrl = new AbortController();
    gewerbeamtFuerPlz(plz, ctrl.signal)
      .then((daten) => setAmt({ plz, daten }))
      .catch((e) => e.name !== "AbortError" && setAmt({ plz, daten: null, fehler: true }));
    return () => ctrl.abort();
  }, [plz, land]);
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
        title="Gründungsberatung & Behörden finden – nach PLZ | GründerX"
        description="Gewerbeamt mit Online-Anmeldung, Finanzamt, IHK, Handwerkskammer und kostenlose Gründerabende in deiner Nähe – nach Postleitzahl, aus amtlichen Quellen."
        path="/gruendungsberatung"
        jsonLd={[breadcrumbSchema([{ name: "Start", url: `${SITE}/` }, { name: "Gründungsberatung finden", url: `${SITE}/gruendungsberatung` }]), faqSchema(faqs)]}
      />
      <Navbar />
      <main>
        <PageHeader
          width="max-w-4xl"
          kicker={
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[13px] font-medium text-muted-foreground shadow-card">
              <MapPin className="h-3.5 w-3.5 text-accent-blue" aria-hidden="true" /> Kostenlose Beratung in deiner Nähe
            </span>
          }
          title="Gründungsberatung & Behörden finden"
          lead={
            <p>
              Gib deine Postleitzahl ein: Du siehst die zuständigen Stellen und die nächsten kostenlosen Gründerabende,
              Sprechtage und Infoveranstaltungen in deinem Bundesland.
            </p>
          }
        >
          <div className="max-w-sm">
            <label htmlFor="plz" className="mb-1.5 block text-sm font-medium">Postleitzahl</label>
            <Input
              id="plz"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              placeholder="z. B. 80331"
              value={plz}
              onChange={(e) => setPlz(e.target.value.replace(/\D/g, ""))}
              className="h-12 rounded-xl text-lg tabular shadow-card"
            />
            <div aria-live="polite" className="min-h-[1.75rem]">
              {plz.length === 5 && !land && <p className="mt-2 text-sm font-medium text-danger">Diese Postleitzahl kennen wir nicht. Bitte prüfe die Eingabe.</p>}
              {land && <p className="mt-2 text-sm text-muted-foreground">Bundesland: <span className="font-medium text-foreground">{BUNDESLAND_NAMES[land]}</span></p>}
            </div>
          </div>
        </PageHeader>

        <div className="container max-w-4xl space-y-14 px-4 py-12 md:py-16">
          {!land && (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card/60 px-6 py-10 text-center">
              <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="font-semibold">Termine und Behörden erscheinen nach der Postleitzahl</p>
              <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">
                Die allgemeinen Anlaufstellen unten gelten bundesweit und beraten auch ohne Termin.
              </p>
            </div>
          )}

          {land && (
            <PublicSection title={`Nächste Beratungstermine in ${BUNDESLAND_NAMES[land]}`}>
              {termine.length ? (
                <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                  {termine.map((e) => (
                    <li key={e.slug}>
                      <a href={e.url} target="_blank" rel="noreferrer noopener" className="group flex items-start gap-4 p-4 transition-colors hover:bg-secondary/40 md:px-5">
                        <div className="w-16 shrink-0 text-sm font-semibold tabular">{new Date(`${e.datum}T12:00:00`).toLocaleDateString("de-DE", { day: "2-digit", month: "short" })}</div>
                        <div className="min-w-0 flex-1 text-sm">
                          <div className="font-medium group-hover:text-accent-blue">{e.name}</div>
                          <div className="mt-0.5 text-xs text-muted-foreground">{e.veranstalter}, {e.format === "online" ? "online" : e.ort}{e.kostenlos ? ", kostenlos" : ""}</div>
                        </div>
                        <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="rounded-xl border border-dashed border-border bg-card/60 p-5 text-sm text-muted-foreground">Gerade keine Termine im Kalender. Die Stellen unten beraten auch ohne Veranstaltung.</p>
              )}
              <Link to="/gruender-events" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-blue hover:underline">Alle Gründer-Events <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
            </PublicSection>
          )}

          {land && (
            <PublicSection title="Deine Behörden für die Gründung">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-accent-blue/20 bg-accent/60 p-5 sm:col-span-2" aria-live="polite">
                  <div className="font-semibold">Gewerbeanmeldung{amt?.plz === plz && amt.daten?.gemeinde ? `: ${amt.daten.gemeinde}` : ""}</div>
                  {amt?.plz !== plz ? (
                    <div className="mt-3 space-y-2" aria-busy="true">
                      <p className="sr-only">Suche im Verwaltungsportal …</p>
                      <div className="h-3 w-2/3 animate-pulse rounded bg-card" />
                      <div className="h-3 w-1/2 animate-pulse rounded bg-card" />
                    </div>
                  ) : amt.daten && amt.daten.onlineLinks.length ? (
                    <ul className="mt-2 space-y-1.5 text-sm">
                      {amt.daten.onlineLinks.slice(0, 4).map((l) => (
                        <li key={l.url}><a href={l.url} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 font-medium text-accent-blue hover:underline">{l.titel} <ExternalLink className="h-3 w-3" aria-hidden="true" /></a></li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1 text-sm text-muted-foreground">Kein Online-Antrag hinterlegt. Frag beim Gewerbeamt deiner Gemeinde oder nutze das Serviceportal deines Bundeslandes.</p>
                  )}
                  {amt?.plz === plz && amt.daten?.stellen.length ? <p className="mt-2 text-sm text-muted-foreground">Zuständig: {amt.daten.stellen.slice(0, 4).join(", ")}{amt.daten.stellen.length > 4 ? " …" : ""}</p> : null}
                  <p className="mt-3 text-xs text-muted-foreground">Quelle: Portalverbund Online-Gateway (PVOG). Ausfüllhilfe: <Link to="/tools/gewerbeanmeldung-wizard" className="font-medium text-accent-blue hover:underline">Gewerbeanmeldung-Wizard</Link>.</p>
                </div>
                <a href={finanzamtSucheUrl(plz)} target="_blank" rel="noreferrer noopener" className="press group flex flex-col rounded-xl border border-border bg-card p-4 hover:border-accent-blue/40 hover:shadow-card">
                  <div className="font-semibold">Dein Finanzamt</div>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">{`Amtliche Finanzamtsuche des BZSt für ${plz}. In Großstädten mit mehreren Ämtern zählt die Straße. Danach den Fragebogen zur steuerlichen Erfassung über ELSTER.`}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent-blue">{`Finanzamt für ${plz} anzeigen`} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></span>
                </a>
                <a href="https://www.dguv.de/de/bg-uk-lv/index.jsp" target="_blank" rel="noreferrer noopener" className="press group flex flex-col rounded-xl border border-border bg-card p-4 hover:border-accent-blue/40 hover:shadow-card">
                  <div className="font-semibold">Berufsgenossenschaft</div>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">Zuständig ist die BG deiner Branche: Pflicht, sobald du Mitarbeiter hast; für Solo-Selbstständige oft freiwillig. Infoline 0800 6050404 (kostenlos).</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent-blue">BG finden <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></span>
                </a>
                <a href="https://www.handelsregister.de/rp_web/welcome.xhtml" target="_blank" rel="noreferrer noopener" className="press group flex flex-col rounded-xl border border-border bg-card p-4 hover:border-accent-blue/40 hover:shadow-card">
                  <div className="font-semibold">Handelsregister</div>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">Für GmbH/UG und eingetragene Kaufleute. Firmennamen vorher prüfen.</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent-blue">Register öffnen <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></span>
                </a>
                <a href="https://www.transparenzregister.de/" target="_blank" rel="noreferrer noopener" className="press group flex flex-col rounded-xl border border-border bg-card p-4 hover:border-accent-blue/40 hover:shadow-card">
                  <div className="font-semibold">Transparenzregister</div>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">GmbH/UG müssen ihre wirtschaftlich Berechtigten unverzüglich eintragen.</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent-blue">Zum Register <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></span>
                </a>
              </div>
            </PublicSection>
          )}

          <PublicSection title="Wer dich berät">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[...STELLEN, ...(land === "NW" ? [{ name: "STARTERCENTER NRW", text: "73 Standorte in NRW für Gründungsberatung aus einer Hand.", url: "https://www.startercenter.nrw/de/starten", label: "Standort im Umkreis" }] : [])].map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer noopener" className="press group flex flex-col rounded-xl border border-border bg-card p-4 hover:border-accent-blue/40 hover:shadow-card">
                  <div className="font-semibold">{s.name}</div>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent-blue">{s.label} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></span>
                </a>
              ))}
            </div>
          </PublicSection>

          <CtaBand
            title="Vorbereitet ins Beratungsgespräch"
            actions={
              <>
                <Button asChild size="lg" className={ctaPrimaryOnInk}>
                  <Link to="/businessplan-erstellen">Businessplan erstellen <ArrowRight /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className={ctaSecondaryOnInk}>
                  <Link to="/gruendungskosten-rechner">Gründungskosten rechnen</Link>
                </Button>
              </>
            }
          >
            Wer mit Businessplan und Zahlen kommt, bekommt die bessere Beratung.
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
