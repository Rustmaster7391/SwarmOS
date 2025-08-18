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
    <Card className="bg-dark-100 border-gray-700 card-glow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <i className="fas fa-layer-group mr-2 icon-glow"></i>
            Active Swarms
          </CardTitle>
          <Button variant="link" className="text-primary hover:text-primary/80 text-sm p-0 icon-glow">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeSwarms.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <i className="fas fa-layer-group text-3xl mb-2 icon-glow"></i>
              <p>No active swarms</p>
              <p className="text-sm">Create your first swarm to get started</p>
            </div>
          ) : (
            activeSwarms.map((swarm) => (
              <div key={swarm.id} className="p-4 bg-dark-300 rounded-lg border border-gray-600 card-glow hover:card-glow transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 ${getStatusColor(swarm.status || 'inactive')} rounded-full pulse-purple`}></div>
                    <span className="font-medium text-white">{swarm.name}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(swarm.updatedAt || '').toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">
                    {swarm.agentCount} agents • {swarm.description || 'No description'}
                  </span>
                  <span className={getStatusTextColor(swarm.status || 'inactive')}>
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
