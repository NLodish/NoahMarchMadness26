import { Switch, Route, Router, Link, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Bracket from "@/pages/Bracket";
import TeamDetail from "@/pages/TeamDetail";
import Markets from "@/pages/Markets";
import Trading from "@/pages/Trading";
import Merch from "@/pages/Merch";
import { LayoutDashboard, Trophy, BarChart2, TrendingUp, ShoppingBag, Menu, X, ChevronRight } from "lucide-react";
import { PerplexityAttribution } from "@/components/PerplexityAttribution";

// Set dark mode by default
document.documentElement.classList.add("dark");

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/bracket", label: "Bracket", icon: Trophy },
  { href: "/markets", label: "Markets", icon: BarChart2 },
  { href: "/trading", label: "Trading", icon: TrendingUp },
  { href: "/merch", label: "Merch", icon: ShoppingBag },
];

function BasketballLogo() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" aria-label="March Madness Basketball">
      <circle cx="16" cy="16" r="15" fill="#F97316" />
      <circle cx="16" cy="16" r="15" stroke="#EA580C" strokeWidth="1" />
      {/* Basketball lines */}
      <path d="M16 1 Q16 16 16 31" stroke="#C2410C" strokeWidth="1.5" />
      <path d="M1 16 Q16 16 31 16" stroke="#C2410C" strokeWidth="1.5" />
      <path d="M4 7 Q10 16 4 25" stroke="#C2410C" strokeWidth="1.2" fill="none" />
      <path d="M28 7 Q22 16 28 25" stroke="#C2410C" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

function NavLink({ href, label, icon: Icon }: { href: string; label: string; icon: typeof LayoutDashboard }) {
  const [location] = useHashLocation();
  const isActive = location === href || (href !== "/" && location.startsWith(href));

  return (
    <Link href={href}>
      <div
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all group ${
          isActive
            ? "bg-primary/15 text-primary"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
        }`}
        data-testid={`nav-${label.toLowerCase()}`}
      >
        <Icon size={18} className={isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"} />
        <span className="text-sm font-medium">{label}</span>
        {isActive && <ChevronRight size={12} className="ml-auto text-primary" />}
      </div>
    </Link>
  );
}

function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 flex flex-col
          bg-sidebar border-r border-sidebar-border
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto lg:flex`}
        data-testid="sidebar"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
          <BasketballLogo />
          <div>
            <div className="text-xs font-black text-primary tracking-widest uppercase">March Madness</div>
            <div className="text-[10px] text-muted-foreground tracking-wider uppercase font-semibold">2026</div>
          </div>
          <button
            className="ml-auto lg:hidden text-muted-foreground hover:text-foreground"
            onClick={onClose}
            data-testid="close-sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold px-3 mb-2">
            Navigation
          </div>
          {navItems.map(item => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-sidebar-border">
          <div className="text-[10px] text-muted-foreground text-center space-y-1">
            <div className="font-medium text-foreground/60">March Madness 2026</div>
            <div>All 68 Teams · Live Odds</div>
            <div>Mock Trading · Bracket</div>
          </div>
          <PerplexityAttribution />
        </div>
      </aside>
    </>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            data-testid="open-sidebar"
          >
            <Menu size={20} />
          </button>
          <BasketballLogo />
          <span className="font-bold text-sm text-foreground">March Madness 2026</span>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto" data-testid="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

function AppRouter() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/bracket" component={Bracket} />
        <Route path="/team/:teamId" component={TeamDetail} />
        <Route path="/markets" component={Markets} />
        <Route path="/trading" component={Trading} />
        <Route path="/merch" component={Merch} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router hook={useHashLocation}>
          <AppRouter />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
