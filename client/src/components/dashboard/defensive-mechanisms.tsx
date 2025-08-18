import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DefensiveMechanisms() {
  const mechanisms = [
    {
      title: "Consensus Validation",
      description: "Agents cross-verify outputs to mitigate hallucinations.",
      icon: "fas fa-check-double",
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/50",
      status: "Active"
    },
    {
      title: "Runtime Security",
      description: "Real-time monitoring with tools like Prisma AIRS for anomaly detection.",
      icon: "fas fa-eye",
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/50",
      status: "Monitoring"
    },
    {
      title: "Privacy Controls",
      description: "Anonymous keys and encrypted communications to protect data.",
      icon: "fas fa-lock",
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/50",
      status: "Secured"
    },
    {
      title: "Byzantine Fault Tolerance",
      description: "Ensures swarm integrity even if a minority of agents are malicious.",
      icon: "fas fa-shield-alt",
      color: "text-red-400",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/50",
      status: "Protected"
    },
    {
      title: "Governance Frameworks",
      description: "Built-in policies for access control and audit trails, adaptable for enterprise compliance.",
      icon: "fas fa-gavel",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-500/50",
      status: "Compliant"
    },
    {
      title: "Adaptive Learning",
      description: "Continuous improvement through machine learning algorithms that adapt swarm behavior based on performance metrics and threat intelligence.",
      icon: "fas fa-brain",
      color: "text-orange-400",
      bgColor: "bg-orange-500/20",
      borderColor: "border-orange-500/50",
      status: "Learning"
    }
  ];

  return (
    <Card className="bg-dark-100 border-gray-700 card-glow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white flex items-center">
          <i className="fas fa-shield-alt mr-3 text-primary icon-glow"></i>
          SwarmWare Defensive Mechanisms
          <div className="ml-auto">
            <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
              <i className="fas fa-check-circle mr-1"></i>
              All Systems Operational
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mechanisms.map((mechanism, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg bg-dark-300 border-2 ${mechanism.borderColor} hover:bg-dark-200 transition-all duration-300 card-glow group`}
            >
              <div className="flex items-start space-x-3 mb-3">
                <div className={`${mechanism.bgColor} p-2 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300 relative`}>
                  <i className={`${mechanism.icon} ${mechanism.color} icon-glow`}></i>
                  <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${mechanism.bgColor.replace('/20', '')} animate-pulse`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-white text-sm">{mechanism.title}</h4>
                    <Badge className={`text-xs ${mechanism.bgColor} ${mechanism.color} border-0`}>
                      {mechanism.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {mechanism.description}
                  </p>
                </div>
              </div>
              
              {/* Animated progress indicator */}
              <div className="w-full bg-dark-400 rounded-full h-1 mt-3 overflow-hidden">
                <div 
                  className={`h-full ${mechanism.bgColor.replace('/20', '')} animate-pulse`}
                  style={{
                    width: '100%',
                    background: `linear-gradient(90deg, ${mechanism.color.replace('text-', 'rgb(')}, transparent)`,
                    animation: 'pulse 2s infinite'
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Overall system status */}
        <div className="mt-6 p-4 bg-dark-300 rounded-lg border border-green-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <i className="fas fa-check-circle text-green-400 icon-glow"></i>
              </div>
              <div>
                <h5 className="font-medium text-white">System Integrity Status</h5>
                <p className="text-sm text-gray-400">All defensive mechanisms are operational and monitoring your swarms</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-400">100%</div>
              <div className="text-xs text-gray-400">Protection Level</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}