import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, CheckCircle2, ExternalLink, Gift, Plus, Search, ShieldCheck } from "lucide-react";
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
import { PERK_KATEGORIEN, STARTUP_PERKS, type PerkKategorie, type StartupPerk } from "@/data/startupPerks";
import perksLive from "@/data/perksLive.json";

// Startup-Guthaben: alle Credits, Gratis-Zeiträume und Rabatte, die Gründer bei
// Anbietern beantragen können – an der offiziellen Seite geprüft und täglich vom
// Perk-Wächter (scripts/sync-perks.ts) gegengeprüft. Der Perk-Check filtert nach
// Gründungsjahr, Finanzierung und Firmen-E-Mail, der Tracker merkt sich im Browser,
// was beantragt bzw. bewilligt ist.

const SITE = "https://gruenderx.de";
const SPEICHER = "gx-startup-guthaben-v1";

type Live = { stand: string; perks: Record<string, { status: "ok" | "geaendert" | "fehler" | "browser"; detail: string; letzterErfolg: string | null }> };
const live = perksLive as unknown as Live;
type Finanzierung = "egal" | "bootstrapped" | "angel" | "vc";
type Stand = "beantragt" | "bewilligt" | "abgelehnt";
type Profil = { gruendungsjahr: string; finanzierung: Finanzierung; firmenMail: boolean | null; tracker: Record<string, Stand> };

const LEER: Profil = { gruendungsjahr: "", finanzierung: "egal", firmenMail: null, tracker: {} };
const de = (iso?: string | null) => (iso ? iso.slice(0, 10).split("-").reverse().join(".") : "–");
const usd = (n: number) => `${n.toLocaleString("de-DE")} $`;
const verlangtFirmenMail = (p: StartupPerk) => p.voraussetzungen.some((v) => /e-mail|domain/i.test(v)) || /e-mail.*domain|gmail/i.test(p.hinweis);

function passt(p: StartupPerk, pr: Profil): { ok: boolean; grund?: string } {
  const jahr = parseInt(pr.gruendungsjahr, 10);
  if (jahr && p.gruendungMaxJahre !== null) {
    const alter = new Date().getFullYear() - jahr;
    if (alter > Math.ceil(p.gruendungMaxJahre)) return { ok: false, grund: `nur bis ${p.gruendungMaxJahre < 1 ? "6 Monate" : `${p.gruendungMaxJahre} Jahre`} nach Gründung` };
  }
  if ((pr.finanzierung === "bootstrapped" || pr.finanzierung === "angel") && p.vcNoetig === true) return { ok: false, grund: "nur über Investor/Accelerator-Partner" };
  if (pr.firmenMail === false && verlangtFirmenMail(p)) return { ok: false, grund: "verlangt E-Mail mit eigener Domain" };
  return { ok: true };
}

const faqs = [
  { q: "Was sind Startup-Guthaben (Credits)?", a: "Viele Software- und Cloud-Anbieter schenken jungen Firmen Guthaben oder Gratis-Monate, damit sie ihr Produkt auf deren Plattform bauen. Typisch sind Cloud-Credits (AWS, Google, Microsoft, Cloudflare), KI-Guthaben (Claude, ElevenLabs) und Gratis-Zeiträume für Tools wie Notion, Atlassian oder PostHog." },
  { q: "Brauche ich einen Investor, um Credits zu bekommen?", a: "Nein. Claude for Startups, AWS Activate Founders, Cloudflare (10.000 $ Stufe), PostHog, Sentry, Retool, Mixpanel, IONOS und viele andere nehmen auch selbst finanzierte Gründer. Die höchsten Stufen (z. B. AWS Portfolio, Google Scale, GitHub) setzen meist einen Investor, Accelerator oder Inkubator als Partner voraus." },
  { q: "Warum wird mein Antrag abgelehnt?", a: "Der häufigste Grund ist die E-Mail-Adresse: Fast alle Programme verlangen eine Adresse mit der eigenen Website-Domain (name@deinefirma.de), Gmail oder GMX werden abgelehnt. Weitere Gründe: Firma zu alt, schon zahlender Kunde, Agentur statt Produkt oder keine erreichbare Website." },
  { q: "Muss ich ein Gewerbe oder eine GmbH haben?", a: "Für die meisten Programme brauchst du eine Firma mit Website und Domain-E-Mail; eine GmbH ist selten Pflicht. Einige Programme fragen nach dem Gründungsdatum oder Handelsregistereintrag – als Einzelunternehmen zählt die Gewerbeanmeldung." },
  { q: "Sind Credits steuerpflichtig?", a: "Credits sind in der Regel Rabatte bzw. unentgeltliche Leistungen des Anbieters. Wie du sie buchst, klärst du am besten mit deiner Steuerberatung – wichtig ist, dass du keine Ausgaben ansetzt, die du gar nicht bezahlt hast." },
  { q: "Wie aktuell sind die Angaben?", a: "Jedes Programm ist an der offiziellen Anbieterseite geprüft, nie aus Sammellisten übernommen. Ein Wächter ruft jeden Tag alle Seiten ab und prüft, ob die Kernangaben (z. B. „$1,000“) noch dastehen. Ändert ein Anbieter sein Programm, wird der Eintrag markiert." },
];

export default function StartupGuthaben() {
  const [profil, setProfil] = useState<Profil>(LEER);
  const [kat, setKat] = useState<PerkKategorie | "alle">("alle");
  const [suche, setSuche] = useState("");
  const [nurPassend, setNurPassend] = useState(false);
  const [sort, setSort] = useState<"wert" | "name">("wert");

  useEffect(() => {
    try {
      const s = localStorage.getItem(SPEICHER);
      if (s) setProfil({ ...LEER, ...JSON.parse(s) });
    } catch {
      /* ohne Speicher */
    }
  }, []);
  const aendern = (p: Partial<Profil>) =>
    setProfil((alt) => {
      const neu = { ...alt, ...p };
      try {
        localStorage.setItem(SPEICHER, JSON.stringify(neu));
      } catch {
        /* ohne Speicher */
      }
      return neu;
    });
  const setStand = (slug: string, s: Stand | null) => {
    const t = { ...profil.tracker };
    if (s) t[slug] = s;
    else delete t[slug];
    aendern({ tracker: t });
  };

  const profilGesetzt = !!profil.gruendungsjahr || profil.finanzierung !== "egal" || profil.firmenMail !== null;
  const passende = useMemo(() => STARTUP_PERKS.filter((p) => passt(p, profil).ok), [profil]);
  // Ohne Investor zählen Programme mit Investor-Stufen nicht mit ihrem Höchstwert – der wäre nicht erreichbar.
  const ohneVc = profil.finanzierung === "bootstrapped" || profil.finanzierung === "angel";
  const summe = passende.filter((p) => !ohneVc || p.vcNoetig === false).reduce((n, p) => n + (p.wertUsd ?? 0), 0);
  const ohneInvestorSumme = STARTUP_PERKS.filter((p) => p.vcNoetig !== true).length;

  const liste = useMemo(() => {
    const q = suche.trim().toLowerCase();
    return STARTUP_PERKS.filter((p) => kat === "alle" || p.kategorie === kat)
      .filter((p) => !nurPassend || passt(p, profil).ok)
      .filter((p) => !q || [p.name, p.anbieter, p.wert, ...p.leistungen].some((s) => s.toLowerCase().includes(q)))
      .sort((a, b) => (sort === "wert" ? (b.wertUsd ?? -1) - (a.wertUsd ?? -1) : a.name.localeCompare(b.name, "de")));
  }, [kat, suche, nurPassend, profil, sort]);

  const tracker = Object.entries(profil.tracker);
  const bewilligtWert = tracker.filter(([, s]) => s === "bewilligt").reduce((n, [slug]) => n + (STARTUP_PERKS.find((p) => p.slug === slug)?.wertUsd ?? 0), 0);

  const jsonLd = [
    breadcrumbSchema([
      { name: "Start", url: `${SITE}/` },
      { name: "Startup-Guthaben", url: `${SITE}/startup-guthaben` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Startup-Guthaben und Perks für Gründer",
      numberOfItems: STARTUP_PERKS.length,
      itemListElement: STARTUP_PERKS.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: `${p.name}: ${p.wert}`, url: p.url })),
    },
    faqSchema(faqs),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`Startup-Guthaben ${new Date().getFullYear()}: ${STARTUP_PERKS.length} Credits & Perks | GründerX`}
        description={`Claude, AWS, Google Cloud, Microsoft, Cloudflare, Notion, PostHog & Co.: ${STARTUP_PERKS.length} Startup-Programme mit Guthaben und Gratis-Monaten – an der Anbieterseite geprüft, täglich gegengecheckt. Mit Perk-Check: was bekommst du ohne Investor?`}
        path="/startup-guthaben"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main>
        <PageHeader zentriert
          width="max-w-5xl"
          kicker={
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/25 bg-brand-green-soft px-3 py-1 text-[13px] font-medium text-brand-green">
              <Gift className="h-3.5 w-3.5" aria-hidden="true" /> {STARTUP_PERKS.length} Programme, täglich geprüft
            </span>
          }
          title="Startup-Guthaben: Credits & Perks für Gründer"
          lead={
            <p>
              KI-Guthaben, Cloud-Credits und Gratis-Monate von Anthropic, AWS, Google, Cloudflare, Notion & Co., mit den
              echten Bedingungen von der Anbieterseite. {ohneInvestorSumme} davon bekommst du auch ohne Investor.
            </p>
          }
        />

        <div className="container max-w-5xl space-y-12 px-4 py-12 md:py-16">
          {/* Perk-Check */}
          <section aria-labelledby="perk-check" className="rounded-2xl border border-border bg-card shadow-card">
            <div className="border-b border-border/70 px-5 py-4 md:px-6">
              <h2 id="perk-check" className="text-lg font-semibold tracking-tight">Perk-Check: Was steht dir zu?</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">Drei Angaben, dann siehst du, welche Programme zu dir passen. Bleibt in deinem Browser.</p>
            </div>
            <div className="p-5 md:p-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <label className="block space-y-1.5 text-sm">
                  <span className="block font-medium">Gründungsjahr</span>
                  <Input inputMode="numeric" maxLength={4} placeholder="z. B. 2025" value={profil.gruendungsjahr} onChange={(e) => aendern({ gruendungsjahr: e.target.value.replace(/\D/g, "") })} />
                </label>
                <label className="block space-y-1.5 text-sm">
                  <span className="block font-medium">Finanzierung</span>
                  <select value={profil.finanzierung} onChange={(e) => aendern({ finanzierung: e.target.value as Finanzierung })} className={selectCls}>
                    <option value="egal">Keine Angabe</option>
                    <option value="bootstrapped">Selbst finanziert</option>
                    <option value="angel">Business Angel / Förderung</option>
                    <option value="vc">VC, Accelerator oder Inkubator</option>
                  </select>
                </label>
                <div className="space-y-1.5 text-sm">
                  <span className="block font-medium">E-Mail mit eigener Domain?</span>
                  <div className="flex gap-2">
                    {([[true, "Ja"], [false, "Nein, Gmail o. Ä."]] as const).map(([w, t]) => (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={profil.firmenMail === w}
                        onClick={() => aendern({ firmenMail: profil.firmenMail === w ? null : w })}
                        className={`h-10 flex-1 rounded-lg border px-2 text-sm font-medium transition-colors ${profil.firmenMail === w ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card text-foreground/80 hover:border-foreground/25"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {profilGesetzt && (
                <div className="mt-6 grid gap-3 sm:grid-cols-[auto_auto_1fr] sm:items-center">
                  <div className="rounded-xl border border-accent-blue/20 bg-accent px-4 py-3">
                    <p className="text-sm text-muted-foreground">Passende Programme</p>
                    <p className="text-2xl font-semibold tabular">{passende.length}</p>
                  </div>
                  <div className="rounded-xl border border-border bg-background px-4 py-3">
                    <p className="text-sm text-muted-foreground">{ohneVc ? "Nennwert ganz ohne Investor" : "Nennwert zusammen"}</p>
                    <p className="text-2xl font-semibold tabular">bis {usd(summe)}</p>
                  </div>
                  <button type="button" onClick={() => setNurPassend((v) => !v)} className="justify-self-start text-sm font-semibold text-accent-blue hover:underline sm:justify-self-end">
                    {nurPassend ? "Alle Programme zeigen" : "Nur passende zeigen"}
                  </button>
                </div>
              )}
              {profil.firmenMail === false && (
                <p className="mt-4 flex gap-2.5 rounded-xl border border-warning/25 bg-warning-soft p-3.5 text-sm leading-relaxed">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
                  <span>
                    Fast alle Programme lehnen Gmail-Adressen ab. Eine eigene Domain mit Postfach kostet nur wenige Euro im Monat und öffnet dir den Großteil
                    dieser Liste.
                  </span>
                </p>
              )}
            </div>
          </section>

          {/* Tracker */}
          {tracker.length > 0 && (
            <section className="rounded-2xl border border-border bg-card p-5 shadow-card md:p-6">
              <h2 className="mb-3 text-base font-semibold">Deine Anträge</h2>
              <div className="flex flex-wrap gap-2 text-sm">
                {tracker.map(([slug, s]) => {
                  const p = STARTUP_PERKS.find((x) => x.slug === slug);
                  if (!p) return null;
                  return (
                    <span key={slug} className={`rounded-lg border px-3 py-1 ${s === "bewilligt" ? "border-success/25 bg-success-soft text-success" : s === "abgelehnt" ? "border-danger/25 bg-danger-soft text-danger" : "border-border bg-secondary"}`}>
                      {p.name}: {s}
                    </span>
                  );
                })}
              </div>
              {bewilligtWert > 0 && <p className="mt-3 text-sm text-muted-foreground">Bewilligt im Nennwert von <span className="tabular">{usd(bewilligtWert)}</span>.</p>}
            </section>
          )}

          {/* Filter + Liste */}
          <section aria-labelledby="programme" className="space-y-5">
            <h2 id="programme" className="text-2xl font-semibold tracking-tight">Alle Programme</h2>
            <div className="space-y-3">
              <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
                {(["alle", ...Object.keys(PERK_KATEGORIEN)] as (PerkKategorie | "alle")[]).map((k) => {
                  const n = k === "alle" ? STARTUP_PERKS.length : STARTUP_PERKS.filter((p) => p.kategorie === k).length;
                  if (!n) return null;
                  return (
                    <button
                      key={k}
                      type="button"
                      aria-pressed={kat === k}
                      onClick={() => setKat(k)}
                      className={`shrink-0 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${kat === k ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground/75 hover:border-foreground/20 hover:text-foreground"}`}
                    >
                      {k === "alle" ? "Alle" : PERK_KATEGORIEN[k].name} <span className="tabular opacity-70">{n}</span>
                    </button>
                  );
                })}
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_220px]">
                <div className="relative">
                  <label htmlFor="perk-suche" className="sr-only">Programme durchsuchen</label>
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  <Input id="perk-suche" type="search" value={suche} onChange={(e) => setSuche(e.target.value)} placeholder="Suche: Claude, Cloud, Analytics, Buchhaltung …" className="pl-9" />
                </div>
                <select value={sort} onChange={(e) => setSort(e.target.value as "wert" | "name")} aria-label="Sortierung" className={selectCls}>
                  <option value="wert">Höchster Wert zuerst</option>
                  <option value="name">Alphabetisch</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {liste.map((p) => {
                const l = live.perks[p.slug];
                const pa = passt(p, profil);
                const st = profil.tracker[p.slug];
                return (
                  <article key={p.slug} id={p.slug} className={`flex scroll-mt-24 flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition-opacity ${profilGesetzt && !pa.ok ? "opacity-60" : ""}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-xs text-muted-foreground">{PERK_KATEGORIEN[p.kategorie].name}, {p.anbieter}</div>
                        <h3 className="mt-0.5 font-semibold leading-snug">{p.name}</h3>
                      </div>
                      {p.vcNoetig === false && <span className="shrink-0 rounded-md border border-success/25 bg-success-soft px-1.5 py-0.5 text-[11px] font-semibold text-success">ohne Investor</span>}
                      {p.vcNoetig === "teilweise" && <span className="shrink-0 rounded-md border border-info/20 bg-info-soft px-1.5 py-0.5 text-[11px] font-semibold text-info">Basis ohne Investor</span>}
                      {p.vcNoetig === true && <span className="shrink-0 rounded-md border border-border bg-secondary px-1.5 py-0.5 text-[11px] font-semibold text-muted-foreground">über Partner</span>}
                    </div>
                    <p className="mt-3 text-lg font-semibold tracking-tight text-accent-blue">{p.wert}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-relaxed text-muted-foreground">
                      {p.leistungen.slice(0, 3).map((x) => <li key={x}>{x}</li>)}
                    </ul>
                    <details className="group mt-3 rounded-lg border border-border/70 bg-background/60 px-3 text-sm [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 py-2 font-medium">
                        Voraussetzungen & Fallstricke
                        <Plus className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-open:rotate-45" aria-hidden="true" />
                      </summary>
                      <ul className="list-disc space-y-1 pb-2 pl-4 text-muted-foreground">
                        {p.voraussetzungen.map((x) => <li key={x}>{x}</li>)}
                      </ul>
                      <p className="pb-3 text-muted-foreground"><strong className="text-foreground">Achtung:</strong> {p.hinweis}</p>
                    </details>
                    {profilGesetzt && !pa.ok && <p className="mt-2 text-xs font-medium text-warning">Passt nicht: {pa.grund}</p>}
                    <div className="flex-1" aria-hidden="true" />
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/70 pt-3 text-xs">
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-accent-blue hover:underline">
                        Zum Programm <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                      <span className="inline-flex items-center gap-1 text-muted-foreground" title={l?.detail}>
                        {l?.status === "ok" ? <ShieldCheck className="h-3.5 w-3.5 text-success" aria-hidden="true" /> : <AlertTriangle className="h-3.5 w-3.5 text-warning" aria-hidden="true" />}
                        {l?.status === "ok" ? `geprüft ${de(l.letzterErfolg)}` : l?.status === "geaendert" ? "Anbieter hat die Seite geändert, Bedingungen prüfen" : `geprüft ${de(p.geprueft)}`}
                      </span>
                      <select value={st ?? ""} onChange={(e) => setStand(p.slug, (e.target.value || null) as Stand | null)} aria-label={`Status ${p.name}`} className="ml-auto h-8 rounded-md border border-input bg-card px-2 text-xs">
                        <option value="">Merken …</option>
                        <option value="beantragt">Beantragt</option>
                        <option value="bewilligt">Bewilligt</option>
                        <option value="abgelehnt">Abgelehnt</option>
                      </select>
                    </div>
                  </article>
                );
              })}
            </div>
            {!liste.length && (
              <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card/60 px-6 py-12 text-center">
                <Search className="mb-3 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                <p className="font-semibold">Nichts gefunden</p>
                <p className="mt-1 text-sm text-muted-foreground">Nimm einen Filter heraus oder ändere den Suchbegriff.</p>
              </div>
            )}
          </section>

          {/* So klappt der Antrag */}
          <PublicSection title="So wird dein Antrag bewilligt">
            <ol className="grid gap-3 md:grid-cols-2">
              {[
                ["E-Mail mit eigener Domain", "name@deinefirma.de statt Gmail: Das prüfen fast alle Programme automatisch, auch beim Rechnungskonto (Google)."],
                ["Website, die nach Produkt aussieht", "Impressum, klarer Produktname, was du baust. Agenturen und Dienstleister schließen die meisten Programme aus."],
                ["Konkret beschreiben, was du auf der Plattform baust", "Zwei, drei Sätze mit Anwendungsfall und Nutzern. Beim Claude-Formular sind 50–500 Zeichen erlaubt."],
                ["Die Reihenfolge beachten", "Erst das Programm mit Domain-Pflicht, dann zahlender Kunde werden. Viele nehmen nur Neukunden (Retool: erst Monatsplan, dann Antrag)."],
                ["Fristen notieren", "Credits verfallen (Claude nach 6 Monaten, Cloudflare nach 1 Jahr). Merke dir hier, was beantragt und bewilligt ist."],
              ].map(([t, x], i) => (
                <li key={t} className="flex gap-3.5 rounded-xl border border-border bg-card p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold tabular">{i + 1}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground"><strong className="font-semibold text-foreground">{t}:</strong> {x}</span>
                </li>
              ))}
            </ol>
          </PublicSection>

          <CtaBand
            title="Neben Guthaben: Geld, das du nicht zurückzahlst"
            actions={
              <>
                <Button asChild size="lg" className={ctaPrimaryOnInk}>
                  <Link to="/cockpit/chancen-radar">Zum Chancen-Radar <ArrowRight /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className={ctaSecondaryOnInk}>
                  <Link to="/gruender-events">Fristen & Events</Link>
                </Button>
              </>
            }
          >
            Förderaufrufe, Wettbewerbe mit Preisgeld und Stipendien, täglich aktualisiert im Chancen-Radar.
          </CtaBand>

          <PublicSection title="Häufige Fragen">
            <FaqList items={faqs} />
          </PublicSection>

          <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Alle Angaben von den offiziellen Anbieterseiten, letzte automatische Prüfung {de(live.stand)}. Nennwerte sind Höchstbeträge der Anbieter, kein
            Anspruch. Keine Affiliate-Links. Programme ohne offiziell belegte Konditionen (z. B. Werbe-Neukundenguthaben) führen wir bewusst nicht auf.
          </p>
          <HubNav show={["tools", "guides", "ratgeber"]} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
