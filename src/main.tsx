import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { captureAffiliateRef } from "./utils/affiliate";

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
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
