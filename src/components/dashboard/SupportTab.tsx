import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { LifeBuoy, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

type Ticket = { id: string; subject: string; priority: string; status: string; updated_at: string };
type Message = { id: string; body: string; is_staff: boolean; created_at: string; author_id: string };

const ticketSchema = z.object({
  subject: z.string().trim().min(3, "Subject too short").max(120),
  message: z.string().trim().min(5, "Message too short").max(2000),
  priority: z.enum(["low", "normal", "high", "urgent"]),
});

const SupportTab = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");
  const [priority, setPriority] = useState<"low" | "normal" | "high" | "urgent">("normal");
  const [reply, setReply] = useState("");

  const loadTickets = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("tickets")
      .select("id,subject,priority,status,updated_at")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });
    setTickets((data as Ticket[]) ?? []);
  };
  useEffect(() => {
    loadTickets();
  }, [user]);

  const openTicket = async (t: Ticket) => {
    setSelected(t);
    const { data } = await supabase
      .from("ticket_messages")
      .select("*")
      .eq("ticket_id", t.id)
      .order("created_at");
    setMessages((data as Message[]) ?? []);
  };

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const parsed = ticketSchema.safeParse({ subject, message: msg, priority });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    const { data: ticket, error } = await supabase
      .from("tickets")
      .insert({ user_id: user.id, subject: parsed.data.subject, priority: parsed.data.priority })
      .select()
      .single();
    if (error || !ticket) {
      toast.error(error?.message ?? "Failed");
      return;
    }
    const { error: mErr } = await supabase.from("ticket_messages").insert({
      ticket_id: ticket.id,
      author_id: user.id,
      body: parsed.data.message,
    });
    if (mErr) toast.error(mErr.message);
    else {
      toast.success("Ticket submitted");
      setSubject("");
      setMsg("");
      setPriority("normal");
      loadTickets();
    }
  };

  const sendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selected || !reply.trim()) return;
    const { error } = await supabase.from("ticket_messages").insert({
      ticket_id: selected.id,
      author_id: user.id,
      body: reply.trim(),
    });
    if (error) toast.error(error.message);
    else {
      setReply("");
      openTicket(selected);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-gradient-card border-border p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <LifeBuoy className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Open a Ticket</h3>
        </div>
        <form onSubmit={create} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select value={priority} onValueChange={(v) => setPriority(v as typeof priority)}>
              <SelectTrigger id="priority">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="msg">Message</Label>
            <Textarea id="msg" rows={5} value={msg} onChange={(e) => setMsg(e.target.value)} />
          </div>
          <Button type="submit" className="w-full">Submit Ticket</Button>
        </form>
      </Card>

      <Card className="bg-gradient-card border-border p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">{selected ? selected.subject : "Your Tickets"}</h3>
        </div>
        {!selected && (
          <ul className="space-y-3">
            {tickets.length === 0 && <p className="text-sm text-muted-foreground">No tickets yet.</p>}
            {tickets.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => openTicket(t)}
                  className="w-full flex items-center justify-between gap-3 border-b border-border pb-3 text-left hover:bg-secondary/40 rounded-md px-2 py-2 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm text-foreground truncate">{t.subject}</p>
                    <p className="text-xs text-muted-foreground">{new Date(t.updated_at).toLocaleString()}</p>
                  </div>
                  <Badge variant={t.status === "open" ? "default" : "secondary"}>{t.status}</Badge>
                </button>
              </li>
            ))}
          </ul>
        )}
        {selected && (
          <div className="space-y-4">
            <Button size="sm" variant="ghost" onClick={() => setSelected(null)}>
              ← Back
            </Button>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`rounded-lg p-3 text-sm ${
                    m.is_staff ? "bg-primary/10 border border-primary/30" : "bg-secondary"
                  }`}
                >
                  <p className="text-xs text-muted-foreground mb-1">
                    {m.is_staff ? "Staff" : "You"} · {new Date(m.created_at).toLocaleString()}
                  </p>
                  <p className="text-foreground whitespace-pre-wrap">{m.body}</p>
                </div>
              ))}
            </div>
            <form onSubmit={sendReply} className="space-y-2">
              <Textarea rows={3} value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Type a reply…" />
              <Button type="submit" className="w-full" disabled={!reply.trim()}>
                Send Reply
              </Button>
            </form>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SupportTab;
