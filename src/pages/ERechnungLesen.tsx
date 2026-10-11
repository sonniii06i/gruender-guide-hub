import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Download, FileUp, ShieldCheck, XCircle } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { HubNav } from "@/components/landing/HubNav";
import { PageHeader } from "@/components/landing/PageHeader";
import { KitTable } from "@/components/cockpit/kit";
import { PublicSection, FaqList, CtaBand, ctaPrimaryOnInk } from "@/components/public/PublicBlocks";
import { breadcrumbSchema, faqSchema } from "@/lib/freetools/schema";
import { ErFehler, leseERechnung, pruefeERechnung, typName, type ErPartei, type ErRechnung } from "@/lib/eRechnungLesen";
import { baueXRechnung } from "@/lib/xrechnung";

const SITE = "https://gruenderx.de";
const geld = (n: number, w = "EUR") => n.toLocaleString("de-DE", { style: "currency", currency: w || "EUR" });
const tag = (iso: string) => (iso ? iso.split("-").reverse().join(".") : "–");

const faqs = [
  { q: "Wie öffne ich eine XRechnung?", a: "Eine XRechnung ist eine XML-Datei und für Menschen schwer lesbar. Lade sie hier hoch – sie wird direkt in deinem Browser in eine lesbare Rechnung mit allen Beträgen, Positionen und Bankdaten umgewandelt und lässt sich als PDF speichern. Die Datei verlässt dein Gerät nicht." },
  { q: "Muss ich E-Rechnungen empfangen können?", a: "Ja. Seit 01.01.2025 müssen alle Unternehmen in Deutschland E-Rechnungen empfangen können – auch Kleinunternehmer. Ein E-Mail-Postfach reicht dafür aus; lesbar machen kannst du die Dateien mit diesem Tool." },
  { q: "Muss ich die XML-Datei aufbewahren?", a: "Ja. Bei einer E-Rechnung ist die strukturierte Datei das Original und muss 8 Jahre aufbewahrt werden; ein PDF-Ausdruck ersetzt sie nicht." },
];

const Partei = ({ titel, p }: { titel: string; p: ErPartei }) => (
  <div className="rounded-2xl border border-border bg-card p-5 text-sm shadow-card">
    <div className="mb-1.5 text-sm text-muted-foreground">{titel}</div>
    <div className="font-semibold">{p.name || "–"}</div>
    <div className="text-muted-foreground">{p.strasse}</div>
    <div className="text-muted-foreground">{[p.plz, p.ort].filter(Boolean).join(" ")} {p.land && p.land !== "DE" ? `(${p.land})` : ""}</div>
    {(p.ustId || p.steuernummer) && <div className="mt-2 text-xs">{p.ustId ? `USt-IdNr. ${p.ustId}` : `St.-Nr. ${p.steuernummer}`}</div>}
    {(p.kontakt || p.email) && <div className="text-xs text-muted-foreground">{[p.kontakt, p.email].filter(Boolean).join(" · ")}</div>}
  </div>
);

export function rechnungAlsPdf(r: ErRechnung): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = r.waehrung;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text(`${typName(r.typ)} ${r.nummer}`, 14, 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text([`Datum: ${tag(r.datum)}`, `Leistung: ${tag(r.leistungsdatum)}`, `Fällig: ${tag(r.faellig)}`, r.kaeuferReferenz && `Referenz: ${r.kaeuferReferenz}`].filter(Boolean) as string[], 140, 14);
  const block = (p: ErPartei, x: number, titel: string) =>
    doc.text([titel, p.name, p.strasse, [p.plz, p.ort].filter(Boolean).join(" "), p.ustId ? `USt-IdNr. ${p.ustId}` : p.steuernummer ? `St.-Nr. ${p.steuernummer}` : ""].filter(Boolean), x, 36);
  block(r.verkaeufer, 14, "Von:");
  block(r.kaeufer, 110, "An:");
  autoTable(doc, {
    startY: 66,
    head: [["Position", "Menge", "Einzelpreis", "USt", "Netto"]],
    body: r.positionen.map((p) => [p.name, `${p.menge.toLocaleString("de-DE")} ${p.einheit}`, geld(p.preis, w), p.satz === null ? p.kategorie : `${p.satz} %`, geld(p.netto, w)]),
    styles: { fontSize: 8.5 },
    columnStyles: { 1: { halign: "right" }, 2: { halign: "right" }, 3: { halign: "right" }, 4: { halign: "right" } },
  });
  let y = ((doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? 80) + 6;
  const zeile = (l: string, v: string, fett = false) => {
    doc.setFont("helvetica", fett ? "bold" : "normal");
    doc.text(l, 130, y);
    doc.text(v, 196, y, { align: "right" });
    y += 5;
  };
  r.zuAbschlaege.forEach((z) => zeile(z.grund.slice(0, 28), geld(z.betrag, w)));
  zeile("Netto", geld(r.summen.netto, w));
  r.steuern.forEach((s) => zeile(`USt ${s.satz} % (${s.kategorie})`, geld(s.betrag, w)));
  zeile("Brutto", geld(r.summen.brutto, w), true);
  if (r.summen.vorausbezahlt) zeile("bereits gezahlt", geld(r.summen.vorausbezahlt, w));
  zeile("Zu zahlen", geld(r.summen.zahlbar, w), true);
  doc.setFont("helvetica", "normal");
  y += 4;
  const zahlung = [r.zahlung.iban && `IBAN ${r.zahlung.iban}${r.zahlung.bic ? ` · BIC ${r.zahlung.bic}` : ""}`, r.zahlung.verwendungszweck && `Verwendungszweck: ${r.zahlung.verwendungszweck}`, r.zahlung.bedingungen].filter(Boolean) as string[];
  if (zahlung.length) doc.text(doc.splitTextToSize(zahlung.join("\n"), 182), 14, y);
  y += zahlung.length * 5 + 4;
  for (const s of r.steuern.filter((x) => x.grund)) {
    doc.text(doc.splitTextToSize(s.grund!, 182), 14, y);
    y += 6;
  }
  for (const n of r.notizen) {
    const z = doc.splitTextToSize(n, 182);
    doc.text(z, 14, y);
    y += z.length * 4.5 + 2;
  }
  doc.setFontSize(7);
  doc.text("Lesefassung einer E-Rechnung, erstellt mit GründerX. Rechtlich maßgeblich ist die XML-Datei (aufbewahren!).", 14, 288);
  return doc;
}

export default function ERechnungLesen() {
  const [r, setR] = useState<ErRechnung | null>(null);
  const [fehler, setFehler] = useState("");
  const [datei, setDatei] = useState("");

  const lesen = (xml: string, name: string) => {
    try {
      setR(leseERechnung(xml));
      setFehler("");
      setDatei(name);
    } catch (e) {
      setR(null);
      setFehler(e instanceof ErFehler ? e.message : "Die Datei konnte nicht gelesen werden.");
    }
  };
  const datei_waehlen = async (f: File | undefined) => {
    if (!f) return;
    if (f.size > 5_000_000) return setFehler("Die Datei ist größer als 5 MB – das ist keine typische E-Rechnung.");
    if (/\.pdf$/i.test(f.name)) return setFehler("Das ist ein PDF. ZUGFeRD-PDFs kannst du direkt lesen; hier brauchst du die XML-Datei (XRechnung).");
    lesen(await f.text(), f.name);
  };
  const beispiel = () =>
    lesen(
      baueXRechnung({
        verkaeufer: { name: "Muster Webdesign Erika Muster", strasse: "Hauptstraße 1", plzOrt: "10115 Berlin", steuernummer: "", ustId: "DE123456789", iban: "DE02120300000000202051", bic: "BYLADEM1001", email: "rechnung@muster.example", telefon: "+49 30 1234567", kontaktName: "Erika Muster" },
        kunde: { name: "Kunde GmbH", strasse: "Marktplatz 5", plzOrt: "80331 München", land: "Deutschland", ustId: "", email: "buchhaltung@kunde.example" },
        kaeuferReferenz: "PO-4711", rechnungsnummer: "RE-2026-042", rechnungsdatum: "2026-10-08", leistungsdatum: "2026-10-01", zahlungsziel: 14, modus: "standard",
        positionen: [{ beschreibung: "Webdesign Startseite", menge: 1, einzelpreisNetto: 1200, ustSatz: 19 }, { beschreibung: "Fachbuch", menge: 2, einzelpreisNetto: 24.99, ustSatz: 7 }],
        freitext: "Vielen Dank für Ihren Auftrag.",
      }),
      "beispiel-xrechnung.xml",
    );

  const pruefung = r ? pruefeERechnung(r) : [];

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="E-Rechnung lesen: XRechnung öffnen & als PDF speichern | GründerX"
        description="XRechnung oder ZUGFeRD-XML hochladen und sofort als lesbare Rechnung sehen – mit Rechenprüfung, IBAN-Check und PDF. Kostenlos, ohne Anmeldung, die Datei bleibt auf deinem Gerät."
        path="/e-rechnung-lesen"
        jsonLd={[breadcrumbSchema([{ name: "Start", url: `${SITE}/` }, { name: "E-Rechnung lesen", url: `${SITE}/e-rechnung-lesen` }]), faqSchema(faqs)]}
      />
      <Navbar />
      <main>
        <PageHeader
          width="max-w-4xl"
          kicker={
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/25 bg-brand-green-soft px-3 py-1 text-[13px] font-medium text-brand-green">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Kostenlos, die Datei bleibt auf deinem Gerät
            </span>
          }
          title="E-Rechnung lesen"
          lead={
            <p>
              XRechnung bekommen und nur XML-Code gesehen? Datei hochladen: Du siehst sofort die lesbare Rechnung, eine
              Rechenprüfung und kannst sie als PDF speichern.
            </p>
          }
        />

        <div className="container max-w-4xl space-y-12 px-4 py-12 md:py-16">
          <section aria-label="Datei hochladen" className="space-y-3">
            <label
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                datei_waehlen(e.dataTransfer.files?.[0]);
              }}
              className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-accent-blue/35 bg-card px-6 py-12 text-center shadow-card transition-colors hover:border-accent-blue/60 hover:bg-accent/40 focus-within:border-accent-blue focus-within:ring-[3px] focus-within:ring-ring/25"
            >
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-blue transition-transform group-hover:-translate-y-0.5">
                <FileUp className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="text-base font-semibold">XML-Datei hierher ziehen oder auswählen</span>
              <span className="mt-1 text-sm text-muted-foreground">XRechnung oder ZUGFeRD/Factur-X-XML, CII- oder UBL-Syntax</span>
              <input type="file" accept=".xml,text/xml,application/xml" className="sr-only" onChange={(e) => datei_waehlen(e.target.files?.[0])} aria-label="E-Rechnung auswählen" />
            </label>
            <div className="text-center">
              <button type="button" onClick={beispiel} className="text-sm font-medium text-accent-blue hover:underline">Keine Datei zur Hand? Beispiel-XRechnung anzeigen</button>
            </div>
            {fehler && (
              <div role="alert" className="flex gap-2.5 rounded-xl border border-danger/25 bg-danger-soft p-4 text-sm">
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
                <span>{fehler}</span>
              </div>
            )}
          </section>

          {r && (
            <section aria-label="Gelesene Rechnung" className="space-y-4" aria-live="polite">
              <div className="overflow-hidden rounded-2xl bg-ink text-primary-foreground shadow-soft">
                <div className="flex flex-wrap items-end justify-between gap-6 p-6 md:p-7">
                  <div className="min-w-0">
                    <div className="text-sm text-primary-foreground/65">
                      {datei}, {r.syntax}{r.spezifikation.includes("xrechnung") ? ", XRechnung" : r.spezifikation.includes("factur-x") || r.spezifikation.includes("zugferd") ? ", ZUGFeRD" : ""}
                    </div>
                    <h2 className="mt-1 break-words text-2xl font-semibold tracking-tight">{typName(r.typ)} {r.nummer}</h2>
                    <div className="mt-1 text-sm text-primary-foreground/70 tabular">
                      vom {tag(r.datum)}, Leistung {tag(r.leistungsdatum)}, fällig {tag(r.faellig)}{r.kaeuferReferenz ? `, Referenz ${r.kaeuferReferenz}` : ""}
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <div className="text-sm text-primary-foreground/65">Zu zahlen</div>
                    <div className="text-4xl font-semibold tracking-[-0.03em] tabular">{geld(r.summen.zahlbar, r.waehrung)}</div>
                    <Button size="sm" className="mt-3 rounded-lg bg-card font-semibold text-primary shadow-none hover:bg-card/90" onClick={() => rechnungAlsPdf(r).save(`${(r.nummer || "e-rechnung").replace(/[^a-z0-9-]+/gi, "-")}.pdf`)}>
                      <Download className="h-4 w-4" /> Als PDF speichern
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Partei titel="Von (Rechnungssteller)" p={r.verkaeufer} />
                <Partei titel="An (Rechnungsempfänger)" p={r.kaeufer} />
              </div>
              <KitTable caption="Rechnungspositionen" className="shadow-card">
                <thead>
                  <tr>
                    <th>Position</th><th className="!text-right">Menge</th><th className="!text-right">Einzelpreis</th><th className="!text-right">USt</th><th className="!text-right">Netto</th>
                  </tr>
                </thead>
                <tbody>
                  {r.positionen.map((p, i) => (
                    <tr key={i}>
                      <td className="min-w-[12rem]">{p.name}</td>
                      <td className="whitespace-nowrap text-right">{p.menge.toLocaleString("de-DE")} {p.einheit}</td>
                      <td className="whitespace-nowrap text-right">{geld(p.preis, r.waehrung)}</td>
                      <td className="whitespace-nowrap text-right">{p.satz === null ? p.kategorie : `${p.satz} %`}</td>
                      <td className="whitespace-nowrap text-right">{geld(p.netto, r.waehrung)}</td>
                    </tr>
                  ))}
                </tbody>
              </KitTable>
              <div className="ml-auto max-w-sm space-y-1.5 rounded-2xl border border-border bg-card p-5 text-sm shadow-card tabular">
                {r.zuAbschlaege.map((z, i) => <div key={i} className="flex justify-between gap-4 text-muted-foreground"><span>{z.grund}</span><span>{geld(z.betrag, r.waehrung)}</span></div>)}
                <div className="flex justify-between gap-4"><span>Netto</span><span>{geld(r.summen.netto, r.waehrung)}</span></div>
                {r.steuern.map((s, i) => <div key={i} className="flex justify-between gap-4 text-muted-foreground"><span>USt {s.satz} % ({s.kategorie})</span><span>{geld(s.betrag, r.waehrung)}</span></div>)}
                <div className="flex justify-between gap-4 border-t border-border pt-2 text-base font-semibold"><span>Brutto</span><span>{geld(r.summen.brutto, r.waehrung)}</span></div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-5 text-sm shadow-card">
                  <h3 className="mb-2 font-semibold">Zahlung</h3>
                  {r.zahlung.iban ? <div>IBAN <span className="font-mono">{r.zahlung.iban}</span>{r.zahlung.bic ? `, BIC ${r.zahlung.bic}` : ""}</div> : <div className="text-muted-foreground">Keine Bankverbindung angegeben</div>}
                  {r.zahlung.verwendungszweck && <div className="mt-1">Verwendungszweck: {r.zahlung.verwendungszweck}</div>}
                  {r.zahlung.bedingungen && <div className="mt-1.5 text-xs text-muted-foreground">{r.zahlung.bedingungen}</div>}
                  {r.steuern.filter((s) => s.grund).map((s, i) => <div key={i} className="mt-1.5 text-xs text-muted-foreground">{s.grund}</div>)}
                  {r.notizen.map((n, i) => <div key={i} className="mt-1.5 text-xs text-muted-foreground">{n}</div>)}
                </div>
                <div className="rounded-2xl border border-border bg-card p-5 text-sm shadow-card">
                  <h3 className="mb-2 font-semibold">Prüfung</h3>
                  <ul className="space-y-1.5 text-sm">
                    {pruefung.map((p, i) => (
                      <li key={i} className="flex gap-2">
                        {p.ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-label="in Ordnung" /> : <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-label="Fehler" />}
                        <span className={p.ok ? "text-foreground/85" : "font-medium text-danger"}>{p.text}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-muted-foreground">Rechnerische Prüfung; die vollständige Formatprüfung macht der KoSIT-Validator.</p>
                </div>
              </div>
            </section>
          )}

          <CtaBand
            title="Selbst E-Rechnungen schreiben"
            actions={
              <Button asChild size="lg" className={ctaPrimaryOnInk}>
                <Link to="/tools/rechnungs-generator">Zum Rechnungs-Generator <ArrowRight /></Link>
              </Button>
            }
          >
            Ab 2027/2028 musst du an Unternehmen E-Rechnungen ausstellen. Der Rechnungs-Generator im GründerX-Cockpit erzeugt geprüfte XRechnungen.
          </CtaBand>

          <PublicSection title="Häufige Fragen">
            <FaqList items={faqs} />
          </PublicSection>
          <HubNav show={["tools", "guides", "ratgeber"]} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
