import { useState } from "react";
import { cn } from "@/lib/utils";

export type GalleryImage = {
  src: string;
  /** Alt-Text — beschreibt, was das Bild zeigt, nicht "Produktbild 1". */
  alt: string;
  /** Bildunterschrift unter dem Hauptbild, wie im Katalog. */
  caption?: string;
};

/**
 * Bildgalerie im Shop-Stil: großes Hauptbild, Thumbnail-Leiste darunter.
 *
 * Bewusst ohne Zoom-Lupe — die Mascot-Renderings haben keine Auflösung, in der
 * sich Hineinzoomen lohnen würde, und eine Lupe, die nichts vergrößert, wirkt
 * wie ein kaputtes Feature.
 */
export const ProductGallery = ({ images, className }: { images: GalleryImage[]; className?: string }) => {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className={cn("space-y-3", className)}>
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-muted/60 via-background to-muted/30">
        <img
          src={current.src}
          alt={current.alt}
          className="h-full w-full object-contain p-6"
          loading="eager"
          decoding="async"
        />
      </div>

      {current.caption && (
        <p className="text-center text-xs text-muted-foreground">{current.caption}</p>
      )}

      {images.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={img.alt}
              aria-current={i === active}
              className={cn(
                "h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-muted/40 transition-all",
                i === active
                  ? "border-accent-blue ring-2 ring-accent-blue/30"
                  : "border-border hover:border-accent-blue/50",
              )}
            >
              <img src={img.src} alt="" aria-hidden className="h-full w-full object-contain p-1.5" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
