import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X, Diamond } from "lucide-react";

const plans = [
  {
    name: "Basic",
    description:
      "If you just started developing scripts, this plan is ideal for you.",
    price: "$15",
    period: "/month",
    features: [
      { text: "API & Bot access", included: true },
      { text: "Webhook logs", included: true },
      { text: "Up to 200 keys at once", included: true },
      { text: "Unlimited obf per month", included: true },
      { text: "Up to 2 scripts at once", included: true },
      { text: "1 project folder", included: true },
      { text: "Ad system (rewards)", included: true },
      { text: "Keyless (FFA) mode", included: false },
    ],
    popular: false,
  },
  {
    name: "Premium",
    description:
      "Best plan for most users. If your script hub is growing fast, this plan is recommended.",
    price: "$25",
    period: "/month",
    features: [
      { text: "API & Bot access", included: true },
      { text: "Webhook logs", included: true },
      { text: "Up to 1,000 keys at once", included: true },
      { text: "Unlimited obf per month", included: true },
      { text: "Up to 8 scripts at once", included: true },
      { text: "3 project folders", included: true },
      { text: "Ad system (rewards)", included: true },
      { text: "Keyless (FFA) mode", included: true },
    ],
    popular: true,
  },
  {
    name: "Pro",
    description:
      "Everything in premium with higher usage limits. Recommended for high quality scripts.",
    price: "$40",
    period: "/month",
    features: [
      { text: "API & Bot access", included: true },
      { text: "Webhook logs", included: true },
      { text: "Up to 10,000 keys at once", included: true },
      { text: "Unlimited obf per month", included: true },
      { text: "Up to 18 scripts at once", included: true },
      { text: "6 project folders", included: true },
      { text: "Ad system (rewards)", included: true },
      { text: "Keyless (FFA) mode", included: true },
    ],
    popular: false,
  },
];

const enterprise = {
  name: "Enterprise",
  description: "For large hubs with specialized needs. Enterprise users can request custom features.",
  price: "Custom",
  features: [
    { text: "API ratelimit bypass", icon: Diamond },
    { text: "Advanced access control methods", icon: Diamond },
    { text: "Custom URLs in ad system", icon: Diamond },
    { text: "50k keys & 60 scripts", icon: Check },
    { text: "10 projects & unlimited obf", icon: Check },
    { text: "Everything in Pro", icon: Check },
  ],
};

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-background to-card/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple and Flat Pricing
          </h2>
          <p className="text-muted-foreground">
            Choose the plan that's right for you.
          </p>
        </motion.div>

        {/* Main Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-6 rounded-2xl border ${
                plan.popular
                  ? "bg-card border-primary shadow-glow-gold"
                  : "bg-card border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-4 min-h-[48px]">
                {plan.description}
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-3 text-sm">
                    {feature.included ? (
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    )}
                    <span className={feature.included ? "" : "text-muted-foreground"}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "default" : "secondary"}
                className={`w-full ${
                  plan.popular
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : ""
                }`}
              >
                Buy Invite
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-8 rounded-2xl bg-card border border-border"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="lg:max-w-md">
              <h3 className="text-2xl font-bold mb-2">{enterprise.name}</h3>
              <p className="text-muted-foreground text-sm mb-2">
                {enterprise.description}
              </p>
              <p className="text-xs text-muted-foreground">
                Crypto Currencies only
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1 lg:max-w-lg">
              {enterprise.features.map((feature) => (
                <div key={feature.text} className="flex items-center gap-2 text-sm">
                  <feature.icon className={`w-4 h-4 flex-shrink-0 ${
                    feature.icon === Diamond ? "text-primary" : "text-primary"
                  }`} />
                  <span className="text-sm">{feature.text}</span>
                </div>
              ))}
            </div>

            <Button variant="outline" className="lg:w-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Contact Us
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;