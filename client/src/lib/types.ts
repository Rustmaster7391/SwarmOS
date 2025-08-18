export interface DashboardStats {
  activeSwarms: number;
  totalAgents: number;
  securityAlerts: number;
  apiCalls: number;
}

export interface SwarmStatus {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'deploying' | 'error';
  agentCount: number;
  type: string;
  lastActivity: string;
}

export interface SecurityEvent {
  id: string;
  type: 'warning' | 'success' | 'info';
  message: string;
  timestamp: string;
}

export interface WebSocketMessage {
  type: string;
  data: any;
}
