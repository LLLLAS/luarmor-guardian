import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ShieldAlert, ShieldCheck, Globe, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const chart = [
  { hour: "00:00", attacks: 12 },
  { hour: "04:00", attacks: 28 },
  { hour: "08:00", attacks: 46 },
  { hour: "12:00", attacks: 74 },
  { hour: "16:00", attacks: 58 },
  { hour: "20:00", attacks: 96 },
];

type Attack = {
  id: string;
  type: string;
  source: string;
  country: string;
  size: string;
  duration: string;
  status: "Mitigated" | "Blocked" | "Ongoing";
};

const attacks: Attack[] = [
  { id: "ATK-9812", type: "L7 HTTP Flood", source: "185.220.101.4", country: "NL", size: "42k rps", duration: "3m 12s", status: "Mitigated" },
  { id: "ATK-9811", type: "UDP Amplification", source: "45.83.64.19", country: "RU", size: "18 Gbps", duration: "1m 04s", status: "Blocked" },
  { id: "ATK-9810", type: "SYN Flood", source: "103.75.190.22", country: "SG", size: "7.4 Gbps", duration: "48s", status: "Mitigated" },
  { id: "ATK-9809", type: "Bot Scraping", source: "51.15.22.87", country: "FR", size: "6k rps", duration: "12m 40s", status: "Ongoing" },
  { id: "ATK-9808", type: "Credential Stuffing", source: "23.129.64.130", country: "US", size: "2.1k rps", duration: "5m 55s", status: "Blocked" },
];

const statusVariant = (status: Attack["status"]) =>
  status === "Ongoing" ? "destructive" : status === "Blocked" ? "secondary" : "default";

const AttacksTab = () => {
  const [query, setQuery] = useState("");
  const filtered = attacks.filter((a) =>
    `${a.id} ${a.type} ${a.source} ${a.country}`.toLowerCase().includes(query.toLowerCase()),
  );

  const summary = [
    { label: "Attacks Today", value: "314", icon: ShieldAlert },
    { label: "Mitigated", value: "312", icon: ShieldCheck },
    { label: "Top Origin", value: "Netherlands", icon: Globe },
    { label: "Avg. Mitigation", value: "1.8s", icon: Clock },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {summary.map((s) => (
          <Card key={s.label} className="bg-gradient-card border-border p-5 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-lg font-bold text-foreground">{s.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-card border-border p-6 shadow-card">
        <h3 className="font-semibold text-foreground mb-6">Attack Volume (24h)</h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chart}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                cursor={{ fill: "hsl(var(--muted) / 0.3)" }}
                contentStyle={{
                  background: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Bar dataKey="attacks" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="bg-gradient-card border-border shadow-card">
        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-foreground">Attack Log</h3>
            <p className="text-sm text-muted-foreground">Latest detected events on cat-service.com</p>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Search attacks..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="sm:w-56"
            />
            <Button variant="secondary">Export</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Source IP</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Peak</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium text-foreground">{a.id}</TableCell>
                  <TableCell>{a.type}</TableCell>
                  <TableCell className="font-mono text-xs">{a.source}</TableCell>
                  <TableCell>{a.country}</TableCell>
                  <TableCell>{a.size}</TableCell>
                  <TableCell>{a.duration}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={statusVariant(a.status)}>{a.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No attacks match your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default AttacksTab;
