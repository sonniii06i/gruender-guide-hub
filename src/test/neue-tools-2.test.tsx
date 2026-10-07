import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import SteuerFristenKalender from "@/pages/SteuerFristenKalender";
import ScheinselbststaendigkeitCheck from "@/pages/ScheinselbststaendigkeitCheck";
import GzPhase2Bericht, { phase2Auswertung } from "@/pages/GzPhase2Bericht";
import BankgespraechVorbereitung from "@/pages/BankgespraechVorbereitung";
import GruendungsberatungFinden from "@/pages/GruendungsberatungFinden";
import { bewerteStatus, pruefeRvPflicht, INDIZIEN } from "@/lib/statusCheck";
import { juryFragen, leeresDeck, felixJuryPrompt } from "@/lib/pitchDeck";
import { plzZuLand } from "@/lib/plz";

const zeige = (ui: React.ReactElement) => render(<HelmetProvider><MemoryRouter>{ui}</MemoryRouter></HelmetProvider>);

describe("Status-Check (Scheinselbstständigkeit)", () => {
  it("viele Anstellungsmerkmale → hohes Risiko, Selbstständigkeitsmerkmale → niedrig", () => {
    const alleJa = Object.fromEntries(INDIZIEN.map((i) => [i.id, i.richtung === "abhaengig"]));
    expect(bewerteStatus(alleJa).risiko).toBe("hoch");
    const selbst = Object.fromEntries(INDIZIEN.map((i) => [i.id, i.richtung === "selbststaendig"]));
    expect(bewerteStatus(selbst).risiko).toBe("niedrig");
    expect(bewerteStatus({}).risiko).toBe("offen");
  });
  it("RV-Pflicht: ein Hauptkunde ohne Mitarbeiter → pflichtig, Befreiung in den ersten 3 Jahren", () => {
    const r = pruefeRvPflicht({ anteilHauptkunde: 90, svPflichtigeMitarbeiter: false, minijobSummeMonat: 0, einkommenMonat: 3000, monateSeitStart: 6 });
    expect(r.pflichtig).toBe(true);
    expect(r.befreiungMoeglich).toBe(true);
    expect(r.beitragGeschaetzt).toBe(558);
  });
  it("Minijobber zusammen über 603 € zählen als Arbeitnehmer; unter 5/6 kein Hauptkunde", () => {
    expect(pruefeRvPflicht({ anteilHauptkunde: 90, svPflichtigeMitarbeiter: false, minijobSummeMonat: 700, einkommenMonat: 3000, monateSeitStart: 6 }).pflichtig).toBe(false);
    expect(pruefeRvPflicht({ anteilHauptkunde: 80, svPflichtigeMitarbeiter: false, minijobSummeMonat: 0, einkommenMonat: 3000, monateSeitStart: 6 }).pflichtig).toBe(false);
  });
});

describe("Phase 2, Pitch-Jury, PLZ", () => {
  it("Phase 2 warnt bei < 15 Stunden und wenn der Gewinn die Lebenshaltung deckt", () => {
    const a = phase2Auswertung({ name: "", kundennummer: "", start: "", stunden: 10, aktivitaeten: "x", auftraege: "", ausblick: "", lebenshaltung: 1000, monate: Array.from({ length: 6 }, () => ({ einnahmen: 3000, ausgaben: 500 })) });
    expect(a.hinweise.some((h) => h.stufe === "kritisch")).toBe(true);
    expect(a.hinweise.some((h) => h.text.includes("FW 94.13"))).toBe(true);
  });
  it("Jury-Fragen zielen auf Lücken, Felix-Prompt enthält Deck", () => {
    expect(juryFragen(leeresDeck())[0]).toMatch(/zahlende Kunden/);
    expect(felixJuryPrompt({ ...leeresDeck(), name: "Feldwerk" })).toContain("Feldwerk");
  });
  it("PLZ → Bundesland", () => {
    expect(plzZuLand("80331")).toBe("BY");
    expect(plzZuLand("20095")).toBe("HH");
    expect(plzZuLand("1234")).toBeNull();
  });
});

describe("Seiten rendern", () => {
  it.each([
    ["Steuerkalender", <SteuerFristenKalender key="a" />, /Termine in den nächsten 12 Monaten/],
    ["Scheinselbstständigkeit", <ScheinselbststaendigkeitCheck key="b" />, /Rentenversicherungspflicht als Selbstständiger/],
    ["Phase 2", <GzPhase2Bericht key="c" />, /Bericht als PDF/],
    ["Bankgespräch", <BankgespraechVorbereitung key="d" />, /Kreditrechner StartGeld/],
  ])("%s", (_, ui, text) => {
    zeige(ui);
    expect(screen.getAllByText(text).length).toBeGreaterThan(0);
  });
  it("Beratungs-Finder zeigt nach PLZ das Bundesland", () => {
    zeige(<GruendungsberatungFinden />);
    fireEvent.change(screen.getByLabelText("Postleitzahl"), { target: { value: "04109" } });
    expect(screen.getByText(/Nächste Beratungstermine in Sachsen/)).toBeInTheDocument();
  });
});
