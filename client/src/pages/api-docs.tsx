import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import TopBar from "@/components/layout/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
          title="API Documentation"
          subtitle="Integration guides and API reference"
        />
        
        <main className="flex-1 overflow-auto p-6">
          {/* API Overview */}
          <Card className="bg-dark-100 border-gray-700 mb-6">
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
          <Card className="bg-dark-100 border-gray-700 mt-6">
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
        </main>
      </div>
    </div>
  );
}
