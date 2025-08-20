import Sidebar from "@/components/layout/sidebar";
import TopBar from "@/components/layout/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AuditLog {
  id: string;
  productType: string;
  productName: string;
  timestamp: Date;
  status: 'passed' | 'failed' | 'warning';
  score: number;
  duration: string;
  findings: number;
  description: string;
  details: string[];
}

export default function AuditLogs() {
  const auditLogs: AuditLog[] = [
    {
      id: 'audit-001',
      productType: 'Financial Trading Platform',
      productName: 'CryptoTrade Pro',
      timestamp: new Date(Date.now() - 3600000),
      status: 'passed',
      score: 94,
      duration: '2.3 minutes',
      findings: 2,
      description: 'Comprehensive security audit of trading algorithms and risk management systems',
      details: [
        'API rate limiting properly configured',
        'Encryption protocols verified (AES-256)',
        'Minor: Log rotation could be optimized',
        'Transaction validation mechanisms secure'
      ]
    },
    {
      id: 'audit-002',
      productType: 'Healthcare Management System',
      productName: 'MedFlow Enterprise',
      timestamp: new Date(Date.now() - 7200000),
      status: 'warning',
      score: 78,
      duration: '4.1 minutes',
      findings: 5,
      description: 'HIPAA compliance and patient data protection audit',
      details: [
        'Patient data encryption verified',
        'Warning: Some legacy API endpoints lack proper authentication',
        'Access control lists properly maintained',
        'Audit trail logging functional',
        'Recommendation: Update authentication protocols'
      ]
    },
    {
      id: 'audit-003',
      productType: 'E-commerce Platform',
      productName: 'ShopSphere Global',
      timestamp: new Date(Date.now() - 10800000),
      status: 'passed',
      score: 91,
      duration: '1.8 minutes',
      findings: 1,
      description: 'Payment processing and customer data security assessment',
      details: [
        'PCI DSS compliance verified',
        'Payment tokenization working correctly',
        'SSL/TLS configuration optimal',
        'Minor: Session timeout could be reduced'
      ]
    },
    {
      id: 'audit-004',
      productType: 'IoT Device Network',
      productName: 'SmartHome Hub Pro',
      timestamp: new Date(Date.now() - 14400000),
      status: 'failed',
      score: 45,
      duration: '5.7 minutes',
      findings: 12,
      description: 'Device security and network communication audit',
      details: [
        'Critical: Default passwords detected on 23% of devices',
        'Firmware update mechanism vulnerable',
        'Network segmentation insufficient',
        'Device authentication protocols outdated',
        'Immediate remediation required'
      ]
    },
    {
      id: 'audit-005',
      productType: 'Cloud Infrastructure',
      productName: 'DataVault Enterprise',
      timestamp: new Date(Date.now() - 18000000),
      status: 'passed',
      score: 96,
      duration: '3.2 minutes',
      findings: 1,
      description: 'Cloud storage security and access control audit',
      details: [
        'Multi-factor authentication enforced',
        'Data encryption at rest verified',
        'Network security groups properly configured',
        'Minor: CloudTrail logging could be enhanced'
      ]
    },
    {
      id: 'audit-006',
      productType: 'Social Media Platform',
      productName: 'ConnectNet',
      timestamp: new Date(Date.now() - 21600000),
      status: 'warning',
      score: 82,
      duration: '2.9 minutes',
      findings: 4,
      description: 'User privacy and content moderation system audit',
      details: [
        'User data handling compliant with GDPR',
        'Content filtering algorithms effective',
        'Warning: API rate limiting needs adjustment',
        'Privacy settings interface could be clearer',
        'Recommendation: Enhanced user consent flows'
      ]
    },
    {
      id: 'audit-007',
      productType: 'Banking API Gateway',
      productName: 'SecureBank API',
      timestamp: new Date(Date.now() - 25200000),
      status: 'passed',
      score: 98,
      duration: '1.5 minutes',
      findings: 0,
      description: 'Financial API security and transaction integrity audit',
      details: [
        'All security protocols operating optimally',
        'Transaction encryption verified',
        'API authentication robust',
        'Fraud detection systems active',
        'Excellent security posture maintained'
      ]
    },
    {
      id: 'audit-008',
      productType: 'Educational Platform',
      productName: 'LearnTech Academy',
      timestamp: new Date(Date.now() - 28800000),
      status: 'passed',
      score: 89,
      duration: '2.1 minutes',
      findings: 2,
      description: 'Student data protection and platform security audit',
      details: [
        'Student privacy controls effective',
        'Learning analytics properly anonymized',
        'Minor: Session management could be improved',
        'Content delivery network secure',
        'FERPA compliance verified'
      ]
    },
    {
      id: 'audit-009',
      productType: 'Manufacturing Control System',
      productName: 'IndustryFlow 4.0',
      timestamp: new Date(Date.now() - 32400000),
      status: 'warning',
      score: 73,
      duration: '6.2 minutes',
      findings: 7,
      description: 'Industrial IoT and automation security assessment',
      details: [
        'SCADA systems properly isolated',
        'Warning: Some sensors using weak encryption',
        'Network segmentation adequate but could be enhanced',
        'Machine-to-machine authentication verified',
        'Recommendation: Update sensor firmware',
        'Critical infrastructure protocols secure'
      ]
    },
    {
      id: 'audit-010',
      productType: 'Video Streaming Service',
      productName: 'StreamVision Pro',
      timestamp: new Date(Date.now() - 36000000),
      status: 'passed',
      score: 93,
      duration: '1.7 minutes',
      findings: 1,
      description: 'Content delivery and user authentication security audit',
      details: [
        'Content encryption protocols verified',
        'User authentication mechanisms secure',
        'CDN configuration optimal',
        'Minor: Analytics data retention policy needs review',
        'DRM systems functioning correctly'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'failed': return 'bg-red-500/20 text-red-300 border-red-500/50';
      case 'warning': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return 'fas fa-check-circle';
      case 'failed': return 'fas fa-times-circle';
      case 'warning': return 'fas fa-exclamation-triangle';
      default: return 'fas fa-question-circle';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden dark">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          title="Audit Logs"
          subtitle="Comprehensive security audit results with AI-driven threat analysis"
        />
        
        <main className="flex-1 overflow-auto p-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-dark-100 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="bg-green-500/20 p-3 rounded-lg">
                    <i className="fas fa-check-circle text-green-400"></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-400">Passed</p>
                    <p className="text-xl font-semibold text-white">6</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-dark-100 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="bg-yellow-500/20 p-3 rounded-lg">
                    <i className="fas fa-exclamation-triangle text-yellow-400"></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-400">Warnings</p>
                    <p className="text-xl font-semibold text-white">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-dark-100 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="bg-red-500/20 p-3 rounded-lg">
                    <i className="fas fa-times-circle text-red-400"></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-400">Failed</p>
                    <p className="text-xl font-semibold text-white">1</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-dark-100 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <i className="fas fa-chart-line text-blue-400"></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-400">Avg Score</p>
                    <p className="text-xl font-semibold text-white">84</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Audit Logs */}
          <Card className="bg-dark-100 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <i className="fas fa-clipboard-list mr-2 text-primary"></i>
                Recent Audit Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs.map((audit) => (
                  <div
                    key={audit.id}
                    className="p-4 bg-dark-300 rounded-lg border border-gray-600 hover:bg-dark-200 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <i className={`${getStatusIcon(audit.status)} ${
                            audit.status === 'passed' ? 'text-green-400' :
                            audit.status === 'failed' ? 'text-red-400' : 'text-yellow-400'
                          }`}></i>
                          <h4 className="font-semibold text-white">{audit.productName}</h4>
                          <Badge className={getStatusColor(audit.status)}>
                            {audit.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400 mb-1">{audit.productType}</p>
                        <p className="text-sm text-gray-300">{audit.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className={`text-2xl font-bold ${getScoreColor(audit.score)}`}>
                          {audit.score}
                        </div>
                        <div className="text-xs text-gray-400">Security Score</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                      <span>Duration: {audit.duration}</span>
                      <span>Findings: {audit.findings}</span>
                      <span>{audit.timestamp.toLocaleString()}</span>
                    </div>
                    
                    <div className="bg-dark-400 rounded p-3">
                      <h5 className="text-sm font-medium text-white mb-2">Audit Details:</h5>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {audit.details.map((detail, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span className={
                              detail.includes('Critical') ? 'text-red-400' :
                              detail.includes('Warning') ? 'text-yellow-400' :
                              detail.includes('Minor') ? 'text-blue-400' : ''
                            }>
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}