import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    features: ["1 protected domain", "10k requests / day", "Basic L7 filtering", "Community support"],
    current: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    features: ["10 protected domains", "2M requests / day", "Advanced DDoS mitigation", "Priority support", "Attack analytics"],
    current: true,
  },
  {
    name: "Enterprise",
    price: "$149",
    period: "/mo",
    features: ["Unlimited domains", "Unmetered requests", "Custom rulesets", "24/7 dedicated support", "SLA 99.99%"],
    current: false,
  },
];

const usage = [
  { label: "Requests", used: 1_420_000, total: 2_000_000, display: "1.42M / 2M" },
  { label: "Protected Domains", used: 4, total: 10, display: "4 / 10" },
  { label: "API Keys", used: 3, total: 5, display: "3 / 5" },
];

const PlanTab = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card border-border p-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-foreground">Current Plan — Pro</h3>
              <Badge>Active</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Renews on September 14, 2026</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary">Manage Billing</Button>
            <Button>Upgrade</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {usage.map((u) => (
            <div key={u.label}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">{u.label}</span>
                <span className="text-foreground">{u.display}</span>
              </div>
              <Progress value={(u.used / u.total) * 100} />
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`bg-gradient-card p-6 shadow-card flex flex-col ${
              plan.current ? "border-primary shadow-glow-gold" : "border-border"
            }`}
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground">{plan.name}</h4>
              {plan.current && <Badge variant="secondary">Current</Badge>}
            </div>
            <div className="mt-4 mb-6">
              <span className="text-3xl font-bold text-gradient-gold">{plan.price}</span>
              <span className="text-muted-foreground text-sm">{plan.period}</span>
            </div>
            <ul className="space-y-3 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              className="mt-6 w-full"
              variant={plan.current ? "secondary" : "default"}
              disabled={plan.current}
            >
              {plan.current ? "Your Plan" : `Switch to ${plan.name}`}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlanTab;
