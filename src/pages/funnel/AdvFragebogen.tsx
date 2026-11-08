import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { ScreenshotFrame } from "@/components/marketing/Marketing";
import { FunnelShell, Quellen, QUELLEN } from "@/components/funnel/FunnelShell";
import { SCREENS } from "@/data/screenshots";
import { PLANS, formatEurCents } from "@/config/pricing";

/**
 * /anzeige/fragebogen-steuerliche-erfassung – Advertorial (08.11.2026, Szalinski Level 2: Problem → Mechanismus →
 * Produkt → Angebot). Als „Anzeige“ gekennzeichnet (§ 5a Abs. 4 UWG), noindex (bezahlter Traffic). Angle aus
 * MASTER_STRATEGIE §5 „Fragebogen zur steuerlichen Erfassung: Feld für Feld erklärt“, Persona feierabend-haendler.
 * Fakten: KfW (70 % Nebenerwerb 2025), § 138 Abs. 4 AO (ein Monat), § 19 UStG (25.000/100.000 €, fünf Jahre),
 * § 11 GewStG (24.500 €), ELSTER-Forum 18.03.2024; Formularstruktur aus pages/FseWizard.tsx (fseeun-202401, 24 Teilseiten,
 * Teilseite 18 mit 3 der 4 verbindlichen Entscheidungen). Alle CTAs → /start.
 */

const Cta = ({ text }: { text: string }) => (
  <div className="my-8 rounded-2xl border border-primary/40 bg-accent/40 p-5">
    <p className="font-medium text-foreground">{text}</p>
    <Button asChild className="mt-3 h-11 rounded-xl bg-gradient-primary px-6 font-semibold">
      <Link to="/start" data-track="adv-fragebogen-cta">Zum Fragebogen-Begleiter <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" /></Link>
    </Button>
  </div>
);

const P = ({ children }: { children: React.ReactNode }) => <p className="mb-5 text-[1.06rem] leading-[1.75] text-foreground/85">{children}</p>;
const H2 = ({ children }: { children: React.ReactNode }) => <h2 className="mb-3 mt-10 text-balance text-2xl font-semibold tracking-tight">{children}</h2>;

const AdvFragebogen = () => (
  <FunnelShell anzeige>
    <Seo
      title="Fragebogen zur steuerlichen Erfassung: wo es hängt"
      description="Nebengewerbe angemeldet, und dann? Wo der Fragebogen zur steuerlichen Erfassung Nebengründer ausbremst – und wie du ihn Teilseite für Teilseite abschickst."
      path="/anzeige/fragebogen-steuerliche-erfassung"
      type="article"
      noindex
    />
    <article className="container max-w-[720px] px-4 py-10 md:py-14">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent-blue">Gründung im Nebenerwerb</p>
      <h1 className="mt-3 text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] md:text-[2.6rem]">
        Gewerbe angemeldet – und dann wartet ein Formular mit 24 Teilseiten
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        Mehr als zwei von drei Gründungen laufen nebenbei. Der Papierkram ist trotzdem derselbe. Wo der Fragebogen zur
        steuerlichen Erfassung Nebengründer ausbremst – und wie du ihn Teilseite für Teilseite abschickst.
      </p>
      <p className="mt-5 border-y border-border py-3 text-sm text-muted-foreground">GründerX-Redaktion · 08.11.2026 · 5 Min. Lesezeit</p>

      <P>
        690.000 Menschen haben sich 2025 in Deutschland selbstständig gemacht, nach 585.000 im Jahr davor. Der größte Teil davon
        nebenbei: 70 % aller Gründungen liefen laut KfW im Nebenerwerb, ein Rekordwert. Abends verkaufen, am Wochenende
        Pakete packen, tagsüber der normale Job.
      </P>
      <P>
        Die Gewerbeanmeldung ist für viele noch der leichte Teil. Danach kommt Post vom Finanzamt – oder eben nicht, weil du
        selbst aktiv werden musst: Innerhalb eines Monats nach Beginn der Tätigkeit muss der <b>Fragebogen zur steuerlichen
        Erfassung</b> bei ELSTER sein. So steht es in § 138 Abs. 4 der Abgabenordnung.
      </P>

      <H2>Warum gerade dieses Formular so viele ausbremst</H2>
      <P>
        Der Fragebogen für Einzelunternehmen hat in der aktuellen ELSTER-Fassung 24 Teilseiten. Die meisten Felder sind
        harmlos: Name, Anschrift, Bankverbindung. Aber auf wenigen Seiten triffst du Entscheidungen, die dich lange begleiten
        – oft ohne es zu merken.
      </P>
      <P>
        Allein auf Teilseite 18 liegen drei der vier verbindlichen Entscheidungen: ob du die Kleinunternehmerregelung
        nutzt, ob du nach vereinnahmten oder vereinbarten Entgelten versteuerst und ob du gleich eine
        Umsatzsteuer-Identifikationsnummer beantragst.
      </P>
      <blockquote className="my-8 border-l-4 border-primary pl-5 text-xl font-medium leading-snug">
        „Der Elster-Support hat mich an dieses Forum verwiesen. Man kann und darf mir inhaltlich nicht helfen.“
        <span className="mt-2 block text-sm font-normal text-muted-foreground">Ein Nutzer im ELSTER-Anwenderforum, März 2024</span>
      </blockquote>

      <H2>Drei Stellen, an denen es teuer werden kann</H2>
      <P>
        <b>Das Kleinunternehmer-Kreuz.</b> Kleinunternehmer ist, wer im Vorjahr höchstens 25.000 € und im laufenden Jahr
        höchstens 100.000 € Umsatz hat (§ 19 UStG). Wer darauf verzichtet, ist mindestens fünf Kalenderjahre daran gebunden.
        Ein Kreuz, fünf Jahre.
      </P>
      <P>
        <b>Der Freibetrag, der keiner für alles ist.</b> 24.500 € sind der Freibetrag bei der Gewerbesteuer (§ 11 GewStG).
        Einkommensteuer fällt trotzdem an, auf dein gesamtes Einkommen. Wer das verwechselt, kann bei der ersten
        Steuererklärung eine Nachzahlung erleben.
      </P>
      <P>
        <b>Die Plattform meldet mit.</b> Seit DAC7 melden Plattformen Verkäufer an das Bundeszentralamt für Steuern. Nicht
        gemeldet wird nur, wer unter 30 Verkäufen und unter 2.000 € bleibt (§ 4 PStTG).
      </P>

      <Cta text="Du willst den Fragebogen nicht allein ausfüllen? GründerX erklärt jede Teilseite in der Reihenfolge, in der ELSTER sie abfragt." />

      <H2>So geht es schneller: das Formular neben dir aufgeschlagen</H2>
      <P>
        GründerX hat dafür einen Begleiter gebaut: alle 24 Teilseiten in der Reihenfolge, in der ELSTER sie abfragt, mit den
        echten Zeilennummern. Bei jeder Entscheidung steht, was sie bedeutet und was danach daraus folgt. Du öffnest ELSTER in
        einem Tab und GründerX im zweiten, liest nach und trägst ein.
      </P>
      <ScreenshotFrame shot={SCREENS.fse} caption="Echter Screenshot: der Fragebogen-Begleiter in GründerX" />
      <P>
        Dazu kommen der Wizard für die Gewerbeanmeldung, ein Steuerkalender mit deinen Terminen der nächsten zwölf Monate und
        Felix, der KI-Co-Pilot, der Fragen mit Quellen beantwortet. Was GründerX nicht ist: Steuerberatung im Einzelfall. Für
        komplizierte Fälle bleibt der Steuerberater die richtige Adresse.
      </P>

      <H2>Was es kostet</H2>
      <P>
        Neukunden testen GründerX 7 Tage für 1 €. Danach kostet der Zugang {formatEurCents(PLANS.gruenderx.grossCents)} im
        Monat und ist jederzeit zum Ende der laufenden Periode kündbar.
      </P>
      <Cta text={`7 Tage für 1 €, danach ${formatEurCents(PLANS.gruenderx.grossCents)}/Monat · jederzeit kündbar · nur für Neukunden`} />

      <Quellen eintraege={[QUELLEN.kfw, QUELLEN.ao138, QUELLEN.ustg19, QUELLEN.gewstg11, QUELLEN.pstg, QUELLEN.elsterForum]} />
    </article>
  </FunnelShell>
);

export default AdvFragebogen;
