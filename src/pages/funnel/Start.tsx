import { Check, X } from "lucide-react";
import { Seo } from "@/components/Seo";
import { StartAngebotButton } from "@/components/StartAngebotButton";
import { ScreenshotFrame } from "@/components/marketing/Marketing";
import { FunnelShell, Quellen, QUELLEN } from "@/components/funnel/FunnelShell";
import { SCREENS } from "@/data/screenshots";
import { PLANS, formatEurCents, CANCEL_NOTE, NOT_INCLUDED } from "@/config/pricing";

/**
 * /start – Kurzform-Offer-Page (08.11.2026, Betreiber: Offer-Pages/Advertorials wie AG1, Cocunat, Kinobody).
 * Ziel der Advertorials /anzeige/* und bezahlten Traffics. Ein Angebot (Startangebot „7 Tage für 1 €“,
 * nur Neukunden, danach GründerX monatlich), ein Knopf (StartAngebotButton = bestehender Kaufweg über
 * create-checkout bzw. Gast-Checkout), kein Menü. noindex: Suchtraffic gehört zu /preise.
 * Zielgruppe nach Nachfrage-Fokus: Feierabend-Händler (personas_gruenderx.json, score 60) und
 * Marketplace-Starter. Jede Zahl steht unten in den Quellen oder kommt aus config/pricing.ts.
 */

const MONAT = formatEurCents(PLANS.gruenderx.grossCents);

const DRIN: { titel: string; text: string }[] = [
  { titel: "Fragebogen-Begleiter", text: "Alle 24 Teilseiten des ELSTER-Fragebogens zur steuerlichen Erfassung in der Reihenfolge, in der ELSTER sie abfragt – mit den echten Zeilennummern." },
  { titel: "Gewerbeanmeldung-Wizard", text: "Schritt für Schritt zum ausgefüllten GewA1, bevor du zum Gewerbeamt gehst." },
  { titel: "Steuer- und Fristenkalender", text: "Alle Abgabe- und Zahlungstermine der nächsten 12 Monate für deine Situation." },
  { titel: "Marketplace-Pflichten", text: "LUCID-Wizard, WEEE/EAR-Check, OSS-Hinweise und Guides für Amazon und TikTok Shop – in der richtigen Reihenfolge." },
  { titel: "Felix, dein KI-Co-Pilot", text: "Fragen zu Gründung, Steuern und Marketplaces im Chat, mit Quellen und nächsten Schritten." },
  { titel: "Rechnungs-Generator", text: "Rechnungen als PDF mit Live-Check der Pflichtangaben, auch als Kleinunternehmer." },
];

const VERGLEICH: [string, string, string, string][] = [
  ["Kosten", "0 €", "Honorar nach StBVV oder Vereinbarung", `7 Tage 1 €, dann ${MONAT}/Monat`],
  ["Fragebogen Zeile für Zeile erklärt", "nein", "macht er für dich", "ja, alle 24 Teilseiten"],
  ["Hilft bei Fragen zum Inhalt", "Forum, keine Gewähr", "ja, mit Haftung", "Felix mit Quellen, ohne Einzelfallberatung"],
  ["Erinnert an Fristen", "nein", "je nach Kanzlei", "Steuerkalender"],
  ["Amazon/TikTok-Pflichten (LUCID, WEEE, OSS)", "selbst suchen", "je nach Auftrag", "Wizards und Guides"],
];

const FAQ: { q: string; a: string }[] = [
  { q: "Noch ein Abo?", a: `Du startest mit 7 Tagen für 1 €. Danach läuft GründerX für ${MONAT} im Monat – ${CANCEL_NOTE}` },
  { q: "Was passiert nach den 7 Tagen?", a: `Ohne Kündigung geht der Zugang in den Monatszugang über (${MONAT}/Monat). Kündigen kannst du in den 7 Tagen und danach jederzeit zum Ende der laufenden Periode im Konto unter Profil → Abrechnung.` },
  { q: "Ersetzt GründerX den Steuerberater?", a: NOT_INCLUDED + " Du kannst GründerX auch nutzen, um vorbereitet zum Steuerberater zu gehen." },
  { q: "Ich verkaufe nur nebenbei. Brauche ich das?", a: "Wer nebenbei regelmäßig mit Gewinnabsicht verkauft, braucht in der Regel ein Gewerbe und muss den Fragebogen zur steuerlichen Erfassung innerhalb eines Monats nach Beginn abgeben (§ 138 Abs. 4 AO). Genau für diesen Einstieg ist GründerX gebaut." },
  { q: "Gilt das Startangebot für jeden?", a: "Nur für Neukunden und nur für den GründerX-Monatszugang." },
  { q: "Wie bezahle ich?", a: "Über Stripe. Welche Zahlarten erscheinen, zeigt der Checkout je nach Land und Gerät." },
];

const Start = () => (
  <FunnelShell kopfRechts={<span className="hidden text-sm text-muted-foreground sm:inline">7 Tage für 1 €</span>}>
    <Seo
      title="GründerX: Gewerbe und Fragebogen Zeile für Zeile"
      description={`Gewerbe anmelden, Fragebogen zur steuerlichen Erfassung, Fristen, LUCID und WEEE – Schritt für Schritt. 7 Tage für 1 €, danach ${MONAT}/Monat, jederzeit kündbar.`}
      path="/start"
      noindex
    />

    <section className="border-b border-border/70 bg-hero pb-14 pt-10 md:pb-20 md:pt-16">
      <div className="container grid max-w-6xl items-center gap-10 px-4 md:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-blue">Für Gründung im Nebenerwerb und Marketplace-Start</p>
          <h1 className="mt-3 text-balance text-[2.2rem] font-semibold leading-[1.05] tracking-[-0.04em] md:text-[3.2rem]">
            Dein Gewerbe richtig angemeldet. <span className="text-accent-blue">Zeile für Zeile.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            70 % aller Gründungen 2025 waren nebenberuflich. Nach der Idee kommt der Papierkram: Fragebogen zur steuerlichen
            Erfassung, Fristen, die richtige Reihenfolge. GründerX führt dich durch – vom Gewerbe bis zum ersten Listing.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            {["Fragebogen: alle 24 Teilseiten mit echten ELSTER-Zeilennummern", "Gewerbeanmeldung, Fristen, LUCID, WEEE, OSS in der richtigen Reihenfolge", "Felix beantwortet Fragen mit Quellen, rund um die Uhr"].map((t) => (
              <li key={t} className="flex gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />{t}</li>
            ))}
          </ul>
          <div className="mt-7 max-w-sm"><StartAngebotButton /></div>
        </div>
        <ScreenshotFrame shot={SCREENS.fse} priority caption="Echter Screenshot: Begleiter zum Fragebogen zur steuerlichen Erfassung" />
      </div>
    </section>

    <section className="py-14 md:py-20">
      <div className="container max-w-5xl px-4">
        <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-[2rem]">Wo es bei fast allen hängt</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Ein Monat Frist", "Den Fragebogen zur steuerlichen Erfassung musst du innerhalb eines Monats nach Beginn der Tätigkeit abgeben (§ 138 Abs. 4 AO)."],
            ["Ein Kreuz, fünf Jahre", "Wer auf die Kleinunternehmerregelung verzichtet, ist mindestens fünf Kalenderjahre daran gebunden (§ 19 Abs. 3 UStG)."],
            ["Keiner erklärt es dir", "Ein Nutzer im ELSTER-Forum (März 2024): Der Support habe ihn ans Forum verwiesen – „Man kann und darf mir inhaltlich nicht helfen.“"],
          ].map(([t, x]) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="text-base font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="border-y border-border/70 bg-secondary/40 py-14 md:py-20">
      <div className="container max-w-5xl px-4">
        <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-[2rem]">Das steckt drin</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DRIN.map((d) => (
            <div key={d.titel} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="text-base font-semibold">{d.titel}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <ScreenshotFrame shot={SCREENS.gewerbe} caption="Gewerbeanmeldung-Wizard" />
          <ScreenshotFrame shot={SCREENS.lucid} caption="LUCID-Rechner mit Anbieter-Empfehlung" />
        </div>
      </div>
    </section>

    <section className="py-14 md:py-20">
      <div className="container max-w-5xl px-4">
        <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-[2rem]">Selbst, Steuerberater oder GründerX?</h2>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[640px] text-sm">
            <thead><tr className="bg-secondary/60 text-left">
              <th className="p-4"></th><th className="p-4 font-medium text-muted-foreground">Allein mit ELSTER</th>
              <th className="p-4 font-medium text-muted-foreground">Steuerberater</th><th className="p-4 font-semibold text-accent-blue">GründerX</th>
            </tr></thead>
            <tbody>
              {VERGLEICH.map(([z, a, b, c]) => (
                <tr key={z} className="border-t border-border">
                  <th scope="row" className="p-4 text-left font-medium">{z}</th>
                  <td className="p-4 text-muted-foreground">{a}</td><td className="p-4 text-muted-foreground">{b}</td>
                  <td className="p-4 font-medium">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Ein Steuerberater darf dich im Einzelfall beraten und haftet dafür – GründerX nicht. Für komplexe Fälle ist er die richtige Wahl.</p>
      </div>
    </section>

    <section className="border-y border-border/70 bg-secondary/40 py-14 md:py-20">
      <div className="container max-w-xl px-4 text-center">
        <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-[2rem]">Dein Einstieg</h2>
        <div className="mt-6 rounded-2xl border-2 border-primary bg-card p-7 text-left shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-blue">Startangebot · nur Neukunden</p>
          <p className="mt-2 text-4xl font-semibold tracking-tight tabular">1 € <span className="text-base font-normal text-muted-foreground">für 7 Tage</span></p>
          <p className="mt-1 text-sm text-muted-foreground tabular">danach {MONAT} / Monat · jederzeit kündbar</p>
          <ul className="mt-5 space-y-2 text-sm">
            {["Voller GründerX-Zugang inklusive Felix", "Alle Wizards, Rechner, Guides und der Steuerkalender", "Kein Vertrag über die gebuchte Periode hinaus"].map((t) => (
              <li key={t} className="flex gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />{t}</li>
            ))}
            <li className="flex gap-2.5 text-muted-foreground"><X className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />Keine Steuer- oder Rechtsberatung im Einzelfall, keine Amtsgebühren</li>
          </ul>
          <div className="mt-6"><StartAngebotButton /></div>
        </div>
      </div>
    </section>

    <section className="py-14 md:py-20">
      <div className="container max-w-3xl px-4">
        <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-[2rem]">Fragen, bevor du startest</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="cursor-pointer list-none font-medium">{f.q}</summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
        <Quellen eintraege={[QUELLEN.kfw, QUELLEN.ao138, QUELLEN.ustg19, QUELLEN.elsterForum, { text: "Steuerberatervergütungsverordnung (StBVV)", url: "https://www.gesetze-im-internet.de/stbgebv/" }]} />
      </div>
    </section>

    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 px-4 py-2.5 pb-[calc(0.6rem+env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <StartAngebotButton />
    </div>
  </FunnelShell>
);

export default Start;
