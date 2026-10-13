// Nach jedem Deploy sind die alten Chunk-Hashes weg. Ein offener Tab, der
// einen alten Chunk nachlaedt, bekommt vom SPA-Rewrite index.html zurueck
// und der Import scheitert. Einmal neu laden holt die aktuelle Version.
const RELOAD_KEY = "gx-chunk-reload-at";
const RELOAD_SPERRE_MS = 60_000;

export function istChunkFehler(err: unknown): boolean {
  const msg = String((err as { message?: string })?.message ?? err ?? "");
  return /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|ChunkLoadError|Loading chunk [\w-]+ failed|is not a valid JavaScript MIME type/i.test(
    msg,
  );
}

/** Laedt die Seite einmal neu; true, wenn ein Reload ausgeloest wurde. */
export function einmalNeuLaden(): boolean {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY) ?? 0);
    if (Date.now() - last < RELOAD_SPERRE_MS) return false;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    // Ohne sessionStorage kein Schutz gegen Reload-Schleifen -> nicht neu laden.
    return false;
  }
  window.location.reload();
  return true;
}

/** Faengt fehlgeschlagene Vite-Preloads ab (alte Chunks nach einem Deploy). */
export function installChunkReloadHandler() {
  if (typeof window === "undefined") return;
  window.addEventListener("vite:preloadError", (event) => {
    if (einmalNeuLaden()) event.preventDefault();
  });
}
