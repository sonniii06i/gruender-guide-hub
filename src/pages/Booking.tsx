import { useState, useEffect, useMemo, useRef } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Zap,
  Shield,
  Star,
  Video,
  ArrowRight,
  Sparkles,
  Download,
  CalendarPlus,
  Mail,
} from "lucide-react";

// === ICS-Builder für .ics-Download / Calendar-Invite ===
const buildIcsContent = (slotIso: string, topic: string, attendeeName: string, attendeeEmail: string) => {
  const start = new Date(slotIso);
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const uid = `${start.getTime()}-${attendeeEmail}@gruender-guide-hub`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Gruender-Guide-Hub//1on1//DE",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:1:1 Strategie-Call — ${topic}`,
    `DESCRIPTION:30 Min Strategie-Call zum Thema "${topic}". Google-Meet-Link kommt per Email am Termin-Tag.`,
    "LOCATION:Google Meet (Link per Email)",
    `ORGANIZER;CN=Gruender Guide Hub:mailto:hi@gruender-guide-hub.de`,
    `ATTENDEE;CN=${attendeeName};RSVP=TRUE:mailto:${attendeeEmail}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    "DESCRIPTION:1:1-Call in 30 Min",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
};

const downloadIcs = (slotIso: string, topic: string, name: string, email: string) => {
  const ics = buildIcsContent(slotIso, topic, name, email);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `gruender-call-${new Date(slotIso).toISOString().slice(0, 10)}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const googleCalendarUrl = (slotIso: string, topic: string) => {
  const start = new Date(slotIso);
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `1:1 Strategie-Call — ${topic}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: "30 Min Strategie-Call. Google-Meet-Link kommt per Email am Termin-Tag.",
    location: "Google Meet (Link per Email)",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

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

// Slot-Definition: Mo-Fr — 10:00, 11:00, 14:00, 15:00, 16:00 (Europe/Berlin)
const SLOT_HOURS = [10, 11, 14, 15, 16];

const formatDayLabel = (d: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(d);
  target.setHours(0, 0, 0, 0);
  const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Heute";
  if (diffDays === 1) return "Morgen";
  return d.toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "2-digit" });
};

const formatDayLabelSub = (d: Date) =>
  d.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" });

const formatHour = (h: number) => `${String(h).padStart(2, "0")}:00`;

const formatSlotIso = (date: Date, hour: number) => {
  const d = new Date(date);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
};

const isWeekend = (d: Date) => {
  const day = d.getDay();
  return day === 0 || day === 6;
};

// min 1h Puffer — vergangene + zu nahe Slots gesperrt
const isPastSlot = (iso: string) => new Date(iso).getTime() < Date.now() + 60 * 60 * 1000;

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
  const formRef = useRef<HTMLDivElement>(null);

  // Lade belegte Slots beim Mount
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const { data, error } = await (supabase as any).rpc("get_booked_slots");
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

  // Autofill Name + Email aus Account (profiles + auth)
  useEffect(() => {
    if (!user) return;
    setEmail((prev) => prev || user.email || "");

    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("first_name, last_name, phone")
        .eq("id", user.id)
        .maybeSingle();
      if (cancelled || !data) return;
      const fullName = [data.first_name, data.last_name].filter(Boolean).join(" ").trim();
      setName((prev) => prev || fullName);
      if (data.phone) setPhone((prev) => prev || data.phone);
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

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

  // Alle verfügbaren Slots flach (für Quick-Pick + Stats)
  const availableFlat = useMemo(() => {
    const arr: { iso: string; date: Date; hour: number }[] = [];
    days.forEach((d) => {
      SLOT_HOURS.forEach((h) => {
        const iso = formatSlotIso(d, h);
        if (!bookedSlots.has(iso) && !isPastSlot(iso)) {
          arr.push({ iso, date: d, hour: h });
        }
      });
    });
    return arr;
  }, [days, bookedSlots]);

  const totalSlotCount = days.length * SLOT_HOURS.length;
  const utilisation = totalSlotCount > 0 ? Math.round((1 - availableFlat.length / totalSlotCount) * 100) : 0;
  const nextThree = availableFlat.slice(0, 3);

  const handleSelectSlot = (iso: string) => {
    setSelectedSlot(iso);
    setError(null);
    // Smooth-Scroll zum Formular auf Mobile
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    if (!user) {
      setError("Bitte zuerst einloggen.");
      return;
    }
    setSubmitting(true);
    setError(null);

    const { data, error } = await (supabase as any)
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

    // Bestätigungs-Email + Admin-Notification triggern (fire-and-forget)
    // Failed silently — User sieht trotzdem Confirmation-Page; Cron retry-Logik
    // ist über confirmation_sent_at-Check vorhanden.
    supabase.functions
      .invoke("send-booking-confirmation", { body: { bookingId: data.id } })
      .catch((err) => console.error("send-booking-confirmation invoke failed", err));
  };

  if (success) {
    const slotDate = new Date(success.slot);
    const endDate = new Date(slotDate.getTime() + 30 * 60 * 1000);
    return (
      <CockpitShell
        eyebrow="1:1-Berater-Termin"
        title="Termin gebucht ✓"
        subtitle="Speicher dir den Termin direkt in den Kalender — Bestätigungs-Email folgt."
        showRelated={false}
      >
        <div className="max-w-2xl mx-auto">
          <div className="rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-6 md:p-8 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/15 mb-4">
                <CheckCircle2 className="h-9 w-9 text-emerald-700" />
              </div>
              <h3 className="font-bold text-2xl mb-2">Termin steht ✓</h3>
              <div className="text-base text-foreground mb-1 font-semibold">
                {slotDate.toLocaleString("de-DE", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                –{" "}
                {endDate.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} Uhr
              </div>
              <div className="text-sm text-muted-foreground mb-5">
                30 Min · Google Meet · Thema: <strong className="text-foreground">{topic}</strong>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full mb-5">
                <button
                  onClick={() => downloadIcs(success.slot, topic, name, email)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-blue text-primary-foreground px-4 py-3 text-sm font-bold hover:opacity-90 shadow-md transition-all"
                >
                  <Download className="h-4 w-4" /> .ics-Datei herunterladen
                </button>
                <a
                  href={googleCalendarUrl(success.slot, topic)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-accent-blue/30 bg-card px-4 py-3 text-sm font-bold hover:bg-accent-blue/5 transition-all"
                >
                  <CalendarPlus className="h-4 w-4" /> Google Calendar
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
              <div className="rounded-xl bg-white/70 border border-emerald-500/20 p-4">
                <div className="text-xs font-semibold text-emerald-700 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> Bestätigung
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  Email an <strong className="text-foreground break-all">{email}</strong> innerhalb 24h
                  mit Calendar-Invite + Meet-Link.
                </div>
              </div>
              <div className="rounded-xl bg-white/70 border border-emerald-500/20 p-4">
                <div className="text-xs font-semibold text-emerald-700 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                  <Video className="h-3.5 w-3.5" /> Am Termin-Tag
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  Google-Meet-Link kommt 1h vorher per Email. Kein Download nötig.
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white/70 border border-emerald-500/20 p-4 mb-5">
              <div className="text-xs font-semibold text-emerald-700 mb-2 uppercase tracking-wider">
                Was passiert jetzt
              </div>
              <ol className="text-sm space-y-1.5 text-muted-foreground">
                <li>1. Bestätigungs-Email mit Calendar-Invite (.ics) — innerhalb 24h</li>
                <li>2. Video-Call-Link (Google Meet) per Email — am Termin-Tag</li>
                <li>3. 30-Min-Call zum gewählten Termin</li>
                <li>4. Optional: Follow-up-Notes per Email nach dem Call</li>
              </ol>
            </div>

            <div className="text-xs text-muted-foreground mb-5 text-center">
              Booking-ID: <span className="font-mono">{success.bookingId.slice(0, 8)}</span> ·{" "}
              Stornierung bis 24h vorher kostenlos.
            </div>

            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:bg-secondary"
              >
                ← Zurück zum Dashboard
              </a>
              <button
                onClick={() => {
                  setSuccess(null);
                  setSelectedSlot(null);
                  setMessage("");
                }}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:bg-secondary"
              >
                Weiteren Termin buchen <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </CockpitShell>
    );
  }

  return (
    <CockpitShell eyebrow="1:1-Berater-Termin" title="Lass uns 30 Min reden" showRelated={false}>
      {/* === HERO mit Value-Props === */}
      <div className="relative rounded-3xl border border-accent-blue/20 bg-gradient-to-br from-accent-blue/5 via-card to-card p-6 md:p-8 mb-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-accent-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 text-emerald-700 px-3 py-1 text-[11px] font-bold uppercase tracking-wider mb-3">
              <Sparkles className="h-3 w-3" /> Kostenlos · 30 Min · Video-Call
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight mb-3">
              Konkrete Antworten zu deinem Setup —
              <br className="hidden md:block" /> ohne stundenlange Recherche.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              30-Minuten-Strategie-Call zu Rechtsform, Holding, US-LLC, Steuer-Setup, ECom-Brand oder
              EU-Alternativen. Ich höre dir zu, zeige dir den passenden Pfad und welche Tools im Hub
              genau dein Problem lösen.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { icon: Zap, label: "Konkrete Roadmap statt Theorie" },
                { icon: Shield, label: "9 Themen-Tracks zur Auswahl" },
                { icon: Video, label: "Google Meet — kein Download" },
                { icon: Star, label: "Follow-up-Notes auf Wunsch" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-1.5 text-muted-foreground">
                  <b.icon className="h-3.5 w-3.5 text-accent-blue shrink-0" />
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-card border border-border p-4 self-start">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
              Verfügbarkeit nächste 14 Werktage
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <div className="text-3xl font-bold">{availableFlat.length}</div>
              <div className="text-xs text-muted-foreground">freie Slots</div>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all"
                style={{ width: `${100 - utilisation}%` }}
              />
            </div>
            <div className="text-[10px] text-muted-foreground">
              {utilisation < 50 ? "Viele Slots frei" : utilisation < 80 ? "Bald voll" : "Fast ausgebucht"}
            </div>
          </div>
        </div>
      </div>

      {!user && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 mb-6 text-sm">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="flex-1">
              <strong>Bitte einloggen</strong>, um einen Termin zu buchen.{" "}
              <a href="/auth" className="text-accent-blue underline font-semibold">
                Zum Login →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* === QUICK-PICK: nächste 3 freie Slots === */}
      {!loadingSlots && nextThree.length > 0 && (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 mb-6">
          <div className="text-[10px] uppercase tracking-wider text-emerald-700 font-bold mb-3 flex items-center gap-1.5">
            <Zap className="h-3 w-3" /> Schnell-Auswahl — die 3 nächsten freien Slots
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {nextThree.map((s) => (
              <button
                key={s.iso}
                onClick={() => user && handleSelectSlot(s.iso)}
                disabled={!user}
                className={`group rounded-xl border-2 px-4 py-3 text-left transition-all ${
                  selectedSlot === s.iso
                    ? "border-accent-blue bg-accent-blue/5"
                    : "border-emerald-500/30 bg-white hover:border-emerald-500 hover:shadow-md"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="text-[10px] uppercase tracking-wider text-emerald-700 font-bold mb-0.5">
                  {formatDayLabel(s.date)}
                </div>
                <div className="text-base font-bold">{formatHour(s.hour)} Uhr</div>
                <div className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                  Slot wählen <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* === Slot-Grid === */}
      <div className="rounded-2xl border border-border bg-card p-4 md:p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm flex items-center gap-2">
            <Calendar className="h-4 w-4 text-accent-blue" /> Alle Slots im Überblick
          </h3>
          <div className="flex flex-wrap gap-2 text-[10px]">
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <span className="inline-block h-2.5 w-2.5 rounded-sm border border-border bg-card" /> frei
            </span>
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-accent-blue" /> ausgewählt
            </span>
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-secondary line-through" /> belegt
            </span>
          </div>
        </div>

        {loadingSlots ? (
          <div className="text-sm text-muted-foreground py-12 text-center flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> Lade Verfügbarkeit…
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {days.map((day) => {
              const dayLabel = formatDayLabel(day);
              const isToday = dayLabel === "Heute";
              const isTomorrow = dayLabel === "Morgen";
              const dayAvailable = SLOT_HOURS.filter((h) => {
                const iso = formatSlotIso(day, h);
                return !bookedSlots.has(iso) && !isPastSlot(iso);
              }).length;

              return (
                <div
                  key={day.toISOString()}
                  className={`rounded-xl border p-3 transition-colors ${
                    isToday
                      ? "border-emerald-500/40 bg-emerald-500/5"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div>
                      <div className={`text-sm font-bold ${isToday ? "text-emerald-700" : ""}`}>
                        {dayLabel}
                      </div>
                      <div className="text-[10px] text-muted-foreground capitalize">
                        {(isToday || isTomorrow) ? formatDayLabelSub(day) : ""}
                      </div>
                    </div>
                    <div
                      className={`text-[10px] font-semibold rounded-full px-2 py-0.5 ${
                        dayAvailable === 0
                          ? "bg-red-500/10 text-red-700"
                          : dayAvailable >= 4
                          ? "bg-emerald-500/10 text-emerald-700"
                          : "bg-amber-500/10 text-amber-700"
                      }`}
                    >
                      {dayAvailable === 0
                        ? "ausgebucht"
                        : dayAvailable >= 4
                        ? `${dayAvailable} frei`
                        : `noch ${dayAvailable} frei`}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5">
                    {SLOT_HOURS.map((h) => {
                      const iso = formatSlotIso(day, h);
                      const isBooked = bookedSlots.has(iso);
                      const isPast = isPastSlot(iso);
                      const isSelected = selectedSlot === iso;
                      const disabled = isBooked || isPast || !user;
                      return (
                        <button
                          key={h}
                          onClick={() => !disabled && handleSelectSlot(iso)}
                          disabled={disabled}
                          className={`h-10 rounded-md text-xs font-mono transition-all ${
                            isSelected
                              ? "bg-accent-blue text-primary-foreground font-bold ring-2 ring-accent-blue ring-offset-2 ring-offset-card scale-[1.04]"
                              : disabled
                              ? "bg-secondary/40 text-muted-foreground/50 cursor-not-allowed line-through"
                              : "border border-border bg-card hover:border-accent-blue hover:bg-accent-blue/5 hover:scale-[1.02] active:scale-[0.98]"
                          }`}
                          title={isBooked ? "Belegt" : isPast ? "Vergangenheit" : `${formatHour(h)} Uhr`}
                        >
                          {formatHour(h)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* === FORMULAR (sticky-ish nach Slot-Selection) === */}
      <div ref={formRef}>
        {selectedSlot ? (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border-2 border-accent-blue/30 bg-gradient-to-br from-accent-blue/5 to-card p-5 md:p-6 mb-6 shadow-md"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-accent-blue/10 shrink-0">
                <Clock className="h-5 w-5 text-accent-blue" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-accent-blue font-bold">
                  Schritt 2 von 2
                </div>
                <h3 className="font-bold text-base">Nur noch deine Daten — dann steht der Termin</h3>
                <div className="text-sm text-muted-foreground mt-0.5">
                  <strong className="text-foreground">
                    {new Date(selectedSlot).toLocaleString("de-DE", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    Uhr
                  </strong>{" "}
                  · 30 Min · Google Meet
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Vor- + Nachname *</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="z.B. Sonni Buttke"
                  className="h-10 text-sm mt-1"
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
                  className="h-10 text-sm mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Telefon (optional)</Label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+49 175 ..."
                  className="h-10 text-sm mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Worum geht's? *</Label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                  className="h-10 w-full rounded-md border border-input bg-background px-2 text-sm mt-1"
                >
                  {TOPICS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs">Kontext / aktuelle Frage (hilft fürs Vorbereiten — empfohlen!)</Label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="z.B. Plane GmbH+Holding-Setup für 3 Brands. Frage zu §22 UmwStG-Sperrfrist und IP-Verlagerung."
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                />
              </div>
            </div>

            {error && (
              <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-xs text-red-700">
                {error}
              </div>
            )}

            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 mt-5">
              <button
                type="button"
                onClick={() => setSelectedSlot(null)}
                className="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"
              >
                ← Anderen Slot wählen
              </button>
              <button
                type="submit"
                disabled={submitting || !user}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-blue text-primary-foreground px-6 py-3 text-sm font-bold hover:opacity-90 disabled:opacity-50 shadow-md hover:shadow-lg transition-all"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Wird gebucht…
                  </>
                ) : (
                  <>
                    Termin verbindlich buchen <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

            <div className="mt-3 text-[10px] text-muted-foreground flex flex-wrap gap-3 justify-center">
              <span className="inline-flex items-center gap-1">
                <Shield className="h-3 w-3" /> Kostenlos
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Stornierung bis 24h vorher
              </span>
              <span className="inline-flex items-center gap-1">
                <Star className="h-3 w-3" /> Bestätigungs-Email innerhalb 24h
              </span>
            </div>
          </form>
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground mb-6">
            <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
            Wähle oben einen freien Slot — dann fragen wir nur noch deinen Namen + Thema ab.
          </div>
        )}
      </div>

      {/* === FAQ / Trust === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          {
            q: "Was kostet der Call?",
            a: "Komplett kostenlos. Wenn weiterführende Beratung sinnvoll ist, vermittle ich passende StBs/RAs (transparent, keine versteckten Provisionen).",
          },
          {
            q: "Worauf bereiten wir uns vor?",
            a: "Beschreib dein Setup im Kontext-Feld — Rechtsform, Umsatz-Range, Brands, geplante Auslandskonstrukte. Dann ist der Call fokussiert.",
          },
          {
            q: "Stornierung möglich?",
            a: "Bis 24h vorher kostenlos via Email. Danach wenn möglich verschieben statt stornieren.",
          },
        ].map((f, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4 text-xs">
            <div className="font-semibold mb-1.5">{f.q}</div>
            <div className="text-muted-foreground leading-relaxed">{f.a}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-[11px] text-muted-foreground leading-relaxed">
        <strong>Disclaimer:</strong> Keine Steuer-/Rechtsberatung im Sinne des StBerG/RDG. Sondern
        strategische Orientierung mit Verweis auf passende Tools im Hub + ggf. Empfehlung qualifizierter
        StB/RA.
      </div>
    </CockpitShell>
  );
};

export default Booking;
