interface MascotProps {
  /** Dateiname ohne Endung, z. B. "felix-wave" (liegt in /public/mascots/) */
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

/**
 * Rendert ein Felix-Motiv aus /public/mascots/ mit @2x-srcset.
 * Alle Motive sind WebP; die Cutouts haben echten Alpha-Kanal.
 *
 * Bewusst ohne Float-Animation: die schwebenden Maskottchen haben auf der
 * Landing unruhig gewirkt. Nicht wieder einbauen.
 */
export const Mascot = ({
  name,
  alt,
  className = "",
  priority = false,
}: MascotProps) => (
  <img
    src={`/mascots/${name}.webp`}
    srcSet={`/mascots/${name}.webp 1x, /mascots/${name}@2x.webp 2x`}
    alt={alt}
    loading={priority ? "eager" : "lazy"}
    fetchPriority={priority ? "high" : undefined}
    decoding="async"
    className={`object-contain drop-shadow-xl ${className}`}
  />
);
