import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { FunnelShell, Quellen, QUELLEN } from "@/components/funnel/FunnelShell";
import { PLANS, formatEurCents } from "@/config/pricing";

/**
 * /anzeige/gruendung-5-gruende – Listicle/Presell (08.11.2026) nach dem Muster der Cocunat-Listicles
 * („Warum … – obwohl …: 5 Gründe“, Recherche 08.11.). Als „Anzeige“ gekennzeichnet, noindex. Jede Begründung mit Beleg;
 * die Lösung ist jeweils eine vorhandene GründerX-Funktion. CTA → /start.
 */

const GRUENDE: { titel: string; text: string; besser: string }[] = [
  {
    titel: "Du machst es in der falschen Reihenfolge",
    text: "Gewerbe, Fragebogen, Steuernummer – und je nach Ware weitere Registrierungen wie LUCID oder WEEE. Wer zuerst listet und dann registriert, wartet doppelt: Im Amazon-Verkäuferforum berichten Händler von Angeboten, die ohne hinterlegte LUCID-Nummer inaktiv gesetzt wurden.",
    besser: "Die Erste-Schritte-Roadmap von GründerX zeigt dir die Schritte für deine Situation in der richtigen Reihenfolge.",
  },
  {
    titel: "Die Forenantwort passt nicht zu deinem Formular",
    text: "Forenbeiträge haben ein Datum. Die Zeilennummern im ELSTER-Fragebogen können je Formularfassung abweichen – eine Lösung aus 2023 trifft nicht immer die Zeile, die du heute vor dir hast.",
    besser: "Der Fragebogen-Begleiter folgt der aktuellen ELSTER-Fassung mit allen 24 Teilseiten und den echten Zeilennummern.",
  },
  {
    titel: "Der Support darf dir nicht weiterhelfen",
    text: "Ein Nutzer im ELSTER-Anwenderforum schrieb im März 2024, der Support habe ihn ans Forum verwiesen: „Man kann und darf mir inhaltlich nicht helfen.“",
    besser: "Felix, der KI-Co-Pilot von GründerX, beantwortet deine Fragen mit Quellen – ohne Einzelfallberatung, aber sofort.",
  },
  {
    titel: "Ein Kreuz bindet dich fünf Jahre",
    text: "Wer auf die Kleinunternehmerregelung verzichtet, ist mindestens fünf Kalenderjahre daran gebunden (§ 19 Abs. 3 UStG). Wer unsicher ist, zögert – und das Formular bleibt liegen.",
    besser: "Bei jeder verbindlichen Entscheidung erklärt GründerX, was sie bedeutet und was daraus folgt, bevor du ankreuzt.",
  },
  {
    titel: "Die Frist läuft schon",
    text: "Den Fragebogen zur steuerlichen Erfassung musst du innerhalb eines Monats nach Beginn der Tätigkeit abgeben (§ 138 Abs. 4 AO). Der Monat beginnt mit deiner Tätigkeit, nicht mit dem Brief vom Finanzamt.",
    besser: "Der Steuerkalender von GründerX zeigt dir alle Termine der nächsten zwölf Monate für deine Situation.",
  },
];

const ListicleGruendung = () => (
  <FunnelShell anzeige>
    <Seo
      title="Gründung dauert? 5 Gründe, obwohl du alles googelst"
      description="Warum die Gründung länger dauert, obwohl du alles googelst: falsche Reihenfolge, veraltete Forenantworten, ein Kreuz mit fünf Jahren Bindung – und was hilft."
      path="/anzeige/gruendung-5-gruende"
      type="article"
      noindex
    />
    <article className="container max-w-[720px] px-4 py-10 md:py-14">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent-blue">Gründung</p>
      <h1 className="mt-3 text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] md:text-[2.6rem]">
        Warum deine Gründung länger dauert, obwohl du alles googelst: 5 Gründe
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        Gewerbe anmelden klingt nach einer Stunde. Dann kommen Formulare, Fristen und Entscheidungen, die dich jahrelang
        binden. Diese fünf Stolpersteine kosten die meiste Zeit – und so kommst du schneller durch.
      </p>
      <p className="mt-5 border-y border-border py-3 text-sm text-muted-foreground">GründerX-Redaktion · 08.11.2026 · 3 Min. Lesezeit</p>

      <ol className="mt-6">
        {GRUENDE.map((g, i) => (
          <li key={g.titel} className="border-b border-border py-7">
            <h2 className="flex items-baseline gap-3 text-xl font-semibold tracking-tight">
              <span className="inline-grid h-8 min-w-8 place-items-center rounded-lg bg-gradient-primary px-2 text-sm text-primary-foreground">{i + 1}</span>
              {g.titel}
            </h2>
            <p className="mt-3 text-[1.04rem] leading-[1.75] text-foreground/85">{g.text}</p>
            <p className="mt-3 rounded-xl bg-accent/50 px-4 py-3 text-sm leading-relaxed"><b>Schneller:</b> {g.besser}</p>
          </li>
        ))}
      </ol>

      <div className="my-10 rounded-2xl border border-primary/40 bg-accent/40 p-6">
        <h2 className="text-xl font-semibold tracking-tight">Alle fünf auf einmal lösen</h2>
        <p className="mt-2 leading-relaxed text-foreground/85">
          GründerX führt dich vom Gewerbe bis zum ersten Listing: Fragebogen-Begleiter, Gewerbeanmeldung, Steuerkalender,
          LUCID und WEEE, dazu Felix. Neukunden testen 7 Tage für 1 €, danach {formatEurCents(PLANS.gruenderx.grossCents)}/Monat,
          jederzeit kündbar.
        </p>
        <Button asChild className="mt-4 h-11 rounded-xl bg-gradient-primary px-6 font-semibold">
          <Link to="/start" data-track="listicle-gruendung-cta">GründerX ansehen <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" /></Link>
        </Button>
      </div>

      <Quellen eintraege={[
        { text: "Amazon-Verkäuferforum: Angebote inaktiv wegen fehlender LUCID-Nummer", url: "https://sellercentral.amazon.de/seller-forums/discussions/t/a1b68b69dcbed4a2f3b5d6d05087d70a" },
        QUELLEN.elsterForum, QUELLEN.ustg19, QUELLEN.ao138,
      ]} />
    </article>
  </FunnelShell>
);

export default ListicleGruendung;
