import "@testing-library/jest-dom";

// jsdom implementiert scrollTo nicht — Stub, damit Auto-Scroll-Effekte nicht werfen
if (!Element.prototype.scrollTo) {
  Element.prototype.scrollTo = () => {};
}

Object.defineProperty(window, "matchMedia", {
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
