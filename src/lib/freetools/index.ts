import type { ToolConfig } from "./types";
import { businessplanConfig } from "./businessplan";
import { gruendungskostenConfig } from "./gruendungskosten";
import { rechtsformConfig } from "./rechtsform";
import { markenFreischaltungConfig } from "./marken-freischaltung";
import { transparencySeriennummerConfig } from "./transparency-seriennummer";

// Reihenfolge = Anzeige-Reihenfolge auf der Hub-Seite.
export const FREE_TOOLS: ToolConfig[] = [
  businessplanConfig,
  gruendungskostenConfig,
  rechtsformConfig,
  markenFreischaltungConfig,
  transparencySeriennummerConfig,
];

export const FREE_TOOL_BY_SLUG: Record<string, ToolConfig> = Object.fromEntries(
  FREE_TOOLS.map((t) => [t.slug, t])
);

export type { ToolConfig } from "./types";
