import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TopBarProps {
  title: string;
  subtitle: string;
  onCreateSwarm?: () => void;
}

export default function TopBar({ title, subtitle, onCreateSwarm }: TopBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="cyber-card border-b neon-border px-6 py-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      <div className="flex items-center justify-between relative">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {title}
          </h1>
          <div className="text-sm text-muted-foreground flex items-center space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span>{subtitle}</span>
          </div>
        </div>
        <div className="flex items-center space-x-6">

          
          {/* System Status */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-success font-mono">SYSTEM ONLINE</span>
          </div>
          
          {/* Notifications */}
          <button className="relative p-3 text-gray-400 hover:text-accent transition-all duration-300 rounded-xl hover:bg-accent/10">
            <i className="fas fa-bell text-lg"></i>
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-accent to-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg">
              3
            </span>
          </button>

          {/* Create Swarm Button */}
          {onCreateSwarm && (
            <Button 
              onClick={onCreateSwarm} 
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 shadow-lg hover:shadow-primary/25 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <i className="fas fa-plus mr-2 text-white"></i>
              <span className="relative">Deploy Swarm</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
