import { Service, ServiceEvent, ServiceStatus, ServiceType, EventType } from "@shared/schema";

let serviceIdCounter = 1;
let eventIdCounter = 1;

export const mockServices: Service[] = [
  {
    id: serviceIdCounter++,
    name: "User Authentication API",
    type: ServiceType.API,
    description: "Handles user login and registration",
    status: ServiceStatus.ONLINE,
    healthCheckUrl: "https://api.example.com/auth/health",
    lastCheck: new Date(Date.now() - 2000),
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 2000),
  },
  {
    id: serviceIdCounter++,
    name: "PostgreSQL Database",
    type: ServiceType.DATABASE,
    description: "Main application database",
    status: ServiceStatus.DEGRADED,
    healthCheckUrl: "https://db.example.com/health",
    lastCheck: new Date(Date.now() - 5000),
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 5000),
  },
  {
    id: serviceIdCounter++,
    name: "Payment Gateway",
    type: ServiceType.EXTERNAL,
    description: "Stripe payment processing",
    status: ServiceStatus.OFFLINE,
    healthCheckUrl: "https://payments.example.com/health",
    lastCheck: new Date(Date.now() - 60000),
    createdAt: new Date(Date.now() - 259200000),
    updatedAt: new Date(Date.now() - 60000),
  },
  {
    id: serviceIdCounter++,
    name: "Redis Cache",
    type: ServiceType.CACHE,
    description: "In-memory data store",
    status: ServiceStatus.ONLINE,
    healthCheckUrl: "https://cache.example.com/health",
    lastCheck: new Date(Date.now() - 3000),
    createdAt: new Date(Date.now() - 345600000),
    updatedAt: new Date(Date.now() - 3000),
  },
  {
    id: serviceIdCounter++,
    name: "Email Service",
    type: ServiceType.EXTERNAL,
    description: "Email delivery service",
    status: ServiceStatus.ONLINE,
    healthCheckUrl: "https://mail.example.com/health",
    lastCheck: new Date(Date.now() - 1000),
    createdAt: new Date(Date.now() - 432000000),
    updatedAt: new Date(Date.now() - 1000),
  },
  {
    id: serviceIdCounter++,
    name: "Message Queue",
    type: ServiceType.QUEUE,
    description: "Background job processing",
    status: ServiceStatus.ONLINE,
    healthCheckUrl: "https://queue.example.com/health",
    lastCheck: new Date(Date.now() - 4000),
    createdAt: new Date(Date.now() - 518400000),
    updatedAt: new Date(Date.now() - 4000),
  },
];

export const mockServiceEvents: ServiceEvent[] = [
  {
    id: eventIdCounter++,
    serviceId: 1,
    title: "Service came online",
    description: "Service successfully started after maintenance window",
    eventType: EventType.STATUS_CHANGE,
    timestamp: new Date(Date.now() - 7200000),
  },
  {
    id: eventIdCounter++,
    serviceId: 1,
    title: "High response time detected",
    description: "Response time increased to 2.5s, investigating potential database issues",
    eventType: EventType.ALERT,
    timestamp: new Date(Date.now() - 14400000),
  },
  {
    id: eventIdCounter++,
    serviceId: 1,
    title: "Service went offline",
    description: "Scheduled maintenance window started",
    eventType: EventType.MAINTENANCE,
    timestamp: new Date(Date.now() - 21600000),
  },
  {
    id: eventIdCounter++,
    serviceId: 2,
    title: "Database performance degraded",
    description: "Query response time increased beyond acceptable threshold",
    eventType: EventType.ALERT,
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: eventIdCounter++,
    serviceId: 3,
    title: "Payment gateway offline",
    description: "External payment service is currently unavailable",
    eventType: EventType.STATUS_CHANGE,
    timestamp: new Date(Date.now() - 3600000),
  },
];

export function getServiceById(id: number): Service | undefined {
  return mockServices.find(service => service.id === id);
}

export function getServiceEvents(serviceId: number, page: number = 1, limit: number = 20): ServiceEvent[] {
  const events = mockServiceEvents.filter(event => event.serviceId === serviceId);
  const start = (page - 1) * limit;
  const end = start + limit;
  return events.slice(start, end);
}

export function addService(service: Omit<Service, 'id' | 'createdAt' | 'updatedAt' | 'lastCheck'>): Service {
  const newService: Service = {
    ...service,
    id: serviceIdCounter++,
    status: ServiceStatus.ONLINE,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastCheck: new Date(),
  };
  mockServices.push(newService);
  return newService;
}

export function updateService(id: number, updates: Partial<Service>): Service | undefined {
  const index = mockServices.findIndex(service => service.id === id);
  if (index === -1) return undefined;
  
  mockServices[index] = {
    ...mockServices[index],
    ...updates,
    updatedAt: new Date(),
  };
  return mockServices[index];
}

export function deleteService(id: number): boolean {
  const index = mockServices.findIndex(service => service.id === id);
  if (index === -1) return false;
  
  mockServices.splice(index, 1);
  return true;
}

export function getFilteredServices(
  page: number = 1,
  limit: number = 10,
  status?: string,
  nameFilter?: string
): { services: Service[], total: number } {
  let filtered = [...mockServices];
  
  if (status) {
    filtered = filtered.filter(service => service.status === status);
  }
  
  if (nameFilter) {
    filtered = filtered.filter(service => 
      service.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }
  
  const total = filtered.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const services = filtered.slice(start, end);
  
  return { services, total };
}

// Simulate status changes for live updates
export function simulateStatusUpdates(): void {
  setInterval(() => {
    const service = mockServices[Math.floor(Math.random() * mockServices.length)];
    const statuses = [ServiceStatus.ONLINE, ServiceStatus.DEGRADED, ServiceStatus.OFFLINE];
    const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    if (service.status !== newStatus) {
      service.status = newStatus;
      service.lastCheck = new Date();
      service.updatedAt = new Date();
      
      // Add event for status change
      const newEvent: ServiceEvent = {
        id: eventIdCounter++,
        serviceId: service.id,
        title: `Service status changed to ${newStatus}`,
        description: `Service ${service.name} is now ${newStatus.toLowerCase()}`,
        eventType: EventType.STATUS_CHANGE,
        timestamp: new Date(),
      };
      mockServiceEvents.unshift(newEvent);
    }
  }, 30000); // Update every 30 seconds
}
