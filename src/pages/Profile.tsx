import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Crown, Loader2, Brain } from "lucide-react";
import { FelixMemoryPanel } from "@/components/profile/FelixMemoryPanel";
import { toast } from "sonner";
import { STRIPE_PRICES } from "@/lib/stripe";
import { writeProfileCache } from "@/lib/profileCache";

interface ProfileData {
  salutation?: string | null; first_name?: string | null; last_name?: string | null;
  company_name?: string | null; legal_form?: string | null; phone?: string | null;
  street?: string | null; postal_code?: string | null; city?: string | null;
  vat_id?: string | null; tax_id?: string | null; country?: string | null;
}

const Profile = () => {
  const { user } = useAuth();
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

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle().then(({ data }) => setProfile(data ?? {}));
    supabase.from("subscriptions").select("*").eq("user_id", user.id).maybeSingle().then(({ data }) => setSub(data));
    refreshSub();
  }, [user]);

  const checkout = async (priceId: string) => {
    setBusy(priceId);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", { body: { priceId } });
      if (error) throw error;
      if (data?.url) window.open(data.url, "_blank");
    } catch (e: any) { toast.error(e.message); } finally { setBusy(null); }
  };

  const portal = async () => {
    setBusy("portal");
    try {
      const { data, error } = await supabase.functions.invoke("customer-portal");
      if (error) throw error;
      if (data?.url) window.open(data.url, "_blank");
    } catch (e: any) { toast.error(e.message); } finally { setBusy(null); }
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
  const isActive = sub?.status === "active" || sub?.status === "trialing";

  return (
    <CockpitShell eyebrow="👤 Profil & Abrechnung" title="Deine Stammdaten" subtitle="Wird auf Rechnungen, in Wizards und im Felix-Kontext genutzt.">
      <Tabs value={tab} onValueChange={(v) => setParams(v === "stamm" ? {} : { tab: v })} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="stamm">Stammdaten</TabsTrigger>
          <TabsTrigger value="firma">Firma</TabsTrigger>
          <TabsTrigger value="abrechnung">Abrechnung</TabsTrigger>
          <TabsTrigger value="felix-memory"><Brain className="h-3.5 w-3.5 mr-1" /> Felix-Memory</TabsTrigger>
          <TabsTrigger value="sicherheit">Sicherheit</TabsTrigger>
        </TabsList>

        <TabsContent value="stamm">
          <Card>
            <Grid>
              <Field label="Anrede">
                <Select value={profile.salutation ?? ""} onValueChange={(v) => update("salutation", v)}>
                  <SelectTrigger><SelectValue placeholder="Bitte wählen" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Herr">Herr</SelectItem>
                    <SelectItem value="Frau">Frau</SelectItem>
                    <SelectItem value="Divers">Divers</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Telefon"><Input value={profile.phone ?? ""} onChange={(e) => update("phone", e.target.value)} /></Field>
              <Field label="Vorname"><Input value={profile.first_name ?? ""} onChange={(e) => update("first_name", e.target.value)} /></Field>
              <Field label="Nachname"><Input value={profile.last_name ?? ""} onChange={(e) => update("last_name", e.target.value)} /></Field>
              <Field label="E-Mail" full><Input value={user?.email ?? ""} disabled /></Field>
            </Grid>
            <SaveBtn saving={saving} onClick={save} />
          </Card>
        </TabsContent>

        <TabsContent value="firma">
          <Card>
            <Grid>
              <Field label="Firmenname" full><Input value={profile.company_name ?? ""} onChange={(e) => update("company_name", e.target.value)} /></Field>
              <Field label="Rechtsform"><Input value={profile.legal_form ?? ""} onChange={(e) => update("legal_form", e.target.value)} /></Field>
              <Field label="Land"><Input value={profile.country ?? "DE"} onChange={(e) => update("country", e.target.value)} /></Field>
              <Field label="Straße & Nr." full><Input value={profile.street ?? ""} onChange={(e) => update("street", e.target.value)} /></Field>
              <Field label="PLZ"><Input value={profile.postal_code ?? ""} onChange={(e) => update("postal_code", e.target.value)} /></Field>
              <Field label="Ort"><Input value={profile.city ?? ""} onChange={(e) => update("city", e.target.value)} /></Field>
              <Field label="USt-IdNr."><Input value={profile.vat_id ?? ""} onChange={(e) => update("vat_id", e.target.value)} placeholder="DE123456789" /></Field>
              <Field label="Steuernummer"><Input value={profile.tax_id ?? ""} onChange={(e) => update("tax_id", e.target.value)} /></Field>
            </Grid>
            <SaveBtn saving={saving} onClick={save} />
          </Card>
        </TabsContent>

        <TabsContent value="abrechnung">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <div className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Aktueller Plan</div>
                <div className="text-3xl font-bold mt-1">{isActive ? sub.plan : "Kein aktives Abo"}</div>
                <div className="text-sm text-muted-foreground mt-1">Status: {sub?.status ?? "inactive"}</div>
                {sub?.current_period_end && (
                  <div className="text-sm text-muted-foreground mt-1">
                    Verlängerung: {new Date(sub.current_period_end).toLocaleDateString("de-DE")}
                  </div>
                )}
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${isActive ? "bg-success/15 text-success" : "bg-secondary text-muted-foreground"}`}>
                {isActive ? "Aktiv" : "Inaktiv"}
              </span>
            </div>

            <div className="rounded-2xl bg-gradient-primary text-primary-foreground p-6 md:p-10 relative overflow-hidden shadow-glow min-h-[460px]">
              <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-accent-blue/30 blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-semibold mb-5">
                  <Crown className="h-3.5 w-3.5" /> {isActive ? "Plan ändern" : "Plan wählen"}
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="rounded-2xl bg-white/10 backdrop-blur p-6 flex flex-col min-h-[260px]">
                    <div className="font-bold text-lg">GründerX</div>
                    <div className="text-3xl font-bold mt-2">99,99 €<span className="text-sm font-normal opacity-70">/Mon</span></div>
                    <p className="text-sm opacity-85 mt-3 flex-1">Felix KI, alle Wizards, Anbieter-Vergleich, Coop-Deals.</p>
                    <Button onClick={() => checkout(STRIPE_PRICES.gruenderx)} disabled={busy === STRIPE_PRICES.gruenderx} className="mt-4 rounded-full bg-card text-primary hover:bg-card/90 h-11">
                      {busy === STRIPE_PRICES.gruenderx ? <Loader2 className="h-4 w-4 animate-spin" /> : "Abonnieren"}
                    </Button>
                  </div>
                  <div className="rounded-2xl bg-white/10 backdrop-blur p-6 flex flex-col min-h-[260px]">
                    <div className="font-bold text-lg">Founder Bundle</div>
                    <div className="text-3xl font-bold mt-2">179,99 €<span className="text-sm font-normal opacity-70">/Mon</span></div>
                    <p className="text-sm opacity-85 mt-3 flex-1">GründerX + AnwaltX (Vertrags-Templates, Compliance-Audit).</p>
                    <Button onClick={() => checkout(STRIPE_PRICES.bundle)} disabled={busy === STRIPE_PRICES.bundle} className="mt-4 rounded-full bg-card text-primary hover:bg-card/90 h-11">
                      {busy === STRIPE_PRICES.bundle ? <Loader2 className="h-4 w-4 animate-spin" /> : "Bundle sichern"}
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-8">
                  <Button onClick={portal} disabled={busy === "portal" || !isActive} variant="secondary" className="rounded-full h-11 px-6">
                    {busy === "portal" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Abo verwalten"}
                  </Button>
                  <Button onClick={refreshSub} variant="ghost" className="rounded-full text-primary-foreground hover:bg-white/10 h-11">
                    Status prüfen
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="felix-memory">
          <FelixMemoryPanel />
        </TabsContent>

        <TabsContent value="sicherheit">
          <Card>
            <h3 className="font-bold mb-2">Passwort ändern</h3>
            <p className="text-sm text-muted-foreground mb-4">Sende dir einen Link zum Zurücksetzen.</p>
            <Button variant="outline" onClick={async () => {
              if (!user?.email) return;
              const { error } = await supabase.auth.resetPasswordForEmail(user.email, { redirectTo: window.location.origin });
              if (error) toast.error(error.message); else toast.success("Mail verschickt – bitte Postfach prüfen.");
            }}>Reset-Mail senden</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </CockpitShell>
  );
};

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl border border-border bg-card p-6">{children}</div>
);
const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid md:grid-cols-2 gap-4">{children}</div>
);
const Field = ({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) => (
  <div className={full ? "md:col-span-2" : ""}>
    <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
    <div className="mt-2">{children}</div>
  </div>
);
const SaveBtn = ({ saving, onClick }: { saving: boolean; onClick: () => void }) => (
  <Button onClick={onClick} disabled={saving} className="mt-6 rounded-full">
    {saving && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}Speichern
  </Button>
);
const Plan = ({ title, price, desc }: { title: string; price: string; desc: string }) => (
  <div className="rounded-2xl bg-white/10 backdrop-blur p-4">
    <div className="font-bold">{title}</div>
    <div className="text-2xl font-bold mt-1">{price}<span className="text-sm font-normal opacity-70">/Mon</span></div>
    <p className="text-xs opacity-85 mt-2">{desc}</p>
  </div>
);

export default Profile;
