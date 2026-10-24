import { beforeEach, describe, expect, it, vi } from "vitest";
import { vorlagenInhaltCacheLeeren, vorlagenInhaltLesen } from "./inhaltLaden";

const inhalt = { text: "Vertrag", ratgeber: [] };

describe("vorlagenInhaltLesen", () => {
  beforeEach(() => vorlagenInhaltCacheLeeren());

  it("wirft beim ersten Lesen ein Promise und liefert danach den Inhalt", async () => {
    const laden = vi.fn(() => Promise.resolve({ default: inhalt }));
    const v = { slug: "a", inhalt: laden };
    let geworfen: unknown;
    try {
      vorlagenInhaltLesen(v);
    } catch (p) {
      geworfen = p;
    }
    expect(geworfen).toBeInstanceOf(Promise);
    await geworfen;
    expect(vorlagenInhaltLesen(v)).toBe(inhalt);
    expect(laden).toHaveBeenCalledTimes(1);
  });

  it("wirft den Ladefehler und versucht es beim nächsten Mal neu", async () => {
    const laden = vi
      .fn()
      .mockReturnValueOnce(Promise.reject(new Error("netz")))
      .mockReturnValueOnce(Promise.resolve({ default: inhalt }));
    const v = { slug: "b", inhalt: laden };
    try {
      vorlagenInhaltLesen(v);
    } catch (p) {
      await p;
    }
    expect(() => vorlagenInhaltLesen(v)).toThrow("netz");
    try {
      vorlagenInhaltLesen(v);
    } catch (p) {
      await p;
    }
    expect(vorlagenInhaltLesen(v)).toBe(inhalt);
  });
});
