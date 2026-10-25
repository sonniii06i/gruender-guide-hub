import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { captureAffiliateRef } from "./utils/affiliate";
import { ladeSupabase } from "./integrations/supabase/lazy";

// Affiliate-Reflink (?ref=CODE) frueh erfassen.
captureAffiliateRef();

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
if (rootEl.hasChildNodes()) {
  void ladeSupabase().finally(() => hydrateRoot(rootEl, app));
} else {
  createRoot(rootEl).render(app);
}
