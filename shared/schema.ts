import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  description: text("description"),
  status: text("status").notNull().default("Online"),
  healthCheckUrl: text("health_check_url"),
  lastCheck: timestamp("last_check").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const serviceEvents = pgTable("service_events", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  eventType: text("event_type").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertServiceSchema = createInsertSchema(services).pick({
  name: true,
  type: true,
  description: true,
  healthCheckUrl: true,
});

export const updateServiceSchema = createInsertSchema(services).pick({
  name: true,
  type: true,
  description: true,
  healthCheckUrl: true,
});

export const insertServiceEventSchema = createInsertSchema(serviceEvents).pick({
  serviceId: true,
  title: true,
  description: true,
  eventType: true,
});

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type UpdateService = z.infer<typeof updateServiceSchema>;
export type ServiceEvent = typeof serviceEvents.$inferSelect;
export type InsertServiceEvent = z.infer<typeof insertServiceEventSchema>;

export const ServiceStatus = {
  ONLINE: "Online",
  OFFLINE: "Offline",
  DEGRADED: "Degraded",
} as const;

export const ServiceType = {
  API: "API",
  DATABASE: "Database",
  CACHE: "Cache",
  EXTERNAL: "External",
  QUEUE: "Queue",
} as const;

export const EventType = {
  STATUS_CHANGE: "status_change",
  HEALTH_CHECK: "health_check",
  MAINTENANCE: "maintenance",
  ALERT: "alert",
} as const;
