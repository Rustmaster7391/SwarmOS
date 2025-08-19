import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import TopBar from "@/components/layout/topbar";
import CreateSwarmModal from "@/components/modals/create-swarm-modal";
import AgentSkillsModal from "@/components/modals/agent-skills-modal";
import AgentTasksModal from "@/components/modals/agent-tasks-modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Swarm } from "@shared/schema";

export default function Swarms() {
  const [isCreateSwarmModalOpen, setIsCreateSwarmModalOpen] = useState(false);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [isTasksModalOpen, setIsTasksModalOpen] = useState(false);
  const [selectedSwarm, setSelectedSwarm] = useState<Swarm | null>(null);

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
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          title="Swarms"
          subtitle="Manage your AI agent swarms"
          onCreateSwarm={() => setIsCreateSwarmModalOpen(true)}
        />
        
        <main className="flex-1 overflow-auto p-3 sm:p-6">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-dark-100 border-gray-700">
                  <CardContent className="p-4 sm:p-6">
                    <Skeleton className="h-32 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : swarms && swarms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {swarms.map((swarm) => (
                <Card key={swarm.id} className="bg-dark-100 border-gray-700 hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base sm:text-lg font-semibold text-white truncate mr-2">{swarm.name}</CardTitle>
                      <Badge variant={getStatusVariant(swarm.status || 'inactive')} className="capitalize text-xs flex-shrink-0">
                        {swarm.status || 'inactive'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">
                        {swarm.description || 'No description available'}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 min-w-0 flex-1">
                          <i className={getStatusIcon(swarm.status || 'inactive')}></i>
                          <span className="text-xs sm:text-sm text-gray-300 truncate">
                            {swarm.agentCount || 0} / {swarm.maxAgents || 100} agents
                          </span>
                        </div>
                        {swarm.autoScaling && (
                          <Badge variant="outline" className="text-xs flex-shrink-0">
                            Auto-scaling
                          </Badge>
                        )}
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Created: {new Date(swarm.createdAt || '').toLocaleDateString()}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 hover:bg-primary/20 hover:border-primary/50 transition-colors"
                          onClick={() => {
                            setSelectedSwarm(swarm);
                            setIsSkillsModalOpen(true);
                          }}
                        >
                          <i className="fas fa-eye mr-2"></i>
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 hover:bg-accent/20 hover:border-accent/50 transition-colors"
                          onClick={() => {
                            setSelectedSwarm(swarm);
                            setIsTasksModalOpen(true);
                          }}
                        >
                          <i className="fas fa-tasks mr-2"></i>
                          Task List
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
      
      <AgentSkillsModal
        open={isSkillsModalOpen}
        onOpenChange={setIsSkillsModalOpen}
        swarm={selectedSwarm}
      />
      
      <AgentTasksModal
        open={isTasksModalOpen}
        onOpenChange={setIsTasksModalOpen}
        swarm={selectedSwarm}
      />
    </div>
  );
}
