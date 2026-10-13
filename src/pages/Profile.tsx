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
} from "lucide-react";
import { Field as KitField, ResultRow, ToneBadge, ToolSection } from "@/components/cockpit/kit";
import { FelixMemoryPanel } from "@/components/profile/FelixMemoryPanel";
import { TwoFactorPanel } from "@/components/profile/TwoFactorPanel";
import { CodeEinloesenPanel } from "@/components/profile/CodeEinloesenPanel";
import { toast } from "sonner";
import { writeProfileCache } from "@/lib/profileCache";
import { interpretDeleteAccountResult } from "@/lib/deleteAccount";

interface ProfileData {
  salutation?: string | null; first_name?: string | null; last_name?: string | null;
  company_name?: string | null; legal_form?: string | null; phone?: string | null;
  street?: string | null; postal_code?: string | null; city?: string | null;
  vat_id?: string | null; tax_id?: string | null; country?: string | null;
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const { isAdmin: accessAdmin, hasActiveSub: accessSub } = useAccess();
  const [params, setParams] = useSearchParams();
  const tab = params.get("tab") ?? "stamm";
  const [profile, setProfile] = useState<ProfileData>({});
  const [sub, setSub] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  const refreshSub = async () => {
    try {
      await supabase.functions.invoke("check-subscription");
      if (user) {
        const { data } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).maybeSingle();
        setSub(data);
      }
    } catch {}
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
      // Gleicher Tab: window.open nach einem await blocken Safari und
      // mobile Popup-Blocker ("es passiert nichts").
      if (data?.url) { window.location.href = data.url; return; }
      throw new Error("Kundenportal gerade nicht erreichbar.");
    } catch (e: any) { toast.error(e.message); setBusy(null); }
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
    // Cache + Event-Trigger: Dashboard und alle anderen Listener
    // ziehen die neuen Werte synchron ohne erneuten DB-Roundtrip.
    writeProfileCache(user.id, {
      first_name: profile.first_name ?? null,
      onboarding_completed: (profile as any).onboarding_completed ?? null,
    });
    toast.success("Profil aktualisiert");
  };

  const update = (k: keyof ProfileData, v: string) => setProfile({ ...profile, [k]: v });
  // Stripe-Abo (Kundenportal moeglich) vs. Zugang insgesamt -- gleiche Regel
  // wie useAccess/PaywallGate: comp_access und Admins zaehlen als aktiv.
  const stripeActive = sub?.status === "active" || sub?.status === "trialing";
  const isActive = stripeActive || !!sub?.comp_access || accessAdmin || accessSub;

  return (
    <CockpitShell
      eyebrow="Konto · Profil und Abrechnung"
      title="Dein Konto"
      subtitle="Stammdaten, Firma, Abo, Felix-Memory und Sicherheit an einem Ort. Die Angaben nutzen wir auf Rechnungen, in Wizards und im Felix-Kontext."
    >
      <Tabs value={tab} onValueChange={(v) => setParams(v === "stamm" ? {} : { tab: v })} className="w-full">
        <TabsList className="mb-6 h-auto flex-wrap">
          <TabsTrigger value="stamm" className="gap-1.5"><UserRound className="h-4 w-4" aria-hidden="true" /> Stammdaten</TabsTrigger>
          <TabsTrigger value="firma" className="gap-1.5"><Building2 className="h-4 w-4" aria-hidden="true" /> Firma</TabsTrigger>
          <TabsTrigger value="abrechnung" className="gap-1.5"><CreditCard className="h-4 w-4" aria-hidden="true" /> Abrechnung</TabsTrigger>
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
              <Field label="Rechtsform" htmlFor="pf-legal"><Input id="pf-legal" value={profile.legal_form ?? ""} onChange={(e) => update("legal_form", e.target.value)} /></Field>
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

        <TabsContent value="abrechnung">
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
            <div className="space-y-6">
              {/* Aktueller Plan */}
              <ToolSection
                title="Aktueller Plan"
                icon={CreditCard}
                actions={<ToneBadge tone={isActive ? "success" : "neutral"}>{isActive ? "Aktiv" : "Inaktiv"}</ToneBadge>}
              >
                <p className="text-2xl font-semibold tracking-tight">{isActive ? (sub?.plan ?? "Zugang freigeschaltet") : "Kein aktives Abo"}</p>
                <div className="mt-3 divide-y divide-border/70">
                  <ResultRow label="Status" value={sub?.status ?? "inactive"} />
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

            {/* Plan wählen */}
            <section className="relative overflow-hidden rounded-2xl bg-ink p-5 text-primary-foreground shadow-soft md:p-6">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-blue/25 blur-3xl" aria-hidden="true" />
              <div className="relative">
                <p className="flex items-center gap-1.5 text-sm font-medium text-brand-green-glow">
                  <Crown className="h-4 w-4" aria-hidden="true" /> {isActive ? "Plan ändern" : "Plan wählen"}
                </p>
                {isActive ? (
                  <>
                    <h2 className="mt-1 text-lg font-semibold tracking-tight">Plan wechseln oder kündigen</h2>
                    <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                      {stripeActive
                        ? "Du hast bereits ein aktives Abo. Planwechsel, Zahlungsart und Kündigung laufen über das Kundenportal – so entsteht kein zweites Abo."
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
                  </>
                ) : (
                  <>
                    <h2 className="mt-1 text-lg font-semibold tracking-tight">Wähle deinen Plan</h2>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
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
                      <div className="flex flex-col rounded-xl border border-brand-green/40 bg-white/[0.06] p-5 ring-1 ring-brand-green/20">
                        <p className="text-base font-semibold">Founder Bundle</p>
                        <p className="mt-2 text-3xl font-semibold tracking-tight tabular">
                          {formatEurCents(PLANS.bundle.grossCents)}<span className="ml-0.5 text-sm font-normal text-primary-foreground/65">/Mon</span>
                        </p>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-primary-foreground/80">GründerX + AnwaltX (Vertrags-Templates, Compliance-Audit).</p>
                        <Button asChild className="mt-5 h-11 rounded-xl bg-white text-primary hover:bg-white/90">
                          <Link to="/checkout?variant=bundle">Bundle sichern</Link>
                        </Button>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-primary-foreground/65">
                      Jahrespläne und alle Varianten findest du im Warenkorb.
                    </p>
                  </>
                )}
              </div>
            </section>
          </div>
        </TabsContent>

        <TabsContent value="felix-memory">
          <FelixMemoryPanel />
        </TabsContent>

        <TabsContent value="sicherheit" className="max-w-3xl space-y-6">
          <TwoFactorPanel />

          <ToolSection title="Passwort ändern" description="Wir schicken dir einen Link zum Zurücksetzen." icon={KeyRound}>
            <Button variant="outline" onClick={async () => {
              if (!user?.email) return;
              // Nur /reset-password verarbeitet PASSWORD_RECOVERY; die Startseite zeigte kein Formular.
              const { error } = await supabase.auth.resetPasswordForEmail(user.email, { redirectTo: `${window.location.origin}/reset-password` });
              if (error) toast.error(error.message); else toast.success("Mail verschickt – bitte Postfach prüfen.");
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
                  Ein aktives Abo kündigst du vorher bitte unter „Abrechnung“.
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
                    await signOut(); // raeumt auch die lokalen Tool-Daten ab
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
                    {/* Eigener Knopf statt "Abo verwalten": der ist bei past_due gesperrt. */}
                    <Button onClick={portal} disabled={busy === "portal"} variant="outline" className="mt-3">
                      {busy === "portal" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Settings2 className="h-4 w-4" aria-hidden="true" />}
                      Zum Kundenportal
                    </Button>
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
