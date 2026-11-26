import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  CreditCard,
  GraduationCap,
  ListChecks,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Trophy,
  UserCheck,
} from "lucide-react";
import { TOOL_COUNT, GUIDE_COUNT, ANBIETER_ANZAHL } from "@/data/kennzahlen";
import { PLAYBOOKS } from "@/data/playbooks";
import { PLANS, FOUNDER_CODE, FOUNDER_KURZ, formatEurCents } from "@/config/pricing";
import { BentoGrid, HeroCentered, SectionHead, TextMarquee, type BentoItem } from "@/components/marketing/Marketing";
import { InteractiveHeroDemo } from "@/components/landing/InteractiveHeroDemo";
import { HeroFahrplan } from "@/components/landing/HeroFahrplan";
import { CourseCoverCard } from "@/components/CourseCoverCard";
import { guideHref } from "@/data/guideMerges";
import { SCREENS } from "@/data/screenshots";
import { cn } from "@/lib/utils";

const proof = [
  { value: String(GUIDE_COUNT), label: "Interaktive Kurse & Guides" },
  { value: String(TOOL_COUNT), label: "Tools, Rechner & Wizards" },
  { value: "12 bis 70", label: "Jahre Zielgruppe" },
  { value: String(ANBIETER_ANZAHL), label: "Anbieter im Vergleich" },
];

const STELLEN = [
  "Gewerbeamt",
  "ELSTER",
  "Finanzamt",
  "BZSt",
  "LUCID",
  "stiftung ear",
  "Amazon",
  "TikTok Shop",
  "App Store & Play Store",
  "American Express US",
];

interface ZielgruppePfad {
  id: string;
  to: string;
  badge: string;
  titel: string;
  kurz: string;
  icon: typeof Sparkles;
  steps: { nr: string; label: string; detail: string }[];
  quizLink: string;
}

const ALTER_WEGE: ZielgruppePfad[] = [
  {
    id: "u18",
    to: "/u18-gruenden",
    badge: "12 bis 17 Jahre",
    titel: "Unter 18 & Eltern",
    kurz: "Erst bauen, dann sauber mit Eltern und § 112 BGB anmelden.",
    icon: Sparkles,
    steps: [
      { nr: "01", label: "Projekt bauen", detail: "Erste Website, App oder Content ohne Amt sofort ausprobieren." },
      { nr: "02", label: "Eltern & Familiengericht", detail: "Vorlage für § 112 BGB direkt im Arbeitsfenster vorbereiten." },
      { nr: "03", label: "Gewerbe & Konto", detail: "GewA1 ausfüllen, Steuernummer holen und erste Rechnung stellen." },
    ],
    quizLink: "/quiz/u18-start-check",
  },
  {
    id: "studium",
    to: "/studenten-azubis",
    badge: "18 bis 25 Jahre",
    titel: "Studium & Ausbildung",
    kurz: "BAföG, Familienversicherung und erstes eigenes Gewerbe im Blick.",
    icon: GraduationCap,
    steps: [
      { nr: "01", label: "Grenzen prüfen", detail: "Krankenkasse, BAföG-Freibetrag und Kleinunternehmer-Status checken." },
      { nr: "02", label: "Anmelden & ELSTER", detail: "Gewerbe + Fragebogen zur steuerlichen Erfassung in Reihenfolge." },
      { nr: "03", label: "Erster Umsatz", detail: "Rechnungs-Generator & Steuer-Rücklage ab dem ersten Kunden." },
    ],
    quizLink: "/quiz/gruendertyp",
  },
  {
    id: "nebenberuf",
    to: "/nebengewerbe",
    badge: "Neben dem Job",
    titel: "Nebengewerbe starten",
    kurz: "Arbeitgeber informieren, 24.500 € Freibetrag verstehen, sauber skalieren.",
    icon: Briefcase,
    steps: [
      { nr: "01", label: "Arbeitsvertrag prüfen", detail: "Nebentätigkeit sauber anzeigen und Konkurrenz ausschließen." },
      { nr: "02", label: "GewA1 & Fragebogen", detail: "Nebenerwerb korrekt melden und Vorauszahlungen planen." },
      { nr: "03", label: "Steuer-Cockpit", detail: "Einnahmen neben dem Gehalt ohne Nachzahlungsschock steuern." },
    ],
    quizLink: "/quiz/nebengewerbe-ready",
  },
  {
    id: "webapp",
    to: "/webseite-und-app",
    badge: "Digital bauen",
    titel: "Eigene Website & App",
    kurz: "Von Domain und Impressum bis in den App Store oder ersten Shop-Sale.",
    icon: Smartphone,
    steps: [
      { nr: "01", label: "Domain & Fundament", detail: "Name prüfen, Hosting wählen, Impressum & Datenschutz sauber setzen." },
      { nr: "02", label: "Zahlung & Steuern", detail: "Stripe/App-Store-Abrechnung, Bruttopreise und Rechnungen einrichten." },
      { nr: "03", label: "SEO & KI-Sichtbarkeit", detail: "Seiten so strukturieren, dass Google und KI-Suche sie finden." },
    ],
    quizLink: "/quiz/website-oder-app",
  },
  {
    id: "us",
    to: "/us-setup",
    badge: "International",
    titel: "US-LLC & Amex US",
    kurz: "Global Transfer, Cloud Residence, Tello eSIM und echtes US-Bankkonto.",
    icon: CreditCard,
    steps: [
      { nr: "01", label: "US-Adresse & Utility", detail: "Echte US-Wohnadresse inkl. Utility-Rechnung (z. B. Cloud Residence)." },
      { nr: "02", label: "Tello eSIM & Bank", detail: "US-Nummer für Amex-Anrufe + sicheres US-Filialkonto (Chase/BofA)." },
      { nr: "03", label: "Global Transfer & Business", detail: "Erst private US-Amex über Global Transfer, dann Business-Karten." },
    ],
    quizLink: "/quiz/amex-us-check",
  },
  {
    id: "ab50",
    to: "/gruenden-ab-50",
    badge: "50 bis 70 Jahre",
    titel: "Neustart & Beratung",
    kurz: "Freiberuf, Beratung oder eigenes Produkt ohne Fachchinesisch.",
    icon: UserCheck,
    steps: [
      { nr: "01", label: "Freiberuf oder Gewerbe", detail: "In 2 Minuten klären, ob das Finanzamt allein reicht (§ 18 EStG)." },
      { nr: "02", label: "Krankenkasse & Rente", detail: "Hinzuverdienst, GKV/PKV und Absicherung nüchtern durchrechnen." },
      { nr: "03", label: "Angebote & Rechnungen", detail: "Professionelle PDF-/XRechnungen und klare Preis-Kalkulation." },
    ],
    quizLink: "/quiz/gruendertyp",
  },
];

const FEATURED_SLUGS = [
  "amex-us-beantragen",
  "eigene-app-launchen",
  "erste-webseite-seo",
  "gmbh-gruendung",
  "amazon-fba-launch",
  "tiktok-shop-starten",
];

const FUER_WEN: BentoItem[] = [
  { to: "/influencer", title: "Creator & Influencer", text: "Gewerbe, Fragebogen, PR-Pakete, Affiliate und Rechnungen an Marken.", icon: Sparkles, bild: SCREENS.ausInfluencer, chip: "Gratis-Check" },
  { to: "/tiktok-shop", title: "TikTok Shop", text: "Registrierung, LUCID, WEEE und Plattform-Meldung in Reihenfolge.", icon: ShoppingBag, bild: SCREENS.ausTiktok, chip: "Gratis-Checkliste" },
  { to: "/amazon-haendler", title: "Amazon- & Shop-Händler", text: "Pflichtregistrierungen, OSS und Marge, bevor Angebote inaktiv werden.", icon: Store, bild: SCREENS.ausLucid },
  { to: "/freelancer-agentur", title: "Freelancer & Agenturen", text: "Freiberuf vs. Gewerbe, Stundensatz, E-Rechnung und KSA.", icon: Briefcase, bild: SCREENS.ausGewerbe },
  { to: "/us-setup", title: "US-LLC & Amex US", text: "Echte Praxis-Reihenfolge: US-Adresse, Tello eSIM, US-Bank & Global Transfer.", icon: CreditCard, bild: SCREENS.ausKalender, chip: "Neu" },
];

export const Hero = () => {
  const [selectedZiel, setSelectedZiel] = useState<string>("webapp");
  const aktiverPfad = ALTER_WEGE.find((a) => a.id === selectedZiel) ?? ALTER_WEGE[0];
  const featuredGuides = FEATURED_SLUGS.map((slug) => PLAYBOOKS.find((p) => p.slug === slug)).filter(
    (x): x is NonNullable<typeof x> => Boolean(x),
  );

  return (
    <>
      <HeroCentered
        eyebrow={
          <>
            <img
              src="/mascots/felix-face-64.webp"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 rounded-full border border-white/25 bg-white/10 object-cover"
            />
            Das interaktive Lern-Studio für Gründung, Website, App &amp; Steuern
          </>
        }
        title="Gründen wie ein Kurs."
        accent="In der richtigen Reihenfolge."
        lead={
          <>
            Wenig Text, klare Schritte, direkte Arbeitsfenster: Klick dich von der ersten Website oder App bis zu
            Gewerbe, ELSTER, Amazon und Amex US. Gebaut für Handy und Web, für alle von 12 bis 70.
          </>
        }
        primary={{ to: "/quiz/gruendertyp", label: "60-Sekunden-Quiz starten" }}
        secondary={{ to: "/gratis-tools", label: "Gratis-Tools testen" }}
        trust={[
          `${formatEurCents(PLANS.gruenderx.grossCents)}/Monat inkl. USt.`,
          "Monatlich kündbar",
          `${FOUNDER_KURZ} mit Code ${FOUNDER_CODE.code}`,
        ]}
      >
        <InteractiveHeroDemo />
      </HeroCentered>

      {/* Schwebende Fakten-Leiste über der Hero-Kante */}
      <div className="container relative z-20 -mt-7 max-w-6xl px-4">
        <dl className="grid grid-cols-2 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-lift md:grid-cols-4 md:divide-x md:divide-y-0">
          {proof.map((p) => (
            <div key={p.label} className="px-5 py-4 md:px-6 md:py-5">
              <dt className="sr-only">{p.label}</dt>
              <dd className="text-2xl font-bold tracking-tight text-primary tabular md:text-[1.75rem]">{p.value}</dd>
              <dd className="mt-0.5 text-xs font-medium text-muted-foreground md:text-sm">{p.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Interaktiver Alters- & Ziel-Wechsler (12 bis 70) */}
      <section className="container max-w-6xl px-4 py-14 md:py-20">
        <SectionHead
          eyebrow="Für jedes Alter & Ziel (12 bis 70)"
          title="Wähl deinen Einstieg. Sieh sofort deine ersten 3 Schritte."
          lead="Alle 81 Kurse stehen jedem offen. Klick auf deine Lebenslage und sieh direkt, was zuerst kommt und was warten kann."
        />

        {/* Interaktive Tab-Leiste */}
        <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Zielgruppe wählen">
          {ALTER_WEGE.map((item) => {
            const Icon = item.icon;
            const active = item.id === aktiverPfad.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedZiel(item.id)}
                className={cn(
                  "press inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "border-primary bg-primary text-white shadow-sm"
                    : "border-border bg-card text-foreground/85 hover:border-primary/40 hover:bg-secondary/60",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{item.titel}</span>
                <span
                  className={cn(
                    "hidden rounded-md px-1.5 py-0.5 text-[11px] font-bold sm:inline",
                    active ? "bg-white/15 text-[#6EE7B7]" : "bg-secondary text-muted-foreground",
                  )}
                >
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interaktives 3-Schritte-Studio für die gewählte Zielgruppe */}
        <div className="gx-card overflow-hidden">
          <div className="flex flex-col justify-between gap-4 border-b border-border bg-secondary/40 px-5 py-5 sm:flex-row sm:items-center md:px-7">
            <div>
              <span className="inline-flex items-center rounded-full bg-brand-green-soft px-2.5 py-0.5 text-xs font-bold text-brand-green">
                {aktiverPfad.badge}
              </span>
              <h3 className="mt-1.5 text-xl font-bold text-primary">{aktiverPfad.titel}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{aktiverPfad.kurz}</p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Link
                to={aktiverPfad.to}
                className="press inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-white hover:bg-primary/90"
              >
                Komplette Übersicht <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to={aktiverPfad.quizLink}
                className="press inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-border bg-card px-4 text-sm font-semibold text-foreground hover:border-primary/40"
              >
                Passendes Quiz starten
              </Link>
            </div>
          </div>

          <ol className="grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
            {aktiverPfad.steps.map((s) => (
              <li key={s.nr} className="p-5 md:p-6">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-xs font-bold text-white tabular">
                  {s.nr}
                </span>
                <p className="mt-3 text-base font-bold text-foreground">{s.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Schnell-Leiste: Quizze & Amex US Listicle */}
        <div className="mt-5 grid gap-3.5 md:grid-cols-2">
          <Link
            to="/quiz"
            className="gx-card gx-card-hover press flex items-center justify-between gap-4 border-brand-green/35 bg-brand-green-soft/65 p-5"
          >
            <div className="flex items-center gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green text-white shadow-sm">
                <Trophy className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">12 interaktive Quizze &amp; Gründer-Umfragen</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  60 Sekunden klicken, Ergebnis + XP holen und {FOUNDER_KURZ} freischalten.
                </p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
          </Link>

          <Link
            to="/listicles/amex-us-privat-vorteile"
            className="gx-card gx-card-hover press flex items-center justify-between gap-4 p-5"
          >
            <div className="flex items-center gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
                <ListChecks className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">Neu: Private US-Amex aus Deutschland (7 Vorteile)</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Global Transfer, 4x Restaurants, 2x/Jahr Transfer &amp; die echten Bank-Voraussetzungen.
                </p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Udemy / Masterclass Kurs-Regal direkt auf der Startseite */}
      <section className="border-y border-border bg-secondary/35 py-14 md:py-20">
        <div className="container max-w-6xl px-4">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHead
              eyebrow="Masterclass-Kursbibliothek"
              title="81 Kurse zum Durchklicken, mit direktem Arbeitsfenster."
              lead="Kein stundenlanges Suchen in Foren. Jeder Kurs zerlegt ein Ziel in kleine Schritte mit Checkliste, Kosten, XP und Werkzeug."
            />
            <Link
              to="/guides"
              className="press inline-flex min-h-11 shrink-0 items-center gap-1.5 self-start rounded-xl border border-primary/25 bg-card px-4 text-sm font-bold text-primary shadow-sm hover:bg-primary hover:text-white sm:mb-10"
            >
              Alle {GUIDE_COUNT} Kurse ansehen <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredGuides.map((g) => (
              <CourseCoverCard
                key={g.slug}
                slug={g.slug}
                title={g.title}
                subtitle={g.outcome}
                duration={g.duration}
                difficulty={g.difficulty}
                stepsCount={g.steps.length}
                to={guideHref(g.slug)}
                badgeText={g.slug === "amex-us-beantragen" ? "Neu · US & Amex" : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Spezial-Bereiche */}
      <section className="container max-w-6xl px-4 py-14 md:py-20">
        <SectionHead
          eyebrow="Spezial-Einstiege"
          title="Shop, Creator, Agentur oder Ausland."
          lead="Jede Seite zeigt dir zuerst die Pflichten, dann die kostenlosen Checks und danach die passenden Kurse."
        />
        <BentoGrid items={FUER_WEN} />
      </section>

      <TextMarquee label="Für alle Stellen & Plattformen" items={STELLEN} />

      <section className="container max-w-6xl px-4 py-16 md:py-20">
        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr,1.1fr] lg:gap-12">
          <div className="self-start lg:sticky lg:top-24">
            <SectionHead
              align="left"
              eyebrow="Reihenfolge statt Chaos"
              title="Was zuerst kommt. Und was warten kann."
              lead="Wir sortieren jeden Schritt mit Stand und Quelle: Gewerbe vor Fragebogen, LUCID vor dem ersten Paket, US-Adresse und eSIM vor dem Amex-Antrag."
            />
          </div>
          <div className="min-w-0">
            <HeroFahrplan />
          </div>
        </div>
      </section>
    </>
  );
};
