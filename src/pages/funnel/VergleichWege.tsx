import { Link } from "react-router-dom";
import { ArrowRight, Check, Info } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { ScreenshotFrame } from "@/components/marketing/Marketing";
import { Quellen, QUELLEN } from "@/components/funnel/FunnelShell";
import { SCREENS } from "@/data/screenshots";
import { PLANS, VAT_RATE, formatEurCents, NOT_INCLUDED } from "@/config/pricing";
import { START_ANGEBOT } from "@/utils/startAngebot";
import { EUER_HONORAR, STBVV, VERGLEICH_STAND } from "@/data/vergleichWege";

/**
 * /vergleich/gruendung-selbst-steuerberater-gruenderx – Vergleichsseite (08.11.2026, im Index erwünscht). Szalinski:
 * Vergleichsseiten tragen in gesättigten Märkten (PLAYBOOK_SCALING §3). Bewusst kein Thema, das schon eine Seite
 * besitzt (/ratgeber/ug-oder-gmbh, /guides/elster-fse-fillout). Nur belegbare Aussagen. CTA → /start.
 *
 * Überarbeitung 14.11.2026 (growth-lp, Persona Feierabend-Händler): Die Seite hatte keinen internen Link und war Google
 * unbekannt. Jetzt: Frage als H1 mit Antwort zuerst, Kostentabelle mit Rechenweg nach der Steuerberatervergütungs-
 * verordnung (StBVV, am 14.11.2026 am Verordnungstext gelesen: § 13, § 25 Abs. 1, Anlage 2 Tabelle B), Stand und Autor,
 * Produktbeleg, Einwände am CTA, Links ins Cluster. Die Honorarspanne wird in data/vergleichWege.ts gerechnet, nicht getippt.
 */

const SITE = "https://gruenderx.de";
const PFAD = "/vergleich/gruendung-selbst-steuerberater-gruenderx";
const MONAT = formatEurCents(PLANS.gruenderx.grossCents);
const USt = Math.round(VAT_RATE * 100);
const EUER_NETTO = `${formatEurCents(EUER_HONORAR.nettoVon)} bis ${formatEurCents(EUER_HONORAR.nettoBis)}`;
const EUER_BRUTTO = `${formatEurCents(EUER_HONORAR.bruttoVon)} bis ${formatEurCents(EUER_HONORAR.bruttoBis)}`;
const ZEIT_STUNDE = `${formatEurCents(STBVV.zeitVonCents * 4)} bis ${formatEurCents(STBVV.zeitBisCents * 4)}`;

const KOSTEN: { weg: string; preis: string; rechenweg: string }[] = [
  {
    weg: "Selbst mit ELSTER",
    preis: "0 €",
    rechenweg: "ELSTER kostet nichts. Du zahlst mit deiner Zeit und trägst die Verantwortung für jede Angabe selbst.",
  },
  {
    weg: "Steuerberater: Einnahmenüberschussrechnung",
    preis: `${EUER_NETTO} netto im Jahr (${EUER_BRUTTO} mit ${USt} % Umsatzsteuer)`,
    rechenweg: `5 bis 30 Zehntel der vollen Gebühr von ${formatEurCents(STBVV.volleGebuehrTabelleBCents)} (Tabelle B, Gegenstandswert mindestens 17.500 €). Zehntelsatz je nach Aufwand; Auslagen kommen dazu.`,
  },
  {
    weg: "Steuerberater: Steuererklärungen und Arbeit nach Zeit",
    preis: `zusätzlich; nach Zeit ${formatEurCents(STBVV.zeitVonCents)} bis ${formatEurCents(STBVV.zeitBisCents)} netto je angefangene Viertelstunde`,
    rechenweg: `Einkommensteuer-, Umsatzsteuer- und Gewerbesteuererklärung werden einzeln nach § 24 StBVV berechnet. Die Zeitgebühr entspricht ${ZEIT_STUNDE} netto je Stunde. Statt der Verordnung kann eine Vergütung in Textform vereinbart werden.`,
  },
  {
    weg: "GründerX",
    preis: `${MONAT} im Monat inklusive Umsatzsteuer`,
    rechenweg: `Monatlich kündbar. Neukunden starten mit ${START_ANGEBOT.tage} Tagen für ${START_ANGEBOT.preisText}; ohne Kündigung läuft danach der Monatszugang weiter. Keine Steuererklärung, kein Jahresabschluss.`,
  },
];

const ZEILEN: [string, string, string, string][] = [
  ["Fragebogen zur steuerlichen Erfassung", "Selbst ausfüllen, ELSTER-Hilfetexte", "Kann ihn für dich übernehmen", "Begleiter für alle 24 Teilseiten mit echten Zeilennummern"],
  ["Inhaltliche Fragen", "Foren, keine Gewähr", "Beratung im Einzelfall, mit Haftung", "Felix (KI) mit Quellen, keine Einzelfallberatung"],
  ["Fristen", "Selbst im Blick behalten", "Je nach Auftrag", "Steuerkalender für die nächsten zwölf Monate"],
  ["Gewerbeanmeldung", "Formular GewA1 selbst", "Je nach Auftrag", "Wizard bis zum ausgefüllten GewA1"],
  ["Amazon/TikTok-Pflichten (LUCID, WEEE, OSS)", "Selbst recherchieren", "Je nach Auftrag", "Wizards, Rechner und Guides"],
  ["Buchhaltung und Jahresabschluss", "Selbst, mit Software", "Kernleistung", "Rechner und Generatoren, kein Jahresabschluss"],
];
const KOPF = ["Selbst mit ELSTER", "Steuerberater", "GründerX"] as const;

const EINWAENDE: { q: string; a: string }[] = [
  {
    q: "Ich brauche das nur einmal. Wozu ein Abo?",
    a: `Der Zugang ist monatlich kündbar. Wer nur Gewerbeanmeldung und Fragebogen erledigen will, kündigt danach wieder; dann bleibt es bei ${MONAT} oder, für Neukunden in den ersten ${START_ANGEBOT.tage} Tagen, bei ${START_ANGEBOT.preisText}. Wenn du dich in ELSTER zurechtfindest, brauchst du GründerX dafür nicht.`,
  },
  {
    q: "Wenn Finanzamt und ELSTER-Hotline nicht helfen, warum dann ein Chat?",
    a: "Die Hotline hilft bei der Technik, nicht beim Inhalt. Der Fragebogen-Begleiter erklärt jede Teilseite in der Reihenfolge von ELSTER, Felix nennt zu seinen Antworten die Quelle. Eine Auskunft für deinen Einzelfall ist das nicht; die gibt dir das Finanzamt oder ein Steuerberater.",
  },
];

const FAQ: { q: string; a: string }[] = [
  { q: "Brauche ich für ein Nebengewerbe einen Steuerberater?", a: "Pflicht ist er nicht. Anmeldung, Fragebogen und Einnahmenüberschussrechnung kannst du als Einzelunternehmer selbst erledigen. Sinnvoll wird ein Steuerberater, wenn es kompliziert wird oder du bilanzieren musst." },
  { q: "Was kostet ein Steuerberater für die Einnahmenüberschussrechnung?", a: `Nach der Steuerberatervergütungsverordnung 5 bis 30 Zehntel einer vollen Gebühr nach Tabelle B, bei einem Gegenstandswert von mindestens 17.500 €. Das sind ${EUER_NETTO} netto, mit ${USt} % Umsatzsteuer ${EUER_BRUTTO}. Steuererklärungen, Auslagen und Arbeit nach Zeit kommen dazu. Lass dir vorab ein Angebot geben; eine abweichende Vergütung muss in Textform vereinbart sein.` },
  { q: "Kann ich den Fragebogen zur steuerlichen Erfassung selbst ausfüllen?", a: "Ja. Du gibst ihn über ELSTER ab, innerhalb eines Monats nach Beginn der Tätigkeit (§ 138 Abs. 4 AO). Ein Steuerberater kann das übernehmen, muss es aber nicht." },
  { q: "Wann ist ein Steuerberater klar die bessere Wahl?", a: "Bei einer UG oder GmbH: Sie gelten als Handelsgesellschaft und sind buchführungs- und bilanzierungspflichtig (§ 13 Abs. 3 GmbHG, §§ 238, 242 HGB). Dazu bei Betriebsprüfungen, Auslandsstrukturen oder wenn du eine verbindliche Auskunft für deinen Einzelfall brauchst." },
  { q: "Kann ich GründerX und Steuerberater kombinieren?", a: "Ja. GründerX hilft dir, vorbereitet zum Termin zu kommen und Belege, Fristen und Anmeldungen im Griff zu haben. Nicht enthalten: " + NOT_INCLUDED },
];

const AUTOR = { "@type": "Person", name: "Sonni Buttke", jobTitle: "Gründer von GründerX", url: `${SITE}/impressum` };

const VergleichWege = () => (
  <div className="min-h-screen bg-background">
    <Seo
      title="Nebengewerbe: Steuerberater nötig? Kosten & Vergleich 2026"
      description="Brauchst du für dein Nebengewerbe einen Steuerberater? Selbst mit ELSTER, Steuerberater oder GründerX: Kosten nach StBVV, Aufgaben und Grenzen im Vergleich."
      path={PFAD}
      type="article"
      jsonLd={[
        {
          "@context": "https://schema.org", "@type": "Article",
          headline: "Brauche ich für mein Nebengewerbe einen Steuerberater?",
          description: "Selbst mit ELSTER, mit Steuerberater oder mit GründerX: Kosten, Aufgaben und Grenzen im Vergleich.",
          datePublished: "2026-11-08", dateModified: VERGLEICH_STAND.iso,
          author: AUTOR,
          publisher: { "@type": "Organization", name: "GründerX", logo: { "@type": "ImageObject", url: `${SITE}/favicon.png` } },
          mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}${PFAD}` },
        },
        {
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        },
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Start", item: SITE },
            { "@type": "ListItem", position: 2, name: "Vergleich: selbst, Steuerberater oder GründerX", item: `${SITE}${PFAD}` },
          ],
        },
      ]}
    />
    <Navbar />
    <main className="container max-w-5xl px-4 pb-20 pt-28 md:pt-32">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent-blue">Vergleich für Gründung im Nebenerwerb</p>
      <h1 className="mt-3 text-balance text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.035em] md:text-[3rem]">
        Brauche ich für mein Nebengewerbe einen Steuerberater?
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground/85">
        Nein, Pflicht ist er nicht: Gewerbeanmeldung, Fragebogen zur steuerlichen Erfassung und Einnahmenüberschussrechnung
        darfst du als Einzelunternehmer selbst erledigen. Ein Steuerberater rechnet die Einnahmenüberschussrechnung nach der
        Vergütungsverordnung mit {EUER_NETTO} netto im Jahr ab, GründerX kostet {MONAT} im Monat und führt dich durch die
        Formulare, ersetzt ihn aber nicht.
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        Stand: <time dateTime={VERGLEICH_STAND.iso}>{VERGLEICH_STAND.text}</time> · Autor:{" "}
        <Link to="/impressum" className="font-medium text-foreground hover:underline">Sonni Buttke</Link>, Gründer von GründerX · Eigenes
        Produkt im Vergleich: GründerX
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button asChild className="h-11 rounded-xl bg-gradient-primary px-6 font-semibold">
          <Link to="/start" data-track="vergleich-wege-cta" data-cta="vergleich-wege:start-oben">Zum Startangebot: {START_ANGEBOT.tage} Tage für {START_ANGEBOT.preisText} <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" /></Link>
        </Button>
        <a href="#kosten" className="text-sm font-semibold text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">Erst die Kosten vergleichen</a>
      </div>

      <section className="mt-14" aria-labelledby="warum">
        <h2 id="warum" className="text-2xl font-semibold tracking-tight">Warum sich die Frage nach der Anmeldung stellt</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
          70 % aller Gründungen 2025 liefen im Nebenerwerb. Nach der Gewerbeanmeldung bleibt ein Monat für den Fragebogen
          zur steuerlichen Erfassung, und genau dort hängen viele. Im ELSTER-Anwenderforum beschreibt es jemand so:
          „Man kann und darf mir inhaltlich nicht helfen“ – gemeint ist die ELSTER-Hotline. Es bleiben drei Wege: selbst
          einlesen, einen Steuerberater beauftragen oder ein Werkzeug nehmen, das dich durchführt.
        </p>
      </section>

      <section id="kosten" className="mt-14 scroll-mt-28" aria-labelledby="kosten-titel">
        <h2 id="kosten-titel" className="text-2xl font-semibold tracking-tight">Was kostet welcher Weg?</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
          Beispiel: ein Nebengewerbe mit bis zu 17.500 € Betriebseinnahmen im Jahr. Für den Steuerberater gilt dann der
          Mindest-Gegenstandswert der Vergütungsverordnung; bei höheren Einnahmen steigt die Gebühr.
        </p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          <table className="w-full text-left text-[15px]">
            <caption className="sr-only">Kosten der drei Wege, Stand {VERGLEICH_STAND.text}</caption>
            <thead className="hidden bg-secondary/60 text-sm text-muted-foreground md:table-header-group">
              <tr>
                <th scope="col" className="px-5 py-3.5 font-medium">Weg</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Kosten</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Rechenweg und Umfang</th>
              </tr>
            </thead>
            <tbody>
              {KOSTEN.map((k) => (
                <tr key={k.weg} className="block border-t border-border px-5 py-4 first:border-t-0 md:table-row md:px-0 md:py-0 md:first:border-t">
                  <th scope="row" className="block pb-1.5 font-semibold leading-snug md:table-cell md:w-[26%] md:px-5 md:py-4 md:align-top">{k.weg}</th>
                  <td className="block py-0.5 font-medium text-foreground md:table-cell md:w-[30%] md:px-5 md:py-4 md:align-top">{k.preis}</td>
                  <td className="block py-0.5 text-muted-foreground md:table-cell md:px-5 md:py-4 md:align-top">{k.rechenweg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 flex max-w-3xl items-start gap-2 text-sm leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            Stand: {VERGLEICH_STAND.text}. Honorare nach der Steuerberatervergütungsverordnung (§ 13, § 24, § 25 und Tabelle B),
            eigene Rechnung. Was dein Steuerberater tatsächlich berechnet, hängt von Umfang, Zehntelsatz und Vereinbarung ab.
            Wie sich das über ein Jahr rechnet, zeigt der{" "}
            <Link to="/tools/stb-cost-benefit" className="underline underline-offset-2 hover:text-foreground">Steuerberater-Kosten-Nutzen-Check</Link>.
          </span>
        </p>
      </section>

      <section className="mt-14" aria-labelledby="aufgaben">
        <h2 id="aufgaben" className="text-2xl font-semibold tracking-tight">Wer übernimmt was?</h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Aufgaben im Vergleich: selbst mit ELSTER, Steuerberater, GründerX</caption>
            <thead className="hidden bg-secondary/60 md:table-header-group">
              <tr>
                <th scope="col" className="p-4"><span className="sr-only">Aufgabe</span></th>
                <th scope="col" className="p-4 font-medium text-muted-foreground">{KOPF[0]}</th>
                <th scope="col" className="p-4 font-medium text-muted-foreground">{KOPF[1]}</th>
                <th scope="col" className="p-4 font-semibold text-accent-blue">{KOPF[2]}</th>
              </tr>
            </thead>
            <tbody>
              {ZEILEN.map(([z, a, b, c]) => (
                <tr key={z} className="block border-t border-border px-4 py-4 first:border-t-0 md:table-row md:px-0 md:py-0 md:first:border-t">
                  <th scope="row" className="block pb-1.5 text-left text-[15px] font-semibold md:table-cell md:p-4 md:align-top md:text-sm md:font-medium">{z}</th>
                  <td className="block py-0.5 text-muted-foreground md:table-cell md:p-4 md:align-top"><span className="font-medium text-foreground md:hidden">{KOPF[0]}: </span>{a}</td>
                  <td className="block py-0.5 text-muted-foreground md:table-cell md:p-4 md:align-top"><span className="font-medium text-foreground md:hidden">{KOPF[1]}: </span>{b}</td>
                  <td className="block py-0.5 font-medium md:table-cell md:p-4 md:align-top"><span className="text-accent-blue md:hidden">{KOPF[2]}: </span>{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-14" aria-labelledby="urteil">
        <h2 id="urteil" className="text-2xl font-semibold tracking-tight">Welcher Weg passt zu welchem Fall?</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["Selbst reicht, wenn …", ["du ein Einzelunternehmen im Nebenerwerb hast", "du Zeit hast, dich einzulesen", "deine Fälle einfach sind (wenige Belege, keine Mitarbeiter)"]],
            ["Steuerberater, wenn …", ["du eine UG oder GmbH gründest (Bilanzierungspflicht)", "eine Betriebsprüfung ansteht oder du im Ausland strukturierst", "du eine verbindliche Auskunft für deinen Einzelfall brauchst"]],
            ["GründerX, wenn …", ["du es selbst machen willst, aber nicht allein", "du Fragebogen, Fristen und Anmeldungen in der richtigen Reihenfolge erledigen willst", "du auf Amazon oder TikTok Shop verkaufst und LUCID, WEEE und OSS klären musst"]],
          ].map(([t, liste]) => (
            <div key={t as string} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="text-base font-semibold">{t as string}</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {(liste as string[]).map((x) => <li key={x} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />{x}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          GründerX ist nicht die richtige Wahl, wenn du jemanden suchst, der die Erklärungen für dich abgibt und dafür
          haftet, oder wenn du nur einmal den Fragebogen absenden willst und dich in ELSTER zurechtfindest.
        </p>
      </section>

      <section className="mt-14" aria-labelledby="beleg">
        <h2 id="beleg" className="text-2xl font-semibold tracking-tight">So sieht der Fragebogen-Begleiter aus</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
          Alle 24 Teilseiten des ELSTER-Fragebogens für Einzelunternehmen in der Reihenfolge, in der ELSTER sie abfragt,
          mit den Zeilennummern der Maske. Du liest hier nach und trägst in ELSTER ein.
        </p>
        <div className="mt-6">
          <ScreenshotFrame shot={SCREENS.fse} caption="Echte Ansicht aus dem GründerX-Cockpit" />
        </div>
      </section>

      <div className="mt-12 rounded-2xl border border-primary/40 bg-accent/40 p-6 md:p-8">
        <h2 className="text-xl font-semibold tracking-tight">GründerX {START_ANGEBOT.tage} Tage für {START_ANGEBOT.preisText} testen</h2>
        <p className="mt-2 max-w-2xl leading-relaxed text-foreground/85">
          Für Neukunden: voller Zugang inklusive Fragebogen-Begleiter, Gewerbeanmeldung, Steuerkalender und Felix. Danach
          {" "}{MONAT}/Monat, jederzeit zum Ende der laufenden Periode kündbar.
        </p>
        <Button asChild className="mt-4 h-11 rounded-xl bg-gradient-primary px-6 font-semibold">
          <Link to="/start" data-track="vergleich-wege-cta" data-cta="vergleich-wege:start-unten">Zum Startangebot <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" /></Link>
        </Button>
        <dl className="mt-7 grid gap-4 border-t border-primary/20 pt-6 md:grid-cols-2">
          {EINWAENDE.map((e) => (
            <div key={e.q}>
              <dt className="font-semibold leading-snug">{e.q}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-foreground/80">{e.a}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight">Häufige Fragen</h2>
        <div className="mt-4 divide-y divide-border border-y border-border">
          {FAQ.map((f) => (
            <details key={f.q} className="py-4"><summary className="cursor-pointer list-none font-medium">{f.q}</summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p></details>
          ))}
        </div>

        <h2 className="mt-12 text-lg font-semibold tracking-tight">Weiterlesen</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li><Link to="/ratgeber/kleingewerbe-anmelden" className="font-medium text-foreground underline underline-offset-2">Kleingewerbe anmelden</Link>: Ablauf, Kosten und Fristen</li>
          <li><Link to="/ratgeber/einzelunternehmen-gruenden-gewerbe-freiberufler" className="font-medium text-foreground underline underline-offset-2">Einzelunternehmen gründen</Link>: Anmeldung, Kosten, Steuern</li>
          <li><Link to="/guides/elster-fse-fillout" className="font-medium text-foreground underline underline-offset-2">Fragebogen in ELSTER ausfüllen</Link>: die Ausfüllhilfe</li>
          <li><Link to="/tools/fse-wizard" className="font-medium text-foreground underline underline-offset-2">Fragebogen-Begleiter</Link> und <Link to="/tools/gewerbeanmeldung-wizard" className="font-medium text-foreground underline underline-offset-2">Gewerbeanmeldung-Wizard</Link></li>
          <li><Link to="/ratgeber/ug-oder-gmbh" className="font-medium text-foreground underline underline-offset-2">UG oder GmbH?</Link> – wenn es keine Einzelfirma bleiben soll</li>
          <li><Link to="/preise" className="font-medium text-foreground underline underline-offset-2">Preise von GründerX</Link></li>
        </ul>

        <Quellen eintraege={[
          QUELLEN.kfw, QUELLEN.ao138, QUELLEN.elsterForum,
          { text: "§ 4 Abs. 3 EStG: Gewinn als Überschuss der Betriebseinnahmen über die Betriebsausgaben", url: "https://www.gesetze-im-internet.de/estg/__4.html" },
          { text: "§ 25 StBVV: Gebühr für die Einnahmenüberschussrechnung, Gegenstandswert mindestens 17.500 €", url: "https://www.gesetze-im-internet.de/stbgebv/__25.html" },
          { text: "Anlage 2 StBVV (Tabelle B): volle Gebühr je Gegenstandswert", url: "https://www.gesetze-im-internet.de/stbgebv/anlage_2.html" },
          { text: "§ 13 StBVV: Zeitgebühr", url: "https://www.gesetze-im-internet.de/stbgebv/__13.html" },
          { text: "§ 24 StBVV: Gebühren für Steuererklärungen", url: "https://www.gesetze-im-internet.de/stbgebv/__24.html" },
          { text: "§ 4 StBVV: Vergütungsvereinbarung in Textform", url: "https://www.gesetze-im-internet.de/stbgebv/__4.html" },
          { text: "§ 13 GmbHG: GmbH gilt als Handelsgesellschaft", url: "https://www.gesetze-im-internet.de/gmbhg/__13.html" },
          { text: "§ 238 HGB: Buchführungspflicht", url: "https://www.gesetze-im-internet.de/hgb/__238.html" },
          { text: "§ 242 HGB: Pflicht zur Aufstellung des Jahresabschlusses", url: "https://www.gesetze-im-internet.de/hgb/__242.html" },
        ]} />
        <p className="mt-6 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            So entsteht diese Seite: mit KI-Unterstützung recherchiert und geschrieben, die Rechtsgrundlagen am Gesetzes- und
            Verordnungstext geprüft, Stand {VERGLEICH_STAND.text}. Autor und verantwortlich für den Inhalt:{" "}
            <Link to="/impressum" className="font-semibold text-foreground hover:underline">Sonni Buttke</Link>, Gründer von GründerX. Der
            Vergleich enthält das eigene Produkt. Keine Steuer- oder Rechtsberatung – im Einzelfall Steuerberater fragen.
          </span>
        </p>
      </section>
    </main>
    <Footer />
  </div>
);

export default VergleichWege;
