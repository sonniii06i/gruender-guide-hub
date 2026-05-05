import { Link } from "react-router-dom";
import logoSrc from "@/assets/logo.png";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  invert?: boolean;
  /** When true, do not wrap in a Link (e.g. when already inside a clickable). */
  asImage?: boolean;
}

export const Logo = ({ className, invert, asImage }: LogoProps) => {
  const img = (
    <img
      src={logoSrc}
      alt="GründerX – zur Startseite"
      className={cn("object-contain", invert && "invert brightness-0 contrast-100", className)}
      style={invert ? { filter: "brightness(0) invert(1)" } : undefined}
    />
  );
  if (asImage) return img;
  return (
    <Link to="/" aria-label="Zur Startseite" className="inline-flex items-center">
      {img}
    </Link>
  );
};

export default Logo;
