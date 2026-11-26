import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { captureAffiliateRef } from "./utils/affiliate";
import { initIosApp } from "./lib/iosApp";
import { ladeSupabase } from "./integrations/supabase/lazy";

// Affiliate-Reflink (?ref=CODE) & native iOS-App-Huelle frueh erfassen.
captureAffiliateRef();
initIosApp();

const rootEl = document.getElementById("root")!;
const app = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// react-snap prerendert beim Build statisches HTML in #root. Ist bereits
// Inhalt da, hydrieren wir ihn (Googlebot/AI-Crawler sehen echten Body),
// sonst normaler Client-Mount (dev / nicht-prerenderte Routen).
// Den Supabase-Client (nicht mehr im Einstiegspaket, s. integrations/supabase/lazy.ts)
// vor dem Hydrieren laden: Das vorgerenderte HTML zeigt den aufgelösten Login-Zustand.
// Käme die Sitzung erst nach dem Hydrieren der Seite, passte das HTML nicht mehr
// (React #418/#422). Der Text steht da längst sichtbar im HTML – LCP unberührt.
function hasStoredAuthSession(): boolean {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && /^sb-[a-z0-9]+-auth-token$/i.test(k)) {
        const raw = localStorage.getItem(k);
        if (raw && raw.includes("access_token")) return true;
      }
    }
  } catch {
    /* ignore */
  }
  return false;
}

const prerenderPath = rootEl.getAttribute("data-prerender-path");
const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
const kannHydrieren =
  rootEl.hasChildNodes() &&
  !hasStoredAuthSession() &&
  (!prerenderPath || prerenderPath === currentPath);

if (kannHydrieren) {
  void ladeSupabase().finally(() => hydrateRoot(rootEl, app));
} else {
  if (rootEl.hasChildNodes()) rootEl.innerHTML = "";
  createRoot(rootEl).render(app);
}
