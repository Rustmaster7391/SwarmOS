import { useState } from "react";
import { Button } from "@/components/ui/button";
import MobileNav from "./mobile-nav";

interface TopBarProps {
  title: string;
  subtitle: string;
  onCreateSwarm?: () => void;
}

export default function TopBar({ title, subtitle, onCreateSwarm }: TopBarProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header className="cyber-card border-b neon-border px-3 sm:px-6 py-3 sm:py-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      <div className="flex items-center justify-between relative">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileNavOpen(true)}
            className="lg:hidden text-gray-400 hover:text-white p-2"
          >
            <i className="fas fa-bars"></i>
          </Button>
          
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent truncate">
              {title}
            </h1>
            <div className="text-xs sm:text-sm text-muted-foreground flex items-center space-x-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full animate-pulse" />
              <span className="truncate hidden sm:block">{subtitle}</span>
              <span className="sm:hidden">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3 sm:space-x-6 flex-shrink-0">

          
          {/* System Status - Hidden on small screens */}
          <div className="hidden sm:flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-success font-mono">SYSTEM ONLINE</span>
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 sm:p-3 text-gray-400 hover:text-accent transition-all duration-300 rounded-xl hover:bg-accent/10">
            <i className="fas fa-bell text-sm sm:text-lg"></i>
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-accent to-primary text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center animate-pulse shadow-lg">
              3
            </span>
          </button>

          {/* Create Swarm Button */}
          {onCreateSwarm && (
            <Button 
              onClick={onCreateSwarm} 
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 shadow-lg hover:shadow-primary/25 transition-all duration-300 relative overflow-hidden group px-3 sm:px-4 py-2 text-xs sm:text-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <i className="fas fa-plus mr-1 sm:mr-2 text-white"></i>
              <span className="relative hidden sm:inline">Deploy Swarm</span>
              <span className="relative sm:hidden">Deploy</span>
            </Button>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav 
        isOpen={isMobileNavOpen} 
        onClose={() => setIsMobileNavOpen(false)} 
      />
    </header>
  );
}
