import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GruendungszuschussCheck from "@/pages/GruendungszuschussCheck";
import GruenderEvents from "@/pages/GruenderEvents";
import { HelmetProvider } from "react-helmet-async";

const zeige = (ui: React.ReactElement) => render(<HelmetProvider><MemoryRouter>{ui}</MemoryRouter></HelmetProvider>);

describe("Gründungszuschuss-Check (Seite)", () => {
  it("startet offen und rechnet den Standardfall 1.500 € ALG", () => {
    zeige(<GruendungszuschussCheck />);
    expect(screen.getByText("Noch nicht alle Fragen beantwortet")).toBeInTheDocument();
    expect(screen.getAllByText(/13\.500/).length).toBeGreaterThan(0);
  });

  it("wird grün, wenn alles passt, und rot bei zu wenig Resttagen", () => {
    zeige(<GruendungszuschussCheck />);
    const [rest, stunden] = screen.getAllByRole("spinbutton");
    fireEvent.change(rest, { target: { value: "200" } });
    fireEvent.change(stunden, { target: { value: "40" } });
    // Reihenfolge der Ja/Nein-Fragen: ALG, Sperrzeit, gestartet, 24 Monate, Eigenkündigung, Rente, Behinderung
    const ja = screen.getAllByRole("button", { name: "Ja" });
    const nein = screen.getAllByRole("button", { name: "Nein" });
    fireEvent.click(ja[0]);
    [1, 2, 3, 4, 5].forEach((i) => fireEvent.click(nein[i]));
    expect(screen.getByText("Voraussetzungen erfüllt")).toBeInTheDocument();
    fireEvent.change(rest, { target: { value: "120" } });
    expect(screen.getByText("So klappt es (noch) nicht")).toBeInTheDocument();
  });
});

describe("Gründer-Events (Seite)", () => {
  it("rendert Fristen-Radar und Termine", () => {
    zeige(<GruenderEvents />);
    expect(screen.getByText(/Fristen-Radar/)).toBeInTheDocument();
    expect(screen.getByText("Nächste Termine")).toBeInTheDocument();
  });
});
