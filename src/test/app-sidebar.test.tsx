import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

vi.mock("@/hooks/useRole", () => ({ useRole: () => ({ isAdmin: false }) }));

const zeigen = () =>
  render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    </MemoryRouter>,
  );

describe("AppSidebar", () => {
  it("zeigt eine entschlackte Hauptnavigation und Chancen & Mehr", () => {
    zeigen();
    for (const label of [
      "Übersicht",
      "Kurse & Guides",
      "Tools & Rechner",
      "Steuern & Fristen",
      "Anbieter-Vergleich",
      "Felix fragen",
      "Chancen & Mehr",
    ]) {
      expect(screen.getByText(label)).toBeTruthy();
    }
    expect(screen.getByRole("link", { name: /Chancen & Förderung/ }).getAttribute("href")).toBe("/cockpit/chancen-radar");
  });

  it("Zusatz-Gruppe lässt sich zuklappen", () => {
    zeigen();
    expect(screen.queryByText("Partnerprogramm")).toBeTruthy();
    fireEvent.click(screen.getByText("Chancen & Mehr"));
    expect(screen.queryByText("Partnerprogramm")).toBeNull();
    fireEvent.click(screen.getByText("Chancen & Mehr"));
    expect(screen.queryByText("Partnerprogramm")).toBeTruthy();
  });

  it("Tool-Suche findet Tools über Titel und Beschreibung", () => {
    zeigen();
    fireEvent.change(screen.getByLabelText("Tool suchen"), { target: { value: "mahnung" } });
    expect(screen.getByText("Mahnungs-Generator")).toBeTruthy();
    fireEvent.change(screen.getByLabelText("Tool suchen"), { target: { value: "xyzunbekannt" } });
    expect(screen.getByText(/Kein Tool gefunden/)).toBeTruthy();
  });
});
