import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
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
 * Kompakt-Guide + Entscheidungshilfe: Buchhaltungssoftware fuer Gruender.
 * Vergleicht Lexware Office (ehemals lexoffice) vs sevDesk vs ELSTER-direkt,
 * mit Workflow "wie buchst du und wie gibst du ab".
 * Funktionen gegen die offiziellen Anbieterseiten verifiziert (2026-05-30).
 * Preise sind anbieter-/aktionsabhaengig und als Richtwert markiert.
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
    feature: "Buchhaltungs-Tarif (Richtwert, jaehrl. Zahlung)",
    elster: "kostenlos",
    lexware: "Paket L: 19,90 EUR/Mon (Aktion ~9,95)",
    sevdesk: "Buchhaltung: ~9,95 EUR/Mon",
    hint: "EUER + USt-VA gibt es erst ab diesem Tarif. Reine Rechnungs-Tarife sind guenstiger (Lexware M ~11,90, sevDesk Rechnung ~4,45), enthalten aber KEINE Buchhaltung/EUER/USt-VA. Preise schwanken mit Aktionen.",
  },
  { feature: "USt-Voranmeldung per ELSTER", elster: "manuell ausfuellen", lexware: "auf Knopfdruck", sevdesk: "auf Knopfdruck" },
  { feature: "Zusammenfassende Meldung (ZM) ans BZSt", elster: "manuell ausfuellen", lexware: true, sevdesk: true, hint: "Pflicht bei EU-B2B (innergemeinschaftliche Lieferungen/sonstige Leistungen mit USt-IdNr). Beide Tools erstellen + uebermitteln sie elektronisch - die ZM geht ans Bundeszentralamt fuer Steuern (BZSt), nicht ans Finanzamt." },
  { feature: "Dauerfristverlaengerung (USt 1 H)", elster: "manuell ausfuellen", lexware: true, sevdesk: true, hint: "Verlaengert die USt-VA-Frist um 1 Monat. In beiden Tools mit-beantragbar; sonst direkt in ELSTER. Details im USt-VA-Walkthrough." },
  { feature: "EUER (Jahres-Gewinnermittlung)", elster: "manuell ausfuellen", lexware: true, sevdesk: true },
  { feature: "Belege scannen + OCR", elster: false, lexware: true, sevdesk: true, hint: "Foto/Scan und die Software liest Betrag, Datum, USt automatisch aus." },
  { feature: "Banking-Anbindung + Abgleich", elster: false, lexware: true, sevdesk: true },
  { feature: "Rechnungen schreiben (GoBD-konform)", elster: false, lexware: true, sevdesk: true },
  { feature: "Warenwirtschaft / Lager", elster: false, lexware: false, sevdesk: "Add-on", hint: "Fuer E-Commerce mit vielen SKUs relevant. Lexware Office hat keine eigene Warenwirtschaft." },
  { feature: "DATEV-Export fuer Steuerberater", elster: false, lexware: true, sevdesk: true, hint: "Lexware ist durch die Haufe-Naehe besonders eng mit Steuerkanzleien verzahnt." },
  { feature: "Kostenlose Testphase", elster: "—", lexware: "30 Tage", sevdesk: "14 Tage" },
];

// ── Entscheidungspfade ───────────────────────────────────────────────────────

interface Pfad {
  when: string;
  pick: string;
  why: string;
  icon: ReactNode;
}

const PFADE: Pfad[] = [
  {
    icon: <Building2 className="h-5 w-5 text-accent-blue" />,
    when: "Kleinunternehmer, wenige Belege, kaum Ausgaben",
    pick: "ELSTER-direkt (kostenlos)",
    why: "Bei Kleinunternehmer-Regelung (Paragraf 19 UStG) ohne USt und nur einer Handvoll Rechnungen lohnt keine Software. USt-VA entfaellt, EUER fuellst du 1x/Jahr selbst aus.",
  },
  {
    icon: <Receipt className="h-5 w-5 text-accent-blue" />,
    when: "Dienstleister / Solo-Selbstaendig, regelmaessige Belege",
    pick: "Lexware Office (Paket L)",
    why: "Einfachste Bedienung, deutscher Marktfuehrer, enge Steuerberater-/DATEV-Verzahnung. EUER + USt-VA per ELSTER gibt es ab Paket L. Ideal wenn du wenig Zeit fuer Buchhaltung hast und es einfach laufen soll.",
  },
  {
    icon: <ShoppingCart className="h-5 w-5 text-accent-blue" />,
    when: "E-Commerce / D2C mit vielen Belegen und Artikeln",
    pick: "sevDesk (Buchhaltung / Pro)",
    why: "Staerker bei Massen-Belegen, Warenwirtschaft (Add-on) und Shop-Schnittstellen (Shopify, WooCommerce, Billbee). Gutes Preis-Leistungs-Verhaeltnis beim Einstieg.",
  },
];

// ── UI-Helfer ────────────────────────────────────────────────────────────────

const CellView = ({ v }: { v: Cell }) => {
  if (v === true) return <Check className="mx-auto h-4 w-4 text-emerald-600" aria-label="ja" />;
  if (v === false) return <X className="mx-auto h-4 w-4 text-muted-foreground/50" aria-label="nein" />;
  return <span className="text-xs text-muted-foreground">{v}</span>;
};

interface WorkflowProps {
  title: string;
  steps: string[];
  icon: ReactNode;
}

const Workflow = ({ title, steps, icon }: WorkflowProps) => (
  <section className="rounded-2xl border border-border bg-card p-5">
    <h3 className="flex items-center gap-2 text-base font-bold text-foreground">
      {icon}
      {title}
    </h3>
    <ol className="mt-3 space-y-2">
      {steps.map((s, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-blue/10 text-xs font-semibold text-accent-blue">
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
  "Beleg einer Kategorie zuordnen (z. B. Wareneinkauf, Buerobedarf). Die Software schlaegt sie vor.",
  "Bankkonto verbinden: Zahlungen werden automatisch den Belegen/Rechnungen zugeordnet.",
  "USt-Voranmeldung: unter Menue Steuern & Auswertungen. Software berechnet die Zahllast und uebermittelt sie mit einem Klick per ELSTER ans Finanzamt.",
  "Zusammenfassende Meldung (ZM): ebenfalls unter Steuern & Auswertungen - bei EU-B2B-Umsaetzen automatisch befuellt und ans BZSt gesendet.",
  "Jahresende: EUER auf Knopfdruck erstellen und per ELSTER uebermitteln. Fuer den StB: DATEV-Export.",
];

const SEVDESK_STEPS = [
  "Beleg hochladen/scannen. OCR erkennt die Daten, Massen-Upload fuer viele Belege moeglich.",
  "Automatische Buchung ueber Regeln (wiederkehrende Belege werden selbst zugeordnet).",
  "Banking + Shop-Schnittstellen (Shopify/Amazon/Billbee) synchronisieren Umsaetze und Zahlungen.",
  "USt-Voranmeldung: unter Umsatzsteuer & Buchhaltung. Direkt aus sevDesk per ELSTER abgeben, Fristen werden angezeigt.",
  "Zusammenfassende Meldung (ZM): ebenfalls im Bereich Umsatzsteuer & Buchhaltung erstellen und elektronisch ans BZSt uebermitteln.",
  "EUER-Export + DATEV-Export fuer das Jahresende bzw. den Steuerberater.",
];

// ── Page ─────────────────────────────────────────────────────────────────────

const BuchhaltungssoftwareGuide = () => {
  return (
    <CockpitShell
      eyebrow="Steuern & Buchhaltung"
      title="Buchhaltungssoftware-Guide"
      subtitle="Lexware Office vs sevDesk vs ELSTER-direkt: was passt zu dir, wie buchst du und wie gibst du ab. Kompakt-Vergleich mit Entscheidungshilfe und Abgabe-Workflow."
    >
      {/* Intro */}
      <div className="rounded-2xl border-2 border-accent-blue/30 bg-gradient-to-br from-accent-blue/10 via-card to-card p-5 mb-4">
        <div className="flex items-start gap-3">
          <Info className="h-6 w-6 text-accent-blue shrink-0 mt-0.5" />
          <div className="text-sm">
            <h3 className="font-bold mb-1">Warum ueberhaupt eine Software?</h3>
            <p className="text-muted-foreground leading-relaxed">
              Du musst dem Finanzamt zwei Dinge liefern: regelmaessig die{" "}
              <strong className="text-foreground">Umsatzsteuer-Voranmeldung</strong> (monatlich/quartalsweise)
              und am Jahresende die <strong className="text-foreground">EUER</strong> (Gewinnermittlung).
              Beides geht kostenlos direkt ueber ELSTER, aber per Hand. Eine Software wie Lexware Office
              oder sevDesk nimmt dir das ab: Belege scannen, automatisch verbuchen, Bank abgleichen und
              die Meldungen auf Knopfdruck per ELSTER-Schnittstelle uebermitteln.
            </p>
            <p className="mt-2 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-muted-foreground">
              <strong className="text-foreground">Wichtig:</strong> Beide Tools erledigen laufende
              Buchhaltung und EUER. Sobald du <strong className="text-foreground">bilanzieren</strong> musst
              (GmbH oder Ueberschreiten der Grenzen von Paragraf 141 AO), brauchst du eine StB-Loesung
              oder ein Bilanz-Add-on. Das ist hier nicht abgedeckt.
            </p>
          </div>
        </div>
      </div>

      {/* Entscheidung */}
      <h3 className="font-bold text-sm mb-2 mt-6 px-1 flex items-center gap-2">
        <CalendarClock className="h-4 w-4 text-accent-blue" /> Welches passt zu dir?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {PFADE.map((p) => (
          <div key={p.pick} className="flex flex-col rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2">{p.icon}</div>
            <p className="mt-2 text-xs font-medium text-muted-foreground">{p.when}</p>
            <p className="mt-1 text-sm font-bold text-foreground">{p.pick}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.why}</p>
          </div>
        ))}
      </div>

      {/* Vergleichstabelle */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Banknote className="h-4 w-4 text-accent-blue" /> Direkter Vergleich
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-3 font-medium text-muted-foreground">Funktion</th>
                <th className="px-3 py-2 text-center font-semibold text-foreground">ELSTER-direkt</th>
                <th className="px-3 py-2 text-center font-semibold text-foreground">Lexware Office</th>
                <th className="px-3 py-2 text-center font-semibold text-foreground">sevDesk</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.feature} className="border-b border-border/40 align-top">
                  <td className="py-2.5 pr-3">
                    <span className="text-foreground">{r.feature}</span>
                    {r.hint && <p className="mt-0.5 text-xs text-muted-foreground">{r.hint}</p>}
                  </td>
                  <td className="px-3 py-2.5 text-center"><CellView v={r.elster} /></td>
                  <td className="px-3 py-2.5 text-center"><CellView v={r.lexware} /></td>
                  <td className="px-3 py-2.5 text-center"><CellView v={r.sevdesk} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Preise sind Richtwerte (stand- und aktionsabhaengig) und sollten tagesaktuell beim Anbieter
          geprueft werden (Links unten). Buchhaltung/EUER ist jeweils erst ab dem mittleren Paket
          enthalten, nicht im reinen Rechnungs-Tarif.
        </p>
      </div>

      {/* Workflows */}
      <h3 className="font-bold text-sm mb-2 px-1 flex items-center gap-2">
        <Send className="h-4 w-4 text-accent-blue" /> Wie buchst du und wie gibst du ab?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Workflow title="Lexware Office" steps={LEXWARE_STEPS} icon={<Camera className="h-5 w-5 text-accent-blue" />} />
        <Workflow title="sevDesk" steps={SEVDESK_STEPS} icon={<Camera className="h-5 w-5 text-accent-blue" />} />
      </div>

      {/* Wo gebe ich was ab? */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6 text-sm">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <Send className="h-4 w-4 text-accent-blue" /> Wo gebe ich USt-VA, ZM &amp; Dauerfrist ab?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
            <div className="font-semibold text-foreground mb-1">Lexware Office</div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Menue <strong className="text-foreground">Steuern &amp; Auswertungen</strong>. Dort findest du
              <strong> USt-Voranmeldung</strong> (berechnet + per ELSTER ans Finanzamt),
              <strong> Zusammenfassende Meldung (ZM)</strong> (bei EU-B2B, automatisch befuellt, ans BZSt) und
              den <strong> Antrag auf Dauerfristverlaengerung</strong>.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
            <div className="font-semibold text-foreground mb-1">sevDesk</div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Bereich <strong className="text-foreground">Umsatzsteuer &amp; Buchhaltung</strong>. Dort liegen
              <strong> USt-Voranmeldung</strong> (direkt per ELSTER), <strong> Zusammenfassende Meldung (ZM)</strong>
              (ans BZSt) und der <strong> Dauerfristverlaengerungs-Antrag</strong>.
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          <strong className="text-foreground">Wichtig zur ZM:</strong> Sie ist Pflicht, sobald du
          innergemeinschaftliche B2B-Umsaetze hast (EU-Lieferungen/-Leistungen an Kunden mit USt-IdNr) - und geht
          ans <strong>Bundeszentralamt fuer Steuern (BZSt)</strong>, nicht ans Finanzamt. Exakte Button-Beschriftungen
          koennen je nach Version abweichen; die Hilfe-Artikel der Anbieter (Links unten) zeigen den genauen Klickpfad.
        </p>
      </div>

      {/* Querverweis */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4 mb-6 text-sm">
        <p className="text-muted-foreground">
          Schon klar, was abzugeben ist? Die Details zu den Formularen - inkl.{" "}
          <strong className="text-foreground">wie du die Dauerfristverlaengerung beantragst</strong> - findest du im{" "}
          <Link to="/cockpit/ust-voranmeldung" className="font-medium text-accent-blue underline">
            USt-Voranmeldung-Walkthrough
          </Link>{" "}
          (egal ob per Software oder ELSTER-direkt) und im{" "}
          <Link to="/cockpit/stb-cost-benefit" className="font-medium text-accent-blue underline">
            Steuerberater-Cost-Benefit-Check
          </Link>.
        </p>
      </div>

      <Stand2026Footer
        sources={[
          { label: "Lexware Office (Funktionen & Preise)", url: "https://www.lexware.de/office/preise/" },
          { label: "Lexware Office: USt-Voranmeldung senden", url: "https://help.lexware.de/de-form/articles/548032-umsatzsteuervoranmeldung-anzeigen-prufen-und-an-das-finanzamt-senden" },
          { label: "Lexware Office: Zusammenfassende Meldung (ZM)", url: "https://help.lexware.de/de-form/articles/553620-zusammenfassende-meldung-zm" },
          { label: "sevDesk: Zusammenfassende Meldung erstellen", url: "https://hilfe.sevdesk.de/de/articles/9387997-zusammenfassende-meldung-erstellen" },
          { label: "sevDesk Tarife & Funktionen", url: "https://sevdesk.de/preise/" },
          { label: "ELSTER (kostenloses Finanzamt-Portal)", url: "https://www.elster.de" },
        ]}
        note="Funktionen gegen die offiziellen Anbieterseiten verifiziert (2026-05-30). Preise sind Richtwerte und aktionsabhaengig, beim Anbieter pruefen. EUER + USt-VA per ELSTER ab Lexware Paket L bzw. sevDesk Buchhaltung. Keine Steuerberatung."
      />
    </CockpitShell>
  );
};

export default BuchhaltungssoftwareGuide;
