import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import type { SecurityAlert } from "@shared/schema";

export default function SecurityOverview() {
  const { data: alerts, isLoading } = useQuery<SecurityAlert[]>({
    queryKey: ['/api/security/alerts'],
    queryFn: async () => {
      const response = await fetch('/api/security/alerts?userId=demo-user');
      if (!response.ok) throw new Error('Failed to fetch security alerts');
      return response.json();
    },
  });

  const recentEvents = [
    {
      type: 'warning',
      message: 'Unusual coordination pattern detected in Swarm Alpha',
      icon: '⚠'
    },
    {
      type: 'success',
      message: 'Agent isolation successfully completed',
      icon: '✓'
    },
    {
      type: 'info',
      message: 'New security policy applied to 24 agents',
      icon: 'ℹ'
    }
  ];

  if (isLoading) {
    return (
      <Card className="bg-dark-100 border-gray-700">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    );
  }

  const alertCount = alerts?.length || 0;

  return (
    <Card className="bg-dark-100 border-gray-700 card-glow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg font-semibold text-white flex items-center">
            <i className="fas fa-shield-alt mr-2 icon-glow"></i>
            Security Overview
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-success rounded-full pulse-purple"></div>
            <span className="text-xs sm:text-sm text-success hidden sm:inline">Swarm Shield Active</span>
            <span className="text-xs text-success sm:hidden">Active</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Security Metrics */}
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <div className="flex items-center justify-between p-2 sm:p-3 bg-dark-300 rounded-lg border border-gray-600 card-glow hover:card-glow transition-all duration-300">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
              <i className="fas fa-lock text-success icon-glow text-sm"></i>
              <span className="text-white text-xs sm:text-sm truncate">Encrypted Channels</span>
            </div>
            <span className="text-success text-xs sm:text-sm flex-shrink-0">847/847</span>
          </div>

          <div className="flex items-center justify-between p-2 sm:p-3 bg-dark-300 rounded-lg border border-gray-600 card-glow hover:card-glow transition-all duration-300">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
              <i className="fas fa-eye text-primary icon-glow text-sm"></i>
              <span className="text-white text-xs sm:text-sm truncate">Anomaly Detection</span>
            </div>
            <span className="text-primary text-xs sm:text-sm flex-shrink-0">Monitoring</span>
          </div>

          <div className="flex items-center justify-between p-2 sm:p-3 bg-dark-300 rounded-lg border border-gray-600 card-glow hover:card-glow transition-all duration-300">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
              <i className="fas fa-exclamation-triangle text-warning icon-glow text-sm"></i>
              <span className="text-white text-xs sm:text-sm truncate">Recent Alerts</span>
            </div>
            <span className="text-warning text-xs sm:text-sm flex-shrink-0">{alertCount} pending</span>
          </div>

          <div className="flex items-center justify-between p-2 sm:p-3 bg-dark-300 rounded-lg border border-gray-600 card-glow hover:card-glow transition-all duration-300">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
              <i className="fas fa-clipboard-list text-gray-400 icon-glow text-sm"></i>
              <span className="text-white text-xs sm:text-sm truncate">Audit Logs</span>
            </div>
            <Link href="/audit-logs">
              <Button variant="link" className="text-primary hover:text-primary/80 text-xs sm:text-sm p-0 icon-glow flex-shrink-0">
                View
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent Security Events */}
        <div>
          <h4 className="text-xs sm:text-sm font-medium text-gray-300 mb-2 sm:mb-3">Recent Events</h4>
          <div className="space-y-2">
            {recentEvents.map((event, index) => (
              <div key={index} className="text-xs text-gray-400 p-2 bg-dark-200 rounded border border-gray-700">
                <span className={
                  event.type === 'warning' ? 'text-warning' :
                  event.type === 'success' ? 'text-success' :
                  'text-primary'
                }>
                  {event.icon}
                </span>{' '}
                <span className="break-words">{event.message}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
