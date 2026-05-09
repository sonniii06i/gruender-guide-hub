import { useState, useEffect, useMemo } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Calendar, Clock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const TOPICS = [
  "Rechtsform-Entscheidung (Einzel / UG / GmbH / Holding)",
  "Holding-Konstrukt aufsetzen",
  "US-LLC / HK-Limited Strategie",
  "Steuer-Setup (BWA, IAB, OSS, Reverse-Charge)",
  "Crypto-Steuer (FIFO, §23 EStG)",
  "ECom-Brand-Setup (Shopify / Amazon FBA)",
  "EU-Alternativen + Substanz-Strategie",
  "Marken + Domain + Compliance (CPNP, CE, LUCID)",
  "Sonstiges",
];

// Slot-Definition: Mo-Fr, 10:00 / 11:00 / 14:00 / 15:00 / 16:00 (Europe/Berlin)
const SLOT_HOURS = [10, 11, 14, 15, 16];

const formatDayLabel = (d: Date) =>
  d.toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "2-digit" });

const formatSlotIso = (date: Date, hour: number) => {
  const d = new Date(date);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
};

const isWeekend = (d: Date) => {
  const day = d.getDay();
  return day === 0 || day === 6;
};

const isPastSlot = (iso: string) => new Date(iso).getTime() < Date.now() + 60 * 60 * 1000; // min 1h Puffer

const Booking = () => {
  const { user } = useAuth();
  const [bookedSlots, setBookedSlots] = useState<Set<string>>(new Set());
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ slot: string; bookingId: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Lade belegte Slots beim Mount
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const { data, error } = await supabase.rpc("get_booked_slots");
        if (cancelled) return;
        if (error) {
          console.error("get_booked_slots", error);
          setError("Konnte belegte Slots nicht laden — versuch Refresh.");
        } else if (data) {
          setBookedSlots(new Set(data.map((r: { slot_iso: string }) => r.slot_iso)));
        }
      } finally {
        if (!cancelled) setLoadingSlots(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Liste der nächsten 14 Werktage
  const days = useMemo(() => {
    const arr: Date[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let d = new Date(today);
    while (arr.length < 14) {
      if (!isWeekend(d)) arr.push(new Date(d));
      d = new Date(d.getTime() + 24 * 60 * 60 * 1000);
    }
    return arr;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    if (!user) {
      setError("Bitte zuerst einloggen.");
      return;
    }
    setSubmitting(true);
    setError(null);

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        user_id: user.id,
        slot_iso: selectedSlot,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        topic,
        message: message.trim() || null,
        status: "pending",
      })
      .select("id")
      .single();

    setSubmitting(false);

    if (error) {
      if (error.code === "23505") {
        setError("Slot ist gerade belegt worden. Bitte anderen wählen.");
        setBookedSlots((prev) => new Set([...prev, selectedSlot]));
        setSelectedSlot(null);
      } else {
        setError(error.message || "Fehler beim Buchen — versuch's nochmal.");
      }
      return;
    }

    setSuccess({ slot: selectedSlot, bookingId: data.id });
    setBookedSlots((prev) => new Set([...prev, selectedSlot]));
  };

  if (success) {
    return (
      <CockpitShell
        eyebrow="1:1-Berater-Termin"
        title="Termin gebucht ✓"
        subtitle="Du erhältst innerhalb von 24h eine Bestätigungs-Email mit Calendar-Invite + Video-Link."
      >
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center max-w-md mx-auto">
          <CheckCircle2 className="h-12 w-12 text-emerald-700 mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-2">Buchung erfasst</h3>
          <div className="text-sm text-muted-foreground mb-4">
            <strong>{new Date(success.slot).toLocaleString("de-DE", { dateStyle: "full", timeStyle: "short" })}</strong>
            <br />
            Thema: {topic}
          </div>
          <div className="text-xs text-muted-foreground mb-4">
            Booking-ID: <span className="font-mono">{success.bookingId.slice(0, 8)}</span>
          </div>
          <button
            onClick={() => {
              setSuccess(null);
              setSelectedSlot(null);
              setName("");
              setMessage("");
            }}
            className="rounded-lg border border-border px-4 py-2 text-xs font-semibold hover:bg-secondary"
          >
            Weiteren Termin buchen
          </button>
        </div>
      </CockpitShell>
    );
  }

  return (
    <CockpitShell
      eyebrow="1:1-Berater-Termin"
      title="Buche einen 30-min-Call"
      subtitle="Themen: Rechtsform, Holding, US-LLC, Steuer, ECom-Brand-Setup, EU-Alt. Mo-Fr 10/11/14/15/16 Uhr. Slot wählen → Formular ausfüllen → Bestätigung kommt per Email."
    >
      {!user && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 mb-6 text-sm">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Bitte einloggen</strong>, um einen Termin zu buchen.{" "}
              <a href="/auth" className="text-accent-blue underline">Zum Login →</a>
            </div>
          </div>
        </div>
      )}

      {/* Slot-Grid */}
      <div className="rounded-2xl border border-border bg-card p-4 mb-6">
        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <Calendar className="h-4 w-4" /> Verfügbare Slots (nächste 14 Werktage, Europe/Berlin)
        </h3>

        {loadingSlots ? (
          <div className="text-sm text-muted-foreground py-8 text-center flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> Lade verfügbare Slots…
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {days.map((day) => (
              <div key={day.toISOString()} className="rounded-xl border border-border p-3">
                <div className="text-xs font-semibold mb-2">{formatDayLabel(day)}</div>
                <div className="grid grid-cols-5 gap-1.5">
                  {SLOT_HOURS.map((h) => {
                    const iso = formatSlotIso(day, h);
                    const isBooked = bookedSlots.has(iso);
                    const isPast = isPastSlot(iso);
                    const isSelected = selectedSlot === iso;
                    const disabled = isBooked || isPast || !user;
                    return (
                      <button
                        key={h}
                        onClick={() => !disabled && setSelectedSlot(iso)}
                        disabled={disabled}
                        className={`h-8 rounded-md text-xs font-mono transition-colors ${
                          isSelected
                            ? "bg-accent-blue text-primary-foreground font-bold"
                            : disabled
                            ? "bg-secondary/30 text-muted-foreground/50 cursor-not-allowed line-through"
                            : "border border-border bg-card hover:border-accent-blue hover:bg-accent-blue/5"
                        }`}
                        title={isBooked ? "Belegt" : isPast ? "Vergangenheit" : "Verfügbar"}
                      >
                        {String(h).padStart(2, "0")}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-[10px] text-muted-foreground mt-3 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-3 w-3 rounded border border-border bg-card" /> Verfügbar
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-3 w-3 rounded bg-accent-blue" /> Ausgewählt
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-3 w-3 rounded bg-secondary/30" /> Belegt / Vergangenheit
          </span>
        </div>
      </div>

      {/* Formular */}
      {selectedSlot && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-4 mb-6">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Buchungs-Daten — {new Date(selectedSlot).toLocaleString("de-DE", { dateStyle: "full", timeStyle: "short" })}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Vor- + Nachname *</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="z.B. Sonni Buttke"
                className="h-9 text-sm mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Email *</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="dein@email.de"
                className="h-9 text-sm mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Telefon (optional)</Label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+49 175 ..."
                className="h-9 text-sm mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Thema *</Label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm mt-1"
              >
                {TOPICS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <Label className="text-xs">Kontext / Frage (optional, hilft fürs Vorbereiten)</Label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="z.B. Plane GmbH+Holding-Setup für 3 Brands, Frage zu §22 UmwStG-Sperrfrist und IP-Verlagerung."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
              />
            </div>
          </div>

          {error && (
            <div className="mt-3 rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-xs text-red-700">
              {error}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-4">
            <button
              type="submit"
              disabled={submitting || !user}
              className="inline-flex items-center gap-2 rounded-lg bg-accent-blue text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 disabled:opacity-50"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Termin verbindlich buchen
            </button>
            <button
              type="button"
              onClick={() => setSelectedSlot(null)}
              className="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"
            >
              Anderen Slot wählen
            </button>
          </div>
        </form>
      )}

      {/* Hinweise */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="font-semibold mb-2">So läuft's:</div>
        <ol className="list-decimal pl-4 space-y-1 text-muted-foreground">
          <li>Slot wählen + Formular ausfüllen → Buchung wird sofort erfasst.</li>
          <li>Innerhalb 24h kommt Bestätigungs-Email mit Calendar-Invite (.ics) + Video-Link (Google Meet / Zoom).</li>
          <li>30-Minuten-Call zum gewählten Termin.</li>
          <li>Stornierung bis 24h vorher kostenlos via Email.</li>
        </ol>
        <div className="mt-3 text-muted-foreground">
          <strong>Disclaimer:</strong> Keine Steuer-/Rechtsberatung im Sinne des StBerG/RDG. Sondern strategische
          Orientierung mit Verweis auf passende Tools + ggf. Empfehlung qualifizierter StB/RA.
        </div>
      </div>
    </CockpitShell>
  );
};

export default Booking;
