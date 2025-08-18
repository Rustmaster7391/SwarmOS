import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { DashboardStats } from "@/lib/types";

export default function StatsCards() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['/api/dashboard/stats'],
    queryFn: async () => {
      const response = await fetch(`/api/dashboard/stats?userId=demo-user`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-dark-100 border-gray-700">
            <CardContent className="p-6">
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statsConfig = [
    {
      title: "Active Swarms",
      value: stats?.activeSwarms || 0,
      trend: "+2 from yesterday",
      trendType: "positive",
      icon: "fas fa-layer-group",
      iconBg: "bg-primary/20",
      iconColor: "text-primary"
    },
    {
      title: "Total Agents",
      value: stats?.totalAgents || 0,
      trend: "+156 this week",
      trendType: "positive",
      icon: "fas fa-robot",
      iconBg: "bg-success/20",
      iconColor: "text-success"
    },
    {
      title: "Security Alerts",
      value: stats?.securityAlerts || 0,
      trend: "Requires attention",
      trendType: "warning",
      icon: "fas fa-shield-alt",
      iconBg: "bg-warning/20",
      iconColor: "text-warning"
    },
    {
      title: "API Calls",
      value: `${((stats?.apiCalls || 0) / 1000).toFixed(1)}K`,
      trend: "Last 24 hours",
      trendType: "neutral",
      icon: "fas fa-code",
      iconBg: "bg-accent/20",
      iconColor: "text-accent"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsConfig.map((stat, index) => (
        <Card key={index} className="bg-dark-100 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className={`text-sm mt-1 flex items-center space-x-1 ${
                  stat.trendType === 'positive' ? 'text-success' :
                  stat.trendType === 'warning' ? 'text-warning' :
                  'text-gray-400'
                }`}>
                  {stat.trendType === 'positive' && <i className="fas fa-arrow-up"></i>}
                  {stat.trendType === 'warning' && <i className="fas fa-exclamation-triangle"></i>}
                  <span>{stat.trend}</span>
                </p>
              </div>
              <div className={`${stat.iconBg} p-3 rounded-lg`}>
                <i className={`${stat.icon} ${stat.iconColor} text-xl`}></i>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
