import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Navbar = () => {
  const navLinks = [
    { label: "Docs", href: "#" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Discord", href: "#" },
    { label: "F.A.Q", href: "#" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
              <path
                d="M16 4L4 10v12l12 6 12-6V10L16 4z"
                fill="hsl(45 70% 47%)"
                fillOpacity="0.2"
              />
              <path
                d="M16 4L4 10l12 6 12-6-12-6z"
                fill="hsl(45 70% 47%)"
              />
              <path
                d="M4 10v12l12 6V16L4 10z"
                fill="hsl(45 70% 40%)"
              />
              <path
                d="M28 10v12l-12 6V16l12-6z"
                fill="hsl(45 70% 35%)"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-foreground">cat service</span>
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            Sign in
          </Button>
          <Button variant="secondary" className="bg-secondary hover:bg-secondary/80 text-foreground">
            Sign up
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;