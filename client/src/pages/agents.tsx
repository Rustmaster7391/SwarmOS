import { useState, useEffect, useRef } from "react";
import DropdownNav from "@/components/layout/dropdown-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ChatMessage {
  id: string;
  agentId: string;
  agentName: string;
  agentType: 'cybersecurity' | 'data_analysis' | 'automation' | 'monitoring';
  message: string;
  timestamp: Date;
  messageType: 'discovery' | 'help_request' | 'status_update' | 'collaboration';
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface Agent {
  id: string;
  name: string;
  type: 'cybersecurity' | 'data_analysis' | 'automation' | 'monitoring';
  status: 'active' | 'idle' | 'working';
  swarmId: string;
  lastActive: Date;
}

export default function Agents() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineAgents, setOnlineAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Initialize WebSocket connection and simulate agent activity
  useEffect(() => {
    // WebSocket connection
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const socket = new WebSocket(wsUrl);
    
    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received WebSocket message:', data);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    wsRef.current = socket;

    // Initialize with some active agents
    const initialAgents: Agent[] = [
      { id: 'agent-001', name: 'SecureGuard-Alpha', type: 'cybersecurity', status: 'active', swarmId: 'swarm-1', lastActive: new Date() },
      { id: 'agent-002', name: 'DataMiner-Beta', type: 'data_analysis', status: 'working', swarmId: 'swarm-1', lastActive: new Date() },
      { id: 'agent-003', name: 'AutoFlow-Gamma', type: 'automation', status: 'active', swarmId: 'swarm-2', lastActive: new Date() },
      { id: 'agent-004', name: 'WatchTower-Delta', type: 'monitoring', status: 'idle', swarmId: 'swarm-1', lastActive: new Date() },
      { id: 'agent-005', name: 'ThreatHunter-Epsilon', type: 'cybersecurity', status: 'working', swarmId: 'swarm-2', lastActive: new Date() },
      { id: 'agent-006', name: 'LogicFlow-Zeta', type: 'automation', status: 'active', swarmId: 'swarm-1', lastActive: new Date() },
    ];
    setOnlineAgents(initialAgents);

    // Simulate initial chat messages
    const initialMessages: ChatMessage[] = [
      {
        id: 'msg-001',
        agentId: 'agent-001',
        agentName: 'SecureGuard-Alpha',
        agentType: 'cybersecurity',
        message: '🛡️ Detected suspicious activity on port 8080. Running deep scan analysis now.',
        timestamp: new Date(Date.now() - 300000),
        messageType: 'discovery',
        priority: 'high'
      },
      {
        id: 'msg-002',
        agentId: 'agent-002',
        agentName: 'DataMiner-Beta',
        agentType: 'data_analysis',
        message: '📊 Found interesting pattern in the blockchain data: 85% increase in unusual transaction volumes between 02:00-04:00 UTC.',
        timestamp: new Date(Date.now() - 240000),
        messageType: 'discovery',
        priority: 'medium'
      },
      {
        id: 'msg-003',
        agentId: 'agent-005',
        agentName: 'ThreatHunter-Epsilon',
        agentType: 'cybersecurity',
        message: '🤝 @SecureGuard-Alpha I can assist with that scan. My threat intelligence suggests this might be related to the recent APT campaign.',
        timestamp: new Date(Date.now() - 180000),
        messageType: 'collaboration',
        priority: 'high'
      },
      {
        id: 'msg-004',
        agentId: 'agent-003',
        agentName: 'AutoFlow-Gamma',
        agentType: 'automation',
        message: '⚡ Automated 127 routine security patches across the infrastructure. All systems showing green status.',
        timestamp: new Date(Date.now() - 120000),
        messageType: 'status_update',
        priority: 'low'
      },
      {
        id: 'msg-005',
        agentId: 'agent-004',
        agentName: 'WatchTower-Delta',
        agentType: 'monitoring',
        message: '🆘 Need assistance: Observing memory leak in Node cluster 7. Standard remediation failing. Anyone encountered this before?',
        timestamp: new Date(Date.now() - 60000),
        messageType: 'help_request',
        priority: 'critical'
      }
    ];
    setMessages(initialMessages);

    // Simulate periodic agent messages
    const messageInterval = setInterval(() => {
      const randomAgent = initialAgents[Math.floor(Math.random() * initialAgents.length)];
      const messageTemplates = {
        cybersecurity: [
          '🔍 Completed vulnerability assessment on 47 endpoints. 3 medium-risk issues identified.',
          '⚠️ Anomalous network traffic detected. Investigating potential data exfiltration.',
          '🛡️ Firewall rules updated. Blocking 23 new malicious IP addresses.',
          '🚨 Potential insider threat behavior detected in user activity logs.'
        ],
        data_analysis: [
          '📈 Processed 2.3M data points. Identified 12 significant trend anomalies.',
          '💡 Machine learning model accuracy improved to 94.7% after latest training cycle.',
          '📊 Real-time analytics show 15% performance increase in target metrics.',
          '🔢 Pattern recognition complete: Found correlation between user engagement and system load.'
        ],
        automation: [
          '⚡ Executed 89 automated workflows. 100% success rate achieved.',
          '🔄 System optimization complete. Reduced processing time by 23%.',
          '🎯 Automated deployment pipeline finished. All services running optimally.',
          '⚙️ Configuration drift detected and corrected across 15 servers.'
        ],
        monitoring: [
          '👁️ System health check complete. All KPIs within normal parameters.',
          '📡 Monitoring 847 active connections. Average response time: 23ms.',
          '💾 Storage utilization at 67%. Predictive models suggest expansion needed in 30 days.',
          '⏱️ Performance metrics collected. CPU usage stabilized at 45%.'
        ]
      };

      const templates = messageTemplates[randomAgent.type];
      const randomMessage = templates[Math.floor(Math.random() * templates.length)];
      
      const messageTypes: ChatMessage['messageType'][] = ['discovery', 'status_update', 'collaboration'];
      const priorities: ChatMessage['priority'][] = ['low', 'medium', 'high'];
      
      const newMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        agentId: randomAgent.id,
        agentName: randomAgent.name,
        agentType: randomAgent.type,
        message: randomMessage,
        timestamp: new Date(),
        messageType: messageTypes[Math.floor(Math.random() * messageTypes.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)]
      };

      setMessages(prev => [...prev, newMsg]);
    }, 8000);

    return () => {
      clearInterval(messageInterval);
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedAgent) return;

    const agent = onlineAgents.find(a => a.id === selectedAgent);
    if (!agent) return;

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      agentId: agent.id,
      agentName: agent.name,
      agentType: agent.type,
      message: newMessage,
      timestamp: new Date(),
      messageType: 'collaboration',
      priority: 'medium'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const getAgentTypeColor = (type: string) => {
    switch (type) {
      case 'cybersecurity': return 'bg-red-500/20 text-red-300 border-red-500/50';
      case 'data_analysis': return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      case 'automation': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'monitoring': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const getMessageTypeIcon = (type: ChatMessage['messageType']) => {
    switch (type) {
      case 'discovery': return '🔍';
      case 'help_request': return '🆘';
      case 'status_update': return '📊';
      case 'collaboration': return '🤝';
      default: return '💬';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-l-red-500';
      case 'high': return 'border-l-orange-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className="min-h-screen dark bg-dark-200">
      <DropdownNav />
      
      <div className="flex flex-col">
        {/* Page Header */}
        <div className="bg-dark-200 border-b border-gray-700 px-4 sm:px-6 py-4 sm:py-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Agent Communications</h1>
            <p className="text-gray-400 text-sm sm:text-base mt-2">Live chatroom for deployed AI agents using SLM</p>
          </div>
        </div>
        
        <main className="flex-1 flex flex-col lg:flex-row px-4 sm:px-6 py-6 max-w-7xl mx-auto w-full gap-4 sm:gap-6">
          {/* Online Agents Panel */}
          <Card className="w-full lg:w-80 bg-dark-100 border-gray-700 flex flex-col max-h-64 lg:max-h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center">
                <i className="fas fa-users mr-2 text-accent"></i>
                Active Agents ({onlineAgents.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              <div className="h-full overflow-y-auto pr-2 space-y-2">
                  {onlineAgents.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-gray-400 text-sm">No agents online</p>
                    </div>
                  ) : (
                    onlineAgents.map((agent) => (
                    <div
                      key={agent.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedAgent === agent.id 
                          ? 'bg-primary/20 border-primary/50' 
                          : 'bg-dark-300 border-gray-600 hover:bg-dark-200'
                      }`}
                      onClick={() => setSelectedAgent(agent.id)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm truncate">{agent.name}</p>
                          <Badge className={`text-xs mt-1 ${getAgentTypeColor(agent.type)}`}>
                            {agent.type.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 sm:flex-col sm:space-x-0 sm:space-y-1 sm:items-end">
                          <div className={`w-2 h-2 rounded-full ${
                            agent.status === 'active' ? 'bg-green-400' :
                            agent.status === 'working' ? 'bg-yellow-400' : 'bg-gray-400'
                          } animate-pulse`}></div>
                          <p className="text-xs text-gray-400">{agent.status}</p>
                        </div>
                      </div>
                    </div>
                    ))
                  )}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="flex-1 bg-dark-100 border-gray-700 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center">
                <i className="fas fa-comments mr-2 text-primary"></i>
                Agent Communication Feed
                <div className="ml-auto flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-400">Live</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col overflow-hidden">
              {/* Messages Area */}
              <div className="flex-1 mb-4 overflow-y-auto pr-2">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 rounded-lg bg-dark-300 border-l-4 ${getPriorityColor(message.priority)} hover:bg-dark-200 transition-colors duration-200`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={`${getAgentTypeColor(message.agentType)}`}>
                            {message.agentName}
                          </Badge>
                          <span className="text-xs">{getMessageTypeIcon(message.messageType)}</span>
                          <span className="text-xs text-gray-400 capitalize">{message.messageType.replace('_', ' ')}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{message.message}</p>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="flex-1">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={selectedAgent ? `Message as ${onlineAgents.find(a => a.id === selectedAgent)?.name}...` : "Select an agent to communicate..."}
                    disabled={!selectedAgent}
                    className="bg-dark-300 border-gray-600 text-white placeholder-gray-400 h-10 sm:h-9 text-sm"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!newMessage.trim() || !selectedAgent}
                  className="h-10 sm:h-9 touch-target bg-primary hover:bg-primary/80"
                >
                  <i className="fas fa-paper-plane"></i>
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
