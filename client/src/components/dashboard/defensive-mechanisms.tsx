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
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg font-semibold text-white flex items-center flex-wrap gap-2">
          <div className="flex items-center">
            <i className="fas fa-shield-alt mr-2 sm:mr-3 text-primary icon-glow"></i>
            <span className="hidden sm:inline">SwarmWare Defensive Mechanisms</span>
            <span className="sm:hidden">Defensive Systems</span>
          </div>
          <Badge className="bg-green-500/20 text-green-300 border-green-500/50 text-xs">
            <i className="fas fa-check-circle mr-1"></i>
            <span className="hidden sm:inline">All Systems Operational</span>
            <span className="sm:hidden">Online</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {mechanisms.map((mechanism, index) => (
            <div
              key={index}
              className={`p-3 sm:p-4 rounded-lg bg-dark-300 border-2 ${mechanism.borderColor} hover:bg-dark-200 transition-all duration-300 card-glow group`}
            >
              <div className="flex items-start space-x-3 mb-3">
                <div className={`${mechanism.bgColor} p-2 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300 relative`}>
                  <i className={`${mechanism.icon} ${mechanism.color} icon-glow`}></i>
                  {/* Static circle */}
                  <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${mechanism.bgColor.replace('/20', '/60')} border border-white`}></div>
                  
                  {/* Blinking circle overlay */}
                  <div 
                    className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border border-white`}
                    style={{
                      animation: 'blink 2s infinite',
                      backgroundColor: mechanism.color.includes('green') ? '#10b981' :
                                     mechanism.color.includes('blue') ? '#3b82f6' :
                                     mechanism.color.includes('purple') ? '#8b5cf6' :
                                     mechanism.color.includes('red') ? '#ef4444' :
                                     mechanism.color.includes('yellow') ? '#eab308' :
                                     mechanism.color.includes('orange') ? '#f97316' : '#6b7280',
                      boxShadow: `0 0 8px ${mechanism.color.includes('green') ? '#10b981' :
                                            mechanism.color.includes('blue') ? '#3b82f6' :
                                            mechanism.color.includes('purple') ? '#8b5cf6' :
                                            mechanism.color.includes('red') ? '#ef4444' :
                                            mechanism.color.includes('yellow') ? '#eab308' :
                                            mechanism.color.includes('orange') ? '#f97316' : '#6b7280'}`
                    }}
                  ></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1 flex-wrap gap-1">
                    <h4 className="font-semibold text-white text-sm">{mechanism.title}</h4>
                    <Badge className={`text-xs ${mechanism.bgColor} ${mechanism.color} border-0`}>
                      {mechanism.status}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
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
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-dark-300 rounded-lg border border-green-500/30">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="bg-green-500/20 p-2 rounded-lg flex-shrink-0">
                <i className="fas fa-check-circle text-green-400 icon-glow"></i>
              </div>
              <div className="min-w-0">
                <h5 className="text-sm sm:text-base font-medium text-white">System Integrity Status</h5>
                <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">All defensive mechanisms are operational and monitoring your swarms</p>
                <p className="text-xs text-gray-400 sm:hidden">All systems operational</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-base sm:text-lg font-bold text-green-400">100%</div>
              <div className="text-xs text-gray-400">Protection Level</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}