import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Swarm } from "@shared/schema";

interface AgentTasksModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  swarm: Swarm | null;
}

// Generate critical tasks based on swarm type and name
const getAgentTasks = (swarm: Swarm) => {
  const swarmName = swarm.name.toLowerCase();
  
  if (swarmName.includes('cybersecurity') || swarmName.includes('security')) {
    return {
      missionTitle: "Operation Digital Fortress",
      priority: "CRITICAL",
      activeTasks: [
        {
          id: "SEC-001",
          title: "Advanced Persistent Threat Neutralization",
          description: "Continuously monitor and neutralize APT groups targeting critical infrastructure. Deploy honeypots and analyze attack vectors in real-time.",
          status: "active",
          progress: 78,
          priority: "CRITICAL",
          assignedAgents: 12,
          timeRemaining: "2h 34m",
          category: "threat-hunting"
        },
        {
          id: "SEC-002", 
          title: "Zero-Day Vulnerability Assessment",
          description: "Conduct comprehensive scanning of all network endpoints for unknown vulnerabilities. Implement immediate containment protocols for discovered threats.",
          status: "active",
          progress: 65,
          priority: "HIGH",
          assignedAgents: 8,
          timeRemaining: "4h 12m",
          category: "vulnerability-scan"
        },
        {
          id: "SEC-003",
          title: "Dark Web Intelligence Gathering",
          description: "Monitor underground forums and marketplaces for organization-specific threats. Track stolen credentials and planned attacks.",
          status: "active", 
          progress: 89,
          priority: "HIGH",
          assignedAgents: 6,
          timeRemaining: "1h 45m",
          category: "intelligence"
        },
        {
          id: "SEC-004",
          title: "Incident Response Automation",
          description: "Orchestrate automated response to detected security incidents. Deploy containment measures and evidence collection protocols.",
          status: "pending",
          progress: 0,
          priority: "MEDIUM",
          assignedAgents: 15,
          timeRemaining: "6h 00m",
          category: "response"
        }
      ]
    };
  }
  
  if (swarmName.includes('financial') || swarmName.includes('trading')) {
    return {
      missionTitle: "Operation Market Sentinel",
      priority: "CRITICAL",
      activeTasks: [
        {
          id: "FIN-001",
          title: "High-Frequency Trading Optimization",
          description: "Execute microsecond arbitrage strategies across global markets. Monitor price discrepancies and execute trades within 50 microseconds.",
          status: "active",
          progress: 94,
          priority: "CRITICAL",
          assignedAgents: 20,
          timeRemaining: "Continuous",
          category: "trading"
        },
        {
          id: "FIN-002",
          title: "Market Manipulation Detection",
          description: "Analyze trading patterns for signs of illegal market manipulation. Flag suspicious volume spikes and coordinated trading activities.",
          status: "active",
          progress: 87,
          priority: "HIGH",
          assignedAgents: 10,
          timeRemaining: "2h 15m",
          category: "compliance"
        },
        {
          id: "FIN-003",
          title: "Real-time Risk Assessment",
          description: "Continuously evaluate portfolio risk exposure across all asset classes. Implement dynamic hedging strategies to minimize potential losses.",
          status: "active",
          progress: 92,
          priority: "CRITICAL",
          assignedAgents: 15,
          timeRemaining: "Continuous",
          category: "risk-management"
        },
        {
          id: "FIN-004",
          title: "Fraud Pattern Analysis",
          description: "Monitor transaction flows for unusual patterns indicating potential fraud. Deploy machine learning models to detect emerging fraud schemes.",
          status: "active",
          progress: 76,
          priority: "HIGH",
          assignedAgents: 8,
          timeRemaining: "3h 30m",
          category: "fraud-detection"
        }
      ]
    };
  }
  
  if (swarmName.includes('healthcare') || swarmName.includes('medical')) {
    return {
      missionTitle: "Operation Life Guardian",
      priority: "CRITICAL",
      activeTasks: [
        {
          id: "MED-001",
          title: "Critical Patient Monitoring",
          description: "Continuously monitor ICU patients for early warning signs of deterioration. Predict cardiac events 6 hours before occurrence.",
          status: "active",
          progress: 96,
          priority: "CRITICAL",
          assignedAgents: 25,
          timeRemaining: "Continuous",
          category: "patient-care"
        },
        {
          id: "MED-002",
          title: "Drug Interaction Prevention",
          description: "Analyze all prescribed medications for potential dangerous interactions. Cross-reference patient genetics with drug metabolism pathways.",
          status: "active",
          progress: 88,
          priority: "HIGH",
          assignedAgents: 12,
          timeRemaining: "1h 20m",
          category: "pharmacology"
        },
        {
          id: "MED-003",
          title: "Epidemic Outbreak Prediction", 
          description: "Model disease spread patterns and predict potential outbreaks. Analyze global health data and travel patterns for early warning systems.",
          status: "active",
          progress: 73,
          priority: "HIGH",
          assignedAgents: 18,
          timeRemaining: "5h 45m",
          category: "epidemiology"
        },
        {
          id: "MED-004",
          title: "Precision Medicine Optimization",
          description: "Generate personalized treatment recommendations based on patient genomics, medical history, and real-time biomarkers.",
          status: "pending",
          progress: 0,
          priority: "MEDIUM",
          assignedAgents: 10,
          timeRemaining: "8h 00m",
          category: "precision-medicine"
        }
      ]
    };
  }
  
  // Default for general or custom swarms
  return {
    missionTitle: "Operation Neural Nexus",
    priority: "HIGH",
    activeTasks: [
      {
        id: "GEN-001",
        title: "Multi-Domain Data Integration",
        description: "Aggregate and analyze data from multiple sources to identify cross-functional patterns and optimization opportunities.",
        status: "active",
        progress: 84,
        priority: "HIGH",
        assignedAgents: 16,
        timeRemaining: "3h 15m",
        category: "data-analysis"
      },
      {
        id: "GEN-002",
        title: "Predictive Workflow Optimization",
        description: "Analyze operational workflows to predict bottlenecks and recommend efficiency improvements. Implement automated optimization protocols.",
        status: "active",
        progress: 72,
        priority: "MEDIUM",
        assignedAgents: 12,
        timeRemaining: "4h 30m",
        category: "optimization"
      },
      {
        id: "GEN-003",
        title: "Adaptive Learning Protocol",
        description: "Continuously update agent capabilities based on performance feedback and environmental changes. Implement self-improving algorithms.",
        status: "active",
        progress: 91,
        priority: "HIGH",
        assignedAgents: 8,
        timeRemaining: "2h 00m",
        category: "learning"
      },
      {
        id: "GEN-004",
        title: "Resource Allocation Management",
        description: "Optimize computational resource distribution across all active tasks. Monitor performance metrics and adjust allocation dynamically.",
        status: "pending",
        progress: 0,
        priority: "MEDIUM", 
        assignedAgents: 6,
        timeRemaining: "6h 00m",
        category: "resource-management"
      }
    ]
  };
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-500/20 text-green-300 border-green-500/50';
    case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
    case 'completed': return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
    default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'CRITICAL': return 'bg-red-500/20 text-red-300 border-red-500/50';
    case 'HIGH': return 'bg-orange-500/20 text-orange-300 border-orange-500/50';
    case 'MEDIUM': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
    default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'threat-hunting': return 'fas fa-crosshairs';
    case 'vulnerability-scan': return 'fas fa-search';
    case 'intelligence': return 'fas fa-eye';
    case 'response': return 'fas fa-shield-alt';
    case 'trading': return 'fas fa-chart-line';
    case 'compliance': return 'fas fa-gavel';
    case 'risk-management': return 'fas fa-balance-scale';
    case 'fraud-detection': return 'fas fa-user-shield';
    case 'patient-care': return 'fas fa-heartbeat';
    case 'pharmacology': return 'fas fa-pills';
    case 'epidemiology': return 'fas fa-virus';
    case 'precision-medicine': return 'fas fa-dna';
    default: return 'fas fa-tasks';
  }
};

export default function AgentTasksModal({ open, onOpenChange, swarm }: AgentTasksModalProps) {
  if (!swarm) return null;
  
  const taskData = getAgentTasks(swarm);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-dark-100 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center">
            <i className="fas fa-tasks mr-3 text-accent icon-glow"></i>
            Active Task List: {swarm.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-2">
          {/* Mission Header */}
          <div className="bg-dark-300 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">{taskData.missionTitle}</h3>
              <Badge className={getPriorityColor(taskData.priority)}>
                <i className="fas fa-exclamation-circle mr-1"></i>
                {taskData.priority} PRIORITY
              </Badge>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <span><i className="fas fa-users mr-1"></i>{swarm.agentCount || 0} Total Agents</span>
              <span><i className="fas fa-clock mr-1"></i>Mission Status: Active</span>
              <span><i className="fas fa-shield-alt mr-1"></i>Security Level: Classified</span>
            </div>
          </div>

          {/* Active Tasks */}
          <div className="space-y-4">
            {taskData.activeTasks.map((task) => (
              <div key={task.id} className="bg-dark-300 rounded-lg p-4 border border-gray-600 hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-dark-400 rounded-lg">
                      <i className={`${getCategoryIcon(task.category)} text-primary`}></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white flex items-center">
                        {task.title}
                        <span className="ml-2 text-xs text-gray-400 font-mono">{task.id}</span>
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getStatusColor(task.status)}>
                          {task.status.toUpperCase()}
                        </Badge>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-300">
                      <i className="fas fa-users mr-1"></i>{task.assignedAgents} agents
                    </div>
                    <div className="text-xs text-gray-400">
                      <i className="fas fa-clock mr-1"></i>{task.timeRemaining}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                  {task.description}
                </p>

                {task.status === 'active' && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Progress</span>
                      <span className="text-xs font-bold text-primary">{task.progress}%</span>
                    </div>
                    <Progress 
                      value={task.progress} 
                      className="h-2 bg-dark-400"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mission Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-dark-300 rounded-lg p-3 text-center border border-gray-600">
              <div className="text-2xl font-bold text-success">
                {taskData.activeTasks.filter(t => t.status === 'active').length}
              </div>
              <div className="text-xs text-gray-400">Active Tasks</div>
            </div>
            <div className="bg-dark-300 rounded-lg p-3 text-center border border-gray-600">
              <div className="text-2xl font-bold text-warning">
                {taskData.activeTasks.filter(t => t.priority === 'CRITICAL').length}
              </div>
              <div className="text-xs text-gray-400">Critical Tasks</div>
            </div>
            <div className="bg-dark-300 rounded-lg p-3 text-center border border-gray-600">
              <div className="text-2xl font-bold text-primary">
                {taskData.activeTasks.reduce((sum, t) => sum + t.assignedAgents, 0)}
              </div>
              <div className="text-xs text-gray-400">Agents Deployed</div>
            </div>
            <div className="bg-dark-300 rounded-lg p-3 text-center border border-gray-600">
              <div className="text-2xl font-bold text-accent">
                {Math.round(taskData.activeTasks.reduce((sum, t) => sum + t.progress, 0) / taskData.activeTasks.length)}%
              </div>
              <div className="text-xs text-gray-400">Avg Progress</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}