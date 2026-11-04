import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NewsletterOptin } from "./NewsletterOptin";

describe("NewsletterOptin", () => {
  // Mobil steht die Zeile untereinander (flex-col). Ein bares flex-1 setzt dort flex-basis 0 und schlägt h-10:
  // Das Mailfeld war auf dem Handy 19 px statt 40 px hoch (live gemessen 04.11.2026, 390 px Breite).
  it("lässt dem Mailfeld mobil seine Höhe", () => {
    const { container } = render(<NewsletterOptin quelle="test" />);
    const feld = container.querySelector('input[name="email"]');
    const klassen = (feld?.getAttribute("class") ?? "").split(/\s+/);
    expect(klassen).toContain("h-10");
    expect(klassen).toContain("sm:flex-1");
    expect(klassen).not.toContain("flex-1");
  });
});
