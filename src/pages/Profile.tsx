import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProfileData {
  salutation?: string | null; first_name?: string | null; last_name?: string | null;
  company_name?: string | null; legal_form?: string | null; phone?: string | null;
  street?: string | null; postal_code?: string | null; city?: string | null;
  vat_id?: string | null; tax_id?: string | null; country?: string | null;
}

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData>({});
  const [sub, setSub] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle().then(({ data }) => setProfile(data ?? {}));
    supabase.from("subscriptions").select("*").eq("user_id", user.id).maybeSingle().then(({ data }) => setSub(data));
  }, [user]);

  const save = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update(profile).eq("id", user.id);
    setSaving(false);
    if (error) toast.error("Speichern fehlgeschlagen");
    else toast.success("Profil aktualisiert");
  };

  const update = (k: keyof ProfileData, v: string) => setProfile({ ...profile, [k]: v });
  const isActive = sub?.status === "active" || sub?.status === "trialing";

  return (
    <CockpitShell eyebrow="👤 Profil & Abrechnung" title="Deine Stammdaten" subtitle="Wird auf Rechnungen, in Wizards und im Felix-Kontext genutzt.">
      <Tabs defaultValue="stamm" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="stamm">Stammdaten</TabsTrigger>
          <TabsTrigger value="firma">Firma</TabsTrigger>
          <TabsTrigger value="abrechnung">Abrechnung</TabsTrigger>
          <TabsTrigger value="sicherheit">Sicherheit</TabsTrigger>
        </TabsList>

        <TabsContent value="stamm">
          <Card>
            <Grid>
              <Field label="Anrede"><Input value={profile.salutation ?? ""} onChange={(e) => update("salutation", e.target.value)} /></Field>
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
          <Card>
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Aktueller Plan</div>
                <div className="text-2xl font-bold mt-1">{isActive ? sub.plan : "Kein aktives Abo"}</div>
                <div className="text-sm text-muted-foreground mt-1">Status: {sub?.status ?? "inactive"}</div>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${isActive ? "bg-success/15 text-success" : "bg-secondary text-muted-foreground"}`}>
                {isActive ? "Aktiv" : "Inaktiv"}
              </span>
            </div>

            <div className="rounded-2xl bg-gradient-primary text-primary-foreground p-6 relative overflow-hidden shadow-glow">
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-accent-blue/30 blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-semibold mb-3">
                  <Crown className="h-3.5 w-3.5" /> GründerX
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Plan title="GründerX" price="99,99 €" desc="Felix, alle Wizards, Anbieter-Vergleich, Coop-Deals" />
                  <Plan title="Founder Bundle" price="179,99 €" desc="GründerX + AnwaltX (Vertrags-Templates, Compliance-Audit)" />
                </div>
                <Button disabled className="mt-5 rounded-full bg-card text-primary opacity-90 cursor-not-allowed">
                  Stripe-Checkout bald verfügbar
                </Button>
              </div>
            </div>
          </Card>
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
