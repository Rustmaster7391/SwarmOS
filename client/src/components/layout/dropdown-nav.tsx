import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import swarmwareLogo from "../../assets/swarmware-logo.svg";

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
  { path: '/swarms', label: 'Swarms', icon: 'fas fa-layer-group' },
  { path: '/agents', label: 'Agents', icon: 'fas fa-robot' },
  { path: '/templates', label: 'Deploy Swarm', icon: 'fas fa-rocket' },
  { path: '/monitoring', label: 'Monitoring', icon: 'fas fa-chart-line' },
  { path: '/security', label: 'Security', icon: 'fas fa-shield-alt' },
  { path: '/api-docs', label: 'API Docs', icon: 'fas fa-book' },
];

export default function DropdownNav() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const getCurrentPageTitle = () => {
    const currentItem = navItems.find(item => item.path === location);
    return currentItem?.label || 'SwarmWare';
  };

  return (
    <div className="bg-dark-200 border-b border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Simple Navigation Menu */}
        <div className="relative">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="ghost"
            className="flex items-center space-x-2 text-white hover:bg-dark-100 p-2 h-auto"
          >
            {/* SwarmWare Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <i className="fas fa-dna text-white text-sm"></i>
              </div>
              <span className="font-bold text-lg">SwarmWare</span>
            </div>
            <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-gray-400 ml-2`}></i>
          </Button>
          
          {isOpen && (
            <div className="absolute top-full left-0 w-64 bg-dark-100 border border-gray-700 rounded-lg shadow-lg z-50 mt-1">
              <div className="px-3 py-2 border-b border-gray-700">
                <p className="text-sm text-gray-400">Navigation</p>
              </div>
              
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 cursor-pointer hover:bg-dark-300 transition-colors ${
                    location === item.path ? 'bg-primary/20 text-primary' : 'text-gray-300'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <i className={`${item.icon} w-4 text-center`}></i>
                  <span>{item.label}</span>
                  {location === item.path && (
                    <i className="fas fa-circle text-primary text-xs ml-auto"></i>
                  )}
                </Link>
              ))}
              
              <div className="border-t border-gray-700 px-3 py-2">
                <p className="text-xs text-gray-500">Bio-inspired AI orchestration</p>
              </div>
            </div>
          )}
        </div>

        {/* Current Page Title - Mobile Only */}
        <div className="block sm:hidden">
          <span className="text-sm text-gray-400">{getCurrentPageTitle()}</span>
        </div>

        {/* Status Indicator and Logo */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 hidden sm:inline">Live</span>
          </div>
          
          {/* SwarmWare Logo */}
          <div className="opacity-70 hover:opacity-100 transition-opacity duration-300">
            <img 
              src={swarmwareLogo} 
              alt="SwarmWare" 
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}