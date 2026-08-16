import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

type Announcement = {
  id: string;
  title: string;
  body: string;
  tag: string;
  created_at: string;
};

const tagVariant = (tag: string) =>
  tag === "Security" ? "destructive" : tag === "Maintenance" ? "secondary" : "default";

const AnnouncementsTab = () => {
  const [items, setItems] = useState<Announcement[]>([]);

  useEffect(() => {
    supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setItems((data as Announcement[]) ?? []));
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-foreground">Announcements</h3>
        <p className="text-sm text-muted-foreground">Product updates and service notices</p>
      </div>

      {items.length === 0 && (
        <Card className="bg-gradient-card border-border p-8 shadow-card text-center text-muted-foreground">
          No announcements yet.
        </Card>
      )}

      {items.map((a) => (
        <Card key={a.id} className="bg-gradient-card border-border p-6 shadow-card">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <Badge variant={tagVariant(a.tag)}>{a.tag}</Badge>
            <h4 className="font-semibold text-foreground">{a.title}</h4>
            <span className="text-xs text-muted-foreground ml-auto">
              {new Date(a.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{a.body}</p>
        </Card>
      ))}
    </div>
  );
};

export default AnnouncementsTab;
