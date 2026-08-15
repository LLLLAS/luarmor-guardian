import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ShieldAlert,
  CreditCard,
  Megaphone,
  LifeBuoy,
  Bell,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import OverviewTab from "@/components/dashboard/OverviewTab";
import AttacksTab from "@/components/dashboard/AttacksTab";
import PlanTab from "@/components/dashboard/PlanTab";
import AnnouncementsTab from "@/components/dashboard/AnnouncementsTab";
import SupportTab from "@/components/dashboard/SupportTab";

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, Component: OverviewTab },
  { id: "attacks", label: "Attacks", icon: ShieldAlert, Component: AttacksTab },
  { id: "plan", label: "Plan", icon: CreditCard, Component: PlanTab },
  { id: "announcements", label: "Announcements", icon: Megaphone, Component: AnnouncementsTab },
  { id: "support", label: "Support", icon: LifeBuoy, Component: SupportTab },
] as const;

type TabId = (typeof tabs)[number]["id"];

const Dashboard = () => {
  const [active, setActive] = useState<TabId>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  const ActiveComponent = current.Component;

  const nav = (
    <nav className="space-y-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            setActive(tab.id);
            setMobileOpen(false);
          }}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
            active === tab.id
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary",
          )}
        >
          <tab.icon className="w-4 h-4" />
          {tab.label}
          {tab.id === "announcements" && (
            <Badge variant="secondary" className="ml-auto">2</Badge>
          )}
        </button>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border bg-card/40 p-4">
        <Link to="/" className="flex items-center gap-3 px-2 py-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-gold-light" />
          <span className="text-lg font-bold text-foreground">cat-service</span>
        </Link>
        {nav}
        <div className="mt-auto rounded-xl border border-border p-4 bg-gradient-card">
          <p className="text-sm font-medium text-foreground">Pro Plan</p>
          <p className="text-xs text-muted-foreground mt-1">71% of monthly requests used</p>
          <Button size="sm" className="w-full mt-3" onClick={() => setActive("plan")}>
            Upgrade
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Toggle navigation"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-foreground">{current.label}</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  cat-service.com — protection dashboard
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="w-5 h-5" />
              </Button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-gold-light flex items-center justify-center text-primary-foreground text-sm font-bold">
                C
              </div>
            </div>
          </div>
          {mobileOpen && <div className="lg:hidden border-t border-border p-3">{nav}</div>}
        </header>

        <motion.main
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="p-4 sm:p-6"
        >
          <ActiveComponent />
        </motion.main>
      </div>
    </div>
  );
};

export default Dashboard;
