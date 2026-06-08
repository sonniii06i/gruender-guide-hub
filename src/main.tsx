import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

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
