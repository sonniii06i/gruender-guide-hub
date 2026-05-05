import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const useTrackPageview = () => {
  const loc = useLocation();
  useEffect(() => {
    if (loc.pathname.startsWith("/admin")) return;
    const params = new URLSearchParams(loc.search);
    supabase.functions.invoke("track-pageview", {
      body: {
        path: loc.pathname,
        referrer: typeof document !== "undefined" ? document.referrer || null : null,
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
      },
    }).catch(() => {});
  }, [loc.pathname, loc.search]);
};
