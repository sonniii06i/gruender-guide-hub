import Logo from "@/components/Logo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Loader2,
  Rocket,
  ShoppingBag,
  Sparkles,
  Store,
  Users,
  Briefcase,
  Globe,
  Package,
} from "lucide-react";

type Step = 0 | 1 | 2 | 3 | 4;

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
  const [step, setStep] = useState<Step>(0);
  const [saving, setSaving] = useState(false);

  const [salutation, setSalutation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessModel, setBusinessModel] = useState("");
  const [stage, setStage] = useState("");
  const [legalForm, setLegalForm] = useState("");

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("onboarding_completed, onboarding_step, salutation, company_name, phone, business_model, legal_form")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.onboarding_completed) {
          navigate("/dashboard", { replace: true });
        } else if (data) {
          setSalutation(data.salutation ?? "");
          setCompanyName(data.company_name ?? "");
          setPhone(data.phone ?? "");
          setBusinessModel(data.business_model ?? "");
          setLegalForm(data.legal_form ?? "");
        }
      });
  }, [user, navigate]);

  const totalSteps = 5;
  const progress = ((step + 1) / totalSteps) * 100;

  const next = () => setStep((s) => Math.min(4, s + 1) as Step);
  const back = () => setStep((s) => Math.max(0, s - 1) as Step);

  const finish = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({
      salutation,
      company_name: companyName,
      phone,
      business_model: businessModel,
      legal_form: legalForm,
      onboarding_completed: true,
      onboarding_step: 5,
    }).eq("id", user.id);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Willkommen an Bord! 🚀");
    navigate("/dashboard");
  };

  const canContinue = () => {
    if (step === 0) return !!salutation;
    if (step === 1) return !!companyName.trim();
    if (step === 2) return !!businessModel;
    if (step === 3) return !!stage;
    if (step === 4) return !!legalForm;
    return false;
  };

  return (
    <div className="min-h-screen bg-hero">
      <div className="container max-w-2xl py-8">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Logo className="h-8 w-8" />
              <span className="font-bold tracking-tight">GründerX</span>
            </div>
            <span className="text-xs font-semibold text-muted-foreground">Schritt {step + 1} von {totalSteps}</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-primary transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-card">
          {step === 0 && (
            <Step
              eyebrow="Schön dich kennenzulernen"
              title="Wie sollen wir dich ansprechen?"
              subtitle="Felix nutzt das in jeder Antwort."
            >
              <div className="grid grid-cols-3 gap-3">
                {["Herr", "Frau", "Divers"].map((s) => (
                  <ChoiceCard key={s} active={salutation === s} onClick={() => setSalutation(s)}>
                    {s}
                  </ChoiceCard>
                ))}
              </div>
            </Step>
          )}

          {step === 1 && (
            <Step
              eyebrow="Dein Vorhaben"
              title="Hast du schon einen Firmennamen?"
              subtitle="Kein Stress – du kannst das später noch ändern."
            >
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="company">Firmenname (oder Arbeitstitel)</Label>
                  <Input id="company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="z. B. Acme GmbH oder MeinShop" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Telefon (optional)</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+49 …" />
                </div>
              </div>
            </Step>
          )}

          {step === 2 && (
            <Step
              eyebrow="Geschäftsmodell"
              title="Was willst du aufbauen?"
              subtitle="Damit Felix dir die richtigen Tools, Anbieter und Schritte zeigt."
            >
              <div className="grid sm:grid-cols-2 gap-3">
                {businessModels.map((b) => (
                  <ChoiceCard key={b.id} active={businessModel === b.id} onClick={() => setBusinessModel(b.id)}>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-accent-blue/10 flex items-center justify-center">
                        <b.icon className="h-4 w-4 text-accent-blue" />
                      </div>
                      <span className="font-medium">{b.label}</span>
                    </div>
                  </ChoiceCard>
                ))}
              </div>
            </Step>
          )}

          {step === 3 && (
            <Step
              eyebrow="Status quo"
              title="Wo stehst du gerade?"
              subtitle="Felix passt das Tempo an dich an."
            >
              <div className="grid sm:grid-cols-2 gap-3">
                {stages.map((s) => (
                  <ChoiceCard key={s.id} active={stage === s.id} onClick={() => setStage(s.id)}>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-accent-blue/10 flex items-center justify-center">
                        <s.icon className="h-4 w-4 text-accent-blue" />
                      </div>
                      <span className="font-medium">{s.label}</span>
                    </div>
                  </ChoiceCard>
                ))}
              </div>
            </Step>
          )}

          {step === 4 && (
            <Step
              eyebrow="Rechtsform"
              title="Hast du schon eine Rechtsform im Kopf?"
              subtitle="Wenn nicht – Felix führt dich durch den Vergleich."
            >
              <div className="grid sm:grid-cols-2 gap-3">
                {legalForms.map((l) => (
                  <ChoiceCard key={l.id} active={legalForm === l.id} onClick={() => setLegalForm(l.id)}>
                    <div className="flex items-start gap-3">
                      <div className="h-9 w-9 rounded-lg bg-accent-blue/10 flex items-center justify-center flex-shrink-0">
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

          {/* Nav */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
            <Button
              variant="ghost"
              onClick={back}
              disabled={step === 0}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Zurück
            </Button>

            {step < 4 ? (
              <Button
                onClick={next}
                disabled={!canContinue()}
                size="lg"
                className="rounded-full bg-gradient-primary text-primary-foreground hover:opacity-95 shadow-glow h-12 px-7 font-semibold"
              >
                Weiter <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={finish}
                disabled={!canContinue() || saving}
                size="lg"
                className="rounded-full bg-gradient-primary text-primary-foreground hover:opacity-95 shadow-glow h-12 px-7 font-semibold"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Fertig <Check className="h-4 w-4 ml-1" /></>}
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
    <p className="text-xs font-semibold uppercase tracking-wider text-accent-blue mb-3">{eyebrow}</p>
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
    <p className="mt-2 text-muted-foreground">{subtitle}</p>
    <div className="mt-8">{children}</div>
  </div>
);

const ChoiceCard = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-left rounded-2xl border-2 p-4 transition-all hover:-translate-y-0.5 ${
      active
        ? "border-accent-blue bg-accent-blue/5 shadow-glow"
        : "border-border bg-card hover:border-accent-blue/40"
    }`}
  >
    {children}
  </button>
);

export default Onboarding;
