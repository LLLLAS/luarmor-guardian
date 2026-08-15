import { useState } from "react";
import { LifeBuoy, MessageSquare, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";

const tickets = [
  { id: "#2041", subject: "API key returns 403 on staging", status: "Answered", updated: "6h ago" },
  { id: "#2032", subject: "Add second domain to Pro plan", status: "Open", updated: "1d ago" },
  { id: "#1998", subject: "Invoice for July", status: "Closed", updated: "3w ago" },
];

const faqs = [
  {
    q: "How fast is attack mitigation?",
    a: "Most L3/L4 attacks are absorbed at the edge within milliseconds. L7 attacks average 1.8 seconds to full mitigation.",
  },
  {
    q: "Can I change plans at any time?",
    a: "Yes. Upgrades apply instantly and downgrades take effect at the end of the current billing cycle.",
  },
  {
    q: "Do you offer a status page?",
    a: "Yes, live uptime and incident history are published at status.cat-service.com.",
  },
];

const SupportTab = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("normal");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      toast.error("Please fill in a subject and a message.");
      return;
    }
    toast.success("Ticket submitted — our team replies within 2 hours.");
    setSubject("");
    setMessage("");
    setPriority("normal");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: MessageSquare, title: "Live Chat", desc: "Avg. reply in 4 minutes" },
          { icon: LifeBuoy, title: "Priority Support", desc: "Included with your Pro plan" },
          { icon: BookOpen, title: "Documentation", desc: "Guides, API reference, SDKs" },
        ].map((c) => (
          <Card key={c.title} className="bg-gradient-card border-border p-5 shadow-card">
            <c.icon className="w-5 h-5 text-primary mb-3" />
            <p className="font-medium text-foreground">{c.title}</p>
            <p className="text-sm text-muted-foreground">{c.desc}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border p-6 shadow-card">
          <h3 className="font-semibold text-foreground mb-4">Open a Ticket</h3>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Short summary of the issue"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger id="priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent — service down</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe what happened, including any error codes"
                rows={5}
              />
            </div>
            <Button type="submit" className="w-full">Submit Ticket</Button>
          </form>
        </Card>

        <div className="space-y-6">
          <Card className="bg-gradient-card border-border p-6 shadow-card">
            <h3 className="font-semibold text-foreground mb-4">Your Tickets</h3>
            <ul className="space-y-3">
              {tickets.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm text-foreground truncate">
                      <span className="text-muted-foreground mr-2">{t.id}</span>
                      {t.subject}
                    </p>
                    <p className="text-xs text-muted-foreground">Updated {t.updated}</p>
                  </div>
                  <Badge variant={t.status === "Open" ? "default" : "secondary"}>{t.status}</Badge>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="bg-gradient-card border-border p-6 shadow-card">
            <h3 className="font-semibold text-foreground mb-2">FAQ</h3>
            <Accordion type="single" collapsible>
              {faqs.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="text-sm text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupportTab;
