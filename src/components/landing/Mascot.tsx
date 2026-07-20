interface MascotProps {
  /** Dateiname ohne Endung, z. B. "felix-wave" (liegt in /public/mascots/) */
  name: string;
  alt: string;
  className?: string;
  /** Versetzt die Float-Animation, damit nicht alle Felixe synchron schweben */
  delay?: string;
  /** Schweben abschalten (z. B. wenn das Bild eine ganze Szene zeigt) */
  floaty?: boolean;
  priority?: boolean;
}

/**
 * Rendert ein Felix-Motiv aus /public/mascots/ mit @2x-srcset.
 * Alle Motive sind WebP; die Cutouts haben echten Alpha-Kanal.
 */
export const Mascot = ({
  name,
  alt,
  className = "",
  delay,
  floaty = true,
  priority = false,
}: MascotProps) => (
  <img
    src={`/mascots/${name}.webp`}
    srcSet={`/mascots/${name}.webp 1x, /mascots/${name}@2x.webp 2x`}
    alt={alt}
    loading={priority ? "eager" : "lazy"}
    fetchPriority={priority ? "high" : undefined}
    decoding="async"
    className={`object-contain drop-shadow-xl ${floaty ? "animate-floaty" : ""} ${className}`}
    style={delay ? { animationDelay: delay } : undefined}
  />
);
