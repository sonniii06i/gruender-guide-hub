import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Finanzplan, FinanzplanEingabe } from "./finanzplan";

const tsd = (n: number) => Math.round(n).toLocaleString("de-DE");

/** Baut das Finanzplan-PDF (5 Abschnitte, Liquidität quer). Speichern macht der Aufrufer. */
export function baueFinanzplanPdf(e: FinanzplanEingabe, f: Finanzplan, name: string, vorhaben: string): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const kopf = (t: string, y: number) => {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(t, 14, y);
    doc.setFont("helvetica", "normal");
  };
  const nachTabelle = () => ((doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? 20) + 10;
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Finanzplan zur Existenzgründung", 14, 18);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text([name && `Gründer/in: ${name}`, vorhaben && `Vorhaben: ${vorhaben}`, `Erstellt am ${new Date().toLocaleDateString("de-DE")}`].filter(Boolean) as string[], 14, 26);

  kopf("1. Kapitalbedarfsplan", 44);
  autoTable(doc, {
    startY: 47,
    head: [["Posten", "Betrag (€)"]],
    body: [
      ...e.investitionen.map((p) => [`Investition: ${p.name}`, tsd(p.betrag)]),
      ...e.gruendungskosten.map((p) => [`Gründungskosten: ${p.name}`, tsd(p.betrag)]),
      ["Liquiditätsreserve / Betriebsmittel", tsd(e.reserve)],
      [{ content: "Kapitalbedarf gesamt", styles: { fontStyle: "bold" } }, { content: tsd(f.kapitalbedarf.summe), styles: { fontStyle: "bold" } }],
    ],
    columnStyles: { 1: { halign: "right" } },
    styles: { fontSize: 9 },
  });
  let y = nachTabelle();
  kopf("2. Finanzierungsplan", y);
  autoTable(doc, {
    startY: y + 3,
    head: [["Quelle", "Betrag (€)"]],
    body: [
      ["Eigenkapital", tsd(e.eigenkapital)],
      [`Darlehen (${e.darlehen.zinsProzent} % Zins, ${e.darlehen.laufzeitJahre} Jahre, ${e.darlehen.tilgungsfreiMonate} Monate tilgungsfrei)`, tsd(e.darlehen.betrag)],
      [{ content: "Finanzierung gesamt", styles: { fontStyle: "bold" } }, { content: tsd(f.finanzierung.summe), styles: { fontStyle: "bold" } }],
      ...(f.finanzierung.luecke > 0 ? [["Finanzierungslücke", tsd(f.finanzierung.luecke)]] : []),
    ],
    columnStyles: { 1: { halign: "right" } },
    styles: { fontSize: 9 },
  });
  y = nachTabelle();
  kopf("3. Rentabilitätsvorschau (3 Jahre)", y);
  const R = f.rentabilitaet;
  autoTable(doc, {
    startY: y + 3,
    head: [["", "Jahr 1", "Jahr 2", "Jahr 3"]],
    body: [
      ["Umsatz (netto)", ...R.map((r) => tsd(r.umsatz))],
      ["- Wareneinsatz", ...R.map((r) => tsd(r.wareneinsatz))],
      ["= Rohertrag", ...R.map((r) => tsd(r.rohertrag))],
      ["- Betriebskosten (J1 inkl. Gründungskosten)", ...R.map((r) => tsd(r.kosten))],
      ["- Personal", ...R.map((r) => tsd(r.personal))],
      ["- Abschreibungen", ...R.map((r) => tsd(r.abschreibung))],
      ["- Zinsen", ...R.map((r) => tsd(r.zinsen))],
      [{ content: "= Gewinn vor Steuern", styles: { fontStyle: "bold" } }, ...R.map((r) => ({ content: tsd(r.gewinn), styles: { fontStyle: "bold" as const } }))],
      [`- Steuerrücklage (${e.steuerruecklageProzent} %)`, ...R.map((r) => tsd(r.steuerruecklage))],
      ["- Lebenshaltung (abzgl. anderer Einkünfte)", ...R.map(() => tsd(Math.max(0, f.lebenshaltungMonat - e.andereEinkuenfteMonat) * 12))],
      [{ content: "= Überschuss", styles: { fontStyle: "bold" } }, ...R.map((r) => ({ content: tsd(r.ueberschuss), styles: { fontStyle: "bold" as const } }))],
    ],
    columnStyles: { 1: { halign: "right" }, 2: { halign: "right" }, 3: { halign: "right" } },
    styles: { fontSize: 9 },
  });
  y = nachTabelle();
  doc.setFontSize(9);
  doc.text(`Mindestumsatz pro Monat (Kosten, Abschreibung, Zinsen, Steuerrücklage und Lebenshaltung gedeckt): ${tsd(f.mindestumsatzMonat)} €`, 14, y);

  doc.addPage("a4", "landscape");
  kopf("4. Liquiditätsplan (12 Monate)", 14);
  const L = f.liquiditaet;
  autoTable(doc, {
    startY: 17,
    head: [["", ...L.map((m) => `M${m.monat}`)]],
    body: [
      ["Umsatzeingänge", ...L.map((m) => tsd(m.einUmsatz))],
      ["Zuschüsse (GZ/Einstiegsgeld)", ...L.map((m) => tsd(m.einZuschuss))],
      ["Eigenkapital & Darlehen", ...L.map((m) => tsd(m.einKapital))],
      ["Investitionen & Gründung", ...L.map((m) => tsd(-m.ausInvest))],
      ["Wareneinsatz", ...L.map((m) => tsd(-m.ausWare))],
      ["Betriebskosten", ...L.map((m) => tsd(-m.ausKosten))],
      ["Personal", ...L.map((m) => tsd(-m.ausPersonal))],
      ["Zins & Tilgung", ...L.map((m) => tsd(-m.ausZinsTilgung))],
      ["Privatentnahme", ...L.map((m) => tsd(-m.ausPrivat))],
      [{ content: "Saldo", styles: { fontStyle: "bold" } }, ...L.map((m) => ({ content: tsd(m.saldo), styles: { fontStyle: "bold" as const } }))],
      [{ content: "Kontostand", styles: { fontStyle: "bold" } }, ...L.map((m) => ({ content: tsd(m.bestand), styles: { fontStyle: "bold" as const, textColor: m.bestand < 0 ? [200, 30, 30] : [0, 0, 0] } }))],
    ] as never,
    styles: { fontSize: 7.5, halign: "right" },
    columnStyles: { 0: { halign: "left", cellWidth: 48 } },
  });

  doc.addPage("a4", "portrait");
  kopf("5. Private Lebenshaltungskosten (monatlich)", 14);
  autoTable(doc, {
    startY: 17,
    head: [["Posten", "€ / Monat"]],
    body: [
      ...e.privat.map((p) => [p.name, tsd(p.betrag)]),
      [{ content: "Summe", styles: { fontStyle: "bold" } }, { content: tsd(f.lebenshaltungMonat), styles: { fontStyle: "bold" } }],
      ["davon gedeckt durch andere Einkünfte im Haushalt", tsd(e.andereEinkuenfteMonat)],
    ],
    columnStyles: { 1: { halign: "right" } },
    styles: { fontSize: 9 },
  });
  y = nachTabelle();
  kopf("Annahmen", y);
  doc.setFontSize(8.5);
  doc.text(
    doc.splitTextToSize(
      [
        `Umsatz Monat 1: ${tsd(e.umsatzMonat1)} €, Wachstum ${e.wachstumMonatProzent} % pro Monat im ersten Jahr, ${e.wachstumJahr2Prozent} % in Jahr 2, ${e.wachstumJahr3Prozent} % in Jahr 3.`,
        `Wareneinsatz ${e.wareneinsatzProzent} % vom Umsatz; Kostensteigerung ${e.kostenSteigerungProzent} % pro Jahr; Abschreibung linear über ${e.nutzungsdauerJahre} Jahre.`,
        e.zahlungszielEinMonat ? "Kunden zahlen mit einem Monat Zahlungsziel." : "Kunden zahlen im Monat der Leistung.",
        "Alle Beträge netto ohne Umsatzsteuer. Einkommensteuer über die Steuerrücklage berücksichtigt. Zuschüsse (Gründungszuschuss/Einstiegsgeld) sind steuerfrei und nur in der Liquidität enthalten.",
      ].join(" "),
      180,
    ),
    14,
    y + 5,
  );
  doc.setFontSize(7);
  doc.text("Erstellt mit GründerX (gruenderx.de). Planrechnung ohne Gewähr; ersetzt keine Beratung.", 14, 287);
  return doc;
}
