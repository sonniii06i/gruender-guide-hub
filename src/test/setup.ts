import "@testing-library/jest-dom";

// Tests mit „@vitest-environment node“ (z. B. pdf.js in src/test/pdf-text.test.ts) haben kein DOM.
const mitDom = typeof window !== "undefined";

// jsdom implementiert scrollTo nicht — Stub, damit Auto-Scroll-Effekte nicht werfen
if (mitDom && !Element.prototype.scrollTo) {
  Element.prototype.scrollTo = () => {};
}

if (mitDom) Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
