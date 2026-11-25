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
import { HeroFahrplan } from "./HeroFahrplan";
import { PLANS, FOUNDER_CODE, FOUNDER_KURZ, formatEurCents } from "@/config/pricing";
import { BentoGrid, HeroCentered, ScreenshotFrame, SectionHead, TextMarquee, type BentoItem } from "@/components/marketing/Marketing";
import { SCREENS } from "@/data/screenshots";

/** Faktisch, keine erfundenen Kundenzahlen. Zahlen kommen direkt aus den Datenquellen. */
const proof = [
  { value: String(GUIDE_COUNT), label: "Interaktive Guides" },
  { value: String(TOOL_COUNT), label: "Tools & Rechner" },
  { value: "12 bis 70", label: "Jahre Zielgruppe" },
  { value: String(ANBIETER_ANZAHL), label: "Anbieter verglichen" },
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

const ALTER_WEGE = [
  { to: "/u18-gruenden", badge: "12 bis 17 Jahre", titel: "Unter 18 & Eltern", kurz: "Erst bauen, dann sauber mit § 112 BGB anmelden", icon: Sparkles },
  { to: "/studenten-azubis", badge: "18 bis 25 Jahre", titel: "Studium & Ausbildung", kurz: "BAföG, Familienversicherung & erstes Gewerbe", icon: GraduationCap },
  { to: "/nebengewerbe", badge: "Neben dem Job", titel: "Nebengewerbe starten", kurz: "Arbeitgeber, 24.500 € Freibetrag & ELSTER", icon: Briefcase },
  { to: "/webseite-und-app", badge: "Digital bauen", titel: "Eigene Website & App", kurz: "Von Domain & Impressum bis in die App-Stores", icon: Smartphone },
  { to: "/us-setup", badge: "International", titel: "US-LLC & Amex US", kurz: "Global Transfer, Cloud Residence, Tello eSIM & Bank", icon: CreditCard },
  { to: "/gruenden-ab-50", badge: "50 bis 70 Jahre", titel: "Neustart & Beratung", kurz: "Freiberuf, erste Rechnung & Hinzuverdienst ohne Hektik", icon: UserCheck },
];

const FUER_WEN: BentoItem[] = [
  { to: "/influencer", title: "Creator & Influencer", text: "Gewerbe, Fragebogen, PR-Pakete, Affiliate und Rechnungen an Marken.", icon: Sparkles, bild: SCREENS.ausInfluencer, chip: "Gratis-Check" },
  { to: "/tiktok-shop", title: "TikTok Shop", text: "Registrierung, LUCID, WEEE und Plattform-Meldung in Reihenfolge.", icon: ShoppingBag, bild: SCREENS.ausTiktok, chip: "Gratis-Checkliste" },
  { to: "/amazon-haendler", title: "Amazon- & Shop-Händler", text: "Pflichtregistrierungen, OSS und Marge, bevor Angebote inaktiv werden.", icon: Store, bild: SCREENS.ausLucid },
  { to: "/freelancer-agentur", title: "Freelancer & Agenturen", text: "Freiberuf vs. Gewerbe, Stundensatz, E-Rechnung und KSA.", icon: Briefcase, bild: SCREENS.ausGewerbe },
  { to: "/us-setup", title: "US-LLC & Amex US", text: "Echte Praxis-Reihenfolge statt Gerüchte: Adresse, eSIM, US-Bank & Global Transfer.", icon: CreditCard, bild: SCREENS.ausKalender, chip: "Neu" },
];

export const Hero = () => (
  <>
    <HeroCentered
      eyebrow={
        <>
          <img src="/mascots/felix-face-64.webp" alt="" width={20} height={20} className="h-5 w-5 rounded-full border border-border bg-secondary object-cover" />
          Das interaktive Lernsystem für Gründung, Website, App & Steuern
        </>
      }
      title="Gründen einfach durchklicken."
      accent="In der richtigen Reihenfolge."
      lead={
        <>
          Wenig Text, klare Schritte, direkte Arbeitsfenster: Von der ersten Website oder App bis zu Gewerbe,
          ELSTER, Amazon und Amex US. Gebaut für Handy und Web, für alle von 12 bis 70.
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
      <ScreenshotFrame shot={SCREENS.dashboard} priority caption="Dein Lern-Cockpit mit Level, Streak und nächstem Schritt" />
    </HeroCentered>

    {/* Fakten-Streifen */}
    <div className="border-b border-border bg-background">
      <dl className="container grid max-w-6xl grid-cols-2 divide-border px-4 md:grid-cols-4 md:divide-x">
        {proof.map((p) => (
          <div key={p.label} className="py-5 pr-2 md:px-6 md:first:pl-0">
            <dt className="sr-only">{p.label}</dt>
            <dd className="text-xl font-semibold text-primary tabular md:text-2xl">{p.value}</dd>
            <dd className="mt-0.5 text-sm text-muted-foreground">{p.label}</dd>
          </div>
        ))}
      </dl>
    </div>

    {/* Zielgruppe 12 bis 70: Direkteinstieg nach Alter & Ziel (Knowunity/Studyflix-Klarheit) */}
    <section className="container max-w-6xl px-4 py-14 md:py-20">
      <SectionHead
        eyebrow="Für jedes Alter & Ziel (12 bis 70)"
        title="Wähl deinen Einstieg. Jeder Weg führt zum fertigen Ziel."
        lead="Alle Guides stehen jedem offen. Such dir einfach die Übersicht aus, die heute am besten zu dir passt."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ALTER_WEGE.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="press group flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-[border-color,box-shadow] duration-150 hover:border-primary/40 hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="rounded-md bg-brand-green-soft px-2 py-0.5 text-xs font-semibold text-brand-green">
                  {item.badge}
                </span>
              </div>
              <h3 className="text-base font-semibold tracking-tight text-foreground group-hover:text-primary">
                {item.titel}
              </h3>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{item.kurz}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent-blue">
                Übersicht öffnen <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          );
        })}
      </div>

      {/* Schnell-Leiste: Quizze & Listicles */}
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <Link
          to="/quiz"
          className="press flex items-center justify-between gap-4 rounded-xl border border-brand-green/35 bg-brand-green-soft/60 p-4 transition-colors hover:border-brand-green"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green text-brand-green-foreground">
              <Trophy className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Interaktive Quizze & Gründer-Umfrage</p>
              <p className="text-xs text-muted-foreground">60 Sekunden klicken, Ergebnis holen und {FOUNDER_KURZ} freischalten.</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
        </Link>

        <Link
          to="/listicles/amex-us-privat-vorteile"
          className="press flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ListChecks className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Neu: Private US-Amex aus Deutschland (7 Vorteile)</p>
              <p className="text-xs text-muted-foreground">Global Transfer, 4x Restaurants, 2x/Jahr Transfer & echte Voraussetzungen.</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-accent-blue" aria-hidden="true" />
        </Link>
      </div>
    </section>

    {/* Spezial-Bereiche */}
    <section className="container max-w-6xl px-4 pb-16 pt-2 md:pb-20">
      <SectionHead
        eyebrow="Weitere Use Cases"
        title="Shop, Creator, Agentur oder Ausland."
        lead="Jede Seite zeigt dir zuerst die Pflichten, dann die kostenlosen Checks und danach die passenden Guides."
      />
      <BentoGrid items={FUER_WEN} />
    </section>

    <TextMarquee label="Für die Stellen, mit denen du zu tun hast" items={STELLEN} />

    <section className="container max-w-6xl px-4 py-16 md:py-20">
      <div className="grid items-start gap-8 lg:grid-cols-[0.9fr,1.1fr] lg:gap-12">
        <div className="self-start lg:sticky lg:top-28">
          <SectionHead
            align="left"
            eyebrow="Reihenfolge statt Chaos"
            title="Was zuerst kommt. Und was warten kann."
            lead="Wir sortieren jeden Schritt mit Stand und Quelle: Gewerbe vor Fragebogen, LUCID vor dem ersten Paket, Adresse und eSIM vor dem Amex-Antrag."
          />
        </div>
        <div className="min-w-0">
          <HeroFahrplan />
        </div>
      </div>
    </section>
  </>
);
