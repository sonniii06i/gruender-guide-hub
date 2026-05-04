import logoSrc from "@/assets/logo.png";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  invert?: boolean;
}

export const Logo = ({ className, invert }: LogoProps) => (
  <img
    src={logoSrc}
    alt="GründerX"
    className={cn("object-contain", invert && "invert brightness-0 contrast-100", className)}
    style={invert ? { filter: "brightness(0) invert(1)" } : undefined}
  />
);

export default Logo;
