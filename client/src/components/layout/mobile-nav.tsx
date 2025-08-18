import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoPath from "@assets/Untitled design (97)_1755531573825.png";

const navigation = [
  { name: 'Dashboard', href: '/', icon: 'fas fa-chart-line' },
  { name: 'Swarms', href: '/swarms', icon: 'fas fa-layer-group' },
  { name: 'Agents', href: '/agents', icon: 'fas fa-robot' },
  { name: 'Templates', href: '/templates', icon: 'fas fa-cubes' },
  { name: 'Security', href: '/security', icon: 'fas fa-shield-alt' },
  { name: 'Monitoring', href: '/monitoring', icon: 'fas fa-eye' },
  { name: 'Docs/API', href: '/api-docs', icon: 'fas fa-code' },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [location] = useLocation();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Mobile Navigation */}
      <div className="fixed inset-y-0 left-0 z-50 w-72 bg-dark-200 border-r border-gray-700 transform transition-transform duration-300 ease-in-out lg:hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 relative">
                  <img 
                    src={logoPath} 
                    alt="SwarmWare Logo" 
                    className="w-full h-full object-contain filter drop-shadow-lg"
                  />
                </div>
                <div>
                  <span className="text-lg font-bold text-[#00E5CC]">SwarmWare</span>
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="w-1 h-1 bg-[#00E5CC] rounded-full animate-pulse" />
                    <p className="text-xs text-muted-foreground">Neural Network OS</p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <i className="fas fa-times"></i>
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <button
                    onClick={onClose}
                    className={cn(
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary border border-primary/30 shadow-lg shadow-primary/10"
                        : "text-gray-400 hover:text-white hover:bg-dark-300"
                    )}
                  >
                    <i className={`${item.icon} text-lg ${isActive ? 'icon-glow' : ''}`}></i>
                    <span className="font-medium">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    )}
                  </button>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <div className="text-center text-xs text-gray-400">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                <span>All Systems Operational</span>
              </div>
              <p>SwarmWare v2.0 Neural OS</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}