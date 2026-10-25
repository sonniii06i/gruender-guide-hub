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
// Intrinsische Maße der 1x-Dateien (public/mascots), damit der Browser Platz reserviert (CLS).
const MASSE: Record<string, [number, number]> = {
  "bundle-duo": [1016, 589],
  "felix-34-t": [330, 407],
  "felix-boxes": [590, 840],
  "felix-hero-desk": [1376, 768],
  "felix-paperstack": [780, 903],
  "felix-present": [513, 634],
  "felix-pricecard": [829, 851],
  "felix-roadmap": [372, 422],
  "felix-wave": [712, 838],
};

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
    width={MASSE[name]?.[0]}
    height={MASSE[name]?.[1]}
    loading={priority ? "eager" : "lazy"}
    // React 18 kennt fetchPriority nicht (Konsolenwarnung), das HTML-Attribut
    // deshalb klein durchreichen.
    {...(priority ? { fetchpriority: "high" } : {})}
    decoding="async"
    className={`object-contain drop-shadow-xl ${className}`}
  />
);
