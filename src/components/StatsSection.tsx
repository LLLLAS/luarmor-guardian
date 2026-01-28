import { motion } from "framer-motion";

const stats = [
  { value: "1.2M+", label: "Active keys" },
  { value: "600M+", label: "Executions every month" },
  { value: "$315K+", label: "Generated in Ad Revenue!" },
];

const StatsSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Here are our stats
          </h2>
          <p className="text-muted-foreground">
            Actively used by thousands of people.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-8 rounded-2xl bg-card border border-border"
            >
              <div className="text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-xs text-muted-foreground mt-6"
        >
          * As of August 2025. Ad revenue is an estimate with average monetization settings assumed.
        </motion.p>
      </div>
    </section>
  );
};

export default StatsSection;