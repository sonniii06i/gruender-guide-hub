import { useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BellRing, CalendarClock, CheckCircle2, ExternalLink, MapPin, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Seo } from "@/components/Seo";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { HubNav } from "@/components/landing/HubNav";
import { PageHeader } from "@/components/landing/PageHeader";
import { selectCls } from "@/components/cockpit/kit";
import { PublicSection, FaqList, CtaBand, ctaPrimaryOnInk, ctaSecondaryOnInk } from "@/components/public/PublicBlocks";
import { breadcrumbSchema, faqSchema } from "@/lib/freetools/schema";
import { BUNDESLAND_NAMES } from "@/data/foerderprogramme";
import { aktuelleEvents, GRUENDER_FRISTEN } from "@/data/gruenderEvents";
import hackathonsLive from "@/data/hackathonsLive.json";
import { CHANCEN_ARTEN, passtRegion, sammleChancen, type Chance, type ChancenArt, type Hackathon } from "@/lib/gruenderChancen";
import { ALARM_TEXT, CHANCEN_ALARM_AKTIV, chancenAlarmAnfordern, type AlarmStatus } from "@/lib/chancenAlarm";

// Gründer-Chancen: alles an einem Ort, wo Gründer Geld, Investoren, Kunden und Kontakte finden –
// Wettbewerbe mit Preisgeld, Accelerator, Hackathons, Pitch-Abende, Marketing- und Netzwerk-Events.
// Gratis, ohne Login. Daten: kuratierte Fristen (je Veranstalterseite geprüft), Event-Monitor und
// Devpost-Hackathons (beide täglich per GitHub Action). Logik in src/lib/gruenderChancen.ts.

const SITE = "https://gruenderx.de";
const SEITE = 60;
const ARTEN = Object.keys(CHANCEN_ARTEN) as ChancenArt[];
const WT = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
const MONAT = new Intl.DateTimeFormat("de-DE", { month: "long", year: "numeric" });

const tag = (iso: string) => {
  const d = new Date(`${iso}T12:00:00`);
  return `${WT[d.getDay()]} ${iso.slice(8, 10)}.${iso.slice(5, 7)}.${iso.slice(0, 4) !== new Date().toISOString().slice(0, 4) ? iso.slice(0, 4) : ""}`;
};
const plusTage = (iso: string, n: number) => new Date(Date.parse(`${iso}T12:00:00Z`) + n * 86400000).toISOString().slice(0, 10);

const faqs = [
  { q: "Was steht auf dieser Seite?", a: "Fünf Arten von Chancen für Gründerinnen und Gründer: Wettbewerbe, Gründerpreise, Accelerator und Stipendien mit Bewerbungsfrist; Hackathons mit Preisgeld (online und vor Ort); Pitch-Abende, Demo Days und Investoren-Treffen; Marketing-, Vertriebs- und E-Commerce-Events; Stammtische, Gründerabende und Startup-Konferenzen." },
  { q: "Woher kommen die Daten?", a: "Wettbewerbe, Programme und große Konferenzen prüfen wir einzeln an der Seite des Veranstalters – nie aus Sammellisten. Termine aus Gründungswoche, Luma, Meetup, Startup-Portalen der Länder und Hochschulen holt unser Event-Monitor jeden Tag. Hackathons mit Preisgeld kommen täglich von Devpost." },
  { q: "Was bedeutet „$ je Anmeldung“ bei Hackathons?", a: "Das gesamte Preisgeld geteilt durch die Zahl der Anmeldungen. Es ist kein Gewinnversprechen, aber ein guter Vergleich: Je höher der Wert, desto weniger Konkurrenz pro ausgeschriebenem Dollar. Viele Anmeldungen reichen am Ende gar nichts ein." },
  { q: "Kostet das etwas?", a: "Nein. Die Übersicht und der Chancen-Alarm per E-Mail sind kostenlos und ohne Konto nutzbar. Die Teilnahme an manchen Events kostet Eintritt – das steht dann beim Eintrag." },
  { q: "Ich kenne eine Chance, die fehlt.", a: "Schreib uns über die Kontaktseite mit Link zur offiziellen Ausschreibung. Wir prüfen sie und nehmen sie auf, wenn Frist und Preisgeld beim Veranstalter belegt sind." },
];

function ChanceKarte({ c, heute }: { c: Chance; heute: string }) {
  const a = CHANCEN_ARTEN[c.art];
  const bald = c.frist && c.frist <= plusTage(heute, 7);
  return (
    <li className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-foreground/20">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-muted-foreground">
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-foreground/80">
          <span aria-hidden="true">{a.emoji}</span> {a.name}
        </span>
        {c.frist && (
          <span className={bald ? "font-semibold text-destructive" : "text-foreground/80"}>
            {c.art === "hackathon" ? "Einreichen" : "Bewerben"} bis {tag(c.frist)}
          </span>
        )}
        {!c.frist && c.datum && <span className="text-foreground/80">{tag(c.datum)}{c.datumBis && c.datumBis !== c.datum ? ` – ${tag(c.datumBis)}` : ""}</span>}
        {c.vormerken && <span className="text-foreground/80">Vormerken: {c.vormerken}</span>}
        {c.kostenlos && <span className="text-brand-green">kostenlos</span>}
        {c.nurFrauen && <span className="rounded-full bg-accent px-2 py-0.5 text-accent-blue">für Frauen</span>}
      </div>
      <a href={c.url} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-flex items-start gap-1.5 text-[15px] font-semibold leading-snug text-foreground hover:text-accent-blue">
        {c.titel} <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden="true" />
      </a>
      {c.preis && <p className="mt-1 text-sm font-medium text-foreground">💰 {c.preis}</p>}
      {c.kurz && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.kurz}</p>}
      <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" aria-hidden="true" />{c.ort}</span>
        {c.veranstalter && <span>{c.veranstalter}</span>}
        {c.frist && c.datum && c.datum !== c.frist && <span>Finale/Start {tag(c.datum)}</span>}
      </p>
    </li>
  );
}

function ChancenAlarmBox() {
  const [email, setEmail] = useState("");
  const [arten, setArten] = useState<ChancenArt[]>(["wettbewerb", "hackathon", "pitch"]);
  const [region, setRegion] = useState("alle");
  const [ohneNurFrauen, setOhneNurFrauen] = useState(false);
  const [einwilligung, setEinwilligung] = useState(false);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<AlarmStatus | "laeuft" | null>(null);

  const absenden = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!einwilligung || !arten.length) return;
    setStatus("laeuft");
    setStatus(await chancenAlarmAnfordern({ email, arten, region, ohneNurFrauen, website }));
  };
  const umschalten = (a: ChancenArt) => setArten((v) => (v.includes(a) ? v.filter((x) => x !== a) : [...v, a]));

  if (status === "gesendet" || status === "bereits_gesendet" || status === "bereits_bestaetigt") {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-brand-green/25 bg-brand-green-soft p-5 text-sm">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" aria-hidden="true" />
        <p>
          {status === "bereits_bestaetigt"
            ? "Diese Adresse bekommt den Chancen-Alarm schon."
            : "Fast geschafft: Wir haben dir eine Mail geschickt. Klick den Link darin, dann kommt der Chancen-Alarm jeden Montag."}
        </p>
      </div>
    );
  }
  return (
    <form onSubmit={absenden} className="space-y-4">
      <fieldset>
        <legend className="mb-2 text-sm font-medium">Was soll in deine Mail?</legend>
        <div className="flex flex-wrap gap-2">
          {ARTEN.map((a) => (
            <button key={a} type="button" aria-pressed={arten.includes(a)} onClick={() => umschalten(a)}
              className={`h-9 rounded-full border px-3 text-sm font-medium transition-colors ${arten.includes(a) ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card text-foreground/80 hover:border-foreground/25"}`}>
              {CHANCEN_ARTEN[a].emoji} {CHANCEN_ARTEN[a].name}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-3 sm:grid-cols-[1fr_220px]">
        <label className="block space-y-1.5 text-sm">
          <span className="block font-medium">E-Mail-Adresse</span>
          <Input type="email" required autoComplete="email" placeholder="du@beispiel.de" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="block font-medium">Region</span>
          <select value={region} onChange={(e) => setRegion(e.target.value)} className={selectCls}>
            <option value="alle">Ganz Deutschland</option>
            {Object.entries(BUNDESLAND_NAMES).filter(([k]) => k !== "bund").map(([k, n]) => <option key={k} value={k}>{n} + bundesweit</option>)}
            <option value="online">Nur online</option>
          </select>
        </label>
      </div>
      {/* Honigtopf für Bots: unsichtbar, Menschen lassen ihn leer. */}
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(e) => setWebsite(e.target.value)} className="hidden" name="website" />
      <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
        <input type="checkbox" checked={ohneNurFrauen} onChange={(e) => setOhneNurFrauen(e.target.checked)} className="mt-1 h-4 w-4 rounded border-input" />
        Events, die sich nur an Frauen richten, weglassen
      </label>
      <label className="flex items-start gap-2.5 text-sm">
        <input type="checkbox" required checked={einwilligung} onChange={(e) => setEinwilligung(e.target.checked)} className="mt-1 h-4 w-4 rounded border-input" />
        <span>{ALARM_TEXT} Details in der <Link to="/datenschutz" className="text-accent-blue hover:underline">Datenschutzerklärung</Link>.</span>
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg" disabled={status === "laeuft" || !einwilligung || !arten.length} className="h-11 rounded-xl bg-gradient-primary font-semibold">
          <BellRing className="h-4 w-4" /> {status === "laeuft" ? "Wird gesendet …" : "Chancen-Alarm aktivieren"}
        </Button>
        {status === "limit" && <span className="text-sm text-muted-foreground">Für heute haben wir schon genug Mails an diese Adresse geschickt – schau in dein Postfach.</span>}
        {status === "fehler" && <span className="text-sm text-destructive">Das hat nicht geklappt. Prüf die Adresse oder versuch es gleich noch einmal.</span>}
      </div>
    </form>
  );
}

export default function GruenderChancen() {
  const heute = new Date().toISOString().slice(0, 10);
  const alle = useMemo(
    () => sammleChancen({ events: aktuelleEvents(heute), fristen: GRUENDER_FRISTEN, hackathons: hackathonsLive.eintraege as Hackathon[], heute }),
    [heute],
  );
  const [art, setArt] = useState<ChancenArt | "alle">("alle");
  const [region, setRegion] = useState("alle");
  const [suche, setSuche] = useState("");
  const [ohneNurFrauen, setOhneNurFrauen] = useState(false);
  const [anzahl, setAnzahl] = useState(SEITE);

  const zaehler = useMemo(() => {
    const z = Object.fromEntries(ARTEN.map((a) => [a, 0])) as Record<ChancenArt, number>;
    for (const c of alle) if (passtRegion(c, region)) z[c.art]++;
    return z;
  }, [alle, region]);

  const gefiltert = useMemo(() => {
    const q = suche.trim().toLowerCase();
    return alle.filter((c) =>
      (art === "alle" || c.art === art) && passtRegion(c, region) && !(ohneNurFrauen && c.nurFrauen) &&
      (!q || [c.titel, c.veranstalter, c.ort, c.kurz ?? "", c.preis ?? ""].some((s) => s.toLowerCase().includes(q))));
  }, [alle, art, region, suche, ohneNurFrauen]);

  const bald = alle.filter((c) => c.frist && c.frist <= plusTage(heute, 21) && (c.art === "wettbewerb" || c.art === "hackathon") && passtRegion(c, region)).slice(0, 6);
  const sichtbar = gefiltert.slice(0, anzahl);
  const gruppen: { titel: string; eintraege: Chance[] }[] = [];
  for (const c of sichtbar) {
    const titel = c.sortierung === "9999" ? "Ohne feste Frist – vormerken" : MONAT.format(new Date(`${c.sortierung}T12:00:00`));
    const g = gruppen[gruppen.length - 1];
    if (g?.titel === titel) g.eintraege.push(c);
    else gruppen.push({ titel, eintraege: [c] });
  }
  const preisgeldTreffer = alle.filter((c) => c.art === "wettbewerb" || c.art === "hackathon").length;

  const jsonLd = [
    breadcrumbSchema([
      { name: "Start", url: `${SITE}/` },
      { name: "Gründer-Chancen", url: `${SITE}/gruender-chancen` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Gründer-Chancen: Wettbewerbe, Hackathons, Pitch- und Netzwerk-Events",
      numberOfItems: alle.length,
      itemListElement: alle.slice(0, 50).map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.titel, url: c.url })),
    },
    faqSchema(faqs),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`Gründer-Chancen ${new Date().getFullYear()}: Wettbewerbe, Preisgeld, Pitch & Events | GründerX`}
        description={`${preisgeldTreffer} Wettbewerbe, Accelerator und Hackathons mit Preisgeld oder Investment plus Pitch-Abende, Marketing- und Netzwerk-Events – kostenlos, täglich aktualisiert, mit Chancen-Alarm per Mail.`}
        path="/gruender-chancen"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main>
        <PageHeader zentriert
          width="max-w-5xl"
          kicker={
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/25 bg-brand-green-soft px-3 py-1 text-[13px] font-medium text-brand-green">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Kostenlos · täglich aktualisiert
            </span>
          }
          title="Gründer-Chancen: Preisgeld, Investoren, Kontakte"
          lead={
            <p>
              Wettbewerbe und Accelerator mit Bewerbungsfrist, Hackathons mit Preisgeld, Pitch-Abende mit Investoren sowie Marketing-
              und Netzwerk-Events – {alle.length} Chancen in einer Liste. Mit Chancen-Alarm: jeden Montag das Neue per Mail.
            </p>
          }
        />

        <div className="container max-w-5xl space-y-12 px-4 py-12 md:py-16">
          {bald.length > 0 && (
            <section aria-labelledby="bald" className="rounded-2xl border border-destructive/20 bg-card p-5 shadow-card md:p-6">
              <h2 id="bald" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                <CalendarClock className="h-5 w-5 text-destructive" aria-hidden="true" /> Fristen in den nächsten 3 Wochen
              </h2>
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {bald.map((c) => <ChanceKarte key={c.id} c={c} heute={heute} />)}
              </ul>
            </section>
          )}

          {CHANCEN_ALARM_AKTIV && (
            <section id="alarm" aria-labelledby="alarm-titel" className="rounded-2xl border border-border bg-card shadow-card">
              <div className="border-b border-border/70 px-5 py-4 md:px-6">
                <h2 id="alarm-titel" className="flex items-center gap-2 text-lg font-semibold tracking-tight"><BellRing className="h-5 w-5 text-accent-blue" aria-hidden="true" /> Chancen-Alarm per E-Mail</h2>
                <p className="mt-0.5 text-sm text-muted-foreground">Jeden Montag eine Mail mit den neuen Chancen zu deiner Auswahl und den Fristen der Woche. Kostenlos, ohne Konto.</p>
              </div>
              <div className="p-5 md:p-6"><ChancenAlarmBox /></div>
            </section>
          )}

          <section aria-labelledby="liste">
            <h2 id="liste" className="sr-only">Alle Chancen</h2>
            <div className="flex flex-wrap gap-2">
              <button type="button" aria-pressed={art === "alle"} onClick={() => { setArt("alle"); setAnzahl(SEITE); }}
                className={`h-9 rounded-full border px-3 text-sm font-medium transition-colors ${art === "alle" ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card text-foreground/80 hover:border-foreground/25"}`}>
                Alle
              </button>
              {ARTEN.map((a) => (
                <button key={a} type="button" aria-pressed={art === a} onClick={() => { setArt(a); setAnzahl(SEITE); }}
                  className={`h-9 rounded-full border px-3 text-sm font-medium transition-colors ${art === a ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card text-foreground/80 hover:border-foreground/25"}`}>
                  {CHANCEN_ARTEN[a].emoji} {CHANCEN_ARTEN[a].name} <span className="tabular opacity-70">{zaehler[a]}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_240px]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input aria-label="Suchen" placeholder="Suchen, z. B. KI, E-Commerce, Hamburg …" value={suche} onChange={(e) => { setSuche(e.target.value); setAnzahl(SEITE); }} className="pl-9" />
              </div>
              <select aria-label="Region" value={region} onChange={(e) => { setRegion(e.target.value); setAnzahl(SEITE); }} className={selectCls}>
                <option value="alle">Ganz Deutschland</option>
                {Object.entries(BUNDESLAND_NAMES).filter(([k]) => k !== "bund").map(([k, n]) => <option key={k} value={k}>{n} + bundesweit</option>)}
                <option value="online">Nur online</option>
              </select>
            </div>
            <label className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" checked={ohneNurFrauen} onChange={(e) => setOhneNurFrauen(e.target.checked)} className="h-4 w-4 rounded border-input" />
              Events nur für Frauen ausblenden
            </label>

            <p className="mt-6 text-sm text-muted-foreground"><span className="font-semibold text-foreground tabular">{gefiltert.length}</span> Chancen</p>
            {gruppen.map((g) => (
              <div key={g.titel} className="mt-6">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{g.titel}</h3>
                <ul className="grid gap-3 md:grid-cols-2">
                  {g.eintraege.map((c) => <ChanceKarte key={c.id} c={c} heute={heute} />)}
                </ul>
              </div>
            ))}
            {gefiltert.length === 0 && <p className="mt-6 rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">Keine Treffer – nimm einen Filter heraus.</p>}
            {gefiltert.length > anzahl && (
              <div className="mt-6 text-center">
                <Button variant="outline" onClick={() => setAnzahl((n) => n + SEITE)}>Weitere {Math.min(SEITE, gefiltert.length - anzahl)} anzeigen</Button>
              </div>
            )}
          </section>

          <CtaBand
            title="Bevor du pitchst: Unterlagen fertig machen"
            actions={
              <>
                <Button asChild size="lg" className={ctaPrimaryOnInk}>
                  <Link to="/cockpit/pitch-deck">Pitch-Deck bauen <ArrowRight /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className={ctaSecondaryOnInk}>
                  <Link to="/startup-guthaben">Startup-Guthaben</Link>
                </Button>
              </>
            }
          >
            Pitch-Deck, Finanzplan und Businessplan baust du im GründerX-Cockpit – Schritt für Schritt mit Felix.
          </CtaBand>

          <PublicSection title="Häufige Fragen">
            <FaqList items={faqs} />
          </PublicSection>

          <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Wettbewerbe, Programme und Konferenzen sind an der Veranstalterseite geprüft; Termine und Hackathons kommen täglich aus dem
            Event-Monitor und von Devpost. Preisgelder sind Angaben der Veranstalter, kein Anspruch. Alle Termine vor der Anmeldung beim
            Veranstalter prüfen. Mehr Termine je Bundesland: <Link to="/gruender-events" className="text-accent-blue hover:underline">Gründer-Events</Link>.
          </p>
          <HubNav show={["tools", "guides", "ratgeber"]} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
