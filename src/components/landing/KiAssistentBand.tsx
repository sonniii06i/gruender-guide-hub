import { Link } from "react-router-dom";
import { ArrowRight, Bot } from "lucide-react";

// Hinweis-Band unter dem Hero: GründerX als kostenloser MCP-Server in ChatGPT & Claude (/ki-assistent).
export function KiAssistentBand() {
  return (
    <div className="container max-w-6xl pt-10">
      <Link
        to="/ki-assistent"
        className="group flex flex-col gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-card transition-[border-color,box-shadow] hover:border-accent-blue/40 hover:shadow-soft sm:flex-row sm:items-center sm:gap-4"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-blue">
          <Bot className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="flex-1">
          <span className="block font-semibold text-foreground">
            Gründer-Events, Fristen und Startup-Guthaben direkt in ChatGPT und Claude
          </span>
          <span className="block text-sm text-muted-foreground">Neu und kostenlos, ohne GründerX-Konto.</span>
        </span>
        <span className="inline-flex items-center text-sm font-semibold text-accent-blue">
          So verbindest du es
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </div>
  );
}
