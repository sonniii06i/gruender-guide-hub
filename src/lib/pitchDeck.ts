// Pitch-Deck für Gründungswettbewerbe, Accelerator-Bewerbungen und Investoren.
// 10 Folien im üblichen Aufbau; Prüfregeln = das, worauf Jurys achten.

export type FolieId =
  | "titel" | "problem" | "loesung" | "markt" | "produkt" | "geschaeftsmodell" | "traction" | "wettbewerb" | "team" | "ask";

export type FolienVorlage = { id: FolieId; titel: string; frage: string; beispiel: string; pflicht: boolean };

export const FOLIEN: FolienVorlage[] = [
  { id: "titel", titel: "Titel", frage: "Name und ein Satz, was ihr macht – für wen.", beispiel: "Feldwerk – Auftragsplanung per Sprachnachricht für Handwerksbetriebe", pflicht: true },
  { id: "problem", titel: "Problem", frage: "Welches Problem, wer hat es, was kostet es heute?", beispiel: "Handwerksmeister planen Aufträge abends am Küchentisch\nIm Schnitt 6 Stunden pro Woche Büroarbeit\nZettelwirtschaft führt zu vergessenen Terminen", pflicht: true },
  { id: "loesung", titel: "Lösung", frage: "Wie löst ihr es – in einem Satz plus 2–3 Punkten?", beispiel: "Sprachnachricht rein, Auftrag mit Termin und Material raus\nFunktioniert per WhatsApp, keine neue App\nAbgleich mit dem Kalender des Teams", pflicht: true },
  { id: "markt", titel: "Markt", frage: "Wie groß ist der Markt (TAM/SAM/SOM) – mit Quelle?", beispiel: "TAM: alle Handwerksbetriebe in Deutschland (Quelle: ZDH-Statistik)\nSAM: davon Betriebe mit 1–9 Beschäftigten\nSOM: realistisch in 3 Jahren erreichbar, z. B. 5.000 Kunden", pflicht: true },
  { id: "produkt", titel: "Produkt", frage: "Wie funktioniert es konkret? (Screenshot/Demo-Link)", beispiel: "1. Meister schickt Sprachnachricht\n2. KI erkennt Kunde, Leistung, Termin\n3. Auftrag landet im Teamkalender", pflicht: false },
  { id: "geschaeftsmodell", titel: "Geschäftsmodell", frage: "Wer zahlt wie viel wofür – und was bleibt übrig?", beispiel: "39 € pro Monat und Betrieb\nRohmarge 85 %\nVertrieb über Innungen und Großhändler", pflicht: true },
  { id: "traction", titel: "Traction", frage: "Was ist schon passiert? Kunden, Umsatz, Pilot, Warteliste – Zahlen.", beispiel: "12 zahlende Pilotbetriebe seit Juni\n2.100 € MRR, +30 % pro Monat\nAbsichtserklärung einer Innung mit 400 Mitgliedern", pflicht: true },
  { id: "wettbewerb", titel: "Wettbewerb", frage: "Was nutzen Kunden heute – und warum seid ihr besser?", beispiel: "Heute: Zettel, Excel, große Handwerkersoftware ab 150 €/Monat\nWir: ohne Einarbeitung, per Sprache, ein Viertel des Preises", pflicht: true },
  { id: "team", titel: "Team", frage: "Wer seid ihr und warum genau ihr?", beispiel: "Lena – Elektromeisterin, 10 Jahre eigener Betrieb\nJonas – Entwickler, vorher 4 Jahre bei einem SaaS-Startup", pflicht: true },
  { id: "ask", titel: "Finanzen & Ask", frage: "Umsatzplan, wie viel Geld/Unterstützung braucht ihr – wofür?", beispiel: "Umsatz: 25.000 € (J1) → 180.000 € (J2) → 600.000 € (J3)\nWir suchen 250.000 € für 18 Monate\n60 % Produkt, 30 % Vertrieb, 10 % Reserve", pflicht: true },
];

export type PitchDeck = { name: string; kontakt: string; folien: Record<FolieId, string> };

export const leeresDeck = (): PitchDeck => ({
  name: "",
  kontakt: "",
  folien: Object.fromEntries(FOLIEN.map((f) => [f.id, ""])) as Record<FolieId, string>,
});

export const punkte = (text: string) => text.split("\n").map((z) => z.trim()).filter(Boolean);
const woerter = (text: string) => text.split(/\s+/).filter(Boolean).length;

export type PitchHinweis = { folie: FolieId | "deck"; stufe: "ok" | "warnung" | "fehlt"; text: string };

/** Jury-Check: fehlende Pflichtfolien, Textwüsten, Markt ohne Quelle, Traction ohne Zahl, Ask ohne Betrag. */
export function pruefePitch(d: PitchDeck): PitchHinweis[] {
  const h: PitchHinweis[] = [];
  for (const f of FOLIEN) {
    const t = d.folien[f.id] ?? "";
    if (!t.trim()) {
      if (f.pflicht) h.push({ folie: f.id, stufe: "fehlt", text: `${f.titel}: fehlt noch.` });
      continue;
    }
    if (woerter(t) > 45) h.push({ folie: f.id, stufe: "warnung", text: `${f.titel}: ${woerter(t)} Wörter – Jurys lesen Folien in Sekunden, bleib unter 45.` });
    if (punkte(t).length > 5) h.push({ folie: f.id, stufe: "warnung", text: `${f.titel}: mehr als 5 Punkte – kürzen oder aufteilen.` });
  }
  const markt = d.folien.markt ?? "";
  if (markt.trim() && !/quelle|statista|destatis|studie|bericht|verband|\(.*\d{4}.*\)|https?:/i.test(markt))
    h.push({ folie: "markt", stufe: "warnung", text: "Markt: Nenne eine Quelle für deine Zahlen – unbelegte Marktgrößen kosten Glaubwürdigkeit." });
  const traction = d.folien.traction ?? "";
  if (traction.trim() && !/\d/.test(traction))
    h.push({ folie: "traction", stufe: "warnung", text: "Traction: Ohne Zahl ist es keine Traction. Kunden, Umsatz, Nutzer, Warteliste – irgendetwas Zählbares." });
  const ask = d.folien.ask ?? "";
  if (ask.trim() && !/\d.*(€|eur|euro|tsd|k\b|mio)/i.test(ask))
    h.push({ folie: "ask", stufe: "warnung", text: "Ask: Nenne einen konkreten Betrag und wofür er verwendet wird." });
  if (!d.name.trim()) h.push({ folie: "deck", stufe: "fehlt", text: "Name des Vorhabens fehlt." });
  if (!h.length) h.push({ folie: "deck", stufe: "ok", text: "Alle Pflichtfolien gefüllt, kurz und mit Zahlen – bereit für die Bewerbung." });
  return h;
}

/** 60-Sekunden-Elevator-Pitch aus den Folien: Problem → Lösung → Beweis → Ask. */
export function elevatorPitch(d: PitchDeck): string {
  const erst = (id: FolieId) => punkte(d.folien[id] ?? "")[0] ?? "";
  const teile = [
    d.name && `Wir sind ${d.name}.`,
    erst("problem") && `Das Problem: ${erst("problem")}.`,
    erst("loesung") && `Unsere Lösung: ${erst("loesung")}.`,
    erst("traction") && `Das funktioniert schon: ${erst("traction")}.`,
    erst("geschaeftsmodell") && `Wir verdienen Geld mit: ${erst("geschaeftsmodell")}.`,
    erst("ask") && `Was wir brauchen: ${punkte(d.folien.ask ?? "")[1] ?? erst("ask")}.`,
  ].filter(Boolean) as string[];
  return teile.join(" ").replace(/\.\./g, ".");
}

/** Fragen, die eine Jury zu genau diesem Deck stellen würde – gezielt an den Lücken. */
export function juryFragen(d: PitchDeck): string[] {
  const t = (id: FolieId) => (d.folien[id] ?? "").toLowerCase();
  const f: string[] = [];
  if (!/\d/.test(t("traction"))) f.push("Wie viele zahlende Kunden habt ihr – und was haben sie bisher gezahlt?");
  else f.push("Welche eurer Zahlen in der Traction ist die wichtigste, und wie hat sie sich im letzten Monat entwickelt?");
  if (!/quelle|statista|destatis|studie|verband/.test(t("markt"))) f.push("Woher stammen eure Marktzahlen – und wie habt ihr den erreichbaren Markt (SOM) berechnet?");
  if (!/€|eur|preis|abo|monat/.test(t("geschaeftsmodell"))) f.push("Was zahlt ein Kunde konkret, und wie hoch sind eure Kosten, um ihn zu gewinnen?");
  else f.push("Wie hoch sind Kundengewinnungskosten (CAC) und Kundenwert (LTV) – und ab wann rechnet sich ein Kunde?");
  if (!t("wettbewerb")) f.push("Wer ist euer stärkster Wettbewerber, und was macht er besser als ihr?");
  else f.push("Was hindert einen großen Anbieter daran, euer Produkt in drei Monaten nachzubauen?");
  if (!/€|eur|k\b|mio/.test(t("ask"))) f.push("Wie viel Geld braucht ihr, wofür genau, und welchen Meilenstein erreicht ihr damit?");
  else f.push("Welcher Meilenstein ist mit dem Geld erreicht, und was passiert, wenn es 50 % länger dauert?");
  f.push("Warum seid genau ihr das richtige Team für dieses Problem?");
  f.push("Was ist das größte Risiko in eurem Plan – und wie geht ihr damit um?");
  f.push("Warum ist jetzt der richtige Zeitpunkt für diese Lösung?");
  return f;
}

/** Prompt für Felix: Jury-Rolle mit Deck-Inhalt, eine Frage nach der anderen. */
export function felixJuryPrompt(d: PitchDeck): string {
  const inhalt = FOLIEN.filter((f) => (d.folien[f.id] ?? "").trim())
    .map((f) => `${f.titel}: ${d.folien[f.id].trim().replace(/\n/g, "; ")}`)
    .join("\n");
  return `Sei die Jury eines Gründungswettbewerbs. Hier ist unser Pitch-Deck „${d.name || "ohne Namen"}“:\n${inhalt}\n\nStell mir nacheinander die 5 kritischsten Fragen – immer nur eine, warte auf meine Antwort und bewerte sie kurz (stark/schwach + Verbesserung), bevor du die nächste stellst.`;
}
