import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/integrations/supabase/client", () => ({ supabase: { auth: { resend: vi.fn() } } }));

import { AuthLinkFehler } from "@/components/AuthLinkFehler";

const mitHash = (hash: string) => window.history.replaceState(null, "", `/${hash}`);

describe("AuthLinkFehler", () => {
  afterEach(() => mitHash(""));

  it("erklärt einen abgelaufenen Link", () => {
    mitHash("#error=access_denied&error_code=otp_expired");
    render(<AuthLinkFehler />);
    expect(screen.getByRole("alert").textContent).toContain("abgelaufen oder wurde schon benutzt");
  });

  // Der Banner steht außerhalb der AppErrorBoundary: ein Fehler hier wäre eine weiße Seite.
  it.each(["constructor", "__proto__", "toString"])("übersteht den Code %s aus der URL", (code) => {
    mitHash(`#error_code=${code}`);
    render(<AuthLinkFehler />);
    expect(screen.getByRole("alert").textContent).toContain("ungültig oder abgelaufen");
  });
});
