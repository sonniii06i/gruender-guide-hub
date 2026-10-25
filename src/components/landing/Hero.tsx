import { CalendarDays, FileText, ShoppingBag, Sparkles, Store } from "lucide-react";
import { TOOL_COUNT, GUIDE_COUNT, ANBIETER_ANZAHL } from "@/data/kennzahlen";
import { HeroFahrplan } from "./HeroFahrplan";
import { PLANS, FOUNDER_CODE, formatEurCents } from "@/config/pricing";
import { BentoGrid, HeroCentered, ScreenshotFrame, SectionHead, TextMarquee, type BentoItem } from "@/components/marketing/Marketing";
import { SCREENS } from "@/data/screenshots";

/** Bewusst faktisch, keine erfundenen Kundenzahlen. Zahlen kommen aus den Datenquellen. */
const proof = [
  { value: String(TOOL_COUNT), label: "Tools & Wizards" },
  { value: String(GUIDE_COUNT), label: "Schritt-für-Schritt-Guides" },
  { value: String(ANBIETER_ANZAHL), label: "Anbieter im Vergleich" },
  { value: "EU", label: "Server, DSGVO-konform" },
];

const STELLEN = ["Gewerbeamt", "ELSTER", "Finanzamt", "Bundeszentralamt für Steuern", "LUCID", "stiftung ear", "Amazon", "TikTok Shop", "DPMA"];

const FUER_WEN: BentoItem[] = [
  { to: "/influencer", title: "Creator & Influencer", text: "Gewerbe, Fragebogen, PR-Pakete, Affiliate und Rechnungen an Marken.", icon: Sparkles, bild: SCREENS.ausInfluencer, chip: "Gratis-Check" },
  { to: "/tiktok-shop", title: "TikTok Shop", text: "Der richtige Registrierungsweg, LUCID, WEEE und Plattform-Meldung.", icon: ShoppingBag, bild: SCREENS.ausTiktok, chip: "Gratis-Checkliste" },
  { to: "/ratgeber/amazon-fba-starten-deutschland", title: "Amazon- & Shop-Händler", text: "Pflichtregistrierungen, OSS und Marge, bevor ein Listing gesperrt wird.", icon: Store, bild: SCREENS.ausLucid },
  { to: "/tools/gewerbeanmeldung-wizard", title: "Gründer:innen", text: "Rechtsform, Gewerbeanmeldung und Steuernummer in der richtigen Reihenfolge.", icon: FileText, bild: SCREENS.ausGewerbe },
  { to: "/tools/steuerkalender", title: "Steuern & Fristen", text: "Alle Abgabe- und Zahlungstermine der nächsten 12 Monate.", icon: CalendarDays, bild: SCREENS.ausKalender },
];

export const Hero = () => (
  <>
    <HeroCentered
      eyebrow={
        <>
          <img src="/mascots/felix-face-64.webp" alt="" width={20} height={20} className="h-5 w-5 rounded-full bg-brand-green-soft object-cover" />
          Gründungs-Cockpit mit KI-Co-Pilot Felix
        </>
      }
      title="Gründung, Steuer & Marketplace-Setup."
      accent="In der richtigen Reihenfolge."
      lead={<>Für E-Commerce-Händler und Creator in Deutschland: Felix baut dir deinen Fahrplan, und {TOOL_COUNT} Tools erledigen den Papierkram dazu.</>}
      primary={{ to: "/auth", label: "Zugang freischalten" }}
      secondary={{ to: "/gratis-tools", label: "Gratis-Tools testen" }}
      trust={[
        `${formatEurCents(PLANS.gruenderx.grossCents)} im Monat inkl. USt.`,
        "Monatlich kündbar",
        `${FOUNDER_CODE.percent} % im ersten Monat mit Code ${FOUNDER_CODE.code}`,
      ]}
    >
      <ScreenshotFrame shot={SCREENS.dashboard} priority caption="Echte Ansicht aus dem GründerX-Cockpit" />
    </HeroCentered>

    {/* Ehrlicher Fakten-Streifen */}
    <div className="border-y border-border/80 bg-card/60">
      <dl className="container grid max-w-6xl grid-cols-2 divide-border/80 md:grid-cols-4 md:divide-x">
        {proof.map((p) => (
          <div key={p.label} className="px-2 py-6 md:px-6 md:first:pl-0">
            <dt className="sr-only">{p.label}</dt>
            <dd className="text-2xl font-semibold tracking-tight text-primary tabular md:text-[1.9rem]">{p.value}</dd>
            <dd className="mt-0.5 text-sm text-muted-foreground">{p.label}</dd>
          </div>
        ))}
      </dl>
    </div>

    <section className="container max-w-6xl px-4 py-16 md:py-32">
      <SectionHead
        eyebrow="Für wen"
        title={<>Ein Cockpit. Fünf Wege<br className="hidden md:block" /> ins eigene Business.</>}
        lead="Such dir deinen Einstieg aus – jeder führt zu den Pflichten, Formularen und Fristen, die für dich wirklich gelten."
      />
      <BentoGrid items={FUER_WEN} />
    </section>

    <TextMarquee label="Für die Stellen, mit denen du zu tun hast" items={STELLEN} />

    <section className="container max-w-6xl px-4 py-16 md:py-32">
      <div className="grid items-start gap-12 lg:grid-cols-[0.9fr,1.1fr] lg:gap-16">
        <div className="self-start lg:sticky lg:top-28">
          <SectionHead
            align="left"
            eyebrow="Dein Fahrplan"
            title="Jede Frist mit Paragraf. Jeder Schritt zur richtigen Zeit."
            lead="Felix sortiert, was zuerst kommt: Gewerbe vor Fragebogen, LUCID vor dem ersten Paket, OSS, bevor die EU-Lieferschwelle reißt."
          />
        </div>
        <div className="min-w-0">
          <HeroFahrplan />
        </div>
      </div>
    </section>
  </>
);
