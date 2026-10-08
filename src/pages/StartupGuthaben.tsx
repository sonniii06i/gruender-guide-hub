import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, CheckCircle2, ExternalLink, Gift, Search, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Seo } from "@/components/Seo";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { HubNav } from "@/components/landing/HubNav";
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
        title={`Startup-Guthaben ${new Date().getFullYear()}: ${STARTUP_PERKS.length} Credits & Perks für Gründer | GründerX`}
        description={`Claude, AWS, Google Cloud, Microsoft, Cloudflare, Notion, PostHog & Co.: ${STARTUP_PERKS.length} Startup-Programme mit Guthaben und Gratis-Monaten – an der Anbieterseite geprüft, täglich gegengecheckt. Mit Perk-Check: was bekommst du ohne Investor?`}
        path="/startup-guthaben"
        jsonLd={jsonLd}
      />
      <Navbar />

      <section className="relative pt-28 pb-8 md:pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Badge variant="secondary" className="mb-4">
            <Gift className="mr-1.5 h-3.5 w-3.5" /> {STARTUP_PERKS.length} Programme · täglich geprüft
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">Startup-Guthaben: Credits & Perks für Gründer</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            KI-Guthaben, Cloud-Credits und Gratis-Monate von Anthropic, AWS, Google, Cloudflare, Notion & Co. – mit den echten
            Bedingungen von der Anbieterseite. {ohneInvestorSumme} davon bekommst du auch ohne Investor.
          </p>
        </div>
      </section>

      <section className="pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Perk-Check */}
          <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5">
            <h2 className="font-bold text-lg mb-1">Perk-Check: Was steht dir zu?</h2>
            <p className="text-sm text-muted-foreground mb-4">Drei Angaben, dann siehst du, welche Programme zu dir passen. Bleibt in deinem Browser.</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="text-sm">
                <span className="block font-medium mb-1">Gründungsjahr</span>
                <Input inputMode="numeric" maxLength={4} placeholder="z. B. 2025" value={profil.gruendungsjahr} onChange={(e) => aendern({ gruendungsjahr: e.target.value.replace(/\D/g, "") })} />
              </label>
              <label className="text-sm">
                <span className="block font-medium mb-1">Finanzierung</span>
                <select value={profil.finanzierung} onChange={(e) => aendern({ finanzierung: e.target.value as Finanzierung })} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                  <option value="egal">Keine Angabe</option>
                  <option value="bootstrapped">Selbst finanziert</option>
                  <option value="angel">Business Angel / Förderung</option>
                  <option value="vc">VC, Accelerator oder Inkubator</option>
                </select>
              </label>
              <div className="text-sm">
                <span className="block font-medium mb-1">E-Mail mit eigener Domain?</span>
                <div className="flex gap-2">
                  {([[true, "Ja"], [false, "Nein, Gmail o. Ä."]] as const).map(([w, t]) => (
                    <button key={t} type="button" onClick={() => aendern({ firmenMail: profil.firmenMail === w ? null : w })} className={`h-10 flex-1 rounded-md border px-2 text-sm ${profil.firmenMail === w ? "border-accent-blue bg-accent-blue text-primary-foreground" : "border-input bg-background"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {profilGesetzt && (
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <span><strong className="text-2xl">{passende.length}</strong> passende Programme</span>
                <span>{ohneVc ? "Nennwert der Programme ganz ohne Investor" : "Nennwert zusammen"} bis <strong>{usd(summe)}</strong></span>
                <button type="button" onClick={() => setNurPassend((v) => !v)} className="text-accent-blue font-semibold hover:underline">
                  {nurPassend ? "Alle Programme zeigen" : "Nur passende zeigen"}
                </button>
              </div>
            )}
            {profil.firmenMail === false && (
              <p className="mt-3 flex gap-2 text-sm text-amber-800 dark:text-amber-300">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  Fast alle Programme lehnen Gmail-Adressen ab. Eine eigene Domain mit Postfach kostet nur wenige Euro im Monat und öffnet dir den Großteil
                  dieser Liste.
                </span>
              </p>
            )}
          </div>

          {/* Tracker */}
          {tracker.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="font-bold mb-2">Deine Anträge</h2>
              <div className="flex flex-wrap gap-2 text-sm">
                {tracker.map(([slug, s]) => {
                  const p = STARTUP_PERKS.find((x) => x.slug === slug);
                  if (!p) return null;
                  return (
                    <span key={slug} className={`rounded-full px-3 py-1 ${s === "bewilligt" ? "bg-emerald-500/10 text-emerald-700" : s === "abgelehnt" ? "bg-red-500/10 text-red-700" : "bg-secondary"}`}>
                      {p.name}: {s}
                    </span>
                  );
                })}
              </div>
              {bewilligtWert > 0 && <p className="text-sm text-muted-foreground mt-2">Bewilligt im Nennwert von {usd(bewilligtWert)}.</p>}
            </div>
          )}

          {/* Filter */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {(["alle", ...Object.keys(PERK_KATEGORIEN)] as (PerkKategorie | "alle")[]).map((k) => {
                const n = k === "alle" ? STARTUP_PERKS.length : STARTUP_PERKS.filter((p) => p.kategorie === k).length;
                if (!n) return null;
                return (
                  <button key={k} type="button" onClick={() => setKat(k)} className={`rounded-full px-3.5 py-2 text-sm font-semibold ${kat === k ? "bg-accent-blue text-primary-foreground" : "border border-border bg-card hover:bg-secondary"}`}>
                    {k === "alle" ? "Alle" : `${PERK_KATEGORIEN[k].emoji} ${PERK_KATEGORIEN[k].name}`} <span className="opacity-70">({n})</span>
                  </button>
                );
              })}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_200px] gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input value={suche} onChange={(e) => setSuche(e.target.value)} placeholder="Suche: Claude, Cloud, Analytics, Buchhaltung …" className="pl-9" />
              </div>
              <select value={sort} onChange={(e) => setSort(e.target.value as "wert" | "name")} aria-label="Sortierung" className="h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="wert">Höchster Wert zuerst</option>
                <option value="name">Alphabetisch</option>
              </select>
            </div>
          </div>

          {/* Liste */}
          <div className="grid gap-4 md:grid-cols-2">
            {liste.map((p) => {
              const l = live.perks[p.slug];
              const pa = passt(p, profil);
              const st = profil.tracker[p.slug];
              return (
                <article key={p.slug} id={p.slug} className={`rounded-2xl border bg-card p-5 flex flex-col ${profilGesetzt && !pa.ok ? "opacity-60 border-border" : "border-border"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground">{PERK_KATEGORIEN[p.kategorie].emoji} {p.anbieter}</div>
                      <h3 className="font-bold leading-snug">{p.name}</h3>
                    </div>
                    {p.vcNoetig === false && <span className="shrink-0 rounded-full bg-emerald-500/10 text-emerald-700 px-2 py-0.5 text-[11px] font-semibold">ohne Investor</span>}
                    {p.vcNoetig === "teilweise" && <span className="shrink-0 rounded-full bg-sky-500/10 text-sky-700 px-2 py-0.5 text-[11px] font-semibold">Basis ohne Investor</span>}
                    {p.vcNoetig === true && <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold">über Partner</span>}
                  </div>
                  <p className="mt-2 font-semibold text-accent-blue">{p.wert}</p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc pl-4">
                    {p.leistungen.slice(0, 3).map((x) => <li key={x}>{x}</li>)}
                  </ul>
                  <details className="mt-2 text-sm">
                    <summary className="cursor-pointer font-medium">Voraussetzungen & Fallstricke</summary>
                    <ul className="mt-2 space-y-1 text-muted-foreground list-disc pl-4">
                      {p.voraussetzungen.map((x) => <li key={x}>{x}</li>)}
                    </ul>
                    <p className="mt-2 text-muted-foreground"><strong className="text-foreground">Achtung:</strong> {p.hinweis}</p>
                  </details>
                  {profilGesetzt && !pa.ok && <p className="mt-2 text-xs text-amber-700">Passt nicht: {pa.grund}</p>}
                  <div className="mt-auto pt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-accent-blue hover:underline">
                      Zum Programm <ExternalLink className="h-3 w-3" />
                    </a>
                    <span className="inline-flex items-center gap-1 text-muted-foreground" title={l?.detail}>
                      {l?.status === "ok" ? <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> : <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />}
                      {l?.status === "ok" ? `geprüft ${de(l.letzterErfolg)}` : l?.status === "geaendert" ? "Anbieter hat die Seite geändert – Bedingungen prüfen" : `geprüft ${de(p.geprueft)}`}
                    </span>
                    <select value={st ?? ""} onChange={(e) => setStand(p.slug, (e.target.value || null) as Stand | null)} aria-label={`Status ${p.name}`} className="ml-auto h-7 rounded-md border border-input bg-background px-2 text-xs">
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
          {!liste.length && <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">Nichts gefunden – Filter zurücksetzen.</div>}

          {/* So klappt der Antrag */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-bold text-lg mb-3">So wird dein Antrag bewilligt</h2>
            <ol className="space-y-2 text-sm text-muted-foreground">
              {[
                ["E-Mail mit eigener Domain", "name@deinefirma.de statt Gmail – das prüfen fast alle Programme automatisch, auch beim Rechnungskonto (Google)."],
                ["Website, die nach Produkt aussieht", "Impressum, klarer Produktname, was du baust. Agenturen und Dienstleister schließen die meisten Programme aus."],
                ["Konkret beschreiben, was du auf der Plattform baust", "Zwei, drei Sätze mit Anwendungsfall und Nutzern. Beim Claude-Formular sind 50–500 Zeichen erlaubt."],
                ["Die Reihenfolge beachten", "Erst das Programm mit Domain-Pflicht, dann zahlender Kunde werden – viele nehmen nur Neukunden (Retool: erst Monatsplan, dann Antrag)."],
                ["Fristen notieren", "Credits verfallen (Claude nach 6 Monaten, Cloudflare nach 1 Jahr). Merke dir hier, was beantragt und bewilligt ist."],
              ].map(([t, x], i) => (
                <li key={t} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-blue text-xs font-bold text-primary-foreground">{i + 1}</span>
                  <span><strong className="text-foreground">{t}:</strong> {x}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl bg-primary/5 p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Neben Guthaben: Geld, das du nicht zurückzahlst</h2>
            <p className="text-sm text-muted-foreground mb-4">Förderaufrufe, Wettbewerbe mit Preisgeld und Stipendien – täglich aktualisiert im Chancen-Radar.</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link to="/cockpit/chancen-radar"><Button size="lg">Zum Chancen-Radar <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
              <Link to="/gruender-events"><Button size="lg" variant="outline">Fristen & Events</Button></Link>
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
          <p className="text-xs text-muted-foreground flex items-start gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            Alle Angaben von den offiziellen Anbieterseiten, letzte automatische Prüfung {de(live.stand)}. Nennwerte sind Höchstbeträge der Anbieter, kein
            Anspruch. Keine Affiliate-Links. Programme ohne offiziell belegte Konditionen (z. B. Werbe-Neukundenguthaben) führen wir bewusst nicht auf.
          </p>
          <HubNav show={["tools", "guides", "ratgeber"]} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
