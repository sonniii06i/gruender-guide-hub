import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Gift, Percent } from "lucide-react";

// Erscheint nach dem Kauf: Kaeufer wird Affiliate und bekommt sofort seinen
// Reflink (20 % lebenslang) zum Teilen.
export function AffiliateSuccessBanner() {
  const { toast } = useToast();
  const [link, setLink] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.functions.invoke("manage-affiliate", { body: { action: "me" } });
      if ((data as any)?.ref_link) setLink((data as any).ref_link);
    })();
  }, []);

  const copy = async () => { if (link) { await navigator.clipboard.writeText(link); toast({ title: "Kopiert!", description: "Dein Reflink ist in der Zwischenablage." }); } };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-6 mb-6">
      <div className="flex items-center gap-2 text-primary mb-1"><Gift className="h-5 w-5" /><span className="font-semibold">Danke für deinen Kauf! 🎉</span></div>
      <h3 className="text-lg font-bold flex items-center gap-1.5"><Percent className="h-4 w-4 text-primary" /> Verdiene 20 % – lebenslang</h3>
      <p className="text-sm text-muted-foreground mt-1 mb-3">Empfiehl GründerX, AnwaltX oder das Founder-Bundle. Für <strong>jede Zahlung</strong> deiner Geworbenen bekommst du dauerhaft 20 % – in echtem Geld. Teile einfach deinen Link:</p>
      {link ? (
        <div className="flex flex-col sm:flex-row gap-2">
          <Input readOnly value={link} className="font-mono text-sm" onFocus={(e) => e.currentTarget.select()} />
          <Button onClick={copy} className="shrink-0"><Copy className="h-4 w-4 mr-1.5" /> Kopieren</Button>
          <Button asChild variant="outline" className="shrink-0"><Link to="/affiliate">Details</Link></Button>
        </div>
      ) : (
        <Button asChild><Link to="/affiliate">Zum Partnerprogramm</Link></Button>
      )}
    </div>
  );
}
