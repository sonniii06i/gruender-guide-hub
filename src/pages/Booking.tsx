import { useState, useEffect, useMemo, useRef } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Callout,
  EmptyState,
  Field,
  ResultPanel,
  ToneBadge,
  ToolLayout,
  ToolSection,
  selectCls,
} from "@/components/cockpit/kit";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Loader2,
  Zap,
  Shield,
  Star,
  Video,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  ListChecks,
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
        email: (user.email || email).trim(),
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
        title="Termin gebucht"
        subtitle="Speicher dir den Termin direkt im Kalender. Die Bestätigungs-E-Mail folgt."
        showRelated={false}
      >
        <div className="mx-auto max-w-2xl space-y-6">
          <section className="relative overflow-hidden rounded-2xl border border-success/25 bg-card p-6 shadow-soft md:p-8">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-green to-accent-blue" aria-hidden="true" />
            <div className="flex flex-col items-center text-center">
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-success-soft text-success">
                <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
              </span>
              <h2 className="text-xl font-semibold tracking-tight">Dein Termin steht</h2>
              <p className="mt-2 text-base font-medium tabular">
                {slotDate.toLocaleString("de-DE", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                bis {endDate.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} Uhr
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                30 Min · Google Meet · Thema: <span className="font-medium text-foreground">{topic}</span>
              </p>

              <div className="mt-6 grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                <Button size="lg" className="rounded-xl" onClick={() => downloadIcs(success.slot, topic, name, email)}>
                  <Download /> .ics-Datei herunterladen
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-xl">
                  <a href={googleCalendarUrl(success.slot, topic)} target="_blank" rel="noopener noreferrer">
                    <CalendarPlus /> In Google Calendar
                  </a>
                </Button>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <Mail className="h-4 w-4 text-accent-blue" aria-hidden="true" /> Bestätigung
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                E-Mail an <span className="break-all font-medium text-foreground">{email}</span> innerhalb von 24 h, mit
                Kalendereinladung und Meet-Link.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <Video className="h-4 w-4 text-accent-blue" aria-hidden="true" /> Am Termin-Tag
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Der Google-Meet-Link kommt 1 h vorher per E-Mail. Kein Download nötig.
              </p>
            </div>
          </div>

          <ToolSection title="Was jetzt passiert" icon={ListChecks}>
            <ol className="space-y-3">
              {[
                "Bestätigungs-E-Mail mit Kalendereinladung (.ics), innerhalb von 24 h",
                "Video-Call-Link (Google Meet) per E-Mail, am Termin-Tag",
                "30-Minuten-Call zum gewählten Termin",
                "Optional: Follow-up-Notizen per E-Mail nach dem Call",
              ].map((s, i) => (
                <li key={s} className="flex gap-3 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-blue tabular">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-foreground/85">{s}</span>
                </li>
              ))}
            </ol>
          </ToolSection>

          <p className="text-center text-xs text-muted-foreground">
            Buchungs-ID: <span className="font-mono">{success.bookingId.slice(0, 8)}</span> · Stornierung bis 24 h vorher
            kostenlos.
          </p>

          <div className="flex flex-col justify-center gap-2 sm:flex-row">
            <Button asChild variant="outline">
              <a href="/dashboard">
                <ArrowLeft /> Zurück zum Dashboard
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSuccess(null);
                setSelectedSlot(null);
                setMessage("");
              }}
            >
              Weiteren Termin buchen <ArrowRight />
            </Button>
          </div>
        </div>
      </CockpitShell>
    );
  }

  const auslastungText = utilisation < 50 ? "Viele Slots frei" : utilisation < 80 ? "Bald voll" : "Fast ausgebucht";

  return (
    <CockpitShell
      eyebrow="1:1-Berater-Termin"
      title="Lass uns 30 Min reden"
      subtitle="Kostenloser Strategie-Call zu Rechtsform, Holding, US-LLC, Steuer-Setup, E-Com-Brand oder EU-Alternativen. Ich höre dir zu, zeige dir den passenden Pfad und welche Tools im Hub dein Problem lösen."
      showRelated={false}
    >
      {!user && (
        <Callout tone="warning" title="Bitte einloggen, um einen Termin zu buchen." className="mb-6">
          Die Slots siehst du auch ohne Konto.{" "}
          <a href="/auth" className="font-medium text-accent-blue underline underline-offset-4">
            Zum Login
          </a>
        </Callout>
      )}

      <ToolLayout
        className="mb-8"
        inputs={
          <>
            {/* === QUICK-PICK: nächste 3 freie Slots === */}
            {!loadingSlots && nextThree.length > 0 && (
              <ToolSection title="Schnellauswahl" description="Die drei nächsten freien Slots" icon={Zap}>
                <div className="grid grid-cols-3 gap-2">
                  {nextThree.map((s) => {
                    const active = selectedSlot === s.iso;
                    return (
                      <button
                        key={s.iso}
                        type="button"
                        onClick={() => user && handleSelectSlot(s.iso)}
                        disabled={!user}
                        aria-pressed={active}
                        className={cn(
                          "group min-w-0 rounded-xl border px-3 py-2.5 text-left sm:px-4 sm:py-3 transition-[border-color,background-color,box-shadow] duration-200 disabled:cursor-not-allowed disabled:opacity-50",
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-card hover:border-accent-blue/50 hover:shadow-card",
                        )}
                      >
                        <span className={cn("block text-xs font-medium", active ? "text-primary-foreground/75" : "text-accent-blue")}>
                          {formatDayLabel(s.date)}
                        </span>
                        <span className="mt-0.5 block text-base font-semibold tabular sm:text-lg">
                          {formatHour(s.hour)}<span className="hidden sm:inline"> Uhr</span>
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 hidden items-center gap-1 text-xs sm:flex",
                            active ? "text-primary-foreground/75" : "text-muted-foreground",
                          )}
                        >
                          {active ? "Ausgewählt" : "Slot wählen"}
                          {!active && <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </ToolSection>
            )}

            {/* === Slot-Grid === */}
            <ToolSection
              title="Alle Slots im Überblick"
              description="Mo bis Fr, 10 bis 16 Uhr, mindestens 1 h Vorlauf"
              icon={Calendar}
              actions={
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-sm border border-border bg-card" /> frei
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-sm bg-primary" /> ausgewählt
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-sm bg-secondary" /> belegt
                  </span>
                </div>
              }
            >
              {loadingSlots ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" aria-busy="true">
                  <span className="sr-only">Lade Verfügbarkeit…</span>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-32 animate-pulse rounded-xl bg-secondary/70" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                        className={cn(
                          "rounded-xl border p-3",
                          isToday ? "border-accent-blue/25 bg-accent" : "border-border bg-card",
                        )}
                      >
                        <div className="mb-2.5 flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold">{dayLabel}</p>
                            {(isToday || isTomorrow) && (
                              <p className="text-xs text-muted-foreground">{formatDayLabelSub(day)}</p>
                            )}
                          </div>
                          <ToneBadge tone={dayAvailable === 0 ? "danger" : dayAvailable >= 4 ? "success" : "warning"}>
                            {dayAvailable === 0
                              ? "ausgebucht"
                              : dayAvailable >= 4
                              ? `${dayAvailable} frei`
                              : `noch ${dayAvailable} frei`}
                          </ToneBadge>
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
                                type="button"
                                onClick={() => !disabled && handleSelectSlot(iso)}
                                disabled={disabled}
                                aria-pressed={isSelected}
                                className={cn(
                                  "h-9 rounded-lg text-xs font-medium tabular transition-[background-color,border-color,color] duration-200",
                                  isSelected
                                    ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-card"
                                    : disabled
                                    ? "cursor-not-allowed bg-secondary/60 text-muted-foreground/60 line-through"
                                    : "border border-border bg-card hover:border-accent-blue hover:bg-accent active:translate-y-px",
                                )}
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
            </ToolSection>
          </>
        }
        result={
          <>
            <ResultPanel
              variant="ink"
              kicker="Kostenlos · 30 Min · Video-Call"
              title="Freie Slots, nächste 14 Werktage"
              value={loadingSlots ? "…" : availableFlat.length}
              valueHint={loadingSlots ? "Lade Verfügbarkeit…" : auslastungText}
            >
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-brand-green transition-[width] duration-500"
                  style={{ width: `${loadingSlots ? 0 : 100 - utilisation}%` }}
                />
              </div>
              <ul className="mt-5 grid grid-cols-1 gap-2.5 text-sm sm:grid-cols-2 lg:grid-cols-1">
                {[
                  { icon: Zap, label: "Konkrete Roadmap statt Theorie" },
                  { icon: Shield, label: "9 Themen-Tracks zur Auswahl" },
                  { icon: Video, label: "Google Meet, kein Download" },
                  { icon: Star, label: "Follow-up-Notizen auf Wunsch" },
                ].map((b) => (
                  <li key={b.label} className="flex items-center gap-2">
                    <b.icon className="h-4 w-4 shrink-0 text-brand-green-glow" aria-hidden="true" />
                    <span>{b.label}</span>
                  </li>
                ))}
              </ul>
            </ResultPanel>

            {/* === FORMULAR nach Slot-Auswahl === */}
            <div ref={formRef} className="scroll-mt-24">
              {selectedSlot ? (
                <form onSubmit={handleSubmit}>
                <ToolSection
                  title="Schritt 2 von 2: deine Daten"
                  description={
                    <>
                      <span className="font-medium text-foreground">
                        {new Date(selectedSlot).toLocaleString("de-DE", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        Uhr
                      </span>{" "}
                      · 30 Min · Google Meet
                    </>
                  }
                  icon={Clock}
                  className="border-accent-blue/30"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <Field label="Vor- und Nachname" htmlFor="bk-name">
                      <Input
                        id="bk-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="z. B. Sonni Buttke"
                      />
                    </Field>
                    <Field label="E-Mail" hint="Kommt aus deinem Konto" htmlFor="bk-email">
                      {/* Die Adresse setzt die Datenbank aus dem Konto (Trigger
                          bookings_schutz) — hier nur zur Anzeige. */}
                      <Input
                        id="bk-email"
                        type="email"
                        value={user?.email || email}
                        readOnly
                        required
                        placeholder="dein@email.de"
                        className="bg-muted"
                      />
                    </Field>
                    <Field label="Telefon (optional)" htmlFor="bk-phone">
                      <Input
                        id="bk-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+49 175 ..."
                      />
                    </Field>
                    <Field className="sm:col-span-2 lg:col-span-1 xl:col-span-2" label="Worum geht's?" htmlFor="bk-topic">
                      <select
                        id="bk-topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        required
                        className={selectCls}
                      >
                        {TOPICS.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </Field>
                    <Field
                      className="sm:col-span-2 lg:col-span-1 xl:col-span-2"
                      label="Kontext oder aktuelle Frage"
                      hint="Empfohlen: hilft beim Vorbereiten, damit der Call fokussiert ist."
                      htmlFor="bk-message"
                    >
                      <Textarea
                        id="bk-message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                        placeholder="z. B. Plane GmbH+Holding-Setup für 3 Brands. Frage zu §22 UmwStG-Sperrfrist und IP-Verlagerung."
                      />
                    </Field>
                  </div>

                  {error && (
                    <Callout tone="danger" className="mt-4">
                      {error}
                    </Callout>
                  )}

                  <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <Button type="button" variant="outline" onClick={() => setSelectedSlot(null)}>
                      <ArrowLeft /> Anderen Slot wählen
                    </Button>
                    <Button type="submit" size="lg" disabled={submitting || !user} className="rounded-xl bg-gradient-primary hover:opacity-95">
                      {submitting ? (
                        <>
                          <Loader2 className="animate-spin" /> Wird gebucht…
                        </>
                      ) : (
                        <>
                          Termin verbindlich buchen <ArrowRight />
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Shield className="h-3.5 w-3.5" aria-hidden="true" /> Kostenlos
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> Stornierung bis 24 h vorher
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" aria-hidden="true" /> Bestätigung innerhalb 24 h
                    </span>
                  </div>
                </ToolSection>
                </form>
              ) : (
                <>
                  {error && (
                    <Callout tone="danger" className="mb-4">
                      {error}
                    </Callout>
                  )}
                  <EmptyState
                    icon={Calendar}
                    title="Noch kein Slot gewählt"
                    description="Wähle links einen freien Slot. Danach fragen wir nur noch Name und Thema ab."
                    className="py-10"
                  />
                </>
              )}
            </div>
          </>
        }
      />

      {/* === FAQ / Trust === */}
      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        {[
          {
            q: "Was kostet der Call?",
            a: "Komplett kostenlos. Wenn weiterführende Beratung sinnvoll ist, vermittle ich passende StBs/RAs (transparent, keine versteckten Provisionen).",
          },
          {
            q: "Worauf bereiten wir uns vor?",
            a: "Beschreib dein Setup im Kontext-Feld: Rechtsform, Umsatz-Range, Brands, geplante Auslandskonstrukte. Dann ist der Call fokussiert.",
          },
          {
            q: "Stornierung möglich?",
            a: "Bis 24 h vorher kostenlos per E-Mail. Danach wenn möglich verschieben statt stornieren.",
          },
        ].map((f) => (
          <div key={f.q} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <HelpCircle className="h-4 w-4 text-accent-blue" aria-hidden="true" /> {f.q}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
          </div>
        ))}
      </div>

      <Callout tone="neutral" title="Hinweis">
        Keine Steuer- oder Rechtsberatung im Sinne des StBerG/RDG, sondern strategische Orientierung mit Verweis auf
        passende Tools im Hub und ggf. Empfehlung qualifizierter StB/RA.
      </Callout>
    </CockpitShell>
  );
};

export default Booking;
