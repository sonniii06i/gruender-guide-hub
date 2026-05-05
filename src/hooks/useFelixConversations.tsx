import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type FelixConversation = {
  id: string;
  title: string;
  last_message_at: string;
};

const EVENT = "felix:convs-changed";

export const notifyConversationsChanged = () => {
  window.dispatchEvent(new CustomEvent(EVENT));
};

export const useFelixConversations = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<FelixConversation[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!user) {
      setConversations([]);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from("chat_conversations")
      .select("id, title, last_message_at")
      .eq("user_id", user.id)
      .order("last_message_at", { ascending: false });
    setConversations((data as FelixConversation[]) ?? []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    load();
    const handler = () => load();
    window.addEventListener(EVENT, handler);
    return () => window.removeEventListener(EVENT, handler);
  }, [load]);

  return { conversations, loading, reload: load };
};
