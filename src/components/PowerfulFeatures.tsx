import { motion } from "framer-motion";
import { Bot, Key, FileText, Power, Lock, DollarSign, KeyRound, Shield } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Discord Bot",
    description:
      "Luarmor comes with a ready-to-use discord bot with a mini control panel for your users where they can redeem keys, reset HWID and more.",
  },
  {
    icon: Key,
    title: "Key Stocking",
    description:
      "You can mass generate day-locked or lifetime keys & export them to list them on your sellix / shoppy or whatever platform you are using.",
  },
  {
    icon: FileText,
    title: "Runtime Variables",
    description:
      "Runtime variables allow you to access key-specific data such as discord id, note, expiry date and more. Allowing you to add custom logic for specific users.",
  },
  {
    icon: Power,
    title: "One Click Kill Switch",
    description:
      "You can disable, delete, update your scripts anytime you want, and it will immediately take effect for future executions.",
  },
  {
    icon: Lock,
    title: "Encrypted Backups",
    description:
      "Luarmor gives you the option to encrypt & store your code just in case you ever lose access to source, or want to revert to an old version.",
  },
  {
    icon: DollarSign,
    title: "Ad Key System",
    description:
      "Luarmor has a built-in, compatible and customizable ad link system with an effective anti-bypass, protecting your revenue.",
  },
  {
    icon: KeyRound,
    title: "Key Check API",
    description:
      "We have a Lua API that allows you to check key details before actually running the obfuscated script, allowing you to implement custom logic.",
  },
  {
    icon: Shield,
    title: "Automatic Integration",
    description:
      "When you upload your script on dashboard, it will have a whitelist automatically embedded inside it, and get obfuscated with Luraph.",
  },
];

const PowerfulFeatures = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-card/30 to-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Powerful Features<br />
            <span className="text-gradient-gold">You'll Love</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to manage your scripts and users automatically.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PowerfulFeatures;