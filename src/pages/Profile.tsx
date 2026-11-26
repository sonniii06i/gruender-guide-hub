import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAccess, invalidateAccess } from "@/hooks/useAccess";
import { PLANS, formatEurCents } from "@/config/pricing";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Crown,
  Loader2,
  Brain,
  UserRound,
  Building2,
  CreditCard,
  ShieldCheck,
  KeyRound,
  Mail,
  Trash2,
  Check,
  RefreshCw,
  Settings2,
  Smartphone,
  Bell,
  Vibrate,
  Compass,
  Link2,
  RotateCw,
} from "lucide-react";
import { Field as KitField, ResultRow, ToneBadge, ToolSection } from "@/components/cockpit/kit";
import { RECHTSFORM_OPTIONEN, rechtsformOption } from "@/lib/onboarding";
import { FelixMemoryPanel } from "@/components/profile/FelixMemoryPanel";
import { TwoFactorPanel } from "@/components/profile/TwoFactorPanel";
import { CodeEinloesenPanel } from "@/components/profile/CodeEinloesenPanel";
import { toast } from "sonner";
import { readProfileCache, writeProfileCache } from "@/lib/profileCache";
import type { Database } from "@/integrations/supabase/types";
import { interpretDeleteAccountResult } from "@/lib/deleteAccount";
import { isGruenderXIosApp } from "@/lib/iosApp";
import { isHapticsEnabled, setHapticsEnabled, hapticSelection } from "@/lib/haptics";
import {
  getIosPushStatus,
  getSavedIosPushTokenPreview,
  reloadIosApp,
  requestIosPushNotifications,
  type IosPushStatus,
} from "@/lib/iosBridge";
import { cn } from "@/lib/utils";

interface ProfileData {
  salutation?: string | null; first_name?: string | null; last_name?: string | null;
  company_name?: string | null; legal_form?: string | null; phone?: string | null;
  street?: string | null; postal_code?: string | null; city?: string | null;
  vat_id?: string | null; tax_id?: string | null; country?: string | null;
  onboarding_completed?: boolean | null;
}

type AboZeile = Database["public"]["Tables"]["subscriptions"]["Row"];

/** Stripe-Status in Worten; unbekannte Werte bleiben sichtbar statt zu verschwinden. */
const ABO_STATUS: Record<string, string> = {
  active: "Aktiv", trialing: "Startphase", past_due: "Zahlung offen", unpaid: "Zahlung offen",
  canceled: "Gekündigt", incomplete: "Zahlung nicht abgeschlossen", incomplete_expired: "Zahlung abgelaufen",
  paused: "Pausiert", inactive: "Kein Abo",
};

const Profile = () => {
  const { user, signOut } = useAuth();
  const { isAdmin: accessAdmin, hasActiveSub: accessSub } = useAccess();
  const [params, setParams] = useSearchParams();
  const inIosApp = isGruenderXIosApp();
  const rawTab = params.get("tab") ?? "stamm";
  // Apple 3.1.1: in der iOS-App keine Abrechnungs- oder Kaufansicht
  const tab = inIosApp && rawTab === "abrechnung" ? "stamm" : rawTab;

  const [profile, setProfile] = useState<ProfileData>({});
  const [sub, setSub] = useState<AboZeile | null>(null);
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [hapticsOn, setHapticsOn] = useState<boolean>(() => isHapticsEnabled());
  const [pushStatus, setPushStatus] = useState<IosPushStatus>("unsupported");
  const [pushBusy, setPushBusy] = useState(false);
  const [pushTokenPreview, setPushTokenPreview] = useState<string | null>(() => getSavedIosPushTokenPreview());

  useEffect(() => {
    void getIosPushStatus().then(setPushStatus);
  }, []);

  const refreshSub = async () => {
    try {
      await supabase.functions.invoke("check-subscription");
      if (user) {
        const { data } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).maybeSingle();
        setSub(data);
      }
    } catch { /* Abo-Stand bleibt beim zuletzt geladenen, die Seite zeigt ihn weiter */ }
  };

  const [checkingSub, setCheckingSub] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteBlock, setDeleteBlock] = useState<string | null>(null);
  const handleStatusCheck = async () => {
    setCheckingSub(true);
    try {
      await supabase.functions.invoke("check-subscription");
      const { data } = await supabase.from("subscriptions").select("*").eq("user_id", user!.id).maybeSingle();
      setSub(data);
      void invalidateAccess();
      const active = data?.status === "active" || data?.status === "trialing" || !!data?.comp_access;
      toast[active ? "success" : "info"](
        active ? "Abo ist aktiv." : "Kein aktives Abo gefunden.",
      );
    } catch {
      toast.error("Status konnte nicht geprüft werden.");
    } finally {
      setCheckingSub(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle().then(({ data }) => setProfile(data ?? {}));
    supabase.from("subscriptions").select("*").eq("user_id", user.id).maybeSingle().then(({ data }) => setSub(data));
    refreshSub();
  }, [user]);

  const portal = async () => {
    setBusy("portal");
    try {
      const { data, error } = await supabase.functions.invoke("customer-portal");
      if (error) throw error;
      if (data?.url) { window.location.href = data.url; return; }
      throw new Error("Kundenportal gerade nicht erreichbar.");
    } catch (e) { toast.error(e instanceof Error && e.message ? e.message : "Kundenportal gerade nicht erreichbar."); setBusy(null); }
  };

  const save = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update(profile).eq("id", user.id);
    setSaving(false);
    if (error) {
      toast.error("Speichern fehlgeschlagen");
      return;
    }
    writeProfileCache(user.id, {
      ...(readProfileCache(user.id) ?? {}),
      first_name: profile.first_name ?? null,
      onboarding_completed: profile.onboarding_completed ?? null,
      legal_form: profile.legal_form ?? null,
    });
    toast.success("Profil aktualisiert");
  };

  const handleToggleHaptics = () => {
    const next = !hapticsOn;
    setHapticsEnabled(next);
    setHapticsOn(next);
    toast.success(next ? "Haptik-Feedback aktiviert." : "Haptik-Feedback deaktiviert.");
  };

  const handleEnablePush = async () => {
    setPushBusy(true);
    try {
      const res = await requestIosPushNotifications();
      setPushStatus(res.status);
      if (res.token) setPushTokenPreview(res.token.slice(0, 12));
      if (res.status === "granted") {
        toast.success("Mitteilungen für dieses Gerät sind aktiv.");
      } else if (res.status === "denied") {
        toast.info("Bitte Mitteilungen in den iOS-Einstellungen unter GründerX erlauben.");
      } else {
        toast.info("Push-Mitteilungen lassen sich direkt in der GründerX iOS-App aktivieren.");
      }
    } finally {
      setPushBusy(false);
    }
  };

  const update = (k: keyof ProfileData, v: string) => setProfile({ ...profile, [k]: v });
  const rechtsform = rechtsformOption(profile.legal_form);
  const stripeActive = sub?.status === "active" || sub?.status === "trialing";
  const isActive = stripeActive || !!sub?.comp_access || accessAdmin || accessSub;

  return (
    <CockpitShell
      eyebrow={inIosApp ? "Konto · Profil & App" : "Konto · Profil und Abrechnung"}
      title="Dein Konto"
      subtitle={
        inIosApp
          ? "Stammdaten, Firma, App-Einstellungen, Felix-Memory und Sicherheit an einem Ort."
          : "Stammdaten, Firma, Abo, App-Einstellungen, Felix-Memory und Sicherheit an einem Ort."
      }
    >
      <Tabs
        value={tab}
        onValueChange={(v) => {
          hapticSelection();
          setParams(v === "stamm" ? {} : { tab: v });
        }}
        className="w-full"
      >
        <TabsList className="mb-6 h-auto flex-wrap">
          <TabsTrigger value="stamm" className="gap-1.5"><UserRound className="h-4 w-4" aria-hidden="true" /> Stammdaten</TabsTrigger>
          <TabsTrigger value="firma" className="gap-1.5"><Building2 className="h-4 w-4" aria-hidden="true" /> Firma</TabsTrigger>
          {!inIosApp && (
            <TabsTrigger value="abrechnung" className="gap-1.5"><CreditCard className="h-4 w-4" aria-hidden="true" /> Abrechnung</TabsTrigger>
          )}
          <TabsTrigger value="app" className="gap-1.5"><Smartphone className="h-4 w-4" aria-hidden="true" /> App</TabsTrigger>
          <TabsTrigger value="felix-memory" className="gap-1.5"><Brain className="h-4 w-4" aria-hidden="true" /> Felix-Memory</TabsTrigger>
          <TabsTrigger value="sicherheit" className="gap-1.5"><ShieldCheck className="h-4 w-4" aria-hidden="true" /> Sicherheit</TabsTrigger>
        </TabsList>

        <TabsContent value="stamm" className="max-w-3xl">
          <ToolSection title="Persönliche Angaben" description="Für Anrede und Rechnungen." icon={UserRound}>
            <Grid>
              <Field label="Anrede">
                <Select value={profile.salutation ?? ""} onValueChange={(v) => update("salutation", v)}>
                  <SelectTrigger aria-label="Anrede"><SelectValue placeholder="Bitte wählen" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Herr">Herr</SelectItem>
                    <SelectItem value="Frau">Frau</SelectItem>
                    <SelectItem value="Divers">Divers</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Telefon" htmlFor="pf-phone"><Input id="pf-phone" type="tel" value={profile.phone ?? ""} onChange={(e) => update("phone", e.target.value)} /></Field>
              <Field label="Vorname" htmlFor="pf-first"><Input id="pf-first" value={profile.first_name ?? ""} onChange={(e) => update("first_name", e.target.value)} /></Field>
              <Field label="Nachname" htmlFor="pf-last"><Input id="pf-last" value={profile.last_name ?? ""} onChange={(e) => update("last_name", e.target.value)} /></Field>
              <Field label="E-Mail" hint="Die Login-Adresse lässt sich hier nicht ändern." htmlFor="pf-mail" full>
                <Input id="pf-mail" value={user?.email ?? ""} disabled />
              </Field>
            </Grid>
            <SaveBtn saving={saving} onClick={save} />
          </ToolSection>
        </TabsContent>

        <TabsContent value="firma" className="max-w-3xl">
          <ToolSection title="Firmendaten" description="Erscheinen auf Rechnungen und füllen Wizards vor." icon={Building2}>
            <Grid>
              <Field label="Firmenname" htmlFor="pf-company" full><Input id="pf-company" value={profile.company_name ?? ""} onChange={(e) => update("company_name", e.target.value)} /></Field>
              <Field label="Rechtsform" hint="Bestimmt die Schritte in deinem Fahrplan.">
                <Select value={rechtsform} onValueChange={(v) => update("legal_form", v)}>
                  <SelectTrigger aria-label="Rechtsform"><SelectValue placeholder="Bitte wählen" /></SelectTrigger>
                  <SelectContent>
                    {RECHTSFORM_OPTIONEN.map((o) => <SelectItem key={o.id} value={o.id}>{o.titel}</SelectItem>)}
                    {rechtsform && !RECHTSFORM_OPTIONEN.some((o) => o.id === rechtsform) && <SelectItem value={rechtsform}>{rechtsform}</SelectItem>}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Land" htmlFor="pf-country"><Input id="pf-country" value={profile.country ?? "DE"} onChange={(e) => update("country", e.target.value)} /></Field>
              <Field label="Straße und Hausnummer" htmlFor="pf-street" full><Input id="pf-street" value={profile.street ?? ""} onChange={(e) => update("street", e.target.value)} /></Field>
              <Field label="PLZ" htmlFor="pf-zip"><Input id="pf-zip" value={profile.postal_code ?? ""} onChange={(e) => update("postal_code", e.target.value)} className="tabular" /></Field>
              <Field label="Ort" htmlFor="pf-city"><Input id="pf-city" value={profile.city ?? ""} onChange={(e) => update("city", e.target.value)} /></Field>
              <Field label="USt-IdNr." htmlFor="pf-vat"><Input id="pf-vat" value={profile.vat_id ?? ""} onChange={(e) => update("vat_id", e.target.value)} placeholder="DE123456789" className="font-mono" /></Field>
              <Field label="Steuernummer" htmlFor="pf-tax"><Input id="pf-tax" value={profile.tax_id ?? ""} onChange={(e) => update("tax_id", e.target.value)} className="font-mono" /></Field>
            </Grid>
            <SaveBtn saving={saving} onClick={save} />
          </ToolSection>
        </TabsContent>

        {!inIosApp && (
          <TabsContent value="abrechnung">
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
              <div className="space-y-6">
                <ToolSection
                  title="Aktueller Plan"
                  icon={CreditCard}
                  actions={<ToneBadge tone={isActive ? "success" : "neutral"}>{isActive ? "Aktiv" : "Inaktiv"}</ToneBadge>}
                >
                  <p className="text-2xl font-semibold tracking-tight">{isActive ? (sub?.plan ?? "Zugang freigeschaltet") : "Kein aktives Abo"}</p>
                  <div className="mt-3 divide-y divide-border/70">
                    <ResultRow label="Status" value={ABO_STATUS[sub?.status ?? "inactive"] ?? sub?.status ?? "Kein Abo"} />
                    {sub?.current_period_end && (
                      <ResultRow label="Verlängerung" value={new Date(sub.current_period_end).toLocaleDateString("de-DE")} />
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button onClick={portal} disabled={busy === "portal" || !stripeActive} variant="outline">
                      {busy === "portal" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Settings2 className="h-4 w-4" aria-hidden="true" />}
                      Abo verwalten
                    </Button>
                    <Button onClick={handleStatusCheck} disabled={checkingSub} variant="ghost">
                      {checkingSub ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <RefreshCw className="h-4 w-4" aria-hidden="true" />}
                      {checkingSub ? "Prüfe …" : "Status prüfen"}
                    </Button>
                  </div>
                </ToolSection>

                <CodeEinloesenPanel onRedeemed={handleStatusCheck} />
              </div>

              <section className="relative overflow-hidden rounded-2xl bg-ink p-5 text-primary-foreground md:p-6">
                <div className="relative">
                  <p className="flex items-center gap-1.5 text-sm font-medium text-brand-green-glow">
                    <Crown className="h-4 w-4" aria-hidden="true" /> {isActive ? "Plan ändern" : "Plan wählen"}
                  </p>
                  {isActive ? (
                    <>
                      <h2 className="mt-1 text-lg font-semibold tracking-tight">Plan wechseln oder kündigen</h2>
                      <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                        {stripeActive
                          ? "Du hast bereits ein aktives Abo. Planwechsel, Zahlungsart und Kündigung laufen über das Kundenportal, damit kein zweites Abo entsteht."
                          : "Dein Zugang ist freigeschaltet. Für Fragen zu deinem Zugang schreib uns über den Support."}
                      </p>
                      {stripeActive && (
                        <Button
                          onClick={portal}
                          disabled={busy === "portal"}
                          className="mt-5 h-11 rounded-xl bg-white text-primary hover:bg-white/90"
                        >
                          {busy === "portal" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Zum Kundenportal"}
                        </Button>
                      )}
                      <p className="mt-3 text-xs text-primary-foreground/70">
                        Oder ohne Kundenportal: <a href="/kuendigen" className="underline">Verträge hier kündigen</a>
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="mt-1 text-lg font-semibold tracking-tight">Wähle deinen Plan</h2>
                      <div className="mt-5 grid gap-4">
                        <div className="flex flex-col rounded-xl border border-white/10 bg-white/[0.06] p-5">
                          <p className="text-base font-semibold">GründerX</p>
                          <p className="mt-2 text-3xl font-semibold tracking-tight tabular">
                            {formatEurCents(PLANS.gruenderx.grossCents)}<span className="ml-0.5 text-sm font-normal text-primary-foreground/65">/Mon</span>
                          </p>
                          <p className="mt-3 flex-1 text-sm leading-relaxed text-primary-foreground/80">Felix KI, alle Wizards, Anbieter-Vergleich, Coop-Deals.</p>
                          <Button asChild className="mt-5 h-11 rounded-xl bg-white text-primary hover:bg-white/90">
                            <Link to="/checkout?variant=gruenderx">Abonnieren</Link>
                          </Button>
                        </div>
                      </div>
                      <p className="mt-3 text-xs text-primary-foreground/65">
                        Den Jahreszugang findest du im Warenkorb.
                      </p>
                    </>
                  )}
                </div>
              </section>
            </div>
          </TabsContent>
        )}

        <TabsContent value="app" className="max-w-3xl space-y-5">
          <ToolSection
            title="GründerX App-Einstellungen"
            description={
              inIosApp
                ? "Steuere Haptik, Mitteilungen und Synchronisierung direkt auf deinem iPhone."
                : "Einstellungen für deine GründerX-Oberfläche und die native iOS-App."
            }
            icon={Smartphone}
            actions={<ToneBadge tone={inIosApp ? "success" : "info"}>{inIosApp ? "iOS-App aktiv" : "Web-Cockpit"}</ToneBadge>}
          >
            <div className="divide-y divide-border/70">
              {/* Haptik Toggle */}
              <div className="flex items-center justify-between gap-4 py-3.5 first:pt-0">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EDF4FF] text-[#1E40AF]">
                    <Vibrate className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Haptisches Feedback</p>
                    <p className="text-xs text-muted-foreground">
                      Leichtes Tippen beim Tab-Wechsel, Abhaken von Schritten und richtigen Quiz-Antworten.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={hapticsOn}
                  onClick={handleToggleHaptics}
                  className={cn(
                    "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors",
                    hapticsOn ? "bg-brand-green" : "bg-secondary border border-border",
                  )}
                >
                  <span className="sr-only">Haptisches Feedback umschalten</span>
                  <span
                    className={cn(
                      "inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform",
                      hapticsOn ? "translate-x-6" : "translate-x-1",
                    )}
                  />
                </button>
              </div>

              {/* Push Notifications */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-3.5">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ECF8F3] text-brand-green">
                    <Bell className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Mitteilungen für Fristen &amp; Erinnerungen</p>
                    <p className="text-xs text-muted-foreground">
                      {pushStatus === "granted"
                        ? `Aktiv auf diesem Gerät${pushTokenPreview ? ` (Geräte-ID ${pushTokenPreview}…)` : ""}.`
                        : pushStatus === "denied"
                          ? "In den iOS-Einstellungen blockiert. Dort kannst du Mitteilungen wieder einschalten."
                          : inIosApp
                            ? "Erhalte wichtige Steuerfristen und neue Kurse direkt als iOS-Mitteilung."
                            : "Direkt in der GründerX iOS-App aktivierbar."}
                    </p>
                  </div>
                </div>
                {inIosApp ? (
                  <Button
                    type="button"
                    size="sm"
                    variant={pushStatus === "granted" ? "outline" : "default"}
                    disabled={pushBusy}
                    onClick={() => void handleEnablePush()}
                    className="rounded-xl"
                  >
                    {pushBusy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Bell className="h-3.5 w-3.5" aria-hidden="true" />}
                    {pushStatus === "granted" ? "Neu prüfen" : "Aktivieren"}
                  </Button>
                ) : (
                  <ToneBadge tone="neutral">Nur iOS-App</ToneBadge>
                )}
              </div>

              {/* App neu laden */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-3.5 last:pb-0">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                    <RotateCw className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Ansicht synchronisieren</p>
                    <p className="text-xs text-muted-foreground">
                      Lädt alle Kurse, Fortschritte und die aktuellen Anbieter-Daten frisch vom Server.
                    </p>
                  </div>
                </div>
                <Button type="button" size="sm" variant="outline" onClick={reloadIosApp} className="rounded-xl">
                  <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" /> Neu laden
                </Button>
              </div>
            </div>
          </ToolSection>

          <ToolSection title="Native iOS-Funktionen" description="Automatisch aktiv in der GründerX-App." icon={Compass}>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-secondary/35 p-3.5">
                <p className="text-xs font-bold text-primary">Wischen zum Zurückgehen</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Vom linken Bildschirmrand nach rechts wischen, um blitzschnell zur vorigen Seite zu springen.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-secondary/35 p-3.5">
                <p className="text-xs font-bold text-primary">Nach unten ziehen (Pull-to-Refresh)</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Oben an der Seite ziehen, um deinen aktuellen Stand jederzeit sofort zu aktualisieren.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-secondary/35 p-3.5">
                <p className="text-xs font-bold text-primary">In-App Safari für Anbieter</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Externe Anbieter-Links öffnen sicher im integrierten Safari-Fenster, ohne GründerX zu verlassen.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-secondary/35 p-3.5">
                <p className="flex items-center gap-1 text-xs font-bold text-primary">
                  <Link2 className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" /> Universal Links &amp; Sync
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Links zu gruenderx.de öffnen direkt in der App; dein Fortschritt bleibt zwischen iPhone und Browser synchron.
                </p>
              </div>
            </div>
          </ToolSection>
        </TabsContent>

        <TabsContent value="felix-memory">
          <FelixMemoryPanel />
        </TabsContent>

        <TabsContent value="sicherheit" className="max-w-3xl space-y-6">
          <TwoFactorPanel />

          <ToolSection title="Passwort ändern" description="Wir schicken dir einen Link zum Zurücksetzen." icon={KeyRound}>
            <Button variant="outline" onClick={async () => {
              if (!user?.email) return;
              const { error } = await supabase.auth.resetPasswordForEmail(user.email, { redirectTo: `${window.location.origin}/reset-password` });
              if (error) toast.error(error.message); else toast.success("Mail verschickt. Bitte prüfe dein Postfach.");
            }}>
              <Mail className="h-4 w-4" aria-hidden="true" /> Reset-Mail senden
            </Button>
          </ToolSection>

          <section className="rounded-2xl border border-danger/30 bg-danger-soft p-5 md:p-6">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-card text-danger">
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-danger">Konto und alle Daten löschen</h2>
                <p className="mt-1 text-sm leading-relaxed text-foreground/80">
                  Löscht dein Konto und unwiderruflich alle deine Daten (Profil, Guide-Fortschritt inkl.
                  Notar-Vorbereitung, Felix-Chats, Benachrichtigungen). Das lässt sich nicht rückgängig machen.
                  {!inIosApp && " Ein aktives Abo kündigst du vorher bitte unter „Abrechnung“."}
                </p>
                <Button
                  variant="destructive"
                  disabled={deleting}
                  className="mt-4"
                  onClick={async () => {
                    if (!window.confirm("Wirklich dein Konto und ALLE Daten unwiderruflich löschen?")) return;
                    if (!window.confirm("Letzte Warnung: Das kann nicht rückgängig gemacht werden. Fortfahren?")) return;
                    setDeleting(true);
                    setDeleteBlock(null);
                    const outcome = await interpretDeleteAccountResult(
                      await supabase.functions.invoke("delete-account"),
                    );
                    if (outcome.kind !== "deleted") {
                      setDeleting(false);
                      if (outcome.kind === "active_subscription") setDeleteBlock(outcome.message);
                      else toast.error(outcome.message);
                      return;
                    }
                    toast.success("Konto gelöscht. Auf Wiedersehen.");
                    await signOut();
                    window.location.href = "/";
                  }}
                >
                  {deleting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                  Konto endgültig löschen
                </Button>
                {deleteBlock && (
                  <div role="alert" className="mt-4 rounded-xl border border-danger/30 bg-card p-4 text-sm">
                    <p className="font-medium text-foreground">Konto nicht gelöscht</p>
                    <p className="mt-1 leading-relaxed text-foreground/80">{deleteBlock}</p>
                    {!inIosApp && (
                      <Button onClick={portal} disabled={busy === "portal"} variant="outline" className="mt-3">
                        {busy === "portal" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Settings2 className="h-4 w-4" aria-hidden="true" />}
                        Zum Kundenportal
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </CockpitShell>
  );
};

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid gap-4 sm:grid-cols-2">{children}</div>
);
const Field = ({ label, children, full, hint, htmlFor }: { label: string; children: React.ReactNode; full?: boolean; hint?: string; htmlFor?: string }) => (
  <KitField label={label} hint={hint} htmlFor={htmlFor} className={full ? "sm:col-span-2" : ""}>
    {children}
  </KitField>
);
const SaveBtn = ({ saving, onClick }: { saving: boolean; onClick: () => void }) => (
  <div className="mt-6 flex justify-end border-t border-border/70 pt-5">
    <Button onClick={onClick} disabled={saving}>
      {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Check className="h-4 w-4" aria-hidden="true" />}
      {saving ? "Speichert …" : "Speichern"}
    </Button>
  </div>
);

export default Profile;
