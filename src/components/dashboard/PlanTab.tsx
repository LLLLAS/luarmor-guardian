import { Check } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const plans = [
  { name: "Free", price: 0, features: ["1 concurrent attack", "60s max duration", "Basic methods"] },
  { name: "Pro", price: 29, features: ["3 concurrent attacks", "10min max duration", "All methods", "Priority queue"] },
  { name: "Enterprise", price: 149, features: ["Unlimited concurrent", "1h max duration", "Custom methods", "24/7 support"] },
];

const PlanTab = () => {
  const { profile, user, refreshProfile } = useAuth();

  const switchPlan = async (name: string, price: number) => {
    if (!user || !profile) return;
    if (price > 0 && Number(profile.balance) < price) {
      toast.error(`Need $${price} in balance. Top up first.`);
      return;
    }
    const newBal = Number(profile.balance) - price;
    const { error } = await supabase.from("profiles").update({ plan: name, balance: newBal }).eq("id", user.id);
    if (error) toast.error(error.message);
    else {
      toast.success(`Switched to ${name}`);
      refreshProfile();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card border-border p-6 shadow-card">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-foreground">Current Plan — {profile?.plan ?? "Free"}</h3>
          <Badge>Active</Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Balance ${Number(profile?.balance ?? 0).toFixed(2)}</p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const current = profile?.plan === plan.name;
          return (
            <Card
              key={plan.name}
              className={`bg-gradient-card p-6 shadow-card flex flex-col ${
                current ? "border-primary shadow-glow-gold" : "border-border"
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-foreground">{plan.name}</h4>
                {current && <Badge variant="secondary">Current</Badge>}
              </div>
              <div className="mt-4 mb-6">
                <span className="text-3xl font-bold text-gradient-gold">${plan.price}</span>
                <span className="text-muted-foreground text-sm">/mo</span>
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
                variant={current ? "secondary" : "default"}
                disabled={current}
                onClick={() => switchPlan(plan.name, plan.price)}
              >
                {current ? "Your Plan" : plan.price === 0 ? "Downgrade" : `Buy for $${plan.price}`}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PlanTab;
