import { http, HttpResponse, delay } from 'msw';
import { 
  getFilteredServices, 
  getServiceById, 
  addService, 
  updateService, 
  deleteService, 
  getServiceEvents,
  mockServices
} from './data';

const API_BASE = '/api';

// Helper function to simulate network delay and random failures
async function simulateNetworkConditions() {
  // Random delay between 300ms and 1000ms
  const delayTime = Math.floor(Math.random() * 700) + 300;
  await delay(delayTime);
  
  // 5% chance of failure
  if (Math.random() < 0.05) {
    throw new Error('Network error');
  }
}

export const handlers = [
  // GET /api/services - List services with pagination and filtering
  http.get(`${API_BASE}/services`, async ({ request }) => {
    try {
      await simulateNetworkConditions();
      
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get('page') || '1');
      const limit = parseInt(url.searchParams.get('limit') || '10');
      const status = url.searchParams.get('status') || '';
      const nameFilter = url.searchParams.get('name_like') || '';
      
      const { services, total } = getFilteredServices(page, limit, status, nameFilter);
      
      return HttpResponse.json({
        services,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      return HttpResponse.json(
        { error: 'Failed to fetch services' },
        { status: 500 }
      );
    }
  }),

  // GET /api/services/:id - Get single service
  http.get(`${API_BASE}/services/:id`, async ({ params }) => {
    try {
      await simulateNetworkConditions();
      
      const id = parseInt(params.id as string);
      const service = getServiceById(id);
      
      if (!service) {
        return HttpResponse.json(
          { error: 'Service not found' },
          { status: 404 }
        );
      }
      
      return HttpResponse.json(service);
    } catch (error) {
      return HttpResponse.json(
        { error: 'Failed to fetch service' },
        { status: 500 }
      );
    }
  }),

  // POST /api/services - Create new service
  http.post(`${API_BASE}/services`, async ({ request }) => {
    try {
      await simulateNetworkConditions();
      
      const data = await request.json() as any;
      
      if (!data.name || !data.type) {
        return HttpResponse.json(
          { error: 'Name and type are required' },
          { status: 400 }
        );
      }
      
      const newService = addService(data);
      return HttpResponse.json(newService, { status: 201 });
    } catch (error) {
      return HttpResponse.json(
        { error: 'Failed to create service' },
        { status: 500 }
      );
    }
  }),

  // PUT /api/services/:id - Update service
  http.put(`${API_BASE}/services/:id`, async ({ params, request }) => {
    try {
      await simulateNetworkConditions();
      
      const id = parseInt(params.id as string);
      const data = await request.json() as any;
      
      const updatedService = updateService(id, data);
      
      if (!updatedService) {
        return HttpResponse.json(
          { error: 'Service not found' },
          { status: 404 }
        );
      }
      
      return HttpResponse.json(updatedService);
    } catch (error) {
      return HttpResponse.json(
        { error: 'Failed to update service' },
        { status: 500 }
      );
    }
  }),

  // DELETE /api/services/:id - Delete service
  http.delete(`${API_BASE}/services/:id`, async ({ params }) => {
    try {
      await simulateNetworkConditions();
      
      const id = parseInt(params.id as string);
      const deleted = deleteService(id);
      
      if (!deleted) {
        return HttpResponse.json(
          { error: 'Service not found' },
          { status: 404 }
        );
      }
      
      return HttpResponse.json({ message: 'Service deleted successfully' });
    } catch (error) {
      return HttpResponse.json(
        { error: 'Failed to delete service' },
        { status: 500 }
      );
    }
  }),

  // GET /api/services/:id/events - Get service events with pagination
  http.get(`${API_BASE}/services/:id/events`, async ({ params, request }) => {
    try {
      await simulateNetworkConditions();
      
      const serviceId = parseInt(params.id as string);
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get('page') || '1');
      const limit = parseInt(url.searchParams.get('limit') || '20');
      
      const service = getServiceById(serviceId);
      if (!service) {
        return HttpResponse.json(
          { error: 'Service not found' },
          { status: 404 }
        );
      }
      
      const events = getServiceEvents(serviceId, page, limit);
      
      return HttpResponse.json({
        events,
        page,
        limit,
        hasMore: events.length === limit,
      });
    } catch (error) {
      return HttpResponse.json(
        { error: 'Failed to fetch service events' },
        { status: 500 }
      );
    }
  }),

  // GET /api/stats - Get dashboard statistics
  http.get(`${API_BASE}/stats`, async () => {
    try {
      await simulateNetworkConditions();
      
      const total = mockServices.length;
      const online = mockServices.filter(s => s.status === 'Online').length;
      const degraded = mockServices.filter(s => s.status === 'Degraded').length;
      const offline = mockServices.filter(s => s.status === 'Offline').length;
      
      return HttpResponse.json({
        total,
        online,
        degraded,
        offline,
      });
    } catch (error) {
      return HttpResponse.json(
        { error: 'Failed to fetch statistics' },
        { status: 500 }
      );
    }
  }),
];
