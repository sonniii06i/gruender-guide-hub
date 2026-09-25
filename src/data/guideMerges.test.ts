import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { GUIDE_MERGED_INTO } from "./guideMerges";
import { findGuideLanding } from "./guides";

const vercel = JSON.parse(readFileSync(resolve(__dirname, "../../vercel.json"), "utf8")) as {
  redirects: { source: string; destination: string; statusCode?: number; permanent?: boolean }[];
};

describe("zusammengelegte Guides", () => {
  for (const [guide, ziel] of Object.entries(GUIDE_MERGED_INTO)) {
    it(`/guides/${guide} leitet per 301 auf /ratgeber/${ziel}`, () => {
      expect(findGuideLanding(guide)).toBeDefined();
      for (const source of [`/guides/${guide}`, `/guides/${guide}/`]) {
        const r = vercel.redirects.find((x) => x.source === source);
        expect(r?.destination).toBe(`/ratgeber/${ziel}`);
        expect(r?.statusCode).toBe(301);
      }
    });
  }
});
