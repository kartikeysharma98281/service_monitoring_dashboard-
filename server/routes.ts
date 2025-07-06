import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Import mock data and handlers from the MSW setup
const mockServices = [
  {
    id: 1,
    name: "User Authentication API",
    type: "API",
    description: "Handles user login and registration",
    status: "Online",
    healthCheckUrl: "https://api.example.com/auth/health",
    lastCheck: new Date(Date.now() - 2000),
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 2000),
  },
  {
    id: 2,
    name: "PostgreSQL Database",
    type: "Database",
    description: "Main application database",
    status: "Degraded",
    healthCheckUrl: "https://db.example.com/health",
    lastCheck: new Date(Date.now() - 5000),
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 5000),
  },
  {
    id: 3,
    name: "Payment Gateway",
    type: "External",
    description: "Stripe payment processing",
    status: "Offline",
    healthCheckUrl: "https://payments.example.com/health",
    lastCheck: new Date(Date.now() - 60000),
    createdAt: new Date(Date.now() - 259200000),
    updatedAt: new Date(Date.now() - 60000),
  },
  {
    id: 4,
    name: "Redis Cache",
    type: "Cache",
    description: "In-memory data store",
    status: "Online",
    healthCheckUrl: "https://cache.example.com/health",
    lastCheck: new Date(Date.now() - 3000),
    createdAt: new Date(Date.now() - 345600000),
    updatedAt: new Date(Date.now() - 3000),
  },
  {
    id: 5,
    name: "Email Service",
    type: "External",
    description: "Email delivery service",
    status: "Online",
    healthCheckUrl: "https://mail.example.com/health",
    lastCheck: new Date(Date.now() - 1000),
    createdAt: new Date(Date.now() - 432000000),
    updatedAt: new Date(Date.now() - 1000),
  },
  {
    id: 6,
    name: "Message Queue",
    type: "Queue",
    description: "Background job processing",
    status: "Online",
    healthCheckUrl: "https://queue.example.com/health",
    lastCheck: new Date(Date.now() - 4000),
    createdAt: new Date(Date.now() - 518400000),
    updatedAt: new Date(Date.now() - 4000),
  },
];

const mockServiceEvents = [
  {
    id: 1,
    serviceId: 1,
    title: "Service came online",
    description: "Service successfully started after maintenance window",
    eventType: "status_change",
    timestamp: new Date(Date.now() - 7200000),
  },
  {
    id: 2,
    serviceId: 1,
    title: "High response time detected",
    description: "Response time increased to 2.5s, investigating potential database issues",
    eventType: "alert",
    timestamp: new Date(Date.now() - 14400000),
  },
  {
    id: 3,
    serviceId: 2,
    title: "Database performance degraded",
    description: "Query response time increased beyond acceptable threshold",
    eventType: "alert",
    timestamp: new Date(Date.now() - 3600000),
  },
];

let serviceIdCounter = 7;
let eventIdCounter = 4;

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes for service monitoring dashboard
  
  // GET /api/services - List services with pagination and filtering
  app.get('/api/services', async (req, res) => {
    try {
      // Simulate network delay
      await delay(Math.floor(Math.random() * 700) + 300);
      
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as string || '';
      const nameFilter = req.query.name_like as string || '';
      
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
      
      res.json({
        services,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch services' });
    }
  });

  // GET /api/services/:id - Get single service
  app.get('/api/services/:id', async (req, res) => {
    try {
      await delay(Math.floor(Math.random() * 700) + 300);
      
      const id = parseInt(req.params.id);
      const service = mockServices.find(s => s.id === id);
      
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      
      res.json(service);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch service' });
    }
  });

  // POST /api/services - Create new service
  app.post('/api/services', async (req, res) => {
    try {
      await delay(Math.floor(Math.random() * 700) + 300);
      
      const { name, type, description, healthCheckUrl } = req.body;
      
      if (!name || !type) {
        return res.status(400).json({ error: 'Name and type are required' });
      }
      
      const newService = {
        id: serviceIdCounter++,
        name,
        type,
        description: description || '',
        status: 'Online',
        healthCheckUrl: healthCheckUrl || '',
        lastCheck: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      mockServices.push(newService);
      res.status(201).json(newService);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create service' });
    }
  });

  // PUT /api/services/:id - Update service
  app.put('/api/services/:id', async (req, res) => {
    try {
      await delay(Math.floor(Math.random() * 700) + 300);
      
      const id = parseInt(req.params.id);
      const serviceIndex = mockServices.findIndex(s => s.id === id);
      
      if (serviceIndex === -1) {
        return res.status(404).json({ error: 'Service not found' });
      }
      
      mockServices[serviceIndex] = {
        ...mockServices[serviceIndex],
        ...req.body,
        updatedAt: new Date(),
      };
      
      res.json(mockServices[serviceIndex]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update service' });
    }
  });

  // DELETE /api/services/:id - Delete service
  app.delete('/api/services/:id', async (req, res) => {
    try {
      await delay(Math.floor(Math.random() * 700) + 300);
      
      const id = parseInt(req.params.id);
      const serviceIndex = mockServices.findIndex(s => s.id === id);
      
      if (serviceIndex === -1) {
        return res.status(404).json({ error: 'Service not found' });
      }
      
      mockServices.splice(serviceIndex, 1);
      res.json({ message: 'Service deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete service' });
    }
  });

  // GET /api/services/:id/events - Get service events
  app.get('/api/services/:id/events', async (req, res) => {
    try {
      await delay(Math.floor(Math.random() * 700) + 300);
      
      const serviceId = parseInt(req.params.id);
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      
      const service = mockServices.find(s => s.id === serviceId);
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      
      const events = mockServiceEvents
        .filter(event => event.serviceId === serviceId)
        .slice((page - 1) * limit, page * limit);
      
      res.json({
        events,
        page,
        limit,
        hasMore: events.length === limit,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch service events' });
    }
  });

  // GET /api/stats - Get dashboard statistics
  app.get('/api/stats', async (req, res) => {
    try {
      await delay(Math.floor(Math.random() * 700) + 300);
      
      const total = mockServices.length;
      const online = mockServices.filter(s => s.status === 'Online').length;
      const degraded = mockServices.filter(s => s.status === 'Degraded').length;
      const offline = mockServices.filter(s => s.status === 'Offline').length;
      
      res.json({
        total,
        online,
        degraded,
        offline,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch statistics' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
