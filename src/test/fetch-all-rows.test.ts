import { describe, expect, it } from "vitest";
import { fetchAllRows } from "@/lib/fetchAllRows";

const quelle = (n: number, serverMax = 1000) => async (from: number, to: number) => {
  const end = Math.min(to, from + serverMax - 1, n - 1);
  const data = end >= from ? Array.from({ length: end - from + 1 }, (_, i) => from + i) : [];
  return { data, error: null };
};

describe("fetchAllRows", () => {
  it("liest ueber die 1000er-Kappung von PostgREST hinaus alle Zeilen", async () => {
    const r = await fetchAllRows(quelle(2500));
    expect(r.rows).toHaveLength(2500);
    expect(r.truncated).toBe(false);
    expect(r.rows[2499]).toBe(2499);
  });

  it("endet bei genau einer vollen Seite mit einer leeren Folgeseite", async () => {
    const r = await fetchAllRows(quelle(1000));
    expect(r.rows).toHaveLength(1000);
    expect(r.truncated).toBe(false);
  });

  it("meldet truncated, wenn die Obergrenze erreicht ist", async () => {
    const r = await fetchAllRows(quelle(5000), { max: 2000 });
    expect(r.rows).toHaveLength(2000);
    expect(r.truncated).toBe(true);
  });

  it("gibt Fehler weiter statt still eine Teilmenge zu liefern", async () => {
    const r = await fetchAllRows(async () => ({ data: null, error: { message: "kaputt" } }));
    expect(r.error?.message).toBe("kaputt");
  });
});
