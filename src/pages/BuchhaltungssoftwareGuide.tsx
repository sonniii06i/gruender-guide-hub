import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { ToolSection, Callout, KitTable } from "@/components/cockpit/kit";
import { partnerUrl, PARTNER_REL, PARTNER_HINWEIS } from "@/config/partnerLinks";
import {
  BookOpen,
  Check,
  X,
  Banknote,
  Send,
  ShoppingCart,
  CalendarClock,
  Info,
  Camera,
  Building2,
  Receipt,
} from "lucide-react";

/**
 * Kompakt-Guide + Entscheidungshilfe: Buchhaltungssoftware für Gründer.
 * Vergleicht Lexware Office (ehemals lexoffice) vs sevDesk vs ELSTER-direkt,
 * mit Workflow "wie buchst du und wie gibst du ab".
 * Funktionen gegen die offiziellen Anbieterseiten verifiziert (2026-05-30).
 * Preise sind anbieter-/aktionsabhängig und als Richtwert markiert.
 */

// ── Vergleichsdaten ──────────────────────────────────────────────────────────

type Cell = boolean | string;

interface Row {
  feature: string;
  elster: Cell;
  lexware: Cell;
  sevdesk: Cell;
  hint?: string;
}

const ROWS: Row[] = [
  {
    feature: "Buchhaltungs-Tarif (Richtwert, netto zzgl. MwSt.)",
    elster: "kostenlos",
    lexware: "Paket L: 21,90 EUR/Mon (Aktion 10,95 für 3 Monate)",
    sevdesk: "Buchhaltung: 19,90–25,90 EUR/Mon (Aktion ~9,95)",
    hint: "EÜR + USt-VA gibt es erst ab diesem Tarif. Reine Rechnungs-Tarife sind günstiger (Lexware M 12,90, sevDesk Rechnung 8,90–11,90, Aktion 4,45), enthalten aber KEINE Buchhaltung/EÜR/USt-VA. Preise schwanken mit Aktionen.",
  },
  { feature: "USt-Voranmeldung per ELSTER", elster: "manuell ausfüllen", lexware: "auf Knopfdruck", sevdesk: "auf Knopfdruck" },
  { feature: "Zusammenfassende Meldung (ZM) ans BZSt", elster: "manuell ausfüllen", lexware: true, sevdesk: true, hint: "Pflicht bei EU-B2B (innergemeinschaftliche Lieferungen/sonstige Leistungen mit USt-IdNr). Beide Tools erstellen + übermitteln sie elektronisch - die ZM geht ans Bundeszentralamt für Steuern (BZSt), nicht ans Finanzamt." },
  { feature: "Dauerfristverlängerung (USt 1 H)", elster: "manuell ausfüllen", lexware: true, sevdesk: true, hint: "Verlängert die USt-VA-Frist um 1 Monat. In beiden Tools mit-beantragbar; sonst direkt in ELSTER. Details im USt-VA-Walkthrough." },
  { feature: "EÜR (Jahres-Gewinnermittlung)", elster: "manuell ausfüllen", lexware: true, sevdesk: true },
  { feature: "Belege scannen + OCR", elster: false, lexware: true, sevdesk: true, hint: "Foto/Scan und die Software liest Betrag, Datum, USt automatisch aus." },
  { feature: "Banking-Anbindung + Abgleich", elster: false, lexware: true, sevdesk: true },
  { feature: "Rechnungen schreiben (GoBD-konform)", elster: false, lexware: true, sevdesk: true },
  { feature: "Warenwirtschaft / Lager", elster: false, lexware: false, sevdesk: "Add-on", hint: "Für E-Commerce mit vielen SKUs relevant. Lexware Office hat keine eigene Warenwirtschaft." },
  { feature: "DATEV-Export für Steuerberater", elster: false, lexware: true, sevdesk: true, hint: "Lexware ist durch die Haufe-Nähe besonders eng mit Steuerkanzleien verzahnt." },
  { feature: "Kostenlose Testphase", elster: "—", lexware: "30 Tage", sevdesk: "14 Tage" },
];

// ── Entscheidungspfade ───────────────────────────────────────────────────────

interface Pfad {
  when: string;
  pick: string;
  why: string;
  icon: ReactNode;
  partner?: string; // Anbieter-Slug mit Partnerlink (src/config/partnerLinks.ts)
}

const PFADE: Pfad[] = [
  {
    icon: <Building2 className="h-5 w-5 text-accent-blue" />,
    when: "Kleinunternehmer, wenige Belege, kaum Ausgaben",
    pick: "ELSTER-direkt (kostenlos)",
    why: "Bei Kleinunternehmer-Regelung (Paragraf 19 UStG) ohne USt und nur einer Handvoll Rechnungen lohnt keine Software. USt-VA entfällt, EÜR füllst du 1x/Jahr selbst aus.",
  },
  {
    icon: <Receipt className="h-5 w-5 text-accent-blue" />,
    when: "Dienstleister / Solo-Selbstständig, regelmäßige Belege",
    pick: "Lexware Office (Paket L)",
    partner: "lexoffice",
    why: "Einfachste Bedienung, deutscher Marktführer, enge Steuerberater-/DATEV-Verzahnung. EÜR + USt-VA per ELSTER gibt es ab Paket L. Ideal wenn du wenig Zeit für Buchhaltung hast und es einfach laufen soll.",
  },
  {
    icon: <ShoppingCart className="h-5 w-5 text-accent-blue" />,
    when: "E-Commerce / D2C mit vielen Belegen und Artikeln",
    pick: "sevDesk (Buchhaltung / Pro)",
    partner: "sevdesk",
    why: "Stärker bei Massen-Belegen, Warenwirtschaft (Add-on) und Shop-Schnittstellen (Shopify, WooCommerce, Billbee). Gutes Preis-Leistungs-Verhältnis beim Einstieg.",
  },
];

// ── UI-Helfer ────────────────────────────────────────────────────────────────

const CellView = ({ v }: { v: Cell }) => {
  if (v === true) return <Check className="mx-auto h-4 w-4 text-success" aria-label="ja" />;
  if (v === false) return <X className="mx-auto h-4 w-4 text-muted-foreground/50" aria-label="nein" />;
  return <span className="text-xs leading-snug text-foreground/80">{v}</span>;
};

interface WorkflowProps {
  title: string;
  steps: string[];
  icon: ReactNode;
}

const Workflow = ({ title, steps, icon }: WorkflowProps) => (
  <section className="rounded-2xl border border-border bg-card p-5 shadow-card md:p-6">
    <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
      {icon}
      {title}
    </h3>
    <ol className="mt-4 space-y-3">
      {steps.map((s, i) => (
        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-blue tabular">
            {i + 1}
          </span>
          <span>{s}</span>
        </li>
      ))}
    </ol>
  </section>
);

const LEXWARE_STEPS = [
  "Beleg per App fotografieren oder hochladen. Die OCR liest Betrag, Datum und USt automatisch aus.",
  "Beleg einer Kategorie zuordnen (z. B. Wareneinkauf, Bürobedarf). Die Software schlägt sie vor.",
  "Bankkonto verbinden: Zahlungen werden automatisch den Belegen/Rechnungen zugeordnet.",
  "USt-Voranmeldung: unter Menü Buchhaltung → Steuerliche Meldungen. Software berechnet die Zahllast und übermittelt sie mit einem Klick per ELSTER ans Finanzamt.",
  "Zusammenfassende Meldung (ZM): ebenfalls unter Buchhaltung → Steuerliche Meldungen - bei EU-B2B-Umsätzen automatisch befüllt und ans BZSt gesendet.",
  "Jahresende: EÜR auf Knopfdruck erstellen und per ELSTER übermitteln. Für den StB: DATEV-Export.",
];

const SEVDESK_STEPS = [
  "Beleg hochladen/scannen. OCR erkennt die Daten, Massen-Upload für viele Belege möglich.",
  "Automatische Buchung über Regeln (wiederkehrende Belege werden selbst zugeordnet).",
  "Banking + Shop-Schnittstellen (Shopify/Amazon/Billbee) synchronisieren Umsätze und Zahlungen.",
  "USt-Voranmeldung: im Bereich Steuern. Direkt aus sevDesk per ELSTER abgeben, Fristen werden angezeigt.",
  "Zusammenfassende Meldung (ZM): ob und wo sevDesk sie direkt übermittelt, belegt die sevDesk-Hilfe derzeit nicht – im Zweifel über ELSTER (BZSt) abgeben.",
  "EÜR-Export + DATEV-Export für das Jahresende bzw. den Steuerberater.",
];

// ── Page ─────────────────────────────────────────────────────────────────────

const BuchhaltungssoftwareGuide = () => {
  return (
    <CockpitShell
      eyebrow="Steuern & Buchhaltung"
      title="Buchhaltungssoftware-Guide"
      subtitle="Lexware Office, sevDesk oder ELSTER-direkt: was passt zu dir, wie buchst du und wie gibst du ab. Kompakt-Vergleich mit Entscheidungshilfe und Abgabe-Workflow."
    >
      <div className="space-y-10">
        <Callout tone="info" icon={Info} title="Warum überhaupt eine Software?">
          <p>
            Du musst dem Finanzamt zwei Dinge liefern: regelmäßig die{" "}
            <strong className="text-foreground">Umsatzsteuer-Voranmeldung</strong> (monatlich oder quartalsweise)
            und am Jahresende die <strong className="text-foreground">EÜR</strong> (Gewinnermittlung).
            Beides geht kostenlos direkt über ELSTER, aber per Hand. Eine Software wie Lexware Office
            oder sevDesk nimmt dir das ab: Belege scannen, automatisch verbuchen, Bank abgleichen und
            die Meldungen auf Knopfdruck per ELSTER-Schnittstelle übermitteln.
          </p>
        </Callout>
        <Callout tone="warning" title="Wichtig: Bilanz ist hier nicht abgedeckt" className="-mt-7">
          Beide Tools erledigen laufende Buchhaltung und EÜR. Sobald du <strong className="text-foreground">bilanzieren</strong> musst
          (GmbH oder Überschreiten der Grenzen von § 141 AO), brauchst du eine StB-Lösung oder ein Bilanz-Add-on.
        </Callout>

        {/* Entscheidung */}
        <section aria-labelledby="bh-welches">
          <h2 id="bh-welches" className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight">
            <CalendarClock className="h-5 w-5 text-accent-blue" aria-hidden="true" /> Welches passt zu dir?
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {PFADE.map((p) => (
              <div key={p.pick} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">{p.icon}</span>
                <p className="mt-4 text-sm text-muted-foreground">{p.when}</p>
                <p className="mt-1 text-base font-semibold text-foreground">{p.pick}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.why}</p>
                {p.partner && partnerUrl(p.partner, "bh-guide") && (
                  <a
                    href={partnerUrl(p.partner, "bh-guide")!}
                    target="_blank"
                    rel={PARTNER_REL}
                    title={PARTNER_HINWEIS}
                    className="mt-3 inline-flex text-sm font-medium text-accent-blue underline underline-offset-2"
                  >
                    {p.pick.split(" (")[0]} ansehen*
                  </a>
                )}
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">* Enthält Partnerlinks. {PARTNER_HINWEIS}</p>
        </section>

        {/* Vergleichstabelle */}
        <section aria-labelledby="bh-vergleich">
          <h2 id="bh-vergleich" className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight">
            <Banknote className="h-5 w-5 text-accent-blue" aria-hidden="true" /> Direkter Vergleich
          </h2>
          <KitTable caption="Vergleich ELSTER-direkt, Lexware Office, sevDesk" className="[&_table]:min-w-[620px]">
            <thead>
              <tr>
                <th scope="col">Funktion</th>
                <th scope="col" className="!text-center">ELSTER-direkt</th>
                <th scope="col" className="!text-center">Lexware Office</th>
                <th scope="col" className="!text-center">sevDesk</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.feature} className="align-top">
                  <td className="max-w-[18rem]">
                    <span className="font-medium text-foreground">{r.feature}</span>
                    {r.hint && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{r.hint}</p>}
                  </td>
                  <td className="text-center"><CellView v={r.elster} /></td>
                  <td className="text-center"><CellView v={r.lexware} /></td>
                  <td className="text-center"><CellView v={r.sevdesk} /></td>
                </tr>
              ))}
            </tbody>
          </KitTable>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Preise sind Richtwerte (stand- und aktionsabhängig) und sollten tagesaktuell beim Anbieter
            geprüft werden (Links unten). Buchhaltung und EÜR sind jeweils erst ab dem mittleren Paket
            enthalten, nicht im reinen Rechnungs-Tarif.
          </p>
        </section>

        {/* Workflows */}
        <section aria-labelledby="bh-workflow">
          <h2 id="bh-workflow" className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight">
            <Send className="h-5 w-5 text-accent-blue" aria-hidden="true" /> Wie buchst du und wie gibst du ab?
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Workflow title="Lexware Office" steps={LEXWARE_STEPS} icon={<Camera className="h-5 w-5 text-accent-blue" aria-hidden="true" />} />
            <Workflow title="sevDesk" steps={SEVDESK_STEPS} icon={<Camera className="h-5 w-5 text-accent-blue" aria-hidden="true" />} />
          </div>
        </section>

        {/* Wo gebe ich was ab? */}
        <ToolSection title="Wo gebe ich USt-VA, ZM und Dauerfrist ab?" icon={Send}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/50 p-4">
              <div className="mb-1 font-semibold text-foreground">Lexware Office</div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Menü <strong className="text-foreground">Buchhaltung → Steuerliche Meldungen</strong>. Dort findest du die
                <strong className="text-foreground"> USt-Voranmeldung</strong> (berechnet und per ELSTER ans Finanzamt), die
                <strong className="text-foreground"> Zusammenfassende Meldung (ZM)</strong> (bei EU-B2B, automatisch befüllt, ans BZSt) und
                den <strong className="text-foreground">Antrag auf Dauerfristverlängerung</strong>.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/50 p-4">
              <div className="mb-1 font-semibold text-foreground">sevDesk</div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Bereich <strong className="text-foreground">Steuern</strong>. Dort liegt die
                <strong className="text-foreground"> USt-Voranmeldung</strong> (direkt per ELSTER). Für die{" "}
                <strong className="text-foreground">Zusammenfassende Meldung (ZM)</strong> und den{" "}
                <strong className="text-foreground">Dauerfristverlängerungs-Antrag</strong> nennt die sevDesk-Hilfe derzeit keinen eigenen Weg – im Zweifel direkt in ELSTER.
              </p>
            </div>
          </div>
          <Callout tone="neutral" icon={Info} className="mt-4" title="Wichtig zur ZM">
            Sie ist Pflicht, sobald du innergemeinschaftliche B2B-Umsätze hast (EU-Lieferungen oder -Leistungen an Kunden mit
            USt-IdNr), und geht ans <strong className="text-foreground">Bundeszentralamt für Steuern (BZSt)</strong>, nicht ans
            Finanzamt. Exakte Button-Beschriftungen können je nach Version abweichen; die Hilfe-Artikel der Anbieter (Links unten)
            zeigen den genauen Klickpfad.
          </Callout>
        </ToolSection>

        {/* Querverweis */}
        <Callout tone="accent" icon={BookOpen} title="Weiter zu den Formularen">
          Die Details zu den Formularen, inklusive{" "}
          <strong className="text-foreground">wie du die Dauerfristverlängerung beantragst</strong>, findest du im{" "}
          <Link to="/cockpit/ust-voranmeldung" className="font-medium text-accent-blue underline underline-offset-2">
            USt-Voranmeldung-Walkthrough
          </Link>{" "}
          (egal ob per Software oder ELSTER-direkt) und im{" "}
          <Link to="/cockpit/stb-cost-benefit" className="font-medium text-accent-blue underline underline-offset-2">
            Steuerberater-Cost-Benefit-Check
          </Link>
          .
        </Callout>
      </div>

      <Stand2026Footer
        sources={[
          { label: "Lexware Office (Funktionen & Preise)", url: "https://www.lexware.de/preise/" },
          { label: "Lexware Office: USt-Voranmeldung senden", url: "https://help.lexware.de/de-form/articles/548028-wie-mache-ich-meine-umsatzsteuer-voranmeldung-ust-va" },
          { label: "Lexware Office: Zusammenfassende Meldung (ZM)", url: "https://help.lexware.de/de-form/articles/548021-wie-gebe-ich-meine-zusammenfassende-meldung-ab" },
          { label: "sevDesk: Umsatzsteuervoranmeldung (UStVA)", url: "https://hilfe.sevdesk.de/de/articles/9310598-umsatzsteuervoranmeldung-ustva" },
          { label: "sevDesk Tarife & Funktionen", url: "https://sevdesk.de/preise/" },
          { label: "ELSTER (kostenloses Finanzamt-Portal)", url: "https://www.elster.de" },
        ]}
        note="Funktionen gegen die offiziellen Anbieterseiten verifiziert (2026-10-27). Preise sind Richtwerte und aktionsabhängig, beim Anbieter prüfen. EÜR + USt-VA per ELSTER ab Lexware Paket L bzw. sevDesk Buchhaltung. Keine Steuerberatung."
      />
    </CockpitShell>
  );
};

export default BuchhaltungssoftwareGuide;
