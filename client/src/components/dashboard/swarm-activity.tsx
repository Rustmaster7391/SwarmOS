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

    // Update connection lines positions
    const updateConnections = () => {
      const svg = document.querySelector('.connection-line')?.parentElement?.parentElement as SVGElement;
      if (svg) {
        const lines = svg.querySelectorAll('.connection-line') as NodeListOf<SVGLineElement>;
        const centerX = svg.clientWidth / 2;
        const centerY = svg.clientHeight / 2;
        
        lines.forEach((line, index) => {
          const agent = document.querySelector(`[style*="perimeter-orbit-${index}"]`) as HTMLElement;
          if (agent) {
            const rect = agent.getBoundingClientRect();
            const svgRect = svg.getBoundingClientRect();
            const agentX = rect.left + rect.width / 2 - svgRect.left;
            const agentY = rect.top + rect.height / 2 - svgRect.top;
            
            line.setAttribute('x1', agentX.toString());
            line.setAttribute('y1', agentY.toString());
            line.setAttribute('x2', centerX.toString());
            line.setAttribute('y2', centerY.toString());
          }
        });
      }
    };

    const connectionInterval = setInterval(updateConnections, 100);

    return () => {
      clearInterval(interval);
      clearInterval(particleInterval);
      clearInterval(connectionInterval);
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

          {/* Central SwarmWare Hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative animate-float-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-spin-slow border-2 border-blue-300/50">
                <div className="w-12 h-12 bg-dark-200 rounded-full flex items-center justify-center animate-pulse">
                  <i className="fas fa-cube text-blue-300 text-xl icon-glow animate-bounce-subtle"></i>
                </div>
              </div>
              {/* Multiple pulsing rings */}
              <div className="absolute inset-0 rounded-full border-2 border-purple-400/40 animate-ping" style={{ animationDuration: '2s' }}></div>
              <div className="absolute -inset-2 rounded-full border border-blue-400/30 animate-ping" style={{ animationDuration: '3s' }}></div>
              <div className="absolute -inset-4 rounded-full border border-purple-300/20 animate-ping" style={{ animationDuration: '4s' }}></div>
            </div>
          </div>

          {/* Triangular Rhombus Icon with Yellow Line */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="absolute top-20 left-0 transform -translate-x-1/2">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-sm transform rotate-45 flex items-center justify-center animate-pulse">
                <i className="fas fa-diamond text-dark-200 text-sm -rotate-45"></i>
              </div>
            </div>
            {/* Thick Yellow Line */}
            <svg className="absolute top-0 left-0 w-32 h-32 transform -translate-x-1/2 -translate-y-1/2">
              <line
                x1="16"
                y1="16"
                x2="16"
                y2="100"
                stroke="#fbbf24"
                strokeWidth="4"
                strokeDasharray="8 4"
                className="animate-pulse"
                style={{ animation: 'dash-flow 2s linear infinite' }}
              />
            </svg>
          </div>

          {/* Agent Nodes Moving Around Perimeter */}
          {agents.map((agent, index) => (
            <div
              key={agent.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
                activeNodes === index ? 'scale-125 z-10' : 'scale-100'
              }`}
              style={{ 
                animation: `perimeter-orbit-${index} ${12 + index * 2}s linear infinite`
              }}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-gray-900 rounded-full border-2 border-gray-700 flex items-center justify-center animate-bounce-subtle">
                  <i className={`fas ${
                    agent.type === 'security' ? 'fa-shield-alt' :
                    agent.type === 'analysis' ? 'fa-chart-line' :
                    agent.type === 'automation' ? 'fa-cogs' :
                    'fa-eye'
                  } text-xs ${agent.color} ${activeNodes === index ? 'icon-glow animate-pulse' : ''}`}
                  style={{ animation: agent.type === 'automation' ? 'spin 4s linear infinite' : 'none' }}
                  ></i>
                </div>

                {/* Constant activity indicators */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400/60 rounded-full animate-ping"></div>
                {activeNodes === index && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                )}
              </div>
            </div>
          ))}

          {/* Dashed Red Lines from Each Agent to Center */}
          <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
            {agents.map((agent, index) => (
              <g key={`connection-${index}`}>
                <line
                  className="connection-line"
                  data-agent={index}
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  style={{ 
                    animation: `dash-flow 2s linear infinite, connection-pulse-${index} 3s ease-in-out infinite`
                  }}
                />
              </g>
            ))}
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
