import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Swarm } from "@shared/schema";

interface AgentSkillsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  swarm: Swarm | null;
}

// Generate detailed agent skill sets based on swarm type and name
const getAgentSkills = (swarm: Swarm) => {
  const swarmName = swarm.name.toLowerCase();
  
  if (swarmName.includes('cybersecurity') || swarmName.includes('security')) {
    return {
      primaryRole: "Cybersecurity Defense Specialist",
      description: "Elite AI agent specialized in real-time threat detection, penetration testing simulation, and automated incident response protocols.",
      coreSkills: [
        { name: "Threat Intelligence Analysis", level: 98, category: "security" },
        { name: "Network Penetration Testing", level: 95, category: "security" },
        { name: "Malware Pattern Recognition", level: 97, category: "security" },
        { name: "Zero-Day Vulnerability Detection", level: 92, category: "security" },
        { name: "Behavioral Anomaly Analysis", level: 96, category: "security" },
        { name: "Cryptographic Protocol Analysis", level: 89, category: "security" }
      ],
      specializations: [
        "Advanced Persistent Threat (APT) Hunting",
        "Real-time SIEM Log Analysis",
        "Automated Incident Response Orchestration",
        "Dark Web Intelligence Gathering",
        "IoT Security Assessment"
      ],
      operationalMode: "24/7 Continuous Monitoring",
      certifications: ["CISSP-AI", "CEH-Neural", "GCIH-Quantum"],
      threatLevel: "Critical Infrastructure Protection"
    };
  }
  
  if (swarmName.includes('financial') || swarmName.includes('trading')) {
    return {
      primaryRole: "Quantitative Financial Analyst",
      description: "Sophisticated AI agent engineered for high-frequency trading, risk assessment, and real-time market manipulation detection.",
      coreSkills: [
        { name: "Algorithmic Trading Strategy", level: 99, category: "financial" },
        { name: "Market Sentiment Analysis", level: 94, category: "financial" },
        { name: "Risk Portfolio Optimization", level: 97, category: "financial" },
        { name: "Fraud Pattern Detection", level: 96, category: "financial" },
        { name: "Regulatory Compliance Monitoring", level: 91, category: "financial" },
        { name: "Derivatives Pricing Models", level: 93, category: "financial" }
      ],
      specializations: [
        "Microsecond Arbitrage Execution",
        "Cross-Border Payment Anomaly Detection",
        "Real-time Credit Risk Assessment",
        "Market Manipulation Pattern Recognition",
        "Cryptocurrency Flow Analysis"
      ],
      operationalMode: "Real-time Market Hours + After-hours Analysis",
      certifications: ["FRM-AI", "CFA-Quantum", "PRM-Neural"],
      threatLevel: "Financial System Stability"
    };
  }
  
  if (swarmName.includes('healthcare') || swarmName.includes('medical')) {
    return {
      primaryRole: "Medical Intelligence Specialist",
      description: "Advanced AI agent trained in medical diagnostics, drug interaction analysis, and patient care optimization protocols.",
      coreSkills: [
        { name: "Medical Image Analysis", level: 98, category: "medical" },
        { name: "Drug Interaction Prediction", level: 95, category: "medical" },
        { name: "Genomic Pattern Recognition", level: 97, category: "medical" },
        { name: "Clinical Decision Support", level: 94, category: "medical" },
        { name: "Epidemic Spread Modeling", level: 92, category: "medical" },
        { name: "Personalized Treatment Planning", level: 96, category: "medical" }
      ],
      specializations: [
        "Real-time Vital Signs Monitoring",
        "Predictive Disease Outbreak Analysis",
        "Precision Medicine Recommendations",
        "Medical Record Pattern Analysis",
        "Emergency Triage Optimization"
      ],
      operationalMode: "Critical Care 24/7 Monitoring",
      certifications: ["HIMSS-AI", "CDSS-Neural", "PHI-Secure"],
      threatLevel: "Patient Safety Critical"
    };
  }
  
  // Default for general or custom swarms
  return {
    primaryRole: "Multi-Domain Intelligence Agent",
    description: "Versatile AI agent capable of adaptive learning and cross-functional task execution across multiple operational domains.",
    coreSkills: [
      { name: "Natural Language Processing", level: 94, category: "general" },
      { name: "Pattern Recognition", level: 96, category: "general" },
      { name: "Data Mining & Analysis", level: 93, category: "general" },
      { name: "Predictive Modeling", level: 91, category: "general" },
      { name: "Workflow Automation", level: 95, category: "general" },
      { name: "Multi-modal Learning", level: 89, category: "general" }
    ],
    specializations: [
      "Cross-Platform Integration",
      "Adaptive Behavior Learning",
      "Real-time Decision Making",
      "Resource Optimization",
      "Collaborative Task Distribution"
    ],
    operationalMode: "Adaptive Deployment Schedule",
    certifications: ["AGI-Core", "ML-Advanced", "AI-Ethics"],
    threatLevel: "General Operations"
  };
};

const getSkillColor = (category: string) => {
  switch (category) {
    case 'security': return 'bg-red-500/20 text-red-300 border-red-500/50';
    case 'financial': return 'bg-green-500/20 text-green-300 border-green-500/50';
    case 'medical': return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
    default: return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
  }
};

export default function AgentSkillsModal({ open, onOpenChange, swarm }: AgentSkillsModalProps) {
  if (!swarm) return null;
  
  const skills = getAgentSkills(swarm);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-100 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center">
            <i className="fas fa-brain mr-3 text-primary icon-glow"></i>
            Agent Skills Profile: {swarm.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-2">
          {/* Primary Role & Description */}
          <div className="bg-dark-300 rounded-lg p-4 border border-gray-600">
            <h3 className="text-lg font-semibold text-white mb-2">{skills.primaryRole}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{skills.description}</p>
            
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge className="bg-primary/20 text-primary border-primary/50">
                <i className="fas fa-shield-alt mr-1"></i>
                {skills.threatLevel}
              </Badge>
              <Badge className="bg-accent/20 text-accent border-accent/50">
                <i className="fas fa-clock mr-1"></i>
                {skills.operationalMode}
              </Badge>
            </div>
          </div>

          {/* Core Skills */}
          <div className="bg-dark-300 rounded-lg p-4 border border-gray-600">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <i className="fas fa-cogs mr-2 text-accent"></i>
              Core Competencies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.coreSkills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm font-medium">{skill.name}</span>
                    <span className="text-primary text-sm font-bold">{skill.level}%</span>
                  </div>
                  <Progress 
                    value={skill.level} 
                    className="h-2 bg-dark-400"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Specializations */}
          <div className="bg-dark-300 rounded-lg p-4 border border-gray-600">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <i className="fas fa-star mr-2 text-yellow-400"></i>
              Advanced Specializations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {skills.specializations.map((spec, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-dark-400 rounded border border-gray-600">
                  <i className="fas fa-check-circle text-success text-sm"></i>
                  <span className="text-gray-300 text-sm">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-dark-300 rounded-lg p-4 border border-gray-600">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <i className="fas fa-certificate mr-2 text-green-400"></i>
              AI Certifications & Credentials
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.certifications.map((cert, index) => (
                <Badge key={index} className={getSkillColor(skills.coreSkills[0]?.category || 'general')}>
                  <i className="fas fa-medal mr-1"></i>
                  {cert}
                </Badge>
              ))}
            </div>
          </div>

          {/* Agent Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-dark-300 rounded-lg p-3 text-center border border-gray-600">
              <div className="text-2xl font-bold text-primary">{swarm.agentCount || 0}</div>
              <div className="text-xs text-gray-400">Active Agents</div>
            </div>
            <div className="bg-dark-300 rounded-lg p-3 text-center border border-gray-600">
              <div className="text-2xl font-bold text-success">99.7%</div>
              <div className="text-xs text-gray-400">Uptime</div>
            </div>
            <div className="bg-dark-300 rounded-lg p-3 text-center border border-gray-600">
              <div className="text-2xl font-bold text-accent">24/7</div>
              <div className="text-xs text-gray-400">Monitoring</div>
            </div>
            <div className="bg-dark-300 rounded-lg p-3 text-center border border-gray-600">
              <div className="text-2xl font-bold text-warning">Elite</div>
              <div className="text-xs text-gray-400">Threat Level</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}