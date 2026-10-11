import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { KitTable } from "@/components/cockpit/kit";
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
    <div className="container max-w-6xl px-4 pb-16 pt-8 md:px-6 md:pt-10">
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-border/70 pb-7 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-accent-blue">Admin</p>
          <h1 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em] md:text-[2.25rem]">Ratgeber-Verwaltung</h1>
          <p className="mt-3 max-w-[68ch] text-[15px] text-muted-foreground">
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
        <div className="space-y-3" aria-busy="true"><span className="sr-only">Lädt…</span>{[0, 1, 2].map((i) => <div key={i} className="h-12 animate-pulse rounded-xl bg-secondary" />)}</div>
      ) : (
        <>
          <section className="mb-12">
            <h2 className="mb-4 text-lg font-semibold tracking-tight">Posts <span className="text-muted-foreground tabular">({posts.length})</span></h2>
            <KitTable caption="Posts" className="[&_table]:min-w-[640px]">
                <thead>
                  <tr>
                    <th>Titel</th>
                    <th>Kategorie</th>
                    <th>Status</th>
                    <th>Veröffentlicht</th>
                    <th>Aufrufe</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {posts.length === 0 && (
                    <tr><td colSpan={6} className="text-center text-muted-foreground">Noch keine Posts. Klick auf „Jetzt nächsten Post generieren“.</td></tr>
                  )}
                  {posts.map((p) => (
                    <tr key={p.id}>
                      <td className="font-medium">{p.title}</td>
                      <td><Badge variant="secondary">{p.category}</Badge></td>
                      <td>
                        <Badge variant={p.status === "published" ? "default" : "outline"}>{p.status}</Badge>
                      </td>
                      <td className="text-muted-foreground">{p.published_at ? new Date(p.published_at).toLocaleDateString("de-DE") : "-"}</td>
                      <td className="text-muted-foreground">{p.view_count}</td>
                      <td className="flex gap-2">
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
            </KitTable>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-semibold tracking-tight">Topic-Queue <span className="text-muted-foreground tabular">({topics.filter(t => !t.consumed_at).length} offen)</span></h2>
            <KitTable caption="Topic-Queue" className="[&_table]:min-w-[560px]">
                <thead>
                  <tr>
                    <th>Topic</th>
                    <th>Keyword</th>
                    <th>Geplant</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {topics.map((t) => (
                    <tr key={t.id}>
                      <td>{t.topic}</td>
                      <td className="text-muted-foreground"><code className="text-xs">{t.keyword_primary}</code></td>
                      <td className="text-muted-foreground">{new Date(t.scheduled_for).toLocaleDateString("de-DE")}</td>
                      <td>
                        {t.consumed_at ? <Badge variant="secondary">erledigt</Badge> : <Badge variant="outline">offen</Badge>}
                        {t.last_error && <p className="text-xs text-destructive mt-1">{t.last_error}</p>}
                      </td>
                      <td>
                        {!t.consumed_at && (
                          <Button size="sm" variant="ghost" onClick={() => triggerGenerate(t.id)} disabled={generating !== null}>
                            {generating === t.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Jetzt generieren"}
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
            </KitTable>
          </section>
        </>
      )}
    </div>
  );
};

export default AdminBlog;
