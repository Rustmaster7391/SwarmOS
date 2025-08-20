import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import DropdownNav from "@/components/layout/dropdown-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { SecurityAlert } from "@shared/schema";

export default function Security() {
  const queryClient = useQueryClient();
  const [alertsToResolve, setAlertsToResolve] = useState<Set<string>>(new Set());
  const [localAlerts, setLocalAlerts] = useState<SecurityAlert[]>([]);

  const { data: alerts, isLoading } = useQuery<SecurityAlert[]>({
    queryKey: ['/api/security/alerts'],
    queryFn: async () => {
      const response = await fetch('/api/security/alerts?userId=demo-user');
      if (!response.ok) throw new Error('Failed to fetch security alerts');
      return response.json();
    },
  });

  // Initialize and manage local alerts state
  useEffect(() => {
    if (alerts && alerts.length > 0) {
      setLocalAlerts(alerts);
    } else {
      // Add some initial alerts for demonstration
      const initialAlerts: SecurityAlert[] = [
        {
          id: "initial-1",
          title: "Agent Initialization Anomaly",
          description: "Unusual agent startup patterns detected in swarm cluster 03",
          severity: "high",
          swarmId: "demo-swarm",
          agentId: null,
          resolved: false,
          createdAt: new Date(Date.now() - 300000), // 5 minutes ago
          resolvedAt: null
        },
        {
          id: "initial-2",
          title: "Memory Threshold Exceeded",
          description: "Agent resource consumption above normal parameters",
          severity: "medium",
          swarmId: "demo-swarm",
          agentId: null,
          resolved: false,
          createdAt: new Date(Date.now() - 120000), // 2 minutes ago
          resolvedAt: null
        },
        {
          id: "initial-3",
          title: "Communication Protocol Violation",
          description: "Unauthorized inter-agent communication attempt blocked",
          severity: "critical",
          swarmId: "demo-swarm",
          agentId: null,
          resolved: false,
          createdAt: new Date(),
          resolvedAt: null
        }
      ];
      setLocalAlerts(initialAlerts);
    }
  }, [alerts]);

  // Dynamic alert generation and resolution system
  useEffect(() => {
    const alertTemplates = [
      {
        title: "Agent Initialization Anomaly",
        description: "Unusual agent startup patterns detected in swarm cluster 03",
        severity: "high" as const
      },
      {
        title: "Memory Threshold Exceeded",
        description: "Agent resource consumption above normal parameters",
        severity: "medium" as const
      },
      {
        title: "Communication Protocol Violation",
        description: "Unauthorized inter-agent communication attempt blocked",
        severity: "critical" as const
      },
      {
        title: "Neural Network Drift",
        description: "Agent learning parameters deviating from baseline",
        severity: "medium" as const
      },
      {
        title: "Security Token Renewal",
        description: "Automated security credential refresh in progress",
        severity: "low" as const
      },
      {
        title: "Swarm Consensus Timeout",
        description: "Decision making delay detected in agent coordination",
        severity: "high" as const
      },
      {
        title: "Behavioral Pattern Anomaly",
        description: "Agent exhibiting unexpected task execution patterns",
        severity: "medium" as const
      }
    ];

    // Function to generate new alert
    const generateAlert = () => {
      if (localAlerts.length >= 7) return; // Max 7 alerts

      const template = alertTemplates[Math.floor(Math.random() * alertTemplates.length)];
      const newAlert: SecurityAlert = {
        id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: template.title,
        description: template.description,
        severity: template.severity,
        swarmId: "demo-swarm",
        agentId: null,
        resolved: false,
        createdAt: new Date(),
        resolvedAt: null
      };

      setLocalAlerts(prev => [...prev, newAlert]);
      
      // Update dashboard stats
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
    };

    // Function to resolve an alert
    const resolveRandomAlert = () => {
      const unresolvedAlerts = localAlerts.filter(alert => !Array.from(alertsToResolve).includes(alert.id));
      if (unresolvedAlerts.length === 0) return;

      const alertToResolve = unresolvedAlerts[Math.floor(Math.random() * unresolvedAlerts.length)];
      
      // Mark alert as resolving (button turns green)
      setAlertsToResolve(prev => new Set([...prev, alertToResolve.id]));

      // Remove alert after 2 minutes (15 seconds for demo)
      setTimeout(() => {
        setLocalAlerts(prev => prev.filter(alert => alert.id !== alertToResolve.id));
        setAlertsToResolve(prev => {
          const updated = new Set(prev);
          updated.delete(alertToResolve.id);
          return updated;
        });
        
        // Update dashboard stats
        queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });

        // Generate new alert 2 minutes after completion (10 seconds for demo)
        setTimeout(generateAlert, 10 * 1000);
      }, 15 * 1000);
    };

    // Set up intervals - using shorter times for demo (30 seconds to 2 minutes instead of 5-20 minutes)
    const resolveInterval = setInterval(() => {
      resolveRandomAlert();
    }, Math.random() * (2 - 0.5) * 60 * 1000 + 30 * 1000); // 30 seconds to 2 minutes for demo

    // Initial random alert generation
    const initialDelay = Math.random() * 30000 + 10000; // 10-40 seconds
    const initialTimer = setTimeout(generateAlert, initialDelay);

    return () => {
      clearInterval(resolveInterval);
      clearTimeout(initialTimer);
    };
  }, [localAlerts, alertsToResolve, queryClient]);

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
    <div className="min-h-screen dark bg-dark-200">
      <DropdownNav />
      
      <div className="flex flex-col">
        {/* Page Header */}
        <div className="bg-dark-200 border-b border-gray-700 px-4 sm:px-6 py-4 sm:py-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Security</h1>
            <p className="text-gray-400 text-sm sm:text-base mt-2">Bio-mimetic security orchestration with emergent threat intelligence</p>
          </div>
        </div>
        
        <main className="flex-1 px-4 sm:px-6 py-6 max-w-7xl mx-auto w-full">
          {/* Bio-Inspired Security Philosophy */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 mb-6 sm:mb-8">
            <CardContent className="p-4 sm:p-6">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card className="bg-dark-100 border-gray-700 hover:border-success/50 transition-colors">
              <CardContent className="p-4 sm:p-6">
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
                    <p className="text-2xl font-bold text-warning">{localAlerts.length}</p>
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
              ) : localAlerts && localAlerts.length > 0 ? (
                <div className="max-h-96 overflow-y-auto space-y-4 pr-2">
                  {localAlerts.map((alert) => (
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
                        <Button 
                          size="sm" 
                          className={`transition-none ${
                            alertsToResolve.has(alert.id) 
                              ? "bg-success hover:bg-success text-white border-success" 
                              : "bg-destructive hover:bg-destructive text-white border-destructive"
                          }`}
                          disabled={alertsToResolve.has(alert.id)}
                        >
                          <i className={`${
                            alertsToResolve.has(alert.id) 
                              ? "fas fa-check" 
                              : "fas fa-wrench"
                          } mr-2`}></i>
                          {alertsToResolve.has(alert.id) ? "Resolved" : "Fixing"}
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
