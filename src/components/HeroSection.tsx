import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Stats floating in background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
          className="absolute top-32 left-10 text-muted-foreground"
        >
          <div className="text-sm">Dashboard</div>
          <div className="mt-2 w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18" />
              <path d="M18 9l-5 5-2.5-2.5L7 15" />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-20 right-20 text-muted-foreground text-right"
        >
          <div className="text-sm">Total Users</div>
          <div className="text-4xl font-bold">4398</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute top-40 left-32 text-muted-foreground"
        >
          <div className="text-sm">146,833 executions this month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-60 left-20 text-muted-foreground"
        >
          <div className="text-xs">20,000</div>
          <div className="text-xs">16,000</div>
          <div className="text-xs">10,000</div>
        </motion.div>

        {/* Graph lines in background */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 800">
          <motion.path
            d="M0 600 Q300 400 600 500 T1200 300"
            stroke="hsl(45 70% 47%)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Protect & Monetize your code
            <br />
            with <span className="text-gradient-gold">Luarmor</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            The standard and go-to solution for protecting, monetizing,
            and managing your scripts easily.
          </p>
        </motion.div>

        {/* Dashboard Mockups */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative flex justify-center items-center gap-4 md:gap-8 mt-8"
        >
          {/* Left Dashboard */}
          <motion.div
            className="w-[280px] md:w-[420px] h-[180px] md:h-[280px] rounded-xl bg-card border border-border shadow-card overflow-hidden animate-float"
          >
            <div className="h-full bg-gradient-to-br from-card to-background p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-primary/20" />
                <span className="text-xs text-muted-foreground">Luarmor</span>
                <div className="ml-auto flex gap-1">
                  <div className="w-8 h-4 rounded bg-primary/30 text-[8px] flex items-center justify-center">6270</div>
                  <div className="w-8 h-4 rounded bg-blue-500/30 text-[8px] flex items-center justify-center">1000</div>
                </div>
              </div>
              <div className="h-16 md:h-24 flex items-end gap-1">
                {[40, 55, 35, 70, 45, 60, 80, 50, 65, 75, 55, 45].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-primary/40 rounded-t"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-muted" />
                    <div className="flex-1 h-2 bg-muted rounded" />
                    <div className="w-12 h-4 rounded bg-primary/20 text-[8px] flex items-center justify-center">EDIT</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Dashboard */}
          <motion.div
            className="w-[280px] md:w-[420px] h-[180px] md:h-[280px] rounded-xl bg-card border border-border shadow-card overflow-hidden animate-float-delayed"
          >
            <div className="h-full bg-gradient-to-br from-card to-background p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-primary/20" />
                <span className="text-xs text-muted-foreground">Reward Manager</span>
                <div className="ml-auto text-primary text-sm font-bold">26373</div>
              </div>
              <div className="h-16 md:h-24 flex items-end gap-1">
                {[30, 80, 45, 90, 35, 70, 60, 85, 40, 75, 55, 65].map((h, i) => (
                  <motion.div
                    key={i}
                    className={`flex-1 rounded-t ${h > 60 ? 'bg-primary/60' : 'bg-destructive/40'}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-muted" />
                    <div className="flex-1 h-2 bg-muted rounded" />
                    <div className="flex gap-1">
                      <div className="w-8 h-4 rounded bg-primary/20" />
                      <div className="w-8 h-4 rounded bg-red-500/20" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;