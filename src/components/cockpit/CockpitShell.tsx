import { ReactNode } from "react";
import RelatedTools from "./RelatedTools";

interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** Set false to suppress auto Related-Tools section. */
  showRelated?: boolean;
}

const CockpitShell = ({ eyebrow, title, subtitle, children, showRelated = true }: Props) => (
  <div className="container max-w-6xl py-8 px-4 md:px-6">
    <div className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-accent-blue mb-1">{eyebrow}</p>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-2 text-muted-foreground max-w-2xl text-sm">{subtitle}</p>}
    </div>
    {children}
    {showRelated && <RelatedTools />}
  </div>
);

export default CockpitShell;
