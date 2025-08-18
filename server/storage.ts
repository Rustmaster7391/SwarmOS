import {
  users,
  swarms,
  agents,
  templates,
  securityAlerts,
  apiCalls,
  type User,
  type UpsertUser,
  type Swarm,
  type InsertSwarm,
  type Agent,
  type InsertAgent,
  type Template,
  type InsertTemplate,
  type SecurityAlert,
  type InsertSecurityAlert,
  type InsertApiCall,
  type ApiCall,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, count, and, gte, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Swarm operations
  getSwarms(userId: string): Promise<Swarm[]>;
  getSwarm(id: string): Promise<Swarm | undefined>;
  createSwarm(swarm: InsertSwarm): Promise<Swarm>;
  updateSwarm(id: string, updates: Partial<InsertSwarm>): Promise<Swarm>;
  deleteSwarm(id: string): Promise<void>;

  // Agent operations
  getAgents(swarmId: string): Promise<Agent[]>;
  getAgent(id: string): Promise<Agent | undefined>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  updateAgent(id: string, updates: Partial<InsertAgent>): Promise<Agent>;
  deleteAgent(id: string): Promise<void>;

  // Template operations
  getTemplates(): Promise<Template[]>;
  getTemplate(id: string): Promise<Template | undefined>;
  createTemplate(template: InsertTemplate): Promise<Template>;

  // Security operations
  getSecurityAlerts(userId: string): Promise<SecurityAlert[]>;
  createSecurityAlert(alert: InsertSecurityAlert): Promise<SecurityAlert>;
  resolveSecurityAlert(id: string): Promise<void>;

  // Analytics operations
  getApiCallsCount(timeframe: string): Promise<number>;
  getDashboardStats(userId: string): Promise<{
    activeSwarms: number;
    totalAgents: number;
    securityAlerts: number;
    apiCalls: number;
  }>;

  // Log API calls
  logApiCall(call: InsertApiCall): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getSwarms(userId: string): Promise<Swarm[]> {
    return await db.select().from(swarms).where(eq(swarms.ownerId, userId)).orderBy(desc(swarms.updatedAt));
  }

  async getSwarm(id: string): Promise<Swarm | undefined> {
    const [swarm] = await db.select().from(swarms).where(eq(swarms.id, id));
    return swarm;
  }

  async createSwarm(swarm: InsertSwarm): Promise<Swarm> {
    const [newSwarm] = await db.insert(swarms).values(swarm).returning();
    return newSwarm;
  }

  async updateSwarm(id: string, updates: Partial<InsertSwarm>): Promise<Swarm> {
    const [updatedSwarm] = await db
      .update(swarms)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(swarms.id, id))
      .returning();
    return updatedSwarm;
  }

  async deleteSwarm(id: string): Promise<void> {
    await db.delete(swarms).where(eq(swarms.id, id));
  }

  async getAgents(swarmId: string): Promise<Agent[]> {
    return await db.select().from(agents).where(eq(agents.swarmId, swarmId)).orderBy(desc(agents.createdAt));
  }

  async getAgent(id: string): Promise<Agent | undefined> {
    const [agent] = await db.select().from(agents).where(eq(agents.id, id));
    return agent;
  }

  async createAgent(agent: InsertAgent): Promise<Agent> {
    const [newAgent] = await db.insert(agents).values(agent).returning();
    
    // Update swarm agent count
    await db
      .update(swarms)
      .set({ 
        agentCount: sql`${swarms.agentCount} + 1`,
        updatedAt: new Date()
      })
      .where(eq(swarms.id, agent.swarmId));
    
    return newAgent;
  }

  async updateAgent(id: string, updates: Partial<InsertAgent>): Promise<Agent> {
    const [updatedAgent] = await db
      .update(agents)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(agents.id, id))
      .returning();
    return updatedAgent;
  }

  async deleteAgent(id: string): Promise<void> {
    const agent = await this.getAgent(id);
    if (agent) {
      await db.delete(agents).where(eq(agents.id, id));
      
      // Update swarm agent count
      await db
        .update(swarms)
        .set({ 
          agentCount: sql`${swarms.agentCount} - 1`,
          updatedAt: new Date()
        })
        .where(eq(swarms.id, agent.swarmId));
    }
  }

  async getTemplates(): Promise<Template[]> {
    return await db.select().from(templates).where(eq(templates.isPublic, true)).orderBy(desc(templates.createdAt));
  }

  async getTemplate(id: string): Promise<Template | undefined> {
    const [template] = await db.select().from(templates).where(eq(templates.id, id));
    return template;
  }

  async createTemplate(template: InsertTemplate): Promise<Template> {
    const [newTemplate] = await db.insert(templates).values(template).returning();
    return newTemplate;
  }

  async getSecurityAlerts(userId: string): Promise<SecurityAlert[]> {
    const result = await db
      .select({
        id: securityAlerts.id,
        title: securityAlerts.title,
        description: securityAlerts.description,
        severity: securityAlerts.severity,
        swarmId: securityAlerts.swarmId,
        agentId: securityAlerts.agentId,
        resolved: securityAlerts.resolved,
        createdAt: securityAlerts.createdAt,
        resolvedAt: securityAlerts.resolvedAt,
      })
      .from(securityAlerts)
      .leftJoin(swarms, eq(securityAlerts.swarmId, swarms.id))
      .where(and(eq(swarms.ownerId, userId), eq(securityAlerts.resolved, false)))
      .orderBy(desc(securityAlerts.createdAt));
    
    return result;
  }

  async createSecurityAlert(alert: InsertSecurityAlert): Promise<SecurityAlert> {
    const [newAlert] = await db.insert(securityAlerts).values(alert).returning();
    return newAlert;
  }

  async resolveSecurityAlert(id: string): Promise<void> {
    await db
      .update(securityAlerts)
      .set({ resolved: true, resolvedAt: new Date() })
      .where(eq(securityAlerts.id, id));
  }

  async getApiCallsCount(timeframe: string): Promise<number> {
    const timeframeHours = timeframe === '24h' ? 24 : timeframe === '7d' ? 168 : 720;
    const since = new Date(Date.now() - timeframeHours * 60 * 60 * 1000);
    
    const [result] = await db
      .select({ count: count() })
      .from(apiCalls)
      .where(gte(apiCalls.createdAt, since));
    
    return result.count;
  }

  async getDashboardStats(userId: string): Promise<{
    activeSwarms: number;
    totalAgents: number;
    securityAlerts: number;
    apiCalls: number;
  }> {
    // Active swarms
    const [activeSwarmsResult] = await db
      .select({ count: count() })
      .from(swarms)
      .where(and(eq(swarms.ownerId, userId), eq(swarms.status, 'active')));

    // Total agents
    const [totalAgentsResult] = await db
      .select({ count: count() })
      .from(agents)
      .leftJoin(swarms, eq(agents.swarmId, swarms.id))
      .where(eq(swarms.ownerId, userId));

    // Security alerts
    const [securityAlertsResult] = await db
      .select({ count: count() })
      .from(securityAlerts)
      .leftJoin(swarms, eq(securityAlerts.swarmId, swarms.id))
      .where(and(eq(swarms.ownerId, userId), eq(securityAlerts.resolved, false)));

    // API calls in last 24 hours
    const apiCallsCount = await this.getApiCallsCount('24h');

    return {
      activeSwarms: activeSwarmsResult.count,
      totalAgents: totalAgentsResult.count,
      securityAlerts: securityAlertsResult.count,
      apiCalls: apiCallsCount,
    };
  }

  async logApiCall(call: InsertApiCall): Promise<void> {
    await db.insert(apiCalls).values(call);
  }
}

export const storage = new DatabaseStorage();
