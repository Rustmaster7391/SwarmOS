import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enums
export const swarmStatusEnum = pgEnum('swarm_status', ['active', 'inactive', 'deploying', 'error']);
export const agentStatusEnum = pgEnum('agent_status', ['active', 'inactive', 'error', 'initializing']);
export const agentTypeEnum = pgEnum('agent_type', ['cybersecurity', 'data_analysis', 'automation', 'monitoring', 'custom']);
export const alertSeverityEnum = pgEnum('alert_severity', ['low', 'medium', 'high', 'critical']);

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Swarms table
export const swarms = pgTable("swarms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  description: text("description"),
  status: swarmStatusEnum("status").default("inactive"),
  templateId: varchar("template_id"),
  ownerId: varchar("owner_id").references(() => users.id).notNull(),
  agentCount: integer("agent_count").default(0),
  maxAgents: integer("max_agents").default(100),
  autoScaling: boolean("auto_scaling").default(true),
  securityConfig: jsonb("security_config"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Agents table
export const agents = pgTable("agents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  type: agentTypeEnum("type").notNull(),
  status: agentStatusEnum("status").default("initializing"),
  swarmId: varchar("swarm_id").references(() => swarms.id).notNull(),
  config: jsonb("config"),
  lastHeartbeat: timestamp("last_heartbeat"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Templates table
export const templates = pgTable("templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  description: text("description"),
  type: agentTypeEnum("type").notNull(),
  icon: varchar("icon").default("fas fa-cubes"),
  minAgents: integer("min_agents").default(1),
  maxAgents: integer("max_agents").default(100),
  defaultConfig: jsonb("default_config"),
  isPublic: boolean("is_public").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Security alerts table
export const securityAlerts = pgTable("security_alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  description: text("description"),
  severity: alertSeverityEnum("severity").notNull(),
  swarmId: varchar("swarm_id").references(() => swarms.id),
  agentId: varchar("agent_id").references(() => agents.id),
  resolved: boolean("resolved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
});

// API calls log table
export const apiCalls = pgTable("api_calls", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  endpoint: varchar("endpoint").notNull(),
  method: varchar("method").notNull(),
  userId: varchar("user_id").references(() => users.id),
  swarmId: varchar("swarm_id").references(() => swarms.id),
  responseTime: integer("response_time"),
  statusCode: integer("status_code"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSwarmSchema = createInsertSchema(swarms).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAgentSchema = createInsertSchema(agents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTemplateSchema = createInsertSchema(templates).omit({
  id: true,
  createdAt: true,
});

export const insertSecurityAlertSchema = createInsertSchema(securityAlerts).omit({
  id: true,
  createdAt: true,
});

export const insertApiCallSchema = createInsertSchema(apiCalls).omit({
  id: true,
  createdAt: true,
});

// Types
export type UpsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSwarm = z.infer<typeof insertSwarmSchema>;
export type Swarm = typeof swarms.$inferSelect;
export type InsertAgent = z.infer<typeof insertAgentSchema>;
export type Agent = typeof agents.$inferSelect;
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type Template = typeof templates.$inferSelect;
export type InsertSecurityAlert = z.infer<typeof insertSecurityAlertSchema>;
export type SecurityAlert = typeof securityAlerts.$inferSelect;
export type InsertApiCall = z.infer<typeof insertApiCallSchema>;
export type ApiCall = typeof apiCalls.$inferSelect;
