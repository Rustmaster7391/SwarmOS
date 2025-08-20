import Sidebar from "@/components/layout/sidebar";
import TopBar from "@/components/layout/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Technology() {
  return (
    <div className="flex h-screen overflow-hidden dark">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          title="Technology"
          subtitle="Advanced AI orchestration with bio-mimetic intelligence"
        />
        
        <main className="flex-1 overflow-auto p-3 sm:p-6">
          {/* Hero Section - Swarm Intelligence */}
          <Card className="bg-gradient-to-br from-primary/20 via-dark-200 to-accent/20 border-primary/50 mb-8">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full mb-4">
                  <i className="fas fa-dna text-white text-3xl"></i>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Bio-Mimetic AI Orchestration</h2>
                <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Inspired by the emergent behaviors of ant colonies and bee hives, SwarmWare harnesses collective intelligence to enable AI agents to self-organize, adapt in real-time, and solve intricate problems through decentralized decision-making—ushering in a new era of bio-mimetic AI orchestration.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-success/20 p-4 rounded-lg mb-3 mx-auto w-fit">
                    <i className="fas fa-project-diagram text-success text-2xl"></i>
                  </div>
                  <h4 className="font-semibold text-white mb-2">Emergent Intelligence</h4>
                  <p className="text-sm text-gray-400">Individual agents evolve into cohesive swarms with intelligence surpassing single-model limitations</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/20 p-4 rounded-lg mb-3 mx-auto w-fit">
                    <i className="fas fa-sync-alt text-primary text-2xl"></i>
                  </div>
                  <h4 className="font-semibold text-white mb-2">Adaptive Task Decomposition</h4>
                  <p className="text-sm text-gray-400">Real-time problem breakdown and parallel execution at unprecedented scales</p>
                </div>
                <div className="text-center">
                  <div className="bg-accent/20 p-4 rounded-lg mb-3 mx-auto w-fit">
                    <i className="fas fa-network-wired text-accent text-2xl"></i>
                  </div>
                  <h4 className="font-semibold text-white mb-2">Decentralized Decision Making</h4>
                  <p className="text-sm text-gray-400">Self-organizing networks that adapt without centralized control systems</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enterprise Scalability */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="bg-dark-100 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <i className="fas fa-server mr-3 text-success"></i>
                  Hyperscale Production Ready
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-300 text-sm leading-relaxed">
                  Engineered for hyperscale deployments, SwarmWare supports orchestrating thousands of agents across distributed cloud environments, with built-in load balancing and fault-tolerant mechanisms that ensure zero-downtime automation for mission-critical workflows.
                </p>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Agent Orchestration Capacity</span>
                    <span className="text-sm font-bold text-success">10K+ Concurrent</span>
                  </div>
                  <Progress value={95} className="h-2 bg-dark-400" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Load Balancing Efficiency</span>
                    <span className="text-sm font-bold text-primary">99.7% Uptime</span>
                  </div>
                  <Progress value={99} className="h-2 bg-dark-400" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Fault Tolerance</span>
                    <span className="text-sm font-bold text-accent">Zero-Downtime</span>
                  </div>
                  <Progress value={100} className="h-2 bg-dark-400" />
                </div>
                
                <div className="bg-dark-300 rounded p-4">
                  <h5 className="text-sm font-medium text-white mb-2">Enterprise Features</h5>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Edge computing integration with quantum-inspired optimization</li>
                    <li>• Exascale computing preparation for tomorrow's demands</li>
                    <li>• Mission-critical workflow automation</li>
                    <li>• Distributed cloud environment orchestration</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-100 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <i className="fas fa-brain mr-3 text-primary"></i>
                  Advanced AI Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-300 text-sm leading-relaxed">
                  Leverage state-of-the-art LLMs alongside vision, voice, and sensory models in a unified framework, enabling agents to process multimodal data streams and generate context-aware responses that mimic human-level cognition in dynamic environments.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-dark-300 rounded p-3">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-eye text-primary mr-2"></i>
                      <span className="text-xs font-medium text-white">Vision Models</span>
                    </div>
                    <p className="text-xs text-gray-400">Multi-modal visual processing</p>
                  </div>
                  
                  <div className="bg-dark-300 rounded p-3">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-microphone text-accent mr-2"></i>
                      <span className="text-xs font-medium text-white">Voice AI</span>
                    </div>
                    <p className="text-xs text-gray-400">Natural language understanding</p>
                  </div>
                  
                  <div className="bg-dark-300 rounded p-3">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-chart-line text-success mr-2"></i>
                      <span className="text-xs font-medium text-white">Predictive Analytics</span>
                    </div>
                    <p className="text-xs text-gray-400">Future-aware decision making</p>
                  </div>
                  
                  <div className="bg-dark-300 rounded p-3">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-infinity text-warning mr-2"></i>
                      <span className="text-xs font-medium text-white">Continuous Learning</span>
                    </div>
                    <p className="text-xs text-gray-400">Self-improving algorithms</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded p-4">
                  <h5 className="text-sm font-medium text-white mb-2">Pioneering Self-Improvement</h5>
                  <p className="text-xs text-gray-300">
                    Framework incorporates reinforcement learning loops where agents iteratively refine strategies, fostering continuous evolution and hyper-personalized automation without human intervention.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technical Performance Metrics */}
          <Card className="bg-dark-100 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <i className="fas fa-tachometer-alt mr-3 text-accent"></i>
                Performance & Innovation Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">&lt;1ms</div>
                  <div className="text-sm text-gray-400 mb-2">Agent Interaction Latency</div>
                  <div className="text-xs text-gray-500">Optimized orchestration engines</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">10K+</div>
                  <div className="text-sm text-gray-400 mb-2">Concurrent Agents</div>
                  <div className="text-xs text-gray-500">High-throughput applications</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">24/7</div>
                  <div className="text-sm text-gray-400 mb-2">Continuous Evolution</div>
                  <div className="text-xs text-gray-500">Self-improving systems</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning mb-2">∞</div>
                  <div className="text-sm text-gray-400 mb-2">Scalability Potential</div>
                  <div className="text-xs text-gray-500">Future-proof architecture</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API & Extensibility */}
          <Card className="bg-dark-100 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <i className="fas fa-code mr-3 text-primary"></i>
                Modular API & Extensibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Developer-First Design</h4>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    With a modular API designed for interoperability, SwarmWare empowers developers to craft bespoke agent hierarchies, incorporating blockchain for verifiable computations or federated learning for privacy-preserving multi-agent training.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-primary/20 text-primary border-primary/50">
                        <i className="fas fa-cube mr-1"></i>
                        Modular Architecture
                      </Badge>
                      <span className="text-sm text-gray-400">Plug-and-play components</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-success/20 text-success border-success/50">
                        <i className="fas fa-link mr-1"></i>
                        Blockchain Integration
                      </Badge>
                      <span className="text-sm text-gray-400">Verifiable computations</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-accent/20 text-accent border-accent/50">
                        <i className="fas fa-shield-alt mr-1"></i>
                        Federated Learning
                      </Badge>
                      <span className="text-sm text-gray-400">Privacy-preserving training</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Use Case Applications</h4>
                  <div className="space-y-4">
                    <div className="bg-dark-300 rounded p-4">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-robot text-primary mr-3"></i>
                        <h5 className="font-medium text-white">IoT & Robotics</h5>
                      </div>
                      <p className="text-xs text-gray-400">Real-time sensor coordination and autonomous device management</p>
                    </div>
                    
                    <div className="bg-dark-300 rounded p-4">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-vr-cardboard text-accent mr-3"></i>
                        <h5 className="font-medium text-white">Metaverse Environments</h5>
                      </div>
                      <p className="text-xs text-gray-400">Immersive AI interactions and virtual world orchestration</p>
                    </div>
                    
                    <div className="bg-dark-300 rounded p-4">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-microscope text-success mr-3"></i>
                        <h5 className="font-medium text-white">Scientific R&D</h5>
                      </div>
                      <p className="text-xs text-gray-400">Accelerated breakthrough discovery through AI collaboration</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}