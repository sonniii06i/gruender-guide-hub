import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { EINWILLIGUNG_TEXT, EINWILLIGUNG_VERSION, TIPPS_TOOLS } from "@/lib/freetools/tipps";

// Browser und Function müssen denselben Einwilligungstext samt Version kennen,
// sonst lehnt tipps-anfordern ab (409) oder der Nachweis passt nicht zum Text.
const fn = readFileSync(resolve(__dirname, "../../supabase/functions/_shared/tippsStrecke.ts"), "utf8");

describe("Tipps-Einwilligung", () => {
  it("Version und Text gleich in Browser und Function", () => {
    expect(fn).toContain(`EINWILLIGUNG_VERSION = "${EINWILLIGUNG_VERSION}"`);
    const imFn = fn.match(/EINWILLIGUNG_TEXT =\s*\n?\s*("[^;]+);/)?.[1].replace(/"\s*\+\s*"/g, "").replace(/^"|"$/g, "");
    expect(imFn).toBe(EINWILLIGUNG_TEXT);
  });
  it("Tool-Liste gleich in Browser und Function", () => {
    const block = fn.slice(fn.indexOf("TOOL_STRECKE"), fn.indexOf("};", fn.indexOf("TOOL_STRECKE")));
    const slugs = [...block.matchAll(/^\s*"([a-z0-9-]+)":/gm)].map((m) => m[1]);
    expect(new Set(slugs)).toEqual(TIPPS_TOOLS);
  });
  it("Häkchen ist nicht vorausgewählt", () => {
    const gate = readFileSync(resolve(__dirname, "../components/freetools/EmailGateDialog.tsx"), "utf8");
    expect(gate).toContain("useState(false);\n  const tippsMoeglich = TIPPS_AKTIV && TIPPS_TOOLS.has(slug);");
  });
});
