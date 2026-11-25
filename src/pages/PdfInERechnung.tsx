import { useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { AlertTriangle, ArrowRight, CheckCircle2, Download, FileUp, Loader2, Plus, ShieldCheck, Trash2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Seo } from "@/components/Seo";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { HubNav } from "@/components/landing/HubNav";
import { PageHeader } from "@/components/landing/PageHeader";
import { PublicSection, FaqList } from "@/components/public/PublicBlocks";
import { EmailGateDialog } from "@/components/freetools/EmailGateDialog";
import { TrialUpsell } from "@/components/freetools/ToolTrial";
import { breadcrumbSchema, faqSchema } from "@/lib/freetools/schema";
import { isToolUnlockedLocally } from "@/lib/freetools/leads";
import { useBrowserWert } from "@/lib/prerender";
import { useAuth } from "@/hooks/useAuth";
import { useAccess } from "@/hooks/useAccess";
import { PRO_MONTH_GROSS_CENTS, formatEurCents } from "@/config/pricing";
import { leseERechnung } from "@/lib/eRechnungLesen";
import { baueXRechnung, xrFehlend, xrSummen, xrWarnungen, type XrDaten, type XrModus } from "@/lib/xrechnung";
import {
  ausERechnung,
  einheitAus,
  lesePdfRechnung,
  profilAus,
  summenAbgleich,
  zeilenAusTeilen,
  type PdfSummen,
} from "@/lib/pdfRechnungLesen";

const SITE = "https://gruenderx.de";
const SLUG = "pdf-in-e-rechnung-umwandeln";
const PFAD = `/${SLUG}`;
const STAND = "20.11.2026";
const STAND_ISO = "2026-11-20";

const geld = (n: number | undefined) => (n === undefined || Number.isNaN(n) ? "–" : n.toLocaleString("de-DE", { style: "currency", currency: "EUR" }));

const EINHEITEN = [
  ["C62", "Stück"], ["HUR", "Stunde"], ["DAY", "Tag"], ["MON", "Monat"], ["LS", "pauschal"], ["MIN", "Minute"], ["WEE", "Woche"], ["ANN", "Jahr"],
  ["KMT", "km"], ["MTR", "m"], ["MTK", "m²"], ["KGM", "kg"], ["LTR", "Liter"], ["H87", "Teil"],
] as const;

const MODI: { wert: XrModus; text: string }[] = [
  { wert: "standard", text: "Mit Umsatzsteuer (19 % bis 7 %, 0 %)" },
  { wert: "kleinunternehmer", text: "Kleinunternehmer (§ 19 UStG)" },
  { wert: "reverse-charge", text: "Reverse Charge (§ 13b UStG)" },
  { wert: "innergemeinschaftlich", text: "Innergemeinschaftliche Lieferung" },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "Kann ich ein PDF einfach in eine E-Rechnung umwandeln?",
    a: "Ja, wenn die Daten stimmen. Eine E-Rechnung ist ein strukturierter Datensatz nach EN 16931, zum Beispiel eine XRechnung. Das Tool liest Rechnungsnummer, Datum, Parteien, Positionen und Summen aus der Textebene deines PDFs, du prüfst jedes Feld, und erst wenn die Summen auf den Cent zum PDF passen, entsteht die XRechnung. Das Original-PDF kann als Anlage mit hinein.",
  },
  {
    q: "Ist ein PDF mit eingebetteter XML (ZUGFeRD) schon eine E-Rechnung?",
    a: "Meistens ja. ZUGFeRD ab Version 2.0.1 gilt als E-Rechnung, außer in den Profilen MINIMUM und BASIC-WL (Abschnitt 14.1 Abs. 14 UStAE). Lädst du so ein PDF hoch, zeigt das Tool das Profil an. Bei MINIMUM oder BASIC-WL übernimmt es die Daten aus der XML und ergänzt die Positionen aus dem PDF.",
  },
  {
    q: "Werden meine Rechnungen hochgeladen?",
    a: "Nein. Das PDF wird in deinem Browser gelesen und die XRechnung dort erzeugt. Gespeichert wird nur die E-Mail-Adresse, wenn du die kostenlose Umwandlung freischaltest.",
  },
  {
    q: "Was kostet die Umwandlung?",
    a: `Eine Umwandlung ist kostenlos, du gibst dafür nur deine E-Mail-Adresse an. Unbegrenzt nutzt du das Tool mit dem GründerX-Abo für ${formatEurCents(PRO_MONTH_GROSS_CENTS)} im Monat inkl. 19 % USt.`,
  },
  {
    q: "Was mache ich mit der XRechnung danach?",
    a: "Schick die XML-Datei per E-Mail an deinen Kunden, so wie bisher das PDF. Bei einer E-Rechnung ist die XML-Datei das Original: Bewahre sie acht Jahre auf (§ 14b UStG). Lesbar machst du sie jederzeit mit unserem kostenlosen E-Rechnung-Leser.",
  },
  {
    q: "Ich bin Kleinunternehmer. Muss ich umwandeln?",
    a: "Nein. Rechnungen von Kleinunternehmern nach § 19 UStG dürfen immer als PDF oder auf Papier gehen (§ 34a Satz 4 UStDV), ebenso Rechnungen bis 250 € brutto (§ 33 Satz 4 UStDV). Eine E-Rechnung ist trotzdem erlaubt, manche Kunden wünschen sie.",
  },
  {
    q: "Brauche ich eine Leitweg-ID?",
    a: "Nur bei Rechnungen an öffentliche Auftraggeber. Die Behörde nennt dir die Leitweg-ID; sie gehört in das Feld „Käuferreferenz“. Bei Firmenkunden kannst du dort die Bestellnummer eintragen oder das Feld leer lassen, dann steht dort die Rechnungsnummer.",
  },
];

const QUELLEN: { text: string; url: string }[] = [
  { text: "§ 14 UStG (Abs. 1: E-Rechnung und sonstige Rechnung; Abs. 2 Satz 2 Nr. 1: Pflicht zwischen inländischen Unternehmern)", url: "https://www.gesetze-im-internet.de/ustg_1980/__14.html" },
  { text: "§ 27 Abs. 38 UStG (Übergang bis 31.12.2026 bzw. 31.12.2027, Grenze 800.000 €)", url: "https://www.gesetze-im-internet.de/ustg_1980/__27.html" },
  { text: "§ 33 UStDV (Kleinbetragsrechnungen bis 250 €, Satz 4: immer sonstige Rechnung)", url: "https://www.gesetze-im-internet.de/ustdv_1980/__33.html" },
  { text: "§ 34a UStDV (Kleinunternehmer, Satz 4: immer sonstige Rechnung)", url: "https://www.gesetze-im-internet.de/ustdv_1980/__34a.html" },
  { text: "BMF-Schreiben vom 15.10.2025 (UStAE 14.1 Abs. 14: ZUGFeRD ohne MINIMUM/BASIC-WL; UStAE 14.4 Abs. 3: strukturierter Teil geht vor; UStAE 14c.1 Abs. 4a: abweichender Bildteil; Rn. 35: Pflichtangaben im strukturierten Teil)", url: "https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Steuerarten/Umsatzsteuer/Umsatzsteuer-Anwendungserlass/2025-10-15-einfuehrung-obligatorische-e-rechnung.pdf?__blob=publicationFile&v=5" },
  { text: "BMF-Schreiben vom 15.10.2026 (Rn. 17: Steuer kaufmännisch runden; Rn. 19: Bruttopreisrechnungen bis 31.12.2027; Rn. 20: Berichtigung als E-Rechnung)", url: "https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Steuerarten/Umsatzsteuer/Umsatzsteuer-Anwendungserlass/2026-10-15-obligatorische-elektronische-rechnung.pdf?__blob=publicationFile" },
  { text: "Frankreich: Service-Public, Facturation électronique (geprüft 07.08.2026)", url: "https://entreprendre.service-public.gouv.fr/vosdroits/F39785" },
  { text: "Italien: D.Lgs. 127/2015, Art. 1 (Normattiva, gültig am 20.11.2026)", url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2015-08-05;127!vig=" },
  { text: "Spanien: Real Decreto 238/2026, BOE Nr. 79 vom 31.03.2026 (Art. 7.1 Formate, DF 4ª Fristen)", url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-7295" },
  { text: "Spanien: AEAT, Calendario de implantación (aktualisiert 13.10.2026)", url: "https://sede.agenciatributaria.gob.es/Sede/iva/factura-electronica/calendario-implantacion.html" },
  { text: "Spanien: Real Decreto 1007/2023, DF 4ª (VERI*FACTU, konsolidiert 03.12.2025)", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2023-24840" },
  { text: "EU: Richtlinie (EU) 2025/516, ABl. L vom 25.03.2025 (Art. 6 Abs. 5: ab 01.07.2030)", url: "https://eur-lex.europa.eu/eli/dir/2025/516/oj" },
  { text: "KoSIT: XRechnung-Standard und Validator-Konfiguration XRechnung 3.0.2 (Prüfung der erzeugten Dateien)", url: "https://xeinkauf.de/xrechnung/" },
];

/** Beispiel-PDF wie eine typische Word-Rechnung (DIN 5008), damit man das Tool ohne eigene Datei ausprobieren kann. */
async function beispielPdf(): Promise<File> {
  const { default: jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  doc.setFontSize(7);
  doc.text("Muster Webdesign · Hauptstraße 1 · 10115 Berlin", 20, 45);
  doc.setFontSize(10);
  ["Kunde GmbH", "Marktplatz 5", "80331 München"].forEach((t, i) => doc.text(t, 20, 52 + i * 5));
  ["Muster Webdesign", "Hauptstraße 1", "10115 Berlin", "Tel. +49 30 1234567", "rechnung@muster.example", "Ansprechpartner: Erika Muster"].forEach((t, i) => doc.text(t, 125, 20 + i * 5));
  doc.text("Rechnungsdatum: 08.10.2026", 125, 60);
  doc.text("Leistungsdatum: 01.10.2026", 125, 65);
  doc.setFontSize(14);
  doc.text("Rechnung Nr. RE-2026-042", 20, 90);
  doc.setFontSize(10);
  const zeile = (y: number, z: string[]) => {
    doc.text(z[0], 20, y);
    doc.text(z[1], 30, y);
    doc.text(z[2], 110, y);
    doc.text(z[3], 160, y, { align: "right" });
    doc.text(z[4], 190, y, { align: "right" });
  };
  zeile(105, ["Pos", "Beschreibung", "Menge", "Einzelpreis", "Gesamt"]);
  zeile(112, ["1", "Webdesign Startseite", "1 Stk", "1.200,00 €", "1.200,00 €"]);
  zeile(118, ["2", "Pflege-Stunden", "3,5 Std", "85,00 €", "297,50 €"]);
  const summe = (y: number, l: string, b: string) => {
    doc.text(l, 125, y);
    doc.text(b, 190, y, { align: "right" });
  };
  summe(130, "Nettobetrag", "1.497,50 €");
  summe(136, "zzgl. 19 % USt", "284,53 €");
  summe(142, "Gesamtbetrag", "1.782,03 €");
  doc.text("Zahlbar innerhalb von 14 Tagen ohne Abzug.", 20, 160);
  doc.setFontSize(8);
  doc.text("Muster Webdesign Erika Muster", 20, 280);
  doc.text("IBAN DE02 1203 0000 0000 2020 51", 80, 280);
  doc.text("USt-IdNr. DE123456789", 150, 280);
  doc.text("BIC BYLADEM1001", 80, 285);
  doc.text("Steuernummer 27/123/45678", 150, 285);
  return new File([doc.output("arraybuffer")], "beispiel-rechnung.pdf", { type: "application/pdf" });
}

const alsBase64 = (buf: ArrayBuffer) => {
  const bytes = new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
};

const herunterladen = (inhalt: string, name: string) => {
  const url = URL.createObjectURL(new Blob([inhalt], { type: "application/xml;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

type Vorhanden = { profil: string; xml: string; name: string };

const Feld = ({ id, label, erkannt, children, hinweis }: { id: string; label: string; erkannt?: boolean; children: ReactNode; hinweis?: string }) => (
  <div className="space-y-1.5">
    <Label htmlFor={id} className="flex items-center gap-2 text-sm">
      {label}
      {erkannt && <span className="rounded bg-brand-green-soft px-1.5 py-0.5 text-[11px] font-medium text-brand-green">aus dem PDF</span>}
    </Label>
    {children}
    {hinweis && <p className="text-xs text-muted-foreground">{hinweis}</p>}
  </div>
);

export default function PdfInERechnung() {
  const { user } = useAuth();
  const { loading: accessLoading, hasActiveSub, isAdmin } = useAccess();
  const subscriber = Boolean(user) && (hasActiveSub || isAdmin);
  const [spent, setSpent] = useBrowserWert(() => isToolUnlockedLocally(SLUG), false);
  const [unlocked, setUnlocked] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);

  const [laden, setLaden] = useState(false);
  const [fehler, setFehler] = useState("");
  const [datei, setDatei] = useState<{ name: string; base64: string } | null>(null);
  const [d, setD] = useState<XrDaten | null>(null);
  const [pdfSummen, setPdfSummen] = useState<Pick<PdfSummen, "netto" | "ust" | "brutto">>({});
  const [erkannt, setErkannt] = useState<Set<string>>(new Set());
  const [hinweise, setHinweise] = useState<string[]>([]);
  const [vorhanden, setVorhanden] = useState<Vorhanden | null>(null);
  const [mitAnhang, setMitAnhang] = useState(true);
  const [fertig, setFertig] = useState(false);

  const lesen = async (f: File | undefined) => {
    if (!f) return;
    setFehler("");
    if (!/\.pdf$/i.test(f.name) && f.type !== "application/pdf") {
      setFehler("Bitte wähle eine PDF-Datei. Eine XML-Datei (XRechnung) öffnest du mit dem E-Rechnung-Leser.");
      return;
    }
    if (f.size > 10_000_000) {
      setFehler("Die Datei ist größer als 10 MB. Rechnungen sind meist deutlich kleiner; bitte prüfe die Datei.");
      return;
    }
    setLaden(true);
    try {
      const buf = await f.arrayBuffer();
      const { pdfInhalt } = await import("@/lib/pdfText");
      const inhalt = await pdfInhalt(buf.slice(0));
      const v = lesePdfRechnung(zeilenAusTeilen(inhalt.teile, inhalt.seitenBreite));
      let daten = v.daten;
      let summen: Pick<PdfSummen, "netto" | "ust" | "brutto"> = { netto: v.summen.netto, ust: v.summen.ust, brutto: v.summen.brutto };
      const neueHinweise = [...v.hinweise];
      const erk = new Set(v.erkannt);
      setVorhanden(null);
      const xmlAnhang = inhalt.anhaenge.find((a) => /\.xml$/i.test(a.name));
      if (xmlAnhang) {
        const xml = new TextDecoder().decode(xmlAnhang.inhalt);
        try {
          const r = leseERechnung(xml);
          const profil = profilAus(r.spezifikation);
          if (profil.eRechnung) setVorhanden({ profil: profil.name, xml, name: xmlAnhang.name });
          else {
            // MINIMUM/BASIC-WL: Kopfdaten und Summen aus der XML, Positionen aus dem PDF-Text
            const x = ausERechnung(r);
            const nimm = (a: string, b: string) => a || b;
            daten = {
              ...x,
              verkaeufer: Object.fromEntries(Object.entries(x.verkaeufer).map(([k, w]) => [k, nimm(String(w ?? ""), String(v.daten.verkaeufer[k as keyof XrDaten["verkaeufer"]] ?? ""))])) as XrDaten["verkaeufer"],
              kunde: Object.fromEntries(Object.entries(x.kunde).map(([k, w]) => [k, nimm(String(w ?? ""), String(v.daten.kunde[k as keyof XrDaten["kunde"]] ?? ""))])) as XrDaten["kunde"],
              rechnungsnummer: nimm(x.rechnungsnummer, v.daten.rechnungsnummer),
              rechnungsdatum: nimm(x.rechnungsdatum, v.daten.rechnungsdatum),
              leistungsdatum: nimm(x.leistungsdatum, v.daten.leistungsdatum),
              leistungszeitraum: v.daten.leistungszeitraum,
              zahlungsziel: Number.isNaN(x.zahlungsziel) ? v.daten.zahlungsziel : x.zahlungsziel,
              positionen: x.positionen.length ? x.positionen : v.daten.positionen,
              zahlungsbedingungen: v.daten.zahlungsbedingungen,
            };
            summen = { netto: r.summen.netto, ust: r.summen.steuer, brutto: r.summen.brutto };
            neueHinweise.unshift(`Im PDF steckt eine XML im Profil ${profil.name}. Das ist keine vollständige E-Rechnung (Abschnitt 14.1 Abs. 14 UStAE). Kopfdaten und Summen stammen aus der XML, die Positionen aus dem PDF-Text.`);
          }
        } catch {
          neueHinweise.unshift("Im PDF steckt eine XML-Datei, die sich nicht als E-Rechnung lesen ließ. Die Daten stammen aus dem PDF-Text.");
        }
      }
      if (!inhalt.teile.length) neueHinweise.push("Das PDF hat keine Textebene (zum Beispiel ein Scan oder Foto). Trage die Daten bitte von Hand ein.");
      if (inhalt.seiten > 20) neueHinweise.push(`Das PDF hat ${inhalt.seiten} Seiten; gelesen wurden die ersten 20.`);
      if (unlocked && !subscriber) {
        // Die kostenlose Umwandlung gilt für ein PDF; das nächste braucht das Abo.
        setUnlocked(false);
        setSpent(true);
      }
      setD(daten);
      setPdfSummen(summen);
      setErkannt(erk);
      setHinweise(neueHinweise);
      setDatei({ name: f.name, base64: alsBase64(buf) });
      setFertig(false);
    } catch {
      setFehler("Das PDF ließ sich nicht lesen. Ist es verschlüsselt oder beschädigt? Öffne es zur Probe im Browser.");
    } finally {
      setLaden(false);
    }
  };

  const setzeV = (k: keyof XrDaten["verkaeufer"], w: string) => setD((x) => (x ? { ...x, verkaeufer: { ...x.verkaeufer, [k]: w } } : x));
  const setzeK = (k: keyof XrDaten["kunde"], w: string) => setD((x) => (x ? { ...x, kunde: { ...x.kunde, [k]: w } } : x));
  const setzePos = (i: number, patch: Partial<XrDaten["positionen"][number]>) =>
    setD((x) => (x ? { ...x, positionen: x.positionen.map((p, j) => (j === i ? { ...p, ...patch } : p)) } : x));

  const pruefung = useMemo(() => {
    if (!d) return null;
    const fehlt = [...xrFehlend(d)];
    if (!d.rechnungsdatum) fehlt.push("Rechnungsdatum");
    if (!d.leistungsdatum && !d.leistungszeitraum) fehlt.push("Leistungsdatum oder Leistungszeitraum");
    if (Number.isNaN(d.zahlungsziel) || d.zahlungsziel < 0) fehlt.push("Zahlungsziel in Tagen (0 = sofort)");
    if (d.positionen.some((p) => !Number.isFinite(p.menge) || !Number.isFinite(p.einzelpreisNetto) || !Number.isFinite(p.ustSatz))) fehlt.push("Menge, Preis und Steuersatz jeder Position");
    const summen = xrSummen(d);
    if (summen.brutto < 0) fehlt.push("Positiver Rechnungsbetrag (Gutschriften kann das Tool nicht erzeugen)");
    const abgleich = summenAbgleich(d, pdfSummen);
    return { fehlt, warnungen: xrWarnungen(d), abgleich, summen };
  }, [d, pdfSummen]);

  const bereit = Boolean(pruefung && !pruefung.fehlt.length && pruefung.abgleich.ok);

  const erzeugen = () => {
    if (!d || !pruefung || !bereit) return;
    const xml = baueXRechnung({
      ...d,
      anhang: mitAnhang && datei ? { dateiname: datei.name.replace(/[^\w.\-äöüÄÖÜß ]+/g, "_"), base64: datei.base64, beschreibung: "Original-Rechnung (PDF)" } : undefined,
    });
    herunterladen(xml, `${(d.rechnungsnummer || "rechnung").replace(/[^a-z0-9-]+/gi, "-")}-xrechnung.xml`);
    setFertig(true);
  };
  const klickErzeugen = () => {
    if (!bereit) return;
    if (user && accessLoading) {
      toast("Dein Zugang wird noch geprüft – bitte gleich noch einmal klicken.");
      return;
    }
    if (subscriber || unlocked) return erzeugen();
    if (spent) {
      toast("Deine kostenlose Umwandlung ist aufgebraucht.", { description: "Mit dem GründerX-Abo wandelst du unbegrenzt um." });
      document.getElementById("umwandeln")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setGateOpen(true);
  };

  const zeitraum = d?.leistungszeitraum ?? { von: "", bis: "" };
  const setzeZeitraum = (patch: Partial<{ von: string; bis: string }>) =>
    setD((x) => {
      if (!x) return x;
      const z = { ...zeitraum, ...patch };
      return { ...x, leistungszeitraum: z.von || z.bis ? z : undefined };
    });

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="PDF in E-Rechnung umwandeln: XRechnung aus PDF erstellen"
        description="PDF-Rechnung hochladen, ausgelesene Daten prüfen und eine XRechnung (XML) herunterladen – mit Summenabgleich auf den Cent und dem Original-PDF als Anlage. Läuft im Browser, ohne Upload."
        path={PFAD}
        jsonLd={[
          breadcrumbSchema([{ name: "Start", url: `${SITE}/` }, { name: "Gratis-Tools", url: `${SITE}/gratis-tools` }, { name: "PDF in E-Rechnung umwandeln", url: `${SITE}${PFAD}` }]),
          faqSchema(faqs),
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "PDF in E-Rechnung umwandeln",
            url: `${SITE}${PFAD}`,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            inLanguage: "de-DE",
            dateModified: STAND_ISO,
            description: "Wandelt eine PDF-Rechnung im Browser in eine XRechnung 3.0 (CII, EN 16931) um, mit Summenabgleich gegen das PDF und dem Original-PDF als Anlage.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR", description: "1 Umwandlung kostenlos gegen E-Mail-Adresse; unbegrenzt im GründerX-Abo" },
            publisher: { "@type": "Organization", name: "GründerX", url: SITE },
          },
        ]}
      />
      <Navbar />
      <main>
        <PageHeader
          width="max-w-4xl"
          kicker={
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/25 bg-brand-green-soft px-3 py-1 text-[13px] font-medium text-brand-green">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> 1 Umwandlung kostenlos, die Datei bleibt auf deinem Gerät
            </span>
          }
          title="PDF in E-Rechnung umwandeln"
          lead={
            <p>
              Ein PDF ist keine E-Rechnung, auch nicht per E-Mail. Lade deine PDF-Rechnung hoch, prüfe die ausgelesenen Daten und
              lade eine XRechnung herunter. Erzeugt wird sie erst, wenn die Summen auf den Cent zum PDF passen.
            </p>
          }
        />

        <div className="container max-w-4xl space-y-12 px-4 py-12 md:py-16">
          <section aria-labelledby="kurzantwort" className="space-y-3">
            <h2 id="kurzantwort" className="text-2xl font-semibold tracking-tight">Kurz gesagt</h2>
            <p className="text-sm text-muted-foreground">
              Von <Link to="/impressum" rel="author" className="font-medium text-foreground hover:underline">Sonni Buttke</Link>, Gründer von GründerX · Stand: <time dateTime={STAND_ISO}>{STAND}</time>
            </p>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              E-Rechnung heißt im Umsatzsteuergesetz: ein strukturierter Datensatz nach der europäischen Norm EN 16931, den Software
              lesen kann (§ 14 Abs. 1 UStG). Das sind vor allem die XRechnung (eine XML-Datei) und ZUGFeRD ab Version 2.0.1, außer
              den Profilen MINIMUM und BASIC-WL. Ein PDF aus Word, Excel oder einem Rechnungsprogramm ist eine „sonstige Rechnung“.
              Zwischen Unternehmen in Deutschland reicht sie nur noch in der Übergangszeit: für Leistungen bis Ende 2026, für
              Leistungen 2027 nur bei höchstens 800.000 € Vorjahresumsatz (§ 27 Abs. 38 UStG). Dieses Tool macht aus deinem PDF eine
              XRechnung 3.0 und legt das Original-PDF als Anlage hinein.
            </p>
          </section>

          {/* Werkzeug */}
          <section id="umwandeln" aria-label="PDF umwandeln" className="space-y-6 scroll-mt-24">
            {!subscriber && spent && !unlocked && <TrialUpsell tool={{ name: "PDF in E-Rechnung umwandeln" }} variant="spent" noun="Nutzung" />}

            <div className="space-y-3">
              <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  lesen(e.dataTransfer.files?.[0]);
                }}
                className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-foreground/25 bg-card px-6 py-12 text-center shadow-card transition-colors hover:border-foreground/30 hover:bg-accent/40 focus-within:border-accent-blue focus-within:ring-[3px] focus-within:ring-ring/25"
              >
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground/70 transition-transform group-hover:-translate-y-0.5">
                  {laden ? <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" /> : <FileUp className="h-6 w-6" aria-hidden="true" />}
                </span>
                <span className="text-base font-semibold">{laden ? "PDF wird gelesen …" : "PDF-Rechnung hierher ziehen oder auswählen"}</span>
                <span className="mt-1 text-sm text-muted-foreground">PDF mit Text (aus Word, Excel oder einem Rechnungsprogramm), bis 10 MB</span>
                <input type="file" accept=".pdf,application/pdf" className="sr-only" onChange={(e) => lesen(e.target.files?.[0])} aria-label="PDF-Rechnung auswählen" />
              </label>
              <div className="text-center">
                <button type="button" onClick={async () => lesen(await beispielPdf())} className="text-sm font-medium text-accent-blue hover:underline">
                  Keine Rechnung zur Hand? Mit einer Beispiel-Rechnung ausprobieren
                </button>
              </div>
              {fehler && (
                <div role="alert" className="flex gap-2.5 rounded-xl border border-danger/25 bg-danger-soft p-4 text-sm">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
                  <span>
                    {fehler}{" "}
                    {/XML/.test(fehler) && <Link to="/e-rechnung-lesen" className="font-medium underline">Zum E-Rechnung-Leser</Link>}
                  </span>
                </div>
              )}
            </div>

            {vorhanden && (
              <div role="status" className="space-y-3 rounded-2xl border border-brand-green/30 bg-brand-green-soft p-5 text-sm">
                <p className="flex items-center gap-2 font-semibold text-brand-green"><CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Dieses PDF ist schon eine E-Rechnung ({vorhanden.profil}).</p>
                <p className="text-foreground/85">
                  Darin steckt die XML-Datei „{vorhanden.name}“. Du musst nichts umwandeln. Maßgeblich ist bei solchen Hybrid-Rechnungen der
                  strukturierte Teil (Abschnitt 14.4 Abs. 3 UStAE).
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => herunterladen(vorhanden.xml, vorhanden.name)}><Download className="h-4 w-4" /> XML herausziehen</Button>
                  <Button size="sm" variant="outline" asChild><Link to="/e-rechnung-lesen">Im E-Rechnung-Leser ansehen</Link></Button>
                </div>
              </div>
            )}

            {d && pruefung && !vorhanden && (
              <div className="space-y-6" aria-live="polite">
                {hinweise.map((h, i) => (
                  <div key={i} className="flex gap-2.5 rounded-xl border border-warning/30 bg-warning-soft p-4 text-sm">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
                    <span>{h}</span>
                  </div>
                ))}

                <fieldset className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-card">
                  <legend className="px-1 text-base font-semibold">1. Rechnung</legend>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Feld id="nr" label="Rechnungsnummer" erkannt={erkannt.has("rechnungsnummer")}>
                      <Input id="nr" value={d.rechnungsnummer} onChange={(e) => setD({ ...d, rechnungsnummer: e.target.value })} />
                    </Feld>
                    <Feld id="datum" label="Rechnungsdatum" erkannt={erkannt.has("rechnungsdatum")}>
                      <Input id="datum" type="date" value={d.rechnungsdatum} onChange={(e) => setD({ ...d, rechnungsdatum: e.target.value })} />
                    </Feld>
                    <Feld id="ldatum" label="Leistungsdatum" erkannt={erkannt.has("leistungsdatum")} hinweis="Oder unten einen Zeitraum angeben.">
                      <Input id="ldatum" type="date" value={d.leistungsdatum} onChange={(e) => setD({ ...d, leistungsdatum: e.target.value })} />
                    </Feld>
                    <div className="grid grid-cols-2 gap-2">
                      <Feld id="zvon" label="Zeitraum von" erkannt={erkannt.has("leistungszeitraum")}>
                        <Input id="zvon" type="date" value={zeitraum.von} onChange={(e) => setzeZeitraum({ von: e.target.value })} />
                      </Feld>
                      <Feld id="zbis" label="bis">
                        <Input id="zbis" type="date" value={zeitraum.bis} onChange={(e) => setzeZeitraum({ bis: e.target.value })} />
                      </Feld>
                    </div>
                    <Feld id="ziel" label="Zahlungsziel in Tagen" erkannt={erkannt.has("zahlungsziel")} hinweis="0 = sofort fällig">
                      <Input id="ziel" type="number" min={0} value={Number.isNaN(d.zahlungsziel) ? "" : d.zahlungsziel} onChange={(e) => setD({ ...d, zahlungsziel: e.target.value === "" ? NaN : Number(e.target.value) })} />
                    </Feld>
                    <Feld id="ref" label="Käuferreferenz / Leitweg-ID" erkannt={erkannt.has("kaeuferReferenz")} hinweis="Bei Behörden Pflicht (Leitweg-ID). Sonst z. B. Bestellnummer oder leer.">
                      <Input id="ref" value={d.kaeuferReferenz} onChange={(e) => setD({ ...d, kaeuferReferenz: e.target.value })} />
                    </Feld>
                    <Feld id="modus" label="Steuerfall" erkannt={erkannt.has("modus")}>
                      <select id="modus" value={d.modus} onChange={(e) => setD({ ...d, modus: e.target.value as XrModus })} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                        {MODI.map((m) => <option key={m.wert} value={m.wert}>{m.text}</option>)}
                      </select>
                    </Feld>
                    <Feld id="zb" label="Zahlungsbedingungen (optional)" erkannt={erkannt.has("zahlungsbedingungen")} hinweis="Leer: „Zahlbar ohne Abzug bis …“ aus dem Zahlungsziel.">
                      <Input id="zb" value={d.zahlungsbedingungen ?? ""} onChange={(e) => setD({ ...d, zahlungsbedingungen: e.target.value })} />
                    </Feld>
                  </div>
                </fieldset>

                <div className="grid gap-6 md:grid-cols-2">
                  <fieldset className="space-y-3 rounded-2xl border border-border bg-card p-5 shadow-card">
                    <legend className="px-1 text-base font-semibold">2. Von (du)</legend>
                    {([
                      ["name", "Name / Firma"], ["strasse", "Straße und Hausnummer"], ["plzOrt", "PLZ und Ort"], ["ustId", "USt-IdNr."], ["steuernummer", "Steuernummer"],
                      ["iban", "IBAN"], ["bic", "BIC (optional)"], ["email", "E-Mail"], ["telefon", "Telefon"], ["kontaktName", "Ansprechpartner"],
                    ] as const).map(([k, l]) => (
                      <Feld key={k} id={`v-${k}`} label={l} erkannt={erkannt.has(`verkaeufer.${k}`)}>
                        <Input id={`v-${k}`} value={d.verkaeufer[k] ?? ""} onChange={(e) => setzeV(k, e.target.value)} />
                      </Feld>
                    ))}
                  </fieldset>
                  <fieldset className="space-y-3 rounded-2xl border border-border bg-card p-5 shadow-card">
                    <legend className="px-1 text-base font-semibold">3. An (Kunde)</legend>
                    {([
                      ["name", "Name / Firma"], ["strasse", "Straße und Hausnummer"], ["plzOrt", "PLZ und Ort"], ["land", "Land"], ["ustId", "USt-IdNr. (optional)"], ["email", "E-Mail für Rechnungen"],
                    ] as const).map(([k, l]) => (
                      <Feld key={k} id={`k-${k}`} label={l} erkannt={erkannt.has(`kunde.${k}`)} hinweis={k === "email" ? "Steht selten im PDF. Pflichtfeld der XRechnung (elektronische Adresse des Käufers)." : undefined}>
                        <Input id={`k-${k}`} type={k === "email" ? "email" : "text"} value={d.kunde[k] ?? ""} onChange={(e) => setzeK(k, e.target.value)} />
                      </Feld>
                    ))}
                  </fieldset>
                </div>

                <fieldset className="space-y-3 rounded-2xl border border-border bg-card p-5 shadow-card">
                  <legend className="px-1 text-base font-semibold">4. Positionen {erkannt.has("positionen") && <span className="ml-1 rounded bg-brand-green-soft px-1.5 py-0.5 text-[11px] font-medium text-brand-green">aus dem PDF</span>}</legend>
                  <p className="text-xs text-muted-foreground">Preise netto je Einheit. Rabatte als eigene Zeile mit negativem Preis.</p>
                  {d.positionen.map((p, i) => (
                    <div key={i} className="grid grid-cols-2 gap-2 border-b border-border/60 pb-3 sm:grid-cols-[1fr_5rem_7rem_7rem_5rem_2.5rem] sm:items-end">
                      <div className="col-span-2 space-y-1 sm:col-span-1">
                        <Label htmlFor={`p${i}-b`} className="text-xs">Bezeichnung</Label>
                        <Input id={`p${i}-b`} value={p.beschreibung} onChange={(e) => setzePos(i, { beschreibung: e.target.value })} />
                        {(p as { pruefen?: string }).pruefen && <p className="text-xs font-medium text-warning">{(p as { pruefen?: string }).pruefen}</p>}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`p${i}-m`} className="text-xs">Menge</Label>
                        <Input id={`p${i}-m`} type="number" step="any" value={Number.isFinite(p.menge) ? p.menge : ""} onChange={(e) => setzePos(i, { menge: e.target.value === "" ? NaN : Number(e.target.value) })} />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`p${i}-e`} className="text-xs">Einheit</Label>
                        <select id={`p${i}-e`} value={p.einheit ?? "C62"} onChange={(e) => setzePos(i, { einheit: e.target.value })} className="h-10 w-full rounded-md border border-input bg-background px-2 text-sm">
                          {EINHEITEN.map(([c, t]) => <option key={c} value={c}>{t}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`p${i}-p`} className="text-xs">Einzelpreis netto</Label>
                        <Input id={`p${i}-p`} type="number" step="any" value={Number.isFinite(p.einzelpreisNetto) ? p.einzelpreisNetto : ""} onChange={(e) => setzePos(i, { einzelpreisNetto: e.target.value === "" ? NaN : Number(e.target.value) })} />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`p${i}-s`} className="text-xs">USt %</Label>
                        <Input id={`p${i}-s`} type="number" step="any" disabled={d.modus !== "standard"} value={d.modus !== "standard" ? 0 : Number.isFinite(p.ustSatz) ? p.ustSatz : ""} onChange={(e) => setzePos(i, { ustSatz: e.target.value === "" ? NaN : Number(e.target.value) })} />
                      </div>
                      <Button type="button" variant="ghost" size="icon" aria-label={`Position ${i + 1} löschen`} onClick={() => setD({ ...d, positionen: d.positionen.filter((_, j) => j !== i) })}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => setD({ ...d, positionen: [...d.positionen, { beschreibung: "", menge: 1, einzelpreisNetto: NaN, ustSatz: d.modus === "standard" ? 19 : 0, einheit: einheitAus("Stk")?.code }] })}>
                    <Plus className="h-4 w-4" /> Position hinzufügen
                  </Button>
                </fieldset>

                <fieldset className="space-y-3 rounded-2xl border border-border bg-card p-5 shadow-card">
                  <legend className="px-1 text-base font-semibold">5. Summenabgleich mit dem PDF</legend>
                  <p className="text-xs text-muted-foreground">
                    XML und PDF müssen dieselbe Rechnung zeigen, sonst kann das PDF als zweite Rechnung gelten (Abschnitt 14c.1 Abs. 4a UStAE).
                    Fehlt ein Betrag, trag ihn aus dem PDF ein; mindestens der Bruttobetrag muss stehen.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm tabular">
                      <thead><tr className="text-left text-muted-foreground"><th className="py-1.5 font-medium">Betrag</th><th className="py-1.5 font-medium">laut PDF</th><th className="py-1.5 text-right font-medium">in der XRechnung</th><th className="py-1.5" /></tr></thead>
                      <tbody>
                        {pruefung.abgleich.punkte.map((pt) => {
                          const key = pt.name === "Netto" ? "netto" : pt.name === "Umsatzsteuer" ? "ust" : "brutto";
                          return (
                            <tr key={pt.name} className="border-t border-border/60">
                              <td className="py-2">{pt.name}</td>
                              <td className="py-2">
                                <Input aria-label={`${pt.name} laut PDF`} type="number" step="0.01" className="h-9 w-36" value={pdfSummen[key] ?? ""} onChange={(e) => setPdfSummen({ ...pdfSummen, [key]: e.target.value === "" ? undefined : Number(e.target.value) })} />
                              </td>
                              <td className="py-2 text-right">{geld(pt.xml)}</td>
                              <td className="py-2 pl-3">
                                {pt.ok === null ? <span className="text-xs text-muted-foreground">–</span> : pt.ok ? <CheckCircle2 className="h-4 w-4 text-success" aria-label="stimmt" /> : <XCircle className="h-4 w-4 text-danger" aria-label="weicht ab" />}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </fieldset>

                <div className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-card">
                  <div className="flex items-start gap-2.5">
                    <Checkbox id="anhang" checked={mitAnhang} onCheckedChange={(v) => setMitAnhang(v === true)} className="mt-0.5" />
                    <Label htmlFor="anhang" className="text-sm font-normal leading-snug">
                      Original-PDF als Anlage in die XRechnung legen (empfohlen; maßgeblich bleiben die XML-Daten)
                    </Label>
                  </div>
                  {pruefung.fehlt.length > 0 && (
                    <div className="rounded-xl border border-danger/25 bg-danger-soft p-4 text-sm">
                      <p className="font-medium">Noch offen:</p>
                      <ul className="mt-1 list-disc space-y-0.5 pl-5">{pruefung.fehlt.map((f) => <li key={f}>{f}</li>)}</ul>
                    </div>
                  )}
                  {!pruefung.abgleich.ok && pruefung.fehlt.length === 0 && (
                    <p className="rounded-xl border border-danger/25 bg-danger-soft p-4 text-sm">
                      {pruefung.abgleich.geprueft
                        ? "Die Summen weichen vom PDF ab. Prüfe Mengen, Preise und Steuersätze der Positionen."
                        : "Trag den Bruttobetrag aus dem PDF ein, damit der Abgleich laufen kann."}
                    </p>
                  )}
                  {pruefung.warnungen.map((w) => <p key={w} className="text-xs text-warning">{w}</p>)}
                  {pruefung.summen.brutto > 0 && pruefung.summen.brutto <= 250 && d.modus !== "reverse-charge" && d.modus !== "innergemeinschaftlich" && (
                    <p className="text-xs text-muted-foreground">Hinweis: Rechnungen bis 250 € brutto dürfen immer als PDF gehen (§ 33 Satz 4 UStDV). Die E-Rechnung ist trotzdem erlaubt.</p>
                  )}
                  <Button size="lg" className="w-full sm:w-auto" disabled={!bereit} onClick={klickErzeugen}>
                    <Download className="h-4 w-4" /> XRechnung herunterladen
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    {subscriber ? "Unbegrenzt im Abo." : "1 Umwandlung kostenlos, nur E-Mail. "}
                    Keine Rechts- oder Steuerberatung – im Einzelfall Anwalt oder Steuerberater fragen.
                  </p>
                  {fertig && (
                    <div role="status" className="rounded-xl border border-brand-green/30 bg-brand-green-soft p-4 text-sm">
                      <p className="font-semibold text-brand-green">Fertig. So geht es weiter:</p>
                      <ol className="mt-1 list-decimal space-y-0.5 pl-5 text-foreground/85">
                        <li>Schick die XML-Datei per E-Mail an {d.kunde.email || "deinen Kunden"}.</li>
                        <li>Bewahre die XML-Datei acht Jahre auf; sie ist das Original (§ 14b UStG).</li>
                        <li>Zur Kontrolle: Öffne die Datei im <Link to="/e-rechnung-lesen" className="font-medium underline">E-Rechnung-Leser</Link>.</li>
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>

          <PublicSection title="So funktioniert die Umwandlung">
            <ol className="list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-muted-foreground">
              <li><strong className="text-foreground">PDF lesen.</strong> Das Tool liest die Textebene deines PDFs in deinem Browser. Steckt schon eine ZUGFeRD-XML darin, zeigt es das Profil an.</li>
              <li><strong className="text-foreground">Felder erkennen.</strong> Rechnungsnummer, Datum, Leistungsdatum oder Zeitraum, Absender aus der Absenderzeile, Kunde aus dem Anschriftfeld, IBAN mit Prüfziffer, USt-IdNr., Steuernummer, Positionen mit Menge und Einheit sowie die Summen.</li>
              <li><strong className="text-foreground">Prüfen.</strong> Grün markierte Felder stammen aus dem PDF. Was fehlt, steht unter „Noch offen“. Die Käufer-E-Mail fehlt fast immer, weil sie auf Papierrechnungen nicht steht.</li>
              <li><strong className="text-foreground">Abgleichen.</strong> Das Tool rechnet die XRechnung so, wie die Norm es verlangt: Zeilenbetrag = Menge × Nettopreis, Steuer je Steuersatz auf den Cent kaufmännisch gerundet (BMF 15.10.2026, Rn. 17). Netto, Steuer und Brutto müssen genau den Beträgen im PDF entsprechen.</li>
              <li><strong className="text-foreground">Herunterladen.</strong> Du bekommst eine XRechnung 3.0 in CII-Syntax. Unsere Testrechnungen prüfen wir mit dem offiziellen KoSIT-Validator.</li>
            </ol>
          </PublicSection>

          <PublicSection title="Beispiel: Rechnung über 1.782,03 €">
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Die Beispiel-Rechnung oben hat zwei Positionen: Webdesign Startseite, 1 Stück zu 1.200,00 €, und Pflege-Stunden, 3,5 Stunden
              zu 85,00 € = 297,50 €. Netto sind das 1.497,50 €. 19 % davon ergeben genau 284,525 €; kaufmännisch gerundet 284,53 €.
              Brutto 1.782,03 €. In der XRechnung steht die Stunde als Einheit „HUR“, das Stück als „C62“ (UN/ECE-Empfehlung 20), und die
              Steuer wird einmal für den Satz 19 % berechnet, nicht je Zeile. Rundet ein Programm die Steuer je Zeile, kann ein Cent
              Unterschied entstehen; dann blockiert der Abgleich, bis die Beträge stimmen.
            </p>
          </PublicSection>

          <PublicSection title="Wann reicht noch ein PDF?">
            <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border bg-secondary/40">
                  <tr><th className="p-3 font-semibold">Leistung ausgeführt</th><th className="p-3 font-semibold">PDF zwischen Unternehmen in Deutschland</th><th className="p-3 font-semibold">Grundlage</th></tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/60"><td className="p-3">2025 und 2026</td><td className="p-3">Ja, wenn die Rechnung bis 31.12.2026 kommt. PDF nur mit Zustimmung des Kunden, Papier immer.</td><td className="p-3">§ 27 Abs. 38 Nr. 1 UStG</td></tr>
                  <tr className="border-b border-border/60"><td className="p-3">2027</td><td className="p-3">Nur wenn dein Gesamtumsatz 2026 höchstens 800.000 € war (PDF mit Zustimmung). EDI-Verfahren mit Zustimmung bleiben bis Ende 2027 erlaubt.</td><td className="p-3">§ 27 Abs. 38 Nr. 2 und 3 UStG</td></tr>
                  <tr className="border-b border-border/60"><td className="p-3">ab 2028</td><td className="p-3">Nein, nur noch E-Rechnung.</td><td className="p-3">§ 14 Abs. 2 Satz 2 Nr. 1 UStG</td></tr>
                  <tr><td className="p-3">immer</td><td className="p-3">Rechnungen bis 250 € brutto (nicht bei §§ 3c, 6a, 13b UStG) und Rechnungen von Kleinunternehmern dürfen als PDF gehen.</td><td className="p-3">§ 33 Satz 4, § 34a Satz 4 UStDV</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Empfangen musst du E-Rechnungen schon seit 01.01.2025, auch als Kleinunternehmer. Rechnungen an Privatkunden sind nicht
              betroffen. Mehr Details im Ratgeber{" "}
              <Link to="/ratgeber/e-rechnung-pflicht-b2b-2026" className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">E-Rechnung-Pflicht 2026: Fristen, Formate, Ausnahmen</Link>.
            </p>
          </PublicSection>

          <PublicSection title="Typische Fehler beim Umwandeln">
            <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted-foreground">
              <li><strong className="text-foreground">Das PDF mit „ZUGFeRD“ im Namen für eine E-Rechnung halten.</strong> In den Profilen MINIMUM und BASIC-WL fehlen Pflichtangaben wie die Positionen; das ist keine E-Rechnung.</li>
              <li><strong className="text-foreground">XML und PDF zeigen verschiedene Beträge.</strong> Bei Hybrid-Rechnungen zählt der strukturierte Teil (Abschnitt 14.4 Abs. 3 UStAE). Weicht das PDF ab, kann es als weitere Rechnung mit eigener Steuerschuld gelten.</li>
              <li><strong className="text-foreground">Pflichtangaben nur in der Anlage.</strong> Alle Rechnungsangaben müssen im strukturierten Teil stehen. Die Anlage ergänzt nur, etwa mit Stundennachweisen (BMF 15.10.2025, Rn. 35). Deshalb liest das Tool jede Position einzeln aus, statt das PDF nur anzuhängen.</li>
              <li><strong className="text-foreground">Käufer-E-Mail oder Leitweg-ID fehlt.</strong> Die XRechnung verlangt eine elektronische Adresse des Kunden; Behörden verlangen die Leitweg-ID.</li>
              <li><strong className="text-foreground">Nur das PDF archivieren.</strong> Bei einer E-Rechnung ist die XML-Datei das Original und wird acht Jahre aufbewahrt (§ 14b UStG).</li>
              <li><strong className="text-foreground">Bruttopreise mit Rundungsdifferenz.</strong> Rechnet dein Programm von Bruttopreisen aus, kann die Steuer nach der Norm um einen Cent abweichen. Für solche Rechnungen erlaubt das BMF bis 31.12.2027 eine vereinfachte Form mit Summen je Steuersatz und eingebetteter Anlage (BMF 15.10.2026, Rn. 19). Dieses Tool erzeugt diese Form noch nicht.</li>
            </ul>
          </PublicSection>

          <PublicSection title="Kunden in Frankreich, Italien oder Spanien">
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Die XRechnung ist der deutsche Standard. Andere EU-Länder haben eigene Fristen und oft einen eigenen Übertragungsweg statt der
              E-Mail. Diese Pflichten gelten zuerst für Unternehmen in dem jeweiligen Land. Ob und wie sie dich als Lieferant aus Deutschland
              treffen, hängt vom Einzelfall ab; frag deinen Kunden vorher nach dem gewünschten Format.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border bg-secondary/40">
                  <tr><th className="p-3 font-semibold">Land</th><th className="p-3 font-semibold">Pflicht zwischen Unternehmen</th><th className="p-3 font-semibold">Weg und Format</th></tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/60">
                    <td className="p-3 font-medium text-foreground">Frankreich</td>
                    <td className="p-3">Empfangen: alle ab 01.09.2026. Ausstellen: große und mittlere Unternehmen ab 01.09.2026, kleine und Kleinstunternehmen ab 01.09.2027.</td>
                    <td className="p-3">Nur über eine zugelassene Plattform (plateforme agréée, früher PDP).</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="p-3 font-medium text-foreground">Italien</td>
                    <td className="p-3">Seit 01.01.2019 alle Inlandsrechnungen elektronisch, an Unternehmen und an Verbraucher (Pauschalisten seit 2022 bzw. 2024).</td>
                    <td className="p-3">Über das staatliche Sistema di Interscambio (SdI) im Format FatturaPA.</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="p-3 font-medium text-foreground">Spanien</td>
                    <td className="p-3">Ab 06.10.2027 bei mehr als 8 Mio. € Umsatz, ab 06.10.2028 für alle übrigen. Getrennt davon: Kassen- und Rechnungssoftware nach VERI*FACTU bis 01.01.2027 (Körperschaften) bzw. 01.07.2027.</td>
                    <td className="p-3">Datenmodell EN 16931 in CII, UBL, EDIFACT oder Facturae.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">EU, grenzüberschreitend</td>
                    <td className="p-3">Ab 01.07.2030 E-Rechnung für Umsätze zwischen Unternehmen in verschiedenen EU-Ländern, mit Meldepflicht.</td>
                    <td className="p-3">Nach der europäischen Norm EN 16931 (Richtlinie (EU) 2025/516).</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Dieses Tool erzeugt nur die deutsche XRechnung. FatturaPA, Facturae oder den Versand über eine französische Plattform übernimmt es nicht.
            </p>
          </PublicSection>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-lg font-semibold tracking-tight">Rechnungen gleich als E-Rechnung schreiben</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              Statt jedes PDF umzuwandeln: Der <Link to="/tools/rechnungs-generator" className="font-medium text-foreground underline decoration-border underline-offset-4">Rechnungs-Generator</Link> im
              GründerX-Cockpit erzeugt PDF und XRechnung aus denselben Daten. Dazu bekommst du deinen Fahrplan von Gewerbe bis Steuer und
              alle Tools unbegrenzt.
            </p>
            <Link to="/preise" data-quelle={`tool:${SLUG}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-blue hover:underline">
              GründerX ansehen <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>

          <PublicSection title="Häufige Fragen">
            <FaqList items={faqs} />
          </PublicSection>

          <section className="border-t border-border/70 pt-6" aria-labelledby="quellen">
            <h2 id="quellen" className="text-sm font-semibold text-muted-foreground">Quellen (Stand {STAND})</h2>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              {QUELLEN.map((q) => (
                <li key={q.url}>
                  {q.text}:{" "}
                  <a href={q.url} target="_blank" rel="noopener noreferrer" className="break-all underline underline-offset-2 hover:text-foreground">{q.url.replace(/^https?:\/\//, "").replace(/\?.*$/, "")}</a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Keine Rechts- oder Steuerberatung – im Einzelfall Anwalt oder Steuerberater fragen. Weitere kostenlose Werkzeuge findest du unter{" "}
              <Link to="/gratis-tools" className="underline underline-offset-2">Gratis-Tools</Link>.
            </p>
          </section>

          <HubNav show={["tools", "guides", "ratgeber"]} />
        </div>
      </main>
      <Footer />
      <EmailGateDialog
        open={gateOpen}
        onOpenChange={setGateOpen}
        resultName="XRechnung"
        slug={SLUG}
        singleUse
        onUnlocked={() => {
          setUnlocked(true);
          setGateOpen(false);
          erzeugen();
        }}
      />
    </div>
  );
}
