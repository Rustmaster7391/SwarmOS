import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import TopBar from "@/components/layout/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function ApiDocs() {
  
  const { data: apiInfo, isLoading } = useQuery({
    queryKey: ['/api/docs'],
    queryFn: async () => {
      const response = await fetch('/api/docs');
      if (!response.ok) throw new Error('Failed to fetch API docs');
      return response.json();
    },
  });

  const endpoints = [
    { method: 'GET', path: '/api/dashboard/stats', description: 'Get dashboard statistics' },
    { method: 'GET', path: '/api/swarms', description: 'List all swarms' },
    { method: 'POST', path: '/api/swarms', description: 'Create a new swarm' },
    { method: 'PUT', path: '/api/swarms/:id', description: 'Update a swarm' },
    { method: 'DELETE', path: '/api/swarms/:id', description: 'Delete a swarm' },
    { method: 'GET', path: '/api/agents', description: 'List agents for a swarm' },
    { method: 'POST', path: '/api/agents', description: 'Create a new agent' },
    { method: 'GET', path: '/api/templates', description: 'List available templates' },
    { method: 'GET', path: '/api/security/alerts', description: 'Get security alerts' },
    { method: 'POST', path: '/api/security/alerts', description: 'Create a security alert' },
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-success text-white';
      case 'POST': return 'bg-primary text-white';
      case 'PUT': return 'bg-warning text-white';
      case 'DELETE': return 'bg-error text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden dark">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          title="SwarmWare Documentation"
          subtitle="Complete guide to AI agent swarm orchestration"
        />
        
        <main className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="overview">Product Overview</TabsTrigger>
              <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="api">API Reference</TabsTrigger>
            </TabsList>

            {/* Product Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Hero Section */}
              <Card className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border-primary/30">
                <CardHeader>
                  <CardTitle className="text-3xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    SwarmWare - AI Agent Orchestration Platform
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    SwarmWare is the next-generation platform for deploying, managing, and securing AI agent swarms. 
                    Transform your business operations with intelligent, collaborative AI agents that work together 
                    seamlessly to solve complex problems at scale.
                  </p>
                </CardContent>
              </Card>

              {/* What We Offer */}
              <Card className="bg-dark-100 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <i className="fas fa-cubes mr-3 text-accent"></i>
                    What We Offer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <i className="fas fa-robot text-primary text-sm"></i>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">Multi-Agent Orchestration</h4>
                          <p className="text-gray-400 text-sm">Deploy and manage hundreds of AI agents working together in perfect harmony.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <i className="fas fa-shield-alt text-success text-sm"></i>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">Swarm Shield Security</h4>
                          <p className="text-gray-400 text-sm">Enterprise-grade security with real-time threat detection and agent isolation.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <i className="fas fa-chart-line text-accent text-sm"></i>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">Real-Time Monitoring</h4>
                          <p className="text-gray-400 text-sm">Live dashboards and analytics for complete visibility into swarm performance.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-warning/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <i className="fas fa-layer-group text-warning text-sm"></i>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">Template-Based Deployment</h4>
                          <p className="text-gray-400 text-sm">Pre-configured swarm templates for cybersecurity, data analysis, and automation.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <i className="fas fa-expand-arrows-alt text-purple-400 text-sm"></i>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">Auto-Scaling Intelligence</h4>
                          <p className="text-gray-400 text-sm">Dynamic scaling based on workload demands and performance metrics.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <i className="fas fa-code text-blue-400 text-sm"></i>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">Developer-Friendly APIs</h4>
                          <p className="text-gray-400 text-sm">RESTful APIs and WebSocket support for seamless integration.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Use Cases */}
              <Card className="bg-dark-100 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <i className="fas fa-lightbulb mr-3 text-warning"></i>
                    Primary Use Cases
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-dark-300 rounded-lg border border-gray-600">
                      <h4 className="text-white font-medium mb-2">Cybersecurity Operations</h4>
                      <p className="text-gray-400 text-sm">Deploy specialized security agents for threat hunting, vulnerability assessment, and incident response.</p>
                    </div>
                    <div className="p-4 bg-dark-300 rounded-lg border border-gray-600">
                      <h4 className="text-white font-medium mb-2">Data Processing & Analysis</h4>
                      <p className="text-gray-400 text-sm">Coordinate agents for large-scale data processing, pattern recognition, and predictive analytics.</p>
                    </div>
                    <div className="p-4 bg-dark-300 rounded-lg border border-gray-600">
                      <h4 className="text-white font-medium mb-2">Process Automation</h4>
                      <p className="text-gray-400 text-sm">Automate complex workflows with intelligent agents that adapt to changing conditions.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* How It Works Tab */}
            <TabsContent value="how-it-works" className="space-y-6">
              <Card className="bg-dark-100 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <i className="fas fa-cogs mr-3 text-accent"></i>
                    How SwarmWare Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-300 text-lg">
                    SwarmWare orchestrates multiple AI agents working together as a coordinated unit, 
                    multiplying their individual capabilities through intelligent collaboration.
                  </p>
                  
                  {/* Step by step process */}
                  <div className="space-y-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">Template Selection & Configuration</h4>
                        <p className="text-gray-400">Choose from pre-built templates or create custom configurations. Define agent roles, capabilities, and coordination rules.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">Swarm Deployment</h4>
                        <p className="text-gray-400">Agents are deployed across distributed infrastructure with automatic load balancing and optimal resource allocation.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">Intelligent Coordination</h4>
                        <p className="text-gray-400">Agents communicate through encrypted channels, sharing insights and coordinating actions in real-time.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-warning rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">Continuous Monitoring & Optimization</h4>
                        <p className="text-gray-400">Real-time performance monitoring with automatic scaling and security threat detection.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Technical Architecture */}
              <Card className="bg-dark-100 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Technical Architecture</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-3">Core Components</h4>
                      <ul className="space-y-2 text-gray-400">
                        <li>• <strong className="text-white">Orchestration Engine:</strong> Central coordination system</li>
                        <li>• <strong className="text-white">Agent Runtime:</strong> Secure execution environment</li>
                        <li>• <strong className="text-white">Communication Layer:</strong> Encrypted inter-agent messaging</li>
                        <li>• <strong className="text-white">Security Module:</strong> Threat detection and isolation</li>
                        <li>• <strong className="text-white">Monitoring System:</strong> Real-time performance tracking</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-3">Key Technologies</h4>
                      <ul className="space-y-2 text-gray-400">
                        <li>• <strong className="text-white">Distributed Computing:</strong> High-performance clustering</li>
                        <li>• <strong className="text-white">Machine Learning:</strong> Adaptive behavior optimization</li>
                        <li>• <strong className="text-white">Blockchain:</strong> Secure transaction logging</li>
                        <li>• <strong className="text-white">WebSocket:</strong> Real-time communication</li>
                        <li>• <strong className="text-white">Container Technology:</strong> Isolated agent environments</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Benefits Tab */}
            <TabsContent value="benefits" className="space-y-6">
              <Card className="bg-dark-100 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <i className="fas fa-chart-line mr-3 text-success"></i>
                    Benefits of Swarm Agents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Primary Benefits */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-primary/20 to-transparent rounded-lg border border-primary/30">
                        <h4 className="text-white font-semibold mb-2 flex items-center">
                          <i className="fas fa-rocket mr-2 text-primary"></i>
                          Exponential Performance
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Multiple agents working in parallel can process tasks 10-100x faster than single-agent systems, 
                          dramatically reducing time-to-completion for complex operations.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-r from-success/20 to-transparent rounded-lg border border-success/30">
                        <h4 className="text-white font-semibold mb-2 flex items-center">
                          <i className="fas fa-shield-alt mr-2 text-success"></i>
                          Enhanced Reliability
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Built-in redundancy and fault tolerance ensure continuous operation even if individual agents fail. 
                          Automatic failover maintains service continuity.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-r from-accent/20 to-transparent rounded-lg border border-accent/30">
                        <h4 className="text-white font-semibold mb-2 flex items-center">
                          <i className="fas fa-brain mr-2 text-accent"></i>
                          Collective Intelligence
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Agents share knowledge and learn from each other's experiences, creating emergent intelligence 
                          that's greater than the sum of individual capabilities.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-warning/20 to-transparent rounded-lg border border-warning/30">
                        <h4 className="text-white font-semibold mb-2 flex items-center">
                          <i className="fas fa-dollar-sign mr-2 text-warning"></i>
                          Cost Efficiency
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Optimized resource utilization and automatic scaling reduce operational costs while maintaining 
                          peak performance during high-demand periods.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-r from-purple-500/20 to-transparent rounded-lg border border-purple-500/30">
                        <h4 className="text-white font-semibold mb-2 flex items-center">
                          <i className="fas fa-expand-arrows-alt mr-2 text-purple-400"></i>
                          Infinite Scalability
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Seamlessly scale from dozens to thousands of agents based on workload demands. 
                          No architectural limits on swarm size.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-r from-blue-500/20 to-transparent rounded-lg border border-blue-500/30">
                        <h4 className="text-white font-semibold mb-2 flex items-center">
                          <i className="fas fa-lightning-bolt mr-2 text-blue-400"></i>
                          Real-Time Adaptation
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Swarms adapt to changing conditions in real-time, automatically redistributing workloads 
                          and optimizing strategies based on current performance metrics.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Impact */}
              <Card className="bg-dark-100 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Business Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className="fas fa-clock text-primary text-xl"></i>
                      </div>
                      <h4 className="text-white font-semibold mb-2">90% Time Savings</h4>
                      <p className="text-gray-400 text-sm">Automated processes complete in minutes instead of hours</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className="fas fa-target text-success text-xl"></i>
                      </div>
                      <h4 className="text-white font-semibold mb-2">99.9% Accuracy</h4>
                      <p className="text-gray-400 text-sm">Coordinated agents achieve near-perfect task completion</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className="fas fa-chart-bar text-accent text-xl"></i>
                      </div>
                      <h4 className="text-white font-semibold mb-2">300% ROI</h4>
                      <p className="text-gray-400 text-sm">Typical return on investment within first year</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* API Reference Tab */}
            <TabsContent value="api" className="space-y-6">
              {/* API Overview */}
              <Card className="bg-dark-100 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">SwarmWare API</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-20 w-full" />
                  ) : (
                    <div>
                      <p className="text-gray-400 mb-4">
                        {apiInfo?.description || 'Comprehensive API for AI agent swarm management'}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-primary">REST</p>
                          <p className="text-sm text-gray-400">API Style</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-success">JSON</p>
                          <p className="text-sm text-gray-400">Data Format</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-warning">v1.0</p>
                          <p className="text-sm text-gray-400">Version</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-accent">WebSocket</p>
                          <p className="text-sm text-gray-400">Real-time</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* API Endpoints */}
              <Card className="bg-dark-100 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">API Endpoints</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {endpoints.map((endpoint, index) => (
                      <div key={index} className="p-4 bg-dark-300 rounded-lg border border-gray-600">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge className={getMethodColor(endpoint.method)}>
                            {endpoint.method}
                          </Badge>
                          <code className="text-primary font-mono">{endpoint.path}</code>
                        </div>
                        <p className="text-sm text-gray-400">{endpoint.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* WebSocket Information */}
              <Card className="bg-dark-100 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">WebSocket Connection</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Connection URL</h4>
                      <code className="block p-3 bg-dark-300 rounded border border-gray-600 text-primary font-mono">
                        wss://your-domain.com/ws
                      </code>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Real-time Events</h4>
                      <ul className="space-y-2 text-sm text-gray-400">
                        <li>• <code className="text-primary">swarm_created</code> - New swarm created</li>
                        <li>• <code className="text-primary">swarm_updated</code> - Swarm status changed</li>
                        <li>• <code className="text-primary">agent_created</code> - New agent deployed</li>
                        <li>• <code className="text-primary">security_alert</code> - Security threat detected</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
