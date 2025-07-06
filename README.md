<<<<<<< HEAD
# MonitoCorp - Live Service Monitoring Dashboard

A modern, responsive SRE monitoring dashboard built with React, TypeScript, and Mock Service Worker (MSW). Features real-time service monitoring with a professional dark theme optimized for SRE environments.

## Features

- **Real-time Service Monitoring**: Live status updates with automatic polling
- **Dark Mode Design**: Professional dark theme optimized for SRE environments
- **Comprehensive CRUD Operations**: Create, read, update, and delete services
- **Service Details Pages**: Individual service views with event history
- **Advanced Filtering**: Search and filter services by status and name
- **Pagination**: Efficient data loading with pagination support
- **Error Handling**: Comprehensive error states and user feedback
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Wouter** for routing
- **React Query** for data fetching
- **Mock Service Worker (MSW)** for API simulation
- **Shadcn/ui** for UI components

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5000](http://localhost:5000) in your browser

## API Endpoints

The application uses Mock Service Worker to simulate API responses. All endpoints include:
- **Random delays**: 300ms - 1000ms to simulate real network conditions
- **5% failure rate**: For testing error handling and loading states

### Services

#### GET /api/services
Get a list of all services with pagination and filtering.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by status (`Online`, `Degraded`, `Offline`)
- `name_like` (optional): Filter by service name (partial match)

**Response:**
```json
{
  "services": [
    {
      "id": 1,
      "name": "User Authentication API",
      "type": "API",
      "description": "Handles user login and registration",
      "status": "Online",
      "healthCheckUrl": "https://api.example.com/auth/health",
      "lastCheck": "2024-01-01T12:00:00Z",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T12:00:00Z"
    }
  ],
  "total": 6,
  "page": 1,
  "limit": 10,
  "totalPages": 1
}
```

#### GET /api/services/:id
Get a single service by ID.

**Response:**
```json
{
  "id": 1,
  "name": "User Authentication API",
  "type": "API",
  "description": "Handles user login and registration",
  "status": "Online",
  "healthCheckUrl": "https://api.example.com/auth/health",
  "lastCheck": "2024-01-01T12:00:00Z",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T12:00:00Z"
}
```

#### POST /api/services
Create a new service.

**Request Body:**
```json
{
  "name": "New Service",
  "type": "API",
  "description": "Service description",
  "healthCheckUrl": "https://api.example.com/health"
}
```

**Response:** Returns the created service with `id` and default status.

#### PUT /api/services/:id
Update an existing service.

**Request Body:**
```json
{
  "name": "Updated Service Name",
  "type": "Database",
  "description": "Updated description",
  "healthCheckUrl": "https://updated.example.com/health"
}
```

**Response:** Returns the updated service.

#### DELETE /api/services/:id
Delete a service.

**Response:** Returns 200 OK with success message.

### Service Events

#### GET /api/services/:id/events
Get historical events for a service.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:**
```json
{
  "events": [
    {
      "id": 1,
      "serviceId": 1,
      "title": "Service recovered",
      "description": "Service is back online after maintenance",
      "eventType": "STATUS_CHANGE",
      "timestamp": "2024-01-01T12:00:00Z"
    }
  ],
  "page": 1,
  "limit": 20,
  "hasMore": false
}
```

### Statistics

#### GET /api/stats
Get dashboard statistics.

**Response:**
```json
{
  "total": 6,
  "online": 4,
  "degraded": 1,
  "offline": 1
}
```

## Service Types

- **API**: REST APIs and web services
- **Database**: Database systems
- **Cache**: Caching layers (Redis, Memcached)
- **External**: Third-party services
- **Queue**: Message queues and brokers

## Service Status

- **Online**: Service is fully operational
- **Degraded**: Service is running but with performance issues
- **Offline**: Service is not responding

## Event Types

- **STATUS_CHANGE**: Service status changed
- **ALERT**: Service alert triggered
- **MAINTENANCE**: Scheduled maintenance
- **RECOVERY**: Service recovered

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and MSW setup
│   │   ├── pages/          # Page components
│   │   └── main.tsx        # Application entry point
│   └── public/             # Static assets
└── server/                 # Backend files (legacy)
```

## Development

### Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run check`: Run TypeScript type checking

### Mock Service Worker

The application uses MSW to simulate API responses. The service worker is configured to:
- Add realistic network delays (300ms-1000ms)
- Simulate 5% failure rate for error handling testing
- Provide realistic service data and events
- Simulate real-time status updates every 30 seconds

## Features in Detail

### Real-time Updates
- Services are polled every 15 seconds for status changes
- Smart polling that pauses when tab is not visible
- Automatic cache invalidation on window focus

### Service Management
- Create new services with validation
- Edit existing services with optimistic updates
- Delete services with confirmation
- Search and filter services by name and status

### Error Handling
- Comprehensive error states for all API failures
- Toast notifications for user feedback
- Graceful fallbacks for network issues
- Loading states with skeleton UI

### Responsive Design
- Horizontal layout for service status and type
- Mobile-optimized responsive tables
- Touch-friendly interface elements

## License

MIT
=======
# service_monitoring_dashboard-
>>>>>>> f3ebc7d43c00b6d510063be289c7f25e9690da35
