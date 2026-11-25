import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Briefcase, Check, GraduationCap, Loader2, Package, Rocket, Route,
  ShoppingBag, Sparkles, Store, Wrench, type LucideIcon,
} from "lucide-react";
import Logo from "@/components/Logo";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useAccess, invalidateAccess } from "@/hooks/useAccess";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES } from "@/data/features";
import { GUIDE_COUNT, TOOL_COUNT } from "@/data/kennzahlen";
import { empfohleneGuides } from "@/lib/guideEmpfehlung";
import { readProfileCache, writeProfileCache } from "@/lib/profileCache";
import {
  GRUENDUNGS_GUIDE, empfohleneToolSlugs, fahrplan, profilMerkmale, rechtsformVon, type PlanSchritt,
} from "@/lib/startplan";
import {
  ALTER_OPTIONEN, MODELL_OPTIONEN, PHASE_OPTIONEN, RECHTSFORM_OPTIONEN, SCHRITTE_AENDERN, SCHRITTE_NEU, SCHRITT_FERTIG,
  einstieg, fehlerIn, rechtsformOption, type OnbSchritt,
} from "@/lib/onboarding";
import { cn } from "@/lib/utils";

const MODELL_ICON: Record<string, LucideIcon> = {
  amazon_fba: ShoppingBag, shopify: Store, creator: Sparkles, agency: Briefcase, saas: Rocket, other: Package,
};

const ART_LABEL: Record<PlanSchritt["art"], string> = { tool: "Tool", guide: "Guide", vergleich: "Vergleich" };
const TOOL_TITEL = new Map(CATEGORIES.flatMap((c) => c.features).map((f) => [f.slug, f.title]));

const FRAGE: Record<OnbSchritt, { titel: string; text: string }> = {
  name: { titel: "Wie heißt du?", text: "So sprechen wir dich im Cockpit an." },
  modell: { titel: "Was baust du auf?", text: "Mehrere Antworten sind möglich. Danach richten sich die Tools und Guides in deinem Cockpit." },
  phase: { titel: "Wo stehst du gerade?", text: "Davon hängt ab, welche Schritte dein Fahrplan zeigt." },
  rechtsform: { titel: "Welche Rechtsform hast oder planst du?", text: "„Noch offen“ ist eine gute Antwort, wenn du dich noch nicht entschieden hast." },
  details: {
    titel: "Firma und Anschrift",
    text: "Freiwillig. Die Anschrift ist beim Bezahlen dann schon eingetragen, und über die PLZ schlägt das Event-Radar Termine in deiner Region vor. Du kannst alles später im Profil ändern.",
  },
};

const Onboarding = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const aendernGewuenscht = params.get("bearbeiten") === "1";
  const nachZahlung = params.get("willkommen") === "1";
  const { user, loading: authLoading, signOut } = useAuth();
  const { loading: accLoading, hasActiveSub, isAdmin } = useAccess();
  const hatZugang = hasActiveSub || isAdmin;

  const [modus, setModus] = useState<"neu" | "aendern">("neu");
  const [schritt, setSchritt] = useState<OnbSchritt | "plan">("name");
  const [geladen, setGeladen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);

  const [salutation, setSalutation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [modelle, setModelle] = useState<string[]>([]);
  const [phase, setPhase] = useState("");
  const [rechtsform, setRechtsform] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("DE");
  const [vatId, setVatId] = useState("");
  const [taxId, setTaxId] = useState("");

  const titelRef = useRef<HTMLHeadingElement>(null);
  const vornameRef = useRef<HTMLInputElement>(null);
  const nachnameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [user, authLoading, navigate]);

  // Profil genau einmal je Konto laden. Ein erneuter Lauf (Token-Erneuerung tauscht
  // das user-Objekt) würde sonst Eingaben überschreiben oder von der Plan-Seite wegleiten.
  const geladenFuer = useRef<string | null>(null);
  useEffect(() => {
    if (!user || geladenFuer.current === user.id) return;
    geladenFuer.current = user.id;
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle().then(({ data }) => {
      if (data?.onboarding_completed && !aendernGewuenscht) {
        navigate("/dashboard", { replace: true });
        return;
      }
      if (data) {
        const m = data.business_model ? data.business_model.split(",").map((x) => x.trim()).filter(Boolean) : [];
        const form = rechtsformOption(data.legal_form);
        setSalutation(data.salutation ?? "");
        setFirstName(data.first_name ?? "");
        setLastName(data.last_name ?? "");
        setAgeGroup((data as any).age_group ?? readProfileCache(user.id)?.age_group ?? "");
        setCompanyName(data.company_name ?? "");
        setPhone(data.phone ?? "");
        setModelle(m);
        setPhase(data.founder_stage ?? "");
        setRechtsform(form);
        setStreet(data.street ?? "");
        setPostalCode(data.postal_code ?? "");
        setCity(data.city ?? "");
        setCountry(data.country ?? "DE");
        setVatId(data.vat_id ?? "");
        setTaxId(data.tax_id ?? "");
        if (data.onboarding_completed) {
          setModus("aendern");
          setSchritt(SCHRITTE_AENDERN[0]);
        } else {
          setSchritt(einstieg(
            { firstName: data.first_name ?? "", lastName: data.last_name ?? "", modelle: m, phase: data.founder_stage ?? "", rechtsform: form },
            data.onboarding_step,
          ));
        }
      }
      setGeladen(true);
    });
  }, [user, aendernGewuenscht, navigate]);

  const schritte = modus === "aendern" ? SCHRITTE_AENDERN : SCHRITTE_NEU;
  const index = schritt === "plan" ? schritte.length : schritte.indexOf(schritt);
  const daten = useMemo(() => ({ firstName, lastName, modelle, phase, rechtsform }), [firstName, lastName, modelle, phase, rechtsform]);
  const profil = useMemo(
    () => ({ business_model: modelle.join(","), founder_stage: phase || null, legal_form: rechtsform || null }),
    [modelle, phase, rechtsform],
  );
  const plan = useMemo(() => fahrplan(profil), [profil]);

  // Jede neue Antwort räumt die Fehlermeldung weg.
  useEffect(() => { setFehler(null); }, [daten]);

  // Schrittwechsel: nach oben, Fokus auf die Frage (beim Namen direkt ins Feld).
  const bereit = geladen && !authLoading && !accLoading && !!user;
  useEffect(() => {
    if (!bereit) return;
    window.scrollTo(0, 0);
    if (schritt === "name" && window.matchMedia("(pointer: fine)").matches) vornameRef.current?.focus();
    else titelRef.current?.focus();
  }, [schritt, bereit]);

  const patch = (s: OnbSchritt) => {
    switch (s) {
      case "name": return { first_name: firstName.trim(), last_name: lastName.trim() };
      case "modell": return { business_model: modelle.join(",") };
      case "phase": return { founder_stage: phase || null };
      case "rechtsform": return { legal_form: rechtsform || "unsure" };
      case "details": return {
        salutation: salutation || null,
        company_name: companyName.trim() || null,
        phone: phone.trim() || null,
        street: street.trim() || null,
        postal_code: postalCode.trim() || null,
        city: city.trim() || null,
        country: country.trim() || "DE",
        vat_id: vatId.trim() || null,
        tax_id: taxId.trim() || null,
      };
    }
  };

  const abschliessen = async (mitDetails: boolean) => {
    if (!user) return;
    setSaving(true);
    const felder = {
      ...patch("modell"), ...patch("phase"), ...patch("rechtsform"),
      ...(modus === "neu"
        ? { ...patch("name"), ...(mitDetails ? patch("details") : {}), onboarding_completed: true, onboarding_step: SCHRITT_FERTIG }
        : {}),
    };
    const { error } = await supabase.from("profiles").update(felder).eq("id", user.id);
    setSaving(false);
    if (error) {
      setFehler("Das Speichern hat nicht geklappt. Bitte versuch es noch einmal.");
      return;
    }
    writeProfileCache(user.id, {
      ...(readProfileCache(user.id) ?? {}),
      first_name: firstName.trim() || null,
      onboarding_completed: true,
      business_model: modelle.join(","),
      founder_stage: phase || null,
      legal_form: rechtsform || "unsure",
      age_group: ageGroup || null,
    });
    if (ageGroup) {
      supabase.from("profiles").update({ age_group: ageGroup } as any).eq("id", user.id).then(() => undefined, () => undefined);
    }
    // Gemeinsamen Zugangszustand sofort nachziehen, sonst leitet AppLayout
    // mit dem alten Stand zurück auf /onboarding.
    if (modus === "neu") void invalidateAccess({ onboardingCompleted: true });
    setSchritt("plan");
  };

  const weiter = (e?: FormEvent) => {
    e?.preventDefault();
    if (!user || schritt === "plan" || saving) return;
    const f = fehlerIn(schritt, daten);
    if (f) {
      setFehler(f);
      // Beim Namen direkt ins leere Feld, sonst bleibt der Fokus auf „Weiter“.
      if (schritt === "name") (firstName.trim() ? nachnameRef : vornameRef).current?.focus();
      return;
    }
    if (index === schritte.length - 1) { void abschliessen(true); return; }
    // Zwischenstand sichern: wer abbricht, macht beim nächsten Besuch hier weiter.
    // Beim Ändern wird erst am Ende gespeichert, damit „Abbrechen“ nichts verändert.
    if (modus === "neu") {
      supabase.from("profiles").update({ ...patch(schritt), onboarding_step: index + 1 }).eq("id", user.id)
        .then(() => undefined, () => undefined);
    }
    setSchritt(schritte[index + 1]);
  };

  const zurueck = () => { if (index > 0 && schritt !== "plan") setSchritt(schritte[index - 1]); };

  if (!bereit) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center" role="status">
        <Loader2 className="h-6 w-6 animate-spin text-accent-blue" aria-hidden="true" />
        <span className="sr-only">Lädt…</span>
      </div>
    );
  }

  const fortschritt = Math.round(((index + (schritt === "plan" ? 0 : 1)) / (schritte.length + (schritt === "plan" ? 0 : 1))) * 100);
  const freieRechtsform = rechtsform && !RECHTSFORM_OPTIONEN.some((o) => o.id === rechtsform) ? rechtsform : null;

  return (
    <div className="min-h-[100dvh] bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-2">
            <Logo asImage className="h-7 w-7" />
            <span className="font-semibold tracking-tight">GründerX</span>
          </div>
          <div className="flex items-center gap-4 text-[13px] text-muted-foreground">
            {schritt !== "plan" && <span className="tabular">Schritt {index + 1} von {schritte.length}</span>}
            {schritt !== "plan" && (modus === "aendern" ? (
              <Link to="/dashboard" className="font-medium hover:text-foreground hover:underline">Abbrechen</Link>
            ) : (
              <button type="button" onClick={() => void signOut()} className="font-medium hover:text-foreground hover:underline">Abmelden</button>
            ))}
          </div>
        </div>
        <div
          className="h-1 bg-secondary"
          role="progressbar"
          aria-valuenow={fortschritt}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Fortschritt der Einrichtung"
        >
          <div className="h-full bg-brand-green transition-[width] duration-300 ease-out" style={{ width: `${fortschritt}%` }} />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 md:py-12">
        {schritt === "plan" ? (
          <PlanSeite
            titelRef={titelRef}
            plan={plan}
            merkmale={profilMerkmale(profil)}
            vorname={firstName.trim()}
            geaendert={modus === "aendern"}
            hatZugang={hatZugang}
            tools={empfohleneToolSlugs(profil, 3).map((s) => TOOL_TITEL.get(s)).filter((t): t is string => !!t)}
            guides={empfohleneGuides(profil.business_model, 3, (() => { const f = rechtsformVon(rechtsform); return f ? GRUENDUNGS_GUIDE[f] : null; })(), ageGroup).map((g) => g.title)}
            rundgangHinweis={modus === "neu" && hatZugang}
          />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <form onSubmit={weiter} noValidate className="rounded-lg border border-border bg-card">
              <div className="px-5 py-6 md:px-8 md:py-8">
                {index === 0 && (
                  <p className="mb-4 text-[13px] font-medium text-muted-foreground">
                    {modus === "aendern"
                      ? "Angaben ändern. Dein Fahrplan richtet sich danach neu aus."
                      : nachZahlung
                        ? "Dein Konto steht. Noch vier kurze Fragen, dann ist dein Fahrplan fertig."
                        : "Vier kurze Fragen, dann steht dein Fahrplan."}
                  </p>
                )}
                <h1 ref={titelRef} tabIndex={-1} className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-balance focus:outline-none md:text-[1.75rem]">
                  {FRAGE[schritt].titel}
                </h1>
                <p className="mt-2 max-w-[58ch] text-[15px] leading-relaxed text-muted-foreground text-pretty">{FRAGE[schritt].text}</p>

                <div className="mt-7">
                  {schritt === "name" && (
                    <div className="space-y-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <Label htmlFor="ob-vorname">Vorname</Label>
                          <Input ref={vornameRef} id="ob-vorname" name="given-name" autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} aria-invalid={!!fehler && !firstName.trim()} />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="ob-nachname">Nachname</Label>
                          <Input ref={nachnameRef} id="ob-nachname" name="family-name" autoComplete="family-name" value={lastName} onChange={(e) => setLastName(e.target.value)} aria-invalid={!!fehler && !!firstName.trim() && !lastName.trim()} />
                        </div>
                      </div>
                      <fieldset>
                        <legend className="mb-2 text-sm font-medium text-foreground">
                          In welchem Alter befindest du dich? <span className="font-normal text-muted-foreground">(freiwillig, für passende Guide-Vorschläge)</span>
                        </legend>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {ALTER_OPTIONEN.map((o) => (
                            <Wahl
                              key={o.id}
                              typ="radio"
                              name="ageGroup"
                              titel={o.titel}
                              text={o.text}
                              checked={ageGroup === o.id}
                              onChange={() => setAgeGroup(o.id)}
                            />
                          ))}
                        </div>
                        {ageGroup === "12-17" && (
                          <p className="mt-2.5 rounded-lg border border-brand-green/30 bg-brand-green-soft/60 px-3.5 py-2 text-xs text-foreground">
                            Hinweis für Jugendliche und Eltern: Alle Guides stehen offen. Wo Verträge oder ein Gewerbe nötig sind, zeigen wir direkt den Ablauf mit Eltern und Familiengericht (§ 112 BGB).
                          </p>
                        )}
                      </fieldset>
                    </div>
                  )}

                  {schritt === "modell" && (
                    <fieldset>
                      <legend className="sr-only">Geschäftsmodell, Mehrfachauswahl</legend>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {MODELL_OPTIONEN.map((o) => (
                          <Wahl
                            key={o.id}
                            typ="checkbox"
                            name="modell"
                            titel={o.titel}
                            text={o.text}
                            icon={MODELL_ICON[o.id]}
                            checked={modelle.includes(o.id)}
                            onChange={() => setModelle((alt) => (alt.includes(o.id) ? alt.filter((x) => x !== o.id) : [...alt, o.id]))}
                          />
                        ))}
                      </div>
                    </fieldset>
                  )}

                  {schritt === "phase" && (
                    <fieldset>
                      <legend className="sr-only">Phase</legend>
                      <div className="grid gap-2.5">
                        {PHASE_OPTIONEN.map((o) => (
                          <Wahl key={o.id} typ="radio" name="phase" titel={o.titel} text={o.text} checked={phase === o.id} onChange={() => setPhase(o.id)} />
                        ))}
                      </div>
                    </fieldset>
                  )}

                  {schritt === "rechtsform" && (
                    <fieldset>
                      <legend className="sr-only">Rechtsform</legend>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {RECHTSFORM_OPTIONEN.map((o) => (
                          <Wahl key={o.id} typ="radio" name="rechtsform" titel={o.titel} text={o.text} checked={rechtsform === o.id} onChange={() => setRechtsform(o.id)} />
                        ))}
                        {freieRechtsform && (
                          <Wahl typ="radio" name="rechtsform" titel={freieRechtsform} text="Aus deinem Profil" checked onChange={() => undefined} />
                        )}
                      </div>
                    </fieldset>
                  )}

                  {schritt === "details" && (
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-[160px_minmax(0,1fr)]">
                        <div className="space-y-1.5">
                          <Label htmlFor="ob-anrede">Anrede</Label>
                          <Select value={salutation} onValueChange={setSalutation}>
                            <SelectTrigger id="ob-anrede"><SelectValue placeholder="Keine Angabe" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Herr">Herr</SelectItem>
                              <SelectItem value="Frau">Frau</SelectItem>
                              <SelectItem value="Divers">Divers</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="ob-firma">Firmenname</Label>
                          <Input id="ob-firma" name="organization" autoComplete="organization" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="z. B. Muster Handels UG…" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="ob-strasse">Straße und Hausnummer</Label>
                        <Input id="ob-strasse" name="street-address" autoComplete="street-address" value={street} onChange={(e) => setStreet(e.target.value)} />
                      </div>
                      <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-4 sm:grid-cols-[110px_minmax(0,1fr)_110px]">
                        <div className="space-y-1.5">
                          <Label htmlFor="ob-plz">PLZ</Label>
                          <Input id="ob-plz" name="postal-code" autoComplete="postal-code" inputMode="numeric" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="ob-ort">Ort</Label>
                          <Input id="ob-ort" name="address-level2" autoComplete="address-level2" value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="col-span-2 space-y-1.5 sm:col-span-1">
                          <Label htmlFor="ob-land">Land</Label>
                          <Input id="ob-land" name="country" autoComplete="country" value={country} onChange={(e) => setCountry(e.target.value)} />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="ob-ustid">USt-IdNr.</Label>
                          <Input id="ob-ustid" name="vat-id" autoComplete="off" spellCheck={false} value={vatId} onChange={(e) => setVatId(e.target.value)} placeholder="DE123456789…" />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="ob-steuernr">Steuernummer</Label>
                          <Input id="ob-steuernr" name="tax-id" autoComplete="off" spellCheck={false} value={taxId} onChange={(e) => setTaxId(e.target.value)} />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="ob-telefon">Telefon</Label>
                          <Input id="ob-telefon" name="tel" type="tel" autoComplete="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+49…" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <p role="alert" aria-live="polite" className={cn("text-sm font-medium text-destructive", fehler ? "mt-4" : "sr-only")}>{fehler}</p>
              </div>

              {/* Letzter Schritt hat drei Knöpfe: auf dem Handy der Hauptknopf über die
                  volle Breite, darunter Zurück und Überspringen in einer Zeile. */}
              <div className={cn(
                "items-center gap-3 border-t border-border px-5 py-4 md:px-8",
                schritt === "details" ? "grid grid-cols-2 sm:flex sm:justify-between" : "flex justify-between",
              )}>
                {index > 0 ? (
                  <Button type="button" variant="ghost" onClick={zurueck} disabled={saving} className="justify-self-start">
                    <ArrowLeft aria-hidden="true" /> Zurück
                  </Button>
                ) : <span />}
                <div className={cn("items-center gap-2", schritt === "details" ? "contents sm:flex" : "flex")}>
                  {schritt === "details" && (
                    <Button type="button" variant="outline" onClick={() => void abschliessen(false)} disabled={saving} className="justify-self-end">Überspringen</Button>
                  )}
                  <Button type="submit" size="lg" disabled={saving} className={cn(schritt === "details" && "order-first col-span-2 sm:order-none")}>
                    {saving ? (
                      <><Loader2 className="animate-spin" aria-hidden="true" /> Speichert…</>
                    ) : index === schritte.length - 1 ? (
                      <>{modus === "aendern" ? "Speichern" : "Speichern und Fahrplan ansehen"} <ArrowRight aria-hidden="true" /></>
                    ) : (
                      <>Weiter <ArrowRight aria-hidden="true" /></>
                    )}
                  </Button>
                </div>
              </div>
            </form>

            <PlanVorschau plan={plan} merkmale={profilMerkmale(profil)} />
          </div>
        )}
      </main>
    </div>
  );
};

/** Auswahlzeile mit echtem Radio bzw. Checkbox dahinter: Tastatur und Screenreader bekommen die native Bedienung. */
const Wahl = ({
  typ, name, titel, text, icon: Icon, checked, onChange,
}: { typ: "radio" | "checkbox"; name: string; titel: string; text?: string; icon?: LucideIcon; checked: boolean; onChange: () => void }) => (
  <label
    className={cn(
      "flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 transition-colors duration-150 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/40",
      checked ? "border-primary bg-secondary/70" : "border-border bg-card hover:border-foreground/30",
    )}
  >
    <input type={typ} name={name} checked={checked} onChange={onChange} className="sr-only" />
    <span
      aria-hidden="true"
      className={cn(
        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors duration-150",
        typ === "radio" ? "rounded-full" : "rounded",
        checked ? "border-primary bg-primary text-primary-foreground" : "border-foreground/30 bg-card",
      )}
    >
      {checked && (typ === "radio" ? <span className="h-2 w-2 rounded-full bg-current" /> : <Check className="h-3.5 w-3.5" strokeWidth={2.5} />)}
    </span>
    <span className="min-w-0 flex-1">
      <span className="block text-sm font-medium leading-snug">{titel}</span>
      {text && <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">{text}</span>}
    </span>
    {Icon && <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />}
  </label>
);

const Merkmale = ({ merkmale, className }: { merkmale: string[]; className?: string }) =>
  merkmale.length === 0 ? null : (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Deine Angaben">
      {merkmale.map((m) => (
        <li key={m} className="rounded border border-border bg-background px-2 py-1 text-xs font-medium text-foreground/80">{m}</li>
      ))}
    </ul>
  );

/** Rechte Spalte während der Fragen: der Fahrplan, wie er sich aus den bisherigen Antworten ergibt. */
const PlanVorschau = ({ plan, merkmale }: { plan: PlanSchritt[]; merkmale: string[] }) => (
  <aside className="hidden lg:sticky lg:top-8 lg:block" aria-label="Vorschau auf deinen Fahrplan">
    <div className="rounded-lg border border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <h2 className="flex items-center gap-2 text-[15px] font-semibold leading-tight">
          <Route className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          Dein Fahrplan
        </h2>
        <p className="mt-1 text-[13px] leading-snug text-muted-foreground">Vorschau. Er passt sich mit jeder Antwort an.</p>
        <Merkmale merkmale={merkmale} className="mt-2.5" />
      </div>
      <ol className="divide-y divide-border">
        {plan.map((s, i) => (
          <li key={s.id} className="flex items-start gap-3 px-4 py-2.5">
            <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded border border-foreground/20 text-[11px] font-semibold text-muted-foreground tabular">{i + 1}</span>
            <span className="min-w-0 flex-1 text-sm leading-snug">{s.titel}</span>
          </li>
        ))}
      </ol>
      <p className="border-t border-border px-4 py-2.5 text-xs leading-relaxed text-muted-foreground tabular">
        Dazu im Cockpit: {TOOL_COUNT} Tools und {GUIDE_COUNT} Guides.
      </p>
    </div>
  </aside>
);

const KurzListe = ({ titel, icon: Icon, punkte }: { titel: string; icon: LucideIcon; punkte: string[] }) =>
  punkte.length === 0 ? null : (
    <section className="rounded-lg border border-border bg-card">
      <h2 className="flex items-center gap-2 border-b border-border px-4 py-3 text-[15px] font-semibold leading-tight">
        <Icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        {titel}
      </h2>
      <ul className="divide-y divide-border">
        {punkte.map((p) => <li key={p} className="px-4 py-2.5 text-sm leading-snug">{p}</li>)}
      </ul>
    </section>
  );

/** Abschluss: der fertige Fahrplan und ein Knopf in den ersten Schritt. */
const PlanSeite = ({
  titelRef, plan, merkmale, vorname, geaendert, hatZugang, tools, guides, rundgangHinweis,
}: {
  titelRef: React.RefObject<HTMLHeadingElement>;
  plan: PlanSchritt[];
  merkmale: string[];
  vorname: string;
  geaendert: boolean;
  hatZugang: boolean;
  tools: string[];
  guides: string[];
  rundgangHinweis?: boolean;
}): ReactNode => {
  const erster = plan[0];
  return (
    <div className="mx-auto max-w-3xl">
      <section className="rounded-lg border border-border bg-card">
        <div className="px-5 py-6 md:px-8 md:py-8">
          <p className="flex items-center gap-1.5 text-[13px] font-medium text-brand-green">
            <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" /> {geaendert ? "Angaben gespeichert" : "Profil gespeichert"}
          </p>
          <h1 ref={titelRef} tabIndex={-1} className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.02em] text-balance focus:outline-none md:text-[1.75rem]">
            {geaendert ? "Dein Fahrplan ist angepasst" : "Dein Fahrplan steht"}{vorname ? `, ${vorname}` : ""}.
          </h1>
          <p className="mt-2 max-w-[58ch] text-[15px] leading-relaxed text-muted-foreground text-pretty">
            <span className="tabular">{plan.length}</span> Schritte für deine Phase. Im Cockpit hakst du sie ab und siehst immer, was als Nächstes dran ist.
          </p>
          <Merkmale merkmale={merkmale} className="mt-4" />
        </div>

        <ol className="divide-y divide-border border-t border-border">
          {plan.map((s, i) => (
            <li key={s.id} className={cn("flex items-start gap-3 px-5 py-3 md:px-8", i === 0 && "bg-secondary/50")}>
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-foreground/25 bg-card text-[11px] font-semibold text-muted-foreground tabular">{i + 1}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium leading-snug">{s.titel}</span>
                <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground text-pretty">{s.warum}</span>
              </span>
              <span className="mt-0.5 hidden shrink-0 text-xs text-muted-foreground sm:inline">{ART_LABEL[s.art]}</span>
            </li>
          ))}
        </ol>

        <div className="border-t border-border px-5 py-5 md:px-8">
          {hatZugang ? (
            <>
              <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
                {erster && (
                  <Button asChild size="lg">
                    <Link to={erster.ziel}>{erster.art === "guide" ? "Ersten Guide ansehen" : "Ersten Schritt öffnen"} <ArrowRight aria-hidden="true" /></Link>
                  </Button>
                )}
                <Button asChild size="lg" variant="outline">
                  <Link to="/dashboard">Zum Cockpit</Link>
                </Button>
              </div>
              {rundgangHinweis && (
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground text-pretty">
                  Beim ersten Besuch im Cockpit zeigen wir dir in etwa einer Minute, wo alles steht.
                </p>
              )}
            </>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[46ch] text-[13px] leading-relaxed text-muted-foreground text-pretty">
                Tools und Guides gehören zum GründerX-Zugang. Den Preis siehst du auf der nächsten Seite.
              </p>
              <Button asChild size="lg" className="shrink-0">
                <Link to="/dashboard">Zugang freischalten <ArrowRight aria-hidden="true" /></Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <KurzListe titel="Passende Tools" icon={Wrench} punkte={tools} />
        <KurzListe titel="Passende Guides" icon={GraduationCap} punkte={guides} />
      </div>
    </div>
  );
};

export default Onboarding;
