import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, ShieldCheck, Wallet, Zap } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

type Attack = { id: string; target: string; method: string; status: string; created_at: string; duration: number };

const OverviewTab = () => {
  const { profile, user } = useAuth();
  const [attacks, setAttacks] = useState<Attack[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("attacks")
      .select("id,target,method,status,created_at,duration")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data }) => setAttacks((data as Attack[]) ?? []));
  }, [user]);

  const total = attacks.length;
  const running = attacks.filter((a) => a.status === "running" || a.status === "queued").length;

  // last 7 days chart
  const chart = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().slice(0, 10);
    const count = attacks.filter((a) => a.created_at.slice(0, 10) === key).length;
    return { day: d.toLocaleDateString(undefined, { weekday: "short" }), attacks: count };
  });

  const stats = [
    { label: "Balance", value: `$${Number(profile?.balance ?? 0).toFixed(2)}`, icon: Wallet },
    { label: "Plan", value: profile?.plan ?? "Free", icon: ShieldCheck },
    { label: "Attacks Sent", value: String(total), icon: Activity },
    { label: "Running", value: String(running), icon: Zap },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Card className="bg-gradient-card border-border p-5 shadow-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-bold mt-1 text-foreground">{s.value}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-border p-6 shadow-card lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground">Your Attacks — last 7 days</h3>
              <p className="text-sm text-muted-foreground">Stress tests launched from your account</p>
            </div>
            <Badge variant="secondary">Live</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chart}>
                <defs>
                  <linearGradient id="reqFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Area type="monotone" dataKey="attacks" stroke="hsl(var(--primary))" fill="url(#reqFill)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-gradient-card border-border p-6 shadow-card">
          <h3 className="font-semibold text-foreground mb-4">Recent Attacks</h3>
          {attacks.length === 0 && (
            <p className="text-sm text-muted-foreground">No attacks yet. Launch one from the Attacks tab.</p>
          )}
          <ul className="space-y-3">
            {attacks.slice(0, 5).map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-3 text-sm">
                <div className="min-w-0">
                  <p className="text-foreground truncate">{a.target}</p>
                  <p className="text-xs text-muted-foreground">
                    {a.method} · {a.duration}s
                  </p>
                </div>
                <Badge variant={a.status === "running" ? "default" : "secondary"}>{a.status}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
