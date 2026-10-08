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
  it("gliedert nach Gründer-Reise und verlinkt Startup-Guthaben", () => {
    zeigen();
    for (const g of ["Lernen", "Werkzeuge", "Geld & Chancen", "Events & Netzwerk"]) expect(screen.getByText(g)).toBeTruthy();
    expect(screen.getByRole("link", { name: /Startup-Guthaben/ }).getAttribute("href")).toBe("/startup-guthaben");
  });

  it("Gruppen lassen sich zuklappen", () => {
    zeigen();
    expect(screen.queryByText("Förder-Datenbank")).toBeTruthy();
    fireEvent.click(screen.getByText("Geld & Chancen"));
    expect(screen.queryByText("Förder-Datenbank")).toBeNull();
    fireEvent.click(screen.getByText("Geld & Chancen"));
  });

  it("Tool-Suche findet Tools über Titel und Beschreibung", () => {
    zeigen();
    fireEvent.change(screen.getByLabelText("Tool suchen"), { target: { value: "mahnung" } });
    expect(screen.getByText("Mahnungs-Generator")).toBeTruthy();
    fireEvent.change(screen.getByLabelText("Tool suchen"), { target: { value: "xyzunbekannt" } });
    expect(screen.getByText(/Kein Tool gefunden/)).toBeTruthy();
  });
});
