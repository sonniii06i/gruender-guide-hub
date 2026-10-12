import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Save, Video, Mail, AlertCircle, RefreshCw, CalendarX } from "lucide-react";
import { EmptyState, ToneBadge } from "@/components/cockpit/kit";
import { toast } from "sonner";

interface BookingAdminRow {
  id: string;
  user_id: string | null;
  slot_iso: string;
  name: string;
  email: string;
  phone: string | null;
  topic: string;
  message: string | null;
  status: string;
  meet_link: string | null;
  confirmation_sent_at: string | null;
  reminder_24h_sent_at: string | null;
  reminder_15min_sent_at: string | null;
  created_at: string;
}

const formatSlot = (iso: string) =>
  new Date(iso).toLocaleString("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Berlin",
  });

const hoursUntil = (iso: string) => Math.round((new Date(iso).getTime() - Date.now()) / (1000 * 60 * 60));

export const BookingsAdmin = () => {
  const [rows, setRows] = useState<BookingAdminRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings" as any)
      .select("*")
      .order("slot_iso", { ascending: true });
    setLoading(false);
    if (error) {
      toast.error(`Bookings laden: ${error.message}`);
      return;
    }
    setRows((data ?? []) as unknown as BookingAdminRow[]);
  };

  useEffect(() => {
    load();
  }, []);

  const saveMeetLink = async (id: string) => {
    const link = drafts[id]?.trim();
    if (!link) return;
    setSaving(id);
    const { error } = await supabase.rpc("set_booking_meet_link" as any, {
      p_booking_id: id,
      p_meet_link: link,
    });
    setSaving(null);
    if (error) {
      toast.error(`Speichern fehlgeschlagen: ${error.message}`);
      return;
    }
    toast.success("Meet-Link gespeichert");
    setDrafts((p) => ({ ...p, [id]: "" }));
    await load();
  };

  const upcoming = rows.filter((r) => new Date(r.slot_iso).getTime() > Date.now() && r.status !== "cancelled");
  const past = rows.filter((r) => new Date(r.slot_iso).getTime() <= Date.now() || r.status === "cancelled");

  if (loading) {
    return (
      <div className="space-y-3" aria-busy="true" aria-label="Bookings werden geladen…">
        {[0, 1].map((i) => (
          <div key={i} className="h-28 animate-pulse rounded-2xl border border-border bg-secondary/50" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">1:1-Bookings</h2>
          <p className="text-sm text-muted-foreground">
            Anstehend: <strong className="font-semibold text-foreground tabular">{upcoming.length}</strong> · Insgesamt: <span className="tabular">{rows.length}</span>
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={load}>
          <RefreshCw className="mr-1.5 h-4 w-4" /> Aktualisieren
        </Button>
      </div>

      {upcoming.length === 0 && (
        <EmptyState
          icon={CalendarX}
          title="Keine kommenden Bookings"
          description="Neue Termine aus /booking erscheinen hier automatisch."
        />
      )}

      {upcoming.map((b) => {
        const hUntil = hoursUntil(b.slot_iso);
        const isImminent = hUntil <= 24;
        const linkMissing = !b.meet_link?.trim();
        const draft = drafts[b.id] ?? "";
        return (
          <div
            key={b.id}
            className={`rounded-2xl border p-4 md:p-5 transition-colors ${
              linkMissing && isImminent
                ? "border-danger/30 bg-danger-soft"
                : isImminent
                ? "border-warning/30 bg-warning-soft"
                : "border-border bg-card shadow-card"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <strong className="text-base font-semibold">{b.name}</strong>
                  <a href={`mailto:${b.email}`} className="text-sm text-accent-blue hover:underline">
                    {b.email}
                  </a>
                  {b.phone && <span className="text-sm text-muted-foreground">· {b.phone}</span>}
                </div>
                <div className="text-sm font-semibold tabular">{formatSlot(b.slot_iso)} Uhr</div>
                <div className="text-xs text-muted-foreground tabular">
                  in {hUntil >= 0 ? `${hUntil}h` : "(vergangen)"} · 30 Min · {b.topic}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 shrink-0">
                <ToneBadge tone={b.status === "confirmed" ? "success" : "neutral"}>{b.status}</ToneBadge>
                {b.confirmation_sent_at && (
                  <ToneBadge tone="success">
                    <Mail className="h-3 w-3" aria-hidden="true" /> Bestätigt
                  </ToneBadge>
                )}
                {b.reminder_24h_sent_at && (
                  <ToneBadge tone="info">Erinnerung 24 h</ToneBadge>
                )}
                {b.reminder_15min_sent_at && (
                  <ToneBadge tone="accent">Erinnerung 15 min</ToneBadge>
                )}
              </div>
            </div>

            {b.message && (
              <div className="mb-3 whitespace-pre-wrap rounded-xl border border-border bg-card/70 p-3 text-sm">
                <div className="mb-1 text-xs font-medium text-muted-foreground">
                  Kontext
                </div>
                {b.message}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Video className="h-4 w-4 text-accent-blue" />
                <strong className="text-sm font-semibold">Google-Meet-Link</strong>
                {linkMissing && isImminent && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-danger">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" /> Dringend setzen
                  </span>
                )}
              </div>
              {b.meet_link ? (
                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={b.meet_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent-blue hover:underline break-all flex-1 min-w-0"
                  >
                    {b.meet_link}
                  </a>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDrafts((p) => ({ ...p, [b.id]: b.meet_link ?? "" }))}
                  >
                    Ändern
                  </Button>
                </div>
              ) : null}
              {(drafts[b.id] !== undefined || !b.meet_link) && (
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  <Input
                    type="url"
                    placeholder="https://meet.google.com/abc-defg-hij"
                    value={draft}
                    onChange={(e) => setDrafts((p) => ({ ...p, [b.id]: e.target.value }))}
                    className="text-sm"
                  />
                  <Button
                    size="sm"
                    onClick={() => saveMeetLink(b.id)}
                    disabled={!draft.trim() || saving === b.id}
                  >
                    {saving === b.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-1" /> Speichern
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {past.length > 0 && (
        <details className="rounded-2xl border border-border bg-card p-4 shadow-card">
          <summary className="cursor-pointer text-sm font-semibold">
            Vergangen oder storniert (<span className="tabular">{past.length}</span>)
          </summary>
          <div className="mt-3 space-y-2">
            {past.map((b) => (
              <div key={b.id} className="text-xs flex flex-wrap items-center gap-2 py-1.5 border-b border-border/40 last:border-0">
                <ToneBadge tone="neutral">{b.status}</ToneBadge>
                <span className="tabular">{formatSlot(b.slot_iso)}</span>
                <span className="text-muted-foreground">·</span>
                <span>{b.name}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">{b.topic}</span>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
};
