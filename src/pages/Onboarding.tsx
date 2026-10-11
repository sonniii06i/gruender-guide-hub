import Logo from "@/components/Logo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useAccess } from "@/hooks/useAccess";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
  ArrowLeft, ArrowRight, Building2, Check, Loader2, Rocket, ShoppingBag,
  Sparkles, Store, Users, Briefcase, Globe, Package,
} from "lucide-react";

type Step = 0 | 1 | 2 | 3 | 4 | 5;

const businessModels = [
  { id: "amazon_fba", label: "Amazon FBA / Seller", icon: ShoppingBag },
  { id: "shopify", label: "Eigener Shop (Shopify)", icon: Store },
  { id: "creator", label: "Creator / Influencer", icon: Sparkles },
  { id: "agency", label: "Agentur / Service", icon: Briefcase },
  { id: "saas", label: "SaaS / Software", icon: Rocket },
  { id: "other", label: "Etwas anderes", icon: Package },
];

const legalForms = [
  { id: "unsure", label: "Bin mir unsicher", desc: "Felix hilft mir bei der Wahl" },
  { id: "einzelunternehmen", label: "Einzelunternehmen", desc: "Schnell & günstig starten" },
  { id: "ug", label: "UG (haftungsbeschränkt)", desc: "Mini-GmbH, ab 1 € Stammkapital" },
  { id: "gmbh", label: "GmbH", desc: "25.000 € Stammkapital" },
  { id: "us_llc", label: "US LLC", desc: "Wyoming, Delaware, NM" },
  { id: "hk_ltd", label: "HK Limited", desc: "Hong Kong" },
];

const stages = [
  { id: "idea", label: "Habe nur eine Idee", icon: Sparkles },
  { id: "planning", label: "In Planung", icon: Building2 },
  { id: "ready", label: "Bereit zu gründen", icon: Rocket },
  { id: "running", label: "Schon aktiv", icon: Users },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { loading: accLoading, hasActiveSub, isAdmin } = useAccess();
  void hasActiveSub; void isAdmin;
  const [step, setStep] = useState<Step>(0);
  const [saving, setSaving] = useState(false);

  const [salutation, setSalutation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessModels_, setBusinessModels_] = useState<string[]>([]);
  const businessModel = businessModels_.join(",");
  const toggleModel = (id: string) =>
    setBusinessModels_((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const [stage, setStage] = useState("");
  const [legalForm, setLegalForm] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("DE");
  const [vatId, setVatId] = useState("");
  const [taxId, setTaxId] = useState("");

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.onboarding_completed) {
          // Onboarding fertig -> direkt ins (frei nutzbare) Dashboard.
          // Das Abo ist Upsell (Sidebar/Banner), kein Zwang -> passt zu "Kostenlos starten".
          navigate("/dashboard", { replace: true });
        } else if (data) {
          setSalutation(data.salutation ?? "");
          setFirstName(data.first_name ?? "");
          setLastName(data.last_name ?? "");
          setCompanyName(data.company_name ?? "");
          setPhone(data.phone ?? "");
          setBusinessModels_(data.business_model ? data.business_model.split(",").filter(Boolean) : []);
          setLegalForm(data.legal_form ?? "");
          setStreet(data.street ?? "");
          setPostalCode(data.postal_code ?? "");
          setCity(data.city ?? "");
          setCountry(data.country ?? "DE");
          setVatId(data.vat_id ?? "");
          setTaxId(data.tax_id ?? "");
          if ((data as any).founder_stage) setStage((data as any).founder_stage);
        }
      });
  }, [user, navigate]);

  const totalSteps = 6;
  const progress = ((step + 1) / totalSteps) * 100;

  const next = () => setStep((s) => Math.min(5, s + 1) as Step);
  const back = () => setStep((s) => Math.max(0, s - 1) as Step);

  const finish = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({
      salutation,
      first_name: firstName,
      last_name: lastName,
      company_name: companyName || null,
      phone,
      business_model: businessModel,
      legal_form: legalForm || "unsure",
      street,
      postal_code: postalCode,
      city,
      country,
      vat_id: vatId || null,
      tax_id: taxId || null,
      founder_stage: stage || null,
      onboarding_completed: true,
      onboarding_step: 6,
    } as any).eq("id", user.id);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    // Direkt ins Dashboard (frei nutzbar) – kein Paywall-Zwang. Das Abo ist als
    // Upsell in Sidebar/Bannern erreichbar (passt zu "Kostenlos starten").
    toast.success("Profil gespeichert. Los geht's.");
    navigate("/dashboard");
  };

  const canContinue = () => {
    if (step === 0) return !!salutation && !!firstName.trim() && !!lastName.trim();
    if (step === 1) return true; // Firma optional
    if (step === 2) return !!street.trim() && !!postalCode.trim() && !!city.trim();
    if (step === 3) return !!businessModel;
    if (step === 4) return !!stage;
    if (step === 5) return !!legalForm;
    return false;
  };

  if (authLoading || accLoading || !user) {
    return <div className="flex min-h-[100dvh] items-center justify-center" role="status"><Loader2 className="h-6 w-6 animate-spin text-accent-blue" aria-hidden="true" /><span className="sr-only">Lädt…</span></div>;
  }

  return (
    <div className="relative min-h-[100dvh] bg-hero">
      <div className="pointer-events-none absolute inset-0 bg-dots [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" aria-hidden="true" />
      <div className="container relative max-w-2xl px-4 py-8 md:py-12">
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Logo className="h-8 w-8" />
              <span className="font-semibold tracking-tight">GründerX</span>
            </div>
            <span className="text-sm text-muted-foreground tabular">Schritt {step + 1} von {totalSteps}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={totalSteps} aria-label="Fortschritt">
            <div className="h-full rounded-full bg-accent-blue transition-[width] duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-10">
          {step === 0 && (
            <Step eyebrow="Schön dich kennenzulernen" title="Wie heißt du?" subtitle="Felix nutzt das in jeder Antwort.">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="ob-salutation">Anrede</Label>
                  <Select value={salutation} onValueChange={setSalutation}>
                    <SelectTrigger id="ob-salutation"><SelectValue placeholder="Bitte wählen" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Herr">Herr</SelectItem>
                      <SelectItem value="Frau">Frau</SelectItem>
                      <SelectItem value="Divers">Divers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="fn">Vorname</Label>
                    <Input id="fn" autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ln">Nachname</Label>
                    <Input id="ln" autoComplete="family-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Telefon (optional)</Label>
                  <Input id="phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+49 …" />
                </div>
              </div>
            </Step>
          )}

          {step === 1 && (
            <Step eyebrow="Dein Vorhaben" title="Hast du schon eine Firma?" subtitle="Optional. Als Gründer kannst du das auch später ergänzen.">
              <div className="space-y-1.5">
                <Label htmlFor="company">Firmenname (optional)</Label>
                <Input id="company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} autoComplete="organization" placeholder="z. B. Muster Handels GmbH" />
              </div>
            </Step>
          )}

          {step === 2 && (
            <Step eyebrow="Adresse" title="Deine Anschrift" subtitle="Wird für Rechnungen und Behörden-Templates genutzt.">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="ob-street">Straße & Nr.</Label>
                  <Input id="ob-street" autoComplete="street-address" value={street} onChange={(e) => setStreet(e.target.value)} />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="ob-plz">PLZ</Label>
                    <Input id="ob-plz" autoComplete="postal-code" inputMode="numeric" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                  </div>
                  <div className="space-y-1.5 col-span-2">
                    <Label htmlFor="ob-city">Ort</Label>
                    <Input id="ob-city" autoComplete="address-level2" value={city} onChange={(e) => setCity(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ob-country">Land</Label>
                  <Input id="ob-country" autoComplete="country-name" value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="ob-vat">USt-IdNr. (optional)</Label>
                    <Input id="ob-vat" spellCheck={false} value={vatId} onChange={(e) => setVatId(e.target.value)} placeholder="DE123456789" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ob-tax">Steuernummer (optional)</Label>
                    <Input id="ob-tax" spellCheck={false} value={taxId} onChange={(e) => setTaxId(e.target.value)} />
                  </div>
                </div>
              </div>
            </Step>
          )}

          {step === 3 && (
            <Step eyebrow="Geschäftsmodell" title="Was willst du aufbauen?" subtitle="Damit Felix dir die richtigen Tools zeigt.">
              <div className="grid sm:grid-cols-2 gap-3">
                {businessModels.map((b) => (
                  <ChoiceCard key={b.id} active={businessModels_.includes(b.id)} onClick={() => toggleModel(b.id)}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-blue">
                        <b.icon className="h-4 w-4 text-accent-blue" />
                      </div>
                      <span className="font-medium">{b.label}</span>
                    </div>
                  </ChoiceCard>
                ))}
              </div>
            </Step>
          )}

          {step === 4 && (
            <Step eyebrow="Status quo" title="Wo stehst du gerade?" subtitle="Felix passt das Tempo an dich an.">
              <div className="grid sm:grid-cols-2 gap-3">
                {stages.map((s) => (
                  <ChoiceCard key={s.id} active={stage === s.id} onClick={() => setStage(s.id)}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-blue">
                        <s.icon className="h-4 w-4 text-accent-blue" />
                      </div>
                      <span className="font-medium">{s.label}</span>
                    </div>
                  </ChoiceCard>
                ))}
              </div>
            </Step>
          )}

          {step === 5 && (
            <Step eyebrow="Rechtsform" title="Hast du schon eine Rechtsform im Kopf?" subtitle="Wenn nicht, führt Felix dich durch den Vergleich.">
              <div className="grid sm:grid-cols-2 gap-3">
                {legalForms.map((l) => (
                  <ChoiceCard key={l.id} active={legalForm === l.id} onClick={() => setLegalForm(l.id)}>
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-blue">
                        <Globe className="h-4 w-4 text-accent-blue" />
                      </div>
                      <div>
                        <div className="font-medium">{l.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{l.desc}</div>
                      </div>
                    </div>
                  </ChoiceCard>
                ))}
              </div>
            </Step>
          )}

          <div className="mt-10 flex items-center justify-between border-t border-border/70 pt-6">
            <Button variant="ghost" onClick={back} disabled={step === 0}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Zurück
            </Button>
            {step < 5 ? (
              <Button onClick={next} disabled={!canContinue()} size="lg"
                className="h-12 rounded-xl bg-gradient-primary px-7 font-semibold shadow-glow hover:opacity-95">
                Weiter <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            ) : (
              <Button onClick={finish} disabled={saving} size="lg"
                className="h-12 rounded-xl bg-gradient-primary px-7 font-semibold shadow-glow hover:opacity-95">
                {saving ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Speichert…</> : <>Fertig <Check className="h-4 w-4" aria-hidden="true" /></>}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Step = ({ eyebrow, title, subtitle, children }: { eyebrow: string; title: string; subtitle: string; children: React.ReactNode }) => (
  <div>
    <p className="text-sm font-medium text-accent-blue">{eyebrow}</p>
    <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] md:text-3xl">{title}</h1>
    <p className="mt-2 text-muted-foreground">{subtitle}</p>
    <div className="mt-8">{children}</div>
  </div>
);

const ChoiceCard = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button type="button" onClick={onClick}
    aria-pressed={active}
    className={`rounded-xl border p-4 text-left transition-[border-color,background-color,box-shadow] duration-200 active:translate-y-px ${
      active ? "border-accent-blue bg-accent/70 ring-1 ring-accent-blue" : "border-border bg-card hover:border-accent-blue/40 hover:shadow-card"
    }`}>
    {children}
  </button>
);

export default Onboarding;
