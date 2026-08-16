import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { ShieldAlert, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

type Attack = {
  id: string;
  target: string;
  port: number;
  method: string;
  duration: number;
  status: string;
  cost: number;
  created_at: string;
  ends_at: string | null;
};

const METHODS = ["HTTP-FLOOD", "TCP-SYN", "UDP-BYPASS", "L7-STORM"];
const COST_PER_SEC = 0.02; // demo: $0.02 per second

const schema = z.object({
  target: z
    .string()
    .trim()
    .min(3, "Target required")
    .max(253, "Too long")
    .regex(/^[a-zA-Z0-9.\-:_/]+$/, "Invalid target"),
  port: z.number().int().min(1).max(65535),
  method: z.string().min(1),
  duration: z.number().int().min(30, "Min 30s").max(3600, "Max 1 hour"),
});

const AttacksTab = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const [target, setTarget] = useState("");
  const [port, setPort] = useState("80");
  const [method, setMethod] = useState(METHODS[0]);
  const [duration, setDuration] = useState("60");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("attacks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);
    setAttacks((data as Attack[]) ?? []);
  };
  useEffect(() => {
    load();
  }, [user]);

  const cost = Number(duration || 0) * COST_PER_SEC;

  const launch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const parsed = schema.safeParse({
      target,
      port: Number(port),
      method,
      duration: Number(duration),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    const totalCost = parsed.data.duration * COST_PER_SEC;
    if (Number(profile?.balance ?? 0) < totalCost) {
      toast.error(`Insufficient balance. Need $${totalCost.toFixed(2)}, top up first.`);
      return;
    }
    setBusy(true);
    const ends = new Date(Date.now() + parsed.data.duration * 1000).toISOString();
    const { error } = await supabase.from("attacks").insert({
      user_id: user.id,
      target: parsed.data.target,
      port: parsed.data.port,
      method: parsed.data.method,
      duration: parsed.data.duration,
      status: "running",
      cost: totalCost,
      ends_at: ends,
    });
    if (error) {
      toast.error(error.message);
      setBusy(false);
      return;
    }
    // Deduct balance
    const newBal = Number(profile?.balance ?? 0) - totalCost;
    await supabase.from("profiles").update({ balance: newBal }).eq("id", user.id);
    await refreshProfile();
    toast.success("Attack launched");
    setTarget("");
    setBusy(false);
    load();
  };

  const stop = async (id: string) => {
    const { error } = await supabase
      .from("attacks")
      .update({ status: "stopped", ends_at: new Date().toISOString() })
      .eq("id", id);
    if (error) toast.error(error.message);
    else load();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-border p-6 shadow-card lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Launch Attack</h3>
              <p className="text-xs text-muted-foreground">Balance ${Number(profile?.balance ?? 0).toFixed(2)}</p>
            </div>
          </div>
          <form onSubmit={launch} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="target">Target (host or IP)</Label>
              <Input id="target" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="example.com" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="port">Port</Label>
                <Input id="port" type="number" min={1} max={65535} value={port} onChange={(e) => setPort(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (s)</Label>
                <Input id="duration" type="number" min={30} max={3600} value={duration} onChange={(e) => setDuration(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Method</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {METHODS.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Estimated cost</span>
              <span className="text-foreground font-medium">${cost.toFixed(2)}</span>
            </div>
            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? "Launching…" : "Launch"}
            </Button>
          </form>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card lg:col-span-2">
          <div className="p-6 flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">Attack History</h3>
              <p className="text-sm text-muted-foreground">Your most recent requests</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Target</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attacks.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-mono text-xs">
                      {a.target}:{a.port}
                    </TableCell>
                    <TableCell>{a.method}</TableCell>
                    <TableCell>{a.duration}s</TableCell>
                    <TableCell>${Number(a.cost).toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={a.status === "running" ? "default" : "secondary"}>{a.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {a.status === "running" && (
                        <Button size="sm" variant="secondary" onClick={() => stop(a.id)}>
                          Stop
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {attacks.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No attacks yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AttacksTab;
