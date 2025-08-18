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
    <header className="bg-dark-100 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search swarms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-dark-300 border-gray-600 text-white placeholder-gray-400 pl-10 focus:border-primary"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-white transition-all">
            <i className="fas fa-bell icon-glow"></i>
            <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center pulse-purple">
              3
            </span>
          </button>

          {/* Create Swarm Button */}
          {onCreateSwarm && (
            <Button onClick={onCreateSwarm} className="bg-primary hover:bg-primary/80 card-glow transition-all duration-300">
              <i className="fas fa-plus mr-2 icon-glow"></i>
              Create Swarm
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
