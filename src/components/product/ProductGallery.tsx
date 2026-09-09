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
export const ProductGallery = ({
  images,
  className,
  variant = "object",
}: {
  images: GalleryImage[];
  className?: string;
  /**
   * "object" — freigestellte Motive (Maskottchen): quadratischer Rahmen mit Rand.
   * "screenshot" — echte Oberflächen: 16:9, randlos, damit man etwas erkennt.
   *   Ein Screenshot in einem quadratischen Rahmen mit Innenabstand schrumpft
   *   auf Briefmarkengröße und verfehlt genau den Zweck, den er hat.
   */
  variant?: "object" | "screenshot";
}) => {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className={cn("space-y-3", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border",
          variant === "screenshot"
            ? "aspect-[1535/784] bg-card shadow-card"
            : "aspect-square bg-gradient-to-br from-muted/60 via-background to-muted/30",
        )}
      >
        <img
          src={current.src}
          alt={current.alt}
          className={cn("h-full w-full", variant === "screenshot" ? "object-cover object-top" : "object-contain p-6")}
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
                "shrink-0 overflow-hidden rounded-lg border bg-muted/40 transition-all",
                variant === "screenshot" ? "h-14 w-24" : "h-16 w-16",
                i === active
                  ? "border-accent-blue ring-2 ring-accent-blue/30"
                  : "border-border hover:border-accent-blue/50",
              )}
            >
              <img src={img.src} alt="" aria-hidden className={cn("h-full w-full", variant === "screenshot" ? "object-cover object-top" : "object-contain p-1.5")} loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
