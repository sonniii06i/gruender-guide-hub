import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Quellen, QUELLEN } from "@/components/funnel/FunnelShell";
import { PLANS, formatEurCents, NOT_INCLUDED } from "@/config/pricing";

/**
 * /vergleich/gruendung-selbst-steuerberater-gruenderx – Vergleichsseite (08.11.2026, indexierbar). Szalinski:
 * Vergleichsseiten tragen in gesättigten Märkten (PLAYBOOK_SCALING §3). Bewusst kein Thema, das schon eine Seite
 * besitzt (/ratgeber/ug-oder-gmbh, /guides/elster-fse-fillout). Nur belegbare Aussagen; Steuerberater-Honorare
 * ohne erfundene Beträge (StBVV oder Vereinbarung). CTA → /start.
 */

const PFAD = "/vergleich/gruendung-selbst-steuerberater-gruenderx";
const MONAT = formatEurCents(PLANS.gruenderx.grossCents);

const ZEILEN: [string, string, string, string][] = [
  ["Kosten", "0 €", "Honorar nach Steuerberatervergütungsverordnung (StBVV) oder Vereinbarung", `7 Tage 1 € (Neukunden), danach ${MONAT}/Monat, jederzeit kündbar`],
  ["Fragebogen zur steuerlichen Erfassung", "Selbst ausfüllen, ELSTER-Hilfetexte", "Kann ihn für dich übernehmen", "Begleiter für alle 24 Teilseiten mit echten Zeilennummern"],
  ["Inhaltliche Fragen", "Foren, keine Gewähr", "Beratung im Einzelfall, mit Haftung", "Felix (KI) mit Quellen, keine Einzelfallberatung"],
  ["Fristen", "Selbst im Blick behalten", "Je nach Auftrag", "Steuerkalender für die nächsten zwölf Monate"],
  ["Gewerbeanmeldung", "Formular GewA1 selbst", "Je nach Auftrag", "Wizard bis zum ausgefüllten GewA1"],
  ["Amazon/TikTok-Pflichten (LUCID, WEEE, OSS)", "Selbst recherchieren", "Je nach Auftrag", "Wizards, Rechner und Guides"],
  ["Buchhaltung und Jahresabschluss", "Selbst, mit Software", "Kernleistung", "Rechner und Generatoren, kein Jahresabschluss"],
];

const FAQ: { q: string; a: string }[] = [
  { q: "Brauche ich für ein Nebengewerbe einen Steuerberater?", a: "Pflicht ist er nicht. Anmeldung, Fragebogen und Einnahmenüberschussrechnung kannst du als Einzelunternehmer selbst erledigen. Sinnvoll wird ein Steuerberater, wenn es kompliziert wird oder du bilanzieren musst." },
  { q: "Was kostet ein Steuerberater?", a: "Das Honorar richtet sich nach der Steuerberatervergütungsverordnung (StBVV) oder nach einer schriftlichen Vereinbarung und hängt vom Umfang ab. Lass dir vorab ein Angebot geben." },
  { q: "Wann ist ein Steuerberater klar die bessere Wahl?", a: "Bei einer UG oder GmbH: Sie gelten als Handelsgesellschaft und sind buchführungs- und bilanzierungspflichtig (§ 13 Abs. 3 GmbHG, §§ 238, 242 HGB). Dazu bei Betriebsprüfungen, Auslandsstrukturen oder wenn du eine verbindliche Auskunft für deinen Einzelfall brauchst." },
  { q: "Kann ich GründerX und Steuerberater kombinieren?", a: "Ja. GründerX hilft dir, vorbereitet zum Termin zu kommen und Belege, Fristen und Anmeldungen im Griff zu haben. " + NOT_INCLUDED },
  { q: "Bis wann muss der Fragebogen beim Finanzamt sein?", a: "Innerhalb eines Monats nach Beginn der Tätigkeit (§ 138 Abs. 4 AO)." },
];

const VergleichWege = () => (
  <div className="min-h-screen bg-background">
    <Seo
      title="Gründung selbst, mit Steuerberater oder GründerX?"
      description="Gründung im Nebenerwerb: selbst mit ELSTER, mit Steuerberater oder mit GründerX? Ehrlicher Vergleich von Kosten, Fristen, Fragebogen und Haftung."
      path={PFAD}
      jsonLd={{
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }}
    />
    <Navbar />
    <main className="container max-w-5xl px-4 pb-20 pt-28 md:pt-32">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent-blue">Vergleich</p>
      <h1 className="mt-3 text-balance text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.035em] md:text-[3rem]">
        Gründung selbst, mit Steuerberater oder mit GründerX?
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
        70 % aller Gründungen 2025 liefen im Nebenerwerb. Nach der Anmeldung stellt sich die Frage: Den Papierkram
        selbst machen, einen Steuerberater beauftragen oder ein Werkzeug nehmen, das dich durchführt? Hier der ehrliche
        Vergleich – inklusive der Fälle, in denen GründerX nicht die richtige Wahl ist.
      </p>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[760px] text-sm">
          <thead><tr className="bg-secondary/60 text-left">
            <th className="p-4"></th><th className="p-4 font-medium text-muted-foreground">Selbst mit ELSTER</th>
            <th className="p-4 font-medium text-muted-foreground">Steuerberater</th><th className="p-4 font-semibold text-accent-blue">GründerX</th>
          </tr></thead>
          <tbody>
            {ZEILEN.map(([z, a, b, c]) => (
              <tr key={z} className="border-t border-border align-top">
                <th scope="row" className="p-4 text-left font-medium">{z}</th>
                <td className="p-4 text-muted-foreground">{a}</td><td className="p-4 text-muted-foreground">{b}</td><td className="p-4 font-medium">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          ["Selbst reicht, wenn …", ["du ein Einzelunternehmen im Nebenerwerb hast", "du Zeit hast, dich einzulesen", "deine Fälle einfach sind (wenige Belege, keine Mitarbeiter)"]],
          ["Steuerberater, wenn …", ["du eine UG oder GmbH gründest (Bilanzierungspflicht)", "eine Betriebsprüfung ansteht oder du im Ausland strukturierst", "du eine verbindliche Auskunft für deinen Einzelfall brauchst"]],
          ["GründerX, wenn …", ["du es selbst machen willst, aber nicht allein", "du Fragebogen, Fristen und Anmeldungen in der richtigen Reihenfolge erledigen willst", "du auf Amazon oder TikTok Shop verkaufst und LUCID, WEEE und OSS klären musst"]],
        ].map(([t, liste]) => (
          <div key={t as string} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-base font-semibold">{t as string}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {(liste as string[]).map((x) => <li key={x} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />{x}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-primary/40 bg-accent/40 p-6 md:p-8">
        <h2 className="text-xl font-semibold tracking-tight">GründerX 7 Tage für 1 € testen</h2>
        <p className="mt-2 max-w-2xl leading-relaxed text-foreground/85">
          Für Neukunden: voller Zugang inklusive Fragebogen-Begleiter, Gewerbeanmeldung, Steuerkalender und Felix. Danach
          {" "}{MONAT}/Monat, jederzeit zum Ende der laufenden Periode kündbar.
        </p>
        <Button asChild className="mt-4 h-11 rounded-xl bg-gradient-primary px-6 font-semibold">
          <Link to="/start" data-track="vergleich-wege-cta">Zum Startangebot <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" /></Link>
        </Button>
      </div>

      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight">Häufige Fragen</h2>
        <div className="mt-4 divide-y divide-border border-y border-border">
          {FAQ.map((f) => (
            <details key={f.q} className="py-4"><summary className="cursor-pointer list-none font-medium">{f.q}</summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p></details>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Mehr zur Rechtsformwahl: <Link to="/ratgeber/ug-oder-gmbh" className="underline underline-offset-2">UG oder GmbH?</Link> ·
          {" "}Ausfüllhilfe: <Link to="/guides/elster-fse-fillout" className="underline underline-offset-2">Fragebogen in ELSTER ausfüllen</Link>
        </p>
        <Quellen eintraege={[
          QUELLEN.kfw, QUELLEN.ao138,
          { text: "Steuerberatervergütungsverordnung (StBVV)", url: "https://www.gesetze-im-internet.de/stbgebv/" },
          { text: "§ 13 GmbHG: GmbH gilt als Handelsgesellschaft", url: "https://www.gesetze-im-internet.de/gmbhg/__13.html" },
          { text: "§ 238 HGB: Buchführungspflicht", url: "https://www.gesetze-im-internet.de/hgb/__238.html" },
          { text: "§ 242 HGB: Pflicht zur Aufstellung des Jahresabschlusses", url: "https://www.gesetze-im-internet.de/hgb/__242.html" },
        ]} />
      </section>
    </main>
    <Footer />
  </div>
);

export default VergleichWege;
