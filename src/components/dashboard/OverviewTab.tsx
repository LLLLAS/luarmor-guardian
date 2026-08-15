import { motion } from "framer-motion";
import { Activity, ShieldCheck, Users, Zap } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Active Users", value: "12,480", change: "+8.2%", icon: Users },
  { label: "Requests Today", value: "1.4M", change: "+3.1%", icon: Activity },
  { label: "Attacks Blocked", value: "3,921", change: "+12.6%", icon: ShieldCheck },
  { label: "Avg. Latency", value: "42ms", change: "-6.4%", icon: Zap },
];

const traffic = [
  { day: "Mon", requests: 820, blocked: 120 },
  { day: "Tue", requests: 940, blocked: 180 },
  { day: "Wed", requests: 1120, blocked: 240 },
  { day: "Thu", requests: 980, blocked: 160 },
  { day: "Fri", requests: 1380, blocked: 320 },
  { day: "Sat", requests: 1610, blocked: 410 },
  { day: "Sun", requests: 1240, blocked: 260 },
];

const activity = [
  { text: "New API key generated", time: "2 min ago", tone: "default" },
  { text: "L7 attack mitigated on cat-service.com", time: "18 min ago", tone: "danger" },
  { text: "Plan renewed — Pro Monthly", time: "3 hours ago", tone: "default" },
  { text: "Support ticket #2041 answered", time: "6 hours ago", tone: "default" },
];

const OverviewTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card className="bg-gradient-card border-border p-5 shadow-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1 text-foreground">{stat.value}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-xs text-primary mt-3">{stat.change} vs last week</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-border p-6 shadow-card lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground">Traffic Overview</h3>
              <p className="text-sm text-muted-foreground">Requests vs blocked, last 7 days</p>
            </div>
            <Badge variant="secondary">Live</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={traffic}>
                <defs>
                  <linearGradient id="reqFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                    color: "hsl(var(--popover-foreground))",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="requests"
                  stroke="hsl(var(--primary))"
                  fill="url(#reqFill)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="blocked"
                  stroke="hsl(var(--destructive))"
                  fill="transparent"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-gradient-card border-border p-6 shadow-card">
          <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
          <ul className="space-y-4">
            {activity.map((item) => (
              <li key={item.text} className="flex gap-3">
                <span
                  className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                    item.tone === "danger" ? "bg-destructive" : "bg-primary"
                  }`}
                />
                <div>
                  <p className="text-sm text-foreground">{item.text}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
