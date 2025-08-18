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
          subtitle="Swarm Shield security monitoring and threat detection"
        />
        
        <main className="flex-1 overflow-auto p-6">
          {/* Security Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-dark-100 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Swarm Shield</p>
                    <p className="text-2xl font-bold text-success">Active</p>
                  </div>
                  <div className="bg-success/20 p-3 rounded-lg">
                    <i className="fas fa-shield-alt text-success text-xl"></i>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-100 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Encrypted Channels</p>
                    <p className="text-2xl font-bold text-white">847/847</p>
                  </div>
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <i className="fas fa-lock text-primary text-xl"></i>
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
