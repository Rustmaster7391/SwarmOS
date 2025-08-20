import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertSwarmSchema, insertAgentSchema, insertTemplateSchema, insertSecurityAlertSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // WebSocket server for real-time updates
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket');
    
    ws.on('message', (message) => {
      console.log('Received:', message.toString());
    });

    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
    });
  });

  // Broadcast function for real-time updates
  const broadcast = (data: any) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  };

  // Dashboard endpoints
  app.get('/api/dashboard/stats', async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ message: 'User ID required' });
      }
      
      const stats = await storage.getDashboardStats(userId);
      res.json(stats);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      res.status(500).json({ message: 'Failed to fetch dashboard stats' });
    }
  });

  // Swarm endpoints
  app.get('/api/swarms', async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ message: 'User ID required' });
      }
      
      const swarms = await storage.getSwarms(userId);
      res.json(swarms);
    } catch (error) {
      console.error('Error fetching swarms:', error);
      res.status(500).json({ message: 'Failed to fetch swarms' });
    }
  });

  app.get('/api/swarms/:id', async (req, res) => {
    try {
      const swarm = await storage.getSwarm(req.params.id);
      if (!swarm) {
        return res.status(404).json({ message: 'Swarm not found' });
      }
      res.json(swarm);
    } catch (error) {
      console.error('Error fetching swarm:', error);
      res.status(500).json({ message: 'Failed to fetch swarm' });
    }
  });

  app.post('/api/swarms', async (req, res) => {
    try {
      const validatedData = insertSwarmSchema.parse(req.body);
      const swarm = await storage.createSwarm(validatedData);
      
      // Update deployment counter for persistent tracking
      const deploymentState = await storage.getAppState('deploymentCount');
      const currentCount = deploymentState ? (deploymentState.value as number) : 0;
      await storage.setAppState('deploymentCount', currentCount + 1);
      
      // Broadcast swarm creation
      broadcast({ type: 'swarm_created', data: swarm });
      
      res.status(201).json(swarm);
    } catch (error) {
      console.error('Error creating swarm:', error);
      res.status(500).json({ message: 'Failed to create swarm' });
    }
  });

  app.put('/api/swarms/:id', async (req, res) => {
    try {
      const updates = req.body;
      const swarm = await storage.updateSwarm(req.params.id, updates);
      
      // Broadcast swarm update
      broadcast({ type: 'swarm_updated', data: swarm });
      
      res.json(swarm);
    } catch (error) {
      console.error('Error updating swarm:', error);
      res.status(500).json({ message: 'Failed to update swarm' });
    }
  });

  app.delete('/api/swarms/:id', async (req, res) => {
    try {
      await storage.deleteSwarm(req.params.id);
      
      // Broadcast swarm deletion
      broadcast({ type: 'swarm_deleted', data: { id: req.params.id } });
      
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting swarm:', error);
      res.status(500).json({ message: 'Failed to delete swarm' });
    }
  });

  // Agent endpoints
  app.get('/api/swarms/:swarmId/agents', async (req, res) => {
    try {
      const agents = await storage.getAgents(req.params.swarmId);
      res.json(agents);
    } catch (error) {
      console.error('Error fetching agents:', error);
      res.status(500).json({ message: 'Failed to fetch agents' });
    }
  });

  app.post('/api/agents', async (req, res) => {
    try {
      const validatedData = insertAgentSchema.parse(req.body);
      const agent = await storage.createAgent(validatedData);
      
      // Broadcast agent creation
      broadcast({ type: 'agent_created', data: agent });
      
      res.status(201).json(agent);
    } catch (error) {
      console.error('Error creating agent:', error);
      res.status(500).json({ message: 'Failed to create agent' });
    }
  });

  app.put('/api/agents/:id', async (req, res) => {
    try {
      const updates = req.body;
      const agent = await storage.updateAgent(req.params.id, updates);
      
      // Broadcast agent update
      broadcast({ type: 'agent_updated', data: agent });
      
      res.json(agent);
    } catch (error) {
      console.error('Error updating agent:', error);
      res.status(500).json({ message: 'Failed to update agent' });
    }
  });

  app.delete('/api/agents/:id', async (req, res) => {
    try {
      await storage.deleteAgent(req.params.id);
      
      // Broadcast agent deletion
      broadcast({ type: 'agent_deleted', data: { id: req.params.id } });
      
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting agent:', error);
      res.status(500).json({ message: 'Failed to delete agent' });
    }
  });

  // Template endpoints
  app.get('/api/templates', async (req, res) => {
    try {
      const templates = await storage.getTemplates();
      res.json(templates);
    } catch (error) {
      console.error('Error fetching templates:', error);
      res.status(500).json({ message: 'Failed to fetch templates' });
    }
  });

  app.get('/api/templates/:id', async (req, res) => {
    try {
      const template = await storage.getTemplate(req.params.id);
      if (!template) {
        return res.status(404).json({ message: 'Template not found' });
      }
      res.json(template);
    } catch (error) {
      console.error('Error fetching template:', error);
      res.status(500).json({ message: 'Failed to fetch template' });
    }
  });

  app.post('/api/templates', async (req, res) => {
    try {
      const validatedData = insertTemplateSchema.parse(req.body);
      const template = await storage.createTemplate(validatedData);
      res.status(201).json(template);
    } catch (error) {
      console.error('Error creating template:', error);
      res.status(500).json({ message: 'Failed to create template' });
    }
  });

  // Security endpoints
  app.get('/api/security/alerts', async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ message: 'User ID required' });
      }
      
      const alerts = await storage.getSecurityAlerts(userId);
      res.json(alerts);
    } catch (error) {
      console.error('Error fetching security alerts:', error);
      res.status(500).json({ message: 'Failed to fetch security alerts' });
    }
  });

  app.post('/api/security/alerts', async (req, res) => {
    try {
      const validatedData = insertSecurityAlertSchema.parse(req.body);
      const alert = await storage.createSecurityAlert(validatedData);
      
      // Broadcast security alert
      broadcast({ type: 'security_alert', data: alert });
      
      res.status(201).json(alert);
    } catch (error) {
      console.error('Error creating security alert:', error);
      res.status(500).json({ message: 'Failed to create security alert' });
    }
  });

  app.put('/api/security/alerts/:id/resolve', async (req, res) => {
    try {
      await storage.resolveSecurityAlert(req.params.id);
      
      // Broadcast alert resolution
      broadcast({ type: 'alert_resolved', data: { id: req.params.id } });
      
      res.status(204).send();
    } catch (error) {
      console.error('Error resolving security alert:', error);
      res.status(500).json({ message: 'Failed to resolve security alert' });
    }
  });

  // Monitoring endpoints
  app.get('/api/monitoring/heartbeat', async (req, res) => {
    try {
      // Send heartbeat data for real-time monitoring
      const heartbeatData = {
        timestamp: new Date().toISOString(),
        status: 'healthy',
        activeConnections: wss.clients.size,
      };
      res.json(heartbeatData);
    } catch (error) {
      console.error('Error fetching heartbeat:', error);
      res.status(500).json({ message: 'Failed to fetch heartbeat' });
    }
  });

  // API documentation endpoint
  app.get('/api/docs', (req, res) => {
    res.json({
      title: 'SwarmWare API Documentation',
      version: '1.0.0',
      description: 'Comprehensive API for AI agent swarm management',
      endpoints: {
        dashboard: '/api/dashboard/stats',
        swarms: '/api/swarms',
        agents: '/api/agents',
        templates: '/api/templates',
        security: '/api/security/alerts',
        monitoring: '/api/monitoring/heartbeat',
      }
    });
  });

  return httpServer;
}
