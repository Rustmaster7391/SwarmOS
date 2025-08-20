import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import TopBar from "@/components/layout/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Template } from "@shared/schema";

export default function Templates() {
  const { data: templates, isLoading } = useQuery<Template[]>({
    queryKey: ['/api/templates'],
    queryFn: async () => {
      const response = await fetch('/api/templates');
      if (!response.ok) throw new Error('Failed to fetch templates');
      return response.json();
    },
  });

  const getTemplateIcon = (type: string) => {
    switch (type) {
      case 'cybersecurity': return 'fas fa-shield-alt';
      case 'data_analysis': return 'fas fa-chart-bar';
      case 'automation': return 'fas fa-cogs';
      case 'monitoring': return 'fas fa-eye';
      default: return 'fas fa-cubes';
    }
  };

  const getTemplateColor = (type: string) => {
    switch (type) {
      case 'cybersecurity': return 'text-primary bg-primary/20';
      case 'data_analysis': return 'text-success bg-success/20';
      case 'automation': return 'text-accent bg-accent/20';
      case 'monitoring': return 'text-warning bg-warning/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden dark">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          title="Templates"
          subtitle="Next-gen swarm blueprints with emergent intelligence patterns"
        />
        
        <main className="flex-1 overflow-auto p-6">
          {/* Futuristic Applications Banner */}
          <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/30 mb-8">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-accent/20 p-4 rounded-lg flex-shrink-0">
                  <i className="fas fa-rocket text-accent text-2xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">Transform Industries with Next-Gen Swarms</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    From autonomous R&D simulations that accelerate scientific breakthroughs to intelligent supply chain optimizers that predict and mitigate global disruptions using predictive analytics and real-time data fusion. Envision AI agents forming adaptive networks, handing off tasks fluidly like neurons in a brain.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="bg-dark-200 rounded p-3">
                      <i className="fas fa-brain text-primary mr-2"></i>
                      <span className="text-gray-300">Multi-modal cognition with human-level reasoning</span>
                    </div>
                    <div className="bg-dark-200 rounded p-3">
                      <i className="fas fa-infinity text-accent mr-2"></i>
                      <span className="text-gray-300">Self-improving algorithms with continuous evolution</span>
                    </div>
                    <div className="bg-dark-200 rounded p-3">
                      <i className="fas fa-globe text-success mr-2"></i>
                      <span className="text-gray-300">Hyperscale deployment across distributed environments</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-dark-100 border-gray-700">
                  <CardContent className="p-6">
                    <Skeleton className="h-40 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : templates && templates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="bg-dark-100 border-gray-700 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-3 rounded-lg ${getTemplateColor(template.type)}`}>
                        <i className={`${getTemplateIcon(template.type)} text-xl`}></i>
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-white">{template.name}</CardTitle>
                        <Badge variant="outline" className="mt-1 capitalize">
                          {template.type.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-400">
                        {template.description || 'No description available'}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">
                          {template.minAgents}-{template.maxAgents} agents
                        </span>
                        <Badge variant="outline" className="text-success border-success">
                          Ready to deploy
                        </Badge>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Created: {new Date(template.createdAt || '').toLocaleDateString()}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <i className="fas fa-eye mr-2"></i>
                          Preview
                        </Button>
                        <Button size="sm" className="flex-1 bg-primary hover:bg-blue-700">
                          <i className="fas fa-rocket mr-2"></i>
                          Deploy
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-dark-100 border border-gray-700 rounded-lg p-8 max-w-md mx-auto">
                <i className="fas fa-cubes text-4xl text-gray-400 mb-4"></i>
                <h3 className="text-xl font-semibold text-white mb-2">No templates available</h3>
                <p className="text-gray-400 mb-6">
                  Templates will be available soon to help you get started quickly
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
