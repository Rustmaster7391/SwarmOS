import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import TopBar from "@/components/layout/topbar";
import CreateSwarmModal from "@/components/modals/create-swarm-modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Swarm } from "@shared/schema";

export default function Swarms() {
  const [isCreateSwarmModalOpen, setIsCreateSwarmModalOpen] = useState(false);

  const { data: swarms, isLoading } = useQuery<Swarm[]>({
    queryKey: ['/api/swarms'],
    queryFn: async () => {
      const response = await fetch('/api/swarms?userId=demo-user');
      if (!response.ok) throw new Error('Failed to fetch swarms');
      return response.json();
    },
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'deploying': return 'secondary';
      case 'error': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return 'fas fa-play-circle text-success';
      case 'deploying': return 'fas fa-sync-alt text-warning animate-spin';
      case 'error': return 'fas fa-exclamation-circle text-error';
      default: return 'fas fa-pause-circle text-gray-400';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden dark">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          title="Swarms"
          subtitle="Manage your AI agent swarms"
          onCreateSwarm={() => setIsCreateSwarmModalOpen(true)}
        />
        
        <main className="flex-1 overflow-auto p-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-dark-100 border-gray-700">
                  <CardContent className="p-6">
                    <Skeleton className="h-32 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : swarms && swarms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {swarms.map((swarm) => (
                <Card key={swarm.id} className="bg-dark-100 border-gray-700 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-white">{swarm.name}</CardTitle>
                      <Badge variant={getStatusVariant(swarm.status || 'inactive')} className="capitalize">
                        {swarm.status || 'inactive'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-400">
                        {swarm.description || 'No description available'}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <i className={getStatusIcon(swarm.status || 'inactive')}></i>
                          <span className="text-sm text-gray-300">
                            {swarm.agentCount || 0} / {swarm.maxAgents || 100} agents
                          </span>
                        </div>
                        {swarm.autoScaling && (
                          <Badge variant="outline" className="text-xs">
                            Auto-scaling
                          </Badge>
                        )}
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Created: {new Date(swarm.createdAt || '').toLocaleDateString()}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <i className="fas fa-eye mr-2"></i>
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <i className="fas fa-edit mr-2"></i>
                          Edit
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
                <i className="fas fa-layer-group text-4xl text-gray-400 mb-4"></i>
                <h3 className="text-xl font-semibold text-white mb-2">No swarms yet</h3>
                <p className="text-gray-400 mb-6">
                  Create your first swarm to start managing AI agents
                </p>
                <Button 
                  onClick={() => setIsCreateSwarmModalOpen(true)}
                  className="bg-primary hover:bg-blue-700"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Create Your First Swarm
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>

      <CreateSwarmModal
        open={isCreateSwarmModalOpen}
        onOpenChange={setIsCreateSwarmModalOpen}
      />
    </div>
  );
}
