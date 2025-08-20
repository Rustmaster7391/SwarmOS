import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
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

  // Dynamic stats that update over time
  const [dynamicSecurityAlerts, setDynamicSecurityAlerts] = useState(3);
  const [dynamicApiCalls, setDynamicApiCalls] = useState(8247);

  useEffect(() => {
    // Update security alerts every 30 minutes (fluctuate between 1-5)
    const securityInterval = setInterval(() => {
      setDynamicSecurityAlerts(Math.floor(Math.random() * 5) + 1);
    }, 30 * 60 * 1000); // 30 minutes

    // Update API calls every 30 minutes with gradual growth
    const apiInterval = setInterval(() => {
      const currentSwarms = stats?.activeSwarms || 2;
      // Base growth rate: 50-150 calls per 30 minutes per swarm
      const growthRate = Math.floor(Math.random() * 100) + 50;
      const growth = currentSwarms * growthRate;
      setDynamicApiCalls(prev => prev + growth);
    }, 30 * 60 * 1000); // 30 minutes

    return () => {
      clearInterval(securityInterval);
      clearInterval(apiInterval);
    };
  }, [stats?.activeSwarms]);

  // Calculate total agents trend based on actual total
  const getTotalAgentsTrend = (totalAgents: number) => {
    if (totalAgents <= 6) return "+2 this week";
    if (totalAgents <= 12) return "+5 this week";
    if (totalAgents <= 25) return "+8 this week";
    return "+12 this week";
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-dark-100 border-gray-700">
            <CardContent className="p-3 sm:p-6">
              <Skeleton className="h-12 sm:h-16 w-full" />
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
      trend: "Growing with new deployments",
      trendType: "positive",
      icon: "fas fa-layer-group",
      iconBg: "bg-primary/20",
      iconColor: "text-primary"
    },
    {
      title: "Total Agents",
      value: stats?.totalAgents || 0,
      trend: getTotalAgentsTrend(stats?.totalAgents || 0),
      trendType: "positive",
      icon: "fas fa-robot",
      iconBg: "bg-success/20",
      iconColor: "text-success"
    },
    {
      title: "Security Alerts",
      value: dynamicSecurityAlerts,
      trend: "Monitoring active",
      trendType: "warning",
      icon: "fas fa-shield-alt",
      iconBg: "bg-warning/20",
      iconColor: "text-warning"
    },
    {
      title: "API Calls",
      value: `${(dynamicApiCalls / 1000).toFixed(1)}K`,
      trend: "Last 24 hours",
      trendType: "neutral",
      icon: "fas fa-code",
      iconBg: "bg-accent/20",
      iconColor: "text-accent"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
      {statsConfig.map((stat, index) => (
        <Card key={index} className="cyber-card neon-border hover:shadow-lg hover:shadow-primary/10 transition-all duration-500 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardContent className="p-3 sm:p-6 relative">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-400 truncate">{stat.title}</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{stat.value}</p>
                <p className={`text-xs sm:text-sm mt-1 flex items-center space-x-1 hidden sm:flex ${
                  stat.trendType === 'positive' ? 'text-success' :
                  stat.trendType === 'warning' ? 'text-warning' :
                  'text-gray-400'
                }`}>
                  {stat.trendType === 'positive' && <i className="fas fa-arrow-up icon-glow"></i>}
                  {stat.trendType === 'warning' && <i className="fas fa-exclamation-triangle icon-glow"></i>}
                  <span>{stat.trend}</span>
                </p>
              </div>
              <div className={`${stat.iconBg} p-2 sm:p-3 rounded-lg gradient-border flex-shrink-0`}>
                <i className={`${stat.icon} ${stat.iconColor} text-sm sm:text-xl icon-glow`}></i>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
