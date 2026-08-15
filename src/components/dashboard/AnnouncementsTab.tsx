import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Announcement = {
  title: string;
  body: string;
  date: string;
  tag: "Update" | "Maintenance" | "Security" | "News";
  unread?: boolean;
};

const announcements: Announcement[] = [
  {
    title: "New L7 fingerprinting engine is live",
    body: "Our updated bot-detection engine now identifies headless browsers 3x faster with fewer false positives. It is enabled by default for all Pro and Enterprise plans.",
    date: "Aug 14, 2026",
    tag: "Update",
    unread: true,
  },
  {
    title: "Scheduled maintenance — EU edge nodes",
    body: "On Aug 20 between 02:00 and 03:00 UTC we will rotate hardware in Frankfurt and Amsterdam. Traffic will be re-routed automatically; no downtime expected.",
    date: "Aug 11, 2026",
    tag: "Maintenance",
    unread: true,
  },
  {
    title: "Security advisory: rotate legacy API keys",
    body: "Keys created before June 2026 use the old signing format. Please rotate them from the dashboard before September 30, 2026.",
    date: "Aug 03, 2026",
    tag: "Security",
  },
  {
    title: "cat-service.com is out of beta",
    body: "Thank you to everyone who tested with us. Public launch pricing is now live and beta users keep 20% off for 12 months.",
    date: "Jul 28, 2026",
    tag: "News",
  },
];

const tagVariant = (tag: Announcement["tag"]) =>
  tag === "Security" ? "destructive" : tag === "Maintenance" ? "secondary" : "default";

const AnnouncementsTab = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">Announcements</h3>
          <p className="text-sm text-muted-foreground">Product updates and service notices</p>
        </div>
        <Button variant="secondary">Mark all as read</Button>
      </div>

      {announcements.map((a) => (
        <Card key={a.title} className="bg-gradient-card border-border p-6 shadow-card">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <Badge variant={tagVariant(a.tag)}>{a.tag}</Badge>
            <h4 className="font-semibold text-foreground">{a.title}</h4>
            {a.unread && <span className="w-2 h-2 rounded-full bg-primary" aria-label="Unread" />}
            <span className="text-xs text-muted-foreground ml-auto">{a.date}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{a.body}</p>
        </Card>
      ))}
    </div>
  );
};

export default AnnouncementsTab;
