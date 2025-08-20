import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import TopBar from "@/components/layout/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { SecurityAlert } from "@shared/schema";

export default function Security() {
  const { data: alerts, isLoading } = useQuery<SecurityAlert[]>({
    queryKey: ['/api/security/alerts'],
    queryFn: async () => {
      const response = await fetch('/api/security/alerts?userId=demo-user');
      if (!response.ok) throw new Error('Failed to fetch security alerts');
      return response.json();
    },
  });

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return 'fas fa-exclamation-triangle text-error';
      case 'high': return 'fas fa-exclamation-circle text-error';
      case 'medium': return 'fas fa-exclamation text-warning';
      case 'low': return 'fas fa-info-circle text-primary';
      default: return 'fas fa-info text-gray-400';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden dark">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          title="Security"
          subtitle="Bio-mimetic security orchestration with emergent threat intelligence"
        />
        
        <main className="flex-1 overflow-auto p-6">
          {/* Bio-Inspired Security Philosophy */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 mb-8">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/20 p-4 rounded-lg flex-shrink-0">
                  <i className="fas fa-dna text-primary text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Emergent Security Intelligence</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    Inspired by the emergent behaviors of ant colonies and bee hives, SwarmWare harnesses collective intelligence to enable AI agents to self-organize, adapt in real-time, and solve intricate security problems through decentralized decision-making—ushering in a new era of bio-mimetic security orchestration.
                  </p>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <span className="text-success">Self-Organizing Defense</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <span className="text-primary">Adaptive Threat Response</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      <span className="text-accent">Decentralized Intelligence</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-dark-100 border-gray-700 hover:border-success/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Neural Swarm Shield</p>
                    <p className="text-2xl font-bold text-success">Hyperscale Active</p>
                    <p className="text-xs text-success mt-1">Sub-millisecond Response</p>
                  </div>
                  <div className="bg-success/20 p-3 rounded-lg">
                    <i className="fas fa-network-wired text-success text-xl"></i>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-100 border-gray-700 hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Quantum-Grade Channels</p>
                    <p className="text-2xl font-bold text-white">847/847</p>
                    <p className="text-xs text-primary mt-1">Blockchain Verified</p>
                  </div>
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <i className="fas fa-atom text-primary text-xl"></i>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-100 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Active Alerts</p>
                    <p className="text-2xl font-bold text-warning">{alerts?.length || 0}</p>
                  </div>
                  <div className="bg-warning/20 p-3 rounded-lg">
                    <i className="fas fa-exclamation-triangle text-warning text-xl"></i>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Alerts */}
          <Card className="bg-dark-100 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Security Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : alerts && alerts.length > 0 ? (
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="p-4 bg-dark-300 rounded-lg border border-gray-600">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <i className={getSeverityIcon(alert.severity)}></i>
                          <span className="font-medium text-white">{alert.title}</span>
                          <Badge variant={getSeverityVariant(alert.severity)} className="capitalize">
                            {alert.severity}
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-400">
                          {new Date(alert.createdAt || '').toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">
                        {alert.description}
                      </p>
                      <div className="flex justify-end">
                        <Button size="sm" variant="outline">
                          <i className="fas fa-check mr-2"></i>
                          Resolve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <i className="fas fa-shield-alt text-4xl text-gray-400 mb-4"></i>
                  <h3 className="text-xl font-semibold text-white mb-2">All Clear</h3>
                  <p className="text-gray-400">
                    No security alerts at this time. Your swarms are secure.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
