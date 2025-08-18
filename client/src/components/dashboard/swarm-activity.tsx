import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function SwarmActivity() {
  const [activeNodes, setActiveNodes] = useState(0);
  const [connections, setConnections] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodes(prev => (prev + 1) % 6);
      setConnections(prev => (prev + 1) % 8);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const agents = [
    { id: 1, name: 'SecureGuard-Alpha', type: 'security', x: 20, y: 30, color: 'text-red-400' },
    { id: 2, name: 'DataMiner-Beta', type: 'analysis', x: 70, y: 20, color: 'text-blue-400' },
    { id: 3, name: 'AutoFlow-Gamma', type: 'automation', x: 80, y: 70, color: 'text-green-400' },
    { id: 4, name: 'WatchTower-Delta', type: 'monitoring', x: 30, y: 80, color: 'text-yellow-400' },
    { id: 5, name: 'ThreatHunter-Epsilon', type: 'security', x: 50, y: 40, color: 'text-purple-400' },
    { id: 6, name: 'LogicFlow-Zeta', type: 'automation', x: 60, y: 60, color: 'text-orange-400' }
  ];

  return (
    <Card className="lg:col-span-2 bg-dark-100 border-gray-700 card-glow overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white flex items-center">
          <i className="fas fa-project-diagram mr-2 text-primary icon-glow"></i>
          Swarm Network Activity
          <div className="ml-auto flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400">{agents.length} Nodes</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-400">Live</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-80 bg-gradient-to-br from-dark-300/50 via-dark-300/80 to-dark-300 rounded-lg border border-primary/20 overflow-hidden">
          {/* Animated grid background */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" className="animate-pulse">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/30"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Central SwarmWare Logo/Hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-primary via-accent to-primary rounded-full flex items-center justify-center animate-spin-slow">
                <div className="w-12 h-12 bg-dark-200 rounded-full flex items-center justify-center">
                  <i className="fas fa-cube text-primary text-xl icon-glow"></i>
                </div>
              </div>
              {/* Pulsing rings around central hub */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping"></div>
              <div className="absolute -inset-2 rounded-full border border-accent/20 animate-pulse"></div>
            </div>
          </div>

          {/* Agent Nodes */}
          {agents.map((agent, index) => (
            <div
              key={agent.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
                activeNodes === index ? 'scale-125 z-10' : 'scale-100'
              }`}
              style={{ 
                left: `${agent.x}%`, 
                top: `${agent.y}%`,
                animation: `float 3s ease-in-out infinite ${index * 0.5}s`
              }}
            >
              <div className="relative">
                <div className={`w-8 h-8 bg-dark-200 rounded-full border-2 ${
                  activeNodes === index ? 'border-primary' : 'border-gray-500'
                } flex items-center justify-center transition-all duration-500`}>
                  <i className={`fas ${
                    agent.type === 'security' ? 'fa-shield-alt' :
                    agent.type === 'analysis' ? 'fa-chart-line' :
                    agent.type === 'automation' ? 'fa-cogs' :
                    'fa-eye'
                  } text-xs ${agent.color} ${activeNodes === index ? 'icon-glow' : ''}`}></i>
                </div>
                
                {/* Data streams to center */}
                <svg className="absolute top-4 left-4 pointer-events-none" style={{ zIndex: -1 }}>
                  <line
                    x1="0"
                    y1="0"
                    x2={`${(50 - agent.x) * 8}px`}
                    y2={`${(50 - agent.y) * 6}px`}
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className={`${agent.color} opacity-50 ${activeNodes === index ? 'animate-pulse' : ''}`}
                  />
                </svg>

                {/* Activity indicator */}
                {activeNodes === index && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                )}
              </div>
            </div>
          ))}

          {/* Animated connection lines */}
          <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
            {agents.map((agent, i) => 
              agents.slice(i + 1).map((otherAgent, j) => (
                <line
                  key={`${i}-${j}`}
                  x1={`${agent.x}%`}
                  y1={`${agent.y}%`}
                  x2={`${otherAgent.x}%`}
                  y2={`${otherAgent.y}%`}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="2 6"
                  className={`text-primary/20 ${connections === (i + j) % 8 ? 'animate-pulse text-primary/60' : ''}`}
                />
              ))
            )}
          </svg>

          {/* Data flow particles */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 bg-accent rounded-full animate-ping opacity-60`}
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${30 + (i % 3) * 20}%`,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>

          {/* Status display */}
          <div className="absolute bottom-4 left-4 bg-dark-200/80 rounded-lg px-3 py-2 border border-primary/20">
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Active: {agents.length}</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Synced: 847ms</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Load: 23%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
