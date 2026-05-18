import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Fire-and-forget Tool-Funnel-Event-Tracking.
 *
 * Usage:
 *   const track = useTrackToolEvent("lucid-wizard");
 *   track("step_2_reached");
 *   track("cta_clicked", { which: "lucid_portal" });
 */
export const useTrackToolEvent = (tool: string) => {
  return useCallback(
    (event: string, metadata?: Record<string, unknown>) => {
      supabase.functions
        .invoke("track-tool-event", {
          body: { tool, event, metadata: metadata ?? {} },
        })
        .catch(() => {});
    },
    [tool],
  );
};
