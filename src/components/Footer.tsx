const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
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
            <span className="text-lg font-bold">Luarmor</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Discord
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2025 Luarmor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;