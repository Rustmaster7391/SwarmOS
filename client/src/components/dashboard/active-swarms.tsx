import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Swarm } from "@shared/schema";

export default function ActiveSwarms() {
  const { data: swarms, isLoading } = useQuery<Swarm[]>({
    queryKey: ['/api/swarms'],
    queryFn: async () => {
      const response = await fetch('/api/swarms?userId=demo-user');
      if (!response.ok) throw new Error('Failed to fetch swarms');
      return response.json();
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success';
      case 'deploying': return 'bg-warning';
      case 'error': return 'bg-error';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Healthy';
      case 'deploying': return 'Deploying';
      case 'error': return 'Error';
      default: return 'Unknown';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'deploying': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-dark-100 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-white">Active Swarms</CardTitle>
            <Skeleton className="h-6 w-16" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show only active swarms, limit to 3
  const activeSwarms = swarms?.filter(swarm => swarm.status === 'active').slice(0, 3) || [];

  return (
    <Card className="cyber-card neon-border relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="relative pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg font-semibold text-white flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mr-3">
              <i className="fas fa-layer-group text-primary"></i>
            </div>
            <span className="hidden sm:inline">Active Neural Swarms</span>
            <span className="sm:hidden">Active Swarms</span>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 sm:space-y-4">
          {activeSwarms.length === 0 ? (
            <div className="text-center text-gray-400 py-6 sm:py-8">
              <i className="fas fa-layer-group text-2xl sm:text-3xl mb-2 icon-glow"></i>
              <p className="text-sm sm:text-base">No active swarms</p>
              <p className="text-xs sm:text-sm">Create your first swarm to get started</p>
            </div>
          ) : (
            activeSwarms.map((swarm) => (
              <div key={swarm.id} className="p-3 sm:p-4 bg-dark-300 rounded-lg border border-gray-600 card-glow hover:card-glow transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${getStatusColor(swarm.status || 'inactive')} rounded-full pulse-purple flex-shrink-0`}></div>
                    <span className="font-medium text-white text-sm sm:text-base truncate">{swarm.name}</span>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {new Date(swarm.updatedAt || '').toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-gray-400 truncate">
                    {swarm.agentCount} agents • {swarm.description || 'No description'}
                  </span>
                  <span className={`${getStatusTextColor(swarm.status || 'inactive')} flex-shrink-0 ml-2`}>
                    {getStatusText(swarm.status || 'inactive')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
