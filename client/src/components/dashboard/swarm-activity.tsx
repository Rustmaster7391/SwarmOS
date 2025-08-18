import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function SwarmActivity() {
  const [activeNodes, setActiveNodes] = useState(0);
  const [connections, setConnections] = useState(0);
  const [particlePositions, setParticlePositions] = useState<Array<{x: number, y: number}>>([]);

  useEffect(() => {
    // Animate active nodes and connections
    const interval = setInterval(() => {
      setActiveNodes(prev => (prev + 1) % 6);
      setConnections(prev => (prev + 1) % 8);
    }, 1500);

    // Animate particle positions randomly
    const particleInterval = setInterval(() => {
      setParticlePositions(prev => 
        Array(8).fill(0).map((_, i) => ({
          x: 15 + Math.random() * 70,
          y: 15 + Math.random() * 70
        }))
      );
    }, 3000);

    // Initialize particles
    setParticlePositions(
      Array(8).fill(0).map(() => ({
        x: 15 + Math.random() * 70,
        y: 15 + Math.random() * 70
      }))
    );

    return () => {
      clearInterval(interval);
      clearInterval(particleInterval);
    };
  }, []);

  const agents = [
    { id: 1, name: 'SecureGuard-Alpha', type: 'security', baseX: 20, baseY: 30, color: 'text-red-400' },
    { id: 2, name: 'DataMiner-Beta', type: 'analysis', baseX: 70, baseY: 20, color: 'text-blue-400' },
    { id: 3, name: 'AutoFlow-Gamma', type: 'automation', baseX: 80, baseY: 70, color: 'text-green-400' },
    { id: 4, name: 'WatchTower-Delta', type: 'monitoring', baseX: 30, baseY: 80, color: 'text-yellow-400' },
    { id: 5, name: 'ThreatHunter-Epsilon', type: 'security', baseX: 50, baseY: 40, color: 'text-purple-400' },
    { id: 6, name: 'LogicFlow-Zeta', type: 'automation', baseX: 60, baseY: 60, color: 'text-orange-400' }
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
            <div className="relative animate-float-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary via-accent to-primary rounded-full flex items-center justify-center animate-spin-slow">
                <div className="w-12 h-12 bg-dark-200 rounded-full flex items-center justify-center animate-pulse">
                  <i className="fas fa-cube text-primary text-xl icon-glow animate-bounce-subtle"></i>
                </div>
              </div>
              {/* Multiple pulsing rings */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" style={{ animationDuration: '2s' }}></div>
              <div className="absolute -inset-2 rounded-full border border-accent/20 animate-ping" style={{ animationDuration: '3s' }}></div>
              <div className="absolute -inset-4 rounded-full border border-primary/10 animate-ping" style={{ animationDuration: '4s' }}></div>
            </div>
          </div>

          {/* Agent Nodes */}
          {agents.map((agent, index) => (
            <div
              key={agent.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-2000 ${
                activeNodes === index ? 'scale-125 z-10' : 'scale-100'
              }`}
              style={{ 
                left: `${agent.baseX}%`, 
                top: `${agent.baseY}%`,
                animation: `orbit-${index} ${8 + index * 2}s ease-in-out infinite, float ${3 + index * 0.3}s ease-in-out infinite ${index * 0.5}s`
              }}
            >
              <div className="relative">
                <div className={`w-8 h-8 bg-dark-200 rounded-full border-2 ${
                  activeNodes === index ? 'border-primary animate-pulse' : 'border-gray-500'
                } flex items-center justify-center transition-all duration-500 animate-bounce-subtle`}>
                  <i className={`fas ${
                    agent.type === 'security' ? 'fa-shield-alt' :
                    agent.type === 'analysis' ? 'fa-chart-line' :
                    agent.type === 'automation' ? 'fa-cogs' :
                    'fa-eye'
                  } text-xs ${agent.color} ${activeNodes === index ? 'icon-glow animate-pulse' : ''}`}
                  style={{ animation: agent.type === 'automation' ? 'spin 4s linear infinite' : 'none' }}
                  ></i>
                </div>
                
                {/* Animated data streams to center */}
                <svg className="absolute top-4 left-4 pointer-events-none w-32 h-32" style={{ zIndex: -1 }}>
                  <line
                    x1="0"
                    y1="0"
                    x2={`${(50 - agent.baseX) * 6}px`}
                    y2={`${(50 - agent.baseY) * 5}px`}
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="8 4"
                    className={`${agent.color} opacity-40 animate-pulse`}
                    style={{ 
                      animation: `dash-flow 3s linear infinite, pulse 2s ease-in-out infinite ${index * 0.3}s` 
                    }}
                  />
                </svg>

                {/* Constant activity indicators */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400/60 rounded-full animate-ping"></div>
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
                  x1={`${agent.baseX}%`}
                  y1={`${agent.baseY}%`}
                  x2={`${otherAgent.baseX}%`}
                  y2={`${otherAgent.baseY}%`}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="2 6"
                  className={`text-primary/20 ${connections === (i + j) % 8 ? 'animate-pulse text-primary/60' : ''}`}
                />
              ))
            )}
          </svg>

          {/* Enhanced data flow particles */}
          <div className="absolute inset-0">
            {particlePositions.map((particle, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 bg-accent rounded-full transition-all duration-3000 ease-in-out`}
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  animation: `ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite, float-particle ${2 + i * 0.3}s ease-in-out infinite ${i * 0.2}s`,
                  opacity: 0.7
                }}
              />
            ))}
            {/* Additional static flowing particles */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`static-${i}`}
                className={`absolute w-0.5 h-0.5 bg-primary/60 rounded-full`}
                style={{
                  left: `${15 + (i * 7) % 70}%`,
                  top: `${20 + (i * 11) % 60}%`,
                  animation: `ping ${1 + (i % 3) * 0.5}s cubic-bezier(0, 0, 0.2, 1) infinite ${i * 0.1}s, drift-${i % 4} ${6 + i * 0.5}s linear infinite`
                }}
              />
            ))}
          </div>

          {/* Tightened status display */}
          <div className="absolute bottom-2 left-2 bg-dark-200/90 rounded px-2 py-1 border border-primary/20 backdrop-blur-sm">
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Active: {agents.length}</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">847ms</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">23%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
