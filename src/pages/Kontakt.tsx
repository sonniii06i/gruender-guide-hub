import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Mail, MessageSquare, CheckCircle2, BookOpen, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { Seo } from "@/components/Seo";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PageHeader } from "@/components/landing/PageHeader";

const schema = z.object({
  name: z.string().trim().min(2, "Name zu kurz").max(100),
  email: z.string().trim().email("Ungültige E-Mail").max(255),
  subject: z.string().trim().min(3, "Betreff zu kurz").max(200),
  message: z.string().trim().min(10, "Bitte mindestens 10 Zeichen").max(4000),
});

const Kontakt = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", email: user?.email ?? "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = schema.safeParse(form);
    if (!res.success) { toast.error(res.error.issues[0].message); return; }
    setLoading(true);
    const ticketId = crypto.randomUUID();
    const { error } = await supabase.from("contact_tickets").insert({
      id: ticketId,
      name: res.data.name,
      email: res.data.email,
      subject: res.data.subject,
      message: res.data.message,
      user_id: user?.id ?? null,
    });
    if (error) { setLoading(false); toast.error(error.message); return; }

    // Fire-and-forget email notification (don't block UX on failure).
    // Nur die Ticket-ID: Empfaenger und Inhalt laedt die Function selbst
    // aus contact_tickets (kein offenes Mail-Relay).
    supabase.functions.invoke("send-ticket-email", {
      body: { ticketId },
    }).catch((err) => console.error("email send failed", err));

    setLoading(false);
    setDone(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Seo
        title="Kontakt | GründerX"
        description="Frag das GründerX-Team — zu Gründung, Steuern, Tools, Abo oder Kooperationen. Wir antworten zeitnah."
        path="/kontakt"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Kontakt",
          description:
            "Frag das GründerX-Team — zu Gründung, Steuern, Tools, Abo oder Kooperationen.",
          url: "https://gruenderx.de/kontakt",
          inLanguage: "de-DE",
          isPartOf: { "@type": "WebSite", name: "GründerX", url: "https://gruenderx.de" },
        }}
      />
      <Navbar />
      <main className="flex-1">
        <PageHeader
          width="max-w-5xl"
          crumbs={[{ label: "Start", to: "/" }, { label: "Kontakt" }]}
          kicker={
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[13px] font-medium text-muted-foreground shadow-card">
              <MessageSquare className="h-3.5 w-3.5 text-accent-blue" aria-hidden="true" /> Support
            </span>
          }
          title="Wie können wir helfen?"
          lead={
            <p>
              Schreib uns zu Gründung, Steuern, Tools, Abo oder Kooperationen. Wir antworten per E-Mail. Bei dringenden
              Steuer- oder Rechtsfragen bitte Priorität im Betreff vermerken.
            </p>
          }
        />

        <div className="container grid max-w-5xl gap-8 px-4 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <section aria-label="Kontaktformular" className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
            {done ? (
              <div className="py-8 text-center" role="status">
                <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-success-soft text-success">
                  <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                </span>
                <h2 className="text-xl font-semibold">Anfrage gesendet</h2>
                <p className="mt-2 text-muted-foreground">Wir melden uns per E-Mail an <strong className="font-semibold text-foreground">{form.email}</strong>.</p>
                <Button onClick={() => { setDone(false); setForm({ name: "", email: user?.email ?? "", subject: "", message: "" }); }} variant="outline" className="mt-6 rounded-xl">
                  Weitere Anfrage stellen
                </Button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Vor- und Nachname" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">E-Mail</Label>
                    <Input id="email" name="email" type="email" autoComplete="email" spellCheck={false} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="du@firma.de" required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="subject">Betreff</Label>
                  <Input id="subject" name="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="z. B. Frage zur US-LLC-Gründung" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message">Beschreibung</Label>
                  <Textarea id="message" name="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Beschreibe deinen Fall so genau wie möglich …" rows={7} required />
                  <p className="text-xs text-muted-foreground">Mindestens 10 Zeichen. Keine Passwörter oder Kontodaten mitschicken.</p>
                </div>
                <Button type="submit" size="lg" disabled={loading} className="h-12 w-full rounded-xl bg-gradient-primary font-semibold text-primary-foreground shadow-glow hover:opacity-95 sm:w-auto sm:px-8">
                  {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Wird gesendet …</> : <><Mail className="h-4 w-4" /> Anfrage absenden</>}
                </Button>
              </form>
            )}
          </section>

          <aside className="space-y-3" aria-label="Weitere Hilfe">
            <Link to="/faq" className="press group flex gap-3 rounded-xl border border-border bg-card p-4 hover:border-accent-blue/40 hover:shadow-card">
              <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent-blue" aria-hidden="true" />
              <span>
                <span className="block text-sm font-semibold">FAQ</span>
                <span className="block text-sm text-muted-foreground">Antworten zu Abo, Tools und Daten</span>
              </span>
            </Link>
            <Link to="/ratgeber" className="press group flex gap-3 rounded-xl border border-border bg-card p-4 hover:border-accent-blue/40 hover:shadow-card">
              <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-accent-blue" aria-hidden="true" />
              <span>
                <span className="block text-sm font-semibold">Ratgeber</span>
                <span className="block text-sm text-muted-foreground">Artikel zu Steuern, Recht und E-Commerce</span>
              </span>
            </Link>
            <p className="px-1 text-xs leading-relaxed text-muted-foreground">
              GründerX ist Software, keine Steuer- oder Rechtsberatung. Wie wir mit deiner Anfrage umgehen, steht in der{" "}
              <Link to="/datenschutz" className="underline underline-offset-2 hover:text-foreground">Datenschutzerklärung</Link>.
            </p>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Kontakt;
