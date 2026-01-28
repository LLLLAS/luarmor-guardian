import { motion } from "framer-motion";
import { Zap, Wrench, Lock, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Super Fast",
    description:
      "Luarmor is extremely fast and stable because of its multi-server structure and optimized design that ensures 0% error rate during authentication.",
  },
  {
    icon: Wrench,
    title: "Easy to Integrate",
    description:
      "All you have to do is to upload your script to dashboard and that's it. Luarmor will embed the whitelist inside your script and obfuscate it using Luraph™️",
  },
  {
    icon: Lock,
    title: "Top Security",
    description:
      "Luarmor utilizes commercial methods to keep your script secure. We write the code that re-writes your code in a secure way.",
  },
  {
    icon: TrendingUp,
    title: "Reliable",
    description:
      "Our systems operate with 99.9%+ uptime, including script stability. With Luarmor, your users will never have whitelist related errors.",
  },
];

const FeaturesGrid = () => {
  return (
    <section className="relative py-24 overflow-hidden">
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
            A stability-first<br />
            approach to whitelist<br />
            security.
          </h2>
          <p className="text-muted-foreground text-lg">
            Built with security and stability in mind.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary hover:underline mt-4"
          >
            See how it exactly works →
          </a>
        </motion.div>

        {/* World Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-16"
        >
          <div className="w-full h-48 md:h-64 rounded-xl bg-card/50 border border-border flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <svg viewBox="0 0 1200 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                {/* Simplified world map dots */}
                {Array.from({ length: 50 }).map((_, i) => (
                  <circle
                    key={i}
                    cx={100 + Math.random() * 1000}
                    cy={50 + Math.random() * 300}
                    r={2 + Math.random() * 3}
                    fill="hsl(45 70% 47%)"
                    opacity={0.3 + Math.random() * 0.5}
                  />
                ))}
                {/* Connection lines */}
                <motion.path
                  d="M200 200 Q400 100 600 180 T1000 150"
                  stroke="hsl(45 70% 47%)"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2 }}
                />
              </svg>
            </div>
            <p className="relative z-10 text-muted-foreground text-sm">
              Luarmor servers on world map above
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow-gold"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;