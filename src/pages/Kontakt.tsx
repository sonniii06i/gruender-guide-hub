import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, Mail, MessageSquare, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

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

    // Fire-and-forget email notification (don't block UX on failure)
    supabase.functions.invoke("send-ticket-email", {
      body: { ticketId, ...res.data },
    }).catch((err) => console.error("email send failed", err));

    setLoading(false);
    setDone(true);
  };

  return (
    <div className="min-h-screen bg-hero">
      <div className="container max-w-3xl py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Zurück
        </Link>
      </div>
      <div className="container max-w-2xl pb-20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-blue/10 border border-accent-blue/20 px-3 py-1 text-xs font-semibold text-accent-blue mb-4">
            <MessageSquare className="h-3.5 w-3.5" /> Support
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Wie können wir helfen?</h1>
          <p className="mt-3 text-muted-foreground">
            Antwort innerhalb von 24h – meist schneller. Bei dringenden Steuer-/Rechtsfragen bitte Priorität im Betreff vermerken.
          </p>
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 shadow-card">
          {done ? (
            <div className="text-center py-8">
              <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-3" />
              <h2 className="text-xl font-bold">Anfrage gesendet!</h2>
              <p className="text-muted-foreground mt-2">Wir melden uns per E-Mail an <strong>{form.email}</strong>.</p>
              <Button onClick={() => { setDone(false); setForm({ name: "", email: user?.email ?? "", subject: "", message: "" }); }} variant="outline" className="mt-6 rounded-full">
                Weitere Anfrage stellen
              </Button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Max Mustermann" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">E-Mail</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="du@firma.de" required />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="subject">Betreff</Label>
                <Input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="z. B. Frage zur US-LLC Gründung" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">Beschreibung</Label>
                <Textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Beschreibe deinen Fall so detailliert wie möglich…" rows={7} required />
              </div>
              <Button type="submit" size="lg" disabled={loading} className="w-full rounded-full bg-gradient-primary text-primary-foreground hover:opacity-95 shadow-glow h-12 font-semibold">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Mail className="h-4 w-4 mr-2" /> Anfrage absenden</>}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Kontakt;
