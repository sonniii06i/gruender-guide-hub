import { Link } from "react-router-dom";
import { ArrowRight, Bot } from "lucide-react";

// Hinweis-Band unter dem Hero: GründerX als kostenloser MCP-Server in ChatGPT & Claude (/ki-assistent).
export function KiAssistentBand() {
  return (
    <div className="px-4 sm:px-6">
      <Link
        to="/ki-assistent"
        className="mx-auto -mt-2 mb-6 flex max-w-4xl flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl border border-border bg-card px-5 py-3.5 text-center shadow-sm transition hover:border-primary/40 hover:shadow-md"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
          <Bot className="h-3.5 w-3.5" /> Neu · kostenlos
        </span>
        <span className="font-semibold text-foreground">Gründer-Events, Fristen und Startup-Guthaben direkt in ChatGPT und Claude</span>
        <span className="inline-flex items-center font-semibold text-primary">
          So verbindest du es <ArrowRight className="ml-1 h-4 w-4" />
        </span>
      </Link>
    </div>
  );
}
