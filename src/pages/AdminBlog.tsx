import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw, Sparkles, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface TopicRow {
  id: string;
  topic: string;
  keyword_primary: string;
  category: string;
  scheduled_for: string;
  consumed_at: string | null;
  last_error: string | null;
}

interface PostRow {
  id: string;
  slug: string;
  title: string;
  status: string;
  category: string;
  published_at: string | null;
  view_count: number;
  created_at: string;
}

const AdminBlog = () => {
  const [topics, setTopics] = useState<TopicRow[]>([]);
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<string | null>(null);

  const reload = async () => {
    setLoading(true);
    const [t, p] = await Promise.all([
      supabase.from("blog_topic_queue").select("*").order("scheduled_for", { ascending: true }).limit(100),
      supabase.from("blog_posts").select("id,slug,title,status,category,published_at,view_count,created_at").order("created_at", { ascending: false }).limit(100),
    ]);
    setTopics((t.data || []) as TopicRow[]);
    setPosts((p.data || []) as PostRow[]);
    setLoading(false);
  };

  useEffect(() => { reload(); }, []);

  const triggerGenerate = async (topicId?: string) => {
    setGenerating(topicId || "next");
    try {
      const { data, error } = await supabase.functions.invoke("generate-blog-post", {
        body: topicId ? { topic_id: topicId } : {},
      });
      if (error) throw error;
      if (data?.ok === false) throw new Error(data.error || "Generierung fehlgeschlagen");
      if (data?.skipped) {
        toast.info("Kein fälliges Topic verfügbar.");
      } else {
        toast.success(`Artikel "${data.slug}" als ${data.status} erstellt.`);
      }
      await reload();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Fehler");
    } finally {
      setGenerating(null);
    }
  };

  const publishDraft = async (postId: string) => {
    const { error } = await supabase
      .from("blog_posts")
      .update({ status: "published", published_at: new Date().toISOString() })
      .eq("id", postId);
    if (error) toast.error(error.message);
    else { toast.success("Veröffentlicht"); reload(); }
  };

  return (
    <div className="container max-w-6xl py-10 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Ratgeber-Verwaltung</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Automatisierte Blog-Generierung: 2× pro Woche (Di/Fr 06:00 UTC) wird der nächste fällige Topic verarbeitet.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap shrink-0">
          <Button variant="outline" size="sm" onClick={reload}>
            <RefreshCw className="h-4 w-4 mr-2" /> Aktualisieren
          </Button>
          <Button size="sm" onClick={() => triggerGenerate()} disabled={generating !== null}>
            {generating === "next" ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
            Jetzt nächsten Post generieren
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Lädt …</p>
      ) : (
        <>
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Posts ({posts.length})</h2>
            <div className="rounded-xl border border-border overflow-hidden overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left p-3">Titel</th>
                    <th className="text-left p-3">Kategorie</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Veröffentlicht</th>
                    <th className="text-left p-3">Views</th>
                    <th className="text-left p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {posts.length === 0 && (
                    <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">Noch keine Posts. Klick "Jetzt generieren".</td></tr>
                  )}
                  {posts.map((p) => (
                    <tr key={p.id} className="border-t border-border">
                      <td className="p-3 font-medium">{p.title}</td>
                      <td className="p-3"><Badge variant="secondary">{p.category}</Badge></td>
                      <td className="p-3">
                        <Badge variant={p.status === "published" ? "default" : "outline"}>{p.status}</Badge>
                      </td>
                      <td className="p-3 text-muted-foreground">{p.published_at ? new Date(p.published_at).toLocaleDateString("de-DE") : "—"}</td>
                      <td className="p-3 text-muted-foreground">{p.view_count}</td>
                      <td className="p-3 flex gap-2">
                        {p.status === "published" && (
                          <Link to={`/ratgeber/${p.slug}`} target="_blank" className="text-accent-blue hover:underline inline-flex items-center text-xs">
                            Ansehen <ExternalLink className="h-3 w-3 ml-1" />
                          </Link>
                        )}
                        {p.status === "draft" && (
                          <Button size="sm" variant="outline" onClick={() => publishDraft(p.id)}>Veröffentlichen</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Topic-Queue ({topics.filter(t => !t.consumed_at).length} offen)</h2>
            <div className="rounded-xl border border-border overflow-hidden overflow-x-auto">
              <table className="w-full text-sm min-w-[560px]">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left p-3">Topic</th>
                    <th className="text-left p-3">Keyword</th>
                    <th className="text-left p-3">Geplant</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {topics.map((t) => (
                    <tr key={t.id} className="border-t border-border">
                      <td className="p-3">{t.topic}</td>
                      <td className="p-3 text-muted-foreground"><code className="text-xs">{t.keyword_primary}</code></td>
                      <td className="p-3 text-muted-foreground">{new Date(t.scheduled_for).toLocaleDateString("de-DE")}</td>
                      <td className="p-3">
                        {t.consumed_at ? <Badge variant="secondary">erledigt</Badge> : <Badge variant="outline">offen</Badge>}
                        {t.last_error && <p className="text-xs text-destructive mt-1">{t.last_error}</p>}
                      </td>
                      <td className="p-3">
                        {!t.consumed_at && (
                          <Button size="sm" variant="ghost" onClick={() => triggerGenerate(t.id)} disabled={generating !== null}>
                            {generating === t.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Jetzt generieren"}
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default AdminBlog;
